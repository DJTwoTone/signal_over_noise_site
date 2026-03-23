const NAV_ITEMS = [
  { key: "services", label: "Services", href: "services/" },
  { key: "process", label: "Process", href: "process/" },
  { key: "proof", label: "Proof", href: "proof/" },
  { key: "workshops", label: "Workshops", href: "workshops/" },
];

const MINIMAL_CHROME_PAGES = new Set(["scan", "thanks"]);

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

function createBrandMarkup(className = "site-brand__mark") {
  return `<img class="${className}" src="${pathTo("img/signal-over-noise-wordmark.svg")}" alt="Signal over Noise">`;
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
          <a class="button button--primary" data-track="nav_diagnostic_click" data-diagnostic-link href="${createDiagnosticHref()}">Request a Free Presentation Diagnostic</a>
        </nav>
        <div class="site-header__mobile">
          <a class="button button--primary button--compact" data-track="nav_diagnostic_click" data-diagnostic-link href="${createDiagnosticHref()}">Diagnostic</a>
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
            ${createBrandMarkup("footer-brand__mark")}
          </a>
          <div class="site-footer__minimal-meta">
            <p class="site-footer__meta">Presentation follow-up for workshop attendees.</p>
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
            ${createBrandMarkup("footer-brand__mark")}
          </a>
          <nav class="footer-nav" aria-label="Footer">${footerLinks}</nav>
        </div>
        <div class="site-footer__rule" role="presentation"></div>
        <div class="site-footer__bottom">
          <p class="site-footer__meta">Presentation support for professionals presenting in English and multilingual settings.</p>
          <p class="site-footer__legal">Diagnostic-first support with artifacts, process clarity, and selective founder-led proof.</p>
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
}

function resolvePageContext() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("source") || getSourceContext(),
    originPage: params.get("originPage") || getOriginPage(),
  };
}

function hydrateFormContext(form) {
  const context = resolvePageContext();
  const sourceField = form.querySelector('input[name="source"]');
  const originField = form.querySelector('input[name="originPage"]');

  if (sourceField) {
    sourceField.value = context.source;
  }

  if (originField) {
    originField.value = context.originPage;
  }
}

function showSuccess(form) {
  const success = form.querySelector("[data-form-success]");
  if (!success) {
    return;
  }

  success.classList.add("is-visible");
  success.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function handleToolkitForm() {
  const form = document.querySelector("[data-toolkit-form]");
  if (!form) {
    return;
  }

  hydrateFormContext(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    hydrateFormContext(form);

    const payload = Object.fromEntries(new FormData(form).entries());
    emitTrack("scan_toolkit_submit", {
      source: payload.source,
      originPage: payload.originPage,
    });
    sessionStorage.setItem("son-toolkit", JSON.stringify(payload));

    const params = new URLSearchParams({
      source: payload.source || "workshop-qr",
      originPage: "/thanks",
    });

    window.location.href = `${pathTo("thanks/")}?${params.toString()}`;
  });
}

function handleDiagnosticForm() {
  const form = document.querySelector("[data-diagnostic-form]");
  if (!form) {
    return;
  }

  hydrateFormContext(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    hydrateFormContext(form);

    const payload = Object.fromEntries(new FormData(form).entries());
    sessionStorage.setItem("son-diagnostic", JSON.stringify(payload));
    emitTrack("diagnostic_submit", {
      source: payload.source,
      originPage: payload.originPage,
      reviewType: payload.reviewType || "",
    });

    showSuccess(form);
    form.reset();
    hydrateFormContext(form);
  });
}

function handleContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) {
    return;
  }

  hydrateFormContext(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    hydrateFormContext(form);

    const payload = Object.fromEntries(new FormData(form).entries());
    sessionStorage.setItem("son-contact", JSON.stringify(payload));
    emitTrack("workshop_inquiry_submit", {
      source: payload.source,
      originPage: payload.originPage,
      focus: payload.focus || "",
    });

    showSuccess(form);
    form.reset();
    hydrateFormContext(form);
  });
}

function personalizeThanks() {
  const target = document.querySelector("[data-toolkit-name]");
  if (!target) {
    return;
  }

  const raw = sessionStorage.getItem("son-toolkit");
  if (!raw) {
    return;
  }

  try {
    const payload = JSON.parse(raw);
    if (payload.firstName) {
      target.textContent = `${payload.firstName}, `;
    }
  } catch {
    target.textContent = "";
  }
}

renderHeader();
renderFooter();
hydrateRouteLinks();
wireTrackedLinks();
handleToolkitForm();
handleDiagnosticForm();
handleContactForm();
personalizeThanks();
