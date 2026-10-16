/* ============================================================
   NUMBER PATTERNS · Q1 — Spot the pattern
   ------------------------------------------------------------
   Build the difference pyramid (or look at the ratio) and decide:
   arithmetic (constant FIRST difference), quadratic (constant
   SECOND difference) or geometric (constant RATIO).
   ============================================================ */
import { mc } from "./_shared.js";
import { pyramid, tapQ, calcQ, PAT, P } from "./_patterns.js";
import {
  randArith, randQuad, randGeo, classify, classifyName, firstDiffs, geoRatio,
  list, C, pick,
} from "../patternlib.js";
import { L } from "../lang.js";

const ACC = PAT[0];
const KINDS = [L("arithmetic (linear)", "rekenkundig (lineêr)"), L("quadratic", "kwadraties"), L("geometric", "meetkundig"), L("none of these", "geen van hierdie")];
const wrongsFor = (correct) => KINDS.filter((k) => k !== correct);

const SKILLS = {
  /* arithmetic → classify */
  classifyArith: () => {
    const { seq, d } = randArith();
    const fd = firstDiffs(seq);
    return mc("patClassify",
      L(`Look at the pattern:<br><b>${list(seq)}</b><br>What kind of pattern is it?`, `Kyk na die patroon:<br><b>${list(seq)}</b><br>Watter soort patroon is dit?`),
      L("arithmetic (linear)", "rekenkundig (lineêr)"), wrongsFor(L("arithmetic (linear)", "rekenkundig (lineêr)")),
      { graph: pyramid(seq, { accent: ACC }),
        hint: L("Find the FIRST differences yourself. If they are all the same, it is arithmetic.", "Werk self die EERSTE verskille uit. As hulle almal dieselfde is, is dit rekenkundig."),
        answerLabel: L("Arithmetic — the first difference is constant.", "Rekenkundig: die eerste verskil is konstant."),
        solution: [
          { s: L(`First differences: ${list(fd)}`, `Eerste verskille: ${list(fd)}`), r: L("next − previous", "volgende − vorige") },
          { s: L(`Every one is ${C(d)}, so the first difference is constant`, `Elkeen is ${C(d)}, dus is die eerste verskil konstant`), r: L("constant 1st difference → arithmetic", "konstante 1ste verskil → rekenkundig") },
        ] });
  },

  /* quadratic → classify (show the full pyramid) */
  classifyQuad: () => {
    const { seq } = randQuad();
    const fd = firstDiffs(seq), sd = firstDiffs(fd);
    return mc("patClassify",
      L(`Look at the pattern:<br><b>${list(seq)}</b><br>What kind of pattern is it?`, `Kyk na die patroon:<br><b>${list(seq)}</b><br>Watter soort patroon is dit?`),
      L("quadratic", "kwadraties"), wrongsFor(L("quadratic", "kwadraties")),
      { graph: pyramid(seq, { accent: ACC }),
        hint: L("Work out the first differences — they change. Their differences (the second differences) are constant → quadratic.", "Werk die eerste verskille uit: hulle verander. Hul verskille (die tweede verskille) is konstant → kwadraties."),
        answerLabel: L("Quadratic — the second difference is constant.", "Kwadraties: die tweede verskil is konstant."),
        solution: [
          { s: L(`First differences: ${list(fd)}`, `Eerste verskille: ${list(fd)}`), r: L("they change, so not arithmetic", "hulle verander, dus nie rekenkundig nie") },
          { s: L(`Second differences: ${list(sd)}`, `Tweede verskille: ${list(sd)}`), r: L("constant 2nd difference → quadratic", "konstante 2de verskil → kwadraties") },
        ] });
  },

  /* geometric → classify (it's a ratio, not a difference) */
  classifyGeo: () => {
    const { seq, r } = randGeo({ integerR: true });
    return mc("patClassify",
      L(`Look at the pattern:<br><b>${list(seq)}</b><br>What kind of pattern is it?`, `Kyk na die patroon:<br><b>${list(seq)}</b><br>Watter soort patroon is dit?`),
      L("geometric", "meetkundig"), wrongsFor(L("geometric", "meetkundig")),
      { hint: L(`Divide each term by the one before it (${C(seq[1])} ÷ ${C(seq[0])} = …). A constant ratio means geometric.`, `Deel elke term deur die vorige een (${C(seq[1])} ÷ ${C(seq[0])} = …). 'n Konstante verhouding beteken dit is meetkundig.`),
        answerLabel: L(`Geometric — you multiply by ${C(r)} each time.`, `Meetkundig: jy vermenigvuldig elke keer met ${C(r)}.`),
        solution: [
          { s: L(`The differences are not constant, so divide instead`, `Die verskille is nie konstant nie, deel dus eerder`), r: L("next ÷ previous", "volgende ÷ vorige") },
          { s: L(`${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)} and ${C(seq[2])} ÷ ${C(seq[1])} = ${C(r)}`, `${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)} en ${C(seq[2])} ÷ ${C(seq[1])} = ${C(r)}`), r: L("same ratio each time → geometric", "elke keer dieselfde verhouding → meetkundig") },
        ] });
  },

  /* which row is the constant one? */
  whichConstant: () => {
    const { seq } = randQuad();
    const fd = firstDiffs(seq), sd = firstDiffs(fd);
    return mc("patClassify",
      L(`For the quadratic pattern <b>${list(seq)}</b>, which differences are constant?`, `In die kwadratiese patroon <b>${list(seq)}</b>, watter verskille is konstant?`),
      L("the second differences", "die tweede verskille"),
      [L("the first differences", "die eerste verskille"), L("the terms themselves", "die terme self"), L("none of them", "geen van hulle")],
      { graph: pyramid(seq, { accent: ACC }),
        hint: L("Work out the first differences (they change), then their differences (those stay the same).", "Werk die eerste verskille uit (hulle verander), en dan hul verskille (dié bly dieselfde)."),
        answerLabel: L("The second differences are constant.", "Die tweede verskille is konstant."),
        solution: [
          { s: L(`First differences: ${list(fd)}`, `Eerste verskille: ${list(fd)}`), r: L("not all the same", "nie almal dieselfde nie") },
          { s: L(`Second differences: ${list(sd)}`, `Tweede verskille: ${list(sd)}`), r: L("all the same → this is the constant row", "almal dieselfde → dit is die konstante ry") },
        ] });
  },

  /* read the common first difference */
  commonDiff: () => {
    const { seq, d } = randArith();
    return calcQ("patClassify",
      L(`What is the constant first difference of <b>${list(seq)}</b>?`, `Wat is die konstante eerste verskil van <b>${list(seq)}</b>?`),
      d,
      { graph: pyramid(seq, { showFirst: true, blankFirst: true, accent: ACC }),
        hint: L("Subtract any term from the one after it (next − previous).", "Trek enige term van die volgende een af (volgende − vorige)."),
        answerLabel: L(`d = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}.`, `d = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}.`),
        solution: [
          { s: L(`d = T₂ − T₁ = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}`, `d = T₂ − T₁ = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}`), r: L("next − previous", "volgende − vorige") },
          { s: L(`Check: T₃ − T₂ = ${C(seq[2])} − ${P(seq[1])} = ${C(d)}`, `Kontroleer: T₃ − T₂ = ${C(seq[2])} − ${P(seq[1])} = ${C(d)}`), r: L("same, so the difference is constant", "dieselfde, dus is die verskil konstant") },
        ] });
  },

  /* read a specific first difference off the pyramid (tap) */
  tapFirstDiff: () => {
    const { seq } = randQuad({ len: 4 });
    return tapQ("patClassify",
      L("Tap the <b>first difference between T₂ and T₃</b> (the middle of the top difference row).", "Klik op die <b>eerste verskil tussen T₂ en T₃</b> (die middel van die boonste verskilry)."),
      pyramid(seq, { showFirst: true, accent: ACC }),
      { targets: ["d1_0", "d1_1", "d1_2"], correctId: "d1_1" },
      { tapHint: L("First differences sit between two terms. The one between the 2nd and 3rd terms is the middle cell.", "Eerste verskille staan tussen twee terme. Die een tussen die 2de en 3de terme is die middelste sel."),
        hint: L("Look at the top difference row: its middle cell sits between T₂ and T₃.", "Kyk na die boonste verskilry: die middelste sel staan tussen T₂ en T₃."),
        answerLabel: L(`It is ${C(seq[2])} − ${P(seq[1])} = ${C(seq[2] - seq[1])}.`, `Dit is ${C(seq[2])} − ${P(seq[1])} = ${C(seq[2] - seq[1])}.`),
        solution: [
          { s: L(`A first difference sits between two terms`, `'n Eerste verskil staan tussen twee terme`), r: L(`${seq.length} terms → ${seq.length - 1} cells in the row`, `${seq.length} terme → ${seq.length - 1} selle in die ry`) },
          { s: L(`Between T₂ and T₃: ${C(seq[2])} − ${P(seq[1])} = ${C(seq[2] - seq[1])}`, `Tussen T₂ en T₃: ${C(seq[2])} − ${P(seq[1])} = ${C(seq[2] - seq[1])}`), r: L("the middle cell", "die middelste sel") },
        ] });
  },

  /* read the ratio of a geometric pattern */
  ratioOf: () => {
    const { seq, r } = randGeo({ integerR: true });
    return calcQ("patClassify",
      L(`By what do you multiply to move along <b>${list(seq)}</b>?`, `Waarmee vermenigvuldig jy elke keer in die patroon <b>${list(seq)}</b>?`),
      r,
      { hint: L("Divide a term by the one before it.", "Deel 'n term deur die vorige een."),
        answerLabel: L(`r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}.`, `r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}.`),
        solution: [
          { s: L(`r = T₂ ÷ T₁ = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}`, `r = T₂ ÷ T₁ = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}`), r: L("divide by the term before", "deel deur die vorige term") },
          { s: L(`Check: ${C(seq[2])} ÷ ${C(seq[1])} = ${C(r)}`, `Kontroleer: ${C(seq[2])} ÷ ${C(seq[1])} = ${C(r)}`), r: L("the ratio is constant", "die verhouding is konstant") },
        ] });
  },
};

export const questNp1 = {
  id: "np1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "patClassify", gen })),
};
