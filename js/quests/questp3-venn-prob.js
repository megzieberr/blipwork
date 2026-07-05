/* ============================================================
   PROBABILITY QUEST 3 · Venn diagrams — probabilities   ★ DIAGRAM
   Sort a sample space into the four regions, then read probabilities
   off the to-scale Venn. Counts and answers are computed by problib
   (vennRegions), so the diagram and the answer key always agree.
   ============================================================ */
import { mc } from "./_shared.js";
import { pick, randInt } from "../ui.js";
import { range1, multiplesOf, factorsOf, vennRegions, frac } from "../problib.js";

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
      return { N, A, B, descA: `a multiple of ${m}`, descB: `a factor of ${N}`, r };
  }
  // guaranteed fallback (the workbook's own 12-die example)
  const N = 12, A = multiplesOf(4, 12), B = factorsOf(12);
  return { N, A, B, descA: "a multiple of 4", descB: "a factor of 12", r: vennRegions(N, A, B) };
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
      prompt: `Roll a fair ${sc.N}-sided die. A = "${sc.descA}" = {${sc.A.join("; ")}}, B = "${sc.descB}" = {${sc.B.join("; ")}}.<br>How many outcomes are in <b>A ∩ B</b>?`,
      graph: vennEmpty(),
      expected: sc.r.nInter,
      hint: "A ∩ B = the values that appear in BOTH lists.",
      answerLabel: `A ∩ B = {${sc.A.filter(x => sc.B.includes(x)).join("; ")}} → ${sc.r.nInter}`,
      solution: [{ s: `Shared values: {${sc.A.filter(x => sc.B.includes(x)).join("; ")}} → n(A ∩ B) = ${sc.r.nInter}.` }],
    };
  },

  countOnlyA: () => {
    const sc = scenario();
    const only = sc.A.filter(x => !sc.B.includes(x));
    return {
      type: "calc", concept: READ, dp: 0,
      prompt: `Roll a fair ${sc.N}-sided die. A = "${sc.descA}" = {${sc.A.join("; ")}}, B = "${sc.descB}" = {${sc.B.join("; ")}}.<br>How many outcomes are in <b>A but not B</b> (only A)?`,
      graph: vennEmpty(),
      expected: sc.r.nOnlyA,
      hint: "Take A and remove anything that is also in B.",
      answerLabel: `only A = {${only.join("; ")}} → ${sc.r.nOnlyA}`,
      solution: [{ s: `Only A = {${only.join("; ")}} → ${sc.r.nOnlyA}.` }],
    };
  },

  pA: () => {
    const sc = scenario();
    return fracMC(`Use the Venn diagram. Write <b>P(A)</b> as a fraction in simplest form.`,
      sc.r.nA, sc.N, vennCounts(sc),
      { hint: "P(A) = (only A + overlap) ÷ n(S). Don't forget the overlap!",
        solution: [{ s: `n(A) = ${sc.r.nOnlyA} + ${sc.r.nInter} = ${sc.r.nA}` }, { s: `P(A) = ${sc.r.nA}/${sc.N} = ${frac(sc.r.nA, sc.N).str}` }],
        answerLabel: `P(A) = ${sc.r.nA}/${sc.N} = ${frac(sc.r.nA, sc.N).str}` },
      [sc.r.nOnlyA, sc.r.nInter]);                  // common slip: forgetting the overlap
  },

  pIntersection: () => {
    const sc = scenario();
    return fracMC(`Use the Venn diagram. Write <b>P(A ∩ B)</b> as a fraction in simplest form.`,
      sc.r.nInter, sc.N, vennCounts(sc),
      { hint: "P(A ∩ B) = the overlap count ÷ n(S).",
        answerLabel: `P(A ∩ B) = ${sc.r.nInter}/${sc.N} = ${frac(sc.r.nInter, sc.N).str}` },
      [sc.r.nA, sc.r.nOnlyA]);
  },

  pUnion: () => {
    const sc = scenario();
    const nU = sc.r.nOnlyA + sc.r.nInter + sc.r.nOnlyB;
    return fracMC(`Use the Venn diagram. Write <b>P(A ∪ B)</b> as a fraction in simplest form.`,
      nU, sc.N, vennCounts(sc),
      { hint: "P(A ∪ B) = only A + overlap + only B, all ÷ n(S).",
        solution: [{ s: `n(A ∪ B) = ${sc.r.nOnlyA} + ${sc.r.nInter} + ${sc.r.nOnlyB} = ${nU}` }, { s: `P = ${nU}/${sc.N} = ${frac(nU, sc.N).str}` }],
        answerLabel: `P(A ∪ B) = ${nU}/${sc.N} = ${frac(nU, sc.N).str}` },
      [sc.r.nA + sc.r.nB, sc.r.nInter]);            // slip: double-counting the overlap
  },

  pComplement: () => {
    const sc = scenario();
    const useA = pick([true, false]);
    const n = useA ? sc.N - sc.r.nA : sc.N - sc.r.nB;
    const lbl = useA ? "A′" : "B′";
    return fracMC(`Use the Venn diagram. Write <b>P(${lbl})</b> (not ${useA ? "A" : "B"}) as a fraction in simplest form.`,
      n, sc.N, vennCounts(sc),
      { hint: `P(${lbl}) = everything that is NOT in ${useA ? "A" : "B"}, ÷ n(S). Or use 1 − P(${useA ? "A" : "B"}).`,
        answerLabel: `P(${lbl}) = ${n}/${sc.N} = ${frac(n, sc.N).str}` },
      [useA ? sc.r.nA : sc.r.nB, sc.r.nOutside]);
  },

  pNeither: () => {
    const sc = scenario();
    return fracMC(`Use the Venn diagram. Write <b>P((A ∪ B)′)</b> — in neither A nor B — as a fraction in simplest form.`,
      sc.r.nOutside, sc.N, vennCounts(sc),
      { hint: "“Neither” is the count OUTSIDE both circles ÷ n(S).",
        answerLabel: `P(neither) = ${sc.r.nOutside}/${sc.N} = ${frac(sc.r.nOutside, sc.N).str}` },
      [sc.r.nInter, sc.r.nOnlyA + sc.r.nOnlyB]);
  },

  pOnlyB: () => {
    const sc = scenario();
    return fracMC(`Use the Venn diagram. Write <b>P(only B)</b> — in B but not A — as a fraction in simplest form.`,
      sc.r.nOnlyB, sc.N, vennCounts(sc),
      { hint: "Take the part of B that is OUTSIDE the overlap ÷ n(S).",
        answerLabel: `P(only B) = ${sc.r.nOnlyB}/${sc.N} = ${frac(sc.r.nOnlyB, sc.N).str}` },
      [sc.r.nB, sc.r.nInter]);
  },
};

export const questP3 = {
  id: "p3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: READ, gen })),
};
