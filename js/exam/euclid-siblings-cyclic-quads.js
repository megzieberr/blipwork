/* ============================================================
   EXAM FOCUS — Euclidean geometry · SIBLING CARDS for the tile
   "cyclic-quads" (Cyclic quadrilaterals)
   (Exam Focus build day, 2026-08-23 — EXAM-BUILD-DAY.md ruling 4,
   session G2.)
   ------------------------------------------------------------
   SIX CHAINED RIDERS, one sketch each, 5–6 dependent parts on that
   sketch, levels 1–3 only (the ★ questions live on the Level 4 tile).

   HER DESIGN, and the recipe, are session G1's — read the header of
   js/exam/euclid-siblings-chords-and-angles.js before changing anything
   here. This file follows it word for word:

     · ONE spec per rider; every UNKNOWN the parts ask about is drawn as
       a NAMED wedge ("1", "2", or the full three-letter name), never as
       a value;
     · `specAfter(base, found)` clones the base spec and adds one VALUE
       KEY line per answer already worked out — "Ĉ = 80°" — beside the
       circle. Part n's figure uses `specAfter(BASE, parts 1…n−1)`, so
       the sketch grows as the learner works and never carries the
       answer to the part in front of it;
     · WEDGES CARRY NAMES, THE KEY CARRIES VALUES. G1 measured this: a
       value written inside a central wedge collides with the chord at
       phone width, and the engine's own header prescribes the key as
       the fix. A GIVEN whose vertex carries only ONE wedge still sits
       on the wedge ("65°"); a given at a NUMBERED vertex goes into the
       base key instead, so it can never be read as a wedge number;
     · a part's REVEAL lights the PAIR the reason is about — the two
       angles in the same segment, the interior-opposite pair, or (the
       prove-cyclic parts) THE FOUR SIDES of the quadrilateral, which is
       her own worked example in EXAM-FOCUS-PLAN.md;
     · INDEX LABELS SIT INSIDE THEIR ARC — Megan's ruling on the build
       day's first contact sheet, and now the engine's own default: a
       bare digit ("1", "2", "3") renders smaller and at 0,55 × its arc
       radius, so it reads as a name pinned inside its wedge rather than
       as a value floating beside it. That default only applies when the
       spec sets NO `o.r`, so NOT ONE numbered wedge in this file sets
       one; what is tuned instead is `o.ar`, the arc radius, which is
       what the digit is then measured against. At a shared vertex the
       two arcs are given roughly 1,8 × different radii and the NARROWER
       wedge takes the BIGGER arc (it has less room close in), so the two
       digits separate radially as well as angularly. A vertex carrying
       three wedges uses outer / inner / outer — 40, 20, 40 — which
       keeps every ADJACENT pair a full 2 × apart. Every highlight
       repeats its base wedge's `ar` (and a matching `hlR`), so a lit
       wedge shows ONE arc rather than two at different radii.
     · a wedge with a WORD or a value on it ("35°", "x") still sets its
       own `o.r`, measured from the crops — the index default deliberately
       does not touch those.

   EVERY NUMBER ON EVERY FIGURE IS REAL. Each rider's point degrees were
   chosen by arc arithmetic (a central angle IS its arc; an inscribed
   angle is HALF the arc on the far side of its arms) so that every
   stated angle measures exactly. validateQuestion re-measures every
   wedge through verifyDiagram at 1,5°, and verify-exam-modules.mjs
   section 9h recomputes the same values a second time from the degrees
   alone. Nothing here is eyeballed.

   TWO RIDERS DO NOT DRAW A CIRCLE, on purpose. cq.q6 has to PROVE that
   four points are concyclic, so drawing the circle through them would
   hand the answer over; `noCircle: true` keeps the points exactly where
   the (undrawn) circle puts them, so the figure is still to scale and
   still cannot lie — it simply does not draw the one thing the question
   is about.

   Shared canvas: 360 × 222, centre (150 ; 120), R = 78 — the same width
   and the same circle as G1's riders, so the two tiles feel like one
   chapter; only the dead band under the figure is trimmed (the panel
   fits the svg by WIDTH, so a shorter canvas is less scrolling on a
   phone, not a smaller drawing). The longest key a rider ever grows to
   is seven lines, which reaches y = 136.

   REASONS ARE VERBATIM SAG SHORT FORMS (EUCLID-ACCEPTABLE-REASONS.md).
   TICK CONVENTION (G1's, and euclid-circle-theorems.js's before that):
     ✓s/f  the reason-bearing line that sets the work up
     ✓ca   a derived intermediate statement
     ✓a    the size itself
   IEB pays for the STATEMENT and the REASON separately.

   lostQuest: the documented euclid placeholder (no "I'm lost" button on
   this chapter — her ruling). See euclid-circle-theorems.js.
   ============================================================ */

const CH = "euclid";
const TOPIC = "cyclic-quads";
const PAPER = "siblings";
const LOST_PENDING = { chapter: "euclid", quest: "PENDING-euclid-is-exam-only-no-drill-round" };

/* the one canvas every rider is drawn on */
const CANVAS = { w: 360, h: 222, cx: 150, cy: 120, R: 78 };

/* A deep clone of `base` whose value key lists everything known so far:
   the base spec's OWN key lines first (a given that could not sit on a
   numbered wedge), then one line per value the earlier parts found.
   `found` is an ordered list of { n, v } — the angle's name as the
   prompts spell it, and its value as the memo gives it. `base` is never
   mutated, so one base spec serves every part of a rider.
   IDENTICAL to session G1's helper, deliberately — the two Euclidean
   tiles must behave the same way on screen. */
function specAfter(base, found) {
  const out = JSON.parse(JSON.stringify(base));
  const given = (base.key && base.key.lines) || [];
  const lines = [...given.map(l => ({ t: l.t })), ...(found || []).map(f => ({ t: `${f.n} = ${f.v}` }))];
  if (lines.length) out.key = { at: "tr", lines };
  else delete out.key;
  return out;
}

/* =====================================================================
   RIDER 1 — THE TWO PERPENDICULARS FROM THE CENTRE, AND THE CYCLIC
   QUADRILATERAL THEY MAKE
   ---------------------------------------------------------------------
   A 205°, B 95°, C 335°, so ∠AOB = 110° and ∠BOC = 120°.
   M is the midpoint of chord AB and N the midpoint of chord BC, so OM
   and ON are the perpendiculars from the centre to those chords —
   `mid` puts each one exactly at the foot.
     △OAB isosceles: base ∠ABO = (180 − 110)/2 = 35°   → B̂₁ (given)
     △OBC isosceles: base ∠OBC = (180 − 120)/2 = 30°   → B̂₂ (given)
     ∠MBN = ∠ABC = 35 + 30 = 65°
     ∠MON = 360 − 90 − 90 − 65 = 115°   (sum of ∠s in quad OMBN)
     and 115 + 65 = 180, which is why OMBN is cyclic.
     ∠OMN = ∠OBN = 30°  (∠s in the same seg of the NEW circle, chord ON)
   The two right angles are marked with the engine's right-angle SQUARE
   (never the chevron — a Grade 11 learner reads a chevron as "these two
   are equal"). B is the only vertex with two LABELLED wedges, so it is
   the only one numbered; M's two wedges are a square and a bare arc, so
   they are told apart by the letters rather than by numbers.
   ===================================================================== */
const CQ1_BASE = {
  ...CANVAS,
  O: true,
  pts: { A: 205, B: 95, C: 335 },
  mid: [{ name: "M", of: ["A", "B"] }, { name: "N", of: ["B", "C"] }],
  chords: [["A", "B"], ["B", "C"], ["O", "M"], ["O", "N"], ["O", "B"], ["M", "N"]],
  angles: [
    { at: "M", legs: ["O", "B"], t: "", o: { v: 90, mark: "square" } },
    { at: "N", legs: ["B", "O"], t: "", o: { v: 90, mark: "square" } },
    { at: "B", legs: ["A", "O"], t: "1", o: { v: 35, ar: 22 } },
    { at: "B", legs: ["O", "C"], t: "2", o: { v: 30, ar: 40 } },
    { at: "O", legs: ["M", "N"], t: "", o: { v: 115, ar: 15 } },
    { at: "M", legs: ["O", "N"], t: "", o: { v: 30, ar: 24 } },
  ],
};
const CQ1_OMB = { at: "M", legs: ["O", "B"], v: 90, o: { mark: "square" } };
const CQ1_ONB = { at: "N", legs: ["B", "O"], v: 90, o: { mark: "square" } };
const CQ1_B1 = { at: "B", legs: ["A", "O"], v: 35, o: { ar: 22, hlR: 22 } };
const CQ1_B2 = { at: "B", legs: ["O", "C"], v: 30, o: { ar: 40, hlR: 40 } };
const CQ1_MON = { at: "O", legs: ["M", "N"], v: 115, o: { ar: 15, hlR: 15 } };
const CQ1_OMN = { at: "M", legs: ["O", "N"], v: 30, o: { ar: 24, hlR: 24 } };
const CQ1_SIDES = [["O", "M"], ["M", "B"], ["B", "N"], ["N", "O"]];
const CQ1_CHAIN = [
  { n: "∠OMB", v: "90°" }, { n: "∠ONB", v: "90°" },
  { n: "∠MBN", v: "65°" }, { n: "∠MON", v: "115°" },
];

const cq1 = {
  id: "euclid.sib.cq.q1",
  chapter: CH,
  topic: TOPIC,
  archetype: "two-perpendiculars-from-the-centre-then-prove-the-quadrilateral-is-cyclic",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 10,
  intro: {
    en: "In the diagram, O is the centre of the circle and A, B and C are points on the circle. &nbsp;M is the midpoint of chord AB and N is the midpoint of chord BC. &nbsp;OM, ON, OB and MN are drawn. &nbsp;B̂₁ = 35° &nbsp;and&nbsp; B̂₂ = 30°.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(CQ1_BASE, []),
        question: { angles: [CQ1_OMB] },
        reveal: { angles: [CQ1_OMB], chords: [["A", "M", "t1"], ["M", "B", "t1"], ["O", "M"]] },
      },
      b: {
        spec: specAfter(CQ1_BASE, CQ1_CHAIN.slice(0, 1)),
        question: { angles: [CQ1_ONB] },
        reveal: { angles: [CQ1_ONB], chords: [["B", "N", "t1"], ["N", "C", "t1"], ["O", "N"]] },
      },
      c: {
        spec: specAfter(CQ1_BASE, CQ1_CHAIN.slice(0, 2)),
        question: { angles: [CQ1_B1, CQ1_B2] },
        reveal: { angles: [CQ1_B1, CQ1_B2] },
      },
      d: {
        spec: specAfter(CQ1_BASE, CQ1_CHAIN.slice(0, 3)),
        question: { angles: [CQ1_MON] },
        reveal: { angles: [CQ1_MON, CQ1_OMB, CQ1_ONB, CQ1_B1, CQ1_B2] },
      },
      e: {
        spec: specAfter(CQ1_BASE, CQ1_CHAIN.slice(0, 4)),
        question: { chords: CQ1_SIDES },
        reveal: { chords: CQ1_SIDES, angles: [CQ1_OMB, CQ1_ONB] },
      },
      f: {
        spec: specAfter(CQ1_BASE, CQ1_CHAIN.slice(0, 4)),
        question: { angles: [CQ1_OMN] },
        reveal: { angles: [CQ1_OMN, CQ1_B2], chords: [["O", "N"]] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: { en: "∠OMB = 90°. &nbsp;Give a reason for this." },
      hint: { en: "Look at what M is, not just where it is. There is one theorem about the line joining the centre of a circle to the middle of a chord." },
      memo: [
        { type: "answer", text: { en: "M is the midpoint of chord AB, and OM joins it to the centre &nbsp;&nbsp;<i>(line from centre to midpt of chord)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER — the rule for the whole chapter: <b>the statement earns a mark and the reason earns its own mark</b>. A size written on a bare line is half an answer. When a part asks only for the reason, the reason IS the mark, so write the short form the marker has on the memo rather than a sentence of your own.",
        } },
      ],
      esplain: {
        en: "There are three facts tangled together here, and they are really one fact wearing three hats: the line from the centre to the middle of a chord is perpendicular to it, a line from the centre perpendicular to a chord cuts it in half, and the perpendicular bisector of a chord passes through the centre. Which one you name depends on what you were given. Here you are given a midpoint and told the line comes from the centre, so the one you want is “line from centre to midpt of chord”, and what it hands you is the right angle. Mark that right angle onto your own copy of the sketch straight away — every remaining part of this question is built on the two right angles at M and at N.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: { en: "Write down the size of &nbsp;∠ONB." },
      hint: { en: "N plays exactly the same part on chord BC that M plays on chord AB." },
      memo: [
        { type: "answer", text: { en: "∠ONB = 90° &nbsp;&nbsp;<i>(line from centre to midpt of chord)</i>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The same theorem, used a second time on the other chord. Grade 11 geometry does this constantly: one idea run twice on two different corners of the same picture. When a question says “write down”, it is telling you no working is expected — one line, the size, and the short reason in brackets, then move on. It is also quietly telling you something bigger: the picture now has two right angles in it, and two right angles inside one quadrilateral is a very loud hint about what the last parts are going to ask for.",
      },
    },
    {
      id: "c",
      marks: 1,
      level: 1,
      prompt: { en: "Write down the size of &nbsp;∠MBN." },
      hint: { en: "M lies on BA and N lies on BC, so ∠MBN is nothing more than the whole angle at B — and the whole angle at B is the two pieces you were given." },
      memo: [
        { type: "answer", text: { en: "∠MBN = B̂₁ + B̂₂ = 35° + 30° = 65°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "This one is free, and it is free on purpose: it checks that you can read the picture rather than that you know a theorem. M sits on the line BA and N sits on the line BC, so from B the ray BM points exactly where BA points and BN points exactly where BC points. That makes ∠MBN the same angle as ∠ABC, and ∠ABC is the two given pieces added together. Learners lose this mark by hunting for a theorem that is not there. If a part is worth one mark and the picture already answers it, trust the picture and take the mark.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠MON." },
      hint: { en: "Forget the circle for a moment and look only at the four-sided shape OMBN. You already know three of its four angles." },
      memo: [
        { type: "step", text: { en: "In quadrilateral OMBN: &nbsp;∠MON + ∠OMB + ∠MBN + ∠ONB = 360° &nbsp;&nbsp;<i>(sum of ∠s in quad)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠MON = 360° − 90° − 65° − 90° = 115°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: read the name <b>OMBN</b> in order — O, then M, then B, then N. That is the way the four sides run, and it is what makes ∠MON the quadrilateral's angle at O rather than one of the other angles at that busy point.",
        } },
      ],
      esplain: {
        en: "The four angles of any quadrilateral add to 360°, which is a Grade 8 fact doing the heavy lifting in a Grade 11 question — that happens far more often than learners expect. The only real skill here is spotting that O, M, B and N do make a four-sided shape: OM is a side, then M along to B, then B along to N, then N back to O. Once you see the shape, three of its angles are already on your page and the fourth is subtraction. Notice the answer, 115°, is obtuse, and the wedge at O in the drawing does look wide — the picture and the number agreeing is a free check the examiner has handed you.",
      },
    },
    {
      id: "e",
      marks: 3,
      level: 3,
      prompt: { en: "Prove that &nbsp;OMBN&nbsp; is a cyclic quadrilateral." },
      hint: { en: "A quadrilateral is cyclic when one pair of OPPOSITE angles adds to 180°. Read OMBN in order and work out which of its angles face each other." },
      memo: [
        { type: "step", text: { en: "∠OMB = 90° &nbsp;and&nbsp; ∠ONB = 90° &nbsp;&nbsp;<i>(line from centre to midpt of chord)</i>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∠OMB and ∠ONB are OPPOSITE angles of quadrilateral OMBN, and &nbsp;90° + 90° = 180°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ OMBN is a cyclic quadrilateral &nbsp;&nbsp;<i>(opp ∠s quad supp)</i>" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — the other pair does the same job: &nbsp;∠MON + ∠MBN = 115° + 65° = 180°, and those two face each other as well, so <i>opp ∠s quad supp</i> again. &nbsp;Same marks." } },
        { type: "trap", text: {
          en: "WATCH OUT: say the word <b>opposite</b> out loud in your reason. Two angles that happen to add to 180° but sit next to each other prove nothing at all. In OMBN the vertices run O → M → B → N, so M and N face each other and O and B face each other.",
        } },
      ],
      esplain: {
        en: "This is the converse of a theorem you already know. The theorem says: if four points lie on one circle, the opposite angles of the quadrilateral they make add to 180°. The converse runs the other way: if opposite angles of a quadrilateral add to 180°, then a circle can be drawn through all four corners. That second circle is nowhere in the picture, and it does not need to be — the proof is what puts it there. What makes this figure lovely is that the two right angles were handed to you by a completely different theorem, one about chords and their midpoints, and they happen to be the pair facing each other. Two right angles inside one quadrilateral is always worth a second look for exactly this reason.",
      },
    },
    {
      id: "f",
      marks: 2,
      level: 3,
      prompt: { en: "Hence determine, with a reason, the size of &nbsp;∠OMN." },
      hint: { en: "You have just proved that O, M, B and N lie on one circle. On that circle, which chord do ∠OMN and ∠OBN both stand on — and are M and B on the same side of it?" },
      memo: [
        { type: "step", text: { en: "In the circle through O, M, B and N: &nbsp;∠OMN and ∠OBN both stand on chord ON, with M and B on the same side of it &nbsp;&nbsp;<i>(∠s in the same seg)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠OMN = ∠OBN = B̂₂ = 30°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The word “hence” is doing real work here: this part is only answerable because the previous one proved the four points are concyclic. Once you know that, every circle theorem you own becomes available on that new circle, even though it is never drawn. The chord ON splits it into two segments, M and B are both sitting in the same one, so they see ON at the same angle. And ∠OBN is not a new angle at all — N lies on BC, so ∠OBN is the given B̂₂. Getting comfortable with a circle you cannot see is one of the biggest steps up in Grade 11 geometry, and it always starts with a proof like part (e).",
      },
    },
  ],
};

/* =====================================================================
   RIDER 2 — THE EXTERIOR ANGLE OF A CYCLIC QUADRILATERAL, THEN AN
   ISOSCELES TRIANGLE FALLS OUT
   ---------------------------------------------------------------------
   A 150°, B 70°, C 320°, D 230° — clockwise A → B → C → D, so ABCD is a
   proper (uncrossed) cyclic quadrilateral. Clockwise arcs:
     AB 80°   BC 110°   CD 90°   DA 80°   (total 360)
   Every angle is half the arc on the far side of its arms:
     Â = ∠BAD = ½(110 + 90) = 100°      Ĉ₁ = ∠BCD = ½(80 + 80)  = 80°
     B̂ = ½(90 + 80)  = 85°              D̂ = ½(80 + 110) = 95°
     B̂₁ = ∠ABD = ½·80 = 40°             B̂₂ = ∠DBC = ½·90 = 45°
     D̂₁ = ∠ADB = ½·80 = 40°             D̂₂ = ∠BDC = ½·110 = 55°
   DC is produced to E (`out`), so Ĉ₂ = ∠BCE = 180 − 80 = 100° = Â —
   the exterior angle of the cyclic quad equal to the interior opposite
   angle, which is what part (b) is for.
   Arcs AB and DA are BOTH 80°, so chords AB and AD are equal — and the
   two 40° angles the chase produces at B and at D are exactly what
   part (e) uses to prove it without ever measuring anything.
   B and C and D each carry two wedges, so all three are numbered; A
   carries one, so it is named in full in the prompts.
   ===================================================================== */
const CQ2_BASE = {
  ...CANVAS,
  pts: { A: 150, B: 70, C: 320, D: 230 },
  out: [{ name: "E", along: ["D", "C"], len: 34 }],
  key: { at: "tr", lines: [{ t: "B̂₁ = 40°" }, { t: "B̂₂ = 45°" }, { t: "Ĉ₂ = 100°" }] },
  chords: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["B", "D"], ["C", "E"]],
  angles: [
    { at: "A", legs: ["B", "D"], t: "", o: { v: 100, ar: 24 } },
    { at: "B", legs: ["A", "D"], t: "1", o: { v: 40, ar: 40 } },
    { at: "B", legs: ["D", "C"], t: "2", o: { v: 45, ar: 22 } },
    { at: "C", legs: ["B", "D"], t: "1", o: { v: 80, ar: 38 } },
    { at: "C", legs: ["B", "E"], t: "2", o: { v: 100, ar: 21 } },
    { at: "D", legs: ["A", "B"], t: "1", o: { v: 40, ar: 40 } },
    { at: "D", legs: ["B", "C"], t: "2", o: { v: 55, ar: 22 } },
  ],
};
const CQ2_A = { at: "A", legs: ["B", "D"], v: 100, o: { ar: 24, hlR: 24 } };
const CQ2_B1 = { at: "B", legs: ["A", "D"], v: 40, o: { ar: 40, hlR: 40 } };
const CQ2_B2 = { at: "B", legs: ["D", "C"], v: 45, o: { ar: 22, hlR: 22 } };
const CQ2_C1 = { at: "C", legs: ["B", "D"], v: 80, o: { ar: 38, hlR: 38 } };
const CQ2_C2 = { at: "C", legs: ["B", "E"], v: 100, o: { ar: 21, hlR: 21 } };
const CQ2_D1 = { at: "D", legs: ["A", "B"], v: 40, o: { ar: 40, hlR: 40 } };
const CQ2_D2 = { at: "D", legs: ["B", "C"], v: 55, o: { ar: 22, hlR: 22 } };
const CQ2_CHAIN = [
  { n: "Ĉ₁", v: "80°" }, { n: "∠BAD", v: "100°" }, { n: "D̂₂", v: "55°" }, { n: "D̂₁", v: "40°" },
];

const cq2 = {
  id: "euclid.sib.cq.q2",
  chapter: CH,
  topic: TOPIC,
  archetype: "exterior-angle-of-a-cyclic-quad-then-angle-sums-then-sides-opp-equal-angles",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 10,
  intro: {
    en: "In the diagram, ABCD is a cyclic quadrilateral and the diagonal BD is drawn. &nbsp;DC is produced to E. &nbsp;B̂₁ = 40°, &nbsp;B̂₂ = 45° &nbsp;and&nbsp; Ĉ₂ = 100°.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(CQ2_BASE, []),
        question: { angles: [CQ2_C1] },
        reveal: { angles: [CQ2_C1, CQ2_C2], chords: [["C", "D"], ["C", "E"]] },
      },
      b: {
        spec: specAfter(CQ2_BASE, CQ2_CHAIN.slice(0, 1)),
        question: { angles: [CQ2_A] },
        reveal: { angles: [CQ2_A, CQ2_C2] },
      },
      c: {
        spec: specAfter(CQ2_BASE, CQ2_CHAIN.slice(0, 2)),
        question: { angles: [CQ2_D2] },
        reveal: { angles: [CQ2_D2, CQ2_C1, CQ2_B2] },
      },
      d: {
        spec: specAfter(CQ2_BASE, CQ2_CHAIN.slice(0, 3)),
        question: { angles: [CQ2_D1] },
        reveal: { angles: [CQ2_D1, CQ2_A, CQ2_B1] },
      },
      e: {
        spec: specAfter(CQ2_BASE, CQ2_CHAIN.slice(0, 4)),
        question: { chords: [["A", "B"], ["A", "D"]] },
        reveal: { chords: [["A", "B", "t1"], ["A", "D", "t1"]], angles: [CQ2_B1, CQ2_D1] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ĉ₁." },
      hint: { en: "Ĉ₁ and Ĉ₂ sit side by side along one straight line — the line DCE. What must a pair like that add up to?" },
      memo: [
        { type: "step", text: { en: "DCE is a straight line, so &nbsp;Ĉ₁ + Ĉ₂ = 180° &nbsp;&nbsp;<i>(∠s on a str line)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ĉ₁ = 180° − 100° = 80°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Before any circle theorem gets a look-in, notice that the word “produced” in the given information is doing something for you: it says D, C and E are in one straight line, so the two angles resting on that line at C must add to 180°. That is Grade 8 work, and it is deliberately the first mark of the question — a way in for everybody. Write the two angles at C onto your own sketch as soon as you have them, because the next three parts all lean on one or other of them.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠BAD." },
      hint: { en: "Ĉ₂ is the exterior angle of the cyclic quadrilateral at C. There is a theorem that says exactly which interior angle it matches — and it is not the one next to it." },
      memo: [
        { type: "step", text: { en: "Ĉ₂ is the exterior ∠ of cyclic quad ABCD at C, and ∠BAD is the interior opposite angle. &nbsp;&nbsp;<i>(ext ∠ of cyclic quad)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠BAD = Ĉ₂ = 100°" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — through the pair of opposite angles instead: &nbsp;∠BAD + Ĉ₁ = 180° &nbsp;<i>(opp ∠s of cyclic quad)</i>, so ∠BAD = 180° − 80° = 100°. &nbsp;Same marks." } },
        { type: "trap", text: {
          en: "WATCH OUT: the exterior angle matches the interior <b>opposite</b> angle — the one at the far corner, A — not the interior angle beside it at C. Getting that wrong turns 100° into 80° and takes the rest of the question with it.",
        } },
      ],
      esplain: {
        en: "The exterior-angle rule for a cyclic quadrilateral is really the opposite-angles rule wearing a disguise, which is why both routes above earn full marks. Opposite angles add to 180°, and the exterior angle at a corner is 180° minus the interior angle at that same corner — so the exterior angle and the far interior angle end up equal. Knowing that they are the same theorem means you can never be stuck: if you cannot remember which way the exterior version points, go the long way round through the supplementary pair and you will land in the same place.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;D̂₂." },
      hint: { en: "D̂₂ is one angle of triangle BCD, and you now know the other two." },
      memo: [
        { type: "step", text: { en: "In △BCD: &nbsp;D̂₂ + B̂₂ + Ĉ₁ = 180° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ D̂₂ = 180° − 45° − 80° = 55°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The diagonal BD is not decoration — it cuts the quadrilateral into two triangles, and a triangle is the friendliest shape in geometry because its three angles always come to 180°. Once Ĉ₁ was found, triangle BCD had two known angles in it and the third had nowhere to hide. The habit worth building is to look for the triangles the moment a diagonal appears: a four-sided problem you cannot see your way through is often two three-sided problems you can.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;D̂₁." },
      hint: { en: "The other triangle the diagonal made. Which of its angles do you already own?" },
      memo: [
        { type: "step", text: { en: "In △ABD: &nbsp;D̂₁ + B̂₁ + ∠BAD = 180° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ D̂₁ = 180° − 40° − 100° = 40°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Same move as the last part, on the second triangle. Notice what has quietly happened: D̂₁ has come out at 40°, which is exactly what B̂₁ was given as. That is not a coincidence and it is not something you were told — it fell out of the arithmetic, and the very next part is going to make it earn its keep. When two angles in a chase turn out equal, stop for a second and ask what that equality is telling you about the sides, because that is nearly always why the examiner arranged it.",
      },
    },
    {
      id: "e",
      marks: 2,
      level: 3,
      prompt: { en: "Prove that &nbsp;AB = AD." },
      hint: { en: "Look at triangle ABD on its own. Two of its angles are the same size — and there is a theorem about what that forces the sides to do." },
      memo: [
        { type: "step", text: { en: "In △ABD: &nbsp;B̂₁ = D̂₁ = 40°" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ AD = AB &nbsp;&nbsp;<i>(sides opp equal ∠s)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the two sides you name must be the ones <b>opposite</b> the two equal angles. B̂₁ is at B, and the side facing it across the triangle is AD; D̂₁ is at D, and the side facing it is AB. Naming the wrong pair scores nothing, even though the triangle really is isosceles.",
        } },
      ],
      esplain: {
        en: "This is the isosceles theorem run backwards. Going forwards it says equal sides give equal angles; going backwards it says equal angles give equal sides, and the SAG has a separate short form for each direction — “∠s opp equal sides” one way and “sides opp equal ∠s” the other. Use the one that matches what you are given, or a marker will read your proof as circular. The other thing to notice is how little work this part actually is: every bit of the effort happened in parts (a) to (d), and the last part just points at two numbers that came out the same. Long geometry questions are built exactly like that, which is why banking the early marks matters so much.",
      },
    },
  ],
};

/* =====================================================================
   RIDER 3 — THE WHOLE THING IN TERMS OF x, THROUGH THE CENTRE
   ---------------------------------------------------------------------
   A 160°, B 60°, C 350°, D 290° — clockwise A → B → C → D, arcs
     AB 100°   BC 70°   CD 60°   DA 130°
   The figure is DRAWN with x = 65°, but no part ever substitutes a
   number: x stays a letter from the first prompt to the last, exactly
   like euclid.sib.ca.q5 and euclid.tan.t2q5 do with their own x.
     Â = ∠BAD = ½(70 + 60) = 65° = x
     Ô₁ = ∠BOD standing on arc BCD = 70 + 60 = 130° = 2x
     Ô₂ = the reflex angle at O   = 360 − 130 = 230° = 360° − 2x
     Ĉ = ∠BCD = ½(130 + 100) = 115° = 180° − x
     △OBD is isosceles (radii), so ∠OBD = (180 − 130)/2 = 25° = 90° − x
   arc AC = 190° ≠ 180°, deliberately — a diameter falling out by
   accident would invite an "∠s in semi-circle" answer to a question
   that is not about that at all.
   The two wedges at O share their arms, so they are numbered rather
   than named: Ô₁ is the ordinary sweep and Ô₂ is the reflex one
   (`o.reflex`, which verifyDiagram then checks against 230, not 130).
   ===================================================================== */
const CQ3_BASE = {
  ...CANVAS,
  O: true,
  pts: { A: 160, B: 60, C: 350, D: 290 },
  chords: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["O", "B"], ["O", "D"], ["B", "D"]],
  angles: [
    { at: "A", legs: ["B", "D"], t: "x", o: { v: 65, r: 40, ar: 24 } },
    { at: "O", legs: ["B", "D"], t: "1", o: { v: 130, ar: 20 } },
    { at: "O", legs: ["B", "D"], t: "2", o: { v: 230, reflex: 1, ar: 44, rot: -70 } },
    { at: "C", legs: ["B", "D"], t: "", o: { v: 115, ar: 26 } },
    { at: "B", legs: ["O", "D"], t: "", o: { v: 25, ar: 15 } },
  ],
};
const CQ3_X = { at: "A", legs: ["B", "D"], v: 65, o: { ar: 24, hlR: 24 } };
const CQ3_O1 = { at: "O", legs: ["B", "D"], v: 130, o: { ar: 20, hlR: 20 } };
const CQ3_O2 = { at: "O", legs: ["B", "D"], v: 230, o: { ar: 44, hlR: 40, reflex: 1, rot: -70 } };
const CQ3_C = { at: "C", legs: ["B", "D"], v: 115, o: { ar: 26, hlR: 26 } };
const CQ3_OBD = { at: "B", legs: ["O", "D"], v: 25, o: { ar: 15, hlR: 34 } };
const CQ3_CHAIN = [
  { n: "Ô₁", v: "2x" }, { n: "Ô₂", v: "360° − 2x" },
  { n: "Ĉ", v: "180° − x" }, { n: "∠OBD", v: "90° − x" },
];

const cq3 = {
  id: "euclid.sib.cq.q3",
  chapter: CH,
  topic: TOPIC,
  archetype: "cyclic-quad-entirely-in-terms-of-x-through-the-angle-at-the-centre",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 10,
  intro: {
    en: "In the diagram, O is the centre of the circle and ABCD is a cyclic quadrilateral. &nbsp;OB, OD and the chord BD are drawn. &nbsp;∠BAD = x.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(CQ3_BASE, []),
        question: { chords: [["O", "B"], ["O", "D"]] },
        reveal: { chords: [["O", "B", "t1"], ["O", "D", "t1"]] },
      },
      b: {
        spec: specAfter(CQ3_BASE, []),
        question: { angles: [CQ3_O1] },
        reveal: { angles: [CQ3_O1, CQ3_X] },
      },
      c: {
        spec: specAfter(CQ3_BASE, CQ3_CHAIN.slice(0, 1)),
        question: { angles: [CQ3_O2] },
        reveal: { angles: [CQ3_O2, CQ3_O1] },
      },
      d: {
        spec: specAfter(CQ3_BASE, CQ3_CHAIN.slice(0, 2)),
        question: { angles: [CQ3_C] },
        reveal: { angles: [CQ3_C, CQ3_O2] },
      },
      e: {
        spec: specAfter(CQ3_BASE, CQ3_CHAIN.slice(0, 3)),
        question: { angles: [CQ3_OBD] },
        reveal: { angles: [CQ3_OBD, CQ3_O1], chords: [["O", "B", "t1"], ["O", "D", "t1"]] },
      },
      f: {
        spec: specAfter(CQ3_BASE, CQ3_CHAIN.slice(0, 4)),
        question: { angles: [CQ3_X, CQ3_C] },
        reveal: { angles: [CQ3_X, CQ3_C] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: { en: "Give a reason why &nbsp;OB = OD." },
      hint: { en: "Where do both of those two lines start, and where do they end?" },
      memo: [
        { type: "answer", text: { en: "OB and OD both run from the centre to a point on the circle &nbsp;&nbsp;<i>(radii)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: mark <b>every</b> radius in a circle diagram the moment you see one. Half the angle chases in Grade 11 run entirely on isosceles triangles that are hiding in plain sight, and the person who spots them first finishes the question in half the time.",
        } },
      ],
      esplain: {
        en: "It looks like a give-away mark, and it is one — but it is also the hinge of part (e). Every radius of a circle is the same length, so the instant a triangle has two radii for its sides you know it is isosceles without measuring anything. Here OB and OD are both radii, which makes triangle OBD isosceles, which is what turns the angle at the centre into the two base angles later on. Examiners put a mark like this at the start on purpose: it gets a nervous learner writing, and it plants the fact the hard part is going to need.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ô₁&nbsp; in terms of x." },
      hint: { en: "Ô₁ and ∠BAD both stand on the same chord, BD — one from the centre, one from the circle. There is exactly one theorem about that pair." },
      memo: [
        { type: "step", text: { en: "Ô₁ and ∠BAD both stand on chord BD, with A on the far arc. &nbsp;&nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ô₁ = 2 · ∠BAD = 2x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: an answer in terms of x is a complete answer. There is no number coming and no mark for waiting for one — write 2x and move on.",
        } },
      ],
      esplain: {
        en: "Working with a letter instead of a number changes nothing at all about the reasoning; it only means the answers come out as expressions. The angle at the centre is double the angle at the circumference standing on the same chord, so an x at A becomes a 2x at O in one line. What makes an “in terms of x” question feel harder is that you cannot sanity-check the answer against the picture the way you can with numbers, so the reason has to carry more of your confidence — write the reason first if that helps, then the expression. And notice the result is stronger than a number would have been: 2x is true whatever x turns out to be.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ô₂&nbsp; in terms of x." },
      hint: { en: "Ô₁ and Ô₂ are the only two angles at O, and between them they fill everything there is around that point." },
      memo: [
        { type: "step", text: { en: "Ô₁ + Ô₂ = 360° &nbsp;&nbsp;<i>(∠s round a pt)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ô₂ = 360° − 2x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: it is <b>360°</b> round a point, not 180°. The 180° rule is for two angles resting on a straight line; two angles filling the whole space around O are a full revolution.",
        } },
      ],
      esplain: {
        en: "Two rays out of one point always cut the space around that point into two angles — a smaller one and a bigger one — and together they make a full turn of 360°. The bigger one is called the reflex angle, and it is nothing more mysterious than “the other way round”. It matters here because the next part needs the angle at the centre that stands on the arc containing A, and that is the reflex one. Writing both angles at O onto your sketch, one inside the triangle and one going the long way round, is what stops you halving the wrong one in a minute's time.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ĉ&nbsp; in terms of x." },
      hint: { en: "Ĉ is at the circumference, standing on chord BD. Careful — which of the two angles at O is on the same arc as C is? Look at which side of BD the point C is sitting on." },
      memo: [
        { type: "step", text: { en: "C is on the far side of BD from A, so Ĉ pairs with the reflex angle at the centre: &nbsp;Ô₂ = 2 · Ĉ &nbsp;&nbsp;<i>(∠ at centre = 2 × ∠ at circumference)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ĉ = ½(360° − 2x) = 180° − x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: halving Ô₁ instead gives x, and that is the answer this part is fishing for. The theorem pairs an angle at the circumference with the angle at the centre standing on <b>the arc on the other side</b> — C is looking across at the arc that contains A, so its partner is the big reflex angle.",
        } },
      ],
      esplain: {
        en: "You have just proved the opposite-angles theorem for this quadrilateral without quoting it: Â is x, Ĉ is 180° − x, and those two add to 180°. That is worth sitting with for a second, because it is exactly the bookwork proof for “opposite angles of a cyclic quadrilateral are supplementary”, run on a picture instead of in the abstract. The safe way to decide which central angle to halve, every single time, is to ask which arc the angle at the circumference is looking at: C sees the arc BAD, and the angle at the centre sitting on that same arc is the reflex one.",
      },
    },
    {
      id: "e",
      marks: 2,
      level: 3,
      prompt: { en: "Prove that &nbsp;∠OBD = 90° − x." },
      hint: { en: "Triangle OBD has two radii for sides, and you found the angle between them in part (b)." },
      memo: [
        { type: "step", text: { en: "OB = OD &nbsp;<i>(radii)</i>, so ∠OBD = ∠ODB &nbsp;&nbsp;<i>(∠s opp equal sides)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "In △OBD: &nbsp;2 · ∠OBD + 2x = 180° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i><br>∴ ∠OBD = 90° − x" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The same isosceles-radii move as always, but with algebra doing the sharing out. Both base angles are equal, so call each of them the same thing; the three angles of the triangle are then that thing twice, plus the 2x at the top, and the lot must come to 180°. Solving is ordinary Grade 9 algebra: twice the base angle is 180 − 2x, so the base angle is 90 − x. The step learners skip is the word “twice” — they write one base angle plus 2x equals 180 by accident and lose the whole thing. Say it out loud as you write: “both base angles, plus the top one, is 180”. And check the shape of the answer: 90 − x shrinks as x grows, which is exactly right, because a bigger angle at the centre squashes the base angles down.",
      },
    },
    {
      id: "f",
      marks: 1,
      level: 2,
      prompt: { en: "Write down the value of &nbsp;∠BAD + Ĉ." },
      hint: { en: "You have both of them in terms of x. Add them and watch what happens to the x." },
      memo: [
        { type: "answer", text: { en: "∠BAD + Ĉ = x + (180° − x) = 180°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: this is the theorem <i>opp ∠s of cyclic quad</i>, and you have just built it from scratch. In an exam you may quote it in one line — you only prove it like this when the question says “prove the theorem”.",
        } },
      ],
      esplain: {
        en: "The x cancels, and that is the whole point of the question. Whatever angle you start with at A, the angle facing it across the cyclic quadrilateral is whatever is left of 180° — which is exactly what “opposite angles of a cyclic quadrilateral are supplementary” means. A result that holds for every value of x is far stronger than one number would have been, and this is a good moment to notice that an algebraic answer is not a second-best answer. In the exam you are allowed to quote this theorem straight away and save yourself four parts of work; this question made you walk through it so you can see where it comes from.",
      },
    },
  ],
};

/* =====================================================================
   RIDER 4 — THE EXTERIOR ANGLE, THEN A PAIR OF ALTERNATE ANGLES, THEN
   TWO CHORDS PROVED PARALLEL
   ---------------------------------------------------------------------
   A 155°, B 55°, C 345°, D 225° — clockwise, arcs
     AB 100°   BC 70°   CD 120°   DA 70°
   Arc BC = arc DA, which is exactly what makes AB ∥ DC — and it is
   what part (f) proves from the angles alone, without ever mentioning
   an arc.
     Â = ½(70 + 120) = 95°     Ĉ = ∠BCD = ½(70 + 100) = 85°
     B̂ = ½(120 + 70) = 95°     D̂ = ∠ADC = ½(100 + 70) = 85°
     Â₁ = ∠BAC = ½·70  = 35°   Â₂ = ∠CAD = ½·120 = 60°
     Ĉ₁ = ∠ACD = ½·70  = 35°   (∠ACB = ½·100 = 50°, drawn but not asked)
   DC is produced to F, so Ĉ₂ = ∠BCF = 180 − 85 = 95° = Â.
   Â₁ = Ĉ₁ = 35° is the whole proof: they are alternate angles on the
   transversal AC, so the two chords cannot be doing anything except
   running parallel.
   A and C each carry two MARKED wedges and are numbered; the wedge
   ∠ACB sits between C's two and is deliberately left unmarked, so the
   two numbered arcs at C never touch.
   ===================================================================== */
const CQ4_BASE = {
  /* 30 px wider than the shared CANVAS. This rider grows a seven-line key,
     and its last line lands at y = 136 — level with F, the point on DC
     produced, whose label sits at x ~ 272 against a key edge of 284. Read
     off the crop: the two ran together on one line. The circle is
     unchanged; only the margin the key needs grew. */
  ...CANVAS, w: 390,
  pts: { A: 155, B: 55, C: 345, D: 225 },
  out: [{ name: "F", along: ["D", "C"], len: 34 }],
  key: { at: "tr", lines: [{ t: "Â₂ = 60°" }, { t: "Ĉ₂ = 95°" }] },
  chords: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "C"], ["C", "F"]],
  angles: [
    { at: "A", legs: ["B", "C"], t: "1", o: { v: 35, ar: 42 } },
    { at: "A", legs: ["C", "D"], t: "2", o: { v: 60, ar: 23 } },
    { at: "B", legs: ["A", "C"], t: "95°", o: { v: 95, r: 40, ar: 22 } },
    { at: "C", legs: ["A", "D"], t: "1", o: { v: 35, ar: 42 } },
    { at: "C", legs: ["B", "F"], t: "2", o: { v: 95, ar: 23 } },
    { at: "D", legs: ["A", "C"], t: "", o: { v: 85, ar: 24 } },
  ],
};
const CQ4_A1 = { at: "A", legs: ["B", "C"], v: 35, o: { ar: 42, hlR: 42 } };
const CQ4_A2 = { at: "A", legs: ["C", "D"], v: 60, o: { ar: 23, hlR: 23 } };
const CQ4_BAD = { at: "A", legs: ["B", "D"], v: 95 };
const CQ4_B = { at: "B", legs: ["A", "C"], v: 95, o: { ar: 22, hlR: 22 } };
const CQ4_C1 = { at: "C", legs: ["A", "D"], v: 35, o: { ar: 42, hlR: 42 } };
const CQ4_C2 = { at: "C", legs: ["B", "F"], v: 95, o: { ar: 23, hlR: 23 } };
const CQ4_BCD = { at: "C", legs: ["B", "D"], v: 85 };
const CQ4_D = { at: "D", legs: ["A", "C"], v: 85, o: { ar: 24, hlR: 24 } };
const CQ4_CHAIN = [
  { n: "∠BAD", v: "95°" }, { n: "Â₁", v: "35°" },
  { n: "∠BCD", v: "85°" }, { n: "∠ADC", v: "85°" }, { n: "Ĉ₁", v: "35°" },
];

const cq4 = {
  id: "euclid.sib.cq.q4",
  chapter: CH,
  topic: TOPIC,
  archetype: "exterior-angle-of-a-cyclic-quad-then-alternate-angles-prove-two-chords-parallel",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 12,
  intro: {
    en: "In the diagram, ABCD is a cyclic quadrilateral and the diagonal AC is drawn. &nbsp;DC is produced to F. &nbsp;Â₂ = 60°, &nbsp;∠ABC = 95° &nbsp;and&nbsp; Ĉ₂ = 95°.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(CQ4_BASE, []),
        question: { angles: [CQ4_BAD] },
        reveal: { angles: [CQ4_BAD, CQ4_C2] },
      },
      b: {
        spec: specAfter(CQ4_BASE, CQ4_CHAIN.slice(0, 1)),
        question: { angles: [CQ4_A1] },
        reveal: { angles: [CQ4_A1, CQ4_A2] },
      },
      c: {
        spec: specAfter(CQ4_BASE, CQ4_CHAIN.slice(0, 2)),
        question: { angles: [CQ4_BCD] },
        reveal: { angles: [CQ4_BCD, CQ4_C2], chords: [["C", "D"], ["C", "F"]] },
      },
      d: {
        spec: specAfter(CQ4_BASE, CQ4_CHAIN.slice(0, 3)),
        question: { angles: [CQ4_D] },
        reveal: { angles: [CQ4_D, CQ4_B] },
      },
      e: {
        spec: specAfter(CQ4_BASE, CQ4_CHAIN.slice(0, 4)),
        question: { angles: [CQ4_C1] },
        reveal: { angles: [CQ4_C1, CQ4_A2, CQ4_D] },
      },
      f: {
        spec: specAfter(CQ4_BASE, CQ4_CHAIN.slice(0, 5)),
        question: { chords: [["A", "B"], ["C", "D"]] },
        reveal: { chords: [["A", "B", "p1"], ["D", "C", "p1"], ["A", "C"]], angles: [CQ4_A1, CQ4_C1] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠BAD." },
      hint: { en: "Ĉ₂ is the exterior angle of the cyclic quadrilateral at C. Which interior angle does a theorem say it matches?" },
      memo: [
        { type: "step", text: { en: "Ĉ₂ is the exterior ∠ of cyclic quad ABCD at C, and ∠BAD is the interior opposite angle. &nbsp;&nbsp;<i>(ext ∠ of cyclic quad)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠BAD = Ĉ₂ = 95°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A side of the quadrilateral has been produced past a corner, and that is always a signal to reach for the exterior-angle rule. It says the angle sticking out at one corner equals the interior angle at the corner diagonally across from it — here the one at C on the far side of the line matches the one at A. Read the letters carefully before you use it: C is the second corner from A going one way and the second going the other, which is what “opposite” means in a four-sided shape. Once ∠BAD is on your sketch, the rest of this question is a chain of one-line steps.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: { en: "Write down the size of &nbsp;Â₁." },
      hint: { en: "The diagonal AC cuts the angle at A into two pieces, and you know the whole angle and one of the pieces." },
      memo: [
        { type: "answer", text: { en: "Â₁ = ∠BAD − Â₂ = 95° − 60° = 35°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "No theorem here, just reading the picture: the diagonal AC splits the corner at A into Â₁ and Â₂, so the two pieces must add up to the whole. Write the split out loud as a sentence before you do the arithmetic — “the whole angle at A is Â₁ plus Â₂” — because learners who skip that sentence often subtract the wrong way round. And notice how quickly a one-mark part like this pays for itself: Â₁ is one half of the pair that proves the parallel lines at the end.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠BCD." },
      hint: { en: "∠BCD and Ĉ₂ sit side by side along the straight line DCF." },
      memo: [
        { type: "step", text: { en: "DCF is a straight line, so &nbsp;∠BCD + Ĉ₂ = 180° &nbsp;&nbsp;<i>(∠s on a str line)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠BCD = 180° − 95° = 85°" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — straight off the pair of opposite angles: &nbsp;∠BCD = 180° − ∠BAD = 180° − 95° = 85° &nbsp;<i>(opp ∠s of cyclic quad)</i>. &nbsp;Same marks." } },
      ],
      esplain: {
        en: "Two honest roads, and both are worth full marks. The straight-line road uses nothing but the fact that D, C and F are collinear. The cyclic road uses the opposite-angles theorem on the pair A and C. They agree because the exterior-angle rule and the opposite-angles rule are the same theorem seen from two sides — which is exactly why part (a) worked. When a chase gives you the same size two different ways, treat it as a free check that everything behind you is right.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠ADC." },
      hint: { en: "You have used the A-and-C pair of opposite angles. There is a second pair in every cyclic quadrilateral." },
      memo: [
        { type: "step", text: { en: "∠ADC + ∠ABC = 180° &nbsp;&nbsp;<i>(opp ∠s of cyclic quad)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠ADC = 180° − 95° = 85°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: pair D with <b>B</b>, not with C. In ABCD the two pairs that face each other are A-with-C and B-with-D. Pairing D with the angle beside it proves nothing.",
        } },
      ],
      esplain: {
        en: "Once a quadrilateral is cyclic, BOTH pairs of opposite angles are supplementary, not just the pair you happened to use first. You spent the A-and-C pair on part (a); the leftovers are B and D, and they must total 180° as well. It is worth pausing to name the pairs out loud when you meet a new cyclic quadrilateral: “A with C, B with D”. Thirty seconds of that at the start saves the commonest mistake in the whole topic, which is pairing a corner with the one next to it.",
      },
    },
    {
      id: "e",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ĉ₁." },
      hint: { en: "Ĉ₁ is one angle of triangle ACD, and you now know that triangle's other two angles." },
      memo: [
        { type: "step", text: { en: "In △ACD: &nbsp;Ĉ₁ + Â₂ + ∠ADC = 180° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ĉ₁ = 180° − 60° − 85° = 35°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The diagonal AC cut the quadrilateral into two triangles, and triangle ACD is now the easy one: you were given the angle at A, you found the angle at D in the last part, so the angle at C is what is left of 180°. Look at the answer for a moment before you move on — 35°, exactly what Â₁ came out as in part (b). That is the equality the last part needs, and it is no accident: the examiner built the figure so that it would happen.",
      },
    },
    {
      id: "f",
      marks: 3,
      level: 3,
      prompt: { en: "Prove that &nbsp;AB ∥ DC." },
      hint: { en: "Treat the diagonal AC as a transversal cutting the two chords. Which angle does it make with AB, and which with DC — and what did you just find out about them?" },
      memo: [
        { type: "step", text: { en: "Â₁ = 35° &nbsp;and&nbsp; Ĉ₁ = 35°, &nbsp;so &nbsp;Â₁ = Ĉ₁" }, ticks: ["ca"] },
        { type: "step", text: { en: "Â₁ and Ĉ₁ are alternate angles, with AC as the transversal cutting AB and DC." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ AB ∥ DC &nbsp;&nbsp;<i>(alt ∠s =)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: name the transversal. Two angles that happen to be equal prove nothing about parallel lines until you say which line cuts across the other two — here it is <b>AC</b>, and Â₁ and Ĉ₁ sit on opposite sides of it, which is what makes them alternate rather than corresponding.",
        } },
      ],
      esplain: {
        en: "Proving lines parallel is the Grade 9 work you know, run backwards. Instead of “these lines are parallel, so the angles do this”, you say “the angles do this, so the lines must be parallel” — and the SAG has a separate short form for each direction, which is why the reason here is “alt ∠s =” and not “alt ∠s; AB ∥ DC”. The only line joining the two chords in this picture is AC, so that has to be your transversal, and the two 35° angles sit on opposite sides of it, one at each end. When alternate angles are equal, the lines cannot be doing anything except running parallel. Notice this part banked five earlier answers before it needed them — that is exactly why it comes last.",
      },
    },
  ],
};

/* =====================================================================
   RIDER 5 — THREE EQUAL CHORDS, AND SIX ANGLES THAT ARE ALL x
   ---------------------------------------------------------------------
   A 165°, B 45°, C 325°, D 245° — clockwise, arcs
     AB 120°   BC 80°   CD 80°   DA 80°
   The three equal arcs mean AD = DC = CB, which the figure shows with
   matching equal-length ticks. Every angle standing on one of those
   three equal chords is HALF of 80° = 40°, and the figure is drawn with
   x = 40 — but no part ever substitutes a number.
     Â₁ = ∠BAC = 40° = x   (given)      Â₂ = ∠CAD = 40° = x
     B̂₁ = ∠ABD = 40° = x                B̂₂ = ∠DBC = 40° = x
     ∠BDC = 40° = x                     ∠ACD = 40° = x
     ∠ACB = ∠ADB = ½·120 = 60°   (drawn but not asked)
     Â = B̂ = 2x = 80°     Ĉ = ∠BCD = D̂ = ∠ADC = 180° − 2x = 100°
   This is the SAG's own "name the other angles equal to x" rider, and
   it is worth six of them. Only the six the parts use are marked, so
   the figure stays readable at 375 px: A and B carry two numbered
   wedges each, C and D one apiece (named in full in the prompts).
   ===================================================================== */
const CQ5_BASE = {
  ...CANVAS,
  pts: { A: 165, B: 45, C: 325, D: 245 },
  key: { at: "tr", lines: [{ t: "Â₁ = x" }] },
  chords: [
    ["A", "B"],
    { a: "B", b: "C", mk: "t1" },
    { a: "C", b: "D", mk: "t1" },
    { a: "D", b: "A", mk: "t1" },
    ["A", "C"], ["B", "D"],
  ],
  angles: [
    { at: "A", legs: ["B", "C"], t: "1", o: { v: 40, ar: 42 } },
    { at: "A", legs: ["C", "D"], t: "2", o: { v: 40, ar: 23 } },
    { at: "B", legs: ["A", "D"], t: "1", o: { v: 40, ar: 42 } },
    { at: "B", legs: ["D", "C"], t: "2", o: { v: 40, ar: 23 } },
    { at: "C", legs: ["A", "D"], t: "", o: { v: 40, ar: 22 } },
    { at: "D", legs: ["B", "C"], t: "", o: { v: 40, ar: 22 } },
  ],
};
const CQ5_A1 = { at: "A", legs: ["B", "C"], v: 40, o: { ar: 42, hlR: 42 } };
const CQ5_A2 = { at: "A", legs: ["C", "D"], v: 40, o: { ar: 23, hlR: 23 } };
const CQ5_B1 = { at: "B", legs: ["A", "D"], v: 40, o: { ar: 42, hlR: 42 } };
const CQ5_B2 = { at: "B", legs: ["D", "C"], v: 40, o: { ar: 23, hlR: 23 } };
const CQ5_ACD = { at: "C", legs: ["A", "D"], v: 40, o: { ar: 22, hlR: 22 } };
const CQ5_BDC = { at: "D", legs: ["B", "C"], v: 40, o: { ar: 22, hlR: 22 } };
const CQ5_ADC = { at: "D", legs: ["A", "C"], v: 100 };
const CQ5_ABC = { at: "B", legs: ["A", "C"], v: 80 };
const CQ5_CHAIN = [
  { n: "Â₂", v: "x" }, { n: "∠BDC", v: "x" }, { n: "B̂₁", v: "x" },
  { n: "B̂₂", v: "x" }, { n: "∠ACD", v: "x" },
];

const cq5 = {
  id: "euclid.sib.cq.q5",
  chapter: CH,
  topic: TOPIC,
  archetype: "equal-chords-name-the-other-angles-equal-to-x-then-opposite-angles-in-terms-of-x",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 13,
  intro: {
    en: "In the diagram, ABCD is a cyclic quadrilateral with both diagonals drawn. &nbsp;AD = DC = CB, as the matching ticks show. &nbsp;Â₁ = x.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(CQ5_BASE, []),
        question: { angles: [CQ5_A2] },
        reveal: { angles: [CQ5_A1, CQ5_A2], chords: [["B", "C", "t1"], ["C", "D", "t1"]] },
      },
      b: {
        spec: specAfter(CQ5_BASE, CQ5_CHAIN.slice(0, 1)),
        question: { angles: [CQ5_BDC] },
        reveal: { angles: [CQ5_BDC, CQ5_A1], chords: [["B", "C", "t1"]] },
      },
      c: {
        spec: specAfter(CQ5_BASE, CQ5_CHAIN.slice(0, 2)),
        question: { angles: [CQ5_B1] },
        reveal: { angles: [CQ5_B1, CQ5_A1], chords: [["D", "A", "t1"], ["B", "C", "t1"]] },
      },
      d: {
        spec: specAfter(CQ5_BASE, CQ5_CHAIN.slice(0, 3)),
        question: { angles: [CQ5_B2, CQ5_ACD] },
        reveal: { angles: [CQ5_B2, CQ5_A2, CQ5_ACD, CQ5_B1] },
      },
      e: {
        spec: specAfter(CQ5_BASE, CQ5_CHAIN.slice(0, 5)),
        question: { angles: [CQ5_ADC] },
        reveal: { angles: [CQ5_ADC, CQ5_ABC] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Â₂&nbsp; in terms of x." },
      hint: { en: "The ticks are not decoration. Â₁ stands on chord BC and Â₂ stands on chord CD — and those two chords are marked the same." },
      memo: [
        { type: "step", text: { en: "CB = CD, and equal chords subtend equal angles at the circumference. &nbsp;&nbsp;<i>(equal chords; equal ∠s)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Â₂ = Â₁ = x" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Think of a chord as a bite taken out of the circle. Two bites of exactly the same size cut off arcs of exactly the same size, and an angle at the circumference is just a way of measuring the arc it stands on — so equal chords make equal angles, every time. Here Â₁ looks at chord BC and Â₂ looks at chord CD, and the ticks say those chords match. Whenever you see matching ticks on two chords, write down what they force before you even read the rest of the question; that one line is usually the key that unlocks everything else.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠BDC&nbsp; in terms of x." },
      hint: { en: "∠BDC stands on chord BC. Which other angle in the picture stands on that same chord, on the same side of it?" },
      memo: [
        { type: "step", text: { en: "∠BDC and Â₁ both stand on chord BC, with A and D on the same side of it. &nbsp;&nbsp;<i>(∠s in the same seg)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠BDC = Â₁ = x" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A chord splits a circle into two segments, and every point in one segment sees that chord at the same angle as every other point in the same segment. The chord here is BC, and both A and D are sitting in the bigger piece on the far side of it, so the angle BC makes at A has to equal the angle it makes at D. The thing to check every single time is that the two points really are on the same side of the chord: if they are on opposite sides the angles are not equal at all, they are supplementary, which is a completely different theorem.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;B̂₁&nbsp; in terms of x." },
      hint: { en: "B̂₁ stands on chord AD. Â₁ stands on chord BC. What do the ticks say about those two chords?" },
      memo: [
        { type: "step", text: { en: "AD = CB, and equal chords subtend equal angles at the circumference. &nbsp;&nbsp;<i>(equal chords; equal ∠s)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ B̂₁ = Â₁ = x" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The same theorem as part (a), but this time the two equal chords are at opposite ends of the picture, which makes it much harder to spot. That is the real skill the equal-chords theorem asks for: not remembering it, but noticing that the angle you want is standing on a chord that has a twin somewhere else in the figure. A good habit is to label each marked angle with the chord it stands on the moment you meet it — write “on BC” beside Â₁ and “on AD” beside B̂₁ — and then the matching pairs jump out at you.",
      },
    },
    {
      id: "d",
      marks: 4,
      level: 2,
      prompt: { en: "Two more angles in the figure are also equal to x. &nbsp;Name them, and give a reason for each." },
      hint: { en: "You already have four angles equal to x. Try each of them in turn: for each one, ask which chord it stands on, and whether another marked angle in the picture stands on that same chord from the same side." },
      memo: [
        { type: "step", text: { en: "B̂₂ = Â₂ = x &nbsp;&nbsp;<i>(∠s in the same seg)</i> — both stand on chord DC, with A and B on the same side of it" }, ticks: ["a", "a"] },
        { type: "answer", text: { en: "∠ACD = B̂₁ = x &nbsp;&nbsp;<i>(∠s in the same seg)</i> — both stand on chord AD, with B and C on the same side of it" }, ticks: ["a", "a"] },
        { type: "trap", text: {
          en: "REMEMBER: the marker pays for the ANGLE and for the REASON separately, on each of the two. Listing two angle names with no reasons beside them scores half of what the part is worth.",
        } },
      ],
      esplain: {
        en: "“Name the other angles equal to x” is a favourite exam wording, and it looks open-ended until you realise it is a checklist. Take each angle you already know is x, ask what chord it stands on, then look for a second point on the same side of that chord — that second angle is the next one on the list. Running the checklist here turns up six angles equal to x altogether, which is most of the figure. There is one more thing worth noticing: you could also have got ∠ACD from the equal chords directly, since it stands on AD just like B̂₁ does. Two roads to the same angle, and both earn the marks.",
      },
    },
    {
      id: "e",
      marks: 3,
      level: 3,
      prompt: { en: "Determine, with reasons, the size of &nbsp;∠ADC&nbsp; in terms of x." },
      hint: { en: "∠ADC faces one of the other corners across the quadrilateral. Which one — and can you write that corner's angle in terms of x now?" },
      memo: [
        { type: "step", text: { en: "∠ABC = B̂₁ + B̂₂ = x + x = 2x" }, ticks: ["ca"] },
        { type: "step", text: { en: "∠ADC + ∠ABC = 180° &nbsp;&nbsp;<i>(opp ∠s of cyclic quad)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠ADC = 180° − 2x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: 180° − 2x, not 180° − x. The angle facing ∠ADC is the WHOLE angle at B, and the diagonal BD split that into two pieces — both of which turned out to be x, so the whole is 2x.",
        } },
      ],
      esplain: {
        en: "The last part pulls the two halves of the question together. All the earlier work was about single angles standing on single chords; this one steps back and looks at the quadrilateral as a whole. The angle at B is not one of the x's, it is both of them added, and it is that whole angle that faces ∠ADC across the shape. Learners lose this mark by grabbing the nearest x instead of building the full angle first. Write ∠ABC = B̂₁ + B̂₂ on its own line before you use the opposite-angles theorem, and the mistake becomes impossible.",
      },
    },
  ],
};

/* =====================================================================
   RIDER 6 — NO CIRCLE IS DRAWN, BECAUSE THE CIRCLE IS THE ANSWER
   ---------------------------------------------------------------------
   A 145°, B 65°, C 355°, D 235° — the four points really do sit on one
   circle (arcs AB 80°, BC 70°, CD 120°, DA 90°), so every angle below
   is exact arc arithmetic and the figure is as honest as any other in
   this file. What it does NOT do is draw the circle: proving that the
   four points are concyclic is the whole question, and a drawn circle
   would hand that over. `noCircle: true` is the engine's own switch for
   exactly this.
     Ĉ₁ = ∠ACB = ½·80  = 40°     ∠ADB = ½·80  = 40°   ← the equal pair
     ∠BAC = ½·70  = 35°          B̂₁ = ∠ABD = ½·90 = 45°
     B̂₂ = ∠DBC = ½·120 = 60°     ∠ABC = 45 + 60 = 105°
     ∠ADC = ½(80 + 70) = 75°     Ĉ₂ = ∠ACD = ½·90 = 45°
     ∠BAD = ½(70 + 120) = 95°    ∠BCD = 40 + 45 = 85°
   105 + 75 = 180 and 95 + 85 = 180 — both pairs, as they must be once
   the four points are concyclic.
   ===================================================================== */
const CQ6_BASE = {
  ...CANVAS,
  noCircle: true,
  pts: { A: 145, B: 65, C: 355, D: 235 },
  key: { at: "tr", lines: [{ t: "B̂₁ = 45°" }, { t: "B̂₂ = 60°" }] },
  chords: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "C"], ["B", "D"]],
  angles: [
    { at: "A", legs: ["B", "C"], t: "35°", o: { v: 35, r: 50, ar: 26 } },
    { at: "B", legs: ["A", "D"], t: "1", o: { v: 45, ar: 42 } },
    { at: "B", legs: ["D", "C"], t: "2", o: { v: 60, ar: 23 } },
    { at: "C", legs: ["A", "B"], t: "1", o: { v: 40, ar: 42 } },
    { at: "C", legs: ["A", "D"], t: "2", o: { v: 45, ar: 23 } },
    { at: "D", legs: ["A", "B"], t: "40°", o: { v: 40, r: 50, ar: 26 } },
  ],
};
const CQ6_BAC = { at: "A", legs: ["B", "C"], v: 35, o: { ar: 26, hlR: 26 } };
const CQ6_B1 = { at: "B", legs: ["A", "D"], v: 45, o: { ar: 42, hlR: 42 } };
const CQ6_B2 = { at: "B", legs: ["D", "C"], v: 60, o: { ar: 23, hlR: 23 } };
const CQ6_ABC = { at: "B", legs: ["A", "C"], v: 105 };
const CQ6_C1 = { at: "C", legs: ["A", "B"], v: 40, o: { ar: 42, hlR: 42 } };
const CQ6_C2 = { at: "C", legs: ["A", "D"], v: 45, o: { ar: 23, hlR: 23 } };
const CQ6_BCD = { at: "C", legs: ["B", "D"], v: 85 };
const CQ6_ADB = { at: "D", legs: ["A", "B"], v: 40, o: { ar: 26, hlR: 26 } };
const CQ6_ADC = { at: "D", legs: ["A", "C"], v: 75 };
const CQ6_BAD = { at: "A", legs: ["B", "D"], v: 95 };
const CQ6_SIDES = [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]];
const CQ6_CHAIN = [
  { n: "∠ABC", v: "105°" }, { n: "Ĉ₁", v: "40°" },
  { n: "∠ADC", v: "75°" }, { n: "Ĉ₂", v: "45°" },
];

const cq6 = {
  id: "euclid.sib.cq.q6",
  chapter: CH,
  topic: TOPIC,
  archetype: "prove-four-points-concyclic-by-equal-angles-on-one-line-then-use-the-cyclic-quad",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 12,
  intro: {
    en: "In the diagram, ABCD is a quadrilateral with both diagonals drawn. &nbsp;<b>No circle is drawn.</b> &nbsp;∠BAC = 35°, &nbsp;∠ADB = 40°, &nbsp;B̂₁ = 45° &nbsp;and&nbsp; B̂₂ = 60°.",
  },
  diagram: {
    parts: {
      a: {
        spec: specAfter(CQ6_BASE, []),
        question: { angles: [CQ6_ABC] },
        reveal: { angles: [CQ6_B1, CQ6_B2] },
      },
      b: {
        spec: specAfter(CQ6_BASE, CQ6_CHAIN.slice(0, 1)),
        question: { angles: [CQ6_C1] },
        reveal: { angles: [CQ6_C1, CQ6_BAC, CQ6_ABC] },
      },
      c: {
        spec: specAfter(CQ6_BASE, CQ6_CHAIN.slice(0, 2)),
        question: { chords: CQ6_SIDES },
        reveal: { chords: CQ6_SIDES, angles: [CQ6_C1, CQ6_ADB] },
      },
      d: {
        spec: specAfter(CQ6_BASE, CQ6_CHAIN.slice(0, 2)),
        question: { angles: [CQ6_ADC] },
        reveal: { angles: [CQ6_ADC, CQ6_ABC] },
      },
      e: {
        spec: specAfter(CQ6_BASE, CQ6_CHAIN.slice(0, 3)),
        question: { angles: [CQ6_C2] },
        reveal: { angles: [CQ6_C2, CQ6_B1], chords: [["D", "A"]] },
      },
      f: {
        spec: specAfter(CQ6_BASE, CQ6_CHAIN.slice(0, 4)),
        question: { angles: [CQ6_BAD] },
        reveal: { angles: [CQ6_BAD, CQ6_BCD] },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: { en: "Write down the size of &nbsp;∠ABC." },
      hint: { en: "The diagonal BD cuts the angle at B into the two pieces you were given." },
      memo: [
        { type: "answer", text: { en: "∠ABC = B̂₁ + B̂₂ = 45° + 60° = 105°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A one-mark reading-the-picture part, and it is deliberately first: this question has no circle in it, so the usual circle theorems are all switched off until you earn them. Everything in the first two parts is ordinary triangle and angle work. Add the two pieces at B, write 105° onto your own sketch, and you have the raw material the next part needs.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ĉ₁." },
      hint: { en: "Ĉ₁ is one angle of triangle ABC, and the other two are now both on your page." },
      memo: [
        { type: "step", text: { en: "In △ABC: &nbsp;Ĉ₁ + ∠BAC + ∠ABC = 180° &nbsp;&nbsp;<i>(sum of ∠s in Δ)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ĉ₁ = 180° − 35° − 105° = 40°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Still no circle theorems — just the angle sum of a triangle, which works in every figure ever drawn. What matters is the number that comes out: 40°, which is exactly the size you were given for ∠ADB at the other end of the picture. Two equal angles standing on the same line, from two different points, is not something an examiner arranges by accident. Before you turn to the next part, look at the two 40°s and ask yourself what line they are both standing on.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: { en: "Prove that &nbsp;ABCD&nbsp; is a cyclic quadrilateral." },
      hint: { en: "You have two equal angles, at C and at D. What line segment are they both looking at — and are C and D on the same side of it?" },
      memo: [
        { type: "step", text: { en: "Ĉ₁ = 40° &nbsp;and&nbsp; ∠ADB = 40°, &nbsp;so &nbsp;Ĉ₁ = ∠ADB" }, ticks: ["ca"] },
        { type: "step", text: { en: "AB subtends these two equal angles at C and at D, and C and D lie on the SAME side of AB." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ A, B, C and D are concyclic, so ABCD is a cyclic quadrilateral &nbsp;&nbsp;<i>(line subtends equal ∠s)</i>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: <b>same side</b> is not optional. Two equal angles standing on AB from opposite sides of it prove nothing. Say which line segment does the subtending and which side both points are on — those words are what the marker is looking for.",
        } },
      ],
      esplain: {
        en: "There are two standard ways to prove four points lie on one circle, and this figure gives you the second one. The first is opposite angles adding to 180°; the second is the one you need here — if a line segment makes the same angle at two points on the same side of it, then those two points and the segment's endpoints all lie on one circle. That is the converse of the “angles in the same segment” theorem, and the SAG short form for it is “line subtends equal ∠s”. From this moment on the invisible circle exists, and every circle theorem you own becomes available on it — which is what the last three parts are about.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠ADC." },
      hint: { en: "Now that ABCD is cyclic, its opposite angles are supplementary. Which corner faces D?" },
      memo: [
        { type: "step", text: { en: "∠ADC + ∠ABC = 180° &nbsp;&nbsp;<i>(opp ∠s of cyclic quad)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ ∠ADC = 180° − 105° = 75°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "This is the pay-off for the proof. Ten seconds ago the opposite-angles theorem was not available to you at all, because nothing said the four points were on a circle; now that part (c) has established it, the theorem is yours to quote in a single line. That is worth understanding about exam geometry generally: a “prove” part in the middle of a question is almost never there for its own sake — it is unlocking the tools that the rest of the question needs.",
      },
    },
    {
      id: "e",
      marks: 2,
      level: 2,
      prompt: { en: "Determine, with a reason, the size of &nbsp;Ĉ₂." },
      hint: { en: "Ĉ₂ stands on AD. Which other angle in the figure stands on AD from the same side?" },
      memo: [
        { type: "step", text: { en: "Ĉ₂ and B̂₁ both stand on chord AD, with B and C on the same side of it. &nbsp;&nbsp;<i>(∠s in the same seg)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ Ĉ₂ = B̂₁ = 45°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Same-segment angles, on the circle you proved into existence. The chord is AD; B and C are both sitting in the segment on the far side of it, so they see AD at the same angle. It is worth saying out loud how strange this would have felt before part (c): there is no circle on the page, and yet you are using a theorem about segments of a circle. That is exactly what a concyclic proof buys you, and it is why examiners put one in the middle of a long question.",
      },
    },
    {
      id: "f",
      marks: 2,
      level: 3,
      prompt: { en: "Determine, with a reason, the size of &nbsp;∠BAD." },
      hint: { en: "Build the whole angle at C out of its two pieces first. Then think about which corner faces A." },
      memo: [
        { type: "step", text: { en: "∠BCD = Ĉ₁ + Ĉ₂ = 40° + 45° = 85°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∠BAD + ∠BCD = 180° &nbsp;&nbsp;<i>(opp ∠s of cyclic quad)</i><br>∴ ∠BAD = 180° − 85° = 95°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the angle facing ∠BAD is the WHOLE angle at C, not Ĉ₁ or Ĉ₂ on its own. The diagonal AC split it in two, and both halves have to go back together before the opposite-angles theorem is allowed anywhere near it.",
        } },
      ],
      esplain: {
        en: "The last part uses the second pair of opposite angles, and the only thing that makes it harder than part (d) is that you have to rebuild the angle at C before you can use it. That is the single commonest slip in cyclic-quadrilateral questions: a diagonal has cut a corner in two, and the learner reaches for the nearest half instead of the whole. A quick guard against it — before writing the theorem down, put your finger on the two corners and say “A faces C” out loud, then make sure the number you use for C really is the whole corner.",
      },
    },
  ],
};

export const euclidCyclicQuadsSiblingQuestions = [cq1, cq2, cq3, cq4, cq5, cq6];
