# Urinesteen.nl – eerste versie (preview)

Statische, klikbare preview. De livewebsite, de webshop en de domeininstellingen zijn niet aangeraakt.

## Preview openen

```
node tools/serve.js
```

Open daarna http://localhost:4173/ (ook bruikbaar met de responsive-weergave van de browser).

Na een tekstwijziging in `src/pages/*.html`: `node tools/build.js`. Links controleren: `node tools/check-links.js --extern`.

## Opbouw

| Map | Inhoud |
|---|---|
| `src/pages/` | Pagina-inhoud per pagina (de teksten en secties) |
| `tools/build.js` | Voegt kop, menu en voettekst toe en schrijft naar `site/` |
| `site/` | De gebouwde site plus `assets/` (CSS, JS, schematische tekeningen) |

De secties gebruiken eenvoudige, herhaalbare blokken (hero, kaarten, checklist, kader, tabel, call-to-action). Ze zijn één op één over te zetten naar Flatsome/UX Builder-elementen in WordPress.

Testomgeving: `noindex` in elke pagina, de header `X-Robots-Tag: noindex` en `robots.txt` met `Disallow: /`. Zet bij publicatie `LIVE = true` in `tools/build.js` en vervang `robots.txt`.

## De vijf pagina's

1. **/** – H1, intro, twee ingangen (gebouw / schip), leidingdoorsnede, drie herkenbare situaties, call-to-action naar advies. Op mobiel zijn beide ingangen compact, zodat ze direct onder de intro staan.
2. **/urinoirs-in-gebouwen/** – Klachten (A), drie plekken met tekening (B), vier behandelingen (C), tabel “Kunnen gasten het urinoir blijven gebruiken?”, `#doseerkoffer` met praktijkvoorbeeld Brussel, `#geur` (D), branches (E), afsluiting met no cure, no pay (G).
3. **/vacuumtoiletten-schepen/** – Werking van het systeem (A), Cee-Bee-programma (B), `#automatisch-doseren` met drie stappen en principeschema (C), gegevens voor advies (D), productinformatie (E), twee externe knoppen.
4. **/wat-is-urinesteen/** – Ontstaan, invloeden, drie misverstanden, twee routes. Er staan geen bronnen of onderzoeken op deze pagina, volgens de aanvulling.
5. **/advies/** – Twee contactblokken (ROVEQ / Cee-Bee Maritime) met de gevraagde gegevens.

Plus een 404-pagina.

## Ontbrekende beelden en gegevens

- **Echte foto van een doorgezaagde urinoirleiding met urinesteen.** Nu staat er een schematische tekening. `leiding1.png` op roveq.nl is maar 245×134 pixels. Een groter origineel zou de homepage sterk verbeteren.
- **Eigen foto’s in plaats van hotlinks.** Alle foto’s worden nu rechtstreeks van roveq.nl en ceebeemaritime.com geladen. Zet ze bij de WordPress-bouw in de eigen mediabibliotheek.
- **Foto van de Digital Dual Dosing Unit aan boord**, gemonteerd aan een vacuümleiding.
- **Foto van de doseerkoffer in gebruik** in een herkenbare ruimte, bijvoorbeeld een sanitairgebouw op een camping.
- **Praktijkvoorbeeld Brussel**: alleen de basistekst is gebruikt. Aanvullende gegevens (looptijd, aantal urinoirs, resultaat) zijn welkom als ze beschikbaar zijn.
- **No cure, no pay**: de voorwaarden staan niet op roveq.nl. De tekst zegt “Voorwaarden op aanvraag”.
- **Productblad van de Cee-Bee-ontkalkingsgel** met de juiste naam (Honey Bee 120MR / Greenbioclean MR 120 K-01 GEL). Tot dat bevestigd is, staat er “de ontkalkingsgel uit het Cee-Bee-onderhoudsprogramma”.
- **Logo’s**: ROVEQ en Cee-Bee Maritime worden van hun eigen sites geladen. Lever liefst de originele SVG-bestanden aan.

## Niet (volledig) gecontroleerd

- **Cee-Bee-afbeeldingen** (veerboot, leiding met aanslag, logo): de server geeft ze correct terug (HTTP 200). De ingebouwde testbrowser blokkeert dat domein, dus ze zijn niet visueel gecontroleerd. Controleer of de alt-teksten bij de foto’s passen.
- **Luchtpuls**: de Cee-Bee-website beschrijft de unit als “twee magneetkleppen die een spoeling nabootsen”. Het woord luchtpuls of luchtklep komt daar niet voor. De tekst volgt de opdracht (luchtpuls). Laat Cee-Bee de formulering bevestigen.
- **Aansluitpunt**: Cee-Bee noemt “het eind van de hoofdvacuümleiding”. De pagina zegt “meestal aan het eind van de hoofdleiding” en in stap 1 “op een gekozen punt”.
- **Telefoonnummer Cee-Bee** (+31 572 364 396) is overgenomen van ceebeemaritime.com/contact en gelijk aan het nummer in de voettekst van de huidige urinesteen.nl.
- **Gedrag van de doseerkoffer**: “programmeerbaar” en “doseert op ingestelde momenten” komen uit de opdracht. De ROVEQ-huurpagina noemt batterijvoeding en een afsluitbare koffer, maar geen programmering. Laat ROVEQ dit bevestigen.

## Bij de overstap naar de nieuwe site

Bestaande URL’s die een 301-redirect nodig hebben, op basis van een korte verkenning:

| Huidige URL | Voorstel |
|---|---|
| /urinesteen-verwijderen/ | /urinoirs-in-gebouwen/ |
| /hardnekkig-urinesteen-verwijderen/ | /urinoirs-in-gebouwen/#behandeling |
| /bruine-aanslag-verwijderen/ | /urinoirs-in-gebouwen/#behandeling |
| /urinesteen-verwijderen-toilet/ | /urinoirs-in-gebouwen/ |
| /urinesteen-verwijderaar/ | /urinoirs-in-gebouwen/#behandeling |
| /wat-is-urinesteen-en-waarom-is-het-een-probleem/ | /wat-is-urinesteen/ |
| /wie-zijn-wij/ | /advies/ |
| /winkel/, /product-categorie/… | Beslissen: webshop behouden of doorverwijzen naar ROVEQ |

Let op: **/wat-is-urinesteen/** stuurt nu al door naar het bestaande blogbericht. Haal die redirect weg bij livegang.

## Mogelijke vervolgpagina’s

- Verdiepingspagina doseerkoffer (nu anker `#doseerkoffer`)
- Verdiepingspagina geurklachten en waterloze urinoirs (nu anker `#geur`)
- Verdiepingspagina automatisch doseren aan boord (nu anker `#automatisch-doseren`)
- Pagina’s per branche (camping, horeca, hotel, evenementen, kantoor)
- Engelse versie (de opbouw met `lang` en canonical is daarop voorbereid)
