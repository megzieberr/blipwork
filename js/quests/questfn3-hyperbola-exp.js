/* ============================================================
   FUNCTIONS QUEST 3 · Hyperbola & exponential   ★ DIAGRAM
   Asymptotes, branches, growth vs decay, domain & range.
   ============================================================ */
import { mc } from "./_shared.js";
import { hyperbolaGraph, expGraph, randHyperbola, randExp } from "./_func.js";
import { eqStr, domainStr, rangeStr, C, pick } from "../funclib.js";

const ACC = "#0f766e";

const SKILLS = {
  /* the two asymptotes of a hyperbola */
  hypAsymptotes: () => {
    let cv = randHyperbola();
    while (cv.p === cv.q) cv = randHyperbola();          // p ≠ q keeps the swapped decoy distinct
    const g = hyperbolaGraph(cv, { accent: ACC, label: "f" });
    return mc("hyperbolaGraph", `What are the <b>asymptotes</b> of ${eqStr(cv, "f(x)")}?`,
      `x = ${C(cv.p)} and y = ${C(cv.q)}`,
      [`x = ${C(cv.q)} and y = ${C(cv.p)}`, `x = ${C(cv.p)} and y = ${C(cv.q + 1)}`, `x = ${C(cv.p + 1)} and y = ${C(cv.q)}`],
      { graph: g.spec,
        hint: "For y = a/(x − p) + q the vertical asymptote is x = p and the horizontal asymptote is y = q.",
        answerLabel: `x = ${C(cv.p)} and y = ${C(cv.q)}.`,
        solution: [
          { s: `Compare with y = a/(x − p) + q: here p = ${C(cv.p)} and q = ${C(cv.q)}` },
          { s: cv.p === 0
              ? `The denominator is just x, and you cannot divide by 0, so x = 0 is forbidden`
              : `The denominator is 0 when x ${cv.p < 0 ? "+" : "−"} ${C(Math.abs(cv.p))} = 0, i.e. x = ${C(cv.p)}`,
            r: "that forbidden x is the VERTICAL asymptote" },
          { s: `The fraction can shrink towards 0 but never reaches it, so y never quite reaches ${C(cv.q)}`, r: "that is the HORIZONTAL asymptote" },
          { s: `∴ x = ${C(cv.p)} and y = ${C(cv.q)}` },
        ] });
  },

  /* domain & range of a hyperbola */
  hypDomainRange: () => {
    let cv = randHyperbola();
    while (cv.p === cv.q) cv = randHyperbola();          // p ≠ q keeps the swapped decoy distinct
    const g = hyperbolaGraph(cv, { accent: ACC, label: "f" });
    const askDom = pick([true, false]);
    return askDom
      ? mc("domainRange", `What is the <b>domain</b> of ${eqStr(cv, "f(x)")}?`,
          domainStr(cv), [`x ∈ ℝ`, `x ∈ ℝ, x ≠ ${C(cv.q)}`, `x ≠ ${C(cv.p)} only`],
          { graph: g.spec, hint: "The graph exists for every x except at the vertical asymptote x = p.", answerLabel: domainStr(cv),
            solution: [
              { s: "Domain asks: which x-values am I allowed to put in?" },
              { s: `Only one x breaks the formula — the one that makes the denominator 0, x = ${C(cv.p)}`, r: "you cannot divide by 0" },
              { s: `Everything else is fine, so ${domainStr(cv)}`, r: "the restriction rides after a semicolon" },
            ] })
      : mc("domainRange", `What is the <b>range</b> of ${eqStr(cv, "f(x)")}?`,
          rangeStr(cv), [`y ∈ ℝ`, `y ∈ ℝ, y ≠ ${C(cv.p)}`, `y ≠ ${C(-cv.q)} only`],
          { graph: g.spec, hint: "The y-values cover everything except the horizontal asymptote y = q.", answerLabel: rangeStr(cv),
            solution: [
              { s: "Range asks: which y-values does the graph actually reach?" },
              { s: `In y = a/(x − p) + q the fraction part can get tiny, but it can never be exactly 0` },
              { s: `So y can never be exactly ${C(cv.q)}, but it reaches everything else`, r: `∴ ${rangeStr(cv)}` },
            ] });
  },

  /* which way the branches go */
  hypBranches: () => {
    const cv = randHyperbola();
    const g = hyperbolaGraph(cv, { accent: ACC, label: "f" });
    const dec = cv.a > 0;
    return mc("hyperbolaGraph", `For ${eqStr(cv, "f(x)")}, each branch is…`,
      dec ? "decreasing" : "increasing",
      [dec ? "increasing" : "decreasing", "horizontal", "a straight line"],
      { graph: g.spec,
        hint: "a &gt; 0 → the branches sit top-right & bottom-left and each one decreases; a &lt; 0 → top-left & bottom-right, each increases.",
        answerLabel: `a = ${C(cv.a)} ${dec ? "&gt; 0 → decreasing" : "&lt; 0 → increasing"} on each branch.`,
        solution: [
          { s: `In y = a/(x − p) + q it is a that places the branches. Here a = ${C(cv.a)}` },
          { s: `a is ${dec ? "positive, so the branches sit top-right and bottom-left" : "negative, so the branches sit top-left and bottom-right"}` },
          { s: `Trace one branch from left to right: it ${dec ? "falls" : "climbs"} the whole way`,
            r: `∴ each branch is ${dec ? "decreasing" : "increasing"} — say it per branch, never “the graph”` },
        ] });
  },

  /* growth vs decay (the aeroplane idea) */
  expGrowthDecay: () => {
    let cv = randExp();
    while (cv.a < 0) cv = randExp();                     // a > 0: with a < 0 "growth (increasing)" would be false
    const g = expGraph(cv, { accent: ACC, label: "f" });
    const grows = cv.b > 1;
    return mc("exponentialGraph", `Is <b>${eqStr(cv, "f(x)")}</b> growth or decay?`,
      grows ? "Growth (increasing — “taking off”)" : "Decay (decreasing — “landing”)",
      [grows ? "Decay (decreasing — “landing”)" : "Growth (increasing — “taking off”)",
       "Neither — it’s a straight line", "It has a turning point"],
      { graph: g.spec,
        hint: "Aeroplane idea: b &gt; 1 takes off (growth); 0 &lt; b &lt; 1 lands (decay).",
        answerLabel: `b = ${C(cv.b)} → ${grows ? "growth" : "decay"}.`,
        solution: [
          { s: `b is the base — the number carrying the x. Here b = ${C(cv.b)}` },
          { s: grows
              ? `b &gt; 1, so every step to the right multiplies the y-value by more than 1 and it climbs`
              : `0 &lt; b &lt; 1, so every step to the right multiplies the y-value by less than 1 and it shrinks` },
          { s: `∴ ${grows ? "growth — the graph is taking off" : "decay — the graph is landing"}`, r: "the aeroplane picture" },
        ] });
  },

  /* the horizontal asymptote of an exponential */
  expAsymptote: () => {
    const cv = randExp();
    const g = expGraph(cv, { accent: ACC, label: "f" });
    return mc("exponentialGraph", `What is the <b>asymptote</b> of ${eqStr(cv, "f(x)")}?`,
      `y = ${C(cv.q)}`, [`x = ${C(cv.q)}`, `y = ${C(cv.q + 1)}`, `y = ${C(cv.q - 1)}`],
      { graph: g.spec,
        hint: "In y = a·bˣ + q the graph flattens towards the horizontal line y = q.",
        answerLabel: `y = ${C(cv.q)}.`,
        solution: [
          { s: `Compare with y = a·b^(x − p) + q: here q = ${C(cv.q)}` },
          { s: "On one side the power term shrinks towards 0, but a power of a positive base is never actually 0" },
          { s: `So y creeps towards ${C(cv.q)} + 0 and flattens out just short of it`, r: `∴ the asymptote is y = ${C(cv.q)} — horizontal, so it is y = …` },
        ] });
  },

  /* range of an exponential */
  expRange: () => {
    const cv = randExp();
    const g = expGraph(cv, { accent: ACC, label: "f" });
    const above = cv.a > 0;
    return mc("domainRange", `What is the <b>range</b> of ${eqStr(cv, "f(x)")}?`,
      rangeStr(cv),
      [above ? `y &lt; ${C(cv.q)}` : `y > ${C(cv.q)}`, `y ∈ ℝ`, `y ≠ ${C(cv.q)}`],
      { graph: g.spec,
        hint: "The graph sits entirely on one side of its asymptote y = q. a &gt; 0 → above (y &gt; q); a &lt; 0 → below (y &lt; q).",
        answerLabel: rangeStr(cv),
        solution: [
          { s: `Start at the asymptote: q = ${C(cv.q)}, so the graph flattens onto y = ${C(cv.q)}` },
          { s: `a = ${C(cv.a)} says which side it lives on: ${above ? "a is positive, so the whole graph sits ABOVE the asymptote" : "a is negative, so the whole graph sits BELOW the asymptote"}` },
          { s: `It gets as close as you like but never lands on it`, r: `∴ ${rangeStr(cv)} — a strict sign, never ≥ or ≤` },
        ] });
  },
};

export const questFn3 = {
  id: "fn3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: id.startsWith("hyp") ? (id === "hypDomainRange" ? "domainRange" : "hyperbolaGraph")
      : id === "expRange" ? "domainRange" : "exponentialGraph", gen,
  })),
};
