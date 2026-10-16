/* Concept cards: Finance (chapter id "finance"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */
import { renderTimeline } from "../engine/timeline-graph.js";
import { JUG_PICTURE, BUILD_TIMELINE_EXAMPLE } from "./_finance-pictures.js";

export const CONCEPTS_FINANCE = {
  /* ---------------- FINANCE ---------------- */
  finFormulas: {
    title: "Which finance formula?",
    body: `
      <p>Match the situation to the formula. <b>i</b> is the rate as a fraction (÷100), <b>n</b> the number of periods.</p>
      <ul>
        <li><b>Hire purchase</b> → simple interest: <b>A = P(1 + i·n)</b></li>
        <li><b>Inflation, population growth, savings</b> → compound: <b>A = P(1 + i)ⁿ</b></li>
        <li><b>Straight-line depreciation</b> → <b>A = P(1 − i·n)</b></li>
        <li><b>Reducing-balance depreciation</b> → <b>A = P(1 − i)ⁿ</b></li>
      </ul>
      <p><b>P</b> is the starting amount, <b>A</b> the end amount. Turn a % into i by dividing by 100 (8% → 0,08).</p>`,
  },
  simpleCompound: {
    title: "Simple vs compound interest",
    body: `
      <p><b>Simple interest</b> is worked out on the <b>original P only</b>, so the same amount is added each period.</p>
      <div class="formula">A = P(1 + i·n)</div>
      <p><b>Compound interest</b> is worked out on the <b>growing balance</b>, so each period earns a little more than the last.</p>
      <div class="formula">A = P(1 + i)ⁿ</div>
      <div class="eg">Over time compound always pulls ahead of simple, because it earns "interest on interest".</div>`,
  },
  depreciation: {
    title: "Depreciation: the two methods",
    body: `
      <p>Depreciation is when something <b>loses</b> value over time.</p>
      <ul>
        <li><b>Linear (straight-line):</b> <b>A = P(1 − i·n)</b>. Loses the <b>same rand amount</b> each year — its graph is a <b>straight line</b> sloping down.</li>
        <li><b>Reducing-balance:</b> <b>A = P(1 − i)ⁿ</b>. Loses a fixed <b>percentage of its current</b> value each year — its graph is a <b>curve</b> that drops steeply then flattens.</li>
      </ul>`,
  },
  compounding: {
    title: "Different compounding periods",
    body: `
      <p>If interest is added more than once a year, split the year up:</p>
      <ul>
        <li><b>rate per period</b> = annual rate ÷ (times per year)</li>
        <li><b>exponent</b> = years × (times per year)</li>
      </ul>
      <div class="formula">A = P(1 + i/k)<sup>n·k</sup></div>
      <p>Times per year k: annually 1 · half‑yearly 2 · quarterly 4 · monthly 12 · weekly 52 · daily 365.</p>
      <div class="eg">12% p.a. compounded quarterly for 5 years → i = 0,12/4 = 0,03 and exponent = 5×4 = 20.</div>`,
  },
  timelineMove: {
    title: "Moving money along a timeline",
    body: `
      <p>Money has a different value at different times. To re-value an amount, slide it along the timeline:</p>
      <ul>
        <li><b>Forward</b> (to a later date) → <b>multiply</b> by (1 + i) once per period → a <b>positive</b> exponent.</li>
        <li><b>Backward</b> (to an earlier date) → <b>divide</b> by (1 + i) once per period → a <b>negative</b> exponent.</li>
      </ul>
      <div class="formula">value = amount × (1 + i)<sup>±periods</sup></div>
      <p>Count the periods between the two <span class="nowrap">T‑points</span>. Forward T2 → T5 is 3 periods (+3); backward T5 → T2 is 3 periods (−3).</p>`,
  },
  timelineCount: {
    title: "Counting periods on a timeline",
    body: `
      <p>The number of periods is just how many <b>gaps</b> you jump between the two <span class="nowrap">T‑points</span> — count the spaces, not the dots.</p>
      <ul>
        <li>T0 → T4 is <b>4</b> periods.</li>
        <li>T5 → T2 is <b>3</b> periods (going back).</li>
      </ul>
      <p>The <b>direction</b> tells you × or ÷: <span class="nowrap">later = ×</span>, <span class="nowrap">earlier = ÷</span>.</p>`,
  },
  rateChange: {
    title: "When the interest rate changes",
    body: `
      <p>If the rate or compounding frequency changes part-way, split the timeline into segments. For a single amount, use <b>one bracket per segment</b>:</p>
      <div class="formula">A = P(1 + i₁/k₁)<sup>n₁·k₁</sup> (1 + i₂/k₂)<sup>n₂·k₂</sup></div>
      <p>Work out each segment's rate-per-period and number-of-periods separately, then multiply the brackets together.</p>`,
  },
  deposits: {
    title: "Deposits & hire purchase",
    body: `
      <p>A <b>deposit</b> is paid upfront and earns no interest.</p>
      <div class="formula">deposit = (% ÷ 100) × price</div>
      <p>The amount still owed (the new P that interest is charged on) is the rest of the price:</p>
      <div class="formula">amount owed = ((100 − %) ÷ 100) × price</div>
      <div class="eg">15% deposit on R8 000 → deposit = R1 200, still owed = R6 800.</div>`,
  },
  effNom: {
    title: "Effective vs nominal rates",
    body: `
      <p>Both are <b>compound</b> interest, just quoted differently.</p>
      <ul>
        <li><b>Effective</b> rate is always an <b>annual</b> rate (the true yearly growth).</li>
        <li><b>Nominal</b> rate is quoted with a <b>compounding frequency</b> (monthly, quarterly, …).</li>
      </ul>
      <div class="formula">1 + i<sub>eff</sub> = (1 + <span class="sfrac"><span class="sf-n">i<sub>nom</sub></span><span class="sf-d">n</span></span>)ⁿ</div>
      <p>Here n is the number of compounding periods <b>per year</b> (12 for monthly).</p>`,
  },
  /* f8 "Which one is the total?" (the jug round, 2026-10-11; the 10 Oct
     tap-the-label card is in briefs/finance-2/ARCHIVE-f8-tap-label-2026-10-10.md).
     The approved mock-up's text (her "absolutely perfect", 11 Oct 12:02),
     the two jugs side by side (JUG_PICTURE above) with their captions as
     drawn. "I'm lost" (and the 📖 library) opens it; the round itself opens
     on the one-jug discovery slide instead (jugDiscover above, 11 Oct
     16:56). The textbook's word is PHASED OUT, not dropped cold (her note,
     11 Oct 16:54): this card and the slide's first frame are the only two
     places that say it, once in brackets and once to say it is the total
     and from now on just "the total". Never anywhere else in f8. */
  theTotal: {
    title: "Payments are coins. The total is the jug.",
    body: `
      <p>Every payment is <b class="jug-hl">one coin</b> going in or out on its day. The total (the lumpsum) is the <b class="jug-hl">one jug</b> all the coins are worth together. A coin is never the jug. Your textbook says “lump sum”. That is the total we are talking about. From now on we just call it the total.</p>
      ${JUG_PICTURE}
      <p class="jug-after">Interest makes the jug grow (or the debt grow). A withdrawal takes a coin out. The jug can end up smaller than a coin: it is still the jug.</p>`,
  },
  /* f9 "Car or no car?" (2026-10-10). This round says only "the total". */
  carOrNoCar: {
    title: "Car or no car?",
    body: `
      <p>Every amount on a timeline is moved to <b>one</b> T, the <b>meeting day</b> (the flag on the line).</p>
      <p>A <b>car</b> is the bracket <b>(1 + i)<sup>n</sup></b> that moves an amount to the meeting day.</p>
      <ul>
        <li><b>Forward gear</b>: the meeting day is later, so <b>multiply (×)</b>: a positive exponent.</li>
        <li><b>Reverse gear</b>: the meeting day is earlier, so <b>divide (÷)</b>: a negative exponent.</li>
        <li>An amount <b>already standing on the meeting day</b> needs <b>no car</b>.</li>
        <li>Each <b>road</b> is one rate, in one colour. Where the road changes colour, the rate changes: an amount that crosses it needs <b>one car per road</b>.</li>
      </ul>
      <div class="formula">exponent = ± years × k</div>
      <p>k is how many times a year the interest is added: <span class="nowrap">annually 1 ·</span> <span class="nowrap">half‑yearly 2 ·</span> <span class="nowrap">quarterly 4 ·</span> <span class="nowrap">monthly 12</span>.</p>
      <div class="eg"><span class="nowrap">8% p.a.</span> compounded quarterly until T4, then <span class="nowrap">10% p.a.</span> compounded monthly. <span class="nowrap">R5 000</span> at T2, meeting day T6: two cars, both forward: <span class="nowrap">5 000(1 + 0,08/4)<sup>2×4</sup></span> <span class="nowrap">(1 + 0,1/12)<sup>2×12</sup></span>.</div>
      <div class="eg">Her last deposit, <span class="nowrap">R2 000</span>, is paid in on the same day as A, and the meeting day is that day: no car, it is just <span class="nowrap">2 000</span>.</div>
      <p>A car only if it has to move. Already there? No car.</p>`,
  },
  /* f10 "In or out?" (2026-10-10; the TAUGHT form only since 2026-10-11, her
     play-test ruling: the total alone on the left, the payments on the right;
     the one-sided form of the 10 Oct build is parked for 2027 in
     briefs/finance-2/ARCHIVE-f10-jug-form-2027.md). "the total" only. Money
     amounts and "p.a." carry a LITERAL U+00A0 (the entity would be escaped
     and shown as raw text). A single-letter left side rides with the first
     term inside one unit ("A = 14 000(…)"), so "=" never stands alone at a
     line end or start; in prose an operator glues to the word after it.
     No picture for now (f8's jug picture may come back here as a reminder). */
  inOrOut: {
    title: "In or out?",
    body: `
      <p>Every amount on the timeline drives to the <b>meeting day</b> in its car (a car is the <span class="nowrap">(1 + i)<sup>n</sup></span> bracket that moves an amount to the meeting day). The meeting day is the total's own day, so <b>the total stands alone on the left</b>, with no car. Every other amount goes on the <b>right</b>, with its sign.</p>
      <ul>
        <li><b>Saving:</b> the total is A, at the end. A <b>deposit</b> goes <b>IN</b>: <b>+</b> on the right. A <b>withdrawal</b> comes <b>OUT</b>: <b>−</b> on the right. On a timeline a withdrawal is drawn <span class="nowrap">−R2 000</span>.</li>
        <li><b>A loan:</b> the loan goes in too, but it is the total, P, at T0: it stands alone on the left. Every <b>repayment</b> goes <b>+</b> on the right, driving back to T0 in reverse gear.</li>
        <li>A <b>down payment</b> never enters the account: it is paid straight to the seller, so it has no place in the equation. It comes off the price: <span class="nowrap">loan = price − down payment</span>.</li>
      </ul>
      <div class="eg">Saving with a withdrawal: <span class="nowrap">R14 000</span> in at T0, <span class="nowrap">R2 000</span> out at T3, <span class="nowrap">8% p.a.</span> compounded quarterly, A at T5, the meeting day: <span class="nowrap">A = 14 000(1 + 0,08/4)<sup>20</sup></span> − <span class="nowrap">2 000(1 + 0,08/4)<sup>8</sup></span></div>
      <div class="eg">A loan paid back with <span class="nowrap">R8 000</span> at T1 and <span class="nowrap">R9 000</span> at T3, <span class="nowrap">12% p.a.</span> compounded monthly, meeting day T0: <span class="nowrap">P = 8 000(1 + 0,12/12)<sup>−12</sup></span> + <span class="nowrap">9 000(1 + 0,12/12)<sup>−36</sup></span></div>
      <p>Interest on a loan = paid back − borrowed.</p>
      <p>Saving: deposits plus, withdrawals minus, A alone on the left. A loan: repayments plus on the right, P alone on the left.</p>`,
  },

  /* f12 "Build the timeline" (2026-10-11, her design 11:39, her order 11:47).
     Words, then the timeline, then the equation: her five taps as a short
     checklist in her order, one line each, then one worked example in words
     and the timeline it builds (BUILD_TIMELINE_EXAMPLE above, f13's own
     drawing of that scene). The jug and coin words are f8's card's. Money,
     "p.a." and "N years" carry a LITERAL U+00A0 inside their .nowrap unit. */
  buildTimeline: {
    title: "Build the timeline",
    body: `
      <p>The exam hands you words. Build the whole timeline from them, tap by tap, before any equation. Every payment is <b class="jug-hl">one coin</b> on its day; the total is the <b class="jug-hl">one jug</b>.</p>
      <ul>
        <li><b>Tap 1: how far does it go?</b> The last day the words name is the last T: “after <span class="nowrap">7 years</span>” is T7.</li>
        <li><b>Tap 2: where does the rate change?</b> “for the first <span class="nowrap">3 years</span>” is T3. One rate all the way: no change.</li>
        <li><b>Tap 3: which rate on which road?</b> The first rate from T0 to the change, the new rate after it, each road in its own colour.</li>
        <li><b>Tap 4: where does the jug go?</b> Savings: at the end, A. A loan: at T0, P.</li>
        <li><b>Tap 5: where does each coin go?</b> “now” is T0, “after <span class="nowrap">5 years</span>” is T5; a coin going out is drawn <span class="nowrap">−R2 000</span>.</li>
      </ul>
      <p>A down payment never enters the account: it goes straight to the shop, so it has no place on the timeline.</p>
      <div class="eg">Brenda opens a savings account. She deposits <span class="nowrap">R5 500</span> now and <span class="nowrap">R4 000</span> after <span class="nowrap">5 years</span>. The interest rate is <span class="nowrap">14% p.a.</span> compounded half‑yearly for the first <span class="nowrap">3 years</span>, then <span class="nowrap">12% p.a.</span> compounded monthly. How much is in the account after <span class="nowrap">7 years</span>?</div>
      <p>The five taps: T7; T3; <span class="nowrap">14% p.a.</span>, then <span class="nowrap">12% p.a.</span>; the jug, A, at T7; <span class="nowrap">R5 500</span> at T0 and <span class="nowrap">R4 000</span> at T5.</p>
      <div class="q-graph">${renderTimeline(BUILD_TIMELINE_EXAMPLE)}<div class="cap">T in years</div></div>
      <p>Words first. Then the timeline. Then the one equation.</p>`,
  },

  /* f13 "Build the one equation" (2026-10-10; was f12 until 2026-10-11). The exam shape, her method:
     one meeting day, the total alone on the left, every other amount in its
     car, ONE line typed once and rounded once. "the total" only. Money
     amounts and "p.a." carry a LITERAL U+00A0 (f10 review 1: not the thin
     U+202F, never an entity); the "=" glues to the term before it, and in
     prose an operator glues to the word after it. f12 review 1: the
     equations wear .f13-eq (a size smaller), a two-car term is ONE unit,
     a single-letter left side rides with the first term ("A = 5 500(…)"),
     and a number and its unit are one unit ("14% p.a.", "3 years"). */
  oneEquation: {
    title: "Build the one equation",
    body: `
      <ul>
        <li><b>Step 1: pick the meeting day.</b> Saving: the day of A, at the end. A loan: T0, the day of the loan.</li>
        <li><b>Step 2: give every amount its car</b> (a car is the <span class="nowrap">(1 + i)<sup>n</sup></span> bracket that moves an amount to the meeting day). Forward gear to a later day: a positive exponent. Reverse gear to an earlier day: a negative exponent. One car per road. An amount already standing on the meeting day gets <b>no car</b>.</li>
        <li><b>Step 3: write it all in ONE line.</b> The total alone on the left (A for saving, the loan P for a loan). The payments on the right: a deposit or a repayment plus, a withdrawal minus.</li>
        <li><b>Step 4: type it once, round once.</b> Never solve it in stages and never round along the way: the answer to <span class="nowrap">2 decimal places</span>, at the end.</li>
      </ul>
      <div class="eg">Saving: <span class="nowrap">R5 500</span> now and <span class="nowrap">R4 000</span> at T5; <span class="nowrap">14% p.a.</span> compounded half‑yearly for <span class="nowrap">3 years</span>, then <span class="nowrap">12% p.a.</span> compounded monthly; meeting day T7: <span class="f13-eq"><span class="nowrap">A = 5 500(1 + 0,14/2)<sup>6</sup> (1 + 0,12/12)<sup>48</sup></span> + <span class="nowrap">4 000(1 + 0,12/12)<sup>24</sup></span></span>, so <span class="nowrap">A = R18 386,28</span>.</div>
      <div class="eg">A loan paid off with <span class="nowrap">R5 000</span> at T4 and <span class="nowrap">R6 000</span> at T6; <span class="nowrap">16% p.a.</span> compounded quarterly for <span class="nowrap">4 years</span>, then <span class="nowrap">14% p.a.</span> compounded half‑yearly; meeting day T0: <span class="f13-eq"><span class="nowrap">P = 5 000(1 + 0,16/4)<sup>−16</sup></span> + <span class="nowrap">6 000(1 + 0,14/2)<sup>−4</sup> (1 + 0,16/4)<sup>−16</sup></span></span>, so <span class="nowrap">P = R5 113,44</span>.</div>
      <p>The total is known and a payment is the unknown (a deposit P now, or x in the middle)? Write the same one line, the known total alone on the left, and let <b>SHIFT SOLVE</b> find the unknown.</p>
      <p>A down payment never enters the loan: it comes off the price. <span class="nowrap">Price = loan + down payment</span>.</p>
      <p>Build the whole equation first. Type it once. Round once, at the end.</p>`,
  },

  /* f11 "Pick the meeting day" (2026-10-10). The shortcut round: count the
     cars for a day (the total too), the two rules of thumb, and the answer
     is the same anywhere. "the total" only. Money amounts, "p.a." and "N cars"
     carry a LITERAL U+00A0 inside their .nowrap unit (f10 review 1: not the
     thin U+202F, never an entity); a sum is one unit with its "=" inside. */
  meetingDay: {
    title: "Pick the meeting day",
    body: `
      <p>Any T can be the <b>meeting day</b>. Every amount drives there in its <b>car</b> (a car is the <span class="nowrap">(1 + i)<sup>n</sup></span> bracket that moves an amount to the meeting day), <b>the total too</b> when it is not already there. Count the cars for a day:</p>
      <ul>
        <li>An amount <b>already standing</b> on the meeting day: <b>no car</b>.</li>
        <li>An amount that stays on <b>one colour</b> of road: <b><span class="nowrap">1 car</span></b>.</li>
        <li>An amount that <b>crosses the colour change</b>: <b><span class="nowrap">2 cars</span></b>, one per road.</li>
      </ul>
      <p><b>Two rules of thumb</b> for the day with the fewest cars:</p>
      <ul>
        <li><b>Meet where someone already stands.</b> That amount needs no car.</li>
        <li><b>Meet where the road changes colour.</b> Then nobody crosses the change, so nobody needs two cars.</li>
      </ul>
      <div class="eg">Saving: <span class="nowrap">R5 000 at T1</span>, <span class="nowrap">R3 000 at T3</span>, <span class="nowrap">A at T6</span>; <span class="nowrap">8% p.a.</span> until T3, then <span class="nowrap">10% p.a.</span>, so the road changes colour at T3. Meet at T6: the <span class="nowrap">R5 000</span> crosses the change (<span class="nowrap">2 cars</span>), the <span class="nowrap">R3 000</span> needs <span class="nowrap">1 car</span>, A is already there: <span class="nowrap">2 + 1 + 0 = 3 cars</span>. Meet at T3: <span class="nowrap">1 + 0 + 1 = 2 cars</span>. T3 does both: an amount stands there, and the road changes colour there.</div>
      <p>The answer is the same wherever you meet; picking the day is only about typing less.</p>`,
  },

};
