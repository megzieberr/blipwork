-- ============================================================
--  ⚠️ WRITTEN, NOT RUN. Nothing in this file has touched the live
--  database yet. It is safe to apply BEFORE the client ships and
--  before any of the push setup is done: everything here is either
--  a nullable column nobody reads yet, or one new RPC that only
--  admin.html calls.
--
--  BLIPWORK — 🔔 HOMEWORK NOTIFICATIONS + the daily Blip nudge
--  (her ask, 2026-08-27: "the kids are asking for daily notification
--   reminders, maybe every time blip needs his cookie and when new
--   homework is assigned")
--
--  WHAT THIS ADDS
--   1. Three nullable columns on `assignments` so the send-push edge
--      function can announce homework WITHOUT the browser: the quest's
--      display title and chapter name (which live in js/config.js, a
--      file Deno cannot read), and the timestamp of the announcement.
--   2. One nullable column on `push_subscriptions` recording WHICH KIND
--      of notification a device last got. `last_push_stage` was
--      hunger-only; now that three kinds share one daily budget, the
--      bookkeeping has to say which one spent it.
--   3. One new RPC, mhq_admin_set_announce, that writes the two display
--      strings onto the active assignment.
--
--  ⚠️ WHY A SEPARATE RPC INSTEAD OF EXTENDING mhq_admin_set_assignment
--  THE COPY-FORWARD LAW (PROJECT-STATUS 2026-08-26): never redefine a
--  live function against anything but its LIVE definition. The cleanest
--  way to obey it is not to redefine one at all. Adding parameters to
--  mhq_admin_set_assignment would also create an OVERLOAD rather than a
--  replacement — two functions, two grant lines, and a live 4-arg copy
--  that quietly keeps working while writing no announce columns. So the
--  existing function is left EXACTLY as it is and admin.js makes a
--  second, additive call.
--
--  If that second call fails (offline blip, closed tab), the columns
--  stay null and the notification degrades to the chapter-less wording
--  in send-push's homeworkMessage(). It never blocks the homework
--  itself, which is already saved by then.
--
--  ⚠️ NOT TOUCHED, deliberately: mhq_get_state, mhq_submit_quest,
--  mhq_admin_data, mhq_admin_set_assignment, mhq_admin_clear_assignment.
--  The learner payload does not change at all — nothing the app renders
--  is different. This whole file is invisible until the push setup in
--  PUSH-SETUP.md is done.
-- ============================================================


-- ============================================================
--  0. DEPENDENCY GUARD — fail loudly here, not half-way through.
-- ============================================================
do $$
begin
  if to_regclass('public.assignments') is null then
    raise exception 'assignments table missing — run migration-phase3.sql first';
  end if;
  if to_regclass('public.push_subscriptions') is null then
    raise exception 'push_subscriptions table missing — run migration-phase3.sql first';
  end if;
  if to_regprocedure('public._mhq_admin_ok(text)') is null then
    raise exception '_mhq_admin_ok missing — run schema.sql first';
  end if;
end $$;


-- ============================================================
--  1. THE ANNOUNCE COLUMNS
--
--  announce_title / announce_chapter are DISPLAY STRINGS, snapshotted at
--  the moment homework is set — "2. Sine rule: sides" / "2D Trigonometry".
--  They are not a source of truth and nothing joins on them; if a quest is
--  ever renamed in js/config.js, an old announcement keeps the words the
--  kids actually saw, which is the right answer for a notification.
--
--  announced_at is the "have the kids been told yet" flag, and it is the
--  entire hold-until-morning mechanism: homework saved late at night is
--  simply left with announced_at null, and the 07:00 cron run picks up
--  anything active and unannounced. NULL means "still owed an
--  announcement", never "old".
-- ============================================================
alter table public.assignments
  add column if not exists announce_title   text,
  add column if not exists announce_chapter text,
  add column if not exists announced_at     timestamptz;

comment on column public.assignments.announced_at is
  'When the "new homework" push went out. NULL = still owed one; the 07:00 SA cron run sends it.';


-- ============================================================
--  2. WHICH KIND OF PUSH WAS LAST SPENT
--
--  'blip' | 'homework' | 'nudge'. Read together with last_push_day, which
--  is still the one-per-learner-per-day budget. Her ruling 2026-08-27:
--  when two want to fire on the same day, HOMEWORK BEATS BLIP.
--
--  last_push_stage stays exactly as it is (hunger level, 1–3) and is now
--  diagnostic only: the "never the same stage twice per episode" rule it
--  used to enforce is GONE, because she asked for a daily nudge while
--  Blip is hungry rather than the old transition-only one.
-- ============================================================
alter table public.push_subscriptions
  add column if not exists last_push_kind text;

comment on column public.push_subscriptions.last_push_kind is
  'blip | homework | nudge — which kind of notification spent this device''s daily budget.';


-- ============================================================
--  3. mhq_admin_set_announce — the display strings for the active row
--
--  Called by admin.js immediately after a successful mhq_admin_set_assignment.
--  Password-checked exactly like every other mhq_admin_* function, and it
--  can only ever write two text columns on the one active assignment: it
--  cannot create, clear, or re-point homework.
--
--  Returns {ok:true, updated:<bool>} — updated:false simply means no
--  assignment is active, which is not an error worth surfacing to her.
-- ============================================================
create or replace function public.mhq_admin_set_announce(
  p_admin_password text, p_title text, p_chapter text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_n int;
begin
  if not public._mhq_admin_ok(p_admin_password) then
    return jsonb_build_object('ok', false, 'error', 'auth');
  end if;

  update public.assignments
     set announce_title   = nullif(btrim(coalesce(p_title, '')), ''),
         announce_chapter = nullif(btrim(coalesce(p_chapter, '')), '')
   where assignments.active;
  get diagnostics v_n = row_count;

  return jsonb_build_object('ok', true, 'updated', v_n > 0);
end; $$;


-- ============================================================
--  4. GRANTS
--
--  Postgres grants EXECUTE to PUBLIC by default on CREATE FUNCTION, so
--  this block is the entire security model for the new function — the
--  lesson migration-ship-fixes.sql learned the hard way.
--
--  The new function goes to anon/authenticated because admin.html calls
--  it with the publishable key, exactly like mhq_admin_set_assignment.
--  The password is the lock, not the key.
--
--  The new COLUMNS need no grants of their own: all four tables carry
--  TABLE-level privileges (verified on live 2026-08-27 — service_role has
--  the full set, anon and authenticated have none at all on assignments
--  or push_subscriptions), and a column added to a table granted at table
--  level is covered by that grant. This is the one case the column-REVOKE
--  gotcha does NOT bite.
-- ============================================================
grant execute on function
  public.mhq_admin_set_announce(text, text, text)
to anon, authenticated;

-- The send-push edge function reads and writes these as the service role
-- over PostgREST. It already had the privileges; these are explicit so a
-- future default-privileges change cannot silently break the schedule.
grant select, update on public.assignments        to service_role;
grant select, update, delete on public.push_subscriptions to service_role;
grant select on public.box_grants, public.quests, public.students, public.blips to service_role;


-- ============================================================
--  5. WHAT TO CHECK AFTER RUNNING (paste into the SQL editor)
--
--    -- the four new columns exist
--    select table_name, column_name from information_schema.columns
--     where table_schema='public'
--       and (table_name='assignments'        and column_name like 'announce%'
--         or table_name='push_subscriptions' and column_name='last_push_kind');
--
--    -- the new function exists, with search_path pinned, and anon can run it
--    select p.proname, p.proconfig,
--           has_function_privilege('anon', p.oid, 'execute') as anon_can
--      from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--     where n.nspname='public' and p.proname='mhq_admin_set_announce';
--
--    -- nobody is owed an announcement they will never get
--    select id, quest_id, announce_title, announced_at
--      from public.assignments where active;
-- ============================================================
