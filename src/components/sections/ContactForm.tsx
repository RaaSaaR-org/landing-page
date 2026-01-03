'use client';

import { Container, Section } from '@/components/layout';
import { useTranslations } from 'next-intl';

export function ContactForm() {
  const t = useTranslations('contact');

  return (
    <Section id="contact" background="surface-elevated">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
              {t('title')}
            </h2>
            <p className="text-xl text-text-secondary">
              {t('subtitle')}
            </p>
          </div>

          <div className="bg-surface rounded-2xl shadow-2xl p-8 border border-border-subtle hover:border-primary-500/30 transition-all text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-2xl font-semibold text-text-primary mb-2">
                contact@emai.de
              </p>
              <p className="text-text-secondary">
                {t('subtitle')}
              </p>
            </div>

            <a
              href="mailto:contact@emai.de"
              className="inline-block px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-400 transition-all shadow-lg hover:shadow-orange"
            >
              {t('form.submit')}
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
