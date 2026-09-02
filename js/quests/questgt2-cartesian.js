/* ============================================================
   GENERAL TRIG · gt2 — The Cartesian plane (discovery)
   ------------------------------------------------------------
   METHODS-trig.md Part B (p05). All Strippers Take Cash; the three
   graphs colour-blocked by quadrant; why each ratio is + or − where
   it is. Discovery round: xpOnce (first pass only, set below).
   Every sign is COMPUTED via astcSign/solutionQuadrants (triglib) —
   nothing here is a hand-typed +/−.
   ============================================================ */
import { mc, pick, astcWheelSvg, qbandsSpec, BAND, QSIGN } from "./_gtrig.js";
import { astcSign, solutionQuadrants } from "../triglib.js";

const CON = "gtrigAstc";
const FN = ["sin", "cos", "tan"];
const CIRC = { 1: "①", 2: "②", 3: "③", 4: "④" };
const WORD = { 1: "All", 2: "Strippers", 3: "Take", 4: "Cash" };

/* ---- worked-method helpers (2026-09-02 methods batch, session S3) ----
   Both are pure string builders over values the skill has ALREADY rolled —
   they call no randomness, so the seeded rng stream is untouched. Names
   checked against the whole of js/ before they were added. */
const astcPositiveIn = quad => FN.filter(f => astcSign(f, quad) > 0);          // which ratios are + in a quadrant
const xyWordsIn = (quad) => {                                                   // "x is negative and y is positive"
  const [x, y] = QSIGN[quad];
  return { x: x > 0 ? "positive" : "negative", y: y > 0 ? "positive" : "negative" };
};
const RATIO_OF = { sin: "y/r", cos: "x/r", tan: "y/x" };                        // METHODS-trig A5 (p04)
const QLIST = qs => qs.map(q => CIRC[q]).join(" and ");
/* why a ratio carries the sign it does — the r-is-never-negative argument */
const SIGN_STORY = {
  sin: "r is a radius, so it is never negative — the sign of sin follows y alone: y is + above the x-axis (① and ②), − below it (③ and ④)",
  cos: "r is a radius, so it is never negative — the sign of cos follows x alone: x is + on the right (① and ④), − on the left (② and ③)",
  tan: "tan = y/x has no r in it: it is + when x and y carry the SAME sign (① and ③), − when they differ (② and ④)",
};

function reveal(q, frames, mode) { q.reveal = frames; if (mode) q.revealMode = mode; return q; }

const WHEEL_FRAMES = [
  astcWheelSvg(),
  `<div style="font-size:15px;line-height:1.9">
     <span style="color:${"#eab308"}">① All</span> →
     <span style="color:${"#3b82f6"}"> ② Strippers</span> →
     <span style="color:${"#22c55e"}"> ③ Take</span> →
     <span style="color:${"#ec4899"}"> ④ Cash</span>
     <div class="muted small" style="margin-top:6px">Read anticlockwise, starting at ①.</div>
   </div>`,
];

const SKILLS = {
  /* B1 — the wheel + All Strippers Take Cash */
  wheelWord: () => {
    const q = pick([1, 2, 3, 4]);
    return reveal(
      mc(CON, `Which word is quadrant ${CIRC[q]}?`, WORD[q],
        [1, 2, 3, 4].filter(x => x !== q).map(x => WORD[x]),
        { hint: "All Strippers Take Cash — read anticlockwise from ①.",
          answerLabel: `${CIRC[q]} is “${WORD[q]}” — All ① Strippers ② Take ③ Cash ④.` }),
      WHEEL_FRAMES);
  },

  /* B2 — the three graphs, colour-blocked (a real trig-graph, her p05 bands) */
  bandSign: () => {
    const fn = pick(FN);
    const quad = pick([1, 2, 3, 4]);
    const [x0, x1] = BAND[quad];
    const sign = astcSign(fn, quad);
    const posLabel = "above the x-axis, so " + fn + " is positive there";
    const negLabel = "below the x-axis, so " + fn + " is negative there";
    return mc(CON, `Between ${x0}° and ${x1}° the ${fn} curve is…`,
      sign > 0 ? posLabel : negLabel, [sign > 0 ? negLabel : posLabel, `exactly zero throughout ${x0}°–${x1}°`],
      { hint: "Read the shading and the picture — above the line is +, below is −.",
        graph: qbandsSpec(fn),
        answerLabel: `${CIRC[quad]} (${x0}°–${x1}°): ${sign > 0 ? posLabel : negLabel}.`,
        solution: [
          { s: `${x0}° to ${x1}° is quadrant ${CIRC[quad]}`, r: `All ① Strippers ② Take ③ Cash ④ — ${CIRC[quad]} is “${WORD[quad]}”` },
          { s: `In ${CIRC[quad]} the positive ratios are: ${astcPositiveIn(quad).join(", ")}` },
          { s: `${fn} is ${sign > 0 ? "on that list, so it is positive" : "not on that list, so it is negative"} in ${CIRC[quad]}`,
            r: `${sign > 0 ? "positive → the curve sits above the x-axis" : "negative → the curve dips below the x-axis"}` },
        ] });
  },

  /* B3 — tap every quadrant where a ratio is positive/negative */
  tapSign: () => {
    const combos = [];
    FN.forEach(fn => [1, -1].forEach(sign => combos.push({ fn, sign })));
    const { fn, sign } = pick(combos);
    const correct = solutionQuadrants(fn, sign);
    return {
      type: "tapcross", concept: CON,
      prompt: `Tap every quadrant where ${fn} θ is ${sign > 0 ? "positive" : "negative"}.`,
      correct,
      hint: "All Strippers Take Cash — the story word order tells you the sign in each quadrant.",
      answerLabel: `${fn} θ is ${sign > 0 ? "positive" : "negative"} in ${correct.map(q => CIRC[q]).join(" and ")}.`,
      solution: [
        { s: `${fn} θ = ${RATIO_OF[fn]}`, r: "start from what the ratio is made of" },
        { s: SIGN_STORY[fn] },
        { s: `So ${fn} θ is ${sign > 0 ? "positive" : "negative"} in ${QLIST(correct)}`,
          r: `check it against All Strippers Take Cash — ${correct.map(q => WORD[q]).join(" and ")}` },
      ],
    };
  },

  /* B4 — sign of one ratio in one quadrant */
  oneSign: () => {
    const fn = pick(FN);
    const quad = pick([1, 2, 3, 4]);
    const sign = astcSign(fn, quad);
    return mc(CON, `θ is in quadrant ${CIRC[quad]}. ${fn} θ is…`,
      sign > 0 ? "positive" : "negative", [sign > 0 ? "negative" : "positive", "zero"],
      { hint: "All Strippers Take Cash.", answerLabel: `${CIRC[quad]} → ${fn} θ is ${sign > 0 ? "positive" : "negative"}.`,
        solution: (() => {
          const w = xyWordsIn(quad);
          return [
            { s: `Put a point in ${CIRC[quad]} and drop x and y to the axes: x is ${w.x}, y is ${w.y}` },
            { s: fn === "tan"
                ? `tan θ = y/x, so divide a ${w.y} by a ${w.x}`
                : `${fn} θ = ${RATIO_OF[fn]}, and r is never negative, so the sign comes from ${fn === "sin" ? `y (${w.y})` : `x (${w.x})`}` },
            { s: `∴ ${fn} θ is ${sign > 0 ? "positive" : "negative"} in ${CIRC[quad]}`, r: `“${WORD[quad]}” in All Strippers Take Cash` },
          ];
        })() });
  },

  /* B5 — WHY: x/r or y/r sign, r always positive */
  whySign: () => {
    const fn = pick(["sin", "cos"]);
    const quad = pick([2, 3, 4]);
    const xSign = quad === 1 || quad === 4 ? "positive" : "negative";
    const ySign = quad === 1 || quad === 2 ? "positive" : "negative";
    const reason = fn === "cos"
      ? `x is ${xSign} and r is always positive`
      : `y is ${ySign} and r is always positive`;
    const wrongXSign = xSign === "positive" ? "negative" : "positive";
    const wrongYSign = ySign === "positive" ? "negative" : "positive";
    const decoy1 = fn === "cos" ? `x is ${wrongXSign} and r is always positive` : `y is ${wrongYSign} and r is always positive`;
    const decoy2 = "r can be negative in some quadrants";
    return mc(CON, `In quadrant ${CIRC[quad]}, ${fn} θ = ${fn === "cos" ? "x/r" : "y/r"} is ${astcSign(fn, quad) > 0 ? "positive" : "negative"} because…`,
      reason, [decoy1, decoy2],
      { hint: "\"always positive bc it is the radius\" — r never carries the minus. Only x or y can flip the sign.",
        answerLabel: `${fn} θ = ${fn === "cos" ? "x/r" : "y/r"}: ${reason}.`,
        solution: [
          { s: `Mark a point in ${CIRC[quad]} and drop x and y to the axes: x is ${xSign}, y is ${ySign}` },
          { s: `r is the radius from the origin out to the point — a length`, r: "a length is never negative, so r stays positive in every quadrant" },
          { s: `${fn} θ = ${fn === "cos" ? "x/r" : "y/r"}, so only ${fn === "cos" ? "x" : "y"} can put a minus in`,
            r: `here ${fn === "cos" ? `x is ${xSign}` : `y is ${ySign}`}, so ${fn} θ is ${astcSign(fn, quad) > 0 ? "positive" : "negative"}` },
        ] });
  },

  /* B6 — all positive / only one positive */
  onlyOne: () => {
    const items = [
      { prompt: "Tap the quadrant where ALL three ratios are positive.", correct: [1] },
      { prompt: "Tap the quadrant where ONLY tan θ is positive.", correct: [3] },
      { prompt: "Tap the quadrant where ONLY sin θ is positive.", correct: [2] },
      { prompt: "Tap the quadrant where ONLY cos θ is positive.", correct: [4] },
    ];
    const it = pick(items);
    return {
      type: "tapcross", concept: CON, single: true,
      prompt: it.prompt, correct: it.correct,
      hint: "All Strippers Take Cash: ① all three, ② sin only, ③ tan only, ④ cos only.",
      answerLabel: `${it.prompt.replace("Tap the quadrant where", "That's")} ${CIRC[it.correct[0]]}.`,
      solution: (() => {
        const q = it.correct[0], w = xyWordsIn(q), pos = astcPositiveIn(q);
        return [
          { s: `Go round the wheel and check what is positive in each quadrant`, r: "All ① Strippers ② Take ③ Cash ④" },
          { s: `In ${CIRC[q]}, x is ${w.x} and y is ${w.y}, so the positive ratios are: ${pos.join(", ")}` },
          { s: `That is the only quadrant that matches`, r: `∴ ${CIRC[q]} — “${WORD[q]}”` },
        ];
      })(),
    };
  },

  /* B7 — read the story backwards */
  backwards: () => {
    const pairs = [
      { sin: 1, cos: 1, q: 1 }, { sin: 1, cos: -1, q: 2 },
      { sin: -1, cos: -1, q: 3 }, { sin: -1, cos: 1, q: 4 },
    ];
    const p = pick(pairs);
    const sinWord = p.sin > 0 ? "positive" : "negative", cosWord = p.cos > 0 ? "positive" : "negative";
    return mc(CON, `sin θ is ${sinWord} and cos θ is ${cosWord}. Which quadrant is θ in?`,
      CIRC[p.q], [1, 2, 3, 4].filter(x => x !== p.q).map(x => CIRC[x]),
      { hint: "Only one quadrant matches both signs at once — check each against All Strippers Take Cash.",
        answerLabel: `sin ${sinWord}, cos ${cosWord} → only ${CIRC[p.q]} (${WORD[p.q]}) fits both.`,
        solution: [
          { s: `sin θ ${sinWord}: sin = y/r, so y must be ${sinWord} → ${QLIST(solutionQuadrants("sin", p.sin))}` },
          { s: `cos θ ${cosWord}: cos = x/r, so x must be ${cosWord} → ${QLIST(solutionQuadrants("cos", p.cos))}` },
          { s: `${CIRC[p.q]} is on both lists`, r: `∴ θ lies in ${CIRC[p.q]} — “${WORD[p.q]}”` },
        ] });
  },
};

export const questGt2 = {
  id: "gt2",
  stackFractions: true,
  // xpOnce REMOVED 2026-08-22 evening — her ruling: the questions rotate every
  // play, so the discovery rounds pay like any other round (full first time, 25% on replay).
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
