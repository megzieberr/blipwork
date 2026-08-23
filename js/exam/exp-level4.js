/* ============================================================
   EXAM FOCUS — Exponents & Surds · THE LEVEL 4 TILE
   "Level 4 ★ — the brave round".
   (SESSION B of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map and her ruling 5, sessions/B-exp.md.)
   ------------------------------------------------------------
   HER RULING 5, in one sentence: levels 1–3 live on the normal tiles,
   and every chapter's last tile holds the ★ questions, so a learner
   drilling basics never turns a card and finds one. Every card here
   therefore carries at least one level-4 part, and no part below
   level 3 — a lead-in part is only allowed when the ★ part genuinely
   depends on it (q2, q5 and q6 are the three that do).

   A SEVENTH card lives on this tile without living in this file:
   exp.nss.q1(d) — 4ˣ − 3·2ˣ − 4 = 0, the ★ part that used to sit on
   the exponential-equations tile. It MOVES here (see js/exam/
   cards-exp.js), which is what let "exp" come off verify-exam.html
   Part 13's L4_MOVE_PENDING list.

   THE SIX BUILT HERE, and what makes each one level 4 — in every case
   the needed fact is NOT written in the question:
     q1  4^(x+1) − 9·2ˣ + 2 = 0 — divorce the 4^(x+1) AND spot that
         4ˣ = (2ˣ)², then the k-method, and BOTH branches survive
         (one of them a fraction, giving a negative x);
     q2  reading √(x − 2)/(x − 5) for undefined / zero / real — two
         conditions that have to hold at once, and the excluded value
         sits INSIDE the allowed interval, so it must be thrown out
         by hand;
     q3  √(2ˣ + 5) = 2ˣ − 1 — a surd equation and an exponential
         equation in the same question, with a dead branch and a
         compulsory test in the original;
     q4  "show that 2^(n+2) + 2ⁿ is divisible by 5 for every natural
         n" — a proof, where the last sentence is a mark on its own;
     q5  a root inside a root, then the same expression with a
         NEGATIVE base — even root non-real, odd root fine;
     q6  x^(2/3) = 25 — the ± that comes from an even numerator, both
         roots checked, and then the same equation with a negative
         right-hand side, which has no solution.

   METHOD: METHODS-algebra.md, hers verbatim — A3 divorce, A4 the
   common factor, A13 the k-method and its two-column walk back, A12
   "a positive base cannot have a negative answer", A14 the reciprocal
   power and her "Important Notes" box on where the ± goes, A15 "ALWAYS
   test both answers!!", A16 a "show that" from one side, A7's
   negatives box, B10 undefined / zero / real, and §0.3 her four
   "no answer" words. F1 (her ruling): 2ˣ = −1 is NO SOLUTION, never
   "undefined". F5 (her ruling): both roads shown, the second under OR.

   NO DIAGRAM.
   ============================================================ */

const PAPER = "siblings";
const CH = "exp";

/* A pre-built stacked fraction — the only safe way to write a rational
   exponent (fracHtml leaves a pre-built .sfrac alone). */
const F = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;
const RX = (n, d) => `<sup>${F(n, d)}</sup>`;

/* ---------------------------------------------------------------
   q1 — 4^(x+1) − 9·2ˣ + 2 = 0.  x = −2 or x = 1.
   --------------------------------------------------------------- */
const q1 = {
  id: "exp.l4.q1",
  chapter: CH,
  topic: "level-4",
  archetype: "exponential-quadratic-needing-a-divorce-before-the-k-method",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es8" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 4,
      prompt: {
        en: "<em>Without the use of a calculator.</em><br>Solve for x: &nbsp;4<sup>x+1</sup> − 9 · 2<sup>x</sup> + 2 = 0",
      },
      hint: {
        en: "Nothing in the question says the two bases are related — that is the bit you have to fetch. Split the first term so the exponent is a plain x, write it in base 2, and then look for the quadratic hiding underneath.",
      },
      memo: [
        { type: "step", text: { en: "<b>Divorce</b> the first term so its exponent is a plain x, then write it in base 2: &nbsp;4<sup>x+1</sup> = 4 · 4<sup>x</sup> = 4 · (2²)<sup>x</sup> = 4 · (2<sup>x</sup>)²" }, ticks: ["s/f"] },
        { type: "step", text: { en: "let K = 2<sup>x</sup> &nbsp;&nbsp;(then K² = (2<sup>x</sup>)²) &nbsp;⟹&nbsp; 4K² − 9K + 2 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(4K − 1)(K − 2) = 0 &nbsp;&nbsp;∴ K = 1/4 &nbsp;or&nbsp; K = 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "2<sup>x</sup> = 1/4 = 2⁻² &nbsp;&nbsp;∴ x = −2" }, ticks: ["a"] },
        { type: "answer", text: { en: "2<sup>x</sup> = 2¹ &nbsp;&nbsp;∴ x = 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: K is not the answer. <b>Both</b> branches survive here — a positive base reaches 1/4 quite happily, because a fraction is still positive — so both have to be walked back through 2<sup>x</sup> = K. Stopping at K = 1/4 and K = 2 throws away two marks.",
        } },
      ],
      esplain: {
        en: "Two hidden facts have to be fetched before this looks like anything you have solved before, and neither is written down for you. The first is that the exponent on the 4 is not a plain x, so the term has to be divorced: 4 to the x plus one is 4 times 4 to the x. The second is that 4 is 2 squared, so 4 to the x is 2 to the x, squared. Once both of those are in place the equation holds one thing and its square, which is the shape of a quadratic, and naming that thing K makes it visible. Factorise, and then walk every branch back — that is where the marks live. This time neither branch dies, because a quarter is a perfectly reachable value for a power of 2: you just have to feed it a negative exponent.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — reading an expression: undefined / zero / real.
   √(x − 2)/(x − 5). Her B10 layout.
   Part (a) carries the expression, like every other stem in the bank;
   (b) and (c) refer back to it, so nothing is said twice and the card
   needs no intro (verify-exam.html Part 12 rule 6: a card whose first
   part carries the stem must NOT have one).
   --------------------------------------------------------------- */
const q2 = {
  id: "exp.l4.q2",
  chapter: CH,
  topic: "level-4",
  archetype: "undefined-zero-and-real-for-a-surd-over-a-linear-denominator",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Consider the expression &nbsp;√(x − 2)/(x − 5).<br><br>For which value(s) of x is the expression <b>undefined</b>?",
      },
      hint: {
        en: "Undefined has one meaning and one meaning only in this chapter. Ask what a fraction is never allowed to have underneath it.",
      },
      memo: [
        { type: "step", text: { en: "<b>Undefined</b> means a denominator of zero — nothing else." } },
        { type: "step", text: { en: "x − 5 = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ x = 5" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Her four no-answer words each have exactly one job, and undefined is the one reserved for dividing by zero. So this part is not asking you to look at the root at all — it is asking which value of x makes the bottom of the fraction disappear. Set the denominator equal to zero and solve, and x equals five falls straight out. Writing non-real here would be wrong even though there is a root in the question, because non-real belongs to a negative under an even root, which is a different failure altogether. Getting the word right is half of what this kind of question is testing.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "For which value(s) of x is the expression equal to <b>zero</b>?",
      },
      hint: {
        en: "A fraction is zero exactly when its top is zero — the bottom can never make it zero, only break it. So set the numerator to zero, then check the value you get is actually allowed.",
      },
      memo: [
        { type: "step", text: { en: "A fraction is zero when its <b>numerator</b> is zero (and the denominator is not)." } },
        { type: "step", text: { en: "√(x − 2) = 0 &nbsp;⟹&nbsp; x − 2 = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ x = 2 &nbsp;&nbsp;— and x = 2 does not make the denominator zero, so it is allowed." }, ticks: ["a"] },
      ],
      esplain: {
        en: "Think about what a fraction is: a top divided by a bottom. The only way that can come out as zero is if the top itself is zero, because dividing zero by anything at all still gives zero. So the whole part is about the numerator, and a square root is zero exactly when what is underneath it is zero. That gives x equals two. The last sentence is not optional though — you always check that the value you found does not also break the denominator, because a value that makes the top AND the bottom zero gives you nothing at all. Here two and five are different numbers, so it is safe.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: {
        en: "For which values of x is the expression <b>real</b>?",
      },
      hint: {
        en: "Two separate things have to be true at the same time here, and each one comes from a different part of the expression. Write both down before you write an answer — and then check whether they overlap.",
      },
      memo: [
        { type: "step", text: { en: "Two conditions must hold <b>at the same time</b>, and missing either one is what makes this the ★ part." } },
        { type: "step", text: { en: "You may not have a negative under an even root: &nbsp;x − 2 ≥ 0 &nbsp;&nbsp;∴ x ≥ 2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "And it must still be defined, so the denominator may not be zero: &nbsp;x ≠ 5 &nbsp;— and 5 IS inside x ≥ 2, so it has to be thrown out by hand." }, ticks: ["ca"] },
        { type: "answer", text: { en: "x ≥ 2 ; &nbsp;x ≠ 5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: know which word does which job. <b>Non-real</b> is an even root of a negative; <b>undefined</b> is dividing by zero. This part needs BOTH handled at once, and the excluded value rides after a semicolon — x ≥ 2 ; x ≠ 5, never just x ≥ 2.",
        } },
      ],
      esplain: {
        en: "The word real is doing two jobs at once, and that is exactly why this one is starred. For the expression to be a real number, the root has to be real, which needs whatever is under it to be zero or positive, giving x greater than or equal to two. But it also has to exist at all, which needs the bottom not to be zero, giving x not equal to five. Now look carefully at how those two sit together. Five is bigger than two, so it is sitting right inside the interval you just found — the second condition does not come free, it has to be written down separately and punched out of the answer. Her house style puts that restriction after a semicolon, and a marker looks for it.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — a surd equation wrapped around an exponential:
   √(2ˣ + 5) = 2ˣ − 1.  x = 2.
   --------------------------------------------------------------- */
const q3 = {
  id: "exp.l4.q3",
  chapter: CH,
  topic: "level-4",
  archetype: "surd-equation-in-disguise-with-an-exponential-inside",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es8" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 4,
      prompt: {
        en: "<em>No calculator.</em><br>Solve for x: &nbsp;√(2<sup>x</sup> + 5) = 2<sup>x</sup> − 1",
      },
      hint: {
        en: "The x is stuck in an exponent AND under a root, which is two problems at once — so get rid of one of them. Give 2<sup>x</sup> a short name and read the equation again; you will recognise what is left.",
      },
      memo: [
        { type: "step", text: { en: "The x is in an exponent and under a root, so name the exponential first: &nbsp;let K = 2<sup>x</sup>. &nbsp;⟹&nbsp; √(K + 5) = K − 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "The root is already alone on one side, so square both sides — brackets on both: &nbsp;(√(K + 5))² = (K − 1)²" }, ticks: ["s/f"] },
        { type: "step", text: { en: "K + 5 = K² − 2K + 1 &nbsp;⟹&nbsp; 0 = K² − 3K − 4 = (K − 4)(K + 1)" }, ticks: ["ca"] },
        { type: "step", text: { en: "∴ K = 4 &nbsp;or&nbsp; K = −1. &nbsp;&nbsp;2<sup>x</sup> ≠ −1, because a positive base can never reach a negative value &nbsp;∴ <b>no solution</b> on that branch." }, ticks: ["ca"] },
        { type: "answer", text: { en: "2<sup>x</sup> = 4 = 2² &nbsp;∴ x = 2. &nbsp;&nbsp;TEST in the original: &nbsp;√(2² + 5) = √9 = 3 &nbsp;and&nbsp; 2² − 1 = 3, &nbsp;and 3 = 3 ✓" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: squaring both sides can invent roots that were never there, so ALWAYS test in the ORIGINAL equation. And pick the right word for the dead branch — it is <b>no solution</b> (a positive base cannot be negative), not “undefined”, which is only ever for dividing by zero.",
        } },
      ],
      esplain: {
        en: "Two whole topics are folded into one line here, and the way through is to deal with them one at a time rather than both at once. Naming 2 to the x as K removes the exponent problem completely: what is left is an ordinary surd equation, root of K plus five equals K minus one. From there it is her usual routine — the root is already by itself, so square both sides with brackets on both, tidy up into a quadratic and factorise. Then the walk back. K equals four is fine and gives x equals two. K equals minus one is not: a positive base raised to any power stays positive, so that branch is no solution, not a forgotten answer. And because squaring can create false roots, the surviving answer still has to be tested in the equation you started with.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — proof: 2^(n+2) + 2ⁿ is divisible by 5 for every n ∈ ℕ.
   --------------------------------------------------------------- */
const q4 = {
  id: "exp.l4.q4",
  chapter: CH,
  topic: "level-4",
  archetype: "show-an-exponential-expression-is-divisible-by-a-given-number",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es4" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 4,
      prompt: {
        en: "<em>No calculator.</em><br>Show that &nbsp;2<sup>n+2</sup> + 2<sup>n</sup>&nbsp; is divisible by 5 for every natural number n.",
      },
      hint: {
        en: "Divisible by 5 means it can be written as 5 times a whole number — so aim for that shape. Divorce the first term so both terms carry the same power of 2, and see what comes out as a common factor.",
      },
      memo: [
        { type: "step", text: { en: "Work one side only. <b>Divorce</b> the first term so both terms carry the same power of 2:" } },
        { type: "step", text: { en: "2<sup>n+2</sup> = 2<sup>n</sup> · 2² = 4 · 2<sup>n</sup>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "2<sup>n+2</sup> + 2<sup>n</sup> = 4 · 2<sup>n</sup> + 2<sup>n</sup>" }, ticks: ["ca"] },
        { type: "step", text: { en: "Take out the common factor — always the base with the variable exponent:<br>= 2<sup>n</sup>(4 + 1) = 5 · 2<sup>n</sup>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "2<sup>n</sup> is a whole number for every n ∈ ℕ, so 5 · 2<sup>n</sup> is 5 × a whole number &nbsp;&nbsp;∴ the expression is divisible by 5 for every natural number n." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the last line is a mark on its own. Reaching 5 · 2<sup>n</sup> is not yet a proof — you have to SAY that 2<sup>n</sup> is a whole number, because that is what turns “5 times something” into “a multiple of 5”.",
        } },
      ],
      esplain: {
        en: "Divisible by five means the expression can be written as five multiplied by a whole number, so that is the shape to aim at from the very first line. The two terms are not the same power of 2, so divorce the bigger one: 2 to the n plus two is 2 to the n times four. Now both terms carry 2 to the n, and it can be taken out as a common factor, leaving four plus one inside the bracket. That bracket is where the five comes from, and it is the same five whatever n happens to be. The final sentence is what makes it a proof rather than a rearrangement: because n is a natural number, 2 to the n is a whole number, so the whole expression really is five times a whole number.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — a root inside a root, then the same with a NEGATIVE base.
   ∛(√64) = 2; (−64)^(1/6) non-real; (−64)^(1/3) = −4.
   --------------------------------------------------------------- */
const q5 = {
  id: "exp.l4.q5",
  chapter: CH,
  topic: "level-4",
  archetype: "nested-root-as-a-single-rational-exponent-then-the-negative-base-trap",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Write &nbsp;∛(√64)&nbsp; as a single power of 64, and evaluate it.",
      },
      hint: {
        en: "A root inside a root is still just one root — the two indexes multiply together. Then remember that the bottom of a fractional exponent is the root.",
      },
      memo: [
        { type: "step", text: { en: "A root inside a root <b>multiplies</b> the two indexes." } },
        { type: "step", text: { en: "∛(√64) = <sup>6</sup>√64 = 64" + RX(1, 6) }, ticks: ["s/f"] },
        { type: "answer", text: { en: "64 = 2⁶ &nbsp;&nbsp;∴ 64" + RX(1, 6) + " = (2⁶)" + RX(1, 6) + " = 2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Taking a square root and then a cube root sounds like two separate jobs, and it is really one: the indexes multiply, so a cube root of a square root is a sixth root. Written as an exponent that is 64 to the power one sixth, because the bottom number of a fractional exponent is always the root. From there, prime factors do the rest of the work — 64 is 2 to the sixth, and taking the sixth root of 2 to the sixth simply cancels the six against the sixth, leaving 2. It is also worth noticing that the order does not matter: the square root of the cube root of 64 gives exactly the same 2, which is one of the surd laws written on her page.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: {
        en: "Determine, with a reason in each case, whether &nbsp;(−64)" + RX(1, 6) + "&nbsp; and &nbsp;(−64)" + RX(1, 3) + "&nbsp; are real numbers, and give the value of each one that is.",
      },
      hint: {
        en: "Turn each exponent back into a root and look only at the bottom number — is that root even or odd? A negative sitting under those two kinds of root behaves completely differently.",
      },
      memo: [
        { type: "step", text: { en: "Turn each exponent back into a root: the bottom of the fraction is the root, and the question is whether that root is <b>even</b> or <b>odd</b>." } },
        { type: "step", text: { en: "(−64)" + RX(1, 6) + " = <sup>6</sup>√(−64) — an <b>even</b> root of a negative, and no real number multiplied by itself six times can come out negative &nbsp;∴ <b>non-real</b>." }, ticks: ["s/f"] },
        { type: "step", text: { en: "(−64)" + RX(1, 3) + " = ∛(−64) — an <b>odd</b> root of a negative, which is allowed, and the answer comes out negative." }, ticks: ["ca"] },
        { type: "answer", text: { en: "(−64)" + RX(1, 6) + " is <b>non-real</b>; &nbsp;&nbsp;(−64)" + RX(1, 3) + " = −4, &nbsp;because (−4)³ = −64." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: <b>non-real</b> is the word for an even root of a negative — not “no solution” and not “undefined”. And a minus inside the bracket is never something you may quietly drop: (−64)" + RX(1, 3) + " is −4, while 64" + RX(1, 3) + " is 4.",
        } },
      ],
      esplain: {
        en: "Part (a) worked because everything in sight was positive. Put a minus in front of the 64 and the two roots part company completely. A sixth root asks for a number that, multiplied by itself six times, gives minus sixty-four — and six is even, so whatever that number was, positive or negative, the answer would come out positive. No real number can do it, so the expression is non-real. A cube root asks for a number multiplied by itself three times, and three is odd, so a negative stays negative: minus four times minus four times minus four really is minus sixty-four. That is the whole of her negatives box in two lines, and the deciding factor is only ever whether the root is even or odd.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — x^(2/3) = 25 (the ± from an even numerator, both roots
   checked), then x^(2/3) = −25 (no solution).
   --------------------------------------------------------------- */
const q6 = {
  id: "exp.l4.q6",
  chapter: CH,
  topic: "level-4",
  archetype: "rational-exponent-equation-with-an-even-numerator-and-its-impossible-twin",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es7" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 4,
      prompt: {
        en: "<em>No calculator.</em><br>Solve for x: &nbsp;x" + RX(2, 3) + " = 25",
      },
      hint: {
        en: "Multiply the exponent by its reciprocal to strip it off the x — and do exactly the same to the other side. Then look hard at the TOP of the original exponent before you decide how many answers there are.",
      },
      memo: [
        { type: "step", text: { en: "Multiply the exponent by its <b>reciprocal</b> — switch numerator and denominator — and do the same to the other side:" } },
        { type: "step", text: { en: "(x" + RX(2, 3) + ")" + RX(3, 2) + " = 25" + RX(3, 2) }, ticks: ["s/f"] },
        { type: "step", text: { en: "The original exponent has an <b>even numerator</b> (the 2), so the answer carries a ±:<br>x = ±25" + RX(3, 2) + " = ±(√25)³ = ±5³ = ±125" }, ticks: ["ca"] },
        { type: "step", text: { en: "CHECK both: &nbsp;125" + RX(2, 3) + " = (∛125)² = 5² = 25 ✓ &nbsp;&nbsp;and&nbsp;&nbsp; (−125)" + RX(2, 3) + " = (∛(−125))² = (−5)² = 25 ✓" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = 125 &nbsp;or&nbsp; x = −125" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — raise, then root (same marks): &nbsp;x" + RX(2, 3) + " = 25 &nbsp;⟹&nbsp; (∛(x²))³ = 25³ &nbsp;⟹&nbsp; x² = <span class=\"nowrap\">15&nbsp;625</span> &nbsp;⟹&nbsp; x = ±125" } },
        { type: "trap", text: {
          en: "REMEMBER: the ± is decided by the NUMERATOR of the original exponent. Here it is 2, which is even, so BOTH signs work and dropping the −125 throws away half the answer. If that numerator had been odd there would be no ± at all.",
        } },
      ],
      esplain: {
        en: "The exponent two over three is a cube root and then a square, and the neatest way to peel it off is to raise both sides to its upside-down version, three over two, because two thirds times three halves is exactly one. That leaves a bare x on the left. The right-hand side becomes 25 to the three over two, which is the square root of 25, cubed, so 125. Now the part that is easy to miss. Because the top of the original exponent is even, the left-hand side squares something at the end, and squaring hides a sign — so a negative x works just as well as a positive one. Her rule is to look at that numerator and nothing else: even numerator, put a ±. The check confirms it, and it is worth writing down.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence explain why &nbsp;x" + RX(2, 3) + " = −25&nbsp; has no solution.",
      },
      hint: {
        en: "Read the exponent as two instructions in order: cube root first, then square. Ask what the last of those two can possibly produce.",
      },
      memo: [
        { type: "step", text: { en: "Read the exponent in order: &nbsp;x" + RX(2, 3) + "&nbsp; is the cube root of x, and then that answer <b>squared</b>." } },
        { type: "step", text: { en: "Whatever ∛x comes to — positive, negative or zero — squaring it can never give a negative answer." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x" + RX(2, 3) + " ≠ −25 &nbsp;&nbsp;∴ <b>no solution</b>." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: an EVEN number in the numerator means the left-hand side can never come out negative, so a negative right-hand side gives <b>no solution</b>. Not “undefined”, which is only for dividing by zero, and not “non-real”, which is only for an even root of a negative.",
        } },
      ],
      esplain: {
        en: "Part (a) is the reason this one is easy, if you read the exponent the same way. Two over three means take the cube root first, then square the result. The cube root is perfectly happy with a negative x, so nothing goes wrong there — but the squaring at the end is a one-way door: squares are never negative. So the left-hand side can be zero or positive and nothing else, and asking it to equal minus twenty-five is asking for something impossible. That is her third no-answer word: no solution. Notice how differently the same equation behaves with an odd numerator — x to the one third equals minus twenty-five has a perfectly ordinary answer, because nothing gets squared on the way.",
      },
    },
  ],
};

export const expLevel4Questions = [q1, q2, q3, q4, q5, q6];
