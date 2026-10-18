/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the skill
   "inequalities".
   (SESSION C1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/C1-eqn-siblings.md.)
   ------------------------------------------------------------
   TWO new cards, taking the tile back to six.

   WHY TWO AND NOT ONE. The tile held five cards, but one of them —
   eqn.ineq.q2(d), "the solution of x² + bx + c ≤ 0 is −2 ≤ x ≤ 5, find
   b and c" — is a LEVEL 4 part, and her ruling 5 (2026-08-23) keeps ★
   parts off the normal tiles. That card moves to the chapter's Level 4
   tile (see js/exam/cards-eqn.js), so this tile starts today at four.

   WHAT WAS ALREADY THERE, so that nothing here repeats a shape:
     · eqn.ineq.q2(a)  −3x + 7 &gt; 19 — a LINEAR one, flipped by dividing
       by a negative;
     · eqn.ineq.q2(b)  2x² + 5x &lt; 3 — unfactorised, positive leading
       coefficient, answer INSIDE the bowl;
     · eqn.ineq.t1q3(a)  (x + 1)(5 − x) ≥ 0 — already factorised, with a
       −x² hiding in the second bracket, so the bracket-flip is the whole
       question; answer inside the bowl again;
     · eqn.ineq.q2(c)  (x − 1)/x² ≤ 0 — a fraction whose denominator is a
       guaranteed-positive square, so it is simply dropped.
   The two below are the two that were missing:
     q1  the plainest quadratic inequality there is — already factorised,
       no flip, nothing to rearrange — so the tile has a genuine level-1
       way in (every card on it was level 2 or 3);
     q2  a RATIONAL inequality, where the denominator CAN change sign, so
       it may never be multiplied out: her B9 route instead — everything
       to the left, one fraction, then multiply by the SQUARE of the
       denominator, which is always positive. This is the shape her own
       Test 6 Q1 opens with and the tile had nothing like it.

   METHOD: METHODS-algebra.md, hers verbatim — B8 "TIP Chips"
   (everything to the left · no negative in front of x² · factorise ·
   CP must be "=" · then read the answer off the sketch as inside or
   outside of the bowl); B9 (never cross-multiply an inequality whose
   denominator can change sign; a guaranteed-positive square is safe;
   restrictions ride after a semicolon); B10 for "undefined" meaning a
   zero denominator; her highlighted EQ p31 ruling — never hand in the
   calculator's semicolon form, rewrite it with x on the left and the
   word "or"; §0.2 the ∴ habit.

   ⚠️ NOTE FOR THE FOREMAN: the brief also asked for one card whose
   answer is written in INTERVAL NOTATION. That is not built, and
   deliberately so — METHODS-algebra.md B8 lists interval notation under
   "Never do", and Part E lists "Interval / set-builder notation as an
   answer format" among the skills her notes do NOT cover, with the
   standing instruction not to invent a method for those. Every answer
   here therefore uses her form: x on the left, "or" between two pieces,
   restrictions after a semicolon.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 "no-calculator opening
   block (surds, exponential equations, inequalities)";
   SURVEY-Her-2025-Assessments.md Test 6 Q1 (a rational inequality in
   "≤" form opens that paper); SURVEY-Nov-P1.md Nov 2023 Q1(a)(3) and
   Nov 2022 Q3(a). Fresh numbers.

   LEVELS: 1 and 3 — which lands the whole tile on two L1, two L2 and
   two L3. NOTHING here is level 4. NO DIAGRAM: the hatched-bowl sketch
   is carried in words inside the memo, exactly as the four existing
   cards already do; no mark depends on the picture being drawn.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";
const LOST = { chapter: CH, quest: "eq7" };

/* ---------------------------------------------------------------
   q1 — THE WAY IN: already factorised, no flip, inside the bowl.
   (x + 6)(x − 1) &lt; 0 · CP −6 and 1 → −6 &lt; x &lt; 1.
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.ineq.q1",
  chapter: CH,
  topic: "inequalities",
  archetype: "already-factorised-quadratic-inequality-inside-the-bowl",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "Solve for x: &nbsp;(x + 6)(x − 1) &lt; 0", af: "Los op vir x: &nbsp;(x + 6)(x − 1) &lt; 0",
      },
      hint: {
        en: "Check the TIP Chips list first: everything is already on the left, and multiplying the brackets out would give a positive x², so nothing has to be flipped. Go straight to the critical points, then sketch.", af: "Kyk eers na die TIP Chips-lys: alles is reeds aan die linkerkant, en as jy die hakies uitvermenigvuldig, kry jy 'n positiewe x², so niks hoef omgedraai te word nie. Gaan reguit na die kritieke waardes, en skets dan.",
      },
      memo: [
        { type: "step", text: { en: "Everything is already on the left, and there is no negative in front of the x², so nothing needs flipping.", af: "Alles is reeds aan die linkerkant, en daar is geen negatief voor die x² nie, so niks hoef omgedraai te word nie." } },
        { type: "step", text: { en: "CP: &nbsp;x + 6 = 0 &nbsp;or&nbsp; x − 1 = 0 &nbsp;⟹&nbsp; x = −6 &nbsp;or&nbsp; x = 1", af: "Kritieke waardes: &nbsp;x + 6 = 0 &nbsp;of&nbsp; x − 1 = 0 &nbsp;⟹&nbsp; x = −6 &nbsp;of&nbsp; x = 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "It is a <b>happy</b> parabola cutting the x-axis at −6 and at 1, and &lt; 0 means below the axis — the <b>inside of the bowl</b>.", af: "Dit is 'n <b>happy</b> parabool wat die x-as by −6 en by 1 sny, en &lt; 0 beteken onder die as: <b>binne die bak</b>." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ −6 &lt; x &lt; 1", af: "∴ −6 &lt; x &lt; 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (x + 6)(x − 1) &lt; 0 does <b>not</b> mean x + 6 &lt; 0 <i>and</i> x − 1 &lt; 0. Two numbers whose product is negative can never both be negative — only one of them is, and that is exactly what the sketch shows you.", af: "PASOP: (x + 6)(x − 1) &lt; 0 beteken <b>nie</b> x + 6 &lt; 0 <i>en</i> x − 1 &lt; 0 nie. Twee getalle met 'n negatiewe produk kan nooit albei negatief wees nie: net een van hulle is, en dit is presies wat die skets vir jou wys.",
        } },
      ],
      esplain: {
        en: "The two brackets are not two little inequalities to solve separately — together they are one parabola, and the question is which stretch of it lies below the x-axis. That is why the sketch does all the work. The critical points are simply where each bracket is zero, which is where the curve crosses the axis, and crossings are the only places the sign can change. Because the x squared term would be positive if you multiplied out, the parabola is happy, and a happy parabola dips below the axis only in the dip between its two crossings. So “less than zero” is the piece between them. Write it with the smaller number on the left, exactly as the two values sit on a number line.", af: "Die twee hakies is nie twee klein ongelykhede wat jy apart oplos nie: saam is hulle een parabool, en die vraag is watter stuk daarvan onder die x-as lê. Daarom doen die skets al die werk. Die kritieke waardes is net waar elke hakie nul is, en dit is waar die kurwe die as sny; die teken kan net by daardie snypunte verander. Omdat die term met x kwadraat positief sou wees as jy uitvermenigvuldig, is die parabool happy, en 'n happy parabool sak net onder die as in die holte tussen sy twee snypunte. Dus is “kleiner as nul” die stuk tussen hulle. Skryf dit met die kleiner getal links, presies soos die twee waardes op 'n getallelyn lê.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — A RATIONAL INEQUALITY (her Test 6 Q1 shape).
   3/(x − 2) ≤ 1  ·  everything to the left  ·  (5 − x)/(x − 2) ≤ 0
   ·  ×(−1) flips  ·  (x − 5)/(x − 2) ≥ 0  ·  ×(x − 2)², always positive
   ·  (x − 5)(x − 2) ≥ 0  ·  CP 2 and 5, outside the bowl
   →  x &lt; 2 or x ≥ 5  (x = 2 is undefined, so it is left out).
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.ineq.q2",
  chapter: CH,
  topic: "inequalities",
  archetype: "rational-inequality-never-multiply-by-a-sign-changing-denominator",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "Write down the value of x for which the expression &nbsp;3/(x − 2)&nbsp; is undefined.", af: "Skryf die waarde van x neer waarvoor die uitdrukking &nbsp;3/(x − 2)&nbsp; onbepaald is.",
      },
      hint: {
        en: "A fraction breaks in one place only: where its denominator is zero. Set the denominator equal to zero and solve.", af: "'n Breuk breek op net een plek: waar sy noemer nul is. Stel die noemer gelyk aan nul en los op.",
      },
      memo: [
        { type: "step", text: { en: "A fraction is undefined where its denominator is zero: &nbsp;x − 2 = 0", af: "'n Breuk is onbepaald waar sy noemer nul is: &nbsp;x − 2 = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = 2 &nbsp;— this value can never be part of any answer", af: "∴ x = 2 &nbsp;(dié waarde kan nooit deel van 'n antwoord wees nie)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Dividing by zero is the one thing arithmetic simply refuses to do, so before you touch a fraction inequality you say out loud which x-value would break it. Here the denominator is x minus two, which is zero when x is two, so two is the forbidden value. Her word for what happens there is undefined — not “no solution”, which is for a positive base that cannot reach a negative value, and not “non-real”, which is for an even root of a negative number. Getting that word right matters, and so does writing the value down before you start solving, because at the end it has to be taken out of the answer whether or not it wanted to be in it.", af: "Deel deur nul is die een ding wat rekenkunde eenvoudig weier om te doen, so voordat jy aan 'n breuk-ongelykheid raak, sê jy hardop watter x-waarde dit sou breek. Hier is die noemer x min twee, wat nul is as x twee is, so twee is die verbode waarde. Haar woord vir wat daar gebeur, is onbepaald: nie “geen oplossing” nie, wat vir 'n positiewe grondtal is wat nie 'n negatiewe waarde kan bereik nie, en nie “nie-reëel” nie, wat vir 'n ewe wortel van 'n negatiewe getal is. Dit maak saak dat jy die regte woord kies, en ook dat jy die waarde neerskryf voordat jy begin oplos, want aan die einde moet dit uit die antwoord gehaal word, of dit daarin wou wees of nie.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 3,
      prompt: {
        en: "Hence solve for x: &nbsp;3/(x − 2) ≤ 1", af: "Los gevolglik op vir x: &nbsp;3/(x − 2) ≤ 1",
      },
      hint: {
        en: "Do NOT multiply both sides by x − 2 — you have no idea whether it is positive or negative, so you would not know whether to flip the sign. Take everything to the left and make it one single fraction instead.", af: "MOENIE albei kante met x − 2 vermenigvuldig nie: jy weet nie of dit positief of negatief is nie, so jy sal nie weet of jy die teken moet omdraai nie. Bring eerder alles na links en maak dit een enkele breuk.",
      },
      memo: [
        { type: "step", text: { en: "Never multiply an inequality by x − 2: it can be positive or negative, so you would not know whether to turn the sign around. Take everything to the LEFT instead and make it one fraction.", af: "Vermenigvuldig nooit 'n ongelykheid met x − 2 nie: dit kan positief of negatief wees, so jy sal nie weet of jy die teken moet omdraai nie. Bring eerder alles na LINKS en maak dit een breuk." } },
        { type: "step", text: { en: "3/(x − 2) − 1 ≤ 0 &nbsp;⟹&nbsp; (3 − x + 2)/(x − 2) ≤ 0 &nbsp;⟹&nbsp; (5 − x)/(x − 2) ≤ 0", af: "3/(x − 2) − 1 ≤ 0 &nbsp;⟹&nbsp; (3 − x + 2)/(x − 2) ≤ 0 &nbsp;⟹&nbsp; (5 − x)/(x − 2) ≤ 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "There is a hidden −x² in that numerator, so multiply the whole inequality by −1 and <b>turn the sign around</b>: &nbsp;(x − 5)/(x − 2) ≥ 0", af: "Daar skuil 'n −x² in daardie teller, so vermenigvuldig die hele ongelykheid met −1 en <b>draai die teken om</b>: &nbsp;(x − 5)/(x − 2) ≥ 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(x − 2)² is a square, so it is positive for every x ≠ 2 and can never flip the sign — multiply both sides by it: &nbsp;(x − 5)(x − 2) ≥ 0", af: "(x − 2)² is 'n kwadraat, so dit is positief vir elke x ≠ 2 en kan nooit die teken omdraai nie. Vermenigvuldig albei kante daarmee: &nbsp;(x − 5)(x − 2) ≥ 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "CP: &nbsp;x = 5 &nbsp;or&nbsp; x = 2. &nbsp;A <b>happy</b> parabola cutting the x-axis at 2 and at 5, and ≥ 0 means on or above the axis — the <b>outside of the bowl</b>.", af: "Kritieke waardes: &nbsp;x = 5 &nbsp;of&nbsp; x = 2. &nbsp;'n <b>Happy</b> parabool wat die x-as by 2 en by 5 sny, en ≥ 0 beteken op of bo die as: <b>buite die bak</b>." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x &lt; 2 &nbsp;&nbsp;or&nbsp;&nbsp; x ≥ 5 &nbsp;&nbsp;— x = 2 is left out, because from (a) the fraction is undefined there", af: "∴ x &lt; 2 &nbsp;&nbsp;of&nbsp;&nbsp; x ≥ 5 &nbsp;&nbsp;(x = 2 val uit, want volgens (a) is die breuk daar onbepaald)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT for the one point that is NOT in the answer. The critical point x = 2 came from a DENOMINATOR, so it can never be included, no matter how friendly the ≤ sign looks — that piece is x &lt; 2, with a strict sign. The other critical point, x = 5, came from a numerator, so there the ≥ really does include it: at x = 5 the left-hand side is 3/3 = 1, and 1 ≤ 1 is true.", af: "PASOP vir die een punt wat NIE in die antwoord is nie. Die kritieke waarde x = 2 kom van 'n NOEMER af, so dit kan nooit ingesluit word nie, al lyk die ≤-teken hoe vriendelik: daardie stuk is x &lt; 2, met 'n streng teken. Die ander kritieke waarde, x = 5, kom van 'n teller af, so daar sluit die ≥ dit regtig in: by x = 5 is die linkerkant 3/3 = 1, en 1 ≤ 1 is waar.",
        } },
      ],
      esplain: {
        en: "The rule that makes this question safe is a rule about not doing something. You may not multiply both sides by x minus two, because you do not know its sign, and multiplying an inequality by a negative turns the sign around while multiplying by a positive does not. So instead you take everything to the left and squash it into one fraction, which changes the question into “where is this fraction negative or zero”. From there two safe moves finish it. Multiplying by minus one straightens out the hidden minus x squared and flips the sign once, deliberately. Multiplying by the denominator squared is always safe, because a square is never negative, and it turns the fraction into an ordinary product you can sketch. The last step is remembering that the forbidden value from part (a) stays forbidden.", af: "Die reël wat hierdie vraag veilig maak, is 'n reël oor iets wat jy nie doen nie. Jy mag nie albei kante met x min twee vermenigvuldig nie, want jy ken nie sy teken nie, en as jy 'n ongelykheid met 'n negatief vermenigvuldig, draai die teken om, maar met 'n positief nie. Dus bring jy eerder alles na links en druk dit saam in een breuk, en dan word die vraag “waar is hierdie breuk negatief of nul”. Van daar af maak twee veilige stappe dit klaar. As jy met min een vermenigvuldig, maak dit die versteekte min x kwadraat reg en draai die teken een keer om, doelbewus. Om met die noemer in die kwadraat te vermenigvuldig, is altyd veilig, want 'n kwadraat is nooit negatief nie, en dit maak van die breuk 'n gewone produk wat jy kan skets. Die laaste stap is om te onthou dat die verbode waarde uit deel (a) verbode bly.",
      },
    },
  ],
};

export const eqnInequalitiesSiblingQuestions = [q1, q2];
