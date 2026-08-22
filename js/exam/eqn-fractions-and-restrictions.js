/* ============================================================
   EXAM FOCUS — Equations & Inequalities · Fractions & restrictions
   ONE fresh question (topic top-up, belongs to no paper).
   (Overnight run #1, 2026-08-21.)
   ------------------------------------------------------------
   ARCHETYPE: the fraction-equation-with-limits shape that runs through
   the whole bank (June 2018 P1 Q1(b); June 2019 P1 Q1(d); her Test 1
   2025 Q2), taken to the rung Sept T1 deliberately did NOT use — one of
   the two roots really does land on a limit and has to be thrown away.
   Fresh numbers, fresh denominators.

   ⚠️ THIS QUESTION EXISTS BECAUSE T1 2(b) IS TRAP-FREE ON PURPOSE.
   Sept-T1-blueprint.md judgement call 4: 2(b)'s roots deliberately miss
   the limits, because 2(c) already tests rejecting a root and rejecting
   twice in one paper would trip the moderators' most-repeated complaint.
   Its WATCH OUT card spells out what WOULD have happened if a root had
   landed on ±2 — and this question is that sentence, made real. Put the
   two side by side in the topic block and the pair teaches the rule.

   SKELETON DISTANCE — checked against Sept T1 Q2(b):
     · T1 2(b) has the LCD hidden inside x² − 4, a difference of squares,
       and both roots survive. Here the LCD hides inside x² − x − 2, a
       trinomial, and one root dies.
     · T1 2(b) ends at the check; this one carries on into a chained
       read-off (c) and a level-4 tail (d) that turns the same equation
       into an equal-roots question in an unknown k — a crossing of
       fractions with nature-of-roots that appears nowhere in T1.

   METHOD: METHODS-algebra.md hers verbatim — B2: factorise every
   denominator FIRST, write LCD and the limits line before solving,
   multiply each term up to the LCD, solve, then check every root
   against the limits. B11 for (d)'s Δ = 0. Her word for a rejected
   root in a fraction equation is that it is simply thrown away against
   the limits; "N.A." is her surd-equation word (§0.3) and is used here
   only alongside the limits reasoning, not in place of it.

   LEVELS: ramped 1 → 3 → 2 → 4 (the chained (c) is deliberately easier
   than (b) — it banks a mark for reading, which is what a chain is
   for), ★ on (d).

   NO DIAGRAM. ⚠️ UNREGISTERED. Registering needs the verify-exam.html
   Part 2 widenings listed in js/exam/eqn-k-method.js's header (question
   count, topic list, the "every eqn lostQuest is eq8" assertion — this
   one points at eq4). "fractions-and-restrictions" is already inside
   the existing eqn scope wall in Part 6. ✓
   ============================================================ */

const q1 = {
  id: "eqn.fr.q1",
  chapter: "eqn",
  topic: "fractions-and-restrictions",
  archetype: "fraction-equation-with-a-genuinely-rejected-root",
  lostQuest: { chapter: "eqn", quest: "eq4" },
  marks: 13,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Given: &nbsp;x/(x − 2) + 2/(x + 1) = 6/(x² − x − 2)<br><br>Factorise x² − x − 2, and hence write down the limits — the values x is not allowed to take.",
      },
      hint: {
        en: "Two numbers that multiply to −2 and add to −1. Once the third denominator is in brackets, the forbidden values are whatever would make any denominator equal zero.",
      },
      memo: [
        { type: "step", text: { en: "x² − x − 2 = (x − 2)(x + 1)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "limits: &nbsp;x ≠ 2 ; x ≠ −1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the limits come from EVERY denominator in the equation, not just the big one. Here (x − 2) and (x + 1) each appear on their own as well, and they give the same two values — which is the clue that the third denominator is just those two multiplied together.",
        } },
      ],
      esplain: {
        en: "Dividing by zero is the one thing arithmetic simply will not do, so before an equation with fractions can be solved at all, you have to say out loud which x-values would break it. Factorising the messiest denominator is what makes those values visible: x² − x − 2 looks like it could break anywhere, but (x − 2)(x + 1) tells you exactly two places. Notice they are the same two brackets that are already sitting under the other fractions — that is not a coincidence, it is what makes the LCD easy in the next part. Write the limits down at the top of your page now; you will need them again at the very end.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 3,
      prompt: {
        en: "Solve for x: &nbsp;x/(x − 2) + 2/(x + 1) = 6/(x² − x − 2)",
      },
      hint: {
        en: "The denominators are already factorised from (a), so the LCD is just the two brackets multiplied. Multiply every term by it, and keep your limits line in sight for the end.",
      },
      memo: [
        { type: "step", text: { en: "The denominators are already factorised from (a), so the LCD is the product of the two brackets. Multiply each term by what it needs to reach the LCD; the denominators cancel and only the numerators are left." } },
        { type: "step", text: { en: "LCD = (x − 2)(x + 1) &nbsp;&nbsp;⟹&nbsp;&nbsp; x(x + 1) + 2(x − 2) = 6" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x² + x + 2x − 4 = 6" }, ticks: ["ca"] },
        { type: "step", text: { en: "x² + 3x − 10 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(x + 5)(x − 2) = 0 &nbsp;&nbsp;∴ x = −5 &nbsp;or&nbsp; x = 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 2 is a limit, so it must be thrown away &nbsp;∴ x = −5 only" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this is exactly why the limits line goes down FIRST. x = 2 solves the tidied-up quadratic perfectly — but it makes the original denominator x − 2 equal to zero, so it was never a solution of the equation you were actually given. Handing in both roots loses the last mark.",
        } },
      ],
      esplain: {
        en: "Multiplying by the LCD is legal because every term on both sides gets the same treatment, so the balance never tips — and it is worth doing because three fractions turn into one ordinary quadratic. But the tidied-up equation is not quite the same animal as the one you started with: it has forgotten that x could never be 2. That is why it happily offers x = 2 back to you, and why the check at the end is not optional politeness. Put x = 2 into the original equation and the very first fraction reads 2 divided by 0 — undefined, not a solution. One root survives, and the honest answer says so.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write down the value of x for which the expression &nbsp;x/(x − 2) + 2/(x + 1) − 6/(x² − x − 2) &nbsp;is equal to zero.",
      },
      hint: {
        en: "Do not start again. Compare this expression with the equation in (b) — what happens if you move the right-hand side of (b) across to the left?",
      },
      memo: [
        { type: "step", text: { en: "Setting this expression equal to 0 and taking the last term back across gives exactly the equation of (b)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = −5" }, ticks: ["a"] },
      ],
      esplain: {
        en: "“Where is this expression zero” and “solve this equation” are the same question asked in two voices. An equation A = B becomes A − B = 0 just by moving everything to one side, and that is precisely the expression you have been handed. So the answer is the answer you already have, and the two marks are for spotting it rather than for doing five minutes of work again. And the rejected root stays rejected: x = 2 does not make the expression zero, it makes the expression not exist.",
      },
    },
    {
      id: "d",
      marks: 4,
      level: 4,
      prompt: {
        en: "The equation &nbsp;x/(x − 2) + 2/(x + 1) = k/(x² − x − 2) &nbsp;has EQUAL roots for one value of k.<br>Determine that value of k, and write down the equal root.",
      },
      hint: {
        en: "Run the same LCD step — multiply through by (x − 2)(x + 1) — but leave k where the 6 was. You will get a quadratic with k in it — and equal roots always means one particular thing about Δ.",
      },
      memo: [
        { type: "step", text: { en: "Multiply through by the LCD (x − 2)(x + 1), with k in place of 6: &nbsp;x(x + 1) + 2(x − 2) = k &nbsp;⟹&nbsp; x² + 3x − 4 − k = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "for equal roots, Δ = 0: &nbsp;(3)² − 4(1)(−4 − k) = 9 + 16 + 4k = 25 + 4k = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k = −25/4 = −6,25" }, ticks: ["a"] },
        { type: "answer", text: { en: "the equal root is x = −b/(2a) = −3/(2(1)) = −3/2 = −1,5 &nbsp;— and −1,5 is not a limit, so it stands" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: even a root that falls out of a perfect Δ = 0 still has to be checked against the limits. A fraction equation will throw away an equal root just as happily as an unequal one — if −b/(2a) had come out as 2 or −1 here, the answer would have been that there is no valid root at all.",
        } },
      ],
      esplain: {
        en: "Two topics meet in this part, which is why it carries the star. The fraction side is unchanged: clear the denominators exactly as before — multiply through by (x − 2)(x + 1) — and you are left with an ordinary quadratic — except the constant now carries an unknown k inside it. From there it is pure nature-of-roots: equal roots means Δ is exactly zero, no range and no inequality, so setting Δ = 0 pins k down to a single number. Once k is fixed the ± in the quadratic formula has nothing left to add or subtract, so the one surviving root is simply −b/(2a). The last line is the one that makes it a FRACTION question again: that root still has to clear the limits x ≠ 2 and x ≠ −1 before you are allowed to write it down.",
      },
    },
  ],
};

export const eqnFractionsAndRestrictionsQuestions = [q1];
