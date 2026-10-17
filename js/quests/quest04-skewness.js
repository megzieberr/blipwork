/* ============================================================
   QUEST 4 · Skewness & shape
   Identify normal vs skewed left/right off a box plot, histogram
   or ogive; the mean-vs-median rule; "the skew is named for the
   tail". The shapes are GENERATED with a chosen skew, so the
   correct answer always matches the picture.
   ============================================================ */
import { randInt, pick } from "../ui.js";
import { mc } from "./_shared.js";
import { L } from "../lang.js";

const SKEW = {
  toRight: L("Skewed to the right (positively skewed)", "Skeef na regs (positief skeef)"),
  toLeft: L("Skewed to the left (negatively skewed)", "Skeef na links (negatief skeef)"),
  noSkew: L("Symmetric (normal)", "Simmetries (normaal)"),
};
/* skew / dir are DATA ids (toRight / toLeft / noSkew); the learner reads DIR[...] (T93B split) */
const DIR = { toRight: L("right", "regs"), toLeft: L("left", "links") };
const others = skew => Object.keys(SKEW).filter(k => k !== skew).map(k => SKEW[k]);
const boxAxis = max => { const step = 10, m = Math.ceil((max + 6) / step) * step; return { min: 0, max: m, step }; };

/* a five-number summary with a deliberate skew (stays positive) */
function skewBox(skew) {
  const med = randInt(52, 62);
  if (skew === "noSkew") { const d = randInt(11, 15), w = randInt(11, 15); return { min: med - d - w, q1: med - d, med, q3: med + d, max: med + d + w }; }
  // the short whisker stays ≥ 6 units so adjacent value labels never touch on the drawn scale
  if (skew === "toRight") { const dl = randInt(6, 9), dr = randInt(15, 20), wl = randInt(6, 9), wr = randInt(16, 22); return { min: med - dl - wl, q1: med - dl, med, q3: med + dr, max: med + dr + wr }; }
  const dr = randInt(6, 9), dl = randInt(15, 20), wr = randInt(6, 9), wl = randInt(16, 22);
  return { min: med - dl - wl, q1: med - dl, med, q3: med + dr, max: med + dr + wr };
}

/* class frequencies with a deliberate skew (for histogram / ogive) */
function skewClasses(skew) {
  const start = pick([0, 10, 20]);
  const right = pick([[18, 11, 6, 3, 1], [15, 12, 7, 4, 2], [20, 13, 7, 3, 1]]);
  const f = skew === "toRight" ? right : skew === "toLeft" ? right.slice().reverse() : pick([[2, 8, 15, 8, 2], [3, 9, 14, 9, 3], [2, 9, 16, 9, 2]]);
  return f.map((fr, i) => ({ lower: start + i * 10, upper: start + (i + 1) * 10, freq: fr }));
}

function genBoxSkew() {
  const skew = pick(["toRight", "toLeft", "noSkew"]);
  const five = skewBox(skew);
  const sol = skew === "noSkew" ? L("The box and whiskers are balanced about the median → symmetric.", "Die mond en snorre is gebalanseer om die mediaan → simmetries.")
    : L(`The longer half and whisker (the tail) is on the ${DIR[skew]} → skewed ${DIR[skew]}.`, `Die langer helfte en snor (die stert) lê ${DIR[skew]} → skeef na ${DIR[skew]}.`);
  return mc("skewness", L("Look at the box-and-whisker plot. How is the distribution skewed?", "Kyk na die mond-en-snor-diagram. Hoe is die verspreiding skeef?"),
    SKEW[skew], others(skew),
    { graph: { type: "box", five, axis: boxAxis(five.max), showValues: true }, graphCap: L("shape of the distribution", "vorm van die verspreiding"),
      hint: L("The skew is named for the tail — the longer whisker / bigger half.", "Die skeefheid word na die stert genoem: die langer snor / groter helfte."), solution: [{ s: sol }] });
}

function genHistSkew() {
  const skew = pick(["toRight", "toLeft", "noSkew"]);
  const classes = skewClasses(skew);
  const sol = skew === "noSkew" ? L("The bars are roughly symmetric about the centre → normal.", "Die stawe is omtrent simmetries om die middel → normaal.")
    : L(`The tall bars are on the ${skew === "toRight" ? "left" : "right"} and the low tail stretches ${DIR[skew]} → skewed ${DIR[skew]}.`, `Die hoë stawe is ${skew === "toRight" ? "links" : "regs"} en die lae stert strek na ${DIR[skew]} → skeef na ${DIR[skew]}.`);
  return mc("skewness", L("Look at the histogram. How is the distribution skewed?", "Kyk na die histogram. Hoe is die verspreiding skeef?"),
    SKEW[skew], others(skew),
    { graph: { type: "hist", classes }, graphCap: L("frequency", "frekwensie"), hint: L("Find the long low tail — the skew is named for it.", "Vind die lang, lae stert: die skeefheid word daarna genoem."), solution: [{ s: sol }] });
}

function genOgiveSkew() {
  const skew = pick(["toRight", "toLeft", "noSkew"]);
  const classes = skewClasses(skew);
  const sol = skew === "noSkew" ? L("The S-curve is symmetric → normal.", "Die S-kurwe is simmetries → normaal.")
    : skew === "toRight" ? L("The curve rises steeply early then flattens at the top — the thin tail is on the right → skewed right.", "Die kurwe styg vroeg steil en word dan bo plat: die dun stert is regs → skeef na regs.")
      : L("The curve stays flat then rises steeply at the top — the thin tail is on the left → skewed left.", "Die kurwe bly plat en styg dan bo steil: die dun stert is links → skeef na links.");
  return mc("skewness", L("Look at the ogive. How is the distribution skewed?", "Kyk na die ogief. Hoe is die verspreiding skeef?"),
    SKEW[skew], others(skew),
    { graph: { type: "ogive", classes }, graphCap: L("cumulative frequency", "kumulatiewe frekwensie"), hint: L("The flat end of the ogive is the tail.", "Die plat deel van die ogief is die stert."), solution: [{ s: sol }] });
}

function genMeanMedian() {
  const med = randInt(40, 60);
  const skew = pick(["toRight", "toLeft", "noSkew"]);
  const m = skew === "toRight" ? med + randInt(3, 9) : skew === "toLeft" ? med - randInt(3, 9) : med;
  const rel = skew === "toRight" ? L("x̄ > median", "x̄ > mediaan") : skew === "toLeft" ? L("x̄ < median", "x̄ < mediaan") : L("x̄ = median", "x̄ = mediaan");
  return mc("skewness",
    L(`For a data set, the mean x̄ = <b>${m}</b> and the median = <b>${med}</b>. How is it skewed?`, `Vir 'n datastel is die gemiddelde x̄ = <b>${m}</b> en die mediaan = <b>${med}</b>. Hoe is dit skeef?`),
    SKEW[skew], others(skew),
    { hint: L("Compare the mean and median — the mean is pulled toward the tail.", "Vergelyk die gemiddelde en mediaan: die gemiddelde word na die stert getrek."),
      solution: [{ s: L(`${rel} → ${skew === "noSkew" ? "symmetric" : "skewed " + DIR[skew]} (the mean is pulled toward the tail).`, `${rel} → ${skew === "noSkew" ? "simmetries" : "skeef na " + DIR[skew]} (die gemiddelde word na die stert getrek).`) }] });
}

function genTailName() {
  const dir = pick(["toRight", "toLeft"]);
  return mc("skewness",
    L(`Most of the data is bunched together, with a long thin <b>tail to the ${DIR[dir]}</b>. How is the distribution described?`, `Die meeste van die data lê dig bymekaar, met 'n lang, dun <b>stert na ${DIR[dir]}</b>. Hoe beskryf jy die verspreiding?`),
    SKEW[dir], others(dir),
    { hint: L("The skew is named for the tail.", "Die skeefheid word na die stert genoem."), solution: [{ s: L(`The tail points ${DIR[dir]} → skewed to the ${DIR[dir]}.`, `Die stert wys na ${DIR[dir]} → skeef na ${DIR[dir]}.`) }] });
}

function genReasonStep() {
  const skew = pick(["toRight", "toLeft", "noSkew"]);
  const correct = skew === "toRight" ? L("x̄ > median", "x̄ > mediaan") : skew === "toLeft" ? L("x̄ < median", "x̄ < mediaan") : L("x̄ = median", "x̄ = mediaan");
  const wrongs = [L("x̄ > median", "x̄ > mediaan"), L("x̄ < median", "x̄ < mediaan"), L("x̄ = median", "x̄ = mediaan")].filter(s => s !== correct);
  return mc("skewness",
    L(`Which statement is true for a distribution that is <b>${skew === "noSkew" ? "symmetric (normal)" : "skewed to the " + DIR[skew]}</b>?`, `Watter stelling is waar vir 'n verspreiding wat <b>${skew === "noSkew" ? "simmetries (normaal)" : "skeef na " + DIR[skew]}</b> is?`),
    correct, wrongs,
    { hint: L("Skew toward the tail pulls the mean past the median.", "Skeefheid na die stert trek die gemiddelde verby die mediaan."),
      solution: [{ s: `${skew === "noSkew" ? L("Symmetric", "Simmetries") : L(`Skewed ${DIR[skew]}`, `Skeef na ${DIR[skew]}`)}: ${correct}.` }] });
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
