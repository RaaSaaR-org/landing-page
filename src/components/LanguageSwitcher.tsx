'use client';

import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  const [basePath, setBasePath] = useState('');

  useEffect(() => {
    const path = window.location.pathname;

    // Handle static export .html extensions
    // Patterns: /basePath/de.html, /basePath/de, /basePath/de/page.html, /basePath/de/page
    const match = path.match(/^(.*?)\/(?:en|de)(?:\.html|\/|$)/);
    const detectedBasePath = match?.[1] || '';
    setBasePath(detectedBasePath);

    // Check if path contains /en (with or without .html)
    if (path.match(/\/en(?:\.html|\/|$)/)) {
      setLocale('en');
    } else {
      setLocale('de');
    }
  }, []);

  const handleLanguageChange = (newLocale: 'de' | 'en') => {
    const path = window.location.pathname;

    // Get current page path after locale (e.g., /impressum from /de/impressum)
    const pageMatch = path.match(/\/(?:en|de)(?:\.html)?(\/.*?)(?:\.html)?$/);
    const pagePath = pageMatch?.[1] || '';

    // Build new URL - for root pages, just use locale
    if (pagePath && pagePath !== '/') {
      window.location.href = `${basePath}/${newLocale}${pagePath}`;
    } else {
      window.location.href = `${basePath}/${newLocale}`;
    }
  };

  return (
    <div className="flex items-center gap-2 bg-surface-elevated rounded-lg p-1 border border-border-subtle">
      <button
        onClick={() => handleLanguageChange('de')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated ${
          locale === 'de'
            ? 'bg-primary-500 text-white'
            : 'text-text-secondary hover:text-text-primary hover:bg-surface'
        }`}
        aria-label="Switch to German"
        aria-pressed={locale === 'de'}
      >
        DE
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated ${
          locale === 'en'
            ? 'bg-primary-500 text-white'
            : 'text-text-secondary hover:text-text-primary hover:bg-surface'
        }`}
        aria-label="Switch to English"
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
    </div>
  );
}
