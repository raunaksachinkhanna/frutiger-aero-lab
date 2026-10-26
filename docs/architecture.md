# Architecture

This is a monorepo. `apps/lab-site` is the original placeholder/portfolio
page; `apps/extension` and `apps/demo-site` are AeroReddit, the first
chosen product direction; `apps/firefox-theme` is AeroFox, a Firefox
native browser theme (see `roadmap.md`).

## Monorepo layout

```
apps/
  lab-site/       The Frutiger Aero Lab landing page (Phase 0 placeholder)
  extension/      AeroReddit: MV3 Chrome extension (content script, popup, options)
  demo-site/      AeroReddit: interactive public showcase (fictional sample content)
  firefox-theme/  AeroFox: Firefox native browser theme add-on (theme.update() API)
packages/
  aero-theme/    Shared theme tokens/CSS (Vista Glass, Frutiger Eco, Dark Aero)
                 and the AeroSettings schema, consumed by extension + demo-site
docs/            Project documentation (this folder)
.github/         Issue templates and the Pages deploy workflow
```

Managed as npm workspaces (`workspaces: ["apps/*", "packages/*"]` in the
root `package.json`). Each app has its own `package.json`, `tsconfig`,
and (where relevant) Vite config; `packages/aero-theme` ships no build
step — it's consumed directly as TypeScript/CSS source, resolved through
npm's workspace symlinking.

## Stack

- **React 19 + TypeScript** (strict) across all three apps.
- **Vite** for dev/build in `lab-site` and `demo-site`; a hand-rolled
  two-pass Vite build in `extension` (see below — content scripts need a
  different output format than regular pages).
- **ESLint** (flat config) + **Prettier**, shared at the repo root.
- **Vitest + React Testing Library** per app.

No backend, no paid services, no telemetry anywhere in this repo.

## Why AeroReddit is built this way

### Shared theme package, not copy-pasted CSS

`packages/aero-theme/src/tokens.ts` defines the `AeroSettings` schema
(with `sanitizeSettings`/`isValidSettings` — never trust storage or an
imported JSON file wholesale) and theme metadata. `packages/aero-theme/src/themes/*.css`
define each theme as CSS custom properties scoped under
`[data-aero-theme="…"]`. Both the extension and the demo site import the
same files, so a theme only needs to be defined once.

### The extension's two-pass build

MV3 content scripts can't reliably use ES module imports across Chromium
versions, so `apps/extension` builds in two passes:

1. `vite.config.ts` — a normal multi-page build for `popup.html` and
   `options.html` (regular extension pages, ES modules are fine).
2. `vite.config.content.ts` — a Vite **library** build of
   `src/content/main.ts` in `iife` format, producing a single
   `content.js`. Theme CSS is pulled in via `?inline` imports and
   injected as a `<style>` tag at runtime, so there's no separate
   stylesheet to wire up in the manifest.

This avoids depending on a third-party MV3/Vite plugin (several exist,
but compatibility with newer Vite versions is inconsistent) in favor of
plain Vite features.

### Reddit theming: honest, verified-reachable scope

See `docs/extension-reddit-notes.md` for the full explanation. In short:
old.reddit.com is plain HTML and gets full theming; www.reddit.com's UI
lives mostly inside Shadow DOM web components that an external stylesheet
cannot reach, so it gets page-level atmosphere only. This is documented
rather than papered over.

### Settings: `chrome.storage`, not `localStorage`

`apps/extension/src/shared/storage.ts` reads/writes `chrome.storage.sync`
with a `chrome.storage.local` fallback (sync has small quota/rate limits
and can be disabled by enterprise policy). The content script subscribes
via `chrome.storage.onChanged`, so changing a theme in the popup updates
an already-open Reddit tab without a reload.

### Animations: CSS, not a render loop

The bubble effect (both in the extension and the demo site) is a handful
of elements with `animation: … infinite` — no `requestAnimationFrame`
loop to manage, pause, or leak. `pointer-events: none` throughout so it
can never intercept a click meant for the underlying page.
`prefers-reduced-motion: reduce` removes it entirely.

### AeroFox: a different mechanism, same shared palette

`apps/firefox-theme` doesn't inject CSS into page content at all — it
uses Firefox's native `browser.theme.update()` API to recolor the
browser's own chrome (toolbar, tabs, frame, popups). It has no build
step (plain `background.js`/`popup.js`, linted and packaged with
Mozilla's own `web-ext` CLI) and doesn't depend on `packages/aero-theme`
directly, since the theme API takes solid colors, not CSS custom
properties or gradients — `apps/firefox-theme/colors.js` hand-picks
solid-color approximations of the same three palettes instead. See
`docs/firefox-theme-notes.md` for the full rationale and what's still
unverified.

## Deployment

`.github/workflows/deploy.yml` builds all workspaces, then assembles a
combined static site: `lab-site`'s build at the root, `demo-site`'s build
under `/aeroreddit/`. Both apps set their Vite `base` accordingly
(`/frutiger-aero-lab/` and `/frutiger-aero-lab/aeroreddit/` respectively
for production builds, `/` for local dev). The extension is **not**
deployed anywhere — it's distributed as source, built locally, and
sideloaded (see `apps/extension/README.md` or the demo site's install
section).

There is no separate lint/test CI workflow by maintainer request — checks
are run locally (`npm run typecheck && npm run lint && npm run test &&
npm run build` at the repo root) before pushing.
