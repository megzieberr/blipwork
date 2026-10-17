/* ============================================================
   EXAM FOCUS — Exponents & Surds · No-solution & strategy
   ONE fresh question (topic top-up, belongs to no paper).
   (Overnight run #1, 2026-08-21.)
   ------------------------------------------------------------
   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 menu, "no-calculator
   opening block (… exponential equations …)", plus SURVEY-Nov-P1.md's
   "exponential equations reducing to a common base" (Nov P1 2023
   Q1(c) 2^(3x−6) = √8; Nov P1 2021 Q1(a)(1)) and her own EXP p35 /
   REVMEMO p20 k-substitution pair. Fresh bases, fresh numbers.

   SKELETON DISTANCE — checked against Sept T1 Q1 and Q2 and against
   js/exam/exp-conjugates-and-rationalising.js:
     · T1 2(a) is a RATIONAL-exponent equation (x to a fractional
       power); every part here has the x in the EXPONENT instead.
     · T1 2(c)'s let-K is on √x, a surd; (c) and (d) here let K be an
       exponential, and (d)'s difficulty is recognising 4ˣ = (2ˣ)²,
       which has no counterpart anywhere in T1.
     · No surds and no fractions appear in this question at all, so it
       shares nothing with the other exp top-up.

   METHOD: METHODS-algebra.md hers verbatim — A12 "guns and helmets"
   (bases = guns, exponents = helmets; when the guns are equal they
   shoot each other and the helmets fall to the ground), prime factors
   before equating; A13 the k-substitution, with the two-column
   convert-back and a negative K branch closing on "no solution";
   §0.3 her four "no answer" words, and flag F1's ruling — a positive
   base that cannot reach a negative value is **no solution**, never
   "undefined". Flag F4's broken example (5ˣ = 25 → x = 5) is NOT
   generated anywhere here.

   LEVELS: ramped 1 → 2 → 3 → 4, with the ★ on (d), the only part where
   the needed fact (4ˣ = (2ˣ)²) is not written in the question.

   NO DIAGRAM. ⚠️ UNREGISTERED — same four registration steps as
   js/exam/exp-first-step-and-method.js's header, including the missing
   `exp` scope wall in verify-exam.html Part 6.
   ============================================================ */

const q1 = {
  id: "exp.nss.q1",
  chapter: "exp",
  topic: "no-solution-and-strategy",
  archetype: "exponential-equations-same-base-then-let-k-with-a-dead-branch",
  lostQuest: { chapter: "exp", quest: "es8" },
  marks: 13,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>Answer the WHOLE of this question without a calculator.</em><br>Solve for x: &nbsp;2<sup>x−3</sup> = 16", af: "<em>Beantwoord hierdie HELE vraag sonder 'n sakrekenaar.</em><br>Los op vir x: &nbsp;2<sup>x−3</sup> = 16",
      },
      hint: {
        en: "Write the right-hand side as a power of 2 as well. Once both guns are the same, the helmets fall to the ground.", af: "Skryf die regterkant ook as 'n mag van 2. Sodra albei gewere dieselfde is, val die helms op die grond.",
      },
      memo: [
        { type: "step", text: { en: "2<sup>x−3</sup> = 2⁴ &nbsp;&nbsp;— the <b>guns</b> are now equal, so they shoot each other and the <b>helmets</b> fall to the ground", af: "2<sup>x−3</sup> = 2⁴ &nbsp;&nbsp;(die <b>gewere</b> is nou gelyk, dus skiet hulle mekaar en die <b>helms</b> val op die grond)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x − 3 = 4 &nbsp;&nbsp;∴ x = 7", af: "x − 3 = 4 &nbsp;&nbsp;∴ x = 7" }, ticks: ["a"] },
      ],
      esplain: {
        en: "An exponential equation is only solvable by hand when both sides can be made into powers of the SAME base — that is the one move the whole topic stands on. 16 is 2⁴, so both sides become powers of 2, and once the bases match the only way the two sides can be equal is if the exponents are equal too. The exponents drop down to become an ordinary little equation, and that is where the x is waiting. Do not skip writing 2⁴ down; that line is a mark on its own, because it is the line that makes the comparison legal.", af: "'n Eksponensiële vergelyking kan net met die hand opgelos word as albei kante as magte van DIESELFDE grondtal geskryf kan word: dit is die een stap waarop die hele onderwerp rus. 16 is 2⁴, dus word albei kante magte van 2, en sodra die grondtalle ooreenstem, kan die twee kante net gelyk wees as die eksponente ook gelyk is. Die eksponente sak af en word 'n gewone klein vergelyking, en daar wag die x. Moenie oorslaan om 2⁴ neer te skryf nie; daardie reël is op sy eie 'n punt werd, want dit is die reël wat dit wettig maak om die eksponente gelyk te stel.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Solve for x: &nbsp;9<sup>x+1</sup> = 27<sup>x−1</sup>", af: "<em>Sonder 'n sakrekenaar.</em><br>Los op vir x: &nbsp;9<sup>x+1</sup> = 27<sup>x−1</sup>",
      },
      hint: {
        en: "Neither side is a power of the other, but both are built from the same small prime. Break 9 and 27 down first, and remember that a power raised to a power multiplies the exponents.", af: "Nie een kant is 'n mag van die ander nie, maar albei is uit dieselfde klein priemgetal gebou. Breek eers 9 en 27 op, en onthou dat 'n mag tot 'n mag die eksponente vermenigvuldig.",
      },
      memo: [
        { type: "step", text: { en: "Prime factors first: &nbsp;9 = 3² &nbsp;and&nbsp; 27 = 3³.", af: "Eers priemfaktore: &nbsp;9 = 3² &nbsp;en&nbsp; 27 = 3³." } },
        { type: "step", text: { en: "(3²)<sup>x+1</sup> = (3³)<sup>x−1</sup> &nbsp;⟹&nbsp; 3<sup>2x+2</sup> = 3<sup>3x−3</sup>", af: "(3²)<sup>x+1</sup> = (3³)<sup>x−1</sup> &nbsp;⟹&nbsp; 3<sup>2x+2</sup> = 3<sup>3x−3</sup>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "the guns are equal, so equate the exponents: &nbsp;2x + 2 = 3x − 3", af: "die gewere is gelyk, dus stel die eksponente gelyk: &nbsp;2x + 2 = 3x − 3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = 5", af: "∴ x = 5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (3²)<sup>x+1</sup> is 3<sup>2x+2</sup>, not 3<sup>x+3</sup>. A power raised to a power <b>multiplies</b> the exponents, and the 2 has to reach both terms inside the bracket.", af: "PASOP: (3²)<sup>x+1</sup> is 3<sup>2x+2</sup>, nie 3<sup>x+3</sup> nie. 'n Mag tot 'n mag <b>vermenigvuldig</b> die eksponente, en die 2 moet albei terme binne die hakie bereik.",
        } },
      ],
      esplain: {
        en: "Nine and twenty-seven look like different worlds, but they are both made of 3s, and that is what makes this solvable without a calculator. Once each side is written as 3 to something, the equation is only asking when those two somethings are the same number. The one place to slow down is the bracket: raising 3² to the power (x + 1) multiplies the exponents, so the 2 has to be handed to BOTH the x and the 1. Get that expansion right and the rest is a linear equation you could have solved in Grade 9.", af: "Nege en sewe-en-twintig lyk soos verskillende wêrelde, maar albei is uit 3's gemaak, en dit is wat dit sonder 'n sakrekenaar oplosbaar maak. Sodra elke kant as 3 tot die mag iets geskryf is, vra die vergelyking net wanneer daardie twee eksponente dieselfde getal is. Die een plek waar jy stadiger moet gaan, is die hakie: as jy 3² tot die mag (x + 1) verhef, word die eksponente vermenigvuldig, dus moet die 2 aan ALBEI die x en die 1 gegee word. Kry daardie uitbreiding reg, en die res is 'n lineêre vergelyking wat jy in Graad 9 kon oplos.",
      },
    },
    {
      id: "c",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Solve for x: &nbsp;2<sup>2x</sup> − 10 · 2<sup>x</sup> + 16 = 0", af: "<em>Sonder 'n sakrekenaar.</em><br>Los op vir x: &nbsp;2<sup>2x</sup> − 10 · 2<sup>x</sup> + 16 = 0",
      },
      hint: {
        en: "Look at the shape rather than the numbers. What is 2<sup>2x</sup> the square of? Give that thing a short name and read the equation again.", af: "Kyk na die vorm eerder as na die getalle. Van watter ding is 2<sup>2x</sup> die kwadraat? Gee daardie ding 'n kort naam en lees die vergelyking weer.",
      },
      memo: [
        { type: "step", text: { en: "2<sup>2x</sup> is (2<sup>x</sup>)², so this is a quadratic wearing a disguise.", af: "2<sup>2x</sup> is (2<sup>x</sup>)², dus is dit 'n kwadratiese vergelyking in vermomming." } },
        { type: "step", text: { en: "let K = 2<sup>x</sup> &nbsp;&nbsp;(then K² = 2<sup>2x</sup>) &nbsp;⟹&nbsp; K² − 10K + 16 = 0", af: "stel K = 2<sup>x</sup> &nbsp;&nbsp;(dan is K² = 2<sup>2x</sup>) &nbsp;⟹&nbsp; K² − 10K + 16 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(K − 8)(K − 2) = 0 &nbsp;&nbsp;∴ K = 8 &nbsp;or&nbsp; K = 2", af: "(K − 8)(K − 2) = 0 &nbsp;&nbsp;∴ K = 8 &nbsp;of&nbsp; K = 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "2<sup>x</sup> = 2³ &nbsp;∴ x = 3", af: "2<sup>x</sup> = 2³ &nbsp;∴ x = 3" }, ticks: ["a"] },
        { type: "answer", text: { en: "2<sup>x</sup> = 2¹ &nbsp;∴ x = 1", af: "2<sup>x</sup> = 2¹ &nbsp;∴ x = 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: K is not the answer. Stopping at K = 8 and K = 2 loses the last two marks — you were asked for x, so every branch has to be walked back through 2<sup>x</sup> = K.", af: "PASOP: K is nie die antwoord nie. As jy by K = 8 en K = 2 stop, verloor jy die laaste twee punte: die vraag vra x, dus moet jy elke geval terugvervang in 2<sup>x</sup> = K.",
        } },
      ],
      esplain: {
        en: "The k-method is for equations that are secretly quadratics. Here 2<sup>2x</sup> is (2<sup>x</sup>)², so the equation holds one thing and its square — exactly the shape of ax² + bx + c. Naming the repeated thing K makes that visible, and then it factorises like any other trinomial. The discipline is in the walk back: K stands for 2<sup>x</sup>, so each K-value becomes its own little same-base equation. Both branches survive this time because 8 and 2 are both positive powers of 2 — which is worth noticing, because the next part is built around a branch that does not survive.", af: "Die k-metode is vir vergelykings wat eintlik kwadratiese vergelykings in vermomming is. Hier is 2<sup>2x</sup> gelyk aan (2<sup>x</sup>)², dus bevat die vergelyking een ding en sy kwadraat: presies die vorm van ax² + bx + c. As jy die herhaalde ding K noem, sien jy dit raak, en dan faktoriseer dit soos enige ander drieterm. Die dissipline lê in die terugvervanging: K staan vir 2<sup>x</sup>, dus word elke K-waarde sy eie klein vergelyking met dieselfde grondtal. Albei gevalle oorleef hierdie keer, want 8 en 2 is albei positiewe magte van 2, en dit is die moeite werd om raak te sien, want die volgende deel is gebou om 'n geval wat nie oorleef nie.",
      },
    },
    {
      id: "d",
      marks: 4,
      level: 4,
      prompt: {
        en: "<em>No calculator.</em><br>Solve for x: &nbsp;4<sup>x</sup> − 3 · 2<sup>x</sup> − 4 = 0", af: "<em>Sonder 'n sakrekenaar.</em><br>Los op vir x: &nbsp;4<sup>x</sup> − 3 · 2<sup>x</sup> − 4 = 0",
      },
      hint: {
        en: "The two bases are not the same yet — but one of them is built out of the other. Rewrite 4<sup>x</sup> as (2<sup>x</sup>)², let K = 2<sup>x</sup>, and an ordinary quadratic in K appears. Then think hard about what a power of 2 is allowed to equal.", af: "Die twee grondtalle is nog nie dieselfde nie, maar een is uit die ander gebou. Skryf 4<sup>x</sup> as (2<sup>x</sup>)², stel K = 2<sup>x</sup>, en 'n gewone kwadratiese vergelyking in K verskyn. Dink dan mooi na oor watter waarde 'n mag van 2 mag hê.",
      },
      memo: [
        { type: "step", text: { en: "The fact you have to fetch: &nbsp;4<sup>x</sup> = (2²)<sup>x</sup> = 2<sup>2x</sup> = (2<sup>x</sup>)². Once both bases are 2, the same K trick as (c) works.", af: "Die feit wat jy self moet gaan haal: &nbsp;4<sup>x</sup> = (2²)<sup>x</sup> = 2<sup>2x</sup> = (2<sup>x</sup>)². Sodra albei grondtalle 2 is, werk dieselfde K-truuk as in (c)." } },
        { type: "step", text: { en: "let K = 2<sup>x</sup> &nbsp;⟹&nbsp; K² − 3K − 4 = 0", af: "stel K = 2<sup>x</sup> &nbsp;⟹&nbsp; K² − 3K − 4 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(K − 4)(K + 1) = 0 &nbsp;&nbsp;∴ K = 4 &nbsp;or&nbsp; K = −1", af: "(K − 4)(K + 1) = 0 &nbsp;&nbsp;∴ K = 4 &nbsp;of&nbsp; K = −1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "2<sup>x</sup> = 2² &nbsp;∴ x = 2", af: "2<sup>x</sup> = 2² &nbsp;∴ x = 2" }, ticks: ["a"] },
        { type: "answer", text: { en: "2<sup>x</sup> ≠ −1 &nbsp;∴ no solution", af: "2<sup>x</sup> ≠ −1 &nbsp;∴ geen oplossing" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: a positive base can never reach a negative value, so 2<sup>x</sup> = −1 has <b>no solution</b>. Know which of her four words you need: “no solution” for this; “undefined” only for dividing by zero; “non-real” only for an even root of a negative; “N.A.” only for a surd-equation root that fails the test.", af: "ONTHOU: 'n positiewe grondtal kan nooit 'n negatiewe waarde bereik nie, dus het 2<sup>x</sup> = −1 <b>geen oplossing</b> nie. Weet watter een van haar vier woorde jy nodig het: “geen oplossing” vir hierdie een; “onbepaald” net vir deling deur nul; “nie-reëel” net vir 'n ewe wortel van 'n negatief; “n.v.t.” net vir 'n wortel van 'n wortelvormvergelyking wat die toets druip.",
        } },
      ],
      esplain: {
        en: "Two things make this the starred one. First, nothing in the question tells you the bases are related — you have to notice that 4 is 2², so 4<sup>x</sup> is (2<sup>x</sup>)², and only then does the k-method become available. Second, the second branch dies. K = −1 would need 2<sup>x</sup> to come out negative, and a positive base raised to any power is always positive: it can get enormous, it can get microscopically small, but it never crosses zero. So that branch is not an answer you forgot to find — it is genuinely no solution, and saying so IS the mark. Writing “undefined” there loses it, because undefined is reserved for dividing by zero. Bank the earlier marks first; this part is the one to sit with last.", af: "Twee dinge maak dit die een met die ster. Eerstens sê niks in die vraag vir jou dat die grondtalle verband hou nie: jy moet self raaksien dat 4 gelyk is aan 2², dus is 4<sup>x</sup> gelyk aan (2<sup>x</sup>)², en eers dan kan jy die k-metode gebruik. Tweedens sterf die tweede geval. K = −1 sou vereis dat 2<sup>x</sup> negatief uitkom, en 'n positiewe grondtal tot enige mag is altyd positief: dit kan reusagtig groot word, dit kan mikroskopies klein word, maar dit gaan nooit verby nul nie. Daardie geval is dus nie 'n antwoord wat jy vergeet het om te kry nie: dit is regtig geen oplossing, en om dit te sê, IS die punt. As jy “onbepaald” daar skryf, verloor jy dit, want onbepaald is vir deling deur nul gereserveer. Kry eers die vroeëre punte in die sak; hierdie deel is die een om laaste mee te sit.",
      },
    },
  ],
};

export const expNoSolutionAndStrategyQuestions = [q1];
