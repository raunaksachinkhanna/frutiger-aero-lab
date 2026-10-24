# AeroReddit — Progress

Last updated: 2026-10-24. This file is the source of truth for what's
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

1. **No live Reddit testing — actively attempted twice, both blocked by
   tooling, not skipped.** First attempt: `reddit.com`/`old.reddit.com`
   were unreachable (navigation denied) from this session's built-in
   browser pane while writing the CSS. Second attempt (this session,
   later): tried again via the built-in pane (still denied/unavailable —
   `tabs_create` and `navigate` both failed) and via Claude-in-Chrome
   (the Chrome extension reported "not connected"). Neither is something
   retrying fixes — both are environment/connection issues outside this
   session's control. All Reddit-targeting CSS is based on well-known,
   publicly documented facts about Reddit's markup (old Reddit's stable
   class names; new Reddit's shreddit/Shadow-DOM architecture), **not**
   on live inspection. The extension has never been sideloaded into a
   real Chrome profile and pointed at Reddit. This remains the single
   most important open item — see `docs/extension-reddit-notes.md` for
   exactly how to verify it yourself (it's a 5-minute manual check).
2. **No visual screenshot of the demo site.** Same tooling blockage as
   above — attempted against both localhost and the live Pages URL, in
   both the built-in pane and Claude-in-Chrome, across two separate
   attempts in this session. The demo site's correctness rests on
   passing typecheck/tests/build (and a working CI deploy), not a visual
   check. Run `npm run dev -w aeroreddit-demo` and open it yourself, or
   visit the live URL.
3. **Firefox support**: not started — explicitly deferred by the
   maintainer's own priority order.
4. **No CI lint/test workflow**: skipped per explicit maintainer
   instruction (local checks only).
5. **No extension icons**: the manifest has no `icons` field, so Chrome
   shows a default puzzle-piece icon. Generating real PNGs needs either a
   browser (unavailable) or a native image-encoding dependency, which
   isn't worth adding for a cosmetic default-icon fallback. Deferred.
6. **No Playwright / E2E tests**: only Vitest unit/component tests exist.
   Given (1), E2E tests against fixture HTML would test fixtures, not
   reality, so this was deprioritized in favor of being honest about (1)
   rather than producing tests that look more thorough than they are.

## Next steps, in priority order

1. **Sideload-test on real Reddit** (see `docs/extension-reddit-notes.md`
   step-by-step) — the highest-value remaining task, and the one this
   session could not complete due to browser-tool unavailability (see
   Known limitations above). This needs either a working browser tool in
   a future session, or the maintainer doing the 5-minute manual check.
2. Take a real screenshot/recording of the live demo site for the README
   — same blocker.
3. Gather community feedback (the original Phase-1 goal, still open).
4. Everything else in `docs/roadmap.md` Phase 2/3 (icons, Firefox).

## How to resume if this session is interrupted

Everything above is committed locally (or will be by the time this file
is read as part of a commit). `git log --oneline` shows the milestone
commits. Nothing described as "done" here depends on uncommitted state.
