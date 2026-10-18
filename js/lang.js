/* ============================================================
   LANGUAGE: the device's EN/AF choice for the MATHS content
   (AFRIKAANS-PLAN.md, QUEUE.md row S1, 2026-10-16)
   ------------------------------------------------------------
   One localStorage key, "mhq.lang": "en" (the default) or "af".
   No database column, no migration: it is a per-device setting.

   The app itself stays English (her ruling 2026-10-15): buttons,
   Blip, the shop, login all ignore this. Only maths content reads
   it, one string at a time, through

       L("English", "Afrikaans")

   which hands back the English side unless the device says "af"
   AND an Afrikaans twin exists. With the device on "en" every
   screen is therefore byte-identical to the English-only app.

   The header button is HIDDEN behind SHOW_TOGGLE = false until the
   whole QUEUE.md translation is done and she says "show it" (her
   ruling 2026-10-16). Until then the address bar is the switch:

       ?lang=af   sets THIS device to Afrikaans and remembers it
       ?lang=en   flips it back

   That is how she tests on her phone. Read order on load: the URL,
   then localStorage, then "en".

   Core module: js/app.js imports it at startup so the URL override
   has run before the first screen draws. Lazy modules may import
   it; it imports nothing. The pattern is Circle Quest's js/i18n.js
   (one key, getLang / setLang / onLangChange) with Fun Functions'
   try/catch around every storage call (private mode). It never
   sets document.documentElement.lang: the page is mixed (English
   UI, Afrikaans maths) on purpose.
   ============================================================ */

const KEY = "mhq.lang";
const norm = (l) => (l === "af" ? "af" : "en");
const listeners = new Set();

let LANG = (() => {
  /* admin.html is always English and never writes mhq.lang: a phone that remembers ?lang=af
     would save Afrikaans titles into assignments and push text (audit finding E, 2026-10-18). */
  try { if (/\/admin\.html$/.test(location.pathname)) return "en"; } catch { /* no location (not a page) */ }
  let fromUrl = null;
  try { fromUrl = new URLSearchParams(location.search).get("lang"); } catch { /* no location (not a page) */ }
  if (fromUrl === "en" || fromUrl === "af") {
    try { localStorage.setItem(KEY, fromUrl); } catch { /* private mode: this load only */ }
    return fromUrl;
  }
  try { return norm(localStorage.getItem(KEY)); } catch { return "en"; }
})();

/* Hidden until the translation is complete (her ruling 2026-10-16). */
export const SHOW_TOGGLE = false;

export function getLang() { return LANG; }

/* Remembers the choice on this device and tells every listener. */
export function setLang(l) {
  LANG = norm(l);
  try { localStorage.setItem(KEY, LANG); } catch { /* private mode */ }
  listeners.forEach(fn => {
    try { fn(LANG); } catch (e) { console.warn("onLangChange listener failed", e); }
  });
}

/* Returns the unsubscribe. */
export function onLangChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

/* The twin picker every translated maths string goes through. */
export function L(en, af) {
  return (LANG === "af" && typeof af === "string" && af !== "") ? af : en;
}

/* The header button. While SHOW_TOGGLE is false it draws NOTHING.
   When on: a small header button showing the OTHER language ("AF"
   while on en, "EN" while on af), in the header's own .link-btn
   style, placed before `beforeEl` when given (else at the end). */
export function mountLangToggle(hostEl, beforeEl) {
  if (!SHOW_TOGGLE || !hostEl) return null;
  const other = LANG === "af" ? "en" : "af";
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "link-btn lang-btn";
  btn.textContent = other.toUpperCase();
  btn.addEventListener("click", () => setLang(other));
  hostEl.insertBefore(btn, beforeEl && beforeEl.parentNode === hostEl ? beforeEl : null);
  return btn;
}
