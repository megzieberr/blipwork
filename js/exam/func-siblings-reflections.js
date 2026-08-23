/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill "reflections"
   (BUILD DAY, SESSION D2, 2026-08-23 — EXAM-BUILD-DAY.md's tile map
   gives Functions four NEW tiles; session D1 built three of them and
   this file builds the fourth.)
   ------------------------------------------------------------
   Six new cards on a tile that had none.

   WHY THIS TILE EXISTS. "Shift the graph" already holds two cards that
   touch a reflection in passing (func.sib.sh.q1(b) is −f(x) on a
   parabola, func.sib.sh.q3(b) is f(−x) on an exponential), but a
   reflection is its own move with its own rules — which coordinate
   changes sign, which asymptote moves, what happens to the range — and
   the Nov P1 papers ask it on its own, including the
   reflect-about-its-own-asymptote item the bank calls out. Nothing in
   the app drilled it.

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   Her pp19–24 (f(x ± k), f(x) ± k, −f(x), f(−x), k·f(x), then the
   reflection worked examples for parabola / hyperbola / exponential in
   both axes), with p10 for the hyperbola's asymptotes and p14 for
   "taking off / landing" and above-or-below the asymptote. The question
   TYPES and the METHODS are hers; every number here is fresh. None of
   the digest's four flagged slips is mined.

   ARCHETYPE SOURCES: GR11-IEB-PAPER-BANK.md's Paper 1 menu —
   "reflect-about-own-asymptote transformations" and the hyperbola/
   parabola battery of short read-offs; SURVEY-Nov-P1's reflection
   items (reflect about an asymptote → h; equation of p = reflection of
   h in the y-axis) and SURVEY-June's 4.6a/b (new coordinates of a
   point under y = −f(x) and y = f(−x)). Shapes only — fresh numbers,
   fresh graphs.

   WHAT THE SIX COVER, in the order they are listed in cards-func.js
   (which is already easiest-first, so the level sort leaves it alone):
     q1  PARABOLA in the x-AXIS — −f(x): the equation, the turning
         point, and the discovery that the x-intercepts do not move
     q2  PARABOLA in the y-AXIS — f(−x): the equation worked term by
         term, then the turning point and the intercepts mirrored
     q3  EXPONENTIAL in the y-AXIS — f(−x) turns "taking off" into
         "landing" and leaves the asymptote exactly where it was
     q4  HYPERBOLA about its OWN horizontal asymptote — the bank's
         reflect-g-about-y-=-q item, worked as "new y = 2q − old y"
     q5  EXPONENTIAL in the x-AXIS — the equation, then the RANGE it
         produces, then the double reflection −f(−x)
     q6  THE QUESTION BACKWARDS — two hyperbolas given, describe the
         reflection and write it in function notation

   THE SKETCH SHOWS THE ORIGINAL; THE REFLECTED GRAPH APPEARS ON THE
   REVEAL (the brief's rule for this tile, and the wider "the reveal
   draws what it found" rule in js/exam/_schema.js). Every base figure
   here draws the given graph alone with its own asymptotes captioned,
   and each part's reveal adds what that part produced — the new curve
   in tone "b", named, together with its own captioned asymptote where
   it has one, or the answer's points.

   TWO DELIBERATE EXCEPTIONS, both for the same reason as elsewhere in
   the chapter:
     · q4's base figure draws NO asymptotes and no grid, because (a) is
       the part that has to DERIVE them from the equation — the same
       discipline js/exam/func-hyperbola-and-exponential-2.js uses for
       its 3(a). They appear from (a)'s own reveal onward.
     · q6 draws BOTH graphs from the start, because both are given in
       its stem; what its reveals add is the fixed point on the mirror
       line and then g's own horizontal asymptote.

   LEVELS: 1–3 only, never 4 — this is a NORMAL tile and her ruling 5
   (EXAM-BUILD-DAY.md) keeps every ★ on the Level 4 tile.
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — PARABOLA REFLECTED IN THE x-AXIS (her pp19–24).
   f(x) = x² − 2x − 8, x-intercepts −2 and 4, TP(1 ; −9) — all three
   GIVEN in the stem, so all three are on the base figure.
     (a) g(x) = −f(x) = −x² + 2x + 8, TP(1 ; 9)
     (b) g cuts the x-axis at the SAME two points; its y-intercept is
         (0 ; 8), the sign-flip of f's own (0 ; −8)
   (b)'s figure is BARE (js/exam/function-diagram.js): the two
   x-intercepts it is asking for are already marked on the base as f's,
   and g runs through the very same two points — so leaving them on
   would hand (b) two of its three answers.
   --------------------------------------------------------------- */
const Q1_F = { kind: "parabola", a: 1, b: -2, c: -8 };
const Q1_G = { kind: "parabola", a: -1, b: 2, c: 8, tone: "b", label: "g", labelAt: -2.5 };
const Q1_XA = { x: -2, y: 0, on: 0, label: "(−2 ; 0)" };
const Q1_XB = { x: 4, y: 0, on: 0, label: "(4 ; 0)" };
const Q1_TP = { x: 1, y: -9, on: 0, label: "TP(1 ; −9)", place: "below" };
const Q1_G_TP = { x: 1, y: 9, on: 1, label: "TP(1 ; 9)", place: "above" };
const Q1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 6, ymin: -11, ymax: 11 },
    curves: [{ ...Q1_F, tone: "a", label: "f", labelAt: 5 }],
    points: [Q1_XA, Q1_XB, Q1_TP],
  },
  parts: {
    a: { question: {}, reveal: { curves: [Q1_G], points: [Q1_G_TP] } },
    b: {
      question: { bare: true, curves: [Q1_G] },
      reveal: {
        bare: true, curves: [Q1_G],
        points: [
          { x: -2, y: 0, on: 1, label: "(−2 ; 0)" },
          { x: 4, y: 0, on: 1, label: "(4 ; 0)" },
          { x: 0, y: 8, on: 1, label: "(0 ; 8)" },
        ],
      },
    },
  },
};

const q1 = {
  id: "func.sib.ref.q1",
  chapter: CH,
  topic: "reflections",
  archetype: "parabola-reflected-in-the-x-axis-equation-turning-point-and-intercepts",
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
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 2x − 8. &nbsp;It cuts the x-axis at (−2 ; 0) and (4 ; 0), and its turning point is TP(1 ; −9).<br><br>The graph of g is the reflection of f in the <b>x-axis</b>, so &nbsp;g(x) = −f(x). &nbsp;Write down the equation of g in the form &nbsp;y = ax² + bx + c, &nbsp;and the coordinates of its turning point.",
      },
      hint: {
        en: "The minus sits outside f, so it happens to the answer the machine gives, not to the x it is fed. Multiply the whole equation by −1 — every term, not just the first one — and then ask what that does to the turning point's height.",
      },
      memo: [
        { type: "step", text: { en: "−f(x) means multiply the <b>whole</b> equation by −1:" } },
        { type: "answer", text: { en: "g(x) = −(x² − 2x − 8) = −x² + 2x + 8" }, ticks: ["a"] },
        { type: "answer", text: { en: "a reflection in the x-axis keeps every x and flips every height, so the turning point keeps its 1 and swaps the sign of its −9 &nbsp;&nbsp;∴&nbsp; TP(1 ; 9)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the − 8 has to change sign as well. Writing −x² + 2x − 8 is the most common slip on this question — the minus belongs to every term inside the bracket, not only to the squared one.",
        } },
      ],
      esplain: {
        en: "A reflection in the x-axis is a mirror, and the x-axis is the mirror. Whatever height f reached at some x, g reaches the same distance the other side of the axis — a point that was 9 below lands 9 above, and a point that was 3 above lands 3 below. Two things follow without any algebra at all. First, the graph flips from happy to sad, because every arm that pointed up now points down. Second, the turning point keeps its x-coordinate and only swaps the sign of its y, because it is a point like any other. Nothing moves sideways, which is the whole difference between this and a shift. When you write the new equation, put brackets around the old one first and only then multiply through — that one habit stops the last term being forgotten.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Write down the coordinates of the points where g cuts the x-axis and the point where it cuts the y-axis.",
      },
      hint: {
        en: "Think about what the mirror does to a point that is already sitting ON the x-axis — how far does it move? Then work out g's y-intercept by putting x = 0 into the new equation.",
      },
      memo: [
        { type: "step", text: { en: "A reflection in the x-axis leaves every x alone and flips every y. A point on the x-axis has y = 0, and 0 flipped is still 0 — so an x-intercept cannot move." } },
        { type: "answer", text: { en: "g cuts the x-axis at (−2 ; 0) and (4 ; 0) — exactly the same two points as f" }, ticks: ["a"] },
        { type: "answer", text: { en: "the y-intercept does move: &nbsp;g(0) = −(0)² + 2(0) + 8 = 8 &nbsp;&nbsp;∴&nbsp; (0 ; 8)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the x-intercepts of −f(x) are always the same as the x-intercepts of f. If your two answers here came out as (2 ; 0) and (−4 ; 0), you have reflected in the wrong axis.",
        } },
      ],
      esplain: {
        en: "This part is really one question in disguise: which points does the mirror leave alone? A mirror always leaves the points ON it exactly where they are, and here the mirror is the x-axis — so every point of f that was already sitting on the x-axis stays put, and those points are the x-intercepts. That is why the roots of a parabola never change when you write −f(x): the graph turns upside down, but it still crosses in the same two places. The y-intercept is a different story, because it is not on the mirror. It sits 8 units below the x-axis on f, so it lands 8 units above on g. You can get it either by flipping the sign of f's y-intercept or by substituting x = 0 into the new equation, and doing both is a free check.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — PARABOLA REFLECTED IN THE y-AXIS (her pp19–24).
   f(x) = x² − 6x + 5, x-intercepts 1 and 5, TP(3 ; −4) — all GIVEN.
     (a) g(x) = f(−x) = x² + 6x + 5, worked term by term
     (b) TP(−3 ; −4); x-intercepts (−1 ; 0) and (−5 ; 0)
   (a)'s reveal draws g; (b)'s reveal marks g's three landmarks. The
   base points stay on (b)'s question side on purpose — they are f's,
   they were given in the stem, and the answers are their mirror
   images, which is exactly the reasoning the part is testing.
   --------------------------------------------------------------- */
const Q2_F = { kind: "parabola", a: 1, b: -6, c: 5 };
const Q2_G = { kind: "parabola", a: 1, b: 6, c: 5, tone: "b", label: "g", labelAt: -6 };
const Q2_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -8, xmax: 8, ymin: -6, ymax: 9 },
    curves: [{ ...Q2_F, tone: "a", label: "f", labelAt: 6 }],
    points: [
      { x: 1, y: 0, on: 0, label: "(1 ; 0)" },
      { x: 5, y: 0, on: 0, label: "(5 ; 0)" },
      { x: 3, y: -4, on: 0, label: "TP(3 ; −4)", place: "below" },
    ],
  },
  parts: {
    a: { question: {}, reveal: { curves: [Q2_G] } },
    b: {
      question: { curves: [Q2_G] },
      reveal: {
        curves: [Q2_G],
        points: [
          { x: -1, y: 0, on: 1, label: "(−1 ; 0)" },
          { x: -5, y: 0, on: 1, label: "(−5 ; 0)" },
          { x: -3, y: -4, on: 1, label: "TP(−3 ; −4)", place: "below" },
        ],
      },
    },
  },
};

const q2 = {
  id: "func.sib.ref.q2",
  chapter: CH,
  topic: "reflections",
  archetype: "parabola-reflected-in-the-y-axis-in-function-notation",
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
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 6x + 5, &nbsp;with x-intercepts (1 ; 0) and (5 ; 0) and turning point TP(3 ; −4).<br><br>The graph of g is the reflection of f in the <b>y-axis</b>, so &nbsp;g(x) = f(−x). &nbsp;Determine the equation of g in the form &nbsp;y = ax² + bx + c.",
      },
      hint: {
        en: "The minus is inside f this time, so it acts on the x before the machine starts. Write −x into every x slot — brackets and all — and then tidy up one term at a time.",
      },
      memo: [
        { type: "step", text: { en: "g(x) = f(−x) means: wherever f has an x, write −x instead." }, ticks: ["s/f"] },
        { type: "step", text: { en: "g(x) = (−x)² − 6(−x) + 5 &nbsp;&nbsp;— and (−x)² = x², &nbsp;while &nbsp;−6 × (−x) = +6x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "g(x) = x² + 6x + 5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: only the ODD powers of x change sign. The x² term is untouched because a negative squared is positive, and the +5 has no x in it at all, so it stays exactly as it is. Only the middle term flips.",
        } },
      ],
      esplain: {
        en: "Function notation is an instruction sheet for the machine. g(x) = f(−x) says: take the x you were handed, change its sign, and then run f on that. So the answer g gives at x = −3 is the answer f used to give at x = 3, and that is why the whole picture swings across the y-axis like a page turning. Doing the algebra is a matter of being literal: put the whole of −x into every x slot, keep the brackets while you do it, and only tidy up afterwards. Then check each term separately. The squared term cannot change, because squaring kills a minus. The plain-x term must change, because a minus times a minus is a plus. The constant has no x in it, so nothing can happen to it. That three-line check is quicker than re-doing the whole expansion, and it catches nearly every slip.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Write down the coordinates of the turning point of g and of the two points where g cuts the x-axis.",
      },
      hint: {
        en: "A mirror in the y-axis leaves every height alone. So write down f's landmarks and change only one of the two numbers in each pair.",
      },
      memo: [
        { type: "step", text: { en: "A reflection in the y-axis keeps every HEIGHT and flips every x-coordinate: &nbsp;(x ; y) &nbsp;→&nbsp; (−x ; y)." } },
        { type: "answer", text: { en: "TP(3 ; −4) &nbsp;→&nbsp; TP(−3 ; −4)" }, ticks: ["a"] },
        { type: "answer", text: { en: "(1 ; 0) &nbsp;→&nbsp; (−1 ; 0) &nbsp;and&nbsp; (5 ; 0) &nbsp;→&nbsp; (−5 ; 0)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Once you know which mirror you are using, this part needs no working at all. A reflection in the y-axis sends every point (x ; y) to (−x ; y): the height is untouched, only the side changes. So f's turning point, four units below the axis and three to the right, becomes a turning point four units below the axis and three to the left. Same for the two roots. A useful check is to read the new equation instead: g(x) = x² + 6x + 5 factorises as (x + 1)(x + 5), which gives roots at −1 and −5, and its axis of symmetry sits at x = −b/(2a) = −3. Getting the same answers two different ways is the cheapest confidence there is, and it takes about twenty seconds.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — EXPONENTIAL REFLECTED IN THE y-AXIS (her pp19–24 with p14).
   f(x) = 2·3ˣ − 6, asymptote y = −6, y-intercept (0 ; −4),
   x-intercept (1 ; 0) — all GIVEN and all captioned.
     (a) g(x) = f(−x) = 2(1/3)ˣ − 6 — taking off becomes landing
     (b) the asymptote does NOT move (y = −6); the x-intercept swings
         across to (−1 ; 0)
   --------------------------------------------------------------- */
const Q3_F = { kind: "exp", a: 2, b: 3, p: 0, q: -6 };
const Q3_G = { kind: "exp", a: 2, b: 1 / 3, p: 0, q: -6, tone: "b", label: "g", labelAt: -1.6 };
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 4, ymin: -8, ymax: 12 },
    curves: [{ ...Q3_F, tone: "a", label: "f", labelAt: 1.6 }],
    asymptotes: [{ y: -6, of: 0, label: "y = −6" }],
    points: [
      { x: 0, y: -4, on: 0, label: "(0 ; −4)" },
      { x: 1, y: 0, on: 0, label: "(1 ; 0)" },
    ],
  },
  parts: {
    a: { question: {}, reveal: { curves: [Q3_G] } },
    b: {
      question: { curves: [Q3_G] },
      reveal: { curves: [Q3_G], points: [{ x: -1, y: 0, on: 1, label: "(−1 ; 0)" }] },
    },
  },
};

const q3 = {
  id: "func.sib.ref.q3",
  chapter: CH,
  topic: "reflections",
  archetype: "exponential-reflected-in-the-y-axis-growth-becomes-decay",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn6" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The sketch shows the exponential graph f, defined by &nbsp;f(x) = 2·3ˣ − 6. &nbsp;Its asymptote is the dashed line y = −6, it cuts the y-axis at (0 ; −4) and the x-axis at (1 ; 0).<br><br>The graph of g is the reflection of f in the <b>y-axis</b>, so &nbsp;g(x) = f(−x). &nbsp;Determine the equation of g in the form &nbsp;y = a·b<sup>x</sup> + q.",
      },
      hint: {
        en: "The minus is inside f, and only the x feels it, so it lands in the exponent. Then remember what a negative exponent does to a base — it turns it upside down.",
      },
      memo: [
        { type: "step", text: { en: "g(x) = f(−x) means: wherever f has an x, write −x instead." }, ticks: ["s/f"] },
        { type: "step", text: { en: "g(x) = 2·3<sup>−x</sup> − 6, &nbsp;and a negative exponent flips the base: &nbsp;3<sup>−x</sup> = (1/3)ˣ" }, ticks: ["ca"] },
        { type: "answer", text: { en: "g(x) = 2(1/3)ˣ − 6 &nbsp;&nbsp;— the base is now between 0 and 1, so g is <b>landing</b> where f was <b>taking off</b>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The base of an exponential is the whole personality of the graph. A base bigger than 1 means the graph is taking off — it climbs as you read to the right. A base between 0 and 1 means it is landing — it falls as you read to the right, flattening towards its asymptote. Reflecting in the y-axis swaps left for right, so of course it swaps taking off for landing; the picture does the same thing, just the other way round. The algebra says the same thing in one line. Writing 3 to the power −x looks unfamiliar, but a negative exponent means one over the thing, and one over 3 is a third — so the equation lands neatly in the standard form with a base of a third. The 2 in front never enters the conversation: it decides how far the curve sits from its asymptote, and a mirror does not stretch anything.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Write down the equation of the asymptote of g and the coordinates of the point where g cuts the x-axis.",
      },
      hint: {
        en: "An asymptote is a statement about HEIGHTS. Ask yourself whether this mirror changed any heights at all.",
      },
      memo: [
        { type: "step", text: { en: "A reflection in the y-axis flips x-coordinates and leaves heights alone." } },
        { type: "answer", text: { en: "the asymptote is about height, so it does not move: &nbsp;y = −6" }, ticks: ["a"] },
        { type: "answer", text: { en: "f cuts the x-axis at (1 ; 0), so g cuts it at the mirror image &nbsp;(−1 ; 0)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: f(−x) is a mirror in the y-AXIS, so only the x-coordinates change sign. The − 6 on the end never moves, which is exactly why the asymptote stays where it is.",
        } },
      ],
      esplain: {
        en: "Keep the two exponential reflections apart by asking where the minus is sitting. A minus OUTSIDE, −f(x), flips the answers, so the whole graph turns over the x-axis and the asymptote goes with it. A minus INSIDE, f(−x), flips the inputs, so the graph swings over the y-axis while every height stays exactly as it was — and an asymptote is nothing but a height the graph creeps towards, so it cannot budge. That is the one sentence worth memorising here. The x-intercept is the opposite case: it is a statement about which x, so it does move, straight across to the other side, keeping its y of 0. You can check it in the new equation if you like: 2(1/3)ˣ − 6 = 0 gives (1/3)ˣ = 3, which is true at x = −1.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — HYPERBOLA REFLECTED ABOUT ITS OWN HORIZONTAL ASYMPTOTE.
   (Her pp10 and pp19–24; GR11-IEB-PAPER-BANK.md's Paper 1 menu,
   "reflect-about-own-asymptote transformations".)
   g(x) = 6/(x − 2) + 3, asymptotes x = 2 and y = 3.
     (a) the asymptotes, DERIVED from the equation
     (b) h = the reflection of g about y = 3, so h(x) = 6 − g(x),
         which tidies to h(x) = −6/(x − 2) + 3 — only the a changed
   THE BASE FIGURE DRAWS NO ASYMPTOTES AND NO GRID, because (a) is the
   part that has to derive them (the same discipline
   js/exam/func-hyperbola-and-exponential-2.js uses on its own 3(a) —
   an accurately-plotted curve on a gridded, dashed-guide-line figure
   hands the answer over). They appear from (a)'s reveal onward,
   captioned, together with the centre they cross at.
   --------------------------------------------------------------- */
const Q4_G = { kind: "hyperbola", a: 6, p: 2, q: 3 };
const Q4_H = { kind: "hyperbola", a: -6, p: 2, q: 3, tone: "b", label: "h", labelAt: 5 };
const Q4_ASYM = [{ x: 2, of: 0, label: "x = 2" }, { y: 3, of: 0, label: "y = 3" }];
const Q4_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -5, xmax: 9, ymin: -4, ymax: 10 },
    curves: [{ ...Q4_G, tone: "a", label: "g", labelAt: 5 }],
  },
  parts: {
    a: { question: {}, reveal: { asymptotes: Q4_ASYM, points: [{ x: 2, y: 3, label: "(2 ; 3)" }] } },
    b: { question: { asymptotes: Q4_ASYM }, reveal: { asymptotes: Q4_ASYM, curves: [Q4_H] } },
  },
};

const q4 = {
  id: "func.sib.ref.q4",
  chapter: CH,
  topic: "reflections",
  archetype: "hyperbola-reflected-about-its-own-horizontal-asymptote",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn6" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "The sketch shows the hyperbola g, defined by &nbsp;g(x) = 6/(x − 2) + 3.<br><br>Write down the equations of the two asymptotes of g.",
      },
      hint: {
        en: "Read the equation against the standard shape &nbsp;y = a/(x − p) + q. One asymptote is the x the fraction cannot cope with; the other is the number sitting on the end.",
      },
      memo: [
        { type: "step", text: { en: "In &nbsp;y = a/(x − p) + q&nbsp; the vertical asymptote is x = p and the horizontal one is y = q." } },
        { type: "answer", text: { en: "the denominator x − 2 is zero at x = 2, and dividing by zero is impossible &nbsp;&nbsp;∴&nbsp; x = 2" }, ticks: ["a"] },
        { type: "answer", text: { en: "the number on the end is 3, and the fraction shrinks towards zero as x runs away &nbsp;&nbsp;∴&nbsp; y = 3" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A hyperbola is easiest to think about as a corner rather than a curve: two invisible lines cross at one point, and the two branches wrap around that corner. Finding the corner is the whole of this question. The vertical line comes from the one x the equation cannot survive — put x = 2 into the denominator and you are dividing by zero, which is why the graph shoots away instead of crossing there. The horizontal line comes from the far ends. Push x out to a thousand and the fraction 6 over 998 is almost nothing, so the height is almost exactly 3; push x out to minus a thousand and the same thing happens from below. So the graph creeps towards y = 3 forever without ever arriving. Write the equation in the standard form and both numbers are simply sitting there waiting to be read.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "The graph of h is the reflection of g about its own <b>horizontal asymptote</b>. Determine the equation of h.",
      },
      hint: {
        en: "The mirror is the line y = 3, not the x-axis. A point 5 above that line has to land 5 below it — write that as a rule for the new height in terms of the old one, then use it on the whole equation.",
      },
      memo: [
        { type: "step", text: { en: "The mirror is the line y = 3. Every point keeps its x, and its distance from y = 3 flips over:" } },
        { type: "step", text: { en: "new y = 3 − (old y − 3) = 6 − old y &nbsp;&nbsp;∴&nbsp; h(x) = 6 − g(x)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "h(x) = 6 − (6/(x − 2) + 3) = 6 − 6/(x − 2) − 3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "h(x) = −6/(x − 2) + 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: only the number on TOP of the fraction changed sign — 6 became −6. Both asymptotes stay exactly where they were: the horizontal one because you reflected IN it, and the vertical one because no x was touched. If your answer moved an asymptote, something has gone wrong.",
        } },
      ],
      esplain: {
        en: "Reflecting in the x-axis is the case everyone practises, and it is the special case where the mirror happens to be at height zero. Here the mirror sits at height 3, so the rule has to be adjusted, and the safest way is to think in distances rather than signs. A point that is 5 units above the mirror must end up 5 units below it, so its new height is 3 minus 5, which is −2. Turn that sentence into algebra and you get new y = 3 − (old y − 3), which simplifies to 6 minus the old height. Now apply it to the whole function, not to one point, and simplify. What comes out is beautifully tidy: only the a on top has changed sign, and the two asymptotes are untouched. That makes sense once you picture it — the branches simply swap corners, from the top-right and bottom-left pair to the top-left and bottom-right pair, around the very same crossing point.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — EXPONENTIAL IN THE x-AXIS, THE RANGE, THEN BOTH MIRRORS.
   (Her pp14 and pp19–24, plus the range work on pp15–17.)
   f(x) = 2ˣ − 8, asymptote y = −8, (0 ; −7) and (3 ; 0) GIVEN.
     (a) g(x) = −f(x) = −2ˣ + 8, asymptote y = 8
     (b) range of g: y < 8
     (c) p(x) = −f(−x) = −(1/2)ˣ + 8, range y < 8 as well
   (c) gets its OWN spec — f alone — because three exponential curves
   on one picture is a thicket, and (c) only ever needs f.
   --------------------------------------------------------------- */
const Q5_F = { kind: "exp", a: 1, b: 2, p: 0, q: -8 };
const Q5_G = { kind: "exp", a: -1, b: 2, p: 0, q: 8, tone: "b", label: "g", labelAt: 3.8 };
const Q5_P = { kind: "exp", a: -1, b: 0.5, p: 0, q: 8, tone: "b", label: "p", labelAt: -2 };
const Q5_BASE = {
  type: "function",
  win: { xmin: -4, xmax: 5, ymin: -10, ymax: 11 },
  curves: [{ ...Q5_F, tone: "a", label: "f", labelAt: 3.8 }],
  asymptotes: [{ y: -8, of: 0, label: "y = −8" }],
  points: [
    { x: 0, y: -7, on: 0, label: "(0 ; −7)" },
    { x: 3, y: 0, on: 0, label: "(3 ; 0)" },
  ],
};
const Q5_C_SPEC = {
  type: "function",
  win: { xmin: -5, xmax: 5, ymin: -10, ymax: 11 },
  curves: [{ ...Q5_F, tone: "a", label: "f", labelAt: 3.8 }],
  asymptotes: [{ y: -8, of: 0, label: "y = −8" }],
};
const Q5_DIAGRAM = {
  spec: Q5_BASE,
  parts: {
    a: { question: {}, reveal: { curves: [Q5_G], asymptotes: [{ y: 8, of: 1, label: "y = 8" }] } },
    b: {
      question: { curves: [Q5_G], asymptotes: [{ y: 8, of: 1, label: "y = 8" }] },
      reveal: { curves: [Q5_G], asymptotes: [{ y: 8, of: 1, label: "y = 8" }] },
    },
    c: {
      spec: Q5_C_SPEC,
      question: {},
      reveal: { curves: [Q5_P], asymptotes: [{ y: 8, of: 1, label: "y = 8" }] },
    },
  },
};

const q5 = {
  id: "func.sib.ref.q5",
  chapter: CH,
  topic: "reflections",
  archetype: "exponential-reflected-in-the-x-axis-then-both-mirrors-with-ranges",
  paper: PAPER,
  diagram: Q5_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn6" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the exponential graph f, defined by &nbsp;f(x) = 2ˣ − 8. &nbsp;Its asymptote is the dashed line y = −8, and it cuts the y-axis at (0 ; −7) and the x-axis at (3 ; 0).<br><br>The graph of g is defined by &nbsp;g(x) = −f(x). &nbsp;Write down the equation of g and the equation of its asymptote.",
      },
      hint: {
        en: "The minus is outside f, so the whole picture turns over the x-axis — and the asymptote is part of the picture, so it turns over too.",
      },
      memo: [
        { type: "step", text: { en: "−f(x) means multiply the whole equation by −1:" } },
        { type: "answer", text: { en: "g(x) = −(2ˣ − 8) = −2ˣ + 8" }, ticks: ["a"] },
        { type: "answer", text: { en: "the asymptote flips with the graph: &nbsp;y = −8 &nbsp;becomes&nbsp; y = 8" }, ticks: ["a"] },
      ],
      esplain: {
        en: "An exponential graph flattens out towards one horizontal line and never quite reaches it, and that line is the number sitting on the end of the equation. So the quickest way to handle a reflection in the x-axis is to stop looking at the curve and look at that number: −8 becomes 8, and there is both the new equation and the new asymptote. What has actually happened to the picture is worth saying out loud, though. f sits ABOVE its asymptote and takes off upwards; g sits BELOW its asymptote and dives downwards, because every height has been turned over. The base is still 2, so the graph is still doing its exponential thing at exactly the same rate — a mirror never changes the shape, only which way up it is.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Write down the range of g.",
      },
      hint: {
        en: "Range is a statement about y. Ask which side of its asymptote g lives on, and whether it ever actually reaches it.",
      },
      memo: [
        { type: "step", text: { en: "f sits ABOVE its asymptote, so after the flip g sits BELOW its own asymptote y = 8." }, ticks: ["ca"] },
        { type: "answer", text: { en: "g gets closer and closer to 8 but never reaches it, and every height under 8 is reachable &nbsp;&nbsp;∴&nbsp; y &lt; 8" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: no equals sign. y ≤ 8 would claim the graph actually touches its asymptote, and it never does. And the range must be written in y — writing x &lt; 8 scores nothing.",
        } },
      ],
      esplain: {
        en: "Range means: which heights does this graph actually reach? For an exponential the answer is always \"everything on one side of the asymptote\", and the only two decisions are which side and whether the boundary is included. Which side comes from the sign of a — a positive a puts the graph above its asymptote, a negative a puts it below — and here a is −1, so g lives below y = 8. Whether the boundary is included is the easy half: never. The whole point of an asymptote is that the graph creeps towards it forever, so it can get to 7,9999 and closer, but 8 itself is out of reach. That is why the answer is a strict inequality. Notice too that f's own range is y > −8 for exactly the same reasons the other way up, so the flip turns the inequality sign around as well as the number.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 3,
      prompt: {
        en: "The graph of p is defined by &nbsp;p(x) = −f(−x). &nbsp;Determine the equation of p and write down its range.",
      },
      hint: {
        en: "Two mirrors, one after the other. Do the inside one first — replace x by −x and flip the base — then multiply the whole thing by −1.",
      },
      memo: [
        { type: "step", text: { en: "First the INSIDE minus: &nbsp;f(−x) = 2<sup>−x</sup> − 8 = (1/2)ˣ − 8" } },
        { type: "answer", text: { en: "then the OUTSIDE minus: &nbsp;p(x) = −((1/2)ˣ − 8) = −(1/2)ˣ + 8" }, ticks: ["a"] },
        { type: "answer", text: { en: "p sits below the asymptote y = 8 and never reaches it &nbsp;&nbsp;∴&nbsp; range: y &lt; 8" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the y-axis mirror cannot change a range, because it never touches a single height. So p has exactly the same range as g — all the range work was done by the minus on the OUTSIDE.",
        } },
      ],
      esplain: {
        en: "Two reflections in one instruction looks alarming, so take them one at a time and in the order the notation gives them. The inner −x is applied to the input, so it happens first: it turns 2 to the x into 2 to the −x, which is a half to the x, and the graph swings over the y-axis so that landing replaces taking off. The outer minus is applied to the answer, so it happens second: it turns every height over, which drags the asymptote from −8 up to 8 and puts the graph underneath it. Now the range. A mirror in the y-axis rearranges which x gives which height, but it never invents a new height or removes one, so it cannot change a range at all. Everything about the range came from the outer minus, which is why p and g share the answer y < 8 even though they are different-looking curves.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — THE QUESTION BACKWARDS (her pp19–24, read in reverse; the
   SURVEY-Nov-P1 "describe the transformation g → h" archetype).
   f(x) = 6/(x − 1) − 2 and g(x) = −6/(x − 1) + 2 are BOTH given and
   both drawn; f's asymptotes x = 1 and y = −2 are captioned.
     (a) the move is a reflection in the x-axis, g(x) = −f(x)
     (b) g's equation, and its asymptotes x = 1 (unmoved) and y = 2
   (a)'s reveal marks (4 ; 0) — the one point BOTH graphs pass through,
   because it is sitting on the mirror. (b)'s reveal adds only g's
   horizontal asymptote: its vertical one is the same line f already
   has, so drawing it twice would just thicken a line.

   WINDOW NOTE (crop review, 2026-08-23): the first draft used
   asymptotes at y = ±1, which left both branches hugging the x-axis at
   the right-hand edge, and the axis's own "x" letter had nowhere clean
   to sit — it landed on g. Asymptotes at y = ±2 open a two-unit
   corridor around the x-axis arrow, and moving the shared x-intercept
   out to x = 4 keeps its label clear of the O at the origin.
   --------------------------------------------------------------- */
const Q6_F = { kind: "hyperbola", a: 6, p: 1, q: -2 };
const Q6_G = { kind: "hyperbola", a: -6, p: 1, q: 2 };
const Q6_FIXED = { x: 4, y: 0, on: [0, 1], label: "(4 ; 0)" };
const Q6_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -6, xmax: 9, ymin: -7, ymax: 7 },
    curves: [
      { ...Q6_F, tone: "a", label: "f", labelAt: -4 },
      { ...Q6_G, tone: "b", label: "g", labelAt: -4 },
    ],
    asymptotes: [{ x: 1, of: 0, label: "x = 1" }, { y: -2, of: 0, label: "y = −2" }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q6_FIXED] } },
    b: {
      question: { points: [Q6_FIXED] },
      reveal: { points: [Q6_FIXED], asymptotes: [{ y: 2, of: 1, label: "y = 2" }] },
    },
  },
};

const q6 = {
  id: "func.sib.ref.q6",
  chapter: CH,
  topic: "reflections",
  archetype: "describe-the-reflection-that-maps-f-onto-g-then-write-it-in-function-notation",
  paper: PAPER,
  diagram: Q6_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn6" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "The sketch shows two hyperbolas. f is defined by &nbsp;f(x) = 6/(x − 1) − 2, &nbsp;and its asymptotes x = 1 and y = −2 are the dashed lines. g is the second graph.<br><br>Describe fully the single transformation that maps f onto g, and write that transformation in function notation.",
      },
      hint: {
        en: "Pick one landmark and follow it. The two graphs cross the x-axis at the same place, and everywhere else g is the same distance from the x-axis as f — but on the other side. What kind of move does that?",
      },
      memo: [
        { type: "step", text: { en: "Compare heights at the same x. Where f is 3 above the x-axis, g is 3 below it; where f is 5 below, g is 5 above. Nothing has moved sideways at all." } },
        { type: "answer", text: { en: "g is the <b>reflection of f in the x-axis</b>." }, ticks: ["a"] },
        { type: "answer", text: { en: "in function notation: &nbsp;g(x) = −f(x)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this is NOT a shift. A shift would carry the vertical asymptote sideways or the branches up as a whole, and here the branches have swapped corners around a fixed crossing point — that only happens with a mirror.",
        } },
      ],
      esplain: {
        en: "Reading a transformation backwards off a picture is a matter of choosing the right thing to look at. The whole curve is too much to hold in your head, so pick landmarks. Start with anything that has not moved: both graphs cut the x-axis at the same point, and both use the same vertical dashed line, so nothing has gone sideways — that rules out every horizontal move at once. Now look at heights. Above the x-axis f has a branch where g has none, and directly below it g has a branch where f has none, at matching distances. Points swapping to the opposite side of a line at equal distance is the definition of a mirror, and the line they are swapping across is the x-axis. Writing it in function notation is then just naming which minus you mean: outside f, because the heights changed and the inputs did not.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Write down the equation of g and the equations of both its asymptotes.",
      },
      hint: {
        en: "Use the notation you wrote in (a): multiply the whole of f's equation by −1. Then ask each asymptote separately whether a mirror in the x-axis could possibly move it.",
      },
      memo: [
        { type: "step", text: { en: "g(x) = −f(x), so multiply the whole equation by −1 — every term:" } },
        { type: "answer", text: { en: "g(x) = −(6/(x − 1) − 2) = −6/(x − 1) + 2" }, ticks: ["a"] },
        { type: "answer", text: { en: "the vertical asymptote cannot move, because no x was touched: &nbsp;x = 1" }, ticks: ["a"] },
        { type: "answer", text: { en: "the horizontal one flips over with the graph: &nbsp;y = −2 &nbsp;becomes&nbsp; y = 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the − 2 has to change sign too. Writing −6/(x − 1) − 2 keeps the graph's asymptote where f's was, which the sketch plainly contradicts — g's branches flatten out ABOVE the x-axis, not below.",
        } },
      ],
      esplain: {
        en: "Two habits make this part safe. The first is bracketing: write −(the whole of f) before you do anything else, so the minus has no chance of reaching only the first term. The second is answering the two asymptotes as two separate questions rather than one. A reflection in the x-axis changes heights and leaves inputs alone. The vertical asymptote is a statement about which x breaks the fraction, and no x changed, so it stays at −2. The horizontal asymptote is a statement about which height the branches settle towards, and every height was turned over, so −1 becomes 1. Finally, sanity-check against the drawing: g's two branches should now sit in the corners f's did not, wrapped around the same crossing point but the other way up. If your equation disagrees with the picture, trust the picture and hunt for the sign.",
      },
    },
  ],
};

export const funcReflectionsSiblingQuestions = [q1, q2, q3, q4, q5, q6];
