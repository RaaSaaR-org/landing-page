'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import styles from './Knowledge.module.css';

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  /** Initial letter used for grouping, already folded (Ä → A). */
  letter: string;
  chapter?: { key: string; number: string; title: string };
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/** Searchable, letter-indexed glossary. Terms arrive sorted from the server. */
export function Glossary({ terms }: { terms: GlossaryTerm[] }) {
  const t = useTranslations('knowledge.glossary');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    if (!q) return terms;
    return terms.filter((item) => `${item.term} ${item.definition}`.toLocaleLowerCase().includes(q));
  }, [query, terms]);

  const groups = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();
    for (const item of visible) map.set(item.letter, [...(map.get(item.letter) ?? []), item]);
    return [...map.entries()];
  }, [visible]);

  const available = new Set(groups.map(([letter]) => letter));

  return (
    <div className={styles.glossary}>
      <div className={styles.glossaryTools}>
        <label className={styles.search}>
          <span className="sr-only">{t('searchLabel')}</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('searchPlaceholder')} />
          {query && <button type="button" onClick={() => setQuery('')} aria-label={t('clear')}>×</button>}
        </label>
        <p className={styles.glossaryCount} aria-live="polite">{t('count', { count: visible.length })}</p>
        <nav className={styles.letters} aria-label={t('lettersLabel')}>
          {alphabet.map((letter) => available.has(letter)
            ? <a key={letter} href={`#letter-${letter}`}>{letter}</a>
            : <span key={letter} aria-hidden="true">{letter}</span>)}
        </nav>
      </div>

      {groups.length === 0 && <p className={styles.glossaryEmpty}>{t('empty')}</p>}

      <div className={styles.glossaryGroups}>
        {groups.map(([letter, items]) => (
          <section key={letter} id={`letter-${letter}`} className={styles.glossaryGroup} aria-labelledby={`letter-${letter}-title`}>
            <h2 id={`letter-${letter}-title`} className={styles.glossaryLetter}>{letter}</h2>
            <dl className={styles.glossaryList}>
              {items.map((item) => (
                <div key={item.id} id={item.id} className={styles.glossaryItem}>
                  <dt>{item.term}</dt>
                  <dd>
                    <p>{item.definition}</p>
                    {item.chapter && (
                      <Link href={`/knowledge/fundamentals#${item.chapter.key}`} className={styles.glossaryChapter}>
                        {t('chapterLink', { number: item.chapter.number, title: item.chapter.title })}<span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
