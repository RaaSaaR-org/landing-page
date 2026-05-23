# EmAI Landing Page

A modern, professional landing page for EmAI (Embodied AI) -- helping companies understand and deploy cognitive robots. Built with Next.js 15 and full bilingual support (German/English).

## About EmAI

EmAI (Embodied AI) helps companies understand and use cognitive robots powered by open-source AI. We bring robots into real environments, collect real-world data on what works (and what doesn't), and share that knowledge through testing, workshops, and consulting. Independent. European. Practice-oriented.

## Features

- **Bilingual Support** - Full German/English i18n with language switcher
- **Dark Theme** - Professional dark UI with orange accents
- **Hero Section** - Compelling introduction to Embodied AI
- **Problem Section** - Why companies struggle to evaluate cognitive robots
- **Services** - Real-world testing, data collection, workshops, consulting
- **Why EmAI** - Open-source AI, European sovereignty, human-first approach
- **FAQ** - Answers to questions about cognitive robotics and our services
- **Contact** - Inquiry capture for workshops, consulting, and testing

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **i18n**: next-intl (German/English)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Language**: TypeScript

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:4000](http://localhost:4000)

## Configuration

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://emai.dev
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
- **Font**: Space Grotesk
- **Theme**: Dark only

## License

MIT
