import type { AeroSettings } from 'aero-theme/src/tokens'
import vistaGlassCss from 'aero-theme/src/themes/vista-glass.css?inline'
import frutigerEcoCss from 'aero-theme/src/themes/frutiger-eco.css?inline'
import darkAeroCss from 'aero-theme/src/themes/dark-aero.css?inline'
import oldRedditCss from './old-reddit.css?inline'
import newRedditCss from './new-reddit.css?inline'
import { detectSite } from './site'
import { loadSettings, onSettingsChanged } from '../shared/storage'
import { setBubbles } from './effects'

const STYLE_ID = 'aeroreddit-styles'
const site = detectSite(location.hostname)

function injectStylesheet() {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = [
    vistaGlassCss,
    frutigerEcoCss,
    darkAeroCss,
    oldRedditCss,
    newRedditCss,
  ].join('\n')
  // document_start fires before <head> may exist yet.
  ;(document.head ?? document.documentElement).appendChild(style)
}

function applySettings(settings: AeroSettings) {
  const root = document.documentElement
  if (site === 'unsupported' || !settings.enabled) {
    root.removeAttribute('data-aero-site')
    root.removeAttribute('data-aero-theme')
    setBubbles(false, settings.animationLevel)
    return
  }
  root.setAttribute('data-aero-site', site)
  root.setAttribute('data-aero-theme', settings.theme)
  root.setAttribute('data-aero-density', settings.cardDensity)
  root.style.setProperty('--aero-opacity-scale', String(settings.glassOpacity))
  root.style.setProperty('--aero-blur-scale', String(settings.blurIntensity))
  if (settings.accentOverride) {
    root.style.setProperty('--aero-accent', settings.accentOverride)
    root.style.setProperty('--aero-link', settings.accentOverride)
  } else {
    root.style.removeProperty('--aero-accent')
    root.style.removeProperty('--aero-link')
  }
  setBubbles(settings.bubblesEnabled, settings.animationLevel)
}

async function start() {
  injectStylesheet()
  const settings = await loadSettings()
  applySettings(settings)
  onSettingsChanged(applySettings)
}

void start()
