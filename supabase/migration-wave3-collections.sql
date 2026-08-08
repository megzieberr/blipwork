-- ============================================================
--  Blipwork — room build S3: wave-3 themed collections   (2026-08-08)
-- ------------------------------------------------------------
--  WHAT: sixteen new cosmetics — ten themed accessories (fairy/girly/
--  tomboy/gangster, from art-source/tripo/WAVE-3-PROMPTS.md sheets H-K)
--  plus six eye-pair overlays (sheets L-M). All Megan's own Tripo art,
--  keyed out of her flat-magenta sheets by tools/tripo_sheet.py.
--
--  NO NEW SLOT. Every row below uses 'hat', 'glasses' or 'wings', all
--  already allowed by shop_items_slot_cat_check and mhq_equip — so
--  neither is touched here (unlike the back/effects/neck ships).
--
--  NOT WIRED: 'star-wand' (sheet H item 2) — Blip has no hands, so it has
--  no slot and stays cut, per PROJECT-STATUS "Next up" and the S3 brief.
--  Not seeded here on purpose.
--
--  COLLECTIONS are a CLIENT-ONLY grouping (js/companion/collections.js) —
--  below its unlock level a whole collection renders as one locked card
--  in the shop. min_level below is the item's own gate, used once its
--  collection is already unlocked; every item here is priced/levelled to
--  match its collection's threshold (ROOM-BUILD-PLAN.md's table):
--    tomboy Lv9 · girly Lv12 · fairy Lv16 · gangster Lv20 · eye pairs Lv5.
--  'chunky-chain' (already live, migration-neck-chunky-chain.sql) also
--  joins the "gangster" collection client-side — nothing to seed for it
--  here, its price/level are untouched.
--
--  NOT CHANGED: mhq_open_box — its rare cosmetic pool is already "any
--  active cosmetic with price >= 120, any level", so fairy-wing and tiara
--  join the milestone loot table on their own, same as every other rare.
--
--  ✅ APPLIED TO LIVE 2026-08-08 (migration `room_build_s3_wave3_collections_
--  sixteen_items`). Kept as the record of what ran.
--
--  ROLLBACK: `update public.shop_items set active = false where item_id in
--  (...the sixteen ids below...);`
-- ============================================================

insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  -- tomboy (Lv9)
  ('backwards-cap', 'hat',      70,  9, true,  98, 'cosmetic'),
  ('sport-shades',  'glasses',  65,  9, true,  90, 'cosmetic'),
  ('bucket-hat',    'hat',      60,  9, true,  99, 'cosmetic'),
  -- girly (Lv12)
  ('hair-bow',      'hat',      75, 12, true, 103, 'cosmetic'),
  ('tiara',         'hat',     130, 12, true, 101, 'cosmetic'),   -- RARE
  ('butterfly-wing','wings',    95, 12, true, 104, 'cosmetic'),
  -- fairy (Lv16)
  ('fairy-wing',    'wings',   150, 16, true, 105, 'cosmetic'),   -- RARE
  ('flower-crown',  'hat',      90, 16, true, 102, 'cosmetic'),
  -- gangster (Lv20)
  ('gold-shades',   'glasses',  85, 20, true,  91, 'cosmetic'),
  ('snapback',      'hat',      80, 20, true, 100, 'cosmetic'),
  -- eye pairs (Lv5) — happy-eyes is the weakest of the six by Megan's own
  -- note (an unwanted mouth had to be masked out of the source sheet); she
  -- may re-roll it later, shipped as-is for now.
  ('star-eyes',     'glasses',  50,  5, true,  92, 'cosmetic'),
  ('angry-eyes',    'glasses',  45,  5, true,  93, 'cosmetic'),
  ('happy-eyes',    'glasses',  40,  5, true,  94, 'cosmetic'),
  ('lash-eyes',     'glasses',  55,  5, true,  95, 'cosmetic'),
  ('dreamy-eyes',   'glasses',  50,  5, true,  96, 'cosmetic'),
  ('wink-eyes',     'glasses',  60,  5, true,  97, 'cosmetic')
on conflict (item_id) do update
  set slot = excluded.slot, price = excluded.price, min_level = excluded.min_level,
      active = excluded.active, sort = excluded.sort, category = excluded.category;
