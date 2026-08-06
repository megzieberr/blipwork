-- ============================================================
--  Blipwork — TRIPO WAVE 2, techy accessories   (2026-08-06)
-- ------------------------------------------------------------
--  WHAT: ten new cosmetics, all Megan's own Tripo art keyed out of her
--  flat-magenta sheets by tools/tripo_sheet.py and rendered as PNG layers.
--  Shop 34 -> 43 items. Five of the fifteen drawn were cut on sight by Megan
--  (scanner band, energy core, circuit ring, grid ring, plasma ring), and the
--  wave-1 shadow-crown was retired at the same time — see the end of this file.
--
--  WHY THESE: after wave 1 the shop was lopsided — Hat 7 / Eyes 7 / Wings 5
--  / Effects 5 / Back 4, but Ears 3 and Arms 3, so two slots had almost
--  nothing to choose between. Ears and arms get three items each here; the
--  rest spread across head and wings. Effects and back keep what they had.
--
--  NO NEW SLOT. That is the whole reason this migration is short: the July
--  back-slot ship and the August effects-slot ship each had to widen
--  shop_items_slot_cat_check AND mhq_equip's hard-coded key list, because
--  seeding rows alone leaves equip returning 'bad_equipped'. Every slot used
--  below already exists in both, so neither is touched.
--
--  NOT CHANGED: mhq_open_box — its cosmetic pool is already "any active
--  cosmetic at or below the learner's level with price > 0", so all ten
--  join the loot table on their own. No ids were renamed, so nothing owned
--  or equipped is disturbed.
--
--  ROLLBACK: `update public.shop_items set active = false where item_id in
--  (...the ten ids below...);`
-- ============================================================

-- ------------------------------------------------------------
--  The ten new items.
--    Prices follow the existing bands: >= 120 is the violet RARE frame,
--    which by house rule is always level 6+. Rarity is DERIVED from price
--    in itemRarity(), so there is no rarity column to set.
--    `sort` keeps each slot grouped in shop order — glasses in the 10s,
--    ears 20s, hat 30s, arms 40s, wings 50s.
-- ------------------------------------------------------------
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  -- eyes
  ('hud-monocle',   'glasses',  55,  2, true, 17, 'cosmetic'),
  -- ears (thin slot: 3 -> 6)
  ('tech-antenna',  'ears',     40,  2, true, 23, 'cosmetic'),
  ('headset-cup',   'ears',     70,  3, true, 24, 'cosmetic'),
  ('data-fin',      'ears',     95,  4, true, 25, 'cosmetic'),
  -- hat
  ('neural-crown',  'hat',     165,  7, true, 37, 'cosmetic'),   -- RARE
  -- arms (thin slot: 3 -> 6)
  ('mech-gauntlet', 'arms',     70,  3, true, 44, 'cosmetic'),
  ('grapple-claw',  'arms',     85,  4, true, 45, 'cosmetic'),
  ('energy-blade',  'arms',    135,  6, true, 46, 'cosmetic'),   -- RARE
  -- wings
  ('drone-wings',   'wings',   140,  6, true, 55, 'cosmetic'),   -- RARE
  ('plasma-wings',  'wings',   155,  6, true, 56, 'cosmetic')    -- RARE
on conflict (item_id) do update
  set slot = excluded.slot, price = excluded.price, min_level = excluded.min_level,
      active = excluded.active, sort = excluded.sort, category = excluded.category;

-- ------------------------------------------------------------
--  Retired: shadow-crown ("Monarch's shadow"), Megan's call on seeing it
--  worn (2026-08-06). Seeded live by migration-effects-slot.sql, which is
--  left untouched — it records what actually ran. A plain delete is safe
--  because the app is not with any learner yet: nobody can own or have
--  equipped it. If that ever stops being true, use
--  `update public.shop_items set active = false ...` instead, so the item
--  leaves the shop without being confiscated from anyone's closet.
-- ------------------------------------------------------------
delete from public.shop_items where item_id = 'shadow-crown';
