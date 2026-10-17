/* ============================================================
   EXAM FOCUS — Exponents & Surds · SIBLING CARDS for the skill
   "surds" (Working with surds).
   (SESSION B of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/B-exp.md.)
   ------------------------------------------------------------
   TWO new cards, taking the tile from four to six.

   WHAT WAS ALREADY THERE, so that nothing here repeats a shape:
     · exp.fsm.t1q1(a) √48 + √300 − √27 — add and subtract SQUARE
       roots of plain numbers;
     · exp.cr.q1(a) ∛54 − ∛16 — the same, one index up;
     · exp.cr.q1(b) (2√3 − √5)(2√3 + √5) — difference of squares;
     · exp.cr.q1(c) (√7 + √2)² — the squared binomial that keeps its
       middle term.
   So the two missing moves are the two built here:
     q1  a surd ADDED TO a fraction that has a surd underneath — the
         answer is not finished until the denominator is clean
         (her Test 6 Q2 shape, fresh numbers);
     q2  surds carrying a VARIABLE, where a letter earns a ticket out
         on exactly the same rule a number does.

   METHOD: METHODS-algebra.md, hers verbatim — A8 prime factors first
   and "tickets out" (her word, required in the hint); A9 the surd laws
   and the BIG NO-NO (√x + √y ≠ √(x + y)), and her habit of keeping the
   coefficient visible while counting; A11 rationalising a monomial
   denominator by multiplying by the surd over itself; F15 — a final
   answer is fully simplified AND rationalised.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 "no-calculator opening
   block (surds …)"; SURVEY-Her-2025-Assessments.md Test 6 Q2
   ("simplify √108 + 12/√75-style surd expression") and Test 1 Q1;
   SURVEY-Nov-P1.md Q2(a) √(98x⁶) + √2x⁰/x⁻³. Fresh radicands.

   LEVELS: 3 and 2. The tile's four existing cards are 1, 1, 2, 2, so
   the six together run two of each. NOTHING here is level 4.
   NO DIAGRAM.
   ============================================================ */

const PAPER = "siblings";
const CH = "exp";

/* ---------------------------------------------------------------
   q1 — √128 + 20/√50 = 10√2. Simplify BOTH pieces, rationalise the
   second, and only then add.
   --------------------------------------------------------------- */
const q1 = {
  id: "exp.sib.srd.q1",
  chapter: CH,
  topic: "surds",
  archetype: "simplify-a-surd-plus-a-fraction-with-a-surd-denominator",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>Without the use of a calculator.</em><br>Simplify: &nbsp;√128 + 20/√50", af: "<em>Sonder die gebruik van 'n sakrekenaar.</em><br>Vereenvoudig: &nbsp;√128 + 20/√50",
      },
      hint: {
        en: "Prime factors first for both numbers, and hunt for the pairs with tickets out. Then look hard at the second term — a surd is never allowed to stay underneath a fraction bar.", af: "Eers priemfaktore vir albei getalle, en soek die pare met kaartjies uit. Kyk dan mooi na die tweede term: 'n wortelvorm mag nooit onder 'n breukstreep bly nie.",
      },
      memo: [
        { type: "step", text: { en: "Prime factors first, then look for the factors with <b>tickets out</b> — under a square root that means pairs.", af: "Eers priemfaktore, soek dan die faktore met <b>kaartjies uit</b>: onder 'n vierkantswortel beteken dit pare." } },
        { type: "step", text: { en: "√128 = √(2⁷) = √(2⁶ · 2) = 2³√2 = 8√2", af: "√128 = √(2⁷) = √(2⁶ · 2) = 2³√2 = 8√2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "√50 = √(5² · 2) = 5√2, &nbsp;so &nbsp;20/√50 = 20/(5√2) = 4/√2", af: "√50 = √(5² · 2) = 5√2, &nbsp;dus &nbsp;20/√50 = 20/(5√2) = 4/√2" }, ticks: ["ca"] },
        { type: "step", text: { en: "A surd may not be left underneath — multiply by that surd over itself: &nbsp;4/√2 × √2/√2 = 4√2/2 = 2√2", af: "'n Wortelvorm mag nie onder bly nie, so vermenigvuldig met daardie wortelvorm oor homself: &nbsp;4/√2 × √2/√2 = 4√2/2 = 2√2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "8√2 + 2√2 = 10√2", af: "8√2 + 2√2 = 10√2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: an answer is not finished while a surd is still sitting in a denominator. 4/√2 is the right value but not a final answer — rationalise it first, and only then are the two terms the same √ and allowed to be added.", af: "PASOP: 'n antwoord is nie klaar solank daar nog 'n wortelvorm in 'n noemer sit nie. 4/√2 is die regte waarde maar nie 'n finale antwoord nie: rasionaliseer dit eers, en eers dan het die twee terme dieselfde √ en mag hulle opgetel word.",
        } },
      ],
      esplain: {
        en: "Two terms that look unrelated turn out to be helpings of the same thing, and the work is all in getting them into the same shape. Under the first root sits 2 to the seventh, which is three complete pairs and a spare, so three 2s walk out as 8 and one 2 stays behind. The second term needs two moves: 50 is 25 times 2, so the root on the bottom becomes 5 root 2, and the 20 over 5 cancels to 4. That leaves 4 over root 2, which is a correct number but not a finished answer, because a surd may never be left underneath a fraction bar. Multiplying top and bottom by root 2 is multiplying by 1, so the value never moves — and it turns the bottom into a plain 2. Now both terms are lots of root 2, and adding them is just counting: eight plus two.", af: "Twee terme wat onverwant lyk, is eintlik porsies van dieselfde ding, en al die werk is om hulle in dieselfde vorm te kry. Onder die eerste wortel staan 2 tot die mag sewe, wat drie volle pare en 'n ekstra een is, so drie 2's stap uit as 8 en een 2 bly agter. Die tweede term het twee stappe nodig: 50 is 25 maal 2, so die wortel onder word 5 wortel 2, en die 20 oor 5 vereenvoudig tot 4. Dit laat 4 oor wortel 2, wat 'n korrekte getal is maar nie 'n finale antwoord nie, want 'n wortelvorm mag nooit onder 'n breukstreep bly nie. Om bo en onder met wortel 2 te vermenigvuldig, is om met 1 te vermenigvuldig, so die waarde verander nooit, en die noemer word 'n gewone 2. Nou is albei terme veelvoude van wortel 2, en optel is net tel: agt plus twee.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — surds with a variable: √(18x³) + x√(8x) = 5x√(2x), x ≥ 0.
   --------------------------------------------------------------- */
const q2 = {
  id: "exp.sib.srd.q2",
  chapter: CH,
  topic: "surds",
  archetype: "add-two-surds-carrying-a-variable-tickets-out-on-letters",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Simplify, given that x ≥ 0: &nbsp;√(18x³) + x√(8x)", af: "<em>Sonder 'n sakrekenaar.</em><br>Vereenvoudig, gegee dat x ≥ 0: &nbsp;√(18x³) + x√(8x)",
      },
      hint: {
        en: "Break every base up first — the letters as well as the numbers. A letter earns a ticket out of a square root on exactly the same rule a number does: it needs a pair.", af: "Breek eers elke grondtal op, die letters sowel as die getalle. 'n Letter verdien 'n kaartjie uit 'n vierkantswortel volgens presies dieselfde reël as 'n getal: dit het 'n paar nodig.",
      },
      memo: [
        { type: "step", text: { en: "Prime factors and powers first, and hunt for the pairs with <b>tickets out</b>. An x counts exactly like a number.", af: "Eers priemfaktore en magte, en soek die pare met <b>kaartjies uit</b>. 'n x tel presies soos 'n getal." } },
        { type: "step", text: { en: "√(18x³) = √(3² · 2 · x² · x) = 3x√(2x)", af: "√(18x³) = √(3² · 2 · x² · x) = 3x√(2x)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x√(8x) = x√(2² · 2 · x) = x · 2√(2x) = 2x√(2x)", af: "x√(8x) = x√(2² · 2 · x) = x · 2√(2x) = 2x√(2x)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "3x√(2x) + 2x√(2x) = 5x√(2x)", af: "3x√(2x) + 2x√(2x) = 5x√(2x)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: √(x³) is not x. Only a PAIR earns a ticket out, so x³ = x² · x hands ONE x out and leaves one x behind under the sign. And the x that was already standing in front of the second root never goes under it — it simply joins the coefficient.", af: "ONTHOU: √(x³) is nie x nie. Net 'n PAAR verdien 'n kaartjie uit, so x³ = x² · x stuur EEN x uit en los een x agter onder die wortelteken. En die x wat reeds voor die tweede wortel staan, gaan nooit onder dit in nie: dit sluit net by die koëffisiënt aan.",
        } },
      ],
      esplain: {
        en: "Letters behave exactly like numbers under a root sign, which is the whole point of this question. Eighteen x cubed is 3 squared times 2 times x squared times x, and the two things that come in pairs — the 3s and the x squared — are the ones with tickets out. So a 3 and an x walk out and a 2x stays behind. In the second term the x standing in front is already outside the root and stays where it is; inside, 8x is 4 times 2x, so a 2 walks out and joins that x to make 2x. Now both terms are lots of root 2x, so adding them is counting: three of them plus two of them is five of them. The condition x greater than or equal to zero is there so the root is real in the first place.", af: "Letters gedra hulle presies soos getalle onder 'n wortelteken, en dit is die hele punt van hierdie vraag. Agtien x tot die derde is 3 kwadraat maal 2 maal x kwadraat maal x, en die twee dinge wat in pare kom, die 3's en die x kwadraat, is dié met kaartjies uit. Dus stap 'n 3 en 'n x uit en 'n 2x bly agter. In die tweede term staan die x voor reeds buite die wortel en bly waar hy is; binne is 8x gelyk aan 4 maal 2x, so 'n 2 stap uit en sluit by daardie x aan om 2x te maak. Nou is albei terme veelvoude van wortel 2x, so optel is tel: drie van hulle plus twee van hulle is vyf van hulle. Die voorwaarde x groter as of gelyk aan nul is daar sodat die wortel in die eerste plek reëel is.",
      },
    },
  ],
};

export const expSurdsSiblingQuestions = [q1, q2];
