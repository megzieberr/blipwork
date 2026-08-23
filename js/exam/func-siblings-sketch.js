/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill "sketch"
   (SESSION D1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map: `sketch` is one of the four NEW
   Functions tiles.)
   ------------------------------------------------------------
   Six new cards on a tile that did not exist before today. Every one is
   the question a Grade 11 paper actually asks: "Sketch the graph of …,
   showing all the intercepts with the axes and the coordinates of the
   turning point / the asymptotes."

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   Her p4 (happy/sad, xTP = −b/2a, c = the y-intercept, turning-point
   form and its "opposite sign" p), pp5–7 (the worked "characteristics"
   pages, in HER order: shape → intercepts → turning point → sketch),
   p10 (asymptotes FIRST on a hyperbola, then the intercepts), p14
   ("taking off" for b > 1, "landing" for 0 &lt; b &lt; 1; a decides
   above or below the asymptote) and pp29–32 (completing the square
   beside the xTP = −b/2a shortcut — both roads under OR). The question
   TYPES and the METHOD ORDER are hers; every number here is fresh.
   None of the digest's four flagged slips is mined.

   WHAT THE SIX COVER, and why these six:
     q1  a parabola in TURNING-POINT form — read the TP off, then work
         the intercepts, then draw it (the gentlest way in)
     q2  the same job from STANDARD form — factorise for the
         x-intercepts, and the turning point by BOTH roads under OR
     q3  an exponential a·b^(x − p) + q — asymptote first, then both
         intercepts, in her "taking off" language
     q4  a hyperbola a/(x + p) + q — asymptotes FIRST, her p10 order,
         then the intercepts, then the sketch
     q5  a straight line AND a parabola on ONE set of axes
     q6  the bank's rough sketch FROM SIGN CONDITIONS ONLY (archetype
         5b: "sketch given a &lt; 0, p &gt; 0, q &gt; 0" — no numbers at
         all), which tests the concept and nothing else

   THE DIAGRAM RULE FOR THIS WHOLE TILE (session brief, 2026-08-23).
   The sketch IS the task, so the QUESTION side shows only a blank set
   of axes with a light integer grid — the exam's own answer grid. The
   base spec is therefore a `{ type:"function", grid:true, win:{…} }`
   with NO curves and NO points; `verifyFunction` measures a curveless
   spec perfectly happily (there is simply nothing to measure but the
   window). Every part's `question` highlight is `{}`, and its `reveal`
   highlight carries EVERYTHING it found: the curve(s), the intercepts,
   the turning point, the asymptotes with captions. Because the base
   spec draws no curves of its own, a reveal's first curve is index 0 —
   that is what every `on:` and `of:` below counts from.

   q6 IS THE ONE THAT NEEDS SAYING OUT LOUD: it has no numbers, so its
   reveal draws a REPRESENTATIVE curve with the right features and its
   memo says so in as many words ("any curve with these features earns
   the marks"). Its point label is written symbolically, TP(−p ; q),
   even though the dot sits at the representative curve's own turning
   point — which is exactly what a marker draws on the board.

   LEVELS: five level-1 parts, nine level-2 and three level-3. Nothing
   here is level 4 — the ★ questions live on the chapter's `level-4`
   tile (her ruling 5, EXAM-BUILD-DAY.md).
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* the blank answer grid every card on this tile hands the learner */
const AXES = (win) => ({ type: "function", grid: true, win });

/* ---------------------------------------------------------------
   q1 — PARABOLA IN TURNING-POINT FORM (her p4, "opposite sign").
   g(x) = −2(x − 1)² + 8 — sad, TP(1 ; 8), a maximum.
     x-intercepts: (x − 1)² = 4 ⟹ x = −1 or x = 3
     y-intercept:  g(0) = −2(1) + 8 = 6
   The gentlest card on the tile: the turning point is READ, not
   worked, so all the working goes into the intercepts.
   --------------------------------------------------------------- */
const Q1_G = { kind: "parabola", a: -2, p: 1, q: 8, tone: "a", label: "g", labelAt: 3.2 };
const Q1_TP = { x: 1, y: 8, on: 0, label: "TP(1 ; 8)", place: "above" };
const Q1_X1 = { x: -1, y: 0, on: 0, label: "(−1 ; 0)", place: "belowLeft" };
const Q1_X2 = { x: 3, y: 0, on: 0, label: "(3 ; 0)", place: "belowRight" };
const Q1_YI = { x: 0, y: 6, on: 0, label: "(0 ; 6)", place: "left" };
const Q1_DIAGRAM = {
  spec: AXES({ xmin: -4, xmax: 6, ymin: -8, ymax: 11 }),
  parts: {
    a: { question: {}, reveal: { curves: [Q1_G], points: [Q1_TP] } },
    b: { question: {}, reveal: { curves: [Q1_G], points: [Q1_X1, Q1_X2, Q1_YI] } },
    c: { question: {}, reveal: { curves: [Q1_G], points: [Q1_TP, Q1_X1, Q1_X2, Q1_YI] } },
  },
};

const q1 = {
  id: "func.sib.sk.q1",
  chapter: CH,
  topic: "sketch",
  archetype: "sketch-a-parabola-given-in-turning-point-form",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Consider the parabola g, defined by &nbsp;g(x) = −2(x − 1)² + 8.<br><br>Write down the coordinates of the turning point of g, and state whether it is a maximum or a minimum.",
      },
      hint: {
        en: "The equation is already in turning-point form &nbsp;y = a(x − p)² + q, so the turning point is (p ; q) — sitting right there in the equation. Read the sign in front of the bracket to decide happy or sad.",
      },
      memo: [
        { type: "step", text: { en: "In &nbsp;y = a(x − p)² + q&nbsp; the turning point is (p ; q), and p is the OPPOSITE sign of the number inside the bracket." } },
        { type: "answer", text: { en: "(x − 1)² gives p = 1, and q = 8 &nbsp;&nbsp;∴&nbsp; TP(1 ; 8)" }, ticks: ["a"] },
        { type: "answer", text: { en: "a = −2, and a &lt; 0 means the graph is <b>sad</b> &nbsp;∴&nbsp; the turning point is a MAXIMUM" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Turning-point form hands you the answer, so the only skill is reading it properly. The two letters p and q are not mystery constants — they ARE the turning point's own coordinates. The bracket is the place to slow down, because the form says x − p: a bracket reading x − 1 means p = 1, and a bracket reading x + 1 would mean p = −1. If that ever feels slippery, use the zero test — whatever value of x makes the bracket equal zero is the turning point's x. The a in front does a completely different job: its sign decides happy or sad, so a negative a means the arms point down and the turning point is the highest the graph ever gets. That is the whole of a maximum.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 1,
      prompt: {
        en: "Determine the coordinates of the points where g cuts the x-axis and the y-axis.",
      },
      hint: {
        en: "A graph cuts the x-axis where y = 0, and the y-axis where x = 0. Put y = 0 into the equation, get the bracket on its own, and remember that a square root has TWO answers.",
      },
      memo: [
        { type: "step", text: { en: "x-intercepts: put &nbsp;y = 0&nbsp; and get the bracket alone:" } },
        { type: "step", text: { en: "−2(x − 1)² + 8 = 0 &nbsp;⟹&nbsp; (x − 1)² = 4" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x − 1 = ±2 &nbsp;⟹&nbsp; x = 3&nbsp; or&nbsp; x = −1 &nbsp;&nbsp;∴&nbsp; (3 ; 0) and (−1 ; 0)" }, ticks: ["a"] },
        { type: "answer", text: { en: "y-intercept: put &nbsp;x = 0: &nbsp;g(0) = −2(0 − 1)² + 8 = −2 + 8 = 6 &nbsp;&nbsp;∴&nbsp; (0 ; 6)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (x − 1)² = 4 has TWO answers, because both 2 and −2 square to 4. Writing only x − 1 = 2 loses a whole intercept — and loses the shape of the sketch with it.",
        } },
      ],
      esplain: {
        en: "Intercepts are always the same two questions, whatever the graph. Where does it cross the x-axis? That is where the height is zero, so put y = 0. Where does it cross the y-axis? That is where you are standing on the y-axis, so put x = 0. From turning-point form the x-intercepts come out fastest by getting the bracket on its own and square-rooting, and the ± is not optional: a sad parabola with its peak above the axis has to come down through the axis on both sides, so two answers are exactly what the picture demands. The y-intercept needs no thinking at all — substitute zero and work it out. Notice the answers land the same distance either side of x = 1, the turning point's x — two units out each way. That symmetry is a free check on both of them.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence sketch the graph of g on the set of axes provided. Show clearly the coordinates of the turning point and of all the intercepts with the axes.",
      },
      hint: {
        en: "You already have every number you need. Plot the turning point first, then the two x-intercepts and the y-intercept, and only then join them — the shape follows the sign of a, not the other way round.",
      },
      memo: [
        { type: "step", text: { en: "Mark the four points you have found, then join them into a SAD parabola (a = −2 &lt; 0):" } },
        { type: "step", text: { en: "shape: sad, symmetrical about the line through the turning point" }, ticks: ["ca"] },
        { type: "step", text: { en: "intercepts labelled: &nbsp;(−1 ; 0), &nbsp;(3 ; 0)&nbsp; and&nbsp; (0 ; 6)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "turning point labelled: &nbsp;TP(1 ; 8)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: a sketch mark is only earned if the point is LABELLED. A beautiful curve with bare dots on it scores the shape mark and nothing else — write the coordinates next to every point you plot.",
        } },
      ],
      esplain: {
        en: "A sketch is not a drawing competition; it is a report. The marker is looking for four things and each one is worth a mark: the right shape, the x-intercepts, the y-intercept, and the turning point — each with its coordinates written beside it. So do the maths first and the drawing last. Plot the turning point, plot the intercepts, then join them with one smooth curve that keeps its arms going the right way. Two habits save marks every single time. Label everything, even the points you think are obvious. And keep the curve symmetrical about the vertical line through the turning point — a lopsided parabola tells the marker you have not understood what a turning point is.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — PARABOLA IN STANDARD FORM (her pp5–7 route, plus pp29–32).
   f(x) = x² − 4x − 5 = (x − 5)(x + 1) — happy.
     x-intercepts: −1 and 5   ·   y-intercept: (0 ; −5)
     turning point BOTH WAYS, under OR:
       xTP = −b/(2a) = 4/2 = 2, then f(2) = −9
       completing the square: (x − 2)² − 9 ⟹ TP(2 ; −9)
   --------------------------------------------------------------- */
const Q2_F = { kind: "parabola", a: 1, b: -4, c: -5, tone: "a", label: "f", labelAt: 5.6 };
const Q2_X1 = { x: -1, y: 0, on: 0, label: "(−1 ; 0)", place: "aboveLeft" };
const Q2_X2 = { x: 5, y: 0, on: 0, label: "(5 ; 0)", place: "aboveRight" };
const Q2_YI = { x: 0, y: -5, on: 0, label: "(0 ; −5)", place: "left" };
const Q2_TP = { x: 2, y: -9, on: 0, label: "TP(2 ; −9)", place: "below" };
const Q2_DIAGRAM = {
  spec: AXES({ xmin: -4, xmax: 8, ymin: -11, ymax: 8 }),
  parts: {
    a: { question: {}, reveal: { curves: [Q2_F], points: [Q2_X1, Q2_X2, Q2_YI] } },
    b: { question: {}, reveal: { curves: [Q2_F], points: [Q2_TP], vlines: [{ x: 2, label: "x = 2" }] } },
    c: { question: {}, reveal: { curves: [Q2_F], points: [Q2_X1, Q2_X2, Q2_YI, Q2_TP] } },
  },
};

const q2 = {
  id: "func.sib.sk.q2",
  chapter: CH,
  topic: "sketch",
  archetype: "sketch-a-parabola-given-in-standard-form-intercepts-then-turning-point",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "Consider the parabola f, defined by &nbsp;f(x) = x² − 4x − 5.<br><br>Determine the coordinates of the points where f cuts the x-axis and the y-axis.",
      },
      hint: {
        en: "For the x-intercepts put y = 0 and factorise the trinomial — two numbers that multiply to −5 and add to −4. The y-intercept needs no working at all: it is the number on the end.",
      },
      memo: [
        { type: "step", text: { en: "x-intercepts: put &nbsp;y = 0&nbsp; and factorise:" } },
        { type: "step", text: { en: "x² − 4x − 5 = 0 &nbsp;⟹&nbsp; (x − 5)(x + 1) = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x = 5&nbsp; or&nbsp; x = −1 &nbsp;&nbsp;∴&nbsp; (5 ; 0) and (−1 ; 0)" }, ticks: ["a"] },
        { type: "answer", text: { en: "y-intercept: put &nbsp;x = 0: &nbsp;f(0) = −5 &nbsp;&nbsp;∴&nbsp; (0 ; −5)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "In standard form &nbsp;y = ax² + bx + c&nbsp; the very last number, c, IS the y-intercept — put x = 0 and everything with an x in it disappears, leaving c behind. So that mark is free every time. The x-intercepts cost a little more: they are the values of x that make the height zero, which is a quadratic equation, which means factorising. Look for the pair of numbers that multiply to give −5 and add to give −4: that is −5 and +1. Once the brackets are there, each one is set equal to zero on its own, because the only way a product can be zero is if one of the pieces is zero. Write the answers as POINTS, not just as x-values — the question asked where the graph cuts, and a place needs both coordinates.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the coordinates of the turning point of f.",
      },
      hint: {
        en: "Two roads, both worth full marks: the formula &nbsp;x = −b/(2a)&nbsp; and then substitute back, or complete the square to force the equation into turning-point form. Pick the one you trust.",
      },
      memo: [
        { type: "step", text: { en: "a = 1, &nbsp;b = −4, &nbsp;so the turning point sits on &nbsp;x = −b/(2a):" } },
        { type: "step", text: { en: "x = −(−4)/(2(1)) = 2, &nbsp;then&nbsp; f(2) = (2)² − 4(2) − 5 = 4 − 8 − 5 = −9" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ &nbsp;TP(2 ; −9)" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — complete the square:" } },
        { type: "step", text: { en: "x² − 4x − 5 = (x² − 4x + 4) − 4 − 5 = (x − 2)² − 9 &nbsp;&nbsp;∴&nbsp; TP(2 ; −9)" } },
      ],
      esplain: {
        en: "Both roads end in the same place, so use the one your hand remembers. The formula road is quicker: half of b, sign swapped, divided by a, gives the x of the turning point; then put that x back into the equation to get its height. The completing-the-square road takes longer but gives you something extra — the whole equation rewritten in turning-point form, which you can then read like q1's. Take half of −4, which is −2, square it to get 4, add it inside and take it away again outside so nothing changes. Whichever road you walk, do the same free check at the end: the turning point's x must sit exactly halfway between the two x-intercepts. Halfway between −1 and 5 is 2, so it agrees.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence sketch the graph of f, showing clearly the intercepts with the axes and the coordinates of the turning point.",
      },
      hint: {
        en: "Plot the turning point and the three intercepts first, then join them. Check the sign of a before you draw a single line — that is what decides which way the arms point.",
      },
      memo: [
        { type: "step", text: { en: "a = 1 &gt; 0, so the parabola is <b>happy</b> — the arms point up and the turning point is the lowest point:" } },
        { type: "step", text: { en: "shape: happy, symmetrical about &nbsp;x = 2" }, ticks: ["ca"] },
        { type: "step", text: { en: "intercepts labelled: &nbsp;(−1 ; 0), &nbsp;(5 ; 0)&nbsp; and&nbsp; (0 ; −5)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "turning point labelled: &nbsp;TP(2 ; −9)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the turning point is BELOW the y-intercept here, at −9 against −5. Sketches often get squashed so that the lowest point of the curve sits level with the y-intercept — draw the turning point clearly lower, or the picture contradicts your own answers.",
        } },
      ],
      esplain: {
        en: "The order she teaches is the order that works: shape, then intercepts, then turning point, then draw. By the time you pick up your pencil you should be plotting, not thinking. The one thing a sketch has to get right beyond the labels is the relative positions — a marker will not measure, but the picture must not disagree with your own numbers. Here the graph passes through −5 on the y-axis and bottoms out at −9, so the lowest point of your curve must sit visibly lower than the y-intercept. Keep the two arms the same height either side of x = 2, put an arrow on each one to say it keeps going, and write every coordinate down. Four marks, four things: shape, x-intercepts, y-intercept, turning point.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — EXPONENTIAL a·b^(x − p) + q (her p14).
   k(x) = 2^(x − 1) − 4, asymptote y = −4, a = 1 &gt; 0 so ABOVE the
   asymptote, b = 2 &gt; 1 so TAKING OFF.
     y-intercept: k(0) = 2^(−1) − 4 = 0,5 − 4 = −3,5
     x-intercept: 2^(x − 1) = 4 = 2² ⟹ x − 1 = 2 ⟹ x = 3
   --------------------------------------------------------------- */
const Q3_K = { kind: "exp", a: 1, b: 2, p: 1, q: -4, tone: "a", label: "k", labelAt: 4.2 };
const Q3_YI = { x: 0, y: -3.5, on: 0, label: "(0 ; −3,5)", place: "left" };
const Q3_XI = { x: 3, y: 0, on: 0, label: "(3 ; 0)", place: "belowRight" };
const Q3_ASYM = { y: -4, of: 0, label: "y = −4" };
const Q3_DIAGRAM = {
  spec: AXES({ xmin: -5, xmax: 6, ymin: -6, ymax: 10 }),
  parts: {
    a: { question: {}, reveal: { curves: [Q3_K], asymptotes: [Q3_ASYM] } },
    b: { question: {}, reveal: { curves: [Q3_K], asymptotes: [Q3_ASYM], points: [Q3_YI, Q3_XI] } },
    c: { question: {}, reveal: { curves: [Q3_K], asymptotes: [Q3_ASYM], points: [Q3_YI, Q3_XI] } },
  },
};

const q3 = {
  id: "func.sib.sk.q3",
  chapter: CH,
  topic: "sketch",
  archetype: "sketch-an-exponential-asymptote-then-both-intercepts",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Consider the exponential graph k, defined by &nbsp;k(x) = 2<sup>x − 1</sup> − 4.<br><br>Write down the equation of the asymptote of k, and state whether the graph is taking off or landing.",
      },
      hint: {
        en: "The asymptote of an exponential graph is the number sitting on the very end of the equation. Then look at the base: bigger than 1 climbs away, between 0 and 1 settles down.",
      },
      memo: [
        { type: "answer", text: { en: "the number on the end is −4 &nbsp;&nbsp;∴&nbsp; the asymptote is &nbsp;y = −4" }, ticks: ["a"] },
        { type: "answer", text: { en: "the base is 2, and 2 &gt; 1 &nbsp;∴&nbsp; k is <b>taking off</b>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "An exponential graph flattens out towards one horizontal line and never quite reaches it, and that line is the number added on the end. Nothing else in the equation can move it, so reading the asymptote is a one-second job. Two more things live in the equation and they are worth naming while you are there. The base decides which way the graph runs: a base bigger than 1 is taking off, so the curve climbs steeply on the right and flattens on the left; a base between 0 and 1 is landing, the mirror image. And the number in front — here an invisible 1, which is positive — decides which SIDE of the asymptote the whole curve sits on. Positive means above. So before you plot a single point you already know the shape and where it lives.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Determine the coordinates of the points where k cuts the y-axis and the x-axis.",
      },
      hint: {
        en: "The y-intercept is a plain substitution — but watch the negative exponent it gives you. For the x-intercept, get the power on its own and then write both sides as a power of the same base.",
      },
      memo: [
        { type: "answer", text: { en: "y-intercept: &nbsp;k(0) = 2<sup>0 − 1</sup> − 4 = 0,5 − 4 = −3,5 &nbsp;&nbsp;∴&nbsp; (0 ; −3,5)" }, ticks: ["a"] },
        { type: "step", text: { en: "x-intercept: put &nbsp;y = 0&nbsp; and get the power alone:" } },
        { type: "step", text: { en: "2<sup>x − 1</sup> − 4 = 0 &nbsp;⟹&nbsp; 2<sup>x − 1</sup> = 4 = 2<sup>2</sup>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "same base, so the powers are equal: &nbsp;x − 1 = 2 &nbsp;⟹&nbsp; x = 3 &nbsp;&nbsp;∴&nbsp; (3 ; 0)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 2 to the power −1 is a half, NOT −2. A negative exponent means one over the thing; it never makes the answer negative.",
        } },
      ],
      esplain: {
        en: "The y-intercept comes from putting x = 0, which here leaves 2 to the power −1. That is the step people lose, because a minus in an exponent looks like it should make the answer negative. It does not — a negative exponent means one over, so it makes the answer small and positive, and a half minus 4 is −3,5. The x-intercept is a different game. Get the power on its own first, so that the equation reads “2 to the something equals 4”, and then turn the 4 into a power of 2 as well. Once both sides are powers of the SAME base, the powers themselves must be equal, and the whole exponential problem collapses into a one-line linear equation. Not every exponential graph has an x-intercept — this one does only because its asymptote sits below the x-axis, so the curve has to climb up through zero on its way.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence sketch the graph of k, showing the asymptote and both intercepts with the axes.",
      },
      hint: {
        en: "Draw the asymptote as a dashed line FIRST and label it — the curve is built around it. Then plot your two intercepts and let the curve hug the dashed line on the left.",
      },
      memo: [
        { type: "step", text: { en: "asymptote drawn as a dashed line and labelled &nbsp;y = −4" }, ticks: ["ca"] },
        { type: "step", text: { en: "both intercepts plotted and labelled: &nbsp;(0 ; −3,5)&nbsp; and&nbsp; (3 ; 0)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "shape: taking off — flattening towards &nbsp;y = −4&nbsp; on the left, climbing steeply on the right, always ABOVE the dashed line" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the curve must never touch or cross its asymptote. A sketch that flattens out ONTO the dashed line, or dips under it, throws away the shape mark no matter how good the intercepts are.",
        } },
      ],
      esplain: {
        en: "With an exponential the asymptote is the skeleton, so draw it before the curve — dashed, and labelled with its equation. Everything else hangs off it. On the left the curve gets closer and closer to the dashed line but always stays above it, because the number in front is positive; on the right it lifts away faster and faster, because the base is bigger than 1. In between it passes through the two points you worked out. The commonest lost mark is drawing the tail flat ALONG the asymptote, which says the curve reaches it — it never does, and a marker looks for that gap. The second commonest is forgetting to label the dashed line at all, which turns a correct picture into an unfinished one.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — HYPERBOLA a/(x + p) + q, ASYMPTOTES FIRST (her p10 order).
   h(x) = 8/(x + 1) − 2, asymptotes x = −1 and y = −2, a &gt; 0.
     x-intercept: 8/(x + 1) = 2 ⟹ x + 1 = 4 ⟹ x = 3
     y-intercept: h(0) = 8 − 2 = 6
   The one level-3 part on this card is the sketch itself: a hyperbola
   is the graph a learner is most likely to draw as one curve instead
   of two branches.
   --------------------------------------------------------------- */
const Q4_H = { kind: "hyperbola", a: 8, p: -1, q: -2, tone: "a", label: "h", labelAt: -4 };
const Q4_AV = { x: -1, of: 0, label: "x = −1" };
const Q4_AH = { y: -2, of: 0, label: "y = −2" };
const Q4_XI = { x: 3, y: 0, on: 0, label: "(3 ; 0)", place: "aboveRight" };
const Q4_YI = { x: 0, y: 6, on: 0, label: "(0 ; 6)", place: "right" };
const Q4_DIAGRAM = {
  spec: AXES({ xmin: -9, xmax: 8, ymin: -10, ymax: 10 }),
  parts: {
    a: { question: {}, reveal: { curves: [Q4_H], asymptotes: [Q4_AV, Q4_AH] } },
    b: { question: {}, reveal: { curves: [Q4_H], asymptotes: [Q4_AV, Q4_AH], points: [Q4_XI, Q4_YI] } },
    c: { question: {}, reveal: { curves: [Q4_H], asymptotes: [Q4_AV, Q4_AH], points: [Q4_XI, Q4_YI] } },
  },
};

const q4 = {
  id: "func.sib.sk.q4",
  chapter: CH,
  topic: "sketch",
  archetype: "sketch-a-hyperbola-asymptotes-first-then-intercepts",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Consider the hyperbola h, defined by &nbsp;h(x) = 8/(x + 1) − 2.<br><br>Write down the equations of the two asymptotes of h.",
      },
      hint: {
        en: "Line the equation up against &nbsp;y = a/(x − p) + q. The vertical asymptote is the x-value that would make the bottom of the fraction zero; the horizontal one is the number on the end.",
      },
      memo: [
        { type: "answer", text: { en: "the bottom of the fraction is zero when &nbsp;x + 1 = 0 &nbsp;⟹&nbsp; the vertical asymptote is &nbsp;x = −1" }, ticks: ["a"] },
        { type: "answer", text: { en: "the number on the end is −2 &nbsp;⟹&nbsp; the horizontal asymptote is &nbsp;y = −2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the bracket reads x + 1, so the asymptote is x = −1, not x = 1. Ask which x breaks the fraction rather than copying the number you can see.",
        } },
      ],
      esplain: {
        en: "A hyperbola is easier to picture as a CORNER than as a curve: the two asymptotes cross at one point, and both branches are built around that crossing. So the asymptotes come first, always. The vertical one is the x-value the graph is not allowed to have, because dividing by zero is not a thing — set the bottom of the fraction equal to zero and solve. The horizontal one is the height the branches flatten out towards but never reach, and that is simply the number added on the end. Together they give you the corner: here it sits at (−1 ; −2). Get those two lines down and the rest of the sketch is mostly a matter of deciding which two of the four regions around the corner the branches live in.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Determine the coordinates of the points where h cuts the axes.",
      },
      hint: {
        en: "Same two questions as always: y = 0 for the x-intercept, x = 0 for the y-intercept. For the x-intercept, move the −2 across first so the fraction stands alone.",
      },
      memo: [
        { type: "step", text: { en: "x-intercept: put &nbsp;y = 0&nbsp; and get the fraction alone:" } },
        { type: "step", text: { en: "8/(x + 1) − 2 = 0 &nbsp;⟹&nbsp; 8/(x + 1) = 2 &nbsp;⟹&nbsp; x + 1 = 4" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x = 3 &nbsp;&nbsp;∴&nbsp; (3 ; 0)" }, ticks: ["a"] },
        { type: "answer", text: { en: "y-intercept: put &nbsp;x = 0: &nbsp;h(0) = 8/(0 + 1) − 2 = 8 − 2 = 6 &nbsp;&nbsp;∴&nbsp; (0 ; 6)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The x-intercept of a hyperbola is the one place a fraction equation shows up in a graphs question, and the tidy way through is to get the fraction on its own before doing anything else. Once you have “8 over something equals 2”, you can flip your thinking: if 8 divided by that bracket gives 2, the bracket must be 4. No cross-multiplying, no panic. Then solve the little linear equation that is left. The y-intercept is the easy one — put x = 0 and work it out — but do check that x = 0 is actually allowed. Here the graph is only forbidden from x = −1, so the y-axis is fine. A hyperbola whose vertical asymptote sat ON the y-axis would have no y-intercept at all, and saying so is worth the mark.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence sketch the graph of h, showing both asymptotes and both intercepts with the axes.",
      },
      hint: {
        en: "Draw the two dashed asymptotes first and label them — they cut the page into four regions. Your two intercepts tell you which two regions the branches live in, and then each branch hugs both dashed lines.",
      },
      memo: [
        { type: "step", text: { en: "both asymptotes drawn dashed and labelled: &nbsp;x = −1&nbsp; and&nbsp; y = −2" }, ticks: ["ca"] },
        { type: "step", text: { en: "both intercepts plotted and labelled: &nbsp;(3 ; 0)&nbsp; and&nbsp; (0 ; 6)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "shape: TWO separate branches, a &gt; 0, so one branch above-right of the corner (−1 ; −2) through (0 ; 6) and (3 ; 0), and the other below-left — each one hugging both dashed lines without touching them" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: a hyperbola is TWO branches, never one continuous curve. Joining them across the vertical asymptote is the single most expensive mistake on this question — it says the graph has a value at x = −1, which is exactly what the asymptote forbids.",
        } },
      ],
      esplain: {
        en: "Build the picture in the order she teaches it. First the two dashed lines, labelled — they cross at the corner and cut the page into four regions. Next your intercepts: both of them, (0 ; 6) and (3 ; 0), sit up and to the right of the corner, so that region definitely holds a branch. Because a is positive, the other branch sits diagonally opposite, down and to the left. Now draw each branch so that it comes in close to one dashed line, sweeps round, and runs away close to the other — never touching either. Two things a marker checks first: that there really are two separate pieces with a clean gap at the vertical asymptote, and that the branches are on opposite corners rather than side by side. Then the labels.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — A LINE AND A PARABOLA ON ONE SET OF AXES (paper-bank
   archetype 5's picture, built rather than read).
   f(x) = −x² + 4x + 5 = −(x − 5)(x + 1) — sad, TP(2 ; 9), y-int 5.
   g(x) = x + 1 — x-intercept −1 (the SAME point f cuts), y-int 1.
   --------------------------------------------------------------- */
const Q5_F = { kind: "parabola", a: -1, b: 4, c: 5, tone: "a", label: "f", labelAt: 5.6 };
const Q5_G = { kind: "line", a: 1, q: 1, tone: "b", label: "g", labelAt: 6.2 };
/* (−1 ; 0) is on BOTH graphs, but (a)'s reveal draws f alone — so it
   gets its own single-curve copy there; every later reveal draws both
   curves and can claim both. */
const Q5_FX1_F = { x: -1, y: 0, on: 0, label: "(−1 ; 0)", place: "belowLeft" };
const Q5_FX1 = { x: -1, y: 0, on: [0, 1], label: "(−1 ; 0)", place: "belowLeft" };
const Q5_FX2 = { x: 5, y: 0, on: 0, label: "(5 ; 0)", place: "belowRight" };
const Q5_FYI = { x: 0, y: 5, on: 0, label: "(0 ; 5)", place: "left" };
const Q5_FTP = { x: 2, y: 9, on: 0, label: "TP(2 ; 9)", place: "above" };
const Q5_GYI = { x: 0, y: 1, on: 1, label: "(0 ; 1)", place: "belowLeft" };
const Q5_DIAGRAM = {
  spec: AXES({ xmin: -5, xmax: 7, ymin: -6, ymax: 12 }),
  parts: {
    a: { question: {}, reveal: { curves: [Q5_F], points: [Q5_FX1_F, Q5_FX2, Q5_FTP] } },
    b: { question: {}, reveal: { curves: [Q5_F, Q5_G], points: [Q5_FX1, Q5_GYI] } },
    c: { question: {}, reveal: { curves: [Q5_F, Q5_G], points: [Q5_FX1, Q5_FX2, Q5_FYI, Q5_FTP, Q5_GYI] } },
  },
};

const q5 = {
  id: "func.sib.sk.q5",
  chapter: CH,
  topic: "sketch",
  archetype: "sketch-a-line-and-a-parabola-on-the-same-set-of-axes",
  paper: PAPER,
  diagram: Q5_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 10,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "Consider &nbsp;f(x) = −x² + 4x + 5&nbsp; and&nbsp; g(x) = x + 1.<br><br>Determine the coordinates of the x-intercepts and of the turning point of f.",
      },
      hint: {
        en: "Take the minus out in front before you factorise — it makes the trinomial an ordinary one. Then the turning point sits exactly halfway between the two x-intercepts.",
      },
      memo: [
        { type: "step", text: { en: "x-intercepts: put &nbsp;y = 0&nbsp; and take out the −1 first:" } },
        { type: "step", text: { en: "−x² + 4x + 5 = 0 &nbsp;⟹&nbsp; −(x² − 4x − 5) = 0 &nbsp;⟹&nbsp; −(x − 5)(x + 1) = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x = 5&nbsp; or&nbsp; x = −1 &nbsp;&nbsp;∴&nbsp; (5 ; 0) and (−1 ; 0)" }, ticks: ["a"] },
        { type: "step", text: { en: "turning point: &nbsp;x = −b/(2a) = −4/(2(−1)) = 2, &nbsp;then&nbsp; f(2) = −4 + 8 + 5 = 9" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ &nbsp;TP(2 ; 9)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the turning point of a parabola always sits halfway between its two x-intercepts. Halfway between −1 and 5 is 2 — a five-second check that catches a sign slip in the formula.",
        } },
      ],
      esplain: {
        en: "A leading minus makes a trinomial look much worse than it is, so take it out first and factorise the friendly version that is left. Doing that also makes the shape obvious: a negative in front means the arms point down, so this graph rises to a peak and comes back. Once the x-intercepts are found there are two ways to the turning point, and the halfway shortcut is the fastest — the parabola is symmetrical, so its highest point sits above the midpoint of its two roots. Use the formula as the main working and the halfway idea as the check, or the other way round; either way you should end up agreeing with yourself. Then substitute back into f to get the height, and write the answer as a POINT.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the coordinates of the points where g cuts the axes.",
      },
      hint: {
        en: "A straight line cuts each axis once. Put y = 0 for one and x = 0 for the other — both are one-line calculations.",
      },
      memo: [
        { type: "answer", text: { en: "x-intercept: &nbsp;x + 1 = 0 &nbsp;⟹&nbsp; x = −1 &nbsp;&nbsp;∴&nbsp; (−1 ; 0)" }, ticks: ["a"] },
        { type: "answer", text: { en: "y-intercept: &nbsp;g(0) = 1 &nbsp;&nbsp;∴&nbsp; (0 ; 1)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "For a straight line written as y = mx + c, the y-intercept is c — no working needed — and the x-intercept comes from setting y to zero and solving one small equation. What is worth noticing here is that g cuts the x-axis at −1, which is exactly where f cuts it too. That is not a coincidence you have to prove; it is a gift for the sketch, because it tells you one place where the two graphs definitely touch each other. When two graphs share a point, plot it once, label it once, and make sure both curves are drawn passing through it — a sketch where the line misses the parabola's root by a few millimetres is a sketch that contradicts your own working.",
      },
    },
    {
      id: "c",
      marks: 4,
      level: 3,
      prompt: {
        en: "Hence sketch f and g on the same set of axes. Show clearly all the intercepts with the axes and the coordinates of the turning point of f.",
      },
      hint: {
        en: "Do the parabola first, because it needs the most room, and choose your scale so the turning point at height 9 still fits. Then rule the line through its two intercepts and check it really passes through the point they share.",
      },
      memo: [
        { type: "step", text: { en: "shape of f: sad, symmetrical about &nbsp;x = 2" }, ticks: ["ca"] },
        { type: "step", text: { en: "f labelled at &nbsp;(−1 ; 0), &nbsp;(5 ; 0), &nbsp;(0 ; 5)&nbsp; and&nbsp; TP(2 ; 9)" }, ticks: ["ca"] },
        { type: "step", text: { en: "g drawn as a straight line through &nbsp;(−1 ; 0)&nbsp; and&nbsp; (0 ; 1)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "both graphs named on the sketch, and the shared point &nbsp;(−1 ; 0)&nbsp; shown with the line passing through the parabola's own x-intercept" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: name both graphs. When two graphs share a page, a marker cannot award the line's marks unless the sketch says which curve is f and which is g.",
        } },
      ],
      esplain: {
        en: "Two graphs on one page is mostly a planning problem. Look at your numbers before you draw anything: the highest point you need is 9 and the lowest is 0, so choose a vertical scale that fits 9 comfortably, or the peak ends up jammed against the top of the page. Sketch the parabola first for the same reason — it is the fussy one. The line is easy: two points and a ruler. Then check the join. Both graphs pass through (−1 ; 0), so your line must actually meet the parabola there rather than near there. Finish by writing f and g next to their own curves. Four marks here, and one of them is purely for making the page readable: shape, parabola's points, the line, and the labelling that lets a marker tell them apart.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — THE ROUGH SKETCH FROM SIGN CONDITIONS ONLY
   (GR11-IEB-PAPER-BANK.md archetype 5b — "sketch given a &lt; 0,
   p &gt; 0, q &gt; 0", no numbers anywhere; her p4 for the meaning of
   each letter).
     f(x) = a(x + p)² + q, a &lt; 0, p &gt; 0, q &gt; 0
     ⟹ sad; turning point (−p ; q) with −p &lt; 0 and q &gt; 0, so the
       SECOND quadrant; the maximum is above the x-axis, so TWO
       x-intercepts.
     The y-intercept is ap² + q and its sign is NOT determined — that
     is the trap card, and it is why the reveal's curve is only ever
     REPRESENTATIVE.
   THE REVEAL'S CURVE: f(x) = −(x + 1)² + 4, TP(−1 ; 4), x-intercepts
   1 and −3. Chosen only because it has every required feature; the
   memo says in as many words that any curve with those features earns
   the marks.
   --------------------------------------------------------------- */
const Q6_REP = { kind: "parabola", a: -1, p: -1, q: 4, tone: "a", label: "f", labelAt: 1.9 };
const Q6_TP_ONLY = { x: -1, y: 4, label: "TP(−p ; q)", place: "above" };
const Q6_TP_ON = { x: -1, y: 4, on: 0, label: "TP(−p ; q)", place: "above" };
const Q6_R1 = { x: -3, y: 0, on: 0 };
const Q6_R2 = { x: 1, y: 0, on: 0 };
const Q6_DIAGRAM = {
  spec: AXES({ xmin: -6, xmax: 5, ymin: -6, ymax: 7 }),
  parts: {
    // (a) finds WHERE the turning point is, so its reveal marks that and
    // nothing else — the curve itself is (b)'s answer.
    a: { question: {}, reveal: { points: [Q6_TP_ONLY] } },
    b: { question: { points: [Q6_TP_ONLY] }, reveal: { curves: [Q6_REP], points: [Q6_TP_ON, Q6_R1, Q6_R2] } },
  },
};

const q6 = {
  id: "func.sib.sk.q6",
  chapter: CH,
  topic: "sketch",
  archetype: "rough-sketch-of-a-parabola-from-sign-conditions-only",
  paper: PAPER,
  diagram: Q6_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn1" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The parabola f is defined by &nbsp;f(x) = a(x + p)² + q, &nbsp;where&nbsp; a &lt; 0, &nbsp;p &gt; 0&nbsp; and&nbsp; q &gt; 0. &nbsp;No values are given.<br><br>State, with a reason, whether f has a maximum or a minimum value, and write down in which quadrant its turning point lies.",
      },
      hint: {
        en: "Work in letters, not numbers. The sign of a decides happy or sad on its own. For the turning point, first write down its coordinates in terms of p and q — then ask whether each one is positive or negative.",
      },
      memo: [
        { type: "answer", text: { en: "a &lt; 0, so the graph is <b>sad</b> &nbsp;∴&nbsp; f has a MAXIMUM value" }, ticks: ["a"] },
        { type: "step", text: { en: "in &nbsp;y = a(x − p)² + q&nbsp; the turning point is (p ; q), and the bracket here reads x + p, so the turning point is &nbsp;(−p ; q)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "p &gt; 0 makes −p &lt; 0 (left of the y-axis), and q &gt; 0 is above the x-axis &nbsp;&nbsp;∴&nbsp; the turning point lies in the SECOND quadrant" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: p &gt; 0 does NOT put the turning point on the right. The bracket reads x + p, so the turning point's x is −p, which is negative. Write the coordinates down in letters before you decide anything.",
        } },
      ],
      esplain: {
        en: "A question with no numbers in it is asking whether you know what each letter DOES, so answer it letter by letter. The a in front controls the shape and nothing else: negative means the arms point down, which makes the turning point the highest the graph ever gets, and that is what a maximum means. The other two letters control position. Written properly the form is y = a(x − p)² + q, so a bracket reading x + p has its turning point at x = −p, and being told that p is positive therefore puts the turning point to the LEFT of the y-axis. The q is honest: it is the turning point's height, and being positive puts it above the x-axis. Left and above is the second quadrant.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence draw a rough sketch of f. Show the turning point and the number of times the graph cuts the x-axis. No values are needed.",
      },
      hint: {
        en: "You know the shape and where the peak sits. Now ask one more question before drawing: if the highest point of a sad parabola is ABOVE the x-axis, how many times must the curve cross that axis on its way down?",
      },
      memo: [
        { type: "step", text: { en: "shape: sad, arms pointing down" }, ticks: ["ca"] },
        { type: "step", text: { en: "turning point drawn in the second quadrant and labelled &nbsp;(−p ; q)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "the maximum is ABOVE the x-axis and both arms run down forever &nbsp;∴&nbsp; the graph cuts the x-axis TWICE — two x-intercepts shown" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: you cannot decide where the graph cuts the y-axis. That height is ap² + q — a negative plus a positive — so it may come out above OR below the origin. Any rough sketch with the right shape, the turning point in the second quadrant and two x-intercepts earns the marks.",
        } },
      ],
      esplain: {
        en: "A rough sketch is marked on FEATURES, not on accuracy, so decide the features one at a time and then draw whatever curve shows them. Sad shape, from the sign of a. Peak up and to the left, from the signs of p and q. And then the piece that is really being tested: a sad parabola whose highest point is above the x-axis has to come back down through that axis on both sides, so it must cut it exactly twice. That is the same fact the discriminant would tell you, read straight off the picture instead. The one thing you must NOT pretend to know is the y-intercept, because it depends on how big a and p are, and you were told only their signs. Leave it unmarked and say why — that honesty is part of the answer.",
      },
    },
  ],
};

export const funcSketchSiblingQuestions = [q1, q2, q3, q4, q5, q6];
