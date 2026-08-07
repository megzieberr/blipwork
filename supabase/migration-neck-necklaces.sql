-- ============================================================
--  Blipwork — six wide necklaces for the neck slot (2026-08-07)
--
--  Follows migration-neck-slot.sql, which created the slot itself. That
--  migration is already APPLIED, so nothing here touches the constraint
--  or mhq_equip — 'neck' is allowed in both already. This is rows only.
--
--  WHY THESE SIX: the slot shipped with one item (the gangster gold
--  chain), which breaks two house rules — every slot sells at least TWO
--  items, and every slot has one FREE level-1 item so a new learner can
--  fill it. verify-store.html asserts both. `bead-necklace` is the free
--  one.
--
--  SHAPE NOTE, for whoever adds the next necklace: these are drawn as
--  WIDE SHALLOW arcs, measuring 2.5:1 to 2.8:1. That is the shape the
--  slot needs — Blip has no neck, his eyes end at y 0.63 and his body
--  ends at 0.885, so a necklace has to lie flat across his belly. A deep
--  U cannot be placed at any size; see the ⚠️ on ATTACH.neck.
--
--  Safe to re-run. Touches no learner data.
-- ============================================================

insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  -- free tier first, so it heads the slot in shop order
  ('bead-necklace',  'neck',   0, 1, true, 81, 'cosmetic'),
  ('flower-garland', 'neck',  60, 3, true, 83, 'cosmetic'),
  ('star-chain',     'neck',  80, 4, true, 84, 'cosmetic'),
  ('heart-chain',    'neck',  95, 5, true, 85, 'cosmetic'),
  -- >= 120 renders in the violet RARE frame, which by house rule is L6+
  ('medal-choker',   'neck', 125, 6, true, 86, 'cosmetic')
on conflict (item_id) do update
  set slot = excluded.slot, price = excluded.price, min_level = excluded.min_level,
      active = excluded.active, sort = excluded.sort, category = excluded.category;

-- ------------------------------------------------------------
--  Retire the gangster chain seeded by migration-neck-slot.sql.
--
--  It is a deep U (0.75:1) and Blip has no neck, so at every size tried it
--  either crossed his eyes or hung past his hem — see the ⚠️ on ATTACH.neck.
--  Megan cut it on sight, along with `pearls`, which never reached the
--  database at all.
--
--  DELETE, not `active = false`: no learner has the app yet, so nothing is
--  being confiscated from anyone's closet (verified — 0 blips own it). Once
--  kids are on it, deactivate instead. The already-applied
--  migration-neck-slot.sql is NOT edited; this is the record of the removal,
--  and verify-store.html reads it so it stops expecting the id in the client
--  mirror.
-- ------------------------------------------------------------
delete from public.shop_items where item_id = 'gold-chain';
