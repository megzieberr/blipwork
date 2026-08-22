/* ============================================================
   EXAM FOCUS — Functions · Hyperbola & exponential
   SOURCE: September Test 1 (practice), QUESTION 4 — one hyperbola
   carrying five short read-offs, ending on a sign question.
   (Overnight run #1, 2026-08-21.)
   ------------------------------------------------------------
   PRINT SOURCE:
     Desktop\Eksamen Vraestelle\Gr11 IEB Nov\Sept Practice\
       Sept-T1-Practice-QP.tex      Q4 stem + (a)–(e), TikZ sketch
       Sept-T1-Practice-Memo.tex    4(a)–4(e), 11 ticks
       Sept-T1-blueprint.md         §1, §3 whose methods
   Same working, same ticks, same WATCH OUT / REMEMBER cards as print.

   THE SKETCH, AND WHY THE PROMPT STILL LOOKS DIFFERENT FROM THE PRINTED
   ONE. The printed question hands the learner a to-scale TikZ graph and
   says "the sketch below shows…"; when this was written the schema had
   no diagram field yet, so the stem states the same facts IN WORDS
   instead — which is exactly what the print memo's own \stam line
   already does: "From the sketch: the asymptotes are x = −2 and y = 1,
   the graph passes through A(0 ; 4), and B is the x-intercept." No mark
   scheme changes: every tick in the print memo is earned from those
   facts, not from the picture. SESSION 1 (2026-08-22) added the
   `diagram` block below without touching a word of the stem — same
   discipline the blueprint's diagram-leak check already demanded of
   the print sketch: B is not drawn at all until (c) — the part that
   asks for its coordinates — has been revealed; only A(0 ; 4), the
   asymptotes, and the curve itself (given from the start, per the
   stem) are on the base figure.

   METHOD: GR11-FUNCTIONS-NOTES-DIGEST.md, hers — hyperbola
   y = a/(x − p) + q with asymptotes x = p and y = q (p is the OPPOSITE
   sign of the number next to the x); both axes of symmetry pass through
   (p ; q), gradients +1 and −1; the sign question is done by the
   PAINT method (cut a line through every x-intercept and every
   asymptote, paint + or − on each piece, read it off) — never a sign
   table. None of the digest's four flagged slips is mined.

   LEVELS: blueprint splits (4(a) = 2·L1 + 2·L2; 4(c) = 1·L1 + 1·L2).
   One level per part → dominant chunk, ties broken DOWN unless the part
   makes the learner choose or fetch a method (4(a) and 4(c) are
   read-off-then-substitute, so they sit at 2). Nothing in this question
   is starred in the print memo, so nothing here is level 4.

   REGISTERED via js/exam/cards-func.js (imported there, folded into
   funcCards), which js/exam/index.js's REGISTRY.func picks up; func is
   in js/config.js's EXAM_CHAPTERS. (This note used to say ⚠️
   UNREGISTERED — that was true before cards-func.js wired it in;
   corrected session 3, 2026-08-23.)
   ============================================================ */

const PAPER = "sept-t1";

/* DIAGRAM (SESSION 1, 2026-08-22). h(x) = 6/(x + 2) + 1, asymptotes
   x = −2 and y = 1 — both GIVEN in the stem, so they (and the curve
   itself) sit on the base figure from (a) onward; A(0 ; 4) is likewise
   given. B(−8 ; 0) is what (c) finds, so it is absent until (c)'s own
   reveal — then carried forward (already given, via chain or the
   "inequalities" card's own intro) into (e), whose paint method needs
   it. (e)'s shaded strip is the answer to "h(x) ≤ 0" and only ever
   appears on ITS OWN reveal, never the question side. */
const H1 = { kind: "hyperbola", a: 6, p: -2, q: 1 };
const H1_A = { x: 0, y: 4, on: 0, label: "A(0 ; 4)" };
const H1_B = { x: -8, y: 0, on: 0, label: "B(−8 ; 0)" };
/* (d)'s answer is a LINE, so (d)'s reveal draws it — dashed and named, the same
   "the reveal draws what it found" rule js/exam/_schema.js now states and every
   other axis-of-symmetry card on this tile follows (SESSION 2a-FIX). */
const H1_AXIS = { kind: "line", a: 1, q: 3, dash: true, tone: "b", label: "y = x + 3", labelAt: -5.5 };
const H1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -11, xmax: 3, ymin: -3, ymax: 6 },
    curves: [{ ...H1, tone: "a", label: "h", labelAt: -9 }],
    asymptotes: [{ x: -2, of: 0, label: "x = −2" }, { y: 1, of: 0, label: "y = 1" }],
    points: [H1_A],
  },
  parts: {
    a: { question: {} },
    b: { question: {} },
    c: { question: {}, reveal: { points: [H1_B] } },            // B is the answer — reveal only
    d: { question: {}, reveal: { curves: [H1_AXIS] } },
    e: {
      question: { points: [H1_B] },                             // B already given (chain / card intro)
      reveal: { points: [H1_B], shades: [{ x0: -8, x1: -2 }] },  // the ≤0 strip — reveal only
    },
  },
};

const t1q4 = {
  id: "func.hyp.t1q4",
  chapter: "func",
  topic: "hyperbola-and-exponential",
  archetype: "hyperbola-with-a-battery-of-short-read-offs",
  paper: PAPER,
  diagram: H1_DIAGRAM,
  // fn3 "Hyperbola & exponential" — asymptotes, branches, domain &
  // range: four of the five parts. 4(e) belongs to fn5, but fn3 is the
  // round that teaches the shape this whole question stands on.
  lostQuest: { chapter: "func", quest: "fn3" },
  marks: 11,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "h is a hyperbola. Its asymptotes are the lines x = −2 and y = 1. The graph passes through the point A(0 ; 4) and cuts the x-axis at B.<br><br>Determine the equation of h.",
      },
      hint: {
        en: "Start from the shape y = a/(x − p) + q and read p and q straight off the asymptotes — watch the sign on p. That leaves only one unknown, and you have been handed a point to pin it down with.",
      },
      memo: [
        { type: "step", text: { en: "A hyperbola is y = a/(x − p) + q, with the asymptotes at x = p and y = q. Read them straight off:" } },
        { type: "step", text: { en: "y = 1 &nbsp;⟹&nbsp; q = 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x = −2 &nbsp;⟹&nbsp; p = −2, &nbsp;so&nbsp; h(x) = a/(x + 2) + 1" }, ticks: ["ca"] },
        { type: "step", text: { en: "The one thing still unknown is a, so use the point that was given, A(0 ; 4):" } },
        { type: "step", text: { en: "4 = a/(0 + 2) + 1" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "3 = a/2 &nbsp;⟹&nbsp; a = 6 &nbsp;&nbsp;∴&nbsp; h(x) = 6/(x + 2) + 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: p is the <b>opposite</b> sign of the number sitting next to the x. The asymptote x = −2 gives (x + 2) in the denominator, not (x − 2).",
        } },
      ],
      esplain: {
        en: "Every hyperbola in Grade 11 is the same basic curve, y = a/x, picked up and moved: p slides it sideways, q slides it up or down, and a decides how far the branches sit from the corner. The asymptotes are the crosshairs of that move, so they hand you p and q for free — as long as you remember the sign flip on p, because the equation says (x − p) and the asymptote says x = p. With p and q in, only a is left, and one point on the curve is exactly enough to find one unknown: put the point's x and y in and solve. That is the whole three-step pattern for finding a hyperbola's equation, and it is the same pattern as finding a parabola's — read off what the picture gives you, then use a point for whatever is left over.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: {
        en: "Write down the domain of h.",
      },
      hint: {
        en: "Domain is the x-values that are allowed. There is exactly one x this graph cannot cope with — find it by asking what would make the denominator zero.",
      },
      memo: [
        { type: "step", text: { en: "The graph is undefined where the denominator is zero: x + 2 = 0." } },
        { type: "answer", text: { en: "x ∈ ℝ ; x ≠ −2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Domain means “which x-values may I feed in”. For a hyperbola the answer is always “all of them except the one that breaks the fraction”, and that one is the vertical asymptote — the same x = −2 that's h's own asymptote. Note how it is written: all the real numbers first, then the restriction riding after a semicolon. That semicolon-then-restriction layout is the one she marks.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the coordinates of B.",
      },
      hint: {
        en: "B is on the x-axis. What is y worth at every single point of the x-axis? Put that into the equation for h and solve.",
      },
      memo: [
        { type: "step", text: { en: "B is on the x-axis, so y = 0:" } },
        { type: "step", text: { en: "0 = 6/(x + 2) + 1 &nbsp;⟹&nbsp; 6/(x + 2) = −1" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "6 = −(x + 2) &nbsp;⟹&nbsp; x + 2 = −6 &nbsp;⟹&nbsp; x = −8 &nbsp;&nbsp;∴&nbsp; B(−8 ; 0)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the answer must be a <i>coordinate</i>, written with a semicolon: (−8 ; 0). The comma belongs to decimals only.",
        } },
      ],
      esplain: {
        en: "An x-intercept is not a special formula to memorise — it is just the point where the graph is sitting on the x-axis, and every point on the x-axis has y = 0. So you substitute 0 for y and solve the equation you are left with. The only fiddly bit is that the x you want is stuck in a denominator; getting the fraction alone on one side first, before you cross-multiply, keeps that tidy. And because the question asked for the COORDINATES of B, the answer has to be a point, not just a number.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the equation of the axis of symmetry of h that has a positive gradient.",
      },
      hint: {
        en: "Both axes of symmetry go through the point where the two asymptotes cross. You know that point, and you have been told the gradient is positive — for a hyperbola that means exactly one value.",
      },
      memo: [
        { type: "step", text: { en: "Both axes of symmetry pass through the point where the asymptotes cross, which is (−2 ; 1). The one with a positive gradient has m = 1:" } },
        { type: "step", text: { en: "y = x + c &nbsp;&nbsp;through (−2 ; 1)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "1 = −2 + c &nbsp;⟹&nbsp; c = 3 &nbsp;&nbsp;∴&nbsp; y = x + 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the other one is y = −x + c through the same point, giving y = −x − 1. Both go through (p ; q) — only the gradient tells them apart.",
        } },
      ],
      esplain: {
        en: "A hyperbola has two mirror lines, and they are the two diagonals through the corner where the asymptotes meet — one going up at 45°, one going down at 45°. That is why their gradients are always exactly 1 and −1, no matter what a is, and why “the one with a positive gradient” is enough information to pick one out. From there it is a plain Grade 9 job: you have a gradient and a point, so put them into y = mx + c and solve for c.",
      },
    },
    {
      id: "e",
      marks: 2,
      level: 3,
      prompt: {
        en: "For which values of x is h(x) ≤ 0?",
      },
      hint: {
        en: "Cut a line through every x-intercept and every asymptote, then paint the sign of h on each piece. Think carefully about which of your two cut points may be included in the answer and which may never be.",
      },
      memo: [
        { type: "step", text: { en: "Cut a line through <b>every x-intercept and every asymptote</b> — here x = −8 and x = −2 — then <b>paint</b> the sign of h on each piece:" } },
        { type: "step", text: { en: "left of −8: &nbsp;<b>+</b> &nbsp;&nbsp;·&nbsp;&nbsp; between −8 and −2: &nbsp;<b>−</b> &nbsp;&nbsp;·&nbsp;&nbsp; right of −2: &nbsp;<b>+</b>" } },
        { type: "step", text: { en: "h(x) ≤ 0 is the painted − piece. &nbsp;x = −8 <i>is</i> included, because h(−8) = 0. &nbsp;x = −2 is <b>never</b> included — h is undefined there." } },
        { type: "answer", text: { en: "∴ −8 ≤ x &lt; −2" }, ticks: ["ca", "a"] },
        { type: "trap", text: {
          en: "WATCH OUT: never close the bracket on an asymptote. −8 ≤ x ≤ −2 loses the mark, because h(−2) does not exist.",
        } },
      ],
      esplain: {
        en: "A graph can only change from positive to negative in two ways: by crossing the x-axis, or by jumping across an asymptote. So the cut lines go through exactly those places, and between two cuts the sign cannot change at all — which means one glance at each piece settles the whole piece. Paint a + or a − on each and the answer reads straight off. The last decision is about the ends. At an x-intercept the graph really is zero, and “≤ 0” includes zero, so that end is closed. At an asymptote the graph does not exist at all, so that end can never be closed, no matter which inequality sign the question used. One end closed, one end open, in the same answer — that is the shape this question is built to test.",
      },
    },
  ],
};

export const funcHyperbolaAndExponentialQuestions = [t1q4];
