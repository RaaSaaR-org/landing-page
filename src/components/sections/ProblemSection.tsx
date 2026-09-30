'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';
import styles from './HomeSections.module.css';

export function ProblemSection() {
  const t = useTranslations('problem');

  return (
    <Section id="problem" background="surface">
      <Container>
        <div className={styles.problem}>
          <div className={styles.problemIntro}>
            <h2>{t('title')}</h2>
            <p>{t('description')}</p>
          </div>
          <div className={styles.problemList}>
            {(['evaluation', 'access', 'trust', 'dependency'] as const).map((key, index) => (
              <div key={key} className={styles.challenge}>
                <span className={styles.challengeIndex} aria-hidden="true">0{index + 1}</span>
                <div>
                  <h3>{t(`challenges.${key}.title`)}</h3>
                  <p>{t(`challenges.${key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
