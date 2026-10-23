import './Sections.css'

const POINTS = [
  {
    title: 'A content script, not a replacement site',
    body: "AeroReddit is a Manifest V3 browser extension. It injects a stylesheet into reddit.com that retargets Reddit's own markup with CSS custom properties — it doesn't rewrite Reddit's app logic or replace the page.",
  },
  {
    title: 'old.reddit.com gets full theming',
    body: 'Classic Reddit is plain, light-DOM HTML, so an injected stylesheet can genuinely restyle the whole page — nav, post cards, vote arrows, comment threads, inputs.',
  },
  {
    title: 'www.reddit.com is honestly partial',
    body: 'Modern Reddit ("shreddit") renders most of its UI inside Shadow DOM web components, which external CSS can\'t reach — a browser platform boundary, not a bug. AeroReddit applies page-level atmosphere there (background, scrollbar) rather than claiming full coverage it can\'t deliver.',
  },
  {
    title: 'Settings sync through chrome.storage',
    body: 'The popup and options page write to chrome.storage.sync (with a local fallback). The content script listens for storage changes, so switching themes in the popup updates an open Reddit tab immediately — no reload needed.',
  },
  {
    title: 'Animations that stay out of the way',
    body: 'The bubble effect is a handful of CSS `animation: infinite` rules with pointer-events: none — no requestAnimationFrame loop to manage, respects prefers-reduced-motion, and has an Off/Low/Medium/High setting.',
  },
]

export function HowItWorks() {
  return (
    <section className="demo-section aero-glass-surface" id="how">
      <h2>How this actually works</h2>
      <div className="demo-section__grid">
        {POINTS.map((point) => (
          <div key={point.title} className="demo-section__item">
            <h3>{point.title}</h3>
            <p>{point.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
