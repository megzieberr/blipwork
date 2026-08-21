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
                  adminClearAssignment(pw)
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
