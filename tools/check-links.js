// Controleert alle links in site/: interne pagina's, ankers en (optioneel) externe URL's.
// Gebruik: node tools/check-links.js [--extern]
const fs = require('fs');
const path = require('path');
const site = path.join(__dirname, '..', 'site');
const checkExternal = process.argv.includes('--extern');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(d =>
    d.isDirectory() ? walk(path.join(dir, d.name)) : d.name.endsWith('.html') ? [path.join(dir, d.name)] : []);
}
const pages = {};
for (const f of walk(site)) {
  const rel = '/' + path.relative(site, f).replace(/\\/g, '/').replace(/index\.html$/, '');
  pages[rel] = fs.readFileSync(f, 'utf8');
}
const ids = p => new Set([...pages[p].matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
const problems = [];
const external = new Set();

for (const [p, html] of Object.entries(pages)) {
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (p !== '/404.html' && h1 !== 1) problems.push(`${p}: ${h1} keer <h1>`);
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1].replace(/&amp;/g, '&');
    if (/^(mailto:|tel:)/.test(url)) continue;
    if (/^https?:/.test(url)) { external.add(url); continue; }
    const [pathPart, hash] = url.split('#');
    const target = pathPart === '' ? p : pathPart;
    if (/\.(css|js|svg|png|jpg|txt)$/.test(target)) {
      if (!fs.existsSync(path.join(site, target))) problems.push(`${p}: ontbrekend bestand ${url}`);
      continue;
    }
    if (!pages[target]) { problems.push(`${p}: kapotte link ${url}`); continue; }
    if (hash && !ids(target).has(hash)) problems.push(`${p}: anker ontbreekt ${url}`);
  }
}

(async () => {
  console.log(`Interne controle: ${Object.keys(pages).length} pagina's, ${problems.length} problemen`);
  problems.forEach(x => console.log('  ✗', x));
  if (checkExternal) {
    for (const url of [...external].sort()) {
      try {
        const r = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': 'Mozilla/5.0 link-check' } });
        console.log(`${r.status} ${r.status >= 300 && r.status < 400 ? '→ ' + r.headers.get('location') + ' ' : ''}${url}`);
      } catch (e) { console.log(`ERR ${url} (${e.message})`); }
    }
  }
})();
