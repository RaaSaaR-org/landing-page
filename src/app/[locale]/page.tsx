import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhyEmaiSection } from '@/components/sections/WhyEmaiSection';
import { MembershipSection } from '@/components/sections/MembershipSection';
import { FAQ } from '@/components/sections/FAQ';
import { ContactForm } from '@/components/sections/ContactForm';
import { buildAlternates } from '@/lib/seo';
import { faqJsonLd, jsonLdScript } from '@/lib/jsonld';

const faqKeys = [
  'embodiedAi',
  'cognitiveRobots',
  'workshops',
  'dataCollection',
  'openSource',
  'humanAssist',
  'consulting',
  'getStarted',
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/', locale),
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFaq = await getTranslations({ locale, namespace: 'faq' });
  const faqItems = faqKeys.map((key) => ({
    q: tFaq(`questions.${key}.q`),
    a: tFaq(`questions.${key}.a`),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd(faqItems)) }}
      />
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <WhyEmaiSection />
        <MembershipSection />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
