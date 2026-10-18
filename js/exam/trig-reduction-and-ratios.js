/* ============================================================
   EXAM FOCUS — General Trig · Reductions & ratios
   SOURCE: September Test 2 (practice), QUESTION 1 — the no-calculator
   trig block: co-function, ratio-from-a-sketch, reduction formulae.
   (Overnight run #1, stage 3b, 2026-08-21.)
   ------------------------------------------------------------
   PRINT SOURCE:
     Desktop\Eksamen Vraestelle\Gr11 IEB Nov\Sept Practice\
       Sept-T2-Practice-QP.tex      Q1(a)–(c)
       Sept-T2-Practice-Memo.tex    1(a)–1(c), 9 ticks
       Sept-T2-blueprint.md         §1 blueprint table, §4 scope walls
   Same working, same ticks, same WATCH OUT / REMEMBER cards as the
   print memo. Connective prose is kept as tick-less `step` blocks;
   `hint` and `esplain` are freshly authored per part.

   LEVELS: T2's blueprint assigns ONE level per sub-part (unlike T1,
   which splits a sub-part's marks across two levels), so the mapping
   here is 1:1 with the printed grid — (a) 1, (b) 2, (c) 3. Nothing in
   this question is starred in the print memo; T2's only two ★ parts are
   3(e) and 5(d).

   ⚠️ THE SKETCH IN 1(b) STAYS THE LEARNER'S JOB. "With the aid of a
   sketch" is kept verbatim in the prompt — the learner draws the
   quadrant-3 triangle on paper, which is the whole point of the part
   (EXAM-FOCUS-PLAN.md: "pen and paper is the point"). The print memo
   draws its own TikZ sketch as part of the REVEAL; the schema has no
   diagram field, so that sketch is carried in words inside the memo
   ((−4 ; −3) with r = 5) and unpacked in the esplain. No mark is lost:
   the print memo's tick sits on identifying the quadrant and setting up
   y = −3, r = 5, not on the drawing itself. Future diagram-engine
   candidate — a plain axes-plus-triangle SVG, no circle engine needed.

   ✅ CHAPTER MOVED + RETEACH LINK LIVE — 2026-08-22.
   This question used to sit under the `trig` chapter (2D Trigonometry:
   sine rule / cosine rule / area rule, rounds t1–t7) with a PENDING-
   lostQuest placeholder, because nothing in the app taught reductions,
   co-functions or ratio-from-a-sketch. Both halves of that are now
   fixed by the GENERAL TRIG chapter (`gtrig`, rounds gt1–gt13):
     • `chapter` is now "gtrig". The id, topic, paper tag and every
       part are UNCHANGED — exam progress is keyed by question id, so
       nothing a learner has already opened is lost by the move.
     • `lostQuest` now points at gt5, "Reductions: numbers", which is
       the round that drills exactly this: quadrant → reduction
       formula → sign → does the ratio stay or change.
   The reteach button still only appears once gt5 is OPEN for that
   learner — js/exam-play.js's lostQuestLink() checks openQuests before
   it checks anything else — so on live it stays invisible until the
   teacher opens the round.

   REGISTERED (2026-08-22): js/exam/index.js lists it under REGISTRY
   .gtrig, js/config.js EXAM_CHAPTERS includes "gtrig", and
   verify-exam.html's scope wall for gtrig carries this file's topic
   ("reduction-and-ratios") — it is the chapter's own content now, not
   a widening of 2D trig's.
   ============================================================ */

const PAPER = "sept-t2";

const t2q1 = {
  id: "trig.rr.t2q1",
  chapter: "gtrig",
  topic: "reduction-and-ratios",
  archetype: "no-calculator-trig-block-cofunction-ratio-reduction",
  paper: PAPER,
  lostQuest: { chapter: "gtrig", quest: "gt5" },
  marks: 9,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator. Show all your working.</em><br>If sin 34° = t, write cos 56° in terms of t.", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik. Toon al jou bewerkings.</em><br>As sin 34° = t, skryf cos 56° in terme van t.",
      },
      hint: {
        en: "Add the two angles first. If they make 90°, the question is handing you a co-function — and a co-function does one job only: it converts between sin and cos. 90° − θ lives in A on the wheel, where everything is positive, so nothing here is going to need a minus.", af: "Tel eers die twee hoeke op. As hulle 90° maak, gee die vraag jou 'n ko-funksie, en 'n ko-funksie doen net een ding: dit skakel om tussen sin en cos. 90° − θ woon in A op die wiel, waar alles positief is, dus gaan niks hier 'n minus nodig hê nie.",
      },
      memo: [
        { type: "step", text: { en: "34° and 56° add up to 90°, so this is a co-function:", af: "34° en 56° tel op tot 90°, dus is dit 'n ko-funksie:" } },
        { type: "answer", text: { en: "cos 56° = cos(90° − 34°) = sin 34° = t", af: "cos 56° = cos(90° − 34°) = sin 34° = t" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: cos(90° − θ) = sin θ &nbsp;and&nbsp; sin(90° − θ) = cos θ. Whenever two angles in a question add to 90°, that is the whole clue.", af: "ONTHOU: cos(90° − θ) = sin θ &nbsp;en&nbsp; sin(90° − θ) = cos θ. Wanneer twee hoeke in 'n vraag tot 90° optel, is dit die hele leidraad.",
        } },
      ],
      esplain: {
        en: "Draw one right-angled triangle and label it twice — once from the angle at the bottom, once from the angle at the top. The side that is <i>across from</i> the bottom angle is the side <i>next to</i> the top one, and the hypotenuse never moves. Because those two acute angles always add to 90°, the sine of one is the cosine of the other, every time. That is all a co-function is: it converts between sin and cos. And it is not a separate rule sitting off to one side — co-functions live inside the All Strippers Take Cash wheel. 90° − θ is an A angle, everything positive, so no minus comes along for the ride and cos 56° is simply sin 34°, which is t. The one to watch is its neighbour: 90° + θ has crossed over into S, where only sine survives. Cosine is not sine, so it picks up the minus, and cos(90° + θ) = −sin θ. One plus sign is the whole difference between them — which is why your opening move on a question shaped like this is always the same: add the two angles and see what they make.", af: "Teken een reghoekige driehoek en benoem dit twee keer: een keer vanaf die hoek onder, een keer vanaf die hoek bo. Die sy <i>teenoor</i> die onderste hoek is die sy <i>langs</i> die boonste een, en die skuinssy bly altyd op sy plek. Omdat daardie twee skerp hoeke altyd tot 90° optel, is die sin van die een die cos van die ander, elke keer. Dit is al wat 'n ko-funksie is: dit skakel om tussen sin en cos. En dit is nie 'n aparte reël wat eenkant staan nie: ko-funksies woon binne die All Strippers Take Cash-wiel. 90° − θ is 'n A-hoek, alles positief, dus kom geen minus saam nie en cos 56° is eenvoudig sin 34°, wat t is. Die een om dop te hou, is sy buurman: 90° + θ het oorgesteek na S, waar net sin oorleef. cos is nie sin nie, dus kry dit die minus, en cos(90° + θ) = −sin θ. Een plusteken is die hele verskil tussen hulle, en dit is hoekom jou eerste skuif op 'n vraag met hierdie vorm altyd dieselfde is: tel die twee hoeke op en kyk wat hulle maak.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>It is given that 5 sin β + 3 = 0 &nbsp;and&nbsp; tan β &gt; 0.<br>With the aid of a sketch, determine the value of 5 cos β + tan β.", af: "<em>Sonder 'n sakrekenaar.</em><br>Dit is gegee dat 5 sin β + 3 = 0 &nbsp;en&nbsp; tan β &gt; 0.<br>Bepaal, met behulp van 'n skets, die waarde van 5 cos β + tan β.",
      },
      hint: {
        en: "Step ① never changes: get the function on its own. Then draw your cross and tick it twice — once for the quadrants where sin is negative, once for the quadrants where tan is positive. The quadrant that collects two ticks is the one you sketch in, and (pyth) finds the side that is missing. Let the quadrant hand you the signs.", af: "Stap ① verander nooit: kry die funksie alleen. Teken dan jou kruis en merk dit twee keer: een keer vir die kwadrante waar sin negatief is, een keer vir die kwadrante waar tan positief is. Die kwadrant met twee regmerkies is waar jy skets, en (pyth) kry die sy wat ontbreek. Laat die kwadrant vir jou die tekens gee.",
      },
      memo: [
        { type: "step", text: { en: "First get the ratio on its own: &nbsp;5 sin β = −3 &nbsp;⟹&nbsp; sin β = −3/5", af: "Kry eers die verhouding alleen: &nbsp;5 sin β = −3 &nbsp;⟹&nbsp; sin β = −3/5" } },
        { type: "step", text: { en: "sin β is <b>negative</b> and tan β is <b>positive</b> — that can only be the <b>third quadrant</b>. Sketch it there: the point (−4 ; −3), with y = −3 and r = 5.", af: "sin β is <b>negatief</b> en tan β is <b>positief</b>: dit kan net die <b>derde kwadrant</b> wees. Skets dit daar: die punt (−4 ; −3), met y = −3 en r = 5." }, ticks: ["s/f"] },
        { type: "step", text: { en: "Pythagoras gives the third side, and in the third quadrant x is <b>negative</b>: &nbsp;x² = 5² − 3² = 16 &nbsp;⟹&nbsp; x = −4", af: "Pythagoras gee die derde sy, en in die derde kwadrant is x <b>negatief</b>: &nbsp;x² = 5² − 3² = 16 &nbsp;⟹&nbsp; x = −4" }, ticks: ["ca"] },
        { type: "step", text: { en: "cos β = x/r = −4/5 &nbsp;&nbsp;·&nbsp;&nbsp; tan β = y/x = (−3)/(−4) = 3/4", af: "cos β = x/r = −4/5 &nbsp;&nbsp;·&nbsp;&nbsp; tan β = y/x = (−3)/(−4) = 3/4" }, ticks: ["ca"] },
        { type: "answer", text: { en: "5 cos β + tan β = 5(−4/5) + 3/4 = −4 + 3/4 = −13/4 = −3,25", af: "5 cos β + tan β = 5(−4/5) + 3/4 = −4 + 3/4 = −13/4 = −3,25" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the sign of x. In the third quadrant <i>both</i> x and y are negative. A learner who writes x = 4 gets cos β = 4/5 and loses the last two marks in one step — and notice that tan β would then come out negative, which contradicts what the question told you. That contradiction is your own check.", af: "PASOP: die teken van x. In die derde kwadrant is <i>albei</i> x en y negatief. 'n Leerder wat x = 4 skryf, kry cos β = 4/5 en verloor die laaste twee punte in een stap. Let ook op dat tan β dan negatief sou uitkom, wat weerspreek wat die vraag vir jou gesê het. Daardie teenstrydigheid is jou eie toets.",
        } },
      ],
      esplain: {
        en: "This is a special sum, and it runs on the five steps: isolate the function, determine the quadrant, sketch the diagram, calculate the unknown side, substitute. Step ① is quick — 5 sin β = −3, so sin β = −3/5. Step ② is where the whole teaching sits. Draw the little cross and tick it twice, in two colours if that helps you see it: sin is negative in III and IV, tan is positive in I and III. The quadrant that got two ticks wins, and that is III. All Strippers Take Cash says the same thing round the bow tie — A is everything, S is sine only, T is tan only, C is cos only — so “sin negative and tan positive” can land on T and nowhere else. That double tick is the reason the step exists: sin β = −3/5 on its own fits two quadrants, and the two would hand you opposite answers. After that the sketch does the work. You are given y = −3 and r = 5, (pyth) gives you 4 for the side that is left, and the quadrant tells you to write it as −4, because in the third quadrant both x and y are negative. r never takes a minus — it is the radius, and a radius is a length. From there every ratio is two of those three numbers divided, and the calculator stays in your bag.", af: "Dit is 'n spesiale som, en dit werk met die vyf stappe: isoleer die funksie, bepaal die kwadrant, skets die diagram, bereken die onbekende sy, vervang. Stap ① is vinnig: 5 sin β = −3, dus sin β = −3/5. By stap ② sit al die onderrig. Teken die klein kruis en merk dit twee keer, in twee kleure as dit jou help om dit te sien: sin is negatief in III en IV, tan is positief in I en III. Die kwadrant met twee regmerkies wen, en dit is III. All Strippers Take Cash sê dieselfde ding om die strikdas (A is alles, S is net sin, T is net tan, C is net cos), dus kan “sin negatief en tan positief” net op T land en nêrens anders nie. Daardie dubbele regmerkie is die rede waarom die stap bestaan: sin β = −3/5 alleen pas in twee kwadrante, en daardie twee sal jou teenoorgestelde antwoorde gee. Daarna doen die skets die werk. Jy kry y = −3 en r = 5, (pyth) gee jou 4 vir die sy wat oorbly, en die kwadrant sê jy moet dit as −4 skryf, want in die derde kwadrant is albei x en y negatief. r kry nooit 'n minus nie: dit is die radius, en 'n radius is 'n lengte. Van daar af is elke verhouding twee van daardie drie getalle gedeel, en die sakrekenaar bly in jou tas.",
      },
    },
    {
      id: "c",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Simplify: &nbsp;<span class=\"sfrac\"><span class=\"sf-n\">cos(180° − x) · sin(90° + x)</span><span class=\"sf-d\">cos²(90° + x)</span></span>", af: "<em>Sonder 'n sakrekenaar.</em><br>Vereenvoudig: &nbsp;<span class=\"sfrac\"><span class=\"sf-n\">cos(180° − x) · sin(90° + x)</span><span class=\"sf-d\">cos²(90° + x)</span></span>",
      },
      hint: {
        en: "Three reductions, three separate lines — and write the split above each angle before you write anything else. For each one, the three steps in order: which quadrant, which reduction formula, then + or −. And anything you are about to square goes into block brackets first.", af: "Drie reduksies, drie aparte reëls, en skryf die opsplitsing bo elke hoek voordat jy enigiets anders skryf. Vir elkeen, die drie stappe in volgorde: watter kwadrant, watter reduksieformule, dan + of −. En enigiets wat jy gaan kwadreer, gaan eers in blokhakies.",
      },
      memo: [
        { type: "step", text: { en: "Take the three reductions one at a time.", af: "Doen die drie reduksies een op 'n slag." } },
        { type: "step", text: { en: "cos(180° − x) = −cos x", af: "cos(180° − x) = −cos x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "sin(90° + x) = cos x", af: "sin(90° + x) = cos x" }, ticks: ["ca"] },
        { type: "step", text: { en: "cos(90° + x) = −sin x &nbsp;⟹&nbsp; cos²(90° + x) = (−sin x)² = sin²x", af: "cos(90° + x) = −sin x &nbsp;⟹&nbsp; cos²(90° + x) = (−sin x)² = sin²x" }, ticks: ["ca"] },
        { type: "step", text: { en: "Now put them back:", af: "Sit hulle nou terug:" } },
        { type: "answer", text: { en: "(−cos x)(cos x) / sin²x = −cos²x / sin²x &nbsp;&nbsp;<b>OR</b>&nbsp;&nbsp; −1/tan²x", af: "(−cos x)(cos x) / sin²x = −cos²x / sin²x &nbsp;&nbsp;<b>OF</b>&nbsp;&nbsp; −1/tan²x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: squaring kills the minus in the denominator — (−sin x)² = +sin²x, never −sin²x. That one sign is the difference between −cos²x/sin²x and +cos²x/sin²x.", af: "PASOP: die kwadraat maak die minus in die noemer dood: (−sin x)² = +sin²x, nooit −sin²x nie. Daardie een teken is die verskil tussen −cos²x/sin²x en +cos²x/sin²x.",
        } },
      ],
      esplain: {
        en: "A reduction is nothing more sinister than rewriting an angle as an acute angle, and the three steps handle every single one: quadrant, reduction formula, sign. Only 90° ± x converts between sin and cos — that is exactly what makes it a co-function. 180° ± x and 360° ± x leave the ratio alone and do nothing but decide a sign, which is why cos(180° − x) is still a cosine and has only turned negative. The middle one, sin(90° + x), converts to cos, and 90° + x sits in S where sine is positive, so it comes out clean as cos x. The third one is the trap: cos(90° + x) is in S as well, but cosine is not sine, so it picks up the minus — cos(90° + x) = −sin x. Then comes the piece that quietly saves the mark. The question squares that one, so put it in block brackets first, [−sin x]², and reduce inside the brackets before you square. The minus dies in there and sin²x comes out positive. Skip the brackets and your answer is exactly the right size with the wrong sign.", af: "'n Reduksie is niks erger as om 'n hoek as 'n skerp hoek te herskryf nie, en die drie stappe hanteer elkeen: kwadrant, reduksieformule, teken. Net 90° ± x skakel om tussen sin en cos: dit is presies wat dit 'n ko-funksie maak. 180° ± x en 360° ± x laat die verhouding net so en besluit net 'n teken, en dit is hoekom cos(180° − x) steeds 'n cos is en net negatief geword het. Die middelste een, sin(90° + x), skakel om na cos, en 90° + x lê in S waar sin positief is, dus kom dit skoon uit as cos x. Die derde een is die slaggat: cos(90° + x) is ook in S, maar cos is nie sin nie, dus kry dit die minus: cos(90° + x) = −sin x. Dan kom die stukkie wat stilletjies die punt red. Die vraag kwadreer daardie een, dus sit dit eers in blokhakies, [−sin x]², en reduseer binne die hakies voordat jy kwadreer. Die minus sterf daarbinne en sin²x kom positief uit. Slaan die hakies oor en jou antwoord is presies die regte grootte met die verkeerde teken.",
      },
    },
  ],
};

export const trigReductionAndRatiosQuestions = [t2q1];
