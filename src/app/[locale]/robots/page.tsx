import type { Metadata } from 'next';
import { LegacyRedirect, legacyRedirectMetadata } from '@/components/layout/LegacyRedirect';

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  return legacyRedirectMetadata(`/${locale}/knowledge/robots`);
}

/** The robot registry moved into the knowledge area; keep old links working. */
export default async function LegacyRobotsPage({ params }: Params) {
  const { locale } = await params;
  return <LegacyRedirect target={`/${locale}/knowledge/robots`} />;
}
