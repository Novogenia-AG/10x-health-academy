/* =====================================================================
   Marken-Konfiguration dieser Instanz: 10X HEALTH ACADEMY
   ---------------------------------------------------------------------
   Dieses Repo ist ein Klon der NOVO ACADEMY (Novogenia-AG/novo-academy,
   Remote `upstream`, Push dorthin gesperrt). Damit Fehlerbehebungen aus
   dem Original weiter per `git merge upstream/main` übernommen werden
   können, steckt ALLES Markenspezifische an möglichst wenigen Stellen:

     src/brand.js         ← diese Datei: Namen, Logo, Sprachsperre, Texte, Kursauswahl
     src/theme-10x.css    ← Farben, Schriften, Formen (lädt nach nd-redesign.css)
     public/brand/        ← Logos und Favicons von 10X Health
     index.html           ← Titel, Favicon, Schriften
     src/generateCert.js  ← Kopfzeile und Farben des Zertifikat-PDFs

   Alles andere (Kurse, Videos, Tests, Supabase-Logik) bleibt identisch
   zum Original und sollte hier NICHT verändert werden.
   ===================================================================== */

export const BRAND = {
  key: '10x',

  /* Name der Plattform, wo sie im Fließtext genannt wird. */
  productName: '10X Health Academy',

  /* Die Instanz ist ausschließlich englisch: keine Sprachwahl-Seite, keine
     Sprachumschalter, gespeicherte Fremdsprachen werden ignoriert. */
  lockedLang: 'en',

  logo: {
    src: '/brand/10x-health-system-logo.png',          // schwarz/rot, für helle Flächen
    srcOnDark: '/brand/10x-health-logo-white.png',     // weiß, für dunkle Flächen
    alt: '10X Health',
    width: 1973,
    height: 371,
  },

  /* Eigenes Supabase-Projekt „10X HEALTH ACADEMY" (knfkosxlthdiysgzdjsj) seit 16.09.2026 —
     getrennte Nutzer und Admins von der NOVO ACADEMY. Google-Login ist dort
     erst aktiv, wenn Client-ID/Secret unter Authentication → Sign In / Providers
     → Google eingetragen sind; bis dahin bleibt der Button ausgeblendet. */
  googleLogin: false,

  /* Zusatz hinter dem Logo („10X HEALTH | ACADEMY"). */
  academyLabel: 'Academy',

  /* Novogenia wird in dieser Instanz als Labor von 10X Health ausgewiesen
     (Vorgabe Daniel, 16.09.2026): hinter „Novogenia" — bzw. „Novogenia GmbH" —
     steht jeweils dieser Zusatz. Pro Textbaustein einmal, damit ein Absatz
     mit mehreren Nennungen nicht dreimal dieselbe Klammer trägt. Dateinamen,
     Pfade und URLs bleiben unangetastet. */
  labSuffix: ' (the 10X Health Laboratory)',

  /* Die Plattform und alle Inhalte stammen von Novogenia; das wird offen
     ausgewiesen statt verschwiegen. */
  poweredBy: 'Powered by Novogenia (the 10X Health Laboratory)',

  /* Kurse, die es in dieser Instanz nicht gibt (Vorgabe Daniel, 16.09.2026):
     Pharmakogenetik und die Werberichtlinie. Angegeben ist die deutsche
     Basis-ID; die Sprachfassungen (…-en, …-cz usw.) fallen automatisch mit. */
  hiddenCourses: ['pharma-sci', 'legal-basics'],

  /* Zertifikat: Bezeichnung des Abschlusses im Fließtext. */
  certTitle: '10X Health Genetics Coach',

  /* Zertifikat-PDF: eigene Vorlage (10X-Logo, roter Keil, schwarzer Streifen),
     erzeugt aus public/cert-template.pdf — Unterschrift und Satzspiegel sind
     identisch. Kopfzeile und Namensfarbe zeichnet generateCert.js. */
  cert: {
    templatePath: '/brand/cert-template-10x.pdf',
    headline: '10X HEALTH',
    headlineRgb: [0xD1, 0x24, 0x2A],
    nameRgb: [0x23, 0x1F, 0x20],
    filenamePrefix: '10XHealthAcademy_Certificate',
  },

  /* Textersetzungen für t(key). */
  text: {
    en: {
      landing_hero_sub: 'The 10X Health genetics training platform. Learn at your own pace, complete modules with tests, and earn your official 10X Health Genetics Coach certificate.',
      a11y_intro: 'Novogenia GmbH, which operates this platform for 10X Health, strives to make the 10X Health Academy accessible in accordance with the Austrian Accessibility Act (BaFG) and Directive (EU) 2019/882.',
      /* Unterschrift im Zertifikat (PDF): Dr. Daniel Wallerstorfer als CSO von 10X Health */
      cert_ceo_role: 'CSO of 10X Health',
      /* landing_feature_videos_t („N online courses") setzt data.js beim Laden
         aus der tatsächlich sichtbaren Kurszahl — siehe setzeKurszahl(). */
    },
  },

  /* Ersetzungen für englische Inline-Texte (LX-Aufrufe), Schlüssel = der
     englische Originaltext. */
  inline: {
    'Official training platform': '10X Health training platform',
    'CEO of Novogenia': 'CSO of 10X Health',
  },
}

/* „Novogenia" (auch „Novogenia GmbH"/„Novogenia AG") → mit Labor-Zusatz.
   Nur die erste Nennung je Text; nicht in Wortzusammensetzungen wie
   „Novogenia_FAQ" und nicht, wenn der Zusatz schon dasteht. */
const LABOR_RE = /\bNovogenia(?: Marketing GmbH| GmbH| AG)?(?![\w-])/
export const withLab = (s) => {
  if (typeof s !== 'string' || !BRAND.labSuffix) return s
  if (/^(\/|https?:)/.test(s) || s.includes(BRAND.labSuffix.trim())) return s
  return s.replace(LABOR_RE, m => m + BRAND.labSuffix)
}

/* Nachbearbeitung jedes übersetzten Textes (t, LX, LXP) in der Instanzsprache. */
export const brandPost = (lang, s) => (lang === BRAND.lockedLang ? withLab(s) : s)

/* Liefert den markenspezifischen Ersatz für einen englischen Inline-Text,
   sonst den Text selbst. Ersetzt zusätzlich die Plattformbezeichnung
   „NOVO ACADEMY" und ergänzt den Labor-Zusatz. */
export const brandInline = (en) => {
  if (typeof en !== 'string') return en
  const direkt = BRAND.inline[en]
  if (typeof direkt === 'string') return direkt
  const s = en.includes('NOVO ACADEMY') ? en.split('NOVO ACADEMY').join(BRAND.productName) : en
  return withLab(s)
}

export const brandText = (lang, key) => BRAND.text[lang]?.[key]

/* Gehört ein Kurs zu den in dieser Instanz ausgeblendeten? IDs sind
   „<basis>" (deutsch) oder „<basis>-<sprache>". */
export const isHiddenCourse = (course) => {
  const id = course?.id || ''
  return BRAND.hiddenCourses.some(b => id === b || id.startsWith(b + '-'))
}

/* Einmaliger Durchlauf über die Kursdaten beim Laden (data.js): Plattformname
   in Titeln und Beschreibungen ersetzen, Labor-Zusatz ergänzen. URLs und
   Pfade bleiben unangetastet. „NovoAcademy Science PDF – …" wird zu
   „Science PDF – …" — die Dokumente selbst sind weiterhin Novogenia-Unterlagen. */
const ersetzeMarke = (s) => withLab(s
  .replace(/^NovoAcademy\s+(?=(Science|FAQ|Slides|Demo|Folien|Consultation|Training)\b)/, '')
  .split('NOVO ACADEMY').join(BRAND.productName)
  .split('NovoAcademy').join(BRAND.productName))

export const rebrandStrings = (obj) => {
  if (obj == null || typeof obj !== 'object') return
  for (const key of Object.keys(obj)) {
    const v = obj[key]
    if (typeof v === 'string') {
      if (/^(\/|https?:)/.test(v)) continue
      if (/NOVO ACADEMY|NovoAcademy|Novogenia/.test(v)) obj[key] = ersetzeMarke(v)
    } else if (typeof v === 'object') {
      rebrandStrings(v)
    }
  }
}
