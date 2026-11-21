// Checks that every page id an admin page links to (href="#D403", data-href="D403", href('D403'), link('D403'),
// ZXA.href('D403')) is a Phase 1 page in the spec registry, and that mobile links point at real files.
// Usage: node design-system/admin/tools/check-links.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = { document: { currentScript: { src: 'x/assets/js/admin-screens.js' } } };
sandbox.window = sandbox;
vm.runInNewContext(readFileSync(join(root, 'assets/js/admin-screens.js'), 'utf8'), sandbox);
const { pages, modules } = sandbox.ZXA;
const phase2 = new Set(modules.filter((m) => m.phase === 2).flatMap((m) => m.pages.map(([id]) => id)));

const files = readdirSync(join(root, 'pages'), { recursive: true }).filter((f) => f.endsWith('.html')).map((f) => join('pages', f));
const LINK = /(?:href="#|data-href="|data-open-page="|(?:href|link|ZXA\.href|go)\(\s*')(D\d{3,4})/g;
const problems = [];
for (const file of files) {
  const text = readFileSync(join(root, file), 'utf8');
  for (const [, id] of text.matchAll(LINK)) {
    if (!pages[id]) problems.push(`${file}: links to unknown page ${id}`);
    else if (phase2.has(id)) problems.push(`${file}: links to Phase 2 page ${id}`);
  }
  for (const [, mobile] of text.matchAll(/data-mobile="([^"]+)"/g)) {
    if (!existsSync(resolve(dirname(join(root, file)), mobile))) problems.push(`${file}: mobile screen not found ${mobile}`);
  }
}
if (problems.length) { console.error([...new Set(problems)].join('\n')); process.exit(1); }
console.log(`${files.length} pages, links ok`);
