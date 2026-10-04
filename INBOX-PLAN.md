# 📥 Inbox plan: answering the learners' 💬 notes

Written 2026-10-04 (plan session, nothing built). Build happens in a FRESH session, on her word.

**Audience:** her Gr11 Blipwork class. **Language:** English only (Blipwork is English only).
**Ship target:** sw v95. One migration, applied BEFORE the push.

## What she asked for (her words, 2026-10-04)

"a way to answer my learners' questions in blipwork ... either to type something in a
textbox, and then we add a small inbox icon on their homepage, or if it is a bug they
reported, I can mark it as resolved and the learner gets the message in their inbox that
it is fixed, or if it was a question and I decided to rather answer them on whatsapp with
a video or a picture, then I should be able to mark it as addressed"

This REPLACES her 2026-09-05 ruling ("no reply field"). Still standing from that ruling:
never rebuild the app around one learner. This build is small on purpose.

## Her four rulings (2026-10-04)

1. **Anonymous notes: her tick only.** She can mark them fixed or addressed for her own
   list. Nobody gets an inbox message. No typed reply on an anonymous note. The
   anonymity promise (the row keeps nothing about the sender) stays whole.
2. **"Answered elsewhere" shows a short inbox line** to the learner, so the note does
   not look ignored: `Your teacher answered this one outside the app ✓`
3. **"Bug fixed" sends a ready-made line**, `Fixed! Thanks for spotting it.`, plus
   whatever she typed in the textbox first (optional).
4. **Dot on the icon only.** No push notification in this build. A buzz can be added
   later as its own small piece.

## Mine, flagged (each reversible, her one-line call)

- The inbox shows only notes that HAVE an outcome (replied, fixed, addressed). A note
  still waiting does not appear, so the inbox never becomes a "why haven't you answered"
  list.
- The learner cannot answer back inside the inbox. A follow-up is a new 💬 note.
- One outcome per note. A later action replaces the earlier one (reply, then fixed: the
  note reads as fixed and keeps her typed text as the extra line).
- "Undo" on her side puts the note back to open and clears the reply. The learner's
  inbox line disappears.
- Any new outcome brings the dot back for that learner, even if they saw an earlier one.
- Acting on a note also marks it read on her side.
- The inbox icon sits in the hub head, beside the greeting. It hides itself when there
  is nothing to show AND nothing has ever been answered (so a learner who never sent a
  note never sees an empty inbox). Offline or a failed fetch: hidden, no error.

## How it works

### Database (one new file: `supabase/migration-feedback-inbox.sql`)

Copy-forward base: `migration-feedback-snapshot.sql` is the latest carrier of
`mhq_send_feedback` (6 args) and `mhq_admin_feedback`. `mhq_admin_feedback_read`
lives in `migration-feedback-papers.sql`. Re-check that no later migration re-creates
any of them before writing.

New columns on `public.feedback` (all `add column if not exists`):

| column | type | meaning |
|---|---|---|
| `status` | text, not null, default `'open'`, check in (`open`, `replied`, `fixed`, `addressed`) | where the note stands |
| `reply` | text, nullable | her typed text, capped 1000 server-side |
| `replied_at` | timestamptz, nullable | when the outcome was set |
| `seen_at` | timestamptz, nullable | when the learner opened the inbox after that |

Functions:

- **`mhq_admin_feedback_reply(p_admin_password text, p_id uuid, p_status text, p_reply text)`** (new).
  Admin check first. `p_status` must be one of the four. Rules:
  - `replied` needs non-empty text, else `{ok:false, error:'empty'}`.
  - row with NULL `student_id` (anonymous): `replied` is refused with
    `{ok:false, error:'anon'}`; `fixed` / `addressed` are allowed and store NO reply
    text (nobody can read it).
  - `fixed` / `addressed` on a named row: reply text optional, stored trimmed, NULL when blank.
  - any non-open status: `replied_at = now()`, `seen_at = null`, `read_at = coalesce(read_at, now())`.
  - `open`: clears `reply`, `replied_at`, `seen_at`.
- **`mhq_admin_feedback(text)`**: same arity, so a true replace, no drop. Adds the keys
  `status`, `reply`, `repliedAt`, `seenAt`. Everything else byte-for-byte.
- **`mhq_inbox(p_username text, p_password text)`** (new). `_mhq_auth` first. Returns
  `{ok, unseen, rows:[{id, body, context, createdAt, status, reply, repliedAt, seenAt}]}`
  for rows where `student_id` = the caller AND `status <> 'open'`, newest outcome first,
  limit 50. Never returns `snapshot` (not needed) and never another learner's row.
- **`mhq_inbox_seen(p_username text, p_password text)`** (new). Sets `seen_at = now()`
  on the caller's own rows where `status <> 'open'` and `seen_at is null`.

Laws for the file (all learned the hard way in this repo):
- `security definer`, `set search_path = public, extensions` on every function.
- Explicit `grant execute ... to anon, authenticated` for all four; that IS the security model.
- `public.feedback` stays revoked from anon/authenticated. No table is dropped or
  re-created (a re-create re-runs default grants).
- No argument added to an existing function (that makes an overload, not a replace).
- `mhq_get_state`, `mhq_admin_data` and `mhq_send_feedback` are NOT touched.
- Dependency guard at the top, sanity checks at the bottom, same shape as the snapshot migration.
- Mirror the result into `supabase/schema.sql`.

Ship order: migration first, then push. Applied early it is harmless (additive
columns, extra keys the old client ignores).

### Client plumbing

- `js/supabase.js`, `js/local-backend.js` (mirror on the `mhq.feedback` localStorage
  rows, same rules as the SQL), and the doc block in `js/api.js`:
  `adminFeedbackReply(pw, id, status, reply)`, `inbox(u, p)`, `inboxSeen(u, p)`.

### Her admin page (`js/admin.js`, `feedbackSection`)

Per note, under the body:
- a status chip: nothing for open, then `Replied`, `Fixed`, `Answered elsewhere`,
  and a small `seen ✓` once the learner has opened it;
- named notes: a small textbox + **Send reply**, **Bug fixed**, **Answered elsewhere**;
- anonymous notes: only **Bug fixed** and **Answered elsewhere**, with one quiet line:
  "Anonymous, so no message can be sent. This tick is for your own list.";
- once an outcome is set: her text shown back, plus **Undo**.

House rules: `textContent` for anything a person typed, disable the button BEFORE the
await, refresh the list after. "Mark read" stays as it is.

### The learner's side (new `js/inbox.js`, called from the hub in `js/screens.js`)

- 📥 icon in `.hub-head`, with a dot and count when `unseen > 0`. Fills itself in after
  the hub renders (its own call, the hub never waits on it), gated on `FEEDBACK_ENABLED`.
- Tap: bottom sheet in the existing `.modal-scrim` / `.modal` idiom. Title "Inbox".
  Each item: the learner's own note (short, their words), then the outcome:
  - replied: her text;
  - fixed: `Fixed! Thanks for spotting it.` and her extra text under it, if any;
  - addressed: `Your teacher answered this one outside the app ✓`, and her text if any.
- Opening the sheet calls `inboxSeen` and clears the dot.
- Her text and the learner's text both go in with `textContent`.
- The sheet is appended to `<body>`, outside `#app .view`, so the feedback snapshot
  cannot pick it up. `.hub-head` is already stripped from snapshots. Check both in the
  verify page.
- Any new import goes through the existing loaders' rules; a plain static import from
  `screens.js` is fine (small file, hub only).

## Build queue (fresh session, Fable foreman, ONE unit per Opus worker, one at a time)

| # | Unit | Files | Done when |
|---|---|---|---|
| 1 | Backend | `migration-feedback-inbox.sql` (WRITTEN, NOT RUN), `schema.sql` mirror, `supabase.js`, `local-backend.js`, `api.js` doc, new `verify-inbox.html` data checks | verify-inbox green on `?local=1`: every status rule, anon refusal, unseen count, seen clears, learner B never sees learner A's rows |
| 2 | Admin page | `js/admin.js`, admin CSS | the four actions + Undo work on local backend; anonymous rows show two buttons only; verify-inbox gains the admin rows |
| 3 | Learner inbox | `js/inbox.js`, `js/screens.js`, `css/styles.css` | icon, dot, sheet, seen-on-open at 375 px; hidden when empty; snapshot stays clean |

Workers do NOT bump `sw.js` and do NOT touch the live database. Why Opus for all
three: new schema plus learner-facing wording.

Foreman, between and after:
- review each unit by eye before the next (Playwright at 375 px, not the Browser pane);
- apply the migration through the Supabase MCP on her word, run its sanity checks,
  smoke-test with a throwaway learner that is deleted afterwards (never handle her
  admin password: test the auth rejection and the rows the function writes);
- at ship, on her word: bump CACHE to v95, `python tools/sw_check.py` must print OK,
  push, confirm live.

**Rough cost:** three Opus workers at about 250k tokens each, about 0.75M in total.
For scale, the eight-worker calculator night came to about 3% of the weekly limit, so
this is around 1%.

## After the ship (pending on her, for the status file)

- 📱 3 min: admin page, reply to one note, then open Blipwork as that test learner and
  check the 📥 dot and the message.
- The one unread note from 3 Oct is a natural first reply.
