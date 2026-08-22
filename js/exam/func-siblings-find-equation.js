/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill "find-equation"
   (SESSION 2a of the four-session function-diagram build, 2026-08-22.)
   ------------------------------------------------------------
   WHY THIS FILE EXISTS. The skill tiles (js/exam/skills.js) each held
   only the one or two cards that happened to fall out of the four
   seeded practice-paper questions — "Find the equation" had exactly
   two, and a learner who tapped "Another one!" twice ran out. Each of
   the four skills this session touches is brought to SIX cards. These
   are the four new ones for `find-equation`.

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   Her pp25–28 (equation of a parabola, three routes), pp33–34 (equation
   of a hyperbola, two routes) and pp35–37 (equation of an exponential).
   The question TYPES and the METHODS are hers; every number here is
   fresh — nothing is copied from her worked examples or from the paper
   bank. None of the digest's four flagged slips is mined.

   WHAT THE FOUR COVER, and why these four. The two cards already on
   this tile are:
     · func.lp.q1(a)      parabola from its two x-intercepts + a point
     · func.hyp.t1q4(a)   hyperbola from its asymptotes + a point
   so the routes still missing were her OTHER parabola routes, her other
   hyperbola route, and the exponential entirely:
     q1  parabola from the TURNING POINT + a point        (her route 2)
     q2  hyperbola from its TWO AXES OF SYMMETRY + x-int  (her pp33–34)
     q3  exponential: y-int → a, second point → b, then the
         b^(x+p) + q form                                 (her pp35–37)
     q4  parabola from three points, simultaneous equations (her route 3)

   EVERY CARD IS "READ IT OFF THE SKETCH". The brief's rule for this
   skill: the figure IS the given information, and the learner finds the
   equation FROM the drawing. So every fact each part works from is on
   the figure AND stated in words in the stem (a to-scale sketch is not
   a substitute for a readable stem on a phone) — and nothing else is.

   ONE DELIBERATE JUDGEMENT CALL, recorded for review: q2's figure draws
   the two axes of symmetry as dashed lines, because they are GIVEN (the
   stem states both equations). It does NOT draw the asymptotes, because
   finding where they cross is the first step of the answer — the same
   discipline js/exam/func-hyperbola-and-exponential-2.js already uses
   for its (a). No grid anywhere in this file, for the same reason.
   SESSION 2a-FIX (2026-08-22): those two given lines now carry their own
   equations as captions, and q2(a)'s REVEAL draws the asymptotes it
   derived, dashed and captioned — the reveal draws what it found.

   LEVELS: mostly 1–2, exactly one level 3 (q4 — three unknowns, three
   simultaneous equations, and the learner has to notice that the
   factorised route is unavailable). Nothing here is level 4.
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — PARABOLA FROM ITS TURNING POINT + ONE POINT (her route 2).
   f(x) = 2(x + 1)² − 8, TP(−1 ; −8), through (1 ; 0).
   Both given facts are on the figure; a is the answer, and a is not
   readable off an unGRIDded sketch, so nothing leaks.
   --------------------------------------------------------------- */
const Q1_F = { kind: "parabola", a: 2, p: -1, q: -8 };
const Q1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -6, xmax: 4, ymin: -10, ymax: 8 },
    curves: [{ ...Q1_F, tone: "a", label: "f", labelAt: -3.5 }],
    points: [
      { x: -1, y: -8, on: 0, label: "TP(−1 ; −8)", place: "below" },
      { x: 1, y: 0, on: 0, label: "(1 ; 0)" },
    ],
  },
  parts: { a: { question: {} }, b: { question: {} } },
};

const q1 = {
  id: "func.sib.fe.q1",
  chapter: CH,
  topic: "find-equation",
  archetype: "parabola-equation-from-turning-point-and-a-point",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The sketch shows the parabola f. Its turning point is TP(−1 ; −8), and it passes through the point (1 ; 0).<br><br>Determine the equation of f in the form y = a(x − p)² + q.",
      },
      hint: {
        en: "You have been handed the turning point, so start from the turning-point form — p and q are the turning point's own coordinates. Watch the sign on p. That leaves one letter, and you have been given one extra point to pin it down.",
      },
      memo: [
        { type: "step", text: { en: "The turning point is given, so start from &nbsp;y = a(x − p)² + q&nbsp; with TP(p ; q) = (−1 ; −8):" } },
        { type: "step", text: { en: "y = a(x + 1)² − 8" }, ticks: ["s/f"] },
        { type: "step", text: { en: "the only unknown left is a, so substitute the point the graph passes through, (1 ; 0): &nbsp;0 = a(1 + 1)² − 8" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "0 = 4a − 8 &nbsp;⟹&nbsp; a = 2 &nbsp;&nbsp;∴&nbsp; f(x) = 2(x + 1)² − 8" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: p sits inside the bracket with the OPPOSITE sign. A turning point at x = −1 gives (x + 1)², not (x − 1)². Check it by asking which x makes the bracket zero — it must be your turning-point x.",
        } },
      ],
      esplain: {
        en: "Turning-point form is built for exactly this question. In y = a(x − p)² + q the p and the q are not mysterious constants — they ARE the turning point's coordinates, so the moment the sketch hands you TP(−1 ; −8) you can write two thirds of the equation down without doing any work. What the turning point cannot tell you is how wide or how narrow the parabola is, because a whole family of parabolas turn at the same point, some skinny, some fat, some upside down. That is the job of a, and one extra point is exactly enough to find one unknown: put its x and its y into the equation and solve. Same three-step pattern as the hyperbola question on this tile — read off what the picture gives, then use a point for whatever is left.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Write the equation of f in the form y = ax² + bx + c.",
      },
      hint: {
        en: "Nothing new to find here — this is the same graph, just written out. Square the bracket first, then multiply through and collect the numbers.",
      },
      memo: [
        { type: "step", text: { en: "Square the bracket first: &nbsp;(x + 1)² = x² + 2x + 1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "f(x) = 2(x² + 2x + 1) − 8 = 2x² + 4x + 2 − 8 = 2x² + 4x − 6" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (x + 1)² is NOT x² + 1. Write the bracket out twice and multiply it properly, or use the pattern (x + k)² = x² + 2kx + k².",
        } },
      ],
      esplain: {
        en: "The two forms are the same parabola wearing different clothes. Turning-point form shows you where the graph turns; standard form shows you the y-intercept sitting at the end as c. Neither is more correct, so read the question and give the form it asked for — an answer in the wrong form is working, not an answer. Here the −6 that drops out at the end is a free check: it should be the y-value where the graph crosses the y-axis, and if you put x = 0 into 2(x + 1)² − 8 you get 2 − 8 = −6, the same number. Whenever you change form, that little check costs five seconds and catches almost every expansion slip.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — HYPERBOLA FROM ITS TWO AXES OF SYMMETRY + ITS x-INTERCEPT
   (her pp33–34, the route that is NOT "asymptotes + point").
   Axes y = x + 2 and y = −x − 4 cross at (−3 ; −1) ⟹ p = −3, q = −1;
   the x-intercept (2 ; 0) then gives a = 5.
   h(x) = 5/(x + 3) − 1.
   The two dashed lines on the figure ARE the two given equations; the
   asymptotes are deliberately NOT drawn, because where they cross is
   the first step of the answer.
   --------------------------------------------------------------- */
const Q2_H = { kind: "hyperbola", a: 5, p: -3, q: -1 };
const Q2_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -9, xmax: 4, ymin: -8, ymax: 6 },
    curves: [
      { ...Q2_H, tone: "a", label: "h", labelAt: -6 },
      // the two GIVEN symmetry lines, each carrying its own equation
      // (session 2a-FIX — a given line must say which one it is)
      { kind: "line", a: 1, q: 2, tone: "b", dash: true, label: "y = x + 2", labelAt: 1.5 },
      { kind: "line", a: -1, q: -4, tone: "c", dash: true, label: "y = −x − 4", labelAt: -7 },
    ],
    points: [{ x: 2, y: 0, on: 0, label: "(2 ; 0)" }],
  },
  // the asymptotes are what (a) DERIVES, so the reveal draws them, captioned
  parts: {
    a: {
      question: {},
      reveal: { asymptotes: [{ x: -3, of: 0, label: "x = −3" }, { y: -1, of: 0, label: "y = −1" }] },
    },
  },
};

const q2 = {
  id: "func.sib.fe.q2",
  chapter: CH,
  topic: "find-equation",
  archetype: "hyperbola-equation-from-its-two-symmetry-lines-and-an-intercept",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "The sketch shows a hyperbola h together with its two axes of symmetry, drawn as dashed lines. The axes of symmetry are &nbsp;y = x + 2&nbsp; and &nbsp;y = −x − 4, and h cuts the x-axis at (2 ; 0).<br><br>Determine the equation of h in the form y = a/(x − p) + q.",
      },
      hint: {
        en: "Both axes of symmetry run through the one point where the asymptotes cross — so find where the two given lines meet, and you have found that point. Its coordinates are p and q. Then one point on the curve finishes the job.",
      },
      memo: [
        { type: "step", text: { en: "Both axes of symmetry pass through the point where the asymptotes cross, so solve the two given lines simultaneously:" } },
        { type: "step", text: { en: "x + 2 = −x − 4 &nbsp;⟹&nbsp; 2x = −6 &nbsp;⟹&nbsp; x = −3, &nbsp;and then&nbsp; y = −3 + 2 = −1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "so the asymptotes cross at (−3 ; −1), giving p = −3 and q = −1: &nbsp;h(x) = a/(x + 3) − 1" }, ticks: ["ca"] },
        { type: "step", text: { en: "the only unknown left is a, so substitute the x-intercept (2 ; 0): &nbsp;0 = a/(2 + 3) − 1" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "a/5 = 1 &nbsp;⟹&nbsp; a = 5 &nbsp;&nbsp;∴&nbsp; h(x) = 5/(x + 3) − 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: p is the OPPOSITE sign of the number next to the x. The crossing point x = −3 gives (x + 3) in the denominator, not (x − 3).",
        } },
      ],
      esplain: {
        en: "This looks like a different question from the usual hyperbola one, but it is the same question with one extra step in front. Normally the asymptotes are handed to you and you read p and q straight off them. Here they are hidden, and what you are given instead are the two mirror lines. The useful fact is that everything about a hyperbola — both asymptotes and both mirror lines — passes through one single point, the corner of the whole picture, at (p ; q). So finding where the two mirror lines cross IS finding that corner, and that is an ordinary Grade 9 simultaneous-equations job: set the two right-hand sides equal, solve for x, then put x back into either line for y. From there you are on familiar ground — p and q are in, only a is missing, and the x-intercept is the point that pins it down.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — EXPONENTIAL: y-intercept → a, second point → b, then the
   b^(x + p) + q form (her pp35–37, both halves).
   g(x) = 2·2ˣ − 4 = 2^(x+1) − 4. Asymptote y = −4, y-int (0 ; −2),
   through (2 ; 4). Chosen so that a really does equal b, which is what
   makes the second form worth asking for.
   --------------------------------------------------------------- */
const Q3_G = { kind: "exp", a: 2, b: 2, p: 0, q: -4 };
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -5, xmax: 4, ymin: -6, ymax: 10 },
    curves: [{ ...Q3_G, tone: "a", label: "g", labelAt: 2.2 }],
    asymptotes: [{ y: -4, of: 0, label: "y = −4" }],   // GIVEN in the stem ⟹ captioned
    points: [
      { x: 0, y: -2, on: 0, label: "(0 ; −2)" },
      { x: 2, y: 4, on: 0, label: "(2 ; 4)" },
    ],
  },
  parts: { a: { question: {} }, b: { question: {} } },
};

const q3 = {
  id: "func.sib.fe.q3",
  chapter: CH,
  topic: "find-equation",
  archetype: "exponential-equation-from-asymptote-y-intercept-and-a-point",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "The sketch shows the exponential graph g, defined by &nbsp;g(x) = a·bˣ + q. The dashed line y = −4 is its asymptote, g cuts the y-axis at (0 ; −2), and g passes through the point (2 ; 4).<br><br>Determine the values of a, b and q.",
      },
      hint: {
        en: "Take them in the order the picture hands them over: the asymptote gives one letter for free, the y-intercept gives the next — remember what any base to the power 0 is worth — and only then does the third point become useful.",
      },
      memo: [
        { type: "step", text: { en: "In &nbsp;y = a·bˣ + q&nbsp; the q is the asymptote, read straight off the dashed line: &nbsp;q = −4, &nbsp;so&nbsp; g(x) = a·bˣ − 4" }, ticks: ["s/f"] },
        { type: "step", text: { en: "the y-intercept has x = 0, and b⁰ = 1 whatever b is, so it hands you a at once: &nbsp;−2 = a(1) − 4 &nbsp;⟹&nbsp; a = 2" }, ticks: ["ca"] },
        { type: "step", text: { en: "now use the second point (2 ; 4): &nbsp;4 = 2·b² − 4 &nbsp;⟹&nbsp; 2b² = 8 &nbsp;⟹&nbsp; b² = 4" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "b = 2 &nbsp;&nbsp;∴&nbsp; a = 2, &nbsp;b = 2, &nbsp;q = −4 &nbsp;&nbsp;(so g(x) = 2·2ˣ − 4)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: taking the square root of b² = 4 usually gives ±2, but the base of an exponential is ALWAYS positive — a negative base is not an exponential graph at all. So b = 2 only, and the −2 is thrown away.",
        } },
      ],
      esplain: {
        en: "There are three letters, so you need three facts, and the sketch gives you exactly three — but the order matters, because each one only becomes easy once the one before it is in. The asymptote is the free one: q is the height the graph flattens out at, nothing to calculate. The y-intercept is next, and it is easy for a reason worth remembering: at x = 0 the power bˣ becomes b⁰, and anything to the power 0 is 1, so the b vanishes and only a is left. Now, with q and a both known, the third point has just one unknown in it and you can finally solve for b. If you had tried the third point first you would have had two unknowns in one equation and got stuck — not because the maths was hard, but because you spent your facts in the wrong order.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write the equation of g in the form &nbsp;y = b<sup>x + p</sup> + q.",
      },
      hint: {
        en: "Look at your a and your b — they are the same number. Write the a as that number to the power 1, and then use the exponent law for multiplying two powers of the same base.",
      },
      memo: [
        { type: "step", text: { en: "g(x) = 2·2ˣ − 4, &nbsp;and the front 2 is 2¹, so the two powers have the SAME base: &nbsp;2¹·2ˣ = 2<sup>x + 1</sup>&nbsp; — same base, so add the exponents" }, ticks: ["ca"] },
        { type: "answer", text: { en: "g(x) = 2<sup>x + 1</sup> − 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the − 4 stays exactly where it is. Only the two powers combine — the asymptote number is outside the power and never joins in.",
        } },
      ],
      esplain: {
        en: "This form catches people out because it looks like a new kind of graph, and it is not — it is the same graph, written more compactly. The move that gets you there is one exponent law you already know: powers of the same base multiply by adding their exponents. The only trick is spotting that the number in front, 2, is itself a power of 2, namely 2¹ — and that is exactly why this question was set up with a equal to b. If a had been 5 and b had been 2 you could not have done it, because 5 is not a power of 2. So the honest test before you start is: is the number in front a power of the base? If yes, the two collapse into one power and the +1 slides into the exponent. If no, the equation is already in its simplest form and you leave it alone.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — PARABOLA FROM THREE POINTS, SIMULTANEOUS EQUATIONS (her route
   3, pp25–28). f(x) = 2x² + 3x − 4 through (−2 ; −2), (0 ; −4),
   (1 ; 1). Deliberately chosen with UGLY x-intercepts, so the
   factorised route genuinely is not available and the learner has to
   go the simultaneous way — which is the whole point of the route.
   LEVEL 3: this file's one harder card.
   --------------------------------------------------------------- */
const Q4_F = { kind: "parabola", a: 2, b: 3, c: -4 };
const Q4_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 3, ymin: -7, ymax: 8 },
    curves: [{ ...Q4_F, tone: "a", label: "f", labelAt: 1.3 }],
    points: [
      { x: -2, y: -2, on: 0, label: "(−2 ; −2)" },
      { x: 0, y: -4, on: 0, label: "(0 ; −4)" },
      { x: 1, y: 1, on: 0, label: "(1 ; 1)" },
    ],
  },
  parts: { a: { question: {} } },
};

const q4 = {
  id: "func.sib.fe.q4",
  chapter: CH,
  topic: "find-equation",
  archetype: "parabola-equation-from-three-points-simultaneous-equations",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = ax² + bx + c. It passes through the points (−2 ; −2), (0 ; −4) and (1 ; 1).<br><br>Determine the values of a, b and c.",
      },
      hint: {
        en: "One of the three points is doing a special job — look at which one sits on the y-axis, and at what c means in y = ax² + bx + c. That leaves two unknowns, and you still have two points, so you get two equations to solve together.",
      },
      memo: [
        { type: "step", text: { en: "(0 ; −4) is the y-intercept, and in &nbsp;y = ax² + bx + c&nbsp; the c IS the y-intercept: &nbsp;c = −4" }, ticks: ["s/f"] },
        { type: "step", text: { en: "substitute (1 ; 1): &nbsp;1 = a(1)² + b(1) − 4 &nbsp;⟹&nbsp; a + b = 5 &nbsp;&nbsp;…①" }, ticks: ["s/f"] },
        { type: "step", text: { en: "substitute (−2 ; −2): &nbsp;−2 = a(−2)² + b(−2) − 4 &nbsp;⟹&nbsp; 4a − 2b = 2 &nbsp;⟹&nbsp; 2a − b = 1 &nbsp;&nbsp;…②" }, ticks: ["ca"] },
        { type: "step", text: { en: "① + ②&nbsp; eliminates b: &nbsp;3a = 6 &nbsp;⟹&nbsp; a = 2, &nbsp;and back into ①: &nbsp;b = 5 − 2 = 3" } },
        { type: "answer", text: { en: "a = 2, &nbsp;b = 3, &nbsp;c = −4 &nbsp;&nbsp;∴&nbsp; f(x) = 2x² + 3x − 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: do NOT reach for y = a(x − x₁)(x − x₂) here. That form needs the two x-INTERCEPTS, and you were not given them — this graph does not cross the x-axis at whole numbers at all. Three unknowns need three points and three equations.",
        } },
      ],
      esplain: {
        en: "Three unknown letters means you need three separate facts, and three points on the curve are exactly that: each point, substituted in, becomes one equation. The reason this route feels heavier than the other two is that nothing is handed to you ready-made — no turning point to read p and q off, no x-intercepts to write the brackets from. So the strategy is to spend the cheapest fact first. The point on the y-axis is the cheapest by miles, because its x is 0, which kills both the ax² and the bx term and leaves c standing alone. With c known, the other two points each give a plain equation in a and b, and you solve those two together the way you always have — line them up, add or subtract to knock out one letter, then substitute back for the other. Slow, but it never fails, and it is the only route that works when the graph's intercepts are not friendly numbers.",
      },
    },
  ],
};

export const funcFindEquationSiblingQuestions = [q1, q2, q3, q4];
