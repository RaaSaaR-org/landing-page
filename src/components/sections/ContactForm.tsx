'use client';

import { Container, Section } from '@/components/layout';
import { useLocale, useTranslations } from 'next-intl';
import { trackCTAClick } from '@/lib/analytics';
import styles from './HomeSections.module.css';

const CONTACT_EMAIL = 'info@EmAI.dev';
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || '';

export function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();

  const subject = encodeURIComponent(locale === 'de' ? 'Anfrage über emai.dev' : 'Inquiry via emai.dev');
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${subject}`;

  return (
    <Section id="contact" background="surface-elevated">
      <Container>
        <div className={styles.contact}>
          <div className={styles.contactIntro}>
            <span className={styles.contactMark} aria-hidden="true">↗</span>
            <h2>{t('title')}</h2>
            <p>{t('subtitle')}</p>
          </div>
          <div className={styles.contactAction}>
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.contactEmail}>{CONTACT_EMAIL}</a>
            <p>{t('lead')}</p>
            <div className="flex flex-wrap gap-3">
              <a href={mailtoHref} onClick={() => trackCTAClick(t('form.submit'), 'contact_section_email')} className="button-primary">
                {t('form.submit')}<span aria-hidden="true">↗</span>
              </a>
              {BOOKING_URL && (
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackCTAClick(t('bookCall'), 'contact_section_booking')} className="button-secondary">
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
