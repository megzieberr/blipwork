/* ============================================================
   FINANCE QUEST 5 · Timelines — building the move   ★
   Turning a move into maths: the sign of the exponent, the right
   expression, valuing at any point, and how rate changes split the
   timeline into one bracket per segment.
   ============================================================ */
import { mc, mcNum, C } from "./_shared.js";
import { randInt, pick } from "../ui.js";
import { toFrac, COMPOUNDING, compoundAmount, moveMoney, rand, pow } from "../finlib.js";
import { L } from "../lang.js";

const MOVE = "timelineMove";
const RATE = "rateChange";
const tl = (n, nodes, arc) => ({ type: "timeline", n, nodes, ...(arc ? { arc } : {}) });
const OPTS = COMPOUNDING.filter(c => [2, 4, 12].includes(c.k));
/* Fix A review (11 Oct): a money amount never splits at a line end. rand()
   groups thousands with an ordinary space, and formulaHtml (js/ui.js) wraps
   "R2" and "000" as two separate pieces with a breakable gap between them,
   so "R2" / "000" broke at 390 px. The newer rounds' treatment (f9/f10/f13):
   a LITERAL no-break space inside the amount (never the entity) AND one
   nowrap span around it, which formulaHtml never re-enters. rand() itself
   is left alone (other chapters read it). */
const NB = " ";
const nw = s => `<span class="nowrap">${s}</span>`;                    // ONE unbreakable unit
const rands = (v, dp = 0) => rand(v, dp).replace(/ /g, NB);            // "R2 000", "R2 100,34"
const money = (v, dp = 0, bold = false) => nw(bold ? `<b>${rands(v, dp)}</b>` : rands(v, dp));   // EVERY money amount in this round
const amt0 = v => rands(v, 0).slice(1);           // "1 000" — the way she writes P in an equation (no R on the left)
const term = (v, ...brackets) => nw(amt0(v) + brackets.join(""));     // "1 000(1 + 0,08)²": the amount and its brackets, one unit
const pa = r => nw(L(`${r}%${NB}p.a.`, `${r}%${NB}p.j.`));                                  // "12% p.a.", one unit
const HOW = o => o.label.replace(/-/g, "\u2011");                     // "semi‑annually (half‑yearly)": no-break hyphens (finlib's label is left alone)
/* two money values are "the same value" (float noise only) */
const agrees = (a, b) => Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(a));

const SKILLS = {
  exponentForward: () => {
    const k = randInt(2, 5);
    return mc(MOVE,
      L(`Moving an amount <b>forward</b> from T0 to <b>T${k}</b>: what exponent goes on (1 + i)?`, `'n Bedrag word <b>vorentoe</b> geskuif van T0 na <b>T${k}</b>: watter eksponent kom op (1 + i)?`),
      `+${k}`,
      [`−${k}`, `${k - 1}`, `−${k - 1}`],
      { graph: tl(k, [{ t: 0, role: "P" }, { t: k, label: "?", role: "A" }], { from: 0, to: k }),
        hint: L("Forward = positive exponent = the number of periods.", "Vorentoe = positiewe eksponent = die aantal periodes."), answerLabel: L(`exponent = +${k}`, `eksponent = +${k}`),
        solution: [
          { s: L(`From T0 to T${k} is ${k} periods`, `Van T0 tot T${k} is ${k} periodes`), r: L("count the jumps", "tel die spronge") },
          { s: L(`Forward means the money grows, so the exponent is positive: +${k}`, `Vorentoe beteken die geld groei, so die eksponent is positief: +${k}`), r: `× ${pow(L("(1 + i)", "(1 + i)"), k)}` },
        ] });
  },

  exponentBackward: () => {
    const a = randInt(0, 1), b = a + randInt(2, 4), d = b - a;
    return mc(MOVE,
      L(`Moving an amount <b>back</b> from T${b} to <b>T${a}</b>: what exponent goes on (1 + i)?`, `'n Bedrag word <b>terug</b> geskuif van T${b} na <b>T${a}</b>: watter eksponent kom op (1 + i)?`),
      `−${d}`,
      [`+${d}`, `−${d + 1}`, `+${d - 1}`],
      { graph: tl(b, [{ t: b, role: "A" }, { t: a, label: "?", role: "P" }], { from: b, to: a, dir: "back" }),
        hint: L("Backward = negative exponent. Count the periods, then make it negative.", "Agtertoe = negatiewe eksponent. Tel die periodes en maak dit dan negatief."), answerLabel: L(`exponent = −${d}`, `eksponent = −${d}`),
        solution: [
          { s: L(`From T${b} to T${a} is ${b} − ${a} = ${d} periods`, `Van T${b} na T${a} is ${b} − ${a} = ${d} periodes`), r: L("count the jumps", "tel die spronge") },
          { s: L(`Backward undoes the growth, so the exponent goes negative: −${d}`, `Agtertoe maak die groei ongedaan, so die eksponent word negatief: −${d}`), r: `× ${pow(L("(1 + i)", "(1 + i)"), `−${d}`)}` },
        ] });
  },

  expression: () => {
    const k = randInt(2, 4), P = pick([1000, 2000, 5000]), iann = pick([8, 10, 12, 16]);
    const i = C(toFrac(iann));
    const right = term(P, pow(`(1 + ${i})`, k));                      // "2 000(1 + 0,1)³", the thousands space as the prompt prints it
    return mc(MOVE,
      L(`Which expression gives the value at <b>T${k}</b> of ${money(P, 0, true)} invested at T0 (i = ${i})?`, `Watter uitdrukking gee die waarde by <b>T${k}</b> van ${money(P, 0, true)} wat by T0 belê is (i = ${i})?`),   // "R2 000", as its own timeline prints it (review fix 2026-08-23)
      right,
      [term(P, pow(`(1 + ${i})`, `−${k}`)), term(P, pow(`(1 − ${i})`, k)), term(P, `(1 + ${i}·${k})`)],
      { graph: tl(k, [{ t: 0, amount: P, dp: 0 }, { t: k, label: "?", role: "A" }], { from: 0, to: k }),
        hint: L("Forward → multiply, positive exponent equal to the number of periods.", "Vorentoe → vermenigvuldig, met 'n positiewe eksponent gelyk aan die aantal periodes."), answerLabel: right,
        solution: [
          { s: L(`T0 → T${k} is forward ${k} periods`, `T0 → T${k} is ${k} periodes vorentoe`), r: L("a later date, so the money grows", "'n latere datum, so die geld groei") },
          { s: L(`Forward → multiply by ${pow("(1 + i)", k)}, with i = ${i}`, `Vorentoe → vermenigvuldig met ${pow("(1 + i)", k)}, met i = ${i}`) },
          { s: L(`Value at T${k} = ${right}`, `Waarde by T${k} = ${right}`), r: L("one equation, built completely before anything is worked out", "een vergelyking, heeltemal opgebou voordat enigiets bereken word") },
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
    const steps = [
      { s: L(`Forward: ${term(P, pow(`(1 + ${iC})`, k))} = ${money(fwd, 2)}`, `Vorentoe: ${term(P, pow(`(1 + ${iC})`, k))} = ${money(fwd, 2)}`) },
      { s: L(`Back: ${term(P, pow(`(1 + ${iC})`, T), pow(`(1 + ${iC})`, `−${back}`))} = ${term(P, pow(`(1 + ${iC})`, k))}`, `Terug: ${term(P, pow(`(1 + ${iC})`, T), pow(`(1 + ${iC})`, `−${back}`))} = ${term(P, pow(`(1 + ${iC})`, k))}`),
        r: L(`${T} − ${back} = ${k}, so it is the same value: ${money(fwd, 2)}`, `${T} − ${back} = ${k}, so dit is dieselfde waarde: ${money(fwd, 2)}`) },
    ];
    if (claim === "plusExp") steps.push({ s: `A plus exponent gives ${money(wrongBack, 2)} — that is moving forward again.` });
    return {
      type: "yesno", concept: MOVE,
      prompt: claim === "plusExp"
        ? L(`${money(P)} at T0 is worth ${money(A, 2)} at T${T}. To move the T${T} amount <b>back</b> to T${k}, you multiply by ${pow("(1 + i)", `<b>+${back}</b>`)}.`, `${money(P)} by T0 is ${money(A, 2)} werd by T${T}. Om die bedrag by T${T} <b>terug</b> na T${k} te skuif, vermenigvuldig jy met ${pow("(1 + i)", `<b>+${back}</b>`)}.`)
        : L(`${money(P)} at T0 is worth ${money(A, 2)} at T${T}. Moving <b>forward ${k}</b> from T0 and moving <b>back ${back}</b> from T${T} give ${claim === "same" ? "the <b>same</b> value" : "<b>different</b> values"} at T${k}.`, `${money(P)} by T0 is ${money(A, 2)} werd by T${T}. <b>${k} vorentoe</b> skuif vanaf T0 en <b>${back} terug</b> skuif vanaf T${T} gee ${claim === "same" ? "<b>dieselfde</b> waarde" : "<b>verskillende</b> waardes"} by T${k}.`),
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
        ? L("Moving to an EARLIER date undoes the growth — the exponent goes negative.", "Skuif na 'n VROEËRE datum maak die groei ongedaan: die eksponent word negatief.")
        : L("The same money has ONE value at each date, no matter which way you travel to it.", "Dieselfde geld het EEN waarde op elke datum, van watter kant jy ook al daar aankom."),
      answerLabel: claim === "plusExp"
        ? L(`False — moving back to T${k} is ${pow("(1 + i)", `−${back}`)}`, `Onwaar: terugskuif na T${k} is ${pow("(1 + i)", `−${back}`)}`)
        : (claim === "same"
          ? L(`True — both routes give the same value at T${k}`, `Waar: albei roetes gee dieselfde waarde by T${k}`)
          : L(`False — both routes give the same value at T${k}: ${money(fwd, 2)}`, `Onwaar: albei roetes gee dieselfde waarde by T${k}: ${money(fwd, 2)}`)),
      solution: steps,
    };
  },

  rateChangeBrackets: () => {
    const y1 = randInt(2, 4), y2 = randInt(2, 4);
    return {
      type: "mc", concept: RATE,
      prompt: L(`An amount grows at one rate for <b>${y1} years</b>, then a different rate for <b>${y2} years</b>. How many interest <b>brackets</b> will the expression have?`, `'n Bedrag groei teen een koers vir <b>${y1} jaar</b>, dan teen 'n ander koers vir <b>${y2} jaar</b>. Hoeveel rente-<b>hakies</b> sal die uitdrukking hê?`),
      options: mcNum(2, [1, 3, y1 + y2]),
      hint: L("One bracket per segment of the timeline.", "Een hakie per segment van die tydlyn."),
      answerLabel: L("2 brackets — one per rate segment", "2 hakies: een per koerssegment"),
      solution: [
        { s: L(`The rate changes once, so the timeline splits into 2 segments: ${y1} years, then ${y2} years`, `Die koers verander een keer, so die tydlyn verdeel in 2 segmente: ${y1} jaar, dan ${y2} jaar`) },
        { s: L(`One bracket per segment → 2 brackets`, `Een hakie per segment → 2 hakies`), r: L("multiplied together, never added", "met mekaar vermenigvuldig, nooit bygetel nie") },
      ],
    };
  },

  rateChangeSegment: () => {
    const o = pick(OPTS), yrs = randInt(2, 4), annual = pick([10, 12, 18]);
    const e = yrs * o.k;
    return {
      type: "mc", concept: RATE,
      prompt: L(`One segment: ${pa(C(annual))} compounded <b>${HOW(o)}</b> for <b>${yrs} years</b>. The exponent on that bracket is…`, `Een segment: ${pa(C(annual))} <b>${HOW(o)}</b> saamgestel vir <b>${yrs} jaar</b>. Die eksponent op daardie hakie is…`),
      options: mcNum(e, [yrs, o.k, yrs + o.k, e + 1, e * 2]),   // backstops: when yrs = k, the first two collide AND yrs+k = yrs×k = e
      hint: L(`Exponent for the segment = years × ${nw("times‑per‑year")}.`, `Eksponent vir die segment = jare × ${nw("keer‑per‑jaar")}.`),
      answerLabel: `${yrs} × ${o.k} = ${e}`,
      solution: [
        { s: L(`Compounded ${HOW(o)} → interest is added ${o.k} times a year`, `Rente word ${HOW(o)} saamgestel → ${o.k} keer per jaar bygetel`) },
        { s: L(`Exponent = years × ${nw("times‑per‑year")} = ${yrs} × ${o.k} = ${e}`, `Eksponent = jare × ${nw("keer‑per‑jaar")} = ${yrs} × ${o.k} = ${e}`), r: L(`the ${C(annual)}% plays no part in the exponent`, `die ${C(annual)}% speel geen rol in die eksponent nie`) },
      ],
    };
  },

  rateChangeExpr: () => {
    const o1 = pick(OPTS), o2 = pick(OPTS.filter(o => o.k !== o1.k));
    const y1 = randInt(2, 3), y2 = randInt(2, 4);
    const r1 = pick([10, 12, 18]), r2 = pick([8, 9, 15]);
    const i1 = C(toFrac(r1)), i2 = C(toFrac(r2));
    const P = pick([10000, 20000, 50000]);
    const b1 = pow(`(1 + ${i1}/${o1.k})`, `${y1}×${o1.k}`);
    const b2 = pow(`(1 + ${i2}/${o2.k})`, `${y2}×${o2.k}`);
    const right = term(P, b1, b2);                                      // "20 000(…)(…)", the thousands space as the prompt prints it
    return mc(RATE,
      L(`${money(P, 0, true)} grows at ${pa(C(r1))} compounded <b>${HOW(o1)}</b> for ${y1} years, then at ${pa(C(r2))} compounded <b>${HOW(o2)}</b> for ${y2} years. Which expression gives its value at the end of the ${y1 + y2} years?`, `${money(P, 0, true)} groei teen ${pa(C(r1))} <b>${HOW(o1)}</b> saamgestel vir ${y1} jaar, dan teen ${pa(C(r2))} <b>${HOW(o2)}</b> saamgestel vir ${y2} jaar. Watter uitdrukking gee die waarde aan die einde van die ${y1 + y2} jaar?`),
      right,
      [term(P, pow(`(1 + ${i1}/${o1.k})`, `${y1 + y2}×${o1.k}`)),
       `${term(P, b1)} + ${term(P, b2)}`,
       term(P, b1, pow(`(1 + ${i2}/${o2.k})`, `−${y2}×${o2.k}`))],
      { graph: tl(y1 + y2, [{ t: 0, amount: P, dp: 0 }, { t: y1, label: "rate changes" }, { t: y1 + y2, label: "?", role: "A" }]),
        hint: L("Split the timeline where the rate changes: ONE bracket per segment, multiplied together.", "Verdeel die tydlyn waar die koers verander: EEN hakie per segment, met mekaar vermenigvuldig."),
        answerLabel: right,
        solution: [
          { s: L(`Segment 1: rate per period = ${i1}/${o1.k}, periods = ${y1}×${o1.k}`, `Segment 1: koers per periode = ${i1}/${o1.k}, periodes = ${y1}×${o1.k}`) },
          { s: L(`Segment 2: rate per period = ${i2}/${o2.k}, periods = ${y2}×${o2.k}`, `Segment 2: koers per periode = ${i2}/${o2.k}, periodes = ${y2}×${o2.k}`) },
          { s: L(`A = ${right}`, `A = ${right}`), r: L("one bracket per segment, multiplied — the money keeps moving forward", "een hakie per segment, vermenigvuldig: die geld skuif steeds vorentoe") },
        ] });
  },
};

export const questF5 = {
  id: "f5",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id.startsWith("rateChange") ? RATE : MOVE, gen })),
};
