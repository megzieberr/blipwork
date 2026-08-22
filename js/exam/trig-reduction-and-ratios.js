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
        en: "Add the two angles first. If they make 90°, the question is handing you a co-function — and a co-function does one job only: it converts between sin and cos. 90° − θ lives in A on the wheel, where everything is positive, so nothing here is going to need a minus.",
      },
      memo: [
        { type: "step", text: { en: "34° and 56° add up to 90°, so this is a co-function:" } },
        { type: "answer", text: { en: "cos 56° = cos(90° − 34°) = sin 34° = t" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: cos(90° − θ) = sin θ &nbsp;and&nbsp; sin(90° − θ) = cos θ. Whenever two angles in a question add to 90°, that is the whole clue.",
        } },
      ],
      esplain: {
        en: "Draw one right-angled triangle and label it twice — once from the angle at the bottom, once from the angle at the top. The side that is <i>across from</i> the bottom angle is the side <i>next to</i> the top one, and the hypotenuse never moves. Because those two acute angles always add to 90°, the sine of one is the cosine of the other, every time. That is all a co-function is: it converts between sin and cos. And it is not a separate rule sitting off to one side — co-functions live inside the All Strippers Take Cash wheel. 90° − θ is an A angle, everything positive, so no minus comes along for the ride and cos 56° is simply sin 34°, which is t. The one to watch is its neighbour: 90° + θ has crossed over into S, where only sine survives. Cosine is not sine, so it picks up the minus, and cos(90° + θ) = −sin θ. One plus sign is the whole difference between them — which is why your opening move on a question shaped like this is always the same: add the two angles and see what they make.",
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
        en: "Step ① never changes: get the function on its own. Then draw your cross and tick it twice — once for the quadrants where sin is negative, once for the quadrants where tan is positive. The quadrant that collects two ticks is the one you sketch in, and (pyth) finds the side that is missing. Let the quadrant hand you the signs.",
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
        en: "This is a special sum, and it runs on the five steps: isolate the function, determine the quadrant, sketch the diagram, calculate the unknown side, substitute. Step ① is quick — 5 sin β = −3, so sin β = −3/5. Step ② is where the whole teaching sits. Draw the little cross and tick it twice, in two colours if that helps you see it: sin is negative in III and IV, tan is positive in I and III. The quadrant that got two ticks wins, and that is III. All Strippers Take Cash says the same thing round the bow tie — A is everything, S is sine only, T is tan only, C is cos only — so “sin negative and tan positive” can land on T and nowhere else. That double tick is the reason the step exists: sin β = −3/5 on its own fits two quadrants, and the two would hand you opposite answers. After that the sketch does the work. You are given y = −3 and r = 5, (pyth) gives you 4 for the side that is left, and the quadrant tells you to write it as −4, because in the third quadrant both x and y are negative. r never takes a minus — it is the radius, and a radius is a length. From there every ratio is two of those three numbers divided, and the calculator stays in your bag.",
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
        en: "Three reductions, three separate lines — and write the split above each angle before you write anything else. For each one, the three steps in order: which quadrant, which reduction formula, then + or −. And anything you are about to square goes into block brackets first.",
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
        en: "A reduction is nothing more sinister than rewriting an angle as an acute angle, and the three steps handle every single one: quadrant, reduction formula, sign. Only 90° ± x converts between sin and cos — that is exactly what makes it a co-function. 180° ± x and 360° ± x leave the ratio alone and do nothing but decide a sign, which is why cos(180° − x) is still a cosine and has only turned negative. The middle one, sin(90° + x), converts to cos, and 90° + x sits in S where sine is positive, so it comes out clean as cos x. The third one is the trap: cos(90° + x) is in S as well, but cosine is not sine, so it picks up the minus — cos(90° + x) = −sin x. Then comes the piece that quietly saves the mark. The question squares that one, so put it in block brackets first, [−sin x]², and reduce inside the brackets before you square. The minus dies in there and sin²x comes out positive. Skip the brackets and your answer is exactly the right size with the wrong sign.",
      },
    },
  ],
};

export const trigReductionAndRatiosQuestions = [t2q1];
