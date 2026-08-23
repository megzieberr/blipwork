/* ============================================================
   EXAM FOCUS — Functions · TOP-UP SIBLING CARDS
   (BUILD DAY, SESSION D2, 2026-08-23 — the other half of the ★ move.)
   ------------------------------------------------------------
   WHY THIS FILE EXISTS. Her ruling 5 (EXAM-BUILD-DAY.md) moved every
   level-4 part off the normal Functions tiles and onto the chapter's
   new Level 4 ★ tile. Four Functions cards were made ENTIRELY of a ★
   part, so moving the part moved the whole card, and two tiles fell
   below the six-card target:

     nature-of-roots   6 → 3   (func.lp.q1(e), func.hyp.t2q3(e) and
                                func.gt.t1q5(c) all left)
     distances         6 → 5   (func.gt.t1q5's card split: its ★ part
                                (b) went to the Level 4 tile, and its
                                lead-in (a) — "determine the range of
                                f" — is a range question, not a
                                distance one, so it was re-homed on
                                Asymptotes, domain & range rather than
                                left sitting alone on the wrong tile)

   So: three fresh nature-of-roots cards and one fresh distances card,
   every part level 3 or lower, which is what the brief asks for. Their
   ids continue their own tiles' numbering (func.sib.nor.q4–q6,
   func.sib.dist.q6) rather than inventing a new abbreviation, so a tile
   can still be read straight off an id.

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   — pp52–58 (Δ rules read against the number of intersections, f(x) = k
   as a sliding horizontal line, g + k as a graph that slides while the
   line stays put) and pp40–45 (horizontal, vertical and diagonal
   distances). Her p54 f) — the digest's flagged slip #1 — is NOT mined
   anywhere here, and neither is her p58 derivative.

   HOW EACH ONE STAYS CLEAR OF WHAT THE TILE ALREADY HAS:
     nor.q4  reads the nature of the roots straight off a sketch — the
             most basic version of this skill, which the tile never had,
             and then the ONE k that gives equal roots
     nor.q5  an EXPONENTIAL against a sliding horizontal line: a graph
             that never turns, so a line can only ever cut it once or
             miss it — a completely different count from every parabola
             card on the tile
     nor.q6  the graph SLIDES instead of the line: p(x) = f(x) + k, and
             the sign flip that catches everyone
     dist.q6 the HORIZONTAL chord: the gap between two x-intercepts, and
             then the gap between the two points at a given height —
             the one distance shape the five existing cards (two points,
             a vertical segment, a maximum, a minimum, the hyperbola's
             branch gap) never ask for
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   nor.q4 — READING THE NATURE OFF A SKETCH, then the ONE k that gives
   equal roots (her pp52–58).
   f(x) = x² + 2x − 3, x-intercepts −3 and 1 (both GIVEN and marked),
   TP(−1 ; −4) — which is what (b) has to FETCH, so it is nowhere on a
   question side.
   --------------------------------------------------------------- */
const N4_F = { kind: "parabola", a: 1, b: 2, c: -3 };
const N4_TP = { x: -1, y: -4, on: 0, label: "TP(−1 ; −4)", place: "below" };
const N4_BOUND = { kind: "line", a: 0, q: -4, dash: true, tone: "b", label: "y = −4", labelAt: -4.5 };
const N4_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -6, xmax: 4, ymin: -7, ymax: 8 },
    curves: [{ ...N4_F, tone: "a", label: "f", labelAt: -4 }],
    points: [
      { x: -3, y: 0, on: 0, label: "(−3 ; 0)" },
      { x: 1, y: 0, on: 0, label: "(1 ; 0)" },
    ],
  },
  parts: {
    a: { question: {} },
    b: { question: {}, reveal: { points: [N4_TP], curves: [N4_BOUND] } },
  },
};

const nor4 = {
  id: "func.sib.nor.q4",
  chapter: CH,
  topic: "nature-of-roots",
  archetype: "read-the-nature-of-the-roots-off-a-sketch-then-the-equal-roots-k",
  paper: PAPER,
  diagram: N4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² + 2x − 3, &nbsp;cutting the x-axis at (−3 ; 0) and (1 ; 0).<br><br>Write down the nature of the roots of &nbsp;f(x) = 0.",
      },
      hint: {
        en: "The roots of f(x) = 0 are exactly the x-values where the graph meets the x-axis. So count the crossings on the sketch first — and then look at what kind of numbers they are.",
      },
      memo: [
        { type: "step", text: { en: "The roots of f(x) = 0 are the x-values where the graph MEETS the x-axis." } },
        { type: "answer", text: { en: "the sketch shows two <b>different</b> crossings, so the roots are real and unequal" }, ticks: ["a"] },
        { type: "answer", text: { en: "the crossings are at −3 and 1, which are whole numbers &nbsp;&nbsp;∴&nbsp; the roots are real, unequal and <b>rational</b>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: \"nature of the roots\" is asking what KIND of numbers they are, not what they are. Writing x = −3 and x = 1 answers a different question and earns nothing here.",
        } },
      ],
      esplain: {
        en: "There are only ever four answers to a nature-of-roots question, and a sketch usually settles it faster than a discriminant. If the graph crosses the x-axis twice, the roots are real and unequal. If it touches once and turns away, they are real and equal. If it misses the axis altogether, they are non-real. And the extra word — rational or irrational — comes from whether those crossings sit on nice numbers or on surd-looking ones. Here two clean crossings at −3 and 1 give you the full answer: real, unequal, rational. If you would rather prove it with algebra, the discriminant says the same thing: b² − 4ac = 4 + 12 = 16, which is positive, so two real roots, and it is a perfect square, which is what makes them rational. Both roads are worth full marks; the sketch is just quicker when a sketch is given.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the value of k for which the equation &nbsp;f(x) = k&nbsp; will have <b>equal</b> roots.",
      },
      hint: {
        en: "f(x) = k is a horizontal line sliding up and down across f. Equal roots means it meets the parabola at one point only — so where does a horizontal line touch a parabola exactly once?",
      },
      memo: [
        { type: "step", text: { en: "f(x) = k is the horizontal line y = k sliding up and down across f. It meets the graph ONCE only when it rests on the turning point, so find that point." } },
        { type: "step", text: { en: "x = −b/(2a) = −2/(2(1)) = −1 &nbsp;&nbsp;⟹&nbsp;&nbsp; f(−1) = 1 − 2 − 3 = −4 &nbsp;&nbsp;TP(−1 ; −4)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ k = −4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: it is the HEIGHT of the turning point that answers this, not its x. Writing k = −1 gives the line the wrong number entirely.",
        } },
      ],
      esplain: {
        en: "Do not solve x² + 2x − 3 = k for x here; picture the line instead. Every horizontal line either cuts this parabola twice, touches it once, or misses it, and which of the three happens depends only on where the line sits compared with the turning point. Slide it down from high above: it cuts twice, then twice with the crossings creeping together, and at exactly the turning point's height the two crossings merge into one. That is what \"equal roots\" means on a picture — the two roots have become the same number. Below that height the line passes underneath and there is nothing to meet. So the answer is always the y-value of the turning point, which makes this really a turning-point question wearing a nature-of-roots hat. Work out the x with −b over 2a, substitute back for the height, and answer with the height.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   nor.q5 — A HORIZONTAL LINE AGAINST AN EXPONENTIAL (her pp14 and
   pp52–58). g(x) = 3ˣ − 9: asymptote y = −9, y-intercept (0 ; −8),
   x-intercept (2 ; 0) — all GIVEN.
     (a) exactly one root ⟺ the line sits above the asymptote: k > −9
     (b) no root         ⟺ k ≤ −9 (and −9 itself is out, because the
                             graph never actually reaches its asymptote)
     (c) h(x) = g(x) + t has an x-intercept only when 3ˣ = 9 − t has an
         answer, i.e. when 9 − t > 0. No x-intercept ⟹ t ≥ 9.
   (a)'s reveal draws an example line ABOVE the asymptote and (b)'s an
   example BELOW it, so "cuts once" and "misses" are things the learner
   can see; (c)'s reveal draws the boundary graph itself, h = 3ˣ at
   t = 9, sitting entirely above the x-axis.
   --------------------------------------------------------------- */
const N5_G = { kind: "exp", a: 1, b: 3, p: 0, q: -9 };
const N5_HIT = { kind: "line", a: 0, q: 3, dash: true, tone: "b", label: "y = 3", labelAt: -3 };
const N5_MISS = { kind: "line", a: 0, q: -10, dash: true, tone: "c", label: "y = −10", labelAt: -1.5 };
const N5_BOUND = { kind: "exp", a: 1, b: 3, p: 0, q: 0, tone: "b", label: "h", labelAt: 1.2 };
const N5_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 4, ymin: -11, ymax: 12 },
    curves: [{ ...N5_G, tone: "a", label: "g", labelAt: 2.2 }],
    asymptotes: [{ y: -9, of: 0, label: "y = −9" }],
    points: [
      { x: 0, y: -8, on: 0, label: "(0 ; −8)" },
      { x: 2, y: 0, on: 0, label: "(2 ; 0)" },
    ],
  },
  parts: {
    a: { question: {}, reveal: { curves: [N5_HIT] } },
    b: { question: {}, reveal: { curves: [N5_MISS] } },
    c: { question: {}, reveal: { curves: [N5_BOUND] } },
  },
};

const nor5 = {
  id: "func.sib.nor.q5",
  chapter: CH,
  topic: "nature-of-roots",
  archetype: "sliding-horizontal-line-against-an-exponential-one-root-or-none",
  paper: PAPER,
  diagram: N5_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the exponential graph g, defined by &nbsp;g(x) = 3ˣ − 9. &nbsp;Its asymptote is the dashed line y = −9, and it cuts the y-axis at (0 ; −8) and the x-axis at (2 ; 0).<br><br>Determine the value(s) of k for which the equation &nbsp;g(x) = k&nbsp; will have <b>exactly one</b> real root.",
      },
      hint: {
        en: "g(x) = k is a horizontal line sliding up and down. An exponential graph never turns around, so ask yourself how many times a flat line can possibly meet it — and which heights the graph actually reaches.",
      },
      memo: [
        { type: "step", text: { en: "g(x) = k is the horizontal line y = k sliding up and down. An exponential never turns, so a horizontal line can only ever cut it ONCE — or miss it completely." }, ticks: ["ca"] },
        { type: "answer", text: { en: "g lives entirely above its asymptote, so the line cuts it exactly once whenever it sits above that asymptote: &nbsp;k &gt; −9" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A parabola turns, so a horizontal line can meet it twice; an exponential never turns, so it climbs (or falls) once and keeps going. That single fact answers the whole question. Reading g from left to right it starts down near its asymptote at −9, creeps upward, passes through (0 ; −8) and (2 ; 0), and then rises without limit. So every height ABOVE −9 is reached exactly once, and no height is ever reached twice. The line y = k therefore cuts g once for every k greater than −9, which is exactly the range of g written a different way. Notice how this question is really the range question in disguise: \"which heights does the graph reach\" and \"which horizontal lines cut it\" are the same thing said two ways, and spotting that saves you a lot of work in a test.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Determine the value(s) of k for which the equation &nbsp;g(x) = k&nbsp; will have <b>no</b> real root.",
      },
      hint: {
        en: "Everything not covered by (a) belongs here — but be careful about the one height right on the boundary, and whether the graph ever actually gets there.",
      },
      memo: [
        { type: "step", text: { en: "Below the asymptote there is no graph at all, so a line down there meets nothing." } },
        { type: "step", text: { en: "and at k = −9 exactly, the line IS the asymptote — g creeps towards it forever but never reaches it, so even that line misses" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k ≤ −9" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the equals sign belongs on THIS side. k = −9 gives NO root, because a graph never touches its own asymptote — so it is k ≤ −9 here and k &gt; −9 in (a), not the other way round.",
        } },
      ],
      esplain: {
        en: "The two parts together cover every possible height, so the answers must fit side by side with no gap and no overlap — and the only real decision is which of them gets to keep the boundary value. Ask what actually happens at k = −9. The line y = −9 is the asymptote itself, and the whole meaning of an asymptote is that the curve gets closer and closer without ever arriving: at x = −100 the graph is at −8,999999… and still climbing, and it will never be exactly −9. So the line and the curve never meet, which means no root, which puts the boundary in this part's answer. That is why (a) is a strict inequality and (b) is not. Getting the boundary the wrong way round is the single most common mistake in this whole topic, and the fix is always the same: go back to what the graph physically does at that one height.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 3,
      prompt: {
        en: "The graph of h is defined by &nbsp;h(x) = g(x) + t, &nbsp;where t is a constant. Determine the value(s) of t for which h will have <b>no</b> x-intercept.",
      },
      hint: {
        en: "An x-intercept is where the height is zero, so set h(x) = 0 and get the power on its own. Then ask what values that power is allowed to take.",
      },
      memo: [
        { type: "step", text: { en: "An x-intercept means h(x) = 0: &nbsp;3ˣ − 9 + t = 0 &nbsp;⟹&nbsp; 3ˣ = 9 − t" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "3ˣ is always <b>positive</b>, so there is an x-intercept only when 9 − t &gt; 0. No x-intercept therefore needs &nbsp;9 − t ≤ 0 &nbsp;⟹&nbsp; t ≥ 9" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 3ˣ can be enormous and it can be very close to zero, but it is never zero and never negative. That one fact is what decides this question — and it is the same fact that gives every exponential graph its asymptote.",
        } },
      ],
      esplain: {
        en: "This time it is the GRAPH that slides, not the line. Adding t lifts the whole of g by t units, and lifting it also lifts its asymptote, from y = −9 up to y = −9 + t. Now picture the x-axis staying still while the curve rides upwards. As long as the asymptote is still below the x-axis, the curve has to cross the axis on its way up, so there is an x-intercept. The moment the asymptote reaches the x-axis or goes above it, the whole graph is above the axis and there is nothing to cross. That happens when −9 + t ≥ 0, which is t ≥ 9 — the same answer the algebra gives. Doing it algebraically is just as good: set the height to zero, get the power alone, and use the one thing you always know about a power with a positive base, which is that it can never be zero or negative.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   nor.q6 — THE GRAPH SLIDES, NOT THE LINE (her pp52–58).
   f(x) = 2x² − 4x − 6, x-intercepts −1 and 3 (GIVEN), TP(1 ; −8) —
   found in (a) and needed by (b).
     (b) p(x) = f(x) + k has two unequal x-intercepts when f(x) = −k
         cuts twice, i.e. −k > −8, i.e. k < 8. The reveal draws the
         BOUNDARY graph, p at k = 8, which just touches at (1 ; 0).
   --------------------------------------------------------------- */
const N6_F = { kind: "parabola", a: 2, b: -4, c: -6 };
const N6_TP = { x: 1, y: -8, on: 0, label: "TP(1 ; −8)", place: "below" };
const N6_BOUND = { kind: "parabola", a: 2, p: 1, q: 0, tone: "b", label: "p", labelAt: -1.5 };
const N6_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 6, ymin: -11, ymax: 14 },
    curves: [{ ...N6_F, tone: "a", label: "f", labelAt: 3.8 }],
    points: [
      { x: -1, y: 0, on: 0, label: "(−1 ; 0)" },
      { x: 3, y: 0, on: 0, label: "(3 ; 0)" },
    ],
  },
  parts: {
    a: { question: {}, reveal: { points: [N6_TP] } },
    b: {
      question: { points: [N6_TP] },
      reveal: { points: [N6_TP, { x: 1, y: 0, on: 1, label: "(1 ; 0)" }], curves: [N6_BOUND] },
    },
  },
};

const nor6 = {
  id: "func.sib.nor.q6",
  chapter: CH,
  topic: "nature-of-roots",
  archetype: "vertical-slide-of-the-graph-for-two-unequal-x-intercepts",
  paper: PAPER,
  diagram: N6_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = 2x² − 4x − 6, &nbsp;cutting the x-axis at (−1 ; 0) and (3 ; 0).<br><br>Determine the coordinates of the turning point of f.",
      },
      hint: {
        en: "Find the x first — either with the formula or by taking the midpoint of the two crossings — and then substitute it back to get the height.",
      },
      memo: [
        { type: "step", text: { en: "x = −b/(2a) = 4/(2(2)) = 1 &nbsp;&nbsp;(or read it as the midpoint of −1 and 3)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "f(1) = 2(1)² − 4(1) − 6 = 2 − 4 − 6 = −8 &nbsp;&nbsp;∴&nbsp; TP(1 ; −8)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A parabola is perfectly symmetrical about the vertical line through its turning point, so the turning point always sits exactly halfway between the two x-intercepts. With crossings at −1 and 3, halfway is 1, and you can write that down without touching a formula. The formula is still worth doing as a check, because it works even when the graph has no x-intercepts to average. Then substitute to get the height — and be careful with the 2 in front, because 2 times 1 squared is 2, not 4. The height is what the next part actually needs: everything about how far this graph can slide up or down before it stops meeting the x-axis is decided by how deep its lowest point sits.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "The graph of p is defined by &nbsp;p(x) = f(x) + k. &nbsp;Determine the values of k for which p will have <b>two unequal</b> x-intercepts.",
      },
      hint: {
        en: "An x-intercept of p is a solution of f(x) + k = 0, which is f(x) = −k. So this is the sliding-line question again — but watch what happens to the inequality sign when you move the minus.",
      },
      memo: [
        { type: "step", text: { en: "p(x) = 0 means f(x) + k = 0, that is &nbsp;f(x) = −k&nbsp; — a horizontal line at height −k." }, ticks: ["s/f"] },
        { type: "step", text: { en: "f is <b>happy</b> with a minimum of −8, so that line cuts it twice only when it sits above the minimum: &nbsp;−k &gt; −8" }, ticks: ["ca"] },
        { type: "answer", text: { en: "−k &gt; −8 &nbsp;⟹&nbsp; k &lt; 8" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — think of the graph moving instead: adding k lifts f by k units, so its minimum moves to −8 + k. For two x-intercepts that minimum must still be below the x-axis: −8 + k &lt; 0 ⟹ k &lt; 8." } },
        { type: "trap", text: {
          en: "WATCH OUT: multiplying or dividing an inequality by −1 turns the sign around. −k &gt; −8 becomes k &lt; 8, not k &gt; 8. At k = 8 exactly, p just touches the x-axis at (1 ; 0) — that is ONE (equal) root, not two, so 8 itself is out.",
        } },
      ],
      esplain: {
        en: "This is the k-question the other way round. Usually the graph stays still and a line y = k slides across it; here the line is the x-axis, which cannot move, so the graph does the sliding instead. Both pictures give the same answer, and it is worth being able to tell the same story both ways. The algebraic road: an x-intercept means the height is zero, so f(x) + k = 0, which rearranges to f(x) = −k, and now you are back to a familiar horizontal line — it has to sit above the minimum of −8 for two crossings, so −k > −8. The picture road: adding k lifts everything by k, dragging the lowest point from −8 up to −8 + k, and two crossings need that lowest point to still be underneath the axis. Either way you end at k < 8. The one thing that costs marks is the sign flip when the minus moves — deal with it deliberately rather than in your head.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   dist.q6 — THE HORIZONTAL CHORD (her pp40–45).
   f(x) = x² − 2x − 8. A and B are the x-intercepts, so they are what
   (a) FINDS — nothing is marked on the base figure.
     (a) x² − 2x − 8 = 0 ⟹ (x − 4)(x + 2) = 0 ⟹ A(−2 ; 0), B(4 ; 0),
         AB = 6 units
     (b) f(x) = 7 ⟹ x² − 2x − 15 = 0 ⟹ (x − 5)(x + 3) = 0 ⟹
         C(−3 ; 7), D(5 ; 7), CD = 8 units
   --------------------------------------------------------------- */
const D6_F = { kind: "parabola", a: 1, b: -2, c: -8 };
const D6_A = { x: -2, y: 0, on: 0, label: "A(−2 ; 0)" };
const D6_B = { x: 4, y: 0, on: 0, label: "B(4 ; 0)" };
const D6_LINE = { kind: "line", a: 0, q: 7, dash: true, tone: "c", label: "y = 7", labelAt: 6.4 };
const D6_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -5, xmax: 7, ymin: -11, ymax: 14 },
    curves: [{ ...D6_F, tone: "a", label: "f", labelAt: 5.2 }],
  },
  parts: {
    a: { question: {}, reveal: { points: [D6_A, D6_B] } },
    b: {
      question: { points: [D6_A, D6_B], curves: [D6_LINE] },
      reveal: {
        points: [D6_A, D6_B, { x: -3, y: 7, on: 0, label: "C(−3 ; 7)" }, { x: 5, y: 7, on: 0, label: "D(5 ; 7)" }],
        curves: [D6_LINE],
      },
    },
  },
};

const dist6 = {
  id: "func.sib.dist.q6",
  chapter: CH,
  topic: "distances",
  archetype: "horizontal-chord-between-x-intercepts-then-at-a-given-height",
  paper: PAPER,
  diagram: D6_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 2x − 8. &nbsp;A and B are the points where f cuts the x-axis, with A to the left of B.<br><br>Determine the length of AB.",
      },
      hint: {
        en: "A and B are on the x-axis, so their heights are both zero — set f(x) = 0 and factorise. Then remember that a horizontal length is just the gap between two x-values.",
      },
      memo: [
        { type: "step", text: { en: "A and B are on the x-axis, so their heights are zero: &nbsp;x² − 2x − 8 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(x − 4)(x + 2) = 0 &nbsp;⟹&nbsp; x = 4 or x = −2 &nbsp;&nbsp;∴&nbsp; A(−2 ; 0) and B(4 ; 0)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "AB is horizontal, so its length is the gap between the two x-values: &nbsp;AB = 4 − (−2) = 6 units" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: subtracting the two x-values the other way round gives −6, and a length is never negative. If you get a minus, swap them — or just say the answer is the size of the difference.",
        } },
      ],
      esplain: {
        en: "Two small ideas, both worth saying out loud before you start. The first is what an x-intercept actually is: a point where the graph's height is zero, which is why finding one always means solving f(x) = 0 rather than doing anything clever. This one factorises straight away — you need two numbers that multiply to −8 and add to −2, which are −4 and 2 — so the crossings are at 4 and −2. The second is that a distance along a horizontal line does not need the distance formula at all: both ends have the same height, so the vertical part of Pythagoras is zero and only the x-values matter. Count from −2 across to 4 and you have taken six steps to the right. Keep the answer positive and remember to say \"units\" — the question is about a length, not about a coordinate.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "The horizontal line &nbsp;y = 7&nbsp; cuts f at C and D. Determine the length of CD.",
      },
      hint: {
        en: "C and D are on f AND on the line, so their height is 7. Put 7 in for the height, bring everything to one side, and solve the quadratic you get.",
      },
      memo: [
        { type: "step", text: { en: "At C and D the height is 7, so &nbsp;f(x) = 7: &nbsp;&nbsp;x² − 2x − 8 = 7 &nbsp;⟹&nbsp; x² − 2x − 15 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(x − 5)(x + 3) = 0 &nbsp;⟹&nbsp; x = 5 or x = −3 &nbsp;&nbsp;∴&nbsp; C(−3 ; 7) and D(5 ; 7)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "CD is horizontal too: &nbsp;CD = 5 − (−3) = 8 units" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: bring the 7 across before you factorise. Factorising x² − 2x − 8 and then trying to use the 7 afterwards gives nonsense — the equation to solve is x² − 2x − 15 = 0, with a different constant and different brackets.",
        } },
      ],
      esplain: {
        en: "This is the same question as (a) with the ruler slid up the page. In (a) the two ends had height 0; here they have height 7, and that is the only change. So the method is identical: put the height into the equation, bring everything to one side so that you have a quadratic equal to zero, factorise, and read off the two x-values. The one habit that saves marks is doing the \"bring the 7 across\" step deliberately and writing the new equation down, because the brackets change completely — x² − 2x − 8 factorises as (x − 4)(x + 2), while x² − 2x − 15 factorises as (x − 5)(x + 3), and rushing means using the wrong pair. Then finish the same way: both ends are at the same height, so the length is just the gap between the x-values. Notice the answer is bigger than AB, which makes sense — the higher you cut a happy parabola, the wider it is.",
      },
    },
  ],
};

export const funcTopUpSiblingQuestions = [nor4, nor5, nor6, dist6];
