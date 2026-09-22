const assert = require("node:assert/strict");
const { composeHomepageInsights } = require("./compose-homepage-insights");

const marker = "<!-- HOMEPAGE_INSIGHTS -->";
const homepage = `<main>${marker}</main>`;
const fragment = "<div class=\"insight-card-grid\"><article>Newest post</article></div>";

assert.equal(
  composeHomepageInsights(homepage, fragment),
  `<main>${fragment}</main>`,
  "the generated Insight cards replace the homepage insertion marker"
);

assert.throws(
  () => composeHomepageInsights("<main></main>", fragment),
  /homepage Insight Desk insertion marker/i,
  "a missing insertion marker fails clearly"
);

assert.throws(
  () => composeHomepageInsights(homepage, ""),
  /generated homepage Insight Desk fragment/i,
  "a missing generated fragment fails clearly"
);

console.log("Homepage Insight Desk composition checks passed.");
