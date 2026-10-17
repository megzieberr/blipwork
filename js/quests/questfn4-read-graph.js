/* ============================================================
   FUNCTIONS QUEST 4 · Reading features off a graph   ★★ DIAGRAM
   Pure graph interpretation: read intercepts, turning point,
   asymptotes, domain & range straight off a drawn graph. The
   coordinate labels are HIDDEN — the learner reads them off the
   axes (dashed guide-lines mark the point being asked about).
   ============================================================ */
import { mc, mcNum } from "./_shared.js";
import {
  lineGraph, parabolaGraph, hyperbolaGraph, expGraph,
  randLine, randParabola, randHyperbola, randExp, ptDecoys,
} from "./_func.js";
import { paraTP, paraStd, lineXInt, lineYInt, rangeStr, ptStr, C, pick } from "../funclib.js";
import { L } from "../lang.js";

const ACC = "#2dd4bf";

/* strip coordinate labels off marked points & drop dashed guides to the axes,
   so the learner must read the value off the axis (not a given label). */
function blank(spec, keep = []) {
  spec.curves.forEach((c) => { delete c.label; delete c.labelAt; });
  spec.points = (spec.points || [])
    .filter((p) => keep.length === 0 || keep.some((k) => Math.abs(p.x - k.x) < 1e-6 && Math.abs(p.y - k.y) < 1e-6))
    .map((p) => ({ x: p.x, y: p.y, on: p.on, dashTo: "both" }));
  return spec;
}

const SKILLS = {
  /* read the y-intercept */
  readYIntercept: () => {
    const builders = [
      () => lineGraph(randLine(), { accent: ACC }),
      () => parabolaGraph(randParabola(), { accent: ACC }),
    ];
    // need a y-intercept OFF the origin that is actually marked on the sketch
    let g = pick(builders)();
    while (g.yi === 0 || !g.spec.points.some((p) => p.x === 0 && Math.abs(p.y - g.yi) < 1e-9)) g = pick(builders)();
    const yi = g.yi;
    const spec = blank(g.spec, [{ x: 0, y: yi }]);
    return mc("readGraph", L("Read the <b>y-intercept</b> off the graph.", "Lees die <b>y-afsnit</b> van die grafiek af."),
      ptStr(0, yi), ptDecoys(0, yi),
      { graph: spec, hint: L("The y-intercept is where the graph crosses the y-axis (x = 0). Follow the dashed line.", "Die y-afsnit is waar die grafiek die y-as sny (x = 0). Volg die stippellyn."),
        answerLabel: L(`y-intercept ${ptStr(0, yi)}.`, `y-afsnit ${ptStr(0, yi)}.`),
        solution: [
          { s: L("The y-intercept is where the curve crosses the y-axis, and every point on that axis has x = 0", "Die y-afsnit is waar die kurwe die y-as sny, en elke punt op daardie as het x = 0") },
          { s: L(`Follow the dashed line from the marked point across to the y-axis: it lands on ${C(yi)}`, `Volg die stippellyn van die gemerkte punt oor na die y-as: dit land op ${C(yi)}`) },
          { s: L(`∴ y-intercept ${ptStr(0, yi)}`, `∴ y-afsnit ${ptStr(0, yi)}`), r: L("x first, then y, with a semicolon between them", "eers x, dan y, met 'n kommapunt tussen hulle") },
        ] });
  },

  /* read an x-intercept */
  readXIntercept: () => {
    let cv = randLine();
    while (lineXInt(cv) == null || lineXInt(cv) === 0 || !Number.isInteger(lineXInt(cv))) cv = randLine();
    const xi = lineXInt(cv);
    const g = lineGraph(cv, { accent: ACC });
    const spec = blank(g.spec, [{ x: xi, y: 0 }]);
    return mc("readGraph", L("Read the <b>x-intercept</b> off the graph.", "Lees die <b>x-afsnit</b> van die grafiek af."),
      ptStr(xi, 0), ptDecoys(xi, 0),
      { graph: spec, hint: L("The x-intercept is where the graph crosses the x-axis (y = 0).", "Die x-afsnit is waar die grafiek die x-as sny (y = 0)."),
        answerLabel: L(`x-intercept ${ptStr(xi, 0)}.`, `x-afsnit ${ptStr(xi, 0)}.`),
        solution: [
          { s: L("The x-intercept is where the line cuts the x-axis, and every point on that axis has y = 0", "Die x-afsnit is waar die lyn die x-as sny, en elke punt op daardie as het y = 0") },
          { s: L(`Drop the dashed line from the marked point down to the x-axis: it lands on ${C(xi)}`, `Volg die stippellyn van die gemerkte punt af na die x-as: dit land op ${C(xi)}`) },
          { s: L(`∴ x-intercept ${ptStr(xi, 0)}`, `∴ x-afsnit ${ptStr(xi, 0)}`), r: L("the 0 goes SECOND here — it is the y-coordinate", "die 0 kom hier TWEEDE: dit is die y-koördinaat") },
        ] });
  },

  /* read the turning point */
  readTP: () => {
    let cv = randParabola(), tp = paraTP(cv);
    while (!Number.isInteger(tp.x) || !Number.isInteger(tp.y)) { cv = randParabola(); tp = paraTP(cv); }   // read-offs sit on gridlines
    const g = parabolaGraph(cv, { accent: ACC });
    const spec = blank(g.spec, [{ x: tp.x, y: tp.y }]);
    return mc("readGraph", L("Read the <b>turning point</b> off the graph.", "Lees die <b>draaipunt</b> van die grafiek af."),
      ptStr(tp.x, tp.y), ptDecoys(tp.x, tp.y),
      { graph: spec, hint: L("The turning point is the lowest (or highest) point of the parabola. Read the dashed lines to both axes.", "Die draaipunt is die laagste (of hoogste) punt van die parabool. Lees die stippellyne na albei asse."),
        answerLabel: L(`Turning point ${ptStr(tp.x, tp.y)}.`, `Draaipunt ${ptStr(tp.x, tp.y)}.`),
        solution: [
          { s: L(`The turning point is where the parabola stops and comes back — the ${paraStd(cv).a > 0 ? "lowest" : "highest"} point of the curve`, `Die draaipunt is waar die parabool stop en terugdraai: die ${paraStd(cv).a > 0 ? "laagste" : "hoogste"} punt van die kurwe`),
            r: L(`a is ${paraStd(cv).a > 0 ? "positive → happy, so it is a minimum" : "negative → sad, so it is a maximum"}`, `a is ${paraStd(cv).a > 0 ? "positief → happy, dus is dit 'n minimum" : "negatief → sad, dus is dit 'n maksimum"}`) },
          { s: L(`Follow the dashed line DOWN to the x-axis: x = ${C(tp.x)}`, `Volg die stippellyn AF na die x-as: x = ${C(tp.x)}`) },
          { s: L(`Follow the dashed line ACROSS to the y-axis: y = ${C(tp.y)}`, `Volg die stippellyn OOR na die y-as: y = ${C(tp.y)}`), r: L(`∴ turning point ${ptStr(tp.x, tp.y)}`, `∴ draaipunt ${ptStr(tp.x, tp.y)}`) },
        ] });
  },

  /* read the asymptotes */
  readAsymptotes: () => {
    const isHyp = pick([true, false]);
    let cv = isHyp ? randHyperbola() : randExp();
    while (isHyp && cv.p === cv.q) cv = randHyperbola(); // p ≠ q keeps the swapped decoy distinct
    const g = isHyp ? hyperbolaGraph(cv, { accent: ACC }) : expGraph(cv, { accent: ACC });
    g.spec.curves.forEach((c) => { delete c.label; delete c.labelAt; });
    g.spec.points = [];
    return isHyp
      ? mc("readGraph", L("Read the <b>asymptotes</b> off the graph (the dashed lines).", "Lees die <b>asimptote</b> van die grafiek af (die stippellyne)."),
          L(`x = ${C(cv.p)} and y = ${C(cv.q)}`, `x = ${C(cv.p)} en y = ${C(cv.q)}`),
          [L(`x = ${C(cv.q)} and y = ${C(cv.p)}`, `x = ${C(cv.q)} en y = ${C(cv.p)}`), L(`x = ${C(cv.p)} and y = ${C(cv.q + 1)}`, `x = ${C(cv.p)} en y = ${C(cv.q + 1)}`), L(`x = ${C(cv.p + 1)} and y = ${C(cv.q)}`, `x = ${C(cv.p + 1)} en y = ${C(cv.q)}`)],
          { graph: g.spec, hint: L("The vertical dashed line is x = …; the horizontal dashed line is y = ….", "Die vertikale stippellyn is x = …; die horisontale stippellyn is y = …."),
            answerLabel: L(`x = ${C(cv.p)} and y = ${C(cv.q)}.`, `x = ${C(cv.p)} en y = ${C(cv.q)}.`),
            solution: [
              { s: L("A hyperbola has two dashed lines: one standing up, one lying flat", "'n Hiperbool het twee stippellyne: een wat regop staan, een wat plat lê") },
              { s: L(`The upright one crosses the x-axis at ${C(cv.p)}, and an upright line is written x = …`, `Die regop een sny die x-as by ${C(cv.p)}, en 'n regop lyn word geskryf as x = …`), r: L(`so x = ${C(cv.p)}`, `dus x = ${C(cv.p)}`) },
              { s: L(`The flat one crosses the y-axis at ${C(cv.q)}, and a flat line is written y = …`, `Die plat een sny die y-as by ${C(cv.q)}, en 'n plat lyn word geskryf as y = …`), r: L(`so y = ${C(cv.q)}`, `dus y = ${C(cv.q)}`) },
            ] })
      : mc("readGraph", L("Read the <b>asymptote</b> off the graph (the dashed line).", "Lees die <b>asimptoot</b> van die grafiek af (die stippellyn)."),
          L(`y = ${C(cv.q)}`, `y = ${C(cv.q)}`), [L(`x = ${C(cv.q)}`, `x = ${C(cv.q)}`), L(`y = ${C(cv.q + 1)}`, `y = ${C(cv.q + 1)}`), L(`y = ${C(cv.q - 1)}`, `y = ${C(cv.q - 1)}`)],
          { graph: g.spec, hint: L("An exponential graph flattens towards one horizontal dashed line, y = ….", "'n Eksponensiële grafiek plat af na een horisontale stippellyn, y = …."),
            answerLabel: L(`y = ${C(cv.q)}.`, `y = ${C(cv.q)}.`),
            solution: [
              { s: L("An exponential graph has ONE dashed line, and it lies flat — the level the curve flattens onto", "'n Eksponensiële grafiek het EEN stippellyn, en dit lê plat: die hoogte waar die kurwe afplat") },
              { s: L(`Follow it across to the y-axis: it sits at ${C(cv.q)}`, `Volg dit oor na die y-as: dit sit by ${C(cv.q)}`) },
              { s: L(`A flat line is written y = …`, `'n Plat lyn word geskryf as y = …`), r: L(`∴ y = ${C(cv.q)}, not x = ${C(cv.q)}`, `∴ y = ${C(cv.q)}, nie x = ${C(cv.q)} nie`) },
            ] });
  },

  /* read the range */
  readRange: () => {
    const isPar = pick([true, false]);
    const cv = isPar ? randParabola() : randExp();
    const g = isPar ? parabolaGraph(cv, { accent: ACC }) : expGraph(cv, { accent: ACC });
    g.spec.curves.forEach((c) => { delete c.label; delete c.labelAt; });
    const correct = rangeStr(cv);
    // the opposite, computed straight from the sign (no fragile string surgery)
    const opposite = isPar
      ? (paraStd(cv).a > 0 ? L(`y ≤ ${C(paraTP(cv).y)}`, `y ≤ ${C(paraTP(cv).y)}`) : L(`y ≥ ${C(paraTP(cv).y)}`, `y ≥ ${C(paraTP(cv).y)}`))
      : (cv.a > 0 ? L(`y &lt; ${C(cv.q)}`, `y &lt; ${C(cv.q)}`) : L(`y > ${C(cv.q)}`, `y > ${C(cv.q)}`));
    const wrongs = isPar
      ? [opposite, L("y ∈ ℝ", "y ∈ ℝ"), L("y ≠ 0", "y ≠ 0")]
      : [opposite, L("y ∈ ℝ", "y ∈ ℝ"), L(`y ≠ ${C(cv.q)}`, `y ≠ ${C(cv.q)}`)];
    return mc("domainRange", L("Read the <b>range</b> off the graph.", "Lees die <b>waardeversameling</b> van die grafiek af."),
      correct, wrongs,
      { graph: g.spec, hint: L("Range = the y-values the graph reaches. Look at the lowest/highest point or the asymptote.", "Waardeversameling = die y-waardes wat die grafiek bereik. Kyk na die laagste/hoogste punt of die asimptoot."),
        answerLabel: L(`Range: ${correct}.`, `Waardeversameling: ${correct}.`),
        solution: isPar
          ? [
              { s: L("Range = the y-values the graph reaches, so slide your eye up and down the y-axis", "Waardeversameling = die y-waardes wat die grafiek bereik, dus laat jou oog op en af langs die y-as gly") },
              { s: L(`The parabola is ${paraStd(cv).a > 0 ? "happy, so it stops at its lowest point and climbs from there" : "sad, so it stops at its highest point and falls away from there"}`, `Die parabool is ${paraStd(cv).a > 0 ? "happy, dus stop dit by sy laagste punt en klim van daar af op" : "sad, dus stop dit by sy hoogste punt en val van daar af weg"}`) },
              { s: L(`That turning point sits at y = ${C(paraTP(cv).y)}`, `Daardie draaipunt sit by y = ${C(paraTP(cv).y)}`), r: L(`∴ ${correct} — the turning point itself IS reached, so the sign carries the line under it`, `∴ ${correct}: die draaipunt self WORD bereik, dus het die teken 'n strepie onder`) },
            ]
          : [
              { s: L("Range = the y-values the graph reaches, so slide your eye up and down the y-axis", "Waardeversameling = die y-waardes wat die grafiek bereik, dus laat jou oog op en af langs die y-as gly") },
              { s: L(`The curve flattens onto the dashed line y = ${C(cv.q)} and stays ${cv.a > 0 ? "above" : "below"} it`, `Die kurwe plat af na die stippellyn y = ${C(cv.q)} en bly ${cv.a > 0 ? "daarbo" : "daaronder"}`) },
              { s: L(`It never actually lands on the asymptote`, `Dit land nooit werklik op die asimptoot nie`), r: L(`∴ ${correct} — a strict sign, never ≥ or ≤`, `∴ ${correct}: 'n streng teken, nooit ≥ of ≤ nie`) },
            ] });
  },
};

export const questFn4 = {
  id: "fn4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id === "readRange" ? "domainRange" : "readGraph", gen })),
};
