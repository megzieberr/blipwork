/* ============================================================
   FUNCTIONS QUEST 5 · Increasing/decreasing, positive/negative
   & inequalities   ★★ DIAGRAM
   The graph-reading inequalities the exam loves: where a graph is
   increasing/decreasing, where it is above/below the x-axis
   (f(x) > 0, f(x) < 0), and the sign rules for f·g and x·f.
   ============================================================ */
import { mc } from "./_shared.js";
import { parabolaGraph, randParabola } from "./_func.js";
import {
  paraTP, paraRoots, paraStd, ineqBetween, ineqOutside, C, pick,
} from "../funclib.js";
import { L } from "../lang.js";

const ACC = "#0d9488";

/* a parabola whose two x-intercepts are clean distinct integers */
function rootsParabola() {
  let cv, roots;
  do { cv = randParabola(); roots = paraRoots(cv); } while (roots.length !== 2 || Math.abs(roots[0] - roots[1]) < 1);
  return { cv, r1: Math.min(...roots), r2: Math.max(...roots), happy: paraStd(cv).a > 0 };
}

const SKILLS = {
  /* where is the parabola increasing / decreasing? (relative to the TP) */
  incDec: () => {
    const cv = randParabola(), tp = paraTP(cv), happy = paraStd(cv).a > 0;
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    const askInc = pick([true, false]);
    // happy: decreasing x<p, increasing x>p.  sad: increasing x<p, decreasing x>p.
    const incSide = happy ? L(`x > ${C(tp.x)}`, `x > ${C(tp.x)}`) : L(`x &lt; ${C(tp.x)}`, `x &lt; ${C(tp.x)}`);
    const decSide = happy ? L(`x &lt; ${C(tp.x)}`, `x &lt; ${C(tp.x)}`) : L(`x > ${C(tp.x)}`, `x > ${C(tp.x)}`);
    const correct = askInc ? incSide : decSide;
    const other = askInc ? decSide : incSide;
    return mc("incDec", L(`For ${"<b>f</b>"} below, for which x-values is the graph <b>${askInc ? "increasing" : "decreasing"}</b>?`, `Vir ${"<b>f</b>"} hieronder, vir watter x-waardes is die grafiek <b>${askInc ? "stygend" : "dalend"}</b>?`),
      correct, [other, L(`x = ${C(tp.x)}`, `x = ${C(tp.x)}`), L("all real x", "alle reële x")],
      { graph: g.spec,
        hint: L("Read left-to-right and split at the turning point x = ", "Lees van links na regs en verdeel by die draaipunt x = ") + C(tp.x) + L(". One side climbs, the other falls.", ". Een kant klim, die ander val."),
        answerLabel: `${askInc ? L("Increasing", "Stygend") : L("Decreasing", "Dalend")}: ${correct}.`,
        solution: [
          { s: L(`Find the turning point first: x = ${C(tp.x)}`, `Kry eers die draaipunt: x = ${C(tp.x)}`), r: L("that is the only place the graph changes direction", "dit is die enigste plek waar die grafiek van rigting verander") },
          { s: L(`Cut a line straight down through x = ${C(tp.x)} and read the graph left to right`, `Sny met 'n vertikale lyn deur x = ${C(tp.x)} en lees die grafiek van links na regs`) },
          { s: happy
              ? L(`It is a happy parabola, so it falls on the left of the cut and climbs on the right`, `Dit is 'n happy parabool, dus val dit links van die snylyn en klim dit regs daarvan`)
              : L(`It is a sad parabola, so it climbs on the left of the cut and falls on the right`, `Dit is 'n sad parabool, dus klim dit links van die snylyn en val dit regs daarvan`) },
          { s: L(`∴ ${askInc ? "increasing" : "decreasing"} for ${correct}`, `∴ ${askInc ? "stygend" : "dalend"} vir ${correct}`), r: L("always write x first", "skryf altyd x eerste") },
        ] });
  },

  /* f(x) > 0 — above the x-axis */
  fPositive: () => {
    const { cv, r1, r2, happy } = rootsParabola();
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    const correct = happy ? ineqOutside(r1, r2) : ineqBetween(r1, r2);
    const wrong = happy ? ineqBetween(r1, r2) : ineqOutside(r1, r2);
    return mc("posNeg", L(`Use the graph. For which x-values is <b>f(x) &gt; 0</b> (above the x-axis)?`, `Gebruik die grafiek. Vir watter x-waardes is <b>f(x) &gt; 0</b> (bo die x-as)?`),
      correct, [wrong, L(`x > ${C(r2)}`, `x > ${C(r2)}`), L("all real x", "alle reële x")],
      { graph: g.spec,
        hint: L("f(x) &gt; 0 means the graph is ABOVE the x-axis. The x-intercepts are the boundaries.", "f(x) &gt; 0 beteken die grafiek is BO die x-as. Die x-afsnitte is die grense."),
        answerLabel: L(`f(x) &gt; 0 for ${correct}.`, `f(x) &gt; 0 vir ${correct}.`),
        solution: [
          { s: L(`f(x) &gt; 0 means “where is the curve ABOVE the x-axis?”`, `f(x) &gt; 0 beteken “waar is die kurwe BO die x-as?”`), r: L("f(x) is just another name for the y-value", "f(x) is net nog 'n naam vir die y-waarde") },
          { s: L(`Cut a line down through every x-intercept: x = ${C(r1)} and x = ${C(r2)}`, `Sny met 'n vertikale lyn deur elke x-afsnit: x = ${C(r1)} en x = ${C(r2)}`) },
          { s: happy
              ? L(`The parabola is happy, so it dips below the axis BETWEEN the cuts and rides above on both arms`, `Die parabool is happy, dus duik dit TUSSEN die snylyne onder die as en lê dit bo die as op albei arms`)
              : L(`The parabola is sad, so the only stretch above the axis is BETWEEN the cuts`, `Die parabool is sad, dus is die enigste stuk bo die as TUSSEN die snylyne`) },
          { s: `∴ ${correct}`, r: happy ? L("two separate stretches, so they are joined with “or”", "twee aparte stukke, dus word hulle met “of” verbind") : L("one single stretch, so it is written as a double inequality", "een enkele stuk, dus word dit as 'n dubbele ongelykheid geskryf") },
        ] });
  },

  /* f(x) < 0 — below the x-axis */
  fNegative: () => {
    const { cv, r1, r2, happy } = rootsParabola();
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    const correct = happy ? ineqBetween(r1, r2) : ineqOutside(r1, r2);
    const wrong = happy ? ineqOutside(r1, r2) : ineqBetween(r1, r2);
    return mc("posNeg", L(`Use the graph. For which x-values is <b>f(x) &lt; 0</b> (below the x-axis)?`, `Gebruik die grafiek. Vir watter x-waardes is <b>f(x) &lt; 0</b> (onder die x-as)?`),
      correct, [wrong, L(`x &lt; ${C(r1)}`, `x &lt; ${C(r1)}`), L("all real x", "alle reële x")],
      { graph: g.spec,
        hint: L("f(x) &lt; 0 means the graph is BELOW the x-axis, between or outside the x-intercepts.", "f(x) &lt; 0 beteken die grafiek is ONDER die x-as, tussen of buite die x-afsnitte."),
        answerLabel: L(`f(x) &lt; 0 for ${correct}.`, `f(x) &lt; 0 vir ${correct}.`),
        solution: [
          { s: L(`f(x) &lt; 0 means “where is the curve BELOW the x-axis?”`, `f(x) &lt; 0 beteken “waar is die kurwe ONDER die x-as?”`), r: L("a negative y-value", "'n negatiewe y-waarde") },
          { s: L(`Cut a line down through every x-intercept: x = ${C(r1)} and x = ${C(r2)}`, `Sny met 'n vertikale lyn deur elke x-afsnit: x = ${C(r1)} en x = ${C(r2)}`) },
          { s: happy
              ? L(`The parabola is happy, so the only stretch under the axis is BETWEEN the cuts`, `Die parabool is happy, dus is die enigste stuk onder die as TUSSEN die snylyne`)
              : L(`The parabola is sad, so it pokes above the axis between the cuts and drops below on both arms`, `Die parabool is sad, dus steek dit tussen die snylyne bo die as uit en sak dit onder die as op albei arms`) },
          { s: `∴ ${correct}`, r: happy ? L("one single stretch, so it is written as a double inequality", "een enkele stuk, dus word dit as 'n dubbele ongelykheid geskryf") : L("two separate stretches, so they are joined with “or”", "twee aparte stukke, dus word hulle met “of” verbind") },
        ] });
  },

  /* the meaning of a product inequality */
  productSign: () => {
    const cases = [
      { p: L("<b>f(x)·g(x) &gt; 0</b> happens where the two graphs are…", "<b>f(x)·g(x) &gt; 0</b> gebeur waar die twee grafieke…"), c: L("on the same side of the x-axis (both above, or both below)", "aan dieselfde kant van die x-as is (albei bo, of albei onder)"),
        w: [L("on different sides of the x-axis", "aan verskillende kante van die x-as is"), L("both equal to zero", "albei gelyk aan nul is"), L("parallel", "ewewydig is")],
        sol: [{ s: L("A product is positive only two ways: (+)(+) or (−)(−)", "'n Produk is net op twee maniere positief: (+)(+) of (−)(−)"), r: L("the two factors must carry the SAME sign", "die twee faktore moet DIESELFDE teken hê") },
              { s: L("f(x) is + where f is above the x-axis and − where it is below — same for g(x)", "f(x) is + waar f bo die x-as is en − waar dit onder is: dieselfde vir g(x)") },
              { s: L("So paint + and − on both curves and keep the stretches where the two paints match", "Verf dus + en − op albei kurwes en hou die stukke waar die twee kleure ooreenstem"), r: L("both above, or both below", "albei bo, of albei onder") }] },
      { p: L("<b>f(x)·g(x) &lt; 0</b> happens where the two graphs are…", "<b>f(x)·g(x) &lt; 0</b> gebeur waar die twee grafieke…"), c: L("on different sides of the x-axis (one above, one below)", "aan verskillende kante van die x-as is (een bo, een onder)"),
        w: [L("on the same side of the x-axis", "aan dieselfde kant van die x-as is"), L("both positive", "albei positief is"), L("both negative", "albei negatief is")],
        sol: [{ s: L("A product is negative only two ways: (+)(−) or (−)(+)", "'n Produk is net op twee maniere negatief: (+)(−) of (−)(+)"), r: L("the two factors must carry DIFFERENT signs", "die twee faktore moet VERSKILLENDE tekens hê") },
              { s: L("f(x) is + above the x-axis and − below it — same for g(x)", "f(x) is + bo die x-as en − daaronder: dieselfde vir g(x)") },
              { s: L("So keep the stretches where the paints disagree", "Hou dus die stukke waar die kleure verskil"), r: L("one curve above the axis, the other below", "een kurwe bo die as, die ander onder") }] },
      { p: L("<b>f(x)/g(x) &gt; 0</b> happens where the two graphs are…", "<b>f(x)/g(x) &gt; 0</b> gebeur waar die twee grafieke…"), c: L("on the same side of the x-axis (and g(x) ≠ 0)", "aan dieselfde kant van die x-as is (en g(x) ≠ 0)"),
        w: [L("on different sides of the x-axis", "aan verskillende kante van die x-as is"), L("both zero", "albei nul is"), L("equal to each other", "gelyk aan mekaar is")],
        sol: [{ s: L("Dividing follows exactly the same sign rules as multiplying: same signs → +", "Deel volg presies dieselfde tekenreëls as vermenigvuldig: dieselfde tekens → +") },
              { s: L("So the two curves must be on the same side of the x-axis", "Die twee kurwes moet dus aan dieselfde kant van die x-as wees") },
              { s: L("One extra thing: g is in the denominator, so g(x) ≠ 0", "Een ekstra ding: g is in die noemer, dus g(x) ≠ 0"), r: L("the restriction rides after a semicolon", "die beperking kom ná 'n kommapunt") }] },
    ];
    const k = pick(cases);
    return mc("ineqCombined", k.p, k.c, k.w,
      { hint: L("A product (or quotient) is positive when the two factors have the SAME sign, negative when they have DIFFERENT signs.", "'n Produk (of kwosiënt) is positief wanneer die twee faktore DIESELFDE teken het, negatief wanneer hulle VERSKILLENDE tekens het."),
        answerLabel: k.c,
        solution: k.sol });
  },

  /* x·f(x) — the quadrant rule */
  xfSign: () => {
    const cases = [
      { p: L("<b>x·f(x) &gt; 0</b> means x and f(x) (the y-value) have…", "<b>x·f(x) &gt; 0</b> beteken x en f(x) (die y-waarde) het…"), c: L("the same sign — the graph is in the 1st & 3rd quadrants", "dieselfde teken: die grafiek is in die 1ste & 3de kwadrant"),
        w: [L("different signs — the 2nd & 4th quadrants", "verskillende tekens: die 2de & 4de kwadrant"), L("always a positive product", "altyd 'n positiewe produk"), L("a turning point", "'n draaipunt")],
        sol: [{ s: L("x·f(x) is the x-coordinate multiplied by the y-coordinate of the same point", "x·f(x) is die x-koördinaat maal die y-koördinaat van dieselfde punt") },
              { s: L("For that product to be positive the two must match: (+)(+) or (−)(−)", "Vir 'n positiewe produk moet die twee ooreenstem: (+)(+) of (−)(−)") },
              { s: L("x and y both + is the 1st quadrant; both − is the 3rd", "x en y albei + is die 1ste kwadrant; albei − is die 3de"), r: L("∴ the parts of the curve lying in quadrants 1 and 3", "∴ die dele van die kurwe in kwadrante 1 en 3") }] },
      { p: L("<b>x·f(x) &lt; 0</b> means x and f(x) (the y-value) have…", "<b>x·f(x) &lt; 0</b> beteken x en f(x) (die y-waarde) het…"), c: L("different signs — the graph is in the 2nd & 4th quadrants", "verskillende tekens: die grafiek is in die 2de & 4de kwadrant"),
        w: [L("the same sign — the 1st & 3rd quadrants", "dieselfde teken: die 1ste & 3de kwadrant"), L("always a negative x", "altyd 'n negatiewe x"), L("no solution", "geen oplossing")],
        sol: [{ s: L("x·f(x) is the x-coordinate multiplied by the y-coordinate of the same point", "x·f(x) is die x-koördinaat maal die y-koördinaat van dieselfde punt") },
              { s: L("For that product to be negative the two must differ: (+)(−) or (−)(+)", "Vir 'n negatiewe produk moet die twee verskil: (+)(−) of (−)(+)") },
              { s: L("x negative with y positive is the 2nd quadrant; x positive with y negative is the 4th", "x negatief met y positief is die 2de kwadrant; x positief met y negatief is die 4de"), r: L("∴ the parts of the curve lying in quadrants 2 and 4", "∴ die dele van die kurwe in kwadrante 2 en 4") }] },
    ];
    const k = pick(cases);
    return mc("ineqCombined", k.p, k.c, k.w,
      { hint: L("x·f(x) looks at the sign of the x-coordinate times the sign of the y-coordinate — same sign → quadrants 1 & 3.", "x·f(x) kyk na die teken van die x-koördinaat maal die teken van die y-koördinaat: dieselfde teken → kwadrante 1 & 3."),
        answerLabel: k.c,
        solution: k.sol });
  },

  /* boundaries when comparing two graphs */
  compareBoundary: () => {
    return mc("ineqCombined",
      L("When you read <b>f(x) &gt; g(x)</b> off a graph, the boundary x-values are…", "As jy <b>f(x) &gt; g(x)</b> van 'n grafiek aflees, is die grens-x-waardes…"),
      L("the x-coordinates of the points where the graphs intersect", "die x-koördinate van die punte waar die grafieke mekaar sny"),
      [L("the y-intercepts", "die y-afsnitte"), L("the turning points", "die draaipunte"), L("the asymptotes", "die asimptote")],
      { hint: L("f &gt; g is where one curve is above the other. The switch-over happens exactly at their intersection points.", "f &gt; g is waar een kurwe bo die ander is. Die oorskakeling gebeur presies by hul snypunte."),
        answerLabel: L("The x-values of the intersection points.", "Die x-waardes van die snypunte."),
        solution: [
          { s: L("f(x) &gt; g(x) asks: where is f drawn ABOVE g?", "f(x) &gt; g(x) vra: waar is f BO g geteken?") },
          { s: L("f can only stop being above g by crossing it, and crossing happens exactly at an intersection point", "f kan net ophou om bo g te wees deur hom te kruis, en dit gebeur presies by 'n snypunt") },
          { s: L("So cut a line down through every intersection, then read which side keeps f on top", "Sny dus met 'n vertikale lyn deur elke snypunt en lees dan aan watter kant f bo bly"), r: L("the answer comes out in x, written x first", "die antwoord kom in x uit, met x eerste geskryf") },
        ] });
  },
};

export const questFn5 = {
  id: "fn5",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: id === "incDec" ? "incDec" : (id === "fPositive" || id === "fNegative") ? "posNeg" : "ineqCombined", gen,
  })),
};
