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
        ? 'EmAI - Kognitive Robotik verstehen und einsetzen | Embodied AI'
        : 'EmAI - Understand and Deploy Cognitive Robots | Embodied AI',
      template: '%s | EmAI'
    },
    description: isGerman
      ? 'EmAI (Embodied AI) hilft Unternehmen, kognitive Roboter zu verstehen, zu bewerten und produktiv einzusetzen. Praxis-Tests, Datenerhebung, Workshops und Beratung -- unabhängig, europäisch, praxisorientiert.'
      : 'EmAI (Embodied AI) helps companies understand, evaluate, and productively deploy cognitive robots. Real-world testing, data collection, workshops, and consulting -- independent, European, practice-oriented.',
    keywords: isGerman
      ? ['Kognitive Robotik', 'Embodied AI', 'Open-Source KI', 'Robotik-Beratung', 'Workshops', 'Industrie 4.0', 'Automatisierung', 'Fertigung', 'Logistik', 'Deutsche Industrie', 'Europäische Souveränität']
      : ['Cognitive Robotics', 'Embodied AI', 'Open-Source AI', 'Robotics Consulting', 'Workshops', 'Industry 4.0', 'Automation', 'Manufacturing', 'Logistics', 'German Industry', 'European Sovereignty'],
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
        ? 'EmAI - Kognitive Roboter verstehen. Richtig einsetzen.'
        : 'EmAI - Understand Cognitive Robots. Deploy Them Right.',
      description: isGerman
        ? 'Embodied AI für die Industrie. Praxis-Tests, Datenerhebung, Workshops und Beratung für kognitive Robotik.'
        : 'Embodied AI for industry. Real-world testing, data collection, workshops, and consulting for cognitive robotics.',
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
        ? 'EmAI - Kognitive Roboter verstehen. Richtig einsetzen.'
        : 'EmAI - Understand Cognitive Robots. Deploy Them Right.',
      description: isGerman
        ? 'Embodied AI: Praxis-Tests, Workshops und Beratung für kognitive Robotik in der Industrie.'
        : 'Embodied AI: Real-world testing, workshops, and consulting for cognitive robotics in industry.',
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
    name: 'EmAI',
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    description: locale === 'de'
      ? 'EmAI (Embodied AI) hilft Unternehmen, kognitive Roboter zu verstehen, zu bewerten und einzusetzen -- mit Praxis-Tests, Daten und Workshops.'
      : 'EmAI (Embodied AI) helps companies understand, evaluate, and deploy cognitive robots -- through real-world testing, data, and workshops.',
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
      {
        '@type': 'Service',
        name: locale === 'de' ? 'Beratung' : 'Consulting',
        description: locale === 'de'
          ? 'Strategische Beratung für den Einsatz kognitiver Roboter'
          : 'Strategic consulting for deploying cognitive robots',
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
