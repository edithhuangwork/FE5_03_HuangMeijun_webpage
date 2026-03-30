// js/navbar-footer.js
(function () {
  function detectBasePath() {
    const path = window.location.pathname; // e.g. "/pages/kyoto.html"
    if (path.includes("/pages/")) return "../";
    return "./";
  }

  async function loadInclude(url, elementId) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
    const html = await res.text();

    const el = document.getElementById(elementId);
    if (!el) throw new Error(`Element #${elementId} not found`);
    el.innerHTML = html;
  }

  async function init() {
    const base = detectBasePath();

    await loadInclude(`${base}includes/navbar.html`, "navbar-placeholder");
    await loadInclude(`${base}includes/footer.html`, "footer-placeholder");

    const hash = window.location.hash;
    if (hash) {
      // 等 footer 插入完成後再滾動/定位
      setTimeout(() => {
        const target = document.getElementById(hash.slice(1));
        if (target) target.scrollIntoView({ behavior: "auto", block: "start" });
      }, 0);
    }

    // ✅ 載入完成後初始化 navbar（包含下拉/行動選單）
    // 避免重複初始化：用 data attribute 當旗標
    if (!document.body.dataset.navbarInitialized) {
      document.body.dataset.navbarInitialized = "true";
      if (typeof window.initNavbar === "function") window.initNavbar();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
 
// ====== 你的原本 navbar 初始化邏輯（保持不變，只做「可被呼叫」）======
window.initNavbar = function initNavbar() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const overlay = document.getElementById("mobile-overlay");
  const panel = document.getElementById("mobile-panel");
  const closeBtn = document.getElementById("mobile-close");
  const firstFocusableSelector =
    'a, button, input, textarea, [tabindex]:not([tabindex="-1"])';
  let lastFocusedElement = null;

  if (!toggleBtn || !overlay || !panel) return;

  function isOpen() {
    return panel.classList.contains("open");
  }

  function openPanel() {
    if (isOpen()) return;

    lastFocusedElement = document.activeElement;
    panel.classList.add("open");
    overlay.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    overlay.setAttribute("aria-hidden", "false");
    toggleBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";

    const focusable = panel.querySelectorAll(firstFocusableSelector);
    if (focusable.length) focusable[0].focus();
    else {
      panel.setAttribute("tabindex", "-1");
      panel.focus();
    }

    document.addEventListener("keydown", handleKeyDown, true);
  }

  function closePanel() {
    if (!isOpen()) return;

    panel.classList.remove("open");
    overlay.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    overlay.setAttribute("aria-hidden", "true");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
    if (panel.hasAttribute("tabindex")) panel.removeAttribute("tabindex");
    document.removeEventListener("keydown", handleKeyDown, true);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape" || e.key === "Esc") {
      e.preventDefault();
      closePanel();
      return;
    }
  }

  toggleBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    isOpen() ? closePanel() : openPanel();
  });

  closeBtn?.addEventListener("click", (ev) => {
    ev.preventDefault();
    closePanel();
  });

  overlay.addEventListener("click", closePanel);

  const mobileMenuList = document.getElementById("mobile-menu-list");
  mobileMenuList?.addEventListener("click", (ev) => {
    if (ev.target.tagName === "A") closePanel();
  });
};