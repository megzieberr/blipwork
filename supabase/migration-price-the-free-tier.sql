-- ============================================================
--  ✅ APPLIED TO LIVE 2026-08-21 via MCP (price_the_free_tier_and_close_gaps)
--  by the foreman session, same ship as the two bridge migrations.
--  Blipwork — price the free tier                          (2026-08-21)
-- ------------------------------------------------------------
--  WHY: Megan's ruling, 2026-08-06 (PROJECT-STATUS.md "Next up" #4):
--  "nothing may be free once the kids are playing." No learner has the
--  app yet, so this is the last free moment to move these numbers.
--  Eight cosmetic rows sat at price 0 (one per slot, from the
--  2026-07-28 store expansion / migration-neck-necklaces.sql /
--  migration-effects-slot.sql) — every one of those slots now gets a
--  real, cheap, level-1 price instead: 8-15 💎, varied, always still the
--  cheapest item in its own slot. For scale: one round pays a flat 10 💎
--  (mhq_submit_quest) and an early Circle Quest collect hands over
--  roughly 170-400 💎 in one go, so 8-15 is real money but genuinely
--  affordable on day one — the whole point of the ruling.
--
--  This ALSO closes two catalogue gaps the foreman re-measured against
--  live today, unrelated to the free tier but landing in the same
--  session:
--    - butterfly-wing was the one wings item with no reason to exist at
--      its old spot (95💎/L12 — priced ABOVE several L6 wings while
--      unlocking AFTER them, and hidden behind the "girly" collection's
--      L12 mystery card besides). Re-priced to fill the actual gap
--      between the new ex-free wings item and the L6 cluster: ex-free
--      ~10 (L1) -> 60 (L4) -> 140-155 (L6) -> fairy-wing 150 (L16).
--    - gold-shades was glasses' most expensive item (85💎) without ever
--      reaching the rare band (>=120, the theme's violet frame) — the
--      slot had no aspirational item. Re-priced to 130💎, glasses' first
--      rare, at L8.
--    Both items also move min_level DOWN (butterfly-wing 12->4,
--    gold-shades 20->8) and OUT of their old themed collections (see
--    js/companion/collections.js this session): "girly" (L12) and
--    "gangster" (L20) gate their WHOLE collection behind one locked "?"
--    card regardless of an individual item's own min_level, so leaving
--    either item in its old collection would have made this repricing
--    pointless — invisible in the shop until the old, much higher, gate.
--    Both move into "basics" (L1, never mystery-carded), which already
--    holds a mix of L1-L10 items shown individually-gated — the exact
--    pattern that makes a level-4 / level-8 reveal actually visible.
--    "girly" keeps hair-bow + tiara (still both L12, untouched); "gangster"
--    keeps snapback + chunky-chain (still L20 / L7, untouched).
--
--  NOT CHANGED: any furniture, food or trinket row (all separate
--  category values; their own free-tier rows are load-bearing —
--  "an empty slot draws its free default" and "shelves have no free
--  default on purpose" — and are untouched here). No new item, no new
--  slot, no new art.
--
--  itemRarity() (js/companion/blip-ui.js) already keys "free" strictly
--  on `!price`, so once nothing here is priced 0 no cosmetic can render
--  a "Free" label any more — no code change needed there, verified by
--  verify-store.html.
--
--  mhq_open_box's cosmetic pool already reads `price > 0 && minLevel <=
--  level` (homework chest) / `price >= 120` (milestone rare) straight off
--  this table — every ex-free item becomes loot-eligible and gold-shades
--  joins the milestone rare pool with NO code change, as an intended
--  consequence of this migration, not a side effect to guard against.
--
--  ⚠️ NOT YET APPLIED TO LIVE — a FILE ONLY. No learner exists yet, so
--  this is not urgent, but do not run it without checking
--  PROJECT-STATUS.md's go-live sequence first (item 4 of 5 — the term
--  toggle / first assignment / push walkthrough still come after it).
--
--  ROLLBACK: re-apply the OLD values, one update per row (this file is
--  the record of what they were): study-specs/beanie/ear-tufts/mitts/
--  nub-wings/cape/light-ring/bead-necklace back to price 0 min_level 1;
--  butterfly-wing back to 95/12; gold-shades back to 85/20; and put
--  butterfly-wing back in "girly", gold-shades back in "gangster" in
--  collections.js.
-- ============================================================

-- ---------- A. the eight free-tier rows, real prices, same min_level ----------
update public.shop_items set price = 10, min_level = 1 where item_id = 'study-specs';   -- was 0 / 1
update public.shop_items set price = 12, min_level = 1 where item_id = 'beanie';        -- was 0 / 1
update public.shop_items set price =  9, min_level = 1 where item_id = 'ear-tufts';     -- was 0 / 1
update public.shop_items set price = 13, min_level = 1 where item_id = 'mitts';         -- was 0 / 1
update public.shop_items set price =  8, min_level = 1 where item_id = 'nub-wings';     -- was 0 / 1
update public.shop_items set price = 15, min_level = 1 where item_id = 'cape';          -- was 0 / 1
update public.shop_items set price = 11, min_level = 1 where item_id = 'light-ring';    -- was 0 / 1
update public.shop_items set price = 14, min_level = 1 where item_id = 'bead-necklace'; -- was 0 / 1

-- ---------- B. the two catalogue gaps ----------
update public.shop_items set price = 60,  min_level = 4 where item_id = 'butterfly-wing'; -- was 95 / 12
update public.shop_items set price = 130, min_level = 8 where item_id = 'gold-shades';    -- was 85 / 20

-- ---------- C. re-sort every active cosmetic row, ascending price within its
-- own slot (absolute values, so this is idempotent same as A and B). Only the
-- RELATIVE order within a slot is ever seen (the shop groups by slot tab), so
-- the per-slot bases below (100=glasses, 200=hat, 300=ears, 400=arms,
-- 500=wings, 600=back, 700=effects, 800=neck) are a convenience, not a
-- constraint. Before this, `sort` mostly reflected the order items shipped
-- in (SL set / Tripo wave 1 / wave 2 / wave 3), which put the eight free rows
-- first in every slot by accident of history and left genuine price
-- ordering violations everywhere else (e.g. glasses: star-shades 40 sorted
-- ahead of sleepy-eyes 30; wings: aurora-wings 150 sorted ahead of
-- dragon-wings 145) — that's the "flat price band" the ruling's item 4
-- flagged. js/local-backend.js's SHOP_ITEMS array is reordered to match,
-- for ?local=1 parity (it carries no sort column of its own — array
-- declaration order IS its display order).
update public.shop_items as t set sort = v.sort
from (values
  -- glasses
  ('study-specs',100),('sleepy-eyes',101),('visor',102),('star-shades',103),
  ('eye-mask',104),('happy-eyes',105),('heart-eyes',106),('angry-eyes',107),
  ('star-eyes',108),('dreamy-eyes',109),('hud-monocle',110),('lash-eyes',111),
  ('wink-eyes',112),('cyber-visor',113),('sport-shades',114),('gold-shades',115),
  -- hat
  ('beanie',200),('bolt-antenna',201),('horns',202),('wizard-hat',203),
  ('bucket-hat',204),('backwards-cap',205),('hair-bow',206),('halo',207),
  ('snapback',208),('flower-crown',209),('tiara',210),('royal-crown',211),
  ('crown',212),
  -- ears
  ('ear-tufts',300),('tech-antenna',301),('bunny-ears',302),('headphones',303),
  ('headset-cup',304),('data-fin',305),
  -- arms
  ('mitts',400),('boxing-gloves',401),('mech-gauntlet',402),('grapple-claw',403),
  ('power-gloves',404),('energy-blade',405),
  -- wings
  ('nub-wings',500),('butterfly-wing',501),('bat-wings',502),('drone-wings',503),
  ('dragon-wings',504),('aurora-wings',505),('gold-wings',506),('fairy-wing',507),
  ('plasma-wings',508),
  -- back
  ('cape',600),('schoolbag',601),('back-sword',602),('jetpack',603),
  -- effects
  ('light-ring',700),('flame-ring',701),('spark-halo',702),
  -- neck
  ('bead-necklace',800),('flower-garland',801),('star-chain',802),
  ('heart-chain',803),('medal-choker',804),('chunky-chain',805)
) as v(item_id, sort)
where t.item_id = v.item_id;
