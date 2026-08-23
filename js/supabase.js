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
};
