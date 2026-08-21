/* ============================================================
   DICE PLAY — orchestrates one dice round on top of js/play.js's
   existing renderPlay (DICE-PLAN.md, session 0b build, 2026-08-21).
   ------------------------------------------------------------
   Deals a fresh round (coverage-first, see js/dice.js) OR resumes an
   in-progress one from the server's saved state, builds the small
   `dice` options object play.js's renderPlay understands, and routes
   into the SAME "play" screen static rounds use. Nothing here forks
   play.js — see its `dice` param for the few branches this drives.
   ============================================================ */
import { api } from "./api.js";
import { getSession } from "./session.js";
import { questAccent } from "./config.js";
import { dicePool } from "./quests/dice-pools.js";
import { newRoundSeed, dealRound } from "./dice.js";

/* Entry point: the chapter screen's 🎲 card calls this. Deals or
   resumes, then app.go("play", ...) with a `dice` params object.
   Safe to call even if the chapter has no pool wired yet (no-op). */
export async function openDiceRound(app, chapter) {
  const pool = dicePool(chapter.id);
  if (!pool) return;                               // not wired yet — the chapter card shouldn't show, but stay safe
  const sess = getSession();
  if (!sess) return;

  const stateDice = (app.state && app.state.dice) || {};
  const chDice = stateDice[chapter.id] || { plays: 0, metKinds: [], save: null };
  const accent = questAccent(chapter);

  let roundSeed, skillIds, kinds, resumeIndex, resumeAnswered, resumeXp;
  const save = chDice.save;
  const validResume = save && Array.isArray(save.skillIds) && save.skillIds.length
    && Number.isInteger(save.index) && save.roundSeed != null;

  if (validResume && save.index < save.skillIds.length) {
    // resume mid-round — same skillIds/roundSeed, so genAt() reproduces
    // every already-answered question identically, and the next one too.
    roundSeed = save.roundSeed;
    skillIds = save.skillIds;
    kinds = (Array.isArray(save.kinds) && save.kinds.length === skillIds.length) ? save.kinds : skillIds;
    resumeIndex = save.index;
    resumeAnswered = Array.isArray(save.answeredCorrect) ? save.answeredCorrect.slice() : [];
    resumeXp = typeof save.xpEarned === "number" ? save.xpEarned : 0;
  } else if (validResume && save.index >= save.skillIds.length) {
    // every question was answered but the round was never submitted
    // (closed the tab between the last answer and submit) — pay it out
    // now instead of re-showing an out-of-range question.
    await finishDice(app, chapter, accent, sess, save.answeredCorrect || []);
    return;
  } else {
    // fresh deal — coverage-first per DICE-PLAN (unmet kinds first, then
    // fully random once every kind has been met at least once).
    roundSeed = newRoundSeed();
    const dealt = dealRound(pool.entries, pool.roundLength, chDice.metKinds || []);
    skillIds = dealt.map(e => e.skillId);
    kinds = dealt.map(e => e.kind);
    resumeIndex = 0; resumeAnswered = []; resumeXp = 0;
    try {
      await api.diceSave(sess.username, sess.password, chapter.id, {
        chapter: chapter.id, roundSeed, skillIds, kinds, index: 0, answeredCorrect: [], xpEarned: 0,
      });
    } catch { /* offline — the round still plays; resume just won't have a checkpoint */ }
  }

  const byId = new Map(pool.entries.map(e => [e.skillId, e]));
  const defSkills = skillIds.map(id => {
    const entry = byId.get(id);
    // pool changed shape since this round was dealt (shouldn't happen once
    // recipes are stable) — fall back to a no-op-safe placeholder rather
    // than crash mid-round.
    return entry
      ? { id: entry.skillId, concept: entry.concept || null, gen: entry.gen }
      : { id, concept: null, gen: () => ({ type: "mc", concept: null, prompt: "This question isn't available any more.", options: [{ label: "Continue", correct: true }] }) };
  });

  const dice = {
    chapterId: chapter.id, roundSeed, skillIds,
    resumeIndex, resumeAnswered, resumeXp,
    answeredCorrect: resumeAnswered.slice(),
    async recordAnswer(index, ok, xpSoFar) {
      this.answeredCorrect[index] = ok;
      try {
        await api.diceSave(sess.username, sess.password, chapter.id, {
          chapter: chapter.id, roundSeed, skillIds, kinds, index: index + 1,
          answeredCorrect: this.answeredCorrect.slice(), xpEarned: xpSoFar,
        });
      } catch { /* best-effort checkpoint — a lost save only costs a re-deal, never progress already paid */ }
    },
    async finish(st) {
      await finishDice(app, chapter, accent, sess, this.answeredCorrect, st);
    },
  };

  app.go("play", {
    chapter, accent, dice,
    quest: { id: "dice", n: "🎲", title: `${chapter.name} · Dice round` },
    def: { skills: defSkills },
  });
}

/* Pays out and shows the dice results screen. The server recomputes XP
   from the stored answeredCorrect[] itself (mhq_submit_dice takes no
   amount from the client — DICE-PLAN's "never names an amount" rule);
   `st` (from play.js's finish()) is only used for the on-screen
   correct/total count when available, never trusted for payment. */
async function finishDice(app, chapter, accent, sess, answeredCorrect, st) {
  let res;
  try { res = await api.submitDice(sess.username, sess.password, chapter.id); }
  catch { res = { ok: false }; }
  await app.refresh();
  const correct = st ? st.firstTry : answeredCorrect.filter(Boolean).length;
  const total = st ? st.total : answeredCorrect.length;
  app.go("results", {
    dice: true, chapter, accent, correct, total,
    ok: !!(res && res.ok),
    xpAwarded: (res && res.ok && typeof res.xpAwarded === "number") ? res.xpAwarded : 0,
    goldAwarded: (res && res.ok && typeof res.goldAwarded === "number") ? res.goldAwarded : 0,
    levelUp: !!(res && res.ok && res.levelUp),
    level: (res && res.ok && res.levelInfo && res.levelInfo.level) || null,
  });
}
