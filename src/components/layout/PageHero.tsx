import Image from 'next/image';
import type { ReactNode } from 'react';
import { Container } from './Container';
import { Link } from '@/i18n/routing';
import { HeroAtmosphere } from '@/components/visuals/HeroAtmosphere';
import { FieldVisual } from '@/components/visuals/FieldVisual';
import styles from './PageHero.module.css';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  visual?: ReactNode;
  cta?: { label: string; href: string };
  tone?: 'orange' | 'teal';
  onCtaClick?: () => void;
}

export function PageHero({ eyebrow, title, subtitle, visual, cta, tone = 'orange', onCtaClick }: PageHeroProps) {
  return (
    <section className={`page-hero hero-tone-${tone} ${styles.hero}`}>
      <HeroAtmosphere />
      <Container className="relative z-10">
        <div className={styles.layout}>
          <div className={`${styles.copy} hero-enter`}>
            {eyebrow && <div className="eyebrow"><span className="eyebrow-line" />{eyebrow}</div>}
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={`hero-description ${styles.description}`}>{subtitle}</p>}
            {cta && <Link href={cta.href} onClick={onCtaClick} className="button-primary">{cta.label}<span aria-hidden="true">↗</span></Link>}
          </div>
          <div className={`${styles.art} hero-enter`} style={{ animationDelay: '120ms' }}>
            <FieldVisual label={eyebrow} variant={visual ? 'illustration' : 'brand'}>
              {visual ?? <Image src="/logo.svg" alt="" width={190} height={190} className="brand-halo-mark" />}
            </FieldVisual>
          </div>
        </div>
      </Container>
      <div className={styles.baseline} aria-hidden="true" />
    </section>
  );
}
