'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';
import { MembershipBadge } from '@/components/ui/MembershipBadge';
import { Link } from '@/i18n/routing';

export function MembershipSection() {
  const t = useTranslations('membership');

  return (
    <Section id="membership" background="base">
      <Container>
        <div className="glass rounded-xl corner-brackets p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-10 hover:shadow-[0_0_40px_rgba(255,103,0,0.1)] transition-all duration-300">
          <div className="shrink-0">
            <MembershipBadge size={120} label={t('title')} />
          </div>

          <div className="flex-1 text-center md:text-left">
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary-400 mb-3">
              {t('eyebrow')}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              {t('title')}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-5 max-w-2xl">
              {t('body')}
            </p>
            <Link
              href="/news/esf-innovation-community"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
            >
              {t('cta')}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
