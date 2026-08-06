# The Insight Desk preview

The Insights source lives in `content/insights/`. All supplied posts remain `draft: true` and production builds intentionally exclude their pages, cards, and links.

To review drafts locally, run:

```powershell
npm.cmd run preview:insights
```

Then open `http://localhost:8080/insights/`. This command builds the draft-only preview into `.insights-build/` and serves it alongside the existing local site.

For the production-safe Insights build without drafts, run:

```powershell
npm.cmd run build:insights
```

The normal `npm.cmd run build` command also runs the production-safe Insights build and copies only `/insights/` (with its empty-state index while all posts are drafts) into `dist/`.
