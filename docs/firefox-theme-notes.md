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

## Options page

`options_ui.page` points at `options/index.html` — a fuller page
(`open_in_tab: true`) than the popup has room for, reachable from
Firefox's native add-on manager. Same no-bundler pattern as the rest of
this add-on. It shows all 6 selectable ids (5 real themes + Auto) as
cards using `THEME_META` for name/swatch and `THEME_IMAGES` as a subtle
background texture per card, plus the same Export/Import controls as
the popup, built on the exact same `settings.js`/`storage.js` functions
(no duplicated validation logic). Like the New Tab page, it falls back
to the default theme if storage is ever unavailable at load time rather
than getting stuck. Visually verified locally over a plain static HTTP
server via the browser pane — not yet inside a real Firefox profile.

## Keyboard shortcut

`Alt+Shift+A` (the `cycle-theme` command in `manifest.json`) advances to
the next theme without opening the popup. `background.js` listens via
`browser.commands.onCommand`, reads the current choice with
`getThemeChoice()`, computes the next one with `colors.js`'s
`nextThemeId(currentId)` (a pure function — wraps from the last real
theme back to the first, and treats `'auto'` or any unrecognized id as
starting before the first theme), and persists it with
`setThemeChoice()`, which already triggers the existing apply path — no
separate theme-application logic here. The cycle only ever lands on a
real theme, never `'auto'` itself, since cycling through an OS-driven
pseudo-id via a manual keyboard press doesn't make sense. Whether
Firefox actually registers and fires this shortcut can only be confirmed
in a real profile; see the verification steps above.

## Settings export/import

`settings.js` is a pure module (no DOM or `browser.*` calls, so it's
fully unit-testable) exporting `exportSettingsJson(themeId)` /
`importSettingsJson(raw)` — the same envelope shape AeroReddit used
(`{ aeroFoxSettings: true, schemaVersion: 1, themeId }`). Import always
goes through `JSON.parse` (never `eval`) and validates `themeId` against
the known selectable ids before returning it; anything malformed,
tampered, or invalid falls back to `DEFAULT_THEME_ID` rather than being
trusted wholesale. The popup wires this to Export/Import buttons
(`popup.js`) via a Blob download and a hidden file input. 8 tests in
`settings.test.mjs` cover round-trips, invalid JSON, tampered/invalid
theme ids, and a prototype-pollution-shaped payload.

## New Tab page

`chrome_url_overrides.newtab` points at `newtab/index.html` — a
deliberately minimal static page (no bundler, matching the rest of this
add-on): a glass-panel card over a themed gradient, a handful of
CSS-animated floating bubbles (`prefers-reduced-motion` disables them
entirely rather than just pausing them), and the current theme's name.
It reads the stored choice via `storage.js`'s `getThemeChoice()` and
resolves `'auto'` the same way `background.js` does, then sets
`--nt-bg`/`--nt-text`/`--nt-accent` CSS custom properties from
`colors.js`'s `ntp_background`/`ntp_text`/`tab_line` fields — it does
not modify `colors.js` or `background.js` themselves, only reads from
them. If storage is ever unavailable, it falls back to rendering the
default theme rather than getting stuck mid-load. No external requests,
no telemetry. This was visually verified locally (served over a plain
static HTTP server, not inside a real Firefox profile — see the
verification steps above for what that still leaves unconfirmed, like
Firefox actually invoking this override).

## Cross-device sync

The chosen theme (including `'auto'`) is persisted via `storage.js`'s
`getThemeChoice()`/`setThemeChoice()`, which prefer
`browser.storage.sync` (so the choice follows a signed-in user across
devices) and fall back to `browser.storage.local` when sync throws (no
Firefox Account signed in, sync disabled by policy, etc.) or has no
value yet — in which case the local value is also opportunistically
migrated into sync. Every write goes to both stores, so local always
has a current mirror even once sync is working. Covered by
`storage.test.mjs` with a mock `browser` global (12/12 tests passing
total) — this part doesn't need a real Firefox profile to verify.

## The "Auto" option

`AUTO_THEME_ID` (`'auto'`) is a pseudo-theme-id, selectable in the popup
and stored in `browser.storage.local` just like a real theme id, but it
has no color map or image of its own — it's deliberately kept out of
`THEME_IDS`. `background.js` resolves it at apply-time via
`resolveAutoThemeId(prefersDark)` (a pure function in `colors.js`, easy
to unit test without mocking `matchMedia`) to Vista Glass (light) or Dark
Aero (dark), based on `matchMedia('(prefers-color-scheme: dark)')`.

Firefox background scripts (unlike Chrome's MV3 service workers) run in
a real hidden-page context, so `matchMedia` is available directly — no
content-script relay needed. A `change` listener on that media query
re-applies the theme automatically when the OS scheme flips, but only if
the currently stored choice is still `'auto'` (so a manually-picked theme
is never silently overridden by an OS theme change). This part — the
live OS-scheme-change reaction — can only be confirmed in a real Firefox
profile; see the verification steps above.

## Updating colors

`colors.js` is the single source of truth. To add or adjust a theme:

1. Add/edit the entry in `FIREFOX_THEME_COLORS` — every field listed in
   `colors.test.mjs`'s `REQUIRED_FIELDS` must be present and non-empty.
2. Add/edit the matching `THEME_META` entry (`name` + hex `swatch` for
   the popup UI).
3. Run `npm test` in `apps/firefox-theme/` — it checks every theme has a
   complete color map, valid swatch hex, and that `DEFAULT_THEME_ID`
   points at a real theme.
