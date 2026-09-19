#!/usr/bin/env node
/** The bare domain must be shareable without a crawler executing JavaScript. */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const output = fileURLToPath(new URL('../out/', import.meta.url));
const html = await readFile(join(output, 'de.html'), 'utf8');
const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
if (!head) throw new Error('The exported German homepage is missing its head.');

// Copy generated tags instead of maintaining a second set of branding or social URLs.
const title = head.match(/<title>[^<]*<\/title>/i)?.[0];
const metadata = (head.match(/<meta\b[^>]*>/gi) || []).filter(tag =>
  /(?:name|property)="(?:description|robots|og:[^"]+|twitter:[^"]+)"/i.test(tag),
);
const links = (head.match(/<link\b[^>]*>/gi) || []).filter(tag =>
  /rel="(?:canonical|icon|apple-touch-icon|manifest)"/i.test(tag),
);
if (!title || !metadata.some(tag => /property="og:image"/.test(tag)) || !links.some(tag => /rel="canonical"/.test(tag))) {
  throw new Error('The exported homepage is missing required link-preview metadata.');
}

await writeFile(join(output, 'index.html'), `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${[title, ...metadata, ...links].join('\n')}
<meta http-equiv="refresh" content="0; url=/de">
</head>
<body>
<p><a href="/de">EmAI — Zur Website</a></p>
<script>window.location.replace('/de' + window.location.search + window.location.hash);</script>
</body>
</html>
`);
console.log('Generated a shareable root redirect with the homepage social metadata.');
