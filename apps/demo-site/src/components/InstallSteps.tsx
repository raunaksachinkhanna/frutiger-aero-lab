import './Sections.css'

const STEPS = [
  {
    title: 'Clone and build',
    body: 'git clone the repository, run npm install at the repo root, then npm run build -w aeroreddit-extension.',
  },
  {
    title: 'Open chrome://extensions',
    body: 'Enable "Developer mode" in the top-right corner.',
  },
  {
    title: 'Load unpacked',
    body: 'Click "Load unpacked" and select apps/extension/dist from this repository.',
  },
  {
    title: 'Visit Reddit',
    body: 'Open old.reddit.com for the full theme, or reddit.com for page-level atmosphere. Click the AeroReddit icon to switch themes.',
  },
]

export function InstallSteps() {
  return (
    <section className="demo-section aero-glass-surface" id="install">
      <h2>Install it locally (development build)</h2>
      <p className="demo-section__note">
        Not published to the Chrome Web Store yet — this is a developer-mode sideload,
        matching the project&apos;s current discovery/portfolio stage.
      </p>
      <ol className="demo-section__steps">
        {STEPS.map((step, i) => (
          <li key={step.title}>
            <span className="demo-section__step-number">{i + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
