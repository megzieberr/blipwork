/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the skill
   "nature-chain" (Standard form → Δ → nature of roots).
   (SESSION C1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/C1-eqn-siblings.md.)
   ------------------------------------------------------------
   FOUR new cards, taking the tile from two to six.

   WHAT WAS ALREADY THERE, so that nothing here repeats a shape:
     · eqn.nor.q1(a–d)  2x² + 3 = 7x — collect terms, Δ = 25, a perfect
       □, then SOLVE and confirm the nature by factorising;
     · eqn.nor.q2(a–c)  x(x − 4) = 3 — multiply the bracket out, Δ = 28,
       not a perfect □, so real / irrational / unequal.
   Both start from a positive integer a, both land on Δ > 0, and neither
   ever meets Δ = 0 or Δ &lt; 0. So the four below are the four rungs the
   tile was missing:
     q1  Δ = 0 — the EQUAL-roots reading, which the tile had never shown;
     q2  the equation has to be cleared of a FRACTION before it has a
         standard form at all, and its Δ is a perfect □ (the card that
         makes them say "rational AND unequal", both words);
     q3  a DISGUISED quadratic — two brackets multiplied out, then a
         common factor divided away, which changes Δ's VALUE without
         changing the nature;
     q4  SURD coefficients, landing on Δ &lt; 0 — non-real, where the
         perfect-□ question never arises at all.

   METHOD: METHODS-algebra.md, hers verbatim — B11 (standard form first,
   read a/b/c off, Δ = b² − 4ac with every negative in its own brackets,
   then state the nature in HER four table wordings: "real, rational,
   equal" / "real, rational, unequal" / "real, irrational, unequal" /
   "non-real"); her "perfect □" shorthand; §0.2 the ∴ habit; §0.1 the
   decimal comma.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 "a nature-of-roots 'show
   that' (equal → rational-for-all-k → non-real-range → never-equal, in
   rising difficulty)"; SURVEY-Her-2025-Assessments.md Test 1 Q4
   ("discriminant" questions) and Test 6 Q1; SURVEY-Nov-P1.md Q1(b).
   Fresh equations and fresh numbers throughout.

   LEVELS: 1, 2, 3, 3 — which lands the whole tile on one L1, three L2
   and two L3 once the two existing cards are counted. NOTHING here is
   level 4 (her ruling 5). NO DIAGRAM: nature of roots is honestly a
   Δ-and-words topic and the pilot spends none either.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";
const LOST = { chapter: CH, quest: "eq8" };

/* ---------------------------------------------------------------
   q1 — Δ = 0, THE EQUAL-ROOTS READING.  9x² = 12x − 4.
   9x² − 12x + 4 = 0 · Δ = (−12)² − 4(9)(4) = 144 − 144 = 0
   → real, rational and equal.
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.nc.q1",
  chapter: CH,
  topic: "nature-chain",
  archetype: "standard-form-then-zero-discriminant-equal-roots",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Given: &nbsp;9x² = 12x − 4<br><br>Write the equation in the form &nbsp;ax² + bx + c = 0, &nbsp;and write down the values of a, b and c.", af: "Gegee: &nbsp;9x² = 12x − 4<br><br>Skryf die vergelyking in die vorm &nbsp;ax² + bx + c = 0, &nbsp;en skryf die waardes van a, b en c neer.",
      },
      hint: {
        en: "Bring every term to the left so that the right-hand side is zero. Once it reads ax² + bx + c = 0, a, b and c are simply the numbers in front of x², x and the constant — signs included.", af: "Bring elke term na links sodat die regterkant nul is. Sodra dit ax² + bx + c = 0 lees, is a, b en c bloot die getalle voor x², x en die konstante, tekens ingesluit.",
      },
      memo: [
        { type: "step", text: { en: "9x² = 12x − 4 &nbsp;⟹&nbsp; 9x² − 12x + 4 = 0", af: "9x² = 12x − 4 &nbsp;⟹&nbsp; 9x² − 12x + 4 = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "a = 9 ; &nbsp;b = −12 ; &nbsp;c = 4", af: "a = 9 ; &nbsp;b = −12 ; &nbsp;c = 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the − 4 on the right becomes + 4 on the left. Both terms cross over, and both change sign — writing c = −4 here sends every later part off course.", af: "PASOP: die − 4 regs word + 4 links. Albei terme gaan oor, en albei verander van teken: as jy hier c = −4 skryf, stuur dit elke latere deel op die verkeerde pad.",
        } },
      ],
      esplain: {
        en: "Every nature-of-roots question starts in the same place, and it is not with the discriminant. Δ = b² − 4ac only means something once the equation actually equals zero, because a, b and c are defined by that form. So the first job is bookkeeping: move everything to one side and read the three numbers off with their signs attached. The sign is the part worth slowing down for. Taking 12x across turns it into −12x, and taking −4 across turns it into +4. If you write those two down carefully now, the rest of the question is arithmetic. If you rush them, you will get a perfectly tidy wrong answer three parts later and have no idea where it went wrong.", af: "Elke vraag oor die aard van die wortels begin op dieselfde plek, en dit is nie by die diskriminant nie. Δ = b² − 4ac beteken eers iets sodra die vergelyking werklik gelyk is aan nul, want a, b en c word deur daardie vorm gedefinieer. Die eerste werk is dus boekhouding: bring alles na een kant en lees die drie getalle af met hul tekens daaraan. Die teken is die deel waarvoor jy moet stadiger gaan. Om 12x oor te bring, maak dit −12x, en om −4 oor te bring, maak dit +4. As jy daardie twee nou versigtig neerskryf, is die res van die vraag rekenwerk. As jy jou daarmee haas, kry jy drie dele later 'n heeltemal netjiese verkeerde antwoord en het jy geen idee waar dit skeefgeloop het nie.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Calculate Δ, the discriminant of the equation.", af: "Bereken Δ, die diskriminant van die vergelyking.",
      },
      hint: {
        en: "Δ = b² − 4ac. Put the negative b inside its own brackets before you square it, and use the a and c you wrote down in (a).", af: "Δ = b² − 4ac. Sit die negatiewe b in sy eie hakies voordat jy dit kwadreer, en gebruik die a en c wat jy in (a) neergeskryf het.",
      },
      memo: [
        { type: "step", text: { en: "Δ = b² − 4ac = (−12)² − 4(9)(4)", af: "Δ = b² − 4ac = (−12)² − 4(9)(4)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "= 144 − 144 &nbsp;&nbsp;∴ Δ = 0", af: "= 144 − 144 &nbsp;&nbsp;∴ Δ = 0" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The discriminant is one number that tells you what the roots are going to look like before you solve anything. Here the two halves are both 144, so they wipe each other out completely and Δ lands exactly on zero. That is worth noticing rather than rushing past: zero is not a small number, it is the one value that sits on the boundary between real roots and non-real ones, and a boundary is always the interesting place to be. Keep the brackets around the −12 while you square it. Squaring a negative gives a positive, so it is 144 and not −144, and losing that one sign flips the answer from zero to 288.", af: "Die diskriminant is een getal wat jou sê hoe die wortels gaan lyk voordat jy enigiets oplos. Hier is albei helftes 144, dus vee hulle mekaar heeltemal uit en Δ land presies op nul. Dit is die moeite werd om raak te sien eerder as om verby te haas: nul is nie 'n klein getal nie, dit is die een waarde wat op die grens tussen reële en nie-reële wortels sit, en 'n grens is altyd die interessante plek. Hou die hakies om die −12 terwyl jy dit kwadreer. 'n Negatief gekwadreer is positief, dus is dit 144 en nie −144 nie, en as jy daardie een teken verloor, verander die antwoord van nul na 288.",
      },
    },
    {
      id: "c",
      marks: 1,
      level: 1,
      prompt: {
        en: "Write down the nature of the roots of &nbsp;9x² = 12x − 4.", af: "Skryf die aard neer van die wortels van &nbsp;9x² = 12x − 4.",
      },
      hint: {
        en: "Look up Δ = 0 in the nature table. It is the one line of the table that answers all three questions — real or not, rational or not, equal or not — on its own.", af: "Soek Δ = 0 op in die aard-tabel. Dit is die een ry van die tabel wat al drie vrae op sy eie beantwoord: reëel of nie, rasionaal of nie, gelyk of nie.",
      },
      memo: [
        { type: "answer", text: { en: "Δ = 0 &nbsp;&nbsp;∴ the roots are real, rational and equal", af: "Δ = 0 &nbsp;&nbsp;∴ die wortels is reëel, rasionaal en gelyk" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: Δ = 0 does not mean “no roots”. It means the two roots have landed on top of each other — one repeated root, where the parabola just touches the x-axis instead of cutting through it. Here 9x² − 12x + 4 = (3x − 2)², so the one root is x = 2/3.", af: "ONTHOU: Δ = 0 beteken nie “geen wortels” nie. Dit beteken die twee wortels het bo-op mekaar geland: een herhaalde wortel, waar die parabool net aan die x-as raak in plaas daarvan om deur hom te sny. Hier is 9x² − 12x + 4 = (3x − 2)², dus is die een wortel x = 2/3.",
        } },
      ],
      esplain: {
        en: "Δ = 0 is the easiest line in the whole table because it answers everything at once. The roots are real, because Δ is not negative. They are equal, because the ± in the formula has nothing left to add or subtract — the square root of zero is zero. And they are rational, because zero is a perfect square, so no surd ever appears. That is why her table writes all three words on that one row. Picture it: the parabola has slid down until its turning point rests exactly on the x-axis, touching at one point and never crossing. If you factorise this equation you get a perfect square bracket, which is the algebra saying the same thing.", af: "Δ = 0 is die maklikste ry in die hele tabel, want dit beantwoord alles tegelyk. Die wortels is reëel, want Δ is nie negatief nie. Hulle is gelyk, want die ± in die formule het niks oor om by te tel of af te trek nie: die vierkantswortel van nul is nul. En hulle is rasionaal, want nul is 'n volkome vierkant, dus verskyn daar nooit 'n wortelvorm nie. Dit is hoekom haar tabel al drie woorde op daardie een ry skryf. Stel jou dit voor: die parabool het afgeskuif totdat sy draaipunt presies op die x-as rus, waar dit by een punt raak en nooit oorsteek nie. As jy hierdie vergelyking faktoriseer, kry jy 'n volkome-vierkant-hakie, en dit is die algebra wat dieselfde ding sê.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — CLEAR THE FRACTION FIRST, and a PERFECT-□ Δ.
   x + 8/x = 6  (x ≠ 0)  →  x² − 6x + 8 = 0
   Δ = 36 − 32 = 4 = 2²  → real, RATIONAL and UNEQUAL (both words).
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.nc.q2",
  chapter: CH,
  topic: "nature-chain",
  archetype: "clear-a-fraction-into-standard-form-then-perfect-square-delta",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Given: &nbsp;x + 8/x = 6, &nbsp;where x ≠ 0.<br><br>Show that this equation can be written as &nbsp;x² − 6x + 8 = 0.", af: "Gegee: &nbsp;x + 8/x = 6, &nbsp;waar x ≠ 0.<br><br>Toon aan dat hierdie vergelyking geskryf kan word as &nbsp;x² − 6x + 8 = 0.",
      },
      hint: {
        en: "There is no ax² + bx + c = 0 to read off while a fraction is still in the way. Multiply every single term by x — including the 6 on the right — and then bring everything to the left.", af: "Daar is geen ax² + bx + c = 0 om af te lees solank 'n breuk nog in die pad is nie. Vermenigvuldig elke enkele term met x, ook die 6 regs, en bring dan alles na links.",
      },
      memo: [
        { type: "step", text: { en: "Multiply <b>every</b> term by x &nbsp;(allowed, because x ≠ 0): &nbsp;x·x + 8 = 6x", af: "Vermenigvuldig <b>elke</b> term met x &nbsp;(toegelaat, want x ≠ 0): &nbsp;x·x + 8 = 6x" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x² + 8 = 6x &nbsp;⟹&nbsp; x² − 6x + 8 = 0", af: "x² + 8 = 6x &nbsp;⟹&nbsp; x² − 6x + 8 = 0" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the 6 on the right has to be multiplied by x as well. Multiplying only the fraction away leaves x² + 8 = 6, which is a different equation altogether — whatever you do to one term, you do to every term on both sides.", af: "PASOP: die 6 regs moet ook met x vermenigvuldig word. As jy net die breuk wegvermenigvuldig, hou jy x² + 8 = 6 oor, wat heeltemal 'n ander vergelyking is: wat jy aan een term doen, doen jy aan elke term aan albei kante.",
        } },
      ],
      esplain: {
        en: "An equation with x underneath a line is not in standard form, and until it is, a, b and c do not exist yet. Multiplying every term by x is what clears the fraction, and it is legal because both sides get exactly the same treatment, so the balance never tips. The one condition is that x may not be zero, which the question has already told you — and it is true here anyway, because 8 divided by zero is undefined, so zero was never allowed to be a solution. After multiplying, x times x gives x², the 8 over x loses its denominator, and the 6 becomes 6x. Bring it all to the left and you have an ordinary quadratic to work with.", af: "'n Vergelyking met x onder 'n breukstreep is nie in standaardvorm nie, en totdat dit is, bestaan a, b en c nog nie. Om elke term met x te vermenigvuldig, maak die breuk skoon, en dit is wettig omdat albei kante presies dieselfde behandeling kry, dus kantel die balans nooit nie. Die een voorwaarde is dat x nie nul mag wees nie, wat die vraag jou reeds gesê het, en dit is in elk geval hier waar, want 8 gedeel deur nul is onbepaald, dus was nul nooit as 'n oplossing toegelaat nie. Na die vermenigvuldiging gee x maal x jou x², die 8 oor x verloor sy noemer, en die 6 word 6x. Bring alles na links en jy het 'n gewone kwadratiese vergelyking om mee te werk.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence determine the nature of the roots of &nbsp;x + 8/x = 6. &nbsp;Give a full reason for your answer.", af: "Bepaal vervolgens die aard van die wortels van &nbsp;x + 8/x = 6. &nbsp;Gee 'n volledige rede vir jou antwoord.",
      },
      hint: {
        en: "Two checks, in this order. First the SIGN of Δ — that decides real or non-real, equal or unequal. Then, only if Δ is positive, ask whether it is a perfect square — that decides rational or irrational.", af: "Twee toetse, in hierdie volgorde. Eers die TEKEN van Δ: dit besluit reëel of nie-reëel, gelyk of ongelyk. Dan, net as Δ positief is, vra of dit 'n volkome vierkant is: dit besluit rasionaal of irrasionaal.",
      },
      memo: [
        { type: "step", text: { en: "Δ = b² − 4ac = (−6)² − 4(1)(8) = 36 − 32 = 4", af: "Δ = b² − 4ac = (−6)² − 4(1)(8) = 36 − 32 = 4" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Δ = 4 &gt; 0, so the roots are real and <b>unequal</b>; and 4 = 2², a perfect □, so they are <b>rational</b>", af: "Δ = 4 &gt; 0, dus is die wortels reëel en <b>ongelyk</b>; en 4 = 2², 'n volkome □, dus is hulle <b>rasionaal</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ the roots are real, rational and unequal", af: "∴ die wortels is reëel, rasionaal en ongelyk" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: “rational” and “unequal” are TWO separate findings and the mark scheme wants both words. The perfect □ gives you rational; Δ being bigger than zero (not equal to zero) gives you unequal. Writing only “rational” answers half the question.", af: "ONTHOU: “rasionaal” en “ongelyk” is TWEE aparte bevindings, en die memo wil albei woorde hê. Die volkome □ gee jou rasionaal; Δ groter as nul (nie gelyk aan nul nie) gee jou ongelyk. As jy net “rasionaal” skryf, beantwoord jy die helfte van die vraag.",
        } },
      ],
      esplain: {
        en: "It helps to think of this as two questions stacked on top of each other, asked in a fixed order. Question one is about the sign of Δ. Positive means the parabola cuts the x-axis twice, so the roots are real and they are different from each other. Question two only gets asked once question one has come out positive: is Δ a perfect square? Four is two squared, so the square root in the formula comes out as a whole number and no surd survives — that makes both roots rational. Put the two findings together and you get all three words the table asks for. As a check you can factorise: x² − 6x + 8 is (x − 2)(x − 4), so the roots really are 2 and 4, two different, tidy fractions-free numbers.", af: "Dit help om dit te sien as twee vrae bo-op mekaar, in 'n vaste volgorde gevra. Vraag een gaan oor die teken van Δ. Positief beteken die parabool sny die x-as twee keer, dus is die wortels reëel en verskil hulle van mekaar. Vraag twee word eers gevra sodra vraag een positief uitgekom het: is Δ 'n volkome vierkant? Vier is twee kwadraat, dus kom die vierkantswortel in die formule uit as 'n heelgetal en geen wortelvorm bly oor nie: dit maak albei wortels rasionaal. Sit die twee bevindings saam en jy kry al drie woorde wat die tabel vra. As kontrole kan jy faktoriseer: x² − 6x + 8 is (x − 2)(x − 4), dus is die wortels regtig 2 en 4, twee verskillende, netjiese getalle sonder breuke.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — A DISGUISED QUADRATIC, then a common factor divided away.
   (2x − 1)(x + 4) = 3x  →  2x² + 4x − 4 = 0  →  x² + 2x − 2 = 0
   Δ = 4 + 8 = 12, not a perfect □ → real, irrational, unequal;
   roots x = −1 ± √3.
   The teaching point of (c): dividing by 2 took Δ from 48 to 12 — a
   different NUMBER, the same NATURE.
   --------------------------------------------------------------- */
const q3 = {
  id: "eqn.sib.nc.q3",
  chapter: CH,
  topic: "nature-chain",
  archetype: "expand-brackets-into-standard-form-then-irrational-roots",
  paper: PAPER,
  lostQuest: LOST,
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Given: &nbsp;(2x − 1)(x + 4) = 3x<br><br>Show that this equation can be written as &nbsp;x² + 2x − 2 = 0.", af: "Gegee: &nbsp;(2x − 1)(x + 4) = 3x<br><br>Toon aan dat hierdie vergelyking geskryf kan word as &nbsp;x² + 2x − 2 = 0.",
      },
      hint: {
        en: "The brackets are being multiplied and then set equal to something that is not zero, so they are no help as they stand — multiply them out first. At the end, look for a number that divides into every term.", af: "Die hakies word vermenigvuldig en dan gelyk gestel aan iets wat nie nul is nie, dus help hulle jou nie soos hulle staan nie: vermenigvuldig hulle eers uit. Soek aan die einde 'n getal wat in elke term ingaan.",
      },
      memo: [
        { type: "step", text: { en: "Multiply the brackets out first: &nbsp;(2x − 1)(x + 4) = 2x² + 8x − x − 4 = 2x² + 7x − 4", af: "Vermenigvuldig eers die hakies uit: &nbsp;(2x − 1)(x + 4) = 2x² + 8x − x − 4 = 2x² + 7x − 4" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Everything to the left: &nbsp;2x² + 7x − 4 − 3x = 0 &nbsp;⟹&nbsp; 2x² + 4x − 4 = 0", af: "Alles na links: &nbsp;2x² + 7x − 4 − 3x = 0 &nbsp;⟹&nbsp; 2x² + 4x − 4 = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "Every term has a factor of 2, so divide right through by 2: &nbsp;x² + 2x − 2 = 0", af: "Elke term het 'n faktor 2, dus deel regdeur deur 2: &nbsp;x² + 2x − 2 = 0" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (2x − 1)(x + 4) = 3x is <b>not</b> a “each bracket = 0” question. That rule only works when the product equals ZERO. Here the right-hand side is 3x, so the brackets have to be multiplied out and everything taken to one side first.", af: "PASOP: (2x − 1)(x + 4) = 3x is <b>nie</b> 'n “elke hakie = 0”-vraag nie. Daardie reël werk net as die produk gelyk is aan NUL. Hier is die regterkant 3x, dus moet die hakies uitvermenigvuldig word en alles eers na een kant gebring word.",
        } },
      ],
      esplain: {
        en: "Two brackets sitting next to each other usually means “factorised, so read the roots off” — but that shortcut only works when the product is zero, because zero is the one number you can only reach by multiplying something by zero. Here the product is 3x, so the brackets earn you nothing and have to be opened up. Multiply each term in the first bracket by each term in the second, collect the two x terms, and then take the 3x across. What is left has a 2 in every term, and dividing it out costs nothing and makes the next part much easier. Dividing an equation by a number is always safe, because zero divided by 2 is still zero.", af: "Twee hakies langs mekaar beteken gewoonlik “gefaktoriseer, so lees die wortels af”, maar daardie kortpad werk net as die produk nul is, want nul is die een getal wat jy net kan kry deur iets met nul te vermenigvuldig. Hier is die produk 3x, dus help die hakies jou niks nie en moet hulle oopgemaak word. Vermenigvuldig elke term in die eerste hakie met elke term in die tweede, versamel die twee x-terme, en bring dan die 3x oor. Wat oorbly, het 'n 2 in elke term, en om dit uit te deel, kos niks en maak die volgende deel baie makliker. Om 'n vergelyking deur 'n getal te deel, is altyd veilig, want nul gedeel deur 2 is steeds nul.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Calculate Δ for &nbsp;x² + 2x − 2 = 0, &nbsp;and hence determine the nature of the roots.", af: "Bereken Δ vir &nbsp;x² + 2x − 2 = 0, &nbsp;en bepaal vervolgens die aard van die wortels.",
      },
      hint: {
        en: "Read a, b and c off the tidy version, and bracket the negative c before you multiply. Then run the two checks: sign first, perfect square second.", af: "Lees a, b en c van die netjiese weergawe af, en sit die negatiewe c in hakies voordat jy vermenigvuldig. Doen dan die twee toetse: eers die teken, dan die volkome vierkant.",
      },
      memo: [
        { type: "step", text: { en: "a = 1 ; &nbsp;b = 2 ; &nbsp;c = −2 &nbsp;&nbsp;∴&nbsp; Δ = (2)² − 4(1)(−2) = 4 + 8 = 12", af: "a = 1 ; &nbsp;b = 2 ; &nbsp;c = −2 &nbsp;&nbsp;∴&nbsp; Δ = (2)² − 4(1)(−2) = 4 + 8 = 12" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Δ = 12 &gt; 0, so the roots are real and unequal; and 12 is <b>not</b> a perfect □ (3² = 9 and 4² = 16), so they are irrational", af: "Δ = 12 &gt; 0, dus is die wortels reëel en ongelyk; en 12 is <b>nie</b> 'n volkome □ nie (3² = 9 en 4² = 16), dus is hulle irrasionaal" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ the roots are real, irrational and unequal", af: "∴ die wortels is reëel, irrasionaal en ongelyk" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT for the double negative. −4 × 1 × (−2) is <b>plus</b> 8, not minus 8. Bracket the negative c before you touch it and the sign looks after itself; skip the brackets and Δ comes out as −4, which would have you writing “non-real” for an equation that has two perfectly good roots.", af: "PASOP vir die dubbele negatief. −4 × 1 × (−2) is <b>plus</b> 8, nie minus 8 nie. Sit die negatiewe c in hakies voordat jy aan hom raak, en die teken sorg vir homself; slaan die hakies oor en Δ kom uit as −4, en dan skryf jy “nie-reëel” vir 'n vergelyking wat twee heeltemal goeie wortels het.",
        } },
      ],
      esplain: {
        en: "Same two checks as always, different outcome — and that is exactly why this card sits next to the last one. Both have a positive Δ, so both have two real, different roots. The split happens at the second check. Four was two squared, so those roots came out rational. Twelve is not any whole number squared: it sits between nine and sixteen, so its square root is a surd and it never simplifies away. That makes these two roots irrational. Notice that you can say all of this without solving anything — the discriminant has told you what the answers will look like before you have written a single root down.", af: "Dieselfde twee toetse as altyd, ander uitkoms, en dit is presies hoekom hierdie kaart langs die vorige een sit. Albei het 'n positiewe Δ, dus het albei twee reële, verskillende wortels. Die skeiding gebeur by die tweede toets. Vier was twee kwadraat, dus het daardie wortels rasionaal uitgekom. Twaalf is nie enige heelgetal gekwadreer nie: dit lê tussen nege en sestien, dus is sy vierkantswortel 'n wortelvorm wat nooit wegvereenvoudig nie. Dit maak hierdie twee wortels irrasionaal. Let op dat jy dit alles kan sê sonder om iets op te los: die diskriminant het jou vertel hoe die antwoorde gaan lyk voordat jy 'n enkele wortel neergeskryf het.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence explain why neither root of this equation can be written as a common fraction.", af: "Verduidelik vervolgens waarom geeneen van die wortels van hierdie vergelyking as 'n gewone breuk geskryf kan word nie.",
      },
      hint: {
        en: "Write the two roots out with the quadratic formula and look at what is left under the root sign. What kind of number is √12, and can a number like that ever be one whole number over another?", af: "Skryf die twee wortels uit met die kwadratiese formule en kyk wat onder die wortelteken oorbly. Watter soort getal is √12, en kan so 'n getal ooit een heelgetal oor 'n ander wees?",
      },
      memo: [
        { type: "step", text: { en: "x = (−2 ± √12)/2, &nbsp;and √12 = 2√3, so &nbsp;x = (−2 ± 2√3)/2 = −1 ± √3", af: "x = (−2 ± √12)/2, &nbsp;en √12 = 2√3, dus &nbsp;x = (−2 ± 2√3)/2 = −1 ± √3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "√3 is irrational, so neither &nbsp;−1 + √3&nbsp; nor &nbsp;−1 − √3&nbsp; can be written as one whole number over another &nbsp;∴ neither root is a common fraction", af: "√3 is irrasionaal, dus kan nóg &nbsp;−1 + √3&nbsp; nóg &nbsp;−1 − √3&nbsp; as een heelgetal oor 'n ander geskryf word nie &nbsp;∴ geeneen van die wortels is 'n gewone breuk nie" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: dividing the equation by 2 in (a) changed Δ from 48 to 12 — a different NUMBER, but the same NATURE. Neither 48 nor 12 is a perfect □, and the roots themselves never moved. So it never matters which version of the equation you take Δ from, as long as you are consistent.", af: "ONTHOU: om die vergelyking in (a) deur 2 te deel, het Δ van 48 na 12 verander: 'n ander GETAL, maar dieselfde AARD. Nóg 48 nóg 12 is 'n volkome □, en die wortels self het nooit geskuif nie. Dit maak dus nooit saak uit watter weergawe van die vergelyking jy Δ haal nie, solank jy konsekwent is.",
        } },
      ],
      esplain: {
        en: "This is the part where “irrational” stops being a word from a table and becomes something you can see. Run the quadratic formula and the answers come out as minus one plus or minus root three. Root three is the problem child: it is a decimal that runs on forever without ever repeating a pattern, and a number like that simply cannot be written as one whole number divided by another. That is the whole definition of irrational. So the discriminant was not just labelling the roots, it was predicting their shape. A perfect square under the root sign always collapses into a whole number and leaves you with fractions; anything else leaves a surd standing, and a surd never becomes a fraction.", af: "Dit is die deel waar “irrasionaal” ophou om 'n woord uit 'n tabel te wees en iets word wat jy kan sien. Gebruik die kwadratiese formule en die antwoorde kom uit as minus een plus of minus wortel drie. Wortel drie is die moeilike kind: dit is 'n desimaal wat vir altyd aanhou sonder om ooit 'n patroon te herhaal, en so 'n getal kan eenvoudig nie as een heelgetal gedeel deur 'n ander geskryf word nie. Dit is die hele definisie van irrasionaal. Die diskriminant het die wortels dus nie net benoem nie, dit het hul vorm voorspel. 'n Volkome vierkant onder die wortelteken val altyd ineen tot 'n heelgetal en los jou met breuke; enigiets anders laat 'n wortelvorm staan, en 'n wortelvorm word nooit 'n breuk nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — SURD COEFFICIENTS, landing on Δ &lt; 0.
   √5·x² − 3x + √5 = 0 · Δ = 9 − 4(√5)(√5) = 9 − 20 = −11 → non-real.
   Chosen deliberately: with Δ &lt; 0 the rational/irrational question
   never arises, so the surd coefficients cannot mislead.
   --------------------------------------------------------------- */
const q4 = {
  id: "eqn.sib.nc.q4",
  chapter: CH,
  topic: "nature-chain",
  archetype: "surd-coefficients-negative-discriminant-non-real",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 3,
      prompt: {
        en: "<em>Without the use of a calculator.</em><br>Given: &nbsp;√5·x² − 3x + √5 = 0<br><br>Write down the values of a, b and c, and calculate Δ. Leave your answer as an exact value.", af: "<em>Sonder die gebruik van 'n sakrekenaar.</em><br>Gegee: &nbsp;√5·x² − 3x + √5 = 0<br><br>Skryf die waardes van a, b en c neer, en bereken Δ. Laat jou antwoord as 'n presiese waarde.",
      },
      hint: {
        en: "A surd is just a number, so a and c are allowed to be surds. Write the three of them down first, then substitute — and remember what happens when a square root is multiplied by itself.", af: "'n Wortelvorm is net 'n getal, dus mag a en c wortelvorme wees. Skryf al drie eers neer, vervang dan, en onthou wat gebeur as 'n vierkantswortel met homself vermenigvuldig word.",
      },
      memo: [
        { type: "step", text: { en: "a = √5 ; &nbsp;b = −3 ; &nbsp;c = √5", af: "a = √5 ; &nbsp;b = −3 ; &nbsp;c = √5" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Δ = b² − 4ac = (−3)² − 4(√5)(√5)", af: "Δ = b² − 4ac = (−3)² − 4(√5)(√5)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "√5 × √5 = 5, &nbsp;so &nbsp;Δ = 9 − 4(5) = 9 − 20 &nbsp;&nbsp;∴ Δ = −11", af: "√5 × √5 = 5, &nbsp;dus &nbsp;Δ = 9 − 4(5) = 9 − 20 &nbsp;&nbsp;∴ Δ = −11" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: √5 × √5 = 5, not √5 and not √10. A square root multiplied by itself undoes the root sign completely — that is what a square root <i>is</i>. Losing that step leaves you with 9 − 4√5, which is a number you cannot compare cleanly to zero without a calculator.", af: "PASOP: √5 × √5 = 5, nie √5 nie en nie √10 nie. 'n Vierkantswortel maal homself maak die wortelteken heeltemal ongedaan: dit is wat 'n vierkantswortel <i>is</i>. As jy daardie stap verloor, hou jy 9 − 4√5 oor, 'n getal wat jy nie sonder 'n sakrekenaar netjies met nul kan vergelyk nie.",
        } },
      ],
      esplain: {
        en: "Surd coefficients look frightening and change nothing about the method. A surd is a number like any other, so it may stand in the a or the c slot, and Δ = b² − 4ac still works exactly the same way. The only new skill is one surd law: a square root times itself gives you back the number inside, because that is precisely what the root sign promises. So the 4ac term is four times root five times root five, which is four times five, which is twenty. After that it is ordinary arithmetic: nine take away twenty is minus eleven. Leaving the answer exact rather than reaching for a decimal is deliberate — you only need its sign, and the sign is already obvious.", af: "Wortelvorm-koëffisiënte lyk skrikwekkend, maar verander niks aan die metode nie. 'n Wortelvorm is 'n getal soos enige ander, dus mag dit in die a- of die c-plek staan, en Δ = b² − 4ac werk steeds presies dieselfde. Die enigste nuwe vaardigheid is een wortelvormwet: 'n vierkantswortel maal homself gee jou die getal binne-in terug, want dit is presies wat die wortelteken belowe. Die 4ac-term is dus vier maal wortel vyf maal wortel vyf, wat vier maal vyf is, wat twintig is. Daarna is dit gewone rekenwerk: nege min twintig is minus elf. Om die antwoord presies te laat eerder as om na 'n desimaal te gryp, is doelbewus: jy het net sy teken nodig, en die teken is reeds duidelik.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence determine the nature of the roots of this equation, and describe what this means for the graph of &nbsp;y = √5·x² − 3x + √5.", af: "Bepaal vervolgens die aard van die wortels van hierdie vergelyking, en beskryf wat dit beteken vir die grafiek van &nbsp;y = √5·x² − 3x + √5.",
      },
      hint: {
        en: "Only the SIGN of Δ matters here. Once Δ is negative, the perfect-square question never even gets asked — there is nothing to take a square root of.", af: "Net die TEKEN van Δ maak hier saak. Sodra Δ negatief is, word die volkome-vierkant-vraag nooit eens gevra nie: daar is niks om 'n vierkantswortel van te neem nie.",
      },
      memo: [
        { type: "step", text: { en: "Δ = −11 &lt; 0", af: "Δ = −11 &lt; 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ the roots are non-real (imaginary) &nbsp;— the graph is a parabola that lies entirely above the x-axis and never cuts it", af: "∴ die wortels is nie-reëel (imaginêr), &nbsp;die grafiek is 'n parabool wat heeltemal bo die x-as lê en dit nooit sny nie" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: with Δ &lt; 0 you stop. There is no “rational or irrational” to decide, because there are no real roots to be rational about — √(−11) is not a real number at all. Non-real is the whole answer.", af: "ONTHOU: met Δ &lt; 0 stop jy. Daar is geen “rasionaal of irrasionaal” om te besluit nie, want daar is geen reële wortels om rasionaal oor te wees nie: √(−11) is glad nie 'n reële getal nie. Nie-reëel is die hele antwoord.",
        } },
      ],
      esplain: {
        en: "The nature table has three doors and a negative discriminant opens the last one. To find a root you have to take the square root of Δ, and no real number multiplied by itself ever gives a negative answer — so there is nothing real to find. Her word for that is non-real, sometimes imaginary, and it is the end of the answer, not the start of another check. The picture makes it obvious. A parabola cuts the x-axis wherever the equation equals zero, so no real roots means no crossings at all. Here a is root five, which is positive, so the parabola is happy and the whole curve floats above the axis without ever touching it.", af: "Die aard-tabel het drie deure, en 'n negatiewe diskriminant maak die laaste een oop. Om 'n wortel te kry, moet jy die vierkantswortel van Δ neem, en geen reële getal maal homself gee ooit 'n negatiewe antwoord nie, dus is daar niks reëels om te vind nie. Haar woord daarvoor is nie-reëel, soms imaginêr, en dit is die einde van die antwoord, nie die begin van nog 'n toets nie. Die prentjie maak dit duidelik. 'n Parabool sny die x-as oral waar die vergelyking gelyk is aan nul, dus beteken geen reële wortels glad geen snypunte nie. Hier is a wortel vyf, wat positief is, dus is die parabool happy en die hele kurwe sweef bo die as sonder om dit ooit te raak.",
      },
    },
  ],
};

export const eqnNatureChainSiblingQuestions = [q1, q2, q3, q4];
