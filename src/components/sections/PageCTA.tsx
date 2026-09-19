import { Container, Section } from '@/components/layout';
import { Link } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

interface PageCTAProps {
  locale: Locale;
  eyebrow?: string;
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function PageCTA({
  locale,
  eyebrow,
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: PageCTAProps) {
  return (
    <Section background="base">
      <Container>
        <div className="cta-panel text-center">
          {eyebrow && (
            <span className="font-mono text-xs uppercase tracking-wider text-primary-400 mb-4 block">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{title}</h2>
          <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">{body}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryHref}
              locale={locale}
              className="button-primary"
            >
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                locale={locale}
                className="button-secondary"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
