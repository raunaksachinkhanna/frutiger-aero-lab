import { useState } from 'react'
import { RedditMock } from './RedditMock'
import type { ThemeId } from 'aero-theme/src/tokens'
import './BeforeAfter.css'

export function BeforeAfter({ theme }: { theme: ThemeId }) {
  const [split, setSplit] = useState(50)

  return (
    <div className="before-after">
      <div className="before-after__stage">
        <div className="before-after__layer">
          <RedditMock themed={false} />
        </div>
        <div
          className="before-after__layer"
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        >
          <RedditMock themed theme={theme} />
        </div>
        <div className="before-after__labels">
          <span>Before</span>
          <span>After (AeroReddit)</span>
        </div>
      </div>
      <input
        className="before-after__slider"
        type="range"
        min={0}
        max={100}
        value={split}
        aria-label="Drag to compare before and after"
        onChange={(e) => setSplit(Number(e.target.value))}
      />
    </div>
  )
}
