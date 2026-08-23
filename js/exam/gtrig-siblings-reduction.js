/* ============================================================
   EXAM FOCUS — General Trig · SIBLING CARDS for the skill "reduction"
   (SESSION F2 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/F2-gtrig-part2.md.)
   ------------------------------------------------------------
   Five new cards, taking this tile from one to six.

   WHY THIS FILE EXISTS. "Reduction" held exactly ONE card —
   trig.rr.t2q1(c), the three-term fraction off her September T2 practice
   paper. One tap and the tile ran dry, and the shapes a real paper opens
   with (a rotation past 360°, a squared term, the six-factor monster)
   were nowhere.

   SOURCE OF THE MATHS: METHODS-trig.md Parts E, F and G —
     · E2, her three steps, in this order every time: ① which quadrant
       ② which reduction formula ③ + or −;
     · E5 ROTATIONS, "angles > 360 = −360°" and "angles < −90 = +360",
       written ONE turn at a time above the angle ([−360°], [+360° +360°])
       because that is how her kids count them;
     · F tip ③, BLOCK BRACKETS before any square: reduce inside the
       brackets first, then square, so the minus dies — [−cos x]² = cos²x;
     · G, reductions with a variable: reduce every factor IN PLACE, keep
       the minus signs visible in brackets, then cancel.
   ARCHETYPES from the paper bank's trig inventory
   (survey/SURVEY-Topic-Banks.md §2): 2026-Q5.2's six-and-seven-term
   simplifications, 2024-Q2.1's pair, 2025-Q2.2's numeric one, and
   SURVEY-Nov-P2.md's Q4(c) shape. Every angle and letter here is fresh.

   WHAT THE FIVE COVER, and why these five:
     q1  the two straight rotations — one over 360°, one over 45° — so
         the tile OPENS on something a frightened learner can finish
     q2  the two variable shapes that decide most marks: an expression
         that lands on −tan x, and a square that only comes out right if
         the block brackets go in first
     q3  the six-factor monster the SAG's own paper prints, ending on
         −tan²θ — three reductions on top, three underneath, one of them
         needing a rotation before it can be reduced at all
     q4  a NEGATIVE angle that needs two turns of +360°, then the numeric
         three-factor one that lands on a surd
     q5  the two squares that are really the same co-function twice over,
         then the everything-cancels-to-1 shape her p15/p16 examples run

   NO DIAGRAM ANYWHERE ON THIS TILE. The bow tie and the little quadrant
   cross are things the learner draws on paper — printing them would do
   the one step the whole skill is about (sessions/F2-gtrig-part2.md:
   "the bow tie is the learner's").

   LEVELS: q1 level 1, q2 level 2, q3/q4/q5 level 2-3. Nothing here is
   level 4 — the ★ questions live on the gtrig level-4 tile, and this is
   a tile a frightened learner drills basics on (her ruling 5,
   EXAM-BUILD-DAY.md).

   lostQuest: gt5 "Reductions: numbers" for the two numeric cards, gt7
   "Reductions: variables" for the three that carry an x or a θ.
   ============================================================ */

const PAPER = "siblings";
const CH = "gtrig";
const LOST_NUM = { chapter: CH, quest: "gt5" };   /* Reductions: numbers   */
const LOST_VAR = { chapter: CH, quest: "gt7" };   /* Reductions: variables */

/* ---------------------------------------------------------------
   q1 — THE TWO STRAIGHT ROTATIONS (her E5).
   Both parts are one turn of 360° and then one ordinary reduction, so
   the learner meets the whole routine at its smallest size before the
   variables arrive.
   --------------------------------------------------------------- */
const q1 = {
  id: "gtrig.sib.red.q1",
  chapter: CH,
  topic: "reduction",
  archetype: "reduction-numeric-single-rotation-to-a-special-angle",
  paper: PAPER,
  lostQuest: LOST_NUM,
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Determine the value of &nbsp;sin 480°",
      },
      hint: {
        en: "480° is more than one full turn, so take a whole 360° off first and see where you land. Then it is the ordinary routine: which quadrant, which reduction formula, plus or minus.",
      },
      memo: [
        { type: "step", text: { en: "Take one full turn off: &nbsp;sin 480° &nbsp;[−360°]&nbsp; = sin 120°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "120° is a <b>second-quadrant</b> angle, 180° − 60°, and in S <b>sine is positive</b>: &nbsp;sin 120° = sin 60°" } },
        { type: "answer", text: { en: "= √3/2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: write the turn above the angle, one 360° at a time — [−360°] — never a single [−480°] jump. The marker is looking for the angle you actually landed on.",
        } },
      ],
      esplain: {
        en: "480° is just a walk round the circle that did not stop at the finish line. One full turn brings you back to exactly where you started, so sin 480° and sin 120° are the same height on the sine curve — take 360° off and nothing changes. Now you are inside one turn and the ordinary routine takes over: 120° sits in the second quadrant, which is S on All Strippers Take Cash, and S is the quadrant where sine stays positive. Split it as 180° − 60° so the acute angle 60° shows up, and because sine is positive there, no minus comes along. That leaves sin 60°, which is one of the eight values you read straight off her two triangles: √3 over 2. Three small moves, no calculator, and the only place it goes wrong is if you subtract 360° twice by accident.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Determine the value of &nbsp;tan 405°",
      },
      hint: {
        en: "Same first move as (a): one turn off. What is left is a special angle you know by heart from the square triangle.",
      },
      memo: [
        { type: "step", text: { en: "tan 405° &nbsp;[−360°]&nbsp; = tan 45°" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "= 1" }, ticks: ["a"] },
      ],
      esplain: {
        en: "This one is short on purpose. 405° is 360° plus 45°, so one turn round the circle takes you straight back to 45° — and 45° needs no reduction at all, because it is already acute and already sitting in the first quadrant where everything is positive. From the square triangle, the one with two 45° angles and sides 1, 1 and √2, tan 45° is opposite over adjacent, which is 1 over 1. So the answer is 1. Notice what did NOT happen: there was no quadrant to argue about and no sign to pick, because after the rotation the angle landed in A. That is the whole reason the rotation goes first — it turns a scary-looking angle into one of the four you already know.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — THE TWO VARIABLE SHAPES THAT DECIDE MARKS.
     (a) lands on −tan x, and its denominator is squared, so tip ③
         (block brackets) is what keeps the sign right;
     (b) a square minus 1, which is the masked identity wearing a hat.
   --------------------------------------------------------------- */
const q2 = {
  id: "gtrig.sib.red.q2",
  chapter: CH,
  topic: "reduction",
  archetype: "reduction-variable-three-factor-with-a-squared-denominator",
  paper: PAPER,
  lostQuest: LOST_VAR,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Simplify: &nbsp;<span class=\"sfrac\"><span class=\"sf-n\">sin(180° + x) · cos(360° − x)</span><span class=\"sf-d\">cos²(180° − x)</span></span>",
      },
      hint: {
        en: "Three reductions, three separate lines, and write the split above each angle before you write anything else. The squared one goes into block brackets FIRST — reduce inside the brackets, then square.",
      },
      memo: [
        { type: "step", text: { en: "Take the three reductions one at a time." } },
        { type: "step", text: { en: "sin(180° + x) = −sin x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos(360° − x) = cos x" }, ticks: ["ca"] },
        { type: "step", text: { en: "cos(180° − x) = −cos x &nbsp;⟹&nbsp; cos²(180° − x) = [−cos x]² = cos²x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "(−sin x · cos x)/cos²x = −sin x/cos x = −tan x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: squaring kills the minus. [−cos x]² = +cos²x, never −cos²x. Reduce inside the block brackets first and then square, and the sign looks after itself.",
        } },
      ],
      esplain: {
        en: "A reduction is nothing more sinister than rewriting an angle as an acute angle, and her three steps handle every single one: quadrant, reduction formula, sign. Do them one factor at a time, on their own lines, and never in your head. 180° + x is in T, where only tan survives, so a sine there turns negative. 360° − x is in C, where only cos survives, so the cosine comes out clean. The third one is where the marks go missing. cos(180° − x) is in S, so it collects a minus and becomes −cos x — but the question squares it, and a square with a minus inside is a trap unless you put block brackets round it first. Write [−cos x]², square it, and the minus dies: cos²x, positive. Now everything cancels down to −sin x over cos x, and sin over cos has a name. It is tan.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Simplify: &nbsp;cos²(180° − x) − 1",
      },
      hint: {
        en: "Block brackets before you square, then look hard at what is left. Something minus 1, when the something is a squared ratio, is almost always one of the masked identities in disguise.",
      },
      memo: [
        { type: "step", text: { en: "cos(180° − x) = −cos x &nbsp;⟹&nbsp; cos²(180° − x) = [−cos x]² = cos²x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos²x − 1 = −(1 − cos²x)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= −sin²x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: sin²x + cos²x = 1 has two masked twins — 1 − cos²x = sin²x and 1 − sin²x = cos²x. The minute you see a square next to a 1, one of the three is standing right in front of you.",
        } },
      ],
      esplain: {
        en: "Two moves, and both of them are habits rather than cleverness. First the block brackets: cos(180° − x) is a second-quadrant angle, so it reduces to −cos x, and squaring that gives cos²x with the minus gone. Now you are looking at cos²x − 1, which is nearly the masked identity but the wrong way round. So pull a minus out the front and read it again: −(1 − cos²x). Inside the bracket is 1 − cos²x, and that is one of the two masked identities — it is sin²x. Put it back and the whole thing is −sin²x. The pattern worth remembering is the shape, not the answer: a squared trig ratio sitting next to a 1 is nearly always sin²θ + cos²θ = 1 wearing a mask, and the only skill is spotting which of its three faces you are looking at.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — THE SIX-FACTOR MONSTER (SURVEY-Topic-Banks.md §2, 2026-Q5.2.1's
   seven-term shape, cut to six with fresh angles). Three factors on
   top, three underneath, and one of them — tan(540° + θ) — cannot be
   reduced until a rotation has been taken off it. Lands on −tan²θ.
   --------------------------------------------------------------- */
const q3 = {
  id: "gtrig.sib.red.q3",
  chapter: CH,
  topic: "reduction",
  archetype: "reduction-variable-six-factor-fraction-with-a-rotation",
  paper: PAPER,
  lostQuest: LOST_VAR,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 3,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Simplify: &nbsp;<span class=\"sfrac\"><span class=\"sf-n\">sin(180° + θ) · cos(θ − 90°) · tan(360° − θ)</span><span class=\"sf-d\">cos(180° − θ) · sin(90° + θ) · tan(540° + θ)</span></span>",
      },
      hint: {
        en: "Six factors, six separate lines — do not try to hold any of it in your head. One of the six is bigger than 360°, so it needs a turn taken off before it can be reduced at all. Two of the six are 90° angles, and those are the only ones that change sin into cos or cos into sin.",
      },
      memo: [
        { type: "step", text: { en: "Reduce every factor in place, one line each, keeping the minus signs visible." } },
        { type: "step", text: { en: "sin(180° + θ) = −sin θ &nbsp;&nbsp;·&nbsp;&nbsp; cos(θ − 90°) = sin θ" }, ticks: ["s/f"] },
        { type: "step", text: { en: "tan(360° − θ) = −tan θ" }, ticks: ["ca"] },
        { type: "step", text: { en: "cos(180° − θ) = −cos θ &nbsp;&nbsp;·&nbsp;&nbsp; sin(90° + θ) = cos θ" }, ticks: ["ca"] },
        { type: "step", text: { en: "tan(540° + θ) &nbsp;[−360°]&nbsp; = tan(180° + θ) = tan θ" }, ticks: ["ca"] },
        { type: "step", text: { en: "Now put them back: &nbsp;(−sin θ · sin θ · −tan θ)/(−cos θ · cos θ · tan θ) = (sin²θ · tan θ)/(−cos²θ · tan θ)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= −sin²θ/cos²θ = −tan²θ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: cos(θ − 90°) = +sin θ, but sin(θ − 90°) = −cos θ. The two negative co-functions do NOT behave the same way — one keeps its plus and the other does not.",
        } },
      ],
      esplain: {
        en: "Six factors looks like six problems, but it is one problem done six times, and the trick is refusing to rush. Give every factor its own line. Two of them, cos(θ − 90°) and sin(90° + θ), are 90° angles, which is the only kind that converts between sin and cos — that is what a co-function is. The other four leave the ratio alone and only decide a sign. And one of them, tan(540° + θ), is too big to be on the wheel at all, so a full turn comes off first: 540° − 360° is 180°, which puts it in T where tan is positive, so it is simply tan θ. Once every factor is reduced, look for what cancels before you multiply anything out. There is a tan θ on the top and a tan θ underneath — gone. That leaves sin²θ over −cos²θ, and sin over cos is tan, so the whole monster is −tan²θ. Two minus signs on top made a plus; the single minus underneath is the one that survives.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — NEGATIVE ROTATION, THEN A NUMERIC ONE THAT LANDS ON A SURD.
     (a) −750° needs +360° TWICE (her E5 "< −90 = +360", written one
         turn at a time);
     (b) three numeric reductions feeding three special-angle values.
   --------------------------------------------------------------- */
const q4 = {
  id: "gtrig.sib.red.q4",
  chapter: CH,
  topic: "reduction",
  archetype: "reduction-numeric-negative-rotation-then-three-factor-surd",
  paper: PAPER,
  lostQuest: LOST_NUM,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Determine the value of &nbsp;cos(−750°)",
      },
      hint: {
        en: "Her rule for negative angles: anything below −90° gets 360° ADDED, and you keep adding turns until you are back inside one revolution. Write each turn above the angle separately. Then remember that −θ is a fourth-quadrant form.",
      },
      memo: [
        { type: "step", text: { en: "The angle is below −90°, so add whole turns until it is back inside one revolution:" } },
        { type: "step", text: { en: "cos(−750°) &nbsp;[+360° +360°]&nbsp; = cos(−30°)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "−θ is a <b>fourth-quadrant</b> form, and in C <b>cosine is positive</b>: &nbsp;cos(−30°) = cos 30°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= √3/2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: cos(−θ) = +cos θ, but sin(−θ) = −sin θ and tan(−θ) = −tan θ. Cosine is the one that survives a negative angle unharmed, because −θ lands in C.",
        } },
      ],
      esplain: {
        en: "A negative angle just means you walked round the circle clockwise instead of anticlockwise, and −750° means you walked more than two full turns that way. Adding 360° puts one of those turns back without moving where you finished, so add one turn to get −390°, and another to get −30°. Write them above the angle one at a time — [+360° +360°] — because that is how you keep count and how the marker sees what you did. Now −30° is small enough to read off the wheel, and −θ is a fourth-quadrant form, which is C. In C only cosine is positive, and cosine is exactly what you have, so no minus appears: cos(−30°) is simply cos 30°, and that is √3 over 2 off the long triangle. If the question had asked for sin(−750°) the answer would have picked up a minus, because sine does not survive in C.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Determine the value of &nbsp;<span class=\"sfrac\"><span class=\"sf-n\">sin 300° · cos 225°</span><span class=\"sf-d\">tan 240°</span></span>",
      },
      hint: {
        en: "Three angles, three reductions, three lines — split each one above the angle first. Every acute angle you are left with is one of the special ones, so nothing here needs a calculator. Two negatives on top will look after themselves.",
      },
      memo: [
        { type: "step", text: { en: "sin 300° &nbsp;[360° − 60°]&nbsp; = −sin 60° = −√3/2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos 225° &nbsp;[180° + 45°]&nbsp; = −cos 45° = −1/√2" }, ticks: ["ca"] },
        { type: "step", text: { en: "tan 240° &nbsp;[180° + 60°]&nbsp; = tan 60° = √3" }, ticks: ["ca"] },
        { type: "step", text: { en: "Top: &nbsp;(−√3/2) × (−1/√2) = √3/(2√2) &nbsp;— and that √3 cancels the √3 underneath" } },
        { type: "answer", text: { en: "= 1/(2√2) = √2/4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the two minus signs on top multiply to a plus, so the answer is positive. Losing one of them is the single most common way this question goes wrong.",
        } },
      ],
      esplain: {
        en: "Nothing new here — it is her three steps run three times, and then ordinary arithmetic with surds. 300° splits as 360° − 60°, which is C, where sine is negative, so sin 300° is −sin 60°. 225° splits as 180° + 45°, which is T, where cosine is negative, so cos 225° is −cos 45°. 240° splits as 180° + 60°, which is T again — and T is tan's own quadrant, so tan 240° stays positive and equals tan 60°. Now swap in the special-angle values off her two triangles and the calculator stays in your bag. The two minuses on top cancel each other, √3 on top cancels the √3 underneath, and you are left with 1 over 2√2. Multiply top and bottom by √2 to tidy the surd out of the denominator and it becomes √2 over 4. Both forms are correct; the rationalised one is the one she writes.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — TWO SQUARES THAT ARE THE SAME CO-FUNCTION TWICE, then the
   everything-cancels-to-1 shape (her p15 eg.5 / p16 eg.7 mould, fresh
   angles). The 720° factor forces TWO turns off before it reduces.
   --------------------------------------------------------------- */
const q5 = {
  id: "gtrig.sib.red.q5",
  chapter: CH,
  topic: "reduction",
  archetype: "reduction-variable-squares-then-four-factor-cancelling-to-one",
  paper: PAPER,
  lostQuest: LOST_VAR,
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Simplify: &nbsp;sin²(x − 90°) + cos²(180° + x)",
      },
      hint: {
        en: "Block brackets on both terms before you square anything. Then look at what the two brackets actually contain — you may find you are adding the same thing to itself.",
      },
      memo: [
        { type: "step", text: { en: "sin(x − 90°) = −cos x &nbsp;⟹&nbsp; sin²(x − 90°) = [−cos x]² = cos²x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos(180° + x) = −cos x &nbsp;⟹&nbsp; cos²(180° + x) = [−cos x]² = cos²x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "cos²x + cos²x = 2cos²x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this is NOT sin²x + cos²x = 1. Reduce first and you can see both terms turned into the same cosine — a learner who reaches for the identity without reducing writes 1 and loses every mark.",
        } },
      ],
      esplain: {
        en: "The whole question is a test of whether you reduce before you reach for an identity. It looks like sin² plus cos², which is the most famous 1 in the syllabus, so the temptation is to write 1 and move on. But those are not the same angle, and an identity only works when the angles match. So reduce each one first, inside block brackets. sin(x − 90°) is one of her negative co-functions and it comes out as −cos x; squaring kills the minus and leaves cos²x. cos(180° + x) is a third-quadrant angle where cosine is negative, so it is also −cos x, and squaring it also leaves cos²x. Now the two terms really are the same thing, and the same thing added to itself is twice itself: 2cos²x. The lesson is the order — reduce, then identify, never the other way round.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 3,
      prompt: {
        en: "Simplify: &nbsp;<span class=\"sfrac\"><span class=\"sf-n\">tan(−x) · cos(720° − x)</span><span class=\"sf-d\">tan(180° + x) · cos(x − 180°)</span></span>",
      },
      hint: {
        en: "Four factors, four lines. One of them is over 720°, so take the turns off one at a time before you reduce it. And cos(x − 180°) is not a typo — cosine does not care which way round a subtraction goes.",
      },
      memo: [
        { type: "step", text: { en: "tan(−x) = −tan x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos(720° − x) &nbsp;[−360° −360°]&nbsp; = cos(−x) = cos x" }, ticks: ["ca"] },
        { type: "step", text: { en: "tan(180° + x) = tan x" }, ticks: ["ca"] },
        { type: "step", text: { en: "cos(x − 180°) = cos(180° − x) = −cos x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "(−tan x · cos x)/(tan x · −cos x) = 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: cosine is the only ratio that reads the same backwards — cos(x − 180°) = cos(180° − x), and cos(−x) = cos x. Sine and tan both flip sign when you turn the bracket round.",
        } },
      ],
      esplain: {
        en: "Every factor here reduces to plus or minus tan x, or plus or minus cos x, and once they have, the whole fraction is just arithmetic. tan(−x) is a fourth-quadrant form, where tan is negative, so it is −tan x. cos(720° − x) is two full turns too big — take them off one at a time and you land on cos(−x), which is cos x, because cosine survives in C. tan(180° + x) sits in T, tan's own quadrant, so it stays positive. And cos(x − 180°) is the sneaky one: cosine does not mind which order you subtract in, so it is the same as cos(180° − x), which is a second-quadrant angle and comes out as −cos x. Now count the minus signs: one on top, one underneath. They cancel, tan x cancels tan x, cos x cancels cos x, and the whole thing collapses to 1. When a reduction question has the same factors above and below, the answer is usually a number rather than a ratio — that is your check.",
      },
    },
  ],
};

export const gtrigReductionSiblingQuestions = [q1, q2, q3, q4, q5];
