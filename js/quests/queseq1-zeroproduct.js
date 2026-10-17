/* ============================================================
   EQUATIONS & INEQUALITIES · Q1 — Standard form & brackets = 0
   ------------------------------------------------------------
   Everything to one side so it equals 0, the zero-product rule
   (set each bracket = 0, do NOT multiply out), roots ↔ factors
   with opposite signs, and the calculator's EQN mode.
   THEORY only — choosing the move, not crunching numbers.
   ============================================================ */
import { mc, ynQ, pick, randInt, C, frac } from "./_eq.js";
import { L } from "../lang.js";

const FORM = "eqStdForm";
const ZERO = "eqZeroProduct";

/* "(x − 3)" / "(x + 5)" from a root, opposite sign */
const factorOf = (r) => (r > 0 ? `(x − ${C(r)})` : `(x + ${C(-r)})`);

const SKILLS = {
  /* the first step for almost every quadratic */
  firstStep: () => {
    const items = [
      { q: L("You must solve <b>x² + 3x = 10</b>. What is the FIRST step?", "Jy moet <b>x² + 3x = 10</b> oplos. Wat is die EERSTE stap?"), correct: L("Take everything to one side so the other side is 0", "Bring alles na een kant sodat die ander kant 0 is"), wrongs: [L("Divide both sides by x", "Deel albei kante deur x"), L("Square-root both sides", "Neem √ van albei kante"), L("Substitute x = 0 to check", "Vervang x = 0 om te toets")], ans: L("Almost every quadratic starts the same way: rearrange into standard form ax² + bx + c = 0, THEN factorise.", "Byna elke kwadratiese vergelyking begin dieselfde: herrangskik na standaardvorm ax² + bx + c = 0, DAN faktoriseer.") },
      { q: L("What is the <b>standard form</b> of a quadratic equation?", "Wat is die <b>standaardvorm</b> van 'n kwadratiese vergelyking?"), correct: L("ax² + bx + c = 0", "ax² + bx + c = 0"), wrongs: [L("ax² + bx = c", "ax² + bx = c"), L("ax + b = 0", "ax + b = 0"), L("a(x − p)² + q = 0", "a(x − p)² + q = 0")], ans: L("Standard form is ax² + bx + c = 0 — everything on one side, 0 on the other.", "Standaardvorm is ax² + bx + c = 0: alles aan een kant, 0 aan die ander.") },
      { q: L("Solve <b>10 + 3y − y² = 0</b>. What tidy-up makes it easiest to factorise?", "Los <b>10 + 3y − y² = 0</b> op. Watter opruimstap maak dit die maklikste om te faktoriseer?"), correct: L("Rearrange to y² − 3y − 10 = 0 (positive square term first)", "Herrangskik na y² − 3y − 10 = 0 (positiewe kwadraatterm eerste)"), wrongs: [L("Leave it as it is and factorise", "Laat dit soos dit is en faktoriseer"), L("Divide everything by y", "Deel alles deur y"), L("Move the 10 to the right first", "Bring eers die 10 na regs")], ans: L("Rewrite with the square term positive and in front: y² − 3y − 10 = 0, which factorises to (y − 5)(y + 2) = 0.", "Skryf oor met die kwadraatterm positief en voor: y² − 3y − 10 = 0, wat faktoriseer as (y − 5)(y + 2) = 0.") },
    ];
    const it = pick(items);
    return mc(FORM, it.q, it.correct, it.wrongs,
      { hint: L("Standard form first: everything to ONE side, 0 on the other.", "Eers standaardvorm: alles na EEN kant, 0 aan die ander."), answerLabel: it.ans });
  },

  /* the calculator EQN routine — including the workbook's own option trap */
  eqnMode: () => {
    const items = [
      { q: L("On the calculator: <b>MODE → 5: EQN</b>. Which option solves a QUADRATIC (ax² + bx + c = 0)?", "Op die sakrekenaar: <b>MODE → 5: EQN</b>. Watter opsie los 'n KWADRATIESE vergelyking (ax² + bx + c = 0) op?"), correct: L("3: aX² + bX + c = 0", "3: aX² + bX + c = 0"), wrongs: [L("4: aX³ + bX² + cX + d = 0", "4: aX³ + bX² + cX + d = 0"), L("1: anX + bnY = cn", "1: anX + bnY = cn"), L("2: anX + bnY + cnZ = dn", "2: anX + bnY + cnZ = dn")], ans: L("Option 3 is the quadratic. Option 4 is the CUBIC — a common mis-pick. (Even the workbook wrote it wrong once!)", "Opsie 3 is die kwadratiese een. Opsie 4 is die DERDEGRAADSE een: 'n algemene verkeerde keuse. (Selfs die werkboek het dit een keer verkeerd geskryf!)"),
        sol: [{ s: L("Match the shape on the screen to the shape of your equation", "Pas die vorm op die skerm by die vorm van jou vergelyking") },
              { s: L("A quadratic's highest power is x², so you want the line that shows aX² + bX + c", "'n Kwadratiese vergelyking se hoogste mag is x², so jy wil die opsie hê wat aX² + bX + c wys") },
              { s: L("That is option 3", "Dit is opsie 3"), r: L("option 4 shows aX³ — that is a CUBIC, and it will ask you for a fourth coefficient d", "opsie 4 wys aX³: dit is 'n DERDEGRAADSE vergelyking, en dit sal jou vir 'n vierde koëffisiënt d vra") }] },
      { q: L("In EQN mode you type in the coefficients a, b and c. How must you type them?", "In EQN-modus tik jy die koëffisiënte a, b en c in. Hoe moet jy hulle intik?"), correct: L("Each with its own sign", "Elkeen met sy eie teken"), wrongs: [L("Always positive — signs don't matter", "Altyd positief: tekens maak nie saak nie"), L("Only a gets a sign", "Net a kry 'n teken"), L("As fractions only", "Net as breuke")], ans: L("Every coefficient goes in WITH its sign: for x² − 2x − 1 = 0 that's a = 1, b = −2, c = −1.", "Elke koëffisiënt gaan MET sy teken in: vir x² − 2x − 1 = 0 is dit a = 1, b = −2, c = −1."),
        sol: [{ s: L("Standard form is ax² + bx + c = 0, with PLUS signs written between the terms", "Standaardvorm is ax² + bx + c = 0, met PLUS-tekens tussen die terme") },
              { s: L("So in x² − 2x − 1 = 0 the b term is + (−2)x and the c term is + (−1)", "Dus in x² − 2x − 1 = 0 is die b-term + (−2)x en die c-term + (−1)") },
              { s: L("Type a = 1, b = −2, c = −1", "Tik a = 1, b = −2, c = −1 in"), r: L("drop a minus and the calculator solves a different equation", "laat 'n minus weg en die sakrekenaar los 'n ander vergelyking op") }] },
      { q: L("After entering a, b and c in EQN mode, what does the calculator show?", "Nadat jy a, b en c in EQN-modus ingetik het, wat wys die sakrekenaar?"), correct: L("The two roots, X₁ and X₂", "Die twee wortels, X₁ en X₂"), wrongs: [L("The factors, e.g. (2x − 1)(x + 3)", "Die faktore, bv. (2x − 1)(x + 3)"), L("The turning point", "Die draaipunt"), L("Only whether solutions exist", "Net of daar oplossings is")], ans: L("The calculator gives the ROOTS as numbers (X₁ and X₂) — turning them back into factors is your job.", "Die sakrekenaar gee die WORTELS as getalle (X₁ en X₂): om hulle terug te draai na faktore is jou werk."),
        sol: [{ s: L("EQN mode solves the equation, so what comes back are the x-values that make it 0", "EQN-modus los die vergelyking op, so wat terugkom, is die x-waardes wat dit 0 maak") },
              { s: L("They appear as X₁ and X₂ — two numbers, not brackets", "Hulle verskyn as X₁ en X₂: twee getalle, nie hakies nie") },
              { s: L("To get factors you do the next bit yourself: opposite signs in the brackets, and any denominator multiplies the x", "Om faktore te kry, doen jy self die volgende stukkie: teenoorgestelde tekens in die hakies, en enige noemer vermenigvuldig die x") }] },
    ];
    const it = pick(items);
    return mc(FORM, it.q, it.correct, it.wrongs,
      { hint: L("MODE → 5: EQN → 3: aX² + bX + c = 0 → type a, b, c with their signs.", "MODE → 5: EQN → 3: aX² + bX + c = 0 → tik a, b, c met hul tekens in."), answerLabel: it.ans, solution: it.sol });
  },

  /* roots → factors (opposite sign; denominator multiplies the x)
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE). The four
     hand-written items were x = ½ · x = −3 · x = −⅔ · x = 4 — two shapes
     (whole-number root, fraction root) with a simple enough pattern to
     roll. Wording, mechanic and teaching point are unchanged; only the
     root is rolled now. Guards: the fraction is always in lowest terms
     (gcd = 1) and a real fraction (n < d), so the "denominator multiplies
     the x" point always has something to bite on; the swapped-numbers
     decoy drops the "1x" when n = 1, exactly as the ½ item did. */
  rootsToFactors: () => {
    const whole = pick([true, false]);
    const s = pick([1, -1]);
    const opp = s > 0 ? "−" : "+";          // the bracket carries the OPPOSITE sign
    const same = s > 0 ? "+" : "−";
    if (whole) {
      const r = randInt(2, 9) * s;
      const k = Math.abs(r);
      return mc(FORM,
        L(`The calculator gives a root <b>x = ${C(r)}</b>. Which factor does it come from?`, `Die sakrekenaar gee 'n wortel <b>x = ${C(r)}</b>. Van watter faktor kom dit?`),
        L(`(x ${opp} ${C(k)})`, `(x ${opp} ${C(k)})`),
        [L(`(x ${same} ${C(k)})`, `(x ${same} ${C(k)})`), L(`(${C(k)}x ${opp} 1)`, `(${C(k)}x ${opp} 1)`), L(`(${C(k)}x ${same} 1)`, `(${C(k)}x ${same} 1)`)],
        { hint: L("Put the OPPOSITE sign in the bracket. For a fraction root, the denominator multiplies the x.", "Sit die TEENOORGESTELDE teken in die hakie. Vir 'n breukwortel vermenigvuldig die noemer die x."),
          answerLabel: L(`Opposite sign of the root: x = ${C(r)} comes from (x ${opp} ${C(k)}).`, `Teenoorgestelde teken van die wortel: x = ${C(r)} kom van (x ${opp} ${C(k)}).`),
          solution: [
            { s: L(`A root is an x-value that makes its bracket equal 0, so start there: x = ${C(r)}`, `'n Wortel is 'n x-waarde wat sy hakie gelyk aan 0 maak, so begin daar: x = ${C(r)}`) },
            { s: L(`Take everything to one side: x ${opp} ${C(k)} = 0`, `Bring alles na een kant: x ${opp} ${C(k)} = 0`) },
            { s: L(`That line IS the bracket: (x ${opp} ${C(k)})`, `Daardie lyn IS die hakie: (x ${opp} ${C(k)})`), r: L("the bracket always carries the OPPOSITE sign to the root", "die hakie dra altyd die TEENOORGESTELDE teken van die wortel") },
          ] });
    }
    const gcd = (x, y) => (y ? gcd(y, x % y) : x);
    const d = pick([2, 3, 4, 5]);
    let n = randInt(1, d - 1);
    while (gcd(n, d) !== 1) n = randInt(1, d - 1);   // lowest terms: the root really is a fraction
    const rootStr = `${s < 0 ? "−" : ""}${frac(n, d)}`;
    /* n = 1 would print "1x" — the original ½ item wrote "(x − 2)" there */
    const swapped = n === 1 ? L(`(x ${opp} ${C(d)})`, `(x ${opp} ${C(d)})`) : L(`(${C(n)}x ${opp} ${C(d)})`, `(${C(n)}x ${opp} ${C(d)})`);
    return mc(FORM,
      L(`The calculator gives a root <b>x = ${rootStr}</b>. Which factor does it come from?`, `Die sakrekenaar gee 'n wortel <b>x = ${rootStr}</b>. Van watter faktor kom dit?`),
      L(`(${C(d)}x ${opp} ${C(n)})`, `(${C(d)}x ${opp} ${C(n)})`),
      [L(`(${C(d)}x ${same} ${C(n)})`, `(${C(d)}x ${same} ${C(n)})`), swapped, L(`(x ${opp} ${frac(n, d)})`, `(x ${opp} ${frac(n, d)})`)],
      { hint: L("Put the OPPOSITE sign in the bracket. For a fraction root, the denominator multiplies the x.", "Sit die TEENOORGESTELDE teken in die hakie. Vir 'n breukwortel vermenigvuldig die noemer die x."),
        answerLabel: L(`Denominator ${C(d)} multiplies the x; numerator ${C(n)} crosses over with the opposite sign: (${C(d)}x ${opp} ${C(n)}).`, `Noemer ${C(d)} vermenigvuldig die x; teller ${C(n)} gaan oor met die teenoorgestelde teken: (${C(d)}x ${opp} ${C(n)}).`),
        solution: [
          { s: L(`Start from the root: x = ${rootStr}`, `Begin by die wortel: x = ${rootStr}`) },
          { s: L(`Multiply the denominator to the x: ${C(d)}x = ${s < 0 ? "−" : ""}${C(n)}`, `Vermenigvuldig die noemer na die x: ${C(d)}x = ${s < 0 ? "−" : ""}${C(n)}`), r: L("her calculator trick: multiply denom to x", "haar sakrekenaartruuk: vermenigvuldig die noemer na x") },
          { s: L(`Take the numerator over the =: ${C(d)}x ${opp} ${C(n)} = 0`, `Bring die teller oor die =: ${C(d)}x ${opp} ${C(n)} = 0`), r: L(`so the factor is (${C(d)}x ${opp} ${C(n)})`, `dus is die faktor (${C(d)}x ${opp} ${C(n)})`) },
        ] });
  },

  /* the zero-product rule itself */
  whyRule: () => {
    const items = [
      { q: L("Why may you set each bracket of <b>(x − 5)(x − 2) = 0</b> equal to 0 on its own?", "Hoekom mag jy elke hakie van <b>(x − 5)(x − 2) = 0</b> op sy eie gelyk aan 0 stel?"), correct: L("A product is 0 only when at least one factor is 0", "'n Produk is net 0 as minstens een faktor 0 is"), wrongs: [L("Because both brackets must equal 0 at the same time", "Omdat albei hakies terselfdertyd 0 moet wees"), L("Because the brackets are equal to each other", "Omdat die hakies aan mekaar gelyk is"), L("Because 0 divided by anything is 0", "Omdat 0 gedeel deur enigiets 0 is")], ans: L("That's the zero-product rule: if A·B = 0 then A = 0 or B = 0 — nothing else can multiply to give 0.", "Dit is die nulproduk-reël: as A·B = 0, dan A = 0 of B = 0. Niks anders kan vermenigvuldig om 0 te gee nie."),
        sol: [{ s: L("Think about what makes a product come out as 0", "Dink na oor wat 'n produk 0 laat uitkom") },
              { s: L("Two numbers multiply to 0 only if at least one of them IS 0 — no other pair can do it", "Twee getalle vermenigvuldig net na 0 as minstens een van hulle 0 IS: geen ander paar kan dit doen nie") },
              { s: L("So A·B = 0 forces A = 0 or B = 0, and each bracket may be solved on its own", "Dus dwing A·B = 0 dat A = 0 of B = 0, en elke hakie mag op sy eie opgelos word"), r: L("“or”, not “and” — they need not both be 0", "“of”, nie “en” nie: hulle hoef nie albei 0 te wees nie") }] },
      { q: L("The equation is already factorised: <b>(x − 5)(x − 2) = 0</b>. What should you do?", "Die vergelyking is reeds gefaktoriseer: <b>(x − 5)(x − 2) = 0</b>. Wat moet jy doen?"), correct: L("Set each bracket equal to 0 separately and solve", "Stel elke hakie afsonderlik gelyk aan 0 en los op"), wrongs: [L("Multiply the brackets out first", "Vermenigvuldig eers die hakies uit"), L("Divide both sides by (x − 5)", "Deel albei kante deur (x − 5)"), L("Add the brackets together", "Tel die hakies bymekaar")], ans: L("Don't undo the gift! It's already factorised — set x − 5 = 0 or x − 2 = 0. (Dividing by (x − 5) throws the x = 5 answer away.)", "Moenie die geskenk ongedaan maak nie! Dit is reeds gefaktoriseer: stel x − 5 = 0 of x − 2 = 0. (Om deur (x − 5) te deel, gooi die antwoord x = 5 weg.)"),
        sol: [{ s: L("Factorised and equal to 0 is exactly the form the zero-product rule needs — the hard work is already done", "Gefaktoriseer en gelyk aan 0 is presies die vorm wat die nulproduk-reël nodig het: die harde werk is klaar gedoen") },
              { s: L("So split it: x − 5 = 0 or x − 2 = 0, giving x = 5 or x = 2", "Verdeel dit dus: x − 5 = 0 of x − 2 = 0, wat x = 5 of x = 2 gee") },
              { s: L("Multiplying out would put you back at the start, and dividing by (x − 5) would delete the x = 5 answer", "Uitvermenigvuldig sit jou terug by die begin, en om deur (x − 5) te deel, vee die antwoord x = 5 uit"), r: L("never divide a factor away", "deel nooit 'n faktor weg nie") }] },
    ];
    const it = pick(items);
    return mc(ZERO, it.q, it.correct, it.wrongs,
      { hint: L("Brackets = 0 → each bracket = 0 on its own. Don't multiply out; don't divide a factor away.", "Hakies = 0 → elke hakie = 0 op sy eie. Moenie uitvermenigvuldig nie; moenie 'n faktor wegdeel nie."), answerLabel: it.ans, solution: it.sol });
  },

  /* read the solutions straight off the brackets — fresh numbers */
  bracketsZero: () => {
    const p = randInt(1, 8);
    let q = randInt(1, 8); if (q === p) q = p + 1;   // p ≠ q, else "x = −p or x = q" duplicates the correct answer set
    const prompt = L(`Solve: <b>(x − ${C(p)})(x + ${C(q)}) = 0</b>`, `Los op: <b>(x − ${C(p)})(x + ${C(q)}) = 0</b>`);
    const correct = L(`x = ${C(p)} or x = ${C(-q)}`, `x = ${C(p)} of x = ${C(-q)}`);
    const wrongs = [
      L(`x = ${C(-p)} or x = ${C(q)}`, `x = ${C(-p)} of x = ${C(q)}`),
      L(`x = ${C(p)} or x = ${C(q)}`, `x = ${C(p)} of x = ${C(q)}`),
      L(`x = ${C(-p)} or x = ${C(-q)}`, `x = ${C(-p)} of x = ${C(-q)}`),
    ];
    return mc(ZERO, prompt, correct, wrongs,
      { hint: L("Each bracket = 0 → the answer has the OPPOSITE sign of the number in the bracket.", "Elke hakie = 0 → die antwoord het die TEENOORGESTELDE teken van die getal in die hakie."),
        answerLabel: L(`x − ${C(p)} = 0 gives x = ${C(p)}; x + ${C(q)} = 0 gives x = ${C(-q)}.`, `x − ${C(p)} = 0 gee x = ${C(p)}; x + ${C(q)} = 0 gee x = ${C(-q)}.`),
        solution: [
          { s: L(`The product is already 0, so set each bracket to 0 on its own`, `Die produk is reeds 0, so stel elke hakie op sy eie gelyk aan 0`), r: L("zero-product rule", "nulproduk-reël") },
          { s: L(`x − ${C(p)} = 0  →  x = ${C(p)}`, `x − ${C(p)} = 0  →  x = ${C(p)}`) },
          { s: L(`x + ${C(q)} = 0  →  x = ${C(-q)}`, `x + ${C(q)} = 0  →  x = ${C(-q)}`), r: L("the answer flips the sign that is inside the bracket", "die antwoord draai die teken binne die hakie om") },
        ] });
  },

  /* three factors → three solutions (don't drop the lonely x) */
  threeFactors: () => {
    const a = pick([2, 3]), c = randInt(2, 5);
    let bb = pick([1, 3, 5, 7]); if (bb === a) bb = 5;   // keep the fraction b/a a REAL fraction
    const prompt = L(`Solve: <b>x(${C(a)}x − ${C(bb)})(−x + ${C(c)}) = 0</b>`, `Los op: <b>x(${C(a)}x − ${C(bb)})(−x + ${C(c)}) = 0</b>`);
    const correct = L(`x = 0, x = ${frac(bb, a)} or x = ${C(c)}`, `x = 0, x = ${frac(bb, a)} of x = ${C(c)}`);
    const wrongs = [
      L(`x = ${frac(bb, a)} or x = ${C(c)} (only two answers)`, `x = ${frac(bb, a)} of x = ${C(c)} (net twee antwoorde)`),
      L(`x = 0, x = ${frac(bb, a)} or x = ${C(-c)}`, `x = 0, x = ${frac(bb, a)} of x = ${C(-c)}`),
      L(`x = 0, x = ${C(-bb)} or x = ${C(c)}`, `x = 0, x = ${C(-bb)} of x = ${C(c)}`),
    ];
    return mc(ZERO, prompt, correct, wrongs,
      { hint: L("THREE factors → up to three answers. The lonely x in front is a factor too: x = 0.", "DRIE faktore → tot drie antwoorde. Die eensame x voor is ook 'n faktor: x = 0."),
        answerLabel: L(`x = 0; ${C(a)}x = ${C(bb)} gives x = ${frac(bb, a)}; −x = ${C(-c)} gives x = ${C(c)}.`, `x = 0; ${C(a)}x = ${C(bb)} gee x = ${frac(bb, a)}; −x = ${C(-c)} gee x = ${C(c)}.`),
        solution: [
          { s: L("Count the factors before you start: the lonely x, then two brackets — three of them", "Tel die faktore voor jy begin: die eensame x, dan twee hakies, drie altesaam"), r: L("so expect up to three answers", "verwag dus tot drie antwoorde") },
          { s: L(`The lonely x is a factor too: x = 0`, `Die eensame x is ook 'n faktor: x = 0`) },
          { s: L(`${C(a)}x − ${C(bb)} = 0  →  ${C(a)}x = ${C(bb)}  →  x = ${frac(bb, a)}`, `${C(a)}x − ${C(bb)} = 0  →  ${C(a)}x = ${C(bb)}  →  x = ${frac(bb, a)}`) },
          { s: L(`−x + ${C(c)} = 0  →  x = ${C(c)}`, `−x + ${C(c)} = 0  →  x = ${C(c)}`), r: L("watch the negative x — dividing by −1 flips the sign", "pasop vir die negatiewe x: om deur −1 te deel, draai die teken om") },
        ] });
  },

  /* the "= 6" trap — the rule ONLY works against 0 */
  onlyAgainstZero: () => {
    const k = pick([6, 8, 10, 12]);
    const items = [
      ynQ(ZERO,
        L(`<b>(x − 3)(x + 2) = ${C(k)}</b>. May you write x − 3 = ${C(k)} or x + 2 = ${C(k)}?`, `<b>(x − 3)(x + 2) = ${C(k)}</b>. Mag jy x − 3 = ${C(k)} of x + 2 = ${C(k)} skryf?`),
        false,
        { hint: L(`Does the zero-product rule work against ${C(k)}?`, `Werk die nulproduk-reël as die produk ${C(k)} is?`),
          answerLabel: L(`No! Brackets may only be split up when the product is 0. Here you must first multiply out and bring the ${C(k)} across, so it equals 0.`, `Nee! Hakies mag net opgedeel word as die produk 0 is. Hier moet jy eers uitvermenigvuldig en die ${C(k)} oorbring, sodat dit gelyk is aan 0.`),
          solution: [
            { s: L(`The zero-product rule needs a product of 0, and this one equals ${C(k)}`, `Die nulproduk-reël het 'n produk van 0 nodig, en hierdie een is gelyk aan ${C(k)}`) },
            { s: L(`Many pairs multiply to ${C(k)}, so knowing the product tells you nothing about either bracket`, `Baie pare vermenigvuldig na ${C(k)}, so om die produk te ken, sê niks oor enige van die hakies nie`) },
            { s: L(`Multiply out first, bring the ${C(k)} across so the right side is 0, THEN factorise again`, `Vermenigvuldig eers uit, bring die ${C(k)} oor sodat die regterkant 0 is, DAN faktoriseer weer`), r: L("standard form before the rule", "standaardvorm voor die reël") },
          ] }),
      ynQ(ZERO,
        L("The zero-product rule works for a product equal to ANY number, not just 0. True?", "Die nulproduk-reël werk vir 'n produk gelyk aan ENIGE getal, nie net 0 nie. Waar?"),
        false,
        { hint: L("2 × 3 = 6, but so is 1 × 6 and 12 × ½ …", "2 × 3 = 6, maar so ook 1 × 6 en 12 × ½ …"),
          answerLabel: L("False — lots of pairs multiply to 6, so the factors tell you nothing. Only 0 forces a factor to BE 0.", "Onwaar: baie pare vermenigvuldig na 6, so die faktore sê vir jou niks. Net 0 dwing 'n faktor om 0 te WEES."),
          solution: [
            { s: L("Try it on 6: 2 × 3 = 6, and so does 1 × 6, and so does 12 × ½", "Toets dit met 6: 2 × 3 = 6, en so ook 1 × 6, en so ook 12 × ½") },
            { s: L("Endlessly many pairs give 6, so neither factor is pinned down to anything", "Oneindig baie pare gee 6, so geen faktor word op iets vasgepen nie") },
            { s: L("0 is the only product that forces a factor to BE 0", "0 is die enigste produk wat 'n faktor dwing om 0 te WEES"), r: L("∴ false — the rule works against 0 and nothing else", "∴ onwaar: die reël werk net met 0, met niks anders nie") },
          ] }),
    ];
    return pick(items);
  },
};

export const questEq1 = {
  id: "eq1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id === "whyRule" || id === "bracketsZero" || id === "threeFactors" || id === "onlyAgainstZero" ? ZERO : FORM, gen })),
};
