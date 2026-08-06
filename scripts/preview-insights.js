const { spawnSync, spawn } = require("node:child_process");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const build = spawnSync(process.execPath, [path.join(__dirname, "build-insights.js"), "--drafts"], {
  cwd: root,
  stdio: "inherit",
});

if (build.status !== 0) {
  process.exit(build.status || 1);
}

spawn(process.execPath, ["_server.js"], {
  cwd: root,
  env: { ...process.env, INSIGHTS_PREVIEW: "true" },
  stdio: "inherit",
});
