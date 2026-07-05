/* ============================================================
   PROBABILITY QUEST 6 · Tree diagrams   ★ DIAGRAM
   Two-stage trees: multiply along a path, add paths to make an
   event, and the "at least one = 1 − none" shortcut. Every tree is
   drawn by the to-scale tree engine (forks verified to sum to 1).
   ============================================================ */
import { mc } from "./_shared.js";
import { pick } from "../ui.js";
import { dec } from "../problib.js";

const TREE = "treeRead";
const ALO = "atLeastOne";

/* two-toss tree for a coin with P(head)=pH (decimal). Leaves: HH,HT,TH,TT */
function coinTree(pH, extra = {}) {
  const h = dec(pH), t = dec(1 - pH);
  return {
    type: "tree",
    stage1: [{ label: "H", p: h }, { label: "T", p: t }],
    stage2: [[{ label: "H", p: h }, { label: "T", p: t }], [{ label: "H", p: h }, { label: "T", p: t }]],
    ...extra,
  };
}

const SKILLS = {
  branchSum: () => mc(TREE,
    "On a tree diagram, the probabilities on the branches leaving any <b>single point</b> must add up to…",
    "1", ["0", "0,5", "the number of branches"],
    { graph: coinTree(0.5),
      hint: "Those branches cover every option from that point.",
      answerLabel: "Branches from one point are exhaustive → they add up to 1." }),

  pathProduct: () => {
    const pH = pick([0.6, 0.7, 0.4, 0.3, 0.8]);
    const path = pick(["HH", "HT", "TH", "TT"]);
    const f = c => (c === "H" ? pH : 1 - pH);
    const v = f(path[0]) * f(path[1]);
    return {
      type: "calc", concept: TREE, dp: 2,
      prompt: `A biased coin has P(H) = <b>${dec(pH)}</b>. Using the tree, find <b>P(${path[0]}, ${path[1]})</b> — the path ${path}.`,
      graph: coinTree(pH),
      expected: v,
      hint: "Multiply the two branch probabilities ALONG the path.",
      answerLabel: `${dec(f(path[0]))} × ${dec(f(path[1]))} = ${dec(v, 2)}`,
      solution: [{ s: `P(${path}) = ${dec(f(path[0]))} × ${dec(f(path[1]))} = ${dec(v, 2)}` }],
    };
  },

  tapPath: () => {
    const target = pick([["HH", 0], ["HT", 1], ["TH", 2], ["TT", 3]]);
    return {
      type: "tap", concept: TREE,
      prompt: `Two tosses of a coin. Tap the path that gives the outcome <b>${target[0][0]} then ${target[0][1]}</b> (${target[0]}).`,
      graph: coinTree(0.5, { tap: { correctId: target[1] } }),
      tap: { correctId: target[1], targets: [0, 1, 2, 3] },
      tapHint: "Follow the first letter on the first set of branches, then the second.",
      hint: `Read the outcome labels on the right: ${target[0]}.`,
      answerLabel: `The ${target[0]} path is highlighted.`,
    };
  },

  exactlyOneHead: () => {
    const pH = pick([0.5, 0.6, 0.7, 0.4, 0.3, 0.8]);
    const v = 2 * pH * (1 - pH);
    return {
      type: "calc", concept: TREE, dp: 2,
      prompt: `A coin with P(H) = <b>${dec(pH)}</b> is tossed twice. Using the tree, find <b>P(exactly one head)</b>.`,
      graph: coinTree(pH),
      expected: v,
      hint: "Exactly one head = the HT path OR the TH path. Multiply along each path, then ADD the two paths.",
      answerLabel: `P(HT) + P(TH) = ${dec(pH * (1 - pH), 2)} + ${dec((1 - pH) * pH, 2)} = ${dec(v, 2)}`,
      solution: [
        { s: `P(HT) = ${dec(pH)} × ${dec(1 - pH)} = ${dec(pH * (1 - pH), 2)}` },
        { s: `P(TH) = ${dec(1 - pH)} × ${dec(pH)} = ${dec((1 - pH) * pH, 2)}` },
        { s: `P(exactly one H) = ${dec(pH * (1 - pH), 2)} + ${dec((1 - pH) * pH, 2)} = ${dec(v, 2)}` },
      ],
    };
  },

  atLeastOneHead: () => ({
    type: "calc", concept: ALO, dp: 2,
    prompt: `A fair coin is tossed <b>twice</b>. Using the tree, find <b>P(at least one head)</b>.`,
    graph: coinTree(0.5),
    expected: 0.75,
    hint: "Add the three paths with a head, or do 1 − P(no heads).",
    answerLabel: `1 − P(TT) = 1 − 0,25 = 0,75`,
    solution: [{ s: `P(at least one H) = P(HH) + P(HT) + P(TH) = 0,25 + 0,25 + 0,25 = 0,75` }, { s: `(or 1 − P(no H) = 1 − 0,25 = 0,75)` }],
  }),

  noneShortcut: () => mc(ALO,
    "What is the quickest way to work out <b>P(at least one)</b>?",
    "1 − P(none)",
    ["P(none) − 1", "1 − P(all)", "P(one) + P(none)"],
    { hint: "The opposite of “at least one” is “none at all”.",
      answerLabel: "P(at least one) = 1 − P(none)." }),

  pNoHeads: () => {
    const pH = pick([0.5, 0.6, 0.4]);
    const v = (1 - pH) * (1 - pH);
    return {
      type: "calc", concept: ALO, dp: 2,
      prompt: `A coin with P(H) = <b>${dec(pH)}</b> is tossed twice. Find <b>P(no heads)</b>.`,
      graph: coinTree(pH),
      expected: v,
      hint: "No heads = tails then tails: multiply the two tail branches.",
      answerLabel: `${dec(1 - pH)} × ${dec(1 - pH)} = ${dec(v, 2)}`,
      solution: [{ s: `P(no H) = P(T) × P(T) = ${dec(1 - pH)} × ${dec(1 - pH)} = ${dec(v, 2)}` }],
    };
  },

  biasedFindOther: () => {
    const pH = pick([0.6, 0.7, 0.8]);
    const pHH = pH * pH, pTT = (1 - pH) * (1 - pH);
    return {
      type: "calc", concept: TREE, dp: 2,
      prompt: `Two identical biased coins are tossed. It is found that <b>P(both heads) = ${dec(pHH)}</b>. Find <b>P(both tails)</b>.`,
      expected: pTT,
      hint: `The coins are identical, so P(H) × P(H) = ${dec(pHH)} — take the square root to find P(H) first.`,
      answerLabel: `P(H) = √${dec(pHH)} = ${dec(pH)} → P(TT) = ${dec(1 - pH)}² = ${dec(pTT, 2)}`,
      solution: [{ s: `P(H) × P(H) = ${dec(pHH)} → P(H) = ${dec(pH)}` }, { s: `P(T) = 1 − ${dec(pH)} = ${dec(1 - pH)}` }, { s: `P(TT) = ${dec(1 - pH)} × ${dec(1 - pH)} = ${dec(pTT, 2)}` }],
    };
  },
};

export const questP6 = {
  id: "p6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: (id === "atLeastOneHead" || id === "noneShortcut" || id === "pNoHeads") ? ALO : TREE, gen })),
};
