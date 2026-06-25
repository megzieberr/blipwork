/* ============================================================
   IN-APP CALCULATOR — Casio fx-991ZA Plus II (stats workflow)
   ------------------------------------------------------------
   A faithful, interactive replica of the calculator's stats flow,
   built to the exact key sequences the class is taught:
     • clear:        SHIFT 9 → 3 (All) → =
     • frequency:    SHIFT MODE (SETUP) → ▼ → 4 (STAT) → 1 ON / 2 OFF
     • enter data:   MODE → 3 (STAT) → 1 (1-VAR), type values, AC
     • read a value: SHIFT 1 (STAT) → 4 (Var) → n/x̄/σx/sx, then =
                     SHIFT 1 (STAT) → 6 (MinMax) → minX/maxX/Q1/med/Q3, =
   Results are computed from the entered data via statlib, so they
   are real. Basic +−×÷ arithmetic works on the COMP home screen.

   NOTE: Q1/med/Q3 use the school (n+1)/4 method (matching what the
   course teaches). Casio's own quartile algorithm can differ by a
   value or two — calibrate against the desktop emulator to lock it.
   ============================================================ */
import { el } from "./ui.js";
import { mean, stdDev, sortAsc, quartilesExclusive } from "./statlib.js";

/* keypad layout (id, label, optional shift-function label, css class) */
const KEYS = [
  [{ id: "shift", label: "SHIFT", cls: "k-shift" }, { id: "alpha", label: "ALPHA", cls: "k-alpha" }, { id: "up", label: "▲", cls: "k-nav" }, { id: "mode", label: "MODE", shift: "SETUP", cls: "k-fn" }, { id: "on", label: "ON", cls: "k-fn" }],
  [{ id: "left", label: "◀", cls: "k-nav" }, { id: "down", label: "▼", cls: "k-nav" }, { id: "right", label: "▶", cls: "k-nav" }, { id: "del", label: "DEL", cls: "k-fn" }, { id: "ac", label: "AC", cls: "k-ac" }],
  [{ id: "d7", label: "7" }, { id: "d8", label: "8" }, { id: "d9", label: "9", shift: "CLR" }, { id: "mult", label: "×", cls: "k-op" }, { id: "div", label: "÷", cls: "k-op" }],
  [{ id: "d4", label: "4" }, { id: "d5", label: "5" }, { id: "d6", label: "6" }, { id: "plus", label: "+", cls: "k-op" }, { id: "minus", label: "−", cls: "k-op" }],
  [{ id: "d1", label: "1", shift: "STAT" }, { id: "d2", label: "2" }, { id: "d3", label: "3" }, { id: "neg", label: "(−)" }, { id: "eq", label: "=", cls: "k-eq" }],
  [{ id: "d0", label: "0" }, { id: "dot", label: "," }, { id: "blankA", label: "", cls: "k-blank" }, { id: "blankB", label: "", cls: "k-blank" }, { id: "blankC", label: "", cls: "k-blank" }],
];

const escapeHtml = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fmtNum = v => (v == null ? "" : String(Math.round(v * 1e8) / 1e8).replace(".", ","));   // comma decimal (ZA locale, verified on the device)

export function mountCalculator(host) {
  const S = {
    shift: false, mode: "COMP", screen: "comp", freqOn: false,
    line: "", result: null, pendingStat: null,
    data: [], cell: "", row: 0, col: 0, menu: null,
  };

  // ---- scaffold ----
  const wrap = el("div", "calc");
  const lcd = el("div", "calc-lcd");
  const ind = el("div", "calc-ind");
  const main = el("div", "calc-main");
  lcd.appendChild(ind); lcd.appendChild(main);
  wrap.appendChild(lcd);
  const pad = el("div", "calc-pad");
  KEYS.forEach(rowKeys => {
    const r = el("div", "calc-row");
    rowKeys.forEach(k => {
      const b = el("button", "calc-key " + (k.cls || ""), `${k.shift ? `<span class="ksh">${k.shift}</span>` : ""}<span class="kmain">${k.label}</span>`);
      if (k.id.startsWith("blank")) b.classList.add("k-blank");
      else b.addEventListener("click", () => press(k.id));
      r.appendChild(b);
    });
    pad.appendChild(r);
  });
  wrap.appendChild(pad);
  host.appendChild(wrap);

  // ---- stats ----
  function expanded() {
    const a = [];
    S.data.forEach(d => { const f = S.freqOn ? (d.f ?? 1) : 1; for (let i = 0; i < (f || 0); i++) a.push(d.x); });
    return a;
  }
  function statValue(tok) {
    const a = expanded(); if (!a.length) return null;
    const s = sortAsc(a), n = a.length, m = mean(a);
    switch (tok) {
      case "n": return n;
      case "x̄": return m;
      case "σx": return stdDev(a);
      case "sx": return n > 1 ? Math.sqrt(a.reduce((q, x) => q + (x - m) ** 2, 0) / (n - 1)) : 0;
      case "minX": return s[0];
      case "maxX": return s[n - 1];
      case "Q1": return quartilesExclusive(s).q1;
      case "med": return quartilesExclusive(s).med;
      case "Q3": return quartilesExclusive(s).q3;
    }
    return null;
  }

  // ---- menus ----
  const openMenu = m => { S.menu = m; S.screen = "menu"; };
  const closeMenu = () => { if (S.menu && S.menu.parent) S.menu = S.menu.parent; else { S.screen = S.menu && S.menu.ret || "comp"; S.menu = null; } };

  function modeMenu() {
    openMenu({ items: [["1", "COMP"], ["2", "CMPLX"], ["3", "STAT"], ["4", "BASE-N"], ["5", "EQN"], ["6", "MATRIX"], ["7", "TABLE"]], ret: "comp",
      onNum(n) { if (n === 1) { S.mode = "COMP"; S.line = ""; S.result = null; S.menu = null; S.screen = "comp"; } else if (n === 3) statTypeMenu(); } });
  }
  function statTypeMenu() {
    openMenu({ items: [["1", "1-VAR"], ["2", "A+BX"], ["3", "_+CX²"], ["4", "ln X"], ["5", "e^X"], ["6", "A·B^X"], ["7", "A·X^B"], ["8", "1/X"]], ret: "comp",
      onNum(n) { if (n === 1) startStat(); } });
  }
  function startStat() { S.mode = "STAT"; S.data = []; S.cell = ""; S.row = 0; S.col = 0; S.menu = null; S.screen = "statInput"; }

  function setupMenu() {
    const p1 = [["1", "MthIO"], ["2", "LineIO"], ["3", "Deg"], ["4", "Rad"], ["5", "Gra"], ["6", "Fix"], ["7", "Sci"]];
    const p2 = [["1", "ab/c"], ["2", "d/c"], ["3", "CMPLX"], ["4", "STAT"], ["5", "TABLE"], ["6", "APO"], ["7", "CONT"]];
    openMenu({ items: p1, page: 0, pages: 2, ret: "comp",
      onDown() { if (this.page === 0) { this.page = 1; this.items = p2; } },
      onUp() { if (this.page === 1) { this.page = 0; this.items = p1; } },
      onNum(n) { if (this.page === 1 && n === 4) freqMenu(); } });
  }
  function freqMenu() {
    openMenu({ title: "Frequency?", items: [["1", "ON"], ["2", "OFF"]], ret: "comp",
      onNum(n) { if (n === 1) S.freqOn = true; else if (n === 2) S.freqOn = false; S.menu = null; S.screen = "comp"; } });
  }
  function clrMenu() {
    openMenu({ items: [["1", "Setup"], ["2", "Memory"], ["3", "All"]], ret: "comp",
      onNum(n) { if (n === 3) clrConfirm(); } });
  }
  function clrConfirm() {
    openMenu({ title: "Reset All?", items: [], note: "[=]:Yes   [AC]:Cancel", ret: "comp",
      onEq() { S.data = []; S.line = ""; S.result = null; S.pendingStat = null; S.mode = "COMP"; S.freqOn = false; S.menu = null; S.screen = "comp"; } });
  }
  function statMenu() {
    openMenu({ items: [["1", "Type"], ["2", "Data"], ["3", "Sum"], ["4", "Var"], ["5", "Distr"], ["6", "MinMax"]], ret: "comp",
      onNum(n) { if (n === 4) varMenu(); else if (n === 6) minMaxMenu(); else if (n === 2) { S.menu = null; S.screen = "statInput"; } } });
  }
  // STAT menu labels match the device (1:Type 2:Data 3:Sum 4:Var 5:Distr 6:MinMax)
  function varMenu() {
    const parent = S.menu;
    openMenu({ title: "Var", parent, items: [["1", "n"], ["2", "x̄"], ["3", "σx"], ["4", "sx"]], onNum(n) { pasteStat(["n", "x̄", "σx", "sx"][n - 1]); } });
  }
  function minMaxMenu() {
    const parent = S.menu;
    openMenu({ title: "MinMax", parent, items: [["1", "minX"], ["2", "maxX"], ["3", "Q1"], ["4", "med"], ["5", "Q3"]], onNum(n) { pasteStat(["minX", "maxX", "Q1", "med", "Q3"][n - 1]); } });
  }
  function pasteStat(tok) { S.menu = null; S.screen = "comp"; S.line = tok; S.pendingStat = tok; S.result = null; }

  // ---- arithmetic ----
  function evalArith(s) {
    const expr = s.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/,/g, ".");
    if (!/^[-+*/.\d() ]+$/.test(expr)) throw 0;
    const v = Function('"use strict";return (' + expr + ")")();
    if (!Number.isFinite(v)) throw 0;
    return v;
  }

  // ---- data table ----
  function commitCell() {
    if (S.cell === "" || S.cell === "-") return;
    const v = Number(S.cell.replace(",", "."));
    if (!Number.isFinite(v)) { S.cell = ""; return; }
    if (!S.freqOn) { S.data[S.row] = { x: v, f: 1 }; S.row++; }
    else if (S.col === 0) { S.data[S.row] = { x: v, f: (S.data[S.row] && S.data[S.row].f) ?? 1 }; S.col = 1; }
    else { if (S.data[S.row]) S.data[S.row].f = v; S.col = 0; S.row++; }
    S.cell = "";
  }

  // ---- key dispatch ----
  function press(id) {
    if (id === "shift") { S.shift = !S.shift; return render(); }
    let key = id;
    if (S.shift) {
      if (id === "d9") key = "clr"; else if (id === "d1") key = "stat"; else if (id === "mode") key = "setup";
      S.shift = false;
    }
    if (id === "on") { S.menu = null; S.line = ""; S.result = null; S.pendingStat = null; S.screen = S.mode === "STAT" ? "comp" : "comp"; S.shift = false; return render(); }

    if (S.screen === "comp") compKey(key);
    else if (S.screen === "menu") menuKey(key);
    else if (S.screen === "statInput") statKey(key);
    render();
  }

  const digit = id => (/^d[0-9]$/.test(id) ? +id[1] : null);
  const opChar = { plus: "+", minus: "−", mult: "×", div: "÷" };

  function compKey(key) {
    if (key === "mode") return modeMenu();
    if (key === "setup") return setupMenu();
    if (key === "clr") return clrMenu();
    if (key === "stat") { if (S.mode === "STAT") statMenu(); return; }
    if (key === "ac") { S.line = ""; S.result = null; S.pendingStat = null; return; }
    if (key === "del") { S.line = S.line.slice(0, -1); S.pendingStat = null; return; }
    if (key === "eq") {
      if (S.pendingStat) { const v = statValue(S.pendingStat); S.result = v == null ? "Math ERROR" : fmtNum(v); S.pendingStat = null; }
      else if (S.line) { try { S.result = fmtNum(evalArith(S.line)); } catch { S.result = "Syntax ERROR"; } }
      return;
    }
    const d = digit(key);
    if (d != null) { S.line += d; S.pendingStat = null; return; }
    if (key === "dot") { S.line += ","; return; }
    if (key === "neg") { S.line += "−"; return; }
    if (opChar[key]) { S.line += opChar[key]; S.pendingStat = null; return; }
  }

  function menuKey(key) {
    const m = S.menu;
    if (key === "ac") return closeMenu();
    if (key === "down" && m.onDown) return m.onDown();
    if (key === "up" && m.onUp) return m.onUp();
    if (key === "eq" && m.onEq) return m.onEq();
    const d = digit(key);
    if (d != null && m.onNum) m.onNum(d);
  }

  function statKey(key) {
    if (key === "stat") return statMenu();
    if (key === "ac") { commitCell(); S.screen = "comp"; S.line = ""; S.result = null; return; }
    if (key === "eq" || key === "down") return commitCell();
    if (key === "del") { S.cell = S.cell.slice(0, -1); return; }
    if (key === "neg") { S.cell = S.cell.startsWith("-") ? S.cell.slice(1) : "-" + S.cell; return; }
    if (key === "dot") { S.cell += ","; return; }
    const d = digit(key);
    if (d != null) S.cell += d;
  }

  // ---- render ----
  function render() {
    const tags = [];
    if (S.shift) tags.push("S");
    if (S.mode === "STAT") tags.push("STAT");
    if (S.mode === "STAT" && S.freqOn) tags.push("FREQ");
    ind.textContent = tags.join("   ");

    if (S.screen === "comp") {
      main.innerHTML = `<div class="lcd-expr">${escapeHtml(S.line || "")}</div><div class="lcd-res">${S.result != null ? escapeHtml(S.result) : (S.line ? "" : "0")}</div>`;
    } else if (S.screen === "menu") {
      const m = S.menu;
      let html = m.title ? `<div class="lcd-title">${m.title}</div>` : "";
      if (m.items && m.items.length) html += `<div class="lcd-menu">` + m.items.map(([n, l]) => `<span class="lcd-mi">${n}:${l}</span>`).join("") + `</div>`;
      if (m.note) html += `<div class="lcd-note">${m.note}</div>`;
      if (m.pages && m.page < m.pages - 1) html += `<div class="lcd-more">▼</div>`;
      main.innerHTML = html;
    } else if (S.screen === "statInput") {
      main.innerHTML = renderTable();
    }
  }
  function renderTable() {
    const freq = S.freqOn;
    const rows = Math.max(S.data.length + 1, S.row + 1);
    let html = `<table class="lcd-tab"><tr><th></th><th>X</th>${freq ? "<th>FREQ</th>" : ""}</tr>`;
    for (let r = 0; r < rows; r++) {
      const d = S.data[r];
      const xc = (r === S.row && S.col === 0) ? `<u>${escapeHtml(S.cell)}</u>` : (d ? fmtNum(d.x) : "");
      const fc = freq ? ((r === S.row && S.col === 1) ? `<u>${escapeHtml(S.cell)}</u>` : (d ? fmtNum(d.f) : "")) : "";
      html += `<tr><td>${r + 1}</td><td>${xc}</td>${freq ? `<td>${fc}</td>` : ""}</tr>`;
    }
    html += `</table>`;
    return html;
  }

  render();
  const api = { press, state: () => S };
  host.__CALC__ = api;
  return api;
}

/* full-screen overlay wrapper */
export function openCalculator() {
  const scrim = el("div", "modal-scrim calc-scrim");
  const box = el("div", "calc-wrap");
  const head = el("div", "calc-head");
  head.innerHTML = `<span class="calc-name">CASIO fx-991ZA Plus II</span>`;
  const close = el("button", "calc-close", "✕");
  head.appendChild(close);
  box.appendChild(head);
  const host = el("div", "");
  box.appendChild(host);
  mountCalculator(host);
  scrim.appendChild(box);
  const dismiss = () => scrim.remove();
  close.addEventListener("click", dismiss);
  scrim.addEventListener("click", e => { if (e.target === scrim) dismiss(); });
  document.body.appendChild(scrim);
}
