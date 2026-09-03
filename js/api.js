/* ============================================================
   API LAYER — one async interface, two interchangeable backends.
   Uses Supabase when js/supabase-config.js has keys; otherwise (or
   with ?local=1) the offline LocalBackend. Same method signatures,
   so nothing else in the app changes. ?local=0 switches a device back
   to the real backend — that link is the fix if a learner's phone ever
   lands in demo mode by accident.

   `api` IS the chosen backend object, so every method a backend
   exposes is available on `api` unchanged. Surface (both backends):
     auth/quests: listStudents, firstLogin, login, getState, submitQuest,
                  logStruggle
                  (roster login, 2026-08-21 — self sign-up is gone;
                  listStudents is the picker payload, firstLogin sets a
                  password the first time / after a teacher reset)
     blip:        buyItem(u,p,item,slot=1)  — item may be a cosmetic id
                    OR a food id ('soup','medicine','treat', or any of the
                    44 groceries added in S4)
                  equip(u,p,{equipped,colour,blipName,slot=1})
                  gallery
     Phase 2:     feed(u,p), care(u,p),
                  claimSecondBlip(u,p,name,colour)
     S4 food:     eatFood(u,p,item) — consumes one grocery from the pantry
                    and counts as today's feeding. Refuses soup/medicine/
                    treat (not_edible) and an empty stash (none_left).
     Phase 3:     pushSubscribe(u,p,sub), pushUnsubscribe(u,p,endpoint),
                  openBox(u,p)
                  — the two push methods are honest no-ops on the local
                    backend: ?local=1 has no push service to talk to, so
                    they return {ok:true, local:true} and the UI stays
                    hidden. openBox is fully mirrored, as everything else is.
     CQ bridge:   collectCq(u,p) — CQ-BRIDGE-PLAN.md Part 3. Supabase calls
                  the collect-cq EDGE FUNCTION (never mhq_credit_cq/
                  mhq_cq_link directly — those are service_role-only); the
                  local backend mirrors the same watermark maths against a
                  fake per-student CQ total. {ok, paid, gold} on success,
                  {ok:false, error} on auth / not_linked / cq_down.
     admin:       adminLogin, adminData, adminSetQuestOpen,
                  adminResetPassword, adminRemoveStudent,
                  adminResetProgress, adminResolveStruggle,
                  setTerm(pw,running)  (alias: adminSetTerm),
                  adminSetAssignment(pw,questId,due,note),
                  adminClearAssignment(pw),
                  adminSetAnnounce(pw,title,chapter) — snapshots the quest's
                    display title + chapter name onto the active assignment
                    so the send-push edge function can word the "📚 New
                    homework!" notification without js/config.js,
                  announceHomework(pw) — asks send-push to tell the kids now.
                    Returns {held:true} instead of sending when it is outside
                    07:00–19:00 SA; the 07:00 cron job delivers those.
     dice:        diceSave(u,p,chapter,save) — persist/clear the in-progress
                    round blob (resume checkpoint; save may be null to clear)
                  submitDice(u,p,chapter) — pays out the round. Takes NO xp;
                    the server recomputes it from the saved answeredCorrect[]
                    (DICE-PLAN.md "never names an amount"). getState()'s
                    payload additionally carries `dice`: { [chapterId]: {
                    plays, metKinds, save } }, and adminData()'s carries
                    `dicePlays`: { [chapterId]: totalPlaysAcrossClass }.
     exam focus:  examState(u,p) — the learner's whole exam-focus progress
                    map: { [questionId]: { partsOpened, completed,
                    completedAt } }. NOT part of getState()'s payload —
                    mhq_get_state is deliberately untouched by
                    EXAM-FOCUS-PLAN.md's build (see its migration's header).
                  examOpenPart(u,p,questionId,partId,totalParts) — records
                    one part reveal, idempotently; pays a flat, server-side
                    literal reward (js/config.js EXAM block) exactly once,
                    the moment a question's every part has been opened.
                    Takes NO xp/gold amount from the client, ever.
     fun functions: funfunState(u,p) — the learner's Fun Functions profile,
                    in EXACTLY the shape graph-quest's js/mount.js documents
                    for host.profile(): { ok, xp, quests: { [questId]: {
                    best (0..1 fraction), total, plays, done } },
                    met: { [questId]: { [skillId]: true } } }. NOT part of
                    getState()'s payload — mhq_get_state is deliberately
                    untouched by the mount build (brief D3; see
                    migration-funfun.sql's header for the copy-forward
                    reason).
                  funfunMet(u,p,questId,skillId) — records that a round KIND
                    was shown; returns the fresh profile. Pays nothing.
                    Only the qE quest's deal-each-kind-first rule calls it.
                  funfunSubmit(u,p,questId,answered) — pays out one finished
                    quest. Takes NO xp and NO score: `answered` is the
                    per-item record js/funfun/play.js builds ([{ i, skillId,
                    outcome: "full"|"hinted"|"half"|"wrong"|"skipped", xp }])
                    and the server recomputes both from it (the dice's
                    "never names an amount" rule). Returns { ok, xpAwarded,
                    goldAwarded, correct, total, passed, alreadyDone, xp,
                    gold, level, levelUp, levelInfo, best, plays }.
                  adminFunfun(pw) — { ok, plays: { [questId]:
                    classTotalPlays } } for the dashboard's 📈 chip.
     feedback:    sendFeedback(u,p,body,anon,context,snapshot) — one note from the
                    💬 button. ⚠️ `anon` true means the ROW KEEPS NOTHING
                    about the sender (NULL student_id, NULL display_name),
                    not that a name is hidden — see the header of
                    supabase/migration-feedback-papers.sql. Everyone still
                    authenticates: anonymous is about what is stored, never
                    about who may post. `context` (screen + question id,
                    e.g. "play:gt5") rides along either way — a question id
                    is not a person. Returns {ok} / {ok:false,error:"auth"
                    |"empty"}.
                    `snapshot` (2026-09-03) is the TEXT OF THE QUESTION that
                    was on the screen when the sheet opened, captured by
                    js/feedback.js's snapshotQuestion() and capped at 1800
                    client-side / 2000 server-side. The questions are
                    generated fresh per learner per tap, so a note about
                    "this one" was previously unrecoverable. It rides along
                    with an anonymous note too, on the same reasoning as
                    context: a question is content, not identity.
                    ⚠️ SIX args — supabase/migration-feedback-snapshot.sql
                    must be applied BEFORE this client ships, or the RPC
                    call fails against the old 5-argument function.
                  adminFeedback(pw) — { ok, unread, rows: [{id, name (already
                    "Anonymous" when anonymous), anon, context, snapshot
                    (null on an old note or a note with no question on
                    screen), body, createdAt, readAt}] }, newest first,
                    capped at 500.
                  adminFeedbackRead(pw,id,read) — set/clear read_at.
     papers:      listPapers(u,p) — { ok, papers: [{id,title,chapter,
                    sizeBytes,sort,createdAt}] }. Auth-gated, and it never
                    carries the storage path.
                  paperUrl(u,p,paperId) — { ok, url, title }. NOT an RPC:
                    the `papers` bucket is PRIVATE with no storage.objects
                    policies, so the paper-url EDGE FUNCTION (service role)
                    is the only route to a byte. The url is a 60-minute
                    signed link. The local backend does NOT mirror this —
                    it returns {ok:false, error:"local"} and the tab says
                    "Papers need the internet"; faking a signed URL offline
                    would misrepresent the one thing this feature is.
                  paperAdmin(pw,action,args) — the teacher's side, through
                    the paper-admin edge function. action "list" | "upload"
                    ({title,chapter,filename,b64}) | "remove" ({paper_id}).
                    Offline, "list" answers from the stub and the other two
                    refuse with {ok:false, error:"local"}.
   ============================================================ */
import { SupabaseBackend, hasSupabase } from "./supabase.js";
import { LocalBackend } from "./local-backend.js";

/* ?local=1 pins this device to the offline backend and remembers it. The switch
   has to work in BOTH directions: ?local=0 clears it again. Without that, any
   device that ever opened a testing link would be stuck in the demo world for
   good — real progress apparently gone, nothing saving — and the only cure
   would be devtools on the learner's own phone. */
function forceLocal() {
  try {
    const q = new URLSearchParams(location.search);
    if (q.has("local")) {
      const off = ["0", "false", "off", "no"];
      const v = (q.get("local") || "1").trim().toLowerCase();
      if (off.includes(v)) { localStorage.removeItem("mhq.forceLocal"); return false; }
      localStorage.setItem("mhq.forceLocal", "1");
      return true;
    }
    return localStorage.getItem("mhq.forceLocal") === "1";
  } catch { return false; }
}

const useLocal = !hasSupabase || forceLocal();
export const api = useLocal ? LocalBackend : SupabaseBackend;
export const BACKEND = useLocal ? "local" : "supabase";
