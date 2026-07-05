/* ============================================================
   TRIG GRAPHS QUEST 7 · Putting it together   ★ DIAGRAM
   Two graphs on one set of axes: which is higher, where a curve
   is positive, points on a graph, tap an intersection, and
   describing a transformation in words.
   ============================================================ */
import { mc } from "./_shared.js";
import { trigGraph, twoTrigGraph } from "./_tgraph.js";
import { eqStr, sind, cosd, makeTrig, FN_NAME, nstr, pick, randInt } from "../tgraphlib.js";

const ACC = "#3730a3";
const WIN = { xmin: 0, xmax: 360, ymin: -1.6, ymax: 1.6 };

const SKILLS = {
  /* which graph has the larger amplitude */
  largerAmplitude: () => {
    const af = pick([1, 2, 3]); let ag = pick([1, 2, 3]); while (ag === af) ag = pick([1, 2, 3]);
    const f = { fn: "sin", a: af, b: 1, p: 0, q: 0 }, g = { fn: "cos", a: ag, b: 1, p: 0, q: 0 };
    const win = { xmin: 0, xmax: 360, ymin: -(Math.max(af, ag) + 1), ymax: Math.max(af, ag) + 1 };
    const spec = twoTrigGraph(f, g, { accent: ACC, win, labelA: "f", labelAtA: 90, labelB: "g", labelAtB: 360 }).spec;
    return mc("trigTogether", "Which graph has the <b>larger amplitude</b>?",
      af > ag ? "f" : "g", [af > ag ? "g" : "f", "They are equal", "Neither has an amplitude"],
      { graph: spec, hint: "Amplitude is the height from the middle to a peak. The taller wave has the larger amplitude.",
        answerLabel: `${af > ag ? "f" : "g"} is taller — amplitude ${Math.max(af, ag)} vs ${Math.min(af, ag)}.` });
  },

  /* which graph is higher at a given x */
  whichGreaterAt: () => {
    const X = pick([30, 60, 120, 150, 210, 300, 330]);
    const fv = sind(X), gv = cosd(X);
    const f = { fn: "sin", a: 1, b: 1, p: 0, q: 0 }, g = { fn: "cos", a: 1, b: 1, p: 0, q: 0 };
    const spec = twoTrigGraph(f, g, {
      accent: ACC, win: WIN, labelA: "f", labelAtA: 90, labelB: "g", labelAtB: 360,
      points: [{ x: X, y: fv, on: 0, dashTo: "x" }, { x: X, y: gv, on: 1, dashTo: "x" }],
    }).spec;
    return mc("trigTogether", `At x = ${X}°, which graph is <b>higher</b>?  (f = sin x, g = cos x)`,
      fv > gv ? "f (sin x)" : "g (cos x)", [fv > gv ? "g (cos x)" : "f (sin x)", "They are equal"],
      { graph: spec, hint: "Read straight up from x on the dashed line — the higher dot is the higher graph.",
        answerLabel: `At ${X}°, ${fv > gv ? "f = sin" : "g = cos"} is higher.` });
  },

  /* where is sin x positive */
  fPositiveInterval: () => {
    const f = { fn: "sin", a: 1, b: 1, p: 0, q: 0 };
    return mc("trigTogether", "For which interval is <b>sin x &gt; 0</b> on [0° ; 360°]?",
      "0° &lt; x &lt; 180°", ["180° &lt; x &lt; 360°", "90° &lt; x &lt; 270°", "0° &lt; x &lt; 90°"],
      { graph: trigGraph(f, { accent: ACC, win: WIN }).spec,
        hint: "sin x > 0 where the graph is ABOVE the x-axis (between its x-intercepts at 0° and 180°).",
        answerLabel: "sin x > 0 for 0° < x < 180°." });
  },

  /* does a point lie on the graph */
  pointOnGraph: () => {
    const fn = pick(["sin", "cos"]);
    const f = makeTrig({ fn, a: 1, b: 1, p: 0, q: 0 });
    const X = pick([0, 90, 180, 270, 360]);
    const trueY = Math.round(f(X));
    const onIt = pick([true, false]);
    const Y = onIt ? trueY : pick([trueY + 1, trueY - 1].filter((v) => v >= -1 && v <= 1).concat(trueY === 0 ? [1, -1] : [0]));
    return {
      type: "yesno", concept: "trigTogether",
      prompt: `Does the point (${X}° ; ${nstr(Y)}) lie on y = ${fn} x?`,
      graph: trigGraph({ fn, a: 1, b: 1, p: 0, q: 0 }, { accent: ACC, win: WIN }).spec,
      yes: Y === trueY,
      hint: `Work out ${fn} ${X}° and compare it with ${nstr(Y)}.`,
      answerLabel: `${fn} ${X}° = ${nstr(trueY)}, so the point ${Y === trueY ? "does" : "does not"} lie on the graph.`,
      solution: [{ s: `${fn} ${X}° = ${nstr(trueY)}`, r: Y === trueY ? "matches" : `≠ ${nstr(Y)}` }],
    };
  },

  /* tap an intersection of f and g */
  tapIntersection: () => {
    const f = { fn: "sin", a: 1, b: 1, p: 0, q: 0 }, g = { fn: "cos", a: 1, b: 1, p: 0, q: 0 };
    const win = { xmin: 0, xmax: 180, ymin: -1.4, ymax: 1.4 };
    const iy = sind(45);                    // sin45 = cos45
    const spec = {
      type: "trigg", accent: ACC, grid: true, win, showAsym: true,
      curves: [{ ...f, tone: "a", label: "f", labelAt: 120 }, { ...g, tone: "b", label: "g", labelAt: 150 }],
      points: [
        { x: 45, y: iy, on: [0, 1], id: "int" },          // the real intersection
        { x: 90, y: 1, on: 0, id: "d1" },                  // on f only
        { x: 0, y: 1, on: 1, id: "d2" },                   // on g only
      ],
      tap: { targets: ["int", "d1", "d2"], correctId: "int" },
    };
    return {
      type: "tap", concept: "trigTogether", graph: spec, tap: spec.tap,
      prompt: "Tap a point where <b>f(x) = g(x)</b> (the curves cross).  f = sin x, g = cos x.",
      tapHint: "An intersection is where the two curves meet — the dot that sits on BOTH.",
      answerLabel: "f = g at x = 45° (where sin x and cos x cross).",
      solution: [{ s: "The graphs cross at x = 45°, where sin 45° = cos 45°." }],
    };
  },

  /* describe a transformation in words */
  transformDescribe: () => {
    const fn = pick(["sin", "cos"]);
    const kind = pick(["stretch", "shift", "reflect", "squash"]);
    let cv, correct;
    const stretchK = pick([2, 3]), shiftD = pick([2, 3, -2, -3]), bK = pick([2, 3]);
    const opts = {
      stretch: `Vertical stretch — amplitude becomes ${stretchK}`,
      shift: `Shifted ${Math.abs(shiftD)} units ${shiftD > 0 ? "up" : "down"}`,
      reflect: "Reflected in the x-axis",
      squash: `Squashed sideways — ${bK} cycles in 360° (period ${360 / bK}°)`,
    };
    if (kind === "stretch") cv = { fn, a: stretchK, b: 1, p: 0, q: 0 };
    else if (kind === "shift") cv = { fn, a: 1, b: 1, p: 0, q: shiftD };
    else if (kind === "reflect") cv = { fn, a: -1, b: 1, p: 0, q: 0 };
    else cv = { fn, a: 1, b: bK, p: 0, q: 0 };
    correct = opts[kind];
    const wrongs = Object.keys(opts).filter((k) => k !== kind).map((k) => opts[k]);
    return mc("trigParams", `Describe the transformation from y = ${fn} x to ${eqStr(cv)}.`,
      correct, wrongs,
      { graph: trigGraph(cv, { accent: ACC, midline: kind === "shift" }).spec, layout: "grid2",
        hint: "Compare amplitude (a), midline (q), orientation (sign of a) and period (b).",
        answerLabel: `${eqStr(cv)}: ${correct.toLowerCase()}.` });
  },
};

export const questTg7 = {
  id: "tg7",
  skills: [
    { id: "largerAmplitude", concept: "trigTogether", gen: SKILLS.largerAmplitude },
    { id: "whichGreaterAt", concept: "trigTogether", gen: SKILLS.whichGreaterAt },
    { id: "fPositiveInterval", concept: "trigTogether", gen: SKILLS.fPositiveInterval },
    { id: "pointOnGraph", concept: "trigTogether", gen: SKILLS.pointOnGraph },
    { id: "tapIntersection", concept: "trigTogether", gen: SKILLS.tapIntersection },
    { id: "transformDescribe", concept: "trigParams", gen: SKILLS.transformDescribe },
  ],
};
