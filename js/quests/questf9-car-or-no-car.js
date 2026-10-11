/* ============================================================
   FINANCE QUEST 9 · Car or no car?   ★
   ------------------------------------------------------------
   FINANCE-ROUNDS-2-PLAN.md, round f9 (built 2026-10-10). Once a
   timeline holds two or three amounts, every amount is moved to ONE
   T, the MEETING DAY (the flag on the line). A "car" is the bracket
   (1 + i)^n that moves an amount there: forward gear (a later date,
   ×, positive exponent), reverse gear (an earlier date, ÷, negative
   exponent). An amount already standing on the meeting day needs NO
   car, and an amount that crosses a rate change (the ROAD changes
   colour) needs one car per road.

   EVERY CARD shows a timeline with the flagged meeting day, one or two
   coloured rate roads, 2 or 3 payments, and the total as "?" with its
   role letter (A at the end for saving, P at T0 for a loan). Engine:
   js/engine/timeline-graph.js (spec.meet, spec.roads, spec.leaders; the
   "?" total draws in the accent colour inside a ring).

   HER RULINGS (2026-10-10, after she played f8):
     · the total is NEVER a bare money label: it is "?" with its role
       letter, the f5 way, so it is visibly a different kind of thing
       from a payment;
     · a payment MAY share the total's day (the last deposit made on the
       day of A, a real exam shape). It is then stacked ABOVE the "?",
       so the role letter sits right under the total's own label
       (verifyTimeline checks this), and with the meeting day at the end
       it needs no car. Loans never get a repayment on T0.
   About one card in three of the needsCar / gear / carCount cards puts
   the named amount ON the meeting day, and in some of those the meeting
   day is the total's own day.

   VOCABULARY: "the total" only (no lumpsum), "meeting day", "car",
   "forward gear" / "reverse gear", "road". Never "lump sum",
   "accumulated amount", LHS/RHS. Pronouns only, no first names.

   A static round deals def.skills IN ORDER, one card per skill, so the
   ROUND list at the bottom IS the round (8 cards).
   ============================================================ */
import { mc, mcNum, C, rng } from "./_shared.js";
import { randInt, pick, shuffled } from "../ui.js";
import { rand, toFrac, COMPOUNDING, pow } from "../finlib.js";

const CAR = "carOrNoCar";
export const REFRAIN = "A car only if it has to move. Already there? No car.";

const RATES = [6, 7, 8, 9, 10, 11, 12, 14, 15];                       // whole % only
const KS = COMPOUNDING.filter(c => [1, 2, 4, 12].includes(c.k)).map(c => c.k);
const HOW = k => (k === 2 ? "half‑yearly" : COMPOUNDING.find(c => c.k === k).label);   // a non-breaking hyphen (Fix A review, as f10)
const SAVE_AMTS = [1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000];
const REPAY_AMTS = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7500];
/* every amount stays under R100 000 (7 glyphs at most), n ≤ 6: two labels
   on neighbouring T's never touch at 360 px (the f8 measurement) */

const NB = " ";
/* ONE unbreakable unit (f9 review 1, 2026-10-10). A no-break space alone
   did not hold: js/ui.js formulaHtml wraps "R2" and "000" in separate
   inline-blocks, and at 360 px the line broke between them ("R2" / "000",
   "3" / "000(1 + …"). It never re-enters a class="nowrap" span
   (isProtectedOpenTag), so nothing inside one can break. */
const nw = s => `<span class="nowrap">${s}</span>`;
const rands = v => rand(v, 0).replace(/ /g, NB);                       // "R8 000"
/* EVERY money amount in this round goes through here; bold for the named
   amount in a prompt (the <b>R…</b> stays whole inside the span, the way
   _finance-check's f9Scene reads it) */
const money = (v, bold = false) => nw(bold ? `<b>${rands(v)}</b>` : rands(v));
const amt0 = v => rand(v, 0).slice(1).replace(/ /g, NB);               // "8 000", as it stands in an equation
const pa = r => `${r}%${NB}p.a.`;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, j) => lo + j);
const yrs = y => `${y} year${y === 1 ? "" : "s"}`;
const person = () => pick([{ he: "she", his: "her" }, { he: "he", his: "his" }]);

/* ---------- the scene: a story, its roads, its payments, the total ---------- */

/* two: a rate change (two roads) or one road. sameDay: a saving story whose
   last deposit sits on the day of A. Each road is at least 2 years long, so
   its rate text fits under it. */
function rollScene(two, sameDay = false) {
  const saving = sameDay || rng() < 0.5;
  const n = randInt(4, 6);
  const c = two ? randInt(2, n - 2) : null;
  const r1 = pick(RATES), r2 = pick(RATES.filter(r => r !== r1));
  const roads = two
    ? [{ from: 0, to: c, r: r1, k: pick(KS) }, { from: c, to: n, r: r2, k: pick(KS) }]
    : [{ from: 0, to: n, r: r1, k: pick(KS) }];
  const total = { t: saving ? n : 0, role: saving ? "A" : "P" };
  const cnt = randInt(2, 3);
  /* saving: deposits from T0 to T(n−1), plus (sometimes) one ON the day of A;
     a loan: repayments from T1 to Tn, never on T0 (the day of the loan) */
  const share = saving && (sameDay || rng() < 0.25);
  const times = saving
    ? [...shuffled(range(0, n - 1)).slice(0, share ? cnt - 1 : cnt), ...(share ? [n] : [])]
    : shuffled(range(1, n)).slice(0, cnt);
  times.sort((a, b) => a - b);
  const vals = shuffled(saving ? SAVE_AMTS : REPAY_AMTS).slice(0, cnt);
  return { saving, n, roads, total, pays: times.map((t, j) => ({ t, v: vals[j] })), p: person() };
}

/* the hand-checked fallback scene (a roll loop below can, in theory, miss):
   saving, 8% quarterly to T3, then 10% monthly; deposits R5 000 at T1,
   R3 000 at T4 and R2 000 on the day of A (T6) */
const FIX_SCENE = () => ({
  saving: true, n: 6, p: { he: "she", his: "her" }, total: { t: 6, role: "A" },
  roads: [{ from: 0, to: 3, r: 8, k: 4 }, { from: 3, to: 6, r: 10, k: 12 }],
  pays: [{ t: 1, v: 5000 }, { t: 4, v: 3000 }, { t: 6, v: 2000 }],
});

/* the timeline: the total FIRST, so on a shared day it is the bottom label
   of the stack, right above its role letter */
const graphOf = (sc, meet) => ({
  type: "timeline", n: sc.n, meet,
  nodes: [{ t: sc.total.t, label: "?", role: sc.total.role }, ...sc.pays.map(p => ({ t: p.t, amount: p.v, dp: 0 }))],
  roads: sc.roads.map(r => ({ from: r.from, to: r.to, rate: `${r.r}% p.a.`, k: r.k })),
  leaders: true,                                   // a thin line from each lone amount down to its own T
});
const CAPTION = "T in years";

function story(sc) {
  const [r0, r1] = sc.roads, { p } = sc;
  const rate = `${pa(r0.r)} compounded ${HOW(r0.k)}${r1 ? `; from T${r1.from} the rate is ${pa(r1.r)} compounded ${HOW(r1.k)}` : ""}`;
  return sc.saving
    ? `${cap(p.he)} saves at ${rate}. ${cap(p.his)} deposits grow into the total, A.`
    : `${cap(p.he)} borrows the total, P, at ${rate}, and pays it back in parts.`;
}

/* ---------- the trip: gear, and one leg per road driven over ---------- */

/* legs come in TRAVEL order (reverse gear meets the later road first) */
function trip(sc, at, meet) {
  const dir = Math.sign(meet - at), lo = Math.min(at, meet), hi = Math.max(at, meet);
  let legs = sc.roads
    .map(r => ({ r: r.r, k: r.k, years: Math.min(hi, r.to) - Math.max(lo, r.from) }))
    .filter(l => l.years > 0);
  if (dir < 0) legs = legs.reverse();
  legs.forEach(l => { l.exp = dir * l.years * l.k; });
  return { dir, legs };
}
/* one car: (1 + 0,08/4)^(3×4), reverse (1 + 0,08/4)^(−3×4); annual (1 + 0,08)^3 / ^(−3).
   Fix A (11 Oct): drawn as a real superscript through finlib's pow(); the
   teaching form 3×4 stays inside the sup (her ruling) */
function bracket(l) {
  const i = C(toFrac(l.r)), m = l.exp < 0 ? "−" : "";
  return l.k === 1 ? pow(`(1 + ${i})`, `${m}${l.years}`) : pow(`(1 + ${i}/${l.k})`, `${m}${l.years}×${l.k}`);
}
/* an amount and its car(s). Each TERM is one unbreakable unit: the amount
   rides with its first car, a second car is a unit of its own, and the
   plain space between them is the only place the line may break */
const term = (v, legs) => [nw(amt0(v) + (legs.length ? bracket(legs[0]) : "")), ...legs.slice(1).map(l => nw(bracket(l)))].join(" ");
const roadName = l => `the ${l.r}% road`;
const gearOf = dir => (dir > 0 ? "forward gear" : "reverse gear");
const expText = l => `${l.exp < 0 ? "−" : ""}${l.years} × ${l.k} = ${C(l.exp)}`;

/* the worked solution, in the ONE-equation spirit: what moves, which gear,
   which road(s), the exponent, and the amount's own piece of the equation.
   quiet: the road whose exponent the card's "Answer:" line already shows
   (the exponent cards), so that line is not said twice. */
function carSolution(sc, a, meet, quiet = null) {
  const tr = trip(sc, a.t, meet);
  const out = [{ s: `The meeting day is T${meet}. The ${money(a.v)} stands at T${a.t}.`, r: tr.dir === 0 ? "it is already there" : "it has to move" }];
  if (tr.dir === 0) {
    out.push({ s: `No car: in the one equation it is just ${nw(amt0(a.v))}, with no bracket.`, r: "it does not move" });
  } else {
    out.push({ s: `${cap(gearOf(tr.dir))}: T${meet} is ${tr.dir > 0 ? "later" : "earlier"}, so ${tr.dir > 0 ? "multiply (×)" : "divide (÷)"}.`,
      r: tr.dir > 0 ? "a positive exponent" : "a negative exponent" });
    tr.legs.forEach((l, j) => out.push({
      s: `${tr.legs.length > 1 ? (j === 0 ? "Car 1, " : "Car 2, ") : ""}${roadName(l)}: ${yrs(l.years)} compounded ${HOW(l.k)}`,
      ...(quiet === l.r ? {} : { r: `exponent ${expText(l)}` }) }));
    out.push({ s: `Its piece of the one equation: ${term(a.v, tr.legs)}`, r: tr.legs.length > 1 ? "one car per road" : "one road, one car" });
  }
  out.push({ s: REFRAIN });
  return out;
}

/* deal one card: roll a scene, name a payment, set the meeting day.
   onDay: the named payment stands ON the meeting day (4 in 10 of those use
   the total's own day: the last deposit on the day of A). Otherwise the
   meeting day is the total's day half the time, any other T the rest.
   want(tr) filters the trip; fix = [payment index, meeting day] in
   FIX_SCENE, a hand-checked card that satisfies the same want. */
function deal({ two, onDay, want = () => true, fix }) {
  for (let tries = 0; tries < 400; tries++) {
    const same = onDay && rng() < 0.4;
    const sc = rollScene(two, same);
    let a, meet;
    if (onDay) {
      a = same ? sc.pays.find(p => p.t === sc.total.t) : pick(sc.pays);
      meet = a.t;
    } else {
      a = pick(sc.pays);
      meet = rng() < 0.5 ? sc.total.t : randInt(0, sc.n);
      if (meet === a.t) continue;
    }
    const tr = trip(sc, a.t, meet);
    if (want(tr)) return { sc, a, meet, tr };
  }
  const sc = FIX_SCENE(), a = sc.pays[fix[0]], meet = fix[1];
  return { sc, a, meet, tr: trip(sc, a.t, meet) };
}

/* the common card extras */
const extras = (sc, a, meet, hint, answerLabel, quiet = null) =>
  ({ graph: graphOf(sc, meet), graphCap: CAPTION, hint, answerLabel, solution: carSolution(sc, a, meet, quiet) });

/* ---------- the skills ---------- */

/* yesno: does it need a car? One card in three: it stands ON the meeting day */
function needsCar() {
  const onDay = rng() < 1 / 3;
  const { sc, a, meet } = deal({ two: rng() < 0.5, onDay, fix: onDay ? [2, 6] : [0, 6] });
  const yes = a.t !== meet;
  return {
    type: "yesno", concept: CAR,
    prompt: `${story(sc)} Does the ${money(a.v, true)} need a car to reach the meeting day?`,
    yes,
    ...extras(sc, a, meet, "Find the flag. Is the amount already standing on that T?",
      yes ? `Yes: it has to move from T${a.t} to T${meet}` : `No: it already stands on the meeting day, T${meet}`),
  };
}

const GEAR = {
  fwd: "Forward gear (×): the meeting day is later",
  rev: "Reverse gear (÷): the meeting day is earlier",
  none: "No car: it is already there",
};
/* mc: which gear? All three options on every card, so the "no car" option
   never gives a meeting-day card away */
function gear() {
  const onDay = rng() < 1 / 3, fwd = rng() < 0.5;
  const { sc, a, meet, tr } = deal({
    two: rng() < 0.5, onDay, want: t => onDay || (fwd ? t.dir > 0 : t.dir < 0),
    fix: onDay ? [2, 6] : fwd ? [0, 6] : [1, 3],
  });
  const right = tr.dir > 0 ? GEAR.fwd : tr.dir < 0 ? GEAR.rev : GEAR.none;
  return mc(CAR,
    `${story(sc)} Which gear moves the ${money(a.v, true)} to the meeting day?`,
    right, Object.values(GEAR).filter(o => o !== right),
    extras(sc, a, meet, "A later date: forward gear (×). An earlier date: reverse gear (÷). Already there: no car.",
      tr.dir === 0 ? `No car: the ${money(a.v)} already stands on T${meet}` : `${cap(gearOf(tr.dir))}: from T${a.t} to T${meet}`));
}

/* recall: an amount on the meeting day needs no car (yes/no or mc) */
const ON_DAY = ["No car: it is already there", "A car in forward gear", "A car in reverse gear", "One car for each road"];
function onTheDay() {
  const { sc, a, meet } = deal({ two: rng() < 0.5, onDay: true, fix: [2, 6] });
  const ex = extras(sc, a, meet, "Does it have to move at all?", `No car: the ${money(a.v)} already stands on the meeting day`);
  if (rng() < 0.5) return {
    type: "yesno", concept: CAR,
    prompt: `An amount standing on the meeting day, like the ${money(a.v, true)} here: does it need a car?`,
    yes: false, ...ex,
  };
  return mc(CAR, `An amount standing on the meeting day, like the ${money(a.v, true)} here: car or no car?`,
    ON_DAY[0], ON_DAY.slice(1), ex);
}

/* mcNum: the exponent of a one-road trip: ± years × k */
function exponent() {
  const { sc, a, meet, tr } = deal({ two: rng() < 0.5, onDay: false, want: t => t.legs.length === 1, fix: [1, 3] });
  const L = tr.legs[0], e = L.exp, s = tr.dir, base = L.years * L.k;
  return {
    type: "mc", concept: CAR,
    prompt: `${story(sc)} The ${money(a.v, true)} is moved to the meeting day. Its exponent is …`,
    /* decoys: the wrong sign, years without × k, one period off, a year off */
    options: mcNum(e, [-e, s * L.years, s * (base + 1), s * (base - 1), -s * L.years, s * (L.years + 1) * L.k]),
    ...extras(sc, a, meet, "Exponent = years × k on its road, with a minus sign for reverse gear.", `exponent ${expText(L)}`, L.r),
  };
}

/* mc: which road(s)? Two-road scenes only, half the trips cross the change */
function roads() {
  const cross = rng() < 0.5;
  const { sc, a, meet, tr } = deal({ two: true, onDay: false, want: t => (t.legs.length === 2) === cross, fix: cross ? [0, 6] : [1, 6] });
  const [A, B] = sc.roads;
  const only = r => `The ${r.r}% road only`;
  const both = tr.dir > 0 ? `The ${A.r}% road, then the ${B.r}% road` : `The ${B.r}% road, then the ${A.r}% road`;
  const right = tr.legs.length === 2 ? both : only(tr.legs[0]);
  return mc(CAR,
    `${story(sc)} Over which road(s) does the ${money(a.v, true)} travel to reach the meeting day?`,
    right, [only(A), only(B), both, "No road: it is already on the meeting day"].filter(o => o !== right),
    extras(sc, a, meet, "Follow the line from the amount to the flag. Which colours does it drive over?", right));
}

/* mc: an amount that crosses the rate change gets TWO cars, one per road */
function twoCars() {
  const { sc, a, meet, tr } = deal({ two: true, onDay: false, want: t => t.legs.length === 2, fix: [0, 6] });
  const right = term(a.v, tr.legs);
  const Y = tr.legs[0].years + tr.legs[1].years;
  const oneCar = l => term(a.v, [{ ...l, years: Y, exp: tr.dir * Y * l.k }]);       // the whole trip on one road's rate
  return mc(CAR,
    `${story(sc)} How many cars does the ${money(a.v, true)} need to reach the meeting day? Pick the expression that shows them.`,
    right, [oneCar(tr.legs[0]), oneCar(tr.legs[1]), `${term(a.v, [tr.legs[0]])} + ${term(a.v, [tr.legs[1]])}`],
    extras(sc, a, meet, "One car per road: every colour it drives over gets its own bracket, multiplied.", `2 cars: ${right}`));
}

/* mcNum: the exponent of ONE of the two cars of a crossing trip */
function roadExponent() {
  const { sc, a, meet, tr } = deal({ two: true, onDay: false, want: t => t.legs.length === 2, fix: [0, 6] });
  const j = randInt(0, 1), L = tr.legs[j], O = tr.legs[1 - j], s = tr.dir, Y = L.years + O.years;
  return {
    type: "mc", concept: CAR,
    prompt: `${story(sc)} The ${money(a.v, true)} crosses the place where the road changes colour. On the <b>${L.r}% road</b>, its car's exponent is …`,
    /* decoys: the wrong sign, the whole trip on this road, years without × k,
       this road's years with the other road's k, one period off */
    options: mcNum(L.exp, [-L.exp, s * Y * L.k, s * L.years, s * L.years * O.k, s * (L.years * L.k + 1), s * (L.years + 1) * L.k]),
    ...extras(sc, a, meet, "Count only the years on that colour, times that road's k. Reverse gear makes it negative.",
      `exponent on ${roadName(L)}: ${expText(L)}`, L.r),
  };
}

/* mcNum: how many cars? 0 on the meeting day, 1 on one road, 2 across the change */
function carCount() {
  const onDay = rng() < 1 / 3, cross = rng() < 0.5;
  const { sc, a, meet, tr } = deal({
    two: onDay ? rng() < 0.5 : true, onDay, want: t => onDay || (t.legs.length === 2) === cross,
    fix: onDay ? [2, 6] : cross ? [0, 6] : [1, 6],
  });
  const cars = tr.legs.length;
  return {
    type: "mc", concept: CAR,
    prompt: `${story(sc)} How many cars does the ${money(a.v, true)} need to reach the meeting day?`,
    options: mcNum(cars, [0, 1, 2, 3]),
    ...extras(sc, a, meet, "Already there: no car. One colour: one car. Two colours: two cars.",
      cars === 0 ? "0 cars, it already stands on the meeting day" : cars === 1 ? "1 car, it drives over one road" : "2 cars, one car per road"),
  };
}

/* ---------- the round, in dealing order ---------- */
const ROUND = [
  ["needsCar", needsCar],           // card 1 · yes/no
  ["gear", gear],                   // card 2 · forward / reverse / no car
  ["onTheDay", onTheDay],           // card 3 · recall: on the meeting day → no car
  ["exponent", exponent],           // card 4 · ± years × k
  ["roads", roads],                 // card 5 · one colour or two
  ["twoCars", twoCars],             // card 6 · the two-car expression
  ["roadExponent", roadExponent],   // card 7 · one car's exponent on a crossing trip
  ["carCount", carCount],           // card 8 · 0, 1 or 2 cars
];

export const questF9 = {
  id: "f9",
  skills: ROUND.map(([id, gen]) => ({ id, concept: CAR, gen })),
};
