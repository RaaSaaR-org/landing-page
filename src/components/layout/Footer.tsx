'use client';

import { useTranslations } from 'next-intl';
import { Logo } from '@/components/ui/Logo';
import { MembershipBadge } from '@/components/ui/MembershipBadge';
import { Link } from '@/i18n/routing';

const serviceKeys = ['consulting', 'testing', 'workshops', 'data'] as const;

export function Footer() {
  const t = useTranslations('footer');
  const tServices = useTranslations('services.items');
  const tNav = useTranslations('nav');

  const linkClass = 'text-sm text-text-secondary hover:text-primary-500 transition-colors';
  const headingClass = 'text-text-primary font-semibold mb-4';

  return (
    <footer className="bg-surface text-text-secondary border-t border-border-subtle">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="mb-3">
              <Logo size={42} showText={true} />
            </div>
            <p className="text-sm italic text-text-muted mb-4">
              {t('philosophy')}
            </p>
            <p className="text-sm text-text-secondary mb-4">
              {t('tagline')}
            </p>
            <p className="text-xs text-text-muted mb-5">
              {t('description')}
            </p>
            <div className="flex items-center gap-3">
              <MembershipBadge size={56} label={t('membership.badgeLabel')} />
              <span className="text-xs text-text-muted leading-snug max-w-[10rem]">
                {t('membership.badgeLabel')}
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className={headingClass}>{t('links.services')}</h3>
            <ul className="space-y-2">
              {serviceKeys.map((key) => (
                <li key={key}>
                  <Link href={`/services/${key}`} className={linkClass}>
                    {tServices(`${key}.title`)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#services" className={linkClass}>
                  {tNav('servicesOverview')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={headingClass}>{t('links.company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className={linkClass}>
                  {t('links.about')}
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className={linkClass}>
                  {t('links.useCases')}
                </Link>
              </li>
              <li>
                <Link href="/news" className={linkClass}>
                  {t('links.news')}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className={linkClass}>
                  {t('links.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className={headingClass}>{t('links.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/impressum" className={linkClass}>
                  {t('links.imprint')}
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className={linkClass}>
                  {t('links.privacy')}
                </Link>
              </li>
              <li>
                <a href="mailto:info@EmAI.dev" className={linkClass}>
                  info@EmAI.dev
                </a>
              </li>
            </ul>
            <p className="text-xs text-primary-500 font-semibold mt-6">
              {t('madeIn')}
            </p>
          </div>
        </div>

        {/* Newsletter mini-CTA */}
        <div className="mt-12 pt-8 border-t border-border-subtle">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-text-primary font-semibold mb-1">{t('newsletterTitle')}</h3>
              <p className="text-sm text-text-secondary">{t('newsletterBody')}</p>
            </div>
            <a
              href="mailto:info@EmAI.dev?subject=Newsletter"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-border-subtle hover:border-primary-500/50 hover:text-primary-400 text-text-primary rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              {t('newsletterCta')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          <p className="text-sm text-text-muted text-center">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
