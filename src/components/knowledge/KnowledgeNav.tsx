'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import styles from './Knowledge.module.css';

const items = [
  { key: 'overview', href: '/knowledge' },
  { key: 'fundamentals', href: '/knowledge/fundamentals' },
  { key: 'robots', href: '/knowledge/robots' },
  { key: 'glossary', href: '/knowledge/glossary' },
] as const;

/** Sticky sub-navigation that ties the knowledge pages together as one area. */
export function KnowledgeNav() {
  const t = useTranslations('knowledge.nav');
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/knowledge' ? pathname === href : pathname.startsWith(href));

  return (
    <nav className={styles.subnav} aria-label={t('label')}>
      <div className={styles.subnavInner}>
        <span className={styles.subnavLabel}><span aria-hidden="true" />{t('label')}</span>
        <ul>
          {items.map(({ key, href }) => (
            <li key={key}>
              <Link href={href} aria-current={isActive(href) ? 'page' : undefined} className={styles.subnavLink}>
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
