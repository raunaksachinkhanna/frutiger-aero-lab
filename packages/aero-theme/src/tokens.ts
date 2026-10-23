export const THEME_IDS = ['vista-glass', 'frutiger-eco', 'dark-aero'] as const
export type ThemeId = (typeof THEME_IDS)[number]

export interface ThemeMeta {
  id: ThemeId
  name: string
  description: string
}

export const THEMES: ThemeMeta[] = [
  {
    id: 'vista-glass',
    name: 'Vista Glass',
    description: 'Classic blue Aero Glass with glossy chrome and sky gradients.',
  },
  {
    id: 'frutiger-eco',
    name: 'Frutiger Eco',
    description: 'Vibrant green and blue, bright and nature-inspired.',
  },
  {
    id: 'dark-aero',
    name: 'Dark Aero',
    description: 'Deep ocean blues with glowing cyan accents.',
  },
]

export const DEFAULT_THEME: ThemeId = 'vista-glass'

export type AnimationLevel = 'off' | 'low' | 'medium' | 'high'
export const ANIMATION_LEVELS: AnimationLevel[] = ['off', 'low', 'medium', 'high']

export interface AeroSettings {
  enabled: boolean
  theme: ThemeId
  animationLevel: AnimationLevel
  glassOpacity: number // 0–1, maps to --aero-opacity-scale
  blurIntensity: number // 0–1, maps to --aero-blur-scale
  bubblesEnabled: boolean
  cardDensity: 'cozy' | 'compact'
  /** Hex color (e.g. "#1f8fe0") overriding the theme's accent, or null to use the theme default. */
  accentOverride: string | null
}

export const DEFAULT_SETTINGS: AeroSettings = {
  enabled: true,
  theme: DEFAULT_THEME,
  animationLevel: 'medium',
  glassOpacity: 1,
  blurIntensity: 1,
  bubblesEnabled: true,
  cardDensity: 'cozy',
  accentOverride: null,
}

const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/

export function isValidSettings(value: unknown): value is AeroSettings {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.enabled === 'boolean' &&
    typeof v.theme === 'string' &&
    THEME_IDS.includes(v.theme as ThemeId) &&
    typeof v.animationLevel === 'string' &&
    ANIMATION_LEVELS.includes(v.animationLevel as AnimationLevel) &&
    typeof v.glassOpacity === 'number' &&
    v.glassOpacity >= 0 &&
    v.glassOpacity <= 1 &&
    typeof v.blurIntensity === 'number' &&
    v.blurIntensity >= 0 &&
    v.blurIntensity <= 1 &&
    typeof v.bubblesEnabled === 'boolean' &&
    (v.cardDensity === 'cozy' || v.cardDensity === 'compact') &&
    (v.accentOverride === null ||
      (typeof v.accentOverride === 'string' && HEX_COLOR_RE.test(v.accentOverride)))
  )
}

/** Merges a partial, possibly-untrusted object onto defaults — never trusts it wholesale. */
export function sanitizeSettings(value: unknown): AeroSettings {
  if (!value || typeof value !== 'object') return { ...DEFAULT_SETTINGS }
  const v = value as Record<string, unknown>
  const merged: AeroSettings = {
    enabled: typeof v.enabled === 'boolean' ? v.enabled : DEFAULT_SETTINGS.enabled,
    theme:
      typeof v.theme === 'string' && THEME_IDS.includes(v.theme as ThemeId)
        ? (v.theme as ThemeId)
        : DEFAULT_SETTINGS.theme,
    animationLevel:
      typeof v.animationLevel === 'string' &&
      ANIMATION_LEVELS.includes(v.animationLevel as AnimationLevel)
        ? (v.animationLevel as AnimationLevel)
        : DEFAULT_SETTINGS.animationLevel,
    glassOpacity:
      typeof v.glassOpacity === 'number' && v.glassOpacity >= 0 && v.glassOpacity <= 1
        ? v.glassOpacity
        : DEFAULT_SETTINGS.glassOpacity,
    blurIntensity:
      typeof v.blurIntensity === 'number' && v.blurIntensity >= 0 && v.blurIntensity <= 1
        ? v.blurIntensity
        : DEFAULT_SETTINGS.blurIntensity,
    bubblesEnabled:
      typeof v.bubblesEnabled === 'boolean'
        ? v.bubblesEnabled
        : DEFAULT_SETTINGS.bubblesEnabled,
    cardDensity:
      v.cardDensity === 'cozy' || v.cardDensity === 'compact'
        ? v.cardDensity
        : DEFAULT_SETTINGS.cardDensity,
    accentOverride:
      typeof v.accentOverride === 'string' && HEX_COLOR_RE.test(v.accentOverride)
        ? v.accentOverride
        : null,
  }
  return merged
}
