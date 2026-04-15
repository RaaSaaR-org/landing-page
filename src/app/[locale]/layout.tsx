import type { Metadata } from "next";
import { Space_Grotesk } from 'next/font/google';
import "../globals.css";
import { Analytics } from '@vercel/analytics/react';
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://emai.de';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === 'de';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isGerman
        ? 'EmAI - Physical AI Beratung für Unternehmen | Embodied AI'
        : 'EmAI - Physical AI Consulting for Business | Embodied AI',
      template: '%s | EmAI'
    },
    description: isGerman
      ? 'EmAI Robotics hilft Unternehmen, Physical AI erfolgreich einzusetzen -- mit strategischer Beratung, Praxis-Tests, Workshops und neutraler Bewertung. Unabhängig, europäisch, praxisorientiert.'
      : 'EmAI Robotics helps businesses successfully adopt Physical AI -- through strategic consulting, real-world testing, workshops, and neutral assessment. Independent, European, practice-oriented.',
    keywords: isGerman
      ? ['Physical AI', 'Physical AI Beratung', 'Kognitive Robotik', 'Embodied AI', 'Open-Source KI', 'Robotik-Beratung', 'Workshops', 'Industrie 4.0', 'Automatisierung', 'Fertigung', 'Logistik', 'Europäische Souveränität']
      : ['Physical AI', 'Physical AI Consulting', 'Cognitive Robotics', 'Embodied AI', 'Open-Source AI', 'Robotics Consulting', 'Workshops', 'Industry 4.0', 'Automation', 'Manufacturing', 'Logistics', 'European Sovereignty'],
    authors: [{ name: 'EmAI' }],
    creator: 'EmAI',
    publisher: 'EmAI',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: isGerman ? 'de_DE' : 'en_US',
      url: siteUrl,
      siteName: 'EmAI',
      title: isGerman
        ? 'EmAI - Physical AI erfolgreich einsetzen.'
        : 'EmAI - Make Physical AI Work.',
      description: isGerman
        ? 'Ihr unabhängiger Beratungspartner für Physical AI. Strategie, Praxis-Tests, Workshops und neutrale Bewertung für kognitive Robotik.'
        : 'Your independent consulting partner for Physical AI. Strategy, real-world testing, workshops, and neutral assessment for cognitive robotics.',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'EmAI - Embodied AI',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isGerman
        ? 'EmAI - Physical AI erfolgreich einsetzen.'
        : 'EmAI - Make Physical AI Work.',
      description: isGerman
        ? 'Physical AI Beratung für Unternehmen: Strategie, Praxis-Tests, Workshops und neutrale Bewertung.'
        : 'Physical AI consulting for businesses: strategy, real-world testing, workshops, and neutral assessment.',
      images: ['/og-image.jpg'],
      creator: '@emai_robotics',
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        'de': `${siteUrl}/de`,
        'en': `${siteUrl}/en`,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'de' | 'en')) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages({ locale });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EmAI Robotics GmbH',
    alternateName: 'EmAI',
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    description: locale === 'de'
      ? 'EmAI Robotics hilft Unternehmen, Physical AI erfolgreich einzusetzen -- mit strategischer Beratung, Praxis-Tests, Workshops und neutraler Bewertung.'
      : 'EmAI Robotics helps businesses successfully adopt Physical AI -- through strategic consulting, real-world testing, workshops, and neutral assessment.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Halbergstraße 4',
      postalCode: '66121',
      addressLocality: 'Saarbrücken',
      addressCountry: 'DE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Inquiries',
      email: 'info@EmAI.dev',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
      addressCountry: 'DE'
    },
    service: [
      {
        '@type': 'Service',
        name: locale === 'de' ? 'Strategische Beratung' : 'Strategic Consulting',
        description: locale === 'de'
          ? 'Unabhängige Beratung für den erfolgreichen Einsatz von Physical AI'
          : 'Independent consulting for the successful adoption of Physical AI',
      },
      {
        '@type': 'Service',
        name: locale === 'de' ? 'Praxis-Tests' : 'Real-World Testing',
        description: locale === 'de'
          ? 'Kognitive Roboter in realen Industrieumgebungen testen und bewerten'
          : 'Testing and evaluating cognitive robots in real industrial environments',
      },
      {
        '@type': 'Service',
        name: 'Workshops',
        description: locale === 'de'
          ? 'Hands-on Workshops zu kognitiver Robotik und KI für Unternehmen'
          : 'Hands-on workshops on cognitive robotics and AI for companies',
      },
    ],
  };

  return (
    <html lang={locale} className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} font-sans antialiased bg-base text-text-primary`}>
        <NextIntlClientProvider messages={messages}>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
