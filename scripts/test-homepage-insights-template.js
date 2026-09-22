const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const nunjucks = require("nunjucks");

const template = fs.readFileSync(path.join(__dirname, "..", "content", "homepage-insights.njk"), "utf8")
  .replace(/^---[\s\S]*?---\s*/, "");
const environment = new nunjucks.Environment();
environment.addFilter("isoDate", (date) => date.toISOString());
environment.addFilter("readableDate", (date) => date.toLocaleDateString("en", { timeZone: "UTC" }));

const empty = environment.renderString(template, { collections: { insights: [] } });
assert.match(empty, /insight-card-grid/);
assert.doesNotMatch(empty, /<article/);

const onePost = environment.renderString(template, {
  collections: {
    insights: [{
      url: "/insights/one-post/",
      data: {
        title: "One post",
        category: "Category",
        description: "Description",
        date: new Date("2026-09-22T00:00:00Z"),
        ogImage: { src: "/image.webp", alt: "Image description" },
      },
    }],
  },
});
assert.equal((onePost.match(/<article/g) || []).length, 1);
assert.match(onePost, /\/insights\/one-post\//);

console.log("Homepage Insight Desk empty and one-post rendering checks passed.");
