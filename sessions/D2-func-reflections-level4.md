# SESSION D2 — FUNCTIONS part 2 (`func`): reflections · level-4 · the ★ move, Opus

Read `sessions/CONTENT-COMMON.md` first (it carries the /go block and every rule), then this.

## Where the chapter stands
8 tiles × 6 sketched cards (the model chapter). Read `js/exam/_schema.js`'s diagram section,
`js/exam/function-diagram.js`, `func-siblings-shift.js` + `func-siblings-distances.js` end to
end, and `cards-func.js`. Sibling session D1 builds sketch · intersection · average-gradient
at the same time — append your lines under your tiles only; re-read `cards-func.js` before
each write and merge.

## You own
`js/exam/func-siblings-reflections.js`, `func-level4.js`, your sections in `js/exam/cards-func.js`
(create the `/* ---- level-4 ---- */` section), your blocks in `verify-exam-modules.mjs`, and
the `L4_MOVE_PENDING` constant in `verify-exam.html` Part 13 (remove "func" when done).

## THE ★ MOVE (her ruling today)
Grep every `level: 4` part in `js/exam/func-*.js`. For each: remove it from its current card's
`parts` list in `cards-func.js` (keep the card valid; if a tile drops below 6 cards, compose
ONE fresh level-≤3 card for that tile in a file `func-siblings-topup.js` to restore 6 — say
which), and append a makeCard line under `level-4` with an `intro` carrying what it leaned on
(the equations, the earlier results) and a `diagram` cut that keeps its own part entry (the
source's diagram follows the part automatically through makeCard — check the reveal still
draws its answer). Source modules are NOT edited. Then remove `"func"` from `L4_MOVE_PENDING`.
Report exactly which parts moved and where.

## Tiles
1. `reflections` NEW, 6 cards — her pp19–24 (digest): reflect a parabola in the x-axis
   (−f(x)), in the y-axis (f(−x)), a hyperbola about its own horizontal asymptote (the bank's
   archetype 10 — "reflect g about y = q"), an exponential in the y-axis (growth ↔ decay,
   "taking off" ↔ "landing"), "write the equation of the reflection then its new range", and
   the question backwards: two graphs given, describe the reflection + write it in function
   notation. Question side draws the ORIGINAL only (asymptotes captioned); the reveal adds the
   reflected curve in tone "b", labelled, with its own captioned asymptote where it has one.
   lostQuest fn6.
2. `level-4` NEW — 6 cards of your own plus the moved ★ parts (so 8–10 in the tile; fine):
   the real-world parabola wrapper (a drone path / archway / ball — find the max height, the
   width at a given height, the minimum clearance: the June Q4 capstone shape, fresh
   context, 6–7 marks across 2–3 dependent parts); "maximum vertical distance between f and
   g" built from the difference function (un-cued); "for which values of k will y = k cut f
   in two points with positive x-values"; "find the equation of the tangent line y = mx + c
   that touches the parabola at x = 2" (Δ = 0 route — Grade 11 legal, no calculus); a
   hyperbola-and-line distance "PQ = 5, find the x-value of P"; "the axis of symmetry of the
   hyperbola with positive gradient cuts the parabola at … — find the points" (two-graph
   fetch). Every card ≥1 level-4 part, lead-ins only if needed, all parts level 3–4, the ★ and
   the "bank the earlier marks first" line are derived by the player from level 4 — nothing
   to add by hand.

## Sketch discipline
As D1: `verifyFunction` measures every spec; answers only in `reveal`; every given line
captioned; a real-world parabola window chosen so the context reads (label axes in the
intro words — the engine labels x and y only). `python tools/shoot.py func <tile>` and READ
every crop before reporting.

## Archetype sources
`GR11-IEB-PAPER-BANK.md` archetypes 5, 9, 10; `SURVEY-June.md` Q4/Q9 max-distance and
real-world shapes; her Test 4 Q4 and Test 6 Q5 in `SURVEY-Her-2025-Assessments.md`. Fresh.

## Verify + report: per CONTENT-COMMON.md — shoot `reflections` and `level-4` (and any
topped-up tile), contact sheet per tile, Part 13 green for func, the list of moved ★ parts.
