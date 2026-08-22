/* ============================================================
   PLAY LOOP (mastery loop + XP). Scores and struggle flags go to
   the backend via the api, keyed by the logged-in learner.
   ============================================================ */
import { XP, PASS } from "./config.js";
import { api } from "./api.js";
import { getSession } from "./session.js";
import { mountQuestion } from "./questions.js";
import { openConcept } from "./modal.js";
import { openCalculator } from "./calculator.js";
import { el, clear, mount, xbarHtml, fracHtml, formulaHtml } from "./ui.js";
import { genAt } from "./dice.js";

/* ------------------------------------------------------------
   XP-ONCE (General Trig discovery rounds, her ruling 2026-08-22)
   ------------------------------------------------------------
   Rounds gt1–gt3 are DISCOVERY: they teach rather than drill, so
   they pay their XP the first time through and nothing after that.
   A quest def marks itself with `xpOnce: true`; the "already done"
   flag is the progress record the server already keeps
   (progress[questId].passed, which stays true forever once earned).

   Kept as a tiny PURE function so verify-gtrig.html can test the
   decision without booting the whole app. Gold is untouched — the
   server pays that, and changing it would need a migration.
   ------------------------------------------------------------ */
export function xpToSubmit(def, progressRecord, stXp) {
  if (!def || !def.xpOnce) return stXp;
  return (progressRecord && progressRecord.passed) ? 0 : stXp;
}

/* DICE-PLAN.md (session 0b, 2026-08-21): renderPlay is reused, not forked,
   for dice rounds — params.dice (built by js/dice-play.js) is the only
   thing that changes below. When it's absent every branch here is byte-
   for-byte what it was before dice existed. See the `dice` shape in
   js/dice-play.js: { roundSeed, resumeIndex, resumeAnswered, resumeXp,
   answeredCorrect, recordAnswer(index, ok, xpSoFar), finish(st) }. */
export function renderPlay(app, host, params) {
  const { chapter, quest, def, accent, dice } = params;
  const skills = def.skills;
  const sess = getSession();

  clear(host);
  const screen = el("div", "play");
  screen.style.setProperty("--accent", accent);
  const top = el("div", "play-top");
  top.innerHTML = `<button class="link-btn quit" aria-label="Quit">✕</button>
    <div class="ptitle">${quest.n}. ${quest.title}</div>
    <button class="calc-btn" title="Calculator" aria-label="Open calculator" style="width:36px;height:36px;font-size:16px">🧮</button>
    <div class="pcount"></div>`;
  top.querySelector(".quit").addEventListener("click", () => app.go("chapter", { chapterId: chapter.id }));
  top.querySelector(".calc-btn").addEventListener("click", () => openCalculator());
  const bar = el("div", "pbar"); bar.appendChild(el("i"));
  const xpPop = el("div", "xp-pop");
  const qhost = el("div", "q-host");
  mount(screen, top, bar, xpPop, qhost);
  host.appendChild(screen);

  // Quest 1: one-time intro to the hands-on format.
  if (quest.id === "q1") {
    let seen = false;
    try { seen = localStorage.getItem("mhq.tip.q1hands") === "1"; } catch { /* ignore */ }
    if (!seen) {
      const tip = el("div", "play-tip", `Hands-on quest: do each step on the calculator, then tap <b>Check my answer</b>. Stuck? Tap 💡 Hint.`);
      const close = el("button", "tip-close", "Got it");
      const dismiss = () => { tip.remove(); try { localStorage.setItem("mhq.tip.q1hands", "1"); } catch { /* ignore */ } };
      close.addEventListener("click", dismiss);
      tip.appendChild(close);
      top.after(tip);
    }
  }

  // Dice is stat-free (DICE-PLAN ruling): no struggle flags feed the
  // teacher's panel from a generated round — only the static mastery loop
  // logs struggles. Guarded here, not in the caller, so every existing
  // logStruggle(...) call-site below stays untouched.
  const logStruggle = (concept) => { if (dice) return; try { api.logStruggle(sess.username, sess.password, concept).catch(() => {}); } catch { /* fire and forget */ } };

  // Resume: reconstruct the in-round counters from the saved answeredCorrect
  // array so the streak/first-try display picks up exactly where it left
  // off. xp is taken from the save directly (recomputing it would just
  // reproduce the same number via the same formula below).
  let initI = 0, initFirstTry = 0, initXp = 0, initStreak = 0;
  if (dice) {
    initI = dice.resumeIndex || 0;
    const ans = dice.resumeAnswered || [];
    initFirstTry = ans.filter(Boolean).length;
    initXp = dice.resumeXp || 0;
    for (let k = ans.length - 1; k >= 0 && ans[k]; k--) initStreak++;
  }
  const st = { i: initI, firstTry: initFirstTry, xp: initXp, streak: initStreak, total: skills.length };
  let attempt = 0;

  function showSkill() {
    attempt = 0;
    firstAnswered = false;
    top.querySelector(".pcount").textContent = `${st.i + 1} / ${st.total}`;
    bar.querySelector("i").style.width = Math.round((st.i / st.total) * 100) + "%";
    xpPop.textContent = ""; xpPop.className = "xp-pop";
    present();
  }

  function advance() { st.i++; window.scrollTo(0, 0); (st.i < st.total) ? showSkill() : finish(); }

  let currentQ = null;
  // dice only (session-A build, 2026-08-21): has THIS index's first answer
  // already been recorded? First-answer-counts rule — once true, any
  // further onResult/onWrong at this index is a "Try a similar one" RETRY:
  // pure practice, no XP, no dice.recordAnswer, firstTry/streak untouched.
  // Reset per-index in showSkill(), never inside present().
  let firstAnswered = false;
  function present(regen = true) {
    attempt++;
    const skill = skills[st.i];
    // dice: SEEDED regeneration (js/dice.js genAt) — the FIRST present() of
    // an index (attempt 1, salt 0) always reproduces the exact question, so
    // resume (a fresh showSkill()->present() at the saved index) is exactly
    // as before. A same-index RE-present — "Try again" after a wrong calcdo
    // answer (onRetry), or returning from "I'm lost" (onLost) — is attempt
    // 2, 3, … , salted so it rolls a genuinely different "similar one"
    // instead of the identical values genAt would otherwise reproduce
    // (playtest fix, 2026-08-21 — DICE-PLAN's "fresh numbers every roll"
    // promise). Static play is untouched (regen/currentQ path, unchanged).
    const q = dice ? genAt(dice.roundSeed, st.i, skill, attempt - 1) : (regen ? skill.gen() : currentQ);
    currentQ = q;
    if (def.stackFractions) q.stackFractions = true;   // General Trig: slashes render as stacked fractions (js/ui.js fracHtml)
    window.__Q__ = q;                          // expose current question (debug / headless checks)
    // dice is stat-free (no struggle-logged mastery loop), and only ONE
    // answer per index is ever paid or recorded (the firstAnswered gate in
    // onResult/onWrong below) — so whichever answer that is always counts
    // as "first try" for the XP bonus. Matches supabase/migration-dice.sql's
    // _mhq_dice_xp, which pays the mechanism, not a client-reported total
    // (DICE-PLAN "never names an amount").
    mountQuestion(qhost, q, {
      onResult(ok) {
        // dice retry (this index's first answer is already recorded):
        // PRACTICE only — no XP, no dice.recordAnswer, firstTry/streak
        // untouched. First-answer-counts rule, session-A build 2026-08-21.
        if (dice && firstAnswered) {
          xpPop.className = ok ? "xp-pop good" : "xp-pop bad";
          xpPop.textContent = ok ? "Got it!" : "Let’s try a similar one";
          return;
        }
        const ft = dice ? true : (attempt === 1);
        if (ok) {
          if (ft) st.firstTry++;
          st.streak++;
          const gained = XP.perCorrect * Math.min(st.streak, XP.streakCap) + (ft ? XP.firstTryBonus : 0);
          st.xp += gained;
          xpPop.className = "xp-pop good";
          xpPop.textContent = `+${gained} XP${ft ? " · FIRST TRY" : ""}`;
        } else {
          st.streak = 0;
          xpPop.className = "xp-pop bad";
          xpPop.textContent = "Let’s try a similar one";
          if (attempt >= 2) logStruggle(skill.concept);     // repeated miss on this skill
        }
        if (dice) { dice.recordAnswer(st.i, ok, st.xp); firstAnswered = true; }   // fire-and-forget checkpoint for resume
      },
      // calcdo wrong answer: break the streak (and flag a struggle on a repeat miss),
      // but keep the SAME task — the panel offers Try again / Show me the steps.
      onWrong() {
        st.streak = 0; xpPop.className = "xp-pop bad"; xpPop.textContent = "Not quite";
        if (attempt >= 2) logStruggle(skill.concept);
        // dice, same flag onResult uses: record only THIS index's first
        // answer. Closes a real hole — without this, a calcdo answer wrong
        // then retried correct hit onResult(true) and OVERWROTE the
        // recorded false with true, paying full XP on the retry.
        if (dice && !firstAnswered) { dice.recordAnswer(st.i, false, st.xp); firstAnswered = true; }
      },
      onSteps() { logStruggle(skill.concept); },
      onRetry() { window.scrollTo(0, 0); xpPop.textContent = ""; xpPop.className = "xp-pop"; present(false); },
      onContinue() { advance(); },
      // "Try a similar one" re-presents the SAME skill (mastery loop) with
      // fresh values — static via skill.gen(), dice via genAt's salted
      // regen (present() ignores `regen` in dice mode; see its comment
      // above). This IS the retry: onResult/onWrong above already gate
      // dice's XP/record on firstAnswered, so nothing here pays twice.
      onSibling() {
        window.scrollTo(0, 0); xpPop.textContent = ""; xpPop.className = "xp-pop"; present();
      },
      onLost() { logStruggle(skill.concept); openConcept(skill.concept, () => { window.scrollTo(0, 0); present(false); }); },
    });
    // dice's always-available method reveal (DICE-PLAN): a recipe MAY set
    // q.method (plain HTML). Rendered here, not in questions.js, so static
    // rounds are completely untouched by this feature. Tolerates absence.
    if (dice && q.method) {
      const mbtn = el("button", "btn ghost small", "📖 Show me the method");
      const mbox = el("div", "hint-box"); mbox.hidden = true;
      mbox.innerHTML = `<span class="tag">METHOD</span>${formulaHtml(fracHtml(xbarHtml(q.method)))}`;
      mbtn.addEventListener("click", () => { mbox.hidden = false; mbtn.disabled = true; });
      qhost.appendChild(mbtn); qhost.appendChild(mbox);
    }
  }

  async function finish() {
    bar.querySelector("i").style.width = "100%";
    // dice: no progress-table write, no score/streak/mastery bookkeeping —
    // js/dice-play.js's finish(st) calls mhq_submit_dice (server computes
    // XP from the stored answeredCorrect[]) and routes to the dice results
    // screen itself. Everything below this is the static path, unchanged.
    if (dice) { await dice.finish(st); return; }
    // discovery rounds pay once (see xpToSubmit above). st.xp is set FIRST
    // so the results screen shows the same number that gets submitted.
    st.xp = xpToSubmit(def, (app.state && app.state.progress && app.state.progress[quest.id]) || null, st.xp);
    const score = st.total ? st.firstTry / st.total : 0;
    const priorXp = (app.state && typeof app.state.xp === "number") ? app.state.xp : 0;
    let res = { badgeEarned: false, alreadyPassed: false, xpAwarded: st.xp, goldAwarded: 0, levelUp: false };
    try { res = await api.submitQuest(sess.username, sess.password, quest.id, { score, xp: st.xp, total: st.total, correct: st.firstTry }); }
    catch { /* offline — still show results locally */ }
    await app.refresh();

    const newXp = (res && typeof res.xp === "number") ? res.xp : priorXp;
    const newLevel = (res && res.levelInfo && res.levelInfo.level) || (res && res.level) || null;
    const firstUnlock = priorXp <= 0 && newXp > 0;
    // Since the 2026-07-28 store expansion several items can unlock at the
    // same level, so this names the best one and counts the rest — the old
    // `.find()` silently announced whichever happened to come first.
    let unlockedItem = null, unlockedCount = 0;
    if (res && res.levelUp && newLevel && app.state && Array.isArray(app.state.shop)) {
      const found = app.state.shop.filter(it => it.minLevel === newLevel);
      unlockedCount = found.length;
      unlockedItem = found.length
        ? found.slice().sort((a, b) => (b.price || 0) - (a.price || 0))[0].id
        : null;
    }

    app.go("results", {
      chapter, quest, accent, score, firstTry: st.firstTry, total: st.total,
      badgeEarned: !!(res && res.badgeEarned), alreadyPassed: !!(res && res.alreadyPassed),
      xpAwarded: (res && typeof res.xpAwarded === "number") ? res.xpAwarded : st.xp,
      goldAwarded: (res && typeof res.goldAwarded === "number") ? res.goldAwarded : 0,
      levelUp: !!(res && res.levelUp), level: newLevel, firstUnlock, unlockedItem, unlockedCount,
    });
  }

  showSkill();
}
