-- ============================================================
--  ⚠️ WRITTEN, NOT RUN. Nothing in this file has touched the live
--  database. Worker 1 of the inbox build wrote it (2026-10-04); the
--  foreman applies it on Megan's word, BEFORE the sw v95 push.
--
--  SHIP ORDER: RUN THIS FIRST, THEN PUSH. Applied early it is harmless:
--  four additive columns, three brand-new functions, and one same-arity
--  replace that only ADDS keys to the admin list (the old client ignores
--  keys it does not know).
--
--  BLIPWORK — 📥 INBOX: ANSWERING THE 💬 NOTES  (INBOX-PLAN.md)
--
--  WHY
--   Megan wants to answer her learners' 💬 notes inside the app: type a
--   reply, mark a bug as fixed, or mark a question as answered elsewhere
--   (WhatsApp, a video, a picture). The learner sees the outcome in a
--   small 📥 inbox on the hub. This REPLACES her 2026-09-05 "no reply
--   field" ruling.
--
--  HER FOUR RULINGS (2026-10-04), and where each one lives in this file
--   1. Anonymous notes: her tick only. `fixed` / `addressed` are allowed
--      on an anonymous row and store NO text; `replied` is refused with
--      error 'anon'. Nobody's inbox ever shows an anonymous row, because
--      an anonymous row has no student_id to match. (§3, §5)
--   2. "Answered elsewhere" = status `addressed`. The wording of the
--      learner's line lives in the client, not here.
--   3. "Bug fixed" = status `fixed`, her typed text optional. Same.
--   4. Dot on the icon only: `unseen` in §5, cleared by §6. No push.
--
--  ⚠️ THE ANONYMITY PROMISE IS UNCHANGED. An anonymous row keeps nothing
--   about the sender (NULL student_id, NULL display_name). This file adds
--   no column that could point back at a person, and it refuses to store
--   reply text on a row no learner can ever read. A named note whose
--   author was later removed from the roster also has a NULL student_id
--   (on delete set null); it is treated the same way, for the same
--   reason: there is nobody to deliver to.
--
--  COPY-FORWARD CHECK, done before writing this file (grep over every
--  supabase/*.sql): the newest copy of mhq_admin_feedback is
--  migration-feedback-snapshot.sql §4, mirrored byte-for-byte in
--  supabase/schema.sql. mhq_admin_feedback_read lives only in
--  migration-feedback-papers.sql (not touched here). _mhq_auth and
--  _mhq_admin_ok are defined in schema.sql; the only later file that
--  names them, migration-audit-2026-09-05.sql, changes their GRANTS
--  (sealed to service_role), not their bodies. No later file alters
--  public.feedback's columns (the audit file only deletes one test row
--  and marks one row read). The §4 body below is the snapshot copy plus
--  five keys and nothing else.
--
--  ⚠️ OVERLOAD TRAP, STEPPED AROUND: no existing function gains an
--  argument here. mhq_admin_feedback keeps its single argument, so
--  `create or replace` is a true replace and keeps its grant. The other
--  three functions are new names.
--
--  ⚠️ THE TABLE IS ONLY ALTERED, NEVER RE-CREATED. Re-creating it would
--  hand the default anon/authenticated grants straight back (CLAUDE.md
--  gotcha 8). public.feedback stays RLS-on, no policies, revoked.
--
--  ⚠️ The learner-state function, the admin dashboard function and the
--  send-a-note function are NOT touched by this file.
--
--  Postgres grants EXECUTE to PUBLIC by default on CREATE FUNCTION, so
--  §7's explicit grants are the entire security model for the four
--  functions this file creates or replaces.
-- ============================================================


-- ============================================================
--  0. DEPENDENCY GUARD — fail loudly here rather than half-way through.
-- ============================================================
do $$
begin
  if to_regclass('public.feedback') is null then
    raise exception 'missing public.feedback — run supabase/migration-feedback-papers.sql first';
  end if;
  if not exists (select 1 from information_schema.columns
                  where table_schema = 'public' and table_name = 'feedback'
                    and column_name = 'snapshot') then
    raise exception 'missing feedback.snapshot — run supabase/migration-feedback-snapshot.sql first';
  end if;
  if to_regprocedure('public._mhq_auth(text, text)') is null then
    raise exception 'missing public._mhq_auth(text,text) — run supabase/schema.sql first';
  end if;
  if to_regprocedure('public._mhq_admin_ok(text)') is null then
    raise exception 'missing public._mhq_admin_ok(text) — run supabase/schema.sql first';
  end if;
end $$;


-- ============================================================
--  1. THE FOUR COLUMNS
--
--  status      where the note stands. Every existing row becomes 'open'
--              through the default (Postgres 11+ fills it without a
--              rewrite). One outcome per note: a later action replaces
--              the earlier one.
--  reply       her typed text, trimmed, capped at 1000 by §3. NULL when
--              blank, and ALWAYS NULL on an anonymous row.
--  replied_at  when the current outcome was set. NULL while open.
--  seen_at     when the learner opened the inbox after that outcome.
--              Reset to NULL by every new outcome, so the dot comes back.
--
--  None indexed: a handful of notes a week, read per learner by
--  student_id, which a sequential scan of this table answers instantly.
-- ============================================================
alter table public.feedback add column if not exists status     text not null default 'open';
alter table public.feedback add column if not exists reply      text;
alter table public.feedback add column if not exists replied_at timestamptz;
alter table public.feedback add column if not exists seen_at    timestamptz;


-- ============================================================
--  2. THE STATUS CHECK — added by name, and only if it is not there yet,
--     so this file is safe to run twice.
-- ============================================================
do $$
begin
  if not exists (select 1 from pg_constraint
                  where conname = 'feedback_status_check'
                    and conrelid = 'public.feedback'::regclass) then
    alter table public.feedback
      add constraint feedback_status_check
      check (status in ('open', 'replied', 'fixed', 'addressed'));
  end if;
end $$;


-- ============================================================
--  3. mhq_admin_feedback_reply — NEW. Her one action per note.
--
--  Order of checks:
--   admin password  -> {ok:false, error:'auth'}
--   p_status        -> must be exactly one of the four, else 'status'
--   the row         -> must exist, else 'missing'
--   'open'          -> Undo: clears reply, replied_at, seen_at. read_at
--                      is left alone (Undo is not "mark unread").
--   'replied'       -> anonymous row: 'anon' (checked BEFORE the text,
--                      because no text could ever make it deliverable);
--                      blank text: 'empty'.
--   any outcome     -> replied_at = now(), seen_at = null (the dot comes
--                      back), read_at = coalesce(read_at, now()) (acting
--                      on a note also marks it read on her side).
--   reply text      -> trimmed, capped at 1000, NULL when blank, and
--                      forced NULL on an anonymous row whatever she typed.
-- ============================================================
create or replace function public.mhq_admin_feedback_reply(p_admin_password text, p_id uuid,
                                                           p_status text, p_reply text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_found boolean := false; v_sid uuid; v_reply text;
begin
  if not public._mhq_admin_ok(p_admin_password) then
    return jsonb_build_object('ok', false, 'error', 'auth');
  end if;

  if p_status is null or p_status not in ('open', 'replied', 'fixed', 'addressed') then
    return jsonb_build_object('ok', false, 'error', 'status');
  end if;

  select true, f.student_id into v_found, v_sid
    from public.feedback f where f.id = p_id;
  if not coalesce(v_found, false) then
    return jsonb_build_object('ok', false, 'error', 'missing');
  end if;

  if p_status = 'open' then
    update public.feedback
       set status = 'open', reply = null, replied_at = null, seen_at = null
     where id = p_id;
    return jsonb_build_object('ok', true);
  end if;

  v_reply := left(nullif(btrim(coalesce(p_reply, ''), E' \t\r\n'), ''), 1000);

  if p_status = 'replied' then
    if v_sid is null then return jsonb_build_object('ok', false, 'error', 'anon'); end if;
    if v_reply is null then return jsonb_build_object('ok', false, 'error', 'empty'); end if;
  end if;

  -- the anonymity promise: nobody can read text on an anonymous row, so
  -- none is kept there.
  if v_sid is null then v_reply := null; end if;

  update public.feedback
     set status     = p_status,
         reply      = v_reply,
         replied_at = now(),
         seen_at    = null,
         read_at    = coalesce(read_at, now())
   where id = p_id;

  return jsonb_build_object('ok', true);
end; $$;


-- ============================================================
--  4. mhq_admin_feedback — the teacher's list, now with the outcome.
--
--  Same arity (one argument), so this really is a replace and no drop is
--  needed. Byte-for-byte the copy in migration-feedback-snapshot.sql §4
--  plus five keys: status, reply, repliedAt, seenAt, canReply.
--
--  canReply is NOT the same as `not anon`. `anon` means display_name is
--  null (sent anonymously). canReply means student_id is not null, the
--  very test mhq_admin_feedback_reply refuses on. The two differ for a
--  named note whose learner was later removed from the roster
--  (student_id set null on delete, display_name kept): it shows a name,
--  but there is nobody to deliver a reply to. The admin page reads
--  canReply to decide whether to offer the textbox and Send reply
--  (foreman review of unit 1, 2026-10-04).
-- ============================================================
create or replace function public.mhq_admin_feedback(p_admin_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_rows jsonb; v_unread int;
begin
  if not public._mhq_admin_ok(p_admin_password) then
    return jsonb_build_object('ok', false, 'error', 'auth');
  end if;

  select coalesce(jsonb_agg(r order by r_created desc), '[]'::jsonb), count(*) filter (where r_read is null)
    into v_rows, v_unread
  from (
    select jsonb_build_object(
             'id', f.id,
             'name', coalesce(f.display_name, 'Anonymous'),
             'anon', (f.display_name is null),
             'context', f.context,
             'snapshot', f.snapshot,
             'body', f.body,
             'createdAt', f.created_at,
             'readAt', f.read_at,
             'status', f.status,
             'reply', f.reply,
             'repliedAt', f.replied_at,
             'seenAt', f.seen_at,
             'canReply', (f.student_id is not null)) as r,
           f.created_at as r_created,
           f.read_at    as r_read
      from public.feedback f
     order by f.created_at desc
     limit 500) t;

  return jsonb_build_object('ok', true, 'rows', v_rows, 'unread', v_unread);
end; $$;


-- ============================================================
--  5. mhq_inbox — NEW. The learner's own answered notes.
--
--  _mhq_auth first. Only rows whose student_id is the caller AND whose
--  status is not 'open' (a note still waiting never shows, so the inbox
--  is never a "why haven't you answered" list). Newest outcome first,
--  limit 50. `unseen` counts the returned rows with no seen_at, so the
--  dot can never promise a row the sheet cannot show.
--
--  ⚠️ NEVER returns snapshot (not needed, and it keeps the payload small)
--  and never another learner's row: the WHERE is on the caller's own id,
--  taken from the password check, never from an argument.
-- ============================================================
create or replace function public.mhq_inbox(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_rows jsonb; v_unseen int;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;

  select coalesce(jsonb_agg(r order by r_at desc nulls last, r_created desc), '[]'::jsonb),
         count(*) filter (where r_seen is null)
    into v_rows, v_unseen
  from (
    select jsonb_build_object(
             'id', f.id,
             'body', f.body,
             'context', f.context,
             'createdAt', f.created_at,
             'status', f.status,
             'reply', f.reply,
             'repliedAt', f.replied_at,
             'seenAt', f.seen_at) as r,
           f.replied_at as r_at,
           f.created_at as r_created,
           f.seen_at    as r_seen
      from public.feedback f
     where f.student_id = v_sid
       and f.status <> 'open'
     order by f.replied_at desc nulls last, f.created_at desc
     limit 50) t;

  return jsonb_build_object('ok', true, 'unseen', v_unseen, 'rows', v_rows);
end; $$;


-- ============================================================
--  6. mhq_inbox_seen — NEW. The learner opened the sheet: clear the dot.
--
--  Stamps seen_at on the caller's own answered rows that are not yet
--  seen. Returns how many it stamped (0 is an ordinary answer).
-- ============================================================
create or replace function public.mhq_inbox_seen(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_n int;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;

  update public.feedback
     set seen_at = now()
   where student_id = v_sid
     and status <> 'open'
     and seen_at is null;
  get diagnostics v_n = row_count;

  return jsonb_build_object('ok', true, 'seen', v_n);
end; $$;


-- ============================================================
--  7. GRANTS — the same pattern migration-feedback-snapshot.sql §5 uses.
--
--  mhq_admin_feedback(text) was only replaced, which keeps its grant; it
--  is named anyway so this file states the whole posture of every
--  function it touched rather than relying on what survived.
-- ============================================================
grant execute on function
  public.mhq_admin_feedback_reply(text, uuid, text, text),
  public.mhq_admin_feedback(text),
  public.mhq_inbox(text, text),
  public.mhq_inbox_seen(text, text)
to anon, authenticated;


-- ============================================================
--  sanity checks after running
-- ============================================================
--   -- the four columns are there
--   select column_name, data_type, is_nullable, column_default
--     from information_schema.columns
--    where table_schema = 'public' and table_name = 'feedback'
--      and column_name in ('status', 'reply', 'replied_at', 'seen_at')
--    order by column_name;
--   -- expected: replied_at timestamptz YES | reply text YES |
--   --           seen_at timestamptz YES | status text NO 'open'::text
--
--   -- every existing note is open
--   select status, count(*) from public.feedback group by status;
--   -- expected: one row, open | <all of them>
--
--   -- the check constraint exists (exactly one)
--   select conname, pg_get_constraintdef(oid) from pg_constraint
--    where conrelid = 'public.feedback'::regclass and conname = 'feedback_status_check';
--   -- expected: ONE row, CHECK status IN open/replied/fixed/addressed
--
--   -- ⚠️ THE OVERLOAD CHECK — one of each, with the expected arity
--   select p.oid::regprocedure as signature, p.pronargs
--     from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--    where n.nspname = 'public'
--      and p.proname in ('mhq_admin_feedback', 'mhq_admin_feedback_reply',
--                        'mhq_inbox', 'mhq_inbox_seen');
--   -- expected: FOUR rows: mhq_admin_feedback(text) 1,
--   --   mhq_admin_feedback_reply(text,uuid,text,text) 4,
--   --   mhq_inbox(text,text) 2, mhq_inbox_seen(text,text) 2
--
--   -- definer rights + pinned search_path + grants, all four
--   select p.proname, p.prosecdef, p.proconfig,
--          has_function_privilege('anon', p.oid, 'execute')          as anon_can,
--          has_function_privilege('authenticated', p.oid, 'execute') as auth_can
--     from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--    where n.nspname = 'public'
--      and p.proname in ('mhq_admin_feedback', 'mhq_admin_feedback_reply',
--                        'mhq_inbox', 'mhq_inbox_seen');
--   -- expected: prosecdef t, proconfig {search_path=public, extensions},
--   --   anon_can t, auth_can t on all four rows
--
--   -- the table is still unreachable without an RPC
--   select has_table_privilege('anon', 'public.feedback', 'select')          as anon_sel,
--          has_table_privilege('anon', 'public.feedback', 'update')          as anon_upd,
--          has_table_privilege('authenticated', 'public.feedback', 'select') as auth_sel;
--   -- expected: false, false, false
--
--   -- a wrong admin password is refused
--   select public.mhq_admin_feedback_reply('wrongpassword', gen_random_uuid(), 'fixed', null);
--   -- expected: {"ok": false, "error": "auth"}
--
--   -- a wrong learner password is refused
--   select public.mhq_inbox('nobody', 'wrong');
--   select public.mhq_inbox_seen('nobody', 'wrong');
--   -- expected: {"ok": false, "error": "auth"} twice
