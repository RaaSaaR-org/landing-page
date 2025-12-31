import type { Metadata } from "next";
import "../globals.css";
import { Analytics } from '@vercel/analytics/react';
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://emai.de';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === 'de';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isGerman
        ? 'EmAI - Humanoide Robotik für die deutsche Industrie | Robots as a Service'
        : 'EmAI - Humanoid Robotics for German Industry | Robots as a Service',
      template: '%s | EmAI'
    },
    description: isGerman
      ? 'EmAI demokratisiert den Zugang zu humanoider Robotik für deutsche Fertigung, Logistik und Lagerhaltung. Intelligentes Flottenmanagement und flexible Mietmodelle ohne Investitionskosten.'
      : 'EmAI democratizes access to humanoid robotics for German manufacturing, logistics, and warehouse operations. Intelligent fleet management and flexible rental models without capital investment.',
    keywords: isGerman
      ? ['Humanoide Robotik', 'Robots as a Service', 'RaaS', 'Industrie 4.0', 'Automatisierung', 'Flottenmanagement', 'Fertigung', 'Logistik', 'Lager', 'Deutsche Industrie']
      : ['Humanoid Robotics', 'Robots as a Service', 'RaaS', 'Industry 4.0', 'Automation', 'Fleet Management', 'Manufacturing', 'Logistics', 'Warehouse', 'German Industry'],
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
        ? 'EmAI - Humanoide Robotik. Zugänglich für alle.'
        : 'EmAI - Humanoid Robotics. Accessible to All.',
      description: isGerman
        ? 'Intelligentes Flottenmanagement und flexible Robotik-Mietmodelle für deutsche Fertigung, Logistik und Lagerhaltung.'
        : 'Intelligent fleet management and flexible robotics rental models for German manufacturing, logistics, and warehouses.',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'EmAI - Humanoid Robotics. Accessible to All.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isGerman
        ? 'EmAI - Humanoide Robotik. Zugänglich für alle.'
        : 'EmAI - Humanoid Robotics. Accessible to All.',
      description: isGerman
        ? 'Robots as a Service für deutsche Industrie. Humanoide Robotik ohne Investitionskosten.'
        : 'Robots as a Service for German industry. Humanoid robotics without capital investment.',
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
    logo: `${siteUrl}/logo.png`,
    description: locale === 'de'
      ? 'EmAI demokratisiert den Zugang zu humanoider Robotik für deutsche Fertigung, Logistik und Lagerhaltung.'
      : 'EmAI democratizes access to humanoid robotics for German manufacturing, logistics, and warehouse operations.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Inquiries',
      email: 'contact@emai.de',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
      addressCountry: 'DE'
    },
    service: {
      '@type': 'Service',
      name: 'Robots as a Service',
      description: locale === 'de'
        ? 'Humanoide Robotik für Fertigung, Logistik und Lager ohne Investitionskosten'
        : 'Humanoid robotics for manufacturing, logistics, and warehouses without capital investment',
      provider: {
        '@type': 'Organization',
        name: 'EmAI',
      },
    },
  };

  return (
    <html lang={locale} className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-base text-text-primary">
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
