# Frutiger Aero Lab

An open-source exploration of the **Frutiger Aero** design aesthetic — the
glossy glass, vibrant blue/green, and optimistic "tech future" look of the
Windows Vista/7 era — built with modern web engineering practices.

🔗 **Live site:** https://raunaksachinkhanna.github.io/frutiger-aero-lab/

## AeroFox

The product built here: **AeroFox**, a real Firefox browser theme add-on.
It uses Firefox's native
[`theme.update()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/theme)
API to reskin the browser chrome itself — toolbar, tabs, frame, popups —
in three Aero palettes (Vista Glass, Frutiger Eco, Dark Aero), switchable
live from the toolbar popup. No page content is touched, and there are no
copied Windows OS assets — every gradient is original.

- [Get AeroFox](apps/firefox-theme/)
- [How it's built](docs/architecture.md)
- [Architecture notes & what's still unverified](docs/firefox-theme-notes.md)

## Repository structure

This is an npm-workspaces monorepo:

```
apps/
  lab-site/       This landing page
  firefox-theme/  AeroFox: the Firefox native browser theme add-on
docs/              Research, roadmap, and architecture notes
```

See [`docs/architecture.md`](docs/architecture.md) for the full
breakdown and the engineering decisions behind it, and
[`docs/roadmap.md`](docs/roadmap.md) / [`docs/research.md`](docs/research.md)
for where the project stands.

## Tech stack

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/) (strict mode) for the lab site
- [Vite](https://vite.dev/) for the lab site's dev/build
- AeroFox itself is plain WebExtension JS (no bundler), linted and packaged with Mozilla's [`web-ext`](https://github.com/mozilla/web-ext) CLI
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) (lab site); zero-dependency `node:test` (AeroFox)
- No backend, no paid services, no telemetry

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev:lab   # Frutiger Aero Lab landing page
```

To build and load AeroFox itself, see
[`apps/firefox-theme/`](apps/firefox-theme/) — `npm install && npx web-ext run`
loads it into a temporary Firefox profile.

### Other scripts (run at the repo root, across all workspaces)

| Command                | What it does                                     |
| ----------------------- | ------------------------------------------------- |
| `npm run build`        | Builds every workspace that has a `build` script |
| `npm run typecheck`    | Runs `tsc` in check-only mode in every workspace |
| `npm run lint`         | Runs ESLint across the whole repo                |
| `npm run format`       | Formats the codebase with Prettier               |
| `npm run format:check` | Checks formatting without writing changes        |
| `npm run test`         | Runs every workspace's test suite once           |

Scope any command to one workspace with `-w`, e.g.
`npm run build -w aerofox-firefox-theme`.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). The most valuable contribution
right now is feedback on AeroFox itself:
[open an issue](../../issues) with a problem or idea, especially if
you're part of the Frutiger Aero / Y2K design community.

## License

[MIT](LICENSE)
