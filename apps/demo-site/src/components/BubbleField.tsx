import { useEffect, useMemo, useState } from 'react'
import './BubbleField.css'

interface Bubble {
  id: number
  size: number
  left: number
  duration: number
  delay: number
  drift: number
}

function makeBubbles(count: number): Bubble[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    size: 16 + Math.random() * 70,
    left: Math.random() * 100,
    duration: 16 + Math.random() * 18,
    delay: -Math.random() * 30,
    drift: (Math.random() - 0.5) * 160,
  }))
}

/**
 * Ambient floating-bubble backdrop for the showcase site. Pure CSS
 * animation (no rAF loop) so it's cheap and pauses automatically on
 * hidden tabs; fully removed under prefers-reduced-motion.
 */
export function BubbleField({ count = 14 }: { count?: number }) {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])

  const bubbles = useMemo(() => makeBubbles(count), [count])

  if (reducedMotion) return null

  return (
    <div className="bubble-field" aria-hidden="true">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubble-field__bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            ['--drift' as string]: `${b.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
