import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { ServiceDetailLayout } from '@/components/sections/ServiceDetailLayout';
import { buildAlternates } from '@/lib/seo';
import { jsonLdScript, serviceBreadcrumb } from '@/lib/jsonld';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services.detail.data' });
  return {
    title: t('title'),
    description: t('metaDescription'),
    alternates: buildAlternates('/services/data', locale),
  };
}

export default async function DataPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'services.detail.data' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const ld = serviceBreadcrumb({
    locale,
    servicesLabel: tNav('services'),
    serviceTitle: t('title'),
    servicePath: '/services/data',
  });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(ld) }}
      />
      <Header />
      <main>
        <ServiceDetailLayout serviceKey="data" />
      </main>
      <Footer />
    </>
  );
}
