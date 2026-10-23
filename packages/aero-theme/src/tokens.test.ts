import { describe, expect, it } from 'vitest'
import { DEFAULT_SETTINGS, isValidSettings, sanitizeSettings } from './tokens'

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
