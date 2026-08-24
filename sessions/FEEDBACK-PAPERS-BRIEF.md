# Build brief — 💬 Feedback button + 📄 Papers tab (behind login)

```
=== MEGAN'S /go DELEGATION — 2026-08-24 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: build the kids' two requests — a feedback button (named or anonymous,
  "almost like my re:lefela app") and a practice-paper download tab behind login
  ("go ahead and build it") — code + migration FILE + edge function FILES in the
  working tree only.
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===
```

Foreman: Fable (this session ships; you build LOCAL ONLY). Read this whole brief
before touching anything. The repo's PROJECT-STATUS.md top section has today's
context if you need it, but this brief is self-contained.

## What the learners asked for (her words, 2026-08-24)

1. **Feedback**: "when a question is wrong, or renders weird or they pick things up,
   I want a small button at the bottom of the screen where they can type their
   feedback… or if they just want to ask me something… and they should have the
   option to show their name or do it anonymously."
2. **Papers**: "a practice paper tab… all the practice papers we generate and past
   papers that I have, I want a place where they can download it from the app."
   Her decision: papers live BEHIND LOGIN (private Supabase Storage), never in the
   public repo.

## Feature 1 — 💬 Feedback

**Learner UI** (new `js/feedback.js`, small CSS in `css/styles.css`):
- A small fixed 💬 button, bottom-right, visible on every logged-in screen
  (hub, chapter, play, blip, exam — mount it from the app chrome, not per-screen).
  Must not cover the answer/submit controls at 375px — check every screen type.
- Tap → small panel (bottom sheet on phone): textarea (max 1000 chars),
  a plain toggle **"Show my name" (default ON) / "Send anonymously"**, Send button.
  Title: "Send a note to your teacher". Success toast: "Sent 💌". Disable the send
  button before the await (double-submit rule, memory `double-submit-disable-before-await`).
- Auto-attach context: current screen name, and the question/card id if one is on
  screen (e.g. `play:gt5` / `exam:eqn.nor.q3(a)` / `dice:gtrig`). Context rides along
  even when anonymous — the question id is not the person.

**Server** (`supabase/migration-feedback-papers.sql` — FILE ONLY, do not apply):
- Table `feedback`: `id uuid pk default gen_random_uuid()`, `created_at timestamptz
  default now()`, `student_id uuid null references students(id) on delete set null`,
  `display_name text null`, `context text null`, `body text not null` (length-capped
  1000 in the RPC), `read_at timestamptz null`. RLS on, no policies (house posture).
- RPC `mhq_send_feedback(p_user, p_pw, p_body, p_anon, p_context)`: authenticate via
  the existing `_mhq_auth` helper ALWAYS (strangers can't spam); when `p_anon` insert
  NULL student_id + NULL display_name — **anonymity is real: the row stores nothing
  about the sender**. When named, snapshot `display_name` from students.
- Admin RPCs: `mhq_admin_feedback(p_pw)` (list, newest first) and
  `mhq_admin_feedback_read(p_pw, p_id, p_read)` (set/clear read_at). Gate on
  `_mhq_admin_ok` like every admin RPC.
- Follow `supabase/migration-funfun.sql` for the exact grant shape: revoke all from
  public/anon, grant execute on the public RPCs to anon, `set search_path` pinned on
  every function, internals revoked. Update `supabase/schema.sql` mirror.

**Admin** (admin.html + its JS): a new **Feedback** section — each row: name or
"Anonymous", when, context chip, the text, a mark-read tick. Unread count in the
section header.

## Feature 2 — 📄 Papers

**Learner UI**: a new hub tab `📄 Papers` following the Circle Geo tab pattern in
`js/screens.js` (excluded from byTerm(), like `cgeo`). Rows grouped by topic:
title, size, an **Open** button → gets a 60-minute signed URL from the `paper-url`
edge function and `window.open`s it (the phone's PDF viewer/download takes over).

**Server** (same migration file):
- Bucket: `insert into storage.buckets (id, name, public) values ('papers','papers',false)
  on conflict (id) do nothing;` — PRIVATE. No storage.objects policies (anon stays
  sealed out; the edge functions use the service role).
- Table `papers`: `id uuid pk default gen_random_uuid()`, `title text not null`,
  `chapter text null`, `storage_path text not null`, `size_bytes bigint`,
  `sort int default 0`, `created_at timestamptz default now()`. RLS on, no policies.
- RPC `mhq_list_papers(p_user, p_pw)`: auth-gated listing (id, title, chapter,
  size_bytes, created_at, sort).
- RPC `mhq_auth_ok(p_user, p_pw) returns uuid` (student id or null): a thin wrapper
  over `_mhq_auth` for the edge functions. **REVOKE from anon and authenticated —
  service-role only.** Same for a `mhq_admin_ok_rpc(p_pw) returns boolean` wrapper
  if `_mhq_admin_ok` isn't already callable from the edge runtime.

**Edge functions** (FILES ONLY — foreman deploys):
- `supabase/functions/paper-url/index.ts`: POST `{username, password, paper_id}` →
  service client checks `mhq_auth_ok` → looks up the paper row → 
  `storage.from('papers').createSignedUrl(path, 3600)` → `{ok, url}`.
- `supabase/functions/paper-admin/index.ts`: POST `{admin_pw, action, …}` →
  checks admin pw via RPC. Actions: `upload` (`{title, chapter, filename, b64}` →
  service-role upload to `papers/<uuid>-<safe-filename>`, insert row),
  `remove` (`{paper_id}` → delete object + row), `list`.
- Copy `supabase/functions/collect-cq/index.ts` for CORS headers, env access
  (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`), and error shape. Client-side calls
  go through `invokeFn` in `js/supabase.js` exactly like `collectCq`.

**Admin** (admin.html): a **Papers** section — current list with per-row Remove
(confirm first), and an upload form: title, topic dropdown (chapter names from
config + "General"), file input (PDF only) → base64 → `paper-admin` upload.
Feasible size: her papers are ≤ ~5 MB.

## Flags, mirrors, harness

- `js/config.js`: add `FEEDBACK_ENABLED = false` and `PAPERS_ENABLED = false` with a
  short comment each — the foreman flips them at ship (seeded-closed equivalent,
  same as FUNFUN_ENABLED's pattern). All new UI gates on them.
- `js/local-backend.js` (?local=1): mirror `mhq_send_feedback` (store in LS
  `mhq.feedback`), `mhq_admin_feedback*`, and `mhq_list_papers` (return one stub
  row `{title:"Sample paper", chapter:"General"}`); the local paper Open shows a
  toast "Papers need the internet". The offline mirror never fakes a signed URL.
- New `verify-feedback-papers.html` harness: RPC-mirror shape checks against the
  local backend, migration-file text checks (grants present, search_path pinned on
  every new function, bucket private, `mhq_auth_ok` revoked from anon), feedback
  panel mount + anonymous toggle behaviour (anon send stores no identity in the LS
  mirror), papers tab rendering from a stubbed list, 375px scrollWidth checks.
- ⚠️ Local-harness cache trap (PROJECT-STATUS 2026-08-24 decision): before trusting
  any harness on localhost — unregister the service worker + delete CacheStorage +
  `fetch(file, {cache:"reload"})` over every served file, then reload.

## Must NOT touch

- No `git push`, no migration APPLY, no edge-function deploy, no Supabase MCP writes,
  nothing live. Commit LOCALLY with a clear message when green.
- `sw.js` version stays v68 (foreman bumps at ship). Don't add files to SHELL —
  new JS rides the import graph; if you add a standalone stylesheet, note it in your
  report instead of editing sw.js.
- `mhq_get_state` / `mhq_admin_data` stay untouched (the copy-forward danger — see
  migration-funfun.sql's header). New features get their own RPCs.
- `js/funfun/` is generated — never hand-edit.
- No learner names or data anywhere in code, comments, or the harness.

## Report back (your final message)

Files changed/added (paths), harness numbers from a clean-cache run, the exact
foreman ship steps left (flags to flip, migration to apply, functions to deploy,
sw bump), and anything you saw but deliberately didn't touch.
