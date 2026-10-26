import {
  AUTO_THEME_ID,
  DEFAULT_THEME_ID,
  FIREFOX_THEME_COLORS,
  THEME_IMAGES,
  resolveAutoThemeId,
} from './colors.js'

const STORAGE_KEY = 'aeroFoxThemeId'

function prefersDarkScheme() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches
}

async function applyTheme(themeId) {
  const concreteId = themeId === AUTO_THEME_ID ? resolveAutoThemeId(prefersDarkScheme()) : themeId
  const resolvedId = FIREFOX_THEME_COLORS[concreteId] ? concreteId : DEFAULT_THEME_ID
  const colors = FIREFOX_THEME_COLORS[resolvedId]
  const themeFrame = THEME_IMAGES[resolvedId]
  const images = themeFrame ? { theme_frame: themeFrame } : undefined
  await browser.theme.update({ colors, images })
}

async function getStoredThemeId() {
  const stored = await browser.storage.local.get(STORAGE_KEY)
  return stored[STORAGE_KEY] ?? DEFAULT_THEME_ID
}

async function init() {
  await applyTheme(await getStoredThemeId())
}

browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes[STORAGE_KEY]) {
    applyTheme(changes[STORAGE_KEY].newValue)
  }
})

if (typeof matchMedia === 'function') {
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async () => {
    if ((await getStoredThemeId()) === AUTO_THEME_ID) {
      await applyTheme(AUTO_THEME_ID)
    }
  })
}

void init()
