/** Original glossy "orb" mark — the project's placeholder logo until a real one exists. */
export function AeroMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 84 84"
      role="img"
      aria-label="Frutiger Aero Lab"
    >
      <defs>
        <radialGradient id="aero-mark-body" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#bfe8ff" />
          <stop offset="45%" stopColor="#1f8fe0" />
          <stop offset="100%" stopColor="#0b5fa8" />
        </radialGradient>
        <linearGradient id="aero-mark-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9be8be" />
          <stop offset="100%" stopColor="#2fb872" />
        </linearGradient>
      </defs>
      <circle cx="42" cy="42" r="38" fill="url(#aero-mark-ring)" opacity="0.55" />
      <circle cx="42" cy="42" r="30" fill="url(#aero-mark-body)" />
      <ellipse cx="33" cy="26" rx="14" ry="8" fill="#ffffff" opacity="0.55" />
    </svg>
  )
}
