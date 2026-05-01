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
    <Section background="surface-elevated">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {eyebrow && (
            <span className="font-mono text-xs uppercase tracking-wider text-primary-400 mb-4 block">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{title}</h2>
          <p className="text-lg text-text-secondary mb-10">{body}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryHref}
              locale={locale}
              className="px-8 py-4 bg-primary-500 hover:bg-primary-400 text-white rounded-xl font-semibold shadow-[0_0_30px_rgba(255,103,0,0.25)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                locale={locale}
                className="px-8 py-4 border border-border-subtle hover:border-primary-500/50 text-text-primary rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-base"
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
