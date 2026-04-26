'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackCTAClick } from '@/lib/analytics';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Logo } from '@/components/ui/Logo';
import { Link } from '@/i18n/routing';
import { NavDropdown, type DropdownItem } from './NavDropdown';

const serviceKeys = ['consulting', 'testing', 'workshops', 'data'] as const;

export function Header() {
  const tNav = useTranslations('nav');
  const tServices = useTranslations('services.items');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const serviceItems: DropdownItem[] = [
    ...serviceKeys.map((key) => ({
      label: tServices(`${key}.title`),
      href: `/services/${key}`,
    })),
    { label: tNav('servicesOverview'), href: '/#services' },
  ];

  const pageLinks: { name: string; href: string }[] = [
    { name: tNav('about'), href: '/about' },
    { name: tNav('useCases'), href: '/use-cases' },
    { name: tNav('news'), href: '/news' },
    { name: tNav('faq'), href: '/#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
          <Link href="/" aria-label="EmAI">
            <Logo size={42} showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <NavDropdown
              label={tNav('services')}
              items={serviceItems}
              onItemClick={handleNavClick}
            />
            {pageLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => handleNavClick(link.name)}
                className="text-text-secondary hover:text-primary-500 font-medium transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
            <LanguageSwitcher />
            <Link
              href="/#contact"
              onClick={() => trackCTAClick(tNav('contact'), 'header')}
              className="ml-2 px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-400 transition-all font-medium shadow-md hover:shadow-orange whitespace-nowrap"
            >
              {tNav('contact')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-primary-500 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
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
            className="md:hidden bg-surface border-t border-border-subtle overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <NavDropdown
                label={tNav('services')}
                items={serviceItems}
                mode="accordion"
                onItemClick={handleNavClick}
              />
              {pageLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.name)}
                  className="block text-text-secondary hover:text-primary-500 font-medium py-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 pb-4 flex justify-center">
                <LanguageSwitcher />
              </div>
              <Link
                href="/#contact"
                onClick={() => {
                  trackCTAClick(tNav('contact'), 'mobile_header');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-400 transition-colors font-medium text-center"
              >
                {tNav('contact')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
