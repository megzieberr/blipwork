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
(a PWA). Learners sign themselves up, play short question rounds ("quests")
on the chapters she has opened, and get hints, worked solutions and concept
cards only when they're stuck. She runs the class from an admin page: opening
and closing quests, watching who's struggling with which concept, and
resetting forgotten passwords. All 11 chapters are built and live.

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
  public key can only call those functions. Learners self-sign-up; passwords
  are **bcrypt-hashed server-side** (the teacher can only reset, never read).
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
  https://megzieberr.github.io/maths-homework-quest/
- **Deploy target 2 — the database**: pushing code does NOT touch Supabase.
  Schema changes ship as an additive `supabase/migration-*.sql` file that
  must be **pasted into the Supabase SQL editor by hand**.
- **Service worker**: `sw.js`, cache name currently `mhq-v25`. Network-first
  for app code (so deploys land on the next load), cache-first for images.
  **Bump the cache version on every shippable change.**
- **Local dev**: `python -m http.server 5191` in the repo root, then open
  http://localhost:5191/ — port **5191**. No install step.
- **Testing**: 10 `verify-*.html` pages (open in a browser, or drive
  headlessly) fuzz every engine and quest generator; all must PASS before
  shipping. Quest modules can also be imported headlessly in node for
  fuzzing.
- **Session hand-off**: `PROJECT-STATUS.md` — read it at session start,
  update it before ending a session that changed anything.
- **Sibling repo**: `maths-quest-grade7` ("Wiskunde Avontuur", cloned at
  /workspace/maths-quest-grade7) is her separate Grade 7 app, all content in
  Afrikaans. Separate git history and code, but the same architecture
  (self-signup + bcrypt RPCs, reactive help, GitHub Pages, service worker) —
  lessons learned in one often apply to the other, but a fix here does not
  automatically fix it there.

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
- **Self-signup auth with bcrypt-hashed passwords** (commit e3ec374).
  Learners create their own username + password; the teacher never sees
  passwords, only "resets" (clears) them so the learner sets a new one and
  keeps their progress. (The README's old "passwords stored readable" claim
  predates this — the code wins.)
- **Casio-EXCLUSIVE quartiles in the calculator sim; (n+1)/4 school method
  everywhere else** (calculator.js comment + PROJECT-STATUS). The simulator
  matches the real fx-991ZA Plus II key-for-key; quests and box plots use
  the method taught in class. This mismatch is deliberate — don't "unify" it.
- **Service worker is network-first for app code** (commit a790244), fixing
  the recurring "old version still shows after deploy" problem. Keep it, and
  still bump the cache version each release.
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
6. **The README lags the code.** It still says passwords are readable by the
   teacher and mentions seeding a class list — both replaced by self-signup
   + bcrypt (e3ec374). Trust the code (and this file) over the README.
7. **Local mode ≠ live mode.** Local backend opens all quests and stores to
   localStorage; live seeds new quests CLOSED and stores to Supabase. Test
   in both before declaring something done.

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
