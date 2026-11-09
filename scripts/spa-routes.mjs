// GitHub Pages csak létező fájlra ad 200-at: a mélylinkek (pl. /monsters/arnyhalal) eddig a
// 404.html-ből töltődtek be, 404-es HTTP-kóddal — a keresők ezeket nem indexelték.
// Ez a szkript minden (nem átirányító) útvonalhoz <útvonal>/index.html másolatot tesz a buildbe.
import { readFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.argv[2];
if (!outDir || !existsSync(join(outDir, 'index.html'))) {
  console.error(`Használat: node scripts/spa-routes.mjs <build-kimenet>  (nincs index.html: ${outDir})`);
  process.exit(1);
}

const source = readFileSync(new URL('../src/app/app.routes.ts', import.meta.url), 'utf8');
const paths = [...source.matchAll(/\{\s*path:\s*'([^']*)'(?![^}]*redirectTo)/g)]
  .map(m => m[1])
  .filter(p => p && p !== '**');

for (const p of paths) {
  const dir = join(outDir, ...p.split('/'));
  mkdirSync(dir, { recursive: true });
  copyFileSync(join(outDir, 'index.html'), join(dir, 'index.html'));
}
copyFileSync(join(outDir, 'index.html'), join(outDir, '404.html'));
console.log(`${paths.length} útvonal + 404.html előállítva: ${outDir}`);
