import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import styles from './Knowledge.module.css';

interface KnowledgeHeroProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  /** Short facts shown as chips under the subtitle, e.g. chapter count or reading time. */
  meta?: string[];
  actions?: ReactNode;
  art?: ReactNode;
}

export function KnowledgeHero({ eyebrow, title, titleAccent, subtitle, meta, actions, art }: KnowledgeHeroProps) {
  return (
    <section className={`${styles.hero} ${art ? '' : styles.heroCompact}`}>
      <div className={styles.heroGrid} aria-hidden="true" />
      <Container className="relative">
        <div className={art ? styles.heroLayout : undefined}>
          <div className={`${styles.heroCopy} hero-enter`}>
            <p className="eyebrow"><span className="eyebrow-line" />{eyebrow}</p>
            <h1 className={styles.heroTitle}>
              {title}
              {titleAccent && <><br /><span>{titleAccent}</span></>}
            </h1>
            <p className={styles.heroSubtitle}>{subtitle}</p>
            {meta && meta.length > 0 && (
              <ul className={styles.heroMeta}>
                {meta.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
            {actions && <div className={styles.heroActions}>{actions}</div>}
          </div>
          {art && <div className={`${styles.heroArt} hero-enter`} style={{ animationDelay: '120ms' }}>{art}</div>}
        </div>
      </Container>
    </section>
  );
}
