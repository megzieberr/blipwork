/* ============================================================
   FUNCTIONS QUEST 2 · The straight line & the parabola   ★ DIAGRAM
   Gradient & intercepts of a line; happy/sad, turning point, axis
   of symmetry, range of a parabola.
   ============================================================ */
import { mc } from "./_shared.js";
import { lineGraph, parabolaGraph, randLine, randParabola, ptDecoys } from "./_func.js";
import { eqStr, paraTP, paraStd, paraTPString, lineXInt, lineYInt, rangeStr, ptStr, C, pick, randInt } from "../funclib.js";
import { L } from "../lang.js";

const ACC = "#0d9488";

/* ---- worked-method helpers (2026-09-02 methods batch, session S3) ----
   String builders only — no randomness, so the seeded rng stream is
   untouched. `axTerm` keeps her "never print 1x" habit; `signed` writes
   "+ 4" / "− 4" the way a substitution line reads. */
const axTerm = (a, v = L("x", "x")) => (a === 1 ? v : a === -1 ? `−${v}` : `${C(a)}${v}`);
const signed = (n) => (n < 0 ? `− ${C(-n)}` : `+ ${C(n)}`);

const SKILLS = {
  /* increasing / decreasing line + what q is */
  lineDirection: () => {
    const cv = randLine();
    const g = lineGraph(cv, { accent: ACC, label: "f" });
    const inc = cv.a > 0;
    return mc("linearGraph", L(`For <b>${eqStr(cv, "f(x)")}</b>, the line is…`, `Vir <b>${eqStr(cv, "f(x)")}</b> is die lyn…`),
      inc ? L("increasing (slopes up)", "stygend (loop op)") : L("decreasing (slopes down)", "dalend (loop af)"),
      [inc ? L("decreasing (slopes down)", "dalend (loop af)") : L("increasing (slopes up)", "stygend (loop op)"), L("horizontal", "horisontaal"), L("vertical", "vertikaal")],
      { graph: g.spec,
        hint: L("In y = ax + q the gradient is a. a &gt; 0 → up, a &lt; 0 → down.", "In y = ax + q is die gradiënt a. a &gt; 0 → op, a &lt; 0 → af."),
        answerLabel: L(`a = ${C(cv.a)} ${inc ? "&gt; 0, so increasing" : "&lt; 0, so decreasing"}.`, `a = ${C(cv.a)}, ${inc ? "dus a &gt; 0: stygend" : "dus a &lt; 0: dalend"}.`),
        solution: [
          { s: L(`Compare with y = ax + q: here a = ${C(cv.a)}`, `Vergelyk met y = ax + q: hier is a = ${C(cv.a)}`), r: L("a is the gradient, q is the y-intercept", "a is die gradiënt, q is die y-afsnit") },
          { s: L(`a is ${inc ? "positive" : "negative"}, and it is the gradient that decides the direction`, `a is ${inc ? "positief" : "negatief"}, en dit is die gradiënt wat die rigting bepaal`),
            r: L(`a &gt; 0 climbs left to right, a &lt; 0 falls`, `a &gt; 0 klim van links na regs, a &lt; 0 val`) },
          { s: L(`∴ the line is ${inc ? "increasing — it slopes up" : "decreasing — it slopes down"}`, `∴ die lyn is ${inc ? "stygend: dit loop op" : "dalend: dit loop af"}`) },
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
      ? mc("linearGraph", L(`What is the <b>x-intercept</b> of ${eqStr(cv, "f(x)")}?`, `Wat is die <b>x-afsnit</b> van ${eqStr(cv, "f(x)")}?`),
          ptStr(xi, 0), ptDecoys(xi, 0),
          { graph: g.spec, hint: L("x-intercept: let y = 0 and solve for x.", "x-afsnit: stel y = 0 en los op vir x."), answerLabel: L(`x-intercept ${ptStr(xi, 0)}.`, `x-afsnit ${ptStr(xi, 0)}.`),
            solution: [
              { s: L(`The x-axis is the line y = 0, so put y = 0 into ${eqStr(cv, "f(x)")}`, `Die x-as is die lyn y = 0, dus vervang y = 0 in ${eqStr(cv, "f(x)")}`) },
              { s: `0 = ${axTerm(cv.a)} ${signed(cv.q)}  →  ${axTerm(cv.a)} = ${C(-cv.q)}`, r: L("take q across", "bring q oor") },
              { s: L(`x = ${C(xi)}, so the x-intercept is ${ptStr(xi, 0)}`, `x = ${C(xi)}, dus is die x-afsnit ${ptStr(xi, 0)}`), r: L("write it as a point, with a semicolon", "skryf dit as 'n punt, met 'n kommapunt") },
            ] })
      : mc("linearGraph", L(`What is the <b>y-intercept</b> of ${eqStr(cv, "f(x)")}?`, `Wat is die <b>y-afsnit</b> van ${eqStr(cv, "f(x)")}?`),
          ptStr(0, yi), ptDecoys(0, yi),
          { graph: g.spec, hint: L("y-intercept: let x = 0. For y = ax + q that is just q.", "y-afsnit: stel x = 0. Vir y = ax + q is dit net q."), answerLabel: L(`y-intercept ${ptStr(0, yi)}.`, `y-afsnit ${ptStr(0, yi)}.`),
            solution: [
              { s: L(`The y-axis is the line x = 0, so put x = 0 into ${eqStr(cv, "f(x)")}`, `Die y-as is die lyn x = 0, dus vervang x = 0 in ${eqStr(cv, "f(x)")}`) },
              { s: L(`f(0) = ${axTerm(cv.a, "(0)")} ${signed(cv.q)} = ${C(yi)}`, `f(0) = ${axTerm(cv.a, "(0)")} ${signed(cv.q)} = ${C(yi)}`), r: L("the x-term falls away", "die x-term val weg") },
              { s: L(`y-intercept ${ptStr(0, yi)}`, `y-afsnit ${ptStr(0, yi)}`), r: L("in y = ax + q the y-intercept is always just q", "in y = ax + q is die y-afsnit altyd net q") },
            ] });
  },

  /* happy or sad → min or max value */
  happySad: () => {
    const cv = randParabola();
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    const happy = paraStd(cv).a > 0;
    return mc("parabolaShape", L(`The parabola <b>${eqStr(cv, "f(x)")}</b> is…`, `Die parabool <b>${eqStr(cv, "f(x)")}</b> is…`),
      happy ? L("“happy” (opens up) — it has a minimum", "“happy” (oop na bo): dit het 'n minimum") : L("“sad” (opens down) — it has a maximum", "“sad” (oop na onder): dit het 'n maksimum"),
      [happy ? L("“sad” (opens down) — it has a maximum", "“sad” (oop na onder): dit het 'n maksimum") : L("“happy” (opens up) — it has a minimum", "“happy” (oop na bo): dit het 'n minimum"),
       L("a straight line", "'n reguit lyn"), L("always increasing", "altyd stygend")],
      { graph: g.spec,
        hint: L("a &gt; 0 → opens up (minimum); a &lt; 0 → opens down (maximum).", "a &gt; 0 → oop na bo (minimum); a &lt; 0 → oop na onder (maksimum)."),
        answerLabel: L(`a = ${C(paraStd(cv).a)}, so ${happy ? "happy → minimum" : "sad → maximum"}.`, `a = ${C(paraStd(cv).a)}, dus ${happy ? "happy → minimum" : "sad → maksimum"}.`),
        solution: [
          { s: L(`Only one number decides the shape: a, the number in front of x². Here a = ${C(paraStd(cv).a)}`, `Net een getal besluit die vorm: a, die getal voor x². Hier is a = ${C(paraStd(cv).a)}`) },
          { s: L(`a is ${happy ? "positive, so the arms point UP" : "negative, so the arms point DOWN"}`, `a is ${happy ? "positief, dus wys die arms OP" : "negatief, dus wys die arms AF"}`) },
          { s: `∴ ${happy ? L("a happy parabola, and its turning point is the LOWEST point → a minimum", "'n happy parabool, en sy draaipunt is die LAAGSTE punt → 'n minimum") : L("a sad parabola, and its turning point is the HIGHEST point → a maximum", "'n sad parabool, en sy draaipunt is die HOOGSTE punt → 'n maksimum")}` },
        ] });
  },

  /* turning point */
  turningPoint: () => {
    const cv = randParabola();
    const tp = paraTP(cv);
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    return mc("parabolaShape", L(`What is the <b>turning point</b> of ${eqStr(cv, "f(x)")}?`, `Wat is die <b>draaipunt</b> van ${eqStr(cv, "f(x)")}?`),
      ptStr(tp.x, tp.y), ptDecoys(tp.x, tp.y),
      { graph: g.spec,
        hint: L("x of the turning point = −b/(2a); substitute it back to get the y-value.", "x van die draaipunt = −b/(2a); vervang dit terug om die y-waarde te kry."),
        answerLabel: L(`Turning point ${ptStr(tp.x, tp.y)}.`, `Draaipunt ${ptStr(tp.x, tp.y)}.`),
        solution: (() => {
          const st = paraStd(cv);
          return [
            { s: L(`Read off the standard form y = ax² + bx + c: a = ${C(st.a)}, b = ${C(st.b)}, c = ${C(st.c)}`, `Lees die standaardvorm y = ax² + bx + c af: a = ${C(st.a)}, b = ${C(st.b)}, c = ${C(st.c)}`) },
            { s: L(`x of the TP = −b/(2a) = −(${C(st.b)})/(2(${C(st.a)})) = ${C(tp.x)}`, `x van die DP = −b/(2a) = −(${C(st.b)})/(2(${C(st.a)})) = ${C(tp.x)}`), r: L("the shortcut, not a derivative", "die kortpad, nie 'n afgeleide nie") },
            { s: L(`Substitute that x back into f: f(${C(tp.x)}) = ${C(tp.y)}`, `Vervang daardie x terug in f: f(${C(tp.x)}) = ${C(tp.y)}`) },
            { s: L(`∴ turning point ${ptStr(tp.x, tp.y)}`, `∴ draaipunt ${ptStr(tp.x, tp.y)}`) },
          ];
        })() });
  },

  /* turning point straight from turning-point form — the p-sign trap */
  tpFormRead: () => {
    let p = randInt(-3, 3), q = randInt(-4, 4);
    while (p === 0 || q === 0 || p === q) { p = randInt(-3, 3); q = randInt(-4, 4); }
    const cv = { kind: "parabola", a: pick([1, -1, 2, -2]), p, q };
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    return mc("parabolaShape", L(`<b>${paraTPString(cv)}</b> is in turning-point form. What is its <b>turning point</b>?`, `<b>${paraTPString(cv)}</b> is in draaipunt-vorm. Wat is sy <b>draaipunt</b>?`),
      ptStr(p, q), [ptStr(-p, q), ptStr(q, p), ptStr(p, -q)],
      { graph: g.spec,
        hint: L("In y = a(x − p)² + q the turning point is (p ; q) — the sign inside the bracket flips: (x − 2)² turns at x = +2, (x + 2)² at x = −2.", "In y = a(x − p)² + q is die draaipunt (p ; q), en die teken binne die hakie draai om: (x − 2)² draai by x = +2, (x + 2)² by x = −2."),
        answerLabel: L(`Turning point ${ptStr(p, q)}.`, `Draaipunt ${ptStr(p, q)}.`),
        solution: [
          { s: L(`Compare with y = a(x − p)² + q`, `Vergelyk met y = a(x − p)² + q`) },
          { s: L(`The bracket reads (x ${p > 0 ? "−" : "+"} ${C(Math.abs(p))}), so p = ${C(p)}`, `Die hakie lees (x ${p > 0 ? "−" : "+"} ${C(Math.abs(p))}), dus is p = ${C(p)}`), r: L("OPPOSITE sign to what you see inside the bracket", "TEENOORGESTELDE teken van wat jy binne die hakie sien") },
          { s: L(`The number sitting outside the bracket is q = ${C(q)}`, `Die getal buite die hakie is q = ${C(q)}`), r: L("that one keeps its own sign", "daardie een hou sy eie teken") },
          { s: L(`∴ turning point (p ; q) = ${ptStr(p, q)}`, `∴ draaipunt (p ; q) = ${ptStr(p, q)}`) },
        ] });
  },

  /* axis of symmetry */
  axisOfSymmetry: () => {
    const cv = randParabola();
    const tp = paraTP(cv);
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    return mc("parabolaShape", L(`What is the <b>axis of symmetry</b> of ${eqStr(cv, "f(x)")}?`, `Wat is die <b>simmetrie-as</b> van ${eqStr(cv, "f(x)")}?`),
      L(`x = ${C(tp.x)}`, `x = ${C(tp.x)}`),
      [L(`y = ${C(tp.x)}`, `y = ${C(tp.x)}`),
       tp.x === 0 ? L(`x = ${C(tp.x - 1)}`, `x = ${C(tp.x - 1)}`) : L(`x = ${C(-tp.x)}`, `x = ${C(-tp.x)}`),                    // sign-flip decoy (or an offset when the TP is on the y-axis)
       -tp.x === tp.x + 1 ? L(`x = ${C(tp.x - 1)}`, `x = ${C(tp.x - 1)}`) : L(`x = ${C(tp.x + 1)}`, `x = ${C(tp.x + 1)}`)],        // avoid colliding with the sign-flip decoy at x = −0,5
      { graph: g.spec,
        hint: L("The axis of symmetry is the vertical line through the turning point: x = (the x of the TP).", "Die simmetrie-as is die vertikale lyn deur die draaipunt: x = (die x van die DP)."),
        answerLabel: L(`x = ${C(tp.x)}.`, `x = ${C(tp.x)}.`),
        solution: (() => {
          const st = paraStd(cv);
          return [
            { s: L("The axis of symmetry is the vertical line the parabola folds onto — it runs through the turning point", "Die simmetrie-as is die vertikale lyn waarop die parabool vou: dit loop deur die draaipunt") },
            { s: L(`So all you need is the x of the TP: x = −b/(2a) = −(${C(st.b)})/(2(${C(st.a)})) = ${C(tp.x)}`, `Al wat jy dus nodig het, is die x van die DP: x = −b/(2a) = −(${C(st.b)})/(2(${C(st.a)})) = ${C(tp.x)}`) },
            { s: `∴ x = ${C(tp.x)}`, r: L("a vertical line is written x = …, never y = …", "'n vertikale lyn word as x = … geskryf, nooit as y = … nie") },
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
      a > 0 ? L(`y ≤ ${C(tp.y)}`, `y ≤ ${C(tp.y)}`) : L(`y ≥ ${C(tp.y)}`, `y ≥ ${C(tp.y)}`),
      L(`y ∈ ℝ`, `y ∈ ℝ`),
      a > 0 ? L(`y ≥ ${C(-tp.y)}`, `y ≥ ${C(-tp.y)}`) : L(`y ≤ ${C(-tp.y)}`, `y ≤ ${C(-tp.y)}`),
    ];
    return mc("domainRange", L(`What is the <b>range</b> of ${eqStr(cv, "f(x)")}?`, `Wat is die <b>waardeversameling</b> van ${eqStr(cv, "f(x)")}?`),
      correct, wrongs,
      { graph: g.spec,
        hint: L("Range = the y-values covered. A happy parabola starts at its minimum y and goes up (y ≥ min); a sad one (y ≤ max).", "Waardeversameling = die y-waardes wat gedek word. 'n Happy parabool begin by sy minimum y en gaan op (y ≥ min); 'n sad een (y ≤ maks)."),
        answerLabel: L(`Range: ${correct}.`, `Waardeversameling: ${correct}.`),
        solution: [
          { s: L("Range means: which y-values does the graph actually reach? So find the turning point first", "Waardeversameling beteken: watter y-waardes bereik die grafiek werklik? Kry dus eers die draaipunt") },
          { s: L(`x = −b/(2a) = ${C(tp.x)}, and putting that back in gives y = ${C(tp.y)}`, `x = −b/(2a) = ${C(tp.x)}, en as jy dit terugvervang, kry jy y = ${C(tp.y)}`) },
          { s: L(`a = ${C(a)} is ${a > 0 ? `positive → happy, so ${C(tp.y)} is the LOWEST y and the arms climb from there` : `negative → sad, so ${C(tp.y)} is the HIGHEST y and the arms fall away`}`, `a = ${C(a)} is ${a > 0 ? `positief → happy, dus is ${C(tp.y)} die LAAGSTE y en die arms klim van daar af op` : `negatief → sad, dus is ${C(tp.y)} die HOOGSTE y en die arms val weg`}`) },
          { s: `∴ ${correct}`, r: L("the turning point y is included, so it is ≥ / ≤, not &gt; / &lt;", "die y van die draaipunt is ingesluit, dus is dit ≥ / ≤, nie &gt; / &lt; nie") },
        ] });
  },
};

export const questFn2 = {
  id: "fn2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: id.startsWith("line") ? "linearGraph" : id === "parabolaRange" ? "domainRange" : "parabolaShape", gen,
  })),
};
