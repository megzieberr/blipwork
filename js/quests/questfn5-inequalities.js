/* ============================================================
   FUNCTIONS QUEST 5 · Increasing/decreasing, positive/negative
   & inequalities   ★★ DIAGRAM
   The graph-reading inequalities the exam loves: where a graph is
   increasing/decreasing, where it is above/below the x-axis
   (f(x) > 0, f(x) < 0), and the sign rules for f·g and x·f.
   ============================================================ */
import { mc } from "./_shared.js";
import { parabolaGraph, randParabola } from "./_func.js";
import {
  paraTP, paraRoots, paraStd, ineqBetween, ineqOutside, C, pick,
} from "../funclib.js";

const ACC = "#0d9488";

/* a parabola whose two x-intercepts are clean distinct integers */
function rootsParabola() {
  let cv, roots;
  do { cv = randParabola(); roots = paraRoots(cv); } while (roots.length !== 2 || Math.abs(roots[0] - roots[1]) < 1);
  return { cv, r1: Math.min(...roots), r2: Math.max(...roots), happy: paraStd(cv).a > 0 };
}

const SKILLS = {
  /* where is the parabola increasing / decreasing? (relative to the TP) */
  incDec: () => {
    const cv = randParabola(), tp = paraTP(cv), happy = paraStd(cv).a > 0;
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    const askInc = pick([true, false]);
    // happy: decreasing x<p, increasing x>p.  sad: increasing x<p, decreasing x>p.
    const incSide = happy ? `x > ${C(tp.x)}` : `x &lt; ${C(tp.x)}`;
    const decSide = happy ? `x &lt; ${C(tp.x)}` : `x > ${C(tp.x)}`;
    const correct = askInc ? incSide : decSide;
    const other = askInc ? decSide : incSide;
    return mc("incDec", `For ${"<b>f</b>"} below, for which x-values is the graph <b>${askInc ? "increasing" : "decreasing"}</b>?`,
      correct, [other, `x = ${C(tp.x)}`, "all real x"],
      { graph: g.spec,
        hint: "Read left-to-right and split at the turning point x = " + C(tp.x) + ". One side climbs, the other falls.",
        answerLabel: `${askInc ? "Increasing" : "Decreasing"}: ${correct}.`,
        solution: [
          { s: `Find the turning point first: x = ${C(tp.x)}`, r: "that is the only place the graph changes direction" },
          { s: `Cut a line straight down through x = ${C(tp.x)} and read the graph left to right` },
          { s: happy
              ? `It is a happy parabola, so it falls on the left of the cut and climbs on the right`
              : `It is a sad parabola, so it climbs on the left of the cut and falls on the right` },
          { s: `∴ ${askInc ? "increasing" : "decreasing"} for ${correct}`, r: "always write x first" },
        ] });
  },

  /* f(x) > 0 — above the x-axis */
  fPositive: () => {
    const { cv, r1, r2, happy } = rootsParabola();
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    const correct = happy ? ineqOutside(r1, r2) : ineqBetween(r1, r2);
    const wrong = happy ? ineqBetween(r1, r2) : ineqOutside(r1, r2);
    return mc("posNeg", `Use the graph. For which x-values is <b>f(x) &gt; 0</b> (above the x-axis)?`,
      correct, [wrong, `x > ${C(r2)}`, "all real x"],
      { graph: g.spec,
        hint: "f(x) &gt; 0 means the graph is ABOVE the x-axis. The x-intercepts are the boundaries.",
        answerLabel: `f(x) &gt; 0 for ${correct}.`,
        solution: [
          { s: `f(x) &gt; 0 means “where is the curve ABOVE the x-axis?”`, r: "f(x) is just another name for the y-value" },
          { s: `Cut a line down through every x-intercept: x = ${C(r1)} and x = ${C(r2)}` },
          { s: happy
              ? `The parabola is happy, so it dips below the axis BETWEEN the cuts and rides above on both arms`
              : `The parabola is sad, so the only stretch above the axis is BETWEEN the cuts` },
          { s: `∴ ${correct}`, r: happy ? "two separate stretches, so they are joined with “or”" : "one single stretch, so it is written as a double inequality" },
        ] });
  },

  /* f(x) < 0 — below the x-axis */
  fNegative: () => {
    const { cv, r1, r2, happy } = rootsParabola();
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    const correct = happy ? ineqBetween(r1, r2) : ineqOutside(r1, r2);
    const wrong = happy ? ineqOutside(r1, r2) : ineqBetween(r1, r2);
    return mc("posNeg", `Use the graph. For which x-values is <b>f(x) &lt; 0</b> (below the x-axis)?`,
      correct, [wrong, `x &lt; ${C(r1)}`, "all real x"],
      { graph: g.spec,
        hint: "f(x) &lt; 0 means the graph is BELOW the x-axis, between or outside the x-intercepts.",
        answerLabel: `f(x) &lt; 0 for ${correct}.`,
        solution: [
          { s: `f(x) &lt; 0 means “where is the curve BELOW the x-axis?”`, r: "a negative y-value" },
          { s: `Cut a line down through every x-intercept: x = ${C(r1)} and x = ${C(r2)}` },
          { s: happy
              ? `The parabola is happy, so the only stretch under the axis is BETWEEN the cuts`
              : `The parabola is sad, so it pokes above the axis between the cuts and drops below on both arms` },
          { s: `∴ ${correct}`, r: happy ? "one single stretch, so it is written as a double inequality" : "two separate stretches, so they are joined with “or”" },
        ] });
  },

  /* the meaning of a product inequality */
  productSign: () => {
    const cases = [
      { p: "<b>f(x)·g(x) &gt; 0</b> happens where the two graphs are…", c: "on the same side of the x-axis (both above, or both below)",
        w: ["on different sides of the x-axis", "both equal to zero", "parallel"],
        sol: [{ s: "A product is positive only two ways: (+)(+) or (−)(−)", r: "the two factors must carry the SAME sign" },
              { s: "f(x) is + where f is above the x-axis and − where it is below — same for g(x)" },
              { s: "So paint + and − on both curves and keep the stretches where the two paints match", r: "both above, or both below" }] },
      { p: "<b>f(x)·g(x) &lt; 0</b> happens where the two graphs are…", c: "on different sides of the x-axis (one above, one below)",
        w: ["on the same side of the x-axis", "both positive", "both negative"],
        sol: [{ s: "A product is negative only two ways: (+)(−) or (−)(+)", r: "the two factors must carry DIFFERENT signs" },
              { s: "f(x) is + above the x-axis and − below it — same for g(x)" },
              { s: "So keep the stretches where the paints disagree", r: "one curve above the axis, the other below" }] },
      { p: "<b>f(x)/g(x) &gt; 0</b> happens where the two graphs are…", c: "on the same side of the x-axis (and g(x) ≠ 0)",
        w: ["on different sides of the x-axis", "both zero", "equal to each other"],
        sol: [{ s: "Dividing follows exactly the same sign rules as multiplying: same signs → +" },
              { s: "So the two curves must be on the same side of the x-axis" },
              { s: "One extra thing: g is in the denominator, so g(x) ≠ 0", r: "the restriction rides after a semicolon" }] },
    ];
    const k = pick(cases);
    return mc("ineqCombined", k.p, k.c, k.w,
      { hint: "A product (or quotient) is positive when the two factors have the SAME sign, negative when they have DIFFERENT signs.",
        answerLabel: k.c,
        solution: k.sol });
  },

  /* x·f(x) — the quadrant rule */
  xfSign: () => {
    const cases = [
      { p: "<b>x·f(x) &gt; 0</b> means x and f(x) (the y-value) have…", c: "the same sign — the graph is in the 1st & 3rd quadrants",
        w: ["different signs — the 2nd & 4th quadrants", "always a positive product", "a turning point"],
        sol: [{ s: "x·f(x) is the x-coordinate multiplied by the y-coordinate of the same point" },
              { s: "For that product to be positive the two must match: (+)(+) or (−)(−)" },
              { s: "x and y both + is the 1st quadrant; both − is the 3rd", r: "∴ the parts of the curve lying in quadrants 1 and 3" }] },
      { p: "<b>x·f(x) &lt; 0</b> means x and f(x) (the y-value) have…", c: "different signs — the graph is in the 2nd & 4th quadrants",
        w: ["the same sign — the 1st & 3rd quadrants", "always a negative x", "no solution"],
        sol: [{ s: "x·f(x) is the x-coordinate multiplied by the y-coordinate of the same point" },
              { s: "For that product to be negative the two must differ: (+)(−) or (−)(+)" },
              { s: "x negative with y positive is the 2nd quadrant; x positive with y negative is the 4th", r: "∴ the parts of the curve lying in quadrants 2 and 4" }] },
    ];
    const k = pick(cases);
    return mc("ineqCombined", k.p, k.c, k.w,
      { hint: "x·f(x) looks at the sign of the x-coordinate times the sign of the y-coordinate — same sign → quadrants 1 & 3.",
        answerLabel: k.c,
        solution: k.sol });
  },

  /* boundaries when comparing two graphs */
  compareBoundary: () => {
    return mc("ineqCombined",
      "When you read <b>f(x) &gt; g(x)</b> off a graph, the boundary x-values are…",
      "the x-coordinates of the points where the graphs intersect",
      ["the y-intercepts", "the turning points", "the asymptotes"],
      { hint: "f &gt; g is where one curve is above the other. The switch-over happens exactly at their intersection points.",
        answerLabel: "The x-values of the intersection points.",
        solution: [
          { s: "f(x) &gt; g(x) asks: where is f drawn ABOVE g?" },
          { s: "f can only stop being above g by crossing it, and crossing happens exactly at an intersection point" },
          { s: "So cut a line down through every intersection, then read which side keeps f on top", r: "the answer comes out in x, written x first" },
        ] });
  },
};

export const questFn5 = {
  id: "fn5",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: id === "incDec" ? "incDec" : (id === "fPositive" || id === "fNegative") ? "posNeg" : "ineqCombined", gen,
  })),
};
