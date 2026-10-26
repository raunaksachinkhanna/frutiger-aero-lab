import {
  AUTO_THEME_ID,
  DEFAULT_THEME_ID,
  FIREFOX_THEME_COLORS,
  THEME_IMAGES,
  nextThemeId,
  resolveAutoThemeId,
} from './colors.js'
import { getThemeChoice, onThemeChoiceChanged, setThemeChoice } from './storage.js'

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

async function init() {
  await applyTheme(await getThemeChoice(DEFAULT_THEME_ID))
}

onThemeChoiceChanged((themeId) => applyTheme(themeId))

if (typeof matchMedia === 'function') {
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async () => {
    if ((await getThemeChoice(DEFAULT_THEME_ID)) === AUTO_THEME_ID) {
      await applyTheme(AUTO_THEME_ID)
    }
  })
}

browser.commands?.onCommand.addListener(async (command) => {
  if (command !== 'cycle-theme') return
  const current = await getThemeChoice(DEFAULT_THEME_ID)
  await setThemeChoice(nextThemeId(current))
})

void init()
