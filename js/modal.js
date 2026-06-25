/* The "I'm lost" concept-card overlay. Re-teaches the idea, then the
   caller returns the learner to a fresh sibling question. */
import { el } from "./ui.js";
import { getConcept } from "./concepts.js";

export function openConcept(conceptId, onClose) {
  const c = getConcept(conceptId);
  if (!c) { onClose && onClose(); return; }
  const scrim = el("div", "modal-scrim");
  const modal = el("div", "modal");
  modal.innerHTML = `
    <div class="mhead"><span class="meyebrow">Quick recap</span><button class="link-btn close" aria-label="Close">✕</button></div>
    <h2>${c.title}</h2>
    <div class="concept">${c.body}</div>`;
  const btn = el("button", "btn primary big", "Got it — back to a question");
  modal.appendChild(btn);
  scrim.appendChild(modal);

  const close = () => { scrim.remove(); onClose && onClose(); };
  modal.querySelector(".close").addEventListener("click", close);
  btn.addEventListener("click", close);
  scrim.addEventListener("click", e => { if (e.target === scrim) close(); });
  document.body.appendChild(scrim);
}
