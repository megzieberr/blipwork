/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the NEW
   tile "simultaneous" ("Simultaneous equations").
   (EXAM-BUILD-DAY.md, 2026-08-23, the eqn tile map; wave 2, session C2.)
   ------------------------------------------------------------
   SIX cards, born from nothing. Every surveyed Grade 11 IEB Paper 1
   carries a "solve simultaneously" item worth 5–6 marks
   (SURVEY-Nov-P1.md Q3 blocks; SURVEY-June.md Q1g), and her own 2025
   Test 1 Q3 opens with one. The chapter had none.

   HER METHOD IS METHODS-algebra.md B6, and it is narrow on purpose:
     1. make ONE variable the subject of the LINEAR equation
     2. substitute it into the other equation
     3. solve the quadratic that appears
     4. put each x back into the LINEAR equation to get its y — she
        re-writes the linear equation fresh each time and boxes the
        substituted bracket
     5. answer as coordinate PAIRS with a semicolon: (−1 ; −2)
   ⚖️ "Never do: solve by elimination, or by matrices. Her notes use
   substitution only, and they always start from the linear equation."
   Her protip rides along too (`T2122 p05`): the answers always come
   out rational — a whole number or a fraction — so every pair below
   is rational, deliberately.

   WHAT THE SIX COVER, and why these six:
     q1  the plain shape, with the "make y the subject" step given its
         own mark first (line + parabola)
     q2  the PRODUCT form: x + y = 7 and xy = 12 — two pairs that are
         each other's mirror image, which is where "pair every x with
         ITS y" earns its trap card
     q3  a CIRCLE and a line: x² + y² = 20 and y = x + 2
     q4  the same idea dressed as a functions sentence — "where do f
         and g cut?" — the only card here with a sketch
     q5  the quadratic in TWO variables: x² + 2xy − 3y² = 0 with
         x + y = 8 (SURVEY-Nov-P1 archetype, fresh numbers)
     q6  one carrying FRACTIONS, cleared with her LCD move first

   THE SKETCH ON q4: the question side names A and B as bare letters,
   the reveal writes their coordinates onto the picture — the
   "reveal draws what it found" rule (js/exam/_schema.js), and the
   bare-figure rule for a part whose job IS finding those coordinates.
   The other five cards carry no figure; nothing in them would have one
   on a real paper.

   lostQuest is eq6 throughout — "The formula & simultaneous", whose own
   blurb ends "…and the substitution method". Every number is fresh.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";

const sf = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;

/* ---------------------------------------------------------------
   q1 — THE PLAIN SHAPE, WITH STEP 1 GIVEN ITS OWN MARK.
   2x − y = −2  and  y = x² + 5x − 2
   → 2x + 2 = x² + 5x − 2 → x² + 3x − 4 = 0 → (−4 ; −6) and (1 ; 4)
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.sim.q1",
  chapter: CH,
  topic: "simultaneous",
  archetype: "linear-plus-parabola-by-substitution",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq6" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: "Make y the subject of the equation &nbsp;2x − y = −2.", af: "Maak y die onderwerp van die vergelyking &nbsp;2x − y = −2.",
      },
      hint: {
        en: "Get the y alone on one side. The quickest way is to add y to both sides and take the −2 across, so you never have to divide by a negative.", af: "Kry die y alleen aan een kant. Die vinnigste manier is om y by albei kante te tel en die −2 oor te neem, sodat jy nooit deur 'n negatief hoef te deel nie.",
      },
      memo: [
        { type: "step", text: { en: "Add y to both sides and take the −2 across:", af: "Tel y by albei kante en neem die −2 oor:" } },
        { type: "answer", text: { en: "y = 2x + 2", af: "y = 2x + 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT for the sign. Moving &nbsp;−y&nbsp; across makes it &nbsp;+y, and moving the &nbsp;−2&nbsp; across makes it &nbsp;+2. Writing &nbsp;y = 2x − 2&nbsp; here quietly wrecks everything that follows.", af: "PASOP vir die teken. As jy &nbsp;−y&nbsp; oorneem, word dit &nbsp;+y, en as jy die &nbsp;−2&nbsp; oorneem, word dit &nbsp;+2. As jy hier &nbsp;y = 2x − 2&nbsp; skryf, breek dit stilletjies alles wat volg.",
        } },
      ],
      esplain: {
        en: "This little step is step one of her whole simultaneous method, which is why it gets its own mark. Making a variable the subject just means rearranging until that letter stands alone on one side with everything else on the other. Here the y is negative, so rather than dividing the whole equation by negative one it is safer to move the y across to the right, where it becomes positive, and move the negative two across to the left, where it becomes positive too. Read it back afterwards to check: two x plus two, minus y, would give you back negative two. It does, so the rearrangement is right.", af: "Hierdie klein stappie is stap een van haar hele metode vir gelyktydige vergelykings, en daarom kry dit sy eie punt. Om 'n veranderlike die onderwerp te maak, beteken net om te herrangskik totdat daardie letter alleen aan een kant staan, met alles anders aan die ander kant. Hier is die y negatief. Moet dus nie die hele vergelyking deur negatief een deel nie; dit is veiliger om die y na regs oor te neem, waar dit positief word, en die negatief twee na links, waar dit ook positief word. Lees dit agterna terug om te toets: twee x plus twee, minus y, sal jou weer negatief twee gee. Dit klop, dus is die herrangskikking reg.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 2,
      prompt: {
        en: "Hence solve for x and y simultaneously:<br>&nbsp;&nbsp;2x − y = −2 &nbsp;&nbsp;and&nbsp;&nbsp; y = x² + 5x − 2", af: "Los vervolgens gelyktydig op vir x en y:<br>&nbsp;&nbsp;2x − y = −2 &nbsp;&nbsp;en&nbsp;&nbsp; y = x² + 5x − 2",
      },
      hint: {
        en: "You now have y written two different ways. Put them equal to each other, solve the quadratic that appears, then take each x back to the LINEAR equation for its y.", af: "Jy het nou y op twee verskillende maniere geskryf. Stel hulle gelyk aan mekaar, los die kwadratiese vergelyking op wat verskyn, en neem dan elke x terug na die LINEÊRE vergelyking vir sy y.",
      },
      memo: [
        { type: "step", text: { en: "From (a), &nbsp;y = 2x + 2. Substitute that into the second equation:", af: "Uit (a), &nbsp;y = 2x + 2. Vervang dit in die tweede vergelyking:" } },
        { type: "step", text: { en: "2x + 2 = x² + 5x − 2", af: "2x + 2 = x² + 5x − 2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "0 = x² + 3x − 4 = (x + 4)(x − 1) &nbsp;&nbsp;∴&nbsp; x = −4 &nbsp;or&nbsp; x = 1", af: "0 = x² + 3x − 4 = (x + 4)(x − 1) &nbsp;&nbsp;∴&nbsp; x = −4 &nbsp;of&nbsp; x = 1" }, ticks: ["ca"] },
        { type: "step", text: { en: "Now put each x back into the LINEAR equation, one at a time:", af: "Sit nou elke x terug in die LINEÊRE vergelyking, een op 'n slag:" } },
        { type: "answer", text: { en: "x = −4: &nbsp;y = 2(−4) + 2 = −6 &nbsp;&nbsp;∴&nbsp; (−4 ; −6)", af: "x = −4: &nbsp;y = 2(−4) + 2 = −6 &nbsp;&nbsp;∴&nbsp; (−4 ; −6)" }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 1: &nbsp;y = 2(1) + 2 = 4 &nbsp;&nbsp;∴&nbsp; (1 ; 4)", af: "x = 1: &nbsp;y = 2(1) + 2 = 4 &nbsp;&nbsp;∴&nbsp; (1 ; 4)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: pair every x with ITS y. The answers are &nbsp;(−4 ; −6)&nbsp; and &nbsp;(1 ; 4)&nbsp; — not a list of four loose numbers, and never &nbsp;(−4 ; 4). Substitute back into the LINEAR equation, not the quadratic: it is easier and there is no chance of picking up an extra answer.", af: "PASOP: koppel elke x aan SY y. Die antwoorde is &nbsp;(−4 ; −6)&nbsp; en &nbsp;(1 ; 4), &nbsp;nie 'n lys van vier los getalle nie, en nooit &nbsp;(−4 ; 4) nie. Vervang terug in die LINEÊRE vergelyking, nie die kwadratiese een nie: dit is makliker en daar is geen kans dat jy 'n ekstra antwoord optel nie.",
        } },
      ],
      esplain: {
        en: "Two equations, two unknowns, and one of the equations is straight. That straight one is the door in: rearrange it so y stands alone, and now you have a description of y you can carry into the other equation. Once you do, the y disappears and you are left with an ordinary quadratic in x, which factorises to give two x-values. Each of those is half an answer. To finish it you take each x back and work out the y that goes with it, and the safest place to do that is the linear equation, because it is short and it cannot produce a second y by accident. Write the two answers as coordinate pairs with a semicolon between the numbers, since the comma is already the decimal separator.", af: "Twee vergelykings, twee onbekendes, en een van die vergelykings is reguit. Daardie reguit een is die deur in: herrangskik dit sodat y alleen staan, en nou het jy 'n beskrywing van y wat jy na die ander vergelyking kan dra. Sodra jy dit doen, verdwyn die y en bly 'n gewone kwadratiese vergelyking in x oor, wat faktoriseer en twee x-waardes gee. Elkeen daarvan is 'n halwe antwoord. Om klaar te maak, neem jy elke x terug en werk die y uit wat daarby hoort, en die veiligste plek om dit te doen, is die lineêre vergelyking, want dit is kort en dit kan nie per ongeluk 'n tweede y gee nie. Skryf die twee antwoorde as koördinaatpare met 'n kommapunt tussen die getalle, want die komma is reeds die desimale skeidingsteken.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — THE PRODUCT FORM.
   x + y = 7 and xy = 12 → x(7 − x) = 12 → x² − 7x + 12 = 0
   → (3 ; 4) and (4 ; 3)
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.sim.q2",
  chapter: CH,
  topic: "simultaneous",
  archetype: "sum-and-product-simultaneous-with-mirror-image-pairs",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq6" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 2,
      prompt: {
        en: "Solve for x and y simultaneously:<br>&nbsp;&nbsp;x + y = 7 &nbsp;&nbsp;and&nbsp;&nbsp; xy = 12", af: "Los gelyktydig op vir x en y:<br>&nbsp;&nbsp;x + y = 7 &nbsp;&nbsp;en&nbsp;&nbsp; xy = 12",
      },
      hint: {
        en: "Only one of these is a straight-line equation — start there. Make one letter the subject of it, then carry that expression into the other equation.", af: "Net een hiervan is die vergelyking van 'n reguit lyn: begin daar. Maak een letter die onderwerp daarvan, en dra dan daardie uitdrukking oor na die ander vergelyking.",
      },
      memo: [
        { type: "step", text: { en: "Start from the LINEAR equation and make y the subject:", af: "Begin by die LINEÊRE vergelyking en maak y die onderwerp:" } },
        { type: "step", text: { en: "y = 7 − x", af: "y = 7 − x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "substitute into &nbsp;xy = 12: &nbsp;&nbsp;x(7 − x) = 12 &nbsp;&nbsp;⟹&nbsp;&nbsp; 7x − x² = 12", af: "vervang in &nbsp;xy = 12: &nbsp;&nbsp;x(7 − x) = 12 &nbsp;&nbsp;⟹&nbsp;&nbsp; 7x − x² = 12" }, ticks: ["ca"] },
        { type: "step", text: { en: "0 = x² − 7x + 12 = (x − 3)(x − 4) &nbsp;&nbsp;∴&nbsp; x = 3 &nbsp;or&nbsp; x = 4", af: "0 = x² − 7x + 12 = (x − 3)(x − 4) &nbsp;&nbsp;∴&nbsp; x = 3 &nbsp;of&nbsp; x = 4" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 3: &nbsp;y = 7 − 3 = 4 &nbsp;&nbsp;∴&nbsp; (3 ; 4)", af: "x = 3: &nbsp;y = 7 − 3 = 4 &nbsp;&nbsp;∴&nbsp; (3 ; 4)" }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 4: &nbsp;y = 7 − 4 = 3 &nbsp;&nbsp;∴&nbsp; (4 ; 3)", af: "x = 4: &nbsp;y = 7 − 4 = 3 &nbsp;&nbsp;∴&nbsp; (4 ; 3)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: pair every x with ITS y. Here the two answers are each other's mirror image, so it is very easy to write &nbsp;(3 ; 3)&nbsp; and &nbsp;(4 ; 4)&nbsp; without noticing. Test one: 3 × 3 is 9, not 12. Always substitute your pair back into BOTH original equations if you have a second to spare.", af: "PASOP: koppel elke x aan SY y. Hier is die twee antwoorde dieselfde twee getalle, net omgeruil, dus is dit baie maklik om &nbsp;(3 ; 3)&nbsp; en &nbsp;(4 ; 4)&nbsp; te skryf sonder om dit agter te kom. Toets een: 3 × 3 is 9, nie 12 nie. Vervang jou paar altyd terug in ALBEI oorspronklike vergelykings as jy 'n oomblik oor het.",
        } },
      ],
      esplain: {
        en: "Both equations here describe the same two numbers: they add up to seven and multiply to twelve. The method does not change just because the second equation is a product. Take the straight equation, make y the subject, and carry seven minus x into the other one. Multiplying out gives a quadratic, and once everything is on the side that keeps x squared positive it factorises easily. The two x-values are three and four, and each one carries its own y back from the linear equation. Notice what you end up with: the pair three and four, and the pair four and three. They really are two different answers, because x and y are different letters, and the marker wants both written as proper coordinate pairs.", af: "Albei vergelykings hier beskryf dieselfde twee getalle: hulle tel op tot sewe en hul produk is twaalf. Die metode verander nie net omdat die tweede vergelyking 'n produk is nie. Neem die lineêre vergelyking, maak y die onderwerp, en dra sewe minus x oor na die ander een. As jy uitvermenigvuldig, kry jy 'n kwadratiese vergelyking, en sodra alles aan die kant is wat x kwadraat positief hou, faktoriseer dit maklik. Die twee x-waardes is drie en vier, en elkeen bring sy eie y terug uit die lineêre vergelyking. Let op wat jy uiteindelik kry: die paar drie en vier, en die paar vier en drie. Dit is regtig twee verskillende antwoorde, want x en y is verskillende letters, en die nasiener wil albei as behoorlike koördinaatpare sien.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — A CIRCLE AND A LINE.
   x² + y² = 20 and y = x + 2 → 2x² + 4x − 16 = 0 → x² + 2x − 8 = 0
   → (−4 ; −2) and (2 ; 4)
   --------------------------------------------------------------- */
const q3 = {
  id: "eqn.sib.sim.q3",
  chapter: CH,
  topic: "simultaneous",
  archetype: "line-cuts-a-circle-solved-simultaneously",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq6" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 3,
      prompt: {
        en: "Solve for x and y simultaneously:<br>&nbsp;&nbsp;x² + y² = 20 &nbsp;&nbsp;and&nbsp;&nbsp; y = x + 2", af: "Los gelyktydig op vir x en y:<br>&nbsp;&nbsp;x² + y² = 20 &nbsp;&nbsp;en&nbsp;&nbsp; y = x + 2",
      },
      hint: {
        en: "The second equation already says what y is, so it can go straight into the first. Take care when you square the bracket — squaring a sum always leaves a middle term behind.", af: "Die tweede vergelyking sê reeds wat y is, dus kan dit reguit in die eerste ingaan. Wees versigtig as jy die hakie kwadreer: as jy 'n som kwadreer, bly daar altyd 'n middelterm oor.",
      },
      memo: [
        { type: "step", text: { en: "The linear equation is already y = something, so substitute it into the first:", af: "Die lineêre vergelyking is reeds y = iets, dus vervang dit in die eerste:" } },
        { type: "step", text: { en: "x² + (x + 2)² = 20", af: "x² + (x + 2)² = 20" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x² + x² + 4x + 4 = 20", af: "x² + x² + 4x + 4 = 20" }, ticks: ["ca"] },
        { type: "step", text: { en: "2x² + 4x − 16 = 0 &nbsp;&nbsp;⟹ ÷ 2 ⟹&nbsp;&nbsp; x² + 2x − 8 = 0", af: "2x² + 4x − 16 = 0 &nbsp;&nbsp;⟹ ÷ 2 ⟹&nbsp;&nbsp; x² + 2x − 8 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(x + 4)(x − 2) = 0 &nbsp;&nbsp;∴&nbsp; x = −4 &nbsp;or&nbsp; x = 2", af: "(x + 4)(x − 2) = 0 &nbsp;&nbsp;∴&nbsp; x = −4 &nbsp;of&nbsp; x = 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = −4: &nbsp;y = −4 + 2 = −2 &nbsp;&nbsp;∴&nbsp; (−4 ; −2)", af: "x = −4: &nbsp;y = −4 + 2 = −2 &nbsp;&nbsp;∴&nbsp; (−4 ; −2)" }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 2: &nbsp;y = 2 + 2 = 4 &nbsp;&nbsp;∴&nbsp; (2 ; 4)", af: "x = 2: &nbsp;y = 2 + 2 = 4 &nbsp;&nbsp;∴&nbsp; (2 ; 4)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: &nbsp;(x + 2)²&nbsp; is &nbsp;x² + 4x + 4, not &nbsp;x² + 4. The middle term is the whole reason this question has two sensible answers instead of a mess. Divide by 2 before factorising — it is legal because the right-hand side is zero, and it makes the trinomial much friendlier.", af: "PASOP: &nbsp;(x + 2)²&nbsp; is &nbsp;x² + 4x + 4, nie &nbsp;x² + 4 nie. Die middelterm is die hele rede waarom hierdie vraag twee sinvolle antwoorde het in plaas van 'n gemors. Deel deur 2 voor jy faktoriseer: dit mag, want die regterkant is nul, en dit maak die drieterm baie vriendeliker.",
        } },
      ],
      esplain: {
        en: "The first equation is a circle centred at the origin, the second is a straight line, and solving them together finds the places where the line crosses the circle. The method is the same one as always: the line is the simple equation, so its y goes into the circle equation. Squaring x plus two is where marks disappear, because it is a square of a sum and therefore has three terms. After collecting you get two x squared plus four x minus sixteen equals zero, and since the other side is zero you may divide the whole thing by two before factorising. Two x-values come out, and each one takes its y from the line. Two crossing points, written as coordinate pairs.", af: "Die eerste vergelyking is 'n sirkel met middelpunt by die oorsprong, die tweede is 'n reguit lyn, en as jy hulle saam oplos, vind jy die plekke waar die lyn die sirkel sny. Die metode is dieselfde as altyd: die lyn is die eenvoudige vergelyking, dus gaan sy y in die sirkelvergelyking in. Om x plus twee te kwadreer, is waar punte verdwyn, want dit is die kwadraat van 'n som en het dus drie terme. As jy terme versamel, kry jy twee x kwadraat plus vier x minus sestien is gelyk aan nul, en omdat die ander kant nul is, mag jy die hele ding deur twee deel voor jy faktoriseer. Twee x-waardes kom uit, en elkeen kry sy y uit die lyn. Twee snypunte, geskryf as koördinaatpare.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — DRESSED AS A FUNCTIONS SENTENCE, WITH THE SKETCH.
   f(x) = x² + x + 2, g(x) = 2x + 4 → x² − x − 2 = 0
   → A(−1 ; 2) and B(2 ; 8)
   The question side names A and B as bare letters; the reveal writes
   the coordinates on. Both crossings sit well clear of both axes, so
   a coordinate label has clean space around it at 375 px.
   --------------------------------------------------------------- */
const Q4_F = { kind: "parabola", a: 1, b: 1, c: 2, tone: "a", label: "f", labelAt: -3 };
const Q4_G = { kind: "line", a: 2, q: 4, tone: "b", label: "g", labelAt: 3.4 };
const Q4_A_BARE = { x: -1, y: 2, on: [0, 1], label: "A", place: "left" };
const Q4_B_BARE = { x: 2, y: 8, on: [0, 1], label: "B", place: "aboveLeft" };
const Q4_A = { x: -1, y: 2, on: [0, 1], label: "A(−1 ; 2)", place: "left" };
const Q4_B = { x: 2, y: 8, on: [0, 1], label: "B(2 ; 8)", place: "aboveLeft" };
const Q4_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -5, xmax: 5, ymin: -3, ymax: 13 },
    curves: [Q4_F, Q4_G],
  },
  parts: {
    a: {
      question: { points: [Q4_A_BARE, Q4_B_BARE] },
      reveal: { points: [Q4_A, Q4_B] },
    },
  },
};

const q4 = {
  id: "eqn.sib.sim.q4",
  chapter: CH,
  topic: "simultaneous",
  archetype: "points-of-intersection-of-a-line-and-a-parabola",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "eq6" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 2,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² + x + 2, &nbsp;and the straight line g, defined by &nbsp;g(x) = 2x + 4. &nbsp;The two graphs cut each other at A and B.<br><br>Determine the coordinates of A and B.", af: "Die skets toon die parabool f, gedefinieer deur &nbsp;f(x) = x² + x + 2, &nbsp;en die reguit lyn g, gedefinieer deur &nbsp;g(x) = 2x + 4. &nbsp;Die twee grafieke sny mekaar by A en B.<br><br>Bepaal die koördinate van A en B.",
      },
      hint: {
        en: "“Where do they cut?” is a simultaneous-equations question wearing different clothes. At a crossing point the two graphs have the same height for the same x — so put the two expressions equal to each other.", af: "“Waar sny hulle?” is 'n vraag oor gelyktydige vergelykings in ander klere. By 'n snypunt het die twee grafieke dieselfde hoogte vir dieselfde x, dus stel die twee uitdrukkings gelyk aan mekaar.",
      },
      memo: [
        { type: "step", text: { en: "At a crossing point both graphs give the same y for the same x, so put &nbsp;f(x) = g(x):", af: "By 'n snypunt gee albei grafieke dieselfde y vir dieselfde x, dus stel &nbsp;f(x) = g(x):" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x² + x + 2 = 2x + 4", af: "x² + x + 2 = 2x + 4" }, ticks: ["ca"] },
        { type: "step", text: { en: "x² − x − 2 = 0 &nbsp;&nbsp;⟹&nbsp;&nbsp; (x − 2)(x + 1) = 0 &nbsp;&nbsp;∴&nbsp; x = 2 &nbsp;or&nbsp; x = −1", af: "x² − x − 2 = 0 &nbsp;&nbsp;⟹&nbsp;&nbsp; (x − 2)(x + 1) = 0 &nbsp;&nbsp;∴&nbsp; x = 2 &nbsp;of&nbsp; x = −1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = −1: &nbsp;y = 2(−1) + 4 = 2 &nbsp;&nbsp;∴&nbsp; A(−1 ; 2)", af: "x = −1: &nbsp;y = 2(−1) + 4 = 2 &nbsp;&nbsp;∴&nbsp; A(−1 ; 2)" }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 2: &nbsp;y = 2(2) + 4 = 8 &nbsp;&nbsp;∴&nbsp; B(2 ; 8)", af: "x = 2: &nbsp;y = 2(2) + 4 = 8 &nbsp;&nbsp;∴&nbsp; B(2 ; 8)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the x-values on their own are not the answer — the question asks for COORDINATES, so each x needs its y beside it in a bracket. Use the straight line to find each y; it is one multiplication and an add, where the parabola is three steps and a chance to slip.", af: "PASOP: die x-waardes alleen is nie die antwoord nie: die vraag vra KOÖRDINATE, dus het elke x sy y langs hom in 'n hakie nodig. Gebruik die reguit lyn om elke y te kry; dit is een vermenigvuldiging en een optelling, terwyl die parabool drie stappe en 'n kans om te glip is.",
        } },
      ],
      esplain: {
        en: "A point that lies on two graphs at once belongs to both of their equations, so it has the same x and the same y in each. Saying that out loud is exactly what f of x equals g of x means, and from there it is ordinary algebra. Bring everything to one side so the quadratic reads equals zero, factorise, and read off the two x-values. Each one is only half of a point. To finish, drop each x into the simpler of the two equations — the straight line — and you get the height that goes with it. Look back at the sketch afterwards: the left crossing sits lower and the right one higher, which is a quick sanity check that you have paired the numbers up the right way round.", af: "'n Punt wat tegelyk op twee grafieke lê, behoort aan albei hul vergelykings, dus het dit dieselfde x en dieselfde y in elkeen. As jy dit hardop sê, is dit presies wat f van x is gelyk aan g van x beteken, en van daar af is dit gewone algebra. Bring alles na een kant sodat die kwadratiese vergelyking gelyk aan nul is, faktoriseer, en lees die twee x-waardes af. Elkeen is net die helfte van 'n punt. Om klaar te maak, sit elke x in die eenvoudigste van die twee vergelykings (die reguit lyn), en jy kry die hoogte wat daarby hoort. Kyk agterna terug na die skets: die linkerste snypunt lê laer en die regterste hoër, wat 'n vinnige toets is dat jy die getalle reg gekoppel het.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — THE QUADRATIC IN TWO VARIABLES (SURVEY-Nov-P1 archetype).
   x + y = 8 and x² + 2xy − 3y² = 0 → −4x² + 64x − 192 = 0
   → x² − 16x + 48 = 0 → (4 ; 4) and (12 ; −4)
   --------------------------------------------------------------- */
const q5 = {
  id: "eqn.sib.sim.q5",
  chapter: CH,
  topic: "simultaneous",
  archetype: "linear-plus-a-quadratic-in-two-variables",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq6" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 3,
      prompt: {
        en: "Solve for x and y simultaneously:<br>&nbsp;&nbsp;x + y = 8 &nbsp;&nbsp;and&nbsp;&nbsp; x² + 2xy − 3y² = 0", af: "Los gelyktydig op vir x en y:<br>&nbsp;&nbsp;x + y = 8 &nbsp;&nbsp;en&nbsp;&nbsp; x² + 2xy − 3y² = 0",
      },
      hint: {
        en: "Nothing changes: the linear equation is still the door in. Make y the subject and substitute — and then take your time expanding, because there are three terms to get through and one of them is a bracket squared.", af: "Niks verander nie: die lineêre vergelyking is steeds die deur in. Maak y die onderwerp en vervang, en neem dan jou tyd met die uitbreiding, want daar is drie terme om deur te werk en een daarvan is 'n gekwadreerde hakie.",
      },
      memo: [
        { type: "step", text: { en: "From the LINEAR equation: &nbsp;&nbsp;y = 8 − x", af: "Uit die LINEÊRE vergelyking: &nbsp;&nbsp;y = 8 − x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "substitute into the second equation: &nbsp;&nbsp;x² + 2x(8 − x) − 3(8 − x)² = 0", af: "vervang in die tweede vergelyking: &nbsp;&nbsp;x² + 2x(8 − x) − 3(8 − x)² = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "x² + 16x − 2x² − 3(64 − 16x + x²) = 0", af: "x² + 16x − 2x² − 3(64 − 16x + x²) = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "−4x² + 64x − 192 = 0 &nbsp;&nbsp;⟹ ÷ (−4) ⟹&nbsp;&nbsp; x² − 16x + 48 = 0", af: "−4x² + 64x − 192 = 0 &nbsp;&nbsp;⟹ ÷ (−4) ⟹&nbsp;&nbsp; x² − 16x + 48 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(x − 4)(x − 12) = 0 &nbsp;&nbsp;∴&nbsp; x = 4 &nbsp;or&nbsp; x = 12", af: "(x − 4)(x − 12) = 0 &nbsp;&nbsp;∴&nbsp; x = 4 &nbsp;of&nbsp; x = 12" } },
        { type: "answer", text: { en: "x = 4: &nbsp;y = 8 − 4 = 4 &nbsp;&nbsp;∴&nbsp; (4 ; 4)", af: "x = 4: &nbsp;y = 8 − 4 = 4 &nbsp;&nbsp;∴&nbsp; (4 ; 4)" }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 12: &nbsp;y = 8 − 12 = −4 &nbsp;&nbsp;∴&nbsp; (12 ; −4)", af: "x = 12: &nbsp;y = 8 − 12 = −4 &nbsp;&nbsp;∴&nbsp; (12 ; −4)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the &nbsp;−3&nbsp; has to reach every term of &nbsp;(8 − x)². Expand the bracket FIRST, in its own set of brackets, and only then multiply the −3 in — &nbsp;−3(64 − 16x + x²) = −192 + 48x − 3x². Multiplying only the first term is the slip that turns this into an unfactorisable mess.", af: "PASOP: die &nbsp;−3&nbsp; moet elke term van &nbsp;(8 − x)² bereik. Brei die hakie EERS uit, in sy eie hakies, en vermenigvuldig dan eers die −3 in: &nbsp;−3(64 − 16x + x²) = −192 + 48x − 3x². As jy net die eerste term vermenigvuldig, word dit 'n gemors wat nie faktoriseer nie.",
        } },
      ],
      esplain: {
        en: "This one looks frightening because the second equation has x's and y's tangled together, but the method never changes. The straight equation is still simple, so make y the subject and carry eight minus x into the other one. Then expand slowly. There are three pieces: x squared stays as it is, two x times the bracket gives sixteen x minus two x squared, and the last piece needs the bracket squared before the negative three touches it. Collect everything and you get negative four x squared plus sixty four x minus one hundred and ninety two. Since the right side is zero you may divide the whole line by negative four, which makes the trinomial small and friendly. Two x-values, two y-values, two coordinate pairs.", af: "Hierdie een lyk skrikwekkend omdat x en y in die tweede vergelyking deurmekaar is, maar die metode verander nooit nie. Die lineêre vergelyking is steeds eenvoudig, dus maak y die onderwerp en dra agt minus x oor na die ander een. Brei dan stadig uit. Daar is drie stukke: x kwadraat bly soos dit is, twee x maal die hakie gee sestien x minus twee x kwadraat, en die laaste stuk het die hakie gekwadreer nodig voordat die negatief drie daaraan raak. Versamel alles en jy kry negatief vier x kwadraat plus vier en sestig x minus honderd twee en negentig. Omdat die regterkant nul is, mag jy die hele reël deur negatief vier deel, wat die drieterm klein en vriendelik maak. Twee x-waardes, twee y-waardes, twee koördinaatpare.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — WITH FRACTIONS (her LCD move first, B2 into B6).
   x/3 + y/2 = 4 and xy = 18 → 2x + 3y = 24 → y² − 8y + 12 = 0
   → (9 ; 2) and (3 ; 6)
   --------------------------------------------------------------- */
const q6 = {
  id: "eqn.sib.sim.q6",
  chapter: CH,
  topic: "simultaneous",
  archetype: "simultaneous-whose-linear-equation-carries-fractions",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq6" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 3,
      prompt: {
        en: "Solve for x and y simultaneously:<br>&nbsp;&nbsp;x/3 + y/2 = 4 &nbsp;&nbsp;and&nbsp;&nbsp; xy = 18", af: "Los gelyktydig op vir x en y:<br>&nbsp;&nbsp;x/3 + y/2 = 4 &nbsp;&nbsp;en&nbsp;&nbsp; xy = 18",
      },
      hint: {
        en: "Deal with the fractions before anything else — multiply every term of the first equation by the lowest common denominator. Only then make one letter the subject.", af: "Hanteer die breuke voor enigiets anders: vermenigvuldig elke term van die eerste vergelyking met die KGV. Maak eers dan een letter die onderwerp.",
      },
      memo: [
        { type: "step", text: { en: "Clear the fractions in the LINEAR equation first. LCD = 6, so multiply every term by 6:", af: "Raak eers ontslae van die breuke in die LINEÊRE vergelyking. KGV = 6, dus vermenigvuldig elke term met 6:" } },
        { type: "step", text: { en: "2x + 3y = 24", af: "2x + 3y = 24" }, ticks: ["s/f"] },
        { type: "step", text: { en: `make x the subject: &nbsp;&nbsp;x = ${sf("24 − 3y", "2")}`, af: `maak x die onderwerp: &nbsp;&nbsp;x = ${sf("24 − 3y", "2")}` }, ticks: ["ca"] },
        { type: "step", text: { en: `substitute into &nbsp;xy = 18: &nbsp;&nbsp;y × ${sf("24 − 3y", "2")} = 18 &nbsp;&nbsp;⟹&nbsp;&nbsp; y(24 − 3y) = 36`, af: `vervang in &nbsp;xy = 18: &nbsp;&nbsp;y × ${sf("24 − 3y", "2")} = 18 &nbsp;&nbsp;⟹&nbsp;&nbsp; y(24 − 3y) = 36` }, ticks: ["ca"] },
        { type: "step", text: { en: "24y − 3y² = 36 &nbsp;&nbsp;⟹&nbsp;&nbsp; 0 = 3y² − 24y + 36 &nbsp;&nbsp;⟹ ÷ 3 ⟹&nbsp;&nbsp; 0 = y² − 8y + 12 = (y − 2)(y − 6) &nbsp;&nbsp;∴&nbsp; y = 2 &nbsp;or&nbsp; y = 6", af: "24y − 3y² = 36 &nbsp;&nbsp;⟹&nbsp;&nbsp; 0 = 3y² − 24y + 36 &nbsp;&nbsp;⟹ ÷ 3 ⟹&nbsp;&nbsp; 0 = y² − 8y + 12 = (y − 2)(y − 6) &nbsp;&nbsp;∴&nbsp; y = 2 &nbsp;of&nbsp; y = 6" }, ticks: ["ca"] },
        { type: "answer", text: { en: "y = 2: &nbsp;2x + 3(2) = 24 &nbsp;⟹&nbsp; 2x = 18 &nbsp;&nbsp;∴&nbsp; (9 ; 2)", af: "y = 2: &nbsp;2x + 3(2) = 24 &nbsp;⟹&nbsp; 2x = 18 &nbsp;&nbsp;∴&nbsp; (9 ; 2)" }, ticks: ["a"] },
        { type: "answer", text: { en: "y = 6: &nbsp;2x + 3(6) = 24 &nbsp;⟹&nbsp; 2x = 6 &nbsp;&nbsp;∴&nbsp; (3 ; 6)", af: "y = 6: &nbsp;2x + 3(6) = 24 &nbsp;⟹&nbsp; 2x = 6 &nbsp;&nbsp;∴&nbsp; (3 ; 6)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: multiplying by the LCD has to reach EVERY term, including the plain 4 on the right — it becomes 24, not 4. Missing the term with no fraction under it is the classic wreck here, and everything after it is wrong even though the working looks tidy.", af: "PASOP: die vermenigvuldiging met die KGV moet ELKE term bereik, ook die gewone 4 aan die regterkant: dit word 24, nie 4 nie. Om die term sonder 'n breuk te mis, is die klassieke ongeluk hier, en alles daarna is verkeerd al lyk die bewerking netjies.",
        } },
      ],
      esplain: {
        en: "Fractions make a simultaneous system look much worse than it is, so get rid of them first. The two denominators are three and two, so the lowest common denominator is six, and multiplying every single term by six leaves a clean linear equation. The plain four on the right has an invisible denominator of one, so it becomes twenty four — forgetting that term is the usual mistake. After that it is her ordinary routine: make one letter the subject, substitute into the other equation, and solve the quadratic that appears. Here it came out in y rather than x, which is perfectly fine, so each y goes back into the tidied linear equation to collect its x. Two coordinate pairs, both rational, exactly as her protip promises.", af: "Breuke laat 'n stel gelyktydige vergelykings baie erger lyk as wat dit is, dus raak eers van hulle ontslae. Die twee noemers is drie en twee, dus is die KGV ses, en as jy elke enkele term met ses vermenigvuldig, bly 'n skoon lineêre vergelyking oor. Die gewone vier aan die regterkant het 'n onsigbare noemer van een, dus word dit vier en twintig: om daardie term te vergeet, is die gewone fout. Daarna is dit haar gewone roetine: maak een letter die onderwerp, vervang in die ander vergelyking, en los die kwadratiese vergelyking op wat verskyn. Hier het dit in y uitgekom eerder as in x, wat heeltemal reg is, dus gaan elke y terug in die netjiese lineêre vergelyking om sy x te kry. Twee koördinaatpare, albei rasionaal, presies soos haar wenk belowe.",
      },
    },
  ],
};

export const eqnSimultaneousSiblingQuestions = [q1, q2, q3, q4, q5, q6];
