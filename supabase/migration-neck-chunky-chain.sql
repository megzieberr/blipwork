-- ============================================================
--  Blipwork — the gangster chain returns, wide (2026-08-07)
--
--  migration-neck-necklaces.sql DELETED 'gold-chain': the original art was
--  a deep U (0.75:1) that crossed Blip's eyes at every size tried. Megan
--  regenerated it to the wide-and-shallow brief (1.75:1, chunky links,
--  small medallion) and it now places cleanly.
--
--  NEW id on purpose. An applied migration is never edited, so the delete
--  stands in the older file — and verify-store.html enforces that a
--  retired id never reappears in the client mirror. 'chunky-chain' is the
--  same item in spirit under a fresh id; its display label is still
--  "Gold chain".
--
--  Rows only — 'neck' is already allowed in shop_items_slot_cat_check and
--  mhq_equip. Safe to re-run. Touches no learner data.
-- ============================================================

insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  -- >= 120 renders in the violet RARE frame; house rule says rare is L6+.
  -- Top of the neck ladder, above the medal-choker.
  ('chunky-chain', 'neck', 160, 7, true, 87, 'cosmetic')
on conflict (item_id) do update
  set slot = excluded.slot, price = excluded.price, min_level = excluded.min_level,
      active = excluded.active, sort = excluded.sort, category = excluded.category;
