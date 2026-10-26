# Notes on AeroFox (read before touching the Firefox theme)

AeroFox (`apps/firefox-theme/`) is architecturally different from
AeroReddit, and it's worth being explicit about why, since it's easy to
assume both work the same way.

## Theme API, not content-script CSS injection

AeroReddit works by injecting a stylesheet into a page's DOM via a
content script — see
[`docs/extension-reddit-notes.md`](extension-reddit-notes.md) for the
Shadow DOM constraints that come with that approach.

AeroFox does not touch page content at all. It uses Firefox's native
[`browser.theme.update()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/theme)
API (`background.js`) to set the browser's own chrome colors — tabs,
toolbar, frame, popups — from a `theme.colors` map
(`colors.js`). This is an officially supported, first-class WebExtension
surface, not a styling workaround, so there's no Shadow DOM problem to
work around: the browser itself owns and renders its chrome.

The tradeoff: `theme.colors` takes solid/rgba colors, not CSS gradients
or `color-mix()`. `colors.js` hand-picks solid colors per theme that
visually approximate `packages/aero-theme`'s gradients as closely as a
flat-color API allows — it is not a 1:1 reuse of the shared theme tokens.

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
