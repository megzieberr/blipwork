/* ============================================================
   📥 THE LEARNER'S INBOX  (INBOX-PLAN.md unit 3, 2026-10-04)
   ------------------------------------------------------------
   Her ask: when she answers a 💬 note (a typed reply, "bug fixed", or
   "answered elsewhere" on WhatsApp), the learner finds it in a small
   inbox on their homepage.

   WHAT THIS FILE OWNS
   · A small 📥 chip in the hub head, beside the greeting. renderHub()
     calls mountInbox() and never waits on it: the hub draws first, the
     chip fills itself in when api.inbox() answers.
   · The chip only appears when the learner has at least one ANSWERED
     note (the back end never returns an open one). A learner who never
     had a note answered never sees an empty inbox. Offline, a failed
     fetch or {ok:false}: the chip simply stays away, nothing is logged.
   · A warm dot with the count when something is unseen.
   · Tap: the app's usual bottom sheet (.modal-scrim / .modal), appended
     to <body>. That is OUTSIDE #app .view on purpose: the 💬 snapshot
     reads #app .view, and it already strips .hub-head (js/feedback.js
     CHROME_IN_VIEW), so neither the chip nor the sheet can ever ride
     along inside a note.
   · Opening the sheet clears the dot at once and calls inboxSeen(). If
     that call fails, nothing is said: the dot comes back on the next hub
     render, which is the honest state.

   ⚠️ Everything a PERSON typed (the learner's note, her reply) goes in
   with textContent. Never innerHTML for those.
   ============================================================ */
import { api } from "./api.js";
import { getSession } from "./session.js";
import { el } from "./ui.js";
import { FEEDBACK_ENABLED } from "./config.js";

/* Her wording, exactly (INBOX-PLAN.md, her rulings 2 and 3). */
export const INBOX_TEXT = {
  replyLabel: "Your teacher's reply",
  fixed: "Fixed! Thanks for spotting it.",
  addressed: "Your teacher answered this one outside the app ✓",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* "3 Oct", or "3 Oct 2025" when it is not this year. Built by hand so a
   phone's locale can never turn it into 10/03. */
function shortDate(iso) {
  const d = new Date(iso);
  if (!iso || Number.isNaN(d.getTime())) return "";
  const s = `${d.getDate()} ${MONTHS[d.getMonth()]}`;
  return d.getFullYear() === new Date().getFullYear() ? s : `${s} ${d.getFullYear()}`;
}

let mountSeq = 0;      // the latest hub render wins; an older answer is dropped
let sheetOpen = false; // one inbox sheet at a time

/* row: the hub's .hub-head-row. opts.enabled exists for the verify page
   only (FEEDBACK_ENABLED is a const and cannot be flipped at runtime);
   the hub always calls this with two arguments. */
export async function mountInbox(app, row, opts = {}) {
  const enabled = opts.enabled === undefined ? FEEDBACK_ENABLED : opts.enabled;
  if (!enabled || !row) return null;
  try {
    const sess = getSession();
    if (!sess || !sess.username) return null;
    const seq = ++mountSeq;
    let r = null;
    try { r = await api.inbox(sess.username, sess.password); } catch { return null; }
    // the hub was re-rendered or left while we waited: never write into a
    // detached head, and never let an older answer overwrite a newer one
    if (seq !== mountSeq || !row.isConnected) return null;
    if (!r || !r.ok || !Array.isArray(r.rows) || !r.rows.length) return null;
    if (row.querySelector(".hub-inbox-btn")) return null;
    return placeChip(row, r.rows, Number(r.unseen) || 0);
  } catch {
    return null; // the inbox is a nicety; it must never break the hub
  }
}

function setDot(btn, unseen) {
  const old = btn.querySelector(".hub-inbox-dot");
  if (old) old.remove();
  btn.title = unseen > 0 ? `Inbox, ${unseen} new` : "Inbox";
  if (unseen > 0) {
    const dot = el("span", "hub-inbox-dot", unseen > 9 ? "9+" : String(unseen));
    dot.setAttribute("aria-hidden", "true"); // the title carries the count
    btn.appendChild(dot);
  }
}

function placeChip(row, rows, unseen) {
  const head = row.closest(".hub-head");
  const h1 = row.querySelector("h1");

  const btn = el("button", "hub-inbox-btn");
  btn.type = "button";
  btn.setAttribute("aria-label", "Inbox");
  btn.appendChild(el("span", "hub-inbox-ico", "📥"));
  setDot(btn, unseen);
  btn.addEventListener("click", () => openInbox(btn, rows));

  const blip = row.querySelector(".hub-blip-btn");
  if (blip) row.insertBefore(btn, blip); else row.appendChild(btn);

  // The chip costs the greeting about 52px, so a longer first name that
  // fitted on one line before would break onto two. When the greeting wraps,
  // it steps down a size instead (css: .hub-head--tight). Checked again once
  // the web fonts are in, because the fallback font measures differently.
  const fit = () => {
    if (!h1 || !head || !h1.isConnected) return;
    const line = parseFloat(getComputedStyle(h1).lineHeight) || 30;
    if (h1.getBoundingClientRect().height > line * 1.5) head.classList.add("hub-head--tight");
  };
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit, () => {});
  return btn;
}

function itemNode(r) {
  const li = el("li", "inbox-item inbox-" + r.status);
  if (!r.seenAt) li.classList.add("is-new");

  const top = el("div", "inbox-top");
  top.appendChild(el("span", "inbox-you", "You wrote"));
  const meta = el("span", "inbox-meta");
  if (!r.seenAt) meta.appendChild(el("span", "inbox-new", "new"));
  const date = shortDate(r.repliedAt);
  if (date) meta.appendChild(el("span", "inbox-date", date));
  top.appendChild(meta);
  li.appendChild(top);

  const note = el("p", "inbox-note");
  note.textContent = String(r.body ?? "");
  li.appendChild(note);

  const out = el("div", "inbox-out inbox-out--" + r.status);
  const reply = typeof r.reply === "string" ? r.reply.trim() : "";
  if (r.status === "replied") {
    out.appendChild(el("span", "inbox-out-label", INBOX_TEXT.replyLabel));
  } else if (r.status === "fixed") {
    out.appendChild(el("p", "inbox-out-line", INBOX_TEXT.fixed));
  } else if (r.status === "addressed") {
    out.appendChild(el("p", "inbox-out-line", INBOX_TEXT.addressed));
  }
  if (reply) {
    const t = el("p", "inbox-out-text");
    t.textContent = r.reply;
    out.appendChild(t);
  }
  li.appendChild(out);
  return li;
}

function openInbox(btn, rows) {
  if (sheetOpen) return;
  sheetOpen = true;

  const hadUnseen = rows.some(r => !r.seenAt);
  // optimistic: the dot goes the moment the sheet opens
  setDot(btn, 0);
  if (hadUnseen) {
    const sess = getSession();
    if (sess && sess.username) {
      try {
        Promise.resolve(api.inboxSeen(sess.username, sess.password)).catch(() => {});
      } catch { /* quiet: the dot comes back on the next hub render */ }
    }
  }

  const scrim = el("div", "modal-scrim inbox-scrim");
  const sheet = el("div", "modal inbox-sheet");
  sheet.setAttribute("role", "dialog");
  sheet.setAttribute("aria-modal", "true");
  sheet.setAttribute("aria-labelledby", "inbox-title");
  sheet.tabIndex = -1;

  const mhead = el("div", "mhead");
  mhead.appendChild(el("span", "meyebrow", "From your teacher"));
  const closeBtn = el("button", "link-btn inbox-close", "✕");
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "Close");
  mhead.appendChild(closeBtn);
  sheet.appendChild(mhead);

  const h2 = el("h2", "", "Inbox");
  h2.id = "inbox-title";
  sheet.appendChild(h2);
  sheet.appendChild(el("p", "muted small inbox-intro", "Answers to the notes you sent with 💬."));

  const list = el("ul", "inbox-list");
  rows.forEach(r => list.appendChild(itemNode(r)));
  sheet.appendChild(list);

  scrim.appendChild(sheet);
  document.body.appendChild(scrim);

  const close = () => {
    if (!scrim.isConnected) return;
    scrim.remove();
    sheetOpen = false;
    // the "new" marks stay until the sheet is closed; after that this
    // render's copy of the rows counts as seen
    const now = new Date().toISOString();
    rows.forEach(r => { if (!r.seenAt) r.seenAt = now; });
    if (btn.isConnected) btn.focus();
  };
  closeBtn.addEventListener("click", close);
  // background tap closes, a tap inside the sheet does not. Escape is the
  // app-wide handler in ui.js, which clicks the topmost .modal-scrim.
  scrim.addEventListener("click", e => { if (e.target === scrim) close(); });

  closeBtn.focus();
}
