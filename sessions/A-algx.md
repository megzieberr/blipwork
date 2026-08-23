# SESSION A — ALGEBRAIC EXPRESSIONS (new exam-only chapter `algx`), Opus

Read `sessions/CONTENT-COMMON.md` first (it carries the /go block and every rule), then this.

## Why this chapter exists (her words today)
"I have over 20 learners, some are 80-percenters but some are still barely getting 30%, and
since algebraic expressions is in their scope, that is exactly where the low achievers will
need to get their marks." Sept T1 (11 Sep) names "algebraic expressions" FIRST. This is Grade
10 revision inside a Grade 11 paper: products, factorising, algebraic fractions. Make it
kind, thorough, and exam-true.

## You own
`js/exam/algx-siblings-expand.js`, `algx-siblings-factorise-basics.js`,
`algx-siblings-factorise-advanced.js`, `algx-siblings-fractions-multiply-divide.js`,
`algx-siblings-fractions-add-subtract.js`, `algx-level4.js`, `js/exam/cards-algx.js` (Session 0
created it empty — fill it), your blocks in `verify-exam-modules.mjs`. Nothing else.

## Tiles (ids from EXAM-BUILD-DAY.md) — 6 cards each, Level 4 tile 6–8
1. `expand` — Expand & simplify: binomial × trinomial, squares of binomials (incl. a fraction
   term), difference of two squares in one line, products with a negative in front, a
   "simplify then evaluate without a calculator" item, an expression with surds inside a
   product (links to exp).
2. `factorise-basics` — common factor (incl. a negative common factor and a common BRACKET),
   difference of two squares (incl. 4x² − 9y², and a (x+1)² − 4 style), trinomials with a = 1
   and a ≠ 1 (her Grade 11s call the a ≠ 1 route "the product-sum / split the middle term" —
   use the textbook split-the-middle-term method and show the "trial" OR route).
3. `factorise-advanced` — grouping in pairs, sum & difference of cubes (incl. 27x³ + 1 and
   x⁶ − 8), a trinomial disguised as a quadratic in x² or in (x+2), a combined
   common-factor-then-DOTS, a "factorise completely" chain.
4. `fractions-multiply-divide` — simplify one fraction by factorising top and bottom
   (state restrictions), multiply two, divide by a fraction (flip), a (a−b) = −(b−a) twist,
   always "state the value(s) of x for which the expression is undefined" on at least two cards.
5. `fractions-add-subtract` — LCD with monomial denominators, with binomial denominators
   (one must be factorised first), the negative-twin denominator (x − 2 vs 2 − x), three
   terms, a mixed "simplify" with a whole number, and restrictions stated.
6. `level-4` — mixed: a factorise with a disguised cube or a grouped DOTS that needs two
   ideas; a fraction simplification where the final answer must be used to evaluate a huge
   number without a calculator (the bank's "987654328² − 987654326 × 987654330" flavour,
   fresh numbers); a "show that" identity; a "for which values of x is the expression
   undefined / equal to zero" that needs factorising both; a simplify-then-solve.

## Method source
Her algebra notes (`METHODS-algebra.md`) cover exponents/equations, NOT Grade 10 factorising —
read Part 0 (universal rules: the `∴` habit, the four "no answer" words, answer presentation)
and Part A4/A6 (her "divorce" = take out the common factor; KFC = factorise, cancel) and use
that voice. Method itself = standard CAPS Grade 10 textbook. Every restriction is written as
`x ≠ …` BEFORE simplifying (her marking cue: the restriction tick is lost if it appears after
cancelling).

## lostQuest
Exam-only chapter, no drill rounds: every question uses
`{ chapter: "algx", quest: "PENDING-algx-is-exam-only-no-drill-round" }` (same mechanism as
euclid — no button ever renders; documented in your module headers).

## Diagrams
None in this chapter.

## Archetype sources
`survey/SURVEY-Her-2025-Assessments.md` §1 Test 1 (her own cycle test) and §2 style canon;
`SURVEY-June.md` Q1 grab-bag shapes; the SAGs Grade 10 Term 1 content (pp 33–35 of
`27. MATHEMATICS SAGs 2026 (Updated August 2025).pdf` in the Gr11 IEB Nov folder) for the exact
Grade 10 list. Marks per part 1–4; a card 2–6 marks.

## Verify + report: exactly as CONTENT-COMMON.md says. `python tools/shoot.py algx <tile>`
for all six tiles (text-only, full-page shots) and one contact sheet per tile.
