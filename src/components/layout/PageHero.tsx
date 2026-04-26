import { Container, Section } from '@/components/layout';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <Section background="surface">
      <Container>
        <div className="max-w-4xl">
          {eyebrow && (
            <span className="font-mono text-sm uppercase tracking-wider text-primary-400 mb-4 block">
              {eyebrow}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            {title}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-full mb-8" />
          {subtitle && (
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
