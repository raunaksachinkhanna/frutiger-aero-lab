import { describe, expect, it } from 'vitest'
import {
  DEFAULT_SETTINGS,
  exportSettingsJson,
  importSettingsJson,
  isValidSettings,
  sanitizeSettings,
} from './tokens'

describe('isValidSettings', () => {
  it('accepts the default settings', () => {
    expect(isValidSettings(DEFAULT_SETTINGS)).toBe(true)
  })

  it('rejects an unknown theme id', () => {
    expect(isValidSettings({ ...DEFAULT_SETTINGS, theme: 'not-a-theme' })).toBe(false)
  })

  it('rejects non-objects', () => {
    expect(isValidSettings(null)).toBe(false)
    expect(isValidSettings('vista-glass')).toBe(false)
  })
})

describe('sanitizeSettings', () => {
  it('falls back to defaults for garbage input', () => {
    expect(sanitizeSettings(null)).toEqual(DEFAULT_SETTINGS)
    expect(sanitizeSettings('nonsense')).toEqual(DEFAULT_SETTINGS)
  })

  it('keeps valid fields and replaces only invalid ones', () => {
    const result = sanitizeSettings({
      theme: 'dark-aero',
      animationLevel: 'not-a-level',
      glassOpacity: 5,
      accentOverride: 'red',
    })
    expect(result.theme).toBe('dark-aero')
    expect(result.animationLevel).toBe(DEFAULT_SETTINGS.animationLevel)
    expect(result.glassOpacity).toBe(DEFAULT_SETTINGS.glassOpacity)
    expect(result.accentOverride).toBeNull()
  })

  it('accepts a valid hex accent override', () => {
    const result = sanitizeSettings({ accentOverride: '#ff00aa' })
    expect(result.accentOverride).toBe('#ff00aa')
  })

  it('never throws on an imported JSON blob with extra/malicious keys', () => {
    expect(() =>
      sanitizeSettings({
        theme: 'vista-glass',
        __proto__: { polluted: true },
        extraneous: 'ignored',
      }),
    ).not.toThrow()
  })
})

describe('exportSettingsJson / importSettingsJson', () => {
  it('round-trips valid settings', () => {
    const custom = { ...DEFAULT_SETTINGS, theme: 'dark-aero' as const, glassOpacity: 0.5 }
    const json = exportSettingsJson(custom)
    expect(importSettingsJson(json)).toEqual(custom)
  })

  it('also accepts a bare settings object (not wrapped in the export envelope)', () => {
    const bare = JSON.stringify({ theme: 'frutiger-eco', glassOpacity: 0.8 })
    const result = importSettingsJson(bare)
    expect(result?.theme).toBe('frutiger-eco')
    expect(result?.glassOpacity).toBe(0.8)
  })

  it('returns null, never throws, for invalid JSON', () => {
    expect(importSettingsJson('not json at all {{{')).toBeNull()
    expect(importSettingsJson('null')).toBeNull()
    expect(importSettingsJson('"just a string"')).toBeNull()
    expect(importSettingsJson('42')).toBeNull()
  })

  it('sanitizes a tampered export rather than trusting it wholesale', () => {
    const tampered = JSON.stringify({
      aeroRedditSettings: true,
      schemaVersion: 1,
      settings: { theme: 'not-a-real-theme', glassOpacity: 999, enabled: 'yes' },
    })
    const result = importSettingsJson(tampered)
    expect(result).toEqual(DEFAULT_SETTINGS)
  })

  it('never evaluates the imported content as code', () => {
    const malicious = JSON.stringify({
      theme: 'vista-glass',
      __proto__: { polluted: true },
      toString: '() => { throw new Error("pwned") }',
    })
    expect(() => importSettingsJson(malicious)).not.toThrow()
    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
  })
})
