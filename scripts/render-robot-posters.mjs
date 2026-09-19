/**
 * Render transparent EmAI hologram posters from the original GLBs and shared material.
 * Requires a local Playwright installation; no production dependency is added.
 * PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node scripts/render-robot-posters.mjs
 */
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const helper = ts.transpileModule(await fs.readFile(path.join(root, 'src/lib/robot-branding.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText;
const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost');
  if (url.pathname === '/') { response.end('<!doctype html><html><body></body></html>'); return; }
  if (url.pathname === '/branding.js') {
    response.setHeader('Content-Type', 'text/javascript'); response.end(helper); return;
  }
  const file = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
  if (!file.startsWith(`${root}${path.sep}`)) { response.writeHead(403).end(); return; }
  try {
    response.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : 'application/octet-stream');
    response.end(await fs.readFile(file));
  } catch { response.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true });
try {
  for (const slug of ['g1-edu', 'h1', 'go2', 'b2']) {
    const category = ['g1-edu', 'h1'].includes(slug) ? 'humanoid' : 'quadruped';
    const width = category === 'humanoid' ? 640 : 1000;
    const fit = category === 'humanoid' ? 1.16 : 1.42;
    const page = await browser.newPage({ viewport: { width, height: 850 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto(base);
    await page.setContent(`<style>html,body{margin:0;background:transparent}</style>
      <script type="importmap">{"imports":{"three":"/node_modules/three/build/three.module.js","three/addons/":"/node_modules/three/examples/jsm/"}}</script>
      <script type="module">
        import * as THREE from 'three';
        import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
        import {createBrandedRobot} from '/branding.js';
        const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});
        renderer.setSize(${width},850);renderer.setPixelRatio(1);renderer.setClearColor(0,0);
        renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
        document.body.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const model = createBrandedRobot((await new GLTFLoader().loadAsync('/public/models/${slug}.glb')).scene,'${category}');
        const bounds = new THREE.Box3().setFromObject(model);
        const size = bounds.getSize(new THREE.Vector3());
        model.position.sub(bounds.getCenter(new THREE.Vector3()));scene.add(model);
        scene.add(new THREE.HemisphereLight(0xf1f6ff,0x1d252d,2));
        function light(color,intensity,x,y,z){const l=new THREE.DirectionalLight(color,intensity);l.position.set(x,y,z);scene.add(l);}
        light(0xffffff,3,3,4,5);light(0xc1e9ff,1.6,-4,1,2);light(0xffb485,2.3,2,3,-4);light(0xffffff,1.8,-2,4,-3);
        const camera = new THREE.PerspectiveCamera(30,${width}/850,.01,100);
        const distance = Math.max(size.y,size.x*.7)/(2*Math.tan(Math.PI/12))*${fit};
        camera.position.set(distance*.87,size.y*.17,distance*.49);camera.lookAt(0,0,0);
        renderer.render(scene,camera);
        window.poster = renderer.domElement.toDataURL('image/webp',.97);
      </script>`);
    await page.waitForFunction(() => Boolean(window.poster));
    if (errors.length) throw new Error(`Failed to render ${slug}: ${errors.join('\n')}`);
    const image = await page.evaluate(() => window.poster);
    await fs.writeFile(path.join(root, `public/models/posters/${slug}-hologram.webp`), Buffer.from(image.split(',')[1], 'base64'));
    await page.close();
    console.log(`Rendered ${slug}`);
  }
} finally {
  await browser.close();
  server.close();
}
