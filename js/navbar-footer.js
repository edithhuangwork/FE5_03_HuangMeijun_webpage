document.addEventListener("DOMContentLoaded", function () {
  const loadComponent = async (file, elementId) => {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`載入失敗：${file} (${response.status})`);
      }
      const html = await response.text();
      const el = document.getElementById(elementId);
      if (el) {
        el.innerHTML = html;
      }
    } catch (err) {
      console.error(`fetch ${file} 時出錯：`, err);
    }
  };

  loadComponent("../includes/navbar.html", "navbar-placeholder");
  loadComponent("../includes/footer.html", "footer-placeholder");
});

document.addEventListener("DOMContentLoaded", async function () {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const overlay = document.getElementById('mobile-overlay');
  const panel = document.getElementById('mobile-panel');
  const closeBtn = document.getElementById('mobile-close');
  const firstFocusableSelector =
    'a, button, input, textarea, [tabindex]:not([tabindex="-1"])';
  let lastFocusedElement = null;

  if (!toggleBtn || !overlay || !panel) return;

  function isOpen() {
    return panel.classList.contains('open');
  }

  function openPanel() {
    if (isOpen()) return;
    lastFocusedElement = document.activeElement;
    panel.classList.add('open');
    overlay.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    const focusable = panel.querySelectorAll(firstFocusableSelector);
    if (focusable.length) focusable[0].focus();
    else {
      panel.setAttribute('tabindex', '-1');
      panel.focus();
    }

    document.addEventListener('keydown', handleKeyDown, true);
  }

  function closePanel() {
    if (!isOpen()) return;
    panel.classList.remove('open');
    overlay.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (
      lastFocusedElement &&
      typeof lastFocusedElement.focus === 'function'
    ) {
      lastFocusedElement.focus();
    }
    if (panel.hasAttribute('tabindex')) panel.removeAttribute('tabindex');
    document.removeEventListener('keydown', handleKeyDown, true);
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      closePanel();
      return;
    }
    if (e.key === 'Tab') {
      const focusable = Array.from(
        panel.querySelectorAll(firstFocusableSelector)
      ).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
      );

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    }
  }

  toggleBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    isOpen() ? closePanel() : openPanel();
  });

  if (closeBtn)
    closeBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      closePanel();
    });

  overlay.addEventListener('click', (ev) => {
    ev.preventDefault();
    closePanel();
  });

  const mobileMenuList = document.getElementById('mobile-menu-list');
  if (mobileMenuList) {
    mobileMenuList.addEventListener('click', (ev) => {
      const target = ev.target;
      if (target && target.tagName === 'A') closePanel();
    });
  }

  const mql = window.matchMedia('(min-width: 769px)');
  mql.addEventListener?.('change', (e) => {
    if (e.matches) closePanel();
  });

  (function setYear() {
    const el = document.getElementById('copyright-year');
    if (el) el.textContent = new Date().getFullYear();
  })();
});