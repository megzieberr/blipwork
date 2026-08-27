/* ============================================================
   ADMIN DASHBOARD  (teacher view, behind the admin password)
   Open/close each quest, see where the class is stuck (struggle
   flags by concept), and manage learners — reset a forgotten
   password, add/remove, CSV export. Uses the same api layer,
   ⚠️ Passwords are bcrypt-hashed and CANNOT be read, by anyone. An old
   version of this comment said "readable passwords", which was alarming
   and untrue; "reset" clears the hash so the learner picks a new one.
   so it works against Supabase (live) or the local backend (?local=1).
   ============================================================ */
import { api } from "./api.js";
import { CHAPTERS, DICE_CHAPTERS, FUNFUN_ENABLED, FEEDBACK_ENABLED, PAPERS_ENABLED } from "./config.js";
import { CONCEPTS } from "./concepts.js";
import { el, clear, pwToggle } from "./ui.js";
import { dueLine } from "./assignment.js";
/* The bare public key, not push.js itself: admin.html has no Blip screen and
   no learner session, so pulling in the whole opt-in module for one truthy
   check would drag session.js along for nothing. Empty key = the whole
   reminder feature is dormant (PUSH-SETUP.md). */
import { VAPID_PUBLIC_KEY } from "./push-config.js";

const root = () => document.getElementById("admin");
let pw = null;

const questTitle = id => { for (const ch of CHAPTERS) for (const q of (ch.quests || [])) if (q.id === id) return `${q.n}. ${q.title}`; return id; };
/* The chapter's DISPLAY name ("2D Trigonometry"), not its id ("trig") — this
   goes straight into a notification a child reads. Null when the quest isn't
   in config.js at all, which send-push words around. */
const chapterNameOf = id => { for (const ch of CHAPTERS) for (const q of (ch.quests || [])) if (q.id === id) return ch.name; return null; };
const conceptTitle = id => (CONCEPTS[id] && CONCEPTS[id].title) || id;
const fmtDate = v => { if (!v) return "never"; const d = new Date(v); return isNaN(d) ? "—" : d.toLocaleDateString(); };
const daysSince = v => { if (!v) return Infinity; const d = new Date(v); return isNaN(d) ? Infinity : (Date.now() - d.getTime()) / 864e5; };

/* every built quest, grouped per chapter — the per-learner grid clusters by
   this instead of one flat comma-list, and each entry carries what a chip
   needs to render + its tooltip. Ported from maths-quest-grade7/js/admin.js
   (ROUND_LIST / chipFor / clusterFor). */
const ROUND_LIST = (() => {
  const out = [];
  CHAPTERS.forEach(ch => (ch.quests || []).filter(q => q.built).forEach(q => {
    out.push({ id: q.id, title: q.title, ch: ch.name, chId: ch.id, chIcon: ch.icon, chColor: ch.signature });
  }));
  return out;
})();
const KNOWN_QUEST_IDS = new Set(ROUND_LIST.map(rd => rd.id));

// Phase 2 roster labels — health stage + growth stage (server-computed).
const HEALTH_LABELS = ["Healthy", "Tired", "Bedridden", "Critical"];
const GROWTH_LABELS = ["Tiny", "Small", "Medium", "Grown"];
function healthCell(h) {
  if (!h) return "—";
  const stage = h.stage || 0;
  let label = HEALTH_LABELS[stage] || "—";
  if (h.recovering) label = "Recovering";
  const warn = stage >= 2 || h.recovering;
  const extra = stage > 0 ? ` (${h.daysUnfed}d)` : "";
  return `<span class="${warn ? "adm-inactive" : ""}">${label}${extra}</span>`;
}

boot();
function boot() { clear(root()); const view = el("main", "view"); root().appendChild(view); renderLogin(view); }

function renderLogin(host) {
  const card = el("div", "card", "<h2>Teacher admin</h2><p class='muted small'>Enter your admin password.</p>");
  const input = el("input", "login-input"); input.type = "password"; input.placeholder = "Admin password";
  const err = el("p", "login-err"); err.hidden = true;
  const btn = el("button", "btn primary big", "Log in");
  card.appendChild(pwToggle(input)); card.appendChild(err); card.appendChild(btn);
  host.appendChild(card);
  async function submit() {
    btn.disabled = true; err.hidden = true;
    try { const r = await api.adminLogin(input.value); if (!r.ok) { err.hidden = false; err.textContent = "Wrong password."; btn.disabled = false; return; } }
    catch { err.hidden = false; err.textContent = "Can’t reach the server."; btn.disabled = false; return; }
    pw = input.value; dashboard();
  }
  btn.addEventListener("click", submit);
  input.addEventListener("keydown", e => { if (e.key === "Enter") submit(); });
}

async function dashboard() {
  clear(root());
  const view = el("main", "view adm");
  root().appendChild(view);
  view.appendChild(el("div", "adm-head", "<h1>Admin dashboard</h1>"));
  const status = el("p", "muted small", "Loading…"); view.appendChild(status);
  let data;
  try { data = await api.adminData(pw); } catch { status.textContent = "Can’t load. Check your connection."; return; }
  if (!data || !data.ok) { status.textContent = "Couldn’t load the dashboard."; return; }
  // FUNFUN-PART2-BRIEF.md D10: the 📈 chip's numbers come from their own RPC
  // (mhq_admin_funfun), NOT a new field on mhq_admin_data — that function is
  // deliberately never re-created (brief D3, the copy-forward danger). Loaded
  // alongside, and a failure here only costs the chip, never the dashboard.
  let funfunPlays = {};
  if (FUNFUN_ENABLED) {
    try { const f = await api.adminFunfun(pw); if (f && f.ok) funfunPlays = f.plays || {}; }
    catch { /* dashboard still loads; the chip just reads 0 */ }
  }
  status.remove();
  view.appendChild(termSection(!!data.termRunning));
  view.appendChild(assignmentSection(data));
  // FEEDBACK-PAPERS-BRIEF.md (2026-08-24). Both sections are appended
  // EMPTY and fill themselves in — each has its own call (mhq_admin_feedback
  // / the paper-admin edge function) and neither is a field on
  // mhq_admin_data, which stays untouched for the copy-forward reason
  // recorded in migration-dice.sql's header. Awaiting them here would hold
  // the whole dashboard behind two extra round trips.
  if (FEEDBACK_ENABLED) view.appendChild(feedbackSection());
  if (PAPERS_ENABLED) view.appendChild(papersSection());
  view.appendChild(questSection(data.quests || [], data.dicePlays || {}, funfunPlays));
  view.appendChild(struggleSection(data.struggles || []));
  view.appendChild(learnerSection(data.rows || [], data.inactiveDays || 7));
}
const reload = () => dashboard();

// The term toggle IS the sickness pause. While OFF, no blip gets ill (weekends
// are always excluded too). Turning it ON forgives any accrued sickness — the
// clock restarts from today — so flip it on when the term starts and off for
// holidays. Never affects the maths: quests stay fully playable either way.
function termSection(running) {
  const sec = el("div", "card adm-section");
  sec.appendChild(el("h2", "", "Term status"));
  sec.appendChild(el("p", "muted small", "While the term is ON, a blip that goes unfed on school days (Mon–Fri) gradually gets ill. Weekends never count. Turn it OFF for holidays — turning it back ON forgives any illness that built up. This never touches the quests."));
  const row = el("div", "adm-qrow", `<span>Term is running <b class="mono">${running ? "ON" : "OFF"}</b></span>`);
  const sw = el("label", "switch");
  const cb = el("input"); cb.type = "checkbox"; cb.checked = running;
  cb.addEventListener("change", async () => {
    cb.disabled = true;
    if (cb.checked && !confirm("Turn the term ON? This forgives any sickness that built up (the clock restarts from today).")) { cb.checked = false; cb.disabled = false; return; }
    try { await api.setTerm(pw, cb.checked); } catch { /* reload shows the true state */ }
    reload();
  });
  sw.appendChild(cb); sw.appendChild(el("span", "slider"));
  row.appendChild(sw);
  const list = el("div", "adm-quests"); list.appendChild(row);
  sec.appendChild(list);
  return sec;
}

/* ---------- Today's homework (Phase 3) ----------
   One active assignment at a time — a spotlight on one quest, pinned to
   the top of the learner's hub.

   RULING (PHASE-3-PLAN.md §2): setting homework does NOT open a closed
   quest, so this picker only ever lists quests that are already open —
   assigning a closed one would pin a card the learner cannot play. The
   list is data.quests (is_open) intersected with the CHAPTERS metadata,
   so the labels stay readable and a quest id that config.js no longer
   knows about simply doesn't appear.

   There is no penalty for missing it and no overdue state anywhere in
   the learner UI — the due date is a soft "by Friday" line only. */
function assignmentSection(data) {
  const a = data.assignment || null;
  const sec = el("div", "card adm-section");
  sec.appendChild(el("h2", "", "Today’s homework"));
  sec.appendChild(el("p", "muted small", "Pins one quest to the top of every learner’s hub. Only quests you’ve already opened can be set — setting homework never opens a closed quest. There’s no penalty for missing it: the due date shows as a gentle “by Friday” line, never a countdown or a late warning. One at a time; setting a new one replaces the old."));

  // current state
  const cur = el("div", "adm-qrow");
  if (a && a.questId) {
    const bits = [];
    if (a.dueOn) bits.push(`due ${a.dueOn}`);
    if (a.note) bits.push(`“${a.note}”`);
    cur.innerHTML = `<span><b>${questTitle(a.questId)}</b>${bits.length ? `<div class="muted small">${bits.join(" · ")}</div>` : ""}</span>`;
    const clr = el("button", "btn ghost small", "Clear");
    clr.addEventListener("click", async () => {
      if (!confirm("Clear the homework card from everyone’s hub? Their progress on that quest is untouched.")) return;
      clr.disabled = true;
      try { await api.adminClearAssignment(pw); } catch { /* reload shows the true state */ }
      reload();
    });
    cur.appendChild(clr);
  } else {
    cur.innerHTML = `<span class="muted">None set</span>`;
  }
  const list = el("div", "adm-quests"); list.appendChild(cur);
  sec.appendChild(list);

  // WhatsApp picture (2026-08-26, her ask): a shareable PNG of the CURRENT
  // homework, drawn as the app's own System-Window popup so the kids
  // recognise it instantly. Only exists while homework is set — the card
  // bakes in the live quest/due/note, so there is nothing to share when
  // nothing is pinned.
  if (a && a.questId) {
    const dl = el("button", "btn small", "⬇ Picture for the WhatsApp group");
    dl.style.marginTop = "8px";
    dl.addEventListener("click", async () => {
      dl.disabled = true;                      // double-submit rule
      try {
        const blob = await homeworkCardPng(a);
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `blipwork-homework-${a.questId}${a.dueOn ? "-" + a.dueOn : ""}.png`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      } catch (e) {
        alert("Couldn’t draw the picture: " + (e && e.message || e));
      }
      dl.disabled = false;
    });
    sec.appendChild(dl);
  }

  // picker — open quests only, grouped by chapter
  const openIds = new Set((data.quests || []).filter(q => q.is_open).map(q => q.quest_id));
  const select = el("select", "login-input");
  select.style.marginBottom = "0";
  select.appendChild(el("option", "", "Choose a quest…"));
  select.firstChild.value = "";
  let anyOpen = false;
  CHAPTERS.forEach(ch => {
    const qs = (ch.quests || []).filter(q => openIds.has(q.id));
    if (!qs.length) return;
    anyOpen = true;
    const grp = document.createElement("optgroup");
    grp.label = `${ch.icon} ${ch.name}`;
    qs.forEach(q => {
      const opt = el("option", "", `${q.n}. ${q.title}`);
      opt.value = q.id;
      if (a && a.questId === q.id) opt.selected = true;
      grp.appendChild(opt);
    });
    select.appendChild(grp);
  });

  if (!anyOpen) {
    sec.appendChild(el("p", "muted small", "No quests are open yet — open one below first, then come back."));
    return sec;
  }

  const due = el("input", "login-input");
  due.type = "date"; due.style.marginBottom = "0";
  due.min = new Date().toISOString().slice(0, 10);   // a due date in the past would only ever be a typo
  if (a && a.dueOn) due.value = a.dueOn;

  const note = el("input", "login-input");
  note.type = "text"; note.maxLength = 80; note.style.marginBottom = "0";
  note.placeholder = "Optional one-line note (e.g. “do this before Friday”)";
  if (a && a.note) note.value = a.note;

  const form = el("div");
  form.style.cssText = "display:flex;flex-direction:column;gap:8px;margin-top:12px";
  form.appendChild(select);
  const row = el("div");
  row.style.cssText = "display:flex;gap:8px;flex-wrap:wrap";
  due.style.flex = "0 0 auto"; note.style.flex = "1 1 220px";
  row.appendChild(due); row.appendChild(note);
  form.appendChild(row);

  const save = el("button", "btn primary", a && a.questId ? "Replace homework" : "Set homework");
  save.addEventListener("click", async () => {
    if (!select.value) { alert("Pick a quest first."); return; }
    save.disabled = true;
    let saved = false;
    try {
      const r = await api.adminSetAssignment(pw, select.value, due.value || null, note.value.trim() || null);
      saved = !!(r && r.ok);
    } catch { /* reload shows the true state */ }

    // 🔔 Tell the kids (2026-08-27). Strictly AFTER the homework itself is
    // saved and strictly best-effort: a notification that fails to go out
    // must never look like homework that failed to save. Silent while the
    // feature is dormant — no VAPID key means no setup has happened yet and
    // an alert on every save would be pure noise (PUSH-SETUP.md).
    if (saved && VAPID_PUBLIC_KEY) {
      try {
        await api.adminSetAnnounce(pw, questTitle(select.value), chapterNameOf(select.value));
        const r = await api.announceHomework(pw);
        if (r && r.ok && r.held) {
          alert("Homework set 👍\n\nIt's late, so the kids won't be buzzed now — the notification goes out at 7am.");
        } else if (r && r.ok && r.sent > 0) {
          alert(`Homework set 👍\n\n${r.learners} ${r.learners === 1 ? "learner has" : "learners have"} been notified.`);
        } else if (r && r.ok) {
          alert("Homework set 👍\n\nNobody has reminders switched on yet, so no notification went out.");
        }
      } catch { /* the homework is saved; the nudge is not worth an error popup */ }
    }
    reload();
  });
  form.appendChild(save);
  sec.appendChild(form);
  return sec;
}

/* ---------- the WhatsApp homework picture (2026-08-26) ----------
   1080×1080 PNG drawn on a canvas in the app's System-Window style: deep
   navy, thin luminous blue border, low glow — the same popup language the
   kids see in the app, so the message "go open Blipwork" needs no words.
   HER art only (assets/companion/homework-badge.png — her red book); the
   due line comes from assignment.js's own dueLine(), so the picture says
   exactly what the learner's pinned card will say. No overdue/pressure
   copy anywhere, per the phase-3 ruling. */
function loadImg(src) {
  return new Promise((res, rej) => {
    const im = new Image();
    im.onload = () => res(im);
    im.onerror = () => rej(new Error("could not load " + src));
    im.src = src;
  });
}

/* Word-wrap helper: greedy fill, returns the drawn block's bottom y. */
function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = String(text).split(/\s+/);
  let line = "";
  for (const w of words) {
    const probe = line ? line + " " + w : w;
    if (ctx.measureText(probe).width > maxW && line) {
      ctx.fillText(line, x, y); y += lineH; line = w;
    } else line = probe;
  }
  if (line) { ctx.fillText(line, x, y); y += lineH; }
  return y;
}

async function homeworkCardPng(a) {
  // resolve quest + chapter for title/icon/accent (same search the learner
  // card does — the id search is authoritative, chapterId only a hint)
  let ch = null, q = null;
  for (const c of CHAPTERS) {
    const hit = (c.quests || []).find(x => x.id === a.questId);
    if (hit) { ch = c; q = hit; break; }
  }
  const accent = (ch && ch.signature) || "#3aa0ff";

  const [book] = await Promise.all([
    loadImg("./assets/companion/homework-badge.png"),
    document.fonts ? document.fonts.load('700 84px "Space Grotesk"')
      .then(() => document.fonts.load('600 40px "Space Grotesk"'))
      .then(() => document.fonts.load('400 36px "Sora"')) : Promise.resolve(),
  ]);

  const S = 1080;
  const cv = document.createElement("canvas");
  cv.width = S; cv.height = S;
  const ctx = cv.getContext("2d");

  // ---- backdrop: near-black navy + two very soft glows ----
  ctx.fillStyle = "#070b16"; ctx.fillRect(0, 0, S, S);
  let g = ctx.createRadialGradient(S * 0.2, S * 0.1, 0, S * 0.2, S * 0.1, S * 0.8);
  g.addColorStop(0, "rgba(58,160,255,.10)"); g.addColorStop(1, "rgba(58,160,255,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);
  g = ctx.createRadialGradient(S * 0.85, S * 0.95, 0, S * 0.85, S * 0.95, S * 0.7);
  g.addColorStop(0, "rgba(123,92,255,.08)"); g.addColorStop(1, "rgba(123,92,255,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);

  // ---- the system window ----
  const px = 70, py = 90, pw2 = S - 2 * px, ph = S - 2 * py, r = 6;
  ctx.save();
  ctx.shadowColor = "rgba(58,160,255,.35)"; ctx.shadowBlur = 60;
  ctx.beginPath(); ctx.roundRect(px, py, pw2, ph, r);
  ctx.fillStyle = "rgba(11,18,32,.96)"; ctx.fill();
  ctx.restore();
  ctx.beginPath(); ctx.roundRect(px, py, pw2, ph, r);
  ctx.strokeStyle = "rgba(58,160,255,.55)"; ctx.lineWidth = 2; ctx.stroke();

  ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
  const cx = S / 2;

  // FIXED vertical budget (panel runs y 90..990) — flowing the blocks off
  // the book's height overflowed the canvas on the first render, so every
  // baseline is placed, not accumulated. Emoji are kept out of the drawn
  // text: canvas kerning around colour emoji is unreliable (the chapter
  // icon overlapped its own line), and the words carry the message.
  // eyebrow + divider (the app's SYSTEM header language)
  ctx.fillStyle = "#7fa3d4";
  ctx.font = '600 30px "Space Grotesk", sans-serif';
  ctx.fillText("S Y S T E M", cx, py + 72);
  ctx.strokeStyle = "rgba(58,160,255,.25)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(px + 60, py + 100); ctx.lineTo(S - px - 60, py + 100); ctx.stroke();

  // her red book, centre stage (210 wide → ~357 tall, bottom ≈ y 582)
  const bw = 210, bh = bw * (book.height / book.width);
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,.5)"; ctx.shadowBlur = 30; ctx.shadowOffsetY = 12;
  ctx.drawImage(book, cx - bw / 2, 225, bw, bh);
  ctx.restore();

  ctx.fillStyle = "#dbeaff";
  ctx.font = '700 80px "Space Grotesk", sans-serif';
  ctx.fillText("You have homework!", cx, 690);

  ctx.fillStyle = accent;
  const questLine = q ? `${q.n}. ${q.title}  ·  ${ch.name}` : a.questId;
  // shrink-to-fit: a long title + chapter must stay one line
  for (const size of [42, 38, 34, 30]) {
    ctx.font = `600 ${size}px "Space Grotesk", sans-serif`;
    if (ctx.measureText(questLine).width <= pw2 - 120) break;
  }
  ctx.fillText(questLine, cx, 756);

  const due = dueLine(a.dueOn);
  if (due) {
    ctx.fillStyle = "#7fa3d4";
    ctx.font = '400 36px "Sora", sans-serif';
    ctx.fillText(due, cx, 810);
  }

  if (a.note) {
    ctx.fillStyle = "#dbeaff";
    // 80-char notes are allowed (admin input maxLength) — pick the size
    // whose wrap stays within two lines so the note never reaches the footer
    const noteText = `“${a.note}”`;
    let size = 33;
    for (const s of [33, 29, 25]) {
      ctx.font = `400 ${s}px "Sora", sans-serif`;
      if (ctx.measureText(noteText).width <= 2 * (pw2 - 140)) { size = s; break; }
    }
    ctx.font = `400 ${size}px "Sora", sans-serif`;
    wrapText(ctx, noteText, cx, 868, pw2 - 140, size + 11);
  }

  // footer: the one instruction
  ctx.fillStyle = "#7fa3d4";
  ctx.font = '600 32px "Space Grotesk", sans-serif';
  ctx.fillText("Open Blipwork — it’s pinned at the top", cx, py + ph - 40);

  return new Promise((res, rej) =>
    cv.toBlob(b => b ? res(b) : rej(new Error("toBlob failed")), "image/png"));
}

/* Grouped by chapter (CHAPTERS order), each with an "N / M open" count and
   Open all / Close all — ported from maths-quest-grade7's buildChapterBlock.
   Blipwork has no chapter-level RPC, so the bulk buttons just loop the
   existing adminSetQuestOpen over that chapter's quests, one reload() at
   the end. A quest id the payload carries but config.js doesn't know about
   (shouldn't happen) is appended in a plain "Other" block, not dropped. */
function questSection(quests, dicePlays, funfunPlays) {
  const sec = el("div", "card adm-section");
  sec.appendChild(el("h2", "", "Quests — open / close"));
  sec.appendChild(el("p", "muted small", "Learners only see open quests. Open each one once you’ve taught it."));
  if (!quests || !quests.length) {
    sec.appendChild(el("p", "muted small", "No quests found."));
    return sec;
  }
  const openById = {}; quests.forEach(q => { openById[q.quest_id] = !!q.is_open; });

  function questRow(qid) {
    const row = el("div", "adm-qrow", `<span>${questTitle(qid)}</span>`);
    const sw = el("label", "switch");
    const cb = el("input"); cb.type = "checkbox"; cb.checked = !!openById[qid];
    cb.addEventListener("change", async () => { cb.disabled = true; await api.adminSetQuestOpen(pw, qid, cb.checked); reload(); });
    sw.appendChild(cb); sw.appendChild(el("span", "slider"));
    row.appendChild(sw);
    return row;
  }

  function buildChapterBlock(ch) {
    const built = (ch.quests || []).filter(q => q.built);
    if (!built.length) return null;
    const block = el("div", "adm-qchap");
    const openCount = built.filter(q => openById[q.id]).length;
    // DICE-PLAN.md 🎲 + play count — additive, one small cell, gated by the
    // same DICE_CHAPTERS allowlist the learner-facing card uses (session
    // 0b, 2026-08-21). Ships invisible: DICE_CHAPTERS is empty until a
    // chapter both has a pool and Megan's phone-test green light.
    const diceCell = DICE_CHAPTERS.includes(ch.id)
      ? `<span class="muted small adm-qcount" title="Dice rounds played this chapter, whole class">🎲 ${dicePlays[ch.id] || 0}</span>` : "";
    // FUNFUN-PART2-BRIEF.md D10 📈 — class total plays across all 15 Fun
    // Functions quests, on the Functions row only. Nothing per student.
    const ffTotal = Object.values(funfunPlays || {}).reduce((a, n) => a + (Number(n) || 0), 0);
    const funfunCell = (FUNFUN_ENABLED && ch.id === "func")
      ? `<span class="muted small adm-qcount" title="Fun Functions quests played, whole class, all 15 quests">📈 ${ffTotal}</span>` : "";
    const head = el("div", "adm-qchead",
      `<span class="adm-qctitle">${ch.icon} ${ch.name}</span><span class="muted small adm-qcount">${openCount} / ${built.length} open</span>${diceCell}${funfunCell}`);
    const btns = el("div", "adm-qcbtns");
    const openAll = el("button", "btn ghost small", "Open all");
    const closeAll = el("button", "btn ghost small", "Close all");
    async function bulkSet(open) {
      openAll.disabled = true; closeAll.disabled = true;
      for (const q of built) { await api.adminSetQuestOpen(pw, q.id, open); }
      reload();
    }
    openAll.addEventListener("click", () => bulkSet(true));
    closeAll.addEventListener("click", () => bulkSet(false));
    btns.appendChild(openAll); btns.appendChild(closeAll);
    head.appendChild(btns);
    block.appendChild(head);
    const list = el("div", "adm-qlist");
    built.forEach(q => list.appendChild(questRow(q.id)));
    block.appendChild(list);
    return block;
  }

  // Wide view (2026-08-21): chapter blocks live in a grid so they sit next
  // to each other as compact cards instead of full-width stacked strips.
  const grid = el("div", "adm-qgrid");
  sec.appendChild(grid);
  CHAPTERS.forEach(ch => { const block = buildChapterBlock(ch); if (block) grid.appendChild(block); });

  const otherIds = quests.map(q => q.quest_id).filter(id => !KNOWN_QUEST_IDS.has(id));
  if (otherIds.length) {
    const block = el("div", "adm-qchap");
    block.appendChild(el("div", "adm-qchead", `<span class="adm-qctitle">Other</span>`));
    const list = el("div", "adm-qlist");
    otherIds.forEach(id => list.appendChild(questRow(id)));
    block.appendChild(list);
    grid.appendChild(block);
  }

  return sec;
}

/* ---------- 💬 Feedback (FEEDBACK-PAPERS-BRIEF.md, 2026-08-24) ----------
   The learners' notes, newest first, with a mark-read tick each and an
   unread count in the header.

   ⚠️ "Anonymous" here is the literal truth, not a label over a hidden
   name. mhq_send_feedback writes NULL student_id and NULL display_name
   for an anonymous note — there is nothing in the row to reveal, and no
   query, export or future migration can bring the sender back. That is
   the promise the learner was shown when they unticked the box; this
   section must never grow a feature that appears to break it.

   The CONTEXT chip ("play:gt5", "exam:eqn.nor.q3(a)") is on every note,
   anonymous ones included — a question id is not a person, and it is the
   whole difference between "this one renders weird" and a bug she can
   actually find.

   Fills itself in: the section is appended immediately with a "Loading…"
   line and the fetch patches it, so the dashboard never waits on it. */
function feedbackSection() {
  const sec = el("div", "card adm-section");
  const head = el("div", "adm-lhead", "<h2>Feedback 💬</h2>");
  sec.appendChild(head);
  sec.appendChild(el("p", "muted small", "Notes the learners send from the 💬 button in the app. A note sent anonymously stores nothing about who wrote it — the name is not hidden, it was never saved. The grey chip is the screen or question they were on when they wrote it, which is saved either way."));
  const list = el("div", "adm-fb-list");
  list.appendChild(el("p", "muted small", "Loading…"));
  sec.appendChild(list);

  const draw = (data) => {
    clear(list);
    const rows = (data && data.rows) || [];
    const unread = (data && data.unread) || 0;
    const h2 = head.querySelector("h2");
    if (h2) h2.innerHTML = `Feedback 💬 ${unread ? `<span class="adm-unread">${unread} unread</span>` : ""}`;
    if (!rows.length) {
      list.appendChild(el("p", "muted small", "Nothing yet."));
      return;
    }
    rows.forEach(r => {
      const row = el("div", "adm-fb-row" + (r.readAt ? "" : " unread"));
      const main = el("div", "adm-fb-main");
      main.innerHTML = `
        <div class="adm-fb-who">
          <span class="adm-fb-name${r.anon ? " anon" : ""}">${r.anon ? "Anonymous" : r.name}</span>
          <span class="muted small">${fmtDate(r.createdAt)}</span>
          ${r.context ? `<span class="adm-fb-ctx" title="${r.context}">${r.context}</span>` : ""}
        </div>
        <div class="adm-fb-body"></div>`;
      // textContent, not innerHTML: this is text a learner typed, and it
      // goes on a page that also holds the admin session.
      main.querySelector(".adm-fb-body").textContent = r.body;
      row.appendChild(main);
      const tick = el("button", "btn ghost small adm-fb-tick", r.readAt ? "✓ Read" : "Mark read");
      tick.addEventListener("click", async () => {
        tick.disabled = true;                       // disable BEFORE the await
        try { await api.adminFeedbackRead(pw, r.id, !r.readAt); } catch { /* refresh shows the truth */ }
        refresh();
      });
      row.appendChild(tick);
      list.appendChild(row);
    });
  };

  const refresh = async () => {
    let data = null;
    try { data = await api.adminFeedback(pw); } catch { /* handled below */ }
    if (!data || !data.ok) { clear(list); list.appendChild(el("p", "muted small", "Couldn’t load the feedback.")); return; }
    draw(data);
  };
  refresh();
  return sec;
}

/* ---------- 📄 Papers (FEEDBACK-PAPERS-BRIEF.md, 2026-08-24) ----------
   Upload a PDF, see what's up, remove one.

   Everything here goes through the paper-admin EDGE FUNCTION, not an
   RPC: the `papers` bucket is private with no storage.objects policies,
   so only something holding the service role can put a byte in or take
   one out. The file is sent as base64 in one request — her papers are
   ≤ ~5 MB and this runs from her laptop every few weeks, so a signed
   upload URL and a second round trip would be machinery for nothing.

   Offline (?local=1) the mirror answers "list" from a stub and refuses
   upload/remove honestly — there is no offline private bucket to fake. */
function papersSection() {
  const sec = el("div", "card adm-section");
  sec.appendChild(el("h2", "", "Papers 📄"));
  sec.appendChild(el("p", "muted small", "Practice papers and past papers the learners can download from the 📄 Papers tab. They live in a private bucket — never in the public repo — and a learner only ever gets a link that expires after an hour."));

  const list = el("div", "adm-quests adm-pp-list");
  list.appendChild(el("p", "muted small", "Loading…"));
  sec.appendChild(list);

  // --- upload form ---
  const title = el("input", "login-input");
  title.type = "text"; title.maxLength = 160; title.placeholder = "Title (e.g. September Paper 1)";
  title.style.marginBottom = "0";

  const chapter = el("select", "login-input");
  chapter.style.marginBottom = "0";
  const general = el("option", "", "General"); general.value = ""; chapter.appendChild(general);
  CHAPTERS.forEach(ch => { const o = el("option", "", `${ch.icon} ${ch.name}`); o.value = ch.id; chapter.appendChild(o); });

  const file = el("input", "login-input");
  file.type = "file"; file.accept = "application/pdf,.pdf"; file.style.marginBottom = "0";

  const up = el("button", "btn primary", "Upload paper");
  const note = el("p", "muted small", "");

  const form = el("div");
  form.style.cssText = "display:flex;flex-direction:column;gap:8px;margin-top:14px";
  form.appendChild(title); form.appendChild(chapter); form.appendChild(file);
  form.appendChild(up); form.appendChild(note);
  sec.appendChild(form);

  const fmtSize = b => {
    const n = Number(b);
    if (!Number.isFinite(n) || n <= 0) return "";
    return n < 1024 * 1024 ? `${Math.round(n / 1024)} kB` : `${(n / (1024 * 1024)).toFixed(1)} MB`;
  };

  const draw = (papers) => {
    clear(list);
    if (!papers.length) { list.appendChild(el("p", "muted small", "Nothing uploaded yet.")); return; }
    papers.forEach(p => {
      const row = el("div", "adm-qrow",
        `<span><b>${p.title}</b><div class="muted small">${p.chapter || "General"}${p.sizeBytes ? ` · ${fmtSize(p.sizeBytes)}` : ""}</div></span>`);
      const rm = el("button", "btn ghost small danger", "Remove");
      rm.addEventListener("click", async () => {
        if (!confirm(`Remove “${p.title}”? The file is deleted from the bucket — this cannot be undone.`)) return;
        rm.disabled = true;                          // disable BEFORE the await
        try { await api.paperAdmin(pw, "remove", { paper_id: p.id }); } catch { /* refresh shows the truth */ }
        refresh();
      });
      row.appendChild(rm);
      list.appendChild(row);
    });
  };

  const refresh = async () => {
    let r = null;
    try { r = await api.paperAdmin(pw, "list"); } catch { /* handled below */ }
    if (!r || !r.ok) { clear(list); list.appendChild(el("p", "muted small", "Couldn’t load the papers.")); return; }
    draw(r.papers || []);
  };

  up.addEventListener("click", async () => {
    const f = file.files && file.files[0];
    if (!title.value.trim()) { note.textContent = "Give it a title first."; return; }
    if (!f) { note.textContent = "Choose a PDF first."; return; }
    up.disabled = true;                              // disable BEFORE the await
    note.textContent = "Uploading…";
    let b64 = "";
    try {
      b64 = await new Promise((res, rej) => {
        const fr = new FileReader();
        fr.onload = () => res(String(fr.result));    // "data:application/pdf;base64,…"
        fr.onerror = rej;
        fr.readAsDataURL(f);                         // the function strips the data: prefix
      });
    } catch { note.textContent = "Couldn’t read that file."; up.disabled = false; return; }

    let r = null;
    try {
      r = await api.paperAdmin(pw, "upload", { title: title.value.trim(), chapter: chapter.value, filename: f.name, b64 });
    } catch { note.textContent = "Couldn’t reach the server."; up.disabled = false; return; }
    up.disabled = false;
    if (!r || !r.ok) {
      note.textContent = ({
        not_pdf: "That isn’t a PDF.",
        too_big: "That file is too big (12 MB max).",
        local: "Uploading needs the real backend — this is the offline demo.",
        auth: "Admin password rejected — reload and log in again.",
      })[r && r.error] || "Upload failed.";
      return;
    }
    note.textContent = "Uploaded ✓";
    title.value = ""; file.value = "";
    refresh();
  });

  refresh();
  return sec;
}

function struggleSection(struggles) {
  const sec = el("div", "card adm-section");
  sec.appendChild(el("h2", "", "Where the class is stuck"));
  if (!struggles.length) {
    sec.appendChild(el("p", "muted small", "No struggle flags yet. Repeated wrong answers and “I’m lost” presses show up here, grouped by concept."));
    return sec;
  }
  const list = el("div", "adm-strug");
  struggles.forEach(s => {
    const row = el("div", "adm-srow", `<div><b>${conceptTitle(s.concept)}</b><div class="muted small">${s.count} flag${s.count > 1 ? "s" : ""} · ${s.students} learner${s.students > 1 ? "s" : ""}</div></div>`);
    const btn = el("button", "btn ghost small", "Resolve");
    btn.addEventListener("click", async () => { btn.disabled = true; await api.adminResolveStruggle(pw, s.concept); reload(); });
    row.appendChild(btn);
    list.appendChild(row);
  });
  sec.appendChild(list);
  return sec;
}

function learnerSection(rows, inactiveDays) {
  const sec = el("div", "card adm-section");
  const head = el("div", "adm-lhead", `<h2>Learners (${rows.length})</h2>`);
  const csv = el("button", "btn ghost small", "Export CSV");
  csv.addEventListener("click", () => exportCsv(rows));
  head.appendChild(csv);
  sec.appendChild(head);

  sec.appendChild(el("p", "muted small", "Learners sign themselves up. Rounds are grouped by chapter — green = passed (80%+) · orange = attempted, not yet passed · grey = not started. Hover a chip for the chapter, best score and when it was last played. You never see their passwords — reset a forgotten one (they set a new one next login, progress kept) or remove a learner."));

  const table = el("table", "adm-table");
  table.innerHTML = `<thead><tr><th>Name</th><th>Username</th><th>Password</th><th>XP</th><th>Blip</th><th>Rounds (by chapter)</th><th>Last active</th><th></th></tr></thead>`;
  const tb = el("tbody");
  rows.forEach(r => {
    const learnerQuests = r.quests || {};
    const inactive = r.lastActive && daysSince(r.lastActive) >= inactiveDays;
    const growth = GROWTH_LABELS[r.growthStage || 0] || "Tiny";
    const blipCell = `${healthCell(r.health)} · <span class="muted">${growth}</span>${r.blipCount > 1 ? ` ×${r.blipCount}` : ""}`;
    const chipFor = rd => {
      const p = learnerQuests[rd.id];
      const best = p ? Math.round((p.best_score || 0) * 100) : 0;
      const cls = p && p.passed ? "ok" : (p && p.attempts ? "try" : "none");
      const played = p && p.last_played_at ? fmtDate(p.last_played_at) : null;
      const tip = p
        ? `${rd.ch} · ${rd.title} — ${best}%${played ? ` — played ${played}` : ""}`
        : `${rd.ch} · ${rd.title} — not started yet`;
      return `<span class="rchip ${cls}" title="${tip}">${rd.id}</span>`;
    };
    const clusterFor = ch => {
      const round = ROUND_LIST.filter(rd => rd.chId === ch.id);
      if (!round.length) return "";
      return `<div class="rcluster" style="--cc:${ch.signature}">
        <div class="rch-head"><span class="rch-ico">${ch.icon}</span><span class="rch-name">${ch.name}</span></div>
        <div class="rgrid">${round.map(chipFor).join("")}</div>
      </div>`;
    };
    const clusters = CHAPTERS.map(clusterFor).join("");
    const tr = el("tr");
    tr.innerHTML = `
      <td>${r.name}</td>
      <td class="mono">${r.username}</td>
      <td>${r.hasPassword ? '<span class="muted">•••• set</span>' : '<span class="adm-inactive">reset — awaiting new</span>'}</td>
      <td class="mono">${r.totalXp || 0}</td>
      <td>${blipCell}</td>
      <td class="chips"><div class="rclusters">${clusters}</div></td>
      <td class="${inactive ? "adm-inactive" : ""}">${fmtDate(r.lastActive)}${inactive ? " ⚠" : ""}</td>`;
    const act = el("td", "adm-actions");
    const rpw = el("button", "btn ghost small", "Reset pw");
    rpw.addEventListener("click", async () => { if (!confirm(`Reset ${r.name}'s password? They'll set a new one next login (progress kept).`)) return; await api.adminResetPassword(pw, r.id); reload(); });
    const rsc = el("button", "btn ghost small", "Reset scores");
    rsc.addEventListener("click", async () => { if (!confirm(`Reset ${r.name}'s scores? This clears their XP, passed quests and struggle flags — the account stays, so they start fresh.`)) return; await api.adminResetProgress(pw, r.id); reload(); });
    const rm = el("button", "btn ghost small danger", "Remove");
    rm.addEventListener("click", async () => { if (!confirm(`Remove ${r.name}? This deletes their progress.`)) return; await api.adminRemoveStudent(pw, r.id); reload(); });
    act.appendChild(rpw); act.appendChild(rsc); act.appendChild(rm);
    tr.appendChild(act);
    tb.appendChild(tr);
  });
  table.appendChild(tb);
  const wrap = el("div", "adm-tablewrap"); wrap.appendChild(table);
  sec.appendChild(wrap);
  return sec;
}

function exportCsv(rows) {
  const lines = [["Name", "Username", "Total XP", "Last active", "Passed quests"].join(",")];
  rows.forEach(r => {
    const passed = Object.entries(r.quests || {}).filter(([, p]) => p.passed).map(([q]) => q).join(" ");
    const cells = [r.name, r.username, r.totalXp || 0, r.lastActive ? new Date(r.lastActive).toISOString() : "", passed];
    lines.push(cells.map(c => `"${String(c).replace(/"/g, '""')}"`).join(","));
  });
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "maths-quest-learners.csv"; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
