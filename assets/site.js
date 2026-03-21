const NAV_ITEMS = [
  { key: "home", label: "Home", href: "" },
  { key: "services", label: "Services", href: "services/" },
  { key: "process", label: "Process", href: "process/" },
  { key: "proof", label: "Proof", href: "proof/" },
  { key: "packages", label: "Packages", href: "packages/" },
  { key: "workshops", label: "Workshops", href: "workshops/" },
];

function getRoot() {
  return document.body.dataset.siteRoot || "./";
}

function getPageKey() {
  return document.body.dataset.page || "";
}

function pathTo(path) {
  return `${getRoot()}${path}`;
}

function renderHeader() {
  const mount = document.querySelector("[data-site-header]");
  if (!mount) {
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
        <a class="site-brand" href="${pathTo("")}">Signal over Noise</a>
        <nav class="site-nav" aria-label="Primary">
          <div class="site-nav__links">${navLinks}</div>
          <a class="button button--primary" href="${pathTo("diagnostic/")}">Request a Free Presentation Diagnostic</a>
        </nav>
        <div class="site-header__mobile">
          <a class="button button--primary button--compact" href="${pathTo("diagnostic/")}">Diagnostic</a>
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

  const footerLinks = [
    ...NAV_ITEMS.map((item) => `<a href="${pathTo(item.href)}">${item.label}</a>`),
    `<a href="${pathTo("privacy/")}">Privacy</a>`,
  ].join("");

  mount.innerHTML = `
    <footer class="site-footer">
      <div class="shell site-footer__inner">
        <div class="site-footer__top">
          <a class="footer-brand" href="${pathTo("")}">Signal over Noise</a>
          <nav class="footer-nav" aria-label="Footer">${footerLinks}</nav>
        </div>
        <div class="site-footer__rule" role="presentation"></div>
        <div class="site-footer__bottom">
          <p class="site-footer__meta">Premium editorial presentation support for professionals presenting in English and multilingual settings.</p>
          <p class="site-footer__legal">Privacy policy available. Workshop inquiries handled directly.</p>
        </div>
      </div>
    </footer>
  `;
}

function handleToolkitForm() {
  const form = document.querySelector("[data-toolkit-form]");
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    sessionStorage.setItem("son-toolkit", JSON.stringify(payload));
    window.location.href = pathTo("thanks/");
  });
}

function handleDiagnosticForm() {
  const form = document.querySelector("[data-diagnostic-form]");
  if (!form) {
    return;
  }

  const success = form.querySelector("[data-form-success]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    sessionStorage.setItem("son-diagnostic", JSON.stringify(payload));
    if (success) {
      success.classList.add("is-visible");
      success.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    form.reset();
  });
}

function handleContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) {
    return;
  }

  const success = form.querySelector("[data-form-success]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    sessionStorage.setItem("son-contact", JSON.stringify(payload));
    if (success) {
      success.classList.add("is-visible");
      success.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    form.reset();
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
    // Ignore malformed session data.
  }
}

renderHeader();
renderFooter();
handleToolkitForm();
handleDiagnosticForm();
handleContactForm();
personalizeThanks();
