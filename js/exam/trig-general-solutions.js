/* ============================================================
   EXAM FOCUS — 2D Trigonometry · General solutions
   SOURCE: September Test 2 (practice), QUESTION 2 — the general
   solution of a quadratic in cos θ, with one branch rejected, then the
   "hence list them in an interval" follow-on.
   (Overnight run #1, stage 3b, 2026-08-21.)
   ------------------------------------------------------------
   PRINT SOURCE:
     Sept-T2-Practice-QP.tex      Q2(a)–(b)
     Sept-T2-Practice-Memo.tex    2(a)–2(b), 7 ticks
     Sept-T2-blueprint.md         §1, §3 (flag F1 lands here)
   Same working, same ticks, same OR route, same WATCH OUT / REMEMBER
   cards as the print memo. `hint` and `esplain` freshly authored.

   METHOD: standard correct Grade 11 (per the corrected
   EXAM-FOCUS-PLAN — only algebra, finance and functions switch to her
   own written methods), with two of HER conventions enforced because
   they are marking rules, not style:
     · METHODS-algebra.md §0.3 + flag F1 — cos θ = −3 closes with
       "no solution", NEVER "undefined". Undefined is reserved for
       division by zero; non-real for an even root of a negative.
     · k ∈ ℤ belongs on the end of every general solution — without it
       you have written two angles, not a general solution.
   The memo's OR route (± 60° + k·360° as one line) rides tick-less,
   the same convention stage 3a used for T1's OR boxes.

   LEVELS: 1:1 with T2's blueprint — (a) 3, (b) 2. No ★ (T2's only two
   level-4 parts are 3(e) and 5(d)).

   NO DIAGRAM (the print question and memo have none).

   ⚠️⚠️ lostQuest IS THE SAME DOCUMENTED PLACEHOLDER as
   js/exam/trig-reduction-and-ratios.js — read that file's header for
   the full reasoning and the safe-degradation proof. Short version:
   Blipwork's `trig` chapter is 2D trig only (sine/cosine/area rules,
   t1–t7) and `tgraph` is trig graphs (tg1–tg7); NOTHING in the app
   teaches general solutions, so there is no honest reteach target.
   The placeholder renders no link rather than a wrong one.

   ⚠️ UNREGISTERED. Same five registration steps as
   js/exam/trig-reduction-and-ratios.js's header — including that
   "general-solutions" is NOT in the proposed trig scope wall, because
   it widens the chapter past its own built rounds.
   ============================================================ */

const PAPER = "sept-t2";
const LOST_PENDING = { chapter: "trig", quest: "PENDING-no-round-teaches-this" };

const t2q2 = {
  id: "trig.gs.t2q2",
  chapter: "trig",
  topic: "general-solutions",
  archetype: "general-solution-of-a-quadratic-trig-equation-one-branch-dead",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 3,
      prompt: {
        en: "Determine the general solution of &nbsp;2 cos²θ + 5 cos θ − 3 = 0.",
      },
      hint: {
        en: "Cover up the “cos” for a moment and look at the shape — it is an ordinary quadratic, so factorise it that way. Then check both branches carefully before you go anywhere near your calculator.",
      },
      memo: [
        { type: "step", text: { en: "It is an ordinary quadratic — the letter just happens to be cos θ:" } },
        { type: "step", text: { en: "2 cos²θ + 5 cos θ − 3 = 0 &nbsp;⟹&nbsp; (2 cos θ − 1)(cos θ + 3) = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos θ = 1/2 &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp; cos θ = −3" }, ticks: ["ca"] },
        { type: "step", text: { en: "cos θ can never be smaller than −1, so cos θ = −3 has <b>no solution</b>." }, ticks: ["ca"] },
        { type: "step", text: { en: "Reference angle: cos⁻¹(1/2) = 60°, and cos is positive in the first and fourth quadrants:" } },
        { type: "answer", text: { en: "θ = 60° + k · 360°" }, ticks: ["a"] },
        { type: "answer", text: { en: "or &nbsp;θ = 300° + k · 360°, &nbsp;&nbsp;k ∈ ℤ" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — written as one line: &nbsp;θ = ± 60° + k · 360°, &nbsp;k ∈ ℤ. &nbsp;Same marks." } },
        { type: "trap", text: {
          en: "WATCH OUT: cos θ = −3 has <b>no solution</b>. It is not “undefined” and it is not zero — there simply is no angle whose cosine is −3. Write that sentence down; it is a mark on its own, and every year somebody types cos⁻¹(−3) into the calculator, gets an error, and leaves the whole branch out silently.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: k ∈ ℤ belongs on the end of <i>every</i> general solution. Without it you have written down two angles, not a general solution.",
        } },
      ],
      esplain: {
        en: "Two separate skills are stacked here, and it helps to name them. The first is pure algebra: 2 cos²θ + 5 cos θ − 3 is the same animal as 2y² + 5y − 3, so factorise it exactly as you would any trinomial and only afterwards remember that y stands for cos θ. The second is knowing the range of cosine. Cosine is a ratio of a side to the hypotenuse, and the hypotenuse is always the longest side, so cos θ can only ever live between −1 and 1. That kills the second branch outright — and saying so is a mark, because the examiner is checking that you rejected it on purpose rather than never noticed it. What is left is cos θ = 1/2. The reference angle 60° comes from the calculator, but the calculator only ever gives you one of the answers; cosine is positive in the first and fourth quadrants, so the fourth-quadrant partner 360° − 60° = 300° has to be written down too. The + k · 360° on the end is what turns two angles into every angle: cosine repeats itself every full turn, forever, in both directions.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write down the values of θ ∈ [−360° ; 0°] that satisfy the equation in (a).",
      },
      hint: {
        en: "You are not solving anything again — you are feeding whole numbers into k. The interval is entirely negative, so k = 0 is unlikely to help you; try walking k downwards in each branch.",
      },
      memo: [
        { type: "step", text: { en: "Walk k down from 0 in each branch and keep whatever lands inside the interval:" } },
        { type: "step", text: { en: "θ = 60° + k · 360°: &nbsp;&nbsp;k = 0 → 60° (out), &nbsp;&nbsp;k = −1 → −300°" } },
        { type: "step", text: { en: "θ = 300° + k · 360°: &nbsp;k = 0 → 300° (out), &nbsp;k = −1 → −60°" } },
        { type: "answer", text: { en: "θ = −300°" }, ticks: ["a"] },
        { type: "answer", text: { en: "and &nbsp;θ = −60°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: k = 0 gives 60° and 300° — both <i>outside</i> [−360° ; 0°]. Only k = −1 lands inside. Do not stop at k = 0 just because it is the easy one to substitute.",
        } },
      ],
      esplain: {
        en: "This is what the general solution is FOR. Instead of hunting for angles in a given range from scratch, you already own a formula that generates every single one of them, so all that is left is choosing which whole numbers to feed it. Take one branch at a time, start at k = 0, and step in the direction the interval sits — here the interval is entirely negative, so step downwards. Each substitution either lands inside the interval, in which case you keep it, or it does not, in which case you move on. Two branches, one hit each, and the moment a substitution overshoots the far end of the interval you know you are finished with that branch. Notice that −300° and −60° are just 60° and 300° measured the other way round the circle — the same two positions, described by walking clockwise instead of anticlockwise.",
      },
    },
  ],
};

export const trigGeneralSolutionsQuestions = [t2q2];
