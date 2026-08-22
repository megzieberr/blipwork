/* ============================================================
   EXAM FOCUS — the part player (EXAM-FOCUS-PLAN.md, session 0
   infrastructure build, 2026-08-21; reworked into SKILL ROUNDS by
   EXAM-SKILLS-BRIEF.md, Session B, 2026-08-22).
   ------------------------------------------------------------
   Real pen-and-paper exam revision wearing a friendly face: ONE sub-part
   on screen at a time, earlier parts' revealed memos stay visible (the
   chain — later parts often say "using your answer to (a)…"), buttons
   per part ("Done! Show me the answer" / "I'm stuck, give me a hint" /
   "Walk me through it"), and the reveal renders the colour-memo
   structure. The app NEVER marks — there is no answer entry anywhere in
   this file, on purpose (her ruling: "I can't play police men").

   SKILL ROUNDS (2026-08-22, her "too sudden" playtest note): what this
   file plays is now a CARD, not a whole seeded question — js/exam/
   skills.js groups the 21 seeded questions' parts into 26 skills, and
   js/exam/index.js's cards-*.js files turn each grouping-table row into
   a card that still passes the same `_schema.js` validateQuestion() the
   old whole-question objects did (same shape: id/chapter/topic/parts[]/
   marks/lostQuest, plus optional `intro`/`source`). So this file barely
   changes what a "question" object needs to look like — it changes what
   surrounds it: the player now knows which SKILL a card belongs to
   (`params.skillId`), can find its siblings (`examQuestionsForTopic`) to
   show "Card k of n" and drive "Another one!", and renders an optional
   `intro` panel above the parts when a card's own first part no longer
   carries the source question's full setup.

   Own screen module (NOT routed through js/play.js — that file, and
   everything dice-shaped, is untouched by this build). js/screens.js's
   renderExamChapter (skill tiles) navigates STRAIGHT into this — the old
   renderExamTopic question-list screen is gone (her drawing: "tap a
   tile -> straight into the first card, no list screen"). js/app.js
   routes "examPlay" here. verify-exam.html (Session A) and this build's
   own verify-exam-skills.html both call renderExamPlay() directly
   against a harness card, the same way verify-dice.html's makeHarness()
   drives the real renderPlay() directly instead of re-testing through
   app routing.

   Completion + pay: the server (supabase/migration-exam-focus.sql's
   mhq_exam_open_part) derives "completed" itself once every part has
   been reported opened, and pays flat XP/gold (js/config.js EXAM block
   mirrors the server's literals) exactly once ever, keyed by whatever
   id it's given — a card's id works exactly like a whole-question id
   did (checked: the RPC accepts any question id text, per the brief).
   This file never computes or names an amount, it only reports "this
   part just got revealed" and renders back whatever the server says was
   paid (if anything). Double-submit rule: every backend-call button
   (Done, and the Walk button's LAST "Next step →" click, which pays
   exactly like Done) disables itself BEFORE the await.
   ============================================================ */
import { api } from "./api.js";
import { getSession } from "./session.js";
import { el, clear, showToast, xbarHtml, fracHtml, formulaHtml } from "./ui.js";
import { getExamLang, uiStr, pick } from "./exam/lang.js";
import { skillLabel } from "./exam/skills.js";
import { examQuestionsForTopic } from "./exam/index.js";
import { chapterById, questAccent } from "./config.js";
import { questDef } from "./quests/index.js";
import { renderDiagram, highlightedSpec } from "./exam/circle-engine.js";
import { examChapterEligible } from "./screens.js";

/* "I'm lost" — REteach, not a hint (her ruling, session E, 2026-08-21):
   "don't just give a hint, reteach the concept — take them to the
   specific round in Blipwork where that is taught and drilled." Every
   card carries a REQUIRED lostQuest {chapter, quest} (copied from its
   source question — see js/exam/_schema.js) naming that round. GATED
   (her ruling): exam focus never opens a closed round — the link only
   renders when that quest is currently open (app.state.openQuests), the
   exact same "open" set js/screens.js's chapter screen already gates
   quest cards on. Routes the SAME way renderChapter's quest card click
   does (app.go("play", {chapter, quest, def, accent})) — no new
   navigation mechanism, and never a dead-end (bails out silently if the
   chapter/quest/def can't all be resolved, rather than rendering a link
   that goes nowhere). */
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

/* DIAGRAMS (2026-08-22, with the Circle Quest engine port). A card may
   carry a to-scale figure (js/exam/_schema.js's `diagram` field, copied
   for only its included parts — see EXAM-SKILLS-BRIEF.md's data shape);
   when it does, EVERY part that names itself in diagram.parts gets its
   OWN copy, drawn with THAT part's marker-pen highlights — her design:
   "find angle A" lights the wedge on angle A, "prove ABCD is cyclic"
   lights the four sides (EXAM-FOCUS-PLAN.md, "Circle geo diagrams").

   Per PART, not one figure above the whole chain: parts stay on screen
   as a chain, so a single shared figure could only ever show the ACTIVE
   part's highlights — and the reveal-side figure (Sept T2 4(a)'s fully
   labelled version, the one that belongs beside the proof) would be
   replaced the instant the next part became active, i.e. never seen.
   Each part carrying its own is what makes both states readable.

   Plain re-render on every redraw — no rAF loop, no animation, no
   observers (house rule: js/browser-pane notes / CLAUDE.md). The engine
   returns an SVG string; the wrapper is a white "paper" panel, because
   the ported engine draws dark ink for a light background and because
   pen-and-paper is the point of this whole tab. */
function partDiagram(question, part, isRevealed, accent) {
  const d = question.diagram;
  if (!d || !d.parts) return null;
  const entry = d.parts[part.id];
  if (!entry) return null;
  const spec = entry.spec || d.spec;
  if (!spec) return null;
  const hl = (isRevealed && entry.reveal) ? entry.reveal : entry.question;
  const box = el("div", "exam-diagram");
  box.innerHTML = renderDiagram(highlightedSpec(spec, hl || {}), accent || "#8b5cf6");
  box.setAttribute("data-part", part.id);
  box.setAttribute("data-state", (isRevealed && entry.reveal) ? "reveal" : "question");
  return box;
}

export function renderExamPlay(app, host, params) {
  // `question` is the active CARD (see this file's header) — kept under
  // its old name to minimise churn in the part-chain logic below, which
  // never cared whether its object came from a whole seeded question or
  // one card built from a few of its parts; both pass the same schema.
  const { chapter, skillId, question, accent } = params;
  // Back goes to the CHAPTER (skill-tile) screen — screens.js's tile
  // click always supplies onBack; this fallback only matters for a
  // caller (a harness) that doesn't bother, and still lands somewhere
  // sane rather than the hub.
  const onBack = params.onBack || (() => app.go("examChapter", { chapterId: chapter && chapter.id }));
  // SESSION E RULING (2026-08-21): exam focus follows the teacher's
  // per-quest gates, same rule as renderExamChapter's own guard
  // (js/screens.js examChapterEligible()). A learner only ever reaches
  // this screen via the chapter tile, but a harness drives the player
  // directly too, so it needs its own guard rather than trusting the
  // caller already checked.
  if (!examChapterEligible(app, chapter)) return app.go("hub");
  const sess = getSession();

  const root = el("div", "exam-play");
  if (accent) root.style.setProperty("--accent", accent);
  host.appendChild(root);

  const lang = getExamLang();
  let revealed = new Set();          // part ids whose memo is currently shown
  let esplainOpen = new Set();       // part ids with the 🤔 walkthrough expanded
  let hintOpen = new Set();          // part ids with the hint expanded (local only, never recorded)
  let walkPartId = null;             // part id currently in "Walk me through it" mode, or null
  let walkStep = 0;                  // how many of that part's memo blocks the walk has revealed
  let reward = null;                 // the most recent justCompleted response, shown once
  let loading = true;

  // Siblings in this skill, in the exact order the grouping table lists
  // them (js/exam/index.js's examQuestionsForTopic mirrors cards-*.js's
  // own order) — drives "Card k of n" and "Another one!"'s next-card
  // pick. A caller that skips skillId (a harness driving a single
  // one-off card, same posture as the old _harness-stub.js) still gets
  // a sane length-1 list rather than a crash.
  let cardsInSkill = skillId ? examQuestionsForTopic(chapter.id, skillId) : [];
  if (!cardsInSkill.some(c => c.id === question.id)) cardsInSkill = [question];

  function t(key, ...args) {
    const v = uiStr(lang)[key];
    return typeof v === "function" ? v(...args) : v;
  }

  // fracHtml/formulaHtml applied AFTER xbarHtml, on every learner-facing
  // string this screen renders (her side-quest ruling, 2026-08-22:
  // "proper stacked fractions everywhere in Exam Focus — no slashes").
  function richHtml(pair) {
    return formulaHtml(fracHtml(xbarHtml(pick(pair, lang))));
  }

  async function loadProgress() {
    if (!sess) { loading = false; redraw(); return; }
    try {
      const res = await api.examState(sess.username, sess.password);
      const row = res && res.ok && res.progress ? res.progress[question.id] : null;
      if (row && Array.isArray(row.partsOpened)) revealed = new Set(row.partsOpened);
    } catch { /* offline / not reachable — the card still plays, just from a blank slate */ }
    loading = false;
    redraw();
  }

  function memoBlockEl(block) {
    const text = richHtml(block.text);
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
      <div class="exam-part-prompt">${richHtml(part.prompt)}</div>`;

    const fig = partDiagram(question, part, revealed.has(part.id), accent);
    if (fig) card.appendChild(fig);

    if (revealed.has(part.id)) {
      const memo = el("div", "exam-memo");
      // her framing line, once — the FIRST memo revealed in a card is
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
      if (esplainOpen.has(part.id)) memo.appendChild(el("div", "exam-esplain", richHtml(part.esplain)));
      card.appendChild(memo);
      return card;
    }

    if (!isActive) return card;

    if (part.level === 4) card.appendChild(el("div", "exam-star-note", t("starNote")));

    /* WALK ME THROUGH IT (her ruling, 2026-08-22: "same memo, revealed
       one step at a time with a Next button. No new content."). Local
       state only — never sent to the server until the LAST block, at
       which point it counts as Done (that reveal IS recorded, exactly
       like a normal Done click). Hint + Done hidden while walking (her
       "no policing" rule extends here too: nothing about walking itself
       is ever reported). */
    if (walkPartId === part.id) {
      const walk = el("div", "exam-walk");
      if (idx === 0) walk.appendChild(el("div", "exam-memo-framing", t("markingFraming")));
      part.memo.slice(0, walkStep).forEach(block => walk.appendChild(memoBlockEl(block)));
      card.appendChild(walk);
      const nextActions = el("div", "exam-part-actions");
      const nextBtn = el("button", "btn primary exam-walk-next-btn", t("nextStep"));
      nextBtn.addEventListener("click", async () => {
        if (nextBtn.disabled) return;
        const revealIdx = walkStep;                              // the block this click is about to show
        const isLast = revealIdx === part.memo.length - 1;
        if (!isLast) { walkStep++; redraw(); return; }
        nextBtn.disabled = true;                                 // double-submit rule: disable before await
        let res;
        try {
          res = await api.examOpenPart(sess.username, sess.password, question.id, part.id, question.parts.length);
        } catch { res = { ok: false }; }
        if (res && res.ok) {
          revealed = new Set(Array.isArray(res.partsOpened) ? res.partsOpened : [...revealed, part.id]);
          walkPartId = null; walkStep = 0;
          if (res.justCompleted) { reward = res; try { await app.refresh(); } catch { /* HUD just won't be fresh until the next real refresh */ } }
          redraw();
        } else {
          showToast("Couldn't save that — check your connection and try again.", "error");
          nextBtn.disabled = false;
        }
      });
      nextActions.appendChild(nextBtn);
      card.appendChild(nextActions);
      return card;
    }

    if (hintOpen.has(part.id)) card.appendChild(el("div", "exam-hint", richHtml(part.hint)));
    const actions = el("div", "exam-part-actions");
    const doneBtn = el("button", "btn primary exam-done-btn", t("doneBtn"));
    const stuckBtn = el("button", "btn ghost exam-stuck-btn", t("stuckBtn"));
    const walkBtn = el("button", "btn ghost small exam-walk-btn", t("walkBtn"));
    // NO POLICING (her ruling): the hint toggle never locks or advances
    // anything, and is never reported to the server — only a DONE
    // reveal (or a completed Walk) is.
    stuckBtn.addEventListener("click", () => { hintOpen.add(part.id); redraw(); });
    walkBtn.addEventListener("click", () => { walkPartId = part.id; walkStep = 0; redraw(); });
    const lostLink = lostQuestLink(app, question);
    doneBtn.addEventListener("click", async () => {
      if (doneBtn.disabled) return;
      doneBtn.disabled = true; stuckBtn.disabled = true; walkBtn.disabled = true;   // double-submit rule: disable before await
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
        doneBtn.disabled = false; stuckBtn.disabled = false; walkBtn.disabled = false;
      }
    });
    actions.appendChild(doneBtn);
    actions.appendChild(stuckBtn);
    actions.appendChild(walkBtn);
    if (lostLink) actions.appendChild(lostLink);
    card.appendChild(actions);
    return card;
  }

  function redraw() {
    clear(root);

    const cardIdx = Math.max(0, cardsInSkill.findIndex(c => c.id === question.id));
    const cardTotal = cardsInSkill.length || 1;
    const label = skillId ? skillLabel(chapter.id, skillId) : "Exam question";

    const head = el("div", "chap-head exam-play-head");
    head.innerHTML = `<div><span class="eyebrow">${(chapter && chapter.icon) || ""} ${(chapter && chapter.name) || ""}</span><h1>${label}</h1>
        <p class="exam-card-of muted small">${t("cardOf", cardIdx + 1, cardTotal)} · ${question.marks} marks</p></div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="link-btn back" aria-label="Back">←</button>
      </div>`;
    head.querySelector(".back").addEventListener("click", onBack);
    root.appendChild(head);

    root.appendChild(el("div", "exam-opener", t("opener")));

    // INTRO (EXAM-SKILLS-BRIEF.md data shape): the GIVEN information a
    // card's own first part no longer carries, on its own paper-white
    // panel above the whole part chain — shown regardless of load state
    // (it's static, no need to wait on the progress round trip).
    if (question.intro) root.appendChild(el("div", "exam-intro", richHtml(question.intro)));

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
      // ANOTHER ONE! / THAT'S ENOUGH FOR NOW (her ruling, 2026-08-22):
      // the learner decides when to stop — no finish line, no forced
      // count. "Another" walks examQuestionsForTopic's order, wrapping
      // (with a toast) back to the first card — including a skill with
      // only one card, which just replays itself, toast and all.
      const actions = el("div", "exam-complete-actions");
      const anotherBtn = el("button", "btn primary big exam-another-btn", t("anotherBtn"));
      anotherBtn.addEventListener("click", () => {
        const idx = cardsInSkill.findIndex(c => c.id === question.id);
        const fromIdx = idx === -1 ? 0 : idx;
        const nextIdx = cardsInSkill.length ? (fromIdx + 1) % cardsInSkill.length : 0;
        if (nextIdx === 0) showToast(t("allSeen"));
        const nextCard = cardsInSkill[nextIdx] || question;
        app.go("examPlay", { chapter, skillId, question: nextCard, accent, onBack });
      });
      const enoughBtn = el("button", "btn ghost big exam-enough-btn", t("enoughBtn"));
      enoughBtn.addEventListener("click", onBack);
      actions.appendChild(anotherBtn);
      actions.appendChild(enoughBtn);
      done.appendChild(actions);
      root.appendChild(done);
    }
  }

  redraw();
  loadProgress();
}
