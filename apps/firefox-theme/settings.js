import { AUTO_THEME_ID, DEFAULT_THEME_ID, THEME_IDS } from './colors.js'

const SELECTABLE_IDS = [AUTO_THEME_ID, ...THEME_IDS]
const SCHEMA_VERSION = 1

export function exportSettingsJson(themeId) {
  const payload = {
    aeroFoxSettings: true,
    schemaVersion: SCHEMA_VERSION,
    themeId: SELECTABLE_IDS.includes(themeId) ? themeId : DEFAULT_THEME_ID,
  }
  return JSON.stringify(payload, null, 2)
}

export function importSettingsJson(raw) {
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }
  if (typeof parsed !== 'object' || parsed === null) return null

  const candidate = parsed.themeId

  if (typeof candidate !== 'string' || !SELECTABLE_IDS.includes(candidate)) {
    return DEFAULT_THEME_ID
  }
  return candidate
}
