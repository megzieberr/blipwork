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
    return mc("angleInclination", "Look at the angle of inclination θ. Is it <b>acute</b> or <b>obtuse</b>?",
      obtuse ? "obtuse (between 90° and 180°)" : "acute (between 0° and 90°)",
      [obtuse ? "acute (between 0° and 90°)" : "obtuse (between 90° and 180°)", "exactly 90°"],
      { graph: d.spec,
        hint: "Positive gradient (line rises) → acute. Negative gradient (line falls) → obtuse.",
        answerLabel: `${obtuse ? "Negative" : "Positive"} gradient → θ is ${obtuse ? "obtuse" : "acute"}.` });
  },

  /* which calculation when the gradient is negative */
  addRule: () => {
    const c = inclinationCase({ negative: true });
    return mc("angleInclination",
      `A line has a <b>negative</b> gradient. To find its angle of inclination θ you calculate…`,
      "θ = 180° − tan⁻¹(|m|)",
      ["θ = tan⁻¹(m)", "θ = tan⁻¹(|m|)", "θ = 90° + tan⁻¹(m)"],
      { hint: "A falling line is obtuse. Find the acute reference angle from the SIZE of m, then subtract from 180°.",
        answerLabel: "θ = 180° − tan⁻¹(|m|) — obtuse." });
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
      `The line has gradient <b>${gradFrac(c.dy, c.dx).str}</b>. Its angle of inclination θ is…`,
      correct, decoys,
      { graph: d.spec,
        hint: negative
          ? "Negative gradient → obtuse. ref = tan⁻¹(|m|), then θ = 180° − ref."
          : "Positive gradient → acute. θ = tan⁻¹(m) straight off.",
        answerLabel: `θ = ${correct}.` });
  },

  /* don't type the negative into the calculator */
  dontTypeNeg: () => {
    return yesnoQ("angleInclination",
      "To get the reference angle, should you type the <b>negative</b> gradient straight into tan⁻¹ on your calculator?",
      false,
      { hint: "Typing a negative gives a negative angle. Use the SIZE of the gradient (drop the sign), then do 180° − that.",
        answerLabel: "No — drop the sign, find tan⁻¹(|m|), then 180° − it." });
  },

  /* the basic connection */
  tanTheta: () => {
    return mc("angleInclination",
      "The angle of inclination θ is linked to the gradient m by…",
      "tan θ = m",
      ["sin θ = m", "θ = m", "cos θ = m"],
      { hint: "Build a right triangle under the line: tan θ = opposite/adjacent = rise/run = m.",
        answerLabel: "tan θ = m." });
  },

  /* clean exact values 45° / 135° */
  cleanValue: () => {
    const negative = pick([true, false]);
    const c = inclinationCase({ negative });
    // force one of the exact pairs
    const ex = negative ? { dy: -1, dx: 1, theta: 135 } : { dy: 1, dx: 1, theta: 45 };
    const d = inclinationDiagram(ex.dy, ex.dx, { accent: ACC });
    return mc("angleInclination",
      `The line has gradient <b>${ex.dy < 0 ? "−1" : "1"}</b>. Its angle of inclination is…`,
      deg0(ex.theta),
      negative ? [deg0(45), negDeg0(45), deg0(90)] : [deg0(135), deg0(90), deg0(60)],
      { graph: d.spec,
        hint: ex.dy < 0 ? "m = −1 is negative → obtuse → 180° − 45°." : "m = 1 → tan⁻¹(1) = 45°.",
        answerLabel: `θ = ${deg0(ex.theta)}.` });
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
      "Which line has an <b>obtuse</b> angle of inclination (more than 90°)?",
      `Line ${letter.obtuse}`, [`Line ${letter.acute}`],
      { graph,
        hint: "Obtuse inclination ⇔ the line falls left → right (negative gradient).",
        answerLabel: `Line ${letter.obtuse} — the falling (negative-gradient) line has the obtuse angle.` });
  },
};

function dirOf(c) { let x = c.dx, y = c.dy; if (y < 0) { x = -x; y = -y; } return { x, y }; }

export const questAg4 = {
  id: "ag4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "angleInclination", gen })),
};
