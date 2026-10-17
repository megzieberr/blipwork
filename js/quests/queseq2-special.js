/* ============================================================
   EQUATIONS & INEQUALITIES · Q2 — Special cases & exponent brackets
   ------------------------------------------------------------
   No b term (± both sides / difference of squares), no c term
   (common factor — and why you may NOT divide by x), x² = negative
   → no real solution, and factor-form equations with exponents:
   same base, 2ˣ = −4 has no solution, and where x^(2/3) = 16
   gets its ± from.
   ============================================================ */
import { mc, ynQ, pick, randInt, C, pw, frac } from "./_eq.js";
import { L } from "../lang.js";

const SPEC = "eqSpecialCases";
const EXPB = "eqExpBrackets";

/* unicode superscript digits — the chapter writes small powers inline
   ("16 = 2⁴", "1 = 3⁰") rather than as <sup>, so a rolled power needs
   the same glyphs. Only 0-9 ever reach this. */
const SUPD = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
const supDigits = (n) => String(n).split("").map((d) => SUPD[Number(d)]).join("");
/* "…divide by 2 four times…" — the count is spelled out, her wording */
const TIMES = { 2: L("twice", "twee keer"), 3: L("three times", "drie keer"), 4: L("four times", "vier keer") };

const SKILLS = {
  /* x² = a negative number */
  noRealSol: () => {
    const k = randInt(2, 9);
    const items = [
      { q: L(`You reach <b>x² = −${C(k)}</b>. What can you conclude?`, `Jy kry <b>x² = −${C(k)}</b>. Wat kan jy aflei?`), correct: L("There is no real solution — a square is never negative", "Daar is geen reële oplossing nie: 'n kwadraat is nooit negatief nie"), wrongs: [L(`x = −√${C(k)}`, `x = −√${C(k)}`), L(`x = ±√${C(k)}`, `x = ±√${C(k)}`), L(`x = ${C(k)} or x = −${C(k)}`, `x = ${C(k)} of x = −${C(k)}`)], ans: L(`x² is 0 or positive for every real x, so x² = −${C(k)} can never be true. Write: no real solution.`, `x² is 0 of positief vir elke reële x, so x² = −${C(k)} kan nooit waar wees nie. Skryf: geen reële oplossing.`),
        sol: [{ s: L("Ask the one question first: can a square ever come out negative?", "Vra eers die een vraag: kan 'n kwadraat ooit negatief uitkom?") },
              { s: L(`Positive² is positive, negative² is positive, and 0² = 0 — so x² is never below 0`, `Positief² is positief, negatief² is positief, en 0² = 0: so x² is nooit onder 0 nie`) },
              { s: L(`x² = −${C(k)} is impossible ∴ no real solution`, `x² = −${C(k)} is onmoontlik ∴ geen reële oplossing`), r: L("non-real, because the √ of a negative is non-real", "nie-reëel, want die √ van 'n negatief is nie-reëel") }] },
      { q: L(`Solve <b>x² + ${C(k)} = 0</b>.`, `Los <b>x² + ${C(k)} = 0</b> op.`), correct: L("No real solution", "Geen reële oplossing"), wrongs: [L(`x = ±√${C(k)}`, `x = ±√${C(k)}`), L(`x = −${C(k)}`, `x = −${C(k)}`), L("x = 0", "x = 0")], ans: L(`Take the ${C(k)} across: x² = −${C(k)}. A square can't be negative → no real solution.`, `Bring die ${C(k)} oor: x² = −${C(k)}. 'n Kwadraat kan nie negatief wees nie → geen reële oplossing.`),
        sol: [{ s: L(`Get x² on its own: x² + ${C(k)} = 0  →  x² = −${C(k)}`, `Kry x² alleen: x² + ${C(k)} = 0  →  x² = −${C(k)}`) },
              { s: L("Now check the sign: a square is never negative", "Kyk nou na die teken: 'n kwadraat is nooit negatief nie") },
              { s: L("∴ no real solution", "∴ geen reële oplossing"), r: L("there is nothing to factorise and nothing to root", "daar is niks om te faktoriseer nie en geen wortel om te trek nie") }] },
    ];
    const it = pick(items);
    return mc(SPEC, it.q, it.correct, it.wrongs,
      { hint: L("Ask: can a square ever be negative?", "Vra: kan 'n kwadraat ooit negatief wees?"), answerLabel: it.ans, solution: it.sol });
  },

  /* no b term — difference of squares / √ both sides with ± */
  noB: () => {
    const k = randInt(2, 7);
    const items = [
      { q: L(`<b>x² − ${C(k * k)} = 0</b> has no middle (b) term. Which methods work?`, `<b>x² − ${C(k * k)} = 0</b> het geen middelterm (b) nie. Watter metodes werk?`), correct: L("Difference of squares, OR square-root both sides keeping ±", "Verskil van twee vierkante, OF vierkantswortel van albei kante en hou die ±"), wrongs: [L("Only the quadratic formula", "Net die kwadratiese formule"), L("Take out the common factor x", "Haal die gemene faktor x uit"), L("Complete the square — nothing else works", "Voltooi die vierkant: niks anders werk nie")], ans: L(`(x + ${C(k)})(x − ${C(k)}) = 0, or square-root both sides: x = ±${C(k)}. Both give the same two answers.`, `(x + ${C(k)})(x − ${C(k)}) = 0, of neem die vierkantswortel van albei kante: x = ±${C(k)}. Albei gee dieselfde twee antwoorde.`),
        sol: [{ s: L(`No middle term, and ${C(k * k)} is a perfect square, so it is a diff in □'s`, `Geen middelterm nie, en ${C(k * k)} is 'n volkome vierkant, so dit is 'n verskil van twee vierkante`) },
              { s: L(`x² − ${C(k * k)} = (x + ${C(k)})(x − ${C(k)}) = 0  →  x = −${C(k)} or x = ${C(k)}`, `x² − ${C(k * k)} = (x + ${C(k)})(x − ${C(k)}) = 0  →  x = −${C(k)} of x = ${C(k)}`) },
              { s: L(`OR go straight for the root: x² = ${C(k * k)}  →  x = ±${C(k)}`, `OF gaan reguit vir die wortel: x² = ${C(k * k)}  →  x = ±${C(k)}`), r: L("both roads are hers, and they give the same two answers", "albei paaie is hare, en hulle gee dieselfde twee antwoorde") }] },
      { q: L(`Solve <b>x² = ${C(k * k)}</b>.`, `Los <b>x² = ${C(k * k)}</b> op.`), correct: L(`x = ±${C(k)}`, `x = ±${C(k)}`), wrongs: [L(`x = ${C(k)} only`, `net x = ${C(k)}`), L(`x = −${C(k)} only`, `net x = −${C(k)}`), L(`x = ${C(k * k)} or x = −${C(k * k)}`, `x = ${C(k * k)} of x = −${C(k * k)}`)], ans: L(`Square-rooting BOTH sides of an equation gives both signs: x = ±${C(k)}, because (${C(k)})² and (−${C(k)})² both equal ${C(k * k)}.`, `As jy die vierkantswortel van ALBEI kante van 'n vergelyking neem, kry jy albei tekens: x = ±${C(k)}, want (${C(k)})² en (−${C(k)})² is albei gelyk aan ${C(k * k)}.`),
        sol: [{ s: L(`x² = ${C(k * k)}, so take the square root of BOTH sides`, `x² = ${C(k * k)}, so neem die vierkantswortel van ALBEI kante`) },
              { s: L(`x = ±${C(k)}`, `x = ±${C(k)}`), r: L("the ± appears the moment an even root is taken in an EQUATION", "die ± verskyn sodra 'n ewe wortel in 'n VERGELYKING geneem word") },
              { s: L(`Check both: (${C(k)})² = ${C(k * k)} and (−${C(k)})² = ${C(k * k)}`, `Toets albei: (${C(k)})² = ${C(k * k)} en (−${C(k)})² = ${C(k * k)}`), r: L("both really work, so both are answers", "albei werk regtig, so albei is antwoorde") }] },
    ];
    const it = pick(items);
    return mc(SPEC, it.q, it.correct, it.wrongs,
      { hint: L("No b term → difference of squares, or √ both sides and keep the ±.", "Geen b-term → verskil van twee vierkante, of √ albei kante en hou die ±."), answerLabel: it.ans, solution: it.sol });
  },

  /* the ± is not optional */
  plusMinus: () => {
    const k = pick([5, 6, 7, 8, 9]);
    const items = [
      ynQ(SPEC,
        L(`A learner solves x² = ${C(k * k)} and writes only <b>x = ${C(k)}</b>. Is that full marks?`, `'n Leerder los x² = ${C(k * k)} op en skryf net <b>x = ${C(k)}</b>. Is dit vol punte?`),
        false,
        { hint: L(`Does (−${C(k)})² also equal ${C(k * k)}?`, `Is (−${C(k)})² ook gelyk aan ${C(k * k)}?`),
          answerLabel: L(`No — (−${C(k)})² = ${C(k * k)} too. When you square-root both sides of an EQUATION you must keep both signs: x = ±${C(k)}.`, `Nee: (−${C(k)})² = ${C(k * k)} ook. As jy die vierkantswortel van albei kante van 'n VERGELYKING neem, moet jy albei tekens hou: x = ±${C(k)}.`),
          solution: [
            { s: L(`Test the other sign: (−${C(k)})² = ${C(k * k)}, which fits the equation just as well`, `Toets die ander teken: (−${C(k)})² = ${C(k * k)}, wat net so goed in die vergelyking pas`) },
            { s: L(`So the equation really has TWO solutions, and only one has been written down`, `Die vergelyking het dus regtig TWEE oplossings, en net een is neergeskryf`) },
            { s: L(`x = ±${C(k)}`, `x = ±${C(k)}`), r: L("the ± is not decoration — it is the second answer, and it carries a mark", "die ± is nie versiering nie: dit is die tweede antwoord, en dit dra 'n punt") },
          ] }),
      ynQ(SPEC,
        L("When you square-root both sides of an equation, you must write ± on the answer. True?", "As jy die vierkantswortel van albei kante van 'n vergelyking neem, moet jy ± by die antwoord skryf. Waar?"),
        true,
        { hint: L("Two different numbers can have the same square.", "Twee verskillende getalle kan dieselfde kwadraat hê."),
          answerLabel: L("True — both the positive and the negative value square to the same thing, so both are solutions.", "Waar: die positiewe en die negatiewe waarde gee albei dieselfde kwadraat, so albei is oplossings."),
          solution: [
            { s: L("Squaring throws away the sign: 4² = 16 and (−4)² = 16", "Kwadrering gooi die teken weg: 4² = 16 en (−4)² = 16") },
            { s: L("So undoing a square has to put both possibilities back", "Om 'n kwadraat ongedaan te maak, moet jy dus albei moontlikhede terugsit") },
            { s: L("∴ true — in an EQUATION the ± is compulsory", "∴ waar: in 'n VERGELYKING is die ± verpligtend"), r: L("when you are only SIMPLIFYING, √9 = 3 with no ±", "as jy net VEREENVOUDIG, is √9 = 3 sonder ±") },
          ] }),
    ];
    return pick(items);
  },

  /* no c term — common factor */
  noC: () => {
    const k = randInt(2, 9);
    const items = [
      { q: L(`<b>x² + ${C(k)}x = 0</b> has no constant (c) term. What is the method?`, `<b>x² + ${C(k)}x = 0</b> het geen konstante term (c) nie. Wat is die metode?`), correct: L(`Take out the common factor: x(x + ${C(k)}) = 0`, `Haal die gemene faktor uit: x(x + ${C(k)}) = 0`), wrongs: [L("Divide both sides by x first", "Deel eers albei kante deur x"), L("Difference of squares", "Verskil van twee vierkante"), L("It cannot be factorised — use the formula", "Dit kan nie gefaktoriseer word nie: gebruik die formule")], ans: L(`Common factor: x(x + ${C(k)}) = 0, so x = 0 or x = −${C(k)}. Two answers — don't lose one!`, `Gemene faktor: x(x + ${C(k)}) = 0, so x = 0 of x = −${C(k)}. Twee antwoorde: moenie een verloor nie!`),
        sol: [{ s: L("There is no constant, so every term already carries an x — that is a common factor", "Daar is geen konstante nie, so elke term dra reeds 'n x: dit is 'n gemene faktor") },
              { s: L(`x(x + ${C(k)}) = 0`, `x(x + ${C(k)}) = 0`) },
              { s: L(`Zero-product: x = 0 or x + ${C(k)} = 0  →  x = 0 or x = −${C(k)}`, `Nulproduk: x = 0 of x + ${C(k)} = 0  →  x = 0 of x = −${C(k)}`), r: L("the lonely x is a factor, so x = 0 is a real answer", "die eensame x is 'n faktor, so x = 0 is 'n regte antwoord") }] },
      { q: L(`Solve <b>x² = ${C(k)}x</b>.`, `Los <b>x² = ${C(k)}x</b> op.`), correct: L(`x = 0 or x = ${C(k)}`, `x = 0 of x = ${C(k)}`), wrongs: [L(`x = ${C(k)} only`, `net x = ${C(k)}`), L(`x = 0 only`, `net x = 0`), L(`x = ±${C(k)}`, `x = ±${C(k)}`)], ans: L(`Everything to one side: x² − ${C(k)}x = 0 → x(x − ${C(k)}) = 0 → x = 0 or x = ${C(k)}.`, `Alles na een kant: x² − ${C(k)}x = 0 → x(x − ${C(k)}) = 0 → x = 0 of x = ${C(k)}.`),
        sol: [{ s: L(`Standard form first: x² − ${C(k)}x = 0`, `Eers standaardvorm: x² − ${C(k)}x = 0`), r: L("everything to one side, 0 on the other", "alles na een kant, 0 aan die ander") },
              { s: L(`No constant term, so take out the common x: x(x − ${C(k)}) = 0`, `Geen konstante term nie, so haal die gemene x uit: x(x − ${C(k)}) = 0`) },
              { s: L(`x = 0 or x = ${C(k)}`, `x = 0 of x = ${C(k)}`), r: L("two answers — dividing by x would have lost the first one", "twee antwoorde: om deur x te deel, sou die eerste een verloor het") }] },
    ];
    const it = pick(items);
    return mc(SPEC, it.q, it.correct, it.wrongs,
      { hint: L("No c term → common factor. The factor x gives the answer x = 0.", "Geen c-term → gemene faktor. Die faktor x gee die antwoord x = 0."), answerLabel: it.ans, solution: it.sol });
  },

  /* why dividing by x is illegal */
  dontDivideByX: () => {
    const k = randInt(2, 9);
    const items = [
      ynQ(SPEC,
        L(`To solve <b>x² = ${C(k)}x</b>, may you divide both sides by x to get x = ${C(k)}?`, `Mag jy, om <b>x² = ${C(k)}x</b> op te los, albei kante deur x deel om x = ${C(k)} te kry?`),
        false,
        { hint: L("What if x itself is 0?", "Wat as x self 0 is?"),
          answerLabel: L(`No — dividing by x throws the x = 0 answer away (and you can't divide by 0). Factorise instead: x(x − ${C(k)}) = 0 → x = 0 or x = ${C(k)}.`, `Nee: om deur x te deel, gooi die antwoord x = 0 weg (en jy kan nie deur 0 deel nie). Faktoriseer eerder: x(x − ${C(k)}) = 0 → x = 0 of x = ${C(k)}.`),
          solution: [
            { s: L("Dividing by x is only allowed if x cannot be 0 — and here it can be", "Om deur x te deel, mag net as x nie 0 kan wees nie, en hier kan dit") },
            { s: L(`Check: x = 0 gives 0 = 0, so x = 0 IS a solution, and dividing deletes it`, `Toets: x = 0 gee 0 = 0, so x = 0 IS 'n oplossing, en deling vee dit uit`) },
            { s: L(`Factorise instead: x² − ${C(k)}x = 0  →  x(x − ${C(k)}) = 0  →  x = 0 or x = ${C(k)}`, `Faktoriseer eerder: x² − ${C(k)}x = 0  →  x(x − ${C(k)}) = 0  →  x = 0 of x = ${C(k)}`), r: L("factorising keeps both", "faktorisering hou albei") },
          ] }),
      { q: L(`A learner divides <b>x² = ${C(k)}x</b> by x and gets x = ${C(k)}. What went missing?`, `'n Leerder deel <b>x² = ${C(k)}x</b> deur x en kry x = ${C(k)}. Wat het weggeraak?`), correct: L("The solution x = 0", "Die oplossing x = 0"), wrongs: [L("Nothing — it's correct", "Niks: dit is reg"), L(`The solution x = −${C(k)}`, `Die oplossing x = −${C(k)}`), L("The ± sign", "Die ±-teken")], ans: L(`x = 0 also satisfies x² = ${C(k)}x (both sides 0). Dividing by x silently deleted it. Common factor keeps both.`, `x = 0 voldoen ook aan x² = ${C(k)}x (albei kante 0). Deling deur x het dit stilletjies uitgevee. Die gemene faktor hou albei.`),
        sol: [{ s: L(`Put x = 0 into the original: left side 0, right side 0`, `Sit x = 0 in die oorspronklike: linkerkant 0, regterkant 0`), r: L("so x = 0 is a genuine solution", "so x = 0 is 'n egte oplossing") },
              { s: L("Dividing both sides by x quietly assumed x was not 0, which deleted that answer", "Deling van albei kante deur x het stilweg aangeneem dat x nie 0 is nie, en dit het daardie antwoord uitgevee") },
              { s: L(`The common-factor route keeps it: x(x − ${C(k)}) = 0  →  x = 0 or x = ${C(k)}`, `Die gemene-faktor-roete hou dit: x(x − ${C(k)}) = 0  →  x = 0 of x = ${C(k)}`) }] },
    ];
    const it = pick(items);
    return it.type ? it : mc(SPEC, it.q, it.correct, it.wrongs,
      { hint: L("Dividing by the variable deletes a solution.", "Deling deur die veranderlike vee 'n oplossing uit."), answerLabel: it.ans, solution: it.sol });
  },

  /* exponential factor: make the bases the same
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE). The three
     hand-written items were 3ˣ = √27 · 3ˣ = 1 · 2ˣ = 16 — three fixed
     shapes with an obvious pattern. Same wording, same three shapes, the
     base (and the power) rolled. Guards: √(b³) is honest for every base
     used, so the ³⁄₂ answer is always right; and the "divide once" decoy
     value b^(k−1) is forced to differ from the real answer k, which would
     otherwise collide at 2ˣ = 4 (4 ÷ 2 = 2 = x). */
  expSameBase: () => {
    const shape = randInt(1, 3);
    if (shape === 1) {
      const base = pick([2, 3, 5]), cube = base ** 3;
      return mc(EXPB,
        L(`One bracket gives <b>${pw(String(base), "x")} = √${C(cube)}</b>. What is the correct first move?`, `Een hakie gee <b>${pw(String(base), "x")} = √${C(cube)}</b>. Wat is die korrekte eerste stap?`),
        L(`Write √${C(cube)} as a power of ${C(base)}: ${pw(String(base), "x")} = ${pw(String(base), "3/2")}`, `Skryf √${C(cube)} as 'n mag van ${C(base)}: ${pw(String(base), "x")} = ${pw(String(base), "3/2")}`),
        [L("Square both sides", "Kwadreer albei kante"), L("Take logs", "Neem logaritmes"), L(`Divide both sides by ${C(base)}`, `Deel albei kante deur ${C(base)}`)],
        { hint: L("Make the bases the SAME (prime factors / powers), then equate the exponents.", "Maak die grondtalle DIESELFDE (priemfaktore / magte), stel dan die eksponente gelyk."),
          answerLabel: L(`√${C(cube)} = √(${C(base)}³) = ${pw(String(base), "3/2")}. Same base on both sides → equate the exponents: x = ${frac(3, 2)}.`, `√${C(cube)} = √(${C(base)}³) = ${pw(String(base), "3/2")}. Dieselfde grondtal aan albei kante → stel die eksponente gelyk: x = ${frac(3, 2)}.`),
          solution: [
            { s: L(`Prime-factorise the right side: ${C(cube)} = ${C(base)}³, so √${C(cube)} = √(${C(base)}³)`, `Skryf die regterkant in priemfaktore: ${C(cube)} = ${C(base)}³, so √${C(cube)} = √(${C(base)}³)`) },
            { s: L(`Inside the root goes on top, the root index underneath: √(${C(base)}³) = ${pw(String(base), "3/2")}`, `Wat binne die wortel staan, gaan bo; die wortelindeks gaan onder: √(${C(base)}³) = ${pw(String(base), "3/2")}`) },
            { s: L(`Now both sides are powers of ${C(base)}, so the bases fall away and the exponents are equal: x = ${frac(3, 2)}`, `Nou is albei kante magte van ${C(base)}, so die grondtalle val weg en die eksponente is gelyk: x = ${frac(3, 2)}`) },
          ] });
    }
    if (shape === 2) {
      const base = pick([2, 3, 5, 7]);
      return mc(EXPB,
        L(`One bracket gives <b>${pw(String(base), "x")} = 1</b>. What is x?`, `Een hakie gee <b>${pw(String(base), "x")} = 1</b>. Wat is x?`),
        L(`x = 0, because ${C(base)}⁰ = 1`, `x = 0, want ${C(base)}⁰ = 1`),
        [L("x = 1", "x = 1"), L("No solution", "Geen oplossing"), L(`x = ${frac(1, base)}`, `x = ${frac(1, base)}`)],
        { hint: L("Make the bases the SAME (prime factors / powers), then equate the exponents.", "Maak die grondtalle DIESELFDE (priemfaktore / magte), stel dan die eksponente gelyk."),
          answerLabel: L(`Write 1 as a power of ${C(base)}: 1 = ${C(base)}⁰. Same base → x = 0.`, `Skryf 1 as 'n mag van ${C(base)}: 1 = ${C(base)}⁰. Dieselfde grondtal → x = 0.`),
          solution: [
            { s: L(`The right side has to become a power of ${C(base)} before anything can happen`, `Die regterkant moet 'n mag van ${C(base)} word voordat enigiets kan gebeur`) },
            { s: L(`Anything to the zero is 1, so 1 = ${C(base)}⁰`, `Enigiets tot die mag nul is 1, so 1 = ${C(base)}⁰`) },
            { s: L(`${pw(String(base), "x")} = ${C(base)}⁰, same base, so x = 0`, `${pw(String(base), "x")} = ${C(base)}⁰, dieselfde grondtal, so x = 0`), r: L(`x = 1 would give ${C(base)}, not 1`, `x = 1 sou ${C(base)} gee, nie 1 nie`) },
          ] });
    }
    const base = pick([2, 3, 5]);
    let k = randInt(2, 4);
    while (base ** (k - 1) === k) k = randInt(2, 4);   // the "÷ once" decoy must not BE the answer
    const v = base ** k, half = v / base;
    return mc(EXPB,
      L(`One bracket gives <b>${pw(String(base), "x")} = ${C(v)}</b>. What is the correct move?`, `Een hakie gee <b>${pw(String(base), "x")} = ${C(v)}</b>. Wat is die korrekte stap?`),
      L(`Write ${C(v)} as ${pw(String(base), String(k))}, then equate exponents: x = ${C(k)}`, `Skryf ${C(v)} as ${pw(String(base), String(k))}, stel dan die eksponente gelyk: x = ${C(k)}`),
      /* the count is a WORD, as she wrote it ("…by 2 four times…") — two
         numerals in a row read as one number ("by 3 3 times") on the phone */
      [L(`Divide both sides by ${C(base)} ${TIMES[k]} and count`, `Deel albei kante deur ${C(base)}, ${TIMES[k]}, en tel`), L("Square-root both sides", "Neem √ van albei kante"), L(`x = ${C(half)}, because ${C(v)} ÷ ${C(base)} = ${C(half)}`, `x = ${C(half)}, want ${C(v)} ÷ ${C(base)} = ${C(half)}`)],
      { hint: L("Make the bases the SAME (prime factors / powers), then equate the exponents.", "Maak die grondtalle DIESELFDE (priemfaktore / magte), stel dan die eksponente gelyk."),
        answerLabel: L(`${C(v)} = ${C(base)}${supDigits(k)}, so ${pw(String(base), "x")} = ${pw(String(base), String(k))} → x = ${C(k)}. Same base, then the bases fall away.`, `${C(v)} = ${C(base)}${supDigits(k)}, so ${pw(String(base), "x")} = ${pw(String(base), String(k))} → x = ${C(k)}. Dieselfde grondtal, dan val die grondtalle weg.`),
        solution: [
          { s: L(`Write the right side as a power of the SAME base: ${C(v)} = ${C(base)}${supDigits(k)}`, `Skryf die regterkant as 'n mag van DIESELFDE grondtal: ${C(v)} = ${C(base)}${supDigits(k)}`), r: L("prime factors", "priemfaktore") },
          { s: L(`${pw(String(base), "x")} = ${pw(String(base), String(k))} — the guns are equal, so they shoot each other`, `${pw(String(base), "x")} = ${pw(String(base), String(k))}: die gewere is gelyk, dus skiet hulle mekaar`) },
          { s: L(`The helmets fall to the ground: x = ${C(k)}`, `Die helms val op die grond: x = ${C(k)}`), r: L(`never ${C(v)} ÷ ${C(base)} — that is not what a power means`, `nooit ${C(v)} ÷ ${C(base)} nie: dit is nie wat 'n mag beteken nie`) },
        ] });
  },

  /* a positive base can never give a negative */
  expNoSol: () => {
    const base = pick([2, 3, 5]), k = pick([4, 8, 9, 25]);
    const items = [
      { q: L(`One bracket gives <b>${pw(String(base), "x")} = −${C(k)}</b>. What can you conclude?`, `Een hakie gee <b>${pw(String(base), "x")} = −${C(k)}</b>. Wat kan jy aflei?`), correct: L("No solution — a power with a positive base is never negative", "Geen oplossing nie: 'n mag met 'n positiewe grondtal is nooit negatief nie"), wrongs: [L(`x = −${C(Math.round(Math.log(k) / Math.log(base)))}`, `x = −${C(Math.round(Math.log(k) / Math.log(base)))}`), L("x = 0", "x = 0"), L(`x = ±${C(k)}`, `x = ±${C(k)}`)], ans: L(`${base} to ANY power stays positive (it never even reaches 0), so ${pw(String(base), "x")} = −${C(k)} is impossible. Write: no solution.`, `${base} tot ENIGE mag bly positief (dit bereik nie eens 0 nie), so ${pw(String(base), "x")} = −${C(k)} is onmoontlik. Skryf: geen oplossing.`),
        sol: [{ s: L(`Look at the left side alone: ${base} is a positive base`, `Kyk net na die linkerkant: ${base} is 'n positiewe grondtal`) },
              { s: L(`A big x makes it huge, a negative x makes it a small fraction — but it never reaches 0, let alone goes below it`, `'n Groot x maak dit reusagtig, 'n negatiewe x maak dit 'n klein breuk, maar dit bereik nooit 0 nie, wat nog te sê daaronder`) },
              { s: L(`${pw(String(base), "x")} ≠ −${C(k)} ∴ no solution`, `${pw(String(base), "x")} ≠ −${C(k)} ∴ geen oplossing`), r: L("this bracket simply contributes no answer", "hierdie hakie gee eenvoudig geen antwoord nie") }] },
      ynQ(EXPB,
        L(`<b>${pw(String(base), "x")} = −${C(k)}</b>. Does this bracket give a solution?`, `<b>${pw(String(base), "x")} = −${C(k)}</b>. Gee hierdie hakie 'n oplossing?`),
        false,
        { hint: L(`Can ${base}^x ever be negative?`, `Kan ${base}^x ooit negatief wees?`),
          answerLabel: L(`No — a positive base to any real power is always positive. This bracket contributes NO solution (the workbook writes it with ≠ and "no solution").`, `Nee: 'n positiewe grondtal tot enige reële mag is altyd positief. Hierdie hakie gee GEEN oplossing nie (die werkboek skryf dit met ≠ en "geen oplossing").`),
          solution: [
            { s: L(`${base} is a positive base, and a positive base raised to any real power stays positive`, `${base} is 'n positiewe grondtal, en 'n positiewe grondtal tot enige reële mag bly positief`) },
            { s: L(`So no x makes ${pw(String(base), "x")} equal −${C(k)}`, `Geen x maak ${pw(String(base), "x")} dus gelyk aan −${C(k)} nie`) },
            { s: L(`Write it the way she does: ${pw(String(base), "x")} ≠ −${C(k)} ∴ no solution`, `Skryf dit soos sy dit doen: ${pw(String(base), "x")} ≠ −${C(k)} ∴ geen oplossing`), r: L("the other bracket still gives its own answer", "die ander hakie gee steeds sy eie antwoord") },
          ] }),
    ];
    const it = pick(items);
    return it.type ? it : mc(EXPB, it.q, it.correct, it.wrongs,
      { hint: L("Positive base → the power is always positive.", "Positiewe grondtal → die mag is altyd positief."), answerLabel: it.ans, solution: it.sol });
  },

  /* where the ± in x^(2/3) = 16 comes from
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "core
     explanation tied to one fixed worked example — parametrisable with
     real effort"). The exponent STAYS ²⁄₃ for the first two items — the
     whole teaching point is reading x^(2/3) as (∛x)², and swapping the
     denominator would need a root glyph the chapter doesn't have — but
     the worked number rolls: with a ∈ {2,3,4,5}, the right-hand side is
     a² and the answer is ±a³, which is exact for every a (the original
     was a = 4: 16 and ±64). The third item's odd numerator rolls freely,
     since its whole point is that an odd top never gets a ±. */
  ratExpPM: () => {
    const shape = randInt(1, 3);
    if (shape === 3) {
      const [p, q] = pick([[3, 5], [5, 7], [3, 7], [5, 3], [1, 3]]);
      const k = pick([4, 8, 9, 27, 32]);
      return ynQ(EXPB,
        L(`<b>${pw("x", `${p}/${q}`)} = ${C(k)}</b>. The top of the exponent (${C(p)}) is ODD. Does this equation get a ± answer?`, `<b>${pw("x", `${p}/${q}`)} = ${C(k)}</b>. Die teller van die eksponent (${C(p)}) is ONEWE. Kry hierdie vergelyking 'n ±-antwoord?`),
        false,
        { hint: L("The ± appears only when an EVEN power hides the sign.", "Die ± verskyn net as 'n EWE mag die teken wegsteek."),
          answerLabel: L("No — an odd power keeps the sign, so there is exactly ONE answer. The ± only appears when the numerator is even (like 2/3).", "Nee: 'n onewe mag hou die teken, so daar is presies EEN antwoord. Die ± verskyn net as die teller ewe is (soos 2/3)."),
          solution: [
            { s: L(`The ± comes from undoing an EVEN power, because an even power hides the sign`, `Die ± kom wanneer jy 'n EWE mag ongedaan maak, want 'n ewe mag steek die teken weg`) },
            { s: L(`Here the top of the exponent is ${C(p)}, which is odd — an odd power keeps the sign it was given`, `Hier is die teller van die eksponent ${C(p)}, wat onewe is: 'n onewe mag hou die teken wat dit gekry het`) },
            { s: L("So nothing was hidden and nothing has to be put back: exactly one answer, no ±", "Niks is dus weggesteek nie en niks hoef teruggesit te word nie: presies een antwoord, geen ±") },
          ] });
    }
    const a = pick([2, 3, 4, 5]), rhs = a * a, ans = a * a * a;
    if (shape === 1) {
      return mc(EXPB,
        L(`<b>${pw("x", "2/3")} = ${C(rhs)}</b> has the answers x = ±${C(ans)}. WHERE does the ± come from?`, `<b>${pw("x", "2/3")} = ${C(rhs)}</b> het die antwoorde x = ±${C(ans)}. WAAR kom die ± vandaan?`),
        L(`The exponent ⅔ contains an EVEN power: (∛x)² = ${C(rhs)}, so ∛x = ±${C(a)}, so x = ±${C(ans)}`, `Die eksponent ⅔ bevat 'n EWE mag: (∛x)² = ${C(rhs)}, so ∛x = ±${C(a)}, so x = ±${C(ans)}`),
        [L("Every rational-exponent equation gets a ±", "Elke vergelyking met 'n rasionale eksponent kry 'n ±"), L(`From square-rooting the ${C(rhs)} at the start`, `Van die vierkantswortel van die ${C(rhs)} aan die begin`), L(`It doesn't — only +${C(ans)} is correct`, `Dit doen nie: net +${C(ans)} is korrek`)],
        { hint: L("x^(2/3) = (∛x)². Undoing an even power → ±.", "x^(2/3) = (∛x)². Maak 'n ewe mag ongedaan → ±."),
          answerLabel: L(`Read x^(2/3) as (∛x)². Undoing the SQUARE gives ∛x = ±${C(a)}, and cubing keeps both signs: x = ±${C(ans)}. The even power on top hides the sign.`, `Lees x^(2/3) as (∛x)². Om die KWADRAAT ongedaan te maak, gee ∛x = ±${C(a)}, en kubering hou albei tekens: x = ±${C(ans)}. Die ewe mag bo steek die teken weg.`),
          solution: [
            { s: L("Read the exponent properly: top = the power inside, bottom = the root, so x^(2/3) = (∛x)²", "Lees die eksponent reg: bo = die mag binne, onder = die wortel, so x^(2/3) = (∛x)²") },
            { s: L(`Undo the SQUARE first — and an even power hides the sign, so both come back: ∛x = ±${C(a)}`, `Maak eers die KWADRAAT ongedaan, en 'n ewe mag steek die teken weg, so albei kom terug: ∛x = ±${C(a)}`) },
            { s: L(`Now cube both sides: x = ±${C(ans)}`, `Kubeer nou albei kante: x = ±${C(ans)}`), r: L("cubing keeps whatever sign it is given, so the ± survives to the end", "kubering hou watter teken dit ook al kry, so die ± oorleef tot die einde") },
          ] });
    }
    return mc(EXPB,
      L(`To undo the exponent in <b>${pw("x", "2/3")} = ${C(rhs)}</b>, you raise both sides to which power?`, `Om die eksponent in <b>${pw("x", "2/3")} = ${C(rhs)}</b> ongedaan te maak, verhef jy albei kante tot watter mag?`),
      L(`The reciprocal, ${frac(3, 2)}`, `Die resiprook, ${frac(3, 2)}`),
      [L(`${frac(2, 3)} again`, `Weer ${frac(2, 3)}`), "3", "2"],
      { hint: L("x^(2/3) = (∛x)². Undoing an even power → ±.", "x^(2/3) = (∛x)². Maak 'n ewe mag ongedaan → ±."),
        answerLabel: L(`Raise to the reciprocal ${frac(3, 2)}: (x^(2/3))^(3/2) = x. But remember the even power on top means the final answer is ±${C(ans)}, not just +${C(ans)}.`, `Verhef tot die resiprook ${frac(3, 2)}: (x^(2/3))^(3/2) = x. Maar onthou, die ewe mag bo beteken die finale antwoord is ±${C(ans)}, nie net +${C(ans)} nie.`),
        solution: [
          { s: L(`x is stuck under the exponent ${frac(2, 3)}, so you need the power that cancels it`, `x sit vas onder die eksponent ${frac(2, 3)}, so jy het die mag nodig wat dit kanselleer`) },
          { s: L(`Switch numerator and denominator: the reciprocal is ${frac(3, 2)}, and (${frac(2, 3)})·(${frac(3, 2)}) = 1`, `Ruil teller en noemer om: die resiprook is ${frac(3, 2)}, en (${frac(2, 3)})·(${frac(3, 2)}) = 1`) },
          { s: L(`So x is left alone — but the even top means the answer is ±${C(ans)}, not just ${C(ans)}`, `So bly x alleen oor, maar die ewe teller beteken die antwoord is ±${C(ans)}, nie net ${C(ans)} nie`), r: L("the ± rides all the way to the final line", "die ± ry saam tot op die laaste lyn") },
        ] });
  },

  /* count the real solutions of a factor-form equation */
  countSolutions: () => {
    const items = [
      { q: L(`How many REAL solutions does <b>(x² − 5)(${pw("2", "x")} − 16) = 0</b> have?`, `Hoeveel REËLE oplossings het <b>(x² − 5)(${pw("2", "x")} − 16) = 0</b>?`), correct: L("3: x = ±√5 and x = 4", "3: x = ±√5 en x = 4"), wrongs: [L("2: x = √5 and x = 4", "2: x = √5 en x = 4"), L("4: x = ±√5 and x = ±4", "4: x = ±√5 en x = ±4"), L("1: x = 4 only", "1: net x = 4")], ans: L("x² = 5 gives TWO answers (x = ±√5); 2ˣ = 16 = 2⁴ gives x = 4. Three in total.", "x² = 5 gee TWEE antwoorde (x = ±√5); 2ˣ = 16 = 2⁴ gee x = 4. Drie altesaam.") },
      { q: L(`How many REAL solutions does <b>(${pw("3", "x")} − 1)(${pw("2", "x")} + 4) = 0</b> have?`, `Hoeveel REËLE oplossings het <b>(${pw("3", "x")} − 1)(${pw("2", "x")} + 4) = 0</b>?`), correct: L("1: x = 0 only", "1: net x = 0"), wrongs: [L("2: x = 0 and x = −2", "2: x = 0 en x = −2"), L("0: neither bracket can be 0", "0: geen hakie kan 0 wees nie"), L("2: x = ±1", "2: x = ±1")], ans: L("3ˣ = 1 = 3⁰ gives x = 0. But 2ˣ = −4 is impossible (positive base) → no solution from that bracket. One answer.", "3ˣ = 1 = 3⁰ gee x = 0. Maar 2ˣ = −4 is onmoontlik (positiewe grondtal) → geen oplossing uit daardie hakie nie. Een antwoord.") },
      { q: L(`How many REAL solutions does <b>(x² + 9)(x − 2) = 0</b> have?`, `Hoeveel REËLE oplossings het <b>(x² + 9)(x − 2) = 0</b>?`), correct: L("1: x = 2 only", "1: net x = 2"), wrongs: [L("3: x = ±3 and x = 2", "3: x = ±3 en x = 2"), L("2: x = −9 and x = 2", "2: x = −9 en x = 2"), L("0: no solutions", "0: geen oplossings nie")], ans: L("x² = −9 has NO real solution (a square can't be negative); x = 2 works. One answer.", "x² = −9 het GEEN reële oplossing nie ('n kwadraat kan nie negatief wees nie); x = 2 werk. Een antwoord.") },
    ];
    const it = pick(items);
    return mc(EXPB, it.q, it.correct, it.wrongs,
      { hint: L("Set each bracket = 0 on its own — then check which brackets actually CAN be 0.", "Stel elke hakie op sy eie = 0, kyk dan watter hakies regtig 0 KAN wees."), answerLabel: it.ans });
  },
};

export const questEq2 = {
  id: "eq2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id,
    concept: ["expSameBase", "expNoSol", "ratExpPM", "countSolutions"].includes(id) ? EXPB : SPEC,
    gen,
  })),
};
