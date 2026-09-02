/* ============================================================
   GENERAL TRIG · gt3 — Special angles & identities (discovery)
   ------------------------------------------------------------
   METHODS-trig.md Part C (p06, p25, p39–p43). The two triangles
   FIRST, then Oats Are Healthy built in her order, then picking
   values (unrationalised, flag F12), quadrantal angles read off
   the graph, reciprocals ("look at the 3rd letter"), and masked
   identities. Discovery round: xpOnce (first pass only).
   Every value is COMPUTED by triglib's specialExact — the table
   text is only how she WRITES the number, never how it's decided.
   Never a bare 9-value grid (her standing dislike) — two triangles,
   then the O-A-H table, built stage by stage.
   ============================================================ */
import { mc, pick, shuffled, oahTable, OAH_TABLE, special45Spec, special30Spec } from "./_gtrig.js";
import { specialExact } from "../triglib.js";
import { renderTriangle } from "../engine/triangle-graph.js";

const CON = "gtrigSpecial";

function reveal(q, frames, mode) { q.reveal = frames; if (mode) q.revealMode = mode; return q; }

const TRIANGLE_FRAMES = [
  renderTriangle(special45Spec()),
  renderTriangle(special30Spec()),
  `<div style="font-size:14.5px;line-height:1.6">Where they come from: cut a <b>square</b> corner to corner and you get 45-45-90; cut an <b>equilateral triangle</b> straight down the middle and you get 30-60-90.</div>`,
];
const OAH_FRAMES = [0, 1, 2, 3, 4, 5].map(s => oahTable(s));

/* Each item's `sol` is the triangle's OWN story — the cut she describes in
   TRIANGLE_FRAMES frame 3, then Pythagoras. No value is restated without
   being built first (2026-09-02 methods batch, session S3). */
const CUT_EQUI = { s: "Take an equilateral triangle with sides of 2 and cut it straight down the middle", r: "that cut is where the 30-60-90 comes from" };
const CUT_SQUARE = { s: "Take a square with sides of 1 and cut it corner to corner", r: "that cut is where the 45-45-90 comes from" };
const TRI_ITEMS = [
  { prompt: "In the 30-60-90 triangle, the side opposite 30° is…", correct: "1",
    sol: [CUT_EQUI,
      { s: "The cut halves the 60° top angle into 30°, and halves the base of 2 into 1" },
      { s: "That half-base lies straight across from the 30° corner, so it is 1" }] },
  { prompt: "In the 30-60-90 triangle, the side opposite 60° is…", correct: "√3",
    sol: [CUT_EQUI,
      { s: "Base = 1, slanted side = 2, so height² = 2² − 1² = 3", r: "(pyth)" },
      { s: "height = √3, and it sits across from the 60° corner, so that side is √3" }] },
  { prompt: "In the 30-60-90 triangle, the side opposite 90° (the hypotenuse) is…", correct: "2",
    sol: [CUT_EQUI,
      { s: "The cut does not touch the slanted side — it is still a whole side of the equilateral triangle" },
      { s: "That slanted side faces the right angle, so the hypotenuse is 2" }] },
  { prompt: "In the 45-45-90 triangle, the side opposite a 45° angle is…", correct: "1",
    sol: [CUT_SQUARE,
      { s: "The two short sides of the new triangle are just sides of the square, so each is 1" },
      { s: "Each of them faces one of the 45° corners, so that side is 1" }] },
  { prompt: "In the 45-45-90 triangle, the side opposite 90° (the hypotenuse) is…", correct: "√2",
    sol: [CUT_SQUARE,
      { s: "The two short sides are 1 and 1, so hyp² = 1² + 1² = 2", r: "(pyth)" },
      { s: "hyp = √2, and it faces the right angle, so the hypotenuse is √2" }] },
];
const ALL_SIDES = ["1", "√3", "2", "√2"];

const ANGLES = [30, 45, 60], FNS = ["sin", "cos", "tan"];
function pickValueQ() {
  const angle = pick(ANGLES), fn = pick(FNS);
  const correct = specialExact(fn, angle);
  const seen = [correct.value];
  const pool = [];
  ANGLES.forEach(a => FNS.forEach(f => {
    if (f === fn && a === angle) return;
    const r = specialExact(f, a);
    if (r.value == null || seen.some(v => Math.abs(v - r.value) < 1e-9)) return;
    seen.push(r.value); pool.push(r);
  }));
  const wrongs = shuffled(pool).slice(0, 3).map(p => p.text);
  // the finished O-A-H table sits ABOVE the question (her ruling 2026-08-22: the
  // table must be on screen when a value is asked — it is a reading exercise)
  /* the two O-A-H letters SOHCAHTOA hands you, then the cell values —
     tan 45° comes out as 1/1 and tan 60° as √3/1, written as fractions
     off the table exactly as she does (METHODS-trig C7) */
  const LETTERS = { sin: ["O", "H"], cos: ["A", "H"], tan: ["O", "A"] }[fn];
  /* cellTop / cellBot, never `top` — her standing rule against a `top`
     binding anywhere in this app's JS, even a function-scoped one */
  const cellTop = OAH_TABLE[LETTERS[0]][angle], cellBot = OAH_TABLE[LETTERS[1]][angle];
  const raw = `${cellTop}/${cellBot}`;
  return mc(CON, `<div class="q-oah">${oahTable(5)}</div>${fn} ${angle}° = ?`, correct.text, wrongs,
    { hint: "Pick the two letters SOHCAHTOA gives you, then read them off the table.",
      answerLabel: `${fn} ${angle}° = ${correct.text} (from the O-A-H table).`,
      solution: [
        { s: `${fn === "sin" ? "SOH" : fn === "cos" ? "CAH" : "TOA"}: ${fn} = ${LETTERS[0]}/${LETTERS[1]}`, r: "SOHCAHTOA picks the two letters" },
        { s: `In the ${angle}° column: ${LETTERS[0]} = ${cellTop} and ${LETTERS[1]} = ${cellBot}`, r: "read the two cells off the O-A-H table" },
        { s: raw === correct.text ? `${fn} ${angle}° = ${raw}` : `${fn} ${angle}° = ${raw} = ${correct.text}` },
      ] });
}

const QANGLES = [0, 90, 180, 270, 360], QFNS = ["sin", "cos"];
function quadrantalQ() {
  const angle = pick(QANGLES), fn = pick(QFNS);
  const correct = specialExact(fn, angle);
  const seen = [correct.value];
  const pool = [];
  QANGLES.forEach(a => QFNS.forEach(f => {
    if (f === fn && a === angle) return;
    const r = specialExact(f, a);
    if (r.value == null || seen.some(v => Math.abs(v - r.value) < 1e-9)) return;
    seen.push(r.value); pool.push(r);
  }));
  const wrongs = shuffled(pool).slice(0, 3).map(p => p.text);
  const graph = { type: "trigg", w: 380, h: 200, win: { xmin: 0, xmax: 360, ymin: -1.3, ymax: 1.3 }, xstep: 90, grid: true,
    curves: [{ fn, a: 1, b: 1, p: 0, q: 0, tone: "a" }] };   // no points[] — the picture never labels the answer
  return mc(CON, `${fn} ${angle}° = ?`, correct.text, wrongs,
    { hint: "Read it straight off the picture (or type it into the calculator).", graph,
      answerLabel: `${fn} ${angle}° = ${correct.text}, read off the graph.` });
}

const RECIP_ITEMS = [
  { prompt: "tan θ = ?", correct: "sin θ / cos θ", wrongs: ["cos θ / sin θ", "1 / sin θ", "sin θ · cos θ"], hint: "tan is the ratio of sin to cos." },
  { prompt: "sec θ = 1 / ?", correct: "cos θ", wrongs: ["sin θ", "tan θ"], hint: "“Look at the 3rd letter” — se<b>c</b> → cos." },
  { prompt: "cosec θ = 1 / ?", correct: "sin θ", wrongs: ["cos θ", "tan θ"], hint: "“Look at the 3rd letter” — co<b>s</b>ec → sin." },
  { prompt: "cot θ = 1 / ?", correct: "tan θ", wrongs: ["sin θ", "cos θ"], hint: "“Look at the 3rd letter” — co<b>t</b> → tan." },
];

const MASK_ITEMS = [
  { prompt: "sin²θ + cos²θ = ?", correct: "1", wrongs: ["0", "sin θ · cos θ", "2"], hint: "The one identity that's true for every single θ.",
    sol: [
      { s: "Take any point on the circle: sin θ = y/r and cos θ = x/r" },
      { s: "sin²θ + cos²θ = (y² + x²)/r², and x² + y² = r²", r: "(pyth)" },
      { s: "So sin²θ + cos²θ = r²/r² = 1", r: "true for every θ, which is why it is THE identity" },
    ] },
  { prompt: "Which of these is a masked identity?", correct: "cos²θ = 1 − sin²θ",
    wrongs: ["tan²θ = 1 − sin²θ", "sin²θ = 1 + cos²θ", "sin²θ − cos²θ = 1"],
    hint: "Rearrange sin²θ + cos²θ = 1 — swap one squared term for “1 minus the other”.",
    sol: [
      { s: "Start from sin²θ + cos²θ = 1" },
      { s: "Take sin²θ across to the other side: cos²θ = 1 − sin²θ", r: "the same identity wearing a mask" },
      { s: "The two wrong-looking ones bring in tan, or turn the − into a +", r: "only one term ever moves, and it changes sign" },
    ] },
  { prompt: "Which of these is a masked identity?", correct: "sin²θ = 1 − cos²θ",
    wrongs: ["tan²θ = 1 − cos²θ", "cos²θ = 1 + sin²θ", "cos²θ − sin²θ = 1"],
    hint: "Rearrange sin²θ + cos²θ = 1 the other way round.",
    sol: [
      { s: "Start from sin²θ + cos²θ = 1" },
      { s: "This time take cos²θ across: sin²θ = 1 − cos²θ", r: "the other mask of the same identity" },
      { s: "Crossing the = always flips the sign, so it is 1 MINUS the other one", r: "never 1 + …" },
    ] },
  { prompt: "1 − sin²θ = ?", correct: "cos²θ", wrongs: ["sin²θ", "1 + cos²θ", "−cos²θ"],
    hint: "A masked identity — swap it back to sin²θ + cos²θ = 1.",
    sol: [
      { s: "sin²θ + cos²θ = 1, so cos²θ = 1 − sin²θ" },
      { s: "Read that backwards: wherever you see 1 − sin²θ you may write cos²θ", r: "spotting the mask is the whole skill" },
    ] },
];

const SKILLS = {
  /* C2 — the two triangles first */
  triangles: () => {
    const it = pick(TRI_ITEMS);
    const wrongs = ALL_SIDES.filter(s => s !== it.correct);
    return reveal(
      mc(CON, it.prompt, it.correct, wrongs,
        { hint: "Read the side straight across from the named angle.", answerLabel: `${it.prompt.replace(/…$/, "")} ${it.correct}.`,
          solution: it.sol }),
      TRIANGLE_FRAMES);
  },

  /* C3 — Oats Are Healthy, built in her order */
  oahRead: () => {
    const rows = ["O", "A", "H"], cols = [30, 45, 60];
    const row = pick(rows), col = pick(cols);
    const correct = OAH_TABLE[row][col];
    const decoys = ALL_SIDES.filter(v => v !== correct);
    return reveal(
      mc(CON, `Read the table: the ${row} value for ${col}° is…`, correct, decoys,
        { hint: "Oats Are Healthy — O, A, H down the side; 30°, 45°, 60° across the top.", answerLabel: `${row} at ${col}° = ${correct}.` }),
      OAH_FRAMES, "replace");
  },

  /* C3 — pick the value (two slides drawing from the same 9 combos) */
  pickValue1: () => pickValueQ(),
  pickValue2: () => pickValueQ(),

  /* C4 — quadrantal angles, read off the graph */
  quadrantal: () => quadrantalQ(),

  /* C5/C6 — the tan identity + reciprocals */
  reciprocals: () => { const it = pick(RECIP_ITEMS); return mc(CON, it.prompt, it.correct, it.wrongs, { hint: it.hint, answerLabel: `${it.prompt.replace("?", "")}${it.correct}.` }); },

  /* C6 — masked identities */
  masked: () => { const it = pick(MASK_ITEMS); return mc(CON, it.prompt, it.correct, it.wrongs, { hint: it.hint, answerLabel: `${it.prompt.replace("?", "")}${it.correct} — a masked identity.`, solution: it.sol }); },
};

export const questGt3 = {
  id: "gt3",
  stackFractions: true,
  // xpOnce REMOVED 2026-08-22 evening — her ruling: the questions rotate every
  // play, so the discovery rounds pay like any other round (full first time, 25% on replay).
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
