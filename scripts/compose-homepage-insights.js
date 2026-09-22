const fs = require("node:fs");

const marker = "<!-- HOMEPAGE_INSIGHTS -->";

function composeHomepageInsights(homepage, fragment) {
  if (!homepage.includes(marker)) {
    throw new Error("Missing homepage Insight Desk insertion marker.");
  }

  if (!fragment || !fragment.trim()) {
    throw new Error("Missing generated homepage Insight Desk fragment.");
  }

  return homepage.replace(marker, fragment.trim());
}

function composeHomepageInsightsFile(homepagePath, fragmentPath, outputPath = homepagePath) {
  const homepage = fs.readFileSync(homepagePath, "utf8");
  const fragment = fs.readFileSync(fragmentPath, "utf8");
  const composed = composeHomepageInsights(homepage, fragment);
  fs.writeFileSync(outputPath, composed);
}

module.exports = { composeHomepageInsights, composeHomepageInsightsFile };
