import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DEFAULT_THEME_ID, FIREFOX_THEME_COLORS, THEME_IDS, THEME_META } from './colors.js'

const REQUIRED_FIELDS = [
  'frame',
  'tab_background_text',
  'toolbar',
  'toolbar_text',
  'toolbar_field',
  'toolbar_field_text',
  'icons',
  'popup',
  'popup_text',
]

test('every theme id has a complete color map', () => {
  for (const id of THEME_IDS) {
    const colors = FIREFOX_THEME_COLORS[id]
    assert.ok(colors, `missing colors for ${id}`)
    for (const field of REQUIRED_FIELDS) {
      assert.equal(typeof colors[field], 'string', `${id}.${field} should be a color string`)
      assert.ok(colors[field].length > 0, `${id}.${field} should not be empty`)
    }
  }
})

test('every theme id has display metadata', () => {
  for (const id of THEME_IDS) {
    assert.ok(THEME_META[id]?.name, `missing name for ${id}`)
    assert.match(THEME_META[id]?.swatch ?? '', /^#[0-9a-f]{6}$/i, `swatch for ${id} should be hex`)
  }
})

test('the default theme id is a real theme', () => {
  assert.ok(THEME_IDS.includes(DEFAULT_THEME_ID))
})
