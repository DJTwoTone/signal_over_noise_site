const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const insightsDirectory = path.join(root, "content", "insights");
const posts = fs.readdirSync(insightsDirectory)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const source = fs.readFileSync(path.join(insightsDirectory, file), "utf8");
    const slug = source.match(/^slug:\s*"?([^"\r\n]+)"?/m)?.[1];
    const date = source.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
    const draft = /^draft:\s*true\s*$/m.test(source);
    return { slug, date, draft };
  })
  .filter((post) => post.slug && post.date && !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

const expectedUrls = posts.slice(0, 2).map((post) => `/insights/${post.slug}/`);
const homepage = fs.readFileSync(path.join(root, "dist", "index.html"), "utf8");
const homepageUrls = [...homepage.matchAll(/class="insight-card__image" href="([^"\s]+)"/g)]
  .map((match) => match[1]);

assert.deepEqual(homepageUrls, expectedUrls, "the built homepage shows the two newest published Insight Desk posts");
assert.equal(homepage.includes("HOMEPAGE_INSIGHTS"), false, "the built homepage does not retain the insertion marker");

console.log("Built homepage Insight Desk ordering check passed.");
