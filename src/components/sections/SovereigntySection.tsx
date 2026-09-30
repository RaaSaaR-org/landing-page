import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';
import { TrackedAnchor } from '@/components/ui/TrackedAnchor';
import { polar as polarAt, twoDigit } from '@/lib/format';
import styles from './SovereigntySection.module.css';

const icon = (d: string) => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
  </svg>
);

const layerIcons = {
  data: icon('M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125'),
  models: icon('M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5'),
  compute: icon('M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z'),
  security: icon('M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'),
  safety: icon('M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z'),
  compliance: icon('M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z'),
};

const groups = [
  { key: 'sovereign', layers: ['data', 'models', 'compute'] },
  { key: 'secure', layers: ['security', 'safety', 'compliance'] },
] as const;

const C = 210;
const polar = (r: number, deg: number) => polarAt(C, C, r, deg);

/** Three nested protection zones: data and models stay inside, outbound flow stops at the boundary. */
function SovereigntyPerimeter() {
  const t = useTranslations('sovereignty.diagram');
  const rings = [
    { r: 60, label: t('edge') },
    { r: 120, label: t('plant') },
    { r: 180, label: t('europe') },
  ];
  const [x0, y0] = polar(26, -45);
  const [xb, yb] = polar(180, -45);
  const [x1, y1] = polar(206, -45);

  return (
    <svg viewBox="0 0 420 420" fill="none" className={styles.perimeter} role="img" aria-label={t('aria')}>
      <path d={`M0 ${C}H420M${C} 0V420`} stroke="currentColor" opacity=".06" />
      <circle cx={C} cy={C} r="180" fill="#ff67000a" stroke="#ff8534" strokeOpacity=".35" />
      <circle cx={C} cy={C} r="120" fill="#ff67000a" stroke="#ff8534" strokeOpacity=".3" strokeDasharray="3 5" />
      <circle cx={C} cy={C} r="60" fill="#ff670012" stroke="#ff8534" strokeOpacity=".55" />
      {/* Twelve points on the outer ring, a quiet nod to the European circle of stars. */}
      {Array.from({ length: 12 }, (_, i) => {
        const [x, y] = polar(180, i * 30 - 90);
        return <circle key={i} cx={x} cy={y} r="2.5" fill="#ffa366" opacity=".8" />;
      })}
      <g className={styles.orbitSlow}>
        {[20, 140, 250].map((deg) => { const [x, y] = polar(150, deg); return <circle key={deg} cx={x} cy={y} r="3.5" fill="#2dd4bf" />; })}
      </g>
      <g className={styles.orbitFast}>
        {[60, 200, 310].map((deg) => { const [x, y] = polar(90, deg); return <circle key={deg} cx={x} cy={y} r="3" fill="#5eead4" />; })}
      </g>
      <path d={`M${x0} ${y0}L${xb} ${yb}`} stroke="#ff8534" strokeWidth="1.5" strokeDasharray="4 6" className={styles.outbound} />
      <path d={`M${xb} ${yb}L${x1} ${y1}`} stroke="#ff8534" strokeOpacity=".25" strokeDasharray="2 5" />
      <g transform={`translate(${xb} ${yb})`}>
        <circle r="11" fill="#090c0f" stroke="#ff8534" strokeWidth="1.5" />
        <path d="M-4 -4L4 4M4 -4L-4 4" stroke="#ff8534" strokeWidth="1.75" strokeLinecap="round" />
      </g>
      <g transform={`translate(${C} ${C})`}>
        <rect x="-20" y="-20" width="40" height="40" rx="9" fill="#10161b" stroke="#ff8534" strokeWidth="1.5" />
        <path d="M-9 -26v6M0 -26v6M9 -26v6M-9 20v6M0 20v6M9 20v6M-26 -9h6M-26 0h6M-26 9h6M20 -9h6M20 0h6M20 9h6" stroke="#ff8534" strokeOpacity=".6" />
        <circle r="5" fill="#ff6700" className={styles.core} />
      </g>
      {rings.map(({ r, label }) => {
        const width = label.length * 7.4 + 20;
        return (
          <g key={r} transform={`translate(${C} ${C - r})`}>
            <rect x={-width / 2} y="-10" width={width} height="20" rx="10" fill="#090c0f" stroke="#ff8534" strokeOpacity=".35" />
            <text y="3.5" textAnchor="middle" className={styles.ringLabel}>{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function SovereigntySection() {
  const t = useTranslations('sovereignty');
  const questions = t.raw('checklist.items') as string[];

  return (
    <Section id="sovereignty" background="base" className={styles.section}>
      <Container>
        <div className={styles.head}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}><span aria-hidden="true" />{t('eyebrow')}</p>
            <h2>{t('title')}<br /><span>{t('titleAccent')}</span></h2>
            <p className={styles.lead}>{t('intro')}</p>
          </div>
          <div className={styles.art}><SovereigntyPerimeter /></div>
        </div>

        <div className={styles.groups}>
          {groups.map((group) => (
            <div key={group.key} className={`${styles.group} ${group.key === 'secure' ? styles.teal : ''}`}>
              <h3 className={styles.groupTitle}>{t(`groups.${group.key}`)}</h3>
              <ul className={styles.layers}>
                {group.layers.map((key) => (
                  <li key={key} className={styles.layer}>
                    <div className={styles.layerTop}>
                      <span className={styles.layerIcon}>{layerIcons[key]}</span>
                      <span className={styles.layerLabel}>{t(`layers.${key}.label`)}</span>
                    </div>
                    <h4>{t(`layers.${key}.title`)}</h4>
                    <p>{t(`layers.${key}.description`)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.checklist}>
          <div className={styles.checklistIntro}>
            <h3>{t('checklist.title')}</h3>
            <p>{t('checklist.note')}</p>
            <TrackedAnchor href="#contact" label={t('checklist.cta')} location="sovereignty" className="button-primary">
              {t('checklist.cta')}<span aria-hidden="true">↗</span>
            </TrackedAnchor>
          </div>
          <ol className={styles.questions}>
            {questions.map((question, index) => (
              <li key={index}>
                <span className={styles.questionIndex} aria-hidden="true">{twoDigit(index + 1)}</span>
                <span>{question}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
