type CardIconKind = 'research' | 'roadmap' | 'architecture'

const PATHS: Record<CardIconKind, string> = {
  research: 'M11 19a8 8 0 1 1 5.3-14 8 8 0 0 1-5.3 14Zm9 2-4.3-4.3',
  roadmap: 'M4 19 10 5l4 9 3-5 3 10',
  architecture: 'M4 20V9l8-5 8 5v11M4 20h16M9 20v-7h6v7',
}

/** Minimal line icons for the info cards — original strokes, no icon library. */
export function CardIcon({ kind }: { kind: CardIconKind }) {
  return (
    <svg
      className="info-card__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
      aria-hidden="true"
    >
      <path d={PATHS[kind]} />
    </svg>
  )
}
