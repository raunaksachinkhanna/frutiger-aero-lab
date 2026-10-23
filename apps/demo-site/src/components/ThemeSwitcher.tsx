import { THEMES, type ThemeId } from 'aero-theme/src/tokens'
import './ThemeSwitcher.css'

interface ThemeSwitcherProps {
  value: ThemeId
  onChange: (id: ThemeId) => void
}

export function ThemeSwitcher({ value, onChange }: ThemeSwitcherProps) {
  return (
    <div
      className="theme-switcher"
      role="radiogroup"
      aria-label="Choose an AeroReddit theme"
    >
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          type="button"
          role="radio"
          aria-checked={value === theme.id}
          className="theme-switcher__pill"
          data-selected={value === theme.id}
          data-aero-theme={theme.id}
          onClick={() => onChange(theme.id)}
        >
          <span className="theme-switcher__dot" />
          {theme.name}
        </button>
      ))}
    </div>
  )
}
