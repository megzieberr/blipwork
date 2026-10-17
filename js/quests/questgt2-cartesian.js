/* ============================================================
   GENERAL TRIG · gt2 — The Cartesian plane (discovery)
   ------------------------------------------------------------
   METHODS-trig.md Part B (p05). All Strippers Take Cash; the three
   graphs colour-blocked by quadrant; why each ratio is + or − where
   it is. Discovery round: xpOnce (first pass only, set below).
   Every sign is COMPUTED via astcSign/solutionQuadrants (triglib) —
   nothing here is a hand-typed +/−.
   ============================================================ */
import { mc, pick, astcWheelSvg, bowTieSvg, qbandsSpec, BAND, QSIGN } from "./_gtrig.js";
import { astcSign, solutionQuadrants } from "../triglib.js";
import { L } from "../lang.js";

const CON = "gtrigAstc";
const FN = [L("sin", "sin"), L("cos", "cos"), L("tan", "tan")];
const CIRC = { 1: "①", 2: "②", 3: "③", 4: "④" };
const WORD = { 1: L("All", "All"), 2: L("Strippers", "Strippers"), 3: L("Take", "Take"), 4: L("Cash", "Cash") };

/* ---- worked-method helpers (2026-09-02 methods batch, session S3) ----
   Both are pure string builders over values the skill has ALREADY rolled —
   they call no randomness, so the seeded rng stream is untouched. Names
   checked against the whole of js/ before they were added. */
const astcPositiveIn = quad => FN.filter(f => astcSign(f, quad) > 0);          // which ratios are + in a quadrant
const xyWordsIn = (quad) => {                                                   // "x is negative and y is positive"
  const [x, y] = QSIGN[quad];
  return { x: x > 0 ? L("positive", "positief") : L("negative", "negatief"), y: y > 0 ? L("positive", "positief") : L("negative", "negatief") };
};
const RATIO_OF = { sin: L("y/r", "y/r"), cos: L("x/r", "x/r"), tan: L("y/x", "y/x") };                        // METHODS-trig A5 (p04)
const QLIST = qs => qs.map(q => CIRC[q]).join(L(" and ", " en "));
/* why a ratio carries the sign it does — the r-is-never-negative argument */
const SIGN_STORY = {
  sin: L("r is a radius, so it is never negative — the sign of sin follows y alone: y is + above the x-axis (① and ②), − below it (③ and ④)", "r is 'n radius en nooit negatief nie, dus volg die teken van sin net y: y is + bo die x-as (① en ②), − daaronder (③ en ④)"),
  cos: L("r is a radius, so it is never negative — the sign of cos follows x alone: x is + on the right (① and ④), − on the left (② and ③)", "r is 'n radius en nooit negatief nie, dus volg die teken van cos net x: x is + regs (① en ④), − links (② en ③)"),
  tan: L("tan = y/x has no r in it: it is + when x and y carry the SAME sign (① and ③), − when they differ (② and ④)", "tan = y/x het geen r nie: dit is + as x en y DIESELFDE teken het (① en ③), − as hulle verskil (② en ④)"),
};

function reveal(q, frames, mode) { q.reveal = frames; if (mode) q.revealMode = mode; return q; }
function revealAfter(q, frames) { q.revealAfter = frames; return q; }

/* The wheel, twice over (2026-09-04, build-report finding F1). The card
   used to open with the FILLED-IN bow tie — "which word is quadrant ④?"
   with ④ labelled Cash right there on the picture, which is a free mark
   the moment the beat is dealt on its own in a dice round. So the ASK
   side now shows the same wheel with its four corners blank, and the two
   filled-in frames moved to the CONFIRM side (q.revealAfter): nothing is
   taken away from the discovery round, it just arrives one beat later. */
/* ⚠️ the <div> around the SVG is load-bearing. A reveal frame goes through
   formulaHtml(), and an SVG with LOOSE TEXT after it (even just a newline
   and a caption) reads as one expression to keep together: the whole frame
   comes back inside <span class="fml"><span class="nowrap">…, the svg goes
   inline, and its box collapses to 0 × 0 — a blank frame, no error, seen
   only on the rendered sheet. Block-wrap the picture and it is left alone. */
const WHEEL_BLANK = `<div>${bowTieSvg({ blankNames: true })}</div>${L(`<div class="muted small" style="margin-top:6px">① is the top-right corner and the numbers run anticlockwise. One word of the story goes in each corner — which one is here?</div>`, `<div class="muted small" style="margin-top:6px">① is regs bo en die nommers loop antikloksgewys. Een woord van die storie hoort in elke kwadrant: watter een is hier?</div>`)}`;

const WHEEL_FRAMES = [
  astcWheelSvg(),
  `<div style="font-size:15px;line-height:1.9">
     <span style="color:${"#eab308"}">① All</span> →
     <span style="color:${"#3b82f6"}"> ② Strippers</span> →
     <span style="color:${"#22c55e"}"> ③ Take</span> →
     <span style="color:${"#ec4899"}"> ④ Cash</span>
     ${L(`<div class="muted small" style="margin-top:6px">Read anticlockwise, starting at ①.</div>`, `<div class="muted small" style="margin-top:6px">Lees antikloksgewys, begin by ①.</div>`)}
   </div>`,
];

const SKILLS = {
  /* B1 — the wheel + All Strippers Take Cash */
  wheelWord: () => {
    const q = pick([1, 2, 3, 4]);
    return revealAfter(
      reveal(
        mc(CON, L(`Which word is quadrant ${CIRC[q]}?`, `Watter woord is kwadrant ${CIRC[q]}?`), WORD[q],
          [1, 2, 3, 4].filter(x => x !== q).map(x => WORD[x]),
          { hint: L("All Strippers Take Cash — read anticlockwise from ①.", "All Strippers Take Cash: lees antikloksgewys vanaf ①."),
            answerLabel: L(`${CIRC[q]} is “${WORD[q]}” — All ① Strippers ② Take ③ Cash ④.`, `${CIRC[q]} is “${WORD[q]}”: All ① Strippers ② Take ③ Cash ④.`) }),
        [WHEEL_BLANK]),
      WHEEL_FRAMES);
  },

  /* B2 — the three graphs, colour-blocked (a real trig-graph, her p05 bands) */
  bandSign: () => {
    const fn = pick(FN);
    const quad = pick([1, 2, 3, 4]);
    const [x0, x1] = BAND[quad];
    const sign = astcSign(fn, quad);
    const posLabel = L("above the x-axis, so ", "bo die x-as, dus is ") + fn + L(" is positive there", " daar positief");
    const negLabel = L("below the x-axis, so ", "onder die x-as, dus is ") + fn + L(" is negative there", " daar negatief");
    return mc(CON, L(`Between ${x0}° and ${x1}° the ${fn} curve is…`, `Tussen ${x0}° en ${x1}° is die ${fn}-kurwe…`),
      sign > 0 ? posLabel : negLabel, [sign > 0 ? negLabel : posLabel, L(`exactly zero throughout ${x0}°–${x1}°`, `presies nul oral van ${x0}° tot ${x1}°`)],
      { hint: L("Read the shading and the picture — above the line is +, below is −.", "Lees die skakering en die prent: bo die lyn is +, onder is −."),
        graph: qbandsSpec(fn),
        answerLabel: `${CIRC[quad]} (${x0}°–${x1}°): ${sign > 0 ? posLabel : negLabel}.`,
        solution: [
          { s: L(`${x0}° to ${x1}° is quadrant ${CIRC[quad]}`, `${x0}° tot ${x1}° is kwadrant ${CIRC[quad]}`), r: L(`All ① Strippers ② Take ③ Cash ④ — ${CIRC[quad]} is “${WORD[quad]}”`, `All ① Strippers ② Take ③ Cash ④: ${CIRC[quad]} is “${WORD[quad]}”`) },
          { s: L(`In ${CIRC[quad]} the positive ratios are: ${astcPositiveIn(quad).join(", ")}`, `In ${CIRC[quad]} is die positiewe verhoudings: ${astcPositiveIn(quad).join(", ")}`) },
          { s: L(`${fn} is ${sign > 0 ? "on that list, so it is positive" : "not on that list, so it is negative"} in ${CIRC[quad]}`, `${fn} is ${sign > 0 ? "op daardie lys, dus is dit positief" : "nie op daardie lys nie, dus is dit negatief"} in ${CIRC[quad]}`),
            r: `${sign > 0 ? L("positive → the curve sits above the x-axis", "positief → die kurwe lê bo die x-as") : L("negative → the curve dips below the x-axis", "negatief → die kurwe sak onder die x-as")}` },
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
      prompt: L(`Tap every quadrant where ${fn} θ is ${sign > 0 ? "positive" : "negative"}.`, `Klik op elke kwadrant waar ${fn} θ ${sign > 0 ? "positief" : "negatief"} is.`),
      correct,
      hint: L("All Strippers Take Cash — the story word order tells you the sign in each quadrant.", "All Strippers Take Cash: die volgorde van die woorde in die storie gee die teken in elke kwadrant."),
      answerLabel: L(`${fn} θ is ${sign > 0 ? "positive" : "negative"} in ${correct.map(q => CIRC[q]).join(" and ")}.`, `${fn} θ is ${sign > 0 ? "positief" : "negatief"} in ${correct.map(q => CIRC[q]).join(" en ")}.`),
      solution: [
        { s: L(`${fn} θ = ${RATIO_OF[fn]}`, `${fn} θ = ${RATIO_OF[fn]}`), r: L("start from what the ratio is made of", "begin by waaruit die verhouding bestaan") },
        { s: SIGN_STORY[fn] },
        { s: L(`So ${fn} θ is ${sign > 0 ? "positive" : "negative"} in ${QLIST(correct)}`, `Dus is ${fn} θ ${sign > 0 ? "positief" : "negatief"} in ${QLIST(correct)}`),
          r: L(`check it against All Strippers Take Cash — ${correct.map(q => WORD[q]).join(" and ")}`, `toets dit teen All Strippers Take Cash: ${correct.map(q => WORD[q]).join(" en ")}`) },
      ],
    };
  },

  /* B4 — sign of one ratio in one quadrant */
  oneSign: () => {
    const fn = pick(FN);
    const quad = pick([1, 2, 3, 4]);
    const sign = astcSign(fn, quad);
    return mc(CON, L(`θ is in quadrant ${CIRC[quad]}. ${fn} θ is…`, `θ is in kwadrant ${CIRC[quad]}. ${fn} θ is…`),
      sign > 0 ? L("positive", "positief") : L("negative", "negatief"), [sign > 0 ? L("negative", "negatief") : L("positive", "positief"), L("zero", "nul")],
      { hint: L("All Strippers Take Cash.", "All Strippers Take Cash."), answerLabel: L(`${CIRC[quad]} → ${fn} θ is ${sign > 0 ? "positive" : "negative"}.`, `${CIRC[quad]} → ${fn} θ is ${sign > 0 ? "positief" : "negatief"}.`),
        solution: (() => {
          const w = xyWordsIn(quad);
          return [
            { s: L(`Put a point in ${CIRC[quad]} and drop x and y to the axes: x is ${w.x}, y is ${w.y}`, `Plaas 'n punt in ${CIRC[quad]} en laat x en y na die asse sak: x is ${w.x}, y is ${w.y}`) },
            { s: fn === L("tan", "tan")
                ? L(`tan θ = y/x, so divide a ${w.y} by a ${w.x}`, `tan θ = y/x, dus deel jy y (${w.y}) deur x (${w.x})`)
                : L(`${fn} θ = ${RATIO_OF[fn]}, and r is never negative, so the sign comes from ${fn === L("sin", "sin") ? `y (${w.y})` : `x (${w.x})`}`, `${fn} θ = ${RATIO_OF[fn]}, en r is nooit negatief nie, dus kom die teken van ${fn === L("sin", "sin") ? `y (${w.y})` : `x (${w.x})`}`) },
            { s: L(`∴ ${fn} θ is ${sign > 0 ? L("positive", "positief") : L("negative", "negatief")} in ${CIRC[quad]}`, `∴ ${fn} θ is ${sign > 0 ? L("positive", "positief") : L("negative", "negatief")} in ${CIRC[quad]}`), r: L(`“${WORD[quad]}” in All Strippers Take Cash`, `“${WORD[quad]}” in All Strippers Take Cash`) },
          ];
        })() });
  },

  /* B5 — WHY: x/r or y/r sign, r always positive */
  whySign: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const quad = pick([2, 3, 4]);
    const xPos = quad === 1 || quad === 4, yPos = quad === 1 || quad === 2;
    const xSign = xPos ? L("positive", "positief") : L("negative", "negatief");
    const ySign = yPos ? L("positive", "positief") : L("negative", "negatief");
    const reason = fn === L("cos", "cos")
      ? L(`x is ${xSign} and r is always positive`, `x is ${xSign} en r is altyd positief`)
      : L(`y is ${ySign} and r is always positive`, `y is ${ySign} en r is altyd positief`);
    const wrongXSign = xPos ? L("negative", "negatief") : L("positive", "positief");
    const wrongYSign = yPos ? L("negative", "negatief") : L("positive", "positief");
    const decoy1 = fn === L("cos", "cos") ? L(`x is ${wrongXSign} and r is always positive`, `x is ${wrongXSign} en r is altyd positief`) : L(`y is ${wrongYSign} and r is always positive`, `y is ${wrongYSign} en r is altyd positief`);
    const decoy2 = L("r can be negative in some quadrants", "r kan in sommige kwadrante negatief wees");
    return mc(CON, L(`In quadrant ${CIRC[quad]}, ${fn} θ = ${fn === "cos" ? "x/r" : "y/r"} is ${astcSign(fn, quad) > 0 ? "positive" : "negative"} because…`, `In kwadrant ${CIRC[quad]} is ${fn} θ = ${fn === "cos" ? "x/r" : "y/r"} ${astcSign(fn, quad) > 0 ? "positief" : "negatief"} omdat…`),
      reason, [decoy1, decoy2],
      { hint: L("\"always positive bc it is the radius\" — r never carries the minus. Only x or y can flip the sign.", "\"altyd positief want dit is die radius\": r dra nooit die minus nie. Net x of y kan die teken omdraai."),
        answerLabel: L(`${fn} θ = ${fn === "cos" ? "x/r" : "y/r"}: ${reason}.`, `${fn} θ = ${fn === "cos" ? "x/r" : "y/r"}: ${reason}.`),
        solution: [
          { s: L(`Mark a point in ${CIRC[quad]} and drop x and y to the axes: x is ${xSign}, y is ${ySign}`, `Plaas 'n punt in ${CIRC[quad]} en laat x en y na die asse sak: x is ${xSign}, y is ${ySign}`) },
          { s: L(`r is the radius from the origin out to the point — a length`, `r is die radius van die oorsprong uit na die punt: 'n lengte`), r: L("a length is never negative, so r stays positive in every quadrant", "'n lengte is nooit negatief nie, dus bly r positief in elke kwadrant") },
          { s: L(`${fn} θ = ${fn === "cos" ? "x/r" : "y/r"}, so only ${fn === "cos" ? "x" : "y"} can put a minus in`, `${fn} θ = ${fn === "cos" ? "x/r" : "y/r"}, dus kan net ${fn === "cos" ? "x" : "y"} 'n minus inbring`),
            r: L(`here ${fn === "cos" ? `x is ${xSign}` : `y is ${ySign}`}, so ${fn} θ is ${astcSign(fn, quad) > 0 ? "positive" : "negative"}`, `hier ${fn === "cos" ? `is x ${xSign}` : `is y ${ySign}`}, dus is ${fn} θ ${astcSign(fn, quad) > 0 ? "positief" : "negatief"}`) },
        ] });
  },

  /* B6 — all positive / only one positive */
  onlyOne: () => {
    const items = [
      { prompt: L("Tap the quadrant where ALL three ratios are positive.", "Klik op die kwadrant waar AL drie verhoudings positief is."), correct: [1] },
      { prompt: L("Tap the quadrant where ONLY tan θ is positive.", "Klik op die kwadrant waar NET tan θ positief is."), correct: [3] },
      { prompt: L("Tap the quadrant where ONLY sin θ is positive.", "Klik op die kwadrant waar NET sin θ positief is."), correct: [2] },
      { prompt: L("Tap the quadrant where ONLY cos θ is positive.", "Klik op die kwadrant waar NET cos θ positief is."), correct: [4] },
    ];
    const it = pick(items);
    return {
      type: "tapcross", concept: CON, single: true,
      prompt: it.prompt, correct: it.correct,
      hint: L("All Strippers Take Cash: ① all three, ② sin only, ③ tan only, ④ cos only.", "All Strippers Take Cash: ① al drie, ② net sin, ③ net tan, ④ net cos."),
      answerLabel: `${it.prompt.replace(L("Tap the quadrant where", "Klik op die kwadrant waar"), L("That's", "Dis die kwadrant waar"))} ${CIRC[it.correct[0]]}.`,
      solution: (() => {
        const q = it.correct[0], w = xyWordsIn(q), pos = astcPositiveIn(q);
        return [
          { s: L(`Go round the wheel and check what is positive in each quadrant`, `Gaan die wiel om en kyk wat in elke kwadrant positief is`), r: "All ① Strippers ② Take ③ Cash ④" },
          { s: L(`In ${CIRC[q]}, x is ${w.x} and y is ${w.y}, so the positive ratios are: ${pos.join(", ")}`, `In ${CIRC[q]} is x ${w.x} en y ${w.y}, dus is die positiewe verhoudings: ${pos.join(", ")}`) },
          { s: L(`That is the only quadrant that matches`, `Dit is die enigste kwadrant wat pas`), r: L(`∴ ${CIRC[q]} — “${WORD[q]}”`, `∴ ${CIRC[q]}: “${WORD[q]}”`) },
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
    const sinWord = p.sin > 0 ? L("positive", "positief") : L("negative", "negatief"), cosWord = p.cos > 0 ? L("positive", "positief") : L("negative", "negatief");
    return mc(CON, L(`sin θ is ${sinWord} and cos θ is ${cosWord}. Which quadrant is θ in?`, `sin θ is ${sinWord} en cos θ is ${cosWord}. In watter kwadrant is θ?`),
      CIRC[p.q], [1, 2, 3, 4].filter(x => x !== p.q).map(x => CIRC[x]),
      { hint: L("Only one quadrant matches both signs at once — check each against All Strippers Take Cash.", "Net een kwadrant pas by albei tekens tegelyk: toets elkeen teen All Strippers Take Cash."),
        answerLabel: L(`sin ${sinWord}, cos ${cosWord} → only ${CIRC[p.q]} (${WORD[p.q]}) fits both.`, `sin ${sinWord}, cos ${cosWord} → net ${CIRC[p.q]} (${WORD[p.q]}) pas by albei.`),
        solution: [
          { s: L(`sin θ ${sinWord}: sin = y/r, so y must be ${sinWord} → ${QLIST(solutionQuadrants("sin", p.sin))}`, `sin θ ${sinWord}: sin = y/r, dus moet y ${sinWord} wees → ${QLIST(solutionQuadrants("sin", p.sin))}`) },
          { s: L(`cos θ ${cosWord}: cos = x/r, so x must be ${cosWord} → ${QLIST(solutionQuadrants("cos", p.cos))}`, `cos θ ${cosWord}: cos = x/r, dus moet x ${cosWord} wees → ${QLIST(solutionQuadrants("cos", p.cos))}`) },
          { s: L(`${CIRC[p.q]} is on both lists`, `${CIRC[p.q]} is op albei lyste`), r: L(`∴ θ lies in ${CIRC[p.q]} — “${WORD[p.q]}”`, `∴ θ lê in ${CIRC[p.q]}: “${WORD[p.q]}”`) },
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
