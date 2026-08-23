=== MEGAN'S /go DELEGATION — 2026-08-23 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: dice pools for Finance, Number Patterns and 2D Trig in Blipwork (+ verify-finance
  harness), bundled with the two Euclid cosmetics already made locally
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (Blipwork)
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===

# DICE BUILD 2026-08-23 — rules shared by the three chapter sessions

Three sessions run IN PARALLEL in the same working tree (no worktrees), one per
chapter: Finance (`sessions/DICE-F-finance.md`), Number Patterns
(`sessions/DICE-P-patterns.md`), 2D Trigonometry (`sessions/DICE-T-trig.md`).
The foreman (Fable, top-level session) reviews every round, integrates, and ships.
You cannot see the chat; everything you need is in this file + your chapter brief.

## Read first (in this order, before writing anything)
1. `DICE-PLAN.md` — her rulings (all DECIDED; do not re-ask), the INPUT LAW, the
   engineering notes. The "method reveal" ruling matters below.
2. `DICE-AUDIT.md` §1 (how generation works) + your chapter's own section.
3. `js/quests/dice-stats.js` — THE RECIPE. Your pool is this file, for your chapter.
4. `js/dice.js` header — the pool interface (`skillId / kind / concept / gen`).
5. `verify-dice.html` — the Statistics harness; your harness mirrors its generic
   checks (Part 1 + Part 3) and adds a chapter recompute (Part 2).
6. `tools/shoot_dice.py` — the phone-width round shooter (written today, tested on
   Stats). It launches real rounds straight from page JS, so it works for your chapter
   even though `DICE_CHAPTERS` doesn't list it yet.
7. Your chapter's quest modules (`js/quests/quest<prefix>*.js`) and its maths lib.

A dev server is ALREADY serving the repo on http://localhost:5191 (Python http.server).
Do not start another. Use `?local=1` (offline LocalBackend, demo learner
`lerato_test` / `demo1234`) — never the live config.

## The recipe (what the Stats pool did — do the same)
- Import the chapter's quest modules; for every `quest.skills[]` entry push
  `{ skillId: "<quest.id>.<skill.id>", kind, concept: skill.concept || null, gen }`.
- **Reuse `skill.gen` VERBATIM.** Every CARE guard in DICE-AUDIT (do…while loops,
  uniqueness forcing, "nice number" banks) lives inside gen() and rides along for
  free. Do not reimplement any maths. Do not edit a quest module's gen() except where
  your chapter brief names a specific skill.
- `kind` = `skillId` unless two skills are TRUE near-duplicates (same concept, same
  mechanic, same numbers family). Every grouping gets a one-line justification in a
  comment. When unsure, don't group.
- `roundLength` = the median skills-per-quest of the chapter (Stats: 7). Your chapter
  brief states the numbers; put the arithmetic in the file header.
- `gen` is wrapped ONLY to attach `q.method` (see the method rule). The wrapper must
  stay a pure zero-arg function with no randomness of its own — `js/dice.js` calls it
  under a seeded rng, and determinism (resume!) depends on it.
- Exclusions: a skill that cannot honestly roll (its question is hardcoded, or it
  breaks the INPUT LAW) is LEFT OUT of the pool, listed by name with the reason in the
  file header AND in your report. Your chapter brief names the known ones.

## The method rule (NEW today — differs from dice-stats.js, read carefully)
`q.method` feeds the always-available "📖 Show me the method" link (DICE-PLAN ruling).
The Stats pool built it from `q.solution`, and every Stats question had real worked
steps. In your chapter most questions only carry the builders' DEFAULT solution —
`[{ s: <the answer> }]` from `_shared.js`'s `mc()` / `_patterns.js`'s `calcQ()` etc.
A "method" link that reveals only the answer is a spoiler button, not a method.
So: attach `q.method` ONLY when the solution contains real working:
  `solution.length >= 2`, OR any step has a reason `r`, OR the single step's text is
  not just the answer (differs from `answerLabel` and from the correct option label).
Otherwise leave `q.method` undefined — the player then simply omits the link (already
handled in js/play.js). Report the count: how many skills got a method, how many not.
Do NOT write new worked-method text for the skills that lack it — that is a separate
content batch Megan decides on (Finance's would have to follow FINANCE-METHOD.md).
Exception: a skill your chapter brief tells you to generalise may need its solution
text adjusted to the rolled numbers; keep its wording, substitute the numbers.

## Harness: `verify-dice-<chapter>.html` (NEW file, yours alone)
Model it on `verify-dice.html`. It must print a final line matching `N/N checks passed`
(or `FAIL` lines) so `python tools/harness_run.py verify-dice-<chapter>` reads it.
Per entry, 200 seeded rolls (`withSeed` / `genAt` from js/dice.js):
- gen never throws; returns an object with a `type` in the player's known set
  (mc / yesno / calc / tap / reason / calcdo — whatever your chapter actually uses).
- DETERMINISM: same (roundSeed, index, skillId) → deep-equal question; salt 1 differs
  from salt 0 for at least one roll per numeric skill (pure-recall skills exempt —
  list them).
- Shape: mc → ≥2 options, exactly one `correct: true`, all labels distinct by string;
  calc → finite `expected`, a `dp` that is a non-negative integer, `tol` (if present)
  finite and ≥ 0; yesno → `yes` is boolean; tap → has `graph` and a tap target.
- Self-consistency: the question's own correct answer passes `answerCorrect` from
  js/check.js (mc: the correct option's label; calc: `expected` itself; yesno: `yes`).
- No decoy equals the correct answer BY VALUE (numeric labels parsed; strings exact).
- INPUT LAW: no type that takes free text.
- Graph honesty where the chapter already has a verifier or the data is recoverable
  (your brief says which).
- Method: `q.method`, when present, is a non-empty string containing a `.sol-step`.
- Part 3 generic: dealing of a fresh learner covers distinct kinds; every kind is met
  within ceil(entries/roundLength)+2 rounds; resume reproduces the same question.
Also run the chapter's EXISTING static harness (named in your brief) to prove static
play is unchanged, and `python tools/harness_run.py verify-dice` (Stats) to prove you
broke nothing shared.

## PNG review (not optional — she only trusts what was rendered AND READ)
`PYTHONIOENCODING=utf-8 python tools/shoot_dice.py <chapterId> 4` → then READ every
crop in `tools/_out/dice/` at 375 px as a learner would: prompt fits, graph in frame
and legible, options readable, hint wording right, the feedback/steps panels show
what they should, `scrollW` never above 375 (the manifest + console flag overflow).
Fix what is wrong INSIDE YOUR CHAPTER'S OWN FILES (pool, your harness, your chapter's
quest modules/lib only when the bug is theirs). Anything that needs a shared file
(js/play.js, js/dice.js, js/dice-play.js, css/*.css, js/config.js) → REPORT it with the
crop name; do not touch it. Put a review table (skill → OK / finding → fixed/reported)
in your report.

## Hard limits (the foreman owns these)
- Do NOT edit: `js/config.js` (DICE_CHAPTERS), `js/quests/dice-pools.js`, `js/dice.js`,
  `js/dice-play.js`, `js/play.js`, `js/screens.js`, `sw.js`, `css/*`, `supabase/*`,
  any other chapter's files, `PROJECT-STATUS.md`.
- No git commit, no push, no migrations, nothing live. Leave files in the working tree.
- No new dependencies, no build step, no animation/rAF/observers (house rule).
- Don't start/kill servers; don't touch `tools/diags*`, `tools/shots*`.

## Your report (the LAST thing you print — the foreman reads it first)
1. Files created / changed (paths).
2. Pool: N entries of M chapter skills; exclusions with reasons; kind groupings;
   roundLength + arithmetic.
3. Method coverage: X skills with real working → method attached; Y without.
4. Harness totals: your verify-dice-<chapter> N/N; the chapter's static harness; the
   Stats verify-dice (unchanged).
5. PNG review table; any overflow; fixes made; shared-file findings reported.
6. Open questions for Megan (one line each, only if real).
