/* ============================================================
   PROBABILITY QUEST 3 · Venn diagrams — probabilities   ★ DIAGRAM
   Sort a sample space into the four regions, then read probabilities
   off the to-scale Venn. Counts and answers are computed by problib
   (vennRegions), so the diagram and the answer key always agree.
   ============================================================ */
import { mc } from "./_shared.js";
import { pick, randInt } from "../ui.js";
import { range1, multiplesOf, factorsOf, vennRegions, frac } from "../problib.js";
import { L } from "../lang.js";

const READ = "vennRead";

/* a die scenario whose four Venn regions are all non-empty */
function scenario() {
  for (let tries = 0; tries < 60; tries++) {
    const N = pick([10, 12]);
    const m = pick([2, 3, 4]);
    const A = multiplesOf(m, N);                 // "a multiple of m"
    const B = factorsOf(N);                       // "a factor of N"
    const r = vennRegions(N, A, B);
    if (r.nOnlyA && r.nOnlyB && r.nInter && r.nOutside)
      return { N, A, B, descA: L(`a multiple of ${m}`, `'n veelvoud van ${m}`), descB: L(`a factor of ${N}`, `'n faktor van ${N}`), r };
  }
  // guaranteed fallback (the workbook's own 12-die example)
  const N = 12, A = multiplesOf(4, 12), B = factorsOf(12);
  return { N, A, B, descA: L("a multiple of 4", "'n veelvoud van 4"), descB: L("a factor of 12", "'n faktor van 12"), r: vennRegions(N, A, B) };
}

/* venn spec with the region COUNTS filled in */
const vennCounts = (sc) => ({
  type: "venn", mode: "two", A: "A", B: "B", s: `n(S) = ${sc.N}`,
  regions: { onlyA: String(sc.r.nOnlyA), inter: String(sc.r.nInter), onlyB: String(sc.r.nOnlyB), outside: String(sc.r.nOutside) },
});
/* an empty venn (labels only) — used when the learner must sort it themselves */
const vennEmpty = () => ({ type: "venn", mode: "two", A: "A", B: "B", s: "S" });

/* a fraction MC: correct = n/N, decoys built from other plausible counts.
   Decoys are filtered by VALUE (never numerically equal to the answer) and
   topped up with near-miss counts so there are always four buttons. */
function fracMC(prompt, n, N, graph, opts, decoyCounts = []) {
  const f = frac(n, N);
  const cands = decoyCounts.map(c => frac(c, N))
    .concat([{ str: `${N}/${n}`, val: N / n }])                          // inverted
    .concat([n + 1, n - 1, n + 2].filter(c => c >= 0 && c <= N).map(c => frac(c, N))); // off-by-one counts
  const seen = new Set([f.str]); const wrongs = [];
  for (const c of cands) {
    if (Math.abs(c.val - f.val) < 1e-9 || seen.has(c.str)) continue;
    seen.add(c.str); wrongs.push(c.str);
    if (wrongs.length === 3) break;
  }
  return mc(READ, prompt, f.str, wrongs, { graph, ...opts, answerLabel: opts.answerLabel || `${n}/${N} = ${f.str}` });
}

const SKILLS = {
  countInter: () => {
    const sc = scenario();
    return {
      type: "calc", concept: READ, dp: 0,
      prompt: L(`Roll a fair ${sc.N}-sided die. A = "${sc.descA}" = {${sc.A.join("; ")}}, B = "${sc.descB}" = {${sc.B.join("; ")}}.<br>How many outcomes are in <b>A ∩ B</b>?`, `Gooi 'n regverdige ${sc.N}-kantige dobbelsteen. A = "${sc.descA}" = {${sc.A.join("; ")}}, B = "${sc.descB}" = {${sc.B.join("; ")}}.<br>Hoeveel uitkomste is in <b>A ∩ B</b>?`),
      graph: vennEmpty(),
      expected: sc.r.nInter,
      hint: L("A ∩ B = the values that appear in BOTH lists.", "A ∩ B = die waardes wat in ALBEI lyste voorkom."),
      answerLabel: L(`A ∩ B = {${sc.A.filter(x => sc.B.includes(x)).join("; ")}} → ${sc.r.nInter}`, `A ∩ B = {${sc.A.filter(x => sc.B.includes(x)).join("; ")}} → ${sc.r.nInter}`),
      solution: [{ s: L(`Shared values: {${sc.A.filter(x => sc.B.includes(x)).join("; ")}} → n(A ∩ B) = ${sc.r.nInter}.`, `Gemeenskaplike waardes: {${sc.A.filter(x => sc.B.includes(x)).join("; ")}} → n(A ∩ B) = ${sc.r.nInter}.`) }],
    };
  },

  countOnlyA: () => {
    const sc = scenario();
    const only = sc.A.filter(x => !sc.B.includes(x));
    return {
      type: "calc", concept: READ, dp: 0,
      prompt: L(`Roll a fair ${sc.N}-sided die. A = "${sc.descA}" = {${sc.A.join("; ")}}, B = "${sc.descB}" = {${sc.B.join("; ")}}.<br>How many outcomes are in <b>A but not B</b> (only A)?`, `Gooi 'n regverdige ${sc.N}-kantige dobbelsteen. A = "${sc.descA}" = {${sc.A.join("; ")}}, B = "${sc.descB}" = {${sc.B.join("; ")}}.<br>Hoeveel uitkomste is in <b>A maar nie in B nie</b> (slegs A)?`),
      graph: vennEmpty(),
      expected: sc.r.nOnlyA,
      hint: L("Take A and remove anything that is also in B.", "Neem A en haal alles uit wat ook in B is."),
      answerLabel: L(`only A = {${only.join("; ")}} → ${sc.r.nOnlyA}`, `slegs A = {${only.join("; ")}} → ${sc.r.nOnlyA}`),
      solution: [{ s: L(`Only A = {${only.join("; ")}} → ${sc.r.nOnlyA}.`, `Slegs A = {${only.join("; ")}} → ${sc.r.nOnlyA}.`) }],
    };
  },

  pA: () => {
    const sc = scenario();
    return fracMC(L(`Use the Venn diagram. Write <b>P(A)</b> as a fraction in simplest form.`, `Gebruik die Venn-diagram. Skryf <b>P(A)</b> as 'n breuk in eenvoudigste vorm.`),
      sc.r.nA, sc.N, vennCounts(sc),
      { hint: L("P(A) = (only A + overlap) ÷ n(S). Don't forget the overlap!", "P(A) = (slegs A + oorvleueling) ÷ n(S). Moenie die oorvleueling vergeet nie!"),
        solution: [{ s: L(`n(A) = ${sc.r.nOnlyA} + ${sc.r.nInter} = ${sc.r.nA}`, `n(A) = ${sc.r.nOnlyA} + ${sc.r.nInter} = ${sc.r.nA}`) }, { s: L(`P(A) = ${sc.r.nA}/${sc.N} = ${frac(sc.r.nA, sc.N).str}`, `P(A) = ${sc.r.nA}/${sc.N} = ${frac(sc.r.nA, sc.N).str}`) }],
        answerLabel: L(`P(A) = ${sc.r.nA}/${sc.N} = ${frac(sc.r.nA, sc.N).str}`, `P(A) = ${sc.r.nA}/${sc.N} = ${frac(sc.r.nA, sc.N).str}`) },
      [sc.r.nOnlyA, sc.r.nInter]);                  // common slip: forgetting the overlap
  },

  pIntersection: () => {
    const sc = scenario();
    return fracMC(L(`Use the Venn diagram. Write <b>P(A ∩ B)</b> as a fraction in simplest form.`, `Gebruik die Venn-diagram. Skryf <b>P(A ∩ B)</b> as 'n breuk in eenvoudigste vorm.`),
      sc.r.nInter, sc.N, vennCounts(sc),
      { hint: L("P(A ∩ B) = the overlap count ÷ n(S).", "P(A ∩ B) = die aantal in die oorvleueling ÷ n(S)."),
        answerLabel: L(`P(A ∩ B) = ${sc.r.nInter}/${sc.N} = ${frac(sc.r.nInter, sc.N).str}`, `P(A ∩ B) = ${sc.r.nInter}/${sc.N} = ${frac(sc.r.nInter, sc.N).str}`) },
      [sc.r.nA, sc.r.nOnlyA]);
  },

  pUnion: () => {
    const sc = scenario();
    const nU = sc.r.nOnlyA + sc.r.nInter + sc.r.nOnlyB;
    return fracMC(L(`Use the Venn diagram. Write <b>P(A ∪ B)</b> as a fraction in simplest form.`, `Gebruik die Venn-diagram. Skryf <b>P(A ∪ B)</b> as 'n breuk in eenvoudigste vorm.`),
      nU, sc.N, vennCounts(sc),
      { hint: L("P(A ∪ B) = only A + overlap + only B, all ÷ n(S).", "P(A ∪ B) = slegs A + oorvleueling + slegs B, alles ÷ n(S)."),
        solution: [{ s: L(`n(A ∪ B) = ${sc.r.nOnlyA} + ${sc.r.nInter} + ${sc.r.nOnlyB} = ${nU}`, `n(A ∪ B) = ${sc.r.nOnlyA} + ${sc.r.nInter} + ${sc.r.nOnlyB} = ${nU}`) }, { s: L(`P = ${nU}/${sc.N} = ${frac(nU, sc.N).str}`, `P = ${nU}/${sc.N} = ${frac(nU, sc.N).str}`) }],
        answerLabel: L(`P(A ∪ B) = ${nU}/${sc.N} = ${frac(nU, sc.N).str}`, `P(A ∪ B) = ${nU}/${sc.N} = ${frac(nU, sc.N).str}`) },
      [sc.r.nA + sc.r.nB, sc.r.nInter]);            // slip: double-counting the overlap
  },

  pComplement: () => {
    const sc = scenario();
    const useA = pick([true, false]);
    const n = useA ? sc.N - sc.r.nA : sc.N - sc.r.nB;
    const lbl = useA ? L("A′", "A′") : L("B′", "B′");
    return fracMC(L(`Use the Venn diagram. Write <b>P(${lbl})</b> (not ${useA ? "A" : "B"}) as a fraction in simplest form.`, `Gebruik die Venn-diagram. Skryf <b>P(${lbl})</b> (nie ${useA ? "A" : "B"}) as 'n breuk in eenvoudigste vorm.`),
      n, sc.N, vennCounts(sc),
      { hint: L(`P(${lbl}) = everything that is NOT in ${useA ? "A" : "B"}, ÷ n(S). Or use 1 − P(${useA ? "A" : "B"}).`, `P(${lbl}) = alles wat NIE in ${useA ? "A" : "B"} is nie, ÷ n(S). Of gebruik 1 − P(${useA ? "A" : "B"}).`),
        answerLabel: L(`P(${lbl}) = ${n}/${sc.N} = ${frac(n, sc.N).str}`, `P(${lbl}) = ${n}/${sc.N} = ${frac(n, sc.N).str}`) },
      [useA ? sc.r.nA : sc.r.nB, sc.r.nOutside]);
  },

  pNeither: () => {
    const sc = scenario();
    return fracMC(L(`Use the Venn diagram. Write <b>P((A ∪ B)′)</b> — in neither A nor B — as a fraction in simplest form.`, `Gebruik die Venn-diagram. Skryf <b>P((A ∪ B)′)</b>, in nóg A nóg B, as 'n breuk in eenvoudigste vorm.`),
      sc.r.nOutside, sc.N, vennCounts(sc),
      { hint: L("“Neither” is the count OUTSIDE both circles ÷ n(S).", "“Geen van albei” is die aantal BUITE albei sirkels ÷ n(S)."),
        answerLabel: L(`P(neither) = ${sc.r.nOutside}/${sc.N} = ${frac(sc.r.nOutside, sc.N).str}`, `P(geen van albei) = ${sc.r.nOutside}/${sc.N} = ${frac(sc.r.nOutside, sc.N).str}`) },
      [sc.r.nInter, sc.r.nOnlyA + sc.r.nOnlyB]);
  },

  pOnlyB: () => {
    const sc = scenario();
    return fracMC(L(`Use the Venn diagram. Write <b>P(only B)</b> — in B but not A — as a fraction in simplest form.`, `Gebruik die Venn-diagram. Skryf <b>P(slegs B)</b>, in B maar nie in A nie, as 'n breuk in eenvoudigste vorm.`),
      sc.r.nOnlyB, sc.N, vennCounts(sc),
      { hint: L("Take the part of B that is OUTSIDE the overlap ÷ n(S).", "Neem die deel van B wat BUITE die oorvleueling is ÷ n(S)."),
        answerLabel: L(`P(only B) = ${sc.r.nOnlyB}/${sc.N} = ${frac(sc.r.nOnlyB, sc.N).str}`, `P(slegs B) = ${sc.r.nOnlyB}/${sc.N} = ${frac(sc.r.nOnlyB, sc.N).str}`) },
      [sc.r.nB, sc.r.nInter]);
  },
};

export const questP3 = {
  id: "p3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: READ, gen })),
};
