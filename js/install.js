/* One-time "add to home screen" prompt, shown on the hub the first time a
   learner opens it on a phone. Android/Chrome fires beforeinstallprompt (we
   defer it and offer an Install button); iOS Safari needs manual Share →
   Add to Home Screen, so we show that instruction instead. */
import { el } from "./ui.js";

let deferred = null;
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferred = e; });
}
const standalone = () => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
const isiOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;

export function maybeShowInstall(host) {
  if (standalone()) return;
  try { if (localStorage.getItem("mhq.installSeen") === "1") return; } catch {}
  const phone = isiOS() || window.matchMedia("(max-width: 600px)").matches;
  if (!phone && !deferred) return;                       // on desktop, only bother if it's installable

  const card = el("div", "install-banner card");
  card.innerHTML = `
    <button class="install-x" aria-label="Dismiss">✕</button>
    <div class="install-ico">📲</div>
    <div class="install-body">
      <b>Add Blipwork to your phone</b>
      <p class="muted small">${isiOS() ? "Tap the Share button, then “Add to Home Screen”." : "Install it like an app for one-tap access."}</p>
    </div>
    <div class="install-foot"></div>`;
  const close = () => { try { localStorage.setItem("mhq.installSeen", "1"); } catch {} card.remove(); };
  card.querySelector(".install-x").addEventListener("click", close);

  if (deferred && !isiOS()) {
    const b = el("button", "btn primary small", "Install");
    b.addEventListener("click", async () => { close(); try { deferred.prompt(); await deferred.userChoice; } catch {} deferred = null; });
    card.querySelector(".install-foot").appendChild(b);
  }
  host.appendChild(card);
}
