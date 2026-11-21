// Writes ZXA.built in assets/js/admin-screens.js from the pages that exist in pages/,
// and fails when a page file does not match its name in the spec registry.
// Usage: node design-system/admin/tools/build-index.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const registryFile = join(root, 'assets/js/admin-screens.js');
const source = readFileSync(registryFile, 'utf8');
const sandbox = { window: {}, document: { currentScript: { src: 'x/assets/js/admin-screens.js' } } };
sandbox.window = sandbox;
vm.runInNewContext(source, sandbox);
const { pages } = sandbox.ZXA;

const found = readdirSync(join(root, 'pages'), { recursive: true }).filter((f) => f.endsWith('.html'));
const problems = [];
const built = [];
for (const file of found) {
  const id = file.match(/(D\d+)-/)?.[1];
  if (!id || !pages[id]) { problems.push(`${file}: no spec page with this id`); continue; }
  if (pages[id].file !== file) { problems.push(`${file}: expected ${pages[id].file}`); continue; }
  built.push(id);
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
built.sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));
const list = built.map((id) => `'${id}'`).join(', ').replace(/(.{1,110})(, |$)/g, '  $1,\n').replace(/,,\n$/, ',\n');
const next = source.replace(/\/\* built:start \*\/[\s\S]*?\/\* built:end \*\//, `/* built:start */\nZXA.built = [\n${list}];\n/* built:end */`);
writeFileSync(registryFile, next);
console.log(`${built.length} pages built`);
