/* ============================================================
   FINANCE QUEST 11 · Pick the meeting day   ★
   ------------------------------------------------------------
   FINANCE-ROUNDS-2-PLAN.md, round f11 (built 2026-10-10), the last
   of the five. The shortcut round: ANY T can be the meeting day, the
   answer for the total comes out the same wherever you meet, and
   picking the day is only about typing less. Fewer cars = fewer
   brackets to type.

   COUNTING CARS for a meeting day D. Every amount on the line counts,
   the total too: when D is not the total's own day, the total drives
   there in its car like everybody else (f10's jug form, P(1 + i)^n).
     · an amount standing ON D                       0 cars
     · an amount that stays on one colour of road    1 car
     · an amount that CROSSES the colour change (the
       change lies strictly between its T and D)     2 cars, one per road
   The two rules of thumb fall out of that: meet where someone already
   stands (that amount needs no car), and meet where the road changes
   colour (nobody crosses it, so there are no two-car trips).

   EVERY CARD shows a timeline the f9 way (coloured rate roads, the
   total "?" in its ring with its role letter, leaders) but WITHOUT the
   meeting-day flag: the learner picks the day. 2 or 3 payments plus
   the total, one road or one rate change (each road at least 2 years),
   4 to 8 years. A deposit may share the day of A (stacked above the
   "?" with its own leader); a loan's last repayment ends it at Tn and
   no repayment ever sits on T0. Every scene is checked against the
   engine's own label geometry, so it is to scale and nothing touches.

   THE TIE RULE (fewestCars, fewestAgain): the round only deals
   timelines where exactly ONE day, over every T and not just the
   options, needs the fewest cars. So one option is right with no extra
   wording, and every other option needs more. The options are 4
   T-values, always the best day and the end day. Each option carries a
   note, its car count ("2 cars"), which js/questions.js shows on every
   button once the answer is in. The best day is one of three kinds,
   the two rules of thumb: the road changes colour there and an amount
   stands there; the road changes colour there and nobody stands there
   (two amounts on each side); two amounts stand on the end day.

   TYPESETTING (f9 / f10 / f12 reviews): every money amount goes
   through money(); a number and its unit are ONE unbreakable unit
   ("2 cars", "8% p.a.", "R8 000 at T3"); a sum is one unit with its
   "=" inside ("2 + 1 + 0 = 3"), so no operator dangles; "half‑yearly"
   keeps a non-breaking hyphen. No equations and no exponents are shown:
   the working is counting cars. The first "car" of every solution says
   what a car is, and every solution ends on the refrain.

   REVIEW 1 (2026-10-10, phone width). The per-amount breakdown ("R6 000:
   1 car · A: 2 cars") and the car rule used to sit in the narrow italic
   aside and wrapped with a "·" dangling at line ends. Each is now a line
   of its own in the main step text, a UNIT LIST (css .ulist): every
   "R6 000: 1 car" is one unbreakable unit that draws its own "·" in
   front, and the "·" of a unit that starts a line is clipped away, so no
   line starts or ends with one. A day's own line keeps a short aside
   ("count per amount"); a sum ("0 + 1 + 1 = 2") is one unit on a line of
   its own. The "how many cars" hint names the colour change only when the
   road has one.

   VOCABULARY: "the total", "meeting day", "car", "road", "deposit" /
   "repayment". Never "lump sum", "accumulated amount", LHS/RHS.
   Pronouns only, no first names (public repo).

   A static round deals def.skills IN ORDER, one card per skill, so the
   ROUND list at the bottom IS the round (8 cards, 6 skills; carCountAt
   and fewestCars come back as carCountAgain and fewestAgain).
   ============================================================ */
import { mc, mcNum, rng } from "./_shared.js";
import { randInt, pick, shuffled } from "../ui.js";
import { rand, COMPOUNDING } from "../finlib.js";
import { computeTimeline, verifyTimeline } from "../engine/timeline-graph.js";

const CON = "meetingDay";
export const REFRAIN = "The answer is the same wherever you meet; picking the day is only about typing less.";

const RATES = [6, 7, 8, 9, 10, 11, 12, 14, 15];                       // whole % only
const KS = [1, 2, 4, 12];                                              // annually, half-yearly, quarterly, monthly
const HOW = k => (k === 2 ? "half‑yearly" : COMPOUNDING.find(c => c.k === k).label);   // a non-breaking hyphen (f10 review 1)
const SAVE_AMTS = [1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000];
const REPAY_AMTS = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7500];

const NB = " ";
/* ONE unbreakable unit (f9 review 1): js/ui.js formulaHtml never re-enters
   a class="nowrap" span, so nothing inside one can break */
const nw = s => `<span class="nowrap">${s}</span>`;
const rands = v => rand(v, 0).replace(/ /g, NB);                       // "R8 000"
const money = v => nw(rands(v));                                       // EVERY money amount in this round
const pa = r => `${r}%${NB}p.a.`;
const paU = r => nw(pa(r));                                            // f12 review 1: "8% p.a." is one unit
const roadU = r => nw(`${r}%${NB}road`);                               // "the 8% road"
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, j) => lo + j);
const person = () => pick([{ he: "she", his: "her" }, { he: "he", his: "his" }]);
const carsWord = k => `${k}${NB}car${k === 1 ? "" : "s"}`;            // "2 cars"
const cars = k => nw(carsWord(k));
/* f10 review 1: the first time a solution says "car", it says what one is */
const CAR_IS = `A car is the ${nw("(1 + i)^n")} bracket that moves an amount to the meeting day.`;
const CAPTION = "T in years";
/* review 1: a UNIT LIST, a line of its own in a worked step (css .ulist).
   Each part is one unbreakable unit with its own "·" in front (drawn by the
   css, inside the unit; the one that starts a line is clipped away). A unit
   ends on a space, so the text still reads "R6 000: 1 car A: 2 cars" when
   copied, and nothing between the units can be broken off on its own. */
const unitList = parts => `<div class="ulist"><div>${parts.map(p => nw(`${p} `)).join("")}</div></div>`;

/* ---------- the scene: a story, its roads, its payments, the total ---------- */

/* two: one rate change (two roads) or one road. share: a saving story whose
   last deposit sits on the day of A (true / false / null = sometimes).
   cnt: 2 or 3 payments. Each road is at least 2 years long, so its rate
   text fits under it. */
function rollScene({ two = rng() < 0.65, saving = rng() < 0.55, share = null, cnt = randInt(2, 3) } = {}) {
  if (share) saving = true;
  const n = randInt(4, 8);
  const c = two ? randInt(2, n - 2) : null;
  const r1 = pick(RATES), r2 = pick(RATES.filter(r => r !== r1));
  const roads = two
    ? [{ from: 0, to: c, r: r1, k: pick(KS) }, { from: c, to: n, r: r2, k: pick(KS) }]
    : [{ from: 0, to: n, r: r1, k: pick(KS) }];
  const total = { t: saving ? n : 0, role: saving ? "A" : "P" };
  const sh = saving && (share == null ? rng() < 0.25 : share);
  /* saving: deposits from T0 to T(n−1), plus (sometimes) one ON the day of A;
     a loan: repayments from T1, the last one ending it at Tn, never on T0 */
  const times = saving
    ? [...shuffled(range(0, n - 1)).slice(0, sh ? cnt - 1 : cnt), ...(sh ? [n] : [])]
    : [...shuffled(range(1, n - 1)).slice(0, cnt - 1), n];
  times.sort((a, b) => a - b);
  const vals = shuffled(saving ? SAVE_AMTS : REPAY_AMTS).slice(0, cnt);
  return { saving, n, c, roads, total, pays: times.map((t, j) => ({ t, v: vals[j] })), p: person() };
}

/* every amount on the line, the total first, in T order */
const itemsOf = sc => [{ t: sc.total.t, total: true, role: sc.total.role }, ...sc.pays].sort((a, b) => a.t - b.t);
const itemsAt = (sc, D) => itemsOf(sc).filter(it => it.t === D);

/* THE count: 0 already there, 2 across the colour change, else 1 */
export function carsFor(t, D, c) {
  if (t === D) return 0;
  if (c != null && Math.min(t, D) < c && c < Math.max(t, D)) return 2;
  return 1;
}
const countAt = (sc, D) => itemsOf(sc).reduce((s, it) => s + carsFor(it.t, D, sc.c), 0);
const countsAll = sc => range(0, sc.n).map(D => countAt(sc, D));

/* the timeline: the total FIRST, so on a shared day it is the bottom label
   of the stack, right above its role letter. NO meeting-day flag: the
   learner picks the day */
const graphOf = sc => ({
  type: "timeline", n: sc.n,
  nodes: [{ t: sc.total.t, label: "?", role: sc.total.role }, ...sc.pays.map(p => ({ t: p.t, amount: p.v, dp: 0 }))],
  roads: sc.roads.map(r => ({ from: r.from, to: r.to, rate: `${r.r}% p.a.`, k: r.k })),
  leaders: true,                                   // a thin line from each lone amount down to its own T
  stackLeaders: true,                              // a deposit stacked above the "?" draws its own leader (f10 review 1)
});

/* the engine's own label geometry (f12's check): no two labels on different
   days within 4 units of each other, and no stack leader through a label */
function fits(spec) {
  const g = computeTimeline(spec);
  const box = lb => ({ x0: lb.x - lb.w / 2, x1: lb.x + lb.w / 2, y0: lb.y - 11, y1: lb.y + 4 });
  const L = g.labels;
  for (let i = 0; i < L.length; i++)
    for (let j = i + 1; j < L.length; j++) {
      if (L[i].t === L[j].t) continue;
      const a = box(L[i]), b = box(L[j]);
      if (a.x0 < b.x1 + 4 && b.x0 < a.x1 + 4 && a.y0 < b.y1 && b.y0 < a.y1) return false;
    }
  for (const sl of g.stackLeaders) {
    const xv = sl.pts[0][0];
    for (const lb of L) {
      if (lb.t === sl.t) continue;
      const b = box(lb);
      if (xv > b.x0 - 3 && xv < b.x1 + 3) return false;
    }
  }
  return true;
}
function valid(sc) {
  if (new Set(sc.pays.map(p => p.v)).size !== sc.pays.length) return false;          // no two payments alike
  if (new Set(sc.pays.map(p => p.t)).size !== sc.pays.length) return false;          // one payment a day
  const g = graphOf(sc);
  return fits(g) && verifyTimeline(g).every(r => r.ok);                               // to scale, the engine's own word
}

/* roll until the scene is honest and the card's own wish holds. make()
   returns a scene; want(sc) returns the card's choice (truthy) or null.
   fix(): a hand-checked fallback (a roll loop can, in theory, miss) */
function deal(make, want, fix) {
  for (let tries = 0; tries < 500; tries++) {
    const sc = make();
    if (!valid(sc)) continue;
    const w = want(sc);
    if (w) return { sc, w };
  }
  const sc = fix();
  return { sc, w: want(sc) };
}

/* ---------- the hand-checked fallbacks ---------- */
const FIX = {
  /* saving, 8% quarterly to T3, then 10% monthly; R5 000 at T1, R3 000 at T3,
     A at T6. Counts T0..T6: 4 3 4 2 4 4 3, so T3 alone needs 2 cars
     (the road changes colour there AND R3 000 stands there) */
  colourStands: () => ({
    saving: true, n: 6, c: 3, p: { he: "she", his: "her" }, total: { t: 6, role: "A" },
    roads: [{ from: 0, to: 3, r: 8, k: 4 }, { from: 3, to: 6, r: 10, k: 12 }],
    pays: [{ t: 1, v: 5000 }, { t: 3, v: 3000 }],
  }),
  /* saving, 9% half-yearly to T3, then 12% monthly; R2 000 at T0, R4 000 at
     T1, R6 000 at T5, A at T6. Counts: 5 5 6 4 6 5 5, so T3 alone needs 4
     (two amounts on each side, nobody crosses) */
  colourOnly: () => ({
    saving: true, n: 6, c: 3, p: { he: "he", his: "his" }, total: { t: 6, role: "A" },
    roads: [{ from: 0, to: 3, r: 9, k: 2 }, { from: 3, to: 6, r: 12, k: 12 }],
    pays: [{ t: 0, v: 2000 }, { t: 1, v: 4000 }, { t: 5, v: 6000 }],
  }),
  /* saving, one road 9% quarterly; R3 000 at T1, R5 000 at T3, R2 000 on the
     day of A (T5). Counts: 4 3 4 3 4 2, so T5 alone needs 2 */
  shared: () => ({
    saving: true, n: 5, c: null, p: { he: "she", his: "her" }, total: { t: 5, role: "A" },
    roads: [{ from: 0, to: 5, r: 9, k: 4 }],
    pays: [{ t: 1, v: 3000 }, { t: 3, v: 5000 }, { t: 5, v: 2000 }],
  }),
  /* saving, one road 8% monthly; R4 000 at T2, R6 000 at T4, A at T6.
     Counts: 3 3 2 3 2 3 2 (T2, T4 and T6 tie at 2) */
  oneRoad: () => ({
    saving: true, n: 6, c: null, p: { he: "he", his: "his" }, total: { t: 6, role: "A" },
    roads: [{ from: 0, to: 6, r: 8, k: 12 }],
    pays: [{ t: 2, v: 4000 }, { t: 4, v: 6000 }],
  }),
};

/* ---------- the words ---------- */

function story(sc) {
  const [r0, r1] = sc.roads, { p } = sc;
  const one = r => `${paU(r.r)} compounded ${HOW(r.k)}`;
  const rate = r1 ? `${one(r0)}; from T${r1.from} the rate is ${one(r1)}` : one(r0);
  return sc.saving
    ? `${cap(p.he)} saves at ${rate}. ${cap(p.his)} deposits grow into the total, A.`
    : `${cap(p.he)} borrows the total, P, at ${rate}, and pays it back in parts.`;
}
const RULE_TWO = ["already there: no car", `one colour: ${carsWord(1)}`, `across the colour change: ${carsWord(2)}`];
const RULE_ONE = ["already there: no car", `it has to move: ${carsWord(1)}`, "one road, one colour"];
/* review 1: what a car is, then the rule as a unit list on a line of its own (two steps) */
const carLine = sc => [{ s: CAR_IS }, { s: unitList(sc.c == null ? RULE_ONE : RULE_TWO) }];

/* "R5 000 at T1", "A at T6": who stands where, ONE unit */
const whoAt = it => (it.total ? `the total ${nw(`${it.role} at T${it.t}`)}` : nw(`${rands(it.v)} at T${it.t}`));
/* the per-day breakdown, one unit per amount: "R5 000: 2 cars", "R3 000: no car", "A: 1 car" */
const breakdown = (sc, D) => itemsOf(sc).map(it => {
  const k = carsFor(it.t, D, sc.c);
  return `${it.total ? it.role : rands(it.v)}: ${k ? carsWord(k) : "no car"}`;
});
/* review 1: a day's count with a short aside, then its breakdown as a unit list (two steps) */
const dayLine = (sc, D, tag = "") => [
  { s: `Meet at T${D}${tag}: ${cars(countAt(sc, D))}`, r: "count per amount" },
  { s: unitList(breakdown(sc, D)) },
];
/* the road an amount drives on when it stays on one colour */
function roadOf(sc, t, D) {
  if (sc.c == null) return sc.roads[0];
  return Math.max(t, D) <= sc.c ? sc.roads[0] : sc.roads[1];
}

/* ---------- the skills ---------- */

/* mc of T-values: which meeting day needs the fewest cars? The best day is
   the ONLY day with the fewest (THE TIE RULE), of one of three kinds */
function bestOf(sc) {
  const cs = countsAll(sc), min = Math.min(...cs), at = range(0, sc.n).filter(D => cs[D] === min);
  if (at.length !== 1) return null;
  const D = at[0], stand = itemsAt(sc, D).length;
  const kind = sc.c != null && D === sc.c ? (stand ? "colourStands" : "colourOnly") : stand >= 2 ? "shared" : "other";
  return { D, min, kind, cs };
}
const BEST_KINDS = [["colourStands", 0.4], ["colourOnly", 0.25], ["shared", 0.35]];
function fewestCars() {
  let u = rng(), kind = BEST_KINDS[BEST_KINDS.length - 1][0];
  for (const [k, w] of BEST_KINDS) { if (u < w) { kind = k; break; } u -= w; }
  const make = kind === "shared" ? () => rollScene({ share: true, two: rng() < 0.5 })
    : kind === "colourOnly" ? () => rollScene({ two: true, share: false, cnt: 3 })
    : () => rollScene({ two: true });
  const { sc, w: b } = deal(make, s => { const b = bestOf(s); return b && b.kind === kind ? b : null; }, FIX[kind]);
  const { n } = sc, cs = b.cs;
  /* the options: the best day, the end day, then the tempting ones (a day
     where an amount stands, T0, the colour change), then any other day */
  const opts = [b.D, ...(b.D !== n ? [n] : [])];
  const tempting = shuffled([...new Set([...itemsOf(sc).map(it => it.t), 0, ...(sc.c != null ? [sc.c] : [])])]);
  for (const D of [...tempting, ...shuffled(range(0, n))]) {
    if (opts.length >= 4) break;
    if (!opts.includes(D)) opts.push(D);
  }
  opts.sort((x, y) => x - y);
  const WHY = {
    colourStands: () => `the road changes colour at T${b.D}, and ${whoAt(itemsAt(sc, b.D)[0])} already stands there`,
    colourOnly: () => `the road changes colour at T${b.D}: no amount crosses the change, so none needs two cars`,
    shared: () => `two amounts already stand on T${b.D}: neither of them needs a car`,
  };
  return {
    type: "mc", concept: CON, layout: "grid2",
    prompt: `${story(sc)} Which meeting day needs the fewest cars?`,
    options: opts.map(D => ({ label: `T${D}`, correct: D === b.D, note: cars(cs[D]) })),
    graph: graphOf(sc), graphCap: CAPTION,
    hint: sc.c == null
      ? `Count the cars for each day. An amount already there needs none; every other amount needs ${cars(1)}. The total counts too.`
      : `Count the cars for each day. Already there: none. One colour: ${cars(1)}. Across the colour change: ${cars(2)}. The total counts too.`,
    answerLabel: `T${b.D}: ${cars(b.min)}, the fewest`,
    solution: [
      ...carLine(sc),
      ...opts.flatMap(D => dayLine(sc, D)),
      { s: `T${b.D} needs the fewest: ${cars(b.min)}`, r: WHY[b.kind]() },
      { s: REFRAIN },
    ],
  };
}

/* mcNum: if we meet at T D, how many cars altogether? cross: the day makes
   at least one amount cross the colour change (a two-car trip) */
function carCountAt({ cross = false } = {}) {
  const pickDay = sc => {
    const u = rng(), occ = [...new Set(itemsOf(sc).map(it => it.t))];
    const D = sc.c != null && u < 0.3 ? sc.c : u < 0.6 ? pick(occ) : randInt(0, sc.n);
    if (cross && !itemsOf(sc).some(it => carsFor(it.t, D, sc.c) === 2)) return null;
    return { D };
  };
  const { sc, w } = deal(() => rollScene({ two: cross || rng() < 0.7 }), pickDay, () => ({ ...FIX.colourStands() }));
  const D = w ? w.D : 6;                                                  // the fallback: T6, R5 000 crosses T3
  const items = itemsOf(sc), k = countAt(sc, D);
  const parts = items.map(it => carsFor(it.t, D, sc.c));
  const moved = items.filter(it => it.t !== D).length;                    // one car each, the second car forgotten
  const lines = items.map(it => {
    const kk = carsFor(it.t, D, sc.c);
    return {
      s: `${cap(whoAt(it))}: ${kk === 0 ? "no car" : cars(kk)}`,
      r: kk === 0 ? `it already stands on T${D}`
        : kk === 2 ? `it crosses the colour change at T${sc.c}: one car per road`
        : sc.c == null ? "one road, one colour" : `it stays on the ${roadU(roadOf(sc, it.t, D).r)}`,
    };
  });
  return {
    type: "mc", concept: CON,
    prompt: `${story(sc)} If we meet at T${D}, how many cars are needed altogether?`,
    options: mcNum(k, [moved, items.length, k + 1, k - 1, k + 2]),
    graph: graphOf(sc), graphCap: CAPTION,
    /* review 1: a one-colour road has no colour change to cross */
    hint: sc.c == null
      ? `Go amount by amount, the total too. Already on T${D}: no car. One colour, so one car for each amount that has to move.`
      : `Go amount by amount, the total too. Already on T${D}: no car. One colour: ${cars(1)}. Across the colour change: ${cars(2)}.`,
    answerLabel: `${cars(k)} if we meet at T${D}`,
    solution: [
      ...carLine(sc),
      ...lines,
      { s: `Meet at T${D}: ${cars(k)} altogether`, r: "add them up" },
      { s: nw(`${parts.join(" + ")} = ${k}`) },
      { s: REFRAIN },
    ],
  };
}

/* mc: which amount already stands on T D? (f9's idea, recalled). One card
   in four asks about an empty day, one in four about the total's day */
function whereStands() {
  const u = rng(), want = u < 0.5 ? "pay" : u < 0.75 ? "total" : "none";
  const choose = sc => {
    const lone = range(0, sc.n).filter(D => itemsAt(sc, D).length === 1);   // never a shared day
    const days = want === "none" ? range(0, sc.n).filter(D => !itemsAt(sc, D).length)
      : want === "total" ? lone.filter(D => D === sc.total.t)
      : lone.filter(D => D !== sc.total.t);
    return days.length ? { D: pick(days) } : null;
  };
  const { sc, w } = deal(() => rollScene({ share: want === "total" ? false : null }), choose, FIX.colourStands);
  const D = w ? w.D : 3;
  const at = itemsAt(sc, D)[0] || null;
  const TOTAL = `The total, ${sc.total.role}`, NONE = `Nothing: no amount stands on T${D}`;
  const right = !at ? NONE : at.total ? TOTAL : money(at.v);
  const stands = !at ? "no amount" : at.total ? `the total, ${sc.total.role} (the ? in its ring)` : money(at.v);
  return mc(CON,
    `${story(sc)} Meeting where someone already stands saves a car. Which amount is already standing on T${D}?`,
    right, [...sc.pays.map(p => money(p.v)), TOTAL, NONE].filter(o => o !== right),
    {
      graph: graphOf(sc), graphCap: CAPTION,
      hint: `Look straight up from T${D}. The ? in its ring is the total.`,
      answerLabel: !at ? `Nothing stands on T${D}: meeting there saves no car`
        : `${at.total ? TOTAL : money(at.v)}: meet at T${D} and it needs no car`,
      solution: [
        { s: CAR_IS, r: "an amount already on the meeting day needs no car" },
        { s: `On T${D}: ${stands}`, r: "read straight up from the T label" },
        ...dayLine(sc, D),
        { s: REFRAIN },
      ],
    });
}

/* mc of T-values: where does the road change colour? decoys: T0, the end,
   another middle T (one where an amount stands, when there is one) */
function colourChange() {
  const { sc } = deal(() => rollScene({ two: true }), () => true, FIX.colourStands);
  const { n, c } = sc, [r0, r1] = sc.roads;
  const mids = range(1, n - 1).filter(D => D !== c);
  const occ = mids.filter(D => itemsAt(sc, D).length);
  const opts = [0, c, n, pick(occ.length ? occ : mids)].sort((x, y) => x - y);
  const k = countAt(sc, c);
  return {
    type: "mc", concept: CON, layout: "grid2",
    prompt: `${story(sc)} Meeting where the road changes colour saves two‑car trips. Which T is that?`,
    options: opts.map(D => ({ label: `T${D}`, correct: D === c })),
    graph: graphOf(sc), graphCap: CAPTION,
    hint: "Follow the road from T0. Where does its colour change? The story says it too: that is where the rate changes.",
    answerLabel: `T${c}: the ${roadU(r0.r)} ends and the ${roadU(r1.r)} starts`,
    solution: [
      { s: CAR_IS, r: "an amount that crosses the colour change needs two cars, one per road" },
      { s: `The road changes colour at T${c}`, r: `the ${roadU(r0.r)} ends there and the ${roadU(r1.r)} starts` },
      { s: `Meet at T${c}: ${cars(k)}`, r: "no amount crosses the change, so none needs two cars" },
      { s: unitList(breakdown(sc, c)) },
      { s: REFRAIN },
    ],
  };
}

/* yesno: meeting at T a instead of T b, does the answer change? → no */
function sameAnswer() {
  const choose = sc => {
    const b = rng() < 0.5 ? sc.total.t : randInt(0, sc.n);
    const a = pick(range(0, sc.n).filter(D => D !== b));
    return countAt(sc, a) !== countAt(sc, b) || rng() < 0.2 ? { a, b } : null;   // mostly a real difference in typing
  };
  const { sc, w } = deal(() => rollScene(), choose, FIX.colourStands);
  const { a, b } = w || { a: 3, b: 6 };
  const R = sc.total.role, ka = countAt(sc, a), kb = countAt(sc, b);
  return {
    type: "yesno", concept: CON,
    prompt: `${story(sc)} If we meet at T${a} instead of T${b}, does the final answer for ${R} change?`,
    yes: false,
    graph: graphOf(sc), graphCap: CAPTION,
    hint: "Another meeting day changes the brackets you type, not the value of the total.",
    answerLabel: `No: ${R} comes out the same; only the typing changes`,
    solution: [
      ...carLine(sc),
      ...dayLine(sc, b),
      ...dayLine(sc, a),
      { s: `The same ${R} either way: every amount moves at the same rates`, r: ka === kb ? `${cars(ka)} either way` : `T${ka < kb ? a : b} has fewer cars: less to type` },
      { s: REFRAIN },
    ],
  };
}

/* mc: why is T D a good meeting day? D is one of the days with the fewest
   cars (a tie is fine: the question is "why good", not "which"), never T0
   or the end, and never the day of the biggest payment, so the decoys "it is
   the end" and "the biggest amount stands there" are plainly false */
const REASONS = {
  stands: "An amount already stands there, so it needs no car",
  colour: "The road changes colour there, so no amount needs two cars",
  both: "Both: an amount stands there, and the road changes colour there",
  end: "It is the end of the timeline",
  biggest: "The biggest amount stands there",
};
function bestReason() {
  const kind = pick(["stands", "colour", "both"]);
  const choose = sc => {
    const cs = countsAll(sc), min = Math.min(...cs), big = Math.max(...sc.pays.map(p => p.v));
    const days = range(1, sc.n - 1).filter(D => {
      const at = itemsAt(sc, D), isC = sc.c === D;
      if (cs[D] !== min || at.some(it => it.v === big)) return false;
      return kind === "stands" ? at.length > 0 && !isC : kind === "colour" ? isC && !at.length : isC && at.length > 0;
    });
    return days.length ? { D: pick(days), min, cs } : null;
  };
  const make = () => rollScene({ two: kind !== "stands" || rng() < 0.5, share: kind === "stands" ? false : null, cnt: kind === "colour" ? 3 : randInt(2, 3) });
  const fix = kind === "stands" ? FIX.oneRoad : kind === "colour" ? FIX.colourOnly : FIX.colourStands;
  const { sc, w } = deal(make, choose, fix);
  const { D, min, cs } = w;
  const { n } = sc, at = itemsAt(sc, D);
  const ties = range(0, n).filter(x => cs[x] === min).length;
  const here = at.length ? money(at[0].v) : "no amount";
  return mc(CON,
    `${story(sc)} Why is T${D} a good meeting day here?`,
    REASONS[kind], Object.keys(REASONS).filter(k => k !== kind).map(k => REASONS[k]),
    {
      graph: graphOf(sc), graphCap: CAPTION,
      hint: `Look at T${D}. Does an amount stand there? Does the road change colour there?`,
      answerLabel: REASONS[kind],
      solution: [
        ...carLine(sc),
        { s: `On T${D}: ${here}`, r: sc.c === D ? `and the road changes colour at T${D}` : sc.c == null ? "one road: the colour never changes" : `the road changes colour at T${sc.c}, not here` },
        ...dayLine(sc, D),
        ...dayLine(sc, n, " (the end)"),
        { s: `T${D} needs ${cars(min)}, ${ties === 1 ? "the fewest of any day" : "as few as any day"}`,
          r: kind === "stands" ? "an amount already stands there: it needs no car"
            : kind === "colour" ? "nobody crosses the colour change on the way there"
            : "an amount stands there, and nobody crosses the colour change" },
        { s: REFRAIN },
      ],
    });
}

/* ---------- the round, in dealing order ---------- */
const ROUND = [
  ["whereStands", whereStands],                         // card 1 · recall: who already stands there?
  ["colourChange", colourChange],                       // card 2 · where the road changes colour
  ["carCountAt", () => carCountAt()],                   // card 3 · count the cars for one day
  ["fewestCars", fewestCars],                           // card 4 · pick the day (car counts on the buttons after)
  ["bestReason", bestReason],                           // card 5 · why that day
  ["carCountAgain", () => carCountAt({ cross: true })], // card 6 · count again, a two-car trip in it
  ["sameAnswer", sameAnswer],                           // card 7 · the answer does not change
  ["fewestAgain", fewestCars],                          // card 8 · pick the day again
];

export const questF11 = {
  id: "f11",
  skills: ROUND.map(([id, gen]) => ({ id, concept: CON, gen })),
};
