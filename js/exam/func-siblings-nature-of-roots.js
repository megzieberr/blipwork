/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill
   "nature-of-roots"
   (SESSION 2b of the four-session function-diagram build, 2026-08-22.)
   ------------------------------------------------------------
   Three new cards, taking this tile from three to six.

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   Her pp52–58: the Δ rules read against the number of intersections;
   f(x) = k as a horizontal line sliding up and down; g + k as a line
   sliding while it keeps its gradient; tangent = equal roots; and the
   "for which k does it not intersect" card. Types and methods hers,
   every number fresh. Her p54 f) — the digest's flagged slip #1, the
   sign error on "two real positive roots" — is NOT mined anywhere in
   this file, and neither is her p58 derivative.

   WHAT THE THREE COVER, and how each one stays clear of the three
   cards already on this tile:
     · func.lp.q1(e)     a HAPPY parabola, f(x) = k, NO real roots
     · func.hyp.t2q3(e)  a HYPERBOLA and y = −x + k, does not cut
     · func.gt.t1q5(c)   f(x) = t, two unequal POSITIVE roots

     q1  the same horizontal slide as lp.q1(e), but on a SAD parabola,
         and asked the other way round — the ceiling instead of the
         floor, equal roots first and then "no real roots" above it.
         The mirror image of a card she already has, on purpose.
     q2  the TWO-SIDED −c < k < c case, which the brief asks for, but
         built out of a ROTATING line y = kx through the origin rather
         than a sliding one — see the judgement call below.
     q3  tangent = equal roots on a parabola and a sliding line
         y = x + k, then Δ read backwards: cuts, touches or misses.

   ONE JUDGEMENT CALL, recorded for review. The brief asks for one
   two-sided −c < k < c answer. With a SLIDING line the discriminant is
   always LINEAR in k, so the answer can only ever be one-sided; the
   two-sided version needs either a hyperbola with a slanted line —
   which is exactly func.hyp.t2q3(e), the card the brief says not to
   repeat — or a line whose GRADIENT is the k. q2 takes the second
   road: y = kx through the origin against f(x) = x² + 1 gives
   Δ = k² − 4 and the clean symmetric answer −2 < k < 2. It is still
   her method end to end — set them equal, force Δ < 0, read the
   quadratic inequality — but the line rotates instead of sliding.

   THE SLIDING LINE IS ON THE QUESTION SIDE. Every base figure here
   draws the family's line dashed, at one illustrative position, named
   with its own letter still in it — "y = k", "y = kx", "y = x + k" —
   so the learner can see what is sliding or turning before being asked
   where it may sit. The ANSWER's boundary lines are dashed, captioned
   with their real equations, and appear only on the reveal, together
   with the point of contact where there is one
   (js/exam/_schema.js, "the reveal draws what it found").

   LEVELS: mostly 1–2, exactly one level 3 — q2(a), the only part that
   has to clear a quadratic in k and then solve a quadratic INEQUALITY
   in k on top of it. Nothing here is level 4.
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — f(x) = k ON A SAD PARABOLA (her pp52–58).
   f(x) = −x² + 4x + 5, x-intercepts −1 and 5, TP(2 ; 9) — a maximum,
   so the turning y-value is a CEILING.
     (a) equal roots   ⟹ k = 9   the line rests on the turning point
     (b) no real roots ⟹ k > 9   every line above the ceiling misses
   The turning point is what the learner has to FETCH — it is nowhere
   in the stem — so it never appears on a question side.
   --------------------------------------------------------------- */
const Q1_F = { kind: "parabola", a: -1, b: 4, c: 5 };
const Q1_XA = { x: -1, y: 0, on: 0, label: "(−1 ; 0)" };
const Q1_XB = { x: 5, y: 0, on: 0, label: "(5 ; 0)" };
const Q1_TP = { x: 2, y: 9, on: 0, label: "TP(2 ; 9)", place: "above" };
/* the boundary line: the one height at which y = k just rests on f */
const Q1_BOUND = { kind: "line", a: 0, q: 9, dash: true, tone: "b", label: "y = 9", labelAt: -3 };
/* one line ABOVE the ceiling, to show what "no real roots" looks like */
const Q1_MISS = { kind: "line", a: 0, q: 11, dash: true, tone: "c", label: "y = 11", labelAt: 5 };
const Q1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 7, ymin: -8, ymax: 13 },
    curves: [
      { ...Q1_F, tone: "a", label: "f", labelAt: 5.5 },
      // the sliding line, drawn at one illustrative height — NOT the answer
      { kind: "line", a: 0, q: 3, dash: true, tone: "c", label: "y = k", labelAt: 6.3 },
    ],
    points: [Q1_XA, Q1_XB],
  },
  parts: {
    // the two x-intercepts are already on the BASE spec, so a highlight
    // only ever ADDS the turning point — a repeat would draw them twice.
    a: { question: {}, reveal: { points: [Q1_TP], curves: [Q1_BOUND] } },
    b: { question: {}, reveal: { points: [Q1_TP], curves: [Q1_BOUND, Q1_MISS] } },
  },
};

const q1 = {
  id: "func.sib.nor.q1",
  chapter: CH,
  topic: "nature-of-roots",
  archetype: "horizontal-line-sliding-across-a-sad-parabola-equal-then-no-roots",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = −x² + 4x + 5, &nbsp;cutting the x-axis at (−1 ; 0) and (5 ; 0). The dashed line is &nbsp;y = k, &nbsp;drawn at one possible height — it may slide up and down.<br><br>Determine the value of k for which the equation &nbsp;f(x) = k&nbsp; will have equal roots.",
      },
      hint: {
        en: "The roots of f(x) = k are the places where the sliding line cuts the parabola. Picture it sliding upwards — there is exactly one height where two cuts become one.",
      },
      memo: [
        { type: "step", text: { en: "f(x) = k is the horizontal line y = k sliding across f, and the roots are where it cuts. Equal roots means the line touches f at exactly ONE point, which happens only at the turning point — so find it." } },
        { type: "step", text: { en: "x = −b/(2a) = −4/(2(−1)) = 2 &nbsp;&nbsp;⟹&nbsp;&nbsp; y = −(2)² + 4(2) + 5 = −4 + 8 + 5 = 9 &nbsp;&nbsp;TP(2 ; 9)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ k = 9" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: k is a HEIGHT, so it is the y of the turning point, not the x. Answering k = 2 is the standard slip — 2 is where the touching happens, 9 is how high up it happens.",
        } },
      ],
      esplain: {
        en: "Do not solve −x² + 4x + 5 = k for x. Picture the line instead. Every horizontal line either cuts this parabola twice, touches it once, or misses it altogether, and which of the three happens depends on nothing but the height. Because a is negative, f is sad — it climbs to a peak and falls away — so the peak is a ceiling. Slide the line up from the bottom and it keeps cutting twice, until the moment it arrives at the peak and the two cutting points squash into one. That single moment is what “equal roots” means on a picture. So the whole question is really “how high is the peak”, and the answer is the y of the turning point. The x you find on the way there is only the road; the height is the answer. If you would rather do it with algebra, the same 9 comes out of Δ = 0 for x² − 4x + k − 5 = 0, and both roads earn full marks.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Hence write down the values of k for which the equation &nbsp;f(x) = k&nbsp; will have NO real roots.",
      },
      hint: {
        en: "You have just found the one height where the line touches. Keep sliding it in the direction where the parabola is not there any more.",
      },
      memo: [
        { type: "step", text: { en: "f is <b>sad</b>, so 9 is its maximum — a ceiling. Any line drawn ABOVE that ceiling passes over the whole graph and never meets it." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k &gt; 9" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: at k = 9 exactly the line still touches f, and touching counts as meeting — that is one real root, not none. So the answer is strictly greater than 9, with no equals sign.",
        } },
      ],
      esplain: {
        en: "Once the boundary is found, the rest of the sliding-line family sorts itself into three groups and you only have to say which side you want. Below 9 the line cuts twice, so there are two real roots. At exactly 9 it rests on the peak, so there is one repeated root. Above 9 there is simply no parabola left to meet, so there are no real roots at all. The one decision worth slowing down for is the boundary itself: an equal root is still a root, so 9 belongs to the touching case and not to this one, which is why the bracket stays open. Worth noticing too that on a HAPPY parabola the same question has the answer the other way round — the turning value is a floor, and the misses are the lines below it. The sign of a is what decides which.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — THE TWO-SIDED CASE, from a ROTATING line (see the header's
   judgement call). f(x) = x² + 1 and the line y = kx through the
   origin: x² − kx + 1 = 0, Δ = k² − 4.
     (a) does not cut ⟹ Δ < 0 ⟹ (k − 2)(k + 2) < 0 ⟹ −2 < k < 2
     (b) tangent      ⟹ Δ = 0 ⟹ k = 2 or k = −2, touching at (1 ; 2)
                          and (−1 ; 2)
   LEVEL 3 lives on (a): a quadratic in k, then a quadratic INEQUALITY
   in k on top of it.
   --------------------------------------------------------------- */
const Q2_F = { kind: "parabola", a: 1, b: 0, c: 1 };
const Q2_T_POS = { kind: "line", a: 2, q: 0, dash: true, tone: "b", label: "y = 2x", labelAt: 3.2 };
const Q2_T_NEG = { kind: "line", a: -2, q: 0, dash: true, tone: "b", label: "y = −2x", labelAt: -3 };
const Q2_TOUCH_A = { x: 1, y: 2, on: [0, 2], label: "(1 ; 2)" };
const Q2_TOUCH_B = { x: -1, y: 2, on: [0, 3], label: "(−1 ; 2)" };
const Q2_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 4, ymin: -3, ymax: 10 },
    curves: [
      { ...Q2_F, tone: "a", label: "f", labelAt: -2.6 },
      // the rotating line, drawn at one illustrative gradient — NOT the answer
      { kind: "line", a: 3, q: 0, dash: true, tone: "c", label: "y = kx", labelAt: -0.7 },
    ],
  },
  parts: {
    a: { question: {}, reveal: { curves: [Q2_T_POS, Q2_T_NEG] } },
    b: { question: {}, reveal: { curves: [Q2_T_POS, Q2_T_NEG], points: [Q2_TOUCH_A, Q2_TOUCH_B] } },
  },
};

const q2 = {
  id: "func.sib.nor.q2",
  chapter: CH,
  topic: "nature-of-roots",
  archetype: "rotating-line-through-the-origin-against-a-parabola-two-sided-k",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² + 1, &nbsp;together with the line &nbsp;y = kx, &nbsp;drawn dashed at one possible gradient. The line always passes through the origin, but k may change.<br><br>Determine the values of k for which the line will NOT cut f.",
      },
      hint: {
        en: "“Does not cut” means the two equations have no solution together. Set them equal, bring everything to one side so you have an ordinary quadratic in x, and then ask what the discriminant must do. Watch out at the end — you will be left with a quadratic in k.",
      },
      memo: [
        { type: "step", text: { en: "“Does not cut” means the two equations have <b>no real solution</b> together. Set them equal:" } },
        { type: "step", text: { en: "x² + 1 = kx &nbsp;⟹&nbsp; x² − kx + 1 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "No real roots means Δ &lt; 0, with a = 1, b = −k, c = 1:" } },
        { type: "step", text: { en: "Δ = (−k)² − 4(1)(1) = k² − 4 = (k − 2)(k + 2)" }, ticks: ["ca"] },
        { type: "step", text: { en: "(k − 2)(k + 2) &lt; 0 &nbsp;&nbsp;— a happy parabola in k, and “less than zero” is the inside of the bowl" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ −2 &lt; k &lt; 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: k² &lt; 4 does NOT give k &lt; 2 on its own. It gives −2 &lt; k &lt; 2 — a two-sided answer — because a steep NEGATIVE gradient misses the graph just as a steep positive one cuts it.",
        } },
      ],
      esplain: {
        en: "Two ideas are stacked in this question, which is what makes it the hard one on this tile. The first is the usual translation: “cutting” and “solving together” are the same thing said two ways, so setting the equations equal turns a picture question into an ordinary quadratic, and the discriminant then reports how many crossings there are. Δ negative means none, which is what was asked. The second idea is the twist. Because the k lives in the GRADIENT rather than being added on, it ends up squared inside Δ — and that means the last line is not a plain inequality but a quadratic one. Factorise it, treat it as its own happy parabola in k, and remember that “less than zero” is the piece between the two roots. Picture the line turning about the origin and it makes sense: lie it almost flat and it passes under the whole parabola, tilt it steeply either way and it eventually catches the arm. So the misses are the shallow gradients in the middle, positive and negative alike.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Write down the values of k for which the line will be a tangent to f, and determine the coordinates of the point of contact for the positive value of k.",
      },
      hint: {
        en: "A tangent touches once, which is equal roots — so use the same discriminant, but set it to zero this time. Then put that k back into your quadratic and solve it.",
      },
      memo: [
        { type: "step", text: { en: "A tangent touches f exactly once, so the roots are equal and Δ = 0: &nbsp;k² − 4 = 0 &nbsp;⟹&nbsp; k = 2 &nbsp;or&nbsp; k = −2" }, ticks: ["a"] },
        { type: "answer", text: { en: "for k = 2: &nbsp;x² − 2x + 1 = 0 &nbsp;⟹&nbsp; (x − 1)² = 0 &nbsp;⟹&nbsp; x = 1, &nbsp;and&nbsp; y = (1)² + 1 = 2 &nbsp;&nbsp;∴&nbsp; (1 ; 2)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: k² = 4 has TWO answers, 2 and −2. Taking only the positive square root throws away the tangent on the left-hand side of the graph — and here nothing rules it out, unlike the base of an exponential.",
        } },
      ],
      esplain: {
        en: "The tangent case is the boundary between the two cases in part (a), so it costs almost no new work — the same discriminant, set to zero instead of pushed below it. What is worth practising is the second half. Once k is known the quadratic stops having a letter in it, and because Δ is zero it collapses into a perfect square, which is the algebraic fingerprint of touching: one repeated solution instead of two different ones. That solution is the x where the touching happens, and substituting it into either equation gives the height. Doing it in f is usually safer, because the line's equation still has the k in it. And notice how the picture confirms the pair: the two tangents are mirror images of each other in the y-axis, touching at (1 ; 2) and (−1 ; 2), which is exactly what you would expect from a parabola that is itself symmetrical about that axis.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — TANGENT = EQUAL ROOTS, WITH A SLIDING LINE (her pp52–58).
   f(x) = x² − 3x + 6 and the line y = x + k:
     x² − 4x + (6 − k) = 0,  Δ = 16 − 4(6 − k) = 4k − 8
     (a) tangent ⟹ Δ = 0 ⟹ k = 2, touching at (2 ; 4)
     (b) cuts twice ⟹ Δ > 0 ⟹ k > 2, so y = x + 6 cuts — at (0 ; 6)
         and (4 ; 10), both drawn on (b)'s reveal
   The illustrative dashed line on the question side is drawn at k = 0,
   a position where it MISSES — so nothing on the question side is
   either answer.
   --------------------------------------------------------------- */
const Q3_F = { kind: "parabola", a: 1, b: -3, c: 6 };
const Q3_TANGENT = { kind: "line", a: 1, q: 2, dash: true, tone: "b", label: "y = x + 2", labelAt: 5.5 };
/* the contact point sits exactly where the tangent grazes f, so the
   placer's default slots all cross one line or the other — "above" puts
   it inside the parabola's own cup, which is the one clear space */
const Q3_TOUCH = { x: 2, y: 4, on: [0, 2], label: "(2 ; 4)", place: "above" };
const Q3_CUTTER = { kind: "line", a: 1, q: 6, dash: true, tone: "c", label: "y = x + 6", labelAt: 5.5 };
const Q3_CUT_A = { x: 0, y: 6, on: [0, 3], label: "(0 ; 6)" };
const Q3_CUT_B = { x: 4, y: 10, on: [0, 3], label: "(4 ; 10)" };
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 7, ymin: -3, ymax: 16 },
    curves: [
      { ...Q3_F, tone: "a", label: "f", labelAt: -1.5 },
      // the sliding line at one illustrative position — here it misses
      { kind: "line", a: 1, q: 0, dash: true, tone: "c", label: "y = x + k", labelAt: 5.5 },
    ],
  },
  parts: {
    a: { question: {}, reveal: { curves: [Q3_TANGENT], points: [Q3_TOUCH] } },
    b: {
      question: { curves: [Q3_TANGENT], points: [Q3_TOUCH] },
      reveal: { curves: [Q3_TANGENT, Q3_CUTTER], points: [Q3_TOUCH, Q3_CUT_A, Q3_CUT_B] },
    },
  },
};

const q3 = {
  id: "func.sib.nor.q3",
  chapter: CH,
  topic: "nature-of-roots",
  archetype: "sliding-line-tangent-to-a-parabola-then-delta-read-backwards",
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
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 3x + 6, &nbsp;and the line &nbsp;y = x + k, &nbsp;drawn dashed at one possible position. The line keeps its gradient of 1 but slides up and down as k changes.<br><br>Determine the value of k for which the line will be a tangent to f, and the coordinates of the point of contact.",
      },
      hint: {
        en: "A tangent touches the graph exactly once, so the two equations must have equal roots. Set them equal, tidy into a quadratic in x, then force the discriminant to be zero.",
      },
      memo: [
        { type: "step", text: { en: "Where the line meets f, both equations hold at once. Set them equal:" } },
        { type: "step", text: { en: "x² − 3x + 6 = x + k &nbsp;⟹&nbsp; x² − 4x + (6 − k) = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "A tangent touches once, so the roots are equal and Δ = 0:" } },
        { type: "step", text: { en: "Δ = (−4)² − 4(1)(6 − k) = 16 − 24 + 4k = 4k − 8 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "∴ k = 2" }, ticks: ["a"] },
        { type: "answer", text: { en: "put k = 2 back: &nbsp;x² − 4x + 4 = 0 &nbsp;⟹&nbsp; (x − 2)² = 0 &nbsp;⟹&nbsp; x = 2, &nbsp;and&nbsp; y = (2)² − 3(2) + 6 = 4 &nbsp;&nbsp;∴&nbsp; (2 ; 4)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: Δ = 0, not Δ &gt; 0. A tangent meets the graph once, and once means the two roots have collapsed into one — that is exactly what a zero discriminant says.",
        } },
      ],
      esplain: {
        en: "Every question of this kind runs on one sentence: where the graphs meet, both equations are true, so setting them equal turns a picture into a quadratic whose solutions are the x-values of the meeting points. From there the discriminant does all the reporting. Two different roots means the line cuts through; one repeated root means it just grazes; no real roots means it sails past. A tangent is the middle case, so Δ = 0 is the condition, and solving that gives the one height at which this particular gradient can rest on the curve. The second half of the answer is the part people forget. The question asked WHERE it touches, so substitute the k you found back into the quadratic — it will factorise into a perfect square, which is the algebra confirming the graph — and take that x into f for the height. A perfect square appearing at that point is a free check that k is right.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Write down the values of k for which the line will cut f at two different points, and hence state whether the line &nbsp;y = x + 6&nbsp; cuts f, touches f, or misses it completely.",
      },
      hint: {
        en: "Two different cutting points means two different roots. You already have Δ in terms of k, so ask what it has to be — then compare 6 with the boundary you found in (a).",
      },
      memo: [
        { type: "step", text: { en: "Two different cutting points means two unequal real roots, so Δ &gt; 0: &nbsp;4k − 8 &gt; 0 &nbsp;⟹&nbsp; k &gt; 2" }, ticks: ["a"] },
        { type: "answer", text: { en: "6 &gt; 2, so the line y = x + 6 <b>cuts</b> f at two different points — and indeed it does, at (0 ; 6) and (4 ; 10)." }, ticks: ["a"] },
      ],
      esplain: {
        en: "The discriminant you built in (a) is not used up — it is a machine that answers every version of the question at once, and all that changes is what you make it do. Force it to zero and you get the tangent. Push it above zero and you get the lines that cut twice, which here is everything above the tangent, k greater than 2. Push it below and you get the misses, k less than 2 — which is why the dashed line drawn on the sketch at k = 0 passes underneath the parabola without touching it. So the last part is just a comparison: 6 sits above the boundary, so that particular line must cut. If you want to see it, solve x² − 4x + 6 − 6 = 0, which factorises to x(x − 4) and gives the two crossings at x = 0 and x = 4. That check is quick and it is the honest way to be sure you have the inequality the right way round.",
      },
    },
  ],
};

export const funcNatureOfRootsSiblingQuestions = [q1, q2, q3];
