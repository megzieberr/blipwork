/* ============================================================
   EXAM FOCUS — Algebraic Expressions · SIBLING CARDS for the tile
   "expand" (Expand & simplify).
   (EXAM-BUILD-DAY.md, 2026-08-23, ruling 2 — "Algebraic expressions
   (Gr10 revision) gets its own exam-only chapter: that is where the
   30%-learners will earn their marks." Wave 1, session A.)
   ------------------------------------------------------------
   SIX cards, easiest first, levels 1 → 3. Nothing here is level 4 —
   the ★ questions all live on the chapter's own `level-4` tile
   (js/exam/algx-level4.js), so a learner drilling the basics never
   turns a card and finds a starred one.

   WHAT THE SIX COVER, and why these six (the brief's list, in order):
     q1  binomial × trinomial — the SAG's own Grade 10 Term 1 item 4
     q2  squares of binomials, the second one carrying a FRACTION term
     q3  difference of two squares, written down in one line
     q4  a product with a NEGATIVE in front of it (the minus that has
         to reach every term inside the bracket)
     q5  simplify, then use the simplified form to evaluate a number
         product WITHOUT a calculator
     q6  surds inside a product — the bridge to the Exponents & Surds
         chapter, still pure "expand and simplify" work

   SOURCE OF THE MATHS. Her own notes (METHODS-algebra.md) cover
   exponents, surds, equations and inequalities — NOT Grade 10
   expanding and factorising (its Part E says so). So the METHOD here
   is the ordinary CAPS Grade 10 textbook method, written in HER voice
   and to HER house rules from Part 0 of that file: the `∴` habit on
   the line where the reasoning turns, decimal comma, real minus,
   answers presented her way, and a memo that ticks the written steps
   rather than only the final answer. Every number is fresh.

   ARCHETYPES from Desktop\Eksamen Vraestelle\Gr11 IEB Nov —
   GR11-IEB-PAPER-BANK.md plus survey\SURVEY-Her-2025-Assessments.md
   §1 (her own Test 1 and Sept P1 shapes) and §2 (the style canon).
   Marks per part 1–4, a card 2–6 marks, exactly like the bank.

   NO DIAGRAMS in this chapter — nothing here would carry a figure on
   a real paper.

   lostQuest: algx owns NO drill rounds (it is an exam-focus-only
   chapter, js/config.js EXAM_ONLY_CHAPTERS), so every question here
   carries the documented placeholder
   `{ chapter: "algx", quest: "PENDING-algx-is-exam-only-no-drill-round" }`.
   js/exam-play.js renders the "I'm lost" button only when the named
   quest is currently OPEN, and this one can never resolve — so no
   button ever renders. Same mechanism euclid uses.
   ============================================================ */

const PAPER = "siblings";
const CH = "algx";
const LOST = { chapter: CH, quest: "PENDING-algx-is-exam-only-no-drill-round" };

/* A pre-built stacked fraction. fracHtml (js/ui.js) leaves an existing
   .sfrac completely alone, so this is the safe way to stack a fraction
   whose numerator or denominator carries HTML of its own. Plain `a/b`
   shapes elsewhere in this file are left for fracHtml to stack. */
const sf = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;

/* ---------------------------------------------------------------
   q1 — BINOMIAL × TRINOMIAL (SAG Grade 10 Term 1, item 4).
   (2x − 3)(x² + 4x − 5) = 2x³ + 5x² − 22x + 15
   --------------------------------------------------------------- */
const q1 = {
  id: "algx.sib.ex.q1",
  chapter: CH,
  topic: "expand",
  archetype: "gr10-binomial-times-trinomial",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "Expand and simplify: &nbsp;(2x − 3)(x² + 4x − 5)", af: "Brei uit en vereenvoudig: &nbsp;(2x − 3)(x² + 4x − 5)",
      },
      hint: {
        en: "Every term in the front bracket has to meet every term in the back bracket — that is six little products, not three. Do the 2x row first, then the −3 row, and only collect like terms right at the end.", af: "Elke term in die voorste hakie moet elke term in die agterste hakie ontmoet: dit is ses klein produkte, nie drie nie. Doen eers die 2x-ry, dan die −3-ry, en versamel gelyksoortige terme eers heel aan die einde.",
      },
      memo: [
        { type: "step", text: { en: "Take each term of the first bracket into the <b>whole</b> of the second bracket — the 2x row, then the −3 row.", af: "Vermenigvuldig elke term van die eerste hakie met die <b>hele</b> tweede hakie: eers die 2x-ry, dan die −3-ry." } },
        { type: "step", text: { en: "= 2x(x² + 4x − 5) − 3(x² + 4x − 5)", af: "= 2x(x² + 4x − 5) − 3(x² + 4x − 5)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 2x³ + 8x² − 10x − 3x² − 12x + 15", af: "= 2x³ + 8x² − 10x − 3x² − 12x + 15" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; 2x³ + 5x² − 22x + 15", af: "∴&nbsp; 2x³ + 5x² − 22x + 15" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the −3 keeps its minus the whole way through. −3 × (−5) = +15, so the last term is <b>plus</b> fifteen. Count your terms before you collect: six products in, six terms out.", af: "PASOP: die −3 hou sy minus die hele pad. −3 × (−5) = +15, dus is die laaste term <b>plus</b> vyftien. Tel jou terme voor jy versamel: ses produkte in, ses terme uit.",
        } },
      ],
      esplain: {
        en: "Think of the front bracket as two visitors and the back bracket as three houses. Every visitor must knock on every door, so there are 2 × 3 = 6 knocks. If you end up with fewer than six terms before you tidy up, you skipped a door. The safest way to keep track is to split the job in two: send the 2x round first, then send the −3 round, and write each row on its own line. That way the minus travels with the 3 instead of getting lost. Only once all six terms are on the page do you look for like terms — the x² pair and the x pair — and add them. Nothing is allowed to combine before that.", af: "Dink aan die voorste hakie as twee besoekers en die agterste hakie as drie huise. Elke besoeker moet aan elke deur klop, dus word daar 2 × 3 = 6 keer geklop. As jy minder as ses terme het voordat jy opruim, het jy 'n deur oorgeslaan. Die veiligste manier om rekord te hou, is om die werk in twee te verdeel: stuur eers die 2x rond, stuur dan die −3 rond, en skryf elke ry op sy eie reël. So bly die minus by die 3 in plaas daarvan om weg te raak. Eers wanneer al ses terme op die bladsy is, soek jy gelyksoortige terme (die x²-paar en die x-paar) en tel hulle op. Niks mag voor dit gekombineer word nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — SQUARES OF BINOMIALS, the second one with a FRACTION term.
   (a) (5x − 2)²    = 25x² − 20x + 4
   (b) (x/3 + 6)²   = x²/9 + 4x + 36
   --------------------------------------------------------------- */
const q2 = {
  id: "algx.sib.ex.q2",
  chapter: CH,
  topic: "expand",
  archetype: "gr10-square-of-a-binomial-including-a-fraction-term",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Expand and simplify each of the following.<br><br>(5x − 2)²", af: "Brei elkeen van die volgende uit en vereenvoudig.<br><br>(5x − 2)²",
      },
      hint: {
        en: "A square means the bracket times itself, so there are three pieces in the answer, not two. Write down the first term squared, then twice the two terms multiplied, then the last term squared.", af: "'n Kwadraat beteken die hakie maal homself, dus is daar drie stukke in die antwoord, nie twee nie. Skryf die eerste term gekwadreer neer, dan twee keer die twee terme vermenigvuldig, dan die laaste term gekwadreer.",
      },
      memo: [
        { type: "step", text: { en: "Use the pattern &nbsp;(a − b)² = a² − 2ab + b², &nbsp;with a = 5x and b = 2.", af: "Gebruik die patroon &nbsp;(a − b)² = a² − 2ab + b², &nbsp;met a = 5x en b = 2." } },
        { type: "step", text: { en: "= (5x)² − 2(5x)(2) + 2²", af: "= (5x)² − 2(5x)(2) + 2²" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; 25x² − 20x + 4", af: "∴&nbsp; 25x² − 20x + 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (5x − 2)² is NOT 25x² − 4. Squaring a bracket is never done term by term — the middle term −20x is a real part of the answer and it is where the mark usually goes missing.", af: "PASOP: (5x − 2)² is NIE 25x² − 4 nie. 'n Hakie word nooit term vir term gekwadreer nie: die middelste term −20x is 'n regte deel van die antwoord, en dit is waar die punt gewoonlik verlore gaan.",
        } },
      ],
      esplain: {
        en: "A square is just a bracket standing next to a copy of itself, so the same every-visitor-knocks-on-every-door rule applies. Four knocks this time: 5x with 5x, 5x with −2, −2 with 5x, and −2 with −2. The two middle knocks are identical twins, which is exactly why the pattern has a 2 in front of the middle term. Notice the last term: −2 times −2 is +4, so a minus in the bracket still leaves a plus on the end. That is worth remembering, because it means the answer to (5x − 2)² and the answer to (5x + 2)² differ only in the sign of the middle term.", af: "'n Kwadraat is net 'n hakie wat langs 'n kopie van homself staan, dus geld dieselfde reël: elke besoeker klop aan elke deur. Hierdie keer word vier keer geklop: 5x met 5x, 5x met −2, −2 met 5x, en −2 met −2. Die twee middelste is identiese tweelinge, en dit is presies hoekom die patroon 'n 2 voor die middelste term het. Let op die laaste term: −2 maal −2 is +4, dus laat 'n minus in die hakie steeds 'n plus aan die einde. Dit is die moeite werd om te onthou, want dit beteken die antwoorde vir (5x − 2)² en (5x + 2)² verskil net in die teken van die middelste term.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "(x/3 + 6)²", af: "(x/3 + 6)²",
      },
      hint: {
        en: "Nothing changes because one of the terms is a fraction — it is still first squared, twice the product, last squared. Square the top and the bottom of the fraction separately.", af: "Niks verander omdat een van die terme 'n breuk is nie: dit is steeds eerste gekwadreer, twee keer die produk, laaste gekwadreer. Kwadreer die teller en die noemer van die breuk apart.",
      },
      memo: [
        { type: "step", text: { en: "Same pattern, &nbsp;(a + b)² = a² + 2ab + b², &nbsp;with a = x/3 and b = 6.", af: "Dieselfde patroon, &nbsp;(a + b)² = a² + 2ab + b², &nbsp;met a = x/3 en b = 6." } },
        { type: "step", text: { en: "= (x/3)² + 2(x/3)(6) + 6²", af: "= (x/3)² + 2(x/3)(6) + 6²" }, ticks: ["s/f"] },
        { type: "step", text: { en: `= ${sf("x²", "9")} + ${sf("12x", "3")} + 36`, af: `= ${sf("x²", "9")} + ${sf("12x", "3")} + 36` }, ticks: ["ca"] },
        { type: "answer", text: { en: `∴&nbsp; ${sf("x²", "9")} + 4x + 36`, af: `∴&nbsp; ${sf("x²", "9")} + 4x + 36` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: squaring a fraction squares the bottom as well as the top, so (x/3)² is x² over 9, never x² over 3. And tidy the middle term at the end — 12x over 3 is 4x, and leaving it unsimplified costs the last mark.", af: "ONTHOU: as jy 'n breuk kwadreer, kwadreer jy die noemer sowel as die teller, dus is (x/3)² gelyk aan x² oor 9, nooit x² oor 3 nie. En vereenvoudig die middelste term aan die einde: 12x oor 3 is 4x, en as jy dit nie vereenvoudig nie, kos dit die laaste punt.",
        } },
      ],
      esplain: {
        en: "A fraction inside a bracket often makes learners freeze, but the bracket cannot tell the difference. Treat x over 3 as one single object called a, run the same three-step pattern, and only then deal with the fraction arithmetic. Squaring a fraction hits both floors of the building: the top becomes x² and the bottom becomes 9. The middle term is where the fraction actually helps you — 2 times x over 3 times 6 gives 12x over 3, and 3 divides into 12 four times, so a whole number falls out. The last term has no fraction in it at all, because the 6 was never over anything. Take one line to tidy, and the answer looks friendly again.", af: "'n Breuk binne 'n hakie laat leerders dikwels vries, maar die hakie sien nie die verskil nie. Behandel x oor 3 as een enkele voorwerp genaamd a, volg dieselfde drie stappe, en hanteer eers daarna die breukrekenwerk. As jy 'n breuk kwadreer, tref dit albei verdiepings van die gebou: bo word dit x² en onder word dit 9. Die middelste term is waar die breuk jou eintlik help: 2 maal x oor 3 maal 6 gee 12x oor 3, en 3 gaan vier keer in 12, dus val 'n heelgetal uit. Die laaste term het glad nie 'n breuk nie, want die 6 was nooit oor iets nie. Gebruik een reël om op te ruim, en die antwoord lyk weer vriendelik.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — DIFFERENCE OF TWO SQUARES, in one line.
   (a) (4x − 7)(4x + 7)   = 16x² − 49
   (b) (2m + 9n)(2m − 9n) = 4m² − 81n²
   --------------------------------------------------------------- */
const q3 = {
  id: "algx.sib.ex.q3",
  chapter: CH,
  topic: "expand",
  archetype: "gr10-product-that-is-a-difference-of-two-squares",
  paper: PAPER,
  lostQuest: LOST,
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Expand and simplify each of the following, writing your answer down in one line.<br><br>(4x − 7)(4x + 7)", af: "Brei elkeen van die volgende uit en vereenvoudig, en skryf jou antwoord in een reël neer.<br><br>(4x − 7)(4x + 7)",
      },
      hint: {
        en: "Look at the two brackets side by side. They are identical except for one sign in the middle — that is the signal that the two middle terms are about to cancel each other out.", af: "Kyk na die twee hakies langs mekaar. Hulle is identies, behalwe vir een teken in die middel: dit is die aanduiding dat die twee middelste terme mekaar gaan uitkanselleer.",
      },
      memo: [
        { type: "step", text: { en: "The brackets are the same except for the middle sign, so this is a <b>difference of two squares</b>: &nbsp;(a − b)(a + b) = a² − b².", af: "Die hakies is dieselfde behalwe vir die middelste teken, dus is dit 'n <b>verskil van twee vierkante</b>: &nbsp;(a − b)(a + b) = a² − b²." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴&nbsp; (4x)² − 7² = 16x² − 49", af: "∴&nbsp; (4x)² − 7² = 16x² − 49" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: there is no middle term at all. The long way gives 16x² + 28x − 28x − 49, and the two x terms wipe each other out — which is the only reason this shortcut is allowed. Also square the 4 as well as the x: (4x)² is 16x², not 4x².", af: "PASOP: daar is glad nie 'n middelste term nie. Die lang pad gee 16x² + 28x − 28x − 49, en die twee x-terme kanselleer mekaar uit: dit is die enigste rede waarom hierdie kortpad toegelaat word. Kwadreer ook die 4, nie net die x nie: (4x)² is 16x², nie 4x² nie.",
        } },
      ],
      esplain: {
        en: "This is the one product in Grade 10 you are allowed to write down without any working, and it is worth spotting on sight. The reason it works is short: the four knocks give 16x², then +28x, then −28x, then −49. The two middle ones are the same size with opposite signs, so they vanish. All that survives is the first term squared minus the last term squared. Two things to be careful about. First, the whole term gets squared, coefficient included, so 4x becomes 16x². Second, the shortcut only works when the brackets are twins with one sign flipped. If the numbers differ at all, you are back to knocking on every door.", af: "Dit is die een produk in Graad 10 wat jy sonder enige bewerking mag neerskryf, en dit is die moeite werd om dit dadelik raak te sien. Die rede waarom dit werk, is kort: die vier produkte gee 16x², dan +28x, dan −28x, dan −49. Die middelste twee is ewe groot met teenoorgestelde tekens, dus verdwyn hulle. Al wat oorbly, is die eerste term gekwadreer minus die laaste term gekwadreer. Wees versigtig met twee dinge. Eerstens word die hele term gekwadreer, koëffisiënt ingesluit, dus word 4x 16x². Tweedens werk die kortpad net as die hakies tweelinge is met een teken omgedraai. As die getalle enigsins verskil, moet jy weer aan elke deur klop.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "(2m + 9n)(2m − 9n)", af: "(2m + 9n)(2m − 9n)",
      },
      hint: {
        en: "Same twins, same shortcut. The letters being different does not change anything — square the first term, square the second, and put a minus between them.", af: "Dieselfde tweelinge, dieselfde kortpad. Dat die letters verskil, verander niks nie: kwadreer die eerste term, kwadreer die tweede, en sit 'n minus tussen hulle.",
      },
      memo: [
        { type: "step", text: { en: "= (2m)² − (9n)²", af: "= (2m)² − (9n)²" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; 4m² − 81n²", af: "∴&nbsp; 4m² − 81n²" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two letters instead of one letter and a number changes nothing about the pattern, and that is the whole point of learning it as a shape rather than as a fact about x. Square the front term: 2m times 2m is 4m². Square the back term: 9n times 9n is 81n². Put the minus between them and you are finished. The order the brackets are written in does not matter either — a plus bracket first and a minus bracket second gives exactly the same answer, because the two middle terms cancel whichever way round they appear. If you ever doubt it, test with easy numbers: let m be 1 and n be 1 and check that both sides agree.", af: "Twee letters in plaas van een letter en 'n getal verander niks aan die patroon nie, en dit is juis die punt daarvan om dit as 'n vorm te leer eerder as 'n feit oor x. Kwadreer die voorste term: 2m maal 2m is 4m². Kwadreer die agterste term: 9n maal 9n is 81n². Sit die minus tussen hulle en jy is klaar. Die volgorde waarin die hakies geskryf is, maak ook nie saak nie: 'n plus-hakie eerste en 'n minus-hakie tweede gee presies dieselfde antwoord, want die twee middelste terme kanselleer, watter kant toe hulle ook al staan. As jy ooit twyfel, toets met maklike getalle: stel m gelyk aan 1 en n gelyk aan 1, en kyk of albei kante dieselfde gee.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — A PRODUCT WITH A NEGATIVE IN FRONT.
   −3x(2x − 5) − (x − 4)(x + 2) = −7x² + 17x + 8
   --------------------------------------------------------------- */
const q4 = {
  id: "algx.sib.ex.q4",
  chapter: CH,
  topic: "expand",
  archetype: "gr10-expand-with-a-minus-in-front-of-a-bracket",
  paper: PAPER,
  lostQuest: LOST,
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "Expand and simplify: &nbsp;−3x(2x − 5) − (x − 4)(x + 2)", af: "Brei uit en vereenvoudig: &nbsp;−3x(2x − 5) − (x − 4)(x + 2)",
      },
      hint: {
        en: "Do the two products separately on two lines first, keeping the second one inside a bracket. Only once you can see it whole do you let the minus in front of it loose.", af: "Doen eers die twee produkte apart op twee reëls, en hou die tweede een binne 'n hakie. Eers wanneer jy dit heel kan sien, laat jy die minus voor dit los.",
      },
      memo: [
        { type: "step", text: { en: "−3x(2x − 5) = −6x² + 15x", af: "−3x(2x − 5) = −6x² + 15x" }, ticks: ["ca"] },
        { type: "step", text: { en: "(x − 4)(x + 2) = x² − 2x − 8 &nbsp;&nbsp;— keep it in a bracket, the minus outside is still waiting", af: "(x − 4)(x + 2) = x² − 2x − 8, &nbsp;&nbsp;hou dit in 'n hakie: die minus buite wag nog" } , ticks: ["ca"] },
        { type: "step", text: { en: "= −6x² + 15x − (x² − 2x − 8) = −6x² + 15x − x² + 2x + 8", af: "= −6x² + 15x − (x² − 2x − 8) = −6x² + 15x − x² + 2x + 8" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; −7x² + 17x + 8", af: "∴&nbsp; −7x² + 17x + 8" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the minus in front of the bracket belongs to <b>every</b> term inside it, not just the first one. − (x² − 2x − 8) is −x² + 2x + 8. Changing only the x² and leaving the other two alone is the single most common way this question is lost.", af: "PASOP: die minus voor die hakie behoort aan <b>elke</b> term daarin, nie net aan die eerste een nie. − (x² − 2x − 8) is −x² + 2x + 8. Om net die x² te verander en die ander twee te los, is die algemeenste manier om hierdie vraag te verloor.",
        } },
      ],
      esplain: {
        en: "There are two separate jobs here and the marks come from keeping them apart. Job one is a single term times a bracket: −3x meets 2x and then −5, and the minus travels with the 3x both times, so you get −6x² and +15x. Job two is a bracket times a bracket, four knocks, giving x² − 2x − 8. Now comes the moment the question was built for. That whole answer sits behind a minus sign, so you must write it inside a bracket first and then flip every sign inside. Think of the minus as an instruction saying take away all of this, not take away the first bit. Once the signs are flipped, collecting like terms is ordinary arithmetic.", af: "Hier is twee aparte take, en die punte kom daarvandaan dat jy hulle apart hou. Taak een is 'n enkele term maal 'n hakie: −3x ontmoet 2x en dan −5, en die minus gaan albei kere saam met die 3x, dus kry jy −6x² en +15x. Taak twee is 'n hakie maal 'n hakie, vier keer klop, wat x² − 2x − 8 gee. Nou kom die oomblik waarvoor die vraag gebou is. Daardie hele antwoord staan agter 'n minusteken, dus moet jy dit eers binne 'n hakie skryf en dan elke teken daarin omdraai. Dink aan die minus as 'n opdrag om dit alles af te trek, nie net die eerste stukkie nie. Sodra die tekens omgedraai is, is die versameling van gelyksoortige terme gewone rekenwerk.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — SIMPLIFY, THEN EVALUATE WITHOUT A CALCULATOR.
   (a) (x + 5)(x − 5) − (x − 3)² = 6x − 34
   (b) x = 100: 105 × 95 − 97² = 6(100) − 34 = 566
   --------------------------------------------------------------- */
const q5 = {
  id: "algx.sib.ex.q5",
  chapter: CH,
  topic: "expand",
  archetype: "gr10-simplify-then-evaluate-a-number-product-without-a-calculator",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Expand and simplify: &nbsp;(x + 5)(x − 5) − (x − 3)²", af: "Brei uit en vereenvoudig: &nbsp;(x + 5)(x − 5) − (x − 3)²",
      },
      hint: {
        en: "Two shapes you already know, one after the other: the twins make a difference of two squares, and the square makes three terms. Keep the second answer in a bracket until the minus has been dealt with.", af: "Twee vorme wat jy reeds ken, een na die ander: die tweelinge gee 'n verskil van twee vierkante, en die kwadraat gee drie terme. Hou die tweede antwoord in 'n hakie totdat die minus hanteer is.",
      },
      memo: [
        { type: "step", text: { en: "(x + 5)(x − 5) = x² − 25 &nbsp;&nbsp;and&nbsp;&nbsp; (x − 3)² = x² − 6x + 9", af: "(x + 5)(x − 5) = x² − 25 &nbsp;&nbsp;en&nbsp;&nbsp; (x − 3)² = x² − 6x + 9" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= x² − 25 − (x² − 6x + 9) = x² − 25 − x² + 6x − 9", af: "= x² − 25 − (x² − 6x + 9) = x² − 25 − x² + 6x − 9" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; 6x − 34", af: "∴&nbsp; 6x − 34" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the x² terms cancel. If your answer still has an x² in it, the minus did not reach the whole of the second bracket — check that the + 9 became a − 9.", af: "ONTHOU: die x²-terme kanselleer. As daar nog 'n x² in jou antwoord is, het die minus nie die hele tweede hakie bereik nie: kyk of die + 9 'n − 9 geword het.",
        } },
      ],
      esplain: {
        en: "Something surprising happens here and it is the reason the question exists. You start with two squared brackets, so you expect an answer with an x² in it — and then the x² from the first part and the x² from the second part cancel out, leaving something much smaller and much easier. That only happens if the minus is handled properly, so the cancelling is really a check on your sign work. Work in this order: expand the twins with the difference-of-squares shortcut, expand the square with the three-term pattern, write the second answer inside a bracket, flip every sign inside it, then collect. Six x, minus twenty five, minus nine. Thirty four altogether.", af: "Hier gebeur iets verrassends, en dit is die rede waarom die vraag bestaan. Jy begin met twee gekwadreerde hakies, dus verwag jy 'n antwoord met 'n x² daarin, en dan kanselleer die x² van die eerste deel en die x² van die tweede deel, en iets baie kleiner en baie makliker bly oor. Dit gebeur net as die minus reg hanteer word, dus is die kansellering eintlik 'n toets van jou tekenwerk. Werk in hierdie volgorde: brei die tweelinge uit met die kortpad vir die verskil van twee vierkante, brei die kwadraat uit met die patroon met drie terme, skryf die tweede antwoord binne 'n hakie, draai elke teken daarin om, en versamel dan. Ses x, minus vyf-en-twintig, minus nege. Altesaam vier-en-dertig.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Hence calculate the value of &nbsp;105 × 95 − 97².", af: "<em>Sonder 'n sakrekenaar.</em><br>Bereken gevolglik die waarde van &nbsp;105 × 95 − 97².",
      },
      hint: {
        en: "The word “hence” means you are meant to use the answer to (a), not start again. Look at 105, 95 and 97 and ask what one number they are all sitting close to.", af: "Die woord “gevolglik” beteken jy moet die antwoord van (a) gebruik, nie van voor af begin nie. Kyk na 105, 95 en 97 en vra naby watter een getal hulle almal lê.",
      },
      memo: [
        { type: "step", text: { en: "105 = 100 + 5, &nbsp;95 = 100 − 5&nbsp; and&nbsp; 97 = 100 − 3, &nbsp;so this is exactly the expression in (a) with x = 100.", af: "105 = 100 + 5, &nbsp;95 = 100 − 5&nbsp; en&nbsp; 97 = 100 − 3, &nbsp;dus is dit presies die uitdrukking in (a) met x = 100." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴&nbsp; 6(100) − 34 = 600 − 34 = 566", af: "∴&nbsp; 6(100) − 34 = 600 − 34 = 566" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: “hence” is an instruction, not a suggestion. Multiplying 105 by 95 by hand may get you there, but it is not what the marks are for — and 97² by hand is exactly the kind of long multiplication this question is designed to let you skip.", af: "PASOP: “gevolglik” is 'n opdrag, nie 'n voorstel nie. As jy 105 met 95 met die hand vermenigvuldig, kom jy dalk daar, maar dit is nie waarvoor die punte is nie, en 97² met die hand is presies die soort lang vermenigvuldiging wat hierdie vraag jou wil laat oorslaan.",
        } },
      ],
      esplain: {
        en: "This is the whole reason algebra exists, shown in two lines. Three ugly numbers turn out to be one friendly number wearing three disguises: a hundred plus five, a hundred minus five, and a hundred minus three. Once you spot the hundred, the question you already answered in part (a) does all the work, because the algebra was never about x in particular — it was about any number at all. Substituting a hundred into 6x − 34 takes about two seconds. The habit worth taking away is the noticing. Whenever a no-calculator question hands you numbers clustered around a round hundred or thousand, the examiner is asking you to name that round number and let the algebra swallow the mess.", af: "Dit is die hele rede waarom algebra bestaan, in twee reëls gewys. Drie lelike getalle blyk een vriendelike getal te wees wat drie vermommings dra: honderd plus vyf, honderd minus vyf, en honderd minus drie. Sodra jy die honderd raaksien, doen die vraag wat jy reeds in deel (a) beantwoord het al die werk, want die algebra het nooit spesifiek oor x gegaan nie: dit het oor enige getal gegaan. Om honderd in 6x − 34 te vervang, vat omtrent twee sekondes. Die gewoonte wat die moeite werd is om saam te neem, is die raaksien. Wanneer 'n vraag sonder sakrekenaar jou getalle gee wat om 'n ronde honderd of duisend saamdrom, vra die eksaminator jou om daardie ronde getal te benoem en die algebra die gemors te laat insluk.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — SURDS INSIDE A PRODUCT (the bridge to Exponents & Surds).
   (a) (2√3 + 5)(√3 − 4) = −14 − 3√3
   (b) (√7 − √2)²        = 9 − 2√14
   --------------------------------------------------------------- */
const q6 = {
  id: "algx.sib.ex.q6",
  chapter: CH,
  topic: "expand",
  archetype: "gr10-expand-a-product-containing-surds",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Expand and simplify, leaving your answer in simplest surd form: &nbsp;(2√3 + 5)(√3 − 4)", af: "<em>Sonder 'n sakrekenaar.</em><br>Brei uit en vereenvoudig, en laat jou antwoord in die eenvoudigste wortelvorm: &nbsp;(2√3 + 5)(√3 − 4)",
      },
      hint: {
        en: "Expand it exactly like any other pair of brackets — four products. The only new thing is that √3 × √3 is a whole number, so watch for that one collapsing.", af: "Brei dit presies soos enige ander paar hakies uit: vier produkte. Die enigste nuwe ding is dat √3 × √3 'n heelgetal is, dus let op hoe daardie een inmekaar val.",
      },
      memo: [
        { type: "step", text: { en: "Four products, exactly as usual: &nbsp;2√3·√3 &nbsp;−&nbsp; 8√3 &nbsp;+&nbsp; 5√3 &nbsp;−&nbsp; 20", af: "Vier produkte, presies soos gewoonlik: &nbsp;2√3·√3 &nbsp;−&nbsp; 8√3 &nbsp;+&nbsp; 5√3 &nbsp;−&nbsp; 20" }, ticks: ["ca"] },
        { type: "step", text: { en: "√3 · √3 = 3, &nbsp;so&nbsp; 2√3·√3 = 2(3) = 6, &nbsp;and the two surd terms collect: &nbsp;−8√3 + 5√3 = −3√3", af: "√3 · √3 = 3, &nbsp;dus&nbsp; 2√3·√3 = 2(3) = 6, &nbsp;en die twee wortelvormterme word versamel: &nbsp;−8√3 + 5√3 = −3√3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; 6 − 20 − 3√3 = −14 − 3√3", af: "∴&nbsp; 6 − 20 − 3√3 = −14 − 3√3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: only the whole numbers may be added to the whole numbers, and only the √3 terms to the √3 terms. −14 and −3√3 cannot be squashed into one term, so the answer stays as two pieces — that is what “simplest surd form” means here.", af: "ONTHOU: net die heelgetalle mag by die heelgetalle getel word, en net die √3-terme by die √3-terme. −14 en −3√3 kan nie in een term saamgedruk word nie, dus bly die antwoord twee stukke: dit is wat “eenvoudigste wortelvorm” hier beteken.",
        } },
      ],
      esplain: {
        en: "A surd behaves like a letter right up until two identical surds meet each other. So while you are expanding, treat √3 as if it were an x: 2x times x, 2x times −4, 5 times x, 5 times −4. Now the one place a surd is different. Two of the same root multiplied together undo the root, so √3 times √3 is simply 3 and that term stops being a surd at all. It joins the whole numbers. Everything else keeps its √3 and joins the other surd term. You end with two piles that cannot be mixed — the plain numbers, which give −14, and the √3 pile, which gives −3√3.", af: "'n Wortelvorm gedra hom soos 'n letter, tot net wanneer twee identiese wortelvorme mekaar ontmoet. Terwyl jy uitbrei, behandel √3 dus asof dit 'n x is: 2x maal x, 2x maal −4, 5 maal x, 5 maal −4. Nou die een plek waar 'n wortelvorm anders is. Twee van dieselfde wortel met mekaar vermenigvuldig, hef die wortel op, dus is √3 maal √3 eenvoudig 3, en daardie term is glad nie meer 'n wortelvorm nie. Dit sluit by die heelgetalle aan. Alles anders hou sy √3 en sluit by die ander wortelvormterm aan. Jy eindig met twee hopies wat nie gemeng kan word nie: die gewone getalle, wat −14 gee, en die √3-hopie, wat −3√3 gee.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Expand and simplify: &nbsp;(√7 − √2)²", af: "Brei uit en vereenvoudig: &nbsp;(√7 − √2)²",
      },
      hint: {
        en: "It is still first squared, minus twice the product, plus last squared. Squaring a square root cancels it — and the middle term needs the surd law that lets two roots become one.", af: "Dit is steeds eerste gekwadreer, minus twee keer die produk, plus laaste gekwadreer. As jy 'n vierkantswortel kwadreer, val die wortel weg, en die middelste term het die wortelvormwet nodig wat van twee wortels een maak.",
      },
      memo: [
        { type: "step", text: { en: "Use &nbsp;(a − b)² = a² − 2ab + b², &nbsp;with a = √7 and b = √2.", af: "Gebruik &nbsp;(a − b)² = a² − 2ab + b², &nbsp;met a = √7 en b = √2." }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (√7)² − 2(√7)(√2) + (√2)² = 7 − 2√14 + 2", af: "= (√7)² − 2(√7)(√2) + (√2)² = 7 − 2√14 + 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; 9 − 2√14", af: "∴&nbsp; 9 − 2√14" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (√7 − √2)² is NOT 7 − 2. The middle term is where two of the three marks live. And √7 · √2 = √14, not √9 — roots multiply underneath, they never add.", af: "PASOP: (√7 − √2)² is NIE 7 − 2 nie. Die middelste term is waar twee van die drie punte lê. En √7 · √2 = √14, nie √9 nie: wortels vermenigvuldig onder die wortelteken, hulle tel nooit op nie.",
        } },
      ],
      esplain: {
        en: "Two rules meet in this one line, and both of them are easy to say out loud. The first: squaring a square root cancels it, so √7 squared is just 7 and √2 squared is just 2. The second: two roots multiplied together join underneath one root sign, so √7 times √2 is √14. Put those into the three-term square pattern and the answer builds itself. The number in front of the middle term is the 2 from the pattern, not anything to do with the 2 under the root — that coincidence catches people, so write the pattern out in letters first and substitute afterwards. Finally, 7 and 2 add to 9, and √14 will not simplify further because 14 has no square factor.", af: "Twee wette kom in hierdie een reël bymekaar, en albei is maklik om hardop te sê. Die eerste: as jy 'n vierkantswortel kwadreer, val die wortel weg, dus is √7 gekwadreer net 7 en √2 gekwadreer net 2. Die tweede: twee wortels wat met mekaar vermenigvuldig word, kom onder een wortelteken bymekaar, dus is √7 maal √2 gelyk aan √14. Sit dit in die kwadraatpatroon met drie terme, en die antwoord bou homself. Die getal voor die middelste term is die 2 uit die patroon, en het niks te doen met die 2 onder die wortel nie: daardie toeval vang mense uit, dus skryf eers die patroon in letters uit en vervang daarna. Laastens tel 7 en 2 op tot 9, en √14 vereenvoudig nie verder nie, want 14 het geen volkome vierkant as faktor nie.",
      },
    },
  ],
};

export const algxExpandSiblingQuestions = [q1, q2, q3, q4, q5, q6];
