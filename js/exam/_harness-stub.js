/* ============================================================
   EXAM FOCUS — HARNESS-ONLY stub question. NOT a real seeded question.
   (EXAM-FOCUS-PLAN.md, session 0 infrastructure build, 2026-08-21.)
   ------------------------------------------------------------
   Proves the exam-focus infrastructure loop (part-by-part reveal, the
   colour-memo renderer, ★ level-4 handling, EN/AF, the local-backend
   round-trip, XP/gold pay-once) end to end before a real paper-build
   session seeds real content (js/quests/dice-stub.js is the same idea
   for the 🎲 dice — see its header).

   ⚠️ DELIBERATELY NOT REGISTERED in js/exam/index.js's REGISTRY — a
   stub must stay unreachable through normal navigation even once a
   chapter's real questions land. Only verify-exam.html imports this
   file, and it drives js/exam-play.js's renderExamPlay() directly with
   this object (mirrors verify-dice.html's makeHarness(), which drives
   the real renderPlay() with a fake `dice` object rather than going
   through app routing).

   Freshly composed content (public repo — never verbatim IEB/vendor
   text), Grade 11 Statistics, no Euclidean geometry. Exercises every
   memo block type (step/answer/trap), all four levels (so the ★ badge
   is checkable on exactly one part), and a chain where (b)/(c)/(d) each
   read an earlier part's revealed answer — the "sub-answers later parts
   reuse" chain-visibility rule.
   ============================================================ */
export const stubQuestion = {
  id: "harness.stub.q1",
  chapter: "stats",
  topic: "harness-stub",
  archetype: "HARNESS_ONLY_FIXTURE",
  // structural fixture only (schema requires lostQuest — session E,
  // 2026-08-21); q2 "Centre & spread" is real and DEFAULT_OPEN in local
  // mode, so a harness driving this stub can exercise the "I'm lost"
  // link's routing without needing a real seeded-content match.
  lostQuest: { chapter: "stats", quest: "q2" },
  marks: 12,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: `The five reaction times below (in seconds) were recorded for one learner:<br><span class="num">0,42 ; 0,38 ; 0,51 ; 0,45 ; 0,39</span><br>Write down the number of data values, n.`,
        af: `Die vyf reaksietye hieronder (in sekondes) is vir een leerder aangeteken:<br><span class="num">0,42 ; 0,38 ; 0,51 ; 0,45 ; 0,39</span><br>Skryf die aantal datawaardes, n, neer.`,
      },
      hint: {
        en: "Count every value in the list — that count IS n.",
        af: "Tel elke waarde in die lys — daardie telling IS n.",
      },
      memo: [
        { type: "step", text: { en: "n = the number of values in the list", af: "n = die aantal waardes in die lys" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "n = 5", af: "n = 5" }, ticks: ["a"] },
      ],
      esplain: {
        en: "n just means 'how many'. You're not calculating anything here — you're counting the values you were given, once each.",
        af: "n beteken net 'hoeveel'. Jy bereken niks hier nie — jy tel net die waardes wat jy gekry het, elkeen een keer.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Calculate the mean reaction time, correct to 2 decimal places.",
        af: "Bereken die gemiddelde reaksietyd, korrek tot 2 desimale plekke.",
      },
      hint: {
        en: "Add every value, then divide by n from (a).",
        af: "Tel elke waarde bymekaar, en deel dan deur n van (a).",
      },
      memo: [
        { type: "step", text: { en: "sum = 0,42 + 0,38 + 0,51 + 0,45 + 0,39 = 2,15", af: "som = 0,42 + 0,38 + 0,51 + 0,45 + 0,39 = 2,15" }, ticks: ["s/f"] },
        { type: "step", text: { en: "mean = 2,15 ÷ n = 2,15 ÷ 5", af: "gemiddeld = 2,15 ÷ n = 2,15 ÷ 5" }, ticks: ["ca"] },
        { type: "answer", text: { en: "mean = 0,43 s", af: "gemiddeld = 0,43 s" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Mean = add everything up, then share it out evenly over how many values there were. That's literally what ÷ n does — it's the 'if everyone got the same time' number.",
        af: "Gemiddeld = tel alles bymekaar, en deel dit dan gelyk uit oor hoeveel waardes daar was. Dit is letterlik wat ÷ n doen — dit is die 'as elkeen dieselfde tyd gekry het' getal.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 3,
      prompt: {
        en: "One more time, 0,90 s, is added to the data set. State, without further calculation, whether the mean from (b) will increase, decrease or stay the same, and explain why.",
        af: "Nog een tyd, 0,90 s, word by die datastel gevoeg. Sê, sonder verdere berekening, of die gemiddeld van (b) sal toeneem, afneem of dieselfde bly, en verduidelik hoekom.",
      },
      hint: {
        en: "Compare the new value to the mean you already found — is it bigger or smaller?",
        af: "Vergelyk die nuwe waarde met die gemiddeld wat jy reeds gekry het — is dit groter of kleiner?",
      },
      memo: [
        { type: "step", text: { en: "compare 0,90 s to the mean from (b), 0,43 s", af: "vergelyk 0,90 s met die gemiddeld van (b), 0,43 s" }, ticks: ["ca"] },
        { type: "answer", text: { en: "0,90 s is bigger than the mean, so adding it will INCREASE the mean", af: "0,90 s is groter as die gemiddeld, dus sal dit die gemiddeld LAAT TOENEEM" }, ticks: ["a", "ca"] },
        { type: "trap", text: {
          en: "REMEMBER: a new value only pulls the mean UP if it's bigger than the CURRENT mean — check that first, ten seconds, and the direction of your answer is safe.",
          af: "ONTHOU: 'n nuwe waarde trek die gemiddeld net OP as dit groter is as die HUIDIGE gemiddeld — kyk eers daarna, tien sekondes, en die rigting van jou antwoord is veilig.",
        } },
      ],
      esplain: {
        en: "You never need to redo the whole sum for this kind of question. One new value either pulls the average toward itself or away from it — just ask 'is the new one above or below where the average already sits?'",
        af: "Jy hoef nooit die hele som oor te doen vir hierdie tipe vraag nie. Een nuwe waarde trek die gemiddeld óf na homself toe óf weg daarvan — vra net 'is die nuwe een bo of onder waar die gemiddeld reeds is?'",
      },
    },
    {
      id: "d",
      marks: 4,
      level: 4,
      prompt: {
        en: "The standard deviation of the ORIGINAL 5 values (before (c)'s extra time was added) is 0,053 s. Using your answers to (a) and (b), determine how many of the original 5 values lie within one standard deviation of the mean. Show your reasoning.",
        af: "Die standaardafwyking van die OORSPRONKLIKE 5 waardes (voor (c) se ekstra tyd bygevoeg is) is 0,053 s. Gebruik jou antwoorde vir (a) en (b) om te bepaal hoeveel van die oorspronklike 5 waardes binne een standaardafwyking van die gemiddeld lê. Toon jou redenasie.",
      },
      hint: {
        en: "Find the interval [mean − sd ; mean + sd] first, then count how many of the 5 original values fall inside it.",
        af: "Vind eers die interval [gemiddeld − sa ; gemiddeld + sa], en tel dan hoeveel van die 5 oorspronklike waardes daarbinne val.",
      },
      memo: [
        { type: "step", text: { en: "interval = 0,43 − 0,053 to 0,43 + 0,053", af: "interval = 0,43 − 0,053 tot 0,43 + 0,053" }, ticks: ["s/f", "ca"] },
        { type: "step", text: { en: "interval ≈ 0,377 s to 0,483 s", af: "interval ≈ 0,377 s tot 0,483 s" }, ticks: ["ca"] },
        { type: "answer", text: { en: "0,38 ; 0,39 ; 0,42 and 0,45 fall inside it — 4 of the 5 values", af: "0,38 ; 0,39 ; 0,42 en 0,45 val daarbinne — 4 van die 5 waardes" }, ticks: ["a"] },
      ],
      esplain: {
        en: "'Within one standard deviation' just means inside a window centred on the mean, one sd wide on each side. Build the window first (mean ± sd), THEN go back to the original list and count who's inside it.",
        af: "'Binne een standaardafwyking' beteken net binne 'n venster wat op die gemiddeld gesentreer is, een sa breed aan elke kant. Bou eers die venster (gemiddeld ± sa), gaan dán terug na die oorspronklike lys en tel wie daarbinne is.",
      },
    },
  ],
};
