# SESSION D1 — FUNCTIONS part 1 (`func`): sketch · intersection · average-gradient, Opus

Read `sessions/CONTENT-COMMON.md` first (it carries the /go block and every rule), then this.

## Where the chapter stands
The finished model chapter: 8 tiles × 6 cards, every card with a to-scale sketch from
`js/engine/function-graph.js`, THE REVEAL RULE (the reveal draws what it found) in force.
Read `js/exam/_schema.js`'s diagram section, `js/exam/function-diagram.js`, TWO sibling
files end to end (`func-siblings-shift.js`, `func-siblings-distances.js`) and `cards-func.js`.
Sibling session D2 builds reflections + level-4 + the ★ move at the same time — append your
lines under your three tiles only; re-read `cards-func.js` before each write and merge.

## You own
`js/exam/func-siblings-sketch.js`, `func-siblings-intersection.js`,
`func-siblings-average-gradient.js`, your lines in `js/exam/cards-func.js`, your blocks in
`verify-exam-modules.mjs`.

## Her method source
`C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\GR11-FUNCTIONS-NOTES-DIGEST.md`
— happy/sad parabola, "taking off / landing" exponential, the asymptote-first hyperbola
sketch, intercepts-then-TP order, the cut-lines-and-paint inequality method. Never mine its 4
flagged slips. Memo = her order of steps; esplain = her story.

## Tiles
1. `sketch` NEW, 6 cards — "Sketch the graph of … showing all intercepts with the axes,
   the turning point / asymptotes": a parabola in standard form (intercepts by factorising,
   TP by completing the square OR the axis formula — both under OR), a parabola in TP form,
   a hyperbola `a/(x + p) + q` (asymptotes first, then intercepts), an exponential
   `a·b^(x+p) + q` with "taking off"/"landing", a straight line + parabola on the same axes,
   AND the bank's "rough sketch from sign conditions only" (given a < 0, q > 0, p > 0 for
   `y = a(x + p)² + q` — no numbers; the reveal draws a representative curve with the
   features named, levels 2–3). lostQuest fn2 / fn3 / fn1.
   DIAGRAM RULE FOR THIS TILE: the sketch is the task, so the question side shows only a
   blank set of axes (like the exam's answer grid). Base spec = `{ type:"function", win:{…} }`
   with NO curves/points — `verifyFunction` accepts a curveless spec (checked by the foreman:
   curves and points are optional). The part's `question` highlight is `{}`; its `reveal`
   highlight carries EVERYTHING — `curves` (labelled), `points` (intercepts, TP, labelled,
   `on:` the curve index which counts from 0 because the base has no curves), `asymptotes`
   with captions. For the sign-conditions card the reveal curve is a representative one and
   the memo says so ("any curve with these features earns the marks").
2. `intersection` NEW, 6 cards — her original tile drawing had "[Intersection]" and it was
   never built: find where a line cuts a parabola (solve simultaneously, both points),
   where a line cuts a hyperbola (a quadratic after multiplying by (x + p)), a parabola and
   an exponential sharing a given point (find the unknown constant), "for which x is
   f(x) = g(x)" read off first then confirmed algebraically, the x-values where a
   horizontal line y = k cuts f, a "hence or otherwise solve f(x) > g(x)" follow-on (links to
   the inequalities tile, keep one). Both curves drawn on the question side with the
   intersection UNMARKED (bare-figure rule); the reveal adds the labelled points. lostQuest fn7.
3. `average-gradient` NEW, 6 cards — SAG Term 2 item 2: average gradient between two points
   on a parabola (compute both y-values first), on a hyperbola, on an exponential, between
   the y-intercept and the TP, "between x = 1 and x = 1 + h — simplify" (the algebraic
   version, level 3), and "the average gradient between A and B is 4 — find the x-coordinate
   of B". Question side: the curve with the two points marked but no chord; reveal draws the
   chord as a dashed `{kind:"line"}` through them, captioned with the gradient. lostQuest fn7.

## Sketch discipline (her "spend more to make the graphs look good")
Every spec is measured by `verifyFunction` at validation; every labelled point that names a
curve carries `on: <curve index>`; given asymptotes are captioned on the question side;
answers appear ONLY in `reveal`. Windows chosen so every feature is ≥ 0,5 units inside the
frame. Run `python tools/shoot.py func <tile>` for each tile and READ every crop: labels
through axes, a reveal that draws nothing, an axis letter under a curve, three crowded
x-labels — fix, re-shoot, then report.

## Archetype sources
`GR11-IEB-PAPER-BANK.md` archetypes 5/5b/10; `SURVEY-June.md` Q3/Q4 functions shapes; her
Test 4 Q3–Q4 and Test 6 Q5 in `SURVEY-Her-2025-Assessments.md`. Fresh numbers.

## Verify + report: per CONTENT-COMMON.md — shoot all three tiles, one contact sheet per
tile showing question → reveal for every card.
