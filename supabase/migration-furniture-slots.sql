-- ============================================================
--  BLIPWORK — FURNITURE: four new equip slots (bed, desk, window, door)
--  Room build S5v2 (2026-08-08), per the REVISION section of
--  homework-hub-companion/ROOM-BUILD-PLAN.md (the isometric room).
--
--  ✅ APPLIED TO LIVE 2026-08-08 (migration `room_build_s5v2_furniture_slots`,
--  via MCP at ship time). Learner rows verified byte-identical. Do not run
--  again; kept as the record of what ran.
--
--  (original note) Run the WHOLE file in the Supabase SQL editor (project
--  pjpwhalcifywjrwtjknd) AFTER migration-food-shop.sql, whose
--  mhq_get_state / mhq_buy_item bodies this file re-creates with one small
--  addition each. Additive and idempotent: safe to run more than once, and
--  it never drops or rewrites a learner row.
--
--  WHAT THIS DOES
--    1. shop_items_slot_cat_check gains a FURNITURE clause.
--    2. mhq_equip's hard-coded key list gains bed / desk / window / door.
--    3. mhq_buy_item accepts category 'furniture' (it previously refused
--       every non-cosmetic, non-food row by design — see §3).
--    4. mhq_get_state gains a `furnitureShop` array, beside `shop` and
--       `foodShop`.
--    5. 18 furniture rows.
--  NO new column, NO new table, so nothing here needs a GRANT of its own.
--
--  ⚠️ ADDING A SLOT IS THE KNOWN DANCE (see migration-neck-slot.sql, and
--  the July `back` bug it was written after). Seeding rows alone is not
--  enough: the constraint has to ALLOW the slot and mhq_equip has to allow
--  the KEY, or an equipped bed comes straight back as 'bad_equipped'.
--  Both are in this file, and verify-store.html parses this file and
--  asserts both for every slot it seeds.
--
--  ⚠️ WHY category = 'furniture' AND NOT 'cosmetic' (a judgement call —
--  rule 9, recorded in PROJECT-STATUS.md). The plan says "four new equip
--  slots" without naming a category, and 'cosmetic' looks like the smaller
--  change. It is not, because `category = 'cosmetic'` is load-bearing in
--  three places that have nothing to do with rooms:
--     • mhq_get_state's `shop` payload (the cosmetic Shop/Inventory panels
--       would have started listing beds),
--     • mhq_open_box's RARE pool for milestone boxes (price >= 120, ANY
--       level) — a mystery box would have paid out "Canopy bed" as a rare
--       cosmetic, which the reveal UI cannot even draw on Blip, and
--     • the assignment chest's pool (price > 0 and min_level <= level).
--  Trinkets already set the precedent in this schema: a thing that is not
--  a cosmetic gets its own category, and the payload's category filter
--  then keeps it out of all three for free. Furniture differs from a
--  trinket only in being sellable and equippable, which is exactly what
--  §3 and §4 below add.
--
--  ⚠️ FURNITURE IS PER BLIP, like every other equipped thing, because it
--  rides blips.equipped / blips.owned_items through the existing
--  mhq_equip + mhq_buy_item machinery the plan told this session to reuse.
--  A two-blip household therefore has two rooms. Trinkets went the other
--  way (household-wide, on students) because a shelf has no equip slot to
--  ride. Recorded rather than silently chosen: making furniture
--  household-wide would mean a new column, a new RPC and a new GRANT, and
--  the plan explicitly asked for the mhq_equip dance instead.
--
--  ⚠️ PL/pgSQL house rule (a bare `slot = slot` once matched every row):
--  every local variable here is v_-prefixed and every column reference in
--  the functions this file re-creates is table-qualified.
--
--  Mirrored in: supabase/schema.sql (constraint + all three function
--  changes + the rows), js/local-backend.js (FURNITURE_ITEMS, VALID_SLOTS,
--  the furnitureShop payload and the buy path), js/companion/furniture.js
--  (labels, art and placement) and js/companion/collections.js (the
--  collection gates). verify-store.html parses THIS FILE and cross-checks
--  every row against the client mirror, then exercises equip/unequip on
--  all four slots against the local backend.
-- ============================================================


-- ============================================================
--  1. THE CONSTRAINT — allow the four furniture slots.
--
--  Same shape trinkets used: its own category AND its own slot values, so
--  no existing clause changes meaning. Dropped and re-added rather than
--  altered, because a check constraint cannot be modified in place.
-- ============================================================
alter table public.shop_items drop constraint if exists shop_items_slot_cat_check;
alter table public.shop_items add constraint shop_items_slot_cat_check check (
     (category = 'cosmetic'  and slot in ('hat','ears','glasses','wings','arms','back','effects','neck'))
  or (category = 'food'      and slot = 'food')
  or (category = 'trinket'   and slot = 'trinket')
  or (category = 'furniture' and slot in ('bed','desk','window','door')));


-- ============================================================
--  2. EQUIP — the four new keys.
--
--  Full redefinition; the body is otherwise byte-identical to the
--  neck-slot version, only the `k not in (...)` list changed. Note the
--  ownership test is unchanged and still applies: a furniture id must be
--  in that blip's owned_items, exactly like a hat.
-- ============================================================
create or replace function public.mhq_equip(
  p_username text, p_password text, p_equipped jsonb default null,
  p_colour text default null, p_blip_name text default null, p_slot integer default 1)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; b record; st record; bad int; nm text; v_slot int := coalesce(p_slot, 1);
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  if v_slot not in (1, 2) then v_slot := 1; end if;
  perform public._mhq_ensure_blip(sid);
  select students.last_fed_day, students.care_streak, students.xp
    into st from public.students where students.id = sid;
  if (public._mhq_health(st.last_fed_day, st.care_streak)->>'stage')::int >= 2 then
    return jsonb_build_object('ok', false, 'error', 'BLIP_TOO_SICK');
  end if;
  select blips.owned_items into b from public.blips where blips.student_id = sid and blips.slot = v_slot;
  if not found then return jsonb_build_object('ok', false, 'error', 'no_blip'); end if;

  if p_equipped is not null then
    if jsonb_typeof(p_equipped) <> 'object' then return jsonb_build_object('ok', false, 'error', 'bad_equipped'); end if;
    select count(*) into bad from jsonb_each_text(p_equipped) e(k, v)
     where k not in ('hat','ears','glasses','wings','arms','back','effects','neck',
                     'bed','desk','window','door')
        or (coalesce(v, '') <> '' and not b.owned_items ? v);
    if bad > 0 then return jsonb_build_object('ok', false, 'error', 'bad_equipped'); end if;
    update public.blips set equipped = p_equipped where blips.student_id = sid and blips.slot = v_slot;
  end if;

  if p_colour is not null then
    if p_colour not in ('blue','cream','pink','mint','sky','lilac','peach','lemon','seafoam','coral','lavender')
      then return jsonb_build_object('ok', false, 'error', 'bad_colour'); end if;
    -- blue is the free starting colour (SL restyle); the first CHANGE away from
    -- it still requires xp > 0 (the original first-completion reward gate).
    if p_colour <> 'blue' and v_slot = 1 and st.xp <= 0
      then return jsonb_build_object('ok', false, 'error', 'colour_locked'); end if;
    update public.blips set colour = p_colour where blips.student_id = sid and blips.slot = v_slot;
  end if;

  if p_blip_name is not null then
    nm := left(btrim(p_blip_name), 24);
    if nm = '' then return jsonb_build_object('ok', false, 'error', 'bad_name'); end if;
    update public.blips set name = nm where blips.student_id = sid and blips.slot = v_slot;
  end if;

  return (select jsonb_build_object('ok', true, 'slot', v_slot, 'blip', jsonb_build_object(
    'name', blips.name, 'colour', blips.colour, 'owned', blips.owned_items, 'equipped', blips.equipped))
    from public.blips where blips.student_id = sid and blips.slot = v_slot);
end; $$;


-- ============================================================
--  3. BUY — the S4b body, with furniture allowed down the cosmetic path.
--
--  The only change is the guard that used to read
--      if itm.category <> 'cosmetic' then ... 'no_item'
--  and now allows 'furniture' too. Everything after it — the sick lock,
--  ownership, the level gate, the price — is what furniture wants anyway:
--  a bed is bought once, onto a blip's owned_items, at a level gate. A
--  TRINKET is still refused by exactly the same line, which is the whole
--  reason the guard exists.
--
--  Everything else is migration-food-shop.sql §3 verbatim, because a
--  create-or-replace replaces the WHOLE function: leaving a line out here
--  would silently un-ship S4b's tray.
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

  -- Trinkets (and any future non-buyable category) are not purchasable at
  -- all. Without this guard the function falls through to the branch below
  -- for ANY non-food row, so a crafted request could "buy" a price-0
  -- trinket. S5v2 lets FURNITURE through — a bed really is bought, owned
  -- and equipped exactly like a hat — and nothing else.
  if itm.category not in ('cosmetic', 'furniture') then
    return jsonb_build_object('ok', false, 'error', 'no_item');
  end if;

  -- cosmetic accessory or furniture, on the given blip slot
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
--  4. STATE — the S4b body, with a `furnitureShop` array added.
--
--  A separate array for the same reason `foodShop` is separate: `shop`
--  keeps its exact shape, and the client's cosmetic panels keep filtering
--  on it without learning what a bed is. Same four fields as `shop`
--  (id / slot / price / minLevel) so the furniture panel can reuse the
--  cards the cosmetic shop already draws.
--
--  Everything else is migration-food-shop.sql §2 verbatim, because a
--  create-or-replace replaces the WHOLE function.
-- ============================================================
create or replace function public.mhq_get_state(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_prog jsonb; v_total int; v_open_q jsonb; v_st record;
        v_shop jsonb; v_food jsonb; v_furn jsonb; v_blips_j jsonb; v_blip1 jsonb;
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
  -- refund — and the clearing is written back so it is a fact on the row.
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

  -- category = 'cosmetic' is what keeps trinkets AND furniture out of the
  -- shop payload — and out of both treasure-box loot pools with it.
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', shop_items.item_id, 'slot', shop_items.slot,
            'price', shop_items.price, 'minLevel', shop_items.min_level) order by shop_items.sort), '[]'::jsonb)
    into v_shop from public.shop_items where shop_items.active and shop_items.category = 'cosmetic';
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', shop_items.item_id, 'kind', shop_items.item_id,
            'price', shop_items.price, 'minLevel', shop_items.min_level) order by shop_items.sort), '[]'::jsonb)
    into v_food from public.shop_items where shop_items.active and shop_items.category = 'food';
  -- S5v2: the furniture catalogue. Its own array, same fields as `shop`.
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', shop_items.item_id, 'slot', shop_items.slot,
            'price', shop_items.price, 'minLevel', shop_items.min_level) order by shop_items.sort), '[]'::jsonb)
    into v_furn from public.shop_items where shop_items.active and shop_items.category = 'furniture';

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
    'furnitureShop', v_furn,
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
--  5. THE FURNITURE — 18 rows.
--
--  COLLECTIONS v2 (ROOM-BUILD-PLAN.md REVISION ruling 5). Which collection
--  a piece belongs to is a CLIENT grouping (js/companion/collections.js, so
--  Megan can retune a gate without a migration), but min_level here is the
--  server's own copy of that gate and mhq_buy_item enforces it. Both must
--  agree; verify-store.html asserts it item by item.
--
--    basic     Lv 1   free    bed + desk + city window
--    techy     Lv 8   110-150 capsule bed + holo desk + space window
--    princess  Lv 14  130-180 canopy bed + vanity desk + mountain window
--    doors     Lv 1   0-20    door-white free, 8 colours at 10-20
--
--  THE FOUR FREE DEFAULTS are basic-bed, basic-desk, city-window and
--  door-white — price 0, min_level 1, bought exactly like the free
--  cosmetic tier (the client shows them as "Get it free"). The room does
--  NOT wait for that purchase to look furnished: js/companion/furniture.js
--  falls back to these four whenever a slot is empty, so a brand-new
--  learner walks into a complete room and buying the free item is what
--  makes it switchable rather than what makes it appear. Recorded as a
--  judgement call in PROJECT-STATUS.md.
--
--  ⚠️ THE DOOR COLOURS ALL SHARE ONE PICTURE. There is exactly one door
--  drawing (assets/companion/furniture/door.png, from art-source/tripo/
--  door.png) and every colour below is that same file TINTED IN CODE,
--  through the offscreen-canvas pipeline Blip's own recolouring already
--  uses (renderer.js tintedImageSrc). Her ruling: never one PNG per
--  colour. Nothing about that is visible from here — these rows carry no
--  art reference at all, which is exactly the point — but a future session
--  reading this list must not "fix" it by drawing eight more doors.
-- ============================================================
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  -- basic — the free tier every room starts furnished with
  ('basic-bed',       'bed',      0,  1, true, 200, 'furniture'),
  ('basic-desk',      'desk',     0,  1, true, 201, 'furniture'),
  ('city-window',     'window',   0,  1, true, 202, 'furniture'),
  ('door-white',      'door',     0,  1, true, 203, 'furniture'),
  -- techy, Lv 8
  ('techy-bed',       'bed',    150,  8, true, 210, 'furniture'),
  ('techy-desk',      'desk',   130,  8, true, 211, 'furniture'),
  ('space-window',    'window', 110,  8, true, 212, 'furniture'),
  -- princess, Lv 14
  ('princess-bed',    'bed',    180, 14, true, 220, 'furniture'),
  ('princess-desk',   'desk',   160, 14, true, 221, 'furniture'),
  ('mountain-window', 'window', 130, 14, true, 222, 'furniture'),
  -- door colours, Lv 1 — one drawing, tinted in code
  ('door-mint',       'door',    10,  1, true, 230, 'furniture'),
  ('door-sky',        'door',    10,  1, true, 231, 'furniture'),
  ('door-pink',       'door',    12,  1, true, 232, 'furniture'),
  ('door-lemon',      'door',    12,  1, true, 233, 'furniture'),
  ('door-peach',      'door',    15,  1, true, 234, 'furniture'),
  ('door-lilac',      'door',    15,  1, true, 235, 'furniture'),
  ('door-coral',      'door',    18,  1, true, 236, 'furniture'),
  ('door-seafoam',    'door',    20,  1, true, 237, 'furniture')
on conflict (item_id) do update
  set slot = excluded.slot, price = excluded.price, min_level = excluded.min_level,
      active = excluded.active, sort = excluded.sort, category = excluded.category;


-- ============================================================
--  6. SMOKE TEST — run AFTER the migration, on live, with a throwaway
--     learner. Replace 'someuser' / 'somepassword'.
--
--    -- 18 furniture rows, and the cosmetic/food counts are UNCHANGED
--    select category, count(*) from public.shop_items where active group by category;
--      -- cosmetic 63 · food 47 · trinket 6 · furniture 18
--
--    -- the new payload array is there and the old ones did not change size
--    select jsonb_array_length(public.mhq_get_state('someuser','somepassword') -> 'furnitureShop');  -- 18
--    select jsonb_array_length(public.mhq_get_state('someuser','somepassword') -> 'shop');           -- 63
--    select jsonb_array_length(public.mhq_get_state('someuser','somepassword') -> 'foodShop');       -- 47
--
--    -- buy a free default, then equip it — this is the pair that the July
--    -- cape bug broke (the row existed, the equip key did not)
--    select public.mhq_buy_item('someuser','somepassword','basic-bed');        -- ok
--    select public.mhq_equip('someuser','somepassword','{"bed":"basic-bed"}'::jsonb);   -- ok
--    select public.mhq_equip('someuser','somepassword','{"bed":""}'::jsonb);            -- ok (unequip)
--    select public.mhq_equip('someuser','somepassword','{"bed":"techy-bed"}'::jsonb);   -- bad_equipped (not owned)
--
--    -- level gates and the door colours
--    select public.mhq_buy_item('someuser','somepassword','techy-bed');   -- locked, minLevel 8 (below Lv 8)
--    select public.mhq_buy_item('someuser','somepassword','door-mint');   -- ok, 10 diamonds
--
--    -- a trinket is STILL not purchasable — §3's guard must not have widened
--    select public.mhq_buy_item('someuser','somepassword','rubber-duck');           -- no_item
--    select public.mhq_equip('someuser','somepassword','{"bed":"rubber-duck"}'::jsonb); -- bad_equipped
-- ============================================================
