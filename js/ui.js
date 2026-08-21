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

/* The mean symbol x̄, rendered so the bar sits centred over the x (playtest
   fix, 2026-08-21 — Megan: "the line above the x is a bit skew, it is not
   directly above the x"). The app's fonts (Sora/JetBrains Mono) don't
   reliably stack the combining macron (U+0304) over the x it's meant to sit
   on, so it lands offset. js/calculator.js already solved exactly this for
   the calculator's LCD (see its MEAN_GLYPH/.lcd-ov: a CSS border-top on an
   inline-block, not the combining character) — this is the same recipe,
   reused for every OTHER place the symbol renders (question text, hints,
   solutions, concept cards): a small string transform applied at the DOM-
   insertion boundary, so it's automatic for any question — dice or static,
   present or future — without hunting through every quest file that writes
   the literal "x̄" characters. Call on any HTML string just before it's
   assigned to innerHTML/passed to el(); safe to call on strings that don't
   contain the symbol (no-op) or are null/undefined (passed through). */
export function xbarHtml(s) {
  return s == null ? s : String(s).replace(/x̄/g, '<span class="xbar">x</span>');
}

/* Show/hide toggle for a <input type=password> (playtest fix, 2026-08-21 —
   Megan: "I typed my og password in incorrectly the first time when I set
   it and I had no way to double check it"). Wraps `input` in a small
   position:relative field so a 👁 button can sit INSIDE the existing box
   (the input's own padding-right makes room, so the input's width/position
   on the page is unchanged — nothing shifts). Call this BEFORE the input is
   attached (or right after), then append the RETURNED wrapper wherever the
   input itself would have been appended. Never autofills or submits: the
   button is type="button", and toggling `input.type` is the standard
   reveal-password pattern — it doesn't touch autocomplete/autofill. */
export function pwToggle(input) {
  const wrap = el("div", "pw-field");
  const parent = input.parentNode;
  if (parent) parent.replaceChild(wrap, input);
  wrap.appendChild(input);
  const btn = el("button", "pw-eye", "👁");
  btn.type = "button";
  btn.setAttribute("aria-label", "Show password");
  btn.addEventListener("click", () => {
    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    btn.classList.toggle("is-on", !showing);
    btn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  });
  wrap.appendChild(btn);
  return wrap;
}

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
