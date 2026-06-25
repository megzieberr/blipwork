/* ============================================================
   LOGIN — pick your name, then enter (or first-time set) a password.
   No typing of names: the roster is preloaded; learners tap a name.
   ============================================================ */
import { api } from "./api.js";
import { setSession } from "./session.js";
import { el, clear } from "./ui.js";

const errMsg = code =>
  code === "wrong_password" ? "That password isn’t right. Try again, or ask your teacher."
  : code === "too_short" ? "Use at least 4 characters."
  : code === "no_such_user" ? "Name not found — ask your teacher."
  : "Something went wrong. Try again.";

export function renderLogin(app, host) {
  clear(host);
  const wrap = el("div", "login");
  wrap.innerHTML = `<div class="login-head"><div class="login-logo">σ</div><div><h1>Maths Quest</h1><p class="muted small">Grade 11 · homework</p></div></div>`;
  const body = el("div", "login-body");
  wrap.appendChild(body);
  host.appendChild(wrap);

  let students = [];
  pickName();

  async function pickName() {
    clear(body);
    body.appendChild(el("p", "login-prompt", "Who are you?"));
    const search = el("input", "login-search");
    search.type = "text"; search.placeholder = "Search your name…"; search.autocomplete = "off";
    body.appendChild(search);
    const listEl = el("div", "login-list");
    body.appendChild(listEl);
    const status = el("p", "muted small center", "Loading names…");
    body.appendChild(status);
    try { students = await api.listStudents(); status.remove(); }
    catch { status.textContent = "Can’t reach the server. Check your connection."; return; }

    const paint = (filter) => {
      clear(listEl);
      const f = (filter || "").toLowerCase();
      students.filter(s => s.display_name.toLowerCase().includes(f)).forEach(s => {
        const b = el("button", "login-name", `${s.display_name}${s.has_password ? "" : ' <span class="newtag">new</span>'}`);
        b.addEventListener("click", () => password(s));
        listEl.appendChild(b);
      });
      if (!listEl.children.length) listEl.appendChild(el("p", "muted small center", "No match."));
    };
    paint("");
    search.addEventListener("input", () => paint(search.value));
  }

  function password(student) {
    clear(body);
    const back = el("button", "link-btn back", "← Back");
    back.addEventListener("click", pickName);
    body.appendChild(back);
    body.appendChild(el("p", "login-prompt", student.display_name));
    const first = !student.has_password;
    body.appendChild(el("p", "muted small", first
      ? "First time here — create a password you’ll remember (at least 4 characters). You’ll use it every time you log in."
      : "Enter your password."));
    const pw = el("input", "login-input"); pw.type = "password"; pw.placeholder = "Password"; body.appendChild(pw);
    let pw2 = null;
    if (first) { pw2 = el("input", "login-input"); pw2.type = "password"; pw2.placeholder = "Confirm password"; body.appendChild(pw2); }
    const err = el("p", "login-err"); err.hidden = true; body.appendChild(err);
    const go = el("button", "btn primary big", first ? "Create & start" : "Log in");
    body.appendChild(go);
    const fail = m => { err.hidden = false; err.textContent = m; go.disabled = false; };

    async function submit() {
      const p = pw.value;
      if (first) {
        if (p.length < 4) return fail("Use at least 4 characters.");
        if (pw2.value !== p) return fail("The two passwords don’t match.");
      } else if (!p) return fail("Enter your password.");
      go.disabled = true;
      try {
        const r = first ? await api.firstLogin(student.display_name, p) : await api.login(student.display_name, p);
        if (!r.ok) return fail(first ? errMsg(r.error) : (r.firstLogin ? "Set a password first." : errMsg(r.error)));
      } catch { return fail("Can’t reach the server."); }
      setSession(student.display_name, p);
      const ok = await app.refresh();
      if (!ok) return fail("Something went wrong. Try again.");
      app.go("hub");
    }
    go.addEventListener("click", submit);
    pw.addEventListener("keydown", e => { if (e.key === "Enter" && !first) submit(); });
    if (pw2) pw2.addEventListener("keydown", e => { if (e.key === "Enter") submit(); });
  }
}
