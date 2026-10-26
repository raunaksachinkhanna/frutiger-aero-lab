import { AUTO_META, AUTO_THEME_ID, DEFAULT_THEME_ID, THEME_IDS, THEME_META } from './colors.js'
import { getThemeChoice, setThemeChoice } from './storage.js'

const SELECTABLE_IDS = [AUTO_THEME_ID, ...THEME_IDS]

function getMeta(id) {
  return id === AUTO_THEME_ID ? AUTO_META : THEME_META[id]
}

function renderButtons(container, selectedId, onSelect) {
  container.innerHTML = ''
  for (const id of SELECTABLE_IDS) {
    const meta = getMeta(id)
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
  let selectedId = await getThemeChoice(DEFAULT_THEME_ID)

  async function handleSelect(id) {
    selectedId = id
    await setThemeChoice(id)
    renderButtons(container, selectedId, handleSelect)
  }

  renderButtons(container, selectedId, handleSelect)
}

void main()
