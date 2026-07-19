/* ============================================================
   ADMIN DASHBOARD  (teacher view, behind the admin password)
   Open/close each quest, see where the class is stuck (struggle
   flags by concept), and manage learners — readable passwords,
   reset password, add/remove, CSV export. Uses the same api layer,
   so it works against Supabase (live) or the local backend (?local=1).
   ============================================================ */
import { api } from "./api.js";
import { CHAPTERS } from "./config.js";
import { CONCEPTS } from "./concepts.js";
import { el, clear } from "./ui.js";

const root = () => document.getElementById("admin");
let pw = null;

const questTitle = id => { for (const ch of CHAPTERS) for (const q of (ch.quests || [])) if (q.id === id) return `${q.n}. ${q.title}`; return id; };
const conceptTitle = id => (CONCEPTS[id] && CONCEPTS[id].title) || id;
const fmtDate = v => { if (!v) return "never"; const d = new Date(v); return isNaN(d) ? "—" : d.toLocaleDateString(); };
const daysSince = v => { if (!v) return Infinity; const d = new Date(v); return isNaN(d) ? Infinity : (Date.now() - d.getTime()) / 864e5; };

// Phase 2 roster labels — health stage + growth stage (server-computed).
const HEALTH_LABELS = ["Healthy", "Tired", "Bedridden", "Critical"];
const GROWTH_LABELS = ["Baby", "Small", "Medium", "Grown"];
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
  card.appendChild(input); card.appendChild(err); card.appendChild(btn);
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
  status.remove();
  view.appendChild(termSection(!!data.termRunning));
  view.appendChild(assignmentSection(data));
  view.appendChild(questSection(data.quests || []));
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
    try { await api.adminSetAssignment(pw, select.value, due.value || null, note.value.trim() || null); }
    catch { /* reload shows the true state */ }
    reload();
  });
  form.appendChild(save);
  sec.appendChild(form);
  return sec;
}

function questSection(quests) {
  const sec = el("div", "card adm-section");
  sec.appendChild(el("h2", "", "Quests — open / close"));
  sec.appendChild(el("p", "muted small", "Learners only see open quests. Open each one once you’ve taught it."));
  const list = el("div", "adm-quests");
  quests.forEach(q => {
    const row = el("div", "adm-qrow", `<span>${questTitle(q.quest_id)}</span>`);
    const sw = el("label", "switch");
    const cb = el("input"); cb.type = "checkbox"; cb.checked = q.is_open;
    cb.addEventListener("change", async () => { cb.disabled = true; await api.adminSetQuestOpen(pw, q.quest_id, cb.checked); reload(); });
    sw.appendChild(cb); sw.appendChild(el("span", "slider"));
    row.appendChild(sw);
    list.appendChild(row);
  });
  sec.appendChild(list);
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

  sec.appendChild(el("p", "muted small", "Learners sign themselves up. You never see their passwords — reset a forgotten one (they set a new one next login, progress kept) or remove a learner."));

  const table = el("table", "adm-table");
  table.innerHTML = `<thead><tr><th>Name</th><th>Username</th><th>Password</th><th>XP</th><th>Blip</th><th>Passed</th><th>Last active</th><th></th></tr></thead>`;
  const tb = el("tbody");
  rows.forEach(r => {
    const passed = Object.entries(r.quests || {}).filter(([, p]) => p.passed).map(([q]) => q.replace("q", "")).sort();
    const inactive = r.lastActive && daysSince(r.lastActive) >= inactiveDays;
    const growth = GROWTH_LABELS[r.growthStage || 0] || "Baby";
    const blipCell = `${healthCell(r.health)} · <span class="muted">${growth}</span>${r.blipCount > 1 ? ` ×${r.blipCount}` : ""}`;
    const tr = el("tr");
    tr.innerHTML = `
      <td>${r.name}</td>
      <td class="mono">${r.username}</td>
      <td>${r.hasPassword ? '<span class="muted">•••• set</span>' : '<span class="adm-inactive">reset — awaiting new</span>'}</td>
      <td class="mono">${r.totalXp || 0}</td>
      <td>${blipCell}</td>
      <td class="mono">${passed.length ? passed.join(", ") : "—"}</td>
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
