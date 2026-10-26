import { DEFAULT_THEME_ID, THEME_IDS, THEME_META } from './colors.js'

const STORAGE_KEY = 'aeroFoxThemeId'

async function getCurrentThemeId() {
  const stored = await browser.storage.local.get(STORAGE_KEY)
  return stored[STORAGE_KEY] ?? DEFAULT_THEME_ID
}

function renderButtons(container, selectedId, onSelect) {
  container.innerHTML = ''
  for (const id of THEME_IDS) {
    const meta = THEME_META[id]
    const button = document.createElement('button')
    button.type = 'button'
    button.role = 'radio'
    button.setAttribute('aria-checked', String(id === selectedId))
    button.dataset.selected = String(id === selectedId)
    button.style.setProperty('--swatch', meta.swatch)
    const dot = document.createElement('span')
    dot.className = 'dot'
    button.append(dot, document.createTextNode(meta.name))
    button.addEventListener('click', () => onSelect(id))
    container.appendChild(button)
  }
}

async function main() {
  const container = document.getElementById('themes')
  let selectedId = await getCurrentThemeId()

  async function handleSelect(id) {
    selectedId = id
    await browser.storage.local.set({ [STORAGE_KEY]: id })
    renderButtons(container, selectedId, handleSelect)
  }

  renderButtons(container, selectedId, handleSelect)
}

void main()
