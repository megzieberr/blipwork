/* ============================================================
   SIGN UP / LOG IN  (self-registration)
   Learners create their own account: name, username, password.
   Logging back in needs only username + password. If a teacher has
   reset a password, the next login prompts the learner to set a new
   one. No name picker, no readable passwords.
   ============================================================ */
import { api } from "./api.js";
import { setSession } from "./session.js";
import { el, clear } from "./ui.js";

const errMsg = c => ({
  wrong_password: "That password isn’t right. Try again, or ask your teacher to reset it.",
  no_such_user: "No account with that username. New here? Tap Sign up.",
  too_short: "Use at least 4 characters for your password.",
  username_taken: "That username is taken — pick another.",
  username_short: "Usernames need at least 3 characters.",
  username_chars: "Usernames can only use letters, numbers, dots and underscores.",
  no_name: "Please enter your name.",
})[c] || "Something went wrong. Try again.";

export function renderLogin(app, host) {
  clear(host);
  const wrap = el("div", "login");
  wrap.innerHTML = `<div class="login-head"><div class="login-logo">π</div><div><h1>Maths Quest</h1><p class="muted small">Grade 11 · homework</p></div></div>`;
  const body = el("div", "login-body");
  wrap.appendChild(body);
  host.appendChild(wrap);

  showLogin();

  function field(ph, type = "text") { const i = el("input", "login-input"); i.type = type; i.placeholder = ph; i.autocomplete = "off"; i.autocapitalize = "off"; return i; }
  function errBox() { const e = el("p", "login-err"); e.hidden = true; return e; }

  async function finishLogin(username, password, err, btn) {
    setSession(username, password);
    const ok = await app.refresh();
    if (!ok) { err.hidden = false; err.textContent = "Something went wrong. Try again."; btn.disabled = false; return; }
    app.go("hub");
  }

  /* ---- LOG IN ---- */
  function showLogin() {
    clear(body);
    body.appendChild(el("p", "login-prompt", "Log in"));
    const user = field("Username");
    const pw = field("Password", "password");
    const err = errBox();
    const btn = el("button", "btn primary big", "Log in");
    const swap = el("button", "link-btn login-swap", "New here? Sign up");
    [user, pw, err, btn, swap].forEach(n => body.appendChild(n));
    swap.addEventListener("click", showSignup);

    async function submit() {
      const u = user.value.trim(), p = pw.value;
      if (!u) { err.hidden = false; err.textContent = "Enter your username."; return; }
      if (!p) { err.hidden = false; err.textContent = "Enter your password."; return; }
      err.hidden = true; btn.disabled = true;
      let r;
      try { r = await api.login(u, p); } catch { err.hidden = false; err.textContent = "Can’t reach the server."; btn.disabled = false; return; }
      if (r.ok) return finishLogin(u, p, err, btn);
      if (r.needsReset) { btn.disabled = false; return showReset(u); }
      err.hidden = false; err.textContent = errMsg(r.error); btn.disabled = false;
    }
    btn.addEventListener("click", submit);
    pw.addEventListener("keydown", e => { if (e.key === "Enter") submit(); });
  }

  /* ---- SIGN UP ---- */
  function showSignup() {
    clear(body);
    body.appendChild(el("p", "login-prompt", "Sign up"));
    body.appendChild(el("p", "muted small", "Pick a name to show, a username to log in with, and a password (4+ characters)."));
    const name = field("Your name (e.g. Jane S)");
    const user = field("Username");
    const pw = field("Password", "password");
    const err = errBox();
    const btn = el("button", "btn primary big", "Create account");
    const swap = el("button", "link-btn login-swap", "Already have an account? Log in");
    [name, user, pw, err, btn, swap].forEach(n => body.appendChild(n));
    swap.addEventListener("click", showLogin);

    async function submit() {
      const nm = name.value.trim(), u = user.value.trim(), p = pw.value;
      if (!nm) { err.hidden = false; err.textContent = "Enter your name."; return; }
      if (u.length < 3) { err.hidden = false; err.textContent = errMsg("username_short"); return; }
      if (p.length < 4) { err.hidden = false; err.textContent = errMsg("too_short"); return; }
      err.hidden = true; btn.disabled = true;
      let r;
      try { r = await api.signup(u, nm, p); } catch { err.hidden = false; err.textContent = "Can’t reach the server."; btn.disabled = false; return; }
      if (!r.ok) { err.hidden = false; err.textContent = errMsg(r.error); btn.disabled = false; return; }
      return finishLogin(u, p, err, btn);   // log straight in
    }
    btn.addEventListener("click", submit);
    pw.addEventListener("keydown", e => { if (e.key === "Enter") submit(); });
  }

  /* ---- SET A NEW PASSWORD after the teacher reset it ---- */
  function showReset(username) {
    clear(body);
    body.appendChild(el("p", "login-prompt", "Set a new password"));
    body.appendChild(el("p", "muted small", `Your teacher reset the password for "${username}". Choose a new one (4+ characters).`));
    const pw = field("New password", "password");
    const pw2 = field("Confirm new password", "password");
    const err = errBox();
    const btn = el("button", "btn primary big", "Save & log in");
    const back = el("button", "link-btn login-swap", "← Back");
    [pw, pw2, err, btn, back].forEach(n => body.appendChild(n));
    back.addEventListener("click", showLogin);

    async function submit() {
      const p = pw.value;
      if (p.length < 4) { err.hidden = false; err.textContent = errMsg("too_short"); return; }
      if (pw2.value !== p) { err.hidden = false; err.textContent = "The two passwords don’t match."; return; }
      err.hidden = true; btn.disabled = true;
      let r;
      try { r = await api.setPassword(username, p); } catch { err.hidden = false; err.textContent = "Can’t reach the server."; btn.disabled = false; return; }
      if (!r.ok) { err.hidden = false; err.textContent = errMsg(r.error); btn.disabled = false; return; }
      return finishLogin(username, p, err, btn);
    }
    btn.addEventListener("click", submit);
    pw2.addEventListener("keydown", e => { if (e.key === "Enter") submit(); });
  }
}
