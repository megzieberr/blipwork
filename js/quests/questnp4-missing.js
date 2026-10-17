/* ============================================================
   NUMBER PATTERNS · Q4 — Find a missing term
   ------------------------------------------------------------
   In a quadratic pattern the SECOND difference is constant. That
   single fact lets you fill in an unknown term: write the first
   differences, set the two second differences equal, and solve.
   ============================================================ */
import { mc } from "./_shared.js";
import { pyramid, calcQ, yesnoQ, PAT, P } from "./_patterns.js";
import { randQuad, secondDiffs, quadSeq, list, C, pick, randInt } from "../patternlib.js";
import { L } from "../lang.js";

const ACC = PAT[3];

/* a quadratic sequence with ONE interior term hidden (shown as x) */
function withHidden(len) {
  const { a, b, c } = randQuad({ len });
  const seq = quadSeq(a, b, c, len);
  const hide = randInt(1, len - 2);             // interior index (keep both ends visible)
  const terms = seq.map((v, i) => (i === hide ? null : v));
  const labels = seq.map((v, i) => (i === hide ? "x" : null));
  return { seq, terms, labels, hide, answer: seq[hide] };
}

/* the full worked steps: gaps (some holding x), the equal-second-differences
   equation, then the solved linear equation. Everything is derived from the
   displayed terms, never hand-typed. */
function missingSolution(terms, seq, answer) {
  const dE = [];                                          // gap strings
  const dV = (i, x) => (terms[i + 1] ?? x) - (terms[i] ?? x);   // gap values with x plugged in
  for (let i = 0; i < terms.length - 1; i++) {
    if (terms[i] == null) dE.push(`${C(terms[i + 1])} − x`);
    else if (terms[i + 1] == null) dE.push(`x − ${P(terms[i])}`);
    else dE.push(C(terms[i + 1] - terms[i]));
  }
  // (d₂ − d₁) = (d₃ − d₂)  is linear in x: coeff·x = rhs
  const g = (x) => (dV(1, x) - dV(0, x)) - (dV(2, x) - dV(1, x));
  let coeff = g(1) - g(0), rhs = -g(0);
  if (coeff < 0) { coeff = -coeff; rhs = -rhs; }
  const solve = coeff === 1 ? L(`x = ${C(answer)}`, `x = ${C(answer)}`) : L(`${C(coeff)}x = ${C(rhs)}  →  x = ${C(answer)}`, `${C(coeff)}x = ${C(rhs)}  →  x = ${C(answer)}`);
  return [
    { s: L(`First differences: ${dE.join(" ; ")}`, `Eerste verskille: ${dE.join(" ; ")}`), r: L("some gaps contain x", "sommige gapings bevat x") },
    { s: L(`Second differences are equal: (${dE[1]}) − (${dE[0]}) = (${dE[2]}) − (${dE[1]})`, `Die tweede verskille is gelyk: (${dE[1]}) − (${dE[0]}) = (${dE[2]}) − (${dE[1]})`) },
    { s: solve, r: L(`full pattern: ${list(seq)}`, `volledige patroon: ${list(seq)}`) },
  ];
}

const SKILLS = {
  /* find the missing term — 4 terms */
  missing4: () => {
    const { seq, terms, labels, hide, answer } = withHidden(4);
    return calcQ("patQuadUnknown",
      L(`This is a <b>quadratic</b> pattern. Find the missing term <b>x</b>.`, `Dit is 'n <b>kwadratiese</b> patroon. Vind die ontbrekende term <b>x</b>.`),
      answer,
      { graph: pyramid(terms, { termLabels: labels, accent: ACC }),
        graphCap: L("second difference is constant", "tweede verskil is konstant"),
        hint: L("Write the first differences (some contain x), then set the two second differences EQUAL and solve for x.", "Skryf die eerste verskille neer (sommige bevat x), stel dan die twee tweede verskille GELYK en los op vir x."),
        answerLabel: L(`Keeping the second difference constant gives x = ${C(answer)} (full pattern: ${list(seq)}).`, `As die tweede verskil konstant bly, is x = ${C(answer)} (volledige patroon: ${list(seq)}).`),
        solution: missingSolution(terms, seq, answer) });
  },

  /* find the missing term — 5 terms */
  missing5: () => {
    const { seq, terms, labels, hide, answer } = withHidden(5);
    return calcQ("patQuadUnknown",
      L(`This is a <b>quadratic</b> pattern. Find the missing term <b>x</b>.`, `Dit is 'n <b>kwadratiese</b> patroon. Vind die ontbrekende term <b>x</b>.`),
      answer,
      { graph: pyramid(terms, { termLabels: labels, accent: ACC }),
        graphCap: L("second difference is constant", "tweede verskil is konstant"),
        hint: L("Form the first differences around x, then make the two second differences equal.", "Vorm die eerste verskille rondom x en maak dan die twee tweede verskille gelyk."),
        answerLabel: L(`x = ${C(answer)}  (full pattern: ${list(seq)}).`, `x = ${C(answer)}  (volledige patroon: ${list(seq)}).`),
        solution: missingSolution(terms, seq, answer) });
  },

  /* forward use: given T₁, T₂ and the constant second difference, find T₃ */
  forwardFromSecond: () => {
    const a = pick([1, 2, -1, -2, 3]);
    const sd = 2 * a;
    const b = randInt(-4, 4), c = randInt(-3, 6);
    const seq = quadSeq(a, b, c, 4);
    const t1 = seq[0], t2 = seq[1];
    return calcQ("patQuadUnknown",
      L(`A quadratic pattern starts T₁ = ${C(t1)}, T₂ = ${C(t2)}, and its constant second difference is ${C(sd)}. Find T₃.`, `'n Kwadratiese patroon begin met T₁ = ${C(t1)}, T₂ = ${C(t2)}, en sy konstante tweede verskil is ${C(sd)}. Vind T₃.`),
      seq[2],
      { hint: L(`Next first difference = (T₂ − T₁) + second difference = ${C(t2 - t1)} + ${P(sd)}. Add that to T₂.`, `Volgende eerste verskil = (T₂ − T₁) + tweede verskil = ${C(t2 - t1)} + ${P(sd)}. Tel dit by T₂.`),
        answerLabel: L(`T₃ = ${C(t2)} + (${C(t2 - t1)} + ${P(sd)}) = ${C(seq[2])}.`, `T₃ = ${C(t2)} + (${C(t2 - t1)} + ${P(sd)}) = ${C(seq[2])}.`),
        solution: [
          { s: L(`First gap: T₂ − T₁ = ${C(t2)} − ${P(t1)} = ${C(t2 - t1)}`, `Eerste gaping: T₂ − T₁ = ${C(t2)} − ${P(t1)} = ${C(t2 - t1)}`) },
          { s: L(`Next gap = first gap + second difference = ${C(t2 - t1)} + ${P(sd)} = ${C(t2 - t1 + sd)}`, `Volgende gaping = eerste gaping + tweede verskil = ${C(t2 - t1)} + ${P(sd)} = ${C(t2 - t1 + sd)}`), r: L("the second difference is constant", "die tweede verskil is konstant") },
          { s: L(`T₃ = T₂ + next gap = ${C(t2)} + ${P(t2 - t1 + sd)} = ${C(seq[2])}`, `T₃ = T₂ + volgende gaping = ${C(t2)} + ${P(t2 - t1 + sd)} = ${C(seq[2])}`) },
        ] });
  },

  /* which difference do you keep constant? */
  methodMC: () => {
    return mc("patQuadUnknown",
      L("To find a missing term in a quadratic pattern, which value do you keep constant?", "Watter waarde hou jy konstant om 'n ontbrekende term in 'n kwadratiese patroon te vind?"),
      L("the second difference", "die tweede verskil"),
      [L("the first difference", "die eerste verskil"), L("the ratio between terms", "die verhouding tussen terme"), L("the term values", "die termwaardes")],
      { hint: L("Quadratic ⇒ the SECOND difference is the same throughout.", "Kwadraties ⇒ die TWEEDE verskil bly deurgaans dieselfde."),
        answerLabel: L("Keep the second difference constant.", "Hou die tweede verskil konstant.") });
  },

  /* is the second difference always constant? */
  constYesno: () => {
    return yesnoQ("patQuadUnknown",
      L("In a quadratic number pattern, are the second differences always equal to each other?", "Is die tweede verskille in 'n kwadratiese getalpatroon altyd gelyk aan mekaar?"),
      true,
      { hint: L("That constant second difference is exactly what makes a pattern quadratic.", "Dié konstante tweede verskil is presies wat 'n patroon kwadraties maak."),
        answerLabel: L("Yes — a constant second difference is the defining feature.", "Ja: 'n konstante tweede verskil is die bepalende kenmerk.") });
  },
};

export const questNp4 = {
  id: "np4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "patQuadUnknown", gen })),
};
