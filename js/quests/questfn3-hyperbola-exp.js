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
        answerLabel: `x = ${C(cv.p)} and y = ${C(cv.q)}.` });
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
          { graph: g.spec, hint: "The graph exists for every x except at the vertical asymptote x = p.", answerLabel: domainStr(cv) })
      : mc("domainRange", `What is the <b>range</b> of ${eqStr(cv, "f(x)")}?`,
          rangeStr(cv), [`y ∈ ℝ`, `y ∈ ℝ, y ≠ ${C(cv.p)}`, `y ≠ ${C(-cv.q)} only`],
          { graph: g.spec, hint: "The y-values cover everything except the horizontal asymptote y = q.", answerLabel: rangeStr(cv) });
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
        answerLabel: `a = ${C(cv.a)} ${dec ? "&gt; 0 → decreasing" : "&lt; 0 → increasing"} on each branch.` });
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
        answerLabel: `b = ${C(cv.b)} → ${grows ? "growth" : "decay"}.` });
  },

  /* the horizontal asymptote of an exponential */
  expAsymptote: () => {
    const cv = randExp();
    const g = expGraph(cv, { accent: ACC, label: "f" });
    return mc("exponentialGraph", `What is the <b>asymptote</b> of ${eqStr(cv, "f(x)")}?`,
      `y = ${C(cv.q)}`, [`x = ${C(cv.q)}`, `y = ${C(cv.q + 1)}`, `y = ${C(cv.q - 1)}`],
      { graph: g.spec,
        hint: "In y = a·bˣ + q the graph flattens towards the horizontal line y = q.",
        answerLabel: `y = ${C(cv.q)}.` });
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
        answerLabel: rangeStr(cv) });
  },
};

export const questFn3 = {
  id: "fn3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: id.startsWith("hyp") ? (id === "hypDomainRange" ? "domainRange" : "hyperbolaGraph")
      : id === "expRange" ? "domainRange" : "exponentialGraph", gen,
  })),
};
