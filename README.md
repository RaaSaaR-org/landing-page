# EmAI Landing Page

A modern, professional landing page for EmAI - democratizing access to humanoid robotics for German manufacturing, logistics, and warehouse operations. Built with Next.js 15 and full bilingual support (German/English).

## About EmAI

EmAI offers Robots as a Service (RaaS) for German manufacturing, logistics, and warehouse operations. We rent humanoid robots to businesses with a complete service package including our proprietary software platform for fleet management, training, reporting, security, and maintenance. Simple. Scalable. EU-compliant.

## Features

- **Bilingual Support** - Full German/English i18n with language switcher
- **Dark Theme** - Professional dark UI with orange accents
- **Hero Section** - Compelling introduction to EmAI's mission
- **Problem/Solution** - Addressing German industry challenges
- **Use Cases** - Manufacturing, logistics, and warehouse applications
- **FAQ** - Answers to practical questions about RaaS implementation
- **Contact Form** - Inquiry capture with industry type selection

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **i18n**: next-intl (German/English)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Analytics**: Google Analytics 4, Hotjar, Vercel Analytics
- **Language**: TypeScript

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Configuration

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://emai.de
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

## Internationalization

The site supports German (default) and English:
- Routes: `/` or `/de` (German), `/en` (English)
- Language switcher in header
- All content translated in `/src/i18n/locales/`

## Build

```bash
npm run build
npm start
```

## Design System

- **Primary Color**: #FF6700 (Caltrans Orange)
- **Secondary Color**: #2DD4BF (Teal)
- **Background**: #141414 (Dark base)
- **Font**: System UI
- **Theme**: Dark only

## License

MIT
