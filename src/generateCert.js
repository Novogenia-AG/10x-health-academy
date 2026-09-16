/**
 * Certificate PDF generator — overlays dynamic text on the empty design template.
 * Uses real Montserrat TTFs (Light / Regular / Medium / SemiBold / Bold)
 * embedded via @pdf-lib/fontkit, so the downloaded PDF matches the on-screen preview.
 *
 * Coordinate system: PDF default (origin bottom-left, Y goes up).
 * A4 portrait page in points: 595.28 × 841.89
 */
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { t as tBase } from './data.js'
import { BRAND } from './brand.js'

const A4_W = 595.28
const A4_H = 841.89

const COLOR_WINE = rgb(0x5e / 255, 0x00 / 255, 0x47 / 255)
/* Markenfarben der Instanz (brand.js); ohne Angabe gilt das Original. */
const ausRgb = (a) => rgb(a[0] / 255, a[1] / 255, a[2] / 255)
const COLOR_HEADLINE = BRAND.cert?.headlineRgb ? ausRgb(BRAND.cert.headlineRgb) : COLOR_WINE
const COLOR_NAME = BRAND.cert?.nameRgb ? ausRgb(BRAND.cert.nameRgb) : COLOR_WINE
const COLOR_BLACK = rgb(0.10, 0.10, 0.10)

/* Load all five Montserrat weights once; cache the bytes for re-use.
   BASE_URL handles the GitHub Pages subpath (e.g. /novo-academy/) */
/* Optionaler Zugriff: import.meta.env gibt es nur im Vite-Build. So lässt sich
   das Modul auch in reinem Node laden — davon lebt die Prüfung, die das
   Zertifikat außerhalb des Browsers in allen Sprachen erzeugt. */
const _BASE = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '')
const FONT_URLS = {
  light:    `${_BASE}/fonts/Montserrat-Light.ttf`,
  regular:  `${_BASE}/fonts/Montserrat-Regular.ttf`,
  medium:   `${_BASE}/fonts/Montserrat-Medium.ttf`,
  semibold: `${_BASE}/fonts/Montserrat-SemiBold.ttf`,
  bold:     `${_BASE}/fonts/Montserrat-Bold.ttf`,
  /* Montserrat enthält KEINE arabischen Zeichen — ein arabischer Name wurde
     dadurch als Reihe leerer Kästchen (.notdef) gedruckt, ohne Fehlermeldung,
     während die HTML-Vorschau dank System-Schrift korrekt aussah.
     Noto Naskh Arabic deckt Arabisch inkl. Verbindungsformen UND Latein ab. */
  arabic:     `${_BASE}/fonts/NotoNaskhArabic-Regular.ttf`,
  arabicBold: `${_BASE}/fonts/NotoNaskhArabic-SemiBold.ttf`,
}
const CERT_TEMPLATE_URL = `${_BASE}${BRAND.cert?.templatePath || '/cert-template.pdf'}`
const fontBytesCache = {}
async function loadFontBytes(weight) {
  if (fontBytesCache[weight]) return fontBytesCache[weight]
  const res = await fetch(FONT_URLS[weight])
  if (!res.ok) throw new Error(`failed to fetch ${FONT_URLS[weight]}`)
  fontBytesCache[weight] = await res.arrayBuffer()
  return fontBytesCache[weight]
}

async function loadFonts(pdfDoc, lang) {
  try {
    pdfDoc.registerFontkit(fontkit)
    // Arabisch braucht durchgehend eine Schrift mit arabischen Glyphen —
    // Noto Naskh deckt auch Latein ab, also ist ein Mischen nicht nötig.
    if (lang === 'ar') {
      const [reg, semi] = await Promise.all(
        ['arabic', 'arabicBold'].map(w =>
          loadFontBytes(w).then(b => pdfDoc.embedFont(b, { subset: true }))
        )
      )
      return { light: reg, regular: reg, medium: reg, semibold: semi, bold: semi }
    }
    const [light, regular, medium, semibold, bold] = await Promise.all(
      ['light', 'regular', 'medium', 'semibold', 'bold'].map(w =>
        loadFontBytes(w).then(b => pdfDoc.embedFont(b, { subset: true }))
      )
    )
    return { light, regular, medium, semibold, bold }
  } catch (e) {
    console.warn('Montserrat embed failed — falling back to Helvetica:', e.message)
    const r = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const b = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    return { light: r, regular: r, medium: r, semibold: b, bold: b }
  }
}

/**
 * Coordinates below were measured directly from the on-screen preview
 * (which renders the same cert-template.pdf via pdf.js) so the downloaded
 * PDF matches the on-screen layout 1:1.
 *
 * Conversion factor: 1 pt = 1.333 px (96 DPI), so 1 px = 0.75 pt.
 * Y values are baselines in PDF coordinates (origin bottom-left).
 *
 * Pagination: if the module list overflows one page, the cert spills into
 * a second (or third…) page that re-uses the template design — same header
 * + signature block, different module slice. With ~17 pt line height and
 * the available vertical strip we fit comfortably 16 modules per page.
 */
const MAX_MODULES_PER_PAGE = 16

/** Draw a single certificate page (header + module slice + footer). */
function drawCertPage(page, { name, dateStr, lang, courses, fonts, pageIndex, totalPages }) {
  /* Bis 18.08.2026 kannte das PDF nur zwei Zustände: Deutsch, oder Englisch für
     alle zehn anderen Sprachen. Begründet war das unter anderem damit, die
     eingebetteten Schriften könnten tschechische Diakritika vermissen lassen —
     das ist nachgemessen falsch: Montserrat deckt mit 2.747 Glyphen sämtliche
     lateinischen Sonderzeichen der elf Sprachen ab (Arabisch übernimmt Noto
     Naskh, siehe loadFonts). Die Texte kommen jetzt aus derselben Tabelle wie
     die Bildschirm-Vorschau — die beiden liefen vorher auseinander. */
  const t = (key) => tBase(lang, key)

  /* Satzspiegel: linker Rand 52.5, symmetrisch zum rechten Blattrand. */
  const RAND_L = 52.5
  const RAND_R = A4_W - RAND_L
  const SATZBREITE = RAND_R - RAND_L

  const draw = (text, { x, y, size, font, color = COLOR_BLACK, maxWidth, lineHeight }) => {
    page.drawText(text, { x, y, size, font, color, maxWidth, lineHeight })
  }

  /* Zeichnet Text und verkleinert ihn, falls er über den Satzspiegel liefe.
     Vorher gab es keinerlei Begrenzung: ein langer Doppelname ragte über den
     rechten Blattrand hinaus, ein langer Modultitel bis an die Blattkante. */
  const drawPassend = (text, { x, y, size, font, color = COLOR_BLACK, minSize = 8 }) => {
    let s = size
    const platz = RAND_R - x
    while (s > minSize && font.widthOfTextAtSize(text, s) > platz) s -= 0.25
    draw(text, { x, y, size: s, font, color })
    return s
  }

  // 1) Kopfzeile — Markenname (brand.js), Medium, 26pt
  draw(BRAND.cert?.headline || 'NOVOGENIA', { x: 52.5, y: 665, size: 26, font: fonts.medium, color: COLOR_HEADLINE })

  // 2) Haupttitel — black, Bold, 48pt; schrumpft, wenn die Übersetzung länger ist
  //    (z. B. ro "COACH DE GENETICĂ")
  drawPassend(t('cert_mini_genetik_coach'), {
    x: RAND_L, y: 617.5, size: 48, font: fonts.bold, color: COLOR_BLACK, minSize: 26,
  })

  // 3) Bestätigungszeile — black, SemiBold, 9.7pt
  draw(t('certpage_presented_to'), {
    x: RAND_L, y: 578, size: 9.7, font: fonts.semibold, color: COLOR_BLACK,
  })

  // 4) Empfängername — wine, Medium, 24pt, schrumpfend statt überlaufend
  drawPassend(name || t('cert_cta_name_placeholder'), {
    x: RAND_L, y: 549, size: 24, font: fonts.medium, color: COLOR_NAME, minSize: 13,
  })

  // 5) Date sentence — drawn as parts so date is bold and rest is regular
  const datePrefix = t('certpage_completed_on') + ' '
  /* Der Seitenzähler gehört VOR den Doppelpunkt. Alle elf Übersetzungen des
     Suffix enden auf ':', also einmal abtrennen, Zähler einsetzen, wieder anfügen. */
  let dateSuffix = t('certpage_completed_suffix')
  if (totalPages > 1) {
    const zaehler = t('cert_page_counter')
      .replace('{n}', String(pageIndex + 1))
      .replace('{total}', String(totalPages))
    dateSuffix = dateSuffix.endsWith(':')
      ? dateSuffix.slice(0, -1) + zaehler + ':'
      : dateSuffix + zaehler
  }
  let dx = RAND_L
  const dy = 516
  const dsize = 9.7
  draw(datePrefix, { x: dx, y: dy, size: dsize, font: fonts.regular, color: COLOR_BLACK })
  dx += fonts.regular.widthOfTextAtSize(datePrefix, dsize)
  draw(dateStr, { x: dx, y: dy, size: dsize, font: fonts.bold, color: COLOR_BLACK })
  dx += fonts.bold.widthOfTextAtSize(dateStr, dsize)
  draw(dateSuffix, {
    x: dx, y: dy, size: dsize,
    font: fonts.regular, color: COLOR_BLACK,
    maxWidth: 540 - (dx - 52.5),
    lineHeight: 13,
  })

  // 6) Module list (this page's slice) — bullet + "Category:" SemiBold + " Topic" Light
  const BULLET_X = 60
  const CAT_X = 70
  let y = 491
  const lineGap = 17
  const modSize = 9.7
  for (const c of courses) {
    const idx = c.indexOf(': ')
    const cat = idx > -1 ? c.slice(0, idx) : c
    const topic = idx > -1 ? c.slice(idx + 2) : ''
    page.drawCircle({ x: BULLET_X, y: y + 3, size: 1.4, color: COLOR_BLACK })
    const catText = `${cat}:`
    draw(catText, { x: CAT_X, y, size: modSize, font: fonts.semibold, color: COLOR_BLACK })
    if (topic) {
      const catWidth = fonts.semibold.widthOfTextAtSize(catText, modSize)
      /* Ohne Begrenzung lief ein langer Modultitel bis an die Blattkante —
         besonders in den Sprachen mit längeren Zusammensetzungen. */
      drawPassend(` ${topic}`, {
        x: CAT_X + catWidth, y, size: modSize, font: fonts.light, color: COLOR_BLACK, minSize: 7,
      })
    }
    y -= lineGap
  }

  // 7) Rollenzeile unter der Unterschrift — small, Regular
  drawPassend(t('cert_ceo_role'), {
    x: 78.7, y: 77, size: 10.5, font: fonts.regular, color: COLOR_BLACK, minSize: 8,
  })
}

export async function generateCertificatePdf({ name, courses, dateStr, lang = 'de' }) {
  const templateBytes = await fetch(CERT_TEMPLATE_URL).then(r => r.arrayBuffer())

  // Split modules into pages
  const chunks = []
  const list = Array.isArray(courses) ? courses : []
  if (list.length === 0) chunks.push([])
  else {
    for (let i = 0; i < list.length; i += MAX_MODULES_PER_PAGE) {
      chunks.push(list.slice(i, i + MAX_MODULES_PER_PAGE))
    }
  }

  // Single-page fast path — open the template directly (preserves any
  // template-level features the most reliably)
  if (chunks.length <= 1) {
    const pdfDoc = await PDFDocument.load(templateBytes)
    const fonts = await loadFonts(pdfDoc, lang)
    drawCertPage(pdfDoc.getPages()[0], {
      name, dateStr, lang,
      courses: chunks[0] || [],
      fonts,
      pageIndex: 0,
      totalPages: 1,
    })
    return await pdfDoc.save()
  }

  // Multi-page path: build a fresh PDFDocument, copy the template's page once
  // per chunk, then draw the chunk content on top.
  const pdfDoc = await PDFDocument.create()
  const fonts = await loadFonts(pdfDoc, lang)
  const templateDoc = await PDFDocument.load(templateBytes)
  for (let pi = 0; pi < chunks.length; pi++) {
    const [copied] = await pdfDoc.copyPages(templateDoc, [0])
    pdfDoc.addPage(copied)
    drawCertPage(copied, {
      name, dateStr, lang,
      courses: chunks[pi],
      fonts,
      pageIndex: pi,
      totalPages: chunks.length,
    })
  }
  return await pdfDoc.save()
}

/** Trigger a browser download of the generated PDF. */
export async function downloadCertificate({ name, courses, dateStr, lang = 'de' }) {
  const bytes = await generateCertificatePdf({ name, courses, dateStr, lang })
  const blob = new Blob([bytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  /* Der Dateiname pruefte auf lang === 'en', der PDF-Text dagegen auf lang !== 'de'.
     Ein tschechisches Zertifikat bekam dadurch englischen Text in einer Datei mit
     deutschem Namen. Jetzt haengen beide an derselben Sprache. */
  const filenamePrefix = BRAND.cert?.filenamePrefix || (lang === 'de' ? 'NovoAcademy_Zertifikat' : 'NovoAcademy_Certificate')
  const fallback = lang === 'de' ? 'Beispiel' : 'Example'
  // Sanitise: only keep ASCII alphanumerics, dot, underscore, hyphen — protects
  // against path traversal / null bytes / invalid filename chars across OSes.
  const safeName = (name || fallback)
    .normalize('NFKD').replace(/[̀-ͯ]/g, '') // strip diacritics
    .replace(/[^A-Za-z0-9._-]+/g, '_')
    .replace(/^[_.]+|[_.]+$/g, '')
    .slice(0, 80) || fallback
  link.download = `${filenamePrefix}_${safeName}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
