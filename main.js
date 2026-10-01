(function () {
  "use strict";

  const data = window.__BRAND__ || {};
  const $ = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));
  const escHTML = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  const fmtMoney = (n) => "$" + Math.round(n).toLocaleString("es-MX");
  const fmtPct = (n) => (n * 100).toFixed(2) + "%";

  // ---- ISR Régimen General (tarifa progresiva sobre Ingresos - Deducciones) ----
  function calcGeneral(ingresos, deducciones) {
    const base = Math.max(0, ingresos - (deducciones || 0));
    const tabla = data.tarifaGeneral || [];
    const bracket = tabla.find(b => base >= b.limInf && base <= b.limSup) || tabla[tabla.length - 1];
    if (!bracket) return { isr: 0, tasaEfectiva: 0, base };
    const isr = bracket.cuota + (base - bracket.limInf) * bracket.pct;
    return { isr: Math.max(0, isr), tasaEfectiva: base > 0 ? isr / base : 0, base, marginal: bracket.pct };
  }

  // ---- ISR RESICO (tasa fija sobre Ingresos, sin deducciones) ----
  function calcResico(ingresos) {
    const tabla = data.tarifaResico || [];
    if (ingresos > (data.resicoTopeMensual || Infinity)) {
      return { isr: null, tasa: null, excedeTope: true };
    }
    const row = tabla.find(r => ingresos <= r.limSup) || tabla[tabla.length - 1];
    if (!row) return { isr: 0, tasa: 0 };
    const isr = ingresos * row.tasa;
    return { isr, tasa: row.tasa, excedeTope: false };
  }

  function mountFaqs() {
    const target = $("[data-faqs]");
    if (!target || target.children.length > 0 || !data.faqs) return;
    target.innerHTML = data.faqs.map(f => `
      <details class="faq-item">
        <summary>${escHTML(f.q)}</summary>
        <p>${escHTML(f.a)}</p>
      </details>
    `).join("");
  }

  function showError(msg) {
    const err = $("#error");
    const result = $("#result");
    result.hidden = true;
    err.hidden = false;
    if (msg) $("#error p").textContent = msg;
  }

  function hideError() {
    $("#error").hidden = true;
  }

  function renderResult(ingresos, deducciones) {
    const resico = calcResico(ingresos);
    const general = calcGeneral(ingresos, deducciones);

    const result = $("#result");
    const cardResico = $("#card-resico");
    const cardGeneral = $("#card-general");
    cardResico.classList.remove("is-winner");
    cardGeneral.classList.remove("is-winner");

    if (resico.excedeTope) {
      $("#resico-isr").textContent = "No aplica";
      $("#resico-rate").textContent = "Ingreso supera el tope mensual de RESICO (~$" + Math.round(data.resicoTopeMensual).toLocaleString("es-MX") + ")";
    } else {
      $("#resico-isr").textContent = fmtMoney(resico.isr);
      $("#resico-rate").textContent = "Tasa fija: " + fmtPct(resico.tasa);
    }

    $("#general-isr").textContent = fmtMoney(general.isr);
    $("#general-rate").textContent = "Tasa efectiva: " + fmtPct(general.tasaEfectiva);

    const winnerEl = $("#winner");
    if (resico.excedeTope) {
      cardGeneral.classList.add("is-winner");
      winnerEl.textContent = "Con ese ingreso no puedes tributar en RESICO — te corresponde Régimen General.";
    } else if (resico.isr < general.isr) {
      cardResico.classList.add("is-winner");
      const ahorro = general.isr - resico.isr;
      winnerEl.textContent = "RESICO te conviene más — ahorrarías aprox. " + fmtMoney(ahorro) + " al mes en ISR.";
    } else if (general.isr < resico.isr) {
      cardGeneral.classList.add("is-winner");
      const ahorro = resico.isr - general.isr;
      winnerEl.textContent = "Régimen General te conviene más — ahorrarías aprox. " + fmtMoney(ahorro) + " al mes en ISR.";
    } else {
      winnerEl.textContent = "Ambos regímenes te dan prácticamente el mismo ISR este mes.";
    }

    result.hidden = false;
    result.setAttribute("data-state", "done");
  }

  function initForm() {
    const form = $("#calc-form");
    const resetBtn = $("#reset-btn");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const ingresos = parseFloat($("#ingresos").value);
      const deducciones = parseFloat($("#deducciones").value) || 0;

      if (!ingresos || ingresos <= 0 || isNaN(ingresos)) {
        showError();
        return;
      }
      if (deducciones < 0) {
        showError("Los gastos deducibles no pueden ser negativos.");
        return;
      }
      hideError();
      renderResult(ingresos, deducciones);
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        form.reset();
        $("#result").hidden = true;
        hideError();
        $("#ingresos").focus();
      });
    }
  }

  function boot() {
    safe(mountFaqs, "mountFaqs");
    safe(initForm, "initForm");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
