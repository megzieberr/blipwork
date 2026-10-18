/* ============================================================
   PROBABILITY QUEST 6 · Tree diagrams   ★ DIAGRAM
   Two-stage trees: multiply along a path, add paths to make an
   event, and the "at least one = 1 − none" shortcut. Every tree is
   drawn by the to-scale tree engine (forks verified to sum to 1).
   ============================================================ */
import { mc, mcStep, calcStep } from "./_shared.js";
import { pick } from "../ui.js";
import { dec } from "../problib.js";
import { L } from "../lang.js";

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
    L("On a tree diagram, the probabilities on the branches leaving any <b>single point</b> must add up to…", "Op 'n boomdiagram moet die waarskynlikhede op die takke wat uit enige <b>een punt</b> kom, optel tot…"),
    "1", ["0", "0,5", L("the number of branches", "die aantal takke")],
    { graph: coinTree(0.5),
      hint: L("Those branches cover every option from that point.", "Daardie takke dek elke moontlikheid vanaf daardie punt."),
      answerLabel: L("Branches from one point are mutually exclusive and exhaustive → they add up to 1.", "Takke uit een punt is onderling uitsluitend en uitputtend → hulle tel op tot 1.") }),

  pathProduct: () => {
    const pH = pick([0.6, 0.7, 0.4, 0.3, 0.8]);
    const path = pick([L("HH", "HH"), L("HT", "HT"), L("TH", "TH"), L("TT", "TT")]);
    const f = c => (c === "H" ? pH : 1 - pH);
    const v = f(path[0]) * f(path[1]);
    return {
      type: "calc", concept: TREE, dp: 2,
      prompt: L(`A biased coin has P(H) = <b>${dec(pH)}</b>. Using the tree, find <b>P(${path[0]}, ${path[1]})</b> — the path ${path}.`, `'n Sydige muntstuk het P(H) = <b>${dec(pH)}</b>. Gebruik die boom en vind <b>P(${path[0]}, ${path[1]})</b>: die pad ${path}.`),
      graph: coinTree(pH),
      expected: v,
      hint: L("Multiply the two branch probabilities ALONG the path.", "Vermenigvuldig die twee takwaarskynlikhede LANGS die pad."),
      answerLabel: `${dec(f(path[0]))} × ${dec(f(path[1]))} = ${dec(v, 2)}`,
      solution: [{ s: L(`P(${path}) = ${dec(f(path[0]))} × ${dec(f(path[1]))} = ${dec(v, 2)}`, `P(${path}) = ${dec(f(path[0]))} × ${dec(f(path[1]))} = ${dec(v, 2)}`) }],
    };
  },

  tapPath: () => {
    const target = pick([[L("HH", "HH"), 0], [L("HT", "HT"), 1], [L("TH", "TH"), 2], [L("TT", "TT"), 3]]);
    return {
      type: "tap", concept: TREE,
      prompt: L(`Two tosses of a coin. Tap the path that gives the outcome <b>${target[0][0]} then ${target[0][1]}</b> (${target[0]}).`, `'n Muntstuk word twee keer opgegooi. Klik op die pad wat die uitkoms <b>${target[0][0]} dan ${target[0][1]}</b> (${target[0]}) gee.`),
      graph: coinTree(0.5, { tap: { correctId: target[1] } }),
      tap: { correctId: target[1], targets: [0, 1, 2, 3] },
      tapHint: L("Follow the first letter on the first set of branches, then the second.", "Volg die eerste letter op die eerste stel takke, dan die tweede."),
      hint: L(`Read the outcome labels on the right: ${target[0]}.`, `Lees die uitkomsetikette aan die regterkant: ${target[0]}.`),
      answerLabel: L(`The ${target[0]} path is highlighted.`, `Die pad ${target[0]} is uitgelig.`),
    };
  },

  /* steps, 2026-08-30 audit-day split — graph and prompt unchanged;
     the existing worked `solution` is what becomes the answered chain. */
  exactlyOneHead: () => {
    const pH = pick([0.5, 0.6, 0.7, 0.4, 0.3, 0.8]);
    const pHT = pH * (1 - pH), pTH = (1 - pH) * pH, v = pHT + pTH;
    return {
      type: "steps", concept: TREE,
      prompt: L(`A coin with P(H) = <b>${dec(pH)}</b> is tossed twice. Using the tree, find <b>P(exactly one head)</b>.`, `'n Muntstuk met P(H) = <b>${dec(pH)}</b> word twee keer opgegooi. Gebruik die boom en vind <b>P(presies een kop)</b>.`),
      graph: coinTree(pH),
      steps: [
        /* tol 0.001 (answerCorrect's own epsilon), NOT calcStep's 0.015
           default — that default is a trig allowance for 4-dp sine
           working, and here it would accept 0,25 for a true 0,24
           (foreman review catch, 2026-08-30) */
        mcStep(L("Which paths give exactly one head?", "Watter paaie gee presies een kop?"), L("HT and TH", "HT en TH"),
          [L("HH and TT", "HH en TT"), L("HT only", "slegs HT"), L("HH, HT and TH", "HH, HT en TH")],
          L("Exactly one head means one H and one T — either order counts.", "Presies een kop beteken een H en een T: enige volgorde tel.")),
        calcStep(L("Find <b>P(HT)</b>.", "Vind <b>P(HT)</b>."), pHT,
          L("Multiply ALONG the path: P(H) × P(T).", "Vermenigvuldig LANGS die pad: P(H) × P(T)."), { dp: 2, tol: 0.001 }),
        calcStep(L("Find <b>P(TH)</b>.", "Vind <b>P(TH)</b>."), pTH,
          L("Multiply ALONG the path: P(T) × P(H).", "Vermenigvuldig LANGS die pad: P(T) × P(H)."), { dp: 2, tol: 0.001 }),
        calcStep(L("Now <b>P(exactly one head)</b> — add the two paths.", "Nou <b>P(presies een kop)</b>: tel die twee paaie op."), v,
          L("ADD the paths: P(HT) + P(TH).", "TEL die paaie OP: P(HT) + P(TH)."), { dp: 2, tol: 0.001 }),
      ],
      expected: v, dp: 2,
      hint: L("Exactly one head = the HT path OR the TH path. Multiply along each path, then ADD the two paths.", "Presies een kop = die HT-pad OF die TH-pad. Vermenigvuldig langs elke pad en TEL dan die twee paaie OP."),
      answerLabel: L(`P(HT) + P(TH) = ${dec(pHT, 2)} + ${dec(pTH, 2)} = ${dec(v, 2)}`, `P(HT) + P(TH) = ${dec(pHT, 2)} + ${dec(pTH, 2)} = ${dec(v, 2)}`),
      solution: [
        { s: L(`P(HT) = ${dec(pH)} × ${dec(1 - pH)} = ${dec(pHT, 2)}`, `P(HT) = ${dec(pH)} × ${dec(1 - pH)} = ${dec(pHT, 2)}`) },
        { s: L(`P(TH) = ${dec(1 - pH)} × ${dec(pH)} = ${dec(pTH, 2)}`, `P(TH) = ${dec(1 - pH)} × ${dec(pH)} = ${dec(pTH, 2)}`) },
        { s: L(`P(exactly one H) = ${dec(pHT, 2)} + ${dec(pTH, 2)} = ${dec(v, 2)}`, `P(presies een H) = ${dec(pHT, 2)} + ${dec(pTH, 2)} = ${dec(v, 2)}`) },
      ],
    };
  },

  atLeastOneHead: () => ({
    type: "calc", concept: ALO, dp: 2,
    prompt: L(`A fair coin is tossed <b>twice</b>. Using the tree, find <b>P(at least one head)</b>.`, `'n Regverdige muntstuk word <b>twee keer</b> opgegooi. Gebruik die boom en vind <b>P(ten minste een kop)</b>.`),
    graph: coinTree(0.5),
    expected: 0.75,
    hint: L("Add the three paths with a head, or do 1 − P(no heads).", "Tel die drie paaie met 'n kop op, of doen 1 − P(geen kop)."),
    answerLabel: L(`1 − P(TT) = 1 − 0,25 = 0,75`, `1 − P(TT) = 1 − 0,25 = 0,75`),
    solution: [{ s: L(`P(at least one H) = P(HH) + P(HT) + P(TH) = 0,25 + 0,25 + 0,25 = 0,75`, `P(ten minste een H) = P(HH) + P(HT) + P(TH) = 0,25 + 0,25 + 0,25 = 0,75`) }, { s: L(`(or 1 − P(no H) = 1 − 0,25 = 0,75)`, `(of 1 − P(geen H) = 1 − 0,25 = 0,75)`) }],
  }),

  noneShortcut: () => mc(ALO,
    L("What is the quickest way to work out <b>P(at least one)</b>?", "Wat is die vinnigste manier om <b>P(ten minste een)</b> uit te werk?"),
    L("1 − P(none)", "1 − P(geen)"),
    [L("P(none) − 1", "P(geen) − 1"), L("1 − P(all)", "1 − P(almal)"), L("P(one) + P(none)", "P(een) + P(geen)")],
    { hint: L("The opposite of “at least one” is “none at all”.", "Die teenoorgestelde van “ten minste een” is “glad geen”."),
      answerLabel: L("P(at least one) = 1 − P(none).", "P(ten minste een) = 1 − P(geen).") }),

  pNoHeads: () => {
    const pH = pick([0.5, 0.6, 0.4]);
    const v = (1 - pH) * (1 - pH);
    return {
      type: "calc", concept: ALO, dp: 2,
      prompt: L(`A coin with P(H) = <b>${dec(pH)}</b> is tossed twice. Find <b>P(no heads)</b>.`, `'n Muntstuk met P(H) = <b>${dec(pH)}</b> word twee keer opgegooi. Vind <b>P(geen kop)</b>.`),
      graph: coinTree(pH),
      expected: v,
      hint: L("No heads = tails then tails: multiply the two tail branches.", "Geen kop = stert dan stert: vermenigvuldig die twee stert-takke."),
      answerLabel: `${dec(1 - pH)} × ${dec(1 - pH)} = ${dec(v, 2)}`,
      solution: [{ s: L(`P(no H) = P(T) × P(T) = ${dec(1 - pH)} × ${dec(1 - pH)} = ${dec(v, 2)}`, `P(geen H) = P(T) × P(T) = ${dec(1 - pH)} × ${dec(1 - pH)} = ${dec(v, 2)}`) }],
    };
  },

  /* steps, 2026-08-30 audit-day split — no graph before, no graph now. */
  biasedFindOther: () => {
    const pH = pick([0.6, 0.7, 0.8]);
    const pHH = pH * pH, pT = 1 - pH, pTT = pT * pT;
    return {
      type: "steps", concept: TREE,
      prompt: L(`Two identical biased coins are tossed. It is found that <b>P(both heads) = ${dec(pHH)}</b>. Find <b>P(both tails)</b>.`, `Twee identiese sydige muntstukke word opgegooi. Daar word gevind dat <b>P(albei kop) = ${dec(pHH)}</b>. Vind <b>P(albei stert)</b>.`),
      steps: [
        /* tol 0.001 — see exactlyOneHead's note: the 0.015 default would
           accept a neighbouring tenth/hundredth as correct */
        calcStep(L("Find <b>P(H)</b>.", "Vind <b>P(H)</b>."), pH,
          L(`The coins are identical, so P(H) × P(H) = ${dec(pHH)} — take the square root to find P(H) first.`, `Die muntstukke is identies, dus P(H) × P(H) = ${dec(pHH)}: trek eers die vierkantswortel om P(H) te kry.`),
          { dp: 1, tol: 0.001 }),
        calcStep(L("Now find <b>P(T)</b>.", "Vind nou <b>P(T)</b>."), pT,
          L("P(T) = 1 − P(H).", "P(T) = 1 − P(H)."), { dp: 1, tol: 0.001 }),
        calcStep(L("Now find <b>P(both tails)</b>.", "Vind nou <b>P(albei stert)</b>."), pTT,
          L("P(TT) = P(T) × P(T).", "P(TT) = P(T) × P(T)."), { dp: 2, tol: 0.001 }),
      ],
      expected: pTT, dp: 2,
      hint: L(`The coins are identical, so P(H) × P(H) = ${dec(pHH)} — take the square root to find P(H) first.`, `Die muntstukke is identies, dus P(H) × P(H) = ${dec(pHH)}: trek eers die vierkantswortel om P(H) te kry.`),
      answerLabel: L(`P(H) = √${dec(pHH)} = ${dec(pH)} → P(TT) = ${dec(pT)}² = ${dec(pTT, 2)}`, `P(H) = √${dec(pHH)} = ${dec(pH)} → P(TT) = ${dec(pT)}² = ${dec(pTT, 2)}`),
      solution: [{ s: L(`P(H) × P(H) = ${dec(pHH)} → P(H) = ${dec(pH)}`, `P(H) × P(H) = ${dec(pHH)} → P(H) = ${dec(pH)}`) }, { s: L(`P(T) = 1 − ${dec(pH)} = ${dec(pT)}`, `P(T) = 1 − ${dec(pH)} = ${dec(pT)}`) }, { s: L(`P(TT) = ${dec(pT)} × ${dec(pT)} = ${dec(pTT, 2)}`, `P(TT) = ${dec(pT)} × ${dec(pT)} = ${dec(pTT, 2)}`) }],
    };
  },
};

export const questP6 = {
  id: "p6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: (id === "atLeastOneHead" || id === "noneShortcut" || id === "pNoHeads") ? ALO : TREE, gen })),
};
