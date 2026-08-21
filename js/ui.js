/* Tiny DOM helpers shared across the app. */
import { rng } from "./rng.js";

export function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}
export function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }
export function mount(parent, ...kids) { kids.forEach(k => k && parent.appendChild(k)); return parent; }

/* Fisher–Yates shuffle (returns a new array). Routed through rng() (js/rng.js)
   — a dice round installs a seeded rng for the duration of one gen() call, so
   option order regenerates identically on resume. Static play is unaffected
   (rng() defaults to Math.random). */
export function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
export function randInt(lo, hi) { return lo + Math.floor(rng() * (hi - lo + 1)); }
export function pick(arr) { return arr[Math.floor(rng() * arr.length)]; }

/* Small toast for surfacing shop/equip results (and their errors) —
   never fail silently on a buy/equip/rename. Stacks; auto-dismisses. */
let toastHost = null;
export function showToast(message, kind = "info") {
  if (!toastHost) {
    toastHost = el("div", "toast-host");
    document.body.appendChild(toastHost);
  }
  const t = el("div", "toast" + (kind === "error" ? " err" : kind === "good" ? " good" : ""), message);
  toastHost.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 300);
  }, 2600);
}
