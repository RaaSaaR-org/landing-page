'use client';

import { useTranslations } from 'next-intl';
import { trackCTAClick } from '@/lib/analytics';
import { Container } from '@/components/layout/Container';
import { IntelligenceField } from '@/components/visuals/IntelligenceField';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const t = useTranslations('hero');
  return (
    <section className={styles.hero}>
      <Container className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className={styles.opening}><span aria-hidden="true" />{t('opening')}</p>
            <h1 className={styles.headline}>{t('headline')}<br /><span>{t('headlineAccent')}</span></h1>
            <p className={styles.description}>{t.rich('subtitle', { highlight: (chunks) => <span className={styles.highlight}>{chunks}</span> })}</p>
            <div className={styles.actions}>
              <a href="#contact" onClick={() => trackCTAClick(t('cta'), 'hero')} className="button-primary">{t('cta')}<span aria-hidden="true">↗</span></a>
              <a href="#services" onClick={() => trackCTAClick(t('ctaSecondary'), 'hero')} className="button-secondary">{t('ctaSecondary')}<span aria-hidden="true">↓</span></a>
            </div>
            <ul className={styles.principles}>
              {(['openSource', 'european', 'learning'] as const).map((key) => <li key={key}>{t(`pillars.${key}`)}</li>)}
            </ul>
          </div>
          <div className={styles.art}>
            <IntelligenceField />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.location}><span>Saarbrücken, Germany</span><span className={styles.locationDivider} aria-hidden="true">/</span><span className={styles.independent}>{t('independent')}</span></div>
          <a href="#services" className={styles.discover}>{t('discover')}<span aria-hidden="true">↓</span></a>
        </div>
      </Container>
    </section>
  );
}
