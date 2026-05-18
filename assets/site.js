const NAV_ITEMS = [
  { key: "services", label: "Services", href: "services/" },
  { key: "process", label: "Process", href: "process/" },
  { key: "proof", label: "Sample Work", href: "proof/" },
  { key: "workshops", label: "Workshops", href: "workshops/" },
];

const MINIMAL_CHROME_PAGES = new Set(["toolkit", "thanks"]);

const TALLY_URLS = {
  toolkit: "https://tally.so/embed/aQG1EZ",
  diagnostic: "https://tally.so/embed/7RoLkz",
  workshop: "https://tally.so/embed/gDLqe4",
  getStarted: "https://tally.so/embed/Ek8bV2",
};

const TALLY_DEFAULT_HEIGHTS = {
  toolkit: "720",
  diagnostic: "900",
  workshop: "820",
  getStarted: "900",
};

const TALLY_ROUTE_CONTEXTS = {
  toolkit: {
    source_page: "/toolkit",
    route_type: "toolkit",
    offer_context: "workshop_followup",
    page_variant: "desktop_v1_launch",
    workshop_followup: "true",
  },
  diagnostic: {
    source_page: "/diagnostic",
    route_type: "free_diagnostic",
    offer_context: "diagnostic_first",
    page_variant: "desktop_v1_launch",
    workshop_followup: "false",
  },
  workshop: {
    source_page: "/contact",
    route_type: "workshop_inquiry",
    offer_context: "workshop_route",
    page_variant: "desktop_v1_launch",
    workshop_followup: "false",
  },
  getStarted: {
    source_page: "/get-started",
    route_type: "paid_support",
    offer_context: "paid_support_route",
    page_variant: "desktop_v1_launch",
    workshop_followup: "false",
  },
};

const UTM_PARAM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

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

function withRouteParams(routePath, params) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== "") {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  return `${pathTo(routePath)}${queryString ? `?${queryString}` : ""}`;
}

function createFormRouteHref(routePath, options = {}) {
  const params = new URLSearchParams({
    source: options.source || getSourceContext(),
    originPage: options.originPage || getOriginPage(),
  });

  if (options.ctaClicked) {
    params.set("cta_clicked", options.ctaClicked);
  }

  return withRouteParams(routePath, Object.fromEntries(params.entries()));
}

function createDiagnosticHref(options = {}) {
  return createFormRouteHref("diagnostic/", options);
}

function createWorkshopHref(options = {}) {
  return createFormRouteHref("contact/", options);
}

function createToolkitHref(options = {}) {
  return createFormRouteHref("toolkit/", options);
}

function createGetStartedHref(options = {}) {
  return createFormRouteHref("get-started/", options);
}

function getLinkCtaClicked(link, fallback) {
  return link.dataset.ctaClicked || link.dataset.track || link.dataset.trackSource || fallback;
}

function buildTallyUrl(baseUrl, routeContext) {
  const url = new URL(baseUrl);
  const currentParams = new URLSearchParams(window.location.search);

  UTM_PARAM_KEYS.forEach((key) => {
    const value = currentParams.get(key);
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  Object.entries(routeContext).forEach(([key, value]) => {
    if (value != null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  if (document.referrer) {
    url.searchParams.set("referring_page", document.referrer);
  }

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
    const href = item.key === "get-started"
      ? createGetStartedHref({ source: "nav", ctaClicked: "nav_get_started" })
      : pathTo(item.href);
    return `<a class="site-nav__link" href="${href}"${current}>${item.label}</a>`;
  }).join("");

  mount.innerHTML = `
    <header class="site-header">
      <div class="shell site-header__inner">
        <a class="site-brand" href="${pathTo("")}" aria-label="Signal over Noise home">
          ${createBrandMarkup()}
        </a>
        <nav class="site-nav" aria-label="Primary">
          <div class="site-nav__links">${navLinks}</div>
          <a class="button button--primary button--compact" data-track="nav_diagnostic_click" data-track-source="nav" data-cta-clicked="nav_diagnostic" data-diagnostic-link href="${createDiagnosticHref({ source: "nav", ctaClicked: "nav_diagnostic" })}">Free Diagnostic</a>
        </nav>
        <div class="site-header__mobile">
          <a class="button button--primary button--compact" data-track="nav_diagnostic_click" data-track-source="nav" data-cta-clicked="mobile_nav_diagnostic" data-diagnostic-link href="${createDiagnosticHref({ source: "nav", ctaClicked: "mobile_nav_diagnostic" })}">Diagnostic</a>
          <button class="button button--ghost button--compact menu-toggle" type="button" data-menu-toggle aria-label="Menu" aria-expanded="false" aria-controls="site-menu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
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
            <p class="site-footer__meta">Workshop follow-up tools for real presentation prep.</p>
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
          <p class="site-footer__meta">Real presentations. Real feedback. Clear next steps.</p>
          <p class="site-footer__legal">Diagnose. Refine. Rehearse.</p>
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
      createDiagnosticHref({
        originPage: link.dataset.trackOrigin || getOriginPage(),
        source: link.dataset.trackSource || getSourceContext(),
        ctaClicked: getLinkCtaClicked(link, "diagnostic_cta"),
      }),
    );
  });

  document.querySelectorAll("[data-workshop-link]").forEach((link) => {
    link.setAttribute(
      "href",
      createWorkshopHref({
        originPage: link.dataset.trackOrigin || getOriginPage(),
        source: link.dataset.trackSource || getSourceContext(),
        ctaClicked: getLinkCtaClicked(link, "workshop_cta"),
      }),
    );
  });

  document.querySelectorAll("[data-toolkit-link]").forEach((link) => {
    link.setAttribute(
      "href",
      createToolkitHref({
        originPage: link.dataset.trackOrigin || getOriginPage(),
        source: link.dataset.trackSource || getSourceContext(),
        ctaClicked: getLinkCtaClicked(link, "toolkit_cta"),
      }),
    );
  });

  document.querySelectorAll("[data-get-started-link]").forEach((link) => {
    link.setAttribute(
      "href",
      createGetStartedHref({
        originPage: link.dataset.trackOrigin || getOriginPage(),
        source: link.dataset.trackSource || getSourceContext(),
        ctaClicked: getLinkCtaClicked(link, "paid_support_cta"),
      }),
    );
  });
}

function resolvePageContext() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("source") || getSourceContext(),
    originPage: params.get("originPage") || getOriginPage(),
    ctaClicked: params.get("cta_clicked") || "direct_route",
  };
}

function createTallyDirectUrl(embedUrl) {
  return embedUrl.replace("/embed/", "/r/");
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

    const routeContext = TALLY_ROUTE_CONTEXTS[key] || {};
    const src = buildTallyUrl(config.url, {
      source: context.source,
      originPage: context.originPage,
      cta_clicked: context.ctaClicked,
      ...routeContext,
    });

    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.width = "100%";
    iframe.height = mount.dataset.tallyHeight || TALLY_DEFAULT_HEIGHTS[key] || "720";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("marginheight", "0");
    iframe.setAttribute("marginwidth", "0");
    iframe.setAttribute("loading", "eager");
    iframe.title = config.title;
    iframe.className = "tally-embed";
    mount.appendChild(iframe);

    const fallback = document.createElement("p");
    fallback.className = "tally-embed-fallback";

    const fallbackLink = document.createElement("a");
    fallbackLink.href = createTallyDirectUrl(src);
    fallbackLink.target = "_blank";
    fallbackLink.rel = "noopener";
    fallbackLink.textContent = "Open the form directly";

    fallback.append("Having trouble seeing the form? ", fallbackLink, ".");
    mount.appendChild(fallback);
  });
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
  syncCompareLabelVisibility(compare);
}

function syncCompareLabelVisibility(compare) {
  const handle = compare.querySelector("[data-compare-handle]");
  const labels = compare.querySelectorAll(".proof-compare__labels span");
  if (!handle || labels.length < 2) {
    compare.removeAttribute("data-compare-label-overlap");
    return;
  }

  const handleRect = handle.getBoundingClientRect();
  const dividerX = handleRect.left + handleRect.width / 2;
  const overlaps = [];

  labels.forEach((label, index) => {
    const labelRect = label.getBoundingClientRect();
    const isOverlapping = dividerX >= labelRect.left && dividerX <= labelRect.right;

    if (isOverlapping) {
      overlaps.push(index === 0 ? "before" : "after");
    }
  });

  if (overlaps.length) {
    compare.setAttribute("data-compare-label-overlap", overlaps.join(" "));
  } else {
    compare.removeAttribute("data-compare-label-overlap");
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
