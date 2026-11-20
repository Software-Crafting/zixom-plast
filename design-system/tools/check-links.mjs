// Checks that every screen page has its canonical name and that every link between screens
// points at a canonical name (assets/js/screens.js). Run before each commit:
//   node design-system/tools/check-links.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const context = { window: {}, ZX: {} };
context.window = context;
vm.runInNewContext(readFileSync(join(root, 'assets/js/screens.js'), 'utf8'), context);
const { ZX } = context;

const canonical = new Set(Object.values(ZX.files).map((file) => `${file}.html`));
const problems = [];

for (const folder of ['access', 'system', 'customer', 'engineer']) {
  const dir = join(root, 'screens', folder);
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir)) {
    if (!canonical.has(file)) problems.push(`not a canonical name: screens/${folder}/${file}`);
    const html = readFileSync(join(dir, file), 'utf8');
    for (const [, target] of html.matchAll(/href="(?:\.\.\/\w+\/)?([A-Z]\d+-[a-z0-9-]+\.html)"/g)) {
      if (!canonical.has(target)) problems.push(`${folder}/${file} links to unknown ${target}`);
    }
  }
}

for (const id of ZX.built) {
  if (!existsSync(join(root, ZX.pagePath(id)))) problems.push(`${id} is marked built but ${ZX.pagePath(id)} is missing`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`ok: ${ZX.built.size} built pages, all links canonical`);
