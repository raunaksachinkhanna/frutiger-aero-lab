# Architecture

This describes the Phase 0 engineering foundation — the current placeholder
app, not a finalized product architecture. It will be revisited once a
product direction is chosen (see `roadmap.md`).

## Stack

- **React 19 + TypeScript** — component model with strict type safety.
- **Vite** — dev server and build tooling. Fast HMR, minimal config.
- **ESLint** (flat config, `typescript-eslint`, `eslint-plugin-react-hooks`,
  `eslint-plugin-react-refresh`) — static analysis.
- **Prettier** — consistent formatting, decoupled from lint rules via
  `eslint-config-prettier`.
- **Vitest + React Testing Library** — unit/component tests that run in
  the same Vite pipeline as the app, with `jsdom` for a browser-like DOM.

No backend and no paid services are used. The placeholder page is fully
static and deploys to GitHub Pages as a client-only build.

## Why this stack

- It's a widely-recognized, modern frontend stack — legible to anyone
  reviewing the repository, including recruiters and other engineers.
- Vite + Vitest share configuration and mental model, keeping the toolchain
  small.
- TypeScript is configured in strict mode (`noUnusedLocals`,
  `noUnusedParameters`, `noFallthroughCasesInSwitch`, etc. — see
  `tsconfig.app.json`) so type safety is enforced early, before it's
  expensive to retrofit.

## Folder structure

```
src/
  components/   Reusable presentational components (one .tsx + one .css per component)
  styles/       Design tokens (tokens.css) and global/reset styles (global.css)
  App.tsx       Composes the current placeholder page
  App.test.tsx  Component tests for App
  main.tsx      Entry point
  setupTests.ts Test environment setup (jest-dom matchers)
docs/           Project documentation (this folder)
.github/        Issue templates and the Pages deploy workflow
```

This is deliberately shallow. It is not meant to anticipate the final
product's structure — once a direction is chosen, the structure should
grow to fit it (e.g. `features/`, `routes/`, state management, etc. as
actually needed), rather than being speculatively built out now.

## Design tokens

`src/styles/tokens.css` defines CSS custom properties for color, radius,
shadow, blur, spacing, and font-family. Components consume these via
`var(--token-name)` rather than hardcoded values, so a future visual
refresh (or a real design system) can replace the token values without
touching component code.

## Deployment

`.github/workflows/deploy.yml` builds the app and publishes `dist/` to
GitHub Pages on every push to `main`, using the official
`actions/upload-pages-artifact` and `actions/deploy-pages` actions. Vite's
`base` is set to `/frutiger-aero-lab/` for production builds (matching the
GitHub Pages project URL) and `/` for local dev.

There is currently no separate lint/test CI workflow — checks are run
locally (`npm run typecheck && npm run lint && npm run test && npm run
build`) before pushing. This can be added later if/when it's useful.
