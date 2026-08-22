/* ============================================================
   QUESTION COMPONENTS + reactive help
   ------------------------------------------------------------
   mountQuestion(host, q, handlers) renders ONE question of any
   supported type, runs the interaction, and on the first commit:
     • reveals correct/wrong inline
     • on a wrong answer shows the worked CAPS solution
     • offers "Continue →" (correct) or "Try a similar one →" (wrong)
   Help is reactive only: a "Hint" nudge (requestable) and an
   "I'm lost" concept card (always available). Mastery loop and XP
   live in play.js, driven by the handlers below.

   handlers = { onResult(isCorrect, chosen), onContinue(), onSibling(), onLost() }

   q.type: "mc" | "reason" | "yesno" | "calc" | "tap" | "calcdo"
         | "steps" | "tapcross"                (General Trig, 2026-08-22)

   Two additions that any type can use (General Trig, 2026-08-22):
     q.reveal      — [html, html, …] teaching frames shown between the
                     prompt and the input; the input stays HIDDEN until
                     the last frame is up (q.revealMode "stack"|"replace")
     q.type "steps"— one question made of ordered sub-steps, each of
                     which is one existing input. See mountSteps() below.
   ============================================================ */
import { el, clear, xbarHtml } from "./ui.js";
import { renderGraph, computeBox } from "./engine/stats-graph.js";
import { renderTimeline, computeTimeline } from "./engine/timeline-graph.js";
import { renderVenn, computeVenn } from "./engine/venn-graph.js";
import { renderTree, computeTree } from "./engine/tree-graph.js";
import { renderTriangle, computeTriangle } from "./engine/triangle-graph.js";
import { renderSolid, computeSolid } from "./engine/solid-graph.js";
import { renderFunction } from "./engine/function-graph.js";
import { renderTrig, computeTrig } from "./engine/trig-graph.js";
import { renderAnalytic, computeAnalytic } from "./engine/analytical-graph.js";
import { renderPattern, computePattern } from "./engine/pattern-graph.js";
import { renderQuadTri, computeQuadTri } from "./engine/quadrant-triangle.js";
import { mountKeypad } from "./keypad.js";
import { mountTapcross } from "./tapcross.js";
import { mountTokenpad } from "./tokenpad.js";
import { checkStep } from "./steps-check.js";
import { mountCalculator } from "./calculator.js";
import { answerCorrect, fmtComma } from "./check.js";

const SVGNS = "http://www.w3.org/2000/svg";
function svgEl(tag, attrs) { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }

export function mountQuestion(host, q, handlers = {}) {
  clear(host);
  const root = el("div", "q");
  if (q.prompt) root.appendChild(el("p", "q-prompt", xbarHtml(q.prompt)));

  // diagram / graph (stats charts or a finance timeline)
  let svgNode = null;
  if (q.graph) {
    const gw = el("div", "q-graph");
    const svg =
      q.graph.type === "timeline" ? renderTimeline(q.graph) :
      q.graph.type === "venn"     ? renderVenn(q.graph) :
      q.graph.type === "tree"     ? renderTree(q.graph) :
      q.graph.type === "triangle" ? renderTriangle(q.graph) :
      q.graph.type === "solid"    ? renderSolid(q.graph) :
      q.graph.type === "function" ? renderFunction(q.graph) :
      q.graph.type === "trigg"    ? renderTrig(q.graph) :
      q.graph.type === "analytic" ? renderAnalytic(q.graph) :
      q.graph.type === "pattern"  ? renderPattern(q.graph) :
      q.graph.type === "quadtri"  ? renderQuadTri(q.graph) :
      renderGraph(q.graph);
    gw.innerHTML = svg + (q.graphCap ? `<div class="cap">${xbarHtml(q.graphCap)}</div>` : "");
    svgNode = gw.querySelector("svg");
    root.appendChild(gw);
  }
  // multiple graphs side by side (e.g. comparing two box plots)
  if (Array.isArray(q.graphs) && q.graphs.length) {
    const row = el("div", "q-graphs");
    q.graphs.forEach(g => {
      const pane = el("div", "gpane");
      pane.innerHTML = (g.label ? `<div class="glabel">${g.label}</div>` : "") + renderGraph(g.spec || g);
      row.appendChild(pane);
    });
    root.appendChild(row);
  }

  const inputHost = el("div", "q-input");
  // teaching frames (q.reveal) sit between the prompt/diagram and the
  // input, and keep the input hidden until the last one is showing
  mountReveal(root, q, inputHost);
  root.appendChild(inputHost);

  // hint + I'm lost
  const hintBox = el("div", "hint-box"); hintBox.hidden = true;
  hintBox.innerHTML = `<span class="tag">HINT</span>${xbarHtml(q.hint) || "Work through the method step by step."}`;
  const helpRow = el("div", "help-row");
  const hintBtn = el("button", "btn ghost small", "💡 Hint");
  hintBtn.addEventListener("click", () => { hintBox.hidden = false; hintBtn.disabled = true; });
  const lostBtn = el("button", "btn ghost small hbtn-lost", "🆘 I’m lost");
  lostBtn.addEventListener("click", () => handlers.onLost && handlers.onLost());
  helpRow.appendChild(hintBtn); helpRow.appendChild(lostBtn);

  const feedback = el("div", "feedback"); feedback.hidden = true;

  let answered = false;
  function commit(isCorrect, chosen) {
    if (answered) return;
    answered = true;
    handlers.onResult && handlers.onResult(isCorrect, chosen);

    hintBtn.style.display = "none";                 // hide hint once answered (kept the I'm-lost button)
    feedback.hidden = false;
    feedback.classList.add(isCorrect ? "good" : "bad");
    let html = `<div class="fb-head">${isCorrect ? "✓ Correct!" : "✗ Not quite"}</div>`;
    if (q.answerLabel != null) html += `<div class="fb-answer"><b>Answer:</b> ${xbarHtml(q.answerLabel)}</div>`;
    if (!isCorrect && Array.isArray(q.solution) && q.solution.length) {
      html += `<div class="sol">` + q.solution.map(s =>
        `<div class="sol-step"><span class="s">${xbarHtml(s.s)}</span>${s.r ? `<span class="r">${xbarHtml(s.r)}</span>` : ""}</div>`).join("") + `</div>`;
    }
    feedback.innerHTML = html;
    const foot = el("div", "fb-foot");
    const next = el("button", "btn primary", isCorrect ? "Continue →" : "Try a similar one →");
    next.addEventListener("click", () => (isCorrect ? handlers.onContinue : handlers.onSibling)());
    foot.appendChild(next);
    feedback.appendChild(foot);
    next.focus();
  }

  // ---- per-type input ----
  if (q.type === "mc" || q.type === "reason") {
    const opts = el("div", "q-options" + (q.layout === "grid2" ? " grid2" : ""));
    q.options.forEach((o, idx) => {
      const b = el("button", "opt", xbarHtml(o.label));
      b.addEventListener("click", () => {
        if (answered) return;
        [...opts.children].forEach((x, i) => { x.disabled = true; if (q.options[i].correct) x.classList.add("is-correct"); });
        b.classList.add(o.correct ? "is-correct" : "is-wrong");
        commit(!!o.correct, o.label);
      });
      opts.appendChild(b);
    });
    inputHost.appendChild(opts);
  }

  else if (q.type === "yesno") {
    const opts = el("div", "q-options yesno");
    [["Yes", true], ["No", false]].forEach(([label, val]) => {
      const b = el("button", "opt big", label);
      b.addEventListener("click", () => {
        if (answered) return;
        const ok = (val === !!q.yes);
        [...opts.children].forEach(x => x.disabled = true);
        b.classList.add(ok ? "is-correct" : "is-wrong");
        commit(ok, label);
      });
      opts.appendChild(b);
    });
    inputHost.appendChild(opts);
  }

  else if (q.type === "calc") {
    const kp = mountKeypad(inputHost, {
      unit: q.unit || "", allowNeg: !!q.allowNeg,
      onSubmit: (v) => {
        if (answered) return;
        if (!Number.isFinite(v)) return;          // ignore empty submit
        kp.disable();
        commit(answerCorrect(v, q.expected, { dp: q.dp, tol: q.tol }), fmtComma(v, q.dp));
      },
    });
  }

  // hands-on calculator task: the learner works the embedded Casio, then taps
  // "Check my answer". Correct → ✓ Continue. Wrong → a "Not quite" panel with
  // [Try again] (same task, fresh calculator) and [Show me the steps] → retry.
  else if (q.type === "calcdo") {
    if (q.task) inputHost.appendChild(el("p", "q-task", xbarHtml(q.task)));
    const calcBox = el("div", "q-calc");
    inputHost.appendChild(calcBox);
    const checkRow = el("div", "q-check");
    const checkBtn = el("button", "btn primary big", "Check my answer");
    checkRow.appendChild(checkBtn);
    inputHost.appendChild(checkRow);

    const flags = { cleared: false, enteredStat: false, lastStat: null };
    const ms = a => a.slice().sort((x, y) => x - y).join(",");
    const calcApi = mountCalculator(calcBox, {
      setup: q.setup,
      onEvent(type, p) {
        if (type === "clear") flags.cleared = true;
        else if (type === "statMode") flags.enteredStat = true;
        else if (type === "stat") flags.lastStat = p;       // last value the learner computed (tok + value)
      },
    });

    function goalMet() {
      const g = q.goal, s = calcApi.state();
      if (g.type === "clear")    return flags.cleared;
      if (g.type === "freq")     return s.freqOn === !!g.on;
      if (g.type === "statMode") return flags.enteredStat || s.mode === "STAT";
      if (g.type === "data")     return ms(s.data.map(d => d.x)) === ms(g.expect);
      if (g.type === "stat") {
        const tol = g.tol == null ? 1e-6 : g.tol;
        return !!(flags.lastStat && flags.lastStat.tok === g.tok && flags.lastStat.value != null && Math.abs(flags.lastStat.value - g.value) <= tol);
      }
      return false;
    }
    const lockCalc = () => { calcBox.classList.add("locked"); checkBtn.disabled = true; hintBtn.style.display = "none"; };

    checkBtn.addEventListener("click", () => {
      if (answered) return;
      if (goalMet()) { lockCalc(); checkRow.remove(); commit(true, "calcdo"); return; }
      // wrong: lock this attempt (a retry re-mounts a fresh question), show the two-option panel
      answered = true;
      lockCalc();
      handlers.onWrong && handlers.onWrong();
      feedback.hidden = false; feedback.classList.add("bad");
      feedback.innerHTML = `<div class="fb-head">✗ Not quite</div><div class="fb-sub muted small">Have another go, or let me show you the steps.</div>`;
      const foot = el("div", "fb-foot");
      const again = el("button", "btn primary", "Try again");
      again.addEventListener("click", () => handlers.onRetry && handlers.onRetry());
      const show = el("button", "btn ghost", "Show me the steps");
      show.addEventListener("click", () => {
        show.remove();
        handlers.onSteps && handlers.onSteps();
        let html = "";
        if (q.answerLabel != null) html += `<div class="fb-answer"><b>Answer:</b> ${xbarHtml(q.answerLabel)}</div>`;
        if (Array.isArray(q.solution) && q.solution.length)
          html += `<div class="sol">` + q.solution.map(s => `<div class="sol-step"><span class="s">${xbarHtml(s.s)}</span>${s.r ? `<span class="r">${xbarHtml(s.r)}</span>` : ""}</div>`).join("") + `</div>`;
        feedback.insertBefore(el("div", "", html), foot);
      });
      foot.appendChild(again); foot.appendChild(show);
      feedback.appendChild(foot);
      again.focus();
    });
  }

  // ---- General Trig: a question made of ordered sub-steps ----
  else if (q.type === "steps") {
    mountSteps(inputHost, root, q, commit, svgNode);
  }

  // ---- General Trig: her quadrant cross, on its own ----
  else if (q.type === "tapcross") {
    if (q.tapHint) inputHost.appendChild(el("p", "q-tap-hint", xbarHtml(q.tapHint)));
    const tc = mountTapcross(inputHost, {
      single: !!q.single, noRef: !!q.noRef, labels: !!q.labels,
      onSubmit(val) {
        if (answered) return;
        const ok = checkStep({ kind: "tapcross", correct: q.correct, alsoAccept: q.alsoAccept }, val);
        tc.disable();
        tc.reveal(Array.isArray(q.correct) ? q.correct : []);
        commit(ok, Array.isArray(val) ? val.join(",") : String(val));
      },
    });
  }

  else if (q.type === "tap" && svgNode && q.graph && q.graph.type === "quadtri") {
    if (q.tapHint) inputHost.appendChild(el("p", "q-tap-hint", xbarHtml(q.tapHint)));
    addQuadTriHits(svgNode, computeQuadTri(q.graph), q.tap, (id) => {
      if (answered) return;
      commit(id === q.tap.correctId, id);
    });
  }

  else if (q.type === "tap" && svgNode && q.graph && q.graph.type === "timeline") {
    if (q.tapHint) inputHost.appendChild(el("p", "q-tap-hint", xbarHtml(q.tapHint)));
    addTimelineHits(svgNode, computeTimeline(q.graph), q.tap, (id) => {
      if (answered) return;
      commit(id === q.tap.correctId, id);
    });
  }

  else if (q.type === "tap" && svgNode && q.graph && q.graph.type === "venn") {
    if (q.tapHint) inputHost.appendChild(el("p", "q-tap-hint", xbarHtml(q.tapHint)));
    addVennHits(svgNode, computeVenn(q.graph), q.tap, (id) => {
      if (answered) return;
      commit(id === q.tap.correctId, id);
    });
  }

  else if (q.type === "tap" && svgNode && q.graph && q.graph.type === "tree") {
    if (q.tapHint) inputHost.appendChild(el("p", "q-tap-hint", xbarHtml(q.tapHint)));
    addTreeHits(svgNode, computeTree(q.graph), q.tap, (id) => {
      if (answered) return;
      commit(id === q.tap.correctId, id);
    });
  }

  else if (q.type === "tap" && svgNode && q.graph && q.graph.type === "triangle") {
    if (q.tapHint) inputHost.appendChild(el("p", "q-tap-hint", xbarHtml(q.tapHint)));
    addTriangleHits(svgNode, computeTriangle(q.graph), q.tap, (id) => {
      if (answered) return;
      commit(id === q.tap.correctId, id);
    });
  }

  else if (q.type === "tap" && svgNode && q.graph && q.graph.type === "trigg") {
    if (q.tapHint) inputHost.appendChild(el("p", "q-tap-hint", xbarHtml(q.tapHint)));
    addTrigHits(svgNode, computeTrig(q.graph), q.graph, q.tap, (id) => {
      if (answered) return;
      commit(id === q.tap.correctId, id);
    });
  }

  else if (q.type === "tap" && svgNode && q.graph && q.graph.type === "analytic") {
    if (q.tapHint) inputHost.appendChild(el("p", "q-tap-hint", xbarHtml(q.tapHint)));
    addAnalyticHits(svgNode, computeAnalytic(q.graph), q.graph, q.tap, (id) => {
      if (answered) return;
      commit(id === q.tap.correctId, id);
    });
  }

  else if (q.type === "tap" && svgNode && q.graph && q.graph.type === "pattern") {
    if (q.tapHint) inputHost.appendChild(el("p", "q-tap-hint", xbarHtml(q.tapHint)));
    addPatternHits(svgNode, computePattern(q.graph), q.tap, (id) => {
      if (answered) return;
      commit(id === q.tap.correctId, id);
    });
  }

  else if (q.type === "tap" && svgNode) {
    if (q.tapHint) inputHost.appendChild(el("p", "q-tap-hint", xbarHtml(q.tapHint)));
    addBoxHits(svgNode, computeBox(q.graph), q.tap, (id) => {
      if (answered) return;
      commit(id === q.tap.correctId, id);
    });
  }

  root.appendChild(hintBox);
  root.appendChild(helpRow);
  root.appendChild(feedback);
  host.appendChild(root);
}


/* ------------------------------------------------------------
   REVEAL FRAMES  (q.reveal)
   ------------------------------------------------------------
   Her discovery rounds build an idea one beat at a time — the point
   rotating round the circle (round 1), the O-A-H table written in HER
   order (round 3). Each beat is a plain HTML frame (so a frame can
   hold an inline SVG); a "Next ▸" button walks them.

   The input is HIDDEN until the last frame is showing, which is the
   whole reason this lives here and not in a quest file: a learner
   can't answer a discovery question before the discovery has
   happened. "stack" (default) leaves the earlier frames on screen;
   "replace" swaps them.
   ------------------------------------------------------------ */
function mountReveal(root, q, inputHost) {
  const frames = Array.isArray(q.reveal) ? q.reveal.filter(f => f != null) : null;
  if (!frames || !frames.length) return null;
  const mode = q.revealMode === "replace" ? "replace" : "stack";

  const box = el("div", "q-reveal");
  box.dataset.mode = mode;
  root.appendChild(box);

  const nextBtn = el("button", "btn ghost small reveal-next", "Next \u25b8");
  nextBtn.type = "button";
  let shown = -1;

  function show(i) {
    if (mode === "replace") clear(box);
    const f = el("div", "reveal-frame", xbarHtml(frames[i]));
    f.dataset.frame = String(i);
    box.appendChild(f);
    shown = i;
    box.dataset.frame = String(i);
    if (i >= frames.length - 1) { nextBtn.remove(); inputHost.hidden = false; }
  }
  nextBtn.addEventListener("click", () => { if (shown < frames.length - 1) show(shown + 1); });

  inputHost.hidden = frames.length > 1;
  show(0);
  if (frames.length > 1) root.appendChild(nextBtn);
  return box;
}

/* ------------------------------------------------------------
   STEPS  (q.type === "steps")
   ------------------------------------------------------------
   One question, several ordered sub-steps, each of which is one
   input the app already has (mc / tapcross / calc / tokenpad /
   tapside). This is her round-4/5/7/8/12/13 shape: pick the sign →
   pick the ratio → type the value.

   The rule that matters — FIRST ANSWER COUNTS. A step's first
   answer decides that step: right locks it and opens the next one;
   wrong shows THAT step's hint, flips the question to "not clean",
   and lets the learner retry the same step as often as they like.
   Retries are practice — they never change the verdict, and they
   never call onResult. Only the last step's success commits, with
   `clean` deciding ✓ Correct or ✗ Not quite (which is what shows
   her full solution + "Try a similar one").

   The harness reads the state off the DOM:
     .q[data-step]         index of the step now being answered
     .q[data-clean]        "1" while no step has been missed
     .q-step[data-kind]    the input this step uses
     .q-step[data-state]   "active" | "retry" | "done"
   ------------------------------------------------------------ */
function mountSteps(host, root, q, commit, svgNode) {
  const list = Array.isArray(q.steps) ? q.steps : [];
  const all = el("div", "q-steps");
  host.appendChild(all);

  let clean = true, idx = 0;
  root.dataset.step = "0";
  root.dataset.clean = "1";
  if (!list.length) return;

  function miss(w, hintBox) {
    clean = false;
    root.dataset.clean = "0";
    w.dataset.state = "retry";
    w.dataset.retried = "1";
    hintBox.hidden = false;
  }

  function settle(i, w) {
    w.dataset.state = "done";
    const badge = el("span", "q-step-mark" + (w.dataset.retried === "1" ? " retried" : ""),
      w.dataset.retried === "1" ? "\u2717 \u2713" : "\u2713");
    (w.querySelector(".q-step-prompt") || w).appendChild(badge);
    if (i >= list.length - 1) {
      root.dataset.step = String(list.length);
      commit(clean, "steps");
    } else {
      idx = i + 1;
      root.dataset.step = String(idx);
      renderStep(idx);
    }
  }

  function renderStep(i) {
    const step = list[i] || {};
    const w = el("div", "q-step");
    w.dataset.kind = step.kind || "";
    w.dataset.state = "active";
    w.dataset.index = String(i);
    w.appendChild(el("p", "q-step-prompt", xbarHtml(step.prompt || "")));
    const shost = el("div", "q-step-input");
    w.appendChild(shost);
    const hintBox = el("div", "hint-box step-hint");
    hintBox.hidden = true;
    hintBox.innerHTML = `<span class="tag">HINT</span>${xbarHtml(step.hint) || "Work this step the way she does."}`;
    w.appendChild(hintBox);
    all.appendChild(w);
    mountStepInput(step, i, w, shost, hintBox);
  }

  function mountStepInput(step, i, w, shost, hintBox) {
    const busy = () => w.dataset.state === "done";

    if (step.kind === "mc") {
      const opts = el("div", "q-options" + (step.layout === "grid2" ? " grid2" : ""));
      (step.options || []).forEach((o, oi) => {
        const b = el("button", "opt", xbarHtml(o.label));
        b.addEventListener("click", () => {
          if (busy() || b.disabled) return;
          if (checkStep(step, oi)) {
            [...opts.children].forEach((x, k) => {
              x.disabled = true;
              if ((step.options[k] || {}).correct) x.classList.add("is-correct");
            });
            settle(i, w);
          } else {
            // a wrong option greys out and STAYS out; the rest are still live
            b.disabled = true;
            b.classList.add("is-wrong");
            miss(w, hintBox);
          }
        });
        opts.appendChild(b);
      });
      shost.appendChild(opts);
      return;
    }

    if (step.kind === "tapcross") {
      const tc = mountTapcross(shost, {
        single: !!step.single, noRef: !!step.noRef, labels: !!step.labels,
        onSubmit(val) {
          if (busy()) return;
          if (checkStep(step, val)) {
            tc.disable();
            tc.reveal(Array.isArray(step.correct) ? step.correct : []);
            settle(i, w);
          } else {
            miss(w, hintBox);
            tc.reset();                       // the ticks clear, ready for another go
          }
        },
      });
      return;
    }

    if (step.kind === "calc") {
      const kp = mountKeypad(shost, {
        unit: step.unit || "", allowNeg: !!step.allowNeg,
        onSubmit(v) {
          if (busy()) return;
          if (!Number.isFinite(v)) return;     // ignore an empty submit, same as a plain calc
          if (checkStep(step, v)) { kp.disable(); settle(i, w); }
          else { miss(w, hintBox); kp.clear(); }
        },
      });
      return;
    }

    if (step.kind === "tokenpad") {
      const tp = mountTokenpad(shost, {
        sym: step.sym || "\u03b8",
        onSubmit(raw) {
          if (busy()) return;
          if (!raw) return;                    // ignore an empty submit
          if (checkStep(step, raw)) { tp.disable(); settle(i, w); }
          else { miss(w, hintBox); tp.clear(); }
        },
      });
      return;
    }

    if (step.kind === "tapside") {
      if (!svgNode || !q.graph || q.graph.type !== "quadtri") return;
      shost.appendChild(el("p", "q-tap-hint", xbarHtml(step.tapHint || "Tap that side on the sketch.")));
      let lastWrong = null;
      addQuadTriHits(svgNode, computeQuadTri(q.graph), { targets: step.targets }, (id, node) => {
        if (busy()) return;
        if (lastWrong) { lastWrong.classList.remove("show-wrong"); lastWrong = null; }
        if (checkStep(step, id)) {
          svgNode.querySelectorAll(".hit").forEach(h => {
            h.classList.add("locked");
            if (h.dataset.id === String(step.correct)) h.classList.add("show-correct");
          });
          settle(i, w);
        } else {
          node.classList.add("show-wrong");
          lastWrong = node;
          miss(w, hintBox);
        }
      }, { lock: false });
    }
  }

  renderStep(0);
}

/* ------------------------------------------------------------
   Tappable sides of a quadrant triangle. Hot-spots at the three
   side midpoints, ids "adj" (the x-leg), "opp" (the y-leg) and
   "hyp" — the a / o / h she labels on p28. Positions come straight
   from the engine, so a target is always ON the side it names.
   opts.lock === false leaves the hits live after a tap (the steps
   type marks per step and wants a retry to be possible).
   ------------------------------------------------------------ */
function addQuadTriHits(svg, geo, tap, onPick, opts = {}) {
  const lock = opts.lock !== false;
  const targets = (tap && tap.targets) || ["opp", "adj", "hyp"];
  targets.forEach(id => {
    const sp = geo.sideMids[id];
    if (!sp) return;
    const node = svgEl("circle", { cx: sp.x, cy: sp.y, r: 18, class: "hit", "data-id": id });
    node.addEventListener("click", () => {
      if (node.classList.contains("locked")) return;
      if (lock) {
        svg.querySelectorAll(".hit").forEach(h => {
          h.classList.add("locked");
          if (h.dataset.id === tap.correctId) h.classList.add("show-correct");
        });
        if (id !== tap.correctId) node.classList.add("show-wrong");
      }
      onPick(id, node);
    });
    svg.appendChild(node);
  });
}

/* ------------------------------------------------------------
   Tappable regions over a box-and-whisker plot, positioned from
   the engine's resolved geometry. Regions: whiskerL (lowest 25%),
   box (the IQR), median, whiskerR (highest 25%).
   ------------------------------------------------------------ */
function addBoxHits(svg, geo, tap, onPick) {
  const { px, cy, bh, cap } = geo;
  const regions = {
    whiskerL: { x: px.min, w: px.q1 - px.min, h: cap, shape: "rect" },
    box:      { x: px.q1, w: px.q3 - px.q1, h: bh, shape: "rect" },
    median:   { x: px.med - 9, w: 18, h: bh, shape: "rect" },
    whiskerR: { x: px.q3, w: px.max - px.q3, h: cap, shape: "rect" },
  };
  const ids = tap.targets || ["whiskerL", "box", "median", "whiskerR"];
  // draw box/whiskers first, median last so it sits on top of the overlapping box
  ["whiskerL", "whiskerR", "box", "median"].filter(id => ids.includes(id)).forEach(id => {
    const r = regions[id];
    const node = svgEl("rect", { x: r.x, y: cy - r.h, width: Math.max(r.w, 1), height: r.h * 2, rx: 3, class: "hit", "data-shape": "fill", "data-id": id });
    node.addEventListener("click", () => {
      if (node.classList.contains("locked")) return;
      svg.querySelectorAll(".hit").forEach(n => {
        n.classList.add("locked");
        if (n.dataset.id === tap.correctId) n.classList.add("show-correct");
      });
      if (id !== tap.correctId) node.classList.add("show-wrong");
      onPick(id);
    });
    svg.appendChild(node);
  });
}

/* ------------------------------------------------------------
   Tappable nodes over a finance timeline. Each node T(t) gets a
   clickable band; id is the node index t. correctId is the node
   the question asks for (e.g. where the amount ends up).
   ------------------------------------------------------------ */
function addTimelineHits(svg, geo, tap, onPick) {
  const targets = tap.targets || geo.nodes.map(n => n.t);
  const half = geo.nodes.length > 1 ? (geo.nodes[1].x - geo.nodes[0].x) / 2 : 14;
  const top = 8, bot = geo.cy + 26;
  geo.nodes.filter(n => targets.includes(n.t)).forEach(n => {
    const node = svgEl("rect", { x: n.x - half + 2, y: top, width: Math.max(half * 2 - 4, 10), height: bot - top, rx: 6, class: "hit tl-hit", "data-id": String(n.t) });
    node.addEventListener("click", () => {
      if (node.classList.contains("locked")) return;
      svg.querySelectorAll(".hit").forEach(h => {
        h.classList.add("locked");
        if (Number(h.dataset.id) === tap.correctId) h.classList.add("show-correct");
      });
      if (n.t !== tap.correctId) node.classList.add("show-wrong");
      onPick(n.t);
    });
    svg.appendChild(node);
  });
}

/* ------------------------------------------------------------
   Tappable Venn regions. Each region gets a circular hot-spot at
   the region's label anchor (verify guarantees that anchor is
   inside the correct region, so a tap is unambiguous). id = region.
   ------------------------------------------------------------ */
function addVennHits(svg, geo, tap, onPick) {
  const targets = tap.targets || (geo.one ? ["inside", "out"] : ["onlyA", "inter", "onlyB", "outside"]);
  const R = 22;
  targets.forEach(id => {
    const a = geo.anchors[id];
    if (!a) return;
    const node = svgEl("circle", { cx: a.x, cy: a.y, r: R, class: "hit", "data-id": id });
    node.addEventListener("click", () => {
      if (node.classList.contains("locked")) return;
      svg.querySelectorAll(".hit").forEach(h => {
        h.classList.add("locked");
        if (h.dataset.id === tap.correctId) h.classList.add("show-correct");
      });
      if (id !== tap.correctId) node.classList.add("show-wrong");
      onPick(id);
    });
    svg.appendChild(node);
  });
}

/* ------------------------------------------------------------
   Tappable triangle parts. mode "vertex": a hot-spot on each named
   vertex (id = vertex name). mode "side": a hot-spot at each side's
   midpoint (id = "AB" style, from the outline order). Geometry comes
   straight from the engine so the tap target is always on the shape.
   ------------------------------------------------------------ */
function addTriangleHits(svg, geo, tap, onPick) {
  const mode = tap.mode || "vertex";
  const spots = [];
  if (mode === "vertex") {
    (tap.targets || geo.poly).forEach(id => { if (geo.P[id]) spots.push({ id, x: geo.P[id].x, y: geo.P[id].y }); });
  } else {
    (tap.targets || Object.keys(geo.sideMids)).forEach(id => { if (geo.sideMids[id]) spots.push({ id, x: geo.sideMids[id].x, y: geo.sideMids[id].y }); });
  }
  spots.forEach(sp => {
    const node = svgEl("circle", { cx: sp.x, cy: sp.y, r: 18, class: "hit", "data-id": sp.id });
    node.addEventListener("click", () => {
      if (node.classList.contains("locked")) return;
      svg.querySelectorAll(".hit").forEach(h => {
        h.classList.add("locked");
        if (h.dataset.id === tap.correctId) h.classList.add("show-correct");
      });
      if (sp.id !== tap.correctId) node.classList.add("show-wrong");
      onPick(sp.id);
    });
    svg.appendChild(node);
  });
}

/* ------------------------------------------------------------
   Tappable points on a trig graph. Each marked point that carries
   an id (peak / trough / intersection / decoy) gets a circular
   hot-spot at its exact (X,Y) pixel; id is matched to correctId.
   ------------------------------------------------------------ */
function addTrigHits(svg, geo, spec, tap, onPick) {
  const targets = tap.targets || (spec.points || []).map(p => p.id).filter(x => x != null);
  (spec.points || []).forEach(p => {
    if (p.id == null || !targets.includes(p.id)) return;
    const node = svgEl("circle", { cx: geo.X(p.x), cy: geo.Y(p.y), r: 16, class: "hit", "data-id": String(p.id) });
    node.addEventListener("click", () => {
      if (node.classList.contains("locked")) return;
      svg.querySelectorAll(".hit").forEach(h => {
        h.classList.add("locked");
        if (h.dataset.id === String(tap.correctId)) h.classList.add("show-correct");
      });
      if (p.id !== tap.correctId) node.classList.add("show-wrong");
      onPick(p.id);
    });
    svg.appendChild(node);
  });
}

/* ------------------------------------------------------------
   Tappable tree leaves. Each leaf (one full outcome path) gets a
   clickable row band; id is the leaf index.
   ------------------------------------------------------------ */
/* ------------------------------------------------------------
   Tappable analytical-geometry parts. mode "point": a hot-spot on
   each plotted point (id = point.id). mode "seg": a hot-spot at the
   midpoint of each segment/line (id = seg.id). Pixel positions come
   straight from the engine transform so the target is always on the
   shape, even for a clipped full line.
   ------------------------------------------------------------ */
function addAnalyticHits(svg, geo, spec, tap, onPick) {
  const { X, Y } = geo;
  const spots = [];
  if ((tap.mode || "point") === "point") {
    (spec.points || []).forEach(p => {
      if (p.id == null || (tap.targets && !tap.targets.includes(p.id))) return;
      spots.push({ id: p.id, x: X(p.x), y: Y(p.y) });
    });
  } else {
    // place the hot-spot PART-WAY along the segment (0.62), not at its midpoint:
    // several lines can share a midpoint (e.g. all through the origin), but a point
    // along each one stays distinct because their directions differ.
    (spec.segs || []).forEach(sg => {
      if (sg.id == null || (tap.targets && !tap.targets.includes(sg.id))) return;
      const t = 0.62;
      spots.push({ id: sg.id, x: X(sg.a.x + (sg.b.x - sg.a.x) * t), y: Y(sg.a.y + (sg.b.y - sg.a.y) * t) });
    });
  }
  spots.forEach(sp => {
    const node = svgEl("circle", { cx: sp.x, cy: sp.y, r: 18, class: "hit", "data-id": String(sp.id) });
    node.addEventListener("click", () => {
      if (node.classList.contains("locked")) return;
      svg.querySelectorAll(".hit").forEach(h => {
        h.classList.add("locked");
        if (h.dataset.id === String(tap.correctId)) h.classList.add("show-correct");
      });
      if (sp.id !== tap.correctId) node.classList.add("show-wrong");
      onPick(sp.id);
    });
    svg.appendChild(node);
  });
}

/* ------------------------------------------------------------
   Tappable cells of a difference pyramid. Each target cell id
   ("t0", "d1_2", "d2_0", …) gets a hot-spot at its centre, sized
   to the cell. correctId is matched exactly.
   ------------------------------------------------------------ */
function addPatternHits(svg, geo, tap, onPick) {
  const targets = tap.targets || geo.cells.map((c) => c.id);
  geo.cells.filter((c) => targets.includes(c.id)).forEach((c) => {
    const node = svgEl("rect", { x: c.cx - c.w / 2 - 3, y: c.cy - c.h / 2 - 3, width: c.w + 6, height: c.h + 6, rx: 9, class: "hit", "data-id": c.id });
    node.addEventListener("click", () => {
      if (node.classList.contains("locked")) return;
      svg.querySelectorAll(".hit").forEach((h) => {
        h.classList.add("locked");
        if (h.dataset.id === tap.correctId) h.classList.add("show-correct");
      });
      if (c.id !== tap.correctId) node.classList.add("show-wrong");
      onPick(c.id);
    });
    svg.appendChild(node);
  });
}

function addTreeHits(svg, geo, tap, onPick) {
  const targets = tap.targets || geo.leaves.map((_, i) => i);
  const h = geo.rowH;
  geo.leaves.forEach((lf, i) => {
    if (!targets.includes(i)) return;
    const node = svgEl("rect", { x: lf.x - 14, y: lf.y - h / 2 + 2, width: geo.W - (lf.x - 14) - 4, height: h - 4, rx: 6, class: "hit", "data-id": String(i) });
    node.addEventListener("click", () => {
      if (node.classList.contains("locked")) return;
      svg.querySelectorAll(".hit").forEach(hh => {
        hh.classList.add("locked");
        if (Number(hh.dataset.id) === tap.correctId) hh.classList.add("show-correct");
      });
      if (i !== tap.correctId) node.classList.add("show-wrong");
      onPick(i);
    });
    svg.appendChild(node);
  });
}
