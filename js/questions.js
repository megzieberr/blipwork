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

   q.type: "mc" | "reason" | "yesno" | "calc" | "tap"
   ============================================================ */
import { el, clear } from "./ui.js";
import { renderGraph, computeBox } from "./engine/stats-graph.js";
import { mountKeypad } from "./keypad.js";
import { answerCorrect, fmtComma } from "./check.js";

const SVGNS = "http://www.w3.org/2000/svg";
function svgEl(tag, attrs) { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }

export function mountQuestion(host, q, handlers = {}) {
  clear(host);
  const root = el("div", "q");
  if (q.prompt) root.appendChild(el("p", "q-prompt", q.prompt));

  // diagram / graph
  let svgNode = null;
  if (q.graph) {
    const gw = el("div", "q-graph");
    gw.innerHTML = renderGraph(q.graph) + (q.graphCap ? `<div class="cap">${q.graphCap}</div>` : "");
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
  root.appendChild(inputHost);

  // hint + I'm lost
  const hintBox = el("div", "hint-box"); hintBox.hidden = true;
  hintBox.innerHTML = `<span class="tag">HINT</span>${q.hint || "Work through the method step by step."}`;
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
    if (q.answerLabel != null) html += `<div class="fb-answer"><b>Answer:</b> ${q.answerLabel}</div>`;
    if (!isCorrect && Array.isArray(q.solution) && q.solution.length) {
      html += `<div class="sol">` + q.solution.map(s =>
        `<div class="sol-step"><span class="s">${s.s}</span>${s.r ? `<span class="r">${s.r}</span>` : ""}</div>`).join("") + `</div>`;
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
      const b = el("button", "opt", o.label);
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

  else if (q.type === "tap" && svgNode) {
    if (q.tapHint) inputHost.appendChild(el("p", "q-tap-hint", q.tapHint));
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
