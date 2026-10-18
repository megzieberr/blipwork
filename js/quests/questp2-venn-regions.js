/* ============================================================
   PROBABILITY QUEST 2 · Venn diagrams — regions   ★ DIAGRAM
   The notation (∩, ∪, complement) and the four regions of a two-
   circle Venn. Every diagram comes from the to-scale Venn engine;
   "tap the region" and "what is shaded?" questions read it directly.
   ============================================================ */
import { mc } from "./_shared.js";
import { pick } from "../ui.js";
import { frac } from "../problib.js";
import { L } from "../lang.js";

const NOTE = "vennNotation";

/* a plain two-circle Venn spec (names only) */
const vAB = (extra = {}) => ({ type: "venn", mode: "two", A: L("A", "A"), B: L("B", "B"), s: "S", ...extra });

const SKILLS = {
  symbolAnd: () => mc(NOTE,
    L("On a Venn diagram, the symbol <b>∩</b> (the overlap of the circles) is read as…", "Op 'n Venn-diagram word die simbool <b>∩</b> (die oorvleueling van die sirkels) gelees as…"),
    L("and", "en"), [L("or", "of"), L("not", "nie"), L("equals", "gelyk aan")],
    { graph: vAB({ shade: ["inter"] }),
      hint: L("It's the region that is in BOTH circles at once.", "Dit is die gebied wat in ALBEI sirkels tegelyk is."),
      answerLabel: L("∩ means “and” — the outcomes in A and B at the same time.", "∩ beteken “en”: die uitkomste in A en B tegelyk.") }),

  symbolOr: () => mc(NOTE,
    L("The symbol <b>∪</b> (everything in either circle) is read as…", "Die simbool <b>∪</b> (alles in enige van die sirkels) word gelees as…"),
    L("or", "of"), [L("and", "en"), L("not", "nie"), L("minus", "minus")],
    { graph: vAB({ shade: [L("onlyA", "onlyA"), "inter", L("onlyB", "onlyB")] }),
      hint: L("It's everything in A together with everything in B.", "Dit is alles in A saam met alles in B."),
      answerLabel: L("∪ means “or” — everything in A or B (or both).", "∪ beteken “of”: alles in A of B (of albei).") }),

  complementMeaning: () => mc(NOTE,
    L("What does <b>A′</b> (“A complement”) mean?", "Wat beteken <b>A′</b> (“die komplement van A”)?"),
    L("everything that is not in A", "alles wat nie in A is nie"),
    [L("everything in both A and B", "alles in sowel A as B"), L("everything in A", "alles in A"), L("the overlap of A and B", "die oorvleueling van A en B")],
    { graph: vAB({ shade: ["notA"] }),
      hint: L("The little dash means “not”.", "Die strepie beteken “nie”."),
      answerLabel: L("A′ = not A = everything outside circle A.", "A′ = nie A = alles buite sirkel A.") }),

  tapIntersection: () => ({
    type: "tap", concept: NOTE,
    prompt: L("Tap the region that represents <b>A ∩ B</b> (A and B).", "Klik op die gebied wat <b>A ∩ B</b> (A en B) voorstel."),
    graph: vAB({ tap: { correctId: "inter" } }),
    tap: { correctId: "inter", targets: [L("onlyA", "onlyA"), "inter", L("onlyB", "onlyB"), "outside"] },
    tapHint: L("“A and B” is where the two circles overlap.", "“A en B” is waar die twee sirkels oorvleuel."),
    hint: L("Look for the lens-shaped overlap in the middle.", "Soek die lensvormige oorvleueling in die middel."),
    answerLabel: L("A ∩ B is the overlap of the two circles.", "A ∩ B is die oorvleueling van die twee sirkels."),
  }),

  tapOnlyRegion: () => {
    const which = pick([[L("onlyA", "onlyA"), L("A", "A"), L("B", "B")], [L("onlyB", "onlyB"), L("B", "B"), L("A", "A")]]);
    return {
      type: "tap", concept: NOTE,
      prompt: L(`Tap the region that is in <b>${which[1]} but not ${which[2]}</b>.`, `Klik op die gebied wat in <b>${which[1]} maar nie in ${which[2]} nie</b> is.`),
      graph: vAB({ tap: { correctId: which[0] } }),
      tap: { correctId: which[0], targets: [L("onlyA", "onlyA"), "inter", L("onlyB", "onlyB"), "outside"] },
      tapHint: L(`That is the part of circle ${which[1]} that does NOT overlap ${which[2]}.`, `Dit is die deel van sirkel ${which[1]} wat NIE met ${which[2]} oorvleuel nie.`),
      hint: L("Avoid the overlap — you want one circle only.", "Vermy die oorvleueling: jy wil net een sirkel hê."),
      answerLabel: L(`“Only ${which[1]}” is the part of ${which[1]} outside the overlap.`, `“Slegs ${which[1]}” is die deel van ${which[1]} buite die oorvleueling.`),
    };
  },

  tapNeither: () => ({
    type: "tap", concept: NOTE,
    prompt: L("Tap the region for <b>(A ∪ B)′</b> — outcomes in <b>neither</b> A nor B.", "Klik op die gebied vir <b>(A ∪ B)′</b>: uitkomste in <b>nóg</b> A nóg B."),
    graph: vAB({ tap: { correctId: "outside" } }),
    tap: { correctId: "outside", targets: [L("onlyA", "onlyA"), "inter", L("onlyB", "onlyB"), "outside"] },
    tapHint: L("Inside the rectangle, but outside both circles.", "Binne die reghoek, maar buite albei sirkels."),
    hint: L("“Neither” lives in the rectangle, outside every circle.", "“Geen van albei” woon in die reghoek, buite elke sirkel."),
    answerLabel: L("Neither A nor B = inside S but outside both circles.", "Nóg A nóg B = binne S maar buite albei sirkels."),
  }),

  shadedMeaning: () => {
    const cases = [
      { shade: ["inter"], correct: L("A ∩ B  (A and B)", "A ∩ B  (A en B)"), wrongs: [L("A ∪ B  (A or B)", "A ∪ B  (A of B)"), L("A′  (not A)", "A′  (nie A)"), L("neither A nor B", "nóg A nóg B")] },
      { shade: [L("onlyA", "onlyA"), "inter", L("onlyB", "onlyB")], correct: L("A ∪ B  (A or B)", "A ∪ B  (A of B)"), wrongs: [L("A ∩ B  (A and B)", "A ∩ B  (A en B)"), L("A′  (not A)", "A′  (nie A)"), L("neither A nor B", "nóg A nóg B")] },
      { shade: ["notA"], correct: L("A′  (not A)", "A′  (nie A)"), wrongs: [L("A  (all of circle A)", "A  (die hele sirkel A)"), L("A ∩ B  (A and B)", "A ∩ B  (A en B)"), L("B′  (not B)", "B′  (nie B)")] },
      { shade: ["outside"], correct: L("(A ∪ B)′  (neither)", "(A ∪ B)′  (geen van albei)"), wrongs: [L("A ∪ B  (A or B)", "A ∪ B  (A of B)"), L("A ∩ B  (A and B)", "A ∩ B  (A en B)"), L("A′  (not A)", "A′  (nie A)")] },
    ];
    const c = pick(cases);
    return mc(NOTE,
      L("Which set does the <b>shaded</b> region represent?", "Watter versameling stel die <b>gearseerde</b> gebied voor?"),
      c.correct, c.wrongs,
      { graph: vAB({ shade: c.shade }),
        hint: L("Name exactly the part that is filled in.", "Noem presies die deel wat ingekleur is."),
        answerLabel: L(`The shaded region is ${c.correct}.`, `Die gearseerde gebied is ${c.correct}.`) });
  },

  complementSum: () => mc(NOTE,
    L("For any event A and its complement A′, what is <b>P(A) + P(A′)</b>?", "Vir enige gebeurtenis A en sy komplement A′, wat is <b>P(A) + P(A′)</b>?"),
    "1", ["0", "0,5", "2"],
    { hint: L("A and A′ together fill the whole sample space.", "A en A′ vul saam die hele uitkomsruimte."),
      answerLabel: L("P(A) + P(A′) = 1 — together they cover everything.", "P(A) + P(A′) = 1: saam dek hulle alles.") }),

  vowelView: () => {
    const word = pick([L("FORMULA", "FORMULA"), L("NUMBERS", "NUMBERS"), L("TRIANGLE", "TRIANGLE"), L("DIAMETER", "DIAMETER")]);
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
      L(`One card of the word <b>${word}</b> is drawn at random. Using the diagram, write <b>P(vowel)</b> as a fraction in simplest form.`, `Een kaart van die woord <b>${word}</b> word lukraak getrek. Gebruik die diagram en skryf <b>P(klinker)</b> as 'n breuk in eenvoudigste vorm.`),
      f.str, wrongs,
      { graph: { type: "venn", mode: "one", A: "vowel", s: `n(S) = ${letters.length}`,
                 regions: { inside: vowels.join("  "), out: cons.join("  ") } },
        hint: L("Count the vowels inside the circle over the total number of letters.", "Tel die klinkers binne die sirkel, oor die totale aantal letters."),
        answerLabel: L(`${vowels.length} vowels out of ${letters.length} letters → ${vowels.length}/${letters.length} = ${f.str}`, `${vowels.length} klinkers uit ${letters.length} letters → ${vowels.length}/${letters.length} = ${f.str}`),
        solution: [{ s: L(`vowels = {${vowels.join("; ")}} → ${vowels.length}`, `klinkers = {${vowels.join("; ")}} → ${vowels.length}`) }, { s: L(`P = ${vowels.length}/${letters.length} = ${f.str}`, `P = ${vowels.length}/${letters.length} = ${f.str}`) }] });
  },
};

export const questP2 = {
  id: "p2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id === "vowelView" ? "probBasics" : NOTE, gen })),
};
