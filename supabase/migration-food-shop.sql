-- ============================================================
--  BLIPWORK — THE FOOD SHOP (44 groceries) + EATING
--  Room build S4 (2026-08-08), per homework-hub-companion/ROOM-BUILD-PLAN.md
--  REVISED same day for S4b (the isometric-room ruling): groceries no
--  longer live in the pantry — see the TRAY block below.
--
--  ⏳ NOT RUN YET. Run the WHOLE file in the Supabase SQL editor (project
--  pjpwhalcifywjrwtjknd) AFTER migration-level-curve-40.sql, whose
--  mhq_get_state / mhq_buy_item bodies this file re-creates with two small
--  additions. Additive and idempotent: safe to run more than once, and it
--  never drops or rewrites a learner row.
--
--  WHAT THIS DOES
--    1. Seeds 44 grocery rows into shop_items — category 'food', slot
--       'food', exactly like soup/medicine/treat. NO new category, NO new
--       slot, so shop_items_slot_cat_check is untouched.
--    2. mhq_get_state's `foodShop` array now also carries `minLevel`. The
--       column (shop_items.min_level) already existed — only the payload
--       is wider, so again no GRANT and no schema change there.
--    3. mhq_buy_item's FOOD branch now honours min_level on groceries, the
--       same way its cosmetic branch always has. soup / medicine / treat
--       stay min_level 1, so the pharmacy is unchanged in every case.
--    4. NEW RPC mhq_eat_food(username, password, item) — consumes one
--       grocery from TODAY'S TRAY server-side and feeds him for the day.
--    5. NEW COLUMNS students.last_cookie_day, students.tray, students.tray_day
--       — see the rulings below. None needs a GRANT of its own:
--       `revoke all on public.students from anon, authenticated` is
--       already in force and every read goes through a SECURITY DEFINER
--       RPC (same basis as S2's two columns).
--
--  ⚠️ HER RULING (2026-08-08, S4b — the isometric-room revision): GROCERIES
--  LIVE ON A SAME-DAY TRAY, NOT THE PANTRY. "They can't just buy and buy
--  and buy and expect to be refunded." A grocery bought today sits on
--  students.tray until it is fed to him or midnight passes, whichever
--  comes first — EXPIRED FOOD IS GONE, NO REFUND. Soup, medicine and treat
--  are UNCHANGED: soup/medicine still land in the pantry (mhq_care, not
--  touched here, still eats them as a pair) and never expire; treat is
--  still a pure gold sink. See the TRAY block (§1c) for the shape and the
--  lazy-expiry rule.
--
--  WHY EATING IS NOT JUST A CLIENT ANIMATION: the tray is server state, so
--  "the food disappeared" has to be a server fact. mhq_eat_food follows
--  the shape mhq_feed / mhq_care already set — auth, row lock, refuse while
--  sick, consume, return the fresh state.
--
--  ⚠️ HER RULING (2026-08-08): THE FREE COOKIE IS NEVER USED UP BY FOOD.
--  Feeding him a bought apple must not cost him his daily cookie. Those two
--  things were sharing `last_fed_day`, which did double duty:
--    (a) "has the free cookie been claimed today?"   and
--    (b) "when did he last eat?" — which drives the sickness clock.
--  So (a) moves to its OWN column, `last_cookie_day`, and `last_fed_day`
--  goes back to meaning only (b). After the split:
--    • The free cookie is once a day, free, grows him, and resets the clock
--      — exactly as before, and now nothing else can consume it.
--    • Eating a grocery consumes the food and RESETS THE SICKNESS CLOCK
--      (it is real food; a learner who feeds him a steak must not still
--      find him starving), but pays NO growth credit and leaves the cookie
--      sitting there.
--  Growth therefore stays what the phase-2 design always said it was —
--  the free daily cookie is the ONLY thing that grows a blip — so growth
--  can never be bought. (An earlier draft had eating pay growth with a
--  once-a-day cap; her ruling makes that unnecessary and it is gone.)
--
--  ⚠️ PL/pgSQL house rule (a bare `slot = slot` once matched every row):
--  every local variable here is v_-prefixed and every column reference is
--  table-qualified.
--
--  Mirrored in: supabase/schema.sql (rows + all function changes + the
--  tray columns), js/local-backend.js (everything, for ?local=1, including
--  lazy tray expiry), js/companion/food.js (labels + art) and
--  js/companion/collections.js (the tier gates). verify-store.html parses
--  THIS FILE and cross-checks all 44 rows against the client mirror, and
--  exercises the tray round-trip (buy -> on tray -> eat -> gone -> day
--  rolls -> tray empties with no refund) against the local backend.
-- ============================================================


-- ============================================================
--  1. THE GROCERIES — 44 rows, six price tiers
--
--  The tier a food belongs to is a CLIENT grouping (js/companion/
--  collections.js, so Megan can retune a threshold without a migration),
--  but min_level here is the server's own copy of that tier's gate, and
--  mhq_buy_item enforces it. Both must agree; verify-store.html asserts it.
--
--    Fresh   (fruit & veg)  Lv 1   4-9 gold    12 items
--    Bakery  (pastries)     Lv 4   12-20       6
--    Hot meals              Lv 7   22-32       6
--    Braai                  Lv 11  34-48       6
--    Sweets                 Lv 14  18-30       6
--    Drinks                 Lv 17  20-45       8
--
--  Sweets and drinks are gated ABOVE the hot meals they undercut on price:
--  they are treats, and the level is the price. `sort` continues from the
--  pharmacy's 100-102 so the payload comes back in tier order.
-- ============================================================
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  -- Fresh — fruit & veg, Lv 1
  ('apple',          'food',  5,  1, true, 110, 'food'),
  ('banana',         'food',  5,  1, true, 111, 'food'),
  ('grapes',         'food',  8,  1, true, 112, 'food'),
  ('naartjie',       'food',  6,  1, true, 113, 'food'),
  ('strawberry',     'food',  7,  1, true, 114, 'food'),
  ('watermelon',     'food',  9,  1, true, 115, 'food'),
  ('broccoli',       'food',  4,  1, true, 116, 'food'),
  ('carrot',         'food',  4,  1, true, 117, 'food'),
  ('green-pepper',   'food',  5,  1, true, 118, 'food'),
  ('mielie',         'food',  6,  1, true, 119, 'food'),
  ('peas',           'food',  4,  1, true, 120, 'food'),
  ('tomato',         'food',  5,  1, true, 121, 'food'),
  -- Bakery — pastries, Lv 4
  ('choc-cookie',    'food', 12,  4, true, 130, 'food'),
  ('croissant',      'food', 14,  4, true, 131, 'food'),
  ('doughnut',       'food', 15,  4, true, 132, 'food'),
  ('cupcake',        'food', 16,  4, true, 133, 'food'),
  ('custard-tart',   'food', 18,  4, true, 134, 'food'),
  ('koeksister',     'food', 20,  4, true, 135, 'food'),
  -- Hot meals, Lv 7
  ('toastie',        'food', 22,  7, true, 140, 'food'),
  ('hot-dog',        'food', 24,  7, true, 141, 'food'),
  ('nuggets',        'food', 26,  7, true, 142, 'food'),
  ('spaghetti',      'food', 28,  7, true, 143, 'food'),
  ('burger',         'food', 30,  7, true, 144, 'food'),
  ('pizza',          'food', 32,  7, true, 145, 'food'),
  -- Braai, Lv 11
  ('biltong',        'food', 34, 11, true, 150, 'food'),
  ('drumstick',      'food', 36, 11, true, 151, 'food'),
  ('boerewors',      'food', 38, 11, true, 152, 'food'),
  ('sosatie',        'food', 40, 11, true, 153, 'food'),
  ('lamb-chop',      'food', 44, 11, true, 154, 'food'),
  ('steak',          'food', 48, 11, true, 155, 'food'),
  -- Sweets, Lv 14
  ('lollipop',       'food', 18, 14, true, 160, 'food'),
  ('gummy-bear',     'food', 20, 14, true, 161, 'food'),
  ('marshmallow',    'food', 22, 14, true, 162, 'food'),
  ('jelly-beans',    'food', 24, 14, true, 163, 'food'),
  ('toffee',         'food', 26, 14, true, 164, 'food'),
  ('chocolate-bar',  'food', 30, 14, true, 165, 'food'),
  -- Drinks, Lv 17
  ('water-bottle',   'food', 20, 17, true, 170, 'food'),
  ('milk',           'food', 24, 17, true, 171, 'food'),
  ('juice-box',      'food', 26, 17, true, 172, 'food'),
  ('cold-drink',     'food', 28, 17, true, 173, 'food'),
  ('orange-juice',   'food', 30, 17, true, 174, 'food'),
  ('cola',           'food', 32, 17, true, 175, 'food'),
  ('hot-chocolate',  'food', 38, 17, true, 176, 'food'),
  ('milkshake',      'food', 45, 17, true, 177, 'food')
on conflict (item_id) do update
  set slot = excluded.slot, price = excluded.price, min_level = excluded.min_level,
      active = excluded.active, sort = excluded.sort, category = excluded.category;


-- ============================================================
--  1b. THE COOKIE GETS ITS OWN DAY-STAMP
--
--  `last_fed_day` was doing two jobs at once; this splits off the first.
--    last_cookie_day — has the FREE daily cookie been claimed today?
--    last_fed_day    — when did he last eat ANYTHING? (drives the sickness
--                      clock, via _mhq_health)
--  Backfilled from last_fed_day so nobody who already had their cookie
--  today is handed a second one the moment this lands. Nullable, because
--  "never claimed one" is a real state and must not read as 1970-01-01.
--
--  No GRANT: `revoke all on public.students from anon, authenticated` is
--  already in force and every read goes through a SECURITY DEFINER RPC.
-- ============================================================
alter table public.students add column if not exists last_cookie_day date;
update public.students
   set last_cookie_day = students.last_fed_day
 where students.last_cookie_day is null;


-- ============================================================
--  1c. TODAY'S TRAY (S4b, 2026-08-08 revision)
--
--  Groceries no longer live in students.pantry — that column stays exactly
--  what it always was, soup/medicine counts for mhq_care. A bought grocery
--  now lands on students.tray, same {item_id: count} shape as the pantry,
--  day-stamped by students.tray_day.
--
--  LAZY EXPIRY: nothing runs at midnight. Instead, every function that
--  touches the tray (buy, eat, or a plain state read) calls _mhq_tray()
--  first, which returns the stored tray UNCHANGED if tray_day = today, or
--  an empty one if tray_day is null or in the past. A stale tray is never
--  restored — EXPIRED FOOD IS GONE, NO REFUND (her ruling: "they can't
--  just buy and buy and expect a refund"). mhq_get_state additionally
--  WRITES the cleared tray back the first time it notices it is stale, so
--  the clearing is a fact on the row, not just a view of one.
-- ============================================================
alter table public.students add column if not exists tray jsonb not null default '{}'::jsonb;
alter table public.students add column if not exists tray_day date;

create or replace function public._mhq_tray(p_tray jsonb, p_tray_day date)
returns jsonb language sql stable security definer set search_path = public, extensions as $$
  select case when p_tray_day is null or p_tray_day < current_date
              then '{}'::jsonb else coalesce(p_tray, '{}'::jsonb) end;
$$;


-- ============================================================
--  1d. FEED — the free daily cookie, now guarded by its OWN stamp
--
--  Phase-2 body with two lines changed: the once-a-day check reads
--  last_cookie_day, and the update writes BOTH stamps (the cookie is still
--  food, so it still resets the sickness clock). It remains the ONLY thing
--  that grows a blip.
-- ============================================================
create or replace function public.mhq_feed(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_st record; v_stg int; v_blips jsonb;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  perform public._mhq_ensure_blip(v_sid);
  select students.last_fed_day, students.last_cookie_day, students.care_streak
    into v_st from public.students where students.id = v_sid for update;

  v_stg := (public._mhq_health(v_st.last_fed_day, v_st.care_streak)->>'stage')::int;
  -- refuse normal food while sick — he turns his head away
  if v_stg >= 2 then return jsonb_build_object('ok', false, 'error', 'REFUSES_FOOD'); end if;
  -- one free cookie a day, on its OWN stamp: a bought apple no longer eats it
  if v_st.last_cookie_day is not null and v_st.last_cookie_day >= current_date then
    return jsonb_build_object('ok', false, 'error', 'already_fed');
  end if;

  -- the cookie is the ONLY thing that grows a blip (phase-2 ruling, kept)
  update public.blips set feed_count = blips.feed_count + 1 where blips.student_id = v_sid;
  update public.students
     set last_cookie_day = current_date, last_fed_day = current_date, last_active_at = now()
   where students.id = v_sid;

  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', blips.slot, 'name', blips.name, 'colour', blips.colour,
            'feedCount', blips.feed_count,
            'growthStage', public._mhq_growth(blips.feed_count)) order by blips.slot), '[]'::jsonb)
    into v_blips from public.blips where blips.student_id = v_sid;

  return jsonb_build_object('ok', true, 'blips', v_blips,
    'health', public._mhq_health(current_date, v_st.care_streak), 'canFeedToday', false);
end; $$;


-- ============================================================
--  2. STATE — the S2 body, with `minLevel` added to foodShop and (S4b)
--     TODAY'S TRAY discarded-if-stale and added to the payload.
--
--  Everything else is migration-level-curve-40.sql §7 verbatim, because a
--  create-or-replace replaces the WHOLE function: leaving a line out here
--  would silently un-ship S2.
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

  -- S4b: a stale tray (yesterday's groceries) is discarded HERE too — no
  -- refund — and the clearing is written back so it is a fact on the row,
  -- not just a view of it. A fresh tray costs nothing extra: v_st.tray is
  -- already '{}' and this simply confirms it.
  if v_st.tray_day is not null and v_st.tray_day < current_date then
    update public.students set tray = '{}'::jsonb where students.id = v_sid;
    v_st.tray := '{}'::jsonb;
  end if;

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
  -- S4: `minLevel` added. The grocery tiers are level-gated like cosmetics,
  -- and without this the client could not say "Unlocks at Lv N" on a food
  -- card, nor grey out a food it cannot buy yet.
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', shop_items.item_id, 'kind', shop_items.item_id,
            'price', shop_items.price, 'minLevel', shop_items.min_level) order by shop_items.sort), '[]'::jsonb)
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
  -- S4: the cookie's availability now reads its OWN stamp, so eating a
  -- bought grocery (which sets last_fed_day) leaves the cookie waiting.
  v_can_feed := (v_stg < 2) and (v_st.last_cookie_day is null or v_st.last_cookie_day < current_date);
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
    'pantry', v_st.pantry, 'tray', coalesce(v_st.tray, '{}'::jsonb), 'health', v_health,
    'canFeedToday', v_can_feed, 'canCareToday', v_can_care,
    'termRunning', (select coalesce((app_config.value = 'true'), false)
                      from public.app_config where app_config.key = 'term_running'),
    'assignment', v_assignment,
    'boxes', jsonb_build_object(
       'pending', coalesce(v_st.boxes_pending, 0) + v_mystery,
       'mystery', v_mystery),
    'trinkets', coalesce(v_st.trinkets, '[]'::jsonb));
end; $$;


-- ============================================================
--  3. BUY — the S2 body, with a level gate on the FOOD branch and (S4b)
--     groceries landing on TODAY'S TRAY instead of the pantry.
--
--  The cosmetic branch has always refused an item above the learner's
--  level; food never needed it because every food row was min_level 1.
--  With 44 tiered groceries it does, and "the client only offers what it
--  should" is not a rule — the server has to say no.
--
--  soup / medicine stay min_level 1 and still land in the PANTRY —
--  unchanged, never expire — so the pharmacy is completely unaffected by
--  any of this.
-- ============================================================
create or replace function public.mhq_buy_item(p_username text, p_password text, p_item text, p_slot integer default 1)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; itm record; st record; lvl int; stg int; v_slot int := coalesce(p_slot, 1);
        pan jsonb; cnt int; v_tray jsonb; owned jsonb; new_gold int;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  if v_slot not in (1, 2) then v_slot := 1; end if;
  perform public._mhq_ensure_blip(sid);
  select * into itm from public.shop_items where shop_items.item_id = p_item and shop_items.active;
  if not found then return jsonb_build_object('ok', false, 'error', 'no_item'); end if;
  select students.xp, students.gold, students.pantry, students.tray, students.tray_day,
         students.last_fed_day, students.care_streak
    into st from public.students where students.id = sid for update;
  stg := (public._mhq_health(st.last_fed_day, st.care_streak)->>'stage')::int;
  -- moved ABOVE the food branch (S4) so the grocery tiers can use it too
  lvl := (public._mhq_level(st.xp)->>'level')::int;

  if itm.category = 'food' then
    if p_item = 'treat' then
      if stg >= 2 then return jsonb_build_object('ok', false, 'error', 'REFUSES_FOOD'); end if;
      if st.gold < itm.price then return jsonb_build_object('ok', false, 'error', 'gold', 'price', itm.price, 'gold', st.gold); end if;
      update public.students set gold = students.gold - itm.price where students.id = sid returning students.gold into new_gold;
      return jsonb_build_object('ok', true, 'gold', new_gold, 'treat', true);
    elsif p_item in ('soup', 'medicine') then
      -- pharmacy supplies: the PANTRY, exactly as before S4b — never expire.
      if lvl < itm.min_level then return jsonb_build_object('ok', false, 'error', 'locked', 'minLevel', itm.min_level); end if;
      if st.gold < itm.price then return jsonb_build_object('ok', false, 'error', 'gold', 'price', itm.price, 'gold', st.gold); end if;
      pan := coalesce(st.pantry, '{}'::jsonb);
      cnt := coalesce((pan->>p_item)::int, 0) + 1;
      pan := jsonb_set(pan, array[p_item], to_jsonb(cnt), true);
      update public.students set gold = students.gold - itm.price, pantry = pan where students.id = sid returning students.gold into new_gold;
      return jsonb_build_object('ok', true, 'gold', new_gold, 'pantry', pan);
    else
      -- S4b: a grocery lands on TODAY'S TRAY. A stale tray (yesterday's
      -- leftovers) is discarded first via _mhq_tray — no refund, her ruling.
      if lvl < itm.min_level then return jsonb_build_object('ok', false, 'error', 'locked', 'minLevel', itm.min_level); end if;
      if st.gold < itm.price then return jsonb_build_object('ok', false, 'error', 'gold', 'price', itm.price, 'gold', st.gold); end if;
      v_tray := public._mhq_tray(st.tray, st.tray_day);
      v_tray := jsonb_set(v_tray, array[p_item], to_jsonb(coalesce((v_tray->>p_item)::int, 0) + 1), true);
      update public.students set gold = students.gold - itm.price, tray = v_tray, tray_day = current_date
        where students.id = sid returning students.gold into new_gold;
      return jsonb_build_object('ok', true, 'gold', new_gold, 'tray', v_tray);
    end if;
  end if;

  -- trinkets (and any future non-cosmetic category) are not purchasable
  if itm.category <> 'cosmetic' then return jsonb_build_object('ok', false, 'error', 'no_item'); end if;

  -- cosmetic accessory, on the given blip slot
  if stg >= 3 then return jsonb_build_object('ok', false, 'error', 'BLIP_TOO_SICK'); end if;
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
--  4. EAT — consume one grocery from TODAY'S TRAY (S4b)
--
--  Follows mhq_feed / mhq_care exactly: auth, ensure blip, row lock,
--  refuse while sick, consume, return the fresh state. The client plays
--  the eating moment; the server decides whether it happened.
--
--  NOT EDIBLE HERE: soup and medicine (mhq_care consumes those, together,
--  as one care day — eating the soup separately would break the streak
--  mechanic, and they live in the pantry, not the tray) and 'treat' (a
--  pure gold sink that never lands anywhere, so there is nothing to
--  consume).
--
--  A STALE TRAY READS AS EMPTY — via _mhq_tray, same as buy and state — so
--  yesterday's uneaten groceries report `none_left`, exactly like never
--  having bought them. No refund; that is the whole point of the tray.
--
--  WHAT EATING DOES AND DOES NOT DO (her ruling, see the header):
--    DOES  — consume the food, and reset the sickness clock. It is real
--            food; a learner who feeds him a steak must not still find
--            him starving.
--    DOES NOT — touch the free cookie (its own stamp, last_cookie_day),
--            and does NOT grow him. Growth stays cookie-only, so it can
--            never be bought.
-- ============================================================
create or replace function public.mhq_eat_food(p_username text, p_password text, p_item text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_st record; v_itm record; v_stg int;
        v_tray jsonb; v_cnt int; v_blips jsonb; v_can_feed boolean;
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

  select students.tray, students.tray_day, students.last_fed_day, students.last_cookie_day, students.care_streak
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

  -- last_fed_day resets the clock; the cookie stamp and feed_count (growth)
  -- stay untouched. tray_day is set for completeness — it can only still be
  -- today's here, since a stale tray would have already returned none_left.
  update public.students
     set tray = v_tray, tray_day = current_date, last_fed_day = current_date, last_active_at = now()
   where students.id = v_sid;

  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', blips.slot, 'name', blips.name, 'colour', blips.colour,
            'feedCount', blips.feed_count,
            'growthStage', public._mhq_growth(blips.feed_count),
            'owned', blips.owned_items, 'equipped', blips.equipped) order by blips.slot), '[]'::jsonb)
    into v_blips from public.blips where blips.student_id = v_sid;

  v_can_feed := (v_st.last_cookie_day is null or v_st.last_cookie_day < current_date);

  return jsonb_build_object('ok', true, 'item', p_item, 'tray', v_tray, 'blips', v_blips,
    'health', public._mhq_health(current_date, v_st.care_streak),
    -- the cookie survives a grocery feeding — that is the whole point
    'canFeedToday', v_can_feed);
end; $$;


-- ============================================================
--  5. GRANTS — create-or-replace keeps the grants on the two functions
--     above; the new one needs its own.
-- ============================================================
grant execute on function public.mhq_eat_food(text, text, text) to anon, authenticated;


-- ============================================================
--  6. SMOKE TEST — run AFTER the migration, on live, with a throwaway
--     learner. Replace 'someuser' / 'somepassword'.
--
--    -- 47 food rows now (44 groceries + soup + medicine + treat)
--    select count(*) from public.shop_items where category = 'food' and active;   -- 47
--    select count(*) from public.shop_items where category = 'cosmetic' and active; -- unchanged (63)
--
--    -- the payload carries minLevel, and the tiers are there
--    select jsonb_array_length(public.mhq_get_state('someuser','somepassword') -> 'foodShop');   -- 47
--    select public.mhq_get_state('someuser','somepassword') -> 'foodShop' -> 3;
--
--    -- a level-1 learner can buy an apple but not a steak
--    select public.mhq_buy_item('someuser','somepassword','apple');    -- ok, tray.apple = 1
--    select public.mhq_buy_item('someuser','somepassword','steak');    -- locked, minLevel 11
--    select public.mhq_buy_item('someuser','somepassword','soup');     -- ok, pantry.soup = 1 (unchanged)
--
--    -- eating consumes it, feeds the CLOCK, and leaves the cookie alone
--    select public.mhq_eat_food('someuser','somepassword','apple');    -- ok, canFeedToday TRUE
--    select public.mhq_eat_food('someuser','somepassword','apple');    -- none_left
--    select public.mhq_eat_food('someuser','somepassword','soup');     -- not_edible
--    select public.mhq_eat_food('someuser','somepassword','beanie');   -- no_item
--    select public.mhq_get_state('someuser','somepassword') -> 'canFeedToday';   -- TRUE
--    select feed_count from public.blips where student_id = ... ;      -- UNCHANGED by eating
--
--    -- the free cookie is still there, and IT is what grows him
--    select public.mhq_feed('someuser','somepassword');                -- ok
--    select public.mhq_feed('someuser','somepassword');                -- already_fed
--    select public.mhq_get_state('someuser','somepassword') -> 'canFeedToday';   -- false
--    -- …and eating again afterwards still does not hand the cookie back
--    select public.mhq_buy_item('someuser','somepassword','banana');
--    select public.mhq_eat_food('someuser','somepassword','banana') -> 'canFeedToday';  -- false
--
--    -- S4b: THE TRAY EXPIRES, NO REFUND. Buy something, then move the
--    -- server's clock forward a day (there is no clock to move on live —
--    -- this is what verify-store.html exercises instead via __BLIP_DEV__)
--    -- and confirm the SAME row shows an empty tray and the same gold:
--    select public.mhq_buy_item('someuser','somepassword','grapes');
--    select public.mhq_get_state('someuser','somepassword') -> 'tray';               -- {"grapes":1}
--    -- … a day later, on live, with no action taken …
--    select public.mhq_get_state('someuser','somepassword') -> 'tray';               -- {}
--    select public.mhq_eat_food('someuser','somepassword','grapes');   -- none_left, no refund
-- ============================================================
