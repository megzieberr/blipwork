/* ============================================================
   EQUATIONS & INEQUALITIES · Q4 — Fractions & restrictions
   ------------------------------------------------------------
   Factorise the denominators first, the negative-twin trick
   (9 − x² = −(x² − 9)), the LCD, restrictions BEFORE solving,
   the ghost under the bed, and rejecting N.A. answers.
   ============================================================ */
import { mc, ynQ, pick, randInt, C } from "./_eq.js";
import { L } from "../lang.js";

const FRA = "eqFractions";
const RES = "eqRestrictions";

const SKILLS = {
  /* the method's first move */
  firstMove: () => {
    const items = [
      { q: L("An equation full of algebraic fractions. What is the FIRST move?", "'n Vergelyking vol algebraïese breuke. Wat is die EERSTE stap?"), correct: L("Factorise every numerator and denominator", "Faktoriseer elke teller en noemer"), wrongs: [L("Multiply everything out", "Vermenigvuldig alles uit"), L("Guess a value of x and test it", "Raai 'n waarde vir x en toets dit"), L("Flip every fraction upside down", "Draai elke breuk onderstebo")], ans: L("Factorise top and bottom FIRST — only then can you see matching denominators, the LCD, and the restrictions.", "Faktoriseer EERS bo en onder: net dan sien jy ooreenstemmende noemers, die KGV en die beperkings."),
        sol: [{ s: L("Nothing about a fraction equation can be decided while the denominators are still lumps", "Niks oor 'n breukvergelyking kan besluit word terwyl die noemers nog klonte is nie") },
              { s: L("Factorise every top and every bottom — turn 3 + 2x into 2x + 3, and 4x² − 9 into (2x + 3)(2x − 3)", "Faktoriseer elke teller en elke noemer: skryf 3 + 2x as 2x + 3, en 4x² − 9 as (2x + 3)(2x − 3)") },
              { s: L("Only now can you see which denominators share factors, what the LCD is, and which x-values are banned", "Nou eers sien jy watter noemers faktore deel, wat die KGV is, en watter x-waardes verbode is") }] },
      { q: L("Why factorise the denominators before anything else?", "Hoekom faktoriseer jy die noemers voor enigiets anders?"), correct: L("To find the LCD and to read off the restrictions", "Om die KGV te kry en die beperkings af te lees"), wrongs: [L("Because it makes the numbers smaller", "Want dit maak die getalle kleiner"), L("So the fractions cancel to 1", "Sodat die breuke na 1 kanselleer"), L("It's optional — the LCD works either way", "Dis opsioneel: die KGV werk in elk geval")], ans: L("The factors show which denominators match, what the LCD is, and which x-values are forbidden.", "Die faktore wys watter noemers ooreenstem, wat die KGV is, en watter x-waardes verbode is."),
        sol: [{ s: L("A factorised denominator is a list of the things that could each be 0", "'n Gefaktoriseerde noemer is 'n lys van die dinge wat elkeen 0 kan wees") },
              { s: L("That list gives you the limits straight away, one x ≠ … per factor", "Daardie lys gee jou dadelik die beperkings, een x ≠ … per faktor") },
              { s: L("And the LCD is built from those same factors, each taken once at its highest power", "En die KGV word uit dieselfde faktore gebou, elkeen een keer, met sy hoogste mag"), r: L("so factorising does two jobs at once", "dus doen faktorisering twee werke tegelyk") }] },
    ];
    const it = pick(items);
    return mc(FRA, it.q, it.correct, it.wrongs,
      { hint: L("Factorise first — tops AND bottoms.", "Faktoriseer eers: bo EN onder."), answerLabel: it.ans, solution: it.sol });
  },

  /* the negative twin: 9 − x² = −(x² − 9) */
  negTwin: () => {
    const m = randInt(2, 6);
    const items = [
      { q: L(`One denominator is <b>${C(m * m)} − x²</b> and another is <b>x² − ${C(m * m)}</b>. What is the trick?`, `Een noemer is <b>${C(m * m)} − x²</b> en 'n ander is <b>x² − ${C(m * m)}</b>. Wat is die truuk?`), correct: L(`${C(m * m)} − x² = −(x² − ${C(m * m)}) — take out the negative so the denominators match`, `${C(m * m)} − x² = −(x² − ${C(m * m)}): haal die negatief uit sodat die noemers ooreenstem`), wrongs: [L("They are the same thing, no change needed", "Hulle is dieselfde, niks hoef te verander nie"), L("Cancel them against each other immediately", "Kanselleer hulle dadelik teen mekaar"), L(`Replace both with x − ${C(m)}`, `Vervang albei met x − ${C(m)}`)], ans: L(`${C(m * m)} − x² is the NEGATIVE of x² − ${C(m * m)}. Take out −1, then both denominators share the factors (x + ${C(m)})(x − ${C(m)}).`, `${C(m * m)} − x² is die NEGATIEF van x² − ${C(m * m)}. Haal −1 uit, dan deel albei noemers die faktore (x + ${C(m)})(x − ${C(m)}).`),
        sol: [{ s: L(`Compare the two: ${C(m * m)} − x² is the same terms as x² − ${C(m * m)} with both signs flipped`, `Vergelyk die twee: ${C(m * m)} − x² is dieselfde terme as x² − ${C(m * m)} met albei tekens omgedraai`) },
              { s: L(`So ${C(m * m)} − x² = −(x² − ${C(m * m)})`, `Dus ${C(m * m)} − x² = −(x² − ${C(m * m)})`), r: L("take the −1 out in front", "haal die −1 voor uit") },
              { s: L(`Now both denominators are built from (x + ${C(m)})(x − ${C(m)}), and the −1 rides up into the numerator`, `Nou is albei noemers uit (x + ${C(m)})(x − ${C(m)}) gebou, en die −1 skuif op na die teller`),
                r: L("this is where learners lose the sign, so write the −1 down", "hier verloor leerders die teken, so skryf die −1 neer") }] },
      { q: L(`One denominator is <b>${C(m)} − x</b> and another is <b>x − ${C(m)}</b>. What is the trick?`, `Een noemer is <b>${C(m)} − x</b> en 'n ander is <b>x − ${C(m)}</b>. Wat is die truuk?`), correct: L(`${C(m)} − x = −(x − ${C(m)}) — take out −1 so they match`, `${C(m)} − x = −(x − ${C(m)}): haal −1 uit sodat hulle ooreenstem`), wrongs: [L("Multiply both denominators together", "Vermenigvuldig albei noemers met mekaar"), L("They can never match — use the formula", "Hulle kan nooit ooreenstem nie: gebruik die formule"), L("Swap the two fractions around", "Ruil die twee breuke om")], ans: L(`${C(m)} − x = −(x − ${C(m)}). Taking the −1 out (it can hop up to the numerator or out front) makes the denominators identical.`, `${C(m)} − x = −(x − ${C(m)}). As jy die −1 uithaal (dit kan op na die teller spring of voor uit gaan), word die noemers identies.`),
        sol: [{ s: L(`${C(m)} − x and x − ${C(m)} are the same two terms with the signs swapped`, `${C(m)} − x en x − ${C(m)} is dieselfde twee terme met die tekens omgeruil`) },
              { s: L(`So ${C(m)} − x = −(x − ${C(m)})`, `Dus ${C(m)} − x = −(x − ${C(m)})`) },
              { s: L(`Take that −1 out and the two denominators become identical`, `Haal daardie −1 uit en die twee noemers word identies`), r: L("the minus hops up to the numerator — it does not vanish", "die minus spring op na die teller: dit verdwyn nie") }] },
    ];
    const it = pick(items);
    return mc(FRA, it.q, it.correct, it.wrongs,
      { hint: L("A denominator that is the NEGATIVE of another: take out −1 and they match.", "'n Noemer wat die NEGATIEF van 'n ander is: haal −1 uit en hulle stem ooreen."), answerLabel: it.ans, solution: it.sol });
  },

  /* choose the LCD */
  whichLCD: () => {
    const m = randInt(1, 6);
    const items = [
      { q: L(`Denominators are <b>x</b> and <b>(x − ${C(m)})</b>. What is the LCD?`, `Die noemers is <b>x</b> en <b>(x − ${C(m)})</b>. Wat is die KGV?`), correct: L(`x(x − ${C(m)})`, `x(x − ${C(m)})`), wrongs: [L(`x − ${C(m)}`, `x − ${C(m)}`), L("x", "x"), L(`x + (x − ${C(m)})`, `x + (x − ${C(m)})`)], ans: L(`They share no factor, so the LCD is their product: x(x − ${C(m)}).`, `Hulle deel geen faktor nie, dus is die KGV hul produk: x(x − ${C(m)}).`),
        sol: [{ s: L(`List the factors: one denominator is x, the other is (x − ${C(m)})`, `Lys die faktore: een noemer is x, die ander is (x − ${C(m)})`) },
              { s: L("They have nothing in common, so nothing can be shared", "Hulle het niks in gemeen nie, dus kan niks gedeel word nie") },
              { s: L(`LCD = x(x − ${C(m)})`, `KGV = x(x − ${C(m)})`), r: L("each different factor once, at its highest power", "elke verskillende faktor een keer, met sy hoogste mag") }] },
      { q: L(`Denominators are <b>(x + ${C(m)})</b>, <b>(x − ${C(m)})</b> and <b>x² − ${C(m * m)}</b>. What is the LCD?`, `Die noemers is <b>(x + ${C(m)})</b>, <b>(x − ${C(m)})</b> en <b>x² − ${C(m * m)}</b>. Wat is die KGV?`), correct: L(`(x + ${C(m)})(x − ${C(m)})`, `(x + ${C(m)})(x − ${C(m)})`), wrongs: [L(`(x + ${C(m)})(x − ${C(m)})(x² − ${C(m * m)})`, `(x + ${C(m)})(x − ${C(m)})(x² − ${C(m * m)})`), L(`x² + ${C(m * m)}`, `x² + ${C(m * m)}`), L(`(x + ${C(m)})² (x − ${C(m)})²`, `(x + ${C(m)})² (x − ${C(m)})²`)], ans: L(`x² − ${C(m * m)} already IS (x + ${C(m)})(x − ${C(m)}), so the LCD is just (x + ${C(m)})(x − ${C(m)}) — don't double-count factors.`, `x² − ${C(m * m)} IS reeds (x + ${C(m)})(x − ${C(m)}), dus is die KGV net (x + ${C(m)})(x − ${C(m)}): moenie faktore dubbel tel nie.`),
        sol: [{ s: L(`Factorise the third denominator first: x² − ${C(m * m)} = (x + ${C(m)})(x − ${C(m)})`, `Faktoriseer eers die derde noemer: x² − ${C(m * m)} = (x + ${C(m)})(x − ${C(m)})`), r: L("diff in □'s", "verskil van □'e") },
              { s: L(`So the whole list of factors is just (x + ${C(m)}) and (x − ${C(m)})`, `Dus is die hele lys faktore net (x + ${C(m)}) en (x − ${C(m)})`) },
              { s: L(`LCD = (x + ${C(m)})(x − ${C(m)})`, `KGV = (x + ${C(m)})(x − ${C(m)})`), r: L("multiplying all three denominators would count the same factors twice", "as jy al drie noemers vermenigvuldig, tel jy dieselfde faktore twee keer") }] },
      { q: L(`Denominators are <b>x</b> and <b>x²</b>. What is the LCD?`, `Die noemers is <b>x</b> en <b>x²</b>. Wat is die KGV?`), correct: L("x²", "x²"), wrongs: [L("x³", "x³"), L("x", "x"), L("2x", "2x")], ans: L("x² already contains x, so the LCD is x² — take each factor at its HIGHEST power, don't multiply blindly.", "x² bevat reeds x, dus is die KGV x²: neem elke faktor met sy HOOGSTE mag, moenie blindelings vermenigvuldig nie."),
        sol: [{ s: L("There is only one different factor here, and that is x", "Hier is daar net een verskillende faktor, en dit is x") },
              { s: L("It appears once in the first denominator and twice in the second", "Dit kom een keer in die eerste noemer voor en twee keer in die tweede") },
              { s: L("Take it at its highest power: LCD = x²", "Neem dit met sy hoogste mag: KGV = x²"), r: L("x² already divides by x, so x³ would be doing extra work for nothing", "x² is reeds deelbaar deur x, dus sou x³ verniet ekstra werk doen") }] },
    ];
    const it = pick(items);
    return mc(FRA, it.q, it.correct, it.wrongs,
      { hint: L("Each different factor once, at its highest power.", "Elke verskillende faktor een keer, met sy hoogste mag."), answerLabel: it.ans, solution: it.sol });
  },

  /* multiply EVERY term by the LCD
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "one fixed
     worked example — trivially parametrisable"). The yes/no item's
     equation 10/x + 3x/(x − 2) = 7 now rolls its four numbers; the LCD is
     always x(x − m) and the cleared line A(x − m) + Bx·x = Kx(x − m) is
     exact for every roll, so her "the lonely K gets multiplied too" point
     is unchanged. The first item has no numbers at all — untouched. */
  clearFractions: () => {
    if (pick([true, false])) {
      const it = { q: L("You've found the LCD. How do you clear the fractions?", "Jy het die KGV gekry. Hoe raak jy van die breuke ontslae?"), correct: L("Multiply EVERY term on both sides by the LCD", "Vermenigvuldig ELKE term aan albei kante met die KGV"), wrongs: [L("Multiply only the fraction terms by the LCD", "Vermenigvuldig net die breukterme met die KGV"), L("Add the LCD to both sides", "Tel die KGV by albei kante"), L("Divide both sides by the LCD", "Deel albei kante deur die KGV")], ans: L("Every single term gets multiplied by the LCD — including the lonely whole-number terms. Then the denominators cancel and it's an ordinary equation.", "Elke enkele term word met die KGV vermenigvuldig, ook die eensame heelgetal-terme. Dan kanselleer die noemers en is dit 'n gewone vergelyking.") };
      return mc(FRA, it.q, it.correct, it.wrongs,
        { hint: L("The LCD hits every term, fractions and non-fractions alike.", "Die KGV tref elke term, breuke en nie-breuke."), answerLabel: it.ans,
          solution: [
            { s: L("Give every term a denominator first — a whole number gets a denominator of 1", "Gee eers elke term 'n noemer: 'n heelgetal kry 'n noemer van 1") },
            { s: L("Under each term write the multiplier it needs to reach the LCD, and a ✓ where it already has it", "Skryf onder elke term die vermenigvuldiger wat dit nodig het om by die KGV uit te kom, en 'n ✓ waar dit dit reeds het") },
            { s: L("Multiplying EVERY term keeps the equation balanced, and the denominators then cancel", "As jy ELKE term vermenigvuldig, bly die vergelyking in balans, en dan kanselleer die noemers"),
              r: L("multiply only some of them and the equation is no longer the same equation", "vermenigvuldig net sommige, en die vergelyking is nie meer dieselfde vergelyking nie") },
          ] });
    }
    const A = pick([6, 8, 9, 10, 12]), B = randInt(2, 5), m = randInt(2, 6), K = randInt(4, 9);
    return ynQ(FRA,
      L(`In ${C(A)}/x + ${C(B)}x/(x − ${C(m)}) = ${C(K)}, the ${C(K)} also gets multiplied by the LCD x(x − ${C(m)}). True?`, `In ${C(A)}/x + ${C(B)}x/(x − ${C(m)}) = ${C(K)} word die ${C(K)} ook met die KGV x(x − ${C(m)}) vermenigvuldig. Waar?`),
      true,
      { hint: L("EVERY term…", "ELKE term…"),
        answerLabel: L(`True — ${C(A)}(x − ${C(m)}) + ${C(B)}x·x = ${C(K)}x(x − ${C(m)}). Forgetting to multiply the ${C(K)} is the classic slip.`, `Waar: ${C(A)}(x − ${C(m)}) + ${C(B)}x·x = ${C(K)}x(x − ${C(m)}). Om die ${C(K)} te vergeet, is die klassieke fout.`),
        solution: [
          { s: L(`Write the ${C(K)} over 1 so it looks like the others: ${C(K)}/1`, `Skryf die ${C(K)} oor 1 sodat dit soos die ander lyk: ${C(K)}/1`) },
          { s: L(`Now every term is multiplied by the LCD x(x − ${C(m)}) — the ${C(K)} included`, `Nou word elke term met die KGV x(x − ${C(m)}) vermenigvuldig, die ${C(K)} ingesluit`) },
          { s: L(`${C(A)}(x − ${C(m)}) + ${C(B)}x·x = ${C(K)}x(x − ${C(m)})`, `${C(A)}(x − ${C(m)}) + ${C(B)}x·x = ${C(K)}x(x − ${C(m)})`), r: L("∴ true — skipping the lonely term unbalances the equation", "∴ waar: as jy die eensame term oorslaan, is die vergelyking uit balans") },
        ] });
  },

  /* restrictions come FIRST */
  stateWhen: () => {
    const items = [
      { q: L("WHEN do you state the restrictions of a fraction equation?", "WANNEER skryf jy die beperkings van 'n breukvergelyking neer?"), correct: L("Before you start solving", "Voordat jy begin oplos"), wrongs: [L("After solving, only if an answer looks odd", "Ná die oplossing, net as 'n antwoord vreemd lyk"), L("Only if the question asks for them", "Net as die vraag daarvoor vra"), L("Never — restrictions are for inequalities", "Nooit: beperkings is vir ongelykhede")], ans: L("Restrictions come FIRST: any x that makes a denominator 0 is banned from the start, and you check your answers against them at the end.", "Beperkings kom EERSTE: enige x wat 'n noemer 0 maak, is van die begin af verbode, en aan die einde toets jy jou antwoorde daarteen."),
        sol: [{ s: L("The banned x-values belong to the ORIGINAL equation — they are true before you do anything", "Die verbode x-waardes behoort aan die OORSPRONKLIKE vergelyking: hulle geld voordat jy enigiets doen") },
              { s: L("So the limits line goes down right next to the LCD line, before any solving starts", "Dus kom die beperkingsreël reg langs die KGV-reël, voordat enige oplossing begin") },
              { s: L("Then at the end you check each answer against that line and reject any that breaks it", "Dan toets jy aan die einde elke antwoord teen daardie reël en verwerp enige wat dit breek"), r: L("her memos mark the limits line", "haar memo's gee 'n punt vir die beperkingsreël") }] },
      ynQ(RES,
        L("You may write the restrictions at the end, once you've seen the answers. True?", "Jy mag die beperkings aan die einde skryf, sodra jy die antwoorde gesien het. Waar?"),
        false,
        { hint: L("The restriction exists before you solve anything.", "Die beperking bestaan voordat jy enigiets oplos."),
          answerLabel: L("False — the restriction is part of the original equation. State it up front, then use it to reject any N.A. answer at the end.", "Onwaar: die beperking is deel van die oorspronklike vergelyking. Skryf dit vooraf neer, en gebruik dit dan aan die einde om enige n.v.t.-antwoord te verwerp."),
          solution: [
            { s: L("The forbidden x-values come from the denominators, which exist before any solving happens", "Die verbode x-waardes kom van die noemers, wat bestaan voordat jy enigiets oplos") },
            { s: L("Written up front, the limits line is there to catch a bad answer at the end", "As dit vooraf geskryf is, is die beperkingsreël daar om aan die einde 'n slegte antwoord te vang") },
            { s: L("∴ false — write LCD = … and limits: x ≠ … on the same line, at the start", "∴ onwaar: skryf KGV = … en beperkings: x ≠ … op dieselfde reël, aan die begin"), r: L("it carries its own mark", "dit kry sy eie punt") },
          ] }),
    ];
    const it = pick(items);
    return it.type ? it : mc(RES, it.q, it.correct, it.wrongs,
      { hint: L("Restrictions first, solve second, check last.", "Beperkings eerste, dan oplos, toets laaste."), answerLabel: it.ans, solution: it.sol });
  },

  /* read the restrictions off an equation — fresh numbers */
  findRestrictions: () => {
    const m = randInt(1, 8);
    const prompt = L(`What are the restrictions for <b>${frameFrac("10", "x")} + ${frameFrac("3x", `x − ${C(m)}`)} = 7</b>?`, `Wat is die beperkings vir <b>${frameFrac("10", "x")} + ${frameFrac("3x", `x − ${C(m)}`)} = 7</b>?`);
    const correct = L(`x ≠ 0 and x ≠ ${C(m)}`, `x ≠ 0 en x ≠ ${C(m)}`);
    const wrongs = [
      L(`x ≠ ${C(m)} only`, `Net x ≠ ${C(m)}`),
      L(`x ≠ 0 only`, `Net x ≠ 0`),
      L(`x ≠ −${C(m)} and x ≠ 0`, `x ≠ −${C(m)} en x ≠ 0`),
    ];
    return mc(RES, prompt, correct, wrongs,
      { hint: L("Set EACH denominator equal to 0 — those x-values are banned.", "Stel ELKE noemer gelyk aan 0: daardie x-waardes is verbode."),
        answerLabel: L(`Denominators are x and (x − ${C(m)}): x ≠ 0 and x ≠ ${C(m)}.`, `Die noemers is x en (x − ${C(m)}): x ≠ 0 en x ≠ ${C(m)}.`),
        solution: [
          { s: L(`List the denominators: x, and (x − ${C(m)})`, `Lys die noemers: x, en (x − ${C(m)})`), r: L("the 7 on the right has denominator 1, which can never be 0", "die 7 regs het noemer 1, wat nooit 0 kan wees nie") },
          { s: L(`Set each one to 0: x = 0, and x − ${C(m)} = 0 → x = ${C(m)}`, `Stel elkeen gelyk aan 0: x = 0, en x − ${C(m)} = 0 → x = ${C(m)}`) },
          { s: L(`Those are the banned values: x ≠ 0 and x ≠ ${C(m)}`, `Dit is die verbode waardes: x ≠ 0 en x ≠ ${C(m)}`), r: L("both of them — one restriction per denominator", "albei: een beperking per noemer") },
        ] });
  },

  /* why a denominator can't be 0 */
  whyRestrict: () => {
    const items = [
      { q: L("WHY is an x that makes a denominator 0 not allowed?", "HOEKOM is 'n x wat 'n noemer 0 maak, nie toegelaat nie?"), correct: L("Division by 0 is undefined", "Deling deur 0 is onbepaald"), wrongs: [L("It makes the answer negative", "Dit maak die antwoord negatief"), L("It makes the fraction equal to 0", "Dit maak die breuk gelyk aan 0"), L("Because the LCD would be too big", "Want die KGV sou te groot wees")], ans: L("a/0 is undefined — the ghost under the bed. Any x that turns a denominator into 0 breaks the whole expression.", "a/0 is onbepaald: die spook onder die bed. Enige x wat 'n noemer 0 maak, breek die hele uitdrukking."),
        sol: [{ s: L("Dividing asks “how many of these fit into that?” — and 0 fits in no times at all", "Deel vra “hoeveel hiervan pas in daardie?”, en 0 pas glad nie in nie") },
              { s: L("So a/0 has no value: it is undefined, the ghost under the bed", "Dus het a/0 geen waarde nie: dit is onbepaald, die spook onder die bed") },
              { s: L("An x that turns a denominator into 0 breaks the expression, so it is banned from the start", "'n x wat 'n noemer 0 maak, breek die uitdrukking, dus is dit van die begin af verbode") }] },
      { q: L("To find where an expression is UNDEFINED, what do you solve?", "Wat los jy op om te kry waar 'n uitdrukking ONBEPAALD is?"), correct: L("Denominator = 0", "Noemer = 0"), wrongs: [L("Numerator = 0", "Teller = 0"), L("The whole expression = 0", "Die hele uitdrukking = 0"), L("Denominator < 0", "Noemer < 0")], ans: L("Undefined = ghost under the bed = denominator equals 0. Set the bottom equal to 0 and solve.", "Onbepaald = spook onder die bed = noemer gelyk aan 0. Stel die onderkant gelyk aan 0 en los op."),
        sol: [{ s: L("Undefined happens in exactly one place: when you are asked to divide by 0", "Onbepaald gebeur op presies een plek: as jy gevra word om deur 0 te deel") },
              { s: L("So look at the BOTTOM of the fraction and set it equal to 0", "Kyk dus na die ONDERKANT van die breuk en stel dit gelyk aan 0") },
              { s: L("Solving that gives the x-values where the expression is undefined", "As jy dit oplos, kry jy die x-waardes waar die uitdrukking onbepaald is"),
                r: L("the numerator = 0 answers a different question — that is where the expression equals 0", "teller = 0 beantwoord 'n ander vraag: dit is waar die uitdrukking gelyk is aan 0") }] },
    ];
    const it = pick(items);
    return mc(RES, it.q, it.correct, it.wrongs,
      { hint: L("Undefined means dividing by 0 — look at the bottom.", "Onbepaald beteken deel deur 0: kyk na die onderkant."), answerLabel: it.ans, solution: it.sol });
  },

  /* rejecting an N.A. answer — fresh numbers */
  rejectNA: () => {
    const m = randInt(1, 6), other = m + randInt(1, 5);
    const prompt = L(`A fraction equation has restrictions <b>x ≠ 0 and x ≠ ${C(m)}</b>. Solving gives x = ${C(m)} or x = ${C(other)}. What is the final answer?`, `'n Breukvergelyking het beperkings <b>x ≠ 0 en x ≠ ${C(m)}</b>. Die oplossing gee x = ${C(m)} of x = ${C(other)}. Wat is die finale antwoord?`);
    const correct = L(`Only x = ${C(other)} — mark x = ${C(m)} as N.A.`, `Net x = ${C(other)}: merk x = ${C(m)} as n.v.t.`);
    const wrongs = [
      L(`x = ${C(m)} or x = ${C(other)} — both count`, `x = ${C(m)} of x = ${C(other)}: albei tel`),
      L(`No solution — one answer broke a restriction, so both die`, `Geen oplossing: een antwoord breek 'n beperking, dus val albei uit`),
      L(`x = ${C(m)} only`, `Net x = ${C(m)}`),
    ];
    return mc(RES, prompt, correct, wrongs,
      { hint: L("An answer that equals a restriction is rejected; the other survives.", "'n Antwoord wat gelyk is aan 'n beperking word verwerp; die ander bly staan."),
        answerLabel: L(`x = ${C(m)} makes a denominator 0 → not applicable (N.A.). The valid answer is x = ${C(other)}.`, `x = ${C(m)} maak 'n noemer 0 → nie van toepassing (n.v.t.). Die geldige antwoord is x = ${C(other)}.`),
        solution: [
          { s: L(`Check each answer against the limits line: x ≠ 0 and x ≠ ${C(m)}`, `Toets elke antwoord teen die beperkingsreël: x ≠ 0 en x ≠ ${C(m)}`) },
          { s: L(`x = ${C(m)} is on the banned list — it makes a denominator 0, so it is N.A.`, `x = ${C(m)} is op die verbode lys: dit maak 'n noemer 0, dus is dit n.v.t.`), r: L("write it with a struck equals", "skryf dit met 'n deurgestreepte gelykaanteken") },
          { s: L(`x = ${C(other)} breaks nothing, so it stands`, `x = ${C(other)} breek niks nie, dus bly dit staan`), r: L("one bad answer never kills the other one", "een slegte antwoord maak nooit die ander een dood nie") },
        ] });
  },
};

/* tiny stacked-fraction display for the prompts */
function frameFrac(top, bot) {
  return `<span class="frac"><span class="fr-n">${top}</span><span class="fr-d">${bot}</span></span>`;
}

export const questEq4 = {
  id: "eq4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id,
    concept: ["firstMove", "negTwin", "whichLCD", "clearFractions"].includes(id) ? FRA : RES,
    gen,
  })),
};
