# AeroReddit / AeroFox — Progress

Last updated: 2026-10-26. This file is the source of truth for what's
actually done vs. claimed-but-unverified — kept accurate so work can
resume from here without re-deriving context.

## What's done (built and verified by local tooling)

- **Monorepo restructure**: npm workspaces (`apps/lab-site`,
  `apps/extension`, `apps/demo-site`, `packages/aero-theme`). All
  existing `lab-site` functionality preserved and re-verified after the
  move (`typecheck`/`build` pass).
- **`packages/aero-theme`**: `AeroSettings` schema with `sanitizeSettings`/
  `isValidSettings` (7 unit tests, passing), 3 theme CSS files (Vista
  Glass, Frutiger Eco, Dark Aero) as `[data-aero-theme]`-scoped custom
  properties.
- **Extension (`apps/extension`)**: MV3 manifest, two-pass Vite build
  (popup/options as ES modules, content script as IIFE), builds clean.
  - Content script (`src/content/main.ts`): detects old vs. new Reddit,
    injects theme CSS, reads/writes `chrome.storage` with live-update
    listener.
  - **old.reddit.com**: full Vista-Glass-style theming (`old-reddit.css`)
    — header, post cards, vote arrows, sidebar, comments, inputs,
    buttons, scrollbar. Uses old Reddit's long-stable class names
    (`.thing`, `.midcol`, `#header`, etc.).
  - **www.reddit.com**: page-level atmosphere only (`new-reddit.css`) —
    background gradient + scrollbar. Deliberately does not guess at
    shreddit's Shadow DOM internals. See `docs/extension-reddit-notes.md`.
  - Settings UI (`SettingsPanel.tsx`, shared by popup + options): theme
    picker, animation level, bubbles toggle, glass opacity/blur sliders,
    accent-color override, card density, reset-to-defaults.
  - Animation: CSS-only bubble overlay (`effects.ts`), respects
    `prefers-reduced-motion`, `pointer-events: none`.
- **Demo site (`apps/demo-site`)**: hero, live theme switcher, an
  interactive fictional Reddit-feed mock (`RedditMock`) with sample posts
  and comments (`src/data/samplePosts.ts` — entirely invented, clearly
  not real Reddit data), a before/after drag-slider comparison, a "how it
  works" section (states the Shadow DOM limitation honestly), install
  instructions. 3 component tests, passing. Builds clean.
- **Deploy workflow**: `.github/workflows/deploy.yml` builds all
  workspaces and assembles `lab-site` (root) + `demo-site`
  (`/aeroreddit/`) into one Pages artifact. **Pushed and verified**: the
  first run failed in CI (`npm ci` on Linux hit a known npm
  optional-dependencies lockfile bug, npm/cli#4828 — the committed
  lockfile was missing Linux-x64 native bindings for Vite 8's bundler);
  regenerating `package-lock.json` fixed it. Both URLs confirmed live via
  `curl` (HTTP 200):
  - https://raunaksachinkhanna.github.io/frutiger-aero-lab/
  - https://raunaksachinkhanna.github.io/frutiger-aero-lab/aeroreddit/
- **Theme export/import**: `exportSettingsJson`/`importSettingsJson` in
  `packages/aero-theme/src/tokens.ts` — JSON only, `JSON.parse` never
  `eval`, always routed through `sanitizeSettings` so a hand-edited or
  malicious file can't set anything outside the known schema. 5 new
  tests (round-trip, invalid JSON, tampered values, prototype-pollution
  attempt). Wired into the options page as a "Backup" section (Export /
  Import buttons).
- **Docs**: `docs/architecture.md`, `docs/roadmap.md`, `docs/research.md`
  updated; `docs/extension-reddit-notes.md` added (the Shadow DOM
  explanation + how to verify/extend selectors); root `README.md` and
  `apps/extension/README.md` updated.
- **AeroFox (`apps/firefox-theme`)**: a real Firefox browser theme add-on
  using `browser.theme.update()` — not a port of AeroReddit's
  content-script approach, see `docs/firefox-theme-notes.md`. Live
  popup theme switcher, `browser.storage.local` persistence, 3 palettes
  as solid-color approximations of the shared Aero themes
  (`colors.js`). 3 zero-dependency `node:test` tests, passing.
  `web-ext lint` clean (0 errors/notices/warnings). Not yet loaded into
  a real Firefox — see Known limitations.
- **Extension icons (Chrome + Firefox)**: a hand-authored glossy glass
  orb SVG (orange for AeroReddit, blue for AeroFox), rendered via macOS
  `qlmanage`+`sips` (no bundled image-encoding dependency needed) to
  16/32/48/128px PNGs, wired into both manifests' `icons` and
  `action.default_icon`. Verified the Chrome build actually copies them
  into `dist/icons/`.
- **Demo-site Aero polish gap closed**: the light-streak/droplet/glow
  tokens added to `packages/aero-theme` and `old-reddit.css` were not
  previously applied anywhere in `apps/demo-site` — fixed across
  `Hero.css`, `RedditMock.css` (including a hover-sliding light streak
  on post cards, mirroring `old-reddit.css`'s `.thing::before`),
  `ThemeSwitcher.css`, and `Sections.css`. Verified visually via the
  built-in browser pane against the local dev server (screenshots
  confirmed the glossy droplet highlight and sweeping streak render
  correctly).

## Commands run and results (all passing as of this commit)

```
npm run typecheck -w lab-site              → clean
npm run typecheck -w aeroreddit-extension  → clean
npm run typecheck -w aeroreddit-demo       → clean
npm run test -w aero-theme                 → 7/7 passing
npm run test -w aeroreddit-demo            → 3/3 passing
npm run build -w lab-site                  → succeeds
npm run build -w aeroreddit-extension      → succeeds (popup/options + content.js)
npm run build -w aeroreddit-demo           → succeeds
npm run lint (repo root)                   → clean
npm run format:check (repo root)           → clean
```

## Known limitations (stated honestly, not hidden)

1. **No live Reddit testing — now confirmed architecturally impossible
   for any browser-automation tool, not just a transient blocker.** The
   built-in browser pane recovered this session (confirmed by
   screenshotting the demo site), but sideloading an unpacked extension
   requires `chrome://extensions` (internal browser pages are refused by
   the pane — confirmed by direct attempt) plus a native OS file-picker
   dialog to select the unpacked `dist/` folder, which no browser-
   automation tool (built-in pane or Claude-in-Chrome) can drive. This
   isn't a retry-fixable availability issue — it needs a human at a real
   Chrome profile. All Reddit-targeting CSS is based on well-known,
   publicly documented facts about Reddit's markup (old Reddit's stable
   class names; new Reddit's shreddit/Shadow-DOM architecture), **not**
   on live inspection. This remains the single most important open item
   — see `docs/extension-reddit-notes.md` for the 5-minute manual check
   the maintainer needs to do.
2. ~~No visual screenshot of the demo site.~~ **Resolved 2026-10-26**:
   the built-in browser pane recovered and was used to screenshot the
   local dev server after the gloss/streak/droplet polish pass — see
   the demo-site entry above.
3. **AeroFox built but not loaded into real Firefox.** `web-ext lint`
   and the unit tests pass, and `web-ext build` produces a valid zip,
   but `web-ext run` (which actually launches Firefox with the add-on
   loaded) needs a Firefox binary that wasn't available in this sandbox.
   See `docs/firefox-theme-notes.md` for the exact verification steps.
4. **No CI lint/test workflow**: skipped per explicit maintainer
   instruction (local checks only).
5. **No Playwright / E2E tests**: only Vitest unit/component tests exist.
   Given (1), E2E tests against fixture HTML would test fixtures, not
   reality, so this was deprioritized in favor of being honest about (1)
   rather than producing tests that look more thorough than they are.

## Next steps, in priority order

1. **Maintainer: sideload-test AeroReddit on real Reddit**
   (`docs/extension-reddit-notes.md`) and **AeroFox in real Firefox**
   (`docs/firefox-theme-notes.md`) — both need a human at a real
   browser profile; confirmed not automatable from this sandbox (see
   Known limitations above).
2. Gather community feedback on both (the original Phase-1 goal, still
   open).
3. Decide on store submission (Chrome Web Store / Firefox AMO / Edge
   Add-ons) — maintainer's own action, not started without explicit
   approval.
4. Everything else in `docs/roadmap.md` Phase 2/3.

## How to resume if this session is interrupted

Everything above is committed locally (or will be by the time this file
is read as part of a commit). `git log --oneline` shows the milestone
commits. Nothing described as "done" here depends on uncommitted state.
