import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const namespaces = ['common', 'home', 'services', 'workshops', 'about', 'useCases', 'news', 'legal'] as const;

export default getRequestConfig(async ({ locale }) => {
  // For static export, locale comes from the [locale] segment, not headers
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as 'de' | 'en')) {
    locale = routing.defaultLocale;
  }

  const loaded = await Promise.all(
    namespaces.map((ns) => import(`./locales/${locale}/${ns}.json`).then((m) => m.default))
  );

  const messages = loaded.reduce((acc, partial) => ({ ...acc, ...partial }), {} as Record<string, unknown>);

  return {
    locale,
    messages,
  };
});
