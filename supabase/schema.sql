-- ============================================================
--  BLIPWORK (formerly Maths Quest) — Supabase schema, security & RPC API
--  ⚠️⚠️  NEVER RUN THIS FILE ON THE LIVE DATABASE.  ⚠️⚠️
--
--  It DROPS students, progress, struggles and blips a few lines below. On live
--  that deletes every learner account, every quest they have passed and every
--  Blip they have dressed — with no undo. This header used to say "safe to
--  re-run", which was true only while the database was empty.
--
--  FRESH PROJECTS ONLY. To change the live database, write a
--  migration-*.sql file and run that instead.
--
--  This is the canonical from-scratch schema: run it once, in order, on a NEW
--  Supabase project. The live project was built this way and then migrated
--  (see migration-blipwork.sql and the migration-* files beside it).
--
--  ⚠️ KEEPING IT HONEST: a schema change goes in TWO places — this file AND a
--  migration. That "AND" was skipped three times (effects slot, Tripo wave 2,
--  neck slot), so this file silently stopped matching live and a rebuild from it
--  would have reproduced the July `bad_equipped` bug. Re-synced 2026-08-07.
--
--  ⚠️ WHAT THIS FILE DOES *NOT* CARRY (known gap, stated rather than hidden):
--  PHASE 3 (2026-07-19) never landed here — the `assignments`, `box_grants`,
--  `loot_table` and `push_subscriptions` tables, `students.boxes_pending`, and
--  the treasure-box / homework RPCs live only in migration-phase3.sql. The room
--  build's milestone-box logic (2026-08-08) sits on top of those, so the parts
--  of it that touch phase-3 objects are only in migration-level-curve-40.sql.
--  Everything in that migration which touches an object THIS file does define —
--  the level curve, the trinket category and rows, the two new `students`
--  columns, `milestone_grants`, and mhq_buy_item's non-cosmetic guard — IS
--  mirrored below.
--  Room build S4 (2026-08-08), REVISED same day as S4b, IS fully mirrored
--  here — the 44 grocery rows, the minLevel in mhq_get_state's foodShop
--  payload, the level gate on mhq_buy_item's food branch, students.tray /
--  students.tray_day, the _mhq_tray helper, and the whole mhq_eat_food
--  function. It touches no phase-3 object, so nothing about it is missing
--  from this file.
--  Room build S5v2 (2026-08-08) — FURNITURE — IS fully mirrored here too:
--  the four new slots in shop_items_slot_cat_check AND in mhq_equip's key
--  list (the known dance — both, or equipping returns bad_equipped), the
--  'furniture' category allowed through mhq_buy_item's non-cosmetic guard,
--  the `furnitureShop` array in mhq_get_state, and all 18 rows. Like S4 it
--  touches no phase-3 object, so nothing about it is missing.
--  ROOM DECOR (2026-08-12) is mirrored here as well: the four extra slots
--  (shelf-left, shelf-right, beanbag, wall) in BOTH shop_items_slot_cat_check
--  and mhq_equip's key list, and all 23 rows. It needed no change to
--  mhq_buy_item or mhq_get_state — the 'furniture' category was already
--  allowed through the buy guard and already drives the furnitureShop
--  payload — so those two functions are untouched by it here too.
--  To rebuild a project from scratch, run in this order:
--      schema.sql  →  migration-phase3.sql  →  migration-level-curve-40.sql
--      →  migration-food-shop.sql  →  migration-furniture-slots.sql
--      →  migration-room-decor.sql
--  (S4's, S5v2's and the decor rows and functions are already in schema.sql,
--   so those last three files are a no-op on a fresh build — run them anyway,
--   so the order matches live.)
--
--  (It REPLACES the old roster-based login with self sign-up: learners create
--   their own account.)
--
--  AUTH MODEL (like the Times Table game):
--   • Learners SIGN UP themselves: own name + username + password.
--   • Passwords are stored BCRYPT-HASHED — the teacher never sees them.
--   • Forgot a password? The teacher "resets" it (clears it); the learner
--     then sets a new one on their next login. Their progress is kept.
--
--  SECURITY: every table has RLS on with NO policies, so the publishable
--  key can't touch tables directly. All access goes through SECURITY
--  DEFINER functions that verify the password (or admin password)
--  server-side. The secret/service-role key is never needed.
-- ============================================================

create extension if not exists pgcrypto with schema extensions;

-- fresh start for the account tables (drops the old roster-based ones)
drop table if exists public.blips      cascade;
drop table if exists public.struggles cascade;
drop table if exists public.progress  cascade;
drop table if exists public.students  cascade;

create table public.students (
  id             uuid primary key default gen_random_uuid(),
  username       text unique not null,         -- the login id (lower-cased)
  display_name   text not null,                -- the name they chose to show
  password       text,                         -- BCRYPT HASH; null = reset (set a new one)
  created_at     timestamptz not null default now(),
  last_active_at timestamptz,
  -- Blipwork companion state (2026-07-19). XP = lifetime levelling counter
  -- (never spent); Gold = shop currency (never rank). No daily cap by design:
  -- the app doubles as exam revision, pacing comes from the level curve +
  -- level-gated shop items.
  gold           int not null default 0,
  xp             int not null default 0,
  blip_name      text not null default 'Blip', -- free-form nickname, never shown publicly
  blip_colour    text not null default 'blue', -- SL restyle (2026-07-19): blue is the free starting colour
  owned_items    jsonb not null default '[]'::jsonb, -- array of shop item_ids
  equipped       jsonb not null default '{}'::jsonb, -- slot -> item_id ('' = empty)
  -- Phase 2 (2026-07-19) feeding/care bookkeeping. HEALTH itself is never
  -- stored — it is computed from these + the term toggle (see _mhq_health).
  -- The blip_* / owned_items / equipped columns above are kept but the RPCs
  -- now treat the `blips` table as the source of truth (per-blip state).
  -- S4 (2026-08-08) SPLIT these two apart. They used to be one column, and
  -- then feeding him a bought apple silently ate his free cookie. Her
  -- ruling: it must not. So —
  last_fed_day    date,                           -- last day he ate ANYTHING (the sickness-clock anchor)
  last_cookie_day date,                           -- last day the FREE cookie was claimed (growth)
  care_streak    integer not null default 0,      -- consecutive qualifying care days
  last_care_day  date,                            -- last day soup+medicine were given
  pantry         jsonb not null default '{}'::jsonb, -- consumables: {soup:n, medicine:n} — never expire
  -- Room build S4b (2026-08-08 revision): groceries moved OFF the pantry
  -- onto a same-day tray. Same shape, but day-stamped and lazily wiped —
  -- EXPIRED FOOD IS GONE, NO REFUND. See _mhq_tray below.
  tray           jsonb not null default '{}'::jsonb, -- today's groceries: {apple:n, ...}
  tray_day       date,                              -- the day `tray` was last written
  -- Room build S2 (2026-08-08). Both are household-wide, not per blip.
  -- trinkets        = the junk loot on the Inventory shelf, e.g. ["old-sock"].
  --                   A shelf belongs to the ROOM, so it is not per blip: a
  --                   learner browsing her second blip still sees her shelf.
  -- milestone_boxes = the QUEUE of unopened mystery boxes, as milestone
  --                   levels, e.g. [10, 20]. A plain counter could not say
  --                   how many diamonds each one owes.
  trinkets        jsonb not null default '[]'::jsonb,
  milestone_boxes jsonb not null default '[]'::jsonb
);

-- Per-blip companion state (slot 1 = the original, slot 2 = the reward baby).
-- A table (not blip2_* columns) so a third blip needs no migration.
create table public.blips (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid    not null references public.students(id) on delete cascade,
  slot        integer not null check (slot in (1, 2)),
  name        text    not null default 'Blip',
  colour      text    not null default 'blue',    -- SL restyle: blue is the free starting colour
  feed_count  integer not null default 0,         -- cumulative free-cookie feedings (growth)
  owned_items jsonb   not null default '[]'::jsonb,
  equipped    jsonb   not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  unique (student_id, slot)
);

create table public.progress (
  id             uuid primary key default gen_random_uuid(),
  student_id     uuid not null references public.students(id) on delete cascade,
  quest_id       text not null,
  best_score     numeric not null default 0,
  attempts       int not null default 0,
  total_xp       int not null default 0,
  passed         boolean not null default false,
  last_played_at timestamptz,
  unique (student_id, quest_id)
);

create table public.struggles (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid not null references public.students(id) on delete cascade,
  concept     text not null,
  count       int not null default 0,
  last_ts     timestamptz not null default now(),
  unique (student_id, concept)
);

create table if not exists public.quests (
  quest_id  text primary key,
  chapter   text not null default 'stats',
  is_open   boolean not null default false,
  sort      int not null default 0
);

create table if not exists public.app_config (key text primary key, value text);

-- Shop catalogue: prices/level gates MUST live server-side (client is tamperable).
-- category 'cosmetic' = accessories (per-blip, slot-gated); 'food' = pharmacy /
-- grocery consumables (soup, medicine) + instant treats; 'trinket' = the junk
-- loot from milestone mystery boxes (2026-08-08) — never sold, never worn, so
-- it gets its own category AND its own slot value and is deliberately absent
-- from mhq_equip's allowed keys; 'furniture' = the isometric room's bed / desk
-- / window / door (2026-08-08, room build S5v2) — sold and equipped exactly
-- like a cosmetic, but on its own category so it stays out of the cosmetic
-- shop payload and out of BOTH treasure-box loot pools.
-- The shop payload filters on category = 'cosmetic', which is what keeps
-- trinkets and furniture out of the shop for free.
create table if not exists public.shop_items (
  item_id   text primary key,
  slot      text    not null,
  price     integer not null check (price >= 0),
  min_level integer not null default 1,
  active    boolean not null default true,
  sort      integer not null default 0,
  category  text    not null default 'cosmetic',
  constraint shop_items_slot_cat_check check (
       (category = 'cosmetic'  and slot in ('hat','ears','glasses','wings','arms','back','effects','neck'))
    or (category = 'food'      and slot = 'food')
    or (category = 'trinket'   and slot = 'trinket')
    or (category = 'furniture' and slot in ('bed','desk','window','door',
                                            'shelf-left','shelf-right','beanbag','wall')))
);

-- Room build S2 (2026-08-08): one grant per (student, milestone), ever. The
-- primary key IS the dedupe, exactly like phase 3's box_grants — a replay at
-- the same level finds the row already there and awards nothing.
-- Deliberately NOT cleared by mhq_admin_reset_progress: a reset drops XP so the
-- gates re-lock, but a prize already won is never confiscated (2026-07-19 reset
-- ruling), and re-climbing must not re-farm boxes.
create table if not exists public.milestone_grants (
  student_id uuid    not null references public.students(id) on delete cascade,
  milestone  integer not null,
  granted_at timestamptz not null default now(),
  primary key (student_id, milestone)
);

-- ---------- lock everything down ----------
alter table public.students   enable row level security;
alter table public.blips      enable row level security;
alter table public.quests     enable row level security;
alter table public.progress   enable row level security;
alter table public.struggles  enable row level security;
alter table public.app_config enable row level security;
alter table public.shop_items enable row level security;
alter table public.milestone_grants enable row level security;
revoke all on public.students, public.blips, public.quests, public.progress, public.struggles, public.app_config, public.shop_items, public.milestone_grants from anon, authenticated;

-- drop old-version functions first. Some are recreated below with renamed
-- parameters (p_name -> p_username), which create-or-replace cannot do.
drop function if exists public.mhq_list_students();
drop function if exists public.mhq_first_login(text, text);
drop function if exists public.mhq_admin_add_student(text, text);
drop function if exists public._mhq_auth(text, text);
drop function if exists public.mhq_login(text, text);
drop function if exists public.mhq_get_state(text, text);
drop function if exists public.mhq_submit_quest(text, text, text, numeric, int, int, int);
drop function if exists public.mhq_log_struggle(text, text, text);
-- Phase 2 renamed/re-typed signatures (buy/equip gained a p_slot arg):
drop function if exists public.mhq_buy_item(text, text, text);
drop function if exists public.mhq_equip(text, text, jsonb, text, text);

-- ============================================================
--  HELPERS
-- ============================================================
create or replace function public._mhq_auth(p_username text, p_password text)
returns uuid language sql stable security definer set search_path = public, extensions as $$
  select id from public.students
  where username = lower(p_username) and password is not null and password = crypt(p_password, password);
$$;

create or replace function public._mhq_admin_ok(p_admin_password text)
returns boolean language sql stable security definer set search_path = public, extensions as $$
  select coalesce((select value = crypt(p_admin_password, value) from public.app_config where key = 'admin_password'), false);
$$;

-- Level formula (single source of truth, mirrored in client JS):
--   cost(L) = round(300 * 1.5^(L-1) / 10) * 10   XP to go from level L to L+1
-- bar resets each level; cap 20. Sized for real quest payouts (110-260 XP each):
-- all 79 quests ≈ level 9, heavy revision lands 10-12.
-- Level curve, cap 40 (room build S2, 2026-08-08 — replaces the old
-- 300 * 1.5^(L-1) cap-20 curve, which needed ~120 rounds to reach level 10).
-- cost(L) = XP to go from level L to L+1; the bar resets each level.
-- Anchors: L10 = 3,960 XP · L20 = 14,060 · L30 = 30,160 · L40 = 52,260.
-- Mirrored ONLY in js/companion/level.js. Mirrored in SQL by
-- supabase/migration-level-curve-40.sql.
create or replace function public._mhq_level(p_xp integer) returns jsonb
language plpgsql immutable
set search_path = ''
as $$
declare lvl int := 1; cost int; rem int := greatest(coalesce(p_xp, 0), 0);
begin
  loop
    cost := 200 + 60 * (lvl - 1);
    exit when rem < cost or lvl >= 40;
    rem := rem - cost; lvl := lvl + 1;
  end loop;
  return jsonb_build_object('level', lvl, 'intoLevel', rem,
    'nextCost', case when lvl >= 40 then null else to_jsonb(cost) end);
end; $$;

-- ---------- Phase 2 (feeding / growth / sickness) helpers ----------
-- Ensure a slot-1 blip exists (lazy backfill for any pre-blips-table student).
create or replace function public._mhq_ensure_blip(p_sid uuid)
returns void language plpgsql security definer set search_path = public, extensions as $$
begin
  insert into public.blips (student_id, slot, name, colour, owned_items, equipped)
  select s.id, 1, s.blip_name, s.blip_colour, s.owned_items, s.equipped
    from public.students s where s.id = p_sid
  on conflict (student_id, slot) do nothing;
end; $$;

-- Growth stage 0..3 from cumulative feedings (thresholds 10/25/45).
create or replace function public._mhq_growth(p_feed integer)
returns integer language sql immutable set search_path = '' as $$
  select case when coalesce(p_feed,0) >= 45 then 3
              when coalesce(p_feed,0) >= 25 then 2
              when coalesce(p_feed,0) >= 10 then 1
              else 0 end;
$$;

-- Room build S4b (2026-08-08): today's tray, lazily expired. Returns the
-- stored tray unchanged if it was written today, else an empty one — a
-- stale tray is never restored (no refund). See supabase/migration-food-
-- shop.sql §1c for the full reasoning.
create or replace function public._mhq_tray(p_tray jsonb, p_tray_day date)
returns jsonb language sql stable security definer set search_path = public, extensions as $$
  select case when p_tray_day is null or p_tray_day < current_date
              then '{}'::jsonb else coalesce(p_tray, '{}'::jsonb) end;
$$;

-- Is TODAY a qualifying day? (weekday Mon–Fri AND the term toggle is ON)
create or replace function public._mhq_is_qual_day()
returns boolean language plpgsql stable security definer set search_path = public, extensions as $$
declare running boolean;
begin
  select (value = 'true') into running from public.app_config where key = 'term_running';
  return coalesce(running, false) and extract(isodow from current_date) < 6;
end; $$;

-- Household health, COMPUTED (never stored/trusted). window_start =
-- GREATEST(last_fed_day, term_on_since); days_unfed = qualifying (weekday) days
-- in (window_start, today]. Term OFF -> nothing qualifies -> 0 (the pause rule).
-- Stages: 0 healthy 0–2 · 1 tired 3–4 · 2 bedridden 5–6 · 3 critical 7+.
create or replace function public._mhq_health(p_last_fed date, p_care_streak integer)
returns jsonb language plpgsql stable security definer set search_path = public, extensions as $$
declare running boolean; on_since date; wstart date; du int; stg int; rec boolean;
begin
  select (value = 'true') into running from public.app_config where key = 'term_running';
  running := coalesce(running, false);
  select value::date into on_since from public.app_config where key = 'term_on_since';

  if not running or on_since is null then
    du := 0;
  else
    wstart := greatest(coalesce(p_last_fed, on_since), on_since);
    select count(*) into du
      from generate_series((wstart + 1)::timestamp, current_date::timestamp, interval '1 day') g(d)
     where extract(isodow from g.d) < 6;
  end if;

  stg := case when du >= 7 then 3 when du >= 5 then 2 when du >= 3 then 1 else 0 end;
  rec := (coalesce(p_care_streak, 0) >= 1 and stg >= 2);
  return jsonb_build_object(
    'stage', stg, 'daysUnfed', du, 'recovering', rec,
    'careStreak', coalesce(p_care_streak, 0),
    'locks', jsonb_build_object('dress', stg >= 2, 'shop', stg >= 3, 'gallery', stg >= 3));
end; $$;

-- ============================================================
--  LEARNER RPC
-- ============================================================
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

create or replace function public.mhq_login(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare s public.students;
begin
  select * into s from public.students where username = lower(p_username);
  if not found then return jsonb_build_object('ok', false, 'error', 'no_such_user'); end if;
  if s.password is null then return jsonb_build_object('ok', false, 'needsReset', true); end if;
  if s.password <> crypt(p_password, s.password) then return jsonb_build_object('ok', false, 'error', 'wrong_password'); end if;
  update public.students set last_active_at = now() where id = s.id;
  return jsonb_build_object('ok', true);
end; $$;

-- set a new password after the teacher has reset (cleared) it
create or replace function public.mhq_set_password(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare s public.students;
begin
  if length(coalesce(p_password,'')) < 4 then return jsonb_build_object('ok', false, 'error', 'too_short'); end if;
  select * into s from public.students where username = lower(p_username);
  if not found then return jsonb_build_object('ok', false, 'error', 'no_such_user'); end if;
  if s.password is not null then return jsonb_build_object('ok', false, 'error', 'already_set'); end if;
  update public.students set password = crypt(p_password, gen_salt('bf')), last_active_at = now() where id = s.id;
  return jsonb_build_object('ok', true);
end; $$;

create or replace function public.mhq_get_state(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; prog jsonb; total int; open_q jsonb; st record; shop jsonb; food jsonb; furn jsonb;
        blips_j jsonb; blip1 jsonb; health jsonb; stg int; is_qual boolean;
        can_feed boolean; can_care boolean;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  update public.students set last_active_at = now() where id = sid;
  perform public._mhq_ensure_blip(sid);
  select * into st from public.students where id = sid;

  -- S4b: a stale tray (yesterday's groceries) is discarded here too — no
  -- refund — and the clearing is written back so it is a fact on the row.
  if st.tray_day is not null and st.tray_day < current_date then
    update public.students set tray = '{}'::jsonb where id = sid;
    st.tray := '{}'::jsonb;
  end if;

  select coalesce(jsonb_object_agg(quest_id, jsonb_build_object(
            'best_score', best_score, 'attempts', attempts, 'total_xp', total_xp,
            'passed', passed, 'last_played_at', last_played_at)), '{}'::jsonb)
    into prog from public.progress where student_id = sid;
  select coalesce(sum(total_xp), 0) into total from public.progress where student_id = sid;
  select coalesce(jsonb_agg(quest_id order by sort), '[]'::jsonb) into open_q from public.quests where is_open;
  -- cosmetics only, exact existing shape
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', item_id, 'slot', slot, 'price', price, 'minLevel', min_level) order by sort), '[]'::jsonb)
    into shop from public.shop_items where active and category = 'cosmetic';
  -- pharmacy / grocery, separate array so `shop` keeps its shape.
  -- S4 (2026-08-08): `minLevel` joined the payload when the 44 groceries
  -- landed — the tiers are level-gated, and without it a food card cannot
  -- say "Unlocks at Lv N". No new column: shop_items.min_level was always
  -- there, so nothing needed a new GRANT.
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', item_id, 'kind', item_id, 'price', price, 'minLevel', min_level) order by sort), '[]'::jsonb)
    into food from public.shop_items where active and category = 'food';
  -- Room build S5v2 (2026-08-08): the furniture catalogue, in its own array
  -- for the same reason foodShop is separate — `shop` keeps its exact shape,
  -- so the cosmetic panels never learn what a bed is. Same four fields as
  -- `shop`, so the furniture panel can reuse the cards the shop already draws.
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', item_id, 'slot', slot, 'price', price, 'minLevel', min_level) order by sort), '[]'::jsonb)
    into furn from public.shop_items where active and category = 'furniture';

  health := public._mhq_health(st.last_fed_day, st.care_streak);
  stg := (health->>'stage')::int;

  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', slot, 'name', name, 'colour', colour, 'feedCount', feed_count,
            'growthStage', public._mhq_growth(feed_count),
            'owned', owned_items, 'equipped', equipped) order by slot), '[]'::jsonb)
    into blips_j from public.blips where student_id = sid;
  -- back-compat: `blip` = slot 1 (the existing UI reads this object)
  select jsonb_build_object('name', name, 'colour', colour, 'owned', owned_items, 'equipped', equipped)
    into blip1 from public.blips where student_id = sid and slot = 1;

  is_qual  := public._mhq_is_qual_day();
  -- S4: the cookie reads its OWN stamp, so eating a bought grocery (which
  -- sets last_fed_day) leaves the free cookie sitting there waiting.
  can_feed := (stg < 2) and (st.last_cookie_day is null or st.last_cookie_day < current_date);
  can_care := (stg >= 2) and is_qual and (st.last_care_day is null or st.last_care_day < current_date);

  return jsonb_build_object('ok', true,
    'student', jsonb_build_object('id', sid, 'name', st.display_name, 'username', lower(p_username)),
    'progress', prog, 'totalXp', total, 'openQuests', open_q,
    'gold', st.gold, 'xp', st.xp, 'levelInfo', public._mhq_level(st.xp),
    'blip', blip1, 'blips', blips_j, 'shop', shop, 'foodShop', food, 'furnitureShop', furn,
    'pantry', st.pantry, 'tray', coalesce(st.tray, '{}'::jsonb), 'health', health,
    'canFeedToday', can_feed, 'canCareToday', can_care,
    'termRunning', (select coalesce((value = 'true'), false) from public.app_config where key = 'term_running'));
end; $$;

-- ---------- Phase 2: feed / care / second blip ----------
create or replace function public.mhq_feed(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; st record; stg int; blips_j jsonb;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  perform public._mhq_ensure_blip(sid);
  select last_fed_day, last_cookie_day, care_streak into st from public.students where id = sid for update;
  stg := (public._mhq_health(st.last_fed_day, st.care_streak)->>'stage')::int;
  if stg >= 2 then return jsonb_build_object('ok', false, 'error', 'REFUSES_FOOD'); end if;
  -- S4: guarded by the cookie's OWN stamp. A bought apple sets last_fed_day
  -- (it resets the sickness clock) but must never consume the free cookie.
  if st.last_cookie_day is not null and st.last_cookie_day >= current_date then
    return jsonb_build_object('ok', false, 'error', 'already_fed');
  end if;
  -- the cookie is still the ONLY thing that grows a blip, so growth can
  -- never be bought (phase-2 ruling, unchanged by the food shop)
  update public.blips set feed_count = feed_count + 1 where student_id = sid;  -- household
  update public.students set last_cookie_day = current_date, last_fed_day = current_date,
                             last_active_at = now() where id = sid;
  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', slot, 'name', name, 'colour', colour, 'feedCount', feed_count,
            'growthStage', public._mhq_growth(feed_count)) order by slot), '[]'::jsonb)
    into blips_j from public.blips where student_id = sid;
  return jsonb_build_object('ok', true, 'blips', blips_j,
    'health', public._mhq_health(current_date, st.care_streak), 'canFeedToday', false);
end; $$;

-- ---------- Room build S4 (2026-08-08, revised S4b): eat a grocery ----------
-- Consumes one food from TODAY'S TRAY. The client plays the eating moment;
-- the server decides whether it happened, because the tray is server
-- state. Shape follows mhq_feed / mhq_care exactly.
--
-- NOT EDIBLE: soup and medicine (mhq_care consumes those as a PAIR to make
-- one care day — eating the soup on its own would break the streak, and
-- they live in the pantry, not the tray) and 'treat' (a gold sink that
-- never lands anywhere).
--
-- A STALE TRAY READS AS EMPTY (via _mhq_tray) — yesterday's uneaten
-- groceries report `none_left`, exactly like never having bought them.
--
-- WHAT EATING DOES AND DOES NOT DO (her ruling, 2026-08-08):
--   DOES     — consume the food and reset the SICKNESS CLOCK (last_fed_day).
--              It is real food; a learner who feeds him a steak must not
--              still find him starving.
--   DOES NOT — touch the free cookie (that lives on its own stamp,
--              last_cookie_day) and does NOT grow him. Growth stays
--              cookie-only, so growth can never be bought.
-- See supabase/migration-food-shop.sql §1b/§1c for why the columns split.
create or replace function public.mhq_eat_food(p_username text, p_password text, p_item text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_st record; v_itm record; v_stg int;
        v_tray jsonb; v_cnt int; v_blips jsonb; v_can_feed boolean;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  perform public._mhq_ensure_blip(v_sid);

  select * into v_itm from public.shop_items
   where shop_items.item_id = p_item and shop_items.active and shop_items.category = 'food';
  if not found then return jsonb_build_object('ok', false, 'error', 'no_item'); end if;
  if p_item in ('soup', 'medicine', 'treat') then
    return jsonb_build_object('ok', false, 'error', 'not_edible');
  end if;

  select students.tray, students.tray_day, students.last_fed_day, students.last_cookie_day, students.care_streak
    into v_st from public.students where students.id = v_sid for update;

  v_stg := (public._mhq_health(v_st.last_fed_day, v_st.care_streak)->>'stage')::int;
  if v_stg >= 2 then return jsonb_build_object('ok', false, 'error', 'REFUSES_FOOD'); end if;

  v_tray := public._mhq_tray(v_st.tray, v_st.tray_day);
  v_cnt := coalesce((v_tray->>p_item)::int, 0);
  if v_cnt < 1 then return jsonb_build_object('ok', false, 'error', 'none_left'); end if;
  if v_cnt - 1 <= 0 then
    v_tray := v_tray - p_item;                     -- `jsonb - text` drops the key
  else
    v_tray := jsonb_set(v_tray, array[p_item], to_jsonb(v_cnt - 1), true);
  end if;

  -- last_fed_day resets the clock; the cookie stamp and feed_count
  -- (growth) stay untouched.
  update public.students
     set tray = v_tray, tray_day = current_date, last_fed_day = current_date, last_active_at = now()
   where students.id = v_sid;

  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', blips.slot, 'name', blips.name, 'colour', blips.colour,
            'feedCount', blips.feed_count,
            'growthStage', public._mhq_growth(blips.feed_count),
            'owned', blips.owned_items, 'equipped', blips.equipped) order by blips.slot), '[]'::jsonb)
    into v_blips from public.blips where blips.student_id = v_sid;

  v_can_feed := (v_st.last_cookie_day is null or v_st.last_cookie_day < current_date);

  return jsonb_build_object('ok', true, 'item', p_item, 'tray', v_tray, 'blips', v_blips,
    'health', public._mhq_health(current_date, v_st.care_streak),
    -- the cookie survives a grocery feeding — that is the whole point
    'canFeedToday', v_can_feed);
end; $$;

create or replace function public.mhq_care(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; st record; stg int; on_since date; skipped int; new_streak int;
        healed boolean := false; pan jsonb; n_soup int; n_med int;
        new_last_fed date; new_care date;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  select last_fed_day, care_streak, last_care_day, pantry into st
    from public.students where id = sid for update;
  stg := (public._mhq_health(st.last_fed_day, st.care_streak)->>'stage')::int;
  if stg < 2 then return jsonb_build_object('ok', false, 'error', 'not_sick'); end if;
  if not public._mhq_is_qual_day() then return jsonb_build_object('ok', false, 'error', 'not_care_day'); end if;
  if st.last_care_day is not null and st.last_care_day >= current_date then
    return jsonb_build_object('ok', false, 'error', 'already_cared');
  end if;

  pan    := coalesce(st.pantry, '{}'::jsonb);
  n_soup := coalesce((pan->>'soup')::int, 0);
  n_med  := coalesce((pan->>'medicine')::int, 0);
  if n_soup < 1 or n_med < 1 then
    return jsonb_build_object('ok', false, 'error', 'need_supplies',
      'needSoup', (n_soup < 1), 'needMedicine', (n_med < 1));
  end if;
  pan := jsonb_set(pan, '{soup}',     to_jsonb(n_soup - 1), true);
  pan := jsonb_set(pan, '{medicine}', to_jsonb(n_med  - 1), true);

  select value::date into on_since from public.app_config where key = 'term_on_since';
  if st.last_care_day is null then
    new_streak := 1;
  else
    select count(*) into skipped
      from generate_series((greatest(st.last_care_day, coalesce(on_since, st.last_care_day)) + 1)::timestamp,
                           (current_date - 1)::timestamp, interval '1 day') g(d)
     where extract(isodow from g.d) < 6;
    new_streak := case when skipped = 0 then coalesce(st.care_streak, 0) + 1 else 1 end;
  end if;

  new_care := current_date;
  if new_streak >= 3 then
    healed := true; new_streak := 0; new_last_fed := current_date;   -- back to healthy; growth kept
  else
    new_last_fed := st.last_fed_day;
  end if;

  update public.students
     set pantry = pan, care_streak = new_streak, last_care_day = new_care,
         last_fed_day = new_last_fed, last_active_at = now()
   where id = sid;
  return jsonb_build_object('ok', true, 'healed', healed, 'pantry', pan,
    'health', public._mhq_health(new_last_fed, new_streak));
end; $$;

create or replace function public.mhq_claim_second_blip(p_username text, p_password text, p_name text, p_colour text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; lvl int; nm text; col text; blips_j jsonb;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  lvl := (public._mhq_level((select xp from public.students where id = sid))->>'level')::int;
  -- Her call, 2026-08-12: 10 -> 20. Level 10 arrived too soon once the curve
  -- capped at 40 and the milestone boxes landed at 10/20/30/40; a second Blip
  -- at 20 is a milestone reward rather than something that turns up while the
  -- first one is still new. Mirrored in js/config.js `secondBlipLevel`, which
  -- js/blip.js must READ rather than hard-code (it used to hard-code 10).
  if lvl < 20 then return jsonb_build_object('ok', false, 'error', 'level_locked', 'minLevel', 20); end if;
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

-- First completion of a quest = full XP; replays = 25% XP (revision always pays,
-- farming one easy round stays slow). Gold: flat 10 per completed round, every round.
create or replace function public.mhq_submit_quest(
  p_username text, p_password text, p_quest text,
  p_score numeric, p_xp int, p_total int, p_correct int)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; was_passed boolean := false; now_passed boolean;
        xp_gain int; gold_gain int := 10; old_xp int; new_xp int; new_gold int;
        old_lvl int; new_lvl int;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  now_passed := (p_score >= 0.8);
  select passed into was_passed from public.progress where student_id = sid and quest_id = p_quest;
  was_passed := coalesce(was_passed, false);
  if was_passed then
    xp_gain := round(greatest(0, least(coalesce(p_xp, 0), 1000)) * 0.25)::int;
  else
    xp_gain := greatest(0, least(coalesce(p_xp, 0), 1000));
  end if;

  insert into public.progress (student_id, quest_id, best_score, attempts, total_xp, passed, last_played_at)
  values (sid, p_quest, p_score, 1, xp_gain, now_passed, now())
  on conflict (student_id, quest_id) do update set
    best_score = greatest(public.progress.best_score, excluded.best_score),
    attempts   = public.progress.attempts + 1,
    total_xp   = public.progress.total_xp + excluded.total_xp,
    passed     = public.progress.passed or excluded.passed,
    last_played_at = now();

  select xp into old_xp from public.students where id = sid;
  update public.students
     set last_active_at = now(), xp = xp + xp_gain, gold = gold + gold_gain
   where id = sid
   returning xp, gold into new_xp, new_gold;

  old_lvl := (public._mhq_level(old_xp)->>'level')::int;
  new_lvl := (public._mhq_level(new_xp)->>'level')::int;

  return jsonb_build_object('ok', true, 'passed', now_passed,
    'badgeEarned', (now_passed and not was_passed), 'xpAwarded', xp_gain,
    'alreadyPassed', was_passed, 'goldAwarded', gold_gain,
    'xp', new_xp, 'gold', new_gold, 'level', new_lvl,
    'levelUp', (new_lvl > old_lvl), 'levelInfo', public._mhq_level(new_xp));
end; $$;

-- Buy: server-authoritative gold/level/ownership checks; row-locked to stop double-spend.
-- category 'cosmetic' = per-blip accessory (on p_slot); 'food' = pharmacy/grocery.
-- soup/medicine -> the pantry (never expire); groceries -> today's TRAY (S4b,
-- expires with no refund, see _mhq_tray); 'treat' = instant gold sink, refused
-- while sick. The pharmacy (soup/medicine) stays open at EVERY sickness stage.
create or replace function public.mhq_buy_item(p_username text, p_password text, p_item text, p_slot integer default 1)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; itm record; st record; lvl int; stg int; v_slot int := coalesce(p_slot, 1);
        pan jsonb; cnt int; v_tray jsonb; owned jsonb; new_gold int;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  if v_slot not in (1, 2) then v_slot := 1; end if;
  perform public._mhq_ensure_blip(sid);
  select * into itm from public.shop_items where item_id = p_item and active;
  if not found then return jsonb_build_object('ok', false, 'error', 'no_item'); end if;
  select xp, gold, pantry, tray, tray_day, last_fed_day, care_streak
    into st from public.students where id = sid for update;
  stg := (public._mhq_health(st.last_fed_day, st.care_streak)->>'stage')::int;
  -- S4 (2026-08-08): moved ABOVE the food branch so the grocery tiers can
  -- use it. The cosmetic branch below reads the same value.
  lvl := (public._mhq_level(st.xp)->>'level')::int;

  if itm.category = 'food' then
    if p_item = 'treat' then
      if stg >= 2 then return jsonb_build_object('ok', false, 'error', 'REFUSES_FOOD'); end if;
      if st.gold < itm.price then return jsonb_build_object('ok', false, 'error', 'gold', 'price', itm.price, 'gold', st.gold); end if;
      update public.students set gold = gold - itm.price where id = sid returning gold into new_gold;
      return jsonb_build_object('ok', true, 'gold', new_gold, 'treat', true);
    elsif p_item in ('soup', 'medicine') then
      -- pharmacy supplies: the PANTRY, unchanged by S4b — never expire.
      if lvl < itm.min_level then return jsonb_build_object('ok', false, 'error', 'locked', 'minLevel', itm.min_level); end if;
      if st.gold < itm.price then return jsonb_build_object('ok', false, 'error', 'gold', 'price', itm.price, 'gold', st.gold); end if;
      pan := coalesce(st.pantry, '{}'::jsonb);
      cnt := coalesce((pan->>p_item)::int, 0) + 1;
      pan := jsonb_set(pan, array[p_item], to_jsonb(cnt), true);
      update public.students set gold = gold - itm.price, pantry = pan where id = sid returning gold into new_gold;
      return jsonb_build_object('ok', true, 'gold', new_gold, 'pantry', pan);
    else
      -- S4b: the 44 groceries are level-gated like cosmetics, and land on
      -- TODAY'S TRAY. A stale tray (yesterday's leftovers) is discarded
      -- first via _mhq_tray — no refund, her ruling.
      if lvl < itm.min_level then return jsonb_build_object('ok', false, 'error', 'locked', 'minLevel', itm.min_level); end if;
      if st.gold < itm.price then return jsonb_build_object('ok', false, 'error', 'gold', 'price', itm.price, 'gold', st.gold); end if;
      v_tray := public._mhq_tray(st.tray, st.tray_day);
      v_tray := jsonb_set(v_tray, array[p_item], to_jsonb(coalesce((v_tray->>p_item)::int, 0) + 1), true);
      update public.students set gold = gold - itm.price, tray = v_tray, tray_day = current_date
        where id = sid returning gold into new_gold;
      return jsonb_build_object('ok', true, 'gold', new_gold, 'tray', v_tray);
    end if;
  end if;

  -- Trinkets (and any future non-buyable category) are not purchasable at all
  -- (2026-08-08). Without this guard the function falls through to the branch
  -- below for ANY non-food row, so a crafted request could "buy" a price-0
  -- trinket. Nothing in the app ever asks for one — but "never in the shop"
  -- belongs on the server, not in the client not offering it.
  -- S5v2 lets FURNITURE through: a bed really is bought, owned and equipped
  -- exactly like a hat, so it wants the whole branch below unchanged.
  if itm.category not in ('cosmetic', 'furniture') then
    return jsonb_build_object('ok', false, 'error', 'no_item');
  end if;

  -- cosmetic accessory or furniture, on the given blip slot
  if stg >= 3 then return jsonb_build_object('ok', false, 'error', 'BLIP_TOO_SICK'); end if;
  select owned_items into owned from public.blips where student_id = sid and slot = v_slot;
  if owned is null then return jsonb_build_object('ok', false, 'error', 'no_blip'); end if;
  if owned ? p_item then return jsonb_build_object('ok', false, 'error', 'owned'); end if;
  if lvl < itm.min_level then return jsonb_build_object('ok', false, 'error', 'locked', 'minLevel', itm.min_level); end if;
  if st.gold < itm.price then return jsonb_build_object('ok', false, 'error', 'gold', 'price', itm.price, 'gold', st.gold); end if;
  update public.blips set owned_items = owned_items || to_jsonb(p_item) where student_id = sid and slot = v_slot
    returning owned_items into owned;
  update public.students set gold = gold - itm.price where id = sid returning gold into new_gold;
  return jsonb_build_object('ok', true, 'gold', new_gold, 'owned', owned, 'slot', v_slot);
end; $$;

-- Equip / recolour / rename — PER BLIP (p_slot). Blocked while sick (stage>=2):
-- he won't get up to be dressed (error BLIP_TOO_SICK). Equipped items must be
-- owned by THAT blip; slots from the known set ('' = unequip); slot-1's first
-- non-BLUE colour needs xp > 0 (SL restyle: blue is the free starting colour,
-- cream is now just a normal selectable colour; the second blip may be any
-- colour at hatch); nickname is free-form (never shown publicly), trimmed,
-- max 24 chars.
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
     where k not in ('hat','ears','glasses','wings','arms','back','effects','neck',
                     -- room build S5v2 (2026-08-08): the four furniture slots.
                     -- BOTH this list and shop_items_slot_cat_check above, or
                     -- an equipped bed comes back 'bad_equipped' (the July bug).
                     'bed','desk','window','door',
                     -- room decor (2026-08-12): two shelf walls, the bean bag
                     -- and wallpaper. `wall` is an ordinary equip slot here on
                     -- purpose — only the CLIENT knows it swaps the room's
                     -- background instead of painting a layer on it.
                     'shelf-left','shelf-right','beanbag','wall')
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

-- Showcase gallery: usernames only (never blip nicknames), builds + level, no scores,
-- alphabetical (deliberately NOT ranked — no rank-shaming). Returns ALL of each
-- student's blips. Blocked for the VIEWER while they are critical (stage 3).
create or replace function public.mhq_gallery(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; g jsonb; my_stg int; st record;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  perform public._mhq_ensure_blip(sid);
  select last_fed_day, care_streak into st from public.students where id = sid;
  my_stg := (public._mhq_health(st.last_fed_day, st.care_streak)->>'stage')::int;
  if my_stg >= 3 then return jsonb_build_object('ok', false, 'error', 'BLIP_TOO_SICK'); end if;

  select coalesce(jsonb_agg(grow order by lower(grow->>'username')), '[]'::jsonb) into g
  from (
    select jsonb_build_object(
      'username', s.username,
      'level', (public._mhq_level(s.xp)->>'level')::int,
      'me', (s.id = sid),
      'stage', (public._mhq_health(s.last_fed_day, s.care_streak)->>'stage')::int,
      'colour', (select colour from public.blips b where b.student_id = s.id and b.slot = 1),
      'equipped', coalesce((select equipped from public.blips b where b.student_id = s.id and b.slot = 1), '{}'::jsonb),
      'blips', coalesce((select jsonb_agg(jsonb_build_object(
                  'slot', b.slot, 'colour', b.colour, 'equipped', b.equipped,
                  'feedCount', b.feed_count, 'growthStage', public._mhq_growth(b.feed_count)) order by b.slot)
                from public.blips b where b.student_id = s.id), '[]'::jsonb)
    ) grow
    from public.students s
  ) t;
  return jsonb_build_object('ok', true, 'gallery', g);
end; $$;

create or replace function public.mhq_log_struggle(p_username text, p_password text, p_concept text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  insert into public.struggles (student_id, concept, count, last_ts) values (sid, p_concept, 1, now())
  on conflict (student_id, concept) do update set count = public.struggles.count + 1, last_ts = now();
  return jsonb_build_object('ok', true);
end; $$;

-- ============================================================
--  ADMIN RPC  (every function checks the admin password)
-- ============================================================
create or replace function public.mhq_admin_login(p_admin_password text)
returns jsonb language sql security definer set search_path = public, extensions as $$
  select jsonb_build_object('ok', public._mhq_admin_ok(p_admin_password));
$$;

create or replace function public.mhq_admin_data(p_admin_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare rows jsonb; qs jsonb; strug jsonb; term_on boolean; term_since text;
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;

  select coalesce(jsonb_agg(jsonb_build_object(
      'id', s.id, 'name', s.display_name, 'username', s.username,
      'hasPassword', (s.password is not null),       -- never the hash
      'lastActive', s.last_active_at,
      'totalXp', coalesce((select sum(total_xp) from public.progress p where p.student_id = s.id), 0),
      -- Phase 2: household health + primary-blip growth for the roster column
      'health', public._mhq_health(s.last_fed_day, s.care_streak),
      'growthStage', (select public._mhq_growth(b.feed_count) from public.blips b where b.student_id = s.id and b.slot = 1),
      'blipCount', (select count(*) from public.blips b where b.student_id = s.id),
      'quests', coalesce((select jsonb_object_agg(quest_id, jsonb_build_object(
                  'best_score', best_score, 'attempts', attempts, 'passed', passed,
                  'last_played_at', last_played_at)) from public.progress p where p.student_id = s.id), '{}'::jsonb)
    ) order by s.display_name), '[]'::jsonb)
  into rows from public.students s;

  select coalesce(jsonb_agg(jsonb_build_object('quest_id', quest_id, 'is_open', is_open) order by sort), '[]'::jsonb)
  into qs from public.quests;

  select coalesce(jsonb_agg(j order by (j->>'count')::int desc), '[]'::jsonb) into strug
  from (select jsonb_build_object('concept', concept, 'count', sum(count), 'students', count(distinct student_id)) j
        from public.struggles group by concept) t;

  select coalesce((value = 'true'), false) into term_on from public.app_config where key = 'term_running';
  select value into term_since from public.app_config where key = 'term_on_since';

  return jsonb_build_object('ok', true, 'rows', rows, 'quests', qs, 'struggles', strug,
    'inactiveDays', 7, 'termRunning', coalesce(term_on, false), 'termOnSince', term_since);
end; $$;

-- Term toggle. Turning ON resets term_on_since = today, which forgives all
-- accrued sickness (the holiday-proof pause + forgiveness mechanism).
create or replace function public.mhq_admin_set_term(p_admin_password text, p_running boolean)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  insert into public.app_config (key, value) values ('term_running', case when p_running then 'true' else 'false' end)
    on conflict (key) do update set value = excluded.value;
  if p_running then
    insert into public.app_config (key, value) values ('term_on_since', current_date::text)
      on conflict (key) do update set value = excluded.value;
  end if;
  return jsonb_build_object('ok', true, 'termRunning', p_running,
    'termOnSince', (select value from public.app_config where key = 'term_on_since'));
end; $$;

create or replace function public.mhq_admin_set_quest_open(p_admin_password text, p_quest text, p_open boolean)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  update public.quests set is_open = p_open where quest_id = p_quest;
  return jsonb_build_object('ok', true);
end; $$;

-- reset = clear the password; the learner sets a new one on next login (progress kept)
create or replace function public.mhq_admin_reset_password(p_admin_password text, p_id uuid)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  update public.students set password = null where id = p_id;
  return jsonb_build_object('ok', true);
end; $$;

create or replace function public.mhq_admin_remove_student(p_admin_password text, p_id uuid)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  delete from public.students where id = p_id;
  return jsonb_build_object('ok', true);
end; $$;

-- reset scores = wipe progress + struggles + lifetime XP but KEEP the account.
-- The learner keeps gold, owned/equipped items, colour and nickname — resets
-- should never confiscate a kid's blob.
create or replace function public.mhq_admin_reset_progress(p_admin_password text, p_id uuid)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  delete from public.progress  where student_id = p_id;
  delete from public.struggles where student_id = p_id;
  update public.students set xp = 0 where id = p_id;
  return jsonb_build_object('ok', true);
end; $$;

create or replace function public.mhq_admin_resolve_struggle(p_admin_password text, p_concept text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  delete from public.struggles where concept = p_concept;
  return jsonb_build_object('ok', true);
end; $$;

-- ============================================================
--  GRANTS — the publishable/anon key may only EXECUTE the API
-- ============================================================
grant execute on function
  public.mhq_signup(text, text, text),
  public.mhq_login(text, text),
  public.mhq_set_password(text, text),
  public.mhq_get_state(text, text),
  public.mhq_submit_quest(text, text, text, numeric, int, int, int),
  public.mhq_log_struggle(text, text, text),
  public.mhq_buy_item(text, text, text, integer),
  public.mhq_equip(text, text, jsonb, text, text, integer),
  public.mhq_gallery(text, text),
  public.mhq_feed(text, text),
  public.mhq_eat_food(text, text, text),
  public.mhq_care(text, text),
  public.mhq_claim_second_blip(text, text, text, text),
  public.mhq_admin_login(text),
  public.mhq_admin_data(text),
  public.mhq_admin_set_quest_open(text, text, boolean),
  public.mhq_admin_set_term(text, boolean),
  public.mhq_admin_reset_password(text, uuid),
  public.mhq_admin_remove_student(text, uuid),
  public.mhq_admin_reset_progress(text, uuid),
  public.mhq_admin_resolve_struggle(text, text)
to anon, authenticated;

-- ============================================================
--  SEED — quests (q1–q3 open) + admin password (default 'admin').
--  No learner roster: learners sign themselves up. CHANGE the admin
--  password via seed-private.sql.
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('q1','stats',true ,1), ('q2','stats',true ,2), ('q3','stats',true ,3),
  ('q4','stats',false,4), ('q5','stats',false,5), ('q6','stats',false,6),
  ('q7','stats',false,7), ('q8','stats',false,8),
  ('f1','finance',false, 9), ('f2','finance',false,10), ('f3','finance',false,11),
  ('f4','finance',false,12), ('f5','finance',false,13), ('f6','finance',false,14),
  ('f7','finance',false,15),
  ('p1','prob',false,16), ('p2','prob',false,17), ('p3','prob',false,18),
  ('p4','prob',false,19), ('p5','prob',false,20), ('p6','prob',false,21),
  ('p7','prob',false,22),
  ('t1','trig',false,23), ('t2','trig',false,24), ('t3','trig',false,25),
  ('t4','trig',false,26), ('t5','trig',false,27), ('t6','trig',false,28),
  ('t7','trig',false,29),
  ('m1','meas',false,30), ('m2','meas',false,31), ('m3','meas',false,32),
  ('m4','meas',false,33), ('m6','meas',false,34), ('m5','meas',false,35),
  ('fn1','func',false,36), ('fn2','func',false,37), ('fn3','func',false,38),
  ('fn4','func',false,39), ('fn5','func',false,40), ('fn6','func',false,41),
  ('fn7','func',false,42),
  ('tg1','tgraph',false,43), ('tg2','tgraph',false,44), ('tg3','tgraph',false,45),
  ('tg4','tgraph',false,46), ('tg5','tgraph',false,47), ('tg6','tgraph',false,48),
  ('tg7','tgraph',false,49),
  ('ag1','analytical',false,50), ('ag2','analytical',false,51), ('ag3','analytical',false,52),
  ('ag4','analytical',false,53), ('ag5','analytical',false,54), ('ag6','analytical',false,55),
  ('ag7','analytical',false,56),
  ('np1','pat',false,57), ('np2','pat',false,58), ('np3','pat',false,59),
  ('np4','pat',false,60), ('np5','pat',false,61), ('np6','pat',false,62),
  ('np7','pat',false,63),
  ('es1','exp',false,64), ('es2','exp',false,65), ('es3','exp',false,66),
  ('es4','exp',false,67), ('es5','exp',false,68), ('es6','exp',false,69),
  ('es7','exp',false,70), ('es8','exp',false,71),
  ('eq1','eqn',false,72), ('eq2','eqn',false,73), ('eq3','eqn',false,74),
  ('eq4','eqn',false,75), ('eq5','eqn',false,76), ('eq6','eqn',false,77),
  ('eq7','eqn',false,78), ('eq8','eqn',false,79)
on conflict (quest_id) do nothing;

insert into public.app_config (key, value) values ('admin_password', crypt('admin', gen_salt('bf')))
on conflict (key) do nothing;

-- Phase 2: the term toggle starts OFF (no sickness accrues until the teacher
-- turns the term on; that toggle also stamps term_on_since = today).
insert into public.app_config (key, value) values ('term_running', 'false')
on conflict (key) do nothing;

-- ── SHOP CATALOGUE ──────────────────────────────────────────────────────────
-- ⚠️ REGENERATED FROM LIVE on 2026-08-07 (read-only query), because this block
-- had fallen three ships behind: the effects slot, the Tripo wave-2 items and
-- the neck slot were all seeded by migrations and never folded back in here. A
-- rebuild from this file would have produced a half-empty shop where equipping
-- an effect returned 'bad_equipped' — the July cape bug, pre-baked.
--
-- 54 cosmetics + 3 food = 57 rows, matching live exactly.
--
-- The five INACTIVE rows at the top are retired items (SL restyle, 2026-07-19)
-- and shadow-crown is deliberately absent (deleted by the wave-2 migration).
-- A retired row is kept so nobody who already owns one has it confiscated;
-- inactive means "not buyable", never "taken away".
--
-- item_ids match js/companion/renderer.js ACCESSORIES keys exactly (hyphenated),
-- and js/local-backend.js mirrors this list for ?local=1. verify-store.html
-- cross-checks all three — an item added on one side only is exactly the drift
-- that check exists to catch.
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  ('round-glasses',       'glasses',   40,  1, false,   10, 'cosmetic'),
  ('cat-ears',               'ears',   60,  2, false,   20, 'cosmetic'),
  ('party-hat',               'hat',   80,  3, false,   30, 'cosmetic'),
  ('stubby-arms',            'arms',  100,  4, false,   40, 'cosmetic'),
  ('angel-wings',           'wings',  150,  6, false,   50, 'cosmetic'),
  ('study-specs',         'glasses',    0,  1, true,     1, 'cosmetic'),
  ('beanie',                  'hat',    0,  1, true,     2, 'cosmetic'),
  ('ear-tufts',              'ears',    0,  1, true,     3, 'cosmetic'),
  ('mitts',                  'arms',    0,  1, true,     4, 'cosmetic'),
  ('nub-wings',             'wings',    0,  1, true,     5, 'cosmetic'),
  ('cape',                   'back',    0,  1, true,     6, 'cosmetic'),
  ('star-shades',         'glasses',   40,  1, true,    11, 'cosmetic'),
  ('heart-eyes',          'glasses',   45,  1, true,    12, 'cosmetic'),
  ('sleepy-eyes',         'glasses',   30,  1, true,    13, 'cosmetic'),
  ('visor',               'glasses',   35,  2, true,    14, 'cosmetic'),
  ('eye-mask',            'glasses',   40,  2, true,    15, 'cosmetic'),
  ('cyber-visor',         'glasses',   65,  3, true,    16, 'cosmetic'),
  ('hud-monocle',         'glasses',   55,  2, true,    17, 'cosmetic'),
  ('headphones',             'ears',   60,  2, true,    21, 'cosmetic'),
  ('bunny-ears',             'ears',   55,  2, true,    22, 'cosmetic'),
  ('tech-antenna',           'ears',   40,  2, true,    23, 'cosmetic'),
  ('headset-cup',            'ears',   70,  3, true,    24, 'cosmetic'),
  ('data-fin',               'ears',   95,  4, true,    25, 'cosmetic'),
  ('halo',                    'hat',   80,  3, true,    31, 'cosmetic'),
  ('bolt-antenna',            'hat',   45,  2, true,    32, 'cosmetic'),
  ('horns',                   'hat',   50,  2, true,    33, 'cosmetic'),
  ('crown',                   'hat',  180,  8, true,    34, 'cosmetic'),
  ('wizard-hat',              'hat',   55,  2, true,    35, 'cosmetic'),
  ('royal-crown',             'hat',  170,  8, true,    36, 'cosmetic'),
  ('power-gloves',           'arms',  100,  4, true,    41, 'cosmetic'),
  ('boxing-gloves',          'arms',   60,  3, true,    42, 'cosmetic'),
  ('mech-gauntlet',          'arms',   70,  3, true,    44, 'cosmetic'),
  ('grapple-claw',           'arms',   85,  4, true,    45, 'cosmetic'),
  ('energy-blade',           'arms',  135,  6, true,    46, 'cosmetic'),
  ('aurora-wings',          'wings',  150,  6, true,    51, 'cosmetic'),
  ('bat-wings',             'wings',  140,  6, true,    52, 'cosmetic'),
  ('dragon-wings',          'wings',  145,  6, true,    53, 'cosmetic'),
  ('gold-wings',            'wings',  150,  6, true,    54, 'cosmetic'),
  ('drone-wings',           'wings',  140,  6, true,    55, 'cosmetic'),
  ('plasma-wings',          'wings',  155,  6, true,    56, 'cosmetic'),
  ('schoolbag',              'back',   50,  2, true,    61, 'cosmetic'),
  ('jetpack',                'back',  200, 10, true,    62, 'cosmetic'),
  ('back-sword',             'back',  130,  6, true,    63, 'cosmetic'),
  ('light-ring',          'effects',    0,  1, true,    70, 'cosmetic'),
  ('flame-ring',          'effects',   45,  2, true,    71, 'cosmetic'),
  ('spark-halo',          'effects',   90,  4, true,    73, 'cosmetic'),
  ('bead-necklace',          'neck',    0,  1, true,    81, 'cosmetic'),
  ('flower-garland',         'neck',   60,  3, true,    83, 'cosmetic'),
  ('star-chain',             'neck',   80,  4, true,    84, 'cosmetic'),
  ('heart-chain',            'neck',   95,  5, true,    85, 'cosmetic'),
  ('medal-choker',           'neck',  125,  6, true,    86, 'cosmetic'),
  ('chunky-chain',           'neck',  160,  7, true,    87, 'cosmetic')
on conflict (item_id) do nothing;

-- Phase 2: pharmacy / grocery. item_id doubles as the "kind". soup/medicine are
-- pantry consumables used by mhq_care; 'treat' is an instant paid gold sink.
-- Prices TUNABLE (soup 15 / medicine 20 / treat 8) — kept server-side.
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  ('soup',                   'food',   15,  1, true,   100, 'food'),
  ('medicine',               'food',   20,  1, true,   101, 'food'),
  ('treat',                  'food',    8,  1, true,   102, 'food')
on conflict (item_id) do nothing;

-- Room build S2 (2026-08-08): the junk loot from milestone mystery boxes.
-- Price 0 and min_level 1 are bookkeeping only — a trinket is never sold and
-- never gated; it only ever arrives inside a box. Labels and (placeholder) art
-- live in js/companion/trinkets.js; js/local-backend.js mirrors this list.
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  ('pen',                 'trinket',    0,  1, true,   200, 'trinket'),
  ('old-sock',            'trinket',    0,  1, true,   201, 'trinket'),
  ('smooth-rock',         'trinket',    0,  1, true,   202, 'trinket'),
  ('paper-clip',          'trinket',    0,  1, true,   203, 'trinket'),
  ('rubber-duck',         'trinket',    0,  1, true,   204, 'trinket'),
  ('broken-ruler',        'trinket',    0,  1, true,   205, 'trinket')
on conflict (item_id) do nothing;

-- Room build S3 (2026-08-08): wave-3 themed collections. Sixteen more
-- cosmetics, no new slot. See migration-wave3-collections.sql for the full
-- rationale; js/companion/collections.js is the client-side grouping that
-- gates these behind their collection's level, not this table.
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  ('sport-shades',  'glasses',  65,  9, true,  90, 'cosmetic'),
  ('gold-shades',   'glasses',  85, 20, true,  91, 'cosmetic'),
  ('star-eyes',     'glasses',  50,  5, true,  92, 'cosmetic'),
  ('angry-eyes',    'glasses',  45,  5, true,  93, 'cosmetic'),
  ('happy-eyes',    'glasses',  40,  5, true,  94, 'cosmetic'),
  ('lash-eyes',     'glasses',  55,  5, true,  95, 'cosmetic'),
  ('dreamy-eyes',   'glasses',  50,  5, true,  96, 'cosmetic'),
  ('wink-eyes',     'glasses',  60,  5, true,  97, 'cosmetic'),
  ('backwards-cap', 'hat',      70,  9, true,  98, 'cosmetic'),
  ('bucket-hat',    'hat',      60,  9, true,  99, 'cosmetic'),
  ('snapback',      'hat',      80, 20, true, 100, 'cosmetic'),
  ('tiara',         'hat',     130, 12, true, 101, 'cosmetic'),
  ('flower-crown',  'hat',      90, 16, true, 102, 'cosmetic'),
  ('hair-bow',      'hat',      75, 12, true, 103, 'cosmetic'),
  ('butterfly-wing','wings',    95, 12, true, 104, 'cosmetic'),
  ('fairy-wing',    'wings',   150, 16, true, 105, 'cosmetic')
on conflict (item_id) do nothing;

-- Room build S4 (2026-08-08): the grocery store — 44 more category-'food'
-- rows beside soup/medicine/treat. No new category, no new slot, no new
-- column. min_level is the tier gate and mhq_buy_item enforces it; which
-- tier a food belongs to (and therefore which locked "?" card hides it in
-- the shop) is a CLIENT grouping in js/companion/collections.js, so Megan
-- can retune a threshold without a migration. Labels and art:
-- js/companion/food.js. See supabase/migration-food-shop.sql.
--   Fresh Lv 1 · Bakery Lv 4 · Hot meals Lv 7 · Braai Lv 11 · Sweets Lv 14 · Drinks Lv 17
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  ('apple',          'food',  5,  1, true, 110, 'food'),
  ('banana',         'food',  5,  1, true, 111, 'food'),
  ('grapes',         'food',  8,  1, true, 112, 'food'),
  ('naartjie',       'food',  6,  1, true, 113, 'food'),
  ('strawberry',     'food',  7,  1, true, 114, 'food'),
  ('watermelon',     'food',  9,  1, true, 115, 'food'),
  ('broccoli',       'food',  4,  1, true, 116, 'food'),
  ('carrot',         'food',  4,  1, true, 117, 'food'),
  ('green-pepper',   'food',  5,  1, true, 118, 'food'),
  ('mielie',         'food',  6,  1, true, 119, 'food'),
  ('peas',           'food',  4,  1, true, 120, 'food'),
  ('tomato',         'food',  5,  1, true, 121, 'food'),
  ('choc-cookie',    'food', 12,  4, true, 130, 'food'),
  ('croissant',      'food', 14,  4, true, 131, 'food'),
  ('doughnut',       'food', 15,  4, true, 132, 'food'),
  ('cupcake',        'food', 16,  4, true, 133, 'food'),
  ('custard-tart',   'food', 18,  4, true, 134, 'food'),
  ('koeksister',     'food', 20,  4, true, 135, 'food'),
  ('toastie',        'food', 22,  7, true, 140, 'food'),
  ('hot-dog',        'food', 24,  7, true, 141, 'food'),
  ('nuggets',        'food', 26,  7, true, 142, 'food'),
  ('spaghetti',      'food', 28,  7, true, 143, 'food'),
  ('burger',         'food', 30,  7, true, 144, 'food'),
  ('pizza',          'food', 32,  7, true, 145, 'food'),
  ('biltong',        'food', 34, 11, true, 150, 'food'),
  ('drumstick',      'food', 36, 11, true, 151, 'food'),
  ('boerewors',      'food', 38, 11, true, 152, 'food'),
  ('sosatie',        'food', 40, 11, true, 153, 'food'),
  ('lamb-chop',      'food', 44, 11, true, 154, 'food'),
  ('steak',          'food', 48, 11, true, 155, 'food'),
  ('lollipop',       'food', 18, 14, true, 160, 'food'),
  ('gummy-bear',     'food', 20, 14, true, 161, 'food'),
  ('marshmallow',    'food', 22, 14, true, 162, 'food'),
  ('jelly-beans',    'food', 24, 14, true, 163, 'food'),
  ('toffee',         'food', 26, 14, true, 164, 'food'),
  ('chocolate-bar',  'food', 30, 14, true, 165, 'food'),
  ('water-bottle',   'food', 20, 17, true, 170, 'food'),
  ('milk',           'food', 24, 17, true, 171, 'food'),
  ('juice-box',      'food', 26, 17, true, 172, 'food'),
  ('cold-drink',     'food', 28, 17, true, 173, 'food'),
  ('orange-juice',   'food', 30, 17, true, 174, 'food'),
  ('cola',           'food', 32, 17, true, 175, 'food'),
  ('hot-chocolate',  'food', 38, 17, true, 176, 'food'),
  ('milkshake',      'food', 45, 17, true, 177, 'food')
on conflict (item_id) do nothing;

-- Room build S5v2 (2026-08-08): FURNITURE — 18 category-'furniture' rows
-- across four new slots (bed/desk/window/door). Sold and equipped exactly
-- like a cosmetic; on its own category so it stays out of the cosmetic shop
-- payload and out of both treasure-box loot pools. Which COLLECTION a piece
-- belongs to (and so which locked "?" card hides it) is a CLIENT grouping in
-- js/companion/collections.js; labels, art and placement on the room shell
-- are in js/companion/furniture.js. See supabase/migration-furniture-slots.sql.
--   basic Lv 1 (free) · techy Lv 8 · princess Lv 14 · door colours Lv 1
-- ⚠️ THE DOOR COLOURS ALL SHARE ONE PICTURE (assets/companion/furniture/
-- door.png), tinted in code through the same offscreen-canvas pipeline Blip's
-- recolouring uses. Her ruling: never one PNG per colour. Nothing about that
-- is visible from here, which is exactly why it is written down here.
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  ('basic-bed',       'bed',      0,  1, true, 200, 'furniture'),
  ('basic-desk',      'desk',     0,  1, true, 201, 'furniture'),
  ('city-window',     'window',   0,  1, true, 202, 'furniture'),
  ('door-white',      'door',     0,  1, true, 203, 'furniture'),
  ('techy-bed',       'bed',    150,  8, true, 210, 'furniture'),
  ('techy-desk',      'desk',   130,  8, true, 211, 'furniture'),
  ('space-window',    'window', 110,  8, true, 212, 'furniture'),
  ('princess-bed',    'bed',    180, 14, true, 220, 'furniture'),
  ('princess-desk',   'desk',   160, 14, true, 221, 'furniture'),
  ('mountain-window', 'window', 130, 14, true, 222, 'furniture'),
  ('door-mint',       'door',    10,  1, true, 230, 'furniture'),
  ('door-sky',        'door',    10,  1, true, 231, 'furniture'),
  ('door-pink',       'door',    12,  1, true, 232, 'furniture'),
  ('door-lemon',      'door',    12,  1, true, 233, 'furniture'),
  ('door-peach',      'door',    15,  1, true, 234, 'furniture'),
  ('door-lilac',      'door',    15,  1, true, 235, 'furniture'),
  ('door-coral',      'door',    18,  1, true, 236, 'furniture'),
  ('door-seafoam',    'door',    20,  1, true, 237, 'furniture')
on conflict (item_id) do nothing;

-- Room decor (2026-08-12): 23 more furniture rows — three themed SETS on the
-- existing bed/desk/window slots, plus FOUR new slots (shelf-left, shelf-right,
-- beanbag, wall). See supabase/migration-room-decor.sql for the full reasoning.
--   nerdy Lv 4 · sport Lv 11 · emo Lv 18 · shelves Lv 1/7/13/19
--   · bean bag Lv 6 · wallpaper Lv 1/5/10/16/22
-- ⚠️ SHELVES AND THE BEAN BAG HAVE NO FREE DEFAULT, unlike every slot S5v2
-- shipped: an empty shelf slot draws NOTHING (a bed you cannot remove makes
-- sense, a shelf you cannot take down does not). `shelf-wood-*` is free but is
-- not a fallback — DEFAULT_FURNITURE in js/companion/furniture.js has no entry
-- for those three slots. That rule is the client's; nothing here enforces it.
-- ⚠️ `wall` IS AN ORDINARY EQUIP SLOT THAT DRAWS NO LAYER. A wallpaper is
-- bought, owned and equipped exactly like a bed — it just REPLACES the room
-- shell instead of sitting on it, which only the client knows about.
-- ⚠️ THE `-left`/`-right` SUFFIX IS THE WALL, NOT A MIRROR FLAG: each side is
-- its own drawing, measured to that wall's rake, and they are not swappable.
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  ('nerdy-bed',          'bed',          80,  4, true, 240, 'furniture'),
  ('nerdy-desk',         'desk',         70,  4, true, 241, 'furniture'),
  ('nerdy-window',       'window',       60,  4, true, 242, 'furniture'),
  ('sport-bed',          'bed',         160, 11, true, 250, 'furniture'),
  ('sport-desk',         'desk',        140, 11, true, 251, 'furniture'),
  ('sport-window',       'window',      120, 11, true, 252, 'furniture'),
  ('emo-bed',            'bed',         200, 18, true, 260, 'furniture'),
  ('emo-desk',           'desk',        175, 18, true, 261, 'furniture'),
  ('emo-window',         'window',      145, 18, true, 262, 'furniture'),
  ('shelf-wood-left',    'shelf-left',    0,  1, true, 270, 'furniture'),
  ('shelf-wood-right',   'shelf-right',   0,  1, true, 271, 'furniture'),
  ('shelf-glossy-left',  'shelf-left',   60,  7, true, 272, 'furniture'),
  ('shelf-glossy-right', 'shelf-right',  60,  7, true, 273, 'furniture'),
  ('shelf-bracket-left', 'shelf-left',   90, 13, true, 274, 'furniture'),
  ('shelf-bracket-right','shelf-right',  90, 13, true, 275, 'furniture'),
  ('shelf-panel-left',   'shelf-left',  120, 19, true, 276, 'furniture'),
  ('shelf-panel-right',  'shelf-right', 120, 19, true, 277, 'furniture'),
  ('beanbag',            'beanbag',      90,  6, true, 280, 'furniture'),
  ('wall-plain',         'wall',          0,  1, true, 290, 'furniture'),
  ('wall-cloud',         'wall',         70,  5, true, 291, 'furniture'),
  ('wall-moons',         'wall',        100, 10, true, 292, 'furniture'),
  ('wall-mountains',     'wall',        140, 16, true, 293, 'furniture'),
  ('wall-stripes',       'wall',        170, 22, true, 294, 'furniture')
on conflict (item_id) do nothing;

-- Closet designs (2026-08-12): six of Megan's Tripo closets on the EXISTING
-- `door` slot. No slot dance — `door` has been in both the constraint and
-- mhq_equip's key list since S5v2, so six new pictures are just six rows.
-- ⚠️ These do NOT break "the door colours share one picture": that ruling is
-- about COLOURS (door-mint and door-coral are one drawing tinted, and must
-- stay that way). A patterned closet is a different piece of furniture that
-- happens to share the slot. Colour -> tint. Design -> its own file.
insert into public.shop_items (item_id, slot, price, min_level, active, sort, category) values
  ('closet-nerdy',   'door',  40,  3, true, 300, 'furniture'),
  ('closet-sport',   'door',  60,  7, true, 301, 'furniture'),
  ('closet-flower',  'door',  70, 10, true, 302, 'furniture'),
  ('closet-lines',   'door',  80, 13, true, 303, 'furniture'),
  ('closet-starry',  'door', 100, 16, true, 304, 'furniture'),
  ('closet-emo',     'door', 120, 20, true, 305, 'furniture')
on conflict (item_id) do nothing;
