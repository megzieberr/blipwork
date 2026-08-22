/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill
   "asymptotes-domain-range"
   (SESSION 2a of the four-session function-diagram build, 2026-08-22.)
   ------------------------------------------------------------
   Three new cards, taking this tile from three to six. Same reason as
   its sibling files: the tile only had whatever fell out of the four
   seeded practice-paper questions, and "Another one!" ran dry.

   SOURCE OF THE MATHS: GR11-FUNCTIONS-NOTES-DIGEST.md — her own Gr11
   notes. Her p10 (hyperbola: asymptotes x = p and y = q, domain x ≠ p,
   range y ≠ q), pp11–13 (hyperbola worked pages, a < 0 and the
   restricted-domain page), p14 and pp15–17 (exponential: a says
   above/below the asymptote, b says TAKING OFF or LANDING, all four
   sign/base combinations). Types and methods hers; every number fresh.

   THE FOUR SIGN/BASE COMBOS, spread across the three cards exactly as
   the brief asks:
     q2(a)  a > 0, b > 1        taking off, ABOVE the asymptote
     q2(b)  a > 0, 0 < b < 1    landing,    ABOVE the asymptote
     q3(a)  a < 0, b > 1        taking off, BELOW the asymptote
     q3(b)  a < 0, 0 < b < 1    landing,    BELOW the asymptote
   q1 carries the hyperbola side: a NEGATIVE a (so the branches sit in
   the other pair of corners than the seeded questions' do), the
   domain/range pair written her way, and a SHIFT whose whole point is
   that the asymptotes travel with the graph.

   RESTRICTED DOMAIN is q2(c) — her pp11–13 wording, applied to an
   exponential rather than to a second hyperbola so that it lands on the
   graph the learner has just been reading, not on a fresh one.

   NO-LEAK RULE. Every part on this tile asks for something that could
   be read off a picture if the picture were generous enough, so none of
   these figures draws asymptote guide lines and none of them shows a
   grid — the same discipline js/exam/func-hyperbola-and-exponential-2.js
   already applies to its (a). What the figures DO carry is the curve
   itself, honestly to scale, plus whatever the stem already stated in
   words. Where an answer is a POINT (q1's crossing point, q2(c)'s top
   end), it appears on the reveal side only.

   LEVELS: mostly 1–2, exactly one level 3 (q3(b) — the learner has to
   put the range and the shape into words at the same time, and notice
   that two graphs which look nothing alike have the same range).
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — HYPERBOLA WITH a < 0, then a shift.
   h(x) = −4/(x − 1) + 3. Asymptotes x = 1 and y = 3; the branches sit
   in the other two corners than a positive a would put them.
   k(x) = h(x + 3) − 2 ⟹ asymptotes x = −2 and y = 1.
   The crossing point (1 ; 3) is (a)'s own answer written as a pair, so
   it is on (a)'s REVEAL and on (b)/(c)'s question side, never before.
   --------------------------------------------------------------- */
const Q1_H = { kind: "hyperbola", a: -4, p: 1, q: 3 };
const Q1_CENTRE = { x: 1, y: 3, label: "(1 ; 3)" };   // not ON the curve — no `on`
/* THE REVEAL DRAWS WHAT IT FOUND (session 2a-FIX). (a)'s answer IS the two
   asymptotes, so (a)'s reveal draws them, dashed and captioned. (c)'s answer
   is the SHIFTED graph's pair, so (c)'s reveal draws k itself (tone b, named)
   with its own two captioned asymptotes — k is curve index 1, after the base
   spec's h. */
const Q1_ASYM = [{ x: 1, of: 0, label: "x = 1" }, { y: 3, of: 0, label: "y = 3" }];
const Q1_K = { kind: "hyperbola", a: -4, p: -2, q: 1, tone: "b", label: "k", labelAt: 1 };
const Q1_K_ASYM = [{ x: -2, of: 1, label: "x = −2" }, { y: 1, of: 1, label: "y = 1" }];
const Q1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -5, xmax: 7, ymin: -3, ymax: 9 },
    curves: [{ ...Q1_H, tone: "a", label: "h", labelAt: -4 }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q1_CENTRE], asymptotes: Q1_ASYM } },
    // h's asymptotes are (a)'s own answer and known by now (NIT FIX,
    // 2026-08-23) — (b) and (c) carry them captioned on the question side,
    // so the crosshairs never vanish once they've been found.
    b: { question: { points: [Q1_CENTRE], asymptotes: Q1_ASYM } },
    c: {
      question: { points: [Q1_CENTRE], asymptotes: Q1_ASYM },
      // both pairs of asymptotes stay visible together on the reveal —
      // h's (already on the question side) plus k's own.
      reveal: { points: [Q1_CENTRE], curves: [Q1_K], asymptotes: Q1_ASYM.concat(Q1_K_ASYM) },
    },
  },
};

const q1 = {
  id: "func.sib.adr.q1",
  chapter: CH,
  topic: "asymptotes-domain-range",
  archetype: "negative-a-hyperbola-asymptotes-domain-range-then-a-shift",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the hyperbola h, defined by &nbsp;h(x) = −4/(x − 1) + 3.<br><br>Write down the equations of the two asymptotes of h.",
      },
      hint: {
        en: "Compare the equation with the shape y = a/(x − p) + q. One asymptote is the x-value the graph is not allowed to reach, the other is the y-value it never settles on.",
      },
      memo: [
        { type: "step", text: { en: "A hyperbola is &nbsp;y = a/(x − p) + q, with a vertical asymptote at x = p and a horizontal one at y = q. Read both straight off:" } },
        { type: "answer", text: { en: "x = 1 &nbsp;&nbsp;and&nbsp;&nbsp; y = 3" }, ticks: ["a", "a"] },
        { type: "trap", text: {
          en: "WATCH OUT: p takes the OPPOSITE sign to the number in the bracket. (x − 1) gives x = 1, but (x + 1) would have given x = −1. The safe check is always: which x makes the bottom zero?",
        } },
      ],
      esplain: {
        en: "An asymptote is a line the graph creeps towards forever without ever arriving. A hyperbola has two of them, and they are the crosshairs of the whole picture. The vertical one is easy to justify: the graph is a fraction, and a fraction with zero on the bottom is undefined, so at that one x-value the graph simply cannot exist — it flies off instead. The horizontal one comes from the tail end: as x gets huge in either direction the fraction −4/(x − 1) shrinks towards nothing, so the whole expression settles down onto the leftover number, which is the 3. Notice the a, the −4, played no part at all in this answer — a controls how far the branches sit from the crosshairs and which pair of corners they live in, never where the crosshairs themselves are.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Write down the domain and the range of h.",
      },
      hint: {
        en: "Domain is the x-values allowed in, range is the y-values that come out. For a hyperbola each of them is everything except one number — and you already found both numbers in (a).",
      },
      memo: [
        { type: "step", text: { en: "The graph is undefined where the bottom is zero, and it never actually settles on its horizontal asymptote — so each answer is “everything except one number”:" } },
        { type: "answer", text: { en: "domain: &nbsp;x ∈ ℝ ; x ≠ 1 &nbsp;&nbsp;·&nbsp;&nbsp; range: &nbsp;y ∈ ℝ ; y ≠ 3" }, ticks: ["a", "a"] },
      ],
      esplain: {
        en: "These two answers are the asymptotes in different clothing. The vertical asymptote said “x may not be 1”, and the domain is precisely the list of x-values that are allowed, so it says the same thing: all the reals, except that one. The horizontal asymptote said “y never becomes 3”, and the range is the list of y-values that actually come out, so again, all the reals except that one. That is why she teaches asymptotes first and domain and range straight afterwards — for a hyperbola the second pair is free once you have the first. Watch the layout, because she marks it: the set of numbers first, then the exclusion riding after a semicolon.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "The graph of k is given by &nbsp;k(x) = h(x + 3) − 2.<br><br>Write down the equations of the two asymptotes of k.",
      },
      hint: {
        en: "A shift picks the whole picture up and puts it down somewhere else — asymptotes and all. Work out which way each part of the instruction moves it, then move both of your answers from (a) the same way.",
      },
      memo: [
        { type: "step", text: { en: "h(x + 3) slides the whole graph 3 units LEFT, and the &nbsp;− 2&nbsp; outside slides it 2 units DOWN. The asymptotes are part of the picture, so they travel with it:" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 1 − 3 = −2 &nbsp;&nbsp;and&nbsp;&nbsp; y = 3 − 2 = 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: h(x + 3) moves the graph LEFT, not right. Anything done INSIDE the bracket, next to the x, does the opposite of what it looks like; anything outside behaves normally.",
        } },
      ],
      esplain: {
        en: "The thing to hold on to is that a shift does not redraw the graph, it carries it. Nothing about the shape changes — same branches, same steepness, same gaps — so you do not need the equation of k at all. All you need is where the crosshairs went, and they went wherever the instruction sent everything else. The inside-versus-outside rule is the only fiddly part, and there is a reason for it rather than just a rule to memorise: k(0) is h(3), so the value the new graph shows at 0 is the one the old graph showed at 3 — the picture has slid left by 3 to bring that value across. If you ever forget which way, test one number like that and the answer falls out in ten seconds.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — TWO EXPONENTIALS WITH a > 0: one taking off, one landing, plus
   the restricted-domain part. Two DIFFERENT graphs, so (b) and (c)
   carry their own per-part spec (js/exam/_schema.js allows it) rather
   than crowding both curves onto one pair of axes — each part's figure
   is about the graph in front of the learner.
     f(x) = 2·3ˣ − 5     a > 0, b > 1        asymptote y = −5
     g(x) = 4(1/2)ˣ + 1  a > 0, 0 < b < 1    asymptote y = 1
   g(−2) = 17, so the restricted range is 1 < y ≤ 17.
   --------------------------------------------------------------- */
const Q2_F_SPEC = {
  type: "function",
  win: { xmin: -4, xmax: 3, ymin: -8, ymax: 14 },
  curves: [{ kind: "exp", a: 2, b: 3, p: 0, q: -5, tone: "a", label: "f", labelAt: 1.6 }],
  points: [{ x: 0, y: -3, on: 0, label: "(0 ; −3)" }],
};
const Q2_G_SPEC = {
  type: "function",
  win: { xmin: -3, xmax: 6, ymin: -2, ymax: 20 },
  curves: [{ kind: "exp", a: 4, b: 0.5, p: 0, q: 1, tone: "b", label: "g", labelAt: 1.5 }],
  points: [{ x: 0, y: 5, on: 0, label: "(0 ; 5)" }],
};
const Q2_G_TOP = { x: -2, y: 17, on: 0, label: "(−2 ; 17)" };
const Q2_G_ASYM = { y: 1, of: 0, label: "y = 1" };
const Q2_DIAGRAM = {
  spec: Q2_F_SPEC,
  parts: {
    a: { question: {}, reveal: { asymptotes: [{ y: -5, of: 0, label: "y = −5" }] } },
    b: { spec: Q2_G_SPEC, question: {}, reveal: { asymptotes: [Q2_G_ASYM] } },
    c: {
      spec: Q2_G_SPEC,
      /* y = 1 is GIVEN by now — it was (b)'s own answer, and this card plays
         (a), (b), (c) in order — so it carries its caption on the question
         side; the range 1 < y ≤ 17 is read off the strip against it. */
      question: { shades: [{ x0: -2, x1: 6 }], asymptotes: [Q2_G_ASYM] },
      reveal: { shades: [{ x0: -2, x1: 6 }], asymptotes: [Q2_G_ASYM], points: [Q2_G_TOP] },   // the top end is the answer
    },
  },
};

const q2 = {
  id: "func.sib.adr.q2",
  chapter: CH,
  topic: "asymptotes-domain-range",
  archetype: "two-positive-a-exponentials-taking-off-and-landing-plus-restricted-domain",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the exponential graph f, defined by &nbsp;f(x) = 2·3ˣ − 5.<br><br>Write down the equation of the asymptote of f, and the range of f.",
      },
      hint: {
        en: "In y = a·bˣ + q the leftover number is the asymptote. Then ask one question about the sign of a: does the graph sit above that line, or below it?",
      },
      memo: [
        { type: "step", text: { en: "In &nbsp;y = a·bˣ + q&nbsp; the q is the asymptote, and here q = −5. The sign of a decides which side of it the graph lives on — a = 2 is positive, so f sits entirely ABOVE the line:" } },
        { type: "answer", text: { en: "asymptote: &nbsp;y = −5 &nbsp;&nbsp;·&nbsp;&nbsp; range: &nbsp;y &gt; −5" }, ticks: ["a", "a"] },
      ],
      esplain: {
        en: "An exponential graph is a very obedient thing: it has one flat line it hugs, and it stays on one side of that line forever. The line is the leftover number q, because the power part bˣ shrinks towards nothing at one end and the whole expression settles onto q. Which side it stays on is decided entirely by a: a positive a adds something positive to q every single time, so the graph is always above; a negative a would subtract, and it would hang below instead. That is why the range is written with a strict greater-than and no equals sign — the graph gets as close to −5 as you like but never actually gets there, so −5 itself is not a value the graph ever produces.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "A second graph g is defined by &nbsp;g(x) = 4(1/2)ˣ + 1, and is shown in the sketch.<br><br>Write down the equation of the asymptote of g, and the range of g.",
      },
      hint: {
        en: "Read it the same way you read f. The base is smaller than 1 this time, which changes which way the graph runs — but ask yourself whether it changes which side of the asymptote the graph sits on.",
      },
      memo: [
        { type: "step", text: { en: "Same reading: &nbsp;q = 1&nbsp; is the asymptote, and a = 4 is positive, so g is ABOVE it. The base 1/2 lies between 0 and 1, so g is <b>landing</b> — it falls towards the asymptote as x grows — but landing changes nothing about WHICH SIDE the graph sits on:" } },
        { type: "answer", text: { en: "asymptote: &nbsp;y = 1 &nbsp;&nbsp;·&nbsp;&nbsp; range: &nbsp;y &gt; 1" }, ticks: ["a", "a"] },
        { type: "trap", text: {
          en: "WATCH OUT: a base between 0 and 1 does NOT make the range flip. The base decides which way round the graph runs (taking off or landing); only the sign of a decides which side of the asymptote it lives on.",
        } },
      ],
      esplain: {
        en: "This is the part learners get wrong most often, because “decreasing” feels like it should turn the answer upside down. It does not. Picture the two graphs side by side: f takes off to the right and flattens onto its line on the left; g does the mirror image — it flattens onto its line on the right and shoots up on the left. Both of them spend their whole lives above their own asymptote, because in both cases a is positive and a positive amount is being added to q. So both ranges are “greater than the asymptote”. The base changed the direction of travel, not the neighbourhood. Worth noticing too: (1/2)ˣ is the same thing as 2 to the power −x, which is exactly why it comes out as the mirror image of a taking-off graph.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "The domain of g is now restricted to &nbsp;x ≥ −2&nbsp; (the shaded strip).<br><br>Write down the range of g on this restricted domain.",
      },
      hint: {
        en: "On a restricted domain the range runs between two things: the value at the end of the strip, and whatever the graph is heading for at the open side. Work out the first, remember the second from (b), and then decide which end may be closed.",
      },
      memo: [
        { type: "step", text: { en: "g is landing, so it is at its HIGHEST at the left-hand end of the strip: &nbsp;g(−2) = 4(1/2)<sup>−2</sup> + 1 = 4(4) + 1 = 17" }, ticks: ["s/f"] },
        { type: "step", text: { en: "as x grows the graph keeps falling towards y = 1, but never reaches it" } },
        { type: "answer", text: { en: "1 &lt; y ≤ 17" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the two ends are not the same kind. x = −2 IS allowed, so the graph really does reach 17 and that end is CLOSED (≤). The asymptote is never reached, so that end stays OPEN (&lt;), whatever the domain says.",
        } },
      ],
      esplain: {
        en: "Restricting the domain is like putting a fence across the x-axis and only looking at the graph inside the fence. The range is then just “how high and how low does the graph get in there”. Because g is landing, it is at its tallest at the left edge of the fence and it drops from there, so one end of the range is an actual, reachable value — you find it by substituting the fence post, x = −2, into g. The other end is not a value at all, it is the asymptote the graph is still creeping towards when the fence runs out, so it stays open no matter what. That mixture of one closed end and one open end in the same answer is the whole point of this question, and it is exactly the same decision as the one you make at the end of a hyperbola inequality.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — TWO EXPONENTIALS WITH a < 0, both bases, on one pair of axes
   (both hang below the SAME asymptote y = 6, which is what makes the
   comparison worth drawing).
     f(x) = −3·2ˣ + 6      a < 0, b > 1
     g(x) = −3(1/2)ˣ + 6   a < 0, 0 < b < 1   = f(−x), the mirror
   No asymptote line is drawn: y = 6 is (a)'s own answer.
   LEVEL 3 lands on (b) — the range AND the shape, in words.
   --------------------------------------------------------------- */
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -3, xmax: 3, ymin: -10, ymax: 9 },
    curves: [
      { kind: "exp", a: -3, b: 2, p: 0, q: 6, tone: "a", label: "f", labelAt: -2.5 },
      { kind: "exp", a: -3, b: 0.5, p: 0, q: 6, tone: "b", label: "g", labelAt: 2.5 },
    ],
    points: [
      { x: 1, y: 0, on: 0, label: "(1 ; 0)" },
      { x: -1, y: 0, on: 1, label: "(−1 ; 0)" },
    ],
  },
  parts: {
    // (a)'s answer IS the asymptote both graphs share — drawn and captioned
    // on its reveal, never before (session 2a-FIX).
    a: { question: {}, reveal: { asymptotes: [{ y: 6, of: 0, label: "y = 6" }] } },
    b: { question: {} },
  },
};

const q3 = {
  id: "func.sib.adr.q3",
  chapter: CH,
  topic: "asymptotes-domain-range",
  archetype: "two-negative-a-exponentials-below-the-same-asymptote",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "The sketch shows two graphs on the same set of axes: &nbsp;f(x) = −3·2ˣ + 6&nbsp; and &nbsp;g(x) = −3(1/2)ˣ + 6.<br><br>Write down the equation of the asymptote of f, and the range of f.",
      },
      hint: {
        en: "The leftover number is still the asymptote. This time look hard at the sign in front of the power before you decide which side of that line the graph lives on.",
      },
      memo: [
        { type: "step", text: { en: "The leftover number is the asymptote: &nbsp;q = 6. This time a = −3 is NEGATIVE, so something is being taken away from 6 every time — the graph hangs BELOW the line:" } },
        { type: "answer", text: { en: "asymptote: &nbsp;y = 6 &nbsp;&nbsp;·&nbsp;&nbsp; range: &nbsp;y &lt; 6" }, ticks: ["a", "a"] },
      ],
      esplain: {
        en: "Everything you did on the previous card still applies — the leftover number is the flat line, and the sign of a says which side of it the graph lives on. The only change is that a is negative now, so instead of adding a positive amount to 6 the graph is always subtracting one, and it therefore sits underneath. It is worth checking that against the picture: the curve comes in almost flat just under 6 on the left, then dives away downwards. It never crosses the line and never touches it, which is why the range is a strict less-than. And notice that the graph DOES cross the x-axis, at (1 ; 0) — an exponential can happily cross the x-axis; what it can never do is cross its own asymptote.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Write down the range of g, and explain in words how the picture of g differs from the picture of f.",
      },
      hint: {
        en: "Compare the two equations letter by letter. Two of the three numbers are identical — decide what those two settle before you say anything about the one that is different.",
      },
      memo: [
        { type: "step", text: { en: "g has the SAME q = 6 and the SAME negative a = −3, so g hangs below the same asymptote as f does" }, ticks: ["ca"] },
        { type: "step", text: { en: "the only difference is the base. f has b = 2 &gt; 1, so f is <b>taking off</b> — it plunges away downwards on the RIGHT. g has b = 1/2, between 0 and 1, so g is <b>landing</b> — it plunges away downwards on the LEFT and flattens onto y = 6 on the right" }, ticks: ["ca"] },
        { type: "answer", text: { en: "range of g: &nbsp;y &lt; 6&nbsp; — exactly the same as f. &nbsp;g is the mirror image of f in the y-axis." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: two graphs can look like complete opposites and still have exactly the same range. The base decides which WAY round the graph runs; only a and q decide which y-values it can reach.",
        } },
      ],
      esplain: {
        en: "This part is asking you to separate two things that beginners tend to bundle together: what a graph LOOKS like, and what y-values it produces. The look is decided by the base. A base bigger than 1 means each step to the right multiplies the power part, so the graph runs away on the right; a base between 0 and 1 means each step to the right shrinks it, so the running away happens on the left instead. Since (1/2)ˣ is just 2 to the power −x, swapping the base for its reciprocal flips the picture in the y-axis, which is exactly what you can see in the sketch — the two curves are reflections of one another. But the y-values are decided by a and q alone: both graphs subtract a positive amount from 6, and both can subtract as much as you like, so both sweep out everything below 6 and neither reaches it. Same range, opposite pictures.",
      },
    },
  ],
};

export const funcAsymptotesDomainRangeSiblingQuestions = [q1, q2, q3];
