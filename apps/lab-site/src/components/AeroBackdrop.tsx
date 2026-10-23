import './AeroBackdrop.css'

/**
 * Soft, blurred bokeh orbs reminiscent of Aero-era wallpapers.
 * Pure CSS gradients — no image assets, so it's free to tweak and license-safe.
 */
export function AeroBackdrop() {
  return (
    <div className="aero-backdrop" aria-hidden="true">
      <span className="aero-orb aero-orb--one" />
      <span className="aero-orb aero-orb--two" />
      <span className="aero-orb aero-orb--three" />
      <span className="aero-sheen" />
    </div>
  )
}
