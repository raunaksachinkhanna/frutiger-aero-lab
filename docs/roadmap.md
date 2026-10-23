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
- [x] Choose a first product direction: AeroReddit, a Frutiger Aero
      browser extension for Reddit (maintainer decision, 2026-10-24 — see
      `research.md`; not the result of documented community feedback).

## Phase 1 — AeroReddit MVP (current)

- [x] Restructure as an npm-workspaces monorepo: `packages/aero-theme`
      (shared tokens for Vista Glass, Frutiger Eco, Dark Aero) consumed by
      both the extension and the demo site.
- [x] MV3 extension foundation: content script, popup, options page.
- [x] Vista Glass theme fully implemented for old.reddit.com (plain
      light-DOM HTML, so the whole page is genuinely restylable).
- [x] www.reddit.com gets page-level atmosphere only — full theming is
      blocked by Shadow DOM; see `extension-reddit-notes.md`.
- [x] Theme engine: 3 themes, `chrome.storage` persistence with live
      updates, accent-color override, glass opacity/blur sliders, card
      density, reset to defaults.
- [x] Lightweight animation system: CSS-only bubble overlay, Off/Low/
      Medium/High setting, `prefers-reduced-motion` respected, no
      requestAnimationFrame loop.
- [x] Interactive demo website: fictional sample content (clearly not
      real Reddit data), live theme switching, before/after slider,
      "how it works" section, install instructions.
- [ ] Sideload-test the built extension against live Reddit. **Not done**
      — reddit.com was unreachable from the dev sandbox used to build
      this; needs manual verification. See `PROGRESS.md`.
- [ ] Firefox support — deferred, not started.
- [ ] Theme export/import as JSON — deferred, not started.

## Phase 2 — Polish & validation

- [ ] Manually verify the extension on live old.reddit.com and
      www.reddit.com; fix anything that doesn't match this doc's claims.
- [ ] Gather feedback on AeroReddit from the Frutiger Aero community.
- [ ] Add extension icons (currently using Chrome's default).
- [ ] Expand test coverage if real usage surfaces gaps.

## Phase 3 — Release

- [ ] Decide whether/how to publish to the Chrome Web Store (not done
      without explicit maintainer approval).
- [ ] Tag a release; document an ongoing maintenance model.

---

_Status key: `[x]` done and verified where stated, `[ ]` not started or
not yet verified. This file is updated as work progresses._
