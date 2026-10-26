/**
 * Firefox's theme.update() API takes solid/rgba color strings per UI
 * surface, not CSS gradients — so this is a parallel, hand-picked palette
 * rather than a direct read of packages/aero-theme's CSS custom
 * properties. Values are chosen to match the same visual identity
 * (same base hues as the Vista Glass / Frutiger Eco / Dark Aero themes
 * used elsewhere in this monorepo).
 */
export const THEME_IDS = ['vista-glass', 'frutiger-eco', 'dark-aero']
export const DEFAULT_THEME_ID = 'vista-glass'

export const THEME_META = {
  'vista-glass': { name: 'Vista Glass', swatch: '#0d99ff' },
  'frutiger-eco': { name: 'Frutiger Eco', swatch: '#14c472' },
  'dark-aero': { name: 'Dark Aero', swatch: '#00e5ff' },
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
}
