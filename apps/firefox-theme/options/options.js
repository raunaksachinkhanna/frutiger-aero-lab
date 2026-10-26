import {
  AUTO_META,
  AUTO_THEME_ID,
  DEFAULT_THEME_ID,
  THEME_IDS,
  THEME_IMAGES,
  THEME_META,
} from '../colors.js'
import { getThemeChoice, setThemeChoice } from '../storage.js'
import { exportSettingsJson, importSettingsJson } from '../settings.js'
import { renderThemePicker } from '../theme-picker.js'

const SELECTABLE_IDS = [AUTO_THEME_ID, ...THEME_IDS]

function getMeta(id) {
  return id === AUTO_THEME_ID ? AUTO_META : THEME_META[id]
}

function renderCards(container, selectedId, onSelect) {
  renderThemePicker(container, {
    ids: SELECTABLE_IDS,
    selectedId,
    onSelect,
    renderItem(card, id) {
      const meta = getMeta(id)
      card.className = 'theme-card'
      card.style.setProperty('--swatch', meta.swatch)
      const previewImage = THEME_IMAGES[id]
      if (previewImage) {
        card.style.setProperty('--preview-image', `url("../${previewImage}")`)
      }
      const dot = document.createElement('span')
      dot.className = 'dot'
      const name = document.createElement('span')
      name.className = 'name'
      name.textContent = meta.name
      card.append(dot, name)
    },
  })
}

function showBackupError(message) {
  const el = document.getElementById('backup-error')
  if (!el) return
  if (message) {
    el.textContent = message
    el.hidden = false
  } else {
    el.hidden = true
  }
}

function downloadJson(filename, json) {
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

async function main() {
  const container = document.getElementById('themes')
  let selectedId = DEFAULT_THEME_ID
  try {
    selectedId = await getThemeChoice(DEFAULT_THEME_ID)
  } catch {
    // Storage unavailable for some reason — fall through and render the
    // default theme rather than leaving the page stuck mid-load.
  }

  async function handleSelect(id) {
    selectedId = id
    await setThemeChoice(id)
    showBackupError(null)
    renderCards(container, selectedId, handleSelect)
  }

  renderCards(container, selectedId, handleSelect)

  document.getElementById('export-btn')?.addEventListener('click', () => {
    downloadJson('aerofox-settings.json', exportSettingsJson(selectedId))
  })

  const importInput = document.getElementById('import-file')
  document.getElementById('import-btn')?.addEventListener('click', () => importInput?.click())
  importInput?.addEventListener('change', async () => {
    const file = importInput.files?.[0]
    importInput.value = ''
    if (!file) return
    const text = await file.text()
    const themeId = importSettingsJson(text)
    if (themeId === null) {
      showBackupError("That file isn't a valid AeroFox settings export.")
      return
    }
    await handleSelect(themeId)
  })
}

void main()
