# Roadmap

This roadmap changes as the project progresses. Checked items are actually
done and verified (or their verification status is noted); nothing here is
a claim about untested behavior.

## Phase 0 — Engineering foundation

- [x] Initialize the repository with a modern, strict React + TypeScript +
      Vite stack.
- [x] Set up linting (ESLint), formatting (Prettier), and testing
      (Vitest + React Testing Library).
- [x] Ship a polished placeholder landing page.
- [x] Set up GitHub Pages deployment.
- [x] Choose a product direction: AeroFox, a real Firefox browser theme
      add-on (maintainer decision, 2026-10-26 — an earlier direction,
      AeroReddit, a Reddit-theming Chrome extension, was built and then
      cancelled; see `research.md`).

## Phase 1 — AeroFox MVP

Built on Firefox's native `browser.theme.update()` API rather than
content-script CSS injection — see `docs/firefox-theme-notes.md` for why.

- [x] `apps/firefox-theme`: manifest, `background.js` (theme API),
      `popup.html`/`.js`/`.css` (live theme switcher), `colors.js` (5
      palettes — Vista Glass, Frutiger Eco, Dark Aero, Royale Noir,
      Media Center — as solid theme colors). Persisted via
      `storage.js` (sync-preferred, local-fallback), applied live via
      `browser.storage.onChanged`.
- [x] Zero-dependency tests (`node:test`): 12/12 passing across
      `colors.test.mjs` and `storage.test.mjs`.
- [x] `web-ext lint` clean: 0 errors, 0 notices, 0 warnings.
- [x] Extension icons: hand-authored glossy glass-orb SVG rendered to
      16/32/48/128px PNGs, wired into `manifest.json` and the action
      popup icon.
- [ ] Load into a real Firefox via `web-ext run` and confirm the chrome
      actually recolors. **Not done** — no Firefox binary in the dev
      sandbox used to build this; confirmed not automatable with any
      available browser tool either (see `PROGRESS.md`). See
      `docs/firefox-theme-notes.md` for the manual verification steps.

## Phase 1.5 — AeroFox Feature Expansion (current)

Tracked as [GitHub milestone #1](https://github.com/raunaksachinkhanna/frutiger-aero-lab/milestone/1).

- [x] Theme header images via `theme.images.theme_frame` — real
      glossy/glow texture per theme, not just flat colors.
- [x] Additional palettes: Royale Noir, Media Center.
- [x] OS-synced "Auto" theme option (light/dark via
      `prefers-color-scheme`).
- [x] Cross-device theme sync (`browser.storage.sync`, with a
      graceful `.local` fallback).
- [x] New Tab page override: a minimal Aero-glass page
      (`apps/firefox-theme/newtab/`), visually verified locally (static
      HTTP server) but not yet inside a real Firefox profile.

## Phase 2 — Polish & validation

- [ ] Manually verify AeroFox — including the new header images, Auto
      theme, sync, and New Tab page — in real Firefox (see Phase 1
      above).
- [ ] Gather feedback on AeroFox from the Frutiger Aero community.
- [ ] Expand test coverage if real usage surfaces gaps.

## Phase 3 — Release

- [ ] Decide whether/how to publish to Firefox AMO (not done without
      explicit maintainer approval).
- [ ] Tag a release; document an ongoing maintenance model.

---

_Status key: `[x]` done and verified where stated, `[ ]` not started or
not yet verified. This file is updated as work progresses._
