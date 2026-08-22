/* ============================================================
   EXAM FOCUS — Functions · Graphs together
   SOURCE: September Test 1 (practice), QUESTION 5 — the parabola and
   the line: range, the longest vertical segment, and the sliding
   horizontal line. Two of its three parts are ★ level 4.
   (Overnight run #1, 2026-08-21.)
   ------------------------------------------------------------
   PRINT SOURCE:
     Desktop\Eksamen Vraestelle\Gr11 IEB Nov\Sept Practice\
       Sept-T1-Practice-QP.tex      Q5 stem + (a)–(c), TikZ sketch
       Sept-T1-Practice-Memo.tex    5(a)–5(c), 9 ticks, ★ on 5(b), 5(c)
       Sept-T1-blueprint.md         §1, §2 (answer chosen to be 9, not
                                    the 6,25 that appears in her notes)
   Same working, same ticks, same WATCH OUT / REMEMBER cards as print.

   THE SKETCH. As in js/exam/func-hyperbola-and-exponential.js, the
   printed question carries a to-scale TikZ graph; when this was written
   the schema had no diagram field yet, so the stem states the same
   facts in words instead — which is what the print memo's own \stam
   line does. Both equations were already printed in the QP's text (not
   only drawn), and A(−1 ; 0) is labelled on the sketch, so nothing was
   added or withheld by going words-only. The blueprint's diagram-leak
   check notes the printed PQ is deliberately drawn at x = 3,5, NOT at
   the maximum x = 2 — SESSION 1's `diagram` block below (2026-08-22)
   keeps exactly that discipline: f, g, A(−1 ; 0) and a bare "C" (no
   coordinates — the stem never gives them either) sit on the base
   figure, PQ is drawn at x = 3,5 as the SAME illustrative, non-maximal
   position print used, and the true maximum (at x = 2, length 9) only
   ever appears on (b)'s own reveal, replacing the illustrative segment.

   METHOD: GR11-FUNCTIONS-NOTES-DIGEST.md, hers — happy/sad, the range
   of a sad parabola runs down from its maximum, x = −b/(2a) then
   substitute back, vertical segment length = TOP graph minus BOTTOM
   graph → build the new (difference) parabola → take ITS turning point
   with x = −b/(2a). The digest's flagged slip #4 (her p58 uses a Grade
   12 derivative for max vertical distance) is NOT mined — the Gr11
   route is used throughout. Slip #1 (p54 f, the sign error on
   "2 real positive roots") is also not mined: 5(c)'s bounds are
   re-derived from the maximum and the y-intercept.

   LEVELS: blueprint splits (5(a) = 1·L2 + 1·L3; 5(b) = 2·L3 + 2·L4;
   5(c) = 1·L3 + 2·L4). One level per part → dominant chunk, ties broken
   down unless the part makes the learner fetch a method. 5(a) is
   formula-then-substitute, so it sits at 2. 5(b) and 5(c) are two of
   the print memo's three ★ parts, and the schema's level === 4 puts the
   amber star on exactly those two. ✓

   REGISTERED via js/exam/cards-func.js (imported there, folded into
   funcCards), which js/exam/index.js's REGISTRY.func picks up; func is
   in js/config.js's EXAM_CHAPTERS. (This note used to say ⚠️
   UNREGISTERED — that was true before cards-func.js wired it in;
   corrected session 3, 2026-08-23.)
   ============================================================ */

const PAPER = "sept-t1";

/* DIAGRAM (SESSION 1, 2026-08-22). f(x) = −x² + 6x + 7 (a sad
   parabola, TP(3 ; 16), y-intercept 7), g(x) = 2x + 2, A(−1 ; 0) and
   C(5 ; 12) — every number read from the memo above. The base figure
   carries only what the STEM itself gives: both equations (drawn as
   the real curves — always honest, same rule everywhere), A fully
   labelled, C as a bare letter (the stem names C but never its
   coordinates, and no part below asks for them either — so a bare dot
   matches the print sketch without adding information the words
   don't have), and PQ at x = 3,5 — the SAME illustrative, non-maximal
   position the print TikZ sketch used (see the header note). TP and
   the y-intercept are what (a) and (c) have to FETCH (their own memos
   say so — (c) is starred exactly because those two facts are nowhere
   in the question), so neither is on the base figure or on (c)'s
   question side — only (a)'s own reveal marks TP, and (c)'s reveal
   marks both, as confirmation after the numbers are already known. */
const FG_F = { kind: "parabola", a: -1, b: 6, c: 7 };
const FG_G = { kind: "line", a: 2, q: 2 };
const FG_A = { x: -1, y: 0, on: [0, 1], label: "A(−1 ; 0)" };
const FG_C = { x: 5, y: 12, on: [0, 1], label: "C" };
const FG_TP = { x: 3, y: 16, on: 0, label: "TP(3 ; 16)", place: "above" };
const FG_YINT = { x: 0, y: 7, on: 0, label: "(0 ; 7)" };
/* (c)'s answer, 7 < t < 16, is a BAND between two horizontal lines — the
   sliding line y = t may live between them and nowhere else. SESSION 2a-FIX
   draws both boundaries on (c)'s reveal, dashed and named, beside the two
   points that fix them ("the reveal draws what it found", js/exam/_schema.js). */
const FG_T_LINES = [
  { kind: "line", a: 0, q: 16, dash: true, tone: "c", label: "y = 16", labelAt: 6.6 },
  { kind: "line", a: 0, q: 7, dash: true, tone: "c", label: "y = 7", labelAt: -2 },
];
const FG_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -3, xmax: 8, ymin: -4, ymax: 18 },   // xmax 8, not 7: f cuts the x-axis at x = 7, which on a 7-wide window landed exactly on the axis arrowhead and its “x” letter (SESSION 1b)
    curves: [
      { ...FG_F, tone: "a", label: "f", labelAt: 5.5 },
      { ...FG_G, tone: "b", label: "g", labelAt: -2.3 },
    ],
    points: [FG_A, FG_C],
    segment: { x: 3.5, fromCurve: 0, toCurve: 1, label: "PQ" },   // illustrative — print's own x, not the answer
  },
  parts: {
    a: { question: {}, reveal: { points: [FG_TP] } },             // TP is (a)'s own answer
    b: {
      question: {},                                               // base PQ (x=3,5) is enough
      reveal: { segment: { x: 2, fromCurve: 0, toCurve: 1, label: "PQ" } },  // the true maximum — reveal only
    },
    c: { question: {}, reveal: { points: [FG_TP, FG_YINT], curves: FG_T_LINES } },   // both facts confirmed AND the band they bound — reveal only
  },
};

const t1q5 = {
  id: "func.gt.t1q5",
  chapter: "func",
  topic: "graphs-together",
  archetype: "parabola-and-line-max-segment-plus-sliding-line",
  paper: PAPER,
  diagram: FG_DIAGRAM,
  // fn7 "Graphs together — Intersections, f vs g, nature of roots,
  // average gradient, max length." Every skill this question needs is
  // named in that round's own blurb.
  lostQuest: { chapter: "func", quest: "fn7" },
  marks: 9,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "f(x) = −x² + 6x + 7 &nbsp;and&nbsp; g(x) = 2x + 2. The two graphs cut each other at A(−1 ; 0) and at C. A is also the x-intercept of both graphs.<br>PQ is a line segment drawn parallel to the y-axis, with P on f and Q on g, and with PQ lying between A and C.<br><br>Determine the range of f.",
      },
      hint: {
        en: "Look at the sign of a first — that tells you whether this parabola is happy or sad, and therefore whether the range runs upwards or downwards. Then you need the one y-value it turns at.",
      },
      memo: [
        { type: "step", text: { en: "a = −1 &lt; 0, so f is a <b>sad</b> parabola: it has a maximum, and the range runs from that maximum downwards. So find the turning point." } },
        { type: "step", text: { en: "x = −b/(2a) = −6/(2(−1)) = 3 &nbsp;&nbsp;⟹&nbsp;&nbsp; y = −(3)² + 6(3) + 7 = −9 + 18 + 7 = 16 &nbsp;&nbsp;TP (3 ; 16)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ y ≤ 16" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the range is a statement about y, so it must be written in y. Writing x ≤ 16 here scores nothing.",
        } },
      ],
      esplain: {
        en: "Range means “which y-values does this graph actually reach”. A parabola only ever turns once, so its turning point is the ceiling or the floor of everything it does — and which of the two depends entirely on the sign of a. Here a is negative, so the arms point down: the graph climbs to the turning point and then falls away forever, which makes that y-value the highest it ever gets and everything below it reachable. So the range is “y less than or equal to the turning y-value”. Notice you only need the y of the turning point for a range question — the x is just the road you travel to get there.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 4,
      prompt: {
        en: "Determine the maximum length of PQ.",
      },
      hint: {
        en: "PQ is vertical, so its length is one graph's y-value minus the other's — top minus bottom. Write that difference down as a single new expression and look at what kind of graph it is.",
      },
      memo: [
        { type: "step", text: { en: "PQ is vertical, so its length is simply <b>top graph minus bottom graph</b>. Between A and C the parabola is on top." } },
        { type: "step", text: { en: "PQ = f(x) − g(x)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (−x² + 6x + 7) − (2x + 2) = −x² + 4x + 5" }, ticks: ["ca"] },
        { type: "step", text: { en: "That is a brand-new sad parabola, so the longest PQ sits at <i>its</i> turning point:" } },
        { type: "step", text: { en: "x = −b/(2a) = −4/(2(−1)) = 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "PQ = −(2)² + 4(2) + 5 = −4 + 8 + 5 = 9 &nbsp;&nbsp;∴&nbsp; maximum PQ = 9 units" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: length is never negative. If you subtract the wrong way round you get x² − 4x − 5 and a <i>minimum</i> of −9 — the minus sign is the warning that the graphs were the wrong way round.",
        } },
      ],
      esplain: {
        en: "The fact you have to fetch here is that the gap between two graphs is itself a graph. PQ is not a fixed length; it depends on where you draw it, so write it as a formula in x — f(x) minus g(x) — and suddenly you are holding a brand-new parabola whose height at every x IS the length of PQ there. Finding the longest PQ is then just finding that new parabola's maximum, which is the same x = −b/(2a) move you have used all year. Two cautions. First, top minus bottom, in that order, or your “length” comes out negative. Second, do not go hunting for a Grade 12 tool — the difference parabola plus −b/(2a) is all this needs. Bank the earlier marks first: finish (a) and everything in Questions 1 to 4 before you sit down with this one.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: {
        en: "Determine the value(s) of t for which the equation f(x) = t will have two unequal <b>positive</b> roots.",
      },
      hint: {
        en: "f(x) = t is a horizontal line y = t sliding up and down across f, and the roots are where it cuts. Ask the question twice: how high may the line go before it stops cutting twice, and how low may it drop before one of the cuts crosses to the left of the y-axis?",
      },
      memo: [
        { type: "step", text: { en: "f(x) = t is the horizontal line y = t sliding up and down across f. The roots are where that line cuts the parabola, so the question is really: <i>where must the line sit?</i> Two conditions, one at a time." } },
        { type: "step", text: { en: "<b>Two unequal roots.</b> The line must cut f twice, so it has to stay below the maximum: &nbsp;t &lt; 16" }, ticks: ["s/f"] },
        { type: "step", text: { en: "<b>Both roots positive.</b> Both cutting points must lie to the right of the y-axis. f cuts the y-axis at f(0) = 7, so the line has to sit <i>above</i> that: &nbsp;t &gt; 7" }, ticks: ["ca"] },
        { type: "step", text: { en: "At t = 7 exactly, one root is x = 0 — and zero is not positive. Below 7, one root turns negative." } },
        { type: "answer", text: { en: "∴ 7 &lt; t &lt; 16" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the two facts you needed — the maximum 16 and the y-intercept 7 — are nowhere in the question. On a starred part, that is always the job: work out what the sketch knows before you try to answer.",
        } },
      ],
      esplain: {
        en: "Do not solve −x² + 6x + 7 = t for x here; picture it instead. The equation f(x) = t is asking where a flat line at height t meets the curve, so slide that line in your head. Up at the very top, at the turning point, the line touches once — that is equal roots, not two unequal ones — and above that it misses entirely, so t has to stay under 16. Now slide it down. As the line drops, the left-hand cut travels left, and the moment the line passes through the y-intercept at 7 that left cut lands exactly on x = 0. Zero is not positive, so 7 is out and anything lower is worse. Squeeze the two conditions together and the line has to live strictly between them. Both numbers, 16 and 7, had to be worked out from the equation of f — the question never handed you either one, which is precisely why this part carries the star.",
      },
    },
  ],
};

export const funcGraphsTogetherQuestions = [t1q5];
