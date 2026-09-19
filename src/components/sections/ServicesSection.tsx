'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';
import { Link } from '@/i18n/routing';
import { trackCTAClick } from '@/lib/analytics';
import styles from './HomeSections.module.css';

const serviceKeys = ['consulting', 'testing', 'workshops', 'data'] as const;

/** Small, abstract diagrams give each discipline its own visual identity. */
function ServiceDiagram({ variant }: { variant: typeof serviceKeys[number] }) {
  return (
    <svg viewBox="0 0 360 150" fill="none" className={styles.diagram} aria-hidden="true">
      <path d="M0 75H360M180 0V150" stroke="currentColor" opacity=".07" />
      {variant === 'consulting' && <>
        <path d="M30 120H100L150 75H220L285 25H330" stroke="currentColor" opacity=".2" />
        <path className={styles.signal} d="M30 120H100L150 75H220L285 25H330" stroke="currentColor" strokeWidth="2" strokeDasharray="36 390" />
        {[[100, 120], [150, 75], [220, 75], [285, 25]].map(([x,y], i) => <g key={i}><circle cx={x} cy={y} r="15" fill="#10161b" stroke="currentColor" opacity=".5"/><circle cx={x} cy={y} r="3" fill="currentColor" /></g>)}
        <path d="M30 100V140M330 5V45" stroke="currentColor" opacity=".3" />
      </>}
      {variant === 'testing' && <>
        <path d="M40 30H90M40 30V65M320 30H270M320 30V65M40 120H90M40 120V85M320 120H270M320 120V85" stroke="currentColor" opacity=".4" />
        {[24,44,64].map(r => <circle key={r} cx="180" cy="75" r={r} stroke="currentColor" opacity={r===44 ? .5 : .15} />)}
        <path d="M165 75L176 86L198 61" stroke="currentColor" strokeWidth="2" />
        <path className={styles.scan} d="M70 75H290" stroke="currentColor" strokeDasharray="2 5" opacity=".7" />
      </>}
      {variant === 'workshops' && <>
        <path d="M75 75H285M180 30V120M75 75L180 30L285 75L180 120Z" stroke="currentColor" opacity=".2" />
        {[[75,75],[180,30],[285,75],[180,120]].map(([x,y],i) => <g key={i}><rect x={x-18} y={y-18} width="36" height="36" rx="10" fill="#10161b" stroke="currentColor" opacity=".5"/><circle cx={x} cy={y} r="3" fill="currentColor" /></g>)}
        <circle cx="180" cy="75" r="12" fill="currentColor" opacity=".15" /><circle cx="180" cy="75" r="4" fill="currentColor" />
      </>}
      {variant === 'data' && <>
        {Array.from({length:24},(_,i) => <path key={i} d={`M${42+i*12} ${75-Math.sin(i*.72)*28-12}V${75+Math.sin(i*.72)*28+12}`} stroke="currentColor" strokeWidth="3" opacity={.2+(i%5)*.15} />)}
        <path d="M30 125H330M30 25H330" stroke="currentColor" opacity=".12" />
      </>}
    </svg>
  );
}

export function ServicesSection() {
  const t = useTranslations('services');
  return (
    <Section id="services" background="base">
      <Container>
        <div className="section-intro mb-14">
          <h2 className="text-4xl md:text-5xl font-medium text-text-primary mb-4">{t('title')}</h2>
          <p className="text-lg text-text-secondary">{t('subtitle')}</p>
        </div>
        <div className={styles.services}>
          {serviceKeys.map((key, index) => (
            <Link key={key} href={`/services/${key}`} onClick={() => trackCTAClick(t('learnMore'), `service_card_${key}`)} className={`${styles.service} ${key === 'data' ? styles.teal : ''}`}>
              <div className={styles.serviceTop}><span>0{index + 1} /</span><span className={styles.serviceArrow}>↗</span></div>
              <ServiceDiagram variant={key} />
              <h3>{t(`items.${key}.title`)}</h3>
              <p>{t(`items.${key}.description`)}</p>
              <span className={styles.serviceLink}>{t('learnMore')}<span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
