/* ============================================================
   EXAM FOCUS — Euclidean geometry · Circle theorems
   ------------------------------------------------------------
   SOURCE: September Test 2 (practice), QUESTION 4 — the bookwork proof
   (∠ at centre = 2 × ∠ at circumference, acute case) plus the
   line-from-centre-⊥-chord calculation.
   (Composed overnight run #1, stage 3b, 2026-08-21; promoted out of
   js/exam/_pending-engine-port/ and registered 2026-08-22 once the
   Circle Quest engine port landed — js/exam/circle-engine.js.)

   PRINT SOURCE:
     Desktop\Eksamen Vraestelle\Gr11 IEB Nov\Sept Practice\
       Sept-T2-Practice-QP.tex        Q4(a), Q4(b)(1)–(2), \FigFourA/\FigFourB
       Sept-T2-Practice-Memo.tex      4(a)–4(b)(2), 9 ticks
       Sept-T2-blueprint.md           §1, §4 scope walls, §5 judgement 7
       Sept-T2-euclid-specs.md        specQ4a / specQ4b, embedded below
   Same statements, same reasons, same ticks, same WATCH OUT / REMEMBER
   cards as the print memo. `hint` and `esplain` freshly authored.

   CHAPTER: "euclid" — her ruling, morning of 2026-08-22: Euclidean gets
   its own EXAM-FOCUS-ONLY chapter inside Blipwork (js/config.js
   EXAM_ONLY_CHAPTERS). Circle Quest still owns every circle-geo drill
   round; this chapter exists in the 📝 Exam Focus tab and nowhere else —
   no hub quest card, no dice, no admin open/close row.

   ⚠️ lostQuest IS A DOCUMENTED PLACEHOLDER, AND STAYS ONE. Her ruling
   (later the same morning): "Euclidean exam chapter has NO 'I'm lost'
   button — they don't need it anyway." The schema still REQUIRES the
   field, so it carries a PENDING- id that cannot resolve, which is
   exactly what makes the button not render: js/exam-play.js's
   lostQuestLink() bails through three independent gates — the id is
   never in app.state.openQuests, and chapterById("euclid") is null
   because euclid deliberately is NOT in CHAPTERS. Result: no reteach
   link, never a dead end, never a throw. Asserted by both harnesses.

   ⚠️ DIAGRAMS. The print figures are TikZ (Sept-T2-figs.tex); the specs
   below are the in-app equivalents, drawn to scale by
   js/exam/circle-engine.js. Geometry checked by arc arithmetic in
   Sept-T2-verify.py when they were composed, and now re-measured on
   every harness run by the engine's own verifyDiagram() (via
   validateQuestion — js/exam/_schema.js's `diagram` field).
   DO NOT CHANGE: the degrees · D between A and C (the acute case the
   syllabus examines) · Q4(b)'s 12 : 9 : 15 proportions.
   Port-day gap 1 is CLOSED: Q4(b)'s angle at M asks for
   `o.mark: "square"`, the additive right-angle square added to the
   ported engine — a chevron would have read as "these two angles are
   equal", not "this is 90°".

   ⚠️ THE BARE-FIGURE RULE FOR 4(a). The printed question shows the
   figure with NO angle labels at all — the learner constructs the
   x / y labelling as part of the proof. A diagram already carrying x,
   y, 2x, 2y hands the proof over. So `diagram.parts.a.question` sets
   `bare: true` (chords and point labels only, every angle dropped), and
   only the REVEAL side draws specQ4a's full labelling beside the
   worked proof.

   ⚠️ THE SKETCH WALKS WITH THE PROOF (session G3, 2026-08-23). 4(a)
   is bookwork proof 2 of the four, re-homed onto the bookwork-proofs
   tile by js/exam/cards-euclid.js, so its memo carries the same
   per-step `hl` blocks the other three proofs got that day: each `step`
   that changes the picture holds a highlight set in exactly the shape
   of `reveal`, and js/exam/_walk.js renders the last one at or before
   the block the walk has reached. Read js/exam/euclid-bookwork-proofs.js's
   header for the three authoring rules; the one that matters most here
   is that every walk state stays `bare`, so the figure only ever shows
   the wedges the proof has actually reached — and the two the THEOREM is
   about (the unlabelled ∠AOC and ∠ABC) are drawn for the first time on
   the answer, by `reveal`, which no `hl` overrides.
   makeCard copies part objects shallowly, so the memo array (and its
   `hl` blocks) rides across onto the card untouched.

   LEVELS: 1:1 with T2's blueprint — (a) 1, (b)(1) 3, (b)(2) 2. No ★
   (T2's two level-4 parts are 3(e) and 5(d); 5(d) is in the sibling
   file).
   ============================================================ */

const PAPER = "sept-t2";
const LOST_PENDING = { chapter: "euclid", quest: "PENDING-euclid-is-exam-only-no-drill-round" };

/* --- diagram specs, verbatim from Sept-T2-euclid-specs.md ----------- */

export const specQ4a = {
  w: 320, h: 254, cx: 160, cy: 120, R: 80,
  O: true,
  pts: { A: 190, B: 70, C: 320, D: 250 },
  chords: [
    ["A", "B"],        // chord AB
    ["B", "C"],        // chord BC
    ["O", "A"],        // radius OA
    ["O", "C"],        // radius OC
    ["B", "D"],        // BO produced to D  (a diameter, drawn as one segment)
  ],
  angles: [
    { at: "B", legs: ["A", "C"], t: "", o: { v: 65 } },
    { at: "O", legs: ["A", "C"], t: "", o: { v: 130 } },
    { at: "B", legs: ["A", "D"], t: "x", o: { v: 30, r: 52 } },
    { at: "B", legs: ["D", "C"], t: "y", o: { v: 35, r: 52 } },
    { at: "A", legs: ["B", "O"], t: "x", o: { v: 30, r: 46 } },
    { at: "C", legs: ["O", "B"], t: "y", o: { v: 35, r: 46 } },
    { at: "O", legs: ["A", "D"], t: "2x", o: { v: 60, r: 50 } },
    { at: "O", legs: ["D", "C"], t: "2y", o: { v: 70, r: 50, rot: -8 } },
  ],
};

export const specQ4b = {
  w: 320, h: 254, cx: 160, cy: 120, R: 80,
  O: true,
  pts: { P: 216.8699, Q: 323.1301, T: 270 },
  mid: [{ name: "M", of: ["P", "Q"] }],
  chords: [
    ["P", "Q"],        // the chord
    ["O", "T"],        // OM produced to T -- passes through M by construction
  ],
  angles: [
    { at: "M", legs: ["Q", "T"], t: "", o: { v: 90, mark: "square" } },
  ],
};

/* --- 4(a)'s walk states (session G3, 2026-08-23) ---------------------
   Named once and reused, because js/exam/_walk.js's rule is that each
   `hl` is a COMPLETE picture rather than a diff. Every wedge keeps the
   label radius specQ4a gives it, so a wedge never moves between the
   walk and the reveal; `hlR` is pinned to the arc radius angleSVG will
   actually draw (22 under 40 degrees of sweep, 25 above it) instead of
   the 34 px default, because two adjacent 34 px pies at O would wash
   across the whole of angle AOC — the very angle the answer is about.
   The three radii all carry the SAME double tick: OA, OB and OC are
   equal to each other, not in two separate pairs. */
const Q4A_XY_AT_B = [
  { at: "B", legs: ["A", "D"], t: "x", v: 30, o: { r: 52, hlR: 22 } },
  { at: "B", legs: ["D", "C"], t: "y", v: 35, o: { r: 52, hlR: 22 } },
];
const Q4A_OA_OB = [["O", "A", "t2"], ["O", "B", "t2"]];
const Q4A_OA_OB_OC = Q4A_OA_OB.concat([["O", "C", "t2"]]);
const Q4A_X_AT_A = { at: "A", legs: ["B", "O"], t: "x", v: 30, o: { r: 46, hlR: 22 } };
const Q4A_2X_AT_O = { at: "O", legs: ["A", "D"], t: "2x", v: 60, o: { r: 50, hlR: 25 } };
const Q4A_Y_AT_C = { at: "C", legs: ["O", "B"], t: "y", v: 35, o: { r: 46, hlR: 22 } };
const Q4A_2Y_AT_O = { at: "O", legs: ["D", "C"], t: "2y", v: 70, o: { r: 50, rot: -8, hlR: 25 } };

const t2q4 = {
  id: "euclid.circ.t2q4",
  chapter: "euclid",
  topic: "circle-theorems",
  archetype: "bookwork-angle-at-centre-plus-perpendicular-from-centre-to-chord",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 9,
  /* to-scale figures + her per-part marker-pen highlights.
     Validated by js/exam/_schema.js: every spec and every highlighted
     variant is re-measured by the engine's verifyDiagram(). */
  diagram: {
    parts: {
      /* (a) BARE on the question side — see the header's bare-figure
         rule. The reveal restores specQ4a's own x / y / 2x / 2y
         labelling and lights the two angles the statement is ABOUT:
         ∠AOC at the centre and ∠ABC at the circumference. */
      a: {
        spec: specQ4a,
        question: { bare: true },
        reveal: { angles: [
          { at: "O", legs: ["A", "C"], v: 130 },
          { at: "B", legs: ["A", "C"], v: 65 },
        ] },
      },
      /* (b)(1) the chord whose length is given lights up while they
         work; the reveal switches to its two HALVES, EACH WITH AN
         EQUAL-LENGTH TICK, so "the perpendicular from the centre
         bisects the chord" — the mark everyone skips — is the
         picture's own message. The ticks are not decoration: two
         adjacent amber halves look identical to one amber whole, so
         without them the reveal figure is indistinguishable from the
         question figure (seen on the rendered PNG, 2026-08-22). */
      b1: {
        spec: specQ4b,
        question: { chords: [["P", "Q"]] },
        reveal: { chords: [["P", "M", "t1"], ["M", "Q", "t1"]] },
      },
      /* (b)(2) the piece being found, along the radius OT. */
      b2: {
        spec: specQ4b,
        question: { chords: [["M", "T"]] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 5,
      level: 1,
      prompt: {
        en: "In the diagram, O is the centre of the circle. A, B and C are points on the circle. BO is produced to D.<br><br>Prove the theorem which states that &nbsp;∠AOC = 2 · ∠ABC.",
      },
      hint: {
        en: "Start by naming the two halves of the angle at B — call them x and y — and look for the isosceles triangles hiding in the radii. Then remember what an exterior angle of a triangle is worth.",
      },
      memo: [
        /* the two halves of the angle at B get their names — the first
           thing that appears on a figure that started completely bare */
        { type: "step", text: { en: "Let ∠ABO = x &nbsp;and&nbsp; ∠CBO = y." },
          hl: { bare: true, angles: Q4A_XY_AT_B } },
        /* the two radii light, with the ticks that say they are equal */
        { type: "step", text: { en: "OA = OB &nbsp;&nbsp;<i>(radii)</i>" },
          hl: { bare: true, angles: Q4A_XY_AT_B, chords: Q4A_OA_OB } },
        /* the base angle the isosceles triangle hands back */
        { type: "step", text: { en: "∴ ∠OAB = x &nbsp;&nbsp;<i>(∠s opposite equal sides)</i>" }, ticks: ["ca"],
          hl: { bare: true, angles: Q4A_XY_AT_B.concat([Q4A_X_AT_A]), chords: Q4A_OA_OB } },
        /* the first half of the angle at the centre */
        { type: "step", text: { en: "∠AOD = x + x = 2x &nbsp;&nbsp;<i>(exterior ∠ of △AOB)</i>" }, ticks: ["ca"],
          hl: { bare: true, angles: Q4A_XY_AT_B.concat([Q4A_X_AT_A, Q4A_2X_AT_O]), chords: Q4A_OA_OB } },
        /* the same move on the other side: third radius, second base angle */
        { type: "step", text: { en: "OC = OB, so ∠OCB = y &nbsp;&nbsp;<i>(radii; ∠s opposite equal sides)</i>" }, ticks: ["ca"],
          hl: { bare: true, angles: Q4A_XY_AT_B.concat([Q4A_X_AT_A, Q4A_2X_AT_O, Q4A_Y_AT_C]), chords: Q4A_OA_OB_OC } },
        /* and the second half of the angle at the centre */
        { type: "step", text: { en: "∠COD = y + y = 2y &nbsp;&nbsp;<i>(exterior ∠ of △COB)</i>" }, ticks: ["ca"],
          hl: { bare: true, angles: Q4A_XY_AT_B.concat([Q4A_X_AT_A, Q4A_2X_AT_O, Q4A_Y_AT_C, Q4A_2Y_AT_O]), chords: Q4A_OA_OB_OC } },
        /* no `hl`: the answer falls through to `reveal`, which is where
           ∠AOC and ∠ABC themselves are drawn for the first time */
        { type: "answer", text: { en: "∠AOC = 2x + 2y = 2(x + y) = 2 · ∠ABC" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: in bookwork the <b>reasons</b> carry the marks, not the algebra. “∠s opposite equal sides” and “exterior ∠ of a triangle” must appear in words. A proof written as five lines of x's and y's with no reasons scores almost nothing.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: the whole proof is one pattern used twice — <b>isosceles triangle, then exterior angle</b>. Learn it as that pattern and you can rebuild it under pressure, even if you have forgotten the exact letters.",
        } },
      ],
      esplain: {
        en: "Bookwork is the most learnable five marks on any Paper 2, because the proof never changes — only the letters do. The engine of this one is that every radius is the same length, so the moment you draw OA and OB you have an isosceles triangle, and the two angles at its base must be equal. That is where the second x comes from; you did not calculate it, you deduced it. Then the exterior angle of a triangle equals the sum of the two opposite interior angles, so the angle at O sitting outside triangle AOB is x + x = 2x. Do exactly the same on the other side and you get 2y. Add the two pieces at the centre and the two pieces at B, and the centre's total is twice B's total. The reason D is drawn at all is to give you that exterior angle to point at — and the reason D has to sit between A and C is that this is the acute case, the only one the syllabus examines. Write the reasons in words next to every statement; they are literally what is being marked.",
      },
    },
    {
      id: "b1",
      marks: 3,
      level: 3,
      prompt: {
        en: "In the diagram, O is the centre of a circle. PQ is a chord and M is a point on PQ such that OM ⊥ PQ. OM is produced to meet the circle at T. &nbsp;OM = 9 mm and PQ = 24 mm.<br><br>Calculate the length of the radius of the circle.",
      },
      hint: {
        en: "OM ⊥ PQ is not just a right angle — there is a theorem attached to it that tells you something about where M sits on PQ. Get that first, then you have a right-angled triangle with two known sides.",
      },
      memo: [
        { type: "step", text: { en: "PM = MQ = 12 mm &nbsp;&nbsp;<i>(line from the centre ⊥ to a chord bisects the chord)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∠OMP = 90°, so Pythagoras applies in △OMP: &nbsp;OP² = OM² + PM² = 9² + 12² = 81 + 144 = 225" }, ticks: ["ca"] },
        { type: "answer", text: { en: "OP = 15 mm &nbsp;&nbsp;∴ radius = 15 mm" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: PM is 12, not 24. The perpendicular from the centre <i>halves</i> the chord — using the whole 24 gives OP = 25,63…, which is the single most common wrong answer to this question.",
        } },
      ],
      esplain: {
        en: "Two facts have to be joined here, and the theorem is the one people skip. A perpendicular dropped from the centre onto a chord always lands exactly in the middle of it — so OM ⊥ PQ is quietly telling you that PM is half of PQ, which is 12, not 24. That is a mark on its own and it needs its reason written in words. Once you have it, the picture is an ordinary right-angled triangle: OM = 9 up the middle, PM = 12 along the chord, and OP is the hypotenuse, which is also a radius because P is on the circle. Pythagoras finishes it, and 9 : 12 : 15 is just the 3 : 4 : 5 triangle scaled by three — worth recognising, because it means no rounding is involved anywhere.",
      },
    },
    {
      id: "b2",
      marks: 1,
      level: 2,
      prompt: {
        en: "Hence calculate the length of MT.",
      },
      hint: {
        en: "T is on the circle and O is the centre, so what does that make OT? And notice where M sits along that line.",
      },
      memo: [
        { type: "step", text: { en: "OT is a radius as well, so OT = 15 mm, and M lies on OT:" } },
        { type: "answer", text: { en: "MT = OT − OM = 15 − 9 = 6 mm" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The word “hence” is telling you this part rides on the last one, and it does — the whole job is realising that OT is a radius too, so the 15 you just worked out belongs to it as well. Then M is simply a point sitting on that radius, 9 mm from O, so what is left over is 15 − 9. One mark, one subtraction, and the follow-through rule means that even if your radius in (b)(1) had come out wrong, subtracting 9 from it correctly still earns this mark.",
      },
    },
  ],
};

export const euclidCircleTheoremsQuestions = [t2q4];
