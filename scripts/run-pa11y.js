const { spawn, spawnSync } = require("node:child_process");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const pa11y = require("pa11y");

const root = path.resolve(__dirname, "..");
const port = 8090;
const baseUrl = `http://localhost:${port}`;
const routes = [
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
    for (const route of routes) {
      for (const runner of [["htmlcs"], ["axe"]]) {
        const result = await pa11y(`${baseUrl}${route}`, {
          runners: runner,
          standard: "WCAG2AA",
          timeout: 120000,
          wait: 250,
          chromeLaunchConfig: {
            executablePath: browser,
            args: ["--no-sandbox", "--disable-gpu"],
          },
        });
        const errors = result.issues.filter((issue) => issue.type === "error");
        console.log(`${route} (${runner[0]}): ${errors.length} error(s)`);
        if (errors.length) {
          errors.forEach((issue) => console.error(`- ${issue.message} (${issue.selector})`));
          process.exitCode = 1;
        }
      }
    }
  } finally {
    server.kill();
  }
}

run().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
