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

## Betrieb (Stand 16.09.2026)

- **Live:** https://novogenia-ag.github.io/10x-health-academy/ (GitHub Pages, Deploy bei jedem Push auf main)
- **Eigenes Supabase-Projekt:** „10X HEALTH ACADEMY" (, Organisation Novogenia, Free-Tarif). Nutzer, Fortschritt und Admins sind vollständig von der NOVO ACADEMY getrennt.
  - Schema: , 1:1 aus der NOVO-Live-Datenbank ausgelesen, inklusive Sicherheits-Migration
  - Site URL und Redirect URL zeigen auf die 10X-Adresse, „Confirm email" ist aus (wie bei NOVO)
  - Secrets  und  im Repo gesetzt; CSP in  zeigt auf den neuen Host
  - **Google-Login:** im neuen Projekt noch nicht eingerichtet, der Button ist über  ausgeblendet. Zum Aktivieren Client-ID/Secret unter Authentication → Sign In / Providers → Google eintragen, die Callback-URL  im Google-OAuth-Client erlauben und dann  entfernen.
- **Erster Admin:** auf der 10X-Seite registrieren, dann im SQL-Editor des 10X-Projekts:
  - **Inhalte:** Pharmakogenetik und Werberichtlinie ausgeblendet (), „Novogenia" trägt den Zusatz „(the 10X Health Laboratory)", Unterschrift „CSO of 10X Health".
- **Merge-Hinweis:**  enthält den 10X-Supabase-Host. Bei einem Merge aus upstream darf er nicht auf den NOVO-Host zurückfallen.
