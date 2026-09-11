/**
 * theme.js
 * -----------------------------------------------------------------------
 * Controla a alternância entre modo escuro e modo claro.
 * Preferência é persistida em localStorage; na ausência dela, respeita
 * `prefers-color-scheme` do sistema operacional.
 * -----------------------------------------------------------------------
 */

const ThemeController = (() => {
  const STORAGE_KEY = "audit-control:theme";
  const root = document.documentElement;

  let toggleButton;
  let iconUse;
  let label;

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      // localStorage pode estar indisponível (modo privado, iframes, etc.)
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      /* silencioso: preferência simplesmente não persiste nesta sessão */
    }
  }

  function systemPrefersLight() {
    return window.matchMedia?.("(prefers-color-scheme: light)").matches;
  }

  function applyTheme(theme, { persist = true } = {}) {
    root.setAttribute("data-theme", theme);

    if (toggleButton) {
      const isLight = theme === "light";
      toggleButton.setAttribute("aria-pressed", String(isLight));
      if (iconUse) {
        iconUse.setAttribute("href", isLight ? "#icon-moon" : "#icon-sun");
      }
      if (label) {
        label.textContent = isLight ? "Modo escuro" : "Modo claro";
      }
    }

    if (persist) storeTheme(theme);
  }

  function toggle() {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    applyTheme(current === "light" ? "dark" : "light");
  }

  function init() {
    toggleButton = document.querySelector("[data-theme-toggle]");
    iconUse = document.querySelector("[data-theme-icon] use");
    label = document.querySelector("[data-theme-label]");

    const stored = getStoredTheme();
    const initial = stored || (systemPrefersLight() ? "light" : "dark");
    applyTheme(initial, { persist: false });

    toggleButton?.addEventListener("click", toggle);
  }

  return { init, applyTheme, toggle };
})();
