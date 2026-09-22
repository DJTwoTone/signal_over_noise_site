const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { spawn } = require("node:child_process");

const assetPath = path.join(__dirname, "..", "assets", "images", "insights", "ai-presentation-decision-visible", "og.webp");
const expected = fs.readFileSync(assetPath);
const port = 10000 + Math.floor(Math.random() * 50000);
const server = spawn(process.execPath, ["_server.js"], {
  cwd: path.join(__dirname, ".."),
  env: { ...process.env, PORT: String(port) },
  stdio: ["ignore", "pipe", "pipe"],
});

server.stdout.on("data", (output) => {
  if (!output.toString().includes(`:${port}`)) {
    return;
  }

  http.get(`http://localhost:${port}/assets/images/insights/ai-presentation-decision-visible/og.webp`, (response) => {
    const chunks = [];
    response.on("data", (chunk) => chunks.push(chunk));
    response.on("end", () => {
      try {
        const actual = Buffer.concat(chunks);
        assert.equal(response.statusCode, 200);
        assert.equal(response.headers["content-type"], "image/webp");
        assert.deepEqual(actual, expected, "the preview server returns WebP files without text re-encoding");
        console.log("Preview asset integrity check passed.");
      } finally {
        server.kill();
      }
    });
  });
});

server.on("error", (error) => { throw error; });
server.stderr.on("data", (output) => { throw new Error(output.toString()); });
