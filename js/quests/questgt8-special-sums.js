/* ============================================================
   GENERAL TRIG · gt8 — Cartesian plane: SPECIAL SUMS
   ------------------------------------------------------------
   METHODS-trig.md Part H (p26–p31). Her five numbered steps:
     ① isolate the function · ② determine the quadrant ·
     ③ sketch the diagram · ④ calculate the unknown side ·
     ⑤ substitute
   Step ② is the teaching point and it is done with TWO colours of
   tick on one cross — one for the quadrants the ratio's sign allows,
   one for the quadrants the interval allows. The quadrant with two
   ticks wins. That overlap is what every item here drills.

   Two build rules that are not negotiable:
   • Every side is a whole number. The sides come from the four
     PRIMITIVE Pythagorean triples (3-4-5, 5-12-13, 8-15-17, 7-24-25 —
     PRIM_TRIPLES in _gtrig.js), so x, y AND r are all typeable on the
     number pad. Her own eg.1/eg.2 are 3-4-5 triples; the √3 example on
     p30 is not a number-pad question and is not generated. The
     MULTIPLES are deliberately left out here: the round hands over a
     ratio and expects one particular triangle back, and `sin θ = 20/25`
     is answered just as correctly with y = 4 and r = 5 — a learner who
     reduced would be marked wrong. Lowest terms is also how she writes
     every worked example (tan θ = 4/3 → sides 3 and 4).
   • The sketch appears AFTER the quadrant is chosen, and until the
     learner has typed the sides it carries LETTERS ONLY (x, y, r).
     A diagram must never answer its own question (CLAUDE.md gotcha 3),
     and here the diagram IS the answer to steps 2–4.
   ============================================================ */
import {
  pick, randInt, shuffled, mcStep, calcStep, quadStep,
  PRIM_TRIPLES, SMALL_TRIPLES, QSIGN, INTERVALS, fracLabel, negNum, bowTieSvg,
} from "./_gtrig.js";
import { solutionQuadrants } from "../triglib.js";
import { L as afL } from "../lang.js";

const CON = "gtrigSpecialSums";
const CIRC = ["①", "②", "③", "④"];
const LETTERS = [afL("θ", "θ"), afL("x", "x"), afL("α", "α")];
const ACCENT = "#8b5cf6";

const H_TICK = afL("Tick the quadrants the ratio's sign allows, then tick the quadrants the interval allows — in a second colour. The quadrant with TWO ticks is the one.", "Merk die kwadrante wat die verhouding se teken toelaat, merk dan in 'n tweede kleur die kwadrante wat die interval toelaat. Die kwadrant met TWEE regmerkies is die een.");
const H_SIDE = afL("Read the size off the ratio; read the sign off the quadrant you just picked.", "Lees die grootte van die verhouding af; lees die teken af van die kwadrant wat jy pas gekies het.");
const H_R = afL("r is always positive bc it is the radius — and it comes from Pythagoras: r² = x² + y² (pyth).", "r is altyd positief want dit is die radius, en dit kom van Pythagoras: r² = x² + y² (pyth).");
const H_RATIO = afL("Read it straight off the sketch: sin = y/r, cos = x/r, tan = y/x. The minus comes with the side, not with the r.", "Lees dit reguit van die skets af: sin = y/r, cos = x/r, tan = y/x. Die minus kom saam met die sy, nie met die r nie.");

/* ------------------------------------------------------------
   A (ratio-sign, interval) pair whose ticks overlap in EXACTLY one
   quadrant — the double-tick her step ② turns on. Nothing is
   hand-listed: solutionQuadrants() supplies the ratio's pair and the
   interval supplies its own, and the pair is kept only if the two
   lists share exactly one quadrant.
   ------------------------------------------------------------ */
function overlapPick() {
  for (let i = 0; i < 400; i++) {
    const fn = pick([afL("sin", "sin"), afL("cos", "cos"), afL("tan", "tan")]);
    const sign = pick([1, -1]);
    const iv = pick(INTERVALS);
    const ratioQ = solutionQuadrants(fn, sign);
    const hit = ratioQ.filter(q => iv.quadrants.includes(q));
    if (hit.length === 1) return { fn, sign, iv, ratioQ, quadrant: hit[0] };
  }
  /* unreachable in practice — every ratio pair meets every interval pair
     in one quadrant for most combinations; kept so the generator can
     never return undefined */
  return { fn: afL("tan", "tan"), sign: 1, iv: INTERVALS[2], ratioQ: [1, 3], quadrant: 3 };
}

/* the four quadrant buttons, ALWAYS in her ①②③④ order (a list to
   read off the cross, not a shuffle) */
const quadrantOptions = correct => [1, 2, 3, 4].map(q => ({ label: CIRC[q - 1], correct: q === correct }));

/* mc options filtered BY VALUE, never by string (CLAUDE.md gotcha 4):
   a decoy that is numerically equal to the right answer marks a right
   learner wrong. Takes the first three candidates whose value is new. */
function byValue(correctLabel, correctValue, cands) {
  const seenV = [correctValue];
  const seenL = new Set([correctLabel]);
  const out = [];
  cands.forEach(c => {
    if (out.length >= 3) return;
    if (!Number.isFinite(c.value)) return;
    if (seenL.has(c.label)) return;
    if (seenV.some(v => Math.abs(v - c.value) < 1e-9)) return;
    seenV.push(c.value); seenL.add(c.label);
    out.push({ label: c.label, correct: false });
  });
  return shuffled([{ label: correctLabel, correct: true }, ...out]);
}

/* her p26 habit: the GIVEN negative stays inside the square, brackets
   and all — `y² = 13² − (−12)²`. A positive needs no brackets. */
const sq = v => (v < 0 ? `(${negNum(v)})²` : `${v}²`);

/* every ratio off a finished sketch, as label + value */
function ratioOf(fn, x, y, r) {
  if (fn === afL("sin", "sin")) return { label: fracLabel(y, r), value: y / r };
  if (fn === afL("cos", "cos")) return { label: fracLabel(x, r), value: x / r };
  return { label: fracLabel(y, x), value: y / x };
}

/* ------------------------------------------------------------
   1 · THE BOW TIE CARD — her p27 diagram, then the overlap question
   ------------------------------------------------------------ */
function bowTieCard() {
  const { fn, sign, iv, ratioQ, quadrant } = overlapPick();
  const L = pick(LETTERS);
  const ivText = iv.text.replace(/θ/g, L);
  const signWord = sign > 0 ? afL("POSITIVE", "POSITIEF") : afL("NEGATIVE", "NEGATIEF");
  return {
    type: "steps", concept: CON,
    _dbg: { fn, sign, quadrant, ratioQ, intervalQ: iv.quadrants },
    prompt: afL(`${fn} ${L} is ${signWord}, and ${ivText}.`, `${fn} ${L} is ${signWord}, en ${ivText}.`),
    // learner-facing copy: no page refs, no third person (foreman ruling)
    reveal: [afL(`<div><b>The bow tie.</b> Two triangles meeting at the origin, one letter per quadrant: <b>A</b>ll · <b>S</b>trippers · <b>T</b>ake · <b>C</b>ash.</div>${bowTieSvg()}<div class="muted small">You were given two things, so you tick twice on one cross — once for the sign, once for the interval. Where the two ticks land on top of each other, that is your quadrant.</div>`, `<div><b>Die strikdas.</b> Twee driehoeke wat by die oorsprong ontmoet, een letter per kwadrant: <b>A</b>ll · <b>S</b>trippers · <b>T</b>ake · <b>C</b>ash.</div>${bowTieSvg()}<div class="muted small">Jy het twee dinge gekry, dus merk jy twee keer op een kruis: een keer vir die teken, een keer vir die interval. Waar die twee regmerkies bo-op mekaar val, dis jou kwadrant.</div>`)],
    steps: [doubleTickStep(fn, L, sign, ratioQ, ivText, iv.quadrants, quadrant)],
    hint: H_TICK,
    answerLabel: afL(`${CIRC[quadrant - 1]} — ${fn} ${L} being ${sign > 0 ? "+" : "−"} ticks ${ratioQ.map(q => CIRC[q - 1]).join(" and ")}; ${ivText} ticks ${iv.quadrants.map(q => CIRC[q - 1]).join(" and ")}. Only ${CIRC[quadrant - 1]} carries both ticks.`, `${CIRC[quadrant - 1]}: ${fn} ${L} wat ${sign > 0 ? "+" : "−"} is, merk ${ratioQ.map(q => CIRC[q - 1]).join(" en ")}; ${ivText} merk ${iv.quadrants.map(q => CIRC[q - 1]).join(" en ")}. Net ${CIRC[quadrant - 1]} het albei regmerkies.`),
    solution: [
      { s: afL(`${fn} ${L} is ${sign > 0 ? "+" : "−"} → ${ratioQ.map(q => CIRC[q - 1]).join(", ")}`, `${fn} ${L} is ${sign > 0 ? "+" : "−"} → ${ratioQ.map(q => CIRC[q - 1]).join(", ")}`), r: afL("All Strippers Take Cash.", "All Strippers Take Cash.") },
      { s: `${ivText} → ${iv.quadrants.map(q => CIRC[q - 1]).join(", ")}`, r: afL("the second colour of tick.", "die tweede kleur regmerkie.") },
      { s: `∴ ${CIRC[quadrant - 1]}`, r: afL("the quadrant with two ticks.", "die kwadrant met twee regmerkies.") },
    ],
  };
}

/* her double tick as ONE step (ruling 2026-08-22 evening — "the kids must
   MAKE the 2 ticks"): tick where the sign allows, tick where the interval
   allows, then tap the overlap. The ticks stay on screen. */
function doubleTickStep(fn, L, sign, ratioQ, ivText, ivQ, quadrant) {
  return {
    kind: "doubletick", correct: quadrant,
    prompt: afL("Make the two ticks on the cross.", "Maak die twee regmerkies op die kruis."),
    passes: [
      { prompt: afL(`Tick every quadrant where ${fn} ${L} is ${sign > 0 ? "positive" : "negative"}.`, `Merk elke kwadrant waar ${fn} ${L} ${sign > 0 ? "positief" : "negatief"} is.`), correct: ratioQ },
      { prompt: afL(`Now tick every quadrant that ${ivText} allows.`, `Merk nou elke kwadrant wat ${ivText} toelaat.`), correct: ivQ },
    ],
    finalPrompt: afL("Tap the quadrant that has BOTH ticks.", "Klik op die kwadrant met ALBEI regmerkies."),
    hint: H_TICK,
  };
}

/* ------------------------------------------------------------
   2–5 · HER FIVE-STEP CHAIN
   quadrant → (sketch appears) x → y → r → two ratios off the sketch
   ------------------------------------------------------------ */
function chainItem() {
  const { fn, sign, iv, ratioQ, quadrant } = overlapPick();
  const [a, b, r] = pick(PRIM_TRIPLES);
  const [sx, sy] = QSIGN[quadrant];
  const x = sx * a, y = sy * b;
  const L = pick(LETTERS);
  const ivText = iv.text.replace(/θ/g, L);
  const given = ratioOf(fn, x, y, r);

  /* which side is NOT handed over by the ratio — the one Pythagoras
     has to produce (her step ④) */
  const derived = fn === afL("tan", "tan") ? afL("r", "r") : fn === afL("sin", "sin") ? afL("x", "x") : afL("y", "y");

  /* her p26 layout for the derived side: the given negative stays
     INSIDE the square, then ± , then ∴ picks the sign off the quadrant */
  function pythHtml() {
    if (derived === afL("r", "r")) {
      return afL(`r² = ${sq(x)} + ${sq(y)}&nbsp;&nbsp;(pyth)<br>√r² = √${x * x + y * y}<br>r = ${r} &nbsp;<span class="muted">always positive bc it is the radius</span>`, `r² = ${sq(x)} + ${sq(y)}&nbsp;&nbsp;(pyth)<br>√r² = √${x * x + y * y}<br>r = ${r} &nbsp;<span class="muted">altyd positief want dit is die radius</span>`);
    }
    const known = derived === afL("x", "x") ? y : x;
    const outv = derived === afL("x", "x") ? x : y;
    return afL(`${derived}² = ${r}² − ${sq(known)}&nbsp;&nbsp;(pyth)<br>√${derived}² = √${outv * outv}<br>${derived} = ±${Math.abs(outv)}<br>∴ ${derived} = ${negNum(outv)} &nbsp;<span class="muted">the sign comes from ${CIRC[quadrant - 1]}</span>`, `${derived}² = ${r}² − ${sq(known)}&nbsp;&nbsp;(pyth)<br>√${derived}² = √${outv * outv}<br>${derived} = ±${Math.abs(outv)}<br>∴ ${derived} = ${negNum(outv)} &nbsp;<span class="muted">die teken kom van ${CIRC[quadrant - 1]}</span>`);
  }

  const sketch = {
    type: "quadtri", x, y, w: 300, h: 300, accent: ACCENT, theta: true,
    letters: { x: afL("x", "x"), y: afL("y", "y"), r: afL("r", "r") },      // LETTERS ONLY — nothing is typed yet
  };

  /* the two follow-up ratios: the two the question did NOT hand over —
     asking for the given one back would be a free mark */
  const [fA, fB] = shuffled([afL("sin", "sin"), afL("cos", "cos"), afL("tan", "tan")].filter(f => f !== fn));
  function ratioStep(f) {
    const right = ratioOf(f, x, y, r);
    const num = f === afL("cos", "cos") ? x : y;               // the top of the true ratio
    const den = f === afL("tan", "tan") ? x : r;               // the bottom of it
    const cands = [
      { label: fracLabel(-num, den), value: -right.value },          // sign flipped
      ...[afL("sin", "sin"), afL("cos", "cos"), afL("tan", "tan")].filter(o => o !== f).map(o => ratioOf(o, x, y, r)),   // the wrong ratio
      { label: fracLabel(den, num), value: den / num },              // upside down
      { label: fracLabel(-den, num), value: -den / num },
      { label: fracLabel(Math.abs(num), Math.abs(den)), value: Math.abs(num / den) },
      { label: fracLabel(x, y), value: x / y },
      { label: fracLabel(r, Math.abs(num)), value: r / Math.abs(num) },
    ];
    return {
      kind: "mc", prompt: `${f} ${L} = ?`,
      options: byValue(right.label, right.value, cands),
      hint: H_RATIO,
    };
  }

  /* ONE keypad; each typed side is written onto the sketch, then the pad
     disappears and the finished sketch stays above the ratio questions
     (her ruling 2026-08-22 evening: "the kids should USE the diagram and
     READ their answers from the diagram") */
  const steps = [
    doubleTickStep(fn, L, sign, ratioQ, ivText, iv.quadrants, quadrant),
    {
      kind: "sketchfill", prompt: afL("Now the sketch. Type each side — it appears on the drawing as you go.", "Nou die skets. Tik elke sy in: dit verskyn op die tekening soos jy aangaan."), graph: sketch, hint: H_SIDE,
      fields: [
        { key: afL("x", "x"), prompt: afL("x = ?", "x = ?"), expected: x, hint: derived === afL("x", "x") ? afL(`${H_SIDE} This is the one Pythagoras has to give you: x² = r² − y²  (pyth).`, `${H_SIDE} Dié een moet Pythagoras vir jou gee: x² = r² − y²  (pyth).`) : H_SIDE },
        { key: afL("y", "y"), prompt: afL("y = ?", "y = ?"), expected: y, hint: derived === afL("y", "y") ? afL(`${H_SIDE} This is the one Pythagoras has to give you: y² = r² − x²  (pyth).`, `${H_SIDE} Dié een moet Pythagoras vir jou gee: y² = r² − x²  (pyth).`) : H_SIDE },
        { key: afL("r", "r"), prompt: afL("r = ?", "r = ?"), expected: r, hint: H_R },
      ],
    },
    ratioStep(fA),
    ratioStep(fB),
  ];

  return {
    type: "steps", concept: CON,
    _dbg: { fn, sign, quadrant, x, y, r, derived, ratios: [fA, fB] },
    prompt: afL(`${fn} ${L} = ${given.label} and ${ivText}.`, `${fn} ${L} = ${given.label} en ${ivText}.`),
    steps,
    hint: H_TICK,
    answerLabel: afL(`${CIRC[quadrant - 1]}, and the sketch is x = ${negNum(x)}, y = ${negNum(y)}, r = ${r}.<br>${pythHtml()}`, `${CIRC[quadrant - 1]}, en die skets is x = ${negNum(x)}, y = ${negNum(y)}, r = ${r}.<br>${pythHtml()}`),
    solution: [
      { s: afL(`${fn} ${L} is ${sign > 0 ? "+" : "−"} → ${ratioQ.map(q => CIRC[q - 1]).join(", ")}; ${ivText} → ${iv.quadrants.map(q => CIRC[q - 1]).join(", ")}`, `${fn} ${L} is ${sign > 0 ? "+" : "−"} → ${ratioQ.map(q => CIRC[q - 1]).join(", ")}; ${ivText} → ${iv.quadrants.map(q => CIRC[q - 1]).join(", ")}`), r: afL("② determine the quadrant — two colours of tick.", "② bepaal die kwadrant: twee kleure regmerkies.") },
      { s: `∴ ${CIRC[quadrant - 1]}`, r: afL("the double-ticked one.", "die een met twee regmerkies.") },
      { s: afL(`x = ${negNum(x)}, y = ${negNum(y)}, r = ${r}`, `x = ${negNum(x)}, y = ${negNum(y)}, r = ${r}`), r: afL("③ sketch · ④ the unknown side (pyth).", "③ skets · ④ die onbekende sy (pyth).") },
      { s: `${fA} ${L} = ${ratioOf(fA, x, y, r).label} · ${fB} ${L} = ${ratioOf(fB, x, y, r).label}`, r: afL("⑤ read them off the sketch.", "⑤ lees hulle van die skets af.") },
    ],
  };
}

/* ------------------------------------------------------------
   6 · SUBSTITUTE — her step ⑤, with the sketch FINISHED (all three
   sides numeric, because by now the learner has worked them out)
   ------------------------------------------------------------ */
function substitute() {
  const quadrant = randInt(1, 4);
  const [a, b, r] = pick(SMALL_TRIPLES);
  const [sx, sy] = QSIGN[quadrant];
  const x = sx * a, y = sy * b;
  const L = pick(LETTERS);

  const forms = [
    { text: afL(`${r} sin ${L} + ${r} cos ${L}`, `${r} sin ${L} + ${r} cos ${L}`), value: y + x, decoys: [y - x, x - y, -(x + y)] },
    { text: afL(`${r} cos ${L} − ${r} sin ${L}`, `${r} cos ${L} − ${r} sin ${L}`), value: x - y, decoys: [x + y, y - x, -(x + y)] },
    { text: afL(`${Math.abs(y)}/sin ${L}`, `${Math.abs(y)}/sin ${L}`), value: Math.abs(y) * r / y, decoys: [-Math.abs(y) * r / y, Math.abs(y), -r * 2] },
  ];
  if (r === 5) forms.push({ text: `${r * r} sin²${L} − ${r} cos ${L}`, value: y * y - x, decoys: [y * y + x, x - y * y, -(y * y) - x] });
  const form = pick(forms);
  const cands = [...form.decoys, form.value + 1, form.value - 1, form.value + r, 2 * form.value]
    .map(v => ({ label: negNum(v), value: v }));

  return {
    type: "mc", concept: CON,
    _dbg: { x, y, r, quadrant, expr: form.text, value: form.value },
    prompt: afL(`The sketch is finished. Work out ${form.text}.`, `Die skets is klaar. Bereken ${form.text}.`),
    graph: {
      // wider than it is tall: a numeric label like "−24" sits just
      // outside the vertical leg and needs somewhere to go at 375 px
      type: "quadtri", x, y, w: 380, h: 300, accent: ACCENT, theta: true,
      labels: { x: negNum(x), y: negNum(y), r: String(r) },
    },
    options: byValue(negNum(form.value), form.value, cands),
    hint: afL("⑤ substitute: sin = y/r, cos = x/r, tan = y/x, straight off the sketch — brackets round every negative before you square anything.", "⑤ vervang: sin = y/r, cos = x/r, tan = y/x, reguit van die skets af; hakies om elke negatief voordat jy iets kwadreer."),
    answerLabel: afL(`${form.text} = ${negNum(form.value)} &nbsp;<span class="muted">with x = ${negNum(x)}, y = ${negNum(y)}, r = ${r}</span>`, `${form.text} = ${negNum(form.value)} &nbsp;<span class="muted">met x = ${negNum(x)}, y = ${negNum(y)}, r = ${r}</span>`),
    solution: [
      { s: afL(`sin ${L} = ${fracLabel(y, r)}, cos ${L} = ${fracLabel(x, r)}, tan ${L} = ${fracLabel(y, x)}`, `sin ${L} = ${fracLabel(y, r)}, cos ${L} = ${fracLabel(x, r)}, tan ${L} = ${fracLabel(y, x)}`), r: afL("read off the sketch.", "lees van die skets af.") },
      { s: `${form.text} = ${negNum(form.value)}`, r: afL("⑤ substitute.", "⑤ vervang.") },
    ],
  };
}

/* ------------------------------------------------------------
   7 · THE POINT VARIANT (p31) — a point on the terminal arm instead
   of a ratio. The coordinates ARE given, so the sketch may show them;
   r is the unknown, so r stays a letter until it is typed.
   ------------------------------------------------------------ */
function pointVariant() {
  const quadrant = randInt(1, 4);
  const [a, b, r] = pick(PRIM_TRIPLES);
  const [sx, sy] = QSIGN[quadrant];
  const x = sx * a, y = sy * b;
  const L = pick(LETTERS);
  const right = ratioOf(afL("tan", "tan"), x, y, r);
  const cands = [
    { label: fracLabel(-y, x), value: -right.value },
    ratioOf(afL("sin", "sin"), x, y, r), ratioOf(afL("cos", "cos"), x, y, r),
    { label: fracLabel(x, y), value: x / y },
  ];
  return {
    type: "steps", concept: CON,
    _dbg: { x, y, r, quadrant, point: true },
    prompt: afL(`P(${negNum(x)} ; ${negNum(y)}) lies on the terminal arm of ${L}.`, `P(${negNum(x)} ; ${negNum(y)}) lê op die eindarm van ${L}.`),
    steps: [
      quadStep(afL("Which quadrant does the arm swing into?", "In watter kwadrant swaai die arm?"), quadrant,
        afL("The first coordinate is the x, the second is the y — the two signs put the point in exactly one quadrant.", "Die eerste koördinaat is die x, die tweede die y: die twee tekens plaas die punt in presies een kwadrant.")),
      {
        kind: "sketchfill", prompt: afL("The point is on the sketch. Type r — it appears on the drawing.", "Die punt is op die skets. Tik r in: dit verskyn op die tekening."), hint: H_R,
        graph: {
          type: "quadtri", x, y, w: 380, h: 300, accent: ACCENT, theta: true,
          labels: { x: negNum(x), y: negNum(y) }, letters: { r: afL("r", "r") },
        },
        fields: [{ key: afL("r", "r"), prompt: afL("r = ?", "r = ?"), expected: r, hint: H_R }],
      },
      { kind: "mc", prompt: afL(`tan ${L} = ?`, `tan ${L} = ?`), options: byValue(right.label, right.value, cands), hint: H_RATIO },
    ],
    hint: afL("Plot the point, drop it onto the x-axis, and you have the same right triangle as always — x across, y up or down, r the arm itself.", "Stip die punt, laat 'n lyn na die x-as sak, en jy het dieselfde reghoekige driehoek as altyd: x links of regs, y op of af, r die arm self."),
    answerLabel: afL(`${CIRC[quadrant - 1]}, r = ${r}, tan ${L} = ${right.label}.<br>r² = ${sq(x)} + ${sq(y)}&nbsp;&nbsp;(pyth) → r = ${r} <span class="muted">always positive bc it is the radius</span>`, `${CIRC[quadrant - 1]}, r = ${r}, tan ${L} = ${right.label}.<br>r² = ${sq(x)} + ${sq(y)}&nbsp;&nbsp;(pyth) → r = ${r} <span class="muted">altyd positief want dit is die radius</span>`),
    solution: [
      { s: afL(`P(${negNum(x)} ; ${negNum(y)}) → ${CIRC[quadrant - 1]}`, `P(${negNum(x)} ; ${negNum(y)}) → ${CIRC[quadrant - 1]}`), r: afL("the two signs place the point.", "die twee tekens plaas die punt.") },
      { s: afL(`r² = ${sq(x)} + ${sq(y)} = ${x * x + y * y}`, `r² = ${sq(x)} + ${sq(y)} = ${x * x + y * y}`), r: afL("(pyth)", "(pyth)") },
      { s: afL(`r = ${r}`, `r = ${r}`), r: afL("always positive bc it is the radius.", "altyd positief want dit is die radius.") },
      { s: afL(`tan ${L} = y/x = ${right.label}`, `tan ${L} = y/x = ${right.label}`), r: afL("read it off the sketch.", "lees dit van die skets af.") },
    ],
  };
}

const SKILLS = {
  bowTieCard,
  chain1: chainItem, chain2: chainItem, chain3: chainItem, chain4: chainItem,
  substitute,
  pointVariant,
};

export const questGt8 = {
  id: "gt8",
  stackFractions: true,
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
