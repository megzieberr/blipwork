/* ============================================================
   EXAM FOCUS — General Trig · SIBLING CARDS for the skill "co-functions"
   (SESSION F1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/F1-gtrig-part1.md.)
   ------------------------------------------------------------
   Five new cards, taking this tile from one to six.

   WHY THIS FILE EXISTS. "Co-functions" held exactly ONE card —
   trig.rr.t2q1(a), "if sin 34° = t, write cos 56° in terms of t". A
   learner who tapped "Another one!" ran out immediately, and never met
   the one thing this whole topic exists to teach: THE TRAP,
   cos(90° + θ) = −sin θ (METHODS-trig.md D3, the most-named trap in all
   68 pages of her notes).

   SOURCE OF THE MATHS: METHODS-trig.md Part D (p17–p22) — the
   two-labelling triangle (D1), co-functions living INSIDE the All
   Strippers Take Cash wheel (D2: 90° − θ is an A angle, 90° + θ is an S
   angle), the trap (D3), and the negative co-functions sin(θ − 90°) and
   cos(θ − 90°) with her "but why?" let-K derivation (D4).
   ARCHETYPES from the paper bank's trig inventory
   (survey/SURVEY-Topic-Banks.md §2, "ratio-in-terms-of") and
   SURVEY-Nov-P2.md archetype 3 beat (i) — "given ratio X, express Y in
   terms of X, no calculator" — which opens the trig block every year.
   Her own Test 3 Q1.3 ("if tan 50° = t, express cos 230° …") is the
   same mould. Every angle and letter here is fresh; nothing is verbatim.

   WHAT THE FIVE COVER, and why these five:
     q1  THE TRAP and its friendly neighbour, side by side, in variables
         — cos(90° + θ) = −sin θ against sin(90° + θ) = cos θ
     q2  the co-function inside an expression that CANCELS, where the
         whole point is that sin(90° − x) is just cos x wearing a hat
     q3  the "in terms of p" chain a paper actually opens with: one
         co-function into A, one into S, and one 180° reduction, so the
         learner has to tell the two families apart inside one question
     q4  the NEGATIVE co-functions, sin(x − 90°) and cos(x − 90°), built
         her way with let K rather than handed over as a rule
     q5  the two-step item: reduce the angle FIRST, then notice that the
         acute angle it leaves you and 40° add to 90°

   NO DIAGRAM ANYWHERE ON THIS TILE. A co-function question never
   carries a figure on a real paper — the triangle is a thing you SEE in
   your head (or draw twice, once from each acute angle, her p17), never
   a thing the paper prints. Nothing here needs a sketch to be
   answerable, so nothing here gets one.

   LEVELS: q1 and q2 level 1–2, q3 level 1–2, q4 and q5 level 2–3.
   Nothing here is level 4 — the ★ questions live on the gtrig level-4
   tile (session F2), and this is a tile a frightened learner drills
   basics on (her ruling 5, EXAM-BUILD-DAY.md).
   ============================================================ */

const PAPER = "siblings";
const CH = "gtrig";
/* gt4 "Co-functions" — the round that teaches convert-between-sin-and-cos
   and the cos(90° + x) trap (js/config.js CHAPTERS → gtrig). */
const LOST = { chapter: CH, quest: "gt4" };

/* ---------------------------------------------------------------
   q1 — THE TRAP AND ITS NEIGHBOUR (her D2/D3).
   Both parts are the SAME angle, 90° + θ, asked about two different
   ratios, because that is what makes the sign rule visible: the split
   does not decide the sign, the quadrant does.
     (a) cos(90° + θ) = −sin θ      ← the trap
     (b) sin(90° + θ) =  cos θ      ← no minus, same angle
   --------------------------------------------------------------- */
const q1 = {
  id: "gtrig.sib.cf.q1",
  chapter: CH,
  topic: "co-functions",
  archetype: "cofunction-write-down-both-ratios-of-90-plus-theta",
  paper: PAPER,
  lostQuest: LOST,
  marks: 2,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Write down &nbsp;cos(90° + θ)&nbsp; in terms of &nbsp;sin θ.",
      },
      hint: {
        en: "Do not touch the ratio yet — ask the quadrant question first. Where on the wheel does 90° + θ land, and which ratio survives there? Only then use the fact that a 90° split is the one split that converts between sin and cos.",
      },
      memo: [
        { type: "step", text: { en: "90° + θ has crossed the 90° line into the <b>second quadrant</b> — S on All Strippers Take Cash, where <b>only sine</b> is positive." } },
        { type: "step", text: { en: "A 90° ± θ angle is a co-function, so the ratio converts: cos becomes sin. And cosine is not sine, so it collects the minus." } },
        { type: "answer", text: { en: "cos(90° + θ) = −sin θ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: this is THE trap. cos(90° − θ) = +sin θ, but cos(90° + θ) = −sin θ. One plus sign is the whole difference between them — which is why you add the angles and look at the wheel before you write anything down.",
        } },
      ],
      esplain: {
        en: "Two angles, one wheel. All Strippers Take Cash tells you which ratio survives in each quadrant, and 90° + θ has just crossed the 90° line into S — the quadrant where only sine stays positive. Cosine is not sine, so it has to change sign, and that is where the minus comes from. The rest of the answer is the co-function part: a 90° split is the only split that converts between sin and cos, so cos turns into sin. Put the two halves together and you get −sin θ. Its friendly neighbour, 90° − θ, sits in A where everything is positive, so cos(90° − θ) is simply +sin θ. That is why your first move on a question shaped like this is always the same: add the angles, then look at the wheel.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: {
        en: "Write down &nbsp;sin(90° + θ)&nbsp; in terms of &nbsp;cos θ.",
      },
      hint: {
        en: "Same angle as (a), so the same quadrant. The only new question is whether the ratio you started with is the one that survives there.",
      },
      memo: [
        { type: "step", text: { en: "90° + θ is still an S angle, and in S <b>sine</b> is the ratio that stays positive — so nothing turns negative here." } },
        { type: "step", text: { en: "The 90° split still converts, so sin becomes cos." } },
        { type: "answer", text: { en: "sin(90° + θ) = cos θ" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Same angle, different ratio — and this time nothing goes wrong. 90° + θ is still in S, and sine is exactly the ratio S keeps positive, so no minus comes along for the ride. The 90° split still does its one job and converts sine into cosine, which leaves you with a clean cos θ. Putting (a) and (b) next to each other is the fastest way to hold the trap in your head: with the SAME angle, sin(90° + θ) = cos θ but cos(90° + θ) = −sin θ. The sign is not decided by the split — it is decided by the quadrant, and by whether the ratio you started with is the one that survives there. Ask those two questions in that order and the sign looks after itself.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — THE CO-FUNCTION INSIDE AN EXPRESSION (her p18 eg.1 shape).
     (a) sin(90° − x)/cos x      = cos x/cos x = 1
     (b) sin(90° − x) · tan x    = cos x · sin x/cos x = sin x
   (b) is the pairing she leans on: swap tan for sin over cos and
   suddenly there is something to cancel with.
   --------------------------------------------------------------- */
const q2 = {
  id: "gtrig.sib.cf.q2",
  chapter: CH,
  topic: "co-functions",
  archetype: "cofunction-simplify-an-expression-to-a-single-ratio",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Simplify: &nbsp;sin(90° − x)/cos x",
      },
      hint: {
        en: "Deal with the bracket first and leave the bottom of the fraction alone. 90° − x lives in A, where everything is positive, so no minus is coming — the only thing that happens is the conversion.",
      },
      memo: [
        { type: "step", text: { en: "90° − x is an <b>A</b> angle (everything positive), and the 90° split converts sin to cos:" } },
        { type: "step", text: { en: "sin(90° − x) = cos x" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "cos x/cos x = 1" }, ticks: ["a"] },
      ],
      esplain: {
        en: "90° − x sits in A, the quadrant where all three ratios are positive, so nothing here turns negative — the only thing that happens is the conversion. Sine becomes cosine, the expression turns into cos x over cos x, and that is 1. Picture the reason instead of memorising it. In a right-angled triangle the two acute angles add to 90°, so they share the same three sides and only swap the names opposite and adjacent: the side across from one is the side next to the other. That is all a co-function is — a change of name, not a change of value. Once you see that, sin(90° − x) = cos x stops being a rule to remember and starts being obvious.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Simplify: &nbsp;sin(90° − x) · tan x",
      },
      hint: {
        en: "Two moves. Convert the co-function, then write tan as sin over cos — that swap is what creates something to cancel with.",
      },
      memo: [
        { type: "step", text: { en: "sin(90° − x) = cos x &nbsp;(an A angle, so no minus)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "tan x = sin x/cos x &nbsp;— one of the identities she wants known by heart" }, ticks: ["ca"] },
        { type: "step", text: { en: "So the expression is &nbsp;cos x · sin x/cos x &nbsp;— and the cos x cancels." } },
        { type: "answer", text: { en: "= sin x" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two moves, and doing both matters more than the order. First the co-function: sin(90° − x) is an A angle, everything positive, and the 90° split converts sine to cosine, so it is simply cos x. Second the identity: tan x is not a new animal, it is sin x over cos x. Now the expression reads cos x times sin x over cos x, the cos x on top cancels the cos x underneath, and sin x is left. Notice what did the real work — turning tan into sin over cos is what created something to cancel with. Whenever an expression mixes tan with sin and cos, that swap is almost always the move worth trying first.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — THE "IN TERMS OF p" CHAIN (beat (i) of SURVEY-Nov-P2.md
   archetype 3; her own Test 3 Q1.3 is the same mould).
   cos 18° = p, and three angles that all reduce back to 18°:
     (a) sin 72°  = sin(90° − 18°) =  cos 18° =  p    (A: no minus)
     (b) sin 108° = sin(90° + 18°) =  cos 18° =  p    (S: sine survives)
     (c) cos 162° = cos(180° − 18°) = −cos 18° = −p   (a REDUCTION, not
         a co-function — the ratio does not change, only the sign)
   No triangle and no Pythagoras: nothing here asks for a side that is
   not already given. That is the whole difference between this tile
   and Super Special Sums.
   --------------------------------------------------------------- */
const q3 = {
  id: "gtrig.sib.cf.q3",
  chapter: CH,
  topic: "co-functions",
  archetype: "given-one-ratio-write-three-related-angles-in-terms-of-it",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;cos 18° = p.<br><br>Write &nbsp;sin 72°&nbsp; in terms of p.",
      },
      hint: {
        en: "Add the two angles. If they make 90°, the question is handing you a co-function — and a co-function does one job only: it converts between sin and cos. 90° − θ lives in A, so nothing here needs a minus.",
      },
      memo: [
        { type: "step", text: { en: "18° and 72° add up to 90°, so this is a co-function: &nbsp;sin 72° = sin(90° − 18°)" } },
        { type: "answer", text: { en: "= cos 18° = p" }, ticks: ["a"] },
      ],
      esplain: {
        en: "18° and 72° add up to 90°, and that is the whole clue. Two angles that add to 90° are the two acute angles of the same right-angled triangle, so they share the same three sides — the side opposite one is the side next to the other. That makes the sine of one equal to the cosine of the other, every time. So sin 72° is exactly cos 18°, which you were handed as p. Notice there is no triangle to draw and no Pythagoras to do here: the question never asks for a side you do not already have. When you see in terms of p with two angles adding to 90°, the answer is usually just p or −p, and your only job is deciding which.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Write &nbsp;sin 108°&nbsp; in terms of p.",
      },
      hint: {
        en: "Split 108° as 90° + 18° and ask the quadrant question first: which quadrant is that, and is sine the ratio that survives there?",
      },
      memo: [
        { type: "step", text: { en: "108° = 90° + 18°, which lands in <b>S</b> — where sine is positive, so no minus appears:" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "sin 108° = sin(90° + 18°) = cos 18° = p" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: sin(90° + θ) = +cos θ, but cos(90° + θ) = −sin θ. Same angle, same quadrant, different sign — because in S only sine survives.",
        } },
      ],
      esplain: {
        en: "108° is 90° + 18°, so it is the same 18° again, only pushed one quadrant further round. On the wheel that lands in S, and in S sine is the one ratio that stays positive — so no minus appears. The 90° split still converts, so sine turns into cosine and you get cos 18°, which is p. Here is a check you can do in your head: sin 72° and sin 108° both came out as p, and that is not a coincidence. 72° and 108° are mirror images about 90°, so the sine graph is at exactly the same height at both. If your two answers had come out different, one of them would be wrong.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "Write &nbsp;cos 162°&nbsp; in terms of p.",
      },
      hint: {
        en: "This one is a 180° split, not a 90° one. Before you worry about the sign, ask whether the ratio changes at all.",
      },
      memo: [
        { type: "step", text: { en: "162° = 180° − 18°, which lands in <b>S</b>. A 180° split is a <b>reduction</b>, not a co-function — the ratio stays cosine:" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "cos 162° = cos(180° − 18°) = −cos 18° = −p" }, ticks: ["a"] },
      ],
      esplain: {
        en: "162° is 180° − 18°, so this one is a reduction, not a co-function — and the two families behave differently on purpose. A 180° split never changes the ratio; all it does is decide a sign. So cosine stays cosine. 180° − 18° lands in S, where only sine is positive, and cosine is not sine, so it takes the minus: cos 162° = −cos 18° = −p. Say the three steps out loud every time and you will not mix the families up — which quadrant, which reduction formula, then plus or minus. Only the 90° splits convert between sin and cos; the 180° and 360° splits leave the ratio exactly as it was.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — THE NEGATIVE CO-FUNCTIONS (her p21–p22, p24 ⑤, "but why?").
     (a) sin(x − 90°) = sin[−(90° − x)]; let K = 90° − x, and −K is a
         IV-quadrant angle where only cos survives → −sin K → −cos x
     (b) cos(x − 90°) = sin x by the same route, so the quotient is
         −cos x/sin x = −1/tan x
   The let-K derivation IS the memo here, because it is what she writes
   on p24 when the kids ask why.
   --------------------------------------------------------------- */
const q4 = {
  id: "gtrig.sib.cf.q4",
  chapter: CH,
  topic: "co-functions",
  archetype: "negative-cofunction-derive-then-simplify-the-quotient",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Write &nbsp;sin(x − 90°)&nbsp; in terms of &nbsp;cos x.",
      },
      hint: {
        en: "Pull the minus out to the front first — x − 90° is the same angle as −(90° − x). Then let K stand for 90° − x and reduce sin(−K) the way you reduce any negative angle.",
      },
      memo: [
        { type: "step", text: { en: "Take the minus out to the front: &nbsp;sin(x − 90°) = sin[−(90° − x)]" } },
        { type: "step", text: { en: "Let K = 90° − x. Then −K is a <b>fourth-quadrant</b> (C) angle, where only cosine is positive — so sine takes the minus: &nbsp;sin(−K) = −sin K" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Put K back: &nbsp;= −sin(90° − x)" } },
        { type: "answer", text: { en: "and sin(90° − x) = cos x, &nbsp;∴&nbsp; sin(x − 90°) = −cos x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: sin(x − 90°) and sin(90° − x) are NOT the same thing. Swapping the two angles round flips the sign of the whole answer — one is −cos x, the other is +cos x.",
        } },
      ],
      esplain: {
        en: "x − 90° looks like a new rule, but it is the old one wearing a coat. Take the minus out to the front: x − 90° is the same angle as −(90° − x). Now let K stand for 90° − x, so you are looking at sin(−K). A negative angle turns you clockwise into the fourth quadrant, C, where only cosine survives — so sine flips sign and sin(−K) = −sin K. Put K back and you have −sin(90° − x), and sin(90° − x) is the plain co-function you already know: cos x. So sin(x − 90°) = −cos x. Write that derivation out once yourself. After that you can just remember the result, but you will always be able to rebuild it if the memory goes.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence simplify: &nbsp;sin(x − 90°)/cos(x − 90°)",
      },
      hint: {
        en: "Run exactly the same route as (a) on the bottom of the fraction, asking each time which ratio survives in the fourth quadrant. Then divide, and see whether the answer tidies into a tan.",
      },
      memo: [
        { type: "step", text: { en: "Same route on the denominator, and this time it is cosine that survives in <b>C</b>, so no minus appears: &nbsp;cos(x − 90°) = cos[−(90° − x)] = cos(90° − x)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos(x − 90°) = sin x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "sin(x − 90°)/cos(x − 90°) = −cos x/sin x &nbsp;&nbsp;<b>OR</b>&nbsp;&nbsp; −1/tan x" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Run the same route on the cosine and the answer comes out with the opposite sign, for one reason: in the fourth quadrant cosine is the ratio that survives. So cos(x − 90°) = cos(90° − x) = sin x, with no minus anywhere. That leaves −cos x on the top and sin x on the bottom. Divide and you have −cos x over sin x, which is the upside-down version of tan, so you may also write it as −1 over tan x. Either form is a correct final answer and a marker takes both. The one place marks go missing is putting the minus on the wrong line — check it by asking which of the two ratios survives in the quadrant you landed in.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — TWO STEPS: A REDUCTION, THEN A CO-FUNCTION (her p41 eg.8
   flavour — a numeric expression that only tidies once an angle has
   been reduced AND then converted).
     (a) cos 130° = −cos 50° = −sin 40°,  so cos 130° + sin 40° = 0
     (b) sin 220° = −sin 40°,  cos 320° = cos 40°,  so
         (cos 130° · sin 220°)/(sin 40° · cos 320°)
           = sin²40°/(sin 40° · cos 40°) = tan 40°
   --------------------------------------------------------------- */
const q5 = {
  id: "gtrig.sib.cf.q5",
  chapter: CH,
  topic: "co-functions",
  archetype: "numeric-simplify-reduction-then-cofunction-to-a-single-ratio",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Simplify: &nbsp;cos 130° + sin 40°",
      },
      hint: {
        en: "Reduce first, then go looking for a co-function. Once cos 130° is written as a cosine of an acute angle, check whether that acute angle and 40° add to 90°.",
      },
      memo: [
        { type: "step", text: { en: "Write the split above the angle: &nbsp;130° = 180° − 50°, which lands in <b>S</b>, so cosine turns negative:" } },
        { type: "step", text: { en: "cos 130° = −cos 50°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "50° and 40° add to 90°, so a co-function converts it: &nbsp;cos 50° = sin 40°, &nbsp;∴&nbsp; cos 130° = −sin 40°" } },
        { type: "answer", text: { en: "cos 130° + sin 40° = −sin 40° + sin 40° = 0" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two different machines, one answer. cos 130° is a reduction first: 130° is 180° − 50°, which lands in S, and cosine is not sine, so it turns negative and becomes −cos 50°. Now look at 50° and 40° — they add to 90°, so a co-function converts one into the other and cos 50° = sin 40°. Put the two together and cos 130° is exactly −sin 40°, so adding sin 40° gives zero. That is the shape a paper loves: an angle that looks nothing like the other one, until you reduce it and then convert it. Reduce first, co-function second, and always write the split above the angle before you write the next line.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Simplify: &nbsp;(cos 130° · sin 220°)/(sin 40° · cos 320°)",
      },
      hint: {
        en: "Four separate reductions, four separate lines, and the split written above each angle before you touch it. Do not cancel anything until every factor is a ratio of an acute angle.",
      },
      memo: [
        { type: "step", text: { en: "From (a): &nbsp;cos 130° = −sin 40°" } },
        { type: "step", text: { en: "220° = 180° + 40°, which lands in <b>T</b> (only tan positive): &nbsp;sin 220° = −sin 40°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "320° = 360° − 40°, which lands in <b>C</b> (cosine positive): &nbsp;cos 320° = cos 40°" }, ticks: ["ca"] },
        { type: "step", text: { en: "The top is (−sin 40°) × (−sin 40°) = sin²40°; the bottom is sin 40° × cos 40°." }, ticks: ["ca"] },
        { type: "answer", text: { en: "sin²40°/(sin 40° · cos 40°) = sin 40°/cos 40° = tan 40°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: two minus signs on the top multiply to a PLUS. A learner who keeps one of them ends up with −tan 40°, which is exactly the right size with the wrong sign — and the sign is a whole mark.",
        } },
      ],
      esplain: {
        en: "Do not try to see the whole thing at once — take one factor at a time and write the split above each angle before anything else. 130° is 180° − 50°, so cos 130° = −cos 50°, and 50° and 40° add to 90°, so that is −sin 40°. 220° is 180° + 40°, which lands in T where only tan is positive, so sin 220° = −sin 40°. 320° is 360° − 40°, which lands in C where cosine is positive, so cos 320° = cos 40°. Now the top is two minuses multiplied together, which makes a plus, giving sin²40° over sin 40° times cos 40°. One sin 40° cancels and you are left with sin over cos — which is tan 40°.",
      },
    },
  ],
};

export const gtrigCoFunctionsSiblingQuestions = [q1, q2, q3, q4, q5];
