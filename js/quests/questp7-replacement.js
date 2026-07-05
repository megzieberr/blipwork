/* ============================================================
   PROBABILITY QUEST 7 · With & without replacement   ★ DIAGRAM
   The key difference: with replacement the totals stay the same;
   without, the total drops by one and the colour taken drops by one.
   Trees and answers come straight from problib (twoDrawPaths /
   atLeastOne), so branch fractions and answers always agree.
   ============================================================ */
import { mc } from "./_shared.js";
import { pick, randInt } from "../ui.js";
import { bag, twoDrawPaths, atLeastOne, frac, fracRaw } from "../problib.js";

const REP = "replacement";
const TREE = "treeRead";
const ALO = "atLeastOne";

const COLOURS = [
  { k: "B", name: "blue" }, { k: "G", name: "green" },
  { k: "R", name: "red" }, { k: "Y", name: "yellow" },
];

/* a two-colour bag (keeps trees to 4 leaves) */
function twoColourBag() {
  const [c1, c2] = pick([[0, 1], [0, 2], [1, 2], [2, 3], [1, 3]]).map(i => COLOURS[i]);
  const counts = {}; counts[c1.k] = randInt(4, 9); counts[c2.k] = randInt(4, 9);
  const b = bag(counts);
  return { b, cols: [c1, c2], name: k => COLOURS.find(c => c.k === k).name };
}

/* tree spec (raw branch fractions) for a two-colour bag, with/without replacement */
function treeSpec(env, replace, extra = {}) {
  const { b, cols } = env, N = b.total;
  const D = replace ? N : N - 1;
  const stage1 = cols.map(c => ({ label: c.k, p: fracRaw(b.counts[c.k], N) }));
  const stage2 = cols.map(first => cols.map(second => {
    const n2 = (!replace && second.k === first.k) ? b.counts[second.k] - 1 : b.counts[second.k];
    return { label: second.k, p: fracRaw(n2, D) };
  }));
  return { type: "tree", stage1, stage2, ...extra };
}

const SKILLS = {
  totalAfterDraw: () => {
    const env = twoColourBag(); const N = env.b.total;
    return {
      type: "calc", concept: REP, dp: 0,
      prompt: `A bag holds <b>${N}</b> balls. One is drawn and <b>not replaced</b>. How many balls are there for the <b>second</b> draw?`,
      expected: N - 1,
      hint: "Without replacement, the ball is kept out — the total drops by one.",
      answerLabel: `${N} − 1 = ${N - 1}`,
      solution: [{ s: `Without replacement the total falls from ${N} to ${N - 1}.` }],
    };
  },

  colourAfterDraw: () => {
    const env = twoColourBag(); const c = pick(env.cols);
    return {
      type: "calc", concept: REP, dp: 0,
      prompt: `A bag has <b>${env.b.counts[c.k]} ${c.name}</b> balls. One ${c.name} ball is drawn and <b>not replaced</b>. How many ${c.name} balls remain for the next draw?`,
      expected: env.b.counts[c.k] - 1,
      hint: "The colour you took also drops by one.",
      answerLabel: `${env.b.counts[c.k]} − 1 = ${env.b.counts[c.k] - 1}`,
    };
  },

  denomChanges: () => {
    const env = twoColourBag(); const N = env.b.total;
    const replace = pick([true, false]);
    return {
      type: "yesno", concept: REP,
      prompt: `Two balls are drawn from ${N}, <b>${replace ? "with" : "without"} replacement</b>. Does the <b>denominator change</b> between the first and second draw?`,
      yes: !replace,
      hint: replace ? "With replacement, the ball goes back — nothing changes." : "Without replacement, one ball is gone — the total changes.",
      answerLabel: replace ? `With replacement the total stays ${N}, so the denominator does NOT change.` : `Without replacement it drops from ${N} to ${N - 1}, so the denominator DOES change.`,
    };
  },

  pathWith: () => {
    const env = twoColourBag();
    const p = pick(twoDrawPaths(env.b, true));
    const f = frac(p.n, p.d);
    const without = twoDrawPaths(env.b, false).find(q => q.path === p.path);  // the classic slip
    const wrongs = [frac(without.n, without.d).str, frac(p.n1 + p.n2, p.d).str, frac(p.n, p.d * 2).str, frac(p.n1, p.d1).str]
      .filter((w, i, a) => w !== f.str && a.indexOf(w) === i).slice(0, 3);
    return mc(TREE,
      `A bag holds ${env.b.counts[env.cols[0].k]} ${env.cols[0].name} and ${env.b.counts[env.cols[1].k]} ${env.cols[1].name} balls. Two are drawn <b>with replacement</b>. Using the tree, find <b>P(${p.k1}, ${p.k2})</b> in simplest form.`,
      f.str, wrongs,
      { graph: treeSpec(env, true),
        hint: "With replacement, both draws use the same total. Multiply along the path.",
        answerLabel: `${fracRaw(p.n1, p.d1)} × ${fracRaw(p.n2, p.d2)} = ${fracRaw(p.n, p.d)} = ${f.str}` });
  },

  pathWithout: () => {
    const env = twoColourBag();
    const p = pick(twoDrawPaths(env.b, false));
    const f = frac(p.n, p.d);
    const withVal = twoDrawPaths(env.b, true).find(q => q.path === p.path);   // the classic slip
    const wrongs = [frac(withVal.n, withVal.d).str, frac(p.n1 + p.n2, p.d).str, frac(p.n, p.d * 2).str, frac(p.n1, p.d1).str]
      .filter((w, i, a) => w !== f.str && a.indexOf(w) === i).slice(0, 3);
    return mc(TREE,
      `A bag holds ${env.b.counts[env.cols[0].k]} ${env.cols[0].name} and ${env.b.counts[env.cols[1].k]} ${env.cols[1].name} balls. Two are drawn <b>without replacement</b>. Using the tree, find <b>P(${p.k1}, ${p.k2})</b> in simplest form.`,
      f.str, wrongs,
      { graph: treeSpec(env, false),
        hint: "Without replacement, the second denominator is one smaller — and the first colour drops by one.",
        answerLabel: `${fracRaw(p.n1, p.d1)} × ${fracRaw(p.n2, p.d2)} = ${fracRaw(p.n, p.d)} = ${f.str}` });
  },

  atLeastOneWithout: () => {
    const env = twoColourBag();
    const c = pick(env.cols);
    const replace = pick([true, false]);
    const res = atLeastOne(env.b, c.k, replace);
    return mc(ALO,
      `A bag holds ${env.b.counts[env.cols[0].k]} ${env.cols[0].name} and ${env.b.counts[env.cols[1].k]} ${env.cols[1].name} balls. Two are drawn <b>${replace ? "with" : "without"} replacement</b>. Find <b>P(at least one ${c.name})</b> in simplest form.`,
      res.pAtLeast.str,
      [res.pNone.str, frac(env.b.counts[c.k], env.b.total).str, frac(env.b.counts[c.k] * 2, env.b.total).str]
        .filter((w, i, a) => w !== res.pAtLeast.str && a.indexOf(w) === i).slice(0, 3),
      { graph: treeSpec(env, replace),
        hint: `Quickest: P(at least one) = 1 − P(no ${c.name}).`,
        answerLabel: `1 − P(no ${c.name}) = 1 − ${res.pNone.str} = ${res.pAtLeast.str}`,
        solution: [{ s: `P(no ${c.name}) = ${res.pNone.str}` }, { s: `P(at least one ${c.name}) = 1 − ${res.pNone.str} = ${res.pAtLeast.str}` }] });
  },

  tapPathWithout: () => {
    const env = twoColourBag();
    const paths = twoDrawPaths(env.b, false);
    const idx = randInt(0, paths.length - 1);
    const p = paths[idx];
    return {
      type: "tap", concept: TREE,
      prompt: `Two balls drawn <b>without replacement</b>. Tap the path for <b>${env.name(p.k1)} then ${env.name(p.k2)}</b> (${p.path}).`,
      graph: treeSpec(env, false, { tap: { correctId: idx } }),
      tap: { correctId: idx, targets: paths.map((_, i) => i) },
      tapHint: "Match the outcome label on the right.",
      hint: `Read the outcome labels: ${p.path}.`,
      answerLabel: `The ${p.path} path is highlighted.`,
    };
  },
};

export const questP7 = {
  id: "p7",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id,
    concept: id === "atLeastOneWithout" ? ALO : (id.startsWith("path") || id === "tapPathWithout") ? TREE : REP,
    gen,
  })),
};
