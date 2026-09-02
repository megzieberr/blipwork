/* ============================================================
   FUNCTIONS QUEST 2 · The straight line & the parabola   ★ DIAGRAM
   Gradient & intercepts of a line; happy/sad, turning point, axis
   of symmetry, range of a parabola.
   ============================================================ */
import { mc } from "./_shared.js";
import { lineGraph, parabolaGraph, randLine, randParabola, ptDecoys } from "./_func.js";
import { eqStr, paraTP, paraStd, paraTPString, lineXInt, lineYInt, rangeStr, ptStr, C, pick, randInt } from "../funclib.js";

const ACC = "#0d9488";

/* ---- worked-method helpers (2026-09-02 methods batch, session S3) ----
   String builders only — no randomness, so the seeded rng stream is
   untouched. `axTerm` keeps her "never print 1x" habit; `signed` writes
   "+ 4" / "− 4" the way a substitution line reads. */
const axTerm = (a, v = "x") => (a === 1 ? v : a === -1 ? `−${v}` : `${C(a)}${v}`);
const signed = (n) => (n < 0 ? `− ${C(-n)}` : `+ ${C(n)}`);

const SKILLS = {
  /* increasing / decreasing line + what q is */
  lineDirection: () => {
    const cv = randLine();
    const g = lineGraph(cv, { accent: ACC, label: "f" });
    const inc = cv.a > 0;
    return mc("linearGraph", `For <b>${eqStr(cv, "f(x)")}</b>, the line is…`,
      inc ? "increasing (slopes up)" : "decreasing (slopes down)",
      [inc ? "decreasing (slopes down)" : "increasing (slopes up)", "horizontal", "vertical"],
      { graph: g.spec,
        hint: "In y = ax + q the gradient is a. a &gt; 0 → up, a &lt; 0 → down.",
        answerLabel: `a = ${C(cv.a)} ${inc ? "&gt; 0, so increasing" : "&lt; 0, so decreasing"}.`,
        solution: [
          { s: `Compare with y = ax + q: here a = ${C(cv.a)}`, r: "a is the gradient, q is the y-intercept" },
          { s: `a is ${inc ? "positive" : "negative"}, and it is the gradient that decides the direction`,
            r: `a &gt; 0 climbs left to right, a &lt; 0 falls` },
          { s: `∴ the line is ${inc ? "increasing — it slopes up" : "decreasing — it slopes down"}` },
        ] });
  },

  /* read the intercepts of a line */
  lineIntercepts: () => {
    let cv = randLine();
    // q ≠ 0: intercepts away from the origin. The x-intercept must also be a WHOLE
    // number (the same guard fn4.readXIntercept already uses) — without it −q/a
    // rolls values like 2/3, and both the sketch label and the four options came
    // out as "(0,666667 ; 0)" (dice PNG review, 2026-08-23).
    while (cv.a === 0 || cv.q === 0 || lineXInt(cv) == null || !Number.isInteger(lineXInt(cv))) cv = randLine();
    const xi = lineXInt(cv), yi = lineYInt(cv);
    const askX = pick([true, false]);
    const g = lineGraph(cv, { accent: ACC, label: "f" });
    return askX
      ? mc("linearGraph", `What is the <b>x-intercept</b> of ${eqStr(cv, "f(x)")}?`,
          ptStr(xi, 0), ptDecoys(xi, 0),
          { graph: g.spec, hint: "x-intercept: let y = 0 and solve for x.", answerLabel: `x-intercept ${ptStr(xi, 0)}.`,
            solution: [
              { s: `The x-axis is the line y = 0, so put y = 0 into ${eqStr(cv, "f(x)")}` },
              { s: `0 = ${axTerm(cv.a)} ${signed(cv.q)}  →  ${axTerm(cv.a)} = ${C(-cv.q)}`, r: "take q across" },
              { s: `x = ${C(xi)}, so the x-intercept is ${ptStr(xi, 0)}`, r: "write it as a point, with a semicolon" },
            ] })
      : mc("linearGraph", `What is the <b>y-intercept</b> of ${eqStr(cv, "f(x)")}?`,
          ptStr(0, yi), ptDecoys(0, yi),
          { graph: g.spec, hint: "y-intercept: let x = 0. For y = ax + q that is just q.", answerLabel: `y-intercept ${ptStr(0, yi)}.`,
            solution: [
              { s: `The y-axis is the line x = 0, so put x = 0 into ${eqStr(cv, "f(x)")}` },
              { s: `f(0) = ${axTerm(cv.a, "(0)")} ${signed(cv.q)} = ${C(yi)}`, r: "the x-term falls away" },
              { s: `y-intercept ${ptStr(0, yi)}`, r: "in y = ax + q the y-intercept is always just q" },
            ] });
  },

  /* happy or sad → min or max value */
  happySad: () => {
    const cv = randParabola();
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    const happy = paraStd(cv).a > 0;
    return mc("parabolaShape", `The parabola <b>${eqStr(cv, "f(x)")}</b> is…`,
      happy ? "“happy” (opens up) — it has a minimum" : "“sad” (opens down) — it has a maximum",
      [happy ? "“sad” (opens down) — it has a maximum" : "“happy” (opens up) — it has a minimum",
       "a straight line", "always increasing"],
      { graph: g.spec,
        hint: "a &gt; 0 → opens up (minimum); a &lt; 0 → opens down (maximum).",
        answerLabel: `a = ${C(paraStd(cv).a)}, so ${happy ? "happy → minimum" : "sad → maximum"}.`,
        solution: [
          { s: `Only one number decides the shape: a, the number in front of x². Here a = ${C(paraStd(cv).a)}` },
          { s: `a is ${happy ? "positive, so the arms point UP" : "negative, so the arms point DOWN"}` },
          { s: `∴ ${happy ? "a happy parabola, and its turning point is the LOWEST point → a minimum" : "a sad parabola, and its turning point is the HIGHEST point → a maximum"}` },
        ] });
  },

  /* turning point */
  turningPoint: () => {
    const cv = randParabola();
    const tp = paraTP(cv);
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    return mc("parabolaShape", `What is the <b>turning point</b> of ${eqStr(cv, "f(x)")}?`,
      ptStr(tp.x, tp.y), ptDecoys(tp.x, tp.y),
      { graph: g.spec,
        hint: "x of the turning point = −b/(2a); substitute it back to get the y-value.",
        answerLabel: `Turning point ${ptStr(tp.x, tp.y)}.`,
        solution: (() => {
          const st = paraStd(cv);
          return [
            { s: `Read off the standard form y = ax² + bx + c: a = ${C(st.a)}, b = ${C(st.b)}, c = ${C(st.c)}` },
            { s: `x of the TP = −b/(2a) = −(${C(st.b)})/(2(${C(st.a)})) = ${C(tp.x)}`, r: "the shortcut, not a derivative" },
            { s: `Substitute that x back into f: f(${C(tp.x)}) = ${C(tp.y)}` },
            { s: `∴ turning point ${ptStr(tp.x, tp.y)}` },
          ];
        })() });
  },

  /* turning point straight from turning-point form — the p-sign trap */
  tpFormRead: () => {
    let p = randInt(-3, 3), q = randInt(-4, 4);
    while (p === 0 || q === 0 || p === q) { p = randInt(-3, 3); q = randInt(-4, 4); }
    const cv = { kind: "parabola", a: pick([1, -1, 2, -2]), p, q };
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    return mc("parabolaShape", `<b>${paraTPString(cv)}</b> is in turning-point form. What is its <b>turning point</b>?`,
      ptStr(p, q), [ptStr(-p, q), ptStr(q, p), ptStr(p, -q)],
      { graph: g.spec,
        hint: "In y = a(x − p)² + q the turning point is (p ; q) — the sign inside the bracket flips: (x − 2)² turns at x = +2, (x + 2)² at x = −2.",
        answerLabel: `Turning point ${ptStr(p, q)}.`,
        solution: [
          { s: `Compare with y = a(x − p)² + q` },
          { s: `The bracket reads (x ${p > 0 ? "−" : "+"} ${C(Math.abs(p))}), so p = ${C(p)}`, r: "OPPOSITE sign to what you see inside the bracket" },
          { s: `The number sitting outside the bracket is q = ${C(q)}`, r: "that one keeps its own sign" },
          { s: `∴ turning point (p ; q) = ${ptStr(p, q)}` },
        ] });
  },

  /* axis of symmetry */
  axisOfSymmetry: () => {
    const cv = randParabola();
    const tp = paraTP(cv);
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    return mc("parabolaShape", `What is the <b>axis of symmetry</b> of ${eqStr(cv, "f(x)")}?`,
      `x = ${C(tp.x)}`,
      [`y = ${C(tp.x)}`,
       tp.x === 0 ? `x = ${C(tp.x - 1)}` : `x = ${C(-tp.x)}`,                    // sign-flip decoy (or an offset when the TP is on the y-axis)
       -tp.x === tp.x + 1 ? `x = ${C(tp.x - 1)}` : `x = ${C(tp.x + 1)}`],        // avoid colliding with the sign-flip decoy at x = −0,5
      { graph: g.spec,
        hint: "The axis of symmetry is the vertical line through the turning point: x = (the x of the TP).",
        answerLabel: `x = ${C(tp.x)}.`,
        solution: (() => {
          const st = paraStd(cv);
          return [
            { s: "The axis of symmetry is the vertical line the parabola folds onto — it runs through the turning point" },
            { s: `So all you need is the x of the TP: x = −b/(2a) = −(${C(st.b)})/(2(${C(st.a)})) = ${C(tp.x)}` },
            { s: `∴ x = ${C(tp.x)}`, r: "a vertical line is written x = …, never y = …" },
          ];
        })() });
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
    return mc("domainRange", `What is the <b>range</b> of ${eqStr(cv, "f(x)")}?`,
      correct, wrongs,
      { graph: g.spec,
        hint: "Range = the y-values covered. A happy parabola starts at its minimum y and goes up (y ≥ min); a sad one (y ≤ max).",
        answerLabel: `Range: ${correct}.`,
        solution: [
          { s: "Range means: which y-values does the graph actually reach? So find the turning point first" },
          { s: `x = −b/(2a) = ${C(tp.x)}, and putting that back in gives y = ${C(tp.y)}` },
          { s: `a = ${C(a)} is ${a > 0 ? `positive → happy, so ${C(tp.y)} is the LOWEST y and the arms climb from there` : `negative → sad, so ${C(tp.y)} is the HIGHEST y and the arms fall away`}` },
          { s: `∴ ${correct}`, r: "the turning point y is included, so it is ≥ / ≤, not &gt; / &lt;" },
        ] });
  },
};

export const questFn2 = {
  id: "fn2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: id.startsWith("line") ? "linearGraph" : id === "parabolaRange" ? "domainRange" : "parabolaShape", gen,
  })),
};
