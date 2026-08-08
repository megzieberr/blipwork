-- ============================================================
--  BLIPWORK — LEVEL CURVE (cap 40) + MILESTONE MYSTERY BOXES + TRINKETS
--  Room build S2 (2026-08-08), per homework-hub-companion/ROOM-BUILD-PLAN.md
--
--  ⚠️ NOT YET RUN ON LIVE. Run the WHOLE file in the Supabase SQL editor
--  (project pjpwhalcifywjrwtjknd) AFTER migration-phase3.sql, which this
--  file extends. Additive and idempotent: safe to run more than once, and
--  it never drops or rewrites a learner row. XP is stored RAW, so the new
--  curve needs no data migration — every account simply re-maps.
--
--  WHY THE CURVE CHANGES: measured on the test account, the old curve
--  (300 * 1.5^(L-1), cap 20) needs ~120 rounds to reach level 10 and makes
--  level 20 effectively unreachable, so milestone/collection pacing was
--  impossible. Zero learners have the app, so this is the moment.
--    cost(L) = 200 + 60 * (L - 1),  MAX_LEVEL = 40
--    L10 = 3,960 XP  ·  L20 = 14,060  ·  L30 = 30,160  ·  L40 = 52,260
--    (at the measured ~190 XP per fresh round: ~21 / ~74 / ~159 / ~275 rounds)
--  The test account's 4,580 XP re-maps from level 6 to level 10.
--
--  WHAT ELSE IS IN HERE:
--    • milestone mystery boxes at levels 10 / 20 / 30 / 40, granted in
--      mhq_submit_quest, deduped by the milestone_grants primary key.
--    • loot for those boxes: 50% diamonds (10 x milestone level) /
--      25% guaranteed-new RARE cosmetic (price >= 120, ANY level) /
--      25% TRINKET. An empty pool pays diamonds instead, never a dud.
--    • six trinkets — junk loot, category 'trinket', price 0, never in the
--      shop, never equippable. They live on the STUDENT (students.trinkets),
--      not on a blip: they are objects on a shelf, not something worn.
--
--  ⚠️ PL/pgSQL house rule (a bare `slot = slot` once matched every row):
--  every local variable here is v_-prefixed and every column reference is
--  table-qualified. Keep that up.
--
--  Mirrored in: supabase/schema.sql (curve, constraint, trinket rows, the
--  two new students columns, milestone_grants), js/companion/level.js (the
--  curve), js/local-backend.js (everything, for ?local=1) and
--  js/companion/trinkets.js (labels + art). verify-store.html parses THIS
--  FILE and cross-checks it against the client mirror.
-- ============================================================


-- ============================================================
--  1. THE CURVE
--     Single source of truth. `set search_path = ''` is kept from
--     migration-search-path-pin.sql — the body uses only pg_catalog
--     built-ins, so the empty path is safe.
-- ============================================================
create or replace function public._mhq_level(p_xp integer) returns jsonb
language plpgsql immutable
set search_path = ''
as $$
declare lvl int := 1; cost int; rem int := greatest(coalesce(p_xp, 0), 0);
begin
  loop
    cost := 200 + 60 * (lvl - 1);
    exit when rem < cost or lvl >= 40;
    rem := rem - cost; lvl := lvl + 1;
  end loop;
  return jsonb_build_object('level', lvl, 'intoLevel', rem,
    'nextCost', case when lvl >= 40 then null else to_jsonb(cost) end);
end; $$;


-- ============================================================
--  2. TRINKETS — a third shop_items category
--     Not a cosmetic slot: trinkets are never worn, so they get their own
--     category AND their own slot value, and mhq_equip is deliberately
--     NOT touched (there is nothing to allow). The shop payload filters
--     on category = 'cosmetic', so they are invisible in the shop for
--     free — no "hidden" flag needed.
-- ============================================================
alter table public.shop_items drop constraint if exists shop_items_slot_cat_check;
alter table public.shop_items add constraint shop_items_slot_cat_check check (
     (category = 'cosmetic' and slot in ('hat','ears','glasses','wings','arms','back','effects','neck'))
  or (category = 'food'     and slot = 'food')
  or (category = 'trinket'  and slot = 'trinket'));

-- The junk loot. Price 0 and min_level 1 are bookkeeping only — a trinket
-- is never sold and never gated; it only ever arrives inside a mystery box.
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  ('pen',           'trinket', 0, 1, true, 200, 'trinket'),
  ('old-sock',      'trinket', 0, 1, true, 201, 'trinket'),
  ('smooth-rock',   'trinket', 0, 1, true, 202, 'trinket'),
  ('paper-clip',    'trinket', 0, 1, true, 203, 'trinket'),
  ('rubber-duck',   'trinket', 0, 1, true, 204, 'trinket'),
  ('broken-ruler',  'trinket', 0, 1, true, 205, 'trinket')
on conflict (item_id) do update
  set slot = excluded.slot, price = excluded.price, min_level = excluded.min_level,
      active = excluded.active, sort = excluded.sort, category = excluded.category;


-- ============================================================
--  3. NEW STUDENT STATE
--     trinkets        — the shelf, household-wide (NOT per blip: a shelf
--                       belongs to the room, and a learner browsing her
--                       second blip must still see her own shelf).
--     milestone_boxes — the QUEUE of unopened mystery boxes, as milestone
--                       levels, e.g. [10, 20]. A plain counter could not
--                       say how many diamonds each one owes.
--     Both default to '[]' so every existing row is correct the moment the
--     column lands. The students table has RLS on with no policies and all
--     privileges revoked from anon/authenticated, so a new column needs no
--     GRANT of its own — every read goes through a SECURITY DEFINER RPC.
-- ============================================================
alter table public.students add column if not exists trinkets        jsonb not null default '[]'::jsonb;
alter table public.students add column if not exists milestone_boxes jsonb not null default '[]'::jsonb;

-- One grant per (student, milestone), ever. The primary key IS the dedupe,
-- exactly like phase 3's box_grants: a replay at the same level finds the
-- row already there and awards nothing.
-- Deliberately NOT cleared by mhq_admin_reset_progress: a reset drops XP so
-- the gates re-lock, but a prize already won is never confiscated (the
-- 2026-07-19 reset ruling), and re-climbing must not re-farm boxes.
create table if not exists public.milestone_grants (
  student_id uuid    not null references public.students(id) on delete cascade,
  milestone  integer not null,
  granted_at timestamptz not null default now(),
  primary key (student_id, milestone)
);
alter table public.milestone_grants enable row level security;
revoke all on public.milestone_grants from anon, authenticated;


-- ============================================================
--  4. LOOT — the phase-3 table, extended rather than forked
--     `box` says which kind of box a row belongs to; every phase-3 row
--     defaults to 'assignment', so the homework chest keeps its exact
--     gold 55 / food 30 / cosmetic 15 split untouched.
-- ============================================================
alter table public.loot_table add column if not exists box text not null default 'assignment';
alter table public.loot_table drop constraint if exists loot_table_kind_check;
alter table public.loot_table add constraint loot_table_kind_check
  check (kind in ('gold', 'food', 'cosmetic', 'trinket'));

-- Milestone weights (TUNABLE: edit weight, re-run this block) — 50/25/25.
-- ⚠️ amount_min on the milestone gold row is a PER-MILESTONE-LEVEL rate, not
-- a flat amount: mhq_open_box pays amount_min * milestone, so 10 becomes
-- 100 diamonds at level 10 and 400 at level 40. amount_max is unused here.
insert into public.loot_table (id, kind, item_id, amount_min, amount_max, weight, sort, box) values
  ('ms-diamonds', 'gold',     null, 10, 10, 50, 10, 'milestone'),
  ('ms-rare',     'cosmetic', null,  1,  1, 25, 11, 'milestone'),
  ('ms-trinket',  'trinket',  null,  1,  1, 25, 12, 'milestone')
on conflict (id) do update
  set kind = excluded.kind, amount_min = excluded.amount_min,
      amount_max = excluded.amount_max, weight = excluded.weight,
      sort = excluded.sort, box = excluded.box;

-- The weighted roll, now per box kind. The old zero-argument version must be
-- DROPPED first: adding a parameter creates an overload rather than replacing
-- it, and a bare _mhq_roll_loot() call would then be ambiguous.
drop function if exists public._mhq_roll_loot();
create or replace function public._mhq_roll_loot(p_box text)
returns text language plpgsql security definer set search_path = public, extensions as $$
declare v_total int; v_pick int; v_acc int := 0; v_row record;
begin
  select coalesce(sum(loot_table.weight), 0) into v_total
    from public.loot_table where loot_table.active and loot_table.box = p_box;
  if v_total <= 0 then return null; end if;
  v_pick := floor(random() * v_total)::int + 1;
  for v_row in select * from public.loot_table
                where loot_table.active and loot_table.box = p_box
                order by loot_table.sort, loot_table.id loop
    v_acc := v_acc + v_row.weight;
    if v_pick <= v_acc then return v_row.id; end if;
  end loop;
  return null;
end; $$;


-- ============================================================
--  5. OPEN A BOX — phase-3 body, extended with the milestone branch
--
--  MILESTONE BOXES OPEN FIRST. That rule is shared with the client so the
--  modal can title itself "Mystery box" BEFORE the learner taps (the tap is
--  what calls this function, so the title cannot wait for the answer).
--
--  Guaranteed-new stays the rule for both box kinds. The pools differ:
--    assignment box — any unowned active cosmetic at or below her level.
--    milestone box  — unowned active cosmetics priced >= 120, ANY level.
--                     A rare above your level is the fun of it; it simply
--                     waits in the closet until the level gate opens.
--  An empty pool pays diamonds rather than fizzling or handing back a
--  duplicate — a box that gives you something you own is a punishment.
-- ============================================================
create or replace function public.mhq_open_box(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_st record; v_loot record; v_loot_id text;
        v_kind text; v_item text; v_amount int; v_is_new boolean := false;
        v_level int; v_owned jsonb; v_pantry jsonb; v_gold int;
        v_blips jsonb; v_pending int; v_total int;
        v_box text := 'assignment'; v_ms int := null;
        v_mystery jsonb; v_trinkets jsonb;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  perform public._mhq_ensure_blip(v_sid);

  -- row lock: two taps in flight must not open two boxes
  select students.boxes_pending, students.gold, students.xp, students.pantry,
         students.milestone_boxes, students.trinkets
    into v_st from public.students where students.id = v_sid for update;

  v_mystery  := coalesce(v_st.milestone_boxes, '[]'::jsonb);
  v_trinkets := coalesce(v_st.trinkets, '[]'::jsonb);

  if jsonb_array_length(v_mystery) > 0 then
    v_box := 'milestone';
    v_ms  := (v_mystery->>0)::int;                -- the queue head, e.g. 10
  elsif coalesce(v_st.boxes_pending, 0) < 1 then
    return jsonb_build_object('ok', false, 'error', 'no_box');
  end if;

  v_level  := (public._mhq_level(v_st.xp)->>'level')::int;
  v_pantry := coalesce(v_st.pantry, '{}'::jsonb);
  v_gold   := v_st.gold;

  v_loot_id := public._mhq_roll_loot(v_box);
  if v_loot_id is null then return jsonb_build_object('ok', false, 'error', 'no_loot_table'); end if;
  select * into v_loot from public.loot_table where loot_table.id = v_loot_id;

  v_kind := v_loot.kind;
  v_item := v_loot.item_id;
  if v_box = 'milestone' and v_kind = 'gold' then
    v_amount := v_loot.amount_min * v_ms;         -- 10 per milestone level
  else
    v_amount := v_loot.amount_min + floor(random() * (v_loot.amount_max - v_loot.amount_min + 1))::int;
  end if;

  if v_kind = 'cosmetic' then
    select coalesce(blips.owned_items, '[]'::jsonb) into v_owned
      from public.blips where blips.student_id = v_sid and blips.slot = 1;

    select shop_items.item_id into v_item
      from public.shop_items
     where shop_items.active
       and shop_items.category = 'cosmetic'
       and (case when v_box = 'milestone' then shop_items.price >= 120
                 else shop_items.min_level <= v_level end)
       and not (coalesce(v_owned, '[]'::jsonb) ? shop_items.item_id)
     order by random()
     limit 1;

    if v_item is null then
      -- nothing new to give — pay diamonds instead, never a duplicate
      v_kind := 'gold'; v_item := null;
      v_amount := case when v_box = 'milestone' then 10 * v_ms else 20 end;
    else
      v_is_new := true;
      update public.blips
         set owned_items = coalesce(blips.owned_items, '[]'::jsonb) || to_jsonb(v_item)
       where blips.student_id = v_sid and blips.slot = 1;
      v_amount := 1;
    end if;

  elsif v_kind = 'trinket' then
    -- Trinkets are guaranteed-new too. Six of them and four milestone boxes
    -- means duplicates are genuinely likely, and a second identical sock on
    -- the shelf is the same let-down as a duplicate hat.
    select shop_items.item_id into v_item
      from public.shop_items
     where shop_items.active
       and shop_items.category = 'trinket'
       and not (v_trinkets ? shop_items.item_id)
     order by random()
     limit 1;

    if v_item is null then
      v_kind := 'gold'; v_item := null; v_amount := 10 * coalesce(v_ms, 1);
    else
      v_is_new := true;
      v_trinkets := v_trinkets || to_jsonb(v_item);
      v_amount := 1;
    end if;
  end if;

  if v_kind = 'gold' then
    v_gold := v_gold + v_amount;
  elsif v_kind = 'food' then
    v_pantry := jsonb_set(v_pantry, array[v_item],
                  to_jsonb(coalesce((v_pantry->>v_item)::int, 0) + v_amount), true);
  end if;

  -- `jsonb - integer` removes the array element at that index: pop the head.
  if v_box = 'milestone' then v_mystery := v_mystery - 0; end if;

  update public.students
     set boxes_pending   = case when v_box = 'milestone'
                                then students.boxes_pending
                                else students.boxes_pending - 1 end,
         milestone_boxes = v_mystery,
         trinkets        = v_trinkets,
         gold            = v_gold,
         pantry          = v_pantry,
         last_active_at  = now()
   where students.id = v_sid
   returning students.boxes_pending into v_pending;

  v_total := coalesce(v_pending, 0) + jsonb_array_length(v_mystery);

  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', blips.slot, 'name', blips.name, 'colour', blips.colour,
            'feedCount', blips.feed_count,
            'growthStage', public._mhq_growth(blips.feed_count),
            'owned', blips.owned_items, 'equipped', blips.equipped) order by blips.slot), '[]'::jsonb)
    into v_blips from public.blips where blips.student_id = v_sid;

  return jsonb_build_object('ok', true,
    'loot', jsonb_build_object('kind', v_kind, 'id', v_item, 'amount', v_amount, 'isNew', v_is_new),
    'boxKind', v_box, 'milestone', v_ms,
    -- `pending` stays the TOTAL number of unopened boxes so every existing
    -- caller (the 🎁 badge) keeps working untouched; `mystery` is how many
    -- of those are milestone boxes.
    'boxes', jsonb_build_object('pending', v_total, 'mystery', jsonb_array_length(v_mystery)),
    'gold', v_gold, 'pantry', v_pantry, 'trinkets', v_trinkets, 'blips', v_blips);
end; $$;


-- ============================================================
--  6. BUY — refuse anything that is not a cosmetic or food row
--     Phase-2 body, one guard added. Without it a crafted request could
--     "buy" a trinket for 0 gold, because the function falls through to
--     the cosmetic branch for any non-food category. Nothing in the app
--     ever asks for one, but "never in the shop" should be enforced by
--     the server, not by the client not offering it.
-- ============================================================
create or replace function public.mhq_buy_item(p_username text, p_password text, p_item text, p_slot integer default 1)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; itm record; st record; lvl int; stg int; v_slot int := coalesce(p_slot, 1);
        pan jsonb; cnt int; owned jsonb; new_gold int;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  if v_slot not in (1, 2) then v_slot := 1; end if;
  perform public._mhq_ensure_blip(sid);
  select * into itm from public.shop_items where shop_items.item_id = p_item and shop_items.active;
  if not found then return jsonb_build_object('ok', false, 'error', 'no_item'); end if;
  select students.xp, students.gold, students.pantry, students.last_fed_day, students.care_streak
    into st from public.students where students.id = sid for update;
  stg := (public._mhq_health(st.last_fed_day, st.care_streak)->>'stage')::int;

  if itm.category = 'food' then
    if p_item = 'treat' then
      if stg >= 2 then return jsonb_build_object('ok', false, 'error', 'REFUSES_FOOD'); end if;
      if st.gold < itm.price then return jsonb_build_object('ok', false, 'error', 'gold', 'price', itm.price, 'gold', st.gold); end if;
      update public.students set gold = students.gold - itm.price where students.id = sid returning students.gold into new_gold;
      return jsonb_build_object('ok', true, 'gold', new_gold, 'treat', true);
    else
      if st.gold < itm.price then return jsonb_build_object('ok', false, 'error', 'gold', 'price', itm.price, 'gold', st.gold); end if;
      pan := coalesce(st.pantry, '{}'::jsonb);
      cnt := coalesce((pan->>p_item)::int, 0) + 1;
      pan := jsonb_set(pan, array[p_item], to_jsonb(cnt), true);
      update public.students set gold = students.gold - itm.price, pantry = pan where students.id = sid returning students.gold into new_gold;
      return jsonb_build_object('ok', true, 'gold', new_gold, 'pantry', pan);
    end if;
  end if;

  -- NEW (2026-08-08): trinkets (and any future non-cosmetic category) are
  -- not purchasable at all.
  if itm.category <> 'cosmetic' then return jsonb_build_object('ok', false, 'error', 'no_item'); end if;

  -- cosmetic accessory, on the given blip slot
  if stg >= 3 then return jsonb_build_object('ok', false, 'error', 'BLIP_TOO_SICK'); end if;
  lvl := (public._mhq_level(st.xp)->>'level')::int;
  select blips.owned_items into owned from public.blips where blips.student_id = sid and blips.slot = v_slot;
  if owned is null then return jsonb_build_object('ok', false, 'error', 'no_blip'); end if;
  if owned ? p_item then return jsonb_build_object('ok', false, 'error', 'owned'); end if;
  if lvl < itm.min_level then return jsonb_build_object('ok', false, 'error', 'locked', 'minLevel', itm.min_level); end if;
  if st.gold < itm.price then return jsonb_build_object('ok', false, 'error', 'gold', 'price', itm.price, 'gold', st.gold); end if;
  update public.blips set owned_items = blips.owned_items || to_jsonb(p_item)
    where blips.student_id = sid and blips.slot = v_slot returning blips.owned_items into owned;
  update public.students set gold = students.gold - itm.price where students.id = sid returning students.gold into new_gold;
  return jsonb_build_object('ok', true, 'gold', new_gold, 'owned', owned, 'slot', v_slot);
end; $$;


-- ============================================================
--  7. STATE — phase-3 body plus `trinkets` and boxes.mystery
-- ============================================================
create or replace function public.mhq_get_state(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_prog jsonb; v_total int; v_open_q jsonb; v_st record;
        v_shop jsonb; v_food jsonb; v_blips_j jsonb; v_blip1 jsonb;
        v_health jsonb; v_stg int; v_is_qual boolean;
        v_can_feed boolean; v_can_care boolean;
        v_asg record; v_assignment jsonb := null; v_done boolean;
        v_mystery int;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  update public.students set last_active_at = now() where students.id = v_sid;
  perform public._mhq_ensure_blip(v_sid);
  select * into v_st from public.students where students.id = v_sid;

  select coalesce(jsonb_object_agg(progress.quest_id, jsonb_build_object(
            'best_score', progress.best_score, 'attempts', progress.attempts,
            'total_xp', progress.total_xp, 'passed', progress.passed,
            'last_played_at', progress.last_played_at)), '{}'::jsonb)
    into v_prog from public.progress where progress.student_id = v_sid;
  select coalesce(sum(progress.total_xp), 0) into v_total
    from public.progress where progress.student_id = v_sid;
  select coalesce(jsonb_agg(quests.quest_id order by quests.sort), '[]'::jsonb)
    into v_open_q from public.quests where quests.is_open;

  -- category = 'cosmetic' is what keeps trinkets out of the shop payload.
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', shop_items.item_id, 'slot', shop_items.slot,
            'price', shop_items.price, 'minLevel', shop_items.min_level) order by shop_items.sort), '[]'::jsonb)
    into v_shop from public.shop_items where shop_items.active and shop_items.category = 'cosmetic';
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', shop_items.item_id, 'kind', shop_items.item_id,
            'price', shop_items.price) order by shop_items.sort), '[]'::jsonb)
    into v_food from public.shop_items where shop_items.active and shop_items.category = 'food';

  v_health := public._mhq_health(v_st.last_fed_day, v_st.care_streak);
  v_stg := (v_health->>'stage')::int;

  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', blips.slot, 'name', blips.name, 'colour', blips.colour,
            'feedCount', blips.feed_count,
            'growthStage', public._mhq_growth(blips.feed_count),
            'owned', blips.owned_items, 'equipped', blips.equipped) order by blips.slot), '[]'::jsonb)
    into v_blips_j from public.blips where blips.student_id = v_sid;

  select jsonb_build_object('name', blips.name, 'colour', blips.colour,
                            'owned', blips.owned_items, 'equipped', blips.equipped)
    into v_blip1 from public.blips where blips.student_id = v_sid and blips.slot = 1;

  v_is_qual  := public._mhq_is_qual_day();
  v_can_feed := (v_stg < 2) and (v_st.last_fed_day is null or v_st.last_fed_day < current_date);
  v_can_care := (v_stg >= 2) and v_is_qual and (v_st.last_care_day is null or v_st.last_care_day < current_date);

  select * into v_asg from public.assignments where assignments.active limit 1;
  if found then
    select exists(select 1 from public.box_grants
                   where box_grants.student_id = v_sid
                     and box_grants.assignment_id = v_asg.id) into v_done;
    v_assignment := jsonb_build_object(
      'questId', v_asg.quest_id, 'note', v_asg.note,
      'assignedOn', v_asg.assigned_on, 'dueOn', v_asg.due_on, 'done', v_done);
  end if;

  v_mystery := jsonb_array_length(coalesce(v_st.milestone_boxes, '[]'::jsonb));

  return jsonb_build_object('ok', true,
    'student', jsonb_build_object('id', v_sid, 'name', v_st.display_name, 'username', lower(p_username)),
    'progress', v_prog, 'totalXp', v_total, 'openQuests', v_open_q,
    'gold', v_st.gold, 'xp', v_st.xp, 'levelInfo', public._mhq_level(v_st.xp),
    'blip', v_blip1, 'blips', v_blips_j, 'shop', v_shop, 'foodShop', v_food,
    'pantry', v_st.pantry, 'health', v_health,
    'canFeedToday', v_can_feed, 'canCareToday', v_can_care,
    'termRunning', (select coalesce((app_config.value = 'true'), false)
                      from public.app_config where app_config.key = 'term_running'),
    'assignment', v_assignment,
    -- S2: `pending` is the TOTAL (homework + milestone); `mystery` says how
    -- many are milestone boxes, which is what titles the modal.
    'boxes', jsonb_build_object(
       'pending', coalesce(v_st.boxes_pending, 0) + v_mystery,
       'mystery', v_mystery),
    'trinkets', coalesce(v_st.trinkets, '[]'::jsonb));
end; $$;


-- ============================================================
--  8. SUBMIT QUEST — phase-3 body plus the milestone grant
--
--  ⚠️ THE TEST IS `>=`, NOT "crossed this submit" — a deliberate, recorded
--  deviation from ROOM-BUILD-PLAN.md's "compare level before/after".
--  Reason: the curve change re-maps the existing test account to exactly
--  level 10 without any submit ever crossing it, so a strict crossing test
--  would owe that account a box it could never receive. `>=` plus the
--  primary key gives the same guarantee (one box per milestone, ever) and
--  is simply kinder to anyone already past a milestone when this lands.
--  A replay still awards nothing: the insert conflicts and reports 0 rows.
-- ============================================================
create or replace function public.mhq_submit_quest(
  p_username text, p_password text, p_quest text,
  p_score numeric, p_xp int, p_total int, p_correct int)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_was_passed boolean := false; v_now_passed boolean;
        v_xp_gain int; v_gold_gain int := 10; v_old_xp int; v_new_xp int; v_new_gold int;
        v_old_lvl int; v_new_lvl int;
        v_asg_id uuid; v_box_awarded boolean := false; v_boxes int;
        v_ms int; v_rows int; v_mystery jsonb; v_ms_awarded int := 0;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  v_now_passed := (p_score >= 0.8);
  select progress.passed into v_was_passed
    from public.progress where progress.student_id = v_sid and progress.quest_id = p_quest;
  v_was_passed := coalesce(v_was_passed, false);
  if v_was_passed then
    v_xp_gain := round(greatest(0, least(coalesce(p_xp, 0), 1000)) * 0.25)::int;
  else
    v_xp_gain := greatest(0, least(coalesce(p_xp, 0), 1000));
  end if;

  insert into public.progress (student_id, quest_id, best_score, attempts, total_xp, passed, last_played_at)
  values (v_sid, p_quest, p_score, 1, v_xp_gain, v_now_passed, now())
  on conflict (student_id, quest_id) do update set
    best_score = greatest(public.progress.best_score, excluded.best_score),
    attempts   = public.progress.attempts + 1,
    total_xp   = public.progress.total_xp + excluded.total_xp,
    passed     = public.progress.passed or excluded.passed,
    last_played_at = now();

  select students.xp into v_old_xp from public.students where students.id = v_sid;
  update public.students
     set last_active_at = now(), xp = students.xp + v_xp_gain, gold = students.gold + v_gold_gain
   where students.id = v_sid
   returning students.xp, students.gold into v_new_xp, v_new_gold;

  -- Homework treasure box (phase 3) — unchanged.
  if v_now_passed then
    select assignments.id into v_asg_id
      from public.assignments
     where assignments.active and assignments.quest_id = p_quest
     limit 1;

    if v_asg_id is not null then
      insert into public.box_grants (student_id, assignment_id)
      values (v_sid, v_asg_id)
      on conflict (student_id, assignment_id) do nothing;

      if found then
        update public.students
           set boxes_pending = students.boxes_pending + 1
         where students.id = v_sid
         returning students.boxes_pending into v_boxes;
        v_box_awarded := true;
      end if;
    end if;
  end if;

  if v_boxes is null then
    select students.boxes_pending into v_boxes from public.students where students.id = v_sid;
  end if;

  v_old_lvl := (public._mhq_level(v_old_xp)->>'level')::int;
  v_new_lvl := (public._mhq_level(v_new_xp)->>'level')::int;

  -- Milestone mystery boxes. GET DIAGNOSTICS rather than FOUND: FOUND is also
  -- written by the enclosing FOR loop, and being explicit here costs nothing.
  select coalesce(students.milestone_boxes, '[]'::jsonb) into v_mystery
    from public.students where students.id = v_sid;
  if v_new_lvl >= 10 then
    for v_ms in select m from unnest(array[10, 20, 30, 40]) m where m <= v_new_lvl order by m loop
      insert into public.milestone_grants (student_id, milestone)
      values (v_sid, v_ms)
      on conflict (student_id, milestone) do nothing;
      get diagnostics v_rows = row_count;
      if v_rows > 0 then
        v_mystery := v_mystery || to_jsonb(v_ms);
        v_ms_awarded := v_ms_awarded + 1;
      end if;
    end loop;
    if v_ms_awarded > 0 then
      update public.students set milestone_boxes = v_mystery where students.id = v_sid;
    end if;
  end if;

  return jsonb_build_object('ok', true, 'passed', v_now_passed,
    'badgeEarned', (v_now_passed and not v_was_passed), 'xpAwarded', v_xp_gain,
    'alreadyPassed', v_was_passed, 'goldAwarded', v_gold_gain,
    'xp', v_new_xp, 'gold', v_new_gold, 'level', v_new_lvl,
    'levelUp', (v_new_lvl > v_old_lvl), 'levelInfo', public._mhq_level(v_new_xp),
    'boxAwarded', v_box_awarded,
    -- S2
    'mysteryAwarded', v_ms_awarded,
    'boxes', jsonb_build_object(
       'pending', coalesce(v_boxes, 0) + jsonb_array_length(v_mystery),
       'mystery', jsonb_array_length(v_mystery)));
end; $$;


-- ============================================================
--  9. GRANTS — create-or-replace keeps the existing grants on the RPCs
--     above. _mhq_roll_loot is internal (called in-process by
--     mhq_open_box only) and is deliberately NOT granted to anon.
-- ============================================================


-- ============================================================
--  10. SMOKE TEST — run these AFTER the migration, on live, with a
--      throwaway learner. Replace 'someuser' / 'somepassword'.
--
--    -- curve
--    select public._mhq_level(0), public._mhq_level(3959), public._mhq_level(3960),
--           public._mhq_level(14060), public._mhq_level(52260), public._mhq_level(999999);
--       expect levels 1, 9, 10, 20, 40, 40 and nextCost null at 40
--
--    -- trinkets exist but are invisible in the shop
--    select count(*) from public.shop_items where category = 'trinket';                 -- 6
--    select public.mhq_get_state('someuser','somepassword') -> 'shop' @> '[{"id":"pen"}]';  -- false
--    select public.mhq_buy_item('someuser','somepassword','pen');                       -- no_item
--
--    -- milestone grant + dedupe (needs an account near level 10)
--    select public.mhq_submit_quest('someuser','somepassword','q1',0.9,1000,5,5) -> 'mysteryAwarded';
--    select public.mhq_submit_quest('someuser','somepassword','q1',0.9,1000,5,5) -> 'mysteryAwarded';  -- 0
--    select public.mhq_get_state('someuser','somepassword') -> 'boxes';
--    select public.mhq_open_box('someuser','somepassword') -> 'boxKind';                -- "milestone"
--    select public.mhq_get_state('someuser','somepassword') -> 'trinkets';
-- ============================================================
