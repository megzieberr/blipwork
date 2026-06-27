/* ============================================================
   FUNCTIONS QUEST 2 · The straight line & the parabola   ★ DIAGRAM
   Gradient & intercepts of a line; happy/sad, turning point, axis
   of symmetry, range of a parabola.
   ============================================================ */
import { mc } from "./_shared.js";
import { lineGraph, parabolaGraph, randLine, randParabola, ptDecoys } from "./_func.js";
import { eqStr, paraTP, paraStd, lineXInt, lineYInt, rangeStr, ptStr, C, pick } from "../funclib.js";

const ACC = "#0d9488";

const SKILLS = {
  /* increasing / decreasing line + what q is */
  lineDirection: () => {
    const cv = randLine();
    const g = lineGraph(cv, { accent: ACC, label: "f" });
    const inc = cv.a > 0;
    return mc("linearGraph", `For <b>${eqStr(cv, "f")}</b>, the line is…`,
      inc ? "increasing (slopes up)" : "decreasing (slopes down)",
      [inc ? "decreasing (slopes down)" : "increasing (slopes up)", "horizontal", "vertical"],
      { graph: g.spec,
        hint: "In y = ax + q the gradient is a. a &gt; 0 → up, a &lt; 0 → down.",
        answerLabel: `a = ${C(cv.a)} ${inc ? "&gt; 0, so increasing" : "&lt; 0, so decreasing"}.` });
  },

  /* read the intercepts of a line */
  lineIntercepts: () => {
    let cv = randLine();
    while (cv.a === 0 || lineXInt(cv) == null) cv = randLine();
    const xi = lineXInt(cv), yi = lineYInt(cv);
    const askX = pick([true, false]);
    const g = lineGraph(cv, { accent: ACC, label: "f" });
    return askX
      ? mc("linearGraph", `What is the <b>x-intercept</b> of ${eqStr(cv, "f")}?`,
          ptStr(xi, 0), ptDecoys(xi, 0),
          { graph: g.spec, hint: "x-intercept: let y = 0 and solve for x.", answerLabel: `x-intercept ${ptStr(xi, 0)}.` })
      : mc("linearGraph", `What is the <b>y-intercept</b> of ${eqStr(cv, "f")}?`,
          ptStr(0, yi), ptDecoys(0, yi),
          { graph: g.spec, hint: "y-intercept: let x = 0. For y = ax + q that is just q.", answerLabel: `y-intercept ${ptStr(0, yi)}.` });
  },

  /* happy or sad → min or max value */
  happySad: () => {
    const cv = randParabola();
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    const happy = paraStd(cv).a > 0;
    return mc("parabolaShape", `The parabola <b>${eqStr(cv, "f")}</b> is…`,
      happy ? "“happy” (opens up) — it has a minimum" : "“sad” (opens down) — it has a maximum",
      [happy ? "“sad” (opens down) — it has a maximum" : "“happy” (opens up) — it has a minimum",
       "a straight line", "always increasing"],
      { graph: g.spec,
        hint: "a &gt; 0 → opens up (minimum); a &lt; 0 → opens down (maximum).",
        answerLabel: `a = ${C(paraStd(cv).a)}, so ${happy ? "happy → minimum" : "sad → maximum"}.` });
  },

  /* turning point */
  turningPoint: () => {
    const cv = randParabola();
    const tp = paraTP(cv);
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    return mc("parabolaShape", `What is the <b>turning point</b> of ${eqStr(cv, "f")}?`,
      ptStr(tp.x, tp.y), ptDecoys(tp.x, tp.y),
      { graph: g.spec,
        hint: "x of the turning point = −b/(2a); substitute it back to get the y-value.",
        answerLabel: `Turning point ${ptStr(tp.x, tp.y)}.` });
  },

  /* axis of symmetry */
  axisOfSymmetry: () => {
    const cv = randParabola();
    const tp = paraTP(cv);
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    return mc("parabolaShape", `What is the <b>axis of symmetry</b> of ${eqStr(cv, "f")}?`,
      `x = ${C(tp.x)}`, [`y = ${C(tp.x)}`, `x = ${C(-tp.x)}`, `x = ${C(tp.x + 1)}`],
      { graph: g.spec,
        hint: "The axis of symmetry is the vertical line through the turning point: x = (the x of the TP).",
        answerLabel: `x = ${C(tp.x)}.` });
  },

  /* range of the parabola */
  parabolaRange: () => {
    const cv = randParabola();
    const tp = paraTP(cv), a = paraStd(cv).a;
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    const correct = rangeStr(cv);
    const wrongs = [
      a > 0 ? `y ≤ ${C(tp.y)}` : `y ≥ ${C(tp.y)}`,
      `y ∈ ℝ`,
      a > 0 ? `y ≥ ${C(-tp.y)}` : `y ≤ ${C(-tp.y)}`,
    ];
    return mc("domainRange", `What is the <b>range</b> of ${eqStr(cv, "f")}?`,
      correct, wrongs,
      { graph: g.spec,
        hint: "Range = the y-values covered. A happy parabola starts at its minimum y and goes up (y ≥ min); a sad one (y ≤ max).",
        answerLabel: `Range: ${correct}.` });
  },
};

export const questFn2 = {
  id: "fn2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: id.startsWith("line") ? "linearGraph" : id === "parabolaRange" ? "domainRange" : "parabolaShape", gen,
  })),
};
