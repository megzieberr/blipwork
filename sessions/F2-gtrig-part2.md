# SESSION F2 — GENERAL TRIG part 2 (`gtrig`): reduction · identities · identities-undefined · general-solution · level-4, Opus

Read `sessions/CONTENT-COMMON.md` first (it carries the /go block and every rule), then this.

## Where the chapter stands
Two seeded questions (`trig.rr.t2q1` → cards under co-functions/special-sums/reduction,
`trig.gs.t2q2` → general-solution) — read both and `cards-gtrig.js`. Sibling session F1 builds
co-functions · special-angles · special-sums · super-special-sums at the same time — do not
touch those tiles; append your lines under yours (re-read `cards-gtrig.js` before each write
and merge). Create the `/* ---- level-4 ---- */` section.

## You own
`js/exam/gtrig-siblings-reduction.js`, `gtrig-siblings-identities.js`,
`gtrig-siblings-identities-undefined.js`, `gtrig-siblings-general-solution.js`,
`gtrig-level4.js`, your sections in `js/exam/cards-gtrig.js`, your blocks in
`verify-exam-modules.mjs`.

## Her rulings for trig
Memo = the textbook method; her STORY in hint + esplain (`METHODS-trig.md` Parts E, F, G, I,
K and the undefined-values round gt13). Her six general-solution TYPE NAMES (K1, exactly as she
writes them) are law in the memo's first line ("Type ②: same angle → …"). tan gets ONE
quadrant line (K3 — "waste of time!" otherwise). The tan 180°-period is stated, not derived.

## Tiles
1. `reduction` +5 (to 6) — simplify to a single ratio/number: the SAG's own shape
   `cos(180° − x)·sin(x − 90°)·… / tan(540° + x)·sin(90° + x)·cos(−x)` (fresh angles), a
   squared-term one, a numeric one with rotations (`sin 480°`, `cos(−750°)`), a six-term
   variable one, one that ends in a special-angle value, one that ends as `−tan x`. Each memo:
   quadrant → formula → sign → ratio (her E2 three steps) per term, then cancel. lostQuest gt5
   (numbers) / gt7 (variables) per card. No diagram (the bow tie is the learner's).
2. `identities` 0 → 6 — "Prove that …": her I2 four moves (LCD, the masked identity
   sin² + cos² = 1, factorise, tan → sin/cos); include the conjugate route
   (`sin x/(1 − cos x) = (1 + cos x)/sin x`), a `1/(1 − cos x) − 1/(1 + cos x) = 2/(sin x·tan x)`
   shape (her Test 7), a two-fraction LHS to a single term, a "prove then use it to evaluate at
   θ = 300° without a calculator" pair (level 3), one that needs a difference of squares.
   Memo: LHS worked to RHS (or both sides to the same thing under OR), a tick on each move,
   the trap "never cross-multiply an identity — you may only work one side". lostQuest gt9.
3. `identities-undefined` NEW, 6 cards — SAG item 3 / her gt13: "for which values of x in
   [0°; 360°] is the identity undefined / not valid" — denominators = 0 (both the visible one
   and the one hiding inside tan), `tan x` undefined at 90° + k·180°, a `1 − cos 3x = 0`
   inside a given interval (her Test 3 Q3: both cases), a "for which x is the expression
   real" (square-root-of-a-ratio, her Test 7 Q1), a "for which x is the expression equal to
   zero". Memo: list every term that can be zero, solve each, union. lostQuest gt13.
4. `general-solution` +5 (to 6) — one card per TYPE she names (K1): function alone
   (`2 sin x + 1 = 0`), same angle (`sin x = cos x` → tan), a quadratic in sin/cos with one
   root rejected, a co-function form (`sin(x + 30°) = cos 2x` → two cases, with the 90° − …
   trick), `sin(2x − 30°) = −½` (compound angle inside), and a "hence list the solutions in
   [−360°; 0°]" follow-on part on two of them. Memo: the type name first, reference angle,
   the quadrant cross (words), both families with `k ∈ ℤ`, then the listed values. lostQuest
   gt11 / gt12.
5. `level-4` NEW, 6 cards — the bank's ⭐ items, fresh: "cos 72° = k − 2: for which k is
   cos 18° non-real" (a quadratic inequality on a ratio — genuinely tests the [−1; 1] range);
   "given the general solution of sin θ = a·cos θ is θ = 49° + k·180°, show a = …"; the
   compound "product of two factors = −1 ⇒ both ±1" equation; an identity proof with a 9-mark
   difficulty (`cos θ/(1 − sin θ) = x ⇒ prove (1 − sin θ)/(1 + sin θ) = 1/x²` flavour);
   a reduction simplification whose answer must then be evaluated at a special angle without
   a calculator and shown equal to a surd; "for which x ∈ [0°; 360°] is `√(sin x·cos x)`
   real AND the expression defined" (two conditions). ≥1 level-4 part per card.

## Diagrams: none in these tiles (the unit-circle sketch is the learner's). A general-solution
reveal MAY draw the `trigg` graph with the solution points marked if it reads cleanly — optional.

## Archetype sources
`survey/SURVEY-Topic-Banks.md` §2 inventory (2024-Q3/Q5, 2025-Q2/Q5/Q8, 2026-Q2/Q5/Q9);
`SURVEY-Nov-P2.md` archetype 3 beats (iii)–(v); her Test 3 Q2–Q3, Test 5 Q5, Test 7 Q1 in
`SURVEY-Her-2025-Assessments.md`. Fresh numbers.

## Verify + report: per CONTENT-COMMON.md — shoot all five tiles, contact sheet per tile.
