/* ============================================================
   SUPABASE BACKEND — calls the SECURITY DEFINER RPC functions.
   Self sign-up: learners create their own account (username + name +
   password). Passwords are hashed server-side; the teacher never sees
   them. supabase-js is loaded lazily from a CDN on first use.
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

export const SupabaseBackend = {
  async signup(username, name, password) { return rpc("mhq_signup", { p_username: username, p_name: name, p_password: password }); },
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

  // ---- Blip: Phase 2 feeding / care / second blip ----
  async feed(username, password) { return rpc("mhq_feed", { p_username: username, p_password: password }); },
  async care(username, password) { return rpc("mhq_care", { p_username: username, p_password: password }); },
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
};
