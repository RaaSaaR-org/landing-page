/** Lightweight, decorative atmosphere shared by the page heroes. */
export function HeroAtmosphere() {
  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <div className="hero-grid" />
      <div className="hero-light hero-light-warm" />
      <div className="hero-light hero-light-cool" />
      <div className="hero-horizon" />
    </div>
  );
}
