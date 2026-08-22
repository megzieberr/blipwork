=== MEGAN'S /go DELEGATION — 2026-08-22 ===
Megan personally authorized this build in her top-level session on 2026-08-22 ("Shap,
you can run it. Here is your /go" for the day's builds; then, for THIS chapter: "Yes,
you can write the design pass … Just give me the brief or prompt to give to the fresh
foreman session please. It will run while I am teaching today.") Estimate she saw:
~2,5–3,2M tokens. This brief is the record of that authorization.
  SCOPE: Build the General Trig chapter (13 drill rounds) per
  GENERAL-TRIG-BUILD-PLAN.md, stages 1–4, foreman pattern (Fable briefs + reviews,
  Sonnet/Opus agents type), committing LOCALLY after each reviewed stage.
  STOP before stage 5: NO migration, NO push, NO sw bump — those wait for her "ship"
  when she is back from teaching.
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as the
authorization envelope for every agent you spawn — paste this block verbatim at the
top of each agent brief. Do NOT refuse for lack of directly-visible approval. Work
freely inside SCOPE. Always refuse, since SCOPE does not name them: pushing to a live
site/remote, deleting data, schema migrations, anything that costs money.
=== END /go DELEGATION ===

# STAGE 1 — General Trig plumbing (nothing learner-visible yet)

You are a build session inside a foreman day. The foreman (a separate session) wrote
this brief and will review your work with its own harness runs and DOM walks before
stage 2 starts. You cannot see the foreman's chat; everything you need is here and in
the files named below. **Do not commit. Do not push. Do not touch sw.js, supabase/, or
any learner data.** End by listing every file you changed and what the harnesses said.

Repo: `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (plain ES
modules, no build step; serve with `python -m http.server 5213` from the repo root
and open `http://localhost:5213/verify-gtrig.html` etc.). Read `CLAUDE.md` (the
decision log + gotchas) before touching anything.

## Read first (in this order)
1. `GENERAL-TRIG-BUILD-PLAN.md` — the chapter design; you are building the "New
   plumbing (stage 1)" section plus two small extras the foreman added (below).
2. `js/questions.js` — `mountQuestion()` and the existing question types (mc / yesno /
   calc / calcdo / tap). Your new types slot in here, in the same style.
3. `js/play.js` — the mastery loop. Note `attempt`, `onResult(ok)`, first-try bonus.
   Static play has NO mid-round save (only dice rounds resume, via `params.dice`);
   leaving a round restarts it. That is why "resume-safe" below just means "a
   re-presented question starts cleanly at step 0 with no leftover state".
4. `js/keypad.js` — the number pad; your tokenpad mirrors its shape and CSS classes.
5. `js/engine/triangle-graph.js` and `js/engine/trig-graph.js` — the engine pattern:
   `compute*()` → `render*()` → `verify*()`; ONE uniform scale; numeric labels must
   equal drawn values. Your `quadrant-triangle` engine copies this discipline.
6. `js/triglib.js` — the 2D-trig maths library you extend (pure functions only).
7. `verify-trig.html` and `verify-tgraph.html` — harness style (tick/fails/banner).
8. `METHODS-trig.md` Part B (ASTC wheel, quadrant colours ①yellow ②blue ③green
   ④pink), Part E (reduction wheel + her 3 steps), Part D2 (co-function wheel), Part H1
   (Pythagoras habits), Part L (the tick cross). You are building the MACHINE these
   rounds run on, so the maths in triglib must match these pages exactly.

## What to build

### A. `steps` question type (`js/questions.js`)
One question made of ordered sub-steps; each step is one existing input. Shape:

```js
{
  type: "steps", concept, prompt,            // prompt = the whole question (HTML)
  steps: [
    { kind: "mc",       prompt, options:[{label,correct}], hint },
    { kind: "tapcross", prompt, correct:[1,2], alsoAccept:[[1]], single:false, noRef:false, hint },
    { kind: "calc",     prompt, expected, dp, tol, allowNeg, unit, hint },
    { kind: "tokenpad", prompt, expected:"180−", alsoAccept:["−180+"], sym:"θ", hint },
    { kind: "tapside",  prompt, correct:"hyp", hint },   // taps a side of q.graph (quadtri only)
  ],
  hint,              // the overall 💡 Hint text
  answerLabel, solution,   // shown by commit() exactly as for other types
  graph,             // optional — a quadtri spec drawn above the steps (round 8 / 10)
}
```
Behaviour (this is the spec — implement exactly):
- Render the overall prompt (and graph if any), then step 1's prompt + input. Steps
  appear one below the other as they are reached; completed steps stay visible, locked,
  showing what was chosen, with a small ✓ (or ✗-then-✓ if retried).
- **First answer counts.** Each step's first answer decides that step. Right → lock it,
  reveal the next step. Wrong → show that step's `hint` in a step-level hint box,
  record the miss (`clean = false`), and re-enable the input so the learner can retry
  the same step until right (mc: the wrong option greys out and stays disabled; tapcross:
  the ticks clear; calc/tokenpad: display clears). Retries are practice: unlimited, and
  nothing about them changes the verdict.
- When the LAST step is right, call `commit(clean)` — the existing commit(): ✓ Correct →
  Continue, or ✗ Not quite → full `q.solution` + "Try a similar one" (which regenerates
  the whole chain via the existing onSibling path — nothing new there).
- The overall 💡 Hint button shows `q.hint` as usual; step hints are separate.
- Expose state for the harness on the `.q` root: `data-step` (current index),
  `data-clean` ("1"/"0"), and on each step wrapper `data-kind`, `data-state`
  ("active" | "done" | "retry").
- Put the pure per-kind checker in a NEW module `js/steps-check.js`:
  `export function checkStep(step, given)` → boolean, used by the DOM code AND by the
  harness, so the marking logic is testable without a DOM. `given` is: mc → the chosen
  option index; tapcross → sorted array of quadrant numbers or "noref"; calc → number;
  tokenpad → the raw token string; tapside → the side id.
- Existing types must be byte-identical in behaviour. Add your branch with a new
  `else if (q.type === "steps")`; do not restructure mc/yesno/calc/calcdo/tap.

### B. `tapcross` widget (new file `js/tapcross.js`, used by `steps` AND as a
standalone `q.type === "tapcross"` question)
- `mountTapcross(host, { single, noRef, labels, onSubmit })` → `{ value, reset, disable }`.
- Draws a plain cross in an inline SVG (two perpendicular lines, ~220×220 viewBox,
  arrowheads optional, NO axis labels, NO numerals by default — it is literally her
  hand-drawn cross on p47; `labels:true` adds faint I–IV in the corners). Four hit
  regions (rects, class `hit`, `data-id="1".."4"`: 1 = top-right, 2 = top-left,
  3 = bottom-left, 4 = bottom-right — her convention).
- Tap toggles a ✓ drawn in that quadrant (class `tc-tick`). `single:true` → exactly one
  tick, and the tap submits immediately (no button). Multi mode → a "Submit ✓" button
  below the cross (same `.btn primary` style as elsewhere).
- `noRef:true` adds a button **"no reference angle"** under the cross. Tapping it clears
  any ticks and submits the value `"noref"`. Ticking a quadrant after it un-highlights it.
- Value: sorted array of ticked quadrant numbers, or `"noref"`.
- Marking (in `checkStep`): `correct` is a sorted array (or "noref"); `alsoAccept` is an
  optional list of alternative sorted arrays — this is how the tan one-line convention
  is honoured (her "waste of time!" ruling: for `tan x = 2` the answer `[1,3]` is correct
  AND `[1]` is accepted). Standalone question shape: `{ type:"tapcross", prompt,
  correct, alsoAccept, single, noRef, hint, answerLabel, solution }`.
- After submit: lock; correct quadrants get `show-correct`, wrongly ticked get
  `show-wrong` (reuse the existing `.hit` CSS in `css/styles.css`; add only what the
  tick glyph needs, under a `/* tapcross */` comment).

### C. `tokenpad` (new file `js/tokenpad.js`)
- `mountTokenpad(host, { sym:"θ", onSubmit })` → `{ value, raw, clear, disable }`.
- Chips, in this order on a 3-column grid like the keypad: `90°` `180°` `360°` / `−` `+`
  `θ` (the `sym` option swaps θ for `x`) / `⌫` and a wide `Submit ✓`. Same CSS classes
  as the keypad (`keypad`, `kdisp`, `kgrid`, `key`, `submit`) so it looks identical;
  add a `tokenpad` class on the wrapper only.
- Display shows the tokens joined with thin spaces, e.g. `180° − θ`.
- `normalizeTokens(str)` (exported from `js/steps-check.js`): strip `°`, whitespace,
  map ASCII `-` to `−`, map `x`/`θ` both to `θ`. Compare normalised strings; `expected`
  and `alsoAccept` entries are compared the same way. So `"180−"`, `"180°−"`,
  `"180° −"` are all equal; `"180−θ"` equals `"180−x"`.
- Length guard: max 6 tokens.

### D. `quadrant-triangle` engine (new file `js/engine/quadrant-triangle.js`)
spec:
```js
{ type:"quadtri", x, y,                 // REAL signed legs: x ≠ 0, y ≠ 0 (so the point is (x;y))
  labels:{ x?:"−3", y?:"−4", r?:"5" },  // ONLY GIVEN values are numeric; others render as letters
  letters:{ x:"x", y:"y", r:"r" },      // defaults; round 10 uses x:"t", r:"1" etc. via labels
  theta:true,                           // arc from the +x axis anticlockwise to the hypotenuse, labelled θ
  refAngle:false,                       // optional small inner arc at the origin (the acute reference angle)
  w, h, accent }
```
- Draw: both axes with arrowheads and `x`/`y` labels, `O`; the right triangle O → (x,0)
  → (x,y) → O with the right-angle mark at (x,0); the hypotenuse labelled `r` (or the
  given numeric); the legs labelled with the GIVEN numeric or the letter. A filled dot
  at (x;y). The θ arc as above.
- ONE uniform scale fitting the triangle plus a margin on all four quadrants (always
  draw all four quadrants so the learner sees WHERE the triangle sits — axes span
  ±max(|x|,|y|)·1.25 each way).
- `verifyQuadTri(spec)` returns `{ ok, checks:[{label, ok}] }` proving: the triangle's
  far vertex pixel position lies in the stated quadrant relative to the drawn origin
  pixel; px-per-unit on the x-leg equals px-per-unit on the y-leg (uniform scale); every
  NUMERIC label equals the drawn length (|x|, |y|, √(x²+y²)) within 1%; the right angle
  really is 90° in pixels; the θ arc ends on the hypotenuse direction.
- Register in `js/questions.js`: the graph switch (`q.graph.type === "quadtri"` →
  `renderQuadTri`) and a `tap` branch (`addQuadTriHits`: hot-spots at the three side
  midpoints, ids `"opp"`, `"adj"`, `"hyp"`) — same shape as `addTriangleHits`.
- Register nothing in config / quests yet.

### E. `trig-graph` engine — additive `bands` option (`js/engine/trig-graph.js`)
`spec.bands = [{ x0, x1, fill }]` → light rects drawn FIRST (under grid and curves),
spanning the full y-window, positioned by the same `X()` transform. Nothing else in the
file changes; `verifyTrig` untouched. Round 2 uses this to shade each 90° band in its
quadrant colour (①yellow ②blue ③green ④pink — Part B of the digest).

### F. `reveal` frames (`js/questions.js`, any question type)
`q.reveal = [html, html, …]` (+ optional `q.revealMode: "stack" | "replace"`, default
"stack"). Rendered between the prompt and the input: frame 1 shows immediately; a
"Next ▸" button (class `btn ghost small reveal-next`) shows the next frame — stacked
under the previous ones ("stack") or in place of them ("replace"). The input host is
HIDDEN until the last frame is showing; then the Next button disappears and the input
appears. Rounds 1 and 3 use this (the rotating-point frames; the O-A-H table built in
her order). Frames are plain HTML, so a frame can hold an inline SVG.

### G. `triglib` extensions (`js/triglib.js`, pure functions, no DOM, no randomness)
Degrees throughout. Add and export:
- `quadrantOf(angle)` → 1–4 for any angle (mod 360; quadrantal angles → null).
- `astcSign(fn, quadrant)` → +1/−1 for fn ∈ "sin"|"cos"|"tan" (A S T C).
- `rotate(angle)` → `{ angle: a, turns: [ "−360", "−360" ] }` using HER thresholds:
  > 360 subtract 360 repeatedly; < −90 add 360 repeatedly (F10: −90 is deliberate;
  −30 and −40 stay as they are). Returns the list of turns so a hint can print them
  one per 360°.
- `reduce(fn, angle)` → `{ rotated, quadrant, form, ref, sign, fn2, value }` where
  `form` ∈ "θ" | "180−" | "180+" | "360−" | "−θ" (the wheel forms on p08/p13: positive
  angles use 180−/180+/360−; an angle in (−90, 0) uses "−θ"), `ref` is the acute
  reference angle, `sign` ±1, `fn2` = fn (no co-function), `value` = fn(angle) numeric.
- `cofunction(fn, form)` for form ∈ "90−" | "90+" | "θ−90" → `{ sign, fn2 }` per her
  wheel: `90−θ` is A (everything +, fn swaps); `90+θ` is S (sin → +cos, cos → −sin —
  THE TRAP); `θ−90` (p24 ⑤): sin(θ−90) = −cosθ, cos(θ−90) = sinθ.
- `specialExact(fn, angle)` → `{ text, value }` for angle ∈ {0,30,45,60,90,180,270,360}:
  text from the O-A-H table UNRATIONALISED (`1/√3`, `1/√2`, `√3/2`, `1/2`, `1`, `√3`,
  `0`, `−1`; use the real minus sign U+2212), `value` numeric. tan 90/270 → `{text:
  "undefined", value: null}`.
- `refAngle(fn, value)` → acute angle from |value| (D2: never from the negative).
- `solutionQuadrants(fn, sign)` → sorted quadrants where fn has that sign
  (sin+ → [1,2], cos− → [2,3], tan+ → [1,3] …). Boundary values follow HER pages
  (digest D8), not the graph: `sinθ = 0` → ref 0, quadrants [1,2] (p53); `cosθ = 0` →
  ref 90, quadrant [1] only (p62); `sinθ = −1` → ref 90, quadrant [3] (p59);
  `cosθ = −1` → ref 0, quadrant [2] (p54); `sinθ = 1` → ref 90, [1]; `cosθ = 1` →
  ref 0, [1]. Export a separate `boundaryCase(fn, value)` returning `{ ref, quadrants }`
  for value ∈ {−1, 0, 1} and null otherwise; `solutionQuadrants` is for the non-zero
  general case only.
- `pythSide(known, which)` — from two of {x, y, r} (signed x/y, positive r) return the
  third with its sign taken from the quadrant: `pythSide({x:-3, y:-4})` → `{ r: 5 }`,
  `pythSide({x:-12, r:13, quadrant:2})` → `{ y: 5 }`. r always positive.
- `fmtDeg(n)` → `"−30°"` style with real minus.
Every function gets at least 3 fixed-value unit checks in the harness (below) AND a
random sweep: 2 000 random integer angles in [−1080, 1080] where `reduce()` must
satisfy `sign · fn(ref) ≈ fn(angle)` to 1e-9 and `quadrantOf` must agree with the sign
pattern of sin/cos.

### H. `play.js` — the XP-once hook (tiny, additive)
A quest def may carry `xpOnce: true` (the discovery rounds gt1–gt3 will). In `finish()`,
static path only: if `def.xpOnce` and `app.state.progress[quest.id].passed` is already
true, submit with `xp: 0` (and set `st.xp = 0` first so the results screen agrees).
Everything else unchanged; dice path untouched. Gold stays whatever the server pays
(changing that needs a migration — out of scope).

### I. `verify-gtrig.html` (new, repo root) — the skeleton all later stages extend
Same look as `verify-trig.html` (banner, cards, `tick()`/`fails`). Sections, each with
its own `<h2>` and a `<pre id>` summary; numbers in the banner:
1. triglib: the fixed checks above (≥ 60 assertions, cite her page in the label, e.g.
   "p08 eg.1 sin310 → 360−50, −sin50") + the 2 000-angle sweep.
2. quadrant-triangle: `verifyQuadTri` on ≥ 8 specs (2 per quadrant, mixed numeric /
   letter labels) + render each into the page so the foreman can LOOK (keep them in
   the DOM; ids `qt-1` …).
3. trig-graph bands: render one spec with four bands and assert four `rect` nodes
   exist with x-extents matching `X(x0)`/`X(x1)` of `computeTrig`.
4. tapcross: mount 3 widgets (single / multi / noRef), assert 4 hit rects whose centres
   map to quadrants 1–4 by sign of (cx − mid, mid − cy); simulate taps via
   `dispatchEvent(new MouseEvent("click",{bubbles:true}))` and assert the value.
5. tokenpad: `normalizeTokens` equivalence table (≥ 10 cases) + a mounted pad driven by
   clicks producing `"180−θ"`.
6. steps: mount a synthetic 4-step question (mc → tapcross → tokenpad → calc) through
   `mountQuestion` with stub handlers; drive it (a) all-right → `onResult(true)`;
   (b) one wrong-then-right step → `onResult(false)` AND all four steps completed AND
   the step hint box visible; (c) wrong-retry loop: a wrong answer never calls
   `onResult`. Also `checkStep` unit cases per kind.
7. reveal: mount an mc question with 3 frames; assert the input is hidden until the
   third "Next" and that "stack" keeps 3 frames while "replace" keeps 1.
8. play.js xpOnce: import nothing from play.js (it needs the app) — instead put the
   tiny decision in a pure exported helper `xpToSubmit(def, progressRecord, stXp)` in
   `js/play.js` and assert: not xpOnce → stXp; xpOnce + not passed → stXp; xpOnce +
   passed → 0.
9. "Chapter" section: a stub that prints "stage 2+ fills this" (0 checks) so the
   later stages have a place.
Target: every check green, 0 console errors.

### J. Regression — run and report these, all must stay green
`verify-store.html`, `verify-dice.html`, `verify-exam.html`, `verify-trig.html`,
`verify-tgraph.html`, and `node verify-exam-modules.mjs`. Report totals (passed/total)
for each, before AND after your change where you can.

## House rules that bite here
- **Never type words**: inputs are picks, taps, the number pad, the token pad.
- Real minus sign `−` (U+2212) everywhere a learner sees a negative; never a hyphen.
- Decimal comma in anything numeric a learner sees (`fmtComma`).
- No `top`/`name`/`length` as globals (silent SyntaxError in the browser).
- Copy the existing code style (comment banners explaining WHY, plain ES modules).
- Do not change existing question types' behaviour or any existing engine's verify().
- Don't run Supabase anything; `?local=1` is the only mode you need.

## Verify before you report
Serve on port 5213, open each harness in a browser (use the browser tools you have; if
screenshots hang, read the DOM — `document.querySelector("#banner").textContent`), and
paste the banner totals. Then end with:
1. the list of files created/changed, one line each with what changed;
2. each harness's before/after totals;
3. anything you decided that this brief left open, one line each;
4. anything you could not finish, and why.
