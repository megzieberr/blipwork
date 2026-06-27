/* ============================================================
   FUNCTIONS QUEST 1 · The four families   ★ DIAGRAM
   Recognise linear / parabola / hyperbola / exponential from the
   equation and from the graph; the vocabulary that tells them apart.
   ============================================================ */
import { mc } from "./_shared.js";
import {
  FAMILY, randCurveOf, lineGraph, parabolaGraph, hyperbolaGraph, expGraph,
} from "./_func.js";
import { eqStr, pick } from "../funclib.js";

const ACC = "#14b8a6";
const KINDS = ["line", "parabola", "hyperbola", "exp"];
const graphOf = (cv, opts) =>
  cv.kind === "line" ? lineGraph(cv, opts) :
  cv.kind === "parabola" ? parabolaGraph(cv, opts) :
  cv.kind === "hyperbola" ? hyperbolaGraph(cv, opts) : expGraph(cv, opts);

const SKILLS = {
  /* name the family from its equation */
  identifyFromEq: () => {
    const kind = pick(KINDS);
    const cv = randCurveOf[kind]();
    return mc("funcTypes", `What type of function is <b>${eqStr(cv)}</b>?`,
      FAMILY[kind], KINDS.filter((k) => k !== kind).map((k) => FAMILY[k]),
      { hint: "x in the exponent → exponential; x in the denominator → hyperbola; an x² → parabola; just x → straight line.",
        answerLabel: `${FAMILY[kind]}.` });
  },

  /* name the family from the drawn graph */
  nameFromGraph: () => {
    const kind = pick(KINDS);
    const cv = randCurveOf[kind]();
    const g = graphOf(cv, { accent: ACC });
    return mc("funcTypes", "Which type of function is graphed here?",
      FAMILY[kind], KINDS.filter((k) => k !== kind).map((k) => FAMILY[k]),
      { graph: g.spec,
        hint: "Two straight branches around dashed asymptotes → hyperbola; a U/∩ shape → parabola; a J that flattens to an asymptote → exponential.",
        answerLabel: `${FAMILY[kind]}.` });
  },

  /* the feature that tells two families apart */
  featureMatch: () => {
    const cases = [
      { p: "Which graph has a <b>turning point</b>?", c: "Parabola", w: ["Straight line", "Hyperbola", "Exponential graph"] },
      { p: "Which graph has <b>two asymptotes</b> (one vertical, one horizontal)?", c: "Hyperbola", w: ["Parabola", "Straight line", "Exponential graph"] },
      { p: "Which graph has <b>one horizontal asymptote</b> and no turning point?", c: "Exponential graph", w: ["Parabola", "Straight line", "Hyperbola"] },
      { p: "Which graph has a <b>constant gradient</b> (the same slope everywhere)?", c: "Straight line", w: ["Parabola", "Hyperbola", "Exponential graph"] },
      { p: "Which graph is made of <b>two separate branches</b>?", c: "Hyperbola", w: ["Parabola", "Straight line", "Exponential graph"] },
    ];
    const k = pick(cases);
    return mc("funcTypes", k.p, k.c, k.w,
      { hint: "Turning point → parabola; two asymptotes & two branches → hyperbola; one asymptote, always rising or falling → exponential; constant slope → line.",
        answerLabel: `${k.c}.` });
  },

  /* function notation basics */
  notation: () => {
    const cases = [
      { p: "In f(x) = 2x − 1, what does <b>f(3)</b> mean?", c: "The y-value when x = 3", w: ["Multiply f by 3", "The x-value when y = 3", "The gradient at x = 3"] },
      { p: "f(x), g(x) and h(x) are different names for which variable?", c: "y", w: ["x", "the gradient", "the x-intercept"] },
      { p: "“The y-intercept” is the point where…", c: "x = 0", w: ["y = 0", "the graph turns", "the asymptote is"] },
      { p: "“The x-intercept(s)” (the roots) are where…", c: "y = 0", w: ["x = 0", "the graph turns", "y is biggest"] },
    ];
    const k = pick(cases);
    return mc("funcTypes", k.p, k.c, k.w,
      { hint: "f(3) substitutes x = 3 and gives back the y-value. y-intercept: let x = 0. x-intercepts: let y = 0.",
        answerLabel: k.c });
  },
};

export const questFn1 = {
  id: "fn1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "funcTypes", gen })),
};
