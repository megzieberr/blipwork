/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill "distances"
   (SESSION 2b of the four-session function-diagram build, 2026-08-22.)
   ------------------------------------------------------------
   Five new cards, taking this tile from ONE to six. It was the thinnest
   tile in the chapter: the only card on it was func.gt.t1q5(a,b), so
   "Another one!" ran out on the very first tap.

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   Her pp40–45 — horizontal, vertical and diagonal distance; vertical
   segment lengths between two graphs as TOP minus BOTTOM; the maximum
   or minimum length found by building the difference parabola and
   taking ITS turning point — plus her p10 for a hyperbola's "TP" points
   (p ± √a ; q ± √a) and the minimum distance between the branches.
   Types and methods hers; every number here is fresh.

   NO DERIVATIVES ANYWHERE. The digest's flagged slip #4 records that
   her p58 reaches for M′ = 0 to find a maximum vertical distance; that
   is a Grade 12 tool and it is NOT mined. Every max and min in this
   file is found the Grade 11 way — build the difference, notice it is
   a parabola, take xTP = −b/(2a) and substitute back. Slip #3, her
   p41's sloppy "AB² = yB² + xA²", is likewise not mined: q1 uses the
   true rule, AB² = (Δx)² + (Δy)².

   WHAT THE FIVE COVER:
     q1  horizontal, then vertical, then diagonal by Pythagoras — the
         three distances between two points on one parabola
     q2  the vertical segment between two graphs at a GIVEN x, twice
         over, with the graphs swapping which one is on top
     q3  the MAXIMUM length of that segment, via the difference
         parabola
     q4  the MINIMUM length, between two graphs that never meet —
         the same method with the difference happy instead of sad
     q5  a hyperbola's two "TP" points and the shortest distance
         between its branches

   THE SEGMENT SITS AT AN ILLUSTRATIVE x ON THE QUESTION SIDE, and only
   moves to its true position on the reveal — the discipline
   js/exam/func-graphs-together.js already uses, and the wider "the
   reveal draws what it found" rule in js/exam/_schema.js. Where the
   question itself names the x, as in q2, the drawn segment sits at
   THAT x, because there the position is given and only the length is
   being asked for.

   ONE JUDGEMENT CALL, recorded for review: the function engine can
   draw a VERTICAL segment between two curves, but it has no
   diagonal-segment primitive. So q1(c)'s reveal draws the straight
   LINE through A and B, dashed and named AB, together with the two
   legs of the right-angled triangle whose hypotenuse it is — which is
   exactly the picture her p41 draws beside the rule.

   LEVELS: mostly 1–2, exactly one level 3 — q4(b), the minimum, which
   is the only part where the difference has to be recognised as a
   HAPPY parabola and the answer argued as a floor. Nothing here is
   level 4.
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — HORIZONTAL, VERTICAL, DIAGONAL (her pp40–45, and the true
   Pythagoras rule, not her p41 slip).
   f(x) = x² − 4, with A(−3 ; 5) and B(2 ; 0) on it.
     (a) horizontal = |2 − (−3)| = 5
     (b) vertical   = |0 − 5|    = 5
     (c) AB² = 5² + 5² = 50 ⟹ AB = √50 = 5√2 ≈ 7,07
   --------------------------------------------------------------- */
const Q1_F = { kind: "parabola", a: 1, b: 0, c: -4 };
const Q1_A = { x: -3, y: 5, on: 0, label: "A(−3 ; 5)" };
const Q1_B = { x: 2, y: 0, on: 0, label: "B(2 ; 0)" };
/* the horizontal through A — the top edge of the right-angled triangle,
   and the second curve the vertical leg is measured to */
const Q1_TOP = { kind: "line", a: 0, q: 5, dash: true, tone: "c" };
const Q1_AB = { kind: "line", a: -1, q: 2, dash: true, tone: "b", label: "AB", labelAt: -1 };
const Q1_LEG = { x: 2, fromCurve: 0, toCurve: 1, label: "5" };
const Q1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -6, xmax: 5, ymin: -6, ymax: 10 },
    curves: [{ ...Q1_F, tone: "a", label: "f", labelAt: 3.3 }],
    points: [Q1_A, Q1_B],
  },
  parts: {
    a: { question: {}, reveal: { vlines: [{ x: -3 }, { x: 2 }], shades: [{ x0: -3, x1: 2 }] } },
    b: { question: {}, reveal: { curves: [Q1_TOP], segment: Q1_LEG } },
    c: { question: {}, reveal: { curves: [Q1_TOP, Q1_AB], segment: Q1_LEG } },
  },
};

const q1 = {
  id: "func.sib.dist.q1",
  chapter: CH,
  topic: "distances",
  archetype: "horizontal-vertical-and-diagonal-distance-between-two-points-on-a-curve",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 4. &nbsp;The points A(−3 ; 5) and B(2 ; 0) both lie on f.<br><br>Write down the horizontal distance between A and B.",
      },
      hint: {
        en: "Horizontal means across, so only the x-coordinates matter. Count from one to the other — and remember a distance is never negative.",
      },
      memo: [
        { type: "answer", text: { en: "horizontal distance = &nbsp;2 − (−3) = 5 units" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Across means x, up and down means y — that is the whole idea, and it is worth saying to yourself before every distance question so that you reach for the right pair of numbers. Going from x = −3 to x = 2 you take five steps to the right, so the horizontal distance is 5. Subtracting in the other order would give −5, which is fine as a direction but not as a distance, because a length can never be negative. If you are ever unsure which way round to subtract, do it either way and drop the sign.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: {
        en: "Write down the vertical distance between A and B.",
      },
      hint: {
        en: "Vertical means up and down, so this time only the y-coordinates matter.",
      },
      memo: [
        { type: "answer", text: { en: "vertical distance = &nbsp;5 − 0 = 5 units" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Same idea, other axis. A is 5 above the x-axis and B is sitting on it, so the gap between their heights is 5. It happens to be the same number as the horizontal distance in this question, which is a coincidence of the points chosen — it makes the triangle in the next part a nice square-cornered one, but do not expect the two to match in general. Notice also that neither of these two answers needed the equation of f at all. Once you have been handed the coordinates of two points, the curve they sit on stops mattering; distance is a question about the points.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence determine the length of AB. Leave your answer in simplest surd form.",
      },
      hint: {
        en: "Your two answers so far are the two short sides of a right-angled triangle, and AB is the slanted side across from the right angle. Use Pythagoras — and simplify the surd at the end rather than reaching for a decimal.",
      },
      memo: [
        { type: "step", text: { en: "The horizontal and the vertical distances are the two short sides of a right-angled triangle, and AB is the hypotenuse:" } },
        { type: "step", text: { en: "AB² = (Δx)² + (Δy)² = (5)² + (5)² = 25 + 25 = 50" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "AB = √50 = √25·√2 = 5√2 units &nbsp;&nbsp;≈ 7,07 units" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: √50 is not 25. Take the square root at the very end, and split off the biggest perfect square inside — 50 = 25 × 2, so √50 = 5√2.",
        } },
      ],
      esplain: {
        en: "The distance between two points is Pythagoras wearing a different hat. Drop a vertical line from the higher point and run a horizontal line from the lower one, and the two meet at a right angle — so the straight-line distance between them is the hypotenuse of that triangle, and its two short sides are exactly the horizontal and vertical distances you already have. That is where AB² = (Δx)² + (Δy)² comes from, and it is worth remembering the picture rather than the formula, because the picture cannot be misremembered. Two habits to keep. Square first, add, and only then take the root — squaring after adding gives nonsense. And simplify the surd: pull out the largest perfect square hiding inside, so √50 becomes 5√2. A decimal is fine as an extra, but the exact answer is the one the marks are for.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — THE VERTICAL SEGMENT AT A GIVEN x (her pp40–45, top − bottom).
   f(x) = −x² + 4x + 12 and g(x) = 2x + 4 cut each other at (−2 ; 0)
   and (4 ; 12).
     (a) at x = 1:  f(1) = 15, g(1) = 6  ⟹ PQ = 9
     (b) at x = 5:  f(5) = 7,  g(5) = 14 ⟹ the LINE is on top now,
                    so the length is 14 − 7 = 7
   The position is given by the question, so the drawn segment sits at
   that x on the question side; only the length is being asked for.
   --------------------------------------------------------------- */
const Q2_F = { kind: "parabola", a: -1, b: 4, c: 12 };
const Q2_G = { kind: "line", a: 2, q: 4 };
const Q2_PA = { x: -2, y: 0, on: [0, 1], label: "(−2 ; 0)", place: "aboveLeft" };   // clear of f and g (foreman review fix, 2026-08-23)
const Q2_PB = { x: 4, y: 12, on: [0, 1], label: "(4 ; 12)" };
const Q2_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 8, ymin: -8, ymax: 19 },
    curves: [
      { ...Q2_F, tone: "a", label: "f", labelAt: 6.2 },
      { ...Q2_G, tone: "b", label: "g", labelAt: 6.2 },
    ],
    points: [Q2_PA, Q2_PB],
    segment: { x: 1, fromCurve: 0, toCurve: 1, label: "PQ" },
  },
  parts: {
    a: { question: {}, reveal: { segment: { x: 1, fromCurve: 0, toCurve: 1, label: "PQ = 9" } } },
    b: {
      question: { segment: { x: 5, fromCurve: 0, toCurve: 1, label: "PQ" } },
      reveal: { segment: { x: 5, fromCurve: 0, toCurve: 1, label: "PQ = 7" } },
    },
  },
};

const q2 = {
  id: "func.sib.dist.q2",
  chapter: CH,
  topic: "distances",
  archetype: "vertical-segment-between-two-graphs-at-a-given-x-top-minus-bottom",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "The sketch shows &nbsp;f(x) = −x² + 4x + 12&nbsp; and&nbsp; g(x) = 2x + 4, cutting each other at (−2 ; 0) and (4 ; 12). PQ is a line segment parallel to the y-axis, with P on f and Q on g.<br><br>Determine the length of PQ when &nbsp;x = 1.",
      },
      hint: {
        en: "PQ is vertical, so its length is one height minus the other. Work out both heights at x = 1 first, then take the smaller one away from the bigger one.",
      },
      memo: [
        { type: "step", text: { en: "PQ is vertical, so its length is <b>top graph minus bottom graph</b>. Work out both heights at x = 1:" } },
        { type: "step", text: { en: "f(1) = −(1)² + 4(1) + 12 = −1 + 4 + 12 = 15" }, ticks: ["s/f"] },
        { type: "step", text: { en: "g(1) = 2(1) + 4 = 6" }, ticks: ["ca"] },
        { type: "answer", text: { en: "between the two cutting points the parabola is on top, so &nbsp;PQ = f(1) − g(1) = 15 − 6 = 9 units" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: length is never negative. Subtracting the wrong way round here gives −9, and the minus sign is the warning that the two graphs were taken in the wrong order.",
        } },
      ],
      esplain: {
        en: "A vertical segment is the simplest distance there is, because the two ends have the same x — so the horizontal part of Pythagoras is zero and all that is left is the difference in heights. That is why you never need the distance formula for one of these: work out both y-values and subtract. The only decision is which way round, and the picture settles it. Between the two crossing points the parabola is arching above the line, so f is the top and g is the bottom, and top minus bottom keeps the answer positive. Notice that x = 1 sits between −2 and 4, which is how you know you are in that region without having to guess.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the length of the vertical segment between f and g when &nbsp;x = 5.",
      },
      hint: {
        en: "Work out both heights again — but before you subtract, check the sketch to see which graph is on top out there. It is not the same one as in (a).",
      },
      memo: [
        { type: "step", text: { en: "f(5) = −25 + 20 + 12 = 7 &nbsp;&nbsp;and&nbsp;&nbsp; g(5) = 2(5) + 4 = 14" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x = 5 is past the crossing at x = 4, so the LINE is on top here: &nbsp;length = g(5) − f(5) = 14 − 7 = 7 units" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: “top minus bottom” is not a fixed formula like f − g. Which graph is on top changes at every crossing point, so check the picture before you decide the order.",
        } },
      ],
      esplain: {
        en: "This is the same question as (a), moved to the other side of a crossing, and that is the whole point of asking it twice. At a crossing the two graphs are level, and immediately afterwards they swap over — so the graph that was on top is now underneath. Past x = 4 the parabola is falling away steeply while the line keeps climbing, so g is the top one out there and the subtraction has to be turned around. The safe habit is not to memorise f − g, but to ask two questions every time: which x am I at, and which graph is drawn higher there. If you ever end up with a negative length, you have not made an arithmetic mistake — you have simply subtracted in the wrong order, and the fix is to swap them.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — THE MAXIMUM LENGTH, via the difference parabola (her pp40–45,
   and NOT her p58 derivative).
   f(x) = −x² + 5x + 15 and g(x) = x + 3 meet at (−2 ; 1) and (6 ; 9).
     PQ = f(x) − g(x) = −x² + 4x + 12, a SAD parabola
     xTP = −4/(2(−1)) = 2  ⟹  PQ = −4 + 8 + 12 = 16
     P is then (2 ; 21).
   The drawn segment sits at the illustrative x = 4, where PQ is only
   12 — never at the answer — and moves to x = 2 on the reveal.
   --------------------------------------------------------------- */
const Q3_F = { kind: "parabola", a: -1, b: 5, c: 15 };
const Q3_G = { kind: "line", a: 1, q: 3 };
const Q3_A = { x: -2, y: 1, on: [0, 1], label: "A(−2 ; 1)" };
const Q3_B = { x: 6, y: 9, on: [0, 1], label: "B(6 ; 9)" };
const Q3_P = { x: 2, y: 21, on: 0, label: "P(2 ; 21)", place: "above" };
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 8, ymin: -6, ymax: 24 },
    curves: [
      { ...Q3_F, tone: "a", label: "f", labelAt: 4.5 },
      { ...Q3_G, tone: "b", label: "g", labelAt: 7.5 },
    ],
    points: [Q3_A, Q3_B],
    segment: { x: 4, fromCurve: 0, toCurve: 1, label: "PQ" },   // illustrative, not the answer
  },
  parts: {
    a: { question: {}, reveal: { segment: { x: 2, fromCurve: 0, toCurve: 1, label: "PQ = 16" } } },
    b: {
      question: {},
      reveal: { points: [Q3_P], segment: { x: 2, fromCurve: 0, toCurve: 1, label: "PQ = 16" } },
    },
  },
};

const q3 = {
  id: "func.sib.dist.q3",
  chapter: CH,
  topic: "distances",
  archetype: "maximum-vertical-segment-via-the-difference-parabola",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "The sketch shows &nbsp;f(x) = −x² + 5x + 15&nbsp; and&nbsp; g(x) = x + 3, cutting each other at A(−2 ; 1) and B(6 ; 9). PQ is a line segment parallel to the y-axis, with P on f and Q on g, and PQ lies between A and B.<br><br>Determine the maximum length of PQ.",
      },
      hint: {
        en: "PQ changes as you slide it, so write its length as an expression in x — top graph minus bottom graph. Then look carefully at what kind of graph that expression is, and where its own highest point is.",
      },
      memo: [
        { type: "step", text: { en: "PQ is vertical, so its length is <b>top minus bottom</b>. Between A and B the parabola is on top:" } },
        { type: "step", text: { en: "PQ = f(x) − g(x)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (−x² + 5x + 15) − (x + 3) = −x² + 4x + 12" }, ticks: ["ca"] },
        { type: "step", text: { en: "That is a brand-new <b>sad</b> parabola, so the longest PQ sits at ITS turning point:" } },
        { type: "step", text: { en: "x = −b/(2a) = −4/(2(−1)) = 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "PQ = −(2)² + 4(2) + 12 = −4 + 8 + 12 = 16 &nbsp;&nbsp;∴&nbsp; maximum PQ = 16 units" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the longest PQ is NOT at the turning point of f. f turns at x = 2,5, but the widest gap is at x = 2 — the difference graph has its own turning point, and that is the one that matters.",
        } },
      ],
      esplain: {
        en: "The fact you have to fetch here is that the gap between two graphs is itself a graph. PQ is not one fixed length; it depends on where you draw it, so write it as a formula in x — top minus bottom — and you are suddenly holding a brand-new parabola whose height at every x IS the length of PQ there. Finding the longest PQ is then just finding that new parabola's maximum, which is the same x = −b/(2a) move you have used all year, followed by substituting back. Two cautions. First, subtract in the right order, or your length comes out negative. Second, do not reach for a Grade 12 tool: the difference parabola plus −b/(2a) is all this needs, and it gives the same answer. And resist the tempting shortcut of using f's own turning point — the two are close together here, 2,5 against 2, which is exactly why it catches people out.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Write down the coordinates of P when PQ is at its longest.",
      },
      hint: {
        en: "You already know the x where PQ is longest. P is the end of the segment that sits on f, so put that x into f.",
      },
      memo: [
        { type: "step", text: { en: "P sits on f, and PQ is longest at x = 2:" } },
        { type: "step", text: { en: "f(2) = −(2)² + 5(2) + 15 = −4 + 10 + 15 = 21" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ P(2 ; 21)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: 16 is the LENGTH of PQ, not the height of P. Writing P(2 ; 16) mixes up the gap between the graphs with the position of the top end — put the x into f itself.",
        } },
      ],
      esplain: {
        en: "Three different numbers live at x = 2, and keeping them apart is the whole of this part. There is 21, which is how high f is there. There is 5, which is how high g is there. And there is 16, which is the gap between them — the answer to (a). P is a point on f, so its height is the first of those three. The quickest way to stay out of trouble is to say out loud which graph the point belongs to before substituting, because the same x goes into two different equations depending on whether you want P or Q. A free check: 21 minus 5 is 16, which is the length you already found, so all three numbers agree.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — THE MINIMUM LENGTH, between two graphs that never meet.
   f(x) = x² − 2x + 6 and g(x) = x − 2.
     PQ = f(x) − g(x) = x² − 3x + 8, a HAPPY parabola
     xTP = 3/2 = 1,5  ⟹  PQ = 2,25 − 4,5 + 8 = 5,75
   Because that minimum is positive, the two graphs never touch — the
   answer proves it.
   The drawn segment sits at the illustrative x = 4, where PQ is 12,
   and moves to x = 1,5 on (b)'s reveal.
   LEVEL 3 on (b): the difference is happy here, so the turning point
   is a FLOOR, and the argument runs the other way from q3's.
   --------------------------------------------------------------- */
const Q4_F = { kind: "parabola", a: 1, b: -2, c: 6 };
const Q4_G = { kind: "line", a: 1, q: -2 };
const Q4_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -3, xmax: 6, ymin: -5, ymax: 16 },
    curves: [
      { ...Q4_F, tone: "a", label: "f", labelAt: -2 },
      { ...Q4_G, tone: "b", label: "g", labelAt: 5 },
    ],
    segment: { x: 4, fromCurve: 0, toCurve: 1, label: "PQ" },
  },
  parts: {
    a: { question: {}, reveal: { segment: { x: 4, fromCurve: 0, toCurve: 1, label: "PQ = 12" } } },
    b: { question: {}, reveal: { segment: { x: 1.5, fromCurve: 0, toCurve: 1, label: "PQ = 5,75" } } },
  },
};

const q4 = {
  id: "func.sib.dist.q4",
  chapter: CH,
  topic: "distances",
  archetype: "minimum-vertical-segment-between-a-parabola-and-a-line-that-never-meet",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows &nbsp;f(x) = x² − 2x + 6&nbsp; and&nbsp; g(x) = x − 2. &nbsp;PQ is a line segment parallel to the y-axis, with P on f and Q on g.<br><br>Determine the length of PQ when the x-coordinate of P is 4.",
      },
      hint: {
        en: "Both ends of PQ have the same x, so work out both heights at x = 4 and subtract. The parabola is drawn above the line everywhere here.",
      },
      memo: [
        { type: "step", text: { en: "f(4) = (4)² − 2(4) + 6 = 16 − 8 + 6 = 14 &nbsp;&nbsp;and&nbsp;&nbsp; g(4) = 4 − 2 = 2" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "f is on top, so &nbsp;PQ = 14 − 2 = 12 units" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Nothing new here — it is the warm-up that makes the next part make sense. Both ends of PQ share an x, so the length is simply the difference in heights, and the picture says which way round to subtract. What is worth noticing while you do it is that the parabola stays above the line on both sides of this sketch, and never dips down to touch it. That is unusual, and it is exactly what makes the next question interesting: if the two graphs never meet, PQ can never shrink to zero, so there must be some smallest length it settles at.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Determine the shortest possible length of PQ.",
      },
      hint: {
        en: "Write the length of PQ as an expression in x, the same way you would for a maximum. Then look at the sign of the leading term — is the new graph happy or sad, and does that make its turning point a ceiling or a floor?",
      },
      memo: [
        { type: "step", text: { en: "Write the length as an expression in x, top minus bottom:" } },
        { type: "step", text: { en: "PQ = f(x) − g(x) = (x² − 2x + 6) − (x − 2)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= x² − 3x + 8" }, ticks: ["ca"] },
        { type: "step", text: { en: "a = 1 &gt; 0, so this difference graph is <b>happy</b> — its turning point is a MINIMUM, and that is the shortest PQ:" } },
        { type: "step", text: { en: "x = −b/(2a) = −(−3)/(2(1)) = 1,5" }, ticks: ["ca"] },
        { type: "answer", text: { en: "PQ = (1,5)² − 3(1,5) + 8 = 2,25 − 4,5 + 8 = 5,75 units" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the answer being positive is not an accident — it PROVES the two graphs never meet. If they did cross, the shortest PQ would be 0, and the difference graph would have dipped below the x-axis.",
        } },
      ],
      esplain: {
        en: "The method is the same one you use for a maximum, and only one thing decides which answer you get: the sign of a in the difference graph. Subtract the two equations, tidy up, and look at what is in front of the x². Here it is positive, so the new parabola is happy — it falls to a turning point and climbs away again — which makes that turning point the smallest the gap ever gets. In the maximum version of this question the difference came out sad and the same turning point was the largest gap instead. Everything else is identical: x = −b/(2a), then substitute back, and never a derivative. There is a bonus buried in the answer. A shortest gap of 5,75 units says the graphs stay at least that far apart forever, so they can never cross — the same conclusion you would reach by setting them equal and finding a negative discriminant, but with more information in it, because this route also tells you exactly how close they get and where.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — A HYPERBOLA'S "TP" POINTS AND THE GAP BETWEEN ITS BRANCHES
   (her p10, in her own words: the points (p ± √a ; q ± √a) are the
   hyperbola's "TP", and the distance between them is the minimum
   distance between the branches).
   h(x) = 4/(x − 1) + 2 ⟹ a = 4, p = 1, q = 2, √a = 2
     (1 + 2 ; 2 + 2) = (3 ; 4)   and   (1 − 2 ; 2 − 2) = (−1 ; 0)
     distance² = 4² + 4² = 32 ⟹ 4√2 ≈ 5,66
   Both points are (a)'s ANSWER, so the base figure carries none. (b)'s
   reveal adds the line the two points sit on — the axis of symmetry
   with gradient 1, y = x + 1.
   --------------------------------------------------------------- */
const Q5_H = { kind: "hyperbola", a: 4, p: 1, q: 2 };
const Q5_TA = { x: 3, y: 4, on: 0, label: "(3 ; 4)" };
const Q5_TB = { x: -1, y: 0, on: 0, label: "(−1 ; 0)" };
const Q5_AXIS = { kind: "line", a: 1, q: 1, dash: true, tone: "b", label: "y = x + 1", labelAt: -3.5 };
const Q5_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -6, xmax: 8, ymin: -4, ymax: 8 },
    curves: [{ ...Q5_H, tone: "a", label: "h", labelAt: 2 }],
    asymptotes: [{ x: 1, of: 0, label: "x = 1" }, { y: 2, of: 0, label: "y = 2" }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q5_TA, Q5_TB] } },
    b: { question: { points: [Q5_TA, Q5_TB] }, reveal: { points: [Q5_TA, Q5_TB], curves: [Q5_AXIS] } },
  },
};

const q5 = {
  id: "func.sib.dist.q5",
  chapter: CH,
  topic: "distances",
  archetype: "hyperbola-tp-points-and-the-shortest-distance-between-the-branches",
  paper: PAPER,
  diagram: Q5_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The sketch shows the hyperbola h, defined by &nbsp;h(x) = 4/(x − 1) + 2. &nbsp;Its asymptotes x = 1 and y = 2 are the dashed lines.<br><br>Determine the coordinates of the two “TP” points of h — the point on each branch that lies closest to the other branch.",
      },
      hint: {
        en: "Line the equation up against y = a/(x − p) + q and read off a, p and q. The two points sit at (p ± √a ; q ± √a) — the same square root added to both coordinates for one point, and taken off both for the other.",
      },
      memo: [
        { type: "step", text: { en: "Read the form off first: &nbsp;h(x) = a/(x − p) + q&nbsp; with&nbsp; a = 4, &nbsp;p = 1, &nbsp;q = 2, &nbsp;so&nbsp; √a = 2." }, ticks: ["s/f"] },
        { type: "step", text: { en: "The two “TP” points are &nbsp;(p + √a ; q + √a)&nbsp; and&nbsp; (p − √a ; q − √a):" } },
        { type: "step", text: { en: "(1 + 2 ; 2 + 2) = (3 ; 4)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "(1 − 2 ; 2 − 2) = (−1 ; 0) &nbsp;&nbsp;∴&nbsp; the two points are (3 ; 4) and (−1 ; 0)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: it is √a, not a. Here a = 4, so the step is 2 in each direction, not 4. Check your points on the curve if you are unsure — h(3) really is 4.",
        } },
      ],
      esplain: {
        en: "A hyperbola has no turning point in the parabola sense, but each branch does have one place where it comes closest to the corner where the asymptotes cross — and those are the two points she calls its “TP”. They are always found the same way: start at the corner (p ; q), then step √a to the right and √a up for one of them, and √a to the left and √a down for the other. Everything you need is already sitting in the equation, so the only work is reading a, p and q correctly, remembering that p is the opposite sign of the number in the denominator. The step being a square root is the one place people slip, so say it out loud: a is 4, so the step is 2. A quick honesty check costs five seconds — put your x into h and see whether the y really comes out.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence determine the shortest distance between the two branches of h. Leave your answer in simplest surd form.",
      },
      hint: {
        en: "The shortest distance between the branches is the straight line joining the two points you found. That is an ordinary distance between two points, so use Pythagoras.",
      },
      memo: [
        { type: "step", text: { en: "The shortest distance between the branches is the straight line joining the two “TP” points, (3 ; 4) and (−1 ; 0)." } },
        { type: "step", text: { en: "d² = (Δx)² + (Δy)² = (3 − (−1))² + (4 − 0)² = (4)² + (4)²" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 16 + 16 = 32" }, ticks: ["ca"] },
        { type: "answer", text: { en: "d = √32 = √16·√2 = 4√2 units &nbsp;&nbsp;≈ 5,66 units" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: this is a diagonal distance, not a vertical one, so “top minus bottom” does not work here. Both coordinates change, so it has to be Pythagoras.",
        } },
      ],
      esplain: {
        en: "Once the two points are found, this is the plainest distance question there is — square the change in x, square the change in y, add, and take the root. What is worth understanding is why those two particular points are the closest pair. Both of them lie on the same line, the axis of symmetry with gradient 1 through the corner, and that line is the shortest road from one branch to the other because the whole picture is a mirror image of itself in it. You can see it in the numbers: (−1 ; 0) and (3 ; 4) both satisfy y = x + 1. Simplify the surd at the end — 32 = 16 × 2, so √32 becomes 4√2 — and give the exact answer first, with the decimal as an extra if you want one.",
      },
    },
  ],
};

export const funcDistancesSiblingQuestions = [q1, q2, q3, q4, q5];
