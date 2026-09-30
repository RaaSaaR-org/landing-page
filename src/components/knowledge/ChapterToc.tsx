'use client';

import { useEffect, useState } from 'react';
import styles from './Knowledge.module.css';

interface ChapterTocProps {
  /** Id of the element that wraps all chapters; drives the progress bar. */
  articleId: string;
  items: { key: string; number: string; title: string }[];
  label: string;
  progressLabel: string;
}

/** Sticky chapter index that follows the reader and shows overall progress. */
export function ChapterToc({ articleId, items, label, progressLabel }: ChapterTocProps) {
  const [active, setActive] = useState(items[0]?.key);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.innerHeight * 0.35;
      let current = items[0]?.key;
      for (const { key } of items) {
        const section = document.getElementById(key);
        if (section && section.getBoundingClientRect().top <= marker) current = key;
      }
      setActive(current);
      const article = document.getElementById(articleId);
      if (article) {
        const rect = article.getBoundingClientRect();
        const distance = rect.height - window.innerHeight * 0.65;
        setProgress(Math.min(1, Math.max(0, (marker - rect.top) / Math.max(distance, 1))));
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [articleId, items]);

  const percent = Math.round(progress * 100);

  return (
    <nav className={styles.toc} aria-label={label}>
      <p className={styles.tocLabel}>{label}</p>
      <div className={styles.tocProgress} role="progressbar" aria-label={progressLabel} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <ol>
        {items.map(({ key, number, title }) => (
          <li key={key}>
            <a href={`#${key}`} aria-current={active === key ? 'true' : undefined} className={styles.tocLink}>
              <span className={styles.tocNumber}>{number}</span>
              <span>{title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
