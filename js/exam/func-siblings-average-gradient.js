/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill
   "average-gradient"
   (SESSION D1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map: `average-gradient` is one of the four
   NEW Functions tiles.)
   ------------------------------------------------------------
   Six new cards on a tile that did not exist before today. Average
   gradient is a SAG Term 2 item and it is the last page of her own
   Functions notes, so it has been examinable all year with nothing in
   the app to drill it.

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   Her p59 — “average gradient between two points on a curve:
   m = Δy/Δx” — with p4 for the turning point, p10 for the hyperbola,
   p14 for “taking off”, and pp40–45 for the habit of working both
   heights out before doing anything else. The types and the method are
   hers; every number here is fresh. None of the digest's four flagged
   slips is mined, and there are NO DERIVATIVES anywhere: average
   gradient is a Grade 11 idea about a straight line joining two points
   on a curve, and every card here stays on that side of the line.

   WHAT THE SIX COVER:
     q1  a parabola — both heights worked out first, then the formula
     q2  a hyperbola, where the answer comes out negative and the sign
         itself is worth a mark
     q3  from the y-INTERCEPT to the TURNING POINT — the two points have
         to be found before the gradient can be
     q4  an exponential, twice over: the average gradient of the same
         graph over two different stretches, which is what “taking off”
         actually means in numbers
     q5  the algebraic one — between x = 1 and x = 1 + h, simplified
     q6  the question backwards: the average gradient is given, and the
         second point has to be found

   THE FIGURE RULE FOR THIS TILE (session brief, 2026-08-23): the
   QUESTION side shows the curve with the two points marked but NO
   chord — the straight line joining them is the thing being measured,
   so it belongs to the reveal. Every reveal draws that chord as a
   dashed line through the two points, captioned with the gradient it
   found. Where the coordinates of the points are what a part is ASKING
   for, the question side marks them as bare dots and only the reveal
   writes the coordinates on (the bare-figure rule).

   LEVELS: two level-1 parts, eight level-2 and three level-3. Nothing
   here is level 4 — the ★ questions live on the chapter's `level-4`
   tile (her ruling 5, EXAM-BUILD-DAY.md).
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — A PARABOLA, THE PLAIN CASE (her p59).
   f(x) = x² − 4, A at x = −1 and B at x = 3.
     A(−1 ; −3), B(3 ; 5)
     m = (5 − (−3))/(3 − (−1)) = 8/4 = 2, chord y = 2x − 1
   The coordinates are (a)'s answer, so the base figure marks the two
   points as BARE dots and only (a)'s reveal writes them on.
   --------------------------------------------------------------- */
const Q1_F = { kind: "parabola", a: 1, b: 0, c: -4, tone: "a", label: "f", labelAt: -3.4 };
const Q1_A = { x: -1, y: -3, on: 0, label: "A(−1 ; −3)", place: "belowLeft" };
const Q1_B = { x: 3, y: 5, on: 0, label: "B(3 ; 5)", place: "aboveLeft" };
const Q1_CHORD = { kind: "line", a: 2, q: -1, dash: true, tone: "b", label: "m = 2", labelAt: 4.4 };
const Q1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -5, xmax: 6, ymin: -7, ymax: 10 },
    curves: [Q1_F],
    points: [{ x: -1, y: -3, on: 0 }, { x: 3, y: 5, on: 0 }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q1_A, Q1_B] } },
    b: { question: { points: [Q1_A, Q1_B] }, reveal: { points: [Q1_A, Q1_B], curves: [Q1_CHORD] } },
  },
};

const q1 = {
  id: "func.sib.ag.q1",
  chapter: CH,
  topic: "average-gradient",
  archetype: "average-gradient-between-two-points-on-a-parabola",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 4. &nbsp;A and B are the two marked points on f, with x-coordinates &nbsp;−1&nbsp; and&nbsp; 3&nbsp; respectively.<br><br>Determine the coordinates of A and B.",
      },
      hint: {
        en: "Both points sit on f, so their heights come from the equation. Put each x-value into f and work out the y.",
      },
      memo: [
        { type: "answer", text: { en: "f(−1) = (−1)² − 4 = 1 − 4 = −3 &nbsp;&nbsp;∴&nbsp; A(−1 ; −3)" }, ticks: ["a"] },
        { type: "answer", text: { en: "f(3) = (3)² − 4 = 9 − 4 = 5 &nbsp;&nbsp;∴&nbsp; B(3 ; 5)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (−1)² is +1, not −1. The bracket matters — the whole of −1 is being squared, and a negative times a negative is positive.",
        } },
      ],
      esplain: {
        en: "Before you can measure anything between two points you have to know where both of them are, and that is what this part is for. A point sitting on a graph always has its height decided by the equation, so being told the x is the same as being told the whole point — put the x in and out comes the y. The one place marks go missing is the negative x. Squaring −1 means multiplying −1 by −1, which is +1, so the height at x = −1 is 1 − 4 = −3. Writing (−1)² with the bracket, rather than −1², is a small habit that saves that mark every time. Finish by writing each answer as a coordinate pair, because a point is a place and a place needs both numbers.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence determine the average gradient of f between A and B.",
      },
      hint: {
        en: "Average gradient is just the gradient of the straight line joining the two points — so it is change in y over change in x. Subtract in the SAME order top and bottom.",
      },
      memo: [
        { type: "step", text: { en: "average gradient = (y₂ − y₁)/(x₂ − x₁)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (5 − (−3))/(3 − (−1)) = 8/4" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: keep the same order top and bottom. Taking B first on top and A first on the bottom flips the sign of the whole answer.",
        } },
      ],
      esplain: {
        en: "The word “average” is doing real work here. A curve does not have one gradient — it is steeper in some places than others — so asking “how steep is f?” has no single answer. What you CAN ask is: if I joined A to B with a ruler, how steep would that ruler be? That straight line is called a chord, and its gradient is the average gradient between the two points. Which means you already know how to do this: it is the same rise-over-run you use for any straight line, change in y over change in x. The two cautions are the order of subtraction, which must match top and bottom, and the double negatives — 5 − (−3) is 8, not 2. An answer of 2 says the curve climbs, on average, two units up for every one across between those points.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — A HYPERBOLA, WHERE THE ANSWER IS NEGATIVE (her p10 + p59).
   h(x) = 6/(x − 2) + 1, asymptotes x = 2 and y = 1 (GIVEN, captioned).
   A(3 ; 7) and B(5 ; 3) are both GIVEN in the stem, so both are marked
   and labelled on the question side.
     m = (3 − 7)/(5 − 3) = −4/2 = −2, chord y = −2x + 13
   --------------------------------------------------------------- */
const Q2_H = { kind: "hyperbola", a: 6, p: 2, q: 1, tone: "a", label: "h", labelAt: 6.4 };
const Q2_A = { x: 3, y: 7, on: 0, label: "A(3 ; 7)", place: "aboveRight" };
const Q2_B = { x: 5, y: 3, on: 0, label: "B(5 ; 3)", place: "aboveRight" };
const Q2_CHORD = { kind: "line", a: -2, q: 13, dash: true, tone: "b", label: "m = −2", labelAt: 6.6 };
const Q2_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 9, ymin: -6, ymax: 11 },
    curves: [Q2_H],
    asymptotes: [{ x: 2, of: 0, label: "x = 2" }, { y: 1, of: 0, label: "y = 1" }],
    points: [Q2_A, Q2_B],
  },
  parts: {
    a: { question: {}, reveal: { curves: [Q2_CHORD] } },
    b: { question: { curves: [Q2_CHORD] }, reveal: { curves: [Q2_CHORD] } },
  },
};

const q2 = {
  id: "func.sib.ag.q2",
  chapter: CH,
  topic: "average-gradient",
  archetype: "average-gradient-on-a-hyperbola-with-a-negative-answer",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "The sketch shows the hyperbola h, defined by &nbsp;h(x) = 6/(x − 2) + 1, &nbsp;with asymptotes &nbsp;x = 2&nbsp; and&nbsp; y = 1. &nbsp;A and B lie on h, with x-coordinates &nbsp;3&nbsp; and&nbsp; 5&nbsp; respectively.<br><br>Determine the average gradient of h between A and B.",
      },
      hint: {
        en: "Work out both heights before you reach for the formula — put x = 3 and then x = 5 into h. After that it is change in y over change in x, exactly as for a parabola.",
      },
      memo: [
        { type: "step", text: { en: "h(3) = 6/(3 − 2) + 1 = 6 + 1 = 7 &nbsp;&nbsp;∴&nbsp; A(3 ; 7)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "h(5) = 6/(5 − 2) + 1 = 2 + 1 = 3 &nbsp;&nbsp;∴&nbsp; B(5 ; 3)" }, ticks: ["ca"] },
        { type: "step", text: { en: "average gradient = (y₂ − y₁)/(x₂ − x₁) = (3 − 7)/(5 − 3) = −4/2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= −2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The graph being a hyperbola changes nothing about the method — average gradient is always the steepness of the straight line joining two points, whatever curve they happen to be sitting on. What does change is the arithmetic getting there, because working out a height now means a fraction. Take it one piece at a time: the bottom of the fraction first, then divide, then add the number on the end. Both points are on the same branch here, to the right of the vertical asymptote, which matters more than it looks: joining two points on OPPOSITE branches would draw a line straight across a gap the graph never crosses, and the answer would be meaningless. Once you have the two heights, the formula is the same one as always.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: {
        en: "What does the sign of your answer tell you about h between A and B?",
      },
      hint: {
        en: "Think about what a negative gradient looks like on any straight line, and then look at the chord you have just drawn between A and B.",
      },
      memo: [
        { type: "answer", text: { en: "The average gradient is negative, so h is <b>decreasing</b> between A and B — it falls as you move from left to right." }, ticks: ["a"] },
      ],
      esplain: {
        en: "A gradient is a direction as well as a size. Positive means going up as you move right; negative means going down. So the answer of −2 is telling you two separate things at once: the chord from A to B falls, and it falls two units for every one unit across. Look at the picture and it agrees — A is up at height 7 and B is down at 3, so of course the line between them slopes down. This is the free sanity check on every average-gradient answer you will ever work out. Decide from the picture whether the answer should be positive or negative BEFORE you do the arithmetic, and if the sign comes out the other way, you have subtracted in the wrong order somewhere.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — FROM THE y-INTERCEPT TO THE TURNING POINT (her p4 + p59).
   f(x) = x² − 6x + 5.
     y-intercept (0 ; 5); xTP = −b/(2a) = 3, f(3) = −4 ⟹ TP(3 ; −4)
     m = (−4 − 5)/(3 − 0) = −9/3 = −3, chord y = −3x + 5
   Both points are (a)'s answer, so the base figure carries NONE.
   --------------------------------------------------------------- */
const Q3_F = { kind: "parabola", a: 1, b: -6, c: 5, tone: "a", label: "f", labelAt: 6.6 };
const Q3_YI = { x: 0, y: 5, on: 0, label: "(0 ; 5)", place: "aboveRight" };
const Q3_TP = { x: 3, y: -4, on: 0, label: "TP(3 ; −4)", place: "below" };
const Q3_CHORD = { kind: "line", a: -3, q: 5, dash: true, tone: "b", label: "m = −3", labelAt: -1.6 };
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -3, xmax: 9, ymin: -7, ymax: 11 },
    curves: [Q3_F],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q3_YI, Q3_TP] } },
    b: { question: { points: [Q3_YI, Q3_TP] }, reveal: { points: [Q3_YI, Q3_TP], curves: [Q3_CHORD] } },
  },
};

const q3 = {
  id: "func.sib.ag.q3",
  chapter: CH,
  topic: "average-gradient",
  archetype: "average-gradient-between-the-y-intercept-and-the-turning-point",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Consider the parabola f, defined by &nbsp;f(x) = x² − 6x + 5.<br><br>Determine the coordinates of the turning point of f and of the point where f cuts the y-axis.",
      },
      hint: {
        en: "The turning point sits on &nbsp;x = −b/(2a); &nbsp;work that out first and then substitute back for its height. The y-intercept is the number on the end of the equation.",
      },
      memo: [
        { type: "step", text: { en: "a = 1, &nbsp;b = −6: &nbsp;x = −b/(2a) = 6/2 = 3" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "f(3) = 9 − 18 + 5 = −4 &nbsp;&nbsp;∴&nbsp; TP(3 ; −4)" }, ticks: ["a"] },
        { type: "answer", text: { en: "y-intercept: &nbsp;f(0) = 5 &nbsp;&nbsp;∴&nbsp; (0 ; 5)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two points, two very different amounts of work. The y-intercept is free: put x = 0 and everything with an x in it vanishes, leaving the last number behind. The turning point takes one formula and one substitution — half of b, sign swapped, over a gives its x, and putting that x back into the equation gives its height. Do them in that order and keep them clearly labelled, because the next part is going to subtract one from the other and it matters which is which. A quick check while you are here: the parabola is happy, so the turning point is its lowest point, and −4 being below 5 agrees with that. From (0 ; 5) down to (3 ; −4) the graph is falling, so expect a negative answer next.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence determine the average gradient of f between the y-intercept and the turning point.",
      },
      hint: {
        en: "You now have two points, so this is the ordinary formula. Take the y-intercept as your first point and the turning point as your second, and keep that order top and bottom.",
      },
      memo: [
        { type: "step", text: { en: "average gradient = (y₂ − y₁)/(x₂ − x₁)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (−4 − 5)/(3 − 0) = −9/3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= −3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the answer being negative is not a mistake. Over this stretch the graph really is falling, and a distance would never be negative but a gradient certainly can be.",
        } },
      ],
      esplain: {
        en: "Once you have two points, the graph they came from stops mattering — average gradient is a question about the two points, and the formula is the same one you used for straight lines all last year. What makes this version worth practising is that neither point was handed to you: one had to be read off the end of the equation and the other had to be worked out. That is how a paper usually asks it. The answer, −3, says that over that stretch the curve drops three units for every one unit across, on average. It is not the steepness anywhere in particular — near the y-axis the curve is falling faster than that, and near the turning point it has almost flattened out — it is the steepness of the straight line joining the two ends.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — AN EXPONENTIAL, MEASURED TWICE (her p14 + p59).
   g(x) = 2ˣ + 1, asymptote y = 1 (GIVEN, captioned).
     A(1 ; 3), B(3 ; 9), C(4 ; 17) — marked as bare dots, since their
     coordinates are worked out in the parts.
     x = 1 → 3:  m = (9 − 3)/(3 − 1) = 3,  chord y = 3x
     x = 3 → 4:  m = (17 − 9)/(4 − 3) = 8, chord y = 8x − 15
   The point of the card is that the SAME graph has a much bigger
   average gradient further right — which is what “taking off” means
   once you put numbers on it.
   --------------------------------------------------------------- */
const Q4_G = { kind: "exp", a: 1, b: 2, p: 0, q: 1, tone: "a", label: "g", labelAt: 3.3 };
const Q4_A = { x: 1, y: 3, on: 0, label: "A(1 ; 3)", place: "belowRight" };
const Q4_B = { x: 3, y: 9, on: 0, label: "B(3 ; 9)", place: "left" };
const Q4_C = { x: 4, y: 17, on: 0, label: "C(4 ; 17)", place: "left" };
const Q4_CH1 = { kind: "line", a: 3, q: 0, dash: true, tone: "b", label: "m = 3", labelAt: 5.2 };
const Q4_CH2 = { kind: "line", a: 8, q: -15, dash: true, tone: "c", label: "m = 8", labelAt: 4.3 };
const Q4_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -3, xmax: 6, ymin: -4, ymax: 20 },
    curves: [Q4_G],
    asymptotes: [{ y: 1, of: 0, label: "y = 1" }],
    points: [{ x: 1, y: 3, on: 0 }, { x: 3, y: 9, on: 0 }, { x: 4, y: 17, on: 0 }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q4_A, Q4_B], curves: [Q4_CH1] } },
    b: {
      question: { points: [Q4_A, Q4_B], curves: [Q4_CH1] },
      reveal: { points: [Q4_A, Q4_B, Q4_C], curves: [Q4_CH1, Q4_CH2] },
    },
  },
};

const q4 = {
  id: "func.sib.ag.q4",
  chapter: CH,
  topic: "average-gradient",
  archetype: "average-gradient-of-an-exponential-over-two-different-stretches",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "The sketch shows the exponential graph g, defined by &nbsp;g(x) = 2ˣ + 1, &nbsp;with asymptote &nbsp;y = 1. &nbsp;A, B and C are the marked points on g, with x-coordinates &nbsp;1, &nbsp;3&nbsp; and&nbsp; 4.<br><br>Determine the average gradient of g between A and B.",
      },
      hint: {
        en: "Work out both heights first — put x = 1 and then x = 3 into g. Then it is change in y over change in x.",
      },
      memo: [
        { type: "step", text: { en: "g(1) = 2<sup>1</sup> + 1 = 3 &nbsp;&nbsp;∴&nbsp; A(1 ; 3)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "g(3) = 2<sup>3</sup> + 1 = 9 &nbsp;&nbsp;∴&nbsp; B(3 ; 9)" }, ticks: ["ca"] },
        { type: "step", text: { en: "average gradient = (y₂ − y₁)/(x₂ − x₁) = (9 − 3)/(3 − 1) = 6/2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 3" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Heights first, always. On an exponential that means working out a power, and the two places people slip are forgetting that the number added on the end is part of the height, and reading 2 cubed as 6 instead of 8. Once both points are down the rest is the ordinary formula. The answer of 3 says that between x = 1 and x = 3 the graph climbs, on average, three units up for every one across. Hold on to that number, because the next part measures the same graph over a different stretch and gets something very different — and comparing the two is the whole point of the card.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Determine the average gradient of g between B and C, and explain what your two answers together tell you about how g is growing.",
      },
      hint: {
        en: "Work out C's height the same way and use the formula again. Then put the two gradients side by side and ask what it means that the second one is so much bigger.",
      },
      memo: [
        { type: "step", text: { en: "g(4) = 2<sup>4</sup> + 1 = 17 &nbsp;&nbsp;∴&nbsp; C(4 ; 17)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "average gradient = (17 − 9)/(4 − 3) = 8/1 = 8" }, ticks: ["a"] },
        { type: "answer", text: { en: "8 is much bigger than 3, so g is getting steeper as x increases — the graph is <b>taking off</b>, climbing faster and faster the further right you go." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: an average gradient belongs to the two points you measured between, not to the graph as a whole. “The gradient of g is 3” is not a true sentence — it depends entirely on which stretch you measure.",
        } },
      ],
      esplain: {
        en: "This is what “taking off” looks like once you put numbers on it. Between x = 1 and x = 3 the graph climbed at an average of 3 units per step across; between x = 3 and x = 4 it climbed at 8 — nearly three times as steep, over a stretch half as long. A straight line could never do that, because a straight line has one gradient everywhere. A parabola gets steeper too, but an exponential does it faster and keeps doing it forever, doubling every time x goes up by one. On the picture you can see it in the two dashed chords: the first is a gentle slope, the second is nearly a wall. And the same story runs the other way — go far enough left and the average gradient becomes almost nothing, which is the graph flattening out towards its asymptote.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — THE ALGEBRAIC ONE: BETWEEN x = 1 AND x = 1 + h (her p59).
   f(x) = x² − 3.
     (a) x = 1 → 3:  A(1 ; −2), B(3 ; 6), m = (6 − (−2))/(3 − 1) = 4
     (b) x = 1 → 1 + h:
           f(1 + h) = (1 + h)² − 3 = h² + 2h − 2, f(1) = −2
           m = (h² + 2h)/h = h + 2
     (c) h = 1 ⟹ m = 3, and the point is (2 ; 1); chord y = 3x − 5
   (a)'s chord IS the h = 2 case, so (b)'s reveal captions it as such —
   the general answer checked against the number already found.
   --------------------------------------------------------------- */
const Q5_F = { kind: "parabola", a: 1, b: 0, c: -3, tone: "a", label: "f", labelAt: -2.4 };
const Q5_A = { x: 1, y: -2, on: 0, label: "A(1 ; −2)", place: "belowRight" };
const Q5_B = { x: 3, y: 6, on: 0, label: "B(3 ; 6)", place: "aboveLeft" };
const Q5_P = { x: 2, y: 1, on: 0, label: "(2 ; 1)", place: "belowRight" };
const Q5_CH_AB = { kind: "line", a: 4, q: -6, dash: true, tone: "b", label: "m = 4", labelAt: 3.6 };
const Q5_CH_H1 = { kind: "line", a: 3, q: -5, dash: true, tone: "c", label: "m = 3", labelAt: 4.1 };
const Q5_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -3, xmax: 5, ymin: -5, ymax: 9 },
    curves: [Q5_F],
    points: [{ x: 1, y: -2, on: 0 }, { x: 3, y: 6, on: 0 }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q5_A, Q5_B], curves: [Q5_CH_AB] } },
    b: { question: { points: [Q5_A, Q5_B] }, reveal: { points: [Q5_A, Q5_B], curves: [Q5_CH_AB] } },
    c: {
      question: { points: [Q5_A, Q5_B] },
      reveal: { points: [Q5_A, Q5_B, Q5_P], curves: [Q5_CH_AB, Q5_CH_H1] },
    },
  },
};

const q5 = {
  id: "func.sib.ag.q5",
  chapter: CH,
  topic: "average-gradient",
  archetype: "average-gradient-between-x-and-x-plus-h-simplified",
  paper: PAPER,
  diagram: Q5_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 3, &nbsp;with A and B marked on it at &nbsp;x = 1&nbsp; and&nbsp; x = 3.<br><br>Determine the average gradient of f between &nbsp;x = 1&nbsp; and&nbsp; x = 3.",
      },
      hint: {
        en: "Work out f(1) and f(3), then use change in y over change in x.",
      },
      memo: [
        { type: "step", text: { en: "f(1) = 1 − 3 = −2 &nbsp;and&nbsp; f(3) = 9 − 3 = 6, &nbsp;so&nbsp; A(1 ; −2)&nbsp; and&nbsp; B(3 ; 6)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "average gradient = (6 − (−2))/(3 − 1) = 8/2 = 4" }, ticks: ["a"] },
      ],
      esplain: {
        en: "This is the warm-up, and it is here for a reason: the next part does exactly the same job in letters instead of numbers, and it is much easier to follow if you have just watched it happen with numbers. Two heights, one subtraction on top, one on the bottom, divide. The answer, 4, is the steepness of the dashed line joining A to B. Notice what it is NOT: it is not how steep the curve is at A, and it is not how steep it is at B. The curve is gentler than that at A and steeper than that at B; 4 is the in-between figure you would get by joining the two ends with a ruler.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Determine the average gradient of f between &nbsp;x = 1&nbsp; and&nbsp; x = 1 + h. &nbsp;Give your answer in its simplest form.",
      },
      hint: {
        en: "Do exactly what you did in (a), but with 1 + h in place of 3. Work out f(1 + h) first — expand the square carefully — and remember that the change in x is (1 + h) − 1, which is just h.",
      },
      memo: [
        { type: "step", text: { en: "f(1 + h) = (1 + h)² − 3 = 1 + 2h + h² − 3 = h² + 2h − 2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "f(1) = 1 − 3 = −2, &nbsp;so the change in y is &nbsp;(h² + 2h − 2) − (−2) = h² + 2h" }, ticks: ["ca"] },
        { type: "step", text: { en: "the change in x is &nbsp;(1 + h) − 1 = h, &nbsp;so &nbsp;average gradient = (h² + 2h)/h" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= (h(h + 2))/h = h + 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (1 + h)² is NOT 1 + h². The square of a bracket has a middle term — 1 + 2h + h² — and losing it is what makes this answer come out as h instead of h + 2.",
        } },
      ],
      esplain: {
        en: "Nothing new is happening; the second x-value simply has a letter in it. Work out the height there the same way you would for a number, being careful with the square of the bracket: (1 + h)² means (1 + h)(1 + h), which gives 1 + 2h + h². Then subtract the two heights, and watch the double negative — taking away −2 adds 2, which is what makes the constants cancel and leaves h² + 2h. The bottom is the easy half: the distance from 1 to 1 + h is h. Now factorise the top so the h can cancel, and you are left with h + 2. Check it against part (a): going from x = 1 to x = 3 means h = 2, and h + 2 gives 4 — exactly the number you already had.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write down the average gradient of f between &nbsp;x = 1&nbsp; and&nbsp; x = 2.",
      },
      hint: {
        en: "Your answer to (b) is a formula that works for any h. Ask yourself what h has to be to get from x = 1 to x = 2, and put that number in.",
      },
      memo: [
        { type: "step", text: { en: "from &nbsp;x = 1&nbsp; to&nbsp; x = 2&nbsp; the step is &nbsp;h = 1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "average gradient = h + 2 = 1 + 2 = 3" }, ticks: ["a"] },
      ],
      esplain: {
        en: "This is the reward for doing (b) in letters: you now have a formula that answers the same question for any second point you like, without starting again. Getting from x = 1 to x = 2 is a step of 1, so h = 1, and the average gradient is 3. Compare the three chords on the picture and a pattern shows itself — a step of 2 gave a gradient of 4, a step of 1 gives 3, and a smaller step would give something smaller still, always 2 more than the step. The chords are lying flatter and flatter as the second point slides back towards A. What they are heading towards is how steep the curve is right AT x = 1, which is a Grade 12 conversation; for now, noticing the pattern is enough.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — THE QUESTION BACKWARDS: THE GRADIENT IS GIVEN, FIND B.
   f(x) = x² − 1, A(1 ; 0) on f, average gradient between A and B is 4.
     m = (f(b) − 0)/(b − 1) = (b² − 1)/(b − 1) = ((b − 1)(b + 1))/(b − 1) = b + 1
     b + 1 = 4 ⟹ b = 3, and f(3) = 8 ⟹ B(3 ; 8)
   The OR route is the one that carries the trap: cross-multiplying
   gives b² − 4b + 3 = 0 ⟹ (b − 1)(b − 3) = 0, and b = 1 has to be
   thrown away because B would then BE A.
   --------------------------------------------------------------- */
const Q6_F = { kind: "parabola", a: 1, b: 0, c: -1, tone: "a", label: "f", labelAt: -2.6 };
const Q6_A = { x: 1, y: 0, on: 0, label: "A(1 ; 0)", place: "belowRight" };
const Q6_B = { x: 3, y: 8, on: 0, label: "B(3 ; 8)", place: "aboveLeft" };
const Q6_CHORD = { kind: "line", a: 4, q: -4, dash: true, tone: "b", label: "m = 4", labelAt: 0.4 };
const Q6_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 6, ymin: -4, ymax: 11 },
    curves: [Q6_F],
    points: [Q6_A],
  },
  parts: {
    a: { question: {}, reveal: { curves: [Q6_CHORD], vlines: [{ x: 3, label: "x = 3" }] } },
    b: {
      question: { curves: [Q6_CHORD], vlines: [{ x: 3, label: "x = 3" }] },
      reveal: { curves: [Q6_CHORD], vlines: [{ x: 3, label: "x = 3" }], points: [Q6_B] },
    },
  },
};

const q6 = {
  id: "func.sib.ag.q6",
  chapter: CH,
  topic: "average-gradient",
  archetype: "average-gradient-given-find-the-second-point",
  paper: PAPER,
  diagram: Q6_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 1, &nbsp;with the point A(1 ; 0) marked on it. B is another point on f, and the average gradient of f between A and B is 4.<br><br>Determine the x-coordinate of B.",
      },
      hint: {
        en: "Call B's x-coordinate b. Its height is then f(b), so write the average gradient formula out in terms of b, put it equal to 4, and solve. There is a factorising shortcut hiding in the top of the fraction.",
      },
      memo: [
        { type: "step", text: { en: "Let B's x-coordinate be b, so B is the point &nbsp;(b ; b² − 1), &nbsp;and A is (1 ; 0):" }, ticks: ["s/f"] },
        { type: "step", text: { en: "average gradient = ((b² − 1) − 0)/(b − 1) = (b² − 1)/(b − 1)" }, ticks: ["ca"] },
        { type: "step", text: { en: "the top is a difference of two squares: &nbsp;((b − 1)(b + 1))/(b − 1) = b + 1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "b + 1 = 4 &nbsp;&nbsp;∴&nbsp; b = 3" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — cross-multiply instead of cancelling:" } },
        { type: "step", text: { en: "b² − 1 = 4(b − 1) &nbsp;⟹&nbsp; b² − 4b + 3 = 0 &nbsp;⟹&nbsp; (b − 1)(b − 3) = 0 &nbsp;⟹&nbsp; b = 1&nbsp; or&nbsp; b = 3, &nbsp;and b = 1 is rejected &nbsp;∴&nbsp; b = 3" } },
        { type: "trap", text: {
          en: "WATCH OUT on the second road: b = 1 must be thrown away. If b were 1 then B would BE A, there would be no chord at all, and the fraction's bottom would be zero. Say why you are rejecting it — that is where the mark is.",
        } },
      ],
      esplain: {
        en: "Every “find the missing point” question works the same way: give the thing you do not know a letter, write down what you DO know using that letter, and solve. Here B's x gets called b, and because B is on the graph its height must be b² − 1 — you are never told that, you work it out. Now the average gradient formula can be written entirely in b, set equal to the 4 you were given, and solved. The tidy road spots that b² − 1 is a difference of two squares, so the (b − 1) on the bottom cancels and what is left is a one-line equation. The other road cross-multiplies and ends in a quadratic with two answers, one of which is nonsense — b = 1 would put B on top of A. Both roads earn full marks; the second one just asks you to explain the rejection.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write down the coordinates of B.",
      },
      hint: {
        en: "You have B's x-coordinate, and B sits on f — so put that x into f to get its height.",
      },
      memo: [
        { type: "step", text: { en: "f(3) = (3)² − 1 = 8" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ &nbsp;B(3 ; 8)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 4 is the average GRADIENT, not B's height. Writing B(3 ; 4) mixes up the steepness of the chord with the position of its far end.",
        } },
      ],
      esplain: {
        en: "One substitution finishes the job, but it is worth checking the answer rather than just writing it. From A(1 ; 0) to B(3 ; 8) the change in y is 8 and the change in x is 2, so the chord's gradient is 8 divided by 2, which is 4 — exactly what the question said it should be. That check costs five seconds and catches every arithmetic slip in the part before. The other thing to keep straight is which number is which. The 4 measures how STEEP the line from A to B is; the 8 is how HIGH B sits. They are different kinds of number and they live in different places on the picture, and mixing them up is the most common way this question is lost.",
      },
    },
  ],
};

export const funcAverageGradientSiblingQuestions = [q1, q2, q3, q4, q5, q6];
