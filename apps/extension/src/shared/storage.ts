import {
  DEFAULT_SETTINGS,
  sanitizeSettings,
  type AeroSettings,
} from 'aero-theme/src/tokens'

const STORAGE_KEY = 'aeroReddit.settings'

/**
 * chrome.storage.sync has small quota/rate limits; storage.local is the safe default.
 * We still read from sync first (for cross-device parity) and fall back to local.
 */
export async function loadSettings(): Promise<AeroSettings> {
  try {
    const syncResult = await chrome.storage.sync.get(STORAGE_KEY)
    if (syncResult[STORAGE_KEY]) return sanitizeSettings(syncResult[STORAGE_KEY])
  } catch {
    // storage.sync can be unavailable (e.g. managed/enterprise policy) — fall through.
  }
  try {
    const localResult = await chrome.storage.local.get(STORAGE_KEY)
    if (localResult[STORAGE_KEY]) return sanitizeSettings(localResult[STORAGE_KEY])
  } catch {
    // ignore — use defaults
  }
  return { ...DEFAULT_SETTINGS }
}

export async function saveSettings(settings: AeroSettings): Promise<void> {
  const payload = { [STORAGE_KEY]: settings }
  const writes = await Promise.allSettled([
    chrome.storage.sync.set(payload),
    chrome.storage.local.set(payload),
  ])
  if (writes.every((w) => w.status === 'rejected')) {
    throw new Error('AeroReddit: failed to persist settings to any storage backend.')
  }
}

export function onSettingsChanged(
  callback: (settings: AeroSettings) => void,
): () => void {
  const listener = (
    changes: Record<string, chrome.storage.StorageChange>,
    area: string,
  ) => {
    if (area !== 'sync' && area !== 'local') return
    const change = changes[STORAGE_KEY]
    if (!change) return
    callback(sanitizeSettings(change.newValue))
  }
  chrome.storage.onChanged.addListener(listener)
  return () => chrome.storage.onChanged.removeListener(listener)
}
