# NOVO ACADEMY — Claude Handoff & Project Memory

> **Wichtig für jede Claude-Instanz:** Halte diese Datei aktuell. Nach jeder bedeutenden Änderung (neue Features, Bugfixes, neue Kurse, Deployment-Änderungen, Supabase-Schema-Änderungen) wird diese Datei sofort aktualisiert, damit die nächste Instanz — auf jedem Computer — nahtlos weiterarbeiten kann.

---

## ⚠️ GRUNDREGELN — VERBINDLICH FÜR ALLE (Mensch & KI)

**Dies ist ein LIVE-System mit echten, registrierten Nutzern.** Jede dieser Regeln gilt ohne Ausnahme. Im Zweifel: **nichts tun und nachfragen.**

1. **Keine Datenschutz- oder Security-Risiken öffnen.**
   - Keine Nutzerdaten (E-Mails, Namen, Fortschritt) leaken, in Logs/URLs/Query-Strings schreiben oder an externe Endpunkte senden.
   - Der **`service_role`-Key** gehört NIEMALS ins Frontend, ins Repo oder in diese Datei. Nur der **Anon-Key** ins Frontend.
   - **RLS-Policies** nie lockern oder deaktivieren. Keine Tabelle/keinen Endpunkt öffentlich lesbar machen.
   - Keine Secrets committen (`.env*` bleibt in `.gitignore`).

2. **Die Funktion bestehender Nutzer NIEMALS zerstören.**
   - Keine Änderung darf dazu führen, dass registrierte Nutzer ihren **Login, ihre Kurse, ihren Fortschritt oder ihre Zertifikate** verlieren.
   - **Kein Hard-Delete** von `auth.users` / `profiles` / `user_progress` — ausschließlich Soft-Delete (`deleted_at`).
   - **`uid` (Kurs-UUID) und `course_uid` NIE ändern** — daran hängt der gespeicherte Fortschritt. Ändern = Nutzer verlieren ihre Kurse.
   - Keine Breaking-Changes am Supabase-Schema ohne abwärtskompatible Migration. Auth-Flow (Email + Google) nie brechen.

3. **Nichts Unfertiges live stellen.**
   - Ein Push auf `main` = **sofortiger Live-Deploy**. Auf `main` kommt nur **fertiges, getestetes** (vorher lokal `npm run build`).
   - **Einzige Ausnahme: Videos.** Fehlende Videos sind ok — sie zeigen automatisch „VIDEO COMING SOON". Platzhalter erlaubt.
   - Alles andere Unfertige → **eigener Branch + Pull Request**, niemals direkt auf `main`.

4. **Diese `CLAUDE.md` ist Pflicht-Doku — laufend aktuell halten.**
   - Nach JEDER bedeutenden Änderung sofort aktualisieren: Changelog (Abschnitt 15) + betroffene Abschnitte. Neue Regeln/Konventionen ebenfalls hier eintragen.
   - Eine Änderung pushen, ohne `CLAUDE.md` zu aktualisieren, verstößt gegen die Grundregeln.

---

## 1. Projektübersicht

**NOVO ACADEMY** ist die offizielle Trainingsplattform von Novogenia GmbH.  
- 22 Kurse pro Sprache. **Live: 11 Sprachen** — mit allen Videos: DE (22/22 sichtbar), EN, CZ, IT, FR, PT, NL, AR (je 18/22); **freigeschaltet, aber ohne ein einziges Video** (zeigen nur 8 von 22 Kursen): RO, ES, SR. Nachweis: Abschnitt 19.2 (Bestandsaufnahme 16.09.2026). Gesamt 11 × 22 = 242 Kurs-Objekte in `COURSES`. **Arabisch läuft RTL** (`dir="rtl"`).
- Themen: Genetik-Beratung, Gewicht, Ernährung, Sport, Detox, Burnout, Biologisches Alter, Supplements, Beauty, Pharmakogenetik, Werbrecht
- Nutzer können sich registrieren, Kurse absolvieren, Tests bestehen und ein **Zertifikat als PDF** herunterladen
- Admin-Panel für Nutzerverwaltung und Statistiken

**Live-URL:** https://academy.novopilot.com  (Custom Domain via GitHub Pages, „Enforce HTTPS" aktiv)
**GitHub-Repo:** https://github.com/Novogenia-AG/novo-academy  (Org-Repo; das alte `Novogenia/novo-academy` leitet per HTTP 301 weiter → `git push origin main` funktioniert weiterhin und triggert den Deploy)
**Lokaler Dev-Server:** http://localhost:5181/ (Port fix in vite.config.js; Dev-Base ist `/`)
**Production-Base:** `/` (Root, weil Custom Domain — gesetzt über `VITE_BASE_PATH=/` im Deploy-Workflow; NICHT mehr `/novo-academy/`)

---

## 2. Tech Stack

| Was | Womit |
|---|---|
| Frontend | React 18 + Vite 5 |
| Auth & DB | Supabase (eu-central-1, Projekt-Ref: `whjxtrrztfzhjqtsyqqf`) |
| Certificate PDF | pdf-lib + @pdf-lib/fontkit (Montserrat TTF) |
| Deployment | GitHub Pages via GitHub Actions |
| Fonts | Montserrat (@fontsource + lokale TTFs in /public/fonts/) |

---

## 3. Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# .env.local anlegen (NICHT in Git committen!)
cp .env.example .env.local
# Dann .env.local befüllen (siehe Abschnitt 5)

# Dev-Server starten
npm run dev
# → http://localhost:5181/

# Produktions-Build
npm run build
```

**Ohne .env.local** fällt die App auf einen lokalen Mock-Auth (localStorage) zurück — UI ist voll nutzbar zum Entwickeln, aber kein echtes Supabase.

---

## 4. Dateistruktur

```
app/
├── src/
│   ├── App.jsx          — Haupt-App: alle Seiten, Routing, Komponenten
│   ├── data.js          — Deutsche Kursinhalte + i18n-Strings (t(lang, key))
│   ├── data.en.js       — Englische Kursinhalte (COURSES_EN, CATEGORIES_EN)
│   ├── auth.js          — Supabase Auth + Progress-Speicherung (mit Mock-Fallback)
│   ├── generateCert.js  — Zertifikat-PDF-Generator (pdf-lib)
│   └── styles.css       — Design-System (CSS-Variablen, alle Komponenten)
├── public/
│   ├── course-materials/  — PDFs, PPTX pro Kurs
│   ├── thumbnails/        — Kurs-Vorschaubilder
│   ├── fonts/             — Montserrat-TTFs (Light/Regular/Medium/SemiBold/Bold)
│   ├── cert-template.pdf  — Leeres Zertifikat-Design (wird mit pdf-lib befüllt)
│   ├── novogenia-logo.png — Logo für Zertifikat-Vorschau
│   └── signature.png      — Unterschrift für Zertifikat
├── supabase/
│   └── admin-schema.sql   — Vollständiges DB-Schema (profiles, RLS, Trigger, is_admin())
├── .github/workflows/
│   └── deploy.yml         — GitHub Actions: Build + Deploy auf GitHub Pages
├── .env.local             — ⚠️ NICHT in Git! Supabase-Keys (lokal anlegen)
├── .env.example           — Vorlage für .env.local
├── vite.config.js         — Vite-Konfig (base: /novo-academy/, port: 5181)
└── CLAUDE.md              — Diese Datei (Projekt-Gedächtnis)
```

---

## 5. Umgebungsvariablen (.env.local)

```
VITE_SUPABASE_URL=https://whjxtrrztfzhjqtsyqqf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoanh0cnJ6dGZ6aGpxdHN5cXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNTk1MjQsImV4cCI6MjA5NTczNTUyNH0.aTklTt_kQqzyMCjx24XZvI1YZ0XMlUdxAsXegXfPXoo
```

> Der Anon-Key ist ein **Public Key** — er ist im Frontend-Bundle sichtbar und absichtlich so designed. Niemals den `service_role`-Key ins Frontend!

**GitHub Secrets** (für Deploy-Pipeline, bereits konfiguriert):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## 6. Supabase-Schema

Das vollständige Schema liegt in `supabase/admin-schema.sql`. Zusammenfassung:

### Tabellen

**`profiles`** — spiegelt `auth.users`, erweitert um App-Felder:
```sql
id          uuid PRIMARY KEY (= auth.users.id)
email       text
name        text        -- Anzeigename (User kann setzen)
lang        text        -- 'de' | 'en'
is_admin    boolean     DEFAULT false
created_at  timestamptz
last_seen_at timestamptz
deleted_at  timestamptz -- Soft-Delete (NULL = aktiv)
```

**`user_progress`** — ein Row pro User pro Kurs:
```sql
user_id     uuid (→ auth.users.id)
course_uid  text        -- eindeutige Kurs-ID aus data.js / data.en.js
watched     boolean
progress    integer
test_passed boolean
test_score  integer
updated_at  timestamptz
UNIQUE(user_id, course_uid)
```

### Trigger & Funktionen
- `handle_new_user()` — Trigger: legt automatisch ein `profiles`-Row bei jedem Signup an
- `is_admin()` — Security-Definer-Funktion: gibt `true` zurück wenn der aktuelle User Admin ist (für RLS)

### RLS-Policies
- User liest/schreibt nur eigene Rows
- Admin (via `is_admin()`) liest/schreibt alle Rows
- Soft-Delete: `deleted_at IS NOT NULL` = gelöschter User (kein Hard-Delete)

### Admin-User
```sql
UPDATE profiles SET is_admin = true WHERE email = 'evolutionnext696@gmail.com';
```

---

## 7. Architektur-Entscheidungen (wichtig zu verstehen)

### Asset-Pfade (GitHub Pages Subpath)
Die App läuft unter `/novo-academy/` (nicht Root). Alle Assets brauchen dieses Präfix.
- **`assetUrl(path)`** in `data.js` — für einzelne Asset-Pfade: `assetUrl('/signature.png')`
- **`prefixAssetPaths(obj)`** in `data.js` — walkt COURSES/HOME und prefixiert alle Asset-Strings
- **`_BASE`** in `generateCert.js` — für Font- und Template-URLs im PDF-Generator

### Sprachsystem
- **`LangContext`** + **`useLang()`** Hook in `App.jsx` — Sprache wird durch die ganze App propagiert
- **`t(lang, key)`** + i18n-Dictionary in `data.js` — alle UI-Strings übersetzt (60+ Keys)
- **`updateMyLang(lang)`** in `auth.js` — persistiert Sprache in Supabase profiles
- Kurse haben separates `lang`-Feld: `COURSES` (DE) in `data.js`, `COURSES_EN` in `data.en.js`

### Auth-Fallback
`auth.js` prüft via `USE_REAL`-Flag ob Supabase-Env-Vars gesetzt sind. Wenn nicht → localStorage-Mock. Das erlaubt lokales Entwickeln ohne Supabase-Account.

### Zertifikat (Multi-Page)
- Max. 16 Kurse pro Seite (`MAX_MODULES_PER_PAGE = 16`)
- Bei >16 Kursen: `pdf-lib` kopiert die Template-Seite mehrfach via `copyPages()`
- `drawCertPage()` zeichnet den jeweiligen Kurs-Slice auf jede Seite

### Namen aus E-Mail
- `prettyNameFromEmail(email)` — leitet lesbaren Namen aus E-Mail ab (z.B. `john.doe@...` → `John Doe`)
- `bestDisplayName(name, email)` — nimmt `name` wenn gesetzt, sonst `prettyNameFromEmail(email)`

---

## 8. Kurs-Struktur

### Deutsche Kurse (`src/data.js`)
22 Kurse in 10 Kategorien. Kurse haben folgende Felder:
- `id`, `uid` (UUID, stabil), `lang: 'de'`
- `youtubeId` (Single-Video) **oder** `videoSegments[]` (Multi-Video)
- `questions[]` (Multiple-Choice-Test)
- `documents[]` (downloadbare PDFs/PPTX)
- `contentType: 'course' | 'faq' | 'training'`

### Englische Kurse (`src/data.en.js`)
22 Kurse, spiegelbildlich zu DE, mit `lang: 'en'` und eigenen UUIDs.

### Videos — Aktueller Stand (Stand: 2026-06-03)

**Vorhandene EN-Videos:**

| Kurs | YouTube-ID |
|---|---|
| The Gene-Diet: Scientific Basis | p02EmbTNRqE |
| Eat Healthy by Your Genes: Scientific Basis | pRU2p2Banno |
| Athletic Performance: Scientific Basis | cdsMJEPUv5A |
| Detoxification: Scientific Basis | DbRx4Kjqkes |
| Healthy Skin & Appearance: Scientific Basis | IgNeWJ6tTng |
| Personalized Supplementation: Scientific Basis (`supp-sci-en`) | TIHnA7J6EP4 *(2026-06-02 ergänzt)* |
| Drug Intolerance / Pharmacogenetics: Scientific Basis (`pharma-sci-en`) | SgzAZyUIx-0 *(2026-06-02 ergänzt)* |
| Gene-Diet Consultation Training | 12 Segmente (siehe data.en.js) |
| Nutrition Consultation Training | 22 Segmente (siehe data.en.js) |
| Detox Consultation Training | 4 Segmente (aus Nutrition-Serie) |

**Fehlende EN-Videos (noch nicht aufgenommen → zeigen „VIDEO COMING SOON"):**
- Biological Age: Scientific Basis (`ba-sci-en`) — *falsches Video `udTodouyDsA` am 2026-06-02 entfernt, wartet auf richtiges*
- Burnout & Stress: Scientific Basis (`bo-sci-en`)
- Burnout & Stress: Consultation Training (`bo-report-en`)
- Biological Age: Consultation Training (`ba-report-en`)

### Long-Form-Quellvideos (für Heygen-Übersetzung)
Die englischen Analyseberatungs-Videos (4K) liegen lokal in zwei Ordnern (OneDrive, NICHT im Repo):
- Quelle: `…\SOME DANIEL - Dokumente\General\A - VIDEO AND REEL FOLDER\LONG FORM ENG\`
- Heygen-Eingang: `…\EXTERNAL MATERIAL - Dokumente\General\LONG FORM VIDEOS ENG\`
(34 Teile: Weight Management 1–11+36, Nutrition 12–33; Download via `yt-dlp` aus dem „10X Health"-Channel.)

---

## 9. Admin-Panel

Erreichbar über das Zahnrad-Icon (nur für `is_admin = true` User sichtbar).

### Features
- **Dashboard** — Nutzer-Statistiken: Gesamt, Aktiv (≥1 Kurs), Wachstum, Zertifikate, Sprach-Split
- **Nutzerliste** — alle User mit Details, Kurs-Status-Toggles
- **User-Aktionen** (Dropdown-Menü pro User):
  - Alle Fortschritte zurücksetzen
  - Umbenennen
  - Admin-Status vergeben/entziehen
  - Soft-Delete / Wiederherstellen
  - „Gelöschte anzeigen"-Toggle in der Toolbar

### Admin-Accounts
- `evolutionnext696@gmail.com` (Daniel Wallerstorfer) — Haupt-Admin

---

## 10. Deployment

### GitHub Actions (`.github/workflows/deploy.yml`)
- Trigger: Push auf `main`
- Build: `npm run build` mit Supabase-Secrets aus GitHub Repository Secrets
- Deploy: `peaceiris/actions-gh-pages` auf Branch `gh-pages`

### Manuell deployen
```bash
git add .
git commit -m "feat: beschreibung"
git push origin main
# → GitHub Actions baut automatisch und deployed
```

### GitHub Pages Einstellungen
- Repo: `https://github.com/Novogenia-AG/novo-academy` (PUBLIC — Org auf Free-Plan)
- Branch: `gh-pages` (wird von Actions verwaltet)
- **Custom Domain:** `academy.novopilot.com` (in `public/CNAME`; DNS-CNAME → `novogenia-ag.github.io`; „Enforce HTTPS" aktiv)
- **Base URL:** `/` (Root, wegen Custom Domain) — Deploy setzt `VITE_BASE_PATH=/`
- ⚠️ **Cache-Falle:** GitHub Pages liefert `index.html` mit `max-age=600`. Nach einem Deploy zeigt ein zwischengespeicherter Browser bis zu 10 Min eine **weiße Seite** (alte index.html referenziert ein gelöschtes JS-Bundle → 404). Lösung für Tester: Hard-Reload (`Strg+Shift+R`).

---

## 11. Bekannte offene Punkte / TODOs

### Hoch-Priorität
- [ ] **Testauswertung serverseitig machen.** Ob ein Test bestanden ist, entscheidet heute allein der Browser und schreibt `test_passed`/`test_score` direkt in `user_progress`. Ein manipulierter Client kann sich damit jedes Zertifikat ausstellen. Mindestens ein DB-Trigger, der `test_passed` nur bei `test_score >= 80` zulässt; sauber wäre eine `submit_test`-RPC, die selbst auswertet und der der Antwortschlüssel gar nicht erst im Client vorliegt.
- [ ] **Videosprache der Dubs korrigieren.** Bei den geprueften KI-Dubs steht die Videosprache auf Englisch (USA) — auch bei tschechischen und portugiesischen Fassungen. YouTube leitet daraus die Sprache der Auto-Untertitel ab; die sind dadurch doppelt unbrauchbar. Vor dem Erzeugen von Untertiteln korrigieren.
- [ ] **Supabase-Migration ausführen** — `supabase/migration-2026-08-06-lock-admin-column.sql` im SQL-Editor. Bis dahin kann jeder eingeloggte Nutzer `is_admin` auf sich selbst setzen, und die Admin-Knöpfe Status/Löschen/Wiederherstellen funktionieren nicht.
- [ ] **YouTube: "verändertes oder synthetisches Material" auf allen KI-Dub-Uploads setzen** (Studio → Details → Altered content) + Offenlegungssatz in die Beschreibung. Pflicht nach Art. 50 Abs. 4 KI-VO; im Code nicht lösbar, die Videos liegen auf dem Dr.-DW-Kanal.
- [ ] **Manuell geprüfte Untertitel** für die Dub-Sprachen. WCAG 1.2.2 (Stufe A) verlangt korrekte Untertitel; YouTubes Auto-Captions auf KI-synchronisierten Spuren reichen nicht. **Neue Sprachversionen nie ohne veröffentlichen** — ein Re-Upload alter Videos wäre eine neue Veröffentlichung und zöge die volle Pflicht nach.
- [ ] **9 große Download-Dateien (>100 MB) liefern live 404** — sie sind gitignored (GitHub lehnt >100 MB ab) und fehlen im CI-Build. Liste siehe `.gitignore` („Large assets"). Fix: nach **Supabase Storage** (oder R2) hochladen, öffentlich machen, Links in `data.js`/`data.en.js` umstellen. **Achtung:** Diese Dateien liegen NICHT im Repo, nur im lokalen OneDrive-Ordner.
- [ ] Fehlende EN-Videos aufnehmen (siehe Abschnitt 8)
- [ ] EN-Version der Werberichtlinie PDF (aktuell zeigt `legal-basics-en` keine Downloads)

### Mittel-Priorität
- [ ] Demo-Reports auf Englisch übersetzen (aktuell nur DE verfügbar; EN-Kurse zeigen keine Downloads)
- [ ] Save-Progress Debounce (Race Condition bei schnellem Klicken)
- [ ] `loadProgress`-Race-Condition beim initialen Load

### Niedrig-Priorität
- [ ] `confirm()` / `alert()` durch schönere Modal-UX ersetzen
- [ ] Aria-Labels auf Englisch für Screen-Reader (`scroll-btn`, `FullVideo`)
- [ ] Hard-Delete von `auth.users` (bräuchte Edge Function mit `service_role`-Key; aktuell nur Soft-Delete)

---

## 12. Wichtige Muster (Code-Konventionen)

### Neuen DE-Kurs hinzufügen
1. Objekt in `COURSES`-Array in `src/data.js` einfügen
2. `uid` muss eine eindeutige UUID sein (nie doppelt verwenden)
3. `initialWatched: false, initialTestPassed: false` immer setzen
4. Assets mit `assetUrl('/pfad/zur/datei')` referenzieren

### Neuen EN-Kurs hinzufügen
1. Objekt in `COURSES_EN`-Array in `src/data.en.js` einfügen
2. Gleiche Regeln wie DE, `lang: 'en'` setzen
3. Wenn kein Video vorhanden: `youtubeId` weglassen (App zeigt automatisch "VIDEO COMING SOON")

### Neuen i18n-String hinzufügen
1. Key zum Dictionary in `data.js` (Funktion `t()`) hinzufügen
2. Beide Sprachen (`de` + `en`) befüllen
3. Im Code: `const tl = useT(); tl('meinKey')` oder `t(lang, 'meinKey')`

### CSS-Variablen (Design-System)
```css
--wine: #5e0047       /* Hauptfarbe Novogenia */
--wine-soft: #f5e9ef  /* Heller Hover-Hintergrund */
--border: #e0d8df
--text: #1a1a1a
--muted: #8a7a88
```

---

## 13. Supabase Dashboard

- URL: https://supabase.com/dashboard/project/whjxtrrztfzhjqtsyqqf
- Region: eu-central-1 (Frankfurt)
- Auth-Anbieter: Email/Passwort + Google OAuth
- Google OAuth Callback: `https://whjxtrrztfzhjqtsyqqf.supabase.co/auth/v1/callback`
- Site URL: `https://academy.novopilot.com` (in Supabase Auth → URL Configuration; Redirect-URLs ebenfalls)

---

## 14. Google OAuth (Supabase)

- Google Cloud Console Projekt: `novo-academy-497920`
- OAuth-Client konfiguriert für: `https://whjxtrrztfzhjqtsyqqf.supabase.co/auth/v1/callback`
- Redirect URLs in Supabase: `https://academy.novopilot.com`
- OAuth-Consent-Screen „App name" = **NOVO ACADEMY** (In Produktion) → neue Nutzer sehen „Bei NOVO ACADEMY anmelden", nicht mehr die Supabase-URL

---

## 15. Änderungslog (neueste zuerst)

| Datum | Änderung |
|---|---|
| 2026-08-18 | **🔍 Fehlersuche über die ganze Anwendung + Behebung (Commits `856e021`…`fadf276`).** Sieben Prüfdimensionen parallel, jeder Fund von zwei unabhängigen Skeptikern geprüft (143 Agenten): **68 Funde, 58 bestätigt, 10 verworfen.** **Drei Regressionen aus der Runde davor:** (1) Der KI-Hinweis am Support-Bot war **unsichtbar** — er steckte in `.ndc-label`, das `opacity:0` ist und erst bei `:hover` erscheint; auf Touch-Geräten also nie, am Desktop frühestens im Moment des Klicks. Art. 50 Abs. 1 KI-VO war damit für sehende Nutzer **nicht** erfüllt, obwohl als erledigt gemeldet. Jetzt eigene, dauerhaft sichtbare Pille (gemessen: 220×42 px am Desktop, 214×26 px bei 375 px, kein Überlauf). (2) Der `<main>`-Wrapper um die ganze Ansicht **verschluckte Kopf- und Fußbereich**: `<header>`/`<footer>` innerhalb von `<main>` verlieren ihre banner-/contentinfo-Rolle — der einzige Link zur Barrierefreiheitserklärung war per Landmarken-Navigation unauffindbar. (3) Der Skip-Link sprang deshalb **vor** die Kopfzeile, also zurück in die Navigation, die er überspringen soll. Beide behoben: Zweige mit eigener Kopfzeile setzen ihre `main`-Landmarke selbst dahinter. **Kritisch aus dem Bestand:** der CI-Sicherheitsgurt prüfte nur `VITE_SUPABASE_URL`, `auth.js` braucht aber **beide** Werte — fehlt allein der Anon-Key, deployt die Seite grün mit Mock-Auth und `is_admin:true` für jeden Besucher (nachgestellt, gefixt, gegengeprüft); `admin_soft_delete_user` hatte keinen Letzter-Admin-Schutz, setzt `is_admin` aber auf false — der einzige Admin konnte sich selbst dauerhaft aussperren, Rückweg nur im SQL-Editor; `revoke execute … from anon` ließ den PUBLIC-Grant stehen; RLS auf `user_progress` wurde ohne Eigen-Zeilen-Policies aktiviert (RLS ohne Policy sperrt alles). **Weiter behoben:** `useCookieConsent` hielt pro Komponente eigenen State — die Zustimmung erreichte bereits gemountete Player nie und der Widerruf ebenso wenig (jetzt ein Zustand per Context, in beide Richtungen ohne Reload nachgemessen); `saveProgress` verschluckte den Upsert-Fehler; `adminLoadAllUsers` meldete bei fehlender Berechtigung „keine Nutzer"; Admin-Aktionen verwarfen jeden `{ error }`; `auth_error_rate_limited` fehlte in allen 9 Zusatzsprachen; die Kachel war ein `<article role="button">`, was **22 h3-Kurstitel** aus der Überschriftenstruktur löschte; Kontraste 3,0:1 / 1,5:1 / 2,3:1 angehoben; zertifiziert vs. offen hing allein an Grün gegen Grau; Seitentitel blieb in der ganzen SPA gleich; `geheZu()` schrieb keinen History-Eintrag (Zurück-Taste verließ die Rechtsseiten); `RelatedVideoTile` bettete YouTube ohne Cookie-Schranke ein; CSP-`connect-src` erlaubte per Wildcard jedes fremde Supabase-Projekt und `script-src` erlaubte `blob:`; `*.githubusercontent.com` statt der umbenannten Einzelhosts (die PDF-Vorschau der Release-Dokumente war still blockiert). **Neuer Dauerschutz:** `scripts/check-i18n.mjs` läuft im CI **vor** dem Build und bricht ab, sobald eine Übersetzung fehlt (188 Keys × 9 Sprachen grün) — bisher fiel so etwas stillschweigend auf Deutsch zurück. **Nicht behoben, bewusst:** Testauswertung und Zertifizierung entscheidet weiterhin der Client und schreibt direkt in die DB (Abschnitt 11); YouTube-Videosprache steht bei den Dubs auf Englisch; die sieben Großdateien treiben das Deploy-Artefakt weiterhin auf 182 MB. |
| 2026-08-18 | **⚖️ KI-Kennzeichnung (KI-VO Art. 50) + Barrierefreiheit (BaFG/EN 301 549) — Commits `ebbd33e`, `82c7ddc`, `ba4209b`, `935cc91`, `57846e2`.** **KI-VO, seit 02.08.2026 anwendbar:** Die HeyGen-Dubs erzeugen Stimme UND Lippenbewegungen einer realen Person → **Deepfake nach Art. 3 Nr. 60**, offenlegungspflichtig nach Art. 50 Abs. 4. Unter jedem Video der 9 synchronisierten Sprachen steht jetzt ein Hinweis (Text, außerhalb des iframe, sichtbar VOR dem Abspielen); de/en bleiben bewusst ungekennzeichnet, das sind echte Aufnahmen. Der Support-Bot nennt sich jetzt in allen 11 Sprachen als KI (Art. 50 Abs. 1) — "Frag uns!" allein ließ das nicht erkennen. **Barrierefreiheit:** ⚠️ **KRITISCH behoben** — `.test-opt input` hatte `display:none`, damit waren **alle 44 Antwortoptionen weder fokussierbar noch im Accessibility-Tree**: der komplette Test- und Zertifizierungspfad war ohne Maus unbedienbar (WCAG 2.1.1/4.1.2, Stufe A). Ersetzt durch visually-hidden + sichtbaren Fokusring über `:has(input:focus-visible)`, empirisch geprüft (44 Radios fokussierbar und auswählbar). Weiter: Skip-Link zeigte auf 10 von 12 Ansichten ins Leere (Sprungziel ist jetzt die gemeinsame Seitenhülle, zugleich einzige `main`-Landmarke); Fokus wandert beim Seitenwechsel in den Inhalt (2.4.3) — über einen Effekt **nach** Reacts Commit, nicht per `requestAnimationFrame` (das lief davor und fokussierte den bereits ausgetauschten Knoten); greift dadurch auch bei der Browser-Zurück-Taste; `html lang` korrigiert (`cz`→`cs`, `sr`→`sr-Latn`, 3.1.1); `role="alert"` auf Auth-Fehlern. **Neue Barrierefreiheitserklärung** nach § 14 Abs. 2 BaFG mit Kontaktstelle in schriftlicher und mündlicher Form (+43 662 262 102, service@novogenia.com) und Verweis auf das Sozialministeriumservice — in **allen 11 Sprachen**, im Footer jeder Ansicht verlinkt. **Offen für Daniel:** (1) YouTube-Flag "verändertes oder synthetisches Material" auf allen Dub-Uploads setzen + Offenlegungssatz in die Videobeschreibungen (nur im Studio möglich, nicht aus dem Code); (2) manuell geprüfte Untertitel — neue Sprachversionen **nie ohne** veröffentlichen; (3) anwaltlich zu klären: BaFG-Anwendbarkeit (B2B vs. Verbraucher), Art. 50 Abs. 4 UAbs. 2 für KI-übersetzte Texte, KMU-Status. |
| 2026-08-07 | **Nachzug zur QA (Commits `74b34bc`, `d1fb312`).** (1) **Eigene Fachtests für `nut-report` und `tx-report`** (je 6 Fragen, aus den EN-Gegenstücken abgeleitet und an den deutschen Kursinhalt angepasst). Beide waren `contentType: 'course'` = zertifizierbar, hatten aber keinen `questions`-Block und bekamen still `GENERIC_QUESTIONS` — denselben fachfremden Prototyp-Test. (2) **Der stille Fallback ist entfernt:** Kurse ohne eigenen Test lösen jetzt eine Konsolenwarnung aus, statt unbemerkt einen Platzhaltertest zu erben. Verifiziert: kein zertifizierbarer Kurs ohne Test, keiner mehr mit generischem Test. (3) **Frame-Busting repariert:** Das am Vortag eingebaute Inline-Skript in `index.html` wurde von der eigenen CSP blockiert (`script-src 'self' blob:` erlaubt kein Inline) — im Browser verifiziert. Verschoben nach `src/main.jsx`, dort greift `'self'`. Damit ist der Clickjacking-Schutz erstmals wirklich aktiv; `X-Frame-Options` und `frame-ancestors` sind als `<meta>` beide wirkungslos und GitHub Pages kann keine echten Header setzen. **Hinweis:** Die CSP-Meldungen zu Inline-Skripten im Dev-Server stammen von Vites HMR-Client und treten in der Produktion nicht auf (`dist/index.html` enthält nur das externe Modul). |
| 2026-08-06 | **🛡️ QA über die ganze Seite + Behebung (Commits `2ce6af3`…`07f95e4`).** 11 Sprachen, 242 Kurse, 287 Videos, 57 Materialien geprüft; Laufzeit, Sicherheit, Code, Daten, Mobil. **KRITISCH behoben:** (1) Die `profiles`-RLS prüfte nur die Zeile, nicht die Spalten — jeder eingeloggte Nutzer konnte per PATCH `is_admin:true` auf der eigenen Zeile setzen und danach alle E-Mails lesen und jeden Fortschritt ändern. `supabase/migration-2026-08-06-lock-admin-column.sql` entzieht das Spaltenrecht und verlagert alle Admin-Schreibzugriffe in `security definer`-Funktionen. **⚠️ MUSS im Supabase-SQL-Editor ausgeführt werden — bis dahin ist die Lücke offen und die Admin-Knöpfe Status/Löschen/Wiederherstellen funktionieren nicht.** (2) `loadProgress` gab bei JEDEM Fehler `{}` zurück (ununterscheidbar von „kein Fortschritt"); die App schrieb daraufhin 242 Nullzeilen zurück → Fortschrittsverlust bei jedem Netzwerkfehler. Gibt jetzt `null` zurück, Speichern bleibt dann gesperrt; zusätzlich Diff-Speicherung und `pagehide`-Flush. **HOCH behoben:** Soft-Delete löschte `user_progress` hart (verstieß gegen Grundregel 2); „Cookie-Einstellungen" speicherte den String `"null"` und machte damit ALLE Videos dauerhaft unabspielbar ohne Weg zurück; Kurs `legal-basics` war in allen 11 Sprachen unsichtbar, weil der Video-Filter reine Artikelkurse traf (jetzt +1 Kachel je Sprache); arabische Zertifikate wurden mit leeren Kästchen gedruckt (Montserrat hat keine arabischen Glyphen — Noto Naskh Arabic eingebettet, 0 Nullbytes im PDF verifiziert); mobile Sprachleiste ragte aus dem Viewport (643→365 px bei 375 px, RO/ES/SR/AR waren unerreichbar). **MITTEL behoben:** Zertifikat zählte Kurse aller 11 Sprachen; Sprachumschalter auf Login/Signup kannte nur 5 Sprachen; Test-Einleitung war für nl/ro/es/sr/ar hart deutsch; Datumsformat deutsch im englischen Satz; Rate-Limit zählte auch erfolgreiche Logins und meldete „Passwort ungültig"; CSP `worker-src` ohne `'self'` und fehlender GitHub-Host; `X-Frame-Options`/`frame-ancestors` als `<meta>` wirkungslos (im Browser verifiziert) → Frame-Busting; CI bricht jetzt ab, wenn `VITE_SUPABASE_URL` fehlt (sonst deployt Mock-Auth mit `is_admin:true` für jeden); `404.html` im Deploy; Support-Bot in 11 Sprachen; `window.opener` gekappt. **Vollständiger Bericht:** `AI RESOURCES - Dokumente\NOVO ACADEMY\QA_BEFUND_2026-08-06.md` (bewusst NICHT im öffentlichen Repo). **Sauber befunden:** 287/287 Videos einbettbar, 46/46 Dokumentlinks OK, keine doppelten UIDs, `npm ci` synchron. **Deploy-Falle:** Actions meldet „Timeout reached, aborting!" und `failure`, die Auslieferung läuft aber durch — Ursache ist das 182-MB-Artefakt, `timeout` in `deploy-pages` ist hart auf 10 Min gedeckelt. Dauerhafte Lösung: die 7 großen Dateien unter `public/course-materials` ins Release `course-materials` verschieben (8 andere liegen bereits dort). **Offen:** deutsche Testfragen für `nut-report`/`tx-report` (nutzen noch den generischen Prototyp-Test). |
| 2026-08-05 | **🎬 ARABISCH KOMPLETT: alle 41 AR-Videos live + eingebettet.** Alle 41 AR-Entwürfe auf dem Dr.-DW-Kanal per Studio-Upload-Assistent veröffentlicht (Zielgruppe „kein Inhalt für Kinder", Sichtbarkeit öffentlich; Massenbearbeitung wird von YouTube für Entwürfe serverseitig abgelehnt — es geht nur einzeln über den Assistenten). **Alle 41 IDs oEmbed-200-verifiziert** und als `VIDEOS`-Map (EN-Quell-ID → AR-ID) in `data.ar.js` injiziert — Zuordnung über `01_ARABISCH_MAPPING.csv` (Titel→EN-ID) × beim Veröffentlichen gesammelte Wizard-URLs (`ar_published_ids.json` in `VIDEO_PIPELINE/state/`), 41/41 gematcht, 0 Duplikate. **EN-Leak-Fix:** `HOME_TOP_VIDEOS_BY_LANG` um `it/nl/ro/es/sr/ar: []` ergänzt — die 6 neuen Sprachen fielen sonst auf die ENGLISCHEN Intro-Karten zurück (CZ/FR/PT-Konvention: ausblenden bis lokalisierte Intros existieren). Lokale QA (Mock, AR): 17/22 Kurse sichtbar (vorher 7), Mehrfach-Kachel-Reihen nebeneinander (RTL-korrekt von rechts), keine EN-Texte, Embed-Test grün (`embed/adzaRXttrWI` lädt). Die Produkt-Labels „(Shape, Weight Sensor)" etc. bleiben bewusst englisch (Produktnamen, wie in DE). |
| 2026-08-04 | **RTL-Fix: Wortmarke.** Unter Arabisch (`dir=rtl`) zeigten die Flex-Logo-Container „ACADEMYNOVO" statt „NOVOACADEMY" (Flex spiegelt die Item-Reihenfolge). Fix: `direction: ltr` auf `.page-title-logo`, `.langpick-logo`, `.landing-logo` (styles.css). Geometrisch verifiziert (Topbar + Landing, AR). Optische RTL-Prüfung ergab sonst: Kachel-Layout gesund — mehrere Kacheln liegen nebeneinander, RTL-korrekt von rechts (Klon-Test); dass AR aktuell „alles untereinander" zeigt, liegt am 7/22-Inhaltsstand (je Kategorie 1 Kurs), nicht am CSS — löst sich mit der Video-Injection (§19.4). |
| 2026-08-04 | **🚀 GEPUSHT & DEPLOYT: die 4 Sprachen-Commits vom alten Laptop (403-Blocker gelöst).** Die auf Daniels altem Laptop gestrandeten Commits (`e37ca9f`/`70c5236`/`b239a6e`/`3b4965a`) per `git bundle` über OneDrive (`NOVO ACADEMY\VIDEO_PIPELINE\unpushed.bundle`) auf den neuen Rechner transferiert, dort erneut verifiziert (`npm ci` grün, Build grün mit Chunk-Split 307 kB gzip initial, Browser-Test: 11 Sprachen im Picker, AR `dir=rtl` ↔ RO `dir=ltr`, alle 11 `data.*.js` importieren fehlerfrei) und mit berechtigtem Konto gepusht → GitHub-Actions-Deploy auf `3b4965a`. **Neuer Arbeitsrechner eingerichtet:** Repo `C:\dev\novo-academy`, Node v24.19.0 (ZIP) in `C:\dev\tools\node` + User-PATH, `.env.local` angelegt. Nächster Schritt bleibt §19.4 (AR-YouTube-Videos veröffentlichen → IDs injizieren). |
| 2026-07-31 | **🌍 LIVE: RO, ES, SR, AR freigeschaltet (11 Sprachen) — Videos folgen nach.** Feature-Branch `feature/languages-ro-es-sr-ar` auf `main` gemergt (Konflikt nur in dieser Datei; `App.jsx` auto-merge sauber: Perf-Änderungen und Sprach-Änderungen liegen in verschiedenen Bereichen). Damit sind Plattform-Übersetzung (Kurse, Tests, 168 UI-Keys, Landing/Legal-Inline-Strings) und **Arabisch-RTL** live. **⚠️ Bewusst mit unvollständigem Katalog live gestellt (Anweisung Daniel):** die `VIDEOS`-Maps sind noch leer → `groupForDisplay` blendet alle Video-Kurse aus, die 4 neuen Sprachen zeigen aktuell **7 von 22 Kursen** (nur FAQ/Zusatz). Sie füllen sich **nicht** automatisch — die YouTube-IDs müssen nach dem Veröffentlichen eingetragen werden. **Dub-Stand (HeyGen, fertig produziert):** AR 41/41, RO 40/41, ES 7/41 (alle 7 Wissenschafts-Basis-Kurse) = 88 Videos / 22,4 GB, liegen upload-fertig benannt in `C:\dev\YOUTUBE_UPLOAD\{01_ARABISCH,02_RUMAENISCH,03_SPANISCH}` (je mit `_MAPPING.csv` + `_ANLEITUNG.txt`). **Blocker:** 30 arabische Videos sind auf YouTube nur **Entwurf** → nicht einbettbar. Nach dem Veröffentlichen: `C:\dev\lang_pipeline\match_and_inject.mjs <code>` matcht die Videos über den Titel, **verifiziert jedes per oEmbed** und schreibt die IDs in `data.<code>.js` (bricht ab, wenn ein Video nicht einbettbar ist). Restguthaben ~8.000 Credits; für ES-Beratungsschulungen + SR fehlen ~50.500. Messwert für Kalkulationen: **120 API-Credits pro Videominute**. |
| 2026-07-25 | **⚡ Performance-Optimierung + Voll-QA (keine Inhaltsänderung).** Das Initial-Bundle war ein einziger 2.674 kB-Chunk (**1.006 kB gzip**), den jeder Besucher vor dem ersten Frame lud. **Ergebnis: 310 kB übertragenes JS beim ersten Laden = −69 %** (im Browser gemessen, DOMContentLoaded 243 ms). Maßnahmen: (1) `generateCert.js` (pdf-lib + fontkit) wird jetzt **dynamisch im Download-Handler** importiert; (2) `CertTemplateBg.jsx` + `PdfThumb.jsx` sind **`React.lazy`** (pdfjs lädt erst, wenn ein PDF wirklich gerendert wird) — `PdfThumb` ist in einen `Suspense fallback={null}`-Wrapper gekapselt, was exakt dem bisherigen „keine Vorschau"-Verhalten entspricht; (3) `manualChunks` in `vite.config.js` trennt `react` + `supabase` vom App-Chunk → Content-Updates invalidieren den Vendor-Cache nicht mehr; (4) **3 tote Dependencies entfernt** (`jspdf`, `html2canvas`, `@fontsource/montserrat` — waren nirgends importiert) + **Lockfile regeneriert** (⚠️ CI nutzt `npm ci`, das bei Drift zwischen package.json und package-lock **hart fehlschlägt** — lokal mit `npm ci` verifiziert, 88 Pakete); (5) `index.html`: **Caveat-Font entfernt** (wurde geladen, aber in keinem Stylesheet referenziert), `meta description` (SEO) + `preconnect` zu Supabase ergänzt. **Verifiziert im Browser gegen den Production-Build:** Zertifikat-Vorschau (Canvas 1190×1683), PDF-Download (Chunk lädt on demand, 0 Fehler), Dokument-Thumbnails (echte PDF-Seiten gerendert), Mobile 375 px ohne horizontalen Overflow, Konsole fehlerfrei. **QA:** 154 Kurse × 7 Sprachen → **0 Datendefekte** (keine doppelten uids, jeder zertifizierbare Kurs hat einen validen Test, 46/46 Dokumente vorhanden), i18n-Parität 168 Keys × 5 Blöcke, **alle 289 YouTube-Videos einbettbar**. Lazy-Chunks (nur bei Bedarf): `generateCert` 1.150 kB, `pdf.worker` 457 kB. |
| 2026-07-22 | **➕ 4 neue Sprachen text-fertig: RO, ES, SR (Serbokroatisch, Latein), AR (Arabisch, RTL)** — datengetrieben nach Kundenzahlen der Bestellländer priorisiert. Neue `data.{ro,es,sr,ar}.js` (transformieren `COURSES_EN` wie die bestehenden: übersetzte Texte inkl. **aller Tests**, Dokumente bleiben Englisch). Übersetzung via Multi-Agent-Workflow (32 Agents Kursinhalt + 4 Agents Landing/Legal-Inline-Strings); Struktur-Validierung 0 Probleme (keine verschobenen `correct`-Indizes). `ui-extra.js`: je 168 UI-Keys ergänzt (jetzt 9 Blöcke). `App.jsx`: Sprachumschalter (alle 4 Blöcke) auf `.map()` refaktoriert + RO/ES/SR/AR; `INLINE_I18N` + `INLINE_I18N_TEMPLATES` um 4 Sprachen erweitert (63+4 Keys); Inline-Siegel/Button-Objekte ergänzt. **Arabisch RTL:** `document.documentElement.dir = lang==='ar' ? 'rtl' : 'ltr'` (App.jsx useEffect); Browser-verifiziert (Landing, Registrierung, Dashboard-Kurskarten, Siegel „معتمد" — alles `dir=rtl`, sauber übersetzt). Build grün (404 Module), Audit 0 Defekte (242 Kurse). **⚠️ VIDEOS-Maps sind LEER** → Video-Kurse werden von `groupForDisplay` ausgeblendet, d.h. die 4 Sprachen zeigen bis zu den Dubs fast nichts → **NICHT auf `main`/live** (Feature-Branch). **OFFEN (Phase 2):** 40 EN-Quellvideos je Sprache = **160 HeyGen-Lipsync-Dubs + YouTube-Uploads** → IDs in die `VIDEOS`-Maps → dann Sprache live. Regen-Tooling war einmalig (nicht im Repo). |
| 2026-06-23 | **🎬 LIVE: 15 fehlende Wissenschafts-Lipsyncs (CZ/FR/PT) eingebettet** (commit 84207e6). Die 6 Wissenschafts-Übersichtsvideos (Gene-Diät/Ernährung/Sportliche Leistung/Supplemente/Beauty/Pharmakogenetik) waren als Heygen-Lipsyncs (longform-Pipeline → `HEYGEN/academy_extras_jobs.json` + `longform_all_state.json`) **bereits erzeugt + heruntergeladen, aber nie hochgeladen**. Alle 15 (CZ 3, FR 6, PT 6) per neuem `HEYGEN/upload_sci_academy.py` (resumable, quota-safe, gehärtete Retries) **public + embeddable** auf den Dr.-DW-Kanal geladen; lokalisierte Titel `<Modul> – <Wiss. Basis> (CZ/FR/PT)`; oEmbed-200-verifiziert; IDs in die `VIDEOS`-Tabellen von `data.{cz,fr,pt}.js` injiziert (`%TEMP%/inject_sci_vidmaps.py`, TEMP-vidmaps mitgepflegt → je 41 Einträge). **CZ + FR + PT damit inhaltlich vollständig** (alle Wissenschaftskurse sichtbar). Mapping: `HEYGEN/sci_upload_state.json` + `sci_vidmap_additions.json`. |
| 2026-06-23 | **🚀 LIVE: nd-native Redesign + 5 Sprachen + Support-Bot.** Komplettes Redesign in der offiziellen Novogenia/nd-native-Designlinie (`nd-redesign.css`: Plum-Tokens `#5E0047`, Pill-Buttons, Eyebrow-Kicker, Gradient-Blooms, Sticky-Frosted-Nav, dunkler Footer; `styles.css` `:root` re-mapped). **Mehrsprachig:** `data.cz.js`/`data.fr.js`/`data.pt.js` (+ `data.it.js`, ausgeblendet) transformieren `COURSES_EN` zur Laufzeit → übersetzte Texte + Lipsync-Videos (per Teil-Nr gemappt), **Dokumente bleiben Englisch**. UI-Chrome via `ui-extra.js` (168 Keys × cz/fr/pt) + `t()`-Patch; alle Inline-Strings über `LX`/`LXP`-Helper + `INLINE_I18N` (keine DE/EN-Leaks). **Support-Bot:** `SupportBotLauncher.jsx` (Floating-Sprechblase rechts unten, öffnet `novogenia-support-bot…/chat` in eigenem Fenster). **Sichtbarkeits-Filter:** Schulungen ohne Video + nicht-fertige Sprachen (IT) ausgeblendet (`groupForDisplay` + HomePage-Filter). YouTube: alle eingebetteten IT/CZ/FR/PT-Videos public + **embeddable** gesetzt (114 hatten Embedding aus). Sprach-Picker/Umschalter: DE/EN/CZ/FR/PT. **OFFEN (wartet auf Media Maker):** Lipsync für CZ 6 / FR 9 / PT 9 fehlende Wissenschafts-+Intro-Videos (Brief raus) → erscheinen automatisch via Filter. |
| 2026-06-08 | **Security- & Code-Qualitäts-Review (ganze Academy)**: Systematischer Scan — keine gefährlichen Patterns (`dangerouslySetInnerHTML`/`innerHTML`/`eval`/`document.write` = 0), kein `message`-Listener (kein eingehender postMessage-XSS-Vektor), keine echten Secrets in getrackten Dateien (nur der **public** Anon-Key, by-design), `npm audit prod` = 0 Vulns (die 2 moderate esbuild/vite betreffen nur den Dev-Server, nicht den Static-Build), CI `deploy.yml` least-privilege + Secrets korrekt. **1 Härtung umgesetzt:** YouTube-`postMessage` von Wildcard `'*'` auf exakte Origin `https://www.youtube.com` umgestellt (`App.jsx` `ytUnmuteOnLoad`) — Player-Befehle gehen nicht mehr an beliebige Fenster. CSP/Security-Header (`index.html`), Rate-Limiter, Input-Validierung, RLS-geschützte Admin-Queries und Soft-Delete-`is_admin`-Reset wurden geprüft = bereits solide, keine Änderung nötig. |
| 2026-06-08 | **Senior-QA-Pass (ganze Academy)**: Vollständiger Defekt-Scan über `data.js` + `data.en.js` — 90 YouTube-Videos (alle abrufbar), 46 Download-Dokumente (alle OK), alle Thumbnails/Cover, keine doppelten UIDs, 168 i18n-Keys mit DE+EN-Parität, alle 132 genutzten `t`-Keys vorhanden, kein zertifizierbarer Kurs ohne Test → **0 Datendefekte**. Code-Review `App.jsx`: **1 HIGH-Bug gefixt** — bei Vor/Zurück-Navigation auf einen nach einem Deploy entfernten/umbenannten `courseId` lieferte `courseById()` `undefined` → ungeschützter Zugriff → **Weißer-Bildschirm-Crash der ganzen SPA**. Fix: 4 Guards in den Kurs-Render-Branches (ungültiger Kurs → Fallback auf Home). Zusätzlich **globaler `ErrorBoundary`** (`src/ErrorBoundary.jsx`, in `main.jsx` um `<App/>`) als Schutznetz — jeder unvorhergesehene Render-Fehler zeigt jetzt einen freundlichen DE/EN-Fallback statt weißer Seite; Fortschritt bleibt gespeichert. |
| 2026-06-08 | **Beauty-Wissenschaftsvideo repariert**: eingebettetes `8RVq0Qp4r64` (Modul „Gesunde Haut → Wissenschaftliche Basis") war **vom Kanal gelöscht** → Modul live kaputt. Per Kanal-Inventur (215 Videos) korrektes Video gefunden: `5A5XoWH7XKk` „BEAUTY. Die 9 Faktoren des Alterns" (30:31, public; exakter Datei-/Titel-Abgleich mit `LONG FORM GER\BEAUTY…mp4`). ID ersetzt. **Tooling:** `Temp\yt_inventory.py` (listet Kanal + Privacy), Dump in `Temp\yt_inventory.json`. |
| 2026-06-08 | **#3b DE-Supplements-Video gelöst**: Aus „Gesund oder ungesund?" (`79MPy6BFqu8`) den Supplements-Teil (13:23–Ende) per yt-dlp herausgeschnitten → eigenes Video, **public** auf YouTube hochgeladen (`WV2pfawe6zI`, Titel „Personalisierte Nahrungsergänzung – Wissenschaftliche Basis", Kanal Dr. Daniel Wallerstorfer) → in DE-Modul `supp-sci` eingebunden. Vollvideo zusätzlich in `LONG FORM GER\Personalisierte Nahrungsergaenzung.mp4` abgelegt. |
| 2026-06-05 | **#5 Schreibweise final**: letzte Bindestrich-Variante „Genetics-Coach" (`landing_feature_certs_d`) korrigiert. Konvention: **DE „Genetik Coach", EN „Genetics Coach"** (bewusst sprachabhängig; Zertifikat schon korrekt). Re-Test (Sandra, 5.6.) bestätigt #1/#3/#4/#7 erledigt. Offen: #2 Downloads (Release noch nicht publiziert), #3b DE-Supplements-Video, #6 Zert-Umfang (Entscheidung). |
| 2026-06-03 | **#7 FAQ-Cover vereinheitlicht**: Die 5 generischen FAQ-Thumbnails (wm/nut/pg/bo/supp-faq) durch gebrandete „?"-Cover ersetzt (Stil wie ba-faq/beauty-faq). Per HTML-Template + Headless-Chrome gerendert → `public/thumbnails/*-faq-cover.jpg`. |
| 2026-06-03 | **QA-Fixes (Sandras Testbericht)**: #1 Fortschritt zählt nur noch zertifizierbare Module (100 % erreichbar); #3 DE `supp-sci` falsches Video (n9pkNybj1LU = Ernährung) entfernt → Platzhalter; #4 Test-Erfolgsmeldung klargestellt (zertifiziert erst nach Training-Abschluss); #5 DE-Marketing „Genetics Coach" → „Genetik Coach" (neuer i18n-Key `brand_coach`). Offen: #2 Downloads (Hosting), #6 Zert-Umfang (pharma braucht Test), #7 FAQ-Thumbnails. |
| 2026-06-03 | **SOP „Schulungen anlegen"** ergänzt (Abschnitt 18): Video → YouTube-Transkript → MC-Fragen aus Transkript, aktiv nach Zusatzmaterial fragen, Modulstruktur (Wissenschaft → Beratung → FAQ), Material-Fallback Englisch, Test-Fragen an übersetztes Video anpassen (keine 1:1-Übersetzung) |
| 2026-06-03 | **Verbindliche Grundregeln** ergänzt (siehe ganz oben): Live-System-Schutz — keine Datenschutz/Security-Risiken, Funktion bestehender Nutzer nie zerstören, nichts Unfertiges live (außer Videos), CLAUDE.md-Pflicht. Gilt für neue Mitarbeiter. |
| 2026-06-03 | 34 englische Analyseberatungs-Videos (4K) via yt-dlp heruntergeladen → `LONG FORM ENG` + Kopie nach `EXTERNAL MATERIAL\…\LONG FORM VIDEOS ENG` (Heygen-Quellen) |
| 2026-06-03 | **Zurück/Vorwärts-Navigation** via History API (Browser-/Handy-Zurück funktioniert im SPA-Router) |
| 2026-06-03 | **Fix: weiße Seite am Handy** — `.app.no-sidebar { flex-direction: column }`. `.app` war flex-`row`, der `<footer>` als Flex-Geschwister verdrängte `<main>` auf 0px Breite. (Ausgelöst durch das `overflow-x:hidden` aus dem Responsive-Pass.) |
| 2026-06-03 | **Responsive Mobile-Pass** (styles.css): Swipe-Kacheln, ausgeblendete Scroll-Buttons, getrimmte Paddings/Typo, 4K-Zertifikat skaliert, 16px-Inputs gegen iOS-Zoom |
| 2026-06-02 | EN-Videos: Supplements (`TIHnA7J6EP4`) + Pharmacogenetics (`SgzAZyUIx-0`) ergänzt; Biological Age falsches Video (`udTodouyDsA`) entfernt → Platzhalter |
| 2026-06-02 | **Custom Domain** `academy.novopilot.com` + „Enforce HTTPS"; **Repo-Migration** `Novogenia` → Org `Novogenia-AG`; `VITE_BASE_PATH=/` (Base von `/novo-academy/` auf `/`) |
| 2026-06-02 | **TDZ-Bugfix** (weiße Seite): ein `useEffect` referenzierte `lang` vor dessen `const`-Deklaration → „Cannot access 'lang' before initialization". `useEffect` hinter die Deklaration verschoben |
| 2026-06-01 | `prettyNameFromEmail()` + `bestDisplayName()` — Namen aus E-Mail werden kapitalisiert für Zertifikat-Vorschlag |
| 2026-06-01 | Admin: Soft-Delete / Undelete, Rename, Admin-Promote, Progress-Reset (User-Actions-Menü) |
| 2026-06-01 | Multi-Page Zertifikat: >16 Kurse splitten auf mehrere PDF-Seiten |
| 2026-06-01 | Admin-Panel: Dashboard (Statistiken + Sparkline) + Nutzerliste + Kurs-Toggles |
| 2026-06-01 | Fix: Neue Signups starten ohne vorzertifizierte Kurse (`buildInitialState()` gibt immer false) |
| 2026-06-01 | Supabase-Integration: Auth, Fortschritt, Profile, RLS, is_admin() |
| 2026-06-01 | GitHub Pages Deployment + Google OAuth |
| 2026-06-01 | EN-Übersetzung: alle UI-Strings, LangContext, t()-Dictionary |
| 2026-06-01 | Asset-Pfad-Fix: assetUrl() + prefixAssetPaths() für /novo-academy/ Subpath |
| 2026-06-01 | Englische Kursinhalte (data.en.js) mit korrekten Video-IDs |

---

## 16. Hinweis für die nächste Claude-Instanz

Bitte halte **diese Datei aktuell** nach jeder bedeutenden Änderung:
- Neue Features → Abschnitt 15 (Changelog) + ggf. Abschnitt 7/8/9
- Neue Kurse oder Videos → Abschnitt 8
- Schema-Änderungen → Abschnitt 6
- Neue TODOs → Abschnitt 11
- Deployment-Änderungen → Abschnitt 10

Ziel: Wer diese Datei liest + Zugriff auf den Ordner hat, kann sofort auf jedem Computer weiterarbeiten — ohne diese Konversation zu kennen.

---

## 17. Onboarding für neue Mitarbeiter / weitere Computer

> **Wichtigste Regel:** Der **Code** kommt aus **GitHub**, NICHT aus dem geteilten OneDrive-Ordner.
> OneDrive + `.git` + `node_modules` führt zu Sync-Konflikten und kaputten Builds. Der OneDrive-Ordner
> ist nur für die großen **Medien-Assets** (Videos, Master-Dateien) sinnvoll, die nicht im Repo liegen.

### Voraussetzungen (auf dem neuen Rechner installieren)
- **Git** — https://git-scm.com
- **Node.js LTS** (v20+; getestet mit v24) + npm — https://nodejs.org
- **Claude Code** (CLI) — damit diese `CLAUDE.md` automatisch gelesen wird
- Ein **GitHub-Account**

### Was der Repo-Owner (Daniel) einmalig tun muss
1. **GitHub-Zugriff geben:** github.com/Novogenia-AG/novo-academy → *Settings → Collaborators* (bzw. Org *People → Teams*) → den Kollegen mit **Write**-Rolle einladen. (Repo ist public, also *lesen/klonen* geht ohne Einladung — zum **Pushen** braucht er Write.)
2. **`.env.local` sicher übermitteln** (NICHT über Git/öffentlich): die zwei Zeilen aus Abschnitt 5. Der Anon-Key ist public-by-design, aber sauber ist es, ihn direkt zu schicken (z.B. 1Password/Teams-DM).
3. *(Optional)* Den OneDrive-Medienordner (`SOME DANIEL` / `EXTERNAL MATERIAL`) für die Videos teilen — nur falls der Kollege an den Long-Form-Videos arbeitet.
4. *(Optional, nur bei DB-Arbeit)* Supabase-Projekt-Zugriff einladen (supabase.com/dashboard → Project → *Team*). Für reine Frontend-Arbeit nicht nötig.

### Was der Kollege zum Vorbereiten tut
```bash
# 1. Repo an einen LOKALEN Ort klonen (NICHT in einen OneDrive-Ordner!)
git clone https://github.com/Novogenia-AG/novo-academy.git
cd novo-academy

# 2. .env.local anlegen (Inhalt von Daniel, siehe Abschnitt 5)
#    Windows PowerShell: New-Item .env.local ; dann Inhalt einfügen

# 3. Abhängigkeiten installieren
npm install

# 4. Dev-Server starten
npm run dev        # → http://localhost:5181/

# 5. Änderung committen + deployen (löst automatisch den Live-Deploy aus)
git add .
git commit -m "feat: beschreibung"
git push origin main
```
Ohne `.env.local` läuft die App im **Mock-Modus** (localStorage statt Supabase) — gut zum UI-Entwickeln, aber ohne echte Logins/Daten.

### Wichtige Regeln für die Zusammenarbeit
- **Diese `CLAUDE.md` nach jeder bedeutenden Änderung aktualisieren** (Changelog Abschnitt 15).
- **`.env.local` niemals committen** (steht in `.gitignore`).
- **`service_role`-Key niemals ins Frontend / Repo.**
- Auf `main` pushen = sofortiger Live-Deploy. Für größere Experimente einen **Branch** nutzen und per Pull Request mergen.
- Vor dem Pushen lokal `npm run build` laufen lassen (fängt Build-Fehler ab, bevor der Deploy rot wird).

---

## 18. Schulungen anlegen — Standard-Ablauf (SOP)

**Wenn ein neues Schulungsvideo + Thema geliefert wird, läuft IMMER genau dieser Ablauf ab.**
Ziel: konsistente, korrekt strukturierte Kurse — auf jedem Computer, in jeder Sprache, ohne Rückfragen zur Struktur.

### A. Pro Video (geliefert wird: Video-Link + Thema + Sprache)
1. **Video einbetten wie gewohnt** — `youtubeId` (Einzelvideo) bzw. `videoSegments[]` (Mehrteiler) in das passende Kurs-Objekt der Sprachdatei (`data.js` = DE, `data.en.js` = EN, weitere Sprachen analog).
2. **Transkript von YouTube holen** — das Transkript/die Untertitel des gelieferten Videos sind die **inhaltliche Quelle der Wahrheit** (z. B. `yt-dlp --write-auto-subs --write-subs --sub-langs <lang> --skip-download <url>`). Kein Transkript verfügbar → nachfragen.
3. **Multiple-Choice-Test aus dem Transkript erstellen** — im Stil der bestehenden Tests: **5–7 Fragen**, je 4 Optionen, genau eine korrekt (`questions[]` mit `q` / `options` / `correct`). Die Fragen müssen den **tatsächlichen Video-Inhalt** prüfen, nicht Allgemeinwissen.
4. **Aktiv nach Zusatzmaterial fragen** — den Lieferanten um Dokumente bitten (Folien-PPTX, Demo-Berichte, Science-PDFs) für `documents[]`. (Große Dateien >100 MB → nicht ins Repo, separates Hosting, siehe Asset-Regeln.)

### B. Kursstruktur pro Thema (die „Form" der Schulung)
Jedes Thema bekommt — soweit Material vorhanden — diese Module, immer in dieser Reihenfolge:

| Modul | `contentType` | Wann |
|---|---|---|
| **Wissenschaftliche Basis** | `course` (Einzelvideo + Test) | **immer** |
| **Beratungsschulung** | `course` (`videoSegments[]` + ggf. Test) | **wenn verfügbar** |
| **Häufige Fragen (FAQ)** | `faq` (Accordion) | **wenn verfügbar** |

### C. Mehrsprachigkeit (wichtig für künftige Sprach-Videos)
- Jede Sprache hat **eigene Kurs-Objekte** mit eigenen `uid`s und `lang`-Feld.
- **Material-Fallback:** Solange es für eine Sprache **keine eigenen Materialien** (Dokumente/Demo-Berichte) gibt → die **englischen Materialien** verwenden (Englisch ist der Fallback, nicht Deutsch). Sobald sprach-eigene Materialien geliefert werden → ersetzen.
- **Test-Fragen bei übersetzten / lip-synced Videos:** Die Fragen werden aus dem Transkript der **jeweiligen Sprachversion** generiert und an deren **tatsächlichen Inhalt angepasst** — **KEINE 1:1-Übersetzung** der Original-Fragen. (Übersetzte Videos weichen inhaltlich oft leicht ab; die Fragen müssen zum tatsächlich gesprochenen Video passen.)
- Fehlt ein Video in einer Sprache → `youtubeId` weglassen → zeigt automatisch „VIDEO COMING SOON".

### D. Abschluss jeder neuen Schulung
- `uid` neu & eindeutig (nie wiederverwenden); `initialWatched: false`, `initialTestPassed: false`.
- Assets über die bestehenden Pfad-Helfer referenzieren.
- **`CLAUDE.md` aktualisieren** (Abschnitt 8 Video-Stand + Changelog Abschnitt 15).
- Lokal `npm run build` testen → dann committen/pushen (Unfertiges nur per Branch + PR — siehe Grundregeln).

---

## 19. AKTUELLER ARBEITSSTAND (Handover, Stand 2026-08-04)

> **Arbeitsrechner ist jetzt Daniels neuer Rechner** (Repo: `C:\dev\novo-academy`,
> Node v24.19.0 ZIP-Install in `C:\dev\tools\node`, im User-PATH). Wenn du auf einem
> weiteren NEUEN Rechner startest: zuerst Abschnitt 17 (Onboarding), dann diesen Abschnitt.
> Alles hier ist Ist-Zustand, keine Planung.

### 19.1 Sprach-Rollout RO/ES/SR/AR — GEPUSHT & LIVE (2026-08-04)

Die 4 Commits (`e37ca9f` Übersetzungen + Arabisch-RTL, `70c5236` Perf −69 % Initial-Load,
`b239a6e` Merge, `3b4965a` Doku) sind auf GitHub und deployt. Der frühere **403-Push-Blocker**
(Konto `evolutionnext696-prog` ohne Write-Recht) wurde umgangen: Commits per `git bundle`
über OneDrive (`NOVO ACADEMY\VIDEO_PIPELINE\unpushed.bundle`) vom alten Laptop transferiert
und vom neuen Rechner mit berechtigtem Konto gepusht. Vor dem Push auf dem neuen Rechner
erneut verifiziert: `npm ci` + `npm run build` grün, Browser-Test 11 Sprachen im Picker,
Arabisch `dir=rtl` / Rumänisch `dir=ltr`, alle 11 `data.*.js` importieren fehlerfrei.

### 19.2 Sprachen — echter Stand

**Bestandsaufnahme 16.09.2026** (per Skript über `groupForDisplay` gezählt, nicht geschätzt):

| Sprache | Text/UI | Videos im Code | Sichtbare Kurse |
|---|---|---|---|
| DE | ✅ | Originalaufnahmen, 45 Plätze | **22 von 22** |
| EN | ✅ | Originale, 45 Plätze / 41 Videos | **18 von 22** |
| CZ, FR, PT, IT, NL, **AR** | ✅ | ✅ 41/41 Lip-Sync | **18 von 22** |
| **RO** | ✅ | **0/41** — 40 Dubs auf HeyGen fertig, nicht hochgeladen; 1 Auftrag (Sportliche Leistung) offen | **8 von 22** |
| **ES** (neutral) | ✅ | **0/41** — 7 Dubs (Wissenschafts-Basis) auf HeyGen fertig, 34 Beratungsteile nie beauftragt | **8 von 22** |
| **SR** (Latein) | ✅ | **0/41** — nie beauftragt | **8 von 22** |

- **4 Kurse fehlen außer in DE überall** (auch EN): Burnout und Biologisches Alter, je Wissenschafts-Basis + Beratungsschulung. `data.en.js` hat dafür keine Video-ID, und die Übersetzungsdateien ersetzen nur vorhandene EN-IDs → zuerst eine englische Fassung (Kandidat: `SOME DANIEL…NOVO ACADEMY CONTENT VIDEOS ENGBIO AGE en Ai.mp4`, 5,1 GB).
- **Startseiten-Videos** (Intro, Firmentour, Bonus) gibt es nur für DE und EN.
- **Dokumente:** Übersetzungssprachen bekommen die englischen PDFs; Demo-Berichte, PowerPoints und Werberichtlinie gibt es nur deutsch.
- **Credits für den Rest** (120/Minute): SR 35.098, ES-Beratungsteile 15.546, RO Sportliche Leistung 5.194 (falls der offene Auftrag nicht fertig wurde) — bis zu **55.838**, dazu Burnout/Bioalter × 10 Sprachen und die Startseiten-Videos.
- **Falle:** Teilweise befüllte Beratungsschulungen wirken vollständig, weil fehlende Segmente still weggefiltert werden (`data.es.js`); der Test fragt trotzdem den ganzen Kurs ab. Beratungsschulungen nur komplett eintragen.

<details><summary>Alte Tabelle (Stand 05.08.2026)</summary>

| Sprache | Text/UI | Videos | Sichtbare Kurse |
|---|---|---|---|
| DE, EN, CZ, IT, FR, PT, NL | ✅ live | ✅ vollständig | 17–21 von 22 |
| **AR** (RTL) | ✅ fertig | ✅ 41/41 öffentlich + in `data.ar.js` eingebettet (2026-08-05) | **17 von 22** |
| **RO** | ✅ fertig | 40/41 gedubbt, nicht hochgeladen | **7 von 22** |
| **ES** (neutral) | ✅ fertig | 7/41 gedubbt (alle Wissenschafts-Basis) | **7 von 22** |
| **SR** (Latein) | ✅ fertig | 0 gedubbt (Credits fehlen) | **7 von 22** |

</details>

**Warum nur 8 von 22** (früher 7; die Werberichtlinie kam am 06.08. dazu): `groupForDisplay()` in `data.js` blendet jeden Kurs ohne Video aus
(FAQ/Zusatz-Kurse bleiben sichtbar). Die `VIDEOS`-Maps in `data.{ar,ro,es,sr}.js` sind noch
**leer** — sie füllen sich **nicht** automatisch, die YouTube-IDs müssen eingetragen werden.

Textqualität von RO/ES/SR wurde geprüft (je 694 Felder gegen EN): 0 untranslated Reste,
0 verlorene Gen-/Markennamen, keine verschobenen `correct`-Indizes.

### 19.3 Video-Pipeline — wo alles liegt

**Fertige Dubs (88 Videos, 22,4 GB) — nur lokal auf Daniels Laptop, NICHT im Repo:**
```
C:\dev\YOUTUBE_UPLOAD\01_ARABISCH    41 Videos, 9,6 GB
C:\dev\YOUTUBE_UPLOAD\02_RUMAENISCH  40 Videos, 8,3 GB
C:\dev\YOUTUBE_UPLOAD\03_SPANISCH     7 Videos, 4,5 GB
```
Jeder Ordner enthält `_MAPPING.csv` (Titel → EN-Quellvideo → HeyGen-Job-ID) und
`_ANLEITUNG.txt`. **Die Dateinamen sind exakt die YouTube-Titel** — darüber läuft später
die Zuordnung. Auf einem anderen Rechner sind diese Dateien nicht vorhanden; die Dubs
liegen aber weiterhin auf HeyGen und lassen sich per Job-ID neu herunterladen.

**Pipeline-Skripte:** `C:\dev\lang_pipeline\` (bewusst außerhalb des Repos)
| Skript | Zweck |
|---|---|
| `submit_lang.mjs <code> "<HeyGen-Sprache>"` | alle 41 Dubs starten (mit Credit-Cost-Guard) |
| `submit_selected.mjs <code> "<Sprache>"` | nur die Einheiten aus `partial_plan.json` (Teil-Budget) |
| `plan_partial.mjs <budget>` | rechnet aus, welche **ganzen** Kurseinheiten ins Budget passen |
| `poll_lang.mjs <code>` | pollt bis fertig, schreibt Status + URL in `<code>_jobs.json` |
| `download_lang.mjs <code> <dir>` | lädt fertige Dubs (frische URL je Datei, curl, resumable) |
| `add_folder_docs.mjs <code> <dir> <Label>` | erzeugt `_MAPPING.csv` + `_ANLEITUNG.txt` |
| `match_and_inject.mjs <code> <repo>` | **der letzte Schritt** (siehe 19.4) |

**HeyGen-Wissen (gemessen, nicht geschätzt):**
- Video-Translate akzeptiert **YouTube-URLs direkt** — kein Download der Quellvideos nötig.
- **120 API-Credits pro Videominute** (Lip-Sync). Eine komplette Sprache = 292 Min ≈ **35.000 Credits**.
- Der API-Key zieht aus dem **`api`-Topf**, nicht aus `regular` — beim Nachkaufen darauf achten.
- Die öffentliche Preisseite nennt „5 Credits/Minute" — das sind **Web-Plan-Credits**, andere Einheit (Faktor 24).
- Endpoint `v2/video_translate` ist Legacy, funktioniert aber zuverlässig; `v3/video-translations` wird zuerst versucht.
- Output-URLs sind **signiert und laufen ab** → vor jedem Download frisch über die Job-ID holen.
- Restguthaben zuletzt: **~8.000 Credits**. Für ES-Beratungsschulungen (34 Videos) + SR fehlen **~50.500**.
- **Der API-Key steht NICHT in diesem Repo** (öffentlich!) — bei Daniel erfragen.

### 19.4 Der nächste konkrete Schritt

**AR ist seit 05.08.2026 erledigt** (41/41 öffentlich und eingetragen). Die Schritte unten gelten unverändert für **RO (40 Dubs) und ES (7 Dubs)**. Beide liegen fertig auf HeyGen, auf diesem Rechner aber nicht als Datei → zuerst per Job-ID mit `download_lang.mjs` neu holen (API-Key bei Daniel).

~~Blocker: die 30 bereits hochgeladenen arabischen Videos sind auf YouTube „Entwurf".~~
Entwürfe sind nicht einbettbar → die Academy kann sie nicht abspielen.

1. Daniel: restliche 11 AR-Videos hochladen + **alle auf „Öffentlich"** setzen
   (Studio → Inhalte → Filter → Sichtbarkeit → Entwurf → alle markieren →
   Bearbeiten → Sichtbarkeit → Öffentlich; Zielgruppe „kein Inhalt für Kinder").
2. Kanal-Videos als `yt_uploaded.json` sammeln (Array aus `{id,title}`).
3. `node match_and_inject.mjs ar C:/dev/novo-academy` →
   matcht über die Titel (YouTube entfernt Klammern, wird normalisiert),
   **prüft jedes Video per oEmbed auf Einbettbarkeit** und schreibt die IDs in `data.ar.js`.
   Bricht bewusst ab, wenn ein Video nicht einbettbar ist.
4. `npm run build` → Browser-Test → committen → pushen.
5. Dasselbe für RO, dann ES.

**Warum die oEmbed-Prüfung Pflicht ist:** Genau daran ist hier schon einmal eine ganze
Sprache gescheitert (114 Videos hatten Embedding deaktiviert, siehe Changelog 2026-06-23).

### 19.5 Fallen, die in dieser Session Zeit gekostet haben

- **`npm ci` bricht hart ab**, wenn `package.json` und `package-lock.json` auseinanderlaufen
  → nach jedem Dependency-Eingriff Lockfile regenerieren und lokal `npm ci` testen.
- **Der Build fängt keine Laufzeitfehler.** Ein Generator hatte den `const CAT`-Block
  zerstört; `npm run build` war grün, die App zeigte aber eine weiße Seite. Immer zusätzlich
  im Browser `import('/src/data.js')` prüfen.
- **YouTube-Titel:** Klammern werden beim Upload entfernt (`(AR)` → ` AR`) — beim Matchen normalisieren.
- **Node-Pfade sind rechnerabhängig:** alter Laptop `C:\Users\DanielWallerstorfer\AppData\Local\Programs\node`, neuer Rechner `C:\dev\tools\node` (User-PATH gesetzt; frische Shells ggf. mit `$env:Path`-Prefix).
- **Der OneDrive-Ordner `academy-redesign` ist VERALTET** (kein Git, ohne NL/IT). Code kommt aus `C:\dev\novo-academy`.
