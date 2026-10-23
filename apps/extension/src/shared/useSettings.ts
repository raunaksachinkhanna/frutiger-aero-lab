import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_SETTINGS, type AeroSettings } from 'aero-theme/src/tokens'
import { loadSettings, onSettingsChanged, saveSettings } from './storage'

export function useSettings() {
  const [settings, setSettings] = useState<AeroSettings>(DEFAULT_SETTINGS)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadSettings().then((loaded) => {
      if (!cancelled) {
        setSettings(loaded)
        setReady(true)
      }
    })
    const unsubscribe = onSettingsChanged((next) => {
      if (!cancelled) setSettings(next)
    })
    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])

  const update = useCallback((patch: Partial<AeroSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch }
      void saveSettings(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
    void saveSettings(DEFAULT_SETTINGS)
  }, [])

  return { settings, ready, update, reset }
}
