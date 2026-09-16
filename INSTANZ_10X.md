# 10X HEALTH ACADEMY — eigene Instanz der NOVO ACADEMY

Stand: 16.09.2026

Dieses Repo ist ein Klon von `Novogenia-AG/novo-academy` mit voller Historie.
Inhalte, Kurse, Tests und Logik sind **identisch**. Anders sind nur Sprache und Marke.

## Was anders ist

| Bereich | Original | 10X-Instanz |
|---|---|---|
| Sprache | 11 Sprachen, Sprachwahl beim ersten Besuch | nur Englisch, keine Sprachwahl und keine Umschalter |
| Logo | Wortmarke NOVO ACADEMY | 10X-Health-Logo + „Academy" |
| Design | Pflaume/Gold, Montserrat, abgerundet | Rot #D1242A / Schwarz / Weiß, Oswald + Inter, eckig |
| Zertifikat | Novogenia-Vorlage | eigene Vorlage mit 10X-Logo, rotem Keil und schwarzem Streifen. Unterschrift weiterhin Dr. Daniel Wallerstorfer, CEO of Novogenia |
| Footer | © Novogenia GmbH | „10X Health Academy · Powered by Novogenia" + © Novogenia GmbH |

## Wo das Markenspezifische steckt

Alles Markenspezifische liegt an wenigen Stellen. So bleiben Updates aus dem Original übernehmbar:

- `src/brand.js`: Name, Logo, Sprachsperre, Textersetzungen, Zertifikat-Einstellungen
- `src/theme-10x.css`: das komplette Aussehen; lädt als letzte CSS-Datei (`src/main.jsx`)
- `public/brand/`: Logos, Favicons und `cert-template-10x.pdf`
- `index.html`: Titel, Beschreibung, Favicon, Schriften
- kleine Haken in `App.jsx`, `data.js`, `generateCert.js` und `CertTemplateBg.jsx`; alle lesen `BRAND`

## Updates aus der NOVO ACADEMY übernehmen

```bash
git fetch upstream
git merge upstream/main
```

Konflikte sind fast nur in den Haken-Zeilen oben zu erwarten.
Der Push zu `upstream` ist absichtlich gesperrt (`no_push`).

## Offen, bevor die Instanz online geht

1. **Ziel-Repo und Domain:** Es gibt noch kein eigenes GitHub-Repo. `public/CNAME` ist entfernt, damit die Instanz nicht die Domain des Originals beansprucht.
2. **Supabase:** Soll die Instanz ein eigenes Projekt nutzen (getrennte Nutzerkonten) oder das der NOVO ACADEMY? Danach richten sich die CSP in `index.html` und die GitHub-Secrets.
3. **Impressum/Datenschutz:** Die Rechtstexte nennen weiterhin Novogenia als Betreiber. Das ist korrekt, solange Novogenia die Plattform betreibt. Unklar ist noch die Rolle von 10X Health.
4. **Support-Bot:** Er ist unverändert der Novogenia-Assistent.

## Screenshots erzeugen (ohne Daniels Chrome)

Das Skript liegt im Scratchpad der Sitzung, nicht im Repo:
`node shoot.mjs <url> <label> landing,auth,home,kurs,zertifikat`
