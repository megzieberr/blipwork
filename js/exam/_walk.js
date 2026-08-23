/* ============================================================
   EXAM FOCUS — "Walk me through it": which picture goes with
   which step (session G3, 2026-08-23).
   ------------------------------------------------------------
   HER ASK, on her phone, 2026-08-23: "show the steps on the sketch as
   well if the kids tapped on 'walk me through it'." Before today the
   figure had exactly TWO states — the bare printed figure while the
   learner works, and the full reveal once the memo is open — so a walk
   revealed the proof one sentence at a time beside a picture that never
   moved. The proof walked; the sketch stood still.

   THE DATA. A memo block of type `step` or `answer` may now carry an
   optional `hl` — a highlight set in EXACTLY the same shape as its
   part's `diagram.parts.<id>.reveal` (chords / angles / construction /
   bare — whatever the engine that drew the spec understands). Nothing
   else about a memo block changes, and a part with no `hl` anywhere
   behaves precisely as it did before.

   THE RULE, in one sentence: the picture for a walk that has revealed
   k blocks is the LAST `hl` at or before block k, falling back to the
   part's `question` picture.

   WHY CUMULATIVE. A proof is not a slideshow of unrelated pictures — it
   builds. So a step that adds nothing to the figure ("∴ 2x + 2y = 360°"
   — pure algebra on facts already drawn) simply carries no `hl` and
   keeps the picture it inherited. That also means each `hl` is a
   COMPLETE picture, not a diff: a step that wants to keep the previous
   step's wedges lit repeats them. That is deliberate — a diff would
   make every state depend on reading the whole chain, and the whole
   point of this file is that any state can be computed, rendered and
   LOOKED AT on its own.

   THE ANSWER BLOCK IS THE REVEAL. `reveal` stays the single source of
   truth for "the finished picture": an `answer` block with no `hl` of
   its own resolves to the part's `reveal`. That is what keeps the last
   "Next step →" click — which flips the part to fully revealed and pays
   exactly like Done — from changing the picture underneath the learner,
   and it is asserted by verify-exam-modules.mjs section 9i.

   NO ENGINE KNOWLEDGE LIVES HERE. This module only picks WHICH
   highlight set applies; js/exam-play.js still hands it to the same
   four engines through the same appliers, and js/exam/_schema.js
   validates every `hl` through the same checks a `reveal` goes
   through. Hence no imports: the harness, the validator and the player
   all resolve a walk state the same way, and cannot drift.
   ============================================================ */

/* walkHighlight(entry, memo, walkStep)
     entry     the part's diagram entry ({spec?, question?, reveal?})
     memo      the part's memo blocks, in order
     walkStep  how many blocks the walk has revealed so far (0 = none)
   Returns the highlight set to render, or undefined when the part has
   no question-side picture either (the caller then renders the bare
   spec, exactly as it does today). */
export function walkHighlight(entry, memo, walkStep) {
  if (!entry) return undefined;
  const blocks = Array.isArray(memo) ? memo : [];
  const n = Math.max(0, Math.min(Number(walkStep) || 0, blocks.length));
  /* THE WALK IS OPT-IN, PER PART. The answer-falls-through-to-reveal
     rule only fires on a part that was actually authored for the walk
     (at least one `hl` somewhere in its memo). Her scope line for this
     build was "nothing changes for any non-bookwork card", and without
     this gate every rider in the app would suddenly flip to its reveal
     picture one step early — a real change to figures nobody has looked
     at. A part with no `hl` anywhere therefore walks exactly as it did
     before today: question figure the whole way down, reveal on the
     last click. Adding one `hl` to a part opts it in, whole. */
  const authored = blocks.some(b => b && b.hl);
  if (!authored) return entry.question;
  let cur = entry.question;
  for (let i = 0; i < n; i++) {
    const b = blocks[i];
    if (!b) continue;
    if (b.hl) cur = b.hl;
    else if (b.type === "answer" && entry.reveal) cur = entry.reveal;
  }
  return cur;
}

/* Every distinct state a walk of this part passes through, in order,
   as { step, hl } — step being the number of blocks revealed when that
   picture first appears. Used by the harness (and by tools/shoot_walk.py
   through it) to enumerate what has to be measured and looked at. */
export function walkStates(entry, memo) {
  const blocks = Array.isArray(memo) ? memo : [];
  const out = [];
  let prev;
  for (let step = 0; step <= blocks.length; step++) {
    const hl = walkHighlight(entry, blocks, step);
    if (step === 0 || hl !== prev) out.push({ step, hl });
    prev = hl;
  }
  return out;
}
