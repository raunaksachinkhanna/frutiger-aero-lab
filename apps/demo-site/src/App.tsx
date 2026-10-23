import { useState } from 'react'
import { DEFAULT_THEME, type ThemeId } from 'aero-theme/src/tokens'
import { BubbleField } from './components/BubbleField'
import { Hero } from './components/Hero'
import { RedditMock } from './components/RedditMock'
import { BeforeAfter } from './components/BeforeAfter'
import { HowItWorks } from './components/HowItWorks'
import { InstallSteps } from './components/InstallSteps'
import { Footer } from './components/Footer'
import './components/Sections.css'

function App() {
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME)

  return (
    <div className="demo-shell" data-aero-theme={theme}>
      <BubbleField />
      <div className="demo-container">
        <Hero theme={theme} onThemeChange={setTheme} />

        <section className="demo-section aero-glass-surface" id="live-preview">
          <h2>Live interactive preview</h2>
          <p className="demo-section__note">
            Sample content only — not real Reddit data, no account needed.
          </p>
          <RedditMock themed theme={theme} showComments />
        </section>

        <section className="demo-section aero-glass-surface demo-section__before-after">
          <h2>Before / after</h2>
          <p className="demo-section__note">Drag the slider to compare.</p>
          <BeforeAfter theme={theme} />
        </section>

        <HowItWorks />
        <InstallSteps />
      </div>
      <Footer />
    </div>
  )
}

export default App
