/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill
   "intercepts-turning-point"
   (SESSION 2a of the four-session function-diagram build, 2026-08-22.)
   ------------------------------------------------------------
   Four new cards, taking this tile from two to six.

   SOURCE OF THE MATHS: GR11-FUNCTIONS-NOTES-DIGEST.md — her own Gr11
   notes. Her p4 (the two parabola forms, xTP = −b/2a, TP(p ; q)
   "opposite sign"), pp5–7 (the worked "characteristics" pages,
   including the one that shows a √ of a negative when there are no
   x-intercepts), pp29–32 (completing the square, including a ≠ 1) and
   pp15–17 (exponential x-intercepts — only when they exist). Types and
   methods hers; every number fresh.

   WHAT THE FOUR COVER, in the order the brief asks for:
     q1  standard-form route: factorise for the x-intercepts, then
         xTP = −b/2a and substitute back
     q2  a parabola with NO x-intercepts — the √ of a negative, worked
         out on the page so the learner SEES why it stops
     q3  completing the square with a ≠ 1 (the 3 comes out of the two
         x-terms only, and the correction leaves the bracket multiplied)
     q4  exponential intercepts: one graph that has an x-intercept and
         one that cannot, and the reason why

   NO-LEAK RULE. Every intercept and every turning point on these four
   cards is somebody's ANSWER, so every base figure here starts with no
   marked points at all; each fact appears on the reveal of the part
   that found it, and is then carried forward on the question side of
   the later parts, exactly the pattern js/exam/func-line-and-parabola.js
   uses for its turning point.

   ONE JUDGEMENT CALL, recorded for review: q2's figure shows a
   parabola floating clear of the x-axis, which is visibly "it has no
   x-intercepts". That is not a leak, because q2(b) does not ask WHETHER
   f has x-intercepts — the prompt states that it has none and asks the
   learner to SHOW it algebraically. Her own pp5–7 worked pages do the
   same thing: sketch first, then prove it with the formula.

   LEVELS: mostly 1–2, exactly one level 3 (q4(b) — the learner has to
   argue from "an exponential is always positive" rather than solve).
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — STANDARD-FORM ROUTE. f(x) = x² − 2x − 8 = (x − 4)(x + 2).
   x-intercepts (−2 ; 0) and (4 ; 0); y-intercept (0 ; −8);
   xTP = −(−2)/2 = 1, yTP = −9 ⟹ TP(1 ; −9).
   --------------------------------------------------------------- */
const Q1_F = { kind: "parabola", a: 1, b: -2, c: -8 };
const Q1_XA = { x: -2, y: 0, on: 0, label: "(−2 ; 0)" };
const Q1_XB = { x: 4, y: 0, on: 0, label: "(4 ; 0)" };
const Q1_YI = { x: 0, y: -8, on: 0, label: "(0 ; −8)" };
const Q1_TP = { x: 1, y: -9, on: 0, label: "TP(1 ; −9)", place: "below" };
const Q1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 6, ymin: -11, ymax: 8 },
    curves: [{ ...Q1_F, tone: "a", label: "f", labelAt: -2.8 }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q1_XA, Q1_XB, Q1_YI] } },
    b: { question: { points: [Q1_XA, Q1_XB, Q1_YI] }, reveal: { points: [Q1_XA, Q1_XB, Q1_YI, Q1_TP] } },
  },
};

const q1 = {
  id: "func.sib.itp.q1",
  chapter: CH,
  topic: "intercepts-turning-point",
  archetype: "standard-form-parabola-intercepts-then-turning-point",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 2x − 8.<br><br>Determine the coordinates of the x-intercepts and of the y-intercept of f.", af: "Die skets toon die parabool f, gedefinieer deur &nbsp;f(x) = x² − 2x − 8.<br><br>Bepaal die koördinate van die x-afsnitte en van die y-afsnit van f.",
      },
      hint: {
        en: "Two separate jobs. For the y-intercept ask what x is worth everywhere on the y-axis; for the x-intercepts ask what y is worth everywhere on the x-axis, then factorise what is left.", af: "Twee aparte take. Vir die y-afsnit, vra watter waarde x oral op die y-as het; vir die x-afsnitte, vra watter waarde y oral op die x-as het, en faktoriseer dan wat oorbly.",
      },
      memo: [
        { type: "step", text: { en: "y-intercept: every point on the y-axis has x = 0, so &nbsp;f(0) = −8 &nbsp;&nbsp;∴&nbsp; (0 ; −8)", af: "y-afsnit: elke punt op die y-as het x = 0, dus &nbsp;f(0) = −8 &nbsp;&nbsp;∴&nbsp; (0 ; −8)" }, ticks: ["a"] },
        { type: "step", text: { en: "x-intercepts: every point on the x-axis has y = 0, so solve &nbsp;x² − 2x − 8 = 0 &nbsp;⟹&nbsp; (x − 4)(x + 2) = 0", af: "x-afsnitte: elke punt op die x-as het y = 0, dus los op &nbsp;x² − 2x − 8 = 0 &nbsp;⟹&nbsp; (x − 4)(x + 2) = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x = 4 &nbsp;or&nbsp; x = −2 &nbsp;&nbsp;∴&nbsp; (4 ; 0) &nbsp;and&nbsp; (−2 ; 0)", af: "x = 4 &nbsp;of&nbsp; x = −2 &nbsp;&nbsp;∴&nbsp; (4 ; 0) &nbsp;en&nbsp; (−2 ; 0)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the question asked for COORDINATES. “x = 4 or x = −2” is only half the answer — write the points, with a semicolon: (4 ; 0) and (−2 ; 0).", af: "PASOP: die vraag vra KOÖRDINATE. “x = 4 of x = −2” is net half die antwoord. Skryf die punte, met 'n kommapunt: (4 ; 0) en (−2 ; 0).",
        } },
      ],
      esplain: {
        en: "Intercepts are not two formulas to memorise, they are one idea used twice: an intercept is where the graph is sitting on an axis, and each axis has one coordinate pinned to zero all the way along it. On the y-axis every point has x = 0, so you feed 0 in and read the answer straight off — for a standard-form parabola that is always just the c on the end, which is a handy shortcut. On the x-axis every point has y = 0, so you set the whole expression to zero and solve, which for a nice quadratic means factorising. The last little step is the one that costs marks: the question asked WHERE the graph crosses, and a place is a pair of numbers, so the solutions x = 4 and x = −2 have to be dressed up as points before you hand them in.", af: "Afsnitte is nie twee formules om uit te leer nie, dit is een idee wat twee keer gebruik word: 'n afsnit is waar die grafiek op 'n as sit, en elke as het een koördinaat wat oral langs hom op nul vasgepen is. Op die y-as het elke punt x = 0, dus sit jy 0 in en lees die antwoord reguit af; vir 'n parabool in standaardvorm is dit altyd net die c aan die einde, 'n handige kortpad. Op die x-as het elke punt y = 0, dus stel jy die hele uitdrukking gelyk aan nul en los op, wat vir 'n mooi kwadratiese uitdrukking faktorisering beteken. Die laaste klein stappie is die een wat punte kos: die vraag vra WAAR die grafiek sny, en 'n plek is 'n paar getalle, dus moet die oplossings x = 4 en x = −2 as punte aangetrek word voordat jy dit inhandig.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the coordinates of the turning point of f.", af: "Bepaal die koördinate van die draaipunt van f.",
      },
      hint: {
        en: "Find the x of the turning point first with the formula, then put it back into f for the y. There is a free check available: your x should sit exactly midway between the two x-intercepts you found in (a).", af: "Vind eers die x van die draaipunt met die formule, en sit dit dan terug in f vir die y. Daar is 'n gratis toets: jou x moet presies halfpad lê tussen die twee x-afsnitte wat jy in (a) gevind het.",
      },
      memo: [
        { type: "step", text: { en: "x = −b/(2a) = −(−2)/(2(1)) = 1", af: "x = −b/(2a) = −(−2)/(2(1)) = 1" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "y = (1)² − 2(1) − 8 = −9 &nbsp;&nbsp;∴&nbsp; TP(1 ; −9)", af: "y = (1)² − 2(1) − 8 = −9 &nbsp;&nbsp;∴&nbsp; DP(1 ; −9)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: −b/(2a) gives you only the x of the turning point. Stopping there and writing TP(1) throws away half the answer — substitute back to get the y.", af: "ONTHOU: −b/(2a) gee jou net die x van die draaipunt. As jy daar stop en DP(1) skryf, gooi jy die helfte van die antwoord weg: vervang terug om die y te kry.",
        } },
      ],
      esplain: {
        en: "A parabola is perfectly symmetrical about a vertical line through its turning point, so the turning point sits exactly halfway between the two places where the graph crosses the x-axis. The formula x = −b/(2a) is just a quick way of finding that halfway x without having to find the intercepts first — and here you can see it working: the crossings were at −2 and 4, and halfway between them is 1, which is exactly what the formula gave. The y is a separate job, because the formula only ever produces an x. Put that x back into the original equation and you get the height of the graph at that point. Then write it as a coordinate; the comma in this question is not doing decimal duty, but the semicolon is still the thing that says “this is a point”.", af: "'n Parabool is perfek simmetries om 'n vertikale lyn deur sy draaipunt, dus sit die draaipunt presies halfpad tussen die twee plekke waar die grafiek die x-as sny. Die formule x = −b/(2a) is net 'n vinnige manier om daardie halfpad-x te vind sonder om eers die afsnitte te kry, en hier kan jy sien dit werk: die afsnitte was by −2 en 4, en halfpad tussen hulle is 1, presies wat die formule gegee het. Die y is 'n aparte taak, want die formule lewer altyd net 'n x. Sit daardie x terug in die oorspronklike vergelyking en jy kry die hoogte van die grafiek by daardie punt. Skryf dit dan as 'n koördinaat; daar is geen desimale in hierdie vraag nie, maar die kommapunt bly die ding wat sê “dit is 'n punt”.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — A PARABOLA WITH NO x-INTERCEPTS (her pp5–7: show the √ of a
   negative). f(x) = x² − 4x + 9, TP(2 ; 5), y-intercept (0 ; 9),
   b² − 4ac = 16 − 36 = −20.
   --------------------------------------------------------------- */
const Q2_F = { kind: "parabola", a: 1, b: -4, c: 9 };
const Q2_TP = { x: 2, y: 5, on: 0, label: "TP(2 ; 5)", place: "above" };
const Q2_YI = { x: 0, y: 9, on: 0, label: "(0 ; 9)" };
const Q2_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -2, xmax: 7, ymin: -2, ymax: 16 },
    curves: [{ ...Q2_F, tone: "a", label: "f", labelAt: -0.5 }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q2_TP] } },
    b: { question: { points: [Q2_TP] } },
    c: { question: { points: [Q2_TP] }, reveal: { points: [Q2_TP, Q2_YI] } },
  },
};

const q2 = {
  id: "func.sib.itp.q2",
  chapter: CH,
  topic: "intercepts-turning-point",
  archetype: "parabola-with-no-x-intercepts-root-of-a-negative",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 4x + 9.<br><br>Determine the coordinates of the turning point of f.", af: "Die skets toon die parabool f, gedefinieer deur &nbsp;f(x) = x² − 4x + 9.<br><br>Bepaal die koördinate van die draaipunt van f.",
      },
      hint: {
        en: "Use x = −b/(2a) for the x, then substitute that x back into f for the y. Take care with the signs: b is −4 here, so −b is +4.", af: "Gebruik x = −b/(2a) vir die x, en vervang dan daardie x terug in f vir die y. Wees versigtig met die tekens: b is hier −4, dus is −b gelyk aan +4.",
      },
      memo: [
        { type: "step", text: { en: "x = −b/(2a) = −(−4)/(2(1)) = 2", af: "x = −b/(2a) = −(−4)/(2(1)) = 2" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "y = (2)² − 4(2) + 9 = 4 − 8 + 9 = 5 &nbsp;&nbsp;∴&nbsp; TP(2 ; 5)", af: "y = (2)² − 4(2) + 9 = 4 − 8 + 9 = 5 &nbsp;&nbsp;∴&nbsp; DP(2 ; 5)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Nothing unusual here — this is the same two-step routine as always: the formula finds the mirror line's x, and substituting back finds how high the graph is on that line. What is worth noticing before you move on is WHERE that turning point has landed. The a is 1, which is positive, so this parabola is happy and its arms open upwards, which makes the turning point the very lowest the graph ever gets. And that lowest point has a y of 5, which is above the x-axis. Hold on to that, because the next part is going to ask you to prove algebraically what you can already suspect from those two facts.", af: "Niks ongewoons hier nie, dit is dieselfde tweestap-roetine as altyd: die formule vind die x van die simmetrie-as, en terugvervang vind hoe hoog die grafiek op daardie lyn is. Wat die moeite werd is om op te let voordat jy aangaan, is WAAR daardie draaipunt beland het. Die a is 1, wat positief is, dus is hierdie parabool happy en sy arms gaan oop na bo, wat die draaipunt die heel laagste punt van die grafiek maak. En daardie laagste punt het 'n y van 5, wat bo die x-as is. Hou dit vas, want die volgende deel gaan jou vra om algebraïes te bewys wat jy reeds uit daardie twee feite kan vermoed.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Show that f has no x-intercepts.", af: "Toon aan dat f geen x-afsnitte het nie.",
      },
      hint: {
        en: "Start the way you always start x-intercepts, by setting y to zero. It will not factorise, so go to the formula — and look carefully at what lands under the square root sign.", af: "Begin soos jy altyd x-afsnitte begin, deur y gelyk aan nul te stel. Dit sal nie faktoriseer nie, dus gaan na die formule, en kyk mooi wat onder die wortelteken beland.",
      },
      memo: [
        { type: "step", text: { en: "x-intercepts need y = 0, so solve &nbsp;x² − 4x + 9 = 0. It does not factorise, so use the formula, with a = 1, b = −4, c = 9:", af: "x-afsnitte vra y = 0, dus los op &nbsp;x² − 4x + 9 = 0. Dit faktoriseer nie, dus gebruik die formule, met a = 1, b = −4, c = 9:" } },
        { type: "step", text: { en: "b² − 4ac = (−4)² − 4(1)(9) = 16 − 36 = −20", af: "b² − 4ac = (−4)² − 4(1)(9) = 16 − 36 = −20" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x = (4 ± √(−20))/2", af: "x = (4 ± √(−20))/2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "√(−20) is not a real number, so the equation has no real solution &nbsp;&nbsp;∴&nbsp; f has no x-intercepts", af: "√(−20) is nie 'n reële getal nie, dus het die vergelyking geen reële oplossing nie &nbsp;&nbsp;∴&nbsp; f het geen x-afsnitte nie" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: √(−20) is NOT the same as −√20, and it is not zero either. A negative under the root means the graph simply never reaches the x-axis. The sketch agrees: f is happy and its lowest point sits 5 units ABOVE the axis.", af: "PASOP: √(−20) is NIE dieselfde as −√20 nie, en dit is ook nie nul nie. 'n Negatiewe getal onder die wortel beteken die grafiek bereik eenvoudig nooit die x-as nie. Die skets stem saam: f is happy en sy laagste punt sit 5 eenhede BO die as.",
        } },
      ],
      esplain: {
        en: "The square root is where the whole story is told. When you set a quadratic to zero and go to the formula, the part under the root, b² − 4ac, decides how many places the graph crosses: positive gives two crossings, zero gives one (the graph just touches), and negative gives none at all — because there is no real number you can square to get a negative answer, so the formula runs out of road. That is not a mistake in your working, it is the answer. And it matches the picture exactly: this parabola is happy, so it has a floor, and that floor is at height 5, well clear of the x-axis, so of course it never crosses. The two routes — the algebra and the turning point — are two ways of saying the same thing, and either one is worth full marks as long as you say it properly.", af: "Die vierkantswortel is waar die hele storie vertel word. Wanneer jy 'n kwadratiese uitdrukking gelyk aan nul stel en na die formule gaan, besluit die deel onder die wortel, b² − 4ac, hoeveel keer die grafiek die x-as sny: positief gee twee snypunte, nul gee een (die grafiek raak net), en negatief gee glad geen nie, want daar is geen reële getal wat jy kan kwadreer om 'n negatiewe antwoord te kry nie, dus loop die formule vas. Dit is nie 'n fout in jou bewerking nie, dit is die antwoord. En dit pas presies by die prent: hierdie parabool is happy, dus het dit 'n vloer, en daardie vloer is op hoogte 5, ver bo die x-as, so natuurlik sny dit nooit nie. Die twee roetes, die algebra en die draaipunt, is twee maniere om dieselfde ding te sê, en enigeen is volpunte werd solank jy dit behoorlik sê.",
      },
    },
    {
      id: "c",
      marks: 1,
      level: 1,
      prompt: {
        en: "Write down the coordinates of the y-intercept of f.", af: "Skryf die koördinate van die y-afsnit van f neer.",
      },
      hint: {
        en: "One substitution, and it is the easiest x there is.", af: "Een vervanging, en dit is die maklikste x wat daar is.",
      },
      memo: [
        { type: "answer", text: { en: "x = 0 &nbsp;⟹&nbsp; f(0) = 9 &nbsp;&nbsp;∴&nbsp; (0 ; 9)", af: "x = 0 &nbsp;⟹&nbsp; f(0) = 9 &nbsp;&nbsp;∴&nbsp; (0 ; 9)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "For any parabola written as y = ax² + bx + c, the lonely number on the end IS the y-intercept, because putting x = 0 wipes out the other two terms. So you can read it off without writing anything down — here it is the 9. It is a one-mark question, but it is also a free check on the rest of your work: the y-intercept must sit above the turning point on a happy parabola, and 9 is indeed above 5, so nothing you have written contradicts anything else.", af: "Vir enige parabool geskryf as y = ax² + bx + c, IS die eensame getal aan die einde die y-afsnit, want x = 0 vee die ander twee terme uit. Jy kan dit dus aflees sonder om iets neer te skryf: hier is dit die 9. Dit is 'n eenpuntvraag, maar dit is ook 'n gratis toets van die res van jou werk: op 'n happy parabool moet die y-afsnit bo die draaipunt sit, en 9 is wel bo 5, dus weerspreek niks wat jy geskryf het iets anders nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — COMPLETING THE SQUARE WITH a ≠ 1 (her pp29–32).
   g(x) = 3x² + 12x + 5 = 3(x + 2)² − 7. TP(−2 ; −7), y-int (0 ; 5),
   minimum value −7.
   --------------------------------------------------------------- */
const Q3_G = { kind: "parabola", a: 3, b: 12, c: 5 };
const Q3_TP = { x: -2, y: -7, on: 0, label: "TP(−2 ; −7)", place: "below" };
const Q3_YI = { x: 0, y: 5, on: 0, label: "(0 ; 5)" };
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -6, xmax: 2, ymin: -9, ymax: 14 },
    curves: [{ ...Q3_G, tone: "a", label: "g", labelAt: -4.2 }],
  },
  parts: {
    a: { question: {} },
    b: { question: {}, reveal: { points: [Q3_TP] } },
    c: { question: { points: [Q3_TP] }, reveal: { points: [Q3_TP, Q3_YI] } },
  },
};

const q3 = {
  id: "func.sib.itp.q3",
  chapter: CH,
  topic: "intercepts-turning-point",
  archetype: "completing-the-square-with-a-not-one-then-turning-point",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The sketch shows the parabola g, defined by &nbsp;g(x) = 3x² + 12x + 5.<br><br>Write g in the form &nbsp;y = a(x − p)² + q&nbsp; by completing the square.", af: "Die skets toon die parabool g, gedefinieer deur &nbsp;g(x) = 3x² + 12x + 5.<br><br>Skryf g in die vorm &nbsp;y = a(x − p)² + q&nbsp; deur die vierkant te voltooi.",
      },
      hint: {
        en: "Take the 3 out of the two x-terms only — leave the lonely number outside. Then halve the number in front of x inside the bracket, square it, and add and subtract it there. Be careful what happens to the part you subtract when the bracket is multiplied out again.", af: "Haal die 3 net uit die twee x-terme uit, en los die eensame getal buite. Halveer dan die getal voor x binne die hakie, kwadreer dit, en tel dit daar by en trek dit af. Wees versigtig met wat gebeur met die deel wat jy aftrek wanneer die hakie weer uitvermenigvuldig word.",
      },
      memo: [
        { type: "step", text: { en: "Take the 3 out of the two x-terms ONLY — never out of the lonely number: &nbsp;g(x) = 3(x² + 4x) + 5", af: "Haal die 3 NET uit die twee x-terme uit, nooit uit die eensame getal nie: &nbsp;g(x) = 3(x² + 4x) + 5" }, ticks: ["s/f"] },
        { type: "step", text: { en: "half of 4 is 2, and 2² = 4, so add and subtract 4 INSIDE the bracket: &nbsp;g(x) = 3(x² + 4x + 4 − 4) + 5", af: "die helfte van 4 is 2, en 2² = 4, dus tel 4 BINNE die hakie by en trek dit af: &nbsp;g(x) = 3(x² + 4x + 4 − 4) + 5" }, ticks: ["ca"] },
        { type: "answer", text: { en: "g(x) = 3(x + 2)² − 12 + 5 = 3(x + 2)² − 7", af: "g(x) = 3(x + 2)² − 12 + 5 = 3(x + 2)² − 7" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the −4 you subtracted is inside a bracket that is multiplied by 3, so it comes out as −12, not −4. Multiply it out BEFORE adding it to the 5.", af: "PASOP: die −4 wat jy afgetrek het, is binne 'n hakie wat met 3 vermenigvuldig word, dus kom dit uit as −12, nie −4 nie. Vermenigvuldig dit uit VOORDAT jy dit by die 5 tel.",
        } },
      ],
      esplain: {
        en: "Completing the square is a rewriting job, not a solving job — the graph does not change, only the way the equation is dressed. The reason it is worth doing is that turning-point form shows you the turning point for free, and standard form does not. The a ≠ 1 version has one extra hazard and it is always the same one: the number you subtract to keep things balanced is sitting inside a bracket that has a 3 in front of it, so it gets multiplied by 3 on the way out. Miss that and your q is out by a factor of three and the whole answer is wrong even though every other line was right. The safest habit is to expand your final answer back out as a check — 3(x + 2)² − 7 gives 3(x² + 4x + 4) − 7 = 3x² + 12x + 12 − 7 = 3x² + 12x + 5, which is exactly what you started with.", af: "Voltooiing van die vierkant is 'n herskryftaak, nie 'n oplostaak nie: die grafiek verander nie, net die manier waarop die vergelyking aangetrek is. Dit is die moeite werd omdat draaipunt-vorm vir jou die draaipunt verniet wys, en standaardvorm doen dit nie. Die weergawe met a ≠ 1 het een ekstra gevaar en dit is altyd dieselfde een: die getal wat jy aftrek om alles in balans te hou, sit binne 'n hakie met 'n 3 voor, dus word dit op pad uit met 3 vermenigvuldig. Mis dit en jou q is met 'n faktor drie verkeerd en die hele antwoord is verkeerd, al was elke ander reël reg. Die veiligste gewoonte is om jou finale antwoord weer uit te brei as toets: 3(x + 2)² − 7 gee 3(x² + 4x + 4) − 7 = 3x² + 12x + 12 − 7 = 3x² + 12x + 5, presies waarmee jy begin het.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: {
        en: "Write down the coordinates of the turning point of g.", af: "Skryf die koördinate van die draaipunt van g neer.",
      },
      hint: {
        en: "You did all the work in (a). Read p and q straight out of your answer — and remember which one flips sign.", af: "Jy het al die werk in (a) gedoen. Lees p en q reguit uit jou antwoord af, en onthou watter een se teken omdraai.",
      },
      memo: [
        { type: "answer", text: { en: "g(x) = 3(x + 2)² − 7 &nbsp;is&nbsp; y = a(x − p)² + q&nbsp; with p = −2 and q = −7 &nbsp;&nbsp;∴&nbsp; TP(−2 ; −7)", af: "g(x) = 3(x + 2)² − 7 &nbsp;is&nbsp; y = a(x − p)² + q&nbsp; met p = −2 en q = −7 &nbsp;&nbsp;∴&nbsp; DP(−2 ; −7)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: p takes the OPPOSITE sign to the number in the bracket. (x + 2)² gives p = −2, not p = 2. The q, sitting outside the bracket, keeps its own sign.", af: "ONTHOU: p kry die TEENOORGESTELDE teken van die getal in die hakie. (x + 2)² gee p = −2, nie p = 2 nie. Die q, wat buite die hakie sit, hou sy eie teken.",
        } },
      ],
      esplain: {
        en: "This is the payoff for the work in (a): once the equation is in turning-point form, the turning point is not calculated at all, it is read. The one thing to be careful about is the sign flip on p, and it is worth understanding rather than memorising. The bracket is squared, and a square is smallest when the thing inside it is zero — so the turning point happens at the x that makes (x + 2) equal zero, which is x = −2. The q needs no flip because it is not inside anything; it is just the height the graph has been lifted or dropped to. You can check the answer against your formula from the other route too: −b/(2a) = −12/6 = −2, the same x.", af: "Dit is die beloning vir die werk in (a): sodra die vergelyking in draaipunt-vorm is, word die draaipunt glad nie bereken nie, dit word afgelees. Die een ding om voor op te pas, is die teken van p wat omdraai, en dit is die moeite werd om dit te verstaan eerder as om dit uit te leer. Die hakie word gekwadreer, en 'n kwadraat is die kleinste wanneer dit wat binne-in is nul is, dus gebeur die draaipunt by die x wat (x + 2) gelyk aan nul maak, en dit is x = −2. Die q se teken draai nie om nie, want dit is nie binne-in iets nie; dit is net die hoogte waarheen die grafiek opgelig of laat sak is. Jy kan die antwoord ook teen jou formule van die ander roete toets: −b/(2a) = −12/6 = −2, dieselfde x.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "Write down the coordinates of the y-intercept of g, and the minimum value of g.", af: "Skryf die koördinate van die y-afsnit van g neer, en die minimumwaarde van g.",
      },
      hint: {
        en: "The y-intercept is easier to read off the ORIGINAL form. For the minimum, ask which way up this parabola is, and then which number in your turning point is the height.", af: "Die y-afsnit is makliker om uit die OORSPRONKLIKE vorm af te lees. Vir die minimum, vra of hierdie parabool happy of sad is, en dan watter getal in jou draaipunt die hoogte is.",
      },
      memo: [
        { type: "step", text: { en: "y-intercept: put x = 0 into the original form — in &nbsp;y = ax² + bx + c&nbsp; the c IS the y-intercept: &nbsp;g(0) = 5 &nbsp;&nbsp;∴&nbsp; (0 ; 5)", af: "y-afsnit: sit x = 0 in die oorspronklike vorm; in &nbsp;y = ax² + bx + c&nbsp; IS die c die y-afsnit: &nbsp;g(0) = 5 &nbsp;&nbsp;∴&nbsp; (0 ; 5)" }, ticks: ["a"] },
        { type: "answer", text: { en: "a = 3 &gt; 0, so g is <b>happy</b> and its turning point is its lowest point &nbsp;&nbsp;∴&nbsp; minimum value = −7", af: "a = 3 &gt; 0, dus is g <b>happy</b> en sy draaipunt is sy laagste punt &nbsp;&nbsp;∴&nbsp; minimumwaarde = −7" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: a minimum VALUE is a single number (the y), not a coordinate. The turning point is (−2 ; −7); the minimum value is −7.", af: "PASOP: 'n minimumwaarde is 'n ENKELE getal (die y), nie 'n koördinaat nie. Die draaipunt is (−2 ; −7); die minimumwaarde is −7.",
        } },
      ],
      esplain: {
        en: "Two small answers, and each one comes from a different form of the same equation — which is exactly why it is worth keeping both forms on your page. The y-intercept falls out of standard form, because putting x = 0 kills the x-terms and leaves the c. The minimum falls out of turning-point form, because q is the height of the turning point. The last decision is whether that height is a floor or a ceiling, and only the sign of a settles it: positive a means happy arms opening upwards, so the graph falls to the turning point and then climbs forever, making that height the smallest y the graph ever produces. Had a been negative the same number would have been a maximum instead. And do read the words in the question — “minimum value” wants the number on its own, not the pair.", af: "Twee klein antwoorde, en elkeen kom uit 'n ander vorm van dieselfde vergelyking, en dit is presies hoekom dit die moeite werd is om albei vorme op jou bladsy te hou. Die y-afsnit val uit standaardvorm uit, want x = 0 vee die x-terme uit en los die c. Die minimum val uit draaipunt-vorm uit, want q is die hoogte van die draaipunt. Die laaste besluit is of daardie hoogte 'n vloer of 'n plafon is, en net die teken van a besluit dit: positiewe a beteken happy arms wat na bo oopgaan, dus daal die grafiek tot by die draaipunt en klim dan vir ewig, wat daardie hoogte die kleinste y maak wat die grafiek ooit lewer. As a negatief was, sou dieselfde getal eerder 'n maksimum gewees het. En lees wel die woorde in die vraag: “minimumwaarde” wil die getal op sy eie hê, nie die paar nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — EXPONENTIAL INTERCEPTS: one that has an x-intercept and one
   that cannot (her pp15–17, "x-ints only when they exist").
     f(x) = 2ˣ − 8   asymptote y = −8, graph above it ⟹ it crosses,
                     at (3 ; 0); y-intercept (0 ; −7)
     g(x) = 2ˣ + 4   asymptote y = 4, graph above it ⟹ it never can;
                     y-intercept (0 ; 5)
   Both asymptotes ARE drawn here — neither is anybody's answer on this
   card, and they are what makes the "which side of the x-axis" argument
   visible.
   LEVEL 3 lands on (b).
   --------------------------------------------------------------- */
const Q4_FX = { x: 3, y: 0, on: 0, label: "(3 ; 0)" };
const Q4_FY = { x: 0, y: -7, on: 0, label: "(0 ; −7)" };
const Q4_GY = { x: 0, y: 5, on: 1, label: "(0 ; 5)" };
const Q4_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -3, xmax: 4, ymin: -10, ymax: 14 },
    curves: [
      { kind: "exp", a: 1, b: 2, p: 0, q: -8, tone: "a", label: "f", labelAt: 3.3 },
      { kind: "exp", a: 1, b: 2, p: 0, q: 4, tone: "b", label: "g", labelAt: 2.8 },
    ],
    // both are GIVEN (the stem states both equations) ⟹ both captioned (session 2a-FIX)
    asymptotes: [{ y: -8, of: 0, label: "y = −8" }, { y: 4, of: 1, label: "y = 4" }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q4_FX, Q4_FY] } },
    b: { question: { points: [Q4_FX, Q4_FY] }, reveal: { points: [Q4_FX, Q4_FY, Q4_GY] } },
  },
};

const q4 = {
  id: "func.sib.itp.q4",
  chapter: CH,
  topic: "intercepts-turning-point",
  archetype: "exponential-intercepts-one-graph-crosses-one-cannot",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The sketch shows two exponential graphs on the same set of axes, with their asymptotes dashed: &nbsp;f(x) = 2ˣ − 8&nbsp; and &nbsp;g(x) = 2ˣ + 4.<br><br>Determine the coordinates of the x-intercept and of the y-intercept of f.", af: "Die skets toon twee eksponensiële grafieke op dieselfde assestelsel, met hul asimptote as stippellyne: &nbsp;f(x) = 2ˣ − 8&nbsp; en &nbsp;g(x) = 2ˣ + 4.<br><br>Bepaal die koördinate van die x-afsnit en van die y-afsnit van f.",
      },
      hint: {
        en: "Same two ideas as for a parabola: x = 0 for one, y = 0 for the other. When you set y to zero you will be left with a power on one side and a number on the other — write that number as a power of the same base.", af: "Dieselfde twee idees as vir 'n parabool: x = 0 vir die een, y = 0 vir die ander. Wanneer jy y gelyk aan nul stel, sit jy met 'n mag aan die een kant en 'n getal aan die ander kant: skryf daardie getal as 'n mag van dieselfde grondtal.",
      },
      memo: [
        { type: "step", text: { en: "y-intercept: x = 0, and 2⁰ = 1, so &nbsp;f(0) = 1 − 8 = −7 &nbsp;&nbsp;∴&nbsp; (0 ; −7)", af: "y-afsnit: x = 0, en 2⁰ = 1, dus &nbsp;f(0) = 1 − 8 = −7 &nbsp;&nbsp;∴&nbsp; (0 ; −7)" }, ticks: ["a"] },
        { type: "step", text: { en: "x-intercept: y = 0, so &nbsp;2ˣ − 8 = 0 &nbsp;⟹&nbsp; 2ˣ = 8 = 2³", af: "x-afsnit: y = 0, dus &nbsp;2ˣ − 8 = 0 &nbsp;⟹&nbsp; 2ˣ = 8 = 2³" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "the bases are the same, so the exponents are equal: &nbsp;x = 3 &nbsp;&nbsp;∴&nbsp; (3 ; 0)", af: "die grondtalle is dieselfde, dus is die eksponente gelyk: &nbsp;x = 3 &nbsp;&nbsp;∴&nbsp; (3 ; 0)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Intercepts work the same way for every graph in Grade 11 — the axes are what change, not the method. On the y-axis x is zero, and for an exponential that is especially quick because any base to the power 0 is 1, so the power part collapses and you are left with plain arithmetic. On the x-axis y is zero, and that leaves you with an exponential EQUATION, which is a different animal from a quadratic one: you cannot factorise it, you make the two sides into powers of the same base and then equate the exponents. Recognising 8 as 2³ is the whole move. If the number on the right had not been a power of 2 you would not have been able to finish it by hand at all — which is a good sign that the question was built to come out neatly.", af: "Afsnitte werk op dieselfde manier vir elke grafiek in Graad 11: die asse is wat verander, nie die metode nie. Op die y-as is x nul, en vir 'n eksponensiële grafiek is dit ekstra vinnig, want enige grondtal tot die mag 0 is 1, dus val die mag-deel weg en jy sit met gewone rekenkunde. Op die x-as is y nul, en dan sit jy met 'n eksponensiële VERGELYKING, 'n heel ander storie as 'n kwadratiese een: jy kan dit nie faktoriseer nie, jy maak die twee kante magte van dieselfde grondtal en stel dan die eksponente gelyk. Om 8 as 2³ te herken, is die hele truuk. As die getal regs nie 'n mag van 2 was nie, sou jy dit glad nie met die hand kon klaarmaak nie, en dit is 'n goeie teken dat die vraag gebou is om netjies uit te kom.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "Explain why g has no x-intercept, and write down the coordinates of the y-intercept of g.", af: "Verduidelik waarom g geen x-afsnit het nie, en skryf die koördinate van die y-afsnit van g neer.",
      },
      hint: {
        en: "Start the x-intercept the normal way and see what equation you end up having to solve. Then ask yourself whether a power of 2 could ever be worth that.", af: "Begin die x-afsnit op die gewone manier en kyk watter vergelyking jy uiteindelik moet oplos. Vra jouself dan of 'n mag van 2 ooit dít kan wees.",
      },
      memo: [
        { type: "step", text: { en: "An x-intercept would need &nbsp;2ˣ + 4 = 0, &nbsp;that is &nbsp;2ˣ = −4. But 2ˣ is ALWAYS positive, whatever x is — the graph lives entirely above its asymptote y = 4, which is itself above the x-axis &nbsp;&nbsp;∴&nbsp; g has no x-intercept", af: "Vir 'n x-afsnit moet &nbsp;2ˣ + 4 = 0, &nbsp;dit wil sê &nbsp;2ˣ = −4. Maar 2ˣ is ALTYD positief, wat x ook al is: die grafiek leef heeltemal bo sy asimptoot y = 4, wat self bo die x-as is &nbsp;&nbsp;∴&nbsp; g het geen x-afsnit nie" }, ticks: ["a"] },
        { type: "answer", text: { en: "y-intercept: &nbsp;g(0) = 1 + 4 = 5 &nbsp;&nbsp;∴&nbsp; (0 ; 5)", af: "y-afsnit: &nbsp;g(0) = 1 + 4 = 5 &nbsp;&nbsp;∴&nbsp; (0 ; 5)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER the quick test: the graph lives on one side of its asymptote, and it crosses the x-axis only if the x-axis is on that SAME side. f's asymptote is y = −8 and f sits above it — the x-axis is above −8 too, so f must cross on the way up. g's asymptote is y = 4 and g sits above it — but the x-axis is BELOW 4, on the other side, so g can never reach it.", af: "ONTHOU die vinnige toets: die grafiek leef aan een kant van sy asimptoot, en dit sny die x-as net as die x-as aan DIESELFDE kant is. f se asimptoot is y = −8 en f sit daarbo; die x-as is ook bo −8, dus moet f op pad op sny. g se asimptoot is y = 4 en g sit daarbo, maar die x-as is ONDER 4, aan die ander kant, dus kan g dit nooit bereik nie.",
        } },
      ],
      esplain: {
        en: "This part is starred-thinking rather than starred-arithmetic: there is almost nothing to calculate, and everything depends on noticing when to stop. If you set g to zero you arrive at 2ˣ = −4, and no value of x can make that true, because raising a positive base to any power — big, small, negative, fractional — always lands on a positive answer. So the honest response is not to keep grinding but to say why the equation has no solution. The picture says the same thing in one glance: g's asymptote is the line y = 4, g stays above it forever, and the x-axis is four units below that, so the two never meet. That gives you a reliable test for any exponential: look at where the asymptote sits and which side of it the graph lives on. If the x-axis is on the same side as the graph, there is a crossing; if it is on the other side, there is not.", af: "Hierdie deel kry sy ster vir die dink, nie vir die rekenwerk nie: daar is amper niks om te bereken nie, en alles hang daarvan af dat jy raaksien wanneer om te stop. As jy g gelyk aan nul stel, kom jy by 2ˣ = −4 uit, en geen waarde van x kan dit waar maak nie, want 'n positiewe grondtal tot enige mag, groot, klein, negatief of 'n breuk, eindig altyd by 'n positiewe antwoord. Die eerlike antwoord is dus nie om aan te hou ploeter nie, maar om te sê waarom die vergelyking geen oplossing het nie. Die prent sê dieselfde ding in een oogopslag: g se asimptoot is die lyn y = 4, g bly vir altyd daarbo, en die x-as is vier eenhede daaronder, dus ontmoet die twee mekaar nooit nie. Dit gee jou 'n betroubare toets vir enige eksponensiële grafiek: kyk waar die asimptoot sit en aan watter kant daarvan die grafiek leef. As die x-as aan dieselfde kant as die grafiek is, is daar 'n snypunt; as dit aan die ander kant is, is daar nie.",
      },
    },
  ],
};

export const funcInterceptsTurningPointSiblingQuestions = [q1, q2, q3, q4];
