/* Shared helpers for quest authoring: random data, MC builders, and the
   frequency-table renderer. (Quest 3 predates this and has its own copies.) */
import { randInt, pick, shuffled } from "../ui.js";
import { fmtComma } from "../check.js";
import { sortAsc, midpoint } from "../statlib.js";

export const C = v => fmtComma(v);
export const list = a => a.join("  ;  ");

/* distinct, ordered integer set */
export function dataset(n, lo, hi) { const s = new Set(); while (s.size < n) s.add(randInt(lo, hi)); return sortAsc([...s]); }
/* raw (possibly repeated) set */
export function rawset(n, lo, hi) { return Array.from({ length: n }, () => randInt(lo, hi)); }

/* 4 unique numeric MC options around a correct value */
export function mcNum(correct, decoys) {
  const seen = new Set([C(correct)]);
  const opts = [{ label: C(correct), correct: true }];
  for (const d of decoys) {
    if (!Number.isFinite(d)) continue;
    const l = C(d);
    if (!seen.has(l)) { seen.add(l); opts.push({ label: l, correct: false }); }
    if (opts.length >= 4) break;
  }
  return shuffled(opts);
}

/* generic MC question from a correct label + wrong labels.
   Wrong options are de-duplicated against the correct answer and each other,
   so an edge-case collision (e.g. a coordinate of 0) can never produce two
   identical buttons. */
export function mc(concept, prompt, correct, wrongs, opts = {}) {
  const seen = new Set([String(correct)]);
  const uniqWrong = [];
  for (const w of wrongs) { const l = String(w); if (!seen.has(l)) { seen.add(l); uniqWrong.push({ label: l, correct: false }); } }
  const options = shuffled([{ label: correct, correct: true }, ...uniqWrong]);
  return {
    type: "mc", concept, prompt, options,
    answerLabel: opts.answerLabel || correct,
    hint: opts.hint, layout: opts.layout,
    solution: opts.solution || [{ s: correct }],
    graph: opts.graph, graphs: opts.graphs, graphCap: opts.graphCap,
  };
}

/* class interval string. notation "le" → a ≤ x < b (grouped mean);
   "lt" → a < x ≤ b (ogive). < is escaped so it isn't read as a tag. */
export function classInterval(cl, notation = "le") {
  return notation === "lt"
    ? `${cl.lower} &lt; x ≤ ${cl.upper}`
    : `${cl.lower} ≤ x &lt; ${cl.upper}`;
}

/* render a frequency table; opts: {mid, cum, notation, total} */
export function freqTable(classes, opts = {}) {
  const { mid = false, cum = false, notation = "le", total = true } = opts;
  const head = `<tr><th>Interval</th><th>f</th>${mid ? "<th>x</th>" : ""}${cum ? "<th>cf</th>" : ""}</tr>`;
  let c = 0;
  const rows = classes.map(cl => {
    c += cl.freq;
    return `<tr><td>${classInterval(cl, notation)}</td><td>${cl.freq}</td>${mid ? `<td>${midpoint(cl)}</td>` : ""}${cum ? `<td>${c}</td>` : ""}</tr>`;
  }).join("");
  const n = classes.reduce((s, x) => s + x.freq, 0);
  const totalRow = total ? `<tr><td>Total</td><td>${n}</td>${mid ? "<td></td>" : ""}${cum ? "<td></td>" : ""}</tr>` : "";
  return `<table class="q-table">${head}${rows}${totalRow}</table>`;
}
