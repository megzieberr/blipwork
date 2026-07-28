-- ============================================================
--  BLIPWORK — STORE EXPANSION (2026-07-28)
--  Additive. Safe to run on live. Touches no learner data.
--
--  WHY: four of the five cosmetic slots sold exactly ONE item, so there
--  was nothing to choose between, and the whole catalogue cost 475 gold
--  — about a week of play, after which gold had no purpose. This adds
--  sixteen items, a free tier so a level-1 learner can dress Blip
--  before earning anything, and a new BACK slot (cape/schoolbag/jetpack).
--
--  WHAT CHANGES (nothing is removed, nothing is confiscated):
--   1. shop_items_slot_cat_check — allow slot 'back' for cosmetics.
--   2. mhq_equip — allow 'back' as an equipped key (it hard-codes the
--      list, so new rows alone are NOT enough; without this an equipped
--      cape comes back 'bad_equipped').
--   3. mhq_open_box — treasure-box cosmetics now roll from PAID items
--      only (price > 0). A box handing over something the shop gives
--      away free is the same let-down as a duplicate, which the pool
--      already guards against.
--   4. sixteen new shop_items rows.
--
--  ROLLBACK: `update public.shop_items set active = false where item_id
--  in (...)` hides the new items instantly without touching anyone's
--  owned_items. The three function/constraint changes are supersets of
--  the old behaviour, so they need no rollback.
-- ============================================================

-- ------------------------------------------------------------
--  1. Allow the new 'back' slot on cosmetic rows.
-- ------------------------------------------------------------
alter table public.shop_items drop constraint if exists shop_items_slot_cat_check;
alter table public.shop_items add constraint shop_items_slot_cat_check check (
     (category = 'cosmetic' and slot in ('hat','ears','glasses','wings','arms','back'))
  or (category = 'food'     and slot = 'food'));

-- ------------------------------------------------------------
--  2. mhq_equip — 'back' added to the allowed equipped keys.
--     Full redefinition (the body is otherwise byte-identical to the
--     SL-restyle version; only the `k not in (...)` list changed).
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
     where k not in ('hat','ears','glasses','wings','arms','back')
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
--  3. mhq_open_box — cosmetic loot rolls from PAID items only.
--     Full redefinition; the only change is `and shop_items.price > 0`
--     in the pool query.
-- ------------------------------------------------------------
create or replace function public.mhq_open_box(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_st record; v_loot record; v_loot_id text;
        v_kind text; v_item text; v_amount int; v_is_new boolean := false;
        v_level int; v_owned jsonb; v_pantry jsonb; v_gold int;
        v_blips jsonb; v_pending int;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  perform public._mhq_ensure_blip(v_sid);

  -- row lock: two taps in flight must not open two boxes
  select students.boxes_pending, students.gold, students.xp, students.pantry
    into v_st from public.students where students.id = v_sid for update;

  if coalesce(v_st.boxes_pending, 0) < 1 then
    return jsonb_build_object('ok', false, 'error', 'no_box');
  end if;

  v_level  := (public._mhq_level(v_st.xp)->>'level')::int;
  v_pantry := coalesce(v_st.pantry, '{}'::jsonb);
  v_gold   := v_st.gold;

  v_loot_id := public._mhq_roll_loot();
  if v_loot_id is null then return jsonb_build_object('ok', false, 'error', 'no_loot_table'); end if;
  select * into v_loot from public.loot_table where loot_table.id = v_loot_id;

  v_kind   := v_loot.kind;
  v_amount := v_loot.amount_min + floor(random() * (v_loot.amount_max - v_loot.amount_min + 1))::int;
  v_item   := v_loot.item_id;

  if v_kind = 'cosmetic' then
    select coalesce(blips.owned_items, '[]'::jsonb) into v_owned
      from public.blips where blips.student_id = v_sid and blips.slot = 1;

    select shop_items.item_id into v_item
      from public.shop_items
     where shop_items.active
       and shop_items.category = 'cosmetic'
       and shop_items.price > 0          -- free-tier items are not a prize
       and shop_items.min_level <= v_level
       and not (coalesce(v_owned, '[]'::jsonb) ? shop_items.item_id)
     order by random()
     limit 1;

    if v_item is null then
      -- nothing new to give — pay gold instead, never a duplicate
      v_kind := 'gold'; v_amount := 20; v_item := null;
    else
      v_is_new := true;
      update public.blips
         set owned_items = coalesce(blips.owned_items, '[]'::jsonb) || to_jsonb(v_item)
       where blips.student_id = v_sid and blips.slot = 1;
      v_amount := 1;
    end if;
  end if;

  if v_kind = 'gold' then
    v_gold := v_gold + v_amount;
  elsif v_kind = 'food' then
    v_pantry := jsonb_set(v_pantry, array[v_item],
                  to_jsonb(coalesce((v_pantry->>v_item)::int, 0) + v_amount), true);
  end if;

  update public.students
     set boxes_pending = students.boxes_pending - 1,
         gold          = v_gold,
         pantry        = v_pantry,
         last_active_at = now()
   where students.id = v_sid
   returning students.boxes_pending into v_pending;

  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', blips.slot, 'name', blips.name, 'colour', blips.colour,
            'feedCount', blips.feed_count,
            'growthStage', public._mhq_growth(blips.feed_count),
            'owned', blips.owned_items, 'equipped', blips.equipped) order by blips.slot), '[]'::jsonb)
    into v_blips from public.blips where blips.student_id = v_sid;

  return jsonb_build_object('ok', true,
    'loot', jsonb_build_object('kind', v_kind, 'id', v_item, 'amount', v_amount, 'isNew', v_is_new),
    'boxes', jsonb_build_object('pending', v_pending),
    'gold', v_gold, 'pantry', v_pantry, 'blips', v_blips);
end; $$;

-- ------------------------------------------------------------
--  4. The new catalogue.
--     `sort` interleaves with the existing rows (10/11/12, 20/21, …) so
--     each slot stays grouped in shop order. Rarity is DERIVED from
--     price on the client (0 = free badge, >= 120 = rare violet frame)
--     rather than stored, so no new column and no backfill.
-- ------------------------------------------------------------
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  -- free tier — one per slot, every slot, level 1
  ('study-specs',   'glasses',   0,  1, true,  1, 'cosmetic'),
  ('beanie',        'hat',       0,  1, true,  2, 'cosmetic'),
  ('ear-tufts',     'ears',      0,  1, true,  3, 'cosmetic'),
  ('mitts',         'arms',      0,  1, true,  4, 'cosmetic'),
  ('nub-wings',     'wings',     0,  1, true,  5, 'cosmetic'),
  ('cape',          'back',      0,  1, true,  6, 'cosmetic'),
  -- common
  ('sleepy-eyes',   'glasses',  30,  1, true, 13, 'cosmetic'),
  ('visor',         'glasses',  35,  2, true, 14, 'cosmetic'),
  ('bolt-antenna',  'hat',      45,  2, true, 32, 'cosmetic'),
  ('horns',         'hat',      50,  2, true, 33, 'cosmetic'),
  ('bunny-ears',    'ears',     55,  2, true, 22, 'cosmetic'),
  ('boxing-gloves', 'arms',     60,  3, true, 42, 'cosmetic'),
  ('schoolbag',     'back',     50,  2, true, 61, 'cosmetic'),
  -- rare
  ('bat-wings',     'wings',   140,  6, true, 52, 'cosmetic'),
  ('crown',         'hat',     180,  8, true, 34, 'cosmetic'),
  ('jetpack',       'back',    200, 10, true, 62, 'cosmetic')
on conflict (item_id) do nothing;
