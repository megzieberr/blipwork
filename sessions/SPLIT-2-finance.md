# SESSION 2 — Step-chain split: Finance f6 (hire purchase) + f7 (eff↔nom)

Repo: `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest`
(Blipwork, live PWA — you touch NOTHING live. Local build only.)

## Why (read first)
Megan's ruling (2026-08-30): heavy calculations get SPLIT into answered
steps. The 2D Trig chapter is the reference (commit 8eafe83): read
`js/quests/questt3-sine-angles.js` for the shape and import
`mcStep`/`calcStep` from `js/quests/_shared.js` (Session 1 promoted them
there; if they are not there yet, STOP and report — you are running early).
Her laws: question PROMPT/NUMBERS unchanged; the worked `solution` becomes
the steps; MCs/yesno untouched; every step has prompt + hint; last step is
a calc equal to the question's top-level `expected` (which stays); keep
`solution` and `answerLabel`; comma decimals (C()).

⚠️ **HER FINANCE METHOD RULE (hard law): ONE equation, never round
mid-question.** No step may require a ROUNDED intermediate that then feeds
the next computation. The designs below were chosen to respect this — the
f6 intermediate is exact whole rand, and f7 deliberately has NO
"divide the rate first" step. Do not add intermediate-value steps beyond
these designs.

## Task 1 — f6 `hpTotal` in `js/quests/questf6-deposits.js`
Becomes `type:"steps"`:
1. `calcStep` — "First: the balance after the deposit (in rand)."
   expected `owed`, dp 0. Hint: interest is charged on what is still owed —
   balance = (100 − p)% × price. (This value is EXACT whole rand by
   construction — see the file's own comment.)
2. `mcStep` — "Hire purchase: which formula applies to that balance?"
   correct `A = P(1 + i·n)` ; wrongs `["A = P(1 + i)ⁿ", "A = P(1 − i·n)",
   "A = P × i × n"]`. Hint: hire purchase is the simple-interest case.
3. `calcStep` — "The total repaid on the balance (in rand)." expected `A`,
   dp 0. Hint: `A = ${owed}(1 + ${C(toFrac(r))} × ${n})` — one line on the
   calculator.
All other f6 skills untouched.

## Task 2 — f7 `effCalc` in `js/quests/questf7-eff-nom.js`
Becomes `type:"steps"`:
1. `mcStep` — "What is n for “compounded ${o.label}”?" correct
   `String(o.k)`; wrongs = the other frequencies from {1, 2, 4, 12} minus
   o.k (three of them, as strings). Hint: n = how many times a year
   interest is added.
2. `mcStep` — "Pick the correct set-up." correct
   `1 + i_eff = (1 + ${C(toFrac(nom))}/${o.k})^${o.k}` ; wrongs (same
   numbers, wrong structure): `1 + i_eff = (1 + ${C(toFrac(nom))} × ${o.k})^${o.k}`,
   `1 + i_eff = (1 + ${C(toFrac(nom))})^${o.k}`,
   `i_eff = ${C(toFrac(nom))}/${o.k} × ${o.k}`. Hint: divide the nominal
   rate by n INSIDE the bracket, power n outside.
3. `calcStep` — "Now the effective rate, as a %, 2 decimals." expected
   `eff`, dp 2, **tol: 0.001**. Hint: type the WHOLE right side in one go,
   subtract 1, × 100 — never round along the way.

⚠️ **Tolerance rule (foreman review catch from Session 1):** `calcStep`
defaults `tol: 0.015` — a TRIG allowance for 4-dp sine working. On money
and percent values that default can accept a wrong neighbouring value.
Pass `tol: 0.001` explicitly on every calc step in this session (the f6
whole-rand steps included — harmless there, correct everywhere).
All other f7 skills untouched (they are MCs).

## Task 3 — the dice guard in `js/quests/dice-finance.js`
Its `withMethod()` uses `hasRealWorking(q)` with no steps guard. Add
`methodEligible(q)` exactly as `js/quests/dice-trig.js` has it today
(`q.type !== "steps" && hasRealWorking(q)`, exported, used by withMethod,
short comment pointing at dice-trig.js's header). Steps chains must never
carry q.method — play.js renders the 📖 link before step 1.

## Task 4 — harnesses
- `verify-finance.html`: add the `steps` branch to the per-question type
  dispatch — copy it from **verify-trig.html** (committed today: U+2009
  chip split, no-method assertion, chain-end === expected).
- `verify-dice-finance.html`: add `"steps"` to its INPUT_LAW set, add the
  same steps branch, and an assertion that a steps question NEVER carries
  q.method — copy all three from **verify-dice-trig.html** (committed
  today). Its RECOMPUTE table reads top-level `expected`/prompt — keep
  those working (they will, if you kept top-level fields).
- If `js/quests/_finance-check.js` inspects `q.type` anywhere, extend it
  for "steps" the same way; if not, leave it alone.
- Run: `python tools\harness_run.py verify-finance verify-dice-finance`
  — the :5191 server is ALREADY RUNNING (foreman's; don't start/stop one).
- `python tools\shoot_round.py f6 f7` and **READ the PNGs** — scrollWidth
  375, options render as readable formulas.

## Do NOT
- Touch sw.js, supabase/, git commit/push, other quest files, js/funfun/.
- Add randomness outside `rng()`/`randInt`/`pick`.

## Done looks like
Both rounds play as chains, harnesses green, PNGs clean. End your report
with: files changed, harness numbers, and any deliberate deviations + why.
