# AeroFox — Progress

Last updated: 2026-10-26. This file is the source of truth for what's
actually done vs. claimed-but-unverified — kept accurate so work can
resume from here without re-deriving context.

**AeroReddit was cancelled on 2026-10-26** (maintainer decision — dropped
entirely, not just deprioritized). `apps/extension`, `apps/demo-site`, and
the shared `packages/aero-theme` package were removed from the repo.
AeroFox is now the project's sole product; this file no longer tracks
AeroReddit's history. (The old history remains in `git log` if ever
needed.)

## What's done (built and verified by local tooling)

- **AeroFox (`apps/firefox-theme`)**: a real Firefox browser theme add-on
  using `browser.theme.update()` — see `docs/firefox-theme-notes.md` for
  the architecture. `manifest.json`, `background.js` (applies the theme
  on startup and on storage change), `popup.html`/`.js`/`.css` (live
  theme switcher), `colors.js` (5 palettes — Vista Glass, Frutiger Eco,
  Dark Aero, Royale Noir, Media Center — as solid-color approximations
  plus a `theme.images.theme_frame` glossy/glow PNG per theme).
- **Feature expansion (GitHub milestone #1, all 5 issues closed)**:
  - Theme header images (`theme.images.theme_frame`, real texture layered
    over the solid colors).
  - 2 new palettes: Royale Noir, Media Center.
  - An "Auto" theme option, resolved from `prefers-color-scheme` via a
    pure, unit-tested `resolveAutoThemeId()`.
  - Cross-device sync: `storage.js` prefers `browser.storage.sync`,
    falls back to `.local` when sync throws or has no value, migrates a
    found local value into sync, writes to both.
  - A New Tab page override (`apps/firefox-theme/newtab/`) — minimal
    Aero-glass card + CSS bubble field (`prefers-reduced-motion`
    disables them), reads the live theme choice, visually verified
    locally over a plain static HTTP server (not inside real Firefox).
- **Tests**: 12 zero-dependency `node:test` tests across
  `colors.test.mjs` (color-map completeness, display metadata, default
  theme validity, auto-theme resolution) and `storage.test.mjs`
  (sync-preferred/local-fallback/sync-throws/nothing-stored, for both
  reads and writes, against a mock `browser` global) — 12/12 passing.
- **Lint**: `web-ext lint` clean — 0 errors, 0 notices, 0 warnings.
- **Icons**: a hand-authored glossy glass-orb SVG (blue), rendered via
  macOS `qlmanage`+`sips` (no bundled image-encoding dependency needed)
  to 16/32/48/128px PNGs, wired into `manifest.json`'s `icons` and
  `action.default_icon`.
- **Lab site (`apps/lab-site`)**: landing page updated to describe AeroFox
  instead of the cancelled AeroReddit; builds and tests clean.
- **Deploy workflow**: `.github/workflows/deploy.yml` now builds and
  deploys only `apps/lab-site` to GitHub Pages (previously also
  assembled a `/aeroreddit/` demo-site path, now removed since that app
  no longer exists).
- **Docs**: `README.md`, `docs/architecture.md`, `docs/roadmap.md`,
  `docs/research.md` rewritten for AeroFox-only scope;
  `docs/extension-reddit-notes.md` removed (AeroReddit-specific);
  `docs/firefox-theme-notes.md` kept and trimmed of AeroReddit
  comparisons.

## Commands run and results (all passing as of this commit)

```
npm run typecheck -w lab-site                 → clean
npm run test -w lab-site                      → passing
npm run test -w aerofox-firefox-theme         → 12/12 passing
npm run build -w lab-site                     → succeeds
npm run build -w aerofox-firefox-theme        → succeeds (web-ext build, zip produced, all images/newtab files bundled — verified via unzip -l)
npm run lint (repo root)                      → clean
npm run format:check (repo root)              → clean
```

## Known limitations (stated honestly, not hidden)

1. **AeroFox built but not loaded into real Firefox.** `web-ext lint` and
   the unit tests pass, and `web-ext build` produces a valid zip, but
   `web-ext run` (which actually launches Firefox with the add-on
   loaded) needs a Firefox binary that wasn't available in this sandbox.
   Also confirmed: this isn't automatable from any available browser
   tool either — loading an unpacked/temporary add-on needs a native OS
   file-picker dialog that no browser-automation tool (built-in pane or
   Claude-in-Chrome) can drive, and Chrome's internal pages (the closest
   Chromium analog, `chrome://extensions`) are refused outright by the
   built-in browser pane. This needs a human at a real Firefox profile.
   See `docs/firefox-theme-notes.md` for the exact verification steps.
2. **No CI lint/test workflow**: skipped per explicit maintainer
   instruction (local checks only).
3. **No E2E tests**: only the zero-dependency `node:test` unit tests
   exist for AeroFox's color-map logic. Given (1), E2E tests against a
   Firefox profile aren't practical to automate from this sandbox
   either.

## Next steps, in priority order

1. **Maintainer: sideload-test AeroFox in real Firefox**
   (`docs/firefox-theme-notes.md`) — needs a human at a real browser
   profile; confirmed not automatable from this sandbox (see Known
   limitations above).
2. Gather community feedback on AeroFox (the original Phase-2 goal,
   still open).
3. Decide on Firefox AMO submission — maintainer's own action, not
   started without explicit approval.
4. Everything else in `docs/roadmap.md` Phase 2/3.

## How to resume if this session is interrupted

Everything above is committed locally (or will be by the time this file
is read as part of a commit). `git log --oneline` shows the milestone
commits. Nothing described as "done" here depends on uncommitted state.
