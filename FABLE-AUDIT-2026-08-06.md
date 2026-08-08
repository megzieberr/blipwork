# Fable audit — Blipwork / Maths Homework Quest — 2026-08-06 (overnight)

Report-only. Nothing was changed, committed, pushed, or run against live.
Audited the local working tree (4 commits ahead of origin, per the GitHub outage).

**Overall: the app is in genuinely good shape.** The wave-2 shipment is wired
correctly in all four places it has to agree (migration SQL, local-backend mirror,
renderer catalogue, friendly labels) — every id, price, level and slot matches
exactly. All 21 Tripo item PNGs exist on disk, none are zero-byte, and the
animation folder has exactly the 8 states × 4 frames the renderer expects.
The maths I re-computed by hand (finance formulas, effective-rate conversion,
CAPS quartile rules, sine/cosine/area rules, angle-of-inclination traps) is all
correct, and the question generators are carefully built — decoys filtered by
value, the negative-gradient trap drilled properly, no answer leaks spotted.
The server-side economy is solid: buy, feed, care and open-box all take a row
lock first (no double-spend), the box loot pool correctly excludes free and
owned items, and every buy/feed/save button in the app disables itself BEFORE
its network call. No secrets in the repo, no learner names anywhere, gallery
exposes usernames only (never nicknames).

The findings below are ranked by how much they could hurt.

---

## 1. HIGH — schema.sql is two ships behind, and its header says "safe to re-run"

**File:** `supabase/schema.sql` (header lines 1–7; constraint lines 112–114; equip lines 553–558; seed lines 811–853)

schema.sql calls itself "the canonical from-scratch schema" — the file you'd run
to rebuild the whole database. But it was last updated on 28 July, so it knows
nothing about the last two shipments:

- Its `shop_items_slot_cat_check` constraint does **not** allow the `effects` slot.
- Its `mhq_equip` key list does **not** include `'effects'`.
- Its seed rows stop at the July catalogue: all 21 Tripo items (wave 1 + wave 2)
  are missing.

**Failure scenario:** the live database is fine (the migrations were applied),
but if this file is ever used for what it says it's for — rebuilding from
scratch, or setting up a sibling project — the result is a shop missing half
its catalogue where equipping an effect returns `bad_equipped`. That is exactly
the July "cape broke" bug, pre-baked into the rebuild file.

**Worse, the header says "Safe to re-run."** Four lines below that, the file
DROPS the students, progress, struggles and blips tables. That was true-ish
when there was no data; once learners arrive, re-running it destroys every
account. (Same trap as the Grade 7 app's "NEVER re-run schema.sql on live" ruling.)

**Suggested fix (two parts):** fold the effects-slot, wave-1 and wave-2 changes
into schema.sql so it matches live again (CLAUDE.md's own checklist says schema
changes go in "schema.sql PLUS a migration" — the PLUS got skipped twice); and
change the header to a loud "NEVER run this on a live database — it drops all
learner tables. Fresh projects only."

---

## 2. HIGH — the `?local=1` switch is one-way and can strand a learner offline

**File:** `js/api.js` lines 33–38

If the URL ever contains a `local` parameter — including `?local=0` (the code
only checks that the parameter *exists*, not its value) — the app writes
`mhq.forceLocal = 1` to that phone's storage. **Nothing in the app ever removes
it.** From then on, that device silently uses the offline demo backend forever.

**Failure scenario:** a learner taps a testing link that was shared with
`?local=1` on it (or Megan tests on her own phone and forgets). From that
moment their phone shows the demo world: their real progress "vanishes", every
quest is mysteriously open, and anything they earn stops saving to Supabase.
There is no button, URL or reinstall that fixes it — a PWA reinstall keeps
localStorage. It looks exactly like data loss and would be miserable to
diagnose remotely.

**Suggested fix:** only set the flag when the value is truthy (`?local=1`), and
make `?local=0` explicitly delete `mhq.forceLocal`. One small edit, and there's
an escape hatch you can text to a learner.

---

## 3. MEDIUM — the eating sheet is deleted in the working tree (uncommitted)

**File:** `art-source/Blip eating/image (1).png` — `git status` shows ` D` (deleted, not staged)

PROJECT-STATUS calls this file "the cleanest sheet on this project" and step 1
of the next build job (slice it into the `eating` frames). It is committed in
git, so nothing is lost yet — but the working-tree copy is gone (this smells
like the Laptop-Cleaner damage pattern from the portfolio audits, or an
accidental move during tonight's art shuffling).

**Failure scenario:** a future session runs a blanket `git add -A && git commit`
and bakes the deletion in; the next build job then starts with its input missing.

**Suggested fix:** `git checkout -- "art-source/Blip eating/image (1).png"` to
restore it — and never blind-commit that deletion. (Also: three new untracked
sheets sit in `art-source/tripo/` — image (3), (11), (15) — decide keep/ignore
before the next commit.)

---

## 4. MEDIUM — accepted-risk reminder: the client is trusted about XP and score

**Files:** `supabase/schema.sql` mhq_submit_quest (lines 437–479); `js/play.js` (line 101)

The client computes its own score and XP and sends them up. The server caps XP
at 1000 per submit and pays a flat 10 gold per submitted round — pass or fail,
unlimited times. So a learner who opens the browser console can hand themselves
1000 XP + 10 gold per call with their own login. This is inherent to the
no-JWT, password-in-RPC architecture (same as the sibling apps) and fine for a
class of Grade 11s who don't know it's possible — but it's worth having said
out loud once, before go-live. A cheap partial tighten, if ever wanted: cap
gold/XP per quest per day server-side, or sanity-check `p_xp` against the
quest's actual skill count. Not urgent, just recorded.

Related nit, same file: gold is awarded even on a failed run (score 0 still
pays 10 gold). If that's meant as "showing up pays", it's fine — just
confirming it's a choice, not an accident.

---

## 5. LOW — service worker: wave-2 art is not precached (offline-first gap only)

**File:** `sw.js` (SHELL list, lines 12–16)

The cache list covers the app shell only — no Blip base art, no anim frames, no
item PNGs. All of it is cached lazily (cache-first) the first time it's viewed,
so: a learner who installs the PWA and goes offline **before ever opening the
Blip screen** gets an invisible companion offline. Everyone else is fine. The
stale-green-art worry is handled: the v35→v36 cache bump wipes the old image
cache on activate, so re-cut wave-1 art shows fresh after the next deploy.
**Suggested fix (optional):** add `blip-base-blue.png` + the anim frames to
SHELL, or simply accept it — first online visit heals it.

---

## 6. LOW — stale comments and docs (batched; none affect behaviour)

- **CLAUDE.md** says the cache is `mhq-v25` (repo is on v36) — and its gotcha #6
  claims the README still says "passwords readable by teacher". The README was
  fixed; the gotcha itself is now the stale one.
- **js/admin.js:4** header comment still says "readable passwords" — alarming to
  a future reader; passwords are bcrypt-hashed and unreadable.
- **js/supabase-config.js:6** says the local-mode key is `cgg.forceLocal`; the
  real key is `mhq.forceLocal` (CLAUDE.md flagged this a month ago; the comment
  was never corrected in the file itself).
- **js/local-backend.js:126** and **js/companion/renderer.js:772** say wave 2 is
  "15 techy items" — 10 shipped, 5 were cut.
- **js/companion/renderer.js:842** (hud-monocle) explains why "widthPct 25" is
  the measured value, but the code below it says 28 — re-note the measurement or
  the comment misleads the next re-tune.
- **tools/tripo_sheet.py** top docstring step 3 still describes row/column
  projection; the code (correctly) uses connected components since the fix.
- **README.md:42** still mentions seeding a "class list" — self-signup means
  there is none (seed-private.sql itself says so).
- **tools/slice_sprites.py** reads sheets from `../homework-hub-companion/images`
  (outside the repo) — the eating sheet in `art-source/` will need copying there
  or the SRC path changed when it's sliced. Friction, not a bug.

---

## Questions the coordinator asked, answered

**51 live shop_items rows vs "shop has 43":** no drift — the arithmetic is
exact. 51 = **43 active cosmetics** (what "the shop" means) **+ 5 retired
inactive** items (round-glasses, cat-ears, party-hat, stubby-arms, angel-wings —
kept so old owners keep their gear) **+ 3 food** rows (soup, medicine, treat,
which live in the same table but sell from the pharmacy). Repo seeds reproduce
all 51: schema.sql seeds 30, effects-slot adds 12, wave 2 adds 10 and deletes
shadow-crown. ✔

**`_mhq_level` / `_mhq_growth` mutable search_path:** confirmed in the repo —
`supabase/schema.sql:159` and `:185` define both with no `set search_path`.
They are pure-maths helpers (immutable, touch no tables, not SECURITY DEFINER),
so the linter warning is real but low-risk — matches the standing
PROJECT-STATUS note "worth pinning one day, not urgent". The fix, whenever
convenient: add `set search_path = ''` to both definitions (schema.sql AND a
small migration for live).

**Live blips=2, students=2, progress=0, quests=0:** consistent with no learners
yet (two test accounts). One flag: **quests=0 means the quests table is empty
on live**, so no quest is seeded open OR closed. Worth confirming that's the
expected pre-term state before go-live — the teacher toggle can only open a
quest row that exists.

---

## What was verified clean (so nobody re-audits it)

- Wave-2 wiring: migration ↔ local-backend mirror ↔ renderer ↔ labels — 10/10
  items, every price/level/slot identical; shadow-crown fully purged (only
  historical comments remain).
- Assets: 21 item PNGs + 32 anim frames + 2 base bodies present, none zero-byte.
- verify-store.html's cross-check design is sound (it parses the real migration
  SQL, honours retired ids, and cache-busts past the service worker).
- Economy SQL: row locks on buy/feed/care/open-box; box loot excludes free +
  owned items; free buys leave gold untouched; second-blip claim is
  constraint-protected against races.
- Client: every mutating button disables before its `await` and re-enables on
  failure (the double-submit rule is followed throughout blip.js).
- Maths: finlib, statlib (CAPS + Casio-exclusive split intact), triglib,
  sampled quest generators — all correct; mc() dedup + by-value decoy filtering
  pattern in place.
- Privacy/security: publishable key only; no real names; `theory references/`
  and `seed-private-real.sql` properly gitignored; gallery never leaks nicknames.
- Level curve: js/companion/level.js mirrors SQL `_mhq_level` exactly; BLIP
  config thresholds (10/25/45, sickness 3/5/7, food prices) match SQL.

---

**In short:** The app is healthy — wave 2 shipped clean, the shop maths and the
money-handling are right, and the 51-row database matches the code exactly.
Two things want fixing before the kids arrive: schema.sql is a rebuild file
that no longer matches live (and its "safe to re-run" header is now dangerous),
and a `?local=1` link permanently traps a phone in demo mode with no way back.
Also restore the deleted eating sheet from git before anyone commits.
