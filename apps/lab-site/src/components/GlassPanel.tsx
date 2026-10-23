import type { ReactNode } from 'react'
import './GlassPanel.css'

interface GlassPanelProps {
  children: ReactNode
  className?: string
}

/** A frosted-glass surface — the recurring container motif for this UI. */
export function GlassPanel({ children, className }: GlassPanelProps) {
  const classes = className ? `glass-panel ${className}` : 'glass-panel'
  return <div className={classes}>{children}</div>
}
