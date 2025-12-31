'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackCTAClick } from '@/lib/analytics';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export function Header() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [locale, setLocale] = useState<'de' | 'en'>('de');

  const navLinks = [
    { name: t('features'), href: '#features' },
    { name: t('useCases'), href: '#use-cases' },
    { name: t('about'), href: '#about' },
    { name: t('faq'), href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get locale from URL path
    const path = window.location.pathname;
    if (path.startsWith('/en')) {
      setLocale('en');
    } else {
      setLocale('de');
    }
  }, []);

  const handleNavClick = (linkName: string) => {
    trackCTAClick(linkName, 'header_navigation');
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-surface shadow-lg border-b border-border-subtle'
          : 'bg-base/98 backdrop-blur-md border-b border-border-subtle'
      }`}
    >
      <nav className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Em</span>
            </div>
            <span className="font-bold text-xl text-text-primary">EmAI</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleNavClick(link.name)}
                className="text-text-secondary hover:text-primary-500 font-medium transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
            <LanguageSwitcher />
            <a
              href="#contact"
              onClick={() => trackCTAClick(t('contact'), 'header')}
              className="ml-2 px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-400 transition-all font-medium shadow-md hover:shadow-orange whitespace-nowrap"
            >
              {t('contact')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-primary-500"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t border-border-subtle"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.name)}
                  className="block text-text-secondary hover:text-primary-500 font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 pb-4 flex justify-center">
                <LanguageSwitcher />
              </div>
              <a
                href="#contact"
                onClick={() => {
                  trackCTAClick(t('contact'), 'mobile_header');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-400 transition-colors font-medium text-center"
              >
                {t('contact')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
