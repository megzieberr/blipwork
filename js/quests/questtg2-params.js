/* ============================================================
   TRIG GRAPHS QUEST 2 · What a, b and q do
   The effect of each parameter in y = a·sin b(x − p) + q:
   the sign & size of a, the squash of b, the slide of q.
   ============================================================ */
import { mc } from "./_shared.js";
import { trigGraph, pick3 } from "./_tgraph.js";
import { eqStr, pick, randInt } from "../tgraphlib.js";
import { L } from "../lang.js";

const ACC = "#818cf8";

const SKILLS = {
  /* sign of a → reflection */
  signOfA: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const a = pick([-2, -3, -1]);
    const cv = { fn, a, b: 1, p: 0, q: 0 };
    return mc("trigParams", L(`${eqStr(cv)}<br>What does the <b>negative</b> in front do?`, `${eqStr(cv)}<br>Wat doen die <b>negatiewe teken</b> vooraan?`),
      L("Reflects the graph in the x-axis (flips it upside-down)", "Reflekteer die grafiek in die x-as (draai dit onderstebo)"),
      [L("Shifts the graph downwards", "Skuif die grafiek af"), L("Makes the period shorter", "Maak die periode korter"), L("Halves the amplitude", "Halveer die amplitude")],
      { graph: trigGraph(cv, { accent: ACC }).spec, layout: "grid2",
        hint: L("A negative a only flips the graph over the x-axis; it does not move it or change the period.", "'n Negatiewe a draai die grafiek net om oor die x-as; dit skuif dit nie en verander nie die periode nie."),
        answerLabel: L("A negative a reflects the graph in the x-axis.", "'n Negatiewe a reflekteer die grafiek in die x-as.") });
  },

  /* size of a → amplitude */
  sizeOfA: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const a = pick([2, 3, 4]);
    const cv = { fn, a, b: 1, p: 0, q: 0 };
    return mc("trigParams", L(`Compared with y = ${fn} x, the graph ${eqStr(cv)} is…`, `Vergeleke met y = ${fn} x is die grafiek ${eqStr(cv)}…`),
      L(`${a} times as tall (amplitude ${a})`, `${a} keer so hoog (amplitude ${a})`),
      [L(`${a} times as wide`, `${a} keer so wyd`), L(`shifted up ${a} units`, `${a} eenhede opgeskuif`), L("reflected in the x-axis", "in die x-as gereflekteer")],
      { graph: trigGraph(cv, { accent: ACC }).spec, layout: "grid2",
        hint: L("a stretches the graph vertically — it sets the amplitude (the height to a peak).", "a rek die grafiek vertikaal: dit bepaal die amplitude (die hoogte tot 'n piek)."),
        answerLabel: L(`a = ${a} stretches the height: amplitude ${a}.`, `a = ${a} rek die hoogte: amplitude ${a}.`) });
  },

  /* b → period / cycles */
  effectOfB: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const b = pick([2, 3]);
    const cv = { fn, a: 1, b, p: 0, q: 0 };
    return mc("trigParams", L(`${eqStr(cv)}<br>What does the <b>${b}</b> do?`, `${eqStr(cv)}<br>Wat doen die <b>${b}</b>?`),
      L(`Squashes it sideways → ${b} cycles in 360° (shorter period)`, `Druk dit horisontaal saam → ${b} siklusse in 360° (korter periode)`),
      [L("Stretches it wider (longer period)", "Rek dit wyer (langer periode)"), L(`Shifts it ${b} units up`, `Skuif dit ${b} eenhede op`), L(`Makes it ${b} times as tall`, `Maak dit ${b} keer so hoog`)],
      { graph: trigGraph(cv, { accent: ACC }).spec, layout: "grid2",
        hint: L("b changes the period: period = 360° ÷ b. A bigger b means more cycles squeezed into 360°.", "b verander die periode: periode = 360° ÷ b. 'n Groter b druk meer siklusse in 360° in."),
        answerLabel: L(`b = ${b} → ${b} cycles in 360° (period ${360 / b}°).`, `b = ${b} → ${b} siklusse in 360° (periode ${360 / b}°).`) });
  },

  /* q → vertical shift */
  effectOfQ: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const q = pick([-3, -2, 2, 3]);
    const cv = { fn, a: 1, b: 1, p: 0, q };
    const dir = q > 0 ? L("up", "op") : L("down", "af");
    return mc("trigParams", L(`How is ${eqStr(cv)} different from y = ${fn} x?`, `Hoe verskil ${eqStr(cv)} van y = ${fn} x?`),
      L(`Shifted ${Math.abs(q)} units ${dir}`, `${Math.abs(q)} eenhede ${dir}geskuif`),
      [L(`Shifted ${Math.abs(q)} units ${q > 0 ? "down" : "up"}`, `${Math.abs(q)} eenhede ${q > 0 ? "af" : "op"}geskuif`), L(`Shifted ${Math.abs(q)}° to the right`, `${Math.abs(q)}° na regs geskuif`), L("Reflected in the x-axis", "In die x-as gereflekteer")],
      { graph: trigGraph(cv, { accent: ACC, midline: true }).spec, layout: "grid2",
        hint: L("q slides the whole graph vertically. q > 0 up, q < 0 down. The midline becomes y = q.", "q skuif die hele grafiek vertikaal. q > 0 op, q < 0 af. Die middellyn word y = q."),
        answerLabel: L(`q = ${q} shifts the graph ${Math.abs(q)} units ${dir}.`, `q = ${q} skuif die grafiek ${Math.abs(q)} eenhede ${dir}.`) });
  },

  /* read the midline */
  findMidline: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const a = pick([1, 2]);
    const q = pick([-2, -1, 1, 2, 3]);
    const cv = { fn, a, b: 1, p: 0, q };
    const yl = (v) => L(`y = ${String(v).replace("-", "−")}`, `y = ${String(v).replace("-", "−")}`);
    return mc("trigParams", L(`${eqStr(cv)}<br>What is the equation of the <b>midline</b>?`, `${eqStr(cv)}<br>Wat is die vergelyking van die <b>middellyn</b>?`),
      yl(q), pick3(yl(q), [yl(a), L("y = 0", "y = 0"), yl(q + a), yl(-q), yl(q - a)]),
      { graph: trigGraph(cv, { accent: ACC, midline: true }).spec,
        hint: L("The midline runs through the middle of the wave at y = q (the dashed line).", "Die middellyn loop deur die middel van die golf by y = q (die stippellyn)."),
        answerLabel: L(`Midline: y = ${String(q).replace("-", "−")}.`, `Middellyn: y = ${String(q).replace("-", "−")}.`) });
  },

  /* reflection yes/no */
  reflectYesNo: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const flipped = pick([true, false]);
    const cv = { fn, a: flipped ? -1 : 1, b: 1, p: 0, q: 0 };
    return {
      type: "yesno", concept: "trigParams",
      prompt: L(`Is ${eqStr(cv)} the graph of y = ${fn} x reflected in the x-axis?`, `Is ${eqStr(cv)} die grafiek van y = ${fn} x, gereflekteer in die x-as?`),
      graph: trigGraph(cv, { accent: ACC }).spec,
      yes: flipped,
      hint: L("A reflection in the x-axis flips the graph upside-down — that happens when a is negative.", "'n Refleksie in die x-as draai die grafiek onderstebo: dit gebeur as a negatief is."),
      answerLabel: flipped ? L(`Yes — a = −1 flips y = ${fn} x in the x-axis.`, `Ja: a = −1 draai y = ${fn} x om in die x-as.`) : L(`No — a = 1, so it is just y = ${fn} x (not flipped).`, `Nee: a = 1, dus is dit net y = ${fn} x (nie omgedraai nie).`),
      solution: [{ s: flipped ? L("a is negative, so the graph is reflected in the x-axis.", "a is negatief, dus is die grafiek in die x-as gereflekteer.") : L("a is positive, so the graph is the normal way up.", "a is positief, dus staan die grafiek die gewone kant bo.") }],
    };
  },
};

export const questTg2 = {
  id: "tg2",
  skills: [
    { id: "signOfA", concept: "trigParams", gen: SKILLS.signOfA },
    { id: "sizeOfA", concept: "trigParams", gen: SKILLS.sizeOfA },
    { id: "effectOfB", concept: "trigParams", gen: SKILLS.effectOfB },
    { id: "effectOfQ", concept: "trigParams", gen: SKILLS.effectOfQ },
    { id: "findMidline", concept: "trigParams", gen: SKILLS.findMidline },
    { id: "reflectYesNo", concept: "trigParams", gen: SKILLS.reflectYesNo },
  ],
};
