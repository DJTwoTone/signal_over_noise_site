const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "dist");

const publicEntries = [
  "index.html",
  "assets",
  "img",
  "ko",
  "contact",
  "diagnostic",
  "downloads",
  "get-started",
  "packages",
  "privacy",
  "process",
  "proof",
  "toolkit",
  "services",
  "thanks",
  "thanks-diagnostic",
  "thanks-get-started",
  "thanks-toolkit",
  "thanks-workshop",
  "workshops",
];

const optionalRootFiles = [
  ".well-known",
  "404.html",
  "_headers",
  "_redirects",
  "favicon.ico",
  "security.txt",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
];

function copyRecursive(source, destination) {
  const stat = fs.statSync(source);

  if (stat.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });

    for (const entry of fs.readdirSync(source)) {
      copyRecursive(path.join(source, entry), path.join(destination, entry));
    }

    return;
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

function listFiles(dir) {
  const files = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...listFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>+~])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const entry of publicEntries) {
  const source = path.join(root, entry);

  if (!fs.existsSync(source)) {
    throw new Error(`Missing required public entry: ${entry}`);
  }

  copyRecursive(source, path.join(outputDir, entry));
}

for (const file of optionalRootFiles) {
  const source = path.join(root, file);

  if (fs.existsSync(source)) {
    copyRecursive(source, path.join(outputDir, file));
  }
}

const distStylesPath = path.join(outputDir, "assets", "styles.css");
if (fs.existsSync(distStylesPath)) {
  const sourceCss = fs.readFileSync(distStylesPath, "utf8");
  fs.writeFileSync(distStylesPath, minifyCss(sourceCss));
}

const files = listFiles(outputDir);
const bytes = files.reduce((total, file) => total + fs.statSync(file).size, 0);

console.log(`Built dist with ${files.length} files (${formatBytes(bytes)}).`);
