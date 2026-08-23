# SESSION B — EXPONENTS & SURDS (`exp`), Opus

Read `sessions/CONTENT-COMMON.md` first (it carries the /go block and every rule), then this.

## Where the chapter stands
Four tiles exist with 12 cards cut from three seeded questions (`exp.fsm.t1q1`, `exp.cr.q1`,
`exp.nss.q1` — read those three modules and `cards-exp.js` so you never repeat a shape):
surds 4 · rationalise 2 · exponent-expressions 2 · exponential-equations 4. Today every tile
reaches 6, two tiles are new, and the Level 4 tile is born.

## You own
`js/exam/exp-siblings-rational-exponents-numeric.js`, `exp-siblings-exponent-expressions.js`,
`exp-siblings-exponential-equations.js`, `exp-siblings-surds.js`, `exp-siblings-rationalise.js`,
`exp-siblings-surd-proofs.js`, `exp-level4.js`, `js/exam/cards-exp.js` (append your makeCard
lines under each tile in the tile-map order; existing lines stay), your blocks in
`verify-exam-modules.mjs`. Nothing else.

## Tiles (ids from EXAM-BUILD-DAY.md)
1. `rational-exponents-numeric` NEW, 6 cards — no calculator: `9^(3/2)`, `8^(−2/3)`,
   `(2⁻¹ + 5⁻¹)⁻²`, `(0,25)^(−1/2)`, `√(16⁻¹)`-type, a product like `27^(2/3) · 4^(−1/2)`, a
   "write with a positive exponent then evaluate". SAG example 1 is exactly this shape.
   lostQuest es7.
2. `exponent-expressions` +4 (to 6) — her A2 "type 1: one term" (prime factors first) and A3
   "type 2: divorce" (common factor), A6 exponential fraction → LCD/KFC, a variable-exponent
   fraction (`3^(m+1) − 3^(m−1)` over `3^m`), an "express in terms of a and b" (`2^x = a,
   3^x = b` → `12^x`). lostQuest es3 (one-term) / es4 (divorce) — pick per card.
3. `exponential-equations` +2 (to 6) — her A12 same base ("guns and helmets"), A13 the
   k-substitution (`2^(2x) − 2^x − 2 = 0`, let k = 2^x, reject the negative k), one with a
   fraction base, one with `x` in two places needing a common factor first. lostQuest es8
   (or eq2 for the special-cases shape — choose the round that actually teaches the card).
4. `surds` +2 (to 6) — her A8–A10: simplify `√200 + √98 − √128`, `√108 + 12/√75` (stack
   the fraction), multiply binomial surds `(3 + √2)(3 − √2)`, a surd with a variable. lostQuest es5.
5. `rationalise` +4 (to 6) — her A11: monomial denominator, binomial conjugate, "write in the
   form a + b√3" and state a and b, a denominator with two surds, a fraction that must be
   rationalised THEN simplified. lostQuest es6.
6. `surd-proofs` NEW, 6 cards — her A16: "show that `(√8 + √2)/√2 = 3`", "show that
   `√(7 + 4√3) = 2 + √3`" (square both sides route under OR), the big-number difference-of-
   squares trick (fresh numbers — e.g. show `123456789² − 123456788 × 123456790 = 1` without a
   calculator), "prove `(√a + √b)² − (√a − √b)² = 4√(ab)`", a "which is bigger, √50 or 7?"
   reasoning item, a simplify-then-"is it rational or irrational". lostQuest es5.
7. `level-4` NEW, 6 cards — mixed and un-cued: an exponential equation needing a common factor
   AND the k-method; a "for which values of x is `√(x − 2)/(x − 5)` real / undefined" (her B10);
   a surd equation disguised inside an exponent question (`√(2^x + 7) = 2^x − 1` style — link
   to eqn's surd-equations tile but stay an exponents question); a `show that
   2^(n+2) + 2^n` is divisible by 5 for every natural n; a nested rational exponent with a
   negative base trap; a "solve for x: `x^(2/3) = 4`" with both roots and the check.

## THE ★ MOVE (her ruling today: levels 1–3 on normal tiles)
Session 0's level wall found ONE level-4 part on a normal exp tile: `exp.nss.q1` part d,
currently the card `exp.nss.q1.d` under `exponential-equations`. Move it: delete that makeCard
line, and append a makeCard line under your new `/* ---- level-4 ---- */` section in
`cards-exp.js` with an `intro` carrying whatever (a)–(c) gave it. Then remove `"exp"` from the
`L4_MOVE_PENDING` constant in `verify-exam.html` Part 13 so the wall is enforced for exp.
(`exponential-equations` then has 3 cards → bring it to 6, i.e. +3 not +2.)

## Method source
`METHODS-algebra.md` Part A (every one of A1–A16) — her names and her order are law in the
memo and the esplain. Her two open flags (the `√9 = ±3` box; two-roads ordering): the built
paper memos win — both roads under OR.

## Archetype sources
`GR11-IEB-PAPER-BANK.md` archetypes 1–3 (no-calculator opening block, surd equation, "show
that"); `survey/SURVEY-Her-2025-Assessments.md` Test 1 Q1–Q3 and Test 6 Q2; `SURVEY-June.md`
Q1 grab-bag; `SURVEY-Nov-P1.md` Papers A–C Q1. Fresh numbers always.

## Diagrams
None.

## Verify + report: exactly as CONTENT-COMMON.md says — shoot all seven tiles (text-only,
full-page shots) and one contact sheet per tile.
