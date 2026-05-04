const NAV_ITEMS = [
  { key: "services", label: "Services", href: "services/" },
  { key: "process", label: "Process", href: "process/" },
  { key: "proof", label: "See the Work", href: "proof/" },
  { key: "workshops", label: "Workshops", href: "workshops/" },
  { key: "get-started", label: "Get Started", href: "get-started/" },
];

const MINIMAL_CHROME_PAGES = new Set(["scan", "thanks"]);

const TALLY_URLS = {
  toolkit: "https://tally.so/r/aQG1EZ",
  diagnostic: "https://tally.so/r/7RoLkz",
  workshop: "https://tally.so/r/gDLqe4",
  getStarted: "https://tally.so/r/Ek8bV2",
};

function getRoot() {
  return document.body.dataset.siteRoot || "./";
}

function getPageKey() {
  return document.body.dataset.page || "";
}

function getOriginPage() {
  return document.body.dataset.originPage || (getPageKey() === "home" ? "/" : `/${getPageKey()}`);
}

function getSourceContext() {
  return document.body.dataset.sourceContext || "main-site";
}

function useMinimalChrome() {
  return document.body.dataset.chrome === "minimal" || MINIMAL_CHROME_PAGES.has(getPageKey());
}

function pathTo(path) {
  return `${getRoot()}${path}`;
}

function createBrandMarkup(className = "site-brand__mark", variant = "full-color") {
  const markPath = variant === "reversed"
    ? "img/brand-marks/one-color-horizontal-lockup.svg"
    : "img/brand-marks/full-color-horizontal-lockup.svg";
  return `<img class="${className}" src="${pathTo(markPath)}" alt="Signal over Noise">`;
}

function createDiagnosticHref(originPage = getOriginPage(), source = getSourceContext()) {
  const params = new URLSearchParams({
    source,
    originPage,
  });

  return `${pathTo("diagnostic/")}?${params.toString()}`;
}

function createWorkshopHref(originPage = getOriginPage(), source = getSourceContext()) {
  const params = new URLSearchParams({
    source,
    originPage,
  });

  return `${pathTo("contact/")}?${params.toString()}`;
}

function createScanHref(originPage = getOriginPage(), source = getSourceContext()) {
  const params = new URLSearchParams({
    source,
    originPage,
  });

  return `${pathTo("scan/")}?${params.toString()}`;
}

function buildTallyUrl(baseUrl, params) {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

function renderHeader() {
  const mount = document.querySelector("[data-site-header]");
  if (!mount) {
    return;
  }

  if (useMinimalChrome()) {
    mount.innerHTML = `
      <header class="site-header site-header--minimal">
        <div class="shell site-header__inner">
          <a class="site-brand" href="${pathTo("")}" aria-label="Signal over Noise home">
            ${createBrandMarkup()}
          </a>
          <p class="site-header__context">Workshop follow-up</p>
        </div>
      </header>
    `;
    return;
  }

  const currentPage = getPageKey();
  const navLinks = NAV_ITEMS.map((item) => {
    const current = item.key === currentPage ? ' aria-current="page"' : "";
    return `<a class="site-nav__link" href="${pathTo(item.href)}"${current}>${item.label}</a>`;
  }).join("");

  mount.innerHTML = `
    <header class="site-header">
      <div class="shell site-header__inner">
        <a class="site-brand" href="${pathTo("")}" aria-label="Signal over Noise home">
          ${createBrandMarkup()}
        </a>
        <nav class="site-nav" aria-label="Primary">
          <div class="site-nav__links">${navLinks}</div>
          <a class="button button--primary" data-track="nav_diagnostic_click" data-track-source="nav" data-diagnostic-link href="${createDiagnosticHref()}">Request a Free Presentation Diagnostic</a>
        </nav>
        <div class="site-header__mobile">
          <a class="button button--primary button--compact" data-track="nav_diagnostic_click" data-track-source="nav" data-diagnostic-link href="${createDiagnosticHref()}">Diagnostic</a>
          <button class="button button--ghost button--compact" type="button" data-menu-toggle aria-expanded="false" aria-controls="site-menu">Menu</button>
        </div>
      </div>
      <div class="shell">
        <nav class="site-menu-panel" id="site-menu" aria-label="Mobile">
          <div class="site-menu-panel__links">${navLinks}<a class="site-nav__link" href="${pathTo("privacy/")}">Privacy</a></div>
        </nav>
      </div>
    </header>
  `;

  const toggle = mount.querySelector("[data-menu-toggle]");
  const panel = mount.querySelector(".site-menu-panel");

  if (toggle && panel) {
    toggle.addEventListener("click", () => {
      const nextState = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(nextState));
      panel.classList.toggle("is-open", nextState);
    });
  }
}

function renderFooter() {
  const mount = document.querySelector("[data-site-footer]");
  if (!mount) {
    return;
  }

  if (useMinimalChrome()) {
    mount.innerHTML = `
      <footer class="site-footer site-footer--minimal">
        <div class="shell site-footer__inner site-footer__inner--minimal">
          <a class="footer-brand" href="${pathTo("")}" aria-label="Signal over Noise home">
            ${createBrandMarkup("footer-brand__mark", "reversed")}
          </a>
          <div class="site-footer__minimal-meta">
            <p class="site-footer__meta">Presentation follow-up resources for workshop attendees.</p>
            <a class="site-footer__privacy" href="${pathTo("privacy/")}">Privacy</a>
          </div>
        </div>
      </footer>
    `;
    return;
  }

  const footerLinks = [
    ...NAV_ITEMS.map((item) => `<a href="${pathTo(item.href)}">${item.label}</a>`),
    `<a href="${pathTo("privacy/")}">Privacy</a>`,
  ].join("");

  mount.innerHTML = `
    <footer class="site-footer">
      <div class="shell site-footer__inner">
        <div class="site-footer__top">
          <a class="footer-brand" href="${pathTo("")}" aria-label="Signal over Noise home">
            ${createBrandMarkup("footer-brand__mark", "reversed")}
          </a>
          <nav class="footer-nav" aria-label="Footer">${footerLinks}</nav>
        </div>
        <div class="site-footer__rule" role="presentation"></div>
        <div class="site-footer__bottom">
          <p class="site-footer__meta">Presentation support for clearer messages, sharper decks, and more credible delivery.</p>
          <p class="site-footer__legal">Diagnostic-first support built around real materials, visible proof, and practical next steps.</p>
        </div>
      </div>
    </footer>
  `;
}

function emitTrack(eventName, detail = {}) {
  if (!eventName) {
    return;
  }

  const payload = {
    event: eventName,
    ...detail,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  document.dispatchEvent(new CustomEvent("son:track", { detail: payload }));
}

function wireTrackedLinks() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-track]");
    if (!target) {
      return;
    }

    emitTrack(target.dataset.track, {
      source: target.dataset.trackSource || getSourceContext(),
      originPage: target.dataset.trackOrigin || getOriginPage(),
      href: target.getAttribute("href") || "",
    });
  });
}

function hydrateRouteLinks() {
  document.querySelectorAll("[data-diagnostic-link]").forEach((link) => {
    link.setAttribute(
      "href",
      createDiagnosticHref(link.dataset.trackOrigin || getOriginPage(), link.dataset.trackSource || getSourceContext()),
    );
  });

  document.querySelectorAll("[data-workshop-link]").forEach((link) => {
    link.setAttribute(
      "href",
      createWorkshopHref(link.dataset.trackOrigin || getOriginPage(), link.dataset.trackSource || getSourceContext()),
    );
  });

  document.querySelectorAll("[data-toolkit-link]").forEach((link) => {
    link.setAttribute(
      "href",
      createScanHref(link.dataset.trackOrigin || getOriginPage(), link.dataset.trackSource || getSourceContext()),
    );
  });
}

function resolvePageContext() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("source") || getSourceContext(),
    originPage: params.get("originPage") || getOriginPage(),
  };
}

function mountAllTallyEmbeds() {
  const configs = {
    toolkit: { url: TALLY_URLS.toolkit, title: "Signal over Noise Presenter Toolkit" },
    diagnostic: { url: TALLY_URLS.diagnostic, title: "Free Presentation Diagnostic" },
    workshop: { url: TALLY_URLS.workshop, title: "Signal over Noise Workshop Inquiry" },
    getStarted: { url: TALLY_URLS.getStarted, title: "Signal over Noise Get Started Request" },
  };

  const mounts = document.querySelectorAll("[data-tally-mount]");
  if (!mounts.length) {
    return;
  }

  const context = resolvePageContext();

  mounts.forEach((mount) => {
    const key = mount.dataset.tallyMount;
    const config = configs[key];
    if (!config) {
      return;
    }

    const src = buildTallyUrl(config.url, {
      source: context.source,
      originPage: context.originPage,
    });

    const iframe = document.createElement("iframe");
    iframe.dataset.tallySrc = src;
    iframe.width = "100%";
    iframe.height = mount.dataset.tallyHeight || "500";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("marginheight", "0");
    iframe.setAttribute("marginwidth", "0");
    iframe.setAttribute("loading", "lazy");
    iframe.title = config.title;
    iframe.className = "tally-embed";
    mount.appendChild(iframe);
  });

  const scriptUrl = "https://tally.so/widgets/embed.js";
  if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
    const s = document.createElement("script");
    s.src = scriptUrl;
    s.onload = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      }
    };
    document.body.appendChild(s);
  } else if (window.Tally) {
    window.Tally.loadEmbeds();
  }
}

function clampComparePosition(value) {
  const parsedValue = Number.parseFloat(value);
  if (!Number.isFinite(parsedValue)) {
    return 50;
  }

  return Math.min(100, Math.max(0, parsedValue));
}

function syncComparePosition(compare, value) {
  const position = clampComparePosition(value);
  const handle = compare.querySelector("[data-compare-handle]");

  compare.style.setProperty("--compare-position", `${position}%`);
  if (handle) {
    handle.setAttribute("aria-valuenow", String(Math.round(position)));
  }
}

function getComparePosition(compare) {
  return clampComparePosition(compare.style.getPropertyValue("--compare-position"));
}

function getComparePositionFromPointer(frame, event) {
  const rect = frame.getBoundingClientRect();
  if (!rect.width) {
    return 50;
  }

  return ((event.clientX - rect.left) / rect.width) * 100;
}

function initProofComparisons() {
  document.querySelectorAll("[data-compare]").forEach((compare) => {
    const frame = compare.querySelector("[data-compare-frame]");
    const handle = compare.querySelector("[data-compare-handle]");
    if (!frame || !handle) {
      return;
    }

    syncComparePosition(compare, getComparePosition(compare));

    handle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      handle.setPointerCapture(event.pointerId);
      syncComparePosition(compare, getComparePositionFromPointer(frame, event));
    });

    handle.addEventListener("pointermove", (event) => {
      if (!handle.hasPointerCapture(event.pointerId)) {
        return;
      }

      syncComparePosition(compare, getComparePositionFromPointer(frame, event));
    });

    handle.addEventListener("keydown", (event) => {
      const currentPosition = getComparePosition(compare);
      let nextPosition = currentPosition;

      if (event.key === "ArrowLeft") {
        nextPosition -= event.shiftKey ? 10 : 2;
      } else if (event.key === "ArrowRight") {
        nextPosition += event.shiftKey ? 10 : 2;
      } else if (event.key === "Home") {
        nextPosition = 0;
      } else if (event.key === "End") {
        nextPosition = 100;
      } else {
        return;
      }

      event.preventDefault();
      syncComparePosition(compare, nextPosition);
    });
  });
}

let proofModalState = null;

function getProofModalFocusableElements(modal) {
  return Array.from(
    modal.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("hidden"));
}

function closeProofModal() {
  if (!proofModalState || proofModalState.modal.hidden) {
    return;
  }

  proofModalState.modal.hidden = true;
  proofModalState.iframe.setAttribute("src", "about:blank");
  document.body.classList.remove("proof-modal-open");

  const trigger = proofModalState.lastTrigger;
  proofModalState.lastTrigger = null;
  if (trigger instanceof HTMLElement) {
    trigger.focus();
  }
}

function ensureProofModal() {
  if (proofModalState) {
    return proofModalState;
  }

  const modal = document.createElement("div");
  modal.className = "proof-modal";
  modal.dataset.proofModal = "true";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="proof-modal__scrim" data-proof-modal-close></div>
    <div class="proof-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="proof-modal-title">
      <div class="proof-modal__header">
        <div class="stack-sm">
          <p class="eyebrow">Diagnostic Viewer</p>
          <h2 class="card-title" id="proof-modal-title"></h2>
          <p class="proof-modal__copy">Turn pages in the browser viewer, open the file in a separate tab, or download the full PDF directly.</p>
        </div>
        <button class="button button--ghost button--compact" type="button" data-proof-modal-close>Close</button>
      </div>
      <div class="proof-modal__actions">
        <a class="button button--secondary" href="#" target="_blank" rel="noopener" data-proof-modal-open>Open in new tab</a>
        <a class="button button--primary" href="#" download data-proof-modal-download>Download PDF</a>
      </div>
      <div class="proof-modal__viewer">
        <iframe class="proof-modal__iframe" title="Diagnostic PDF viewer" loading="lazy"></iframe>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const title = modal.querySelector("#proof-modal-title");
  const iframe = modal.querySelector(".proof-modal__iframe");
  const openLink = modal.querySelector("[data-proof-modal-open]");
  const downloadLink = modal.querySelector("[data-proof-modal-download]");
  const closeControls = modal.querySelectorAll("[data-proof-modal-close]");

  closeControls.forEach((control) => {
    control.addEventListener("click", closeProofModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeProofModal();
    }
  });

  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeProofModal();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusable = getProofModalFocusableElements(modal);
    if (!focusable.length) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  proofModalState = {
    modal,
    title,
    iframe,
    openLink,
    downloadLink,
    lastTrigger: null,
  };

  return proofModalState;
}

function openProofModal(src, titleText, trigger) {
  if (!src) {
    return;
  }

  const modalState = ensureProofModal();
  modalState.lastTrigger = trigger || document.activeElement;
  modalState.title.textContent = titleText || "Diagnostic sample";
  modalState.openLink.setAttribute("href", src);
  modalState.downloadLink.setAttribute("href", src);
  modalState.iframe.setAttribute("src", `${src}#view=FitH`);
  modalState.modal.hidden = false;
  document.body.classList.add("proof-modal-open");

  const focusable = getProofModalFocusableElements(modalState.modal);
  if (focusable.length) {
    focusable[0].focus();
  }
}

function initProofPdfViewer() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-proof-pdf-trigger]");
    if (!trigger) {
      return;
    }

    event.preventDefault();
    openProofModal(trigger.dataset.pdfSrc, trigger.dataset.pdfTitle, trigger);
  });

  document.addEventListener("keydown", (event) => {
    const trigger = event.target.closest("[data-proof-pdf-trigger][role=button]");
    if (!trigger) {
      return;
    }

    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    openProofModal(trigger.dataset.pdfSrc, trigger.dataset.pdfTitle, trigger);
  });
}

renderHeader();
renderFooter();
hydrateRouteLinks();
wireTrackedLinks();
mountAllTallyEmbeds();
initProofComparisons();
initProofPdfViewer();
