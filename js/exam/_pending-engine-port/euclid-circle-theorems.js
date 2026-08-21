/* ============================================================
   EXAM FOCUS — Euclidean geometry · Circle theorems
   ⚠️ PENDING. Not in js/exam/, not registered, not imported by
   anything. Read _pending-engine-port/README-PENDING.md first — this
   module is blocked on BOTH the Circle Quest engine.js port AND a
   ruling on the Euclidean chapter tag.
   ------------------------------------------------------------
   SOURCE: September Test 2 (practice), QUESTION 4 — the bookwork proof
   (∠ at centre = 2 × ∠ at circumference, acute case) plus the
   line-from-centre-⊥-chord calculation.
   (Overnight run #1, stage 3b, 2026-08-21.)

   PRINT SOURCE:
     Desktop\Eksamen Vraestelle\Gr11 IEB Nov\Sept Practice\
       Sept-T2-Practice-QP.tex        Q4(a), Q4(b)(1)–(2), \FigFourA/\FigFourB
       Sept-T2-Practice-Memo.tex      4(a)–4(b)(2), 9 ticks
       Sept-T2-blueprint.md           §1, §4 scope walls, §5 judgement 7
       Sept-T2-euclid-specs.md        specQ4a / specQ4b, embedded below
   Same statements, same reasons, same ticks, same WATCH OUT / REMEMBER
   cards as the print memo. `hint` and `esplain` freshly authored.

   ⚠️ CHAPTER TAG IS PROVISIONAL. `chapter: "euclid"` names a chapter
   that DOES NOT EXIST — js/config.js CHAPTERS has eleven entries and
   none of them is Euclidean, and js/exam/index.js's REGISTRY has no
   euclid key (its header's "Euclidean geometry has no key here on
   purpose" note is now STALE — EXAM-FOCUS-PLAN.md's Corrections section
   reverses it: Circle Quest owns the DRILL rounds, Euclidean EXAM
   questions belong here). The slug is a placeholder for whatever she
   rules the home should be.

   ⚠️⚠️ lostQuest IS A DOCUMENTED PLACEHOLDER. With no euclid chapter
   there is no round to reteach into, and pointing at a Circle Quest
   round is not possible from here (CQ is a separate app; the plan's
   CQ→hub link is a different mechanism). The placeholder degrades
   SAFELY through three independent gates in js/exam-play.js's
   lostQuestLink(): the id is never in app.state.openQuests, and even if
   it were, chapterById / quests.find / questDef all fail to resolve and
   the function returns null. Result: no reteach button — never a
   dead-end, never a throw. This file is excluded from the harness's
   lostQuest-resolves check and asserted to carry the placeholder.

   ⚠️ DIAGRAMS. The print figures are TikZ (Sept-T2-figs.tex). The specs
   below are the Circle Quest engine.js drafts, copied verbatim from
   Sept-T2-euclid-specs.md — geometry checked by arc arithmetic in
   Sept-T2-verify.py, NEVER rendered. They are exported so port day can
   import them directly rather than retyping. `diagram` on the question
   object is plain pending-port metadata; validateQuestion() does not
   look at it and no schema field was invented.
   PORT DAY MUST NOT CHANGE: the degrees · D between A and C (the acute
   case the syllabus examines) · Q4(b)'s 12 : 9 : 15 proportions.
   KNOWN GAP: o.mark draws a chevron, not a right-angle square; Q4(b)
   needs a square at M. Do not silently ship a chevron for a 90° angle.

   ⚠️ THE BARE-FIGURE RULE FOR 4(a). The printed question shows the
   figure with NO angle labels at all — the learner constructs the x / y
   labelling as part of the proof. A diagram already carrying x, y, 2x,
   2y hands the proof over. So specQ4a's `angles` array is the REVEAL
   state; `diagram.question` below names the subset to draw on the
   question side (chords and point labels only).

   LEVELS: 1:1 with T2's blueprint — (a) 1, (b)(1) 3, (b)(2) 2. No ★
   (T2's two level-4 parts are 3(e) and 5(d); 5(d) is in the sibling
   file).
   ============================================================ */

const PAPER = "sept-t2";
const LOST_PENDING = { chapter: "euclid", quest: "PENDING-no-euclid-chapter" };

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
    { at: "M", legs: ["Q", "T"], t: "", o: { v: 90, mark: 1 } },
  ],
};

const t2q4 = {
  id: "euclid.circ.t2q4",
  chapter: "euclid",
  topic: "circle-theorems",
  archetype: "bookwork-angle-at-centre-plus-perpendicular-from-centre-to-chord",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 9,
  /* pending-port metadata only — ignored by validateQuestion() */
  diagram: {
    a: {
      spec: specQ4a,
      question: "chords + point labels ONLY — omit every `angles` entry (see the bare-figure rule above)",
      reveal: [
        "step 1: hl #f6c945 on {at:'B',legs:['A','D']} and {at:'A',legs:['B','O']} — the isosceles pair",
        "step 2: hl on {at:'O',legs:['A','D']} — the 2x exterior angle",
        "step 3: repeat with the y / 2y pair",
        "step 4: hl {at:'O',legs:['A','C']} and {at:'B',legs:['A','C']} together — the statement itself",
      ],
    },
    b1: {
      spec: specQ4b,
      reveal: [
        "hl the chord halves: replace ['P','Q'] with {a:'P',b:'M',hl:'#f6c945'} and {a:'M',b:'Q',hl:'#f6c945'} so 'bisects' is the visual message",
        "then hl {a:'O',b:'P',hl:'#f6c945'} — the radius being found",
      ],
    },
    b2: {
      spec: specQ4b,
      reveal: ["hl the segment M→T only: {a:'M',b:'T',hl:'#f6c945'} drawn on top of ['O','T']"],
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
        { type: "step", text: { en: "Let ∠ABO = x &nbsp;and&nbsp; ∠CBO = y." } },
        { type: "step", text: { en: "OA = OB &nbsp;&nbsp;<i>(radii)</i>" } },
        { type: "step", text: { en: "∴ ∠OAB = x &nbsp;&nbsp;<i>(∠s opposite equal sides)</i>" }, ticks: ["ca"] },
        { type: "step", text: { en: "∠AOD = x + x = 2x &nbsp;&nbsp;<i>(exterior ∠ of △AOB)</i>" }, ticks: ["ca"] },
        { type: "step", text: { en: "OC = OB, so ∠OCB = y &nbsp;&nbsp;<i>(radii; ∠s opposite equal sides)</i>" }, ticks: ["ca"] },
        { type: "step", text: { en: "∠COD = y + y = 2y &nbsp;&nbsp;<i>(exterior ∠ of △COB)</i>" }, ticks: ["ca"] },
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
