/* ============================================================
   💬 FEEDBACK BUTTON  (FEEDBACK-PAPERS-BRIEF.md Feature 1, 2026-08-24)
   ------------------------------------------------------------
   The learners' own ask, in her words: "when a question is wrong, or
   renders weird or they pick things up, I want a small button at the
   bottom of the screen where they can type their feedback… or if they
   just want to ask me something… and they should have the option to show
   their name or do it anonymously."

   MOUNTED FROM THE APP CHROME, NOT PER SCREEN. mountFeedback() is called
   once per render() from js/app.js and owns a single <body>-level button
   — so the button exists on hub, chapter, play, blip, gallery, exam,
   results, everywhere, without a line of code in any of those files. A
   per-screen mount would have meant seven copies and one of them would
   have been forgotten.

   ⚠️ ANONYMITY IS REAL. "Send anonymously" is not a display setting: the
   backend writes NULL student_id and NULL display_name, so the row keeps
   nothing about the sender at all (see the header of
   supabase/migration-feedback-papers.sql). The CONTEXT still rides along
   in both cases — "play:gt5" is a question id, not a person, and without
   it an anonymous "this one renders weird" is unactionable.

   The panel is the app's existing bottom-sheet idiom (.modal-scrim /
   .modal, the same chrome the "I'm lost" concept modal uses) rather than
   new furniture — on a phone that is already the shape a learner expects
   something to slide up in.
   ============================================================ */
import { api } from "./api.js";
import { getSession, isLoggedIn } from "./session.js";
import { el, showToast } from "./ui.js";
import { FEEDBACK_ENABLED } from "./config.js";

const BODY_MAX = 1000;

/* The screen + card id that goes up with the note. Derived entirely from
   the app controller's own screen/params — no other file has to remember
   to report anything, and nothing can go stale when a screen is rewritten.
   Shapes: "play:gt5" · "dice:gtrig" · "exam:eqn.nor.q3(a)" · "funfun:qE"
   · "chapter:trig" · "hub". Content ids only, never a person. */
export function feedbackContext(app) {
  if (!app || !app.screen) return "";
  const p = app.params || {};
  const chId = (p.chapter && p.chapter.id) || p.chapterId || "";
  switch (app.screen) {
    case "play":
      // a dice round routes through "play" too, with a params.dice driver
      // and a placeholder quest whose id is the literal string "dice" —
      // the CHAPTER is the useful id there, not that placeholder.
      if (p.dice) return chId ? `dice:${chId}` : "dice";
      return p.quest && p.quest.id ? `play:${p.quest.id}` : "play";
    case "examPlay":
      return p.question && p.question.id ? `exam:${p.question.id}` : "exam";
    case "funfunPlay":
      return p.questId ? `funfun:${p.questId}` : "funfun";
    case "chapter":
      return chId ? `chapter:${chId}` : "chapter";
    case "examChapter":
      return chId ? `examChapter:${chId}` : "examChapter";
    case "results":
      // which round it was still matters — a note written on the results
      // card is nearly always about a question inside that round.
      if (p.funfun && p.questId) return `results:funfun:${p.questId}`;
      if (p.dice && chId) return `results:dice:${chId}`;
      return p.quest && p.quest.id ? `results:${p.quest.id}` : "results";
    default:
      return app.screen;                       // hub · blip · gallery
  }
}

let sheetOpen = false;                          // one panel at a time

function closeSheet(scrim) {
  sheetOpen = false;
  scrim.remove();
}

function openSheet(app) {
  if (sheetOpen) return;
  sheetOpen = true;

  const sess = getSession();
  const context = feedbackContext(app);

  const scrim = el("div", "modal-scrim fb-scrim");
  const sheet = el("div", "modal fb-sheet");
  sheet.setAttribute("role", "dialog");
  sheet.setAttribute("aria-label", "Send a note to your teacher");
  sheet.innerHTML = `
    <div class="mhead">
      <span class="meyebrow">Feedback</span>
      <button class="link-btn fb-close" aria-label="Close">✕</button>
    </div>
    <h2>Send a note to your teacher</h2>
    <p class="muted small fb-intro">Something wrong with a question, something looking strange, or just something you want to ask — type it here.</p>
    <textarea class="fb-body" rows="5" maxlength="${BODY_MAX}" placeholder="Type your note…"></textarea>
    <div class="fb-count"><span class="fb-left">${BODY_MAX}</span> left</div>
    <label class="fb-anon">
      <input type="checkbox" class="fb-anon-cb" checked>
      <span class="fb-anon-label">Show my name</span>
    </label>
    <p class="muted small fb-anon-note">Your teacher will see who wrote this.</p>
    <button class="btn primary big fb-send">Send</button>`;
  scrim.appendChild(sheet);
  document.body.appendChild(scrim);

  const body = sheet.querySelector(".fb-body");
  const left = sheet.querySelector(".fb-left");
  const anon = sheet.querySelector(".fb-anon-cb");
  const anonLabel = sheet.querySelector(".fb-anon-label");
  const anonNote = sheet.querySelector(".fb-anon-note");
  const send = sheet.querySelector(".fb-send");

  body.addEventListener("input", () => { left.textContent = String(BODY_MAX - body.value.length); });

  /* One checkbox, both labels — "Show my name" ticked / "Send anonymously"
     unticked. Two radio buttons would have been the same choice in twice
     the space, and the sheet has to fit above a phone keyboard. */
  anon.addEventListener("change", () => {
    const named = anon.checked;
    anonLabel.textContent = named ? "Show my name" : "Send anonymously";
    anonNote.textContent = named
      ? "Your teacher will see who wrote this."
      : "Your name is not saved with this note — not anywhere.";
  });

  const close = () => closeSheet(scrim);
  sheet.querySelector(".fb-close").addEventListener("click", close);
  // tapping the dark area closes; tapping inside the sheet must not
  // (Escape-to-close is now generic — see ui.js's app-wide .modal-scrim
  // keydown handler, fix batch 2026-09-02; it reuses this exact listener
  // by dispatching a synthetic click at the scrim.)
  scrim.addEventListener("click", e => { if (e.target === scrim) close(); });

  send.addEventListener("click", async () => {
    const text = body.value.trim();
    if (!text) { body.focus(); return; }
    if (!sess || !sess.username) { showToast("Log in first", "error"); return; }

    // disable BEFORE the await — the double-submit house rule. A second
    // tap while the request is in flight would post the note twice.
    send.disabled = true;
    const original = send.textContent;
    send.textContent = "Sending…";

    let r = null;
    try {
      r = await api.sendFeedback(sess.username, sess.password, text, !anon.checked, context);
    } catch {
      showToast("Can't reach the server — try again", "error");
      send.disabled = false; send.textContent = original;
      return;
    }
    if (!r || !r.ok) {
      showToast(r && r.error === "empty" ? "Type something first" : "Couldn't send that — try again", "error");
      send.disabled = false; send.textContent = original;
      return;
    }
    close();
    showToast("Sent 💌", "good");
  });

  body.focus();
}

/* ⚠️ THE THREE PLAYER SCREENS GET THE BUTTON IN THE FLOW, NOT FIXED.
   Measured at 375px on a real round (Statistics q1): every primary control
   in this app is FULL WIDTH inside a 343px content column, and a fixed
   bottom-right button occupies a band that column also occupies — so at
   some scroll offset it will always sit on top of one. On the play screen
   at the top of the scroll it landed squarely on the right end of "Check
   my answer": a tap there would have opened the feedback sheet instead of
   submitting the answer. There is no fixed position at 375px that avoids
   this, and shifting it out of the way on scroll would make it jump around
   while a learner is reading.

   So on play / examPlay / funfunPlay the same button is moved INTO the
   view, at the very end, inside the 96px gutter .view already reserves —
   where it cannot cover anything, by construction rather than by
   measurement. It reads as a labelled pill there ("💬 Tell your teacher")
   because a lone circle in the flow looks like a stray, and because that
   is the screen where a learner most needs to know what it is for.
   Everywhere else it stays the small fixed circle the brief asked for
   (verified clear of every primary control at both ends of the scroll on
   hub, chapter, blip, gallery and results). */
const FLOW_SCREENS = ["play", "examPlay", "funfunPlay"];

/* Called from js/app.js's render(), every screen, every time. Owns ONE
   button element and MOVES it between <body> (fixed) and the current
   .view (in the flow) — moving a node keeps its click listener, so the
   button is created exactly once per page load either way. */
export function mountFeedback(app) {
  if (!FEEDBACK_ENABLED) return;
  let btn = document.querySelector(".fb-fab");
  if (!btn) {
    btn = el("button", "fb-fab");
    btn.type = "button";
    btn.title = "Send a note to your teacher";
    btn.setAttribute("aria-label", "Send a note to your teacher");
    btn.addEventListener("click", () => openSheet(app));
  }

  // hidden on the login screen (there is no learner to attribute a note
  // to yet, and mhq_send_feedback would refuse it anyway)
  const show = isLoggedIn() && app && app.screen !== "login";
  btn.hidden = !show;

  const inFlow = show && FLOW_SCREENS.includes(app.screen);
  btn.classList.toggle("fb-fab--inline", inFlow);
  btn.innerHTML = inFlow ? `💬<span class="fb-fab-label">Tell your teacher</span>` : "💬";

  // render() rebuilds .view every time, so the in-flow home has to be
  // re-entered on each render; the fixed home only needs claiming once.
  const view = document.querySelector("#app .view");
  const home = inFlow && view ? view : document.body;
  if (btn.parentNode !== home) home.appendChild(btn);
  else if (inFlow && btn !== home.lastChild) home.appendChild(btn);   // stay last in the gutter

  // a sheet left open across a navigation would float over the wrong screen
  if (!show && sheetOpen) { const s = document.querySelector(".fb-scrim"); if (s) closeSheet(s); }
}
