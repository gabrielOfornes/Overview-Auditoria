/**
 * main.js
 * -----------------------------------------------------------------------
 * Ponto de entrada da aplicação: liga roteamento entre views, o drawer da
 * sidebar em telas pequenas, o botão de atualização (com estado de
 * carregamento) e a inicialização dos dados.
 * -----------------------------------------------------------------------
 */

(() => {
  "use strict";

  const BREADCRUMBS = {
    "visao-geral": "Visão Geral",
    "auditoria-to": "Auditoria de TO",
    "first-mile": "First Mile",
    "line-haul": "Line Haul",
    nc: "NC",
    outbound: "Outbound",
    sacas: "Auditoria de Sacas",
  };

  const views = document.querySelectorAll("[data-view]");
  const navLinks = document.querySelectorAll("[data-nav]");
  const breadcrumbEl = document.querySelector("[data-breadcrumb]");
  const sidebar = document.getElementById("sidebar");
  const scrim = document.querySelector("[data-scrim]");
  const sidebarOpenBtn = document.querySelector("[data-sidebar-open]");
  const refreshBtn = document.querySelector("[data-refresh]");
  const toast = document.getElementById("toast");
  const toastText = document.querySelector("[data-toast-text]");

  let toastTimer = null;

  /* ------------------------------------------------------------------ */
  /* Roteamento entre views                                              */
  /* ------------------------------------------------------------------ */
  function goToView(viewId) {
    if (!BREADCRUMBS[viewId]) return;

    views.forEach((view) => {
      view.classList.toggle("view--active", view.dataset.view === viewId);
    });

    navLinks.forEach((link) => {
      // Apenas os itens da sidebar controlam aria-current (não os cards)
      if (!link.classList.contains("nav-link")) return;
      const isCurrent = link.dataset.nav === viewId;
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (breadcrumbEl) breadcrumbEl.textContent = BREADCRUMBS[viewId];

    closeSidebar();
    document.getElementById("main-content")?.scrollTo({ top: 0, behavior: "smooth" });
    window.location.hash = viewId;
  }

  navLinks.forEach((trigger) => {
    trigger.addEventListener("click", () => goToView(trigger.dataset.nav));
  });

  window.addEventListener("hashchange", () => {
    const id = window.location.hash.replace("#", "");
    if (BREADCRUMBS[id]) goToView(id);
  });

  /* ------------------------------------------------------------------ */
  /* Sidebar em modo drawer (mobile)                                     */
  /* ------------------------------------------------------------------ */
  function openSidebar() {
    sidebar?.classList.add("is-open");
    scrim?.classList.add("is-visible");
    sidebarOpenBtn?.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    sidebar?.classList.remove("is-open");
    scrim?.classList.remove("is-visible");
    sidebarOpenBtn?.setAttribute("aria-expanded", "false");
  }

  sidebarOpenBtn?.addEventListener("click", () => {
    const isOpen = sidebar?.classList.contains("is-open");
    isOpen ? closeSidebar() : openSidebar();
  });

  scrim?.addEventListener("click", closeSidebar);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSidebar();
  });

  /* ------------------------------------------------------------------ */
  /* Feedback (toast)                                                    */
  /* ------------------------------------------------------------------ */
  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  /* ------------------------------------------------------------------ */
  /* Carregamento e renderização dos dados                               */
  /* ------------------------------------------------------------------ */
  const panoramaGrid = document.getElementById("panorama-grid");
  const kpiRow = document.getElementById("kpi-row");
  const areaList = document.getElementById("area-list");
  const priorityList = document.getElementById("priority-list");

  function paintData() {
    AuditRender.renderPanorama(panoramaGrid, AuditData.panorama);
    AuditRender.renderKpis(kpiRow, AuditData.auditoriaTo.kpis);
    AuditRender.renderAreas(areaList, AuditData.auditoriaTo.areas);
    AuditRender.renderPriorities(priorityList, AuditData.auditoriaTo.priorities);

    // Após renderizar os cards, delega o clique deles ao roteador de views
    panoramaGrid.querySelectorAll("[data-nav]").forEach((card) => {
      card.addEventListener("click", () => goToView(card.dataset.nav));
    });
  }

  function loadData({ announceToast = false } = {}) {
    AuditRender.skeletonBlocks(panoramaGrid, 5, "audit-card");
    AuditRender.skeletonBlocks(kpiRow, 4, "kpi-tile");

    // Simula latência de rede de forma realista (estado de carregamento visível)
    window.setTimeout(() => {
      paintData();
      if (announceToast) showToast("Base atualizada com sucesso");
    }, 550);
  }

  refreshBtn?.addEventListener("click", () => loadData({ announceToast: true }));

  /* ------------------------------------------------------------------ */
  /* Boot                                                                 */
  /* ------------------------------------------------------------------ */
  function boot() {
    ThemeController.init();

    const initialView = window.location.hash.replace("#", "");
    goToView(BREADCRUMBS[initialView] ? initialView : "visao-geral");

    loadData();
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
