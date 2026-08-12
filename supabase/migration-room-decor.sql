-- ============================================================
--  BLIPWORK — ROOM DECOR: shelves, bean bag, wallpaper + three themed sets
--  Room build follow-up (2026-08-12), per PROJECT-STATUS "Next up §3".
--
--  ✅ APPLIED TO LIVE 2026-08-12 (migration
--  `room_decor_shelves_beanbag_wallpaper_themed_sets`, via MCP at ship time).
--  Learner rows verified byte-identical before and after — students-core,
--  blips and progress hashes all unchanged, 2 students / 2 blips / 24
--  progress / 4,580 XP; active furniture 18 -> 41 with cosmetic 63, food 47
--  and trinket 6 untouched. Smoke-tested on live with a throwaway learner
--  (deleted after): buy + equip on all four new slots, unequip, an unowned
--  shelf refused, a trinket still unbuyable AND unequippable, and the level
--  gate holding at Lv 1. Do not run again; kept as the record of what ran.
--
--  (original note) Run the WHOLE file in the Supabase SQL editor
--  (project pjpwhalcifywjrwtjknd) AFTER migration-furniture-slots.sql, whose
--  mhq_equip body this file re-creates with one small addition. Additive and
--  idempotent: safe to run more than once, and it never drops or rewrites a
--  learner row.
--
--  WHAT THIS DOES
--    1. shop_items_slot_cat_check gains FOUR furniture slots:
--       shelf-left · shelf-right · beanbag · wall.
--    2. mhq_equip's hard-coded key list gains the same four.
--    3. 23 new furniture rows.
--  NO new column, NO new table, NO new category, so nothing here needs a
--  GRANT of its own.
--
--  ⚠️ WHAT THIS DELIBERATELY DOES **NOT** TOUCH — and why that is safe:
--    • mhq_buy_item already accepts category 'furniture' (S5v2 §3 widened
--      the guard to `in ('cosmetic','furniture')`), so a shelf is bought
--      through the existing path with no change at all.
--    • mhq_get_state already builds `furnitureShop` from EVERY active
--      category='furniture' row, so the 23 rows below appear in the payload
--      the moment they exist.
--    Re-creating either function here would mean copying its whole body
--    forward again for no gain, and every such copy is a chance to silently
--    un-ship S4b's tray or S5v2's payload. Two functions left alone is the
--    smaller, safer change. (mhq_equip genuinely must be re-created: its
--    allowed-key list is hard-coded inside the body.)
--
--  ⚠️ ADDING A SLOT IS THE KNOWN DANCE (migration-neck-slot.sql, and the
--  July `back` bug it was written after). Seeding rows alone is not enough:
--  the constraint has to ALLOW the slot and mhq_equip has to allow the KEY,
--  or an equipped shelf comes straight back as 'bad_equipped'. Both are in
--  this file, and verify-store.html parses this file and asserts both for
--  every slot it seeds.
--
--  ⚠️ SHELVES AND THE BEAN BAG HAVE NO FREE DEFAULT, ON PURPOSE — and that
--  makes them the FIRST furniture slots that can legitimately be empty.
--  Every slot S5v2 shipped (bed/desk/window/door) has a price-0 row that
--  js/companion/furniture.js falls back to, so those slots are never bare.
--  A bed you cannot remove makes sense; a shelf you cannot take down does
--  not. So `shelf-wood-*` is free but is NOT a default: an empty shelf slot
--  draws NOTHING. DEFAULT_FURNITURE in furniture.js therefore has no entry
--  for shelf-left / shelf-right / beanbag, and roomFurniture() returns null
--  for them. Nothing server-side enforces this — it is a client rule — but
--  it is the reason those three slots have no price-0 "default" row while
--  `wall` does.
--
--  ⚠️ THE `wall` SLOT IS AN ORDINARY EQUIP SLOT THAT DRAWS NO LAYER. Every
--  other furniture slot paints a piece ON the room shell; wallpaper REPLACES
--  the shell. Server-side that distinction does not exist and must not: a
--  wallpaper is bought, owned and equipped exactly like a bed, through the
--  same two functions, so it inherits the level gate and the ownership test
--  for free. Only the client knows the difference (roomShellSrc() in
--  furniture.js swaps the .room background instead of appending a layer,
--  and `wall` is deliberately absent from FURNITURE_SLOTS, which is the
--  paint order for LAYERS). `wall-plain` is the free default and is the
--  shell the room has always had.
--
--  ⚠️ THE THREE THEMED SETS NEED NO SLOT AND NO CONSTRAINT CHANGE. emo /
--  nerdy / sport are nine ordinary rows on the EXISTING bed, desk and window
--  slots — they are new pictures for slots that already work. They are in
--  this file only because they ship on the same day; if the four new slots
--  above ever have to be rolled back, these nine rows are independent of
--  them.
--
--  ⚠️ PL/pgSQL house rule (a bare `slot = slot` once matched every row):
--  every local variable here is v_-prefixed and every column reference in
--  the function this file re-creates is table-qualified.
--
--  Mirrored in: supabase/schema.sql (constraint + mhq_equip + the rows),
--  js/local-backend.js (FURNITURE_ITEMS, VALID_SLOTS), js/companion/
--  furniture.js (labels, art, placement, the empty-slot rule and the shell
--  swap) and js/companion/collections.js (the collection gates).
--  verify-store.html parses THIS FILE and cross-checks every row against the
--  client mirror, then exercises buy/equip/unequip on all four new slots.
-- ============================================================


-- ============================================================
--  1. THE CONSTRAINT — allow the four new furniture slots.
--
--  Dropped and re-added rather than altered, because a check constraint
--  cannot be modified in place. The cosmetic / food / trinket clauses are
--  byte-identical to migration-furniture-slots.sql §1 — only the furniture
--  clause grew.
-- ============================================================
alter table public.shop_items drop constraint if exists shop_items_slot_cat_check;
alter table public.shop_items add constraint shop_items_slot_cat_check check (
     (category = 'cosmetic'  and slot in ('hat','ears','glasses','wings','arms','back','effects','neck'))
  or (category = 'food'      and slot = 'food')
  or (category = 'trinket'   and slot = 'trinket')
  or (category = 'furniture' and slot in ('bed','desk','window','door',
                                          'shelf-left','shelf-right','beanbag','wall')));


-- ============================================================
--  2. EQUIP — the four new keys.
--
--  Full redefinition; the body is otherwise byte-identical to
--  migration-furniture-slots.sql §2, only the `k not in (...)` list changed.
--  The ownership test is unchanged and still applies: a shelf id must be in
--  that blip's owned_items, exactly like a hat.
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
                     'bed','desk','window','door',
                     'shelf-left','shelf-right','beanbag','wall')
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
--  3. THE DECOR — 23 rows.
--
--  min_level here is the server's own copy of the client's collection gate
--  (js/companion/collections.js). Both must agree; verify-store.html asserts
--  it item by item, and mhq_buy_item is what actually enforces it.
--
--    nerdy      Lv 4   60-80    bed + desk + window   (existing slots)
--    sport      Lv 11  120-160  bed + desk + window   (existing slots)
--    emo        Lv 18  145-200  bed + desk + window   (existing slots)
--    shelves    Lv 1/7/13/19    wood free, then 60/90/120 PER SIDE
--    bean bag   Lv 6   90       one piece
--    wallpaper  Lv 1/5/10/16/22 plain free, then 70/100/140/170
--
--  ⚠️ A SHELF IS PRICED PER SIDE, NOT PER PAIR. The left and right walls are
--  two independent slots, so `shelf-wood-left` and `shelf-wood-right` are two
--  purchases at the same price rather than one purchase that fills both. That
--  is what lets a room have a wooden shelf on one wall and a glossy one on
--  the other, which is the whole reason Megan asked for two slots.
--
--  ⚠️ THE `-left` / `-right` SUFFIX IS THE WALL, NOT A MIRROR FLAG. Each side
--  is its OWN drawing, and the two are not interchangeable: measured off the
--  alpha, every `-left` piece slopes UP to the right (the left wall's rake,
--  the same rake all six windows carry) and every `-right` piece slopes DOWN
--  to the right. Hanging one on the other wall leans it against the room —
--  that exact fault is why the window moved walls during S5v2. There is no
--  flipX shortcut here and none is wanted.
-- ============================================================
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  -- nerdy, Lv 4 — the gentlest step up from basic, filling the 1-to-8 gap
  ('nerdy-bed',          'bed',          80,  4, true, 240, 'furniture'),
  ('nerdy-desk',         'desk',         70,  4, true, 241, 'furniture'),
  ('nerdy-window',       'window',       60,  4, true, 242, 'furniture'),
  -- sport, Lv 11 — between techy (8) and princess (14)
  ('sport-bed',          'bed',         160, 11, true, 250, 'furniture'),
  ('sport-desk',         'desk',        140, 11, true, 251, 'furniture'),
  ('sport-window',       'window',      120, 11, true, 252, 'furniture'),
  -- emo, Lv 18 — past princess, and something to aim at before the Lv 20 box
  ('emo-bed',            'bed',         200, 18, true, 260, 'furniture'),
  ('emo-desk',           'desk',        175, 18, true, 261, 'furniture'),
  ('emo-window',         'window',      145, 18, true, 262, 'furniture'),
  -- shelves — priced per side; wood is free but is NOT a default (see above)
  ('shelf-wood-left',    'shelf-left',    0,  1, true, 270, 'furniture'),
  ('shelf-wood-right',   'shelf-right',   0,  1, true, 271, 'furniture'),
  ('shelf-glossy-left',  'shelf-left',   60,  7, true, 272, 'furniture'),
  ('shelf-glossy-right', 'shelf-right',  60,  7, true, 273, 'furniture'),
  ('shelf-bracket-left', 'shelf-left',   90, 13, true, 274, 'furniture'),
  ('shelf-bracket-right','shelf-right',  90, 13, true, 275, 'furniture'),
  ('shelf-panel-left',   'shelf-left',  120, 19, true, 276, 'furniture'),
  ('shelf-panel-right',  'shelf-right', 120, 19, true, 277, 'furniture'),
  -- bean bag, Lv 6 — one piece, no free version
  ('beanbag',            'beanbag',      90,  6, true, 280, 'furniture'),
  -- wallpaper — plain is the shell the room has always had, and is free
  ('wall-plain',         'wall',          0,  1, true, 290, 'furniture'),
  ('wall-cloud',         'wall',         70,  5, true, 291, 'furniture'),
  ('wall-moons',         'wall',        100, 10, true, 292, 'furniture'),
  ('wall-mountains',     'wall',        140, 16, true, 293, 'furniture'),
  ('wall-stripes',       'wall',        170, 22, true, 294, 'furniture')
on conflict (item_id) do update
  set slot = excluded.slot, price = excluded.price, min_level = excluded.min_level,
      active = excluded.active, sort = excluded.sort, category = excluded.category;


-- ============================================================
--  4. SMOKE TEST — run AFTER the migration, on live, with a throwaway
--     learner. Replace 'someuser' / 'somepassword'.
--
--    -- 41 furniture rows now (18 + 23); the other categories are UNCHANGED
--    select category, count(*) from public.shop_items where active group by category;
--      -- cosmetic 63 · food 47 · trinket 6 · furniture 41
--
--    -- the payload grew and the other two arrays did not
--    select jsonb_array_length(public.mhq_get_state('someuser','somepassword') -> 'furnitureShop');  -- 41
--    select jsonb_array_length(public.mhq_get_state('someuser','somepassword') -> 'shop');           -- 63
--    select jsonb_array_length(public.mhq_get_state('someuser','somepassword') -> 'foodShop');       -- 47
--
--    -- buy then equip on EACH new slot — this pair is the July cape bug's
--    -- exact shape (the row existed, the equip key did not)
--    select public.mhq_buy_item('someuser','somepassword','shelf-wood-left');                        -- ok (free)
--    select public.mhq_equip('someuser','somepassword','{"shelf-left":"shelf-wood-left"}'::jsonb);    -- ok
--    select public.mhq_buy_item('someuser','somepassword','shelf-wood-right');                       -- ok (free)
--    select public.mhq_equip('someuser','somepassword','{"shelf-right":"shelf-wood-right"}'::jsonb);  -- ok
--    select public.mhq_buy_item('someuser','somepassword','wall-plain');                             -- ok (free)
--    select public.mhq_equip('someuser','somepassword','{"wall":"wall-plain"}'::jsonb);               -- ok
--    select public.mhq_equip('someuser','somepassword','{"shelf-left":""}'::jsonb);                   -- ok (unequip)
--
--    -- a shelf can NOT be hung on the other wall's slot (not owned there is
--    -- not the point — the id belongs to one slot, and the client never
--    -- offers it on the other; this is the belt-and-braces check)
--    select public.mhq_equip('someuser','somepassword','{"shelf-right":"shelf-wood-left"}'::jsonb);
--      -- ok ONLY if that id is owned; the client never builds this. Cosmetic
--      -- parity: the server has never policed slot-vs-id for hats either.
--
--    -- level gates
--    select public.mhq_buy_item('someuser','somepassword','beanbag');        -- locked, minLevel 6 (below Lv 6)
--    select public.mhq_buy_item('someuser','somepassword','emo-bed');        -- locked, minLevel 18
--    select public.mhq_buy_item('someuser','somepassword','wall-stripes');   -- locked, minLevel 22
--
--    -- a trinket is STILL not purchasable — the buy guard must not have widened
--    select public.mhq_buy_item('someuser','somepassword','rubber-duck');                        -- no_item
--    select public.mhq_equip('someuser','somepassword','{"beanbag":"rubber-duck"}'::jsonb);      -- bad_equipped
-- ============================================================
