import { test } from 'node:test'
import assert from 'node:assert/strict'
import { exportSettingsJson, importSettingsJson } from './settings.js'

test('export/import round-trips a real theme id', () => {
  const json = exportSettingsJson('frutiger-eco')
  assert.equal(importSettingsJson(json), 'frutiger-eco')
})

test('export/import round-trips the auto pseudo-id', () => {
  const json = exportSettingsJson('auto')
  assert.equal(importSettingsJson(json), 'auto')
})

test('export falls back to the default for an unknown theme id', () => {
  const json = exportSettingsJson('not-a-real-theme')
  assert.equal(importSettingsJson(json), 'vista-glass')
})

test('import returns null for invalid JSON', () => {
  assert.equal(importSettingsJson('{not json'), null)
})

test('import returns null for non-object JSON', () => {
  assert.equal(importSettingsJson('"just a string"'), null)
  assert.equal(importSettingsJson('42'), null)
  assert.equal(importSettingsJson('null'), null)
})

test('import falls back to the default for a tampered/invalid themeId', () => {
  assert.equal(importSettingsJson(JSON.stringify({ aeroFoxSettings: true, themeId: 'evil' })), 'vista-glass')
  assert.equal(importSettingsJson(JSON.stringify({ aeroFoxSettings: true, themeId: 123 })), 'vista-glass')
  assert.equal(importSettingsJson(JSON.stringify({ aeroFoxSettings: true })), 'vista-glass')
})

test('import never executes code from the input (no eval)', () => {
  const malicious = JSON.stringify({
    aeroFoxSettings: true,
    themeId: { toString: () => 'vista-glass' },
  })
  assert.equal(importSettingsJson(malicious), 'vista-glass')
})

test('import is not fooled by a prototype-pollution-shaped payload', () => {
  const malicious = '{"__proto__": {"polluted": true}, "themeId": "dark-aero"}'
  assert.equal(importSettingsJson(malicious), 'dark-aero')
  assert.equal({}.polluted, undefined)
})
