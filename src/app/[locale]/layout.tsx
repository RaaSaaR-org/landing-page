import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Analytics } from '@vercel/analytics/react';
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raasaar.de';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === 'de';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isGerman
        ? 'RaaSaaR - Robotik-Lösungen für das Saarland | Robots as a Service'
        : 'RaaSaaR - Robotics Solutions for Saarland | Robots as a Service',
      template: '%s | RaaSaaR'
    },
    description: isGerman
      ? 'RaaSaaR bringt modernste Robotik-Technologie zu Unternehmen und Kommunen im Saarland. Robots as a Service ohne Investitionskosten für Industrie, Fertigung, Logistik und kommunale Dienste.'
      : 'RaaSaaR brings cutting-edge robotics technology to businesses and municipalities in Saarland. Robots as a Service without capital investment for industry, manufacturing, logistics, and municipal services.',
    keywords: isGerman
      ? ['Robotik Saarland', 'Robots as a Service', 'RaaS', 'Industrie 4.0', 'Automatisierung', 'DFKI', 'Fachkräftemangel', 'Kommunale Dienste', 'Straßenreinigung', 'Fertigung']
      : ['Robotics Saarland', 'Robots as a Service', 'RaaS', 'Industry 4.0', 'Automation', 'DFKI', 'Labor shortage', 'Municipal services', 'Street cleaning', 'Manufacturing'],
    authors: [{ name: 'RaaSaaR' }],
    creator: 'RaaSaaR',
    publisher: 'RaaSaaR',
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
      siteName: 'RaaSaaR',
      title: isGerman
        ? 'RaaSaaR - Robotik-Lösungen für das Saarland'
        : 'RaaSaaR - Robotics Solutions for Saarland',
      description: isGerman
        ? 'Robots as a Service für Unternehmen und Kommunen im Saarland. Modernste Robotik ohne Investitionskosten.'
        : 'Robots as a Service for businesses and municipalities in Saarland. Cutting-edge robotics without capital investment.',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'RaaSaaR - Robotics Solutions for Saarland',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isGerman
        ? 'RaaSaaR - Robotik-Lösungen für das Saarland'
        : 'RaaSaaR - Robotics Solutions for Saarland',
      description: isGerman
        ? 'Robots as a Service für das Saarland. Praktische Robotik-Lösungen ohne Investitionskosten.'
        : 'Robots as a Service for Saarland. Practical robotics solutions without capital investment.',
      images: ['/og-image.jpg'],
      creator: '@raasaar',
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
  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RaaSaaR',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: locale === 'de'
      ? 'Robotik-Lösungen für Unternehmen und Kommunen im Saarland - Robots as a Service'
      : 'Robotics solutions for businesses and municipalities in Saarland - Robots as a Service',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Inquiries',
      email: 'kontakt@raasaar.de',
    },
    areaServed: {
      '@type': 'State',
      name: 'Saarland',
      addressCountry: 'DE'
    },
    service: {
      '@type': 'Service',
      name: 'Robots as a Service',
      description: locale === 'de'
        ? 'Robotik-Lösungen für Industrie und Kommunen ohne Investitionskosten'
        : 'Robotics solutions for industry and municipalities without capital investment',
      provider: {
        '@type': 'Organization',
        name: 'RaaSaaR',
      },
    },
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
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
