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
   it an anonymous "this one renders weird" is unactionable. Since
   2026-09-03 the QUESTION SNAPSHOT rides along on the same reasoning; see
   snapshotQuestion() below and supabase/migration-feedback-snapshot.sql.

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

/* ============================================================
   snapshotQuestion() — WHAT WAS ON THEIR SCREEN
   ------------------------------------------------------------
   The first real notes arrived tagged only "play:fn7" / "funfun:q2".
   `context` above names the ROUND, but every question in this app is
   generated fresh for that learner on that tap — so "this one is wrong"
   pointed at a question that no longer existed anywhere by the time she
   read the note, and nothing could be recovered afterwards. So the note
   now carries the question's own text as well.

   ⚠️ CAPTURED AT SHEET-OPEN TIME, not at Send. That is the moment the
   learner is complaining about; by the time they finish typing they may
   have tapped Continue and moved on to the next question.

   ⚠️ IT IS THE QUESTION, NEVER THE LEARNER. The app chrome carries a
   name, a level and a gold count, and none of it is in here: the
   selectors below name question cards only, and the fallback strips the
   chrome bars by class. That is what lets the snapshot ride along with an
   ANONYMOUS note on the same reasoning as `context` — a question is
   content, not identity (see supabase/migration-feedback-snapshot.sql).
   The feedback sheet's own text cannot get in either: this runs before
   the sheet is built, and .fb-scrim / .fb-fab are stripped regardless.

   Server caps at 2000 (that migration); 1800 here, so the cap that bites
   is the one whose "…" the reader can see.
   ============================================================ */
const SNAPSHOT_MAX = 1800;

/* The question card on each of the four player screens, worked out from
   how each one actually renders:
     · play + DICE   js/play.js builds .q-host and js/questions.js fills it
                     with one .q (prompt, diagram, options/steps, and the
                     worked solution once answered). A dice round routes
                     through the same renderer, so one selector covers both.
     · exam focus    js/exam-play.js: .exam-intro is the GIVEN panel and
                     .exam-parts holds the live sub-part card. Both, in
                     that order — a sub-part on its own reads as nonsense
                     without the information it was given.
     · Fun Functions js/funfun/play.js draws .qwrap (stem + prompt + graph
                     + answer slot) — INSIDE A SHADOW ROOT, so it is
                     invisible to a document-level query. See below.
   First group with a match wins; every element in that group is read. */
const QUESTION_GROUPS = [
  [".q-host .q"],
  [".exam-intro", ".exam-parts"],
  [".qwrap"],
];

/* Fun Functions is mounted in a shadow root (js/funfun-play.js: the two
   apps share 60 class names, so it gets its own DOM). document.querySelector
   cannot see into it, so its root is searched explicitly. */
function questionRoots() {
  const roots = [document];
  const ffHost = document.querySelector(".ff-host");
  if (ffHost && ffHost.shadowRoot) roots.push(ffHost.shadowRoot);
  return roots;
}

/* Whitespace collapsed the readable way: runs of spaces inside a line go,
   blank lines go, but the LINE BREAKS stay — a stem, its options and its
   worked steps are separate thoughts, and admin.html renders this with
   white-space:pre-wrap. Collapsing it all to one line would save nothing
   and cost her the shape of the question. */
function collapseText(raw) {
  const lines = String(raw == null ? "" : raw)
    .replace(/[\u00a0\u2007\u202f]/g, " ")   // the app's no-break spaces (the formulaHtml no-wrap rule)
    .split("\n")
    .map(line => line.replace(/[ \t]+/g, " ").trim())
    .filter(Boolean);

  /* A diagram's labels are one <text> element each \u2014 an axis alone is
     "f / x / y / O / \u22123 / \u22122 / \u22121 / 1 / 2 / 3", ten lines of almost
     nothing that push the actual question off her phone. Runs of very
     short lines are folded back onto one line, so that axis reads
     "f x y O \u22123 \u22122 \u22121 1 2 3" and the question keeps its own lines. Four
     characters is the cut: a tick or a point label is shorter, an option
     or a step is longer ("y \u2265 \u22122" is six). */
  const out = [];
  let run = [];
  const flush = () => { if (run.length) { out.push(run.join(" ")); run = []; } };
  lines.forEach(line => {
    if (line.length <= 4) { run.push(line); return; }
    flush();
    out.push(line);
  });
  flush();
  return out.join("\n");
}

/* INPUT DEVICES, not question content. The on-screen keypad, the token
   pad and the Casio simulator's key grid all print the same fixed labels
   on every round ("SHIFT ALPHA SETUP MODE ON SOLVE=" and forty more) —
   several hundred characters of nothing, which on a long question would
   push the actual maths past the cap. Stripped everywhere.

   ⚠️ .calc-lcd IS DELIBERATELY NOT IN HERE, and .calc-pad is exactly what
   IS. In js/calculator.js the simulator is .calc = .calc-lcd (the screen:
   .calc-ind + .calc-main) plus .calc-pad (the key grids). The DISPLAY is
   often the whole answer to "why is this marking me wrong" — it holds what
   the learner had actually typed. The KEYS are the same forty labels every
   time.

   The multiple-choice options (.opt) are not input devices either — they
   are part of the question, and a note about a wrong option is unreadable
   without them. */
const INPUT_DEVICES = ".keypad, .calc-pad, .calc-btn-float, .fb-fab, .fb-scrim";

/* Read a LIVE element the way the learner sees it.

   Walked rather than handed to innerText in one go, because the walk is
   what lets INPUT_DEVICES and anything display:none drop out on the way
   past.

   A BLOCK boundary emits a newline; an INLINE one does not — that is what
   keeps a stem, its options and its worked steps on separate lines while
   a <b> in the middle of a sentence does not chop the sentence in three.
   Whitespace-only text nodes survive as a single space, so words either
   side of an inline tag do not fuse. */
const XHTML = "http://www.w3.org/1999/xhtml";

function liveText(node, out, depth, skipSel) {
  if (!node || depth > 24) return;
  if (node.nodeType === 3) {                       // a text node
    const v = node.nodeValue;
    if (v) out.push(v.trim() ? v : " ");
    return;
  }
  if (node.nodeType !== 1) return;
  if (node.hidden) return;
  if (node.matches && node.matches(skipSel)) return;

  let inline = false;
  try {
    const cs = (node.ownerDocument.defaultView || window).getComputedStyle(node);
    if (cs && (cs.display === "none" || cs.visibility === "hidden")) return;
    // only HTML can be inline for this purpose: inside an SVG diagram every
    // <text> reports display:inline, and running the axis labels together
    // ("fxyO−2−1") would make a to-scale graph unreadable in the snapshot.
    inline = !!cs && node.namespaceURI === XHTML && /^inline/.test(cs.display);
  } catch { /* no view — read it and treat it as a block */ }

  node.childNodes.forEach(kid => liveText(kid, out, depth + 1, skipSel));
  if (!inline) out.push("\n");
}

function elementText(node, skipSel) {
  if (!node) return "";
  const out = [];
  liveText(node, out, 0, skipSel);
  return collapseText(out.join(""));
}

function screenText(node) { return elementText(node, INPUT_DEVICES); }

/* The fallback, for a screen with no known question container on it: the
   hub, the chapter map, blip, gallery, results — and Fun Functions'
   opening cutscene, which draws a caption-and-graph `.view` inside its
   shadow root rather than the `.qwrap` card its rounds use. The view MINUS
   the header and nav bars — read with the same walk, so the input pads and
   anything display:none drop out of this path too, and nothing the learner
   is looking at is touched.

   ⚠️ .hub-head AND .blip-head ARE IN THIS LIST FOR THE ANONYMITY PROMISE,
   not for tidiness. The hub head greets the learner by first name
   ("Hi, Kirsten 👋", js/screens.js) and the blip head carries the name
   they gave their Blip. Both sit INSIDE .view, so without this line an
   anonymous note sent from the hub would arrive carrying the sender's
   name in its snapshot — the one thing the 💬 sheet promises it will not
   do. redactSelf() below is the second lock on the same door, because a
   class list can go stale and this promise cannot.

   On the hub this comes back short — a few chapter tile labels — and on
   the login screen empty. Both are correct: there is no question to snap,
   and the RPC stores NULL rather than a blank string. */
const CHROME_IN_VIEW = ".chrome, .hub-head, .blip-head, .play-top, .ff-play-top, .exam-play-head, .chap-head, .qbar, script, style";

function prunedText(view) {
  return elementText(view, CHROME_IN_VIEW + ", " + INPUT_DEVICES);
}

/* Tried in this order once no question card matched: Fun Functions' own
   view inside the shadow root FIRST (a mounted quest fills the screen, and
   the light DOM there holds only the slim back bar and an empty shadow
   host — falling straight through to it would snapshot nothing), then the
   app's own view. */
function fallbackViews() {
  const out = [];
  const ffHost = document.querySelector(".ff-host");
  if (ffHost && ffHost.shadowRoot) {
    const ffView = ffHost.shadowRoot.querySelector(".view");
    if (ffView) out.push(ffView);
  }
  out.push(document.querySelector("#app .view"));
  return out.filter(Boolean);
}

/* ⚠️ THE SECOND LOCK. Whatever the selectors above did or did not catch,
   the learner's own username and display name are struck out of the text
   before it leaves this function. A question never contains either, so on
   a real snapshot this changes nothing — it only matters on the day a new
   screen quietly starts printing the name somewhere the class list above
   does not cover, and on that day it is the difference between a stale
   selector and a broken promise. Struck out rather than the whole
   snapshot dropped: she still gets the question. */
function redactSelf(text, app) {
  if (!text) return text;
  const sess = getSession();
  const bits = [
    sess && sess.username,
    app && app.state && app.state.student && app.state.student.name,
    // the greeting uses the first word of the name; strike that too
    app && app.state && app.state.student && app.state.student.name
      ? String(app.state.student.name).split(" ")[0] : null,
  ].filter(v => typeof v === "string" && v.trim().length >= 2);
  let out = text;
  bits.forEach(bit => {
    // escaped: a display name may contain a regex character
    out = out.replace(new RegExp(bit.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "…");
  });
  return out;
}

export function snapshotQuestion(app) {
  let text = "";
  try {
    for (const root of questionRoots()) {
      for (const group of QUESTION_GROUPS) {
        const parts = group
          .map(sel => root.querySelector(sel))
          .filter(Boolean)
          .map(screenText)
          .filter(Boolean);
        if (parts.length) { text = parts.join("\n"); break; }
      }
      if (text) break;
    }
    if (!text) {
      for (const view of fallbackViews()) {
        text = prunedText(view);
        if (text) break;
      }
    }
    text = redactSelf(text, app);
  } catch {
    // a snapshot is a nicety; it must never be the reason a learner
    // cannot send a note
    return "";
  }
  return text.length > SNAPSHOT_MAX ? text.slice(0, SNAPSHOT_MAX - 1) + "…" : text;
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
  /* ⚠️ BEFORE the sheet is built, and before a single await: this is the
     screen the learner is complaining about. Reading it after the panel
     slides up would also risk snapping the panel's own text. */
  const snapshot = snapshotQuestion(app);

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
      // ⚠️ SIX arguments. The sixth needs supabase/migration-feedback-snapshot.sql
      // on the database FIRST — against the old 5-argument function this call
      // is a "function not found" error, so the migration ships before the push.
      r = await api.sendFeedback(sess.username, sess.password, text, !anon.checked, context, snapshot);
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
