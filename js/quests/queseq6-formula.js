/* ============================================================
   EQUATIONS & INEQUALITIES · Q6 — Quadratic formula & simultaneous
   ------------------------------------------------------------
   When to use the formula, the formula itself (sign traps),
   what MUST be shown, entering a, b and c WITH their signs,
   the sum & product of roots (build the factors!), and the
   substitution method for simultaneous equations.
   ============================================================ */
import { mc, ynQ, pick, randInt, C } from "./_eq.js";

const FOR = "eqFormula";
const SIM = "eqSimultaneous";

const SKILLS = {
  /* when the formula is the tool */
  whenFormula: () => {
    const items = [
      { q: "When do you reach for the <b>quadratic formula</b>?", correct: "When the trinomial cannot be factorised", wrongs: ["For every quadratic — factorising is never allowed", "Only when the equation has fractions", "Only when a = 1"], ans: "Try to factorise first. If it won't factorise (or the question says 'correct to two decimals'), use the formula. Completing the square only if the question asks for it." },
      { q: "The question says 'give your answers correct to TWO DECIMALS'. What is that hinting?", correct: "The trinomial probably won't factorise — use the quadratic formula", wrongs: ["The answers must be whole numbers", "You must complete the square", "You must round every step"], ans: "Decimal answers signal irrational roots — the formula (or EQN mode) is the tool. Round only the FINAL answers, with a decimal comma." },
    ];
    const it = pick(items);
    return mc(FOR, it.q, it.correct, it.wrongs,
      { hint: "Factorise if you can; formula when you can't (or when decimals are asked).", answerLabel: it.ans });
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
        answerLabel: "x = (−b ± √(b² − 4ac)) / 2a — the whole top is divided by 2a, and it's minus 4ac under the root." });
  },

  /* what must be written down */
  showSteps: () => {
    const items = [
      { q: "Using the quadratic formula, which TWO lines must always be shown?", correct: "The formula itself, then the substitution of a, b and c", wrongs: ["Only the final answers", "The factorising attempt and the answer", "The formula only — substitution is optional"], ans: "Always: write the formula, then show the substitution line with a, b and c in brackets — THEN the answers (calculator allowed for the values)." },
      ynQ(FOR,
        "You may use EQN mode on the calculator to get the values — as long as the formula and substitution are written down. True?",
        true,
        { hint: "Marks are for the working; the calculator just checks the arithmetic.",
          answerLabel: "True — write formula + substitution for the marks, then let EQN mode confirm X₁ and X₂." }),
    ];
    const it = pick(items);
    return it.type ? it : mc(FOR, it.q, it.correct, it.wrongs,
      { hint: "Formula line + substitution line, every time.", answerLabel: it.ans });
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
        answerLabel: `b and c BOTH carry their minus signs: b = −${C(bb)}, c = −${C(cc)}. (Typing c = ${C(cc)} into the calculator solves a different equation!)` });
  },

  /* rounding convention */
  rounding: () => {
    const items = [
      { q: "The formula gives x = 1 ± √2. The question wants decimals. How do you write the answers?", correct: "x ≈ 2,41 or x ≈ −0,41 — two decimals, decimal comma", wrongs: ["x ≈ 2.41 or x ≈ −0.41 — decimal point", "x ≈ 2,4 or x ≈ −0,4 — one decimal", "Leave them as 1 ± √2 always"], ans: "Round FINAL answers to two decimals with the decimal comma (SA style): 2,41 and −0,41. Keep the surd form only if the question asks for it." },
      ynQ(FOR,
        "You should round every in-between step to two decimals as you go. True?",
        false,
        { hint: "Early rounding snowballs.",
          answerLabel: "False — round only at the END. Rounding along the way builds up error; carry the exact values (or full calculator display) until the final line." }),
    ];
    const it = pick(items);
    return it.type ? it : mc(FOR, it.q, it.correct, it.wrongs,
      { hint: "Two decimals, decimal comma, final answers only.", answerLabel: it.ans });
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
        answerLabel: `Roots −${C(m)} and ${C(n)} → factors (x + ${C(m)})(x − ${C(n)}). The constant is the product of the FACTOR constants: (${C(m)})(−${C(n)}) = ${C(cVal)}. (And b = ${C(bVal)}, the sum of roots with opposite sign.)` });
  },

  /* simultaneous: who becomes the subject */
  simulSubject: () => {
    const items = [
      { q: "Simultaneous equations (substitution method). Which equation do you make a variable the subject of?", correct: "The simpler one — usually the LINEAR equation", wrongs: ["The quadratic one — it has more information", "Always the first one written", "Either — it makes no difference to the work"], ans: "Rearrange the LINEAR equation (least work, no squares), then substitute that expression into the other equation." },
      { q: "From <b>2x − y = 9</b>, the tidy subject to take is…", correct: "y = 2x − 9", wrongs: ["x = (9 + y)/2 — always take x", "y = 9 − 2x", "2x = y + 9 is already finished"], ans: "y = 2x − 9 (watch the signs as it crosses). Substituting this into the other equation leaves one variable." },
    ];
    const it = pick(items);
    return mc(SIM, it.q, it.correct, it.wrongs,
      { hint: "Pick the easy (linear) equation and make one variable the subject.", answerLabel: it.ans });
  },

  /* what you get and how to finish */
  simulFinish: () => {
    const items = [
      { q: "Linear + quadratic simultaneous equations: how many solution PAIRS can there be?", correct: "Up to two — and each answer must be paired with its partner value", wrongs: ["Exactly one, always", "Up to four", "None — a line and a parabola can't be solved together"], ans: "Substituting the line into the quadratic gives a quadratic → up to two x-values, each with its own y. Write each as a coordinate pair (x ; y)." },
      { q: "You solved x = 3. How do you find the matching y?", correct: "Substitute x = 3 back into the SUBJECT expression (the linear equation)", wrongs: ["y is always 0", "Substitute into the discriminant", "Guess and check"], ans: "Back-substitute into the linear equation (the easy one): e.g. y = 2(3) − 9 = −3, giving the pair (3 ; −3)." },
      ynQ(SIM,
        "Final answers to simultaneous equations should be written as coordinate pairs, e.g. (3 ; −3). True?",
        true,
        { hint: "Each x belongs to a specific y.",
          answerLabel: "True — each solution is a PAIR that works in both equations, so write them together: (3 ; −3)." }),
    ];
    const it = pick(items);
    return it.type ? it : mc(SIM, it.q, it.correct, it.wrongs,
      { hint: "Substitute, solve the quadratic, back-substitute, pair up.", answerLabel: it.ans });
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
