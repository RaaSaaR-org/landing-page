'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getStoredConsent, setStoredConsent } from '@/lib/consent';

export function CookieConsent() {
  const t = useTranslations('consent');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const decision = getStoredConsent();
    if (decision === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const decide = (choice: 'accepted' | 'rejected') => {
    setStoredConsent(choice);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('title')}
      className="fixed bottom-0 left-0 right-0 z-[200] bg-surface-elevated border-t border-border-subtle shadow-2xl"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1 text-sm text-text-secondary">
          <p className="font-semibold text-text-primary mb-1">{t('title')}</p>
          <p>
            {t('body')}{' '}
            <Link
              href="/datenschutz"
              className="text-primary-400 underline hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
            >
              {t('privacyLink')}
            </Link>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:flex-shrink-0">
          <button
            type="button"
            onClick={() => decide('rejected')}
            className="px-5 py-2.5 text-sm font-medium border border-border-subtle text-text-secondary hover:text-text-primary hover:border-primary-500/50 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            {t('reject')}
          </button>
          <button
            type="button"
            onClick={() => decide('accepted')}
            className="px-5 py-2.5 text-sm font-semibold bg-primary-500 text-white hover:bg-primary-400 rounded-lg transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
