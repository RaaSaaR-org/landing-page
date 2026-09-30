'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';
import { LearningLoop } from '@/components/sections/LearningLoop';
import { Link } from '@/i18n/routing';
import styles from './HomeSections.module.css';

const pillarIcons = {
  openSource: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  sovereignty: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  learning: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
    </svg>
  ),
  humanFirst: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
};

const pillarKeys = ['openSource', 'sovereignty', 'learning', 'humanFirst'] as const;

export function WhyEmaiSection() {
  const t = useTranslations('whyEmai');

  return (
    <Section id="why-emai" background="surface">
      <Container>
        <div className={styles.whyLayout}>
          <div className={styles.whyIntro}>
            <h2>{t('title')}</h2>
            <p>{t('subtitle')}</p>
            <Link href="/about" className={styles.whyLink}>{t('aboutLink')}<span aria-hidden="true">→</span></Link>
            <div className={styles.loopFrame}><LearningLoop /></div>
          </div>
          <div className={styles.pillars}>
            {pillarKeys.map((key) => (
              <div key={key} className={styles.pillar}>
                <div className={styles.pillarIcon}>{pillarIcons[key]}</div>
                <div>
                  <h3>{t(`items.${key}.title`)}</h3>
                  <p>{t(`items.${key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
