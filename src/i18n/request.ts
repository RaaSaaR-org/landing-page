import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // For static export, locale comes from the [locale] segment, not headers
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as 'de' | 'en')) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default
  };
});
