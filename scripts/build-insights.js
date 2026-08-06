const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const eleventyCommand = path.join(root, "node_modules", "@11ty", "eleventy", "cmd.cjs");
const previewDrafts = process.argv.includes("--drafts");
fs.rmSync(path.join(root, ".insights-build"), { recursive: true, force: true });
const result = spawnSync(process.execPath, [eleventyCommand, "--config=eleventy.config.cjs"], {
  cwd: root,
  env: {
    ...process.env,
    INSIGHTS_DRAFTS: previewDrafts ? "true" : "false",
  },
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

if (result.status !== 0) {
  process.exit(result.status || 1);
}
