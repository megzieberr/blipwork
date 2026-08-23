# SESSION C1 — EQUATIONS & INEQUALITIES part 1 (`eqn`): siblings for the seven existing tiles + the ★ move, Opus

Read `sessions/CONTENT-COMMON.md` first (it carries the /go block and every rule), then this.

## Where the chapter stands
Seven tiles, 18 cards, cut from nine seeded questions (`eqn.nor.q1–q5`, `eqn.km.t1q2`,
`eqn.fr.q1`, `eqn.ineq.t1q3`, `eqn.ineq.q2` — read all six modules and `cards-eqn.js` so you
never repeat a shape). Counts today: nature-chain 2 · k-equal-roots 3 · k-for-nature 1 ·
delta-in-p 3 · inequalities 5 · fraction-equations 2 · rational-exponents-k 2. A sibling
session (C2) builds quadratic-solving · surd-equations · simultaneous · level-4 at the same
time — do not touch those tiles; append your lines under yours (re-read `cards-eqn.js` before
each write and merge).

## You own
`js/exam/eqn-siblings-nature-chain.js`, `eqn-siblings-k-equal-roots.js`,
`eqn-siblings-k-for-nature.js`, `eqn-siblings-delta-in-p.js`, `eqn-siblings-inequalities.js`,
`eqn-siblings-fraction-equations.js`, `eqn-siblings-rational-exponents-k.js`, your lines in
`js/exam/cards-eqn.js`, your blocks in `verify-exam-modules.mjs`, and the `L4_MOVE_PENDING`
constant in `verify-exam.html` Part 13 (remove "eqn" when done — see THE ★ MOVE).

## THE ★ MOVE (her ruling today: levels 1–3 on normal tiles, every ★ goes to the Level 4 tile)
Some existing eqn cards carry level-4 parts (`delta-in-p`'s "prove real for all p" parts,
possibly others — find every `level: 4` part under `eqn` with a grep over `js/exam/eqn-*.js`).
For each: remove that part from its current card's `parts` list in `cards-eqn.js` (keep the
card valid — if the card becomes empty, delete the makeCard line) and hand the part to C2's
Level 4 tile by APPENDING a makeCard line under the `level-4` section of `cards-eqn.js` with
an `intro` that carries what the part leaned on (its equation, its Δ from the earlier part).
The source modules are NOT edited. Then remove `"eqn"` from `L4_MOVE_PENDING` and make Part 13
green for eqn. Report exactly which parts moved.

## Tiles — bring each to 6 (her methods: `METHODS-algebra.md` Part B)
1. `nature-chain` +4 — B11: write in standard form → Δ → read the nature; include an equation
   that must be cleared of a fraction first, one with a surd coefficient, one that is a
   disguised quadratic after expanding brackets, one where Δ is a perfect square ("rational
   AND unequal" — make them say both words). lostQuest eq8.
2. `k-equal-roots` +3 — B12: Δ = 0 for k, incl. one where k appears in two coefficients
   (quadratic in k), one "for which value of k does the line y = kx + 1 touch the parabola"
   (hidden equal-roots — a level 3). lostQuest eq8.
3. `k-for-nature` +5 — B12: non-real for which k (quadratic inequality in k — her B8 TIP Chips
   sketch in the memo), real for which k, "two distinct real roots", "roots are real and
   unequal and k is a natural number — list them", one with k in c and in b. lostQuest eq8.
4. `delta-in-p` (after the ★ move) — fill to 6 with level ≤ 3 versions: "show Δ = (p − 3)² + 4",
   "hence state the nature for all p", "for which p are the roots equal" (may be none — say
   why), "express Δ in terms of p" only. lostQuest eq8.
5. `inequalities` +1 and replace any thin card — her B8 (TIP Chips: roots, sketch, read the
   happy/sad bowl) and B9 (fractions: NEVER multiply by the denominator; bring to one side,
   LCD, critical values, number-line table). Add at least one rational inequality
   (`2/(x − 3) ≤ 1` type, her Test 6 Q1) and one with the answer in interval notation.
   lostQuest eq7.
6. `fraction-equations` +4 — B2: factorise denominators, the negative twin (x − 2 vs 2 − x),
   LCD, the restriction written FIRST (`x ≠ …`), a root that must be rejected against the
   restriction, a "no solution" case. lostQuest eq4.
7. `rational-exponents-k` +4 — A14 and the k-method (eq3): `x^(−2/3) = 4`, `(x + 1)^(3/2) = 8`,
   a repeated-bracket quadratic `(x² − x)² − 8(x² − x) + 12 = 0` with k = x² − x and the four
   roots, a `2^(2x) − 6·2^x + 8 = 0` shape (k = 2^x — cross-link with exp; keep one here),
   one where a k-root is rejected. lostQuest eq3 / es7 as fits.

## Archetype sources
`GR11-IEB-PAPER-BANK.md` archetype 3 (the "show that" escalation); her Test 1 Q2–Q4 and Test 6
Q1 in `SURVEY-Her-2025-Assessments.md`; `SURVEY-Nov-P1.md` Q1–Q2 shapes. Fresh numbers.

## Diagrams: none (the TIP Chips bowl is described in words in the memo; if the function
engine's `{kind:"parabola"}` gives a clean reveal sketch for an inequality you MAY add a
`type:"function"` diagram on the reveal side only — optional, not required).

## Verify + report: per CONTENT-COMMON.md — shoot all seven tiles, contact sheet per tile,
Part 13 green for eqn, and the list of moved ★ parts.
