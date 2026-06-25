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
import { el, clear, mount } from "./ui.js";

export function renderPlay(app, host, params) {
  const { chapter, quest, def, accent } = params;
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

  const logStruggle = (concept) => { try { api.logStruggle(sess.name, sess.password, concept).catch(() => {}); } catch { /* fire and forget */ } };

  const st = { i: 0, firstTry: 0, xp: 0, streak: 0, total: skills.length };
  let attempt = 0;

  function showSkill() {
    attempt = 0;
    top.querySelector(".pcount").textContent = `${st.i + 1} / ${st.total}`;
    bar.querySelector("i").style.width = Math.round((st.i / st.total) * 100) + "%";
    xpPop.textContent = ""; xpPop.className = "xp-pop";
    present();
  }

  function present() {
    attempt++;
    const skill = skills[st.i];
    const q = skill.gen();
    window.__Q__ = q;                          // expose current question (debug / headless checks)
    mountQuestion(qhost, q, {
      onResult(ok) {
        if (ok) {
          const ft = attempt === 1;
          if (ft) st.firstTry++;
          st.streak++;
          const gained = XP.perCorrect * Math.min(st.streak, XP.streakCap) + (ft ? XP.firstTryBonus : 0);
          st.xp += gained;
          xpPop.className = "xp-pop good";
          xpPop.textContent = `+${gained} XP${ft ? " · first try!" : ""}`;
        } else {
          st.streak = 0;
          xpPop.className = "xp-pop bad";
          xpPop.textContent = "Let’s try a similar one";
          if (attempt >= 2) logStruggle(skill.concept);     // repeated miss on this skill
        }
      },
      onContinue() { st.i++; window.scrollTo(0, 0); (st.i < st.total) ? showSkill() : finish(); },
      onSibling() { window.scrollTo(0, 0); xpPop.textContent = ""; xpPop.className = "xp-pop"; present(); },
      onLost() { logStruggle(skill.concept); openConcept(skill.concept, () => { window.scrollTo(0, 0); present(); }); },
    });
  }

  async function finish() {
    bar.querySelector("i").style.width = "100%";
    const score = st.total ? st.firstTry / st.total : 0;
    let res = { badgeEarned: false, alreadyPassed: false };
    try { res = await api.submitQuest(sess.name, sess.password, quest.id, { score, xp: st.xp, total: st.total, correct: st.firstTry }); }
    catch { /* offline — still show results locally */ }
    await app.refresh();
    app.go("results", { chapter, quest, accent, score, xp: st.xp, firstTry: st.firstTry, total: st.total, badgeEarned: !!(res && res.badgeEarned), alreadyPassed: !!(res && res.alreadyPassed) });
  }

  showSkill();
}
