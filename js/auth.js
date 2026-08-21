/* ============================================================
   ROSTER LOGIN (2026-08-21, CQ-BRIDGE-PLAN.md Part 1) — ported from Circle
   Quest's js/auth.js picker (READ-ONLY reference: circle-geometry-game/
   js/auth.js), restyled to Blipwork's Solo Leveling theme using the CSS
   classes already authored for this in css/styles.css (.login-search,
   .login-list, .login-name, .newtag) rather than inventing new ones.

   The teacher seeds the roster; there is no sign-up any more. A learner
   scrolls/searches to their name, then either sets a password (first time,
   or after a teacher reset — same screen, mhq_first_login) or enters it
   (mhq_login, unchanged). Once picked, the client uses that student's
   USERNAME for every subsequent call exactly as before — sessions, sync,
   admin are all untouched (CQ-BRIDGE-PLAN.md: "None of that changes").
   ============================================================ */
import { api } from "./api.js";
import { setSession } from "./session.js";
import { el, clear } from "./ui.js";

const errMsg = c => ({
  wrong_password: "That password isn’t right. Try again, or ask your teacher to reset it.",
  no_such_user: "Couldn’t find that name any more — ask your teacher.",
  too_short: "Use at least 4 characters for your password.",
  already_set: "Looks like a password is already set for that name — enter it instead.",
})[c] || "Something went wrong. Try again.";

export async function renderLogin(app, host) {
  clear(host);
  const wrap = el("div", "login");
  wrap.innerHTML = `<div class="login-head"><div class="login-logo"><img src="assets/companion/blip-base-blue.png" alt=""></div><div><h1>Blipwork</h1><p class="muted small">Grade 11 · homework</p></div></div>`;
  const body = el("div", "login-body");
  wrap.appendChild(body);
  host.appendChild(wrap);

  let students = [];
  try { students = await api.listStudents(); }
  catch { body.appendChild(el("p", "login-err", "Can’t reach the server.")); return; }

  async function finishLogin(username, password, err, btn) {
    setSession(username, password);
    const ok = await app.refresh();
    if (!ok) { err.hidden = false; err.textContent = "Something went wrong. Try again."; btn.disabled = false; return; }
    // Room build §1 (her ruling): login lands in Blip's room, not the hub.
    app.go("blip");
  }

  function pickName() {
    clear(body);
    body.appendChild(el("p", "login-prompt", "Who’s playing?"));
    const search = el("input", "login-search");
    search.type = "text";
    search.placeholder = "Search your name…";
    search.autocomplete = "off";
    search.autocapitalize = "off";
    body.appendChild(search);
    const list = el("div", "login-list");
    body.appendChild(list);

    function draw(filter) {
      clear(list);
      const f = (filter || "").trim().toLowerCase();
      students
        .filter(s => s.display_name.toLowerCase().includes(f))
        .forEach(s => {
          const b = el("button", "login-name");
          b.appendChild(document.createTextNode(s.display_name));
          if (!s.has_password) b.appendChild(el("span", "newtag", "new"));
          b.addEventListener("click", () => askPassword(s));
          list.appendChild(b);
        });
      if (!list.children.length) list.appendChild(el("p", "muted small", "No names match — check the spelling, or ask your teacher."));
    }
    search.addEventListener("input", () => draw(search.value));
    draw("");
    setTimeout(() => search.focus(), 50);
  }

  function askPassword(student) {
    clear(body);
    const isFirst = !student.has_password;
    const back = el("button", "link-btn back", "← Back");
    back.addEventListener("click", pickName);
    body.appendChild(back);
    body.appendChild(el("p", "login-prompt", student.display_name));
    body.appendChild(el("p", "muted small", isFirst ? "Choose a password (4+ characters)." : "Enter your password."));

    const p1 = el("input", "login-input"); p1.type = "password"; p1.autocomplete = "off";
    p1.placeholder = isFirst ? "New password" : "Password";
    body.appendChild(p1);
    let p2 = null;
    if (isFirst) {
      p2 = el("input", "login-input"); p2.type = "password"; p2.autocomplete = "off";
      p2.placeholder = "Confirm password";
      body.appendChild(p2);
    }

    const err = el("p", "login-err"); err.hidden = true; body.appendChild(err);
    const btn = el("button", "btn primary big", isFirst ? "Start" : "Log in");
    body.appendChild(btn);

    function showErr(m) { err.hidden = false; err.textContent = m; }

    async function submit() {
      const pw = p1.value.trim();
      if (isFirst) {
        if (pw.length < 4) return showErr(errMsg("too_short"));
        if (pw !== p2.value.trim()) return showErr("The two passwords don’t match.");
      } else if (!pw) {
        return showErr("Enter your password.");
      }
      err.hidden = true; btn.disabled = true;
      try {
        if (isFirst) {
          const r = await api.firstLogin(student.display_name, pw);
          if (!r.ok) {
            btn.disabled = false;
            // Race: someone else set this name's password between the list
            // loading and this submit (e.g. two tabs). Re-render as the
            // "enter your password" screen instead of a dead end.
            if (r.error === "already_set") { student.has_password = true; return askPassword(student); }
            return showErr(errMsg(r.error));
          }
          return finishLogin(r.username, pw, err, btn);
        } else {
          const r = await api.login(student.username, pw);
          if (!r.ok) { btn.disabled = false; return showErr(errMsg(r.error || "wrong_password")); }
          return finishLogin(student.username, pw, err, btn);
        }
      } catch { btn.disabled = false; showErr("Can’t reach the server."); }
    }
    btn.addEventListener("click", submit);
    [p1, p2].forEach(inp => inp && inp.addEventListener("keydown", e => { if (e.key === "Enter") submit(); }));
    setTimeout(() => p1.focus(), 50);
  }

  pickName();
}
