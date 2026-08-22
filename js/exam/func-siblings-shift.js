/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill "shift"
   (SESSION 2b of the four-session function-diagram build, 2026-08-22.)
   ------------------------------------------------------------
   Four new cards, taking this tile from two to six.

   WHY THIS FILE EXISTS. "Shift the graph" held exactly two cards —
   func.lp.q1(d), a parabola moved 2 left and 5 up, and func.hyp.t2q3(c),
   a hyperbola moved 2 left and 4 down. Both are "here is a shift in
   WORDS, write the new equation". A learner who tapped "Another one!"
   twice ran out, and never once met the shift written in FUNCTION
   NOTATION, which is how her pp19–24 actually teach it and how a paper
   asks for it.

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   Her pp19–24 — f(x ± k), f(x) ± k, −f(x), f(−x), k·f(x), the three
   fill-in tables and the reflection worked examples — plus p9 for what
   a shift does to an axis of symmetry and p14 for the exponential's
   "taking off / landing" and "above/below the asymptote" language. The
   question TYPES and the METHODS are hers; every number here is fresh.
   None of the digest's four flagged slips is mined.

   WHAT THE FOUR COVER, and why these four:
     q1  PARABOLA in function notation — g(x) = f(x − 3) sideways, then
         h(x) = −f(x), the whole-equation reflection
     q2  HYPERBOLA — the same two moves, but asked through the
         ASYMPTOTES: which one moves and which one stays put
     q3  EXPONENTIAL — f(x) + 3 lifts the asymptote, then f(−x) turns
         "taking off" into "landing" without moving the asymptote at all
     q4  the question backwards — two graphs are given and the learner
         DESCRIBES the shift, then writes it in function notation

   THE SKETCH SHOWS THE ORIGINAL; THE SHIFTED GRAPH APPEARS ON THE
   REVEAL (the brief's rule for this skill, and the wider "the reveal
   draws what it found" rule in js/exam/_schema.js). So every base
   figure here draws f alone, and each part's own reveal adds the graph
   it produced, in tone "b", named, together with its own captioned
   asymptotes where it has any. Every asymptote that is GIVEN carries
   its caption on the question side.

   q4 IS THE ONE EXCEPTION, and it is deliberate: both graphs are given
   in its stem, so both are drawn from the start. What its reveals add
   is the two turning points and then the two axes of symmetry, dashed
   and captioned — the 5-right-5-up move made visible.

   LEVELS: mostly 1–2, exactly one level 3 (q4(b) — the shift read
   backwards off two graphs AND written in function notation). Nothing
   here is level 4.
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — PARABOLA, THE SHIFT GIVEN IN FUNCTION NOTATION (her pp19–24).
   f(x) = (x − 1)² − 4, TP(1 ; −4), x-intercepts −1 and 3.
     (a) g(x) = f(x − 3) = (x − 4)² − 4, TP(4 ; −4)
     (b) h(x) = −f(x)   = −(x − 1)² + 4, TP(1 ; 4)
   f's own turning point is GIVEN in the stem, so it is on the base
   figure; each new graph and its new turning point belong to the
   reveal of the part that produced them.
   --------------------------------------------------------------- */
const Q1_F = { kind: "parabola", a: 1, p: 1, q: -4 };
const Q1_TP = { x: 1, y: -4, on: 0, label: "TP(1 ; −4)", place: "below" };
const Q1_G = { kind: "parabola", a: 1, p: 4, q: -4, tone: "b", label: "g", labelAt: 6.4 };
const Q1_G_TP = { x: 4, y: -4, on: 1, label: "TP(4 ; −4)", place: "below" };
const Q1_H = { kind: "parabola", a: -1, p: 1, q: 4, tone: "b", label: "h", labelAt: -1.5 };
const Q1_H_TP = { x: 1, y: 4, on: 1, label: "TP(1 ; 4)", place: "above" };
const Q1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 8, ymin: -7, ymax: 7 },
    curves: [{ ...Q1_F, tone: "a", label: "f", labelAt: -1.8 }],
    points: [Q1_TP],
  },
  parts: {
    // f's own TP is already on the BASE spec, so a highlight must only
    // ever ADD the new one — a repeat would draw the label twice.
    a: { question: {}, reveal: { points: [Q1_G_TP], curves: [Q1_G] } },
    b: { question: {}, reveal: { points: [Q1_H_TP], curves: [Q1_H] } },
  },
};

const q1 = {
  id: "func.sib.sh.q1",
  chapter: CH,
  topic: "shift",
  archetype: "parabola-shift-and-reflection-in-function-notation",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn6" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = (x − 1)² − 4, &nbsp;with turning point TP(1 ; −4).<br><br>A new graph g is defined by &nbsp;g(x) = f(x − 3). &nbsp;Write down the equation of g and the coordinates of its turning point.",
      },
      hint: {
        en: "Everything that happens inside the bracket moves the graph sideways. Replace every x in f's equation by x − 3 and see what the bracket becomes — then ask which x now makes that bracket zero.",
      },
      memo: [
        { type: "step", text: { en: "g(x) = f(x − 3) means: wherever f has an x, write x − 3 instead." } },
        { type: "answer", text: { en: "g(x) = ((x − 3) − 1)² − 4 = (x − 4)² − 4" }, ticks: ["a"] },
        { type: "answer", text: { en: "the bracket is zero at x = 4, and the −4 outside is untouched &nbsp;∴&nbsp; TP(4 ; −4)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: f(x − 3) moves the graph 3 units to the RIGHT, not left. It feels backwards, so check it on the turning point rather than trusting the sign: 1 became 4, so the graph went right.",
        } },
      ],
      esplain: {
        en: "Function notation is just an instruction sheet for the machine. g(x) = f(x − 3) says: before you do anything, take 3 off the x you were handed, then run f on that. So to get the answer f used to give at x = 1, you now have to feed the machine x = 4 — and that is exactly why the whole picture slides 3 units to the right. Everything else about the parabola is untouched: the a stays 1, so it is still the same width and still happy, and the −4 outside the bracket is left alone, so the turning point keeps its height. The safest way to write the new equation is to do it literally — put the whole of x − 3 into every x slot, brackets and all, and only then tidy up. The safest way to check it is to look at the turning point before and after and say out loud which way it moved.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "A second new graph h is defined by &nbsp;h(x) = −f(x). &nbsp;Write down the equation of h and the coordinates of its turning point.",
      },
      hint: {
        en: "The minus is sitting outside f, so it happens to the answer the machine gives, not to the x it is fed. Multiply the WHOLE equation by −1 — every term, not just the first one.",
      },
      memo: [
        { type: "step", text: { en: "−f(x) means multiply the <b>whole</b> equation by −1:" } },
        { type: "answer", text: { en: "h(x) = −[(x − 1)² − 4] = −(x − 1)² + 4" }, ticks: ["a"] },
        { type: "answer", text: { en: "the bracket is still zero at x = 1, and the height has changed sign &nbsp;∴&nbsp; TP(1 ; 4)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the − 4 has to change sign too. Writing −(x − 1)² − 4 is the most common slip on this question — the minus belongs to every term inside the square brackets, not only to the squared one.",
        } },
      ],
      esplain: {
        en: "−f(x) is a mirror, and the mirror is the x-axis. Whatever height f reached at some x, h reaches the same distance the other side of the axis — so a point that was 4 below lands 4 above, and a point that was 12 above lands 12 below. Two things follow without any algebra. First, the graph flips from happy to sad, because every arm that pointed up now points down. Second, the turning point keeps its x and swaps the sign of its y, because it is a point like any other. Nothing moves sideways at all, which is the difference between this and part (a): a change OUTSIDE f acts on the answer and moves the graph vertically, a change INSIDE f acts on the input and moves it horizontally. The only place marks go missing is forgetting that the minus has to reach the last term as well.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — HYPERBOLA: WHICH ASYMPTOTE MOVES (her pp19–24 with p10).
   f(x) = 3/(x − 2) + 1, asymptotes x = 2 and y = 1 — both GIVEN, so
   both are drawn and captioned on every question side.
     (a) g(x) = f(x + 4) = 3/(x + 2) + 1  → only x = 2 moves, to x = −2
     (b) h(x) = f(x) − 5 = 3/(x − 2) − 4  → only y = 1 moves, to y = −4
   Each reveal adds the new curve AND only the asymptote that actually
   moved, so the picture says which one stayed put.
   --------------------------------------------------------------- */
const Q2_F = { kind: "hyperbola", a: 3, p: 2, q: 1 };
const Q2_G = { kind: "hyperbola", a: 3, p: -2, q: 1, tone: "b", label: "g", labelAt: -1 };
const Q2_H = { kind: "hyperbola", a: 3, p: 2, q: -4, tone: "b", label: "h", labelAt: 5 };
const Q2_SPEC = {
    type: "function",
    win: { xmin: -7, xmax: 8, ymin: -6, ymax: 8 },
    curves: [{ ...Q2_F, tone: "a", label: "f", labelAt: 3 }],
    asymptotes: [{ x: 2, of: 0, label: "x = 2" }, { y: 1, of: 0, label: "y = 1" }],
  };
const Q2_DIAGRAM = {
  spec: Q2_SPEC,
  parts: {
    a: { question: {}, reveal: { curves: [Q2_G], asymptotes: [{ x: -2, of: 1, label: "x = −2" }] } },
    // (b)'s own deeper window: h = f − 5 sits 5 lower, so its lower-left
    // branch needs room below y = −4 (foreman review fix, 2026-08-23)
    b: { spec: { ...Q2_SPEC, win: { xmin: -7, xmax: 8, ymin: -10, ymax: 8 } }, question: {}, reveal: { curves: [Q2_H], asymptotes: [{ y: -4, of: 1, label: "y = −4" }] } },
  },
};

const q2 = {
  id: "func.sib.sh.q2",
  chapter: CH,
  topic: "shift",
  archetype: "hyperbola-shift-read-through-its-asymptotes",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn6" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The sketch shows the hyperbola f, defined by &nbsp;f(x) = 3/(x − 2) + 1. &nbsp;Its asymptotes x = 2 and y = 1 are the dashed lines.<br><br>The graph of g is defined by &nbsp;g(x) = f(x + 4). &nbsp;Determine the equation of g and the equations of both its asymptotes.",
      },
      hint: {
        en: "The + 4 is inside f, so it acts on the x before the machine starts — that is a sideways move. Write x + 4 into every x slot, then read the new asymptotes off the new equation the way you always do.",
      },
      memo: [
        { type: "step", text: { en: "g(x) = f(x + 4) means: wherever f has an x, write x + 4 instead." } },
        { type: "answer", text: { en: "g(x) = 3/((x + 4) − 2) + 1 = 3/(x + 2) + 1" }, ticks: ["a"] },
        { type: "step", text: { en: "read the asymptotes off the new form &nbsp;y = a/(x − p) + q: &nbsp;the denominator x + 2 is zero at x = −2, and the number on the end is still 1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = −2 &nbsp;and&nbsp; y = 1 &nbsp;&nbsp;— the vertical one moved 4 units LEFT, the horizontal one did not move at all" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: f(x + 4) moves the graph 4 units LEFT. Check it on the asymptote instead of trusting the sign — x = 2 became x = −2, so the picture went left.",
        } },
      ],
      esplain: {
        en: "A hyperbola is easiest to think about as a corner rather than a curve: the two asymptotes cross at one point, and everything else is built around it. So a shift question about a hyperbola is really a question about where that corner ends up. Here the + 4 lives inside f, which means it changes the x before the machine ever runs — and a change to the input always moves the picture sideways. Four units left, so the corner's x goes from 2 to −2 and the vertical asymptote goes with it. The corner's HEIGHT was never touched, because nothing was added or subtracted outside f, so the horizontal asymptote stays exactly where it was at y = 1. That split is worth saying out loud every time: inside the bracket moves it sideways and only the vertical asymptote cares; outside moves it up or down and only the horizontal asymptote cares.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "The graph of h is defined by &nbsp;h(x) = f(x) − 5. &nbsp;Determine the equation of h and the equations of both its asymptotes.",
      },
      hint: {
        en: "This time the 5 is outside f, so it happens to the answer after the machine has finished. Take 5 off the whole thing and see which of the two asymptotes notices.",
      },
      memo: [
        { type: "step", text: { en: "f(x) − 5 means: run f, then take 5 off the answer." } },
        { type: "answer", text: { en: "h(x) = 3/(x − 2) + 1 − 5 = 3/(x − 2) − 4" }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 2 &nbsp;and&nbsp; y = −4 &nbsp;&nbsp;— this time the horizontal one moved 5 units DOWN and the vertical one stayed put" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Compare this with part (a) and the whole rule falls into place. There the change was inside f and the graph slid sideways; here it is outside f and the graph slides straight down. A vertical slide cannot possibly change which x breaks the fraction, so the vertical asymptote is untouched at x = 2. What it does change is the height the branches flatten out towards, and that height is the number sitting on the end of the equation — 1 goes down by 5 and becomes −4. Notice that the 3 on top never enters either conversation: it decides how far the branches sit from the corner, and shifting the picture does not stretch or squash it.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — EXPONENTIAL: f(x) + 3 AND f(−x) (her pp19–24 with p14).
   f(x) = 2ˣ − 4, asymptote y = −4, y-intercept (0 ; −3),
   x-intercept (2 ; 0) — all three GIVEN in the stem.
     (a) g(x) = f(x) + 3 = 2ˣ − 1, asymptote y = −1
     (b) h(x) = f(−x)   = (1/2)ˣ − 4, same asymptote, x-intercept (−2 ; 0)
   Her vocabulary throughout: taking off / landing, and a above or
   below the asymptote.
   --------------------------------------------------------------- */
const Q3_F = { kind: "exp", a: 1, b: 2, p: 0, q: -4 };
const Q3_YI = { x: 0, y: -3, on: 0, label: "(0 ; −3)" };
const Q3_XI = { x: 2, y: 0, on: 0, label: "(2 ; 0)" };
const Q3_G = { kind: "exp", a: 1, b: 2, p: 0, q: -1, tone: "b", label: "g", labelAt: 3 };
const Q3_H = { kind: "exp", a: 1, b: 0.5, p: 0, q: -4, tone: "b", label: "h", labelAt: -2.6 };
const Q3_H_XI = { x: -2, y: 0, on: 1, label: "(−2 ; 0)" };
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -5, xmax: 5, ymin: -6, ymax: 9 },
    curves: [{ ...Q3_F, tone: "a", label: "f", labelAt: 2.6 }],
    asymptotes: [{ y: -4, of: 0, label: "y = −4" }],
    points: [Q3_YI, Q3_XI],
  },
  parts: {
    a: { question: {}, reveal: { curves: [Q3_G], asymptotes: [{ y: -1, of: 1, label: "y = −1" }] } },
    b: { question: {}, reveal: { curves: [Q3_H], points: [Q3_H_XI] } },
  },
};

const q3 = {
  id: "func.sib.sh.q3",
  chapter: CH,
  topic: "shift",
  archetype: "exponential-vertical-shift-then-reflection-in-the-y-axis",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn6" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the exponential graph f, defined by &nbsp;f(x) = 2ˣ − 4. &nbsp;Its asymptote is the dashed line y = −4, it cuts the y-axis at (0 ; −3) and the x-axis at (2 ; 0).<br><br>The graph of g is defined by &nbsp;g(x) = f(x) + 3. &nbsp;Write down the equation of g and the equation of its asymptote.",
      },
      hint: {
        en: "The + 3 is outside f, so the whole picture lifts. The asymptote is part of the picture, so it lifts by the same amount.",
      },
      memo: [
        { type: "step", text: { en: "f(x) + 3 means: run f, then add 3 to the answer — the whole graph lifts 3 units." } },
        { type: "answer", text: { en: "g(x) = 2ˣ − 4 + 3 = 2ˣ − 1" }, ticks: ["a"] },
        { type: "answer", text: { en: "the asymptote lifts with it: &nbsp;y = −4 + 3 &nbsp;⟹&nbsp; y = −1" }, ticks: ["a"] },
      ],
      esplain: {
        en: "An exponential graph flattens out towards one horizontal line and never quite reaches it, and that line is the number sitting on the end of the equation. So the fastest way to answer a vertical-shift question is to stop thinking about the curve at all and think only about that number. Lift everything 3 units and −4 becomes −1 — that is both the new equation and the new asymptote in one move. The base 2 is untouched, so the graph is still taking off rather than landing, and the 1 in front is untouched, so it still sits above its asymptote. A shift never changes the shape of a graph; it only carries it.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "The graph of h is defined by &nbsp;h(x) = f(−x). &nbsp;Determine the equation of h in the form &nbsp;y = a·bˣ + q, &nbsp;write down the equation of its asymptote, and write down the coordinates of the point where h cuts the x-axis.",
      },
      hint: {
        en: "The minus is inside f, and only the x feels it. Write −x into the exponent, then use the fact that a negative exponent turns a base upside down. Ask yourself whether this graph is still taking off, or now landing.",
      },
      memo: [
        { type: "step", text: { en: "f(−x) means: wherever f has an x, write −x instead." } },
        { type: "step", text: { en: "h(x) = 2<sup>−x</sup> − 4, &nbsp;and a negative exponent flips the base: &nbsp;2<sup>−x</sup> = (1/2)ˣ" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "h(x) = (1/2)ˣ − 4 &nbsp;&nbsp;— the base is now between 0 and 1, so h is <b>landing</b> where f was <b>taking off</b>" }, ticks: ["a"] },
        { type: "answer", text: { en: "the asymptote does NOT move: &nbsp;y = −4. &nbsp;And h cuts the x-axis at (−2 ; 0), the mirror image of f's (2 ; 0)." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: f(−x) is a mirror in the y-AXIS, so only the x-coordinates change sign. The − 4 on the end never moves, which is why the asymptote stays exactly where it was.",
        } },
      ],
      esplain: {
        en: "Two different reflections are easy to mix up, so pin them apart by asking where the minus is sitting. In part (b) of the parabola card the minus was outside — −f(x) — and it flipped the answers, mirroring the graph in the x-axis. Here the minus is inside — f(−x) — and it flips the inputs, mirroring the graph in the y-axis: whatever f did on the right of the y-axis, h now does on the left. That is why the x-intercept swings from 2 across to −2 while its y stays 0, and why the asymptote, which is a statement about heights and not about x at all, does not budge. The last piece is the exponent law. Writing 2 to the power −x looks unfamiliar, but a negative exponent means one over the thing, and one over 2 is a half — so the equation lands in the standard form with a base of a half, which is her signal that the graph is landing rather than taking off.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — THE SHIFT READ BACKWARDS (her p9 and pp19–24).
   f(x) = (x + 2)² − 1, TP(−2 ; −1); g(x) = (x − 3)² + 4, TP(3 ; 4).
   Both graphs are GIVEN, so both are drawn from the start. What is
   found is the MOVE: 5 units right and 5 units up, and in function
   notation g(x) = f(x − 5) + 5.
   (a)'s reveal marks the two turning points; (b)'s adds the two axes
   of symmetry, dashed and captioned, so the 5-unit sideways move is
   something the learner can see rather than only read.
   LEVEL 3: this file's one harder part, (b).
   --------------------------------------------------------------- */
const Q4_F = { kind: "parabola", a: 1, p: -2, q: -1 };
const Q4_G = { kind: "parabola", a: 1, p: 3, q: 4 };
const Q4_F_TP = { x: -2, y: -1, on: 0, label: "TP(−2 ; −1)", place: "below" };
const Q4_G_TP = { x: 3, y: 4, on: 1, label: "TP(3 ; 4)", place: "above" };
const Q4_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -6, xmax: 8, ymin: -3, ymax: 12 },
    curves: [
      { ...Q4_F, tone: "a", label: "f", labelAt: -4 },
      { ...Q4_G, tone: "b", label: "g", labelAt: 5.3 },
    ],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q4_F_TP, Q4_G_TP] } },
    b: {
      question: { points: [Q4_F_TP, Q4_G_TP] },
      reveal: { points: [Q4_F_TP, Q4_G_TP], vlines: [{ x: -2, label: "x = −2" }, { x: 3, label: "x = 3" }] },
    },
  },
};

const q4 = {
  id: "func.sib.sh.q4",
  chapter: CH,
  topic: "shift",
  archetype: "describe-the-shift-that-maps-f-onto-g-then-write-it-in-function-notation",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn6" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows two parabolas: &nbsp;f(x) = (x + 2)² − 1&nbsp; and&nbsp; g(x) = (x − 3)² + 4.<br><br>Write down the coordinates of the turning point of f and of the turning point of g.",
      },
      hint: {
        en: "Both equations are already in turning-point form, so no working is needed — but read the sign inside each bracket carefully, because it is not the sign of the answer.",
      },
      memo: [
        { type: "step", text: { en: "In &nbsp;y = a(x − p)² + q&nbsp; the turning point is (p ; q), and p is the OPPOSITE sign of the number inside the bracket." } },
        { type: "answer", text: { en: "f: &nbsp;(x + 2)² gives p = −2, and q = −1 &nbsp;&nbsp;∴&nbsp; TP(−2 ; −1)" }, ticks: ["a"] },
        { type: "answer", text: { en: "g: &nbsp;(x − 3)² gives p = 3, and q = 4 &nbsp;&nbsp;∴&nbsp; TP(3 ; 4)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Turning-point form is doing you a favour, so take it. The two letters p and q are not abstract constants — they ARE the turning point's own coordinates, which means the answer is sitting in the equation and the only work is reading it correctly. The one place to slow down is the bracket. The form says x − p, so a bracket that reads x + 2 must have p = −2, because −2 is the number you would have to subtract to get a + 2. If that ever feels slippery, use the zero test: whatever value of x makes the bracket equal zero is the turning point's x. Put x = −2 into x + 2 and you get 0, so −2 it is.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Describe fully the transformation that moves f onto g, and write down g in the form &nbsp;g(x) = f(x ± k) ± m.",
      },
      hint: {
        en: "Compare the two turning points from (a) — how far across, and how far up or down? Then remember that the sideways part goes inside the bracket with the sign that feels backwards, and the up-or-down part goes outside with the sign that feels right.",
      },
      memo: [
        { type: "step", text: { en: "Compare the two turning points: &nbsp;(−2 ; −1) &nbsp;→&nbsp; (3 ; 4)." } },
        { type: "step", text: { en: "across: &nbsp;−2 → 3&nbsp; is 5 units RIGHT. &nbsp;&nbsp;up: &nbsp;−1 → 4&nbsp; is 5 units UP." }, ticks: ["a"] },
        { type: "answer", text: { en: "f is shifted 5 units to the right and 5 units up." }, ticks: ["a"] },
        { type: "answer", text: { en: "5 right goes INSIDE the bracket as x − 5, and 5 up goes OUTSIDE as + 5: &nbsp;g(x) = f(x − 5) + 5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: 5 units to the RIGHT is f(x − 5), with a minus. The sideways sign is always the opposite of the direction you moved; the up-or-down sign is not. Check by putting x = 3 into f(x − 5) — you get f(−2), which is exactly where f was turning.",
        } },
      ],
      esplain: {
        en: "This is the shift question asked backwards, and the trick is to stop looking at the whole curve and look at one landmark instead. Both parabolas have the same a, so they are the same shape and the same way up — nothing has been stretched or flipped, only carried. That means the entire transformation is described by where one point went, and the turning point is the easiest point to follow. From −2 to 3 is five steps right; from −1 to 4 is five steps up. Writing it in function notation is then a translation job, and the two halves behave differently on purpose. The vertical part is honest: five up really is + 5, tacked on the outside where it changes the answer. The horizontal part is the sneaky one: to make the machine give at x = 3 what it used to give at x = −2, you have to hand it a number five smaller first, so it is f(x − 5) even though the graph went right. Check it on the landmark and you will never get the sign wrong.",
      },
    },
  ],
};

export const funcShiftSiblingQuestions = [q1, q2, q3, q4];
