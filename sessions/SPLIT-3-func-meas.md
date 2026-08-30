# SESSION 3 — Step-chain split: Functions fn7 (max length) + Measurement m6 (heights)

Repo: `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest`
(Blipwork, live PWA — you touch NOTHING live. Local build only.)

## Why (read first)
Megan's ruling (2026-08-30): heavy calculations get SPLIT into answered
steps. The 2D Trig chapter is the reference (commit 8eafe83): read
`js/quests/questt3-sine-angles.js` (shapes) and `js/quests/_trig.js`
(tokenpad build steps — the frame/keys/expected/alsoAccept contract,
including the **U+2009 thin-space join, "\u2009"**). Import `mcStep` /
`calcStep` from `js/quests/_shared.js` (Session 1 promoted them; if
missing, STOP and report — you are running early).
Her laws: question PROMPT/GRAPH/NUMBERS unchanged; the worked `solution`
becomes the steps; MCs/yesno untouched; every step has prompt + hint; the
last step is a calc equal to the kept top-level `expected`; keep
`solution` + `answerLabel`; comma decimals (fix()/C()).

## Task 1 — fn7 `maxLength` in `js/quests/questfn7-together.js`
The heaviest single question in the app (4-line working). Becomes steps:
1. `mcStep` — "AB runs from g on top to f below. AB = ?" correct
   `g(x) − f(x)`; wrongs `["f(x) − g(x)", "g(x) + f(x)", "g(x) × f(x)"]`.
   Hint: top − bottom.
2. `mcStep` — "Subtract and simplify — which parabola is AB?" correct
   `eqStr({kind:"parabola", a:-1, b:m-fb, c:k-fc}, "AB")`; wrongs = the
   same eqStr with the classic slips: `a:+1` (forgot the sign flip),
   `{a:-1, b:m+fb, c:k-fc}` (didn't subtract b), `{a:-1, b:m-fb, c:k+fc}`
   (didn't subtract c). ⚠️ Dedupe: if any wrong's STRING equals the
   correct one (a coefficient landed equal), regenerate the question's
   numbers in a bounded loop until all four labels are distinct — never
   show two identical options with one marked wrong.
3. `calcStep` — "Where does AB turn?" expected `xStar`, dp 2,
   **allowNeg: true** (xStar is often negative). Hint: x = −b/(2a) of AB.
4. `calcStep` — "The maximum length of AB (2 decimals)." expected
   `length`, dp 2, **tol: 0.001**. Hint: substitute back — a 2-decimal x
   is fine here, the parabola is flat at its turning point (the carry
   error from a 2-dp x is second-order, ≈ 0.000 03, so the tight tol
   is safe).

⚠️ **Tolerance rule (foreman review catch from Session 1):** `calcStep`
defaults `tol: 0.015` — a TRIG allowance for 4-dp sine working. Outside
trig that default can accept a wrong neighbouring value. Pass
`tol: 0.001` explicitly on EVERY calc step in this session (fn7 and m6 —
m6's whole-number steps included: harmless there, correct everywhere).
All other fn7 skills untouched.

## Task 2 — m6 in `js/quests/questm6-height.js` (three skills)
These get a **tokenpad build step** — the trap IS which numbers go where.
Write a tiny local builder (copy the shape from _trig.js's builders; frame
literals + SLOT from ../tokenpad.js; expected joined with "\u2009").
⚠️ First check the triples: all chip values in one step must be DISTINCT
(normalizeTokens marks equal-looking chips the same). coneTriple/
pyramidTriple come from ../measlib.js — if a triple can collide (e.g.
s === slant), guard with a bounded regenerate loop.
**`coneFindH`** (given r and slant h → H):
1. tokenpad — frame `["H²", "=", SLOT, "²", "−", SLOT, "²"]`, chips
   `[String(t.slant), String(t.r)]`, expected `[slant, r]` — NO mirror
   accept (subtraction order IS the skill). Hint: the slant is the
   hypotenuse, so it goes first and stands alone.
2. `calcStep` — "H² = ?" expected `slant² − r²`, dp 0.
3. `calcStep` — "H = ?" expected `t.H`, dp 0. Hint: square root.
**`coneFindSlant`** (given r and H → slant):
1. tokenpad — frame `["h²", "=", SLOT, "²", "+", SLOT, "²"]`, chips
   `[String(t.H), String(t.r)]`, expected `[H, r]`, alsoAccept the mirror
   `[r, H]` (addition commutes — marking a child wrong for order there
   would be marking reading order).
2. `calcStep` — h², dp 0.  3. `calcStep` — h, dp 0.
**`pyramidFindH`** (given base ℓ and slant → H; the trap is HALF the base):
1. `calcStep` — "First: half the base." expected `t.half`, dp 0.
2. tokenpad — frame `["H²", "=", SLOT, "²", "−", SLOT, "²"]`, chips
   `[String(t.slant), String(t.half), String(t.s)]` — **the FULL base is
   the decoy chip, that is the whole point of this round.** Expected
   `[slant, half]`, no mirror.
3. `calcStep` — H², dp 0.  4. `calcStep` — H, dp 0.
The three MC/yesno skills in m6 stay untouched.

## Task 3 — the dice guard in `js/quests/dice-func.js`
Add `methodEligible(q)` (`q.type !== "steps" && hasRealWorking(q)`) and
use it in `withMethod`, exactly as `js/quests/dice-trig.js` has it today —
steps chains must never carry q.method (play.js renders the 📖 link before
step 1). Measurement has no dice pool — nothing to do there.

## Task 4 — harnesses
- `verify-func.html` and `verify-meas.html`: add the `steps` branch to the
  per-question dispatch — copy from **verify-trig.html** (committed today).
- `verify-dice-func.html`: add `"steps"` to INPUT_LAW, the steps branch,
  and the never-a-method-on-steps assertion — copy from
  **verify-dice-trig.html** (committed today).
- Run: `python tools\harness_run.py verify-func verify-meas verify-dice-func`
  — the :5191 server is ALREADY RUNNING (foreman's; don't start/stop one).
- `python tools\shoot_round.py fn7 m6` and **READ the PNGs** — scrollWidth
  375; the m6 frames must sit clear of the solid diagrams; fn7's option
  formulas must render as readable stacked maths.

## Do NOT
- Touch sw.js, supabase/, git commit/push, other quest files, js/funfun/.
- Add randomness outside `rng()`/`randInt`/`pick` (dice resume).

## Done looks like
Both rounds play as chains, harnesses green, PNGs clean. End your report
with: files changed, harness numbers, and any deliberate deviations + why.
