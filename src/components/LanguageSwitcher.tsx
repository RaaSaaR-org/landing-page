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
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 border border-gray-200">
      <button
        onClick={() => handleLanguageChange('de')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
          locale === 'de'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
        }`}
        aria-label="Switch to German"
      >
        DE
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
