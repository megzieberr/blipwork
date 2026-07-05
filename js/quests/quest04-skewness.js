/* ============================================================
   QUEST 4 · Skewness & shape
   Identify normal vs skewed left/right off a box plot, histogram
   or ogive; the mean-vs-median rule; "the skew is named for the
   tail". The shapes are GENERATED with a chosen skew, so the
   correct answer always matches the picture.
   ============================================================ */
import { randInt, pick } from "../ui.js";
import { mc } from "./_shared.js";

const SKEW = {
  right: "Skewed to the right (positively skewed)",
  left: "Skewed to the left (negatively skewed)",
  normal: "Symmetric (normal)",
};
const others = skew => Object.keys(SKEW).filter(k => k !== skew).map(k => SKEW[k]);
const boxAxis = max => { const step = 10, m = Math.ceil((max + 6) / step) * step; return { min: 0, max: m, step }; };

/* a five-number summary with a deliberate skew (stays positive) */
function skewBox(skew) {
  const med = randInt(52, 62);
  if (skew === "normal") { const d = randInt(11, 15), w = randInt(11, 15); return { min: med - d - w, q1: med - d, med, q3: med + d, max: med + d + w }; }
  // the short whisker stays ≥ 6 units so adjacent value labels never touch on the drawn scale
  if (skew === "right") { const dl = randInt(6, 9), dr = randInt(15, 20), wl = randInt(6, 9), wr = randInt(16, 22); return { min: med - dl - wl, q1: med - dl, med, q3: med + dr, max: med + dr + wr }; }
  const dr = randInt(6, 9), dl = randInt(15, 20), wr = randInt(6, 9), wl = randInt(16, 22);
  return { min: med - dl - wl, q1: med - dl, med, q3: med + dr, max: med + dr + wr };
}

/* class frequencies with a deliberate skew (for histogram / ogive) */
function skewClasses(skew) {
  const start = pick([0, 10, 20]);
  const right = pick([[18, 11, 6, 3, 1], [15, 12, 7, 4, 2], [20, 13, 7, 3, 1]]);
  const f = skew === "right" ? right : skew === "left" ? right.slice().reverse() : pick([[2, 8, 15, 8, 2], [3, 9, 14, 9, 3], [2, 9, 16, 9, 2]]);
  return f.map((fr, i) => ({ lower: start + i * 10, upper: start + (i + 1) * 10, freq: fr }));
}

function genBoxSkew() {
  const skew = pick(["right", "left", "normal"]);
  const five = skewBox(skew);
  const sol = skew === "normal" ? "The box and whiskers are balanced about the median → symmetric."
    : `The longer half and whisker (the tail) is on the ${skew} → skewed ${skew}.`;
  return mc("skewness", "Look at the box-and-whisker plot. How is the distribution skewed?",
    SKEW[skew], others(skew),
    { graph: { type: "box", five, axis: boxAxis(five.max), showValues: true }, graphCap: "shape of the distribution",
      hint: "The skew is named for the tail — the longer whisker / bigger half.", solution: [{ s: sol }] });
}

function genHistSkew() {
  const skew = pick(["right", "left", "normal"]);
  const classes = skewClasses(skew);
  const sol = skew === "normal" ? "The bars are roughly symmetric about the centre → normal."
    : `The tall bars are on the ${skew === "right" ? "left" : "right"} and the low tail stretches ${skew} → skewed ${skew}.`;
  return mc("skewness", "Look at the histogram. How is the distribution skewed?",
    SKEW[skew], others(skew),
    { graph: { type: "hist", classes }, graphCap: "frequency", hint: "Find the long low tail — the skew is named for it.", solution: [{ s: sol }] });
}

function genOgiveSkew() {
  const skew = pick(["right", "left", "normal"]);
  const classes = skewClasses(skew);
  const sol = skew === "normal" ? "The S-curve is symmetric → normal."
    : skew === "right" ? "The curve rises steeply early then flattens at the top — the thin tail is on the right → skewed right."
      : "The curve stays flat then rises steeply at the top — the thin tail is on the left → skewed left.";
  return mc("skewness", "Look at the ogive. How is the distribution skewed?",
    SKEW[skew], others(skew),
    { graph: { type: "ogive", classes }, graphCap: "cumulative frequency", hint: "The flat end of the ogive is the tail.", solution: [{ s: sol }] });
}

function genMeanMedian() {
  const med = randInt(40, 60);
  const skew = pick(["right", "left", "normal"]);
  const m = skew === "right" ? med + randInt(3, 9) : skew === "left" ? med - randInt(3, 9) : med;
  const rel = skew === "right" ? "x̄ > median" : skew === "left" ? "x̄ < median" : "x̄ = median";
  return mc("skewness",
    `For a data set, the mean x̄ = <b>${m}</b> and the median = <b>${med}</b>. How is it skewed?`,
    SKEW[skew], others(skew),
    { hint: "Compare the mean and median — the mean is pulled toward the tail.",
      solution: [{ s: `${rel} → ${skew === "normal" ? "symmetric" : "skewed " + skew} (the mean is pulled toward the tail).` }] });
}

function genTailName() {
  const dir = pick(["right", "left"]);
  return mc("skewness",
    `Most of the data is bunched together, with a long thin <b>tail to the ${dir}</b>. How is the distribution described?`,
    SKEW[dir], others(dir),
    { hint: "The skew is named for the tail.", solution: [{ s: `The tail points ${dir} → skewed to the ${dir}.` }] });
}

function genReasonStep() {
  const skew = pick(["right", "left", "normal"]);
  const correct = skew === "right" ? "x̄ > median" : skew === "left" ? "x̄ < median" : "x̄ = median";
  const wrongs = ["x̄ > median", "x̄ < median", "x̄ = median"].filter(s => s !== correct);
  return mc("skewness",
    `Which statement is true for a distribution that is <b>${skew === "normal" ? "symmetric (normal)" : "skewed to the " + skew}</b>?`,
    correct, wrongs,
    { hint: "Skew toward the tail pulls the mean past the median.",
      solution: [{ s: `${skew === "normal" ? "Symmetric" : "Skewed " + skew}: ${correct}.` }] });
}

export const quest04 = {
  id: "q4",
  skills: [
    { id: "tailName", concept: "skewness", gen: genTailName },
    { id: "meanMedian", concept: "skewness", gen: genMeanMedian },
    { id: "boxSkew", concept: "skewness", gen: genBoxSkew },
    { id: "histSkew", concept: "skewness", gen: genHistSkew },
    { id: "ogiveSkew", concept: "skewness", gen: genOgiveSkew },
    { id: "reasonStep", concept: "skewness", gen: genReasonStep },
  ],
};
