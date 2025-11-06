# RaaSaaR Landing Page

A modern, professional landing page bringing Robots as a Service to Saarland, Germany. Built with Next.js 15 and full bilingual support (German/English).

## 🚀 About RaaSaaR

RaaSaaR (Robots as a Service + Saarland) is a regional robotics platform bringing cutting-edge automation to businesses and municipalities in Saarland. We focus on making robotics accessible without capital investment, addressing the region's labor shortage and supporting industrial transformation.

## ✨ Features

- **Bilingual Support** - Full German/English i18n with language switcher
- **Hero Section** - Compelling introduction to RaaSaaR's regional mission
- **Problem/Solution** - Addressing Saarland's labor shortage and industry challenges
- **Regional Advantage** - Showcasing DFKI, ZeMA, and Saarland's research ecosystem
- **Use Cases** - Industrial automation and municipal services applications
- **FAQ** - Answers to practical questions about RaaS implementation
- **Contact Form** - Inquiry capture with organization type selection (industrial/municipal)

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **i18n**: next-intl (German/English)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Analytics**: Google Analytics 4, Hotjar, Vercel Analytics
- **Language**: TypeScript

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://raasaar.de
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

## 🌍 Internationalization

The site supports German (default) and English:
- Routes: `/` or `/de` (German), `/en` (English)
- Language switcher in header
- All content translated in `/src/i18n/locales/`

## 🏗️ Build

```bash
npm run build
npm start
```

## 🎨 Design System

- **Primary Color**: #0066FF
- **Secondary Color**: #00CC66
- **Font**: Inter
- **Breakpoints**: Mobile (320-767px), Tablet (768-1023px), Desktop (1024px+)

## 📄 License

MIT
