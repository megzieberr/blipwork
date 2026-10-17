/* ============================================================
   EXPONENTS & SURDS · Q1 — The exponent laws
   ------------------------------------------------------------
   Name the law, say what happens to the exponents, and the
   zero / negative / fractional / power-of-bracket rules.
   THEORY only — recognising rules, not computing values.
   ============================================================ */
import { mc, ynQ, pick, shuffled } from "./_exp.js";
import { L } from "../lang.js";

const CON = "expLaws";

const SKILLS = {
  /* multiply / divide / power-of-power → what do you DO to the exponents? */
  whatToDo: () => {
    const items = [
      { op: L("<b>multiply</b> powers with the same base (xᵃ · xᵇ)", "magte met dieselfde grondtal <b>vermenigvuldig</b> (xᵃ · xᵇ)"), correct: L("Add the exponents", "Tel die eksponente op"), wrongs: [L("Subtract the exponents", "Trek die eksponente af"), L("Multiply the exponents", "Vermenigvuldig die eksponente"), L("Multiply the bases", "Vermenigvuldig die grondtalle")], ans: L("Multiplying with the same base → ADD the exponents: xᵃ·xᵇ = xᵃ⁺ᵇ.", "Vermenigvuldiging met dieselfde grondtal → TEL die eksponente op: xᵃ·xᵇ = xᵃ⁺ᵇ."),
        sol: [{ s: L("Write a small case out in full: x³ · x² = (x·x·x)(x·x)", "Skryf 'n klein voorbeeld volledig uit: x³ · x² = (x·x·x)(x·x)") },
              { s: L("That is five x's multiplied together, so it is x⁵ — and 3 + 2 = 5", "Dit is vyf keer x met mekaar vermenigvuldig, dus x⁵, en 3 + 2 = 5"), r: L("you are just counting x's", "jy tel net hoeveel keer x voorkom") },
              { s: L("∴ xᵃ · xᵇ = xᵃ⁺ᵇ", "∴ xᵃ · xᵇ = xᵃ⁺ᵇ"), r: L("her name for it: the product rule", "haar naam daarvoor: die produkreël") }] },
      { op: L("<b>divide</b> powers with the same base (xᵃ ÷ xᵇ)", "magte met dieselfde grondtal <b>deel</b> (xᵃ ÷ xᵇ)"), correct: L("Subtract the exponents", "Trek die eksponente af"), wrongs: [L("Add the exponents", "Tel die eksponente op"), L("Divide the exponents", "Deel die eksponente"), L("Divide the bases", "Deel die grondtalle")], ans: L("Dividing with the same base → SUBTRACT the exponents: xᵃ÷xᵇ = xᵃ⁻ᵇ.", "Deling met dieselfde grondtal → TREK die eksponente af: xᵃ÷xᵇ = xᵃ⁻ᵇ."),
        sol: [{ s: L("Write a small case out in full: x⁵ ÷ x² = (x·x·x·x·x)/(x·x)", "Skryf 'n klein voorbeeld volledig uit: x⁵ ÷ x² = (x·x·x·x·x)/(x·x)") },
              { s: L("Two x's cancel top and bottom, leaving x³ — and 5 − 2 = 3", "Twee x-faktore kanselleer bo en onder, x³ bly oor, en 5 − 2 = 3"), r: L("dividing takes x's away", "deel haal x-faktore weg") },
              { s: L("∴ xᵃ ÷ xᵇ = xᵃ⁻ᵇ", "∴ xᵃ ÷ xᵇ = xᵃ⁻ᵇ"), r: L("the quotient rule", "die kwosiëntreël") }] },
      { op: L("take a <b>power of a power</b>, (xᵃ)ᵇ", "'n <b>mag van 'n mag</b> neem, (xᵃ)ᵇ"), correct: L("Multiply the exponents", "Vermenigvuldig die eksponente"), wrongs: [L("Add the exponents", "Tel die eksponente op"), L("Subtract the exponents", "Trek die eksponente af"), L("Add the bases", "Tel die grondtalle op")], ans: L("Power of a power → MULTIPLY the exponents: (xᵃ)ᵇ = xᵃᵇ.", "Mag van 'n mag → VERMENIGVULDIG die eksponente: (xᵃ)ᵇ = xᵃᵇ."),
        sol: [{ s: L("The outside power says how many copies: (x³)² = x³ · x³", "Die buitenste mag sê hoeveel kopieë: (x³)² = x³ · x³") },
              { s: L("Now the product rule adds them: 3 + 3 = 6, which is 3 × 2", "Nou tel die produkreël hulle op: 3 + 3 = 6, en dit is 3 × 2"), r: L("b lots of a", "b keer a") },
              { s: L("∴ (xᵃ)ᵇ = xᵃᵇ", "∴ (xᵃ)ᵇ = xᵃᵇ"), r: L("power of a power", "mag van 'n mag") }] },
    ];
    const it = pick(items);
    return mc(CON, L(`When you ${it.op}, what do you do?`, `Wanneer jy ${it.op}, wat doen jy?`), it.correct, it.wrongs,
      { hint: L("Multiply → add · divide → subtract · power of a power → multiply.", "Vermenigvuldig → tel op · deel → trek af · mag van 'n mag → vermenigvuldig."), answerLabel: it.ans, solution: it.sol });
  },

  /* name the law from its statement */
  nameLaw: () => {
    const items = [
      { law: L("xᵃ · xᵇ = xᵃ⁺ᵇ", "xᵃ · xᵇ = xᵃ⁺ᵇ"), correct: L("Product rule", "Produkreël"), wrongs: [L("Quotient rule", "Kwosiëntreël"), L("Power of a power", "Mag van 'n mag"), L("Zero exponent", "Nul-eksponent")] },
      { law: L("xᵃ ÷ xᵇ = xᵃ⁻ᵇ", "xᵃ ÷ xᵇ = xᵃ⁻ᵇ"), correct: L("Quotient rule", "Kwosiëntreël"), wrongs: [L("Product rule", "Produkreël"), L("Power of a power", "Mag van 'n mag"), L("Power of a product", "Mag van 'n produk")] },
      { law: L("(xᵃ)ᵇ = xᵃᵇ", "(xᵃ)ᵇ = xᵃᵇ"), correct: L("Power of a power", "Mag van 'n mag"), wrongs: [L("Product rule", "Produkreël"), L("Quotient rule", "Kwosiëntreël"), L("Zero exponent", "Nul-eksponent")] },
      { law: L("(xy)ᵃ = xᵃyᵃ", "(xy)ᵃ = xᵃyᵃ"), correct: L("Power of a product", "Mag van 'n produk"), wrongs: [L("Power of a power", "Mag van 'n mag"), L("Product rule", "Produkreël"), L("Power of a quotient", "Mag van 'n kwosiënt")] },
    ];
    const it = pick(items);
    return mc(CON, L(`Which law is this?<br><b>${it.law}</b>`, `Watter wet is dit?<br><b>${it.law}</b>`), it.correct, it.wrongs,
      { hint: L("Look at the operation between the bases (× or ÷) versus a bracket raised to a power.", "Kyk na die bewerking tussen die grondtalle (× of ÷) teenoor 'n hakie wat tot 'n mag verhef is."),
        answerLabel: L(`${it.law} is the <b>${it.correct.toLowerCase()}</b>.`, `${it.law} is die <b>${it.correct.toLowerCase()}</b>.`) });
  },

  /* zero exponent */
  zero: () => {
    const items = [
      { q: L("What is <b>x⁰</b> &nbsp;(x ≠ 0)?", "Wat is <b>x⁰</b> &nbsp;(x ≠ 0)?"), correct: "1", wrongs: ["0", L("x", "x"), L("undefined", "onbepaald")], ans: L("Anything non-zero to the zero power is 1.", "Enigiets behalwe nul, tot die mag nul, is 1."),
        sol: [{ s: L("xᵃ ÷ xᵃ = 1", "xᵃ ÷ xᵃ = 1"), r: L("anything divided by itself", "enigiets gedeel deur homself") },
              { s: L("But the quotient rule says the same thing is xᵃ⁻ᵃ = x⁰", "Maar die kwosiëntreël sê dieselfde ding is xᵃ⁻ᵃ = x⁰") },
              { s: L("Two names for one answer, so x⁰ = 1", "Twee name vir een antwoord, dus x⁰ = 1"), r: L("her words: anything to the zero is always one", "haar woorde: enigiets tot die mag nul is altyd een") }] },
      { q: L("Simplify <b>7x⁰</b> &nbsp;(x ≠ 0).", "Vereenvoudig <b>7x⁰</b> &nbsp;(x ≠ 0)."), correct: "7", wrongs: ["0", L("7x", "7x"), "1"], ans: L("Only x is raised to the 0, so x⁰ = 1 and 7·1 = 7.", "Net x is tot die mag 0 verhef, dus x⁰ = 1 en 7·1 = 7."),
        sol: [{ s: L("Check what the 0 is actually sitting on: there is no bracket, so it sits on the x alone", "Kyk waarop die 0 regtig sit: daar is geen hakie nie, dus sit dit net op die x") },
              { s: L("x⁰ = 1, so 7x⁰ = 7(1)", "x⁰ = 1, dus 7x⁰ = 7(1)") },
              { s: "= 7", r: L("the 7 was never touched", "die 7 is nooit aangeraak nie") }] },
      { q: L("What is <b>(5ab)⁰</b> &nbsp;(a, b ≠ 0)?", "Wat is <b>(5ab)⁰</b> &nbsp;(a, b ≠ 0)?"), correct: "1", wrongs: ["0", L("5ab", "5ab"), "5"], ans: L("The WHOLE bracket is to the power 0, so the answer is 1.", "Die HELE hakie is tot die mag 0, dus is die antwoord 1."),
        sol: [{ s: L("This time there IS a bracket, so the 0 sits on everything inside it", "Hierdie keer IS daar 'n hakie, dus sit die 0 op alles daarbinne") },
              { s: L("5ab is one lump, and any non-zero lump to the power 0 is 1", "5ab is een klont, en enige klont behalwe nul, tot die mag 0, is 1") },
              { s: L("∴ (5ab)⁰ = 1", "∴ (5ab)⁰ = 1"), r: L("compare 7x⁰ = 7, where only the x carried the 0", "vergelyk 7x⁰ = 7, waar net die x die 0 gedra het") }] },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: L("Zero exponent → 1. Watch what the exponent is actually sitting on.", "Nul-eksponent → 1. Kyk mooi waarop die eksponent regtig sit."), answerLabel: it.ans, solution: it.sol });
  },

  /* negative exponent meaning */
  negative: () => {
    const items = [
      { q: L("What does a <b>negative exponent</b> mean: x⁻ᵃ = ?", "Wat beteken 'n <b>negatiewe eksponent</b>: x⁻ᵃ = ?"), correct: L("1/xᵃ", "1/xᵃ"), wrongs: [L("−xᵃ", "−xᵃ"), L("−1/xᵃ", "−1/xᵃ"), L("xᵃ", "xᵃ")], ans: L("A negative exponent means reciprocal: x⁻ᵃ = 1/xᵃ. It does NOT make the answer negative.", "'n Negatiewe eksponent beteken resiprook: x⁻ᵃ = 1/xᵃ. Dit maak NIE die antwoord negatief nie."),
        sol: [{ s: L("Depressed exponents: flip the fraction and change the sign of the exponent", "Neerslagtige eksponente: draai die breuk om en verander die teken van die eksponent") },
              { s: L("x⁻ᵃ is really x⁻ᵃ/1, so flipping sends it under the line: 1/xᵃ", "x⁻ᵃ is eintlik x⁻ᵃ/1, en as jy omdraai, gaan dit onder die streep: 1/xᵃ") },
              { s: L("The minus was used up in the flip", "Die minus is in die omdraai opgebruik"), r: L("x⁻ᵃ is 1/xᵃ, never −xᵃ", "x⁻ᵃ is 1/xᵃ, nooit −xᵃ nie") }] },
      { q: L("Rewrite with a positive exponent: <b>1/x⁻ᵃ</b>", "Herskryf met 'n positiewe eksponent: <b>1/x⁻ᵃ</b>"), correct: L("xᵃ", "xᵃ"), wrongs: [L("1/xᵃ", "1/xᵃ"), L("−xᵃ", "−xᵃ"), L("x⁻ᵃ", "x⁻ᵃ")], ans: L("Flip it across the line and change the sign: 1/x⁻ᵃ = xᵃ.", "Bring dit oor die streep en verander die teken: 1/x⁻ᵃ = xᵃ."),
        sol: [{ s: L("The power is already under the line, carrying a minus", "Die mag is reeds onder die streep, met 'n minus") },
              { s: L("Same move, other direction: flip it up over the line and change the sign", "Dieselfde stap, ander rigting: bring dit op oor die streep en verander die teken") },
              { s: L("∴ 1/x⁻ᵃ = xᵃ", "∴ 1/x⁻ᵃ = xᵃ"), r: L("depressed exponents work both ways", "neerslagtige eksponente werk albei kante toe") }] },
      { q: L("Is <b>3⁻²</b> positive or negative?", "Is <b>3⁻²</b> positief of negatief?"), correct: L("Positive (it equals 1/9)", "Positief (gelyk aan 1/9)"), wrongs: [L("Negative (it equals −9)", "Negatief (gelyk aan −9)"), L("Negative (it equals −1/9)", "Negatief (gelyk aan −1/9)"), L("Zero", "Nul")], ans: L("3⁻² = 1/3² = 1/9 — a negative exponent gives a positive value.", "3⁻² = 1/3² = 1/9: 'n negatiewe eksponent gee 'n positiewe waarde."),
        sol: [{ s: "3⁻² = 1/3²", r: L("flip the fraction, change the sign of the exponent", "draai die breuk om, verander die teken van die eksponent") },
              { s: "= 1/9" },
              { s: L("1/9 is a positive number", "1/9 is 'n positiewe getal"), r: L("a negative EXPONENT never makes the answer negative — that is the whole trap", "'n negatiewe EKSPONENT maak die antwoord nooit negatief nie: dit is die hele slaggat") }] },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: L("Negative exponent = “flip the fraction”, not “make it negative”.", "Negatiewe eksponent = “draai die breuk om”, nie “maak dit negatief” nie."), answerLabel: it.ans, solution: it.sol });
  },

  /* fractional exponent ↔ surd */
  fractional: () => {
    const items = [
      { q: L("What does <b>x<sup>½</sup></b> mean?", "Wat beteken <b>x<sup>½</sup></b>?"), correct: L("√x", "√x"), wrongs: [L("½x", "½x"), L("x ÷ 2", "x ÷ 2"), L("2x", "2x")], ans: L("A power of ½ is the square root: x^½ = √x.", "'n Mag van ½ is die vierkantswortel: x^½ = √x."),
        sol: [{ s: L("Her conversion box: ⁿ√(xᵃ) = x^(a/n)", "Haar omskakelblokkie: ⁿ√(xᵃ) = x^(a/n)"), r: L("inside √ = top of the fraction, outside √ = bottom", "binne √ = bo in die breuk, buite √ = onder") },
              { s: L("In x^½ the top is 1 and the bottom is 2, so the root index is 2", "In x^½ is bo 1 en onder 2, dus is die wortelindeks 2") },
              { s: L("√ IS ²√, so x^½ = √x", "√ IS ²√, dus x^½ = √x"), r: L("the exponent is a root, not “half of x”", "die eksponent is 'n wortel, nie “die helfte van x” nie") }] },
      { q: L("Write <b>ⁿ√(xᵃ)</b> with a fractional exponent.", "Skryf <b>ⁿ√(xᵃ)</b> met 'n breukeksponent."), correct: L("x^(a/n)", "x^(a/n)"), wrongs: [L("x^(n/a)", "x^(n/a)"), L("xᵃⁿ", "xᵃⁿ"), L("x^(a−n)", "x^(a−n)")], ans: L("The inside power a goes on TOP, the root index n on the BOTTOM: ⁿ√(xᵃ) = x^(a/n).", "Die binnemag a gaan BO, die wortelindeks n ONDER: ⁿ√(xᵃ) = x^(a/n)."),
        sol: [{ s: L("Her hook: inside √ = top of the fraction; outside √ = bottom of the fraction", "Haar geheuetruuk: binne √ = bo in die breuk; buite √ = onder in die breuk") },
              { s: L("The a is INSIDE the root, so it goes on top; the n is written OUTSIDE, so it goes underneath", "Die a is BINNE die wortel, dus gaan dit bo; die n staan BUITE, dus gaan dit onder") },
              { s: L("∴ ⁿ√(xᵃ) = x^(a/n)", "∴ ⁿ√(xᵃ) = x^(a/n)") }] },
      { q: L("In x^(a/n), which number is the <b>root</b> (the index of the surd)?", "In x^(a/n), watter getal is die <b>wortel</b> (die indeks van die wortelvorm)?"), correct: L("n (the denominator)", "n (die noemer)"), wrongs: [L("a (the numerator)", "a (die teller)"), L("a + n", "a + n"), L("a × n", "a × n")], ans: L("Denominator = the root; numerator = the inside power.", "Noemer = die wortel; teller = die binnemag."),
        sol: [{ s: L("Her hook: inside √ = top of the fraction; outside √ = bottom of the fraction", "Haar geheuetruuk: binne √ = bo in die breuk; buite √ = onder in die breuk") },
              { s: L("The root index is the little number written outside the root sign, so it lands on the bottom", "Die wortelindeks is die klein getalletjie buite die wortelteken, dus beland dit onder") },
              { s: L("∴ n is the root, and a on top is the power inside", "∴ n is die wortel, en a bo is die mag binne-in"), r: L("check it on x^½ = √x: the 2 underneath is the square root", "toets dit op x^½ = √x: die 2 onder is die vierkantswortel") }] },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: L("Bottom of the fraction = the root; top = the power inside.", "Onder in die breuk = die wortel; bo = die mag binne-in."), answerLabel: it.ans, solution: it.sol });
  },

  /* power of a quotient / flipped fraction */
  flip: () => {
    const items = [
      { q: L("Apply the exponent: <b>(x/y)ᵃ = ?</b>", "Pas die eksponent toe: <b>(x/y)ᵃ = ?</b>"), correct: L("xᵃ / yᵃ", "xᵃ / yᵃ"), wrongs: [L("xᵃ / y", "xᵃ / y"), L("x / yᵃ", "x / yᵃ"), L("(xy)ᵃ", "(xy)ᵃ")], ans: L("Each part of the fraction gets the exponent: (x/y)ᵃ = xᵃ/yᵃ.", "Elke deel van die breuk kry die eksponent: (x/y)ᵃ = xᵃ/yᵃ."),
        sol: [{ s: L("(x/y)ᵃ means the whole fraction multiplied by itself a times", "(x/y)ᵃ beteken die hele breuk a keer met homself vermenigvuldig") },
              { s: L("All the x's collect on top and all the y's underneath", "Al die x-faktore kom bo bymekaar en al die y-faktore onder") },
              { s: L("∴ xᵃ/yᵃ", "∴ xᵃ/yᵃ"), r: L("power of a quotient — each base gets the exponent", "mag van 'n kwosiënt: elke grondtal kry die eksponent") }] },
      { q: L("Simplify the negative exponent: <b>(x/y)⁻ᵃ = ?</b>", "Vereenvoudig die negatiewe eksponent: <b>(x/y)⁻ᵃ = ?</b>"), correct: L("(y/x)ᵃ", "(y/x)ᵃ"), wrongs: [L("(x/y)ᵃ", "(x/y)ᵃ"), L("−(x/y)ᵃ", "−(x/y)ᵃ"), L("(y/x)⁻ᵃ", "(y/x)⁻ᵃ")], ans: L("Flip the fraction and drop the sign: (x/y)⁻ᵃ = (y/x)ᵃ.", "Draai die breuk om en laat die teken weg: (x/y)⁻ᵃ = (y/x)ᵃ."),
        sol: [{ s: L("Flipped fractions: a negative power turns the fraction upside down", "Omgedraaide breuke: 'n negatiewe mag draai die breuk onderstebo") },
              { s: L("So (x/y)⁻ᵃ = (y/x)ᵃ", "Dus (x/y)⁻ᵃ = (y/x)ᵃ"), r: L("flip the fraction AND change the sign of the exponent", "draai die breuk om EN verander die teken van die eksponent") },
              { s: L("The minus is used up by the flip — it never stays out in front", "Die omdraai gebruik die minus op: dit bly nooit voor staan nie") }] },
      { q: L("Apply the exponent: <b>(xy)ᵃ = ?</b>", "Pas die eksponent toe: <b>(xy)ᵃ = ?</b>"), correct: L("xᵃ yᵃ", "xᵃ yᵃ"), wrongs: [L("x yᵃ", "x yᵃ"), L("(x + y)ᵃ", "(x + y)ᵃ"), L("xᵃ + yᵃ", "xᵃ + yᵃ")], ans: L("Each base gets the exponent: (xy)ᵃ = xᵃyᵃ.", "Elke grondtal kry die eksponent: (xy)ᵃ = xᵃyᵃ."),
        sol: [{ s: L("(xy)ᵃ means xy multiplied by itself a times", "(xy)ᵃ beteken xy a keer met homself vermenigvuldig") },
              { s: L("Multiplying can be reshuffled, so gather all the x's together and all the y's together", "Vermenigvuldiging kan herrangskik word, dus maak al die x-faktore bymekaar en al die y-faktore bymekaar") },
              { s: L("∴ xᵃyᵃ", "∴ xᵃyᵃ"), r: L("power of a product — this only works because it is × inside, never +", "mag van 'n produk: dit werk net omdat dit × binne-in is, nooit + nie") }] },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: L("Each base in the bracket gets the power. A negative power flips a fraction over.", "Elke grondtal in die hakie kry die mag. 'n Negatiewe mag draai 'n breuk om."), answerLabel: it.ans, solution: it.sol });
  },

  /* the same-base gate */
  sameBase: () => ynQ(CON,
    L("Before you can add or subtract exponents, the <b>bases must be the same</b>. True or false?", "Voordat jy eksponente kan optel of aftrek, moet die <b>grondtalle dieselfde wees</b>. Waar of onwaar?"),
    true,
    { hint: L("xᵃ·xᵇ = xᵃ⁺ᵇ only works when the base x is shared.", "xᵃ·xᵇ = xᵃ⁺ᵇ werk net as albei die grondtal x het."),
      answerLabel: L("True — the laws only apply when the bases match. xᵃ·yᵇ (different bases) can’t be combined.", "Waar: die wette geld net as die grondtalle ooreenstem. xᵃ·yᵇ (verskillende grondtalle) kan nie saamgevoeg word nie."),
      solution: [
        { s: L("x³ · x² works because you are counting x's: (x·x·x)(x·x) = x⁵", "x³ · x² werk omdat jy x-faktore tel: (x·x·x)(x·x) = x⁵") },
        { s: L("With different bases there is nothing to count together — 2³ · 3² is just 8 × 9 = 72, and no law reaches it", "Met verskillende grondtalle is daar niks om saam te tel nie: 2³ · 3² is net 8 × 9 = 72, en geen wet raak daaraan nie") },
        { s: L("∴ true", "∴ waar"), r: L("the header on her laws page: these rules only apply when the bases are the same", "die opskrif op haar wette-bladsy: hierdie reëls geld net as die grondtalle dieselfde is") },
      ] }),
};

export const questEs1 = {
  id: "es1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
