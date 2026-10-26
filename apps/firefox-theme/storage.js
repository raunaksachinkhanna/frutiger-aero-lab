/**
 * Theme choice persistence, with browser.storage.sync as the primary
 * store (so the chosen theme follows the user across signed-in devices)
 * and browser.storage.local as a fallback/mirror for when sync is
 * disabled or unavailable (e.g. no Firefox Account signed in, or an
 * enterprise policy disabling it).
 */
export const STORAGE_KEY = 'aeroFoxThemeId'

async function trySyncOp(op) {
  try {
    return await op(browser.storage.sync)
  } catch {
    return undefined
  }
}

export async function getThemeChoice(defaultId) {
  const syncResult = await trySyncOp((area) => area.get(STORAGE_KEY))
  if (syncResult && syncResult[STORAGE_KEY] !== undefined) {
    return syncResult[STORAGE_KEY]
  }
  const localResult = await browser.storage.local.get(STORAGE_KEY)
  if (localResult[STORAGE_KEY] !== undefined) {
    await trySyncOp((area) => area.set({ [STORAGE_KEY]: localResult[STORAGE_KEY] }))
    return localResult[STORAGE_KEY]
  }
  return defaultId
}

export async function setThemeChoice(id) {
  await trySyncOp((area) => area.set({ [STORAGE_KEY]: id }))
  await browser.storage.local.set({ [STORAGE_KEY]: id })
}

export function onThemeChoiceChanged(callback) {
  browser.storage.onChanged.addListener((changes, area) => {
    if ((area === 'sync' || area === 'local') && changes[STORAGE_KEY]) {
      callback(changes[STORAGE_KEY].newValue)
    }
  })
}
