=== MEGAN'S /go DELEGATION — 2026-10-17 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: QUEUE.md translation rows of the Blipwork Afrikaans plan, Saturday-night manual push 2026-10-17: up to 60 rows, waves of three Opus workers, commits local on main by the foreman, no push, no sw bump, no Supabase (her "Run it" 19:14); setup row S9 added on her "yes, add it tonight please" (19:46)
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (GitHub megzieberr/blipwork, a PUBLIC repo)
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===

# Setup row S9: make verify-exam.html's hub checks language-aware (one Opus worker)

Repo: `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest`. Run every command from there. A local server listens on port 5191 (do not start another). Other workers are translating hub rounds in js/quests/ at the same time: touch ONLY `verify-exam.html`. Never run git. Never edit any file under js/, tools/, css/ or briefs/.

## The problem
Blipwork is getting Afrikaans twins for its maths content (`L(en, af)` wrappers; `?lang=af` on the URL switches). Row T89 wrapped the chapter names, round titles and blurbs in js/config.js, so under `?lang=af` the hub shows "Algebraïese Uitdrukkings", "Eksponente & Wortelvorme", "Euklidiese Meetkunde" and so on. verify-exam.html still compares those names against English literals, so `verify-exam.html?lang=af` fails exactly these 12 checks (English run: ✓ ALL GOOD — 678/678):

1. flag ON: the FIRST Exam Focus chapter card is Algebraic Expressions (EXAM_TAB_ORDER, basics first) — got "Algebraïese Uitdrukkings"
2. flag ON: the flagged chapter's card (Equations & Inequalities) is on the grid
3. clicking the chapter card navigates to examChapter with chapterId "eqn"
4. examChapter screen shows all 12 skill tiles for eqn, got 0
5. the LAST tile on the grid is the Level 4 one, got "(none)"
6. the Level 4 tile carries the exam-tile-l4 class (full-width, amber)
7. the Level 4 tile carries its one-line muted sub-line
8. one of eqn's tiles is the nature-of-roots chain, with her own label
9. hub: with NO quest open, the exam-only Euclidean chapter is the card that remains
10. Paper 1 lists its chapters in the paper's own order, got [Eksponente & Wortelvorme | …]
11. Paper 2 lists its chapters in the paper's own order, got [Statistiek | …]
12. Exam Focus tab MUST show the Euclidean card, got [Algebraïese Uitdrukkings | …]

Checks 3 to 8 cascade from 2 and 3: the page clicks a card it finds by its English text, the click misses under `?lang=af`, and everything after it sees nothing. (The checker's own names show the T89 Afrikaans, which is correct app behaviour.)

## What to do
Make those checks read their expected names from the same source the app uses, so they pass in BOTH languages:
- The chapter list and names live in `js/config.js` (each chapter's `name` is now `L("Finance", "Finansies")`, which returns the current language's text). Import or reuse whatever verify-exam.html already imports from there; expected names = the config's `name` values (or compare chapter IDS instead of names wherever the check really cares about identity or order, for example the Paper 1 / Paper 2 order lists and "the FIRST card is algx"). `js/lang.js` exports `L`, `getLang` if you need them.
- Find cards to click by chapter id (a data attribute or the config name), not by English text.
- Tile labels such as "her own label" for the nature-of-roots chain: compare against the exam registry's own data for the current language, not a literal.
- Keep every check's meaning. Do not delete or weaken a check, do not add `?lang=af` special-casing that skips checks, do not touch the other 666 checks.
- English output of the app is not affected by this row (you change a test page only).

Read the relevant parts of verify-exam.html first (search for the 12 check labels above), then `js/config.js` (chapter entries), `js/lang.js`, and whatever hub module the page uses to render the cards (the page's own imports tell you). Read code lazily; the page is large.

## Check (must pass before you report GREEN)
From the repo root:
`PYTHONUTF8=1 python tools/harness_run.py verify-exam "verify-exam?lang=af"`
Both banners must be `✓ ALL GOOD — 678/678 checks passed` (same count as before: no check added or removed). Run it twice to be sure it is stable. If verify-exam in EN was already not 678/678 when you started (another worker may be mid-injection), wait a minute and run again before concluding anything.

## Never
git; any file other than verify-exam.html; push, deploy, Supabase, sw.js; memory files. Stop and report RED at about 250k tokens.

## Report (at most 10 lines)
WHAT CHANGED: <which checks, how (ids vs config names), lines touched>
EN: <banner> | AF: <banner> (twice)
Anything a later language might break: <or none>
Tokens used (rough): <n>k
STATUS: GREEN | RED <reason>
