/* ============================================================
   TRIG QUEST 4 · Cosine rule — finding a SIDE   ★ DIAGRAM
   Two sides and the INCLUDED angle (SAS) → the third side.
   a² = b² + c² − 2bc·cosÂ
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri, cosineSideSetupStep, calcStep } from "./_trig.js";
import { cosineRuleSide, cosD, fix, randInt, pick } from "../triglib.js";
import { L } from "../lang.js";

const ACC = "#0d8fce";
const NOTE = "cosineRuleSide";

/* ------------------------------------------------------------
   AUDIT DAY 2026-08-30 — the two full calculations are STEP CHAINS
   now (build the substituted rule → x² → √), the round-2 treatment
   widened to the chapter: "split those intense questions up in
   smaller questions so the kids actually build the questions."
   Question, diagram and numbers unchanged; MCs untouched.
   ------------------------------------------------------------ */

/* SAS triangle: two sides b, c and the included angle Â between them.
   b ≠ c since the audit day — the two sides are chips on the build
   step, and two identical chips are confusing, not harder. */
function genSAS() {
  let b = 0, c = 0;
  do { b = randInt(6, 16); c = randInt(6, 16); } while (b === c);
  const A = randInt(35, 130);
  return placeTri({ sides: { b, c }, angles: { A } }, ["A", "B", "C"], randInt(-22, 22));
}

const SKILLS = {
  /* find the side opposite the given included angle */
  findSide: () => {
    const t = genSAS();
    const A = Math.round(t.angles.A), b = t.sides.b, c = t.sides.c;
    const x = cosineRuleSide(b, c, A);                  // side a, opposite Â
    return {
      type: "steps", concept: NOTE,
      prompt: L(`Use the cosine rule to find <b>x</b> (correct to 2 decimals).`, `Gebruik die cosinusreël om <b>x</b> te vind (korrek tot 2 desimale).`),
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle("A", `${A}°`)],
        sides: [t.side("A", "C", String(b)), t.side("A", "B", String(c)), t.side("B", "C", "x")] },
      steps: [
        cosineSideSetupStep("x", String(b), String(c), `${A}°`,
          L("The two sides you know fill the squares AND the 2·…·… product; the included angle rides with cos.", "Die twee sye wat jy ken, vul die kwadrate EN die 2·…·…-produk; die ingeslote hoek hoort by cos.")),
        calcStep(L("Work out <b>x²</b> first (2 decimals).", "Bereken eers <b>x²</b> (2 desimale)."), x * x,
          L(`x² = ${b}² + ${c}² − ${2 * b * c}·cos ${A}° — type the whole right-hand side in one go.`, `x² = ${b}² + ${c}² − ${2 * b * c}·cos ${A}°: tik die hele regterkant in een slag in.`),
          { dp: 2, tol: 0.05 }),
        calcStep(L("Now <b>x</b> (2 decimals).", "Nou <b>x</b> (2 desimale)."), x,
          L("x = √(that number). x² is not the answer yet.", "x = √(daardie getal). x² is nog nie die antwoord nie."), { dp: 2, tol: 0.015 }),
      ],
      expected: x, dp: 2, tol: 0.015,   // absorb the last-cent flip if a learner works with a 4-dp cosine
      hint: L("x is opposite the known angle. x² = b² + c² − 2bc·cos(angle).", "x is teenoor die bekende hoek. x² = b² + c² − 2bc·cos(hoek)."),
      answerLabel: L(`x = ${fix(x, 2)}`, `x = ${fix(x, 2)}`),
      solution: [
        { s: L(`x² = ${b}² + ${c}² − 2(${b})(${c})·cos ${A}°`, `x² = ${b}² + ${c}² − 2(${b})(${c})·cos ${A}°`), r: L("cosine rule", "cosinusreël") },
        { s: L(`x² = ${fix(b * b + c * c, 0)} − ${fix(2 * b * c, 0)}·cos ${A}° = ${fix(x * x, 2)}`, `x² = ${fix(b * b + c * c, 0)} − ${fix(2 * b * c, 0)}·cos ${A}° = ${fix(x * x, 2)}`) },
        { s: L(`x = ${fix(x, 2)}`, `x = ${fix(x, 2)}`), r: L("take the square root", "trek die vierkantswortel") },
      ],
    };
  },

  /* word version, no diagram — the sides come out of the sentence */
  wordSide: () => {
    let b = 0, c = 0;
    do { b = randInt(8, 18); c = randInt(8, 18); } while (b === c);   // distinct chips
    const A = randInt(40, 125);
    const a = cosineRuleSide(b, c, A);
    return {
      type: "steps", concept: NOTE,
      prompt: L(`In △ABC, b = ${b}, c = ${c} and Â = ${A}°. Calculate <b>a</b> (2 decimals).`, `In △ABC is b = ${b}, c = ${c} en Â = ${A}°. Bereken <b>a</b> (2 desimale).`),
      steps: [
        cosineSideSetupStep("a", String(b), String(c), `${A}°`,
          L(`Â sits between b and c, so a is opposite it — b and c fill the squares and the product.`, `Â lê tussen b en c, dus is a teenoor hom: b en c vul die kwadrate en die produk.`)),
        calcStep(L("Work out <b>a²</b> first (2 decimals).", "Bereken eers <b>a²</b> (2 desimale)."), a * a,
          L(`a² = ${b}² + ${c}² − ${2 * b * c}·cos ${A}° — the whole right-hand side in one go.`, `a² = ${b}² + ${c}² − ${2 * b * c}·cos ${A}°: die hele regterkant in een slag.`),
          { dp: 2, tol: 0.05 }),
        calcStep(L("Now <b>a</b> (2 decimals).", "Nou <b>a</b> (2 desimale)."), a,
          L("a = √(that number).", "a = √(daardie getal)."), { dp: 2, tol: 0.015 }),
      ],
      expected: a, dp: 2, tol: 0.015,
      hint: L("Â sits between b and c, so a is opposite it: a² = b² + c² − 2bc·cosÂ.", "Â lê tussen b en c, dus is a teenoor hom: a² = b² + c² − 2bc·cosÂ."),
      answerLabel: L(`a = ${fix(a, 2)}`, `a = ${fix(a, 2)}`),
      solution: [
        { s: L(`a² = ${b}² + ${c}² − 2(${b})(${c})·cos ${A}°`, `a² = ${b}² + ${c}² − 2(${b})(${c})·cos ${A}°`) },
        { s: L(`a² = ${fix(b * b + c * c - 2 * b * c * cosD(A), 2)}`, `a² = ${fix(b * b + c * c - 2 * b * c * cosD(A), 2)}`) },
        { s: L(`a = ${fix(a, 2)}`, `a = ${fix(a, 2)}`) },
      ],
    };
  },

  /* the included-angle idea */
  includedAngle: () => mc(NOTE,
    L("To use the cosine rule to find a side, the known angle must be…", "Om 'n sy met die cosinusreël te vind, moet die bekende hoek wees…"),
    L("between the two known sides (the included angle)", "tussen die twee bekende sye (die ingeslote hoek)"),
    [L("opposite a known side", "teenoor 'n bekende sy"), L("the biggest angle", "die grootste hoek"), L("any angle you like", "enige hoek wat jy wil")],
    { hint: L("The − 2bc·cosA term only works when A is the angle between b and c.", "Die − 2bc·cosA-term werk net as A die hoek tussen b en c is."),
      answerLabel: L("Cosine rule needs the INCLUDED angle — the one between the two known sides.", "Die cosinusreël het die INGESLOTE hoek nodig: die een tussen die twee bekende sye."),
      solution: [
        { s: L("Look at what the − 2bc·cosA term is made of: the two sides b and c, and the angle A", "Kyk waaruit die − 2bc·cosA-term bestaan: die twee sye b en c, en die hoek A") },
        { s: L("In the rule, b and c are the two arms that MEET at A", "In die reël is b en c die twee bene wat by A BYMEKAARKOM"), r: L("that is the only way the term is built", "net so word die term gebou") },
        { s: L("So the known angle has to sit between the two known sides", "Dus moet die bekende hoek tussen die twee bekende sye lê"), r: L("an angle somewhere else does not fit the formula", "'n hoek elders pas nie in die formule nie") },
      ] }),

  /* pick the correct formula for the labelled unknown */
  whichFormula: () => {
    const A = randInt(40, 120), b = randInt(6, 14), c = randInt(6, 14);
    return mc(NOTE,
      L(`x is opposite Â = ${A}°, with the two sides ${b} and ${c} meeting at Â. Which formula is correct?`, `x is teenoor Â = ${A}°, en die twee sye ${b} en ${c} kom by Â bymekaar. Watter formule is reg?`),
      L(`x² = ${b}² + ${c}² − 2(${b})(${c})·cos ${A}°`, `x² = ${b}² + ${c}² − 2(${b})(${c})·cos ${A}°`),
      [L(`x² = ${b}² + ${c}² + 2(${b})(${c})·cos ${A}°`, `x² = ${b}² + ${c}² + 2(${b})(${c})·cos ${A}°`),
       L(`x² = ${b}² − ${c}² − 2(${b})(${c})·cos ${A}°`, `x² = ${b}² − ${c}² − 2(${b})(${c})·cos ${A}°`),
       L(`x = ${b} + ${c} − 2(${b})(${c})·cos ${A}°`, `x = ${b} + ${c} − 2(${b})(${c})·cos ${A}°`)],
      { hint: L("Plus between the squares, MINUS in front of the 2bc term, and you square first (x², not x).", "Plus tussen die kwadrate, MINUS voor die 2bc-term, en jy kwadreer eers (x², nie x nie)."),
        answerLabel: L(`x² = ${b}² + ${c}² − 2(${b})(${c})·cos${A}° — sum of squares minus the 2bc·cos term.`, `x² = ${b}² + ${c}² − 2(${b})(${c})·cos${A}°: som van die kwadrate min die 2bc·cos-term.`),
        solution: [
          { s: L(`x is opposite Â, and the two sides ${b} and ${c} meet at Â`, `x is teenoor Â, en die twee sye ${b} en ${c} kom by Â bymekaar`), r: L("so x plays the part of a, and the sides are b and c", "dus speel x die rol van a, en die sye is b en c") },
          { s: L(`a² = b² + c² − 2bc·cosÂ`, `a² = b² + c² − 2bc·cosÂ`), r: L("write the rule before any numbers go in", "skryf die reël neer voordat enige getalle ingaan") },
          { s: L(`x² = ${b}² + ${c}² − 2(${b})(${c})·cos${A}°`, `x² = ${b}² + ${c}² − 2(${b})(${c})·cos${A}°`), r: L("plus between the squares, MINUS in front of the 2bc term", "plus tussen die kwadrate, MINUS voor die 2bc-term") },
        ] });
  },
};

export const questT4 = {
  id: "t4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: NOTE, gen })),
};
