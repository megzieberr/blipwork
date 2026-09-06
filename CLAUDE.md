# Maths Quest — Grade 11 homework hub — instructions for Claude

## Who you're working with (READ THIS FIRST)

The owner of this project is **not a professional developer**. She built this
app with AI help and wants to genuinely understand how it works, but she does
not have a programming background. Past sessions that assumed expert knowledge
caused real stress. Your job is to be a patient guide, not a terse colleague.

### How to communicate — always

1. **Plain English first.** Explain what you're doing and why in everyday
   language BEFORE showing any code or commands. Lead with the "so what."
2. **Define every technical term the first time you use it.** Don't say
   "I'll refactor the API client to memoize responses." Say "I'll reorganize
   the code that talks to the movie database (the 'API client') so it
   remembers answers it already fetched ('memoize' = remember) instead of
   asking twice."
3. **Use analogies for concepts.** A database is a filing cabinet, an API is
   a waiter taking orders to the kitchen, a cache is a notepad by the phone,
   an environment variable is a sticky note with a secret on it that never
   gets photocopied.
4. **Never assume knowledge.** No "just," "simply," "obviously," or "as you
   know." If a step requires her to do something (open a terminal, click
   something in Netlify/Supabase), spell out exactly where to click.
5. **Small doses.** Explain one idea at a time. After a big change, give a
   3–5 sentence plain-English summary of what changed and what she would
   notice in the app — not a wall of file names.
6. **It's her app.** When you make a decision (a library, a pattern, a
   trade-off), say what you chose and why in one friendly sentence, like
   you're explaining it to a smart friend who works in a different field.
7. **Reassure, don't alarm.** If something breaks, open with what it means
   for her ("nothing is lost, the app just can't reach the database right
   now") before the technical diagnosis.
8. **Check understanding at natural pauses**, e.g. "Want me to go deeper on
   how the scorer works, or is that enough detail?"

### Things she may ask for by name

- `/explain <anything>` — she can run this skill to get a plain-English tour
  of any file, folder, error message, or concept in this project.

## What this project is (plain English)

Maths Quest is the **homework app for her Grade 11 maths class** — a quick,
game-like "recap" tool her learners install on their phones like a normal app
(a PWA). Learners pick their own name off the class roster she seeds, set a
password the first time, then play short question rounds ("quests") on the
chapters she has opened, and get hints, worked solutions and concept cards
only when they're stuck. She runs the class from an admin page: opening and
closing quests, watching who's struggling with which concept, and resetting
forgotten passwords. Twelve chapters live in the hub (five on the Term 3 tab,
seven on Revision), plus two more that exist only inside Exam Focus
(Euclidean Geometry, Algebraic Expressions) and own no hub quests.

## Technical map (for you, Claude — translate when discussing)

- **Frontend**: a static site of plain-JavaScript ES modules — **no build
  step, no npm, no node_modules**. Entry `index.html` (learner app) and
  `admin.html` (teacher dashboard). App code lives in `js/`:
  - `js/quests/` — one file per quest (`quest01…`, `questf1…`, `questag1…`
    etc.), plus per-chapter builders (`_func.js`, `_trig.js`, …) and shared
    helpers (`_shared.js`, home of `mc()`). Registered in `js/quests/index.js`.
  - `js/engine/` — 10 "accuracy-critical" diagram engines (stats graphs,
    timelines, Venn, trees, triangles, solids, function/trig/analytical
    graphs, pattern pyramids). Each has a `verify()` that proves the drawing
    is to scale and honest.
  - Per-chapter maths libraries (`statlib.js`, `finlib.js`, `problib.js`,
    `triglib.js`, `measlib.js`, `funclib.js`, `tgraphlib.js`,
    `analyticslib.js`, `patternlib.js`) — every answer key is computed here,
    never hand-typed.
  - `js/config.js` — chapter list, tabs (Term 3 / Revision), per-chapter
    colour families. `js/concepts.js` — the "I'm lost" concept cards.
  - `js/calculator.js` — the in-app Casio fx-991ZA Plus II simulator.
- **Data storage**: Supabase (a hosted database with login features).
  Everything goes through `SECURITY DEFINER` RPC functions defined in
  `supabase/schema.sql`; row-level security is on with no policies, so the
  public key can only call those functions. Learners log in off a
  teacher-seeded roster (name picker, no sign-up, since 2026-08-21);
  passwords are **bcrypt-hashed server-side** (the teacher can only reset,
  never read).
- **Local mode**: with no Supabase reachable, or with `?local=1` on the URL
  (which sticks via localStorage key `mhq.forceLocal` — note: a comment in
  `supabase-config.js` says `cgg.forceLocal`, that's wrong), the app uses
  `js/local-backend.js` with demo data and all quests open. Local and cloud
  data never mix.
- **Secrets**: `js/supabase-config.js` holds the project URL + *publishable*
  key — that one is public-safe and committed on purpose. The secret /
  service-role key must NEVER appear in the repo. The admin password is set
  by running `supabase/seed-private.sql` in the Supabase SQL editor (the
  committed file is a template; a real-values variant `seed-private-real.sql`
  is gitignored).
- **Deploy target 1 — the app**: GitHub Pages, served straight from the
  `main` branch (`.nojekyll` keeps every file as-is). **Pushing to `main` IS
  the deploy** — no workflow, no build. Live at
  https://megzieberr.github.io/blipwork/ (repo renamed from `maths-homework-quest`
  2026-07-19; the old Pages URL 404s — it does NOT redirect)
- **Deploy target 2 — the database**: pushing code does NOT touch Supabase.
  Schema changes ship as an additive `supabase/migration-*.sql` file that
  must be **pasted into the Supabase SQL editor by hand**.
- **Service worker**: `sw.js`. Read the version out of the file rather than
  trusting this line (it was stale at v25 while the repo shipped v37). Since
  2026-09-06 app code (`.js`, `.css`) is **cache-first** inside the versioned
  cache: each stored copy carries the time it was stored (an `x-sw-cached-at`
  header) and is served straight from the cache for up to 7 days, after which
  it is fetched network-first with the stale copy as the offline fallback.
  Page navigations, any `.html` and `js/app.js` stay network-first, images
  stay cache-first, and a URL carrying `?retry=` (js/lazy.js's second attempt)
  goes network-first and is stored under its plain URL. **Bump `CACHE` on
  every shippable change**, and run `python tools/sw_check.py` before pushing:
  it prints OK only when nothing under `js/` or `css/` has changed since the
  last bump.
- **Local dev**: `python -m http.server 5191` in the repo root, then open
  http://localhost:5191/ — port **5191**. No install step.
- **Testing**: 10 `verify-*.html` pages (open in a browser, or drive
  headlessly) fuzz every engine and quest generator; all must PASS before
  shipping. Quest modules can also be imported headlessly in node for
  fuzzing.
- **Session hand-off**: `PROJECT-STATUS.md` — read it at session start,
  update it before ending a session that changed anything. Since the
  2026-08-30 audit it is a SHORT head only; the full session-by-session
  history lives verbatim in `STATUS-ARCHIVE.md` (append-only — when a
  head entry stops being current, move it to the archive's top, never
  delete it). Keep the head under a few hundred lines.
- **Sibling repo**: `maths-quest-grade7` ("Wiskunde Avontuur", cloned at
  /workspace/maths-quest-grade7) is her separate Grade 7 app, all content in
  Afrikaans. Separate git history and code, but the same architecture
  (bcrypt password RPCs, reactive help, GitHub Pages, service worker) —
  lessons learned in one often apply to the other, but a fix here does not
  automatically fix it there. ⚠️ **The two now differ on login**: Blipwork
  moved to the teacher-seeded roster picker on 2026-08-21, while the Grade 7
  app still has learners self-register (checked 2026-09-05: its `js/auth.js`
  header still reads "self-registrasie"). Don't carry a login assumption
  from one repo to the other.

## How code loads (lazy boundaries, since 2026-09-06)

Plain English: the app used to download **everything** before the login
screen could draw: all 93 quests, all 8 dice packs, every Exam Focus card
and the whole copy of Fun Functions: 317 files, 5,4 MB, for a learner who
had not typed a password yet. Now it downloads the shell first and fetches
each piece of content the moment it is actually asked for. Measured on
2026-09-06 (`python tools/count_requests.py`): login 317 → **83 files**,
5 354 KB → **1 627 KB**; a chapter costs 9 more files, Exam Focus 21.

Five boundaries, each with a **loader** beside the registry it mirrors:

| Content | Registry (unchanged) | Loader (what the app uses) | Fetched when |
|---|---|---|---|
| Quests | `js/quests/index.js` | `js/quests/load.js`: `loadQuest`, `loadChapterQuests` | a chapter map opens |
| Dice pools | `js/quests/dice-pools.js` | `js/quests/load.js`: `loadDicePool` | the 🎲 card is tapped |
| Exam cards | `js/exam/index.js` | `js/exam/load.js`: `loadExamChapter` | an exam chapter opens |
| Fun Functions | (the synced `js/funfun/`) | inline in `js/screens.js` + `js/funfun-play.js` | the Functions chapter opens |
| Offline demo backend | (none) | `js/api.js` | only in `?local=1` mode |

Rules that keep this safe:

- **The registries never change shape.** 19 `verify-*.html` pages,
  `tools/sweep.py`, the shoot tools and `verify-exam*.mjs` import them
  synchronously and expect every def and every card to be there. The
  loaders are a second door onto the same modules, not a copy of them.
  `js/exam/index.js` even SEEDS the loader's cache as it validates, so
  any harness that imports the registry keeps the old synchronous
  behaviour on every screen.
- **A new quest goes in `js/quests/index.js` AND in `js/quests/load.js`,
  then run the drift check: `node verify-lazy-load.mjs`.** It fails
  loudly if the two lists disagree, if a path or export name in the
  loader is wrong, or if a `QUEST_META` flag no longer matches the real
  def. Same for a new dice pool and a new exam chapter. Run it in every
  verify sweep, it takes a second.
- **The sync map holds flags, never content.** `QUEST_META` carries only
  what a screen reads while it is drawing (today: `xpOnce`). Anything
  that needs the whole def, the results screen's "Play again", awaits
  the loader instead.
- **Every lazy load is wrapped**, and a failure shows the app's own
  existing line, "Can't reach the server — try again." Never a blank
  screen: the chapter heading and its back arrow are always drawn first.
- **A browser remembers a failed module URL** and will not re-fetch it,
  so every lazy fetch goes through `js/lazy.js`, which asks again under a
  fresh query string after a failure. That is what makes a second tap a
  real second attempt instead of replaying the error.
- Two Playwright scripts prove it, both at 375 px in `?local=1`:
  `tools/count_requests.py` (the per-screen request/byte table) and
  `tools/lazy_playthrough.py` (a quest round, a dice round, a Fun
  Functions round, an exam card, and the blocked-module failure path).

## Decision log — what was chosen and WHY (do not silently reverse these)

- **App identity = low-intimidation QUICK RECAP tool** (2026-07-06,
  PROJECT-STATUS): a fast round to revise the week's work before past
  papers, NOT a full homework session. Keep quests short and atomic; do not
  grow them into long worked-problem sets.
- **Tap + on-screen keypad answering, no free typing.** Marking must be
  about maths, never spelling or typing skill. Calculated numbers use the
  decimal-COMMA keypad (South African convention).
- **Every answer key is computed, never hand-typed.** Each chapter has a
  maths library (`statlib.js` etc.) that derives the correct answer; quests
  build questions from it. New content must follow this pattern.
- **Every diagram comes from a verified to-scale engine.** Each engine's
  `verify()` proves points sit at real coordinates, forks sum to 1, scales
  are uniform, etc. The `verify-*.html` harnesses exist because hand-drawn
  approximations mislead learners; keep them passing.
- **Roster login with bcrypt-hashed passwords.** Self-signup was the
  original design (commit e3ec374); it was REPLACED on 2026-08-21 by the
  teacher-seeded roster picker ported from Circle Quest
  (`js/auth.js`, `mhq_list_students` + `mhq_first_login`,
  `supabase/migration-roster-login.sql`). A learner finds their own name in
  the list and sets a password the first time. The teacher never sees
  passwords, only "resets" (clears) them so the learner sets a new one and
  keeps their progress. Two test accounts are hidden from the picker via
  `students.hidden`. Do not reintroduce a sign-up screen.
- **Casio-EXCLUSIVE quartiles in the calculator sim; (n+1)/4 school method
  everywhere else** (calculator.js comment + PROJECT-STATUS). The simulator
  matches the real fx-991ZA Plus II key-for-key; quests and box plots use
  the method taught in class. This mismatch is deliberate — don't "unify" it.
- **Service worker was network-first for app code** (commit a790244), fixing
  the recurring "old version still shows after deploy" problem. **Reversed on
  purpose on 2026-09-06** (fix day Build 6, in her approved scope): now that
  the app fetches a quest, a dice pool or an exam chapter at the moment it is
  tapped, network-first would put a real round trip on school data in front of
  every tap. Code is cache-first with a 7-day age limit instead, and the
  freshness the old strategy bought is bought by the `CACHE` bump, which
  `tools/sw_check.py` guards. The two halves go together: do not quietly
  revert either one, and do not ship without the check.
- **Per-chapter colour family** (config.js, "locked decision"): each chapter
  owns one hue; its quests are shades light → deep, so a quest map reads as
  one world.
- **`mc()` in `_shared.js` de-dupes options by STRING only, by design**
  (PROJECT-STATUS 2026-07-06). Generators must filter their own decoys BY
  VALUE so a decoy can never numerically equal the right answer — every
  chapter now does this; copy that pattern in new content.
- **Calculation tolerances are sized per question from the measured rounding
  drift of the printed solution's own method** (e.g. t6 regularPolygon
  tol 0.5). Never tighten back to the 0.001 default without re-measuring —
  that reintroduces "right answer marked wrong" bugs.
- **New chapters are seeded CLOSED on the live database**; the teacher opens
  each quest as it's taught (migrations for Finance onward say so
  explicitly). Local mode opens everything for testing.
- **No "tap the diagram" questions in Analytical Geometry** (commit
  15e63ea): tapping a line near a crossing is too fiddly on a phone, so
  lines/points are lettered and answered by labelled multiple choice.

## Gotchas that already caused real bugs (check before planning)

1. **Pushing to git does NOT update the database.** Any schema/quest-list
   change needs its `supabase/migration-*.sql` run by hand in the Supabase
   SQL editor — and Megan is usually the one who runs it, so give her the
   exact SQL and exact clicks.
2. **Stale app after deploy.** Forgetting to bump `CACHE` in `sw.js` (and,
   on a phone, not fully closing and reopening the PWA — sometimes twice)
   makes the old version linger. Bump the version on every shippable change.
3. **Diagrams and tables can leak the answer.** The Number Patterns
   difference pyramid printed the very difference the question asked for
   (commit 143e184), and a frequency table's Total row answered q5/q6
   (commit 626db4a). When a question shows a diagram/table, check it doesn't
   contain its own answer.
4. **A decoy numerically equal to the correct answer marks a right learner
   wrong** — `mc()` only de-dupes identical strings, so `1/2` vs `0,5` (or a
   reordered solution set, commit 7f603c0) slip through. Filter decoys by
   value.
5. **Hyphen vs real minus.** South African learners see a proper minus sign
   (−); plain hyphens leaked into options in 6 skills before the `neg()`
   wrapper fixed it. Use the existing helpers for negative numbers.
6. **Docs lag the code, and this entry has lagged twice.** The README's
   "passwords are readable" claim was fixed long ago. On 2026-08-07 the stale
   bits were `js/admin.js`'s header comment and a mention of seeding a class
   list. On 2026-09-05 the audit found the opposite claim stale everywhere:
   README, this file and `js/admin.js` still said learners sign themselves up,
   nine days after the roster picker replaced sign-up. Passwords are
   bcrypt-hashed and unreadable by anyone, including the teacher. When a
   login or content change ships, grep the docs for the old wording the same
   day.
7. **Local mode ≠ live mode.** Local backend opens all quests and stores to
   localStorage; live seeds new quests CLOSED and stores to Supabase. Test
   in both before declaring something done.
8. **A migration that drops or re-creates a table silently re-opens it.**
   Creating a table hands out this project's default grants again, so any
   `revoke` written for that table earlier in `schema.sql` is undone. Found
   2026-09-05: `schema.sql` line 319 revokes `shop_items` from anon and
   authenticated, but `migration-store-expansion.sql` re-created the table
   and live read `anon=arwdDxtm` for weeks. Nothing leaked (row-level
   security is on with no policies, so the read came back empty rather than
   denied) but the door was open. **Rule: every migration that drops or
   re-creates a table must re-run that table's `revoke` in the same file** —
   and `revoke` is what makes a probe answer `42501 permission denied`
   instead of `[]`.

9. **The `CACHE` bump is now load-bearing for CODE, not only for images**
   (2026-09-06). Until fix-day Build 6 app code was network-first, so a
   forgotten bump cost at worst a stale picture. Now the worker serves `.js`
   and `.css` out of its own cache for up to 7 days, and `activate` only
   clears the old cache when the cache NAME changes. Push new code without
   bumping `const CACHE` in `sw.js` and learners keep running the old code
   until the 7-day age limit expires it, file by file. That is the nastiest
   version of gotcha 2: the deploy looks live, it tests live for whoever
   clears their cache, and half the class is a week behind with no error
   anywhere. **`python tools/sw_check.py` must print OK before every push**:
   it compares `js/` and `css/` against the commit that last touched the
   `CACHE` line and lists anything that has moved since.
10. **The same cache can hide a local edit** (2026-09-06, the cost of gotcha
   9's strategy). If `http://localhost:5191/` has ever been opened in a real
   browser, that browser has this service worker registered, and it will serve
   `js/` and `css/` from its own cache for up to 7 days. So an edit to a quest
   can fail to show on a reload, and a `verify-*.html` page opened in that
   same browser can grade the OLD file. Nothing on screen says so. The
   headless tools in `tools/` are safe (every run gets a clean browser, and
   most switch the worker off outright), so **when a local change "isn't
   showing", suspect this before the code**. The fix takes one click: press
   F12, click the **Application** tab, click **Service Workers** on the left,
   click **Unregister**, then reload the page. Ticking **Bypass for network**
   on that same panel keeps it out of the way for the rest of the session.

Future sessions: when you hit (and fix) a new one, append it here.

## How to plan any change here (walk this checklist, in order)

1. Read `PROJECT-STATUS.md` (current state, pending items, recent
   decisions).
2. Say the plan to Megan in plain English first — what will change in HER
   or her learners' experience — and get a nod before large changes.
3. Locate the change: question content → `js/quests/` + that chapter's
   maths library (answers computed, decoys filtered by value, tolerances
   measured); diagrams → `js/engine/` (its `verify()` must stay honest);
   answer flow / marking UI → `js/questions.js` + `js/play.js`; chapter
   wiring → `js/config.js`, `js/quests/index.js`, `js/concepts.js`;
   database → `supabase/schema.sql` PLUS a new additive `migration-*.sql`.
4. Respect the decision log above — especially recap-sized quests, computed
   answers, and the Casio-vs-school quartile split.
5. Check both modes: local (`?local=1`) and Supabase. A new quest needs a
   schema seed AND a migration, seeded CLOSED on live.
6. Verify for real: run the chapter's `verify-*.html` (all checks must
   pass, with many fresh generations) and play the flow in the running app
   (`python -m http.server 5191`, open http://localhost:5191/) — not only
   by reading code.
7. Bump the `CACHE` version in `sw.js`.
8. Update `PROJECT-STATUS.md`, commit with a message that states the WHY,
   push to `main` (that IS the app deploy). If there's a migration, walk
   Megan through running it in the Supabase SQL editor.
9. End with the plain-English "what changed and what you'll notice"
   summary.

## Working rules

- Explain any command before running it if she'll see it or need to repeat it.
- Never put secrets (API keys, Supabase keys) in committed files.
- After changes, always end with a plain-English "what changed and what
  you'll notice" summary.
