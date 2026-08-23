/* ============================================================
   EXAM FOCUS — General Trig · THE LEVEL 4 ★ TILE, "the brave round"
   (SESSION F2 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md ruling 5 + its tile map, sessions/F2-gtrig-part2.md.)
   ------------------------------------------------------------
   A BRAND NEW TILE: six cards, from nothing.

   WHY THIS TILE EXISTS (her ruling 5, 2026-08-23): "Levels 1-3 on the
   normal tiles; every chapter gets a last tile Level 4 ★ holding mixed
   Level-4 questions for that chapter. The low achievers must never meet
   a ★ while drilling basics." So every hard trig question in the bank
   is gathered here, and the eight tiles in front of this one stay safe.

   WHAT MAKES A QUESTION LEVEL 4, in this chapter: it is un-cued (the
   question does not say which move to make), it runs several steps that
   each depend on the last, it works BACKWARDS from an answer, or it
   asks about the RANGE of a ratio rather than its value. Every card
   below carries at least one starred part, and every part on every card
   is level 3 or 4 — a Level 4 card may carry the lead-in it genuinely
   depends on, never a warm-up.

   THE SIX, and where each mould comes from
   (survey/SURVEY-Topic-Banks.md §2 — the trig inventory's ⭐ items;
   survey/SURVEY-Her-2025-Assessments.md). Fresh numbers and letters
   throughout; nothing here is verbatim anything:
     q1  2025-Q5.2.1's "for which k is this ratio non-real" — the single
         most conceptually interesting item in the whole trig survey,
         because the only way through is knowing that a sine or cosine
         lives between −1 and 1. It ends as a quadratic inequality.
     q2  2026-Q2.4's reverse-engineered general solution: you are GIVEN
         the answer and have to find the constant that produced it.
     q3  2024-Q5.4's product trick — two factors multiply to −1, and
         neither can leave [−1 ; 1], so one must be 1 and the other −1.
         Two unknowns, four families.
     q4  2024-Q3.7, the hardest identity in the survey: given that one
         expression equals m, prove a second one equals 1 over m².
     q5  a reduction that has to be simplified BEFORE it can be solved,
         and then a "which of these values is the expression actually
         allowed to take" check that most learners skip.
     q6  the two-condition question: a square root over a denominator,
         where "real" needs BOTH what is under the root to be
         non-negative AND the bottom to survive (her Test 7 Q1 mould,
         pushed one step further).

   NO DIAGRAM ANYWHERE ON THIS TILE. Every sketch these questions need —
   the bow tie, the quadrant cross, the little right triangle — is the
   learner's own pen-and-paper work.

   METHOD: the textbook method in every memo, with her story in the hint
   and the esplain (EXAM-FOCUS-PLAN.md, 2026-08-22: "Trig: her method IS
   the textbook method — only the explanation differs"), and her three
   standing trig rulings enforced throughout: ONE quadrant line for a
   tan, the reference angle taken from the positive value, and a single
   k ∈ ℤ closing the last branch.
   ============================================================ */

const PAPER = "siblings";
const CH = "gtrig";

/* ---------------------------------------------------------------
   q1 — THE RANGE OF A RATIO, ending in a quadratic inequality.
   (a) is an ordinary co-function-plus-Pythagoras chain; (b) ★ is the
   part that cannot be done by pattern-matching at all.
   --------------------------------------------------------------- */
const q1 = {
  id: "gtrig.l4.q1",
  chapter: CH,
  topic: "level-4",
  archetype: "level4-ratio-in-terms-of-a-letter-then-non-real-quadratic-inequality",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "gt10" },
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;cos 68° = m − 4.<br><br>Determine &nbsp;cos 22°&nbsp; in terms of m, leaving your answer in surd form.",
      },
      hint: {
        en: "Add the two angles first. If they make 90° you have been handed a co-function, and a co-function converts between sin and cos. After that it is Pythagoras in disguise — the identity that links sin² and cos².",
      },
      memo: [
        { type: "step", text: { en: "68° and 22° add to 90°, so this is a co-function: &nbsp;cos 22° = sin 68°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "sin²68° + cos²68° = 1 &nbsp;⟹&nbsp; sin²68° = 1 − cos²68°" }, ticks: ["ca"] },
        { type: "step", text: { en: "= 1 − (m − 4)²" }, ticks: ["ca"] },
        { type: "answer", text: { en: "68° is a first-quadrant angle, so sin 68° is positive: &nbsp;cos 22° = √(1 − (m − 4)²)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (m − 4)² is not m² − 16, and you do not need to multiply it out here — leaving it as a bracket keeps the next part short. But you DO have to choose the positive square root, and the reason is that 68° sits in the first quadrant where every ratio is positive.",
        } },
      ],
      esplain: {
        en: "Two moves, and the first one is spotting that 68° and 22° are partners. Any two angles that add to 90° are co-functions of each other, so the cosine of one is the sine of the other — cos 22° is sin 68°, and now everything is about the same angle. The second move is the identity sin²θ + cos²θ = 1, which is just Pythagoras written in ratios. Rearrange it: sin²68° is 1 − cos²68°, and you were handed cos 68° as m − 4, so drop that straight in. Take the square root and you have your answer in terms of m. The one decision worth thinking about is the plus-or-minus. A square root normally offers both, but 68° lies in the first quadrant, where every ratio is positive, so the negative root is thrown away. That habit — check the quadrant before you choose a sign — is what part (b) is built on.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 4,
      prompt: {
        en: "Determine the values of m for which &nbsp;cos 22°&nbsp; would be <b>non-real</b>",
      },
      hint: {
        en: "You already have cos 22° written as a square root. A square root goes non-real for exactly one reason. Turn that reason into an inequality, multiply the bracket out, and factorise — it is an ordinary quadratic inequality wearing trig clothes.",
      },
      memo: [
        { type: "step", text: { en: "A square root is non-real exactly when what sits under it is negative:" } },
        { type: "step", text: { en: "1 − (m − 4)² &lt; 0 &nbsp;⟹&nbsp; (m − 4)² &gt; 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "m² − 8m + 16 &gt; 1 &nbsp;⟹&nbsp; m² − 8m + 15 &gt; 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(m − 3)(m − 5) &gt; 0, &nbsp;so the critical values are m = 3 and m = 5" }, ticks: ["ca"] },
        { type: "answer", text: { en: "m &lt; 3 &nbsp;&nbsp;or&nbsp;&nbsp; m &gt; 5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: a quadratic inequality that is GREATER than zero gives you the two OUTSIDE pieces, not the middle. Sketch the happy parabola through 3 and 5 and shade what is above the x-axis — the answer is the two arms, joined by \"or\", never by \"and\".",
        } },
      ],
      esplain: {
        en: "This question is really asking one thing: do you know that a cosine can never be bigger than 1 or smaller than −1? From (a), cos 22° is the square root of 1 − (m − 4)², and a square root stops being a real number the moment what is under it goes below zero. So write that down as an inequality and the trig disappears — you are left with 1 − (m − 4)² less than 0, which rearranges to (m − 4)² greater than 1. Multiply out, tidy up, and you have m² − 8m + 15 greater than 0, which factorises into (m − 3)(m − 5). Sketch the happy parabola: it cuts the x-axis at 3 and 5 and is above the axis on either side of them, so the answer is the two outer arms. There is a lovely check hiding here. cos 68° = m − 4, and a cosine must sit between −1 and 1, so m must sit between 3 and 5 for the given statement to make sense at all — which is exactly the piece your answer left out.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 ★ — WORKING BACKWARDS. You are given the general solution and
   have to find the constant that produced it (2026-Q2.4's mould).
   --------------------------------------------------------------- */
const q2 = {
  id: "gtrig.l4.q2",
  chapter: CH,
  topic: "level-4",
  archetype: "level4-reverse-engineered-general-solution-find-the-constant",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "gt11" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 4,
      prompt: {
        en: "The general solution of the equation &nbsp;b sin θ = 5 cos θ&nbsp; is &nbsp;θ = 51,34° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ.<br><br>Show that &nbsp;b = 4.",
      },
      hint: {
        en: "Solve the equation the ordinary way first, as if b were a number you knew — the angle in both functions is the same, so there is only one type it can be. Then read the answer they gave you: what does the k · 180° tell you about which ratio you ended up with, and what does 51,34° have to BE?",
      },
      memo: [
        { type: "step", text: { en: "Both angles are θ, so it is <b>type ②: same angles</b> — divide the whole line by cos θ." } },
        { type: "step", text: { en: "b tan θ = 5 &nbsp;⟹&nbsp; tan θ = 5/b" }, ticks: ["s/f"] },
        { type: "step", text: { en: "The given answer closes with k · 180°, which is the tan family, and a tan general solution is &nbsp;θ = ref. ∠ + k · 180°. &nbsp;So the reference angle is 51,34°." }, ticks: ["ca"] },
        { type: "step", text: { en: "tan 51,34° = 5/b &nbsp;⟹&nbsp; 1,25 = 5/b" }, ticks: ["ca"] },
        { type: "answer", text: { en: "b = 5/1,25 = 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: 51,34° is the REFERENCE angle, not b and not anything you can substitute directly. The equation you actually build is tan 51,34° = 5/b — one line, and the whole question turns on writing it.",
        } },
      ],
      esplain: {
        en: "Every general solution you have ever written went forwards: equation in, families out. This one runs the film backwards, and the trick is to do the forward journey anyway and then compare. Both functions carry the same angle θ, so it is type ②: divide the whole line by cos θ and the sine turns into a tan, leaving tan θ = 5 over b. Now look at what you were given. The answer closes with k · 180°, and only the tan family repeats every 180°, so that confirms you are on the right road. And a tan general solution is always the reference angle plus k · 180°, which means 51,34° IS the reference angle — the angle whose tan is 5 over b. Put that on a line: tan 51,34° = 5 over b. Your calculator says tan 51,34° is 1,25, so 5 divided by b is 1,25, and b is 4. One equation, built by reading somebody else's answer.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence determine the values of &nbsp;θ&nbsp;∈&nbsp;[−180°&nbsp;;&nbsp;180°]&nbsp; for which &nbsp;4 sin θ = 5 cos θ",
      },
      hint: {
        en: "Nothing new gets solved. You now own the general solution the question handed you — feed it whole numbers and keep what lands inside the interval, remembering that this family steps 180° at a time, not 360°.",
      },
      memo: [
        { type: "step", text: { en: "With b = 4 the general solution is the one given: &nbsp;θ = 51,34° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ" } },
        { type: "step", text: { en: "k = 0 → 51,34°, &nbsp;&nbsp;k = −1 → −128,66°, &nbsp;&nbsp;k = 1 → 231,34° (out), &nbsp;&nbsp;k = −2 → −308,66° (out)" } },
        { type: "answer", text: { en: "θ = 51,34°" }, ticks: ["a"] },
        { type: "answer", text: { en: "and &nbsp;θ = −128,66°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this family steps 180°, not 360°, so an interval 360° wide holds TWO answers rather than one. Walk k both ways until you overshoot at each end.",
        } },
      ],
      esplain: {
        en: "The word \"hence\" means the hard work is behind you. Part (a) confirmed that b is 4, so the general solution printed in the question is the real one, and all that is left is turning the handle. Start at k = 0, which gives 51,34°, comfortably inside the interval. Step downwards: k = −1 gives 51,34° − 180°, which is −128,66°, also inside. Step again and you get −308,66°, which has overshot the left-hand end. Go the other way from zero and k = 1 gives 231,34°, past the right-hand end. So two answers. The thing worth noticing is the step size. A sine or cosine family steps 360°, so a 360°-wide interval usually holds one answer per branch; a tan family steps 180°, so the same interval holds two. If your tan question produces only one answer, you probably stopped one k too early.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 ★ — THE PRODUCT TRICK (2024-Q5.4). Two factors, two unknowns,
   and the only way in is knowing that neither factor can leave the
   strip between −1 and 1.
   --------------------------------------------------------------- */
const q3 = {
  id: "gtrig.l4.q3",
  chapter: CH,
  topic: "level-4",
  archetype: "level4-product-of-two-ratios-equals-minus-one-both-at-their-limits",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "gt11" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 4,
      prompt: {
        en: "Determine the general solution of &nbsp;sin(x + 20°) · cos(y − 40°) = −1",
      },
      hint: {
        en: "You cannot factorise this and you cannot divide your way out of it — there are two different unknowns. So think about SIZE instead. How big can each of those two factors ever get, and what does that force if their product is exactly −1?",
      },
      memo: [
        { type: "step", text: { en: "Neither factor can leave the strip between −1 and 1: &nbsp;−1 ≤ sin(x + 20°) ≤ 1 &nbsp;and&nbsp; −1 ≤ cos(y − 40°) ≤ 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "So a product of exactly −1 is only possible if BOTH factors are at their limits — one of them 1 and the other −1. That is two cases." }, ticks: ["ca"] },
        { type: "step", text: { en: "<b>Case 1:</b> &nbsp;sin(x + 20°) = 1 &nbsp;⟹&nbsp; x + 20° = 90° + k · 360° &nbsp;⟹&nbsp; x = 70° + k · 360°" }, ticks: ["ca"] },
        { type: "step", text: { en: "&nbsp;&nbsp;&nbsp;&nbsp;with&nbsp; cos(y − 40°) = −1 &nbsp;⟹&nbsp; y − 40° = 180° + k · 360° &nbsp;⟹&nbsp; y = 220° + k · 360°" }, ticks: ["ca"] },
        { type: "step", text: { en: "<b>Case 2:</b> &nbsp;sin(x + 20°) = −1 &nbsp;⟹&nbsp; x + 20° = 270° + k · 360° &nbsp;⟹&nbsp; x = 250° + k · 360°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "&nbsp;&nbsp;&nbsp;&nbsp;with&nbsp; cos(y − 40°) = 1 &nbsp;⟹&nbsp; y − 40° = 0° + k · 360° &nbsp;⟹&nbsp; y = 40° + k · 360°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the two answers in each case belong TOGETHER. x = 70° only works with y = 220°, and x = 250° only works with y = 40°. Mixing one case's x with the other case's y gives a product of +1, not −1 — so write each case as a pair.",
        } },
      ],
      esplain: {
        en: "There is nothing to factorise, nothing to divide, and two different letters, so the usual roads are all shut. What opens it is a fact you already know: a sine and a cosine both live between −1 and 1, and never step outside. Now think about multiplying two numbers from that strip. The biggest size a product can possibly reach is 1 × 1, so getting exactly −1 is only possible if both factors are sitting right on the edge — one at 1 and the other at −1. There is no other way. That splits the question into two cases, and each case is two small type ① general solutions run side by side. sin(something) = 1 happens at 90°, sin(something) = −1 at 270°, cos(something) = 1 at 0°, cos(something) = −1 at 180°. Keep each case's x and y written as a pair, because they only produce −1 together — swap them around and you get +1.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — THE HARDEST IDENTITY IN THE SURVEY (2024-Q3.7's mould, flipped
   from cos-over-1−sin to sin-over-1−cos). Given that one expression is
   m, prove that a different one is 1 over m².
   --------------------------------------------------------------- */
const q4 = {
  id: "gtrig.l4.q4",
  chapter: CH,
  topic: "level-4",
  archetype: "level4-identity-given-expression-equals-m-prove-a-second-in-terms-of-m",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "gt9" },
  marks: 9,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 4,
      prompt: {
        en: "It is given that &nbsp;sin θ/(1 − cos θ) = m.<br><br>Prove that &nbsp;(1 − cos θ)/(1 + cos θ) = 1/m²",
      },
      hint: {
        en: "Look at what you want and at what you were given, and notice the m is SQUARED on one side and not on the other. So square the given statement — you are allowed to, because it is given, not something you are proving. Then the masked identity and a difference of two squares do the rest.",
      },
      memo: [
        { type: "step", text: { en: "The m in the answer is squared, so square the GIVEN statement — that is legal, because it is given rather than being proved:" } },
        { type: "step", text: { en: "m² = <span class=\"sfrac\"><span class=\"sf-n\">sin²θ</span><span class=\"sf-d\">(1 − cos θ)²</span></span>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "sin²θ = 1 − cos²θ &nbsp;(masked identity)" }, ticks: ["ca"] },
        { type: "step", text: { en: "1 − cos²θ = (1 − cos θ)(1 + cos θ) &nbsp;(difference of two squares)" }, ticks: ["ca"] },
        { type: "step", text: { en: "m² = <span class=\"sfrac\"><span class=\"sf-n\">(1 − cos θ)(1 + cos θ)</span><span class=\"sf-d\">(1 − cos θ)²</span></span> = (1 + cos θ)/(1 − cos θ)" }, ticks: ["ca"] },
        { type: "step", text: { en: "Turn both sides upside down: &nbsp;1/m² = (1 − cos θ)/(1 + cos θ)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ (1 − cos θ)/(1 + cos θ) = 1/m² = RHS" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: you may square the GIVEN statement as much as you like, because it is handed to you as true. What you may never do is cross-multiply the thing you are being asked to PROVE — that assumes the answer.",
        } },
      ],
      esplain: {
        en: "The whole question turns on one observation: the m you are given is not squared, but the m in the target is. So square the given statement. That is completely legal — it is given as true, so anything true of it is true of its square, and it is a different thing entirely from cross-multiplying the statement you are trying to prove. Squaring gives m² = sin²θ over (1 − cos θ)². Now the top is a squared sine, which is the masked identity 1 − cos²θ, and that in turn is a difference of two squares: (1 − cos θ)(1 + cos θ). Look at the bottom — (1 − cos θ) twice. One of them cancels, and m² comes out as (1 + cos θ) over (1 − cos θ). Compare that with what you want and you will see it is upside down, so flip both sides. Flipping an equation is fair as long as neither side is zero, and there you are.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Determine the values of &nbsp;θ&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; for which the statement in (a) is <b>not valid</b>",
      },
      hint: {
        en: "Hunt for every denominator in the whole question, including the given statement — and do not forget that m itself sits underneath in the answer, so m may not be zero either.",
      },
      memo: [
        { type: "step", text: { en: "The statement holds only where every denominator survives and where m itself is not zero. List them:" } },
        { type: "step", text: { en: "1 − cos θ = 0 &nbsp;⟹&nbsp; cos θ = 1 &nbsp;⟹&nbsp; θ = 0° or 360°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "1 + cos θ = 0 &nbsp;⟹&nbsp; cos θ = −1 &nbsp;⟹&nbsp; θ = 180°" }, ticks: ["ca"] },
        { type: "step", text: { en: "and m sits underneath in 1/m², so m ≠ 0: &nbsp;sin θ = 0 &nbsp;⟹&nbsp; θ = 0°, 180° or 360° — the same three values again" } },
        { type: "answer", text: { en: "θ = 0°, &nbsp;180° &nbsp;or&nbsp; 360°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: m appears in the answer as 1 over m², so m = 0 breaks the statement just as surely as a zero denominator does. Checking only the two written-out denominators is an incomplete answer.",
        } },
      ],
      esplain: {
        en: "A proof is only true where everything in it exists, so the job is to hunt down every denominator in the whole question — the given statement counts too. There are three things that can go wrong. The given fraction has 1 − cos θ underneath, which is zero when cos θ = 1, at 0° and again at 360°. The target fraction has 1 + cos θ underneath, which is zero when cos θ = −1, at 180°. And there is a sneaky third one: the answer is 1 over m², so m itself may not be zero, and m is sin θ over something, which is zero wherever sin θ is zero — 0°, 180° and 360°. That third condition happens to hand you exactly the same three values, which is a nice check that you have not missed anything. Three values in all, and each is written once.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — SIMPLIFY BEFORE YOU SOLVE, then check the values are allowed.
   (a) is a four-factor reduction; (b) ★ turns the tidy answer into a
   general-solution-in-an-interval AND asks whether the ORIGINAL
   expression is defined at the values it produced.
   --------------------------------------------------------------- */
const q5 = {
  id: "gtrig.l4.q5",
  chapter: CH,
  topic: "level-4",
  archetype: "level4-reduce-then-solve-then-check-the-original-is-defined",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "gt7" },
  marks: 9,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "Simplify &nbsp;<span class=\"sfrac\"><span class=\"sf-n\">sin(180° − x) · cos(360° − x)</span><span class=\"sf-d\">cos(180° + x) · sin(x − 90°)</span></span>&nbsp; to a single trigonometric ratio",
      },
      hint: {
        en: "Four factors, four separate lines, and write the split above each angle before anything else. Two of the four are going to come out as the same thing with a minus in front — watch what happens when you multiply those two together.",
      },
      memo: [
        { type: "step", text: { en: "sin(180° − x) = sin x &nbsp;&nbsp;·&nbsp;&nbsp; cos(360° − x) = cos x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos(180° + x) = −cos x" }, ticks: ["ca"] },
        { type: "step", text: { en: "sin(x − 90°) = −cos x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "(sin x · cos x)/((−cos x)(−cos x)) = (sin x · cos x)/cos²x = tan x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: sin(x − 90°) = −cos x, but cos(x − 90°) = +sin x. The two negative co-functions do not behave the same way, and this question quietly depends on getting that one right.",
        } },
      ],
      esplain: {
        en: "Four factors, so four lines, one at a time — her three steps on each: which quadrant, which reduction formula, plus or minus. 180° − x is in S where sine is positive, so the first factor stays sin x. 360° − x is in C where cosine is positive, so the second stays cos x. 180° + x is in T, so the cosine there turns negative: −cos x. And sin(x − 90°) is one of the negative co-functions, which converts sine into cosine and collects a minus: −cos x again. Now look at the bottom — two identical brackets, each carrying a minus. Multiplied together the minuses cancel and you get cos²x, positive. One cos x from the bottom cancels the cos x on top, leaving sin x over cos x, which is tan x. When a four-factor fraction is going to give a single clean ratio, this is usually the shape of it: something cancels, and a pair of minus signs quietly kill each other.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 4,
      prompt: {
        en: "Hence determine the values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; for which the expression in (a) is equal to &nbsp;−√3, &nbsp;and state whether the original expression is defined at each of them",
      },
      hint: {
        en: "The \"hence\" is doing real work — solve the tidy version, not the original. Then remember that tidying an expression does not remove its restrictions: go back to the four factors and ask what is underneath.",
      },
      memo: [
        { type: "step", text: { en: "By (a) the expression is simply tan x, so: &nbsp;tan x = −√3" }, ticks: ["s/f"] },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 60° &nbsp;(from the SIZE of the number, √3, never from the minus)" }, ticks: ["ca"] },
        { type: "step", text: { en: "tan is negative in <b>II and IV</b>: &nbsp;x = 180° − 60° = 120° &nbsp;&nbsp;or&nbsp;&nbsp; x = 360° − 60° = 300°" }, ticks: ["ca"] },
        { type: "step", text: { en: "Now check the original. Its denominator is cos(180° + x) · sin(x − 90°), and both of those are −cos x, so the expression only fails where cos x = 0 — at 90° and 270°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 120° &nbsp;and&nbsp; x = 300°, &nbsp;and the original expression is defined at both" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: an interval question on a TAN still only has one family, x = 120° + k · 180°, but that family lands TWICE inside [0°&nbsp;;&nbsp;360°]. Finding only 120° means you stopped one step too early.",
        } },
      ],
      esplain: {
        en: "Two jobs, and most people only do the first. Job one: the word \"hence\" tells you to use part (a), so you are solving tan x = −√3 and not wrestling with four reduced factors. Take the reference angle from the size of the number — tan 60° is √3, so ref.&nbsp;∠&nbsp;= 60° — and let the cross handle the minus. Tan is negative in the second and fourth quadrants, which gives 180° − 60° = 120° and 360° − 60° = 300°. Job two is the part that earns the star. Tidying an expression never removes its restrictions, so go back to the original and ask what sits underneath: cos(180° + x) times sin(x − 90°), which is (−cos x)(−cos x). That dies only where cos x = 0, at 90° and 270°. Neither of your two answers is one of those, so both are genuinely allowed — and saying so is part of the answer, not an optional extra.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — THE TWO-CONDITION QUESTION (her Test 7 Q1, pushed further). A
   square root sitting over a denominator: "real" needs BOTH that what
   is under the root is not negative AND that the bottom survives — and
   the two conditions overlap in exactly one place.
   --------------------------------------------------------------- */
const q6 = {
  id: "gtrig.l4.q6",
  chapter: CH,
  topic: "level-4",
  archetype: "level4-square-root-over-a-denominator-two-conditions-for-real",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "gt13" },
  marks: 9,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "It is given that &nbsp;E = <span class=\"sfrac\"><span class=\"sf-n\">√(sin x · cos x)</span><span class=\"sf-d\">2 sin x − 1</span></span>, &nbsp;where&nbsp; x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;270°].<br><br>Determine the values of x for which E is <b>undefined</b>",
      },
      hint: {
        en: "Undefined means one thing only: division by zero. Ignore the root completely for this part and solve the bottom — it needs the ratio on its own first, then a reference angle and a cross.",
      },
      memo: [
        { type: "step", text: { en: "Set the denominator equal to zero: &nbsp;2 sin x − 1 = 0 &nbsp;⟹&nbsp; sin x = 1/2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 30°, and sin is positive, so tick the cross at the <b>top</b>: I and II" }, ticks: ["ca"] },
        { type: "step", text: { en: "x = 30° &nbsp;&nbsp;or&nbsp;&nbsp; x = 180° − 30° = 150°, &nbsp;and both lie inside [0°&nbsp;;&nbsp;270°]" }, ticks: ["ca"] },
        { type: "answer", text: { en: "E is undefined at &nbsp;x = 30° &nbsp;and&nbsp; x = 150°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Undefined has exactly one meaning in this syllabus: the bottom of a fraction is zero. The square root on top cannot make anything undefined — at worst it makes it non-real, which is a different word and part (b)'s problem. So ignore the top completely. Set 2 sin x − 1 equal to zero and get the ratio on its own: sin x is a half. Now it is a small general solution inside a fixed interval. ref.&nbsp;∠&nbsp;= 30° off her second special triangle, sine is positive so tick the top two quadrants, and first quadrant gives 30° while second gives 180° − 30° = 150°. Both are inside [0°&nbsp;;&nbsp;270°], so both count. Hold on to those two values — part (b) needs them, and one of them is going to matter and the other is not.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 4,
      prompt: {
        en: "Determine the values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;270°]&nbsp; for which E is <b>real</b>",
      },
      hint: {
        en: "Two things must be true at the same time, not one. What is under the root may not be negative, and the bottom may not be zero. Do the root condition by asking when a product of two ratios is positive — that is a question about SIGNS, so it is a question about quadrants.",
      },
      memo: [
        { type: "step", text: { en: "Two conditions have to hold together: what is under the root may not be negative, AND the denominator may not be zero." } },
        { type: "step", text: { en: "sin x · cos x ≥ 0 means sin x and cos x must have the <b>same sign</b>, or one of them is zero" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Both positive is quadrant I; both negative is quadrant III: &nbsp;0° ≤ x ≤ 90° &nbsp;or&nbsp; 180° ≤ x ≤ 270°" }, ticks: ["ca"] },
        { type: "step", text: { en: "At the four boundary values 0°, 90°, 180° and 270° one ratio is zero, so the product is zero — and √0 = 0, which is real, so all four stay IN" }, ticks: ["ca"] },
        { type: "step", text: { en: "From (a), 30° and 150° are not allowed. 150° is already outside the set above, so only 30° has to be taken out" }, ticks: ["ca"] },
        { type: "answer", text: { en: "0° ≤ x ≤ 90°, &nbsp;x ≠ 30° &nbsp;&nbsp;or&nbsp;&nbsp; 180° ≤ x ≤ 270°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: \"real\" and \"defined\" are two different questions and this expression needs both answered. The root decides real; the denominator decides defined. An answer that only shades the quadrants has done half the work.",
        } },
      ],
      esplain: {
        en: "The word \"real\" is asking two questions at once and you have to answer both. First: is what is under the root ever negative? sin x · cos x is a product, and a product is positive only when the two things have the same sign. Both are positive in the first quadrant and both are negative in the third, so the root is happy on 0° to 90° and on 180° to 270°. The four boundary values are fine too — one ratio is zero there, the product is zero, and the square root of zero is zero, which is a perfectly real number. Second: does E exist at all? Part (a) said no at 30° and at 150°. Now compare: 150° sits in the second quadrant, which the root already threw out, so it changes nothing. But 30° is right in the middle of the piece you just kept, so it has to be cut out on its own. That single missing point is the whole difference between a level 3 answer and this one.",
      },
    },
  ],
};

export const gtrigLevel4Questions = [q1, q2, q3, q4, q5, q6];
