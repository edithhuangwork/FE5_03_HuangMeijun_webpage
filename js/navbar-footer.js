document.addEventListener("DOMContentLoaded", async function () {
  const loadComponent = async (file, elementId) => {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`載入失敗：${file} (${response.status})`);
      }
      const html = await response.text();
      const el = document.getElementById(elementId);
      if (el) el.innerHTML = html;
    } catch (err) {
      console.error(`fetch ${file} 時出錯：`, err);
    }
  };

  await loadComponent("../includes/navbar.html", "navbar-placeholder");
  await loadComponent("../includes/footer.html", "footer-placeholder");

  initNavbar();
});

function initNavbar() {
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
}