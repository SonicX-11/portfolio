/**
 * Fixed full-viewport backdrop: a slow color-shifting gradient plus a
 * flickering film-scratch overlay. Rendered once, behind all page content.
 * Used on the redesigned home page only — /classic keeps the flat #090909.
 */
export default function GradientScratchBackground() {
  return (
    <>
      <div className="animated-gradient-bg pointer-events-none fixed inset-0 z-0" />
      <div className="scratch-overlay" />
    </>
  );
}
