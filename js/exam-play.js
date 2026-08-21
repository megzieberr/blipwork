/* ============================================================
   EXAM FOCUS — the part player (EXAM-FOCUS-PLAN.md, session 0
   infrastructure build, 2026-08-21).
   ------------------------------------------------------------
   Real pen-and-paper exam revision wearing a friendly face: ONE sub-part
   on screen at a time, earlier parts' revealed memos stay visible (the
   chain — later parts often say "using your answer to (a)…"), two
   buttons per part ("Done! Show me the answer" / "I'm stuck, give me a
   hint"), and the reveal renders the colour-memo structure. The app
   NEVER marks — there is no answer entry anywhere in this file, on
   purpose (her ruling: "I can't play police men").

   Own screen module (NOT routed through js/play.js — that file, and
   everything dice-shaped, is untouched by this build). js/screens.js's
   renderExamChapter/renderExamTopic navigate INTO this; js/app.js routes
   "examPlay" here. verify-exam.html also calls renderExamPlay() directly
   against the HARNESS-ONLY stub (js/exam/_harness-stub.js), the same way
   verify-dice.html's makeHarness() drives the real renderPlay() directly
   instead of re-testing through app routing.

   Completion + pay: the server (supabase/migration-exam-focus.sql's
   mhq_exam_open_part, WRITTEN NOT RUN) derives "completed" itself once
   every part has been reported opened, and pays flat XP/gold (js/config.js
   EXAM block mirrors the server's literals) exactly once ever — this file
   never computes or names an amount, it only reports "this part just got
   revealed" and renders back whatever the server says was paid (if
   anything). Double-submit rule: the Done button disables BEFORE the
   await, same as every other backend-call button in this app.
   ============================================================ */
import { api } from "./api.js";
import { getSession } from "./session.js";
import { el, clear, showToast, xbarHtml } from "./ui.js";
import { getExamLang, uiStr, pick } from "./exam/lang.js";
import { chapterById, questAccent } from "./config.js";
import { questDef } from "./quests/index.js";
import { examChapterEligible } from "./screens.js";

/* "I'm lost" — REteach, not a hint (her ruling, session E, 2026-08-21):
   "don't just give a hint, reteach the concept — take them to the
   specific round in Blipwork where that is taught and drilled." Every
   seeded question carries a REQUIRED lostQuest {chapter, quest} (see
   js/exam/_schema.js) naming that round. GATED (her ruling): exam focus
   never opens a closed round — the link only renders when that quest is
   currently open (app.state.openQuests), the exact same "open" set
   js/screens.js's chapter screen already gates quest cards on. Routes
   the SAME way renderChapter's quest card click does (app.go("play",
   {chapter, quest, def, accent})) — no new navigation mechanism, and
   never a dead-end (bails out silently if the chapter/quest/def can't
   all be resolved, rather than rendering a link that goes nowhere). */
function lostQuestLink(app, question) {
  const lq = question.lostQuest;
  if (!lq) return null;
  const openQuests = new Set((app.state && app.state.openQuests) || []);
  if (!openQuests.has(lq.quest)) return null;
  const lostChapter = chapterById(lq.chapter);
  const lostQ = lostChapter && (lostChapter.quests || []).find(q => q.id === lq.quest);
  const def = lostQ && questDef(lostQ.id);
  if (!lostChapter || !lostQ || !def) return null;
  const btn = el("button", "exam-lost-link", "I'm lost — take me to the round that teaches this");
  btn.addEventListener("click", () => app.go("play", { chapter: lostChapter, quest: lostQ, def, accent: questAccent(lostChapter) }));
  return btn;
}

export function renderExamPlay(app, host, params) {
  const { chapter, question, accent } = params;
  const onBack = params.onBack || (() => app.go("hub"));
  // SESSION E RULING (2026-08-21): exam focus follows the teacher's
  // per-quest gates, same rule as renderExamChapter/renderExamTopic's
  // guards (js/screens.js examChapterEligible()). A learner only ever
  // reaches this screen via those two, but verify-exam.html's harness
  // drives the player directly too, so it needs its own guard rather
  // than trusting the caller already checked.
  if (!examChapterEligible(app, chapter)) return app.go("hub");
  const sess = getSession();

  const root = el("div", "exam-play");
  if (accent) root.style.setProperty("--accent", accent);
  host.appendChild(root);

  const lang = getExamLang();
  let revealed = new Set();          // part ids whose memo is currently shown
  let esplainOpen = new Set();       // part ids with the 🤔 walkthrough expanded
  let hintOpen = new Set();          // part ids with the hint expanded (local only, never recorded)
  let reward = null;                 // the most recent justCompleted response, shown once
  let loading = true;

  function t(key, ...args) {
    const v = uiStr(lang)[key];
    return typeof v === "function" ? v(...args) : v;
  }

  async function loadProgress() {
    if (!sess) { loading = false; redraw(); return; }
    try {
      const res = await api.examState(sess.username, sess.password);
      const row = res && res.ok && res.progress ? res.progress[question.id] : null;
      if (row && Array.isArray(row.partsOpened)) revealed = new Set(row.partsOpened);
    } catch { /* offline / not reachable — the question still plays, just from a blank slate */ }
    loading = false;
    redraw();
  }

  function memoBlockEl(block) {
    const text = xbarHtml(pick(block.text, lang));
    if (block.type === "trap") {
      const div = el("div", "exam-trap");
      div.innerHTML = `<span class="exam-trap-ico">⚠️</span><div>${text}</div>`;
      return div;
    }
    const ticks = (block.ticks || []).map(code => `<span class="exam-tick">✓${code}</span>`).join(" ");
    const div = el("div", "exam-memo-line" + (block.type === "answer" ? " answer" : ""));
    div.innerHTML = `<div class="exam-memo-text">${text}</div>${ticks ? `<div class="exam-memo-ticks">${ticks}</div>` : ""}`;
    return div;
  }

  function partCard(part, idx, isActive) {
    const card = el("div", "card exam-part" + (isActive ? " active" : ""));
    const star = part.level === 4 ? `<span class="exam-star" title="Level 4">★</span>` : "";
    card.innerHTML = `<div class="exam-part-head"><span class="exam-part-id">(${part.id})</span><span class="exam-part-marks">[${part.marks}]</span>${star}</div>
      <div class="exam-part-prompt">${xbarHtml(pick(part.prompt, lang))}</div>`;

    if (revealed.has(part.id)) {
      const memo = el("div", "exam-memo");
      // her framing line, once — the FIRST memo revealed in a question is
      // always part index 0 (parts reveal strictly in order), so this
      // needs no separate "have we shown it yet" flag.
      if (idx === 0) memo.appendChild(el("div", "exam-memo-framing", t("markingFraming")));
      part.memo.forEach(block => memo.appendChild(memoBlockEl(block)));
      memo.appendChild(el("div", "exam-laws", t("markingLaws")));
      const esBtn = el("button", "btn ghost small exam-esplain-btn", t("esplainBtn"));
      esBtn.addEventListener("click", () => {
        if (esplainOpen.has(part.id)) esplainOpen.delete(part.id); else esplainOpen.add(part.id);
        redraw();
      });
      memo.appendChild(esBtn);
      if (esplainOpen.has(part.id)) memo.appendChild(el("div", "exam-esplain", xbarHtml(pick(part.esplain, lang))));
      card.appendChild(memo);
      return card;
    }

    if (isActive) {
      if (part.level === 4) card.appendChild(el("div", "exam-star-note", t("starNote")));
      if (hintOpen.has(part.id)) card.appendChild(el("div", "exam-hint", xbarHtml(pick(part.hint, lang))));
      const actions = el("div", "exam-part-actions");
      const doneBtn = el("button", "btn primary exam-done-btn", t("doneBtn"));
      const stuckBtn = el("button", "btn ghost exam-stuck-btn", t("stuckBtn"));
      // NO POLICING (her ruling): the hint toggle never locks or advances
      // anything, and is never reported to the server — only a DONE
      // reveal is.
      stuckBtn.addEventListener("click", () => { hintOpen.add(part.id); redraw(); });
      const lostLink = lostQuestLink(app, question);
      doneBtn.addEventListener("click", async () => {
        if (doneBtn.disabled) return;
        doneBtn.disabled = true; stuckBtn.disabled = true;   // double-submit rule: disable before await
        let res;
        try {
          res = await api.examOpenPart(sess.username, sess.password, question.id, part.id, question.parts.length);
        } catch { res = { ok: false }; }
        if (res && res.ok) {
          revealed = new Set(Array.isArray(res.partsOpened) ? res.partsOpened : [...revealed, part.id]);
          if (res.justCompleted) { reward = res; try { await app.refresh(); } catch { /* HUD just won't be fresh until the next real refresh */ } }
          redraw();
        } else {
          showToast("Couldn't save that — check your connection and try again.", "error");
          doneBtn.disabled = false; stuckBtn.disabled = false;
        }
      });
      actions.appendChild(doneBtn);
      actions.appendChild(stuckBtn);
      if (lostLink) actions.appendChild(lostLink);
      card.appendChild(actions);
    }
    return card;
  }

  function redraw() {
    clear(root);

    const head = el("div", "chap-head exam-play-head");
    head.innerHTML = `<div><span class="eyebrow">${(chapter && chapter.icon) || ""} ${(chapter && chapter.name) || ""}</span><h1>Exam question <span class="num small muted">· ${question.marks} marks</span></h1></div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="link-btn back" aria-label="Back">←</button>
      </div>`;
    head.querySelector(".back").addEventListener("click", onBack);
    root.appendChild(head);

    root.appendChild(el("div", "exam-opener", t("opener")));

    if (loading) { root.appendChild(el("div", "card", `<p class="muted center">…</p>`)); return; }

    const total = question.parts.length;
    const activeIdx = question.parts.findIndex(p => !revealed.has(p.id));
    const lastIdx = activeIdx === -1 ? total - 1 : activeIdx;
    root.appendChild(el("div", "exam-progress muted small", t("partOf", Math.min(lastIdx + 1, total), total)));

    const list = el("div", "exam-parts");
    question.parts.forEach((part, idx) => {
      if (idx > lastIdx) return;   // ONE sub-part per screen — later parts aren't reachable yet
      list.appendChild(partCard(part, idx, idx === activeIdx));
    });
    root.appendChild(list);

    if (activeIdx === -1) {
      const done = el("div", "card exam-complete");
      done.innerHTML = `<h2>${t("questionComplete")}</h2>`;
      if (reward && reward.justCompleted) {
        done.innerHTML += `<div class="result-reward system-notice"><span class="sys-label">Reward</span><div class="sys-value">+${reward.xpAwarded ?? 0} XP · +${reward.goldAwarded ?? 0} <span class="crystal">💎</span></div></div>`;
        if (reward.levelUp) {
          done.innerHTML += `<div class="result-levelup system-notice"><span class="sys-label">System</span><div class="sys-value"><span class="sparkle tw">✦</span> LEVEL UP — LV. ${reward.level} <span class="sparkle tw">✦</span></div></div>`;
        }
      }
      const backBtn = el("button", "btn primary big", t("backToChapters"));
      backBtn.addEventListener("click", onBack);
      done.appendChild(backBtn);
      root.appendChild(done);
    }
  }

  redraw();
  loadProgress();
}
