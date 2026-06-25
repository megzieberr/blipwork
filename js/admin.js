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
  view.appendChild(questSection(data.quests || []));
  view.appendChild(struggleSection(data.struggles || []));
  view.appendChild(learnerSection(data.rows || [], data.inactiveDays || 7));
}
const reload = () => dashboard();

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
  table.innerHTML = `<thead><tr><th>Name</th><th>Username</th><th>Password</th><th>XP</th><th>Passed</th><th>Last active</th><th></th></tr></thead>`;
  const tb = el("tbody");
  rows.forEach(r => {
    const passed = Object.entries(r.quests || {}).filter(([, p]) => p.passed).map(([q]) => q.replace("q", "")).sort();
    const inactive = r.lastActive && daysSince(r.lastActive) >= inactiveDays;
    const tr = el("tr");
    tr.innerHTML = `
      <td>${r.name}</td>
      <td class="mono">${r.username}</td>
      <td>${r.hasPassword ? '<span class="muted">•••• set</span>' : '<span class="adm-inactive">reset — awaiting new</span>'}</td>
      <td class="mono">${r.totalXp || 0}</td>
      <td class="mono">${passed.length ? passed.join(", ") : "—"}</td>
      <td class="${inactive ? "adm-inactive" : ""}">${fmtDate(r.lastActive)}${inactive ? " ⚠" : ""}</td>`;
    const act = el("td", "adm-actions");
    const rpw = el("button", "btn ghost small", "Reset pw");
    rpw.addEventListener("click", async () => { if (!confirm(`Reset ${r.name}'s password? They'll set a new one next login (progress kept).`)) return; await api.adminResetPassword(pw, r.id); reload(); });
    const rm = el("button", "btn ghost small danger", "Remove");
    rm.addEventListener("click", async () => { if (!confirm(`Remove ${r.name}? This deletes their progress.`)) return; await api.adminRemoveStudent(pw, r.id); reload(); });
    act.appendChild(rpw); act.appendChild(rm);
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
