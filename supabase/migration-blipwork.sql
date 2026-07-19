-- ============================================================
--  MIGRATION — Blipwork rebrand: companion game state + RPCs
--  ALREADY APPLIED to the live project (via MCP, 2026-07-19).
--  Kept for the record; additive and safe to re-run.
--
--  Design (2026-07-19 rulings):
--   • XP = lifetime levelling counter (never spent, never lost).
--   • Gold = shop currency (never affects rank).
--   • NO daily cap — the app doubles as exam revision, so unlimited
--     rounds count. Pacing comes from the rising level curve +
--     level-gated shop items instead.
--   • Level formula (single source of truth, mirror in client JS):
--       cost(L) = round(300 * 1.5^(L-1) / 10) * 10   XP from level L to L+1
--     bar resets each level; cap 20. Sized for real quest payouts
--     (110–260 XP each): all 79 quests ≈ level 9, heavy revision 10–12.
--   • First completion of a quest = full XP; replays = 25% XP
--     (revision always pays, farming one easy round stays slow).
--     Gold: flat 10 per completed round, every round.
--   • First non-cream colour requires xp > 0 (first-round reward).
--   • Blip nicknames are free-form (never displayed publicly — only
--     usernames appear in the gallery), trimmed, max 24 chars.
--   • Teacher "reset progress" zeroes XP (level drops, gates re-lock)
--     but KEEPS gold, owned/equipped items, colour and nickname.
-- ============================================================

alter table public.students
  add column if not exists gold        integer not null default 0,
  add column if not exists xp          integer not null default 0,
  add column if not exists blip_name   text    not null default 'Blip',
  add column if not exists blip_colour text    not null default 'cream',
  add column if not exists owned_items jsonb   not null default '[]'::jsonb,
  add column if not exists equipped    jsonb   not null default '{}'::jsonb;

-- Backfill lifetime XP from historical per-quest progress (runs once; no-op after).
update public.students s
   set xp = coalesce((select sum(p.total_xp) from public.progress p where p.student_id = s.id), 0)
 where s.xp = 0;

-- Shop catalogue: prices/level gates MUST live server-side (client is tamperable).
create table if not exists public.shop_items (
  item_id   text primary key,
  slot      text    not null check (slot in ('hat','ears','glasses','wings','arms')),
  price     integer not null check (price >= 0),
  min_level integer not null default 1,
  active    boolean not null default true,
  sort      integer not null default 0
);
alter table public.shop_items enable row level security;

-- Starter set; placeholder prices, tune once the full accessory set is scoped.
-- item_ids match js/companion/renderer.js ACCESSORIES keys exactly (hyphenated).
insert into public.shop_items (item_id, slot, price, min_level, active, sort) values
  ('round-glasses','glasses', 40, 1, true, 10),
  ('cat-ears',     'ears',    60, 2, true, 20),
  ('party-hat',    'hat',     80, 3, true, 30),
  ('stubby-arms',  'arms',   100, 4, true, 40),
  ('angel-wings',  'wings',  150, 6, true, 50)
on conflict (item_id) do nothing;

-- ============================================================
--  RPCs
-- ============================================================

create or replace function public._mhq_level(p_xp integer) returns jsonb
language plpgsql immutable
as $$
declare lvl int := 1; cost int; rem int := greatest(coalesce(p_xp, 0), 0);
begin
  loop
    cost := (round(300 * power(1.5, lvl - 1) / 10))::int * 10;
    exit when rem < cost or lvl >= 20;
    rem := rem - cost; lvl := lvl + 1;
  end loop;
  return jsonb_build_object('level', lvl, 'intoLevel', rem,
    'nextCost', case when lvl >= 20 then null else to_jsonb(cost) end);
end; $$;

create or replace function public.mhq_submit_quest(p_username text, p_password text, p_quest text, p_score numeric, p_xp integer, p_total integer, p_correct integer)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; was_passed boolean := false; now_passed boolean;
        xp_gain int; gold_gain int := 10; old_xp int; new_xp int; new_gold int;
        old_lvl int; new_lvl int;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  now_passed := (p_score >= 0.8);
  select passed into was_passed from public.progress where student_id = sid and quest_id = p_quest;
  was_passed := coalesce(was_passed, false);
  if was_passed then
    xp_gain := round(greatest(0, least(coalesce(p_xp, 0), 1000)) * 0.25)::int;
  else
    xp_gain := greatest(0, least(coalesce(p_xp, 0), 1000));
  end if;

  insert into public.progress (student_id, quest_id, best_score, attempts, total_xp, passed, last_played_at)
  values (sid, p_quest, p_score, 1, xp_gain, now_passed, now())
  on conflict (student_id, quest_id) do update set
    best_score = greatest(public.progress.best_score, excluded.best_score),
    attempts   = public.progress.attempts + 1,
    total_xp   = public.progress.total_xp + excluded.total_xp,
    passed     = public.progress.passed or excluded.passed,
    last_played_at = now();

  select xp into old_xp from public.students where id = sid;
  update public.students
     set last_active_at = now(), xp = xp + xp_gain, gold = gold + gold_gain
   where id = sid
   returning xp, gold into new_xp, new_gold;

  old_lvl := (public._mhq_level(old_xp)->>'level')::int;
  new_lvl := (public._mhq_level(new_xp)->>'level')::int;

  return jsonb_build_object('ok', true, 'passed', now_passed,
    'badgeEarned', (now_passed and not was_passed), 'xpAwarded', xp_gain,
    'alreadyPassed', was_passed, 'goldAwarded', gold_gain,
    'xp', new_xp, 'gold', new_gold, 'level', new_lvl,
    'levelUp', (new_lvl > old_lvl), 'levelInfo', public._mhq_level(new_xp));
end; $$;

create or replace function public.mhq_get_state(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; prog jsonb; total int; open_q jsonb; st record; shop jsonb;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  update public.students set last_active_at = now() where id = sid;
  select * into st from public.students where id = sid;

  select coalesce(jsonb_object_agg(quest_id, jsonb_build_object(
            'best_score', best_score, 'attempts', attempts, 'total_xp', total_xp,
            'passed', passed, 'last_played_at', last_played_at)), '{}'::jsonb)
    into prog from public.progress where student_id = sid;
  select coalesce(sum(total_xp), 0) into total from public.progress where student_id = sid;
  select coalesce(jsonb_agg(quest_id order by sort), '[]'::jsonb) into open_q from public.quests where is_open;
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', item_id, 'slot', slot, 'price', price, 'minLevel', min_level) order by sort), '[]'::jsonb)
    into shop from public.shop_items where active;

  return jsonb_build_object('ok', true,
    'student', jsonb_build_object('id', sid, 'name', st.display_name, 'username', lower(p_username)),
    'progress', prog, 'totalXp', total, 'openQuests', open_q,
    'gold', st.gold, 'xp', st.xp, 'levelInfo', public._mhq_level(st.xp),
    'blip', jsonb_build_object('name', st.blip_name, 'colour', st.blip_colour,
      'owned', st.owned_items, 'equipped', st.equipped),
    'shop', shop);
end; $$;

create or replace function public.mhq_buy_item(p_username text, p_password text, p_item text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; itm record; st record; lvl int;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  select * into itm from public.shop_items where item_id = p_item and active;
  if not found then return jsonb_build_object('ok', false, 'error', 'no_item'); end if;
  select xp, gold, owned_items into st from public.students where id = sid for update;
  lvl := (public._mhq_level(st.xp)->>'level')::int;
  if st.owned_items ? p_item then return jsonb_build_object('ok', false, 'error', 'owned'); end if;
  if lvl < itm.min_level then return jsonb_build_object('ok', false, 'error', 'locked', 'minLevel', itm.min_level); end if;
  if st.gold < itm.price then return jsonb_build_object('ok', false, 'error', 'gold', 'price', itm.price, 'gold', st.gold); end if;
  update public.students
     set gold = gold - itm.price, owned_items = owned_items || to_jsonb(p_item)
   where id = sid
   returning gold, owned_items into st.gold, st.owned_items;
  return jsonb_build_object('ok', true, 'gold', st.gold, 'owned', st.owned_items);
end; $$;

create or replace function public.mhq_equip(p_username text, p_password text, p_equipped jsonb default null, p_colour text default null, p_blip_name text default null)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; st record; bad int; nm text;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  select xp, owned_items into st from public.students where id = sid;

  if p_equipped is not null then
    if jsonb_typeof(p_equipped) <> 'object' then return jsonb_build_object('ok', false, 'error', 'bad_equipped'); end if;
    select count(*) into bad from jsonb_each_text(p_equipped) e(k, v)
     where k not in ('hat','ears','glasses','wings','arms')
        or (coalesce(v, '') <> '' and not st.owned_items ? v);
    if bad > 0 then return jsonb_build_object('ok', false, 'error', 'bad_equipped'); end if;
    update public.students set equipped = p_equipped where id = sid;
  end if;

  if p_colour is not null then
    if p_colour not in ('cream','pink','mint','sky','lilac','peach','lemon','seafoam','coral','lavender')
      then return jsonb_build_object('ok', false, 'error', 'bad_colour'); end if;
    if p_colour <> 'cream' and st.xp <= 0
      then return jsonb_build_object('ok', false, 'error', 'colour_locked'); end if;
    update public.students set blip_colour = p_colour where id = sid;
  end if;

  if p_blip_name is not null then
    nm := left(btrim(p_blip_name), 24);
    if nm = '' then return jsonb_build_object('ok', false, 'error', 'bad_name'); end if;
    update public.students set blip_name = nm where id = sid;
  end if;

  return (select jsonb_build_object('ok', true, 'blip', jsonb_build_object(
    'name', blip_name, 'colour', blip_colour, 'owned', owned_items, 'equipped', equipped))
    from public.students where id = sid);
end; $$;

create or replace function public.mhq_gallery(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; g jsonb;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  select coalesce(jsonb_agg(jsonb_build_object(
      'username', username, 'colour', blip_colour, 'equipped', equipped,
      'level', (public._mhq_level(xp)->>'level')::int,
      'me', (id = sid)) order by lower(username)), '[]'::jsonb)
    into g from public.students;
  return jsonb_build_object('ok', true, 'gallery', g);
end; $$;

create or replace function public.mhq_admin_reset_progress(p_admin_password text, p_id uuid)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  delete from public.progress  where student_id = p_id;
  delete from public.struggles where student_id = p_id;
  update public.students set xp = 0 where id = p_id;
  return jsonb_build_object('ok', true);
end; $$;

grant execute on function
  public.mhq_buy_item(text, text, text),
  public.mhq_equip(text, text, jsonb, text, text),
  public.mhq_gallery(text, text)
to anon, authenticated;
