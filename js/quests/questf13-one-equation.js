/* ============================================================
   FINANCE QUEST 13 · Build the one equation   ★
   ------------------------------------------------------------
   NOTE: this round was f12 until 2026-10-11 (now f13; f12 = Build the
   timeline). Comments saying 'f12 review 1' refer to its 10 Oct review.
   ------------------------------------------------------------
   FINANCE-ROUNDS-2-PLAN.md, round f12 (built 2026-10-10). The EXAM
   shape. A full word question, recycled from her class bank with
   ROLLED numbers (the ten textbook names: Brenda, Mvelo, Bradley,
   Jason, Mandy, Brian, Stephanie, Bob, Arnold, David), answered as a
   steps chain:
     · step 1 (mc): four equations. The right one, and exactly the
       plan's three decoys: a SIGN slip (the withdrawal added, or a
       repayment subtracted; with no withdrawal in the story, a deposit
       subtracted), a CAR given to the amount that already stands on the
       meeting day (the payment on that day; when no payment stands
       there, the total itself), and a GEAR slip (one amount's exponent
       sign flipped: a reverse exponent written positive on a loan, a
       forward one written negative on saving);
     · step 2 (calc): the answer to 2 dp, computed by finlib from the
       same numbers the prompt shows, never rounded along the way;
     · step 3 (calc, hire purchase only): price = loan + down payment.

   HER METHOD (CLASS-DIGEST "The method, in her words"): ONE meeting
   day; the total written FIRST, alone on the left; every other amount
   in its car to the meeting day (forward gear +, reverse gear −, one
   car per road), no car if it already stands there. ONE equation,
   built completely, typed once, rounded once at the end. The meeting
   day is the exam's natural one: the day of A for saving, T0 for a
   loan. When the total is a KNOWN number and the unknown is a payment
   (Bob's deposit P, David's x), the same line holds and SHIFT SOLVE
   finds the unknown.

   THE FADE: cards 1 to 3 of a round show the timeline (f9 style: the
   meeting-day flag, coloured rate roads, the total "?" in its ring with
   its role letter, a withdrawal drawn "−R2 000"); cards 4 to 8 show
   none, so the learner builds it in their head. A static round deals
   def.skills IN ORDER (js/play.js renderPlay: skills[st.i]), so the
   timeline is bound to the skill's index when the list is built (f8's
   per-position hook): gen() stays pure and seedable.

   THE COLOURS (Fix B, her ruling 11 Oct 11:47): every car in every
   equation line (the four options, the worked lines, the 📖 steps) wears
   its ROAD's colour, the same colour the timeline draws that road in, so
   the kids read the equation off the picture; after the fade (card 4 on)
   the colours stay. Wrong options are painted by the same rule (carText).

   THE ROUND (8 cards, 7 families): twoDeposits, withdrawal and
   loanTwoRepayments with the picture; then mixed, targetAmount, a
   second loanTwoRepayments roll (skill id loanAgain: a loan with no
   picture, the class's struggle point), hirePurchase and unknownPayment.
   F13_FAMILIES exports the seven family makers ({ timeline }) for the
   Exam Focus "timeline-equation" tile to deal later.
   F13_SCENES, f13Story and f13GraphOf (2026-10-11) export the scene
   makers, the paragraph and the timeline spec for f12 "Build the timeline",
   which deals these scenes and ends on this round's own drawing.

   WRAPPING (f9/f10 review 1, f12 review 1): every TERM of an equation,
   its amount and all its cars, is ONE <span class="nowrap"> unit, so a
   line may break only between terms; the equations are a size smaller
   (.f13-eq) so a two-car term fits a 360-px option, and the rare one that
   cannot is cut before its second car, which then reads "× (1 + …)^n".
   A single-letter left side rides with the first right-hand term
   ("A = 5 500(…)"); any other left side keeps the "=" glued to the term
   BEFORE it, so a broken line never starts with "=". In running text a
   number and its unit are one unit ("2 years", "8% p.a.", "2 decimal
   places"). Exponents are written worked
   out, the exam way (^36, ^(−8)), as f10 does; no car is ever ^1. Every
   money amount goes through money(); "half‑yearly" keeps a
   non-breaking hyphen. Each road is at least 2 years long and every
   scene is checked against the engine's own label geometry, so the
   timeline is to scale and nothing on it touches.

   VOCABULARY: "the total" only, "meeting day", "car", "deposit" /
   "withdrawal" / "repayment", "down payment". Never "lump sum",
   "accumulated amount", LHS/RHS. No "hire purchase" in a prompt (f6
   teaches hire purchase as simple interest). Never "car" for a thing
   that is bought.
   ============================================================ */
import { C, rng, mcStep, calcStep } from "./_shared.js";
import { randInt, pick, shuffled } from "../ui.js";
import { rand, toFrac, moveMoney, ratePerPeriod, COMPOUNDING, pow } from "../finlib.js";
import { computeTimeline, verifyTimeline } from "../engine/timeline-graph.js";
import { L as afL } from "../lang.js";

const CON = "oneEquation";
export const REFRAIN = "Build the whole equation first. Type it once. Round once, at the end.";

const RATES = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20];        // whole % only
const KS = [1, 2, 4, 12];                                               // annually, half-yearly, quarterly, monthly
const HOW = k => (k === 2 ? afL("half‑yearly", "halfjaarliks") : COMPOUNDING.find(c => c.k === k).label);   // a non-breaking hyphen (f10 review 1)
const CALC_TOL = 0.001;                                                 // the app's calc tolerance (TOL.calcEps): the cent must match
/* the keypad lets in 6 digits unless told more; an answer to the cent here
   runs to 8 (R104 072,38), so every typed step asks for 9 (js/keypad.js) */
const KEYPAD_DIGITS = 9;
const typed = (prompt, v, hint) => ({ ...calcStep(prompt, v, hint, { dp: 2, tol: CALC_TOL }), maxDigits: KEYPAD_DIGITS });

const DEP_AMTS = [2000, 3000, 4000, 4500, 5000, 5500, 6000, 7000, 8000, 9000, 10000, 12000, 15000];
const BIG_DEP = [8000, 10000, 12000, 14000, 15000, 18000, 20000];
const WD_AMTS = [1000, 1500, 2000, 2500, 3000, 4000, 5000];
const REPAY_AMTS = [2000, 2300, 2500, 3000, 3500, 4000, 4200, 4500, 5000, 6000, 7000, 8000, 9000];
const TARGETS = [100000, 150000, 200000, 250000, 300000, 400000, 500000, 750000, 1000000];
const DOWNS = [1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000];
const ITEMS = [afL("lounge suite", "sitkamerstel"), afL("motorbike", "motorfiets"), afL("laptop", "skootrekenaar"), afL("fridge", "yskas"), afL("TV", "TV"), afL("bed", "bed")];   // never a car: "car" is the bracket
const D0_AMTS = [10000, 15000, 20000, 25000, 30000, 40000];
const DEND_AMTS = [10000, 20000, 25000, 30000, 40000, 50000];
const XGUESS = [20000, 25000, 30000, 40000, 50000, 60000, 80000, 100000];

/* the ten textbook names (CLASS-DIGEST examples bank) and their pronouns;
   Mvelo is named again rather than given a pronoun */
const SHE = { he: afL("she", "sy"), his: "her" }, HE = { he: afL("he", "hy"), his: "his" };
const WHO = {
  Brenda: SHE, Mvelo: { he: afL("Mvelo", "Mvelo"), his: "Mvelo’s" }, Bradley: HE, Jason: HE, Mandy: SHE,
  Brian: HE, Stephanie: SHE, Bob: HE, Arnold: HE, David: HE,
};

const NB = " ";
const nw = s => `<span class="nowrap">${s}</span>`;                    // ONE unbreakable unit (f9 review 1)
const rands = (v, dp = 0) => rand(v, dp).replace(/ /g, NB);            // "R8 000", "R3 587,42"
const money = (v, dp = 0) => nw(rands(v, dp));                         // EVERY money amount in this round
const amt0 = v => rands(v, 0).slice(1);                                // "8 000", as it stands in an equation
const amt2 = v => rands(v, 2).slice(1);                                // "9 914,71"
const pa = r => afL(`${r}%${NB}p.a.`, `${r}%${NB}p.j.`);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const yrs = y => afL(`${y}${NB}year${y === 1 ? "" : "s"}`, `${y}${NB}jaar${y === 1 ? "" : ""}`);                 // f10's no-break glue
const perYear = k => afL(`${k}${NB}time${k === 1 ? "" : "s"}${NB}a${NB}year`, `${k}${NB}keer${k === 1 ? "" : ""}${NB}per${NB}jaar`);
/* f12 review 1: in running text a number and its unit are ONE unit ("2 years",
   "8% p.a.", "2 decimal places"). The no-break space alone did not hold:
   formulaHtml wraps the bare number in its own inline-block, the space is
   left outside it, and the line broke between them ("after 2 | years") */
const years = y => nw(yrs(y));
const paU = r => nw(pa(r));
const DP2 = nw(afL("2 decimal places", "2 desimale plekke"));
const when = t => (t === 0 ? "now" : `after ${years(t)}`);
const andList = xs => (xs.length === 1 ? xs[0] : afL(`${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`, `${xs.slice(0, -1).join(", ")} en ${xs[xs.length - 1]}`));
const CAPTION = afL("T in years", "T in jare");
/* f10 review 1: the first time a solution says "car", it says what one is */
const CAR_IS = afL(`a car is the ${nw(pow("(1 + i)", "n"))} bracket that moves an amount to the meeting day`, `die kar is die hakie ${nw(pow("(1 + i)", "n"))} wat 'n bedrag na die ontmoetingsdag skuif`);

/* ---------- roads, cars, terms ---------- */

/* one road, or a rate change at T c (each road at least 2 years, so its
   rate text fits under it). The RATE always changes (the compounding may
   change too): a road is drawn as its rate, and the engine's verify will
   not let the road change colour while "18% p.a." stays "18% p.a." */
function rollRoads(n, two) {
  if (!two) return [{ from: 0, to: n, r: pick(RATES), k: pick(KS) }];
  const c = randInt(2, n - 2), r1 = pick(RATES);
  return [{ from: 0, to: c, r: r1, k: pick(KS) }, { from: c, to: n, r: pick(RATES.filter(r => r !== r1)), k: pick(KS) }];
}

/* the cars that move an amount from T t to the meeting day m, in TRAVEL
   order (reverse gear meets the later road first): one car per road. Each
   car keeps j, the index of its road in sc.roads: the same index the
   timeline engine colours that road by (rd.cls = j % 3), so Fix B can paint
   the car in its road's colour */
function carsOf(roads, t, m) {
  const dir = Math.sign(m - t), lo = Math.min(t, m), hi = Math.max(t, m);
  let legs = roads.map((r, j) => ({ j, r: r.r, k: r.k, from: Math.max(lo, r.from), to: Math.min(hi, r.to) }))
    .filter(l => l.to > l.from);
  if (dir < 0) legs = legs.reverse();
  return legs.map(l => ({ ...l, years: l.to - l.from, e: dir * (l.to - l.from) * l.k }));
}
/* one car: (1 + 0,12/12)^36, reverse (1 + 0,12/12)^(−36); annual (1 + 0,08)^3.
   Fix A (11 Oct): the exponent is a real superscript (finlib's pow), inside
   the term's nowrap unit like the rest of the car.
   Fix B (11 Oct, her ruling 11:47): every car wears the colour of the ROAD it
   drives over, <span class="eq-road-j">, j its road's index (the engine's
   .tl-road-j; one set of CSS variables feeds both, css/styles.css), so the
   kids read the equation off the picture, and the colours stay on the cards
   with no picture. The span holds the whole car, its sup included, and sits
   inside the term's nowrap unit. Every option is painted by this one rule, so
   a colour is never a hint to the right one. Amounts keep the text colour */
function carText(c) {
  const i = C(toFrac(c.r)), base = c.k === 1 ? `(1 + ${i})` : `(1 + ${i}/${c.k})`;
  return `<span class="eq-road-${c.j % 3}">${c.e < 0 ? pow(base, `−${-c.e}`) : pow(base, c.e)}</span>`;
}
const coefText = c => (typeof c === "number" ? amt0(c) : c);

/* f12 review 1: every equation of the round (the options, the worked lines,
   the concept sheet) wears ONE class, .f13-eq (css/styles.css): 12 px, 0.8
   of an option's 15 px. Measured over 2 800 rolls, that is the largest size
   at which a two-car term (with the sign in front of it) fits a 360-px
   option in one piece on all but 2 cards in 100; at 0.85 it was 1 in 5.
   GLYPH_EM is Sora 500's advance per glyph in em (measured 2026-10-10 in an
   .opt; no kerning between these glyphs, the sum is the rendered width to
   the pixel), so a unit's width is known when the card is built */
const EQ_PX = 12, OPT_ROOM = 266;                    // .f13-eq; the room inside an .opt at a 360-px phone
const GLYPH_EM = {
  0: 0.75, 1: 0.423, 2: 0.623, 3: 0.62, 4: 0.652, 5: 0.63, 6: 0.668, 7: 0.585, 8: 0.647, 9: 0.668,
  " ": 0.222, [NB]: 0.222, "(": 0.382, ")": 0.382, "+": 0.592, "−": 0.592, ",": 0.266, "/": 0.365,
  "=": 0.59, "×": 0.592, A: 0.775, P: 0.649, x: 0.574,
};
/* Fix A (11 Oct): an exponent is a <sup> now, not "^36". The tags take no
   room; the exponent's glyphs are drawn at the sup's own size, the browser's
   "smaller" (10 px on the .f13-eq's 12 px; the Fix A rule in css/styles.css
   changes only its line-height). Measured in an .opt: a sup's width is 0.833
   of the same digits at full size, so the unit is measured as it is drawn */
const SUP_EM = 0.834;
const glyphsEm = s => [...s].reduce((a, ch) => a + (GLYPH_EM[ch] ?? 0.8), 0);
const unitPx = s => {
  let em = 0;
  String(s).split(/(<sup>[\s\S]*?<\/sup>)/).forEach(part => {
    const m = /^<sup>([\s\S]*)<\/sup>$/.exec(part);
    em += m ? glyphsEm(m[1].replace(/<[^>]+>/g, "")) * SUP_EM : glyphsEm(part.replace(/<[^>]+>/g, ""));
  });
  return em * EQ_PX;
};
const fitsOption = s => unitPx(s) <= OPT_ROOM - 1;
const EQ = html => `<span class="f13-eq">${html}</span>`;
/* a term is ONE unbreakable unit, its amount and every car (f12 review 1),
   "5 500(1 + 0,14/2)^6 (1 + 0,12/12)^48", so a line never starts on a
   second car that reads like a new term. Only when that unit cannot fit a
   360-px option even at the .f13-eq size (cut) does the second car stand
   on its own, and then it says so: "× (1 + 0,12/12)^48". cut: true / false,
   or null to decide by the unit's own width */
function termUnits(t, lead = "", cut = null) {
  const cars = t.cars.map(carText), head = lead + coefText(t.c) + (cars[0] || "");
  const whole = [head, ...cars.slice(1)].join(" ");
  if (cars.length < 2 || !(cut == null ? !fitsOption(whole) : cut)) return [whole];
  return [head, ...cars.slice(1).map(c => `×${NB}${c}`)];
}
const unitsHtml = us => us.map(nw).join(" ");
/* finlib does the moving: amount × (1 + i/k)^e, car by car, nothing rounded */
const grow = (v, cars) => cars.reduce((a, c) => moveMoney(a, ratePerPeriod(toFrac(c.r), c.k), c.e), v);

/* a term: s = +1 / −1, c = the amount (a number) or "A" / "P" / "x", its
   cars, plus what it is (kind) and when (t) */
const payTerm = (sc, x) => ({ s: x.kind === "wd" ? -1 : 1, c: x.v, cars: carsOf(sc.roads, x.t, sc.meet), kind: x.kind, t: x.t });
const totalTerm = sc => ({ s: 1, c: sc.total.value != null ? sc.total.value : sc.total.role, cars: [], kind: "total", t: sc.total.t });
/* the tidy one equation: the total alone on the left, the payments on the
   right (deposits and repayments plus, a withdrawal minus) */
const oneEq = sc => ({ L: [totalTerm(sc)], R: sc.pays.map(x => payTerm(sc, x)) });

/* each term its own unit; a leading minus rides inside its term, the signs
   between terms stand alone (formulaHtml glues each to the unit after it).
   glue: what rides in front of the FIRST term ("A = "), cut: per term */
const firstLead = (t, j, glue) => (j === 0 ? glue + (t.s < 0 ? "−" : "") : "");
const piecesOf = (terms, glue = "", cut = []) => terms.map((t, j) => ({
  lead: j === 0 ? "" : (t.s < 0 ? "−" : "+"),
  units: termUnits(t, firstLead(t, j, glue), cut[j] ?? null),
}));
const piecesHtml = ps => ps.map(p => (p.lead ? `${p.lead} ` : "") + unitsHtml(p.units)).join(" ");
/* f12 review 1: a left side that is a single letter (A, or the loan P) rides
   with the FIRST right-hand term, "A = 5 500(1 + 0,14/2)^6 …", so "A =" never
   dangles at a line end. Anything else keeps the f10 rule: the "=" glues to
   the term BEFORE it ("1 000 000 =", "A(1 + 0,08/12)^72 =") */
const bareLeft = q => q.L.length === 1 && !q.L[0].cars.length && typeof q.L[0].c === "string" && q.L[0].s > 0;
const glueOf = q => (bareLeft(q) ? `${q.L[0].c} = ` : "");
/* which right-hand terms must cut, decided ONCE per card over all four
   options, so a term is cut the same way wherever it stands. The sign in
   front of a term rides in the same line piece as its unit (formulaHtml),
   so it is measured with it: "+ 4 000(…)" */
export function cutsOf(eqs) {
  return eqs[0].R.map((_, j) => eqs.some(q => {
    const t = q.R[j], sign = j === 0 ? "" : `${t.s < 0 ? "−" : "+"} `;
    return t.cars.length > 1 && !fitsOption(sign + termUnits(t, firstLead(t, j, glueOf(q)), false)[0]);
  }));
}
export function eqHtml(q, cut = cutsOf([q])) {
  const R = piecesHtml(piecesOf(q.R, glueOf(q), cut));
  if (bareLeft(q)) return EQ(R);
  const L = piecesOf(q.L), last = L[L.length - 1], us = last.units.slice();
  us[us.length - 1] += " =";
  return EQ(`${piecesHtml([...L.slice(0, -1), { ...last, units: us }])} ${R}`);
}

/* the value of the unknown, from the very numbers on the card */
function solve(sc) {
  const eq = oneEq(sc);
  const known = eq.R.filter(t => typeof t.c === "number").reduce((s, t) => s + t.s * grow(t.c, t.cars), 0);
  if (sc.unknown === "A" || sc.kind === "loan") return known;          // the total on the left is the unknown
  const u = eq.R.find(t => typeof t.c !== "number");                   // the unknown payment (P or x)
  return (sc.total.value - known) / (u.s * grow(1, u.cars));
}

/* the plan's three decoys, each ONE slip away from the right equation */
function decoysOf(sc) {
  const eq = oneEq(sc), R = eq.R, idx = R.map((t, j) => j);
  /* 1 · the sign: the withdrawal added; a loan: a repayment subtracted; no
     withdrawal: a deposit subtracted (a known amount where there is one) */
  let si = R.findIndex(t => t.kind === "wd");
  if (si < 0) {
    const nums = idx.filter(j => typeof R[j].c === "number");
    si = pick(nums.length ? nums : idx);
  }
  const sign = { L: eq.L, R: R.map((t, j) => (j === si ? { ...t, s: -t.s } : t)) };
  /* 2 · a car on the amount already standing on the meeting day: the
     payment on that day, else the total itself. The car drives over the
     whole road that touches the meeting day, forward */
  const rj = sc.meet === 0 ? 0 : sc.roads.length - 1, road = sc.roads[rj];
  const bogus = [{ j: rj, r: road.r, k: road.k, from: road.from, to: road.to, years: road.to - road.from, e: (road.to - road.from) * road.k }];
  const onDay = R.findIndex(t => t.t === sc.meet && !t.cars.length);
  const car = onDay >= 0
    ? { L: eq.L, R: R.map((t, j) => (j === onDay ? { ...t, cars: bogus } : t)) }
    : { L: [{ ...eq.L[0], cars: bogus }], R };
  /* 3 · the gear: one amount's exponents written with the wrong sign */
  const gi = pick(idx.filter(j => R[j].cars.length));
  const gear = { L: eq.L, R: R.map((t, j) => (j === gi ? { ...t, cars: t.cars.map(c => ({ ...c, e: -c.e })) } : t)) };
  return { eq, sign, car, gear };
}

/* ---------- the timeline (cards 1 to 3) ---------- */

/* the total FIRST (the bottom of a shared day's stack, right above its
   letter); an unknown total is "?" in its ring, a known one its amount
   WITH its letter (never a bare money label); x or P where a payment is
   the unknown; a withdrawal drawn "−R2 000" */
function graphOf(sc) {
  const T = sc.total;
  const tot = T.value == null ? { t: T.t, label: "?", role: T.role } : { t: T.t, amount: T.value, dp: 0, role: T.role };
  const pays = sc.pays.map(x => (typeof x.v === "number"
    ? { t: x.t, amount: x.v, dp: 0, ...(x.kind === "wd" ? { out: true } : {}) }
    : { t: x.t, label: x.v }));
  return {
    type: "timeline", n: sc.n, meet: sc.meet,
    nodes: [tot, ...pays],
    roads: sc.roads.map(r => ({ from: r.from, to: r.to, rate: `${r.r}% p.a.`, k: r.k })),
    leaders: true,
    /* f10 review 1: a deposit stacked above the "?" ring draws its own leader.
       Above a KNOWN total (David's wide "R300 000") the leader could not start
       under the narrower amount, so that stack stands as f8's did, unled */
    ...(T.value == null ? { stackLeaders: true } : {}),
  };
}
/* the engine's own label geometry: no two labels on different days within
   4 units of each other, and no stack leader running through a label */
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

/* ---------- a scene is honest ---------- */
function valid(sc) {
  const eq = oneEq(sc);
  if (eq.R.some(t => t.cars.some(c => Math.abs(c.e) < 2))) return false;           // never ^1 (f10 review 1)
  const nums = sc.pays.filter(x => typeof x.v === "number").map(x => x.v);
  if (new Set(nums).size !== nums.length) return false;                              // no two payments alike
  if (new Set(sc.pays.map(x => x.t)).size !== sc.pays.length) return false;          // one payment a day
  const v = solve(sc);
  if (!(Number.isFinite(v) && v > 1)) return false;                                  // positive and sensible
  if (v + (sc.down || 0) >= 1e7) return false;                                       // 9 digits to the cent: the keypad's room
  /* never on a rounding knife-edge: the calculator shows 10 digits, so the
     half-cent must sit further away than its display can blur */
  const cents = v * 100, blur = Math.pow(10, Math.floor(Math.log10(v)) - 9) * 100;
  if (Math.abs(cents - Math.floor(cents) - 0.5) < blur) return false;
  if (sc.kind === "loan" && !(v < nums.reduce((s, x) => s + x, 0))) return false;  // a loan smaller than its repayments
  if (sc.down != null && !(sc.down * 1.25 <= v)) return false;                       // the down payment a part of the price
  const g = graphOf(sc);
  return fits(g) && verifyTimeline(g).every(c => c.ok);                             // to scale, the engine's own word
}
function roll(make, fix) {
  for (let tries = 0; tries < 300; tries++) { const sc = make(); if (valid(sc)) return sc; }
  return fix();                                                                      // a bank example, hand-checked
}

/* ---------- the words ---------- */

function rateSentence(roads) {
  const one = r => afL(`${paU(r.r)} compounded ${HOW(r.k)}`, `${paU(r.r)} ${HOW(r.k)} saamgestel`);
  const [a, b] = roads;
  return b ? afL(`The interest rate is ${one(a)} for the first ${years(a.to)}, then ${one(b)}.`, `Die rentekoers is ${one(a)} vir die eerste ${years(a.to)}, dan ${one(b)}.`) : afL(`The interest rate is ${one(a)}.`, `Die rentekoers is ${one(a)}.`);
}
const at = x => (typeof x.v === "number" ? `${money(x.v)} ${when(x.t)}` : `an amount ${x.v} ${when(x.t)}`);

function story(sc) {
  const p = WHO[sc.name], He = cap(p.he), N = sc.name;
  const deps = sc.pays.filter(x => x.kind === "dep"), wds = sc.pays.filter(x => x.kind === "wd"), reps = sc.pays.filter(x => x.kind === "repay");
  const rate = rateSentence(sc.roads);
  const sameDay = sc.pays.some(x => x.t === sc.n && sc.kind === "save");
  switch (sc.fam) {
    case "targetAmount":
      return afL(`${N} wants ${money(sc.total.value)} in a savings account after ${years(sc.n)}. That is the total, A. ${rate} How much, P, must ${p.he} deposit now?`, `${N} wil ${money(sc.total.value)} na ${years(sc.n)} in 'n spaarrekening hê. Dit is die totaal, A. ${rate} Hoeveel, P, moet ${p.he} nou deponeer?`);
    case "hirePurchase": {
      const a = /^[aeiou]/i.test(sc.item) ? afL("an", "'n") : afL("a", "'n");
      return afL(`${N} buys ${a} ${sc.item}. ${He} pays a down payment of ${money(sc.down)} straight to the shop and borrows the rest. The loan, P, is the total. ${He} pays it off with two repayments: ${andList(reps.map(at))}. ${rate} Find the loan, P, and then the price of the ${sc.item}.`, `${N} koop ${a} ${sc.item}. ${He} betaal 'n aanbetaling van ${money(sc.down)} reguit aan die winkel en leen die res. Die lening, P, is die totaal. ${He} betaal dit af met twee terugbetalings: ${andList(reps.map(at))}. ${rate} Vind die lening, P, en dan die prys van die ${sc.item}.`);
    }
    case "loanTwoRepayments":
      return afL(`${N} borrows money now. The loan, P, is the total. ${He} pays it off with two repayments: ${andList(reps.map(at))}. ${rate} How much did ${p.he} borrow?`, `${N} leen nou geld. Die lening, P, is die totaal. ${He} betaal dit af met twee terugbetalings: ${andList(reps.map(at))}. ${rate} Hoeveel het ${p.he} geleen?`);
    case "unknownPayment":
      return afL(`${N} opens a savings account. ${He} deposits ${andList(deps.map(at))}. ${He} wants ${money(sc.total.value)} in the account after ${years(sc.n)}, straight after the last deposit. That is the total, A. ${rate} Find x.`, `${N} open 'n spaarrekening. ${He} deponeer ${andList(deps.map(at))}. ${He} wil ${money(sc.total.value)} na ${years(sc.n)} in die rekening hê, net na die laaste deposito. Dit is die totaal, A. ${rate} Vind x.`);
    default: {                                                        // twoDeposits, withdrawal, mixed: find A
      const out = wds.length ? afL(` ${He} withdraws ${andList(wds.map(at))}.`, ` ${He} onttrek ${andList(wds.map(at))}.`) : "";
      return afL(`${N} opens a savings account. ${He} deposits ${andList(deps.map(at))}.${out} ${rate} How much is in the account after ${years(sc.n)}${sameDay ? ", straight after the last deposit" : ""}? That is the total, A.`, `${N} open 'n spaarrekening. ${He} deponeer ${andList(deps.map(at))}.${out} ${rate} Hoeveel is in die rekening na ${years(sc.n)}${sameDay ? ", net na die laaste deposito" : ""}? Dit is die totaal, A.`);
    }
  }
}

const dayOf = sc => (sc.kind === "loan" ? afL("the day of the loan", "die dag van die lening") : afL("the day of A", "die dag van A"));
const WHAT = { dep: afL("the deposit", "die deposito"), wd: afL("the withdrawal", "die onttrekking"), repay: afL("the repayment", "die terugbetaling") };

/* "3 years × 12 times a year = 36", one per car, with the stretch of the
   line it drives over (two roads may share a rate) */
function carNote(t) {
  if (!t.cars.length) return "no car: it already stands on the meeting day";
  const legs = t.cars.map(c => {
    const span = c.e < 0 ? `T${c.to} to T${c.from}` : `T${c.from} to T${c.to}`;
    /* the whole sum is ONE unit: formulaHtml makes each number an inline-block,
       and a line may break before one even after a no-break space, so f10's
       glue alone left "3 years ×" at a line end at 360 px */
    const sum = nw(`${yrs(c.years)} × ${perYear(c.k)} = ${c.years * c.k}`);
    return `${span}: ${sum}${c.e < 0 ? `, written ${nw(`−${c.years * c.k}`)}` : ""}`;
  });
  return `${t.cars[0].e < 0 ? "reverse gear" : "forward gear"}, ${t.cars.length > 1 ? "one car per road; " : ""}${legs.join("; ")}`;
}
function termLine(t) {
  const sign = t.s < 0 ? "−" : "+";
  const who = typeof t.c === "number" ? `${cap(WHAT[t.kind])} of ${money(t.c)} at T${t.t}` : `${cap(WHAT[t.kind])} ${t.c} at T${t.t}`;
  const io = t.kind === "wd" ? "comes OUT, so minus" : t.kind === "repay" ? "stands positive on the right" : "goes IN, so plus";
  return { s: `${who} ${io}: ${EQ(unitsHtml(termUnits(t, sign)))}`, r: carNote(t) };
}
function meetLine(sc) {
  return {
    /* Fix A review: a plain sentence, never in brackets (as f10): formulaHtml read "(a car is …)" as a formula
       bracket and left its "(" alone at a line end at 360 px */
    s: afL(`The meeting day is T${sc.meet}, ${dayOf(sc)}. Every amount drives there in its car: ${CAR_IS}.`, `Die ontmoetingsdag is T${sc.meet}, ${dayOf(sc)}. Elke bedrag ry in sy kar daarheen: ${CAR_IS}.`),
    r: sc.kind === "loan" ? afL("back to T0: reverse gear, negative exponents", "terug na T0: trurat, negatiewe eksponente") : afL("everything moves forward to the end, so every exponent is positive", "alles skuif vorentoe na die einde, dus is elke eksponent positief"),
  };
}
function leftNote(sc) {
  if (sc.kind === "loan") return afL("the loan, P, alone on the left; the repayments positive on the right", "die lening, P, alleen links; die terugbetalings positief regs");
  if (sc.total.value != null) return afL("the total, A, alone on the left, even though it is known", "die totaal, A, alleen links, al is dit bekend");
  return afL("the total, A, alone on the left; a deposit plus, a withdrawal minus", "die totaal, A, alleen links; 'n deposito plus, 'n onttrekking minus");
}
const unknownOf = sc => (sc.kind === "loan" ? afL("P", "P") : sc.unknown);
const solves = sc => sc.total.value != null;                          // the unknown is a payment inside the line

/* ---------- one card ---------- */
function build(sc, { timeline = false } = {}) {
  const D = decoysOf(sc), eq = D.eq, cut = cutsOf([eq, D.sign, D.car, D.gear]);
  const right = eqHtml(eq, cut), wrongs = [D.sign, D.car, D.gear].map(d => eqHtml(d, cut));
  if (new Set([right, ...wrongs]).size !== 4) throw new Error("f13: two options coincide");   // never reached: each decoy is one different slip
  const val = solve(sc), U = unknownOf(sc), p = WHO[sc.name];
  const price = sc.down != null ? val + sc.down : null;
  const hint1 = sc.kind === "loan"
    ? afL("The loan, P, alone on the left. Every repayment drives back to T0 in reverse gear (a negative exponent) and stands positive on the right.", "Die lening, P, alleen links. Elke terugbetaling ry in trurat terug na T0 ('n negatiewe eksponent) en staan positief regs.")
    : afL("The total alone on the left. Every other amount drives to the meeting day in forward gear: a deposit plus, a withdrawal minus. Already on the meeting day? No car.", "Die totaal alleen links. Elke ander bedrag ry vorentoe na die ontmoetingsdag: 'n deposito plus, 'n onttrekking minus. Reeds op die ontmoetingsdag? Geen kar nie.");
  const ask = sc.kind === "loan" ? afL("How much is the loan, P?", "Hoeveel is die lening, P?")
    : sc.unknown === "A" ? afL("How much is A?", "Hoeveel is A?")
    : sc.unknown === "x" ? afL(`${U} sits inside the one equation: SHIFT SOLVE finds it. How much is x?`, `${U} sit binne-in die een vergelyking: SHIFT SOLVE vind dit. Hoeveel is x?`)
    : afL(`${U} sits inside the one equation: SHIFT SOLVE finds it. How much must ${p.he} deposit now?`, `${U} sit binne-in die een vergelyking: SHIFT SOLVE vind dit. Hoeveel moet ${p.he} nou deponeer?`);
  const steps = [
    mcStep(afL(`The meeting day is T${sc.meet}, ${dayOf(sc)}. Which line is the one equation?`, `Die ontmoetingsdag is T${sc.meet}, ${dayOf(sc)}. Watter reël is die een vergelyking?`), right, wrongs, hint1),
    typed(afL(`${ask} Give it in rand, to ${DP2}.`, `${ask} Gee dit in rand, tot ${DP2}.`), val,
      solves(sc) ? afL("Type the whole equation, then SHIFT SOLVE. Never round along the way: round once, at the end.", "Tik die hele vergelyking in, dan SHIFT SOLVE. Moenie langs die pad afrond nie: rond een keer af, aan die einde.")
        : afL("Type the whole right side in one go. Never round along the way: round once, at the end.", "Tik die hele regterkant in een slag in. Moenie langs die pad afrond nie: rond een keer af, aan die einde.")),
  ];
  if (price != null) steps.push(typed(afL(`Price = loan + down${NB}payment. What is the price of the ${sc.item}, in rand, to ${DP2}?`, `Prys = lening +${NB}aanbetaling. Wat is die prys van die ${sc.item}, in rand, tot ${DP2}?`), price,
    afL("The down payment never enters the account: it just adds on to the loan.", "Die aanbetaling kom nooit in die rekening nie: dit tel net by die lening by.")));
  const answer = nw(`${U} = ${rands(val, 2)}`);
  const solution = [
    meetLine(sc),
    ...eq.R.map(termLine),
    { s: afL(`The one equation: ${right}`, `Die een vergelyking: ${right}`), r: leftNote(sc) },
    { s: answer, r: afL(`${solves(sc) ? "SHIFT SOLVE on the one line" : "typed in once"}, rounded once, at the end (${DP2})`, `${solves(sc) ? "SHIFT SOLVE op die een reël" : "een keer ingetik"}, een keer afgerond, aan die einde (${DP2})`) },
  ];
  if (price != null) solution.push({
    s: `Price${NB}= loan +${NB}down${NB}payment${NB}= ${nw(amt2(val))} ${nw(`+ ${amt0(sc.down)} = ${rands(price, 2)}`)}`,
    r: "the down payment never enters the account: no car, no sign",
  });
  solution.push({ s: REFRAIN });
  return {
    type: "steps", concept: CON,
    prompt: story(sc),
    ...(timeline ? { graph: graphOf(sc), graphCap: CAPTION } : {}),
    steps,
    expected: price != null ? price : val, dp: 2,
    hint: afL("Meeting day, cars, then ONE line: the total alone on the left, the payments on the right. Type it once, round once.", "Ontmoetingsdag, karre, dan EEN reël: die totaal alleen links, die paaiemente regs. Tik dit een keer in, rond een keer af."),
    answerLabel: price != null ? afL(`${answer}, so the price is ${money(price, 2)}`, `${answer}, dus is die prys ${money(price, 2)}`) : answer,
    solution,
  };
}

/* ---------- the seven families (bank shapes, rolled numbers) ---------- */
const saveScene = (fam, name, n, roads, pays, extra = {}) => ({
  fam, name, kind: "save", n, meet: n, roads, total: { t: n, role: "A", value: null }, unknown: "A", pays, ...extra,
});
const loanScene = (fam, name, n, roads, pays, extra = {}) => ({
  fam, name, kind: "loan", n, meet: 0, roads, total: { t: 0, role: afL("P", "P"), value: null }, unknown: afL("P", "P"), pays, ...extra,
});
const dep = (t, v) => ({ t, v, kind: "dep" }), wd = (t, v) => ({ t, v, kind: "wd" }), repay = (t, v) => ({ t, v, kind: "repay" });

/* the bank examples, hand-checked: the fallback if a roll loop ever misses */
const FIX = {
  twoDeposits: () => saveScene("twoDeposits", "Brenda", 7, [{ from: 0, to: 3, r: 14, k: 2 }, { from: 3, to: 7, r: 12, k: 12 }], [dep(0, 5500), dep(5, 4000)]),
  withdrawal: () => saveScene("withdrawal", "Bradley", 6, [{ from: 0, to: 6, r: 8, k: 12 }], [dep(0, 14000), wd(2, 2000)]),
  mixed: () => saveScene("mixed", "Mandy", 7, [{ from: 0, to: 3, r: 8, k: 12 }, { from: 3, to: 7, r: 9, k: 4 }], [dep(0, 5000), dep(2, 6000), wd(5, 3000)]),
  loanTwoRepayments: () => loanScene("loanTwoRepayments", "Brian", 6, [{ from: 0, to: 4, r: 16, k: 4 }, { from: 4, to: 6, r: 14, k: 2 }], [repay(4, 5000), repay(6, 6000)]),
  targetAmount: () => ({ ...saveScene("targetAmount", "Bob", 10, [{ from: 0, to: 4, r: 18, k: 12 }, { from: 4, to: 10, r: 20, k: 4 }], [dep(0, afL("P", "P"))]), total: { t: 10, role: "A", value: 1000000 }, unknown: afL("P", "P") }),
  hirePurchase: () => loanScene("hirePurchase", "Arnold", 4, [{ from: 0, to: 2, r: 18, k: 12 }, { from: 2, to: 4, r: 19, k: 12 }], [repay(2, 8000), repay(4, 9000)], { down: 6000, item: afL("lounge suite", "sitkamerstel") }),
  /* David's bank shape keeps 18% and changes only the compounding; a road is
     drawn as its rate, so the fallback changes the rate as every roll does */
  unknownPayment: () => ({ ...saveScene("unknownPayment", "David", 7, [{ from: 0, to: 3, r: 18, k: 12 }, { from: 3, to: 7, r: 16, k: 2 }], [dep(0, 30000), dep(5, "x"), dep(7, 50000)]), total: { t: 7, role: "A", value: 300000 }, unknown: "x" }),
};

/* Brenda (two deposits) or Mvelo (three, the last on the day of A); one rate change; find A */
function twoDepositsScene() {
  return roll(() => {
    const mvelo = rng() < 0.5, n = randInt(mvelo ? 5 : 4, 10), m = randInt(1, n - 1);
    const vals = shuffled(DEP_AMTS).slice(0, mvelo ? 3 : 2), times = mvelo ? [0, m, n] : [0, m];
    return saveScene("twoDeposits", mvelo ? afL("Mvelo", "Mvelo") : "Brenda", n, rollRoads(n, true), times.map((t, j) => dep(t, vals[j])));
  }, FIX.twoDeposits);
}
/* Bradley / Jason: a deposit, then a withdrawal; one rate; find A */
function withdrawalScene() {
  return roll(() => {
    const n = randInt(4, 8), d = pick(BIG_DEP), w = pick(WD_AMTS.filter(v => v <= d / 2));
    return saveScene("withdrawal", pick(["Bradley", "Jason"]), n, rollRoads(n, false), [dep(0, d), wd(randInt(1, n - 1), w)]);
  }, FIX.withdrawal);
}
/* Mandy: two deposits and a withdrawal, a rate change; find A */
function mixedScene() {
  return roll(() => {
    const n = randInt(5, 10), a = randInt(1, n - 3), b = randInt(a + 1, n - 1);
    const [d0, d1] = shuffled(DEP_AMTS).slice(0, 2), w = pick(WD_AMTS.filter(v => v < Math.min(d0, d1)));
    return saveScene("mixed", "Mandy", n, rollRoads(n, true), [dep(0, d0), dep(a, d1), wd(b, w)]);
  }, FIX.mixed);
}
/* Brian / Stephanie: a loan at T0 paid off with two repayments (the last
   one ends it), a rate change; find P */
function loanTwoRepaymentsScene() {
  return roll(() => {
    const n = randInt(4, 10), a = randInt(1, n - 1), [v0, v1] = shuffled(REPAY_AMTS).slice(0, 2);
    return loanScene("loanTwoRepayments", pick(["Brian", "Stephanie"]), n, rollRoads(n, true), [repay(a, v0), repay(n, v1)]);
  }, FIX.loanTwoRepayments);
}
/* Bob: a known total A at the end, two rates; find the deposit P now */
function targetAmountScene() {
  return roll(() => {
    const n = randInt(5, 10);
    return { ...saveScene("targetAmount", "Bob", n, rollRoads(n, true), [dep(0, afL("P", "P"))]), total: { t: n, role: "A", value: pick(TARGETS) }, unknown: afL("P", "P") };
  }, FIX.targetAmount);
}
/* Arnold: a down payment straight to the shop, the loan paid off with two
   repayments, two rates; find the loan, then the price */
function hirePurchaseScene() {
  return roll(() => {
    const n = randInt(4, 8), a = randInt(1, n - 1), [v0, v1] = shuffled(REPAY_AMTS).slice(0, 2);
    return loanScene("hirePurchase", "Arnold", n, rollRoads(n, true), [repay(a, v0), repay(n, v1)], { down: pick(DOWNS), item: pick(ITEMS) });
  }, FIX.hirePurchase);
}
/* David: a deposit now, x in the middle, a deposit on the day of A, and a
   known total A; a rate change; find x. A is rolled UP to a round R10 000
   from a guessed x, so x comes out a little over the guess, positive */
function unknownPaymentScene() {
  return roll(() => {
    const n = randInt(5, 10), m = randInt(1, n - 1), roads = rollRoads(n, true);
    const d0 = pick(D0_AMTS), dEnd = pick(DEND_AMTS.filter(v => v !== d0)), xg = pick(XGUESS);
    const raw = grow(d0, carsOf(roads, 0, n)) + grow(xg, carsOf(roads, m, n)) + dEnd;
    const A = Math.ceil(raw / 10000) * 10000;
    return { ...saveScene("unknownPayment", "David", n, roads, [dep(0, d0), dep(m, "x"), dep(n, dEnd)]), total: { t: n, role: "A", value: A }, unknown: "x" };
  }, FIX.unknownPayment);
}

/* the SCENE makers, exported 2026-10-11 for f12 "Build the timeline" (its
   brief: f12 must not invent a second timeline model). Each one is the roll
   the family always did, a pure function of the rng; a family below is
   build(its scene, opts), the same rng calls in the same order as before, so
   every f13 card rolls byte-for-byte what it did. With story() (the
   paragraph's words) and graphOf() (the timeline spec of a scene), f12 deals
   these very scenes and finishes on the very drawing f13 starts from. */
export const F13_SCENES = {
  twoDeposits: twoDepositsScene, withdrawal: withdrawalScene, mixed: mixedScene,
  loanTwoRepayments: loanTwoRepaymentsScene, targetAmount: targetAmountScene,
  hirePurchase: hirePurchaseScene, unknownPayment: unknownPaymentScene,
};
export { story as f13Story, graphOf as f13GraphOf };
function twoDeposits(opts) { return build(twoDepositsScene(), opts); }
function withdrawal(opts) { return build(withdrawalScene(), opts); }
function mixed(opts) { return build(mixedScene(), opts); }
function loanTwoRepayments(opts) { return build(loanTwoRepaymentsScene(), opts); }
function targetAmount(opts) { return build(targetAmountScene(), opts); }
function hirePurchase(opts) { return build(hirePurchaseScene(), opts); }
function unknownPayment(opts) { return build(unknownPaymentScene(), opts); }

/* for the Exam Focus "timeline-equation" tile (not built yet): each maker
   takes { timeline: true | false } and is a pure function of the rng */
export const F13_FAMILIES = { twoDeposits, withdrawal, mixed, loanTwoRepayments, targetAmount, hirePurchase, unknownPayment };

/* ---------- the round, in dealing order (the fade follows the index) ---------- */
/* the timeline shows on cards 1 to 3 only (0-based position < 3) */
export const timelineAt = pos => pos < 3;
const ROUND = [
  ["twoDeposits", twoDeposits],               // card 1 · timeline
  ["withdrawal", withdrawal],                 // card 2 · timeline
  ["loanTwoRepayments", loanTwoRepayments],   // card 3 · timeline
  ["mixed", mixed],                           // card 4 · no timeline from here on
  ["targetAmount", targetAmount],             // card 5
  ["loanAgain", loanTwoRepayments],           // card 6 · a loan again, now without its picture
  ["hirePurchase", hirePurchase],             // card 7 · three steps: the equation, the loan, the price
  ["unknownPayment", unknownPayment],         // card 8
];

export const questF13 = {
  id: "f13",
  skills: ROUND.map(([id, make], pos) => ({ id, concept: CON, gen: () => make({ timeline: timelineAt(pos) }) })),
};
