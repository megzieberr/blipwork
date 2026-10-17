/* ============================================================
   EXPONENTS & SURDS · Q2 — Spot the trap (laws)
   ------------------------------------------------------------
   Is this step legal? The classic exponent mistakes: the base
   that shouldn't change, x⁰, negative-exponent ≠ negative,
   the exponent on the whole bracket, (x+y)² ≠ x²+y².

   PARAMETRISED 2026-08-23 (dice wave 2 — sessions/DICE-COMMON.md's
   CARE rule). DICE-AUDIT §11 classified all six skills CARE: the ten
   yes/no traps and the four "fix it" mistakes were fixed worked
   numbers. Every bank item is now a TEMPLATE that rolls its own
   numbers and computes its own answer text — but the TRAP TYPES are
   untouched: the same ten misconceptions in the same order, the same
   four broken steps, the same wording, the same hints. No new trap
   was invented and no decoy family was widened: in this quest the
   wrong options ARE the teaching content.
   Static play is unaffected — gen() still just calls pick()/randInt(),
   which route through js/rng.js (Math.random outside a dice round).
   ============================================================ */
import { mc, ynQ, pick, randInt, usup, upw } from "./_exp.js";
import { L } from "../lang.js";

const CON = "expTraps";

const LETTERS = [L("x", "x"), L("a", "a"), L("m", "m"), L("p", "p")];
/* base pairs for the two-letter traps. `a`/`b` are kept out of the pairs
   that carry SYMBOLIC exponents (xᵃ · yᵇ), so a base can never collide
   with an exponent letter. */
const PAIRS = [[L("x", "x"), L("y", "y")], [L("a", "a"), L("b", "b")], [L("p", "p"), L("q", "q")], [L("m", "m"), L("n", "n")]];
const PAIRS_NOAB = [[L("x", "x"), L("y", "y")], [L("p", "p"), L("q", "q")], [L("m", "m"), L("n", "n")]];

/* ---- yes/no trap bank — ten templates, one per misconception.
   Each returns { q, yes, ans }: exactly the shape the fixed items had.
   `yes` = "is the statement correct?" ---- */
const YN = [
  /* 1 · the base must NOT change (add the exponents, keep the base) */
  () => {
    let b, p, q;
    do { b = pick([2, 3, 5]); p = randInt(2, 4); q = randInt(2, 4); } while (Math.pow(b, p + q) > 20000);
    return {
      q: L(`Is this correct?<br><b>${upw(b, p)} · ${upw(b, q)} = ${upw(b * b, p + q)}</b>`, `Is dit korrek?<br><b>${upw(b, p)} · ${upw(b, q)} = ${upw(b * b, p + q)}</b>`),
      yes: false,
      ans: L(`No — the base stays ${b}. It is ${upw(b, p)}·${upw(b, q)} = ${upw(b, p + q)} = ${Math.pow(b, p + q)}.`, `Nee: die grondtal bly ${b}. Dit is ${upw(b, p)}·${upw(b, q)} = ${upw(b, p + q)} = ${Math.pow(b, p + q)}.`),
      sol: [
        { s: L(`Same base and a ×, so the product rule fires: add the exponents, ${p} + ${q} = ${p + q}`, `Dieselfde grondtal en 'n ×, dus tree die produkreël in: tel die eksponente op, ${p} + ${q} = ${p + q}`) },
        { s: L(`The base takes no part in that arithmetic — it stays ${b}`, `Die grondtal speel geen rol in daardie berekening nie: dit bly ${b}`), r: L("only the exponents move", "net die eksponente verander") },
        { s: L(`∴ ${upw(b, p + q)} = ${Math.pow(b, p + q)}, so changing ${b} into ${b * b} is the slip`, `∴ ${upw(b, p + q)} = ${Math.pow(b, p + q)}, dus is die fout om ${b} in ${b * b} te verander`) },
      ],
    };
  },
  /* 2 · quotient rule, correctly applied (a TRUE one) */
  () => {
    const b = pick([2, 3, 5, 7]);
    const p = randInt(4, 9), q = randInt(2, p - 2);      // p − q ≥ 2, so the answer never reads "b¹"
    return {
      q: L(`Is this correct?<br><b>${upw(b, p)} ÷ ${upw(b, q)} = ${upw(b, p - q)}</b>`, `Is dit korrek?<br><b>${upw(b, p)} ÷ ${upw(b, q)} = ${upw(b, p - q)}</b>`),
      yes: true,
      ans: L(`Yes — same base, so subtract the exponents: ${p} − ${q} = ${p - q}.`, `Ja: dieselfde grondtal, dus trek die eksponente af: ${p} − ${q} = ${p - q}.`),
      sol: [
        { s: L(`Both sides of the ÷ are powers of ${b}, so the quotient rule applies`, `Albei kante van die ÷ is magte van ${b}, dus geld die kwosiëntreël`) },
        { s: L(`Dividing takes ${b}'s away: ${p} − ${q} = ${p - q}`, `Deel haal ${b}-faktore weg: ${p} − ${q} = ${p - q}`) },
        { s: L(`∴ ${upw(b, p - q)} — the line is correct as written`, `∴ ${upw(b, p - q)}: die reël is korrek soos dit staan`), r: L(`and the base is still ${b}, as it should be`, `en die grondtal is steeds ${b}, soos dit hoort`) },
      ],
    };
  },
  /* 3 · x⁰ is 1, not 0 */
  () => {
    const v = pick(LETTERS);
    return {
      q: L(`Is this correct?<br><b>${upw(v, 0)} = 0</b>`, `Is dit korrek?<br><b>${upw(v, 0)} = 0</b>`),
      yes: false,
      ans: L("No — anything non-zero to the power 0 is 1, not 0.", "Nee: enigiets behalwe nul, tot die mag 0, is 1, nie 0 nie."),
      sol: [
        { s: L(`${v}ᵃ ÷ ${v}ᵃ = 1`, `${v}ᵃ ÷ ${v}ᵃ = 1`), r: L("anything divided by itself", "enigiets gedeel deur homself") },
        { s: L(`The quotient rule calls that very same thing ${v}ᵃ⁻ᵃ = ${upw(v, 0)}`, `Die kwosiëntreël noem presies dieselfde ding ${v}ᵃ⁻ᵃ = ${upw(v, 0)}`) },
        { s: L(`So ${upw(v, 0)} = 1, not 0`, `Dus ${upw(v, 0)} = 1, nie 0 nie`), r: L("anything to the zero is always one", "enigiets tot die mag nul is altyd een") },
      ],
    };
  },
  /* 4 · only the letter carries the zero exponent (a TRUE one) */
  () => {
    const v = pick(LETTERS), c = randInt(2, 9);
    return {
      q: L(`Is this correct?<br><b>${c}${upw(v, 0)} = ${c}</b> &nbsp;(${v} ≠ 0)`, `Is dit korrek?<br><b>${c}${upw(v, 0)} = ${c}</b> &nbsp;(${v} ≠ 0)`),
      yes: true,
      ans: L(`Yes — only ${v} is to the power 0 (= 1), so ${c}·1 = ${c}.`, `Ja: net ${v} is tot die mag 0 (= 1), dus ${c}·1 = ${c}.`),
      sol: [
        { s: L(`Check what the 0 is sitting on: there is no bracket, so it sits on ${v} alone`, `Kyk waarop die 0 sit: daar is geen hakie nie, dus sit dit net op ${v}`) },
        { s: L(`${upw(v, 0)} = 1, so ${c}${upw(v, 0)} = ${c}(1)`, `${upw(v, 0)} = 1, dus ${c}${upw(v, 0)} = ${c}(1)`) },
        { s: L(`= ${c} — correct as written`, `= ${c}: korrek soos dit staan`), r: L(`(${c}${v})⁰ would have been 1 instead`, `(${c}${v})⁰ sou eerder 1 gewees het`) },
      ],
    };
  },
  /* 5 · the coefficient inside the bracket gets the power too.
     The OUTER power stays 2 so "is squared too" stays literally true. */
  () => {
    const v = pick(LETTERS), c = randInt(2, 9), m = randInt(2, 5);
    return {
      q: L(`Is this correct?<br><b>(${c}${upw(v, m)})² = ${c}${upw(v, 2 * m)}</b>`, `Is dit korrek?<br><b>(${c}${upw(v, m)})² = ${c}${upw(v, 2 * m)}</b>`),
      yes: false,
      ans: L(`No — the ${c} is squared too: (${c}${upw(v, m)})² = ${c * c}${upw(v, 2 * m)}.`, `Nee: die ${c} word ook gekwadreer: (${c}${upw(v, m)})² = ${c * c}${upw(v, 2 * m)}.`),
      sol: [
        { s: L("The power sits on the WHOLE bracket, so everything inside it gets squared", "Die mag sit op die HELE hakie, dus word alles daarbinne gekwadreer") },
        { s: `(${c}${upw(v, m)})² = ${c}² · (${upw(v, m)})² = ${c * c}${upw(v, 2 * m)}` },
        { s: L(`The ${upw(v, 2 * m)} part is right — it is the ${c} that was left behind`, `Die deel ${upw(v, 2 * m)} is reg: dit is die ${c} wat vergeet is`), r: `${c}² = ${c * c}` },
      ],
    };
  },
  /* 6 · a negative exponent is a reciprocal, not a minus */
  () => {
    const v = pick(LETTERS), n = randInt(2, 5);
    return {
      q: L(`Is this correct?<br><b>${upw(v, `-${n}`)} = −${upw(v, n)}</b>`, `Is dit korrek?<br><b>${upw(v, `-${n}`)} = −${upw(v, n)}</b>`),
      yes: false,
      ans: L(`No — a negative exponent means a reciprocal: ${upw(v, `-${n}`)} = 1/${upw(v, n)} (a positive value).`, `Nee: 'n negatiewe eksponent beteken 'n resiprook: ${upw(v, `-${n}`)} = 1/${upw(v, n)} ('n positiewe waarde).`),
      sol: [
        { s: L("Depressed exponents: the minus flips the power under the line — it is not a minus sign out front", "Neerslagtige eksponente: die minus stuur die mag onder die streep; dit is nie 'n minusteken voorop nie") },
        { s: `${upw(v, `-${n}`)} = 1/${upw(v, n)}` },
        { s: L(`Try it with a number: 2⁻³ = 1/8, which is positive, not −8`, `Probeer dit met 'n getal: 2⁻³ = 1/8, en dit is positief, nie −8 nie`) },
      ],
    };
  },
  /* 7 · you cannot split a power over a sum. Power stays 2 — the
     answer line is the vetted (x+y)² = x² + 2xy + y² expansion. */
  () => {
    const [u, w] = pick(PAIRS);
    return {
      q: L(`Is this correct?<br><b>(${u} + ${w})² = ${upw(u, 2)} + ${upw(w, 2)}</b>`, `Is dit korrek?<br><b>(${u} + ${w})² = ${upw(u, 2)} + ${upw(w, 2)}</b>`),
      yes: false,
      ans: L(`No — you can’t split a power over a sum. (${u}+${w})² = ${upw(u, 2)} + 2${u}${w} + ${upw(w, 2)}.`, `Nee: jy kan nie 'n mag oor 'n som opbreek nie. (${u}+${w})² = ${upw(u, 2)} + 2${u}${w} + ${upw(w, 2)}.`),
      sol: [
        { s: L("A power splits over × and ÷ only — never over + or −", "'n Mag breek net oor × en ÷ op, nooit oor + of − nie") },
        { s: `(${u} + ${w})² = (${u} + ${w})(${u} + ${w}) = ${upw(u, 2)} + 2${u}${w} + ${upw(w, 2)}`, r: L("the middle term is what gets lost", "die middelterm is wat verlore raak") },
        { s: L("Test it with numbers: (2 + 3)² = 25, but 2² + 3² = 13", "Toets dit met getalle: (2 + 3)² = 25, maar 2² + 3² = 13") },
      ],
    };
  },
  /* 8 · different bases can't be combined (fully symbolic) */
  () => {
    const [u, w] = pick(PAIRS_NOAB);
    return {
      q: L(`Is this correct?<br><b>${upw(u, "a")} · ${upw(w, "b")} = (${u}${w})${usup("a+b")}</b>`, `Is dit korrek?<br><b>${upw(u, "a")} · ${upw(w, "b")} = (${u}${w})${usup("a+b")}</b>`),
      yes: false,
      ans: L("No — different bases can’t be combined. The laws need the SAME base.", "Nee: verskillende grondtalle kan nie saamgevoeg word nie. Die wette het DIESELFDE grondtal nodig."),
      sol: [
        { s: L(`Check the bases first: ${u} and ${w} are different`, `Kyk eers na die grondtalle: ${u} en ${w} verskil`) },
        { s: L("The product rule counts copies of ONE base — with two different bases there is nothing to count together", "Die produkreël tel kopieë van EEN grondtal: met twee verskillende grondtalle is daar niks om saam te tel nie") },
        { s: L("Test it with numbers: 2² · 3² = 4 × 9 = 36, but (2·3)⁴ = 1296", "Toets dit met getalle: 2² · 3² = 4 × 9 = 36, maar (2·3)⁴ = 1296"), r: L(`so ${upw(u, "a")} · ${upw(w, "b")} stays as it is`, `dus bly ${upw(u, "a")} · ${upw(w, "b")} soos dit is`) },
      ],
    };
  },
  /* 9 · every base in the bracket gets the power (a TRUE one) */
  () => {
    let c, n;
    do { c = randInt(2, 5); n = randInt(2, 4); } while (Math.pow(c, n) > 625);
    const v = pick(LETTERS);
    return {
      q: L(`Is this correct?<br><b>(${c}${v})${usup(n)} = ${Math.pow(c, n)}${upw(v, n)}</b>`, `Is dit korrek?<br><b>(${c}${v})${usup(n)} = ${Math.pow(c, n)}${upw(v, n)}</b>`),
      yes: true,
      ans: L(`Yes — every base in the bracket gets the power: ${upw(c, n)} = ${Math.pow(c, n)} and ${upw(v, n)}.`, `Ja: elke grondtal in die hakie kry die mag: ${upw(c, n)} = ${Math.pow(c, n)} en ${upw(v, n)}.`),
      sol: [
        { s: L("Inside the bracket it is a MULTIPLY, so the power splits over both parts", "Binne die hakie is dit 'n VERMENIGVULDIGING, dus breek die mag oor albei dele op") },
        { s: L(`${upw(c, n)} = ${Math.pow(c, n)}, and ${v}${usup(n)} stays as ${upw(v, n)}`, `${upw(c, n)} = ${Math.pow(c, n)}, en ${v}${usup(n)} bly ${upw(v, n)}`) },
        { s: L(`∴ ${Math.pow(c, n)}${upw(v, n)} — correct as written`, `∴ ${Math.pow(c, n)}${upw(v, n)}: korrek soos dit staan`), r: L("the coefficient was not forgotten this time", "die koëffisiënt is hierdie keer nie vergeet nie") },
      ],
    };
  },
  /* 10 · a negative exponent gives a POSITIVE value (a TRUE one) */
  () => {
    let b, n;
    do { b = randInt(2, 5); n = randInt(2, 4); } while (Math.pow(b, n) > 625);
    return {
      q: L(`Is this correct?<br><b>${upw(b, `-${n}`)} = 1/${Math.pow(b, n)}</b>`, `Is dit korrek?<br><b>${upw(b, `-${n}`)} = 1/${Math.pow(b, n)}</b>`),
      yes: true,
      ans: L(`Yes — ${upw(b, `-${n}`)} = 1/${upw(b, n)} = 1/${Math.pow(b, n)}. The value is positive.`, `Ja: ${upw(b, `-${n}`)} = 1/${upw(b, n)} = 1/${Math.pow(b, n)}. Die waarde is positief.`),
      sol: [
        { s: L(`Flip the fraction and change the sign: ${upw(b, `-${n}`)} = 1/${upw(b, n)}`, `Draai die breuk om en verander die teken: ${upw(b, `-${n}`)} = 1/${upw(b, n)}`) },
        { s: L(`${upw(b, n)} = ${Math.pow(b, n)}, so it is 1/${Math.pow(b, n)}`, `${upw(b, n)} = ${Math.pow(b, n)}, dus is dit 1/${Math.pow(b, n)}`) },
        { s: L("Correct as written — and notice the value came out positive", "Korrek soos dit staan, en let op dat die waarde positief uitkom") },
      ],
    };
  },
];

/* ---- mc — name the actual mistake. Four templates, the same four
   broken steps as before; the decoys stay the same three misreadings. ---- */
const FIX = [
  /* 1 · the base was changed */
  () => {
    let b, p, q;
    do { b = pick([2, 3, 5]); p = randInt(2, 4); q = randInt(2, 4); } while (Math.pow(b, p + q) > 20000);
    return {
      q: L(`What is wrong with <b>${upw(b, p)} · ${upw(b, q)} = ${upw(b * b, p + q)}</b>?`, `Wat is fout met <b>${upw(b, p)} · ${upw(b, q)} = ${upw(b * b, p + q)}</b>?`),
      correct: L(`The base should stay ${b} (answer ${upw(b, p + q)}), not become ${b * b}`, `Die grondtal moet ${b} bly (antwoord ${upw(b, p + q)}), nie ${b * b} word nie`),
      wrongs: [L("The exponents should be multiplied", "Die eksponente moet vermenigvuldig word"), L("The exponents should be subtracted", "Die eksponente moet afgetrek word"), L("Nothing — it is correct", "Niks nie: dit is korrek")],
      ans: L(`Add the exponents but KEEP the base: ${upw(b, p)}·${upw(b, q)} = ${upw(b, p + q)}.`, `Tel die eksponente op, maar HOU die grondtal: ${upw(b, p)}·${upw(b, q)} = ${upw(b, p + q)}.`),
      sol: [
        { s: L(`Same base and a ×, so add the exponents: ${p} + ${q} = ${p + q}`, `Dieselfde grondtal en 'n ×, dus tel die eksponente op: ${p} + ${q} = ${p + q}`), r: L("that part of the line is right", "daardie deel van die reël is reg") },
        { s: L(`The base plays no part in that sum — it stays ${b}`, `Die grondtal speel geen rol in daardie som nie: dit bly ${b}`) },
        { s: L(`∴ ${upw(b, p + q)}; turning ${b} into ${b * b} is the one broken step`, `∴ ${upw(b, p + q)}; om ${b} in ${b * b} te verander, is die een foutiewe stap`) },
      ],
    };
  },
  /* 2 · the coefficient was left un-powered. The OUTER power stays 3 so
     "must also be cubed" stays literally true; the second decoy is the
     add-instead-of-multiply exponent, computed from the same roll. */
  () => {
    const v = pick(LETTERS), c = randInt(2, 5), m = randInt(2, 4);
    return {
      q: L(`What is wrong with <b>(${c}${upw(v, m)})³ = ${c}${upw(v, 3 * m)}</b>?`, `Wat is fout met <b>(${c}${upw(v, m)})³ = ${c}${upw(v, 3 * m)}</b>?`),
      correct: L(`The ${c} must also be cubed → ${c * c * c}${upw(v, 3 * m)}`, `Die ${c} moet ook tot die derde mag verhef word → ${c * c * c}${upw(v, 3 * m)}`),
      wrongs: [L("The exponents should be added", "Die eksponente moet opgetel word"), L(`${v} should be ${upw(v, m + 3)}`, `${v} moet ${upw(v, m + 3)} wees`), L("Nothing — it is correct", "Niks nie: dit is korrek")],
      ans: L(`The power hits everything in the bracket: (${c}${upw(v, m)})³ = ${upw(c, 3)}${upw(v, 3 * m)} = ${c * c * c}${upw(v, 3 * m)}.`, `Die mag tref alles in die hakie: (${c}${upw(v, m)})³ = ${upw(c, 3)}${upw(v, 3 * m)} = ${c * c * c}${upw(v, 3 * m)}.`),
      sol: [
        { s: L("The 3 sits on the whole bracket, so both things inside it get cubed", "Die 3 sit op die hele hakie, dus word albei dele daarbinne tot die derde mag verhef") },
        { s: `(${c}${upw(v, m)})³ = ${upw(c, 3)} · ${upw(v, 3 * m)} = ${c * c * c}${upw(v, 3 * m)}` },
        { s: L(`The exponent ${3 * m} is right (${m} × 3 — power of a power), so the only slip is the ${c}`, `Die eksponent ${3 * m} is reg (${m} × 3: mag van 'n mag), dus is die ${c} die enigste fout`), r: `${upw(c, 3)} = ${c * c * c}` },
      ],
    };
  },
  /* 3 · negative exponent read as a minus sign */
  () => {
    const v = pick(LETTERS), n = randInt(2, 5);
    return {
      q: L(`What is wrong with <b>${upw(v, `-${n}`)} = −${upw(v, n)}</b>?`, `Wat is fout met <b>${upw(v, `-${n}`)} = −${upw(v, n)}</b>?`),
      correct: L(`A negative exponent gives a reciprocal: 1/${upw(v, n)}`, `'n Negatiewe eksponent gee 'n resiprook: 1/${upw(v, n)}`),
      wrongs: [L(`It should be −1/${upw(v, n)}`, `Dit moet −1/${upw(v, n)} wees`), L(`It should be ${upw(v, n)}`, `Dit moet ${upw(v, n)} wees`), L("Nothing — it is correct", "Niks nie: dit is korrek")],
      ans: L(`${upw(v, `-${n}`)} = 1/${upw(v, n)} — positive, not negative.`, `${upw(v, `-${n}`)} = 1/${upw(v, n)}: positief, nie negatief nie.`),
      sol: [
        { s: L("The minus on the exponent flips the power under the line; it does not travel out in front", "Die minus op die eksponent stuur die mag onder die streep; dit gaan nie voor staan nie") },
        { s: `${upw(v, `-${n}`)} = 1/${upw(v, n)}` },
        { s: L(`1/${upw(v, n)} is positive, so writing −${upw(v, n)} is the mistake`, `1/${upw(v, n)} is positief, dus is −${upw(v, n)} die fout`), r: L("check on numbers: 2⁻³ = 1/8, not −8", "toets met getalle: 2⁻³ = 1/8, nie −8 nie") },
      ],
    };
  },
  /* 4 · different bases combined. Guard p·q ≠ p+q so the "multiplied
     the exponents" decoy can never equal the shown (wrong) answer. */
  () => {
    const [u, w] = pick(PAIRS);
    let p, q;
    do { p = randInt(2, 6); q = randInt(2, 6); } while (p * q === p + q);
    return {
      q: L(`What is wrong with <b>${upw(u, p)} · ${upw(w, q)} = (${u}${w})${usup(p + q)}</b>?`, `Wat is fout met <b>${upw(u, p)} · ${upw(w, q)} = (${u}${w})${usup(p + q)}</b>?`),
      correct: L("Different bases — they can’t be combined", "Verskillende grondtalle: hulle kan nie saamgevoeg word nie"),
      wrongs: [L("The exponents should be multiplied", "Die eksponente moet vermenigvuldig word"), L(`It should be (${u}${w})${usup(p * q)}`, `Dit moet (${u}${w})${usup(p * q)} wees`), L("Nothing — it is correct", "Niks nie: dit is korrek")],
      ans: L(`The product rule needs the SAME base; ${u} and ${w} stay separate.`, `Die produkreël het DIESELFDE grondtal nodig; ${u} en ${w} bly apart.`),
      sol: [
        { s: L(`Before touching any exponent, check the bases: ${u} and ${w} are different`, `Kyk na die grondtalle voordat jy aan 'n eksponent raak: ${u} en ${w} verskil`) },
        { s: L("The product rule only works on a shared base, so no law applies here at all", "Die produkreël werk net met dieselfde grondtal, dus geld geen wet hier nie") },
        { s: L(`Merging them into (${u}${w}) is the mistake`, `Om hulle saam te voeg in (${u}${w}) is die fout`), r: L("adding or multiplying the exponents would both be wrong — nothing may be done", "om die eksponente op te tel of te vermenigvuldig, sou albei verkeerd wees: niks mag gedoen word nie") },
      ],
    };
  },
];

const SKILLS = {
  trap1: () => { const it = pick(YN)(); return ynQ(CON, it.q, it.yes, { hint: L("Watch the base, the bracket, and the sign of the exponent.", "Let op die grondtal, die hakie en die teken van die eksponent."), answerLabel: it.ans, solution: it.sol }); },
  trap2: () => { const it = pick(YN)(); return ynQ(CON, it.q, it.yes, { hint: L("Does a law actually apply here? Same base? Whole bracket?", "Geld 'n wet regtig hier? Dieselfde grondtal? Hele hakie?"), answerLabel: it.ans, solution: it.sol }); },
  trap3: () => { const it = pick(YN)(); return ynQ(CON, it.q, it.yes, { hint: L("x⁰ = 1, a negative exponent flips, and you can’t split (x+y)ⁿ.", "x⁰ = 1, 'n negatiewe eksponent draai om, en jy kan nie (x+y)ⁿ opbreek nie."), answerLabel: it.ans, solution: it.sol }); },
  fixIt1: () => { const it = pick(FIX)(); return mc(CON, it.q, it.correct, it.wrongs, { hint: L("Find the single broken rule.", "Vind die een reël wat gebreek is."), answerLabel: it.ans, solution: it.sol }); },
  fixIt2: () => { const it = pick(FIX)(); return mc(CON, it.q, it.correct, it.wrongs, { hint: L("Find the single broken rule.", "Vind die een reël wat gebreek is."), answerLabel: it.ans, solution: it.sol }); },
  trap4: () => { const it = pick(YN)(); return ynQ(CON, it.q, it.yes, { hint: L("Check it against the laws one piece at a time.", "Toets dit stuk vir stuk teen die wette."), answerLabel: it.ans, solution: it.sol }); },
};

export const questEs2 = {
  id: "es2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
