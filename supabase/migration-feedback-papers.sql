-- ============================================================
--  ⚠️ WRITTEN, NOT RUN. Nothing in this file has touched the live
--  database. The build session for FEEDBACK-PAPERS-BRIEF.md
--  (2026-08-24) wrote it; the FOREMAN applies it via MCP after
--  review. It is safe to apply BEFORE the client ships: nothing
--  calls any of these RPCs until js/config.js's FEEDBACK_ENABLED /
--  PAPERS_ENABLED are true, so the seeded-closed equivalent here is
--  simply "no caller yet".
--
--  BLIPWORK — 💬 FEEDBACK + 📄 PAPERS  (the two things the learners asked
--  for, 2026-08-24)
--
--  WHAT THIS IS
--   1. FEEDBACK. A small 💬 button on every logged-in screen. A learner
--      types a note — "this question renders weird", "I don't get q4" —
--      and sends it NAMED (default) or ANONYMOUSLY. It lands in one
--      table she reads in admin.html.
--
--      ⚠️ ANONYMITY IS REAL, not a display flag. An anonymous row stores
--      NULL student_id and NULL display_name — there is nothing in the
--      row to trace back, not for her, not for anyone with the service
--      key, not for a future migration that "just adds a join". That is
--      the whole point of offering the choice; a hidden sender id would
--      be a lie told to a child. `context` (the screen + question id)
--      rides along either way — a question id is not a person.
--
--      Everyone still AUTHENTICATES (p_username/p_password, the same
--      _mhq_auth every other RPC uses) — anonymous means "the row keeps
--      no identity", not "a stranger can post". Without that a scraped
--      publishable key is a spam firehose into her inbox.
--
--   2. PAPERS. Practice papers + past papers, downloadable from the app,
--      BEHIND LOGIN. Her decision: the PDFs live in a PRIVATE Supabase
--      Storage bucket, never in the public repo (this repo is public and
--      several of these papers are not hers to publish).
--
--      The bucket has NO storage.objects policies at all, so anon and
--      authenticated cannot read a single byte of it. Every actual file
--      transfer goes through an EDGE FUNCTION holding the service role:
--        · supabase/functions/paper-url/index.ts   — learner: one 60-min
--          signed URL for one paper, after checking their password.
--        · supabase/functions/paper-admin/index.ts — teacher: upload,
--          remove, list, after checking the admin password.
--      Both are FILES ONLY — the foreman deploys them.
--
--  THE TWO SERVICE-ROLE WRAPPERS (§7 below)
--  An Edge Function cannot call _mhq_auth / _mhq_admin_ok: both are
--  revoked from PUBLIC, and service_role inherits PUBLIC's grants, so it
--  has no execute on either. Rather than loosen those two (they are the
--  floor everything else stands on), this file adds two thin wrappers
--  that are granted to service_role and NOTHING else — the same shape
--  migration-cq-bridge.sql uses for mhq_cq_link / mhq_credit_cq.
--
--  ⚠️ mhq_get_state AND mhq_admin_data ARE NOT TOUCHED. Both have been
--  re-created by migration after migration and migration-dice.sql's
--  header records a real copy-forward bug found that way. Feedback and
--  Papers get their own RPCs, exactly as Fun Functions and the dice did.
--
--  Postgres grants EXECUTE to PUBLIC by default on CREATE FUNCTION, so
--  the explicit revoke/grant block at the bottom is the entire security
--  model for these functions — the lesson migration-ship-fixes.sql
--  learned the hard way once.
-- ============================================================


-- ============================================================
--  0. DEPENDENCY GUARD — this migration builds on two functions that
--     must already be on live. Fail loudly here rather than half-way
--     through, or (worse) leave a function that only errors the first
--     time a learner presses Send.
-- ============================================================
do $$
begin
  if to_regprocedure('public._mhq_auth(text, text)') is null then
    raise exception 'missing public._mhq_auth(text,text) — run supabase/schema.sql first';
  end if;
  if to_regprocedure('public._mhq_admin_ok(text)') is null then
    raise exception 'missing public._mhq_admin_ok(text) — run supabase/schema.sql first';
  end if;
end $$;


-- ============================================================
--  1. TABLE — feedback
--
--  student_id is `on delete set null`, NOT cascade: removing a learner
--  from the roster (end of year, moved school) must not silently delete
--  the notes they wrote. The note survives, anonymised — which is the
--  same end state an anonymous send starts in, so nothing new leaks.
--
--  display_name is a SNAPSHOT, not a join. She reads these weeks later,
--  by which time the roster may have been re-seeded; the name shown must
--  be the name that was on the account when the note was written. It is
--  also what keeps the anonymous case honest — there is no name to look
--  up, because there is no id either.
--
--  `context` is the screen + question/card id the learner was on
--  ("play:gt5", "exam:eqn.nor.q3(a)", "dice:gtrig", "hub"). Content
--  shape only, never anything about the person.
--
--  read_at doubles as the read flag and the "when did I deal with this"
--  stamp — one nullable column instead of a boolean plus a timestamp
--  that could disagree.
-- ============================================================
create table if not exists public.feedback (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  -- NULL for an anonymous note, and NULL for a note whose author has
  -- since been removed from the roster. Both are the same row shape.
  student_id   uuid references public.students(id) on delete set null,
  display_name text,                       -- snapshot at send time; NULL when anonymous
  context      text,                       -- "play:gt5" / "exam:…" / "hub" — never a person
  body         text not null,              -- capped at 1000 chars by the RPC below
  read_at      timestamptz
);
-- she reads newest-first, and the unread count is the section header
create index if not exists feedback_created_idx on public.feedback (created_at desc);

alter table public.feedback enable row level security;
revoke all on public.feedback from anon, authenticated;


-- ============================================================
--  2. TABLE — papers
--
--  A row per downloadable PDF. `storage_path` is the object key inside
--  the private `papers` bucket — the edge functions are the only things
--  that ever resolve it into bytes.
--
--  `chapter` is a free-text topic label (a chapter id from js/config.js,
--  or "General"), deliberately NOT a foreign key: she will file past
--  papers under groupings that are not blipwork chapters, and a
--  constraint here would only ever block her at 10pm.
-- ============================================================
create table if not exists public.papers (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  chapter      text,                       -- topic grouping; NULL/'General' both fine
  storage_path text not null,              -- key inside the PRIVATE `papers` bucket
  size_bytes   bigint,
  sort         int not null default 0,
  created_at   timestamptz not null default now()
);
create index if not exists papers_sort_idx on public.papers (chapter, sort, created_at);

alter table public.papers enable row level security;
revoke all on public.papers from anon, authenticated;

-- The two edge functions read and write this table with the SERVICE ROLE.
-- service_role bypasses RLS, but it still needs ordinary table privileges,
-- and those come from Supabase's ALTER DEFAULT PRIVILEGES — a project-level
-- setting this file has no business relying on silently. Say it out loud so
-- paper-admin cannot break years from now because a default changed.
grant select, insert, delete on public.papers to service_role;


-- ============================================================
--  3. THE BUCKET — private, and it stays private.
--
--  public = false means no anonymous URL of any kind resolves; the only
--  way to a byte is a signed URL minted by something holding the service
--  role (paper-url, 60 minutes). NO storage.objects policies are created
--  here on purpose — a policy is how anon would get in, and anon must
--  never get in.
--
--  on conflict do nothing so this migration is re-runnable. ⚠️ It will
--  NOT flip an existing bucket back to private — if 'papers' somehow
--  already exists as a PUBLIC bucket, this line leaves it public. The
--  sanity check at the bottom of this file is what catches that.
-- ============================================================
insert into storage.buckets (id, name, public)
values ('papers', 'papers', false)
on conflict (id) do nothing;


-- ============================================================
--  4. mhq_send_feedback — the learner's Send button.
--
--  p_anon true  -> student_id NULL, display_name NULL. Nothing about
--                  the sender is written. See this file's header.
--  p_anon false -> display_name snapshotted from students.display_name.
--
--  The body is trimmed and hard-capped at 1000 characters server-side
--  (the textarea's maxlength is a courtesy, not a control). An empty
--  body after trimming is refused rather than stored as a blank row.
-- ============================================================
create or replace function public.mhq_send_feedback(p_username text, p_password text,
                                                    p_body text, p_anon boolean,
                                                    p_context text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_body text; v_ctx text; v_name text; v_anon boolean;
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

  v_anon := coalesce(p_anon, false);
  if not v_anon then
    select display_name into v_name from public.students where id = v_sid;
  end if;

  insert into public.feedback (student_id, display_name, context, body)
  values (case when v_anon then null else v_sid end,
          case when v_anon then null else v_name end,
          v_ctx, v_body);

  update public.students set last_active_at = now() where id = v_sid;
  return jsonb_build_object('ok', true);
end; $$;


-- ============================================================
--  5. mhq_admin_feedback — the teacher's list, newest first.
--
--  Returns `name` as the literal string 'Anonymous' when display_name is
--  null, so the client never has to decide what an empty name means (and
--  cannot accidentally render a blank row as if someone were nameless).
--  `unread` is counted here rather than in JS — the header chip and the
--  rows can then never disagree.
--
--  Capped at 500 rows. She will never scroll past that, and an uncapped
--  list would eventually make the dashboard load slowly for no gain.
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
--  6. mhq_admin_feedback_read — tick / untick one note.
--     p_read true stamps now(), false clears it back to unread.
--     Idempotent; an unknown id is a quiet no-op rather than an error
--     (she may have two admin tabs open on the same list).
-- ============================================================
create or replace function public.mhq_admin_feedback_read(p_admin_password text,
                                                          p_id uuid, p_read boolean)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then
    return jsonb_build_object('ok', false, 'error', 'auth');
  end if;
  update public.feedback
     set read_at = case when coalesce(p_read, true) then now() else null end
   where id = p_id;
  return jsonb_build_object('ok', true);
end; $$;


-- ============================================================
--  7. mhq_list_papers — the learner's 📄 Papers tab.
--
--  Auth-gated: the LIST of papers is itself behind login, not just the
--  files. storage_path is deliberately NOT in the payload — the client
--  has no use for it and it is the one field that would make a leaked
--  response worth anything.
--
--  Ordered the way the tab groups them: chapter, then her `sort`, then
--  newest-uploaded last.
-- ============================================================
create or replace function public.mhq_list_papers(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_rows jsonb;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  update public.students set last_active_at = now() where id = v_sid;

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', p.id, 'title', p.title,
           'chapter', coalesce(p.chapter, 'General'),
           'sizeBytes', p.size_bytes, 'sort', p.sort,
           'createdAt', p.created_at)
         order by coalesce(p.chapter, 'General'), p.sort, p.created_at), '[]'::jsonb)
    into v_rows from public.papers p;

  return jsonb_build_object('ok', true, 'papers', v_rows);
end; $$;


-- ============================================================
--  8. THE TWO SERVICE-ROLE WRAPPERS (see this file's header).
--
--  Neither is reachable from the browser: both are revoked from PUBLIC,
--  anon and authenticated, and granted to service_role alone. The edge
--  functions are the only callers that exist.
--
--  mhq_auth_ok returns the student id (or NULL) rather than a boolean —
--  paper-url does not currently need the id, but a "who asked for this"
--  question is one audit request away and a boolean cannot answer it.
-- ============================================================
create or replace function public.mhq_auth_ok(p_username text, p_password text)
returns uuid language sql stable security definer set search_path = public, extensions as $$
  select public._mhq_auth(p_username, p_password);
$$;

create or replace function public.mhq_admin_ok_rpc(p_admin_password text)
returns boolean language sql stable security definer set search_path = public, extensions as $$
  select public._mhq_admin_ok(p_admin_password);
$$;


-- ============================================================
--  9. GRANTS
--     · the four learner/teacher RPCs -> anon, authenticated (the two
--       admin ones too: admin.html signs in with the publishable key and
--       a password, exactly like mhq_admin_data).
--     · the two wrappers -> service_role ONLY, revoked from PUBLIC as
--       well as anon/authenticated. A publishable-key caller must get a
--       permission error, not a uuid.
-- ============================================================
grant execute on function
  public.mhq_send_feedback(text, text, text, boolean, text),
  public.mhq_admin_feedback(text),
  public.mhq_admin_feedback_read(text, uuid, boolean),
  public.mhq_list_papers(text, text)
to anon, authenticated;

revoke execute on function public.mhq_auth_ok(text, text) from public, anon, authenticated;
grant  execute on function public.mhq_auth_ok(text, text) to service_role;

revoke execute on function public.mhq_admin_ok_rpc(text) from public, anon, authenticated;
grant  execute on function public.mhq_admin_ok_rpc(text) to service_role;


-- ============================================================
--  sanity checks after running
-- ============================================================
--   select * from public.feedback limit 5;
--   select * from public.papers   limit 5;
--   -- expected: both empty until the first note / first upload.
--
--   -- ⚠️ THE BUCKET MUST BE PRIVATE
--   select id, public from storage.buckets where id = 'papers';
--   -- expected: papers | f      (if it says t, the bucket pre-existed as
--   --   public and §3's `on conflict do nothing` left it alone — fix with
--   --   update storage.buckets set public = false where id = 'papers';)
--
--   -- and it must have NO policies of its own
--   select count(*) from pg_policies
--    where schemaname = 'storage' and tablename = 'objects'
--      and qual like '%papers%';
--   -- expected: 0
--
--   select public.mhq_send_feedback('someusername','wrongpassword','hi',false,'hub');
--   select public.mhq_list_papers('someusername','wrongpassword');
--   select public.mhq_admin_feedback('wrongpassword');
--   select public.mhq_admin_feedback_read('wrongpassword', gen_random_uuid(), true);
--   -- expected, all four: {"ok": false, "error": "auth"}
--
--   -- with a REAL throwaway learner (replace someuser/somepassword):
--   select public.mhq_send_feedback('someuser','somepassword','   ',false,'hub');
--   -- expected: {"ok": false, "error": "empty"}
--   select public.mhq_send_feedback('someuser','somepassword','named note',false,'play:gt5');
--   select public.mhq_send_feedback('someuser','somepassword','anon note',true ,'play:gt5');
--   select student_id is null as sid_null, display_name, context, body
--     from public.feedback order by created_at desc limit 2;
--   -- expected: the anon row has sid_null = t AND display_name null, but
--   --   context 'play:gt5' — anonymity is real, context still rides along.
--
--   -- grants: the two wrappers must NOT be executable by anon
--   select p.proname,
--          has_function_privilege('anon', p.oid, 'execute')         as anon_can,
--          has_function_privilege('service_role', p.oid, 'execute') as svc_can
--     from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--    where n.nspname = 'public'
--      and p.proname in ('mhq_auth_ok','mhq_admin_ok_rpc',
--                        'mhq_send_feedback','mhq_admin_feedback',
--                        'mhq_admin_feedback_read','mhq_list_papers')
--    order by p.proname;
--   -- expected: mhq_auth_ok / mhq_admin_ok_rpc -> anon_can false, svc_can true
--   --           the other four                 -> anon_can true
--
--   -- tables are unreachable without an RPC
--   select has_table_privilege('anon', 'public.feedback', 'select'),
--          has_table_privilege('anon', 'public.papers',   'select');
--   -- expected: false, false
