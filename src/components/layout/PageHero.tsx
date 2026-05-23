import Image from 'next/image';
import { Container, Section } from '@/components/layout';
import { HazardTape } from '@/components/ui';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Optional per-page illustration on the right. Falls back to the brand halo. */
  visual?: React.ReactNode;
}

/**
 * Subpage hero used by /workshops, /news, /use-cases, /about, etc.
 *
 * Layout:
 *   - Hazard tape flush at the top (brand eye-catcher; matches visitenkarten + flyer)
 *   - Ambient grid + soft orange glow as atmosphere
 *   - HUD corner brackets for a "this is a section" frame
 *   - Two-column on md+: title block (left, 2/3) + visual (right, 1/3)
 *
 * Pages can pass their own `visual` (SVG, illustration, icon set). Default is the
 * EmAI mark in a soft halo — branded but not screaming.
 */
export function PageHero({ eyebrow, title, subtitle, visual }: PageHeroProps) {
  return (
    <Section background="surface" className="relative overflow-hidden">
      {/* Hazard tape — flush to top, brand eye-catcher */}
      <HazardTape position="absolute-top" height={14} />

      {/* Ambient background: subtle grid + warm glow on the right */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-dots opacity-25" />
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,103,0,0.10),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.05),transparent_60%)]" />
      </div>

      {/* HUD corner brackets — subtle frame */}
      <div className="pointer-events-none absolute inset-x-6 sm:inset-x-12 top-10 bottom-6">
        <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-primary-500/30" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-secondary-400/30" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-primary-500/30" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-secondary-400/30" />
      </div>

      <Container>
        <div className="relative grid md:grid-cols-3 gap-12 items-center pt-4">
          {/* Left: title block */}
          <div className="md:col-span-2 max-w-4xl">
            {eyebrow && (
              <span
                className="font-mono font-bold text-xs uppercase text-primary-400 mb-4 inline-block"
                style={{ letterSpacing: '0.14em' }}
              >
                {eyebrow}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-[1.05] tracking-tight">
              {title}
            </h1>
            <div className="w-24 h-1 bg-primary-500 rounded-full mb-8" />
            {subtitle && (
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right (md+) / below title (mobile): visual. Default = brand halo, override via `visual` prop. */}
          <div className="flex justify-center items-center mt-4 md:mt-0">
            {visual ?? <BrandHalo />}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Default subpage visual — the EmAI mark inside concentric "scanning" rings.
 * Branded, fits any context, doesn't need per-page work.
 */
function BrandHalo() {
  return (
    <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-72 lg:h-72 flex items-center justify-center">
      {/* Outer rings */}
      <div className="absolute inset-0 rounded-full border border-primary-500/15" />
      <div className="absolute inset-6 rounded-full border border-primary-500/25" />
      <div className="absolute inset-12 rounded-full border border-secondary-400/20" />

      {/* Soft halo glow */}
      <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle,rgba(255,103,0,0.15),transparent_70%)]" />

      {/* Crosshair ticks at cardinal points */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-primary-500/50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-primary-500/50" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-3 bg-primary-500/50" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-3 bg-primary-500/50" />

      {/* Mark, centered */}
      <Image
        src="/logo.svg"
        alt=""
        aria-hidden="true"
        width={144}
        height={144}
        className="relative z-10 lg:w-44 lg:h-44"
      />
    </div>
  );
}
