-- ============================================================
--  BLIPWORK — SIX CLOSET DESIGNS + the second Blip moves to level 20
--  2026-08-12, both of Megan's asks in one file because both are small and
--  they ship together.
--
--  ✅ APPLIED TO LIVE 2026-08-12 (migration
--  `closet_designs_and_second_blip_level_20`, via MCP at ship time).
--  Learner rows verified byte-identical before and after (2 students, 2
--  blips, 24 progress, 4,580 XP); active furniture 41 -> 47, door slot 9 ->
--  15, cosmetic/food/trinket untouched. Checked BEFORE running: 0 second
--  blips existed and the highest learner level was 10, so the gate change
--  took nothing from anybody. Smoke-tested on live with a throwaway learner
--  (deleted after): a closet bought and equipped and swapped back, the
--  second Blip hatched at Lv 30 and refused twice, and closet-emo locked at
--  Lv 1 with minLevel 20. Do not run again; kept as the record of what ran.
--
--  (original note) Run the WHOLE file in the Supabase SQL editor
--  (project pjpwhalcifywjrwtjknd) AFTER migration-room-decor.sql. Additive
--  and idempotent; it never drops or rewrites a learner row.
--
--  WHAT THIS DOES
--    1. Six closet rows on the EXISTING `door` slot.
--    2. mhq_claim_second_blip's level gate: 10 -> 20.
--  NO new slot, NO new column, NO constraint change, so nothing needs a
--  GRANT and shop_items_slot_cat_check is untouched.
--
--  ⚠️ WHY THERE IS NO SLOT DANCE HERE, unlike the last two migrations. The
--  closets go in the `door` slot, which has existed since S5v2 and is
--  already named in both shop_items_slot_cat_check and mhq_equip's key
--  list. Six new PICTURES for a slot that already works is just six rows.
--  verify-store.html knows this: it only demands the constraint/equip pair
--  from a migration that seeds a slot which is NEW to that file.
--
--  ⚠️ AND WHY SIX PNGs DO NOT BREAK "THE DOOR COLOURS SHARE ONE PICTURE".
--  That ruling is about COLOURS: door-mint and door-coral are one drawing
--  tinted in code and must stay that way. A patterned closet is a different
--  piece of furniture that happens to share the slot, like a canopy bed
--  against a wooden one. Colour -> tint. Design -> its own file. The note
--  in js/companion/furniture.js was reworded to say exactly this, because
--  as originally written ("never add a second door PNG") it forbade this.
--
--  ⚠️ THE LEVEL-20 CHANGE TAKES NOTHING AWAY FROM ANYBODY. Checked on live
--  before writing this: 2 students, 2 blips — one each, so NO learner has
--  hatched a second Blip. Anyone who already had one would keep it either
--  way (the `already_claimed` branch is separate from the level gate and is
--  tested first in effect), but nobody is in that position, so the change
--  is purely forward-looking.
--
--  ⚠️ THE GATE LIVES IN THREE PLACES AND ONE OF THEM WAS ALREADY WRONG.
--  js/config.js `secondBlipLevel` is the client's copy, js/local-backend.js
--  reads that constant, and THIS function is the one that is enforced. But
--  js/blip.js hard-coded `level >= 10` instead of reading the constant, so
--  the card could appear at a level the server would refuse. Fixed in the
--  same commit; that drift is the reason this comment exists.
--
--  Mirrored in: supabase/schema.sql (the rows + the new gate),
--  js/local-backend.js (FURNITURE_ITEMS), js/config.js (secondBlipLevel),
--  js/companion/furniture.js (labels, art, per-item seats) and
--  js/companion/collections.js (the Closet designs group).
-- ============================================================


-- ============================================================
--  1. THE CLOSETS — 6 rows, existing `door` slot.
--
--  A ladder rather than one gate, same shape as the shelves and the
--  wallpaper: the group opens at Lv 3 and each design carries its own
--  min_level. Priced above the colours (10-20) because a colour is a tint
--  of the closet you already have and a design is a new one.
-- ============================================================
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  ('closet-nerdy',   'door',  40,  3, true, 300, 'furniture'),
  ('closet-sport',   'door',  60,  7, true, 301, 'furniture'),
  ('closet-flower',  'door',  70, 10, true, 302, 'furniture'),
  ('closet-lines',   'door',  80, 13, true, 303, 'furniture'),
  ('closet-starry',  'door', 100, 16, true, 304, 'furniture'),
  ('closet-emo',     'door', 120, 20, true, 305, 'furniture')
on conflict (item_id) do update
  set slot = excluded.slot, price = excluded.price, min_level = excluded.min_level,
      active = excluded.active, sort = excluded.sort, category = excluded.category;


-- ============================================================
--  2. THE SECOND BLIP MOVES TO LEVEL 20.
--
--  Full redefinition; the body is otherwise byte-identical to
--  migration-sl-restyle.sql's version (which added 'blue' to the colour
--  list), only the two 10s became 20s. Her call: level 10 arrived too soon
--  now that the curve caps at 40 and the milestone boxes land at
--  10/20/30/40 — a second Blip at 20 is the reward for a milestone rather
--  than something that turns up while the first one is still new.
-- ============================================================
create or replace function public.mhq_claim_second_blip(p_username text, p_password text, p_name text, p_colour text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; lvl int; nm text; col text; blips_j jsonb;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  lvl := (public._mhq_level((select students.xp from public.students where students.id = sid))->>'level')::int;
  if lvl < 20 then return jsonb_build_object('ok', false, 'error', 'level_locked', 'minLevel', 20); end if;
  if exists (select 1 from public.blips where blips.student_id = sid and blips.slot = 2) then
    return jsonb_build_object('ok', false, 'error', 'already_claimed');
  end if;
  col := coalesce(p_colour, 'blue');
  if col not in ('blue','cream','pink','mint','sky','lilac','peach','lemon','seafoam','coral','lavender') then
    return jsonb_build_object('ok', false, 'error', 'bad_colour');
  end if;
  nm := left(btrim(coalesce(p_name, '')), 24);
  if nm = '' then return jsonb_build_object('ok', false, 'error', 'bad_name'); end if;
  insert into public.blips (student_id, slot, name, colour, feed_count, owned_items, equipped)
  values (sid, 2, nm, col, 0, '[]'::jsonb, '{}'::jsonb);
  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', blips.slot, 'name', blips.name, 'colour', blips.colour, 'feedCount', blips.feed_count,
            'growthStage', public._mhq_growth(blips.feed_count),
            'owned', blips.owned_items, 'equipped', blips.equipped) order by blips.slot), '[]'::jsonb)
    into blips_j from public.blips where blips.student_id = sid;
  return jsonb_build_object('ok', true, 'blips', blips_j);
end; $$;


-- ============================================================
--  3. SMOKE TEST — run AFTER the migration, on live, with a throwaway
--     learner. Replace 'someuser' / 'somepassword'.
--
--    -- 47 furniture rows now (41 + 6); the other categories are UNCHANGED
--    select category, count(*) from public.shop_items where active group by category;
--      -- cosmetic 63 · food 47 · trinket 6 · furniture 47
--
--    -- 15 door-slot pieces: white + 8 colours + 6 designs
--    select count(*) from public.shop_items where active and slot = 'door';   -- 15
--
--    -- a closet is bought and equipped exactly like a door colour
--    select public.mhq_buy_item('someuser','somepassword','closet-nerdy');           -- ok (Lv 3+)
--    select public.mhq_equip('someuser','somepassword','{"door":"closet-nerdy"}'::jsonb);  -- ok
--
--    -- the level ladder holds
--    select public.mhq_buy_item('someuser','somepassword','closet-emo');   -- locked, minLevel 20 (below Lv 20)
--
--    -- the second Blip now needs 20, and NOBODY loses one they already have
--    select public.mhq_claim_second_blip('someuser','somepassword','Pip','pink');
--      -- level_locked, minLevel 20   (at any level below 20)
--    select count(*) from public.blips where slot = 2;   -- unchanged by this migration
-- ============================================================
