/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the skill
   "solution-count" (Two, one or no solution?).
   (SESSION H of the Exam Focus build day, 2026-08-23 —
   sessions/H-eq9-solution-count.md, her afternoon extension.)
   ------------------------------------------------------------
   SIX new cards for a brand-new tile, and a brand-new drill round to
   go with them: eq9 "Two, one or no solution?", which teaches her
   handwritten "Important Notes" box and then drills it.

   THE METHOD IS HERS, from the two pages she photographed on
   2026-08-23 (the same box as METHODS-algebra.md A14):
     · multiply with the RECIPROCAL of the exponent — switch numerator
       and denominator, so 3/4 × 4/3 = 1 and it cancels out;
     · EVEN NUMERATOR → ± answer;
     · ONLY ODD NUMBERS in numerator and denominator → a negative
       answer is fine;
     · an EVEN NUMBER in the numerator OR the denominator, with a
       negative on the right → it cannot happen, NO SOLUTION;
   and her four worked examples, whose layout every memo below copies:
   raise both sides to the power of the denominator, take the
   numerator-th root, then read the answer (or say it cannot happen).

   THE SIX, and what each one is for:
     q1  the plainest "how many, and why" — an EVEN numerator with a
       negative right-hand side, which is the one her Grade 11 learner
       keeps getting wrong;
     q2  three quick classifications on one card, one for each of the
       three answers, so the whole table is walked in three marks;
     q3  SOLVE, and the ± really appears: an even numerator with a
       positive right-hand side;
     q4  SOLVE, and the answer is NEGATIVE: only odd numbers, so it is
       allowed — her "odd numbers can be ⊖" example;
     q5  SOLVE, and there is nothing to find: an even DENOMINATOR with
       a negative right-hand side, which is her fourth worked example
       and the subtlest of the three no-solution cases;
     q6  HER CONTRAST: the same exponent twice, and only the sign on
       the right is different. One dies, one gives a ± pair.

   q1 and q6(a) are both "even numerator with a negative" on purpose.
   q1 asks for it cold; q6 puts it beside its twin so the learner can
   see that the sign alone decided it. That is the shape her own notes
   are built around.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1's no-calculator opening
   block (solve-for-x items, 2–5 marks) and its "state, with a reason"
   one-markers. Fresh exponents, fresh numbers.

   LEVELS: 1, 1·1·1, 2, 3, 2, 2·3. NOTHING here is level 4. NO DIAGRAM.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";
/* eq9 "Two, one or no solution?" — the round built alongside these
   cards, which teaches her box and then drills exactly this decision. */
const LOST = { chapter: CH, quest: "eq9" };

/* A pre-built stacked fraction. fracHtml (js/ui.js) leaves a ready-made
   .sfrac completely alone, which is the escape hatch for a fraction
   living inside a <sup> — the same one js/exam/eqn-k-method.js and
   js/exam/eqn-siblings-rational-exponents-k.js already use. */
const f = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;
/* x to a rational power, written the way she writes it */
const xp = (n, d) => `x<sup>${f(n, d)}</sup>`;

/* ---------------------------------------------------------------
   q1 — HOW MANY, AND WHY. x^(2/5) = −9: the numerator is even, so the
   left-hand side is an even power and can never be negative.
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.sc.q1",
  chapter: CH,
  topic: "solution-count",
  archetype: "state-how-many-solutions-with-a-reason-even-numerator-negative-side",
  paper: PAPER,
  lostQuest: LOST,
  marks: 2,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: `<em>Without solving the equation:</em><br>How many real solutions does &nbsp;${xp(2, 5)} = −9 &nbsp;have? Give a reason for your answer.`, af: `<em>Sonder om die vergelyking op te los:</em><br>Hoeveel reële oplossings het &nbsp;${xp(2, 5)} = −9? &nbsp;Gee 'n rede vir jou antwoord.`,
      },
      hint: {
        en: "You are not being asked to solve it. Look at the number on TOP of the exponent, and then at the sign on the right — those two things decide it on their own.", af: "Jy hoef dit nie op te los nie. Kyk na die getal BO in die eksponent, en dan na die teken aan die regterkant: daardie twee dinge besluit dit op hul eie.",
      },
      memo: [
        { type: "step", text: { en: `The numerator of the exponent is <b>2</b>, an <b>even</b> number, so ${xp(2, 5)} is an even power: &nbsp;${xp(2, 5)} = (<sup>5</sup>√x)²`, af: `Die teller van die eksponent is <b>2</b>, 'n <b>ewe</b> getal, dus is ${xp(2, 5)} 'n ewe mag: &nbsp;${xp(2, 5)} = (<sup>5</sup>√x)²` }, ticks: ["ca"] },
        { type: "answer", text: { en: "An even power is never negative &nbsp;∴ <b>no solution</b>", af: "'n Ewe mag is nooit negatief nie &nbsp;∴ <b>geen oplossing</b>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER which of her four words this is. It is <b>no solution</b> — something that can never be negative has been asked to be negative. It is not “undefined”, which is only for dividing by zero, and it is not “non-real”, which is for taking an even root OF a negative number.", af: "ONTHOU watter een van haar vier woorde dit is. Dit is <b>geen oplossing</b>: iets wat nooit negatief kan wees nie, moet hier negatief wees. Dit is nie “onbepaald” nie, wat net vir deling deur nul is, en dit is nie “nie-reëel” nie, wat vir 'n ewe wortel VAN 'n negatiewe getal is.",
        } },
      ],
      esplain: {
        en: "There is a shortcut here and it is the whole point of the question. A fractional exponent is a root and a power stacked together: the bottom number is the root, the top number is the power. Here the top number is two, so whatever the fifth root of x turns out to be, it gets squared before it is compared with the right-hand side. Squaring anything real gives something that is zero or positive, never negative. So the left-hand side simply cannot reach minus nine, no matter what x is, and there is nothing to solve. Her rule says it faster: an even number on top, with a negative on the right, means no solution.", af: "Hier is 'n kortpad, en dit is die hele doel van die vraag. 'n Breuk-eksponent is 'n wortel en 'n mag bo-op mekaar: die onderste getal is die wortel, die boonste getal is die mag. Hier is die boonste getal twee, so wat die vyfdemagswortel van x ook al is, dit word gekwadreer voordat dit met die regterkant vergelyk word. As jy enigiets reëels kwadreer, kry jy iets wat nul of positief is, nooit negatief nie. Die linkerkant kan dus eenvoudig nie minus nege bereik nie, maak nie saak wat x is nie, en daar is niks om op te los nie. Haar reël sê dit vinniger: 'n ewe getal bo, met 'n negatief aan die regterkant, beteken geen oplossing.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — THREE QUICK ONES, one for each answer.
   (a) x^(4/7) = 5   → even numerator, positive side → TWO
   (b) x^(5/3) = −7  → only odd numbers → ONE, and it is negative
   (c) x^(1/4) = −6  → even denominator, negative side → NONE
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.sc.q2",
  chapter: CH,
  topic: "solution-count",
  archetype: "three-equations-state-two-one-or-no-solutions-with-reasons",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: { en: `${xp(4, 7)} = 5`, af: `${xp(4, 7)} = 5` },
      hint: { en: "Top number first: odd or even? Then the sign on the right.", af: "Eers die boonste getal: onewe of ewe? Dan die teken aan die regterkant." },
      memo: [
        { type: "answer", text: { en: "<b>Two solutions.</b> The numerator 4 is EVEN and the right-hand side is positive, so the answer carries a ± &nbsp;(even numerator → ± answer)", af: "<b>Twee oplossings.</b> Die teller 4 is EWE en die regterkant is positief, dus kry die antwoord 'n ± &nbsp;(ewe teller → ±-antwoord)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The bottom of the exponent is seven, which is an odd root, and an odd root is happy with any real number — so nothing is ruled out before you start. The top is four, which is an even power. Undoing an even power is where a plus-or-minus comes from, in exactly the same way that solving x squared equals nine gives both three and minus three. The right-hand side is positive, so both branches survive and there really are two answers. Her rule is the short version: an even numerator gives a ± answer.", af: "Die onderste getal van die eksponent is sewe, 'n onewe wortel, en 'n onewe wortel is tevrede met enige reële getal, so niks word uitgesluit voordat jy begin nie. Die boonste getal is vier, 'n ewe mag. Om 'n ewe mag ongedaan te maak, is waar 'n plus-of-minus vandaan kom, presies soos wanneer jy x kwadraat is gelyk aan nege oplos en beide drie en minus drie kry. Die regterkant is positief, so albei takke oorleef en daar is regtig twee antwoorde. Haar reël is die kort weergawe: 'n ewe teller gee 'n ±-antwoord.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: { en: `${xp(5, 3)} = −7`, af: `${xp(5, 3)} = −7` },
      hint: { en: "Are BOTH numbers in the exponent odd? If they are, a negative answer is allowed.", af: "Is ALBEI getalle in die eksponent onewe? As hulle is, is 'n negatiewe antwoord toegelaat." },
      memo: [
        { type: "answer", text: { en: "<b>One solution.</b> Only odd numbers in the exponent (5 and 3), so a negative answer is allowed &nbsp;— there is exactly one real value, and it is negative", af: "<b>Een oplossing.</b> Net onewe getalle in die eksponent (5 en 3), dus is 'n negatiewe antwoord toegelaat; &nbsp;daar is presies een reële waarde, en dit is negatief" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Both numbers in this exponent are odd, and that is the friendly case. The bottom is a cube root, which keeps the sign of whatever is inside it, and the top is an odd power, which also keeps the sign. Nothing anywhere in the chain forces the left-hand side to be positive, so it can reach minus seven — and because odd powers and odd roots each give exactly one answer, there is no plus-or-minus to worry about either. One value of x, and it is a negative one. This is the case her notes cheer about: found one that works.", af: "Albei getalle in hierdie eksponent is onewe, en dit is die vriendelike geval. Die onderste getal gee 'n derdemagswortel, wat die teken behou van wat ook al binne-in is, en die boonste is 'n onewe mag, wat ook die teken behou. Niks in die hele ketting dwing die linkerkant om positief te wees nie, so dit kan minus sewe bereik, en omdat onewe magte en onewe wortels elk presies een antwoord gee, is daar ook geen plus-of-minus om oor bekommerd te wees nie. Een waarde van x, en dit is 'n negatiewe een. Dit is die geval waaroor haar notas juig: een gevind wat werk.",
      },
    },
    {
      id: "c",
      marks: 1,
      level: 1,
      prompt: { en: `${xp(1, 4)} = −6`, af: `${xp(1, 4)} = −6` },
      hint: { en: "The bottom number is the ROOT. What kind of root is a fourth root, and may it come out negative?", af: "Die onderste getal is die WORTEL. Watter soort wortel is 'n vierdemagswortel, en mag dit negatief uitkom?" },
      memo: [
        { type: "answer", text: { en: "<b>No solution.</b> The denominator 4 is EVEN, so the left-hand side is <sup>4</sup>√x, and an even root of a real number is never negative", af: "<b>Geen oplossing.</b> Die noemer 4 is EWE, dus is die linkerkant <sup>4</sup>√x, en 'n ewe wortel van 'n reële getal is nooit negatief nie" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The bottom of the exponent is four, so this equation is really the fourth root of x, and the top is a one, so nothing is done to it afterwards. An even root of a real number is never negative, for the same reason a square root never is: raising anything real to an even power gives something positive, so the root has to come back positive too. It can never equal minus six. Notice this is a different reason from the even-numerator case, even though the answer word is the same — here it is the ROOT that refuses, not the power.", af: "Die onderste getal van die eksponent is vier, so hierdie vergelyking is eintlik die vierdemagswortel van x, en die boonste is 'n een, so niks word daarna daaraan gedoen nie. 'n Ewe wortel van 'n reële getal is nooit negatief nie, om dieselfde rede dat 'n vierkantswortel dit nooit is nie: as jy enigiets reëels tot 'n ewe mag verhef, kry jy iets positiefs, so die wortel moet ook positief terugkom. Dit kan nooit gelyk wees aan minus ses nie. Let op dat dit 'n ander rede is as by die ewe teller, al is die antwoordwoord dieselfde: hier is dit die WORTEL wat weier, nie die mag nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — SOLVE, and the ± really appears.
   x^(2/3) = 9 → (∛(x²))³ = 9³ = 729 → √(x²) = √729 = 27 → x = ±27
   check: (−27)^(2/3) = ((−27)^(1/3))² = (−3)² = 9  ✓
   --------------------------------------------------------------- */
const q3 = {
  id: "eqn.sib.sc.q3",
  chapter: CH,
  topic: "solution-count",
  archetype: "solve-rational-exponent-even-numerator-two-answers",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: `<em>Without the use of a calculator.</em><br>Solve for x: &nbsp;${xp(2, 3)} = 9`, af: `<em>Sonder die gebruik van 'n sakrekenaar.</em><br>Los op vir x: &nbsp;${xp(2, 3)} = 9`,
      },
      hint: {
        en: "Raise both sides to the power of the DENOMINATOR first, then take the numerator-th root. And before you write the last line, check the numerator: is it odd or even?", af: "Verhef albei kante eers tot die mag van die NOEMER, en trek dan die wortel wat die teller aandui. En voordat jy die laaste reël skryf, kyk na die teller: is dit onewe of ewe?",
      },
      memo: [
        { type: "step", text: { en: `(<sup>3</sup>√(x²))³ = (9)³`, af: `(<sup>3</sup>√(x²))³ = (9)³` }, ticks: ["s/f"] },
        { type: "step", text: { en: "√(x²) = √729 &nbsp;&nbsp;— the numerator is <b>2</b>, an EVEN number, so the answer carries a <b>±</b>", af: "√(x²) = √729 &nbsp;&nbsp;Let op: die teller is <b>2</b>, 'n EWE getal, dus kry die antwoord 'n <b>±</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = ±27", af: "∴ x = ±27" }, ticks: ["a"] },
        { type: "step", text: { en: `<b>OR</b> — the reciprocal route (same marks): &nbsp;multiply the exponent by ${f("3", "2")}, so &nbsp;x = 9<sup>${f("3", "2")}</sup> = (√9)³ = 3³ = 27, &nbsp;and the even numerator gives &nbsp;x = ±27`, af: `<b>OF</b>, die resiprook-roete (dieselfde punte): &nbsp;vermenigvuldig die eksponent met ${f("3", "2")}, dus &nbsp;x = 9<sup>${f("3", "2")}</sup> = (√9)³ = 3³ = 27, &nbsp;en die ewe teller gee &nbsp;x = ±27` } },
        { type: "trap", text: {
          en: "WATCH OUT: the ± is not decoration and it is not optional. Test the negative one and it works — the cube root of −27 is −3, and (−3)² = 9. Losing it costs the accuracy mark every time.", af: "PASOP: die ± is nie versiering nie en dit is nie opsioneel nie. Toets die negatiewe een en dit werk: die derdemagswortel van −27 is −3, en (−3)² = 9. As jy dit verloor, kos dit elke keer die akkuraatheidspunt.",
        } },
      ],
      esplain: {
        en: "Her method is to undo the exponent in one move by multiplying it by its upside-down twin, because two thirds times three halves is one, and an exponent of one leaves a bare x. Whatever you do to the left you do to the right, so the nine gets the same treatment: nine to the three halves is the square root of nine, cubed, which is twenty-seven. Then comes the part people forget. The exponent you started with had a two on top, an even number, and undoing an even power always opens two doors. So the answer is plus or minus twenty-seven, not just the positive one, and the negative really does check out.", af: "Haar metode is om die eksponent in een beweging ongedaan te maak deur dit met sy onderstebo-tweeling te vermenigvuldig, want twee derdes maal drie halwes is een, en 'n eksponent van een laat net x oor. Wat jy aan die linkerkant doen, doen jy aan die regterkant, so die nege kry dieselfde behandeling: nege tot die mag drie halwes is die vierkantswortel van nege, tot die derde mag, en dit is sewe-en-twintig. Dan kom die deel wat mense vergeet. Die eksponent waarmee jy begin het, het 'n twee bo gehad, 'n ewe getal, en om 'n ewe mag ongedaan te maak, maak altyd twee deure oop. Die antwoord is dus plus of minus sewe-en-twintig, nie net die positiewe een nie, en die negatiewe een klop regtig.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — SOLVE, and the answer is NEGATIVE.
   x^(3/5) = −8 → (⁵√(x³))⁵ = (−8)⁵ = −32 768 → ³√(x³) = ³√(−32 768) = −32
   check: (−32)^(3/5) = ((−32)^(1/5))³ = (−2)³ = −8  ✓
   --------------------------------------------------------------- */
const q4 = {
  id: "eqn.sib.sc.q4",
  chapter: CH,
  topic: "solution-count",
  archetype: "solve-rational-exponent-odd-over-odd-negative-answer",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 3,
      prompt: {
        en: `<em>Without the use of a calculator.</em><br>Solve for x: &nbsp;${xp(3, 5)} = −8`, af: `<em>Sonder die gebruik van 'n sakrekenaar.</em><br>Los op vir x: &nbsp;${xp(3, 5)} = −8`,
      },
      hint: {
        en: "Do not throw this one out because of the minus. Check BOTH numbers in the exponent first — if they are both odd, a negative answer is allowed, and then it is an ordinary reciprocal question.", af: "Moenie hierdie een uitgooi as gevolg van die minus nie. Kyk eers na ALBEI getalle in die eksponent: as hulle albei onewe is, is 'n negatiewe antwoord toegelaat, en dan is dit 'n gewone resiprook-vraag.",
      },
      memo: [
        { type: "step", text: { en: "Both numbers in the exponent are ODD (3 and 5), so a negative answer is allowed here", af: "Albei getalle in die eksponent is ONEWE (3 en 5), dus is 'n negatiewe antwoord hier toegelaat" }, ticks: ["ca"] },
        { type: "step", text: { en: `(<sup>5</sup>√(x³))<sup>5</sup> = (−8)<sup>5</sup> = −32&nbsp;768`, af: `(<sup>5</sup>√(x³))<sup>5</sup> = (−8)<sup>5</sup> = −32&nbsp;768` }, ticks: ["s/f"] },
        { type: "answer", text: { en: "<sup>3</sup>√(x³) = <sup>3</sup>√(−32&nbsp;768) &nbsp;&nbsp;∴ x = −32", af: "<sup>3</sup>√(x³) = <sup>3</sup>√(−32&nbsp;768) &nbsp;&nbsp;∴ x = −32" }, ticks: ["a"] },
        { type: "step", text: { en: `<b>OR</b> — the reciprocal route (same marks): &nbsp;x = (−8)<sup>${f("5", "3")}</sup> = (<sup>3</sup>√(−8))<sup>5</sup> = (−2)<sup>5</sup> = −32`, af: `<b>OF</b>, die resiprook-roete (dieselfde punte): &nbsp;x = (−8)<sup>${f("5", "3")}</sup> = (<sup>3</sup>√(−8))<sup>5</sup> = (−2)<sup>5</sup> = −32` } },
        { type: "trap", text: {
          en: "WATCH OUT: there is <b>no ±</b> here. The ± comes from an EVEN numerator, and this numerator is 3. Writing x = ±32 hands in an answer that fails: 32<sup>3/5</sup> = 2³ = 8, not −8.", af: "PASOP: hier is <b>geen ±</b> nie. Die ± kom van 'n EWE teller, en hierdie teller is 3. As jy x = ±32 skryf, gee jy 'n antwoord in wat misluk: 32<sup>3/5</sup> = 2³ = 8, nie −8 nie.",
        } },
      ],
      esplain: {
        en: "The minus sign is the whole test in this question, and it is allowed to stay. The bottom of the exponent is five, an odd root, and odd roots keep the sign of whatever is inside them. The top is three, an odd power, which also keeps the sign. So nothing in the chain forces the left-hand side to be positive, and a negative x is exactly what is needed. The tidiest route is her reciprocal: raise both sides to five thirds, take the cube root of minus eight to get minus two, then raise that to the fifth power to get minus thirty-two. Check it backwards if you like — the fifth root of minus thirty-two is minus two, and minus two cubed is minus eight.", af: "Die minusteken is die hele toets in hierdie vraag, en dit mag bly. Die onderste getal van die eksponent is vyf, 'n onewe wortel, en onewe wortels behou die teken van wat ook al binne-in hulle is. Die boonste is drie, 'n onewe mag, wat ook die teken behou. Niks in die ketting dwing die linkerkant dus om positief te wees nie, en 'n negatiewe x is presies wat nodig is. Die netjiesste roete is haar resiprook: verhef albei kante tot vyf derdes, trek die derdemagswortel van minus agt om minus twee te kry, en verhef dit dan tot die vyfde mag om minus twee-en-dertig te kry. Toets dit agteruit as jy wil: die vyfdemagswortel van minus twee-en-dertig is minus twee, en minus twee tot die derde mag is minus agt.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — SOLVE, and there is nothing to find. Her fourth worked example.
   x^(3/2) = −27: the denominator is even, so the left side is (√x)³,
   which is never negative.
   --------------------------------------------------------------- */
const q5 = {
  id: "eqn.sib.sc.q5",
  chapter: CH,
  topic: "solution-count",
  archetype: "solve-rational-exponent-even-denominator-no-solution",
  paper: PAPER,
  lostQuest: LOST,
  marks: 2,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: `Solve for x: &nbsp;${xp(3, 2)} = −27, &nbsp;or show that the equation has no solution.`, af: `Los op vir x: &nbsp;${xp(3, 2)} = −27, &nbsp;of toon aan dat die vergelyking geen oplossing het nie.`,
      },
      hint: {
        en: "The bottom number is the root. Write the left-hand side out as a root and a power and ask whether the root itself is ever allowed to be negative.", af: "Die onderste getal is die wortel. Skryf die linkerkant uit as 'n wortel en 'n mag, en vra of die wortel self ooit negatief mag wees.",
      },
      memo: [
        { type: "step", text: { en: `The denominator is <b>2</b>, an EVEN number, so &nbsp;${xp(3, 2)} = (√x)³, &nbsp;and √x is never negative`, af: `Die noemer is <b>2</b>, 'n EWE getal, dus &nbsp;${xp(3, 2)} = (√x)³, &nbsp;en √x is nooit negatief nie` }, ticks: ["ca"] },
        { type: "answer", text: { en: "(√x)³ can never equal −27 &nbsp;&nbsp;∴ <b>no solution</b>", af: "(√x)³ kan nooit gelyk wees aan −27 nie &nbsp;&nbsp;∴ <b>geen oplossing</b>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: `WATCH OUT: raising both sides to ${f("2", "3")} anyway hands you x = 9, and 9 does not work — 9<sup>${f("3", "2")}</sup> = (√9)³ = 27, which is <b>+</b>27. The reciprocal move hides the minus, exactly the way squaring both sides of a surd equation does. Her rule catches it before you start: an EVEN number anywhere in the exponent, with a negative on the right, means no solution.`, af: `PASOP: as jy albei kante in elk geval tot ${f("2", "3")} verhef, kry jy x = 9, en 9 werk nie: 9<sup>${f("3", "2")}</sup> = (√9)³ = 27, en dit is <b>+</b>27. Die resiprook-stap steek die minus weg, presies soos wanneer jy albei kante van 'n wortelvormvergelyking kwadreer. Haar reël vang dit voordat jy begin: 'n EWE getal iewers in die eksponent, met 'n negatief aan die regterkant, beteken geen oplossing.`,
        } },
      ],
      esplain: {
        en: "This one looks solvable and is not, which is why it is worth two marks rather than three. The bottom of the exponent is two, so the left-hand side starts with a square root, and a square root of a real number is never negative. Cubing something that is never negative still never gives a negative, so the left-hand side can never reach minus twenty-seven. There is no x that works. The dangerous move is to raise both sides to two thirds without thinking — that produces nine, which looks like an answer until you put it back and get plus twenty-seven. Checking your answer in the original equation catches it; her rule catches it sooner.", af: "Hierdie een lyk oplosbaar en is dit nie, en daarom is dit twee punte werd eerder as drie. Die onderste getal van die eksponent is twee, so die linkerkant begin met 'n vierkantswortel, en 'n vierkantswortel van 'n reële getal is nooit negatief nie. As jy iets wat nooit negatief is nie tot die derde mag verhef, is dit steeds nooit negatief nie, so die linkerkant kan nooit minus sewe-en-twintig bereik nie. Daar is geen x wat werk nie. Die gevaarlike stap is om albei kante sonder om te dink tot twee derdes te verhef: dit gee nege, wat soos 'n antwoord lyk totdat jy dit terugsit en plus sewe-en-twintig kry. As jy jou antwoord in die oorspronklike vergelyking toets, vang jy dit; haar reël vang dit gouer.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — HER CONTRAST. Same exponent, opposite signs.
   A: x^(4/3) = −16 → even numerator, negative side → no solution
   B: x^(4/3) = 16  → (∛(x⁴))³ = 16³ = 4096 → ⁴√(x⁴) = ⁴√4096 = 8 → x = ±8
   check: (±8)^(4/3) = ((±8)^(1/3))⁴ = (±2)⁴ = 16  ✓
   --------------------------------------------------------------- */
const q6 = {
  id: "eqn.sib.sc.q6",
  chapter: CH,
  topic: "solution-count",
  archetype: "identify-the-impossible-equation-then-solve-its-twin",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "One of the two equations has no real solution. State which one, and give a reason.", af: "Een van die twee vergelykings het geen reële oplossing nie. Noem watter een, en gee 'n rede.",
      },
      hint: {
        en: "The exponent is the same in both, so the exponent alone cannot decide it. What is different is the sign on the right — pair that with the number on TOP of the exponent.", af: "Die eksponent is in albei dieselfde, so die eksponent alleen kan dit nie besluit nie. Wat verskil, is die teken aan die regterkant: koppel dit aan die getal BO in die eksponent.",
      },
      memo: [
        { type: "step", text: { en: `The numerator of the exponent is <b>4</b>, an EVEN number, so &nbsp;${xp(4, 3)} = (<sup>3</sup>√x)<sup>4</sup>, &nbsp;an even power`, af: `Die teller van die eksponent is <b>4</b>, 'n EWE getal, dus &nbsp;${xp(4, 3)} = (<sup>3</sup>√x)<sup>4</sup>, &nbsp;'n ewe mag` }, ticks: ["ca"] },
        { type: "answer", text: { en: "An even power is never negative &nbsp;∴ <b>A has no solution</b>", af: "'n Ewe mag is nooit negatief nie &nbsp;∴ <b>A het geen oplossing nie</b>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Putting the two equations side by side is the fastest way to see what her rule is really saying. The exponent has a four on top, which means the last thing that happens on the left-hand side is a fourth power, and a fourth power of any real number is zero or positive. Equation A asks that positive thing to equal minus sixteen, which nothing can do, so A is finished before you touch it. Equation B asks it to equal plus sixteen, which is perfectly reasonable. Nothing about the exponent changed between them — only the sign on the right, and that sign was enough to decide the whole question.", af: "As jy die twee vergelykings langs mekaar sit, sien jy die vinnigste wat haar reël eintlik sê. Die eksponent het 'n vier bo, wat beteken die laaste ding wat aan die linkerkant gebeur, is 'n vierde mag, en 'n vierde mag van enige reële getal is nul of positief. Vergelyking A vra dat daardie positiewe ding gelyk moet wees aan minus sestien, wat niks kan doen nie, so A is klaar voordat jy daaraan raak. Vergelyking B vra dat dit gelyk moet wees aan plus sestien, wat heeltemal redelik is. Niks aan die eksponent het tussen hulle verander nie, net die teken aan die regterkant, en daardie teken was genoeg om die hele vraag te besluit.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence solve the other equation.", af: "Los gevolglik die ander vergelyking op.",
      },
      hint: {
        en: "Raise both sides to the power of the denominator, then take the fourth root. The same even numerator that killed A does a different job here — watch what it does to the final line.", af: "Verhef albei kante tot die mag van die noemer, en trek dan die vierdemagswortel. Dieselfde ewe teller wat A doodgemaak het, doen hier 'n ander werk: kyk wat dit aan die laaste reël doen.",
      },
      memo: [
        { type: "step", text: { en: `<b>B:</b> &nbsp;(<sup>3</sup>√(x<sup>4</sup>))³ = (16)³`, af: `<b>B:</b> &nbsp;(<sup>3</sup>√(x<sup>4</sup>))³ = (16)³` }, ticks: ["s/f"] },
        { type: "step", text: { en: "<sup>4</sup>√(x<sup>4</sup>) = <sup>4</sup>√4096 = 8 &nbsp;&nbsp;— the numerator is <b>4</b>, an EVEN number, so the answer carries a <b>±</b>", af: "<sup>4</sup>√(x<sup>4</sup>) = <sup>4</sup>√4096 = 8 &nbsp;&nbsp;Let op: die teller is <b>4</b>, 'n EWE getal, dus kry die antwoord 'n <b>±</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = ±8", af: "∴ x = ±8" }, ticks: ["a"] },
        { type: "step", text: { en: `<b>OR</b> — the reciprocal route (same marks): &nbsp;x = 16<sup>${f("3", "4")}</sup> = (<sup>4</sup>√16)³ = 2³ = 8, &nbsp;and the even numerator gives &nbsp;x = ±8`, af: `<b>OF</b>, die resiprook-roete (dieselfde punte): &nbsp;x = 16<sup>${f("3", "4")}</sup> = (<sup>4</sup>√16)³ = 2³ = 8, &nbsp;en die ewe teller gee &nbsp;x = ±8` } },
        { type: "trap", text: {
          en: "REMEMBER: the even numerator did BOTH jobs on this card. In (a) it made a negative right-hand side impossible; here, with a positive right-hand side, the very same 4 is what puts the ± on the answer. One rule, two outcomes, and the sign on the right is what chooses between them.", af: "ONTHOU: die ewe teller het op hierdie kaart BEIDE werke gedoen. In (a) het dit 'n negatiewe regterkant onmoontlik gemaak; hier, met 'n positiewe regterkant, is dit presies dieselfde 4 wat die ± op die antwoord sit. Een reël, twee uitkomste, en die teken aan die regterkant kies tussen hulle.",
        } },
      ],
      esplain: {
        en: "Equation B is an ordinary rational-exponent solve, and the neat part is that the number which ruled A out is the number that gives B two answers. Raise both sides to the power three to clear the cube root, and sixteen cubed is four thousand and ninety-six. Now take the fourth root of both sides: the fourth root of four thousand and ninety-six is eight. Because the power you are undoing is even, both plus eight and minus eight work, and you can check that — the cube root of minus eight is minus two, and minus two to the fourth is plus sixteen. So B has two solutions while A has none, and only the sign on the right side ever changed.", af: "Vergelyking B is 'n gewone vergelyking met 'n rasionale eksponent, en die mooi deel is dat die getal wat A uitgesluit het, die getal is wat B twee antwoorde gee. Verhef albei kante tot die mag drie om die derdemagswortel weg te kry, en sestien tot die derde mag is vierduisend ses-en-negentig. Trek nou die vierdemagswortel van albei kante: die vierdemagswortel van vierduisend ses-en-negentig is agt. Omdat die mag wat jy ongedaan maak ewe is, werk beide plus agt en minus agt, en jy kan dit toets: die derdemagswortel van minus agt is minus twee, en minus twee tot die vierde mag is plus sestien. B het dus twee oplossings terwyl A geen het nie, en net die teken aan die regterkant het ooit verander.",
      },
    },
  ],
};

/* THE TWO INTROS. `intro` belongs to the CARD, not to the question
   (js/exam/_cards.js makeCard takes it as its own argument), so they are
   exported here and handed to makeCard in js/exam/cards-eqn.js. q2's is
   the instruction that governs all three of its parts; q6's is the pair
   of equations both of its parts talk about. */
export const eqnSolutionCountIntros = {
  "eqn.sib.sc.q2": {
    en: "For each of the equations below, state whether it has <b>two</b> solutions, <b>one</b> solution or <b>no</b> solutions. Give a reason in each case. Do not solve them.", af: "Sê vir elk van die vergelykings hieronder of dit <b>twee</b> oplossings, <b>een</b> oplossing of <b>geen</b> oplossing het. Gee in elke geval 'n rede. Moenie hulle oplos nie.",
  },
  "eqn.sib.sc.q6": {
    en: `Two equations, with the same exponent and only the sign on the right changed:<br><b>A:</b> &nbsp;${xp(4, 3)} = −16 &nbsp;&nbsp;&nbsp;<b>B:</b> &nbsp;${xp(4, 3)} = 16`, af: `Twee vergelykings, met dieselfde eksponent en net die teken aan die regterkant verander:<br><b>A:</b> &nbsp;${xp(4, 3)} = −16 &nbsp;&nbsp;&nbsp;<b>B:</b> &nbsp;${xp(4, 3)} = 16`,
  },
};

export const eqnSolutionCountSiblingQuestions = [q1, q2, q3, q4, q5, q6];
