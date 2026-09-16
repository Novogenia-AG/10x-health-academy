/* Thumbnail helper */
export const T = (n) => `/thumbnails/${String(n).padStart(2, '0')}.jpg`

/* Generic 5-question test, reused across courses (prototype) */
const GENERIC_QUESTIONS = [
  {
    q: 'Welche Aussage zu genetischen Varianten (SNPs) ist korrekt?',
    options: [
      'SNPs sind seltene Mutationen, die nur bei <0,1 % der Bevölkerung vorkommen.',
      'SNPs sind häufige Variationen einzelner DNA-Bausteine zwischen Menschen.',
      'SNPs sind ausschließlich für Augenfarbe verantwortlich.',
      'SNPs werden nicht vererbt.',
    ],
    correct: 1,
  },
  {
    q: 'Welche Rolle spielen Gene in der personalisierten Beratung?',
    options: [
      'Sie ersetzen die persönliche Anamnese vollständig.',
      'Sie liefern keine relevanten Informationen.',
      'Sie ergänzen Lebensstilfaktoren um eine veranlagungsbasierte Komponente.',
      'Sie bestimmen ausschließlich die Lebenserwartung.',
    ],
    correct: 2,
  },
  {
    q: 'Welcher Satz beschreibt Epigenetik am besten?',
    options: [
      'Veränderung der DNA-Sequenz selbst.',
      'Beeinflussung der Genaktivität durch Umwelt und Lebensstil.',
      'Synonyme für Genetik.',
      'Eine Form der Mutation.',
    ],
    correct: 1,
  },
  {
    q: 'Welcher Umgang mit Kundeneinwänden ist empfehlenswert?',
    options: [
      'Den Einwand ignorieren und über das Produkt sprechen.',
      'Aktiv zuhören, validieren und mit fachlichen Argumenten antworten.',
      'Den Kunden korrigieren und seine Sichtweise als falsch bezeichnen.',
      'Sofort einen Rabatt anbieten.',
    ],
    correct: 1,
  },
  {
    q: 'Welche Aussage zur Qualitätssicherung von genetischen Tests trifft zu?',
    options: [
      'Es gibt keine relevanten Standards.',
      'Akkreditierte Labore arbeiten nach klar definierten Qualitätsstandards.',
      'Qualität ist nur abhängig vom Probengeber.',
      'Ergebnisse benötigen keine Kontrolle.',
    ],
    correct: 1,
  },
]

/* Generic content blocks for course content page (prototype) */
const GENERIC_VIDEOS = [
  { title: 'Modul 1 — Einführung', duration: '4:12', thumbIdx: 1 },
  { title: 'Modul 2 — Wissenschaftlicher Hintergrund', duration: '7:45', thumbIdx: 2 },
  { title: 'Modul 3 — Anwendung in der Praxis', duration: '6:08', thumbIdx: 3 },
]
const GENERIC_DOCS = [
  { title: 'Schulungs-Präsentation', size: '12,4 MB', type: 'pptx', thumbnail: '/slide1-thumb.jpg' },
  { title: 'Schulungs-PDF (Skript)', size: '1,8 MB', type: 'pdf' },
  { title: 'Argumentations-Cheatsheet', size: '420 KB', type: 'pdf' },
]

/* All courses — flat list, then grouped for display */
export const COURSES = [
  /* ======== Weight Management ======== */
  {
    id: 'wm-sci',
    uid: '305a1d78-abe6-4239-b428-c16005d85162',
    lang: 'de',
    category: 'Die Gen-Diät',
    topic: 'Wissenschaftliche Basis',
    contentType: 'course',
    description: 'Wie Gene das Körpergewicht steuern — die wissenschaftlichen Grundlagen verständlich aufbereitet.',
    longDescription:
      'In diesem Modul tauchen wir tief in die genetischen Hintergründe des Körpergewichts ein. Du lernst, welche Mechanismen Gene auf den Energiehaushalt, das Hungergefühl, die Fettverteilung und die Reaktion auf bestimmte Makronährstoffe haben — und wie diese genetischen Informationen helfen können, Kunden gezielter und ehrlicher zu beraten.',
    bullets: [
      'Welche Gene den Energiestoffwechsel und die Fettverwertung steuern',
      'Wie genetische Veranlagung mit Lebensstil zusammenwirkt',
      'Was die Forschung über erblich bedingtes Übergewicht wirklich sagt',
      'Wie du genetische Informationen seriös in der Kundenberatung einsetzt',
    ],
    thumbnail: T(1),
    youtubeId: '2QmG2UWqR1Y',
    introQuestionsHeader: 'In dieser Schulung bekommst du Antworten auf folgende Fragen:',
    introQuestions: [
      'Kalorienzählen — wo liegt das Problem?',
      'Warum können manche Menschen essen, was sie wollen, ohne zuzunehmen?',
      'Wie können Menschen durch verschiedene Kalorienarten unterschiedlich zunehmen?',
      'Wie Gene die Wirksamkeit von Bewegung und Diäten beeinflussen.',
      'Weitere Wege, auf denen Gene unser Körpergewicht beeinflussen.',
    ],
    postVideoText:
      'Damit endet die Schulung zum Einfluss der Gene auf die Wirksamkeit von Strategien zum Gewichtsmanagement. Du kannst die Folien gerne herunterladen und in deiner eigenen Beratungspraxis verwenden.',
    documents: [
      {
        title: 'NovoAcademy Folien - Die Gen-Diät',
        size: '154 MB',
        type: 'pptx',
        thumbnail: '/slide1-thumb.jpg',
        url: 'https://github.com/Novogenia-AG/novo-academy/releases/download/course-materials/POWERPOINT_Die_Gen-Diaet.pptx',
      },
      {
        title: 'NovoAcademy Demo Bericht - Ernährungsplan',
        size: '113 MB',
        type: 'pdf',
        url: 'https://github.com/Novogenia-AG/novo-academy/releases/download/course-materials/Demo_NovoDaily_Nutrition_Plan.pdf',
      },
      {
        title: 'NovoAcademy Demo Bericht - Gen-Diät Analysebericht',
        size: '17 MB',
        type: 'pdf',
        url: '/course-materials/gene-diet/01-wissenschaftliche-basis/course/DEMO_SHAPE.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - 2,4-fach mehr Gewichtsverlust durch genetisch personalisiertes Programm',
        size: '610 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Genetic_Weight_Loss_Study_2,4x.pdf',
      },
    ],
    /* Test for "Wissenschaftliche Basis" — 5 questions derived from the video transcript
       (which is treated as the ultimate truth) and cross-referenced with the old
       training material in OLD TRAINING MATERIAL/Kapitel-4-Abnehmen/. */
    questions: [
      {
        q: 'Welcher Anteil des Übergewichts wird laut wissenschaftlicher Schätzung durch genetische Faktoren beeinflusst?',
        options: [
          'Ungefähr 50 %',
          'Ungefähr 65 %',
          'Ungefähr 80 %',
          'Ungefähr 90 %',
        ],
        correct: 2,
      },
      {
        q: 'Warum nehmen manche Menschen trotz erhöhter Fettzufuhr kaum zu?',
        options: [
          'Weil ihre Mitochondrien überschüssige Fettkalorien als Wärme abgeben (erhöhte Thermogenese)',
          'Weil bei ihnen die Fettaufnahme-Regulierungsgene (z. B. PPAR-Gamma) korrekt einschalten — überschüssiges Fett bleibt im Darm und wird ausgeschieden',
          'Weil ihr Hungergefühl schneller einsetzt und sie reflexartig weniger essen',
          'Weil ihr Darmmikrobiom Fett bevorzugt zur Acetat-Produktion nutzt',
        ],
        correct: 1,
      },
      {
        q: 'Wie verhalten sich Kohlenhydrate, Fett und Eiweiß in Bezug auf genetische Unterschiede der Verträglichkeit?',
        options: [
          'Bei Eiweiß und Kohlenhydraten sind genetische Unterschiede bekannt, bei Fett nicht',
          'Bei Fett und Eiweiß gibt es genetische Unterschiede, bei Kohlenhydraten reagieren alle gleich',
          'Bei Fett und Kohlenhydraten gibt es genetische Unterschiede; bei Eiweiß sind bisher keine identifiziert',
          'Bei allen drei Makronährstoffen sind individuelle genetische Empfindlichkeiten beschrieben',
        ],
        correct: 2,
      },
      {
        q: 'Was zeigt die Auswertung von 25 Studien zu Sport und Gewichtsverlust beim selben Trainingsprogramm?',
        options: [
          'Alle nehmen ab, der Unterschied liegt aber nur bei 10–15 %',
          'Die Gruppe teilt sich in „Responder" und „Nonresponder", deren Abnehmerfolg sich um Faktor 2 bis 8 unterscheidet',
          'Männer profitieren wegen höheren Testosteronspiegels deutlich stärker von Sport',
          'Der Effekt ist über alle Studien hinweg sehr ähnlich, sobald Alter und Gewicht herausgerechnet werden',
        ],
        correct: 1,
      },
      {
        q: 'Welches Ergebnis lieferte die interne Validierungsstudie mit 300 Teilnehmern beim Vergleich Standard-Diät vs. genetisch personalisiertes Programm in derselben Zeit?',
        options: [
          'Beide Phasen lieferten ähnliche Ergebnisse, lediglich die Compliance war besser',
          'Das genetisch personalisierte Programm führte zu 1,4-mal mehr Gewichtsverlust',
          'Das genetisch personalisierte Programm führte zu 2,4-mal mehr Gewichtsverlust',
          'Das genetisch personalisierte Programm führte zu 3,8-mal mehr Gewichtsverlust',
        ],
        correct: 2,
      },
      {
        q: 'Eine Kundin hat laut Genanalyse eine hohe Kohlenhydrat-Empfindlichkeit, aber kaum Fettempfindlichkeit. Welche Empfehlung passt am besten zu ihrer Genetik?',
        options: [
          'Sie sollte alle Diätformen meiden und ausschließlich auf Sport setzen',
          'Eine klassische Low-Fat-Diät, damit der gesamte Kalorienpool sinkt',
          'Eine Ernährung mit deutlich reduzierten Kohlenhydraten und höherem Anteil an gesunden Fetten',
          'Eine Standard-Diät — die Empfindlichkeit wirkt sich in der Praxis kaum aus',
        ],
        correct: 2,
      },
      {
        q: 'Warum reicht das klassische Konzept der Kalorienbilanz (Kalorien rein vs. raus) nicht aus, um zu erklären, warum Diäten unterschiedlich wirken?',
        options: [
          'Weil moderne Lebensmittel mehr Kalorien enthalten als auf der Verpackung angegeben',
          'Weil Gene mitbestimmen, wie viele Kalorien überhaupt aufgenommen werden und wie effektiv Sport oder Hungern bei einem einzelnen Menschen wirken',
          'Weil Kalorienzählen nur bei jüngeren Menschen unter 40 zuverlässig funktioniert',
          'Weil das Konzept im Grundsatz falsch ist — Kalorien spielen für die Gewichtsregulation keine relevante Rolle',
        ],
        correct: 1,
      },
      {
        q: 'Ein Kunde fragt: „Meine Schwester hat mit derselben Diät 6 kg abgenommen, ich nur 1,5 kg — wie kann das sein?" Welche Antwort entspricht der genetischen Sichtweise am besten?',
        options: [
          'Deine Schwester hat sich vermutlich strenger an das Programm gehalten',
          'Männer reagieren auf Diäten generell schwächer als Frauen',
          'Eure genetischen Empfindlichkeiten gegenüber Fett, Kohlenhydraten und gegenüber Diät- bzw. Sport-Reizen unterscheiden sich — dieselbe Diät passt nicht für jeden gleich gut',
          'Ein Plateau-Effekt nach der ersten Woche bremst manche Menschen aus, das ist Pech',
        ],
        correct: 2,
      },
      {
        q: 'Eine Kundin gehört genetisch zu den „Sport-Nonrespondern" und gleichzeitig zu den „Kalorien-Respondern". Welcher Beratungsschritt wäre für sie sowohl ineffektiv als auch demotivierend?',
        options: [
          'Sie für ein moderates, aber regelmäßiges Bewegungsprogramm gewinnen',
          'Mit ihr ein realistisches Kaloriendefizit aushandeln',
          'Ihr ein 6-mal-pro-Woche-Hochintensitäts-Sportprogramm als Hauptstrategie verschreiben',
          'Lebensmittel anhand ihrer genetisch optimalen Verteilung auswählen',
        ],
        correct: 2,
      },
      {
        q: 'Was unterscheidet eine genetisch personalisierte Empfehlung im Kern von einer Standard-Diät-Beratung?',
        options: [
          'Sie verbietet ganze Lebensmittelgruppen, während Standard-Diäten alles erlauben',
          'Sie richtet sich nach den individuell wirksamsten Hebeln (z. B. Sport vs. Kalorien, Fett vs. Kohlenhydrate) statt nach einem einheitlichen Schema',
          'Sie funktioniert ausschließlich bei stark übergewichtigen Personen',
          'Sie ersetzt das Kalorienzählen vollständig durch ein anderes Mess-System',
        ],
        correct: 1,
      },
      {
        q: 'Eine Kundin sagt: „Ich gehe seit Jahren regelmäßig zum Sport, mein Gewicht hat sich aber kaum verändert." Wie lässt sich das aus genetischer Sicht erklären — und welche praktische Konsequenz folgt daraus?',
        options: [
          'Sport ist generell wirkungslos zum Abnehmen, sie sollte ihn ganz aufgeben',
          'Sie ist vermutlich eine Sport-Nonresponderin — der Fokus sollte auf Ernährung/Kalorienreduktion liegen, Sport bleibt sinnvoll für Gesundheit und Muskelerhalt, ist aber nicht ihr Haupt-Hebel zum Abnehmen',
          'Sport wirkt erst zuverlässig nach 5+ Jahren regelmäßigem Training',
          'Sie sollte ihren Sportumfang verdreifachen, dann springt der Stoffwechsel sicher an',
        ],
        correct: 1,
      },
    ],
    hasDownload: true, hasText: false,
    brandNoticeAboveDownloads: true,
    /* DEMO: this course shows as already certified in the initial state. */
    initialWatched: true, initialTestPassed: true, initialTestScore: 93,
  },
  {
    id: 'wm-report',
    uid: '384a976d-bcbb-4f86-b280-d2ca1d740a38',
    lang: 'de',
    category: 'Die Gen-Diät',
    topic: 'Beratungsschulung',
    contentType: 'course',
    description: 'Den genetischen Bericht zur Gewichtskontrolle Punkt für Punkt mit dem Kunden durchgehen.',
    longDescription:
      'In dieser Beratungsschulung erklärt Dr. Daniel Wallerstorfer Kapitel für Kapitel, wie du den genetischen Gewichtsbericht kompetent mit deinen Kunden durchsprichst. Du lernst, wie du verschiedene Ergebnistypen erklärst, häufige Kundenfragen beantwortest und den gesamten Bericht souverän präsentierst.',
    bullets: [
      'Den Bericht Kapitel für Kapitel mit dem Kunden durchgehen',
      'Verschiedene Ergebnis-Typen verständlich erklären (Empfindlichkeiten, Diät-Strategie, Sport-Reaktion)',
      'Tagesmenüs, Rezepte und Lebensmittelliste richtig anwenden',
      'Häufige Kundenfragen souverän beantworten',
    ],
    /* Cover-Standbild aus Teil 1 (rqae12uqZkE) — zeigt absichtlich den Bericht */
    thumbnail: '/thumbnails/wm-report-cover.jpg',
    introQuestionsHeader: 'In dieser Schulung lernst du:',
    introQuestions: [
      'Wie der Bericht aufgebaut ist und wie du ihn strukturiert mit Kunden besprichst',
      'Wie du Fett- und Kohlenhydrat-Empfindlichkeit verständlich erklärst',
      'Wie du Sport-Responder/Nonresponder und die Diät-Strategie einordnest',
      'Wie Tagesmenüs, Lebensmittelliste und personalisierte Rezepte richtig genutzt werden',
      'Wie du die häufigsten Kundenfragen kompetent beantwortest',
    ],
    brandNoticeAboveVideos: true,
    /* 14 Schulungsvideo-Kapitel zur Analyseberatung — Titel aus Novogenia_YouTube_Videos.xlsx. */
    videoSegments: [
      { title: 'Teil 1 — Vorstellung', youtubeId: 'rqae12uqZkE' },
      { title: 'Teil 2 — Ernährungstyp', youtubeId: 'fixLktZljhw' },
      { title: 'Teil 3 — Wissenschaft der Gene', youtubeId: 'LKntZF-Mf5w' },
      { title: 'Teil 5 — Erhaltung deiner Muskelmasse', youtubeId: 'C_gAEaJ3Nro' },
      { title: 'Teil 4 — Sport oder Kalorienreduktion', youtubeId: 'LSVMmF6tmWA' },
      { title: 'Teil 6 — Hunger und Sättigungsgefühl im Griff', youtubeId: '_CLmOVISzew' },
      { title: 'Teil 7 — Fettverteilung – wo sich Fett ansammelt', youtubeId: 'dNxo7sGc-cY' },
      { title: 'Teil 8 — Endlich schlank. Und jetzt?', youtubeId: 'MdhoLTk9NxQ' },
      { title: 'Teil 9 — Du und deine Ergebnisse im Alltag', youtubeId: 'Gl6ESeD9fMk' },
      { title: 'Teil 10 — Ernährung', youtubeId: 'J5mjGUUPauA' },
      { title: 'Teil 11 — Die Lebensmittelliste mit dem Artikelsystem', youtubeId: '65KFDOTkuh4' },
      { title: 'Teil 12 — Rezeptbuch, Tagesmenüs', youtubeId: 'Bfpaz1wgwAA' },
      { title: 'Teil 13 — Individuelle Mischung, maximale Wirkung', youtubeId: 'ZxHifFgNEMQ' },
      { title: 'Teil 14 — Sport. Erstelle deinen Plan', youtubeId: 'oyswZJ-H3D0' },
    ],
    postVideoText:
      'Mit dieser Schulung bist du bereit, den genetischen Bericht souverän mit deinen Kunden durchzugehen. Die folgenden Demo-Booklets kannst du als Beispiel-Berichte für deine eigene Beratungspraxis verwenden.',
    /* Same 2 PDFs as the first course — kein PowerPoint hier. */
    documents: [
      {
        title: 'NovoAcademy Demo Bericht - Ernährungsplan',
        size: '113 MB',
        type: 'pdf',
        url: 'https://github.com/Novogenia-AG/novo-academy/releases/download/course-materials/Demo_NovoDaily_Nutrition_Plan.pdf',
      },
      {
        title: 'NovoAcademy Demo Bericht - Gen-Diät Analysebericht',
        size: '17 MB',
        type: 'pdf',
        url: '/course-materials/gene-diet/01-wissenschaftliche-basis/course/DEMO_SHAPE.pdf',
      },
    ],
    /* 15 Multiple-Choice-Fragen für die Zertifizierung.
       4 textbasierte Wissens-/Anwendungsfragen, 11 bildbasierte
       Fragen mit echten Bericht-Ausschnitten. */
    questions: [
      {
        q: 'Welche Aussage ist hier korrekt?',
        screenshot: '/course-materials/gene-diet/02-beratungsschulung/test/q-fett-maessig.png',
        options: [
          'Fett ist eindeutig das Hauptproblem dieses Kunden — die Kohlenhydrat-Empfindlichkeit ist für die Empfehlung irrelevant',
          'Eine mäßige Fettempfindlichkeit bedeutet, dass Fett komplett gemieden werden muss',
          'Die Fettempfindlichkeit ist nicht maximal, könnte aber besser sein. Wie sich das auf die endgültige Ernährungsempfehlung auswirkt, hängt zusätzlich von der Kohlenhydrat-Empfindlichkeit ab — die beiden Werte werden gemeinsam interpretiert',
          'Die Fettempfindlichkeit ist optimal — der Kunde kann unbegrenzt Fett essen',
        ],
        correct: 2,
      },
      {
        q: 'Ein Kunde hat im Bericht eine niedrige Kohlenhydrat-Empfindlichkeit und eine hohe Fettempfindlichkeit. Wie übersetzt du das verständlich für ihn?',
        options: [
          '„Du musst Kohlenhydrate komplett meiden, sonst wirst du nicht abnehmen"',
          '„Spaghetti, Reis und Brot sind bei dir kein Hauptproblem; reduziere stattdessen Fettmengen — und wähle bei Fett möglichst gesunde Quellen"',
          '„Iss einfach weniger von allem, die Verteilung spielt keine Rolle"',
          '„Du kannst essen, was du willst — Genetik bestimmt nichts"',
        ],
        correct: 1,
      },
      {
        q: 'Welche Aussage ist hier korrekt?',
        screenshot: '/course-materials/gene-diet/02-beratungsschulung/test/q-gen-tabelle.png',
        options: [
          'Die RS-Nummern sind Bewertungspunkte — je höher die Zahl, desto gesünder der Kunde',
          'Die Tabelle listet die untersuchten Gene mit ihrer RS-Nummer auf. Genotyp ist das tatsächliche Laborergebnis, Funktion zeigt wie funktionstüchtig das jeweilige Gen ist — grün = einwandfrei, rot = beeinträchtigte Funktion (Gendefekt oder ungünstige Variante)',
          'Rote Symbole bedeuten, dass das jeweilige Gen besonders aktiv und damit besonders gesund ist',
          'Der Genotyp gibt an, wie viel Prozent eines Nährstoffs der Kunde pro Tag aufnehmen darf',
        ],
        correct: 1,
      },
      {
        q: 'Ein Kunde fragt: „Warum darf ich laut diesem Plan Spaghetti essen, mein Mann mit gleichem Bericht aber nicht?" Welche Antwort ist korrekt?',
        options: [
          'Der Bericht ist gleich, aber das System gibt zufällige Empfehlungen aus',
          'Männer und Frauen haben grundsätzlich andere Empfehlungen',
          'Eure Berichte sind nicht gleich — eure genetischen Empfindlichkeiten unterscheiden sich, dadurch ergibt sich für jeden eine andere optimale Makronährstoff-Verteilung',
          'Spaghetti sind generell für niemanden empfohlen — das war ein Fehler im System',
        ],
        correct: 2,
      },
      {
        q: 'Welche Aussage ist hier korrekt?',
        screenshot: '/course-materials/gene-diet/02-beratungsschulung/test/q-kh-hoch.png',
        options: [
          'Hohe Kohlenhydrat-Empfindlichkeit bedeutet, dass alle Kohlenhydrate (auch Gemüse und Hülsenfrüchte) komplett verboten sind',
          'Eine hohe Empfindlichkeit ist positiv — der Kunde sollte mehr Kohlenhydrate essen, um seinen Stoffwechsel zu trainieren',
          'Der Kunde reagiert genetisch sehr empfindlich auf Kohlenhydrate — Kohlenhydrate müssen deshalb reduziert werden. Wie hoch der Kohlenhydrat-Anteil in der finalen Ernährung sein soll, hängt zusätzlich von der Fett-Empfindlichkeit ab. Es bedeutet aber nicht, dass gar keine Kohlenhydrate erlaubt sind',
          'Die Empfindlichkeit ist nur ein theoretischer Wert ohne Einfluss auf die konkrete Ernährungsempfehlung',
        ],
        correct: 2,
      },
      {
        q: 'Ein Kunde hat ein schwaches Sättigungsgefühl laut Bericht. Welcher konkrete Beratungstipp passt dazu?',
        options: [
          'Den Hunger einfach ignorieren — er verschwindet von selbst nach 14 Tagen',
          'Doppelte Portionen empfehlen, damit der Magen vollständig gefüllt ist',
          'Langsamer essen — so hat das Sättigungsgefühl Zeit, sich aufzubauen, bevor zu viel gegessen wird',
          'Mehrere Snacks pro Tag empfehlen, statt drei klare Hauptmahlzeiten',
        ],
        correct: 2,
      },
      {
        q: 'Welche Aussage ist hier korrekt?',
        screenshot: '/course-materials/gene-diet/02-beratungsschulung/test/q-makros-uebersicht.png',
        options: [
          'Eiweiß ist das kritische Makro — es muss bei diesem Kunden drastisch reduziert werden',
          'Da Fett nur „mäßig" und Kohlenhydrate „hoch" sind, sollte er Fett komplett weglassen — Kohlenhydrate sind unkritisch',
          'Das Hauptproblem dieses Kunden sind Kohlenhydrate (Empfindlichkeit hoch), Fett ist nur mäßig empfindlich. Die Strategie ist daher Low-Carb / Medium-Fat — der Reduktionsfokus liegt klar auf Kohlenhydraten',
          'Fett, Kohlenhydrate und Eiweiß werden bei diesem Kunden identisch verarbeitet — er kann frei wählen, was er reduziert',
        ],
        correct: 2,
      },
      {
        q: 'Ein Kunde sagt: „Diese Diät erlaubt mir 47 % Kohlenhydrate — heißt das, ich darf ALLE Kohlenhydrate essen?" Welche Antwort ist korrekt?',
        options: [
          'Ja, alle Kohlenhydrate sind erlaubt, solange die Gesamtmenge stimmt',
          'Nein, der Bericht verbietet alle Kohlenhydrate komplett',
          'Es ist eine Empfehlung der idealen Kalorien-Verteilung, kein Verbot. Eine ausgewogene Mischung verschiedener Kohlenhydratquellen (Gemüse, Vollkorn, Hülsenfrüchte) bleibt wichtig',
          'Nur weiße Kohlenhydrate sind erlaubt, Vollkorn nicht',
        ],
        correct: 2,
      },
      {
        q: 'Welche Aussage ist hier korrekt?',
        screenshot: '/course-materials/gene-diet/02-beratungsschulung/test/q-optimale-verteilung.png',
        options: [
          'Beide kcal-Werte (1056 und 1422) gelten gleichzeitig — der Kunde soll beide Mengen pro Tag essen',
          'Die 49 % Kohlenhydrate aus dem Donut bedeuten 49 Gramm — das ist die direkte tägliche Mengenangabe',
          'Wenn der Kunde sein Gewicht halten möchte, darf er pro Tag insgesamt 1422 kcal aufnehmen — bestehend aus 49 g Fett, 174 g Kohlenhydrate und 71 g Eiweiß',
          'Die kcal-Werte sind allgemeine Standard-Schätzwerte ohne Bezug zum Bericht',
        ],
        correct: 2,
      },
      {
        q: 'Welche Aussage ist hier korrekt?',
        screenshot: '/course-materials/gene-diet/02-beratungsschulung/test/q-fto-gen.png',
        options: [
          'Der Kunde hat beide Kopien des Gens intakt (T/T) — es gibt keine Auswirkung auf seine Fettempfindlichkeit',
          'Der Kunde hat zwei Kopien des FTO-Gens — eine ist defekt, die andere funktional (Genotyp T/A). Das Ergebnis ist eine erhöhte Fettempfindlichkeit',
          'Der Kunde gehört zu den 14 % der Bevölkerung mit zwei defekten Kopien (A/A) — die schwerste Form',
          'Die Prozentangaben (46 % / 40 % / 14 %) zeigen, wie viel Fett der Kunde pro Tag essen darf',
        ],
        correct: 1,
      },
      {
        q: 'Welche Aussage ist hier korrekt?',
        screenshot: '/course-materials/gene-diet/02-beratungsschulung/test/q-sport-effektiv.png',
        options: [
          'Sport ist bei diesem Kunden wirkungslos — er sollte es weglassen und sich nur auf Ernährung konzentrieren',
          'Der Kunde nimmt durch Sport — bei gleichem Trainingsaufwand — mehr Gewicht ab als die meisten Menschen, weil seine Gene besonders gut auf Bewegung reagieren',
          'Der Kunde sollte ausschließlich Krafttraining machen — Ausdauer ist für ihn genetisch ineffektiv',
          'Sport hat bei allen Menschen den gleichen Effekt — Genetik spielt hier keine Rolle',
        ],
        correct: 1,
      },
      {
        q: 'Welche Aussage ist hier korrekt?',
        screenshot: '/course-materials/gene-diet/02-beratungsschulung/test/q-hunger-stark.png',
        options: [
          'Der Kunde sollte den Hunger einfach ignorieren — er verschwindet von selbst nach 14 Tagen Diät',
          'Hunger ist rein psychologisch und nicht genetisch beeinflussbar',
          'Unter gleichen Umständen fühlt dieser Kunde Hunger schneller und stärker als Menschen mit anderen Genen — sein Hungergefühl ist genetisch ungünstiger reguliert',
          'Der Kunde hat ein schwächeres Hungergefühl als andere und muss sich aktiv ans Essen erinnern',
        ],
        correct: 2,
      },
      {
        q: 'Welche Aussage ist hier korrekt?',
        screenshot: '/course-materials/gene-diet/02-beratungsschulung/test/q-snack-haeufig.png',
        options: [
          'Der Kunde muss Snacks komplett verbieten — Disziplin ist die einzige Lösung',
          'Personen mit diesen Genen tendieren dazu, häufiger zu snacken — wenn sie nicht bewusst darauf achten. Der Kunde sollte sich dieser Tendenz bewusst sein und gezielt zu kalorienarmen Snacks aus der empfohlenen Liste greifen',
          'Häufiges Snacken ist ausschließlich eine Frage der Willensstärke, nicht der Genetik',
          'Snacks sind grundsätzlich für niemanden empfohlen, unabhängig vom Bericht',
        ],
        correct: 1,
      },
      {
        q: 'Welche Aussage ist hier korrekt?',
        screenshot: '/course-materials/gene-diet/02-beratungsschulung/test/q-training-tabelle.png',
        options: [
          'Der Kunde muss alle aufgelisteten Sportarten gleichzeitig in einer Trainingseinheit kombinieren — sonst funktioniert der Plan nicht',
          'Die Tabelle gibt für jede Sportart die Dauer einer Trainingseinheit an. Um Gewicht zu reduzieren, soll der Kunde 7 Einheiten pro Woche absolvieren — z. B. 20 Minuten Bergsteigen pro Einheit',
          'Die Minutenangaben zeigen die Gesamtdauer pro Woche — 20 Minuten Bergsteigen einmal die Woche reichen schon',
          'Die kcal/h-Werte sind willkürlich gesetzt — alle Sportarten haben in Wirklichkeit dieselbe Wirkung auf das Gewicht',
        ],
        correct: 1,
      },
      {
        q: 'Welche Aussage ist hier korrekt?',
        screenshot: '/course-materials/gene-diet/02-beratungsschulung/test/q-lebensmittelliste.png',
        options: [
          'Alle drei Lebensmittel (Bouillonkartoffeln, Bratäpfel, Bratwurst mit Senf) sind gleich gut zum Abnehmen geeignet',
          'Bratwurst mit Senf ist die beste Wahl zum Abnehmen — Bouillonkartoffeln sollten gemieden werden',
          'Bouillonkartoffeln sind sehr gut zum Abnehmen geeignet, Bratäpfel ebenfalls (etwas weniger), Bratwurst mit Senf ist zum Abnehmen ungeeignet',
          'Bratäpfel sind sowohl zum Abnehmen als auch für eine gesunde Ernährung die optimale Wahl — keine Einschränkungen',
        ],
        correct: 2,
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false, initialProgress: 45, initialTestPassed: false,
  },
  {
    /* ============ FAQ COURSE — Häufige Fragen zur Gen-Diät ============
       Nicht zertifizierbar; selbst-test-style Accordion mit Frage→Antwort.
       Gruppen-Klassifizierung mit Themen-Headern + PDF-Download + Bonus-Videos.
       Quellen-Datei: TRAINING CONTENT/FAQ Files for Customers Knowledge Base.md
       Marken-neutrale Sprache — generische Begriffe statt Produktnamen
       (Gen-Diät statt Weight Sensor, Kalorienblocker statt Shape). */
    id: 'wm-faq',
    uid: '7930fb0f-4a6d-451b-8d74-e46a663ce71b',
    lang: 'de',
    category: 'Die Gen-Diät',
    topic: 'Häufige Fragen',
    contentType: 'faq',
    description: 'Antworten auf die häufigsten Kundenfragen zur Gen-Diät und zum Kalorienblocker.',
    longDescription:
      'Eine Sammlung der typischen Fragen, die Kunden zur Gen-Diät, zum genetischen Bericht und zum Kalorienblocker stellen — gegliedert nach Themen, mit ausklappbarer Antwort. Ideal zum Selbsttest und als Nachschlagewerk.',
    bullets: [
      '5 Themenblöcke mit allen relevanten Kundenfragen',
      'Jede Antwort erst auf Klick sichtbar — perfekt zum Selbsttest',
      'Gen-Diät-Programm, Lebensmittelbewertung, Kalorienblocker & wissenschaftliche Belege',
      'Komplette FAQ-Sammlung als PDF zum Download',
    ],
    thumbnail: '/thumbnails/wm-faq-cover.jpg',
    faqGroups: [
      {
        title: 'Was ist die Gen-Diät?',
        items: [
          {
            q: 'Was genau ist die Gen-Diät?',
            a: 'Die Gen-Diät ist ein personalisiertes Abnehm- und Ernährungsprogramm, das auf einer Analyse deiner Gene basiert. Statt eines Standard-Diätplans bekommst du eine individuelle Empfehlung, weil dein Stoffwechsel genetisch anders reagiert als der von anderen — auf Fett, Kohlenhydrate, Sport und sogar Hunger.',
          },
          {
            q: 'Was bekomme ich konkret?',
            a: 'Du erhältst einen individuellen Bericht mit deinem optimalen Verhältnis aus Fett, Kohlenhydraten und Eiweiß, eine personalisierte Lebensmittelliste mit über 1.500 Lebensmitteln, einen 4-Wochen-Tagesmenüplan, ein Rezeptbuch sowie konkrete Sport- und Bewegungsempfehlungen, die zu deinem genetischen Profil passen.',
          },
          {
            q: 'Wie lange sind meine Empfehlungen gültig?',
            a: 'Deine Gene ändern sich nicht im Lauf des Lebens, daher bleiben die genetischen Ergebnisse dauerhaft gültig. Die Auswertung wird allerdings regelmäßig anhand neuer Forschungsergebnisse verfeinert — über 770 Verbesserungen wurden seit Programmstart eingearbeitet.',
          },
          {
            q: 'Muss ich den Test regelmäßig wiederholen?',
            a: 'Nein. Die Gene bleiben ein Leben lang gleich — ein bereits analysiertes Gen liefert immer dasselbe Ergebnis. Was sich aber laufend verbessert, ist die Auswertung selbst, weil neue wissenschaftliche Erkenntnisse kontinuierlich eingebaut werden.',
          },
        ],
      },
      {
        title: 'Wie funktioniert die genetische Auswertung der Gen-Diät?',
        items: [
          {
            q: 'Wie funktioniert das Gen-Diät-Programm?',
            a: 'Aus deinem genetischen Datensatz werden die Genvarianten ausgewählt, die für die Gewichtskontrolle relevant sind. Daraus wird berechnet: Wie empfindlich reagiert dein Körper auf Fett und Kohlenhydrate? Wie effektiv ist Sport für dich? Wie effektiv ist Kalorienreduktion? Hast du eine Tendenz zu Jo-Jo-Effekt, Muskelabbau oder Bauchfett? Aus diesen Ergebnissen ergibt sich deine optimale Makronährstoff-Verteilung und ein individueller Ernährungsplan.',
          },
          {
            q: 'Es geht beim Abnehmen doch eh nur ums Kaloriendefizit, oder?',
            a: 'Nicht nur. Studien zeigen, dass Menschen genetisch sehr unterschiedlich auf Fett und Kohlenhydrate reagieren — manche nehmen bei einem Kalorienüberschuss kaum zu, andere mit denselben Kalorien deutlich mehr. Auch die Wirksamkeit von Sport variiert genetisch um den Faktor 3.',
          },
          {
            q: 'Gibt es 7 verschiedene Ernährungstypen?',
            a: 'Ja: Fettverwertertyp (höherer Fettanteil), Mischtyp I–V (verschiedene Mischverteilungen) und Kohlenhydrat-Verwertertyp (höherer Kohlenhydratanteil). In Kombination mit individuellen Faktoren wie Grundumsatz, Sport-Wirksamkeit und Jo-Jo-Tendenz ergeben sich insgesamt über 6.500 mögliche genetische Profile.',
          },
          {
            q: 'Ab welchem Alter ist das Programm für Kinder geeignet?',
            a: 'Das Programm ist grundsätzlich auch für Kinder anwendbar, jedoch ohne Kalorien-Berechnungen, Wunschgewicht-Empfehlungen, Tagesmenüs oder Rezeptbuch — diese sind für wachsende Kinder nicht aussagekräftig. Das Rezeptbuch ist für Kinder unter 14 Jahren gesperrt.',
          },
        ],
      },
      {
        title: 'Lebensmittel & Empfehlungen',
        items: [
          {
            q: 'Was bedeuten die Gewichts-Symbole?',
            a: 'Die Gewichts-Symbole zeigen, ob die Makronährstoff-Verteilung des Lebensmittels (Fett, Kohlenhydrate, Eiweiß) für deine individuellen Abnehm-Ziele günstig (grün) oder ungünstig (rot) ist. Die Berechnung berücksichtigt zusätzlich die Kalorien pro typischer Portion.',
          },
          {
            q: 'Sind rot bewertete Lebensmittel komplett verboten?',
            a: 'Nein. Rote Lebensmittel sollten die Ausnahme bleiben, sind aber nicht verboten. Stark rot bewertete Lebensmittel (4–6 Symbole) sollten seltener gegessen werden als mäßig rot bewertete (1–3 Symbole).',
          },
          {
            q: 'Beziehen sich die Mengenangaben auf rohes oder gekochtes Gewicht?',
            a: 'Bei Pasta, Reis, Brot, Getreide, Getreideprodukten, Obst, Kartoffeln, Fisch und Fleisch wird das rohe Gewicht angegeben. Bei eingelegten Hülsenfrüchten: abgetropft und abgespült. Bei „Menükomponenten" beziehen sich die Mengen auf das fertig zubereitete Gericht.',
          },
        ],
      },
      {
        title: 'Kalorienblocker',
        items: [
          {
            q: 'Was ist der Kalorienblocker?',
            a: 'Der Kalorienblocker ist ein personalisiertes Abnehm-Produkt in Mikrotransporter-Pellet-Form. Es enthält ein individuell auf deine DNA-Analyse abgestimmtes Verhältnis aus Fett- und Kohlenhydratblockern. In Kombination mit reduzierter Kalorien- und Fettaufnahme unterstützt es nachweislich beim Abnehmen — in Verbindung mit ausgewogener Ernährung und Lebensstil hilft es beim Halten des Gewichts.',
          },
          {
            q: 'Wie nehme ich den Kalorienblocker ein?',
            a: 'Täglich vor dem Mittag- und Abendessen mit einem großen Schluck Wasser. Die Pellets sollen ganz geschluckt — nicht gekaut werden.',
          },
          {
            q: 'Was sind die aktiven Wirkstoffe?',
            a: 'Als Fettblocker dient Opuntia ficus-indica (OFI) — die Faser des Feigenkaktus. Diese pflanzliche Faser bildet im Magen-Darm-Trakt eine gel-artige Matrix, die Nahrungsfett bindet und seine Aufnahme verringert. Als Kohlenhydratblocker wird Phaseolamin (aus weißen Bohnen) eingesetzt — es hemmt das Enzym Alpha-Amylase. Beide Wirkstoffe sind komplett pflanzlich.',
          },
          {
            q: 'Ist der Kalorienblocker vegan/vegetarisch?',
            a: 'Ja. Sowohl der Fettblocker (Opuntia ficus-indica) als auch der Kohlenhydratblocker (Phaseolamin aus weißen Bohnen) sind rein pflanzlich. Der Kalorienblocker ist für Vegetarier und Veganer geeignet, glutenfrei, laktosefrei und frei von künstlichen Farbstoffen.',
          },
        ],
      },
      {
        title: 'Wissenschaft & Evidenz',
        items: [
          {
            q: 'Gibt es wissenschaftliche Belege für die nutrigenetische Analyse?',
            a: 'Ja. Es existiert umfangreiche peer-reviewte Literatur zu diesem Feld. Beispielsweise zeigen über 16 Studien, dass Menschen genetisch unterschiedlich auf Nahrungsfett reagieren (z. B. FABP2-, PPARG-, FTO-Gene). Novogenia hat zudem eine eigene Pilotstudie mit 139 Teilnehmern durchgeführt, die mit dem genetischen Programm einen 2,4-mal höheren Abnehm-Erfolg im Vergleich zur Standardberatung zeigte. Internationale Experten wie Prof. Ahmed El-Sohemy (University of Toronto) und Prof. Jose Ordovas (Tufts University) forschen und lehren auf diesem Gebiet.',
          },
        ],
      },
    ],
    documents: [
      {
        title: 'NovoAcademy FAQ PDF - Gen-Diät',
        size: 'PDF',
        type: 'pdf',
        url: '/course-materials/gene-diet/faq/Novogenia_FAQ_Gen-Diaet.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false,
  },

  /* ======== Lifestyle DNA — Wissenschaftliche Basis Kurse + FAQs ======== */
  {
    id: 'nut-faq',
    uid: '150ed184-ab90-4963-b2b1-611791a031d0',
    lang: 'de',
    category: 'Gesund ernähren nach den Genen',
    topic: 'Häufige Fragen',
    contentType: 'faq',
    description: 'Antworten auf typische Kundenfragen zur genetisch personalisierten Ernährung.',
    longDescription:
      'Eine Sammlung der häufigsten Kundenfragen zum Nutrition-Programm — Koffein, Folsäure, Lebensmittelbewertung und mehr. Gegliedert nach Themen, mit ausklappbarer Antwort.',
    bullets: [
      '4 Themenblöcke mit den wichtigsten Kundenfragen',
      'Antwort erst auf Klick — perfekt zum Selbsttest',
      'Koffein, Folsäure, Bluttest vs. Gentest',
      'Hintergrund zur Lebensmittelbewertung',
    ],
    thumbnail: '/thumbnails/nut-faq-cover.jpg',
    faqGroups: [
      {
        title: 'Allgemeines zur Ernährungsgenetik',
        items: [
          {
            q: 'Warum reagiert nicht jeder Mensch gleich auf dieselben Lebensmittel?',
            a: 'Genetische Variationen steuern, wie effizient unser Körper bestimmte Nährstoffe verwertet. Variationen in Genen wie MTHFR, CYP1A2 oder ACE entscheiden, ob ein Lebensmittel im individuellen Fall gesund oder ungünstig wirkt — auch wenn die generelle Empfehlung gleich klingt.',
          },
          {
            q: 'Wie viele Gene werden in der Ernährungsanalyse berücksichtigt?',
            a: 'Rund 60 Gene werden ausgewertet, die einen Einfluss auf den Nährstoffstoffwechsel und die Reaktion auf bestimmte Lebensmittelbestandteile haben. Daraus ergeben sich 700+ Trillionen mögliche Ergebnis-Kombinationen — jeder Kunde ist genetisch einzigartig.',
          },
          {
            q: 'Ist diese Form der Ernährungsberatung wissenschaftlich belegt?',
            a: 'Ja. Die Effekte einzelner Gene wurden in unabhängigen Studien wiederholt bestätigt. Das MTHFR-Gen z. B. ist seit über 20 Jahren mit fast 300 Studien dokumentiert. Verwendet werden ausschließlich Gene, deren Effekt durch mindestens drei unabhängige Studien an unterschiedlichen Populationen belegt ist.',
          },
        ],
      },
      {
        title: 'Koffein & Kaffee',
        items: [
          {
            q: 'Warum gibt es Studien, die Kaffee mal als gesund, mal als ungesund einstufen?',
            a: 'Weil die Wirkung genetisch unterschiedlich ist. Das CYP1A2-Gen baut Koffein ab. Bei guter Variante senkt Kaffee das Herzinfarkt-Risiko um etwa ein Drittel. Bei defekter Variante bleibt Koffein zu lange im Körper und erhöht das Risiko um etwa zwei Drittel.',
          },
          {
            q: 'Kann ich auch ohne Gentest grob einschätzen, ob ich Koffein schnell oder langsam abbaue?',
            a: 'Ein einfacher Selbsttest: Wer abends um 22 Uhr noch zwei Tassen Kaffee trinken kann und einschlafen kann, ist meist ein schneller Verwerter. Wer schon ab 17 Uhr keinen Kaffee mehr verträgt, hat meist eine eingeschränkte CYP1A2-Funktion. Das ist nicht 100 %ig zuverlässig, gibt aber eine Tendenz.',
          },
          {
            q: 'Was ist eine sinnvolle Lösung für langsame Koffein-Verwerter, die Kaffee aber gerne mögen?',
            a: 'Entkoffeinierter Kaffee — alle gesunden Antioxidantien, Polyphenole und Flavonoide bleiben enthalten, das schädliche Koffein wird vorher entfernt. Wer Mischvarianten verwendet (z. B. ein Drittel koffeinhaltig, zwei Drittel entkoffeiniert), bleibt nahe an der natürlichen Geschmackserfahrung ohne Risiko-Erhöhung.',
          },
        ],
      },
      {
        title: 'Folsäure & MTHFR',
        items: [
          {
            q: 'Was bedeutet ein MTHFR-Defekt für die Folsäure-Einnahme?',
            a: 'Folsäure wird im Körper erst durch das MTHFR-Gen in die aktive Form Methylfolat umgewandelt. Bei einem Defekt funktioniert diese Umwandlung schlechter oder gar nicht — die Folsäure wirkt dann nicht, obwohl sie im Blut messbar ist.',
          },
          {
            q: 'Warum kann ein normaler Bluttest einen MTHFR-Defekt nicht aufdecken?',
            a: 'Der Bluttest misst nur, wie viel Folsäure im Blut zirkuliert. Er sagt aber nicht, ob die Folsäure auch tatsächlich in die aktive Form umgewandelt wurde. Nur ein Gentest zeigt, ob die Umwandlung funktioniert.',
          },
          {
            q: 'Was ist die Lösung bei einem MTHFR-Defekt?',
            a: 'Direkt die aktive Form Methylfolat supplementieren — diese überspringt den genetischen Umwandlungs-Schritt. Eine berühmte Studie an 12 unfruchtbaren Frauen mit MTHFR-Defekt zeigte: nach Umstellung von Folsäure auf Methylfolat wurden 11 von 12 innerhalb von 12 Monaten schwanger.',
          },
        ],
      },
      {
        title: 'Bluttest vs. Gentest',
        items: [
          {
            q: 'Brauche ich überhaupt einen Bluttest, wenn ich einen Gentest habe?',
            a: 'Beide Tests ergänzen sich. Der Gentest zeigt die genetische Veranlagung (lebenslang gültig). Der Bluttest zeigt den aktuellen Versorgungs-Status (Momentaufnahme — ändert sich mit Saison, Stress, Ernährung). Optimal ist die Kombination aus beidem.',
          },
          {
            q: 'Wenn die Gene gut funktionieren — brauche ich dann gar keine Nahrungsergänzung?',
            a: 'Nicht zwangsläufig, aber das hängt von Lebensstil, Alter, Sportniveau und Ernährungsqualität ab. Der Gentest kann zeigen, wo dein Körper auch ohne Veranlagung-Probleme einen erhöhten Bedarf hat (z. B. bei intensivem Sport).',
          },
        ],
      },
    ],
    documents: [
      {
        title: 'NovoAcademy FAQ PDF - Gesund ernähren nach den Genen',
        size: '121 KB',
        type: 'pdf',
        url: '/course-materials/nutrition/Novogenia_FAQ_Gesund_Ernaehren.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false,
  },

  {
    id: 'nut-sci',
    uid: 'f4672f05-a7e1-4d97-8d61-003f19227a9b',
    lang: 'de',
    category: 'Gesund ernähren nach den Genen',
    topic: 'Wissenschaftliche Basis',
    contentType: 'course',
    description: 'Wie Gene die optimale Ernährung jedes Menschen mitbestimmen — wissenschaftlich erklärt.',
    longDescription:
      'In dieser Schulung erklärt Dr. Daniel Wallerstorfer, warum Lebensmittel bei verschiedenen Menschen unterschiedlich gesund oder ungesund wirken. Du erfährst, welche genetischen Variationen die Verwertung von Nährstoffen, die Reaktion auf Salz, Koffein, Folsäure & Co. steuern und wie diese Erkenntnisse seriös in einer personalisierten Ernährungsberatung eingesetzt werden.',
    bullets: [
      'Genetische Variationen im Nährstoffstoffwechsel',
      'Warum dasselbe Lebensmittel verschieden wirkt',
      'Studienlage zur Nutrigenetik',
      'Praktische Umsetzung in der Beratung',
    ],
    thumbnail: '/thumbnails/course-nutrition.jpg',
    youtubeId: '79MPy6BFqu8',
    introQuestionsHeader: 'In dieser Schulung bekommst du Antworten auf folgende Fragen:',
    introQuestions: [
      'Warum sind manche Lebensmittel für die einen gesund, für die anderen ungesund?',
      'Welche Rolle spielen Gene wie MTHFR, CYP1A2 oder ACE bei der Nährstoffverwertung?',
      'Wie hängt Genetik mit Koffein-, Salz- und Folsäure-Empfindlichkeit zusammen?',
      'Welche praktischen Empfehlungen lassen sich daraus für den Kunden ableiten?',
    ],
    postVideoText:
      'Mit dem Verständnis dieser genetischen Grundlagen kannst du die Lebensmittelempfehlungen im Bericht fundiert mit deinen Kunden besprechen.',
    questions: [
      {
        q: 'Welches Gen baut Koffein im Körper ab?',
        options: ['MTHFR', 'CYP1A2', 'FTO', 'COMT'],
        correct: 1,
      },
      {
        q: 'Wie verändert eine gute (funktionierende) Variante des CYP1A2-Gens das Herzinfarkt-Risiko bei Kaffeekonsum laut Studie?',
        options: [
          'Risiko bleibt unverändert',
          'Risiko sinkt um etwa ein Drittel',
          'Risiko verdoppelt sich',
          'Risiko steigt um zwei Drittel',
        ],
        correct: 1,
      },
      {
        q: 'Wie verändert sich das Herzinfarkt-Risiko bei Kaffeekonsum bei defektem CYP1A2-Gen?',
        options: [
          'Risiko sinkt noch stärker',
          'Risiko bleibt gleich wie bei guter Variante',
          'Risiko steigt um etwa zwei Drittel',
          'Es gibt keinen Unterschied',
        ],
        correct: 2,
      },
      {
        q: 'Was ist eine sinnvolle Alternative für Menschen mit defektem Koffein-Abbau-Gen?',
        options: [
          'Mehr Kaffee trinken, um eine Toleranz aufzubauen',
          'Nur grünen Tee statt Kaffee',
          'Entkoffeinierten Kaffee (alle gesunden Stoffe ohne das Koffein)',
          'Komplett auf alle Heißgetränke verzichten',
        ],
        correct: 2,
      },
      {
        q: 'Welche Aufgabe hat das MTHFR-Gen?',
        options: [
          'Es baut Koffein ab',
          'Es aktiviert Folsäure zur biologisch wirksamen Form Methylfolat',
          'Es reguliert den Dopamin-Abbau',
          'Es bestimmt die Hautfarbe',
        ],
        correct: 1,
      },
      {
        q: 'Was kann ein Bluttest bei einem MTHFR-Defekt NICHT zeigen?',
        options: [
          'Den Folsäure-Spiegel im Blut',
          'Ob die Folsäure tatsächlich aktiviert wird und wirken kann',
          'Den Vitamin-D-Spiegel',
          'Die Eisenwerte',
        ],
        correct: 1,
      },
      {
        q: 'Welche Alternative empfiehlt sich bei einem MTHFR-Defekt?',
        options: [
          'Die doppelte Dosis normaler Folsäure',
          'Auf jede Folsäure-Supplementierung verzichten',
          'Direkt die aktive Form Methylfolat einnehmen',
          'Stattdessen Vitamin B12 supplementieren',
        ],
        correct: 2,
      },
      {
        q: 'Wie viele Gene werden in der Nutrition-Analyse insgesamt berücksichtigt?',
        options: ['Etwa 10', 'Etwa 25', 'Etwa 60', 'Mehr als 200'],
        correct: 2,
      },
      {
        q: 'Warum wird Vitamin C in den Mikrotransportern als Slow-Release ausgeschüttet?',
        options: [
          'Vitamin C wirkt nur in hohen Dosen',
          'Der Körper kann Vitamin C kaum speichern (Halbwertszeit ~30 Min) — über den Tag verteilte Freisetzung ahmt den natürlichen Nahrungs-Eintrag nach',
          'Vitamin C ist toxisch in höheren Mengen',
          'Vitamin C wird ohne Slow-Release gar nicht aufgenommen',
        ],
        correct: 1,
      },
      {
        q: 'Wie löst die Mikrotransporter-Technologie das Problem, dass Calcium und Zink sich gegenseitig in der Aufnahme blockieren?',
        options: [
          'Die beiden Nährstoffe werden nicht in dieselbe Tagesration aufgenommen',
          'Zink wird sofort freigesetzt, Calcium erst Stunden später an einer anderen Stelle im Darm — beide werden gleichzeitig eingenommen, aber zeitversetzt freigesetzt',
          'Es wird nur einer der beiden Nährstoffe verwendet',
          'Calcium und Zink werden chemisch zu einer neuen Substanz kombiniert',
        ],
        correct: 1,
      },
    ],
    documents: [
      {
        title: 'NovoAcademy Folien - Gesund ernähren nach den Genen',
        size: '78 MB',
        type: 'pptx',        thumbnail: '/thumbnails/pptx-template.jpg',

        url: 'https://github.com/Novogenia-AG/novo-academy/releases/download/course-materials/Schulungsfolien_Nutrition.pptx',
      },
      {
        title: 'NovoAcademy Demo Bericht - NovoDaily Nutrition Plan',
        size: '113 MB',
        type: 'pdf',
        url: 'https://github.com/Novogenia-AG/novo-academy/releases/download/course-materials/Demo_NovoDaily_Nutrition_Plan.pdf',
      },
      {
        title: 'NovoAcademy Demo Bericht - NovoDaily Lifestyle',
        size: '20 MB',
        type: 'pdf',
        url: '/course-materials/shared/Demo_NovoDaily_Lifestyle.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Koffein & CYP1A2-Genvariante',
        size: '244 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Caffeine_Review.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Folsäure & MTHFR-Aktivierung',
        size: '257 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Folic_Acid_Review.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Vitamin D & VDR-Gen',
        size: '368 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Vitamin_D_Review.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Laktose-Intoleranz — Genetik',
        size: '259 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Lactose_Review.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Kochsalz, Blutdruck & ACE-Gen',
        size: '309 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/NaCl_Salt_Review.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - HDL-Cholesterin & Omega-3',
        size: '255 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/HDL_Omega3_Review.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Homocystein & Herzgesundheit',
        size: '271 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Homocysteine_Review.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Eisenaufnahme & Genetik',
        size: '337 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Iron_Review.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Selen-Bedarf',
        size: '231 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Selenium_Review.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    /* DEMO: this course shows as already certified in the initial state. */
    initialWatched: true, initialTestPassed: true, initialTestScore: 87,
  },

  /* ===== Gesund ernähren — Beratungsschulung ===== */
  {
    id: 'nut-report',
    uid: 'da894277-598c-49f9-9677-60dcc4517e45',
    lang: 'de',
    category: 'Gesund ernähren nach den Genen',
    topic: 'Beratungsschulung',
    contentType: 'course',
    description: 'Den genetischen Ernährungsbericht Kapitel für Kapitel mit dem Kunden durchgehen.',
    longDescription:
      'In dieser Beratungsschulung erklärt Dr. Daniel Wallerstorfer Kapitel für Kapitel, wie du den genetischen Ernährungs-Bericht kompetent mit deinen Kunden besprichst. Vom Aufbau des Berichts über einzelne Nährstoffe (Vitamin D3, Folsäure, Eisen, Selen, Q10 etc.) bis hin zu Stoffwechsel-, Cholesterin- und Triglycerid-Themen — alle Kapitel des Berichts werden Schritt für Schritt durchgegangen.',
    bullets: [
      'Den Ernährungsbericht Kapitel für Kapitel mit dem Kunden durchgehen',
      'Verschiedene Genvarianten (Vitamin D3, Folsäure, Eisen, Selen, Kaffee, Q10 etc.) verständlich erklären',
      'Wirkung auf Cholesterin, Triglyceride, Blutdruck & Homocystein einordnen',
      'Personalisierte Lebensmittel-Empfehlungen verständlich vermitteln',
    ],
    thumbnail: '/thumbnails/nut-report-cover.jpg',
    introQuestionsHeader: 'In dieser Schulung lernst du:',
    introQuestions: [
      'Wie der Ernährungs-Bericht aufgebaut ist',
      'Wie du die wichtigsten Nährstoff-Empfindlichkeiten verständlich erklärst',
      'Wie Gene Cholesterin, Triglyceride, Blutdruck und Homocystein beeinflussen',
      'Wie du die Lebensmittel-Empfehlungen praxisnah übersetzt',
    ],
    brandNoticeAboveVideos: true,
    /* 16 Schulungsvideo-Kapitel zur Analyseberatung (Ernährung).
       Auswahl: ANALYSEBERATUNG Teil 15–26, 29, 30, 34, 36 — Titel ohne Prefix/Nummer. */
    videoSegments: [
      { title: 'Ernährungspyramide', youtubeId: 'yJVPSaCRzK0' },
      { title: 'Wirkung von Omega 3 auf HDL Cholesterin', youtubeId: 'iFTT92_LcmE' },
      { title: 'Wirkung von Folsäure', youtubeId: '9tfrd5NqfHA' },
      { title: 'Herz Schutz vor Homocystein', youtubeId: 'TT0PxT6Wc0o' },
      { title: 'Kochsalz und Blutdruck', youtubeId: 'rwWy2OZb6Cc' },
      { title: 'Wirkung von Vitamin D3', youtubeId: 'Fzc80j4IpM0' },
      { title: 'Gene, Laktose und Kalzium', youtubeId: 'aMj4OQWp-iI' },
      { title: 'Regulierung von LDL Cholesterin', youtubeId: 'g7kP9S66Wbo' },
      { title: 'Regulierung von Triglyceriden', youtubeId: 'hUFY050zS7k' },
      { title: 'Eisenaufnahme — die richtige Menge', youtubeId: 'jk1N2MDyasY' },
      { title: 'Wirkung von Kaffee und Koffein', youtubeId: '6qNiJE9BYkc' },
      { title: 'Coenzym Q10: das Anti-Aging Molekül', youtubeId: 'LdQ7zCN9HL4' },
      { title: 'Alterungsschutz vor oxidativem Stress', youtubeId: 'mHwTrHigqQ8' },
      { title: 'Ausreichende Selenversorgung', youtubeId: '99hQc17CnVo' },
      { title: 'Zusätzliche Gene', youtubeId: '5DgFZxCtZd0' },
      { title: 'Lebensmittel nach deinem individuellen Bedarf', youtubeId: '7c7kMeZxEjk' },
    ],
    postVideoText:
      'Mit dieser Schulung bist du bereit, den genetischen Ernährungs-Bericht souverän mit deinen Kunden durchzugehen. Die folgenden Demo-Booklets kannst du als Beispiel-Berichte für deine eigene Beratungspraxis verwenden.',
    documents: [
      {
        title: 'NovoAcademy Demo Bericht - NovoDaily Nutrition Plan',
        size: '113 MB',
        type: 'pdf',
        url: 'https://github.com/Novogenia-AG/novo-academy/releases/download/course-materials/Demo_NovoDaily_Nutrition_Plan.pdf',
      },
      {
        title: 'NovoAcademy Demo Bericht - NovoDaily Lifestyle',
        size: '20 MB',
        type: 'pdf',
        url: '/course-materials/shared/Demo_NovoDaily_Lifestyle.pdf',
      },
    ],
    questions: [
      {
        q: 'Ein Kunde baut Koffein genetisch langsam ab (CYP1A2-Defekt) und fragt, ob er Kaffee komplett streichen muss. Was antwortest du?',
        options: [
          'Ja, Kaffee ist ab sofort in jeder Form verboten',
          'Entkoffeinierter Kaffee ist eine gute Alternative — die schützenden Polyphenole bleiben erhalten, ohne die verlängerte Koffein-Belastung',
          'Fünf Tassen täglich trinken, damit sich eine Toleranz aufbaut',
          'Nur schwarzer Tee ist erlaubt, alles andere nicht',
        ],
        correct: 1,
      },
      {
        q: 'Wie erklärst du einem Kunden mit VDR-Variante die Vitamin-D-Empfehlung?',
        options: [
          'Vitamin D wirkt bei allen Menschen gleich, die Variante spielt keine Rolle',
          'Die VDR-Variante verändert, wie stark die Zellen auf vorhandenes Vitamin D ansprechen — auch bei „normalem" Blutwert kann die Wirkung schwächer ausfallen',
          'Vitamin D sollte er wegen der Variante lieber ganz meiden',
          'Nur Sonnenlicht hilft ihm, Präparate wirken bei ihm nicht',
        ],
        correct: 1,
      },
      {
        q: 'Welche Ernährungsempfehlung passt zu einem Kunden mit HFE-Defekt (Risiko für Eisenüberladung)?',
        options: [
          'Die Eisenzufuhr erhöhen, er braucht mehr davon',
          'Die Eisenlast senken: weniger rotes Fleisch, keine eisenangereicherten Präparate ohne nachgewiesenen Mangel — überschüssiges Eisen lagert sich über Jahre in Leber, Herz und Gelenken ab',
          'Vorsorglich täglich ein Eisenpräparat einnehmen',
          'Nichts ändern, der Körper reguliert das von allein',
        ],
        correct: 1,
      },
      {
        q: 'Eine Kundin mit MTHFR-Variante nimmt ein normales Folsäure-Präparat. Was rätst du ihr?',
        options: [
          'Weiter wie bisher, die Variante ändert nichts an der Wirkung',
          'Auf Methylfolat umsteigen — die bereits aktivierte Form. Bei einem MTHFR-Defekt wird gewöhnliche Folsäure schlecht aktiviert, der Blutspiegel kann trotzdem normal aussehen',
          'Folsäure vollständig absetzen',
          'Die Dosis der normalen Folsäure einfach verdoppeln',
        ],
        correct: 1,
      },
      {
        q: 'Wie ordnest du die Salz-Empfehlung bei einem salzsensitiven Kunden (ACE-Variante) ein?',
        options: [
          'Salz spielt keine Rolle, die Empfehlung ist für alle gleich',
          'Salzsensitivität ist genetisch bedingt: Bei dieser Variante hebt Salz den Blutdruck messbar stärker an als im Durchschnitt — Salz zu reduzieren ist bei ihm ein besonders wirksamer Hebel',
          'Er sollte zusätzlich salzen, das stabilisiert den Blutdruck',
          'Nur Zucker vermeiden, Salz ist unkritisch',
        ],
        correct: 1,
      },
      {
        q: 'Ein Kunde ist enttäuscht, weil ein Lieblingsgericht in seiner Lebensmittelliste ungünstig bewertet ist. Wie gehst du damit um?',
        options: [
          'Ihm sagen, dass er dieses Gericht nie wieder essen darf',
          'Erklären, dass die Liste eine langfristige Orientierung ist — gelegentlicher Genuss ist unproblematisch, entscheidend ist die Balance über Wochen und Monate, nicht Perfektion an einem Tag',
          'Die Bewertung als Messfehler abtun',
          'Ihm empfehlen, den Bericht zu ignorieren',
        ],
        correct: 1,
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false, initialTestPassed: false,
  },

  {
    id: 'pg-faq',
    uid: '03accd4d-255f-4208-8d99-fb162f618bfc',
    lang: 'de',
    category: 'Sportliche Leistung',
    topic: 'Häufige Fragen',
    contentType: 'faq',
    description: 'Antworten auf typische Kundenfragen zur genetischen Performance-Analyse.',
    longDescription:
      'Eine Sammlung der wichtigsten Fragen zu Genetik im Sport — Talent, Verletzungsrisiko, Trainingssteuerung. Mit ausklappbarer Antwort zum Selbsttest.',
    bullets: [
      'Talent vs. Training — was ist genetisch bedingt?',
      'Verletzungsrisiko und Bindegewebs-Gene',
      'Regeneration und Ernährung',
      'Trainingssteuerung nach Genotyp',
    ],
    thumbnail: '/thumbnails/pg-faq-cover.jpg',
    faqGroups: [
      {
        title: 'Talent & Genetik im Sport',
        items: [
          {
            q: 'Wie groß ist der Einfluss der Gene auf sportliche Leistung?',
            a: 'Schätzungen variieren zwischen 30 und 70 %, je nach Disziplin. Talent (Schnellkraft-Fasern, VO₂max-Potenzial, Bindegewebsstabilität) ist überwiegend genetisch festgelegt; die Trainings-Antwort selbst — also wie stark der Körper auf einen Reiz reagiert — variiert ebenfalls genetisch um den Faktor 2 bis 3.',
          },
          {
            q: 'Was ist der Unterschied zwischen Muskelvolumen und Muskelkraft?',
            a: 'Volumen heißt mehr Masse (Bodybuilder-Ziel) — Training mit 6–12 Wiederholungen. Kraft heißt mehr Leistung bei weniger Masse — Training mit 1–6 Wiederholungen schwere Lasten. Beide Trainings-Ziele erfordern unterschiedliche Strategien und unterschiedliche Pausen.',
          },
          {
            q: 'Bin ich mit „schlechten" Genen verloren — kann ich kein erfolgreicher Sportler werden?',
            a: 'Nein. Genetik bestimmt das Talent, aber Training, Konsequenz und richtige Strategie machen den entscheidenden Unterschied. Wer seine genetischen Schwachstellen kennt, kann gezielt gegensteuern (z. B. mit antioxidativer Ernährung, längeren Pausen, gezielter Aufwärmung).',
          },
        ],
      },
      {
        title: 'Regeneration & Verletzungsrisiko',
        items: [
          {
            q: 'Warum erholt sich nicht jeder gleich schnell?',
            a: 'Zwei genetische Faktoren spielen eine Hauptrolle: Schutzgene gegen oxidativen Stress (freie Radikale) und Gene, die die Aggressivität des Immunsystems bei Muskelschäden steuern. Bei defekten Schutzgenen brauchst du längere Pausen oder gezielt entzündungshemmende Nährstoffe (Omega-3, MSM, Vitamin E, C).',
          },
          {
            q: 'Wie aussagekräftig ist das genetische Verletzungs-Risiko?',
            a: 'Die COL5A1-Studie zeigte: Spieler mit defektem Gen spielten 28 % weniger Spiele wegen Verletzungen. Ein einziger Gendefekt kann also nachweislich 30 % der Karriere kosten. Die Vorbeugung (gezieltes Aufwärmen, Sehnen-Training, Ernährung) ist daher essenziell.',
          },
          {
            q: 'Soll ich bei Muskelkater trainieren?',
            a: 'Nein. Muskeln wachsen außerhalb des Studios, nicht während des Trainings. Beim Training entstehen die Mikrorisse, in der Regenerationsphase werden sie verstärkt wieder aufgebaut. Wer mit Muskelkater trainiert, verkürzt diese Aufbauphase. Mit richtiger Ernährung und Supplementen lässt sich die Muskelkater-Dauer verkürzen.',
          },
        ],
      },
      {
        title: 'Ernährung & Supplemente',
        items: [
          {
            q: 'Welche Proteinquelle ist am besten für Muskelaufbau?',
            a: 'Tierische Quellen liefern ein günstigeres Aminosäure-Verhältnis (Schweinefleisch ~96 % Match zum menschlichen Muskel, Hühnerfleisch etwas niedriger). Pflanzliche Quellen wie Algenprotein können Aminosäuren wie Tryptophan komplett fehlen — daher müssen Veganer/Vegetarier entweder mehr (ca. +10 %) oder verschiedene Quellen kombinieren.',
          },
          {
            q: 'Wie viele Mahlzeiten pro Tag sind optimal?',
            a: 'Vier gleichmäßig verteilte Mahlzeiten — der Körper kann Aminosäuren nicht speichern, daher braucht der Muskel kontinuierlich Bausteine. Eine einzelne große Mahlzeit pro Tag ist suboptimal für Muskelwachstum.',
          },
          {
            q: 'Was sind „Entladungs-Wochen" und wie oft sollte ich sie einplanen?',
            a: 'Eine Entladungswoche bedeutet sanfteres Training (z. B. erste Trainingseinheit mit halbem Gewicht, zweite mit zwei Dritteln). Sie gibt deinem Körper Zeit für Reparatur und psychischer Erholung. Empfohlen alle ~5 Wochen, abhängig von genetischer Regenerations- und Stress-Veranlagung.',
          },
        ],
      },
    ],
    documents: [
      {
        title: 'NovoAcademy FAQ PDF - Sportliche Leistung',
        size: '120 KB',
        type: 'pdf',
        url: '/course-materials/performance/Novogenia_FAQ_Sportliche_Leistung.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false,
  },

  {
    id: 'pg-sci',
    uid: '030ea826-ba9d-4f0f-8a70-10559db73654',
    lang: 'de',
    category: 'Sportliche Leistung',
    topic: 'Wissenschaftliche Basis',
    contentType: 'course',
    description: 'Welche Gene sportliche Leistung, Regeneration und Verletzungsrisiko mitbestimmen.',
    longDescription:
      'Diese Schulung erklärt die wissenschaftliche Grundlage hinter der Performance-Genetik. Du lernst, welche Gene den Sportler-Typ (Sprint vs. Ausdauer), das Bindegewebs-Risiko und die Regenerationsfähigkeit beeinflussen, und wie sich aus diesen Faktoren ein individuelles Trainings-Profil ableiten lässt.',
    bullets: [
      'Schnellkraft- vs. Ausdauer-Gene (ACTN3 & Co.)',
      'Bindegewebs-Gene und Verletzungsrisiko',
      'Genetik der Regeneration',
      'Talent vs. Training — was sagt die Forschung?',
    ],
    thumbnail: '/thumbnails/course-performance.jpg',
    youtubeId: 'GyIfKaYmLoE',
    introQuestionsHeader: 'In dieser Schulung bekommst du Antworten auf folgende Fragen:',
    introQuestions: [
      'Welche genetischen Faktoren beeinflussen sportliche Leistung?',
      'Wer ist genetisch Sprinter, wer Ausdauer-Typ — und warum?',
      'Wie hängt Genetik mit Verletzungsrisiko und Regeneration zusammen?',
      'Wie nutzt du diese Daten für Coaching und Trainingsplanung?',
    ],
    postVideoText:
      'Mit dieser Grundlage kannst du den Performance-Report deiner Kunden fachlich fundiert besprechen.',
    questions: [
      {
        q: 'Wie viel Prozent des eingeatmeten Sauerstoffs wird zu freien Radikalen umgewandelt?',
        options: ['Etwa 1 %', 'Etwa 5 %', 'Etwa 10 %', 'Etwa 20 %'],
        correct: 1,
      },
      {
        q: 'Welche Nährstoffe wirken antientzündlich und unterstützen die Regeneration?',
        options: [
          'Arachidonsäure und Glutamat',
          'Omega-3 und MSM (organischer Schwefel)',
          'Koffein und Theobromin',
          'Zucker und Fruchtzucker',
        ],
        correct: 1,
      },
      {
        q: 'Was zeigte die Studie zum COL5A1-Gen bei 289 Fußballspielen?',
        options: [
          'Genvarianten hatten keinen Einfluss auf die Verletzungshäufigkeit',
          'Spieler mit defektem Gen spielten ~28 % weniger Spiele aufgrund von Verletzungen',
          'Spieler mit defektem Gen verletzten sich häufiger, fielen aber nicht aus',
          'Spieler mit gutem Gen waren häufiger verletzt',
        ],
        correct: 1,
      },
      {
        q: 'Welches Verhältnis von Fettsorten empfiehlt das Programm für Sportler?',
        options: [
          '50 % gesättigt, 25 % einfach ungesättigt, 25 % mehrfach ungesättigt',
          '10 % gesättigt, 80 % einfach ungesättigt, 10 % mehrfach ungesättigt',
          '80 % gesättigt, 10 % einfach ungesättigt, 10 % mehrfach ungesättigt',
          'Fett sollte komplett gemieden werden',
        ],
        correct: 1,
      },
      {
        q: 'Wie hoch ist der „Aminosäure-Match" von Schweinefleisch zum menschlichen Muskel?',
        options: ['etwa 40 %', 'etwa 68 %', 'etwa 96 %', 'etwa 100 %'],
        correct: 2,
      },
      {
        q: 'Wie viele Mahlzeiten pro Tag sind laut Studien optimal für Muskelaufbau?',
        options: [
          '1 Mahlzeit (Intervallfasten)',
          '2 Mahlzeiten',
          '4 gleichmäßig verteilte Mahlzeiten',
          '8 oder mehr',
        ],
        correct: 2,
      },
      {
        q: 'Wie viele Wiederholungen pro Satz werden für maximales Muskelvolumen empfohlen?',
        options: ['1 bis 6', '6 bis 12', '15 bis 20', '50 oder mehr'],
        correct: 1,
      },
      {
        q: 'Wie viele Wiederholungen werden für maximale Muskelkraft empfohlen?',
        options: ['1 bis 6', '6 bis 12', '15 bis 20', '30 oder mehr'],
        correct: 0,
      },
      {
        q: 'Welcher Kalorienüberschuss wird für maximalen Muskelmassen-Aufbau empfohlen?',
        options: [
          '0 % (Erhaltungsbedarf)',
          'Etwa 10 % Überschuss',
          'Etwa 50 % Überschuss',
          'Mindestens 100 % Überschuss',
        ],
        correct: 1,
      },
      {
        q: 'Was bedeutet „Entladung" (Deload) und wie oft sollte sie stattfinden?',
        options: [
          'Ein Tag komplette Pause — jede Woche',
          'Eine Woche mit sanfterem Training — typischerweise alle ~5 Wochen, abhängig von genetischer Regenerations- und Stress-Veranlagung',
          'Ein Monat ohne Training — einmal pro Jahr',
          'Die letzten 3 Wiederholungen weglassen — bei jedem Satz',
        ],
        correct: 1,
      },
    ],
    documents: [
      {
        title: 'NovoAcademy Folien - Sportliche Leistung',
        size: '194 MB',
        type: 'pptx',        thumbnail: '/thumbnails/pptx-template.jpg',

        url: 'https://github.com/Novogenia-AG/novo-academy/releases/download/course-materials/Schulungsfolien_Performance.pptx',
      },
      {
        title: 'NovoAcademy Demo Bericht - Performance Sensor',
        size: '37 MB',
        type: 'pdf',
        url: '/course-materials/performance/Demo_Performance_Sensor.pdf',
      },
      {
        title: 'NovoAcademy Demo Bericht - Performance Trainingsplan',
        size: '73 MB',
        type: 'pdf',
        url: 'https://github.com/Novogenia-AG/novo-academy/releases/download/course-materials/Demo_Performance_Trainingsplan.pdf',
      },
      {
        title: 'NovoAcademy Demo Bericht - Nutrition Plan (Performance)',
        size: '10 MB',
        type: 'pdf',
        url: '/course-materials/performance/Demo_Nutrition_Plan_Performance.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Freie Radikale & oxidativer Stress beim Sport',
        size: '289 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Free_Radicals_Review.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    /* DEMO: this course shows as already certified in the initial state. */
    initialWatched: true, initialTestPassed: true, initialTestScore: 100,
  },
  /* ===== Entgiftung — Wissenschaftliche Basis ===== */
  {
    id: 'tx-sci',
    uid: '43dad729-b5fe-451e-a40a-7657948075e9',
    lang: 'de',
    category: 'Entgiftung',
    topic: 'Wissenschaftliche Basis',
    contentType: 'course',
    description: 'Wie Gene die individuelle Entgiftungsfähigkeit bestimmen — von Verkohltem über Chemikalien bis Alkohol und Schwermetalle.',
    longDescription:
      'In dieser Schulung erklärt Dr. Daniel Wallerstorfer die genetischen Grundlagen der Entgiftung. Welche Gene neutralisieren krebserregende Stoffe aus Verbranntem und Geräuchertem? Wie schützen Glutathion-S-Transferasen vor Chemikalien? Welche Rolle spielt Selen, und warum reagiert nicht jeder Mensch gleich auf Alkohol? Du lernst die wichtigsten Detox-Gene kennen und wie sich daraus konkrete Lebensstil-Empfehlungen ableiten lassen.',
    bullets: [
      'Entgiftung von Verbranntem (CYP1A1, NAT2)',
      'Chemikalien-Entgiftung & Glutathion-S-Transferasen (GST)',
      'Antioxidativer Schutz und Selenversorgung',
      'Alkohol- und Acetaldehyd-Abbau (ADH, ALDH2)',
    ],
    thumbnail: T(27),
    youtubeId: '3AvZMAtALlQ',
    introQuestionsHeader: 'In dieser Schulung bekommst du Antworten auf folgende Fragen:',
    introQuestions: [
      'Welche Gene steuern die Entgiftung verbrannter Stoffe (Verkohltes, Geräuchertes)?',
      'Wie wirken Glutathion-S-Transferasen bei der Chemikalien-Entgiftung?',
      'Welche Rolle spielt Selen für den Schutz vor oxidativem Stress?',
      'Wie unterscheidet sich der genetische Alkohol-Abbau bei verschiedenen Menschen?',
    ],
    postVideoText:
      'Mit diesem wissenschaftlichen Hintergrund kannst du den Entgiftungs-Bericht fundiert mit deinen Kunden besprechen und individuelle Schutzstrategien aus den genetischen Ergebnissen ableiten.',
    questions: [
      {
        q: 'Welche Genfamilie ist zentral für die Entgiftung von Chemikalien und Schwermetallen?',
        options: [
          'GST (Glutathion-S-Transferasen)',
          'MTHFR (Folsäure-Aktivierung)',
          'LCT (Laktase)',
          'CYP1A2 (Koffein-Abbau)',
        ],
        correct: 0,
      },
      {
        q: 'Bei Verbranntem und Geräuchertem entstehen krebserregende PAK (polyzyklische aromatische Kohlenwasserstoffe). Welche Aussage zur Entgiftung ist korrekt?',
        options: [
          'PAK können vom Körper nicht abgebaut werden',
          'Die Entgiftung dieser Stoffe ist genetisch sehr unterschiedlich — Menschen mit langsamen oder ungünstigen Varianten haben ein deutlich erhöhtes Krebsrisiko bei häufigem Konsum von Verkohltem',
          'Alle Menschen entgiften PAK gleich schnell',
          'PAK werden nur über die Haut ausgeschieden',
        ],
        correct: 1,
      },
      {
        q: 'Eine Kundin hat einen genetischen GST-Defekt (Glutathion-S-Transferase-Mangel). Was bedeutet das?',
        options: [
          'Sie kann besser entgiften als der Durchschnitt',
          'Ihre Fähigkeit, Chemikalien aus der Umwelt (Pestizide, Lösungsmittel, Zigarettenrauch) zu neutralisieren, ist reduziert — sie sollte Belastungen aktiver vermeiden und antioxidative Nährstoffe stärker zuführen',
          'Der Defekt hat keinen praktischen Effekt',
          'Sie sollte mehr Koffein konsumieren',
        ],
        correct: 1,
      },
      {
        q: 'Welche Rolle spielt Selen im antioxidativen Schutzsystem?',
        options: [
          'Es bindet Schwermetalle direkt im Blut',
          'Es ist nur ein kosmetisches Spurenelement ohne klare Funktion',
          'Selen ist essenzieller Baustein der Glutathion-Peroxidase (GPX), eines der wichtigsten antioxidativen Enzyme — bei Selen-Mangel funktioniert dieses Schutzsystem schlechter, oxidativer Stress steigt',
          'Selen ist für die Knochengesundheit zuständig',
        ],
        correct: 2,
      },
      {
        q: 'Warum verträgt nicht jeder Mensch gleich viel Alkohol?',
        options: [
          'Der einzige Faktor ist das Körpergewicht',
          'Die Gene ADH (Alkohol-Abbau zu Acetaldehyd) und ALDH2 (Acetaldehyd-Abbau zu Essigsäure) sind genetisch sehr unterschiedlich. Bei ALDH2-Defekt — z. B. häufig in asiatischen Populationen — sammelt sich das giftige Acetaldehyd an: Flush, Übelkeit, deutlich erhöhtes Krebsrisiko bei chronischem Konsum',
          'Frauen und Männer entgiften Alkohol exakt gleich',
          'Alkohol wird von allen Menschen über die Atmung abgebaut',
        ],
        correct: 1,
      },
      {
        q: 'Eine Kundin hat mehrere „rote Bereiche" im Entgiftungs-Bericht. Welche Beratungs-Empfehlung passt am besten?',
        options: [
          'Veranlagung ignorieren — die Entgiftung läuft autonom',
          'Sie soll komplett auf Ernährung verzichten, bis sich die Werte normalisieren',
          'Die genetische Belastung lässt sich nicht vollständig korrigieren, aber gezielt ausgleichen: Vermeidung der spezifischen Belastungen (z. B. weniger Verkohltes, sauberes Wohn-Umfeld), antioxidative Ernährung (Vitamin C/E, Selen, Glutathion-Vorstufen), keine Raucher-Exposition, regelmäßige Sport-Routine zur Schweißausscheidung',
          'Sofort einen Arzt aufsuchen — die Veranlagung ist krankheitswertig',
        ],
        correct: 2,
      },
    ],
    documents: [
      {
        title: 'NovoAcademy Folien - Entgiftung',
        size: '78 MB',
        type: 'pptx',
        thumbnail: '/thumbnails/pptx-template.jpg',
        url: 'https://github.com/Novogenia-AG/novo-academy/releases/download/course-materials/Schulungsfolien_Detox.pptx',
      },
      {
        title: 'NovoAcademy Demo Bericht - NovoDaily Lifestyle',
        size: '20 MB',
        type: 'pdf',
        url: '/course-materials/shared/Demo_NovoDaily_Lifestyle.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Genetische Entgiftung — Übersicht',
        size: '264 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Detoxification_Review.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Chemikalien-Entgiftung & GST-Genvarianten',
        size: '281 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Chemicals_Detox_Review.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Oxidativer Stress & antioxidative Genetik',
        size: '348 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Oxidative_Stress_Review.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Selen-Bedarf & Schutzfunktion',
        size: '231 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Selenium_Review.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false, initialTestPassed: false,
  },
  /* ===== Entgiftung — Beratungsschulung ===== */
  {
    id: 'tx-report',
    uid: 'f2494fc0-d69d-4a22-bc6e-d9fb99d5e473',
    lang: 'de',
    category: 'Entgiftung',
    topic: 'Beratungsschulung',
    contentType: 'course',
    description: 'Den genetischen Entgiftungs-Bericht Kapitel für Kapitel mit dem Kunden durchgehen.',
    longDescription:
      'In dieser Beratungsschulung erklärt Dr. Daniel Wallerstorfer Kapitel für Kapitel, wie du den genetischen Entgiftungs-Bericht kompetent mit deinen Kunden besprichst. Von der Entgiftung verbrannter Stoffe und Chemikalien über Alterungsschutz und Selenversorgung bis zur Verarbeitung von Alkohol und Drogen.',
    bullets: [
      'Den Entgiftungs-Bericht Kapitel für Kapitel mit dem Kunden durchgehen',
      'Entgiftung von Verbranntem & Chemikalien verständlich erklären',
      'Alterungsschutz vor oxidativem Stress einordnen',
      'Selenversorgung und Alkohol-/Drogen-Verarbeitung beraten',
    ],
    thumbnail: '/thumbnails/tx-report-cover.jpg',
    introQuestionsHeader: 'In dieser Schulung lernst du:',
    introQuestions: [
      'Wie der Entgiftungs-Bericht aufgebaut ist',
      'Welche Gene die Entgiftung von Verbranntem und Chemikalien steuern',
      'Wie oxidativer Stress den Alterungsprozess beeinflusst',
      'Welche Empfehlungen sich für Selenversorgung, Alkohol und Drogen ergeben',
    ],
    brandNoticeAboveVideos: true,
    videoSegments: [
      { title: 'Entgiftung von Verbranntem', youtubeId: 'Rk3QF7UwjQo' },
      { title: 'Entgiftung von Chemikalien', youtubeId: 'uXM2kEWR7LM' },
      { title: 'Alterungsschutz vor oxidativem Stress', youtubeId: 'mHwTrHigqQ8' },
      { title: 'Ausreichende Selenversorgung', youtubeId: '99hQc17CnVo' },
      { title: 'Alkohol und Drogen', youtubeId: 'zo5L2VwFxuc' },
    ],
    postVideoText:
      'Mit dieser Schulung bist du bereit, den Entgiftungs-Bericht souverän mit deinen Kunden durchzugehen. Das folgende Demo-Booklet kannst du als Beispiel-Bericht für deine eigene Beratungspraxis verwenden.',
    documents: [
      {
        title: 'NovoAcademy Demo Bericht - NovoDaily Lifestyle',
        size: '20 MB',
        type: 'pdf',
        url: '/course-materials/shared/Demo_NovoDaily_Lifestyle.pdf',
      },
    ],
    questions: [
      {
        q: 'Ein Kunde grillt gern scharf angebratenes Fleisch. Sein Entgiftungs-Bericht zeigt einen langsamen Abbau polyzyklischer aromatischer Kohlenwasserstoffe (PAK). Was empfiehlst du?',
        options: [
          'Kein Problem, er kann so viel Verbranntes essen wie er möchte',
          'Verbranntes, stark Angeröstetes und Geräuchertes reduzieren, schonendere Garmethoden bevorzugen und die Mahlzeiten mit antioxidantienreichem Gemüse kombinieren',
          'Komplett auf Rohkost umstellen',
          'Mehr Verbranntes essen, damit sich das Enzym trainiert',
        ],
        correct: 1,
      },
      {
        q: 'Bei einem Kunden ist die GPX-Aktivität reduziert (selenabhängige antioxidative Abwehr). Was passt am besten?',
        options: [
          'Die Selenzufuhr komplett ignorieren',
          'Gezielte Selenversorgung im physiologischen Bereich (etwa 50–100 µg pro Tag, z. B. als Selenomethionin) plus antioxidantienreiche Ernährung',
          'Hochdosiertes Selen mit 500 µg und mehr pro Tag',
          'Nur Vitamin C geben, Selen ist überflüssig',
        ],
        correct: 1,
      },
      {
        q: 'Wie erklärst du eine „rote Zone" im Kapitel zur Chemikalien-Entgiftung (GST-Defekt)?',
        options: [
          'Der Kunde ist gegen alle Chemikalien allergisch',
          'Sein Körper neutralisiert Umweltchemikalien weniger effizient als der Durchschnitt — sinnvoll sind praktische Maßnahmen zur Verringerung der Belastung und eine gute antioxidative Versorgung. Es ist ein Hinweis, keine Diagnose',
          'Es handelt sich um einen Laborfehler',
          'Er sollte vorsichtshalber alle Lebensmittel meiden',
        ],
        correct: 1,
      },
      {
        q: 'Ein Kunde zeigt einen ALDH2-Defekt. Was ist der zentrale Punkt im Beratungsgespräch?',
        options: [
          'Mehr Alkohol trinken, damit sich der Körper anpasst',
          'Acetaldehyd — ein bekanntes Karzinogen — reichert sich an. Schon regelmäßiger moderater Alkoholkonsum erhöht das Langzeitrisiko deutlich',
          'Der Befund ist ohne praktische Bedeutung',
          'Nur Zucker meiden, Alkohol ist unkritisch',
        ],
        correct: 1,
      },
      {
        q: 'Wie rahmst du den Entgiftungs-Bericht insgesamt für den Kunden ein?',
        options: [
          'Als Urteil — die Gene bestimmen sein Schicksal',
          'Als Landkarte — der Bericht zeigt, wo das System schwächer ist, sodass sich Belastungen gezielt senken und die antioxidative Versorgung gezielt stärken lassen',
          'Als belanglos, weil Entgiftung ohnehin von allein läuft',
          'Als medizinische Diagnose, die sofort behandelt werden muss',
        ],
        correct: 1,
      },
      {
        q: 'Warum ist die antioxidative Versorgung bei genetisch geschwächter Radikalabwehr besonders wichtig?',
        options: [
          'Weil Antioxidantien den Gendefekt selbst reparieren',
          'Weil freie Radikale bei schwächerer körpereigener Abwehr länger wirken können — Antioxidantien aus der Nahrung fangen sie ab, bevor sie Zellen schädigen',
          'Weil sie den Bedarf an Schlaf ersetzen',
          'Weil sie den Alkoholabbau beschleunigen',
        ],
        correct: 1,
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false, initialTestPassed: false,
  },
  {
    id: 'bo-faq',
    uid: 'f2ba580f-942d-4a4f-84ab-dc61cfe027f6',
    lang: 'de',
    category: 'Burnout und Stress',
    topic: 'Häufige Fragen',
    contentType: 'faq',
    description: 'Antworten auf typische Kundenfragen zur genetischen Stress- und Burnout-Analyse.',
    longDescription:
      'Eine Sammlung der wichtigsten Fragen zur Burnout-Analyse. Mit ausklappbarer Antwort zum Selbsttest.',
    bullets: [
      'Was bedeutet meine genetische Stress-Veranlagung?',
      'Das COMT-Gen und der Dopamin-Abbau',
      'Welche Lebensstil-Maßnahmen wirklich helfen',
      'Wann ist genetisch bedingte Anfälligkeit ein Problem?',
    ],
    thumbnail: '/thumbnails/bo-faq-cover.jpg',
    faqGroups: [
      {
        title: 'Genetik & Stress',
        items: [
          {
            q: 'Warum verarbeiten Menschen denselben Stress unterschiedlich?',
            a: 'Hauptverantwortlich ist das COMT-Gen — es baut den Botenstoff Dopamin nach Erregungssituationen ab. Bei gut funktionierender Variante kommt das Gehirn schnell wieder ins Gleichgewicht; bei defekter Variante bleibt der erhöhte Dopamin-Spiegel länger bestehen, das Gehirn bleibt erregt und kommt bei wiederholtem Stress nicht mehr in die Basis zurück.',
          },
          {
            q: 'Welche drei genetischen Eigenschaften werden konkret im Bericht ausgewertet?',
            a: 'Erstens: Leistung unter Stress (können wir gut oder schlecht unter Druck performen?). Zweitens: emotionale Belastbarkeit (wie sehr drücken uns negative Gefühle nieder?). Drittens: Impulsivität (handeln wir spontan oder überlegt?). Alle drei zusammen ergeben das individuelle Stress-Profil.',
          },
          {
            q: 'Wie viele Menschen sind genetisch besonders anfällig für Burnout?',
            a: 'Etwa 15 % haben zwei defekte COMT-Varianten und sind dadurch deutlich stress-anfälliger. Etwa 40 % haben zwei gut funktionierende Varianten und sind robust. Die restlichen ~45 % liegen dazwischen mit einer defekten und einer guten Kopie.',
          },
        ],
      },
      {
        title: 'Warrior vs. Worrier — der COMT-Effekt',
        items: [
          {
            q: 'Stimmt es, dass langsame Dopamin-Verwerter auch positive Vorteile haben?',
            a: 'Ja. Im Alltag erleben sie Aufregung und Freude intensiver, sind neugieriger und probierfreudiger. Der Nachteil zeigt sich erst bei wiederholtem Stress — dann kommt das Gehirn nicht zurück in die Basis. Diese Menschen sind auch eher anfällig für Glücksspiel-Sucht, weil "Kicks" für sie stärker wirken.',
          },
          {
            q: 'Was bedeutet ein „roter Bereich" in der Burnout-Auswertung?',
            a: 'Roter Bereich = ungünstige genetische Veranlagung in diesem Aspekt. Die Person ist eher burnout-gefährdet — Lebensstil-Maßnahmen sind besonders wichtig.',
          },
        ],
      },
      {
        title: 'Was kann ich tun?',
        items: [
          {
            q: 'Bin ich genetisch verurteilt, ein Burnout zu bekommen?',
            a: 'Nein. Die Veranlagung erhöht das Risiko, ist aber kein Schicksal. Wer seine Stress-Empfindlichkeit kennt, kann gezielt gegensteuern — durch Meditation, stressarme Lebensführung, ausreichend Schlaf, Bewegung und gezielte Ernährung. Je ungünstiger die Genetik, desto wichtiger sind diese Maßnahmen.',
          },
          {
            q: 'Wo finde ich konkrete Empfehlungen für meinen Genotyp?',
            a: 'Im Burnout-Bericht — er enthält detaillierte Empfehlungen zu Meditation, Ernährung, Bewegung, Schlafhygiene und Coping-Strategien, abgestimmt auf das individuelle COMT-Profil und die anderen ausgewerteten genetischen Faktoren.',
          },
        ],
      },
    ],
    documents: [
      {
        title: 'NovoAcademy FAQ PDF - Burnout und Stress',
        size: '118 KB',
        type: 'pdf',
        url: '/course-materials/burnout/Novogenia_FAQ_Burnout_Stress.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false,
  },

  {
    id: 'bo-sci',
    uid: '0f3b2d11-d7d3-47be-a3a0-8fa72991e73f',
    lang: 'de',
    category: 'Burnout und Stress',
    topic: 'Wissenschaftliche Basis',
    contentType: 'course',
    description: 'Welche Gene die individuelle Stressantwort und das Burnout-Risiko steuern.',
    longDescription:
      'Diese Schulung erklärt die wissenschaftliche Grundlage hinter der genetischen Burnout-Analyse. Du lernst, welche Variationen in Genen wie COMT, BDNF oder 5-HTT die Stressverarbeitung beeinflussen, warum manche Menschen schneller in einen Erschöpfungszustand kommen und welche Lebensstil-Maßnahmen genetisch optimiert eingesetzt werden können.',
    bullets: [
      'Stress-Gene (COMT, BDNF, 5-HTT) und ihre Wirkung',
      'Warum Menschen Stress unterschiedlich verarbeiten',
      'Genetische Risikofaktoren für Burnout',
      'Personalisierte Strategien zur Stress-Resilienz',
    ],
    thumbnail: '/thumbnails/course-burnout.jpg',
    youtubeId: 'eOqrJicdJZM',
    introQuestionsHeader: 'In dieser Schulung bekommst du Antworten auf folgende Fragen:',
    introQuestions: [
      'Wie unterschiedlich verarbeiten Menschen Stress?',
      'Welche Gene erhöhen das Burnout-Risiko?',
      'Was macht den genetischen "Warrior"- vs. "Worrier"-Typ aus?',
      'Welche personalisierten Empfehlungen lassen sich daraus ableiten?',
    ],
    postVideoText:
      'Mit dieser Grundlage kannst du die Burnout-Analyse fachlich fundiert mit deinen Kunden besprechen.',
    questions: [
      {
        q: 'Wodurch entsteht Burnout laut Schulung?',
        options: [
          'Durch zu wenig Schlaf in einer einzigen Nacht',
          'Durch massiven, kontinuierlichen Stress über längere Zeit',
          'Ausschließlich durch genetische Faktoren — Lebensstil spielt keine Rolle',
          'Durch zu viel körperliche Aktivität',
        ],
        correct: 1,
      },
      {
        q: 'Welche genetischen Eigenschaften werden in der Stress-Analyse betrachtet?',
        options: [
          'Nur die Reaktion auf Koffein',
          'Leistung unter Stress, emotionale Belastbarkeit und Impulsivität',
          'Ausschließlich Schlafdauer',
          'Nur die Verträglichkeit von Alkohol',
        ],
        correct: 1,
      },
      {
        q: 'Welches Gen reguliert den Abbau von Dopamin nach einer aufregenden Situation?',
        options: ['MTHFR', 'FTO', 'COMT', 'ACTN3'],
        correct: 2,
      },
      {
        q: 'Was passiert bei jemandem mit defektem COMT-Gen bei wiederholtem Stress?',
        options: [
          'Dopamin wird sofort abgebaut — das Gehirn bleibt entspannt',
          'Das Gehirn bleibt durch langsameren Dopamin-Abbau dauerhaft auf erhöhtem Erregungsniveau und kommt nicht mehr in die Basis zurück',
          'Die Person wird gegen Stress immun',
          'Es passiert nichts — die Genetik hat keinen Einfluss',
        ],
        correct: 1,
      },
      {
        q: 'Was ist ein paradoxer Vorteil eines langsamen Dopamin-Abbaus (COMT-Variante)?',
        options: [
          'Geringere Stressempfindlichkeit im Alltag',
          'Im Alltag intensivere positive Gefühle und höhere Neugier — gleichzeitig aber erhöhtes Risiko für Glücksspielsucht und Stressanfälligkeit',
          'Bessere körperliche Regeneration',
          'Niedrigeres Herzinfarkt-Risiko',
        ],
        correct: 1,
      },
      {
        q: 'Wie viel Prozent der Menschen haben zwei gut funktionierende COMT-Varianten?',
        options: ['Etwa 5 %', 'Etwa 15 %', 'Etwa 40 %', 'Etwa 80 %'],
        correct: 2,
      },
      {
        q: 'Wie viel Prozent der Menschen sind doppelt defekt und besonders stressanfällig?',
        options: ['Etwa 5 %', 'Etwa 15 %', 'Etwa 40 %', 'Etwa 60 %'],
        correct: 1,
      },
      {
        q: 'Welche Maßnahmen empfiehlt der Bericht bei genetisch ungünstiger Stress-Veranlagung?',
        options: [
          'Mehr Kaffee zur besseren Wachheit',
          'Konsequente Meditation, stressarme Lebensführung, gezielte Ernährung und Bewegung — je ungünstiger die Gene, desto wichtiger die Lebensstil-Maßnahmen',
          'Komplett auf Sport verzichten',
          'Nur Medikamente, kein Lebensstil-Eingriff',
        ],
        correct: 1,
      },
      {
        q: 'Bei welcher Tendenz sind Menschen mit defektem COMT laut Schulung zusätzlich gefährdet?',
        options: [
          'Lebensmittelallergien',
          'Glücksspiel-Sucht (weil Aufregung und Kicks intensiver wirken)',
          'Knochenschwund',
          'Hörverlust',
        ],
        correct: 1,
      },
      {
        q: 'Was zeigt der „rote Bereich" einer Stress-Kategorie im Bericht an?',
        options: [
          'Sehr gute genetische Voraussetzungen — kein Handlungsbedarf',
          'Eine ungünstige genetische Veranlagung in diesem Aspekt — die Person ist eher burnout-gefährdet',
          'Eine Empfehlung für mehr Kaffee',
          'Eine Standardempfehlung, gilt für alle gleich',
        ],
        correct: 1,
      },
    ],
    documents: [
      {
        title: 'NovoAcademy Demo Bericht - NovoDaily Lifestyle',
        size: '20 MB',
        type: 'pdf',
        url: '/course-materials/shared/Demo_NovoDaily_Lifestyle.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false, initialTestPassed: false,
  },

  /* ===== Burnout — Beratungsschulung ===== */
  {
    id: 'bo-report',
    uid: 'cb2ded2b-7a1c-4332-b28e-9ab96403de4d',
    lang: 'de',
    category: 'Burnout und Stress',
    topic: 'Beratungsschulung',
    contentType: 'course',
    description: 'Den Burnout-Bericht Schritt für Schritt mit dem Kunden besprechen.',
    longDescription:
      'In dieser Beratungsschulung erklärt Dr. Daniel Wallerstorfer, wie du den genetischen Burnout-Bericht mit deinen Kunden durchgehst und einen individuellen Umgang mit Stress ableitest.',
    bullets: [
      'Den Burnout-Bericht strukturiert mit dem Kunden besprechen',
      'Genetische Stress-Veranlagung verständlich erklären',
      'Individuelle Lebensstil-Empfehlungen ableiten',
      'Warning-Signale früh erkennen',
    ],
    thumbnail: '/thumbnails/bo-report-cover.jpg',
    introQuestionsHeader: 'In dieser Schulung lernst du:',
    introQuestions: [
      'Wie der Burnout-Bericht aufgebaut ist',
      'Wie du die individuelle Stress-Veranlagung verständlich erklärst',
      'Wie du daraus konkrete Lebensstil-Empfehlungen ableitest',
    ],
    brandNoticeAboveVideos: true,
    videoSegments: [
      { title: 'Burnout — Individuelle Umgang mit Stress', youtubeId: 'eU5n2iseSdA' },
    ],
    postVideoText:
      'Mit dieser Schulung kannst du den Burnout-Bericht fachlich fundiert mit deinen Kunden besprechen. Das folgende Demo-Booklet kannst du als Beispiel-Bericht für deine eigene Beratungspraxis verwenden.',
    /* Themenbezogene Fragen zum Burnout-Beratungsgespräch — Inhalt basiert auf
       dem Video „Burnout — Individuelle Umgang mit Stress" und dem Burnout-Bericht. */
    questions: [
      {
        q: 'Welches Gen ist zentral für die individuelle Stress-Verarbeitung und steht im Fokus der Burnout-Analyse?',
        options: ['MTHFR', 'COMT', 'CYP1A2', 'FTO'],
        correct: 1,
      },
      {
        q: 'Was unterscheidet einen „Warrior"- von einem „Worrier"-Genotyp im Bezug auf COMT?',
        options: [
          'Warrior baut Dopamin schneller ab, ist unter akutem Stress leistungsstark — Worrier baut langsamer ab, ist im Alltag konzentrationsstärker, aber anfälliger für anhaltenden Stress',
          'Warrior und Worrier reagieren genetisch identisch, der Unterschied ist nur Erziehung',
          'Worrier baut Dopamin schneller ab, bleibt unter Stress ruhiger',
          'Warrior sind grundsätzlich resistenter gegen jede Form von Stress',
        ],
        correct: 0,
      },
      {
        q: 'Was bedeutet ein „roter Bereich" in der Burnout-Auswertung für die Beratung?',
        options: [
          'Der Kunde hat bereits ein Burnout — er muss zum Arzt geschickt werden',
          'Es ist ein technischer Fehler, das Ergebnis ist nicht verwertbar',
          'Der Kunde hat in diesem Aspekt eine ungünstige genetische Veranlagung — Lebensstil-Maßnahmen sind hier besonders wichtig, weil das Risiko erhöht ist',
          'Der Kunde sollte das genetisch belastete Thema komplett meiden',
        ],
        correct: 2,
      },
      {
        q: 'Welche Empfehlung passt am besten zu einem Kunden mit langsamer COMT-Variante (Worrier, langsamer Dopamin-Abbau)?',
        options: [
          'Stress aktiv suchen — er macht ihn produktiver',
          'Bewusste Erholungspausen, Meditation, gute Schlafhygiene und das Vermeiden von vielen gleichzeitigen Stressquellen — weil das Stress-Signal länger im System bleibt',
          'Koffein deutlich erhöhen, um das Dopamin-Niveau anzuheben',
          'Komplett auf jede Form von Belastung verzichten — auch Sport',
        ],
        correct: 1,
      },
      {
        q: 'Wie sollte man eine ungünstige genetische Burnout-Veranlagung im Kundengespräch einordnen?',
        options: [
          'Als Schicksal — nichts ist zu machen, der Kunde wird ein Burnout bekommen',
          'Als kein Schicksal, sondern erhöhtes Risiko — wer seine Stress-Empfindlichkeit kennt, kann gezielt gegensteuern (Schlaf, Meditation, Bewegung, Pausen). Die genetische Information ist ein Werkzeug, kein Urteil.',
          'Als bedeutungslos — Gene haben keinen Einfluss auf Stress',
          'Als sofort behandlungsbedürftige Krankheit',
        ],
        correct: 1,
      },
      {
        q: 'Warum hat ein langsamer Dopamin-Abbau (Worrier) im Alltag auch Vorteile?',
        options: [
          'Er macht den Träger immun gegen alle Stresssituationen',
          'Er führt zu konstant hoher Stressresistenz',
          'Er bewirkt, dass Dopamin länger wirkt — diese Menschen erleben Aufregung, Freude und Belohnung intensiver, sind neugierig und probierfreudig; der Nachteil zeigt sich erst bei chronischem Stress, weil der Körper schwerer zur Ruhe kommt',
          'Er hat keinerlei Vorteile — nur Nachteile',
        ],
        correct: 2,
      },
    ],
    documents: [
      {
        title: 'NovoAcademy Demo Bericht - NovoDaily Lifestyle',
        size: '20 MB',
        type: 'pdf',
        url: '/course-materials/shared/Demo_NovoDaily_Lifestyle.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false, initialTestPassed: false,
  },

  {
    id: 'ba-faq',
    uid: '417ba06d-e11e-40f6-bc7f-a3ca6d4c33ad',
    lang: 'de',
    category: 'Biologisches Alter',
    topic: 'Häufige Fragen',
    contentType: 'faq',
    description: 'Antworten auf typische Kundenfragen zur Analyse des biologischen Alters.',
    longDescription:
      'Eine Sammlung der wichtigsten Fragen zur Telomer- und Anti-Aging-Analyse. Mit ausklappbarer Antwort zum Selbsttest.',
    bullets: [
      'Was sind Telomere und warum altern wir?',
      'Wie beeinflusst meine Genetik das biologische Alter?',
      'Welche Nährstoffe und Lebensstil-Maßnahmen helfen?',
      'Mediterrane Ernährung — wirkt sie bei jedem?',
    ],
    thumbnail: '/thumbnails/ba-faq-cover.jpg',
    faqGroups: [
      {
        title: 'Grundlagen — Telomere & Alterung',
        items: [
          {
            q: 'Was sind Telomere und warum sind sie für das Altern wichtig?',
            a: 'Telomere sind Schutzkappen am Ende jedes Chromosoms — sie enthalten keine Gene, sondern schützen die Gene davor, bei Zellteilungen verloren zu gehen. Bei jeder Zellteilung bricht ein kleines Stück Telomer ab. Nach 50 bis 70 Teilungen sind sie aufgebraucht; die Zelle geht dann in einen Schlafmodus (Seneszenz) und sammelt sich als „alte Zelle" im Körper an.',
          },
          {
            q: 'Was ist der Unterschied zwischen chronologischem und biologischem Alter?',
            a: 'Das chronologische Alter ist deine Lebenszeit in Jahren — fix und unveränderlich. Das biologische Alter zeigt, wie „alt" deine Zellen tatsächlich sind. Bei zwei Menschen mit gleichem chronologischen Alter kann das biologische Alter durch genetische Veranlagung und Lebensstil bis zu 20 Jahre auseinanderliegen.',
          },
          {
            q: 'Welche Gene werden in der Analyse betrachtet?',
            a: 'Hauptsächlich Telomerase und verwandte Gene (TERT, BICD1, PPARG), die die Erhaltung der Telomerlänge steuern. Sie zeigen, wie gut dein Körper Telomere reparieren bzw. erhalten kann — eine grobe Schätzung der genetischen Anti-Aging-Kapazität.',
          },
        ],
      },
      {
        title: 'Beeinflussbarkeit',
        items: [
          {
            q: 'Wirkt mediterrane Ernährung bei jedem auf die Telomere?',
            a: 'Überraschend nein. Sie verlängert die Telomere nur bei Menschen mit einem bestimmten Gendefekt — bei anderen zeigt sie keinen messbaren Effekt auf die Telomerlänge. Eine schöne Veranschaulichung, dass dieselbe Lebensstil-Empfehlung nicht für jeden gleich wirkt.',
          },
          {
            q: 'Welche Nährstoffe können die Telomere unterstützen?',
            a: 'Vitamin D3, Omega-3, Vitamin E, Resveratrol und Ginkgo. Wenn das genetische Schutzsystem geschwächt ist, können diese Nährstoffe gezielt eingesetzt werden, um die Telomer-Verkürzung zu verlangsamen.',
          },
          {
            q: 'Kann ich freie Radikale beeinflussen?',
            a: 'Ja — Antioxidantien in der Nahrung (Vitamin C, E, Polyphenole aus Beeren, Tee etc.) neutralisieren freie Radikale, bevor sie Schaden an den Zellen anrichten. Bei genetisch geschwächten Schutzgenen gegen oxidativen Stress ist eine antioxidantienreiche Ernährung besonders wichtig.',
          },
        ],
      },
      {
        title: 'Praxis & Interpretation',
        items: [
          {
            q: 'Wird hier wirklich Telomerlänge gemessen?',
            a: 'Nein — es ist keine direkte Messung der Telomerlänge. Stattdessen wird aus der Genetik die genetische Kapazität abgeleitet, Telomere zu erhalten. Eine direkte Telomerlängen-Messung erfordert separate Bluttests und ist eine Momentaufnahme.',
          },
          {
            q: 'Was bringt mir dieses Wissen praktisch?',
            a: 'Du weißt, ob du genetisch eher zur schnelleren oder langsameren Zellalterung neigst — und kannst gezielt gegensteuern. Bei ungünstiger Veranlagung lohnt sich besonders: antioxidantienreiche Ernährung, gezielte Supplementierung (D3, Omega-3, Resveratrol), regelmäßiger Sport (aber nicht übertrieben), guter Schlaf und Stressreduktion.',
          },
        ],
      },
    ],
    documents: [
      {
        title: 'NovoAcademy FAQ PDF - Biologisches Alter',
        size: '119 KB',
        type: 'pdf',
        url: '/course-materials/bioage/Novogenia_FAQ_Biologisches_Alter.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false,
  },

  {
    id: 'ba-sci',
    uid: 'f0987228-9829-4df7-b8bd-51335850764c',
    lang: 'de',
    category: 'Biologisches Alter',
    topic: 'Wissenschaftliche Basis',
    contentType: 'course',
    description: 'Wie das biologische Alter genetisch bestimmt und durch Lebensstil beeinflusst wird.',
    longDescription:
      'Diese Schulung erklärt die wissenschaftliche Grundlage hinter der Bestimmung des biologischen Alters. Du erfährst, welche Gene Telomerlänge und Zellalterung beeinflussen, wie sich biologisches von chronologischem Alter unterscheidet und welche Lebensstil-Faktoren das biologische Alter messbar verändern können.',
    bullets: [
      'Telomere und Zellalterung — Grundlagen',
      'Chronologisches vs. biologisches Alter',
      'Genetische Faktoren der Alterung (TERT, BICD1 & Co.)',
      'Anti-Aging Strategien mit messbarer Wirkung',
    ],
    thumbnail: '/thumbnails/course-bioage.jpg',
    youtubeId: 'gwmVcvbaNgE',
    introQuestionsHeader: 'In dieser Schulung bekommst du Antworten auf folgende Fragen:',
    introQuestions: [
      'Was ist der Unterschied zwischen chronologischem und biologischem Alter?',
      'Wie werden Telomere gemessen und was sagen sie aus?',
      'Welche Gene beeinflussen die Zellalterung?',
      'Welche Lifestyle-Maßnahmen verändern das biologische Alter nachweislich?',
    ],
    postVideoText:
      'Mit dieser Grundlage kannst du die Analyse des biologischen Alters fachlich fundiert mit deinen Kunden besprechen.',
    questions: [
      {
        q: 'Was sind Telomere?',
        options: [
          'Aktive Gene am Anfang jedes Chromosoms',
          'Schutzkappen am Ende jedes Chromosoms — enthalten keine Gene, schützen aber die enthaltenen Gene vor Verlust',
          'Spezielle Proteine in Muskelzellen',
          'Antikörper des Immunsystems',
        ],
        correct: 1,
      },
      {
        q: 'Was passiert bei jeder Zellteilung mit den Telomeren?',
        options: [
          'Sie verlängern sich',
          'Ein kleines Stück bricht ab — die Telomere werden mit jeder Teilung kürzer',
          'Sie verändern ihre Farbe',
          'Sie werden komplett neu aufgebaut',
        ],
        correct: 1,
      },
      {
        q: 'Nach wie vielen Zellteilungen sind die Telomere typischerweise aufgebraucht?',
        options: [
          'Nach 5 bis 10 Teilungen',
          'Nach 50 bis 70 Teilungen',
          'Nach 500 bis 700 Teilungen',
          'Nie — sie regenerieren sich vollständig',
        ],
        correct: 1,
      },
      {
        q: 'Was passiert mit einer Zelle, deren Telomere aufgebraucht sind?',
        options: [
          'Sie teilt sich besonders schnell weiter',
          'Sie geht in einen Schlafmodus (Seneszenz) — verbraucht Nährstoffe, erfüllt aber ihre Aufgabe nicht mehr',
          'Sie wandelt sich automatisch in eine Stammzelle um',
          'Sie verlässt den Körper über den Schweiß',
        ],
        correct: 1,
      },
      {
        q: 'Welches Gen reguliert die Erhaltung bzw. den Wiederaufbau der Telomere?',
        options: ['MTHFR', 'Telomerase', 'COMT', 'FTO'],
        correct: 1,
      },
      {
        q: 'Welche Nährstoffe können das Telomer-Schutzsystem bei genetischer Schwäche unterstützen?',
        options: [
          'Koffein und Theobromin',
          'Vitamin D3, Omega-3, Vitamin E, Resveratrol und Ginkgo',
          'Salz und Zucker',
          'Alkohol und Nikotin',
        ],
        correct: 1,
      },
      {
        q: 'Wirkt mediterrane Ernährung bei jedem Menschen gleich auf die Telomere?',
        options: [
          'Ja — sie wirkt bei allen identisch',
          'Nein — sie verlängert die Telomere nur bei Menschen mit einem bestimmten Gendefekt, bei anderen zeigt sie keinen Effekt',
          'Nein — sie verkürzt die Telomere bei allen Menschen',
          'Die Wirkung ist nicht untersucht',
        ],
        correct: 1,
      },
      {
        q: 'Wie groß ist der mögliche Unterschied im biologischen Alter zwischen Personen mit 2 defekten und 2 funktionalen Telomerase-Genen?',
        options: [
          'Maximal 1 bis 2 Jahre',
          'Maximal 5 Jahre',
          'Bis zu 20 Jahre',
          'Genvarianten haben keinen messbaren Effekt',
        ],
        correct: 2,
      },
      {
        q: 'Welche Rolle spielen freie Radikale bei der Alterung?',
        options: [
          'Sie verlängern die Lebensdauer',
          'Sie beschädigen Zellen kontinuierlich — über die Jahre summiert sich die Beschädigung, was zum Altern beiträgt; mit Antioxidantien lässt sich das eindämmen',
          'Sie sind harmlos und ohne Wirkung',
          'Sie wirken nur auf Sportler',
        ],
        correct: 1,
      },
      {
        q: 'Was ist die richtige Strategie bei einem Telomerase-Gendefekt?',
        options: [
          'Die Veranlagung ignorieren — die Telomere lassen sich nicht beeinflussen',
          'Gezielte Lebensstil-Maßnahmen und unterstützende Nährstoffe einsetzen, um die schwächere genetische Schutzfunktion auszugleichen und die Telomer-Verkürzung zu verlangsamen',
          'Mehr Sport treiben, sonst nichts',
          'Die Ernährung komplett umstellen — egal worauf',
        ],
        correct: 1,
      },
    ],
    documents: [
      {
        title: 'NovoAcademy Demo Bericht - NovoDaily Lifestyle',
        size: '20 MB',
        type: 'pdf',
        url: '/course-materials/shared/Demo_NovoDaily_Lifestyle.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Telomere und biologisches Alter',
        size: '299 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Telomeres_Biological_Age_Review.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false, initialTestPassed: false,
  },

  /* ===== Biologisches Alter — Beratungsschulung ===== */
  {
    id: 'ba-report',
    uid: '88e7c0cf-7139-4d82-838d-a607ccd91cdf',
    lang: 'de',
    category: 'Biologisches Alter',
    topic: 'Beratungsschulung',
    contentType: 'course',
    description: 'Den Bericht zum biologischen Alter mit dem Kunden besprechen.',
    longDescription:
      'In dieser Beratungsschulung erklärt Dr. Daniel Wallerstorfer, wie du den genetischen Bericht zum biologischen Alter und Alterungsprozess kompetent mit deinen Kunden besprichst.',
    bullets: [
      'Den Bericht zum biologischen Alter strukturiert besprechen',
      'Den Alterungsprozess genetisch fundiert einordnen',
      'Konkrete Anti-Aging-Empfehlungen ableiten',
      'Wie Lebensstil das biologische Alter beeinflusst',
    ],
    thumbnail: '/thumbnails/ba-report-cover.jpg',
    introQuestionsHeader: 'In dieser Schulung lernst du:',
    introQuestions: [
      'Wie der Bericht zum biologischen Alter aufgebaut ist',
      'Wie du den Alterungsprozess verständlich erklärst',
      'Welche konkreten Lebensstil-Empfehlungen sich ableiten lassen',
    ],
    brandNoticeAboveVideos: true,
    videoSegments: [
      { title: 'Alterungsprozess', youtubeId: 'kk5aXYY1sWQ' },
    ],
    postVideoText:
      'Mit dieser Schulung kannst du den Bericht zum biologischen Alter fachlich fundiert mit deinen Kunden besprechen. Das folgende Demo-Booklet kannst du als Beispiel-Bericht für deine eigene Beratungspraxis verwenden.',
    /* Themenbezogene Fragen zur Bio-Age-Beratung — Inhalt basiert auf dem Video
       „Alterungsprozess" und dem Bericht zum biologischen Alter. */
    questions: [
      {
        q: 'Was ist der Unterschied zwischen chronologischem und biologischem Alter?',
        options: [
          'Es gibt keinen — beide sind dasselbe',
          'Chronologisches Alter ist die seit Geburt vergangene Zeit; biologisches Alter beschreibt den tatsächlichen Zustand der Zellen — beeinflusst durch Lebensstil und Genetik',
          'Biologisches Alter ist immer höher als chronologisches Alter',
          'Chronologisches Alter wird im Labor gemessen, biologisches geschätzt',
        ],
        correct: 1,
      },
      {
        q: 'Welche zellulären Strukturen verkürzen sich bei jeder Zellteilung und sind ein zentraler Indikator des biologischen Alters?',
        options: ['Mitochondrien', 'Ribosomen', 'Telomere', 'Zellmembranen'],
        correct: 2,
      },
      {
        q: 'Welche Aufgabe hat das Enzym Telomerase?',
        options: [
          'Es baut Zellen ab, die zu alt sind',
          'Es kann die Telomere reparieren bzw. wieder verlängern — und damit die Telomer-Verkürzung verlangsamen',
          'Es produziert freie Radikale',
          'Es transportiert Sauerstoff im Blut',
        ],
        correct: 1,
      },
      {
        q: 'Eine Kundin hat einen genetisch schwachen Telomerase-Schutz („roter Bereich"). Welche Beratungs-Empfehlung passt am besten?',
        options: [
          'Veranlagung ignorieren — die Telomere lassen sich nicht beeinflussen',
          'Die genetische Schwäche durch Lebensstil ausgleichen: antioxidantienreiche Ernährung, gezielte Nährstoffe (D3, Omega-3, Resveratrol), regelmäßiger moderater Sport, guter Schlaf und Stressreduktion',
          'Komplett auf Sport verzichten, weil dieser oxidativen Stress erzeugt',
          'Sofort einen Arzt aufsuchen — die Veranlagung ist krankheitswertig',
        ],
        correct: 1,
      },
      {
        q: 'Was zeigte die Forschung zur mediterranen Ernährung im Zusammenhang mit Telomerlänge?',
        options: [
          'Sie verlängert die Telomere bei jedem messbar',
          'Sie wirkt nur bei Menschen mit einem bestimmten Genotyp — bei anderen zeigt sie keinen Telomer-Effekt; ein gutes Beispiel dafür, dass dieselbe Lebensstil-Empfehlung nicht für jeden gleich wirkt',
          'Sie verkürzt die Telomere — deshalb sollte man sie meiden',
          'Sie hat keinen messbaren Einfluss bei niemandem',
        ],
        correct: 1,
      },
      {
        q: 'Wie sollte man eine ungünstige genetische Anti-Aging-Veranlagung im Kundengespräch einordnen?',
        options: [
          'Als unveränderliches Schicksal — der Kunde wird vorzeitig altern',
          'Als bedeutungslos — Gene sind irrelevant für den Alterungsprozess',
          'Als erhöhtes Risiko, nicht Schicksal: wer seine genetischen Schwächen kennt, kann Antioxidantien, Schlaf, Bewegung und Stressreduktion gezielter einsetzen — die Effekte summieren sich über Jahre',
          'Als sofort behandlungsbedürftige Krankheit',
        ],
        correct: 2,
      },
    ],
    documents: [
      {
        title: 'NovoAcademy Demo Bericht - NovoDaily Lifestyle',
        size: '20 MB',
        type: 'pdf',
        url: '/course-materials/shared/Demo_NovoDaily_Lifestyle.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false, initialTestPassed: false,
  },

  /* ======== Personalisierte Nahrungsergänzung ======== */
  {
    id: 'supp-sci',
    uid: 'ef2af81c-9528-42d3-8083-81de9404fa6c',
    lang: 'de',
    category: 'Personalisierte Nahrungsergänzung',
    topic: 'Wissenschaftliche Basis',
    contentType: 'course',
    description: 'Wie genetisch individuelle Mikronährstoff-Bedürfnisse personalisierte Supplementierung möglich machen — wissenschaftlich erklärt.',
    longDescription:
      'In dieser Schulung erklärt Dr. Daniel Wallerstorfer, warum jeder Mensch einen anderen Mikronährstoff-Bedarf hat und wie eine genetisch personalisierte Nahrungsergänzung wirkt. Du lernst die Mikrotransporter-Technologie kennen — wie konkurrierende Nährstoffe (z. B. Calcium und Zink) gleichzeitig aufgenommen werden können und warum Slow-Release bei Vitamin C einen physiologisch sinnvollen Verlauf nachahmt.',
    bullets: [
      'Genetisch individueller Nährstoffbedarf',
      'Mikrotransporter-Technologie',
      'Slow-Release & getrennte Aufnahme (Calcium/Zink)',
      'Bioverfügbarkeit von Vitaminen und Mineralien',
    ],
    thumbnail: T(15),
    youtubeId: 'WV2pfawe6zI', // DE Supplements-Schnitt aus "Gesund oder ungesund?" (13:23–Ende), public hochgeladen 2026-06
    coverImage: '/thumbnails/supp-sci-cover.jpg',
    introQuestionsHeader: 'In dieser Schulung bekommst du Antworten auf folgende Fragen:',
    introQuestions: [
      'Warum hat jeder Mensch einen anderen Mikronährstoffbedarf?',
      'Wie löst die Mikrotransporter-Technologie das Problem konkurrierender Nährstoffe?',
      'Warum wird Vitamin C als Slow-Release ausgeschüttet?',
      'Wie können Calcium und Zink trotz gegenseitiger Blockade gleichzeitig aufgenommen werden?',
    ],
    postVideoText:
      'Mit diesem Hintergrund kannst du die Logik hinter der personalisierten Nahrungsergänzung fundiert mit deinen Kunden besprechen und die Mikrotransporter-Technologie verständlich erklären.',
    /* Themenbezogene Fragen zur Wissenschaft hinter personalisierter
       Nahrungsergänzung und der Mikrotransporter-Technologie. */
    questions: [
      {
        q: 'Warum hat jeder Mensch einen anderen Mikronährstoffbedarf?',
        options: [
          'Weil die Zellzahl von Mensch zu Mensch unterschiedlich ist',
          'Weil genetische Varianten den Stoffwechsel, die Aufnahme und den Bedarf einzelner Nährstoffe individuell prägen — derselbe Nährstoff wird bei verschiedenen Menschen unterschiedlich verwertet',
          'Weil jeder Mensch unterschiedlich viel Wasser trinkt',
          'Weil die Größe des Magens variiert',
        ],
        correct: 1,
      },
      {
        q: 'Was ist das Grundproblem, das die Mikrotransporter-Technologie löst?',
        options: [
          'Dass Tabletten zu groß zum Schlucken sind',
          'Dass viele Nährstoffe in Standard-Tabletten in einer Form vorliegen, die sich gegenseitig in der Aufnahme blockieren oder die zu schnell wieder aus dem Körper verschwinden',
          'Dass Vitamine teuer in der Herstellung sind',
          'Dass Nahrungsergänzungen schlecht schmecken',
        ],
        correct: 1,
      },
      {
        q: 'Warum wird Vitamin C als Slow-Release ausgeschüttet?',
        options: [
          'Vitamin C ist toxisch in höheren Mengen',
          'Vitamin C wirkt nur in extrem hohen Dosen',
          'Vitamin C hat eine sehr kurze Halbwertszeit (~30 Min) — über den Tag verteilte Freisetzung in den Mikrotransportern ahmt den natürlichen, gleichmäßigen Eintrag durch Nahrung nach und hält die Blutspiegel konstant',
          'Slow-Release ist nur ein Marketing-Begriff ohne wissenschaftliche Wirkung',
        ],
        correct: 2,
      },
      {
        q: 'Wie löst die Mikrotransporter-Technologie das Problem, dass Calcium und Zink sich gegenseitig in der Aufnahme blockieren?',
        options: [
          'Es wird nur einer der beiden Nährstoffe verwendet',
          'Calcium und Zink werden chemisch zu einer neuen Substanz kombiniert',
          'Die beiden werden in derselben Pille einfach zusammen verpackt',
          'Zink wird sofort freigesetzt, Calcium erst Stunden später an einer anderen Stelle im Darm — beide werden gleichzeitig eingenommen, aber zeitlich UND räumlich versetzt freigesetzt, sodass keine Konkurrenz an denselben Transportern entsteht',
        ],
        correct: 3,
      },
      {
        q: 'Wie viele Gene werden in der Analyse für personalisierte Nahrungsergänzung berücksichtigt?',
        options: ['Etwa 10', 'Etwa 25', 'Mehr als 60', 'Genau 200'],
        correct: 2,
      },
      {
        q: 'Was ist der wesentliche Vorteil der personalisierten gegenüber der Standard-Nahrungsergänzung?',
        options: [
          'Die personalisierte Variante enthält mehr Vitamine pro Tablette',
          'Die Dosis und Auswahl der Nährstoffe sowie ihre Freisetzungs-Form ist auf die individuellen genetischen Bedarfe abgestimmt — kein „one size fits all" mehr, sondern wirklich passend',
          'Sie ist immer günstiger',
          'Sie wirkt sofort am ersten Tag der Einnahme',
        ],
        correct: 1,
      },
    ],
    documents: [
      {
        title: 'NovoAcademy Folien - Personalisierte Nahrungsergänzung',
        size: '94 MB',
        type: 'pptx',        thumbnail: '/thumbnails/pptx-template.jpg',

        url: 'https://github.com/Novogenia-AG/novo-academy/releases/download/course-materials/Schulungsfolien_Supplements.pptx',
      },
      {
        title: 'NovoAcademy Science PDF - Slow-Release Mikrotransporter — Pellet-Technologie',
        size: '305 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Slow_Release_Pellets_Review.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false, initialTestPassed: false,
  },

  /* ===== Personalisierte Nahrungsergänzung — Häufige Fragen ===== */
  {
    id: 'supp-faq',
    uid: 'a55bf41d-d7b1-4cca-912d-e7c956b81b02',
    lang: 'de',
    category: 'Personalisierte Nahrungsergänzung',
    topic: 'Häufige Fragen',
    contentType: 'faq',
    description: 'Antworten auf typische Kundenfragen zur personalisierten Nahrungsergänzung und Mikrotransporter-Technologie.',
    longDescription:
      'Eine Sammlung der wichtigsten Kundenfragen rund um personalisierte Nahrungsergänzung — warum nicht jede Tablette wirkt, was die Mikrotransporter-Technologie wirklich anders macht, und wie genetische Information die Dosis prägt. Mit ausklappbarer Antwort zum Selbsttest.',
    bullets: [
      'Was ist der Unterschied zwischen Standard- und personalisierter Supplementierung?',
      'Wie funktioniert die Mikrotransporter-Technologie?',
      'Wie passt sich die Dosis an den genetischen Bedarf an?',
      'Was kostet die personalisierte Supplementierung im Vergleich?',
    ],
    thumbnail: '/thumbnails/supp-faq-cover.jpg',
    faqGroups: [
      {
        title: 'Grundlagen — Warum personalisiert?',
        items: [
          {
            q: 'Warum brauche ich überhaupt eine personalisierte Nahrungsergänzung?',
            a: 'Weil dein Körper genetisch bedingt andere Nährstoffe besser oder schlechter verwertet als ein anderer Mensch — und weil dein Lebensstil (Sport, Schlaf, Stress, Ernährung) deinen individuellen Bedarf zusätzlich prägt. Standard-Tabletten gehen vom „Durchschnittsmenschen" aus und decken dadurch viele individuelle Bedarfslagen weder zu wenig noch zu viel ab.',
          },
          {
            q: 'Was ist der Unterschied zu Standard-Multivitaminen aus der Drogerie?',
            a: 'Drei Hauptpunkte: (1) Die Auswahl der Nährstoffe und ihre Dosis ist auf deine Gene abgestimmt; (2) die Freisetzung erfolgt zeitlich versetzt (z. B. Slow-Release Vitamin C), damit die Blutspiegel konstant bleiben; (3) konkurrierende Nährstoffe wie Calcium und Zink werden räumlich und zeitlich getrennt ausgeschüttet, damit sie sich nicht gegenseitig blockieren.',
          },
          {
            q: 'Wie viele Gene werden in der Analyse berücksichtigt?',
            a: 'Über 60 Gene fließen in die Bewertung deines individuellen Nährstoff­bedarfs ein — darunter Gene für Vitaminstoffwechsel (Folsäure-MTHFR, Vitamin-D-VDR, Vitamin-B12-FUT2), Mineralstoff­aufnahme (Eisen-HFE, Calcium-LCT) und antioxidative Schutzsysteme (GST, SOD, CAT).',
          },
        ],
      },
      {
        title: 'Mikrotransporter-Technologie',
        items: [
          {
            q: 'Was sind Mikrotransporter?',
            a: 'Mikrotransporter sind winzige Pellets in der Größenordnung von wenigen Millimetern, die einzelne Nährstoffe in spezifischen Hüllen enthalten. Jeder Mikrotransporter „löst sich" zu einer anderen Zeit und an einer anderen Stelle im Verdauungstrakt — dadurch können auch sonst konkurrierende Nährstoffe gleichzeitig eingenommen, aber zeitlich versetzt aufgenommen werden.',
          },
          {
            q: 'Warum wird Vitamin C als Slow-Release ausgeschüttet?',
            a: 'Vitamin C hat eine sehr kurze biologische Halbwertszeit von etwa 30 Minuten. Eine einmalige hohe Dosis wird größtenteils ungenutzt ausgeschieden. Slow-Release in den Mikrotransportern ahmt den natürlichen, kontinuierlichen Eintrag durch Nahrung über den Tag nach und hält den Blutspiegel konstant — das ist physiologisch deutlich sinnvoller.',
          },
          {
            q: 'Wie funktioniert das mit Calcium und Zink, die sich gegenseitig blockieren?',
            a: 'Calcium und Zink konkurrieren um dieselben Transporter im Darm — wer beide gleichzeitig nimmt, bekommt von beiden weniger. Bei der Mikrotransporter-Technologie wird Zink im oberen Dünndarm sofort freigesetzt, Calcium dagegen erst Stunden später im tieferen Darmabschnitt. Beide werden gleichzeitig eingenommen, aber an verschiedenen Orten/Zeiten freigesetzt — keine Konkurrenz.',
          },
        ],
      },
      {
        title: 'Praktische Fragen',
        items: [
          {
            q: 'Muss ich die Tabletten zu festen Zeiten nehmen?',
            a: 'Wir empfehlen eine konsistente Tageszeit (z. B. morgens zum Frühstück), damit der Spiegel stabil bleibt. Du musst aber nicht minutengenau auf die Uhr schauen — eine grobe Routine reicht. Wichtiger ist, dass du sie überhaupt regelmäßig nimmst.',
          },
          {
            q: 'Wie schnell merke ich eine Wirkung?',
            a: 'Das ist je nach Nährstoff sehr unterschiedlich. Manche Effekte (z. B. bessere Energie bei B-Vitaminen) zeigen sich in wenigen Tagen bis Wochen, andere (z. B. Knochenstoffwechsel bei Vitamin D) entwickeln sich über Monate. Eine personalisierte Supplementierung wirkt nicht wie ein Medikament — sie behebt langfristige Nährstoff-Engpässe.',
          },
          {
            q: 'Brauche ich die Supplementierung dauerhaft?',
            a: 'Bei genetisch bedingten Stoffwechsel-Schwächen ja, weil die Veranlagung lebenslang besteht. Lebensstil-bedingte Bedarfslagen (z. B. erhöhter Bedarf während Stress, Sport, Krankheit) können sich ändern — die Analyse zeigt dir aber auch, wo deine Genetik dauerhaft einen erhöhten Bedarf erzeugt und wo Lebensstil-Anpassung ausreicht.',
          },
          {
            q: 'Kann ich die Supplementierung mit Medikamenten kombinieren?',
            a: 'Grundsätzlich ja — alle eingesetzten Nährstoffe sind in nahrungs­typischen Mengen dosiert. Bei chronischen Erkrankungen oder Dauermedikation solltest du das aber mit deinem Arzt besprechen, weil einzelne Nährstoffe (z. B. Vitamin K, Eisen) mit bestimmten Wirkstoffen Wechselwirkungen haben können.',
          },
          {
            q: 'Was kostet die personalisierte Variante im Vergleich zu Drogerie-Multivitaminen?',
            a: 'Pro Tag deutlich mehr — typischerweise das 3- bis 5-fache der billigsten Drogerieprodukte. Im Gegenzug bekommst du eine genetisch abgestimmte Zusammensetzung, die wahrscheinlich auch tatsächlich aufgenommen wird statt großteils ungenutzt ausgeschieden zu werden. Der Vergleich „pro mg Vitamin" ist irreführend; sinnvoller ist „pro mg, der tatsächlich im Blut ankommt".',
          },
        ],
      },
    ],
    documents: [
      {
        title: 'NovoAcademy FAQ PDF - Personalisierte Nahrungsergänzung',
        size: '121 KB',
        type: 'pdf',
        url: '/course-materials/supplements/Novogenia_FAQ_Personalisierte_Nahrungsergaenzung.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false,
  },

  /* ======== Beauty ======== */
  {
    id: 'beauty-sci',
    uid: 'a1a21370-ea81-4236-bc2b-14db8dbd32ec',
    lang: 'de',
    category: 'Gesunde Haut und Aussehen',
    topic: 'Wissenschaftliche Basis',
    contentType: 'course',
    description: 'Wie Gene Hautalterung, Faltenbildung, UV-Empfindlichkeit und Hautfeuchtigkeit mitbestimmen — wissenschaftlich erklärt.',
    longDescription:
      'In dieser Schulung erklärt Dr. Daniel Wallerstorfer die genetischen Grundlagen der DNAbeauty Control-Analyse. Welche Gene steuern den Kollagenabbau? Warum brennt die Haut bei manchen Menschen schneller? Wie hängt die Hautfeuchtigkeit mit Filaggrin und anderen Genen zusammen? Und was lässt sich aus diesen Informationen für eine wirklich personalisierte Hautpflege ableiten?',
    bullets: [
      'Genetische Hautalterung & Kollagenabbau (MMP1)',
      'UV-Empfindlichkeit und Pigmentierung (MC1R)',
      'Hautfeuchtigkeit & Barriere-Funktion (FLG)',
      'Antioxidative Schutzsysteme der Haut (SOD, CAT, GPX)',
    ],
    thumbnail: T(1),
    youtubeId: '5A5XoWH7XKk', // "BEAUTY. Die 9 Faktoren des Alterns" (30:31, public). Vorher 8RVq0Qp4r64 = vom Kanal gelöscht → Modul war live kaputt (2026-06-08 gefixt)
    introQuestionsHeader: 'In dieser Schulung bekommst du Antworten auf folgende Fragen:',
    introQuestions: [
      'Welche Gene steuern den Kollagenabbau und damit die Faltenbildung?',
      'Wie unterscheidet sich die genetische UV-Empfindlichkeit zwischen Menschen?',
      'Welche Rolle spielen Antioxidantien-Gene bei der Hautalterung?',
      'Wie hängt die genetische Hautfeuchtigkeit mit der Pflegeroutine zusammen?',
    ],
    postVideoText:
      'Mit diesem wissenschaftlichen Hintergrund kannst du den Beauty-Bericht fundiert mit deinen Kunden besprechen und individuelle Pflegestrategien aus den genetischen Ergebnissen ableiten.',
    questions: [
      {
        q: 'Welches Enzym bzw. Gen ist zentral für den Abbau von Kollagen in der Haut und damit für die Faltenbildung verantwortlich?',
        options: [
          'MTHFR — Folsäure-Aktivierung',
          'MMP1 — Matrix-Metalloproteinase 1 (baut Kollagen ab)',
          'CYP1A2 — Koffein-Abbau',
          'LCT — Laktase-Persistenz',
        ],
        correct: 1,
      },
      {
        q: 'Eine Kundin hat eine sehr aktive Variante des Kollagenabbau-Gens MMP1. Was bedeutet das für ihre Hautpflege?',
        options: [
          'Sie braucht keine Anti-Aging-Maßnahmen, ihre Haut schützt sich selbst',
          'Sie hat ein erhöhtes Risiko für frühzeitige Faltenbildung — Anti-Aging-Maßnahmen (Antioxidantien, UV-Schutz, Kollagen-Booster, kein Rauchen) sind hier besonders wichtig',
          'Die Variante wirkt sich nur auf die Haarfarbe aus',
          'Sie sollte mehr Kohlenhydrate essen',
        ],
        correct: 1,
      },
      {
        q: 'Welche Aussage zur genetischen UV-Empfindlichkeit (z. B. MC1R) ist korrekt?',
        options: [
          'Genvarianten beeinflussen die UV-Empfindlichkeit nicht — entscheidend ist nur der Hauttyp',
          'Träger ungünstiger Varianten bekommen schneller Sonnenbrand und haben ein höheres Risiko für UV-bedingte Hautalterung und Hautkrebs — strikter UV-Schutz ist umso wichtiger',
          'Bei genetisch hoher UV-Empfindlichkeit sollte man die Sonne komplett meiden, auch im Schatten',
          'Sonnencreme wirkt nur bei Menschen mit „normalen" Genen',
        ],
        correct: 1,
      },
      {
        q: 'Warum sind antioxidative Gene wie SOD2, CAT und GPX für die Hautalterung wichtig?',
        options: [
          'Sie produzieren freie Radikale',
          'Sie schützen vor oxidativem Stress, der DNA-Schäden in Hautzellen verursacht — bei genetischer Schwäche dieser Schutzsysteme altert die Haut messbar schneller, Antioxidantien (Vitamin C, E, Polyphenole) werden umso wichtiger',
          'Sie haben nur Einfluss auf das Immunsystem, nicht auf die Haut',
          'Sie sorgen für die Pigmentierung',
        ],
        correct: 1,
      },
      {
        q: 'Welche Empfehlung passt am besten zu einer Kundin mit genetisch reduzierter Hautfeuchtigkeit (z. B. ungünstige FLG-Filaggrin-Varianten)?',
        options: [
          'Häufig heiß duschen und stark seifige Reiniger verwenden',
          'Verstärkte Anwendung feuchtigkeits­bindender und barriere­stärkender Pflege (Hyaluronsäure, Ceramide, Glycerin), milde Reiniger, austrocknende Stoffe meiden',
          'Komplett auf jede Pflege verzichten — die Haut regelt das selbst',
          'Nur einmal pro Woche Wasser an die Haut lassen',
        ],
        correct: 1,
      },
      {
        q: 'Was unterscheidet die genetische Hautanalyse von einer rein kosmetischen Beratung im Drogerieregal?',
        options: [
          'Sie ist kostenloser',
          'Sie identifiziert dauerhafte genetische Schwachstellen der Haut, statt nur den aktuellen Zustand zu beurteilen — Pflege- und Schutzstrategien können langfristig und gezielt eingesetzt werden, statt reaktiv auf sichtbare Probleme zu reagieren',
          'Sie ersetzt jede ärztliche Hautuntersuchung',
          'Sie ist nur für junge Menschen sinnvoll',
        ],
        correct: 1,
      },
    ],
    documents: [
      {
        title: 'NovoAcademy Folien - Gesunde Haut und Aussehen',
        size: '114 MB',
        type: 'pptx',
        thumbnail: '/thumbnails/pptx-template.jpg',
        url: 'https://github.com/Novogenia-AG/novo-academy/releases/download/course-materials/Schulungsfolien_Beauty.pptx',
      },
      {
        title: 'NovoAcademy Demo Bericht - Beauty Sensor',
        size: '23 MB',
        type: 'pdf',
        url: '/course-materials/beauty/Demo_Beauty_Sensor.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Telomere & Hautalterung',
        size: '299 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Telomeres_Biological_Age_Review.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false, initialTestPassed: false,
  },

  /* ===== Beauty — Häufige Fragen ===== */
  {
    id: 'beauty-faq',
    uid: '0a1843e2-14f1-410b-8529-296b401b0950',
    lang: 'de',
    category: 'Gesunde Haut und Aussehen',
    topic: 'Häufige Fragen',
    contentType: 'faq',
    description: 'Antworten auf typische Kundenfragen zur genetisch fundierten Hautanalyse (DNAbeauty Control).',
    longDescription:
      'Eine Sammlung der wichtigsten Kundenfragen rund um die genetische Hautanalyse: was sie wirklich aussagt, welche Gene betrachtet werden, wie sich daraus praktische Pflegeempfehlungen ergeben und welche Erwartungen realistisch sind. Mit ausklappbarer Antwort zum Selbsttest.',
    bullets: [
      'Was DNAbeauty Control wirklich aussagt — und was nicht',
      'Wie sich genetische Hautanalyse von der Kosmetik-Beratung unterscheidet',
      'Welche Gene wir betrachten (MMP1, MC1R, FLG, …)',
      'Wie praktische Pflegeempfehlungen aussehen',
    ],
    thumbnail: '/thumbnails/beauty-faq-cover.jpg',
    faqGroups: [
      {
        title: 'Grundlagen — Was die genetische Hautanalyse leistet',
        items: [
          {
            q: 'Was ist die genetische Hautanalyse (DNAbeauty Control)?',
            a: 'Eine Analyse deiner Gene mit Fokus auf hautrelevante Bereiche: Kollagenabbau, UV-Empfindlichkeit, Pigmentierung, Hautfeuchtigkeit, antioxidativer Schutz und Entzündungsneigung. Aus deinem DNA-Datensatz werden über 20 hautrelevante Genvarianten bewertet und in praktische Pflege- und Schutzempfehlungen übersetzt.',
          },
          {
            q: 'Was unterscheidet sie von einer Hautanalyse beim Kosmetiker?',
            a: 'Kosmetische Hautanalysen messen den aktuellen Zustand deiner Haut — Feuchtigkeit, Talg, Pigmentierung etc. — und reagieren darauf. Die genetische Hautanalyse zeigt dir dagegen, welche Eigenschaften und Schwachstellen DAUERHAFT in deinen Genen angelegt sind. Du kannst gezielt vorbeugen, statt erst zu reagieren, wenn Probleme sichtbar werden.',
          },
          {
            q: 'Wie viele Gene werden in der Analyse berücksichtigt?',
            a: 'Über 20 hautrelevante Gen-Varianten. Die wichtigsten Bereiche: MMP1 (Kollagenabbau, Faltenbildung), MC1R (UV-Empfindlichkeit, Pigmentierung), FLG (Filaggrin, Hautfeuchtigkeit/Barriere), SOD2/CAT/GPX (antioxidativer Schutz), Entzündungs-Gene wie IL6, TNF-α.',
          },
          {
            q: 'Wie lange ist mein Ergebnis gültig?',
            a: 'Deine Gene ändern sich nicht im Lauf des Lebens — daher bleiben die Kern-Ergebnisse dauerhaft gültig. Was sich verfeinert: die Auswertung selbst, weil laufend neue wissenschaftliche Erkenntnisse einfließen. Eine Wiederholung des Tests ist nicht nötig, sondern nur ein Update der Auswertung.',
          },
        ],
      },
      {
        title: 'Genetik & Hautalterung — verstehen, was die Ergebnisse bedeuten',
        items: [
          {
            q: 'Was bedeutet eine „aktive" MMP1-Variante?',
            a: 'MMP1 (Matrix-Metalloproteinase 1) baut Kollagen in der Haut ab. Eine genetisch sehr aktive Variante führt zu schnellerem Kollagenabbau — die Haut verliert früher an Spannkraft, Falten entstehen schneller. Gegenmaßnahmen: konsequenter UV-Schutz, Antioxidantien, kein Rauchen, ggf. Retinoide oder peptidbasierte Pflege.',
          },
          {
            q: 'Was sagt mein MC1R-Gen über UV-Empfindlichkeit aus?',
            a: 'MC1R steuert die Produktion von Eumelanin (dunkles Pigment, schützt vor UV) versus Phäomelanin (rötliches Pigment, erzeugt bei UV-Belastung freie Radikale). Ungünstige Varianten: schneller Sonnenbrand, höheres Risiko für UV-Schäden und Hautkrebs — striktere Sonnencreme-Disziplin nötig.',
          },
          {
            q: 'Warum ist FLG (Filaggrin) für meine Hautpflege wichtig?',
            a: 'FLG produziert Filaggrin, ein Protein, das die natürliche Hautbarriere zusammenhält und Feuchtigkeit bindet. Bei genetisch reduzierter FLG-Aktivität ist die Hautbarriere schwächer — Feuchtigkeit geht schneller verloren, Reizstoffe dringen leichter ein. Empfehlung: barriere­stärkende Pflege (Ceramide, Cholesterol, freie Fettsäuren), milde Reiniger, keine austrocknenden Tenside.',
          },
          {
            q: 'Wirkt sich das alles wirklich messbar auf mein Aussehen aus?',
            a: 'Ja, aber nicht von heute auf morgen. Genetische Schwachstellen summieren sich über Jahre. Zwei Menschen gleichen Alters können sich biologisch um 10-15 Jahre unterscheiden — abhängig davon, wie gut sie ihre genetischen Schwachstellen mit Lebensstil ausgleichen.',
          },
        ],
      },
      {
        title: 'Praktische Empfehlungen & Erwartungen',
        items: [
          {
            q: 'Wie schnell merke ich eine Wirkung der personalisierten Pflege?',
            a: 'Manche Effekte zeigen sich in Wochen (Feuchtigkeit, Glow, Hautirritation), andere erst nach Monaten bis Jahren (Faltenbildung, Pigmentierung, Hautstruktur). Die personalisierte Pflege ist keine schnelle Reparatur, sondern eine langfristige Schutzstrategie.',
          },
          {
            q: 'Brauche ich teure Cremes?',
            a: 'Nicht zwingend. Wichtig sind die richtigen Wirkstoffe für deine genetische Veranlagung — und die gibt es in jeder Preisklasse. Was zählt: die Wirkstoff-Konzentration, die Formulierung und die Konsistenz der Anwendung. Eine günstige Vitamin-C-Lösung kann besser wirken als eine teure Creme ohne aktive Wirkstoffe.',
          },
          {
            q: 'Ist mein Lebensstil wichtiger als meine Gene?',
            a: 'Beides wirkt zusammen. Gene legen das Potenzial und die Schwachstellen fest — Lebensstil entscheidet, wie weit du diese Schwachstellen ausgleichst oder verstärkst. Faustregel: bei genetisch ungünstiger Veranlagung ist konsequenter Lebensstil noch wichtiger als bei „glücklichen Genen".',
          },
        ],
      },
    ],
    documents: [
      {
        title: 'NovoAcademy FAQ PDF - Gesunde Haut und Aussehen',
        size: '121 KB',
        type: 'pdf',
        url: '/course-materials/beauty/Novogenia_FAQ_Gesunde_Haut.pdf',
      },
    ],
    hasDownload: true, hasText: false,
    initialWatched: false,
  },

  /* ======== Weitere Analysen ======== */
  {
    id: 'pharma-sci',
    uid: '0a68b1da-1704-4e8a-b9c9-201447417cfc',
    lang: 'de',
    category: 'Medikamentenunverträglichkeit',
    topic: 'Wissenschaftliche Basis',
    contentType: 'supplementary',
    videos: [],
    description: 'Schulungsfolien zur Pharmakogenetik — als PowerPoint zum Selbststudium.',
    longDescription:
      'Die offiziellen Novogenia-Schulungsfolien zur Pharmakogenetik. Aus dem Master-Foliensatz extrahiert, Animationen erhalten. Wie genetische Varianten den Abbau und die Wirkung von Medikamenten beeinflussen — und warum ein Medikament bei verschiedenen Menschen unterschiedlich wirkt.',
    bullets: [
      'CYP-Enzyme & Medikamenten-Metabolismus',
      'Schnelle und langsame Metabolisierer',
      'Klinisch relevante Wirkstoffe (Antidepressiva, Schmerzmittel, Blutverdünner, …)',
      'Praktische Bedeutung in der Beratung',
    ],
    thumbnail: T(24),
    introQuestionsHeader: 'Die Schulungsfolien decken folgende Themen ab:',
    introQuestions: [
      'Warum wirken Medikamente bei verschiedenen Menschen unterschiedlich stark?',
      'Welche CYP-Enzyme sind für den Abbau der wichtigsten Wirkstoffe verantwortlich?',
      'Was bedeutet „schneller" vs. „langsamer Metabolisierer" im klinischen Alltag?',
      'Welche Medikamente sind besonders relevant für die pharmakogenetische Beratung?',
    ],
    articleSections: [
      {
        title: 'Schulungsfolien zum Download',
        paragraphs: [
          'Diese Schulungsfolien stammen aus dem zentralen Novogenia-Foliensatz „All Slides to use". Sie erklären die wissenschaftlichen Grundlagen der Pharmakogenetik: relevante CYP-Enzyme, klinisch wichtige Wirkstoffe, Studienlage und Beratungs-Beispiele. Animationen sind erhalten.',
          'Lade die PowerPoint herunter und gehe sie im eigenen Tempo durch. Du kannst die Folien auch für eigene Kunden-Präsentationen verwenden.',
        ],
      },
    ],
    documents: [
      {
        title: 'NovoAcademy Folien - Pharmakogenetik',
        size: '46 MB',
        type: 'pptx',        thumbnail: '/thumbnails/pptx-template.jpg',

        url: '/course-materials/pharmacogenetics/Schulungsfolien_Pharmacogenetics.pptx',
      },
      {
        title: 'NovoAcademy Demo Bericht - Pharmaco Sensor',
        size: '9 MB',
        type: 'pdf',
        url: '/course-materials/pharmacogenetics/Demo_Pharmaco_Sensor.pdf',
      },
      {
        title: 'NovoAcademy Science PDF - Koffein & CYP1A2-Genvariante (Beispiel Pharmakogenetik)',
        size: '244 KB',
        type: 'pdf',
        url: '/course-materials/scientific-reviews/Caffeine_Review.pdf',
      },
    ],
    hasDownload: true, hasText: true,
    initialWatched: false,
  },

  /* ======== Rechtssicheres Werben ======== */
  {
    id: 'legal-basics',
    uid: '2b3df589-ab71-4fe1-8ec2-26abbdae27a5',
    lang: 'de',
    category: 'Rechtlich sicher werben mit Produkten',
    topic: 'Werberichtlinie für Novogenia-Produkte',
    contentType: 'training',
    description: 'Welche Werbeaussagen für Genanalysen, Bluttests und Nahrungsergänzungen rechtlich sicher sind — und welche abmahnfähig sind.',
    longDescription:
      'Eine textbasierte Schulung (kein Video) zur rechtssicheren Bewerbung von Novogenia-Produkten. Quelle: Novogenia Werberichtlinie (08.04.2025). Du lernst, wie Abmahnungen ablaufen, welche Aussagen sicher sind, welche kritisch — und welche Best Practices Novogenia in 13 Jahren Praxis entwickelt hat.',
    bullets: [
      'Wie eine Abmahnung abläuft und was sie kostet',
      'Sichere vs. gewagte Werbeaussagen für Bluttests, Gentests und Nahrungsergänzungen',
      'Die EU-Health-Claims für Nahrungsergänzungen',
      'Umgang mit Kundenbewertungen und Testimonials',
    ],
    thumbnail: T(24),
    introQuestionsHeader: 'In dieser Schulung lernst du:',
    introQuestions: [
      'Wie Abmahnvereine arbeiten und welche Kosten drohen',
      'Welche Werbeaussagen für Bluttests rechtssicher sind',
      'Warum genetische Eigenschaften sicher beworben werden können, Handlungsempfehlungen aber kritisch sind',
      'Wie du Health-Claims für Nahrungsergänzungen korrekt anwendest',
      'Wie du Kundenbewertungen rechtssicher moderierst',
    ],
    /* Text-basierte Schulung — kein Video, statt dessen articleSections */
    articleSections: [
      {
        title: 'Werben mit Novogenia-Produkten',
        paragraphs: [
          'Novogenia befindet sich an der Spitze der wissenschaftlichen Möglichkeiten und bietet etablierte Analyseverfahren wie Bluttests, aber auch fortschrittliche Möglichkeiten wie Genanalysen und personalisierte Produkte an. Da wir uns hier im Gesundheitsbereich befinden, gibt es strenge Regeln für Werbeaussagen, die beachtet werden müssen. Besonders in Deutschland gibt es Abmahnvereine, die nach unklaren oder irreführenden Aussagen suchen und diese abmahnen.',
          'Wir sind fest überzeugt, dass unsere Empfehlungen effektiv sind und den fortgeschrittensten Stand der Wissenschaft berücksichtigen. Nur leider ist das, was ein Produkt kann und was man in der Werbung dazu behaupten darf, manchmal unterschiedlich.',
        ],
      },
      {
        title: 'Wie eine Abmahnung abläuft',
        paragraphs: [
          'Auslöser ist immer eine nicht erlaubte oder irreführende Werbeaussage. Üblicherweise ausgelöst werden solche Verfahren durch breit gestreute Werbung wie TV oder Magazineinschaltungen und Social-Media-Werbung. Bloße Webseiten oder Verkaufsunterlagen wie im Direktvertrieb sind unserer Information nach noch nicht abgemahnt worden. Laut Angaben der Abmahnvereine stecken dahinter meist Mitbewerber, die verdeckt gegen die Werbung vorgehen.',
          'Üblicherweise kommt ein Schreiben vom Abmahnverein, in dem bestimmte Aussagen als irreführend für den Kunden bezeichnet werden. Der Verein verlangt: die Unterfertigung einer Unterlassungserklärung, eine Gebühr von etwa 200 €, und bei Wiederverwendung der zu unterlassenden Werbeaussage eine Strafe von ca. 5.000 €.',
        ],
        bullets: [
          'Bei Unterfertigung der Unterlassungserklärung dürfen die beanstandeten Aussagen nicht mehr verwendet werden.',
          'Bei einem Gerichtsverfahren kann sich herausstellen, dass einzelne Aussagen verboten, andere zulässig sind.',
          'Vorteil eines Gerichtsverfahrens: anschließende Rechtssicherheit.',
          'In 13 Jahren Novogenia gab es 4 Abmahnungen: 2 Unternehmen unterschrieben und stellten den Verkauf ein, 2 ließen es vor Gericht klagen und führten den Verkauf ohne die beanstandeten Aussagen fort.',
        ],
        callout: 'Sollten Sie eine Abmahnung erhalten, melden Sie sich bitte sofort bei Novogenia — wir versuchen, Sie bestmöglich zu unterstützen.',
      },
      {
        title: 'Ihre Verantwortung als Partner oder Reseller',
        paragraphs: [
          'Novogenia kann für Ihre Werbeaussagen weder die Verantwortung noch eine Haftung übernehmen. Alle Werbeaktionen und wettbewerbsrelevante Aussagen für unsere Produkte unterliegen Ihrem alleinigen unternehmerischen Risiko. Wir teilen gerne unsere Erfahrungen und unterstützen Sie bei Abmahnungen — Rechtssicherheit oder Verantwortung können wir aber nicht übernehmen.',
        ],
      },
      {
        title: 'Werben mit Bluttests',
        paragraphs: [
          'Bluttests sind weit verbreitet und schon lange Standard — es gibt nur wenige Einschränkungen. Zulässige Werbeaussagen umfassen Produktbeschreibung, Ergebnis-Ableitungen, Wirkungsversprechen und Symptom-Beispiele. Sämtliche unten gelisteten Aussagen sind unkritisch.',
        ],
        bullets: [
          { tone: 'safe', text: '„Wir testen Blut."' },
          { tone: 'safe', text: '„Wir diagnostizieren Mängel."' },
          { tone: 'safe', text: '„Wir geben Mikronährstoff- und Ernährungsempfehlungen."' },
          { tone: 'safe', text: '„Wir personalisieren Nahrungsergänzungen nach dem Ergebnis."' },
          { tone: 'safe', text: 'Symptome eines Mangels (z. B. Müdigkeit bei Eisenmangel) — am besten mit Quellenverweis (z. B. Ärztekammer).' },
          { tone: 'safe', text: 'Testimonial: „Ich war oft müde, der Test hat Eisenmangel identifiziert und mir geholfen" — zulässig.' },
        ],
      },
      {
        title: 'Werben mit genetischen Tests',
        paragraphs: [
          'DNA-Analysen sind noch keine Standardmethode in allen Arztpraxen. Abmahnvereine kritisieren grundsätzlich Technologien, die nicht von der Mehrheit der Experten als sinnvoll erachtet werden. Deshalb steht die DNA-Analyse unter besonderer Beobachtung.',
          'Bei DNA-Analysen gibt es aus Sicht des Abmahnvereins zwei Bestandteile: die wissenschaftlich abgesicherte Analyse der genetischen Eigenschaften und das darauf basierende Handlungsprogramm. Beides ist sehr unterschiedlich zu bewerten.',
        ],
        bullets: [
          { tone: 'safe', text: 'Ermittlung der genetischen Eigenschaften und Abgleich mit aktueller Wissenschaft.' },
          { tone: 'critical', text: 'Konkrete Ernährungs-, Sport- oder Nahrungsergänzungs-Empfehlungen, die aus den Genen abgeleitet werden.' },
        ],
        callout: { tone: 'safe', text: 'Beispiel: „Gentest beweist, Folsäure ist wirkungslos" — zulässig (durch Studien belegt).' },
      },
      {
        title: 'Die sichere Variante — nur genetische Eigenschaften',
        paragraphs: [
          'Die sichere Variante konzentriert sich auf Aussagen, die sich ausschließlich auf die ermittelten genetischen Eigenschaften beschränken — ohne daraus konkrete Handlungs­empfehlungen abzuleiten. Alle folgenden Formulierungen sind aus Abmahn-Sicht unkritisch.',
        ],
        bullets: [
          { tone: 'safe', text: '„Wir analysieren deine Gene und ermitteln, ob du eher durch Fette oder Kohlenhydrate zunimmst."' },
          { tone: 'safe', text: '„Du findest heraus, ob du genetisch eher auf Sport oder Kalorienreduktion ansprichst."' },
          { tone: 'safe', text: '„Du erfährst, ob dein Körper Folsäure aktivieren kann, damit sie eine Wirkung hat."' },
          { tone: 'safe', text: '„Du erfährst, welche Talente dein Körper im Leistungssport hat und wie gut deine Muskeln auf Aufbautraining ansprechen."' },
        ],
      },
      {
        title: 'Die gewagtere Variante — Empfehlungen mit Disclaimer',
        paragraphs: [
          'In dieser Variante wird der Gentest wie oben beworben — zusätzlich werden Handlungs­empfehlungen kommuniziert, aber klar als logische Schlussfolgerungen, nicht als wissenschaftlich bestätigte Heil­versprechen. Mit Disclaimer markiert. Vorsicht: Disclaimer werden von Abmahnvereinen nicht immer akzeptiert.',
        ],
        bullets: [
          { tone: 'caveat', text: '„Wir analysieren deine Gene und ermitteln, ob du eher durch Fette oder Kohlenhydrate zunimmst. Darauf basierend erstellen wir logische Schlussfolgerungen und Ernährungspläne, um diese Erkenntnisse zu nutzen.*"' },
          { tone: 'caveat', text: '„Du erfährst, ob dein Körper Folsäure aktivieren kann. Darauf basierend empfehlen wir alternative Mikronährstoffe, die du stattdessen nehmen solltest.*"' },
          { tone: 'critical', text: 'GEGENBEISPIEL: „Nimm Methylfolat statt Folsäure" — ohne Disclaimer kritisch, weil die randomisierte Studie zu genau dieser konkreten Empfehlung fehlt.' },
        ],
        callout: { tone: 'caveat', text: '* Disclaimer-Hinweis: Die genetischen Eigenschaften sind wissenschaftlich bestätigt. Die daraus abgeleiteten Anpassungen der Mikronährstoff-Dosierung oder Ernährungsempfehlungen liegen für viele Effekte noch nicht im sogenannten Goldstandard (randomisierte, plazebokontrollierte Studien) vor und sind somit als experimentell zu verstehen.' },
      },
      {
        title: 'Werben mit personalisierter Nahrungsergänzung',
        paragraphs: [
          'Die Europäische Union hat einen klaren rechtlichen Rahmen für Behauptungen über die Wirkung von Nahrungsergänzungen geschaffen — die sogenannten Health Claims. Diese definieren exakt, welche Effekte für jeden Wirkstoff beworben werden können.',
          'Unabhängig davon, wie viel Wissenschaft hinter einem Effekt steht, ist es nicht erlaubt, diesen in der Werbung zu fördern, bis der Health Claim von der EFSA genehmigt wurde. Beschränken Sie sich daher auf die umfangreiche Liste der zulässigen Behauptungen.',
        ],
        bullets: [
          { tone: 'safe', text: 'Personalisierung nach Lebensstil und Blutwerten — unproblematisch.' },
          { tone: 'caveat', text: 'Personalisierung nach Genanalyse — nur mit Disclaimer (siehe gewagtere Variante).' },
          { tone: 'safe', text: 'Beispiel Health-Claim: „Trägt zu normaler Haut bei" (bei Zink), „Trägt zu normalem Immunsystem bei".' },
          { tone: 'safe', text: 'Beispiel Testimonial: „Ich nehme es, weil ich trockene Haut habe" — verbunden mit dem Health Claim Zink-Mangel-Effekt — zulässig.' },
          { tone: 'critical', text: 'NICHT zulässig: jede Behauptung, deren Health Claim nicht von der EFSA genehmigt wurde (z. B. „heilt deine Krankheit").' },
        ],
      },
      {
        title: 'Umgang mit Kundenbewertungen und Testimonials',
        paragraphs: [
          'Hat man ein Kundenbewertungs­system (z. B. auf der Website), hat man keine Kontrolle, ob ein Kunde unzulässige Aussagen trifft (z. B. „Produkt X hat mich geheilt"). Das ist grundsätzlich zulässig, muss aber besonders gehandhabt werden.',
        ],
        bullets: [
          { tone: 'safe', text: 'Eigenes moderierbares System: Klarer Hinweis, dass es sich um Kundenmeinungen handelt und Sie sich diese nicht zu eigen machen.' },
          { tone: 'safe', text: 'Aussagen, die gegen die Health-Claims-Verordnung verstoßen, sollten gelöscht werden.' },
          { tone: 'safe', text: 'Bei massiv falscher Bewertung: korrigierende Antwort des Unternehmens anfügen.' },
          { tone: 'caveat', text: 'Externes nicht-moderierbares System: Klar deklarieren, falsche Aussagen nicht gezielt nach oben filtern oder hervorheben.' },
          { tone: 'critical', text: 'Falsche Aussagen aktiv promoten oder hervorheben — selbst wenn es Kundenstimmen sind.' },
        ],
      },
    ],
    /* Test for Werberichtlinie — 10 Fragen aus dem PDF */
    questions: [
      {
        q: 'Wie hoch ist eine typische Erstgebühr eines Abmahnvereins bei einer Abmahnung?',
        options: ['Etwa 50 €', 'Etwa 200 €', 'Etwa 1.000 €', 'Etwa 5.000 €'],
        correct: 1,
      },
      {
        q: 'Wie hoch ist die typische Strafe bei Wiederverwendung einer beanstandeten Werbeaussage?',
        options: ['Etwa 200 €', 'Etwa 1.000 €', 'Etwa 5.000 €', 'Etwa 50.000 €'],
        correct: 2,
      },
      {
        q: 'Welche Werbeformen führen typischerweise zu Abmahnungen?',
        options: [
          'Direktvertrieb-Verkaufsunterlagen und mündliche Beratung',
          'Breit gestreute Werbung wie TV, Magazine und Social Media',
          'Nur Print-Werbung',
          'Ausschließlich Webseiten ohne Werbeschaltung',
        ],
        correct: 1,
      },
      {
        q: 'Welcher Teil einer DNA-Analyse ist aus Sicht des Abmahnvereins typischerweise UNkritisch?',
        options: [
          'Die konkreten Ernährungs- und Sportpläne',
          'Die personalisierten Mikronährstoff-Empfehlungen',
          'Die wissenschaftliche Analyse der genetischen Eigenschaften',
          'Alle Aussagen über DNA-Tests sind kritisch',
        ],
        correct: 2,
      },
      {
        q: 'Welcher Teil einer DNA-Analyse ist typischerweise KRITISCH?',
        options: [
          'Die Ermittlung der Genvarianten',
          'Die daraus abgeleiteten konkreten Handlungspläne (Ernährung, Sport, Supplemente)',
          'Die Probenentnahme im Labor',
          'Die Erklärung der Wissenschaft im Bericht',
        ],
        correct: 1,
      },
      {
        q: 'Welche Aussage zur Folsäure ist nach Werberichtlinie SICHER?',
        options: [
          '„Nimm Methylfolat statt Folsäure — sie wirkt besser bei dir."',
          '„Du erfährst, ob dein Körper Folsäure aktivieren kann, damit sie eine Wirkung hat."',
          '„Unser Test ersetzt einen Arztbesuch zum Thema Folsäure."',
          '„Folsäure ist generell wirkungslos."',
        ],
        correct: 1,
      },
      {
        q: 'Was sind „Health Claims" laut EU-Verordnung?',
        options: [
          'Eine Liste verbotener Werbeaussagen',
          'Ein Rahmenwerk genau definierter Wirkungsbehauptungen, die für Nahrungsergänzungen zulässig sind',
          'Studien zur klinischen Wirksamkeit',
          'Eine Selbsterklärung des Herstellers',
        ],
        correct: 1,
      },
      {
        q: 'Wer trägt rechtlich die Verantwortung für die Werbeaussagen eines Partners/Resellers?',
        options: [
          'Novogenia haftet vollständig',
          'Der Partner bzw. Reseller selbst — Novogenia übernimmt keine Haftung',
          'Die Abmahnvereine',
          'Niemand trägt Verantwortung',
        ],
        correct: 1,
      },
      {
        q: 'Wie sollte mit einer Kundenbewertung umgegangen werden, die einen unzulässigen Health Claim enthält (z. B. „Produkt hat mich geheilt")?',
        options: [
          'Bewertung unverändert stehen lassen — Kundenmeinungen sind immer rechtlich abgesichert',
          'Klar als Kundenmeinung deklarieren; bei moderierbarem System unzulässige Aussagen löschen oder mit korrigierender Antwort versehen',
          'Sofort alle Kundenbewertungen abschalten',
          'Den Kunden anzeigen',
        ],
        correct: 1,
      },
      {
        q: 'Welche Strategie für die Bewerbung der personalisierten Nahrungsergänzung ist UNkritisch?',
        options: [
          'Werbung mit konkreten Heilversprechen, die nicht im Health-Claims-Verzeichnis stehen',
          'Personalisierung auf Basis von Lebensstil und Blutwerten — beide sind unproblematisch',
          'Aussagen wie „heilt deine Krankheit"',
          'Werbung ohne Zutatenliste',
        ],
        correct: 1,
      },
    ],
    documents: [
      {
        title: 'NovoAcademy Science PDF - Novogenia Werberichtlinie',
        size: '4,0 MB',
        type: 'pdf',
        url: '/course-materials/legal-advertising/Novogenia_Werberichtlinie_DE.pdf',
      },
    ],
    hasDownload: true, hasText: true,
    initialWatched: false, initialTestPassed: false,
  },
]

/* Merge English courses (from data.en.js) into the main COURSES array.
   They carry `lang: 'en'`; German entries carry `lang: 'de'`. The active
   language is selected by the user via the language switcher and filtered
   in App.jsx. */
import { BRAND, brandText, brandPost, rebrandStrings, isHiddenCourse } from './brand.js'
import { COURSES_EN, MAIN_CATEGORIES_EN, SECTION_PRODUCT_LABELS_EN } from './data.en.js'
import { COURSES_CZ, MAIN_CATEGORIES_CZ, SECTION_PRODUCT_LABELS_CZ } from './data.cz.js'
import { COURSES_IT, MAIN_CATEGORIES_IT, SECTION_PRODUCT_LABELS_IT } from './data.it.js'
import { COURSES_FR, MAIN_CATEGORIES_FR, SECTION_PRODUCT_LABELS_FR } from './data.fr.js'
import { COURSES_PT, MAIN_CATEGORIES_PT, SECTION_PRODUCT_LABELS_PT } from './data.pt.js'
import { COURSES_NL, MAIN_CATEGORIES_NL, SECTION_PRODUCT_LABELS_NL } from './data.nl.js'
import { COURSES_RO, MAIN_CATEGORIES_RO, SECTION_PRODUCT_LABELS_RO } from './data.ro.js'
import { COURSES_ES, MAIN_CATEGORIES_ES, SECTION_PRODUCT_LABELS_ES } from './data.es.js'
import { COURSES_SR, MAIN_CATEGORIES_SR, SECTION_PRODUCT_LABELS_SR } from './data.sr.js'
import { COURSES_AR, MAIN_CATEGORIES_AR, SECTION_PRODUCT_LABELS_AR } from './data.ar.js'
import { UI_EXTRA } from './ui-extra.js'
COURSES.push(...COURSES_EN)
COURSES.push(...COURSES_CZ)
COURSES.push(...COURSES_IT)
COURSES.push(...COURSES_FR)
COURSES.push(...COURSES_PT)
COURSES.push(...COURSES_NL)
COURSES.push(...COURSES_RO)
COURSES.push(...COURSES_ES)
COURSES.push(...COURSES_SR)
COURSES.push(...COURSES_AR)

/* English fallback generic questions — used when an English course doesn't
   define its own (so the test page doesn't show German fragments). */
const GENERIC_QUESTIONS_EN = [
  {
    q: 'Which statement about genetic variants (SNPs) is correct?',
    options: [
      'SNPs are rare mutations that occur in only <0.1% of the population.',
      'SNPs are common single-letter DNA variations between people.',
      'SNPs only affect eye colour.',
      'SNPs are not inherited.',
    ],
    correct: 1,
  },
  {
    q: 'What role do genes play in personalised consultation?',
    options: [
      'They predict the future with absolute certainty.',
      'They reveal innate predispositions — strengths and weaknesses — that allow recommendations to be individualised.',
      'They make all general advice unnecessary.',
      'They have no practical relevance.',
    ],
    correct: 1,
  },
  {
    q: 'Which sentence best describes epigenetics?',
    options: [
      'A method that erases genes permanently.',
      'The control layer above the genes — lifestyle and environment can switch gene activity on or off without changing the DNA letters.',
      'The science of identical twins.',
      'A new way of cloning.',
    ],
    correct: 1,
  },
  {
    q: 'Why is a slow caffeine breaker (CYP1A2 defect) at higher cardiovascular risk from coffee?',
    options: [
      'Caffeine stays active longer and prolongs blood-pressure peaks; the protective polyphenols still help — decaf preserves the benefit.',
      'Coffee directly destroys arteries in slow breakers.',
      'Slow breakers are immune to caffeine.',
      'The statement is false; coffee always lowers blood pressure.',
    ],
    correct: 0,
  },
  {
    q: 'Which client benefits the most from personalised supplementation?',
    options: [
      'Only top athletes.',
      'Anyone whose lifestyle, sex, age, or genetic make-up differs from the "average person" the standard pills are designed for — i.e. almost everyone.',
      'Only senior citizens.',
      'Only people with diagnosed deficiencies.',
    ],
    correct: 1,
  },
]

/* For each course, fill in defaults only where not explicitly set on the course.
   Placeholder courses are skipped — they intentionally have minimal data. */
COURSES.forEach(c => {
  if (c.contentType === 'placeholder') return
  if (c.contentType !== 'supplementary' && c.contentType !== 'faq' && !c.questions) {
    /* Frueher wurde hier still GENERIC_QUESTIONS zugewiesen — ein Prototyp-Test
       ohne Bezug zum Kursinhalt. Zwei deutsche Kurse (nut-report, tx-report)
       zertifizierten dadurch jahrelang mit fachfremden Fragen, ohne dass es
       jemandem auffiel. Statt still einzuspringen jetzt laut warnen: der Kurs
       bleibt ohne Test (und damit nicht bestehbar), der Fehler ist sichtbar. */
    console.warn(
      `[data] Kurs "${c.id}" (${c.lang || 'de'}) ist zertifizierbar, hat aber keinen Test. ` +
      `Bitte einen kursspezifischen questions-Block ergaenzen.`
    )
  }
  if (!c.videos) c.videos = GENERIC_VIDEOS
  if (!c.documents) c.documents = GENERIC_DOCS
})

/* ============ DISPLAY STRUCTURE — Main categories with sub-sections ============
   The home page renders in a 2-level hierarchy:
     Main Category (big heading)
       └─ Section (sub-heading + course tiles)
   SECTION_PRODUCT_LABELS adds a product-name suffix to the section heading. */
export const SECTION_PRODUCT_LABELS = {
  'Die Gen-Diät': 'Shape, Weight Sensor',
  'Gesund ernähren nach den Genen': 'Nutrition, Nutrition Sensor',
  'Sportliche Leistung': 'Performance, Performance Sensor',
  'Entgiftung': 'Detox, Toxo Sensor',
  'Burnout und Stress': 'Burnout',
  'Biologisches Alter': 'Bio Age, Biological Age Sensor',
  'Personalisierte Nahrungsergänzung': 'Novodailies, Nutrime Complete',
  'Gesunde Haut und Aussehen': 'Beauty, Beauty Sensor',
  'Medikamentenunverträglichkeit': 'Pharmaco Sensor, Drug Response',
}

export const MAIN_CATEGORIES = [
  {
    title: 'Lifestyle DNA-Analysen',
    sections: [
      'Die Gen-Diät',
      'Gesund ernähren nach den Genen',
      'Sportliche Leistung',
      'Entgiftung',
      'Burnout und Stress',
      'Biologisches Alter',
    ],
  },
  {
    title: 'Personalisierte Nahrungsergänzung',
    sections: [
      'Personalisierte Nahrungsergänzung',
    ],
  },
  {
    title: 'Beauty',
    sections: [
      'Gesunde Haut und Aussehen',
    ],
  },
  {
    title: 'Weitere Analysen',
    sections: [
      'Medikamentenunverträglichkeit',
    ],
  },
  {
    title: 'Schulungen für Partner und Reseller',
    sections: [
      'Rechtlich sicher werben mit Produkten',
    ],
  },
]

/* Computed helpers */
export const isCertifiable = (course) =>
  course.contentType !== 'supplementary' && course.contentType !== 'faq'

/* Stable per-course key for user-state tracking.
   We always prefer `uid` (immutable). Falls back to `id` only for legacy data. */
export const courseKey = (course) => course?.uid || course?.id

/* Content tags shown under the course description.
   Returns an ordered array of tag descriptors: { label, className } */
export const getContentTags = (course) => {
  if (!course || course.contentType === 'placeholder') return []
  const tags = []
  // Only real documents (those with an actual URL — skips the GENERIC_DOCS defaults)
  const docs = (course.documents || []).filter(d => d && d.url)
  // VIDEO — course has a main video or non-trivial video segments
  const hasMainVideo = Boolean(course.youtubeId)
  const realSegments = (course.videoSegments || []).filter(s => s && s.youtubeId)
  if (hasMainVideo || realSegments.length > 0) {
    tags.push({ label: 'VIDEO', className: 'tag-video' })
  }
  // PowerPoint — any .pptx or document titled "POWERPOINT:"
  const hasPPT = docs.some(d => (d.type === 'pptx') || /POWERPOINT/i.test(d.title || ''))
  if (hasPPT) tags.push({ label: 'PowerPoint', className: 'tag-pptx' })
  // Demo PDF — any document with "Demo" or "Bericht" in title
  const hasDemo = docs.some(d => /\bdemo\b/i.test(d.title || '') || /\bbericht\b/i.test(d.title || ''))
  if (hasDemo) tags.push({ label: 'Demo PDF', className: 'tag-demo' })
  // Science PDF — Reviews, Studien, "Science PDF" im Titel (neue Naming-Konvention)
  const hasScience = docs.some(d => /(^|\s)(review|studie|wissenschaftlich)\b|\bscience pdf\b/i.test(d.title || ''))
  if (hasScience) tags.push({ label: 'Science PDF', className: 'tag-science' })
  // FAQ PDF — any document with "FAQ" in title
  const hasFaq = docs.some(d => /\bfaq\b/i.test(d.title || ''))
  if (hasFaq) tags.push({ label: 'FAQ PDF', className: 'tag-faq' })
  // Generic PDF Download — fallback for PDFs that don't fit Demo/Science/FAQ
  // (e.g. Werberichtlinie, Verträge, Onepager). Only added if no other
  // PDF tag (Demo/Science/FAQ) is already present.
  const alreadyHasPdfTag = tags.some(t => ['Demo PDF','Science PDF','FAQ PDF'].includes(t.label))
  if (!alreadyHasPdfTag) {
    const hasOtherPdf = docs.some(d => (d.type === 'pdf') && !/POWERPOINT/i.test(d.title || ''))
    if (hasOtherPdf) tags.push({ label: 'PDF Download', className: 'tag-pdf' })
  }
  return tags
}

export const isCertified = (course, state) => {
  if (!isCertifiable(course)) return false
  // State is keyed by the stable uid (immutable per-course identifier).
  // Falls back to id-keyed entries from legacy state if no uid match is found.
  const s = state[course.uid] || state[course.id]
  return Boolean(s?.watched && s?.testPassed)
}

/* Build initial state from course definitions.
   State is keyed by `uid` (stable per-course identifier) so renaming the
   human-readable `id` does NOT lose user progress. */
export const buildInitialState = () => {
  // Every new sign-up starts with a fully empty state — users have to
  // actually watch the modules and pass the tests to earn certification.
  // The legacy `initialWatched / initialTestPassed / initialTestScore`
  // fields on some COURSES are demo/sample seed data and are deliberately
  // ignored here. (Existing user progress is merged on top in App.jsx.)
  const state = {}
  for (const c of COURSES) {
    state[c.uid] = {
      watched: false,
      progress: 0,
      testPassed: false,
      testScore: 0,
    }
  }
  return state
}

/* Build a 2-level group tree for the home page:
     [
       { mainCategory: 'Lifestyle DNA-Analysen',
         sections: [
           { category: 'Die Gen-Diät', label: 'Shape, Weight Sensor', items: [...] },
           ...
         ]
       },
       ...
     ]
   Falls courses for unknown categories also get appended to a final "Sonstiges" main. */
/* Within a section, courses are sorted by TOPIC first so the canonical order is:
   Wissenschaftliche Basis → Beratungsschulung → Häufige Fragen → (others)
   ContentType is the secondary key (course → training → faq → supplementary → placeholder)
   for ties or unknown topics. */
const TOPIC_ORDER = {
  'Wissenschaftliche Basis': 0,
  'Beratungsschulung': 1,
  'Häufige Fragen': 2,
}
const CONTENT_TYPE_ORDER = { course: 0, training: 1, faq: 2, supplementary: 3, placeholder: 4 }
const sortBySectionConvention = (items) =>
  [...items].sort((a, b) => {
    const ta = TOPIC_ORDER[a.topic] ?? 9
    const tb = TOPIC_ORDER[b.topic] ?? 9
    if (ta !== tb) return ta - tb
    return (CONTENT_TYPE_ORDER[a.contentType] ?? 5) - (CONTENT_TYPE_ORDER[b.contentType] ?? 5)
  })

const MAIN_CATS_BY_LANG = { en: MAIN_CATEGORIES_EN, cz: MAIN_CATEGORIES_CZ, it: MAIN_CATEGORIES_IT, fr: MAIN_CATEGORIES_FR, pt: MAIN_CATEGORIES_PT, nl: MAIN_CATEGORIES_NL, ro: MAIN_CATEGORIES_RO, es: MAIN_CATEGORIES_ES, sr: MAIN_CATEGORIES_SR, ar: MAIN_CATEGORIES_AR }
const SEC_LABELS_BY_LANG = { en: SECTION_PRODUCT_LABELS_EN, cz: SECTION_PRODUCT_LABELS_CZ, it: SECTION_PRODUCT_LABELS_IT, fr: SECTION_PRODUCT_LABELS_FR, pt: SECTION_PRODUCT_LABELS_PT, nl: SECTION_PRODUCT_LABELS_NL, ro: SECTION_PRODUCT_LABELS_RO, es: SECTION_PRODUCT_LABELS_ES, sr: SECTION_PRODUCT_LABELS_SR, ar: SECTION_PRODUCT_LABELS_AR }
export const groupForDisplay = (lang = 'de') => {
  const mainCategoriesForLang = MAIN_CATS_BY_LANG[lang] || MAIN_CATEGORIES
  const sectionLabelsForLang  = SEC_LABELS_BY_LANG[lang] || SECTION_PRODUCT_LABELS

  const byCategory = new Map()
  for (const c of COURSES) {
    // Filter by language. Courses without lang are treated as 'de' (legacy).
    const courseLang = c.lang || 'de'
    if (courseLang !== lang) continue
    // Hide trainings that have no video yet (would show "VIDEO COMING SOON").
    // FAQ + supplementary courses carry no video by design and stay visible —
    // ebenso reine Artikelkurse (z.B. die Werberichtlinie): die haben
    // articleSections statt Video und sind vollständig nutzbar.
    if (c.contentType !== 'faq' && c.contentType !== 'supplementary' &&
        !(c.articleSections && c.articleSections.length) &&
        !c.youtubeId && !(c.videoSegments && c.videoSegments.length)) continue
    if (!byCategory.has(c.category)) byCategory.set(c.category, [])
    byCategory.get(c.category).push(c)
  }
  const mains = []
  const usedCategories = new Set()
  for (const main of mainCategoriesForLang) {
    const sections = []
    for (const cat of main.sections) {
      usedCategories.add(cat)
      const items = sortBySectionConvention(byCategory.get(cat) || [])
      if (items.length === 0) continue   // skip empty category sections
      sections.push({ category: cat, label: sectionLabelsForLang[cat] || '', items })
    }
    if (sections.length > 0) mains.push({ mainCategory: main.title, sections })
  }
  // Any leftover categories not part of MAIN_CATEGORIES → fallback "Sonstiges"/"Other"
  const leftover = []
  for (const [cat, items] of byCategory) {
    if (!usedCategories.has(cat) && items.length > 0) {
      leftover.push({ category: cat, label: sectionLabelsForLang[cat] || '', items: sortBySectionConvention(items) })
    }
  }
  if (leftover.length > 0) {
    mains.push({ mainCategory: lang === 'en' ? 'Other' : 'Sonstiges', sections: leftover })
  }
  return mains
}

/* Per-category long-form German content used on the Course Content Page */
export const CATEGORY_CONTENT = {
  'Die Gen-Diät': {
    whyHeading: 'Warum Gene beim Gewichtsmanagement eine Rolle spielen',
    whyText:
      'Das Körpergewicht eines Menschen wird zu einem überraschend hohen Anteil von genetischen Faktoren mitbestimmt — Studien beziffern den Einfluss der Veranlagung auf etwa 40 bis 70 Prozent. Gene steuern den Grundumsatz, die Effizienz der Fettverwertung, das Sättigungsempfinden und die Reaktion des Stoffwechsels auf bestimmte Lebensmittelgruppen. Diese Anlagen sind jedoch kein Schicksal: Sie zeigen lediglich, mit welchen Strategien ein Mensch besonders gut zurechtkommt — und welche Wege eher in den Frust führen. Wer seine Veranlagungen kennt, kann Ernährung, Bewegung und Lebensstil gezielt darauf abstimmen, statt sich an Standardempfehlungen abzuarbeiten.',
    moreText:
      'Konkret werten wir mehrere Schlüsselgene aus: FTO und MC4R für die Sättigungs­regulation, PPARG und ADRB2 für den Fettstoffwechsel sowie APOA2 für die Reaktion auf gesättigte Fettsäuren. Aus dem Zusammenspiel dieser Varianten entsteht ein individuelles Stoffwechsel-Profil — die Grundlage für jede seriöse, personalisierte Beratung im Bereich Gewichtsmanagement.',
    resultsHeading: 'Welche Ergebnisse liefert ein genetischer Test zum Gewichtsmanagement?',
    resultsText:
      'Der Kunde erhält eine personalisierte Auswertung mit Empfehlungen zum optimalen Verhältnis von Kohlenhydraten, Fetten und Eiweiß, zur idealen Trainingsform (Ausdauer, Kraft oder Mischtraining), zu seinem Heißhunger-Risiko sowie zu seiner Anfälligkeit für den Jojo-Effekt. Diese Ergebnisse werden in einem übersichtlichen Bericht aufbereitet, den der Partner oder Reseller gemeinsam mit dem Kunden in einer Beratungssitzung Schritt für Schritt durchgeht.',
  },
  'Genetik der gesunden Ernährung': {
    whyHeading: 'Warum Gene bei der Ernährung eine Rolle spielen',
    whyText:
      'Wir alle reagieren unterschiedlich auf Lebensmittel — was beim einen Energie liefert, kann bei anderen Müdigkeit, Verdauungs­beschwerden oder Heißhunger auslösen. Diese individuellen Reaktionen sind zu einem großen Teil genetisch verankert. Variationen in Genen wie MTHFR, COMT oder VDR bestimmen, wie effizient der Körper Vitamine, Mineralstoffe und sekundäre Pflanzenstoffe nutzen kann. Eine personalisierte Ernährungsberatung berücksichtigt diese Unterschiede und ersetzt One-size-fits-all-Empfehlungen durch Strategien, die zur tatsächlichen Veranlagung passen.',
    moreText:
      'Weitere relevante Faktoren sind die genetische Veranlagung zur Laktose- oder Glutenverträglichkeit, die Effizienz der Folsäure-Verwertung sowie die individuelle Sensitivität gegenüber Koffein und Salz. Aus diesen Bausteinen entsteht ein detailliertes Ernährungs­profil — die Basis für wissenschaftlich fundierte, alltagstaugliche Empfehlungen.',
    resultsHeading: 'Welche Ergebnisse liefert ein genetischer Test zur gesunden Ernährung?',
    resultsText:
      'Die Auswertung zeigt dem Kunden, welche Lebensmittel­gruppen besonders gut zu seinem Stoffwechsel passen, ob Unverträglichkeiten oder erhöhte Bedarfe vorliegen und welche Mikronährstoffe gezielt ergänzt werden sollten. Konkret werden zum Beispiel der Bedarf an Folsäure, Vitamin D, Omega-3 und B-Vitaminen ausgewertet, ebenso die Eignung für mediterrane, vegetarische oder Low-Carb-Ernährungs­stile.',
  },
  'Personalisierte Nahrungsergänzung': {
    whyHeading: 'Warum Gene bei personalisierter Nahrungs­ergänzung eine Rolle spielen',
    whyText:
      'Standard-Multivitamine enthalten oft viel von dem, was du nicht brauchst — und zu wenig von dem, was dein Körper wirklich benötigt. Genetische Veranlagungen entscheiden mit, welche Vitamine, Mineralstoffe und sekundären Pflanzenstoffe ein Mensch in welcher Menge tatsächlich verwerten kann. Eine personalisierte Rezeptur passt sich an diese Veranlagungen an und liefert exakt jene Wirkstoffe, die nachweisbar einen Unterschied machen — statt eines Einheitspräparats für alle.',
    moreText:
      'Wir berücksichtigen über 70 relevante SNPs aus den Bereichen Vitamin-Verwertung (z. B. MTHFR für Folsäure, VDR für Vitamin D), Antioxidantien-Bedarf, Entzündungs­regulation, Mitochondrien-Funktion und Detoxifikation. Aus diesem Profil generiert unser Algorithmus eine individuelle Tagesration, die täglich frisch produziert und versendet wird.',
    resultsHeading: 'Welche Ergebnisse liefert eine personalisierte Nahrungsergänzungs-Analyse?',
    resultsText:
      'Der Kunde erhält eine maßgeschneiderte Tages­mischung in praktischen Tagestütchen, abgestimmt auf seine genetische Veranlagung und seine aktuelle Lebenssituation. Im begleitenden Bericht werden die wichtigsten Risikofaktoren, der individuelle Mehrbedarf an Mikronährstoffen und konkrete Lifestyle-Empfehlungen aufgeführt — alles auf einen Blick und alltagstauglich aufbereitet.',
  },
  'Leistungs-Genetik': {
    whyHeading: 'Warum Gene bei sportlicher Leistung eine Rolle spielen',
    whyText:
      'Talent oder Training? Die Antwort liegt — wie so oft — im Zusammenspiel beider. Gene wie ACTN3, ACE oder COL5A1 beeinflussen, ob ein Mensch eher zur Sprint- oder Ausdauer-Disziplin neigt, wie schnell sein Bindegewebe regeneriert und wie hoch sein Verletzungsrisiko bei bestimmten Bewegungs­mustern ist. Wer seine Veranlagungen kennt, kann sein Training gezielter planen — und Frust durch suboptimale Trainings­formen vermeiden.',
    moreText:
      'Für den Sport-Bereich werten wir Gene aus den Kategorien Schnellkraft, Ausdauer, Regeneration, Verletzungsrisiko, VO₂max-Potenzial und Trainings­antwort aus. Aus dem Zusammenspiel ergibt sich ein individuelles Sport-Profil, das Coaches und Athleten klare Hinweise zur Trainings­periodisierung gibt.',
    resultsHeading: 'Welche Ergebnisse liefert ein genetischer Performance-Test?',
    resultsText:
      'Der Bericht zeigt dem Athleten, welcher Sportart-Typ er ist, welche Trainings­belastung er gut verträgt, wie schnell er sich nach intensiven Einheiten regeneriert und wo erhöhte Verletzungs­risiken bestehen. Die Empfehlungen sind in alltagstaugliche Sprache übersetzt — geeignet sowohl für Hobby­sportler:innen als auch für ambitionierte Wettkampf­athletinnen und -athleten.',
  },
  'Rechtlich sicher werben mit Produkten': {
    whyHeading: 'Warum rechtlich sicheres Werben für Partner und Reseller essenziell ist',
    whyText:
      'Genanalysen, Nahrungsergänzungen und Kalorienblocker bewegen sich rechtlich in einem sensiblen Umfeld: Heilmittelwerbegesetz (HWG), Health-Claims-Verordnung und das Lebensmittelinformations-Recht setzen klare Grenzen, was über diese Produkte gesagt — und vor allem versprochen — werden darf. Wer hier unbedacht formuliert, riskiert kostspielige Abmahnungen, Bußgelder und im schlimmsten Fall den Verlust der Vertriebs­erlaubnis. Diese Schulungs­reihe gibt dir das nötige Werkzeug, um deine Kunden sauber zu informieren, ohne in rechtliche Fallen zu tappen.',
    moreText:
      'Die Inhalte sind praxisnah aufbereitet: konkrete Formulierungs-Beispiele, was du sagen darfst und was nicht, eine Liste typischer Abmahn-Risiken, Vorlagen für Social-Media-Postings sowie eine Quellen-Liste der wichtigsten Urteile und behördlichen Hinweise. Sie ist kein Ersatz für anwaltliche Beratung im Einzelfall, deckt aber 90 % der täglichen Werbe- und Kommunikations­situationen ab.',
    resultsHeading: 'Was bringt dir diese Schulungsreihe?',
    resultsText:
      'Du lernst, wie du seriöse Werbe- und Beratungs­aussagen formulierst, ohne unzulässige Heilversprechen abzugeben. Du erhältst eine Checkliste „Erlaubt vs. abmahnfähig" für deine Werbe­materialien, einen Leitfaden für Beratungs­gespräche und eine Sammlung formulierungs-sicherer Health-Claims. Damit wirbst du wirksam und gleichzeitig rechts­konform.',
  },
}

/* ============ HOME-SEITE: BONUS-VIDEOSEKTION ============
   Letzte Sektion auf der Home-Seite — kursvorschau-große YouTube-Tiles.
   Kein Kurs, keine Zertifizierung — reine Inspirations-Inhalte.
   Sprach-spezifisch: DE = "Der Weg zum ewigen Leben", EN = Novogenia Tour. */
const HOME_VIDEO_DE = {
  category: 'Weitere relevante Inhalte',
  subtitle: '„Der WEG zum EWIGEN LEBEN?" — Longevity und der Fortschritt der Wissenschaft.',
  videos: [
    {
      youtubeId: 'jHgdDRGy0hA',
      title: 'Der WEG zum EWIGEN LEBEN?',
      /* YouTube serves no public thumbnails for this video (unlisted/private)
         — use a locally generated cover so the tile shows a proper preview. */
      coverImage: '/thumbnails/ewig-leben-cover.jpg',
    },
  ],
}
const HOME_VIDEO_EN = {
  category: 'Further Relevant Content',
  subtitle: 'See the technology behind the world\'s most advanced personalized products.',
  videos: [
    {
      youtubeId: 'yADG8aygIOI',
      title: 'Novogenia Tour — See the technology behind the world\'s most advanced personalized products',
    },
  ],
}
export const HOME_VIDEO_SECTION = HOME_VIDEO_DE          // default for legacy imports
const HOME_VIDEO_CZ = {
  category: 'Další relevantní obsah',
  subtitle: 'Podívej se na technologii za nejpokročilejšími personalizovanými produkty na světě.',
  videos: [{ youtubeId: 'yADG8aygIOI', title: 'Prohlídka Novogenie — technologie za nejpokročilejšími personalizovanými produkty na světě' }],
}
const HOME_VIDEO_FR = {
  category: 'Autres contenus pertinents',
  subtitle: 'Découvre la technologie derrière les produits personnalisés les plus avancés au monde.',
  videos: [{ youtubeId: 'yADG8aygIOI', title: 'Visite de Novogenia — la technologie derrière les produits personnalisés les plus avancés au monde' }],
}
const HOME_VIDEO_PT = {
  category: 'Outros conteúdos relevantes',
  subtitle: 'Vê a tecnologia por trás dos produtos personalizados mais avançados do mundo.',
  videos: [{ youtubeId: 'yADG8aygIOI', title: 'Visita à Novogenia — a tecnologia por trás dos produtos personalizados mais avançados do mundo' }],
}
// cz/fr/pt: no lip-sync version of the bonus/longevity video yet → hidden (empty videos).
const HOME_VIDEO_BY_LANG = {
  de: HOME_VIDEO_DE, en: HOME_VIDEO_EN,
  cz: { videos: [] }, fr: { videos: [] }, pt: { videos: [] },
  it: { videos: [] }, nl: { videos: [] }, ro: { videos: [] },
  es: { videos: [] }, sr: { videos: [] }, ar: { videos: [] },
}
/* Fallback auf LEER, nicht auf Englisch. Vorher fiel jede Sprache ohne eigenen
   Eintrag still auf die englische Bonus-Sektion zurück — it/nl/ro/es/sr/ar
   zeigten dadurch englische Videos mitten in der übersetzten Oberfläche.
   Eine neue Sprache zeigt jetzt lieber nichts als das Falsche. */
export const getHomeVideoSection = (lang = 'de') => HOME_VIDEO_BY_LANG[lang] || { videos: [] }
void [HOME_VIDEO_CZ, HOME_VIDEO_FR, HOME_VIDEO_PT]   // referenced (ready for lip-sync bonus videos)

/* ============ HOME-SEITE: TOP-WELCOME-VIDEOS ============
   Zwei nebeneinander stehende Video-Tiles oben auf der Home-Seite.
   DE: Einleitung NOVO ACADEMY + Firmen-Tour (Dr. Wallerstorfer auf Deutsch).
   EN: Welcome to Novogenia + Company Tour (Daniel auf Englisch). */
const HOME_TOP_VIDEOS_DE = [
  {
    youtubeId: '71EHqtv3NOA',
    title: 'Einleitung zur NOVO ACADEMY',
    sub: 'Wer ist Novogenia und was kann man in diesem Schulungsportal erwarten?',
  },
  {
    youtubeId: 'CFtFwezScLs',
    title: 'TOUR durch das UNTERNEHMEN',
    sub: 'Lass dir von Dr. Wallerstorfer zeigen, wie Genanalysen durchgeführt werden, wie personalisierte Nahrungsergänzung und Kosmetik produziert werden kann und wir von Probe und Rohstoffen zu fertigen Produkten kommen.',
    coverImage: '/thumbnails/firmentour-cover.jpg',
  },
]
const HOME_TOP_VIDEOS_EN = [
  {
    youtubeId: 'rDQBNTWt82Y',
    title: 'Welcome to NOVO ACADEMY',
    sub: 'Who is Novogenia and what to expect from this training portal — an introduction to the world of personalized genetics.',
  },
  {
    youtubeId: 'N9aEz_WAe1I',
    title: 'TOUR through the COMPANY',
    sub: 'Daniel Wallerstorfer guides you through Novogenia — see how genetic analyses are performed, how personalized supplements and cosmetics are produced, and how we go from sample and raw materials to finished products.',
  },
]
const HOME_TOP_VIDEOS_CZ = [
  { youtubeId: 'rDQBNTWt82Y', title: 'Vítejte v NOVO ACADEMY', sub: 'Kdo je Novogenia a co můžeš od tohoto vzdělávacího portálu očekávat — úvod do světa personalizované genetiky.' },
  { youtubeId: 'N9aEz_WAe1I', title: 'PROHLÍDKA SPOLEČNOSTI', sub: 'Daniel Wallerstorfer tě provede Novogenií — uvidíš, jak probíhají genetické analýzy, jak se vyrábějí personalizované doplňky stravy a kosmetika a jak se ze vzorku a surovin stávají hotové produkty.' },
]
const HOME_TOP_VIDEOS_FR = [
  { youtubeId: 'rDQBNTWt82Y', title: 'Bienvenue à NOVO ACADEMY', sub: 'Qui est Novogenia et à quoi t\'attendre sur ce portail de formation — une introduction au monde de la génétique personnalisée.' },
  { youtubeId: 'N9aEz_WAe1I', title: 'VISITE de l\'ENTREPRISE', sub: 'Daniel Wallerstorfer te fait visiter Novogenia — découvre comment sont réalisées les analyses génétiques, comment sont produits les compléments et cosmétiques personnalisés, et comment on passe de l\'échantillon et des matières premières aux produits finis.' },
]
const HOME_TOP_VIDEOS_PT = [
  { youtubeId: 'rDQBNTWt82Y', title: 'Bem-vindo à NOVO ACADEMY', sub: 'Quem é a Novogenia e o que esperar deste portal de formação — uma introdução ao mundo da genética personalizada.' },
  { youtubeId: 'N9aEz_WAe1I', title: 'VISITA à EMPRESA', sub: 'Daniel Wallerstorfer guia-te pela Novogenia — vê como são feitas as análises genéticas, como são produzidos os suplementos e cosméticos personalizados, e como passamos da amostra e matérias-primas aos produtos acabados.' },
]
// cz/fr/pt: intro/welcome videos have NO lip-sync version yet → hidden (no English fallback).
// The translated card texts above (HOME_TOP_VIDEOS_CZ/FR/PT) are kept ready: once the
// lip-sync intro videos are uploaded, set those entries' youtubeId and point the map back.
// it/nl/ro/es/sr/ar ebenfalls [] — sonst greift der EN-Fallback und zeigt englische Intro-Karten
const HOME_TOP_VIDEOS_BY_LANG = { de: HOME_TOP_VIDEOS_DE, en: HOME_TOP_VIDEOS_EN, cz: [], fr: [], pt: [], it: [], nl: [], ro: [], es: [], sr: [], ar: [] }
export const getHomeTopVideos = (lang = 'de') => HOME_TOP_VIDEOS_BY_LANG[lang] || HOME_TOP_VIDEOS_EN
void [HOME_TOP_VIDEOS_CZ, HOME_TOP_VIDEOS_FR, HOME_TOP_VIDEOS_PT]   // referenced (ready for lip-sync intros)

/* ============ I18N STRINGS ============
   Alle UI-Texte, die nicht aus den Kursdaten kommen. */
export const UI = {
  // ---- Home page ----
  home_courses_section_title: { de: 'DEINE ONLINE KURSE',         en: 'YOUR ONLINE COURSES' },
  home_courses_section_sub:   { de: 'Wähle ein Modul aus den folgenden Themen und beginne dein Training.',
                                en: 'Pick a module from the topics below and start your training.' },
  home_progress_of:           { de: 'von',                        en: 'of' },
  home_progress_label:        { de: 'verfügbaren Modulen absolviert',
                                en: 'available modules completed' },

  // ---- Certificate CTA ----
  cert_cta_title:             { de: 'Zertifikat erstellen',        en: 'Generate your certificate' },
  cert_cta_intro_a:           { de: 'Bestätige deinen Lernerfolg mit dem offiziellen ',
                                en: 'Confirm your learning progress with the official ' },
  cert_cta_intro_b:           { de: '-Zertifikat. Es enthält alle ',
                                en: ' certificate. It includes all of the ' },
  cert_cta_intro_c:           { de: ' abgeschlossenen und mit Test bestandenen Module deines Kontos und wird mit der Unterschrift von Dr. Daniel Wallerstorfer ausgestellt.',
                                en: ' modules in your account that you have completed and passed the test for, and is issued with the signature of Dr. Daniel Wallerstorfer.' },
  cert_cta_name_label:        { de: 'Name auf dem Zertifikat',     en: 'Name on the certificate' },
  cert_cta_name_placeholder:  { de: 'z. B. Maria Mustermann',      en: 'e.g. Jane Doe' },
  cert_cta_generate:          { de: 'Zertifikat generieren →',     en: 'Generate certificate →' },
  cert_cta_sample:            { de: 'Beispiel ansehen',            en: 'View example' },
  cert_cta_empty_hint:        { de: 'Du hast noch keine Kurse zertifiziert. Sieh dir ein Beispielzertifikat an.',
                                en: 'You haven\'t certified any courses yet. Take a look at the example certificate.' },
  cert_cta_name_placeholder_seal: { de: 'Dein Name hier',          en: 'Your name here' },

  // ---- Certificate mini ----
  cert_mini_presented:        { de: 'Dieses Zertifikat bestätigt, dass',
                                en: 'This certificate confirms that' },
  // Rollenzeile unter der Unterschrift. Lag bisher nur als INLINE_I18N-Eintrag
  // in App.jsx und war deshalb aus generateCert.js nicht erreichbar.
  cert_ceo_role:              { de: 'CEO von Novogenia',            en: 'CEO of Novogenia' },
  // Seitenzähler für mehrseitige Zertifikate. {n} und {total} werden ersetzt.
  cert_page_counter:          { de: ' (Seite {n} von {total})',     en: ' (page {n} of {total})' },
  cert_mini_genetik_coach:    { de: 'GENETIK COACH',               en: 'GENETICS COACH' },

  // ---- Course landing / content ----
  cl_back:                    { de: 'Zurück zur Akademie',         en: 'Back to the academy' },
  cl_tag_course:              { de: 'Kurs',                        en: 'Course' },
  cl_tag_training:            { de: 'Training',                    en: 'Training' },
  cl_tag_faq:                 { de: 'FAQ-Sammlung',                en: 'FAQ Collection' },
  cl_tag_supplementary:       { de: 'Zusatzmaterial',              en: 'Supplementary Material' },
  cl_certifiable_yes:         { de: 'Zertifizierbar — bestehst du den Test, fließt dieses Modul in dein Zertifikat ein.',
                                en: 'Certifiable — pass the test and this module is added to your certificate.' },
  cl_certifiable_no:          { de: 'Reines Zusatzmaterial — wird nicht im Zertifikat ausgewiesen.',
                                en: 'Supplementary material only — not listed on the certificate.' },
  cl_certified_done:          { de: '✓ Du hast dieses Modul bereits zertifiziert abgeschlossen.',
                                en: '✓ You have already completed this module with certification.' },
  cl_bullets_h_prefix:        { de: 'Was dieser ',                 en: 'What this ' },
  cl_bullets_h_suffix:        { de: ' dir vermittelt',             en: ' teaches you' },
  cl_start_course:            { de: 'Kurs starten',                en: 'Start course' },
  cl_start_training:          { de: 'Training starten',            en: 'Start training' },
  cl_open_faq:                { de: 'FAQ-Sammlung öffnen',         en: 'Open FAQ collection' },
  cl_open_material:           { de: 'Zusatzmaterial öffnen',       en: 'Open supplementary material' },
  cl_review:                  { de: 'Modul nochmal ansehen',       en: 'Review module again' },

  // ---- Course content page ----
  cc_back:                    { de: 'Zurück zur Übersicht',        en: 'Back to overview' },
  cc_video_optional:          { de: 'Optional ansehen — die Reihenfolge ist nicht zwingend.',
                                en: 'Optional viewing — order is not strict.' },
  cc_complete_module:         { de: 'Modul abschließen',           en: 'Complete module' },
  cc_complete_module_sub:     { de: 'Markiere das Modul als angesehen.',
                                en: 'Mark the module as watched.' },
  cc_start_test:              { de: 'Test beginnen',               en: 'Start the test' },
  cc_start_test_sub:          { de: 'Stelle dein Wissen unter Beweis und sichere dein Zertifikat',
                                en: 'Prove your knowledge and secure your certificate' },
  cc_videos_h:                { de: 'Lektion',                     en: 'Lesson' },
  cc_materials_h:             { de: 'Materialien & Downloads',     en: 'Materials & Downloads' },
  cc_articles_h:              { de: 'Lese-Material',               en: 'Reading material' },
  cc_faq_h:                   { de: 'Häufige Fragen',              en: 'Frequently Asked Questions' },

  // ---- Test page ----
  test_title_prefix:          { de: 'Test:',                       en: 'Test:' },
  test_q_label:               { de: 'Frage',                       en: 'Question' },
  test_back:                  { de: 'Zurück zum Kurs',             en: 'Back to course' },
  test_submit_a:              { de: 'Test abschließen (',          en: 'Finish test (' },
  test_submit_b:              { de: ' beantwortet)',               en: ' answered)' },
  test_intro:                 { de: 'Beantworte alle Fragen und schließe das Modul mit deinem Wissen ab.',
                                en: 'Answer all questions and finish the module with your knowledge.' },
  test_result_pass_title:     { de: 'Bestanden! 🎉',               en: 'Passed! 🎉' },
  test_result_fail_title:     { de: 'Nicht bestanden',             en: 'Not passed' },
  test_score_label:           { de: 'Deine Punkte:',               en: 'Your score:' },
  test_pass_threshold:        { de: 'Mindestens 70 % zum Bestehen.',
                                en: 'At least 70% to pass.' },
  test_retry:                 { de: 'Erneut versuchen',            en: 'Try again' },
  test_review_course:         { de: 'Kurs nochmal ansehen',        en: 'Review course again' },
  test_back_home:             { de: 'Zurück zur Akademie',         en: 'Back to the academy' },

  // ---- Certificate page ----
  certpage_back:              { de: 'Zurück',                       en: 'Back' },
  certpage_download:          { de: 'PDF herunterladen',            en: 'Download PDF' },
  certpage_print:             { de: 'Drucken',                       en: 'Print' },
  certpage_completed_on:      { de: 'Am',                            en: 'On' },
  certpage_completed_suffix:  { de: ' erfolgreich die folgenden Schulungsmodule absolviert und bestanden hat:',
                                en: ' successfully completed and passed the following training modules:' },
  certpage_presented_to:      { de: 'Dieses Zertifikat bestätigt, dass',
                                en: 'This certificate confirms that' },

  // ---- Sidebar (kept DE — internal partner platform; nicht Teil der EN-Akademie) ----

  // ---- Brand notice ----
  brand_notice_title:         { de: 'WICHTIG ZU WISSEN',           en: 'IMPORTANT TO KNOW' },
  brand_notice_text:          { de: 'Die Analyseprogramme gibt es unter verschiedenen Marken und in verschiedenen Ausführungen, also kann es sein, dass die Designs und Covers der in den Materialien gezeigten Berichte nicht 1:1 mit den eigenen Designs zusammenpassen. Diese Schulungen sind aber markenübergreifend gültig.',
                                en: 'The analysis programs come under various brands and in different versions, so the designs and covers of the reports shown in the materials may not match your own designs 1:1. These trainings are still valid across all brands.' },

  // ---- Misc ----
  misc_loading:               { de: 'Lade…',                       en: 'Loading…' },
  misc_other:                 { de: 'Sonstiges',                   en: 'Other' },

  // ---- Language picker (first visit) ----
  langpick_title:             { de: 'Sprache wählen',              en: 'Choose your language' },
  langpick_sub:               { de: 'Diese Auswahl kannst du später jederzeit ändern.',
                                en: 'You can change this later at any time.' },

  // ---- Landing page ----
  brand_coach:                { de: 'Genetik Coach',                en: 'Genetics Coach' },
  landing_hero_title:         { de: 'Werde Genetik Coach',           en: 'Become a Genetics Coach' },
  landing_hero_sub:           { de: 'Die offizielle Schulungsplattform von Novogenia. Lerne in deinem Tempo, schließe Module mit Tests ab und erhalte dein offizielles Zertifikat als Novogenia Genetik Coach.',
                                en: 'The official Novogenia training platform. Learn at your own pace, complete modules with tests, and earn your official Novogenia Genetics Coach certificate.' },
  landing_cta_signup:         { de: 'Kostenlos starten',            en: 'Get started for free' },
  landing_cta_login:          { de: 'Schon registriert? Anmelden',  en: 'Already registered? Sign in' },

  landing_feature_videos_t:   { de: '22 Online-Kurse',              en: '22 online courses' },
  landing_feature_videos_d:   { de: 'Von Dr. Daniel Wallerstorfer höchstpersönlich unterrichtet — Wissenschaft, Beratung und FAQs zu allen Novogenia-Analysen.',
                                en: 'Taught by Dr. Daniel Wallerstorfer himself — science, consultation and FAQs covering every Novogenia analysis.' },
  landing_feature_certs_t:    { de: 'Echtes Zertifikat',            en: 'Real certificate' },
  landing_feature_certs_d:    { de: 'Bestehe die Module mit Tests und erhalte dein personalisiertes Genetik-Coach-Zertifikat als PDF.',
                                en: 'Pass the module tests and download your personalised Genetics Coach certificate as a PDF.' },
  landing_feature_progress_t: { de: 'Fortschritt überall',          en: 'Progress across devices' },
  landing_feature_progress_d: { de: 'Dein Lernfortschritt wird in deinem Konto gespeichert — geräteübergreifend, jederzeit verfügbar.',
                                en: 'Your progress is saved to your account — available everywhere, on every device.' },
  landing_feature_pace_t:     { de: 'In deinem Tempo',              en: 'At your own pace' },
  landing_feature_pace_d:     { de: 'Beginne wann du willst, pausiere, mach weiter. Kein Stress, kein Zeitdruck.',
                                en: 'Start whenever you want, pause, continue. No stress, no deadlines.' },

  landing_who_title:          { de: 'Für wen ist die Akademie?',    en: 'Who is the academy for?' },
  landing_who_resellers:      { de: 'Partner und Reseller, die Novogenia-Analysen anbieten und ihre Kunden professionell beraten möchten.',
                                en: 'Partners and resellers who offer Novogenia analyses and want to consult their clients with confidence.' },
  landing_who_pros:           { de: 'Ernährungsberater, Coaches, Apotheker und Mediziner, die ihre Beratung um genetische Aspekte erweitern wollen.',
                                en: 'Nutritionists, coaches, pharmacists and physicians who want to add a genetic dimension to their practice.' },
  landing_who_curious:        { de: 'Alle, die verstehen wollen, wie Gene unsere Gesundheit, Ernährung, Leistung und Schönheit beeinflussen.',
                                en: 'Anyone who wants to understand how genes shape our health, nutrition, performance and beauty.' },

  // ---- Auth (signup / login) ----
  auth_signup_title:          { de: 'Konto erstellen',              en: 'Create your account' },
  auth_login_title:           { de: 'Anmelden',                     en: 'Sign in' },
  auth_signup_sub:            { de: 'Email und Passwort — fertig. Du bist in 10 Sekunden drin.',
                                en: 'Email and password — that\'s it. You\'re in within 10 seconds.' },
  auth_login_sub:             { de: 'Willkommen zurück. Setze dort fort, wo du aufgehört hast.',
                                en: 'Welcome back. Pick up where you left off.' },
  auth_email_label:           { de: 'Email',                        en: 'Email' },
  auth_email_placeholder:     { de: 'deine@email.com',              en: 'you@email.com' },
  auth_password_label:        { de: 'Passwort',                     en: 'Password' },
  auth_password_placeholder:  { de: 'Mindestens 8 Zeichen',         en: 'At least 8 characters' },
  auth_name_label:            { de: 'Dein Name',                    en: 'Your name' },
  auth_name_placeholder:      { de: 'z. B. Maria Mustermann',       en: 'e.g. Jane Doe' },
  auth_name_hint:             { de: 'Wird auf deinem Zertifikat angezeigt.',
                                en: 'Will appear on your certificate.' },
  auth_submit_signup:         { de: 'Konto erstellen →',            en: 'Create account →' },
  auth_submit_login:          { de: 'Anmelden →',                   en: 'Sign in →' },
  auth_or_continue_with:      { de: 'oder weiter mit',              en: 'or continue with' },
  auth_google:                { de: 'Mit Google fortfahren',        en: 'Continue with Google' },
  auth_switch_to_login:       { de: 'Schon registriert? Anmelden',  en: 'Already registered? Sign in' },
  auth_switch_to_signup:      { de: 'Neu hier? Konto erstellen',    en: 'New here? Create an account' },
  auth_error_invalid:         { de: 'Email oder Passwort ungültig.', en: 'Invalid email or password.' },
  // Sichtbarer Hinweis, wenn Fortschritt nicht gespeichert werden konnte —
  // vorher schluckte saveProgress den Fehler und der Nutzer merkte nichts.
  progress_save_failed:       { de: 'Dein Fortschritt konnte gerade nicht gespeichert werden. Prüfe deine Verbindung — der angezeigte Stand ist noch nicht in deinem Konto.',
                                en: 'Your progress could not be saved just now. Check your connection — what you see is not stored in your account yet.' },
  auth_error_rate_limited:    { de: 'Zu viele Anmeldeversuche. Bitte warte ein paar Minuten und versuche es erneut.',
                                en: 'Too many sign-in attempts. Please wait a few minutes and try again.' },
  auth_error_taken:           { de: 'Diese Email ist bereits registriert. Bitte melde dich an.',
                                en: 'This email is already registered. Please sign in instead.' },
  auth_error_weak:            { de: 'Passwort zu kurz (mindestens 8 Zeichen).',
                                en: 'Password too short (at least 8 characters).' },
  auth_loading:               { de: 'Bitte warten…',                en: 'Please wait…' },

  // ---- App: logout / user menu ----
  user_signed_in_as:          { de: 'Angemeldet als',               en: 'Signed in as' },
  user_logout:                { de: 'Abmelden',                     en: 'Sign out' },

  // ---- Admin area ----
  admin_title:                { de: 'Admin',                         en: 'Admin' },
  admin_back:                 { de: '← Zurück zur Akademie',         en: '← Back to the academy' },
  admin_tab_dashboard:        { de: 'Dashboard',                     en: 'Dashboard' },
  admin_tab_users:            { de: 'Nutzer',                        en: 'Users' },
  admin_stat_total_users:     { de: 'Nutzer gesamt',                 en: 'Total users' },
  admin_stat_new_7d:          { de: 'Neue in 7 Tagen',               en: 'New in last 7 days' },
  admin_stat_new_30d:         { de: 'Neue in 30 Tagen',              en: 'New in last 30 days' },
  admin_stat_active:          { de: 'Aktive (mind. 1 Kurs)',         en: 'Active (≥1 course watched)' },
  admin_stat_certified:       { de: 'Mit Zertifikat',                en: 'With certificate' },
  admin_stat_total_progress:  { de: 'Kurs-Abschlüsse total',         en: 'Total course completions' },
  admin_stat_lang_split:      { de: 'Sprachverteilung',              en: 'Language split' },
  admin_stat_growth:          { de: 'Nutzer-Wachstum (30 Tage)',     en: 'User growth (30 days)' },
  admin_users_search:         { de: 'Nach Email oder Name suchen…',  en: 'Search by email or name…' },
  admin_users_col_user:       { de: 'Nutzer',                        en: 'User' },
  admin_users_col_signup:     { de: 'Registriert',                   en: 'Signed up' },
  admin_users_col_lang:       { de: 'Sprache',                       en: 'Language' },
  admin_users_col_progress:   { de: 'Fortschritt',                   en: 'Progress' },
  admin_users_col_actions:    { de: 'Aktionen',                      en: 'Actions' },
  admin_user_admin_badge:     { de: 'ADMIN',                         en: 'ADMIN' },
  admin_user_expand:          { de: 'Kurse anzeigen',                en: 'Show courses' },
  admin_user_collapse:        { de: 'Einklappen',                    en: 'Collapse' },
  admin_course_state_done:    { de: 'Abgeschlossen',                 en: 'Completed' },
  admin_course_state_partial: { de: 'Nur angesehen',                 en: 'Watched only' },
  admin_course_state_open:    { de: 'Offen',                         en: 'Open' },
  admin_course_set_done:      { de: 'Auf abgeschlossen setzen',      en: 'Mark as completed' },
  admin_course_reset:         { de: 'Zurücksetzen',                  en: 'Reset to open' },
  admin_loading:              { de: 'Lade Nutzerdaten…',             en: 'Loading user data…' },
  admin_no_users:             { de: 'Keine Nutzer gefunden.',        en: 'No users found.' },
  admin_no_matches:           { de: 'Keine Treffer für die Suche.',  en: 'No matches for the search.' },

  // ---- Admin user actions ----
  admin_action_promote:       { de: 'Zum Admin machen',              en: 'Promote to admin' },
  admin_action_demote:        { de: 'Admin-Rechte entziehen',        en: 'Remove admin rights' },
  admin_action_rename:        { de: 'Name ändern',                   en: 'Rename' },
  admin_action_rename_prompt: { de: 'Neuer Name:',                   en: 'New name:' },
  admin_action_reset_all:     { de: 'Allen Fortschritt zurücksetzen', en: 'Reset all progress' },
  admin_action_reset_confirm: { de: 'Wirklich allen Kurs-Fortschritt dieses Nutzers löschen?',
                                en: 'Really wipe ALL course progress for this user?' },
  admin_action_delete:        { de: 'Nutzer entfernen',              en: 'Delete user' },
  admin_action_delete_confirm:{ de: 'Diesen Nutzer wirklich entfernen?\n\nDer Account bleibt zwar bestehen, wird aber aus der Admin-Liste ausgeblendet und alle Kurs-Fortschritte gelöscht.',
                                en: 'Really delete this user?\n\nThe account itself stays but disappears from the admin list and all course progress is deleted.' },
  admin_show_deleted:         { de: 'Gelöschte anzeigen',             en: 'Show deleted' },

  // ---- Cookie Banner ----
  cookie_title:               { de: 'Cookies & Datenschutz',          en: 'Cookies & Privacy' },
  cookie_text:                { de: 'Wir verwenden notwendige Cookies für den Login-Bereich. Für die eingebetteten YouTube-Videos werden zusätzlich Cookies von Google geladen — dafür bitten wir um Ihre Zustimmung.',
                                en: 'We use necessary cookies for the login area. Embedded YouTube videos load additional cookies from Google — we ask for your consent for these.' },
  cookie_accept_all:          { de: 'Alle akzeptieren',               en: 'Accept all' },
  cookie_necessary:           { de: 'Nur notwendige',                 en: 'Necessary only' },
  cookie_privacy_link:        { de: 'Datenschutzerklärung',           en: 'Privacy Policy' },
  cookie_yt_blocked:          { de: 'Video laden',                    en: 'Load video' },
  cookie_yt_blocked_hint:     { de: 'Erfordert YouTube-Cookies. Bitte Einwilligung erteilen.',
                                en: 'Requires YouTube cookies. Please give consent.' },
  cookie_yt_allow:            { de: 'Einwilligung erteilen',          en: 'Give consent' },
  cookie_settings:            { de: 'Cookie-Einstellungen',           en: 'Cookie settings' },
  cookie_revoke:              { de: 'Einwilligung widerrufen',        en: 'Revoke consent' },

  // ---- Footer / Legal ----
  /* KI-Kennzeichnung nach Art. 50 Abs. 4 KI-VO (VO (EU) 2024/1689), Pflicht seit 02.08.2026.
     Die Sprachfassungen außer de/en sind HeyGen-Lipsync-Dubs: Stimme und Lippenbewegungen
     einer REALEN Person werden KI-erzeugt — das ist ein Deepfake im Sinne von Art. 3 Nr. 60
     und muss offengelegt werden. de/en sind echte Aufnahmen und werden NICHT gekennzeichnet. */
  ai_dub_notice:              { de: 'KI-Hinweis: In dieser Sprachfassung wurden Stimme und Lippenbewegungen von Dr. Daniel Wallerstorfer mit künstlicher Intelligenz erzeugt. Die Originalaufnahme und der fachliche Inhalt stammen von ihm.',
                                en: 'AI disclosure: In this language version, Dr. Daniel Wallerstorfer’s voice and lip movements were generated using artificial intelligence. The original recording and the expert content are his.' },
  ai_dub_badge:               { de: 'KI-synchronisiert',              en: 'AI-dubbed' },
  ai_bot_notice:              { de: 'Sie chatten mit einem KI-Assistenten.', en: 'You are chatting with an AI assistant.' },
  footer_impressum:           { de: 'Impressum',                      en: 'Legal Notice' },
  footer_datenschutz:         { de: 'Datenschutz',                    en: 'Privacy Policy' },
  footer_back:                { de: '← Zurück',                       en: '← Back' },

  // ---- Impressum Page ----
  impressum_title:            { de: 'Impressum',                      en: 'Legal Notice' },
  impressum_operator:         { de: 'Betreiber',                      en: 'Operator' },
  impressum_managing:         { de: 'Geschäftsführung',               en: 'Managing Director' },
  impressum_register:         { de: 'Firmenbuch',                     en: 'Commercial Register' },
  impressum_uidde:            { de: 'UID',                            en: 'VAT ID' },
  impressum_authority:        { de: 'Aufsichtsbehörde',               en: 'Regulatory Authority' },

  /* Barrierefreiheitserklärung — Konformitätsinformation nach § 14 Abs. 2
     Barrierefreiheitsgesetz (BaFG, Umsetzung der Richtlinie (EU) 2019/882).
     Verlangt u.a. eine Kontaktstelle in schriftlicher UND mündlicher Form. */
  footer_a11y:                { de: 'Barrierefreiheit',               en: 'Accessibility' },
  a11y_title:                 { de: 'Erklärung zur Barrierefreiheit', en: 'Accessibility Statement' },
  a11y_intro:                 { de: 'Die Novogenia GmbH ist bemüht, die NOVO ACADEMY im Einklang mit dem österreichischen Barrierefreiheitsgesetz (BaFG) und der Richtlinie (EU) 2019/882 barrierefrei zugänglich zu machen.',
                                en: 'Novogenia GmbH strives to make NOVO ACADEMY accessible in accordance with the Austrian Accessibility Act (BaFG) and Directive (EU) 2019/882.' },
  a11y_standard_h:            { de: 'Angewandter Standard',           en: 'Standard applied' },
  a11y_standard_t:            { de: 'Maßstab ist die harmonisierte Norm EN 301 549, die auf die Web Content Accessibility Guidelines (WCAG) 2.1 Stufe AA verweist. Neue Entwicklungen orientieren sich bereits an WCAG 2.2 AA.',
                                en: 'The benchmark is the harmonised standard EN 301 549, which references the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. New development already follows WCAG 2.2 AA.' },
  a11y_state_h:               { de: 'Stand der Vereinbarkeit',        en: 'Conformance status' },
  a11y_state_t:               { de: 'Teilweise vereinbar. Die Plattform erfüllt die Anforderungen weitgehend; die unten genannten Punkte sind noch offen.',
                                en: 'Partially conformant. The platform largely meets the requirements; the items listed below are still outstanding.' },
  a11y_known_h:               { de: 'Bekannte Einschränkungen',       en: 'Known limitations' },
  a11y_known_1:               { de: 'Die Schulungsvideos verfügen derzeit nur über automatisch erzeugte Untertitel von YouTube. Manuell geprüfte Untertitel werden schrittweise ergänzt; neue Sprachfassungen erhalten sie vor Veröffentlichung.',
                                en: 'The training videos currently only have automatically generated YouTube captions. Manually reviewed captions are being added step by step; new language versions receive them before release.' },
  a11y_known_2:               { de: 'Die als Download angebotenen PDF-Unterlagen sind noch nicht durchgängig getaggt und daher mit Screenreadern eingeschränkt nutzbar.',
                                en: 'The PDF documents offered for download are not yet consistently tagged and are therefore of limited use with screen readers.' },
  a11y_feedback_h:            { de: 'Barriere melden — Kontaktstelle', en: 'Report a barrier — contact point' },
  a11y_feedback_t:            { de: 'Sie können Barrieren melden oder Inhalte in barrierefreier Form anfordern. Wir antworten in der Regel innerhalb von zehn Arbeitstagen.',
                                en: 'You can report barriers or request content in an accessible format. We usually respond within ten working days.' },
  a11y_enforce_h:             { de: 'Wenn wir nicht weiterhelfen',    en: 'If we cannot help' },
  a11y_enforce_t:             { de: 'Sind Sie mit unserer Antwort nicht zufrieden, können Sie sich an das Sozialministeriumservice (SMS) wenden, das die Einhaltung des Barrierefreiheitsgesetzes in Österreich überwacht.',
                                en: 'If you are not satisfied with our response, you may contact the Austrian Social Ministry Service (Sozialministeriumservice, SMS), which monitors compliance with the Accessibility Act in Austria.' },
  a11y_updated:               { de: 'Diese Erklärung wurde am 18. August 2026 erstellt und beruht auf einer Selbstbewertung.',
                                en: 'This statement was created on 18 August 2026 and is based on a self-assessment.' },
  impressum_applicable_law:   { de: 'Anwendbare Rechtsvorschriften',  en: 'Applicable Regulations' },
  impressum_contact:          { de: 'Kontakt',                        en: 'Contact' },
  impressum_liability:        { de: 'Haftungshinweis',                en: 'Liability Notice' },
  impressum_liability_text:   { de: 'Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.',
                                en: 'Despite careful content control, we assume no liability for the content of external links. The operators of linked pages are solely responsible for their content.' },

  // ---- Datenschutz Page ----
  datenschutz_title:          { de: 'Datenschutzerklärung',           en: 'Privacy Policy' },
}

export const t = (lang, key) => {
  /* Markenspezifische Texte der Instanz (brand.js) haben Vorrang. */
  const marke = brandText(lang, key)
  if (marke != null) return brandPost(lang, marke)
  const entry = UI[key]
  if (!entry) return key
  const ex = UI_EXTRA[lang]
  if (ex && ex[key] != null) return brandPost(lang, ex[key])
  return brandPost(lang, entry[lang] ?? entry.de ?? key)
}

/* Sample course list for the SAMPLE certificate */
export const SAMPLE_COURSE_LIST = [
  'Grundlagen der Genetik: Was ist DNA?',
  'Grundlagen der Genetik: Gene, Chromosomen & Genom',
  'Grundlagen der Genetik: So funktioniert eine DNA-Analyse',
  'Grundlagen der Genetik: SNPs erklärt',
  'Grundlagen der Genetik: Vererbung',
  'Grundlagen der Genetik: Epigenetik — Lebensstil prägt Gene',
]
export const SAMPLE_COURSE_LIST_EN = [
  'Genetics Basics: What is DNA?',
  'Genetics Basics: Genes, Chromosomes & Genome',
  'Genetics Basics: How a DNA Analysis Works',
  'Genetics Basics: SNPs Explained',
  'Genetics Basics: Heredity',
  'Genetics Basics: Epigenetics — Lifestyle Shapes Genes',
]
export const getSampleCourseList = (lang = 'de') => lang === 'de' ? SAMPLE_COURSE_LIST : SAMPLE_COURSE_LIST_EN

/* ============================================================
   ASSET PATH PREFIXING (production safe)
   ------------------------------------------------------------
   The app is deployed under /novo-academy/ on GitHub Pages.
   Raw absolute paths like '/thumbnails/01.jpg' would resolve to
   the wrong location. Vite doesn't auto-prefix raw strings in
   attribute values or fetch calls, so we walk the course data
   and prefix any asset path with import.meta.env.BASE_URL.

   Also exported as `assetUrl(path)` for direct use in components
   (e.g. <img src={assetUrl('/signature.png')} />).
   ============================================================ */
/* import.meta.env gibt es nur im Vite-Build. Der optionale Zugriff hält das
   Modul auch in reinem Node importierbar — davon lebt scripts/check-i18n.mjs. */
const BASE = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '')
export const assetUrl = (p) => (typeof p === 'string' && p.startsWith('/') ? BASE + p : p)

/* ============================================================
   prettyNameFromEmail(email)
   ----------------------------------------------------------
   Turn the local part of an email into a presentable display
   name — used as a default suggestion on the certificate when
   the user hasn't entered a proper name yet.

     'daniel@novogenia.com'               → 'Daniel'
     'daniel.wallerstorfer@gmail.com'     → 'Daniel Wallerstorfer'
     'daniel_wallerstorfer@gmail.com'     → 'Daniel Wallerstorfer'
     'daniel-w@gmail.com'                 → 'Daniel W'
     'daniel123@gmail.com'                → 'Daniel'
     'd.wallerstorfer+novo@gmail.com'     → 'D Wallerstorfer'
   ============================================================ */
export const prettyNameFromEmail = (email) => {
  if (!email || typeof email !== 'string') return ''
  const local = email.split('@')[0] || ''
  const cleaned = local
    .replace(/\+.*$/, '')   // strip the +tag part (daniel+novo → daniel)
    .replace(/\d+$/, '')    // strip trailing digits (daniel123 → daniel)
  const parts = cleaned.split(/[._\-\s]+/).filter(Boolean)
  if (parts.length === 0) return ''
  return parts
    .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(' ')
}

/** Decide the best display name for a user:
 *  – if a real `name` is present and isn't just the email, use it
 *  – otherwise derive one from the email
 *  – otherwise fall back to a generic '—' */
export const bestDisplayName = (name, email) => {
  if (name && name.trim() && name.trim().toLowerCase() !== (email || '').toLowerCase()) {
    return name.trim()
  }
  return prettyNameFromEmail(email) || name || email || ''
}

const ASSET_PATH_RE = /^\/(thumbnails|course-materials|fonts|cert-template|signature|novogenia-logo|style-assets)(\/|\.)/
const prefixAssetPaths = (obj) => {
  if (obj == null) return
  if (Array.isArray(obj)) { for (const item of obj) prefixAssetPaths(item); return }
  if (typeof obj !== 'object') return
  for (const key in obj) {
    const v = obj[key]
    if (typeof v === 'string' && ASSET_PATH_RE.test(v)) {
      obj[key] = BASE + v
    } else if (typeof v === 'object' && v !== null) {
      prefixAssetPaths(v)
    }
  }
}

// Mutate all asset-bearing exports in place (one-time pass at module load)
prefixAssetPaths(COURSES)              // includes COURSES_EN via push
prefixAssetPaths(HOME_TOP_VIDEOS_DE)
prefixAssetPaths(HOME_TOP_VIDEOS_EN)
prefixAssetPaths(HOME_VIDEO_DE)
prefixAssetPaths(HOME_VIDEO_EN)
// Instanz-Marke (brand.js): Kurse ausblenden, die es in dieser Instanz nicht gibt
for (let i = COURSES.length - 1; i >= 0; i--) if (isHiddenCourse(COURSES[i])) COURSES.splice(i, 1)
// Plattformname und Labor-Zusatz in Titeln/Beschreibungen
for (const o of [COURSES, HOME_TOP_VIDEOS_DE, HOME_TOP_VIDEOS_EN, HOME_VIDEO_DE, HOME_VIDEO_EN]) rebrandStrings(o)
/* „N online courses" auf der Startseite aus der tatsächlich sichtbaren Zahl —
   der feste Text „22" stimmte schon im Original für Englisch nicht (18 sichtbar). */
{
  const sichtbar = groupForDisplay(BRAND.lockedLang).reduce((n, m) => n + m.sections.reduce((k, s) => k + s.items.length, 0), 0)
  BRAND.text[BRAND.lockedLang] = { ...BRAND.text[BRAND.lockedLang], landing_feature_videos_t: `${sichtbar} online courses` }
}
