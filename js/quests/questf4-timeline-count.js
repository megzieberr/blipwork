/* ============================================================
   FINANCE QUEST 4 · Timelines — counting moves   ★
   Reading a financial timeline: how MANY periods an amount must
   move, and in which DIRECTION (forward = ×, backward = ÷). Every
   question shows a to-scale timeline from the timeline engine.
   ============================================================ */
import { mc } from "./_shared.js";
import { randInt, pick } from "../ui.js";
import { rand, pow } from "../finlib.js";
import { L } from "../lang.js";

const COUNT = "timelineCount";
const MOVE = "timelineMove";

/* a quick timeline spec builder */
const tl = (n, nodes, arc) => ({ type: "timeline", n, nodes, ...(arc ? { arc } : {}) });
const money = () => pick([1000, 2000, 5000, 8000, 12000]);

const SKILLS = {
  countForward: () => {
    const n = randInt(4, 6);
    return {
      type: "calc", concept: COUNT, dp: 0,
      prompt: L(`The money sits at <b>T0</b> and is moved forward to <b>T${n}</b>. How many periods is that?`, `Die geld staan by <b>T0</b> en word vorentoe geskuif na <b>T${n}</b>. Hoeveel periodes is dit?`),
      graph: tl(n, [{ t: 0, role: "P" }, { t: n, role: "A" }], { from: 0, to: n }),
      expected: n,
      hint: L("Count the gaps between the dots, not the dots themselves.", "Tel die gapings tussen die kolletjies, nie die kolletjies self nie."),
      answerLabel: L(`${n} periods`, `${n} periodes`),
      solution: [{ s: L(`From T0 to T${n} is ${n} equal jumps.`, `Van T0 tot T${n} is ${n} gelyke spronge.`) }],
    };
  },

  countBetween: () => {
    const a = randInt(1, 2), b = a + randInt(2, 3);
    return {
      type: "calc", concept: COUNT, dp: 0,
      prompt: L(`How many periods are there from <b>T${a}</b> to <b>T${b}</b>?`, `Hoeveel periodes is daar van <b>T${a}</b> tot <b>T${b}</b>?`),
      graph: tl(b, [{ t: a, role: "P" }, { t: b, role: "A" }], { from: a, to: b }),
      expected: b - a,
      hint: L(`Count the jumps from T${a} up to T${b}.`, `Tel die spronge van T${a} tot by T${b}.`),
      answerLabel: L(`${b} − ${a} = ${b - a} periods`, `${b} − ${a} = ${b - a} periodes`),
      solution: [
        { s: L(`Count the JUMPS between the dots, not the dots themselves`, `Tel die SPRONGE tussen die kolletjies, nie die kolletjies self nie`), r: L(`T${a} up to T${b}`, `T${a} tot by T${b}`) },
        { s: L(`${b} − ${a} = ${b - a} periods`, `${b} − ${a} = ${b - a} periodes`) },
      ],
    };
  },

  countBackward: () => {
    const a = randInt(0, 1), b = a + randInt(2, 4);
    return {
      type: "calc", concept: COUNT, dp: 0,
      prompt: L(`An amount at <b>T${b}</b> is moved <b>back</b> to <b>T${a}</b>. How many periods does it move?`, `'n Bedrag by <b>T${b}</b> word <b>terug</b> geskuif na <b>T${a}</b>. Oor hoeveel periodes skuif dit?`),
      graph: tl(b, [{ t: b, role: "A" }, { t: a, role: "P" }], { from: b, to: a, dir: "back" }),
      expected: b - a,
      hint: L("Direction does not change the count — still count the gaps.", "Die rigting verander nie die telling nie: tel steeds die gapings."),
      answerLabel: L(`${b - a} periods (backward)`, `${b - a} periodes (agtertoe)`),
      solution: [
        { s: L(`Count the jumps between T${a} and T${b}: ${b} − ${a} = ${b - a}`, `Tel die spronge tussen T${a} en T${b}: ${b} − ${a} = ${b - a}`) },
        { s: L(`Going backward does not change the COUNT — it is still ${b - a} periods`, `Agtertoe verander nie die TELLING nie: dit is steeds ${b - a} periodes`), r: L("direction changes the sign of the exponent, not the count", "die rigting verander die teken van die eksponent, nie die telling nie") },
      ],
    };
  },

  directionForward: () => {
    const a = randInt(0, 1), b = a + randInt(2, 3);
    return mc(MOVE,
      L(`To move the money from <b>T${a}</b> to <b>T${b}</b>, do you…`, `Om die geld van <b>T${a}</b> na <b>T${b}</b> te skuif, moet jy…`),
      L("multiply by (1 + i)", "vermenigvuldig met (1 + i)"),
      [L("divide by (1 + i)", "deel deur (1 + i)"), L("subtract i each time", "elke keer i aftrek"), L("leave it unchanged", "dit onveranderd laat")],
      { graph: tl(b, [{ t: a, role: "P" }, { t: b, label: "?", role: "A" }]),
        hint: L("Moving to a LATER date means the money grows — multiply.", "Skuif na 'n LATERE datum beteken die geld groei: vermenigvuldig."),
        answerLabel: L("Later date → multiply by (1 + i)", "Latere datum → vermenigvuldig met (1 + i)"),
        solution: [
          { s: L(`T${b} is LATER than T${a}`, `T${b} is LATER as T${a}`), r: L("the money has had more time to grow", "die geld het meer tyd gehad om te groei") },
          { s: L(`Forward → multiply by (1 + i)`, `Vorentoe → vermenigvuldig met (1 + i)`), r: L(`${b - a} periods, so × ${pow("(1 + i)", b - a)}`, `${b - a} periodes, so × ${pow("(1 + i)", b - a)}`) },
        ] });
  },

  directionBackward: () => {
    const a = randInt(0, 1), b = a + randInt(2, 3);
    return mc(MOVE,
      L(`To move the money from <b>T${b}</b> back to <b>T${a}</b>, do you…`, `Om die geld van <b>T${b}</b> terug na <b>T${a}</b> te skuif, moet jy…`),
      L("divide by (1 + i)", "deel deur (1 + i)"),
      [L("multiply by (1 + i)", "vermenigvuldig met (1 + i)"), L("add i each time", "elke keer i bytel"), L("leave it unchanged", "dit onveranderd laat")],
      { graph: tl(b, [{ t: b, role: "A" }, { t: a, label: "?", role: "P" }]),
        hint: L("Moving to an EARLIER date means undoing growth — divide.", "Skuif na 'n VROEËRE datum maak groei ongedaan: deel."),
        answerLabel: L("Earlier date → divide by (1 + i)", "Vroeëre datum → deel deur (1 + i)"),
        solution: [
          { s: L(`T${a} is EARLIER than T${b}`, `T${a} is VROEËR as T${b}`), r: L("you are undoing growth, not adding it", "jy maak groei ongedaan, jy voeg dit nie by nie") },
          { s: L(`Backward → divide by (1 + i)`, `Agtertoe → deel deur (1 + i)`), r: L(`${b - a} periods, so × ${pow("(1 + i)", `−${b - a}`)}`, `${b - a} periodes, so × ${pow("(1 + i)", `−${b - a}`)}`) },
        ] });
  },

  tapTarget: () => {
    const k = randInt(2, 4), P = money();
    return {
      type: "tap", concept: COUNT,
      prompt: L(`R${rand(P, 0).slice(1)} is invested at T0. Tap the point that is <b>${k} periods</b> after the start.`, `R${rand(P, 0).slice(1)} word by T0 belê. Klik op die punt wat <b>${k} periodes</b> ná die begin is.`),
      graph: tl(5, [{ t: 0, amount: P, dp: 0 }], null),
      tap: { correctId: k, targets: [0, 1, 2, 3, 4, 5] },
      tapHint: L("Count the jumps from T0.", "Tel die spronge vanaf T0."),
      hint: L(`${k} periods after T0 is T${k}.`, `${k} periodes ná T0 is T${k}.`),
      answerLabel: L(`T${k}`, `T${k}`),
      solution: [
        { s: L(`Start at T0 and count ${k} jumps to the right`, `Begin by T0 en tel ${k} spronge na regs`), r: L("T0 is the start, not the first jump", "T0 is die begin, nie die eerste sprong nie") },
        { s: L(`T0 → ${Array.from({ length: k }, (_, j) => `T${j + 1}`).join(" → ")}`, `T0 → ${Array.from({ length: k }, (_, j) => `T${j + 1}`).join(" → ")}`), r: L(`${k} periods after T0 is T${k}`, `${k} periodes ná T0 is T${k}`) },
      ],
    };
  },

  directionWord: () => mc(MOVE,
    L("Moving an amount to an <b>earlier</b> date means you are moving it…", "As jy 'n bedrag na 'n <b>vroeëre</b> datum skuif, skuif jy dit…"),
    L("backward — divide by (1 + i)", "agtertoe: deel deur (1 + i)"),
    [L("forward — multiply by (1 + i)", "vorentoe: vermenigvuldig met (1 + i)"), L("backward — multiply by (1 + i)", "agtertoe: vermenigvuldig met (1 + i)"), L("forward — divide by (1 + i)", "vorentoe: deel deur (1 + i)")],
    { hint: L("Earlier = backward = divide.", "Vroeër = agtertoe = deel."), answerLabel: L("Earlier → backward → divide", "Vroeër → agtertoe → deel") }),
};

export const questF4 = {
  id: "f4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id.startsWith("direction") ? MOVE : COUNT, gen })),
};
