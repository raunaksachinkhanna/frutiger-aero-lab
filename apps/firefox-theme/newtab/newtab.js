import { AUTO_THEME_ID, DEFAULT_THEME_ID, FIREFOX_THEME_COLORS, THEME_META, resolveAutoThemeId } from '../colors.js'
import { getThemeChoice } from '../storage.js'

const BUBBLE_COUNT = 10

function prefersDarkScheme() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches
}

function resolveDisplayThemeId(themeId) {
  const concreteId = themeId === AUTO_THEME_ID ? resolveAutoThemeId(prefersDarkScheme()) : themeId
  return FIREFOX_THEME_COLORS[concreteId] ? concreteId : DEFAULT_THEME_ID
}

function applyThemeColors(themeId) {
  const colors = FIREFOX_THEME_COLORS[themeId]
  const root = document.documentElement
  root.style.setProperty('--nt-bg', colors.ntp_background)
  root.style.setProperty('--nt-text', colors.ntp_text)
  root.style.setProperty('--nt-accent', colors.tab_line)
}

function renderCurrentThemeLabel(storedId, displayId) {
  const label = document.getElementById('current-theme')
  if (!label) return
  const name = THEME_META[displayId]?.name ?? displayId
  label.textContent = storedId === AUTO_THEME_ID ? `Auto — currently ${name}` : name
}

function spawnBubbles() {
  if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }
  const container = document.querySelector('.bubbles')
  if (!container) return
  for (let i = 0; i < BUBBLE_COUNT; i += 1) {
    const bubble = document.createElement('div')
    bubble.className = 'bubble'
    const size = 18 + Math.random() * 46
    bubble.style.left = `${Math.random() * 100}vw`
    bubble.style.width = `${size}px`
    bubble.style.height = `${size}px`
    bubble.style.animationDuration = `${14 + Math.random() * 16}s`
    bubble.style.animationDelay = `-${Math.random() * 20}s`
    container.appendChild(bubble)
  }
}

async function main() {
  let storedId = DEFAULT_THEME_ID
  try {
    storedId = await getThemeChoice(DEFAULT_THEME_ID)
  } catch {
    // Storage unavailable for some reason — fall through and render the
    // default theme rather than leaving the page stuck mid-load.
  }
  const displayId = resolveDisplayThemeId(storedId)
  applyThemeColors(displayId)
  renderCurrentThemeLabel(storedId, displayId)
  spawnBubbles()
}

void main()
