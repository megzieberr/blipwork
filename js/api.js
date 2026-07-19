/* ============================================================
   API LAYER — one async interface, two interchangeable backends.
   Uses Supabase when js/supabase-config.js has keys; otherwise (or
   with ?local=1) the offline LocalBackend. Same method signatures,
   so nothing else in the app changes.

   `api` IS the chosen backend object, so every method a backend
   exposes is available on `api` unchanged. Surface (both backends):
     auth/quests: signup, login, setPassword, getState, submitQuest,
                  logStruggle
     blip:        buyItem(u,p,item,slot=1)  — item may be a cosmetic id
                    OR a food id ('soup','medicine','treat')
                  equip(u,p,{equipped,colour,blipName,slot=1})
                  gallery
     Phase 2:     feed(u,p), care(u,p),
                  claimSecondBlip(u,p,name,colour)
     Phase 3:     pushSubscribe(u,p,sub), pushUnsubscribe(u,p,endpoint),
                  openBox(u,p)
                  — the two push methods are honest no-ops on the local
                    backend: ?local=1 has no push service to talk to, so
                    they return {ok:true, local:true} and the UI stays
                    hidden. openBox is fully mirrored, as everything else is.
     admin:       adminLogin, adminData, adminSetQuestOpen,
                  adminResetPassword, adminRemoveStudent,
                  adminResetProgress, adminResolveStruggle,
                  setTerm(pw,running)  (alias: adminSetTerm),
                  adminSetAssignment(pw,questId,due,note),
                  adminClearAssignment(pw)
   ============================================================ */
import { SupabaseBackend, hasSupabase } from "./supabase.js";
import { LocalBackend } from "./local-backend.js";

function forceLocal() {
  try {
    if (new URLSearchParams(location.search).has("local")) { localStorage.setItem("mhq.forceLocal", "1"); return true; }
    return localStorage.getItem("mhq.forceLocal") === "1";
  } catch { return false; }
}

const useLocal = !hasSupabase || forceLocal();
export const api = useLocal ? LocalBackend : SupabaseBackend;
export const BACKEND = useLocal ? "local" : "supabase";
