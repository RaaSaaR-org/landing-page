'use client';

import { Container, Section } from '@/components/layout';
import { useTranslations } from 'next-intl';
import { trackCTAClick } from '@/lib/analytics';

const CONTACT_EMAIL = 'info@EmAI.dev';
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || '';

export function ContactForm() {
  const t = useTranslations('contact');

  const subjectDe = encodeURIComponent('Anfrage über emai.de');
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${subjectDe}`;

  return (
    <Section id="contact" background="surface-elevated">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
              {t('title')}
            </h2>
            <p className="text-xl text-text-secondary">{t('subtitle')}</p>
          </div>

          <div className="bg-surface rounded-2xl shadow-2xl p-8 border border-border-subtle hover:border-primary-500/30 transition-all text-center">
            <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-2xl font-semibold text-text-primary hover:text-primary-400 transition-colors block mb-2"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-text-secondary mb-8">{t('lead')}</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={mailtoHref}
                onClick={() => trackCTAClick(t('form.submit'), 'contact_section_email')}
                className="inline-block px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-400 transition-all shadow-lg hover:shadow-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {t('form.submit')}
              </a>
              {BOOKING_URL && (
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick(t('bookCall'), 'contact_section_booking')}
                  className="inline-block px-8 py-4 border border-border-subtle hover:border-primary-500/50 text-text-primary rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  {t('bookCall')}
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
