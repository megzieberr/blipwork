/* ============================================================
   FUNCTIONS QUEST 4 · Reading features off a graph   ★★ DIAGRAM
   Pure graph interpretation: read intercepts, turning point,
   asymptotes, domain & range straight off a drawn graph. The
   coordinate labels are HIDDEN — the learner reads them off the
   axes (dashed guide-lines mark the point being asked about).
   ============================================================ */
import { mc, mcNum } from "./_shared.js";
import {
  lineGraph, parabolaGraph, hyperbolaGraph, expGraph,
  randLine, randParabola, randHyperbola, randExp, ptDecoys,
} from "./_func.js";
import { paraTP, paraStd, lineXInt, lineYInt, rangeStr, ptStr, C, pick } from "../funclib.js";

const ACC = "#2dd4bf";

/* strip coordinate labels off marked points & drop dashed guides to the axes,
   so the learner must read the value off the axis (not a given label). */
function blank(spec, keep = []) {
  spec.curves.forEach((c) => { delete c.label; delete c.labelAt; });
  spec.points = (spec.points || [])
    .filter((p) => keep.length === 0 || keep.some((k) => Math.abs(p.x - k.x) < 1e-6 && Math.abs(p.y - k.y) < 1e-6))
    .map((p) => ({ x: p.x, y: p.y, on: p.on, dashTo: "both" }));
  return spec;
}

const SKILLS = {
  /* read the y-intercept */
  readYIntercept: () => {
    const builders = [
      () => lineGraph(randLine(), { accent: ACC }),
      () => parabolaGraph(randParabola(), { accent: ACC }),
    ];
    // need a y-intercept OFF the origin that is actually marked on the sketch
    let g = pick(builders)();
    while (g.yi === 0 || !g.spec.points.some((p) => p.x === 0 && Math.abs(p.y - g.yi) < 1e-9)) g = pick(builders)();
    const yi = g.yi;
    const spec = blank(g.spec, [{ x: 0, y: yi }]);
    return mc("readGraph", "Read the <b>y-intercept</b> off the graph.",
      ptStr(0, yi), ptDecoys(0, yi),
      { graph: spec, hint: "The y-intercept is where the graph crosses the y-axis (x = 0). Follow the dashed line.",
        answerLabel: `y-intercept ${ptStr(0, yi)}.` });
  },

  /* read an x-intercept */
  readXIntercept: () => {
    let cv = randLine();
    while (lineXInt(cv) == null || lineXInt(cv) === 0 || !Number.isInteger(lineXInt(cv))) cv = randLine();
    const xi = lineXInt(cv);
    const g = lineGraph(cv, { accent: ACC });
    const spec = blank(g.spec, [{ x: xi, y: 0 }]);
    return mc("readGraph", "Read the <b>x-intercept</b> off the graph.",
      ptStr(xi, 0), ptDecoys(xi, 0),
      { graph: spec, hint: "The x-intercept is where the graph crosses the x-axis (y = 0).",
        answerLabel: `x-intercept ${ptStr(xi, 0)}.` });
  },

  /* read the turning point */
  readTP: () => {
    let cv = randParabola(), tp = paraTP(cv);
    while (!Number.isInteger(tp.x) || !Number.isInteger(tp.y)) { cv = randParabola(); tp = paraTP(cv); }   // read-offs sit on gridlines
    const g = parabolaGraph(cv, { accent: ACC });
    const spec = blank(g.spec, [{ x: tp.x, y: tp.y }]);
    return mc("readGraph", "Read the <b>turning point</b> off the graph.",
      ptStr(tp.x, tp.y), ptDecoys(tp.x, tp.y),
      { graph: spec, hint: "The turning point is the lowest (or highest) point of the parabola. Read the dashed lines to both axes.",
        answerLabel: `Turning point ${ptStr(tp.x, tp.y)}.` });
  },

  /* read the asymptotes */
  readAsymptotes: () => {
    const isHyp = pick([true, false]);
    let cv = isHyp ? randHyperbola() : randExp();
    while (isHyp && cv.p === cv.q) cv = randHyperbola(); // p ≠ q keeps the swapped decoy distinct
    const g = isHyp ? hyperbolaGraph(cv, { accent: ACC }) : expGraph(cv, { accent: ACC });
    g.spec.curves.forEach((c) => { delete c.label; delete c.labelAt; });
    g.spec.points = [];
    return isHyp
      ? mc("readGraph", "Read the <b>asymptotes</b> off the graph (the dashed lines).",
          `x = ${C(cv.p)} and y = ${C(cv.q)}`,
          [`x = ${C(cv.q)} and y = ${C(cv.p)}`, `x = ${C(cv.p)} and y = ${C(cv.q + 1)}`, `x = ${C(cv.p + 1)} and y = ${C(cv.q)}`],
          { graph: g.spec, hint: "The vertical dashed line is x = …; the horizontal dashed line is y = ….",
            answerLabel: `x = ${C(cv.p)} and y = ${C(cv.q)}.` })
      : mc("readGraph", "Read the <b>asymptote</b> off the graph (the dashed line).",
          `y = ${C(cv.q)}`, [`x = ${C(cv.q)}`, `y = ${C(cv.q + 1)}`, `y = ${C(cv.q - 1)}`],
          { graph: g.spec, hint: "An exponential graph flattens towards one horizontal dashed line, y = ….",
            answerLabel: `y = ${C(cv.q)}.` });
  },

  /* read the range */
  readRange: () => {
    const isPar = pick([true, false]);
    const cv = isPar ? randParabola() : randExp();
    const g = isPar ? parabolaGraph(cv, { accent: ACC }) : expGraph(cv, { accent: ACC });
    g.spec.curves.forEach((c) => { delete c.label; delete c.labelAt; });
    const correct = rangeStr(cv);
    // the opposite, computed straight from the sign (no fragile string surgery)
    const opposite = isPar
      ? (paraStd(cv).a > 0 ? `y ≤ ${C(paraTP(cv).y)}` : `y ≥ ${C(paraTP(cv).y)}`)
      : (cv.a > 0 ? `y &lt; ${C(cv.q)}` : `y > ${C(cv.q)}`);
    const wrongs = isPar
      ? [opposite, "y ∈ ℝ", "y ≠ 0"]
      : [opposite, "y ∈ ℝ", `y ≠ ${C(cv.q)}`];
    return mc("domainRange", "Read the <b>range</b> off the graph.",
      correct, wrongs,
      { graph: g.spec, hint: "Range = the y-values the graph reaches. Look at the lowest/highest point or the asymptote.",
        answerLabel: `Range: ${correct}.` });
  },
};

export const questFn4 = {
  id: "fn4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id === "readRange" ? "domainRange" : "readGraph", gen })),
};
