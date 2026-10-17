/* ============================================================
   ANALYTICAL GEOMETRY · Q2 — Gradient: sign, steepness & the
   special lines.  ★ DIAGRAM
   Read a line and say whether its gradient is positive, negative,
   zero or undefined — and nail the two traps: a horizontal line
   has gradient 0, a vertical line has an undefined gradient.
   ============================================================ */
import { mc } from "./_shared.js";
import { yesnoQ, winFor, letterLines, layoutPointLabels, AG } from "./_analytical.js";
import { randInt, pick, randSegment, gradFrac, gradFracOf, ptStr, C, neg } from "../analyticslib.js";
import { L } from "../lang.js";

const ACC = AG[1];

/* two integer points whose line has the requested character */
function pointsFor(kind) {
  const a = randInt(-5, 5), b = randInt(-5, 5);
  if (kind === "flat") { const y = randInt(-4, 4); return { A: { x: -4, y }, B: { x: 4, y } }; }
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

const KINDLAB = { pos: L("positive", "positief"), neg: L("negative", "negatief"), flat: L("zero", "nul"), undef: L("undefined", "onbepaald") };

const SKILLS = {
  /* read the sign off a drawn line */
  signFromGraph: () => {
    const kind = pick(["pos", "neg", "flat", "undef"]);
    const { A, B } = pointsFor(kind);
    const correct = KINDLAB[kind];
    const wrongs = Object.values(KINDLAB).filter((v) => v !== correct);
    return mc("gradientSign", L("Look at the line. Its gradient is…", "Kyk na die lyn. Sy gradiënt is…"), correct, wrongs,
      { graph: lineDiagram(A, B),
        hint: L("Read left → right. Going up = positive, down = negative, flat = 0, straight up = undefined.", "Lees links → regs. Op = positief, af = negatief, plat = 0, regop = onbepaald."),
        answerLabel: L(`The gradient is ${correct}.`, `Die gradiënt is ${correct}.`) });
  },

  /* which of two lettered lines has a chosen sign (pick A or B) */
  whichBySign: () => {
    const want = pick(["pos", "neg"]);
    const p1 = pointsFor("pos"), p2 = pointsFor("neg");
    const win = winFor([p1.A, p1.B, p2.A, p2.B], { min: 11 });
    const segs = [
      { a: p1.A, b: p1.B, kind: "line", id: "pos", tone: "a" },
      { a: p2.A, b: p2.B, kind: "line", id: "neg", tone: "b" },
    ];
    const letter = letterLines(segs, [L("A", "A"), L("B", "B")]);
    const graph = { type: "analytic", accent: ACC, grid: true, win, segs };
    return mc("gradientSign",
      L(`Which line has a <b>${KINDLAB[want]}</b> gradient?`, `Watter lyn se gradiënt is <b>${KINDLAB[want]}</b>?`),
      L(`Line ${letter[want]}`, `Lyn ${letter[want]}`), [L(`Line ${letter[want === "pos" ? "neg" : "pos"]}`, `Lyn ${letter[want === "pos" ? "neg" : "pos"]}`)],
      { graph,
        hint: L("A positive-gradient line rises ↗ and a negative one falls ↘ as you read left → right.", "'n Lyn met 'n positiewe gradiënt styg ↗ en een met 'n negatiewe gradiënt daal ↘ as jy links → regs lees."),
        answerLabel: L(`Line ${letter[want]} — the ${KINDLAB[want]}-gradient line ${want === "pos" ? "rises ↗" : "falls ↘"}.`, `Lyn ${letter[want]}: die gradiënt is ${KINDLAB[want]}, want die lyn ${want === "pos" ? "styg ↗" : "daal ↘"}.`) });
  },

  /* horizontal line */
  horizontal: () => {
    const { A, B } = pointsFor("flat");
    return mc("specialLines", L("A <b>horizontal</b> line has a gradient of…", "'n <b>Horisontale</b> lyn het 'n gradiënt van…"), L("0 (zero)", "0 (nul)"),
      [L("undefined", "onbepaald"), "1", L("a very big number", "'n baie groot getal")],
      { graph: lineDiagram(A, B),
        hint: L("No rise, only run → 0 ÷ run = 0.", "Geen styging, net loop → 0 ÷ loop = 0."), answerLabel: L("Horizontal → gradient 0.", "Horisontaal → gradiënt 0.") });
  },

  /* vertical line */
  vertical: () => {
    const { A, B } = pointsFor("undef");
    return mc("specialLines", L("A <b>vertical</b> line has a gradient that is…", "'n <b>Vertikale</b> lyn se gradiënt is…"), L("undefined", "onbepaald"),
      [L("0 (zero)", "0 (nul)"), "1", L("negative", "negatief")],
      { graph: lineDiagram(A, B),
        hint: L("No run → you would divide by 0, which is undefined.", "Geen loop → jy sou deur 0 deel, en dit is onbepaald."), answerLabel: L("Vertical → undefined gradient.", "Vertikaal → onbepaalde gradiënt.") });
  },

  /* the zero-vs-undefined trap, stated */
  zeroVsUndef: () => {
    return mc("specialLines",
      L("Which line has gradient <b>0</b>?", "Watter lyn het gradiënt <b>0</b>?"), L("a horizontal line", "'n horisontale lyn"),
      [L("a vertical line", "'n vertikale lyn"), L("a line at 45°", "'n lyn teen 45°"), L("every straight line", "elke reguit lyn")],
      { hint: L("Horizontal = flat = 0. Vertical = undefined (divide by zero).", "Horisontaal = plat = 0. Vertikaal = onbepaald (deel deur nul)."),
        answerLabel: L("A horizontal line has gradient 0 (a vertical line is undefined).", "'n Horisontale lyn het gradiënt 0 ('n vertikale lyn is onbepaald).") });
  },

  /* increasing / decreasing from the sign — sometimes stated WRONG, so the
     answer isn't always "yes" */
  incDec: () => {
    const negative = pick([true, false]);
    const saysFalls = pick([true, false]);
    const truth = negative === saysFalls;
    const really = negative ? L("falls ↘", "daal ↘") : L("rises ↗", "styg ↗");
    return yesnoQ("gradientSign",
      L(`A line with a <b>${negative ? "negative" : "positive"}</b> gradient <b>${saysFalls ? "falls" : "rises"}</b> as you read from left to right. True?`, `'n Lyn met 'n <b>${negative ? "negatiewe" : "positiewe"}</b> gradiënt <b>${saysFalls ? "daal" : "styg"}</b> as jy van links na regs lees. Waar?`),
      truth,
      { hint: L("Positive gradient climbs ↗, negative gradient drops ↘.", "Positiewe gradiënt klim ↗, negatiewe gradiënt daal ↘."),
        answerLabel: truth
          ? L(`Yes — a ${negative ? "negative" : "positive"} gradient ${really}.`, `Ja, 'n ${negative ? "negatiewe" : "positiewe"} gradiënt ${really}.`)
          : L(`No — a ${negative ? "negative" : "positive"} gradient ${really}.`, `Nee, 'n ${negative ? "negatiewe" : "positiewe"} gradiënt ${really}.`) });
  },

  /* compute the gradient from two labelled points (the bread-and-butter skill) */
  fromPoints: () => {
    let A, B;
    do { ({ A, B } = randSegment(-5, 5, 3)); }
    while (B.y === A.y || Math.abs(B.y - A.y) === Math.abs(B.x - A.x));  // keep m ≠ 0, |m| ≠ 1 so every decoy stays distinct
    const dy = B.y - A.y, dx = B.x - A.x;
    const correct = gradFracOf(A, B).str;
    const wrap = (v) => (v < 0 ? `(${neg(C(v))})` : C(v));
    const graph = layoutPointLabels({
      type: "analytic", accent: ACC, grid: true, win: winFor([A, B], { pad: 2 }),
      segs: [{ a: A, b: B }],
      points: [{ x: A.x, y: A.y, label: `A${ptStr(A)}`, place: "auto" }, { x: B.x, y: B.y, label: `B${ptStr(B)}`, place: "auto" }],
    });
    return mc("whichFormula",
      L(`A${ptStr(A)} and B${ptStr(B)} lie on a line. The gradient of AB is…`, `A${ptStr(A)} en B${ptStr(B)} lê op 'n lyn. Die gradiënt van AB is…`),
      correct,
      [gradFrac(dx, dy).str,      // flipped: run over rise
       gradFrac(-dy, dx).str,     // mixed the subtraction order → wrong sign
       gradFrac(dx, -dy).str],    // flipped AND wrong sign
      { graph,
        hint: L("m = (y<sub>B</sub> − y<sub>A</sub>) / (x<sub>B</sub> − x<sub>A</sub>) — keep the points in the SAME order top and bottom.", "m = (y<sub>B</sub> − y<sub>A</sub>) / (x<sub>B</sub> − x<sub>A</sub>): hou die punte in DIESELFDE volgorde bo en onder."),
        answerLabel: L(`m<sub>AB</sub> = ${correct}.`, `m<sub>AB</sub> = ${correct}.`),
        solution: [
          { s: L("m<sub>AB</sub> = (y<sub>B</sub> − y<sub>A</sub>) / (x<sub>B</sub> − x<sub>A</sub>)", "m<sub>AB</sub> = (y<sub>B</sub> − y<sub>A</sub>) / (x<sub>B</sub> − x<sub>A</sub>)") },
          { s: `= (${neg(C(B.y))} − ${wrap(A.y)}) / (${neg(C(B.x))} − ${wrap(A.x)})`, r: L("substitute B then A, top and bottom", "vervang B, dan A, bo en onder") },
          { s: `= ${neg(C(dy))} / ${neg(C(dx))} = ${correct}` },
        ] });
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
      L(`Which line is <b>steeper</b>: one with gradient ${show(g1)} or one with gradient ${show(g2)}?`, `Watter lyn is <b>steiler</b>: een met gradiënt ${show(g1)} of een met gradiënt ${show(g2)}?`),
      L(`gradient ${show(steeper)}`, `gradiënt ${show(steeper)}`), [L(`gradient ${show(steeper === g1 ? g2 : g1)}`, `gradiënt ${show(steeper === g1 ? g2 : g1)}`), L("they are equally steep", "hulle is ewe steil")],
      { hint: L("Steepness is about the SIZE of the gradient — ignore the minus sign.", "Steilte gaan oor die GROOTTE van die gradiënt: ignoreer die minusteken."),
        answerLabel: L(`Gradient ${show(steeper)} is steeper (bigger size, ignoring the sign).`, `Gradiënt ${show(steeper)} is steiler (groter as jy die teken ignoreer).`) });
  },
};

export const questAg2 = {
  id: "ag2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id,
    concept: (id === "horizontal" || id === "vertical" || id === "zeroVsUndef") ? "specialLines"
      : id === "fromPoints" ? "whichFormula" : "gradientSign",
    gen,
  })),
};
