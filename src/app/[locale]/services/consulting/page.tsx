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
  const t = await getTranslations({ locale, namespace: 'services.detail.consulting' });
  return {
    title: t('title'),
    description: t('metaDescription'),
    alternates: buildAlternates('/services/consulting', locale),
  };
}

export default async function ConsultingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'services.detail.consulting' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const ld = serviceBreadcrumb({
    locale,
    servicesLabel: tNav('services'),
    serviceTitle: t('title'),
    servicePath: '/services/consulting',
  });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(ld) }}
      />
      <Header />
      <main>
        <ServiceDetailLayout serviceKey="consulting" />
      </main>
      <Footer />
    </>
  );
}
