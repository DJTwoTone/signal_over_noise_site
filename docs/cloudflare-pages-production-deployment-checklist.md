# Cloudflare Pages Production Deployment Checklist

## Deployment status
- [ ] Latest launch-cleanup changes are committed.
- [ ] Latest launch-cleanup changes are pushed to GitHub.
- [ ] Production branch is confirmed as `main`.
- [ ] Local QA reports are saved in `docs/`.
- [ ] Tally-controlled Diagnostic form intro and confirmation copy have been updated manually.
- [ ] Privacy provider wording has been reviewed for the final hosting and analytics setup.

## Confirmed repo settings
- Site type: static HTML/CSS/JS.
- Build system: none found.
- Package manifest: none found.
- Cloudflare config: no Wrangler config found.
- Local preview command: `node _server.js`.
- Local preview URL: `http://localhost:8080/`.
- Local JavaScript entry: `assets/site.js`.
- Production redirect file: `_redirects`.

## Cloudflare Pages build settings
Use these settings when creating the Cloudflare Pages project:

| Setting | Value |
|---|---|
| Framework preset | `None` |
| Production branch | `main` |
| Root directory | Repo root / blank |
| Build command | `exit 0` |
| Build output directory | `/`; if Cloudflare rejects it, use `.` |

References:
- Cloudflare Pages redirects: https://developers.cloudflare.com/pages/configuration/redirects/
- Static HTML deployment: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- Build configuration: https://developers.cloudflare.com/pages/configuration/build-configuration/

## Cloudflare Pages project setup
1. Open Cloudflare Dashboard.
2. Go to Workers & Pages.
3. Select Create application.
4. Choose Pages.
5. Connect to Git.
6. Select the GitHub repo `DJTwoTone/signal_over_noise_site`.
7. Select production branch `main`.
8. Apply the build settings above.
9. Deploy.

Do not add a manual analytics script before the first deploy.

## Custom domain plan
- Primary domain: `https://signal-over-noise.coach`
- Canonical behavior: redirect `www.signal-over-noise.coach` to `signal-over-noise.coach`.
- Add the apex domain first, then configure `www` as a redirect or secondary custom domain according to Cloudflare's current domain setup flow.

## Production QA
Run production QA against `https://signal-over-noise.coach` after deployment.

### Routes
- [ ] `/` loads.
- [ ] `/services/` loads.
- [ ] `/process/` loads.
- [ ] `/proof/` loads.
- [ ] `/workshops/` loads.
- [ ] `/diagnostic/` loads.
- [ ] `/scan/` loads.
- [ ] `/thanks/` loads.
- [ ] `/get-started/` loads.
- [ ] `/contact/` loads.
- [ ] `/privacy/` loads.
- [ ] `/packages` returns `301` to `/services/`.
- [ ] `/packages/` returns `301` to `/services/`.

### Forms
- [ ] Diagnostic Tally form renders on `/diagnostic/`.
- [ ] Toolkit Tally form renders on `/scan/`.
- [ ] Paid Support Tally form renders on `/get-started/`.
- [ ] Workshop Inquiry Tally form renders on `/contact/`.
- [ ] Submit one final dummy test per form.
- [ ] Hidden context fields capture production URL context.
- [ ] Tally confirmations show the final approved public wording.

Dummy test marker:

```txt
Name: Ben Production QA Test
Email: ben@signal-over-noise.coach
Notes: Final production QA test. Please ignore/delete.
```

### Email and notifications
- [ ] `hello@signal-over-noise.coach` receives expected notifications.
- [ ] `privacy@signal-over-noise.coach` works for privacy requests.
- [ ] Diagnostic notifications route correctly.
- [ ] Workshop Inquiry notifications route correctly.

### Browser checks
- [ ] Header links work.
- [ ] Footer links work.
- [ ] Primary CTAs resolve to the intended routes.
- [ ] Mobile layout works on a narrow viewport.
- [ ] No obvious production console errors.
- [ ] No broken local images, PDFs, CSS, or JavaScript assets.

## Cloudflare Web Analytics
Enable this only after the Cloudflare Pages project is live:

1. Open the Cloudflare Pages project.
2. Go to Metrics.
3. Open Web Analytics.
4. Enable Web Analytics.
5. Redeploy if Cloudflare requires it.

After analytics is enabled, update `/privacy/` from cautious wording to specific Cloudflare Web Analytics wording:

```txt
We use Cloudflare Web Analytics to understand basic site usage and performance. Cloudflare Web Analytics does not use cookies or localStorage and does not identify individual visitors.
```

Reference:
- Cloudflare Web Analytics setup: https://developers.cloudflare.com/web-analytics/get-started/

## Production closeout
Fill this in after production QA passes.

### Status
Production deployed.

### Domain
- Primary:
- WWW behavior:

### Forms
- Diagnostic:
- Toolkit:
- Paid Support:
- Workshop Inquiry:

### Email
- `hello@`:
- `privacy@`:
- Diagnostic notifications:
- Workshop notifications:

### Analytics
- Cloudflare Web Analytics:
- Privacy page updated:

### Remaining
- [ ] Delete or archive dummy Tally submissions.
- [ ] Optional design polish pass.
- [ ] Optional legal review later.
