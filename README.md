# Blipwork — Grade 11 homework hub

A gamified homework app for Grade 11 maths. Learners log in on their phones, work
through the **quests their teacher has opened**, and get reactive help only when
they're stuck. The teacher opens/closes quests and tracks the class from an admin
dashboard. Installs to the phone like an app.

Eleven chapters ship today (Statistics, Finance, Probability, 2D Trigonometry,
Measurement, Functions, Trig Graphs, Analytical Geometry, Number Patterns,
Exponents & Surds, Equations & Inequalities), split across a **Term 3** and a
**Revision** tab.

## Blip, the companion
Every learner has a blob companion called **Blip** (renameable). Completed rounds pay
**XP** (levelling only) and **gold** (shop only) — the two never mix. Gold buys
level-gated accessories; the first colour unlocks after the first completed round. The
**gallery** shows everyone's builds alphabetically, with no scores and no ranking.

## How it works
- **No teaching up front.** A learner goes straight into questions. Help is reactive:
  a **hint**, then a full **worked solution** on a wrong answer, then an **"I'm lost"**
  concept card — and a **mastery loop** that gives a fresh sibling question until they
  get one right.
- **Tap to answer**, except calculated numbers, which use an on-screen **decimal-comma
  keypad**. No free typing.
- An in-app **Casio fx-991ZA Plus II** (stats workflow) so learners practise the real
  key sequences — calibrated against the actual device (exclusive quartile method).
- Accurate, **to-scale** box plots, ogives and histograms from a verified engine
  (`verify.html` checks every graph).

## Run locally
Static site of ES modules — needs a tiny server:
```
python -m http.server 5191
```
Open <http://localhost:5191/>. With no backend reachable it falls back to a local demo
backend; append `?local=1` to force it.

## Backend (Supabase)
- `supabase/schema.sql` — tables, row-level security (on, no policies) and the
  `SECURITY DEFINER` RPC API. Run once in the SQL editor.
- `supabase/seed-private.sql` — set your real admin password and class list **privately**
  (never committed).
- Put your project URL + **publishable** key in `js/supabase-config.js` (the publishable
  key is safe to commit; the secret/service-role key never goes in the repo).

Security: the public key can only execute the RPC functions; every read/write verifies
the password server-side. Learner passwords are **bcrypt-hashed server-side** — nobody,
including the teacher, can read one back. A forgotten password is *cleared* from the
admin panel; the learner then sets a new one at next login and keeps all progress.

## Admin
`/admin.html` — open/close each quest, see struggle flags by concept, clear passwords,
add/remove learners, export CSV. Resetting a learner's progress zeroes their XP but
never confiscates their Blip's gold, items, colour or name.

## Deploy
Static — hosted on GitHub Pages from `main`. `.nojekyll` serves every file as-is.
