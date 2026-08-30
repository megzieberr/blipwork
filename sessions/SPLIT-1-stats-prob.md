# SESSION 1 — Step-chain split: Statistics q3 + Probability p6 (+ helper promotion)

Repo: `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest`
(Blipwork, live PWA — but you touch NOTHING live. Local build only.)

## Why (read first)
Megan's ruling (2026-08-30): heavy calculations must be SPLIT into steps
"so the kids actually build the questions, not try to do everything in
their head". The 2D Trig chapter got this treatment today (commit 8eafe83)
— **`js/quests/questt3-sine-angles.js` and `js/quests/_trig.js` are your
reference implementation.** Copy that pattern's shapes exactly; do not
invent new machinery. Her laws, non-negotiable:
- The question's PROMPT, GRAPH and NUMBERS do not change. The existing
  worked `solution` list is what becomes the answered steps.
- Multiple-choice / yesno / tap skills are NOT touched.
- Every step carries its own `prompt` AND `hint` (a retry shows the hint).
- The last step is a `calc` whose `expected` === the question's top-level
  `expected` (keep top-level expected/dp/tol — harness recomputes read it).
- The question KEEPS its `solution` and `answerLabel` (end-of-question panel).
- Comma decimals everywhere learner-visible (use the existing C()/dec()).

## Task 0 — promote the step helpers (shared-file step, do this FIRST)
Move `mcStep(prompt, correct, wrongs, hint)` and
`calcStep(prompt, expected, hint, opts)` from `js/quests/_trig.js` into
`js/quests/_shared.js` (verbatim, including the rng-seeded shuffle — it
MUST use `rng()` from ../rng.js, never Math.random, or dice resume breaks).
In `_trig.js`, delete the moved bodies and re-export:
`export { mcStep, calcStep } from "./_shared.js";` — so t2–t7's imports
keep working untouched. Run `node verify-trig-steps.mjs` and
`node verify-t2-steps.mjs` afterwards: both must stay green (50/50, 25/25).

## Task 1 — Statistics q3: `genOutBound` in `js/quests/quest03-quartiles.js`
Currently one calc box for a 2-line working. Becomes `type:"steps"` with:
1. `calcStep` — "First the IQR." expected `q3 − q1`, dp 0, hint "IQR = Q3 − Q1".
2. A **tokenpad build step** — frame
   `["boundary", "=", SLOT, which === "lower" ? "−" : "+", "1,5", "×", SLOT]`,
   chips `[String(q1), String(q3), String(iqr)]` shuffled, expected
   `lower → [q1, iqr]`, `upper → [q3, iqr]` joined with **U+2009 thin space
   ("\u2009") — the pad's own separator, see _trig.js's joinThin note**.
   NO mirror accept (subtraction/choice of quartile is the skill). Hint:
   "Below Q1 for the lower boundary, above Q3 for the upper — always 1,5 × IQR."
   ⚠️ Chip values must be DISTINCT: regenerate (bounded loop) until
   q1, q3 and iqr are three different numbers — `normalizeTokens` marks
   equal-looking chips identically.
3. `calcStep` — the boundary itself. Keep `allowNeg: true` and the existing
   dp rule `(Number.isInteger(ans) ? 0 : 1)`.
Only `genOutBound` changes in this file. `genIsOutlier` (yesno) stays.

## Task 2 — Probability p6 in `js/quests/questp6-trees.js`
**`exactlyOneHead`** becomes steps (graph/prompt unchanged):
1. `mcStep` — "Which paths give exactly one head?" correct `"HT and TH"`,
   wrongs `["HH and TT", "HT only", "HH, HT and TH"]`.
2. `calcStep` — P(HT), dp 2. Hint: multiply ALONG the path.
3. `calcStep` — P(TH), dp 2. (Yes, same value as step 2 — that is fine,
   these are typed answers, not chips.)
4. `calcStep` — P(exactly one head) = the sum, dp 2. Hint: ADD the paths.
**`biasedFindOther`** becomes steps (no graph — stays no graph):
1. `calcStep` — P(H) = √(pHH), dp 1. Hint from the existing one.
2. `calcStep` — P(T) = 1 − P(H), dp 1.
3. `calcStep` — P(TT), dp 2.
All other p6 skills untouched.

## Task 3 — the dice guard in `js/quests/dice-stats.js`
Its `withMethod()` attaches `q.method` unconditionally. Steps chains must
NEVER carry q.method (js/play.js renders the 📖 link BEFORE step 1 — it
would hand the chain's answers over). Add the same guard dice-trig.js got
today: skip method attachment when `q.type === "steps"`, with a short
comment pointing at dice-trig.js's header for the story.

## Task 4 — harnesses
- `verify.html` (the stats chapter harness) and `verify-prob.html`: add the
  `steps` branch to the per-question type dispatch — copy it from
  **verify-trig.html** (committed today; includes the U+2009 split, the
  buildable-chips check, no-method assertion, chain-end === expected).
- Run both via `python tools\harness_run.py verify verify-prob` — the
  server on :5191 is ALREADY RUNNING (the foreman owns it; do not start
  or stop your own).
- `python tools\shoot_round.py q3 p6` and **READ the PNGs** in
  tools/_out/rounds/ — scrollWidth must stay 375, and look at the frames.

## Do NOT
- Touch sw.js, any supabase/, git commit/push, any other quest file,
  js/funfun/ (generated), or anything live.
- Add randomness outside `rng()`/`randInt`/`pick` (dice resume determinism).

## Done looks like
Both rounds play as chains, all listed harnesses green, PNGs clean at 375.
End your report with: files changed (paths), harness numbers, and anything
you deliberately did differently from this brief and why.
