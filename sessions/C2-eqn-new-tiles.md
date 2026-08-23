# SESSION C2 — EQUATIONS & INEQUALITIES part 2 (`eqn`): quadratic-solving · surd-equations · simultaneous · level-4, Opus

Read `sessions/CONTENT-COMMON.md` first (it carries the /go block and every rule), then this.

## Where the chapter stands
Seven tiles exist; sibling session C1 is filling them and moving the existing ★ parts into
the Level 4 tile by appending makeCard lines under the `level-4` section of `cards-eqn.js`.
You create the `level-4` section (put a clear `/* ---- level-4 ---- */` marker so C1 can
append under it) and the three new tiles. Re-read `cards-eqn.js` before every write; merge,
never clobber. Read the nine existing eqn modules + `cards-eqn.js` first so nothing repeats.

## You own
`js/exam/eqn-siblings-quadratic-solving.js`, `eqn-siblings-surd-equations.js`,
`eqn-siblings-simultaneous.js`, `eqn-level4.js`, your sections in `js/exam/cards-eqn.js`,
your blocks in `verify-exam-modules.mjs`.

## Tiles (her methods: `METHODS-algebra.md` Part B — B0 routing table, B1, B3–B6, A15)
1. `quadratic-solving` NEW, 6 cards — B0/B1: factorise (incl. (3x − 1)(x − 4) = 16 → standard
   form first), the quadratic formula to TWO decimal places (B5: the two lines you must
   show), completing the square to solve (B4, a = 1 and a ≠ 1), "product = 0" with a cubic
   disguise `(3^x − 27)(x² − 3) = 0`-type, and the SAG's own number-system item: "Given
   (2x² + 3x − 2)(x² − 3) = 0, solve for x when x ∈ ℕ / ℤ / ℚ / ℝ" (fresh coefficients). One
   "no real solution — say why" (B10's words). lostQuest eq1 / eq5 / eq6 per card.
2. `surd-equations` NEW, 6 cards — A15: `√(5x − 1) = 2x − 1` isolate → square → solve → CHECK
   (the false root rejected — the bank says this is in every single paper, 4–5 marks); one
   where both roots survive; one where NONE survives ("no solution"); one that must be
   isolated first (`√(x + 7) − x = 1`); one as a quadratic in √x; one "hence" pair with a
   restriction stated up front (`x ≥ …`). Trap card on every card: "a squared equation can
   invent a root — check BOTH in the original". lostQuest es8.
3. `simultaneous` NEW, 6 cards — B6: one linear + one quadratic; substitute from the linear;
   include a product form (xy = 6, x + y = 5), a circle-and-line (x² + y² = 25, y = x + 1),
   a "find the points of intersection of the line and the parabola" dressed as a functions
   sentence, one where the quadratic is in two variables (y = x² − 2x, 2x − y = 3), one with
   fractions. Answers as coordinate PAIRS; trap: "pair every x with ITS y". lostQuest eq6.
4. `level-4` NEW, 6 cards of your own (C1 appends the moved ★ parts after yours): an
   un-cued "prove the roots are real for all p" with a completing-the-square Δ; a
   `k`-question with two conditions ("real AND unequal AND the sum of the roots positive"); a
   simultaneous system whose quadratic needs the k-method; a surd equation inside a word
   problem (a rectangle whose sides involve √); "the equation x² + px + q = 0 has roots 3 and
   −5 — find p and q" then "for which k does x² + px + q = k have equal roots"; a rational
   inequality with two critical values from factorising, answer in interval notation. Every
   card: ≥1 level-4 part, lead-ins only if needed, all parts level 3–4.

## Archetype sources
`GR11-IEB-PAPER-BANK.md` archetypes 1–3; `survey/SURVEY-Nov-P1.md` Q1 blocks; her Test 1 Q2–Q3
and June P1 Q1 in `SURVEY-Her-2025-Assessments.md`; `SURVEY-June.md` Q1 grab-bag. Fresh.

## Diagrams: none required. (A simultaneous card MAY carry a `type:"function"` reveal sketch
showing the line cutting the parabola at the two found points — labelled dots — if it is
clean at 375 px; optional.)

## Verify + report: per CONTENT-COMMON.md — shoot all four tiles, contact sheet per tile.
