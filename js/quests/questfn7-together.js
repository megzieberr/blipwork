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
import { L } from "../lang.js";

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
    return mc("intersections", L("Read the <b>point of intersection</b> of f and g off the graph.", "Lees die <b>snypunt</b> van f en g van die grafiek af."),
      ptStr(ix, iy), ptDecoys(ix, iy),
      { graph: spec, hint: L("The intersection is the one point on BOTH graphs. Follow the dashed lines to each axis.", "Die snypunt is die een punt op BEIDE grafieke. Volg die stippellyne na elke as."),
        answerLabel: L(`They meet at ${ptStr(ix, iy)}.`, `Hulle sny mekaar by ${ptStr(ix, iy)}.`),
        solution: [
          { s: L("The point of intersection is the one place that lies on BOTH graphs at once", "Die snypunt is die een plek wat tegelyk op BEIDE grafieke lê") },
          { s: L(`Drop the dashed line down to the x-axis: x = ${C(ix)}`, `Volg die stippellyn af na die x-as: x = ${C(ix)}`) },
          { s: L(`Run the dashed line across to the y-axis: y = ${C(iy)}`, `Volg die stippellyn oor na die y-as: y = ${C(iy)}`), r: L(`∴ they meet at ${ptStr(ix, iy)}`, `∴ hulle sny mekaar by ${ptStr(ix, iy)}`) },
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
    const correct = fSteeper ? L(`x > ${C(ix)}`, `x > ${C(ix)}`) : L(`x &lt; ${C(ix)}`, `x &lt; ${C(ix)}`);
    const wrong = fSteeper ? L(`x &lt; ${C(ix)}`, `x &lt; ${C(ix)}`) : L(`x > ${C(ix)}`, `x > ${C(ix)}`);
    const win = winFor([{ x: ix, y: iy }, { x: 0, y: f.q }, { x: 0, y: g.q }]);
    const spec = {
      type: "function", accent: ACC, grid: true, win,
      curves: [{ ...f, tone: "a", label: "f", labelAt: labelX(f, win, win.xmax - 1.4) }, { ...g, tone: "b", label: "g", labelAt: labelX(g, win, win.xmin + 1.4) }],
      points: [{ x: ix, y: iy, on: [0, 1], label: ptStr(ix, iy) }],
    };
    return mc("intersections", L("Use the graph. For which x-values is <b>f(x) &gt; g(x)</b> (f above g)?", "Gebruik die grafiek. Vir watter x-waardes is <b>f(x) &gt; g(x)</b> (f bo g)?"),
      correct, [wrong, L("all real x", "alle reële x"), L(`x = ${C(ix)}`, `x = ${C(ix)}`)],
      { graph: spec, hint: L("f &gt; g where the f-line is higher than the g-line. They swap over at the intersection.", "f &gt; g waar die f-lyn hoër as die g-lyn is. Hulle ruil plek by die snypunt."),
        answerLabel: L(`f(x) &gt; g(x) for ${correct}.`, `f(x) &gt; g(x) vir ${correct}.`),
        solution: [
          { s: L(`The two lines cross at ${ptStr(ix, iy)}, so cut a line down through x = ${C(ix)}`, `Die twee lyne sny mekaar by ${ptStr(ix, iy)}, dus sny ons reguit af deur x = ${C(ix)}`), r: L("that cut is the only place they swap over", "net by dié snit ruil hulle plek") },
          { s: L(`f has gradient ${C(a1)} and g has gradient ${C(a2)}, so f has the ${fSteeper ? "bigger" : "smaller"} gradient`, `f het gradiënt ${C(a1)} en g het gradiënt ${C(a2)}, dus het f die ${fSteeper ? "groter" : "kleiner"} gradiënt`) },
          { s: L(`To the right of the cut the line with the bigger gradient is on top, so f is above g ${fSteeper ? "on the right" : "on the left"}`, `Regs van die snit is die lyn met die groter gradiënt bo, dus is f bo g aan die ${fSteeper ? "regterkant" : "linkerkant"}`) },
          { s: `∴ ${correct}`, r: L("answer in x, written x first", "antwoord in x, skryf x eerste") },
        ] });
  },

  /* nature of roots */
  natureRoots: () => {
    const cv = randParabola(), tp = paraTP(cv), happy = paraStd(cv).a > 0;
    const cases = [
      { p: L("A parabola that <b>touches</b> the x-axis at exactly one point has…", "'n Parabool wat die x-as by presies een punt <b>raak</b>, het…"), c: L("two equal roots (Δ = 0)", "twee gelyke wortels (Δ = 0)"),
        w: [L("two unequal roots (Δ &gt; 0)", "twee ongelyke wortels (Δ &gt; 0)"), L("non-real roots (Δ &lt; 0)", "nie-reële wortels (Δ &lt; 0)"), L("no turning point", "geen draaipunt nie")],
        sol: [{ s: L("The roots ARE the x-intercepts, so count how many times the curve meets the x-axis", "Die wortels IS die x-afsnitte, dus tel hoeveel keer die kurwe die x-as tref") },
              { s: L("Touching at exactly one point means the two roots have landed on top of each other", "Raak dit by presies een punt, het die twee wortels bo-op mekaar beland") },
              { s: L("That is Δ = 0", "Dit is Δ = 0"), r: L("her wording: real, rational, equal — only the turning point touches the axis", "haar woorde: reëel, rasionaal, gelyk. Net die draaipunt raak die as") }] },
      { p: L("A parabola that <b>cuts</b> the x-axis at two points has…", "'n Parabool wat die x-as by twee punte <b>sny</b>, het…"), c: L("two real, unequal roots (Δ &gt; 0)", "twee reële, ongelyke wortels (Δ &gt; 0)"),
        w: [L("two equal roots (Δ = 0)", "twee gelyke wortels (Δ = 0)"), L("non-real roots (Δ &lt; 0)", "nie-reële wortels (Δ &lt; 0)"), L("no y-intercept", "geen y-afsnit nie")],
        sol: [{ s: L("The roots ARE the x-intercepts, so count how many times the curve meets the x-axis", "Die wortels IS die x-afsnitte, dus tel hoeveel keer die kurwe die x-as tref") },
              { s: L("Two separate crossings means two different answers for x", "Twee aparte snypunte beteken twee verskillende antwoorde vir x") },
              { s: L("That is Δ &gt; 0", "Dit is Δ &gt; 0"), r: L("real and unequal — rational if Δ is a perfect □, irrational if not", "reëel en ongelyk: rasionaal as Δ 'n volkome □ is, anders irrasionaal") }] },
      { p: L("A parabola that <b>never reaches</b> the x-axis has…", "'n Parabool wat die x-as <b>nooit bereik nie</b>, het…"), c: L("non-real roots (Δ &lt; 0)", "nie-reële wortels (Δ &lt; 0)"),
        w: [L("two equal roots (Δ = 0)", "twee gelyke wortels (Δ = 0)"), L("two real roots (Δ &gt; 0)", "twee reële wortels (Δ &gt; 0)"), L("a gradient of 0", "'n gradiënt van 0")],
        sol: [{ s: L("The roots ARE the x-intercepts, so count how many times the curve meets the x-axis", "Die wortels IS die x-afsnitte, dus tel hoeveel keer die kurwe die x-as tref") },
              { s: L("It never gets there, so there is no real x that makes y = 0", "Dit kom nooit daar uit nie, dus is daar geen reële x wat y = 0 maak nie") },
              { s: L("In the formula that means a negative under the √", "In die formule beteken dit 'n negatiewe getal onder die √"), r: L("Δ &lt; 0 → non-real / imaginary", "Δ &lt; 0 → nie-reëel / imaginêr") }] },
      happy
        ? { p: L(`f has a minimum turning point at ${ptStr(tp.x, tp.y)}. The line y = k cuts f at <b>two</b> points when…`, `f het 'n minimum draaipunt by ${ptStr(tp.x, tp.y)}. Die lyn y = k sny f by <b>twee</b> punte as…`), c: L(`k &gt; ${C(tp.y)}`, `k &gt; ${C(tp.y)}`), w: [L(`k &lt; ${C(tp.y)}`, `k &lt; ${C(tp.y)}`), L(`k = ${C(tp.y)}`, `k = ${C(tp.y)}`), L(`k ≥ ${C(tp.y)}`, `k ≥ ${C(tp.y)}`)],
            sol: [{ s: L(`y = k is a flat line you slide up and down; f is happy with its lowest point at y = ${C(tp.y)}`, `y = k is 'n plat lyn wat jy op en af skuif; f is happy met sy laagste punt by y = ${C(tp.y)}`) },
                  { s: L(`Slide the line below ${C(tp.y)} and it misses; land it exactly on ${C(tp.y)} and it touches once, at the turning point`, `Skuif die lyn tot onder ${C(tp.y)} en dit mis; presies op ${C(tp.y)} raak dit een keer, by die draaipunt`) },
                  { s: L(`Only above ${C(tp.y)} does it cut both arms`, `Net bo ${C(tp.y)} sny dit albei arms`), r: L(`∴ k &gt; ${C(tp.y)} — strictly greater, since k = ${C(tp.y)} gives one point, not two`, `∴ k &gt; ${C(tp.y)}: streng groter, want k = ${C(tp.y)} gee een punt, nie twee nie`) }] }
        : { p: L(`f has a maximum turning point at ${ptStr(tp.x, tp.y)}. The line y = k cuts f at <b>two</b> points when…`, `f het 'n maksimum draaipunt by ${ptStr(tp.x, tp.y)}. Die lyn y = k sny f by <b>twee</b> punte as…`), c: L(`k &lt; ${C(tp.y)}`, `k &lt; ${C(tp.y)}`), w: [L(`k &gt; ${C(tp.y)}`, `k &gt; ${C(tp.y)}`), L(`k = ${C(tp.y)}`, `k = ${C(tp.y)}`), L(`k ≤ ${C(tp.y)}`, `k ≤ ${C(tp.y)}`)],
            sol: [{ s: L(`y = k is a flat line you slide up and down; f is sad with its highest point at y = ${C(tp.y)}`, `y = k is 'n plat lyn wat jy op en af skuif; f is sad met sy hoogste punt by y = ${C(tp.y)}`) },
                  { s: L(`Slide the line above ${C(tp.y)} and it misses; land it exactly on ${C(tp.y)} and it touches once, at the turning point`, `Skuif die lyn tot bo ${C(tp.y)} en dit mis; presies op ${C(tp.y)} raak dit een keer, by die draaipunt`) },
                  { s: L(`Only below ${C(tp.y)} does it cut both arms`, `Net onder ${C(tp.y)} sny dit albei arms`), r: L(`∴ k &lt; ${C(tp.y)} — strictly less, since k = ${C(tp.y)} gives one point, not two`, `∴ k &lt; ${C(tp.y)}: streng kleiner, want k = ${C(tp.y)} gee een punt, nie twee nie`) }] },
    ];
    const k = pick(cases);
    return mc("natureRoots", k.p, k.c, k.w,
      { hint: L("Touches once → equal roots (Δ = 0). Cuts twice → Δ &gt; 0. Misses → Δ &lt; 0. The horizontal line y = k meets the parabola twice when it is past the turning-point value.", "Raak een keer → gelyke wortels (Δ = 0). Sny twee keer → Δ &gt; 0. Mis → Δ &lt; 0. Die horisontale lyn y = k tref die parabool twee keer as dit verby die draaipunt se waarde is."),
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
      prompt: L(`For <b>${eqStr(cv, "f(x)")}</b>, calculate the <b>average gradient</b> between x = ${C(x1)} and x = ${C(x2)} (2 decimals).`, `Vir <b>${eqStr(cv, "f(x)")}</b>, bereken die <b>gemiddelde gradiënt</b> tussen x = ${C(x1)} en x = ${C(x2)} (2 desimale).`),
      graph: spec, expected: m, dp: 2, allowNeg: true,
      hint: L("Average gradient = (y₂ − y₁) / (x₂ − x₁) — the slope of the dashed line joining the two points. Substitute each x into f to get its y first.", "Gemiddelde gradiënt = (y₂ − y₁) / (x₂ − x₁): die helling van die stippellyn wat die twee punte verbind. Vervang eers elke x in f om sy y te kry."),
      answerLabel: L(`average gradient = ${fix(m, 2)}`, `gemiddelde gradiënt = ${fix(m, 2)}`),
      solution: [
        { s: L(`f(${C(x1)}) = ${C(f(x1))} and f(${C(x2)}) = ${C(f(x2))}`, `f(${C(x1)}) = ${C(f(x1))} en f(${C(x2)}) = ${C(f(x2))}`) },
        { s: L(`gradient = (${C(f(x2))} − ${C(f(x1))}) / (${C(x2)} − ${C(x1)}) = ${fix(m, 2)}`, `gradiënt = (${C(f(x2))} − ${C(f(x1))}) / (${C(x2)} − ${C(x1)}) = ${fix(m, 2)}`) },
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
      prompt: L(`The sketch shows <b>${eqStr(f, "f(x)")}</b> and <b>${eqStr(g, "g(x)")}</b>. AB is a vertical line between g (top) and f (bottom). Calculate the <b>maximum length</b> of AB (2 decimals).`, `Die skets wys <b>${eqStr(f, "f(x)")}</b> en <b>${eqStr(g, "g(x)")}</b>. AB is 'n vertikale lyn tussen g (bo) en f (onder). Bereken die <b>maksimum lengte</b> van AB (2 desimale).`),
      graph: spec,
      steps: [
        mcStep(L("AB runs from g on top to f below. AB = ?", "AB loop van g bo na f onder. AB = ?"),
          L("g(x) − f(x)", "g(x) − f(x)"),
          [L("f(x) − g(x)", "f(x) − g(x)"), L("g(x) + f(x)", "g(x) + f(x)"), L("g(x) × f(x)", "g(x) × f(x)")],
          L("AB is the gap between the graphs: top − bottom. g is on top, f is on the bottom.", "AB is die gaping tussen die grafieke: bo − onder. g is bo, f is onder.")),
        mcStep(L("Subtract and simplify — which parabola is AB?", "Trek af en vereenvoudig: watter parabool is AB?"),
          correctEq, wrongEqs,
          L("Every term of f(x) changes sign when you subtract it: a flips from +1 to −1, and f's other two terms are SUBTRACTED, not added.", "Elke term van f(x) verander van teken as jy dit aftrek: a draai om van +1 na −1, en f se ander twee terme word AFGETREK, nie opgetel nie.")),
        calcStep(L("Where does AB turn?", "Waar draai AB?"), xStar,
          L("x = −b/(2a) of AB.", "x = −b/(2a) van AB."), { dp: 2, tol: 0.001, allowNeg: true }),
        calcStep(L("The maximum length of AB (2 decimals).", "Die maksimum lengte van AB (2 desimale)."), length,
          L("Substitute your x back into AB = g(x) − f(x).", "Vervang jou x terug in AB = g(x) − f(x)."), { dp: 2, tol: 0.001 }),
      ],
      expected: length, dp: 2,
      hint: L("AB = (top graph) − (bottom graph) = g(x) − f(x). That makes a new parabola; its maximum is at x = −b/(2a), then substitute back.", "AB = (boonste grafiek) − (onderste grafiek) = g(x) − f(x). Dit gee 'n nuwe parabool; sy maksimum is by x = −b/(2a), vervang dan terug."),
      answerLabel: L(`maximum AB = ${fix(length, 2)} units`, `maksimum AB = ${fix(length, 2)} eenhede`),
      solution: [
        { s: L("AB = g(x) − f(x) — keep the brackets when subtracting", "AB = g(x) − f(x): hou die hakies as jy aftrek"), r: L("top − bottom", "bo − onder") },
        { s: correctEq, r: L("a new (sad) parabola", "'n nuwe (sad) parabool") },
        { s: L(`it turns at x = ${fix(xStar, 2)}`, `dit draai by x = ${fix(xStar, 2)}`), r: L("−b/(2a)", "−b/(2a)") },
        { s: L(`max AB = ${fix(length, 2)} units`, `maks AB = ${fix(length, 2)} eenhede`), r: L("substitute back", "vervang terug") },
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
