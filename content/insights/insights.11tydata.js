module.exports = {
  layout: "insight-post.njk",
  permalink: (data) => {
    if (data.draft && process.env.INSIGHTS_DRAFTS !== "true") {
      return false;
    }

    return `/insights/${data.slug}/`;
  },
};
