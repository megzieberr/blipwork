/* ============================================================
   SUPABASE BACKEND — calls the SECURITY DEFINER RPC functions.
   Roster login (2026-08-21, CQ-BRIDGE-PLAN.md Part 1): the teacher seeds
   the class list; a learner picks their name (listStudents) and sets a
   password on first login (firstLogin) or enters it (login, unchanged).
   Passwords are hashed server-side; the teacher never sees them.
   supabase-js is loaded lazily from a CDN on first use.
   ============================================================ */
import { SUPABASE, hasSupabase as _has } from "./supabase-config.js";

export const hasSupabase = _has;

let _client = null;
async function client() {
  if (_client) return _client;
  const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
  _client = createClient(SUPABASE.url, SUPABASE.key, { auth: { persistSession: false, autoRefreshToken: false } });
  return _client;
}
async function rpc(fn, params) {
  const c = await client();
  const { data, error } = await c.rpc(fn, params || {});
  if (error) throw new Error(error.message || "rpc_error");
  return data;
}
/* Edge functions (not an RPC — mhq_credit_cq / mhq_cq_link are
   service_role-only, unreachable from the browser by design). supabase-js's
   functions.invoke() attaches the publishable key the same way rpc() above
   attaches it, targeting <SUPABASE.url>/functions/v1/<name>. */
async function invokeFn(name, body) {
  const c = await client();
  const { data, error } = await c.functions.invoke(name, { body: body || {} });
  if (error) throw new Error(error.message || "function_error");
  return data;
}

export const SupabaseBackend = {
  // Picker payload — {username, display_name, has_password}[], non-hidden rows only.
  async listStudents() { return rpc("mhq_list_students"); },
  // Sets a password only if the row's is currently NULL (first login, or after
  // a teacher reset). Returns {ok:true, username} on success — the client uses
  // that username for every subsequent call, exactly like a normal login.
  async firstLogin(name, password) { return rpc("mhq_first_login", { p_name: name, p_password: password }); },
  async login(username, password) { return rpc("mhq_login", { p_username: username, p_password: password }); },
  async setPassword(username, password) { return rpc("mhq_set_password", { p_username: username, p_password: password }); },
  async getState(username, password) { return rpc("mhq_get_state", { p_username: username, p_password: password }); },
  async submitQuest(username, password, quest, { score, xp, total, correct }) {
    return rpc("mhq_submit_quest", { p_username: username, p_password: password, p_quest: quest, p_score: score, p_xp: xp, p_total: total, p_correct: correct });
  },
  async logStruggle(username, password, concept) { return rpc("mhq_log_struggle", { p_username: username, p_password: password, p_concept: concept }); },

  // ---- Blip: shop / equip / gallery ----
  // buyItem now also takes food ids ('soup','medicine','treat'); slot (default 1)
  // targets which blip a cosmetic accessory is bought for.
  async buyItem(username, password, item, slot = 1) { return rpc("mhq_buy_item", { p_username: username, p_password: password, p_item: item, p_slot: slot }); },
  async equip(username, password, { equipped, colour, blipName, slot = 1 } = {}) {
    return rpc("mhq_equip", { p_username: username, p_password: password, p_equipped: equipped ?? null, p_colour: colour ?? null, p_blip_name: blipName ?? null, p_slot: slot });
  },
  async gallery(username, password) { return rpc("mhq_gallery", { p_username: username, p_password: password }); },

  // ---- CQ-BRIDGE-PLAN.md Part 3: the XP -> diamonds bridge ----
  // Calls the collect-cq EDGE FUNCTION, never mhq_credit_cq/mhq_cq_link
  // directly — those two RPCs are service_role-only (see schema.sql's
  // grants) and reject a publishable-key caller outright.
  async collectCq(username, password) { return invokeFn("collect-cq", { username, password }); },

  // ---- Blip: Phase 2 feeding / care / second blip ----
  async feed(username, password) { return rpc("mhq_feed", { p_username: username, p_password: password }); },
  async care(username, password) { return rpc("mhq_care", { p_username: username, p_password: password }); },
  /* S4b (2026-08-08 revision): eat one grocery off today's tray (soup and
     medicine live in the pantry instead, via care()). `item` must be a
     category-'food' row that is NOT soup / medicine / treat — the server
     refuses those three by name (not_edible). */
  async eatFood(username, password, item) { return rpc("mhq_eat_food", { p_username: username, p_password: password, p_item: item }); },
  async claimSecondBlip(username, password, name, colour) {
    return rpc("mhq_claim_second_blip", { p_username: username, p_password: password, p_name: name, p_colour: colour });
  },

  // ---- Phase 3: push reminders + treasure box ----
  async pushSubscribe(username, password, sub) { return rpc("mhq_push_subscribe", { p_username: username, p_password: password, p_sub: sub }); },
  async pushUnsubscribe(username, password, endpoint) { return rpc("mhq_push_unsubscribe", { p_username: username, p_password: password, p_endpoint: endpoint }); },
  async openBox(username, password) { return rpc("mhq_open_box", { p_username: username, p_password: password }); },

  // ---- admin ----
  async adminLogin(pw) { return rpc("mhq_admin_login", { p_admin_password: pw }); },
  async adminData(pw) { return rpc("mhq_admin_data", { p_admin_password: pw }); },
  async adminSetQuestOpen(pw, quest, open) { return rpc("mhq_admin_set_quest_open", { p_admin_password: pw, p_quest: quest, p_open: open }); },
  async adminSetTerm(pw, running) { return rpc("mhq_admin_set_term", { p_admin_password: pw, p_running: running }); },
  async setTerm(pw, running) { return rpc("mhq_admin_set_term", { p_admin_password: pw, p_running: running }); },
  async adminResetPassword(pw, id) { return rpc("mhq_admin_reset_password", { p_admin_password: pw, p_id: id }); },
  async adminRemoveStudent(pw, id) { return rpc("mhq_admin_remove_student", { p_admin_password: pw, p_id: id }); },
  async adminResetProgress(pw, id) { return rpc("mhq_admin_reset_progress", { p_admin_password: pw, p_id: id }); },
  async adminResolveStruggle(pw, concept) { return rpc("mhq_admin_resolve_struggle", { p_admin_password: pw, p_concept: concept }); },
  // Phase 3 — `due` and `note` are both optional; send null, not "", so the
  // date column stays null rather than failing to parse an empty string.
  async adminSetAssignment(pw, questId, due, note) {
    return rpc("mhq_admin_set_assignment", { p_admin_password: pw, p_quest_id: questId, p_due: due || null, p_note: note || null });
  },
  async adminClearAssignment(pw) { return rpc("mhq_admin_clear_assignment", { p_admin_password: pw }); },

  /* 🔔 HOMEWORK NOTIFICATIONS (2026-08-27). Two calls, both additive, both
     fired right after adminSetAssignment succeeds:

       adminSetAnnounce  writes the quest's DISPLAY TITLE and CHAPTER NAME
         onto the active assignment row. Those strings live in js/config.js,
         which the Deno edge function cannot read — so the browser, which
         has them, hands them over. See migration-push-homework.sql for why
         this is a separate RPC rather than two more parameters on
         mhq_admin_set_assignment (the copy-forward law).

       announceHomework  asks send-push to tell the kids NOW. The edge
         function decides whether "now" is polite: inside 07:00–19:00 SA it
         sends, otherwise it replies {held:true} and the 07:00 cron job
         delivers it in the morning. Authenticated with the admin password
         through mhq_admin_ok_rpc — the CRON_SECRET never touches a browser.

     Both are best-effort at the call site: the homework itself is already
     saved by the time they run, so a failure costs a notification, never
     an assignment. */
  async adminSetAnnounce(pw, title, chapter) {
    return rpc("mhq_admin_set_announce", { p_admin_password: pw, p_title: title || null, p_chapter: chapter || null });
  },
  async announceHomework(pw) { return invokeFn("send-push", { admin_pw: pw, mode: "homework" }); },

  // ---- DICE-PLAN.md: generative practice rounds (session 0b, 2026-08-21) ----
  // diceSave persists/clears the in-progress round blob (resume checkpoint);
  // submitDice takes NO xp/amount — the server recomputes it from the saved
  // answeredCorrect[] (mhq_submit_dice), so the client can never name a
  // payment. See supabase/migration-dice.sql (WRITTEN, NOT RUN).
  async diceSave(username, password, chapter, save) {
    return rpc("mhq_dice_save", { p_username: username, p_password: password, p_chapter: chapter, p_save: save ?? null });
  },
  async submitDice(username, password, chapter) {
    return rpc("mhq_submit_dice", { p_username: username, p_password: password, p_chapter: chapter });
  },

  // ---- EXAM-FOCUS-PLAN.md: the tab's server surface (session 0,
  // 2026-08-21). examOpenPart takes NO xp/gold amount — the server pays a
  // fixed literal (js/config.js's EXAM block mirrors it for display only)
  // the moment a question's every part has been reported opened, exactly
  // once ever. See supabase/migration-exam-focus.sql (WRITTEN, NOT RUN).
  async examState(username, password) {
    return rpc("mhq_exam_state", { p_username: username, p_password: password });
  },
  async examOpenPart(username, password, questionId, partId, totalParts) {
    return rpc("mhq_exam_open_part", {
      p_username: username, p_password: password,
      p_question_id: questionId, p_part_id: partId, p_total_parts: totalParts,
    });
  },

  // ---- FUNFUN-PART2-BRIEF.md: the Fun Functions mount (session 1,
  // 2026-08-23). Fun Functions is its own app (the graph-quest repo);
  // blipwork mounts one quest at a time and owns the payout. These four
  // are its ENTIRE server surface — mhq_get_state and mhq_admin_data are
  // deliberately untouched (brief D3, the copy-forward danger recorded in
  // migration-dice.sql's header). funfunSubmit takes NO xp and NO score:
  // it sends the per-item `answered` record and the server recomputes
  // both (same "never names an amount" rule as the dice). See
  // supabase/migration-funfun.sql (WRITTEN, NOT RUN).
  async funfunState(username, password) {
    return rpc("mhq_funfun_state", { p_username: username, p_password: password });
  },
  async funfunMet(username, password, questId, skillId) {
    return rpc("mhq_funfun_met", { p_username: username, p_password: password, p_quest_id: questId, p_skill_id: skillId });
  },
  async funfunSubmit(username, password, questId, answered) {
    return rpc("mhq_submit_funfun", { p_username: username, p_password: password, p_quest_id: questId, p_answered: answered ?? [] });
  },
  async adminFunfun(pw) { return rpc("mhq_admin_funfun", { p_admin_password: pw }); },

  // ---- FEEDBACK-PAPERS-BRIEF.md: 💬 feedback (2026-08-24) ----
  // `anon` true means the ROW keeps nothing about the sender — the
  // username/password still go up (everyone authenticates; anonymous is
  // not "a stranger may post"), and mhq_send_feedback simply writes NULL
  // for student_id and display_name. `context` (screen + question id)
  // rides along either way. See supabase/migration-feedback-papers.sql
  // (WRITTEN, NOT RUN).
  //
  // `snapshot` (2026-09-03) is the TEXT OF THE QUESTION that was on the
  // screen when the sheet opened — the questions are generated fresh, so
  // without it a note about "this one" points at something that no longer
  // exists. Content, not identity, so it rides along with an anonymous
  // note exactly as context does.
  // ⚠️ SIX arguments: supabase/migration-feedback-snapshot.sql must be
  // applied BEFORE this ships, or the RPC 404s on the old 5-arg signature.
  async sendFeedback(username, password, body, anon, context, snapshot) {
    return rpc("mhq_send_feedback", {
      p_username: username, p_password: password,
      p_body: body, p_anon: !!anon, p_context: context || null,
      p_snapshot: snapshot || null,
    });
  },
  async adminFeedback(pw) { return rpc("mhq_admin_feedback", { p_admin_password: pw }); },
  async adminFeedbackRead(pw, id, read) {
    return rpc("mhq_admin_feedback_read", { p_admin_password: pw, p_id: id, p_read: !!read });
  },

  // ---- FEEDBACK-PAPERS-BRIEF.md: 📄 papers (2026-08-24) ----
  // The LIST is a plain RPC (auth-gated, and it never carries
  // storage_path). The FILES are not: the `papers` bucket is private
  // with no storage.objects policies, so every byte goes through an edge
  // function holding the service role — paperUrl for a learner, paperAdmin
  // for her. Same invokeFn route collectCq uses.
  async listPapers(username, password) { return rpc("mhq_list_papers", { p_username: username, p_password: password }); },
  async paperUrl(username, password, paperId) {
    return invokeFn("paper-url", { username, password, paper_id: paperId });
  },
  // action: "list" | "upload" ({title, chapter, filename, b64}) | "remove" ({paper_id})
  async paperAdmin(pw, action, args) {
    return invokeFn("paper-admin", { admin_pw: pw, action, ...(args || {}) });
  },
};
