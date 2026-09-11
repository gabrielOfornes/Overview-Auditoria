/**
 * render.js
 * -----------------------------------------------------------------------
 * Responsável por transformar os objetos de js/data.js em elementos DOM.
 * Nenhuma string é injetada via innerHTML com dados dinâmicos — tudo é
 * construído com createElement/textContent para evitar XSS e manter o
 * controle fino sobre a árvore de nós.
 * -----------------------------------------------------------------------
 */

const AuditRender = (() => {
  const ICON_TONE = {
    ready: "audit-card__icon--ready",
    pending: "audit-card__icon--pending",
  };

  function el(tag, className, children) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (children != null) {
      (Array.isArray(children) ? children : [children]).forEach((child) => {
        if (child == null) return;
        node.append(child instanceof Node ? child : document.createTextNode(child));
      });
    }
    return node;
  }

  function icon(id, size = 18) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", `#${id}`);
    svg.append(use);
    return svg;
  }

  /* ---------------------------------------------------------------- */
  /* Cards do panorama (Visão Geral)                                   */
  /* ---------------------------------------------------------------- */
  function panoramaCard(item) {
    const card = el("button", "audit-card");
    card.type = "button";
    card.dataset.nav = item.id;
    card.setAttribute("aria-label", `Abrir ${item.name}`);

    const top = el("div", "audit-card__top", [
      el("span", `audit-card__icon ${ICON_TONE[item.status]}`, icon(item.icon)),
      el(
        "span",
        `badge ${item.status === "ready" ? "badge--success" : "badge--neutral"}`,
        item.statusLabel.toUpperCase()
      ),
    ]);

    const heading = el("div", null, [
      el("p", "audit-card__name", item.name),
      el("p", "audit-card__scope", item.scope),
    ]);

    const metric = el("div", null, [
      el(
        "p",
        `audit-card__metric ${item.metricValue === "—" ? "audit-card__metric--muted" : ""}`,
        item.metricValue
      ),
      el("p", "audit-card__metric-label", item.metricLabel),
    ]);

    const foot = el("div", "audit-card__foot", [
      el("span", null, item.footLeft),
      el("span", null, item.footRight),
    ]);

    card.append(top, heading, metric, foot);
    return card;
  }

  function renderPanorama(container, items) {
    container.replaceChildren(...items.map(panoramaCard));
  }

  /* ---------------------------------------------------------------- */
  /* KPIs (Auditoria de TO)                                            */
  /* ---------------------------------------------------------------- */
  function kpiTile(kpi) {
    const tile = el("article", `kpi-tile ${kpi.hero ? "kpi-tile--hero" : ""}`);
    tile.append(
      el("p", "kpi-tile__label", kpi.label),
      el("p", "kpi-tile__value", kpi.value),
      el("p", "kpi-tile__caption", kpi.caption)
    );
    return tile;
  }

  function renderKpis(container, kpis) {
    container.replaceChildren(...kpis.map(kpiTile));
  }

  /* ---------------------------------------------------------------- */
  /* Performance por área (barras de progresso)                        */
  /* ---------------------------------------------------------------- */
  function areaRow(area) {
    const row = el("div", "area-row");
    const track = el("div", "area-row__track");
    const fill = el("div", "area-row__fill");
    track.append(fill);

    row.append(
      el("span", "area-row__label", area.label),
      track,
      el("span", "area-row__volume", [area.volume, el("br"), "auditados"]),
      el("span", "area-row__rate", area.rate)
    );

    // Largura animada após o próximo frame, para permitir a transição CSS
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.width = `${area.pct}%`;
      });
    });

    return row;
  }

  function renderAreas(container, areas) {
    container.replaceChildren(...areas.map(areaRow));
  }

  /* ---------------------------------------------------------------- */
  /* Prioridades gerenciais                                            */
  /* ---------------------------------------------------------------- */
  function priorityItem(item) {
    const li = el("li", "priority-item");
    li.append(
      el("span", `priority-item__dot ${item.tone === "ok" ? "priority-item__dot--ok" : ""}`),
      el("div", null, [
        el("p", "priority-item__title", item.title),
        el("p", "priority-item__desc", item.desc),
      ])
    );
    return li;
  }

  function renderPriorities(container, priorities) {
    container.replaceChildren(...priorities.map(priorityItem));
  }

  /* ---------------------------------------------------------------- */
  /* Skeletons (estado de carregamento)                                 */
  /* ---------------------------------------------------------------- */
  function skeletonBlocks(container, count, className) {
    const blocks = Array.from({ length: count }, () => {
      const block = el("div", `skeleton ${className}`);
      block.style.height = "160px";
      block.style.borderRadius = "20px";
      return block;
    });
    container.replaceChildren(...blocks);
  }

  return {
    renderPanorama,
    renderKpis,
    renderAreas,
    renderPriorities,
    skeletonBlocks,
  };
})();
