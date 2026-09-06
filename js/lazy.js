/* ============================================================
   ONE HELPER FOR EVERY LAZY IMPORT (fix day Build 6, 2026-09-06)
   ------------------------------------------------------------
   THE PROBLEM IT SOLVES. A browser REMEMBERS a failed module load. Once
   `import("…/quest01.js")` has failed (the learner's phone dropped the
   connection for a second, or a stale service worker answered nothing),
   importing that same URL again re-throws the old error WITHOUT going
   near the network. Proved headless on 2026-09-06: tapping the card a
   second time, with the connection back, failed again until the page was
   reloaded. For an app whose quests, dice pools and exam cards now arrive
   one at a time, that would mean a single dropped packet locking a
   learner out of a round for the rest of the session.

   THE FIX. The first attempt asks for the plain URL, so a normal load is
   exactly what it always was and the module is shared with anything that
   imported it statically. Only AFTER a failure does the next attempt ask
   for the same file under a fresh query string, which the browser treats
   as a URL it has never seen. Just the failed file is re-fetched: every
   module it imports itself is named by its own unchanged URL, so nothing
   is downloaded or instantiated twice.

   Callers pass an ABSOLUTE href (`new URL("./x.js", import.meta.url).href`)
   because a specifier is resolved against the file it is written in, and
   these are written here.
   ============================================================ */

/* hrefs that have failed at least once: the next attempt at one of these
   goes out under a fresh URL rather than hitting the remembered failure */
const burned = new Set();
let tick = 0;

/**
 * import() that can actually be retried.
 * @param {string} href  an absolute module URL
 * @returns {Promise<object>}  the module namespace
 */
export function lazyImport(href) {
  const spec = burned.has(href)
    ? href + (href.includes("?") ? "&" : "?") + "retry=" + (++tick)
    : href;
  return import(spec).catch(err => {
    burned.add(href);
    throw err;
  });
}
