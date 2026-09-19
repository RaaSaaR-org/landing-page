#!/usr/bin/env node
// Rebuild both localized 1200×630 share cards and the legacy German fallback.
// Run: npm run generate-og. The font is cached after the first successful download.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'og');
const FONT_CACHE = join(ROOT, 'node_modules', '.cache', 'emai-og', 'space-grotesk-700.ttf');
const FONT_CSS = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap';
const COLOR = { background: '#090c0f', orange: '#ff6700', text: '#f5f5f4', secondary: '#a6adb3' };

async function fetchChecked(url, options = {}) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`Font download failed: HTTP ${response.status} from ${url}`);
  return response;
}

function isFont(data) {
  return data.length > 1000 && (data.readUInt32BE(0) === 0x00010000 || ['OTTO', 'wOFF'].includes(data.toString('ascii', 0, 4)));
}

async function loadFont() {
  try {
    const cached = await readFile(FONT_CACHE);
    if (isFont(cached)) return cached;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  console.log('Downloading Space Grotesk Bold (cached for subsequent runs)...');
  const css = await (await fetchChecked(FONT_CSS, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36' },
  })).text();
  const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!url || !url.startsWith('https://fonts.gstatic.com/')) throw new Error('Google Fonts did not return an expected font URL.');
  const font = Buffer.from(await (await fetchChecked(url)).arrayBuffer());
  if (!isFont(font)) throw new Error('Downloaded font is not a supported TTF, OTF, or WOFF font.');
  await mkdir(dirname(FONT_CACHE), { recursive: true });
  await writeFile(FONT_CACHE, font);
  return font;
}

const node = (type, style, children, extra = {}) => ({ type, props: { style, children, ...extra } });
const copy = {
  de: { lines: ['Intelligenz.', 'In der', 'realen Welt.'], description: ['Physical AI für Unternehmen.', 'Beratung. Praxis. Perspektive.'], footer: 'Unabhängig. Europäisch.' },
  en: { lines: ['Intelligence.', 'In the', 'real world.'], description: ['Physical AI for business.', 'Strategy. Practice. Perspective.'], footer: 'Independent. European.' },
};

function card(locale, logo, brain) {
  const text = copy[locale];
  return node('div', {
    display: 'flex', width: 1200, height: 630, position: 'relative', overflow: 'hidden',
    backgroundColor: COLOR.background, color: COLOR.text, fontFamily: 'Space Grotesk', fontWeight: 700,
  }, [
    node('img', { position: 'absolute', left: 594, top: 26, width: 600, height: 600 }, undefined, { src: brain }),
    node('div', { position: 'absolute', left: 64, top: 48, display: 'flex', alignItems: 'center', gap: 14 }, [
      node('img', { width: 52, height: 52 }, undefined, { src: logo }),
      node('div', { display: 'flex', fontSize: 36, letterSpacing: '-1.5px' }, [
        node('span', {}, 'Em'), node('span', { color: COLOR.orange }, 'AI'),
      ]),
    ]),
    node('div', { position: 'absolute', left: 64, top: 157, display: 'flex', flexDirection: 'column', width: 595 }, [
      ...text.lines.map((line, index) => node('div', {
        display: 'flex', fontSize: 76, lineHeight: 1.04, letterSpacing: '-4px',
        color: index === 0 ? COLOR.text : COLOR.orange,
      }, line)),
      node('div', { display: 'flex', flexDirection: 'column', marginTop: 27, gap: 4, fontSize: 23, lineHeight: 1.35, color: COLOR.secondary, letterSpacing: '-0.3px' },
        text.description.map(line => node('div', {}, line))),
    ]),
    node('div', { position: 'absolute', left: 64, right: 64, bottom: 39, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 19, letterSpacing: '-0.2px' }, [
      node('span', { color: COLOR.text }, 'emai.dev'),
      node('span', { color: COLOR.secondary }, text.footer),
    ]),
  ]);
}

async function main() {
  const [font, logoSvg, brainPng] = await Promise.all([
    loadFont(), readFile(join(ROOT, 'public', 'logo.svg')),
    // PNG companion of the site's WebP sculpture: resvg does not decode WebP.
    readFile(join(OUT, 'intelligence-sculpture-source.png')),
  ]);
  const logo = `data:image/svg+xml;base64,${logoSvg.toString('base64')}`;
  const brain = `data:image/png;base64,${brainPng.toString('base64')}`;
  await mkdir(OUT, { recursive: true });
  for (const locale of ['de', 'en']) {
    const svg = await satori(card(locale, logo, brain), {
      width: 1200, height: 630, fonts: [{ name: 'Space Grotesk', data: font, weight: 700, style: 'normal' }],
    });
    const png = new Resvg(svg).render().asPng();
    const output = join(OUT, `emai-share-${locale}-v2.png`);
    await writeFile(output, png);
    if (locale === 'de') await writeFile(join(ROOT, 'public', 'og-image.png'), png);
    console.log(`Wrote ${output} — 1200×630, ${(png.length / 1024).toFixed(0)} KB`);
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
