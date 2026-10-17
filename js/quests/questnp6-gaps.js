/* ============================================================
   NUMBER PATTERNS · Q6 — Gaps between consecutive terms
   ------------------------------------------------------------
   The first differences of a QUADRATIC pattern form their own
   ARITHMETIC pattern: first term = T₂ − T₁, common difference =
   the constant second difference. So "the gap between two terms"
   becomes a term of that linear gap-pattern.
       gap between Tₖ and Tₖ₊₁ = the kth term of the gap-pattern
   ============================================================ */
import { mc } from "./_shared.js";
import { pyramid, calcQ, PAT, ord, P } from "./_patterns.js";
import { randQuad, secondDiffs, firstDiffs, linStr, list, C, pick, randInt } from "../patternlib.js";
import { L } from "../lang.js";

const ACC = PAT[5];
const gapAt = (g1, sd, k) => g1 + (k - 1) * sd;     // kth term of the linear gap-pattern
/* The gap-pattern written HER way — Grade 11 uses Tₙ = an + c only (a = the
   constant difference, c = T₀ = T₁ − a), never a + (n−1)d. For the gaps that
   means a = the second difference and c = gap₀ = (first gap) − (second
   difference). Same number as gapAt above, reached the way she teaches it. */
const gapC0 = (g1, sd) => g1 - sd;
const gapForm = (g1, sd) => linStr(sd, gapC0(g1, sd));

const SKILLS = {
  /* the gap far along the pattern (must use the linear gap-rule, not extend the pyramid) */
  gapAtK: () => {
    const { seq } = randQuad();
    const g1 = firstDiffs(seq)[0], sd = secondDiffs(seq)[0];
    const k = pick([10, 12, 15, 18, 20]);
    return calcQ("patConsecDiff",
      L(`For the quadratic pattern <b>${list(seq)} ; …</b>, find the gap between T${C(k)} and T${C(k + 1)}, that is T${C(k + 1)} − T${C(k)}.`, `Vir die kwadratiese patroon <b>${list(seq)} ; …</b>: vind die gaping tussen T${C(k)} en T${C(k + 1)}, dit is T${C(k + 1)} − T${C(k)}.`),
      gapAt(g1, sd, k),
      { graph: pyramid(seq, { showFirst: true, showSecond: true, accent: ACC }),
        hint: L(`The gaps form a linear pattern: first gap = ${C(g1)}, changing by ${C(sd)} each time. Build gapₙ = an + c: a = ${C(sd)}, c = gap₀ = ${C(g1)} − ${P(sd)} = ${C(gapC0(g1, sd))}. Then put n = ${C(k)} in.`, `Die gapings vorm 'n lineêre patroon: eerste gaping = ${C(g1)}, en dit verander elke keer met ${C(sd)}. Bou gapingₙ = an + c: a = ${C(sd)}, c = gaping₀ = ${C(g1)} − ${P(sd)} = ${C(gapC0(g1, sd))}. Vervang dan n = ${C(k)}.`),
        answerLabel: L(`gapₙ = ${gapForm(g1, sd)}, so gap ${C(k)} = ${gapForm(g1, sd).replace("n", `(${C(k)})`)} = ${C(gapAt(g1, sd, k))}.`, `gapingₙ = ${gapForm(g1, sd)}, dus gaping ${C(k)} = ${gapForm(g1, sd).replace("n", `(${C(k)})`)} = ${C(gapAt(g1, sd, k))}.`),
        solution: [
          { s: L(`The gaps are ${list(firstDiffs(seq))} — an arithmetic pattern`, `Die gapings is ${list(firstDiffs(seq))}: 'n rekenkundige patroon`), r: L(`they change by ${C(sd)} each time`, `hulle verander elke keer met ${C(sd)}`) },
          { s: L(`a = ${C(sd)} and c = gap₀ = ${C(g1)} − ${P(sd)} = ${C(gapC0(g1, sd))}  →  gapₙ = ${gapForm(g1, sd)}`, `a = ${C(sd)} en c = gaping₀ = ${C(g1)} − ${P(sd)} = ${C(gapC0(g1, sd))}  →  gapingₙ = ${gapForm(g1, sd)}`), r: L("Tₙ = an + c", "Tₙ = an + c") },
          { s: L(`Gap ${C(k)} = ${gapForm(g1, sd).replace("n", `(${C(k)})`)} = ${C(gapAt(g1, sd, k))}`, `Gaping ${C(k)} = ${gapForm(g1, sd).replace("n", `(${C(k)})`)} = ${C(gapAt(g1, sd, k))}`), r: L(`the gap between T${C(k)} and T${C(k + 1)}`, `die gaping tussen T${C(k)} en T${C(k + 1)}`) },
        ] });
  },

  /* reverse: between which two terms is the gap equal to a given value? */
  whichGap: () => {
    const { seq } = randQuad();
    const g1 = firstDiffs(seq)[0], sd = secondDiffs(seq)[0];
    const n = pick([6, 7, 8, 9, 10, 11]);
    const value = gapAt(g1, sd, n);
    return calcQ("patConsecDiff",
      L(`For <b>${list(seq)} ; …</b>, the gap Tₙ₊₁ − Tₙ between two consecutive terms is ${C(value)}. Find n.`, `Vir <b>${list(seq)} ; …</b> is die gaping Tₙ₊₁ − Tₙ tussen twee opeenvolgende terme ${C(value)}. Vind n.`),
      n,
      { allowNeg: false,
        hint: L(`Build gapₙ = an + c first (a = ${C(sd)}, c = gap₀ = ${C(gapC0(g1, sd))}), then set it equal to ${C(value)} and solve for n.`, `Bou eers gapingₙ = an + c (a = ${C(sd)}, c = gaping₀ = ${C(gapC0(g1, sd))}), stel dit dan gelyk aan ${C(value)} en los op vir n.`),
        answerLabel: L(`n = ${C(n)} (the gap between T${C(n)} and T${C(n + 1)}).`, `n = ${C(n)} (die gaping tussen T${C(n)} en T${C(n + 1)}).`),
        solution: [
          { s: L(`The gaps are arithmetic: a = ${C(sd)}, c = gap₀ = ${C(g1)} − ${P(sd)} = ${C(gapC0(g1, sd))}`, `Die gapings is rekenkundig: a = ${C(sd)}, c = gaping₀ = ${C(g1)} − ${P(sd)} = ${C(gapC0(g1, sd))}`), r: L("Tₙ = an + c", "Tₙ = an + c") },
          { s: L(`gapₙ = ${gapForm(g1, sd)}, so set ${gapForm(g1, sd)} = ${C(value)}`, `gapingₙ = ${gapForm(g1, sd)}, stel dus ${gapForm(g1, sd)} = ${C(value)}`) },
          { s: L(`${C(sd)}n = ${C(value - gapC0(g1, sd))}  →  n = ${C(n)}`, `${C(sd)}n = ${C(value - gapC0(g1, sd))}  →  n = ${C(n)}`), r: L(`the gap between T${C(n)} and T${C(n + 1)}`, `die gaping tussen T${C(n)} en T${C(n + 1)}`) },
        ] });
  },

  /* what kind of pattern do the gaps form? */
  gapsAreLinear: () => {
    const { seq } = randQuad();
    const fd = firstDiffs(seq), sd = secondDiffs(seq)[0];
    return mc("patConsecDiff",
      L("The first differences (gaps) of a quadratic pattern form what kind of pattern?", "Watter soort patroon vorm die eerste verskille (gapings) van 'n kwadratiese patroon?"),
      L("an arithmetic (linear) pattern", "'n rekenkundige (lineêre) patroon"),
      [L("another quadratic pattern", "nog 'n kwadratiese patroon"), L("a geometric pattern", "'n meetkundige patroon"), L("a constant pattern", "'n konstante patroon")],
      { graph: pyramid(seq, { showFirst: true, accent: ACC }),
        hint: L("Look at the gaps (first-difference row): do they change by the same amount each time?", "Kyk na die gapings (die ry eerste verskille): verander hulle elke keer met dieselfde hoeveelheid?"),
        answerLabel: L("Arithmetic — the gaps change by the constant second difference each time.", "Rekenkundig: die gapings verander elke keer met die konstante tweede verskil."),
        solution: [
          { s: L(`The gaps of ${list(seq)} are ${list(fd)}`, `Die gapings van ${list(seq)} is ${list(fd)}`), r: L("first differences", "eerste verskille") },
          { s: L(`Each gap changes by ${C(sd)}`, `Elke gaping verander met ${C(sd)}`), r: L("a constant difference → arithmetic (linear)", "'n konstante verskil → rekenkundig (lineêr)") },
        ] });
  },

  /* the common difference of the gaps = the second difference */
  gapCommonDiff: () => {
    const { seq } = randQuad();
    const fd = firstDiffs(seq), sd = secondDiffs(seq)[0];
    return calcQ("patConsecDiff",
      L(`By how much does each gap change in <b>${list(seq)}</b>? (the common difference of the gap-pattern)`, `Met hoeveel verander elke gaping in <b>${list(seq)}</b>? (die konstante verskil van die gapingpatroon)`),
      sd,
      { graph: pyramid(seq, { showFirst: true, showSecond: true, blankSecond: true, accent: ACC }),
        hint: L("That is exactly the constant second difference.", "Dit is presies die konstante tweede verskil."),
        answerLabel: L(`The gaps change by ${C(sd)} each time (the second difference).`, `Die gapings verander elke keer met ${C(sd)} (die tweede verskil).`),
        solution: [
          { s: L(`The gaps are ${list(fd)}`, `Die gapings is ${list(fd)}`), r: L("first differences", "eerste verskille") },
          { s: `${C(fd[1])} − ${P(fd[0])} = ${C(sd)}`, r: L("that is the constant second difference", "dit is die konstante tweede verskil") },
        ] });
  },

  /* the indexing rule */
  indexRule: () => {
    const k = randInt(3, 7);
    return mc("patConsecDiff",
      L(`The gap between T${C(k)} and T${C(k + 1)} is which term of the gap-pattern?`, `Watter term van die gapingpatroon is die gaping tussen T${C(k)} en T${C(k + 1)}?`),
      L(`the ${ord(k)} term`, `die ${ord(k)} term`),
      [L(`the ${ord(k + 1)} term`, `die ${ord(k + 1)} term`), L(`the ${ord(k - 1)} term`, `die ${ord(k - 1)} term`), L("the 1st term", "die 1ste term")],
      { hint: L("The gap between Tₖ and Tₖ₊₁ is the kth gap.", "Die gaping tussen Tₖ en Tₖ₊₁ is die k-de gaping."),
        answerLabel: L(`The gap between T${C(k)} and T${C(k + 1)} is the ${ord(k)} term of the gap-pattern.`, `Die gaping tussen T${C(k)} en T${C(k + 1)} is die ${ord(k)} term van die gapingpatroon.`),
        solution: [
          { s: L(`Gap 1 sits between T₁ and T₂, gap 2 between T₂ and T₃, and so on`, `Gaping 1 staan tussen T₁ en T₂, gaping 2 tussen T₂ en T₃, ensovoorts`), r: L("a gap takes the number of the term on its LEFT", "'n gaping kry die nommer van die term LINKS daarvan") },
          { s: L(`So the gap between T${C(k)} and T${C(k + 1)} is gap ${C(k)} — the ${ord(k)} term`, `Dus is die gaping tussen T${C(k)} en T${C(k + 1)} gaping ${C(k)}: die ${ord(k)} term`) },
        ] });
  },
};

export const questNp6 = {
  id: "np6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "patConsecDiff", gen })),
};
