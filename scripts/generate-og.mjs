#!/usr/bin/env node
// Generates public/og-image.png at 1200x630 using satori + @resvg/resvg-js.
// Run: npm run generate-og
import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const fontUrl =
  'https://fonts.gstatic.com/s/spacegrotesk/v15/V8mDoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7aUUM.woff2';
// Satori needs TTF/OTF, not WOFF2. Use a CSS-API endpoint that serves TTF.
const ttfUrl =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap';

async function fetchSpaceGroteskBoldTTF() {
  // Get the @font-face block and extract the TTF link
  const cssRes = await fetch(ttfUrl, {
    headers: {
      // User-Agent without "woff2" forces TTF
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36',
    },
  });
  const css = await cssRes.text();
  const match = css.match(/src:\s*url\(([^)]+)\)/);
  if (!match) throw new Error('Could not find font URL in CSS:\n' + css.slice(0, 400));
  const fontRes = await fetch(match[1]);
  return Buffer.from(await fontRes.arrayBuffer());
}

const BASE = '#141414';
const SURFACE = '#1F1F1F';
const ORANGE = '#FF6700';
const TEAL = '#2DD4BF';
const TEXT = '#F5F5F4';
const TEXT_SECONDARY = '#A8A29E';

const tree = {
  type: 'div',
  props: {
    style: {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px',
      background: `linear-gradient(135deg, ${BASE} 0%, ${SURFACE} 100%)`,
      color: TEXT,
      fontFamily: 'Space Grotesk',
      position: 'relative',
    },
    children: [
      // Top: brand
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '32px',
            fontWeight: 700,
          },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: ORANGE,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '24px',
                },
                children: 'E',
              },
            },
            { type: 'span', props: { children: 'EmAI' } },
          ],
        },
      },

      // Middle: title + tagline
      {
        type: 'div',
        props: {
          style: { display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '20px',
                  fontFamily: 'Space Grotesk',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: ORANGE,
                  fontWeight: 700,
                },
                children: 'Embodied AI · Cognitive Robotics',
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '76px',
                  lineHeight: 1.05,
                  fontWeight: 700,
                  color: TEXT,
                },
                children: 'Physical AI für die Industrie.',
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  width: '120px',
                  height: '6px',
                  borderRadius: '3px',
                  background: `linear-gradient(90deg, ${ORANGE} 0%, ${TEAL} 100%)`,
                },
                children: '',
              },
            },
            {
              type: 'div',
              props: {
                style: { fontSize: '28px', color: TEXT_SECONDARY, lineHeight: 1.4 },
                children:
                  'Strategische Beratung, Praxis-Tests, Workshops — vom Use Case zum produktiven Roboter-Piloten.',
              },
            },
          ],
        },
      },

      // Footer line
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '20px',
            color: TEXT_SECONDARY,
          },
          children: [
            { type: 'span', props: { children: 'emai.dev' } },
            {
              type: 'span',
              props: {
                style: { color: ORANGE, fontWeight: 700 },
                children: 'Made in Europe',
              },
            },
          ],
        },
      },
    ],
  },
};

async function main() {
  console.log('Fetching Space Grotesk Bold...');
  const fontData = await fetchSpaceGroteskBoldTTF();

  console.log('Rendering SVG via satori...');
  const svg = await satori(tree, {
    width: 1200,
    height: 630,
    fonts: [{ name: 'Space Grotesk', data: fontData, weight: 700, style: 'normal' }],
  });

  console.log('Rasterizing to PNG via resvg-js...');
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();

  const outPath = join(ROOT, 'public', 'og-image.png');
  await writeFile(outPath, png);
  console.log(`Wrote ${outPath} (${(png.length / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

void fontUrl;
