/* ============================================================
   EXAM FOCUS — Euclidean geometry · SIBLING CARDS for the tile
   "chords-and-angles" (Chords, centre & angles)
   (Exam Focus build day, 2026-08-23 — EXAM-BUILD-DAY.md ruling 4,
   session G1.)
   ------------------------------------------------------------
   FIVE CHAINED RIDERS. The sixth card on this tile is the re-homed
   `euclid.circ.t2q4` (b1, b2) — the line-from-the-centre-⊥-chord
   Pythagoras calculation — cut on by js/exam/cards-euclid.js, so
   nothing here re-composes it.

   HER DESIGN, in her own words (EXAM-BUILD-DAY.md ruling 4, and the
   G1 brief): "Give them the sketch and then one question at a time.
   Let the questions in each round run on ONE sketch: give the sketch,
   the first question is to find Ô₁ in that sketch, then the next
   question shows Ô₁'s value that was just worked out ON the sketch,
   and asks another question about that same sketch. And so on — 5–6
   questions on the same sketch, each time adding the value to the
   sketch." Plus, like Circle Quest's adventure rounds: "some rounds
   give the values already and only ask for the reason, some give the
   reason and only ask for the value, others ask for both."

   So every rider below is ONE figure and 5–6 dependent parts, and the
   parts are deliberately mixed:
     VALUE + REASON  "Determine, with a reason, the size of Ô₁"
     REASON ONLY     "∠ADB = 90°. Give a reason for this."
     VALUE ONLY      "Use ∠s in the same seg to write down Â₂"
   Levels 1–3 only. Nothing on this tile is starred (her ruling 5 —
   the ★ questions live on the Level 4 tile, which is session G2's).

   ---------------------------------------------------------------
   HOW A VALUE GETS "ADDED TO THE SKETCH" — and why it is a KEY line
   rather than a number written on the wedge.

   `specAfter(base, found)` below returns a deep clone of a rider's
   base spec whose VALUE KEY (the engine's `d.key`, her own design from
   2026-08-12, built from her Canva mock-up) carries one line per value
   already worked out — "Ô₁ = 110°", "B̂₁ = 35°" — beside the circle.
   Part n's diagram entry uses `specAfter(BASE, everything parts 1…n−1
   found)`, so the sketch really does grow as the learner works, and
   part n's own answer is never on it before part n is revealed.

   WHY NOT THE NUMBER ON THE WEDGE. That was the first build, and it
   was measured rather than guessed. The room a value has inside a
   central wedge ∠AOB is the distance from O to chord AB, R·cos(½∠) —
   for the big central wedges these riders are built on that is 26–38
   px, while "140°" is a 40 px wide box that has to sit on the
   bisector. Every one of them ran into the chord, and shrinking `o.r`
   only ran them into the centre dot instead. The engine's own header
   describes exactly this problem and exactly this fix: "keep the SHORT
   NAME on the wedge (O₁ / O₂ / ∠A, where the learner needs it to read
   the picture) and move the VALUE to a colour-matched key beside the
   circle, the way a textbook does it."

   SO: WEDGES CARRY NAMES, THE KEY CARRIES VALUES — one rule per
   vertex, so nothing on a figure is ambiguous:
     · a vertex with ONE marked wedge is named by three letters in the
       prompts (∠OAB, ∠ACO, ∠ADB) and its wedge carries the GIVEN
       value if it has one ("35°", "x"), or no text at all;
     · a vertex with TWO OR MORE marked wedges is numbered IEB-style —
       every wedge there gets "1", "2", "3" — and if one of them is a
       GIVEN, its value goes into the key from the start rather than
       sitting next to a number and being mistaken for one. That is
       what `baseKey` is on the two riders that need it.

   THE REVEAL. Because the value lands in the key of the NEXT part's
   spec, a part's own reveal does something better than repeating the
   number: it lights the PAIR the reason is about — the isosceles
   partner, the two angles in the same segment, the centre-and-
   circumference pair, or (ca2(f)) the two chords being proved
   parallel. That is her marker-pen design and it is what makes the
   reason visible rather than merely written.

   ---------------------------------------------------------------
   LABEL PLACEMENT IS A MEASURED THING, NOT A DEFAULT. The engine's
   automatic label radius is tuned for Circle Quest's much sparser
   figures; on a rider carrying seven wedges it pushes labels 44–86 px
   out, and at 375 px a label 44 px from A lands closer to C than to A.
   That really happened — the first shoot of this file put C's "2" and
   D's "1" side by side in the middle of the circle, and a learner
   could not tell which vertex either belonged to.

   THE NUMBERS NOW SIT INSIDE THEIR ARCS (her phone review, 2026-08-23:
   "the angle numbering — the 1, 2 and 3 labels — I think we can make
   that font a bit smaller and also put it INSIDE the angle arc"). That
   placement is AUTOMATIC in the engine for any label that is a bare
   digit — js/exam/circle-engine.js's idxLabelR puts it at 0,55 of its
   own arc radius, between the vertex and the arc — so a numbered wedge
   here sets NO `o.r` at all and controls the digit purely through
   `o.ar`. An explicit `o.r` OVERRIDES the rule, so it is used exactly
   once in this file, on rider 4's Ô₁, where the engine's "O" letter has
   nowhere to go but that wedge's bisector; the reason is written at the
   line. Anywhere else, reach for `o.ar`.

   So `o.ar` is now the tuning dial, and it carries two jobs:
     · TWO WEDGES AT ONE VERTEX GET CLEARLY DIFFERENT ARCS (roughly a
       1,8× ratio, e.g. 22 and 40), because their digits now live close
       in and only radial separation keeps them apart. Nested arcs at a
       shared vertex is the IEB figure convention anyway.
     · AN ARC MUST NOT CROSS A DRAWN CHORD. A central wedge's chord sits
       R·cos(½∠) from O — 33 px for a 130° wedge on this canvas — so the
       arc has to stay inside that, which caps how far out its digit can
       go. Every `ar` below was measured against that distance, and the
       narrow wedges (20–30°) get the LARGER arc of their pair so the
       digit has width to sit in.
   Value labels ("35°", "x") are untouched by the rule and still set
   their own `o.r`. Read the crops after any change to these numbers.

   ---------------------------------------------------------------
   EVERY NUMBER ON EVERY FIGURE IS REAL. Each rider's point degrees
   were chosen by arc arithmetic (an inscribed angle is half its arc; a
   central angle IS its arc) so that every stated angle measures
   exactly. `validateQuestion` re-measures every wedge — base spec,
   every per-part spec, and every highlighted variant — through the
   engine's own verifyDiagram at a 1,5° tolerance, and
   verify-exam-modules.mjs section 9g recomputes the same values a
   second time from the degrees alone. Nothing here is eyeballed.

   Shared canvas for all five: 360 × 254, centre (150 ; 120), R = 78 —
   wide enough that the key block in the top-right corner clears the
   outermost point label by ~15 px.

   REASONS ARE VERBATIM SAG SHORT FORMS (EUCLID-ACCEPTABLE-REASONS.md).
   TICK CONVENTION, the same one euclid-circle-theorems.js uses:
     ✓s/f  the reason-bearing line that sets the work up
     ✓ca   a derived intermediate statement
     ✓a    the size itself
   IEB pays for the STATEMENT and the REASON separately, which is why a
   two-mark "determine, with a reason" part is two lines, not one — the
   first trap card on the tile says so out loud.

   lostQuest: the documented euclid placeholder (no "I'm lost" button
   on this chapter — her ruling). See euclid-circle-theorems.js.
   ============================================================ */

const CH = "euclid";
const TOPIC = "chords-and-angles";
const PAPER = "siblings";
const LOST_PENDING = { chapter: "euclid", quest: "PENDING-euclid-is-exam-only-no-drill-round" };

/* the one canvas every rider is drawn on */
const CANVAS = { w: 360, h: 254, cx: 150, cy: 120, R: 78 };

/* A deep clone of `base` whose value key lists everything known so far:
   the base spec's OWN key lines first (a given that could not sit on a
   numbered wedge), then one line per value the earlier parts found.
   `found` is an ordered list of { n, v } — the angle's name as the
   prompts spell it, and its value as the memo gives it. `base` is never
   mutated, so one base spec serves all six parts of a rider. */
function specAfter(base, found) {
  const out = JSON.parse(JSON.stringify(base));
  const given = (base.key && base.key.lines) || [];
  const lines = [...given.map(l => ({ t: l.t })), ...(found || []).map(f => ({ t: `${f.n} = ${f.v}` }))];
  if (lines.length) out.key = { at: "tr", lines };
  else delete out.key;
  return out;
}

/* =====================================================================
   RIDER 1 — TWO ISOSCELES RADII TRIANGLES, THEN THE ANGLE AT THE CENTRE
   ---------------------------------------------------------------------
   A 200°, B 90°, C 350°, so
     ∠AOB = 110°  ∠BOC = 100°  ∠AOC = 150°   (110 + 100 + 150 = 360)
   Chords AB and BC are drawn, and the three radii — but NOT chord AC,
   deliberately: with AC absent the wedge ∠AOC has the whole radius to
   put its label in, and nothing in the six parts needs that chord.
   △OAB is isosceles with base angles (180 − 110)/2 = 35°, △OBC with
   base angles (180 − 100)/2 = 40°, so ∠OAB = 35° and ∠OCB = 40° are
   the two GIVENS, and ∠ABC = 35 + 40 = 75 = ½ × 150 — the angle-at-
   centre theorem falling out of the chase at the end.
   Numbering runs anticlockwise where a vertex carries two wedges:
     at O   Ô₁ = ∠BOA (110°)  Ô₂ = ∠AOC (150°)  Ô₃ = ∠COB (100°)
     at B   B̂₁ = ∠ABO (35°)   B̂₂ = ∠OBC (40°)
   A and C carry one wedge each, so they are named in full and their
   given values sit on the wedge.
   ===================================================================== */
const CA1_BASE = {
  ...CANVAS,
  O: true,
  pts: { A: 200, B: 90, C: 350 },
  chords: [["A", "B"], ["B", "C"], ["O", "A"], ["O", "B"], ["O", "C"]],
  angles: [
    { at: "A", legs: ["O", "B"], t: "35°", o: { v: 35, r: 36, ar: 20 } },
    { at: "C", legs: ["B", "O"], t: "40°", o: { v: 40, r: 36, ar: 20 } },
    { at: "B", legs: ["A", "O"], t: "1", o: { v: 35, ar: 40 } },
    { at: "B", legs: ["O", "C"], t: "2", o: { v: 40, ar: 22 } },
    { at: "O", legs: ["B", "A"], t: "1", o: { v: 110, ar: 26 } },
    { at: "O", legs: ["A", "C"], t: "2", o: { v: 150, ar: 50 } },
    { at: "O", legs: ["C", "B"], t: "3", o: { v: 100, ar: 34 } },
  ],
};
/* Every highlight below repeats its wedge's OWN `ar`. Without it the
   marker-pen entry falls back to the engine's default arc (22 / 25) and
   draws a SECOND arc a few px from the authored one — two rings round one
   wedge, and, now that a numbered label sits at 0,55 of the authored arc,
   a digit that can land exactly on that second ring. Same radius in, one
   arc out, the amber pie under it. */
const CA1_OAB = { at: "A", legs: ["O", "B"], v: 35, o: { ar: 20 } };
const CA1_OCB = { at: "C", legs: ["B", "O"], v: 40, o: { ar: 20 } };
const CA1_B1 = { at: "B", legs: ["A", "O"], v: 35, o: { ar: 40, hlR: 40 } };
const CA1_B2 = { at: "B", legs: ["O", "C"], v: 40, o: { ar: 22 } };
const CA1_O1 = { at: "O", legs: ["B", "A"], v: 110, o: { ar: 26 } };
const CA1_O2 = { at: "O", legs: ["A", "C"], v: 150, o: { ar: 50, hlR: 50 } };
const CA1_O3 = { at: "O", legs: ["C", "B"], v: 100, o: { ar: 34 } };
const CA1_CHAIN = [
  { n: "B̂₁", v: "35°" }, { n: "Ô₁", v: "110°" }, { n: "B̂₂", v: "40°" },
  { n: "Ô₃", v: "100°" }, { n: "Ô₂", v: "150°" },
];

const ca1 = {
  id: "euclid.sib.ca.q1",
  chapter: CH,
  topic: TOPIC,
  archetype: "angle-chase-isosceles-radii-then-angles-round-a-point-then-angle-at-centre",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 11,
  intro: {
    en: "In the diagram, O is the centre of the circle and A, B and C are points on the circle. &nbsp;OA, OB, OC and the chords AB and BC are drawn. &nbsp;∠OAB = 35° &nbsp;and&nbsp; ∠OCB = 40°.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(CA1_BASE, []),
        question: { angles: [CA1_B1] },
        reveal: { angles: [CA1_B1, CA1_OAB] },
      },
      b: {
        spec: specAfter(CA1_BASE, CA1_CHAIN.slice(0, 1)),
        question: { angles: [CA1_O1] },
        reveal: { angles: [CA1_O1, CA1_B1, CA1_OAB] },
      },
      c: {
        spec: specAfter(CA1_BASE, CA1_CHAIN.slice(0, 2)),
        question: { angles: [CA1_B2] },
        reveal: { angles: [CA1_B2, CA1_OCB] },
      },
      d: {
        spec: specAfter(CA1_BASE, CA1_CHAIN.slice(0, 3)),
        question: { angles: [CA1_O3] },
        reveal: { angles: [CA1_O3, CA1_B2, CA1_OCB] },
      },
      e: {
        spec: specAfter(CA1_BASE, CA1_CHAIN.slice(0, 4)),
        question: { angles: [CA1_O2] },
        reveal: { angles: [CA1_O1, CA1_O2, CA1_O3] },
      },
      f: {
        spec: specAfter(CA1_BASE, CA1_CHAIN.slice(0, 5)),
        question: { angles: [CA1_B1, CA1_B2] },
        reveal: { angles: [CA1_B1, CA1_B2, CA1_O2] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with a reason, the size of &nbsp;B̂₁." },
      hint: { en: "B̂₁ sits in triangle OAB. What do you know about the two sides OA and OB — and what does that force the two angles at the bottom of that triangle to do?" },
      memo: [
        { type: "step", text: { en: "OA = OB &nbsp;&nbsp;<i>(radii)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ B̂₁ = ∠OAB = 35° &nbsp;&nbsp;<i>(∠s opp equal sides)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER — this is the rule for the whole chapter: in Euclidean geometry <b>the statement earns a mark and the reason earns its own mark</b>. “B̂₁ = 35°” on a bare line is half an answer. Every size you write down gets a short reason in brackets beside it.",
        } },
      ],
      esplain: {
        en: "Every radius of a circle is the same length, so the moment a triangle has two radii for sides you already know it is isosceles — you did not have to measure anything. And in an isosceles triangle the two angles at the bottom, the ones opposite the equal sides, must be equal. Here OA and OB are both radii, so the angle at A and the angle at B are equal, which hands you B̂₁ for free. Get into the habit of marking every radius in a circle diagram the second you see it: half the angle chases in Grade 11 run entirely on hidden isosceles triangles, and the person who spots them first finishes the question in half the time.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ô₁." },
      hint: { en: "You now know both of the bottom angles of triangle OAB. There is only one place left for the rest of the 180° to go." },
      memo: [
        { type: "step", text: { en: "In △OAB: &nbsp;Ô₁ + 35° + 35° = 180° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ô₁ = 110°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Nothing clever here, and that is the point — a chained geometry question is mostly a run of small, ordinary steps, and this is one of them. The three angles of any triangle add to 180°, you have two of them, so the third is whatever is left over. The one thing worth noticing is that Ô₁ came out obtuse, which is exactly what you would expect: the two base angles were fairly small, so the angle at the top had to be large to make up the total. If your answer had come out bigger than 180° or negative, that is a sign you added instead of subtracted somewhere, and checking the shape of the picture would have caught it immediately.",
      },
    },
    {
      id: "c",
      marks: 1,
      level: 1,
      prompt: { en: "OB = OC. &nbsp;Write down the size of &nbsp;B̂₂." },
      hint: { en: "The reason has been handed to you in the question. Which angle in the picture is B̂₂ forced to match?" },
      memo: [
        { type: "answer", text: { en: "B̂₂ = ∠OCB = 40° &nbsp;&nbsp;<i>(∠s opp equal sides)</i>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "This is the same move as part (a), done on the other triangle — OB and OC are both radii, so triangle OBC is isosceles too, and the two angles opposite those equal sides must match. When a question says “write down”, it is telling you no working is expected: one line, the size, and the reason in brackets. It is also telling you the mark is quick, so take it and move on. Notice how the picture is now filling up: two triangles, both isosceles, and the angles at B are 35° on one side of OB and 40° on the other.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ô₃." },
      hint: { en: "Same triangle as (c). You have both of its base angles now." },
      memo: [
        { type: "step", text: { en: "In △OBC: &nbsp;Ô₃ + 40° + 40° = 180° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ô₃ = 100°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Exactly the same reasoning as part (b), on the second isosceles triangle. It is worth pausing on how repetitive that is, because that repetition is the real skill: a long geometry question is not five clever ideas, it is one or two ideas used five times on different corners of the same picture. Once you have found the pattern “two radii, so isosceles, so equal base angles, so the top angle is 180° minus twice one of them”, you can run it on any triangle in the diagram that has the centre as a vertex.",
      },
    },
    {
      id: "e",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ô₂." },
      hint: { en: "Look only at the point O now, and forget the circle for a second. How many angles are sitting around it, and what must they add up to?" },
      memo: [
        { type: "step", text: { en: "Ô₁ + Ô₂ + Ô₃ = 360° &nbsp;&nbsp;<i>(∠s round a pt)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ô₂ = 360° − 110° − 100° = 150°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: it is <b>360°</b> round a point, not 180°. The 180° rule is for angles sitting on a straight line — three angles filling the whole space around O is a full revolution.",
        } },
      ],
      esplain: {
        en: "This step has nothing to do with circles at all; it is the Grade 8 fact that going the whole way round a point takes 360°. The only thing that makes it feel like circle geometry is that the point happens to be the centre. Three angles meet at O and between them they fill the whole revolution, so once two of them are known the third is just subtraction. A good habit here is to check your answer against the picture: Ô₂ came out at 150°, and the wedge marked 2 does look like the biggest of the three — so the number and the drawing agree, which is a free sanity check the examiner has quietly given you.",
      },
    },
    {
      id: "f",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠ABC." },
      hint: { en: "There are two honest ways in: add the two pieces at B that you already own, or use the angle at the centre that stands on the same arc AC. Both are worth full marks — pick the one you can justify." },
      memo: [
        { type: "step", text: { en: "∠ABC = ½ · Ô₂ &nbsp;&nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i> — both stand on arc AC" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠ABC = ½ × 150° = 75°" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — straight off the two pieces you already have: &nbsp;∠ABC = B̂₁ + B̂₂ = 35° + 40° = 75°. &nbsp;Same marks." } },
        { type: "trap", text: {
          en: "REMEMBER: the two answers agreeing is not a coincidence — it <i>is</i> the angle-at-centre theorem. Whenever a chase gives you the same size two different ways, treat it as a free check that the earlier parts were right.",
        } },
      ],
      esplain: {
        en: "The angle at the centre standing on an arc is always double the angle that the same arc makes at the circumference. Here Ô₂ and ∠ABC both stand on arc AC — Ô₂ from the centre, ∠ABC from the far side of the circle — so ∠ABC has to be half of 150°. The reason the second route also works is that you already found the two halves of the angle at B, and 35 + 40 is the same 75. Seeing a result twice from two different directions is the single best confidence-builder in a geometry question, and it costs you almost nothing: if the two roads disagree, you know a mistake is sitting somewhere behind you and you can go back and find it before the marks run out.",
      },
    },
  ],
};

/* =====================================================================
   RIDER 2 — A DIAMETER, TWO ANGLES IN THE SAME SEGMENT, AND A PAIR OF
   PARALLEL CHORDS
   ---------------------------------------------------------------------
   A 180°, B 0° (so AB is a diameter through O), C 130°, D 50°.
   C and D sit symmetrically about the vertical, so chord CD comes out
   exactly parallel to AB — which is what part (f) proves without ever
   measuring anything.
     Ĉ₁ = ∠ACB = 90°   ∠ADB = 90°           (angles on the diameter)
     ∠ABC = ½·arc CA = ½(50°) = 25°     ∠DBC = ½·arc DC = ½(80°) = 40°
     Â₁ = ∠BAD = ½·arc BD = ½(50°) = 25°
     Â₂ = ∠DAC = ½·arc DC = ½(80°) = 40°   (same segment as ∠DBC)
     Ĉ₂ = ∠BCD = ½·arc BD = 25°            (same segment as Â₁)
   The wedge at D is the 90° one, and it points down into the empty
   lower half of the circle where there is room for it — the first
   build marked ∠CDA there instead, and its arc ran straight through
   B's "40°" label.
   ===================================================================== */
const CA2_BASE = {
  ...CANVAS,
  O: true,
  pts: { A: 180, B: 0, C: 130, D: 50 },
  chords: [["A", "B"], ["A", "C"], ["A", "D"], ["B", "C"], ["B", "D"], ["C", "D"]],
  angles: [
    /* A, B and C each carry two wedges within ~66 px of one another, and
       both numbered pairs now sit INSIDE their arcs, so the arcs are what
       separates them: the NARROW wedge of each pair takes the big arc
       (Â₁ 25° → 46, Ĉ₂ 25° → 46) and its 40°/90° neighbour the small one.
       Two reasons that way round — a digit needs width to sit in, and a
       25° wedge only has 2·r·sin12,5° of it, so pushing it out to 25 px
       buys 5,5 px of clearance either side instead of 2,6; and the two
       digits then separate radially by ~12 px on top of their angular
       gap. The B pair are VALUE labels ("25°", "40°"), untouched by the
       index rule, still parked outside on their own measured radii. */
    { at: "A", legs: ["B", "D"], t: "1", o: { v: 25, ar: 46 } },
    { at: "A", legs: ["D", "C"], t: "2", o: { v: 40, ar: 28 } },
    { at: "B", legs: ["C", "A"], t: "25°", o: { v: 25, r: 48, ar: 18 } },
    { at: "B", legs: ["D", "C"], t: "40°", o: { v: 40, r: 54, ar: 27 } },
    { at: "C", legs: ["A", "B"], t: "1", o: { v: 90, ar: 26 } },
    { at: "C", legs: ["B", "D"], t: "2", o: { v: 25, ar: 46 } },
    { at: "D", legs: ["A", "B"], t: "", o: { v: 90, ar: 15 } },
  ],
};
/* each highlight repeats its wedge's own `ar` — see rider 1's note */
const CA2_A1 = { at: "A", legs: ["B", "D"], v: 25, o: { ar: 46, hlR: 46 } };
const CA2_A2 = { at: "A", legs: ["D", "C"], v: 40, o: { ar: 28 } };
const CA2_ABC = { at: "B", legs: ["C", "A"], v: 25, o: { ar: 18 } };
const CA2_DBC = { at: "B", legs: ["D", "C"], v: 40, o: { ar: 27 } };
const CA2_C1 = { at: "C", legs: ["A", "B"], v: 90, o: { ar: 26 } };
const CA2_C2 = { at: "C", legs: ["B", "D"], v: 25, o: { ar: 46, hlR: 46 } };
const CA2_ADB = { at: "D", legs: ["A", "B"], v: 90, o: { ar: 15 } };
const CA2_CHAIN = [
  { n: "Ĉ₁", v: "90°" }, { n: "∠ADB", v: "90°" }, { n: "Â₂", v: "40°" },
  { n: "Â₁", v: "25°" }, { n: "Ĉ₂", v: "25°" },
];

const ca2 = {
  id: "euclid.sib.ca.q2",
  chapter: CH,
  topic: TOPIC,
  archetype: "diameter-and-same-segment-chase-ending-in-a-prove-the-chords-are-parallel",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 12,
  intro: {
    en: "In the diagram, AB is a diameter of the circle with centre O. &nbsp;C and D are points on the circle, and AC, AD, BC, BD and CD are drawn. &nbsp;∠ABC = 25° &nbsp;and&nbsp; ∠DBC = 40°.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(CA2_BASE, []),
        question: { angles: [CA2_C1] },
        reveal: { angles: [CA2_C1], chords: [["A", "B"]] },
      },
      b: {
        spec: specAfter(CA2_BASE, CA2_CHAIN.slice(0, 1)),
        question: { angles: [CA2_ADB] },
        reveal: { angles: [CA2_ADB, CA2_C1], chords: [["A", "B"]] },
      },
      c: {
        spec: specAfter(CA2_BASE, CA2_CHAIN.slice(0, 2)),
        question: { angles: [CA2_A2] },
        reveal: { angles: [CA2_A2, CA2_DBC], chords: [["C", "D"]] },
      },
      d: {
        spec: specAfter(CA2_BASE, CA2_CHAIN.slice(0, 3)),
        question: { angles: [CA2_A1] },
        reveal: { angles: [CA2_A1, CA2_A2, CA2_C1, CA2_ABC] },
      },
      e: {
        spec: specAfter(CA2_BASE, CA2_CHAIN.slice(0, 4)),
        question: { angles: [CA2_C2] },
        reveal: { angles: [CA2_C2, CA2_A1], chords: [["B", "D"]] },
      },
      f: {
        spec: specAfter(CA2_BASE, CA2_CHAIN.slice(0, 5)),
        question: { chords: [["C", "D"], ["A", "B"]] },
        reveal: { chords: [["C", "D"], ["A", "B"], ["A", "C"]], angles: [CA2_C1, CA2_C2, CA2_A1, CA2_A2] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ĉ₁." },
      hint: { en: "Look at what AB is, not just where it is. An angle standing on that particular chord is never anything but one size." },
      memo: [
        { type: "step", text: { en: "AB is a diameter, and Ĉ₁ = ∠ACB stands on it. &nbsp;&nbsp;<i>(∠s in semi-circle)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ĉ₁ = 90°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this only works because AB goes <b>through the centre</b>. An angle standing on an ordinary chord can be any size at all — check that the chord really is a diameter before you write 90°.",
        } },
      ],
      esplain: {
        en: "A diameter cuts the circle into two halves, and any point you pick on either half looks back at the two ends of that diameter through exactly a right angle. It is one of the most useful facts in the whole chapter, because it hands you a 90° with no working at all — and a right angle is what turns a triangle into something you can finish with the angle sum, or with Pythagoras if lengths are involved. The habit to build: whenever you see a chord that passes through the centre, immediately mark every angle standing on it with a little right angle, before you even read what the question wants.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: { en: "∠ADB = 90°. &nbsp;Give a reason for this." },
      hint: { en: "D is on the circle too. Which chord is that angle standing on?" },
      memo: [
        { type: "answer", text: { en: "AB is a diameter and ∠ADB stands on it &nbsp;&nbsp;<i>(∠s in semi-circle)</i>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The theorem does not care which point on the circle you pick — every one of them sees a diameter at a right angle. So C gives you 90° and D gives you 90°, from the same one fact. Papers ask for the reason on its own like this on purpose: a learner who guesses the size from the look of the picture still cannot produce the reason, and the reason is what shows you understood. Two right angles in one diagram is also a gift worth noticing — it means there are two right-angled triangles in there, and every angle chase through them is one subtraction away.",
      },
    },
    {
      id: "c",
      marks: 1,
      level: 1,
      prompt: { en: "Use &nbsp;<i>∠s in the same seg</i>&nbsp; to write down the size of &nbsp;Â₂." },
      hint: { en: "Â₂ is the angle chord DC makes at A. Find the other angle in the picture that the same chord DC makes, on the same side of it." },
      memo: [
        { type: "answer", text: { en: "Â₂ = ∠DBC = 40° &nbsp;&nbsp;<i>(∠s in the same seg)</i> — both stand on chord DC" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A chord splits a circle into two segments, and every point in one segment sees the chord at the same angle as every other point in that segment. Here the chord is DC, and both A and B are sitting in the bigger segment on the far side of it — so the angle DC makes at A has to equal the angle it makes at B. That is why one given angle at B quietly hands you an angle at A, right across the diagram. The thing to check every single time is that the two points really are on the same side of the chord; if they are on opposite sides the angles are not equal at all, they are supplementary, which is a completely different theorem.",
      },
    },
    {
      id: "d",
      marks: 3,
      level: 2,
      prompt: { en: "Determine, with reasons, the size of &nbsp;Â₁." },
      hint: { en: "Work out the whole angle ∠CAB first — triangle ACB has a right angle and a 25° in it — and then remember that Â₁ is what is left of it once Â₂ is taken away." },
      memo: [
        { type: "step", text: { en: "In △ACB: &nbsp;∠CAB + 25° + 90° = 180° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∴ ∠CAB = 65°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "Â₁ = ∠CAB − Â₂ = 65° − 40° = 25°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The angle at A is split into two pieces by the chord AD, and the question only wants the lower one. So the plan is to get the whole angle first and subtract the piece you already know. Triangle ACB is the easiest place to find that whole angle, because part (a) gave you the right angle at C and the question gave you 25° at B, so the angle sum finishes it in one line. The habit worth building here is writing the split out loud as a sentence before you do any arithmetic: “the whole angle at A is Â₁ plus Â₂”. Learners who skip that sentence often subtract the wrong way round, or forget that the 65° was never Â₁ in the first place.",
      },
    },
    {
      id: "e",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ĉ₂." },
      hint: { en: "Ĉ₂ stands on chord BD. So does one of the angles you have just worked out — and A and C are on the same side of BD." },
      memo: [
        { type: "step", text: { en: "Ĉ₂ and Â₁ both stand on chord BD, and A and C are on the same side of it. &nbsp;&nbsp;<i>(∠s in the same seg)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ĉ₂ = Â₁ = 25°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Third use of the same-segment theorem in one question, and by now the routine should feel automatic: name the chord, check which side each point is on, then write the two angles equal. The chord this time is BD, and the two points looking at it are A and C. What makes this part slightly harder than (c) is that the angle you are matching, Â₁, was not given to you — you had to build it in part (d) first. That is what a chained question does: it makes each answer the raw material for the next one. If Â₁ had come out wrong, this answer would follow it, and the follow-through rule means the marker still pays you for the correct reasoning here.",
      },
    },
    {
      id: "f",
      marks: 3,
      level: 3,
      prompt: { en: "Prove that &nbsp;CD ∥ AB." },
      hint: { en: "Treat AC as a transversal cutting the two chords. Add up the pieces of the angle at C on one side of it, add up the pieces of the angle at A on the same side, and see what the total does." },
      memo: [
        { type: "step", text: { en: "∠DCA = Ĉ₁ + Ĉ₂ = 90° + 25° = 115°" }, ticks: ["ca"] },
        { type: "step", text: { en: "∠CAB = Â₁ + Â₂ = 25° + 40° = 65°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∠DCA + ∠CAB = 115° + 65° = 180°<br>∴ CD ∥ AB &nbsp;&nbsp;<i>(co-int ∠s supp)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the two angles have to be <b>co-interior</b> — both inside the two chords and both on the same side of the transversal AC. Adding any two angles that happen to make 180° proves nothing at all; say which transversal you used.",
        } },
      ],
      esplain: {
        en: "Proving two lines are parallel is the reverse of the work you did in Grade 9, and the reasons run backwards too: instead of “these lines are parallel, so the angles do this”, you say “the angles do this, so the lines must be parallel”. The only line joining the two chords in this picture is AC, so that is your transversal, and the two angles it makes on the inside — one at C between CD and CA, one at A between AC and AB — are co-interior. Both of them are already built out of pieces you own, so it is pure addition. When they total 180° the lines cannot be doing anything except running parallel. Notice this part banked four earlier answers before it needed them; that is exactly why it comes last.",
      },
    },
  ],
};

/* =====================================================================
   RIDER 3 — THE REFLEX ANGLE AT THE CENTRE
   ---------------------------------------------------------------------
   A 210°, B 250°, C 330°, so B sits on the MINOR arc AC. That is the
   whole point of the rider: the angle at the circumference then pairs
   with the REFLEX angle at the centre, not the ordinary one.
     ∠AOC = 120°,  reflex ∠AOC = 240°
     ∠ABC = ½(240°) = 120°        (B on the minor arc)
     △OAC isosceles: base angles (180 − 120)/2 = 30°
     Â₁ = ∠BAC = ½·arc BC = ½(80°) = 40°
     Ĉ₂ = ∠ACB = ½·arc AB = ½(40°) = 20°     (40 + 20 + 120 = 180)
   A and C carry two numbered wedges each, so the GIVEN Â₁ = 40° goes
   into the base key rather than sitting on a wedge next to a "2" and
   being read as a number. The two wedges at O share their arms, so
   they are named in words instead of numbered: the reflex one carries
   its given size, the other is drawn bare until part (a) finds it.
   ===================================================================== */
const CA3_BASE = {
  ...CANVAS,
  O: true,
  pts: { A: 210, B: 250, C: 330 },
  chords: [["A", "B"], ["B", "C"], ["A", "C"], ["O", "A"], ["O", "C"]],
  key: { at: "tr", lines: [{ t: "Â₁ = 40°" }] },
  /* The four numbered wedges (two at A, two at C) sit inside their arcs
     and are separated by arc radius: at each vertex the NARROWER wedge
     takes the outer arc, for the width reason in this file's header —
     Â₂ is 30° and Ĉ₂ 20°, and a 20° wedge gives a digit only 2·r·sin10°
     of room, so it has to sit 27 px out to have any at all. */
  angles: [
    { at: "O", legs: ["A", "C"], t: "", o: { v: 120, ar: 18 } },
    { at: "O", legs: ["A", "C"], t: "240°", o: { v: 240, reflex: 1, r: 50, ar: 36 } },
    { at: "A", legs: ["B", "C"], t: "1", o: { v: 40, ar: 28 } },
    { at: "A", legs: ["C", "O"], t: "2", o: { v: 30, ar: 46 } },
    { at: "C", legs: ["O", "A"], t: "1", o: { v: 30, ar: 30 } },
    { at: "C", legs: ["A", "B"], t: "2", o: { v: 20, ar: 50 } },
    { at: "B", legs: ["A", "C"], t: "", o: { v: 120, ar: 20 } },
  ],
};
/* each highlight repeats its wedge's own `ar` — see rider 1's note */
const CA3_AOC = { at: "O", legs: ["A", "C"], v: 120, o: { ar: 18 } };
const CA3_REFLEX = { at: "O", legs: ["A", "C"], v: 240, o: { reflex: 1, ar: 36, hlR: 36 } };
const CA3_ABC = { at: "B", legs: ["A", "C"], v: 120, o: { ar: 20 } };
const CA3_A1 = { at: "A", legs: ["B", "C"], v: 40, o: { ar: 28 } };
const CA3_A2 = { at: "A", legs: ["C", "O"], v: 30, o: { ar: 46, hlR: 46 } };
const CA3_C1 = { at: "C", legs: ["O", "A"], v: 30, o: { ar: 30 } };
const CA3_C2 = { at: "C", legs: ["A", "B"], v: 20, o: { ar: 50, hlR: 50 } };
const CA3_CHAIN = [
  { n: "∠AOC", v: "120°" }, { n: "∠ABC", v: "120°" }, { n: "Ĉ₁", v: "30°" }, { n: "Â₂", v: "30°" },
];

const ca3 = {
  id: "euclid.sib.ca.q3",
  chapter: CH,
  topic: TOPIC,
  archetype: "reflex-angle-at-the-centre-then-isosceles-radii-then-angle-sum",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 9,
  intro: {
    en: "In the diagram, O is the centre of the circle and A, B and C are points on the circle. &nbsp;OA, OC, AB, BC and AC are drawn. &nbsp;The reflex ∠AOC = 240° &nbsp;and&nbsp; Â₁ = 40°.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(CA3_BASE, []),
        question: { angles: [CA3_AOC] },
        reveal: { angles: [CA3_AOC, CA3_REFLEX] },
      },
      b: {
        spec: specAfter(CA3_BASE, CA3_CHAIN.slice(0, 1)),
        question: { angles: [CA3_ABC] },
        reveal: { angles: [CA3_ABC, CA3_REFLEX] },
      },
      c: {
        spec: specAfter(CA3_BASE, CA3_CHAIN.slice(0, 2)),
        question: { angles: [CA3_C1] },
        reveal: { angles: [CA3_C1, CA3_A2, CA3_AOC] },
      },
      d: {
        spec: specAfter(CA3_BASE, CA3_CHAIN.slice(0, 3)),
        question: { angles: [CA3_A2] },
        reveal: { angles: [CA3_A2, CA3_C1] },
      },
      e: {
        spec: specAfter(CA3_BASE, CA3_CHAIN.slice(0, 4)),
        question: { angles: [CA3_C2] },
        reveal: { angles: [CA3_C2, CA3_A1, CA3_ABC] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠AOC." },
      hint: { en: "The two angles at O — the one drawn inside the triangle and the big one going the long way round — together fill everything there is around the point O." },
      memo: [
        { type: "step", text: { en: "∠AOC + reflex ∠AOC = 360° &nbsp;&nbsp;<i>(∠s round a pt)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠AOC = 360° − 240° = 120°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two rays out of one point always cut the space around that point into two angles, a smaller one and a bigger one, and together they must make a full turn of 360°. The bigger one is called the reflex angle, and it is nothing more mysterious than “the other way round”. So the moment a question hands you a reflex angle, the ordinary angle is one subtraction away. It is worth writing both onto your own copy of the sketch straight away, because the next few parts will need to know which of the two a theorem is talking about — and that is where most of the marks on this kind of question are won or lost.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠ABC." },
      hint: { en: "∠ABC and one of the angles at O stand on the same arc AC. Careful — which one? Look at which side of the chord AC the point B is sitting on." },
      memo: [
        { type: "step", text: { en: "B lies on the <b>minor</b> arc AC, so ∠ABC pairs with the reflex angle at the centre: &nbsp;reflex ∠AOC = 2 · ∠ABC &nbsp;&nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠ABC = ½ × 240° = 120°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: halving the wrong one gives 60°, and that is the answer this question is fishing for. The theorem always pairs an angle at the circumference with the angle at the centre standing on <b>the arc on the other side</b> — B is on the small arc, so its partner is the big reflex angle.",
        } },
      ],
      esplain: {
        en: "The angle-at-centre theorem is usually met in its friendly form, with the point on the big arc and the ordinary angle at the centre. This question puts B on the small arc instead, and everything still works — you just have to pair it with the reflex angle. The safe way to decide, every time, is to ask which arc the angle at the circumference is standing on: B is looking across at the arc AC that does NOT contain B, which is the big one, and the angle at the centre standing on that same big arc is the reflex one. A quick reality check saves you here too: ∠ABC came out at 120°, and the wedge at B in the drawing is clearly obtuse, so 60° would have been visibly wrong.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with reasons, the size of &nbsp;Ĉ₁." },
      hint: { en: "Ĉ₁ is a base angle of triangle OAC. Both of that triangle's slanted sides are radii, and you found its top angle in part (a)." },
      memo: [
        { type: "step", text: { en: "OA = OC &nbsp;&nbsp;<i>(radii)</i>, so Ĉ₁ = Â₂ &nbsp;&nbsp;<i>(∠s opp equal sides)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "In △OAC: &nbsp;Ĉ₁ = (180° − 120°) ÷ 2 = 30° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Every triangle with the centre at one corner and two points of the circle at the others is isosceles, because the two sides running to the circle are radii. That means its two base angles are equal, and once you know the angle at the centre the rest is arithmetic: take it off 180° and share what is left equally between the two. Here 180 − 120 leaves 60, and half of that is 30. Two reasons are needed, not one, and both earn marks — “∠s opp equal sides” to say the two base angles match, and “sum of ∠s in Δ” to say why they come to 30° each.",
      },
    },
    {
      id: "d",
      marks: 1,
      level: 1,
      prompt: { en: "Write down the size of &nbsp;Â₂." },
      hint: { en: "It is the other base angle of the same isosceles triangle." },
      memo: [
        { type: "answer", text: { en: "Â₂ = Ĉ₁ = 30° &nbsp;&nbsp;<i>(∠s opp equal sides)</i>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "One mark, one line — and the reason is the whole mark, because the size was already sitting there in part (c)'s working. Take the easy marks quickly and cleanly: examiners put them in on purpose so that a learner who is finding the question hard still leaves with something. The only way to lose this one is to write “30°” with nothing beside it, or to invent a longer reason than the question needs.",
      },
    },
    {
      id: "e",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ĉ₂." },
      hint: { en: "Look at triangle ABC on its own. You were given one of its angles and you found another one in part (b)." },
      memo: [
        { type: "step", text: { en: "In △ABC: &nbsp;Â₁ + ∠ABC + Ĉ₂ = 180° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ĉ₂ = 180° − 40° − 120° = 20°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "After all the circle theorems, the question ends on the plainest fact there is: the angles of a triangle add to 180°. Triangle ABC has the given 40° at A, the 120° you built in part (b) at B, and Ĉ₂ is whatever is left. It is worth noticing what the diagram is now telling you — a 120° angle at B means ABC is a very flat, wide triangle, and both of the other angles have to be small, so an answer like 20° fits the picture. Getting into the habit of glancing back at the drawing before you write the final size catches almost every arithmetic slip.",
      },
    },
  ],
};

/* =====================================================================
   RIDER 4 — EQUAL CHORDS SUBTEND EQUAL ANGLES
   ---------------------------------------------------------------------
   A 200°, B 330°, C 100°, so arc AB = arc BC = 130° and the two chords
   AB and BC really are equal — the figure marks them with matching
   equal-length ticks.
     Ô₂ = ∠AOB = 130° (given)   Ô₃ = ∠BOC = 130° (equal chords)
     Ô₁ = ∠COA = 360 − 130 − 130 = 100°
     △OAC: base angles (180 − 100)/2 = 40°  → ∠OAC = ∠ACO = 40°
     △OAB and △OBC: base angles (180 − 130)/2 = 25° each,
        so ∠ABC = 25° + 25° = 50° = ½ × Ô₁ ✓
   O carries three numbered wedges, so its GIVEN goes into the base key
   rather than sitting on a wedge beside a "1" and a "3". A, B and C
   carry ONE wedge each and are named in full — the first build split
   the angle at B into B̂₁ and B̂₂, and their two labels plus Ô₂'s all
   landed inside the same narrow triangle OAB, three deep. The two 25°
   halves still get their moment: they are the OR route in the last memo.
   The three labels at O used to be ROTATED off their bisectors (o.rot),
   because the chord a big central wedge stands on sits only
   R·cos(½∠) = 33 px from the centre and a label 35–42 px out had to be
   swung sideways to clear it. They now sit INSIDE their arcs, 12–24 px
   from O, where no chord reaches — so the rotations are gone and the
   arc radii do the work instead. See the note on the angles below.
   ===================================================================== */
const CA4_BASE = {
  ...CANVAS,
  O: true,
  pts: { A: 200, B: 330, C: 100 },
  key: { at: "tr", lines: [{ t: "Ô₂ = 130°" }] },
  chords: [
    { a: "A", b: "B", mk: "t1" },
    { a: "B", b: "C", mk: "t1" },
    ["A", "C"], ["O", "A"], ["O", "B"], ["O", "C"],
  ],
  /* THE THREE WEDGES AT O, now that their digits sit inside their arcs.
     Three constraints, all measured:
       · the chord a wedge stands on is R·cos(½∠) from O — 33 px for the
         two 130° wedges, 50 px for the 100° one — so Ô₂ and Ô₃ cannot
         have an arc past ~30, and Ô₁ can go to 44;
       · they must not all share one radius, or the three arcs would join
         into a single closed circle round O and say nothing;
       · with the labels in close, no o.rot: the rotations existed to
         swing labels 35–42 px out away from those same chords, and a
         digit 12–24 px from O is not near a chord to begin with. rot
         would also break placeCentreLabel, which reads the UNrotated
         position when it steers the "O" letter clear. */
  angles: [
    /* the ONE index label in this file that overrides the automatic
       radius, and it is measured. The "O" letter is placed by the
       engine at 14 px from the centre in the most open direction, and
       with three radii drawn the only open direction here is Ô₁'s
       100° gap — so the letter lands on Ô₁'s own bisector whatever we
       do. At the automatic 0,55 × 46 = 25 px the digit and the letter
       came out 11 px apart and read as "10", a number, on a figure
       made of numbers. At 30 they are 16 px apart and still well
       inside the 46 arc, which is what "inside the arc" asks for. */
    { at: "O", legs: ["C", "A"], t: "1", o: { v: 100, r: 30, ar: 46 } },
    { at: "O", legs: ["A", "B"], t: "2", o: { v: 130, ar: 30 } },
    { at: "O", legs: ["B", "C"], t: "3", o: { v: 130, ar: 22 } },
    { at: "A", legs: ["O", "C"], t: "", o: { v: 40, ar: 22 } },
    { at: "C", legs: ["A", "O"], t: "", o: { v: 40, ar: 22 } },
    { at: "B", legs: ["C", "A"], t: "", o: { v: 50, ar: 34 } },
  ],
};
/* each highlight repeats its wedge's own `ar` — see rider 1's note */
const CA4_O1 = { at: "O", legs: ["C", "A"], v: 100, o: { ar: 46, hlR: 46 } };
const CA4_O2 = { at: "O", legs: ["A", "B"], v: 130, o: { ar: 30 } };
const CA4_O3 = { at: "O", legs: ["B", "C"], v: 130, o: { ar: 22 } };
const CA4_OAC = { at: "A", legs: ["O", "C"], v: 40, o: { ar: 22 } };
const CA4_ACO = { at: "C", legs: ["A", "O"], v: 40, o: { ar: 22 } };
const CA4_ABC = { at: "B", legs: ["C", "A"], v: 50, o: { ar: 34 } };
const CA4_CHAIN = [
  { n: "Ô₃", v: "130°" }, { n: "Ô₁", v: "100°" },
  { n: "∠OAC", v: "40°" }, { n: "∠ACO", v: "40°" },
];

const ca4 = {
  id: "euclid.sib.ca.q4",
  chapter: CH,
  topic: TOPIC,
  archetype: "equal-chords-equal-angles-then-isosceles-radii-then-angle-at-centre",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 9,
  intro: {
    en: "In the diagram, O is the centre of the circle and A, B and C are points on the circle. &nbsp;OA, OB, OC and AC are drawn, together with the chords AB and BC. &nbsp;AB = BC, as the matching ticks show, and &nbsp;Ô₂ = 130°.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(CA4_BASE, []),
        question: { angles: [CA4_O3], chords: [["B", "C", "t1"]] },
        reveal: { angles: [CA4_O2, CA4_O3], chords: [["A", "B", "t1"], ["B", "C", "t1"]] },
      },
      b: {
        spec: specAfter(CA4_BASE, CA4_CHAIN.slice(0, 1)),
        question: { angles: [CA4_O1] },
        reveal: { angles: [CA4_O1, CA4_O2, CA4_O3] },
      },
      c: {
        spec: specAfter(CA4_BASE, CA4_CHAIN.slice(0, 2)),
        question: { angles: [CA4_OAC] },
        reveal: { angles: [CA4_OAC, CA4_ACO, CA4_O1] },
      },
      d: {
        spec: specAfter(CA4_BASE, CA4_CHAIN.slice(0, 3)),
        question: { angles: [CA4_ACO] },
        reveal: { angles: [CA4_ACO, CA4_OAC] },
      },
      e: {
        spec: specAfter(CA4_BASE, CA4_CHAIN.slice(0, 4)),
        question: { angles: [CA4_ABC] },
        reveal: { angles: [CA4_ABC, CA4_O1] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ô₃." },
      hint: { en: "The ticks on AB and BC are not decoration — they are telling you the two chords are the same length. What must two equal chords do to the angles they make at the centre?" },
      memo: [
        { type: "step", text: { en: "AB = BC, and equal chords subtend equal angles at the centre. &nbsp;&nbsp;<i>(equal chords; equal ∠s)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ô₃ = Ô₂ = 130°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Think of a chord as a bite taken out of the circle. Two bites of exactly the same size have to cut off arcs of exactly the same size, and the angle at the centre is nothing more than a way of measuring that arc — so equal chords give equal angles at the centre, every time. It works the other way round too, which is what makes the theorem so useful: if a question tells you two central angles are equal, you can immediately say the chords are equal. Whenever you see matching ticks on two chords, write down what they force before you read the rest of the question; that one line is usually the key that unlocks everything else.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ô₁." },
      hint: { en: "Three angles meet at O and there is nothing else there. How much space is there altogether around a single point?" },
      memo: [
        { type: "step", text: { en: "Ô₁ + Ô₂ + Ô₃ = 360° &nbsp;&nbsp;<i>(∠s round a pt)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ô₁ = 360° − 130° − 130° = 100°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Once the three radii are drawn, the point O is carved into exactly three angles, and a full turn round any point is 360°. So the third one is simply what is left after the two you know are taken away. Two things are worth noticing. First, the answer is smaller than the other two, and it should be — the arc AC that is not covered by the two equal chords is visibly the smallest of the three. Second, this is a Grade 8 fact doing heavy lifting in a Grade 11 question, which happens far more often than learners expect. The circle theorems get you started; the ordinary angle rules usually finish the job.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with reasons, the size of &nbsp;∠OAC." },
      hint: { en: "∠OAC is a base angle of triangle OAC, and you have just found that triangle's angle at O." },
      memo: [
        { type: "step", text: { en: "OA = OC &nbsp;&nbsp;<i>(radii)</i>, so ∠OAC = ∠ACO &nbsp;&nbsp;<i>(∠s opp equal sides)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "In △OAC: &nbsp;∠OAC = (180° − 100°) ÷ 2 = 40° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Same routine as always with a triangle that has the centre as one corner: two radii means isosceles, isosceles means matching base angles, and the angle sum shares out what is left of 180°. Here 180 − 100 leaves 80, split evenly into two 40s. Write both reasons down — the marker is paying for “∠s opp equal sides” and for “sum of ∠s in Δ” separately, and a learner who writes only the arithmetic will get about half of what the working is worth. If you can see this pattern quickly you can fill in an enormous amount of a circle diagram in a couple of minutes.",
      },
    },
    {
      id: "d",
      marks: 1,
      level: 1,
      prompt: { en: "Write down the size of &nbsp;∠ACO." },
      hint: { en: "The other base angle of the same triangle." },
      memo: [
        { type: "answer", text: { en: "∠ACO = ∠OAC = 40° &nbsp;&nbsp;<i>(∠s opp equal sides)</i>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A free mark, provided the reason is there. “Write down” means the examiner is not expecting any working at all — just the size and the short reason in brackets. It is also a small kindness in the middle of a long question, so take it at speed and keep your momentum. Notice that this angle was already sitting inside part (c)'s reasoning; the question simply splits it out so that a learner who got (c) partly right still gets paid here.",
      },
    },
    {
      id: "e",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠ABC." },
      hint: { en: "∠ABC is at the circumference. Which of the three angles at the centre is standing on the same arc as it is?" },
      memo: [
        { type: "step", text: { en: "∠ABC = ½ · Ô₁ &nbsp;&nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i> — both stand on arc AC" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠ABC = ½ × 100° = 50°" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — the long way, through the two triangles that meet at B: &nbsp;OA = OB and OB = OC &nbsp;<i>(radii)</i>, so △OAB and △OBC are both isosceles and each gives a base angle of &nbsp;(180° − 130°) ÷ 2 = 25° &nbsp;<i>(∠s opp equal sides; sum of ∠s in Δ)</i>. &nbsp;Then ∠ABC = 25° + 25° = 50°. &nbsp;Same marks." } },
        { type: "trap", text: {
          en: "WATCH OUT: the angle at the centre that pairs with ∠ABC is <b>Ô₁</b>, the one standing on arc AC — not one of the 130° wedges. B is looking across the circle at arc AC, so that is the one that gets halved.",
        } },
      ],
      esplain: {
        en: "Both roads are worth full marks, and it is worth being able to walk each of them. The short road is the angle-at-centre theorem: ∠ABC and Ô₁ both stand on arc AC, so the one at the circumference is half the one at the centre, and 50° falls out in a single line. The long road goes through the two triangles that meet at B — OB is a radius, so both of them are isosceles in exactly the way triangle OAC was, each hands you a base angle of 25°, and adding the two halves gives the same 50°. The two answers agreeing is not luck, it is the theorem quietly checking your arithmetic. In an exam take the short road if you can see it, but write the reason carefully: the marker is paying for knowing which central angle belongs to which circumference angle.",
      },
    },
  ],
};

/* =====================================================================
   RIDER 5 — THE WHOLE CHASE IN TERMS OF x
   ---------------------------------------------------------------------
   A 160°, B 90°, C 300°, D 340°. A and D are exactly 180° apart, so
   AOD is a straight line — a diameter drawn as one segment through the
   centre, which is what gives part (d) its straight-line angle and
   part (e) its exterior angle.
   The figure is DRAWN with x = 35°, but no part ever substitutes a
   number: x stays a letter from the first prompt to the last, exactly
   like euclid.tan.t2q5 does with its own x. The drawn values are what
   verifyDiagram measures, and they are the arithmetic of x:
     ∠ACB = x = 35°                Ô₁ = ∠BOA = 2x  = 70°
     ∠ABO = ∠DAB = 90° − x = 55°   Ô₂ = ∠DOB = 180° − 2x = 110°
   Only FOUR angles are marked besides x: the two at the centre, which
   are numbered, and one each at A and B, which are named in full. The
   two extra sub-angles the first build drew (∠CAD and ∠OBC) were never
   asked about and only crowded the middle of the circle, so they are
   gone.
   ===================================================================== */
const CA5_BASE = {
  ...CANVAS,
  O: true,
  pts: { A: 160, B: 90, C: 300, D: 340 },
  chords: [["A", "C"], ["C", "B"], ["A", "D"], ["O", "B"], ["A", "B"]],
  /* Ô₁ and Ô₂ hold their digits inside their arcs. The two arcs are
     capped by different chords: Ô₁'s wedge faces chord AB, 63,9 px out,
     so 30 is free; Ô₂'s wedge is crossed by chord CB only 20,2 px from
     the centre (measured — C and B are 150° apart, R·cos75° = 20,2), so
     its arc has to stay under that and its digit lands on the engine's
     11 px floor. */
  angles: [
    { at: "C", legs: ["B", "A"], t: "x", o: { v: 35, r: 40, ar: 24 } },
    { at: "O", legs: ["B", "A"], t: "1", o: { v: 70, ar: 30 } },
    { at: "O", legs: ["D", "B"], t: "2", o: { v: 110, ar: 19 } },
    { at: "A", legs: ["D", "B"], t: "", o: { v: 55, ar: 24 } },
    { at: "B", legs: ["A", "O"], t: "", o: { v: 55, ar: 24 } },
  ],
};
/* each highlight repeats its wedge's own `ar` — see rider 1's note */
const CA5_X = { at: "C", legs: ["B", "A"], v: 35, o: { ar: 24 } };
const CA5_O1 = { at: "O", legs: ["B", "A"], v: 70, o: { ar: 30 } };
const CA5_O2 = { at: "O", legs: ["D", "B"], v: 110, o: { ar: 19 } };
const CA5_DAB = { at: "A", legs: ["D", "B"], v: 55, o: { ar: 24 } };
const CA5_ABO = { at: "B", legs: ["A", "O"], v: 55, o: { ar: 24 } };
const CA5_CHAIN = [
  { n: "Ô₁", v: "2x" }, { n: "∠ABO", v: "90° − x" },
  { n: "∠DAB", v: "90° − x" }, { n: "Ô₂", v: "180° − 2x" },
];

const ca5 = {
  id: "euclid.sib.ca.q5",
  chapter: CH,
  topic: TOPIC,
  archetype: "angle-chase-entirely-in-terms-of-x-centre-isosceles-straight-line-exterior-angle",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 10,
  intro: {
    en: "In the diagram, O is the centre of the circle. &nbsp;A, B, C and D are points on the circle and AOD is a straight line. &nbsp;AB, AC, BC and OB are drawn. &nbsp;∠ACB = x.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(CA5_BASE, []),
        question: { angles: [CA5_O1] },
        reveal: { angles: [CA5_O1, CA5_X], chords: [["A", "B"]] },
      },
      b: {
        spec: specAfter(CA5_BASE, CA5_CHAIN.slice(0, 1)),
        question: { angles: [CA5_ABO] },
        reveal: { angles: [CA5_ABO, CA5_DAB, CA5_O1] },
      },
      c: {
        spec: specAfter(CA5_BASE, CA5_CHAIN.slice(0, 2)),
        question: { angles: [CA5_DAB] },
        reveal: { angles: [CA5_DAB, CA5_ABO] },
      },
      d: {
        spec: specAfter(CA5_BASE, CA5_CHAIN.slice(0, 3)),
        question: { angles: [CA5_O2] },
        reveal: { angles: [CA5_O2, CA5_O1], chords: [["A", "D"]] },
      },
      e: {
        spec: specAfter(CA5_BASE, CA5_CHAIN.slice(0, 4)),
        question: { angles: [CA5_O2, CA5_DAB] },
        reveal: { angles: [CA5_O2, CA5_DAB, CA5_ABO] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ô₁&nbsp; in terms of x." },
      hint: { en: "Ô₁ and ∠ACB are standing on the same chord — one from the centre, one from the circle. There is exactly one theorem about that pair." },
      memo: [
        { type: "step", text: { en: "Ô₁ and ∠ACB both stand on chord AB. &nbsp;&nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ô₁ = 2x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: an answer in terms of x is a complete answer. There is no number coming, and no mark for stopping to look for one — write 2x and move on.",
        } },
      ],
      esplain: {
        en: "Working with a letter instead of a number changes absolutely nothing about the reasoning; it just means your answers are expressions. The angle at the centre is twice the angle at the circumference standing on the same chord, so if the one at C is x, the one at O is 2x — done, one line. What makes an “in terms of x” question feel harder is only that you cannot check your answer by looking at the picture the way you can with numbers, so the reason has to carry more of your confidence. Write the reason first if it helps, then the expression. And notice how much stronger the result is than a number would have been: 2x is true no matter what x turns out to be.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: { en: "Determine, with reasons, the size of &nbsp;∠ABO&nbsp; in terms of x." },
      hint: { en: "∠ABO is a base angle of triangle AOB. Two of that triangle's sides are radii, and you have just found the angle between them." },
      memo: [
        { type: "step", text: { en: "OA = OB &nbsp;&nbsp;<i>(radii)</i>, so ∠ABO = ∠DAB &nbsp;&nbsp;<i>(∠s opp equal sides)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "In △AOB: &nbsp;2 · ∠ABO + 2x = 180° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ ∠ABO = 90° − x" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The same isosceles-radii move as always, but with algebra doing the sharing out. The two base angles are equal, so call each of them the same thing and the three angles of the triangle come to that twice, plus 2x, which must be 180°. Solving it is ordinary Grade 9 algebra: twice the base angle is 180 − 2x, so the base angle is 90 − x. The step learners skip is the word “twice” — they write one base angle plus 2x equals 180 by accident and lose the whole thing. Say it out loud as you write: “both base angles, plus the top one, is 180”. And check the shape of the answer: 90 − x gets smaller as x grows, which is exactly what should happen, because a bigger angle at the centre squashes the base angles down.",
      },
    },
    {
      id: "c",
      marks: 1,
      level: 1,
      prompt: { en: "Write down the size of &nbsp;∠DAB&nbsp; in terms of x." },
      hint: { en: "It is the other base angle of the same triangle." },
      memo: [
        { type: "answer", text: { en: "∠DAB = ∠ABO = 90° − x &nbsp;&nbsp;<i>(∠s opp equal sides)</i>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "One line, one mark, and the reason is the mark. ∠DAB and ∠ABO are the two base angles of the same isosceles triangle AOB, so they are equal whatever x happens to be. It is worth writing this one down even though it feels like it says nothing new, because the very next parts use ∠DAB by name — and a marker following your working needs to see where it came from.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ô₂&nbsp; in terms of x." },
      hint: { en: "Ô₁ and Ô₂ sit next to each other along one straight line through the centre. What must a pair like that add up to?" },
      memo: [
        { type: "step", text: { en: "AOD is a straight line, so &nbsp;Ô₁ + Ô₂ = 180° &nbsp;&nbsp;<i>(∠s on a str line)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ô₂ = 180° − 2x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: 180° − 2x, not 180° − x. The thing sitting next to Ô₂ on that straight line is Ô₁, and Ô₁ is 2x — the doubling from part (a) has to travel with you.",
        } },
      ],
      esplain: {
        en: "The words “straight line” in the given information are not decoration — they are telling you that A, O and D are collinear, so the two angles resting on that line at O are supplementary. Since Ô₁ is 2x, Ô₂ has to be 180° − 2x. The most common slip is carrying the wrong thing forward: learners remember that the angle at C was x and subtract that instead. A good defence is to write your answers onto the sketch as you get them, so that when you look at O you are reading 2x off the picture rather than off your memory. That is exactly why each part of this question hands the last one's answer back to you.",
      },
    },
    {
      id: "e",
      marks: 2,
      level: 3,
      prompt: { en: "Prove that &nbsp;Ô₂ = 2 · ∠DAB." },
      hint: { en: "Ô₂ sits outside triangle AOB, on the far side of O. There is a theorem about an angle like that and the two angles at the far end of the triangle." },
      memo: [
        { type: "step", text: { en: "Ô₂ is the exterior angle of △AOB at O, so &nbsp;Ô₂ = ∠DAB + ∠ABO &nbsp;&nbsp;<i>(ext ∠ of Δ)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ô₂ = (90° − x) + (90° − x) = 2(90° − x) = 2 · ∠DAB" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: an exterior angle equals the sum of the two <b>interior opposite</b> angles — the two at the far end of the triangle, not the one next to it. Here those two happen to be equal, which is the only reason the answer collapses so neatly into twice one of them.",
        } },
      ],
      esplain: {
        en: "This part is asking you to see the same angle a second way. In part (d) you got Ô₂ by treating AOD as a straight line; here you get it by treating it as the exterior angle of triangle AOB, which equals the two interior opposite angles added together. Both routes have to give the same thing, and they do — 180° − 2x and 2(90° − x) are the same expression written differently. What makes the result pretty is that the triangle is isosceles, so the two opposite angles are equal and their sum is simply double one of them. It is a small proof, but it is exactly the kind that closes a Paper 2 question: no new theorem, just two facts you already own pointed at each other.",
      },
    },
  ],
};

export const euclidChordsAndAnglesSiblingQuestions = [ca1, ca2, ca3, ca4, ca5];
