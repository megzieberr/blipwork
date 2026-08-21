-- ============================================================
--  ✅ APPLIED to live 2026-08-21 via MCP by the foreman session
--  (migration name mood_meter_and_cravings, WITH the review-fix revokes
--  below). Learner-row hashes byte-identical before/after; throwaway
--  smoke green (craved +2 / other +1 / cookie +1 / decay 5→3→0).
--  Originally: foreman build day 2026-08-21, session B (MOOD METER +
--  CRAVINGS).
--
--  Migration name: mood_meter_and_cravings
--
--  WHY THIS EXISTS (her ruling, 2026-08-21): buying food from the shop
--  changed nothing visible — the free daily cookie is the only thing
--  that grows a blip (standing rule: growth can never be bought; bought
--  food only ever reset the sickness clock, never fed growth). So the
--  food shop felt pointless. Today's design gives food its own job:
--  MOOD — 0-5 hearts, per blip.
--
--  WHAT THIS DOES
--   1. Two new columns on `blips`: mood int (0-5, raw — the last value
--      WRITTEN, not the decayed value), mood_day date (the day it was
--      last topped up). No grants needed: `revoke all` is already in
--      force on every table here and access is RPC-only.
--   2. _mhq_mood_effective(mood, mood_day) — the decay formula, READ-
--      TIME ONLY (mood is never decayed in storage): 0 when mood_day is
--      null, else greatest(0, mood - 2*days_since). Pure math, no table
--      access, `stable` (depends on current_date, so not `immutable`).
--   3. _mhq_craving(blip_id, level) — the day's ONE deterministic craved
--      food for that blip: active category='food' shop_items rows whose
--      min_level tier the learner has actually unlocked (never
--      advertise locked food), excluding soup/medicine/treat (see the
--      judgement-call note below), in item_id order, indexed by
--      abs(hashtext(blip_id::text || ':' || current_date::text)) mod
--      count. ONE helper, called from both mhq_get_state (to expose it)
--      and mhq_eat_food (to award the +2) — the computation lives in
--      exactly one place so the two can never drift apart, which is
--      what makes it unspoofable client-side.
--   4. mhq_get_state re-created, adding `mood` (effective) and
--      `craving` (item id or null) to every entry of the `blips` array.
--      ⚠️ COPY-FORWARD BASE: supabase/migration-dice.sql (line ~234) —
--      confirmed current by this session's read (schema.sql line 474
--      matches it byte-for-byte; migration-dice.sql is itself WRITTEN
--      NOT RUN, but it is the correct base per the foreman's brief).
--      NOT migration-food-shop.sql's older copy, NOT schema.sql.
--   5. mhq_feed (the free daily cookie) re-created, adding a flat
--      `cookieGain` (+1) to mood, household-wide — same update shape
--      feed_count already uses (`where student_id = sid`, every blip
--      row, no slot parameter exists on this RPC). ⚠️ COPY-FORWARD BASE:
--      supabase/migration-food-shop.sql (line ~212) — the only file that
--      has ever defined mhq_feed; schema.sql mirrors it byte-for-byte.
--   6. mhq_eat_food re-created, adding mood on top of its existing
--      "consume + reset the clock, no growth" behaviour — untouched.
--      Any bought food is +`foodGain` (1); the day's CRAVED food (for
--      EITHER blip in the household — see the judgement-call note) is
--      +`cravingGain` (2) instead. Household-wide, same reasoning as
--      mhq_feed above: this RPC has never taken a blip-slot parameter.
--      ⚠️ COPY-FORWARD BASE: supabase/migration-food-shop.sql (line
--      ~452) — the only file that has ever defined mhq_eat_food.
--   7. mhq_care re-created, adding a flat `cookieGain`-sized +1 to mood
--      when soup+medicine are actually consumed (i.e. only on the
--      branch that passes every earlier guard) — "being cared for feels
--      good". NOTHING about the care/heal logic itself (streak maths,
--      the 3-day heal, the supply check) is touched; this is a single
--      extra `update blips set mood = ...` line. ⚠️ THIS IS A DEVIATION
--      FROM THE BRIEF'S "re-creates exactly the three [copy-forward]
--      functions" verify-check wording — the design section explicitly
--      requires a care-day mood bump, and mhq_care is the only place it
--      can go, so a fourth function is re-created. Flagged prominently
--      here and in the build report for the foreman to review.
--      ⚠️ COPY-FORWARD BASE: supabase/migration-phase2-blip-care.sql
--      (line ~291) — the only file that has ever defined mhq_care;
--      schema.sql mirrors it (in a condensed, de-commented form, same
--      logic) byte-for-byte.
--
--  JUDGEMENT CALLS THE BRIEF DID NOT DECIDE (see the build report):
--   a. "Stable order (order by id)" — shop_items has no bare `id`
--      column (its primary key is `item_id text`). Used `order by
--      item_id` for stability.
--   b. Craving pool excludes 'treat' as well as 'soup'/'medicine'. The
--      brief only named soup/medicine, but treat is a pure gold sink
--      that never lands on the tray (mhq_buy_item's treat branch never
--      writes one) and mhq_eat_food already refuses it as not_edible —
--      if the craving ever picked 'treat' the +2 bonus could NEVER be
--      earned. Excluded for the mechanic to be satisfiable at all.
--   c. mhq_eat_food has no blip-slot parameter (never has), but
--      cravings are genuinely per-blip. In a (rare — second blip is a
--      level-20 milestone) two-blip household, the day's eaten item
--      counts as a craving hit if it matches EITHER blip's craving, and
--      the resulting gain (1 or 2) is applied to every blip row —
--      mirroring feed_count's existing household-wide shape exactly,
--      rather than inventing a new per-blip write path this build
--      didn't ask for.
--
--  Mirrored in: supabase/schema.sql (columns, both new helpers, all
--  four function bodies), js/config.js (MOOD block, display mirror
--  only), js/local-backend.js (mood/craving state, gains, decay — the
--  local craving hash does NOT need to match Postgres hashtext, any
--  deterministic per-day pick is fine offline, see its comment),
--  js/blip.js (hearts row, craving bubble, feed feedback, spontaneous
--  mood expression). verify-store.html cross-checks the SQL literals
--  against config.js's MOOD block and exercises the whole round-trip
--  against the local backend.
-- ============================================================


-- ============================================================
--  1. COLUMNS — per blip, not per student. `mood` is the last value
--     WRITTEN (never the decayed value — decay is read-time only, see
--     _mhq_mood_effective below). `mood_day` null means "never fed",
--     which _mhq_mood_effective reads as effective mood 0.
-- ============================================================
alter table public.blips add column if not exists mood int not null default 0;
alter table public.blips add column if not exists mood_day date;


-- ============================================================
--  2. _mhq_mood_effective — the decay formula, read-time only. Pure
--     math, no table access; `stable` (not `immutable`) because it
--     reads current_date.
-- ============================================================
create or replace function public._mhq_mood_effective(p_mood int, p_mood_day date)
returns int language sql stable set search_path = '' as $$
  select case when p_mood_day is null then 0
              else greatest(0, coalesce(p_mood, 0) - 2 * greatest(0, current_date - p_mood_day))
         end;
$$;


-- ============================================================
--  3. _mhq_craving — the day's ONE deterministic craved food for one
--     blip. Called from mhq_get_state (read) and mhq_eat_food (award) —
--     ONE place the computation lives, so the two can never drift and
--     the pick cannot be spoofed client-side. Excludes soup/medicine
--     (care items, never cravings) AND treat (see judgement-call note b
--     in this file's header — the +2 bonus must be earnable). Returns
--     null if the learner's level unlocks no food row at all (cannot
--     happen today — the Lv1 Fresh tier alone has 12 items — but a
--     null-safe return beats a divide-by-zero if the catalogue is ever
--     pared down under Lv1).
-- ============================================================
create or replace function public._mhq_craving(p_blip_id uuid, p_level int)
returns text language sql stable security definer set search_path = public, extensions as $$
  select item_id from (
    select item_id,
           row_number() over (order by item_id) - 1 as rn,
           count(*) over () as cnt
      from public.shop_items
     where active and category = 'food' and min_level <= coalesce(p_level, 1)
       and item_id not in ('soup', 'medicine', 'treat')
  ) t
  where cnt > 0 and rn = abs(hashtext(p_blip_id::text || ':' || current_date::text)) % cnt;
$$;

-- Foreman review fix (2026-08-21): helpers are internal — callable only
-- from inside the security-definer RPCs, never as PostgREST endpoints
-- (the _mhq_roll_loot / mhq_credit_cq precedent). Without this, function
-- EXECUTE defaults to PUBLIC and anon could probe _mhq_craving directly.
revoke execute on function public._mhq_mood_effective(int, date) from public, anon, authenticated;
revoke execute on function public._mhq_craving(uuid, int) from public, anon, authenticated;


-- ============================================================
--  4. mhq_get_state — adds `mood` (effective) and `craving` (item id)
--     to every entry of the `blips` array. Body = migration-dice.sql's
--     current mhq_get_state (line ~234), byte-for-byte, plus the two
--     fields marked below. See this file's header for the copy-forward
--     note.
-- ============================================================
create or replace function public.mhq_get_state(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; prog jsonb; total int; open_q jsonb; st record; shop jsonb; food jsonb; furn jsonb;
        blips_j jsonb; blip1 jsonb; health jsonb; stg int; is_qual boolean;
        can_feed boolean; can_care boolean; dice_j jsonb; lvl int;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  update public.students set last_active_at = now() where id = sid;
  perform public._mhq_ensure_blip(sid);
  select * into st from public.students where id = sid;

  -- S4b: a stale tray (yesterday's groceries) is discarded here too — no
  -- refund — and the clearing is written back so it is a fact on the row.
  if st.tray_day is not null and st.tray_day < current_date then
    update public.students set tray = '{}'::jsonb where id = sid;
    st.tray := '{}'::jsonb;
  end if;

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
  -- pharmacy / grocery, separate array so `shop` keeps its shape.
  -- S4 (2026-08-08): `minLevel` joined the payload when the 44 groceries
  -- landed — the tiers are level-gated, and without it a food card cannot
  -- say "Unlocks at Lv N". No new column: shop_items.min_level was always
  -- there, so nothing needed a new GRANT.
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', item_id, 'kind', item_id, 'price', price, 'minLevel', min_level) order by sort), '[]'::jsonb)
    into food from public.shop_items where active and category = 'food';
  -- Room build S5v2 (2026-08-08): the furniture catalogue, in its own array
  -- for the same reason foodShop is separate — `shop` keeps its exact shape,
  -- so the cosmetic panels never learn what a bed is. Same four fields as
  -- `shop`, so the furniture panel can reuse the cards the shop already draws.
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', item_id, 'slot', slot, 'price', price, 'minLevel', min_level) order by sort), '[]'::jsonb)
    into furn from public.shop_items where active and category = 'furniture';

  health := public._mhq_health(st.last_fed_day, st.care_streak);
  stg := (health->>'stage')::int;
  lvl := (public._mhq_level(st.xp)->>'level')::int;

  -- MOOD METER + CRAVINGS (2026-08-21): the two new per-blip fields. Mood
  -- is decayed at READ time (never stored decayed); craving reads the
  -- shared _mhq_craving helper, the SAME one mhq_eat_food uses to award
  -- the +2, so it cannot be spoofed client-side.
  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', slot, 'name', name, 'colour', colour, 'feedCount', feed_count,
            'growthStage', public._mhq_growth(feed_count),
            'owned', owned_items, 'equipped', equipped,
            'mood', public._mhq_mood_effective(mood, mood_day),
            'craving', public._mhq_craving(id, lvl)) order by slot), '[]'::jsonb)
    into blips_j from public.blips where student_id = sid;
  -- back-compat: `blip` = slot 1 (the existing UI reads this object)
  select jsonb_build_object('name', name, 'colour', colour, 'owned', owned_items, 'equipped', equipped)
    into blip1 from public.blips where student_id = sid and slot = 1;

  is_qual  := public._mhq_is_qual_day();
  -- S4: the cookie reads its OWN stamp, so eating a bought grocery (which
  -- sets last_fed_day) leaves the free cookie sitting there waiting.
  can_feed := (stg < 2) and (st.last_cookie_day is null or st.last_cookie_day < current_date);
  can_care := (stg >= 2) and is_qual and (st.last_care_day is null or st.last_care_day < current_date);

  -- DICE-PLAN.md, session 0b: the ONE new field.
  select coalesce(jsonb_object_agg(chapter, jsonb_build_object(
            'plays', plays, 'metKinds', met_kinds, 'save', save)), '{}'::jsonb)
    into dice_j from public.dice_plays where student_id = sid;

  return jsonb_build_object('ok', true,
    'student', jsonb_build_object('id', sid, 'name', st.display_name, 'username', lower(p_username)),
    'progress', prog, 'totalXp', total, 'openQuests', open_q,
    'gold', st.gold, 'xp', st.xp, 'levelInfo', public._mhq_level(st.xp),
    'blip', blip1, 'blips', blips_j, 'shop', shop, 'foodShop', food, 'furnitureShop', furn,
    'pantry', st.pantry, 'tray', coalesce(st.tray, '{}'::jsonb), 'health', health,
    'canFeedToday', can_feed, 'canCareToday', can_care,
    -- CQ-BRIDGE-PLAN.md Part 3: the ONE new field. cq_name lives on `st`
    -- (select * above), so no extra query — the Collect panel renders only
    -- when this is true (session 3's client-side rule).
    'cqLinked', (st.cq_name is not null),
    'dice', dice_j,
    'termRunning', (select coalesce((value = 'true'), false) from public.app_config where key = 'term_running'));
end; $$;


-- ============================================================
--  5. mhq_feed (the free daily cookie) — adds a flat +1 mood,
--     household-wide, on the SAME update statement that already grows
--     feed_count for every blip. Body = migration-food-shop.sql's
--     current mhq_feed (line ~212), byte-for-byte, plus the mood column
--     in that one update. See this file's header for the copy-forward
--     note.
-- ============================================================
create or replace function public.mhq_feed(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; st record; stg int; blips_j jsonb; lvl int;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  perform public._mhq_ensure_blip(sid);
  select last_fed_day, last_cookie_day, care_streak, xp into st from public.students where id = sid for update;
  stg := (public._mhq_health(st.last_fed_day, st.care_streak)->>'stage')::int;
  if stg >= 2 then return jsonb_build_object('ok', false, 'error', 'REFUSES_FOOD'); end if;
  -- S4: guarded by the cookie's OWN stamp. A bought apple sets last_fed_day
  -- (it resets the sickness clock) but must never consume the free cookie.
  if st.last_cookie_day is not null and st.last_cookie_day >= current_date then
    return jsonb_build_object('ok', false, 'error', 'already_fed');
  end if;
  -- the cookie is still the ONLY thing that grows a blip, so growth can
  -- never be bought (phase-2 ruling, unchanged by the food shop).
  -- MOOD (2026-08-21): the cookie is also worth +1 mood (MOOD.cookieGain),
  -- same household-wide update as feed_count — this RPC has never taken a
  -- blip-slot parameter.
  update public.blips
     set feed_count = feed_count + 1,
         mood = least(5, public._mhq_mood_effective(mood, mood_day) + 1),
         mood_day = current_date
   where student_id = sid;  -- household
  update public.students set last_cookie_day = current_date, last_fed_day = current_date,
                             last_active_at = now() where id = sid;
  lvl := (public._mhq_level(st.xp)->>'level')::int;
  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', slot, 'name', name, 'colour', colour, 'feedCount', feed_count,
            'growthStage', public._mhq_growth(feed_count),
            'mood', public._mhq_mood_effective(mood, mood_day),
            'craving', public._mhq_craving(id, lvl)) order by slot), '[]'::jsonb)
    into blips_j from public.blips where student_id = sid;
  return jsonb_build_object('ok', true, 'blips', blips_j,
    'health', public._mhq_health(current_date, st.care_streak), 'canFeedToday', false);
end; $$;


-- ============================================================
--  6. mhq_eat_food — unchanged consume/clock-reset/no-growth behaviour,
--     plus mood: +1 for any bought food, +2 if `p_item` matches either
--     blip's craving-of-the-day (household-wide gain either way — see
--     judgement-call note c in this file's header). Body =
--     migration-food-shop.sql's current mhq_eat_food (line ~452),
--     byte-for-byte, plus the mood block marked below. See this file's
--     header for the copy-forward note.
-- ============================================================
create or replace function public.mhq_eat_food(p_username text, p_password text, p_item text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_st record; v_itm record; v_stg int;
        v_tray jsonb; v_cnt int; v_blips jsonb; v_can_feed boolean;
        v_lvl int; v_craved boolean; v_gain int;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  perform public._mhq_ensure_blip(v_sid);

  select * into v_itm from public.shop_items
   where shop_items.item_id = p_item and shop_items.active and shop_items.category = 'food';
  if not found then return jsonb_build_object('ok', false, 'error', 'no_item'); end if;
  if p_item in ('soup', 'medicine', 'treat') then
    return jsonb_build_object('ok', false, 'error', 'not_edible');
  end if;

  select students.tray, students.tray_day, students.last_fed_day, students.last_cookie_day,
         students.care_streak, students.xp
    into v_st from public.students where students.id = v_sid for update;

  v_stg := (public._mhq_health(v_st.last_fed_day, v_st.care_streak)->>'stage')::int;
  if v_stg >= 2 then return jsonb_build_object('ok', false, 'error', 'REFUSES_FOOD'); end if;

  v_tray := public._mhq_tray(v_st.tray, v_st.tray_day);
  v_cnt := coalesce((v_tray->>p_item)::int, 0);
  if v_cnt < 1 then return jsonb_build_object('ok', false, 'error', 'none_left'); end if;
  if v_cnt - 1 <= 0 then
    v_tray := v_tray - p_item;                     -- `jsonb - text` drops the key
  else
    v_tray := jsonb_set(v_tray, array[p_item], to_jsonb(v_cnt - 1), true);
  end if;

  -- last_fed_day resets the clock; the cookie stamp and feed_count
  -- (growth) stay untouched.
  update public.students
     set tray = v_tray, tray_day = current_date, last_fed_day = current_date, last_active_at = now()
   where students.id = v_sid;

  -- MOOD + CRAVINGS (2026-08-21): any bought food is +1 mood (MOOD.foodGain),
  -- the day's CRAVED food is +2 (MOOD.cravingGain) instead. Household-wide,
  -- same shape as mhq_feed — this RPC has never taken a blip-slot parameter.
  -- Cravings are genuinely per-BLIP; eating the craved item for EITHER
  -- blip counts as a hit for the whole household feed (judgement call —
  -- see migration-mood-cravings.sql's header note c).
  v_lvl := (public._mhq_level(v_st.xp)->>'level')::int;
  select exists (
    select 1 from public.blips where blips.student_id = v_sid
      and public._mhq_craving(blips.id, v_lvl) = p_item
  ) into v_craved;
  v_gain := case when v_craved then 2 else 1 end;

  update public.blips
     set mood = least(5, public._mhq_mood_effective(mood, mood_day) + v_gain),
         mood_day = current_date
   where blips.student_id = v_sid;

  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', blips.slot, 'name', blips.name, 'colour', blips.colour,
            'feedCount', blips.feed_count,
            'growthStage', public._mhq_growth(blips.feed_count),
            'owned', blips.owned_items, 'equipped', blips.equipped,
            'mood', public._mhq_mood_effective(blips.mood, blips.mood_day),
            'craving', public._mhq_craving(blips.id, v_lvl)) order by blips.slot), '[]'::jsonb)
    into v_blips from public.blips where blips.student_id = v_sid;

  v_can_feed := (v_st.last_cookie_day is null or v_st.last_cookie_day < current_date);

  return jsonb_build_object('ok', true, 'item', p_item, 'tray', v_tray, 'blips', v_blips,
    'health', public._mhq_health(current_date, v_st.care_streak),
    -- the cookie survives a grocery feeding — that is the whole point
    'canFeedToday', v_can_feed,
    -- MOOD + CRAVINGS: lets the client show +1 vs +2 and play the excited
    -- moment on a craving hit without re-deriving hashtext client-side.
    'moodGain', v_gain, 'craved', v_craved);
end; $$;


-- ============================================================
--  7. mhq_care — ⚠️ THE FOURTH RE-CREATED FUNCTION, a deviation from
--     the brief's "exactly the three [copy-forward] functions" verify
--     wording (see the judgement-call note at the top of this file).
--     The design section requires a +1 mood on a genuine care day
--     ("being cared for feels good"), and mhq_care is the only place
--     that can go — so this adds ONE line (the mood update) after the
--     supply/streak/heal guards, and touches NOTHING else. Body =
--     migration-phase2-blip-care.sql's current mhq_care (line ~291),
--     functionally byte-for-byte (schema.sql mirrors this same logic in
--     a condensed, de-commented form), plus the mood block marked
--     below.
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

  -- MOOD (2026-08-21): a genuine care day (every guard above passed, both
  -- supplies actually consumed) is worth +1 mood too — "being cared for
  -- feels good". Household-wide, same shape as mhq_feed/mhq_eat_food.
  -- Nothing else in this function changed.
  update public.blips
     set mood = least(5, public._mhq_mood_effective(mood, mood_day) + 1), mood_day = current_date
   where student_id = sid;

  return jsonb_build_object('ok', true, 'healed', healed,
    'pantry', pan,
    'health', public._mhq_health(new_last_fed, new_streak));
end; $$;


-- ============================================================
--  sanity checks after running
-- ============================================================
--   select mood, mood_day from public.blips limit 5;
--   -- expected: mood 0, mood_day null on every existing row (the columns
--   -- default closed — nobody is retroactively handed mood).
--   select public._mhq_mood_effective(5, current_date);        -- 5
--   select public._mhq_mood_effective(5, current_date - 1);    -- 3
--   select public._mhq_mood_effective(5, current_date - 3);    -- 0 (floored, not negative)
--   select public._mhq_mood_effective(3, null);                -- 0
--   select public._mhq_craving(
--     (select id from public.blips limit 1), 1);   -- some Lv-1 grocery id, never soup/medicine/treat
--   select public.mhq_get_state('someuser','somepassword') -> 'blips' -> 0 -> 'mood';      -- 0 on a fresh blip
--   select public.mhq_get_state('someuser','somepassword') -> 'blips' -> 0 -> 'craving';   -- an item id
--   select public.mhq_eat_food('someuser','somepassword','apple') -> 'moodGain';  -- 1 or 2, matching 'craved'
--   select public.mhq_feed('someuser','somepassword') -> 'blips' -> 0 -> 'mood';  -- +1 vs the pre-feed read, capped at 5
-- ============================================================
