/* ============================================================
   EXAM FOCUS — SKILL CARDS: the cutter
   (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22 — her ruling that evening:
   Exam Focus became "too sudden", a whole five-part practice-paper
   question dropped on a learner with no title saying what skill is
   being practised. So the tab becomes SKILL ROUNDS: chapter → skill
   tiles → one short CARD at a time, then "Another one!" / "That's
   enough for now".)
   ------------------------------------------------------------
   Nothing here composes new maths. The 21 seeded questions in
   js/exam/*.js stay EXACTLY as they were written (they are the content
   source of truth, and they are still the files verify-exam-modules.mjs
   recomputes against); this file only CUTS them into cards along the
   lines she drew:

     · dependent parts stay together on ONE card, as (a)/(b) — "if one
       question depends on another, keep them together";
     · independent parts split into their own cards;
     · a card must read as a complete question ON ITS OWN, which is what
       the hand-written `intro` is for.

   A CARD IS AN ORDINARY QUESTION. It passes validateQuestion()
   unchanged — same id/chapter/topic/archetype/marks/lostQuest/parts
   shape — so every screen, the player, the server RPC and the whole
   harness keep working without knowing cards exist. Two optional fields
   are all that mark it as one:

     source  { questionId, partIds }  — where it was cut from
     intro   { en }                   — the given information, hand-written

   `topic` carries the SKILL id, which is what makes examTopicsForChapter
   / examQuestionsForTopic keep doing the right thing for skill tiles.

   PART OBJECTS ARE COPIED, NOT SHARED. One source part (func.hyp.t2q3
   part c) deliberately appears on two different cards — the shift card
   on its own, and the inequalities card where (d) needs h — so a shared
   object reference would be a booby trap the first time anything writes
   to a part. Each card gets its own shallow copy.

   MARKS are summed from the included parts, never carried over from the
   source question — a card carrying two of five parts is worth two of
   five parts' marks, and validateQuestion() enforces exactly that.
   ============================================================ */

/* The diagram block, narrowed to the parts this card actually carries.
   Returns undefined when the source has no diagram, or when none of its
   per-part entries survived the cut (a card with a spec but no part
   entries would fail validateDiagram's "parts must be an object" rule
   in spirit and render nothing in practice). */
function cutDiagram(from, partIds) {
  const d = from.diagram;
  if (!d) return undefined;
  const parts = {};
  partIds.forEach(pid => { if (d.parts && d.parts[pid]) parts[pid] = d.parts[pid]; });
  if (!Object.keys(parts).length) return undefined;
  const out = { parts };
  if (d.spec) out.spec = d.spec;
  return out;
}

/* makeCard({ id?, skill, from, parts, intro })
     skill   the skill id — becomes the card's `topic`
     from    the SOURCE question object (imported from its own module)
     parts   array of source part ids, in the order they should appear
     intro   optional {en} — the given information (see the header)
     id      optional override; defaults to `<source id>.<part ids joined>`,
             e.g. func.hyp.t1q4.a  ·  eqn.nor.q1.abcd
   Throws on a part id the source doesn't have: a typo in a grouping
   table must fail at import, not silently drop a part. */
export function makeCard({ id, skill, from, parts, intro }) {
  if (!from || !Array.isArray(from.parts)) throw new Error(`makeCard: "from" is not a seeded question (skill "${skill}")`);
  if (!Array.isArray(parts) || !parts.length) throw new Error(`makeCard: no part ids given for "${from.id}" (skill "${skill}")`);

  const chosen = parts.map(pid => {
    const p = from.parts.find(pp => pp.id === pid);
    if (!p) throw new Error(`makeCard: question "${from.id}" has no part "${pid}" (skill "${skill}")`);
    return { ...p };
  });

  const card = {
    id: id || `${from.id}.${parts.join("")}`,
    chapter: from.chapter,
    topic: skill,
    archetype: from.archetype,
    paper: from.paper,
    marks: chosen.reduce((sum, p) => sum + p.marks, 0),
    lostQuest: from.lostQuest,
    source: { questionId: from.id, partIds: parts.slice() },
    parts: chosen,
  };
  if (intro) card.intro = intro;
  const diagram = cutDiagram(from, parts);
  if (diagram) card.diagram = diagram;
  return card;
}
