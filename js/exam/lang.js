/* ============================================================
   EXAM FOCUS — EN/AF toggle state + tab-chrome strings
   (EXAM-FOCUS-PLAN.md, session 0 infrastructure build, 2026-08-21).
   ------------------------------------------------------------
   ⚠️ NOT one of the two files the brief names under js/exam/ — split out
   as a small third file (judgement call, flagged in the build report) so
   BOTH js/screens.js's chapter/topic-list screens AND js/exam-play.js's
   player can read/set the SAME toggle and share the same fixed UI
   strings, without screens.js importing from "the player" module for
   something that isn't playing a question.

   Her kickoff ruling (2026-08-21) built an EN/AF toggle, remembered per
   device (localStorage), applying to the whole tab. SESSION E RULING
   (2026-08-21, same evening, her live review of the shipped pilot): AF
   was too much work to keep fresh for now — the tab is ENGLISH-ONLY
   until she supplies proper Afrikaans material (next year, her word).
   The toggle is GONE from every exam screen (js/screens.js's chapter/
   topic headers, js/exam-play.js's player header); getExamLang() below
   is PINNED to "en" and no longer reads localStorage. The AF string set
   below, the localStorage key, and setExamLang() all stay as DORMANT
   CODE on purpose — nothing calls setExamLang() any more, but deleting
   the machinery would turn AF's eventual return into a rebuild instead
   of a one-line re-flip. "Esplain" is her coined in-app term, not
   English or Afrikaans — it stays "Esplain" in both languages on
   purpose (her ruling: not a typo, never "fixed").
   ============================================================ */
const LS_KEY = "mhq.examLang";   // dormant — nothing writes this key any more (session E)

/* PINNED to "en" (session E, 2026-08-21, her ruling) — was a localStorage
   read. Kept as a function, not a bare constant, so every existing
   caller (js/screens.js, js/exam-play.js) needed no further change, and
   flipping AF back on later is a one-line edit here, not a re-plumb. */
export function getExamLang() { return "en"; }

/* DORMANT — no caller remains after session E's toggle removal. Left in
   place for when AF returns (her word: next year). */
export function setExamLang(lang) {
  const v = lang === "af" ? "af" : "en";
  try { localStorage.setItem(LS_KEY, v); } catch { /* private browsing etc — toggle still works for this load */ }
  return v;
}
/* Pull the right side of a {en,af} pair, tolerantly (falls back to
   whichever side exists if a pair is somehow half-seeded — the harness
   is what actually enforces both sides are always present). */
export function pick(pair, lang) {
  if (!pair) return "";
  return pair[lang] || pair.en || pair.af || "";
}

export const EXAM_UI = {
  en: {
    tabLabel: "📝 Exam Focus", tabSub: "Real exam questions, one part at a time",
    opener: "Get your book and something to write with.",
    doneBtn: "Done! Show me the answer",
    stuckBtn: "I'm stuck, give me a hint",
    hintLabel: "Hint",
    esplainBtn: "Esplain 🤔",
    starNote: "★ This is a Level 4 part — bank the earlier marks first.",
    markingFraming: "Grab your pen — mark your work like a marker would.",
    markingLaws: "<b>Two rules for marking yourself:</b> accept any correct method — her memos show routes joined by OR · follow-through — a wrong value carried correctly (✓ca) still earns the next part's method marks.",
    partOf: (i, n) => `Part ${i} of ${n}`,
    workedOf: (n, m) => `worked ${n} of ${m}`,
    questionComplete: "Question complete",
    langToggle: "EN / AF",
    noTopicsYet: "No topics seeded here yet — check back once your teacher has added some.",
    noQuestionsYet: "No questions in this topic yet.",
    backToChapters: "← Back",
    enterChapter: "Enter →",
  },
  af: {
    tabLabel: "📝 Eksamenfokus", tabSub: "Regte eksamenvrae, een deel op 'n slag",
    opener: "Kry jou boek en iets om mee te skryf.",
    doneBtn: "Klaar! Wys my die antwoord",
    stuckBtn: "Ek sit vas, gee my 'n wenk",
    hintLabel: "Wenk",
    esplainBtn: "Esplain 🤔",
    starNote: "★ Dit is 'n Vlak 4-deel — verseker eers die vorige punte.",
    markingFraming: "Vat jou pen — merk jou werk soos 'n nasiener sou.",
    markingLaws: "<b>Twee reëls om jouself te merk:</b> aanvaar enige korrekte metode — haar memoranda wys roetes met OF verbind · deurgevoerde akkuraatheid — 'n verkeerde waarde wat korrek deurgevoer word (✓ca) verdien steeds die volgende deel se metodepunte.",
    partOf: (i, n) => `Deel ${i} van ${n}`,
    workedOf: (n, m) => `${n} van ${m} gedoen`,
    questionComplete: "Vraag voltooi",
    langToggle: "EN / AF",
    noTopicsYet: "Nog geen onderwerpe hier nie — kyk weer sodra jou onderwyser dit bygevoeg het.",
    noQuestionsYet: "Nog geen vrae in hierdie onderwerp nie.",
    backToChapters: "← Terug",
    enterChapter: "Gaan in →",
  },
};

export function uiStr(lang) { return EXAM_UI[lang === "af" ? "af" : "en"]; }
