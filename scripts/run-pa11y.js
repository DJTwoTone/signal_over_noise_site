const { spawn, spawnSync } = require("node:child_process");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const port = 8090;
const baseUrl = `http://localhost:${port}`;
const routes = [
  "/",
  "/about/",
  "/services/",
  "/diagnostic/",
  "/get-started/",
  "/proof/",
  "/privacy/",
  "/ko/",
  "/ko/about/",
  "/ko/services/",
  "/ko/diagnostic/",
  "/ko/get-started/",
  "/ko/proof/",
  "/ko/privacy/",
  "/insights/",
  "/insights/ai-made-presentation-human-review/",
];

function resolveBrowser() {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    path.join(process.env.ProgramFiles || "", "Google", "Chrome", "Application", "chrome.exe"),
    path.join(process.env["ProgramFiles(x86)"] || "", "Google", "Chrome", "Application", "chrome.exe"),
    path.join(process.env.ProgramFiles || "", "Microsoft", "Edge", "Application", "msedge.exe"),
    path.join(process.env["ProgramFiles(x86)"] || "", "Microsoft", "Edge", "Application", "msedge.exe"),
  ].filter(Boolean);

  return candidates.find((candidate) => fs.existsSync(candidate)) || "";
}

function waitForServer() {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + 15000;
    const poll = () => {
      const request = http.get(`${baseUrl}/insights/`, (response) => {
        response.resume();
        if (response.statusCode === 200) {
          resolve();
        } else if (Date.now() < deadline) {
          setTimeout(poll, 150);
        } else {
          reject(new Error(`Local server returned HTTP ${response.statusCode}.`));
        }
      });

      request.on("error", () => {
        if (Date.now() < deadline) {
          setTimeout(poll, 150);
        } else {
          reject(new Error("Timed out waiting for the local Insights server."));
        }
      });
    };

    poll();
  });
}

async function run() {
  const browser = resolveBrowser();
  if (!browser) {
    throw new Error("Chrome or Edge was not found. Set PUPPETEER_EXECUTABLE_PATH to a browser executable.");
  }

  const build = spawnSync(process.execPath, [path.join(__dirname, "build-insights.js")], {
    cwd: root,
    stdio: "inherit",
  });
  if (build.status !== 0) {
    process.exit(build.status || 1);
  }

  const server = spawn(process.execPath, ["_server.js"], {
    cwd: root,
    env: { ...process.env, PORT: String(port) },
    stdio: "ignore",
  });

  try {
    await waitForServer();
    const browserInstance = await chromium.launch({
      headless: true,
      executablePath: browser,
      args: ["--no-sandbox", "--disable-gpu"],
    });

    try {
      for (const route of routes) {
        const page = await browserInstance.newPage();
        const fullUrl = `${baseUrl}${route}`;
        await page.goto(fullUrl, { waitUntil: "networkidle", timeout: 180000 });
        await page.addScriptTag({
          url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.11.0/axe.min.js",
        });

        const result = await page.evaluate(async () => {
          const out = await axe.run(document, {
            rules: {
              "color-contrast": { enabled: true },
            },
          });
          return out;
        });

        const errors = result.violations || [];
        console.log(`${route} (axe): ${errors.length} violation(s)`);
        if (errors.length) {
          errors.forEach((issue) => console.error(`- ${issue.id} ${issue.help} (${issue.nodes[0]?.target?.join(", ") || "unknown"})`));
          process.exitCode = 1;
        }

        await page.close();
      }
    } finally {
      await browserInstance.close();
    }
  } finally {
    server.kill();
  }
}

run().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
