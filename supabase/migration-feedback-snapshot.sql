-- ============================================================
--  ⚠️ WRITTEN, NOT RUN. Nothing in this file has touched the live
--  database. The build session wrote it (2026-09-03); Megan applies it
--  in the Supabase SQL editor.
--
--  ⚠️ SHIP ORDER MATTERS, AND ONLY IN ONE DIRECTION: RUN THIS FIRST,
--  THEN PUSH THE CODE. The client that ships with this change calls
--  mhq_send_feedback with SIX arguments. Against the current live
--  5-argument function that call is a "function not found" error, so
--  every Send would fail until this file is applied. Applied EARLY it is
--  harmless: the old 5-argument callers are gone the moment the drop
--  below runs, and the only caller in the world is the app itself.
--
--  BLIPWORK — 💬 FEEDBACK: WHAT WAS ON THEIR SCREEN
--
--  WHY
--   The first real notes arrived tagged only "play:fn7" and "funfun:q2".
--   `context` names the round, but every question in this app is
--   GENERATED FRESH for that learner on that tap — so "this one is wrong"
--   pointed at a question that no longer existed anywhere by the time she
--   read the note. Nothing could be recovered, not from the seed, not
--   from the row.
--
--   So the note now carries a SNAPSHOT: the text of the question that was
--   actually on the screen when the learner opened the 💬 sheet, captured
--   client-side (js/feedback.js snapshotQuestion) and stored beside the
--   note in one new column.
--
--  ⚠️ ANONYMITY IS UNCHANGED, AND THE SNAPSHOT DOES NOT DENT IT.
--   Anonymity here has always been about what the ROW KEEPS, never about
--   who may post (see the header of migration-feedback-papers.sql). An
--   anonymous note still writes NULL student_id and NULL display_name —
--   there is nothing in it to trace back. A question snapshot is CONTENT,
--   not identity: it is the maths that was on the screen, exactly as
--   `context` is the id of the round. So it is stored for anonymous notes
--   too, on the same reasoning and with the same care — an anonymous
--   "this one renders weird" is unactionable without it, which is the
--   whole reason this column exists.
--
--   The one rule the capture side owes this promise: the snapshot is the
--   QUESTION, never the learner. js/feedback.js reads the question card
--   only, and the app's own chrome (which carries the learner's name,
--   level and gold) is excluded by construction. That rule lives in the
--   client, and verify-feedback-snapshot.html asserts it.
--
--  ⚠️ THE POSTGRES TRAP THIS FILE STEPS AROUND
--   Adding an argument to a function does NOT replace it — it creates an
--   OVERLOAD. `create or replace function mhq_send_feedback(… 6 args)`
--   would leave the old 5-argument function sitting right beside the new
--   one, still granted, still callable, and still silently dropping every
--   snapshot a client sent. So §2 DROPS the exact old signature first.
--   (migration-dice.sql's header records the sibling of this bug: a
--   copy-forward that re-created a function from a stale copy.)
--
--  COPY-FORWARD CHECK, done before writing this file: the newest copy of
--  mhq_send_feedback / mhq_admin_feedback in the repo is
--  migration-feedback-papers.sql's, mirrored byte-for-byte in
--  supabase/schema.sql. No later migration re-creates either one. The
--  bodies below are those, plus the snapshot lines and nothing else.
--
--  ⚠️ mhq_get_state AND mhq_admin_data ARE NOT TOUCHED, as ever.
--
--  Postgres grants EXECUTE to PUBLIC by default on CREATE FUNCTION, so
--  §5's explicit grants are the entire security model for the two
--  functions this file re-creates.
-- ============================================================


-- ============================================================
--  0. DEPENDENCY GUARD — fail loudly here rather than half-way through.
-- ============================================================
do $$
begin
  if to_regclass('public.feedback') is null then
    raise exception 'missing public.feedback — run supabase/migration-feedback-papers.sql first';
  end if;
  if to_regprocedure('public._mhq_auth(text, text)') is null then
    raise exception 'missing public._mhq_auth(text,text) — run supabase/schema.sql first';
  end if;
  if to_regprocedure('public._mhq_admin_ok(text)') is null then
    raise exception 'missing public._mhq_admin_ok(text) — run supabase/schema.sql first';
  end if;
end $$;


-- ============================================================
--  1. THE COLUMN — feedback.snapshot
--
--  The visible text of the question card the learner was looking at when
--  they opened the sheet: stem, prompt, diagram labels, options, and the
--  worked steps if they had already answered. Whitespace-collapsed plain
--  text, no markup — she reads it, nothing re-renders it.
--
--  Nullable, and NULL is an ordinary state, not a fault: a note written
--  on the hub or the chapter map has no question on the screen to snap,
--  and every note already in the table predates this column.
--
--  Not indexed. She reads a note by opening it, and full-text search over
--  a handful of notes a week would be machinery for nothing.
-- ============================================================
alter table public.feedback add column if not exists snapshot text;


-- ============================================================
--  2. DROP THE OLD 5-ARGUMENT mhq_send_feedback.
--
--  ⚠️ This is the whole point of §2 existing as its own step: without it
--  the create below is an OVERLOAD, not a replacement (see this file's
--  header). `if exists` keeps the file re-runnable.
--
--  Dropping and re-creating means the grant is dropped with it — §5 puts
--  it back, mirroring migration-feedback-papers.sql §9 exactly.
-- ============================================================
drop function if exists public.mhq_send_feedback(text, text, text, boolean, text);


-- ============================================================
--  3. mhq_send_feedback — now with p_snapshot, added LAST so the
--     existing five arguments keep their positions.
--
--  p_snapshot is capped, trimmed and nullif-empty'd exactly the way
--  p_context is — the same defensive shape, because it arrives from the
--  same place and a malformed client must never be able to turn a text
--  column into a payload. 2000 characters: the client caps itself at
--  1800 (js/feedback.js SNAPSHOT_MAX), so this is the server's own floor
--  under that rather than a number the client can talk it out of.
--
--  Stored for anonymous notes too — see this file's header.
-- ============================================================
create or replace function public.mhq_send_feedback(p_username text, p_password text,
                                                    p_body text, p_anon boolean,
                                                    p_context text, p_snapshot text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_body text; v_ctx text; v_snap text; v_name text; v_anon boolean;
begin
  -- ALWAYS authenticate, anonymous or not (header: anonymity is about what
  -- the row keeps, never about who may post).
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;

  v_body := nullif(btrim(coalesce(p_body, '')), '');
  if v_body is null then return jsonb_build_object('ok', false, 'error', 'empty'); end if;
  v_body := left(v_body, 1000);

  -- context is optional and content-shaped; cap it so a malformed client
  -- can never turn it into a payload column.
  v_ctx := left(nullif(btrim(coalesce(p_context, '')), ''), 120);

  -- the question that was on the screen. Optional in the same way and for
  -- the same reason — and NULL on the hub, where there is no question.
  v_snap := left(nullif(btrim(coalesce(p_snapshot, '')), ''), 2000);

  v_anon := coalesce(p_anon, false);
  if not v_anon then
    select display_name into v_name from public.students where id = v_sid;
  end if;

  insert into public.feedback (student_id, display_name, context, body, snapshot)
  values (case when v_anon then null else v_sid end,
          case when v_anon then null else v_name end,
          v_ctx, v_body, v_snap);

  update public.students set last_active_at = now() where id = v_sid;
  return jsonb_build_object('ok', true);
end; $$;


-- ============================================================
--  4. mhq_admin_feedback — the teacher's list, now returning `snapshot`.
--
--  Same arity (one argument), so this really is a replace and no drop is
--  needed. Byte-for-byte the copy in migration-feedback-papers.sql §5
--  plus the one new key.
--
--  NULL rides through as JSON null; js/admin.js draws the fold only when
--  there is something in it, so an old note simply has no fold.
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
             'readAt', f.read_at) as r,
           f.created_at as r_created,
           f.read_at    as r_read
      from public.feedback f
     order by f.created_at desc
     limit 500) t;

  return jsonb_build_object('ok', true, 'rows', v_rows, 'unread', v_unread);
end; $$;


-- ============================================================
--  5. GRANTS — the same pattern migration-feedback-papers.sql §9 uses.
--
--  mhq_send_feedback was dropped in §2, so its grant went with it and has
--  to be re-issued against the NEW 6-argument signature.
--  mhq_admin_feedback(text) was only replaced, which keeps its grant —
--  it is named here anyway so this file states the whole posture of both
--  functions it touched rather than relying on what survived.
-- ============================================================
grant execute on function
  public.mhq_send_feedback(text, text, text, boolean, text, text),
  public.mhq_admin_feedback(text)
to anon, authenticated;


-- ============================================================
--  sanity checks after running
-- ============================================================
--   -- the column is there
--   select column_name, data_type from information_schema.columns
--    where table_schema = 'public' and table_name = 'feedback' and column_name = 'snapshot';
--   -- expected: snapshot | text
--
--   -- ⚠️ THE OVERLOAD CHECK — there must be exactly ONE mhq_send_feedback,
--   -- and it must take six arguments.
--   select p.oid::regprocedure as signature, p.pronargs
--     from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--    where n.nspname = 'public' and p.proname = 'mhq_send_feedback';
--   -- expected: ONE row, mhq_send_feedback(text,text,text,boolean,text,text), 6
--   --   (two rows means §2's drop did not match — the old one is still live
--   --    and will keep swallowing snapshots.)
--
--   -- grants survived the drop/create
--   select p.oid::regprocedure as signature,
--          has_function_privilege('anon', p.oid, 'execute')          as anon_can,
--          has_function_privilege('authenticated', p.oid, 'execute') as auth_can
--     from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--    where n.nspname = 'public'
--      and p.proname in ('mhq_send_feedback', 'mhq_admin_feedback');
--   -- expected: anon_can and auth_can true for both
--
--   -- search_path still pinned, still security definer
--   select p.proname, p.prosecdef, p.proconfig
--     from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--    where n.nspname = 'public'
--      and p.proname in ('mhq_send_feedback', 'mhq_admin_feedback');
--   -- expected: prosecdef t, proconfig {search_path=public, extensions}
--
--   -- the table is still unreachable without an RPC
--   select has_table_privilege('anon', 'public.feedback', 'select');
--   -- expected: false
--
--   -- with a REAL throwaway learner (replace someuser/somepassword):
--   select public.mhq_send_feedback('someuser','somepassword','named note',false,
--                                   'play:gt5','Solve for x:  3x + 4 = 19');
--   select public.mhq_send_feedback('someuser','somepassword','anon note',true,
--                                   'play:gt5','Solve for x:  3x + 4 = 19');
--   select student_id is null as sid_null, display_name, context, body, snapshot
--     from public.feedback order by created_at desc limit 2;
--   -- expected: the anon row has sid_null = t AND display_name null, but BOTH
--   --   rows carry context 'play:gt5' and the same snapshot — anonymity is
--   --   about identity, and a question is not a person.
--
--   -- an empty snapshot (the hub case) stores NULL, not ''
--   select public.mhq_send_feedback('someuser','somepassword','hub note',false,'hub','   ');
--   select snapshot is null as snap_null from public.feedback order by created_at desc limit 1;
--   -- expected: t
