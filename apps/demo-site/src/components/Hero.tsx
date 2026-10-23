import { ThemeSwitcher } from './ThemeSwitcher'
import type { ThemeId } from 'aero-theme/src/tokens'
import './Hero.css'

const REPO_URL = 'https://github.com/raunaksachinkhanna/frutiger-aero-lab'

export function Hero({
  theme,
  onThemeChange,
}: {
  theme: ThemeId
  onThemeChange: (id: ThemeId) => void
}) {
  return (
    <header className="hero aero-glass-surface">
      <span className="hero__orb" aria-hidden="true" />
      <p className="hero__eyebrow">An open-source browser extension demo</p>
      <h1>AeroReddit</h1>
      <p className="hero__tagline">
        Reddit, reimagined with Windows Vista Aero Glass — glossy panels, luminous blues
        and greens, and the optimistic internet of 2004–2013.
      </p>
      <ThemeSwitcher value={theme} onChange={onThemeChange} />
      <div className="hero__actions">
        <a
          className="hero__button hero__button--primary"
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
        >
          View source on GitHub
        </a>
        <a className="hero__button" href="#install">
          Install instructions
        </a>
      </div>
    </header>
  )
}
