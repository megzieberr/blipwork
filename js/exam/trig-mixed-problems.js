/* ============================================================
   EXAM FOCUS — 2D Trigonometry · Mixed problems
   SOURCE: September Test 2 (practice), QUESTION 6 — cosine rule, then
   the area rule across a split triangle.
   (Overnight run #1, stage 3b, 2026-08-21.)
   ------------------------------------------------------------
   PRINT SOURCE:
     Sept-T2-Practice-QP.tex      Q6 stem + (a)–(b)
     Sept-T2-Practice-Memo.tex    6(a)–6(b), 5 ticks
     Sept-T2-blueprint.md         §1, §4 scope walls, §5 judgement 6
   Same working, same ticks, same OR route, same WATCH OUT / REMEMBER
   cards as print. `hint` and `esplain` freshly authored.

   ⚠️ THE FIGURE. The print question carries a TikZ triangle (\FigSix)
   with D on AC and the 68° marked on the drawing; the LENGTHS are
   already in the question text, not on the figure (blueprint §5,
   judgement call 6 — deliberately, to keep the drawing uncluttered).
   The schema has no diagram field, so the stem here states exactly what
   the print memo's own \stam card states: D on AC, AD = 12, DC = 8,
   BD = 15, ∠ADB = 68°. Nothing is added and nothing is withheld — the
   only fact that lived on the figure alone was the 68°, and the
   question text already prints it too. Future diagram-engine candidate:
   a plain triangle SVG (no circle engine needed) — △ABC with D on AC,
   BD drawn, the 68° wedge at D.

   METHOD: standard correct Grade 11 2D trig (per the corrected
   EXAM-FOCUS-PLAN, trig is not one of the three "her methods" chapters)
   with the paper's own rules enforced: NO FORMULA SHEET (her ruling —
   the cosine rule has to come out of the learner's head, and 6(a)'s
   REMEMBER card says so), TWO decimal places, and nothing rounded in
   the middle of a calculation.

   ⚠️ ONE DELIBERATE DIVERGENCE FROM THE PRINT MEMO — REPORTED, NOT
   SILENT. Sept-T2-Practice-Memo.tex's 6(b) prints the first of the two
   part-areas as "83{,}4466\ldots". The true value is
   ½(12)(15) sin 68° = 90 sin 68° = 83,44654691… — so the fourth decimal
   is wrong whether you truncate (83,4465…) or round (83,4465). This
   module carries the CORRECT 83,4465… because it is a learner-facing
   number and shipping a wrong digit into the app would be worse than
   diverging from the print by one character.
   IMPACT: cosmetic only. The second area (55,6310…) is correct, the
   sum 139,0775781… → 139,08 cm² is correct, both ticks are unaffected,
   and the OR route is unaffected. The print memo needs the same
   one-character fix — flagged to the foreman for the T2 paper build.

   LEVELS: 1:1 with T2's blueprint — (a) 2, (b) 3. No ★.

   ⚠️ UNREGISTERED. Registering needs the same five steps as
   js/exam/trig-reduction-and-ratios.js's header. Unlike that file and
   js/exam/trig-general-solutions.js, THIS question sits squarely inside
   the trig chapter's own built rounds, so its topic slug
   ("mixed-problems") is already in the proposed trig wall and its
   lostQuest resolves to a real round. ✓
   ============================================================ */

const PAPER = "sept-t2";

const t2q6 = {
  id: "trig.mix.t2q6",
  chapter: "trig",
  topic: "mixed-problems",
  archetype: "cosine-rule-then-area-rule-across-a-split-triangle",
  paper: PAPER,
  // t7 "Mixed problems — Pick the rule, combine steps, shortest-distance
  // and area." That is this question's shape exactly: choose the cosine
  // rule for (a), then combine two area-rule pieces for (b). t4 and t6
  // each teach half of it; t7 is the round that teaches the combining.
  lostQuest: { chapter: "trig", quest: "t7" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "D is a point on AC of △ABC.<br>AD = 12 cm, &nbsp;DC = 8 cm, &nbsp;BD = 15 cm &nbsp;and&nbsp; ∠ADB = 68°.<br><br>Calculate the length of AB.",
      },
      hint: {
        en: "Work inside the small triangle ABD, not the big one. Check what you actually have in there — two sides and the angle sitting between them points at exactly one rule.",
      },
      memo: [
        { type: "step", text: { en: "In △ABD you have two sides and the angle <i>between</i> them — that is the cosine rule." } },
        { type: "step", text: { en: "AB² = AD² + BD² − 2(AD)(BD) cos ∠ADB" }, ticks: ["s/f"] },
        { type: "step", text: { en: "AB² = 12² + 15² − 2(12)(15) cos 68° = 144 + 225 − 360 cos 68° = 234,1416…" }, ticks: ["ca"] },
        { type: "answer", text: { en: "AB = 15,30 cm" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the angle in the cosine rule must be the one <i>between</i> the two sides you substituted. ∠ADB sits between AD and BD, so it is the right one — but using 12, 8 and 68° (side DC instead of BD) is a real temptation because both numbers are printed. Mark the two sides on your diagram before you substitute.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: no formula sheet in this test. The cosine rule &nbsp;a² = b² + c² − 2bc cos A&nbsp; has to come out of your head.",
        } },
      ],
      esplain: {
        en: "The first decision is which triangle to stand in. AB is a side of the small triangle ABD, and everything you have been given about that triangle — 12, 15 and the 68° between them — belongs to it, so that is where you work. DC is not in it at all, which is exactly why it is printed: the question is checking whether you pick your sides or just grab the numbers on the page. Once you are in the right triangle the choice of rule is automatic. Two sides with the angle wedged between them is the cosine rule's home ground; the sine rule would need a side paired with the angle opposite it, and you do not have that. One habit worth keeping: do not round 234,1416… before you square-root it. Round once, at the very end, to two decimals.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "Calculate the area of △ABC.",
      },
      hint: {
        en: "BD cuts the big triangle into two smaller ones, and you know two sides and the included angle in each. What is the angle on the other side of D, and how does its sine compare with 68°?",
      },
      memo: [
        { type: "step", text: { en: "D lies on AC, so △ABC splits into △ABD and △DBC. &nbsp;∠BDC = 180° − 68° = 112° (∠s on a straight line), and sin 112° = sin 68°." } },
        { type: "step", text: { en: "Area = ½(12)(15) sin 68° + ½(8)(15) sin 112°" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "= 83,4465… + 55,6310… = 139,08 cm²" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — because the two pieces share the same perpendicular height from B: &nbsp;Area = ½(AD + DC)(BD) sin 68° = ½(20)(15) sin 68° = 139,08 cm². &nbsp;Same marks." } },
        { type: "trap", text: {
          en: "WATCH OUT: do not write ½(20)(15) sin 68° and call it “the area rule on △ABC”. The area rule needs two <i>sides of that triangle</i> with the angle between them, and BD is not a side of △ABC. The numbers happen to be right here only because the two small triangles share a height — show that step, or show the two areas added.",
        } },
      ],
      esplain: {
        en: "You cannot use the area rule on △ABC directly, because you do not know two of its sides with the angle between them — BD runs into the middle of it, not along an edge. But BD also does something useful: it cuts the big triangle into two smaller ones, and in each of those you DO have two sides and the included angle. So work out both areas and add them. The pretty part is the angle at D. ∠ADB and ∠BDC sit on a straight line, so they add to 180°, which makes ∠BDC = 112° — and any two angles that add to 180° have exactly the same sine. That is why 68° does the work for both halves, and it is also why the shortcut in the OR box comes out right: the two triangles share the same perpendicular height from B, so their areas can be added as one ½(AD + DC)(BD) sin 68°. Both roads earn full marks; what loses marks is jumping to the shortcut without showing why it is allowed.",
      },
    },
  ],
};

export const trigMixedProblemsQuestions = [t2q6];
