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

const I18N_CONFIG = {
  enabled: true,
  showSwitcher: true,
  defaultLanguage: "en",
  supportedLanguages: ["en", "ko"],
  koreanPrefix: "/ko/",
  storageKey: "son-preferred-language",
};

const UI_COPY = {
  en: {
    nav: {
      services: "Services",
      process: "Process",
      proof: "Sample Work",
      workshops: "Workshops",
      privacy: "Privacy",
      freeDiagnostic: "Free Diagnostic",
      diagnosticShort: "Diagnostic",
      menu: "Menu",
      primaryLabel: "Primary",
      mobileLabel: "Mobile",
      languageSoon: "Language selector (coming soon)",
      language: "Language selector",
    },
    brandHome: "Signal over Noise home",
    minimalContext: "Workshop follow-up",
    minimalFooterMeta: "Workshop follow-up tools for real presentation prep.",
    footerMeta: "Real presentations. Real feedback. Clear next steps.",
    footerLegal: "Diagnose. Refine. Rehearse.",
    tally: {
      toolkitTitle: "Signal over Noise Presenter Toolkit",
      diagnosticTitle: "Free Presentation Diagnostic",
      workshopTitle: "Signal over Noise Workshop Inquiry",
      getStartedTitle: "Signal over Noise Get Started Request",
      fallbackPrefix: "Having trouble seeing the form? ",
      fallbackLink: "Open the form directly",
    },
    modal: {
      eyebrow: "Diagnostic Viewer",
      copy: "Turn pages in the browser viewer, open the file in a separate tab, or download the full PDF directly.",
      close: "Close",
      openInNewTab: "Open in new tab",
      downloadPdf: "Download PDF",
      iframeTitle: "Diagnostic PDF viewer",
      defaultTitle: "Diagnostic sample",
    },
  },
  ko: {
    nav: {
      services: "서비스",
      process: "프로세스",
      proof: "샘플 작업",
      workshops: "워크숍",
      privacy: "개인정보처리방침",
      freeDiagnostic: "무료 진단",
      diagnosticShort: "진단",
      menu: "메뉴",
      primaryLabel: "주요",
      mobileLabel: "모바일",
      languageSoon: "언어 선택기 (준비 중)",
      language: "언어 선택기",
    },
    brandHome: "Signal over Noise 홈",
    minimalContext: "워크숍 후속 지원",
    minimalFooterMeta: "실전 발표 준비를 위한 워크숍 후속 도구입니다.",
    footerMeta: "실전 발표. 실전 피드백. 명확한 다음 단계.",
    footerLegal: "진단. 개선. 리허설.",
    tally: {
      toolkitTitle: "Signal over Noise 발표자 툴킷",
      diagnosticTitle: "무료 프레젠테이션 진단",
      workshopTitle: "Signal over Noise 워크숍 문의",
      getStartedTitle: "Signal over Noise 유료 지원 요청",
      fallbackPrefix: "폼이 보이지 않나요? ",
      fallbackLink: "직접 열기",
    },
    modal: {
      eyebrow: "진단 뷰어",
      copy: "브라우저 뷰어에서 페이지를 넘기거나, 새 탭에서 열거나, PDF 전체를 바로 다운로드할 수 있습니다.",
      close: "닫기",
      openInNewTab: "새 탭에서 열기",
      downloadPdf: "PDF 다운로드",
      iframeTitle: "진단 PDF 뷰어",
      defaultTitle: "진단 샘플",
    },
  },
};

function normalizePathname(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

function isKoreanPath(pathname = window.location.pathname) {
  const normalized = normalizePathname(pathname);
  return normalized === "/ko/" || normalized.startsWith("/ko/");
}

function getCurrentLanguage() {
  return isKoreanPath() ? "ko" : "en";
}

function getCopy() {
  return UI_COPY[getCurrentLanguage()];
}

function getEnglishPathname(pathname = window.location.pathname) {
  const normalized = normalizePathname(pathname);
  if (!isKoreanPath(normalized)) {
    return normalized;
  }

  const withoutPrefix = normalized.replace(/^\/ko\/?/, "");
  return withoutPrefix ? `/${withoutPrefix}` : "/";
}

function createLocalizedPathname(targetLanguage, pathname = window.location.pathname) {
  const englishPath = getEnglishPathname(pathname);
  if (targetLanguage === "ko") {
    if (englishPath === "/") {
      return "/ko/";
    }
    return `/ko${englishPath}`;
  }
  return englishPath;
}

function getPreferredLanguage() {
  try {
    const stored = window.localStorage.getItem(I18N_CONFIG.storageKey);
    if (stored && I18N_CONFIG.supportedLanguages.includes(stored)) {
      return stored;
    }
  } catch (_) {
    // Ignore storage issues in privacy-restricted contexts.
  }

  const languageCandidates = [
    ...(navigator.languages || []),
    navigator.language || "",
  ].filter(Boolean);

  const hasKorean = languageCandidates.some((code) => code.toLowerCase().startsWith("ko"));
  return hasKorean ? "ko" : I18N_CONFIG.defaultLanguage;
}

function persistPreferredLanguage(language) {
  if (!I18N_CONFIG.supportedLanguages.includes(language)) {
    return;
  }

  try {
    window.localStorage.setItem(I18N_CONFIG.storageKey, language);
  } catch (_) {
    // Ignore storage failures.
  }
}

function maybeApplyLanguageRedirect() {
  if (!I18N_CONFIG.enabled) {
    return false;
  }

  const preferredLanguage = getPreferredLanguage();
  const targetPathname = createLocalizedPathname(preferredLanguage);
  const currentPathname = normalizePathname(window.location.pathname);

  if (normalizePathname(targetPathname) === currentPathname) {
    return false;
  }

  const nextUrl = `${targetPathname}${window.location.search}${window.location.hash}`;
  window.location.replace(nextUrl);
  return true;
}

function createLanguageSwitcherMarkup(options = {}) {
  if (!I18N_CONFIG.showSwitcher) {
    return "";
  }

  const compact = options.compact ? " site-lang-switcher--compact" : "";
  const currentLanguage = isKoreanPath() ? "ko" : "en";
  const copy = getCopy();

  if (!I18N_CONFIG.enabled) {
    return `
      <div class="site-lang-switcher${compact}" aria-label="${copy.nav.languageSoon}">
        <span class="site-nav__link site-lang-switcher__option" aria-current="${currentLanguage === "en" ? "page" : "false"}">EN</span>
        <span class="site-nav__link site-lang-switcher__option" aria-current="${currentLanguage === "ko" ? "page" : "false"}">KO</span>
      </div>
    `;
  }

  const enHref = createLocalizedPathname("en");
  const koHref = createLocalizedPathname("ko");

  return `
    <div class="site-lang-switcher${compact}" aria-label="${copy.nav.language}">
      <a class="site-nav__link site-lang-switcher__option" href="${enHref}" data-language-switch="en" aria-current="${currentLanguage === "en" ? "page" : "false"}">EN</a>
      <a class="site-nav__link site-lang-switcher__option" href="${koHref}" data-language-switch="ko" aria-current="${currentLanguage === "ko" ? "page" : "false"}">KO</a>
    </div>
  `;
}

function wireLanguageSwitcher() {
  if (!I18N_CONFIG.enabled) {
    return;
  }

  document.querySelectorAll("[data-language-switch]").forEach((link) => {
    link.addEventListener("click", () => {
      persistPreferredLanguage(link.dataset.languageSwitch || I18N_CONFIG.defaultLanguage);
    });
  });
}

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
  if (path.startsWith("/")) {
    return path;
  }
  return `${getRoot()}${path}`;
}

function createBrandMarkup(className = "site-brand__mark", variant = "full-color") {
  const markPath = variant === "reversed"
     ? "/img/brand-marks/one-color-horizontal-lockup.svg"
     : "/img/brand-marks/full-color-horizontal-lockup.svg";
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

  const copy = getCopy();
  const desktopLanguageSwitcher = createLanguageSwitcherMarkup();
  const mobileLanguageSwitcher = createLanguageSwitcherMarkup({ compact: true });

  if (useMinimalChrome()) {
    mount.innerHTML = `
      <header class="site-header site-header--minimal">
        <div class="shell site-header__inner">
          <a class="site-brand" href="${pathTo("")}" aria-label="${copy.brandHome}">
            ${createBrandMarkup()}
          </a>
          <p class="site-header__context">${copy.minimalContext}</p>
        </div>
      </header>
    `;
    return;
  }

  const currentPage = getPageKey();
  const navLinks = NAV_ITEMS.map((item) => {
    const current = item.key === currentPage ? ' aria-current="page"' : "";
    const href = item.href === "get-started/"
      ? createGetStartedHref({ source: "nav", ctaClicked: "nav_get_started" })
      : pathTo(item.href);
    return `<a class="site-nav__link" href="${href}"${current}>${copy.nav[item.key] || item.label}</a>`;
  }).join("");

  mount.innerHTML = `
    <header class="site-header">
      <div class="shell site-header__inner">
        <a class="site-brand" href="${pathTo("")}" aria-label="${copy.brandHome}">
          ${createBrandMarkup()}
        </a>
        <nav class="site-nav" aria-label="${copy.nav.primaryLabel}">
          <div class="site-nav__links">${navLinks}</div>
          ${desktopLanguageSwitcher}
          <a class="button button--primary button--compact" data-track="nav_diagnostic_click" data-track-source="nav" data-cta-clicked="nav_diagnostic" data-diagnostic-link href="${createDiagnosticHref({ source: "nav", ctaClicked: "nav_diagnostic" })}">${copy.nav.freeDiagnostic}</a>
        </nav>
        <div class="site-header__mobile">
          <a class="button button--primary button--compact" data-track="nav_diagnostic_click" data-track-source="nav" data-cta-clicked="mobile_nav_diagnostic" data-diagnostic-link href="${createDiagnosticHref({ source: "nav", ctaClicked: "mobile_nav_diagnostic" })}">${copy.nav.diagnosticShort}</a>
          <button class="button button--ghost button--compact menu-toggle" type="button" data-menu-toggle aria-label="${copy.nav.menu}" aria-expanded="false" aria-controls="site-menu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </div>
      <div class="shell">
        <nav class="site-menu-panel" id="site-menu" aria-label="${copy.nav.mobileLabel}">
          <div class="site-menu-panel__links">${navLinks}<a class="site-nav__link" href="${pathTo("privacy/")}">${copy.nav.privacy}</a></div>
          ${mobileLanguageSwitcher}
        </nav>
      </div>
    </header>
  `;

  const toggle = mount.querySelector("[data-menu-toggle]");
  const panel = mount.querySelector(".site-menu-panel");

  if (toggle && panel) {
    const closeMobileMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      panel.classList.remove("is-open");
    };

    toggle.addEventListener("click", () => {
      const nextState = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(nextState));
      panel.classList.toggle("is-open", nextState);
    });

    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      const desktopNav = window.matchMedia("(min-width: 981px)");
      const syncMobileMenu = (event) => {
        if (event.matches) {
          closeMobileMenu();
        }
      };

      syncMobileMenu(desktopNav);

      if (typeof desktopNav.addEventListener === "function") {
        desktopNav.addEventListener("change", syncMobileMenu);
      } else if (typeof desktopNav.addListener === "function") {
        desktopNav.addListener(syncMobileMenu);
      }
    }
  }
}

function renderFooter() {
  const mount = document.querySelector("[data-site-footer]");
  if (!mount) {
    return;
  }

  const copy = getCopy();
  const footerCopyright = `© ${new Date().getFullYear()} Signal over Noise. All rights reserved.`;

  if (useMinimalChrome()) {
    mount.innerHTML = `
      <footer class="site-footer site-footer--minimal">
        <div class="shell site-footer__inner site-footer__inner--minimal">
          <a class="footer-brand" href="${pathTo("")}" aria-label="${copy.brandHome}">
            ${createBrandMarkup("footer-brand__mark", "reversed")}
          </a>
          <div class="site-footer__minimal-meta">
            <div class="site-footer__copy-stack">
              <p class="site-footer__meta">${copy.minimalFooterMeta}</p>
              <p class="site-footer__copyright">${footerCopyright}</p>
            </div>
            <a class="site-footer__privacy" href="${pathTo("privacy/")}">${copy.nav.privacy}</a>
          </div>
        </div>
      </footer>
    `;
    return;
  }

  const footerLinks = [
    ...NAV_ITEMS.map((item) => `<a href="${pathTo(item.href)}">${copy.nav[item.key] || item.label}</a>`),
    `<a href="${pathTo("privacy/")}">${copy.nav.privacy}</a>`,
  ].join("");

  mount.innerHTML = `
    <footer class="site-footer">
      <div class="shell site-footer__inner">
        <div class="site-footer__top">
          <a class="footer-brand" href="${pathTo("")}" aria-label="${copy.brandHome}">
            ${createBrandMarkup("footer-brand__mark", "reversed")}
          </a>
          <nav class="footer-nav" aria-label="Footer">${footerLinks}</nav>
        </div>
        <div class="site-footer__rule" role="presentation"></div>
        <div class="site-footer__bottom">
          <p class="site-footer__meta">${copy.footerMeta}</p>
          <p class="site-footer__copyright">${footerCopyright}</p>
          <p class="site-footer__legal">${copy.footerLegal}</p>
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
  const copy = getCopy();
  const configs = {
    toolkit: { url: TALLY_URLS.toolkit, title: copy.tally.toolkitTitle },
    diagnostic: { url: TALLY_URLS.diagnostic, title: copy.tally.diagnosticTitle },
    workshop: { url: TALLY_URLS.workshop, title: copy.tally.workshopTitle },
    getStarted: { url: TALLY_URLS.getStarted, title: copy.tally.getStartedTitle },
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
    fallbackLink.textContent = copy.tally.fallbackLink;

    fallback.append(copy.tally.fallbackPrefix, fallbackLink, ".");
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

  const copy = getCopy();
  const modal = document.createElement("div");
  modal.className = "proof-modal";
  modal.dataset.proofModal = "true";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="proof-modal__scrim" data-proof-modal-close></div>
    <div class="proof-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="proof-modal-title">
      <div class="proof-modal__header">
        <div class="stack-sm">
          <p class="eyebrow">${copy.modal.eyebrow}</p>
          <h2 class="card-title" id="proof-modal-title"></h2>
          <p class="proof-modal__copy">${copy.modal.copy}</p>
        </div>
        <button class="button button--ghost button--compact" type="button" data-proof-modal-close>${copy.modal.close}</button>
      </div>
      <div class="proof-modal__actions">
        <a class="button button--secondary" href="#" target="_blank" rel="noopener" data-proof-modal-open>${copy.modal.openInNewTab}</a>
        <a class="button button--primary" href="#" download data-proof-modal-download>${copy.modal.downloadPdf}</a>
      </div>
      <div class="proof-modal__viewer">
        <iframe class="proof-modal__iframe" title="${copy.modal.iframeTitle}" loading="lazy"></iframe>
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
  const copy = getCopy();
  modalState.lastTrigger = trigger || document.activeElement;
  modalState.title.textContent = titleText || copy.modal.defaultTitle;
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

if (!maybeApplyLanguageRedirect()) {
  renderHeader();
  renderFooter();
  hydrateRouteLinks();
  wireTrackedLinks();
  mountAllTallyEmbeds();
  initProofComparisons();
  initProofPdfViewer();
  wireLanguageSwitcher();
}
