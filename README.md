# Audit Control · Visão Geral das Auditorias

Interface front-end (HTML5 + CSS3 + JavaScript nativo, sem dependências ou build step) recriando o painel de acompanhamento de auditorias operacionais.

## Como abrir

Basta abrir `index.html` num navegador — ou, para evitar restrições de módulo/CORS em alguns navegadores, sirva a pasta com um servidor estático simples:

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## Estrutura de pastas

```
audit-control/
├── index.html              # Marcação semântica + views (Visão Geral, Auditoria de TO, demais frentes)
├── css/
│   ├── variables.css        # Design tokens (cores, tipografia, espaçamento) — temas claro/escuro
│   ├── base.css              # Reset e estilos globais, acessibilidade (foco, skip link, reduced motion)
│   ├── layout.css            # Grade da aplicação: sidebar, header, seções, responsividade
│   └── components.css        # Componentes reutilizáveis: nav, botões, cards, KPIs, barras, toast
├── js/
│   ├── data.js                # Fonte dos dados (mock) — ponto único de substituição por uma API real
│   ├── theme.js               # Alternância dark/light com persistência em localStorage
│   ├── render.js              # Construção do DOM a partir dos dados (sem innerHTML dinâmico)
│   └── main.js                 # Roteamento entre views, drawer mobile, refresh, boot da aplicação
└── README.md
```

## Funcionalidades

- **Tema claro/escuro** com persistência (`localStorage`) e leitura de `prefers-color-scheme` na primeira visita.
- **Navegação por SPA leve** entre "Visão Geral" e cada auditoria (TO com dados completos; First Mile, Line Haul, NC e Outbound em estado "estruturado / indicador pendente", fiel à base fornecida).
- **Estados de interface**: skeleton de carregamento ao abrir e ao clicar em "Gestão Operacional" (simulação de atualização), toast de confirmação, estado vazio para auditorias sem indicador.
- **Responsivo mobile-first**: sidebar vira um drawer com scrim abaixo de 860px; grids se reorganizam em 1–2 colunas conforme a largura.
- **Acessibilidade**: skip link, foco visível, `aria-current` na navegação ativa, `aria-live` nas áreas que atualizam dinamicamente, `prefers-reduced-motion` respeitado.

## Personalização

Para conectar a uma API real, substitua o objeto retornado por `AuditData` (em `js/data.js`) por uma função assíncrona que faça `fetch` do endpoint e resolva para o mesmo formato — nenhum outro arquivo precisa mudar.
