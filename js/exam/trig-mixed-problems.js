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
        en: "D is a point on AC of △ABC.<br>AD = 12 cm, &nbsp;DC = 8 cm, &nbsp;BD = 15 cm &nbsp;and&nbsp; ∠ADB = 68°.<br><br>Calculate the length of AB.", af: "D is 'n punt op AC van △ABC.<br>AD = 12 cm, &nbsp;DC = 8 cm, &nbsp;BD = 15 cm &nbsp;en&nbsp; ∠ADB = 68°.<br><br>Bereken die lengte van AB.",
      },
      hint: {
        en: "Work inside the small triangle ABD, not the big one. Check what you actually have in there — two sides and the angle sitting between them points at exactly one rule.", af: "Werk binne die klein driehoek ABD, nie die groot een nie. Kyk wat jy werklik daarin het: twee sye en die hoek tussen hulle wys na presies een reël.",
      },
      memo: [
        { type: "step", text: { en: "In △ABD you have two sides and the angle <i>between</i> them — that is the cosine rule.", af: "In △ABD het jy twee sye en die hoek <i>tussen</i> hulle: dit is die cosinusreël." } },
        { type: "step", text: { en: "AB² = AD² + BD² − 2(AD)(BD) cos ∠ADB", af: "AB² = AD² + BD² − 2(AD)(BD) cos ∠ADB" }, ticks: ["s/f"] },
        { type: "step", text: { en: "AB² = 12² + 15² − 2(12)(15) cos 68° = 144 + 225 − 360 cos 68° = 234,1416…", af: "AB² = 12² + 15² − 2(12)(15) cos 68° = 144 + 225 − 360 cos 68° = 234,1416…" }, ticks: ["ca"] },
        { type: "answer", text: { en: "AB = 15,30 cm", af: "AB = 15,30 cm" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the angle in the cosine rule must be the one <i>between</i> the two sides you substituted. ∠ADB sits between AD and BD, so it is the right one — but using 12, 8 and 68° (side DC instead of BD) is a real temptation because both numbers are printed. Mark the two sides on your diagram before you substitute.", af: "PASOP: die hoek in die cosinusreël moet die een <i>tussen</i> die twee sye wees wat jy vervang het. ∠ADB lê tussen AD en BD, dus is dit die regte een, maar om 12, 8 en 68° te gebruik (sy DC in plaas van BD) is 'n regte versoeking, want albei getalle staan op die blad. Merk die twee sye op jou diagram voordat jy vervang.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: no formula sheet in this test. The cosine rule &nbsp;a² = b² + c² − 2bc cos A&nbsp; has to come out of your head.", af: "ONTHOU: geen formuleblad in hierdie toets nie. Die cosinusreël &nbsp;a² = b² + c² − 2bc cos A&nbsp; moet uit jou kop kom.",
        } },
      ],
      esplain: {
        en: "The first decision is which triangle to stand in. AB is a side of the small triangle ABD, and everything you have been given about that triangle — 12, 15 and the 68° between them — belongs to it, so that is where you work. DC is not in it at all, which is exactly why it is printed: the question is checking whether you pick your sides or just grab the numbers on the page. Once you are in the right triangle the choice of rule is automatic. Two sides with the angle wedged between them is the cosine rule's home ground; the sine rule would need a side paired with the angle opposite it, and you do not have that. One habit worth keeping: do not round 234,1416… before you square-root it. Round once, at the very end, to two decimals.", af: "Die eerste besluit is in watter driehoek jy gaan staan. AB is 'n sy van die klein driehoek ABD, en alles wat jy oor daardie driehoek gekry het (12, 15 en die 68° tussen hulle) behoort daaraan, dus werk jy daar. DC is glad nie daarin nie, en dit is presies hoekom dit daar staan: die vraag toets of jy jou sye kies of net die getalle op die blad gryp. Sodra jy in die regte driehoek is, kies die reël homself. Twee sye met die hoek vasgeknyp tussen hulle is die cosinusreël se tuisveld; die sinusreël het 'n sy nodig saam met die hoek teenoor daardie sy, en dit het jy nie. Een gewoonte wat die moeite werd is: moenie 234,1416… afrond voordat jy die vierkantswortel neem nie. Rond een keer af, heel aan die einde, tot twee desimale.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "Calculate the area of △ABC.", af: "Bereken die oppervlakte van △ABC.",
      },
      hint: {
        en: "BD cuts the big triangle into two smaller ones, and you know two sides and the included angle in each. What is the angle on the other side of D, and how does its sine compare with 68°?", af: "BD sny die groot driehoek in twee kleiner driehoeke, en in elkeen ken jy twee sye en die ingeslote hoek. Wat is die hoek aan die ander kant van D, en hoe vergelyk die sin daarvan met sin 68°?",
      },
      memo: [
        { type: "step", text: { en: "D lies on AC, so △ABC splits into △ABD and △DBC. &nbsp;∠BDC = 180° − 68° = 112° (∠s on a straight line), and sin 112° = sin 68°.", af: "D lê op AC, dus word △ABC in △ABD en △DBC verdeel. &nbsp;∠BDC = 180° − 68° = 112° (∠e op 'n reguit lyn), en sin 112° = sin 68°." } },
        { type: "step", text: { en: "Area = ½(12)(15) sin 68° + ½(8)(15) sin 112°", af: "Oppervlakte = ½(12)(15) sin 68° + ½(8)(15) sin 112°" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "= 83,4465… + 55,6310… = 139,08 cm²", af: "= 83,4465… + 55,6310… = 139,08 cm²" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — because the two pieces share the same perpendicular height from B: &nbsp;Area = ½(AD + DC)(BD) sin 68° = ½(20)(15) sin 68° = 139,08 cm². &nbsp;Same marks.", af: "<b>OF</b>, omdat die twee stukke dieselfde loodregte hoogte vanaf B deel: &nbsp;Oppervlakte = ½(AD + DC)(BD) sin 68° = ½(20)(15) sin 68° = 139,08 cm². &nbsp;Dieselfde punte." } },
        { type: "trap", text: {
          en: "WATCH OUT: do not write ½(20)(15) sin 68° and call it “the area rule on △ABC”. The area rule needs two <i>sides of that triangle</i> with the angle between them, and BD is not a side of △ABC. The numbers happen to be right here only because the two small triangles share a height — show that step, or show the two areas added.", af: "PASOP: moenie ½(20)(15) sin 68° skryf en dit “die oppervlakreël op △ABC” noem nie. Die oppervlakreël het twee <i>sye van daardie driehoek</i> nodig met die hoek tussen hulle, en BD is nie 'n sy van △ABC nie. Die getalle is hier net reg omdat die twee klein driehoeke 'n hoogte deel: wys daardie stap, of wys die twee oppervlaktes bymekaargetel.",
        } },
      ],
      esplain: {
        en: "You cannot use the area rule on △ABC directly, because you do not know two of its sides with the angle between them — BD runs into the middle of it, not along an edge. But BD also does something useful: it cuts the big triangle into two smaller ones, and in each of those you DO have two sides and the included angle. So work out both areas and add them. The pretty part is the angle at D. ∠ADB and ∠BDC sit on a straight line, so they add to 180°, which makes ∠BDC = 112° — and any two angles that add to 180° have exactly the same sine. That is why 68° does the work for both halves, and it is also why the shortcut in the OR box comes out right: the two triangles share the same perpendicular height from B, so their areas can be added as one ½(AD + DC)(BD) sin 68°. Both roads earn full marks; what loses marks is jumping to the shortcut without showing why it is allowed.", af: "Jy kan nie die oppervlakreël direk op △ABC gebruik nie, want jy ken nie twee van sy sye met die hoek tussen hulle nie: BD loop tot binne-in die driehoek, nie langs 'n rand nie. Maar BD doen ook iets nuttigs: dit sny die groot driehoek in twee kleiner driehoeke, en in elkeen van hulle HET jy twee sye en die ingeslote hoek. Bereken dus albei oppervlaktes en tel hulle op. Die mooi deel is die hoek by D. ∠ADB en ∠BDC lê op 'n reguit lyn, dus tel hulle op tot 180°, wat ∠BDC = 112° maak, en enige twee hoeke wat tot 180° optel, het presies dieselfde sin-waarde. Dit is hoekom 68° die werk vir albei helftes doen, en dit is ook hoekom die kortpad in die OF-blokkie reg uitkom: die twee driehoeke deel dieselfde loodregte hoogte vanaf B, dus kan hulle oppervlaktes saam as een ½(AD + DC)(BD) sin 68° geskryf word. Albei paaie kry volpunte; wat punte kos, is om na die kortpad te spring sonder om te wys hoekom dit toegelaat word.",
      },
    },
  ],
};

export const trigMixedProblemsQuestions = [t2q6];
