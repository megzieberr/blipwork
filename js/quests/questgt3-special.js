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

const TRI_ITEMS = [
  { prompt: "In the 30-60-90 triangle, the side opposite 30° is…", correct: "1" },
  { prompt: "In the 30-60-90 triangle, the side opposite 60° is…", correct: "√3" },
  { prompt: "In the 30-60-90 triangle, the side opposite 90° (the hypotenuse) is…", correct: "2" },
  { prompt: "In the 45-45-90 triangle, the side opposite a 45° angle is…", correct: "1" },
  { prompt: "In the 45-45-90 triangle, the side opposite 90° (the hypotenuse) is…", correct: "√2" },
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
  return mc(CON, `${fn} ${angle}° = ?`, correct.text, wrongs,
    { hint: "Pick the two letters SOHCAHTOA gives you, then read them off the table.",
      answerLabel: `${fn} ${angle}° = ${correct.text} (from the O-A-H table).` });
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
  { prompt: "sin²θ + cos²θ = ?", correct: "1", wrongs: ["0", "sin θ · cos θ", "2"], hint: "The one identity that's true for every single θ." },
  { prompt: "Which of these is a masked identity?", correct: "cos²θ = 1 − sin²θ",
    wrongs: ["tan²θ = 1 − sin²θ", "sin²θ = 1 + cos²θ", "sin²θ − cos²θ = 1"],
    hint: "Rearrange sin²θ + cos²θ = 1 — swap one squared term for “1 minus the other”." },
  { prompt: "Which of these is a masked identity?", correct: "sin²θ = 1 − cos²θ",
    wrongs: ["tan²θ = 1 − cos²θ", "cos²θ = 1 + sin²θ", "cos²θ − sin²θ = 1"],
    hint: "Rearrange sin²θ + cos²θ = 1 the other way round." },
  { prompt: "1 − sin²θ = ?", correct: "cos²θ", wrongs: ["sin²θ", "1 + cos²θ", "−cos²θ"],
    hint: "A masked identity — swap it back to sin²θ + cos²θ = 1." },
];

const SKILLS = {
  /* C2 — the two triangles first */
  triangles: () => {
    const it = pick(TRI_ITEMS);
    const wrongs = ALL_SIDES.filter(s => s !== it.correct);
    return reveal(
      mc(CON, it.prompt, it.correct, wrongs,
        { hint: "Read the side straight across from the named angle.", answerLabel: `${it.prompt.replace(/…$/, "")} ${it.correct}.` }),
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
  masked: () => { const it = pick(MASK_ITEMS); return mc(CON, it.prompt, it.correct, it.wrongs, { hint: it.hint, answerLabel: `${it.prompt.replace("?", "")}${it.correct} — a masked identity.` }); },
};

export const questGt3 = {
  id: "gt3",
  xpOnce: true,
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
