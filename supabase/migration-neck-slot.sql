-- ============================================================
--  Blipwork — NECK slot (2026-08-07)
--
--  WHY: the gangster gold chain has nowhere to live. Every existing
--  cosmetic slot is on his head, his sides or behind him; nothing sits
--  on his front. `neck` is that slot — painted over the body but under
--  the arms, which is where a hand would be.
--
--  ⚠️ ADDING A SLOT IS THREE CHANGES, NOT ONE. Seeding rows alone is not
--  enough, and this has bitten twice now (the July `back` ship, then
--  `effects` in August):
--    1. shop_items_slot_cat_check — allow slot 'neck' for cosmetics.
--    2. mhq_equip — 'neck' added to the allowed equipped keys. It
--       HARD-CODES the list, so without this an equipped chain comes
--       straight back as 'bad_equipped'.
--    3. the new shop_items row(s).
--  The client mirrors all three in js/local-backend.js (VALID_SLOTS,
--  the catalogue list) and js/companion/blip-ui.js (COSMETIC_SLOTS),
--  and verify-store.html parses THIS FILE and cross-checks every row
--  against that mirror — an item added on one side only is the drift
--  that check exists to catch.
--
--  Safe to re-run. Touches no learner data: no blip loses an item, and
--  nothing already equipped changes.
-- ============================================================

-- ------------------------------------------------------------
--  1. Allow the new 'neck' slot on cosmetic rows.
-- ------------------------------------------------------------
alter table public.shop_items drop constraint if exists shop_items_slot_cat_check;
alter table public.shop_items add constraint shop_items_slot_cat_check check (
     (category = 'cosmetic' and slot in ('hat','ears','glasses','wings','arms','back','effects','neck'))
  or (category = 'food'     and slot = 'food'));

-- ------------------------------------------------------------
--  2. mhq_equip — 'neck' added to the allowed equipped keys.
--     Full redefinition; the body is otherwise byte-identical to the
--     effects-slot version, only the `k not in (...)` list changed.
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
     where k not in ('hat','ears','glasses','wings','arms','back','effects','neck')
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
--  3. The neck items.
--     `sort` takes the 80s, keeping the slot grouped in shop order.
--
--     ⚠️ INCOMPLETE ON PURPOSE, FOR NOW. House rules say every slot
--     sells at least TWO items and has one free level-1 item so a new
--     learner can fill it — verify-store.html asserts both. The gold
--     chain alone satisfies neither, so more necklaces are being drawn
--     and land in this same block. Until they do, verify-store will
--     fail exactly two checks on `neck`, and that is the check working,
--     not a bug to route around.
-- ------------------------------------------------------------
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  ('gold-chain', 'neck', 160, 7, true, 80, 'cosmetic')
on conflict (item_id) do update
  set slot = excluded.slot, price = excluded.price, min_level = excluded.min_level,
      active = excluded.active, sort = excluded.sort, category = excluded.category;
