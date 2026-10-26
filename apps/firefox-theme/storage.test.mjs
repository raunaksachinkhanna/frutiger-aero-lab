import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'

function makeArea(initial = {}) {
  const data = { ...initial }
  return {
    data,
    async get(key) {
      return key in data ? { [key]: data[key] } : {}
    },
    async set(values) {
      Object.assign(data, values)
    },
  }
}

function installMockBrowser({ syncThrows = false, syncInitial = {}, localInitial = {} } = {}) {
  const sync = makeArea(syncInitial)
  const local = makeArea(localInitial)
  globalThis.browser = {
    storage: {
      sync: syncThrows
        ? {
            async get() {
              throw new Error('sync unavailable')
            },
            async set() {
              throw new Error('sync unavailable')
            },
          }
        : sync,
      local,
      onChanged: { addListener() {} },
    },
  }
  return { sync, local }
}

beforeEach(() => {
  delete globalThis.browser
})

test('getThemeChoice prefers sync over local', async () => {
  installMockBrowser({ syncInitial: { aeroFoxThemeId: 'dark-aero' }, localInitial: { aeroFoxThemeId: 'vista-glass' } })
  const { getThemeChoice } = await import(`./storage.js?t=${Date.now()}-1`)
  assert.equal(await getThemeChoice('vista-glass'), 'dark-aero')
})

test('getThemeChoice falls back to local when sync has no value', async () => {
  installMockBrowser({ localInitial: { aeroFoxThemeId: 'frutiger-eco' } })
  const { getThemeChoice } = await import(`./storage.js?t=${Date.now()}-2`)
  assert.equal(await getThemeChoice('vista-glass'), 'frutiger-eco')
})

test('getThemeChoice falls back to local when sync throws', async () => {
  installMockBrowser({ syncThrows: true, localInitial: { aeroFoxThemeId: 'royale-noir' } })
  const { getThemeChoice } = await import(`./storage.js?t=${Date.now()}-3`)
  assert.equal(await getThemeChoice('vista-glass'), 'royale-noir')
})

test('getThemeChoice returns the default when nothing is stored anywhere', async () => {
  installMockBrowser()
  const { getThemeChoice } = await import(`./storage.js?t=${Date.now()}-4`)
  assert.equal(await getThemeChoice('vista-glass'), 'vista-glass')
})

test('setThemeChoice writes to both sync and local when sync works', async () => {
  const { sync, local } = installMockBrowser()
  const { setThemeChoice } = await import(`./storage.js?t=${Date.now()}-5`)
  await setThemeChoice('media-green')
  assert.equal(sync.data.aeroFoxThemeId, 'media-green')
  assert.equal(local.data.aeroFoxThemeId, 'media-green')
})

test('setThemeChoice still writes to local when sync throws', async () => {
  const { local } = installMockBrowser({ syncThrows: true })
  const { setThemeChoice } = await import(`./storage.js?t=${Date.now()}-6`)
  await setThemeChoice('dark-aero')
  assert.equal(local.data.aeroFoxThemeId, 'dark-aero')
})
