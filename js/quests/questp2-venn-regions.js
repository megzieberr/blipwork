/* ============================================================
   PROBABILITY QUEST 2 · Venn diagrams — regions   ★ DIAGRAM
   The notation (∩, ∪, complement) and the four regions of a two-
   circle Venn. Every diagram comes from the to-scale Venn engine;
   "tap the region" and "what is shaded?" questions read it directly.
   ============================================================ */
import { mc } from "./_shared.js";
import { pick } from "../ui.js";
import { frac } from "../problib.js";

const NOTE = "vennNotation";

/* a plain two-circle Venn spec (names only) */
const vAB = (extra = {}) => ({ type: "venn", mode: "two", A: "A", B: "B", s: "S", ...extra });

const SKILLS = {
  symbolAnd: () => mc(NOTE,
    "On a Venn diagram, the symbol <b>∩</b> (the overlap of the circles) is read as…",
    "and", ["or", "not", "equals"],
    { graph: vAB({ shade: ["inter"] }),
      hint: "It's the region that is in BOTH circles at once.",
      answerLabel: "∩ means “and” — the outcomes in A and B at the same time." }),

  symbolOr: () => mc(NOTE,
    "The symbol <b>∪</b> (everything in either circle) is read as…",
    "or", ["and", "not", "minus"],
    { graph: vAB({ shade: ["onlyA", "inter", "onlyB"] }),
      hint: "It's everything in A together with everything in B.",
      answerLabel: "∪ means “or” — everything in A or B (or both)." }),

  complementMeaning: () => mc(NOTE,
    "What does <b>A′</b> (“A complement”) mean?",
    "everything that is not in A",
    ["everything in both A and B", "everything in A", "the overlap of A and B"],
    { graph: vAB({ shade: ["notA"] }),
      hint: "The little dash means “not”.",
      answerLabel: "A′ = not A = everything outside circle A." }),

  tapIntersection: () => ({
    type: "tap", concept: NOTE,
    prompt: "Tap the region that represents <b>A ∩ B</b> (A and B).",
    graph: vAB({ tap: { correctId: "inter" } }),
    tap: { correctId: "inter", targets: ["onlyA", "inter", "onlyB", "outside"] },
    tapHint: "“A and B” is where the two circles overlap.",
    hint: "Look for the lens-shaped overlap in the middle.",
    answerLabel: "A ∩ B is the overlap of the two circles.",
  }),

  tapOnlyRegion: () => {
    const which = pick([["onlyA", "A", "B"], ["onlyB", "B", "A"]]);
    return {
      type: "tap", concept: NOTE,
      prompt: `Tap the region that is in <b>${which[1]} but not ${which[2]}</b>.`,
      graph: vAB({ tap: { correctId: which[0] } }),
      tap: { correctId: which[0], targets: ["onlyA", "inter", "onlyB", "outside"] },
      tapHint: `That is the part of circle ${which[1]} that does NOT overlap ${which[2]}.`,
      hint: "Avoid the overlap — you want one circle only.",
      answerLabel: `“Only ${which[1]}” is the part of ${which[1]} outside the overlap.`,
    };
  },

  tapNeither: () => ({
    type: "tap", concept: NOTE,
    prompt: "Tap the region for <b>(A ∪ B)′</b> — outcomes in <b>neither</b> A nor B.",
    graph: vAB({ tap: { correctId: "outside" } }),
    tap: { correctId: "outside", targets: ["onlyA", "inter", "onlyB", "outside"] },
    tapHint: "Inside the rectangle, but outside both circles.",
    hint: "“Neither” lives in the rectangle, outside every circle.",
    answerLabel: "Neither A nor B = inside S but outside both circles.",
  }),

  shadedMeaning: () => {
    const cases = [
      { shade: ["inter"], correct: "A ∩ B  (A and B)", wrongs: ["A ∪ B  (A or B)", "A′  (not A)", "neither A nor B"] },
      { shade: ["onlyA", "inter", "onlyB"], correct: "A ∪ B  (A or B)", wrongs: ["A ∩ B  (A and B)", "A′  (not A)", "neither A nor B"] },
      { shade: ["notA"], correct: "A′  (not A)", wrongs: ["A  (only A)", "A ∩ B  (A and B)", "B′  (not B)"] },
      { shade: ["outside"], correct: "(A ∪ B)′  (neither)", wrongs: ["A ∪ B  (A or B)", "A ∩ B  (A and B)", "A′  (not A)"] },
    ];
    const c = pick(cases);
    return mc(NOTE,
      "Which set does the <b>shaded</b> region represent?",
      c.correct, c.wrongs,
      { graph: vAB({ shade: c.shade }),
        hint: "Name exactly the part that is filled in.",
        answerLabel: `The shaded region is ${c.correct}.` });
  },

  complementSum: () => mc(NOTE,
    "For any event A and its complement A′, what is <b>P(A) + P(A′)</b>?",
    "1", ["0", "0,5", "2"],
    { hint: "A and A′ together fill the whole sample space.",
      answerLabel: "P(A) + P(A′) = 1 — together they cover everything." }),

  vowelView: () => {
    const word = pick(["FORMULA", "NUMBERS", "TRIANGLE", "DIAMETER"]);
    const letters = word.split("");
    const vowels = letters.filter(l => "AEIOU".includes(l));
    const cons = letters.filter(l => !"AEIOU".includes(l));
    const f = frac(vowels.length, letters.length);
    // decoys are numerically filtered so none can ever equal the answer
    const cands = [
      frac(cons.length, letters.length),                                          // counted the consonants
      { str: `${letters.length}/${vowels.length}`, val: letters.length / vowels.length }, // inverted
      frac(vowels.length, letters.length - 1),                                    // miscounted the total
      frac(vowels.length - 1, letters.length),                                    // missed a vowel
    ];
    const seen = new Set([f.str]); const wrongs = [];
    for (const c of cands) {
      if (Math.abs(c.val - f.val) < 1e-9 || seen.has(c.str)) continue;
      seen.add(c.str); wrongs.push(c.str);
      if (wrongs.length === 3) break;
    }
    return mc("probBasics",
      `One card of the word <b>${word}</b> is drawn at random. Using the diagram, write <b>P(vowel)</b> as a fraction in simplest form.`,
      f.str, wrongs,
      { graph: { type: "venn", mode: "one", A: "vowel", s: `n(S) = ${letters.length}`,
                 regions: { inside: vowels.join("  "), out: cons.join("  ") } },
        hint: "Count the vowels inside the circle over the total number of letters.",
        answerLabel: `${vowels.length} vowels out of ${letters.length} letters → ${vowels.length}/${letters.length} = ${f.str}`,
        solution: [{ s: `vowels = {${vowels.join("; ")}} → ${vowels.length}` }, { s: `P = ${vowels.length}/${letters.length} = ${f.str}` }] });
  },
};

export const questP2 = {
  id: "p2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id === "vowelView" ? "probBasics" : NOTE, gen })),
};
