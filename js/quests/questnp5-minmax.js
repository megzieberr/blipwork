/* ============================================================
   NUMBER PATTERNS · Q5 — Minimum & maximum
   ------------------------------------------------------------
   A quadratic pattern lies on a parabola, so it has a turning
   point — the smallest or largest term. The sign of a decides
   which: a > 0 → minimum, a < 0 → maximum. The extreme term is
   at n = −b/(2a); its value is Tₙ at that n.
   ============================================================ */
import { mc } from "./_shared.js";
import { calcQ, termParabola, PAT, toSub, ord, P } from "./_patterns.js";
import { randQuadExtreme, quadStr, quadTn, extremeKind, C, pick, randInt } from "../patternlib.js";
import { L } from "../lang.js";

const ACC = PAT[4];

/* for the graph READ-OFF skills: a small, countable parabola — |a| = 1, the
   turning term early, and the turning value a small integer, so the learner
   can count grid squares from the axes to answer. */
function readableExtreme() {
  const a = pick([1, -1]);
  const k = randInt(2, 4);                       // turning term number
  const b = -2 * a * k;
  const value = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
  const c = value + a * k * k;                   // forces Tₖ = value
  return { a, b, c, k, value, len: k + 3 };
}

const SKILLS = {
  /* minimum or maximum? (from the sign of a) */
  minOrMax: () => {
    const { a, b, c, kind } = randQuadExtreme();
    return mc("patMinMax",
      L(`The pattern Tₙ = <b>${quadStr(a, b, c)}</b> has a turning point. Is it a minimum or a maximum?`, `Die patroon Tₙ = <b>${quadStr(a, b, c)}</b> het 'n draaipunt. Is dit 'n minimum of 'n maksimum?`),
      kind === "minimum" ? L("a minimum", "'n minimum") : L("a maximum", "'n maksimum"),
      [kind === "minimum" ? L("a maximum", "'n maksimum") : L("a minimum", "'n minimum"), L("neither — it keeps rising", "nie een nie: dit bly styg"), L("both", "albei")],
      { hint: L("a > 0 → ‘happy’ parabola → minimum.  a < 0 → ‘sad’ parabola → maximum.", "a > 0 → ‘happy’ parabool → minimum.  a < 0 → ‘sad’ parabool → maksimum."),
        answerLabel: L(`a = ${C(a)} ${a > 0 ? "> 0 → minimum" : "< 0 → maximum"}.`, `a = ${C(a)} ${a > 0 ? "is positief → minimum" : "is negatief → maksimum"}.`),
        solution: [
          { s: L(`The coefficient of n² is a = ${C(a)}`, `Die koëffisiënt van n² is a = ${C(a)}`), r: L("look at the n² term only", "kyk net na die n²-term") },
          { s: a > 0
              ? L(`a = ${C(a)} > 0 → the parabola opens upward`, `a = ${C(a)} is positief → die parabool open opwaarts`)
              : L(`a = ${C(a)} < 0 → the parabola opens downward`, `a = ${C(a)} is negatief → die parabool open afwaarts`),
            r: a > 0 ? L("lowest point → a minimum", "laagste punt → 'n minimum") : L("highest point → a maximum", "hoogste punt → 'n maksimum") },
        ] });
  },

  /* which term is the extreme (n = −b/2a) */
  whichTerm: () => {
    const { a, b, c, k } = randQuadExtreme();
    return calcQ("patMinMax",
      L(`For Tₙ = <b>${quadStr(a, b, c)}</b>, which term n is the turning point? Use n = −b ÷ (2a).`, `Vir Tₙ = <b>${quadStr(a, b, c)}</b>: watter term n is die draaipunt? Gebruik n = −b ÷ (2a).`),
      k,
      { allowNeg: false,
        hint: L(`n = −b ÷ (2a) = −(${C(b)}) ÷ (2 × ${C(a)}).`, `n = −b ÷ (2a) = −(${C(b)}) ÷ (2 × ${C(a)}).`),
        answerLabel: L(`n = ${C(-b)} ÷ ${P(2 * a)} = ${C(k)} — the ${ord(k)} term.`, `n = ${C(-b)} ÷ ${P(2 * a)} = ${C(k)}: die ${ord(k)} term.`),
        solution: [
          { s: L(`a = ${C(a)} and b = ${C(b)}`, `a = ${C(a)} en b = ${C(b)}`), r: L("read them off Tₙ = an² + bn + c", "lees hulle af uit Tₙ = an² + bn + c") },
          { s: L(`n = −b ÷ (2a) = ${C(-b)} ÷ ${P(2 * a)} = ${C(k)}`, `n = −b ÷ (2a) = ${C(-b)} ÷ ${P(2 * a)} = ${C(k)}`), r: L(`the ${ord(k)} term`, `die ${ord(k)} term`) },
        ] });
  },

  /* the turning point is NOT a whole number → nearest whole term */
  nearestTerm: () => {
    const a = pick([2, -2]);                     // |a| = 2 + odd b → n turns at k ± 0,25 (never a tie)
    const k = randInt(2, 5);                     // the nearest whole term
    const nStar = k + pick([0.25, -0.25]);
    const b = -2 * a * nStar;                    // integer because a = ±2
    const c = randInt(-4, 8);
    const kind = extremeKind(a);
    return calcQ("patMinMax",
      L(`For Tₙ = <b>${quadStr(a, b, c)}</b>, which term n has the ${kind} value? (n must be a whole number.)`, `Vir Tₙ = <b>${quadStr(a, b, c)}</b>: watter term n het die ${kind}waarde? (n moet 'n heelgetal wees.)`),
      k,
      { allowNeg: false,
        hint: L("Work out n = −b ÷ (2a). It is NOT a whole number — a term number must be, so take the nearest whole n.", "Werk n = −b ÷ (2a) uit. Dit is NIE 'n heelgetal nie, maar 'n termnommer moet een wees: neem dus die naaste heelgetal vir n."),
        answerLabel: L(`n = ${C(-b)} ÷ ${P(2 * a)} = ${C(nStar)} — not a whole number, so the ${kind} term is the nearest: n = ${C(k)}.`, `n = ${C(-b)} ÷ ${P(2 * a)} = ${C(nStar)}: nie 'n heelgetal nie, dus is die ${kind}term die naaste een: n = ${C(k)}.`),
        solution: [
          { s: L(`n = −b ÷ (2a) = ${C(-b)} ÷ ${P(2 * a)} = ${C(nStar)}`, `n = −b ÷ (2a) = ${C(-b)} ÷ ${P(2 * a)} = ${C(nStar)}`) },
          { s: L(`A term number must be a natural number → nearest whole n = ${C(k)}`, `'n Termnommer moet 'n natuurlike getal wees → naaste heelgetal n = ${C(k)}`), r: L(`T${toSub(k)} = ${C(quadTn(a, b, c)(k))} is the ${kind} term`, `T${toSub(k)} = ${C(quadTn(a, b, c)(k))} is die ${kind}term`) },
        ] });
  },

  /* the extreme value (substitute n = k) */
  extremeValue: () => {
    const { a, b, c, k, value, kind } = randQuadExtreme();
    return calcQ("patMinMax",
      L(`The pattern Tₙ = <b>${quadStr(a, b, c)}</b> turns at n = ${C(k)}. What is its ${kind} value?`, `Die patroon Tₙ = <b>${quadStr(a, b, c)}</b> draai by n = ${C(k)}. Wat is sy ${kind}waarde?`),
      value,
      { hint: L(`Substitute n = ${C(k)} into the formula.`, `Vervang n = ${C(k)} in die formule.`),
        answerLabel: L(`T${toSub(k)} = ${C(value)} — the ${kind} value.`, `T${toSub(k)} = ${C(value)}: die ${kind}waarde.`),
        solution: [
          { s: L(`T${toSub(k)} = ${quadStr(a, b, c, `(${C(k)})`)}`, `T${toSub(k)} = ${quadStr(a, b, c, `(${C(k)})`)}`), r: L(`substitute the turning term n = ${C(k)}`, `vervang die term by die draaipunt, n = ${C(k)}`) },
          { s: L(`T${toSub(k)} = ${C(value)} — the ${kind} value`, `T${toSub(k)} = ${C(value)}: die ${kind}waarde`) },
        ] });
  },

  /* read the extreme term-number off the graph */
  readWhichTerm: () => {
    const { a, b, c, k, value, len } = readableExtreme();
    return calcQ("patMinMax",
      L(`The graph shows the terms of a pattern. At which term number n is the turning point?`, `Die grafiek wys die terme van 'n patroon. By watter termnommer n is die draaipunt?`),
      k,
      { allowNeg: false,
        graph: termParabola(a, b, c, k, value, len, ACC, ""),   // no T₍k₎ label: that IS the answer
        graphCap: L("Tₙ plotted against n · each grid block is 1", "Tₙ teen n gestip · elke blokkie is 1"),
        hint: L("Follow the dashed line from the turning point down to the horizontal axis and count the blocks from 0.", "Volg die stippellyn van die draaipunt af tot by die horisontale as en tel die blokkies vanaf 0."),
        answerLabel: L(`The turning point is at n = ${C(k)}.`, `Die draaipunt is by n = ${C(k)}.`),
        solution: [
          { s: L(`The turning point is the ${a > 0 ? "lowest" : "highest"} point of the curve`, `Die draaipunt is die ${a > 0 ? "laagste" : "hoogste"} punt van die kurwe`), r: L("where the pattern turns around", "waar die patroon omdraai") },
          { s: L(`Follow it straight down to the n-axis and count the blocks from 0:  n = ${C(k)}`, `Volg dit reguit af na die n-as en tel die blokkies vanaf 0:  n = ${C(k)}`) },
        ] });
  },

  /* read the extreme value off the graph */
  readValue: () => {
    const { a, b, c, k, value, len } = readableExtreme();
    return calcQ("patMinMax",
      L(`The graph shows the terms of a pattern. What is the value of the turning point?`, `Die grafiek wys die terme van 'n patroon. Wat is die waarde van die draaipunt?`),
      value,
      { graph: termParabola(a, b, c, k, value, len, ACC),
        graphCap: L("Tₙ plotted against n · each grid block is 1", "Tₙ teen n gestip · elke blokkie is 1"),
        hint: L("Count the grid blocks from the horizontal axis (each block is 1) up or down to the turning point.", "Tel die blokkies van die horisontale as (elke blokkie is 1) op of af tot by die draaipunt."),
        answerLabel: L(`The turning point value is ${C(value)}.`, `Die waarde van die draaipunt is ${C(value)}.`),
        solution: [
          { s: L(`The turning point is the ${a > 0 ? "lowest" : "highest"} point of the curve`, `Die draaipunt is die ${a > 0 ? "laagste" : "hoogste"} punt van die kurwe`), r: L("where the pattern turns around", "waar die patroon omdraai") },
          { s: L(`Count the blocks from the n-axis ${value < 0 ? "down" : "up"} to it (each block is 1):  Tₙ = ${C(value)}`, `Tel die blokkies van die n-as ${value < 0 ? "afwaarts" : "opwaarts"} tot by die punt (elke blokkie is 1):  Tₙ = ${C(value)}`) },
        ] });
  },

  /* the sign condition */
  signMC: () => {
    return mc("patMinMax",
      L("A number pattern has a <b>minimum</b> term when…", "'n Getalpatroon het 'n <b>minimum</b>-term wanneer…"),
      L("a > 0 (the coefficient of n² is positive)", "a > 0 (die koëffisiënt van n² is positief)"),
      [L("a < 0 (the coefficient of n² is negative)", "a < 0 (die koëffisiënt van n² is negatief)"), L("b > 0", "b > 0"), L("c > 0", "c > 0")],
      { hint: L("Same rule as a parabola: a positive ‘opens up’, so the turning point is the lowest point.", "Dieselfde reël as by 'n parabool: as a positief is, ‘open dit op’, dus is die draaipunt die laagste punt."),
        answerLabel: L("When a > 0 (positive n² coefficient) the turning point is a minimum.", "As a > 0 (positiewe n²-koëffisiënt), is die draaipunt 'n minimum.") });
  },
};

export const questNp5 = {
  id: "np5",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "patMinMax", gen })),
};
