/* ============================================================
   EQUATIONS & INEQUALITIES · Q6 — Quadratic formula & simultaneous
   ------------------------------------------------------------
   When to use the formula, the formula itself (sign traps),
   what MUST be shown, entering a, b and c WITH their signs,
   the sum & product of roots (build the factors!), and the
   substitution method for simultaneous equations.
   ============================================================ */
import { mc, ynQ, pick, randInt, C } from "./_eq.js";
/* forced-decimal-places formatter (comma decimal + a real minus) — the
   rounding skill needs "2,41" and "2,4" side by side, which C()'s
   trailing-zero-trimming form cannot give. */
import { fmtComma } from "../check.js";

const FOR = "eqFormula";
const SIM = "eqSimultaneous";

const SKILLS = {
  /* when the formula is the tool */
  whenFormula: () => {
    const items = [
      { q: "When do you reach for the <b>quadratic formula</b>?", correct: "When the trinomial cannot be factorised", wrongs: ["For every quadratic — factorising is never allowed", "Only when the equation has fractions", "Only when a = 1"], ans: "Try to factorise first. If it won't factorise (or the question says 'correct to two decimals'), use the formula. Completing the square only if the question asks for it.",
        sol: [{ s: "Standard form first, then try to factorise — that is always the quickest road when it works" },
              { s: "If no pair of numbers fits, the roots are not rational and factorising cannot reach them" },
              { s: "That is what the formula is for", r: "complete the square only when the question actually asks for it" }] },
      { q: "The question says 'give your answers correct to TWO DECIMALS'. What is that hinting?", correct: "The trinomial probably won't factorise — use the quadratic formula", wrongs: ["The answers must be whole numbers", "You must complete the square", "You must round every step"], ans: "Decimal answers signal irrational roots — the formula (or EQN mode) is the tool. Round only the FINAL answers, with a decimal comma.",
        sol: [{ s: "A factorising answer comes out exact, so it would never need rounding" },
              { s: "Asking for decimals is a hint that the roots are irrational — something like 1 ± √2" },
              { s: "So go straight for the formula, and round only the final line, to two decimals with a decimal comma" }] },
    ];
    const it = pick(items);
    return mc(FOR, it.q, it.correct, it.wrongs,
      { hint: "Factorise if you can; formula when you can't (or when decimals are asked).", answerLabel: it.ans, solution: it.sol });
  },

  /* the formula, with sign-trap decoys */
  theFormula: () => {
    const correct = "x = ( −b ± √(b² − 4ac) ) / 2a";
    const wrongs = [
      "x = ( b ± √(b² − 4ac) ) / 2a",
      "x = ( −b ± √(b² + 4ac) ) / 2a",
      "x = −b ± √(b² − 4ac) / 2",
    ];
    return mc(FOR, "Pick the CORRECT quadratic formula.", correct, wrongs,
      { hint: "Minus b, plus-minus, root of b² MINUS 4ac, ALL over 2a.",
        answerLabel: "x = (−b ± √(b² − 4ac)) / 2a — the whole top is divided by 2a, and it's minus 4ac under the root.",
        solution: [
          { s: "Check it piece by piece. It opens with −b, not b", r: "so a positive b gives a negative start" },
          { s: "Under the root sits b² − 4ac, with a MINUS", r: "that expression is Δ, and a plus there would never give non-real roots" },
          { s: "And the WHOLE top is divided by 2a, so the top needs its own bracket when you type it" },
        ] });
  },

  /* what must be written down */
  showSteps: () => {
    const items = [
      { q: "Using the quadratic formula, which TWO lines must always be shown?", correct: "The formula itself, then the substitution of a, b and c", wrongs: ["Only the final answers", "The factorising attempt and the answer", "The formula only — substitution is optional"], ans: "Always: write the formula, then show the substitution line with a, b and c in brackets — THEN the answers (calculator allowed for the values).",
        sol: [{ s: "Marks are given for the written steps, not for the final number" },
              { s: "So write the formula out first, exactly as it stands" },
              { s: "Then the substitution line, with every negative in its own brackets, before you work anything out" }] },
      ynQ(FOR,
        "You may use EQN mode on the calculator to get the values — as long as the formula and substitution are written down. True?",
        true,
        { hint: "Marks are for the working; the calculator just checks the arithmetic.",
          answerLabel: "True — write formula + substitution for the marks, then let EQN mode confirm X₁ and X₂.",
          solution: [
            { s: "Her notes teach the EQN route themselves, so the calculator is allowed here" },
            { s: "But the marks sit on the formula line and the substitution line, which the calculator does not write for you" },
            { s: "∴ true — write both lines, then let EQN check X₁ and X₂", r: "answers alone score almost nothing" },
          ] }),
    ];
    const it = pick(items);
    return it.type ? it : mc(FOR, it.q, it.correct, it.wrongs,
      { hint: "Formula line + substitution line, every time.", answerLabel: it.ans, solution: it.sol });
  },

  /* a, b, c with their signs — fresh, with the workbook's c-trap */
  signsIn: () => {
    const bb = randInt(2, 6), cc = randInt(1, 8);   // bb ≥ 2: never show "1x"
    const prompt = `For <b>x² − ${C(bb)}x − ${C(cc)} = 0</b>, what are a, b and c?`;
    const correct = `a = 1, b = −${C(bb)}, c = −${C(cc)}`;
    const wrongs = [
      `a = 1, b = −${C(bb)}, c = ${C(cc)}`,
      `a = 1, b = ${C(bb)}, c = −${C(cc)}`,
      `a = 0, b = −${C(bb)}, c = −${C(cc)}`,
    ];
    return mc(FOR, prompt, correct, wrongs,
      { hint: "Every coefficient keeps the sign sitting in front of it.",
        answerLabel: `b and c BOTH carry their minus signs: b = −${C(bb)}, c = −${C(cc)}. (Typing c = ${C(cc)} into the calculator solves a different equation!)`,
        solution: [
          { s: `Standard form is ax² + bx + c = 0, with PLUS signs written between the terms` },
          { s: `So read x² − ${C(bb)}x − ${C(cc)} = 0 as x² + (−${C(bb)})x + (−${C(cc)}) = 0` },
          { s: `a = 1, b = −${C(bb)}, c = −${C(cc)}`, r: "each coefficient keeps the sign standing in front of it" },
        ] });
  },

  /* rounding convention
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "one fixed
     concrete example (x = 1 ± √2) — parametrisable"). The surd answer now
     rolls: m ± √r with r a NON-square, so the roots stay irrational and
     rounding is genuinely needed. Both values are computed exactly and
     rounded ONCE at the end (DICE-PLAN's number-pad law / her Finance
     one-equation rule), and the three decoys are built from those same
     two values — decimal point, one decimal, and "leave the surd". */
  rounding: () => {
    const items = [
      null,   // the rolled surd item, built below
      ynQ(FOR,
        "You should round every in-between step to two decimals as you go. True?",
        false,
        { hint: "Early rounding snowballs.",
          answerLabel: "False — round only at the END. Rounding along the way builds up error; carry the exact values (or full calculator display) until the final line.",
          solution: [
            { s: "Every rounding throws a little bit away, and the next step multiplies whatever is left" },
            { s: "Two or three rounded steps and the last decimal is already wrong" },
            { s: "∴ false — carry the exact value or the full calculator display, and round ONCE at the end" },
          ] }),
    ];
    const it = pick(items);
    if (it) return it;
    const m = randInt(1, 5), r = pick([2, 3, 5, 6, 7, 8, 10, 11, 12]);   // never a perfect square
    const hi = m + Math.sqrt(r), lo = m - Math.sqrt(r);                  // exact, rounded once below
    const d2 = (v) => fmtComma(v, 2), d1 = (v) => fmtComma(v, 1);
    const dot = (s) => s.replace(/,/g, ".");
    const surd = `${C(m)} ± √${C(r)}`;
    return mc(FOR,
      `The formula gives x = ${surd}. The question wants decimals. How do you write the answers?`,
      `x ≈ ${d2(hi)} or x ≈ ${d2(lo)} — two decimals, decimal comma`,
      [`x ≈ ${dot(d2(hi))} or x ≈ ${dot(d2(lo))} — decimal point`,
        `x ≈ ${d1(hi)} or x ≈ ${d1(lo)} — one decimal`,
        `Leave them as ${surd} always`],
      { hint: "Two decimals, decimal comma, final answers only.",
        answerLabel: `Round FINAL answers to two decimals with the decimal comma (SA style): ${d2(hi)} and ${d2(lo)}. Keep the surd form only if the question asks for it.`,
        solution: [
          { s: `Split the ± into its two answers first: x = ${C(m)} + √${C(r)} or x = ${C(m)} − √${C(r)}` },
          { s: `Work each one out and round ONCE, at the end, to two decimals: ${d2(hi)} and ${d2(lo)}` },
          { s: `Write the decimals with a COMMA, and join each to its surd line with ≈`, r: "exact line with =, rounded line with ≈" },
        ] });
  },

  /* sum & product of roots — build the factors! (workbook's −42 trap) */
  sumProduct: () => {
    const m = randInt(2, 8), n = randInt(3, 9);       // roots: −m and n (n ≥ 3 keeps every option value distinct)
    const cVal = -m * n, bVal = -(-m + n);
    const prompt = `The roots of <b>x² + bx + c = 0</b> are <b>−${C(m)}</b> and <b>${C(n)}</b>. What is c?`;
    const correct = `c = (${C(m)})(−${C(n)}) = ${C(cVal)}`;
    const wrongs = [
      `c = ${C(m)} × ${C(n)} = ${C(m * n)}`,
      `c = −${C(m)} + ${C(n)} = ${C(-m + n)}`,
      `c = −${C(m)} − ${C(n)} = ${C(-m - n)}`,
    ];
    return mc(FOR, prompt, correct, wrongs,
      { hint: `Build the factors from the roots first: (x + ${C(m)})(x − ${C(n)}), then expand.`,
        answerLabel: `Roots −${C(m)} and ${C(n)} → factors (x + ${C(m)})(x − ${C(n)}). The constant is the product of the FACTOR constants: (${C(m)})(−${C(n)}) = ${C(cVal)}. (And b = ${C(bVal)}, the sum of roots with opposite sign.)`,
        solution: [
          { s: `Turn each root into its factor, opposite sign: −${C(m)} gives (x + ${C(m)}), and ${C(n)} gives (x − ${C(n)})` },
          { s: `So the equation is (x + ${C(m)})(x − ${C(n)}) = 0` },
          { s: `Multiply out and read off c: (${C(m)})(−${C(n)}) = ${C(cVal)}`, r: "c is the product of the numbers INSIDE the brackets, signs and all" },
          { s: `The same expansion gives b = ${C(bVal)}`, r: "build the brackets — do not try to remember a sum-and-product formula" },
        ] });
  },

  /* simultaneous: who becomes the subject
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "one fixed
     concrete example (2x − y = 9) — parametrisable"). The linear equation
     rolls; the correct rearrangement y = ax − c and all three decoys
     (take x instead · sign not carried across · "already finished") are
     built from the same two rolled numbers. */
  simulSubject: () => {
    if (pick([true, false])) {
      const it = { q: "Simultaneous equations (substitution method). Which equation do you make a variable the subject of?", correct: "The simpler one — usually the LINEAR equation", wrongs: ["The quadratic one — it has more information", "Always the first one written", "Either — it makes no difference to the work"], ans: "Rearrange the LINEAR equation (least work, no squares), then substitute that expression into the other equation." };
      return mc(SIM, it.q, it.correct, it.wrongs,
        { hint: "Pick the easy (linear) equation and make one variable the subject.", answerLabel: it.ans,
          solution: [
            { s: "Making a variable the subject means getting it alone on one side" },
            { s: "In the linear equation nothing is squared, so it comes out in one or two moves" },
            { s: "Rearranging the quadratic would leave a root sign in your expression — much messier",
              r: "so rearrange the LINEAR one and substitute it into the other" },
          ] });
    }
    const a = randInt(2, 6), c = randInt(2, 12);
    return mc(SIM,
      `From <b>${C(a)}x − y = ${C(c)}</b>, the tidy subject to take is…`,
      `y = ${C(a)}x − ${C(c)}`,
      [`x = (${C(c)} + y)/${C(a)} — always take x`, `y = ${C(c)} − ${C(a)}x`, `${C(a)}x = y + ${C(c)} is already finished`],
      { hint: "Pick the easy (linear) equation and make one variable the subject.",
        answerLabel: `y = ${C(a)}x − ${C(c)} (watch the signs as it crosses). Substituting this into the other equation leaves one variable.`,
        solution: [
          { s: `Choose the variable with nothing attached to it — here that is the y` },
          { s: `${C(a)}x − y = ${C(c)}  →  ${C(a)}x − ${C(c)} = y`, r: "move the y across, move the number across" },
          { s: `y = ${C(a)}x − ${C(c)}`, r: `taking x instead would drag in a division by ${C(a)} for no reason` },
        ] });
  },

  /* what you get and how to finish
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "one fixed
     concrete example (x = 3 → y) mixed with generic items"). The
     back-substitution item rolls its x-value and its linear equation, and
     the partner y is computed from them (y = a·x₀ − c), so the worked
     line and the coordinate pair can never disagree. Coordinate pairs
     keep her SEMICOLON (METHODS-algebra 0.1). The two generic items are
     untouched. */
  simulFinish: () => {
    const shape = randInt(1, 3);
    if (shape === 1) {
      const it = { q: "Linear + quadratic simultaneous equations: how many solution PAIRS can there be?", correct: "Up to two — and each answer must be paired with its partner value", wrongs: ["Exactly one, always", "Up to four", "None — a line and a parabola can't be solved together"], ans: "Substituting the line into the quadratic gives a quadratic → up to two x-values, each with its own y. Write each as a coordinate pair (x ; y)." };
      return mc(SIM, it.q, it.correct, it.wrongs,
        { hint: "Substitute, solve the quadratic, back-substitute, pair up.", answerLabel: it.ans,
          solution: [
            { s: "Substituting the line into the quadratic leaves one variable, in a quadratic equation" },
            { s: "A quadratic gives at most two answers, so there are at most two x-values" },
            { s: "Each x has its own y, so the answers come out as up to two pairs (x ; y)",
              r: "picture it: a line can cut a parabola twice, touch it once, or miss it" },
          ] });
    }
    if (shape === 2) {
      return ynQ(SIM,
        "Final answers to simultaneous equations should be written as coordinate pairs, e.g. (3 ; −3). True?",
        true,
        { hint: "Each x belongs to a specific y.",
          answerLabel: "True — each solution is a PAIR that works in both equations, so write them together: (3 ; −3).",
          solution: [
            { s: "A solution has to satisfy BOTH equations, which takes an x and its own matching y" },
            { s: "Listing the x-values alone loses which y belongs to which x" },
            { s: "∴ true — write each solution as a pair, with a SEMICOLON: (3 ; −3)", r: "the comma is the decimal separator" },
          ] });
    }
    const x0 = randInt(2, 7), a = randInt(2, 5), c = randInt(2, 12);
    const y0 = a * x0 - c;
    return mc(SIM,
      `You solved x = ${C(x0)}. How do you find the matching y?`,
      `Substitute x = ${C(x0)} back into the SUBJECT expression (the linear equation)`,
      ["y is always 0", "Substitute into the discriminant", "Guess and check"],
      { hint: "Substitute, solve the quadratic, back-substitute, pair up.",
        answerLabel: `Back-substitute into the linear equation (the easy one): e.g. y = ${C(a)}(${C(x0)}) − ${C(c)} = ${C(y0)}, giving the pair (${C(x0)} ; ${C(y0)}).`,
        solution: [
          { s: `Go back to the LINEAR equation — it is the easy one, and it is already y = …` },
          { s: `Put the x in, bracketed: y = ${C(a)}(${C(x0)}) − ${C(c)}` },
          { s: `y = ${C(y0)}, so the pair is (${C(x0)} ; ${C(y0)})`, r: "do this fresh for each x-value you found" },
        ] });
  },
};

export const questEq6 = {
  id: "eq6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id,
    concept: ["simulSubject", "simulFinish"].includes(id) ? SIM : FOR,
    gen,
  })),
};
