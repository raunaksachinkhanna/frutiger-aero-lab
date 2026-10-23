# Frutiger Aero Lab

An open-source exploration of the **Frutiger Aero** design aesthetic — the
glossy glass, vibrant blue/green, and optimistic "tech future" look of the
Windows Vista/7 era — built with modern web engineering practices.

**This project is in its discovery phase.** We haven't decided what the
final application will do. Rather than building a generic nostalgia site,
we're gathering feedback from the Frutiger Aero community to find a
direction people would genuinely use, then building that with a solid
engineering foundation. See [`docs/research.md`](docs/research.md) and
[`docs/roadmap.md`](docs/roadmap.md) for where things currently stand.

🔗 **Live preview:** https://raunaksachinkhanna.github.io/frutiger-aero-lab/

## Current state

Right now, this repository contains:

- A clean, strict React + TypeScript + Vite foundation (see
  [`docs/architecture.md`](docs/architecture.md)).
- A small design-token foundation for the Frutiger Aero palette and glass
  surfaces (`src/styles/tokens.css`).
- A polished placeholder landing page explaining the project and its
  current phase — not the final product.
- Linting, formatting, and component tests wired up from the start.
- Automatic deployment of the placeholder page to GitHub Pages.

## Tech stack

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Vite](https://vite.dev/) for dev server and builds
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) for code quality and formatting
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for tests
- No backend, no paid services

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically http://localhost:5173).

### Other scripts

| Command                | What it does                                    |
| ---------------------- | ----------------------------------------------- |
| `npm run build`        | Type-checks and builds a production bundle      |
| `npm run preview`      | Serves the production build locally             |
| `npm run typecheck`    | Runs the TypeScript compiler in check-only mode |
| `npm run lint`         | Runs ESLint                                     |
| `npm run format`       | Formats the codebase with Prettier              |
| `npm run format:check` | Checks formatting without writing changes       |
| `npm run test`         | Runs the test suite once                        |
| `npm run test:watch`   | Runs the test suite in watch mode               |

## Contributing

This is an early-stage, research-driven project — see
[`CONTRIBUTING.md`](CONTRIBUTING.md). The most valuable contribution right
now is feedback: [open an issue](../../issues) with a problem or idea,
especially if you're part of the Frutiger Aero / Y2K design community.

## License

[MIT](LICENSE)
