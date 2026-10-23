# AeroReddit (extension)

A Manifest V3 Chrome extension that themes Reddit with a Frutiger Aero /
Windows Vista Aero Glass look. Three themes (Vista Glass, Frutiger Eco,
Dark Aero), live settings sync, configurable animations.

**Honest scope:** full theming on `old.reddit.com` (plain HTML); only
page-level atmosphere on `www.reddit.com` (its UI lives in Shadow DOM,
which an external stylesheet can't reach). See
[`../../docs/extension-reddit-notes.md`](../../docs/extension-reddit-notes.md).

## Build

From the repo root:

```bash
npm install
npm run build -w aeroreddit-extension
```

Output goes to `apps/extension/dist/`.

## Load it in Chrome

1. Go to `chrome://extensions`.
2. Enable **Developer mode** (top right).
3. Click **Load unpacked** and select `apps/extension/dist`.
4. Visit `old.reddit.com` for full theming, or `reddit.com` for
   page-level atmosphere. Click the AeroReddit toolbar icon to switch
   themes; right-click it → Options for the full settings panel.

## Permissions

- `storage` — to persist your theme/animation preferences.
- Host access to `reddit.com` / `old.reddit.com` only — to inject the
  theme stylesheet. No other sites, no background network requests, no
  telemetry.

## Development

```bash
npm run dev -w aeroreddit-extension   # popup/options with HMR
npm run typecheck -w aeroreddit-extension
npm run test -w aeroreddit-extension
```

The content script (`src/content/main.ts`) isn't HMR'd — rebuild and
reload the unpacked extension to see content-script changes.
