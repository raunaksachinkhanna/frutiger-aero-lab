import {
  ANIMATION_LEVELS,
  THEMES,
  type AnimationLevel,
  type ThemeId,
} from 'aero-theme/src/tokens'
import { useSettings } from './useSettings'
import './SettingsPanel.css'

export function SettingsPanel({ full = false }: { full?: boolean }) {
  const { settings, ready, update, reset } = useSettings()

  return (
    <div
      className={full ? 'aero-panel aero-panel--full' : 'aero-panel'}
      data-aero-theme={settings.theme}
    >
      <header className="aero-panel__header">
        <span className="aero-panel__orb" aria-hidden="true" />
        <div>
          <h1>AeroReddit</h1>
          <p>Theme Studio</p>
        </div>
        <label className="aero-toggle">
          <input
            type="checkbox"
            checked={settings.enabled}
            disabled={!ready}
            onChange={(e) => update({ enabled: e.target.checked })}
          />
          <span>{settings.enabled ? 'On' : 'Off'}</span>
        </label>
      </header>

      <section className="aero-panel__section">
        <h2>Theme</h2>
        <div className="aero-theme-grid">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              type="button"
              className="aero-theme-swatch"
              data-selected={settings.theme === theme.id}
              data-aero-theme={theme.id}
              onClick={() => update({ theme: theme.id as ThemeId })}
              title={theme.description}
            >
              <span className="aero-theme-swatch__preview" />
              {theme.name}
            </button>
          ))}
        </div>
      </section>

      <section className="aero-panel__section">
        <h2>Animations</h2>
        <div className="aero-segmented">
          {ANIMATION_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              data-selected={settings.animationLevel === level}
              onClick={() => update({ animationLevel: level as AnimationLevel })}
            >
              {level}
            </button>
          ))}
        </div>
        <label className="aero-checkbox">
          <input
            type="checkbox"
            checked={settings.bubblesEnabled}
            onChange={(e) => update({ bubblesEnabled: e.target.checked })}
          />
          Floating bubbles
        </label>
      </section>

      {full && (
        <>
          <section className="aero-panel__section">
            <h2>Glass</h2>
            <label className="aero-slider">
              Opacity
              <input
                type="range"
                min={0.3}
                max={1}
                step={0.05}
                value={settings.glassOpacity}
                onChange={(e) => update({ glassOpacity: Number(e.target.value) })}
              />
            </label>
            <label className="aero-slider">
              Blur intensity
              <input
                type="range"
                min={0}
                max={1.5}
                step={0.05}
                value={settings.blurIntensity}
                onChange={(e) => update({ blurIntensity: Number(e.target.value) })}
              />
            </label>
          </section>

          <section className="aero-panel__section">
            <h2>Accent color</h2>
            <label className="aero-accent-row">
              <input
                type="color"
                value={settings.accentOverride ?? '#1f8fe0'}
                onChange={(e) => update({ accentOverride: e.target.value })}
              />
              <button type="button" onClick={() => update({ accentOverride: null })}>
                Use theme default
              </button>
            </label>
          </section>

          <section className="aero-panel__section">
            <h2>Layout</h2>
            <div className="aero-segmented">
              {(['cozy', 'compact'] as const).map((density) => (
                <button
                  key={density}
                  type="button"
                  data-selected={settings.cardDensity === density}
                  onClick={() => update({ cardDensity: density })}
                >
                  {density}
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      <footer className="aero-panel__footer">
        <button type="button" className="aero-reset" onClick={reset}>
          Reset to defaults
        </button>
      </footer>
    </div>
  )
}
