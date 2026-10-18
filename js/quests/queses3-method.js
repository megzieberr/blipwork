/* ============================================================
   EXPONENTS & SURDS · Q3 — First step & which method
   ------------------------------------------------------------
   What to do FIRST (prime factors), one-term simplify vs the
   "divorce" (factorise) when there's a + or −, and the rule
   for when you may cancel.
   ============================================================ */
import { mc, ynQ, pick } from "./_exp.js";
import { L } from "../lang.js";

const CON = "simplifySteps";

const SKILLS = {
  /* the universal first step */
  firstStep: () => {
    const bases = pick([L("8, 9 and 27", "8, 9 en 27"), L("16 and 32", "16 en 32"), L("4ⁿ and 72ⁿ", "4ⁿ en 72ⁿ"), L("25 and 125", "25 en 125")]);
    return mc(CON,
      L(`An expression mixes bases like <b>${bases}</b>. What is the <b>first</b> step to simplify it?`, `'n Uitdrukking meng grondtalle soos <b>${bases}</b>. Wat is die <b>eerste</b> stap om dit te vereenvoudig?`),
      L("Rewrite every base as a product of prime factors", "Skryf elke grondtal as 'n produk van priemfaktore"),
      [L("Add the exponents straight away", "Tel die eksponente dadelik op"), L("Multiply all the bases together", "Vermenigvuldig al die grondtalle met mekaar"), L("Cancel the common terms first", "Kanselleer eers die gemeenskaplike terme")],
      { hint: L("You can only use the laws once every base is broken into prime factors, so matching bases can meet.", "Jy kan die wette eers gebruik as elke grondtal in priemfaktore opgebreek is, sodat dieselfde grondtalle kan saamkom."),
        answerLabel: L("Rewrite each base as prime factors (8 = 2³, 9 = 3², 27 = 3³ …) so the bases match.", "Skryf elke grondtal as priemfaktore (8 = 2³, 9 = 3², 27 = 3³ …) sodat die grondtalle ooreenstem."),
        solution: [
          { s: L(`With bases like ${bases} nothing matches, and every law needs the SAME base`, `Met grondtalle soos ${bases} pas niks nie, en elke wet het DIESELFDE grondtal nodig`) },
          { s: L("So break each base into primes: 8 = 2³, 9 = 3², 27 = 3³, 72 = 2³·3²", "Breek dus elke grondtal op in priemgetalle: 8 = 2³, 9 = 3², 27 = 3³, 72 = 2³·3²"), r: L("calculator: type the number, =, SHIFT, FACT", "sakrekenaar: tik die getal in, =, SHIFT, FACT") },
          { s: L("Now everything is written in 2's and 3's, and the laws can finally start", "Nou is alles in magte van 2 en 3 geskryf, en die wette kan uiteindelik begin") },
        ] });
  },

  /* one-term (× / ÷ only) → add/subtract exponents */
  oneTerm: () => mc(CON,
    L("An expression is one big fraction of powers — everything is <b>multiplied or divided</b>, with NO + or − between terms. What do you do?", "'n Uitdrukking is een groot breuk van magte: alles word <b>vermenigvuldig of gedeel</b>, met GEEN + of − tussen terme nie. Wat doen jy?"),
    L("Multiply the brackets out, then add/subtract the exponents of the same base", "Vermenigvuldig die hakies uit, tel dan eksponente van dieselfde grondtal op of trek af"),
    [L("Take out a common factor first", "Haal eers 'n gemene faktor uit"), L("Use difference of squares", "Gebruik verskil van twee vierkante"), L("Let k = the base and make a quadratic", "Stel k = die grondtal en maak 'n kwadratiese vergelyking")],
    { hint: L("No + or − means it’s a single term — just the laws on the exponents.", "Geen + of − nie beteken dit is een term: net die wette op die eksponente."),
      answerLabel: L("With only × and ÷ you apply the laws directly: multiply out, then add/subtract exponents.", "Met net × en ÷ pas jy die wette direk toe: vermenigvuldig uit, tel dan eksponente op of trek af."),
      solution: [
        { s: L("First check what is between the terms: only × and ÷, so this is her “type 1: one term”", "Kyk eers wat tussen die terme staan: net × en ÷, dus is dit haar “tipe 1: een term”") },
        { s: L("Prime-factorise, then multiply the brackets out", "Priemfaktoriseer, vermenigvuldig dan die hakies uit"), r: L("power of a power", "mag van 'n mag") },
        { s: L("Then add the exponents where they multiply and subtract where they divide, and tidy up", "Tel dan die eksponente op waar hulle vermenigvuldig en trek af waar hulle deel, en maak dit netjies"),
          r: L("no + or − anywhere, so nothing has to be factorised first", "nêrens 'n + of − nie, dus hoef niks eers gefaktoriseer te word nie") },
      ] }),

  /* + or − present → must factorise */
  plusMinus: () => mc(CON,
    L("There is a <b>+ or − between the terms</b> (e.g. 3ˣ⁺² − 3ˣ). Can you just add the exponents?", "Daar is 'n <b>+ of − tussen die terme</b> (bv. 3ˣ⁺² − 3ˣ). Kan jy net die eksponente optel?"),
    L("No — you must factorise (take out a common factor) first", "Nee: jy moet eers faktoriseer ('n gemene faktor uithaal)"),
    [L("Yes — add the exponents as usual", "Ja: tel die eksponente soos gewoonlik op"), L("Yes — subtract the exponents", "Ja: trek die eksponente af"), L("No — you must cancel a term from the top and bottom", "Nee: jy moet 'n term bo en onder kanselleer")],
    { hint: L("The laws (add/subtract exponents) only work across × and ÷, never across + and −.", "Die wette (eksponente optel/aftrek) werk net oor × en ÷, nooit oor + en − nie."),
      answerLabel: L("A + or − blocks the laws. Split the powers and factorise — usually take out a common factor.", "'n + of − blokkeer die wette. Skei die magte en faktoriseer: haal gewoonlik 'n gemene faktor uit."),
      solution: [
        { s: L("The laws only reach across × and ÷ — a + or − blocks them", "Die wette reik net oor × en ÷: 'n + of − blokkeer hulle") },
        { s: L("So divorce each power first: 3ˣ⁺² − 3ˣ = 3ˣ·3² − 3ˣ", "Skei dus eers elke mag: 3ˣ⁺² − 3ˣ = 3ˣ·3² − 3ˣ"), r: L("divorce = split x^(a+b) into xᵃ · xᵇ", "egskeiding = breek x^(a+b) op in xᵃ · xᵇ") },
        { s: L("Now take out the common factor, always the base with the variable exponent: 3ˣ(3² − 1) = 3ˣ(8)", "Haal nou die gemene faktor uit, altyd die grondtal met die veranderlike eksponent: 3ˣ(3² − 1) = 3ˣ(8)") },
        { s: L("Once the + and − are caged in brackets you may cancel", "Sodra die + en − in hakies vasgekeer is, mag jy kanselleer"), r: L("never cancel across a bare + or −", "kanselleer nooit oor 'n kaal + of − nie") },
      ] }),

  /* like powers add like terms */
  likeTerms: () => {
    const items = [
      { q: L("Simplify <b>2ˣ + 2ˣ</b>.", "Vereenvoudig <b>2ˣ + 2ˣ</b>."), correct: L("2·2ˣ", "2·2ˣ"), wrongs: [L("2²ˣ", "2²ˣ"), L("4ˣ", "4ˣ"), L("2ˣ²", "2ˣ²")], ans: L("Adding two of the same thing: 2ˣ + 2ˣ = 2·2ˣ (just like x + x = 2x).", "Twee van dieselfde ding opgetel: 2ˣ + 2ˣ = 2·2ˣ (net soos x + x = 2x)."),
        sol: [{ s: L("Both terms are the SAME thing, 2ˣ, so they are like terms", "Albei terme is DIESELFDE ding, 2ˣ, dus is hulle gelyksoortige terme") },
              { s: L("Write the invisible coefficients in: 1·2ˣ + 1·2ˣ", "Skryf die onsigbare koëffisiënte in: 1·2ˣ + 1·2ˣ") },
              { s: L("1 + 1 = 2, so the answer is 2·2ˣ", "1 + 1 = 2, dus is die antwoord 2·2ˣ"), r: L("exactly like x + x = 2x — the exponent never changes", "presies soos x + x = 2x: die eksponent verander nooit nie") }] },
      { q: L("Simplify <b>5·3ˣ − 3ˣ</b>.", "Vereenvoudig <b>5·3ˣ − 3ˣ</b>."), correct: L("4·3ˣ", "4·3ˣ"), wrongs: [L("5·3ˣ", "5·3ˣ"), L("2·3ˣ", "2·3ˣ"), "5"], ans: L("They’re like terms in 3ˣ: 5·3ˣ − 1·3ˣ = 4·3ˣ.", "Hulle is gelyksoortige terme in 3ˣ: 5·3ˣ − 1·3ˣ = 4·3ˣ."),
        sol: [{ s: L("Both terms carry the same power 3ˣ, so they are like terms", "Albei terme dra dieselfde mag 3ˣ, dus is hulle gelyksoortige terme") },
              { s: L("Write the hidden 1 in: 5·3ˣ − 1·3ˣ", "Skryf die versteekte 1 in: 5·3ˣ − 1·3ˣ"), r: L("keeping the 1 visible is the whole trick", "om die 1 sigbaar te hou, is die hele truuk") },
              { s: L("5 − 1 = 4, so the answer is 4·3ˣ", "5 − 1 = 4, dus is die antwoord 4·3ˣ"), r: L("the 3ˣ is left completely alone", "die 3ˣ word heeltemal uitgelos") }] },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: L("Treat the matching power as a “like term”, exactly like x + x = 2x.", "Hanteer die passende mag as 'n “gelyksoortige term”, presies soos x + x = 2x."), answerLabel: it.ans, solution: it.sol });
  },

  /* the cancelling rule */
  cancel: () => ynQ(CON,
    L("You may cancel a power from the top and bottom only when it is a factor of the <b>whole</b> top and <b>whole</b> bottom (caged in brackets). True or false?", "Jy mag 'n mag bo en onder kanselleer net as dit 'n faktor van die <b>hele</b> teller en die <b>hele</b> noemer is (in hakies vasgekeer). Waar of onwaar?"),
    true,
    { hint: L("You can never cancel a single term out of a sum like (3ˣ + 1).", "Jy kan nooit 'n enkele term uit 'n som soos (3ˣ + 1) kanselleer nie."),
      answerLabel: L("True — cancel only common FACTORS of the whole line, never one term out of a sum.", "Waar: kanselleer net gemene FAKTORE van die hele teller en noemer, nooit een term uit 'n som nie."),
      solution: [
        { s: L("Cancelling is really dividing top and bottom by the same thing, and that only works on the WHOLE line", "Kanselleer is eintlik om bo en onder deur dieselfde ding te deel, en dit werk net op die HELE teller en noemer") },
        { s: L("In 3ˣ(3² − 1) / 3ˣ(3 − 3⁻²) the 3ˣ multiplies everything, so it cancels", "In 3ˣ(3² − 1) / 3ˣ(3 − 3⁻²) vermenigvuldig die 3ˣ alles, dus kanselleer dit"), r: L("the + and − are caged in brackets", "die + en − is in hakies vasgekeer") },
        { s: L("In (3ˣ + 1)/3ˣ it does not: the 3ˣ on top is only one term of a sum", "In (3ˣ + 1)/3ˣ nie: die 3ˣ bo is net een term van 'n som") },
        { s: L("∴ true — cage the + and − in brackets first, then cancel", "∴ waar: keer die + en − eers in hakies vas, kanselleer dan") },
      ] }),

  /* the k-method for huge exponents */
  kMethod: () => {
    const items = [
      { q: L("Simplify <b>(5²⁰⁰⁷ + 5²⁰¹⁰) / (5²⁰⁰⁸ + 5²⁰⁰⁹)</b>. The exponents are huge but close together. Which method?", "Vereenvoudig <b>(5²⁰⁰⁷ + 5²⁰¹⁰) / (5²⁰⁰⁸ + 5²⁰⁰⁹)</b>. Die eksponente is reusagtig, maar naby aan mekaar. Watter metode?"),
        correct: L("The k-method: let k = 2008, rewrite each exponent as k−1, k, k+1 …, then factor out 5ᵏ", "Die k-metode: stel k = 2008, skryf elke eksponent as k−1, k, k+1 …, haal dan 5ᵏ uit"),
        wrongs: [L("Type it straight into the calculator", "Tik dit direk in die sakrekenaar in"), L("Cancel 5²⁰⁰⁷ against 5²⁰⁰⁸", "Kanselleer 5²⁰⁰⁷ teen 5²⁰⁰⁸"), L("Equate the exponents", "Stel die eksponente gelyk")],
        ans: L("Let k = 2008: the exponents become k−1, k+2, k and k+1. Divorce each power, take out 5ᵏ top and bottom, and it cancels — the calculator can’t hold numbers this big, and you may never cancel single terms across a +.", "Stel k = 2008: die eksponente word k−1, k+2, k en k+1. Skei elke mag, haal 5ᵏ bo en onder uit, en dit kanselleer. Die sakrekenaar kan nie sulke groot getalle hanteer nie, en jy mag nooit enkele terme oor 'n + kanselleer nie.") },
      { q: L("Simplify <b>(3¹⁰⁰ + 3¹⁰²) / 3¹⁰¹</b>. The exponents are huge but close together. Which method?", "Vereenvoudig <b>(3¹⁰⁰ + 3¹⁰²) / 3¹⁰¹</b>. Die eksponente is reusagtig, maar naby aan mekaar. Watter metode?"),
        correct: L("The k-method: let k = 101, rewrite each exponent as k−1, k, k+1 …, then factor out 3ᵏ", "Die k-metode: stel k = 101, skryf elke eksponent as k−1, k, k+1 …, haal dan 3ᵏ uit"),
        wrongs: [L("Type it straight into the calculator", "Tik dit direk in die sakrekenaar in"), L("Cancel 3¹⁰⁰ against 3¹⁰¹", "Kanselleer 3¹⁰⁰ teen 3¹⁰¹"), L("Equate the exponents", "Stel die eksponente gelyk")],
        ans: L("Let k = 101: (3ᵏ⁻¹ + 3ᵏ⁺¹)/3ᵏ = 3ᵏ(3⁻¹ + 3)/3ᵏ = ⅓ + 3 = 10/3. Factor out the k-power; never cancel one term out of a sum.", "Stel k = 101: (3ᵏ⁻¹ + 3ᵏ⁺¹)/3ᵏ = 3ᵏ(3⁻¹ + 3)/3ᵏ = ⅓ + 3 = 10/3. Haal die k-mag uit; kanselleer nooit een term uit 'n som nie.") },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs,
      { hint: L("The exponents differ by tiny amounts — call the middle one k and write the rest relative to it.", "Die eksponente verskil baie min: noem die middelste een k en skryf die res in terme daarvan."), answerLabel: it.ans });
  },

  /* order the steps */
  order: () => {
    const correct = L("① prime factors  ②  multiply out / add exponents  ③ simplify", "① priemfaktore  ②  vermenigvuldig uit / tel eksponente op  ③ vereenvoudig");
    return mc(CON,
      L("Put the simplifying steps in the right <b>order</b> (for a one-term expression):", "Sit die vereenvoudigingstappe in die regte <b>volgorde</b> (vir 'n uitdrukking met een term):"),
      correct,
      [L("① simplify  ②  prime factors  ③ multiply out", "① vereenvoudig  ②  priemfaktore  ③ vermenigvuldig uit"),
       L("① multiply out  ②  prime factors  ③ add exponents", "① vermenigvuldig uit  ②  priemfaktore  ③ tel eksponente op"),
       L("① add exponents  ②  prime factors  ③ simplify", "① tel eksponente op  ②  priemfaktore  ③ vereenvoudig")],
      { hint: L("You can’t apply the laws until the bases are prime; simplifying comes last.", "Jy kan nie die wette toepas voordat die grondtalle priemgetalle is nie; vereenvoudig kom laaste."),
        answerLabel: L("Prime-factorise first, then use the laws on the exponents, then tidy up.", "Priemfaktoriseer eers, gebruik dan die wette op die eksponente, en maak dan netjies."),
        solution: [
          { s: L("Prime factors have to come first, because every law needs the bases to match", "Priemfaktore moet eerste kom, want elke wet het grondtalle nodig wat ooreenstem"), r: L("no shared base, no law", "geen gemene grondtal, geen wet nie") },
          { s: L("Only then can you multiply the brackets out and add or subtract the exponents", "Eers dan kan jy die hakies uitvermenigvuldig en die eksponente optel of aftrek"), r: L("power of a power, then product and quotient rules", "mag van 'n mag, dan die produk- en kwosiëntreëls") },
          { s: L("Simplifying is last — you cannot tidy an answer you have not worked out yet", "Vereenvoudig kom laaste: jy kan nie 'n antwoord netjies maak wat jy nog nie uitgewerk het nie") },
        ] });
  },
};

export const questEs3 = {
  id: "es3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
