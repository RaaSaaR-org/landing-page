import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localePrefix: 'always' // For static export, always include locale in path
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
