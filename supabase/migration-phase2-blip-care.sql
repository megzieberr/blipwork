-- ============================================================
--  MIGRATION — Blipwork Phase 2: feeding, growth, sickness,
--  pharmacy/recovery and the second Blip.
--  ADDITIVE + idempotent-safe (IF NOT EXISTS / CREATE OR REPLACE).
--  RUN BY HAND in the Supabase SQL editor — do NOT auto-apply.
--
--  ------------------------------------------------------------
--  DESIGN RULINGS (from homework-hub-companion/PHASE-2-PLAN.md,
--  Megan 2026-07-19). Encoded here so the server is the single
--  source of truth; the client only renders what these return.
--
--   • NO DEATH. The blip never dies; the punishment is losing the
--     cosmetic layer, never losing earned progress.
--   • HEALTH IS COMPUTED, never stored/trusted. A "qualifying day"
--     = a weekday (Mon–Fri) AND the admin term toggle is ON. The
--     sickness clock starts at GREATEST(last_fed_day, term_on_since)
--     and counts qualifying days since. Stages by days_unfed:
--       0 healthy 0–2 · 1 tired 3–4 · 2 bedridden 5–6 · 3 critical 7+.
--     Toggling the term ON resets term_on_since = today, which
--     forgives all accrued sickness (the holiday-proof pause rule).
--   • Health is HOUSEHOLD-WIDE: all of a learner's blips share it.
--   • FEEDING: one FREE cookie per day (server-guarded by
--     last_fed_day). The free cookie is the ONLY thing that grows a
--     blip (feed_count, capped 1/day) and it feeds EVERY blip the
--     learner owns (one daily chore, household-wide). It also resets
--     the sickness clock. Paid treats cost gold, animate him, but
--     never touch feed_count or the clock, and are REFUSED while
--     sick (stage>=2) — "he turns his head away" (error REFUSES_FOOD).
--   • GROWTH: 4 stages by cumulative feedings — baby 0, small 10,
--     medium 25, grown 45. Sickness shrinks him presentationally;
--     growth (feed_count) is never actually lost.
--   • RECOVERY: while sick (stage>=2) normal food is refused; only
--     SOUP works, as part of care. mhq_care = soup + medicine in one
--     action; both cost gold and are bought via the shop (pantry).
--     Prices live server-side in shop_items (soup 15, medicine 20).
--     One care action per qualifying day; 3 consecutive qualifying
--     care days heal fully. The streak resets if a qualifying day is
--     skipped; weekends and term-off days never break it. While
--     care_streak>=1 and still sick, state reports recovering.
--     On full heal: care_streak=0, last_fed_day=today (back to
--     healthy), feed_count untouched (the shrink was presentational).
--   • LOCKS (computed + enforced server-side): stage>=2 blocks
--     mhq_equip (he won't get up); stage 3 blocks accessory
--     purchases AND gallery reads — BUT soup/medicine purchases
--     always work (the pharmacy stays open). Error code for a lock
--     violation is BLIP_TOO_SICK. The maths RPCs are NEVER touched.
--   • SECOND BLIP: mhq_claim_second_blip requires level>=10 (level
--     from the existing _mhq_level curve — never reimplemented), one
--     claim ever, ANY colour at hatch, starts feed_count 0 (a baby).
--   • DATA MODEL: a `blips` table (slot 1|2, name, colour, feed_count,
--     owned_items, equipped) so a third blip needs no migration.
--     Existing per-student blip state migrates into slot-1 rows; the
--     old students.blip_* columns are kept but the RPCs now treat the
--     blips table as truth.
--
--  DECISIONS THIS MIGRATION MAKES that the plan left open:
--   • Consumables (soup/medicine) are counted in students.pantry
--     (jsonb); paid treats are consumed instantly on buy (no stock).
--   • Cosmetics (owned_items/equipped) are PER-BLIP (the second blip
--     has "its own accessories" per the plan). mhq_buy_item / mhq_equip
--     take an optional p_slot (default 1) so the contract's slot-less
--     calls still target the primary blip.
--   • Care is only allowed on a qualifying day (error not_care_day
--     otherwise) — matches "one care action per qualifying day".
--   • Food shop rows are returned in a separate `foodShop` array so
--     the cosmetic `shop` array keeps its exact existing shape.
-- ============================================================

create extension if not exists pgcrypto with schema extensions;

-- ------------------------------------------------------------
--  1. students: care/feeding bookkeeping (health itself is computed)
-- ------------------------------------------------------------
alter table public.students
  add column if not exists last_fed_day  date,
  add column if not exists care_streak   integer not null default 0,
  add column if not exists last_care_day date,
  add column if not exists pantry        jsonb   not null default '{}'::jsonb; -- {soup:n, medicine:n}

-- ------------------------------------------------------------
--  2. blips table (slot 1|2). Scales to a 3rd blip with no migration.
-- ------------------------------------------------------------
create table if not exists public.blips (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid    not null references public.students(id) on delete cascade,
  slot        integer not null check (slot in (1, 2)),
  name        text    not null default 'Blip',
  colour      text    not null default 'cream',
  feed_count  integer not null default 0,
  owned_items jsonb   not null default '[]'::jsonb,
  equipped    jsonb   not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  unique (student_id, slot)
);
alter table public.blips enable row level security;
revoke all on public.blips from anon, authenticated;

-- Backfill: migrate each existing student's blip state into a slot-1 row
-- (feed_count starts 0 — there is no historical feeding to derive from).
insert into public.blips (student_id, slot, name, colour, owned_items, equipped)
select s.id, 1, s.blip_name, s.blip_colour, s.owned_items, s.equipped
  from public.students s
 where not exists (select 1 from public.blips b where b.student_id = s.id and b.slot = 1)
on conflict (student_id, slot) do nothing;

-- ------------------------------------------------------------
--  3. app_config: the term toggle (THE pause mechanism)
-- ------------------------------------------------------------
insert into public.app_config (key, value) values ('term_running', 'false')
on conflict (key) do nothing;
-- term_on_since is written only when the term is toggled ON (may be absent/null).

-- ------------------------------------------------------------
--  4. shop_items: add a category + food (pharmacy/grocery) rows
-- ------------------------------------------------------------
alter table public.shop_items add column if not exists category text not null default 'cosmetic';
-- widen the slot check so food rows (slot 'food') are legal alongside cosmetics
alter table public.shop_items drop constraint if exists shop_items_slot_check;
alter table public.shop_items drop constraint if exists shop_items_slot_cat_check;
alter table public.shop_items add constraint shop_items_slot_cat_check check (
     (category = 'cosmetic' and slot in ('hat','ears','glasses','wings','arms'))
  or (category = 'food'     and slot = 'food')
);

-- Recovery/treat prices live server-side (client is tamperable). item_id doubles
-- as the "kind": 'soup', 'medicine' (pantry consumables) and 'treat' (instant).
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  ('soup',     'food', 15, 1, true, 100, 'food'),
  ('medicine', 'food', 20, 1, true, 101, 'food'),
  ('treat',    'food',  8, 1, true, 102, 'food')
on conflict (item_id) do nothing;

-- ============================================================
--  HELPERS
-- ============================================================

-- Ensure a slot-1 blip exists for a student (lazy backfill for any row that
-- predates the blips table). Idempotent.
create or replace function public._mhq_ensure_blip(p_sid uuid)
returns void language plpgsql security definer set search_path = public, extensions as $$
begin
  insert into public.blips (student_id, slot, name, colour, owned_items, equipped)
  select s.id, 1, s.blip_name, s.blip_colour, s.owned_items, s.equipped
    from public.students s where s.id = p_sid
  on conflict (student_id, slot) do nothing;
end; $$;

-- growth stage 0..3 from cumulative feedings (thresholds 10/25/45).
create or replace function public._mhq_growth(p_feed integer)
returns integer language sql immutable as $$
  select case when coalesce(p_feed,0) >= 45 then 3
              when coalesce(p_feed,0) >= 25 then 2
              when coalesce(p_feed,0) >= 10 then 1
              else 0 end;
$$;

-- Is TODAY a qualifying day? (weekday AND term running)
create or replace function public._mhq_is_qual_day()
returns boolean language plpgsql stable security definer set search_path = public, extensions as $$
declare running boolean;
begin
  select (value = 'true') into running from public.app_config where key = 'term_running';
  return coalesce(running, false) and extract(isodow from current_date) < 6;
end; $$;

-- Household health, computed. Never stored, never trusted from the client.
--   window_start = GREATEST(last_fed_day, term_on_since)
--   days_unfed   = qualifying (weekday) days in (window_start, today]
-- If the term is OFF, nothing qualifies -> days_unfed 0 (the pause rule).
create or replace function public._mhq_health(p_last_fed date, p_care_streak integer)
returns jsonb language plpgsql stable security definer set search_path = public, extensions as $$
declare running boolean; on_since date; wstart date; du int; stg int; rec boolean;
begin
  select (value = 'true') into running from public.app_config where key = 'term_running';
  running := coalesce(running, false);
  select value::date into on_since from public.app_config where key = 'term_on_since';

  if not running or on_since is null then
    du := 0;
  else
    wstart := greatest(coalesce(p_last_fed, on_since), on_since);
    select count(*) into du
      from generate_series((wstart + 1)::timestamp, current_date::timestamp, interval '1 day') g(d)
     where extract(isodow from g.d) < 6;
  end if;

  stg := case when du >= 7 then 3 when du >= 5 then 2 when du >= 3 then 1 else 0 end;
  rec := (coalesce(p_care_streak, 0) >= 1 and stg >= 2);

  return jsonb_build_object(
    'stage', stg, 'daysUnfed', du, 'recovering', rec,
    'careStreak', coalesce(p_care_streak, 0),
    'locks', jsonb_build_object('dress', stg >= 2, 'shop', stg >= 3, 'gallery', stg >= 3));
end; $$;

-- ============================================================
--  STATE  (extends the existing mhq_get_state)
-- ============================================================
create or replace function public.mhq_get_state(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; prog jsonb; total int; open_q jsonb; st record; shop jsonb; food jsonb;
        blips_j jsonb; blip1 jsonb; health jsonb; stg int; is_qual boolean;
        can_feed boolean; can_care boolean;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  update public.students set last_active_at = now() where id = sid;
  perform public._mhq_ensure_blip(sid);
  select * into st from public.students where id = sid;

  select coalesce(jsonb_object_agg(quest_id, jsonb_build_object(
            'best_score', best_score, 'attempts', attempts, 'total_xp', total_xp,
            'passed', passed, 'last_played_at', last_played_at)), '{}'::jsonb)
    into prog from public.progress where student_id = sid;
  select coalesce(sum(total_xp), 0) into total from public.progress where student_id = sid;
  select coalesce(jsonb_agg(quest_id order by sort), '[]'::jsonb) into open_q from public.quests where is_open;

  -- cosmetics only, exact existing shape
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', item_id, 'slot', slot, 'price', price, 'minLevel', min_level) order by sort), '[]'::jsonb)
    into shop from public.shop_items where active and category = 'cosmetic';
  -- pharmacy / grocery, separate array so `shop` is untouched
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', item_id, 'kind', item_id, 'price', price) order by sort), '[]'::jsonb)
    into food from public.shop_items where active and category = 'food';

  health := public._mhq_health(st.last_fed_day, st.care_streak);
  stg := (health->>'stage')::int;

  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', slot, 'name', name, 'colour', colour, 'feedCount', feed_count,
            'growthStage', public._mhq_growth(feed_count),
            'owned', owned_items, 'equipped', equipped) order by slot), '[]'::jsonb)
    into blips_j from public.blips where student_id = sid;

  -- back-compat: `blip` = slot 1 (the existing UI reads this object)
  select jsonb_build_object('name', name, 'colour', colour, 'owned', owned_items, 'equipped', equipped)
    into blip1 from public.blips where student_id = sid and slot = 1;

  is_qual  := public._mhq_is_qual_day();
  can_feed := (stg < 2) and (st.last_fed_day is null or st.last_fed_day < current_date);
  can_care := (stg >= 2) and is_qual and (st.last_care_day is null or st.last_care_day < current_date);

  return jsonb_build_object('ok', true,
    'student', jsonb_build_object('id', sid, 'name', st.display_name, 'username', lower(p_username)),
    'progress', prog, 'totalXp', total, 'openQuests', open_q,
    'gold', st.gold, 'xp', st.xp, 'levelInfo', public._mhq_level(st.xp),
    'blip', blip1, 'blips', blips_j, 'shop', shop, 'foodShop', food,
    'pantry', st.pantry, 'health', health,
    'canFeedToday', can_feed, 'canCareToday', can_care,
    'termRunning', (select coalesce((value = 'true'), false) from public.app_config where key = 'term_running'));
end; $$;

-- ============================================================
--  FEED — the free daily cookie (household growth + clock reset)
-- ============================================================
create or replace function public.mhq_feed(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; st record; health jsonb; stg int; blips_j jsonb;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  perform public._mhq_ensure_blip(sid);
  select last_fed_day, care_streak into st from public.students where id = sid for update;

  health := public._mhq_health(st.last_fed_day, st.care_streak);
  stg := (health->>'stage')::int;
  -- refuse normal food while sick — he turns his head away
  if stg >= 2 then return jsonb_build_object('ok', false, 'error', 'REFUSES_FOOD'); end if;
  -- one free cookie a day
  if st.last_fed_day is not null and st.last_fed_day >= current_date then
    return jsonb_build_object('ok', false, 'error', 'already_fed');
  end if;

  -- feed the whole household (growth credit capped at 1/day = the free cookie)
  update public.blips set feed_count = feed_count + 1 where student_id = sid;
  update public.students set last_fed_day = current_date, last_active_at = now() where id = sid;

  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', slot, 'name', name, 'colour', colour, 'feedCount', feed_count,
            'growthStage', public._mhq_growth(feed_count)) order by slot), '[]'::jsonb)
    into blips_j from public.blips where student_id = sid;

  return jsonb_build_object('ok', true, 'blips', blips_j,
    'health', public._mhq_health(current_date, st.care_streak), 'canFeedToday', false);
end; $$;

-- ============================================================
--  CARE — soup + medicine in one action; recovery over 3 days
-- ============================================================
create or replace function public.mhq_care(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; st record; health jsonb; stg int; on_since date;
        skipped int; new_streak int; healed boolean := false; pan jsonb;
        n_soup int; n_med int; new_last_fed date; new_care date;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  select last_fed_day, care_streak, last_care_day, pantry into st
    from public.students where id = sid for update;

  health := public._mhq_health(st.last_fed_day, st.care_streak);
  stg := (health->>'stage')::int;
  if stg < 2 then return jsonb_build_object('ok', false, 'error', 'not_sick'); end if;
  if not public._mhq_is_qual_day() then return jsonb_build_object('ok', false, 'error', 'not_care_day'); end if;
  if st.last_care_day is not null and st.last_care_day >= current_date then
    return jsonb_build_object('ok', false, 'error', 'already_cared');
  end if;

  -- both supplies must be owned (bought from the pharmacy first)
  pan   := coalesce(st.pantry, '{}'::jsonb);
  n_soup := coalesce((pan->>'soup')::int, 0);
  n_med  := coalesce((pan->>'medicine')::int, 0);
  if n_soup < 1 or n_med < 1 then
    return jsonb_build_object('ok', false, 'error', 'need_supplies',
      'needSoup', (n_soup < 1), 'needMedicine', (n_med < 1));
  end if;

  -- consume one of each
  pan := jsonb_set(pan, '{soup}',     to_jsonb(n_soup - 1), true);
  pan := jsonb_set(pan, '{medicine}', to_jsonb(n_med  - 1), true);

  -- streak: consecutive qualifying care days. A skipped qualifying day resets it;
  -- weekends & term-off days never break it (bounded below by term_on_since).
  select value::date into on_since from public.app_config where key = 'term_on_since';
  if st.last_care_day is null then
    new_streak := 1;
  else
    select count(*) into skipped
      from generate_series((greatest(st.last_care_day, coalesce(on_since, st.last_care_day)) + 1)::timestamp,
                           (current_date - 1)::timestamp, interval '1 day') g(d)
     where extract(isodow from g.d) < 6;
    new_streak := case when skipped = 0 then coalesce(st.care_streak, 0) + 1 else 1 end;
  end if;

  new_care := current_date;
  if new_streak >= 3 then
    -- full heal: back to healthy today, streak cleared, growth untouched
    healed := true;
    new_streak := 0;
    new_last_fed := current_date;
  else
    new_last_fed := st.last_fed_day;
  end if;

  update public.students
     set pantry = pan, care_streak = new_streak, last_care_day = new_care,
         last_fed_day = new_last_fed, last_active_at = now()
   where id = sid;

  return jsonb_build_object('ok', true, 'healed', healed,
    'pantry', pan,
    'health', public._mhq_health(new_last_fed, new_streak));
end; $$;

-- ============================================================
--  SECOND BLIP — level>=10, one claim ever, any colour, a baby
-- ============================================================
create or replace function public.mhq_claim_second_blip(p_username text, p_password text, p_name text, p_colour text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; lvl int; nm text; col text; blips_j jsonb;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  lvl := (public._mhq_level((select xp from public.students where id = sid))->>'level')::int;
  if lvl < 10 then return jsonb_build_object('ok', false, 'error', 'level_locked', 'minLevel', 10); end if;
  if exists (select 1 from public.blips where student_id = sid and slot = 2) then
    return jsonb_build_object('ok', false, 'error', 'already_claimed');
  end if;

  col := coalesce(p_colour, 'cream');
  if col not in ('cream','pink','mint','sky','lilac','peach','lemon','seafoam','coral','lavender') then
    return jsonb_build_object('ok', false, 'error', 'bad_colour');
  end if;
  nm := left(btrim(coalesce(p_name, '')), 24);
  if nm = '' then return jsonb_build_object('ok', false, 'error', 'bad_name'); end if;

  insert into public.blips (student_id, slot, name, colour, feed_count, owned_items, equipped)
  values (sid, 2, nm, col, 0, '[]'::jsonb, '{}'::jsonb);

  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', slot, 'name', name, 'colour', colour, 'feedCount', feed_count,
            'growthStage', public._mhq_growth(feed_count),
            'owned', owned_items, 'equipped', equipped) order by slot), '[]'::jsonb)
    into blips_j from public.blips where student_id = sid;
  return jsonb_build_object('ok', true, 'blips', blips_j);
end; $$;

-- ============================================================
--  BUY — cosmetics (per-blip, slot-gated) + food (pantry / instant)
--  Drops the old 3-arg signature; new signature adds p_slot.
-- ============================================================
drop function if exists public.mhq_buy_item(text, text, text);
create or replace function public.mhq_buy_item(p_username text, p_password text, p_item text, p_slot integer default 1)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; itm record; st record; lvl int; stg int; slot int := coalesce(p_slot, 1);
        pan jsonb; cnt int; owned jsonb; new_gold int;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  if slot not in (1, 2) then slot := 1; end if;
  perform public._mhq_ensure_blip(sid);
  select * into itm from public.shop_items where item_id = p_item and active;
  if not found then return jsonb_build_object('ok', false, 'error', 'no_item'); end if;
  select xp, gold, pantry, last_fed_day, care_streak into st from public.students where id = sid for update;
  stg := (public._mhq_health(st.last_fed_day, st.care_streak)->>'stage')::int;

  if itm.category = 'food' then
    if p_item = 'treat' then
      -- a paid treat: refused while sick, else pure gold sink (no growth, no clock)
      if stg >= 2 then return jsonb_build_object('ok', false, 'error', 'REFUSES_FOOD'); end if;
      if st.gold < itm.price then return jsonb_build_object('ok', false, 'error', 'gold', 'price', itm.price, 'gold', st.gold); end if;
      update public.students set gold = gold - itm.price where id = sid returning gold into new_gold;
      return jsonb_build_object('ok', true, 'gold', new_gold, 'treat', true);
    else
      -- soup / medicine: the pharmacy is ALWAYS open, even at critical
      if st.gold < itm.price then return jsonb_build_object('ok', false, 'error', 'gold', 'price', itm.price, 'gold', st.gold); end if;
      pan := coalesce(st.pantry, '{}'::jsonb);
      cnt := coalesce((pan->>p_item)::int, 0) + 1;
      pan := jsonb_set(pan, array[p_item], to_jsonb(cnt), true);
      update public.students set gold = gold - itm.price, pantry = pan where id = sid returning gold into new_gold;
      return jsonb_build_object('ok', true, 'gold', new_gold, 'pantry', pan);
    end if;
  end if;

  -- cosmetic accessory (per-blip, on the given slot)
  if stg >= 3 then return jsonb_build_object('ok', false, 'error', 'BLIP_TOO_SICK'); end if;
  lvl := (public._mhq_level(st.xp)->>'level')::int;
  select owned_items into owned from public.blips where student_id = sid and slot = slot;
  if owned is null then return jsonb_build_object('ok', false, 'error', 'no_blip'); end if;
  if owned ? p_item then return jsonb_build_object('ok', false, 'error', 'owned'); end if;
  if lvl < itm.min_level then return jsonb_build_object('ok', false, 'error', 'locked', 'minLevel', itm.min_level); end if;
  if st.gold < itm.price then return jsonb_build_object('ok', false, 'error', 'gold', 'price', itm.price, 'gold', st.gold); end if;
  update public.blips set owned_items = owned_items || to_jsonb(p_item) where student_id = sid and slot = slot
    returning owned_items into owned;
  update public.students set gold = gold - itm.price where id = sid returning gold into new_gold;
  return jsonb_build_object('ok', true, 'gold', new_gold, 'owned', owned, 'slot', slot);
end; $$;

-- ============================================================
--  EQUIP — per-blip; blocked while sick (stage>=2). Adds p_slot.
-- ============================================================
drop function if exists public.mhq_equip(text, text, jsonb, text, text);
create or replace function public.mhq_equip(
  p_username text, p_password text, p_equipped jsonb default null,
  p_colour text default null, p_blip_name text default null, p_slot integer default 1)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; b record; st record; bad int; nm text; slot int := coalesce(p_slot, 1);
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  if slot not in (1, 2) then slot := 1; end if;
  perform public._mhq_ensure_blip(sid);
  select last_fed_day, care_streak, xp into st from public.students where id = sid;
  -- he won't get up to be dressed while bedridden or critical
  if (public._mhq_health(st.last_fed_day, st.care_streak)->>'stage')::int >= 2 then
    return jsonb_build_object('ok', false, 'error', 'BLIP_TOO_SICK');
  end if;
  select owned_items into b from public.blips where student_id = sid and slot = slot;
  if not found then return jsonb_build_object('ok', false, 'error', 'no_blip'); end if;

  if p_equipped is not null then
    if jsonb_typeof(p_equipped) <> 'object' then return jsonb_build_object('ok', false, 'error', 'bad_equipped'); end if;
    select count(*) into bad from jsonb_each_text(p_equipped) e(k, v)
     where k not in ('hat','ears','glasses','wings','arms')
        or (coalesce(v, '') <> '' and not b.owned_items ? v);
    if bad > 0 then return jsonb_build_object('ok', false, 'error', 'bad_equipped'); end if;
    update public.blips set equipped = p_equipped where student_id = sid and slot = slot;
  end if;

  if p_colour is not null then
    if p_colour not in ('cream','pink','mint','sky','lilac','peach','lemon','seafoam','coral','lavender')
      then return jsonb_build_object('ok', false, 'error', 'bad_colour'); end if;
    -- the FIRST blip's first non-cream colour still requires xp>0 (first-round reward);
    -- the second blip may be any colour at hatch, so only gate slot 1.
    if p_colour <> 'cream' and slot = 1 and st.xp <= 0
      then return jsonb_build_object('ok', false, 'error', 'colour_locked'); end if;
    update public.blips set colour = p_colour where student_id = sid and slot = slot;
  end if;

  if p_blip_name is not null then
    nm := left(btrim(p_blip_name), 24);
    if nm = '' then return jsonb_build_object('ok', false, 'error', 'bad_name'); end if;
    update public.blips set name = nm where student_id = sid and slot = slot;
  end if;

  return (select jsonb_build_object('ok', true, 'slot', slot, 'blip', jsonb_build_object(
    'name', name, 'colour', colour, 'owned', owned_items, 'equipped', equipped))
    from public.blips where student_id = sid and slot = slot);
end; $$;

-- ============================================================
--  GALLERY — all blips per student; blocked for the viewer at stage 3
-- ============================================================
create or replace function public.mhq_gallery(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; g jsonb; my_stg int; st record;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  perform public._mhq_ensure_blip(sid);
  select last_fed_day, care_streak into st from public.students where id = sid;
  my_stg := (public._mhq_health(st.last_fed_day, st.care_streak)->>'stage')::int;
  if my_stg >= 3 then return jsonb_build_object('ok', false, 'error', 'BLIP_TOO_SICK'); end if;

  select coalesce(jsonb_agg(grow order by lower(grow->>'username')), '[]'::jsonb) into g
  from (
    select jsonb_build_object(
      'username', s.username,
      'level', (public._mhq_level(s.xp)->>'level')::int,
      'me', (s.id = sid),
      'stage', (public._mhq_health(s.last_fed_day, s.care_streak)->>'stage')::int,
      -- back-compat: top-level colour/equipped = the student's slot-1 blip
      'colour', (select colour   from public.blips b where b.student_id = s.id and b.slot = 1),
      'equipped', coalesce((select equipped from public.blips b where b.student_id = s.id and b.slot = 1), '{}'::jsonb),
      'blips', coalesce((select jsonb_agg(jsonb_build_object(
                  'slot', b.slot, 'colour', b.colour, 'equipped', b.equipped,
                  'feedCount', b.feed_count, 'growthStage', public._mhq_growth(b.feed_count)) order by b.slot)
                from public.blips b where b.student_id = s.id), '[]'::jsonb)
    ) grow
    from public.students s
  ) t;
  return jsonb_build_object('ok', true, 'gallery', g);
end; $$;

-- ============================================================
--  SIGNUP — also create the slot-1 blip up front
-- ============================================================
create or replace function public.mhq_signup(p_username text, p_name text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare uname text := lower(trim(p_username)); new_id uuid;
begin
  if length(uname) < 3 then return jsonb_build_object('ok', false, 'error', 'username_short'); end if;
  if uname !~ '^[a-z0-9_.]+$' then return jsonb_build_object('ok', false, 'error', 'username_chars'); end if;
  if length(coalesce(p_password,'')) < 4 then return jsonb_build_object('ok', false, 'error', 'too_short'); end if;
  if length(coalesce(trim(p_name),'')) < 1 then return jsonb_build_object('ok', false, 'error', 'no_name'); end if;
  if exists (select 1 from public.students where username = uname) then
    return jsonb_build_object('ok', false, 'error', 'username_taken');
  end if;
  insert into public.students (username, display_name, password, last_active_at)
  values (uname, trim(p_name), crypt(p_password, gen_salt('bf')), now())
  returning id into new_id;
  insert into public.blips (student_id, slot, name, colour) values (new_id, 1, 'Blip', 'cream')
  on conflict (student_id, slot) do nothing;
  return jsonb_build_object('ok', true);
end; $$;

-- ============================================================
--  ADMIN — term toggle. Turning ON resets term_on_since = today
--  (that reset IS the sickness-forgiveness mechanism).
-- ============================================================
create or replace function public.mhq_admin_set_term(p_admin_password text, p_running boolean)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  insert into public.app_config (key, value) values ('term_running', case when p_running then 'true' else 'false' end)
    on conflict (key) do update set value = excluded.value;
  if p_running then
    insert into public.app_config (key, value) values ('term_on_since', current_date::text)
      on conflict (key) do update set value = excluded.value;
  end if;
  return jsonb_build_object('ok', true, 'termRunning', p_running,
    'termOnSince', (select value from public.app_config where key = 'term_on_since'));
end; $$;

-- Surface the term flag to the admin dashboard load.
create or replace function public.mhq_admin_data(p_admin_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare rows jsonb; qs jsonb; strug jsonb; term_on boolean; term_since text;
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;

  select coalesce(jsonb_agg(jsonb_build_object(
      'id', s.id, 'name', s.display_name, 'username', s.username,
      'hasPassword', (s.password is not null),
      'lastActive', s.last_active_at,
      'totalXp', coalesce((select sum(total_xp) from public.progress p where p.student_id = s.id), 0),
      -- household health + primary-blip growth, for the roster column
      'health', public._mhq_health(s.last_fed_day, s.care_streak),
      'growthStage', (select public._mhq_growth(b.feed_count) from public.blips b where b.student_id = s.id and b.slot = 1),
      'blipCount', (select count(*) from public.blips b where b.student_id = s.id),
      'quests', coalesce((select jsonb_object_agg(quest_id, jsonb_build_object(
                  'best_score', best_score, 'attempts', attempts, 'passed', passed,
                  'last_played_at', last_played_at)) from public.progress p where p.student_id = s.id), '{}'::jsonb)
    ) order by s.display_name), '[]'::jsonb)
  into rows from public.students s;

  select coalesce(jsonb_agg(jsonb_build_object('quest_id', quest_id, 'is_open', is_open) order by sort), '[]'::jsonb)
  into qs from public.quests;

  select coalesce(jsonb_agg(j order by (j->>'count')::int desc), '[]'::jsonb) into strug
  from (select jsonb_build_object('concept', concept, 'count', sum(count), 'students', count(distinct student_id)) j
        from public.struggles group by concept) t;

  select coalesce((value = 'true'), false) into term_on from public.app_config where key = 'term_running';
  select value into term_since from public.app_config where key = 'term_on_since';

  return jsonb_build_object('ok', true, 'rows', rows, 'quests', qs, 'struggles', strug,
    'inactiveDays', 7, 'termRunning', coalesce(term_on, false), 'termOnSince', term_since);
end; $$;

-- ============================================================
--  GRANTS — the publishable/anon key may only EXECUTE the API
-- ============================================================
grant execute on function
  public.mhq_get_state(text, text),
  public.mhq_signup(text, text, text),
  public.mhq_feed(text, text),
  public.mhq_care(text, text),
  public.mhq_claim_second_blip(text, text, text, text),
  public.mhq_buy_item(text, text, text, integer),
  public.mhq_equip(text, text, jsonb, text, text, integer),
  public.mhq_gallery(text, text),
  public.mhq_admin_set_term(text, boolean),
  public.mhq_admin_data(text)
to anon, authenticated;
