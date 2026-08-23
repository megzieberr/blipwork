/* ============================================================
   EXAM FOCUS — General Trig · SIBLING CARDS for the skill
   "general-solution"
   (SESSION F2 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/F2-gtrig-part2.md.)
   ------------------------------------------------------------
   Five new cards, taking this tile from one to six.

   WHY THIS FILE EXISTS. "General solution" held exactly ONE card —
   trig.gs.t2q2, the trinomial with a dead branch off her September T2
   practice paper. That is her TYPE ⑤ and nothing else, so a learner
   could drill the tile all afternoon and never meet the other five
   types that make up most of the marks on a real paper.

   ONE CARD PER TYPE, and the TYPE IS NAMED IN THE MEMO'S FIRST LINE.
   METHODS-trig.md K1 (p44) is the page the whole skill hangs off, and
   her six type names are law here — they are exactly how she writes
   them, number and name together:
     ① function alone     ② same angles      ③ common factor
     ④ grouping           ⑤ trinomial        ⑥ co-functions
   This file adds ①, ② (twice, plain and with a bracket), ⑤ with a
   masked identity, ⑥, and ① again with a compound angle inside — the
   existing card already carries plain ⑤.

   THREE OF HER RULINGS ARE ENFORCED IN EVERY MEMO BELOW:
     · tan gets ONE quadrant line (K3, p47 — she writes the second one
       out in full, strikes it through, and writes "waste of time!"
       beside it). Because the tan family already repeats every 180°,
       a second line adds nothing. The 180° period is STATED, not
       derived.
     · the reference angle comes from the POSITIVE value (K1 ①, p44 —
       "don't type − into calculator"); the sign is handled by choosing
       the quadrants, never by the calculator.
     · one k ∈ ℤ closes the answer, at the bottom of the last branch
       (Part 0.4). Without it you have written down two angles, not a
       general solution.
   Two more habits she never skips: the whole bracket is treated as the
   unknown and the quadrant line is written for THE BRACKET before
   anything is moved across (K2, "the compound-angle habit"); and when
   the unknown is 2x, EVERY term of the line is divided by 2, the
   divisor written under each piece (K2, "the divide-through habit").

   ARCHETYPES from the paper bank (survey/SURVEY-Topic-Banks.md §2 —
   2025-Q2.4, 2025-Q5.5, 2026-Q2.2, 2026-Q9.4; SURVEY-Nov-P2.md Q4(e))
   and her own Test 3 Q3. Fresh equations throughout.

   NO DIAGRAM ANYWHERE ON THIS TILE. The little quadrant cross with its
   ticks is the object the learner draws on paper — printing it would do
   the one decision the whole routine turns on.

   LEVELS: q1 and q2 level 1-2, q3/q4/q5 level 3. Nothing here is level
   4 (her ruling 5, EXAM-BUILD-DAY.md); the reverse-engineered "given
   the general solution, find the constant" question lives on the gtrig
   level-4 tile.

   lostQuest: gt11 "General solution: the six types" for the four cards
   whose first job is naming the type; gt12 "General solution: last
   steps" for the compound-angle one, where the quadrant cross and the
   reference angle are the whole question.
   ============================================================ */

const PAPER = "siblings";
const CH = "gtrig";
const LOST_TYPES = { chapter: CH, quest: "gt11" };   /* the six types    */
const LOST_STEPS = { chapter: CH, quest: "gt12" };   /* cross + ref ∠    */

/* The closer that belongs on every general solution she has ever
   written, worded two ways so a learner working the whole tile does not
   read the same sentence five times. */
const TRAP_K = {
  en: "REMEMBER: k&nbsp;∈&nbsp;ℤ belongs on the end of <i>every</i> general solution, once, at the bottom of the last branch. Without it you have written down two angles, not a general solution — and it is a mark.",
};

/* ---------------------------------------------------------------
   q1 — TYPE ① FUNCTION ALONE, then the interval follow-on.
   The smallest complete general solution there is: isolate, reference
   angle, cross, one line per ticked quadrant.
   --------------------------------------------------------------- */
const q1 = {
  id: "gtrig.sib.gs.q1",
  chapter: CH,
  topic: "general-solution",
  archetype: "general-solution-type-1-function-alone-then-interval",
  paper: PAPER,
  lostQuest: LOST_TYPES,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "Determine the general solution of &nbsp;2 sin x + 1 = 0",
      },
      hint: {
        en: "One function, one angle, nothing squared — get the ratio on its own first. Then take the reference angle from the SIZE of the number and let the cross decide the signs, not the calculator.",
      },
      memo: [
        { type: "step", text: { en: "<b>Type ①: function alone</b> — get the ratio on its own first." } },
        { type: "step", text: { en: "2 sin x = −1 &nbsp;⟹&nbsp; sin x = −1/2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 30° &nbsp;(from the SIZE of the number — don't type the minus into your calculator)" }, ticks: ["ca"] },
        { type: "step", text: { en: "sin is negative, so tick the cross at the <b>bottom</b>: III and IV." } },
        { type: "answer", text: { en: "III: &nbsp;x = 180° + 30° + k · 360° = 210° + k · 360°" }, ticks: ["a"] },
        { type: "answer", text: { en: "IV: &nbsp;x = 360° − 30° + k · 360° = 330° + k · 360°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["a"] },
        { type: "trap", text: TRAP_K },
      ],
      esplain: {
        en: "Name the type before you do anything and the question stops feeling new. One function, one angle, nothing squared — that is type ①, function alone, and the first move is always to get the ratio by itself: sin x = −a half. Now the reference angle. Take it from the size of the number, never from the minus, because a calculator hands back a negative angle and that is not what you want. sin 30° is a half, so ref.&nbsp;∠&nbsp;= 30°. The minus is dealt with somewhere else entirely: on the cross. Sine is negative in the third and fourth quadrants, so tick the bottom two and write one line for each. Third quadrant is 180° plus the reference angle; fourth is 360° minus it. The k · 360° on the end is what turns two angles into every angle, because sine repeats itself every full turn forever, in both directions. One k&nbsp;∈&nbsp;ℤ at the bottom closes the whole thing off.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write down the values of &nbsp;x&nbsp;∈&nbsp;[−360°&nbsp;;&nbsp;0°]&nbsp; that satisfy the equation in (a)",
      },
      hint: {
        en: "Nothing new gets solved here. The general solution is the machine and k is the handle — take one branch at a time and feed it whole numbers. The interval is entirely below zero, so walk k downwards.",
      },
      memo: [
        { type: "step", text: { en: "Feed whole numbers into each branch and keep whatever lands inside [−360°&nbsp;;&nbsp;0°]:" } },
        { type: "step", text: { en: "x = 210° + k · 360°: &nbsp;k = 0 → 210° (out), &nbsp;k = −1 → −150°" } },
        { type: "step", text: { en: "x = 330° + k · 360°: &nbsp;k = 0 → 330° (out), &nbsp;k = −1 → −30°" } },
        { type: "answer", text: { en: "x = −150°" }, ticks: ["a"] },
        { type: "answer", text: { en: "and &nbsp;x = −30°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: k = 0 gives 210° and 330°, and both are OUTSIDE the interval. Do not stop at k = 0 just because it is the easy one to substitute — step k in the direction the interval lies until you overshoot.",
        } },
      ],
      esplain: {
        en: "This is what the general solution is FOR, and it is why it always comes first and the interval is read off it afterwards. You are not hunting for angles any more — you already own a formula that makes every single one of them, so the only decision left is which whole numbers to feed it. One branch at a time. Start at k = 0 and step in the direction the interval lies; here everything is negative, so step downwards. Each substitution either lands inside [−360°&nbsp;;&nbsp;0°], in which case you write it down, or it does not, and the moment you overshoot the far end you are finished with that branch. Two branches, one hit each. Then look at what came out: −150° and −30° are 210° and 330° reached by walking clockwise instead of anticlockwise. Same two arms of the bow tie, same two spots on the circle.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — TYPE ② SAME ANGLES, twice: bare, then with a bracket.
   Both parts land on a tan, so both get ONE quadrant line — her K3
   ruling, "waste of time!".
   --------------------------------------------------------------- */
const q2 = {
  id: "gtrig.sib.gs.q2",
  chapter: CH,
  topic: "general-solution",
  archetype: "general-solution-type-2-same-angles-divide-by-cos",
  paper: PAPER,
  lostQuest: LOST_TYPES,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "Determine the general solution of &nbsp;sin x − cos x = 0",
      },
      hint: {
        en: "Two different functions, but the SAME angle in both — that is the clue. Divide the whole line by cos x and watch a tan appear. And a tan answer only ever needs one quadrant line.",
      },
      memo: [
        { type: "step", text: { en: "<b>Type ②: same angles</b> — both angles are x, so divide the whole line by cos x." } },
        { type: "step", text: { en: "sin x/cos x = cos x/cos x &nbsp;⟹&nbsp; tan x = 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 45°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 45° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: a tan answer gets ONE quadrant line, not two. The tan family already repeats every 180°, so the second line would say exactly the same thing twice — waste of time. That is also why the closer is k · 180° and not k · 360°.",
        } },
      ],
      esplain: {
        en: "The give-away for type ② is that the two functions are different but the angle is the same in both. When that happens you divide the entire line by cos x — every term of it, both sides — and sin x over cos x turns into tan x while cos x over cos x turns into 1. So the whole equation collapses to tan x = 1, and one function is all that is left. ref.&nbsp;∠&nbsp;= 45°, straight off the square triangle. Now the part worth remembering: a tan answer gets ONE quadrant line. Tan is positive in the first and third quadrants, but those two are exactly 180° apart, so writing both branches would produce the same list of angles twice over. She writes the second one out, strikes it through and puts \"waste of time!\" next to it. So the closer here is k · 180°, not k · 360° — the tan family repeats twice as often as the other two.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 2,
      prompt: {
        en: "Determine the general solution of &nbsp;4 cos(x − 25°) = 3 sin(x − 25°), &nbsp;correct to two decimal places",
      },
      hint: {
        en: "Same type as (a) — the angle in both brackets is identical, so divide the line by cos(x − 25°). Treat the whole bracket as the unknown right to the end, and only then move the 25° across.",
      },
      memo: [
        { type: "step", text: { en: "<b>Type ②: same angles</b> — both brackets are (x − 25°), so divide the whole line by cos(x − 25°)." } },
        { type: "step", text: { en: "4 = 3 tan(x − 25°) &nbsp;⟹&nbsp; tan(x − 25°) = 4/3" }, ticks: ["s/f"] },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 53,13°" }, ticks: ["ca"] },
        { type: "step", text: { en: "One line only, because it is a tan: &nbsp;x − 25° = 53,13° + k · 180°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 78,13° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: solve for the BRACKET first and move the 25° across afterwards. A learner who adds 25° to the reference angle before writing the quadrant line gets a right-looking wrong answer, and the 25° must be added to the angle only — never to the k · 180°.",
        } },
      ],
      esplain: {
        en: "Exactly the same type as (a), just wearing a bracket. The angle inside both functions is (x − 25°) — identical on both sides — so dividing the line by cos(x − 25°) is legal and turns the sine into a tan. That leaves 4 = 3 tan(x − 25°), so tan(x − 25°) is four thirds, and the reference angle is 53,13°. Now the habit that keeps compound angles honest: treat the whole bracket as the unknown and write the quadrant line for THE BRACKET, not for x. So x − 25° = 53,13° + k · 180°. Only when that line is written do you move the 25° across, and it lands on the angle alone — 53,13° + 25° is 78,13° — while the k · 180° is untouched. Because it is a tan, one line is the whole answer, and k&nbsp;∈&nbsp;ℤ closes it.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — TYPE ⑤ TRINOMIAL, the harder half: the middle term differs, so
   a MASKED IDENTITY has to fix the equation before the K-method can
   start. One branch turns out to be asking sine for a value it does
   not own — "no solution", her words, never "undefined".
   --------------------------------------------------------------- */
const q3 = {
  id: "gtrig.sib.gs.q3",
  chapter: CH,
  topic: "general-solution",
  archetype: "general-solution-type-5-trinomial-masked-identity-one-branch-dead",
  paper: PAPER,
  lostQuest: LOST_TYPES,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 3,
      prompt: {
        en: "Determine the general solution of &nbsp;2 cos²x + 5 sin x − 4 = 0",
      },
      hint: {
        en: "Three terms, one function squared and the other one not — but they are not the SAME function, and a trinomial needs them to be. A masked identity fixes that in one line, and then it is an ordinary quadratic with a letter you already know.",
      },
      memo: [
        { type: "step", text: { en: "<b>Type ⑤: trinomial</b> — three terms, one function squared. The middle term differs, so rewrite the squared function with a masked identity first." } },
        { type: "step", text: { en: "cos²x = 1 − sin²x: &nbsp;2(1 − sin²x) + 5 sin x − 4 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "2 − 2sin²x + 5 sin x − 4 = 0 &nbsp;⟹&nbsp; 2sin²x − 5 sin x + 2 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "Let K = sin x: &nbsp;2K² − 5K + 2 = 0 &nbsp;⟹&nbsp; (2K − 1)(K − 2) = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "K = 1/2 → sin x = 1/2 &nbsp;&nbsp;or&nbsp;&nbsp; K = 2 → sin x = 2, which has <b>no solution</b>" }, ticks: ["ca"] },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 30°, and sin is positive, so tick the cross at the <b>top</b>: I and II." } },
        { type: "answer", text: { en: "x = 30° + k · 360°" }, ticks: ["a"] },
        { type: "answer", text: { en: "or &nbsp;x = 180° − 30° + k · 360° = 150° + k · 360°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: sin x = 2 has <b>no solution</b>. Those are the two words — not \"undefined\", not \"no real solution\". Sine is a side over the hypotenuse, the hypotenuse is the longest side, so sin x lives between −1 and 1 and nowhere else. Writing that line is a mark on its own.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: put the function BACK. An answer left sitting on K answers a question nobody asked, and every year somebody solves the quadratic perfectly and then stops.",
        } },
      ],
      esplain: {
        en: "Three terms with one function squared says trinomial, but look again — the squared one is a cosine and the plain one is a sine, and a trinomial needs them to match. That is what a masked identity is for. cos²x is 1 − sin²x, so swap it in and every term becomes a sine. Tidy up and you have 2sin²x − 5 sin x + 2 = 0, which is an ordinary quadratic wearing trig clothes. Let K = sin x, factorise 2K² − 5K + 2 the way you have a hundred times, and put sin x back at the end — that last step is not optional. Two branches. sin x = 2 is asking sine for a value it does not own, because sine never leaves the strip between −1 and 1, so you write no solution and move on: that sentence is a mark. sin x = a half gives ref.&nbsp;∠&nbsp;= 30°, sine is positive so tick I and II, and two lines finish it.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — TYPE ⑥ CO-FUNCTIONS. sin on one side, cos on the other,
   different angles, NO reference angle. Make both sides the same
   function with the 90° − trick, then match the two brackets.
   --------------------------------------------------------------- */
const q4 = {
  id: "gtrig.sib.gs.q4",
  chapter: CH,
  topic: "general-solution",
  archetype: "general-solution-type-6-cofunction-two-cases-then-interval",
  paper: PAPER,
  lostQuest: LOST_TYPES,
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 3,
      prompt: {
        en: "Determine the general solution of &nbsp;sin(x + 30°) = cos 2x",
      },
      hint: {
        en: "A sine on one side and a cosine on the other, with different angles inside — you cannot divide your way out of this one. Turn the cos into a sin with the 90° − trick so both sides are the same function, then match the brackets. There is no reference angle here at all.",
      },
      memo: [
        { type: "step", text: { en: "<b>Type ⑥: co-functions</b> — different angles, and <b>no reference angle</b>. Make both sides the same function first." } },
        { type: "step", text: { en: "cos 2x = sin(90° − 2x), so &nbsp;sin(x + 30°) = sin(90° − 2x)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "sin = sin uses <b>I and II</b>. Match the two brackets, one quadrant at a time." } },
        { type: "step", text: { en: "I: &nbsp;x + 30° = 90° − 2x + k · 360°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "3x = 60° + k · 360° &nbsp;⟹&nbsp; x = 20° + k · 120°" }, ticks: ["a"] },
        { type: "step", text: { en: "II: &nbsp;x + 30° = 180° − (90° − 2x) + k · 360°" }, ticks: ["ca"] },
        { type: "step", text: { en: "x + 30° = 90° + 2x + k · 360° &nbsp;⟹&nbsp; −x = 60° + k · 360°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = −60° + k · 360°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the whole right-hand bracket goes inside the 180° − ( … ) in the second quadrant line, brackets and all. 180° − (90° − 2x) is 90° + 2x, not 90° − 2x — dropping those brackets flips a sign and kills the branch.",
        } },
      ],
      esplain: {
        en: "This is the one type where dividing gets you nowhere, because the angles inside the two functions are different. So you change the FUNCTION instead. A 90° split is the only split that converts between sin and cos, so cos 2x can be rewritten as sin(90° − 2x), and suddenly both sides are sines. Now you are asking when two sines are equal, and that happens in two places on the circle: the angles are the same (quadrant I), or they are supplementary (quadrant II). Write one line for each, treating each whole bracket as a single thing, and keep the brackets when you subtract — 180° − (90° − 2x) is 90° + 2x, and dropping those brackets is the classic way to lose the second branch. Then divide through where you need to. There is no reference angle anywhere in this question, and there was never meant to be: you matched two brackets instead of measuring an angle.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence determine the values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; that satisfy the equation in (a)",
      },
      hint: {
        en: "Two families, two handles. The first repeats every 120°, so it will land inside the interval more than once — keep going until you overshoot.",
      },
      memo: [
        { type: "step", text: { en: "Feed whole numbers into each family and keep whatever lands inside [0°&nbsp;;&nbsp;360°]:" } },
        { type: "step", text: { en: "x = 20° + k · 120°: &nbsp;k = 0 → 20°, &nbsp;k = 1 → 140°, &nbsp;k = 2 → 260°, &nbsp;k = 3 → 380° (out)" } },
        { type: "step", text: { en: "x = −60° + k · 360°: &nbsp;k = 0 → −60° (out), &nbsp;k = 1 → 300°" } },
        { type: "answer", text: { en: "From the first family: &nbsp;x = 20°, &nbsp;140° &nbsp;or&nbsp; 260°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "From the second: &nbsp;x = 300°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the two families do NOT repeat at the same rate — one every 120°, the other every 360°. Three answers come from the first and only one from the second, so a learner who assumes \"one each\" writes down half the list.",
        } },
      ],
      esplain: {
        en: "Two branches, but they do not behave the same way, and that is the whole point of this part. The first family, x = 20° + k · 120°, repeats every 120°, so it fits into a 360° interval three times over: 20°, 140° and 260°, and the next one, 380°, has overshot. The second family, x = −60° + k · 360°, repeats only once per full turn, so inside [0°&nbsp;;&nbsp;360°] it lands exactly once, at 300°. Four values altogether. The reason the rates differ is the divide-through: the first quadrant line had a 3x in it, so dividing by 3 shrank the k · 360° to k · 120° as well, while the second line finished with a lone x and kept its full 360°. Whenever your two branches close with different multiples of k, expect different numbers of answers — and walk each handle separately until it overshoots.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — TYPE ① AGAIN, with a COMPOUND ANGLE inside. The two habits that
   decide the marks: write the quadrant line for the BRACKET, then
   divide EVERY term by the coefficient.
   --------------------------------------------------------------- */
const q5 = {
  id: "gtrig.sib.gs.q5",
  chapter: CH,
  topic: "general-solution",
  archetype: "general-solution-type-1-compound-angle-divide-through",
  paper: PAPER,
  lostQuest: LOST_STEPS,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 3,
      prompt: {
        en: "Determine the general solution of &nbsp;sin(2x − 30°) = −1/2",
      },
      hint: {
        en: "The ratio is already on its own, so this is still type ①. Treat the whole bracket (2x − 30°) as the unknown and write both quadrant lines for IT. The dividing by 2 comes last — and every term of the line gets divided, the k · 360° included.",
      },
      memo: [
        { type: "step", text: { en: "<b>Type ①: function alone</b> — the ratio is already on its own. Treat the whole bracket (2x − 30°) as the unknown." } },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 30° &nbsp;(from the size of the number), and sin is negative, so tick the cross at the <b>bottom</b>: III and IV." }, ticks: ["s/f"] },
        { type: "step", text: { en: "III: &nbsp;2x − 30° = 180° + 30° + k · 360° = 210° + k · 360°" }, ticks: ["ca"] },
        { type: "step", text: { en: "2x = 240° + k · 360°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "Divide every term by 2: &nbsp;x = 120° + k · 180°" }, ticks: ["a"] },
        { type: "step", text: { en: "IV: &nbsp;2x − 30° = 360° − 30° + k · 360° = 330° + k · 360° &nbsp;⟹&nbsp; 2x = 360° + k · 360°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "Divide every term by 2: &nbsp;x = 180° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the k · 360° gets divided by 2 as well, so it becomes k · 180°. Leaving it as k · 360° halves the number of answers you will find later, and the mistake is invisible until an interval question exposes it.",
        } },
        { type: "trap", text: TRAP_K },
      ],
      esplain: {
        en: "Nothing about the type has changed — one function, on its own, so it is still type ①. What has changed is the bookkeeping, and there are two habits that carry it. First: the unknown is the whole bracket, 2x − 30°, so write both quadrant lines for the bracket and do not touch the x until they are down on paper. Third quadrant is 180° plus the reference angle; fourth is 360° minus it. Second: once the bracket is alone, divide EVERY term of the line by 2 — the angle and the k · 360° alike. She writes the divisor under each piece in a second colour so nothing gets missed. That turns k · 360° into k · 180°, which is what packs the answers twice as close together. Skip that and your general solution will look right and quietly hide half its solutions the moment somebody asks for an interval.",
      },
    },
  ],
};

export const gtrigGeneralSolutionSiblingQuestions = [q1, q2, q3, q4, q5];
