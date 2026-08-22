/* ============================================================
   EXAM FOCUS — General Trig · General solutions
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

   ✅ CHAPTER MOVED + RETEACH LINK LIVE — 2026-08-22.
   This question used to sit under the `trig` chapter with a PENDING-
   lostQuest placeholder, because nothing in the app taught general
   solutions. The GENERAL TRIG chapter (`gtrig`) now does:
     • `chapter` is now "gtrig". The id, topic, paper tag and every
       part are UNCHANGED — exam progress is keyed by question id, so
       nothing a learner has already opened is lost by the move.
     • `lostQuest` now points at gt11, "General solution: the six
       types", which is where the trinomial/K-method shape in part (a)
       is named and drilled. (gt12 drills the quadrants and the
       reference angle that finish it off.)
   The reteach button still only appears once gt11 is OPEN for that
   learner — js/exam-play.js's lostQuestLink() checks openQuests first
   — so on live it stays invisible until the teacher opens the round.
   ============================================================ */

const PAPER = "sept-t2";

const t2q2 = {
  id: "trig.gs.t2q2",
  chapter: "gtrig",
  topic: "general-solutions",
  archetype: "general-solution-of-a-quadratic-trig-equation-one-branch-dead",
  paper: PAPER,
  lostQuest: { chapter: "gtrig", quest: "gt11" },
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
        en: "Three terms, one function squared and the other one not — that is a type ⑤: trinomial, K-method. Let K = cos θ and what is left is an ordinary trinomial to factorise. Then read both branches properly before the calculator comes out; one of them may be asking cos for something cos simply does not have.",
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
        en: "Name the type first and the question stops feeling new. Three terms, one function squared and the other one not — that is a type ⑤, trinomial, and the K-method is the way through it. Let K = cos θ, and 2 cos²θ + 5 cos θ − 3 turns into 2K² + 5K − 3, an ordinary trinomial you have factorised a hundred times. None of it is trig until you put cos θ back at the end — and putting it back is not optional, because an answer left sitting on K answers a question nobody asked. That gives you two branches, side by side with an <b>or</b> between them, and each one gets its own treatment. cos θ = −3 is asking cosine for a value it does not own: cos is a side over the hypotenuse, the hypotenuse is the longest side, so cos θ lives between −1 and 1 and nowhere else. Write <b>no solution</b> — those two words, not “undefined” and not “no real solution” — because that line is a mark, and the marker wants to see you turned the branch down on purpose rather than quietly losing it. That leaves cos θ = 1/2. Take the reference angle from the size of the number, never from a minus (don't type − into your calculator), so ref. ∠ = 60°. Then the cross: cos is positive down the right-hand side of the bow tie, so tick I and IV, and write one line for each ticked quadrant. The k · 360° on the end is what turns two angles into every angle — cosine repeats itself every full turn, forever, in both directions — and one k ∈ ℤ at the bottom of the last line closes the whole thing off.",
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
        en: "Nothing new gets solved here. The general solution you already wrote is the machine and k is the handle — take one branch at a time and feed it whole numbers. The interval sits entirely below zero, so k = 0 is not going to land; walk k downwards until you overshoot.",
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
        en: "This is what the general solution is FOR, and it is why the general solution always comes first and the interval is read off it afterwards, never the other way round. You are not hunting for angles any more — you already own a formula that generates every single one of them, so the only thing left to decide is which whole numbers to feed it. One branch at a time. Start at k = 0 and step in the direction the interval lies; here everything is negative, so step downwards. Each substitution either lands inside [−360° ; 0°], in which case you write it down, or it does not and you move on — and the moment you overshoot the far end you are finished with that branch. Two branches, one hit each. Then look at what came out: −300° and −60° are 60° and 300° reached by turning the other way. Same two arms of the bow tie, same two positions on the circle; you simply walked clockwise to get there instead of anticlockwise. That is also why k ∈ ℤ has to be on the end of the general solution in the first place — without it you had two angles, not every angle, and there would have been nothing here to feed.",
      },
    },
  ],
};

export const trigGeneralSolutionsQuestions = [t2q2];
