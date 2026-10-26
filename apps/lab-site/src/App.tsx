import { AeroBackdrop } from './components/AeroBackdrop'
import { AeroMark } from './components/AeroMark'
import { CardIcon } from './components/CardIcon'
import { GlassPanel } from './components/GlassPanel'
import { PhaseBadge } from './components/PhaseBadge'
import './App.css'

const REPO_URL = 'https://github.com/raunaksachinkhanna/frutiger-aero-lab'

function App() {
  return (
    <div className="page">
      <AeroBackdrop />

      <GlassPanel className="hero-panel">
        <AeroMark className="hero-panel__mark" />
        <PhaseBadge />
        <h1>Frutiger Aero Lab</h1>
        <p className="hero-panel__tagline">
          An open-source exploration of the Frutiger Aero design era — glossy glass,
          vibrant blue and green, and the optimistic tech aesthetic of the mid-2000s. Our
          first product: AeroFox, a Firefox browser theme add-on.
        </p>
        <div className="hero-panel__actions">
          <a
            className="aero-button aero-button--primary"
            href={`${REPO_URL}/tree/main/apps/firefox-theme`}
            target="_blank"
            rel="noreferrer"
          >
            Get AeroFox
          </a>
          <a
            className="aero-button aero-button--secondary"
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </GlassPanel>

      <div className="info-grid">
        <GlassPanel className="info-card">
          <CardIcon kind="research" />
          <h2>AeroFox</h2>
          <p>
            A real Firefox browser theme add-on — Vista Glass, Frutiger Eco, and Dark
            Aero, live-switchable from the toolbar popup.
          </p>
        </GlassPanel>
        <GlassPanel className="info-card">
          <CardIcon kind="roadmap" />
          <h2>Native theming</h2>
          <p>
            Built on Firefox&apos;s own <code>theme.update()</code> API, not CSS
            injection — see <code>docs/firefox-theme-notes.md</code>.
          </p>
        </GlassPanel>
        <GlassPanel className="info-card">
          <CardIcon kind="architecture" />
          <h2>Monorepo foundation</h2>
          <p>
            npm workspaces sharing engineering foundations across this lab site and
            AeroFox — see <code>docs/architecture.md</code>.
          </p>
        </GlassPanel>
      </div>

      <footer className="page-footer">
        Open source and in active discovery.{' '}
        <a href={`${REPO_URL}/issues`} target="_blank" rel="noreferrer">
          Share feedback on GitHub
        </a>
        .
      </footer>
    </div>
  )
}

export default App
