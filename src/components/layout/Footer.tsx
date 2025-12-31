'use client';

import { Link } from '@/i18n/routing';
import { trackCTAClick } from '@/lib/analytics';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-surface text-text-secondary border-t border-border-subtle">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Logo size={32} showText={true} />
            </Link>
            <p className="text-sm text-text-secondary mb-4">
              {t('tagline')}
            </p>
            <p className="text-xs text-text-muted mb-6">
              {t('description')}
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary-500 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">{t('links.company')}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  onClick={() => trackCTAClick(t('links.about'), 'footer')}
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  {t('links.about')}
                </a>
              </li>
              <li>
                <a
                  href="#partners"
                  onClick={() => trackCTAClick(t('links.partners'), 'footer')}
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  {t('links.partners')}
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  onClick={() => trackCTAClick(t('links.careers'), 'footer')}
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  {t('links.careers')}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">{t('links.resources')}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#blog"
                  onClick={() => trackCTAClick(t('links.blog'), 'footer')}
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  {t('links.blog')}
                </a>
              </li>
              <li>
                <a
                  href="#documentation"
                  onClick={() => trackCTAClick(t('links.documentation'), 'footer')}
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  {t('links.documentation')}
                </a>
              </li>
              <li>
                <a
                  href="#support"
                  onClick={() => trackCTAClick(t('links.support'), 'footer')}
                  className="text-sm hover:text-primary-500 transition-colors"
                >
                  {t('links.support')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">{t('links.contact')}</h3>
            <ul className="space-y-3 text-sm mb-6">
              <li>
                <a href="mailto:contact@emai.de" className="hover:text-primary-500 transition-colors">
                  contact@emai.de
                </a>
              </li>
              <li className="text-text-muted">
                Deutschland
              </li>
            </ul>
            <p className="text-xs text-primary-500 font-semibold">
              {t('madeIn')}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-subtle">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-text-muted">
              {t('copyright')}
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-text-muted hover:text-primary-500 transition-colors"
              >
                {t('links.privacy')}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-text-muted hover:text-primary-500 transition-colors"
              >
                {t('links.terms')}
              </Link>
              <Link
                href="/imprint"
                className="text-sm text-text-muted hover:text-primary-500 transition-colors"
              >
                {t('links.imprint')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
