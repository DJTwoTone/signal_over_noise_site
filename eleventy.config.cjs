const path = require("node:path");
const seriesManifest = require("./content/_data/seriesManifest");

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
  eleventyConfig.addFilter("monthDay", (value) => {
    if (!value) {
      return "";
    }

    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      timeZone: "UTC",
    }).format(new Date(value));
  });
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("isoDate", (value) => new Date(value).toISOString());
  eleventyConfig.addFilter("stripLeadingHeading", (html) => html.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, ""));

  const escapeHtml = (value) => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

  const formatMonthDay = (value) => new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(value));

  const renderSeriesNav = (seriesSlug, currentSlug, variant, collectionItems) => {
    const series = seriesManifest[seriesSlug];

    if (!series) {
      return "";
    }

    const publishedBySlug = new Map((collectionItems || []).map((item) => [item.data.slug, item.url]));
    const currentPart = series.parts.find((part) => part.slug === currentSlug);

    if (!currentPart) {
      return "";
    }

    const parts = series.parts.map((part) => {
      const publishedUrl = publishedBySlug.get(part.slug);
      return {
        ...part,
        isCurrent: part.slug === currentSlug,
        isPublished: Boolean(publishedUrl),
        url: publishedUrl,
        comingLabel: `Coming ${formatMonthDay(part.date)}`,
      };
    });

    if (variant === "top") {
      const items = parts.map((part) => {
        const title = escapeHtml(part.title);
        const partLabel = escapeHtml(`Part ${part.part}`);

        if (part.isCurrent) {
          return `
            <li class="series-nav__item series-nav__item--current" aria-current="page">
              <span class="series-nav__part">${partLabel}</span>
              <strong class="series-nav__title">${title}</strong>
              <span class="series-nav__status">You are here</span>
            </li>
          `;
        }

        if (part.isPublished) {
          return `
            <li class="series-nav__item">
              <a class="series-nav__link" href="${escapeHtml(part.url)}" title="${title}">
                <span class="series-nav__part">${partLabel}</span>
                <strong class="series-nav__title">${title}</strong>
                <span class="series-nav__status series-nav__status--live">Read now</span>
              </a>
            </li>
          `;
        }

        return `
          <li class="series-nav__item series-nav__item--upcoming">
            <span class="series-nav__part">${partLabel}</span>
            <strong class="series-nav__title">${title}</strong>
            <span class="series-nav__status">${escapeHtml(part.comingLabel)}</span>
          </li>
        `;
      }).join("");

      return `
        <nav class="series-nav series-nav--top" aria-label="${escapeHtml(series.name)} series navigation">
          <div class="series-nav__header">
            <p class="eyebrow eyebrow--gold-deep">Series</p>
            <h2 class="series-nav__series-title">${escapeHtml(series.name)}</h2>
            <p class="series-nav__position">Part ${currentPart.part} of ${series.totalParts}</p>
          </div>
          <ol class="series-nav__list">
            ${items}
          </ol>
        </nav>
      `;
    }

    const previousPart = parts[currentPart.part - 2] || null;
    const nextPart = parts[currentPart.part] || null;

    const renderCompactItem = (label, part, direction) => {
      if (!part) {
        return `
          <div class="series-nav__compact-item series-nav__compact-item--${direction} series-nav__compact-item--empty">
            <span class="series-nav__compact-label">${escapeHtml(label)}</span>
            <span class="series-nav__compact-title">None</span>
          </div>
        `;
      }

      const status = part.isCurrent
        ? "You are here"
        : part.isPublished
          ? "Read now"
          : part.comingLabel;

      if (part.isPublished) {
        return `
          <a class="series-nav__compact-item series-nav__compact-item--${direction}" href="${escapeHtml(part.url)}">
            <span class="series-nav__compact-label">${escapeHtml(label)}</span>
            <strong class="series-nav__compact-title">${escapeHtml(part.title)}</strong>
            <span class="series-nav__compact-status">${escapeHtml(status)}</span>
          </a>
        `;
      }

      return `
        <div class="series-nav__compact-item series-nav__compact-item--${direction} series-nav__compact-item--upcoming">
          <span class="series-nav__compact-label">${escapeHtml(label)}</span>
          <strong class="series-nav__compact-title">${escapeHtml(part.title)}</strong>
          <span class="series-nav__compact-status">${escapeHtml(status)}</span>
        </div>
      `;
    };

    return `
      <nav class="series-nav series-nav--compact" aria-label="${escapeHtml(series.name)} previous and next parts">
        ${renderCompactItem("Previous", previousPart, "prev")}
        ${renderCompactItem("Next", nextPart, "next")}
      </nav>
    `;
  };

  eleventyConfig.addFilter("injectSeriesNav", (html, seriesSlug, currentSlug, collectionItems) => {
    if (!html) {
      return html;
    }

    return html
      .replace("<!-- SERIES_NAV: Render the five-part series navigator here from central series data. Do not hard-code links in this Markdown. -->", renderSeriesNav(seriesSlug, currentSlug, "top", collectionItems))
      .replace("<!-- SERIES_PREV_NEXT: Render Previous / Next navigation here from central series data. Future parts must show as upcoming, not dead links. -->", renderSeriesNav(seriesSlug, currentSlug, "bottom", collectionItems));
  });

  eleventyConfig.addNunjucksShortcode("seriesNav", (seriesSlug, currentSlug, variant, collectionItems) => renderSeriesNav(seriesSlug, currentSlug, variant, collectionItems));

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
