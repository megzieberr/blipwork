/* ============================================================
   EQUATIONS & INEQUALITIES · Q8 — Nature of roots & KNOW THE DIFFERENCE
   ------------------------------------------------------------
   Δ = b² − 4ac, matching the three parabola pictures to the
   sign of Δ, the rational/irrational split, the three question
   types, the (p − 2)² + 4 proof trick, the rejected k = 0, and
   the vocabulary panel: no solution / undefined / non-real / N.A.
   ============================================================ */
import { mc, ynQ, pick, randInt, C, deltaGraph } from "./_eq.js";

const DIS = "eqDiscriminant";
const DIF = "eqKnowDiff";

const SKILLS = {
  /* what Δ is and where it lives */
  whatDelta: () => {
    const items = [
      { q: "What is the <b>discriminant</b> Δ?", correct: "Δ = b² − 4ac", wrongs: ["Δ = b² + 4ac", "Δ = √(b² − 4ac)", "Δ = −b / 2a"], ans: "Δ = b² − 4ac — the part UNDER the root in the quadratic formula (without the root itself).",
        sol: [{ s: "Look at the formula: x = (−b ± √(b² − 4ac)) / 2a" },
              { s: "Δ is the piece sitting UNDER the root, on its own: b² − 4ac", r: "the root sign is not part of Δ" },
              { s: "It is a MINUS 4ac — a plus there could never come out negative, and the whole point of Δ is that it can" }] },
      { q: "Where does Δ live inside the quadratic formula?", correct: "Under the square root", wrongs: ["In the denominator", "In front of the ±", "It isn't in the formula"], ans: "x = (−b ± √Δ)/2a with Δ = b² − 4ac. Its sign decides whether the root (and so the answers) exist.",
        sol: [{ s: "Write the formula with Δ in it: x = (−b ± √Δ) / 2a" },
              { s: "Δ sits under the square root, which is why its SIGN matters so much" },
              { s: "Negative under the root → non-real; zero → the ± adds nothing; positive → two different answers" }] },
      { q: "What do the ROOTS of a quadratic look like on its graph?", correct: "The x-intercepts — where the parabola cuts the x-axis", wrongs: ["The turning point", "The y-intercept", "The axis of symmetry"], ans: "Roots = x-intercepts. That's why Δ (which counts the real roots) tells you how the parabola meets the x-axis.",
        sol: [{ s: "A root is an x that makes the expression equal 0" },
              { s: "On the graph, y = 0 IS the x-axis", r: "her heading: nature of roots ↳ where the graph intersects the x-axis" },
              { s: "So the roots are exactly the x-intercepts, and counting them counts the crossings" }] },
    ];
    const it = pick(items);
    return mc(DIS, it.q, it.correct, it.wrongs,
      { hint: "Δ is the b² − 4ac sitting under the root.", answerLabel: it.ans, solution: it.sol });
  },

  /* ★ match the picture to Δ */
  matchGraph: () => {
    const kind = pick(["two", "touch", "none"]);
    const correct =
      kind === "two" ? "Δ > 0 — two real, unequal roots" :
      kind === "touch" ? "Δ = 0 — real, equal roots (it touches at the TP)" :
      "Δ < 0 — non-real roots";
    const all = [
      "Δ > 0 — two real, unequal roots",
      "Δ = 0 — real, equal roots (it touches at the TP)",
      "Δ < 0 — non-real roots",
      "Δ ≥ 0 — nothing can be said",
    ];
    const wrongs = all.filter((s) => s !== correct);
    return mc(DIS, "The sketch shows how this parabola meets the x-axis. What does it tell you about Δ and the roots?",
      correct, wrongs,
      { hint: "Cuts twice → Δ > 0. Touches once → Δ = 0. Floats clear → Δ < 0.",
        answerLabel: kind === "two"
          ? "It CUTS the x-axis at two points → two real, unequal roots → Δ > 0."
          : kind === "touch"
            ? "It TOUCHES the x-axis at exactly one point (the turning point) → real, equal roots → Δ = 0."
            : "It never reaches the x-axis → no x-intercepts → non-real roots → Δ < 0.",
        solution: [
          { s: "Count the x-intercepts on the sketch — the roots ARE the crossings" },
          { s: kind === "two"
              ? "It cuts clean through the axis in two places, so there are two different real roots"
              : kind === "touch"
                ? "It just kisses the axis at one point, its turning point — the two roots have landed on top of each other"
                : "It never reaches the axis at all, so no real x makes it 0" },
          { s: kind === "two"
              ? "Two different answers need a real, non-zero ± , so Δ > 0"
              : kind === "touch"
                ? "The ± must be adding nothing, so Δ = 0 — real, rational, EQUAL"
                : "That means a negative under the root: Δ < 0 — non-real / imaginary",
            r: "her Δ table, read backwards from the picture" },
        ],
        graph: deltaGraph(kind) });
  },

  /* classify a computed Δ value
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "5 concrete
     Δ values — clearly parametrisable (roll a Δ, derive category)"). The Δ
     is rolled, its category DERIVED from it (never stored beside it), and
     the wrong options are the other three categories — so picture and key
     cannot disagree. The four category strings are her EQ p43 table
     wordings (METHODS-algebra B11), unchanged. Guards: the perfect-square
     branch is built as k² so it really is one, and the non-square branch
     re-rolls until √Δ is irrational. */
  classify: () => {
    const cat = pick(["perfect", "nonPerfect", "zero", "negative"]);
    let d, why;
    if (cat === "perfect") {
      const k = randInt(2, 14); d = k * k;
      why = `${C(d)} > 0 AND ${C(d)} = ${C(k)}² is a perfect square → rational, and unequal because Δ ≠ 0.`;
    } else if (cat === "nonPerfect") {
      d = randInt(2, 99);
      while (Number.isInteger(Math.sqrt(d))) d = randInt(2, 99);   // must NOT be a perfect square
      why = `${C(d)} > 0 but ${C(d)} is NOT a perfect square → the roots keep a surd: real, irrational, unequal.`;
    } else if (cat === "zero") {
      d = 0;
      why = "Δ = 0 → the ± adds nothing: one repeated rational root (the parabola touches the axis).";
    } else {
      d = -randInt(3, 99);
      why = "Δ < 0 → a negative under the root → non-real roots.";
    }
    const correct = cat === "negative" ? "Non-real"
      : cat === "zero" ? "Real, rational, equal"
        : cat === "perfect" ? "Real, rational, unequal" : "Real, irrational, unequal";
    const ALL = ["Real, rational, unequal", "Real, irrational, unequal", "Real, rational, equal", "Non-real"];
    return mc(DIS, `You work out <b>Δ = ${C(d)}</b>. What is the nature of the roots?`,
      correct, ALL.filter((s) => s !== correct),
      { hint: "Sign first (≥ 0 real, < 0 non-real), then perfect square → rational, then 0 → equal.",
        answerLabel: why,
        solution: [
          { s: `Question 1 — what is the SIGN of Δ? Here Δ = ${C(d)}, which is ${d < 0 ? "negative" : d === 0 ? "zero" : "positive"}`,
            r: d < 0 ? "a negative under the root → stop here, the roots are non-real" : "so the roots are real" },
          ...(d < 0 ? [] : [{ s: d === 0
              ? "Question 2 — is Δ zero? It is, so the ± adds nothing and the two roots collapse into one"
              : `Question 2 — is Δ a perfect square? ${C(d)} ${cat === "perfect" ? "is" : "is NOT"} one`,
            r: d === 0 ? "equal roots — the parabola touches the axis at its turning point"
                       : (cat === "perfect" ? "so the root comes out whole: rational" : "so a surd survives: irrational") }]),
          { s: `∴ ${correct}`, r: "her exact wording from the Δ table" },
        ] });
  },

  /* nature given → which condition to write */
  conditions: () => {
    const items = [
      { want: "EQUAL roots", correct: "Δ = 0", wrongs: ["Δ < 0", "Δ ≥ 0", "Δ > 0"] },
      { want: "NON-REAL roots", correct: "Δ < 0", wrongs: ["Δ = 0", "Δ > 0", "Δ ≤ 0"] },
      { want: "REAL roots", correct: "Δ ≥ 0", wrongs: ["Δ > 0", "Δ = 0", "Δ < 0"] },
      { want: "real, RATIONAL and UNEQUAL roots", correct: "Δ > 0 and Δ a perfect square", wrongs: ["Δ > 0 only", "Δ ≥ 0", "Δ = 0"] },
      { want: "two real, UNEQUAL roots", correct: "Δ > 0", wrongs: ["Δ ≥ 0", "Δ = 0", "Δ ≠ 0"] },
    ];
    const it = pick(items);
    return mc(DIS, `The question says the roots must be <b>${it.want}</b>. Which condition do you write down?`,
      it.correct, it.wrongs,
      { hint: "Translate the words into a Δ statement FIRST, then solve it for the unknown.",
        answerLabel: `${it.want} → ${it.correct}. Then substitute a, b and c (with the parameter) and solve.`,
        solution: [
          { s: `Turn the words into a Δ statement before touching any algebra: ${it.want} → ${it.correct}` },
          { s: "Then write Δ = b² − 4ac, substituting a, b and c with the parameter still in them" },
          { s: `Set that expression ${it.correct.includes("perfect") ? "greater than 0 (and check for a perfect square)" : it.correct.replace("Δ ", "")} and solve for the unknown`,
            r: "if you divide by a negative on the way, the inequality sign flips" },
        ] });
  },

  /* the three question types (their notes' framing) */
  threeTypes: () => {
    const items = [
      { stem: "“Determine the nature of the roots of 3x² − x + 4 = 0 WITHOUT solving.”", correct: "Type 1: work out Δ and classify it with the table", wrongs: ["Type 2: set up a condition and solve for the unknown", "Type 3: prove Δ always has a certain sign", "None — it must be solved fully"] },
      { stem: "“For which values of h will 3x² − 2hx + 3 = 0 have non-real roots?”", correct: "Type 2: write the condition (Δ < 0) and solve it for h", wrongs: ["Type 1: work out Δ as a number and classify", "Type 3: prove Δ is always negative", "Solve the quadratic with the formula"] },
      { stem: "“Show that x² − px + p = 2 has two real, unequal roots for ALL p.”", correct: "Type 3: work out Δ in terms of p and show it is ALWAYS positive", wrongs: ["Type 2: solve Δ > 0 for a few values of p", "Type 1: pick p = 1 and classify", "Impossible — p is unknown"] },
    ];
    const it = pick(items);
    return mc(DIS, `Which type of nature-of-roots question is this?<br>${it.stem}`, it.correct, it.wrongs,
      { hint: "1: classify a number. 2: nature given, find the variable. 3: prove it for every value.",
        answerLabel: it.correct });
  },

  /* the proof trick: complete the square on Δ */
  proveTrick: () => {
    const items = [
      { q: "In a Type-3 proof you reach <b>Δ = (p − 2)² + 4</b>. Why is Δ ALWAYS positive?", correct: "A square is never negative, and adding 4 lifts it to at least 4 — above 0 for every p", wrongs: ["Because p must be positive", "Because Δ has a bracket in it", "It isn't — at p = 2 it fails"], ans: "(p − 2)² ≥ 0 for every p, so Δ ≥ 4 > 0 always. (At p = 2, Δ = 4 — still positive.) That proves real, unequal roots for ALL p." },
      { q: "You reach <b>Δ = 169m²</b> and m ≠ 0. What is the nature of the roots?", correct: "Real, rational and unequal — 169m² = (13m)² is a positive perfect square", wrongs: ["Real and irrational — there's an m in it", "Non-real — m could be negative", "Equal — squares mean equal roots"], ans: "169m² = (13m)², a perfect square → rational. And for m ≠ 0 it is strictly positive → unequal. (m negative doesn't matter: m² is positive.)" },
      { q: "To PROVE Δ is always positive when Δ = p² − 4p + 8, what is the standard move?", correct: "Complete the square on Δ: p² − 4p + 8 = (p − 2)² + 4", wrongs: ["Substitute p = 0, 1, 2 and check each", "Factorise Δ into two brackets", "Divide Δ by p"], ans: "Testing a few p-values proves nothing about ALL p. Complete the square: (p − 2)² + 4 ≥ 4 > 0 for every p." },
    ];
    const it = pick(items);
    return mc(DIS, it.q, it.correct, it.wrongs,
      { hint: "A square is ≥ 0; a square plus a positive number is > 0. That works for EVERY value.", answerLabel: it.ans });
  },

  /* the rejected parameter value (workbook's k = 0 error)
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "one fixed
     worked example (k(k+8)=0) — parametrisable with real effort"). The
     factorised Δ = 0 line rolls its constant and its sign; the surviving
     root is derived from it (k(k + m) = 0 → k = −m; k(k − m) = 0 → k = m),
     so the rejected value is always 0 and the teaching point — a
     restriction from the ORIGINAL equation outranks the algebra — is
     exactly the same on every roll. The yes/no item has no numbers. */
  rejectParam: () => {
    if (pick([true, false])) {
      return ynQ(DIS,
        "A parameter value that makes the original equation's denominator 0 must still be kept if the algebra produced it. True?",
        false,
        { hint: "Restrictions outrank algebra.",
          answerLabel: "False — restrictions from the ORIGINAL equation stand. A value that breaks them is rejected (N.A.), exactly like a rejected x.",
          solution: [
            { s: "The restriction comes from the ORIGINAL equation, before any working started" },
            { s: "The algebra cannot un-ban a value — it only shows which values would have solved the changed equation" },
            { s: "∴ false — a parameter that breaks a restriction is rejected as N.A., exactly like a rejected x" },
          ] });
    }
    const m = randInt(2, 12), s = pick([1, -1]);
    const other = -m * s;                                   // k(k + m) = 0 → k = −m ; k(k − m) = 0 → k = m
    const inner = s > 0 ? `k + ${C(m)}` : `k − ${C(m)}`;
    return mc(DIS,
      `Equal roots demand Δ = 0, which gives <b>k(${inner}) = 0</b>, so k = 0 or k = ${C(other)}. But the ORIGINAL equation had kx in a denominator. Final answer?`,
      `k = ${C(other)} only — reject k = 0`,
      [`k = 0 or k = ${C(other)}, both count`, "k = 0 only", "No valid k exists"],
      { hint: "Check every parameter answer against the original equation's restrictions.",
        answerLabel: `kx in a denominator means k ≠ 0 from the start (and at k = 0 the equation isn't even a quadratic). Reject k = 0: the answer is k = ${C(other)} only.`,
        solution: [
          { s: `The algebra gives two candidates: k = 0 or k = ${C(other)}` },
          { s: "Now check them against the original equation: kx sat in a denominator, so k ≠ 0 from the very start" },
          { s: "k = 0 breaks that restriction, so it is N.A.", r: "at k = 0 the equation is not even a quadratic any more" },
          { s: `∴ k = ${C(other)} only` },
        ] });
  },

  /* KNOW THE DIFFERENCE — the four words */
  knowDiff: () => {
    const items = [
      { case: `<b>3ˣ = −1</b>`, correct: "No solution", wrongs: ["Undefined", "Non-real", "Not applicable (N.A.)"], why: "A power with a positive base can never be negative — the statement can NEVER be true: no solution." },
      { case: `<b>x ÷ 0</b> (a denominator equal to 0)`, correct: "Undefined", wrongs: ["No solution", "Non-real", "Not applicable (N.A.)"], why: "Division by 0 is undefined — the ghost under the bed. Find it by setting the denominator = 0." },
      { case: `<b>√(−4)</b>`, correct: "Non-real", wrongs: ["Undefined", "No solution", "Not applicable (N.A.)"], why: "A negative under an even root has no real value → non-real. Find it by setting the inside of the root < 0." },
      { case: "An answer from a surd equation that FAILS the test in the original equation", correct: "Not applicable (N.A.)", wrongs: ["Undefined", "Non-real", "No solution"], why: "Squaring can invent extra answers. A candidate that fails the original equation is rejected: N.A." },
      { case: "An answer that equals one of the fraction equation's restrictions", correct: "Not applicable (N.A.)", wrongs: ["Undefined", "Non-real", "No solution"], why: "The value itself is rejected — mark it N.A. and keep only the valid answer(s)." },
    ];
    const it = pick(items);
    return mc(DIF, `KNOW THE DIFFERENCE: which word describes this?<br>${it.case}`, it.correct, it.wrongs,
      { hint: "No solution = never true. Undefined = denominator 0. Non-real = negative under √. N.A. = a rejected candidate answer.",
        answerLabel: it.why,
        solution: [
          { s: "Run the four words in order and see which one this case actually fits" },
          { s: "No solution = the statement can never be true · undefined = a denominator hits 0 · non-real = a negative sits under an even root · N.A. = a candidate answer that fails the original" },
          { s: it.why, r: "the four are not interchangeable — she gives this its own titled box" },
        ] });
  },

  /* undefined vs non-real on one expression — fresh numbers */
  whereUndefined: () => {
    const m = randInt(1, 6);
    let n = randInt(1, 6); if (n === m) n = m + 1;   // distinct numbers keep every option unambiguous
    const ask = pick(["undef", "nonreal"]);
    const expr = `√(x + ${C(n)}) / (x + ${C(m)})`;
    if (ask === "undef") {
      return mc(DIF, `For which x is <b>${expr}</b> UNDEFINED?`,
        `x = −${C(m)} (the denominator becomes 0)`,
        [`x &lt; −${C(n)} (inside of the root negative)`, `x = −${C(n)}`, `x = ${C(m)}`],
        { hint: "Undefined is about the BOTTOM: set the denominator equal to 0.",
          answerLabel: `Undefined = denominator 0: x + ${C(m)} = 0 → x = −${C(m)}. (x < −${C(n)} is where it's NON-real — a different question!)`,
          solution: [
            { s: "Undefined has one cause only: dividing by 0 — the ghost under the bed" },
            { s: `So look at the BOTTOM and set it to 0: x + ${C(m)} = 0` },
            { s: `x = −${C(m)}`, r: `the root is a different question — that one gives NON-real, at x &lt; −${C(n)}` },
          ] });
    }
    return mc(DIF, `For which x is <b>${expr}</b> NON-REAL?`,
      `x &lt; −${C(n)} (the inside of the root is negative)`,
      [`x = −${C(m)} (denominator 0)`, `x > −${C(n)}`, `x = −${C(n)}`],
      { hint: "Non-real is about the ROOT: set what's under it less than 0.",
        answerLabel: `Non-real = negative inside the root: x + ${C(n)} < 0 → x < −${C(n)}. (x = −${C(m)} is where it's UNDEFINED — a different question!)`,
        solution: [
          { s: "Non-real has one cause only: a negative sitting under an even root" },
          { s: `So look INSIDE the root and make it negative: x + ${C(n)} &lt; 0` },
          { s: `x &lt; −${C(n)}`, r: `the denominator is a different question — that one gives UNDEFINED, at x = −${C(m)}` },
        ] });
  },
};

export const questEq8 = {
  id: "eq8",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id,
    concept: ["knowDiff", "whereUndefined"].includes(id) ? DIF : DIS,
    gen,
  })),
};
