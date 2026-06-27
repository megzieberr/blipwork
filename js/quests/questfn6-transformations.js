/* ============================================================
   FUNCTIONS QUEST 6 · Transformations   ★ DIAGRAM
   Shifts, reflections and stretches — both the rule and what it
   does to a graph's key feature.
   ============================================================ */
import { mc } from "./_shared.js";
import { parabolaGraph, hyperbolaGraph, randParabola, randHyperbola } from "./_func.js";
import { eqStr, paraTP, ptStr, C, pick, randInt } from "../funclib.js";

const ACC = "#0d9488";

const SKILLS = {
  /* how to write a shift */
  shiftRule: () => {
    const k = randInt(2, 5);
    const cases = [
      { p: `How do you shift f(x) <b>up</b> by ${k}?`, c: `f(x) + ${k}`, w: [`f(x) − ${k}`, `f(x + ${k})`, `f(x − ${k})`] },
      { p: `How do you shift f(x) <b>down</b> by ${k}?`, c: `f(x) − ${k}`, w: [`f(x) + ${k}`, `f(x − ${k})`, `f(x + ${k})`] },
      { p: `How do you shift f(x) <b>right</b> by ${k}?`, c: `f(x − ${k})`, w: [`f(x + ${k})`, `f(x) − ${k}`, `f(x) + ${k}`] },
      { p: `How do you shift f(x) <b>left</b> by ${k}?`, c: `f(x + ${k})`, w: [`f(x − ${k})`, `f(x) + ${k}`, `f(x) − ${k}`] },
    ];
    const c = pick(cases);
    return mc("transformations", c.p, c.c, c.w,
      { hint: "Up/down change the WHOLE function: f(x) ± k. Left/right go INSIDE with x: left is f(x + k), right is f(x − k).",
        answerLabel: c.c });
  },

  /* describe a given shift */
  shiftDescribe: () => {
    const k = randInt(2, 5);
    const cases = [
      { p: `<b>f(x) + ${k}</b> shifts the graph…`, c: `up by ${k}`, w: [`down by ${k}`, `right by ${k}`, `left by ${k}`] },
      { p: `<b>f(x) − ${k}</b> shifts the graph…`, c: `down by ${k}`, w: [`up by ${k}`, `left by ${k}`, `right by ${k}`] },
      { p: `<b>f(x − ${k})</b> shifts the graph…`, c: `right by ${k}`, w: [`left by ${k}`, `up by ${k}`, `down by ${k}`] },
      { p: `<b>f(x + ${k})</b> shifts the graph…`, c: `left by ${k}`, w: [`right by ${k}`, `down by ${k}`, `up by ${k}`] },
    ];
    const c = pick(cases);
    return mc("transformations", c.p, c.c, c.w,
      { hint: "± outside the bracket = up/down. The bit with x flips the direction: (x − k) moves right, (x + k) moves left.",
        answerLabel: c.c });
  },

  /* reflections */
  reflect: () => {
    const cases = [
      { p: "Reflection in the <b>x-axis</b> is written…", c: "−f(x)", w: ["f(−x)", "f(x)⁻¹", "−f(−x)"] },
      { p: "Reflection in the <b>y-axis</b> is written…", c: "f(−x)", w: ["−f(x)", "f(x) − 1", "−f(−x)"] },
      { p: "<b>−f(x)</b> reflects the graph in the…", c: "x-axis (the y-values change sign)", w: ["y-axis (the x-values change sign)", "line y = x", "origin only"] },
      { p: "<b>f(−x)</b> reflects the graph in the…", c: "y-axis (the x-values change sign)", w: ["x-axis (the y-values change sign)", "line y = x", "origin only"] },
    ];
    const c = pick(cases);
    return mc("transformations", c.p, c.c, c.w,
      { hint: "Negative on the WHOLE function → reflect in the x-axis. Negative on the x only → reflect in the y-axis.",
        answerLabel: c.c });
  },

  /* vertical stretch */
  stretch: () => {
    return mc("transformations",
      "What does <b>k·f(x)</b> with k &gt; 1 do to the graph?",
      "Stretches it vertically (the y-values grow)",
      ["Shifts it up by k", "Reflects it in the x-axis", "Shifts it right by k"],
      { hint: "Multiplying the whole function by k scales every y-value by k — a vertical stretch (k &gt; 1) or shrink (0 &lt; k &lt; 1).",
        answerLabel: "A vertical stretch by a factor of k." });
  },

  /* apply a shift to a parabola's turning point */
  applyToParabola: () => {
    const cv = randParabola(), tp = paraTP(cv);
    const k = randInt(1, 4), up = pick([true, false]);
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    const ny = up ? tp.y + k : tp.y - k;
    return mc("transformations",
      `f has turning point ${ptStr(tp.x, tp.y)}. If f is shifted <b>${up ? "up" : "down"} by ${k}</b>, the new turning point is…`,
      ptStr(tp.x, ny), [ptStr(tp.x, up ? tp.y - k : tp.y + k), ptStr(up ? tp.x + k : tp.x - k, tp.y), ptStr(tp.x, tp.y)],
      { graph: g.spec,
        hint: "Up/down only changes the y-coordinate. x stays the same.",
        answerLabel: `New turning point ${ptStr(tp.x, ny)}.` });
  },

  /* apply a shift to a hyperbola's asymptotes */
  applyToHyperbola: () => {
    const cv = randHyperbola();
    const k = randInt(1, 4), up = pick([true, false]);
    const g = hyperbolaGraph(cv, { accent: ACC, label: "f" });
    const nq = up ? cv.q + k : cv.q - k;
    return mc("transformations",
      `f has asymptotes x = ${C(cv.p)} and y = ${C(cv.q)}. After shifting <b>${up ? "up" : "down"} by ${k}</b>, the asymptotes are…`,
      `x = ${C(cv.p)} and y = ${C(nq)}`,
      [`x = ${C(up ? cv.p + k : cv.p - k)} and y = ${C(cv.q)}`, `x = ${C(cv.p)} and y = ${C(up ? cv.q - k : cv.q + k)}`, `x = ${C(cv.q)} and y = ${C(cv.p)}`],
      { graph: g.spec,
        hint: "A vertical shift moves the horizontal asymptote y = q only; the vertical asymptote x = p stays put.",
        answerLabel: `x = ${C(cv.p)} and y = ${C(nq)}.` });
  },
};

export const questFn6 = {
  id: "fn6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "transformations", gen })),
};
