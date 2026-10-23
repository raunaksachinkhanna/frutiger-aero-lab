# Notes on theming Reddit (read before touching selectors)

This explains why AeroReddit's CSS is split into `old-reddit.css` and
`new-reddit.css`, and what to check before expanding either.

## The core constraint: Shadow DOM

Modern Reddit (`www.reddit.com`) is built on a web-component system
("shreddit") — elements like `<shreddit-post>`, `<shreddit-comment-tree>`,
and various `<faceplate-*>` components. Many of these render their
contents inside a **Shadow DOM** shadow root.

That matters because of a hard platform rule: a stylesheet injected by a
content script into the main document **cannot style the inside of a
shadow root** unless the component explicitly exposes `::part()` hooks for
it, or the styles are CSS custom properties (which _do_ inherit across
the shadow boundary, unlike selectors/rules).

This is not a bug in AeroReddit, and not something fixable with more
specific selectors or `!important`. It's a browser-level encapsulation
boundary.

## What this means for each surface

- **old.reddit.com** — plain light-DOM HTML. No shadow roots. An injected
  stylesheet can reach everything: nav, post cards, vote arrows, comment
  threads, text inputs. `old-reddit.css` does full theming here, using
  selectors like `.thing`, `.midcol`, `.usertext-body`, `#header` — these
  are old Reddit's long-stable class names, used by subreddit CSS themes
  for over a decade.
- **www.reddit.com** — `new-reddit.css` only touches confirmed-reachable
  light-DOM surfaces: `html`/`body` background, the document scrollbar,
  and host elements' own box (not their shadow content). It deliberately
  does **not** guess at shreddit's internal component structure or invent
  CSS custom property names Reddit might read — those weren't verified.

## This was never verified against live Reddit

`reddit.com` and `old.reddit.com` were both unreachable from the sandbox
this extension was built in (browsing to them was denied). Everything
above is based on well-documented, publicly known facts about Reddit's
redesign (the shreddit web-component architecture) and about
old.reddit.com's long-stable markup — not on live inspection done while
writing this code.

**Before claiming "it works on reddit.com," do this:**

1. Load the unpacked extension (see the demo site's install section).
2. Open `https://old.reddit.com` and confirm the theme actually applies
   (nav, posts, comments).
3. Open `https://www.reddit.com`, open DevTools, and check:
   - `document.querySelector('shreddit-app')?.shadowRoot` — if this
     returns a `ShadowRoot` (not `null`), that confirms the shadow-DOM
     constraint described above for that element.
   - Whether any `shreddit-*` custom elements document `::part()` names
     (check Reddit's own CSS / dev tools, or their public docs if any) —
     if so, `new-reddit.css` can add `::part(...)` rules for them.
   - Whether shreddit components read any standard CSS custom properties
     (inspect computed styles) — if so, those can be set from
     `new-reddit.css` since custom properties cross shadow boundaries.
4. Update this file with what you actually found, and move the finding
   from "untested claim" to "verified" in `docs/roadmap.md`.

## Updating selectors when Reddit changes its markup

old.reddit.com's markup has been stable for years, but isn't guaranteed
to stay that way. If a selector in `old-reddit.css` stops matching:

1. Inspect the live page to find the new class/structure.
2. Update the selector in `apps/extension/src/content/old-reddit.css`.
3. Keep selectors scoped under `html[data-aero-site='old']` — don't widen
   them to match unrelated pages.
