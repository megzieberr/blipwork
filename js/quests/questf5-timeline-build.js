/* ============================================================
   FINANCE QUEST 5 · Timelines — building the move   ★
   Turning a move into maths: the sign of the exponent, the right
   expression, valuing at any point, and how rate changes split the
   timeline into one bracket per segment.
   ============================================================ */
import { mc, mcNum, C } from "./_shared.js";
import { randInt, pick } from "../ui.js";
import { toFrac, COMPOUNDING, compoundAmount, moveMoney, rand } from "../finlib.js";

const MOVE = "timelineMove";
const RATE = "rateChange";
const tl = (n, nodes, arc) => ({ type: "timeline", n, nodes, ...(arc ? { arc } : {}) });
const OPTS = COMPOUNDING.filter(c => [2, 4, 12].includes(c.k));
const amt0 = v => rand(v, 0).slice(1);            // "1 000" — the way she writes P in an equation (no R on the left)
/* two money values are "the same value" (float noise only) */
const agrees = (a, b) => Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(a));

const SKILLS = {
  exponentForward: () => {
    const k = randInt(2, 5);
    return mc(MOVE,
      `Moving an amount <b>forward</b> from T0 to <b>T${k}</b>: what exponent goes on (1 + i)?`,
      `+${k}`,
      [`−${k}`, `${k - 1}`, `−${k - 1}`],
      { graph: tl(k, [{ t: 0, role: "P" }, { t: k, label: "?", role: "A" }], { from: 0, to: k }),
        hint: "Forward = positive exponent = the number of periods.", answerLabel: `exponent = +${k}`,
        solution: [
          { s: `From T0 to T${k} is ${k} periods`, r: "count the jumps" },
          { s: `Forward means the money grows, so the exponent is positive: +${k}`, r: `× (1 + i)^${k}` },
        ] });
  },

  exponentBackward: () => {
    const a = randInt(0, 1), b = a + randInt(2, 4), d = b - a;
    return mc(MOVE,
      `Moving an amount <b>back</b> from T${b} to <b>T${a}</b>: what exponent goes on (1 + i)?`,
      `−${d}`,
      [`+${d}`, `−${d + 1}`, `+${d - 1}`],
      { graph: tl(b, [{ t: b, role: "A" }, { t: a, label: "?", role: "P" }], { from: b, to: a, dir: "back" }),
        hint: "Backward = negative exponent. Count the periods, then make it negative.", answerLabel: `exponent = −${d}`,
        solution: [
          { s: `From T${b} to T${a} is ${b} − ${a} = ${d} periods`, r: "count the jumps" },
          { s: `Backward undoes the growth, so the exponent goes negative: −${d}`, r: `× (1 + i)^(−${d})` },
        ] });
  },

  expression: () => {
    const k = randInt(2, 4), P = pick([1000, 2000, 5000]), iann = pick([8, 10, 12, 16]);
    const i = C(toFrac(iann));
    return mc(MOVE,
      `Which expression gives the value at <b>T${k}</b> of <b>${rand(P, 0)}</b> invested at T0 (i = ${i})?`,   // "R2 000", as its own timeline prints it (review fix 2026-08-23)
      `${P}(1 + ${i})^${k}`,
      [`${P}(1 + ${i})^(−${k})`, `${P}(1 − ${i})^${k}`, `${P}(1 + ${i}·${k})`],
      { graph: tl(k, [{ t: 0, amount: P, dp: 0 }, { t: k, label: "?", role: "A" }], { from: 0, to: k }),
        hint: "Forward → multiply, positive exponent equal to the number of periods.", answerLabel: `${P}(1 + ${i})^${k}`,
        solution: [
          { s: `T0 → T${k} is forward ${k} periods`, r: "a later date, so the money grows" },
          { s: `Forward → multiply by (1 + i)^${k}, with i = ${i}` },
          { s: `Value at T${k} = ${P}(1 + ${i})^${k}`, r: "one equation, built completely before anything is worked out" },
        ] });
  },

  /* One value per date, whichever way you travel to it. Generalised from
     the original hardcoded "R1 000 → R2 100,34 at T5, always true"
     version (DICE-AUDIT §3's single CARE skill) on 2026-08-23: P, the
     rate, T and the middle point k all roll, and `yes` is COMPUTED from
     the two routes every time — about one roll in three states a claim
     that is genuinely false, built on a real misconception (the two
     routes "disagree", or moving back written with a plus exponent).
     Solutions follow FINANCE-METHOD.md: one equation per route, nothing
     rounded before the final value. */
  anyPoint: () => {
    const P = pick([1000, 2000, 5000, 8000]);
    const annual = pick([8, 10, 12, 16]);            // the same rate bank `expression` above uses
    const T = randInt(4, 6), k = randInt(1, T - 1);
    const i = toFrac(annual), iC = C(i), back = T - k;
    const A = compoundAmount(P, i, T);               // the value at T stated in the prompt
    const fwd = compoundAmount(P, i, k);             // route 1: forward k from T0
    const bck = moveMoney(A, i, -back);              // route 2: back (T−k) from T
    const wrongBack = moveMoney(A, i, back);         // the misconception: back written with a PLUS exponent
    const claim = pick(["same", "same", "same", "same", "different", "plusExp"]);   // ⅓ of rolls are false
    const p0 = amt0(P);
    const steps = [
      { s: `Forward: ${p0}(1 + ${iC})^${k} = ${rand(fwd, 2)}` },
      { s: `Back: ${p0}(1 + ${iC})^${T}(1 + ${iC})^−${back} = ${p0}(1 + ${iC})^${k}`,
        r: `${T} − ${back} = ${k}, so it is the same value: ${rand(fwd, 2)}` },
    ];
    if (claim === "plusExp") steps.push({ s: `A plus exponent gives ${rand(wrongBack, 2)} — that is moving forward again.` });
    return {
      type: "yesno", concept: MOVE,
      prompt: claim === "plusExp"
        ? `${rand(P, 0)} at T0 is worth ${rand(A, 2)} at T${T}. To move the T${T} amount <b>back</b> to T${k}, you multiply by (1 + i)^<b>+${back}</b>.`
        : `${rand(P, 0)} at T0 is worth ${rand(A, 2)} at T${T}. Moving <b>forward ${k}</b> from T0 and moving <b>back ${back}</b> from T${T} give ${claim === "same" ? "the <b>same</b> value" : "<b>different</b> values"} at T${k}.`,
      /* honestly computed every roll — never a fixed true */
      yes: claim === "plusExp" ? agrees(wrongBack, fwd) : (claim === "same" ? agrees(fwd, bck) : !agrees(fwd, bck)),
      /* The T-node carries the SAME 2 dp the prompt states (the old hardcoded
         version showed a dp-0 "R2 100" under a prompt that said R2 100,34).
         The engine clamps a wide end-label inwards rather than clipping it —
         verify-finance.html measures every rolled label's real box and fails
         if one leaves the frame or drifts off its own node, and the widest
         amount this skill can roll (R8 000 at 16% over 6) was read at 375 px
         in the PNG review. */
      graph: tl(T, [{ t: 0, amount: P, dp: 0 }, { t: k, label: "?", role: "" }, { t: T, amount: A, dp: 2 }]),
      hint: claim === "plusExp"
        ? "Moving to an EARLIER date undoes the growth — the exponent goes negative."
        : "The same money has ONE value at each date, no matter which way you travel to it.",
      answerLabel: claim === "plusExp"
        ? `False — moving back to T${k} is (1 + i)^−${back}`
        : (claim === "same"
          ? `True — both routes give the same value at T${k}`
          : `False — both routes give the same value at T${k}: ${rand(fwd, 2)}`),
      solution: steps,
    };
  },

  rateChangeBrackets: () => {
    const y1 = randInt(2, 4), y2 = randInt(2, 4);
    return {
      type: "mc", concept: RATE,
      prompt: `An amount grows at one rate for <b>${y1} years</b>, then a different rate for <b>${y2} years</b>. How many interest <b>brackets</b> will the expression have?`,
      options: mcNum(2, [1, 3, y1 + y2]),
      hint: "One bracket per segment of the timeline.",
      answerLabel: "2 brackets — one per rate segment",
      solution: [
        { s: `The rate changes once, so the timeline splits into 2 segments: ${y1} years, then ${y2} years` },
        { s: `One bracket per segment → 2 brackets`, r: "multiplied together, never added" },
      ],
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
      solution: [
        { s: `Compounded ${o.label} → interest is added ${o.k} times a year` },
        { s: `Exponent = years × times-per-year = ${yrs} × ${o.k} = ${e}`, r: `the ${C(annual)}% plays no part in the exponent` },
      ],
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
