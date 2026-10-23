import type { AnimationLevel } from 'aero-theme/src/tokens'

const BUBBLE_COUNTS: Record<AnimationLevel, number> = {
  off: 0,
  low: 3,
  medium: 6,
  high: 10,
}
const OVERLAY_ID = 'aeroreddit-bubble-overlay'

let styleInjected = false

function injectBubbleStyles() {
  if (styleInjected) return
  styleInjected = true
  const style = document.createElement('style')
  style.id = 'aeroreddit-bubble-styles'
  style.textContent = `
    #${OVERLAY_ID} {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2147483000;
      overflow: hidden;
    }
    #${OVERLAY_ID} .aeroreddit-bubble {
      position: absolute;
      bottom: -10vh;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85), rgba(255,255,255,0.05) 70%);
      opacity: 0.5;
      animation: aeroreddit-rise linear infinite;
    }
    @keyframes aeroreddit-rise {
      from { transform: translateY(0) translateX(0); }
      to { transform: translateY(-120vh) translateX(var(--aeroreddit-drift, 0px)); }
    }
    @media (prefers-reduced-motion: reduce) {
      #${OVERLAY_ID} { display: none !important; }
    }
  `
  document.head.appendChild(style)
}

/**
 * CSS-animation bubble overlay. No rAF loop — each bubble is a single
 * `animation: ... infinite` rule, so the compositor handles it and there's
 * nothing running when the tab is backgrounded (browsers already throttle
 * CSS animations on hidden tabs). pointer-events: none throughout, so it
 * can never intercept a click meant for Reddit.
 */
export function setBubbles(enabled: boolean, level: AnimationLevel) {
  let overlay = document.getElementById(OVERLAY_ID)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const count = enabled && !reducedMotion ? BUBBLE_COUNTS[level] : 0

  if (count === 0) {
    overlay?.remove()
    return
  }

  injectBubbleStyles()
  if (!overlay) {
    overlay = document.createElement('div')
    overlay.id = OVERLAY_ID
    document.body.appendChild(overlay)
  }
  overlay.innerHTML = ''
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement('span')
    bubble.className = 'aeroreddit-bubble'
    const size = 14 + Math.random() * 46
    bubble.style.width = `${size}px`
    bubble.style.height = `${size}px`
    bubble.style.left = `${Math.random() * 100}%`
    bubble.style.animationDuration = `${14 + Math.random() * 14}s`
    bubble.style.animationDelay = `-${Math.random() * 20}s`
    bubble.style.setProperty('--aeroreddit-drift', `${(Math.random() - 0.5) * 120}px`)
    overlay.appendChild(bubble)
  }
}
