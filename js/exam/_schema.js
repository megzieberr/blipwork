/* ============================================================
   EXAM FOCUS — seeded-question data shape + validator
   (EXAM-FOCUS-PLAN.md, session 0 infrastructure build, 2026-08-21).
   ------------------------------------------------------------
   The exam focus tab is a CURATED SHELF, not a generator (unlike the
   🎲 dice — see js/dice.js's header for that contrast). Every question is
   hand-authored, seeded once, and imported both by js/exam/index.js's
   registry (real content, session 1+) and this file's validateQuestion()
   (checked by verify-exam.html, and reusable by a future seeding session
   before a question ever reaches the registry).

   One module per question. See js/exam/_harness-stub.js for a fully
   worked reference example (HARNESS-ONLY — never registered, never
   learner-reachable — see that file's own header).

   Every learner-facing text field is a { en, af } pair — her AF wording
   rules apply to every `af` string (no "frase"; "Trek"/"Skuif" for drag,
   "Klik op" for taps; reasons in words) even though nothing in this tab
   is draggable or tappable — the convention travels with the pair, not
   the interaction.

   ---------------------------------------------------------------
   QUESTION
     id         string, unique across the WHOLE exam bank (every chapter)
     chapter    one of js/config.js CHAPTERS[].id
     topic      string slug — coverage/nav grouping within the chapter.
                Display label is title-cased from the slug by
                js/exam/index.js unless a future seeding session decides
                a real label is worth carrying alongside it.
     archetype  string — the paper-bank archetype tag this question is
                composed from (coverage tracking only; NEVER shown to
                a learner).
     marks      number — MUST equal the sum of every part's marks.
     parts      Part[], at least one.

   PART
     id      string, unique WITHIN the question (the sub-part letter,
             e.g. "a","b","c" — also the identifier the server's
             mhq_exam_open_part RPC records a reveal against).
     marks   number.
     level   1-4. The ★ badge and "bank the earlier marks first" line are
             DERIVED at render time from level === 4 — nothing here
             stores them separately, so they can never drift out of sync
             with the level.
     prompt  {en,af} — HTML. Real minus (−, U+2212), decimal comma.
     hint    {en,af} — shown on "I'm stuck"; never advances the part,
             never recorded server-side (hints are local-only — the
             server only ever hears about a DONE reveal).
     memo    MemoBlock[] — the reveal, rendered in order.
     esplain {en,af} — the 🤔 plain-words walkthrough (the deeper why,
             beyond the memo's method).

   MEMO BLOCK — one of three typed shapes:
     { type:"step",   text:{en,af}, ticks:[...] }
       a worked-method line. `ticks` are the mark-earning ticks THIS
       line carries, in order — zero or more.
     { type:"answer", text:{en,af}, ticks:[...] }
       the ANSWER bar — usually the line carrying the part's final ✓a.
     { type:"trap",   text:{en,af} }
       the amber REMEMBER card. Optional — only present where the
       archetype actually has a common trap. Never carries ticks (a
       trap is a warning, not a mark).

   TICK LANGUAGE (her house style — see EXAM-FOCUS-PLAN.md): every tick
   in a `ticks` array is one of:
     "a"    — answer
     "ca"   — consequential accuracy (follow-through)
     "s/f"  — substitution / formula
   Every tick across a part's step+answer blocks MUST sum (by COUNT, one
   tick = one mark) to that part's `marks` — this is what keeps a memo
   honest against its own mark allocation, and is validated below.
   ---------------------------------------------------------------

   SCOPE WALLS (paper-bank hard bounds — e.g. "no annuities", "trig graphs
   max two parameters") are a per-chapter, per-seeding-session concern
   read from Desktop\Eksamen Vraestelle\Gr11 IEB Nov\GR11-IEB-PAPER-BANK.md
   — a document outside this repo, and outside this infrastructure
   session's scope (the registry is empty; there is nothing seeded yet to
   check a scope wall against). validateQuestion() below does NOT check
   scope walls for that reason — a future seeding session is the one that
   can actually verify a topic against its chapter's wall, and should add
   that check when it lands real content.
   ============================================================ */

const ALLOWED_TICKS = new Set(["a", "ca", "s/f"]);
const ALLOWED_MEMO_TYPES = new Set(["step", "answer", "trap"]);

function isNonEmptyString(v) { return typeof v === "string" && v.trim().length > 0; }

/* A {en,af} pair: both sides present and non-empty. Partial pairs (one
   language seeded, the other not) are exactly the drift EN+AF-from-day-one
   is meant to prevent — flagged as an issue, not silently tolerated. */
function isTextPair(v, label, issues) {
  if (!v || typeof v !== "object") { issues.push(`${label}: missing {en,af} pair`); return false; }
  let ok = true;
  if (!isNonEmptyString(v.en)) { issues.push(`${label}.en: missing or empty`); ok = false; }
  if (!isNonEmptyString(v.af)) { issues.push(`${label}.af: missing or empty`); ok = false; }
  return ok;
}

/* Glyph hygiene, mirrors the dice harness's dot-decimal regression guard
   (verify-dice.html) plus the repo's "real minus, not a hyphen" rule
   (CLAUDE.md gotcha #5) and the AF wording rule against "frase". Checked
   on both `en` and `af` sides of a pair. The hyphen check is a heuristic
   (a hyphen immediately before a digit) — good enough for hand-authored
   maths prose, where a real negative number is the only thing that
   pattern legitimately matches. */
function glyphIssues(v, label, issues) {
  if (!v) return;
  for (const lang of ["en", "af"]) {
    const s = v[lang];
    if (typeof s !== "string") continue;
    if (/\d\.\d/.test(s)) issues.push(`${label}.${lang}: contains a dot-decimal number (should be comma, e.g. 0,42)`);
    if (/-\d/.test(s)) issues.push(`${label}.${lang}: contains a hyphen directly before a digit (should be the real minus sign −, U+2212)`);
    if (lang === "af" && /\bfrase\b/i.test(s)) issues.push(`${label}.af: contains the banned word "frase"`);
  }
}

function validateMemoBlock(block, partId, idx, issues) {
  const label = `part "${partId}" memo[${idx}]`;
  if (!block || typeof block !== "object" || !ALLOWED_MEMO_TYPES.has(block.type)) {
    issues.push(`${label}: type must be one of step/answer/trap, got "${block && block.type}"`);
    return 0;
  }
  isTextPair(block.text, `${label}.text`, issues);
  glyphIssues(block.text, `${label}.text`, issues);
  if (block.type === "trap") {
    if (Array.isArray(block.ticks) && block.ticks.length) issues.push(`${label}: a trap card must not carry ticks (it's a warning, not a mark)`);
    return 0;
  }
  const ticks = Array.isArray(block.ticks) ? block.ticks : [];
  ticks.forEach(t => { if (!ALLOWED_TICKS.has(t)) issues.push(`${label}: unknown tick "${t}" (allowed: a, ca, s/f)`); });
  return ticks.length;
}

function validatePart(part, qid, issues, seenIds) {
  if (!part || typeof part !== "object") { issues.push("a part is missing or not an object"); return 0; }
  const label = `question "${qid}" part "${part.id}"`;
  if (!isNonEmptyString(part.id)) issues.push(`${label}: missing id`);
  else if (seenIds.has(part.id)) issues.push(`${label}: duplicate part id within this question`);
  else seenIds.add(part.id);

  if (typeof part.marks !== "number" || part.marks <= 0) issues.push(`${label}: marks must be a positive number`);
  if (![1, 2, 3, 4].includes(part.level)) issues.push(`${label}: level must be 1, 2, 3 or 4 (got ${part.level})`);

  isTextPair(part.prompt, `${label}.prompt`, issues); glyphIssues(part.prompt, `${label}.prompt`, issues);
  isTextPair(part.hint, `${label}.hint`, issues); glyphIssues(part.hint, `${label}.hint`, issues);
  isTextPair(part.esplain, `${label}.esplain`, issues); glyphIssues(part.esplain, `${label}.esplain`, issues);

  if (!Array.isArray(part.memo) || !part.memo.length) {
    issues.push(`${label}: memo must be a non-empty array`);
    return 0;
  }
  let tickTotal = 0;
  part.memo.forEach((block, i) => { tickTotal += validateMemoBlock(block, part.id, i, issues); });
  if (typeof part.marks === "number" && tickTotal !== part.marks) {
    issues.push(`${label}: memo ticks sum to ${tickTotal}, but the part is worth ${part.marks}`);
  }
  return typeof part.marks === "number" ? part.marks : 0;
}

/* The one function both a future seeding session and this build's harness
   (verify-exam.html) import — checked in exactly one place, per the
   brief, so the two can never drift apart. Returns {ok, issues}. */
export function validateQuestion(q) {
  const issues = [];
  if (!q || typeof q !== "object") return { ok: false, issues: ["question is missing or not an object"] };

  if (!isNonEmptyString(q.id)) issues.push("question: missing id");
  if (!isNonEmptyString(q.chapter)) issues.push(`question "${q.id}": missing chapter`);
  if (!isNonEmptyString(q.topic)) issues.push(`question "${q.id}": missing topic`);
  if (!isNonEmptyString(q.archetype)) issues.push(`question "${q.id}": missing archetype tag`);
  if (typeof q.marks !== "number" || q.marks <= 0) issues.push(`question "${q.id}": marks must be a positive number`);

  if (!Array.isArray(q.parts) || !q.parts.length) {
    issues.push(`question "${q.id}": parts must be a non-empty array`);
    return { ok: issues.length === 0, issues };
  }

  const seenIds = new Set();
  let markTotal = 0;
  q.parts.forEach(part => { markTotal += validatePart(part, q.id, issues, seenIds); });
  if (typeof q.marks === "number" && markTotal !== q.marks) {
    issues.push(`question "${q.id}": parts sum to ${markTotal} marks, but the question is worth ${q.marks}`);
  }

  return { ok: issues.length === 0, issues };
}
