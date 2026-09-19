#!/usr/bin/env node
/** Generate app icons from the same approved vector mark used in the header. */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const root = fileURLToPath(new URL('..', import.meta.url));
const output = join(root, 'public', 'brand');
const svg = await readFile(join(root, 'public', 'logo.svg'), 'utf8');
await mkdir(output, { recursive: true });
await writeFile(join(output, 'emai-icon-v2.svg'), svg);

function png(size) {
  return new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
}
for (const size of [32, 192, 512]) {
  await writeFile(join(output, `emai-icon-${size}-v2.png`), png(size));
}
await writeFile(join(output, 'emai-apple-touch-v2.png'), png(180));

// ICO directory entries can contain PNG images, preserving the original vector's detail.
const sizes = [16, 32, 48, 256];
const images = sizes.map(png);
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
for (let index = 0; index < sizes.length; index++) {
  const entry = 6 + index * 16;
  header[entry] = sizes[index] === 256 ? 0 : sizes[index];
  header[entry + 1] = header[entry];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(images[index].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += images[index].length;
}
await writeFile(join(root, 'src', 'app', 'favicon.ico'), Buffer.concat([header, ...images]));
console.log('Generated EmAI favicon, browser, installable-app, and Apple touch icons.');
