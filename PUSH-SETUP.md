# PUSH-SETUP.md — turning on Blip reminders

This adds a **daily push notification** to Blipwork: a gentle nudge when the
learner's Blip has gone a few days without a cookie.

It is deliberately quiet. A reminder only goes out on the day he gets *worse* —
day 3 (sleepy), day 5 (in bed) and day 6 (last word). Day 4 is silent, day 7 and
onwards is silent forever, weekends and holidays are silent, and anyone who has
already fed him that day is skipped. Nobody gets more than one a day.

Your Supabase project, GitHub repo and live site already exist, so this guide is
only the notification parts. It is the same recipe as Circle Quest, so it should
feel familiar. Allow about **20–30 minutes**.

> **Your project ref is `pjpwhalcifywjrwtjknd`** (the bit in your Supabase URL
> `https://pjpwhalcifywjrwtjknd.supabase.co`). You'll need it in Part 7.

> **A word you'll see a lot:** a **secret** is a password-like value we store in
> a safe, hidden place — never in the website code, never in GitHub.

> ⚠️ Blipwork lives in its **own** Supabase project, so even if you reuse the
> Circle Quest keys, the table, the function, the secrets and the schedule all
> have to be set up here too. Subscriptions can't cross projects.

---

## Part 1 — Get the notification keys (VAPID)

**VAPID keys** prove the notifications really come from you. There are two: a
**public** key (safe, goes in the website) and a **private** key (stays secret in
Supabase).

### Option A — reuse your Circle Quest keys (recommended)

Perfectly fine, and one less secret to look after. VAPID keys identify *you as
the sender*, not a particular app — the same pair can serve both.

1. Open `Desktop\circle-geometry-game\js\push-config.js` and copy the long
   string between the quotes. That's your **PUBLIC** key.
2. Your **PRIVATE** key is already saved in your notes from the Circle Quest
   setup (and it's in that project's Supabase secrets, where you can't read it
   back — so use your notes).

**If you can't find the private key in your notes, use Option B instead** — you
can't recover it, and a public key without its matching private key won't send.

- ✅ **You should now have:** a PUBLIC key and a PRIVATE key. Skip to Part 2.

### Option B — make a fresh pair

1. Open **PowerShell** (Windows key → type *PowerShell* → Enter).
2. Run:
   ```powershell
   npx web-push generate-vapid-keys
   ```
   - The first time, it asks to install a small helper — say **yes**.
   - **You should see:** a `Public Key:` and a `Private Key:`, each a long string
     of letters and numbers.
3. Copy the **Public Key** into a notes app, labelled `VAPID_PUBLIC_KEY`.
4. Copy the **Private Key** into your notes app, labelled `VAPID_PRIVATE_KEY`.
   Treat it like a password — it never goes on the website or into GitHub.

---

## Part 2 — Put the public key in the app and deploy

1. Open the file **`js/push-config.js`** in a text editor.
2. Paste your **PUBLIC** key between the quotes, so the line reads (yours will be
   different):
   ```js
   export const VAPID_PUBLIC_KEY = "BPxabc...the public key...xyz";
   ```
3. Save the file.
4. In PowerShell, deploy it:
   ```powershell
   cd "$HOME\Desktop\Claude Code Projects\maths-homework-quest"
   git add -A
   git commit -F commit-msg.txt
   git push
   ```
   (If you don't have a `commit-msg.txt`, use
   `git commit -m 'Turn on Blip reminders'` — single quotes, not double.)
   - **You should see:** `git push` finish. Wait ~1 minute for GitHub Pages.
   - Once live, a **🔔 Get a nudge when Blip's hungry** card appears on the Blip
     screen, just under the Feed button, inside the installed app.
   - **Before this key is set the card is invisible on purpose** — that's how it
     has been shipping, and it's normal.

---

## Part 3 — Add the notifications table to the database

1. In **Supabase**, left sidebar → **SQL Editor** → **New query**.
2. Open **`supabase/migration-phase3.sql`** on your computer, select all
   (Ctrl+A), copy.
3. Paste into the SQL editor and click **Run**.
   - **You should see:** green **Success**. (Safe to run more than once.)
   - To check: **Table Editor** should now list a **push_subscriptions** table.

*(If you've already run migration-phase3.sql for the homework/treasure-box
features, it's done — the table came with it. Just confirm it's in the list.)*

---

## Part 4 — Turn on the scheduler, and make a CRON secret

### 4a. Switch on two extensions
1. Left sidebar → **Database** → **Extensions**.
2. Search **pg_cron** → turn its toggle **on** (green). (Runs jobs on a timer.)
3. Search **pg_net** → turn its toggle **on** (green). (Lets the database call
   our notification function.)
   - **You should see:** both toggles green.

### 4b. Make a CRON secret
4. In PowerShell, run:
   ```powershell
   python -c "import secrets; print(secrets.token_hex(24))"
   ```
   - **You should see:** a long random string.
5. Copy it into your notes app, labelled `CRON_SECRET`. You'll use the **exact
   same value** twice (Part 5 and Part 7).
   - This must be a **new one for Blipwork** — don't reuse Circle Quest's. The
     keys can be shared; this lock shouldn't be.

---

## Part 5 — Store the secrets in Supabase

1. Left sidebar → **Edge Functions** → **Secrets** (or **Manage secrets**).
2. Click **Add new secret** and add these **four**, one at a time (Name exactly
   as shown, paste the Value, Save):

   | Name | Value to paste |
   | --- | --- |
   | `VAPID_PUBLIC_KEY` | your **PUBLIC** key from Part 1 |
   | `VAPID_PRIVATE_KEY` | your **PRIVATE** key from Part 1 |
   | `VAPID_SUBJECT` | `mailto:` + your email, e.g. `mailto:megzieberr@gmail.com` |
   | `CRON_SECRET` | your **CRON_SECRET** from Part 4b (must match exactly) |

   - **You should see:** all four names listed (the values stay hidden).
   - You do **not** add the service-role key — Supabase gives that to the
     function automatically.

---

## Part 6 — Deploy the notification function

1. Left sidebar → **Edge Functions** → **Create a function** (or **Via editor**).
2. In the **name** box, type exactly: `send-push` (the schedule looks for this).
3. Open **`supabase/functions/send-push/index.ts`** on your computer, select all
   (Ctrl+A), copy.
4. In the browser editor, select the sample code (Ctrl+A) and paste yours over it.
5. Turn the **Verify JWT** option **OFF** for this function, so our scheduler can
   call it with the CRON_SECRET instead of a login token.
6. Click **Deploy**.
   - **You should see:** `send-push` listed as **Deployed**.

---

## Part 7 — Schedule the daily reminder

1. Open **`supabase/cron.sql`** on your computer in a text editor.
2. Replace `<PROJECT_REF>` with **`pjpwhalcifywjrwtjknd`**.
3. Replace `<CRON_SECRET>` with your CRON_SECRET from Part 4b.
4. **Pick the time** (optional): the default is **17:00 SA** — after school,
   before the evening. The file shows how to change it (it's written in UTC,
   which is SA time minus 2 hours). Save the file.
5. In Supabase: **SQL Editor** → **New query** → paste the whole file → **Run**.
   - **You should see:** green success. To check, run a new query:
     `select jobname, schedule from cron.job;` — you should see
     `blipwork-blip-reminder`.

---

## Part 8 — Test it now (don't wait three days)

1. On your phone, open the installed **Blipwork** app → go to the **Blip**
   screen → tap **Turn on** on the 🔔 card → tap **Allow**.
   - **You should see:** the card change to a quiet **Reminders on**.
2. In Supabase: **Edge Functions** → **send-push** → **Invoke** (or **Test**).
   - In the request **body**, paste:  `{ "test": true }`
   - Add a **header** named `x-cron-secret` with your CRON_SECRET value.
   - Click **Send/Invoke**.
   - ✅ Within a few seconds you should get a **Blipwork** notification saying
     your Blip's name and *"says hello 👋 — reminders are working."*

`{ "test": true }` pings every subscribed device and ignores all the stage rules.
It also deliberately does **not** count as that day's reminder, so testing can
never eat a real nudge.

### To test a *real* sick-stage message
The proper daily run only fires on day 3, 5 or 6 unfed, so you can't force it
from the Invoke box. In the app, use `__BLIP_DEV__.skipDays(3)` in the browser
console to push the clock forward, then invoke the function with an **empty**
body `{}` (same `x-cron-secret` header). The response JSON shows exactly who it
considered and why anyone was skipped.

---

## If a notification doesn't arrive

- Make sure you tapped **Allow**, not Block. If you tapped Block, the card now
  says *"Reminders are blocked"* — you have to undo it in your phone's browser
  settings; the app is not allowed to ask again.
- **iPhone only:** the app **must** be added to the home screen and opened from
  that icon. Notifications never work in a Safari tab — and the 🔔 card correctly
  hides itself there, so if you can't see the card at all on an iPhone, that's
  why.
- Check the phone isn't on Do-Not-Disturb / Focus.
- Re-open the app once after installing — that's when the device registers.
- In Supabase → **Edge Functions → send-push → Logs**, look for errors:
  - **401** — the `x-cron-secret` didn't match. Re-check it is identical in your
    secrets (Part 5) and in `cron.sql` (Part 7). No spaces, no line breaks.
  - **`_mhq_is_qual_day` or `_mhq_health` not found** — the database hasn't
    reloaded its list of functions. Run `notify pgrst, 'reload schema';` in the
    SQL editor and invoke again.
  - **Nothing sent, `skipped: not_a_qualifying_day`** — it's a weekend, or the
    term toggle is off in admin. Working as intended.
  - **Nothing sent, `sent: 0` with no detail** — nobody was at day 3, 5 or 6.
    Also working as intended.
- **If you switched to a NEW VAPID pair** after a device had already subscribed
  to the old one: that device has to turn reminders **off and on again** in the
  app. Its old subscription is locked to the old key and will silently fail.

---

## For the learner (what to send her)

> **Blipwork reminders**
> 1. Make sure Blipwork is on your home screen (open the site, then
>    **iPhone:** Share (□↑) → *Add to Home Screen*. **Android:** ⋮ → *Install app*).
>    Open it from the new icon, not from the browser.
> 2. Go to the **Blip** screen and tap **🔔 Turn on**, then **Allow**.
> That's it — Blip will send you a quiet nudge on the days he starts getting
> peckish. Never more than one a day, and never on weekends. 🩵

> 💡 Tip: open the link in **Safari/Chrome**, not inside WhatsApp — the
> "Add to Home Screen" option only appears in the real browser.

---

## You're done 🎉

Each weekday at your chosen time the database wakes the function up, it asks the
health clock how each Blip is doing, and only the learners who have just crossed
into a hungrier stage hear anything. To change the time, edit `supabase/cron.sql`
and run it again.
