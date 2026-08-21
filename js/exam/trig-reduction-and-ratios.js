/* ============================================================
   EXAM FOCUS — 2D Trigonometry · Reductions & ratios
   SOURCE: September Test 2 (practice), QUESTION 1 — the no-calculator
   trig block: co-function, ratio-from-a-sketch, reduction formulae.
   (Overnight run #1, stage 3b, 2026-08-21.)
   ------------------------------------------------------------
   PRINT SOURCE:
     Desktop\Eksamen Vraestelle\Gr11 IEB Nov\Sept Practice\
       Sept-T2-Practice-QP.tex      Q1(a)–(c)
       Sept-T2-Practice-Memo.tex    1(a)–1(c), 9 ticks
       Sept-T2-blueprint.md         §1 blueprint table, §4 scope walls
   Same working, same ticks, same WATCH OUT / REMEMBER cards as the
   print memo. Connective prose is kept as tick-less `step` blocks;
   `hint` and `esplain` are freshly authored per part.

   LEVELS: T2's blueprint assigns ONE level per sub-part (unlike T1,
   which splits a sub-part's marks across two levels), so the mapping
   here is 1:1 with the printed grid — (a) 1, (b) 2, (c) 3. Nothing in
   this question is starred in the print memo; T2's only two ★ parts are
   3(e) and 5(d).

   ⚠️ THE SKETCH IN 1(b) STAYS THE LEARNER'S JOB. "With the aid of a
   sketch" is kept verbatim in the prompt — the learner draws the
   quadrant-3 triangle on paper, which is the whole point of the part
   (EXAM-FOCUS-PLAN.md: "pen and paper is the point"). The print memo
   draws its own TikZ sketch as part of the REVEAL; the schema has no
   diagram field, so that sketch is carried in words inside the memo
   ((−4 ; −3) with r = 5) and unpacked in the esplain. No mark is lost:
   the print memo's tick sits on identifying the quadrant and setting up
   y = −3, r = 5, not on the drawing itself. Future diagram-engine
   candidate — a plain axes-plus-triangle SVG, no circle engine needed.

   ⚠️⚠️ lostQuest IS A DOCUMENTED PLACEHOLDER — READ THIS.
   Blipwork's `trig` chapter is "2D Trigonometry": its seven rounds
   (t1–t7, js/config.js) are ENTIRELY sine rule / cosine rule / area
   rule. NOTHING in Blipwork — not trig, not tgraph (which is trig
   GRAPHS, tg1–tg7) — teaches co-functions, ratio-from-a-sketch or
   reduction formulae. Pointing "I'm lost" at t1 ("Which rule fits?")
   would drop a learner stuck on a reduction formula into a sine-rule
   round, which is worse than no link at all and breaks her session-E
   ruling ("take them to the SPECIFIC round that teaches and drills
   this"). So lostQuest.quest is the placeholder below.
   It degrades SAFELY, by three independent gates in js/exam-play.js's
   lostQuestLink(): the id is never in app.state.openQuests, and even if
   it were, chapterById/quests.find/questDef would all fail to resolve
   and the function returns null. The result is simply no reteach
   button — never a dead-end, never a throw.
   RESOLVING IT needs one of: (1) new trig rounds for reductions /
   ratios (a real chapter-extension job, `add-chapter` skill), or (2)
   her ruling that these questions live somewhere else. Until then this
   file is excluded from the harness's lostQuest-resolves check and
   asserted to carry the placeholder instead.

   ⚠️ UNREGISTERED. Registering (a DAY-session job) needs:
     1. js/exam/index.js — import + set REGISTRY.trig = [...].
     2. js/config.js — EXAM_CHAPTERS must include "trig".
     3. verify-exam.html Part 6 — SCOPE_WALLS has an `eqn` key ONLY.
        Proposed trig wall from the t1–t7 breakdown:
        which-rule-fits · sine-rule-sides · sine-rule-angles ·
        cosine-rule-sides · cosine-rule-angles · area-rule ·
        mixed-problems
        ⚠️ "reduction-and-ratios" (this file) and "general-solutions"
        (js/exam/trig-general-solutions.js) are NOT in that list —
        they widen the chapter past its own built rounds. Adding them
        to the wall is a decision, not a formality: see the lostQuest
        note above.
     4. verify-exam.html Part 2 — the pilot-only assertions
        (EXAM_CHAPTERS === ["eqn"]; every non-eqn chapter empty) break.
     5. js/exam/_schema.js is unchanged and unchallenged by this file.
   ============================================================ */

const PAPER = "sept-t2";
/* See the header. Non-empty strings, so validateQuestion() passes; not
   resolvable, so the reteach link never renders. Deliberate. */
const LOST_PENDING = { chapter: "trig", quest: "PENDING-no-round-teaches-this" };

const t2q1 = {
  id: "trig.rr.t2q1",
  chapter: "trig",
  topic: "reduction-and-ratios",
  archetype: "no-calculator-trig-block-cofunction-ratio-reduction",
  paper: PAPER,
  lostQuest: LOST_PENDING,
  marks: 9,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator. Show all your working.</em><br>If sin 34° = t, write cos 56° in terms of t.",
      },
      hint: {
        en: "Add the two angles together. If they come to 90°, the question is handing you a co-function and nothing else is needed.",
      },
      memo: [
        { type: "step", text: { en: "34° and 56° add up to 90°, so this is a co-function:" } },
        { type: "answer", text: { en: "cos 56° = cos(90° − 34°) = sin 34° = t" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: cos(90° − θ) = sin θ &nbsp;and&nbsp; sin(90° − θ) = cos θ. Whenever two angles in a question add to 90°, that is the whole clue.",
        } },
      ],
      esplain: {
        en: "Sine and cosine are the same measurement taken from opposite ends of a right-angled triangle — what is “opposite” for one acute angle is “adjacent” for the other. Because those two acute angles always add to 90°, the sine of one is always the cosine of the other. So cos 56° and sin 34° are not merely close in value: they are the same number, written two ways. One mark, no calculation — but only if you spot the 90° first, which is why adding the two angles is always your opening move on a question shaped like this.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>It is given that 5 sin β + 3 = 0 &nbsp;and&nbsp; tan β &gt; 0.<br>With the aid of a sketch, determine the value of 5 cos β + tan β.",
      },
      hint: {
        en: "Get sin β on its own first, then read the two clues together: which single quadrant has sin negative AND tan positive? Draw your triangle in that quadrant and let Pythagoras find the missing side — signs and all.",
      },
      memo: [
        { type: "step", text: { en: "First get the ratio on its own: &nbsp;5 sin β = −3 &nbsp;⟹&nbsp; sin β = −3/5" } },
        { type: "step", text: { en: "sin β is <b>negative</b> and tan β is <b>positive</b> — that can only be the <b>third quadrant</b>. Sketch it there: the point (−4 ; −3), with y = −3 and r = 5." }, ticks: ["s/f"] },
        { type: "step", text: { en: "Pythagoras gives the third side, and in the third quadrant x is <b>negative</b>: &nbsp;x² = 5² − 3² = 16 &nbsp;⟹&nbsp; x = −4" }, ticks: ["ca"] },
        { type: "step", text: { en: "cos β = x/r = −4/5 &nbsp;&nbsp;·&nbsp;&nbsp; tan β = y/x = (−3)/(−4) = 3/4" }, ticks: ["ca"] },
        { type: "answer", text: { en: "5 cos β + tan β = 5(−4/5) + 3/4 = −4 + 3/4 = −13/4 = −3,25" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the sign of x. In the third quadrant <i>both</i> x and y are negative. A learner who writes x = 4 gets cos β = 4/5 and loses the last two marks in one step — and notice that tan β would then come out negative, which contradicts what the question told you. That contradiction is your own check.",
        } },
      ],
      esplain: {
        en: "Two clues, one quadrant. Run the quadrants in your head — Q1 everything positive, Q2 only sin, Q3 only tan, Q4 only cos — and “sin negative and tan positive” lands on Q3 and nowhere else. That matters because sin β = −3/5 on its own would fit two quadrants, and the two would give opposite answers. Once the quadrant is fixed, the sketch does the rest: y = −3 and r = 5 are handed to you, Pythagoras finds the third side as 4, and the quadrant tells you it must be −4. Note that r is a length, so r is never negative — only x and y carry signs. From there every ratio is just two of those three numbers divided, and no calculator is needed anywhere.",
      },
    },
    {
      id: "c",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Simplify: &nbsp;[ cos(180° − x) · sin(90° + x) ] / cos²(90° + x)",
      },
      hint: {
        en: "Take the three reductions one at a time, on their own line each, before you try to put anything together. For each one ask two questions in this order: does the ratio change, and what sign does it get?",
      },
      memo: [
        { type: "step", text: { en: "Take the three reductions one at a time." } },
        { type: "step", text: { en: "cos(180° − x) = −cos x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "sin(90° + x) = cos x" }, ticks: ["ca"] },
        { type: "step", text: { en: "cos(90° + x) = −sin x &nbsp;⟹&nbsp; cos²(90° + x) = (−sin x)² = sin²x" }, ticks: ["ca"] },
        { type: "step", text: { en: "Now put them back:" } },
        { type: "answer", text: { en: "(−cos x)(cos x) / sin²x = −cos²x / sin²x &nbsp;&nbsp;<b>OR</b>&nbsp;&nbsp; −1/tan²x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: squaring kills the minus in the denominator — (−sin x)² = +sin²x, never −sin²x. That one sign is the difference between −cos²x/sin²x and +cos²x/sin²x.",
        } },
      ],
      esplain: {
        en: "Reduction formulae feel like a wall of rules, but there are really only two questions and they always come in the same order. First: does the ratio change? Only 90° ± x flips sin into cos (and cos into sin) — 180° ± x and 360° ± x leave the ratio exactly as it was and do nothing but decide a sign. Second: what sign? Put the angle in its quadrant and ask whether the original ratio is positive or negative there. Do those two in order, one reduction per line, and the wall becomes three small decisions. The last piece of this question is not trig at all — it is the squaring. The reduction gives −sin x, but the question squares it, and squaring any negative makes it positive, so the denominator comes out clean. Miss that and your whole answer is the right size with the wrong sign.",
      },
    },
  ],
};

export const trigReductionAndRatiosQuestions = [t2q1];
