# SESSION E — TRIG GRAPHS (`tgraph`), new in Exam Focus, Opus

Read `sessions/CONTENT-COMMON.md` first (it carries the /go block and every rule), then this.

## Why
Sept T2 (14 Sep) says "trigonometry, functions, Euclidean geometry" and nobody can confirm
whether "functions" means trig graphs — so both are built. Her 2025 Sept P2 had 10 marks of
trig graphs. Trig graphs are assessed in Paper 2 only, **max two parameters varied at a time**
(SAG — hard scope wall): `y = a sin(k(x + p)) + q`-family questions never vary more than two
of a, k, p, q.

## Where the chapter stands
The `tgraph` quest chapter exists (rounds tg1–tg7, engine `js/engine/trig-graph.js`,
`js/tgraphlib.js`); Exam Focus has NO tgraph content yet. Session 0 wired `type:"trigg"` specs
into the exam diagram slot (`js/exam/trig-diagram.js` — read it and the engine header: `win`
in degrees, `curves:[{fn:"sin"|"cos"|"tan", a, b, p, q, label, labelAt}]`, `points`,
`midline`, `hmeasure`/`vmeasure`, `showAsym`, and the additive `shades`/`vlines`/`hlines`
for reveals). `cards-tgraph.js` exists empty — you fill it.

## You own
`js/exam/tgraph-siblings-period-amplitude-range.js`, `tgraph-siblings-read-parameters.js`,
`tgraph-siblings-sketch.js`, `tgraph-siblings-intersections-inequalities.js`,
`tgraph-siblings-shift-reflect.js`, `tgraph-level4.js`, `js/exam/cards-tgraph.js`, your
blocks in `verify-exam-modules.mjs`.

## Tiles
1. `period-amplitude-range` — HER EXPLICIT ASK: "one round where it only asks for the period,
   amplitude and range for different trig equations — just the equations, no sketch. The kids
   really struggle with that." 6 cards, each card = 3 equations as parts (a)(b)(c), each part
   "Write down the period, the amplitude and the range of …" (3 marks: one per fact; tan
   parts: period + range only, "amplitude: none" — 2 marks, and say why). Cover her worksheet's
   mix with FRESH equations: `cos 3x`, `cos(x + 60°)`, `cos x + 2`, `−½ cos x`, `sin 2x`,
   `sin(x − 45°)`, `tan x − 1`, `−2 tan 2x`, `−3 cos ½x`, `4 sin x + 2`, `2 tan 3x + 3` are the
   SHAPES — change the numbers, keep the shapes, obey the two-parameter wall. Memo: the three
   facts with the rule that produced each (period = 360°/k, amplitude = |a|, range
   [q − |a|; q + |a|]); the trap: "a negative a flips the graph, the amplitude stays positive".
   NO diagram on the question side; the REVEAL may draw the graph (one period, midline
   dashed, `vmeasure` for amplitude, `hmeasure` for period) — do it, it is exactly the
   reveal-draws-what-it-found rule. lostQuest tg3.
2. `read-parameters` — 6 cards: a sketch is GIVEN (one or two curves, key points marked), find
   a and k / a and p / a and q / k and p (never more than two unknowns per curve), write the
   equation, state the range, "write down the coordinates of the turning point marked P".
   Question side: the curve(s) with the labelled points the exam would give (a peak, an
   x-intercept, the y-intercept); reveal: the equation as the curve label, midline/asymptote
   captions. lostQuest tg6.
3. `sketch` — 6 cards: "Sketch f(x) = … for x ∈ [−180°; 180°], showing intercepts, turning
   points and asymptotes" (sin, cos, tan, with two parameters max), one "on the same set of
   axes sketch f and g". Question side = blank degree axes (curveless base spec — allowed);
   reveal = the curve(s), intercepts and TPs as labelled points, tan asymptotes shown and
   captioned. lostQuest tg2 / tg4 / tg5.
4. `intersections-inequalities` — 6 cards: two curves given, A and B marked, "write down the
   coordinates of B", "for which x is f(x) ≥ g(x)" (reveal: a `shades` strip between captioned
   `vlines`), "for which x is f(x)·g(x) < 0", "for which x is f increasing while g decreases",
   "how many solutions does f(x) = g(x) have in [−360°; 360°]", "the period of f and the
   amplitude of g". lostQuest tg7.
5. `shift-reflect` — 6 cards: "g is f shifted 30° left — write g(x)", "h is f reflected in
   the x-axis then moved 1 up", "describe the transformation from f to g" backwards, "write
   the equation of the cosine graph as a sine graph" (the 90° shift — one card), "the range
   of 2f(x) − 1". Question side: the original only; reveal: the new curve in tone "b",
   labelled. lostQuest tg4 / tg2.
6. `level-4` — 6 cards: read TWO unknown parameters from an intersection point given with
   decimals (A(48,19°; ⅓) style — fresh); "given the general solution of f(x) = g(x) is
   x = … + k·180°, show the constant"; a shifted-graph equation that must be written in two
   equivalent forms; an inequality over a window with a tan asymptote inside it; "the length
   of the vertical segment between f and g at x = …, then the maximum such length" (needs
   amplitude reasoning); "for which values of k does y = k cut f exactly three times in the
   window". ≥1 level-4 part per card.

## Sketch discipline
Every spec is measured by `verifyTrig`; every point that names a curve carries `on:`;
two-parameter wall on every curve; windows in degrees with `xstep` chosen so peaks land on
ticks (90°/45°/30°); captions use the real minus. `python tools/shoot.py tgraph <tile>` and
READ every crop at 375 px: degree labels must not pile up, a captioned vline must not sit on
an axis label, the shade must end exactly at the cut lines. Note the `tgraph` chapter is
eligible in `?local=1` only if one of its rounds is open for the demo learner — if shoot.py
lands on the hub, open the rounds in the local admin (`admin.html?local=1`) or report it.

## Archetype sources
`survey/SURVEY-Topic-Banks.md` §2 (the graph items 2025-Q4/Q6/Q9, 2026-Q3/Q6/Q7/Q10);
`SURVEY-Nov-P2.md` archetype 3's closing graph question; her Test 5 Q3 and Test 7 Q2. Fresh.

## Verify + report: per CONTENT-COMMON.md — shoot all six tiles; contact sheet per tile with
question → reveal for every card.
