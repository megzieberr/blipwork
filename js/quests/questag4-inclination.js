/* ============================================================
   ANALYTICAL GEOMETRY · Q4 — Angle of inclination  ★★ TRAP
   ------------------------------------------------------------
   tan θ = m, measured anti-clockwise from the positive x-axis.
   The exam traps, drilled hard:
     • positive gradient → ACUTE θ = tan⁻¹(m)
     • negative gradient → OBTUSE θ = 180° − tan⁻¹(|m|)
     • DON'T type the negative gradient into the calculator.
   The arc in every diagram is drawn to the line's REAL slope.
   ============================================================ */
import { mc } from "./_shared.js";
import { yesnoQ, inclinationDiagram, winFor, letterLines, AG } from "./_analytical.js";
import { inclinationCase, gradFrac, neg, Cdp, pick } from "../analyticslib.js";
import { L } from "../lang.js";

const ACC = AG[3];
const degStr = (v) => neg(Cdp(v, 2)) + "°";
const deg0 = (v) => neg(Cdp(v, 0)) + "°";
const negDeg = (v) => "−" + Cdp(Math.abs(v), 2) + "°";    // a deliberately-wrong negative angle
const negDeg0 = (v) => "−" + Cdp(Math.abs(v), 0) + "°";

const SKILLS = {
  /* read acute vs obtuse off a to-scale diagram */
  acuteObtuse: () => {
    const c = inclinationCase();
    const d = inclinationDiagram(c.dy, c.dx, { accent: ACC });
    const obtuse = c.m < 0;
    return mc("angleInclination", L("Look at the angle of inclination θ. Is it <b>acute</b> or <b>obtuse</b>?", "Kyk na die inklinasiehoek θ. Is dit <b>skerp</b> of <b>stomp</b>?"),
      obtuse ? L("obtuse (between 90° and 180°)", "stomp (tussen 90° en 180°)") : L("acute (between 0° and 90°)", "skerp (tussen 0° en 90°)"),
      [obtuse ? L("acute (between 0° and 90°)", "skerp (tussen 0° en 90°)") : L("obtuse (between 90° and 180°)", "stomp (tussen 90° en 180°)"), L("exactly 90°", "presies 90°")],
      { graph: d.spec,
        hint: L("Positive gradient (line rises) → acute. Negative gradient (line falls) → obtuse.", "Positiewe gradiënt (lyn styg) → skerp. Negatiewe gradiënt (lyn daal) → stomp."),
        answerLabel: L(`${obtuse ? "Negative" : "Positive"} gradient → θ is ${obtuse ? "obtuse" : "acute"}.`, `${obtuse ? "Negatiewe" : "Positiewe"} gradiënt → θ is ${obtuse ? "stomp" : "skerp"}.`) });
  },

  /* which calculation when the gradient is negative */
  addRule: () => {
    const c = inclinationCase({ negative: true });
    return mc("angleInclination",
      L(`A line has a <b>negative</b> gradient. To find its angle of inclination θ, what do you do?`, `'n Lyn het 'n <b>negatiewe</b> gradiënt. Wat doen jy om sy inklinasiehoek θ te kry?`),
      L("SHIFT tan the gradient <b>without</b> its minus, then 180° − that answer", "SHIFT tan die gradiënt <b>sonder</b> sy minus, dan 180° − daardie antwoord"),
      [L("SHIFT tan the gradient <b>with</b> its minus in, and take that answer", "SHIFT tan die gradiënt <b>met</b> sy minus in, en neem daardie antwoord"),
       L("SHIFT tan the gradient <b>without</b> its minus, and stop there", "SHIFT tan die gradiënt <b>sonder</b> sy minus, en stop daar"),
       L("SHIFT tan the gradient, then <b>add</b> that answer to 90°", "SHIFT tan die gradiënt, en <b>tel</b> daardie antwoord by 90°")],
      { hint: L("A falling line is obtuse. Find the acute reference angle from the SIZE of m, then subtract from 180°.", "'n Dalende lyn is stomp. Kry die skerp verwysingshoek uit die GROOTTE van m, en trek dit dan van 180° af."),
        answerLabel: L("Drop the minus, SHIFT tan the size of the gradient, then 180° − that. θ is obtuse.", "Laat die minus weg, SHIFT tan die grootte van die gradiënt, dan 180° − dit. θ is stomp.") });
  },

  /* pick the correct θ value (drills 180− and the negative-sign trap) */
  value: () => {
    const negative = pick([true, false]);
    const c = inclinationCase({ negative });
    const d = inclinationDiagram(c.dy, c.dx, { accent: ACC });
    const correct = degStr(c.theta);
    const decoys = negative
      ? [degStr(c.ref), negDeg(c.ref), degStr(90 - c.ref)]            // forgot 180−, typed negative, wrong ratio
      : [degStr(180 - c.ref), degStr(90 - c.ref), negDeg(c.ref)];
    return mc("angleInclination",
      L(`The line has gradient <b>${gradFrac(c.dy, c.dx).str}</b>. Its angle of inclination θ is…`, `Die lyn het gradiënt <b>${gradFrac(c.dy, c.dx).str}</b>. Sy inklinasiehoek θ is…`),
      correct, decoys,
      { graph: d.spec,
        hint: negative
          ? L("Negative gradient → obtuse. Drop the minus, SHIFT tan the size of the gradient for the reference angle, then θ = 180° − that.", "Negatiewe gradiënt → stomp. Laat die minus weg, SHIFT tan die grootte van die gradiënt vir die verwysingshoek, dan θ = 180° − dit.")
          : L("Positive gradient → acute. SHIFT tan the gradient and that IS θ, straight off.", "Positiewe gradiënt → skerp. SHIFT tan die gradiënt en dit IS θ, net so."),
        answerLabel: L(`θ = ${correct}.`, `θ = ${correct}.`) });
  },

  /* don't type the negative into the calculator */
  dontTypeNeg: () => {
    return yesnoQ("angleInclination",
      L("To get the reference angle, should you SHIFT tan the <b>negative</b> gradient exactly as it is, minus sign and all?", "Om die verwysingshoek te kry: moet jy die <b>negatiewe</b> gradiënt net so SHIFT tan, minusteken en al?"),
      false,
      { hint: L("Typing a negative gives a negative angle. Use the SIZE of the gradient (drop the sign), then do 180° − that.", "As jy 'n negatief intik, kry jy 'n negatiewe hoek. Gebruik die GROOTTE van die gradiënt (laat die teken weg), en doen dan 180° − dit."),
        answerLabel: L("No — drop the sign, SHIFT tan the size of the gradient, then 180° − that.", "Nee: laat die teken weg, SHIFT tan die grootte van die gradiënt, dan 180° − dit.") });
  },

  /* the basic connection */
  tanTheta: () => {
    return mc("angleInclination",
      L("The angle of inclination θ is linked to the gradient m by…", "Die inklinasiehoek θ is aan die gradiënt m gekoppel deur…"),
      L("tan θ = m", "tan θ = m"),
      [L("sin θ = m", "sin θ = m"), L("θ = m", "θ = m"), L("cos θ = m", "cos θ = m")],
      { hint: L("Build a right triangle under the line: tan θ = opposite/adjacent = rise/run = m.", "Bou 'n reghoekige driehoek onder die lyn: tan θ = teenoorstaande/aangrensende = styging/loop = m."),
        answerLabel: L("tan θ = m.", "tan θ = m.") });
  },

  /* clean exact values 45° / 135° */
  cleanValue: () => {
    const negative = pick([true, false]);
    // one of the exact pairs
    const ex = negative ? { dy: -1, dx: 1, theta: 135 } : { dy: 1, dx: 1, theta: 45 };
    const d = inclinationDiagram(ex.dy, ex.dx, { accent: ACC });
    return mc("angleInclination",
      L(`The line has gradient <b>${ex.dy < 0 ? "−1" : "1"}</b>. Its angle of inclination is…`, `Die lyn het gradiënt <b>${ex.dy < 0 ? "−1" : "1"}</b>. Sy inklinasiehoek is…`),
      deg0(ex.theta),
      negative ? [deg0(45), negDeg0(45), deg0(90)] : [deg0(135), deg0(90), deg0(60)],
      { graph: d.spec,
        hint: ex.dy < 0 ? L("m = −1 is negative → obtuse → 180° − 45°.", "m = −1 is negatief → stomp → 180° − 45°.") : L("m = 1 → SHIFT tan (1) = 45°.", "m = 1 → SHIFT tan (1) = 45°."),
        answerLabel: L(`θ = ${deg0(ex.theta)}.`, `θ = ${deg0(ex.theta)}.`) });
  },

  /* which lettered line has an obtuse angle of inclination (pick A or B) */
  whichObtuse: () => {
    const up = inclinationCase({ negative: false }), down = inclinationCase({ negative: true });
    const d1 = dirOf(up), d2 = dirOf(down), k = 4;
    const segs = [
      { a: { x: -d1.x * k, y: -d1.y * k }, b: { x: d1.x * k, y: d1.y * k }, kind: "line", id: "acute", tone: "a" },
      { a: { x: -d2.x * k, y: -d2.y * k }, b: { x: d2.x * k, y: d2.y * k }, kind: "line", id: "obtuse", tone: "b" },
    ];
    const letter = letterLines(segs, ["A", "B"]);
    const graph = {
      type: "analytic", accent: ACC, grid: true,
      win: winFor(segs.flatMap((s) => [s.a, s.b]), { min: 9 }),
      segs, points: [{ x: 0, y: 0 }],
    };
    return mc("angleInclination",
      L("Which line has an <b>obtuse</b> angle of inclination (more than 90°)?", "Watter lyn het 'n <b>stomp</b> inklinasiehoek (meer as 90°)?"),
      L(`Line ${letter.obtuse}`, `Lyn ${letter.obtuse}`), [L(`Line ${letter.acute}`, `Lyn ${letter.acute}`)],
      { graph,
        hint: L("Obtuse inclination ⇔ the line falls left → right (negative gradient).", "Stomp inklinasiehoek ⇔ die lyn daal van links → regs (negatiewe gradiënt)."),
        answerLabel: L(`Line ${letter.obtuse} — the falling (negative-gradient) line has the obtuse angle.`, `Lyn ${letter.obtuse}: die dalende lyn (negatiewe gradiënt) het die stomp hoek.`) });
  },
};

function dirOf(c) { let x = c.dx, y = c.dy; if (y < 0) { x = -x; y = -y; } return { x, y }; }

export const questAg4 = {
  id: "ag4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "angleInclination", gen })),
};
