-- ============================================================
--  Blipwork — EFFECTS slot + Tripo wave 1   (2026-08-05)
-- ------------------------------------------------------------
--  WHAT: a seventh cosmetic slot, `effects` (auras/glows painted BEHIND
--  the body), plus top-ups for hat / glasses / wings / back. All twelve
--  items are Megan's own Tripo art, keyed out of her flat-magenta sheets
--  by tools/tripo_sheet.py and rendered as PNG accessory layers.
--
--  WHY: after the July expansion the shop was 22 items over 6 slots, but
--  every slot was a variation on "something stuck to his body". Effects
--  are the cheapest genuinely NEW thing to own — one centred layer, no
--  pairing, no recolour — and they suit a showy rare.
--
--  CONTAINS
--    1. shop_items_slot_cat_check — allow slot 'effects' for cosmetics.
--    2. mhq_equip — 'effects' added to the allowed equipped keys.
--       ⚠️ Both are needed. The July back-slot ship proved that seeding
--       rows alone leaves equip returning 'bad_equipped'.
--    3. twelve new shop_items rows.
--
--  NOT CHANGED: mhq_open_box (its cosmetic pool is already "any active
--  cosmetic at/below level with price > 0", so the new paid items join
--  the loot table automatically and light-ring, being free, is correctly
--  excluded), and every existing row — no ids were renamed, so nothing
--  owned or equipped is disturbed.
--
--  ROLLBACK: `update public.shop_items set active = false where item_id
--  in (...the twelve ids below...);` — the constraint and function
--  changes are supersets of what they replace and can stay.
-- ============================================================

-- ------------------------------------------------------------
--  1. Allow the new 'effects' slot on cosmetic rows.
-- ------------------------------------------------------------
alter table public.shop_items drop constraint if exists shop_items_slot_cat_check;
alter table public.shop_items add constraint shop_items_slot_cat_check check (
     (category = 'cosmetic' and slot in ('hat','ears','glasses','wings','arms','back','effects'))
  or (category = 'food'     and slot = 'food'));

-- ------------------------------------------------------------
--  2. mhq_equip — 'effects' added to the allowed equipped keys.
--     Full redefinition; the body is otherwise byte-identical to the
--     store-expansion version, only the `k not in (...)` list changed.
-- ------------------------------------------------------------
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
  select last_fed_day, care_streak, xp into st from public.students where id = sid;
  if (public._mhq_health(st.last_fed_day, st.care_streak)->>'stage')::int >= 2 then
    return jsonb_build_object('ok', false, 'error', 'BLIP_TOO_SICK');
  end if;
  select owned_items into b from public.blips where student_id = sid and slot = v_slot;
  if not found then return jsonb_build_object('ok', false, 'error', 'no_blip'); end if;

  if p_equipped is not null then
    if jsonb_typeof(p_equipped) <> 'object' then return jsonb_build_object('ok', false, 'error', 'bad_equipped'); end if;
    select count(*) into bad from jsonb_each_text(p_equipped) e(k, v)
     where k not in ('hat','ears','glasses','wings','arms','back','effects')
        or (coalesce(v, '') <> '' and not b.owned_items ? v);
    if bad > 0 then return jsonb_build_object('ok', false, 'error', 'bad_equipped'); end if;
    update public.blips set equipped = p_equipped where student_id = sid and slot = v_slot;
  end if;

  if p_colour is not null then
    if p_colour not in ('blue','cream','pink','mint','sky','lilac','peach','lemon','seafoam','coral','lavender')
      then return jsonb_build_object('ok', false, 'error', 'bad_colour'); end if;
    -- blue is the free starting colour (SL restyle); the first CHANGE away from
    -- it still requires xp > 0 (the original first-completion reward gate).
    if p_colour <> 'blue' and v_slot = 1 and st.xp <= 0
      then return jsonb_build_object('ok', false, 'error', 'colour_locked'); end if;
    update public.blips set colour = p_colour where student_id = sid and slot = v_slot;
  end if;

  if p_blip_name is not null then
    nm := left(btrim(p_blip_name), 24);
    if nm = '' then return jsonb_build_object('ok', false, 'error', 'bad_name'); end if;
    update public.blips set name = nm where student_id = sid and slot = v_slot;
  end if;

  return (select jsonb_build_object('ok', true, 'slot', v_slot, 'blip', jsonb_build_object(
    'name', name, 'colour', colour, 'owned', owned_items, 'equipped', equipped))
    from public.blips where student_id = sid and slot = v_slot);
end; $$;

-- ------------------------------------------------------------
--  3. The twelve new items.
--     Prices follow the existing bands: 0 = free tier (one per slot,
--     level 1), >= 120 = the violet RARE frame, which by house rule is
--     always level 6+. Rarity is DERIVED from price in itemRarity(), so
--     there is no rarity column to set here.
--     `sort` keeps each slot grouped in shop order; effects take the 70s.
-- ------------------------------------------------------------
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  -- effects (new slot) — free tier first so a level-1 learner has one
  ('light-ring',    'effects',   0,  1, true, 70, 'cosmetic'),
  ('flame-ring',    'effects',  45,  2, true, 71, 'cosmetic'),
  ('crystal-orbit', 'effects',  60,  3, true, 72, 'cosmetic'),
  ('spark-halo',    'effects',  90,  4, true, 73, 'cosmetic'),
  ('shadow-crown',  'effects', 160,  7, true, 74, 'cosmetic'),   -- RARE
  -- top-ups for existing slots
  ('eye-mask',      'glasses',  40,  2, true, 15, 'cosmetic'),
  ('cyber-visor',   'glasses',  65,  3, true, 16, 'cosmetic'),
  ('wizard-hat',    'hat',      55,  2, true, 35, 'cosmetic'),
  ('royal-crown',   'hat',     170,  8, true, 36, 'cosmetic'),   -- RARE
  ('dragon-wings',  'wings',   145,  6, true, 53, 'cosmetic'),   -- RARE
  ('gold-wings',    'wings',   150,  6, true, 54, 'cosmetic'),   -- RARE
  ('back-sword',    'back',    130,  6, true, 63, 'cosmetic')    -- RARE
on conflict (item_id) do update
  set slot = excluded.slot, price = excluded.price, min_level = excluded.min_level,
      active = excluded.active, sort = excluded.sort, category = excluded.category;
