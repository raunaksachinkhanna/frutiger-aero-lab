# Architecture

This is a monorepo. `apps/lab-site` is the landing page; `apps/firefox-theme`
is AeroFox, the project's product.

## Monorepo layout

```
apps/
  lab-site/       The Frutiger Aero Lab landing page
  firefox-theme/  AeroFox: Firefox native browser theme add-on (theme.update() API)
docs/             Project documentation (this folder)
.github/          Issue templates and the Pages deploy workflow
```

Managed as npm workspaces (`workspaces: ["apps/*", "packages/*"]` in the
root `package.json`). Each app has its own `package.json` and build setup.

## Stack

- **lab-site**: React 19 + TypeScript (strict), built with Vite, tested
  with Vitest + React Testing Library.
- **firefox-theme (AeroFox)**: plain WebExtension JavaScript — no bundler,
  no framework. Linted and packaged with Mozilla's own `web-ext` CLI.
  Tested with Node's built-in `node:test` runner (zero dependencies).
- **ESLint** (flat config) + **Prettier**, shared at the repo root.

No backend, no paid services, no telemetry anywhere in this repo.

## Why AeroFox is built this way

### Theme API, not content-script CSS injection

AeroFox uses Firefox's native
[`browser.theme.update()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/theme)
API (`apps/firefox-theme/background.js`) to set the browser's own chrome
colors from a `theme.colors` map (`apps/firefox-theme/colors.js`). This is
an officially supported, first-class WebExtension surface — AeroFox never
touches page content, and there's no Shadow DOM or cross-origin CSS
problem to work around, since the browser itself owns and renders its
chrome. See [`docs/firefox-theme-notes.md`](firefox-theme-notes.md) for
the full rationale and what's still unverified.

### Settings: `browser.storage.local`

The selected theme is persisted via `browser.storage.local` and applied
on startup (`background.js`'s `init()`). The popup
(`popup.html`/`.js`/`.css`) writes the new theme id on selection; the
background script listens via `browser.storage.onChanged` and reapplies
immediately, so there's no reload needed.

### No build step, by design

`apps/firefox-theme` ships `background.js`/`popup.js`/`colors.js` as
plain ES modules directly — no bundler, no transpilation. This keeps the
reviewable source identical to the shipped source, which matters for
store review (Firefox AMO reviewers can read the exact files that run)
and keeps the dependency surface to a single dev-only tool (`web-ext`).

## Deployment

`.github/workflows/deploy.yml` builds and deploys `apps/lab-site` to
GitHub Pages. AeroFox is **not** deployed anywhere by this workflow — it's
distributed as source, built locally with `web-ext build`, and
submitted to Firefox AMO (or sideloaded) separately; see
[`apps/firefox-theme/`](../apps/firefox-theme/).

There is no separate lint/test CI workflow by maintainer request — checks
are run locally (`npm run typecheck && npm run lint && npm run test &&
npm run build` at the repo root) before pushing.
