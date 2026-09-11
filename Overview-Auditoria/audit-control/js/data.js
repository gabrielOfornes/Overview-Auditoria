/**
 * data.js
 * -----------------------------------------------------------------------
 * Fonte única dos dados exibidos no painel. Em produção este módulo seria
 * substituído por chamadas a uma API (fetch) — a estrutura dos objetos foi
 * pensada para tornar essa troca simples, sem alterar o código de render.
 * -----------------------------------------------------------------------
 */

const AuditData = (() => {
  const reportDate = "D-1 · 11/08/2026";

  /** Panorama exibido na Visão Geral (um card por frente de auditoria) */
  const panorama = [
    {
      id: "auditoria-to",
      name: "Auditoria de TO",
      scope: "CBS & Esteiras · Packed · Report D-1",
      status: "ready", // ready | pending
      statusLabel: "Com dados",
      icon: "icon-return",
      metricValue: "2,24%",
      metricLabel: "taxa de erro",
      footLeft: "87.337 pacotes auditados",
      footRight: "1.959 erros",
    },
    {
      id: "first-mile",
      name: "Auditoria de First Mile",
      scope: "First Mile · Coleta e entrada · Report D-1",
      status: "pending",
      statusLabel: "Estruturada",
      icon: "icon-diamond",
      metricValue: "—",
      metricLabel: "indicador pendente",
      footLeft: "Dados não informados na base atual",
      footRight: "",
    },
    {
      id: "line-haul",
      name: "Auditoria de Line Haul",
      scope: "Line Haul · Transferências e transporte · Report D-1",
      status: "pending",
      statusLabel: "Estruturada",
      icon: "icon-shuffle",
      metricValue: "—",
      metricLabel: "indicador pendente",
      footLeft: "Dados não informados na base atual",
      footRight: "",
    },
    {
      id: "nc",
      name: "Auditoria de NC",
      scope: "Não Conformidades · Qualidade · Report D-1",
      status: "pending",
      statusLabel: "Estruturada",
      icon: "icon-alert",
      metricValue: "—",
      metricLabel: "indicador pendente",
      footLeft: "Dados não informados na base atual",
      footRight: "",
    },
    {
      id: "outbound",
      name: "Auditoria de Outbound",
      scope: "Outbound · Expedição · Report D-1",
      status: "pending",
      statusLabel: "Estruturada",
      icon: "icon-outbound",
      metricValue: "—",
      metricLabel: "indicador pendente",
      footLeft: "Dados não informados na base atual",
      footRight: "",
    },
  ];

  /** Detalhe da Auditoria de TO */
  const auditoriaTo = {
    kpis: [
      {
        hero: true,
        label: "INDICADOR EXECUTIVO · TAXA DE ERRO",
        value: "2,24%",
        caption: "1.959 pacotes errados em 87.337 pacotes auditados.",
      },
      { label: "PACOTES AUDITADOS", value: "87.337", caption: "Volume D-1" },
      { label: "TO'S AUDITADAS", value: "1.198", caption: "Unitizadores" },
      { label: "PACOTES ERRADOS", value: "1.959", caption: "Desvios identificados" },
    ],
    areas: [
      { label: "ZONA A", volume: "46.538", rate: "2,46%", pct: 100 },
      { label: "ZONA B", volume: "27.323", rate: "1,78%", pct: 59 },
      { label: "ZONA C", volume: "12.947", rate: "2,39%", pct: 28 },
      { label: "ESTEIRAS", volume: "529", rate: "4,16%", pct: 1.5 },
    ],
    priorities: [
      {
        tone: "danger",
        title: "Zona A · principal foco",
        desc: "1.143 erros, equivalentes a aproximadamente 58,3% do consolidado.",
      },
      {
        tone: "danger",
        title: "Esteiras · maior severidade",
        desc: "4,16% de erro, mesmo com o menor volume auditado.",
      },
      {
        tone: "danger",
        title: "Destino crítico",
        desc: "LM Hub_RJ_São Gonçalo_02 lidera com 198 erros.",
      },
      {
        tone: "danger",
        title: "CH crítico",
        desc: "CH-467 concentra 178 erros.",
      },
      {
        tone: "ok",
        title: "Benchmark interno",
        desc: "Zona B apresenta a menor taxa entre as zonas: 1,78%.",
      },
    ],
    asmFootnote: "ASM · 86.808 pacotes · 1.191 TO's · 1.937 erros",
    updatedAt: "11/08/2026",
  };

  return { reportDate, panorama, auditoriaTo };
})();
