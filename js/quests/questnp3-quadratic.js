/* ============================================================
   NUMBER PATTERNS · Q3 — Quadratic patterns
   ------------------------------------------------------------
   Constant SECOND difference. Build the pyramid, then work from the
   bottom up with the three relationships:
       2a = second difference
       3a + b = T₂ − T₁
       a + b + c = T₁
   to get Tₙ = an² + bn + c.
   ============================================================ */
import { mc } from "./_shared.js";
import { pyramid, calcQ, PAT, P } from "./_patterns.js";
import {
  randQuad, quadStr, secondDiffs, firstDiffs, quadTn, list, C, pick, randInt,
} from "../patternlib.js";
import { L } from "../lang.js";

const ACC = PAT[2];
const full = (seq) => pyramid(seq, { showFirst: true, showSecond: true, accent: ACC });

const SKILLS = {
  /* read the constant second difference */
  secondDiff: () => {
    const { seq } = randQuad();
    const fd = firstDiffs(seq), sd = secondDiffs(seq)[0];
    return calcQ("patQuadratic",
      L(`What is the constant second difference of <b>${list(seq)}</b>?`, `Wat is die konstante tweede verskil van <b>${list(seq)}</b>?`),
      sd,
      { graph: pyramid(seq, { showFirst: true, showSecond: true, blankSecond: true, accent: ACC }),
        hint: L("Take the differences of the first differences (bottom row of the pyramid).", "Kry die verskille van die eerste verskille (onderste ry van die piramide)."),
        answerLabel: L(`The second difference is ${C(sd)}.`, `Die tweede verskil is ${C(sd)}.`),
        solution: [
          { s: L(`First differences: ${list(fd)}`, `Eerste verskille: ${list(fd)}`), r: L("next − previous", "volgende − vorige") },
          { s: L(`Second differences: ${list(firstDiffs(fd))}`, `Tweede verskille: ${list(firstDiffs(fd))}`), r: L("differences of the differences", "verskille van die verskille") },
          { s: L(`They are all ${C(sd)}, so the second difference is ${C(sd)}`, `Hulle is almal ${C(sd)}, dus is die tweede verskil ${C(sd)}`) },
        ] });
  },

  /* a = (second difference) ÷ 2 */
  findA: () => {
    const { a, seq } = randQuad();
    return calcQ("patQuadratic",
      L(`For <b>${list(seq)}</b>, use 2a = second difference to find <b>a</b>.`, `Vir <b>${list(seq)}</b>: gebruik 2a = tweede verskil om <b>a</b> te vind.`),
      a,
      { graph: full(seq),
        hint: L("Read the second difference off the pyramid, then halve it.", "Lees die tweede verskil van die piramide af en halveer dit dan."),
        answerLabel: L(`2a = ${C(2 * a)}, so a = ${C(a)}.`, `2a = ${C(2 * a)}, dus a = ${C(a)}.`),
        solution: [
          { s: L(`Second difference = ${C(2 * a)}`, `Tweede verskil = ${C(2 * a)}`), r: L("bottom row of the pyramid", "onderste ry van die piramide") },
          { s: L(`2a = ${C(2 * a)}  →  a = ${C(a)}`, `2a = ${C(2 * a)}  →  a = ${C(a)}`), r: L("halve it", "halveer dit") },
        ] });
  },

  /* b from 3a + b = T₂ − T₁ */
  findB: () => {
    const { a, b, seq } = randQuad();
    const g1 = seq[1] - seq[0];
    return calcQ("patQuadratic",
      L(`For <b>${list(seq)}</b>, with a = ${C(a)}, use 3a + b = T₂ − T₁ to find <b>b</b>.`, `Vir <b>${list(seq)}</b>, met a = ${C(a)}: gebruik 3a + b = T₂ − T₁ om <b>b</b> te vind.`),
      b,
      { graph: full(seq),
        hint: L(`3a + b = T₂ − T₁. So b = (T₂ − T₁) − 3a = ${C(seq[1] - seq[0])} − 3(${C(a)}).`, `3a + b = T₂ − T₁. Dus b = (T₂ − T₁) − 3a = ${C(seq[1] - seq[0])} − 3(${C(a)}).`),
        answerLabel: L(`b = ${C(seq[1] - seq[0])} − ${P(3 * a)} = ${C(b)}.`, `b = ${C(seq[1] - seq[0])} − ${P(3 * a)} = ${C(b)}.`),
        solution: [
          { s: L(`T₂ − T₁ = ${C(seq[1])} − ${P(seq[0])} = ${C(g1)}`, `T₂ − T₁ = ${C(seq[1])} − ${P(seq[0])} = ${C(g1)}`), r: L("the first gap", "die eerste gaping") },
          { s: L(`3a + b = ${C(g1)}, with a = ${C(a)}:  ${C(3 * a)} + b = ${C(g1)}`, `3a + b = ${C(g1)}, met a = ${C(a)}:  ${C(3 * a)} + b = ${C(g1)}`) },
          { s: L(`b = ${C(g1)} − ${P(3 * a)} = ${C(b)}`, `b = ${C(g1)} − ${P(3 * a)} = ${C(b)}`) },
        ] });
  },

  /* c from a + b + c = T₁ */
  findC: () => {
    const { a, b, c, seq } = randQuad();
    return calcQ("patQuadratic",
      L(`For <b>${list(seq)}</b>, with a = ${C(a)} and b = ${C(b)}, use a + b + c = T₁ to find <b>c</b>.`, `Vir <b>${list(seq)}</b>, met a = ${C(a)} en b = ${C(b)}: gebruik a + b + c = T₁ om <b>c</b> te vind.`),
      c,
      { graph: full(seq),
        hint: L(`a + b + c = T₁. So c = T₁ − a − b = ${C(seq[0])} − (${C(a)}) − (${C(b)}).`, `a + b + c = T₁. Dus c = T₁ − a − b = ${C(seq[0])} − (${C(a)}) − (${C(b)}).`),
        answerLabel: L(`c = ${C(seq[0])} − ${P(a)} − ${P(b)} = ${C(c)}.`, `c = ${C(seq[0])} − ${P(a)} − ${P(b)} = ${C(c)}.`),
        solution: [
          { s: L(`a + b + c = T₁ = ${C(seq[0])}`, `a + b + c = T₁ = ${C(seq[0])}`), r: L("put n = 1 into an² + bn + c", "vervang n = 1 in an² + bn + c") },
          { s: L(`${P(a)} + ${P(b)} + c = ${C(seq[0])}`, `${P(a)} + ${P(b)} + c = ${C(seq[0])}`) },
          { s: L(`c = ${C(seq[0])} − ${P(a)} − ${P(b)} = ${C(c)}`, `c = ${C(seq[0])} − ${P(a)} − ${P(b)} = ${C(c)}`) },
        ] });
  },

  /* choose the general term */
  generalTerm: () => {
    const { a, b, c, seq } = randQuad();
    const correct = quadStr(a, b, c);
    const g1 = seq[1] - seq[0], sd = secondDiffs(seq)[0];
    // each decoy is a specific misconception; when b = 0 the sign-of-b decoy
    // collapses into the correct answer, so a fourth (c found without
    // subtracting a) keeps the count at 4 buttons.
    const wrongs = [quadStr(a, -b, c), quadStr(2 * a, b, c), quadStr(a, b + a, c), quadStr(a, b, c - a)]
      .filter((s) => s !== correct)
      .filter((s, i, arr) => arr.indexOf(s) === i)
      .slice(0, 3);
    return mc("patQuadratic",
      L(`Find the general term Tₙ of <b>${list(seq)}</b>.`, `Vind die algemene term Tₙ van <b>${list(seq)}</b>.`),
      correct, wrongs,
      { layout: "grid2", graph: full(seq),
        hint: L("Find a, then b, then c with the three relationships, and write an² + bn + c.", "Vind a, dan b, dan c met die drie verbande, en skryf an² + bn + c."),
        answerLabel: L(`Tₙ = ${correct}.`, `Tₙ = ${correct}.`),
        solution: [
          { s: L(`2a = second difference = ${C(sd)}  →  a = ${C(a)}`, `2a = tweede verskil = ${C(sd)}  →  a = ${C(a)}`) },
          { s: L(`3a + b = T₂ − T₁ = ${C(g1)}  →  b = ${C(g1)} − ${P(3 * a)} = ${C(b)}`, `3a + b = T₂ − T₁ = ${C(g1)}  →  b = ${C(g1)} − ${P(3 * a)} = ${C(b)}`) },
          { s: L(`a + b + c = T₁ = ${C(seq[0])}  →  c = ${C(seq[0])} − ${P(a)} − ${P(b)} = ${C(c)}`, `a + b + c = T₁ = ${C(seq[0])}  →  c = ${C(seq[0])} − ${P(a)} − ${P(b)} = ${C(c)}`) },
          { s: L(`Tₙ = ${correct}`, `Tₙ = ${correct}`), r: L("an² + bn + c", "an² + bn + c") },
        ] });
  },

  /* substitute into a given formula */
  fromFormula: () => {
    const a = pick([1, 2, -1, -2, 3]);
    const b = randInt(-5, 5), c = randInt(-4, 6);
    const n = pick([5, 6, 7, 8, 10]);
    const term = (v) => (v < 0 ? ` − ${C(Math.abs(v))}` : ` + ${C(v)}`);
    const parts = `${C(a * n * n)}${b ? term(b * n) : ""}${c ? term(c) : ""}`;
    return calcQ("patQuadratic",
      L(`A pattern has Tₙ = <b>${quadStr(a, b, c)}</b>. Find T${C(n)}.`, `'n Patroon het Tₙ = <b>${quadStr(a, b, c)}</b>. Vind T${C(n)}.`),
      quadTn(a, b, c)(n),
      { hint: L(`Substitute n = ${C(n)} (square it first): a(${C(n)})² + b(${C(n)}) + c.`, `Vervang n = ${C(n)} (kwadreer dit eers): a(${C(n)})² + b(${C(n)}) + c.`),
        answerLabel: L(`T${C(n)} = ${C(quadTn(a, b, c)(n))}.`, `T${C(n)} = ${C(quadTn(a, b, c)(n))}.`),
        solution: [
          { s: L(`T${C(n)} = ${quadStr(a, b, c, `(${C(n)})`)}`, `T${C(n)} = ${quadStr(a, b, c, `(${C(n)})`)}`), r: L(`put n = ${C(n)} in`, `vervang n = ${C(n)}`) },
          { s: L(`T${C(n)} = ${parts} = ${C(quadTn(a, b, c)(n))}`, `T${C(n)} = ${parts} = ${C(quadTn(a, b, c)(n))}`), r: L("square first, then multiply", "kwadreer eers, vermenigvuldig dan") },
        ] });
  },
};

export const questNp3 = {
  id: "np3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "patQuadratic", gen })),
};
