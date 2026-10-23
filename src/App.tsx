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
          vibrant blue and green, and the optimistic tech aesthetic of the mid-2000s. We
          haven't picked the product yet; that's the point.
        </p>
        <div className="hero-panel__actions">
          <a
            className="aero-button aero-button--primary"
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
          <a
            className="aero-button aero-button--secondary"
            href={`${REPO_URL}/blob/main/docs/research.md`}
            target="_blank"
            rel="noreferrer"
          >
            Read the research notes
          </a>
        </div>
      </GlassPanel>

      <div className="info-grid">
        <GlassPanel className="info-card">
          <CardIcon kind="research" />
          <h2>Research, not assumptions</h2>
          <p>
            We're collecting feedback from the Frutiger Aero community to find something
            people would actually use, before committing to a specific product.
          </p>
        </GlassPanel>
        <GlassPanel className="info-card">
          <CardIcon kind="roadmap" />
          <h2>Phased roadmap</h2>
          <p>
            Discovery first, then a focused MVP, then testing and release. See{' '}
            <code>docs/roadmap.md</code> for the current plan.
          </p>
        </GlassPanel>
        <GlassPanel className="info-card">
          <CardIcon kind="architecture" />
          <h2>Built to last</h2>
          <p>
            A strict, typed React foundation with linting, formatting, and tests from day
            one — see <code>docs/architecture.md</code>.
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
