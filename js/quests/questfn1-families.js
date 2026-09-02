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

/* ---- worked-method text (2026-09-02 methods batch, session S3) ----
   Her notes' own sorting question — "where is the x?" (GR11-FUNCTIONS-NOTES
   -DIGEST pp1–2) — and her standard forms from the p18 summary table. */
const WHERE_X = {
  line: "there is just an x: no square, nothing in a denominator, nothing in an exponent",
  parabola: "there is an x² (or a squared bracket)",
  hyperbola: "the x sits in the DENOMINATOR",
  exp: "the x sits in the EXPONENT",
};
const STD_FORM = {
  line: "y = ax + q",
  parabola: "y = ax² + bx + c, or y = a(x − p)² + q",
  hyperbola: "y = a/(x − p) + q",
  exp: "y = a·b^(x − p) + q",
};
const SHAPE_TELL = {
  line: "it is dead straight — the same slope the whole way",
  parabola: "it turns once and is symmetric about a vertical line",
  hyperbola: "it comes in two separate branches, hugging a vertical and a horizontal dashed asymptote",
  exp: "it never turns — it keeps rising (or keeps falling) and flattens onto one horizontal asymptote",
};
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
        answerLabel: `${FAMILY[kind]}.`,
        solution: [
          { s: `Ask the one sorting question: where is the x?`, r: "that alone splits the four families" },
          { s: `In ${eqStr(cv)}, ${WHERE_X[kind]}` },
          { s: `That is the ${FAMILY[kind]} shape: ${STD_FORM[kind]}` },
        ] });
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
        answerLabel: `${FAMILY[kind]}.`,
        solution: [
          { s: "Go by the shape: count the turning points, then look for dashed asymptotes" },
          { s: `Here ${SHAPE_TELL[kind]}` },
          { s: `Only the ${FAMILY[kind]} does that`, r: `equation form ${STD_FORM[kind]}` },
        ] });
  },

  /* the feature that tells two families apart */
  featureMatch: () => {
    const cases = [
      { p: "Which graph has a <b>turning point</b>?", c: "Parabola", w: ["Straight line", "Hyperbola", "Exponential graph"],
        sol: [{ s: "A turning point means the graph stops going one way and comes back the other way" },
              { s: "A line never turns, an exponential never turns, and a hyperbola's branches just run away to their asymptotes" },
              { s: "Only the parabola turns — at its vertex (p ; q)", r: "happy → minimum, sad → maximum" }] },
      { p: "Which graph has <b>two asymptotes</b> (one vertical, one horizontal)?", c: "Hyperbola", w: ["Parabola", "Straight line", "Exponential graph"],
        sol: [{ s: "y = a/(x − p) + q breaks down when the denominator is 0, i.e. at x = p", r: "the vertical asymptote" },
              { s: "And a/(x − p) can shrink towards 0 but never reach it, so y never reaches q", r: "the horizontal asymptote" },
              { s: "Two asymptotes → hyperbola", r: "the exponential has only the horizontal one" }] },
      { p: "Which graph has <b>one horizontal asymptote</b> and no turning point?", c: "Exponential graph", w: ["Parabola", "Straight line", "Hyperbola"],
        sol: [{ s: "In y = a·b^(x − p) + q the power term shrinks towards 0 on one side, so y flattens onto y = q", r: "one horizontal asymptote" },
              { s: "It is defined for every x, so nothing breaks and there is no vertical asymptote" },
              { s: "It also never turns — it is taking off or landing the whole way", r: "∴ the exponential graph" }] },
      { p: "Which graph has a <b>constant gradient</b> (the same slope everywhere)?", c: "Straight line", w: ["Parabola", "Hyperbola", "Exponential graph"],
        sol: [{ s: "Gradient = rise/run between two points on the graph" },
              { s: "On a curve that answer changes depending on which two points you pick", r: "curves get steeper or flatter" },
              { s: "Only a straight line gives the same rise/run everywhere — that is a of y = ax + q" }] },
      { p: "Which graph is made of <b>two separate branches</b>?", c: "Hyperbola", w: ["Parabola", "Straight line", "Exponential graph"],
        sol: [{ s: "y = a/(x − p) + q is undefined at x = p", r: "you cannot divide by 0" },
              { s: "So the graph has a hole right through it at that x-value and cannot cross over" },
              { s: "It is forced into two separate branches, one each side of x = p" }] },
    ];
    const k = pick(cases);
    return mc("funcTypes", k.p, k.c, k.w,
      { hint: "Turning point → parabola; two asymptotes & two branches → hyperbola; one asymptote, always rising or falling → exponential; constant slope → line.",
        answerLabel: `${k.c}.`,
        solution: k.sol });
  },

  /* function notation basics */
  notation: () => {
    const cases = [
      { p: "In f(x) = 2x − 1, what does <b>f(3)</b> mean?", c: "The y-value when x = 3", w: ["Multiply f by 3", "The x-value when y = 3", "The gradient at x = 3"],
        sol: [{ s: "f(x) = 2x − 1 is a machine: an x goes in, a y comes out" },
              { s: "The bracket holds whatever you feed it, so f(3) = 2(3) − 1 = 5" },
              { s: "That 5 is a y-value, so f(3) is the y-value when x = 3", r: "the point (3 ; 5) is on the graph" }] },
      { p: "f(x), g(x) and h(x) are different names for which variable?", c: "y", w: ["x", "the gradient", "the x-intercept"],
        sol: [{ s: "y = 2x − 1 and f(x) = 2x − 1 say exactly the same thing" },
              { s: "The letter in front is just the graph's NAME, so f, g and h can share one set of axes", r: "that is how f(x) > g(x) questions are written" },
              { s: "Whatever the name, the bracket gives back a y-value" }] },
      { p: "“The y-intercept” is the point where…", c: "x = 0", w: ["y = 0", "the graph turns", "the asymptote is"],
        sol: [{ s: "The y-axis IS the line x = 0", r: "every point on it has x-coordinate 0" },
              { s: "So the graph meets the y-axis where x = 0 — substitute x = 0 into the equation" },
              { s: "The answer is a point: (0 ; the value you got)" }] },
      { p: "“The x-intercept(s)” (the roots) are where…", c: "y = 0", w: ["x = 0", "the graph turns", "y is biggest"],
        sol: [{ s: "The x-axis IS the line y = 0", r: "every point on it has y-coordinate 0" },
              { s: "So put y = 0 and solve the equation for x", r: "that is why roots and x-intercepts are the same thing" },
              { s: "Each answer is a point: (the x you got ; 0)" }] },
    ];
    const k = pick(cases);
    return mc("funcTypes", k.p, k.c, k.w,
      { hint: "f(3) substitutes x = 3 and gives back the y-value. y-intercept: let x = 0. x-intercepts: let y = 0.",
        answerLabel: k.c,
        solution: k.sol });
  },
};

export const questFn1 = {
  id: "fn1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "funcTypes", gen })),
};
