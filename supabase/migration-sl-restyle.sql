-- ============================================================
--  MIGRATION — Blipwork "Solo Leveling" restyle: blue default
--  colour + techy cosmetic catalogue.
--  ADDITIVE + idempotent-safe (safe to paste and re-run).
--  RUN BY HAND in the Supabase SQL editor — do NOT auto-apply.
--
--  ------------------------------------------------------------
--  DESIGN RULINGS (Megan, 2026-07-19). Encoded here so the server
--  is the single source of truth; the client only renders what
--  these return.
--
--   • BLUE IS THE NEW FREE STARTING COLOUR. Blip's default colour
--     becomes 'blue' (her new blue base art). Cream becomes just one
--     of the selectable colours, nothing special about it anymore.
--     The existing first-completion gate is UNCHANGED IN SHAPE, only
--     its trigger colour moves: the first colour CHANGE away from the
--     starting colour still requires xp > 0. That trigger colour is
--     now 'blue' (was 'cream'). New signups' slot-1 blip, and any
--     lazy _mhq_ensure_blip backfill via students.blip_colour, now
--     default to 'blue'.
--   • NO DATA REWRITE. Existing blips keep whatever colour they
--     already have — the 1 live student may sit on cream, and that's
--     fine; nobody's blip changes colour under them.
--   • CATALOGUE SWAP. The cosmetic shop is replaced with a techy set
--     from Megan's own mockup: star-shades (glasses), heart-eyes
--     (glasses — yes, TWO glasses-slot items now, the slot check
--     already allows this), headphones (ears), halo (hat), aurora-
--     wings (wings), power-gloves (arms). The old 5 items (party-hat,
--     cat-ears, round-glasses, angel-wings, stubby-arms) are set
--     active=false, never deleted.
--   • NEVER CONFISCATE. A learner who already owns an old (now
--     inactive) item keeps it in owned_items forever and can still
--     EQUIP it — mhq_equip checks ownership on the blip row, not
--     shop_items.active, so this already worked with no code change
--     (verified against the live function body below). Only BUYING an
--     inactive item is blocked, via mhq_buy_item's existing
--     `where item_id = p_item and active` filter — also already
--     correct, no change needed there either.
--
--  WHAT THIS MIGRATION ACTUALLY CHANGES:
--   1. Column defaults for blip colour (students.blip_colour,
--      blips.colour) -> 'blue'. Existing rows untouched.
--   2. mhq_signup: the slot-1 blip it creates now hatches 'blue'
--      instead of 'cream'.
--   3. mhq_claim_second_blip: 'blue' added to the allowed-colour list
--      (+ its null-coalesce fallback colour, since blue is now the
--      "no colour supplied" default too).
--   4. mhq_equip: 'blue' added to the allowed-colour list; the slot-1
--      "first non-starting-colour needs xp>0" gate now triggers on
--      colours other than 'blue' (was 'cream').
--   5. shop_items: old 5 cosmetics -> active=false; six new techy
--      items inserted active=true, same price/level band as before.
-- ============================================================

-- ------------------------------------------------------------
--  1. Column defaults — future inserts only, no data rewrite.
-- ------------------------------------------------------------
alter table public.students alter column blip_colour set default 'blue';
alter table public.blips    alter column colour      set default 'blue';

-- ------------------------------------------------------------
--  2. mhq_signup — slot-1 blip now hatches blue.
-- ------------------------------------------------------------
create or replace function public.mhq_signup(p_username text, p_name text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare uname text := lower(trim(p_username)); new_id uuid;
begin
  if length(uname) < 3 then return jsonb_build_object('ok', false, 'error', 'username_short'); end if;
  if uname !~ '^[a-z0-9_.]+$' then return jsonb_build_object('ok', false, 'error', 'username_chars'); end if;
  if length(coalesce(p_password,'')) < 4 then return jsonb_build_object('ok', false, 'error', 'too_short'); end if;
  if length(coalesce(trim(p_name),'')) < 1 then return jsonb_build_object('ok', false, 'error', 'no_name'); end if;
  if exists (select 1 from public.students where username = uname) then
    return jsonb_build_object('ok', false, 'error', 'username_taken');
  end if;
  insert into public.students (username, display_name, password, last_active_at)
  values (uname, trim(p_name), crypt(p_password, gen_salt('bf')), now())
  returning id into new_id;
  insert into public.blips (student_id, slot, name, colour) values (new_id, 1, 'Blip', 'blue')
  on conflict (student_id, slot) do nothing;
  return jsonb_build_object('ok', true);
end; $$;

-- ------------------------------------------------------------
--  3. mhq_claim_second_blip — add 'blue' to the allowed colours
--     (any colour at hatch is unchanged; only the palette grows).
-- ------------------------------------------------------------
create or replace function public.mhq_claim_second_blip(p_username text, p_password text, p_name text, p_colour text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; lvl int; nm text; col text; blips_j jsonb;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  lvl := (public._mhq_level((select xp from public.students where id = sid))->>'level')::int;
  if lvl < 10 then return jsonb_build_object('ok', false, 'error', 'level_locked', 'minLevel', 10); end if;
  if exists (select 1 from public.blips where student_id = sid and slot = 2) then
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
            'slot', slot, 'name', name, 'colour', colour, 'feedCount', feed_count,
            'growthStage', public._mhq_growth(feed_count),
            'owned', owned_items, 'equipped', equipped) order by slot), '[]'::jsonb)
    into blips_j from public.blips where student_id = sid;
  return jsonb_build_object('ok', true, 'blips', blips_j);
end; $$;

-- ------------------------------------------------------------
--  4. mhq_equip — add 'blue' to the allowed colours; the slot-1
--     "first colour change needs xp>0" gate now triggers on anything
--     other than 'blue' (was 'cream'). Everything else (ownership
--     check for equipped accessories, sick-lock, rename) is unchanged
--     and already correctly checks the BLIP's owned_items, not
--     shop_items.active — so equipping an owned-but-now-inactive old
--     item keeps working with no code change here.
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
     where k not in ('hat','ears','glasses','wings','arms')
        or (coalesce(v, '') <> '' and not b.owned_items ? v);
    if bad > 0 then return jsonb_build_object('ok', false, 'error', 'bad_equipped'); end if;
    update public.blips set equipped = p_equipped where student_id = sid and slot = v_slot;
  end if;

  if p_colour is not null then
    if p_colour not in ('blue','cream','pink','mint','sky','lilac','peach','lemon','seafoam','coral','lavender')
      then return jsonb_build_object('ok', false, 'error', 'bad_colour'); end if;
    -- blue is the free starting colour; the first CHANGE away from it still
    -- requires xp > 0 (the original first-completion reward gate, just
    -- re-anchored from cream to blue).
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
--  5. shop_items — retire the 5 originals (kept as rows, never
--     deleted, so owners never lose them), add the techy 6.
--     Re-running this block is safe: the UPDATE is idempotent and the
--     INSERT no-ops via ON CONFLICT once the rows exist.
-- ------------------------------------------------------------
update public.shop_items set active = false
 where item_id in ('party-hat','cat-ears','round-glasses','angel-wings','stubby-arms');

insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  ('star-shades',  'glasses', 40, 1, true, 11, 'cosmetic'),
  ('heart-eyes',   'glasses', 45, 1, true, 12, 'cosmetic'),
  ('headphones',   'ears',    60, 2, true, 21, 'cosmetic'),
  ('halo',         'hat',     80, 3, true, 31, 'cosmetic'),
  ('power-gloves', 'arms',   100, 4, true, 41, 'cosmetic'),
  ('aurora-wings', 'wings',  150, 6, true, 51, 'cosmetic')
on conflict (item_id) do nothing;
