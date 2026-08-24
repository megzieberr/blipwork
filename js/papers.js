/* ============================================================
   📄 PAPERS TAB  (FEEDBACK-PAPERS-BRIEF.md Feature 2, 2026-08-24)
   ------------------------------------------------------------
   Mounts into papersCard()'s empty [data-mount="papers"] div
   (js/screens.js) — the same split js/cq-collect.js has with the Circle
   Geo card: screens.js owns the card, this file owns what lives inside it.

   The learners' ask, in her words: "a practice paper tab… all the
   practice papers we generate and past papers that I have, I want a
   place where they can download it from the app."

   HER DECISION: the PDFs live in a PRIVATE Supabase Storage bucket,
   never in the public repo. So the flow is:
     · the LIST comes from mhq_list_papers — an ordinary auth-gated RPC,
       and it never carries the storage path.
     · a FILE comes from the paper-url EDGE FUNCTION, which holds the
       service role and mints a 60-minute signed URL for that one paper.
       window.open() hands it to the phone, and the phone's own PDF
       viewer / downloader takes it from there.
   Nothing in this file can reach a byte of the bucket on its own, which
   is exactly the point.

   Offline (?local=1) the list mirror returns one stub row so the tab can
   be laid out and read, and Open answers {ok:false, error:"local"} —
   "Papers need the internet". The mirror never fakes a signed URL.
   ============================================================ */
import { api } from "./api.js";
import { getSession } from "./session.js";
import { el, clear, showToast } from "./ui.js";
import { CHAPTERS } from "./config.js";

/* Chapter id -> the name and icon the hub already uses, so a paper filed
   under "trig" reads as "📐 Trigonometry" here and not as a raw id. An
   unknown label (a past-paper grouping that is not a blipwork chapter,
   which she will absolutely have) is shown verbatim — the topic field is
   deliberately free text server-side for that reason. */
function groupLabel(chapter) {
  const ch = CHAPTERS.find(c => c.id === chapter);
  if (ch) return `${ch.icon} ${ch.name}`;
  return chapter || "General";
}

/* "1,4 MB" — her decimal comma, and MB rather than bytes because the
   only question the size answers is "will this eat my data?". */
function fmtSize(bytes) {
  const n = Number(bytes);
  if (!Number.isFinite(n) || n <= 0) return "";
  if (n < 1024 * 1024) return `${Math.max(1, Math.round(n / 1024))} kB`;
  return `${(n / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

function errCopy(code) {
  return ({
    local: "Papers need the internet — open the app online to download.",
    auth: "Session problem — try logging in again.",
    not_found: "That paper isn't there any more.",
    sign_failed: "Couldn't open that one — tell your teacher.",
  })[code] || "Couldn't open that just now — try again.";
}

function paperRow(sess, p) {
  const row = el("div", "pp-row");
  const size = fmtSize(p.sizeBytes);
  row.innerHTML = `<div class="pp-info">
      <div class="pp-title">${p.title}</div>
      ${size ? `<div class="pp-meta muted small">PDF · ${size}</div>` : `<div class="pp-meta muted small">PDF</div>`}
    </div>`;
  const btn = el("button", "btn primary small pp-open", "Open");
  btn.type = "button";
  row.appendChild(btn);

  btn.addEventListener("click", async () => {
    if (!sess || !sess.username) { showToast("Log in first", "error"); return; }
    // disable BEFORE the await — the double-submit house rule. Two taps
    // would mint two signed URLs and open two tabs.
    btn.disabled = true;
    const original = btn.textContent;
    btn.textContent = "…";

    let r = null;
    try {
      r = await api.paperUrl(sess.username, sess.password, p.id);
    } catch {
      showToast("Can't reach the server — try again", "error");
      btn.disabled = false; btn.textContent = original;
      return;
    }
    if (!r || !r.ok || !r.url) {
      showToast(errCopy(r && r.error), "error");
      btn.disabled = false; btn.textContent = original;
      return;
    }
    /* A new tab, not a download attribute: the URL is cross-origin
       (Supabase storage), where `download` is ignored anyway, and every
       phone browser already knows what to do with a PDF it is handed.
       noopener because the target is a signed URL on another origin. */
    window.open(r.url, "_blank", "noopener");
    btn.disabled = false; btn.textContent = original;
  });

  return row;
}

/* app: the app controller. hostEl: the .pp-mount[data-mount="papers"] div
   papersCard() builds and appends before calling this. */
export async function mountPapers(app, hostEl) {
  if (!hostEl) return;
  clear(hostEl);
  hostEl.appendChild(el("p", "muted small pp-loading", "Loading papers…"));

  const sess = getSession();
  if (!sess || !sess.username) { clear(hostEl); return; }

  let r = null;
  try {
    r = await api.listPapers(sess.username, sess.password);
  } catch {
    clear(hostEl);
    hostEl.appendChild(el("p", "muted small", "Can't reach the server just now — try again in a moment."));
    return;
  }
  clear(hostEl);
  if (!r || !r.ok) {
    hostEl.appendChild(el("p", "muted small", "Couldn't load the papers — try again in a moment."));
    return;
  }

  const papers = r.papers || [];
  if (!papers.length) {
    hostEl.appendChild(el("p", "muted small", "No papers up yet — they'll appear here as soon as your teacher adds them."));
    return;
  }

  /* Grouped by topic, in the order the server sent (mhq_list_papers
     already orders by chapter, then her `sort`, then upload date) — the
     grouping here only ever inserts headings, it never re-sorts, so her
     ordering is the one on screen. */
  const groups = [];
  papers.forEach(p => {
    const key = p.chapter || "General";
    let g = groups.find(x => x.key === key);
    if (!g) { g = { key, rows: [] }; groups.push(g); }
    g.rows.push(p);
  });

  groups.forEach(g => {
    const block = el("div", "pp-group");
    block.appendChild(el("div", "pp-group-head", groupLabel(g.key)));
    g.rows.forEach(p => block.appendChild(paperRow(sess, p)));
    hostEl.appendChild(block);
  });
}
