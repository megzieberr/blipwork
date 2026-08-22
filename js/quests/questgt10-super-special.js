/* ============================================================
   GENERAL TRIG · gt10 — SUPER SPECIAL SUMS: triangle sides only
   ------------------------------------------------------------
   METHODS-trig.md Part J (p36–p38). Her FLAMINGO: stand a bare
   value on a 1 (`cos 20° = t = t/1`) and it stops being a number and
   starts being a ratio you can read as a/h. Then the Short-cut —
   three ready-made first-quadrant triangles — and the one pick this
   whole round exists for: is the third side √(1 − t²) or √(t² − 1)?

   Her ruling for this round is TRIANGLE SIDES ONLY: the learner taps
   where the 1 goes and where the letter goes, then picks the third
   side. No evaluating, no substituting.

   Two build notes worth knowing:
   • The sketch is drawn at REAL coordinates for the stated angle, so
     it is to scale and verifyQuadTri() can prove it — but it carries
     NO letters at all until the learner places them (letters:{}
     blanks), because "where does the 1 go" is answered by a labelled
     picture before it is asked.
   • The angle is drawn from {35, 40, 50, 55}. Below 35° and above
     55° the midpoints of the adjacent side and the hypotenuse come
     within a fingertip of each other at phone width, and 45° would
     make sin and cos numerically equal, which would collapse the
     decoys in the "read a ratio off it" item. (The brief's 20°–70°
     is narrowed for exactly those two reasons.)
   ============================================================ */
import { pick, shuffled, mcStep, tapSideStep, argDeg } from "./_gtrig.js";
import { sinD, cosD, tanD, reduce } from "../triglib.js";

const CON = "gtrigSuperSpecial";
const ANGLES = [35, 40, 50, 55];
const VARS = ["t", "k", "p"];
const ACCENT = "#8b5cf6";
const W = 360;          // the tappable sketches: square, biggest possible hot-spots
const W_LABELLED = 470; // the read-off-it sketch: room for √(1 − t²) beside the leg

const H_ONE = "The 1 is the flamingo's leg — the value was standing on it. In cos θ = t/1, the 1 is the h of a/h; in tan θ = t/1, it is the a of o/a.";
const H_VAR = "The letter sits on whichever side the ratio names: cos is a/h, sin is o/h, tan is o/a.";
const H_THIRD = "Pythagoras decides the shape of the answer: the HYPOTENUSE squared is the one that gets the plus. If the 1 is the hypotenuse, the missing leg is √(1 − t²); if the letter is the hypotenuse, it is √(t² − 1).";
const H_READ = "Read it straight off the sketch — o, a and h are all written on it now.";

/* ------------------------------------------------------------
   The three short-cut triangles (p36), plus her `cos θ = 1/t` one.
   `scale` says which side the drawing pins to 1:
     "hyp" → x = cos, y = sin, r = 1
     "adj" → x = 1,  y = tan, r = √(t² + 1)
   Every numeric label the sketch ever shows is a real drawn length,
   so verifyQuadTri() can check it.
   ------------------------------------------------------------ */
function shapes(L, ang) {
  const sq = `${L}²`;
  return {
    cos: {
      given: `cos ${ang}° = ${L}`, scale: "hyp",
      one: "hyp", letter: "adj", third: "opp",
      thirdLabel: `√(1 − ${sq})`,
      decoys: [`√(${sq} − 1)`, `√(1 + ${sq})`, `1 − ${L}`],
      labels: { r: "1", x: L, y: `√(1 − ${sq})` },
      ratios: { sin: `√(1 − ${sq})`, cos: `${L}`, tan: `√(1 − ${sq})/${L}` },
    },
    sin: {
      given: `sin ${ang}° = ${L}`, scale: "hyp",
      one: "hyp", letter: "opp", third: "adj",
      thirdLabel: `√(1 − ${sq})`,
      decoys: [`√(${sq} − 1)`, `√(1 + ${sq})`, `1 − ${L}`],
      labels: { r: "1", y: L, x: `√(1 − ${sq})` },
      ratios: { sin: `${L}`, cos: `√(1 − ${sq})`, tan: `${L}/√(1 − ${sq})` },
    },
    tan: {
      given: `tan ${ang}° = ${L}`, scale: "adj",
      one: "adj", letter: "opp", third: "hyp",
      thirdLabel: `√(${sq} + 1)`,
      decoys: [`√(1 − ${sq})`, `√(${sq} − 1)`, `${L} + 1`],
      labels: { x: "1", y: L, r: `√(${sq} + 1)` },
      ratios: { sin: `${L}/√(${sq} + 1)`, cos: `1/√(${sq} + 1)`, tan: `${L}` },
    },
    cosinv: {
      given: `cos ${ang}° = 1/${L}`, scale: "adj",
      one: "adj", letter: "hyp", third: "opp",
      thirdLabel: `√(${sq} − 1)`,
      decoys: [`√(1 − ${sq})`, `√(${sq} + 1)`, `${L} − 1`],
      labels: { x: "1", r: L, y: `√(${sq} − 1)` },
      ratios: { sin: `√(${sq} − 1)/${L}`, cos: `1/${L}`, tan: `√(${sq} − 1)` },
    },
  };
}

/* the real first-quadrant coordinates for a shape, at its angle */
function coords(shape, ang) {
  return shape.scale === "hyp"
    ? { x: cosD(ang), y: sinD(ang) }
    : { x: 1, y: tanD(ang) };
}
/* The frame is WIDER when the sides carry their names: "√(1 − t²)" is a
   long label and it sits just outside the vertical leg, so at 375 px it
   ran off the edge of the picture. A wider viewBox with the same height
   leaves the triangle exactly the same size (the height is what limits
   the scale) and just gives the writing somewhere to go. The TAPPABLE
   sketches keep the square frame — widening those would shrink the
   hot-spots on a phone for no reason, since they carry no labels. */
function sketchSpec(shape, ang, opts = {}) {
  const { x, y } = coords(shape, ang);
  return {
    type: "quadtri", x, y, w: opts.labels ? W_LABELLED : W, h: W, accent: ACCENT,
    theta: true, thetaLabel: `${ang}°`,
    // blank letters: NOTHING is written on the sketch until the
    // learner puts it there (no answer leak, brief rule 5)
    letters: { x: "", y: "", r: "" },       // blank unless `labels` fills a side in
    labels: opts.labels || undefined,
  };
}

/* ------------------------------------------------------------
   1 · THE FLAMINGO CARD (p36)
   ------------------------------------------------------------ */
function flamingoCard() {
  const L = pick(VARS), ang = pick(ANGLES);
  return {
    type: "mc", concept: CON,
    _dbg: { equalities: [] },
    prompt: `You are told cos ${ang}° = ${L}. Why do we immediately write it as ${L}/1?`,
    // learner-facing copy: no page refs, no third person (foreman ruling)
    reveal: [`<div><b>The flamingo.</b> A bare value cannot be read off a triangle. Stand it on a 1 and it becomes a ratio:</div>`
      + `<div class="formula">cos ${ang}° = ${L} = ${L}/1 = a/h</div>`
      + `<div class="muted small">Now the ${L} is the <b>a</b>, the 1 is the <b>h</b>, and the triangle draws itself.</div>`],
    options: shuffled([
      { label: "so the bare number becomes a ratio you can read as a/h", correct: true },
      { label: `so the ${L} cancels later on`, correct: false },
      { label: "because every hypotenuse is 1", correct: false },
      { label: `to turn ${L} into a whole number`, correct: false },
    ]),
    hint: "Ratios are the only thing a triangle understands. A single value has to be given a bottom before it can name two sides.",
    answerLabel: `Standing ${L} on a 1 turns it into a ratio — ${L}/1 = a/h — so ${L} is the adjacent side and 1 is the hypotenuse. That is the flamingo.`,
    solution: [{ s: `cos ${ang}° = ${L}/1 = a/h`, r: "flamingo — a value standing on a 1." }],
  };
}

/* ------------------------------------------------------------
   2–5 · THE SHORT-CUT TRIANGLES: place the 1, place the letter,
   then pick the third side. That last pick IS this round.
   ------------------------------------------------------------ */
function shortcutItem(key) {
  return function () {
    const L = pick(VARS), ang = pick(ANGLES);
    const shape = shapes(L, ang)[key];
    return {
      type: "steps", concept: CON,
      _dbg: { key, L, ang, one: shape.one, letter: shape.letter, third: shape.third, thirdLabel: shape.thirdLabel },
      prompt: `${shape.given}. Build the triangle.`,
      graph: sketchSpec(shape, ang),
      steps: [
        tapSideStep("Where does the 1 go?", shape.one, H_ONE, { placeLabel: "1", tapHint: "Tap the side it belongs on." }),
        tapSideStep(`And where does ${L} go?`, shape.letter, H_VAR, { placeLabel: L, tapHint: "Tap the side it belongs on." }),
        mcStep("So the third side is…", shape.thirdLabel, shape.decoys, H_THIRD),
      ],
      hint: H_ONE,
      answerLabel: `${shape.given} → ${shape.one === "hyp" ? "1 on the hypotenuse" : "1 on the adjacent"}, ${L} on the ${shape.letter === "hyp" ? "hypotenuse" : shape.letter === "adj" ? "adjacent" : "opposite"}, third side ${shape.thirdLabel} (pyth).`,
      solution: [
        { s: `${shape.given} = ${key === "cosinv" ? `1/${L}` : `${L}/1`}`, r: "flamingo — stand it on a 1." },
        { s: `1 → ${shape.one}, ${L} → ${shape.letter}`, r: "read the ratio: cos = a/h, sin = o/h, tan = o/a." },
        { s: `third side = ${shape.thirdLabel}`, r: "(pyth) — the hypotenuse squared is the one with the plus." },
      ],
    };
  };
}

/* ------------------------------------------------------------
   6 · READ A RATIO OFF THE FINISHED TRIANGLE (p37 e)
   ------------------------------------------------------------ */
function readRatio() {
  const L = pick(VARS), ang = pick(ANGLES);
  const key = pick(["cos", "sin", "tan", "cosinv"]);
  const shape = shapes(L, ang)[key];
  // never ask back for the ratio the question just handed over —
  // "cos 40° = p, so cos 40° = ?" is a free mark, not a question
  const givenRatio = key === "cosinv" ? "cos" : key;
  const ask = pick(["sin", "cos", "tan"].filter(f => f !== givenRatio));
  const FNV = { sin: sinD, cos: cosD, tan: tanD };
  const trueValue = FNV[ask](ang);
  const cands = ["sin", "cos", "tan"].filter(f => f !== ask)
    .map(f => ({ label: shape.ratios[f], value: FNV[f](ang) }));
  cands.push({ label: `1/(${shape.ratios[ask]})`, value: 1 / trueValue });
  const seen = [trueValue];
  const decoys = [];
  cands.forEach(c => {
    if (decoys.length >= 3) return;
    if (seen.some(v => Math.abs(v - c.value) < 1e-9)) return;
    seen.push(c.value); decoys.push({ label: c.label, correct: false });
  });
  return {
    type: "mc", concept: CON,
    _dbg: { key, L, ang, ask, label: shape.ratios[ask], value: trueValue },
    prompt: `${shape.given}. Read ${ask} ${ang}° off the sketch, in terms of ${L}.`,
    graph: sketchSpec(shape, ang, { labels: shape.labels }),
    options: shuffled([{ label: shape.ratios[ask], correct: true }, ...decoys]),
    hint: H_READ,
    answerLabel: `${ask} ${ang}° = ${shape.ratios[ask]} — every side is on the sketch now, so it is just o, a and h in the right places.`,
    solution: [{ s: `${ask} ${ang}° = ${shape.ratios[ask]}`, r: "read off the finished triangle." }],
  };
}

/* ------------------------------------------------------------
   7 · REDUCE, THEN READ (p37 a–c, p38 a–f)
   The target angle is reduced to the acute one first — THEN the
   triangle answers it. Everything is confirmed numerically at the
   stated angle before the question is handed over.
   ------------------------------------------------------------ */
const TARGET_FORMS = [
  { text: "180 − A", f: A => 180 - A },
  { text: "180 + A", f: A => 180 + A },
  { text: "360 − A", f: A => 360 - A },
  { text: "−A", f: A => -A },
  { text: "90 − A", f: A => 90 - A },
  { text: "90 + A", f: A => 90 + A },
  { text: "A − 360", f: A => A - 360 },
];
function reduceThenRead() {
  const L = pick(VARS), ang = pick(ANGLES);
  const givenFn = pick(["sin", "cos"]);
  const key = givenFn === "cos" ? "cos" : "sin";
  const shape = shapes(L, ang)[key];
  const FNV = { sin: sinD, cos: cosD };

  const askFn = pick(["sin", "cos"]);
  const form = pick(TARGET_FORMS);
  const target = form.f(ang);
  const want = FNV[askFn](target);

  /* the four things the triangle can say, as label + value */
  const other = givenFn === "sin" ? "cos" : "sin";
  const pool = [
    { label: L, value: FNV[givenFn](ang) },
    { label: `−${L}`, value: -FNV[givenFn](ang) },
    { label: `√(1 − ${L}²)`, value: FNV[other](ang) },
    { label: `−√(1 − ${L}²)`, value: -FNV[other](ang) },
  ];
  const hit = pool.find(p => Math.abs(p.value - want) < 1e-9);
  if (!hit) throw new Error(`gt10: ${askFn}(${target}) does not reduce onto the ${ang}° triangle`);

  const r = reduce(askFn, target);
  const converts = Math.abs(r.ref - ang) > 1e-9;
  const co = askFn === "sin" ? "cos" : "sin";       // what a co-function turns the asked ratio into
  // her 0.1 habit: the split written in a small note ABOVE the angle
  const split = r.form === "θ" ? "" : r.form === "−θ" ? `−${r.ref}` : `${r.form}${r.ref}`;

  return {
    type: "mc", concept: CON,
    _dbg: {
      L, ang, givenFn, askFn, target, label: hit.label, value: want,
      equalities: [{ a: () => FNV[askFn](target), b: () => hit.value, label: `${askFn}${argDeg(target)} = ${hit.label}` }],
    },
    prompt: `${givenFn} ${ang}° = ${L}. Write ${askFn}${argDeg(target)} in terms of ${L}.`,
    options: shuffled(pool.map(p => ({ label: p.label, correct: p === hit }))),
    hint: "Reduce it to an acute angle first — write the split above the angle — and only then read the answer off the triangle. If the acute angle that comes out is not the one you were given, a co-function is hiding in it.",
    answerLabel: `${askFn}${argDeg(target)} = ${hit.label}`
      + `<br><span class="muted small">${r.turns.length ? `[${r.turns.join(" ")}] → ` : ""}${split ? split + " → " : ""}${r.sign < 0 ? "−" : ""}${askFn} ${r.ref}°${converts ? ` = ${r.sign < 0 ? "−" : ""}${co} ${ang}°` : ""}</span>`,
    solution: [
      { s: `${askFn}${argDeg(target)} = ${r.sign < 0 ? "−" : ""}${askFn} ${r.ref}°`, r: split ? `the split: ${split}.` : "reduce to the acute angle first." },
      ...(converts ? [{ s: `${askFn} ${r.ref}° = ${co} ${ang}°`, r: "co-function — the two angles add to 90°." }] : []),
      { s: `= ${hit.label}`, r: "read it off the triangle." },
    ],
  };
}

const SKILLS = {
  flamingoCard,
  shortcutCos: shortcutItem("cos"),
  shortcutSin: shortcutItem("sin"),
  shortcutTan: shortcutItem("tan"),
  shortcutCosInv: shortcutItem("cosinv"),
  readRatio,
  readRatio2: readRatio,
  /* reduceThenRead CUT 2026-08-22 evening — her ruling: "remove the rounds that
     ask the question like this without the sketch… the whole exercise is to
     read from a sketch, not do it in your head". Its slot goes to a second
     read-off-the-sketch item. The generator stays below, unused, in case she
     wants it back WITH a sketch. */
};

export const questGt10 = {
  id: "gt10",
  stackFractions: true,
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
