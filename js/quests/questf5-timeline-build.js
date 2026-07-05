/* ============================================================
   FINANCE QUEST 5 · Timelines — building the move   ★
   Turning a move into maths: the sign of the exponent, the right
   expression, valuing at any point, and how rate changes split the
   timeline into one bracket per segment.
   ============================================================ */
import { mc, mcNum, C } from "./_shared.js";
import { randInt, pick } from "../ui.js";
import { toFrac, COMPOUNDING } from "../finlib.js";

const MOVE = "timelineMove";
const RATE = "rateChange";
const tl = (n, nodes, arc) => ({ type: "timeline", n, nodes, ...(arc ? { arc } : {}) });
const OPTS = COMPOUNDING.filter(c => [2, 4, 12].includes(c.k));

const SKILLS = {
  exponentForward: () => {
    const k = randInt(2, 5);
    return mc(MOVE,
      `Moving an amount <b>forward</b> from T0 to <b>T${k}</b>: what exponent goes on (1 + i)?`,
      `+${k}`,
      [`−${k}`, `${k - 1}`, `−${k - 1}`],
      { graph: tl(k, [{ t: 0, role: "P" }, { t: k, label: "?", role: "A" }], { from: 0, to: k }),
        hint: "Forward = positive exponent = the number of periods.", answerLabel: `exponent = +${k}` });
  },

  exponentBackward: () => {
    const a = randInt(0, 1), b = a + randInt(2, 4), d = b - a;
    return mc(MOVE,
      `Moving an amount <b>back</b> from T${b} to <b>T${a}</b>: what exponent goes on (1 + i)?`,
      `−${d}`,
      [`+${d}`, `−${d + 1}`, `+${d - 1}`],
      { graph: tl(b, [{ t: b, role: "A" }, { t: a, label: "?", role: "P" }], { from: b, to: a, dir: "back" }),
        hint: "Backward = negative exponent. Count the periods, then make it negative.", answerLabel: `exponent = −${d}` });
  },

  expression: () => {
    const k = randInt(2, 4), P = pick([1000, 2000, 5000]), iann = pick([8, 10, 12, 16]);
    const i = C(toFrac(iann));
    return mc(MOVE,
      `Which expression gives the value at <b>T${k}</b> of <b>R${P}</b> invested at T0 (i = ${i})?`,
      `${P}(1 + ${i})^${k}`,
      [`${P}(1 + ${i})^(−${k})`, `${P}(1 − ${i})^${k}`, `${P}(1 + ${i}·${k})`],
      { graph: tl(k, [{ t: 0, amount: P, dp: 0 }, { t: k, label: "?", role: "A" }], { from: 0, to: k }),
        hint: "Forward → multiply, positive exponent equal to the number of periods.", answerLabel: `${P}(1 + ${i})^${k}` });
  },

  anyPoint: () => ({
    type: "yesno", concept: MOVE,
    prompt: "R1 000 at T0 is worth R2 100,34 at T5. Moving <b>forward 4</b> from T0 and moving <b>back 1</b> from T5 give the <b>same</b> value at T4.",
    yes: true,
    graph: tl(5, [{ t: 0, amount: 1000, dp: 0 }, { t: 4, label: "?", role: "" }, { t: 5, amount: 2100.34, dp: 0 }]),   // dp 0: the full "R2 100,34" is wider than the engine's edge margin and gets clipped
    hint: "The same money has ONE value at each date, no matter which way you travel to it.",
    answerLabel: "True — both routes give the same value at T4",
  }),

  rateChangeBrackets: () => {
    const y1 = randInt(2, 4), y2 = randInt(2, 4);
    return {
      type: "mc", concept: RATE,
      prompt: `An amount grows at one rate for <b>${y1} years</b>, then a different rate for <b>${y2} years</b>. How many interest <b>brackets</b> will the expression have?`,
      options: mcNum(2, [1, 3, y1 + y2]),
      hint: "One bracket per segment of the timeline.",
      answerLabel: "2 brackets — one per rate segment",
    };
  },

  rateChangeSegment: () => {
    const o = pick(OPTS), yrs = randInt(2, 4), annual = pick([10, 12, 18]);
    const e = yrs * o.k;
    return {
      type: "mc", concept: RATE,
      prompt: `One segment: ${C(annual)}% p.a. compounded <b>${o.label}</b> for <b>${yrs} years</b>. The exponent on that bracket is…`,
      options: mcNum(e, [yrs, o.k, yrs + o.k, e + 1, e * 2]),   // backstops: when yrs = k, the first two collide AND yrs+k = yrs×k = e
      hint: "Exponent for the segment = years × times-per-year.",
      answerLabel: `${yrs} × ${o.k} = ${e}`,
    };
  },

  rateChangeExpr: () => {
    const o1 = pick(OPTS), o2 = pick(OPTS.filter(o => o.k !== o1.k));
    const y1 = randInt(2, 3), y2 = randInt(2, 4);
    const r1 = pick([10, 12, 18]), r2 = pick([8, 9, 15]);
    const i1 = C(toFrac(r1)), i2 = C(toFrac(r2));
    const P = pick([10000, 20000, 50000]);
    const Pd = P.toLocaleString("en-ZA").replace(/,/g, " ");
    const b1 = `(1 + ${i1}/${o1.k})^(${y1}×${o1.k})`;
    const b2 = `(1 + ${i2}/${o2.k})^(${y2}×${o2.k})`;
    return mc(RATE,
      `<b>R${Pd}</b> grows at ${C(r1)}% p.a. compounded <b>${o1.label}</b> for ${y1} years, then at ${C(r2)}% p.a. compounded <b>${o2.label}</b> for ${y2} years. Which expression gives its value at the end of the ${y1 + y2} years?`,
      `${P}${b1}${b2}`,
      [`${P}(1 + ${i1}/${o1.k})^(${y1 + y2}×${o1.k})`,
       `${P}${b1} + ${P}${b2}`,
       `${P}${b1}(1 + ${i2}/${o2.k})^(−${y2}×${o2.k})`],
      { graph: tl(y1 + y2, [{ t: 0, amount: P, dp: 0 }, { t: y1, label: "rate changes" }, { t: y1 + y2, label: "?", role: "A" }]),
        hint: "Split the timeline where the rate changes: ONE bracket per segment, multiplied together.",
        answerLabel: `${P}${b1}${b2}`,
        solution: [
          { s: `Segment 1: rate per period = ${i1}/${o1.k}, periods = ${y1}×${o1.k}` },
          { s: `Segment 2: rate per period = ${i2}/${o2.k}, periods = ${y2}×${o2.k}` },
          { s: `A = ${P}${b1}${b2}`, r: "one bracket per segment, multiplied — the money keeps moving forward" },
        ] });
  },
};

export const questF5 = {
  id: "f5",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id.startsWith("rateChange") ? RATE : MOVE, gen })),
};
