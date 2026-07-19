/* ============================================================
   TEACHER-ASSIGNED HOMEWORK — the learner-facing pinned card.
   ------------------------------------------------------------
   Phase 3 (2026-07-19). One active assignment at a time, pinned to
   the top of the hub above the chapter tabs. The teacher points at
   one already-open quest; the card is a spotlight, not a deadline.

   RULING (PHASE-3-PLAN.md §2) — NO PENALTY, NO PRESSURE.
   Blipwork's identity is a low-intimidation quick-recap tool
   (2026-07-06 ruling). So this card deliberately has:
     • no countdown ("2 days left"),
     • no overdue badge, no red state, no "you missed it",
     • no nagging repeat once it's done.
   A due date, when set, renders as a soft "by Friday" line and
   SILENTLY DISAPPEARS once the date has passed. That is the whole
   point — please don't "fix" the missing overdue styling later.

   Completion is derived server-side (a passing attempt on or after
   assigned_on), never tracked here — we just read `done`.

   Reads app.state.assignment, shape frozen in PHASE-3-PLAN.md §4.1:
     { questId, chapterId, note, assignedOn, dueOn, done }
   ============================================================ */
import { CHAPTERS, chapterById, questAccent } from "./config.js";
import { questDef } from "./quests/index.js";
import { el } from "./ui.js";

/* Resolve a quest id back to its chapter + quest metadata. chapterId from
   the server is only a hint — the id search is authoritative, so a chapter
   reshuffle in config.js can never point the card at the wrong quest. */
function locate(questId, chapterIdHint) {
  const hinted = chapterIdHint ? chapterById(chapterIdHint) : null;
  const search = hinted ? [hinted, ...CHAPTERS.filter(c => c !== hinted)] : CHAPTERS;
  for (const ch of search) {
    const q = (ch.quests || []).find(x => x.id === questId);
    if (q) return { ch, q };
  }
  return null;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* "YYYY-MM-DD" -> a LOCAL midnight Date. new Date("2026-07-24") parses as
   UTC, which drifts a whole day for anyone west of Greenwich; we build it
   by parts instead so the day name is always the learner's own day. */
function parseDay(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ""));
  if (!m) return null;
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  return isNaN(d) ? null : d;
}

/* Soft due line. Never a countdown, never overdue — see the ruling above.
   Returns null when there is nothing gentle to say (no date, or it's past). */
function dueLine(dueOn) {
  const due = parseDay(dueOn);
  if (!due) return null;
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((due - todayMidnight) / 864e5);
  if (days < 0) return null;                       // past — say nothing at all
  if (days === 0) return "by today";
  if (days === 1) return "by tomorrow";
  // Inside the coming week a day name reads naturally; beyond that it would
  // be ambiguous ("Friday" — which Friday?), so fall back to a plain date.
  if (days < 7) return `by ${DAY_NAMES[due.getDay()]}`;
  return `by ${due.getDate()} ${MONTHS[due.getMonth()]}`;
}

/**
 * Render the pinned homework card.
 * @param {object} app   the app controller (app.state, app.go)
 * @param {Element} [hostEl]  appended to when supplied
 * @returns {Element|null}  the card, or null when there is nothing to pin
 */
export function renderAssignmentCard(app, hostEl) {
  const a = app && app.state && app.state.assignment;
  if (!a || !a.questId) return null;
  const found = locate(a.questId, a.chapterId);
  if (!found) return null;                          // unknown quest id — fail quiet, never a broken card
  const { ch, q } = found;

  const card = el("div", "card hw-card" + (a.done ? " done" : ""));
  card.style.setProperty("--accent", ch.signature);
  card.style.setProperty("--hw", ch.signature);

  const head = el("div", "hw-head");
  head.innerHTML = `<div class="hw-ico">${a.done ? "✓" : ch.icon}</div>
    <div class="hw-heading">
      <div class="sys-label">${a.done ? "Homework done" : "Today’s homework"}</div>
      <div class="hw-title">${q.title}</div>
      <div class="hw-chapter">${ch.icon} ${ch.name}</div>
    </div>`;
  card.appendChild(head);

  if (a.note) card.appendChild(el("p", "hw-note", `“${a.note}”`));

  if (a.done) {
    /* Warm, short, and then out of the way — no XP recap, no "well done!"
       closer (blanket ban on generic celebration lines). */
    card.appendChild(el("p", "hw-doneline", `That’s ${q.title} sorted. Nice work getting it in.`));

    const pending = (app.state.boxes && app.state.boxes.pending) || 0;
    if (pending > 0) {
      const box = el("div", "hw-box", `<span class="hw-box-ico">🎁</span><span>A treasure box is waiting</span>`);
      // TODO(lead): route to the treasure box screen.
      // Agent C owns the box screen + opening animation (js/companion/treasure.js);
      // this card only advertises it. Wire the click here once that route exists,
      // e.g. box.addEventListener("click", () => app.go("treasure"));
      card.appendChild(box);
    }
  } else {
    const isOpen = new Set((app.state && app.state.openQuests) || []).has(q.id);
    const def = questDef(q.id);
    const playable = isOpen && q.built && !!def;
    if (playable) {
      const accent = questAccent(ch, q.n);
      const btn = el("button", "btn primary big hw-go", "Start homework →");
      // exactly the four params renderChapter builds for a quest tile — same
      // shape, so play.js can't tell where the learner came from
      btn.addEventListener("click", () => app.go("play", { chapter: ch, quest: q, def, accent }));
      card.appendChild(btn);
    } else {
      /* Admin only ever offers OPEN quests, so this is the rare case where a
         quest was closed again after being set. Say so plainly rather than
         handing her a button that dead-ends. */
      card.appendChild(el("p", "hw-shut", "Your teacher has closed this one again for now."));
    }

    const due = dueLine(a.dueOn);
    if (due) card.appendChild(el("p", "hw-due", due));
  }

  if (hostEl) hostEl.appendChild(card);
  return card;
}
