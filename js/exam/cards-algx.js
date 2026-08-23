/* ============================================================
   EXAM FOCUS — SKILL CARDS · Algebraic Expressions (algx)
   (EXAM-BUILD-DAY.md, 2026-08-23 — her ruling 2: "Algebraic expressions
   (Gr10 revision) gets its own exam-only chapter — that is where the
   30%-learners will earn their marks.")
   ------------------------------------------------------------
   EMPTY ON PURPOSE, for now. Session 0 (plumbing) creates the file and
   registers it so that the chapter, its six tiles and its whole
   navigation path already exist and are green before any content lands;
   WAVE 1 SESSION A is the session that fills this array.

   HOW TO FILL IT (different from every other cards-*.js in this folder):
   the older files CUT cards out of the 21 seeded practice-paper
   questions with js/exam/_cards.js's makeCard(). algx has no source
   questions and never will — its cards are composed DIRECTLY as card
   objects, exactly as EXAM-BUILD-DAY.md's "Rules every card follows"
   describes: full question shape (id / chapter / topic / archetype /
   marks / lostQuest / parts[]), no `source` field, `topic` = the tile id
   from js/exam/skills.js, id scheme `algx.sib.<abbr>.qN` and
   `algx.l4.qN`.

     · tiles: expand · factorise-basics · factorise-advanced ·
       fractions-multiply-divide · fractions-add-subtract · level-4
     · lostQuest: algx owns no drill rounds (exam-only chapter), so it
       uses the documented placeholder — js/exam-play.js renders no
       "I'm lost" button when the named quest is not open, and none of
       these ever will be.
     · method: her notes do not cover Grade-10 factorising, so
       EXAM-BUILD-DAY.md routes it to the textbook method in her voice
       ("tickets", "divorce", the ∴ habit, the four no-answer words).

   Every entry is validated at import by js/exam/index.js, so a broken
   card fails loudly the moment it is registered.
   ============================================================ */

export const algxCards = [];
