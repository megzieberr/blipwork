/* ============================================================
   FUNCTIONS QUEST 6 · Transformations   ★ DIAGRAM
   Shifts, reflections and stretches — both the rule and what it
   does to a graph's key feature.
   ============================================================ */
import { mc } from "./_shared.js";
import { parabolaGraph, hyperbolaGraph, randParabola, randHyperbola } from "./_func.js";
import { eqStr, paraTP, ptStr, C, pick, randInt } from "../funclib.js";
import { L } from "../lang.js";

const ACC = "#0d9488";

const SKILLS = {
  /* how to write a shift */
  shiftRule: () => {
    const k = randInt(2, 5);
    const cases = [
      { p: L(`How do you shift f(x) <b>up</b> by ${k}?`, `Hoe skuif jy f(x) <b>op</b> met ${k}?`), c: L(`f(x) + ${k}`, `f(x) + ${k}`), w: [L(`f(x) − ${k}`, `f(x) − ${k}`), L(`f(x + ${k})`, `f(x + ${k})`), L(`f(x − ${k})`, `f(x − ${k})`)],
        sol: [{ s: L("Up and down change the ANSWER, so the number goes OUTSIDE the bracket", "Op en af verander die ANTWOORD, dus gaan die getal BUITE die hakie") },
              { s: L(`Every y-value has to come out ${k} bigger: f(x) + ${k}`, `Elke y-waarde moet ${k} groter uitkom: f(x) + ${k}`), r: L("nothing happens to x, so nothing moves sideways", "niks gebeur met x nie, dus skuif niks links of regs nie") }] },
      { p: L(`How do you shift f(x) <b>down</b> by ${k}?`, `Hoe skuif jy f(x) <b>af</b> met ${k}?`), c: L(`f(x) − ${k}`, `f(x) − ${k}`), w: [L(`f(x) + ${k}`, `f(x) + ${k}`), L(`f(x − ${k})`, `f(x − ${k})`), L(`f(x + ${k})`, `f(x + ${k})`)],
        sol: [{ s: L("Up and down change the ANSWER, so the number goes OUTSIDE the bracket", "Op en af verander die ANTWOORD, dus gaan die getal BUITE die hakie") },
              { s: L(`Every y-value has to come out ${k} smaller: f(x) − ${k}`, `Elke y-waarde moet ${k} kleiner uitkom: f(x) − ${k}`), r: L("nothing happens to x, so nothing moves sideways", "niks gebeur met x nie, dus skuif niks links of regs nie") }] },
      { p: L(`How do you shift f(x) <b>right</b> by ${k}?`, `Hoe skuif jy f(x) <b>regs</b> met ${k}?`), c: L(`f(x − ${k})`, `f(x − ${k})`), w: [L(`f(x + ${k})`, `f(x + ${k})`), L(`f(x) − ${k}`, `f(x) − ${k}`), L(`f(x) + ${k}`, `f(x) + ${k}`)],
        sol: [{ s: L("Left and right change what you FEED IN, so the number goes INSIDE the bracket with the x", "Links en regs verander wat jy INVOER, dus gaan die getal BINNE die hakie by die x") },
              { s: L(`Moving right means the value that used to appear at 0 must now appear at ${k}`, `Regs skuif beteken die waarde wat vroeër by 0 was, moet nou by ${k} verskyn`) },
              { s: L(`So the bracket has to take that ${k} back off again: f(x − ${k})`, `Die hakie moet dus daardie ${k} weer aftrek: f(x − ${k})`), r: L("that is why “right” is written with a minus", "daarom word “regs” met 'n minus geskryf") }] },
      { p: L(`How do you shift f(x) <b>left</b> by ${k}?`, `Hoe skuif jy f(x) <b>links</b> met ${k}?`), c: L(`f(x + ${k})`, `f(x + ${k})`), w: [L(`f(x − ${k})`, `f(x − ${k})`), L(`f(x) + ${k}`, `f(x) + ${k}`), L(`f(x) − ${k}`, `f(x) − ${k}`)],
        sol: [{ s: L("Left and right change what you FEED IN, so the number goes INSIDE the bracket with the x", "Links en regs verander wat jy INVOER, dus gaan die getal BINNE die hakie by die x") },
              { s: L(`Moving left means the value that used to appear at 0 must now appear at −${k}`, `Links skuif beteken die waarde wat vroeër by 0 was, moet nou by −${k} verskyn`) },
              { s: L(`So the bracket has to add the ${k} back on: f(x + ${k})`, `Die hakie moet dus die ${k} weer bytel: f(x + ${k})`), r: L("that is why “left” is written with a plus", "daarom word “links” met 'n plus geskryf") }] },
    ];
    const c = pick(cases);
    return mc("transformations", c.p, c.c, c.w,
      { hint: L("Up/down change the WHOLE function: f(x) ± k. Left/right go INSIDE with x: left is f(x + k), right is f(x − k).", "Op/af verander die HELE funksie: f(x) ± k. Links/regs gaan BINNE by x: links is f(x + k), regs is f(x − k)."),
        answerLabel: c.c,
        solution: c.sol });
  },

  /* describe a given shift */
  shiftDescribe: () => {
    const k = randInt(2, 5);
    const cases = [
      { p: L(`<b>f(x) + ${k}</b> shifts the graph…`, `<b>f(x) + ${k}</b> skuif die grafiek…`), c: L(`up by ${k}`, `op met ${k}`), w: [L(`down by ${k}`, `af met ${k}`), L(`right by ${k}`, `regs met ${k}`), L(`left by ${k}`, `links met ${k}`)],
        sol: [{ s: L(`The ${k} sits OUTSIDE the bracket, so it changes the answer, not the input`, `Die ${k} sit BUITE die hakie, dus verander dit die antwoord, nie die invoer nie`) },
              { s: L(`Every y-value comes out ${k} bigger, so the whole graph lifts`, `Elke y-waarde kom ${k} groter uit, dus lig die hele grafiek op`), r: L(`∴ up by ${k}`, `∴ op met ${k}`) }] },
      { p: L(`<b>f(x) − ${k}</b> shifts the graph…`, `<b>f(x) − ${k}</b> skuif die grafiek…`), c: L(`down by ${k}`, `af met ${k}`), w: [L(`up by ${k}`, `op met ${k}`), L(`left by ${k}`, `links met ${k}`), L(`right by ${k}`, `regs met ${k}`)],
        sol: [{ s: L(`The ${k} sits OUTSIDE the bracket, so it changes the answer, not the input`, `Die ${k} sit BUITE die hakie, dus verander dit die antwoord, nie die invoer nie`) },
              { s: L(`Every y-value comes out ${k} smaller, so the whole graph drops`, `Elke y-waarde kom ${k} kleiner uit, dus sak die hele grafiek`), r: L(`∴ down by ${k}`, `∴ af met ${k}`) }] },
      { p: L(`<b>f(x − ${k})</b> shifts the graph…`, `<b>f(x − ${k})</b> skuif die grafiek…`), c: L(`right by ${k}`, `regs met ${k}`), w: [L(`left by ${k}`, `links met ${k}`), L(`up by ${k}`, `op met ${k}`), L(`down by ${k}`, `af met ${k}`)],
        sol: [{ s: L(`The ${k} is INSIDE the bracket with the x, so it changes what gets fed in`, `Die ${k} is BINNE die hakie by die x, dus verander dit wat ingevoer word`) },
              { s: L(`Put x = ${k} in and the bracket gives f(0) — the value that used to sit at 0 now shows up at ${k}`, `Sit x = ${k} in en die hakie gee f(0): die waarde wat vroeër by 0 was, verskyn nou by ${k}`) },
              { s: L(`Everything slides ${k} to the RIGHT`, `Alles skuif ${k} na REGS`), r: L("the minus inside the bracket moves the graph the opposite way", "die minus binne die hakie skuif die grafiek die teenoorgestelde kant toe") }] },
      { p: L(`<b>f(x + ${k})</b> shifts the graph…`, `<b>f(x + ${k})</b> skuif die grafiek…`), c: L(`left by ${k}`, `links met ${k}`), w: [L(`right by ${k}`, `regs met ${k}`), L(`down by ${k}`, `af met ${k}`), L(`up by ${k}`, `op met ${k}`)],
        sol: [{ s: L(`The ${k} is INSIDE the bracket with the x, so it changes what gets fed in`, `Die ${k} is BINNE die hakie by die x, dus verander dit wat ingevoer word`) },
              { s: L(`Put x = −${k} in and the bracket gives f(0) — the value that used to sit at 0 now shows up at −${k}`, `Sit x = −${k} in en die hakie gee f(0): die waarde wat vroeër by 0 was, verskyn nou by −${k}`) },
              { s: L(`Everything slides ${k} to the LEFT`, `Alles skuif ${k} na LINKS`), r: L("the plus inside the bracket moves the graph the opposite way", "die plus binne die hakie skuif die grafiek die teenoorgestelde kant toe") }] },
    ];
    const c = pick(cases);
    return mc("transformations", c.p, c.c, c.w,
      { hint: L("± outside the bracket = up/down. The bit with x flips the direction: (x − k) moves right, (x + k) moves left.", "± buite die hakie = op/af. Die stuk by x draai die rigting om: (x − k) skuif regs, (x + k) skuif links."),
        answerLabel: c.c,
        solution: c.sol });
  },

  /* reflections */
  reflect: () => {
    const cases = [
      { p: L("Reflection in the <b>x-axis</b> is written…", "Refleksie in die <b>x-as</b> word geskryf as…"), c: L("−f(x)", "−f(x)"), w: [L("f(−x)", "f(−x)"), L("f(x)⁻¹", "f(x)⁻¹"), L("−f(−x)", "−f(−x)")],
        sol: [{ s: L("Folding over the x-axis turns a point (x ; y) into (x ; −y)", "As jy oor die x-as vou, word 'n punt (x ; y) die punt (x ; −y)"), r: L("only the y-value flips", "net die y-waarde draai om") },
              { s: L("The y-value is the ANSWER, so the minus goes in front of the whole function", "Die y-waarde is die ANTWOORD, dus gaan die minus voor die hele funksie"), r: L("∴ −f(x)", "∴ −f(x)") }] },
      { p: L("Reflection in the <b>y-axis</b> is written…", "Refleksie in die <b>y-as</b> word geskryf as…"), c: L("f(−x)", "f(−x)"), w: [L("−f(x)", "−f(x)"), L("f(x) − 1", "f(x) − 1"), L("−f(−x)", "−f(−x)")],
        sol: [{ s: L("Folding over the y-axis turns a point (x ; y) into (−x ; y)", "As jy oor die y-as vou, word 'n punt (x ; y) die punt (−x ; y)"), r: L("only the x-value flips", "net die x-waarde draai om") },
              { s: L("The x-value is the INPUT, so the minus goes on the x only", "Die x-waarde is die INVOER, dus gaan die minus net op die x"), r: L("∴ f(−x)", "∴ f(−x)") }] },
      { p: L("<b>−f(x)</b> reflects the graph in the…", "<b>−f(x)</b> reflekteer die grafiek in die…"), c: L("x-axis (the y-values change sign)", "x-as (die y-waardes verander van teken)"), w: [L("y-axis (the x-values change sign)", "y-as (die x-waardes verander van teken)"), L("line y = x", "lyn y = x"), L("origin only", "net die oorsprong")],
        sol: [{ s: L("The minus sits on the whole function, so every answer comes out with its sign flipped", "Die minus sit op die hele funksie, dus kom elke antwoord uit met sy teken omgedraai") },
              { s: L("(x ; y) becomes (x ; −y): the point keeps its place left-to-right and swaps top for bottom", "(x ; y) word (x ; −y): die punt hou sy plek van links na regs en ruil bo vir onder") },
              { s: L("That fold is over the x-axis", "Daardie vou is oor die x-as") }] },
      { p: L("<b>f(−x)</b> reflects the graph in the…", "<b>f(−x)</b> reflekteer die grafiek in die…"), c: L("y-axis (the x-values change sign)", "y-as (die x-waardes verander van teken)"), w: [L("x-axis (the y-values change sign)", "x-as (die y-waardes verander van teken)"), L("line y = x", "lyn y = x"), L("origin only", "net die oorsprong")],
        sol: [{ s: L("The minus sits on the x only, so every input goes in with its sign flipped", "Die minus sit net op die x, dus gaan elke invoer in met sy teken omgedraai") },
              { s: L("(x ; y) becomes (−x ; y): the point keeps its height and swaps left for right", "(x ; y) word (−x ; y): die punt hou sy hoogte en ruil links vir regs") },
              { s: L("That fold is over the y-axis", "Daardie vou is oor die y-as") }] },
    ];
    const c = pick(cases);
    return mc("transformations", c.p, c.c, c.w,
      { hint: L("Negative on the WHOLE function → reflect in the x-axis. Negative on the x only → reflect in the y-axis.", "Negatief op die HELE funksie → reflekteer in die x-as. Negatief net op die x → reflekteer in die y-as."),
        answerLabel: c.c,
        solution: c.sol });
  },

  /* vertical stretch */
  stretch: () => {
    return mc("transformations",
      L("What does <b>k·f(x)</b> with k &gt; 1 do to the graph?", "Wat doen <b>k·f(x)</b> met k &gt; 1 aan die grafiek?"),
      L("Stretches it vertically (the y-values grow)", "Rek dit vertikaal (die y-waardes groei)"),
      [L("Shifts it up by k", "Skuif dit op met k"), L("Reflects it in the x-axis", "Reflekteer dit in die x-as"), L("Shifts it right by k", "Skuif dit regs met k")],
      { hint: L("Multiplying the whole function by k scales every y-value by k — a vertical stretch (k &gt; 1) or shrink (0 &lt; k &lt; 1).", "Om die hele funksie met k te vermenigvuldig, skaal elke y-waarde met k: 'n vertikale rek (k &gt; 1) of saamdruk (0 &lt; k &lt; 1)."),
        answerLabel: L("A vertical stretch by a factor of k.", "'n Vertikale rek met 'n faktor k."),
        solution: [
          { s: L("k·f(x) multiplies the ANSWER by k, so every y-value becomes k times as big", "k·f(x) vermenigvuldig die ANTWOORD met k, dus word elke y-waarde k keer so groot") },
          { s: L("The x is untouched, so no point moves left or right", "Die x bly onaangeraak, dus skuif geen punt links of regs nie"), r: L("the x-intercepts stay exactly where they were", "die x-afsnitte bly presies waar hulle was") },
          { s: L("With k &gt; 1 every point is pulled further from the x-axis — a vertical stretch", "Met k &gt; 1 skuif elke punt verder weg van die x-as: 'n vertikale rek"), r: L("0 &lt; k &lt; 1 would squash it towards the axis instead", "0 &lt; k &lt; 1 sou dit eerder na die as toe saamdruk") },
        ] });
  },

  /* apply a reflection to a parabola's turning point */
  applyReflect: () => {
    let cv = randParabola(), tp = paraTP(cv);
    while (Math.abs(tp.x) < 0.4 || Math.abs(tp.y) < 0.4) { cv = randParabola(); tp = paraTP(cv); }   // both coords non-zero → all four options distinct
    const inX = pick([true, false]);
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    const nx = inX ? tp.x : -tp.x, ny = inX ? -tp.y : tp.y;
    return mc("transformations",
      L(`f has turning point ${ptStr(tp.x, tp.y)}. After reflecting f in the <b>${inX ? "x-axis" : "y-axis"}</b>, the new turning point is…`, `f het draaipunt ${ptStr(tp.x, tp.y)}. As f in die <b>${inX ? "x-as" : "y-as"}</b> gereflekteer word, is die nuwe draaipunt…`),
      ptStr(nx, ny),
      [ptStr(inX ? -tp.x : tp.x, inX ? tp.y : -tp.y), ptStr(-tp.x, -tp.y), ptStr(tp.x, tp.y)],
      { graph: g.spec,
        hint: inX ? L("Reflection in the x-axis is −f(x): only the y-coordinate changes sign.", "Refleksie in die x-as is −f(x): net die y-koördinaat verander van teken.")
                  : L("Reflection in the y-axis is f(−x): only the x-coordinate changes sign.", "Refleksie in die y-as is f(−x): net die x-koördinaat verander van teken."),
        answerLabel: L(`New turning point ${ptStr(nx, ny)}.`, `Nuwe draaipunt ${ptStr(nx, ny)}.`),
        solution: [
          { s: inX ? L("Reflection in the x-axis is −f(x): every y-value changes sign and x stays put", "Refleksie in die x-as is −f(x): elke y-waarde verander van teken en x bly staan")
                   : L("Reflection in the y-axis is f(−x): every x-value changes sign and y stays put", "Refleksie in die y-as is f(−x): elke x-waarde verander van teken en y bly staan") },
          { s: L(`Do that to the turning point ${ptStr(tp.x, tp.y)}: ${inX ? `y goes ${C(tp.y)} → ${C(ny)}, x stays ${C(nx)}` : `x goes ${C(tp.x)} → ${C(nx)}, y stays ${C(ny)}`}`, `Doen dit aan die draaipunt ${ptStr(tp.x, tp.y)}: ${inX ? `y gaan ${C(tp.y)} → ${C(ny)}, x bly ${C(nx)}` : `x gaan ${C(tp.x)} → ${C(nx)}, y bly ${C(ny)}`}`) },
          { s: L(`∴ new turning point ${ptStr(nx, ny)}`, `∴ nuwe draaipunt ${ptStr(nx, ny)}`), r: L("only ONE coordinate ever changes in a reflection like this", "net EEN koördinaat verander ooit in so 'n refleksie") },
        ] });
  },

  /* apply a shift to a parabola's turning point */
  applyToParabola: () => {
    const cv = randParabola(), tp = paraTP(cv);
    const k = randInt(1, 4), up = pick([true, false]);
    const g = parabolaGraph(cv, { accent: ACC, label: "f" });
    const ny = up ? tp.y + k : tp.y - k;
    return mc("transformations",
      L(`f has turning point ${ptStr(tp.x, tp.y)}. If f is shifted <b>${up ? "up" : "down"} by ${k}</b>, the new turning point is…`, `f het draaipunt ${ptStr(tp.x, tp.y)}. As f <b>${up ? "op" : "af"} met ${k}</b> geskuif word, is die nuwe draaipunt…`),
      ptStr(tp.x, ny), [ptStr(tp.x, up ? tp.y - k : tp.y + k), ptStr(up ? tp.x + k : tp.x - k, tp.y), ptStr(tp.x, tp.y)],
      { graph: g.spec,
        hint: L("Up/down only changes the y-coordinate. x stays the same.", "Op/af verander net die y-koördinaat. x bly dieselfde."),
        answerLabel: L(`New turning point ${ptStr(tp.x, ny)}.`, `Nuwe draaipunt ${ptStr(tp.x, ny)}.`),
        solution: [
          { s: L(`Shifting ${up ? "up" : "down"} moves everything vertically, so only the y-coordinate changes`, `'n Skuif ${up ? "op" : "af"} beweeg alles vertikaal, dus verander net die y-koördinaat`) },
          { s: L(`y: ${C(tp.y)} ${up ? "+" : "−"} ${C(k)} = ${C(ny)}`, `y: ${C(tp.y)} ${up ? "+" : "−"} ${C(k)} = ${C(ny)}`) },
          { s: L(`∴ new turning point ${ptStr(tp.x, ny)}`, `∴ nuwe draaipunt ${ptStr(tp.x, ny)}`), r: L(`the x-coordinate is still ${C(tp.x)}, and so is the axis of symmetry`, `die x-koördinaat is steeds ${C(tp.x)}, en so ook die simmetrie-as`) },
        ] });
  },

  /* apply a shift to a hyperbola's asymptotes */
  applyToHyperbola: () => {
    const cv = randHyperbola();
    const k = randInt(1, 4), up = pick([true, false]);
    const g = hyperbolaGraph(cv, { accent: ACC, label: "f" });
    const nq = up ? cv.q + k : cv.q - k;
    return mc("transformations",
      L(`f has asymptotes x = ${C(cv.p)} and y = ${C(cv.q)}. After shifting <b>${up ? "up" : "down"} by ${k}</b>, the asymptotes are…`, `f het asimptote x = ${C(cv.p)} en y = ${C(cv.q)}. Ná 'n skuif <b>${up ? "op" : "af"} met ${k}</b> is die asimptote…`),
      L(`x = ${C(cv.p)} and y = ${C(nq)}`, `x = ${C(cv.p)} en y = ${C(nq)}`),
      [L(`x = ${C(up ? cv.p + k : cv.p - k)} and y = ${C(cv.q)}`, `x = ${C(up ? cv.p + k : cv.p - k)} en y = ${C(cv.q)}`), L(`x = ${C(cv.p)} and y = ${C(up ? cv.q - k : cv.q + k)}`, `x = ${C(cv.p)} en y = ${C(up ? cv.q - k : cv.q + k)}`), L(`x = ${C(cv.q)} and y = ${C(cv.p)}`, `x = ${C(cv.q)} en y = ${C(cv.p)}`)],
      { graph: g.spec,
        hint: L("A vertical shift moves the horizontal asymptote y = q only; the vertical asymptote x = p stays put.", "'n Vertikale skuif beweeg net die horisontale asimptoot y = q; die vertikale asimptoot x = p bly staan."),
        answerLabel: L(`x = ${C(cv.p)} and y = ${C(nq)}.`, `x = ${C(cv.p)} en y = ${C(nq)}.`),
        solution: [
          { s: L(`Shifting ${up ? "up" : "down"} by ${k} lifts every part of the picture, the flat asymptote included`, `'n Skuif ${up ? "op" : "af"} met ${k} skuif elke deel van die prent saam, die plat asimptoot ingesluit`) },
          { s: L(`y = ${C(cv.q)} ${up ? "+" : "−"} ${C(k)} → y = ${C(nq)}`, `y = ${C(cv.q)} ${up ? "+" : "−"} ${C(k)} → y = ${C(nq)}`) },
          { s: L(`The upright asymptote x = ${C(cv.p)} is a left-right position, so a vertical shift cannot touch it`, `Die regop asimptoot x = ${C(cv.p)} is 'n links-regs-posisie, dus kan 'n vertikale skuif hom nie raak nie`),
            r: L(`∴ x = ${C(cv.p)} and y = ${C(nq)}`, `∴ x = ${C(cv.p)} en y = ${C(nq)}`) },
        ] });
  },
};

export const questFn6 = {
  id: "fn6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "transformations", gen })),
};
