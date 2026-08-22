/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill "inequalities"
   (SESSION 2b of the four-session function-diagram build, 2026-08-22.)
   ------------------------------------------------------------
   Four new cards, taking this tile from two to six.

   WHY THIS FILE EXISTS. "Inequalities" held two cards, both about a
   single hyperbola — func.hyp.t1q4(e) asking where h ≤ 0, and
   func.hyp.t2q3(c,d) asking where h < −2. A learner who tapped
   "Another one!" twice ran out, and never met the product, the
   quotient, the x·f(x) variant, or f against g at all.

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   Her pp46–51: the meaning table for f > 0, f < 0, f·g ≷ 0, f/g ≷ 0
   with g ≠ 0, and x·f(x) ≷ 0 by quadrant signs; her p8's "ALWAYS write
   x first"; and the METHOD that governs everything in this file —

     CUT A LINE THROUGH EVERY x-INTERCEPT, EVERY ASYMPTOTE AND (for
     f against g) EVERY INTERSECTION, THEN PAINT + OR − ON EACH PIECE
     AND READ THE ANSWER OFF.

   That is her current board method. THE SIGN TABLE — the tekentabel —
   appears nowhere in this file and must never be added to it: she moved
   off it after watching learners struggle, and the digest records that
   where her notes and older app code disagree, the notes win.
   Question TYPES and METHODS hers; every number here is fresh, and none
   of the digest's four flagged slips is mined.

   WHAT THE FOUR COVER:
     q1  the plain pair off one sad parabola — f(x) > 0 and f(x) ≤ 0,
         and the difference the equals sign makes at the ends
     q2  f·g ≥ 0 and f/g < 0 on the same parabola-and-line picture, so
         the learner sees that the SIGNS are identical and only the
         END POINTS differ
     q3  a hyperbola: h(x) ≥ 0 — the ≥ at an asymptote, one end closed
         and one end that can never close — then x·h(x) ≤ 0, her
         quadrant-sign variant, whose extra cut line IS the y-axis
     q4  f against g — find the intersections first, then cut a line
         through each of them

   THE PAINT SHOWS UP ON THE REVEAL. The question side carries only the
   cut points the learner is GIVEN — the intercepts and, once found, the
   intersections — and the REVEAL paints the answer as a shaded strip
   bounded by the cut lines it used (js/exam/_schema.js's "the reveal
   draws what it found"). An asymptote is already a dashed line on the
   question side, so it is never re-drawn as a cut line; and in q3(b)
   the cut at x = 0 is the y-axis itself, which is exactly the point
   the memo makes.

   LEVELS: mostly 1–2, exactly one level 3 — q3(b), the only part that
   has to combine a quadrant-sign cut with an asymptote. Nothing here
   is level 4.
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — THE PLAIN PAIR OFF ONE SKETCH (her pp46–51, p8).
   f(x) = −x² + 2x + 8, a sad parabola cutting the x-axis at −2 and 4.
     (a) f(x) > 0   ⟹  −2 < x < 4
     (b) f(x) ≤ 0   ⟹  x ≤ −2 or x ≥ 4
   Both x-intercepts are GIVEN in the stem, so both sit on the figure
   from the start; only the painted strips belong to the reveals.
   --------------------------------------------------------------- */
const Q1_F = { kind: "parabola", a: -1, b: 2, c: 8 };
const Q1_XA = { x: -2, y: 0, on: 0, label: "(−2 ; 0)" };
const Q1_XB = { x: 4, y: 0, on: 0, label: "(4 ; 0)" };
const Q1_CUTS = [{ x: -2 }, { x: 4 }];
const Q1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -5, xmax: 7, ymin: -8, ymax: 11 },
    curves: [{ ...Q1_F, tone: "a", label: "f", labelAt: 3.5 }],
    points: [Q1_XA, Q1_XB],
  },
  parts: {
    a: { question: {}, reveal: { vlines: Q1_CUTS, shades: [{ x0: -2, x1: 4 }] } },
    b: { question: {}, reveal: { vlines: Q1_CUTS, shades: [{ x0: -5, x1: -2 }, { x0: 4, x1: 7 }] } },
  },
};

const q1 = {
  id: "func.sib.ineq.q1",
  chapter: CH,
  topic: "inequalities",
  archetype: "f-positive-and-f-negative-off-a-parabola-sketch",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn5" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = −x² + 2x + 8. &nbsp;It cuts the x-axis at (−2 ; 0) and (4 ; 0).<br><br>For which values of x is &nbsp;f(x) &gt; 0?",
      },
      hint: {
        en: "f(x) is the HEIGHT of the graph, so f(x) &gt; 0 is asking where the curve is above the x-axis. Cut a line through each x-intercept and look at the piece in the middle.",
      },
      memo: [
        { type: "step", text: { en: "Cut a line through <b>every x-intercept</b> — here x = −2 and x = 4 — then <b>paint</b> the sign of f on each piece:" } },
        { type: "step", text: { en: "left of −2: &nbsp;<b>−</b> &nbsp;&nbsp;·&nbsp;&nbsp; between −2 and 4: &nbsp;<b>+</b> &nbsp;&nbsp;·&nbsp;&nbsp; right of 4: &nbsp;<b>−</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "f(x) &gt; 0 is the painted + piece &nbsp;&nbsp;∴&nbsp; −2 &lt; x &lt; 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the answer is about x, so write x. Answering “y &gt; 0” or just “above the axis” earns nothing — and because the sign is a strict &gt;, both ends stay open.",
        } },
      ],
      esplain: {
        en: "f(x) is not a mysterious symbol here — it is the height of the curve above or below the x-axis at that x. So asking where f(x) is positive is asking where the curve is drawn above the axis, which you can see. The reason the cut lines work is that a graph can only change from + to − by passing through the axis, so once you know where the crossings are, the sign cannot change anywhere in between. That is why one glance settles a whole piece. This parabola is sad, so it climbs above the axis between its two crossings and drops below on both sides — the + piece is the middle one. Two habits she marks: write the answer in x, and read the inequality sign before you close any bracket. Strictly greater than zero means the crossings themselves are out, because at −2 and at 4 the height is exactly zero, not more than zero.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "For which values of x is &nbsp;f(x) ≤ 0?",
      },
      hint: {
        en: "Same cut lines, same painted signs — you want the other pieces this time. Then look hard at the equals half of the ≤ and decide whether the two crossings are in or out.",
      },
      memo: [
        { type: "step", text: { en: "The painted − pieces are the two outside ones. And because the sign is ≤, the values where f is exactly 0 are included as well — that is both crossings." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x ≤ −2 &nbsp;&nbsp;or&nbsp;&nbsp; x ≥ 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this answer is two separate pieces, joined by the word <b>or</b>. Writing −2 ≥ x ≥ 4 says nothing at all — no number is both smaller than −2 and bigger than 4 at the same time.",
        } },
      ],
      esplain: {
        en: "Nothing new has to be worked out here: the cut lines and the painted signs from (a) do the whole job, and all that changes is which pieces you hand in and whether the ends are closed. The ≤ is doing two things at once — less than zero, which is the two outside pieces, and equal to zero, which happens at exactly the two crossings. So both crossings come inside the answer and the brackets close. The other half of the marks is in how you write it. An answer made of two separate pieces cannot be squeezed into one chain of inequalities; it needs the word or, because a number qualifies by being in one piece or the other, never both. Say it out loud as “x is at most −2, or x is at least 4” and the shape of the written answer follows.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — f·g AND f/g ON ONE PICTURE (her pp46–51 meaning table).
   f(x) = x² − 9, cutting at −3 and 3; g(x) = x + 1, cutting at −1.
   Cut lines at −3, −1 and 3 for BOTH parts.
     (a) f(x)·g(x) ≥ 0  ⟹  −3 ≤ x ≤ −1  or  x ≥ 3
     (b) f(x)/g(x) < 0  ⟹  x < −3  or  −1 < x < 3
   The pair is deliberate: the painted signs are IDENTICAL, and only
   the end points differ — g = 0 can be included in a product but never
   in a quotient.
   --------------------------------------------------------------- */
const Q2_F = { kind: "parabola", a: 1, b: 0, c: -9 };
const Q2_G = { kind: "line", a: 1, q: 1 };
/* NO `place` on these three, deliberately — checked at 375 px both ways
   on 2026-08-22. Three cut points sit on one x-axis here, and the
   placer's own most-constrained-first pass staggers them nicely, each
   label just left of its own dot and alternating above/below the axis.
   Forcing "above"/"below" makes it WORSE: two of them end up side by
   side under the axis with one drawn through g. */
const Q2_FA = { x: -3, y: 0, on: 0, label: "(−3 ; 0)" };
const Q2_FB = { x: 3, y: 0, on: 0, label: "(3 ; 0)" };
const Q2_GA = { x: -1, y: 0, on: 1, label: "(−1 ; 0)" };
const Q2_CUTS = [{ x: -3 }, { x: -1 }, { x: 3 }];
const Q2_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -6, xmax: 6, ymin: -11, ymax: 8 },
    curves: [
      { ...Q2_F, tone: "a", label: "f", labelAt: -3.6 },
      { ...Q2_G, tone: "b", label: "g", labelAt: 4.5 },
    ],
    points: [Q2_FA, Q2_FB, Q2_GA],
  },
  parts: {
    a: { question: {}, reveal: { vlines: Q2_CUTS, shades: [{ x0: -3, x1: -1 }, { x0: 3, x1: 6 }] } },
    b: { question: {}, reveal: { vlines: Q2_CUTS, shades: [{ x0: -6, x1: -3 }, { x0: -1, x1: 3 }] } },
  },
};

const q2 = {
  id: "func.sib.ineq.q2",
  chapter: CH,
  topic: "inequalities",
  archetype: "product-and-quotient-sign-inequalities-off-one-sketch",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn5" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The sketch shows &nbsp;f(x) = x² − 9&nbsp; and&nbsp; g(x) = x + 1. &nbsp;f cuts the x-axis at (−3 ; 0) and (3 ; 0), and g cuts it at (−1 ; 0).<br><br>For which values of x is &nbsp;f(x)·g(x) ≥ 0?",
      },
      hint: {
        en: "A product is positive when the two graphs have the SAME sign and negative when they have opposite signs. So cut a line through every x-intercept of both graphs — that is three cut lines — and paint f and g separately on each piece.",
      },
      memo: [
        { type: "step", text: { en: "Cut a line through <b>every x-intercept of both graphs</b>: &nbsp;x = −3, &nbsp;x = −1&nbsp; and&nbsp; x = 3." }, ticks: ["s/f"] },
        { type: "step", text: { en: "Paint f and g on each piece, then multiply the two signs:" } },
        { type: "step", text: { en: "x &lt; −3: &nbsp;f <b>+</b>, g <b>−</b> → <b>−</b> &nbsp;·&nbsp; −3 to −1: &nbsp;f <b>−</b>, g <b>−</b> → <b>+</b> &nbsp;·&nbsp; −1 to 3: &nbsp;f <b>−</b>, g <b>+</b> → <b>−</b> &nbsp;·&nbsp; x &gt; 3: &nbsp;f <b>+</b>, g <b>+</b> → <b>+</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "≥ 0 takes the painted + pieces AND the places where the product is exactly 0, which is all three cut points &nbsp;&nbsp;∴&nbsp; −3 ≤ x ≤ −1 &nbsp;or&nbsp; x ≥ 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: g's x-intercept is a cut line too, even though the question never mentions g on its own. Miss the cut at −1 and the middle piece comes out as one long stretch with the wrong sign in half of it.",
        } },
      ],
      esplain: {
        en: "The only new idea in a product question is that you are painting two graphs instead of one, and then multiplying the two colours. Everything else is the method you already have. The cut lines go wherever EITHER graph crosses the x-axis, because those are the only places where either sign can flip — so three crossings means three cuts and four pieces. On each piece, ask twice: is f above or below the axis here, and is g above or below? Two minuses make a plus, which is why the piece between −3 and −1 comes out positive even though both graphs are underneath the axis there. The ends are the last decision. The question says greater than OR EQUAL TO zero, and a product is zero the moment either factor is zero — so all three cut points get closed brackets, including the one that came from g.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "For which values of x is &nbsp;f(x)/g(x) &lt; 0?",
      },
      hint: {
        en: "Dividing two numbers and multiplying them give exactly the same sign, so you do not have to paint anything again — the pieces you found in (a) still hold. What DOES change is the ends: think about what g is allowed to be.",
      },
      memo: [
        { type: "step", text: { en: "A quotient has the same sign as the product, so the painted pieces are the ones from (a):" } },
        { type: "step", text: { en: "x &lt; −3: <b>−</b> &nbsp;·&nbsp; −3 to −1: <b>+</b> &nbsp;·&nbsp; −1 to 3: <b>−</b> &nbsp;·&nbsp; x &gt; 3: <b>+</b>" }, ticks: ["ca"] },
        { type: "step", text: { en: "&lt; 0 takes the painted − pieces. Now the ends: &nbsp;x = −3 and x = 3 make the top zero, and 0 is not less than 0, so they are out. &nbsp;x = −1 makes the BOTTOM zero, so it can never be in." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x &lt; −3 &nbsp;&nbsp;or&nbsp;&nbsp; −1 &lt; x &lt; 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: never multiply both sides by g(x) to “get rid of” the fraction. You do not know whether g is positive or negative, so you do not know whether to turn the inequality sign around. Paint the pieces instead.",
        } },
      ],
      esplain: {
        en: "Put the two parts side by side and the lesson lands: a product and a quotient of the same two graphs have exactly the same sign everywhere, because dividing by a negative and multiplying by a negative both flip you to the other side of zero. So the painting work in (a) is not repeated — it is reused. What genuinely differs is the ends, and for one reason only: a fraction is allowed to have a zero on top but never on the bottom. So the crossing that belongs to g, at x = −1, is excluded no matter what inequality sign the question uses — even a ≤ or a ≥ would leave it out. Here the sign is a strict less-than anyway, so all three ends are open, but it is worth knowing WHY each one is open, because the version of this question with a ≥ is the one that catches people. And the warning in the trap card is the biggest one in the whole topic: clearing a fraction in an inequality is only safe when you know the sign of what you multiplied by, and here you do not.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — A HYPERBOLA, THE ≥ AT AN ASYMPTOTE, THEN x·h(x)
   (her pp46–51, including the quadrant-sign variant).
   h(x) = 4/(x − 1) − 2, asymptotes x = 1 and y = −2, cutting the axes
   at (3 ; 0) and (0 ; −6).
     (a) h(x) ≥ 0    ⟹  1 < x ≤ 3      one end closed, one that never can be
     (b) x·h(x) ≤ 0  ⟹  0 ≤ x < 1  or  x ≥ 3
   (b) is the level-3 part: it needs a THIRD cut line, at x = 0, and
   that line is the y-axis itself.
   --------------------------------------------------------------- */
const Q3_H = { kind: "hyperbola", a: 4, p: 1, q: -2 };
const Q3_XI = { x: 3, y: 0, on: 0, label: "(3 ; 0)" };
const Q3_YI = { x: 0, y: -6, on: 0, label: "(0 ; −6)" };
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 8, ymin: -9, ymax: 5 },
    // the name goes on the LEFT branch: the right one carries the
    // x-intercept dot and every painted strip, and at 375 px "h" landed
    // on top of "(3 ; 0)" there
    curves: [{ ...Q3_H, tone: "a", label: "h", labelAt: -2 }],
    asymptotes: [{ x: 1, of: 0, label: "x = 1" }, { y: -2, of: 0, label: "y = −2" }],
    points: [Q3_XI, Q3_YI],
  },
  parts: {
    a: { question: {}, reveal: { vlines: [{ x: 3 }], shades: [{ x0: 1, x1: 3 }] } },
    b: { question: {}, reveal: { vlines: [{ x: 3 }], shades: [{ x0: 0, x1: 1 }, { x0: 3, x1: 8 }] } },
  },
};

const q3 = {
  id: "func.sib.ineq.q3",
  chapter: CH,
  topic: "inequalities",
  archetype: "hyperbola-sign-inequality-then-x-times-f-quadrant-signs",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn5" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "The sketch shows the hyperbola h, defined by &nbsp;h(x) = 4/(x − 1) − 2. &nbsp;Its asymptotes x = 1 and y = −2 are the dashed lines, and h cuts the axes at (3 ; 0) and (0 ; −6).<br><br>For which values of x is &nbsp;h(x) ≥ 0?",
      },
      hint: {
        en: "Cut a line through the x-intercept AND through the asymptote — those are the only two places the sign can change. Then decide separately about each end, because the two cut points are not the same kind of thing at all.",
      },
      memo: [
        { type: "step", text: { en: "Cut a line through <b>every x-intercept and every asymptote</b> — here x = 1 and x = 3 — then <b>paint</b> the sign of h on each piece:" } },
        { type: "step", text: { en: "left of 1: &nbsp;<b>−</b> &nbsp;&nbsp;·&nbsp;&nbsp; between 1 and 3: &nbsp;<b>+</b> &nbsp;&nbsp;·&nbsp;&nbsp; right of 3: &nbsp;<b>−</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "h(x) ≥ 0 is the painted + piece. &nbsp;x = 3 <i>is</i> included, because h(3) = 0. &nbsp;x = 1 is <b>never</b> included — h does not exist there. &nbsp;&nbsp;∴&nbsp; 1 &lt; x ≤ 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: never close the bracket on an asymptote. Writing 1 ≤ x ≤ 3 loses the mark, because h(1) does not exist — no inequality sign can change that.",
        } },
      ],
      esplain: {
        en: "A graph can only swap from positive to negative in two ways: by crossing the x-axis, or by jumping across a vertical asymptote. Both happen here, so both get a cut line, and between two cuts nothing can change — one glance per piece is enough. The interesting part is the ends, because the two cut points behave completely differently. At x = 3 the graph genuinely touches down on the axis, so its height really is 0 there; the question said greater than OR EQUAL TO zero, so 3 comes inside and the bracket closes. At x = 1 there is no graph at all — the fraction would be dividing by zero — so nothing can be true about h there, and that end stays open however the inequality is written. One end closed and one end open in the same answer is exactly what this question is built to test.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "For which values of x is &nbsp;x·h(x) ≤ 0?",
      },
      hint: {
        en: "This is a product, so the same rule applies: same signs give +, opposite signs give −. But one of the two things being multiplied is just x, and x changes sign at the y-axis — so you have a third cut line to add.",
      },
      memo: [
        { type: "step", text: { en: "x·h(x) is a product, so paint the sign of <b>x</b> and the sign of <b>h</b> separately. x changes sign at x = 0, so the cut lines are now x = 0, x = 1 and x = 3." }, ticks: ["s/f"] },
        { type: "step", text: { en: "x &lt; 0: &nbsp;x <b>−</b>, h <b>−</b> → <b>+</b> &nbsp;·&nbsp; 0 to 1: &nbsp;x <b>+</b>, h <b>−</b> → <b>−</b> &nbsp;·&nbsp; 1 to 3: &nbsp;x <b>+</b>, h <b>+</b> → <b>+</b> &nbsp;·&nbsp; x &gt; 3: &nbsp;x <b>+</b>, h <b>−</b> → <b>−</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "≤ 0 takes the painted − pieces plus wherever the product is exactly 0 — that is x = 0 and x = 3, but never x = 1 &nbsp;&nbsp;∴&nbsp; 0 ≤ x &lt; 1 &nbsp;or&nbsp; x ≥ 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the extra cut line at x = 0 is the y-axis itself. Forgetting it is the standard slip on this question — the pieces on either side of the y-axis get painted the same colour and half the answer disappears.",
        } },
      ],
      esplain: {
        en: "The extra factor here is the plainest graph there is: the line y = x, negative on the left of the y-axis and positive on the right. So x·h(x) is a product like any other, and her quadrant idea says it neatly — the product is positive where x and h agree in sign, in the first and third quadrants' sense, and negative where they disagree. What makes this the harder version is that one of the cut lines does not come from the picture of h at all; it comes from the other factor, and it sits on the y-axis. Add it and you have four pieces instead of three. The ends then need three separate decisions, one per cut point. At x = 0 the product is 0 times something, which is 0, and ≤ 0 accepts 0, so it closes. At x = 3 the product is something times 0, also 0, so that closes too. At x = 1 there is no h to multiply by, so it can never be included — the same rule as in part (a), and the same one that catches people every year.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — f AGAINST g: A CUT LINE THROUGH EVERY INTERSECTION
   (her pp46–51, the second half of the method).
   f(x) = x² − 2x − 3 and g(x) = x + 1 meet at (−1 ; 0) and (4 ; 5).
     (a) the two intersections
     (b) f(x) ≥ g(x)  ⟹  x ≤ −1 or x ≥ 4
   The intersections are (a)'s ANSWER, so the base figure carries no
   marked points at all; (a)'s reveal marks them, (b)'s question side
   carries them forward, and (b)'s reveal paints the two strips.
   --------------------------------------------------------------- */
const Q4_F = { kind: "parabola", a: 1, b: -2, c: -3 };
const Q4_G = { kind: "line", a: 1, q: 1 };
const Q4_PA = { x: -1, y: 0, on: [0, 1], label: "(−1 ; 0)" };
const Q4_PB = { x: 4, y: 5, on: [0, 1], label: "(4 ; 5)" };
const Q4_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 7, ymin: -6, ymax: 9 },
    curves: [
      { ...Q4_F, tone: "a", label: "f", labelAt: -2.2 },
      { ...Q4_G, tone: "b", label: "g", labelAt: 6 },
    ],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q4_PA, Q4_PB] } },
    b: {
      question: { points: [Q4_PA, Q4_PB] },
      reveal: { points: [Q4_PA, Q4_PB], vlines: [{ x: -1 }, { x: 4 }], shades: [{ x0: -4, x1: -1 }, { x0: 4, x1: 7 }] },
    },
  },
};

const q4 = {
  id: "func.sib.ineq.q4",
  chapter: CH,
  topic: "inequalities",
  archetype: "f-against-g-intersections-then-the-cut-lines-through-them",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn5" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The sketch shows &nbsp;f(x) = x² − 2x − 3&nbsp; and&nbsp; g(x) = x + 1.<br><br>Determine the coordinates of the two points where f and g cut each other.",
      },
      hint: {
        en: "Where the graphs cut, both equations are true at the same x — so set the two expressions equal to each other. Bring everything to one side and factorise what is left.",
      },
      memo: [
        { type: "step", text: { en: "At a point of intersection both graphs have the same y, so set them equal:" } },
        { type: "step", text: { en: "x² − 2x − 3 = x + 1 &nbsp;⟹&nbsp; x² − 3x − 4 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(x − 4)(x + 1) = 0 &nbsp;⟹&nbsp; x = 4 &nbsp;or&nbsp; x = −1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "put each x back into the easier equation, g: &nbsp;g(4) = 5 &nbsp;and&nbsp; g(−1) = 0 &nbsp;&nbsp;∴&nbsp; (4 ; 5) &nbsp;and&nbsp; (−1 ; 0)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: solving gives you the x-values only. The question asked for COORDINATES, so each x still has to be substituted back to find its y — and the line is the cheaper of the two to substitute into.",
        } },
      ],
      esplain: {
        en: "An intersection is the one place where the two graphs agree about the height, so writing f(x) = g(x) is not a trick, it is the definition. Once everything is on one side you are holding an ordinary quadratic, and its solutions are the x-coordinates of the crossings — nothing more. That is why the last step is not optional: a crossing is a place on the page, and a place needs both numbers. Substitute back into whichever equation is less work, which is almost always the line, and check the pair looks right against the picture. Here −1 lands on the x-axis and 4 lands high up on the right, which is exactly what the sketch shows.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "For which values of x is &nbsp;f(x) ≥ g(x)?",
      },
      hint: {
        en: "f(x) ≥ g(x) asks where the parabola is ON TOP of the line, so cut a line through each intersection and look at which graph is higher on each piece.",
      },
      memo: [
        { type: "step", text: { en: "For f against g, cut a line through <b>every intersection</b> — here x = −1 and x = 4 — then read off which graph is on top on each piece:" } },
        { type: "step", text: { en: "left of −1: &nbsp;f on top &nbsp;&nbsp;·&nbsp;&nbsp; between −1 and 4: &nbsp;g on top &nbsp;&nbsp;·&nbsp;&nbsp; right of 4: &nbsp;f on top" }, ticks: ["ca"] },
        { type: "answer", text: { en: "f is on top on the two outside pieces, and ≥ lets the two crossings in, where the graphs are level &nbsp;&nbsp;∴&nbsp; x ≤ −1 &nbsp;or&nbsp; x ≥ 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: for f against g the cut lines go through the INTERSECTIONS, not through the x-intercepts. The x-axis has nothing to do with this question — the line g is the new baseline.",
        } },
      ],
      esplain: {
        en: "The method has not changed at all, only what counts as “zero”. In part (a) of the earlier cards the baseline was the x-axis, and the cut lines went through the crossings with it. Here the baseline is the graph g, so the cut lines go through the crossings with g instead — and between two crossings the graphs cannot swap over, so one look per piece settles it. If you would rather do it with algebra, subtract: f(x) − g(x) = x² − 3x − 4, and asking where f is on top is asking where that difference is positive, which brings you straight back to the cut lines at −1 and 4. Same answer, same picture, and it is a good check when the sketch is hard to read. The ends are closed because ≥ allows the graphs to be exactly level, which is precisely what happens at an intersection.",
      },
    },
  ],
};

export const funcInequalitiesSiblingQuestions = [q1, q2, q3, q4];
