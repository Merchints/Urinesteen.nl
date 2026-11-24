// Haalt de gekozen Wikimedia Commons-foto's op (1920 px) en legt licentie en maker vast in src/photo-credits.json.
// Gebruik: node tools/fetch-photos.js <uitvoermap>
const fs = require('fs');
const path = require('path');
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });

const photos = {
  'camping-sanitairgebouw': 'Campingplatz Haddorf Sani III.JPG',
  'camping-urinoirs': 'Urinoirs op de camping - 53889494329.jpg',
  'horeca-urinoirs': 'More urinals in Salisbury.jpg',
  'kantoor-urinoirs': 'Men’s Room Urinals.jpg',
  'urinoir-aanslag': 'Urinal einer Gaststaette.jpg',
  'afvoer-urinesteen': 'Urine scale deposition (3128577458).jpg',
  'schip-machinekamer': '6 Pollux engine room 011018.jpg',
  'schip-machinekamer-2': 'Pulau Pinang Engine Room 46.jpg',
  'cruise-gang-hutten': 'MSC Meraviglia Passenger Cabin Corridor.jpg',
  'cruise-promenadedek': 'P&O Cruises - MV Aurora - Promenade Deck.JPG',
  'veerboot-aanlegplaats': 'BC Ferries Langdale secondary berth.jpg',
};

const strip = s => (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
(async () => {
  const credits = {};
  for (const [key, title] of Object.entries(photos)) {
    await new Promise(r => setTimeout(r, 3000)); // Commons begrenst het aantal verzoeken
    const p =new URLSearchParams({ action: 'query', format: 'json', titles: 'File:' + title, prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '1920' });
    const j = await (await fetch('https://commons.wikimedia.org/w/api.php?' + p, { headers: { 'User-Agent': 'urinesteen-preview/1.0' } })).json();
    const ii = Object.values(j.query.pages)[0].imageinfo[0];
    const m = ii.extmetadata;
    const file = path.join(out, key + '.src.jpg');
    if (!fs.existsSync(file) || fs.statSync(file).size < 20000) {
      const img = await fetch(ii.thumburl || ii.url, { headers: { 'User-Agent': 'urinesteen-preview/1.0' } });
      fs.writeFileSync(file, Buffer.from(await img.arrayBuffer()));
    }
    credits[key] = {
      title, author: strip(m.Artist && m.Artist.value), license: strip(m.LicenseShortName && m.LicenseShortName.value),
      licenseUrl: m.LicenseUrl ? m.LicenseUrl.value : null, source: ii.descriptionurl,
    };
    console.log(key, '|', credits[key].license, '|', credits[key].author);
  }
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'photo-credits.json'), JSON.stringify(credits, null, 2));
})();
