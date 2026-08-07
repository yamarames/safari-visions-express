/**
 * Step the overlay through every frame of the edit and screenshot it to a
 * transparent PNG sequence for ffmpeg to composite over the graded bed.
 *
 *   node render_frames.mjs <outDir> [fromFrame] [toFrame]
 */
import { execSync } from 'node:child_process';
import { readFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Playwright is only ever installed globally here, and ESM ignores NODE_PATH,
// so fall back to the global root rather than vendoring node_modules.
const require = createRequire(import.meta.url);
function loadPlaywright() {
  try {
    return require('playwright');
  } catch {
    const root = execSync('npm root -g', { encoding: 'utf8' }).trim();
    return require(join(root, 'playwright'));
  }
}
const { chromium } = loadPlaywright();

const HERE = dirname(fileURLToPath(import.meta.url));
const TL = JSON.parse(readFileSync(join(HERE, 'timeline.json'), 'utf8'));

const outDir = resolve(process.argv[2] ?? '/tmp/bilo_build/mg');
// Either a contiguous range, or --frames=12,340,801 for spot-checking a look
// without paying for the whole sequence.
const pick = (process.argv.find(a => a.startsWith('--frames=')) ?? '')
  .slice(9).split(',').filter(Boolean).map(Number);
const from = Number(process.argv[3] ?? 0);
const to = Number(process.argv[4] ?? TL.totalFrames);

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  args: ['--force-color-profile=srgb', '--disable-lcd-text',
         '--font-render-hinting=none'],
});
const page = await browser.newPage({
  viewport: { width: TL.w, height: TL.h },
  deviceScaleFactor: 1,
});

await page.goto(pathToFileURL(join(HERE, 'overlay.html')).href,
                { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const ok = await page.evaluate(tl => window.setTimeline(tl), TL);
if (!ok) throw new Error('setTimeline failed');

const pad = n => String(n).padStart(5, '0');
const t0 = Date.now();

const frames = pick.length
  ? pick
  : Array.from({ length: to - from }, (_, i) => from + i);

for (let i = 0; i < frames.length; i++) {
  const f = frames[i];
  await page.evaluate(t => window.renderAt(t), f / TL.fps);
  await page.screenshot({
    path: join(outDir, `f_${pad(f)}.png`),
    omitBackground: true,
  });
  if (i % 100 === 0 || i === frames.length - 1) {
    const el = (Date.now() - t0) / 1000;
    process.stdout.write(
      `  frame ${f} (${i + 1}/${frames.length})  ${el.toFixed(0)}s  ` +
      `(${((i + 1) / el).toFixed(1)} fps)\n`);
  }
}

await browser.close();
console.log(`overlay -> ${outDir}`);
