/* ============================================================
   STAT LIBRARY — the maths, computed (so answer keys are never
   hand-typed and can't be wrong). Ungrouped-data conventions
   follow the CAPS rounding rule for quartile positions.
   ============================================================ */
export function sortAsc(a) { return a.slice().sort((x, y) => x - y); }
export function sum(a) { return a.reduce((s, v) => s + v, 0); }
export function mean(a) { return sum(a) / a.length; }

/* ungrouped quartile position: Q1 (n+1)/4, Q2 (n+1)/2, Q3 3(n+1)/4 */
export function quartilePos(n, which) {
  if (which === "q1") return (n + 1) / 4;
  if (which === "q2") return (n + 1) / 2;
  return 3 * (n + 1) / 4;
}

/* the quartile VALUE, applying the CAPS rounding rule:
   ,5 → average the two middle values · ,25 → round position down · ,75 → up */
export function quartileValue(sorted, which) {
  const n = sorted.length, pos = quartilePos(n, which), fl = Math.floor(pos), fr = pos - fl;
  if (fr < 1e-6) return sorted[pos - 1];
  if (Math.abs(fr - 0.5) < 1e-6) return (sorted[fl - 1] + sorted[fl]) / 2;   // middle value
  if (Math.abs(fr - 0.25) < 1e-6) return sorted[fl - 1];                      // round down → position fl
  if (Math.abs(fr - 0.75) < 1e-6) return sorted[fl];                          // round up → position fl+1
  return sorted[Math.round(pos) - 1];
}

/* Casio "exclusive" quartiles — VERIFIED on the real fx-991ZA PLUS II
   emulator: the median splits the data; for odd n the middle value is
   EXCLUDED from both halves; Q1/Q3 are the medians of the halves. This
   differs from the (n+1)/4 school method above (e.g. 1..8 → Q1 2,5 vs 2).
   Use this ONLY for the on-screen calculator, so it matches the device. */
export function quartilesExclusive(sorted) {
  const medOf = a => a.length ? (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2) : null;
  const n = sorted.length, med = medOf(sorted);
  const lower = n % 2 === 0 ? sorted.slice(0, n / 2) : sorted.slice(0, (n - 1) / 2);
  const upper = n % 2 === 0 ? sorted.slice(n / 2) : sorted.slice((n + 1) / 2);
  return { q1: medOf(lower) ?? med, med, q3: medOf(upper) ?? med };
}

export function fiveNum(sorted) {
  return {
    min: sorted[0], q1: quartileValue(sorted, "q1"), med: quartileValue(sorted, "q2"),
    q3: quartileValue(sorted, "q3"), max: sorted[sorted.length - 1],
  };
}
export function iqr(sorted) { return quartileValue(sorted, "q3") - quartileValue(sorted, "q1"); }

/* outlier fences (corrected labels: Q1−1,5·IQR is the LOWER boundary) */
export function outlierBounds(q1, q3) {
  const range = q3 - q1;
  return { iqr: range, lower: q1 - 1.5 * range, upper: q3 + 1.5 * range };
}

export function percentilePos(n, p) { return (n + 1) * p / 100; }

/* describe how a quartile position rounds, for worked solutions */
export function roundNote(pos) {
  const fr = pos - Math.floor(pos);
  if (fr < 1e-6) return `position ${comma(pos)}`;
  if (Math.abs(fr - 0.5) < 1e-6) return `${comma(pos)} → middle of the two values either side`;
  if (Math.abs(fr - 0.25) < 1e-6) return `${comma(pos)} → round down to position ${Math.floor(pos)}`;
  if (Math.abs(fr - 0.75) < 1e-6) return `${comma(pos)} → round up to position ${Math.ceil(pos)}`;
  return `position ${comma(pos)}`;
}
function comma(n) { return String(Math.round(n * 1000) / 1000).replace(".", ","); }

/* ---------- ungrouped: centre & spread ---------- */
export function mode(arr) {
  const f = {}; let best = arr[0], bestC = 0;
  arr.forEach(v => { f[v] = (f[v] || 0) + 1; if (f[v] > bestC) { bestC = f[v]; best = v; } });
  return best;
}
export function range(arr) { const s = sortAsc(arr); return s[s.length - 1] - s[0]; }
export function median(arr) { return quartileValue(sortAsc(arr), "q2"); }

/* ---------- grouped data ---------- */
export function midpoint(c) { return (c.lower + c.upper) / 2; }
export function groupedMean(classes) {
  let fx = 0, n = 0;
  classes.forEach(c => { fx += c.freq * midpoint(c); n += c.freq; });
  return { mean: fx / n, fx, n };
}
export function modalClass(classes) { return classes.reduce((a, c) => (c.freq > a.freq ? c : a), classes[0]); }
export function medianClass(classes) {
  const n = classes.reduce((s, c) => s + c.freq, 0), pos = n / 2;
  let cum = 0;
  for (const c of classes) { cum += c.freq; if (cum >= pos) return c; }
  return classes[classes.length - 1];
}
export function cumulative(classes) { let cum = 0; return classes.map(c => { cum += c.freq; return { ...c, cum }; }); }

/* ---------- standard deviation & variance (population) ---------- */
export function variance(arr) { const m = mean(arr); return arr.reduce((s, x) => s + (x - m) * (x - m), 0) / arr.length; }
export function stdDev(arr) { return Math.sqrt(variance(arr)); }
export function withinOneSD(arr) {
  const m = mean(arr), sd = stdDev(arr);
  return arr.filter(x => x >= m - sd - 1e-9 && x <= m + sd + 1e-9).length;
}
