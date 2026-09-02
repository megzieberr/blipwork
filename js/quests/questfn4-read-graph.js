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
        answerLabel: `y-intercept ${ptStr(0, yi)}.`,
        solution: [
          { s: "The y-intercept is where the curve crosses the y-axis, and every point on that axis has x = 0" },
          { s: `Follow the dashed line from the marked point across to the y-axis: it lands on ${C(yi)}` },
          { s: `∴ y-intercept ${ptStr(0, yi)}`, r: "x first, then y, with a semicolon between them" },
        ] });
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
        answerLabel: `x-intercept ${ptStr(xi, 0)}.`,
        solution: [
          { s: "The x-intercept is where the line cuts the x-axis, and every point on that axis has y = 0" },
          { s: `Drop the dashed line from the marked point down to the x-axis: it lands on ${C(xi)}` },
          { s: `∴ x-intercept ${ptStr(xi, 0)}`, r: "the 0 goes SECOND here — it is the y-coordinate" },
        ] });
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
        answerLabel: `Turning point ${ptStr(tp.x, tp.y)}.`,
        solution: [
          { s: `The turning point is where the parabola stops and comes back — the ${paraStd(cv).a > 0 ? "lowest" : "highest"} point of the curve`,
            r: `a is ${paraStd(cv).a > 0 ? "positive → happy, so it is a minimum" : "negative → sad, so it is a maximum"}` },
          { s: `Follow the dashed line DOWN to the x-axis: x = ${C(tp.x)}` },
          { s: `Follow the dashed line ACROSS to the y-axis: y = ${C(tp.y)}`, r: `∴ turning point ${ptStr(tp.x, tp.y)}` },
        ] });
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
            answerLabel: `x = ${C(cv.p)} and y = ${C(cv.q)}.`,
            solution: [
              { s: "A hyperbola has two dashed lines: one standing up, one lying flat" },
              { s: `The upright one crosses the x-axis at ${C(cv.p)}, and an upright line is written x = …`, r: `so x = ${C(cv.p)}` },
              { s: `The flat one crosses the y-axis at ${C(cv.q)}, and a flat line is written y = …`, r: `so y = ${C(cv.q)}` },
            ] })
      : mc("readGraph", "Read the <b>asymptote</b> off the graph (the dashed line).",
          `y = ${C(cv.q)}`, [`x = ${C(cv.q)}`, `y = ${C(cv.q + 1)}`, `y = ${C(cv.q - 1)}`],
          { graph: g.spec, hint: "An exponential graph flattens towards one horizontal dashed line, y = ….",
            answerLabel: `y = ${C(cv.q)}.`,
            solution: [
              { s: "An exponential graph has ONE dashed line, and it lies flat — the level the curve flattens onto" },
              { s: `Follow it across to the y-axis: it sits at ${C(cv.q)}` },
              { s: `A flat line is written y = …`, r: `∴ y = ${C(cv.q)}, not x = ${C(cv.q)}` },
            ] });
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
        answerLabel: `Range: ${correct}.`,
        solution: isPar
          ? [
              { s: "Range = the y-values the graph reaches, so slide your eye up and down the y-axis" },
              { s: `The parabola is ${paraStd(cv).a > 0 ? "happy, so it stops at its lowest point and climbs from there" : "sad, so it stops at its highest point and falls away from there"}` },
              { s: `That turning point sits at y = ${C(paraTP(cv).y)}`, r: `∴ ${correct} — the turning point itself IS reached, so the sign carries the line under it` },
            ]
          : [
              { s: "Range = the y-values the graph reaches, so slide your eye up and down the y-axis" },
              { s: `The curve flattens onto the dashed line y = ${C(cv.q)} and stays ${cv.a > 0 ? "above" : "below"} it` },
              { s: `It never actually lands on the asymptote`, r: `∴ ${correct} — a strict sign, never ≥ or ≤` },
            ] });
  },
};

export const questFn4 = {
  id: "fn4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id === "readRange" ? "domainRange" : "readGraph", gen })),
};
