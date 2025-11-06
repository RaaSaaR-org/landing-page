'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: 'de' | 'en') => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-white/10">
      <button
        onClick={() => handleLanguageChange('de')}
        disabled={isPending}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
          locale === 'de'
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Switch to German"
      >
        DE
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        disabled={isPending}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
