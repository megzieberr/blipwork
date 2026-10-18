/* ============================================================
   TRIG GRAPHS QUEST 7 · Putting it together   ★ DIAGRAM
   Two graphs on one set of axes: which is higher, where a curve
   is positive, points on a graph, tap an intersection, and
   describing a transformation in words.
   ============================================================ */
import { mc } from "./_shared.js";
import { trigGraph, twoTrigGraph } from "./_tgraph.js";
import { eqStr, sind, cosd, makeTrig, FN_NAME, nstr, pick, randInt } from "../tgraphlib.js";
import { L } from "../lang.js";

const ACC = "#3730a3";
const WIN = { xmin: 0, xmax: 360, ymin: -1.6, ymax: 1.6 };

const SKILLS = {
  /* which graph has the larger amplitude */
  largerAmplitude: () => {
    const af = pick([1, 2, 3]); let ag = pick([1, 2, 3]); while (ag === af) ag = pick([1, 2, 3]);
    const f = { fn: L("sin", "sin"), a: af, b: 1, p: 0, q: 0 }, g = { fn: L("cos", "cos"), a: ag, b: 1, p: 0, q: 0 };
    const win = { xmin: 0, xmax: 360, ymin: -(Math.max(af, ag) + 1), ymax: Math.max(af, ag) + 1 };
    const spec = twoTrigGraph(f, g, { accent: ACC, win, labelA: L("f", "f"), labelAtA: 90, labelB: L("g", "g"), labelAtB: 360 }).spec;
    return mc("trigTogether", L("Which graph has the <b>larger amplitude</b>?", "Watter grafiek het die <b>groter amplitude</b>?"),
      af > ag ? L("f", "f") : L("g", "g"), [af > ag ? L("g", "g") : L("f", "f"), L("They are equal", "Hulle is gelyk"), L("Neither has an amplitude", "Nie een het 'n amplitude nie")],
      { graph: spec, hint: L("Amplitude is the height from the middle to a peak. The taller wave has the larger amplitude.", "Amplitude is die hoogte van die middel tot 'n piek. Die hoër golf het die groter amplitude."),
        answerLabel: L(`${af > ag ? "f" : "g"} is taller — amplitude ${Math.max(af, ag)} vs ${Math.min(af, ag)}.`, `${af > ag ? "f" : "g"} is hoër: amplitude ${Math.max(af, ag)} teenoor ${Math.min(af, ag)}.`) });
  },

  /* which graph is higher at a given x */
  whichGreaterAt: () => {
    const X = pick([30, 60, 120, 150, 210, 300, 330]);
    const fv = sind(X), gv = cosd(X);
    const f = { fn: L("sin", "sin"), a: 1, b: 1, p: 0, q: 0 }, g = { fn: L("cos", "cos"), a: 1, b: 1, p: 0, q: 0 };
    const spec = twoTrigGraph(f, g, {
      accent: ACC, win: WIN, labelA: L("f", "f"), labelAtA: 90, labelB: L("g", "g"), labelAtB: 360,
      points: [{ x: X, y: fv, on: 0, dashTo: "x" }, { x: X, y: gv, on: 1, dashTo: "x" }],
    }).spec;
    return mc("trigTogether", L(`At x = ${X}°, which graph is <b>higher</b>?  (f = sin x, g = cos x)`, `Watter grafiek is <b>hoër</b> by x = ${X}°?  (f = sin x, g = cos x)`),
      fv > gv ? L("f (sin x)", "f (sin x)") : L("g (cos x)", "g (cos x)"), [fv > gv ? L("g (cos x)", "g (cos x)") : L("f (sin x)", "f (sin x)"), L("They are equal", "Hulle is gelyk")],
      { graph: spec, hint: L("Read straight up from x on the dashed line — the higher dot is the higher graph.", "Lees reguit op vanaf x op die stippellyn: die hoër kolletjie wys die hoër grafiek."),
        answerLabel: L(`At ${X}°, ${fv > gv ? "f = sin" : "g = cos"} is higher.`, `By ${X}° is ${fv > gv ? "f = sin" : "g = cos"} hoër.`) });
  },

  /* where is sin x positive */
  fPositiveInterval: () => {
    const f = { fn: L("sin", "sin"), a: 1, b: 1, p: 0, q: 0 };
    return mc("trigTogether", L("For which interval is <b>sin x &gt; 0</b> on [0° ; 360°]?", "Vir watter interval is <b>sin x &gt; 0</b> op [0° ; 360°]?"),
      L("0° &lt; x &lt; 180°", "0° &lt; x &lt; 180°"), [L("180° &lt; x &lt; 360°", "180° &lt; x &lt; 360°"), L("90° &lt; x &lt; 270°", "90° &lt; x &lt; 270°"), L("0° &lt; x &lt; 90°", "0° &lt; x &lt; 90°")],
      { graph: trigGraph(f, { accent: ACC, win: WIN }).spec,
        hint: L("sin x > 0 where the graph is ABOVE the x-axis (between its x-intercepts at 0° and 180°).", "sin x > 0 waar die grafiek BO die x-as is (tussen sy x-afsnitte by 0° en 180°)."),
        answerLabel: L("sin x > 0 for 0° < x < 180°.", "sin x > 0 vir 0° < x < 180°.") });
  },

  /* does a point lie on the graph */
  pointOnGraph: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const f = makeTrig({ fn, a: 1, b: 1, p: 0, q: 0 });
    const X = pick([0, 90, 180, 270, 360]);
    const trueY = Math.round(f(X));
    const onIt = pick([true, false]);
    const Y = onIt ? trueY : pick([trueY + 1, trueY - 1].filter((v) => v >= -1 && v <= 1).concat(trueY === 0 ? [1, -1] : [0]));
    return {
      type: "yesno", concept: "trigTogether",
      prompt: L(`Does the point (${X}° ; ${nstr(Y)}) lie on y = ${fn} x?`, `Lê die punt (${X}° ; ${nstr(Y)}) op y = ${fn} x?`),
      graph: trigGraph({ fn, a: 1, b: 1, p: 0, q: 0 }, { accent: ACC, win: WIN }).spec,
      yes: Y === trueY,
      hint: L(`Work out ${fn} ${X}° and compare it with ${nstr(Y)}.`, `Bereken ${fn} ${X}° en vergelyk dit met ${nstr(Y)}.`),
      answerLabel: L(`${fn} ${X}° = ${nstr(trueY)}, so the point ${Y === trueY ? "does" : "does not"} lie on the graph.`, `${fn} ${X}° = ${nstr(trueY)}, dus ${Y === trueY ? "lê die punt op die grafiek" : "lê die punt nie op die grafiek nie"}.`),
      solution: [{ s: `${fn} ${X}° = ${nstr(trueY)}`, r: Y === trueY ? L("matches", "klop") : `≠ ${nstr(Y)}` }],
    };
  },

  /* tap an intersection of f and g */
  tapIntersection: () => {
    const f = { fn: L("sin", "sin"), a: 1, b: 1, p: 0, q: 0 }, g = { fn: L("cos", "cos"), a: 1, b: 1, p: 0, q: 0 };
    const win = { xmin: 0, xmax: 180, ymin: -1.4, ymax: 1.4 };
    const iy = sind(45);                    // sin45 = cos45
    const spec = {
      type: "trigg", accent: ACC, grid: true, win, showAsym: true,
      curves: [{ ...f, tone: "a", label: L("f", "f"), labelAt: 120 }, { ...g, tone: "b", label: L("g", "g"), labelAt: 150 }],
      points: [
        { x: 45, y: iy, on: [0, 1], id: "int" },          // the real intersection
        { x: 90, y: 1, on: 0, id: "d1" },                  // on f only
        { x: 0, y: 1, on: 1, id: "d2" },                   // on g only
      ],
      tap: { targets: ["int", "d1", "d2"], correctId: "int" },
    };
    return {
      type: "tap", concept: "trigTogether", graph: spec, tap: spec.tap,
      prompt: L("Tap a point where <b>f(x) = g(x)</b> (the curves cross).  f = sin x, g = cos x.", "Klik op 'n punt waar <b>f(x) = g(x)</b> (die kurwes sny).  f = sin x, g = cos x."),
      tapHint: L("An intersection is where the two curves meet — the dot that sits on BOTH.", "'n Snypunt is waar die twee kurwes ontmoet: die kolletjie wat op ALBEI lê."),
      answerLabel: L("f = g at x = 45° (where sin x and cos x cross).", "f = g by x = 45° (waar sin x en cos x sny)."),
      solution: [{ s: L("The graphs cross at x = 45°, where sin 45° = cos 45°.", "Die grafieke sny by x = 45°, waar sin 45° = cos 45°.") }],
    };
  },

  /* describe a transformation in words */
  transformDescribe: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const kind = pick(["stretch", "shift", "reflect", "squash"]);
    let cv, correct;
    const stretchK = pick([2, 3]), shiftD = pick([2, 3, -2, -3]), bK = pick([2, 3]);
    const opts = {
      stretch: L(`Vertical stretch — amplitude becomes ${stretchK}`, `Vertikaal gerek: amplitude word ${stretchK}`),
      shift: L(`Shifted ${Math.abs(shiftD)} units ${shiftD > 0 ? "up" : "down"}`, `${Math.abs(shiftD)} eenhede ${shiftD > 0 ? "op" : "af"}geskuif`),
      reflect: L("Reflected in the x-axis", "In die x-as gereflekteer"),
      squash: L(`Squashed sideways — ${bK} cycles in 360° (period ${360 / bK}°)`, `Horisontaal saamgedruk: ${bK} siklusse in 360° (periode ${360 / bK}°)`),
    };
    if (kind === "stretch") cv = { fn, a: stretchK, b: 1, p: 0, q: 0 };
    else if (kind === "shift") cv = { fn, a: 1, b: 1, p: 0, q: shiftD };
    else if (kind === "reflect") cv = { fn, a: -1, b: 1, p: 0, q: 0 };
    else cv = { fn, a: 1, b: bK, p: 0, q: 0 };
    correct = opts[kind];
    const wrongs = Object.keys(opts).filter((k) => k !== kind).map((k) => opts[k]);
    return mc("trigParams", L(`Describe the transformation from y = ${fn} x to ${eqStr(cv)}.`, `Beskryf die transformasie van y = ${fn} x na ${eqStr(cv)}.`),
      correct, wrongs,
      { graph: trigGraph(cv, { accent: ACC, midline: kind === "shift" }).spec, layout: "grid2",
        hint: L("Compare amplitude (a), midline (q), orientation (sign of a) and period (b).", "Vergelyk amplitude (a), middelste lyn (q), oriëntasie (teken van a) en periode (b)."),
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
