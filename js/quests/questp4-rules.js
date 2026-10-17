/* ============================================================
   PROBABILITY QUEST 4 · The probability rules
   Addition rule, complement rule, mutually exclusive vs inclusive,
   exhaustive. Probabilities are built from counts over a total so
   every decimal answer is exact.
   ============================================================ */
import { mc } from "./_shared.js";
import { pick, randInt } from "../ui.js";
import { dec } from "../problib.js";
import { L } from "../lang.js";

const RULE = "addRule";
const MUT = "mutual";

/* a two-event probability scenario from counts over a total T (exact decimals).
   excl=true forces no overlap (mutually exclusive). */
function probs(excl = false) {
  for (let t = 0; t < 80; t++) {
    const T = pick([10, 20]);
    const i = excl ? 0 : randInt(1, 4);
    const onlyA = randInt(1, 5), onlyB = randInt(1, 5);
    if (onlyA + i + onlyB <= T - 1) {
      const a = onlyA + i, b = onlyB + i;
      return { T, i, onlyA, onlyB, a, b,
        pA: a / T, pB: b / T, pAB: i / T, pUnion: (onlyA + i + onlyB) / T };
    }
  }
  return { T: 20, i: 2, onlyA: 4, onlyB: 5, a: 6, b: 7, pA: 6 / 20, pB: 7 / 20, pAB: 2 / 20, pUnion: 11 / 20 };
}

const SKILLS = {
  addUnion: () => {
    const s = probs();
    return {
      type: "calc", concept: RULE, dp: 2,
      prompt: L(`Given P(A) = <b>${dec(s.pA)}</b>, P(B) = <b>${dec(s.pB)}</b> and P(A ∩ B) = <b>${dec(s.pAB)}</b>, find <b>P(A ∪ B)</b>.`, `Gegee P(A) = <b>${dec(s.pA)}</b>, P(B) = <b>${dec(s.pB)}</b> en P(A ∩ B) = <b>${dec(s.pAB)}</b>, vind <b>P(A ∪ B)</b>.`),
      expected: s.pUnion,
      hint: L("P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Subtract the overlap once.", "P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Trek die oorvleueling een keer af."),
      answerLabel: `${dec(s.pA)} + ${dec(s.pB)} − ${dec(s.pAB)} = ${dec(s.pUnion, 2)}`,
      solution: [{ s: L(`P(A ∪ B) = P(A) + P(B) − P(A ∩ B)`, `P(A ∪ B) = P(A) + P(B) − P(A ∩ B)`) }, { s: `= ${dec(s.pA)} + ${dec(s.pB)} − ${dec(s.pAB)} = ${dec(s.pUnion, 2)}` }],
    };
  },

  addFindInter: () => {
    const s = probs();
    return {
      type: "calc", concept: RULE, dp: 2,
      prompt: L(`Given P(A) = <b>${dec(s.pA)}</b>, P(B) = <b>${dec(s.pB)}</b> and P(A ∪ B) = <b>${dec(s.pUnion)}</b>, find <b>P(A ∩ B)</b>.`, `Gegee P(A) = <b>${dec(s.pA)}</b>, P(B) = <b>${dec(s.pB)}</b> en P(A ∪ B) = <b>${dec(s.pUnion)}</b>, vind <b>P(A ∩ B)</b>.`),
      expected: s.pAB,
      hint: L("Rearrange the addition rule: P(A ∩ B) = P(A) + P(B) − P(A ∪ B).", "Herrangskik die optelreël: P(A ∩ B) = P(A) + P(B) − P(A ∪ B)."),
      answerLabel: `${dec(s.pA)} + ${dec(s.pB)} − ${dec(s.pUnion)} = ${dec(s.pAB, 2)}`,
      solution: [{ s: L(`P(A ∩ B) = P(A) + P(B) − P(A ∪ B)`, `P(A ∩ B) = P(A) + P(B) − P(A ∪ B)`) }, { s: `= ${dec(s.pA)} + ${dec(s.pB)} − ${dec(s.pUnion)} = ${dec(s.pAB, 2)}` }],
    };
  },

  complement: () => {
    const s = probs();
    return {
      type: "calc", concept: MUT, dp: 2,
      prompt: L(`Event B is the complement of A. If P(A) = <b>${dec(s.pA)}</b>, find <b>P(B)</b>.`, `Gebeurtenis B is die komplement van A. As P(A) = <b>${dec(s.pA)}</b>, vind <b>P(B)</b>.`),
      expected: 1 - s.pA,
      hint: L("Complements add to 1: P(B) = 1 − P(A).", "Komplemente tel op tot 1: P(B) = 1 − P(A)."),
      answerLabel: `1 − ${dec(s.pA)} = ${dec(1 - s.pA, 2)}`,
      solution: [{ s: L(`P(A) + P(A′) = 1 → P(B) = 1 − ${dec(s.pA)} = ${dec(1 - s.pA, 2)}`, `P(A) + P(A′) = 1 → P(B) = 1 − ${dec(s.pA)} = ${dec(1 - s.pA, 2)}`) }],
    };
  },

  mutExUnion: () => {
    const s = probs(true);                 // no overlap
    return {
      type: "calc", concept: MUT, dp: 2,
      prompt: L(`A and B are <b>mutually exclusive</b>. If P(A) = <b>${dec(s.pA)}</b> and P(B) = <b>${dec(s.pB)}</b>, find <b>P(A ∪ B)</b>.`, `A en B is <b>onderling uitsluitend</b>. As P(A) = <b>${dec(s.pA)}</b> en P(B) = <b>${dec(s.pB)}</b>, vind <b>P(A ∪ B)</b>.`),
      expected: s.pUnion,
      hint: L("Mutually exclusive → P(A ∩ B) = 0, so P(A ∪ B) = P(A) + P(B).", "Onderling uitsluitend → P(A ∩ B) = 0, dus P(A ∪ B) = P(A) + P(B)."),
      answerLabel: `${dec(s.pA)} + ${dec(s.pB)} = ${dec(s.pUnion, 2)}`,
      solution: [{ s: L(`No overlap → P(A ∪ B) = P(A) + P(B) = ${dec(s.pA)} + ${dec(s.pB)} = ${dec(s.pUnion, 2)}`, `Geen oorvleueling → P(A ∪ B) = P(A) + P(B) = ${dec(s.pA)} + ${dec(s.pB)} = ${dec(s.pUnion, 2)}`) }],
    };
  },

  classifyByOverlap: () => {
    const excl = pick([true, false]);
    const s = probs(excl);
    return mc(MUT,
      L(`Two events have P(A ∩ B) = <b>${dec(s.pAB)}</b>. Are they mutually exclusive or mutually inclusive?`, `Twee gebeurtenisse het P(A ∩ B) = <b>${dec(s.pAB)}</b>. Is hulle onderling uitsluitend of onderling inklusief?`),
      excl ? L("mutually exclusive", "onderling uitsluitend") : L("mutually inclusive", "onderling inklusief"),
      excl ? [L("mutually inclusive", "onderling inklusief"), L("independent", "onafhanklik"), L("complementary", "komplementêr")] : [L("mutually exclusive", "onderling uitsluitend"), L("complementary", "komplementêr"), L("exhaustive", "uitputtend")],
      { hint: L("Overlap of 0 → exclusive (can't happen together). Overlap ≠ 0 → inclusive.", "Oorvleueling van 0 → uitsluitend (kan nie saam gebeur nie). Oorvleueling ≠ 0 → inklusief."),
        answerLabel: excl ? L("P(A ∩ B) = 0 → mutually exclusive.", "P(A ∩ B) = 0 → onderling uitsluitend.") : L("P(A ∩ B) ≠ 0 → mutually inclusive.", "P(A ∩ B) ≠ 0 → onderling inklusief.") });
  },

  exclusiveFromVenn: () => {
    const excl = pick([true, false]);
    const onlyA = randInt(2, 6), onlyB = randInt(2, 6), inter = excl ? 0 : randInt(1, 4), outside = randInt(1, 3);
    const graph = { type: "venn", mode: "two", A: "A", B: "B", s: `n(S) = ${onlyA + inter + onlyB + outside}`,
      regions: { onlyA: String(onlyA), inter: String(inter), onlyB: String(onlyB), outside: String(outside) } };
    return {
      type: "yesno", concept: MUT,
      prompt: L(`The Venn diagram shows the counts in each region. Are A and B <b>mutually exclusive</b>?`, `Die Venn-diagram wys die aantal in elke gebied. Is A en B <b>onderling uitsluitend</b>?`),
      graph,
      yes: excl,
      hint: L("Mutually exclusive means the overlap (A ∩ B) is empty — a 0 in the middle.", "Onderling uitsluitend beteken die oorvleueling (A ∩ B) is leeg: 'n 0 in die middel."),
      answerLabel: excl ? L("The overlap is 0, so yes — mutually exclusive.", "Die oorvleueling is 0, dus ja: onderling uitsluitend.") : L("The overlap is not 0, so no — they can happen together.", "Die oorvleueling is nie 0 nie, dus nee: hulle kan saam gebeur."),
      solution: [{ s: excl ? L(`n(A ∩ B) = 0 → A and B cannot happen together → mutually exclusive.`, `n(A ∩ B) = 0 → A en B kan nie saam gebeur nie → onderling uitsluitend.`) : L(`n(A ∩ B) = ${inter} ≠ 0 → A and B can happen together → NOT mutually exclusive.`, `n(A ∩ B) = ${inter} ≠ 0 → A en B kan saam gebeur → NIE onderling uitsluitend nie.`) }],
    };
  },

  exhaustiveDef: () => mc(MUT,
    L("Two events are <b>exhaustive</b> when…", "Twee gebeurtenisse is <b>uitputtend</b> wanneer…"),
    L("together they cover the whole sample space (nothing is left outside)", "hulle saam die hele uitkomsruimte dek (niks bly buite oor nie)"),
    [L("they can never happen together", "hulle nooit saam kan gebeur nie"), L("P(A) × P(B) = P(A ∩ B)", "P(A) × P(B) = P(A ∩ B)"), L("they have exactly the same outcomes", "hulle presies dieselfde uitkomste het")],
    { hint: L("“Exhaustive” = nothing left over outside the events.", "“Uitputtend” = niks bly buite die gebeurtenisse oor nie."),
      answerLabel: L("Exhaustive events leave no outcome outside — together they fill S.", "Uitputtende gebeurtenisse laat geen uitkoms buite nie: saam vul hulle S.") }),

  whichFormula: () => mc(RULE,
    L("Which is the correct <b>addition rule</b> for any two events?", "Watter een is die korrekte <b>optelreël</b> vir enige twee gebeurtenisse?"),
    L("P(A ∪ B) = P(A) + P(B) − P(A ∩ B)", "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)"),
    [L("P(A ∪ B) = P(A) + P(B) + P(A ∩ B)", "P(A ∪ B) = P(A) + P(B) + P(A ∩ B)"), L("P(A ∪ B) = P(A) × P(B)", "P(A ∪ B) = P(A) × P(B)"), L("P(A ∪ B) = P(A) + P(B)", "P(A ∪ B) = P(A) + P(B)")],
    { hint: L("You must remove the overlap once so it isn't counted twice.", "Jy moet die oorvleueling een keer aftrek sodat dit nie twee keer getel word nie."),
      answerLabel: L("P(A ∪ B) = P(A) + P(B) − P(A ∩ B). The last option only works when there's no overlap.", "P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Die laaste opsie werk net as daar geen oorvleueling is nie.") }),
};

export const questP4 = {
  id: "p4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: (id === "addUnion" || id === "addFindInter" || id === "whichFormula") ? RULE : MUT, gen })),
};
