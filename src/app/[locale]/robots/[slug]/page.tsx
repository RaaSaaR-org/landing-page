import type { Metadata } from 'next';
import { LegacyRedirect, legacyRedirectMetadata } from '@/components/layout/LegacyRedirect';
import { routing } from '@/i18n/routing';
import { robotSlugs } from '@/lib/robots';

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => robotSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  return legacyRedirectMetadata(`/${locale}/knowledge/robots/${slug}`);
}

/** The robot registry moved into the knowledge area; keep old links working. */
export default async function LegacyRobotPage({ params }: Params) {
  const { locale, slug } = await params;
  return <LegacyRedirect target={`/${locale}/knowledge/robots/${slug}`} />;
}
