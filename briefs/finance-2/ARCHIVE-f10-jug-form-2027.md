# f10 jug form: built 10 Oct 2026, archived 11 Oct 2026 for the 2027 build

Why parked (her ruling, 11 Oct 11:29 and 11:35): "jug form first, then tidy it: move the minuses across"
is how she will teach it in 2027, after a proper discovery lesson. This year's class was crammed and never
did discovery, so a form she showed once would confuse them; this year f10 keeps the TAUGHT form only
(the total alone on the left, the payments on the right).

Where it lived: round f10 "In or out?" in Blipwork (maths-homework-quest), built in commit `55e5c6a`
(10 Oct, "jug form first, then the tidy step") and reviewed in commit `cf85183` (10 Oct, "the equals sign
never alone, same-day deposit readable, saving refrain"). Everything below is copied from `cf85183`;
`git show cf85183:js/quests/questf10-in-or-out.js` has the whole file (scenes, `eqHtml`, `story`,
`termLine`, `meetLine`), and `git show cf85183:js/quests/_finance-check.js` the harness checks.
Exponents were still written with a caret then (Fix A, 11 Oct, turned them into real superscripts
through `pow()` in `js/finlib.js`); a 2027 rebuild writes every car through `pow()`.

## The idea in one breath

The account is a jug. Money that goes IN is plus (a deposit, and the loan itself); money that comes OUT is
minus (a withdrawal, every repayment). A down payment never enters the account. The JUG form moves every
amount to the meeting day (always the LAST T, so every car is forward gear) and writes it all on ONE side:
a loan ends empty, so it equals 0; saving ends holding the total, so it equals A. Then the TIDY step: move
the minuses across, so the payments stand positive on the right (a withdrawal keeps its minus).

    P(1 + 0,12/12)^36 − 8 000(1 + 0,12/12)^24 − 9 000 = 0        (jug form, a loan)
    14 000(1 + 0,08/4)^20 − 2 000(1 + 0,08/4)^8 = A               (jug form, saving)
    P(1 + 0,12/12)^36 = 8 000(1 + 0,12/12)^24 + 9 000             (tidy form)

## The three jug cards, learner wording (as dealt, cards 1 to 3)

The round dealt: jugCorrect, jugWrong, tidy, withdrawal, inOrOutWord, interestPaid, tidyLoan, signOnTimeline.
Each card drew the f9-style timeline (meeting-day flag on the last T, one rate road, the total "?" in its
ring with its letter: P at T0, A at the end; a withdrawal drawn "−R2 000" in the money-out red).

**Card 1, `jugCorrect` (yes/no, always YES; 60% a loan, 40% saving)**
- Prompt: `<story> The meeting day is T<n>. She moves every amount there and writes it all on one side:`
  then the jug-form equation on its own line, then `Is this equation correct?`
- Hint: `Check every sign. Does the amount go IN (plus) or come OUT (minus)?`
- Answer: `Yes: in is plus, out is minus, and every sign is right`
- Worked solution: the meeting-day line (`The meeting day is T<n>. Every amount drives there in its car,
  in forward gear (a car is the (1 + i)^n bracket that moves an amount to the meeting day).`, reason
  `<y> years × <k> times a year = <e>`); one line per term (`The loan, P, goes IN, so plus: +P(…)^36`,
  `The repayment at T1, R8 000, comes OUT, so minus: −8 000(…)^24`, reason `a car from T1 to T3: 2 years × 12 = 24`
  or `no car: it already stands on the meeting day`); the end line (`The loan is paid off, so the jug ends
  empty: it equals 0.` / `The jug ends holding the total: it equals A.`); the tidy line; the refrain.

**Card 2, `jugWrong` (yes/no, always NO: the jug form with ONE sign slipped)**
- Prompt and hint: the same as card 1.
- The slip: a loan, a repayment added (3 in 4) or the loan subtracted; saving, the withdrawal added or a
  deposit subtracted (half each).
- Answer: `No: <the loan, P, | the repayment at T1 | the withdrawal at T3 | the deposit at T0> needs <a plus, not a minus | a minus, not a plus>`
- Worked solution: `The slip: R8 000 at T1 is the repayment. It comes OUT, so it needs a minus, not a plus.`
  (reason `out is minus` / `in is plus`; for the loan: `The slip: P is the loan. It goes IN, so it needs a plus, not a minus.`),
  `The right jug form: <equation>` (reason `the loan is paid off: it equals 0` / `the jug ends holding the
  total: it equals A`), the tidy line, the refrain.

**Card 3, `tidy` (mc, always a loan with 2 repayments): the "tidy it" step**
- Prompt: `<story> The meeting day is T<n>. The jug form:` then the jug form on its own line, then
  `Tidy it: move the minuses across. Which line is the tidy form?`
- Options: the tidy form, plus three of: every minus kept on the right; one term moved without changing its
  sign; a repayment's car dropped; the loan's car dropped; the other term kept its minus.
- Hint: `A minus that crosses the equals sign turns into a plus. Every car stays where it is.`
- Worked solution: `The jug form: <equation>` (reason `the loan in (plus), the repayments out (minus)`);
  per repayment `The repayment at T1 crosses the equals sign: −8 000(…)^24 becomes +8 000(…)^24` (reason
  `its car stays` / `no car: it stands on the meeting day`, the first one adding what a car is);
  `Tidy: <tidy form>` (reason `the payments stand positive on the right`); the loan refrain.

**The tidy line** (closing every jug card's solution, by kind):
- a loan: `Tidy: move the minuses across: <tidy form>`, reason `the payments stand positive on the right`
- saving: `Tidy: the total on its own: <tidy form>`, reason `the withdrawal keeps its minus`

**The refrains** (every f10 solution ended on one, by kind; review 1 made the closing line kind-specific):
- a loan: `Deposits and the loan go IN. Withdrawals and repayments come OUT. Tidy: payments positive on the right.`
- saving: `Deposits and the loan go IN. Withdrawals and repayments come OUT. Tidy: deposits plus, the withdrawal minus, A on the left.`

## The gens, as they stand in `cf85183`

Refrains and helpers:

```js
const CON = "inOrOut";
/* the refrain: its closing line depends on the kind (f10 review 1) */
const REFRAIN_HEAD = "Deposits and the loan go IN. Withdrawals and repayments come OUT.";
export const REFRAIN = `${REFRAIN_HEAD} Tidy: payments positive on the right.`;                       // a loan
export const REFRAIN_SAVING = `${REFRAIN_HEAD} Tidy: deposits plus, the withdrawal minus, A on the left.`;
const refrain = loan => ({ s: loan ? REFRAIN : REFRAIN_SAVING });
const IN_KINDS = new Set(["dep", "loan"]);
const termOf = (sc, x) => ({ s: IN_KINDS.has(x.kind) ? 1 : -1, c: x.v, e: (sc.n - x.t) * sc.k, kind: x.kind, t: x.t });
const loanTerm = sc => ({ s: 1, c: "P", e: sc.n * sc.k, kind: "loan", t: 0 });
const totalA = sc => ({ s: 1, c: "A", e: 0, kind: "total", t: sc.n });

/* the JUG form: everything on one side, = 0 (a loan) or = A (saving) */
const jugOf = sc => (sc.loan
  ? { L: [loanTerm(sc), ...sc.pays.map(x => termOf(sc, x))], R: [] }
  : { L: sc.pays.map(x => termOf(sc, x)), R: [totalA(sc)] });
/* the TIDY form: the total's term alone on the left, the payments on the
   right (a repayment turns positive; a withdrawal keeps its minus) */
const tidyOf = sc => (sc.loan
  ? { L: [loanTerm(sc)], R: sc.pays.map(x => ({ ...termOf(sc, x), s: 1 })) }
  : { L: [totalA(sc)], R: sc.pays.map(x => termOf(sc, x)) });
/* ---------- the worked solutions ---------- */

const WHAT = { loan: "the loan", repay: "the repayment", dep: "the deposit", wd: "the withdrawal" };
/* one line per term: what it is, in or out, and its car */
function termLine(sc, t) {
  const io = t.s > 0 ? "goes IN, so plus" : "comes OUT, so minus";
  const who = t.kind === "loan" ? "The loan, P," : `${cap(WHAT[t.kind])} at T${t.t}, ${money(t.c)},`;
  return {
    s: `${who} ${io}: ${nw((t.s < 0 ? "−" : "+") + termText(sc, t))}`,
    r: t.e ? `a car from T${t.t} to T${sc.n}: ${carSum(sc.n - t.t, sc.k)}` : "no car: it already stands on the meeting day",
  };
}
/* the first line of a worked solution: the meeting day, what a car is, and
   the exponent the way the learner sees it, on the longest trip (the loan
   from T0, or the first deposit) */
function meetLine(sc) {
  const y = sc.loan ? sc.n : sc.n - Math.min(...sc.pays.filter(x => x.kind === "dep").map(x => x.t));
  return {
    s: `The meeting day is T${sc.n}. Every amount drives there in its car, in forward gear (${CAR_IS}).`,
    r: `${yrs(y)} × ${perYear(sc.k)} = ${y * sc.k}`,
  };
}
const tidyLine = sc => (sc.loan
  ? { s: `Tidy: move the minuses across: ${eqHtml(sc, tidyOf(sc))}`, r: "the payments stand positive on the right" }
  : { s: `Tidy: the total on its own: ${eqHtml(sc, tidyOf(sc))}`, r: "the withdrawal keeps its minus" });
/* the jug form's right side in words (an "=" never stands alone) */
const endLine = sc => (sc.loan
  ? { s: "The loan is paid off, so the jug ends empty: it equals 0." }
  : { s: "The jug ends holding the total: it equals A." });
```

The three cards:

```js
/* ---------- the skills ---------- */

/* yesno, always YES: the jug form, every sign right (60% a loan, 40% saving) */
function jugCorrect() {
  const sc = rng() < 0.6 ? loanScene(randInt(2, 3)) : saveScene(randInt(1, 2));
  const jug = jugOf(sc);
  return {
    type: "yesno", concept: CON,
    prompt: `${story(sc)} The meeting day is T${sc.n}. ${cap(sc.p.he)} moves every amount there and writes it all on one side:<br>${eqHtml(sc, jug)}<br>Is this equation correct?`,
    yes: true,
    graph: graphOf(sc), graphCap: CAPTION,
    hint: "Check every sign. Does the amount go IN (plus) or come OUT (minus)?",
    answerLabel: "Yes: in is plus, out is minus, and every sign is right",
    solution: [meetLine(sc), ...jug.L.map(t => termLine(sc, t)), endLine(sc), tidyLine(sc), refrain(sc.loan)],
  };
}

/* yesno, always NO: the jug form with ONE sign slipped. A loan: a repayment
   added (3 in 4) or the loan subtracted; saving: the withdrawal added or a
   deposit subtracted (half each) */
function jugWrong() {
  const sc = rng() < 0.6 ? loanScene(randInt(2, 3)) : saveScene(randInt(1, 2));
  const jug = jugOf(sc);
  let idx;
  if (sc.loan) idx = rng() < 0.75 ? randInt(1, jug.L.length - 1) : 0;
  else {
    const wd = jug.L.findIndex(t => t.kind === "wd");
    idx = rng() < 0.5 ? wd : pick(jug.L.map((t, j) => j).filter(j => j !== wd));
  }
  const slip = jug.L[idx];
  const shown = { L: jug.L.map((t, j) => (j === idx ? { ...t, s: -t.s } : t)), R: jug.R };
  const need = slip.s > 0 ? "a plus, not a minus" : "a minus, not a plus";
  const who = slip.kind === "loan" ? "P is the loan. It goes IN" : `${money(slip.c)} at T${slip.t} is ${WHAT[slip.kind]}. It ${slip.s > 0 ? "goes IN" : "comes OUT"}`;
  return {
    type: "yesno", concept: CON,
    prompt: `${story(sc)} The meeting day is T${sc.n}. ${cap(sc.p.he)} moves every amount there and writes it all on one side:<br>${eqHtml(sc, shown)}<br>Is this equation correct?`,
    yes: false,
    graph: graphOf(sc), graphCap: CAPTION,
    hint: "Check every sign. Does the amount go IN (plus) or come OUT (minus)?",
    answerLabel: `No: ${slip.kind === "loan" ? "the loan, P," : `${WHAT[slip.kind]} at T${slip.t}`} needs ${need}`,
    solution: [
      { s: `The slip: ${who}, so it needs ${need}.`, r: slip.s > 0 ? "in is plus" : "out is minus" },
      { s: `The right jug form: ${eqHtml(sc, jug)}`, r: sc.loan ? "the loan is paid off: it equals 0" : "the jug ends holding the total: it equals A" },
      tidyLine(sc),
      refrain(sc.loan),
    ],
  };
}

/* mc: tidy the jug form of a loan. Decoys: a minus kept on every moved
   term, one term moved without changing its sign, a car dropped */
function tidy() {
  const sc = loanScene(2);
  const jug = jugOf(sc), right = tidyOf(sc);
  const R = right.R;
  const one = randInt(0, R.length - 1);
  const withCar = R.map((t, j) => j).filter(j => R[j].e);
  const drop = withCar.length ? pick(withCar) : null;
  const cands = [
    { L: right.L, R: R.map(t => ({ ...t, s: -1 })) },                                   // every minus kept
    { L: right.L, R: R.map((t, j) => (j === one ? { ...t, s: -1 } : t)) },              // one moved without its sign changing
    drop == null ? null : { L: right.L, R: R.map((t, j) => (j === drop ? { ...t, e: 0 } : t)) },   // a repayment's car dropped
    { L: [{ ...right.L[0], e: 0 }], R },                                                 // the loan's car dropped
    { L: right.L, R: R.map((t, j) => (j === 1 - one ? { ...t, s: -1 } : t)) },          // the other one kept its minus
  ];
  const wrongs = decoysOf(right, cands).map(d => eqHtml(sc, d));
  return mc(CON,
    `${story(sc)} The meeting day is T${sc.n}. The jug form:<br>${eqHtml(sc, jug)}<br>Tidy it: move the minuses across. Which line is the tidy form?`,
    eqHtml(sc, right), wrongs, {
      graph: graphOf(sc), graphCap: CAPTION,
      hint: "A minus that crosses the equals sign turns into a plus. Every car stays where it is.",
      solution: [
        { s: `The jug form: ${eqHtml(sc, jug)}`, r: "the loan in (plus), the repayments out (minus)" },
        ...R.map((t, j) => ({ s: `${cap(WHAT[t.kind])} at T${t.t} crosses the equals sign: ${nw("−" + termText(sc, t))} becomes ${nw("+" + termText(sc, t))}`,
          r: (t.e ? "its car stays" : "no car: it stands on the meeting day") + (j === 0 ? ` (${CAR_IS})` : "") })),
        { s: `Tidy: ${eqHtml(sc, right)}`, r: "the payments stand positive on the right" },
        refrain(true),
      ],
    });
}
```

Their place in the round:

```js
/* ---------- the round, in dealing order ---------- */
const ROUND = [
  ["jugCorrect", jugCorrect],           // card 1 · yes: the jug form is right
  ["jugWrong", jugWrong],               // card 2 · no: one sign slipped
  ["tidy", tidy],                       // card 3 · move the minuses across
  ["withdrawal", withdrawal],           // card 4 · saving with a withdrawal
  ["inOrOutWord", inOrOutWord],         // card 5 · recall: in, out, or neither
  ["interestPaid", interestPaid],       // card 6 · interest = paid back − borrowed
  ["tidyLoan", tidyLoan],               // card 7 · price = loan + down payment
  ["signOnTimeline", signOnTimeline],   // card 8 · read the signs off the picture
];
```

## The concept card, as it stands in `cf85183` (`js/concepts.js`, id `inOrOut`)

The jug-form paragraph is the one starting "The jug form."; the tidy step is "The tidy form." (Money
amounts carry a literal U+00A0; Fix A later turned each `^n` into `<sup>n</sup>`.)

```js
  /* f10 "In or out?" (2026-10-10). The sign round: the jug form first, then
     the tidy step. "the total" only. Money amounts carry a LITERAL U+00A0
     (the entity would be escaped and shown as raw text). f10 review 1: the
     "=" glues to the term before it, inside that term's unit, so a broken
     line never starts with "="; in prose an operator glues to the word after it. */
  inOrOut: {
    title: "In or out?",
    body: `
      <p>Think of the account as a <b>jug</b>. Money that goes <b>IN</b> is <b>plus</b>. Money that comes <b>OUT</b> is <b>minus</b>.</p>
      <ul>
        <li><b>IN (plus):</b> a deposit into savings, and the loan itself (the bank pays it in).</li>
        <li><b>OUT (minus):</b> a withdrawal from savings, and every repayment on a loan.</li>
        <li>A <b>down payment</b> never enters the account: it is paid straight to the seller. No car, no sign. It comes off the price: <span class="nowrap">loan = price − down payment</span>.</li>
      </ul>
      <p><b>The jug form.</b> Move every amount to the meeting day in its car (a car is the <span class="nowrap">(1 + i)^n</span> bracket that moves an amount to the meeting day) and write them all on one side. A loan ends empty, so it equals 0. Saving ends holding the total, so it equals A.</p>
      <div class="eg">A loan paid back with <span class="nowrap">R8 000</span> at T1 and <span class="nowrap">R9 000</span> at T3, 12% p.a. compounded monthly, meeting day T3: <span class="nowrap">P(1 + 0,12/12)^36</span> − <span class="nowrap">8 000(1 + 0,12/12)^24</span> − <span class="nowrap">9 000 = 0</span></div>
      <p><b>The tidy form.</b> Move the minuses across the equals sign. They turn into plusses, so the payments stand positive on the right. The cars stay.</p>
      <div class="eg"><span class="nowrap">P(1 + 0,12/12)^36 =</span> <span class="nowrap">8 000(1 + 0,12/12)^24</span> + <span class="nowrap">9 000</span></div>
      <div class="eg">Saving with a withdrawal: <span class="nowrap">R14 000</span> in at T0, <span class="nowrap">R2 000</span> out at T3, meeting day T5, 8% p.a. compounded quarterly: <span class="nowrap">A =</span> <span class="nowrap">14 000(1 + 0,08/4)^20</span> − <span class="nowrap">2 000(1 + 0,08/4)^8</span>. The withdrawal keeps its minus. On a timeline it is drawn <span class="nowrap">−R2 000</span>.</div>
      <div class="eg">Interest on a loan = paid back − borrowed. Borrowed <span class="nowrap">R3 587,42</span>, paid back <span class="nowrap">R2 300</span> and <span class="nowrap">R4 200</span>: <span class="nowrap">6 500</span> − <span class="nowrap">3 587,42 = R2 912,58</span> of interest.</div>
      <p>Deposits and the loan go IN. Withdrawals and repayments come OUT. Tidy: payments positive on the right.</p>`,
  },
```

## The harness side, as it stands in `cf85183` (`js/quests/_finance-check.js`)

```js
function f10JugShape(eq, s) {
  return s.saving
    ? eq.R.length === 1 && eq.R[0].c === "A" && eq.R[0].s === 1 && eq.R[0].e === 0 && eq.L.length === s.pays.length
    : eq.R.length === 0 && eq.L.length === s.pays.length + 1;
}
/* the tidy form's shape: the total's term alone on the left, every payment
   positive on the right except a withdrawal, which keeps its minus */
function f10TidyShape(eq, lead, outs) {
  return eq.L.length === 1 && eq.L[0].s === 1 && eq.L[0].c === lead.c && eq.L[0].e === lead.e
    && eq.R.every(t => t.s === (outs.has(t.c) ? -1 : 1));
}
/* an mc of equations: every option parses (at the story's rate, with only
   the story's terms), exactly one option is the right equation, it is
   marked correct and is in the tidy form, and no two options are the same
   equation */
function f10McCheck(q, s, expect, lead, allowed) {
  if (q.type !== "mc" || !Array.isArray(q.options) || q.options.length !== 4) return false;
  const parsed = q.options.map(o => ({ o, eq: f10ParseEq(o.label, f10Rate(s)) }));
  if (parsed.some(p => !p.eq || [...p.eq.L, ...p.eq.R].some(t => !allowed.has(t.c)))) return false;
  const right = parsed.filter(p => f10Equiv(p.eq, expect));
  if (right.length !== 1 || !right[0].o.correct) return false;
  if (!f10TidyShape(right[0].eq, lead, new Set(s.pays.filter(x => x.out).map(x => x.v)))) return false;
  for (let i = 0; i < parsed.length; i++)
    for (let j = i + 1; j < parsed.length; j++) if (f10Equiv(parsed[i].eq, f10Zero(parsed[j].eq))) return false;
  return true;
}
/* the yes/no jug cards: the shown jug form is right (jugCorrect) or has
   EXACTLY ONE sign slipped (jugWrong); q.yes must say which; the worked
   right jug form and tidy line are the right equation, in shape */
function f10JugCheck(q, wrong) {
  const s = f10Scene(q);
  if (!s || s.known || q.type !== "yesno" || s.meet !== s.n) return false;
  const iT = f10Rate(s), expect = f10Expect(s);
  const shown = f10ParseEq(f10PromptEq(q), iT);
  if (!shown || !f10JugShape(shown, s)) return false;
  const ok = f10Equiv(shown, expect);
  if (q.yes !== ok) return false;
  if (wrong) {
    /* same terms, exactly one sign different (orientation: the side with the payments, minus the other) */
    const z = f10Zero(shown), want = expect;
    const strip = ts => ts.map(t => `${t.c}|${t.e}`).sort().join(";");
    if (strip(z) !== strip(want)) return false;
    const diff = z.filter(t => !want.some(w => w.c === t.c && w.e === t.e && w.s === t.s)).length;
    if (diff !== 1) return false;
    const fixed = f10ParseEq(f10SolEq(q, "The right jug form"), iT);
    if (!fixed || !f10JugShape(fixed, s) || !f10Equiv(fixed, expect)) return false;
  }
  const tidy = f10ParseEq(f10SolEq(q, "Tidy"), iT);
  const lead = s.saving ? { c: "A", e: 0 } : { c: "P", e: s.n * s.k };
  return !!tidy && f10Equiv(tidy, expect) && f10TidyShape(tidy, lead, new Set(s.pays.filter(x => x.out).map(x => x.v)));
}
```

The verify-finance f10 block also asserted: jugCorrect and jugWrong both roll loans and saving; jugWrong
slips each of the four kinds (a repayment added, the loan subtracted, the withdrawal added, a deposit
subtracted); a repayment sometimes stands on the meeting day (no car) on jugCorrect and tidy.

## For the 2027 build

- It goes AFTER a discovery lesson; f8's jug picture (her 11 Oct redesign: payments are coins, the total is
  the jug) is the natural lead-in.
- Keep the review-1 rules: the "=" never stands alone at a line start, every term one unbreakable unit,
  literal U+00A0 in money and "p.a.", the total "?" with its letter on the timeline, a same-day deposit
  stacked with its own leader, no car is ever ^1, "half‑yearly" with a non-breaking hyphen.
