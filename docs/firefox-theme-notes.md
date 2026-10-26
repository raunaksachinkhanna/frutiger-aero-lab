# Notes on AeroFox (read before touching the Firefox theme)

AeroFox (`apps/firefox-theme/`) is the project's sole product. This
explains its architecture and what's still unverified.

## Theme API, not content-script CSS injection

AeroFox does not touch page content at all. It uses Firefox's native
[`browser.theme.update()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/theme)
API (`background.js`) to set the browser's own chrome colors — tabs,
toolbar, frame, popups — from a `theme.colors` map
(`colors.js`). This is an officially supported, first-class WebExtension
surface, not a styling workaround: the browser itself owns and renders
its chrome, so there's no Shadow DOM or cross-origin CSS problem to work
around (unlike a content script injecting a stylesheet into a page, which
cannot reach the inside of a shadow root).

The tradeoff: `theme.colors` takes solid/rgba colors, not CSS gradients
or `color-mix()`. `colors.js` hand-picks solid colors per theme that
visually approximate the original Vista Glass / Frutiger Eco / Dark Aero
gradients as closely as a flat-color API allows.

### Real texture via `theme.images.theme_frame`

To get actual gloss/texture rather than a flat color, each theme also
sets `images.theme_frame` — a translucent PNG (`images/<id>-frame.png`,
generated from an SVG template) layered over the solid toolbar color.
Firefox positions it top-right, no-repeat, by default, so the images are
wide (1200×200) with the highlight concentrated on the right side and
mostly-transparent elsewhere, so the solid colors still show through.
`THEME_IMAGES` in `colors.js` maps each theme id to its image path, and
`background.js`'s `applyTheme()` passes it alongside `colors` on every
`browser.theme.update()` call.

## Why build this instead of (or alongside) a classic Firefox Aero skin

A handful of static Frutiger-Aero-styled Firefox themes already exist in
the wild. What differentiates AeroFox:

- **Live multi-theme switching** from the popup (`popup.js`), stored via
  `browser.storage.local` — most existing Aero themes are one fixed
  static look with no in-browser switcher.
- **100% original gradients/colors** — no copied Windows Vista/7 OS
  assets. Some existing Aero-styled themes lean on real captured Aero
  textures, which carries asset-licensing risk; AeroFox's palette is
  hand-authored.

## This was never loaded into real Firefox

`web-ext lint` and `colors.test.mjs` both pass, and `web-ext build`
produces a valid signed-ready zip, but none of this is the same as
`web-ext run` actually launching Firefox and confirming the chrome
re-colors correctly. That step needs a real Firefox binary, which wasn't
available in the sandbox this was built in.

**Before calling this "verified," do this:**

1. `cd apps/firefox-theme && npx web-ext run` (requires Firefox installed
   locally) — this launches a temporary Firefox profile with the add-on
   loaded.
2. Click the AeroFox toolbar icon, switch between the three themes, and
   confirm the toolbar/tab bar/popup colors actually change to match
   `colors.js`'s `FIREFOX_THEME_COLORS` for each theme id.
3. Restart the temporary profile (or just the add-on) and confirm the
   previously selected theme persists (`browser.storage.local` round
   trip).
4. Update this file and `PROGRESS.md` with what you actually found.

## Updating colors

`colors.js` is the single source of truth. To add or adjust a theme:

1. Add/edit the entry in `FIREFOX_THEME_COLORS` — every field listed in
   `colors.test.mjs`'s `REQUIRED_FIELDS` must be present and non-empty.
2. Add/edit the matching `THEME_META` entry (`name` + hex `swatch` for
   the popup UI).
3. Run `npm test` in `apps/firefox-theme/` — it checks every theme has a
   complete color map, valid swatch hex, and that `DEFAULT_THEME_ID`
   points at a real theme.
