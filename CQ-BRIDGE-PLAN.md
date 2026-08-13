# CQ-BRIDGE-PLAN — Circle Quest inside Blipwork
*Planned 2026-08-13 (Fable + Megan, discussion session). Nothing here is built
yet — her word: the roster login waits for a build day.*

## What this is

After the class finishes circle geometry, the Grade 11s move to Blipwork for the
rest of the term + year revision. Three connected pieces:

1. **Blipwork's login becomes the Circle Quest kind** — scroll to your name,
   set a password the first time, log in from there.
2. **A Circle Geo tab inside Blipwork** that opens Circle Quest (which stays
   its own app — no merge, no iframe).
3. **An ongoing XP → diamonds bridge**: everything a learner ever earns in
   Circle Quest — past rounds, replays, and any rounds added in the future —
   converts into Blipwork diamonds, paid as "the difference since last time".

## Her rulings (2026-08-13)

- **Name-picker login is safe for this group** — her words: "For this specific
  group, I've had no issues with that." Blipwork drops self-signup and adopts
  the CQ flow. This is also what makes account mapping automatic: both apps
  get seeded from the same class roster.
- **Circle Quest stays a separate app**, reached by a tab. Never merged,
  never embedded.
- **CQ earnings arrive as DIAMONDS ONLY, never Blipwork XP.** Blipwork XP
  levels the Blip and fires milestone boxes at 10/20/30/40 — foreign XP would
  wreck that pacing and shower boxes. Diamonds are spending money; they can't
  break anything. (Implementation fact: "diamonds" = the `students.gold`
  column, displayed as 💎. No game logic keys off gold, so crediting it has
  no side effects.)
- **The transfer is ongoing, not once-off** — delta/watermark design below.

## Why the timing is perfect

**No learner has Blipwork yet.** The only rows in `students` are test
accounts. So the login flow can be replaced wholesale with nothing to
migrate, no one locked out, no announcement needed. This gets harder the
moment real kids sign up — do Part 1 before anyone is invited.

---

## Part 1 — Roster login (CQ-style)

### The trick that keeps this small
Blipwork's ~20 RPCs all authenticate as `(username, password)` via
`_mhq_auth`. **None of that changes.** The roster seed gives every learner a
row with a pre-filled `username` (slug of their name), their `display_name`,
and `password = NULL`. The login screen becomes CQ's picker; once a learner
picks their name, the client uses the username behind it for every call,
exactly as today. Sessions, sync, admin — all untouched.

### New pieces
- **`mhq_list_students()`** — returns `display_name` + `has_password` for the
  picker, nothing else (mirror of CQ's `listStudents`; grant to anon like
  CQ's — it is the one deliberately public read).
- **`mhq_first_login(p_name, p_password)`** — sets the password only if the
  row's password is NULL (mirror of `cgg_first_login`). Also serves the
  after-teacher-reset path: admin reset already clears the password, so the
  learner just looks like "new" again and sets a fresh one. The separate
  set-password prompt in the old flow retires with signup.
- **`students.cq_name text unique`** — the learner's display name in CIRCLE
  QUEST's roster, set at seed time. This IS the account mapping; the bridge
  joins on it. Nullable (a learner who never played CQ simply has no link).
  New column on `students` needs NO grant — the table is revoke-all,
  RPC-only.
- **Kill self-signup**: drop/disable `mhq_signup` and remove the Sign-up UI.
  Stray self-made accounts are what would break the automatic mapping.
  Mid-year arrivals get added by admin (small `mhq_admin_add_student`,
  admin-password-gated, same pattern as the other admin RPCs).
- **Login UI**: port CQ's `js/auth.js` picker (search box, name list, "new"
  tag, set-vs-enter password) into Blipwork's login screen, restyled to the
  Solo Leveling theme. English only.
- **Local backend** (`js/local-backend.js`) mirrors `listStudents` /
  `firstLogin` so `?local=1` testing still works. verify-store gains a
  section: picker lists seeded names, first login sets password once, second
  attempt with wrong password refused, `mhq_signup` really gone.

### Privacy (both repos are PUBLIC)
- Real names go in the DATABASE only, seeded via MCP. The committed file is a
  placeholder template; the gitignore already has a
  `supabase/seed-private-real.sql` entry — use exactly that name for the real
  roster file. **⚠️ The currently tracked `supabase/seed-private.sql` is NOT
  ignored — check it carries no real names before this plan's first commit,
  and never put the roster in it.**
- The roster seed writes BOTH columns per learner: Blipwork `display_name`
  (can be first name + initial) and `cq_name` (must match the CQ roster
  spelling EXACTLY — copy it out of CQ's students table via MCP, don't
  retype).

### ✅ Her rulings on the test accounts (2026-08-13)
- **The existing test accounts are HIDDEN from the picker, not deleted** —
  they keep their rows and stay reachable if ever needed (e.g. an
  `mhq_list_students` that skips rows flagged `hidden`, or simply rows
  with no `cq_name`; build session picks the cleaner mechanism).
- **The two adult test accounts in Circle Quest do NOT move to Blipwork** —
  they are excluded from the roster seed entirely. ⚠️ Build session: confirm
  the two names against CQ's `students` table via MCP; they are deliberately
  not written in this file (public repo).

---

## Part 2 — The Circle Geo tab

- A third tab on the hub beside **Term 3 | Revision**: **⭕ Circle Geo**.
  (The hub is where quests live; the room stays clean.)
- The tab is one card: Circle Quest branding, an **"Open Circle Quest"**
  button (plain link to https://megzieberr.github.io/circle-geo-quest/ —
  the learner logs in there with their CQ password as always), and the
  **Collect** panel from Part 3.
- If the learner has no `cq_name` link, the card just shows the open button —
  no broken collect UI.
- No service-worker implications beyond the usual bump; no CQ changes.

---

## Part 3 — The XP → diamonds bridge

### The core idea: pay the difference, never the total
Each Blipwork student row carries a watermark: `cq_xp_credited int default 0`
— "how much of their CQ XP has already been turned into diamonds". On every
collect:

```
cq_total   = sum of that learner's CQ xp_events           (always current)
delta      = cq_total − cq_xp_credited
diamonds   = floor(delta / RATE)
advance watermark by diamonds × RATE     -- remainder carries to next time
```

- **Replays in CQ?** Total rises → paid. **New CQ rounds/chapters (Dynamic
  Geometry and beyond)?** Total rises → paid. Forever, zero per-chapter wiring.
- **Double-pay impossible**: the watermark only moves forward, and the
  crediting runs row-locked (`for update` — the double-submit lesson).
- Advancing by `diamonds × RATE` (not to `cq_total`) means leftover XP below
  one diamond is never lost, just banked for next collect.
- CQ's own totals are already replay-honest (half-rate paid replays etc.), so
  the bridge inherits all of CQ's economy rules for free.

### Where it runs
A **Supabase Edge Function in the BLIPWORK project** (`functions/` already
exists there for push — follow its patterns). It holds the **CQ project's
service-role key as a function secret** (CQ ref `vlelxvhlyydwxnhbijco`;
Blipwork ref `pjpwhalcifywjrwtjknd`).

Flow per collect:
1. Client calls the function with the learner's Blipwork username+password
   (same credential style as every existing RPC call).
2. Function verifies them and reads `cq_name` + watermark via an internal RPC.
3. Function queries CQ's REST API (service key): students → xp_events sum,
   joined on `display_name = cq_name`.
4. Function calls **`mhq_credit_cq(p_student_id, p_cq_total)`** — a SECURITY
   DEFINER RPC granted to **service_role ONLY** (⚠️ never anon — a
   client-callable version would let anyone mint diamonds). That RPC does the
   locked delta maths above and returns diamonds paid + new balance.
5. CQ is never written to. If CQ is unreachable, collect fails soft
   ("couldn't reach Circle Quest — try again later"), nothing changes.

`RATE` lives in Blipwork's `app_config`, so retuning is one SQL update, no
deploy.

### The Collect moment (the fun part)
On the Circle Geo tab: a **"💎 Collect"** button. Tap → short sparkle reveal →
"+34 💎 from your circle geometry work!" (or "Nothing new to collect — go play
a round!"). Button disabled while the call is in flight (disable-before-await,
the known double-submit rule). This replaces any scheduled background job —
the plumbing becomes a visible reward, and there is no cron to maintain.

### Open questions for Megan (Part 3)
- **The RATE.** Before picking, pull the class's real CQ totals via MCP and
  choose so a term of honest CQ work buys something satisfying (say, a
  mid-tier item or two, 100–300 💎) without flooding the economy. Placeholder
  thinking: 10 XP = 1 💎 — but decide from the real numbers, not this guess.
- Whether the reveal should also name where the XP came from ("3 new rounds
  played") — costs an extra CQ query, purely cosmetic.

---

## Deliberately NOT doing
- No Blipwork XP from CQ (ruling above).
- No iframe/merge — CQ untouched, zero commits to that repo.
- No scheduled sync job — Collect covers it; a cron can be added later
  without redesign if she ever wants passive syncing.
- No copying of passwords between apps (impossible — both store bcrypt — and
  unnecessary; kids keep one password per app, set on first login).

## Build shape (three sessions, each independently shippable, in this order)
1. **Roster login** — migration (columns + new RPCs + signup removal) +
   picker UI + local-backend mirror + verify-store + seed via MCP. Ship-gated
   on her word; MUST land before learners are invited.
2. **Circle Geo tab** — hub tab + card + open link. Trivial; can ride along
   with session 1's ship.
3. **Bridge** — `cq_xp_credited` + `mhq_credit_cq` + edge function + Collect
   UI + RATE config. Needs the CQ service key set as a function secret (MCP
   deploy). Smoke-test with a throwaway learner on BOTH sides, deleted after;
   learner-row hashes verified byte-identical apart from the throwaway.

Standard ship discipline throughout: migrations via MCP with before/after
hashes, sw bump once per ship, verify-store green, no learner names in any
committed file.
