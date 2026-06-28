/* ============================================================
   ANALYTICAL GEOMETRY · Q2 — Gradient: sign, steepness & the
   special lines.  ★ DIAGRAM
   Read a line and say whether its gradient is positive, negative,
   zero or undefined — and nail the two traps: a horizontal line
   has gradient 0, a vertical line has an undefined gradient.
   ============================================================ */
import { mc } from "./_shared.js";
import { tapQ, yesnoQ, winFor, AG } from "./_analytical.js";
import { randInt, pick, gradient } from "../analyticslib.js";

const ACC = AG[1];

/* two integer points whose line has the requested character */
function pointsFor(kind) {
  const a = randInt(-5, 5), b = randInt(-5, 5);
  if (kind === "zero") { const y = randInt(-4, 4); return { A: { x: -4, y }, B: { x: 4, y } }; }
  if (kind === "undef") { const x = randInt(-4, 4); return { A: { x, y: -4 }, B: { x, y: 4 } }; }
  const run = pick([1, 2, 3]); const rise = pick([1, 2, 3, 4]);
  const s = kind === "pos" ? 1 : -1;
  return { A: { x: -run, y: -s * rise }, B: { x: run, y: s * rise } };
}
function lineDiagram(A, B, accent = ACC) {
  return {
    type: "analytic", accent, grid: true, win: winFor([A, B], { min: 9 }),
    segs: [{ a: A, b: B, kind: "line" }],
    points: [{ x: A.x, y: A.y }, { x: B.x, y: B.y }],
  };
}

const KINDLAB = { pos: "positive", neg: "negative", zero: "zero", undef: "undefined" };

const SKILLS = {
  /* read the sign off a drawn line */
  signFromGraph: () => {
    const kind = pick(["pos", "neg", "zero", "undef"]);
    const { A, B } = pointsFor(kind);
    const correct = KINDLAB[kind];
    const wrongs = Object.values(KINDLAB).filter((v) => v !== correct);
    return mc("gradientSign", "Look at the line. Its gradient is…", correct, wrongs,
      { graph: lineDiagram(A, B),
        hint: "Read left → right. Going up = positive, down = negative, flat = 0, straight up = undefined.",
        answerLabel: `The gradient is ${correct}.` });
  },

  /* tap the line with a chosen sign (two lines drawn) */
  tapBySign: () => {
    const want = pick(["pos", "neg"]);
    const p1 = pointsFor("pos"), p2 = pointsFor("neg");
    const win = winFor([p1.A, p1.B, p2.A, p2.B], { min: 11 });
    const graph = {
      type: "analytic", accent: ACC, grid: true, win,
      segs: [
        { a: p1.A, b: p1.B, kind: "line", id: "pos", tone: "a" },
        { a: p2.A, b: p2.B, kind: "line", id: "neg", tone: "b" },
      ],
    };
    return tapQ("gradientSign", `Tap the line with a <b>${KINDLAB[want]}</b> gradient.`, graph,
      { mode: "seg", targets: ["pos", "neg"], correctId: want },
      { tapHint: "A negative-gradient line falls as you read left → right.",
        answerLabel: `The ${KINDLAB[want]}-gradient line ${want === "pos" ? "rises" : "falls"} left → right.` });
  },

  /* horizontal line */
  horizontal: () => {
    const { A, B } = pointsFor("zero");
    return mc("specialLines", "A <b>horizontal</b> line has a gradient of…", "0 (zero)",
      ["undefined", "1", "a very big number"],
      { graph: lineDiagram(A, B),
        hint: "No rise, only run → 0 ÷ run = 0.", answerLabel: "Horizontal → gradient 0." });
  },

  /* vertical line */
  vertical: () => {
    const { A, B } = pointsFor("undef");
    return mc("specialLines", "A <b>vertical</b> line has a gradient that is…", "undefined",
      ["0 (zero)", "1", "negative"],
      { graph: lineDiagram(A, B),
        hint: "No run → you would divide by 0, which is undefined.", answerLabel: "Vertical → undefined gradient." });
  },

  /* the zero-vs-undefined trap, stated */
  zeroVsUndef: () => {
    return mc("specialLines",
      "Which line has gradient <b>0</b>?", "a horizontal line",
      ["a vertical line", "a line at 45°", "every straight line"],
      { hint: "Horizontal = flat = 0. Vertical = undefined (divide by zero).",
        answerLabel: "A horizontal line has gradient 0 (a vertical line is undefined)." });
  },

  /* increasing / decreasing from the sign */
  incDec: () => {
    const neg = pick([true, false]);
    return yesnoQ("gradientSign",
      `A line with a <b>${neg ? "negative" : "positive"}</b> gradient ${neg ? "falls" : "rises"} as you read from left to right. True?`,
      true,
      { hint: "Positive gradient climbs ↗, negative gradient drops ↘.",
        answerLabel: `Yes — a ${neg ? "negative" : "positive"} gradient ${neg ? "falls ↘" : "rises ↗"}.` });
  },

  /* which is steeper (bigger |m|) */
  steeper: () => {
    let m1 = pick([1, 2, 3, 4]), m2 = pick([1, 2, 3, 4]);
    while (m2 === m1) m2 = pick([1, 2, 3, 4]);
    const s1 = pick([1, -1]), s2 = pick([1, -1]);
    const g1 = m1 * s1, g2 = m2 * s2;
    const steeper = Math.abs(g1) > Math.abs(g2) ? g1 : g2;
    const show = (v) => (v < 0 ? "−" : "") + Math.abs(v);
    return mc("gradientSign",
      `Which line is <b>steeper</b>: one with gradient ${show(g1)} or one with gradient ${show(g2)}?`,
      `gradient ${show(steeper)}`, [`gradient ${show(steeper === g1 ? g2 : g1)}`, "they are equally steep"],
      { hint: "Steepness is about the SIZE of the gradient — ignore the minus sign.",
        answerLabel: `Gradient ${show(steeper)} is steeper (bigger size, ignoring the sign).` });
  },
};

export const questAg2 = {
  id: "ag2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: (id === "horizontal" || id === "vertical" || id === "zeroVsUndef") ? "specialLines" : "gradientSign", gen,
  })),
};
