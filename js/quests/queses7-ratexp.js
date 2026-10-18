/* ============================================================
   EXPONENTS & SURDS · Q7 — Rational-exponent equations
   ------------------------------------------------------------
   Solving x^(p/q) = k: raise both sides to the reciprocal, and
   decide whether the answer is ± (two), a single (possibly
   negative) value, or no real solution.
   ============================================================ */
import { mc, ynQ, pick, randInt, gcd } from "./_exp.js";
import { L } from "../lang.js";

const CON = "ratExpEq";

const A = L("x = ± (two answers)", "x = ± (twee antwoorde)");
const B = L("exactly one real answer (no ±)", "presies een reële antwoord (geen ±)");
const C = L("no real solution", "geen reële oplossing");
const D = L("only x = 0", "net x = 0");

/* each item: equation, correct category, why */
const POOL = [
  { e: L("x^(2/3) = 4", "x^(2/3) = 4"), cat: A, why: L("Numerator 2 is even and the right side is positive → x = ±8 (two answers).", "Teller 2 is ewe en die regterkant is positief → x = ±8 (twee antwoorde).") },
  { e: L("x^(2/3) = 9", "x^(2/3) = 9"), cat: A, why: L("Even numerator, positive right side → x = ±27 (two answers).", "Ewe teller, positiewe regterkant → x = ±27 (twee antwoorde).") },
  { e: L("x^(2/5) = 16", "x^(2/5) = 16"), cat: A, why: L("Even numerator, positive right side → ± two answers.", "Ewe teller, positiewe regterkant → ± twee antwoorde.") },
  { e: L("x^(3/5) = −2", "x^(3/5) = −2"), cat: B, why: L("Top and bottom both odd → a single real answer, and here it is negative.", "Bo en onder albei onewe → een reële antwoord, en hier is dit negatief.") },
  { e: L("x^(1/3) = −2", "x^(1/3) = −2"), cat: B, why: L("Odd top and odd bottom → one real (negative) answer: x = −8.", "Onewe bo en onewe onder → een reële (negatiewe) antwoord: x = −8.") },
  { e: L("x^(3/7) = −5", "x^(3/7) = −5"), cat: B, why: L("All odd → one real, negative answer.", "Alles onewe → een reële, negatiewe antwoord.") },
  { e: L("x^(3/2) = 8", "x^(3/2) = 8"), cat: B, why: L("Odd numerator (3) → one answer: raise to 2/3 → x = 4. The even denominator only means x can’t be negative — it does NOT give ±.", "Onewe teller (3) → een antwoord: verhef tot 2/3 → x = 4. Die ewe noemer beteken net dat x nie negatief kan wees nie: dit gee NIE ± nie.") },
  { e: L("x^(3/5) = 2", "x^(3/5) = 2"), cat: B, why: L("Top and bottom both odd → exactly one real answer: x = 2^(5/3) (positive, because the right side is positive).", "Bo en onder albei onewe → presies een reële antwoord: x = 2^(5/3) (positief, want die regterkant is positief).") },
  { e: L("x^(1/2) = −5", "x^(1/2) = −5"), cat: C, why: L("An even root (denominator 2) is never negative → no solution.", "'n Ewe wortel (noemer 2) is nooit negatief nie → geen oplossing.") },
  { e: L("x^(3/4) = −8", "x^(3/4) = −8"), cat: C, why: L("x^(3/4) = (⁴√x)³, and ⁴√x is never negative → no real solution.", "x^(3/4) = (⁴√x)³, en ⁴√x is nooit negatief nie → geen reële oplossing.") },
  { e: L("x^(2/5) = −4", "x^(2/5) = −4"), cat: C, why: L("Even power (numerator 2) can’t equal a negative → no real solution.", "Ewe mag (teller 2) kan nie 'n negatiewe getal gee nie → geen reële oplossing.") },
];

const SKILLS = {
  classify1: () => { const it = pick(POOL); return mc(CON, L(`Solve <b>${it.e}</b>. What does the solution look like?`, `Los <b>${it.e}</b> op. Hoe lyk die oplossing?`), it.cat, [A, B, C, D].filter((x) => x !== it.cat), { hint: L("Even numerator + positive → ±. All odd → one (can be negative). Even root/power of a negative → none.", "Ewe teller + positief → ±. Alles onewe → een (kan negatief wees). Ewe wortel/mag van 'n negatiewe getal → geen."), answerLabel: it.why }); },
  classify2: () => { const it = pick(POOL); return mc(CON, L(`Solve <b>${it.e}</b>. What does the solution look like?`, `Los <b>${it.e}</b> op. Hoe lyk die oplossing?`), it.cat, [A, B, C, D].filter((x) => x !== it.cat), { hint: L("Look at whether the top and bottom of the exponent are odd or even, and the sign of the right side.", "Kyk of bo en onder in die eksponent onewe of ewe is, en kyk na die teken van die regterkant."), answerLabel: it.why }); },
  classify3: () => { const it = pick(POOL); return mc(CON, L(`Solve <b>${it.e}</b>. What does the solution look like?`, `Los <b>${it.e}</b> op. Hoe lyk die oplossing?`), it.cat, [A, B, C, D].filter((x) => x !== it.cat), { hint: L("An even root is never negative; an even power is never negative.", "'n Ewe wortel is nooit negatief nie; 'n ewe mag is nooit negatief nie."), answerLabel: it.why }); },

  /* the method step.  PARAMETRISED 2026-08-23 (dice wave 2 — the one
     CARE skill in this quest, DICE-AUDIT §11): the exponent p/q now
     rolls (in lowest terms, p ≠ q so the reciprocal is a different
     fraction) and the right-hand side is a rolled positive integer —
     the question only ever asks WHICH power to raise both sides to, so
     the value of k plays no part in the answer, exactly as before. The
     three decoys stay the same three misreadings: the exponent itself,
     its negative, and the denominator alone. */
  reciprocalStep: () => {
    let p, q;
    do { p = randInt(2, 5); q = randInt(2, 5); } while (p === q || gcd(p, q) !== 1);
    const k = randInt(2, 30);
    return mc(CON, L(`To solve <b>x^(${p}/${q}) = ${k}</b>, raise both sides to the power:`, `Om <b>x^(${p}/${q}) = ${k}</b> op te los, verhef albei kante tot die mag:`),
      `${q}/${p}`, [`${p}/${q}`, `−${p}/${q}`, `${q}`],
      { hint: L("Multiply the exponent by its reciprocal so it becomes 1.", "Vermenigvuldig die eksponent met sy resiprook sodat dit 1 word."),
        answerLabel: L(`Use the reciprocal of ${p}/${q}, which is ${q}/${p}; then (${p}/${q})·(${q}/${p}) = 1 and x is on its own.`, `Gebruik die resiprook van ${p}/${q}, wat ${q}/${p} is; dan is (${p}/${q})·(${q}/${p}) = 1 en x staan alleen.`),
        solution: [
          { s: L(`x is stuck under the exponent ${p}/${q}, so you need a power that cancels it`, `x sit vas onder die eksponent ${p}/${q}, dus het jy 'n mag nodig wat dit kanselleer`) },
          { s: L(`Switch the numerator and denominator: the reciprocal of ${p}/${q} is ${q}/${p}`, `Ruil die teller en noemer om: die resiprook van ${p}/${q} is ${q}/${p}`) },
          { s: L(`Raising to that power gives (${p}/${q})·(${q}/${p}) = 1, so x¹ = x stands alone`, `Verhef tot daardie mag en jy kry (${p}/${q})·(${q}/${p}) = 1, dus staan x¹ = x alleen`),
            r: L(`then the right side becomes ${k}^(${q}/${p})`, `dan word die regterkant ${k}^(${q}/${p})`) },
        ] });
  },

  /* why the reciprocal */
  whyReciprocal: () => mc(CON,
    L("Why do we raise both sides to the <b>reciprocal</b> of the exponent?", "Hoekom verhef ons albei kante tot die <b>resiprook</b> van die eksponent?"),
    L("So the exponents multiply to 1 and x is left on its own", "Sodat die produk van die eksponente 1 is en x alleen oorbly"),
    [L("To make the right side a whole number", "Om die regterkant 'n heelgetal te maak"), L("To change x into a surd", "Om x in 'n wortelvorm te verander"), L("To remove the negative sign", "Om die negatiewe teken te verwyder")],
    { hint: L("(p/q) × (q/p) = ?", "(p/q) × (q/p) = ?"), answerLabel: L("(p/q)·(q/p) = 1, so x¹ = x is isolated.", "(p/q)·(q/p) = 1, dus is x¹ = x geïsoleer."),
      solution: [
        { s: L("Raising a power to a power MULTIPLIES the exponents: (x^(p/q))^(q/p) = x^((p/q)·(q/p))", "'n Mag tot 'n mag VERMENIGVULDIG die eksponente: (x^(p/q))^(q/p) = x^((p/q)·(q/p))") },
        { s: L("A fraction times its own reciprocal is 1, because the tops and bottoms cancel", "'n Breuk maal sy eie resiprook is 1, want die tellers en noemers kanselleer") },
        { s: L("So the exponent becomes 1 and you are left with plain x", "Dus word die eksponent 1 en jy hou net x oor"), r: L("that is the only reason the reciprocal is chosen", "dis die enigste rede waarom die resiprook gekies word") },
      ] }),

  /* the no-solution rule */
  noSolutionRule: () => ynQ(CON,
    L("An <b>even root</b> can never come out <b>negative</b>, so x^(1/2) = −4 has no real solution. True or false?", "'n <b>Ewe wortel</b> kan nooit <b>negatief</b> uitkom nie, dus het x^(1/2) = −4 geen reële oplossing nie. Waar of onwaar?"),
    true,
    { hint: L("Can a square root ever come out negative?", "Kan 'n vierkantswortel ooit negatief uitkom?"), answerLabel: L("True: √x is never negative, so √x = −4 has no solution (not non-real: nothing negative is under the root).", "Waar: √x is nooit negatief nie, dus het √x = −4 geen oplossing nie (dit is nie nie-reëel nie: daar is niks negatiefs onder die wortel nie)."),
      solution: [
        { s: L("x^(1/2) means √x, and the 2 underneath is an EVEN root", "x^(1/2) beteken √x, en die 2 onder is 'n EWE wortel") },
        { s: L("Squaring any real number gives 0 or a positive answer, so no real number squares back to a negative", "Enige reële getal gekwadreer gee 0 of 'n positiewe antwoord, dus gee geen reële getal gekwadreer 'n negatiewe getal nie") },
        { s: L("∴ true: √x is never negative, so √x = −4 has no solution (not non-real: nothing negative is under the root)", "∴ waar: √x is nooit negatief nie, dus het √x = −4 geen oplossing nie (dit is nie nie-reëel nie: daar is niks negatiefs onder die wortel nie)"),
          r: L("an ODD root would be fine: ³√(−8) = −2", "'n ONEWE wortel sou in orde wees: ³√(−8) = −2") },
      ] }),
};

export const questEs7 = {
  id: "es7",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
