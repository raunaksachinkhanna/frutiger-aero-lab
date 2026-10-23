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
          first product direction: AeroReddit, a browser extension that reskins Reddit.
        </p>
        <div className="hero-panel__actions">
          <a className="aero-button aero-button--primary" href="./aeroreddit/">
            Try the AeroReddit demo
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
          <h2>AeroReddit</h2>
          <p>
            A browser extension that reskins Reddit in Frutiger Aero — Vista Glass,
            Frutiger Eco, and Dark Aero themes, with a live interactive demo.
          </p>
        </GlassPanel>
        <GlassPanel className="info-card">
          <CardIcon kind="roadmap" />
          <h2>Honest scope</h2>
          <p>
            Full theming on old.reddit.com; page-level atmosphere on www.reddit.com, whose
            UI lives behind Shadow DOM. See <code>docs/roadmap.md</code>.
          </p>
        </GlassPanel>
        <GlassPanel className="info-card">
          <CardIcon kind="architecture" />
          <h2>Monorepo foundation</h2>
          <p>
            npm workspaces sharing a theme package across the extension, the demo site,
            and this lab site — see <code>docs/architecture.md</code>.
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
