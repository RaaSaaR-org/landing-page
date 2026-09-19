import type { ReactNode } from 'react';
import styles from './FieldVisual.module.css';

interface FieldVisualProps {
  children: ReactNode;
  label?: string;
  variant?: 'illustration' | 'brand';
}

/** A lightweight, layered light field around the page's own illustration. */
export function FieldVisual({ children, label, variant = 'illustration' }: FieldVisualProps) {
  return (
    <div className={`${styles.scene} ${variant === 'brand' ? styles.brand : ''}`} aria-hidden="true">
      <div className={styles.bloom} />
      <svg className={styles.field} viewBox="0 0 600 580" fill="none">
        {Array.from({ length: 17 }, (_, i) => (
          <path key={i} d={`M${-80 + i * 31} 560C${140 + i * 13} ${490 - i * 5} ${100 + i * 17} ${125 + i * 3} ${330 + i * 27} 20`} />
        ))}
        <path className={styles.signal} d="M44 560C192 470 168 137 438 20" />
        <path className={styles.signalDelayed} d="M199 560C257 445 253 152 573 20" />
      </svg>
      <div className={styles.assembly}>
        <div className={styles.backPlane} />
        <div className={styles.middlePlane} />
        <div className={styles.frontPlane}>
          <div className={styles.cornerTop} />
          <div className={styles.cornerBottom} />
          <div className={styles.planeGrid} />
          <span className={styles.planeMark}>EmAI</span>
          <span className={styles.planeCross}>+</span>
          <div className={styles.artwork}>{children}</div>
          <div className={styles.planeFooter}><span /> <span /> <span /></div>
        </div>
      </div>
      <div className={styles.caption}><span className={styles.captionLine} /><span>{label || 'EmAI'}</span><span>↗</span></div>
    </div>
  );
}
