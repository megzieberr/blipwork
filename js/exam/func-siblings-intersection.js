/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill "intersection"
   (SESSION D1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map: `intersection` is one of the four NEW
   Functions tiles.)
   ------------------------------------------------------------
   Six new cards on a tile that had been drawn on her original tile
   sketch as “[Intersection]” and never built. Solving two graphs
   together is the join between the Functions chapter and the
   Equations chapter, and it is where a paper's Functions question
   usually turns from reading to working.

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   Her pp46–51 (cut a line through every intersection, then paint the
   regions — never a sign table), pp38–39 (the mixed sketch where one
   constant has to be found from a shared point), p10 (the hyperbola's
   corner (p ; q) and its symmetry) and pp52–58 (a horizontal line
   y = k sliding across a graph). Archetype shapes from
   GR11-IEB-PAPER-BANK.md 5 and SURVEY-June's Q9(b) / Q4 functions
   items. The TYPES and the METHOD are hers; every number is fresh.
   None of the digest's four flagged slips is mined.

   WHAT THE SIX COVER:
     q1  a line cutting a parabola — “show that … = 0”, then hence
     q2  a parabola and an exponential sharing an x-intercept: find the
         parabola's missing constant
     q3  a HORIZONTAL line y = k cutting a parabola, then the strip
         where the graph is above it
     q4  read the intersections OFF the sketch first, then confirm them
         algebraically (the only card with a grid, for exactly that
         reason)
     q5  a line cutting a HYPERBOLA — multiply by (x − p) and a
         quadratic appears — then the midpoint of the two points, which
         turns out to be the hyperbola's own corner
     q6  “hence, or otherwise, solve f(x) &gt; g(x)” — her cut-line and
         paint method run straight off the intersections just found

   THE BARE-FIGURE RULE FOR THIS TILE (session brief, 2026-08-23): both
   graphs are drawn on the QUESTION side, and the point where they cut
   each other is NOT marked — finding it is the whole job. Every reveal
   then adds the labelled points (and, for the inequality parts, the cut
   lines and the painted strip). Given asymptotes are captioned on the
   question side, because they are given.

   q2 IS THE ONE DELIBERATE EXCEPTION, and it has to be: its parabola
   carries the unknown constant c, so drawing it on the question side
   would hand over the answer to (c) — the second x-intercept could be
   read straight off the picture. So the base figure draws the
   exponential alone, and the parabola appears from (b)'s reveal
   onwards, the moment c is known.

   LEVELS: three level-1 parts, eight level-2 and three level-3.
   Nothing here is level 4 — the ★ questions live on the chapter's
   `level-4` tile (her ruling 5, EXAM-BUILD-DAY.md).
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — A LINE CUTS A PARABOLA: “show that”, then “hence”.
   f(x) = x² − 4x + 6, g(x) = x + 2.
     f(x) = g(x) ⟹ x² − 5x + 4 = 0 ⟹ (x − 1)(x − 4) = 0
     P(1 ; 3)  and  Q(4 ; 6)
   (a)'s reveal marks the two crossings as BARE dots — the picture of
   “these are the two places the equation is about” — and only (b)'s
   reveal writes their coordinates on.
   BOTH CROSSINGS SIT WELL CLEAR OF BOTH AXES, deliberately: a labelled
   point sitting ON the x-axis has three strokes running through it (the
   axis and the two graphs) and the engine's placer has nowhere clean to
   put its coordinates — the first draft of this card had exactly that
   fault, and lifting f by 3 units cures it without changing a single
   step of the working.
   --------------------------------------------------------------- */
const Q1_F = { kind: "parabola", a: 1, b: -4, c: 6, tone: "a", label: "f", labelAt: 4.8 };
const Q1_G = { kind: "line", a: 1, q: 2, tone: "b", label: "g", labelAt: 7 };
const Q1_P_BARE = { x: 1, y: 3, on: [0, 1] };
const Q1_Q_BARE = { x: 4, y: 6, on: [0, 1] };
const Q1_P = { x: 1, y: 3, on: [0, 1], label: "P(1 ; 3)", place: "left" };
const Q1_Q = { x: 4, y: 6, on: [0, 1], label: "Q(4 ; 6)", place: "aboveLeft" };
const Q1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -3, xmax: 8, ymin: -3, ymax: 12 },
    curves: [Q1_F, Q1_G],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q1_P_BARE, Q1_Q_BARE] } },
    b: { question: {}, reveal: { points: [Q1_P, Q1_Q] } },
  },
};

const q1 = {
  id: "func.sib.int.q1",
  chapter: CH,
  topic: "intersection",
  archetype: "line-cuts-a-parabola-show-that-then-hence-solve",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 4x + 6, &nbsp;and the straight line g, defined by &nbsp;g(x) = x + 2. &nbsp;They cut each other at P and Q.<br><br>Show that the x-coordinates of P and Q are the solutions of &nbsp;x² − 5x + 4 = 0.",
      },
      hint: {
        en: "At a point where two graphs cross, both graphs give the SAME height for the same x. So set the two expressions equal to each other and bring everything to one side.",
      },
      memo: [
        { type: "step", text: { en: "At P and Q the two graphs have the same y-value, so put &nbsp;f(x) = g(x):" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x² − 4x + 6 = x + 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "bring everything to the left: &nbsp;x² − 4x − x + 6 − 2 = 0 &nbsp;&nbsp;∴&nbsp; x² − 5x + 4 = 0" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: every term must change sign as it crosses over. The + 2 becomes − 2 and the x becomes −x — losing one of those is what turns this into a quadratic that does not factorise.",
        } },
      ],
      esplain: {
        en: "A point where two graphs cross belongs to both of them, which means it satisfies both equations at once. So it has the same x and the same y in each — and putting the two expressions for y equal to each other is simply saying that out loud. From there it is ordinary algebra: collect everything on one side so the equation reads “something = 0”, because that is the only form a quadratic can be factorised from. In a “show that” question the answer is printed for you, so the marks are entirely for the working that gets there. Never write the given line down and call it done, and never work backwards from it. Start at f(x) = g(x), tidy up one step at a time, and let your last line be the line you were asked to show.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence determine the coordinates of P and Q.",
      },
      hint: {
        en: "Factorise the quadratic you were given and solve it — that gives you the two x-values. Then put each one back into the EASIER of the two equations to get its height.",
      },
      memo: [
        { type: "step", text: { en: "x² − 5x + 4 = 0 &nbsp;⟹&nbsp; (x − 1)(x − 4) = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "x = 1&nbsp; or&nbsp; x = 4" }, ticks: ["a"] },
        { type: "answer", text: { en: "heights from the line: &nbsp;g(1) = 3&nbsp; and&nbsp; g(4) = 6 &nbsp;&nbsp;∴&nbsp; P(1 ; 3)&nbsp; and&nbsp; Q(4 ; 6)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the question asks for COORDINATES, not for x. Stopping at x = 1 and x = 4 leaves the last mark on the table every time.",
        } },
      ],
      esplain: {
        en: "Solving the quadratic gives the two x-values where the graphs meet, but an intersection is a place, so each one still needs its height. Substitute into whichever equation is less work — here the straight line, every time, because g(1) is one small sum while f(1) is three terms. It does not matter which you choose: the whole point of an intersection is that both equations give the same answer there, so if you have time, doing it in both is a free check. One habit worth building: write the two answers as named points, P(1 ; 3) and Q(4 ; 6), in the order the sketch shows them from left to right. It makes the next part of an exam question much easier to talk about.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — A PARABOLA AND AN EXPONENTIAL SHARING AN x-INTERCEPT
   (her pp38–39 mixed-sketch shape, one constant unknown).
   g(x) = 2ˣ − 4 (given, asymptote y = −4), f(x) = x² − 5x + c.
     g cuts the x-axis where 2ˣ = 4 = 2² ⟹ A(2 ; 0)
     A is on f too ⟹ 4 − 10 + c = 0 ⟹ c = 6
     f(x) = x² − 5x + 6 = (x − 2)(x − 3) ⟹ the other root is (3 ; 0)
   The two graphs really do meet exactly once on this window (checked
   in verify-exam-modules.mjs), so the picture tells no lie.
   --------------------------------------------------------------- */
const Q2_G = { kind: "exp", a: 1, b: 2, p: 0, q: -4, tone: "a", label: "g", labelAt: 3.7 };
const Q2_F = { kind: "parabola", a: 1, b: -5, c: 6, tone: "b", label: "f", labelAt: 4.6 };
const Q2_A_G = { x: 2, y: 0, on: 0, label: "A(2 ; 0)", place: "aboveLeft" };
/* Once f is drawn, THREE strokes run through A — the x-axis and both
   graphs — and there is no slot left where its coordinates can be
   written without a curve through them. A is FOUND in (a), and its
   coordinates are written on there; from (b) onwards it stays a bare
   dot and only the newly-found things carry labels. */
const Q2_A_DOT = { x: 2, y: 0, on: [0, 1] };
const Q2_B = { x: 3, y: 0, on: 1, label: "(3 ; 0)", place: "belowRight" };
const Q2_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -3, xmax: 5, ymin: -7, ymax: 12 },
    curves: [Q2_G],
    asymptotes: [{ y: -4, of: 0, label: "y = −4" }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q2_A_G] } },
    b: { question: {}, reveal: { curves: [Q2_F], points: [Q2_A_DOT] } },
    c: { question: { points: [Q2_A_G] }, reveal: { curves: [Q2_F], points: [Q2_A_DOT, Q2_B] } },
  },
};

const q2 = {
  id: "func.sib.int.q2",
  chapter: CH,
  topic: "intersection",
  archetype: "parabola-and-exponential-share-an-x-intercept-find-the-unknown-constant",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the exponential graph g, defined by &nbsp;g(x) = 2ˣ − 4, &nbsp;with asymptote &nbsp;y = −4. &nbsp;The parabola &nbsp;f(x) = x² − 5x + c&nbsp; cuts the x-axis at the same point A as g does. (f is not drawn.)<br><br>Determine the coordinates of A.",
      },
      hint: {
        en: "A is where g cuts the x-axis, so put y = 0 in g's equation. Get the power on its own, then write the other side as a power of 2 as well.",
      },
      memo: [
        { type: "step", text: { en: "A is on the x-axis, so put &nbsp;y = 0&nbsp; into g: &nbsp;2ˣ − 4 = 0 &nbsp;⟹&nbsp; 2ˣ = 4 = 2<sup>2</sup>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "same base, so the powers are equal: &nbsp;x = 2 &nbsp;&nbsp;∴&nbsp; A(2 ; 0)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "This is an ordinary x-intercept, dressed up. The x-axis is the line y = 0, so anything sitting on it has a height of zero, and that is all “cuts the x-axis” ever means. Once the 4 is moved across you are left with 2 to the power of something equalling 4, and the way through an exponential equation is always the same: make both sides powers of the SAME base. Since 4 is 2 squared, both sides are now powers of 2, and two equal powers of the same base must have equal exponents. That turns the whole thing into x = 2. Write the answer as a point, because A is a place on the picture, and the next part is going to need both of its coordinates.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence determine the value of c.",
      },
      hint: {
        en: "A is on the parabola as well, so A's coordinates must make the parabola's equation true. Substitute them in and solve the little equation for c.",
      },
      memo: [
        { type: "step", text: { en: "A(2 ; 0) lies on f as well, so its coordinates satisfy f's equation:" }, ticks: ["s/f"] },
        { type: "step", text: { en: "0 = (2)² − 5(2) + c &nbsp;⟹&nbsp; 0 = 4 − 10 + c" }, ticks: ["ca"] },
        { type: "answer", text: { en: "0 = −6 + c &nbsp;&nbsp;∴&nbsp; c = 6" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: a point being ON a graph is a fact you can SUBSTITUTE. Every “find the missing constant” question in this chapter starts the same way — put the point's x in for x and its y in for y.",
        } },
      ],
      esplain: {
        en: "Everything in this chapter that asks for a missing letter works the same way, so it is worth saying as a rule: if a point lies on a graph, its coordinates make that graph's equation true. Here A(2 ; 0) is on both graphs, and you already know everything about g, so the useful half is that A is on f. Put x = 2 and y = 0 into f's equation and the only unknown left is c, which makes it a one-line equation instead of a graphs problem. Keep the substitution visible in your working — the marker gives a mark for the substituting, not only for the answer. And notice how little you needed: no factorising, no turning point, just one point and one equation.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the coordinates of the other point where f cuts the x-axis.",
      },
      hint: {
        en: "Now that you know c, f is an ordinary trinomial. Factorise it — you already know one of its brackets, because you know one of its roots.",
      },
      memo: [
        { type: "step", text: { en: "f(x) = x² − 5x + 6 = (x − 2)(x − 3)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 2&nbsp; or&nbsp; x = 3, and x = 2 is A &nbsp;&nbsp;∴&nbsp; the other point is (3 ; 0)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "With c found, f is just x² − 5x + 6, and its x-intercepts come from factorising as usual: two numbers that multiply to 6 and add to −5, which are −2 and −3. There is a lovely check hiding in here. You already knew that x = 2 was a root, because A is on the graph — so one of your brackets HAD to come out as (x − 2). If it does not, something earlier went wrong, and you have caught it before it cost you anything. The second root is the new information: the parabola crosses the x-axis again at x = 3, one unit further along, which is also why the sketch shows the curve dipping below the axis in between.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — A HORIZONTAL LINE y = k CUTTING A PARABOLA (her pp52–58).
   f(x) = −(x − 3)² + 4, TP(3 ; 4), and the line y = 3.
     −(x − 3)² + 4 = 3 ⟹ (x − 3)² = 1 ⟹ x = 2 or x = 4
     C(2 ; 3) and D(4 ; 3), and f(x) &gt; 3 exactly on 2 &lt; x &lt; 4.
   --------------------------------------------------------------- */
const Q3_F = { kind: "parabola", a: -1, p: 3, q: 4, tone: "a", label: "f", labelAt: 6.2 };
const Q3_LINE = { kind: "line", a: 0, q: 3, dash: true, tone: "c", label: "y = 3", labelAt: 7.2 };
const Q3_TP = { x: 3, y: 4, on: 0, label: "TP(3 ; 4)", place: "above" };
const Q3_C = { x: 2, y: 3, on: [0, 1], label: "C(2 ; 3)", place: "left" };
const Q3_D = { x: 4, y: 3, on: [0, 1], label: "D(4 ; 3)", place: "right" };
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -2, xmax: 8, ymin: -8, ymax: 7 },
    curves: [Q3_F, Q3_LINE],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q3_TP] } },
    b: { question: { points: [Q3_TP] }, reveal: { points: [Q3_TP, Q3_C, Q3_D] } },
    c: { question: { points: [Q3_C, Q3_D] }, reveal: { points: [Q3_C, Q3_D], shades: [{ x0: 2, x1: 4 }] } },
  },
};

const q3 = {
  id: "func.sib.int.q3",
  chapter: CH,
  topic: "intersection",
  archetype: "horizontal-line-y-equals-k-cutting-a-parabola-and-the-strip-above-it",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = −(x − 3)² + 4, &nbsp;and the dashed horizontal line &nbsp;y = 3.<br><br>Write down the coordinates of the turning point of f, and state whether it is a maximum or a minimum.",
      },
      hint: {
        en: "The equation is already in turning-point form, so read (p ; q) straight off it — remembering that p is the opposite sign of the number inside the bracket. The sign in front decides happy or sad.",
      },
      memo: [
        { type: "answer", text: { en: "(x − 3)² gives p = 3, and q = 4 &nbsp;&nbsp;∴&nbsp; TP(3 ; 4)" }, ticks: ["a"] },
        { type: "answer", text: { en: "a = −1, and a &lt; 0, so f is <b>sad</b> &nbsp;∴&nbsp; the turning point is a MAXIMUM" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Reading the turning point off turning-point form is the free mark in this question, but it is also the fact that makes the rest of the question sensible. The highest f ever gets is 4. The dashed line sits at 3, which is lower than 4 but higher than the arms of the parabola further out — so the line has to slice through the curve, and it has to do it twice, once on the way up and once on the way down. You can see all of that before doing any algebra, and it is worth seeing, because it tells you how many answers to expect in the next part. If the line had been drawn at y = 5, above the peak, there would have been no crossings at all.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 2,
      prompt: {
        en: "The line &nbsp;y = 3&nbsp; cuts f at C and D. Determine the coordinates of C and D.",
      },
      hint: {
        en: "Put the two equations equal to each other. Get the squared bracket on its own before you square-root, and remember the ± — the line cuts the curve twice.",
      },
      memo: [
        { type: "step", text: { en: "At C and D the heights are equal, so put &nbsp;f(x) = 3:" }, ticks: ["s/f"] },
        { type: "step", text: { en: "−(x − 3)² + 4 = 3 &nbsp;⟹&nbsp; −(x − 3)² = −1 &nbsp;⟹&nbsp; (x − 3)² = 1" }, ticks: ["ca"] },
        { type: "step", text: { en: "x − 3 = ±1 &nbsp;⟹&nbsp; x = 4&nbsp; or&nbsp; x = 2" }, ticks: ["a"] },
        { type: "answer", text: { en: "both points sit on the line, so both heights are 3 &nbsp;&nbsp;∴&nbsp; C(2 ; 3)&nbsp; and&nbsp; D(4 ; 3)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: dividing by −1 flips BOTH sides. −(x − 3)² = −1 becomes (x − 3)² = 1, not (x − 3)² = −1 — and a square can never equal a negative, so that slip ends in “no solution” on a question that clearly has two.",
        } },
      ],
      esplain: {
        en: "A horizontal line is the friendliest thing that can cut a graph, because you already know both heights: they are both k. So the only unknown is where. Set the parabola equal to 3, tidy until the squared bracket stands alone, and square-root both sides — with the ±, which is where the two crossings come from. Notice that you never needed to expand the bracket; turning-point form is doing you a favour, so take it. When you write the answers down, both of them keep the same y, because both points lie on the line y = 3. That is a useful self-check: if one of your two points came out with a different height, you have substituted into the wrong thing somewhere.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write down the values of x for which &nbsp;f(x) &gt; 3.",
      },
      hint: {
        en: "Draw a cut line down through each of C and D, then look at the picture: on which side of those lines is the curve drawn ABOVE the dashed line?",
      },
      memo: [
        { type: "step", text: { en: "Cut lines through C and D at &nbsp;x = 2&nbsp; and&nbsp; x = 4. Between them the parabola is drawn ABOVE the line &nbsp;y = 3:" }, ticks: ["ca"] },
        { type: "answer", text: { en: "2 &lt; x &lt; 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the question says &gt;, not ≥, so x = 2 and x = 4 are NOT included — at those two x-values f is exactly 3, not more than 3.",
        } },
      ],
      esplain: {
        en: "This is her cut-line-and-paint method in its simplest form. The two points where the graphs meet are the only places the answer can change from true to false, so cut a vertical line through each of them and the whole x-axis is divided into three stretches. Then just look: to the left of x = 2 the parabola is below the dashed line, between 2 and 4 it arches above it, and to the right of 4 it drops below again. So the answer is the middle stretch. Write the x-values in order, smallest first, with x in the middle — “2 &lt; x &lt; 4” rather than “x &gt; 2 and x &lt; 4”. And check the ends against the sign in the question: a strict &gt; means open ends.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — READ IT OFF, THEN PROVE IT (the one card with a grid).
   f(x) = x² − 4 and g(x) = x + 2 cut at A(−2 ; 0) and B(3 ; 5).
   The grid is here ON PURPOSE: part (a)'s whole job is reading the two
   x-values off the picture, which is impossible without one — and it
   leaks nothing, because (b) is the part that has to prove them.
   --------------------------------------------------------------- */
const Q4_F = { kind: "parabola", a: 1, b: 0, c: -4, tone: "a", label: "f", labelAt: 3.4 };
const Q4_G = { kind: "line", a: 1, q: 2, tone: "b", label: "g", labelAt: 5.4 };
const Q4_A = { x: -2, y: 0, on: [0, 1], label: "A(−2 ; 0)", place: "aboveLeft" };
const Q4_B = { x: 3, y: 5, on: [0, 1], label: "B(3 ; 5)", place: "aboveLeft" };
const Q4_CUTS = [{ x: -2, label: "x = −2" }, { x: 3, label: "x = 3" }];
const Q4_DIAGRAM = {
  spec: {
    type: "function",
    grid: true,
    win: { xmin: -5, xmax: 6, ymin: -6, ymax: 10 },
    curves: [Q4_F, Q4_G],
  },
  parts: {
    a: { question: {}, reveal: { vlines: Q4_CUTS } },
    b: { question: {}, reveal: { vlines: Q4_CUTS, points: [Q4_A, Q4_B] } },
  },
};

const q4 = {
  id: "func.sib.int.q4",
  chapter: CH,
  topic: "intersection",
  archetype: "read-the-intersections-off-the-graph-then-confirm-them-algebraically",
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
        en: "The sketch shows &nbsp;f(x) = x² − 4&nbsp; and&nbsp; g(x) = x + 2&nbsp; drawn on the same grid. They cut each other at A and B.<br><br>Use the sketch to write down the values of x for which &nbsp;f(x) = g(x).",
      },
      hint: {
        en: "f(x) = g(x) happens exactly where the two graphs touch each other. Find those two places on the grid and read straight down to the x-axis.",
      },
      memo: [
        { type: "step", text: { en: "The graphs cross in two places. Read each one down to the x-axis:" } },
        { type: "answer", text: { en: "x = −2" }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 3" }, ticks: ["a"] },
      ],
      esplain: {
        en: "“f(x) = g(x)” is a sentence about heights: it asks where the two graphs are at the same height at the same x. On a picture that is exactly where they touch, so the answer is sitting there to be read. Find each crossing, run your eye straight down to the x-axis, and write the value down. Two things worth noticing. The answer is a list of x-VALUES, not points, because that is what the question asked for — the y's belong to a different question. And reading off is only trustworthy when the crossings land on grid lines, as they do here; when they do not, the picture can only tell you roughly, which is exactly why the next part exists.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Confirm your answer to (a) algebraically, and hence write down the coordinates of A and B.",
      },
      hint: {
        en: "Set the two expressions equal, bring everything to one side, and factorise. Your two answers should be exactly the ones you read off the picture — if they are not, one of the two is wrong and it is worth finding out which.",
      },
      memo: [
        { type: "step", text: { en: "Put &nbsp;f(x) = g(x):&nbsp; x² − 4 = x + 2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x² − x − 6 = 0 &nbsp;⟹&nbsp; (x − 3)(x + 2) = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "x = 3&nbsp; or&nbsp; x = −2 &nbsp;&nbsp;— the same two values read off in (a)" }, ticks: ["a"] },
        { type: "answer", text: { en: "heights from the line: &nbsp;g(−2) = 0&nbsp; and&nbsp; g(3) = 5 &nbsp;&nbsp;∴&nbsp; A(−2 ; 0)&nbsp; and&nbsp; B(3 ; 5)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: a picture is evidence, not proof. In a paper, “confirm algebraically” means the marks are for the equation and the factorising — an answer that only says “I read it off the graph” scores nothing here.",
        } },
      ],
      esplain: {
        en: "This part exists to show you that the two methods are the same idea wearing different clothes. Reading off asks where the graphs touch; solving asks which x makes the two expressions equal. They must agree, and when they do you can trust both. The algebra is the ordinary routine: equate, collect everything on one side so it reads “= 0”, factorise, and set each bracket to zero. Then finish the job the picture started by getting the heights, using the straight line because it is less work. Keep the habit of checking your algebra against the sketch even when a question does not ask you to. A quadratic that gives x = 3 and x = 7 when the picture clearly shows a crossing left of the y-axis is telling you about a sign slip, immediately, for free.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — A LINE CUTS A HYPERBOLA (× the bracket ⟹ a quadratic), and
   the midpoint that turns out to be the corner (her p10).
   h(x) = 8/(x − 1) + 3, asymptotes x = 1 and y = 3 (both GIVEN and
   captioned); g(x) = 2x + 1.
     8/(x − 1) + 3 = 2x + 1, × (x − 1):
       8 + 3(x − 1) = (2x + 1)(x − 1) ⟹ 2x² − 4x − 6 = 0 ⟹ x² − 2x − 3 = 0
       (x − 3)(x + 1) = 0 ⟹ x = 3 or x = −1
     P(−1 ; −1) and Q(3 ; 7); midpoint (1 ; 3) — the corner itself,
     because g passes through it.
   THE WINDOW IS DELIBERATELY WIDE AND SHORT. All three labelled points
   sit where h and g cross (or where g crosses the asymptotes), so two
   strokes run through each of them; the engine's label placer only ever
   clears a stroke that is steep enough in PIXELS, and a wide, short
   window is what makes these lines steep. The first draft used a tall
   window and every one of the three coordinate labels came out with a
   line ruled through it.
   --------------------------------------------------------------- */
const Q5_H = { kind: "hyperbola", a: 8, p: 1, q: 3, tone: "a", label: "h", labelAt: 5.6 };
const Q5_G = { kind: "line", a: 2, q: 1, tone: "b", label: "g", labelAt: 4.4 };
const Q5_P = { x: -1, y: -1, on: [0, 1], label: "P(−1 ; −1)", place: "left" };
const Q5_Q = { x: 3, y: 7, on: [0, 1], label: "Q(3 ; 7)", place: "right" };
const Q5_M = { x: 1, y: 3, on: 1, label: "M(1 ; 3)", place: "belowRight" };
const Q5_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -7, xmax: 9, ymin: -3, ymax: 11 },
    curves: [Q5_H, Q5_G],
    asymptotes: [{ x: 1, of: 0, label: "x = 1" }, { y: 3, of: 0, label: "y = 3" }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q5_P, Q5_Q] } },
    b: { question: { points: [Q5_P, Q5_Q] }, reveal: { points: [Q5_P, Q5_Q, Q5_M] } },
  },
};

const q5 = {
  id: "func.sib.int.q5",
  chapter: CH,
  topic: "intersection",
  archetype: "line-cuts-a-hyperbola-multiply-out-to-a-quadratic-then-the-midpoint",
  paper: PAPER,
  diagram: Q5_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 3,
      prompt: {
        en: "The sketch shows the hyperbola h, defined by &nbsp;h(x) = 8/(x − 1) + 3, &nbsp;with its asymptotes &nbsp;x = 1&nbsp; and&nbsp; y = 3&nbsp; drawn dashed, and the straight line g, defined by &nbsp;g(x) = 2x + 1. &nbsp;They cut each other at P and Q.<br><br>Determine the coordinates of P and Q.",
      },
      hint: {
        en: "Put the two equations equal, then get rid of the fraction by multiplying EVERY term by (x − 1). What is left is an ordinary quadratic — tidy it up and factorise.",
      },
      memo: [
        { type: "step", text: { en: "At P and Q the heights are equal, so put &nbsp;h(x) = g(x):" }, ticks: ["s/f"] },
        { type: "step", text: { en: "8/(x − 1) + 3 = 2x + 1, &nbsp;&nbsp;× (x − 1) &nbsp;on every term: &nbsp;8 + 3(x − 1) = (2x + 1)(x − 1)" }, ticks: ["ca"] },
        { type: "step", text: { en: "3x + 5 = 2x² − x − 1 &nbsp;⟹&nbsp; 2x² − 4x − 6 = 0 &nbsp;⟹&nbsp; x² − 2x − 3 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(x − 3)(x + 1) = 0 &nbsp;⟹&nbsp; x = 3&nbsp; or&nbsp; x = −1 &nbsp;&nbsp;(neither is 1, so both are allowed)" }, ticks: ["a"] },
        { type: "answer", text: { en: "heights from the line: &nbsp;g(−1) = −1&nbsp; and&nbsp; g(3) = 7 &nbsp;&nbsp;∴&nbsp; P(−1 ; −1)&nbsp; and&nbsp; Q(3 ; 7)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: multiply EVERY term by (x − 1), including the lonely + 3 and both terms of the line. Multiplying only the fraction is the mistake that turns this into an equation that does not factorise. And divide the whole quadratic by 2 before factorising — it makes the brackets obvious.",
        } },
      ],
      esplain: {
        en: "A hyperbola meeting a line is the one intersection question where a fraction gets in the way, and the fix is the same as in any fraction equation: multiply every single term by the bottom. The bracket (x − 1) cancels the fraction and multiplies out everything else, and what falls out is an ordinary quadratic — which is why this question really belongs to both chapters at once. Two habits keep it clean. Multiply the WHOLE of both sides, not just the piece with the fraction, and use brackets while you do it. Then, before factorising, look for a common factor: dividing 2x² − 4x − 6 by 2 turns an awkward trinomial into a friendly one. Last, check that neither answer is the forbidden x-value, x = 1 — because the graph does not exist there, a root landing on it would have to be thrown away.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the coordinates of M, the midpoint of PQ.",
      },
      hint: {
        en: "The midpoint of two points is the average of their x-values and the average of their y-values. Work them out and then look at where your answer lands on the picture.",
      },
      memo: [
        { type: "step", text: { en: "M = ((x₁ + x₂)/2 ; (y₁ + y₂)/2) = ((−1 + 3)/2 ; (−1 + 7)/2)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "M(1 ; 3) &nbsp;&nbsp;— which is exactly where the two asymptotes cross" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The arithmetic here is two averages, and it takes ten seconds. What is worth your attention is where the answer lands: M(1 ; 3) is the point where the asymptotes cross, the corner the whole hyperbola is built around. That is not luck. A hyperbola is symmetrical about its corner — turn the picture half a turn about that point and it lands on itself — so any straight line that passes THROUGH the corner must cut the two branches at two points the same distance out on either side. Check that g really does pass through it: g(1) = 2 + 1 = 3, yes. So the corner had to be the midpoint. It is a good fact to carry: if a line through a hyperbola's corner cuts one branch somewhere, you already know a lot about where it cuts the other.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — “HENCE, OR OTHERWISE, SOLVE f(x) &gt; g(x)” (her pp46–51: cut a
   line through every intersection, then paint each region).
   f(x) = x² − 2x − 3, g(x) = x + 1.
     f(x) = g(x) ⟹ x² − 3x − 4 = 0 ⟹ (x − 4)(x + 1) = 0
     A(−1 ; 0) and B(4 ; 5); f is above g outside the two crossings, so
     the answer is x &lt; −1 or x &gt; 4.
   The reveal paints BOTH outer strips — the answer made visible.
   --------------------------------------------------------------- */
const Q6_F = { kind: "parabola", a: 1, b: -2, c: -3, tone: "a", label: "f", labelAt: -2.4 };
const Q6_G = { kind: "line", a: 1, q: 1, tone: "b", label: "g", labelAt: 6.5 };
const Q6_A = { x: -1, y: 0, on: [0, 1], label: "A(−1 ; 0)", place: "aboveLeft" };
const Q6_B = { x: 4, y: 5, on: [0, 1], label: "B(4 ; 5)", place: "aboveLeft" };
const Q6_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 7, ymin: -7, ymax: 10 },
    curves: [Q6_F, Q6_G],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q6_A, Q6_B] } },
    b: {
      question: { points: [Q6_A, Q6_B] },
      reveal: {
        points: [Q6_A, Q6_B],
        vlines: [{ x: -1, label: "x = −1" }, { x: 4, label: "x = 4" }],
        shades: [{ x0: -4, x1: -1 }, { x0: 4, x1: 7 }],
      },
    },
  },
};

const q6 = {
  id: "func.sib.int.q6",
  chapter: CH,
  topic: "intersection",
  archetype: "intersections-then-hence-or-otherwise-solve-f-greater-than-g",
  paper: PAPER,
  diagram: Q6_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 2x − 3, &nbsp;and the straight line g, defined by &nbsp;g(x) = x + 1. &nbsp;They cut each other at A and B.<br><br>Determine the coordinates of A and B.",
      },
      hint: {
        en: "Set the two expressions equal to each other, bring everything to one side so it reads “= 0”, and factorise. Then find each height from the line.",
      },
      memo: [
        { type: "step", text: { en: "At A and B the heights are equal, so put &nbsp;f(x) = g(x):&nbsp; x² − 2x − 3 = x + 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x² − 3x − 4 = 0 &nbsp;⟹&nbsp; (x − 4)(x + 1) = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "x = 4&nbsp; or&nbsp; x = −1" }, ticks: ["a"] },
        { type: "answer", text: { en: "heights from the line: &nbsp;g(−1) = 0&nbsp; and&nbsp; g(4) = 5 &nbsp;&nbsp;∴&nbsp; A(−1 ; 0)&nbsp; and&nbsp; B(4 ; 5)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The routine is now familiar and it is worth being able to do it without thinking, because the interesting part of the question is always what comes after. Equate the two expressions, collect everything on one side, factorise, solve, then substitute back for the heights. The only decision is which equation to substitute into, and the answer is always the simpler one — the straight line. Write the points in left-to-right order as the sketch shows them, A first at x = −1 and B second at x = 4. That ordering is what makes the next part readable: an inequality answer is a statement about stretches of the x-axis, and stretches are much easier to describe when your two boundary numbers are already in order.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence, or otherwise, solve for x: &nbsp;f(x) &gt; g(x).",
      },
      hint: {
        en: "Cut a vertical line down through each of A and B. That splits the x-axis into three stretches — now look at each stretch and ask which graph is drawn on top there.",
      },
      memo: [
        { type: "step", text: { en: "Cut a line through every intersection: &nbsp;x = −1&nbsp; and&nbsp; x = 4. That leaves three stretches to look at." }, ticks: ["ca"] },
        { type: "step", text: { en: "Left of −1 the parabola is drawn ABOVE the line; between −1 and 4 it is below; right of 4 it is above again." }, ticks: ["ca"] },
        { type: "answer", text: { en: "x &lt; −1 &nbsp;or&nbsp; x &gt; 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the answer is TWO separate stretches, joined by the word “or”. Writing −1 &gt; x &gt; 4 says a single stretch and is impossible — no number is both less than −1 and more than 4.",
        } },
      ],
      esplain: {
        en: "“f(x) &gt; g(x)” asks where the first graph is drawn higher than the second, so the answer is always a set of x-values, never a set of points. Her method turns it into looking rather than algebra. The only places the answer can flip from true to false are the places the graphs cross, so cut a vertical line down through each of them; here that leaves three stretches. Then read the picture stretch by stretch: outside the two crossings the parabola has climbed above the line, and between them it has dipped underneath. So the answer is the two outer stretches, joined by “or”, with open ends because a strict &gt; excludes the crossings themselves, where the two graphs are equal rather than one being bigger. Say the answer out loud as a sentence and it will not come out backwards.",
      },
    },
  ],
};

export const funcIntersectionSiblingQuestions = [q1, q2, q3, q4, q5, q6];
