'use client';

import { useTranslations } from 'next-intl';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-surface text-text-secondary border-t border-border-subtle">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="mb-4">
              <Logo size={32} showText={true} />
            </div>
            <p className="text-sm text-text-secondary mb-4">
              {t('tagline')}
            </p>
            <p className="text-xs text-text-muted">
              {t('description')}
            </p>
          </div>

          {/* Contact */}
          <div className="text-right">
            <h3 className="text-text-primary font-semibold mb-4">{t('links.contact')}</h3>
            <a
              href="mailto:contact@emai.de"
              className="text-sm hover:text-primary-500 transition-colors"
            >
              contact@emai.de
            </a>
            <p className="text-xs text-primary-500 font-semibold mt-4">
              {t('madeIn')}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-subtle">
          <p className="text-sm text-text-muted text-center">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
