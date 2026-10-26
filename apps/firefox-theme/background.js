import { DEFAULT_THEME_ID, FIREFOX_THEME_COLORS, THEME_IMAGES } from './colors.js'

const STORAGE_KEY = 'aeroFoxThemeId'

async function applyTheme(themeId) {
  const resolvedId = FIREFOX_THEME_COLORS[themeId] ? themeId : DEFAULT_THEME_ID
  const colors = FIREFOX_THEME_COLORS[resolvedId]
  const themeFrame = THEME_IMAGES[resolvedId]
  const images = themeFrame ? { theme_frame: themeFrame } : undefined
  await browser.theme.update({ colors, images })
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
