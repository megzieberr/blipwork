/* ============================================================
   EXAM FOCUS — Exponents & Surds · SIBLING CARDS for the skill
   "exponential-equations" (Exponential equations).
   (SESSION B of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/B-exp.md.)
   ------------------------------------------------------------
   THREE new cards, taking the tile back to six.

   WHY THREE AND NOT TWO. The tile held four cards, all cut from
   exp.nss.q1 — but part (d) of that question is a LEVEL 4 part, and
   her ruling 5 (2026-08-23) keeps ★ parts off the normal tiles. That
   card moves to the chapter's new Level 4 tile (see js/exam/
   cards-exp.js), so this tile starts today at three and needs three.

   WHAT WAS ALREADY THERE, so that nothing here repeats a shape:
     · exp.nss.q1(a) 2^(x−3) = 16 — one side already a power of the
       other (same base, no work on the left);
     · exp.nss.q1(b) 9^(x+1) = 27^(x−1) — two bases, one prime;
     · exp.nss.q1(c) 2^(2x) − 10·2^x + 16 = 0 — the k-method with two
       surviving branches.
   The three below are the three moves that were missing:
     q1  the LEFT side has to be tidied first (product rule) before
         either side is a single power;
     q2  a FRACTION base — 1/4 is 4⁻¹, so the whole exponent changes
         sign (her "flipped fractions" law inside an equation);
     q3  x in TWO places with a − between them, so a common factor has
         to come out before any guns can be equal.

   METHOD: METHODS-algebra.md, hers verbatim — A12 "guns and helmets"
   (bases = guns, exponents = helmets; equal guns shoot each other and
   the helmets fall to the ground), prime factors before equating; A1
   the product rule and "flipped fractions"; A3 divorce and the common
   factor; §0.2 the ∴ habit.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 "no-calculator opening
   block (… exponential equations …)"; SURVEY-Nov-P1.md Q1(c)
   2^(3x−6) = √8 and Q1(a)(1); SURVEY-Her-2025-Assessments.md Test 1
   Q2 and Test 6 Q1. Fresh bases and fresh numbers throughout.

   LEVELS: 1, 2, 3 — which lands the whole tile on two of each once
   the three existing cards are counted. NOTHING here is level 4.
   NO DIAGRAM.
   ============================================================ */

const PAPER = "siblings";
const CH = "exp";

/* ---------------------------------------------------------------
   q1 — tidy the LEFT side first: 2^x · 2^(x+4) = 64  →  x = 1.
   --------------------------------------------------------------- */
const q1 = {
  id: "exp.sib.eqns.q1",
  chapter: CH,
  topic: "exponential-equations",
  archetype: "product-rule-on-one-side-then-equate-exponents",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es8" },
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "<em>Without the use of a calculator.</em><br>Solve for x: &nbsp;2<sup>x</sup> · 2<sup>x+4</sup> = 64", af: "<em>Sonder die gebruik van 'n sakrekenaar.</em><br>Los op vir x: &nbsp;2<sup>x</sup> · 2<sup>x+4</sup> = 64",
      },
      hint: {
        en: "The left-hand side is two powers of the same base being multiplied, so it can be written as ONE power first. Then make the right-hand side a power of 2 as well.", af: "Die linkerkant is twee magte met dieselfde grondtal wat vermenigvuldig word, dus kan dit eers as EEN mag geskryf word. Maak dan die regterkant ook 'n mag van 2.",
      },
      memo: [
        { type: "step", text: { en: "Same base on the left, so the <b>product rule</b> first — add the exponents, and the base stays the same:", af: "Dieselfde grondtal links, dus eers die <b>produkreël</b>: tel die eksponente op, en die grondtal bly dieselfde:" } },
        { type: "step", text: { en: "2<sup>x</sup> · 2<sup>x+4</sup> = 2<sup>2x+4</sup>", af: "2<sup>x</sup> · 2<sup>x+4</sup> = 2<sup>2x+4</sup>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Now write 64 as a power of 2 as well: &nbsp;2<sup>2x+4</sup> = 2⁶ &nbsp;&nbsp;— the <b>guns</b> are equal, so they shoot each other and the <b>helmets</b> fall to the ground", af: "Skryf nou ook 64 as 'n mag van 2: &nbsp;2<sup>2x+4</sup> = 2⁶ &nbsp;&nbsp;(die <b>gewere</b> is gelyk, dus skiet hulle mekaar en die <b>helms</b> val op die grond)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "2x + 4 = 6 &nbsp;&nbsp;∴ x = 1", af: "2x + 4 = 6 &nbsp;&nbsp;∴ x = 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 2<sup>x</sup> · 2<sup>x+4</sup> is 2<sup>2x+4</sup>, not 4<sup>2x+4</sup>. Multiplying powers of the same base <b>adds</b> the exponents and leaves the base exactly as it was — the bases only ever get multiplied together when the EXPONENTS are the same.", af: "ONTHOU: 2<sup>x</sup> · 2<sup>x+4</sup> is 2<sup>2x+4</sup>, nie 4<sup>2x+4</sup> nie. As jy magte met dieselfde grondtal vermenigvuldig, <b>tel</b> jy die eksponente op en bly die grondtal net soos dit was: die grondtalle word net met mekaar vermenigvuldig as die EKSPONENTE dieselfde is.",
        } },
      ],
      esplain: {
        en: "An exponential equation can only be solved by hand once both sides are a single power of the same base, so the first job is always to see whether either side needs tidying. Here the left is two powers of 2 multiplied together, and the product rule squashes them into one: add the exponents, keep the base. That gives 2 to the two x plus four. The right is 64, which is 2 to the sixth. Now both sides are guns of the same kind, so they cancel each other out and the helmets — the exponents — drop to the ground as an ordinary little equation. Two x plus four equals six gives x equals one. Write the 2 to the sixth down; that line is a mark on its own, because it is what makes the comparison legal.", af: "'n Eksponensiële vergelyking kan net met die hand opgelos word sodra albei kante een enkele mag van dieselfde grondtal is, dus is die eerste taak altyd om te kyk of een van die kante netjies gemaak moet word. Hier is die linkerkant twee magte van 2 wat vermenigvuldig word, en die produkreël druk hulle saam in een: tel die eksponente op, hou die grondtal. Dit gee 2 tot die mag twee x plus vier. Die regterkant is 64, wat 2 tot die sesde is. Nou is albei kante gewere van dieselfde soort, dus kanselleer hulle mekaar en die helms (die eksponente) val op die grond as 'n gewone vergelykinkie. Twee x plus vier is gelyk aan ses gee x is gelyk aan een. Skryf die 2 tot die sesde neer; daardie reël is op sy eie 'n punt werd, want dit is wat dit wettig maak om die eksponente gelyk te stel.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — a FRACTION base: (1/4)^(x−1) = 64  →  x = −2.
   --------------------------------------------------------------- */
const q2 = {
  id: "exp.sib.eqns.q2",
  chapter: CH,
  topic: "exponential-equations",
  archetype: "fraction-base-flipped-fraction-then-equate-exponents",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es8" },
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Solve for x: &nbsp;(1/4)<sup>x−1</sup> = 64", af: "<em>Sonder 'n sakrekenaar.</em><br>Los op vir x: &nbsp;(1/4)<sup>x−1</sup> = 64",
      },
      hint: {
        en: "A fraction base is a base with a hidden negative exponent — 1/4 is 4 to the power of what? Once the left-hand side is a plain power of 4, both sides can be compared.", af: "'n Breuk as grondtal is 'n grondtal met 'n versteekte negatiewe eksponent: 1/4 is 4 tot watter mag? Sodra die linkerkant 'n gewone mag van 4 is, kan albei kante vergelyk word.",
      },
      memo: [
        { type: "step", text: { en: "Get rid of the fraction base first: &nbsp;1/4 = 4⁻¹, &nbsp;so a <b>flipped fraction</b> turns the whole exponent around:", af: "Raak eers ontslae van die breukgrondtal: &nbsp;1/4 = 4⁻¹, &nbsp;dus draai 'n <b>omgedraaide breuk</b> die teken van die hele eksponent om:" } },
        { type: "step", text: { en: "(1/4)<sup>x−1</sup> = (4⁻¹)<sup>x−1</sup> = 4<sup>−(x−1)</sup> = 4<sup>1−x</sup>", af: "(1/4)<sup>x−1</sup> = (4⁻¹)<sup>x−1</sup> = 4<sup>−(x−1)</sup> = 4<sup>1−x</sup>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "64 = 4³, &nbsp;so &nbsp;4<sup>1−x</sup> = 4³ &nbsp;&nbsp;— the guns are equal, so equate the helmets: &nbsp;1 − x = 3", af: "64 = 4³, &nbsp;dus &nbsp;4<sup>1−x</sup> = 4³ &nbsp;&nbsp;(die gewere is gelyk, dus stel die helms gelyk): &nbsp;1 − x = 3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = −2", af: "∴ x = −2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the minus reaches BOTH terms in the bracket, so (1/4)<sup>x−1</sup> is 4<sup>1−x</sup>, not 4<sup>x−1</sup>. Check it on the answer: at x = −2 the left-hand side is (1/4)⁻³, which really is 64.", af: "PASOP: die minus bereik ALBEI terme in die hakie, dus is (1/4)<sup>x−1</sup> gelyk aan 4<sup>1−x</sup>, nie 4<sup>x−1</sup> nie. Toets dit met die antwoord: by x = −2 is die linkerkant (1/4)⁻³, wat regtig 64 is.",
        } },
      ],
      esplain: {
        en: "A fraction base looks like a whole new kind of question and it is not — it is the same question wearing a disguise. A quarter is 4 to the minus one, so raising a quarter to the power x minus one is really 4 raised to minus one times x minus one, which is 4 to the one minus x. That single line is where the marks are, and it is also where the mistakes are, because the minus has to reach both terms inside the bracket. After that everything is ordinary: 64 is 4 cubed, the two bases match, so the exponents must match too, and one minus x equals three gives x equals minus two. A negative answer is completely normal here — a fraction base has to be fed a negative exponent before it can grow big.", af: "'n Breukgrondtal lyk soos 'n heel nuwe soort vraag, maar dit is nie: dit is dieselfde vraag in vermomming. 'n Kwart is 4 tot die mag minus een, dus is 'n kwart tot die mag x minus een eintlik 4 tot die mag minus een maal x minus een, wat 4 tot die mag een minus x is. Daardie een reël is waar die punte is, en ook waar die foute is, want die minus moet albei terme in die hakie bereik. Daarna is alles gewoon: 64 is 4 tot die derde, die twee grondtalle stem ooreen, dus moet die eksponente ook ooreenstem, en een minus x is gelyk aan drie gee x is gelyk aan minus twee. 'n Negatiewe antwoord is heeltemal normaal hier: 'n breukgrondtal moet 'n negatiewe eksponent kry voordat dit groot kan word.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — x in two places, common factor first:
   3^(x+2) − 3^x = 72  →  x = 2.
   --------------------------------------------------------------- */
const q3 = {
  id: "exp.sib.eqns.q3",
  chapter: CH,
  topic: "exponential-equations",
  archetype: "common-factor-out-of-two-exponential-terms-then-same-base",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es8" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Solve for x: &nbsp;3<sup>x+2</sup> − 3<sup>x</sup> = 72", af: "<em>Sonder 'n sakrekenaar.</em><br>Los op vir x: &nbsp;3<sup>x+2</sup> − 3<sup>x</sup> = 72",
      },
      hint: {
        en: "There is a − between two terms, so no guns can be equal yet. Divorce the first power so both terms carry 3<sup>x</sup>, then take that out as a common factor and see what is left.", af: "Daar is 'n − tussen twee terme, dus kan geen gewere nog gelyk wees nie. Skei die eerste mag sodat albei terme 3<sup>x</sup> dra, haal dit dan uit as 'n gemene faktor en kyk wat oorbly.",
      },
      memo: [
        { type: "step", text: { en: "A − sits between the two terms, so <b>divorce</b> first: &nbsp;3<sup>x+2</sup> = 3<sup>x</sup> · 3² = 9 · 3<sup>x</sup>", af: "'n − staan tussen die twee terme, dus <b>skei</b> eers: &nbsp;3<sup>x+2</sup> = 3<sup>x</sup> · 3² = 9 · 3<sup>x</sup>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "9 · 3<sup>x</sup> − 3<sup>x</sup> = 72 &nbsp;⟹&nbsp; take out the common factor — always the base with the variable exponent: &nbsp;3<sup>x</sup>(9 − 1) = 72", af: "9 · 3<sup>x</sup> − 3<sup>x</sup> = 72 &nbsp;⟹&nbsp; haal die gemene faktor uit, altyd die grondtal met die veranderlike eksponent: &nbsp;3<sup>x</sup>(9 − 1) = 72" }, ticks: ["ca"] },
        { type: "step", text: { en: "8 · 3<sup>x</sup> = 72 &nbsp;&nbsp;∴ 3<sup>x</sup> = 9", af: "8 · 3<sup>x</sup> = 72 &nbsp;&nbsp;∴ 3<sup>x</sup> = 9" }, ticks: ["ca"] },
        { type: "answer", text: { en: "3<sup>x</sup> = 3² &nbsp;&nbsp;∴ x = 2", af: "3<sup>x</sup> = 3² &nbsp;&nbsp;∴ x = 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: you may not drop the exponents while there is still a − in the way. 3<sup>x+2</sup> − 3<sup>x</sup> = 72 is <b>not</b> (x + 2) − x = 72. Guns can only shoot each other when each side is ONE single power.", af: "PASOP: jy mag nie die eksponente laat val solank daar nog 'n − in die pad is nie. 3<sup>x+2</sup> − 3<sup>x</sup> = 72 is <b>nie</b> (x + 2) − x = 72 nie. Gewere kan mekaar net skiet as elke kant EEN enkele mag is.",
        } },
      ],
      esplain: {
        en: "Everything about this question is decided by that minus sign. The helmets-fall trick only works when each side of the equation is one single power, and a subtraction of two powers is not one power. So the plan is to turn the whole left-hand side into one thing being multiplied. Divorce splits 3 to the x plus two into 3 to the x times 9, and now both terms carry a visible 3 to the x, which can be bracketed out. What is left inside the bracket is a plain 9 minus 1, which is 8, so the equation says 8 lots of 3 to the x make 72 — and one lot must therefore be 9. Only now is each side a single power of 3, and only now may the exponents be compared.", af: "Alles in hierdie vraag word deur daardie minusteken bepaal. Die helms-val-truuk werk net as elke kant van die vergelyking een enkele mag is, en 'n verskil van twee magte is nie een mag nie. Die plan is dus om die hele linkerkant in een ding te verander wat vermenigvuldig word. Egskeiding breek 3 tot die mag x plus twee op in 3 tot die mag x maal 9, en nou dra albei terme 'n sigbare 3 tot die mag x, wat in hakies uitgehaal kan word. Wat in die hakie oorbly, is 'n gewone 9 minus 1, wat 8 is, dus sê die vergelyking 8 keer 3 tot die mag x is 72, en een keer moet dus 9 wees. Eers nou is elke kant een enkele mag van 3, en eers nou mag die eksponente vergelyk word.",
      },
    },
  ],
};

export const expExponentialEquationsSiblingQuestions = [q1, q2, q3];
