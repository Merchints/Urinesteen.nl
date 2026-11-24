# Urinesteen.nl – preview (twintig pagina’s)

Statische preview. Fly serveert de map `site/`. De livewebsite, de webshop en de DNS zijn niet aangeraakt.
Elke pagina heeft `noindex` en de testmelding “Testversie – niet gepubliceerd”.

## Werken met de bron

| Map / bestand | Inhoud |
|---|---|
| `src/pages/*.html` | Tekst en opbouw per pagina, met metakop (pad, titel, beschrijving) |
| `src/photo-credits.json` | Herkomst en licentie van iedere foto van derden |
| `tools/build.js` | Voegt menu, voettekst en fotovermeldingen toe en schrijft naar `site/` |
| `tools/check-links.js` | Controleert interne links en ankers (`--extern` ook externe links) |
| `tools/fetch-photos.js` | Haalt de gekozen Commons-foto’s op en legt de licentie vast |
| `tools/resize.ps1` | Verkleint en comprimeert foto’s met de ingebouwde Windows-beeldbewerking |
| `tools/serve.js` | Lokale preview op http://localhost:4173/ |

Na een tekstwijziging: `node tools/build.js`, daarna `node tools/check-links.js`.

## Pagina’s

| # | Adres | Type |
|---|---|---|
| 01 | `/` | Homepage: twee ingangen en een keuze op klacht |
| 02 | `/wat-is-urinesteen/` | Kennis: vragen en korte antwoorden |
| 03 | `/advies/` | ROVEQ (`#gebouw`) en Cee-Bee Maritime (`#schip`) |
| 04 | `/urinoirs-in-gebouwen/` | Overzicht gebouwen (ankers `#doseerkoffer`, `#geur` blijven werken) |
| 05 | `/campings-vakantieparken/` | Branche |
| 06 | `/horeca/` | Branche, inclusief hotels |
| 07 | `/kantoren/` | Branche |
| 08 | `/vacuumtoiletten-gebouwen/` | Herkennen van een vacuümsysteem |
| 09 | `/behandeling-kiezen/` | Methode: overzicht per plek |
| 10 | `/uri-dispenser/` | Methode |
| 11 | `/automatisch-doseren/` | Methode: doseerkoffer |
| 12 | `/standleidingen/` | Methode: tekening met stap 1 en stap 2 |
| 13 | `/vacuumtoiletten-schepen/` | Overzicht aan boord (anker `#automatisch-doseren` blijft werken) |
| 14 | `/cruiseschepen/` | Branche |
| 15 | `/veerboten/` | Branche |
| 16 | `/terugkerende-verstoppingen/` | Herkennen: één toilet, één tak, meerdere delen |
| 17 | `/maritiem-doseersysteem/` | Methode: Digital Dual Dosing Unit |
| 18 | `/onderhoud-vacuumleidingen/` | Onderhoud door de bemanning |
| 19 | `/praktijk/acht-verdiepingen/` | Praktijk (anoniem) |
| 20 | `/praktijk/veerboot/` | Voorbeeldsituatie (geen verifieerbaar eigen verhaal gevonden) |

## Beelden

Alle foto’s staan lokaal in `site/assets/img/foto/`, verkleind tot maximaal 1600 px en circa 20–260 KB.
De naamsvermelding staat onder elk beeld. Sfeerbeelden zijn als “sfeerbeeld” gemarkeerd.

**Eigen beeld:** ROVEQ (afgezette urinoirs, URI-dispenser in gebruik, doseerkoffer) en Cee-Bee Maritime
(leidingen met aanslag, Digital Dual Dosing Unit).

**Wikimedia Commons** (zie `src/photo-credits.json` voor maker, licentie en bronpagina):

| Bestand | Licentie | Maker |
|---|---|---|
| camping-sanitairgebouw.jpg | CC BY-SA 4.0 | Chala123 |
| camping-urinoirs.jpg | CC BY 2.0 | mededeler |
| horeca-urinoirs.jpg | CC0 | Richard Avery |
| kantoor-urinoirs.jpg | CC0 | MarkBuckawicki |
| urinoir-aanslag.jpg | CC BY 4.0 | Martin Lemke |
| afvoer-urinesteen.jpg | CC BY 2.0 | SuSanA Secretariat |
| schip-machinekamer.jpg | CC BY-SA 4.0 | NAC |
| schip-machinekamer-2.jpg | CC BY 4.0 | LEE 003 |
| cruise-gang-hutten.jpg | CC BY-SA 4.0 | SamHolt6 |
| cruise-promenadedek.jpg | CC BY 2.0 | Gary Bembridge |
| veerboot-aanlegplaats.jpg | CC BY 4.0 | Emma0mb |

Bij CC BY-SA geldt: een bewerkte (bijgesneden) versie valt onder dezelfde licentie. Laat de vermelding staan.

Bewust niet gebruikt: de veerbootfoto van ceebeemaritime.com (herkenbaar schip, kan een klantrelatie suggereren),
de bulkcarrier met rederijnaam, en twee ROVEQ-beelden die gerenderd ogen.

**Tekeningen** (`site/assets/img/*.svg`, eigen werk): buisdoorsnede (homepage), leidingdoorsnede, drie plekken in
een urinoir, standleiding met stap 1 en 2, URI-dispenser, doseerkoffer, maritieme doseerunit, leidingtakken aan
boord, werking van een vacuümtoilet.

## Waar later eigen projectbeeld komt

- **Homepage, openingsbeeld:** een echte doorgezaagde leiding met urinesteen. Instructie staat als commentaar in `src/pages/home.html`.
- **/praktijk/acht-verdiepingen/:** beelden van de geplande camera-inspectie en het resultaat. De stap “Stand van zaken” is daarvoor gereserveerd.
- **/automatisch-doseren/ en /standleidingen/:** de doseerkoffer in gebruik op een verdieping.
- **/praktijk/veerboot/:** te vervangen door een echt praktijkverhaal van Cee-Bee Maritime, met toestemming.
- **/campings-vakantieparken/, /horeca/, /kantoren/:** eigen locatiefoto’s in plaats van sfeerbeelden.
- **/maritiem-doseersysteem/:** de unit gemonteerd aan boord.

## Inhoudelijke punten ter controle

- **Inwerktijd LIQUID:** roveq.nl noemt op verschillende pagina’s “minstens 8 uur, bij voorkeur een nacht” en “12 tot 24 uur”. De site gebruikt “minstens acht uur” en verwijst naar de gebruiksinstructie. Maak dit op roveq.nl eenduidig.
- **Luchtpuls:** ceebeemaritime.com zegt dat twee magneetkleppen “een spoeling nabootsen”. De site legt dat uit als een tweede klep die lucht toelaat. Laat Cee-Bee de formulering bevestigen.
- **Dosering aan boord:** 480 ml Honey Bee 120MR Scale Remover Gel per 10 toiletten per dag, zoals vermeld op ceebeemaritime.com, gekoppeld aan dat product en programma.
- **Vacuümtoiletten in gebouwen:** het advies gaat via ROVEQ. Bevestig of ROVEQ dit oppakt of doorverwijst naar Cee-Bee.
- **Programmeerbare doseerkoffer:** roveq.nl spreekt van doseren “op ingestelde momenten”, met uitvoeringen op batterij en op netvoeding. De exacte instelmogelijkheden staan er niet.
- **No cure, no pay:** de voorwaarden staan niet online. De site zegt “Voorwaarden op aanvraag”.

## Bij de overstap naar de live site

Zet `LIVE = true` in `tools/build.js` en vervang `site/robots.txt`. Richt 301-redirects in van de oude adressen:

| Huidige URL | Nieuw |
|---|---|
| /urinesteen-verwijderen/ | /urinoirs-in-gebouwen/ |
| /hardnekkig-urinesteen-verwijderen/ | /behandeling-kiezen/ |
| /bruine-aanslag-verwijderen/ | /behandeling-kiezen/#zichtbaar |
| /urinesteen-verwijderen-toilet/ | /urinoirs-in-gebouwen/ |
| /urinesteen-verwijderaar/ | /behandeling-kiezen/ |
| /wat-is-urinesteen-en-waarom-is-het-een-probleem/ | /wat-is-urinesteen/ |
| /wie-zijn-wij/ | /advies/ |

Let op: **/wat-is-urinesteen/** stuurt op de huidige site door naar het blogbericht. Haal die redirect weg bij livegang.
