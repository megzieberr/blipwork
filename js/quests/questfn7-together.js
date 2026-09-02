/* ============================================================
   FUNCTIONS QUEST 7 · Putting graphs together   ★ DIAGRAM
   Intersections, comparing f and g, nature of roots (y = k),
   average gradient, and the maximum/minimum vertical length
   between two graphs.
   ============================================================ */
import { mc, mcStep, calcStep } from "./_shared.js";
import { winFor, labelX, randParabola, ptDecoys } from "./_func.js";
import {
  makeFn, lineThrough, paraTP, paraStd, parabolaFromRoots,
  avgGradient, eqStr, ptStr, fix, C, pick, randInt,
} from "../funclib.js";

const ACC = "#115e59";
const A = "var(--fg-a)", B = "var(--fg-b)";

const SKILLS = {
  /* read the intersection of two lines off the graph */
  intersectionRead: () => {
    let ix = randInt(-3, 3), iy = randInt(-3, 3);
    while (ix === 0 && iy === 0) { ix = randInt(-3, 3); iy = randInt(-3, 3); }   // not the origin — nothing to read there
    let a1 = randInt(-3, 3), a2 = randInt(-3, 3);
    while (a1 === a2 || a1 === 0 || a2 === 0) { a1 = randInt(-3, 3); a2 = randInt(-3, 3); }
    const f = { kind: "line", a: a1, q: iy - a1 * ix };
    const g = { kind: "line", a: a2, q: iy - a2 * ix };
    const win = winFor([{ x: ix, y: iy }, { x: 0, y: f.q }, { x: 0, y: g.q }]);
    const spec = {
      type: "function", accent: ACC, grid: true, win,
      curves: [{ ...f, tone: "a", label: "f", labelAt: labelX(f, win, win.xmax - 1.4) }, { ...g, tone: "b", label: "g", labelAt: labelX(g, win, win.xmin + 1.4) }],
      points: [{ x: ix, y: iy, on: [0, 1], dashTo: "both" }],
    };
    return mc("intersections", "Read the <b>point of intersection</b> of f and g off the graph.",
      ptStr(ix, iy), ptDecoys(ix, iy),
      { graph: spec, hint: "The intersection is the one point on BOTH graphs. Follow the dashed lines to each axis.",
        answerLabel: `They meet at ${ptStr(ix, iy)}.`,
        solution: [
          { s: "The point of intersection is the one place that lies on BOTH graphs at once" },
          { s: `Drop the dashed line down to the x-axis: x = ${C(ix)}` },
          { s: `Run the dashed line across to the y-axis: y = ${C(iy)}`, r: `∴ they meet at ${ptStr(ix, iy)}` },
        ] });
  },

  /* where is f above g? */
  fAboveG: () => {
    const ix = randInt(-2, 2), iy = randInt(-2, 3);
    let a1 = randInt(-3, 3), a2 = randInt(-3, 3);
    while (a1 === a2 || a1 === 0 || a2 === 0) { a1 = randInt(-3, 3); a2 = randInt(-3, 3); }
    const f = { kind: "line", a: a1, q: iy - a1 * ix };
    const g = { kind: "line", a: a2, q: iy - a2 * ix };
    const fSteeper = a1 > a2;                       // to the right of the crossing, the steeper line is on top
    const correct = fSteeper ? `x > ${C(ix)}` : `x &lt; ${C(ix)}`;
    const wrong = fSteeper ? `x &lt; ${C(ix)}` : `x > ${C(ix)}`;
    const win = winFor([{ x: ix, y: iy }, { x: 0, y: f.q }, { x: 0, y: g.q }]);
    const spec = {
      type: "function", accent: ACC, grid: true, win,
      curves: [{ ...f, tone: "a", label: "f", labelAt: labelX(f, win, win.xmax - 1.4) }, { ...g, tone: "b", label: "g", labelAt: labelX(g, win, win.xmin + 1.4) }],
      points: [{ x: ix, y: iy, on: [0, 1], label: ptStr(ix, iy) }],
    };
    return mc("intersections", "Use the graph. For which x-values is <b>f(x) &gt; g(x)</b> (f above g)?",
      correct, [wrong, "all real x", `x = ${C(ix)}`],
      { graph: spec, hint: "f &gt; g where the f-line is higher than the g-line. They swap over at the intersection.",
        answerLabel: `f(x) &gt; g(x) for ${correct}.`,
        solution: [
          { s: `The two lines cross at ${ptStr(ix, iy)}, so cut a line down through x = ${C(ix)}`, r: "that cut is the only place they swap over" },
          { s: `f has gradient ${C(a1)} and g has gradient ${C(a2)}, so f is the ${fSteeper ? "steeper" : "flatter"} of the two` },
          { s: `To the right of the cut the steeper line is on top, so f is above g ${fSteeper ? "on the right" : "on the left"}` },
          { s: `∴ ${correct}`, r: "answer in x, written x first" },
        ] });
  },

  /* nature of roots */
  natureRoots: () => {
    const cv = randParabola(), tp = paraTP(cv), happy = paraStd(cv).a > 0;
    const cases = [
      { p: "A parabola that <b>touches</b> the x-axis at exactly one point has…", c: "two equal roots (Δ = 0)",
        w: ["two unequal roots (Δ &gt; 0)", "non-real roots (Δ &lt; 0)", "no turning point"],
        sol: [{ s: "The roots ARE the x-intercepts, so count how many times the curve meets the x-axis" },
              { s: "Touching at exactly one point means the two roots have landed on top of each other" },
              { s: "That is Δ = 0", r: "her wording: real, rational, equal — only the turning point touches the axis" }] },
      { p: "A parabola that <b>cuts</b> the x-axis at two points has…", c: "two real, unequal roots (Δ &gt; 0)",
        w: ["two equal roots (Δ = 0)", "non-real roots (Δ &lt; 0)", "no y-intercept"],
        sol: [{ s: "The roots ARE the x-intercepts, so count how many times the curve meets the x-axis" },
              { s: "Two separate crossings means two different answers for x" },
              { s: "That is Δ &gt; 0", r: "real and unequal — rational if Δ is a perfect □, irrational if not" }] },
      { p: "A parabola that <b>never reaches</b> the x-axis has…", c: "non-real roots (Δ &lt; 0)",
        w: ["two equal roots (Δ = 0)", "two real roots (Δ &gt; 0)", "a gradient of 0"],
        sol: [{ s: "The roots ARE the x-intercepts, so count how many times the curve meets the x-axis" },
              { s: "It never gets there, so there is no real x that makes y = 0" },
              { s: "In the formula that means a negative under the √", r: "Δ &lt; 0 → non-real / imaginary" }] },
      happy
        ? { p: `f has a minimum turning point at ${ptStr(tp.x, tp.y)}. The line y = k cuts f at <b>two</b> points when…`, c: `k &gt; ${C(tp.y)}`, w: [`k &lt; ${C(tp.y)}`, `k = ${C(tp.y)}`, `k ≥ ${C(tp.y)}`],
            sol: [{ s: `y = k is a flat line you slide up and down; f is happy with its lowest point at y = ${C(tp.y)}` },
                  { s: `Slide the line below ${C(tp.y)} and it misses; land it exactly on ${C(tp.y)} and it touches once, at the turning point` },
                  { s: `Only above ${C(tp.y)} does it cut both arms`, r: `∴ k &gt; ${C(tp.y)} — strictly greater, since k = ${C(tp.y)} gives one point, not two` }] }
        : { p: `f has a maximum turning point at ${ptStr(tp.x, tp.y)}. The line y = k cuts f at <b>two</b> points when…`, c: `k &lt; ${C(tp.y)}`, w: [`k &gt; ${C(tp.y)}`, `k = ${C(tp.y)}`, `k ≤ ${C(tp.y)}`],
            sol: [{ s: `y = k is a flat line you slide up and down; f is sad with its highest point at y = ${C(tp.y)}` },
                  { s: `Slide the line above ${C(tp.y)} and it misses; land it exactly on ${C(tp.y)} and it touches once, at the turning point` },
                  { s: `Only below ${C(tp.y)} does it cut both arms`, r: `∴ k &lt; ${C(tp.y)} — strictly less, since k = ${C(tp.y)} gives one point, not two` }] },
    ];
    const k = pick(cases);
    return mc("natureRoots", k.p, k.c, k.w,
      { hint: "Touches once → equal roots (Δ = 0). Cuts twice → Δ &gt; 0. Misses → Δ &lt; 0. The horizontal line y = k meets the parabola twice when it is past the turning-point value.",
        answerLabel: k.c,
        solution: k.sol });
  },

  /* average gradient (calc) — the function is shown as an equation AND a graph,
     with the two points joined by the dashed average-gradient (secant) line */
  avgGradient: () => {
    // keep every feature within a modest y-band so the sketch stays readable
    let cv = randParabola(), x1, x2;
    for (;;) {
      x1 = randInt(-3, 1); x2 = x1 + randInt(2, 4);
      const fn = makeFn(cv);
      if (Math.max(Math.abs(fn(x1)), Math.abs(fn(x2)), Math.abs(paraTP(cv).y)) <= 12) break;
      cv = randParabola();
    }
    const f = makeFn(cv);
    const p1 = { x: x1, y: f(x1) }, p2 = { x: x2, y: f(x2) };
    const m = avgGradient(cv, x1, x2);
    const secant = lineThrough(p1, p2);
    const win = winFor([p1, p2, paraTP(cv)]);
    const spec = {
      type: "function", accent: ACC, grid: true, win,
      curves: [
        { ...cv, tone: "a", label: "f", labelAt: labelX(cv, win, win.xmin + 1.2) },
        { ...secant, tone: "b", dash: true },
      ],
      points: [
        { x: p1.x, y: p1.y, on: 0, label: ptStr(p1.x, p1.y), dashTo: "x" },
        { x: p2.x, y: p2.y, on: 0, label: ptStr(p2.x, p2.y), dashTo: "x" },
      ],
    };
    return {
      type: "calc", concept: "avgGradient",
      prompt: `For <b>${eqStr(cv, "f(x)")}</b>, calculate the <b>average gradient</b> between x = ${C(x1)} and x = ${C(x2)} (2 decimals).`,
      graph: spec, expected: m, dp: 2, allowNeg: true,
      hint: "Average gradient = (y₂ − y₁) / (x₂ − x₁) — the slope of the dashed line joining the two points. Substitute each x into f to get its y first.",
      answerLabel: `average gradient = ${fix(m, 2)}`,
      solution: [
        { s: `f(${C(x1)}) = ${C(f(x1))} and f(${C(x2)}) = ${C(f(x2))}` },
        { s: `gradient = (${C(f(x2))} − ${C(f(x1))}) / (${C(x2)} − ${C(x1)}) = ${fix(m, 2)}` },
      ],
    };
  },

  /* maximum vertical length between a line (on top) and a parabola.
     AUDIT DAY 2026-08-30 (Session 3, split 3): the heaviest single
     question in the app (4-line working) — the worked `solution`
     below is unchanged; it is what became the answered chain. Prompt,
     graph and numbers are unchanged too. */
  maxLength: () => {
    let r1, r2, f, tp, m, k, g, fb, fc, xStar, length;
    let correctEq, wrongEqs;
    // ⚠️ dedupe (foreman brief): a coefficient can land equal by chance
    // (e.g. f.b = 0 when the roots are symmetric about 0), which would
    // make one of the "classic slip" wrongs print IDENTICAL to the
    // correct AB equation. Regenerate the numbers until all four MC
    // labels are distinct — bounded so it can never spin forever.
    for (let tries = 0; tries < 60; tries++) {
      r1 = randInt(-3, 1); r2 = r1 + randInt(2, 4);
      f = parabolaFromRoots(1, r1, r2);                  // happy parabola, a = 1
      tp = paraTP(f);
      m = randInt(-2, 2);
      k = tp.y + randInt(3, 6) - m * tp.x;               // line passes above the vertex → real gap
      g = { kind: "line", a: m, q: k };
      // AB = g − f = −x² + (m − b)x + (k − c), a sad parabola → a maximum
      fb = f.b; fc = f.c;
      xStar = (m - fb) / 2;
      length = makeFn(g)(xStar) - makeFn(f)(xStar);
      correctEq = eqStr({ kind: "parabola", a: -1, b: m - fb, c: k - fc }, "AB");
      wrongEqs = [
        eqStr({ kind: "parabola", a: 1, b: m - fb, c: k - fc }, "AB"),        // forgot the sign flip
        eqStr({ kind: "parabola", a: -1, b: m + fb, c: k - fc }, "AB"),       // didn't subtract b
        eqStr({ kind: "parabola", a: -1, b: m - fb, c: k + fc }, "AB"),       // didn't subtract c
      ];
      if (new Set([correctEq, ...wrongEqs]).size === 4) break;
    }
    const win = winFor([tp, { x: xStar, y: makeFn(f)(xStar) }, { x: xStar, y: makeFn(g)(xStar) }, { x: r1, y: 0 }, { x: r2, y: 0 }]);
    const spec = {
      type: "function", accent: ACC, grid: true, win,
      curves: [{ ...f, tone: "a", label: "f", labelAt: labelX(f, win, win.xmin + 1.2) }, { ...g, tone: "b", label: "g", labelAt: labelX(g, win, win.xmax - 1.4) }],
      segment: { x: xStar, fromCurve: 1, toCurve: 0, label: "AB" },
    };
    return {
      type: "steps", concept: "maxLength",
      // the equations are STATED (her phone, 2026-08-23: "kinda impossible
      // without the equations of f and g" — a drill round never asks the
      // learner to find them from the sketch first)
      prompt: `The sketch shows <b>${eqStr(f, "f(x)")}</b> and <b>${eqStr(g, "g(x)")}</b>. AB is a vertical line between g (top) and f (bottom). Calculate the <b>maximum length</b> of AB (2 decimals).`,
      graph: spec,
      steps: [
        mcStep("AB runs from g on top to f below. AB = ?",
          "g(x) − f(x)",
          ["f(x) − g(x)", "g(x) + f(x)", "g(x) × f(x)"],
          "AB is the gap between the graphs: top − bottom. g is on top, f is on the bottom."),
        mcStep("Subtract and simplify — which parabola is AB?",
          correctEq, wrongEqs,
          "Every term of f(x) changes sign when you subtract it: a flips from +1 to −1, and f's other two terms are SUBTRACTED, not added."),
        calcStep("Where does AB turn?", xStar,
          "x = −b/(2a) of AB.", { dp: 2, tol: 0.001, allowNeg: true }),
        calcStep("The maximum length of AB (2 decimals).", length,
          "Substitute your x back into AB = g(x) − f(x).", { dp: 2, tol: 0.001 }),
      ],
      expected: length, dp: 2,
      hint: "AB = (top graph) − (bottom graph) = g(x) − f(x). That makes a new parabola; its maximum is at x = −b/(2a), then substitute back.",
      answerLabel: `maximum AB = ${fix(length, 2)} units`,
      solution: [
        { s: "AB = g(x) − f(x) — keep the brackets when subtracting", r: "top − bottom" },
        { s: correctEq, r: "a new (sad) parabola" },
        { s: `it turns at x = ${fix(xStar, 2)}`, r: "−b/(2a)" },
        { s: `max AB = ${fix(length, 2)} units`, r: "substitute back" },
      ],
    };
  },
};

export const questFn7 = {
  id: "fn7",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: id === "avgGradient" ? "avgGradient" : id === "maxLength" ? "maxLength" : id === "natureRoots" ? "natureRoots" : "intersections", gen,
  })),
};
