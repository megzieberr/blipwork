/* ============================================================
   verify-exam-skills.html — HARNESS-ONLY fixture module.
   (EXAM-SKILLS-BRIEF.md, Session B, 2026-08-22.)
   ------------------------------------------------------------
   Session A owns js/exam/skills.js (new) and the examFirstCardForSkill
   addition to js/exam/index.js — neither exists yet while this session
   builds in parallel, and this session must never create/edit either
   file (brief: "stub js/exam/skills.js LOCALLY IN YOUR HARNESS ONLY …
   never by creating skills.js yourself"). This file is that stub, kept
   OUTSIDE js/exam/ entirely so nothing under that folder is touched.

   It is never imported by the real app. verify-exam-skills.html alone
   wires it into place with a <script type="importmap"> that remaps the
   two specifiers js/screens.js and js/exam-play.js actually import
   ("./exam/skills.js" and — for the two functions this build needs —
   "./exam/index.js") to this file, for THIS PAGE ONLY. The production
   modules are otherwise loaded completely unmodified: same posture as
   js/exam/_harness-stub.js driving the real renderExamPlay() directly,
   just one level up (mocking the two modules that hand renderExamPlay
   its data, instead of mocking the data itself).

   Fixture shape: one chapter ("eqn", a real js/config.js chapter so
   accent/name/icon all resolve), two skills —
     "harness-skill-a": 2 cards (enough to prove tile-tap picks the
        first NOT-completed one, "Card k of n", and Another's order +
        wrap) — card 1's part (a) prompt carries a bare "12/13" to prove
        fracHtml renders it as a stacked fraction at render time.
     "harness-skill-b": 0 cards — proves the "coming soon" / un-tappable
        tile state.
   Freshly composed content (never verbatim IEB/vendor text). */

const CARD_A1 = {
  id: "harness.skill.a.c1", chapter: "eqn", topic: "harness-skill-a",
  archetype: "HARNESS_ONLY_FIXTURE", marks: 5,
  lostQuest: { chapter: "eqn", quest: "eq1" },
  // Deliberately just "12/13", not "12/13 x" — js/ui.js's fracHtml (not
  // owned by this session) swallows a bare trailing variable letter into
  // the denominator when it's adjacent to a fraction ("12/13 x" stacks
  // as 12 over "13 x"). Flagged in the build report for Session A's
  // content authoring; not this harness's job to work around further.
  intro: {
    en: "Given: the gradient of the line is 12/13.",
    af: "Gegee: die gradiënt van die lyn is 12/13.",
  },
  parts: [
    {
      id: "a", marks: 2, level: 1,
      prompt: { en: "Simplify 12/13 × 2.", af: "Vereenvoudig 12/13 × 2." },
      hint: { en: "Multiply the numerator by 2, leave the denominator.", af: "Vermenigvuldig die teller met 2, los die noemer." },
      memo: [
        { type: "step", text: { en: "12/13 × 2 = 24/13", af: "12/13 × 2 = 24/13" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "24/13", af: "24/13" }, ticks: ["a"] },
      ],
      esplain: { en: "A fraction times a whole number just scales the top.", af: "'n Breuk maal 'n heelgetal skaal net die bo-gedeelte." },
    },
    {
      id: "b", marks: 3, level: 2,
      prompt: { en: "Solve for x: f(x) = 0.", af: "Los op vir x: f(x) = 0." },
      hint: { en: "Set 12/13 x + 1 = 0 and isolate x.", af: "Stel 12/13 x + 1 = 0 en isoleer x." },
      memo: [
        { type: "step", text: { en: "12/13 x = −1", af: "12/13 x = −1" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x = −13/12", af: "x = −13/12" }, ticks: ["a", "ca"] },
      ],
      esplain: { en: "Move the constant, then multiply by the reciprocal.", af: "Skuif die konstante, vermenigvuldig dan met die resiproke." },
    },
  ],
};

const CARD_A2 = {
  id: "harness.skill.a.c2", chapter: "eqn", topic: "harness-skill-a",
  archetype: "HARNESS_ONLY_FIXTURE", marks: 4,
  lostQuest: { chapter: "eqn", quest: "eq1" },
  parts: [
    {
      id: "a", marks: 4, level: 1,
      prompt: { en: "This is the second card in the skill — just here to prove Another one! lands on it.", af: "Dit is die tweede kaart in die vaardigheid." },
      hint: { en: "No hint needed — this is a harness fixture.", af: "Geen wenk nodig nie — dit is 'n fixture." },
      memo: [{ type: "answer", text: { en: "Fixture card 2, revealed.", af: "Fixture kaart 2, gewys." }, ticks: ["a", "a", "a", "a"] }],
      esplain: { en: "Nothing to explain — fixture only.", af: "Niks om te verduidelik nie — net 'n fixture." },
    },
  ],
};

const SKILLS = {
  eqn: [
    { id: "harness-skill-a", label: "Harness Skill A" },
    { id: "harness-skill-b", label: "Harness Skill B" },
  ],
};
const CARDS = { "harness-skill-a": [CARD_A1, CARD_A2], "harness-skill-b": [] };

/* ---- js/exam/skills.js shape (Session A) ---- */
export function skillsForChapter(chapterId) { return SKILLS[chapterId] || []; }
export function skillLabel(chapterId, skillId) {
  const found = (SKILLS[chapterId] || []).find(s => s.id === skillId);
  if (found) return found.label;
  return String(skillId || "").replace(/[-_]+/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

/* Added 2026-08-23: js/screens.js now imports isLevel4Skill from the
   real js/exam/skills.js (the Level 4 tile renders last and full-width),
   and this page remaps that specifier here — so the stub has to export
   it too or the whole page fails to load. Same one-line rule as the real
   module; this fixture has no level-4 skill, so it always returns false. */
export function isLevel4Skill(skillId) { return skillId === "level-4"; }

/* ---- js/exam/index.js additions (Session A) — only the two names
   js/screens.js + js/exam-play.js actually import from that module. ---- */
export function examQuestionsForTopic(chapterId, topicId) {
  return CARDS[topicId] ? CARDS[topicId].slice() : [];
}
export function examFirstCardForSkill(chapterId, skillId, progressMap) {
  const cards = CARDS[skillId] || [];
  const pm = progressMap || {};
  const notDone = cards.find(c => !(pm[c.id] && pm[c.id].completed));
  return notDone || cards[0] || null;
}

export { CARD_A1, CARD_A2 };
