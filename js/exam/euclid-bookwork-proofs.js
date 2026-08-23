/* ============================================================
   EXAM FOCUS — Euclidean geometry · THE BOOKWORK PROOFS
   (Exam Focus build day, 2026-08-23 — EXAM-BUILD-DAY.md ruling 4,
   session G1. Tile `bookwork-proofs`, "The four bookwork proofs".)
   ------------------------------------------------------------
   THE FOUR PROOFS the Grade 11 syllabus examines, ACUTE CASE ONLY
   (GR11-IEB-PAPER-BANK.md scope wall; converses are never proved):

     1. a line drawn from the centre ⊥ to a chord bisects the chord
     2. ∠ at centre = 2 × ∠ at circumference          ← NOT in this file
     3. opposite ∠s of a cyclic quadrilateral are supplementary
     4. the tangent–chord theorem

   Proof 2 is ALREADY WRITTEN, as part (a) of the seeded question
   `euclid.circ.t2q4` (js/exam/euclid-circle-theorems.js). It is not
   re-composed here — js/exam/cards-euclid.js re-homes it onto this
   tile with makeCard, so this file holds THREE questions and the tile
   holds FOUR cards. (SURVEY-Nov-P2.md: the bookwork item rotates one
   proof per year, so a learner has to own all four.)

   WHY LEVEL 1, on a proof worth five or six marks: bookwork is RECALL.
   The figure is always given, the statements never change, and the only
   thing between the learner and full marks is having learned it. Her
   grid classifies that as level 1 and so does the SAG. Nothing on this
   tile is starred.

   REASONS ARE VERBATIM SAG SHORT FORMS (EUCLID-ACCEPTABLE-REASONS.md)
   and they are what the marker pays for — every reason sits in italics
   beside its statement, and the trap cards say so out loud.

   THE FIGURES, and the one rule that shapes them.
   Each proof carries a to-scale circle spec drawn by
   js/exam/circle-engine.js and re-measured by verifyDiagram on every
   harness run. Two deliberate decisions:

     · THE CONSTRUCTION IS NOT DRAWN ON THE QUESTION SIDE, AND IS
       DRAWN ON THE REVEAL. A printed bookwork figure shows the GIVEN
       and nothing else — "join OA and OB", "draw the diameter TOC" is
       the candidate's own first mark (SURVEY-Nov-P2.md's figure notes
       for the 2023, 2022 and 2021 bookwork items all read that way).
       So no BASE spec here draws a construction line, the memo's first
       tick is the construction, and each card carries a trap card
       saying it earns a mark. But a learner reading "Construction:
       join OA and OB" has to SEE those lines to follow the rest of the
       proof, so each part's `reveal` carries a `construction` block
       (js/exam/circle-engine.js's additive extension, added for this
       tile): the points and segments the construction creates, drawn
       in ordinary ink — SOLID, because that is the only stroke the
       engine draws and it is what a pencil does anyway — with the
       engine's equal-length ticks where the proof leans on two lines
       being equal. Everything the construction creates is re-measured
       by verifyDiagram exactly like the given figure.
     · THE QUESTION SIDE IS BARE. `question: { bare: true }` strips the
       spec's own angle labelling, because a figure already carrying
       x, y, 2x, 2y hands the proof over (the same bare-figure rule
       euclid-circle-theorems.js applies to 4(a)). The REVEAL restores
       the labelling and lights the two angles — or, for proof 1, the
       two chord halves with equal-length ticks — that the statement is
       actually about.

   Proof 1's figure is the exception that proves the rule: its only
   marked angle is the GIVEN right angle at M, so there is no labelling
   to hide and no `bare` flag. Its question side shows letters, the
   chord, the perpendicular and the right-angle square, exactly like the
   printed paper.

   THE SKETCH WALKS WITH THE PROOF (session G3, 2026-08-23 — her ask on
   her phone: "show the steps on the sketch as well if the kids tapped on
   'walk me through it'"). Every memo `step` on this tile that changes
   the picture carries an `hl` — a highlight set in exactly the shape of
   its part's `reveal` — and js/exam/_walk.js renders the LAST one at or
   before the block the walk has reached. Three rules shaped what each
   step lights:

     · LIGHT WHAT THE SENTENCE IS TALKING ABOUT, and nothing else. The
       amber marker is the reader's finger following the words.
     · NEVER LIGHT SOMETHING THE LEARNER HAS NOT BEEN TOLD YET. That is
       why every walk state on the three `bare` figures stays bare and
       names its own wedges: the two angles the THEOREM is about are the
       last thing to appear, on the answer.
     · THE ANSWER IS THE REVEAL. No `answer` block here carries its own
       `hl`, so js/exam/_walk.js falls through to `reveal` and the walk
       ends on the identical picture the "Done! Show me the answer" path
       draws. `reveal` stays the single source of truth for the finished
       figure.

   ONE DELIBERATE DEPARTURE from the tick-first instinct, on proof 1:
   the construction draws OA and OB in PLAIN ink first ("Construction:
   join OA and OB" says nothing about their lengths), and the ‖ ticks
   arrive one step later, WITH the amber, on "OA = OB (radii)" — because
   the ticks ARE that sentence's claim, and a figure that has already
   made it has told the learner the next line of their own proof. From
   that step on the construction is tick-for-tick the reveal's own.

   lostQuest: the documented euclid placeholder — her ruling
   (2026-08-22): the Euclidean exam chapter has NO "I'm lost" button.
   See js/exam/euclid-circle-theorems.js's header for the full
   reasoning; not repeated here.
   ============================================================ */

const CH = "euclid";
const PAPER = "siblings";
const LOST_PENDING = { chapter: "euclid", quest: "PENDING-euclid-is-exam-only-no-drill-round" };

/* ---------------------------------------------------------------
   PROOF 1 — A LINE FROM THE CENTRE ⊥ A CHORD BISECTS THE CHORD.
   Circle centre O, chord AB with A at 215° and B at 325°, so the two
   points are symmetric about 270° and `mid` puts M at the foot of the
   perpendicular: OM runs straight down the 270° line and meets AB at
   right angles. Drawn OM = R·cos55° = 44,7 px, half-chord =
   R·sin55° = 65,5 px — a comfortable, readable triangle rather than
   the sliver a wider chord would give.
   The right angle at M is GIVEN (the stem says OM ⊥ AB), so it is the
   spec's own angle and stays on both sides of the reveal; it is marked
   with the engine's Blipwork-only right-angle SQUARE, never a chevron.
   --------------------------------------------------------------- */
const SPEC_BW1 = {
  w: 320, h: 254, cx: 160, cy: 120, R: 80,
  O: true,
  pts: { A: 215, B: 325 },
  mid: [{ name: "M", of: ["A", "B"] }],
  chords: [["A", "B"], ["O", "M"]],
  angles: [
    { at: "M", legs: ["B", "O"], t: "", o: { v: 90, mark: "square" } },
  ],
};

/* --- bw1's walk states, named once and shared -----------------------
   Each `hl` below is a COMPLETE picture (js/exam/_walk.js's rule), so
   the pieces that persist are written once here and reused rather than
   retyped four times. The construction starts un-ticked and gains its
   ‖ ticks on the "OA = OB (radii)" line — see this file's header. The
   right angles keep a SMALL amber pie (hlR 15) so the marker hugs the
   11 px right-angle square instead of throwing a 34 px wash across the
   middle of the triangle, which is where OM and both radii live. */
const BW1_CON = { chords: [["O", "A"], ["O", "B"]] };
const BW1_CON_TICKED = { chords: [["O", "A", "t2"], ["O", "B", "t2"]] };
const BW1_RIGHT_ANGLES = [
  { at: "M", legs: ["B", "O"], v: 90, o: { mark: "square", hlR: 15 } },
  { at: "M", legs: ["A", "O"], v: 90, o: { mark: "square", hlR: 15 } },
];

const bw1 = {
  id: "euclid.bw.q1",
  chapter: CH,
  topic: "bookwork-proofs",
  archetype: "bookwork-line-from-centre-perpendicular-to-chord-bisects-the-chord",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 5,
  intro: {
    en: "In the diagram, O is the centre of the circle. AB is a chord of the circle and M is a point on AB such that &nbsp;OM ⊥ AB.",
  },
  diagram: {
    parts: {
      a: {
        spec: SPEC_BW1,
        /* nothing to hide: the only marked angle is the given right
           angle, so the question side IS the printed figure. */
        question: {},
        /* The reveal does two things at once. The CONSTRUCTION draws
           the two radii the proof cannot start without, each carrying a
           double tick — that is the "OA = OB (radii)" line of the
           congruency, made visible. The HIGHLIGHT then lights the two
           halves of the chord, each with its own single tick, because
           two adjacent amber halves look identical to one amber whole,
           so the ticks are what make "bisects" the picture's own
           message (the lesson euclid-circle-theorems.js learned on
           4(b)(1)). Two tick counts, two different equalities: ‖ on the
           radii, | on the halves. */
        reveal: {
          chords: [["A", "M", "t1"], ["M", "B", "t1"]],
          construction: { chords: [["O", "A", "t2"], ["O", "B", "t2"]] },
        },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 5,
      level: 1,
      prompt: {
        en: "Prove the theorem which states that a line drawn from the centre of a circle perpendicular to a chord bisects the chord. &nbsp;That is, prove that &nbsp;<b>AM = MB</b>.",
      },
      hint: {
        en: "Two triangles are hiding in this picture, but only once you draw two more lines. Which two lines from O would turn OM into a shared side of a pair of triangles — and what do you already know about their lengths?",
      },
      memo: [
        /* the two lines appear, plain ink, nothing claimed about them yet */
        { type: "step", text: { en: "<b>Construction:</b> join OA and OB." }, ticks: ["ca"],
          hl: { construction: BW1_CON } },
        /* both right angles at M — the spec only ever drew ∠OMB's square,
           so this is where ∠OMA's appears and where the pair reads as a pair */
        { type: "step", text: { en: "In △OMA and △OMB:<br>∠OMA = ∠OMB = 90° &nbsp;&nbsp;<i>(given: OM ⊥ AB)</i>" }, ticks: ["ca"],
          hl: { construction: BW1_CON, angles: BW1_RIGHT_ANGLES } },
        /* the radii light, and the ‖ ticks that SAY "equal" arrive with
           the sentence that says it */
        { type: "step", text: { en: "OA = OB &nbsp;&nbsp;<i>(radii)</i>" }, ticks: ["ca"],
          hl: { construction: BW1_CON_TICKED, chords: [["O", "A"], ["O", "B"]], angles: BW1_RIGHT_ANGLES } },
        /* the shared side. The radii keep their ticks (ink) but hand the
           marker over to OM, so the amber is always the line being talked
           about — by now the picture holds all three facts of the RHS. */
        { type: "step", text: { en: "OM = OM &nbsp;&nbsp;<i>(common)</i>" }, ticks: ["ca"],
          hl: { construction: BW1_CON_TICKED, chords: [["O", "M"]], angles: BW1_RIGHT_ANGLES } },
        /* no `hl`: an answer block falls through to `reveal`, so the walk
           ends on exactly the figure the Done path draws */
        { type: "answer", text: { en: "∴ △OMA ≡ △OMB &nbsp;&nbsp;<i>(RHS)</i><br>∴ AM = MB" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: <b>the construction line is a mark.</b> The printed figure never shows OA and OB — you draw them and you write “join OA and OB” as your first line. A proof that starts at “OA = OB” has already lost a mark for a line that takes three seconds.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: congruency needs <b>three</b> facts and the right label. Right angle, hypotenuse, side &nbsp;⟹&nbsp; <b>RHS</b>. Writing SSS or SAS here scores nothing, even though the triangles really are congruent.",
        } },
      ],
      esplain: {
        en: "This is the shortest of the four proofs, and it is really just a congruency question wearing a circle. The whole trick is the construction: the moment you join OA and OB, you have two triangles that share the side OM, and their long sides OA and OB have to be equal because both are radii. Add the right angle that was handed to you, and you have a right angle, a hypotenuse and a matching side — which is exactly RHS. Congruent triangles have all their matching parts equal, so AM must equal MB, and that is the theorem. Learn it as a picture: two radii dropped in, one shared upright, one right angle. If you can draw that picture from memory you can write the proof from memory, and it is worth five marks every time it is asked.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   PROOF 3 — OPPOSITE ANGLES OF A CYCLIC QUADRILATERAL ARE
   SUPPLEMENTARY.
   A, B, C, D at 110°, 180°, 310°, 40° — anticlockwise order A → B →
   C → D, so ABCD really is a quadrilateral and not a crossed one. Arcs
   AB 70°, BC 130°, CD 90°, DA 70°: none is bigger than 180°, so the
   centre O falls INSIDE the quadrilateral, which is the acute-case
   picture the construction needs.
     Â = ½(arc BCD) = ½(220°) = 110°   Ĉ = ½(arc DAB) = ½(140°) = 70°
   and 110 + 70 = 180, which is the theorem measuring itself. The two
   angles the construction makes at the centre are therefore 220° and
   140° — and picking Â well away from 90° is the whole reason those
   degrees are what they are. The first build had Â = 95°, which put
   the two construction radii 170° apart: they rendered as ONE straight
   line through O and the picture quietly claimed BD was a diameter
   (foreman review, 2026-08-23). At 140° apart they read as two.
   The spec labels Â and Ĉ x and y; `bare` hides them while the learner
   works, and the reveal brings them back and lights both.
   --------------------------------------------------------------- */
const SPEC_BW3 = {
  w: 320, h: 254, cx: 160, cy: 120, R: 80,
  O: true,
  pts: { A: 110, B: 180, C: 310, D: 40 },
  chords: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]],
  /* EVERY LABEL ON THIS FIGURE SITS INSIDE ITS OWN ARC (her phone review,
     2026-08-23: the first build "is a bit deurmekaar [messy], but what you
     can do here is put that 2x and 2y inside the angle arc and have more
     space for the x and y then"). Four wedges meet in a small picture —
     two at the centre sharing both their arms — and a label parked OUTSIDE
     its arc has to be pushed 26–44 px into the middle of the circle, which
     is where all four of them collided. Tucked between the vertex and the
     arc, each one is unmistakably attached to its own vertex and the
     middle of the figure stays empty.
     `r` is explicit here because x / y / 2x / 2y are VALUES, not index
     digits — the engine's automatic inside-the-arc rule only fires for a
     bare "1" / "2" / "3" (idxLabelR). Each `r` is ≈0,55 of its own `ar`,
     the same proportion that rule uses, so the whole figure reads as one
     system. */
  angles: [
    { at: "A", legs: ["D", "B"], t: "x", o: { v: 110, r: 15, ar: 26 } },
    { at: "C", legs: ["B", "D"], t: "y", o: { v: 70, r: 14, ar: 24 } },
  ],
};

/* --- bw2's walk states ----------------------------------------------
   Every state here is `bare`, so the figure carries ONLY the wedges the
   proof has reached — the spec's own x and y stay hidden until they are
   introduced, and the O-wedges are named 1 and 2 (bare index digits, so
   the engine's idxLabelR tucks them inside their own arc) before they
   are valued 2x and 2y. Each wedge keeps the arc radius and label
   radius the REVEAL gives it, so nothing shifts position as the walk
   turns a name into a value.
   The construction (OB and OD) is the same object at every state: those
   two lines are drawn on the very first step and never move again. */
const BW2_CON = { chords: [["O", "B"], ["O", "D"]] };
/* the two centre wedges, as a function of what they are called yet.
   The REFLEX one (220 degrees, C's side of BD) is O-hat-1 = 2A-hat; the
   140 degree one on A's side is O-hat-2 = 2C-hat. They share both arms
   and fill the revolution between them, so — exactly as on the reveal —
   the reflex one takes the INNER arc (30) and the other the OUTER (44),
   or they would draw one closed circle round O and say nothing. */
const bw2Centre = (t1, t2) => [
  { at: "O", legs: ["D", "B"], t: t1, v: 220, o: { reflex: 1, r: 17, ar: 30, hlR: 30 } },
  { at: "O", legs: ["D", "B"], t: t2, v: 140, o: { r: 25, ar: 44, hlR: 44 } },
];
/* A-hat and C-hat, on the same arcs the spec draws them on */
const BW2_XY = [
  { at: "A", legs: ["D", "B"], t: "x", v: 110, o: { r: 15, ar: 26, hlR: 26 } },
  { at: "C", legs: ["B", "D"], t: "y", v: 70, o: { r: 14, ar: 24, hlR: 24 } },
];

const bw3 = {
  id: "euclid.bw.q2",
  chapter: CH,
  topic: "bookwork-proofs",
  archetype: "bookwork-opposite-angles-of-a-cyclic-quadrilateral-are-supplementary",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 6,
  intro: {
    en: "In the diagram, ABCD is a cyclic quadrilateral of the circle with centre O.",
  },
  diagram: {
    parts: {
      a: {
        spec: SPEC_BW3,
        question: { bare: true },
        /* The construction joins O to the two OPPOSITE vertices the
           proof works across, B and D, and the reveal then labels the
           two angles it creates at the centre — Ô₁ = 2x on C's side
           (the REFLEX one, 190°, because Â is obtuse) and Ô₂ = 2y on
           A's side (170°). Seeing those two wedges fill the whole
           revolution is the entire proof in one picture. */
        reveal: {
          angles: [
            /* the two marker-pen wedges at A and C carry the SAME arc
               radius as the spec's own wedge there, so the highlight
               lands exactly on the arc already drawn instead of adding a
               second one 7 px outside it — a double arc was half of why
               x and y looked crowded. hlR matches too, so the amber pie
               ends where the arc ends rather than spilling past it. */
            { at: "A", legs: ["D", "B"], v: 110, o: { ar: 26, hlR: 26 } },
            { at: "C", legs: ["B", "D"], v: 70, o: { ar: 24, hlR: 24 } },
            /* THE TWO WEDGES AT THE CENTRE. They share both arms and
               together fill the revolution, so they cannot have the same
               arc radius — that would draw one closed circle round O and
               say nothing. The REFLEX one is the inner arc (30) and the
               140° one the outer (44), and each label sits inside its own
               arc at ≈0,55 of it.
               Why the reflex arc has to be the inner of the two: chord BC
               passes only 33,8 px from O (measured: R·cos½∠BOC), and the
               reflex wedge is the one that spans it, so anything bigger
               than ~33 there would cut straight across a drawn chord. The
               140° wedge faces A, where the nearest chord is 65,5 px out,
               so 44 is free.
               NEITHER LABEL ROTATES ANY MORE, and dropping rot is not
               cosmetic. The old ±45 existed to stop a label parked 40–44
               px out from being read as the vertex it points at; a label
               17–25 px from O cannot be mistaken for anything but O's, so
               the reason is gone. And rot has a cost: computeGeometry
               works out the label position WITHOUT it (the ported core
               only applies rot in angleSVG), so placeCentreLabel — which
               steers the "O" letter away from every angle label — dodges
               a position the rotated label no longer occupies. With rot
               45 on 2x the "O" landed 3 px from it. At rot 0 the two
               agree and O gets pushed properly clear.
               On the bisector at 290° and only 17 px out, 2x still keeps
               21,8 px of daylight from chord BC and 16 px from each of
               its own arms. */
            { at: "O", legs: ["D", "B"], t: "2y", v: 140, o: { r: 25, ar: 44, hlR: 44 } },
            { at: "O", legs: ["D", "B"], t: "2x", v: 220, o: { reflex: 1, r: 17, ar: 30, hlR: 30 } },
          ],
          construction: { chords: [["O", "B"], ["O", "D"]] },
        },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 6,
      level: 1,
      prompt: {
        en: "Prove the theorem which states that the opposite angles of a cyclic quadrilateral are supplementary. &nbsp;That is, prove that &nbsp;<b>Â + Ĉ = 180°</b>.",
      },
      hint: {
        en: "Â and Ĉ both stand on the same chord, BD — one from each side of it. So join the centre to B and to D, and use the one theorem that turns an angle at the circumference into an angle at the centre. Twice.",
      },
      memo: [
        /* the two lines to the centre appear, and the two wedges they
           create are NAMED — which is exactly what the sentence does */
        { type: "step", text: { en: "<b>Construction:</b> join OB and OD. &nbsp;Call the angle at O on C's side of BD &nbsp;Ô₁, and the angle on A's side &nbsp;Ô₂." }, ticks: ["ca"],
          hl: { bare: true, construction: BW2_CON, angles: bw2Centre("1", "2") } },
        /* now the two angles the theorem is about get their letters */
        { type: "step", text: { en: "Let &nbsp;Â = x&nbsp; and &nbsp;Ĉ = y." },
          hl: { bare: true, construction: BW2_CON, angles: bw2Centre("1", "2").concat(BW2_XY) } },
        /* O-hat-1 stops being a name and becomes a value */
        { type: "step", text: { en: "Ô₁ = 2x &nbsp;&nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i>" }, ticks: ["ca"],
          hl: { bare: true, construction: BW2_CON, angles: bw2Centre("2x", "2").concat(BW2_XY) } },
        /* and so does O-hat-2 — from here the picture IS the proof */
        { type: "step", text: { en: "Ô₂ = 2y &nbsp;&nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i>" }, ticks: ["ca"],
          hl: { bare: true, construction: BW2_CON, angles: bw2Centre("2x", "2y").concat(BW2_XY) } },
        /* no `hl` on the next two: "they fill the revolution" and the
           algebra that follows add nothing a picture can show that the
           two wedges meeting round O are not already showing */
        { type: "step", text: { en: "Ô₁ + Ô₂ = 360° &nbsp;&nbsp;<i>(∠s round a pt)</i>" }, ticks: ["ca"] },
        { type: "step", text: { en: "∴ 2x + 2y = 360°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x + y = 180°<br>∴ Â + Ĉ = 180°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: <b>the construction line is a mark.</b> Nothing in this proof works until OB and OD are drawn, so “join OB and OD” is your first written line — before any x or y appears.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: the two angles at O are on <b>opposite sides of BD</b>, and together they fill the whole revolution — that is why the reason is <i>∠s round a pt</i> and the total is 360°, not 180°. Writing 180° here is the slip that costs the last three marks.",
        } },
      ],
      esplain: {
        en: "Both of the angles you care about stand on the same chord, BD — Â from one side of it and Ĉ from the other. That is the clue to join the centre to B and to D, because then each of those angles has a partner at the centre standing on the very same arc, and the angle-at-centre theorem doubles it. So the C-side angle at O is 2x and the A-side one is 2y. Now look at the point O itself: those two angles are all there is, and going once around a point always adds to 360°. So 2x + 2y = 360°, and halving gives x + y = 180°. Notice the proof never touches B̂ or D̂ at all — the same argument run on the other chord, AC, is what proves that second pair. Learn this one as: same chord, two centres, one revolution, halve it.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   PROOF 4 — THE TANGENT–CHORD THEOREM.
   Tangent SR touches the circle at T (T at 270°, so the tangent is the
   horizontal line through the bottom of the circle and the engine's
   "tg+" leg is the ray T→R). A is at 20° and B at 150°.
     ∠ATR = ½(arc TA cut off on R's side) = ½(110°) = 55°
     ∠ABT = ½(the same arc)               = 55°
   B sits on the major arc — the alternate segment, the far side of TA
   from R — which is exactly what makes the two angles a tangent–chord
   pair. Both are labelled x in the spec, hidden by `bare` while the
   learner works, restored and lit on the reveal.
   The construction (the diameter TC and the chord AC) is NOT drawn:
   see this file's header.
   Canvas 340 × 268 with the circle pushed up (cy 112) so the full
   tangent line and its S / R end labels fit under it.
   --------------------------------------------------------------- */
const SPEC_BW4 = {
  w: 340, h: 268, cx: 170, cy: 112, R: 78,
  O: true,
  pts: { T: 270, A: 20, B: 150 },
  tang: [{ at: "T", len: 118, lab: ["S", "R"] }],
  chords: [["T", "A"], ["B", "T"], ["B", "A"]],
  angles: [
    { at: "T", legs: ["A", "tg+"], t: "x", o: { v: 55 } },
    { at: "B", legs: ["T", "A"], t: "x", o: { v: 55 } },
  ],
};

/* --- bw3's walk states ----------------------------------------------
   The construction (the diameter TC and the chord CA) lands on the very
   first step and stays; every later state repeats it. Every state is
   `bare`, so the angle at B — the far half of the theorem — is the ONE
   thing the walk never draws: it appears on the answer, with the
   reveal, which is the moment the proof earns it.
   The three wedges that share the vertex T are deliberately given three
   different sizes: x takes the ordinary arc, the tangent-diameter right
   angle keeps a tight amber pie round its square (hlR 16) so it does
   not wash over the other two, and 90 degrees minus x sits on the OUTER
   arc (34) between TC and TA. */
const BW3_CON = { pts: { C: 90 }, chords: [["T", "C"], ["C", "A"]] };
const BW3_X_AT_T = { at: "T", legs: ["A", "tg+"], t: "x", v: 55, o: { hlR: 25 } };
const BW3_TAN_RIGHT = { at: "T", legs: ["C", "tg+"], v: 90, o: { mark: "square", hlR: 16 } };
/* UNLABELLED, and that took a re-shoot to learn. "90 degrees minus x"
   is seven characters, and labelR pushes a label that long 58 px out
   along its bisector — which at this vertex is 19 px under the "O",
   straddling the diameter TC, reading as an annotation of the middle
   of the circle rather than of the thin wedge at T it belongs to
   (crop tools/diags-walk/euclid.bw.q3.a-a-w04.png, first pass). T
   already carries x and the tangent-diameter square; a third label
   there has nowhere to stand. So this wedge speaks by LIGHTING
   instead: it takes the OUTER arc (34, clear of x's 25 and the
   square's 11) and appears on the exact step whose sentence names
   it, which is the whole rule this tile's walk is built on. */
const BW3_CTA = { at: "T", legs: ["C", "A"], v: 35, o: { ar: 34, hlR: 34 } };
const BW3_SEMI_RIGHT = { at: "A", legs: ["T", "C"], v: 90, o: { mark: "square", hlR: 16 } };
const BW3_X_AT_C = { at: "C", legs: ["T", "A"], t: "x", v: 55, o: { r: 40, ar: 24, hlR: 24 } };

const bw4 = {
  id: "euclid.bw.q3",
  chapter: CH,
  topic: "bookwork-proofs",
  archetype: "bookwork-tangent-chord-theorem-angle-in-the-alternate-segment",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 6,
  intro: {
    en: "In the diagram, O is the centre of the circle and &nbsp;SR&nbsp; is a tangent to the circle at T. &nbsp;TA is a chord, and B is a point on the circle in the alternate segment — the far side of TA from R.",
  },
  diagram: {
    parts: {
      a: {
        spec: SPEC_BW4,
        question: { bare: true },
        /* The construction is the diameter TC — C is a NEW point, the
           far end of the diameter from the point of contact, so it
           exists only on this side of the reveal — plus the chord CA.
           With those two lines in, the reveal can light the whole
           bridge the proof walks across: the right angle where the
           tangent meets the diameter, the right angle in the
           semi-circle at A, the x that the angle sum leaves at C, and
           the two x's the theorem claims are equal. */
        reveal: {
          angles: [
            { at: "T", legs: ["A", "tg+"], v: 55 },
            { at: "B", legs: ["T", "A"], v: 55 },
            { at: "T", legs: ["C", "tg+"], v: 90, o: { mark: "square" } },
            { at: "A", legs: ["T", "C"], v: 90, o: { mark: "square" } },
            { at: "C", legs: ["T", "A"], t: "x", v: 55, o: { r: 40, ar: 24 } },
          ],
          construction: { pts: { C: 90 }, chords: [["T", "C"], ["C", "A"]] },
        },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 6,
      level: 1,
      prompt: {
        en: "Prove the theorem which states that the angle between a tangent to a circle and a chord drawn from the point of contact is equal to the angle in the alternate segment. &nbsp;That is, prove that &nbsp;<b>∠ATR = ∠ABT</b>.",
      },
      hint: {
        en: "Start at T and draw the one line through the centre — a diameter. That hands you a right angle where it meets the tangent, and a second right angle at the far end of the chord. Everything else is angles of a triangle.",
      },
      memo: [
        /* C appears at the far end of the diameter, and CA is joined —
           new ink, no claims yet */
        { type: "step", text: { en: "<b>Construction:</b> draw the diameter TC through O, and join AC." }, ticks: ["ca"],
          hl: { bare: true, construction: BW3_CON } },
        /* the given angle gets its name */
        { type: "step", text: { en: "Let &nbsp;∠ATR = x." },
          hl: { bare: true, construction: BW3_CON, angles: [BW3_X_AT_T] } },
        /* the first right angle: tangent meets diameter */
        { type: "step", text: { en: "∠CTR = 90° &nbsp;&nbsp;<i>(tan ⊥ diameter)</i>" }, ticks: ["ca"],
          hl: { bare: true, construction: BW3_CON, angles: [BW3_X_AT_T, BW3_TAN_RIGHT] } },
        /* what is left of that right angle, written on the figure */
        { type: "step", text: { en: "∴ ∠CTA = 90° − x" }, ticks: ["ca"],
          hl: { bare: true, construction: BW3_CON, angles: [BW3_X_AT_T, BW3_TAN_RIGHT, BW3_CTA] } },
        /* the second right angle: the angle in the semi-circle */
        { type: "step", text: { en: "∠TAC = 90° &nbsp;&nbsp;<i>(∠s in semi-circle)</i>" }, ticks: ["ca"],
          hl: { bare: true, construction: BW3_CON, angles: [BW3_X_AT_T, BW3_TAN_RIGHT, BW3_CTA, BW3_SEMI_RIGHT] } },
        /* the triangle's third angle turns out to be x again — the far
           end of the bridge, one step short of walking it across to B */
        { type: "step", text: { en: "∴ ∠TCA = 180° − 90° − (90° − x) = x &nbsp;&nbsp;<i>(int. ∠s of △)</i>" }, ticks: ["ca"],
          hl: { bare: true, construction: BW3_CON, angles: [BW3_X_AT_T, BW3_TAN_RIGHT, BW3_CTA, BW3_SEMI_RIGHT, BW3_X_AT_C] } },
        /* no `hl`: the answer IS the reveal, which is the first and only
           time the angle at B is marked */
        { type: "answer", text: { en: "∠ABT = ∠TCA &nbsp;&nbsp;<i>(∠s in the same seg)</i><br>∴ ∠ABT = x = ∠ATR" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: <b>the construction line is a mark.</b> “Draw the diameter TC and join AC” is the first thing on the page — and it has to be a <b>diameter</b>, through O. Any other line through T gives you no right angle and no proof.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: the last step needs C and B on the <b>same side</b> of the chord TA — that is what makes ∠TCA and ∠ABT angles in the same segment. Saying “same segment” for two angles on opposite sides of the chord is the classic way to lose the final mark.",
        } },
      ],
      esplain: {
        en: "The tangent–chord theorem looks like magic because the two equal angles are nowhere near each other, so the proof builds a bridge between them out of two right angles. Drawing the diameter from the point of contact gives you the first one, because a tangent always meets a diameter at 90°. That splits the right angle at T into your x and whatever is left, which is 90° − x. The second right angle is free: any angle standing on a diameter from the circle is 90°, so the angle at A in triangle TAC is a right angle. Now the angles of that triangle must add to 180°, and the only thing left over for the angle at C is x itself. The last step just walks x across to B, because C and B sit on the same side of the chord TA and so see it at equal angles. Two right angles and a triangle — that is the whole bridge.",
      },
    },
  ],
};

export const euclidBookworkProofQuestions = [bw1, bw3, bw4];
