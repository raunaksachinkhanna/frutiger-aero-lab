# Frutiger Aero Lab

An open-source exploration of the **Frutiger Aero** design aesthetic — the
glossy glass, vibrant blue/green, and optimistic "tech future" look of the
Windows Vista/7 era — built with modern web engineering practices.

🔗 **Live site:** https://raunaksachinkhanna.github.io/frutiger-aero-lab/
🔗 **AeroReddit demo:** https://raunaksachinkhanna.github.io/frutiger-aero-lab/aeroreddit/

## AeroReddit

The first product built here: a browser extension that themes Reddit in
Frutiger Aero (Vista Glass, Frutiger Eco, Dark Aero), plus an interactive
demo site showing it off with fictional sample content.

**Honest scope, stated up front:** old.reddit.com (plain HTML) gets full
theming — nav, posts, votes, comments. www.reddit.com's UI lives mostly
inside Shadow DOM web components that an external stylesheet can't reach,
so it gets page-level atmosphere only. This isn't a limitation we hit and
hid — see [`docs/extension-reddit-notes.md`](docs/extension-reddit-notes.md)
for the full explanation, and [`PROGRESS.md`](PROGRESS.md) for exactly
what has and hasn't been verified (including: this was built in a sandbox
where reddit.com was unreachable, so live sideload testing is still an
open item).

- [Try the demo](https://raunaksachinkhanna.github.io/frutiger-aero-lab/aeroreddit/)
- [Install the extension locally](apps/extension/README.md)
- [How it's built](docs/architecture.md)

## Repository structure

This is an npm-workspaces monorepo:

```
apps/
  lab-site/      This landing page (Phase 0 placeholder, still live)
  extension/     AeroReddit: the MV3 Chrome extension
  demo-site/     AeroReddit: the interactive showcase site
packages/
  aero-theme/    Shared theme tokens/CSS used by both AeroReddit apps
docs/            Research, roadmap, and architecture notes
```

See [`docs/architecture.md`](docs/architecture.md) for the full
breakdown and the engineering decisions behind it, and
[`docs/roadmap.md`](docs/roadmap.md) / [`docs/research.md`](docs/research.md)
for where the project stands.

## Tech stack

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Vite](https://vite.dev/) for dev/build (lab-site, demo-site); a two-pass Vite build for the MV3 extension
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react)
- No backend, no paid services, no telemetry

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev:lab        # Frutiger Aero Lab landing page
npm run dev:demo       # AeroReddit demo site
npm run dev:extension  # AeroReddit popup/options (with HMR)
```

To build and sideload the extension itself, see
[`apps/extension/README.md`](apps/extension/README.md).

### Other scripts (run at the repo root, across all workspaces)

| Command                | What it does                                     |
| ---------------------- | ------------------------------------------------ |
| `npm run build`        | Builds every workspace that has a `build` script |
| `npm run typecheck`    | Runs `tsc` in check-only mode in every workspace |
| `npm run lint`         | Runs ESLint across the whole repo                |
| `npm run format`       | Formats the codebase with Prettier               |
| `npm run format:check` | Checks formatting without writing changes        |
| `npm run test`         | Runs every workspace's test suite once           |

Scope any command to one workspace with `-w`, e.g.
`npm run build -w aeroreddit-extension`.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). The most valuable contribution
right now is feedback on AeroReddit itself:
[open an issue](../../issues) with a problem or idea, especially if
you're part of the Frutiger Aero / Y2K design community.

## License

[MIT](LICENSE)
