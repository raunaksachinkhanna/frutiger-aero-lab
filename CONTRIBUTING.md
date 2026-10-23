# Contributing to Frutiger Aero Lab

Thanks for your interest — this project is in its **discovery phase**, so the
most valuable contributions right now are ideas and feedback, not code.

## Where this project is right now

We haven't settled on what Frutiger Aero Lab will actually build. We're
collecting feedback from the Frutiger Aero community to find something
people would genuinely use before investing in a specific product. See
[`docs/research.md`](docs/research.md) and [`docs/roadmap.md`](docs/roadmap.md)
for the current thinking.

## Ways to contribute

- **Share feedback or ideas.** Open a [GitHub issue](../../issues) describing
  a problem you'd want this project to solve, or a reaction to the current
  direction. This is the highest-value contribution at this stage.
- **Report bugs** in the existing placeholder app via an issue using the bug
  report template.
- **Propose features** using the feature request template — keep in mind the
  product direction isn't decided yet, so framing something as a problem
  tends to be more useful than a fully-specced feature.
- **Code contributions**: small, well-scoped fixes to the existing foundation
  (tooling, accessibility, tests) are welcome. For anything larger, please
  open an issue first so we can discuss it before you invest time.

## Development setup

```bash
npm install
npm run dev
```

Before opening a pull request, make sure the following all pass:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
```

## Pull requests

- Keep PRs focused on a single change.
- Include a short description of _why_, not just _what_.
- Add or update tests for any behavior change.

## Code of conduct

Be respectful and constructive. This is a small, early-stage project — assume
good faith, and raise concerns about conduct directly to the maintainer via a
GitHub issue or private message.
