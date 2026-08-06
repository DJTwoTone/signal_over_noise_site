const path = require("node:path");

const showDrafts = process.env.INSIGHTS_DRAFTS === "true";

module.exports = function configureInsights(eleventyConfig) {
  eleventyConfig.addGlobalData("insightsPreview", showDrafts);
  eleventyConfig.addFilter("readableDate", (value) => {
    if (!value) {
      return "";
    }

    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(value));
  });
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("isoDate", (value) => new Date(value).toISOString());
  eleventyConfig.addFilter("stripLeadingHeading", (html) => html.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, ""));

  eleventyConfig.addCollection("insights", (collectionApi) => (
    collectionApi
      .getFilteredByGlob("content/insights/*.md")
      .filter((item) => showDrafts || !item.data.draft)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
  ));

  return {
    dir: {
      input: "content",
      includes: "_includes",
      layouts: "_includes/layouts",
      output: ".insights-build",
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
