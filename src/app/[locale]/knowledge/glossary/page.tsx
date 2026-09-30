import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container } from '@/components/layout';
import { PageCTA } from '@/components/sections/PageCTA';
import { KnowledgeNav } from '@/components/knowledge/KnowledgeNav';
import { KnowledgeHero } from '@/components/knowledge/KnowledgeHero';
import { Glossary, type GlossaryTerm } from '@/components/knowledge/Glossary';
import { chapterForTerm, chapters } from '@/lib/knowledge';
import { buildPageMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'knowledge.glossary' });
  return buildPageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    locale,
    path: '/knowledge/glossary',
  });
}

export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'knowledge' });

  const raw = t.raw('glossary.terms') as Record<string, { term: string; definition: string }>;
  const terms: GlossaryTerm[] = Object.entries(raw)
    .map(([id, { term, definition }]) => {
      const chapter = chapterForTerm(id);
      return {
        id,
        term,
        definition,
        // Fold umlauts so "Ä…" is listed under A.
        letter: term.normalize('NFD').charAt(0).toUpperCase(),
        chapter: chapter && {
          key: chapter.key,
          number: String(chapters.indexOf(chapter) + 1).padStart(2, '0'),
          title: t(`fundamentals.chapters.${chapter.key}.title`),
        },
      };
    })
    .sort((a, b) => a.term.localeCompare(b.term, locale, { sensitivity: 'base' }));

  return (
    <>
      <Header />
      <main>
        <KnowledgeNav />
        <KnowledgeHero
          eyebrow={t('glossary.eyebrow')}
          title={t('glossary.title')}
          subtitle={t('glossary.subtitle')}
          meta={[t('glossary.count', { count: terms.length })]}
        />

        <Section background="base">
          <Container>
            <Glossary terms={terms} />
          </Container>
        </Section>

        <PageCTA
          locale={locale as Locale}
          title={t('glossary.cta.title')}
          body={t('glossary.cta.body')}
          primaryHref="/#contact"
          primaryLabel={t('glossary.cta.primary')}
          secondaryHref="/knowledge/fundamentals"
          secondaryLabel={t('glossary.cta.secondary')}
        />
      </main>
      <Footer />
    </>
  );
}
