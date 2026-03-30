(function () {
  function detectBasePath() {
    const path = window.location.pathname;

    // If current page is within /pages/, go up one level
    if (path.includes("/pages/")) return "../";

    // Otherwise (e.g., index.html at repo root), stay in current level
    return "./";
  }

  async function loadInclude(url, elementId) {
    console.log("[navbar-footer] fetch ->", url);
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.error("[navbar-footer] 404/failed ->", url, res.status);
      throw new Error(`Failed to load ${url}: ${res.status}`);
    }
    const html = await res.text();
    const el = document.getElementById(elementId);
    if (!el) throw new Error(`Element #${elementId} not found`);
    el.innerHTML = html;
  }

  function setNavLinks(base) {
    const home = document.querySelector('[data-nav="home"]');
    const about = document.querySelector('[data-nav="about"]');
    const contact = document.querySelector('[data-nav="contact"]');

    if (home) home.href = `${base}index.html`;
    if (about) about.href = `${base}index.html#about`;
    if (contact) contact.href = `${base}index.html#contact`;
  }

  function setCityLinks(base) {
    const kyoto = document.querySelector('[data-page="kyoto"]');
    const paris = document.querySelector('[data-page="paris"]');
    const milan = document.querySelector('[data-page="milan"]');
    const cairo = document.querySelector('[data-page="cairo"]');

    if (kyoto) kyoto.href = `${base}pages/kyoto.html`;
    if (paris) paris.href = `${base}pages/paris.html`;
    if (milan) milan.href = `${base}pages/milan.html`;
    if (cairo) cairo.href = `${base}pages/cairo.html`;
  }

  function setLogoSrc(base) {
    document.querySelectorAll('img[data-logo]').forEach((img) => {
      img.src = `${base}assets/logo.png`;
    });
  }

  function scrollToHashAfterFooter() {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);
    setTimeout(() => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "auto", block: "start" });
    }, 0);
  }

  async function init() {
    const base = detectBasePath();

    await loadInclude(`${base}includes/navbar.html`, "navbar-placeholder");
    await loadInclude(`${base}includes/footer.html`, "footer-placeholder");

    setNavLinks(base);
    setCityLinks(base);
    setLogoSrc(base);

    scrollToHashAfterFooter();

    if (typeof window.initNavbar === "function") window.initNavbar();
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