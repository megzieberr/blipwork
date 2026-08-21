-- ============================================================
--  ✅ APPLIED TO LIVE 2026-08-21 via MCP (roster_login_picker_replaces_signup)
--  by the foreman session; roster seeded the same day. NEVER RE-RUN (see below).
--  BLIPWORK — ROSTER LOGIN  (CQ-BRIDGE-PLAN.md Part 1, build session 1)
--  Replaces self sign-up with a Circle-Quest-style name picker.
--
--  ⚠️ THIS IS A FILE, NOT A LIVE ACTION. Written by the build session;
--  applied later by the foreman via MCP with a real roster seeded
--  alongside it. NEVER run this against the live project from a build
--  session.
--
--  WHAT THIS DOES
--   1. Two new columns on students: `cq_name` (the account-mapping link
--      to Circle Quest, nullable) and `hidden` (keeps a row out of the
--      picker without deleting it).
--   2. Hides every row that exists RIGHT NOW — verified 2026-08-13
--      (CQ-BRIDGE-PLAN.md): exactly 2 rows, both test accounts, neither
--      a real learner. No learner has ever used Blipwork, so this is the
--      one moment the login model can be swapped with nothing to migrate.
--   3. Three new RPCs (mhq_list_students, mhq_first_login,
--      mhq_admin_add_student) and the retirement of mhq_signup.
--
--  ⚠️ THE PICKER RETURNS `username`, NOT JUST display_name + has_password.
--  CQ's own list_students omits it because CQ authenticates every RPC by
--  display_name directly. Blipwork does not: its ~20 existing mhq_* RPCs
--  (mhq_get_state, mhq_submit_quest, mhq_buy_item, …) all authenticate via
--  _mhq_auth(p_username, p_password) and that is explicitly NOT changing
--  (CQ-BRIDGE-PLAN.md: "None of that changes"). Without the username in
--  the picker payload, a RETURNING learner (has_password = true, picked
--  on a second device or after clearing storage) would have no way to
--  reach mhq_login at all. This is a deliberate, minimal deviation from
--  the "nothing else in the payload" instruction — flagged for the
--  foreman's review. It costs nothing privacy-wise: mhq_gallery already
--  broadcasts every logged-in student's username to every classmate, so
--  usernames were never secret in this app's model, only passwords are.
--
--  Mirrored in schema.sql (fresh-install source of truth).
--  ⚠️ ONE-SHOT, NOT RE-RUNNABLE: the `update … set hidden = true` below has
--  no where clause on purpose (every row today is a test account), so a
--  re-run AFTER the roster is seeded would hide the whole class from the
--  picker. Apply once, before the seed, never again.
-- ============================================================

-- ---------- 1. columns ----------
alter table public.students add column if not exists cq_name text unique;
alter table public.students add column if not exists hidden  boolean not null default false;

-- Every row that exists at migration time is a pre-launch test account
-- (verified 2026-08-13, exactly 2 rows, both Megan's — CQ-BRIDGE-PLAN.md).
-- Hidden, not deleted: they keep their rows and stay reachable by direct
-- login if ever needed, they just never show up in the picker's search.
update public.students set hidden = true;

-- ---------- 2. learner RPC ----------

-- Picker payload. `hidden = false` is the only filter — a mid-year arrival
-- added via mhq_admin_add_student is unhidden by default and shows up
-- immediately. See the note above on why `username` is here.
create or replace function public.mhq_list_students()
returns table (username text, display_name text, has_password boolean)
language sql stable security definer set search_path = public, extensions as $$
  select username, display_name, (password is not null)
  from public.students
  where hidden = false
  order by display_name;
$$;

-- Mirrors Circle Quest's cgg_first_login, adapted for Blipwork's
-- username/bcrypt model. Only ever sets a password that is currently NULL —
-- which is also the after-admin-reset state (mhq_admin_reset_password
-- clears the password, so the learner looks "new" again here and sets a
-- fresh one; the old separate "reset" screen retires with signup). Matches
-- a NON-HIDDEN row only, so a stale test account cannot be re-claimed
-- through the picker.
create or replace function public.mhq_first_login(p_name text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare s public.students;
begin
  if length(coalesce(p_password,'')) < 4 then return jsonb_build_object('ok', false, 'error', 'too_short'); end if;
  select * into s from public.students where display_name = p_name and hidden = false;
  if not found then return jsonb_build_object('ok', false, 'error', 'no_such_user'); end if;
  if s.password is not null then return jsonb_build_object('ok', false, 'error', 'already_set'); end if;
  update public.students set password = crypt(p_password, gen_salt('bf')), last_active_at = now() where id = s.id;
  return jsonb_build_object('ok', true, 'username', s.username);
end; $$;

-- ---------- 3. kill self sign-up ----------
-- Exact signature match (the overload gotcha) — this is the only mhq_signup
-- that has ever existed, but drop by signature anyway, matching house style.
drop function if exists public.mhq_signup(text, text, text);

-- ---------- 4. admin RPC ----------

-- Mid-year arrival, or any learner added by hand. Same admin-password gate
-- as every other mhq_admin_* function. Inserts a NON-hidden row with a NULL
-- password, so the new name appears in the picker as "new" immediately.
-- p_cq_name is optional — a learner who never played Circle Quest simply
-- has no bridge link (nullif blanks it out rather than storing '').
create or replace function public.mhq_admin_add_student(
  p_admin_password text, p_display_name text, p_username text, p_cq_name text default null)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare uname text := lower(trim(p_username)); new_id uuid;
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  if length(uname) < 3 then return jsonb_build_object('ok', false, 'error', 'username_short'); end if;
  if uname !~ '^[a-z0-9_.]+$' then return jsonb_build_object('ok', false, 'error', 'username_chars'); end if;
  if length(coalesce(trim(p_display_name),'')) < 1 then return jsonb_build_object('ok', false, 'error', 'no_name'); end if;
  if exists (select 1 from public.students where username = uname) then
    return jsonb_build_object('ok', false, 'error', 'username_taken');
  end if;
  insert into public.students (username, display_name, cq_name, password)
  values (uname, trim(p_display_name), nullif(trim(coalesce(p_cq_name, '')), ''), null)
  returning id into new_id;
  return jsonb_build_object('ok', true, 'id', new_id, 'username', uname);
end; $$;

-- ---------- 5. grants ----------
-- mhq_list_students is the one DELIBERATELY public read (like Circle
-- Quest's cgg_list_students) — anon needs it before any login has happened.
grant execute on function
  public.mhq_list_students(),
  public.mhq_first_login(text, text),
  public.mhq_admin_add_student(text, text, text, text)
to anon, authenticated;

-- mhq_signup no longer exists, so there is nothing to revoke — the drop
-- above already removed it (and its grant with it).

-- ---------- sanity check after running ----------
--   select username, display_name, hidden, (password is not null) as has_password
--     from public.students order by display_name;
--   -- expected: the 2 pre-existing rows show hidden = true.
--   select public.mhq_list_students();
--   -- expected: empty until the real roster is seeded (all rows above are hidden).
