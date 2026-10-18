/* ============================================================
   EQUATIONS & INEQUALITIES · Q3 — The k-method
   ------------------------------------------------------------
   When a bracket repeats, let k stand for it: spot WHEN to
   substitute, WHAT k is, what the equation becomes, why you're
   not finished at k, how many answers to expect, and carrying
   a restriction on k.
   ============================================================ */
import { mc, ynQ, pick, randInt, C } from "./_eq.js";
import { L } from "../lang.js";

const CON = "eqKMethod";

/* a repeated bracket like "x² − x" with small random coefficients */
function repBracket() {
  const m = randInt(1, 3), sign = pick(["−", "+"]);
  return L(`x² ${sign} ${m === 1 ? "" : C(m)}x`, `x² ${sign} ${m === 1 ? "" : C(m)}x`);   // never show "1x"
}

const SKILLS = {
  /* when do you reach for k? */
  whenK: () => {
    const items = [
      { q: L("When is the <b>k-substitution</b> the right tool?", "Wanneer is die <b>k-vervanging</b> die regte gereedskap?"), correct: L("When the SAME bracket or expression appears two or more times", "As DIESELFDE hakie of uitdrukking twee of meer keer voorkom"), wrongs: [L("Whenever there is an x²", "Elke keer as daar 'n x² is"), L("Whenever the equation has brackets", "Elke keer as die vergelyking hakies het"), L("Only when there is a fraction", "Net as daar 'n breuk is")], ans: L("The k-method is for a REPEATED expression — call the repeat k, and the equation collapses to a simple quadratic in k.", "Die k-metode is vir 'n HERHAALDE uitdrukking: noem die herhaling k, en die vergelyking krimp tot 'n eenvoudige kwadratiese vergelyking in k."),
        sol: [{ s: L("Scan the equation for the same expression appearing more than once", "Soek in die vergelyking na dieselfde uitdrukking wat meer as een keer voorkom") },
              { s: L("If it does, give that repeat one short name: let K = the repeated bracket", "As dit so is, gee daardie herhaling een kort naam: stel K = die herhaalde hakie") },
              { s: L("The whole equation shrinks to a plain quadratic in K, which you can factorise", "Die hele vergelyking krimp tot 'n gewone kwadratiese vergelyking in K, wat jy kan faktoriseer"), r: L("and then always substitute back to x", "en vervang dan altyd terug na x") }] },
      { q: L("Which equation is begging for a k-substitution?", "Watter vergelyking smeek om 'n k-vervanging?"), correct: L("(x² − x)² − 8(x² − x) + 12 = 0", "(x² − x)² − 8(x² − x) + 12 = 0"), wrongs: [L("x² − 8x + 12 = 0", "x² − 8x + 12 = 0"), L("(x − 2)(x + 3) = 0", "(x − 2)(x + 3) = 0"), L("x² − 8 = 0", "x² − 8 = 0")], ans: L("The bracket (x² − x) appears TWICE — let k = x² − x and it becomes k² − 8k + 12 = 0.", "Die hakie (x² − x) kom TWEE keer voor: stel k = x² − x en dit word k² − 8k + 12 = 0."),
        sol: [{ s: L("Look at each option and ask: does one expression appear twice?", "Kyk na elke opsie en vra: kom een uitdrukking twee keer voor?") },
              { s: L("In (x² − x)² − 8(x² − x) + 12 = 0 the bracket (x² − x) shows up in both the squared term and the middle term", "In (x² − x)² − 8(x² − x) + 12 = 0 kom die hakie (x² − x) in die kwadraatterm en in die middelterm voor") },
              { s: L("let K = x² − x → K² − 8K + 12 = 0", "stel K = x² − x → K² − 8K + 12 = 0"), r: L("the others are already ordinary quadratics with nothing repeating", "die ander is reeds gewone kwadratiese vergelykings sonder herhaling") }] },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs,
      { hint: L("Look for the same expression appearing more than once.", "Soek dieselfde uitdrukking wat meer as een keer voorkom."), answerLabel: it.ans, solution: it.sol });
  },

  /* what exactly is k? — fresh inner bracket */
  whatIsK: () => {
    const inner = repBracket();
    const A = randInt(2, 9), B = randInt(2, 12);
    const prompt = L(`<b>(${inner})² − ${C(A)}(${inner}) + ${C(B)} = 0</b>.<br>You decide to substitute. What should k be?`, `<b>(${inner})² − ${C(A)}(${inner}) + ${C(B)} = 0</b>.<br>Jy besluit om te vervang. Wat moet k wees?`);
    const correct = L(`k = ${inner}`, `k = ${inner}`);
    const wrongs = [L(`k = (${inner})²`, `k = (${inner})²`), L(`k = ${C(A)}(${inner})`, `k = ${C(A)}(${inner})`), L("k = x", "k = x")];
    return mc(CON, prompt, correct, wrongs,
      { hint: L("k stands for the repeated expression itself — the plain bracket, not its square.", "k staan vir die herhaalde uitdrukking self: die gewone hakie, nie sy kwadraat nie."),
        answerLabel: L(`Let k = ${inner}. Then the equation is k² − ${C(A)}k + ${C(B)} = 0 — an ordinary quadratic in k.`, `Stel k = ${inner}. Dan is die vergelyking k² − ${C(A)}k + ${C(B)} = 0: 'n gewone kwadratiese vergelyking in k.`),
        solution: [
          { s: L(`Find the part that repeats: (${inner}) appears in the squared term AND in the middle term`, `Vind die deel wat herhaal: (${inner}) kom in die kwadraatterm EN in die middelterm voor`) },
          { s: L(`Let K be that plain bracket: K = ${inner}`, `Stel K gelyk aan daardie gewone hakie: K = ${inner}`), r: L("not its square — the square is already shown by the ² outside", "nie sy kwadraat nie: die kwadraat word reeds deur die ² buite gewys") },
          { s: L(`Then (${inner})² is K², and the equation reads K² − ${C(A)}K + ${C(B)} = 0`, `Dan is (${inner})² gelyk aan K², en die vergelyking lees K² − ${C(A)}K + ${C(B)} = 0`) },
        ] });
  },

  /* what the equation becomes */
  afterSub: () => {
    const inner = repBracket();
    const A = randInt(2, 9), B = randInt(2, 12);
    const prompt = L(`<b>(${inner})² − ${C(A)}(${inner}) + ${C(B)} = 0</b> with k = ${inner} becomes…?`, `<b>(${inner})² − ${C(A)}(${inner}) + ${C(B)} = 0</b> met k = ${inner} word…?`);
    const correct = L(`k² − ${C(A)}k + ${C(B)} = 0`, `k² − ${C(A)}k + ${C(B)} = 0`);
    const wrongs = [
      L(`k² − ${C(A)}k² + ${C(B)} = 0`, `k² − ${C(A)}k² + ${C(B)} = 0`),
      L(`k − ${C(A)}k + ${C(B)} = 0`, `k − ${C(A)}k + ${C(B)} = 0`),
      L(`k² + ${C(A)}k − ${C(B)} = 0`, `k² + ${C(A)}k − ${C(B)} = 0`),
    ];
    return mc(CON, prompt, correct, wrongs,
      { hint: L("Replace every copy of the bracket with k — signs and numbers stay exactly as they were.", "Vervang elke kopie van die hakie met k: tekens en getalle bly presies soos hulle was."),
        answerLabel: L(`Each (${inner}) becomes a k: k² − ${C(A)}k + ${C(B)} = 0. Solve for k, then go back to x.`, `Elke (${inner}) word 'n k: k² − ${C(A)}k + ${C(B)} = 0. Los op vir k, gaan dan terug na x.`),
        solution: [
          { s: L(`Swap every copy of (${inner}) for K, and change nothing else`, `Ruil elke kopie van (${inner}) vir K, en verander niks anders nie`) },
          { s: L(`(${inner})² → K², and ${C(A)}(${inner}) → ${C(A)}K`, `(${inner})² → K², en ${C(A)}(${inner}) → ${C(A)}K`), r: L("the ² stays on the bracket, so it lands on the K", "die ² bly op die hakie, so dit beland op die K") },
          { s: L(`K² − ${C(A)}K + ${C(B)} = 0`, `K² − ${C(A)}K + ${C(B)} = 0`), r: L("every sign and number is exactly as it was — that is the whole trick", "elke teken en getal is presies soos dit was: dit is die hele truuk") },
        ] });
  },

  /* solving for k is NOT the end */
  notDone: () => {
    const k1 = randInt(2, 6), k2 = k1 + randInt(1, 4);
    const items = [
      ynQ(CON,
        L(`You substituted k = x² − x and solved: <b>k = ${C(k1)} or k = ${C(k2)}</b>. Are you finished?`, `Jy het k = x² − x gestel en opgelos: <b>k = ${C(k1)} of k = ${C(k2)}</b>. Is jy klaar?`),
        false,
        { hint: L("The question asked for x, not k.", "Die vraag het vir x gevra, nie vir k nie."),
          answerLabel: L(`No! k was YOUR invention. Put the bracket back: x² − x = ${C(k1)} and x² − x = ${C(k2)}, and solve each one for x.`, `Nee! k was JOU uitvinding. Sit die hakie terug: x² − x = ${C(k1)} en x² − x = ${C(k2)}, en los elkeen op vir x.`),
          solution: [
            { s: L("k was your own invention — the question never asked for it", "k was jou eie uitvinding: die vraag het nooit daarvoor gevra nie") },
            { s: L(`Substitute back: x² − x = ${C(k1)}, and separately x² − x = ${C(k2)}`, `Vervang terug: x² − x = ${C(k1)}, en afsonderlik x² − x = ${C(k2)}`) },
            { s: L("Each of those is its own quadratic to solve for x", "Elkeen daarvan is sy eie kwadratiese vergelyking om vir x op te los"), r: L("stopping at k is where the marks go missing", "as jy by k stop, gaan die punte verlore") },
          ] }),
      { q: L(`After solving k = ${C(k1)} or k = ${C(k2)}, what is the next step?`, `Nadat jy k = ${C(k1)} of k = ${C(k2)} gekry het, wat is die volgende stap?`), correct: L("Replace k with the original bracket and solve each equation for x", "Vervang k met die oorspronklike hakie en los elke vergelyking op vir x"), wrongs: [L("Write the answers down — x = k", "Skryf die antwoorde neer: x = k"), L("Add the two k values", "Tel die twee k-waardes bymekaar"), L("Substitute the k values into each other", "Vervang die k-waardes in mekaar")], ans: L("k stood for the repeated bracket, so each k-value becomes its own little equation in x. Solve both.", "k het vir die herhaalde hakie gestaan, so elke k-waarde word sy eie klein vergelyking in x. Los albei op."),
        sol: [{ s: L("You have solved the quadratic in K, but K is not what was asked for", "Jy het die kwadratiese vergelyking in K opgelos, maar K is nie waarvoor gevra is nie") },
              { s: L("Put the bracket back in place of K, once for each K-value", "Sit die hakie terug in die plek van K, een keer vir elke K-waarde") },
              { s: L("That gives two separate equations in x — solve both, and you may end up with up to four answers", "Dit gee twee aparte vergelykings in x: los albei op, en jy kan tot vier antwoorde kry") }] },
    ];
    const it = pick(items);
    return it.type ? it : mc(CON, it.q, it.correct, it.wrongs,
      { hint: L("k is a stand-in. Swap the bracket back in and keep solving.", "k is 'n plaasvervanger. Ruil die hakie terug in en hou aan oplos."), answerLabel: it.ans, solution: it.sol });
  },

  /* how many answers to expect */
  howMany: () => {
    const items = [
      { q: L("Rule of thumb: the equation's highest power is <b>x⁴</b>. AT MOST how many real solutions?", "Duimreël: die vergelyking se hoogste mag is <b>x⁴</b>. HOOGSTENS hoeveel reële oplossings?"), correct: "4", wrongs: ["2", "3", "8"], ans: L("The highest power tells you the maximum: x⁴ → up to 4 real solutions (equal roots count as one value).", "Die hoogste mag gee jou die maksimum: x⁴ → tot 4 reële oplossings (gelyke wortels tel as een waarde)."),
        sol: [{ s: L("Fully factorised, an equation splits into at most one bracket per power", "Ten volle gefaktoriseer, val 'n vergelyking uiteen in hoogstens een hakie per mag") },
              { s: L("x⁴ means four brackets, and each one can give at most one x-value", "x⁴ beteken vier hakies, en elkeen kan hoogstens een x-waarde gee") },
              { s: L("∴ at most 4 real solutions", "∴ hoogstens 4 reële oplossings"), r: L("fewer if some are non-real or repeat", "minder wanneer party nie-reëel is of herhaal") }] },
      { q: L("Rule of thumb: the equation's highest power is <b>x²</b>. AT MOST how many real solutions?", "Duimreël: die vergelyking se hoogste mag is <b>x²</b>. HOOGSTENS hoeveel reële oplossings?"), correct: "2", wrongs: ["1", "4", "3"], ans: L("A square → up to 2 real solutions.", "'n Kwadraat → tot 2 reële oplossings."),
        sol: [{ s: L("Fully factorised, an equation splits into at most one bracket per power", "Ten volle gefaktoriseer, val 'n vergelyking uiteen in hoogstens een hakie per mag") },
              { s: L("x² means two brackets, so at most two x-values", "x² beteken twee hakies, so hoogstens twee x-waardes") },
              { s: L("∴ at most 2 real solutions", "∴ hoogstens 2 reële oplossings"), r: L("Δ decides whether you get two, one or none", "Δ besluit of jy twee, een of geen kry") }] },
      { q: L("Rule of thumb: the equation's highest power is <b>x³</b>. AT MOST how many real solutions?", "Duimreël: die vergelyking se hoogste mag is <b>x³</b>. HOOGSTENS hoeveel reële oplossings?"), correct: "3", wrongs: ["2", "6", "1"], ans: L("A cube → up to 3 real solutions.", "'n Derdemag → tot 3 reële oplossings."),
        sol: [{ s: L("Fully factorised, an equation splits into at most one bracket per power", "Ten volle gefaktoriseer, val 'n vergelyking uiteen in hoogstens een hakie per mag") },
              { s: L("x³ means three brackets, so at most three x-values", "x³ beteken drie hakies, so hoogstens drie x-waardes") },
              { s: L("∴ at most 3 real solutions", "∴ hoogstens 3 reële oplossings") }] },
      { q: L("Solving gives <b>x = 2, x = 2 and x = −1</b>. How many DIFFERENT solutions is that?", "Oplos gee <b>x = 2, x = 2 en x = −1</b>. Hoeveel VERSKILLENDE oplossings is dit?"), correct: L("2 — equal roots count as ONE value", "2: gelyke wortels tel as EEN waarde"), wrongs: [L("3 — every answer counts", "3: elke antwoord tel"), L("1 — only the repeated one", "1: net die herhaalde een"), L("4 — the repeat doubles", "4: die herhaling verdubbel")], ans: L("x = 2 twice is still just the value 2. Different solutions: x = 2 and x = −1 — two of them.", "x = 2 twee keer is steeds net die waarde 2. Verskillende oplossings: x = 2 en x = −1, twee van hulle."),
        sol: [{ s: L("List the values you actually got: 2, 2 and −1", "Lys die waardes wat jy werklik gekry het: 2, 2 en −1") },
              { s: L("The question asks how many are DIFFERENT, and 2 written twice is still the single value 2", "Die vraag vra hoeveel VERSKILLEND is, en 2 wat twee keer geskryf is, is steeds die enkele waarde 2") },
              { s: L("∴ two different solutions: x = 2 and x = −1", "∴ twee verskillende oplossings: x = 2 en x = −1"), r: L("a repeated root counts once — equal roots", "'n herhaalde wortel tel een keer: gelyke wortels") }] },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs,
      { hint: L("Highest power = the most real answers you can expect; a repeated answer counts once.", "Hoogste mag = die meeste reële antwoorde wat jy kan verwag; 'n herhaalde antwoord tel een keer."), answerLabel: it.ans, solution: it.sol });
  },

  /* the repeat can hide behind a common factor — rearrange to SEE it */
  hiddenRepeat: () => {
    const items = [
      { q: L("The equation contains <b>(y² − 2y)²</b> … and later the terms <b>−2y² + 4y</b>. Where is the second copy of the bracket?", "Die vergelyking bevat <b>(y² − 2y)²</b> … en later die terme <b>−2y² + 4y</b>. Waar is die tweede kopie van die hakie?"), correct: L("−2y² + 4y = −2(y² − 2y) — factor out −2 and the repeat appears", "−2y² + 4y = −2(y² − 2y): haal −2 uit en die herhaling verskyn"), wrongs: [L("There is no second copy — the k-method can't be used", "Daar is geen tweede kopie nie: die k-metode kan nie gebruik word nie"), L("−2y² + 4y is already (y² − 2y)", "−2y² + 4y is reeds (y² − 2y)"), L("Swap it to 4y − 2y² and it becomes the bracket", "Ruil dit om na 4y − 2y² en dit word die hakie")], ans: L("Take out the common factor −2: −2y² + 4y = −2(y² − 2y). Now (y² − 2y) appears twice, so let k = y² − 2y.", "Haal die gemene faktor −2 uit: −2y² + 4y = −2(y² − 2y). Nou kom (y² − 2y) twee keer voor, so stel k = y² − 2y.") },
      { q: L("Before deciding an equation has no repeated bracket, what should you try?", "Voordat jy besluit dat 'n vergelyking geen herhaalde hakie het nie, wat moet jy probeer?"), correct: L("Factor a constant out of the loose terms — the repeat often hides behind a −2 or a 3", "Haal 'n konstante uit die los terme uit: die herhaling skuil dikwels agter 'n −2 of 'n 3"), wrongs: [L("Multiply all the brackets out", "Vermenigvuldig al die hakies uit"), L("Substitute x = 0", "Vervang x = 0"), L("Take the square root of every term", "Neem die vierkantswortel van elke term")], ans: L("A repeated expression often hides behind a common factor: −2y² + 4y hides (y² − 2y). Factor constants out FIRST, then look again.", "'n Herhaalde uitdrukking skuil dikwels agter 'n gemene faktor: −2y² + 4y steek (y² − 2y) weg. Haal konstantes EERS uit, kyk dan weer.") },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs,
      { hint: L("Factor a number out of the loose x-terms and compare with the bracket.", "Haal 'n getal uit die los x-terme uit en vergelyk met die hakie."), answerLabel: it.ans });
  },

  /* restrictions ride along on k */
  carryK: () => {
    const r = randInt(2, 6);
    const items = [
      ynQ(CON,
        L(`The original equation had the repeated bracket in a DENOMINATOR, with restriction (bracket) ≠ ${C(r)}. Does the restriction carry over to k?`, `Die oorspronklike vergelyking het die herhaalde hakie in 'n NOEMER gehad, met beperking (hakie) ≠ ${C(r)}. Gaan die beperking oor na k?`),
        true,
        { hint: L("k IS the bracket.", "k IS die hakie."),
          answerLabel: L(`Yes — k stands for that bracket, so k ≠ ${C(r)} rides along. If solving gives k = ${C(r)}, reject it (N.A.).`, `Ja: k staan vir daardie hakie, so k ≠ ${C(r)} ry saam. As oplos k = ${C(r)} gee, verwerp dit (n.v.t.).`),
          solution: [
            { s: L("k is not a new quantity — it is just a short name for that bracket", "k is nie 'n nuwe grootheid nie: dit is net 'n kort naam vir daardie hakie") },
            { s: L(`So anything true of the bracket is true of k, including (bracket) ≠ ${C(r)}`, `Alles wat van die hakie waar is, is dus van k waar, ook (hakie) ≠ ${C(r)}`) },
            { s: L(`∴ k ≠ ${C(r)} rides along, and a k-value of ${C(r)} would have to be rejected as N.A.`, `∴ k ≠ ${C(r)} ry saam, en 'n k-waarde van ${C(r)} sal as n.v.t. verwerp moet word`) },
          ] }),
      { q: L(`While using the k-method you find k = ${C(r)}, but the restriction was k ≠ ${C(r)}. What do you do?`, `Terwyl jy die k-metode gebruik, kry jy k = ${C(r)}, maar die beperking was k ≠ ${C(r)}. Wat doen jy?`), correct: L(`Reject k = ${C(r)} (mark it N.A.) and keep only the other k-value`, `Verwerp k = ${C(r)} (merk dit n.v.t.) en hou net die ander k-waarde`), wrongs: [L("Keep it — restrictions are about x, not k", "Hou dit: beperkings gaan oor x, nie oor k nie"), L("Change the restriction", "Verander die beperking"), L("Start over with a different letter", "Begin oor met 'n ander letter")], ans: L(`A value that breaks a restriction is not applicable — cross it out with N.A. and continue with the surviving k-value.`, `'n Waarde wat 'n beperking breek, is nie van toepassing nie: haal dit deur met n.v.t. en gaan voort met die k-waarde wat oorbly.`),
        sol: [{ s: L(`The restriction says the bracket may not be ${C(r)}, and k IS the bracket`, `Die beperking sê die hakie mag nie ${C(r)} wees nie, en k IS die hakie`) },
              { s: L(`So k = ${C(r)} would make a denominator 0 — it cannot be used`, `Dus sou k = ${C(r)} 'n noemer 0 maak: dit kan nie gebruik word nie`) },
              { s: L(`Mark it N.A. with a struck equals and carry on with the other k-value only`, `Merk dit n.v.t. met 'n deurgestreepte = en gaan net met die ander k-waarde voort`), r: L("the restriction was set before solving, and it still holds afterwards", "die beperking is voor die oplos gestel, en dit geld steeds daarna") }] },
    ];
    const it = pick(items);
    return it.type ? it : mc(CON, it.q, it.correct, it.wrongs,
      { hint: L("k inherits everything the bracket had — including its restriction.", "k erf alles wat die hakie gehad het, ook sy beperking."), answerLabel: it.ans, solution: it.sol });
  },
};

export const questEq3 = {
  id: "eq3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
