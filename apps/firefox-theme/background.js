import { DEFAULT_THEME_ID, FIREFOX_THEME_COLORS } from './colors.js'

const STORAGE_KEY = 'aeroFoxThemeId'

async function applyTheme(themeId) {
  const colors = FIREFOX_THEME_COLORS[themeId] ?? FIREFOX_THEME_COLORS[DEFAULT_THEME_ID]
  await browser.theme.update({ colors })
}

async function init() {
  const stored = await browser.storage.local.get(STORAGE_KEY)
  await applyTheme(stored[STORAGE_KEY] ?? DEFAULT_THEME_ID)
}

browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes[STORAGE_KEY]) {
    applyTheme(changes[STORAGE_KEY].newValue)
  }
})

void init()
