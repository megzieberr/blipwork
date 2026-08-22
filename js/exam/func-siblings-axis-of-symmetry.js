/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill
   "axis-of-symmetry"
   (SESSION 2a of the four-session function-diagram build, 2026-08-22.)
   ------------------------------------------------------------
   Four new cards, taking this tile from two to six.

   SOURCE OF THE MATHS: GR11-FUNCTIONS-NOTES-DIGEST.md — her own Gr11
   notes. Her p4 and p8 ("axis of symmetry = x of TP", and it is always
   written x = …), p9 (what a shift does to the axis of symmetry), p10
   (hyperbola: the two symmetry lines y = ±x + c through (p ; q), both
   gradients) and pp19–24 (transformations in function notation, inside
   versus outside the bracket). Types and methods hers; numbers fresh.

   WHAT THE FOUR COVER, in the order the brief asks for:
     q1  parabola in TURNING-POINT form — the axis straight off p, the
         opposite-sign trap, then a shift written in words
     q2  parabola in STANDARD form — the axis from x = −b/(2a), then
         the pair of shifts that matter: a vertical one (which does
         NOTHING to the axis) and a horizontal one (which moves it)
     q3  hyperbola — BOTH symmetry lines, both gradients, through the
         point where the asymptotes cross
     q4  hyperbola — what a shift does to both symmetry lines at once

   NO-LEAK RULE. An axis of symmetry is a LINE, and the function engine
   can draw one as a `vlines` entry, so every parabola card here keeps
   its answer line off the question side and adds it on the reveal —
   which is also what makes the reveal worth looking at. SESSION 2a-FIX
   (2026-08-22) finished the job: every one of those lines now carries
   its own equation as a caption, and the hyperbola cards' DIAGONAL
   mirror lines — which used to stay in the memo because a highlight
   could not add a curve — are drawn too, as dashed named lines, now
   that a highlight set takes `curves`. Where the answer is a shifted
   graph (q1(c), q2(b), q2(c)) the reveal draws that graph as well.

   Q3 AND Q4(b) DO draw the asymptotes, deliberately: on those two cards
   the asymptotes are given by the equation in the stem and are not the
   answer to anything — they are the crosshairs the symmetry lines are
   built on, exactly as the "axis of symmetry" card cut from Sept T1 Q4
   hands them over in its own intro. Q4(a)'s figure draws none, because
   f(x) = 6/x has the axes themselves as asymptotes.

   LEVELS: mostly 1–2, exactly one level 3 (q4(b) — a shift described
   and both lines rebuilt from it, in one part).
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — PARABOLA IN TURNING-POINT FORM.
     g(x) = 2(x − 3)² − 5   axis x = 3
     h(x) = −(x + 4)² + 1   axis x = −4   (the opposite-sign trap)
     k = g shifted 2 left and 6 up ⟹ k(x) = 2(x − 1)² + 1, axis x = 1
   (b) is a different parabola, so it carries its own per-part spec.
   --------------------------------------------------------------- */
/* win widened (NIT FIX, 2026-08-23): g(0) = 13 was rising into the y-axis
   arrow tip at the old ymax = 14, and k = 2(x − 1)² + 1 (drawn on (c)'s
   reveal) was clipped top-left at the old xmin = -3 — ymax raised to 18 and
   xmin pulled out to -4 give both arms room above and to the left. */
const Q1_G_SPEC = {
  type: "function",
  win: { xmin: -4, xmax: 9, ymin: -7, ymax: 18 },
  curves: [{ kind: "parabola", a: 2, p: 3, q: -5, tone: "a", label: "g", labelAt: 5.2 }],
};
const Q1_H_SPEC = {
  type: "function",
  win: { xmin: -10, xmax: 2, ymin: -12, ymax: 4 },
  curves: [{ kind: "parabola", a: -1, p: -4, q: 1, tone: "b", label: "h", labelAt: -6.5 }],
};
/* k = g shifted 2 left and 6 up = 2(x − 1)² + 1 — (c)'s own answer, so it is
   DRAWN on (c)'s reveal (tone b, named) beside its new mirror line
   (session 2a-FIX). Every mirror line on this card, given or found, carries
   its equation as a caption. */
const Q1_K = { kind: "parabola", a: 2, p: 1, q: 1, tone: "b", label: "k", labelAt: 3.3 };
const Q1_DIAGRAM = {
  spec: Q1_G_SPEC,
  parts: {
    a: { question: {}, reveal: { vlines: [{ x: 3, label: "x = 3" }] } },
    b: { spec: Q1_H_SPEC, question: {}, reveal: { vlines: [{ x: -4, label: "x = −4" }] } },
    c: {
      question: { vlines: [{ x: 3, label: "x = 3" }] },
      reveal: { vlines: [{ x: 3, label: "x = 3" }, { x: 1, label: "x = 1" }], curves: [Q1_K] },
    },
  },
};

const q1 = {
  id: "func.sib.aos.q1",
  chapter: CH,
  topic: "axis-of-symmetry",
  archetype: "axis-of-symmetry-off-turning-point-form-then-a-shift",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: "The sketch shows the parabola g, defined by &nbsp;g(x) = 2(x − 3)² − 5.<br><br>Write down the equation of the axis of symmetry of g.",
      },
      hint: {
        en: "In turning-point form the turning point is sitting right there in the equation. The axis of symmetry is the vertical line straight through it — so you only need its x.",
      },
      memo: [
        { type: "step", text: { en: "In &nbsp;y = a(x − p)² + q&nbsp; the turning point is (p ; q), and the axis of symmetry is the vertical line through it, &nbsp;x = p. Here (x − 3)² gives p = 3:" } },
        { type: "answer", text: { en: "x = 3" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A parabola is a perfect mirror image of itself about one vertical line, and that line passes through the turning point — so “axis of symmetry” and “the x of the turning point” are two names for the same number. Turning-point form hands it to you without any work, because p IS that x. Notice what the answer looks like: an axis of symmetry is a LINE, so it has to be written as an equation, x = 3. Writing just 3, or writing y = 3, both lose the mark — and y = 3 would be a horizontal line, which a parabola's mirror line never is.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "A second parabola h is defined by &nbsp;h(x) = −(x + 4)² + 1, and is shown in the sketch.<br><br>Write down the equation of the axis of symmetry of h.",
      },
      hint: {
        en: "Same idea as (a), but read the bracket carefully — the number inside it is not the answer as it stands.",
      },
      memo: [
        { type: "step", text: { en: "(x + 4)² gives p = −4 — the OPPOSITE sign to the number written in the bracket:" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = −4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: p is the opposite sign of the number in the bracket, so (x + 4)² gives −4, not 4. And the answer must be an EQUATION — x = −4, never just −4.",
        } },
      ],
      esplain: {
        en: "The sign flip catches almost everybody at least once, so it helps to know why it happens rather than just to remember it. The bracket is squared, and a square is at its smallest when whatever is inside it is zero. So the turning point sits at the x that makes (x + 4) equal zero, and that x is −4. Ask yourself that question every single time — “which x makes the bracket zero?” — and you will never have to remember which way the sign goes. Notice too that the minus in front of the bracket makes this parabola sad, arms opening downwards; that changes where the graph goes, but it changes nothing at all about where the mirror line is.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "The graph of g is shifted 2 units to the LEFT and 6 units UP to give k.<br><br>Write down the equation of k in the form &nbsp;y = a(x − p)² + q, and the equation of the axis of symmetry of k.",
      },
      hint: {
        en: "A shift carries the graph without bending it, so a does not change. Move the turning point instead — and then the new mirror line goes through the new turning point.",
      },
      memo: [
        { type: "step", text: { en: "A shift never changes the shape, so a stays 2. Only the turning point moves: from (3 ; −5), two units left is &nbsp;x = 3 − 2 = 1, six units up is &nbsp;y = −5 + 6 = 1" }, ticks: ["ca"] },
        { type: "step", text: { en: "k(x) = 2(x − 1)² + 1" }, ticks: ["a"] },
        { type: "answer", text: { en: "the axis of symmetry is the vertical line through the new turning point: &nbsp;x = 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER the sign flip again on the way back IN: a turning point at x = 1 is written (x − 1)², not (x + 1)². Check it the same way — which x makes the bracket zero?",
        } },
      ],
      esplain: {
        en: "Turning-point form is the natural place to do a shift, because p and q ARE the turning point's coordinates — so moving the graph is nothing more than moving two numbers. Two units left takes 2 off the x-coordinate; six up adds 6 to the y-coordinate; a is untouched because a controls the width and the direction, and a shift changes neither. Once the new turning point is in, the axis of symmetry follows automatically, since it is always the vertical line through it. The reveal sketch shows both lines together, the old one at x = 3 and the new one at x = 1 — the mirror line slid exactly as far as the graph did, which is the whole idea worth taking away from this card.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — PARABOLA IN STANDARD FORM, and the two kinds of shift.
   f(x) = −2x² + 8x − 3 ⟹ axis x = −8/(2(−2)) = 2 (turning point
   (2 ; 5), sad).
     m(x) = f(x) − 4     vertical shift   ⟹ axis UNCHANGED, x = 2
     k(x) = f(x + 5)     horizontal shift ⟹ axis x = 2 − 5 = −3
   The whole point of the card is that (b) looks like it should change
   and does not, and (c) looks like it should go right and goes left.
   --------------------------------------------------------------- */
const Q2_F = { kind: "parabola", a: -2, b: 8, c: -3 };
/* m = f − 4 = −2x² + 8x − 7  (TP (2 ; 1) — same x, so the mirror line does not
   move); k = f(x + 5) = −2x² − 12x − 13  (TP (−3 ; 5), which is inside the
   window already, so no widening was needed). */
const Q2_M = { kind: "parabola", a: -2, b: 8, c: -7, tone: "b", label: "m", labelAt: 3.8 };
const Q2_K = { kind: "parabola", a: -2, b: -12, c: -13, tone: "b", label: "k", labelAt: -4.5 };
const Q2_BASE_SPEC = {
  type: "function",
  win: { xmin: -5, xmax: 6, ymin: -12, ymax: 8 },
  curves: [{ ...Q2_F, tone: "a", label: "f", labelAt: 3.6 }],
};
/* (c)'s own widened spec (NIT FIX, 2026-08-23): k's TP is (−3 ; 5) with
   x-intercepts at −3 ± √2,5 ≈ −4,58 and −1,42, and its left arm doesn't
   reach the window's bottom edge (y = −12) until x ≈ −5,92 — past the base
   spec's xmin = -5, so the arch was cut off sideways before it got there.
   xmin -8 clears that with margin to spare. */
const Q2_C_SPEC = {
  type: "function",
  win: { xmin: -8, xmax: 6, ymin: -12, ymax: 8 },
  curves: [{ ...Q2_F, tone: "a", label: "f", labelAt: 3.6 }],
};
const Q2_DIAGRAM = {
  spec: Q2_BASE_SPEC,
  parts: {
    a: { question: {}, reveal: { vlines: [{ x: 2, label: "x = 2" }] } },
    /* (b)'s and (c)'s answers are the SHIFTED graphs, so each reveal draws its
       own graph (tone b, named) next to f — which is what makes (b)'s "nothing
       moved sideways" and (c)'s "it went LEFT, not right" visible rather than
       just asserted (session 2a-FIX). */
    b: {
      question: { vlines: [{ x: 2, label: "x = 2" }] },
      reveal: { vlines: [{ x: 2, label: "x = 2" }], curves: [Q2_M] },
    },
    c: {
      spec: Q2_C_SPEC,
      question: { vlines: [{ x: 2, label: "x = 2" }] },
      reveal: { vlines: [{ x: 2, label: "x = 2" }, { x: -3, label: "x = −3" }], curves: [Q2_K] },
    },
  },
};

const q2 = {
  id: "func.sib.aos.q2",
  chapter: CH,
  topic: "axis-of-symmetry",
  archetype: "axis-of-symmetry-off-standard-form-then-vertical-vs-horizontal-shift",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = −2x² + 8x − 3.<br><br>Determine the equation of the axis of symmetry of f.",
      },
      hint: {
        en: "This one is not in turning-point form, so use the formula that finds the turning point's x directly. Take care with the signs — both a and b bring one along.",
      },
      memo: [
        { type: "step", text: { en: "For &nbsp;y = ax² + bx + c&nbsp; the axis of symmetry is &nbsp;x = −b/(2a). Here a = −2 and b = 8:" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x = −8/(2(−2)) = −8/(−4) = 2 &nbsp;&nbsp;∴&nbsp; x = 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: two minus signs are in play at once — the minus in the formula and the negative a underneath. Work the top and the bottom out separately before you divide.",
        } },
      ],
      esplain: {
        en: "In standard form nothing is handed over: the equation tells you the shape and the y-intercept, but not where the graph turns. The formula x = −b/(2a) is the shortcut that finds that x without having to complete the square first — and because the axis of symmetry is the vertical line through the turning point, the same formula answers this question directly. You do not need the y here at all, which is why this is a two-mark question and not a three-mark one. Write the answer as an equation of a line, x = 2, and keep it as x = something; a parabola's mirror line is always vertical.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "The graph of m is given by &nbsp;m(x) = f(x) − 4.<br><br>Write down the equation of the axis of symmetry of m.",
      },
      hint: {
        en: "Work out which direction this shift moves the graph before you touch the answer. Then ask whether moving a graph in that direction could possibly move a vertical line sideways.",
      },
      memo: [
        { type: "step", text: { en: "The &nbsp;− 4&nbsp; sits OUTSIDE the function, so it slides the whole graph 4 units DOWN. Sliding a parabola straight down does not move it sideways at all, so the mirror line stays exactly where it was:" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this one is built to look as if it changes. A VERTICAL shift never moves the axis of symmetry, and a vertical shift is any number added or subtracted OUTSIDE the function. Only a HORIZONTAL shift moves it.",
        } },
      ],
      esplain: {
        en: "The useful habit here is to picture the movement before you write anything. Subtracting 4 outside lowers every single point of the graph by 4 — the turning point drops from (2 ; 5) to (2 ; 1), the y-intercept drops, the whole curve drops. But every one of those points keeps its own x. The axis of symmetry is a statement about x only, so it cannot notice a purely up-and-down move. That is the real content of this part: not arithmetic, but knowing which transformations your answer is sensitive to. A question worth two marks that many learners answer with a changed number, purely because a change appeared in the equation and they assumed it had to show up somewhere.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "The graph of k is given by &nbsp;k(x) = f(x + 5).<br><br>Write down the equation of the axis of symmetry of k.",
      },
      hint: {
        en: "This time the change is inside, sitting next to the x. Decide which way that moves the graph — it is the opposite of what it looks like — and move your answer from (a) the same way.",
      },
      memo: [
        { type: "step", text: { en: "The &nbsp;+ 5&nbsp; is INSIDE, next to the x, so it slides the graph 5 units LEFT — anything inside does the opposite of what it looks like:" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 2 − 5 = −3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: f(x + 5) moves the graph LEFT, not right. If you are unsure, test one value: k(−3) = f(2), so whatever f was doing at x = 2, k is doing at x = −3 — the picture has slid 5 to the left.",
        } },
      ],
      esplain: {
        en: "Inside-the-bracket changes are the ones everybody gets backwards, and the cure is to stop trying to remember the rule and start testing a number instead. k(−3) means f(−3 + 5), which is f(2) — so the height that f had at x = 2 now appears at x = −3 on k. The graph has moved 5 units to the LEFT, even though the equation says plus. Once you have settled the direction, the axis of symmetry travels with everything else, so you simply move your x = 2 the same 5 units left and land on x = −3. Put this part next to (b) and you have the whole story of shifts and mirror lines: outside changes leave the axis alone, inside changes move it, and inside changes go the opposite way from what they look like.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — HYPERBOLA: BOTH symmetry lines, both gradients.
   h(x) = 8/(x − 2) − 3. Asymptotes x = 2 and y = −3, so both lines
   run through (2 ; −3):  m = −1 gives y = −x − 1;  m = 1 gives
   y = x − 5.  Asymptotes ARE drawn — on this card they are given, not
   asked for.
   --------------------------------------------------------------- */
const Q3_H = { kind: "hyperbola", a: 8, p: 2, q: -3 };
const Q3_CENTRE = { x: 2, y: -3, label: "(2 ; −3)" };   // not ON the curve — no `on`
const Q3_NEG = { kind: "line", a: -1, q: -1, dash: true, tone: "b", label: "y = −x − 1", labelAt: -4 };
const Q3_POS = { kind: "line", a: 1, q: -5, dash: true, tone: "c", label: "y = x − 5", labelAt: 8 };
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -6, xmax: 10, ymin: -11, ymax: 5 },
    curves: [{ ...Q3_H, tone: "a", label: "h", labelAt: 6 }],
    // GIVEN asymptotes, so they are captioned on the question side (session 2a-FIX)
    asymptotes: [{ x: 2, of: 0, label: "x = 2" }, { y: -3, of: 0, label: "y = −3" }],
  },
  parts: {
    // each reveal DRAWS the mirror line it just found, dashed and named
    a: { question: {}, reveal: { points: [Q3_CENTRE], curves: [Q3_NEG] } },
    b: { question: { points: [Q3_CENTRE] }, reveal: { points: [Q3_CENTRE], curves: [Q3_POS] } },
  },
};

const q3 = {
  id: "func.sib.aos.q3",
  chapter: CH,
  topic: "axis-of-symmetry",
  archetype: "hyperbola-both-axes-of-symmetry-both-gradients",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The sketch shows the hyperbola h, defined by &nbsp;h(x) = 8/(x − 2) − 3, with its asymptotes drawn as dashed lines.<br><br>Determine the equation of the axis of symmetry of h that has a NEGATIVE gradient.",
      },
      hint: {
        en: "Both axes of symmetry go through the one point where the asymptotes cross — find that point first. A hyperbola's mirror lines only ever have two possible gradients, and you have been told which one you want.",
      },
      memo: [
        { type: "step", text: { en: "Both axes of symmetry pass through the point where the asymptotes cross, which is (p ; q) = (2 ; −3)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "a negative gradient means m = −1, so the line is &nbsp;y = −x + c&nbsp; through (2 ; −3):" }, ticks: ["ca"] },
        { type: "answer", text: { en: "−3 = −(2) + c &nbsp;⟹&nbsp; c = −1 &nbsp;&nbsp;∴&nbsp; y = −x − 1" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A hyperbola has two mirror lines, and they are the two diagonals through the corner where the asymptotes meet — one running up at 45°, one running down at 45°. That is why their gradients are always exactly 1 and −1, no matter how big a is: a decides how far the branches sit from the corner, not which way the diagonals lean. So “the one with a negative gradient” is enough information to pin down m completely. From there it is an ordinary Grade 9 job you have done a hundred times: you have a gradient and a point, so put them into y = mx + c and solve for c. The only place to slip is the substitution — with m = −1 the term is −(2), not 2.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the equation of the other axis of symmetry of h.",
      },
      hint: {
        en: "The other one runs through exactly the same point. Only its gradient is different — and for a hyperbola there is only one other gradient it could have.",
      },
      memo: [
        { type: "step", text: { en: "The other one has m = 1 and goes through the same point (2 ; −3): &nbsp;y = x + c" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "−3 = 2 + c &nbsp;⟹&nbsp; c = −5 &nbsp;&nbsp;∴&nbsp; y = x − 5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: both lines go through (p ; q), and their gradients are always 1 and −1. Only the c changes between them — so if your two answers have the same c, one of them is wrong.",
        } },
      ],
      esplain: {
        en: "This part costs almost nothing once (a) is done, and that is the point of asking it: the two mirror lines are twins. They share the same point, they differ only in which way they lean, and both leans are fixed at 45°. So the only new work is one substitution with m = 1 instead of m = −1. It is worth a quick sanity check on the sketch when you have both: the two lines should cross exactly where the two dashed asymptotes cross, and each branch of the hyperbola should sit neatly folded across one of them. If your two c values come out the same, you have almost certainly substituted the same gradient twice.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — WHAT A SHIFT DOES TO BOTH SYMMETRY LINES.
     f(x) = 6/x            centre (0 ; 0)  ⟹ y = x and y = −x
     g(x) = 6/(x − 4) − 1  centre (4 ; −1) ⟹ y = x − 5 and y = −x + 3
   (b) has its own spec — showing f and g on one pair of axes would
   hand over the shift that (b) is asked to describe.
   LEVEL 3 lands on (b).
   --------------------------------------------------------------- */
const Q4_F_SPEC = {
  type: "function",
  win: { xmin: -7, xmax: 7, ymin: -7, ymax: 7 },
  curves: [{ kind: "hyperbola", a: 6, p: 0, q: 0, tone: "a", label: "f", labelAt: 4 }],
};
const Q4_G_SPEC = {
  type: "function",
  win: { xmin: -3, xmax: 11, ymin: -8, ymax: 6 },
  curves: [{ kind: "hyperbola", a: 6, p: 4, q: -1, tone: "b", label: "g", labelAt: 8 }],
  // GIVEN asymptotes ⟹ captioned on the question side (session 2a-FIX)
  asymptotes: [{ x: 4, of: 0, label: "x = 4" }, { y: -1, of: 0, label: "y = −1" }],
};
const Q4_G_CENTRE = { x: 4, y: -1, label: "(4 ; −1)" };   // not ON the curve — no `on`
/* Both reveals DRAW the two mirror lines they found, dashed and named. */
const Q4_F_LINES = [
  { kind: "line", a: 1, q: 0, dash: true, tone: "b", label: "y = x", labelAt: 5 },
  { kind: "line", a: -1, q: 0, dash: true, tone: "c", label: "y = −x", labelAt: -5 },
];
const Q4_G_LINES = [
  { kind: "line", a: 1, q: -5, dash: true, tone: "a", label: "y = x − 5", labelAt: 9 },
  { kind: "line", a: -1, q: 3, dash: true, tone: "c", label: "y = −x + 3", labelAt: 8 },
];
const Q4_DIAGRAM = {
  spec: Q4_F_SPEC,
  parts: {
    a: { question: {}, reveal: { curves: Q4_F_LINES } },
    b: {
      spec: Q4_G_SPEC,
      question: {},
      reveal: { points: [Q4_G_CENTRE], curves: Q4_G_LINES },
    },
  },
};

const q4 = {
  id: "func.sib.aos.q4",
  chapter: CH,
  topic: "axis-of-symmetry",
  archetype: "hyperbola-shift-and-what-it-does-to-both-symmetry-lines",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the hyperbola f, defined by &nbsp;f(x) = 6/x.<br><br>Write down the equations of the two axes of symmetry of f.",
      },
      hint: {
        en: "Compare 6/x with y = a/(x − p) + q. There is nothing next to the x and nothing added on the end — so where do the asymptotes cross? Both mirror lines go through that point.",
      },
      memo: [
        { type: "step", text: { en: "f(x) = 6/x&nbsp; is &nbsp;y = a/(x − p) + q&nbsp; with p = 0 and q = 0, so the asymptotes cross at the origin (0 ; 0). Both axes of symmetry are the 45° diagonals through that point, with gradients 1 and −1:" } },
        { type: "answer", text: { en: "y = x &nbsp;&nbsp;and&nbsp;&nbsp; y = −x" }, ticks: ["a", "a"] },
      ],
      esplain: {
        en: "y = 6/x is the plainest hyperbola there is — the one every other hyperbola is a moved copy of. Nothing has been added inside the bracket and nothing on the end, so p and q are both zero and the crosshairs sit right at the origin. That makes the two mirror lines as simple as they ever get: the two 45° diagonals through the origin, which are y = x and y = −x, with no c to work out at all. Worth fixing in your memory as the baseline picture, because the next part is nothing more than this same picture picked up and put down somewhere else.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "A second hyperbola g is defined by &nbsp;g(x) = 6/(x − 4) − 1, and is shown in the sketch with its asymptotes dashed.<br><br>Describe the shift that moves f onto g, and determine the equations of the two axes of symmetry of g.",
      },
      hint: {
        en: "Compare g with f piece by piece — one change is inside the bracket and one is on the end, and they move the graph in different directions. Once you know where the crosshairs have landed, both lines follow from the same two gradients as before.",
      },
      memo: [
        { type: "step", text: { en: "Compare g with f: &nbsp;the (x − 4) slides the graph 4 units RIGHT, and the &nbsp;− 1&nbsp; on the end slides it 1 unit DOWN" }, ticks: ["ca"] },
        { type: "step", text: { en: "so the asymptotes now cross at (4 ; −1), and both axes of symmetry pass through that point. The gradients are still 1 and −1:" }, ticks: ["ca"] },
        { type: "step", text: { en: "m = 1: &nbsp;&nbsp;−1 = 4 + c &nbsp;⟹&nbsp; c = −5 &nbsp;⟹&nbsp; y = x − 5" }, ticks: ["a"] },
        { type: "answer", text: { en: "m = −1: &nbsp;&nbsp;−1 = −(4) + c &nbsp;⟹&nbsp; c = 3 &nbsp;⟹&nbsp; y = −x + 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: a shift MOVES the mirror lines but never TILTS them. The gradients stay 1 and −1 — only c changes, and it changes only because the point the lines run through has moved.",
        } },
      ],
      esplain: {
        en: "Everything on this card hangs on one idea: a shift carries the entire picture, crosshairs and mirror lines included, without changing its shape. So you never have to rebuild g from scratch — you work out where the corner went and everything else follows. The (x − 4) is inside the bracket, and inside changes go the opposite way to how they read, so that is 4 units to the right; the − 1 is outside and behaves normally, 1 unit down. The corner therefore travels from (0 ; 0) to (4 ; −1). The mirror lines started as y = x and y = −x, and they are still leaning at exactly 45°, because tilting is not something a shift can do — so all that is left is to find the new c for each by substituting the new corner. This is the part that carries the extra thinking on this tile: two lines, one shift, and the discipline not to let the sign on the shift or the sign on the gradient trip you at the last step.",
      },
    },
  ],
};

export const funcAxisOfSymmetrySiblingQuestions = [q1, q2, q3, q4];
