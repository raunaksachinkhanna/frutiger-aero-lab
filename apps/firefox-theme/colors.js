/**
 * Firefox's theme.update() API takes solid/rgba color strings per UI
 * surface, not CSS gradients — so this is a parallel, hand-picked palette
 * rather than a direct read of packages/aero-theme's CSS custom
 * properties. Values are chosen to match the same visual identity
 * (same base hues as the Vista Glass / Frutiger Eco / Dark Aero themes
 * used elsewhere in this monorepo).
 */
export const THEME_IDS = ['vista-glass', 'frutiger-eco', 'dark-aero', 'royale-noir', 'media-green']
export const DEFAULT_THEME_ID = 'vista-glass'

export const THEME_META = {
  'vista-glass': { name: 'Vista Glass', swatch: '#0d99ff' },
  'frutiger-eco': { name: 'Frutiger Eco', swatch: '#14c472' },
  'dark-aero': { name: 'Dark Aero', swatch: '#00e5ff' },
  'royale-noir': { name: 'Royale Noir', swatch: '#8b6fd6' },
  'media-green': { name: 'Media Center', swatch: '#39ff8c' },
}

/**
 * A translucent glossy/accent-glow PNG laid over the solid toolbar color via
 * theme.images.theme_frame — real texture instead of a flat color, without
 * touching page content. Firefox aligns theme_frame top-right, no-repeat, by
 * default, so these are wide (1200x200) with the highlight concentrated on
 * the right side.
 */
export const THEME_IMAGES = {
  'vista-glass': 'images/vista-glass-frame.png',
  'frutiger-eco': 'images/frutiger-eco-frame.png',
  'dark-aero': 'images/dark-aero-frame.png',
  'royale-noir': 'images/royale-noir-frame.png',
  'media-green': 'images/media-green-frame.png',
}

export const FIREFOX_THEME_COLORS = {
  'vista-glass': {
    frame: '#4fb3f0',
    frame_inactive: '#9cc9e6',
    tab_background_text: '#0a2233',
    tab_text: '#0a2233',
    tab_line: '#0d99ff',
    tab_background_separator: 'rgba(10, 34, 51, 0.15)',
    toolbar: 'rgba(255, 255, 255, 0.78)',
    toolbar_text: '#0a2233',
    toolbar_field: 'rgba(255, 255, 255, 0.88)',
    toolbar_field_text: '#0a2233',
    toolbar_field_border: 'rgba(255, 255, 255, 0.9)',
    toolbar_top_separator: 'rgba(255, 255, 255, 0.6)',
    toolbar_bottom_separator: 'rgba(10, 34, 51, 0.12)',
    icons: '#0a5fc4',
    popup: 'rgba(255, 255, 255, 0.96)',
    popup_text: '#0a2233',
    popup_border: 'rgba(255, 255, 255, 0.9)',
    button_background_active: '#0d99ff',
    button_background_hover: 'rgba(13, 153, 255, 0.22)',
    ntp_background: '#eafcf3',
    ntp_text: '#0a2233',
  },
  'frutiger-eco': {
    frame: '#2fd68a',
    frame_inactive: '#a7e9c8',
    tab_background_text: '#0c2a1c',
    tab_text: '#0c2a1c',
    tab_line: '#14c472',
    tab_background_separator: 'rgba(12, 42, 28, 0.15)',
    toolbar: 'rgba(255, 255, 255, 0.82)',
    toolbar_text: '#0c2a1c',
    toolbar_field: 'rgba(255, 255, 255, 0.9)',
    toolbar_field_text: '#0c2a1c',
    toolbar_field_border: 'rgba(255, 255, 255, 0.92)',
    toolbar_top_separator: 'rgba(255, 255, 255, 0.6)',
    toolbar_bottom_separator: 'rgba(12, 42, 28, 0.12)',
    icons: '#0a8a4e',
    popup: 'rgba(255, 255, 255, 0.97)',
    popup_text: '#0c2a1c',
    popup_border: 'rgba(255, 255, 255, 0.92)',
    button_background_active: '#14c472',
    button_background_hover: 'rgba(20, 196, 114, 0.22)',
    ntp_background: '#d6f6ff',
    ntp_text: '#0c2a1c',
  },
  'dark-aero': {
    frame: '#06283f',
    frame_inactive: '#0a1826',
    tab_background_text: '#e7f6ff',
    tab_text: '#e7f6ff',
    tab_line: '#00e5ff',
    tab_background_separator: 'rgba(120, 230, 255, 0.2)',
    toolbar: 'rgba(18, 36, 54, 0.82)',
    toolbar_text: '#e7f6ff',
    toolbar_field: 'rgba(22, 44, 64, 0.85)',
    toolbar_field_text: '#e7f6ff',
    toolbar_field_border: 'rgba(120, 230, 255, 0.32)',
    toolbar_top_separator: 'rgba(120, 230, 255, 0.25)',
    toolbar_bottom_separator: 'rgba(0, 0, 0, 0.4)',
    icons: '#6ae8ff',
    popup: 'rgba(16, 32, 48, 0.97)',
    popup_text: '#e7f6ff',
    popup_border: 'rgba(120, 230, 255, 0.3)',
    button_background_active: '#00e5ff',
    button_background_hover: 'rgba(0, 229, 255, 0.2)',
    ntp_background: '#030a14',
    ntp_text: '#e7f6ff',
  },
  'royale-noir': {
    frame: '#1a1620',
    frame_inactive: '#0d0b12',
    tab_background_text: '#efe9ff',
    tab_text: '#efe9ff',
    tab_line: '#8b6fd6',
    tab_background_separator: 'rgba(139, 111, 214, 0.25)',
    toolbar: 'rgba(28, 22, 38, 0.85)',
    toolbar_text: '#efe9ff',
    toolbar_field: 'rgba(36, 28, 48, 0.88)',
    toolbar_field_text: '#efe9ff',
    toolbar_field_border: 'rgba(139, 111, 214, 0.35)',
    toolbar_top_separator: 'rgba(139, 111, 214, 0.25)',
    toolbar_bottom_separator: 'rgba(0, 0, 0, 0.45)',
    icons: '#b9a4f2',
    popup: 'rgba(22, 18, 30, 0.97)',
    popup_text: '#efe9ff',
    popup_border: 'rgba(139, 111, 214, 0.32)',
    button_background_active: '#8b6fd6',
    button_background_hover: 'rgba(139, 111, 214, 0.22)',
    ntp_background: '#0d0b12',
    ntp_text: '#efe9ff',
  },
  'media-green': {
    frame: '#07140d',
    frame_inactive: '#040a07',
    tab_background_text: '#d6ffe6',
    tab_text: '#d6ffe6',
    tab_line: '#39ff8c',
    tab_background_separator: 'rgba(57, 255, 140, 0.22)',
    toolbar: 'rgba(8, 24, 16, 0.85)',
    toolbar_text: '#d6ffe6',
    toolbar_field: 'rgba(10, 32, 20, 0.88)',
    toolbar_field_text: '#d6ffe6',
    toolbar_field_border: 'rgba(57, 255, 140, 0.3)',
    toolbar_top_separator: 'rgba(57, 255, 140, 0.22)',
    toolbar_bottom_separator: 'rgba(0, 0, 0, 0.45)',
    icons: '#6dffb0',
    popup: 'rgba(6, 18, 12, 0.97)',
    popup_text: '#d6ffe6',
    popup_border: 'rgba(57, 255, 140, 0.28)',
    button_background_active: '#39ff8c',
    button_background_hover: 'rgba(57, 255, 140, 0.2)',
    ntp_background: '#030a07',
    ntp_text: '#d6ffe6',
  },
}
