/* ============================================================
   PUSH (reminders) — the PUBLIC VAPID key.

   This is the public half of the notification key pair. It is SAFE to
   commit and ship to the browser — it only lets a device SUBSCRIBE to
   push; it can never send a notification. The PRIVATE key is the one
   that sends, and it lives ONLY in Supabase's Edge Function secrets
   (never here, never in GitHub).

   >>> PASTE THE VAPID PUBLIC KEY BETWEEN THE QUOTES BELOW <<<
   See PUSH-SETUP.md Part 1. You may REUSE the Circle Quest keypair —
   VAPID keys identify the sender, not the app, so one pair can serve
   both. (The subscriptions themselves cannot be shared: they live in
   each project's own database.)

   Leave it blank and the whole reminder feature stays dormant — the
   opt-in card hides itself, nothing subscribes, nothing breaks. That
   is the intended shipping state until Megan works through the setup.
   ============================================================ */
export const VAPID_PUBLIC_KEY = "";
