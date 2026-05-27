const fs = require("fs");
const path = require("path");

const PAGES = [
  "index.html",
  "services/index.html",
  "process/index.html",
  "proof/index.html",
  "workshops/index.html",
  "diagnostic/index.html",
  "get-started/index.html",
  "contact/index.html",
  "toolkit/index.html",
  "thanks/index.html",
  "privacy/index.html",
];

const SITE_URL = "https://signal-over-noise.coach";

function routeFor(relPath) {
  if (relPath === "index.html") {
    return "/";
  }

  return `/${path.dirname(relPath).replace(/\\/g, "/")}/`;
}

function absoluteUrl(route) {
  return `${SITE_URL}${route}`;
}

function koRouteFor(enRoute) {
  if (enRoute === "/") {
    return "/ko/";
  }

  return `/ko${enRoute}`;
}

function ensureSeoLinks(filePath, canonicalHref, enHref, koHref) {
  let html = fs.readFileSync(filePath, "utf8");

  html = html.replace(/^\s*<link rel="canonical"[^\n]*\n/gm, "");
  html = html.replace(/^\s*<link rel="alternate"[^\n]*hreflang="(?:en|ko|x-default)"[^\n]*\n/gm, "");

  const insert = [
    `    <link rel="canonical" href="${canonicalHref}">`,
    `    <link rel="alternate" hreflang="en" href="${enHref}">`,
    `    <link rel="alternate" hreflang="ko" href="${koHref}">`,
    `    <link rel="alternate" hreflang="x-default" href="${enHref}">`,
  ].join("\n");

  if (html.includes("<meta name=\"description\"")) {
    html = html.replace(/(\s*<meta name="description"[^\r\n]*>\r?\n)/, `$1${insert}\n`);
  } else if (html.includes("<meta name=\"viewport\"")) {
    html = html.replace(/(\s*<meta name="viewport"[^\r\n]*>\r?\n)/, `$1${insert}\n`);
  }

  fs.writeFileSync(filePath, html, "utf8");
}

function removeKoPlaceholders(rootPath) {
  const koPaths = [
    "ko/index.html",
    "ko/services/index.html",
    "ko/process/index.html",
    "ko/proof/index.html",
    "ko/workshops/index.html",
    "ko/diagnostic/index.html",
    "ko/get-started/index.html",
    "ko/contact/index.html",
    "ko/toolkit/index.html",
    "ko/thanks/index.html",
    "ko/privacy/index.html",
    "ko/packages/index.html",
  ];

  koPaths.forEach((relPath) => {
    const absPath = path.join(rootPath, relPath);
    if (!fs.existsSync(absPath)) {
      return;
    }

    const html = fs
      .readFileSync(absPath, "utf8")
      .replace(/\r?\n\s*<p hidden data-i18n-placeholder="true">TODO\(i18n\): Replace English page copy with Korean translation\.<\/p>/g, "");

    fs.writeFileSync(absPath, html, "utf8");
  });
}

function main() {
  const root = process.cwd();

  PAGES.forEach((relPath) => {
    const enRoute = routeFor(relPath);
    const koRoute = koRouteFor(enRoute);
    const enHref = absoluteUrl(enRoute);
    const koHref = absoluteUrl(koRoute);

    const enPath = path.join(root, relPath);
    const koPath = path.join(root, "ko", relPath);

    if (fs.existsSync(enPath)) {
      ensureSeoLinks(enPath, enHref, enHref, koHref);
    }

    if (fs.existsSync(koPath)) {
      ensureSeoLinks(koPath, koHref, enHref, koHref);
    }
  });

  removeKoPlaceholders(root);
  console.log("i18n SEO links applied and KO placeholders removed.");
}

main();
