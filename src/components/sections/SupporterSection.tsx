import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout';
import styles from './SupporterSection.module.css';

export async function SupporterSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'supporter' });

  return (
    <section id="supporters" aria-labelledby="supporter-title" className={styles.section}>
      <Container>
        <div className={styles.content}>
          <div className={styles.supporter}>
            <p className={styles.eyebrow}>{t('eyebrow')}</p>
            <a href="https://www.squild.de/" className={styles.name}>SQUILD<span aria-hidden="true">↗</span></a>
          </div>
          <div className={styles.copy}>
            <h2 id="supporter-title">{t('title')}</h2>
            <p>{t('body')}</p>
            <a href="https://www.squild.de/cloud-infrastruktur" className={styles.link}>
              {t('cta')}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
