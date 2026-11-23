// Bouwt de statische preview: src/pages/*.html + gedeelde kop/voet → site/<pad>/index.html
// Gebruik: node tools/build.js
// Elke paginabron begint met:  <!--meta {"path":"/...","title":"...","description":"...","nav":"..."} -->
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src', 'pages');
const outDir = path.join(root, 'site');

// Zet op true bij publicatie (verwijdert noindex en testbalk).
const LIVE = false;

const nav = [
  { key: 'gebouwen', href: '/urinoirs-in-gebouwen/', label: 'Urinoirs in gebouwen' },
  { key: 'schepen', href: '/vacuumtoiletten-schepen/', label: 'Vacuümtoiletten op schepen' },
  { key: 'kennis', href: '/wat-is-urinesteen/', label: 'Wat is urinesteen?' },
];

const brandMark = `<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><circle cx="16" cy="16" r="15" fill="#0C2D57"/><circle cx="16" cy="16" r="10" fill="#C9A66B"/><circle cx="17" cy="15" r="5" fill="#DCEBF7"/><circle cx="16" cy="16" r="15" fill="none" stroke="#1FA55B" stroke-width="2"/></svg>`;

function header(current) {
  const items = nav.map(n =>
    `<li><a href="${n.href}"${n.key === current ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('\n          ');
  return `<a class="skip-link" href="#inhoud">Naar de inhoud</a>
${LIVE ? '' : '<div class="preview-bar" role="note">Testversie – niet gepubliceerd</div>\n'}<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/" aria-label="Urinesteen.nl, naar de homepage">${brandMark}<span>Urinesteen<span class="tld">.nl</span></span></a>
    <nav class="main-nav" id="hoofdmenu" aria-label="Hoofdmenu">
      <ul>
          ${items}
          <li class="nav-cta"><a href="/advies/"${current === 'advies' ? ' aria-current="page"' : ''}>Advies</a></li>
      </ul>
    </nav>
    <a class="btn btn-primary btn-sm header-cta" href="/advies/"${current === 'advies' ? ' aria-current="page"' : ''}>Advies</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="hoofdmenu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      <span class="menu-label">Menu</span>
    </button>
  </div>
</header>`;
}

const footer = `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <p class="footer-brand">Urinesteen<span>.nl</span></p>
        <p>Informatie over het verwijderen van urinesteen uit urinoirs en afvoeren in gebouwen, en uit vacuümtoiletsystemen aan boord van schepen.</p>
      </div>
      <div>
        <h2>Op deze site</h2>
        <ul>
          <li><a href="/urinoirs-in-gebouwen/">Urinoirs in gebouwen</a></li>
          <li><a href="/vacuumtoiletten-schepen/">Vacuümtoiletten op schepen</a></li>
          <li><a href="/wat-is-urinesteen/">Wat is urinesteen?</a></li>
          <li><a href="/advies/">Advies</a></li>
        </ul>
      </div>
      <div>
        <h2>Specialisten</h2>
        <ul>
          <li><a href="https://roveq.nl/contact/">ROVEQ – gebouwen en recreatie</a></li>
          <li><a href="https://ceebeemaritime.com/contact" hreflang="en">Cee-Bee Maritime – scheepvaart (Engels)</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">Urinesteen.nl · Rudolf Dieselstraat 4 · 8013 NJ Zwolle</div>
  </div>
</footer>`;

function page(meta, body) {
  const canonical = 'https://urinesteen.nl' + meta.path;
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${meta.title}</title>
<meta name="description" content="${meta.description}">
${LIVE ? '' : '<meta name="robots" content="noindex, nofollow">\n'}<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:locale" content="nl_NL">
<meta property="og:title" content="${meta.title}">
<meta property="og:description" content="${meta.description}">
<meta property="og:url" content="${canonical}">
<meta name="theme-color" content="#0C2D57">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/css/site.css">
</head>
<body>
${header(meta.nav)}
<main id="inhoud">
${body.trim()}
</main>
${footer}
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
}

let count = 0;
for (const file of fs.readdirSync(srcDir).filter(f => f.endsWith('.html'))) {
  const raw = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const m = raw.match(/^<!--meta\s+([\s\S]*?)\s*-->/);
  if (!m) throw new Error(`Geen meta-kop in ${file}`);
  const meta = JSON.parse(m[1]);
  const body = raw.slice(m[0].length);
  const target = meta.path === '/404'
    ? path.join(outDir, '404.html')
    : path.join(outDir, ...meta.path.split('/').filter(Boolean), 'index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, page(meta, body));
  count++;
  console.log('✓', meta.path);
}
console.log(`${count} pagina's gebouwd in site/`);
