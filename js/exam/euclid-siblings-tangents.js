/* ============================================================
   EXAM FOCUS — Euclidean geometry · SIBLING CARDS for the tile
   "tangents" (Tangents)
   (Exam Focus build day, 2026-08-23 — EXAM-BUILD-DAY.md ruling 4,
   session G2.)
   ------------------------------------------------------------
   FIVE CHAINED RIDERS. The sixth card on this tile is the re-homed
   `euclid.tan.t2q5` (a, b, c) — two tangents from an external point and
   the cyclic-quadrilateral proof — cut on by js/exam/cards-euclid.js,
   so nothing here re-composes it.

   The theorems this tile runs on: tan ⊥ radius · tans from common pt ·
   tan chord theorem, plus ∠ in semi-circle, ∠s in the same seg and the
   isosceles triangles that equal tangents and equal radii create.
   "Prove that PQ is a tangent" is NOT here — the converse belongs on
   the Level 4 tile (js/exam/euclid-level4.js).

   HER DESIGN, and the chained-sketch recipe, are session G1's — read
   the header of js/exam/euclid-siblings-chords-and-angles.js first.
   This file follows it exactly: one spec per rider, unknowns drawn as
   NAMED wedges, `specAfter` growing a colour-matched VALUE KEY beside
   the circle as each part is answered, reveals lighting the PAIR the
   reason is about.

   TWO PLACES THIS TILE HAD TO EXTEND THE RECIPE, both recorded here so
   the next session does not have to rediscover them:

     · OVERLAPPING WEDGES ARE NEVER DRAWN IN A BASE SPEC. At a tangent
       point three or four rays meet (the two ends of the tangent, the
       chords, sometimes the radius), and a wedge spanning two of the
       gaps sits ON TOP of the two smaller wedges inside it — two arcs
       through one another, unreadable at 375 px. So a base spec only
       ever marks a set of DISJOINT wedges at a vertex, and an angle
       that contains one of them (∠OAP over ∠OAB + ∠BAP, ∠APB over
       ∠APO) is drawn ONLY by the highlight of the part that asks for
       it. The highlight is a translucent fill rather than a second
       arc, so one of those on top of the base arcs still reads.

     · A GIVEN THAT IS AN EXPRESSION GOES TO THE KEY even when its
       vertex carries a single wedge. "2x" fits on a wedge; "x + 25°"
       is a 48 px box that has to sit on a bisector 30 px long, and it
       lands on the chord. Same fix as G1's, one step further.

     · INDEX LABELS SIT INSIDE THEIR ARC — Megan's ruling on the build
       day's first contact sheet, and now the engine's own default (a
       bare digit renders smaller and at 0,55 × its arc radius). That
       default only applies when the spec sets NO `o.r`, so no numbered
       wedge here sets one; `o.ar` is tuned instead. Both tangent-point
       vertices in this file carry THREE disjoint wedges between the two
       ends of the tangent, so they use outer / inner / outer — 40, 20,
       40 — which puts the middle digit 11 px from the contact point and
       the two outer ones 22 px out, a full 2 × apart from their
       neighbours. Every highlight repeats its base wedge's `ar` (and a
       matching `hlR`), so a lit wedge shows ONE arc.

   EVERY NUMBER ON EVERY FIGURE IS REAL. The tangent–chord angle at a
   contact point T on the "tg+" side is HALF the arc running
   anticlockwise from T to the chord's far end; on the "tg−" side it is
   half the other arc. Every value below was derived that way, and
   validateQuestion re-measures each one through the engine's own
   verifyDiagram at 1,5°. verify-exam-modules.mjs section 9h recomputes
   them a second time from the degrees alone.

   `ext` computes an external point as the intersection of the two
   tangents, so P is never typed in — it is wherever the two contact
   points put it, and the ratio OP : R is therefore exactly the ratio
   the arithmetic of the question needs (tan.q5 leans on that: its
   9 : 12 : 15 triangle is drawn as 60 : 80 : 100 px).

   REASONS ARE VERBATIM SAG SHORT FORMS (EUCLID-ACCEPTABLE-REASONS.md).
   TICK CONVENTION: ✓s/f the reason-bearing set-up line · ✓ca a derived
   intermediate · ✓a the size (or length) itself.

   lostQuest: the documented euclid placeholder (no "I'm lost" button on
   this chapter — her ruling). See euclid-circle-theorems.js.
   ============================================================ */

const CH = "euclid";
const TOPIC = "tangents";
const PAPER = "siblings";
const LOST_PENDING = { chapter: "euclid", quest: "PENDING-euclid-is-exam-only-no-drill-round" };

/* The canvas for a rider with a FULL tangent line: the circle is pushed
   up (cy 105) so the tangent at the bottom of the circle, and the two
   end labels 12 px below it, both clear the frame. */
const TANG_CANVAS = { w: 340, h: 212, cx: 165, cy: 105, R: 76 };

/* Same helper as session G1's, byte for byte — the two Euclidean tiles
   must grow their sketches the same way. See that file's header for why
   values live in a key beside the circle rather than on the wedge. */
function specAfter(base, found) {
  const out = JSON.parse(JSON.stringify(base));
  const given = (base.key && base.key.lines) || [];
  const lines = [...given.map(l => ({ t: l.t })), ...(found || []).map(f => ({ t: `${f.n} = ${f.v}` }))];
  if (lines.length) out.key = { at: "tr", lines };
  else delete out.key;
  return out;
}

/* =====================================================================
   RIDER 1 — THE TANGENT–CHORD CHASE, BOTH WAYS, THEN THE CENTRE
   ---------------------------------------------------------------------
   Tangent SU touches the circle at T (T at 270°, so SU is horizontal and
   the engine's "tg+" ray is the one running to U on the right). A at
   340°, B at 130°.
     T̂₃ = ∠ATU = ½·arc TA = ½(70°)  = 35°   (given)
     T̂₁ = ∠BTS = ½·arc BT = ½(140°) = 70°   (given)
     ∠ABT = 35° and ∠BAT = 70°   (each the angle in the alternate segment)
     T̂₂ = ∠BTA = 180 − 70 − 35 = 75°        (∠s on a str line)
     ∠AOB = 150° = 2 × ∠BTA   and the base ∠OAB = (180 − 150)/2 = 15°
   The three wedges at T are DISJOINT (S → B → A → U), which is why all
   three can be drawn at once; ∠BAT is not, because the radius OA runs
   through it, so it is drawn only by part (b)'s own highlight.
   ===================================================================== */
const TG1_BASE = {
  ...TANG_CANVAS,
  O: true,
  pts: { T: 270, A: 340, B: 130 },
  tang: [{ at: "T", len: 112, lab: ["S", "U"] }],
  key: { at: "tr", lines: [{ t: "T̂₁ = 70°" }, { t: "T̂₃ = 35°" }] },
  chords: [["T", "A"], ["T", "B"], ["A", "B"], ["O", "A"], ["O", "B"]],
  angles: [
    { at: "T", legs: ["B", "tg-"], t: "1", o: { v: 70, ar: 40 } },
    { at: "T", legs: ["A", "B"], t: "2", o: { v: 75, ar: 20 } },
    { at: "T", legs: ["A", "tg+"], t: "3", o: { v: 35, ar: 40 } },
    { at: "B", legs: ["A", "T"], t: "", o: { v: 35, ar: 22 } },
    { at: "A", legs: ["B", "O"], t: "", o: { v: 15, ar: 15 } },
    { at: "O", legs: ["A", "B"], t: "", o: { v: 150, ar: 26 } },
  ],
};
const TG1_T1 = { at: "T", legs: ["B", "tg-"], v: 70, o: { ar: 40, hlR: 40 } };
const TG1_T2 = { at: "T", legs: ["A", "B"], v: 75, o: { ar: 20, hlR: 20 } };
const TG1_T3 = { at: "T", legs: ["A", "tg+"], v: 35, o: { ar: 40, hlR: 40 } };
const TG1_ABT = { at: "B", legs: ["A", "T"], v: 35, o: { ar: 22, hlR: 22 } };
const TG1_BAT = { at: "A", legs: ["B", "T"], v: 70, o: { ar: 34, hlR: 34 } };
const TG1_OAB = { at: "A", legs: ["B", "O"], v: 15, o: { ar: 15, hlR: 34 } };
const TG1_AOB = { at: "O", legs: ["A", "B"], v: 150, o: { ar: 26, hlR: 26 } };
const TG1_CHAIN = [
  { n: "∠ABT", v: "35°" }, { n: "∠BAT", v: "70°" },
  { n: "T̂₂", v: "75°" }, { n: "∠AOB", v: "150°" },
];

const tg1 = {
  id: "euclid.sib.tg.q1",
  chapter: CH,
  topic: TOPIC,
  archetype: "tangent-chord-both-sides-then-angles-on-a-straight-line-then-angle-at-the-centre",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 11,
  intro: {
    en: "In the diagram, O is the centre of the circle and &nbsp;SU&nbsp; is a tangent to the circle at T. &nbsp;A and B are points on the circle, and TA, TB, AB, OA and OB are drawn. &nbsp;T̂₁ = 70° &nbsp;and&nbsp; T̂₃ = 35°.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(TG1_BASE, []),
        question: { angles: [TG1_ABT] },
        reveal: { angles: [TG1_ABT, TG1_T3], chords: [["T", "A"]] },
      },
      b: {
        spec: specAfter(TG1_BASE, TG1_CHAIN.slice(0, 1)),
        question: { angles: [TG1_BAT] },
        reveal: { angles: [TG1_BAT, TG1_T1], chords: [["T", "B"]] },
      },
      c: {
        spec: specAfter(TG1_BASE, TG1_CHAIN.slice(0, 2)),
        question: { angles: [TG1_T2] },
        reveal: { angles: [TG1_T2, TG1_T1, TG1_T3] },
      },
      d: {
        spec: specAfter(TG1_BASE, TG1_CHAIN.slice(0, 3)),
        question: { angles: [TG1_AOB] },
        reveal: { angles: [TG1_AOB, TG1_T2] },
      },
      e: {
        spec: specAfter(TG1_BASE, TG1_CHAIN.slice(0, 4)),
        question: { angles: [TG1_OAB] },
        reveal: { angles: [TG1_OAB, TG1_AOB], chords: [["O", "A", "t1"], ["O", "B", "t1"]] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠ABT." },
      hint: { en: "T̂₃ is the angle between the tangent and the chord TA. There is one theorem that says which angle somewhere else in the circle it matches." },
      memo: [
        { type: "step", text: { en: "T̂₃ is the angle between tangent SU and chord TA, and ∠ABT is the angle in the alternate segment. &nbsp;&nbsp;<i>(tan chord theorem)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠ABT = T̂₃ = 35°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER — the rule for the whole chapter: <b>the statement earns a mark and the reason earns its own mark</b>. “∠ABT = 35°” on a bare line is half an answer. Every size you write down gets its short reason in brackets beside it.",
        } },
      ],
      esplain: {
        en: "The tangent–chord theorem is the one that looks like magic, because the two equal angles are nowhere near each other. The angle squeezed between the tangent and a chord at the point of contact equals the angle that same chord makes at any point in the segment on the OTHER side of it. Here the chord is TA, the tangent angle is T̂₃, and B is sitting across the circle in the alternate segment, so ∠ABT has to be 35°. The way to use it reliably is to name the chord out loud first — “the chord is TA” — then look for the point on the far side. Learners who skip that step reliably pair the tangent angle with the wrong vertex.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠BAT." },
      hint: { en: "Same theorem, other side of the tangent. This time the chord is TB — so which point is in its alternate segment?" },
      memo: [
        { type: "step", text: { en: "T̂₁ is the angle between tangent SU and chord TB, and ∠BAT is the angle in the alternate segment. &nbsp;&nbsp;<i>(tan chord theorem)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠BAT = T̂₁ = 70°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "One tangent point gives you the theorem twice, once on each side, because there are two chords running out of T and each of them has its own alternate segment. Chord TA sends its angle across to B; chord TB sends its angle across to A. Learners often think the theorem is about “the tangent angle”, singular, and then cannot see where the second one comes from. It is about a CHORD and the tangent, so count your chords: two chords out of the contact point means two tangent–chord pairs, and this question uses both.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;T̂₂." },
      hint: { en: "The three angles at T sit side by side along one straight line — the tangent SU." },
      memo: [
        { type: "step", text: { en: "SU is a straight line, so &nbsp;T̂₁ + T̂₂ + T̂₃ = 180° &nbsp;&nbsp;<i>(∠s on a str line)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ T̂₂ = 180° − 70° − 35° = 75°" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — through the triangle instead: &nbsp;in △ABT, &nbsp;T̂₂ = 180° − ∠ABT − ∠BAT = 180° − 35° − 70° = 75° &nbsp;<i>(sum of ∠s in Δ)</i>. &nbsp;Same marks." } },
      ],
      esplain: {
        en: "Two honest roads, and both earn full marks. The straight-line road uses only the fact that S, T and U are collinear, so the three angles resting on that line at T must total 180°. The triangle road uses the two angles you have just found at A and at B. They agree, and that is not a coincidence — it is the tangent–chord theorem quietly checking your arithmetic. Whenever a chase gives you the same size two different ways, treat it as a free confidence check: if the two roads disagree, a mistake is sitting somewhere behind you and you can go and find it before the marks run out.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠AOB." },
      hint: { en: "∠AOB is at the centre. T̂₂ is at the circumference. Which chord are both of them standing on?" },
      memo: [
        { type: "step", text: { en: "∠AOB and T̂₂ both stand on chord AB, with T on the far arc. &nbsp;&nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠AOB = 2 × 75° = 150°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The tangent has done its work and the question hands over to the ordinary circle theorems. T̂₂ is the angle chord AB makes at T, out on the circumference, and ∠AOB is the angle the same chord makes at the centre — so the one at the centre is double. Check it against the picture before moving on: 150° is very nearly a straight line, and the wedge at O does look almost flat, so the number and the drawing agree. That habit of glancing back at the figure catches almost every arithmetic slip in a chase this long.",
      },
    },
    {
      id: "e",
      marks: 3,
      level: 3,
      prompt: { en: "Determine, with reasons, the size of &nbsp;∠OAB." },
      hint: { en: "Look at triangle OAB on its own. What can you say about its two slanted sides, and what does that force its two base angles to do?" },
      memo: [
        { type: "step", text: { en: "OA = OB &nbsp;&nbsp;<i>(radii)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∴ ∠OAB = ∠OBA &nbsp;&nbsp;<i>(∠s opp equal sides)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "In △OAB: &nbsp;∠OAB = (180° − 150°) ÷ 2 = 15°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the marker pays for “∠s opp equal sides” AND for “sum of ∠s in Δ” as separate reasons. A learner who writes only the arithmetic — (180 − 150) ÷ 2 — collects about a third of what this part is worth.",
        } },
      ],
      esplain: {
        en: "Every triangle with the centre at one corner and two points of the circle at the others is isosceles, because the two sides running out to the circle are radii and every radius is the same length. That means the two base angles match, and once you know the angle at the centre the rest is arithmetic: take it off 180° and share what is left equally between the two. Here 180 − 150 leaves 30, and half of that is 15. It is a very small answer, and the picture agrees — the triangle OAB is a long thin sliver, so its base angles have to be tiny. Marking every radius the second you see one is the habit that makes questions like this quick.",
      },
    },
  ],
};

/* =====================================================================
   RIDER 2 — TWO EXPRESSIONS FOR ONE ANGLE, SO SOLVE FOR x
   ---------------------------------------------------------------------
   Tangent ST touches the circle at P (P at 270°). Q at 170°, R at 30°.
     P̂₁ = ∠QPS = ½·arc QP going the short way = ½(100°) = 50°
     ∠PRQ = 50°     (the angle in the alternate segment — the SAME angle,
                     which is what makes 2x = x + 25° an equation)
     P̂₃ = ∠RPT = ½·arc PR = ½(120°) = 60°, and ∠PQR = 60°
     P̂₂ = ∠QPR = 180 − 50 − 60 = 70°
     ∠QOR = 2 × 70 = 140°, so the base ∠OQR = (180 − 140)/2 = 20°
   The figure is drawn at the TRUE x (25°), so every wedge measures what
   it claims — but the givens are printed as the expressions 2x and
   x + 25°, and part (a) is the one that turns them into numbers.
   ===================================================================== */
const TG2_BASE = {
  /* THE ONE FIGURE THAT NEEDS A WIDER CANVAS THAN TANG_CANVAS. Its key
     carries "∠PRQ = x + 25°", a 15-character line, which pushes the key
     block's left edge to W − 6 − 15 × 7 = 229 px — and R's point label
     sits at x ≈ 243, y ≈ 60, right underneath the third key line. Read
     off the first crop: the key printed straight over the R. Widening to
     400 and sliding the circle left to cx 158 clears it by ~50 px. */
  w: 400, h: 212, cx: 158, cy: 105, R: 76,
  O: true,
  pts: { P: 270, Q: 170, R: 30 },
  tang: [{ at: "P", len: 112, lab: ["S", "T"] }],
  key: { at: "tr", lines: [{ t: "P̂₁ = 2x" }, { t: "P̂₃ = 60°" }, { t: "∠PRQ = x + 25°" }] },
  chords: [["P", "Q"], ["P", "R"], ["Q", "R"], ["O", "Q"], ["O", "R"]],
  angles: [
    { at: "P", legs: ["Q", "tg-"], t: "1", o: { v: 50, ar: 40 } },
    { at: "P", legs: ["Q", "R"], t: "2", o: { v: 70, ar: 20 } },
    { at: "P", legs: ["R", "tg+"], t: "3", o: { v: 60, ar: 40 } },
    { at: "R", legs: ["P", "Q"], t: "", o: { v: 50, ar: 22 } },
    { at: "Q", legs: ["P", "R"], t: "", o: { v: 60, ar: 22 } },
    { at: "O", legs: ["Q", "R"], t: "", o: { v: 140, ar: 26 } },
  ],
};
const TG2_P1 = { at: "P", legs: ["Q", "tg-"], v: 50, o: { ar: 40, hlR: 40 } };
const TG2_P2 = { at: "P", legs: ["Q", "R"], v: 70, o: { ar: 20, hlR: 20 } };
const TG2_P3 = { at: "P", legs: ["R", "tg+"], v: 60, o: { ar: 40, hlR: 40 } };
const TG2_PRQ = { at: "R", legs: ["P", "Q"], v: 50, o: { ar: 22, hlR: 22 } };
const TG2_PQR = { at: "Q", legs: ["P", "R"], v: 60, o: { ar: 22, hlR: 22 } };
const TG2_QOR = { at: "O", legs: ["Q", "R"], v: 140, o: { ar: 26, hlR: 26 } };
const TG2_OQR = { at: "Q", legs: ["O", "R"], v: 20, o: { ar: 13, hlR: 26 } };
const TG2_CHAIN = [
  { n: "x", v: "25°" }, { n: "P̂₁", v: "50°" },
  { n: "∠PQR", v: "60°" }, { n: "P̂₂", v: "70°" },
];

const tg2 = {
  id: "euclid.sib.tg.q2",
  chapter: CH,
  topic: TOPIC,
  archetype: "tan-chord-gives-two-expressions-for-one-angle-solve-for-x-then-finish-the-chase",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 11,
  intro: {
    en: "In the diagram, O is the centre of the circle and &nbsp;ST&nbsp; is a tangent to the circle at P. &nbsp;Q and R are points on the circle, and PQ, PR, QR, OQ and OR are drawn. &nbsp;P̂₁ = 2x, &nbsp;∠PRQ = x + 25° &nbsp;and&nbsp; P̂₃ = 60°.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(TG2_BASE, []),
        question: { angles: [TG2_P1, TG2_PRQ] },
        reveal: { angles: [TG2_P1, TG2_PRQ], chords: [["P", "Q"]] },
      },
      b: {
        spec: specAfter(TG2_BASE, TG2_CHAIN.slice(0, 1)),
        question: { angles: [TG2_P1] },
        reveal: { angles: [TG2_P1, TG2_PRQ] },
      },
      c: {
        spec: specAfter(TG2_BASE, TG2_CHAIN.slice(0, 2)),
        question: { angles: [TG2_PQR] },
        reveal: { angles: [TG2_PQR, TG2_P3], chords: [["P", "R"]] },
      },
      d: {
        spec: specAfter(TG2_BASE, TG2_CHAIN.slice(0, 3)),
        question: { angles: [TG2_P2] },
        reveal: { angles: [TG2_P2, TG2_P1, TG2_P3] },
      },
      e: {
        spec: specAfter(TG2_BASE, TG2_CHAIN.slice(0, 4)),
        question: { angles: [TG2_OQR] },
        reveal: { angles: [TG2_OQR, TG2_QOR], chords: [["O", "Q", "t1"], ["O", "R", "t1"]] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: { en: "Determine the value of &nbsp;x." },
      hint: { en: "P̂₁ sits between the tangent and the chord PQ. ∠PRQ is the angle that same chord makes across the circle. If one theorem says those two are the same angle, you have an equation." },
      memo: [
        { type: "step", text: { en: "P̂₁ = ∠PRQ &nbsp;&nbsp;<i>(tan chord theorem)</i> — chord PQ, with R in the alternate segment" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∴ 2x = x + 25°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = 25°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the theorem is what MAKES the equation — write it down as your first line. A learner who starts at “2x = x + 25” has thrown away the reason mark, which is a third of this part.",
        } },
      ],
      esplain: {
        en: "This is the shape a paper uses when it wants to check that you can turn geometry into algebra. Nothing is being measured; two different names have been printed for one and the same angle, and the theorem is the sentence that says so. Once you have written “P̂₁ = ∠PRQ (tan chord theorem)”, the rest is Grade 8 equation solving: take an x off both sides and the 25° is left standing on its own. The habit worth building is to hunt for the theorem BEFORE you hunt for the equation, because the equation is worthless without it — and in geometry the reason is always where the marks are.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: { en: "Write down the size of &nbsp;P̂₁." },
      hint: { en: "You have x now. P̂₁ was given in terms of it." },
      memo: [
        { type: "answer", text: { en: "P̂₁ = 2x = 2 × 25° = 50°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A one-mark part that exists to make sure you actually finish the job. Learners solve for x, feel pleased, and then forget that x was never the angle — it was a letter standing inside an expression for the angle. Always read back what the letter was doing before you write your final line. And take the free check while you are here: ∠PRQ was x + 25°, which is also 50°, so the two expressions really have landed on the same number, exactly as the theorem promised.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠PQR." },
      hint: { en: "The other chord out of P. P̂₃ is the tangent–chord angle on that side — so which point sits in its alternate segment?" },
      memo: [
        { type: "step", text: { en: "P̂₃ is the angle between tangent ST and chord PR, and ∠PQR is the angle in the alternate segment. &nbsp;&nbsp;<i>(tan chord theorem)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠PQR = P̂₃ = 60°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The same theorem as part (a), now used the ordinary way round: the tangent angle is known and the alternate-segment angle is what you want. Two chords leave P, so there are two tangent–chord pairs in this figure and the question uses both — chord PQ sending its angle to R, and chord PR sending its angle to Q. Say the chord's name out loud before you match anything, because the commonest mistake here is pairing P̂₃ with R instead of Q.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;P̂₂." },
      hint: { en: "The three angles at P sit side by side along the tangent ST." },
      memo: [
        { type: "step", text: { en: "ST is a straight line, so &nbsp;P̂₁ + P̂₂ + P̂₃ = 180° &nbsp;&nbsp;<i>(∠s on a str line)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ P̂₂ = 180° − 50° − 60° = 70°" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — in △PQR: &nbsp;P̂₂ = 180° − ∠PQR − ∠PRQ = 180° − 60° − 50° = 70° &nbsp;<i>(sum of ∠s in Δ)</i>. &nbsp;Same marks." } },
      ],
      esplain: {
        en: "Both roads are ordinary and both are worth full marks. Notice the pattern the two of them make together, because it is the real content of the tangent–chord theorem: the three angles on the tangent line at P are 50°, 70° and 60°, and the three angles of triangle PQR are 50°, 70° and 60° as well — the same three numbers, just standing in different places. The theorem is what shuffles them across the circle. Seeing that once makes the theorem far harder to forget than any amount of chanting it.",
      },
    },
    {
      id: "e",
      marks: 3,
      level: 3,
      prompt: { en: "Determine, with reasons, the size of &nbsp;∠OQR." },
      hint: { en: "First get the angle at the centre standing on the same chord as P̂₂. Then look at the triangle that angle sits in." },
      memo: [
        { type: "step", text: { en: "∠QOR = 2 · P̂₂ = 2 × 70° = 140° &nbsp;&nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i> — both stand on chord QR" }, ticks: ["s/f"] },
        { type: "step", text: { en: "OQ = OR &nbsp;<i>(radii)</i>, so ∠OQR = ∠ORQ &nbsp;&nbsp;<i>(∠s opp equal sides)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "In △OQR: &nbsp;∠OQR = (180° − 140°) ÷ 2 = 20°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The last part strings three separate facts together, and being able to see all three from the start is what separates a hard part from an easy one. First, P̂₂ and ∠QOR stand on the same chord QR, one from the circle and one from the centre, so the centre one is double. Second, OQ and OR are radii, so triangle OQR is isosceles and its two base angles match. Third, the angles of that triangle add to 180°. None of the three is hard on its own; the work is noticing that they chain. When you meet a part like this, write the chain down as three short lines before you calculate anything — the marker is paying for each of them.",
      },
    },
  ],
};

/* =====================================================================
   RIDER 3 — TWO TANGENTS FROM ONE POINT: THE KITE
   ---------------------------------------------------------------------
   `ext` computes P as the intersection of the tangents at A (66°) and
   B (294°), so A and B sit symmetrically about the line OP and the
   figure is a kite whether anybody says so or not.
     ∠OAP = ∠OBP = 90°           (tan ⊥ radius, given)
     ∠APB = 48°                  (given)
     ∠AOB = 360 − 90 − 90 − 48 = 132°     (sum of ∠s in quad OAPB)
     PA = PB, so △APB is isosceles: ∠PAB = (180 − 48)/2 = 66°
     ∠OAB = ∠OAP − ∠PAB = 90 − 66 = 24°   (and (180 − 132)/2 = 24° ✓)
     ∠APO = ∠BPO = 24°           (△OAP ≡ △OBP, RHS)
   M is the point where OP cuts AB — `mid` puts it at the midpoint of
   AB, which by the symmetry of the figure IS on OP, and part (f) is
   what proves that it has to be.
   Only the DISJOINT wedges are in the base spec: the two right-angle
   squares and ∠APB and ∠AOB. ∠PAB, ∠OAB and ∠APO each sit inside one
   of those, so each is drawn only by the highlight of its own part.
   ===================================================================== */
const TG3_BASE = {
  w: 340, h: 206, cx: 100, cy: 120, R: 62,
  O: true,
  pts: { A: 66, B: 294 },
  ext: [{ name: "P", t: ["A", "B"] }],
  /* NO MIDPOINT IS DRAWN HERE, and that is a decision rather than an
     omission. Every point the engine labels is labelled RADIALLY OUTWARD
     FROM THE CENTRE, and the point where OP cuts AB lies on the ray from
     O to P — so its letter is always printed on top of the line OP.
     Read off the first crop: the segment ran straight through the "M".
     Nothing in a spec can move it (the direction is computed from cx/cy
     and the point's own position), so the fix is to stop needing the
     point at all: part (f) proves that OP is the PERPENDICULAR BISECTOR
     of AB, which is a stronger statement than AM = MB and names no
     crossing point. The memo introduces M in words, exactly as a printed
     proof does.
     The 48° at P sits in the KEY for a related reason: the bisector of
     ∠APB IS the line PO, so a value parked on that bisector lands on
     that line. The key is where a value goes when its wedge has no clear
     ground — G1's rule, one case further on. */
  key: { at: "tr", lines: [{ t: "∠APB = 48°" }] },
  chords: [["O", "A"], ["O", "B"], ["A", "B"], ["O", "P"]],
  angles: [
    { at: "A", legs: ["O", "P"], t: "", o: { v: 90, mark: "square" } },
    { at: "B", legs: ["P", "O"], t: "", o: { v: 90, mark: "square" } },
    { at: "P", legs: ["A", "B"], t: "", o: { v: 48, ar: 26 } },
    { at: "O", legs: ["A", "B"], t: "", o: { v: 132, ar: 24 } },
  ],
};
const TG3_OAP = { at: "A", legs: ["O", "P"], v: 90, o: { mark: "square" } };
const TG3_OBP = { at: "B", legs: ["P", "O"], v: 90, o: { mark: "square" } };
const TG3_APB = { at: "P", legs: ["A", "B"], v: 48, o: { ar: 26, hlR: 26 } };
const TG3_AOB = { at: "O", legs: ["A", "B"], v: 132, o: { ar: 24, hlR: 24 } };
const TG3_PAB = { at: "A", legs: ["P", "B"], v: 66 };
const TG3_PBA = { at: "B", legs: ["P", "A"], v: 66 };
const TG3_OAB = { at: "A", legs: ["O", "B"], v: 24 };
const TG3_APO = { at: "P", legs: ["A", "O"], v: 24 };
const TG3_BPO = { at: "P", legs: ["B", "O"], v: 24 };
const TG3_CHAIN = [
  { n: "∠OAP", v: "90°" }, { n: "∠AOB", v: "132°" },
  { n: "∠PAB", v: "66°" }, { n: "∠OAB", v: "24°" },
];

const tg3 = {
  id: "euclid.sib.tg.q3",
  chapter: CH,
  topic: TOPIC,
  archetype: "two-tangents-from-one-point-kite-then-congruent-triangles-bisect-the-chord",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 12,
  intro: {
    en: "In the diagram, PA and PB are tangents to the circle with centre O, touching the circle at A and at B. &nbsp;OA, OB, AB and OP are drawn. &nbsp;∠APB = 48°.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(TG3_BASE, []),
        question: { angles: [TG3_OAP] },
        reveal: { angles: [TG3_OAP], chords: [["O", "A"], ["A", "P"]] },
      },
      b: {
        spec: specAfter(TG3_BASE, TG3_CHAIN.slice(0, 1)),
        question: { angles: [TG3_AOB] },
        reveal: { angles: [TG3_AOB, TG3_OAP, TG3_OBP, TG3_APB] },
      },
      c: {
        spec: specAfter(TG3_BASE, TG3_CHAIN.slice(0, 2)),
        question: { angles: [TG3_PAB] },
        reveal: { angles: [TG3_PAB, TG3_PBA], chords: [["A", "P", "t1"], ["P", "B", "t1"]] },
      },
      d: {
        spec: specAfter(TG3_BASE, TG3_CHAIN.slice(0, 3)),
        question: { angles: [TG3_OAB] },
        reveal: { angles: [TG3_OAB, TG3_PAB, TG3_OAP] },
      },
      e: {
        spec: specAfter(TG3_BASE, TG3_CHAIN.slice(0, 4)),
        question: { angles: [TG3_APO, TG3_BPO] },
        reveal: { angles: [TG3_APO, TG3_BPO, TG3_OAP, TG3_OBP], chords: [["O", "A", "t1"], ["O", "B", "t1"], ["O", "P"]] },
      },
      f: {
        spec: specAfter(TG3_BASE, TG3_CHAIN.slice(0, 4)),
        question: { chords: [["A", "B"], ["O", "P"]] },
        reveal: { chords: [["A", "B"], ["O", "P"], ["A", "P", "t1"], ["P", "B", "t1"]], angles: [TG3_APO, TG3_BPO] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: { en: "Give a reason why &nbsp;∠OAP = 90°." },
      hint: { en: "Look at what the two lines meeting at A actually are — one is a tangent, the other runs to the centre." },
      memo: [
        { type: "answer", text: { en: "PA is a tangent and OA is the radius to the point of contact &nbsp;&nbsp;<i>(tan ⊥ radius)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: pencil the right-angle square onto <b>every</b> tangent-and-radius pair the instant you read a diagram, before you even look at what is being asked. In this figure that is two right angles for free, and everything else is built on them.",
        } },
      ],
      esplain: {
        en: "A tangent touches the circle at exactly one point, and the radius to that point is the shortest possible line from the centre down to the tangent — and the shortest line from a point to a line is always the perpendicular one. That is the whole reason the angle is a right angle. In an exam this is one mark and thirty seconds, but its real value is what it unlocks: the moment you write 90° at A and 90° at B you have a quadrilateral with two right angles in it, and both of the next two parts live off that.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠AOB." },
      hint: { en: "O, A, P and B make a four-sided shape, and you already know three of its angles." },
      memo: [
        { type: "step", text: { en: "In quadrilateral OAPB: &nbsp;∠AOB + ∠OAP + ∠APB + ∠OBP = 360° &nbsp;&nbsp;<i>(sum of ∠s in quad)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠AOB = 360° − 90° − 48° − 90° = 132°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two tangents from one point always trap a four-sided shape between them: centre, contact point, external point, other contact point. Two of its corners are right angles, so once the angle at the outside point is given, the angle at the centre has nowhere to hide — it is 360° minus the other three. Worth noticing for later: the angle at O and the angle at P add to 180° here, which is exactly why OAPB is always a cyclic quadrilateral, whatever the numbers are.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with reasons, the size of &nbsp;∠PAB." },
      hint: { en: "How do the two tangent lengths PA and PB compare? And what does that make triangle APB?" },
      memo: [
        { type: "step", text: { en: "PA = PB &nbsp;<i>(tans from common pt)</i>, so ∠PAB = ∠PBA &nbsp;&nbsp;<i>(∠s opp equal sides)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "In △APB: &nbsp;∠PAB = (180° − 48°) ÷ 2 = 66°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two tangents drawn to a circle from the same outside point are always exactly the same length — think of the two ends of a piece of string pulled taut round a ball. That one fact turns triangle APB into an isosceles triangle for free, which means its two base angles match, which means the given 48° at the top shares out the remaining 132° evenly between them. Whenever you see two tangents from one point, write “PA = PB (tans from common pt)” straight away, even before you know what the question wants — it is nearly always the line the rest of the answer hangs on.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠OAB." },
      hint: { en: "The chord AB cuts the right angle at A into two pieces, and you have just found one of them." },
      memo: [
        { type: "step", text: { en: "∠OAP = ∠OAB + ∠PAB &nbsp;&nbsp;<i>(tan ⊥ radius)</i> gives ∠OAP = 90°" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠OAB = 90° − 66° = 24°" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — through the isosceles triangle at the centre: &nbsp;OA = OB &nbsp;<i>(radii)</i>, so in △OAB, &nbsp;∠OAB = (180° − 132°) ÷ 2 = 24° &nbsp;<i>(∠s opp equal sides; sum of ∠s in Δ)</i>. &nbsp;Same marks." } },
        { type: "trap", text: {
          en: "REMEMBER: the two roads agreeing is not luck — it is the figure being consistent with itself. If your two answers had disagreed, a mistake would be sitting somewhere behind you, and finding it then is far cheaper than finding it at the end.",
        } },
      ],
      esplain: {
        en: "The chord AB splits the right angle at A into an inside piece and an outside piece: ∠OAB leaning towards the centre and ∠PAB leaning towards P. Since the whole thing is 90°, knowing one hands you the other. The second road is worth knowing too, because it never touches the tangents at all — it just uses the isosceles triangle the two radii make. Two independent routes to the same 24° is the sort of thing that should make you confident rather than suspicious: the picture is behaving exactly as the theorems say it must.",
      },
    },
    {
      id: "e",
      marks: 2,
      level: 3,
      prompt: { en: "Prove that &nbsp;∠APO = ∠BPO." },
      hint: { en: "Compare triangle OAP with triangle OBP. What do they share, and what do you already know about each of them?" },
      memo: [
        { type: "step", text: { en: "In △OAP and △OBP: &nbsp;∠OAP = ∠OBP = 90° &nbsp;<i>(tan ⊥ radius)</i>; &nbsp;OP = OP &nbsp;<i>(common)</i>; &nbsp;OA = OB &nbsp;<i>(radii)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ △OAP ≡ △OBP &nbsp;&nbsp;<i>(RHS)</i><br>∴ ∠APO = ∠BPO" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: congruency needs <b>three</b> facts and the right label. Right angle, hypotenuse, side &nbsp;⟹&nbsp; <b>RHS</b>. Writing SSS or SAS here scores nothing, even though the two triangles really are congruent.",
        } },
      ],
      esplain: {
        en: "This is where the kite in the picture becomes a proof rather than a feeling. The two triangles OAP and OBP each have a right angle, they share the whole line OP as a hypotenuse, and their remaining sides OA and OB are radii, so they are the same length. Right angle, hypotenuse, side — that is RHS, and congruent triangles have every matching part equal, including the two angles at P. What you have really proved is that OP bisects the angle between the two tangents, which is true of every pair of tangents from a point and is worth remembering as a fact in its own right.",
      },
    },
    {
      id: "f",
      marks: 3,
      level: 3,
      prompt: { en: "Prove that &nbsp;OP&nbsp; is the perpendicular bisector of &nbsp;AB." },
      hint: { en: "Call the point where OP cuts AB &nbsp;M. Look at the two small triangles PAM and PBM — you now own a side, the angle between them, and another side in each." },
      memo: [
        { type: "step", text: { en: "Let OP cut AB at M. &nbsp;In △PAM and △PBM: &nbsp;PA = PB &nbsp;<i>(tans from common pt)</i>; &nbsp;∠APM = ∠BPM &nbsp;<i>(proved in (e))</i>; &nbsp;PM = PM &nbsp;<i>(common)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∴ △PAM ≡ △PBM &nbsp;&nbsp;<i>(SAS)</i>, &nbsp;so &nbsp;AM = MB &nbsp;and&nbsp; ∠AMP = ∠BMP" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∠AMP + ∠BMP = 180° &nbsp;&nbsp;<i>(∠s on a str line)</i>, so each is 90°<br>∴ OP bisects AB and OP ⊥ AB — OP is the perpendicular bisector of AB" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: for <b>SAS</b> the angle has to sit BETWEEN the two sides you named. ∠APM is squeezed between PA and PM, and ∠BPM between PB and PM, so the label is honest. An angle anywhere else in the triangle would not be SAS at all. And “perpendicular bisector” is TWO claims — cut in half AND at right angles — so both have to be written down.",
        } },
      ],
      esplain: {
        en: "The last part is the pay-off for part (e): once you know OP splits the angle at P into two equal halves, the two little triangles either side of it match on a side, the angle between, and another side — which is SAS. Congruent triangles have equal everything, so the two halves of AB are equal AND the two angles at the crossing point are equal — and since those two also sit on a straight line, each of them must be 90°. What you have proved is true of every pair of tangents from an outside point: the line from the centre to that point always cuts the chord of contact in half and at right angles. Bank the earlier marks first — this part needs three of them before it can start.",
      },
    },
  ],
};

/* =====================================================================
   RIDER 4 — A TANGENT AND A DIAMETER
   ---------------------------------------------------------------------
   Tangent SU touches at T (270°); TD is a diameter, so D sits at 90°.
   A is at 20°.
     ∠DTS = 90°                       (tan ⊥ diameter, part (a))
     ∠ATU = 55°   (given)  = ½·arc TA = ½(110°)
     ∠ATD = 180 − 90 − 55 = 35°       (∠s on a str line)
     ∠TAD = 90°                       (∠s in semi-circle)
     ∠ADT = 180 − 90 − 35 = 55°       (sum of ∠s in Δ) — and equal to
                                       ∠ATU, which is the tan chord
                                       theorem showing up on its own
     ∠AOD = 2 × ∠ATD = 70°            (∠ at centre = 2 × ∠ at circumference)
   Three DISJOINT wedges at T (S → D → A → U), only one of them
   labelled, so nothing there needs numbering.
   ===================================================================== */
const TG4_BASE = {
  /* 20 px wider than TANG_CANVAS, for the same reason tg.q2 is 60 px
     wider: this rider's key grows to "∠ADT = 55°", whose left edge lands
     12 px from A's point label, and at 375 px the two read as one string.
     The circle itself is unchanged. */
  ...TANG_CANVAS, w: 360,
  O: true,
  pts: { T: 270, D: 90, A: 20 },
  tang: [{ at: "T", len: 112, lab: ["S", "U"] }],
  chords: [["T", "D"], ["T", "A"], ["A", "D"], ["O", "A"]],
  angles: [
    { at: "T", legs: ["D", "tg-"], t: "", o: { v: 90, mark: "square" } },
    { at: "T", legs: ["A", "D"], t: "", o: { v: 35, ar: 30 } },
    { at: "T", legs: ["A", "tg+"], t: "55°", o: { v: 55, r: 52, ar: 40 } },
    { at: "A", legs: ["T", "D"], t: "", o: { v: 90, mark: "square" } },
    { at: "D", legs: ["A", "T"], t: "", o: { v: 55, ar: 22 } },
    { at: "O", legs: ["A", "D"], t: "", o: { v: 70, ar: 18 } },
  ],
};
const TG4_DTS = { at: "T", legs: ["D", "tg-"], v: 90, o: { mark: "square" } };
const TG4_ATD = { at: "T", legs: ["A", "D"], v: 35, o: { ar: 30, hlR: 30 } };
const TG4_ATU = { at: "T", legs: ["A", "tg+"], v: 55, o: { ar: 40, hlR: 40 } };
const TG4_TAD = { at: "A", legs: ["T", "D"], v: 90, o: { mark: "square" } };
const TG4_ADT = { at: "D", legs: ["A", "T"], v: 55, o: { ar: 22, hlR: 22 } };
const TG4_AOD = { at: "O", legs: ["A", "D"], v: 70, o: { ar: 18, hlR: 18 } };
const TG4_CHAIN = [
  { n: "∠DTS", v: "90°" }, { n: "∠ATD", v: "35°" },
  { n: "∠TAD", v: "90°" }, { n: "∠ADT", v: "55°" },
];

const tg4 = {
  id: "euclid.sib.tg.q4",
  chapter: CH,
  topic: TOPIC,
  archetype: "tangent-plus-diameter-angle-in-semicircle-then-angle-at-the-centre",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 10,
  intro: {
    en: "In the diagram, O is the centre of the circle and &nbsp;SU&nbsp; is a tangent to the circle at T. &nbsp;TD is a diameter and A is a point on the circle. &nbsp;TA, AD and OA are drawn. &nbsp;∠ATU = 55°.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(TG4_BASE, []),
        question: { angles: [TG4_DTS] },
        reveal: { angles: [TG4_DTS], chords: [["T", "D"]] },
      },
      b: {
        spec: specAfter(TG4_BASE, TG4_CHAIN.slice(0, 1)),
        question: { angles: [TG4_ATD] },
        reveal: { angles: [TG4_ATD, TG4_DTS, TG4_ATU] },
      },
      c: {
        spec: specAfter(TG4_BASE, TG4_CHAIN.slice(0, 2)),
        question: { angles: [TG4_TAD] },
        reveal: { angles: [TG4_TAD], chords: [["T", "D"]] },
      },
      d: {
        spec: specAfter(TG4_BASE, TG4_CHAIN.slice(0, 3)),
        question: { angles: [TG4_ADT] },
        reveal: { angles: [TG4_ADT, TG4_TAD, TG4_ATD] },
      },
      e: {
        spec: specAfter(TG4_BASE, TG4_CHAIN.slice(0, 4)),
        question: { angles: [TG4_ADT] },
        reveal: { angles: [TG4_ADT, TG4_ATU], chords: [["T", "A"]] },
      },
      f: {
        spec: specAfter(TG4_BASE, TG4_CHAIN.slice(0, 4)),
        question: { angles: [TG4_AOD] },
        reveal: { angles: [TG4_AOD, TG4_ATD] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: { en: "Give a reason why &nbsp;∠DTS = 90°." },
      hint: { en: "TD is not just any chord — the question tells you what it is. And SU is not just any line." },
      memo: [
        { type: "answer", text: { en: "SU is a tangent and TD is the diameter through the point of contact &nbsp;&nbsp;<i>(tan ⊥ diameter)</i>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "This is the same theorem as “tangent perpendicular to radius” — a diameter is only two radii laid end to end, so a line at right angles to the radius at T is at right angles to the whole diameter as well. The SAG lists both wordings and a marker accepts either, so use whichever matches the picture in front of you: if the question drew the radius, say radius; if it drew the diameter, say diameter. Small thing, but it is the difference between a reason that reads naturally and one the marker has to translate.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠ATD." },
      hint: { en: "The three angles at T sit side by side along the straight tangent line SU." },
      memo: [
        { type: "step", text: { en: "SU is a straight line, so &nbsp;∠DTS + ∠ATD + ∠ATU = 180° &nbsp;&nbsp;<i>(∠s on a str line)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠ATD = 180° − 90° − 55° = 35°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Nothing about circles at all — just the Grade 8 fact that angles resting on a straight line add to 180°. The only skill is reading which three angles are sharing that line at T: the right angle up to the diameter, the piece between the diameter and the chord TA, and the given 55° between TA and the tangent's far end. Writing the three of them out in order before you subtract stops you taking 55° off 90° and calling it a day when the picture has three pieces, not two.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠TAD." },
      hint: { en: "A is on the circle, and ∠TAD is standing on TD. What is special about TD?" },
      memo: [
        { type: "step", text: { en: "TD is a diameter and ∠TAD stands on it. &nbsp;&nbsp;<i>(∠s in semi-circle)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠TAD = 90°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this only works because TD goes <b>through the centre</b>. An angle standing on an ordinary chord can be any size at all — check that the chord really is a diameter before you write 90°.",
        } },
      ],
      esplain: {
        en: "A diameter cuts the circle into two halves, and any point you pick on either half looks back at the two ends of that diameter through exactly a right angle. It is one of the most useful facts in the chapter, because it hands you a 90° with no working — and a right angle turns a triangle into something you can finish with the angle sum, or with Pythagoras if lengths are involved. The habit to build: whenever you see a chord that passes through the centre, mark every angle standing on it with a little right angle before you even read what the question wants.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠ADT." },
      hint: { en: "Triangle ATD now has two of its three angles on your page." },
      memo: [
        { type: "step", text: { en: "In △ATD: &nbsp;∠ADT + ∠TAD + ∠ATD = 180° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠ADT = 180° − 90° − 35° = 55°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The right angle you found in part (c) is what makes this a one-line part rather than a hunt: a triangle with a known right angle and one other known angle is completely determined. Look at the answer for a second before you move on — 55°, which is exactly the given angle between the tangent and the chord TA at the other end of the picture. That is the tangent–chord theorem showing up on its own, without being invited, and the next part is going to ask you to notice it.",
      },
    },
    {
      id: "e",
      marks: 2,
      level: 2,
      prompt: { en: "Write down another angle in the figure that is equal to &nbsp;∠ADT, and give a reason." },
      hint: { en: "∠ADT sits in the segment on the far side of chord TA. Is there an angle squeezed between that chord and the tangent?" },
      memo: [
        { type: "answer", text: { en: "∠ATU = ∠ADT = 55° &nbsp;&nbsp;<i>(tan chord theorem)</i> — the tangent–chord angle on chord TA, and the angle in the alternate segment" }, ticks: ["a", "a"] },
        { type: "trap", text: {
          en: "REMEMBER: the marker pays for the ANGLE and for the REASON separately. Writing “∠ATU” with nothing beside it collects half of this part.",
        } },
      ],
      esplain: {
        en: "Two marks for spotting a theorem you were not told to use. The chord is TA; the angle it makes with the tangent at T is the given 55°; and D is sitting on the far side of TA, in the alternate segment — so the angle chord TA makes at D has to be that same 55°. What is nice about this figure is that you found ∠ADT the long way round, through a right angle and an angle sum, and the tangent–chord theorem would have handed it to you in one line. Both are worth full marks, but in an exam the one-line route leaves you time for the parts that need it.",
      },
    },
    {
      id: "f",
      marks: 1,
      level: 3,
      prompt: { en: "Write down the size of &nbsp;∠AOD." },
      hint: { en: "∠AOD is at the centre, standing on chord AD. Which angle at the circumference stands on that same chord?" },
      memo: [
        { type: "answer", text: { en: "∠AOD = 2 · ∠ATD = 2 × 35° = 70° &nbsp;&nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "One mark, one line, and the reason is the mark. The chord is AD; T is out on the circumference looking at it, O is the centre looking at it, so the one at the centre is double. The only thing to be careful about is picking the right angle at T: it is ∠ATD, the piece between the two chords, and not the 55° between the chord and the tangent. When a figure has several angles at one vertex, always name the chord first and then choose the angle that stands on it — never the other way round.",
      },
    },
  ],
};

/* =====================================================================
   RIDER 5 — THE TANGENT LENGTH, BY PYTHAGORAS
   ---------------------------------------------------------------------
   The one rider on this tile that is about LENGTHS. PA and PB are
   tangents; OA = 9 cm is the radius and OP = 15 cm, so the right
   triangle OAP is the 9 : 12 : 15 one and PA = 12 cm.
   The DRAWING carries the same ratio: R = 60 px and `ext` puts P at
   R / cos(53,130102°) = 100 px from O, so OA : OP is 60 : 100 = 9 : 15
   exactly, and PA measures 80 px = 12 units. The picture is to scale in
   lengths as well as in angles.
     area OAPB = 2 × ½ × 9 × 12 = 108 cm²
     area △OAP two ways: ½ × 9 × 12 = 54 = ½ × 15 × AM ⟹ AM = 7,2 cm
     AB = 2 × AM = 14,4 cm            (line from centre ⊥ to chord)
   ===================================================================== */
const TG5_BASE = {
  w: 340, h: 206, cx: 110, cy: 120, R: 60,
  O: true,
  pts: { A: 53.130102, B: 306.869898 },
  ext: [{ name: "P", t: ["A", "B"] }],
  /* NO MIDPOINT IS DRAWN — see tg.q3's spec for the whole reasoning. A
     point on the ray from O to P always has its letter printed on top of
     OP, and here the right-angle square at the crossing collided with it
     as well. M is named in the STEM instead, and the figure shows the two
     lines crossing without lettering the crossing; "OP ⊥ AB" is a
     sentence in the stem, which is where a given like that belongs. */
  key: { at: "tr", lines: [{ t: "OA = 9 cm" }, { t: "OP = 15 cm" }] },
  chords: [["O", "A"], ["O", "B"], ["A", "B"], ["O", "P"]],
  angles: [
    { at: "A", legs: ["O", "P"], t: "", o: { v: 90, mark: "square" } },
    { at: "B", legs: ["P", "O"], t: "", o: { v: 90, mark: "square" } },
  ],
};
const TG5_OAP = { at: "A", legs: ["O", "P"], v: 90, o: { mark: "square" } };
const TG5_OBP = { at: "B", legs: ["P", "O"], v: 90, o: { mark: "square" } };
const TG5_CHAIN = [
  { n: "PA", v: "12 cm" }, { n: "PB", v: "12 cm" }, { n: "AM", v: "7,2 cm" },
];

const tg5 = {
  id: "euclid.sib.tg.q5",
  chapter: CH,
  topic: TOPIC,
  archetype: "tangent-length-by-pythagoras-then-area-two-ways-to-reach-the-half-chord",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 11,
  intro: {
    en: "In the diagram, PA and PB are tangents to the circle with centre O, touching the circle at A and at B. &nbsp;OA, OB, AB and OP are drawn. &nbsp;OP cuts AB at M, and OP ⊥ AB. &nbsp;OA = 9 cm &nbsp;and&nbsp; OP = 15 cm.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(TG5_BASE, []),
        question: { angles: [TG5_OAP], chords: [["O", "A"], ["A", "P"], ["O", "P"]] },
        reveal: { angles: [TG5_OAP], chords: [["A", "P"]] },
      },
      b: {
        spec: specAfter(TG5_BASE, TG5_CHAIN.slice(0, 1)),
        question: { chords: [["P", "B"]] },
        reveal: { chords: [["A", "P", "t1"], ["P", "B", "t1"]] },
      },
      c: {
        spec: specAfter(TG5_BASE, TG5_CHAIN.slice(0, 2)),
        question: { chords: [["O", "A"], ["A", "P"], ["P", "B"], ["B", "O"]] },
        reveal: { chords: [["O", "A"], ["A", "P"], ["P", "B"], ["B", "O"]], angles: [TG5_OAP, TG5_OBP] },
      },
      d: {
        spec: specAfter(TG5_BASE, TG5_CHAIN.slice(0, 2)),
        question: { chords: [["A", "B"], ["O", "P"]] },
        reveal: { chords: [["O", "A"], ["A", "P"], ["O", "P"]], angles: [TG5_OAP] },
      },
      e: {
        spec: specAfter(TG5_BASE, TG5_CHAIN.slice(0, 3)),
        question: { chords: [["A", "B"]] },
        reveal: { chords: [["A", "B"], ["O", "P"]] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: { en: "Calculate the length of &nbsp;PA." },
      hint: { en: "What kind of triangle is OAP? Once you know the angle at A, there is only one tool for a missing side." },
      memo: [
        { type: "step", text: { en: "∠OAP = 90° &nbsp;&nbsp;<i>(tan ⊥ radius)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "In △OAP: &nbsp;PA² = OP² − OA² = 15² − 9² = 225 − 81 = 144 &nbsp;&nbsp;<i>(Pythagoras)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ PA = 12 cm" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: OP is the <b>hypotenuse</b>, because the right angle is at A. So it is 15² − 9², not 15² + 9². Adding gives 17,5 cm, which is longer than the line from O to P — impossible, and a quick look at the picture would have caught it.",
        } },
      ],
      esplain: {
        en: "The tangent–radius right angle is what turns a circle question into a Pythagoras question. Once you have written 90° at A, triangle OAP is right-angled, and the side you want is one of the short ones — so you subtract rather than add. Deciding which side is the hypotenuse is the whole skill: it is always the one OPPOSITE the right angle, which here is OP running from the centre out to P. Sketching the triangle on its own, away from the circle, is a good habit when a figure gets busy; the numbers 9, 12 and 15 are just three times the 3, 4, 5 triangle, which is worth recognising on sight.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: { en: "Write down the length of &nbsp;PB." },
      hint: { en: "There is a theorem about the two tangents drawn to a circle from the same point outside it." },
      memo: [
        { type: "answer", text: { en: "PB = PA = 12 cm &nbsp;&nbsp;<i>(tans from common pt)</i>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two tangents from the same outside point are always the same length — picture a piece of string pulled taut round a ball from one hand. It is a one-line, one-mark fact, and “write down” is the examiner telling you no working is expected. The reason is where the mark actually is, so never leave it off. It is also the fact that makes the whole figure a kite: two pairs of equal adjacent sides, OA = OB and PA = PB.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: { en: "Calculate the area of quadrilateral &nbsp;OAPB." },
      hint: { en: "The two right angles cut the shape into two triangles you can find the area of without any trigonometry at all." },
      memo: [
        { type: "step", text: { en: "area OAPB = area △OAP + area △OBP = 2 × ½ × OA × PA &nbsp;&nbsp;<i>(RHS)</i> makes the two triangles identical" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "= 2 × ½ × 9 × 12 = 108 cm²" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Area questions inside circle geometry look alarming until you notice the right angles. A right-angled triangle's area is half of one short side times the other, no formula sheet needed. Here the two triangles OAP and OBP are congruent — same right angle, same shared hypotenuse OP, same radius — so working out one and doubling it is enough. Watch your units: lengths were in centimetres, so the area comes out in square centimetres, and dropping the little 2 costs marks in every subject that uses it.",
      },
    },
    {
      id: "d",
      marks: 3,
      level: 3,
      prompt: { en: "Calculate the length of &nbsp;AM." },
      hint: { en: "Find the area of triangle OAP twice — once using the two sides round the right angle, and once using OP as the base with AM as its height." },
      memo: [
        { type: "step", text: { en: "area △OAP = ½ × OA × PA = ½ × 9 × 12 = 54 cm²" }, ticks: ["s/f"] },
        { type: "step", text: { en: "AM ⊥ OP, so the same triangle has base OP and height AM: &nbsp;area △OAP = ½ × OP × AM = ½ × 15 × AM" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ ½ × 15 × AM = 54 &nbsp;&nbsp;⟹&nbsp;&nbsp; AM = 7,2 cm" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: a triangle has three bases and three matching heights, and its area is the same whichever pair you use. The height that goes with base OP is the perpendicular from A down to OP — which is AM, and only because the question told you OP ⊥ AB.",
        } },
      ],
      esplain: {
        en: "This is the trick worth learning from this question: the area of one triangle, worked out two different ways, gives you an equation. Using the two sides round the right angle is easy, and it gives a number. Using OP as the base needs the perpendicular height from A, which is exactly AM — so the second version is an expression containing the thing you want. Setting them equal and solving is ordinary algebra. It comes up again and again in geometry and in Grade 12 trigonometry, and it saves you from having to find an angle first.",
      },
    },
    {
      id: "e",
      marks: 2,
      level: 3,
      prompt: { en: "Hence determine, with a reason, the length of &nbsp;AB." },
      hint: { en: "OP comes from the centre and meets the chord AB at right angles. There is a theorem about what a line like that does to a chord." },
      memo: [
        { type: "step", text: { en: "OM ⊥ AB, so &nbsp;AM = MB &nbsp;&nbsp;<i>(line from centre ⊥ to chord)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ AB = 2 × 7,2 = 14,4 cm" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The last piece is a chord theorem rather than a tangent one: a line drawn from the centre at right angles to a chord always cuts that chord exactly in half. So AM is not just some piece of AB, it is precisely half of it, and doubling finishes the question. Check the answer against the picture — AB should be a bit longer than the radius of 9 cm and a good deal shorter than the diameter of 18 cm, and 14,4 cm sits comfortably between them. That kind of quick reasonableness check is worth doing on every length you calculate.",
      },
    },
  ],
};

export const euclidTangentsSiblingQuestions = [tg1, tg2, tg3, tg4, tg5];
