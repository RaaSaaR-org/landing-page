'use client';

import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<'de' | 'en'>('de');

  useEffect(() => {
    // Get locale from URL path
    const path = window.location.pathname;
    if (path.startsWith('/en')) {
      setLocale('en');
    } else {
      setLocale('de');
    }
  }, []);

  const handleLanguageChange = (newLocale: 'de' | 'en') => {
    // Direct navigation to ensure proper locale switching
    window.location.href = `/${newLocale}`;
  };

  return (
    <div className="flex items-center gap-2 bg-surface-elevated rounded-lg p-1 border border-border-subtle">
      <button
        onClick={() => handleLanguageChange('de')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
          locale === 'de'
            ? 'bg-primary-500 text-white'
            : 'text-text-secondary hover:text-text-primary hover:bg-surface'
        }`}
        aria-label="Switch to German"
      >
        DE
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
          locale === 'en'
            ? 'bg-primary-500 text-white'
            : 'text-text-secondary hover:text-text-primary hover:bg-surface'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
