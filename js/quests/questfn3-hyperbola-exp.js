/* ============================================================
   FUNCTIONS QUEST 3 · Hyperbola & exponential   ★ DIAGRAM
   Asymptotes, branches, growth vs decay, domain & range.
   ============================================================ */
import { mc } from "./_shared.js";
import { hyperbolaGraph, expGraph, randHyperbola, randExp } from "./_func.js";
import { eqStr, domainStr, rangeStr, C, pick } from "../funclib.js";
import { L } from "../lang.js";

const ACC = "#0f766e";

const SKILLS = {
  /* the two asymptotes of a hyperbola */
  hypAsymptotes: () => {
    let cv = randHyperbola();
    while (cv.p === cv.q) cv = randHyperbola();          // p ≠ q keeps the swapped decoy distinct
    const g = hyperbolaGraph(cv, { accent: ACC, label: "f" });
    return mc("hyperbolaGraph", L(`What are the <b>asymptotes</b> of ${eqStr(cv, "f(x)")}?`, `Wat is die <b>asimptote</b> van ${eqStr(cv, "f(x)")}?`),
      L(`x = ${C(cv.p)} and y = ${C(cv.q)}`, `x = ${C(cv.p)} en y = ${C(cv.q)}`),
      [L(`x = ${C(cv.q)} and y = ${C(cv.p)}`, `x = ${C(cv.q)} en y = ${C(cv.p)}`), L(`x = ${C(cv.p)} and y = ${C(cv.q + 1)}`, `x = ${C(cv.p)} en y = ${C(cv.q + 1)}`), L(`x = ${C(cv.p + 1)} and y = ${C(cv.q)}`, `x = ${C(cv.p + 1)} en y = ${C(cv.q)}`)],
      { graph: g.spec,
        hint: L("For y = a/(x − p) + q the vertical asymptote is x = p and the horizontal asymptote is y = q.", "Vir y = a/(x − p) + q is die vertikale asimptoot x = p en die horisontale asimptoot y = q."),
        answerLabel: L(`x = ${C(cv.p)} and y = ${C(cv.q)}.`, `x = ${C(cv.p)} en y = ${C(cv.q)}.`),
        solution: [
          { s: L(`Compare with y = a/(x − p) + q: here p = ${C(cv.p)} and q = ${C(cv.q)}`, `Vergelyk met y = a/(x − p) + q: hier is p = ${C(cv.p)} en q = ${C(cv.q)}`) },
          { s: cv.p === 0
              ? L(`The denominator is just x, and you cannot divide by 0, so x = 0 is forbidden`, `Die noemer is net x, en jy kan nie deur 0 deel nie, dus is x = 0 verbode`)
              : L(`The denominator is 0 when x ${cv.p < 0 ? "+" : "−"} ${C(Math.abs(cv.p))} = 0, i.e. x = ${C(cv.p)}`, `Die noemer is 0 wanneer x ${cv.p < 0 ? "+" : "−"} ${C(Math.abs(cv.p))} = 0, d.w.s. x = ${C(cv.p)}`),
            r: L("that forbidden x is the VERTICAL asymptote", "daardie verbode x is die VERTIKALE asimptoot") },
          { s: L(`The fraction can shrink towards 0 but never reaches it, so y never quite reaches ${C(cv.q)}`, `Die breuk kan na 0 toe krimp, maar bereik dit nooit nie, dus bereik y nooit heeltemal ${C(cv.q)} nie`), r: L("that is the HORIZONTAL asymptote", "dit is die HORISONTALE asimptoot") },
          { s: L(`∴ x = ${C(cv.p)} and y = ${C(cv.q)}`, `∴ x = ${C(cv.p)} en y = ${C(cv.q)}`) },
        ] });
  },

  /* domain & range of a hyperbola */
  hypDomainRange: () => {
    let cv = randHyperbola();
    while (cv.p === cv.q) cv = randHyperbola();          // p ≠ q keeps the swapped decoy distinct
    const g = hyperbolaGraph(cv, { accent: ACC, label: "f" });
    const askDom = pick([true, false]);
    return askDom
      ? mc("domainRange", L(`What is the <b>domain</b> of ${eqStr(cv, "f(x)")}?`, `Wat is die <b>definisieversameling</b> van ${eqStr(cv, "f(x)")}?`),
          domainStr(cv), [L(`x ∈ ℝ`, `x ∈ ℝ`), L(`x ∈ ℝ, x ≠ ${C(cv.q)}`, `x ∈ ℝ, x ≠ ${C(cv.q)}`), L(`x ≠ ${C(cv.p)} only`, `net x ≠ ${C(cv.p)}`)],
          { graph: g.spec, hint: L("The graph exists for every x except at the vertical asymptote x = p.", "Die grafiek bestaan vir elke x behalwe by die vertikale asimptoot x = p."), answerLabel: domainStr(cv),
            solution: [
              { s: L("Domain asks: which x-values am I allowed to put in?", "Definisieversameling vra: watter x-waardes mag ek insit?") },
              { s: L(`Only one x breaks the formula — the one that makes the denominator 0, x = ${C(cv.p)}`, `Net een x breek die formule: die een wat die noemer 0 maak, x = ${C(cv.p)}`), r: L("you cannot divide by 0", "jy kan nie deur 0 deel nie") },
              { s: L(`Everything else is fine, so ${domainStr(cv)}`, `Alles anders is reg, dus ${domainStr(cv)}`), r: L("the restriction rides after a semicolon", "die beperking kom ná 'n kommapunt") },
            ] })
      : mc("domainRange", L(`What is the <b>range</b> of ${eqStr(cv, "f(x)")}?`, `Wat is die <b>waardeversameling</b> van ${eqStr(cv, "f(x)")}?`),
          rangeStr(cv), [L(`y ∈ ℝ`, `y ∈ ℝ`), L(`y ∈ ℝ, y ≠ ${C(cv.p)}`, `y ∈ ℝ, y ≠ ${C(cv.p)}`), L(`y ≠ ${C(cv.q === 0 ? 1 : -cv.q)} only`, `net y ≠ ${C(cv.q === 0 ? 1 : -cv.q)}`)],
          { graph: g.spec, hint: L("The y-values cover everything except the horizontal asymptote y = q.", "Die y-waardes dek alles behalwe die horisontale asimptoot y = q."), answerLabel: rangeStr(cv),
            solution: [
              { s: L("Range asks: which y-values does the graph actually reach?", "Waardeversameling vra: watter y-waardes bereik die grafiek werklik?") },
              { s: L(`In y = a/(x − p) + q the fraction part can get tiny, but it can never be exactly 0`, `In y = a/(x − p) + q kan die breukdeel baie klein word, maar dit kan nooit presies 0 wees nie`) },
              { s: L(`So y can never be exactly ${C(cv.q)}, but it reaches everything else`, `Dus kan y nooit presies ${C(cv.q)} wees nie, maar dit bereik alles anders`), r: `∴ ${rangeStr(cv)}` },
            ] });
  },

  /* which way the branches go */
  hypBranches: () => {
    const cv = randHyperbola();
    const g = hyperbolaGraph(cv, { accent: ACC, label: "f" });
    const dec = cv.a > 0;
    return mc("hyperbolaGraph", L(`For ${eqStr(cv, "f(x)")}, each branch is…`, `Vir ${eqStr(cv, "f(x)")} is elke vlerkie…`),
      dec ? L("decreasing", "dalend") : L("increasing", "stygend"),
      [dec ? L("increasing", "stygend") : L("decreasing", "dalend"), L("horizontal", "horisontaal"), L("a straight line", "'n reguit lyn")],
      { graph: g.spec,
        hint: L("a &gt; 0 → the branches sit top-right & bottom-left and each one decreases; a &lt; 0 → top-left & bottom-right, each increases.", "a &gt; 0 → die vlerkies sit regs bo & links onder en elkeen daal; a &lt; 0 → links bo & regs onder, elkeen styg."),
        answerLabel: L(`a = ${C(cv.a)} ${dec ? "&gt; 0 → decreasing" : "&lt; 0 → increasing"} on each branch.`, `a = ${C(cv.a)}, ${dec ? "dus a &gt; 0 → dalend" : "dus a &lt; 0 → stygend"} op elke vlerkie.`),
        solution: [
          { s: L(`In y = a/(x − p) + q it is a that places the branches. Here a = ${C(cv.a)}`, `In y = a/(x − p) + q is dit a wat die vlerkies plaas. Hier is a = ${C(cv.a)}`) },
          { s: L(`a is ${dec ? "positive, so the branches sit top-right and bottom-left" : "negative, so the branches sit top-left and bottom-right"}`, `a is ${dec ? "positief, dus sit die vlerkies regs bo en links onder" : "negatief, dus sit die vlerkies links bo en regs onder"}`) },
          { s: L(`Trace one branch from left to right: it ${dec ? "falls" : "climbs"} the whole way`, `Volg een vlerkie van links na regs: dit ${dec ? "daal" : "klim"} die hele pad`),
            r: L(`∴ each branch is ${dec ? "decreasing" : "increasing"} — say it per branch, never “the graph”`, `∴ elke vlerkie is ${dec ? "dalend" : "stygend"}: sê dit per vlerkie, nooit “die grafiek” nie`) },
        ] });
  },

  /* growth vs decay (the aeroplane idea) */
  expGrowthDecay: () => {
    let cv = randExp();
    while (cv.a < 0) cv = randExp();                     // a > 0: with a < 0 "growth (increasing)" would be false
    const g = expGraph(cv, { accent: ACC, label: "f" });
    const grows = cv.b > 1;
    return mc("exponentialGraph", L(`Is <b>${eqStr(cv, "f(x)")}</b> growth or decay?`, `Is <b>${eqStr(cv, "f(x)")}</b> groei of verval?`),
      grows ? L("Growth (increasing — “taking off”)", "Groei (stygend: “styg op”)") : L("Decay (decreasing — “landing”)", "Verval (dalend: “land”)"),
      [grows ? L("Decay (decreasing — “landing”)", "Verval (dalend: “land”)") : L("Growth (increasing — “taking off”)", "Groei (stygend: “styg op”)"),
       L("Neither — it’s a straight line", "Nie een nie: dis 'n reguit lyn"), L("It has a turning point", "Dit het 'n draaipunt")],
      { graph: g.spec,
        hint: L("Aeroplane idea: b &gt; 1 takes off (growth); 0 &lt; b &lt; 1 lands (decay).", "Vliegtuig-idee: b &gt; 1 styg op (groei); 0 &lt; b &lt; 1 land (verval)."),
        answerLabel: L(`b = ${C(cv.b)} → ${grows ? "growth" : "decay"}.`, `b = ${C(cv.b)} → ${grows ? "groei" : "verval"}.`),
        solution: [
          { s: L(`b is the base — the number carrying the x. Here b = ${C(cv.b)}`, `b is die grondtal: die getal wat die x dra. Hier is b = ${C(cv.b)}`) },
          { s: grows
              ? L(`b &gt; 1, so every step to the right multiplies the power part bˣ by b (more than 1): bˣ grows and the graph climbs`, `b &gt; 1, dus vermenigvuldig elke tree na regs die magsdeel bˣ met b (meer as 1): bˣ groei en die grafiek klim`)
              : L(`0 &lt; b &lt; 1, so every step to the right multiplies the power part bˣ by b (less than 1): bˣ shrinks and the graph falls`, `0 &lt; b &lt; 1, dus vermenigvuldig elke tree na regs die magsdeel bˣ met b (minder as 1): bˣ krimp en die grafiek daal`) },
          { s: `∴ ${grows ? L("growth — the graph is taking off", "groei: die grafiek styg op") : L("decay — the graph is landing", "verval: die grafiek land")}`, r: L("the aeroplane picture", "die vliegtuigprent") },
        ] });
  },

  /* the horizontal asymptote of an exponential */
  expAsymptote: () => {
    const cv = randExp();
    const g = expGraph(cv, { accent: ACC, label: "f" });
    return mc("exponentialGraph", L(`What is the <b>asymptote</b> of ${eqStr(cv, "f(x)")}?`, `Wat is die <b>asimptoot</b> van ${eqStr(cv, "f(x)")}?`),
      L(`y = ${C(cv.q)}`, `y = ${C(cv.q)}`), [L(`x = ${C(cv.q)}`, `x = ${C(cv.q)}`), L(`y = ${C(cv.q + 1)}`, `y = ${C(cv.q + 1)}`), L(`y = ${C(cv.q - 1)}`, `y = ${C(cv.q - 1)}`)],
      { graph: g.spec,
        hint: L("In y = a·bˣ + q the graph flattens towards the horizontal line y = q.", "In y = a·bˣ + q plat die grafiek af na die horisontale lyn y = q."),
        answerLabel: L(`y = ${C(cv.q)}.`, `y = ${C(cv.q)}.`),
        solution: [
          { s: L(`Compare with y = a·b^(x − p) + q: here q = ${C(cv.q)}`, `Vergelyk met y = a·b^(x − p) + q: hier is q = ${C(cv.q)}`) },
          { s: L("On one side the power term shrinks towards 0, but a power of a positive base is never actually 0", "Aan een kant krimp die magsterm na 0 toe, maar 'n mag van 'n positiewe grondtal is nooit werklik 0 nie") },
          { s: L(`So y creeps towards ${C(cv.q)} + 0 and flattens out just short of it`, `Dus kruip y na ${C(cv.q)} + 0 toe en plat net kort daarvan af`), r: L(`∴ the asymptote is y = ${C(cv.q)} — horizontal, so it is y = …`, `∴ die asimptoot is y = ${C(cv.q)}: horisontaal, dus is dit y = …`) },
        ] });
  },

  /* range of an exponential */
  expRange: () => {
    const cv = randExp();
    const g = expGraph(cv, { accent: ACC, label: "f" });
    const above = cv.a > 0;
    return mc("domainRange", L(`What is the <b>range</b> of ${eqStr(cv, "f(x)")}?`, `Wat is die <b>waardeversameling</b> van ${eqStr(cv, "f(x)")}?`),
      rangeStr(cv),
      [above ? L(`y &lt; ${C(cv.q)}`, `y &lt; ${C(cv.q)}`) : L(`y > ${C(cv.q)}`, `y > ${C(cv.q)}`), L(`y ∈ ℝ`, `y ∈ ℝ`), L(`y ≠ ${C(cv.q)}`, `y ≠ ${C(cv.q)}`)],
      { graph: g.spec,
        hint: L("The graph sits entirely on one side of its asymptote y = q. a &gt; 0 → above (y &gt; q); a &lt; 0 → below (y &lt; q).", "Die grafiek lê heeltemal aan een kant van sy asimptoot y = q. a &gt; 0 → bo (y &gt; q); a &lt; 0 → onder (y &lt; q)."),
        answerLabel: rangeStr(cv),
        solution: [
          { s: L(`Start at the asymptote: q = ${C(cv.q)}, so the graph flattens onto y = ${C(cv.q)}`, `Begin by die asimptoot: q = ${C(cv.q)}, dus plat die grafiek af na y = ${C(cv.q)}`) },
          { s: L(`a = ${C(cv.a)} says which side it lives on: ${above ? "a is positive, so the whole graph sits ABOVE the asymptote" : "a is negative, so the whole graph sits BELOW the asymptote"}`, `a = ${C(cv.a)} sê aan watter kant dit lê: ${above ? "a is positief, dus lê die hele grafiek BO die asimptoot" : "a is negatief, dus lê die hele grafiek ONDER die asimptoot"}`) },
          { s: L(`It gets as close as you like but never lands on it`, `Dit kom so naby as wat jy wil, maar land nooit daarop nie`), r: L(`∴ ${rangeStr(cv)} — a strict sign, never ≥ or ≤`, `∴ ${rangeStr(cv)}: 'n streng teken, nooit ≥ of ≤ nie`) },
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
