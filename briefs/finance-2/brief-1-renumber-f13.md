=== MEGAN'S /go DELEGATION — 2026-10-11 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: Run the finance build queue in FINANCE-PLAYTEST-2026-10-11-PLAN.md §6: six
  workers, one unit each (renumber the one-equation round f12 → f13; Fix A real
  superscripts; f10 taught form only + jug-form archive; f8 the jug redesign; new f12
  Build the timeline; Fix B f13 equation colours), a phone-width checker after each
  build and a fresh fix worker where one finds something. Local commits only. Her words
  12:12: "Yebo, all looks good... run it". Shipping happens separately in the foreman
  session on her own yes.
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (Blipwork)
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===

# Worker 1 brief: the one-equation round becomes f13 (mechanical renumber)

You are ONE worker doing ONE unit: renumber the finance round "Build the one equation"
from `f12` to `f13`, freeing the `f12` slot for a new round that a later worker builds.
Repo `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (GitHub Pages
app "Blipwork", Grade 11 maths, English, PUBLIC repo). Work on the current branch,
commit locally when done, never push. This is an exact-spec job: no redesign, no
rewording of learner text, no new features.

## Read first (and nothing heavier)
1. `CLAUDE.md` in the repo root: "Technical map", "How code loads", "Gotchas",
   "Working rules" (it tells you how the local server on port 5191 and the harness
   pages are run). Do NOT read STATUS-ARCHIVE.md, PROJECT-STATUS.md, the `sessions`
   folder, transcripts or the Tutoring Resources folder.
2. This brief. The map below was measured by the foreman with grep on 2026-10-11; trust
   it, but run your own `grep -rn "f12"` at the end to prove nothing was missed.

## Why (one paragraph, so the renames make sense)
Megan's class must work words → timeline → equation, so a new round "Build the
timeline" takes slot f12 and the existing one-equation round moves to f13. Nothing about
the one-equation round's content changes today. Live Supabase has no f12 row yet
(migration never run), so the id change touches no learner data.

## The rename map (every item is required)

### Files and exports
- `git mv js/quests/questf12-one-equation.js js/quests/questf13-one-equation.js`
  (git mv, so history follows the file).
- In that file: `export const questF12` → `questF13`; `export const F12_FAMILIES` →
  `F13_FAMILIES`; the def's `id: "f12"` (line ~549) → `id: "f13"`; any `n:` field → 13.
  Add ONE note near the top of the file's header comment: "This round was f12 until
  2026-10-11 (now f13; f12 = Build the timeline). Comments saying 'f12 review 1' refer to
  its 10 Oct review." Leave those dated comments as they are.
- `js/quests/index.js:22` import → `{ questF13 } from "./questf13-one-equation.js"`;
  line ~106 map entry `f12: questF12` → `f13: questF13`.
- `js/quests/load.js:63` → `f13: ["./questf13-one-equation.js", "questF13"],`.
- `js/config.js:63`: `{ id: "f13", n: 13, title: "Build the one equation", ... }` (same
  blurb, `built: true`). Do NOT add an f12 entry; leave a one-line comment in its place:
  `// f12 "Build the timeline" lands here (2026-10-11 queue, worker 5)`.
- `js/local-backend.js:136` (QUEST_IDS) and `:151` (DEFAULT_OPEN): replace `"f12"` with
  `"f13"` in both lists (no f12 entry for now).

### Skill ids and the diagnose helper
- `js/quests/_finance-check.js:593–600`: the eight skill keys `"f12.twoDeposits"` …
  `"f12.unknownPayment"` → `"f13.…"`. The exported function `f12Diagnose` (line ~1292)
  → `f13Diagnose`, and its call sites in that file and in `verify-finance.html`
  (lines ~155, 841, 873). Add one note beside the function: "was f12Diagnose until
  2026-10-11".

### The CSS class `.f12-eq` → `.f13-eq` (everywhere, zero left)
- `css/styles.css:335` rule and the comment above it (lines 330–333 also name the file
  path `js/quests/questf12-one-equation.js`: update that path).
- `js/quests/questf13-one-equation.js` (the `EQ` wrapper and every mention).
- `js/concepts.js` (the one-equation concept card, header comment at line ~326 and any
  `class="f12-eq"` in its HTML; also retitle that header comment to f13).
- `js/quests/_finance-check.js:1149` (the regex that strips the wrapper) and nearby
  comments.
- `verify-finance.html:819` and `:846` regexes and the comment at 814–815.
- Proof: `grep -rn "f12-eq" --include=*.js --include=*.css --include=*.html .` prints
  nothing (excluding the `sessions` folder and `briefs/`).

### verify-finance.html
- `import { F13_FAMILIES } from "./js/quests/questf13-one-equation.js"` (line 156) and
  every `F12_FAMILIES` use (line ~868).
- `questDef("f12")` (line ~791) → `questDef("f13")`; `<pre id="f12">` (142) and
  `document.getElementById("f12")` (922) → `f13`.
- Tick at line 609: `includes("f10,f11,f12")` → `includes("f10,f11,f13")` and its text
  → "f11 stands between f10 and f13 on the Finance map (f12 slot open until Build the
  timeline lands)". Worker 5 restores the full chain later.
- Tick texts and headings that name the round (`f12 deals 8 cards`, `f12 card …`,
  `f12: the fade`, `f12.twoDeposits`, `h2 "f12 — the round's shape…"`, "Quests f1–f12
  (complete)") → f13. The two dated history paragraphs at lines 51–61 ("2026-10-10: f12
  … joined", "f11 … so f1–f12 is complete") keep their text and get " (renumbered f13
  on 2026-10-11)" appended once each.
- The check COUNT must not change: 586/586 before, 586/586 after.

### Seeding SQL (text only, NEVER run)
- `supabase/migration-finance-quests-2.sql`: six rows, all closed:
  `('f8','finance',false,94), ('f9',…,95), ('f10',…,96), ('f11',…,97),
  ('f12','finance',false,98), ('f13','finance',false,99)`. Update the header comment to
  "f8..f13", "sort 94..99", keep the line about live max(sort) 93 on 2026-10-10 and that
  the ship re-checks it. (f12 is seeded now because the migration only runs at the ship,
  by which time Build the timeline exists.)
- `supabase/schema.sql` after line 2582 (`('f7','finance',false,15),`): mirror the same
  six rows verbatim, with a comment `-- f8..f13 (2026-10-10/11): live sorts 94..99`. Keep
  the SQL valid (commas, the closing `;` of that INSERT).

### Docs
- `EXAM-BUILD-DAY.md:209`: "covers f1–f12" → "covers f1–f13 (the one-equation round was
  renumbered f12 → f13 on 2026-10-11; f12 = Build the timeline)".

### Leave alone
- Dated comments in OTHER files that say "f12 review 1" or "finance f12" as history:
  `js/engine/timeline-graph.js`, `js/keypad.js`, `js/questions.js`,
  `js/quests/questf11-meeting-day.js`. Not identifiers, not matched by code.
- `briefs/finance-2/brief-f12.md` (the old brief, history), `sw.js` (never bump it),
  anything under `sessions/`, PROJECT-STATUS.md, STATUS-ARCHIVE.md, learner-facing
  wording, the `.nowrap` class, and every other round.

## Verify (all must be green before you report)
Start the local server as CLAUDE.md says (port 5191), then:
1. `node verify-lazy-load.mjs` green.
2. `python tools/harness_run.py verify-finance verify-dice-finance verify-steps-ux verify-wrap`
   expected: verify-finance **586/586**, verify-dice-finance **89/89**, the other two
   green, no page errors. (`harness_run.py` prints the last line matching passed|FAIL.)
3. `verify-exam.html`: open it headless and read the page text for its result line
   (expected 673/673; harness_run's last-line trick picks a prose line on this page).
4. Proof greps, pasted into your report:
   `grep -rn "f12-eq" --include=*.js --include=*.css --include=*.html . | grep -v sessions`
   → nothing; `grep -rn -E "questF12|F12_FAMILIES|f12Diagnose|questf12-" --include=*.js --include=*.html --include=*.mjs . | grep -v -E "sessions|briefs"`
   → nothing; `grep -rn -E "\bf12\b" --include=*.js --include=*.html --include=*.mjs --include=*.sql . | grep -v -E "sessions|briefs"`
   → only the dated comments listed under "Leave alone", the new f12 placeholder comment
   in config.js, the migration/schema f12 row, and verify-finance's history lines.
5. Open `http://localhost:5191/?local=1` headless at 390 px, log in as the local test
   learner CLAUDE.md names, open the Finance chapter and confirm the map shows round 13
   "Build the one equation" after 11 "Pick the meeting day", and that tapping it starts a
   card (no console error). One screenshot is fine for YOUR check; do not paste it back.

## Commit
One local commit:
`Finance: the one-equation round is f13 (f12 slot freed for Build the timeline)` with a
short body listing the renames, ending with
`Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`. Never push.

## Report back (this is what the foreman reads first)
- Files changed (the `git show --stat HEAD` list).
- The four proof greps' output.
- The harness lines (verify-finance, verify-dice-finance, verify-exam, verify-lazy-load,
  steps-ux, wrap).
- Anything in the map that did not match the code as you found it, and what you did.
