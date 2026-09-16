import React, { useState, useMemo, useRef, useEffect, useContext, createContext, lazy, Suspense } from 'react'
/* Heavy PDF libs (pdf-lib ~400 kB, pdfjs ~350 kB) are NOT part of the main bundle.
   generateCert.js is imported dynamically inside the download handler; the two
   canvas components are React.lazy so pdfjs only loads when a PDF is actually
   rendered (cert preview / document thumbnails). Both render nothing while
   loading, which matches their existing "no preview" fallback. */
const CertTemplateBg = lazy(() => import('./CertTemplateBg.jsx'))
const PdfThumbLazy = lazy(() => import('./PdfThumb.jsx'))
const PdfThumb = (props) => (
  <Suspense fallback={null}><PdfThumbLazy {...props} /></Suspense>
)
import SupportBotLauncher from './SupportBotLauncher.jsx'
import { BRAND, brandInline } from './brand.js'
import { COURSES, isCertifiable, isCertified, buildInitialState, groupForDisplay, SAMPLE_COURSE_LIST, CATEGORY_CONTENT, HOME_VIDEO_SECTION, getHomeVideoSection, getHomeTopVideos, getContentTags, courseKey, t as tBase, getSampleCourseList, assetUrl, bestDisplayName } from './data.js'
import {
  getCurrentSession, onAuthChange, signUpWithEmail, signInWithEmail,
  signInWithGoogle, signOut, loadProgress, saveProgress, isUsingRealSupabase,
  getMyProfile, updateMyLang, adminLoadAllUsers, adminSetUserCourseState,
  adminSetIsAdmin, adminUpdateUserName, adminResetAllProgress,
  adminSoftDeleteUser, adminUndeleteUser,
} from './auth.js'

/* ===================== I18N CONTEXT =====================
   Liefert die aktive Sprache an alle Komponenten ohne Prop-Drilling.
   `useT()` gibt eine t(key)-Funktion für die aktive Sprache zurück. */
const LangContext = createContext('de')
const useLang = () => useContext(LangContext)
const useT = () => {
  const lang = useLang()
  return (key) => tBase(lang, key)
}

/* Der eigentliche Inhaltsbereich einer Ansicht — zugleich Sprungziel des
   Skip-Links und die einzige main-Landmarke der Seite.
   Er MUSS je Ansicht unterhalb der Kopfzeile stehen: liegt er darüber, führt
   der Skip-Link direkt wieder in die Navigation (WCAG 2.4.1 verfehlt), und
   Kopf- und Fußbereich verlieren ihre banner-/contentinfo-Rolle, weil <header>
   und <footer> innerhalb von <main> nur noch generische Container sind. */
function Inhalt({ children }) {
  return <main id="main-content" tabIndex={-1} className="skip-target">{children}</main>
}

/* ===================== INLINE I18N =====================
   Some user-facing strings were originally written as inline
   `lang === 'en' ? <EN> : <DE>` ternaries. That left the four extra
   languages (it, cz, fr, pt) falling back to German. This table holds the
   it/cz/fr/pt translations, keyed by the EXACT English string (placeholders
   like ${...} kept verbatim), and `LX()` selects the right language. */
const INLINE_I18N = {
  "it": {
    "Previous": "Precedente",
    "Next": "Successivo",
    "Jane Doe": "Mario Rossi",
    "Play": "Riproduci",
    "▶ Playback (demo)": "▶ Riproduzione (demo)",
    "Back to course overview": "Torna alla panoramica del corso",
    "Click a question to reveal the answer — perfect for self-testing.": "Clicca su una domanda per scoprire la risposta — perfetto per l’autovalutazione.",
    "Complete FAQ collection as PDF": "Raccolta FAQ completa in PDF",
    "Download the entire collection as a Novogenia/Novodaily-branded PDF — perfect as a reference for consultation sessions or for printing.": "Scarica l’intera raccolta come PDF con marchio Novogenia/Novodaily — ideale come riferimento per i colloqui di consulenza o per la stampa.",
    "You have already gone through this FAQ collection.": "Hai già consultato questa raccolta di FAQ.",
    "When you have gone through all questions, you can mark the module as viewed.": "Quando hai esaminato tutte le domande, puoi contrassegnare il modulo come visualizzato.",
    "Complete module": "Completa il modulo",
    "Mark the FAQ collection as viewed": "Contrassegna la raccolta di FAQ come consultata",
    "CERTIFIABLE COURSE": "CORSO CERTIFICABILE",
    "SAFE": "SICURO",
    "CRITICAL": "CRITICO",
    "WITH DISCLAIMER": "CON AVVERTENZA",
    "IMPORTANT": "IMPORTANTE",
    "VIDEO COMING SOON": "VIDEO IN PREPARAZIONE",
    "A dedicated English video for this module has not been recorded yet. The training content and test below remain fully functional — the video segment will be added as soon as the recording is available.": "Un video dedicato a questo modulo è ancora in preparazione. I contenuti e il test qui sotto funzionano già perfettamente — il blocco video verrà aggiunto non appena la registrazione sarà disponibile.",
    "Documents to take with you": "Documenti da portare con te",
    "You have already successfully completed this module.": "Hai già completato con successo questo modulo.",
    "When you have watched all relevant content, complete the module and take your test.": "Quando hai visto tutti i contenuti rilevanti, completa il modulo e svolgi il test.",
    "Complete training": "Completa la formazione",
    "Mark this module as successfully completed": "Contrassegna questo modulo come completato con successo",
    "Start the test": "Inizia il test",
    "Prove your knowledge and secure your certificate": "Dimostra le tue conoscenze e ottieni il tuo certificato",
    "Test": "Test",
    "Screenshot coming": "Screenshot in arrivo",
    "Question": "Domanda",
    "Passed!": "Superato!",
    "Unfortunately not passed": "Purtroppo non superato",
    "To course overview": "Alla panoramica del corso",
    "All courses": "Tutti i corsi",
    "Try again": "Riprova",
    "Review course": "Rivedi il corso",
    "Failed to generate the PDF. Please try again.": "Impossibile generare il PDF. Riprova.",
    "You haven't answered all questions. Submit anyway?": "Non hai risposto a tutte le domande. Inviare comunque?",
    "Back": "Indietro",
    "User actions": "Azioni utente",
    "EXAMPLE": "ESEMPIO",
    "Generating...": "Generazione in corso...",
    "Download as PDF": "Scarica come PDF",
    "CEO of Novogenia": "CEO di Novogenia",
    "Skip to content": "Vai al contenuto",
    "Official training platform": "Piattaforma di formazione ufficiale",
    "Austria": "Austria",
    "Regional Court Salzburg": "Tribunale regionale di Salisburgo",
    "Federal Ministry for Social Affairs, Health, Care and Consumer Protection": "Ministero federale per gli Affari sociali, la Salute, l’Assistenza e la Tutela dei consumatori",
    "Austrian Trade Regulations 1994 (GewO), Genetic Technology Act (GTG), accessible via RIS Austria (ris.bka.gv.at).": "Regolamento austriaco sulle attività commerciali 1994 (GewO), Legge sulla tecnologia genetica (GTG), consultabili tramite RIS Austria (ris.bka.gv.at).",
    "Responsible Party": "Titolare del trattamento",
    "What data we process": "Quali dati trattiamo",
    "When you create an account, we store your e-mail address, your chosen display name, your language preference, and your course progress (which videos you watched and which tests you passed). This data is stored in Supabase (eu-central-1, Frankfurt, Germany) and processed exclusively for operating NOVO ACADEMY.": "Quando crei un account, memorizziamo il tuo indirizzo e-mail, il nome visualizzato scelto, la tua preferenza linguistica e i tuoi progressi nei corsi (quali video hai guardato e quali test hai superato). Questi dati sono archiviati in Supabase (eu-central-1, Francoforte, Germania) e trattati esclusivamente per il funzionamento di NOVO ACADEMY.",
    "Legal basis": "Base giuridica",
    "Processing is based on your consent (Art. 6(1)(a) GDPR) when you register, and on contract performance (Art. 6(1)(b) GDPR) for providing the academy service.": "Il trattamento si basa sul tuo consenso (art. 6, par. 1, lett. a, GDPR) al momento della registrazione e sull’esecuzione del contratto (art. 6, par. 1, lett. b, GDPR) per la fornitura del servizio dell’accademia.",
    "Cookies": "Cookie",
    "NOVO ACADEMY uses session cookies that are technically necessary for the login function (Supabase Auth). If you consent to optional cookies, embedded YouTube videos load additional cookies from Google/YouTube. You can withdraw your consent at any time.": "NOVO ACADEMY utilizza cookie di sessione tecnicamente necessari per la funzione di login (Supabase Auth). Se acconsenti ai cookie facoltativi, i video di YouTube incorporati caricano ulteriori cookie da Google/YouTube. Puoi revocare il tuo consenso in qualsiasi momento.",
    "Third-party services": "Fornitori terzi",
    "Auth & database (eu-central-1 Frankfurt, Germany). Privacy policy: supabase.com/privacy": "Autenticazione e database (eu-central-1 Francoforte, Germania). Informativa sulla privacy: supabase.com/privacy",
    "Video embedding (only with your consent). Privacy policy: policies.google.com/privacy": "Incorporamento video (solo con il tuo consenso). Informativa sulla privacy: policies.google.com/privacy",
    "Your rights": "I tuoi diritti",
    "You have the right to access, correct, delete, or export your data, and to lodge a complaint with the Austrian Data Protection Authority (Datenschutzbehörde, Barichgasse 40–42, 1030 Vienna, dsb.gv.at).": "Hai il diritto di accedere ai tuoi dati, di rettificarli, cancellarli o esportarli, nonché di presentare reclamo all’Autorità austriaca per la protezione dei dati (Datenschutzbehörde, Barichgasse 40–42, 1030 Vienna, dsb.gv.at).",
    "To exercise your rights, contact: datenschutz@novogenia.com": "Per esercitare i tuoi diritti, contatta: datenschutz@novogenia.com",
    "Local-only mode: accounts live in this browser. Configure Supabase to sync across devices.": "Modalità solo locale: gli account esistono solo in questo browser. Configura Supabase per sincronizzare tra più dispositivi."
  },
  "cz": {
    "Previous": "Předchozí",
    "Next": "Další",
    "Jane Doe": "Jan Novák",
    "Play": "Přehrát",
    "▶ Playback (demo)": "▶ Přehrávání (demo)",
    "Back to course overview": "Zpět na přehled kurzu",
    "Click a question to reveal the answer — perfect for self-testing.": "Klikni na otázku a zobraz odpověď — ideální pro vlastní testování.",
    "Complete FAQ collection as PDF": "Kompletní sbírka FAQ v PDF",
    "Download the entire collection as a Novogenia/Novodaily-branded PDF — perfect as a reference for consultation sessions or for printing.": "Stáhni si celou sbírku jako PDF se značkou Novogenia/Novodaily — ideální jako příručka pro konzultace nebo k vytištění.",
    "You have already gone through this FAQ collection.": "Tuto sbírku FAQ jsi již prošel.",
    "When you have gone through all questions, you can mark the module as viewed.": "Až projdeš všechny otázky, můžeš modul označit jako zhlédnutý.",
    "Complete module": "Dokončit modul",
    "Mark the FAQ collection as viewed": "Označ sbírku FAQ jako prohlédnutou",
    "CERTIFIABLE COURSE": "CERTIFIKOVATELNÝ KURZ",
    "SAFE": "BEZPEČNÉ",
    "CRITICAL": "KRITICKÉ",
    "WITH DISCLAIMER": "S UPOZORNĚNÍM",
    "IMPORTANT": "DŮLEŽITÉ",
    "VIDEO COMING SOON": "VIDEO SE PŘIPRAVUJE",
    "A dedicated English video for this module has not been recorded yet. The training content and test below remain fully functional — the video segment will be added as soon as the recording is available.": "Odpovídající video k tomuto modulu se zatím připravuje. Obsah a test níže již plně fungují — videoblok bude doplněn, jakmile bude nahrávka k dispozici.",
    "Documents to take with you": "Dokumenty s sebou",
    "You have already successfully completed this module.": "Tento modul jsi již úspěšně dokončil.",
    "When you have watched all relevant content, complete the module and take your test.": "Až si prohlédneš všechen relevantní obsah, dokonči modul a absolvuj svůj test.",
    "Complete training": "Dokončit školení",
    "Mark this module as successfully completed": "Označ tento modul jako úspěšně dokončený",
    "Start the test": "Zahájit test",
    "Prove your knowledge and secure your certificate": "Prokaž své znalosti a získej svůj certifikát",
    "Test": "Test",
    "Screenshot coming": "Snímek obrazovky bude doplněn",
    "Question": "Otázka",
    "Passed!": "Splněno!",
    "Unfortunately not passed": "Bohužel nesplněno",
    "To course overview": "Na přehled kurzu",
    "All courses": "Všechny kurzy",
    "Try again": "Zkusit znovu",
    "Review course": "Znovu si projít kurz",
    "Failed to generate the PDF. Please try again.": "PDF se nepodařilo vytvořit. Zkus to prosím znovu.",
    "You haven't answered all questions. Submit anyway?": "Neodpověděl jsi na všechny otázky. Přesto odeslat?",
    "Back": "Zpět",
    "User actions": "Akce uživatele",
    "EXAMPLE": "PŘÍKLAD",
    "Generating...": "Vytváří se...",
    "Download as PDF": "Stáhnout jako PDF",
    "CEO of Novogenia": "Generální ředitel Novogenia",
    "Skip to content": "Přejít na obsah",
    "Official training platform": "Oficiální školicí platforma",
    "Austria": "Rakousko",
    "Regional Court Salzburg": "Zemský soud Salcburk",
    "Federal Ministry for Social Affairs, Health, Care and Consumer Protection": "Spolkové ministerstvo pro sociální věci, zdraví, péči a ochranu spotřebitele",
    "Austrian Trade Regulations 1994 (GewO), Genetic Technology Act (GTG), accessible via RIS Austria (ris.bka.gv.at).": "Rakouský živnostenský řád 1994 (GewO), zákon o genové technologii (GTG), dostupné přes RIS Austria (ris.bka.gv.at).",
    "Responsible Party": "Správce",
    "What data we process": "Jaké údaje zpracováváme",
    "When you create an account, we store your e-mail address, your chosen display name, your language preference, and your course progress (which videos you watched and which tests you passed). This data is stored in Supabase (eu-central-1, Frankfurt, Germany) and processed exclusively for operating NOVO ACADEMY.": "Při vytvoření účtu ukládáme tvou e-mailovou adresu, zvolené zobrazované jméno, jazykové nastavení a tvůj pokrok v kurzech (která videa jsi zhlédl a které testy jsi splnil). Tyto údaje jsou uloženy v Supabase (eu-central-1, Frankfurt, Německo) a zpracovávány výhradně za účelem provozu NOVO ACADEMY.",
    "Legal basis": "Právní základ",
    "Processing is based on your consent (Art. 6(1)(a) GDPR) when you register, and on contract performance (Art. 6(1)(b) GDPR) for providing the academy service.": "Zpracování probíhá na základě tvého souhlasu (čl. 6 odst. 1 písm. a) GDPR) při registraci a za účelem plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR) pro poskytování služby akademie.",
    "Cookies": "Cookies",
    "NOVO ACADEMY uses session cookies that are technically necessary for the login function (Supabase Auth). If you consent to optional cookies, embedded YouTube videos load additional cookies from Google/YouTube. You can withdraw your consent at any time.": "NOVO ACADEMY používá relační cookies, které jsou technicky nezbytné pro funkci přihlášení (Supabase Auth). Pokud souhlasíš s volitelnými cookies, vložená videa z YouTube načítají další cookies od Google/YouTube. Svůj souhlas můžeš kdykoli odvolat.",
    "Third-party services": "Poskytovatelé třetích stran",
    "Auth & database (eu-central-1 Frankfurt, Germany). Privacy policy: supabase.com/privacy": "Autentizace a databáze (eu-central-1 Frankfurt, Německo). Ochrana osobních údajů: supabase.com/privacy",
    "Video embedding (only with your consent). Privacy policy: policies.google.com/privacy": "Vkládání videa (pouze s tvým souhlasem). Ochrana osobních údajů: policies.google.com/privacy",
    "Your rights": "Tvá práva",
    "You have the right to access, correct, delete, or export your data, and to lodge a complaint with the Austrian Data Protection Authority (Datenschutzbehörde, Barichgasse 40–42, 1030 Vienna, dsb.gv.at).": "Máš právo na přístup, opravu, výmaz nebo přenositelnost svých údajů a právo podat stížnost u rakouského úřadu pro ochranu osobních údajů (Datenschutzbehörde, Barichgasse 40–42, 1030 Vídeň, dsb.gv.at).",
    "To exercise your rights, contact: datenschutz@novogenia.com": "K uplatnění svých práv se obrať na: datenschutz@novogenia.com",
    "Local-only mode: accounts live in this browser. Configure Supabase to sync across devices.": "Pouze lokální režim: účty existují jen v tomto prohlížeči. Nakonfiguruj Supabase pro synchronizaci mezi zařízeními."
  },
  "fr": {
    "Previous": "Précédent",
    "Next": "Suivant",
    "Jane Doe": "Marie Dupont",
    "Play": "Lecture",
    "▶ Playback (demo)": "▶ Lecture (démo)",
    "Back to course overview": "Retour à l’aperçu du cours",
    "Click a question to reveal the answer — perfect for self-testing.": "Clique sur une question pour afficher la réponse — parfait pour t’auto-évaluer.",
    "Complete FAQ collection as PDF": "Collection complète de FAQ en PDF",
    "Download the entire collection as a Novogenia/Novodaily-branded PDF — perfect as a reference for consultation sessions or for printing.": "Télécharge l’intégralité de la collection sous forme de PDF aux couleurs de Novogenia/Novodaily — idéal comme référence pour les entretiens de conseil ou pour l’impression.",
    "You have already gone through this FAQ collection.": "Tu as déjà parcouru cette collection de FAQ.",
    "When you have gone through all questions, you can mark the module as viewed.": "Lorsque tu as parcouru toutes les questions, tu peux marquer le module comme consulté.",
    "Complete module": "Terminer le module",
    "Mark the FAQ collection as viewed": "Marquer la collection de FAQ comme consultée",
    "CERTIFIABLE COURSE": "COURS CERTIFIABLE",
    "SAFE": "SÛR",
    "CRITICAL": "CRITIQUE",
    "WITH DISCLAIMER": "AVEC AVERTISSEMENT",
    "IMPORTANT": "IMPORTANT",
    "VIDEO COMING SOON": "VIDÉO EN PRÉPARATION",
    "A dedicated English video for this module has not been recorded yet. The training content and test below remain fully functional — the video segment will be added as soon as the recording is available.": "Une vidéo dédiée à ce module est encore en préparation. Le contenu et le test ci-dessous sont déjà pleinement fonctionnels — le bloc vidéo sera ajouté dès que l’enregistrement sera disponible.",
    "Documents to take with you": "Documents à emporter",
    "You have already successfully completed this module.": "Tu as déjà terminé ce module avec succès.",
    "When you have watched all relevant content, complete the module and take your test.": "Lorsque tu as visionné tout le contenu pertinent, termine le module et passe ton test.",
    "Complete training": "Terminer la formation",
    "Mark this module as successfully completed": "Marquer ce module comme terminé avec succès",
    "Start the test": "Commencer le test",
    "Prove your knowledge and secure your certificate": "Prouve tes connaissances et obtiens ton certificat",
    "Test": "Test",
    "Screenshot coming": "Capture d’écran à venir",
    "Question": "Question",
    "Passed!": "Réussi !",
    "Unfortunately not passed": "Malheureusement non réussi",
    "To course overview": "Vers l’aperçu du cours",
    "All courses": "Tous les cours",
    "Try again": "Réessayer",
    "Review course": "Revoir le cours",
    "Failed to generate the PDF. Please try again.": "Impossible de générer le PDF. Réessaie.",
    "You haven't answered all questions. Submit anyway?": "Tu n’as pas répondu à toutes les questions. Soumettre quand même ?",
    "Back": "Retour",
    "User actions": "Actions utilisateur",
    "EXAMPLE": "EXEMPLE",
    "Generating...": "Génération en cours...",
    "Download as PDF": "Télécharger en PDF",
    "CEO of Novogenia": "PDG de Novogenia",
    "Skip to content": "Aller au contenu",
    "Official training platform": "Plateforme de formation officielle",
    "Austria": "Autriche",
    "Regional Court Salzburg": "Tribunal régional de Salzbourg",
    "Federal Ministry for Social Affairs, Health, Care and Consumer Protection": "Ministère fédéral des Affaires sociales, de la Santé, des Soins et de la Protection des consommateurs",
    "Austrian Trade Regulations 1994 (GewO), Genetic Technology Act (GTG), accessible via RIS Austria (ris.bka.gv.at).": "Code autrichien des activités commerciales 1994 (GewO), loi sur la technologie génétique (GTG), consultables via RIS Austria (ris.bka.gv.at).",
    "Responsible Party": "Responsable du traitement",
    "What data we process": "Quelles données nous traitons",
    "When you create an account, we store your e-mail address, your chosen display name, your language preference, and your course progress (which videos you watched and which tests you passed). This data is stored in Supabase (eu-central-1, Frankfurt, Germany) and processed exclusively for operating NOVO ACADEMY.": "Lorsque tu crées un compte, nous enregistrons ton adresse e-mail, le nom d’affichage que tu as choisi, ta préférence linguistique et ta progression dans les cours (quelles vidéos tu as regardées et quels tests tu as réussis). Ces données sont stockées dans Supabase (eu-central-1, Francfort, Allemagne) et traitées exclusivement pour l’exploitation de NOVO ACADEMY.",
    "Legal basis": "Base juridique",
    "Processing is based on your consent (Art. 6(1)(a) GDPR) when you register, and on contract performance (Art. 6(1)(b) GDPR) for providing the academy service.": "Le traitement repose sur ton consentement (art. 6, par. 1, point a, RGPD) lors de l’inscription, ainsi que sur l’exécution du contrat (art. 6, par. 1, point b, RGPD) pour la fourniture du service de l’académie.",
    "Cookies": "Cookies",
    "NOVO ACADEMY uses session cookies that are technically necessary for the login function (Supabase Auth). If you consent to optional cookies, embedded YouTube videos load additional cookies from Google/YouTube. You can withdraw your consent at any time.": "NOVO ACADEMY utilise des cookies de session techniquement nécessaires à la fonction de connexion (Supabase Auth). Si tu acceptes les cookies facultatifs, les vidéos YouTube intégrées chargent des cookies supplémentaires de Google/YouTube. Tu peux retirer ton consentement à tout moment.",
    "Third-party services": "Prestataires tiers",
    "Auth & database (eu-central-1 Frankfurt, Germany). Privacy policy: supabase.com/privacy": "Authentification et base de données (eu-central-1 Francfort, Allemagne). Politique de confidentialité : supabase.com/privacy",
    "Video embedding (only with your consent). Privacy policy: policies.google.com/privacy": "Intégration vidéo (uniquement avec ton consentement). Politique de confidentialité : policies.google.com/privacy",
    "Your rights": "Tes droits",
    "You have the right to access, correct, delete, or export your data, and to lodge a complaint with the Austrian Data Protection Authority (Datenschutzbehörde, Barichgasse 40–42, 1030 Vienna, dsb.gv.at).": "Tu as le droit d’accéder à tes données, de les rectifier, de les supprimer ou de les exporter, ainsi que de déposer une réclamation auprès de l’autorité autrichienne de protection des données (Datenschutzbehörde, Barichgasse 40–42, 1030 Vienne, dsb.gv.at).",
    "To exercise your rights, contact: datenschutz@novogenia.com": "Pour exercer tes droits, contacte : datenschutz@novogenia.com",
    "Local-only mode: accounts live in this browser. Configure Supabase to sync across devices.": "Mode local uniquement : les comptes existent seulement dans ce navigateur. Configure Supabase pour synchroniser entre les appareils."
  },
  "pt": {
    "Previous": "Anterior",
    "Next": "Seguinte",
    "Jane Doe": "Maria Silva",
    "Play": "Reproduzir",
    "▶ Playback (demo)": "▶ Reprodução (demo)",
    "Back to course overview": "Voltar à visão geral do curso",
    "Click a question to reveal the answer — perfect for self-testing.": "Clica numa pergunta para revelar a resposta — perfeito para autoavaliação.",
    "Complete FAQ collection as PDF": "Coleção completa de FAQ em PDF",
    "Download the entire collection as a Novogenia/Novodaily-branded PDF — perfect as a reference for consultation sessions or for printing.": "Descarrega toda a coleção como PDF com a marca Novogenia/Novodaily — ideal como referência para sessões de aconselhamento ou para impressão.",
    "You have already gone through this FAQ collection.": "Já consultaste esta coleção de FAQ.",
    "When you have gone through all questions, you can mark the module as viewed.": "Depois de teres percorrido todas as perguntas, podes marcar o módulo como visto.",
    "Complete module": "Concluir módulo",
    "Mark the FAQ collection as viewed": "Marcar a coleção de FAQ como consultada",
    "CERTIFIABLE COURSE": "CURSO CERTIFICÁVEL",
    "SAFE": "SEGURO",
    "CRITICAL": "CRÍTICO",
    "WITH DISCLAIMER": "COM AVISO",
    "IMPORTANT": "IMPORTANTE",
    "VIDEO COMING SOON": "VÍDEO EM PREPARAÇÃO",
    "A dedicated English video for this module has not been recorded yet. The training content and test below remain fully functional — the video segment will be added as soon as the recording is available.": "Um vídeo dedicado a este módulo ainda está em preparação. Os conteúdos e o teste abaixo já funcionam totalmente — o bloco de vídeo será adicionado assim que a gravação estiver disponível.",
    "Documents to take with you": "Documentos para levar contigo",
    "You have already successfully completed this module.": "Já concluíste este módulo com sucesso.",
    "When you have watched all relevant content, complete the module and take your test.": "Depois de teres visto todos os conteúdos relevantes, conclui o módulo e realiza o teu teste.",
    "Complete training": "Concluir a formação",
    "Mark this module as successfully completed": "Marcar este módulo como concluído com sucesso",
    "Start the test": "Iniciar o teste",
    "Prove your knowledge and secure your certificate": "Demonstra os teus conhecimentos e garante o teu certificado",
    "Test": "Teste",
    "Screenshot coming": "Captura de ecrã em breve",
    "Question": "Pergunta",
    "Passed!": "Aprovado!",
    "Unfortunately not passed": "Infelizmente não aprovado",
    "To course overview": "Para a visão geral do curso",
    "All courses": "Todos os cursos",
    "Try again": "Tentar novamente",
    "Review course": "Rever o curso",
    "Failed to generate the PDF. Please try again.": "Não foi possível gerar o PDF. Tenta novamente.",
    "You haven't answered all questions. Submit anyway?": "Não respondeste a todas as perguntas. Enviar mesmo assim?",
    "Back": "Voltar",
    "User actions": "Ações do utilizador",
    "EXAMPLE": "EXEMPLO",
    "Generating...": "A gerar...",
    "Download as PDF": "Descarregar como PDF",
    "CEO of Novogenia": "CEO da Novogenia",
    "Skip to content": "Saltar para o conteúdo",
    "Official training platform": "Plataforma de formação oficial",
    "Austria": "Áustria",
    "Regional Court Salzburg": "Tribunal Regional de Salzburgo",
    "Federal Ministry for Social Affairs, Health, Care and Consumer Protection": "Ministério Federal dos Assuntos Sociais, Saúde, Cuidados e Proteção do Consumidor",
    "Austrian Trade Regulations 1994 (GewO), Genetic Technology Act (GTG), accessible via RIS Austria (ris.bka.gv.at).": "Regulamento austríaco das atividades comerciais 1994 (GewO), Lei da Tecnologia Genética (GTG), acessíveis através do RIS Austria (ris.bka.gv.at).",
    "Responsible Party": "Responsável pelo tratamento",
    "What data we process": "Que dados tratamos",
    "When you create an account, we store your e-mail address, your chosen display name, your language preference, and your course progress (which videos you watched and which tests you passed). This data is stored in Supabase (eu-central-1, Frankfurt, Germany) and processed exclusively for operating NOVO ACADEMY.": "Quando crias uma conta, guardamos o teu endereço de e-mail, o nome de apresentação escolhido, a tua preferência de idioma e o teu progresso nos cursos (que vídeos viste e que testes aprovaste). Estes dados são armazenados na Supabase (eu-central-1, Frankfurt, Alemanha) e tratados exclusivamente para o funcionamento da NOVO ACADEMY.",
    "Legal basis": "Base jurídica",
    "Processing is based on your consent (Art. 6(1)(a) GDPR) when you register, and on contract performance (Art. 6(1)(b) GDPR) for providing the academy service.": "O tratamento baseia-se no teu consentimento (art. 6.º, n.º 1, alínea a), do RGPD) no momento do registo e na execução do contrato (art. 6.º, n.º 1, alínea b), do RGPD) para a prestação do serviço da academia.",
    "Cookies": "Cookies",
    "NOVO ACADEMY uses session cookies that are technically necessary for the login function (Supabase Auth). If you consent to optional cookies, embedded YouTube videos load additional cookies from Google/YouTube. You can withdraw your consent at any time.": "A NOVO ACADEMY utiliza cookies de sessão tecnicamente necessários para a função de início de sessão (Supabase Auth). Se consentires nos cookies opcionais, os vídeos do YouTube incorporados carregam cookies adicionais da Google/YouTube. Podes retirar o teu consentimento a qualquer momento.",
    "Third-party services": "Fornecedores terceiros",
    "Auth & database (eu-central-1 Frankfurt, Germany). Privacy policy: supabase.com/privacy": "Autenticação e base de dados (eu-central-1 Frankfurt, Alemanha). Política de privacidade: supabase.com/privacy",
    "Video embedding (only with your consent). Privacy policy: policies.google.com/privacy": "Incorporação de vídeo (apenas com o teu consentimento). Política de privacidade: policies.google.com/privacy",
    "Your rights": "Os teus direitos",
    "You have the right to access, correct, delete, or export your data, and to lodge a complaint with the Austrian Data Protection Authority (Datenschutzbehörde, Barichgasse 40–42, 1030 Vienna, dsb.gv.at).": "Tens o direito de aceder, corrigir, eliminar ou exportar os teus dados e de apresentar reclamação junto da Autoridade Austríaca de Proteção de Dados (Datenschutzbehörde, Barichgasse 40–42, 1030 Viena, dsb.gv.at).",
    "To exercise your rights, contact: datenschutz@novogenia.com": "Para exercer os teus direitos, contacta: datenschutz@novogenia.com",
    "Local-only mode: accounts live in this browser. Configure Supabase to sync across devices.": "Modo apenas local: as contas existem apenas neste navegador. Configura a Supabase para sincronizar entre dispositivos."
  },
  "nl": {
    "Previous": "Vorige",
    "Next": "Volgende",
    "Jane Doe": "Jan Jansen",
    "Play": "Afspelen",
    "▶ Playback (demo)": "▶ Afspelen (demo)",
    "Back to course overview": "Terug naar cursusoverzicht",
    "Click a question to reveal the answer — perfect for self-testing.": "Klik op een vraag om het antwoord te tonen — perfect om jezelf te testen.",
    "Complete FAQ collection as PDF": "Volledige FAQ-verzameling als pdf",
    "Download the entire collection as a Novogenia/Novodaily-branded PDF — perfect as a reference for consultation sessions or for printing.": "Download de volledige verzameling als pdf met Novogenia/Novodaily-huisstijl — ideaal als naslagwerk voor adviesgesprekken of om af te drukken.",
    "You have already gone through this FAQ collection.": "Je hebt deze FAQ-verzameling al doorgenomen.",
    "When you have gone through all questions, you can mark the module as viewed.": "Wanneer je alle vragen hebt doorgenomen, kun je de module als bekeken markeren.",
    "Complete module": "Module afronden",
    "Mark the FAQ collection as viewed": "Markeer de FAQ-verzameling als bekeken",
    "CERTIFIABLE COURSE": "CERTIFICEERBARE CURSUS",
    "SAFE": "VEILIG",
    "CRITICAL": "KRITIEK",
    "WITH DISCLAIMER": "MET DISCLAIMER",
    "IMPORTANT": "BELANGRIJK",
    "VIDEO COMING SOON": "VIDEO IN VOORBEREIDING",
    "A dedicated English video for this module has not been recorded yet. The training content and test below remain fully functional — the video segment will be added as soon as the recording is available.": "Een speciale video voor deze module is nog in voorbereiding. De inhoud en de test hieronder werken al perfect — het videoblok wordt toegevoegd zodra de opname beschikbaar is.",
    "Documents to take with you": "Documenten om mee te nemen",
    "You have already successfully completed this module.": "Je hebt deze module al met succes afgerond.",
    "When you have watched all relevant content, complete the module and take your test.": "Wanneer je alle relevante inhoud hebt bekeken, rond je de module af en maak je je test.",
    "Complete training": "Training afronden",
    "Mark this module as successfully completed": "Markeer deze module als met succes afgerond",
    "Start the test": "Start de test",
    "Prove your knowledge and secure your certificate": "Bewijs je kennis en behaal je certificaat",
    "Test": "Test",
    "Screenshot coming": "Screenshot volgt",
    "Question": "Vraag",
    "Passed!": "Geslaagd!",
    "Unfortunately not passed": "Helaas niet geslaagd",
    "To course overview": "Naar cursusoverzicht",
    "All courses": "Alle cursussen",
    "Try again": "Opnieuw proberen",
    "Review course": "Cursus herbekijken",
    "Failed to generate the PDF. Please try again.": "Kan de pdf niet genereren. Probeer het opnieuw.",
    "You haven't answered all questions. Submit anyway?": "Je hebt niet alle vragen beantwoord. Toch verzenden?",
    "Back": "Terug",
    "User actions": "Gebruikersacties",
    "EXAMPLE": "VOORBEELD",
    "Generating...": "Bezig met genereren...",
    "Download as PDF": "Downloaden als pdf",
    "CEO of Novogenia": "CEO van Novogenia",
    "Skip to content": "Ga naar inhoud",
    "Official training platform": "Officieel trainingsplatform",
    "Austria": "Oostenrijk",
    "Regional Court Salzburg": "Regionale rechtbank Salzburg",
    "Federal Ministry for Social Affairs, Health, Care and Consumer Protection": "Federaal Ministerie voor Sociale Zaken, Gezondheid, Zorg en Consumentenbescherming",
    "Austrian Trade Regulations 1994 (GewO), Genetic Technology Act (GTG), accessible via RIS Austria (ris.bka.gv.at).": "Oostenrijkse Bedrijfsregeling 1994 (GewO), Wet op de gentechnologie (GTG), raadpleegbaar via RIS Austria (ris.bka.gv.at).",
    "Responsible Party": "Verwerkingsverantwoordelijke",
    "What data we process": "Welke gegevens we verwerken",
    "When you create an account, we store your e-mail address, your chosen display name, your language preference, and your course progress (which videos you watched and which tests you passed). This data is stored in Supabase (eu-central-1, Frankfurt, Germany) and processed exclusively for operating NOVO ACADEMY.": "Wanneer je een account aanmaakt, slaan we je e-mailadres, de door jou gekozen weergavenaam, je taalvoorkeur en je cursusvoortgang op (welke video's je hebt bekeken en welke tests je hebt gehaald). Deze gegevens worden opgeslagen in Supabase (eu-central-1, Frankfurt, Duitsland) en uitsluitend verwerkt voor de werking van NOVO ACADEMY.",
    "Legal basis": "Rechtsgrondslag",
    "Processing is based on your consent (Art. 6(1)(a) GDPR) when you register, and on contract performance (Art. 6(1)(b) GDPR) for providing the academy service.": "De verwerking is gebaseerd op je toestemming (art. 6, lid 1, onder a, AVG) bij je registratie en op de uitvoering van de overeenkomst (art. 6, lid 1, onder b, AVG) voor het leveren van de academiedienst.",
    "Cookies": "Cookies",
    "NOVO ACADEMY uses session cookies that are technically necessary for the login function (Supabase Auth). If you consent to optional cookies, embedded YouTube videos load additional cookies from Google/YouTube. You can withdraw your consent at any time.": "NOVO ACADEMY gebruikt sessiecookies die technisch noodzakelijk zijn voor de inlogfunctie (Supabase Auth). Als je toestemming geeft voor optionele cookies, laden ingesloten YouTube-video's extra cookies van Google/YouTube. Je kunt je toestemming op elk moment intrekken.",
    "Third-party services": "Diensten van derden",
    "Auth & database (eu-central-1 Frankfurt, Germany). Privacy policy: supabase.com/privacy": "Authenticatie en database (eu-central-1 Frankfurt, Duitsland). Privacybeleid: supabase.com/privacy",
    "Video embedding (only with your consent). Privacy policy: policies.google.com/privacy": "Insluiten van video's (alleen met je toestemming). Privacybeleid: policies.google.com/privacy",
    "Your rights": "Je rechten",
    "You have the right to access, correct, delete, or export your data, and to lodge a complaint with the Austrian Data Protection Authority (Datenschutzbehörde, Barichgasse 40–42, 1030 Vienna, dsb.gv.at).": "Je hebt het recht om je gegevens in te zien, te corrigeren, te wissen of te exporteren, en om een klacht in te dienen bij de Oostenrijkse gegevensbeschermingsautoriteit (Datenschutzbehörde, Barichgasse 40–42, 1030 Wenen, dsb.gv.at).",
    "To exercise your rights, contact: datenschutz@novogenia.com": "Om je rechten uit te oefenen, neem contact op met: datenschutz@novogenia.com",
    "Local-only mode: accounts live in this browser. Configure Supabase to sync across devices.": "Alleen-lokaal-modus: accounts bestaan alleen in deze browser. Configureer Supabase om te synchroniseren tussen apparaten."
  },
  "ro": {
    "Previous": "Anterior",
    "Next": "Următor",
    "Jane Doe": "Jane Doe",
    "Play": "Redare",
    "▶ Playback (demo)": "▶ Redare (demo)",
    "Back to course overview": "Înapoi la prezentarea cursului",
    "Click a question to reveal the answer — perfect for self-testing.": "Apasă pe o întrebare pentru a afișa răspunsul — perfect pentru autoevaluare.",
    "Complete FAQ collection as PDF": "Colecția completă de întrebări frecvente în format PDF",
    "Download the entire collection as a Novogenia/Novodaily-branded PDF — perfect as a reference for consultation sessions or for printing.": "Descarcă întreaga colecție ca PDF cu marca Novogenia/Novodaily — perfect ca referință pentru sesiunile de consultanță sau pentru imprimare.",
    "You have already gone through this FAQ collection.": "Ai parcurs deja această colecție de întrebări frecvente.",
    "When you have gone through all questions, you can mark the module as viewed.": "După ce ai parcurs toate întrebările, poți marca modulul ca vizualizat.",
    "Complete module": "Finalizează modulul",
    "Mark the FAQ collection as viewed": "Marchează colecția de întrebări frecvente ca vizualizată",
    "CERTIFIABLE COURSE": "CURS CERTIFICABIL",
    "SAFE": "SIGUR",
    "CRITICAL": "CRITIC",
    "WITH DISCLAIMER": "CU MENȚIUNE LEGALĂ",
    "IMPORTANT": "IMPORTANT",
    "VIDEO COMING SOON": "VIDEOCLIP ÎN CURÂND",
    "A dedicated English video for this module has not been recorded yet. The training content and test below remain fully functional — the video segment will be added as soon as the recording is available.": "Un videoclip dedicat în limba engleză pentru acest modul nu a fost încă înregistrat. Conținutul de instruire și testul de mai jos rămân pe deplin funcționale — segmentul video va fi adăugat imediat ce înregistrarea este disponibilă.",
    "Documents to take with you": "Documente de reținut",
    "You have already successfully completed this module.": "Ai finalizat deja cu succes acest modul.",
    "When you have watched all relevant content, complete the module and take your test.": "După ce ai vizionat tot conținutul relevant, finalizează modulul și dă testul.",
    "Complete training": "Finalizează instruirea",
    "Mark this module as successfully completed": "Marchează acest modul ca finalizat cu succes",
    "Start the test": "Începe testul",
    "Prove your knowledge and secure your certificate": "Demonstrează-ți cunoștințele și obține certificatul",
    "Test": "Test",
    "Screenshot coming": "Captură de ecran în curând",
    "Question": "Întrebare",
    "Passed!": "Promovat!",
    "Unfortunately not passed": "Din păcate, nepromovat",
    "To course overview": "Către prezentarea cursului",
    "All courses": "Toate cursurile",
    "Try again": "Încearcă din nou",
    "Review course": "Revizuiește cursul",
    "Failed to generate the PDF. Please try again.": "Generarea PDF-ului a eșuat. Te rugăm să încerci din nou.",
    "You haven't answered all questions. Submit anyway?": "Nu ai răspuns la toate întrebările. Trimiți oricum?",
    "Back": "Înapoi",
    "User actions": "Acțiuni utilizator",
    "EXAMPLE": "EXEMPLU",
    "Generating...": "Se generează...",
    "Download as PDF": "Descarcă în format PDF",
    "CEO of Novogenia": "CEO al Novogenia",
    "Skip to content": "Sari la conținut",
    "Official training platform": "Platformă oficială de instruire",
    "Austria": "Austria",
    "Regional Court Salzburg": "Tribunalul Regional Salzburg",
    "Federal Ministry for Social Affairs, Health, Care and Consumer Protection": "Ministerul Federal pentru Afaceri Sociale, Sănătate, Îngrijire și Protecția Consumatorilor",
    "Austrian Trade Regulations 1994 (GewO), Genetic Technology Act (GTG), accessible via RIS Austria (ris.bka.gv.at).": "Regulamentul austriac privind comerțul din 1994 (GewO), Legea privind tehnologia genetică (GTG), accesibile prin RIS Austria (ris.bka.gv.at).",
    "Responsible Party": "Parte responsabilă",
    "What data we process": "Ce date prelucrăm",
    "When you create an account, we store your e-mail address, your chosen display name, your language preference, and your course progress (which videos you watched and which tests you passed). This data is stored in Supabase (eu-central-1, Frankfurt, Germany) and processed exclusively for operating NOVO ACADEMY.": "Când îți creezi un cont, stocăm adresa ta de e-mail, numele de afișare ales, preferința de limbă și progresul cursului (ce videoclipuri ai vizionat și ce teste ai promovat). Aceste date sunt stocate în Supabase (eu-central-1, Frankfurt, Germania) și prelucrate exclusiv pentru operarea NOVO ACADEMY.",
    "Legal basis": "Temei juridic",
    "Processing is based on your consent (Art. 6(1)(a) GDPR) when you register, and on contract performance (Art. 6(1)(b) GDPR) for providing the academy service.": "Prelucrarea se bazează pe consimțământul tău (Art. 6 alin. (1) lit. (a) GDPR) la înregistrare și pe executarea contractului (Art. 6 alin. (1) lit. (b) GDPR) pentru furnizarea serviciului academiei.",
    "Cookies": "Cookie-uri",
    "NOVO ACADEMY uses session cookies that are technically necessary for the login function (Supabase Auth). If you consent to optional cookies, embedded YouTube videos load additional cookies from Google/YouTube. You can withdraw your consent at any time.": "NOVO ACADEMY utilizează cookie-uri de sesiune care sunt necesare din punct de vedere tehnic pentru funcția de autentificare (Supabase Auth). Dacă îți exprimi consimțământul pentru cookie-urile opționale, videoclipurile YouTube încorporate încarcă cookie-uri suplimentare de la Google/YouTube. Îți poți retrage consimțământul în orice moment.",
    "Third-party services": "Servicii terțe",
    "Auth & database (eu-central-1 Frankfurt, Germany). Privacy policy: supabase.com/privacy": "Autentificare și bază de date (eu-central-1 Frankfurt, Germania). Politica de confidențialitate: supabase.com/privacy",
    "Video embedding (only with your consent). Privacy policy: policies.google.com/privacy": "Încorporare video (numai cu consimțământul tău). Politica de confidențialitate: policies.google.com/privacy",
    "Your rights": "Drepturile tale",
    "You have the right to access, correct, delete, or export your data, and to lodge a complaint with the Austrian Data Protection Authority (Datenschutzbehörde, Barichgasse 40–42, 1030 Vienna, dsb.gv.at).": "Ai dreptul de a accesa, corecta, șterge sau exporta datele tale și de a depune o plângere la Autoritatea austriacă pentru protecția datelor (Datenschutzbehörde, Barichgasse 40–42, 1030 Viena, dsb.gv.at).",
    "To exercise your rights, contact: datenschutz@novogenia.com": "Pentru a-ți exercita drepturile, contactează: datenschutz@novogenia.com",
    "Local-only mode: accounts live in this browser. Configure Supabase to sync across devices.": "Mod exclusiv local: conturile există în acest browser. Configurează Supabase pentru sincronizare între dispozitive."
  },
  "es": {
    "Previous": "Anterior",
    "Next": "Siguiente",
    "Jane Doe": "Jane Doe",
    "Play": "Reproducir",
    "▶ Playback (demo)": "▶ Reproducción (demo)",
    "Back to course overview": "Volver al resumen del curso",
    "Click a question to reveal the answer — perfect for self-testing.": "Haz clic en una pregunta para revelar la respuesta — perfecto para autoevaluarte.",
    "Complete FAQ collection as PDF": "Colección completa de preguntas frecuentes en PDF",
    "Download the entire collection as a Novogenia/Novodaily-branded PDF — perfect as a reference for consultation sessions or for printing.": "Descarga la colección completa como PDF con la marca Novogenia/Novodaily — perfecto como referencia para sesiones de asesoramiento o para imprimir.",
    "You have already gone through this FAQ collection.": "Ya has revisado esta colección de preguntas frecuentes.",
    "When you have gone through all questions, you can mark the module as viewed.": "Cuando hayas revisado todas las preguntas, puedes marcar el módulo como visto.",
    "Complete module": "Completar módulo",
    "Mark the FAQ collection as viewed": "Marcar la colección de preguntas frecuentes como vista",
    "CERTIFIABLE COURSE": "CURSO CERTIFICABLE",
    "SAFE": "SEGURO",
    "CRITICAL": "CRÍTICO",
    "WITH DISCLAIMER": "CON AVISO LEGAL",
    "IMPORTANT": "IMPORTANTE",
    "VIDEO COMING SOON": "VÍDEO PRÓXIMAMENTE",
    "A dedicated English video for this module has not been recorded yet. The training content and test below remain fully functional — the video segment will be added as soon as the recording is available.": "Aún no se ha grabado un vídeo específico en inglés para este módulo. El contenido de formación y el test a continuación siguen siendo totalmente funcionales — el segmento de vídeo se añadirá en cuanto la grabación esté disponible.",
    "Documents to take with you": "Documentos para llevar contigo",
    "You have already successfully completed this module.": "Ya has completado con éxito este módulo.",
    "When you have watched all relevant content, complete the module and take your test.": "Cuando hayas visto todo el contenido relevante, completa el módulo y realiza tu test.",
    "Complete training": "Completar formación",
    "Mark this module as successfully completed": "Marcar este módulo como completado con éxito",
    "Start the test": "Comenzar el test",
    "Prove your knowledge and secure your certificate": "Demuestra tus conocimientos y asegura tu certificado",
    "Test": "Test",
    "Screenshot coming": "Captura de pantalla próximamente",
    "Question": "Pregunta",
    "Passed!": "¡Aprobado!",
    "Unfortunately not passed": "Lamentablemente no aprobado",
    "To course overview": "Al resumen del curso",
    "All courses": "Todos los cursos",
    "Try again": "Intentar de nuevo",
    "Review course": "Repasar el curso",
    "Failed to generate the PDF. Please try again.": "No se pudo generar el PDF. Inténtalo de nuevo.",
    "You haven't answered all questions. Submit anyway?": "No has respondido todas las preguntas. ¿Enviar de todos modos?",
    "Back": "Atrás",
    "User actions": "Acciones de usuario",
    "EXAMPLE": "EJEMPLO",
    "Generating...": "Generando...",
    "Download as PDF": "Descargar como PDF",
    "CEO of Novogenia": "CEO de Novogenia",
    "Skip to content": "Saltar al contenido",
    "Official training platform": "Plataforma oficial de formación",
    "Austria": "Austria",
    "Regional Court Salzburg": "Tribunal Regional de Salzburgo",
    "Federal Ministry for Social Affairs, Health, Care and Consumer Protection": "Ministerio Federal de Asuntos Sociales, Salud, Cuidados y Protección del Consumidor",
    "Austrian Trade Regulations 1994 (GewO), Genetic Technology Act (GTG), accessible via RIS Austria (ris.bka.gv.at).": "Reglamento de Comercio de Austria de 1994 (GewO), Ley de Tecnología Genética (GTG), accesibles a través de RIS Austria (ris.bka.gv.at).",
    "Responsible Party": "Parte responsable",
    "What data we process": "Qué datos procesamos",
    "When you create an account, we store your e-mail address, your chosen display name, your language preference, and your course progress (which videos you watched and which tests you passed). This data is stored in Supabase (eu-central-1, Frankfurt, Germany) and processed exclusively for operating NOVO ACADEMY.": "Cuando creas una cuenta, almacenamos tu dirección de correo electrónico, el nombre para mostrar que elijas, tu preferencia de idioma y tu progreso en el curso (qué vídeos viste y qué tests aprobaste). Estos datos se almacenan en Supabase (eu-central-1, Fráncfort, Alemania) y se procesan exclusivamente para el funcionamiento de NOVO ACADEMY.",
    "Legal basis": "Base legal",
    "Processing is based on your consent (Art. 6(1)(a) GDPR) when you register, and on contract performance (Art. 6(1)(b) GDPR) for providing the academy service.": "El procesamiento se basa en tu consentimiento (Art. 6(1)(a) RGPD) cuando te registras, y en la ejecución del contrato (Art. 6(1)(b) RGPD) para prestar el servicio de la academia.",
    "Cookies": "Cookies",
    "NOVO ACADEMY uses session cookies that are technically necessary for the login function (Supabase Auth). If you consent to optional cookies, embedded YouTube videos load additional cookies from Google/YouTube. You can withdraw your consent at any time.": "NOVO ACADEMY utiliza cookies de sesión técnicamente necesarias para la función de inicio de sesión (Supabase Auth). Si consientes las cookies opcionales, los vídeos de YouTube incrustados cargan cookies adicionales de Google/YouTube. Puedes retirar tu consentimiento en cualquier momento.",
    "Third-party services": "Servicios de terceros",
    "Auth & database (eu-central-1 Frankfurt, Germany). Privacy policy: supabase.com/privacy": "Autenticación y base de datos (eu-central-1 Fráncfort, Alemania). Política de privacidad: supabase.com/privacy",
    "Video embedding (only with your consent). Privacy policy: policies.google.com/privacy": "Incrustación de vídeos (solo con tu consentimiento). Política de privacidad: policies.google.com/privacy",
    "Your rights": "Tus derechos",
    "You have the right to access, correct, delete, or export your data, and to lodge a complaint with the Austrian Data Protection Authority (Datenschutzbehörde, Barichgasse 40–42, 1030 Vienna, dsb.gv.at).": "Tienes derecho a acceder, corregir, eliminar o exportar tus datos, y a presentar una reclamación ante la Autoridad de Protección de Datos de Austria (Datenschutzbehörde, Barichgasse 40–42, 1030 Viena, dsb.gv.at).",
    "To exercise your rights, contact: datenschutz@novogenia.com": "Para ejercer tus derechos, contacta con: datenschutz@novogenia.com",
    "Local-only mode: accounts live in this browser. Configure Supabase to sync across devices.": "Modo solo local: las cuentas residen en este navegador. Configura Supabase para sincronizar entre dispositivos."
  },
  "sr": {
    "Previous": "Prethodno",
    "Next": "Sljedeće",
    "Jane Doe": "Jane Doe",
    "Play": "Pusti",
    "▶ Playback (demo)": "▶ Reprodukcija (demo)",
    "Back to course overview": "Nazad na pregled kursa",
    "Click a question to reveal the answer — perfect for self-testing.": "Kliknite na pitanje da otkrijete odgovor — savršeno za samotestiranje.",
    "Complete FAQ collection as PDF": "Kompletna zbirka čestih pitanja kao PDF",
    "Download the entire collection as a Novogenia/Novodaily-branded PDF — perfect as a reference for consultation sessions or for printing.": "Preuzmite cijelu zbirku kao PDF s Novogenia/Novodaily brendiranjem — savršeno kao referenca za savjetovanja ili za štampanje.",
    "You have already gone through this FAQ collection.": "Već ste prošli ovu zbirku čestih pitanja.",
    "When you have gone through all questions, you can mark the module as viewed.": "Kada prođete kroz sva pitanja, možete označiti modul kao pregledan.",
    "Complete module": "Završi modul",
    "Mark the FAQ collection as viewed": "Označi zbirku čestih pitanja kao pregledanu",
    "CERTIFIABLE COURSE": "KURS ZA CERTIFIKAT",
    "SAFE": "SIGURNO",
    "CRITICAL": "KRITIČNO",
    "WITH DISCLAIMER": "UZ NAPOMENU",
    "IMPORTANT": "VAŽNO",
    "VIDEO COMING SOON": "VIDEO USKORO",
    "A dedicated English video for this module has not been recorded yet. The training content and test below remain fully functional — the video segment will be added as soon as the recording is available.": "Poseban engleski video za ovaj modul još nije snimljen. Sadržaj obuke i test u nastavku su potpuno funkcionalni — video segment će biti dodat čim snimak bude dostupan.",
    "Documents to take with you": "Dokumenti koje možete ponijeti",
    "You have already successfully completed this module.": "Već ste uspješno završili ovaj modul.",
    "When you have watched all relevant content, complete the module and take your test.": "Kada odgledate sav relevantan sadržaj, završite modul i pristupite testu.",
    "Complete training": "Završi obuku",
    "Mark this module as successfully completed": "Označi ovaj modul kao uspješno završen",
    "Start the test": "Započni test",
    "Prove your knowledge and secure your certificate": "Dokažite svoje znanje i osigurajte certifikat",
    "Test": "Test",
    "Screenshot coming": "Snimak ekrana uskoro",
    "Question": "Pitanje",
    "Passed!": "Položeno!",
    "Unfortunately not passed": "Nažalost nije položeno",
    "To course overview": "Na pregled kursa",
    "All courses": "Svi kursevi",
    "Try again": "Pokušaj ponovo",
    "Review course": "Pregledaj kurs",
    "Failed to generate the PDF. Please try again.": "Generisanje PDF-a nije uspjelo. Pokušajte ponovo.",
    "You haven't answered all questions. Submit anyway?": "Niste odgovorili na sva pitanja. Svejedno predati?",
    "Back": "Nazad",
    "User actions": "Radnje korisnika",
    "EXAMPLE": "PRIMJER",
    "Generating...": "Generisanje...",
    "Download as PDF": "Preuzmi kao PDF",
    "CEO of Novogenia": "Izvršni direktor Novogenije",
    "Skip to content": "Preskoči na sadržaj",
    "Official training platform": "Službena platforma za obuku",
    "Austria": "Austrija",
    "Regional Court Salzburg": "Zemaljski sud u Salzburgu",
    "Federal Ministry for Social Affairs, Health, Care and Consumer Protection": "Savezno ministarstvo za socijalna pitanja, zdravlje, njegu i zaštitu potrošača",
    "Austrian Trade Regulations 1994 (GewO), Genetic Technology Act (GTG), accessible via RIS Austria (ris.bka.gv.at).": "Austrijski zakon o obrtu 1994 (GewO), Zakon o genetskoj tehnologiji (GTG), dostupno putem RIS Austria (ris.bka.gv.at).",
    "Responsible Party": "Odgovorna strana",
    "What data we process": "Koje podatke obrađujemo",
    "When you create an account, we store your e-mail address, your chosen display name, your language preference, and your course progress (which videos you watched and which tests you passed). This data is stored in Supabase (eu-central-1, Frankfurt, Germany) and processed exclusively for operating NOVO ACADEMY.": "Kada kreirate nalog, čuvamo vašu e-mail adresu, izabrano prikazno ime, jezičku postavku i vaš napredak u kursu (koje ste video zapise gledali i koje testove položili). Ovi podaci se čuvaju u Supabase (eu-central-1, Frankfurt, Njemačka) i obrađuju isključivo za rad platforme NOVO ACADEMY.",
    "Legal basis": "Pravni osnov",
    "Processing is based on your consent (Art. 6(1)(a) GDPR) when you register, and on contract performance (Art. 6(1)(b) GDPR) for providing the academy service.": "Obrada se zasniva na vašoj saglasnosti (čl. 6(1)(a) GDPR) prilikom registracije i na izvršenju ugovora (čl. 6(1)(b) GDPR) za pružanje usluge akademije.",
    "Cookies": "Kolačići",
    "NOVO ACADEMY uses session cookies that are technically necessary for the login function (Supabase Auth). If you consent to optional cookies, embedded YouTube videos load additional cookies from Google/YouTube. You can withdraw your consent at any time.": "NOVO ACADEMY koristi kolačiće sesije koji su tehnički neophodni za funkciju prijave (Supabase Auth). Ako pristanete na opcione kolačiće, ugrađeni YouTube video zapisi učitavaju dodatne kolačiće od Google/YouTube. Svoju saglasnost možete povući u bilo kom trenutku.",
    "Third-party services": "Usluge trećih strana",
    "Auth & database (eu-central-1 Frankfurt, Germany). Privacy policy: supabase.com/privacy": "Autentifikacija i baza podataka (eu-central-1 Frankfurt, Njemačka). Politika privatnosti: supabase.com/privacy",
    "Video embedding (only with your consent). Privacy policy: policies.google.com/privacy": "Ugrađivanje videa (samo uz vašu saglasnost). Politika privatnosti: policies.google.com/privacy",
    "Your rights": "Vaša prava",
    "You have the right to access, correct, delete, or export your data, and to lodge a complaint with the Austrian Data Protection Authority (Datenschutzbehörde, Barichgasse 40–42, 1030 Vienna, dsb.gv.at).": "Imate pravo na pristup, ispravku, brisanje ili izvoz svojih podataka, kao i pravo da podnesete pritužbu austrijskom Organu za zaštitu podataka (Datenschutzbehörde, Barichgasse 40–42, 1030 Beč, dsb.gv.at).",
    "To exercise your rights, contact: datenschutz@novogenia.com": "Za ostvarivanje svojih prava kontaktirajte: datenschutz@novogenia.com",
    "Local-only mode: accounts live in this browser. Configure Supabase to sync across devices.": "Lokalni režim: nalozi postoje samo u ovom pregledaču. Konfigurišite Supabase za sinhronizaciju između uređaja."
  },
  "ar": {
    "Previous": "السابق",
    "Next": "التالي",
    "Jane Doe": "Jane Doe",
    "Play": "تشغيل",
    "▶ Playback (demo)": "▶ تشغيل (عرض توضيحي)",
    "Back to course overview": "العودة إلى نظرة عامة على الدورة",
    "Click a question to reveal the answer — perfect for self-testing.": "انقر على سؤال لإظهار الإجابة — مثالي للاختبار الذاتي.",
    "Complete FAQ collection as PDF": "مجموعة الأسئلة الشائعة كاملة بصيغة PDF",
    "Download the entire collection as a Novogenia/Novodaily-branded PDF — perfect as a reference for consultation sessions or for printing.": "قم بتنزيل المجموعة الكاملة كملف PDF بعلامة Novogenia/Novodaily — مثالي كمرجع لجلسات الاستشارة أو للطباعة.",
    "You have already gone through this FAQ collection.": "لقد اطلعت بالفعل على مجموعة الأسئلة الشائعة هذه.",
    "When you have gone through all questions, you can mark the module as viewed.": "عندما تطّلع على جميع الأسئلة، يمكنك تحديد الوحدة كمشاهَدة.",
    "Complete module": "إكمال الوحدة",
    "Mark the FAQ collection as viewed": "تحديد مجموعة الأسئلة الشائعة كمشاهَدة",
    "CERTIFIABLE COURSE": "دورة قابلة للاعتماد",
    "SAFE": "آمن",
    "CRITICAL": "حرِج",
    "WITH DISCLAIMER": "مع إخلاء المسؤولية",
    "IMPORTANT": "مهم",
    "VIDEO COMING SOON": "الفيديو قريباً",
    "A dedicated English video for this module has not been recorded yet. The training content and test below remain fully functional — the video segment will be added as soon as the recording is available.": "لم يتم تسجيل فيديو إنجليزي مخصص لهذه الوحدة بعد. يبقى محتوى التدريب والاختبار أدناه فعّالاً بالكامل — وسيُضاف مقطع الفيديو فور توفر التسجيل.",
    "Documents to take with you": "مستندات لأخذها معك",
    "You have already successfully completed this module.": "لقد أكملت هذه الوحدة بنجاح بالفعل.",
    "When you have watched all relevant content, complete the module and take your test.": "عندما تشاهد جميع المحتويات ذات الصلة، أكمل الوحدة وأجرِ اختبارك.",
    "Complete training": "إكمال التدريب",
    "Mark this module as successfully completed": "تحديد هذه الوحدة كمكتملة بنجاح",
    "Start the test": "بدء الاختبار",
    "Prove your knowledge and secure your certificate": "أثبت معرفتك واحصل على شهادتك",
    "Test": "اختبار",
    "Screenshot coming": "لقطة الشاشة قريباً",
    "Question": "سؤال",
    "Passed!": "ناجح!",
    "Unfortunately not passed": "للأسف لم تنجح",
    "To course overview": "إلى نظرة عامة على الدورة",
    "All courses": "جميع الدورات",
    "Try again": "حاول مرة أخرى",
    "Review course": "مراجعة الدورة",
    "Failed to generate the PDF. Please try again.": "تعذّر إنشاء ملف PDF. يرجى المحاولة مرة أخرى.",
    "You haven't answered all questions. Submit anyway?": "لم تجب على جميع الأسئلة. هل تريد الإرسال على أي حال؟",
    "Back": "رجوع",
    "User actions": "إجراءات المستخدم",
    "EXAMPLE": "مثال",
    "Generating...": "جارٍ الإنشاء...",
    "Download as PDF": "تنزيل بصيغة PDF",
    "CEO of Novogenia": "الرئيس التنفيذي لشركة Novogenia",
    "Skip to content": "الانتقال إلى المحتوى",
    "Official training platform": "منصة التدريب الرسمية",
    "Austria": "النمسا",
    "Regional Court Salzburg": "المحكمة الإقليمية في سالزبورغ",
    "Federal Ministry for Social Affairs, Health, Care and Consumer Protection": "الوزارة الاتحادية للشؤون الاجتماعية والصحة والرعاية وحماية المستهلك",
    "Austrian Trade Regulations 1994 (GewO), Genetic Technology Act (GTG), accessible via RIS Austria (ris.bka.gv.at).": "لائحة التجارة النمساوية 1994 (GewO)، قانون التقنية الجينية (GTG)، المتاحان عبر RIS Austria (ris.bka.gv.at).",
    "Responsible Party": "الجهة المسؤولة",
    "What data we process": "ما البيانات التي نعالجها",
    "When you create an account, we store your e-mail address, your chosen display name, your language preference, and your course progress (which videos you watched and which tests you passed). This data is stored in Supabase (eu-central-1, Frankfurt, Germany) and processed exclusively for operating NOVO ACADEMY.": "عند إنشاء حساب، نقوم بتخزين عنوان بريدك الإلكتروني، والاسم المعروض الذي اخترته، وتفضيلك اللغوي، وتقدّمك في الدورة (الفيديوهات التي شاهدتها والاختبارات التي اجتزتها). تُخزَّن هذه البيانات في Supabase (eu-central-1، فرانكفورت، ألمانيا) وتُعالَج حصرياً لتشغيل NOVO ACADEMY.",
    "Legal basis": "الأساس القانوني",
    "Processing is based on your consent (Art. 6(1)(a) GDPR) when you register, and on contract performance (Art. 6(1)(b) GDPR) for providing the academy service.": "تستند المعالجة إلى موافقتك (المادة 6(1)(أ) من اللائحة العامة لحماية البيانات) عند التسجيل، وإلى تنفيذ العقد (المادة 6(1)(ب) من اللائحة العامة لحماية البيانات) لتقديم خدمة الأكاديمية.",
    "Cookies": "ملفات تعريف الارتباط",
    "NOVO ACADEMY uses session cookies that are technically necessary for the login function (Supabase Auth). If you consent to optional cookies, embedded YouTube videos load additional cookies from Google/YouTube. You can withdraw your consent at any time.": "تستخدم NOVO ACADEMY ملفات تعريف ارتباط الجلسة الضرورية تقنياً لوظيفة تسجيل الدخول (Supabase Auth). إذا وافقت على ملفات تعريف الارتباط الاختيارية، تقوم فيديوهات YouTube المضمّنة بتحميل ملفات تعريف ارتباط إضافية من Google/YouTube. يمكنك سحب موافقتك في أي وقت.",
    "Third-party services": "خدمات الأطراف الثالثة",
    "Auth & database (eu-central-1 Frankfurt, Germany). Privacy policy: supabase.com/privacy": "المصادقة وقاعدة البيانات (eu-central-1 فرانكفورت، ألمانيا). سياسة الخصوصية: supabase.com/privacy",
    "Video embedding (only with your consent). Privacy policy: policies.google.com/privacy": "تضمين الفيديو (بموافقتك فقط). سياسة الخصوصية: policies.google.com/privacy",
    "Your rights": "حقوقك",
    "You have the right to access, correct, delete, or export your data, and to lodge a complaint with the Austrian Data Protection Authority (Datenschutzbehörde, Barichgasse 40–42, 1030 Vienna, dsb.gv.at).": "لديك الحق في الوصول إلى بياناتك أو تصحيحها أو حذفها أو تصديرها، وفي تقديم شكوى إلى الهيئة النمساوية لحماية البيانات (Datenschutzbehörde، Barichgasse 40–42، 1030 فيينا، dsb.gv.at).",
    "To exercise your rights, contact: datenschutz@novogenia.com": "لممارسة حقوقك، تواصل عبر: datenschutz@novogenia.com",
    "Local-only mode: accounts live in this browser. Configure Supabase to sync across devices.": "وضع محلي فقط: تُحفَظ الحسابات في هذا المتصفح. قم بإعداد Supabase للمزامنة عبر الأجهزة."
  }
}

/* Templated strings (with ${...} placeholders) — kept separate only for
   readability; merged into INLINE_I18N below so LX resolves them too. */
const INLINE_I18N_TEMPLATES = {
  "it": {
    "✓ Test passed (${score}%)": "✓ Test superato (${score}%)",
    "Finish test (${answered}/${total} answered)": "Termina il test (${answered}/${total} risposte)",
    "You passed the \"${topic}\" test with ${score}%. Once the training is also completed, the module counts as certified.": "Hai superato il test su “${topic}” con il ${score}%. Una volta completata anche la formazione, il modulo è considerato certificato.",
    "You achieved ${score}% correct answers. At least 80% is required to pass. Review the course once more and try again.": "Hai ottenuto il ${score}% di risposte corrette. Per superare il test è richiesto almeno l’80%. Rivedi il corso ancora una volta e riprova."
  },
  "cz": {
    "✓ Test passed (${score}%)": "✓ Test úspěšně složen (${score}%)",
    "Finish test (${answered}/${total} answered)": "Dokončit test (${answered}/${total} zodpovězeno)",
    "You passed the \"${topic}\" test with ${score}%. Once the training is also completed, the module counts as certified.": "Splnil jsi test na téma „${topic}“ s ${score} %. Jakmile dokončíš i školení, modul se považuje za certifikovaný.",
    "You achieved ${score}% correct answers. At least 80% is required to pass. Review the course once more and try again.": "Dosáhl jsi ${score} % správných odpovědí. Ke splnění je potřeba alespoň 80 %. Projdi si kurz ještě jednou a zkus to znovu."
  },
  "fr": {
    "✓ Test passed (${score}%)": "✓ Test réussi (${score}%)",
    "Finish test (${answered}/${total} answered)": "Terminer le test (${answered}/${total} répondu)",
    "You passed the \"${topic}\" test with ${score}%. Once the training is also completed, the module counts as certified.": "Tu as réussi le test sur « ${topic} » avec ${score} %. Une fois la formation également terminée, le module est considéré comme certifié.",
    "You achieved ${score}% correct answers. At least 80% is required to pass. Review the course once more and try again.": "Tu as obtenu ${score} % de réponses correctes. Au moins 80 % sont requis pour réussir. Revois le cours une fois de plus et réessaie."
  },
  "pt": {
    "✓ Test passed (${score}%)": "✓ Teste aprovado (${score}%)",
    "Finish test (${answered}/${total} answered)": "Concluir teste (${answered}/${total} respondidas)",
    "You passed the \"${topic}\" test with ${score}%. Once the training is also completed, the module counts as certified.": "Aprovaste no teste sobre “${topic}” com ${score}%. Assim que a formação também estiver concluída, o módulo é considerado certificado.",
    "You achieved ${score}% correct answers. At least 80% is required to pass. Review the course once more and try again.": "Obtiveste ${score}% de respostas corretas. Para aprovação são necessários pelo menos 80%. Revê o curso mais uma vez e tenta novamente."
  },
  "nl": {
    "✓ Test passed (${score}%)": "✓ Test geslaagd (${score}%)",
    "Finish test (${answered}/${total} answered)": "Test afronden (${answered}/${total} beantwoord)",
    "You passed the \"${topic}\" test with ${score}%. Once the training is also completed, the module counts as certified.": "Je bent geslaagd voor de test over \"${topic}\" met ${score}%. Zodra ook de training is afgerond, geldt de module als gecertificeerd.",
    "You achieved ${score}% correct answers. At least 80% is required to pass. Review the course once more and try again.": "Je hebt ${score}% correcte antwoorden behaald. Om te slagen is minstens 80% vereist. Bekijk de cursus nog een keer en probeer het opnieuw."
  },
  "ro": {
    "✓ Test passed (${score}%)": "✓ Test promovat (${score}%)",
    "Finish test (${answered}/${total} answered)": "Finalizează testul (${answered}/${total} răspunse)",
    "You passed the \"${topic}\" test with ${score}%. Once the training is also completed, the module counts as certified.": "Ai promovat testul „${topic}” cu ${score}%. După ce instruirea este de asemenea finalizată, modulul este considerat certificat.",
    "You achieved ${score}% correct answers. At least 80% is required to pass. Review the course once more and try again.": "Ai obținut ${score}% răspunsuri corecte. Este necesar minimum 80% pentru promovare. Revizuiește cursul încă o dată și încearcă din nou."
  },
  "es": {
    "✓ Test passed (${score}%)": "✓ Test aprobado (${score}%)",
    "Finish test (${answered}/${total} answered)": "Finalizar test (${answered}/${total} respondidas)",
    "You passed the \"${topic}\" test with ${score}%. Once the training is also completed, the module counts as certified.": "Has aprobado el test de \"${topic}\" con un ${score}%. Una vez completada también la formación, el módulo cuenta como certificado.",
    "You achieved ${score}% correct answers. At least 80% is required to pass. Review the course once more and try again.": "Has obtenido un ${score}% de respuestas correctas. Se requiere al menos un 80% para aprobar. Repasa el curso una vez más e inténtalo de nuevo."
  },
  "sr": {
    "✓ Test passed (${score}%)": "✓ Test položen (${score}%)",
    "Finish test (${answered}/${total} answered)": "Završi test (odgovoreno ${answered}/${total})",
    "You passed the \"${topic}\" test with ${score}%. Once the training is also completed, the module counts as certified.": "Položili ste test \"${topic}\" s ${score}%. Kada završite i obuku, modul se smatra certifikovanim.",
    "You achieved ${score}% correct answers. At least 80% is required to pass. Review the course once more and try again.": "Ostvarili ste ${score}% tačnih odgovora. Za prolaz je potrebno najmanje 80%. Pregledajte kurs još jednom i pokušajte ponovo."
  },
  "ar": {
    "✓ Test passed (${score}%)": "✓ تم اجتياز الاختبار (${score}%)",
    "Finish test (${answered}/${total} answered)": "إنهاء الاختبار (تمت الإجابة على ${answered}/${total})",
    "You passed the \"${topic}\" test with ${score}%. Once the training is also completed, the module counts as certified.": "لقد اجتزت اختبار \"${topic}\" بنسبة ${score}%. وبمجرد إكمال التدريب أيضاً، تُحتسب الوحدة معتمَدة.",
    "You achieved ${score}% correct answers. At least 80% is required to pass. Review the course once more and try again.": "لقد حصلت على ${score}% من الإجابات الصحيحة. يلزم 80% على الأقل للنجاح. راجع الدورة مرة أخرى وحاول مجدداً."
  }
}
/* Pick a language for an inline string. de -> de, en -> en, else translated
   (fallback to en when no translation exists). The English string is the key. */
const LX = (lang, en, de) => lang === 'de' ? de : lang === 'en' ? brandInline(en) : (INLINE_I18N[lang]?.[en] ?? en)

/* Templated variant. `key` is the literal English template (with ${name}
   placeholders kept verbatim) used to look up the it/cz/fr/pt template in
   INLINE_I18N_TEMPLATES; `en`/`de` are the already-interpolated strings for
   those two languages; `vars` maps placeholder name -> replacement value.
   de -> de, en -> en, else translated template with vars substituted
   (fallback to the en string). */
const LXP = (lang, key, en, de, vars = {}) => {
  if (lang === 'de') return de
  if (lang === 'en') return brandInline(en)
  const tpl = INLINE_I18N_TEMPLATES[lang]?.[key]
  if (!tpl) return en
  return tpl.replace(/\$\{(\w+)\}/g, (m, name) => (name in vars ? vars[name] : m))
}

/* ===================== ICONS ===================== */
const Icon = {
  Grid: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/></svg>),
  Bag: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7h14l-1 13H6L5 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>),
  Clipboard: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9z" fill="currentColor" stroke="none"/><path d="M8 11h8M8 15h6"/></svg>),
  People: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="3"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="8" r="2.3"/><path d="M15 14c2 0 5 1.5 5 4"/></svg>),
  Briefcase: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></svg>),
  Book: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h7a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z"/><path d="M20 4h-7a3 3 0 0 0-3 3v13h7a3 3 0 0 0 3-3V4z"/></svg>),
  Network: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-2h12v2M12 12v2"/></svg>),
  User: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"/></svg>),
  Bell: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 17h12l-1.5-2V11a4.5 4.5 0 0 0-9 0v4L6 17z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>),
  Gear: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>),
  Camera: () => (<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M9 4l-1.5 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.5L15 4H9z"/><circle cx="12" cy="13" r="4" fill="#fff"/></svg>),
  PlatformIcon: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 13h6M7 16h4"/></svg>),
  Check: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 12 10 18 20 6"/></svg>),
  Play: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20"/></svg>),
  Doc: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>),
  ArrowLeft: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18"/></svg>),
  ArrowRight: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>),
  ChevronLeft: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18"/></svg>),
  Download: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12M6 12l6 6 6-6M4 20h16"/></svg>),
  Eye: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>),
  EyeOff: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.06 10.06 0 0 1 12 19c-7 0-11-7-11-7a18.66 18.66 0 0 1 4.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19"/><path d="M14.12 14.12A3 3 0 1 1 9.88 9.88"/><line x1="1" y1="1" x2="23" y2="23"/></svg>),
  Lock: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>),
  Drag: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>),
  Scale: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M5 7h14M3 12l2-5 2 5a2 2 0 1 1-4 0zM17 12l2-5 2 5a2 2 0 1 1-4 0z"/></svg>),
  Apple: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6c-3 0-6 2-6 7s3 9 6 9 6-4 6-9-3-7-6-7z"/><path d="M12 6c0-2 1-4 3-4M12 6c-1-1-1-2 0-3"/></svg>),
  Pill: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-30 12 12)"/><path d="M9 15l6-6"/></svg>),
  Lightning: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>),
  Stack: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 7 12 12 22 7"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/><polyline points="2 7 12 2 22 7"/></svg>),
  CertIcon: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/></svg>),
  Cap: () => (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5L2 9z"/><path d="M6 11.5V16c0 1.5 2.5 3 6 3s6-1.5 6-3v-4.5"/><path d="M22 9v6"/></svg>),
  Quiz: () => (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3"/><path d="M9 11h6M9 14h6M9 17h4"/></svg>),
  Info: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8h.01M11 12h1v5h1"/></svg>),
  Shield: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>),
}

/* ===================== REUSABLE BRAND NOTICE =====================
   Verwendet in mehreren Kursen, um auf Marken- und Design-Variationen
   der Berichte hinzuweisen. */
function BrandNotice() {
  const t = useT()
  return (
    <aside className="brand-notice">
      <div className="brand-notice-icon"><Icon.Info /></div>
      <div className="brand-notice-body">
        <div className="brand-notice-title">{t('brand_notice_title')}</div>
        <p className="brand-notice-text">{t('brand_notice_text')}</p>
      </div>
    </aside>
  )
}

const CATEGORY_ICONS = {
  // DE
  'Die Gen-Diät': Icon.Scale,
  'Gewichtsmanagement-Genetik': Icon.Scale, // legacy fallback
  'Genetik der gesunden Ernährung': Icon.Apple,
  'Personalisierte Nahrungsergänzung': Icon.Pill,
  'Leistungs-Genetik': Icon.Lightning,
  'Rechtlich sicher werben mit Produkten': Icon.Shield,
  // EN — match CATEGORIES_EN values from data.en.js
  'The Gene-Diet': Icon.Scale,
  'Eat Healthy by Your Genes': Icon.Apple,
  'Personalized Supplementation': Icon.Pill,
  'Athletic Performance': Icon.Lightning,
  'Legally Safe Advertising with Products': Icon.Shield,
}

/* Sidebar component was removed — the academy ships as a standalone site
   (className "app no-sidebar" on the root), so the legacy Sidebar was dead code. */

/* ===================== SEAL (real stamp — serrated, banner, stars) ===================== */
function Seal({ certified, certifiable, size = 'normal' }) {
  const lang = useLang()
  if (!certifiable) return null

  /* Vorher trug das Band in beiden Zustaenden weisse Schrift: 3,0:1 auf dem
     Gruen und 1,5:1 auf dem Grau — beides unter den 4,5:1 aus WCAG 1.4.3.
     Gruen abgedunkelt (5,4:1 mit Weiss), das offene Siegel bekommt dunkle
     Schrift auf Grau (8,4:1). */
  const color = certified ? '#1F7A3F' : '#D5D5D5'
  const colorDark = certified ? '#175C2F' : '#BFBFBF'
  const bandSchrift = certified ? '#fff' : '#3A323A'
  /* WCAG 1.4.1: Zertifiziert und offen unterschieden sich bisher NUR durch
     Gruen gegen Grau — bei Farbenblindheit und im Graustufendruck nicht
     unterscheidbar. Das zertifizierte Siegel bekommt zusaetzlich ein Haekchen,
     und beide Zustaende einen eigenen zugaenglichen Namen. */
  const siegelName = certified
    ? LX(lang, 'Certified', 'Zertifiziert')
    : LX(lang, 'Not yet certified', 'Noch nicht zertifiziert')
  const sealText = ({ en: 'CERTIFIED', de: 'ZERTIFIZIERT', it: 'CERTIFICATO', cz: 'CERTIFIKOVÁNO', fr: 'CERTIFIÉ', pt: 'CERTIFICADO', nl: 'GECERTIFICEERD', ro: 'CERTIFICAT', es: 'CERTIFICADO', sr: 'CERTIFIKOVANO', ar: 'معتمد' }[lang]) || 'ZERTIFIZIERT'

  // Serrated outer edge (path)
  const N = 32
  const ROUT = 49
  const RIN = 44
  const pts = []
  for (let i = 0; i < N * 2; i++) {
    const r = i % 2 === 0 ? ROUT : RIN
    const a = (i / (N * 2)) * Math.PI * 2 - Math.PI / 2
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`)
  }
  const serratedD = `M${pts.join(' L')} Z`

  // 5-point star path (centered on origin, radius ~3.5)
  const starD = (cx, cy, r = 3.2) => {
    const out = []
    for (let i = 0; i < 10; i++) {
      const rad = i % 2 === 0 ? r : r * 0.45
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2
      out.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`)
    }
    return `M${out.join(' L')} Z`
  }

  return (
    <div className={`seal-stamp${certified ? ' is-certified' : ' is-pending'}${size === 'big' ? ' is-big' : ''}`}>
      <svg viewBox="0 0 100 100" className="seal-stamp-svg" xmlns="http://www.w3.org/2000/svg"
           role="img" aria-label={siegelName}>
        {/* Serrated outer */}
        <path d={serratedD} fill={color} />
        {/* Inner ring background (paper) */}
        <circle cx="50" cy="50" r="36" fill="#FAFAFA" />
        {/* Two decorative inner rings */}
        <circle cx="50" cy="50" r="36" fill="none" stroke={color} strokeWidth="2.2" />
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth="0.9" />
        {/* Stars: 2 above banner, 2 below */}
        <path d={starD(38, 28)} fill={color} />
        <path d={starD(62, 28)} fill={color} />
        <path d={starD(38, 72)} fill={color} />
        <path d={starD(62, 72)} fill={color} />
        {/* Haekchen nur im zertifizierten Zustand — die Form traegt die
            Unterscheidung mit, nicht nur die Farbe. */}
        {certified && (
          <path d="M43.5 71.5 L48 76 L57 66" fill="none" stroke={color}
                strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {/* Diagonal banner across center */}
        <g transform="rotate(-10 50 50)">
          <rect x="-4" y="42" width="108" height="16" fill={color} />
          <rect x="-4" y="42" width="108" height="1.2" fill={colorDark} />
          <rect x="-4" y="56.8" width="108" height="1.2" fill={colorDark} />
          <text x="50" y="53.5" textAnchor="middle"
                fill={bandSchrift}
                fontSize="9.5"
                fontWeight="900"
                fontFamily="Montserrat, sans-serif"
                letterSpacing="1.2">
            {sealText}
          </text>
        </g>
      </svg>
    </div>
  )
}

/* ===================== TILE ===================== */
function Tile({ course, state, onClick }) {
  // Placeholder tile (COMING SOON) — gray, non-clickable, distinct visual
  if (course.placeholder) {
    return (
      <article className="tile is-placeholder" aria-disabled="true">
        <div className="tile-thumb-wrap">
          <div className="thumb thumb-placeholder">
            <span className="placeholder-label">COMING SOON</span>
          </div>
        </div>
        <div className="tile-meta">
          <h3 className="tile-title tile-title-placeholder">{course.category}</h3>
          <p className="tile-desc">{course.description}</p>
        </div>
      </article>
    )
  }

  const certifiable = isCertifiable(course)
  const certified = isCertified(course, { [courseKey(course)]: state })
  const watch = state.watched ? 'completed' : (state.progress > 0 ? 'in-progress' : 'unseen')
  const tileClass = [
    'tile',
    `state-${watch}`,
    certified ? 'is-certified' : '',
    certifiable ? 'is-certifiable' : '',
    course.contentType === 'supplementary' ? 'is-supp' : '',
  ].filter(Boolean).join(' ')

  return (
    /* Kein role="button" auf dem <article>: das macht saemtliche Kinder
       praesentationell, wodurch der h3-Kurstitel aus der Ueberschriftenliste
       verschwindet (WCAG 1.3.1). Bedienelement ist stattdessen ein echter
       Button im Titel; .tile-link::after zieht seine Klickflaeche ueber die
       ganze Kachel, die Optik bleibt damit unveraendert. */
    <article className={tileClass}>
      <div className="tile-thumb-wrap">
        <div className="thumb has-img">
          <img className="thumb-img" src={course.thumbnail} alt={course.topic} loading="lazy" />
          {!certified && watch === 'unseen' && certifiable && <span className="watch-pip" />}
          {watch === 'completed' && !certified && <span className="watch-check"><Icon.Check /></span>}
          {watch === 'completed' && !certified && <span className="watch-overlay" />}
          {watch === 'in-progress' && state.progress > 0 && (
            <span className="progress-bar" style={{ width: `${state.progress}%` }} />
          )}
        </div>
        {/* Seal sits OUTSIDE .thumb so it isn't clipped by overflow:hidden */}
        <Seal certified={certified} certifiable={certifiable} />
      </div>

      <div className="tile-meta">
        <h3 className="tile-title">
          <button type="button" className="tile-link" onClick={onClick}>
            {course.category}: {course.topic}
          </button>
        </h3>
        <p className="tile-desc">{course.description}</p>
        <ContentTags course={course} size="sm" />
      </div>
    </article>
  )
}

const TAG_CLASS = {
  'Video': 'tag-video',
  'Test': 'tag-test',
  'Download Material': 'tag-download',
  'Text Explanation': 'tag-text',
}

/* Inline content-tag row — shows which materials the course offers. */
function ContentTags({ course, size = 'sm' }) {
  const lang = useLang()
  /* getContentTags nimmt KEIN lang-Argument — der frühere zweite Parameter
     täuschte eine Übersetzung vor, die nie stattfand. Die Etiketten sind
     Formatbezeichnungen (VIDEO, PowerPoint, PDF) und bleiben bewusst
     unübersetzt, wie die Produktnamen an anderer Stelle auch. */
  const tags = getContentTags(course)
  if (!tags.length) return null
  return (
    <div className={`content-tags is-${size}`}>
      {tags.map((tg, i) => (
        <span key={i} className={`tag ${tg.className}`}>{tg.label}</span>
      ))}
    </div>
  )
}

/* ===================== CATEGORY ROW (conditional scroll buttons) ===================== */
function CategoryRow({ category, label, items, courseState, navigate }) {
  const ref = useRef(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)
  const lang = useLang()
  const Ico = CATEGORY_ICONS[category] || Icon.Book
  const scroll = (dir) => ref.current && ref.current.scrollBy({ left: dir * 620, behavior: 'smooth' })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      setCanLeft(el.scrollLeft > 4)
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [items])

  return (
    <div className="cat-row">
      <header className="cat-row-head">
        <div className="cat-row-icon"><Ico /></div>
        <h2 className="cat-row-title">
          {category}
          {label && <span className="cat-row-products"> ({label})</span>}
        </h2>
        <span className="cat-row-accent" />
      </header>

      <div className="row-wrap">
        {canLeft && (
          <button className="scroll-btn left" onClick={() => scroll(-1)} aria-label={LX(lang, 'Previous', 'Zurück')}>
            <Icon.ArrowLeft />
          </button>
        )}
        <div className="row" ref={ref}>
          {items.map(c => (
            <Tile key={c.id} course={c} state={courseState[courseKey(c)] || {}}
                  onClick={() => c.placeholder ? null : navigate({ name: 'course-landing', courseId: c.id })} />
          ))}
        </div>
        {canRight && (
          <button className="scroll-btn right" onClick={() => scroll(1)} aria-label={LX(lang, 'Next', 'Weiter')}>
            <Icon.ArrowRight />
          </button>
        )}
      </div>
    </div>
  )
}

/* ===================== COOKIE CONSENT =====================
   Stores 'all' | 'necessary' in localStorage key 'nova-cookie-consent'.
   'all'       = user accepted all cookies (YouTube iframes load normally)
   'necessary' = user declined optional cookies (YouTube iframes show a
                 consent placeholder instead of loading)
   null/undefined = not yet decided → banner is shown */
const COOKIE_KEY = 'nova-cookie-consent'
const CookieContext = createContext(null)
/* Die Zustimmung darf es nur EINMAL geben. Vorher hielt jeder Aufrufer des
   Hooks einen eigenen useState, der localStorage nur beim Mounten las:
   klickte man im Banner "Alle akzeptieren", blieb ein bereits gemounteter
   Player auf seinem alten null stehen und spielte nichts ab. Umgekehrt lief
   ein offenes Video nach dem Widerruf weiter. Jetzt liegt der Zustand im
   App-Body und wird über den Context verteilt. */
function useCookieConsent() {
  const ausContext = useContext(CookieContext)
  if (ausContext) return ausContext
  // Fallback nur für Komponenten außerhalb des Providers (Tests, Storybook).
  return useCookieConsentState()
}
function useCookieConsentState() {
  const read = () => {
    try {
      const v = localStorage.getItem(COOKIE_KEY)
      // Alles außer den zwei gültigen Werten gilt als "noch nicht entschieden".
      // Fängt auch den Altbestand ab, bei dem der String "null" gespeichert
      // wurde — sonst bliebe das Banner für immer weg und kein Video liefe.
      return (v === 'all' || v === 'necessary') ? v : null
    } catch { return null }
  }
  const [consent, setConsentState] = useState(read)
  const setConsent = (val) => {
    try {
      if (val === 'all' || val === 'necessary') localStorage.setItem(COOKIE_KEY, val)
      else localStorage.removeItem(COOKIE_KEY)   // NICHT setItem(key, null) — das speichert "null"
    } catch {}
    setConsentState((val === 'all' || val === 'necessary') ? val : null)
  }
  // Stabile Referenz, damit der Context nicht bei jedem App-Render alle
  // Consumer neu rendert.
  return useMemo(() => [consent, setConsent], [consent])
}

function CookieBanner({ onAccept, onNecessary, onOpenPrivacy }) {
  const t = useT()
  return (
    <div className="cookie-banner" role="dialog" aria-label={t('cookie_title')}>
      <div className="cookie-banner-inner">
        <div className="cookie-banner-text">
          <strong>{t('cookie_title')}</strong>
          <p>{t('cookie_text')} <button className="cookie-link" onClick={onOpenPrivacy}>{t('cookie_privacy_link')}</button></p>
        </div>
        <div className="cookie-banner-btns">
          <button className="btn-secondary cookie-btn-necessary" onClick={onNecessary}>{t('cookie_necessary')}</button>
          <button className="btn-primary cookie-btn-accept" onClick={onAccept}>{t('cookie_accept_all')}</button>
        </div>
      </div>
    </div>
  )
}

/* Tiny inline placeholder shown instead of a YouTube iframe when the user
   has not given consent for third-party cookies. */
function YtConsentPlaceholder({ onAllow }) {
  const t = useT()
  return (
    <div className="yt-consent-placeholder">
      <div className="yt-consent-icon">▶</div>
      <p className="yt-consent-hint">{t('cookie_yt_blocked_hint')}</p>
      <button className="btn-primary yt-consent-btn" onClick={onAllow}>{t('cookie_yt_allow')}</button>
    </div>
  )
}

/* ===================== YOUTUBE EMBED HELPERS =====================
   Modern browsers (Chrome/Edge/Safari) block iframe autoplay with sound
   unless the iframe is mounted via a direct user gesture AND already had
   permission to play audio. Because React mounts the iframe after a click
   (state-update + render), the gesture is often considered "consumed".

   Workaround: load the embed muted (which is always allowed to autoplay)
   and use the YouTube IFrame Player API via postMessage to unmute after
   onLoad. Net effect: video plays with sound on the first click, no
   second click needed. */
const YT_EMBED_PARAMS = 'autoplay=1&mute=1&enablejsapi=1&rel=0&playsinline=1'

function ytUnmuteOnLoad(e) {
  const win = e.target.contentWindow
  if (!win) return
  // Target the exact YouTube origin (the iframe src is always www.youtube.com)
  // rather than '*', so the player commands aren't broadcast to other windows.
  const cmd = (func, args = []) =>
    win.postMessage(JSON.stringify({ event: 'command', func, args }), 'https://www.youtube.com')
  // YouTube IFrame API needs ~200-600ms to be ready; we try a few times.
  let tries = 0
  const tick = () => {
    cmd('unMute')
    cmd('setVolume', [100])
    cmd('playVideo')
    if (++tries < 6) setTimeout(tick, 250)
  }
  setTimeout(tick, 200)
}

/* ===================== WELCOME VIDEO ===================== */
/* Pass `youtubeId` to embed an actual YouTube video; otherwise shows a click-to-play thumbnail */
/* ===================== KI-KENNZEICHNUNG =====================
   Art. 50 Abs. 4 KI-VO (VO (EU) 2024/1689), verbindlich seit 02.08.2026.
   Alle Sprachfassungen außer de/en sind HeyGen-Lipsync-Dubs: Stimme UND
   Lippenbewegungen einer real existierenden Person werden KI-erzeugt. Das
   erfüllt die Deepfake-Definition (Art. 3 Nr. 60) und ist offenzulegen.
   de/en sind echte Aufnahmen — dort wäre ein Hinweis eine Falschangabe.

   Der Hinweis steht bewusst als sichtbarer Text NEBEN dem Player (nicht im
   iframe, nicht als Bild): Art. 50 Abs. 5 verlangt, dass die Offenlegung
   spätestens bei der ersten Exposition klar, unterscheidbar und barrierefrei
   wahrnehmbar ist — also auch vor dem Abspielen und für Screenreader. */
const AI_DUB_LANGS = ['cz', 'fr', 'pt', 'it', 'nl', 'ro', 'es', 'sr', 'ar']

function AiDubNotice() {
  const lang = useLang()
  const t = useT()
  if (!AI_DUB_LANGS.includes(lang)) return null
  return (
    <p className="ai-dub-notice">
      <span className="ai-dub-badge">{t('ai_dub_badge')}</span>
      {t('ai_dub_notice')}
    </p>
  )
}

function WelcomePlayer({ youtubeId = null, coverImage = null }) {
  const lang = useLang()
  const [playing, setPlaying] = useState(false)
  const [consent, setConsent] = useCookieConsent()
  // Use explicit coverImage if provided (for videos without public YouTube thumbnails,
  // e.g. unlisted/private). Otherwise fall back to YouTube CDN thumbnail.
  const primarySrc = coverImage || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null)
  return (
    <div className="welcome-player" onClick={() => !playing && consent === 'all' && setPlaying(true)}>
      {playing && youtubeId && consent === 'all' ? (
        <iframe
          className="welcome-iframe"
          src={`https://www.youtube.com/embed/${youtubeId}?${YT_EMBED_PARAMS}`}
          title={`${BRAND.productName} video`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={ytUnmuteOnLoad}
        />
      ) : (
        <>
          <div className="welcome-thumb-fallback" />
          {primarySrc && (
            <img
              className="welcome-thumb"
              src={primarySrc}
              alt=""
              onLoad={(e) => {
                // YouTube returns a 120×90 placeholder when maxresdefault doesn't exist —
                // detect by naturalWidth and fall back to hqdefault (always available).
                if (e.target.src.includes('maxresdefault') && e.target.naturalWidth < 320) {
                  e.target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                }
              }}
              onError={(e) => {
                if (e.target.src.includes('maxresdefault')) {
                  e.target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                } else {
                  e.target.style.display = 'none'
                }
              }}
            />
          )}
          {consent !== 'necessary' ? (
            <button className="welcome-play" aria-label={LX(lang, 'Play', 'Abspielen')} onClick={() => setPlaying(true)}>
              <Icon.Play />
            </button>
          ) : (
            <YtConsentPlaceholder onAllow={() => setConsent('all')} />
          )}
          {playing && !youtubeId && <div className="welcome-fake">▶ Playback (demo — YouTube ID missing)</div>}
        </>
      )}
    </div>
  )
}

function WelcomeText({ title, sub }) {
  return (
    <div className="welcome-text">
      <h2 className="welcome-title">{title}</h2>
      <p className="welcome-sub">{sub}</p>
    </div>
  )
}

/* ===================== HOME PAGE ===================== */
function HomePage({ courseState, navigate, certName, setCertName, completedCertifiableCount, certifiedTitles, lang = 'de' }) {
  const mains = useMemo(
    () => groupForDisplay(lang),
    [lang]
  )
  // Progress counts only CERTIFIABLE modules (exclude FAQ + supplementary +
  // placeholders) so that 100% is actually reachable. FAQ/supplementary modules
  // have no test/completion, so including them made the max stuck at ~68%.
  const realCourses = COURSES.filter(c => isCertifiable(c) && c.contentType !== 'placeholder' && (c.lang || 'de') === lang
    && (!!c.youtubeId || (Array.isArray(c.videoSegments) && c.videoSegments.length > 0)))
  const totalModules = realCourses.length
  const completedModules = realCourses.filter(c => courseState[courseKey(c)]?.watched).length
  const pct = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0

  const topVideos = getHomeTopVideos(lang)
  const t = (k) => tBase(lang, k)

  return (
    <div className="content">
      {/* Two introduction videos side-by-side, each ~2 tile widths.
          Title + description sit underneath each video. */}
      {topVideos.length > 0 && (
        <div className="home-top-row">
          {topVideos.map((v, i) => (
            <div key={i} className="welcome-block">
              <WelcomePlayer youtubeId={v.youtubeId} coverImage={v.coverImage} />
              <WelcomeText title={v.title} sub={v.sub} />
            </div>
          ))}
        </div>
      )}

      {/* Clear demarcation: course section starts here */}
      <div className="courses-section-header">
        <h2 className="courses-section-title">
          <span className="cs-text">{t('home_courses_section_title')}</span>
          <span className="cs-accent" />
        </h2>
        <p className="courses-section-sub">{t('home_courses_section_sub')}</p>

        <section className="academy-progress">
          <div className="ap-text">
            <div className="ap-stats">
              <span className="ap-num">{completedModules}</span>
              <span className="ap-of">{t('home_progress_of')}</span>
              <span className="ap-total">{totalModules}</span>
              <span className="ap-label">{t('home_progress_label')}</span>
            </div>
            <div className="ap-pct">{pct}%</div>
          </div>
          <div className="ap-bar">
            <div className="ap-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </section>
      </div>

      {mains.map(main => (
        <section key={main.mainCategory} className="main-cat">
          <h2 className="main-cat-title">
            <span className="main-cat-text">{main.mainCategory}</span>
            <span className="main-cat-accent" />
          </h2>
          {main.sections.map(s => (
            <CategoryRow
              key={s.category}
              category={s.category}
              label={s.label}
              items={s.items}
              courseState={courseState}
              navigate={navigate}
            />
          ))}
        </section>
      ))}

      {/* Letzte Sektion: Bonus-Videos — sprach-spezifisch */}
      {(() => {
        const hvs = getHomeVideoSection(lang)
        if (!hvs?.videos?.length) return null
        return (
          <section className="home-bonus-videos">
            <h2 className="home-bonus-title">{hvs.category}</h2>
            {hvs.subtitle && <p className="home-bonus-sub">{hvs.subtitle}</p>}
            <div className="home-bonus-grid">
              {hvs.videos.map((v, i) => (
                <RelatedVideoTile key={i} youtubeId={v.youtubeId} title={v.title} coverImage={v.coverImage} />
              ))}
            </div>
          </section>
        )
      })()}

      <CertificateCTA
        name={certName}
        onNameChange={setCertName}
        onGenerate={() => navigate({ name: 'certificate', isSample: false })}
        onShowSample={() => navigate({ name: 'certificate', isSample: true })}
        completedCount={completedCertifiableCount}
        certifiedTitles={certifiedTitles}
      />
    </div>
  )
}

/* ===================== MINI CERTIFICATE PREVIEW (new portrait Genoacademy-style) ===================== */
function CertificateMini({ name }) {
  const t = useT()
  const displayName = name ?? LX(useLang(), 'Jane Doe', 'Maria Mustermann')
  return (
    <div className="cert-mini">
      <div className="cert-mini-paper">
        <svg className="cert-mini-wedge" viewBox="0 0 794 1123" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="0" y="1058" width="794" height="65" fill="#D1242A" />
          <rect x="0" y="1099" width="794" height="24" fill="#000000" />
          <path d="M 794 700 Q 740 770, 690 870 Q 660 950, 600 1058 L 794 1058 Z" fill="#D1242A" />
        </svg>
        <div className="cert-mini-content">
          <div className="cert-mini-head">
            <div className="cert-mini-logo">
              <img className="cert-mini-brand-img" src={assetUrl(BRAND.logo.src)} alt="" />
            </div>
          </div>
          <div className="cert-mini-novo-title">{BRAND.cert?.headline || 'NOVOGENIA'}</div>
          <div className="cert-mini-coach-title">{t('cert_mini_genetik_coach')}</div>
          <div className="cert-mini-presented">{t('cert_mini_presented')}</div>
          <div className="cert-mini-name">{displayName}</div>
          <div className="cert-mini-rules"><span /><span /><span /></div>
        </div>
      </div>
    </div>
  )
}

/* ===================== CERTIFICATE CTA (on home, wine bg with seal + preview) ===================== */
function CertificateCTA({ name, onNameChange, onGenerate, onShowSample, completedCount }) {
  const t = useT()
  return (
    <section className="cert-cta">
      <div className="cert-cta-body">
        <h2>{t('cert_cta_title')}</h2>
        <p>
          {t('cert_cta_intro_a')}<strong>{BRAND.certTitle}</strong>{t('cert_cta_intro_b')}<strong>{completedCount}</strong>{t('cert_cta_intro_c')}
        </p>
        <div className="cert-form">
          <label className="cert-input-wrap">
            <span>{t('cert_cta_name_label')}</span>
            <input type="text" value={name} onChange={e => onNameChange(e.target.value.slice(0, 80))} placeholder={t('cert_cta_name_placeholder')} maxLength={80} />
          </label>
          <div className="cert-actions">
            <button className="btn-primary" onClick={onGenerate} disabled={!name.trim() || completedCount === 0}>
              {t('cert_cta_generate')}
            </button>
            <button className="btn-ghost" onClick={onShowSample}>{t('cert_cta_sample')}</button>
          </div>
          {completedCount === 0 && <p className="cert-hint">{t('cert_cta_empty_hint')}</p>}
        </div>
      </div>

      <div className="cert-cta-visual">
        <div className="cert-cta-stack">
          <CertificateMini name={name?.trim() || t('cert_cta_name_placeholder_seal')} />
          <div className="cert-cta-bigseal">
            <Seal certified={true} certifiable={true} size="big" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== COURSE LANDING PAGE ===================== */
function CourseLandingPage({ course, state, navigate, onBack }) {
  const t = useT()
  const lang = useLang()
  const certifiable = isCertifiable(course)
  const certified = isCertified(course, { [courseKey(course)]: state })
  const tagBadge = course.contentType === 'course' ? t('cl_tag_course')
    : course.contentType === 'training' ? t('cl_tag_training')
    : course.contentType === 'faq' ? t('cl_tag_faq')
    : t('cl_tag_supplementary')

  const startLabel = course.contentType === 'faq'
    ? (state.watched ? (({ en: 'Re-open FAQ collection', de: 'FAQ-Sammlung erneut öffnen', it: 'Riapri raccolta FAQ', cz: 'Znovu otevřít FAQ', fr: 'Rouvrir la collection FAQ', pt: 'Reabrir coleção de FAQ', nl: 'FAQ-verzameling opnieuw openen', ro: 'Redeschide colecția de întrebări frecvente', es: 'Reabrir la colección de FAQ', sr: 'Ponovo otvori zbirku čestih pitanja', ar: 'إعادة فتح مجموعة الأسئلة الشائعة' }[lang]) || 'FAQ-Sammlung erneut öffnen') : t('cl_open_faq'))
    : (state.watched ? (({ en: 'Re-watch course', de: 'Kurs erneut ansehen', it: 'Rivedi il corso', cz: 'Znovu přehrát kurz', fr: 'Revoir le cours', pt: 'Rever o curso', nl: 'Cursus opnieuw bekijken', ro: 'Revizionează cursul', es: 'Volver a ver el curso', sr: 'Ponovo pogledaj kurs', ar: 'إعادة مشاهدة الدورة' }[lang]) || 'Kurs erneut ansehen') : t('cl_start_course'))

  const testLabel = state.testPassed
    ? (({ en: 'Retake test', de: 'Test wiederholen', it: 'Ripeti il test', cz: 'Opakovat test', fr: 'Repasser le test', pt: 'Refazer o teste', nl: 'Test opnieuw doen', ro: 'Repetă testul', es: 'Repetir el test', sr: 'Ponovi test', ar: 'إعادة الاختبار' }[lang]) || 'Test wiederholen')
    : (({ en: 'Start test', de: 'Test starten', it: 'Inizia il test', cz: 'Spustit test', fr: 'Commencer le test', pt: 'Iniciar o teste', nl: 'Test starten', ro: 'Începe testul', es: 'Comenzar el test', sr: 'Započni test', ar: 'ابدأ الاختبار' }[lang]) || 'Test starten')

  const testDoneLabel = ({
    en: `✓ Test passed (${state.testScore}%)`,
    de: `✓ Test erfolgreich abgeschlossen (${state.testScore}%)`,
    it: `✓ Test superato (${state.testScore}%)`,
    cz: `✓ Test úspěšně složen (${state.testScore}%)`,
    fr: `✓ Test réussi (${state.testScore}%)`,
    pt: `✓ Teste aprovado (${state.testScore}%)`,
    nl: `✓ Test geslaagd (${state.testScore}%)`,
    ro: `✓ Test promovat (${state.testScore}%)`,
    es: `✓ Test aprobado (${state.testScore}%)`,
    sr: `✓ Test položen (${state.testScore}%)`,
    ar: `✓ تم اجتياز الاختبار (${state.testScore}%)`,
  }[lang]) || `✓ Test erfolgreich abgeschlossen (${state.testScore}%)`

  return (
    <div className="course-landing">
      <div className="course-landing-bar">
        <button className="btn-back" onClick={onBack}><Icon.ChevronLeft /> {t('cl_back')}</button>
      </div>

      <div className="course-hero">
        <img className="course-hero-img" src={course.thumbnail} alt={course.topic} />
        <div className="course-hero-shade" />
        <div className="course-hero-text">
          <span className="course-hero-cat">{course.category}</span>
          <h1 className="course-hero-title">{course.topic}</h1>
        </div>
      </div>

      <div className="course-body">
        <div className="course-tag-row">
          <span className={`type-pill type-${course.contentType}`}>{tagBadge}</span>
          {certifiable
            ? <span className="cert-info">{t('cl_certifiable_yes')}</span>
            : <span className="cert-info muted">{t('cl_certifiable_no')}</span>}
          {certified && <span className="cert-info success">{t('cl_certified_done')}</span>}
        </div>

        <p className="course-paragraph">{course.longDescription}</p>
        <ContentTags course={course} size="lg" />

        <h2 className="course-bullets-h">{t('cl_bullets_h_prefix')}{tagBadge}{t('cl_bullets_h_suffix')}</h2>
        <ul className="course-bullets">
          {course.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>

        <div className="course-actions">
          <button className="btn-primary big" onClick={() => navigate({ name: 'course-content', courseId: course.id })}>
            ▶ {startLabel}
          </button>
          {certifiable && (
            <div className="course-test-wrap">
              <button className="btn-ghost big" onClick={() => navigate({ name: 'test', courseId: course.id })}>
                ✎ {testLabel}
              </button>
              {state.testPassed && (
                <span className="test-completed">{testDoneLabel}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ===================== COURSE CONTENT PAGE ===================== */
function VideoBlock({ video, course }) {
  const [playing, setPlaying] = useState(false)
  const t = useT()
  const lang = useLang()
  return (
    <div className="vid-block">
      <div className="vid-frame" onClick={() => setPlaying(true)}>
        <img src={course.thumbnail} alt="" className="vid-thumb" />
        {!playing && (
          <button className="vid-play" aria-label={LX(lang, 'Play', 'Abspielen')}>
            <Icon.Play />
          </button>
        )}
        {playing && <div className="vid-fake-playing">{LX(lang, '▶ Playback (demo)', '▶ Wiedergabe (Demo)')}</div>}
        <span className="vid-duration">{video.duration}</span>
      </div>
      <div className="vid-meta">
        <span className="vid-title">{video.title}</span>
        <span className="vid-hint">{t('cc_video_optional')}</span>
      </div>
    </div>
  )
}

function FullVideo({ course, youtubeId, title }) {
  const [playing, setPlaying] = useState(false)
  const [consent, setConsent] = useCookieConsent()
  const lang = useLang()
  const v = course.videos?.[0]
  const yt = youtubeId || course.youtubeId
  const explicitCover = course.coverImage
  const stillSrc = explicitCover
    || (yt ? `https://img.youtube.com/vi/${yt}/maxresdefault.jpg` : course.thumbnail)
  return (
    <>
      <div className="cc-video-full" onClick={() => !playing && consent === 'all' && setPlaying(true)}>
      {playing && yt && consent === 'all' ? (
        <iframe
          className="cc-video-iframe"
          src={`https://www.youtube.com/embed/${yt}?${YT_EMBED_PARAMS}`}
          title={title || course.topic}
          frameBorder="0"
          onLoad={ytUnmuteOnLoad}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : consent === 'necessary' && yt ? (
        <YtConsentPlaceholder onAllow={() => setConsent('all')} />
      ) : (
        <>
          <img src={stillSrc} alt="" className="cc-video-thumb"
               onLoad={(e) => {
                 if (!explicitCover && yt && e.target.src.includes('maxresdefault') && e.target.naturalWidth < 320) {
                   e.target.src = `https://img.youtube.com/vi/${yt}/hqdefault.jpg`
                 }
               }}
               onError={(e) => {
                 if (!explicitCover && yt && e.target.src.includes('maxresdefault')) {
                   e.target.src = `https://img.youtube.com/vi/${yt}/hqdefault.jpg`
                 }
               }} />
          {!playing && (
            <button className="cc-video-play" aria-label={LX(lang, 'Play', 'Abspielen')}>
              <Icon.Play />
            </button>
          )}
          {playing && !yt && <div className="cc-video-fake">{LX(lang, '▶ Playback (demo)', '▶ Wiedergabe (Demo)')}</div>}
          {!yt && v?.duration && <span className="cc-video-duration">{v.duration}</span>}
        </>
      )}
      </div>
      {yt && <AiDubNotice />}
    </>
  )
}

/* ===================== FAQ PAGE =====================
   Rendert eine themenklassifizierte FAQ-Sammlung als Accordion.
   Jede Frage ist anklickbar — die Antwort klappt aus.
   Am Ende: PDF-Download der kompletten Sammlung. */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'is-open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="faq-q-text">{q}</span>
        <span className="faq-q-icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  )
}

/* Compact YouTube tile — used for "Weitere relevante Inhalte" section.
   Tile size matches a course-preview tile. Click → inline iframe playback. */
function RelatedVideoTile({ youtubeId, title, coverImage = null }) {
  const lang = useLang()
  const [playing, setPlaying] = useState(false)
  /* Dieselbe Cookie-Schranke wie in FullVideo und WelcomePlayer: ohne sie
     luden die verwandten Videos YouTube-Cookies, obwohl der Nutzer nur
     "Nur notwendige" gewaehlt oder noch gar nicht entschieden hatte. */
  const [consent, setConsent] = useCookieConsent()
  // Use explicit coverImage if provided (for unlisted videos whose YouTube
  // thumbnails return 404). Otherwise fall back to YouTube CDN.
  const stillSrc = coverImage || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  return (
    <div className="related-video-tile" onClick={() => !playing && consent === 'all' && setPlaying(true)}>
      {playing && consent === 'all' ? (
        <iframe
          className="related-video-iframe"
          src={`https://www.youtube.com/embed/${youtubeId}?${YT_EMBED_PARAMS}`}
          title={title || 'YouTube Video'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={ytUnmuteOnLoad}
        />
      ) : (
        <>
          <img src={stillSrc} alt="" className="related-video-thumb"
               onLoad={(e) => {
                 if (!coverImage && e.target.src.includes('maxresdefault') && e.target.naturalWidth < 320) {
                   e.target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                 }
               }}
               onError={(e) => {
                 if (!coverImage && e.target.src.includes('maxresdefault')) {
                   e.target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                 }
               }} />
          {consent === 'all'
            ? (<button className="related-video-play" aria-label={LX(lang, 'Play', 'Abspielen')}>
                 <Icon.Play />
               </button>)
            : <YtConsentPlaceholder onAllow={() => setConsent('all')} />}
        </>
      )}
    </div>
  )
}

function FaqPage({ course, state, onComplete, onBack }) {
  const [expandedAll, setExpandedAll] = useState(false)
  const lang = useLang()
  return (
    <div className="course-content-page faq-page">
      <div className="course-landing-bar">
        <button className="btn-back" onClick={onBack}><Icon.ChevronLeft /> {LX(lang, 'Back to course overview', 'Zurück zur Kursübersicht')}</button>
      </div>

      <div className="cc-wrap">
        <div className="cc-title-row">
          <h1 className="cc-title">{course.category}: {course.topic}</h1>
        </div>

        <p className="cc-paragraph">{course.longDescription}</p>

        <div className="faq-toolbar">
          <span className="faq-hint">{LX(lang, 'Click a question to reveal the answer — perfect for self-testing.', 'Klicke auf eine Frage, um die Antwort einzublenden — perfekt zum Selbsttest.')}</span>
        </div>

        {course.faqGroups?.map((group, gi) => (
          <section key={gi} className="faq-group">
            <h2 className="faq-group-title">{group.title}</h2>
            <div className="faq-list">
              {group.items.map((item, ii) => (
                <FaqItem key={`${gi}-${ii}-${expandedAll}`} q={item.q} a={item.a} />
              ))}
            </div>
          </section>
        ))}

        {course.hasDownload && course.documents?.length > 0 && (
          <>
            <h2 className="cc-h">{LX(lang, 'Complete FAQ collection as PDF', 'Komplette FAQ-Sammlung als PDF')}</h2>
            <p className="cc-paragraph">
              {LX(lang,
                'Download the entire collection as a Novogenia/Novodaily-branded PDF — perfect as a reference for consultation sessions or for printing.',
                'Lade die gesamte Sammlung als Novogenia/Novodaily-gebrandetes PDF herunter — ideal als Nachschlagewerk für Beratungsgespräche oder zum Ausdrucken.')}
            </p>
            <div className="cc-docs">
              {course.documents.map((d, i) => {
                const ext = (d.type || '').toUpperCase() || 'PDF'
                const Wrapper = d.url ? 'a' : 'div'
                const wrapProps = d.url
                  ? { href: d.url, download: '', target: '_blank', rel: 'noopener noreferrer' }
                  : { onClick: (e) => e.preventDefault() }
                return (
                  <Wrapper key={i} className="cc-doc" {...wrapProps}>
                    {d.thumbnail
                      ? <img className="cc-doc-thumb" src={d.thumbnail} alt="" />
                      : (d.type === 'pdf' && d.url)
                      ? <PdfThumb url={d.url} />
                      : null /* no preview available — render nothing instead of placeholder icon */}
                    <span className="cc-doc-text">
                      <span className="cc-doc-title">{d.title}</span>
                      <span className="cc-doc-meta">{ext}{d.size && d.size !== 'PDF' ? ` · ${d.size}` : ''}</span>
                    </span>
                    <span className="cc-doc-action"><Icon.Download /></span>
                  </Wrapper>
                )
              })}
            </div>
          </>
        )}

        <div className="cc-complete">
          {state.watched
            ? <p className="cc-already">{LX(lang, 'You have already gone through this FAQ collection.', 'Du hast diese FAQ-Sammlung bereits durchgesehen.')}</p>
            : <p className="cc-prompt">{LX(lang, 'When you have gone through all questions, you can mark the module as viewed.', 'Wenn du alle Fragen durchgegangen bist, kannst du das Modul als angesehen markieren.')}</p>}
          <div className="cc-actions-row">
            <button className="cc-action-btn" onClick={onComplete}>
              <span className="cc-action-icon"><Icon.Cap /></span>
              <span className="cc-action-text">
                <span className="cc-action-title">{LX(lang, 'Complete module', 'Modul abschließen')}</span>
                <span className="cc-action-sub">{LX(lang, 'Mark the FAQ collection as viewed', 'Markiere die FAQ-Sammlung als durchgesehen')}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CourseContentPage({ course, state, onComplete, onBack, onStartTest }) {
  const lang = useLang()
  // CATEGORY_CONTENT is only keyed for German categories. For EN courses
  // (which always use introText/introQuestions), this lookup returns {} and is unused.
  const content = CATEGORY_CONTENT[course.category] || {}
  // Per-course introText / introQuestions overrides the generic "Warum Gene…" block
  const useIntroText = !!course.introText || !!course.introQuestions
  const certifiable = isCertifiable(course)
  return (
    <div className="course-content-page">
      <div className="course-landing-bar">
        <button className="btn-back" onClick={onBack}><Icon.ChevronLeft /> {LX(lang, 'Back to course overview', 'Zurück zur Kursübersicht')}</button>
      </div>

      <div className="cc-wrap">
        <div className="cc-title-row">
          <h1 className="cc-title">{course.category}: {course.topic}</h1>
          {certifiable && (
            <div className="cc-cert-badge">
              <Seal certified={false} certifiable={true} />
              <span className="cc-cert-label">{LX(lang, 'CERTIFIABLE COURSE', 'ZERTIFIZIERBARER KURS')}</span>
            </div>
          )}
        </div>

        {useIntroText ? (
          <>
            {course.introQuestionsHeader && (
              <p className="cc-paragraph"><strong>{course.introQuestionsHeader}</strong></p>
            )}
            {course.introQuestions && (
              <ul className="cc-question-list">
                {course.introQuestions.map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            )}
            {course.introText && <p className="cc-paragraph">{course.introText}</p>}
          </>
        ) : (
          <>
            {content.whyHeading && <h2 className="cc-h">{content.whyHeading}</h2>}
            {content.whyText && <p className="cc-paragraph">{content.whyText}</p>}
          </>
        )}

        {course.brandNoticeAboveVideos && <BrandNotice />}

        {course.articleSections?.length ? (
          // Text-based training (no video) — render structured article sections
          course.articleSections.map((sec, i) => {
            // Normalise callout: accept string or {text, tone}
            const callout = sec.callout
              ? (typeof sec.callout === 'string' ? { text: sec.callout, tone: 'neutral' } : sec.callout)
              : null
            const calloutLabelEn = callout && (callout.tone === 'safe' ? 'SAFE'
                : callout.tone === 'critical' ? 'CRITICAL'
                : callout.tone === 'caveat' ? 'WITH DISCLAIMER'
                : 'IMPORTANT')
            const calloutLabelDe = callout && (callout.tone === 'safe' ? 'SICHER'
                : callout.tone === 'critical' ? 'KRITISCH'
                : callout.tone === 'caveat' ? 'MIT DISCLAIMER'
                : 'WICHTIG')
            const calloutLabel = callout && LX(lang, calloutLabelEn, calloutLabelDe)
            return (
            <section key={i} className="cc-article-section">
              {sec.title && <h2 className="cc-h">{sec.title}</h2>}
              {sec.paragraphs?.map((p, j) => <p key={j} className="cc-paragraph">{p}</p>)}
              {sec.bullets?.length > 0 && (
                <ul className="cc-question-list">
                  {sec.bullets.map((b, j) => {
                    // Bullet can be a string (neutral) or { text, tone }
                    const norm = typeof b === 'string' ? { text: b, tone: 'neutral' } : b
                    const cls = norm.tone && norm.tone !== 'neutral' ? `cc-bullet-${norm.tone}` : ''
                    return <li key={j} className={cls}>{norm.text}</li>
                  })}
                </ul>
              )}
              {callout && (
                <aside className={`cc-article-callout tone-${callout.tone || 'neutral'}`}>
                  <div className="cc-article-callout-label">{calloutLabel}</div>
                  <div className="cc-article-callout-text">{callout.text}</div>
                </aside>
              )}
            </section>
            )
          })
        ) : course.videoSegments?.length ? (
          // Multi-chapter consultation course — render each video as its own segment
          course.videoSegments.map((seg, i) => (
            <section key={i} className="cc-video-segment">
              {seg.title && <h2 className="cc-h">{seg.title}</h2>}
              {seg.description && <p className="cc-paragraph">{seg.description}</p>}
              <FullVideo course={course} youtubeId={seg.youtubeId} title={seg.title} />
            </section>
          ))
        ) : course.youtubeId ? (
          <FullVideo course={course} />
        ) : (
          // No video available — show a notice instead of an unclickable empty player.
          <aside className="brand-notice">
            <div className="brand-notice-icon"><Icon.Info /></div>
            <div className="brand-notice-body">
              <div className="brand-notice-title">{LX(lang, 'VIDEO COMING SOON', 'VIDEO IN VORBEREITUNG')}</div>
              <p className="brand-notice-text">
                {LX(lang,
                  'A dedicated English video for this module has not been recorded yet. The training content and test below remain fully functional — the video segment will be added as soon as the recording is available.',
                  'Ein passendes Video für dieses Modul ist noch in Vorbereitung. Die Inhalte und der Test funktionieren bereits vollständig — der Video-Block wird ergänzt, sobald die Aufnahme verfügbar ist.')}
              </p>
            </div>
          </aside>
        )}

        {course.postVideoText && <p className="cc-paragraph">{course.postVideoText}</p>}

        {!useIntroText && content.moreText && <p className="cc-paragraph">{content.moreText}</p>}

        {!useIntroText && content.resultsHeading && <h2 className="cc-h">{content.resultsHeading}</h2>}
        {!useIntroText && content.resultsText && <p className="cc-paragraph">{content.resultsText}</p>}

        {course.hasDownload && (
          <>
            <h2 className="cc-h">{LX(lang, 'Documents to take with you', 'Dokumente zum Mitnehmen')}</h2>
            {course.brandNoticeAboveDownloads && <BrandNotice />}
            <div className="cc-docs">
              {course.documents.map((d, i) => {
                const ext = (d.type || '').toUpperCase() || 'PDF'
                const Wrapper = d.url ? 'a' : 'div'
                const wrapProps = d.url
                  ? { href: d.url, download: '', target: '_blank', rel: 'noopener noreferrer' }
                  : { onClick: (e) => e.preventDefault() }
                return (
                  <Wrapper key={i} className="cc-doc" {...wrapProps}>
                    {d.thumbnail
                      ? <img className="cc-doc-thumb" src={d.thumbnail} alt="" />
                      : (d.type === 'pdf' && d.url)
                      ? <PdfThumb url={d.url} />
                      : null /* no preview available — render nothing instead of placeholder icon */}
                    <span className="cc-doc-text">
                      <span className="cc-doc-title">{d.title}</span>
                      <span className="cc-doc-meta">{ext} · {d.size}</span>
                    </span>
                    <span className="cc-doc-action"><Icon.Download /></span>
                  </Wrapper>
                )
              })}
            </div>
          </>
        )}

        <div className="cc-complete">
          {state.watched
            ? <p className="cc-already">{LX(lang, 'You have already successfully completed this module.', 'Du hast dieses Modul bereits erfolgreich abgeschlossen.')}</p>
            : <p className="cc-prompt">{LX(lang, 'When you have watched all relevant content, complete the module and take your test.', 'Wenn du alle relevanten Inhalte angesehen hast, schließe das Modul ab und lege deinen Test ab.')}</p>}
          <div className="cc-actions-row">
            <button className="cc-action-btn" onClick={onComplete}>
              <span className="cc-action-icon"><Icon.Cap /></span>
              <span className="cc-action-text">
                <span className="cc-action-title">{LX(lang, 'Complete training', 'Training abschließen')}</span>
                <span className="cc-action-sub">{LX(lang, 'Mark this module as successfully completed', 'Markiere dieses Modul als erfolgreich abgeschlossen')}</span>
              </span>
            </button>
            {isCertifiable(course) && onStartTest && (
              <button className="cc-action-btn cc-action-btn-alt" onClick={onStartTest}>
                <span className="cc-action-icon"><Icon.Quiz /></span>
                <span className="cc-action-text">
                  <span className="cc-action-title">{LX(lang, 'Start the test', 'Test beginnen')}</span>
                  <span className="cc-action-sub">{LX(lang, 'Prove your knowledge and secure your certificate', 'Stelle dein Wissen unter Beweis und sichere dein Zertifikat')}</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===================== TEST PAGE ===================== */

/* Reusable demo "Genreport" image — shown above the first question for demo purposes */
function GenReportDemo({ title = 'Fettempfindlichkeit hoch', position = 20, text }) {
  return (
    <div className="test-img-demo">
      <h3>{title}</h3>
      <div className="test-img-bar">
        <div className="test-img-marker" style={{ left: `${position}%` }} />
      </div>
      <p>{text}</p>
    </div>
  )
}

function TestPage({ course, onSubmit, onBack }) {
  const [answers, setAnswers] = useState({})
  const lang = useLang()

  const submit = () => {
    if (Object.keys(answers).length < course.questions.length) {
      if (!confirm(LX(lang,
        'You haven\'t answered all questions. Submit anyway?',
        'Du hast nicht alle Fragen beantwortet. Trotzdem abgeben?'))) return
    }
    let correct = 0
    course.questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++
    })
    const score = Math.round((correct / course.questions.length) * 100)
    const passed = score >= 80
    onSubmit({ score, passed })
  }

  return (
    <div className="test-page">
      <div className="course-landing-bar">
        <button className="btn-back" onClick={onBack}><Icon.ChevronLeft /> {LX(lang, 'Back to course overview', 'Zurück zur Kursübersicht')}</button>
      </div>

      <div className="cc-wrap">
        <h1 className="cc-title">{LX(lang, 'Test', 'Test')}: {course.category}: {course.topic}</h1>
        <p className="cc-sub">
          {({
            en: <>Answer all questions in a single attempt. Pass threshold: <strong>80&nbsp;% correct answers</strong>. After submission you will only receive the overall result (no per-question breakdown).</>,
            de: <>Beantworte alle Fragen in einem Durchgang. Bestehensgrenze: <strong>80&nbsp;% korrekte Antworten</strong>. Du erhältst nach Abgabe nur das Gesamtergebnis (keine Einzelauflösung).</>,
            it: <>Rispondi a tutte le domande in un unico tentativo. Soglia di superamento: <strong>80&nbsp;% di risposte corrette</strong>. Dopo l’invio riceverai solo il risultato complessivo (nessun dettaglio per domanda).</>,
            cz: <>Odpověz na všechny otázky v jednom pokusu. Hranice úspěšnosti: <strong>80&nbsp;% správných odpovědí</strong>. Po odeslání obdržíš pouze celkový výsledek (bez rozpisu po otázkách).</>,
            fr: <>Réponds à toutes les questions en une seule fois. Seuil de réussite : <strong>80&nbsp;% de réponses correctes</strong>. Après l’envoi, tu ne recevras que le résultat global (aucun détail par question).</>,
            pt: <>Responde a todas as perguntas numa única tentativa. Limiar de aprovação: <strong>80&nbsp;% de respostas corretas</strong>. Após o envio, receberás apenas o resultado global (sem detalhe por pergunta).</>,
            nl: <>Beantwoord alle vragen in één keer. Slaaggrens: <strong>80&nbsp;% correcte antwoorden</strong>. Na het inleveren krijg je alleen de totaaluitslag (geen uitwerking per vraag).</>,
            ro: <>Răspunde la toate întrebările într-o singură încercare. Prag de promovare: <strong>80&nbsp;% răspunsuri corecte</strong>. După trimitere vei primi doar rezultatul general (fără detalii pe întrebări).</>,
            es: <>Responde todas las preguntas en un solo intento. Umbral de aprobación: <strong>80&nbsp;% de respuestas correctas</strong>. Tras el envío solo recibirás el resultado global (sin desglose por pregunta).</>,
            sr: <>Odgovori na sva pitanja u jednom pokušaju. Prag za prolaz: <strong>80&nbsp;% tačnih odgovora</strong>. Nakon slanja dobijaš samo ukupan rezultat (bez pregleda po pitanju).</>,
            ar: <>أجب عن جميع الأسئلة في محاولة واحدة. حد النجاح: <strong>80&nbsp;% من الإجابات الصحيحة</strong>. بعد الإرسال ستحصل على النتيجة الإجمالية فقط (بدون تفصيل لكل سؤال).</>,
          }[lang]) || (
            <>Answer all questions in a single attempt. Pass threshold: <strong>80&nbsp;% correct answers</strong>. After submission you will only receive the overall result (no per-question breakdown).</>
          )}
        </p>

        <div className="test-questions">
          {course.questions.map((q, qi) => {
            let visual = null
            if (q.screenshot) {
              visual = <img src={q.screenshot} alt="" className="test-q-screenshot" />
            } else if (q.screenshotNote) {
              visual = <div className="test-q-screenshot-placeholder">📷 {LX(lang, 'Screenshot coming', 'Screenshot folgt')} — {q.screenshotNote}</div>
            } else if (q.image) {
              visual = q.image
            }
            return (
              <fieldset key={qi} className="test-q">
                <legend className="test-q-legend"><span className="test-q-no">{LX(lang, 'Question', 'Frage')} {qi + 1}</span> {q.q}</legend>
                {visual && <div className="test-q-image">{visual}</div>}
                <div className="test-options">
                  {q.options.map((o, oi) => (
                    <label key={oi} className={`test-opt${answers[qi] === oi ? ' is-selected' : ''}`}>
                      <input type="radio" name={`q-${qi}`} checked={answers[qi] === oi}
                             onChange={() => setAnswers(a => ({ ...a, [qi]: oi }))} />
                      <span className="test-opt-letter">{String.fromCharCode(65 + oi)}</span>
                      <span className="test-opt-text">{o}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )
          })}
        </div>

        <div className="test-submit">
          <button className="btn-primary big" onClick={submit}>
            {LXP(lang, 'Finish test (${answered}/${total} answered)',
              `Finish test (${Object.keys(answers).length}/${course.questions.length} answered)`,
              `Test abschließen (${Object.keys(answers).length}/${course.questions.length} beantwortet)`,
              { answered: Object.keys(answers).length, total: course.questions.length })}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ===================== TEST RESULT ===================== */
function TestResultPage({ course, score, passed, navigate, onBack }) {
  const lang = useLang()
  return (
    <div className="test-result">
      <div className="course-landing-bar">
        <button className="btn-back" onClick={onBack}><Icon.ChevronLeft /> {LX(lang, 'Back to course overview', 'Zurück zur Kursübersicht')}</button>
      </div>

      <div className="tr-card">
        <div className={`tr-score-ring${passed ? ' passed' : ' failed'}`}>
          <svg viewBox="0 0 120 120" className="tr-ring">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#eee" strokeWidth="8" />
            <circle cx="60" cy="60" r="54" fill="none" strokeWidth="8" strokeLinecap="round"
                    stroke={passed ? '#18A455' : '#B61E58'}
                    strokeDasharray={`${(score / 100) * 339.29} 339.29`}
                    transform="rotate(-90 60 60)" />
          </svg>
          <div className="tr-score-num">{score}<span>%</span></div>
        </div>

        <h1 className={`tr-h ${passed ? 'pass' : 'fail'}`}>
          {passed ? LX(lang, 'Passed!', 'Bestanden!') : LX(lang, 'Unfortunately not passed', 'Leider nicht bestanden')}
        </h1>
        <p className="tr-msg">
          {passed
            ? LXP(lang, 'You passed the "${topic}" test with ${score}%. Once the training is also completed, the module counts as certified.',
                `You passed the "${course.topic}" test with ${score}%. Once the training is also completed, the module counts as certified.`,
                `Du hast den Test zu „${course.topic}" mit ${score}% bestanden. Sobald auch das Training abgeschlossen ist, gilt das Modul als zertifiziert.`,
                { topic: course.topic, score })
            : LXP(lang, 'You achieved ${score}% correct answers. At least 80% is required to pass. Review the course once more and try again.',
                `You achieved ${score}% correct answers. At least 80% is required to pass. Review the course once more and try again.`,
                `Du hast ${score}% korrekte Antworten erreicht. Zum Bestehen sind mindestens 80% erforderlich. Schau dir den Kurs noch einmal an und versuche es erneut.`,
                { score })}
        </p>

        <div className="tr-actions">
          {passed
            ? (<>
                <button className="btn-primary big" onClick={onBack}>{LX(lang, 'To course overview', 'Zur Kursübersicht')}</button>
                <button className="btn-ghost big" onClick={() => navigate({ name: 'home' })}>{LX(lang, 'All courses', 'Alle Kurse')}</button>
              </>)
            : (<>
                <button className="btn-primary big" onClick={() => navigate({ name: 'test', courseId: course.id })}>{LX(lang, 'Try again', 'Erneut versuchen')}</button>
                <button className="btn-ghost big" onClick={() => navigate({ name: 'course-content', courseId: course.id })}>{LX(lang, 'Review course', 'Kurs nochmal ansehen')}</button>
              </>)}
        </div>
      </div>
    </div>
  )
}

/* ===================== CERTIFICATE PAGE ===================== */
function Signature() {
  const [err, setErr] = useState(false)
  if (err) return <span className="sig-empty" aria-hidden="true" />
  return <img className="sig-img" src={assetUrl("/signature.png")} alt="Dr. Daniel Wallerstorfer" onError={() => setErr(true)} />
}

const formatDateDE = (d = new Date()) =>
  d.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
const formatDateEN = (d = new Date()) =>
  d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
/* Das Zertifikat setzt den Fließtext für alles außer 'de' auf Englisch
   (generateCert.js). Ein deutsch formatiertes Datum in einem englischen Satz
   passte also für 9 von 11 Sprachen nicht — jede Sprache bekommt ihr Format. */
const DATE_LOCALE = {
  de: 'de-DE', en: 'en-US', cz: 'cs-CZ', fr: 'fr-FR', pt: 'pt-PT', it: 'it-IT',
  nl: 'nl-NL', ro: 'ro-RO', es: 'es-ES', sr: 'sr-Latn-RS', ar: 'ar',
}
const formatDate = (lang, d = new Date()) => {
  if (lang === 'de') return formatDateDE(d)
  try {
    return d.toLocaleDateString(DATE_LOCALE[lang] || 'en-US',
      { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return formatDateEN(d) }
}

/* Logo der Instanz (brand.js) samt Zusatz „Academy". Das Bild trägt den
   Markennamen als alt-Text, damit Überschriften mit Logo weiter einen
   vollständigen zugänglichen Namen haben („10X Health Academy"). */
function BrandLogo({ onDark = false, className = '' }) {
  return (
    <span className={`brand-logo ${className}`}>
      <img
        className="brand-logo-img"
        src={assetUrl(onDark ? BRAND.logo.srcOnDark : BRAND.logo.src)}
        alt={BRAND.logo.alt}
        width={BRAND.logo.width}
        height={BRAND.logo.height}
      />
      <span className="brand-logo-sep" aria-hidden="true" />
      <span className="brand-logo-label">{BRAND.academyLabel}</span>
    </span>
  )
}

/* Novogenia logo — uses /novogenia-logo.png if dropped in /public, otherwise inline SVG fallback */
function NovogeniaLogo({ className = '' }) {
  const [err, setErr] = useState(false)
  if (!err) {
    return (
      <img
        className={`ng-logo-img ${className}`}
        src={assetUrl("/novogenia-logo.png")}
        alt="Novogenia"
        onError={() => setErr(true)}
      />
    )
  }
  return (
    <div className={`ng-logo ${className}`}>
      <svg viewBox="0 0 56 56" className="ng-logo-mark" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="52" height="52" rx="9" fill="none" stroke="#C8D44A" strokeWidth="3.5"/>
        <path d="M16 41 V18 L40 41 V18" stroke="#1a1a1a" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="ng-logo-word">novogenia</span>
    </div>
  )
}

/* Faux QR code (decorative) */
function FauxQR({ size = 88 }) {
  const N = 17
  let seed = 12345
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const cells = []
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const isFinder =
        (x < 7 && y < 7) ||
        (x >= N - 7 && y < 7) ||
        (x < 7 && y >= N - 7)
      if (isFinder) {
        const lx = x < 7 ? x : x - (N - 7)
        const ly = y < 7 ? y : y - (N - 7)
        const onBorder = lx === 0 || lx === 6 || ly === 0 || ly === 6
        const onInner = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4
        if (onBorder || onInner) cells.push([x, y])
      } else if (rand() > 0.55) {
        cells.push([x, y])
      }
    }
  }
  const cell = size / N
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="cert-qr-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width={size} height={size} fill="#fff"/>
      {cells.map(([x, y], i) => (
        <rect key={i} x={x * cell} y={y * cell} width={cell} height={cell} fill="#1a1a1a"/>
      ))}
    </svg>
  )
}

function CertificatePage({ name, courses, isSample, onBack }) {
  const lang = useLang()
  const t = useT()
  const fallbackName = LX(lang, 'Jane Doe', 'Maria Mustermann')
  const dateStr = formatDate(lang, isSample ? new Date(2026, 4, 5) : new Date())
  const [downloading, setDownloading] = useState(false)

  const downloadPdf = async () => {
    setDownloading(true)
    try {
      // pdf-lib + fontkit load on demand (keeps them out of the initial bundle)
      const { downloadCertificate } = await import('./generateCert.js')
      await downloadCertificate({ name: name || fallbackName, courses, dateStr, lang })
    } catch (err) {
      console.error('PDF generation failed', err)
      alert(LX(lang, 'Failed to generate the PDF. Please try again.', 'PDF konnte nicht erstellt werden. Bitte erneut versuchen.'))
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="cert-view">
      <div className="cert-toolbar">
        <button className="btn-ghost" onClick={onBack}><Icon.ChevronLeft /> {LX(lang, 'Back', 'Zurück')}</button>
        <div className="cert-toolbar-spacer" />
        {isSample && <span className="sample-badge">{LX(lang, 'EXAMPLE', 'BEISPIEL')}</span>}
        <button className="btn-primary" onClick={downloadPdf} disabled={downloading}>
          <Icon.Download /> {downloading ? LX(lang, 'Generating...', 'Wird erstellt...') : LX(lang, 'Download as PDF', 'Als PDF herunterladen')}
        </button>
      </div>

      <div className="cert-canvas">
        <div className="certificate" id="certificate-print">
          {/* The on-screen certificate now uses the actual PDF as background.
              Logo, signature, wine wedge — all baked into cert-template.pdf.
              Lazy: pdfjs loads only when the certificate is actually opened. */}
          <Suspense fallback={null}><CertTemplateBg /></Suspense>

          <div className="cert-content">
            <p className="cert-novo">{BRAND.cert?.headline || 'NOVOGENIA'}</p>
            <p className="cert-coach">{t('cert_mini_genetik_coach')}</p>

            {/* Recipient block */}
            <p className="cert-confirm">{t('certpage_presented_to')}</p>
            <p className="cert-name">{name}</p>

            {/* Date sentence */}
            <p className="cert-completion-text">
              {t('certpage_completed_on')} <strong>{dateStr}</strong>{t('certpage_completed_suffix')}
            </p>

            {/* Module list — SemiBold category + Light topic */}
            <ul className="cert-modules">
              {courses.map((c, i) => {
                const idx = c.indexOf(': ')
                const cat = idx > -1 ? c.slice(0, idx) : c
                const topic = idx > -1 ? c.slice(idx + 2) : ''
                return (
                  <li key={i}>
                    <span className="cert-mod-cat">{cat}{topic ? ':' : ''}</span>
                    {topic && <> <span className="cert-mod-topic">{topic}</span></>}
                  </li>
                )
              })}
            </ul>

          </div>

          {/* "Dr. Daniel Wallerstorfer" is already baked into the template; we only add the role line */}
          <div className="cert-sig-block">
            <div className="cert-sig-role">{LX(lang, 'CEO of Novogenia', 'CEO von Novogenia')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===================== APP ===================== */

/* User-state persistence
   ----------------------
   The per-course progress (watched / testPassed / testScore / …) is keyed
   by the COURSE'S STABLE UID — never by the human-readable slug. That way
   renaming a slug in data.js does NOT lose user completion data.

   Migration: legacy state (keyed by slug) is detected on first load and
   automatically migrated to uid-keying via the current COURSES lookup. */
const STATE_KEY = 'novoacademy_user_state'

const loadUserState = () => {
  const fresh = buildInitialState()
  try {
    const raw = localStorage.getItem(STATE_KEY)
    if (!raw) return fresh
    const stored = JSON.parse(raw)
    // Build slug→uid map to detect+migrate legacy keys
    const slugToUid = {}
    for (const c of COURSES) if (c.uid) slugToUid[c.id] = c.uid
    const merged = { ...fresh }
    for (const [k, v] of Object.entries(stored)) {
      // If the key matches an existing uid, use as-is.
      // If it matches a legacy slug, migrate to that course's uid.
      const targetKey = (k in fresh) ? k : (slugToUid[k] || null)
      if (targetKey) merged[targetKey] = { ...merged[targetKey], ...v }
    }
    return merged
  } catch {
    return fresh
  }
}

const saveUserState = (state) => {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(state)) } catch {}
}

const LANG_KEY = 'novoacademy_lang'
const LANG_CHOSEN_KEY = 'novoacademy_lang_chosen'   // marker so we know lang-pick was done
/* Instanz mit fester Sprache (brand.js): keine Sprachwahl, gespeicherte
   Fremdsprachen aus früheren Besuchen werden ignoriert. */
const loadLang = () => {
  if (BRAND.lockedLang) return BRAND.lockedLang
  try { return localStorage.getItem(LANG_KEY) || 'de' } catch { return 'de' }
}
const hasChosenLang = () => {
  if (BRAND.lockedLang) return true
  try { return localStorage.getItem(LANG_CHOSEN_KEY) === '1' } catch { return false }
}

export default function App() {
  // ---- Outer flow ----
  // Phase: 'lang-pick' (first visit) → 'landing' (intro) → 'auth' (signup/login) → 'app' (logged-in academy)
  const [langChosen, setLangChosen] = useState(hasChosenLang)
  const [session, setSession] = useState(() => getCurrentSession())
  const [profile, setProfile] = useState(null)
  const [outerRoute, setOuterRoute] = useState(null) // null = derived from phase; otherwise 'landing'|'auth-signup'|'auth-login'|'impressum'|'datenschutz'|'barrierefreiheit'
  const [authBusy, setAuthBusy] = useState(false)
  /* Einzige Quelle der Wahrheit für die Cookie-Zustimmung; wird unten per
     CookieContext an alle Player und die Datenschutzseite verteilt. */
  const cookieConsent = useCookieConsentState()
  const [consent, setConsent] = cookieConsent
  const showBanner = consent === null

  // Subscribe to auth changes (Supabase session + mock session)
  useEffect(() => {
    const unsub = onAuthChange((s) => setSession(s))
    return unsub
  }, [])

  // When logged in, load the user's profile (so we know if they're admin)
  useEffect(() => {
    if (!session?.user?.id) { setProfile(null); return }
    let cancelled = false
    ;(async () => {
      const p = await getMyProfile()
      if (!cancelled) setProfile(p)
    })()
    return () => { cancelled = true }
  }, [session?.user?.id])

  // ---- Inner academy state ----
  const [route, setRoute] = useState({ name: 'home' })
  const [courseState, setCourseState] = useState({})
  const [certName, setCertName] = useState('')
  const [lastTestResult, setLastTestResult] = useState(null)
  const [lang, setLangState] = useState(loadLang)

  const setLang = (newLang) => {
    if (BRAND.lockedLang && newLang !== BRAND.lockedLang) return
    setLangState(newLang)
    try {
      localStorage.setItem(LANG_KEY, newLang)
      localStorage.setItem(LANG_CHOSEN_KEY, '1')
    } catch {}
    setLangChosen(true)
    // Persist to user profile (for admin language stats)
    updateMyLang(newLang).catch(() => {})
  }
  useEffect(() => { try { localStorage.setItem(LANG_KEY, lang) } catch {} }, [lang])

  // Set <html lang> + text direction (RTL for Arabic) — must come after `lang` is declared
  useEffect(() => {
    /* Unsere internen Kürzel sind nicht durchgehend gültige BCP-47-Sprachtags:
       'cz' ist der Ländercode für Tschechien, die SPRACHE ist 'cs'. Screenreader
       wählen anhand dieses Attributs die Aussprache — ein falscher Code führt zu
       unverständlicher Vorlesestimme (WCAG 3.1.1). 'sr' wird zusätzlich auf die
       lateinische Schriftvariante festgelegt, weil unsere Texte Latein sind. */
    const BCP47 = { cz: 'cs', sr: 'sr-Latn' }
    const gueltig = ['de', 'en', 'it', 'cz', 'fr', 'pt', 'nl', 'ro', 'es', 'sr', 'ar'].includes(lang) ? lang : 'de'
    document.documentElement.lang = BCP47[gueltig] || gueltig
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  // Track whether the remote load has finished — guard writes until then
  // so we don't overwrite local edits made before load resolves,
  // and so we don't immediately upsert the just-loaded data.
  const progressLoadedRef = useRef(false)
  const saveTimerRef = useRef(null)
  // true, wenn der letzte Ladeversuch fehlgeschlagen ist — dann bleibt das
  // Speichern gesperrt, damit kein Nullzustand den echten Fortschritt ersetzt.
  const [progressLoadFailed, setProgressLoadFailed] = useState(false)
  /* Letzter fehlgeschlagener Schreibversuch. Ohne diese Anzeige sah der Nutzer
     Fortschritt, der nie in der Datenbank ankam. */
  const [speicherFehler, setSpeicherFehler] = useState(null)

  // Load per-user progress when session becomes available
  useEffect(() => {
    if (!session?.user?.id) {
      progressLoadedRef.current = false
      setCourseState({})
      return
    }
    let cancelled = false
    progressLoadedRef.current = false
    ;(async () => {
      const remote = await loadProgress(session.user.id)
      if (cancelled) return
      // null = der Load ist FEHLGESCHLAGEN (Netzwerk, 5xx, abgelaufenes Token).
      // Dann darf der Speicher-Effekt NICHT freigegeben werden, sonst würde er
      // den leeren Startzustand zurückschreiben und echten Fortschritt löschen.
      if (remote === null) {
        console.warn('Fortschritt konnte nicht geladen werden — Speichern bleibt gesperrt.')
        setProgressLoadFailed(true)
        return
      }
      setProgressLoadFailed(false)
      // Merge initial defaults with remote, then preserve any local edits
      // made BEFORE the load finished (e.g. user marked a course complete fast)
      const fresh = buildInitialState()
      const merged = { ...fresh }
      for (const [k, v] of Object.entries(remote || {})) {
        merged[k] = { ...merged[k], ...v }
      }
      setCourseState(local => {
        const out = { ...merged }
        for (const [k, v] of Object.entries(local || {})) {
          // Local watched/passed wins (user explicitly did it during load)
          if (v?.watched || v?.testPassed) {
            out[k] = { ...out[k], ...v }
          }
        }
        return out
      })
      // Only fill cert name if user hasn't already typed one
      // Pre-fill the certificate name with a nicely capitalised version,
      // never with the raw email. Don't overwrite if the user already typed
      // something themselves.
      setCertName(prev => prev || bestDisplayName(session.profile?.name, session.user?.email))
      progressLoadedRef.current = true
    })()
    return () => { cancelled = true }
  }, [session?.user?.id])

  // Persist progress — debounced, only after the initial load has resolved
  useEffect(() => {
    if (!session?.user?.id) return
    if (!progressLoadedRef.current) return
    if (progressLoadFailed) return          // fehlgeschlagener Load: nie zurückschreiben
    if (Object.keys(courseState).length === 0) return
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    const uid = session.user.id
    const snapshot = courseState
    saveTimerRef.current = setTimeout(() => {
      saveTimerRef.current = null
      saveProgress(uid, snapshot).then(r => setSpeicherFehler(r?.error || null))
    }, 800)
    // Wird die Seite verlassen, bevor der Debounce abgelaufen ist, ginge die
    // letzte Aktion sonst verloren — deshalb vorher sofort schreiben.
    const flush = () => {
      if (!saveTimerRef.current) return
      clearTimeout(saveTimerRef.current)
      saveTimerRef.current = null
      saveProgress(uid, snapshot)
    }
    window.addEventListener('pagehide', flush)
    return () => {
      window.removeEventListener('pagehide', flush)
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [courseState, session?.user?.id, progressLoadFailed])

  // Browser / phone Back-button support: mirror in-app navigation into the
  // History API so Back and Forward move between app screens instead of leaving
  // the site. The URL stays the same (GitHub Pages has no SPA server routing);
  // the route object is stashed in history.state and restored on popstate.
  const navigate = (r) => {
    window.scrollTo(0, 0)
    fokusNachWechsel.current = true
    try { window.history.pushState({ __novoRoute: r }, '') } catch {}
    setRoute(r)
  }

  /* Fokus beim Seitenwechsel in den Inhaltsbereich holen (WCAG 2.4.3).
     In einer SPA tauscht nur der Inhalt — Tastatur- und Screenreader-Nutzer
     stünden sonst unsichtbar auf der alten Seite und müssten sich erneut durch
     die ganze Navigation tabben.
     Bewusst ein Effekt und kein requestAnimationFrame in navigate(): rAF lief
     VOR Reacts Commit, fokussierte also den alten <main>-Knoten, den React
     danach ersetzte — der Fokus fiel zurück auf <body> (im Browser gemessen).
     Der Effekt läuft nach dem Commit und erfasst zusätzlich die Browser-
     Zurück-Taste und die Rechtsseiten, die navigate() gar nicht durchlaufen.
     Beim ersten Rendern wird nicht fokussiert — sonst überspränge der Einstieg
     die Kopfzeile. */
  const fokusNachWechsel = useRef(false)
  /* Wie navigate() einen History-Eintrag schreiben. Ohne ihn verliess die
     Zurueck-Taste auf Impressum, Datenschutz und der Barrierefreiheits-
     erklaerung die Seite, statt in die Academy zurueckzufuehren. */
  const geheZu = (r) => {
    window.scrollTo(0, 0)
    fokusNachWechsel.current = true
    try { window.history.pushState({ __novoRoute: routeRef.current, __novoOuter: r }, '') } catch {}
    setOuterRoute(r)
  }
  useEffect(() => {
    /* Nur nach einer echten Navigation fokussieren, nicht beim Seiteneinstieg —
       dort bliebe sonst die Kopfzeile per Tab unerreichbar (nur rückwärts). */
    if (!fokusNachWechsel.current) return
    fokusNachWechsel.current = false
    const ziel = document.getElementById('main-content')
    if (ziel) { try { ziel.focus({ preventScroll: true }) } catch {} }
  }, [route, outerRoute])

  /* WCAG 2.4.2: Der Titel blieb in der gesamten SPA "NOVO ACADEMY — Novogenia".
     Screenreader lesen ihn bei jedem Ansichtswechsel vor, und im Verlauf sind
     alle Eintraege ununterscheidbar. Wir leiten ihn aus der Ueberschrift der
     Ansicht ab — so wandert er automatisch mit und ist mitübersetzt. */
  useEffect(() => {
    /* Direkt im Effekt, nicht in requestAnimationFrame: rAF liefe vor Reacts
       Commit und läse noch die Überschrift der VORIGEN Ansicht. */
    const h1 = document.querySelector('#main-content h1, h1')
    const titel = (h1?.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 70)
    const istLogo = h1?.classList.contains('page-title-logo') || h1?.querySelector('.brand-logo')
    document.title = titel && !istLogo
      ? titel + ' — ' + BRAND.productName
      : BRAND.productName
  }, [route, outerRoute, lang, session])

  const routeRef = useRef(route)
  routeRef.current = route
  useEffect(() => {
    // Seed the current history entry so the first Back returns here, not off-site.
    try { window.history.replaceState({ __novoRoute: routeRef.current }, '') } catch {}
    const onPop = (e) => {
      const r = e.state && e.state.__novoRoute
      window.scrollTo(0, 0)
      fokusNachWechsel.current = true
      setRoute(r || { name: 'home' })
      // Beide Router-Ebenen wiederherstellen, sonst bliebe eine Rechtsseite
      // beim Zurueckgehen offen.
      setOuterRoute((e.state && e.state.__novoOuter) ?? null)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const markCompleted = (course) => {
    const k = courseKey(course)
    setCourseState(s => ({ ...s, [k]: { ...s[k], watched: true } }))
  }
  const recordTest = (course, score, passed) => {
    const k = courseKey(course)
    setCourseState(s => ({ ...s, [k]: { ...s[k], testScore: score, testPassed: passed || s[k]?.testPassed } }))
  }

  const courseById = (id) => COURSES.find(c => c.id === id)

  // Nur Kurse der AKTUELLEN Sprache — sonst zählt der Zertifikats-Hinweis
  // Module aller 11 Sprachen mit und das PDF listet deutsche Titel auf einem
  // arabischen Zertifikat. Der Fortschrittsbalken filtert bereits so.
  const certifiedCourses = useMemo(() =>
    COURSES.filter(c => (c.lang || 'de') === lang && isCertified(c, courseState))
           .map(c => `${c.category}: ${c.topic}`),
  [courseState, lang])

  const sampleName = LX(lang, 'Jane Doe', 'Maria Mustermann')

  /* ===== Decide which top-level screen to render ===== */
  let page
  /* true, wenn der Zweig seine main-Landmarke selbst setzt — nämlich dann,
     wenn er eine eigene Kopfzeile mitbringt und das Sprungziel dahinter liegen
     muss. Sonst legt die Hülle unten das <main> um die ganze Ansicht. */
  let inhaltEingebettet = false

  const legalFooterProps = {
    onImpressum:       () => geheZu('impressum'),
    onDatenschutz:     () => geheZu('datenschutz'),
    onBarrierefreiheit:() => geheZu('barrierefreiheit'),
    onCookieSettings:  () => setConsent(null),
  }

  if (outerRoute === 'impressum') {
    inhaltEingebettet = true
    page = (
      <div className="legal-page-wrap">
        <Inhalt><ImpressumPage onBack={() => geheZu(null)} /></Inhalt>
        <LegalFooter {...legalFooterProps} />
      </div>
    )
  } else if (outerRoute === 'datenschutz') {
    inhaltEingebettet = true
    page = (
      <div className="legal-page-wrap">
        <Inhalt><DatenschutzPage onBack={() => geheZu(null)} onCookieSettings={() => setConsent(null)} /></Inhalt>
        <LegalFooter {...legalFooterProps} />
      </div>
    )
  } else if (outerRoute === 'barrierefreiheit') {
    inhaltEingebettet = true
    page = (
      <div className="legal-page-wrap">
        <Inhalt><BarrierefreiheitPage onBack={() => geheZu(null)} /></Inhalt>
        <LegalFooter {...legalFooterProps} />
      </div>
    )
  } else if (!langChosen) {
    page = <LangPickPage onPick={(l) => setLang(l)} />
  } else if (!session) {
    // Not logged in — show landing or auth
    const mode = outerRoute === 'auth-signup' ? 'signup'
              : outerRoute === 'auth-login'  ? 'login'
              : 'landing'
    if (mode === 'landing') {
      inhaltEingebettet = true
      page = (
        <LandingPage
          lang={lang}
          setLang={setLang}
          onSignUp={() => geheZu('auth-signup')}
          onLogIn={() => geheZu('auth-login')}
          onImpressum={legalFooterProps.onImpressum}
          onDatenschutz={legalFooterProps.onDatenschutz}
          onBarrierefreiheit={legalFooterProps.onBarrierefreiheit}
          onCookieSettings={legalFooterProps.onCookieSettings}
        />
      )
    } else {
      inhaltEingebettet = true
      page = (
        <AuthPage
          mode={mode}
          lang={lang}
          setLang={setLang}
          busy={authBusy}
          setBusy={setAuthBusy}
          onSwitchMode={() => geheZu(mode === 'signup' ? 'auth-login' : 'auth-signup')}
          onBackToLanding={() => geheZu('landing')}
        />
      )
    }
  } else if (route.name === 'course-landing' && courseById(route.courseId)) {
    const course = courseById(route.courseId)
    page = <CourseLandingPage course={course} state={courseState[courseKey(course)] || {}} navigate={navigate} onBack={() => navigate({ name: 'home' })} />
  } else if (route.name === 'course-content' && courseById(route.courseId)) {
    const course = courseById(route.courseId)
    if (course.contentType === 'faq') {
      page = <FaqPage course={course} state={courseState[courseKey(course)] || {}}
        onComplete={() => { markCompleted(course); navigate({ name: 'course-landing', courseId: course.id }) }}
        onBack={() => navigate({ name: 'course-landing', courseId: course.id })} />
    } else {
      page = <CourseContentPage course={course} state={courseState[courseKey(course)] || {}}
        onComplete={() => { markCompleted(course); navigate({ name: 'course-landing', courseId: course.id }) }}
        onStartTest={() => navigate({ name: 'test', courseId: course.id })}
        onBack={() => navigate({ name: 'course-landing', courseId: course.id })}
        navigate={navigate} />
    }
  } else if (route.name === 'test' && courseById(route.courseId)) {
    const course = courseById(route.courseId)
    page = <TestPage course={course}
      onSubmit={({ score, passed }) => {
        recordTest(course, score, passed)
        setLastTestResult({ courseId: course.id, score, passed })
        navigate({ name: 'test-result', courseId: course.id })
      }}
      onBack={() => navigate({ name: 'course-landing', courseId: course.id })} />
  } else if (route.name === 'test-result' && courseById(route.courseId)) {
    const course = courseById(route.courseId)
    page = <TestResultPage course={course} score={lastTestResult?.score || 0} passed={lastTestResult?.passed || false}
      navigate={navigate} onBack={() => navigate({ name: 'course-landing', courseId: course.id })} />
  } else if (route.name === 'certificate') {
    page = <CertificatePage name={route.isSample ? sampleName : certName}
      courses={route.isSample ? getSampleCourseList(lang) : certifiedCourses}
      isSample={route.isSample} onBack={() => navigate({ name: 'home' })} />
  } else if (route.name === 'admin' && profile?.is_admin) {
    inhaltEingebettet = true
    page = (
      <div className="app no-sidebar">
        <div className="main">
          <TopBar lang={lang} setLang={setLang} session={session} profile={profile} navigate={navigate} />
          <Inhalt><AdminPage onBack={() => navigate({ name: 'home' })} eigeneId={session?.user?.id} /></Inhalt>
        </div>
        <LegalFooter {...legalFooterProps} />
      </div>
    )
  } else {
    inhaltEingebettet = true
    page = (
      <div className="app no-sidebar">
        <div className="main">
          <TopBar lang={lang} setLang={setLang} session={session} profile={profile} navigate={navigate} />
          <Inhalt><HomePage
            courseState={courseState}
            navigate={navigate}
            certName={certName}
            setCertName={setCertName}
            completedCertifiableCount={certifiedCourses.length}
            certifiedTitles={certifiedCourses}
            lang={lang}
          /></Inhalt>
        </div>
        <LegalFooter {...legalFooterProps} />
      </div>
    )
  }

  return (
    <LangContext.Provider value={lang}>
      <CookieContext.Provider value={cookieConsent}>
      <a className="skip-to-content" href="#main-content">
        {LX(lang, 'Skip to content', 'Zum Inhalt springen')}
      </a>
      {/* Sprungziel des Skip-Links ist immer die main-Landmarke der Ansicht.
          Zweige mit eigener Kopfzeile setzen sie selbst — dort MUSS sie hinter
          der Navigation liegen, sonst springt der Skip-Link mitten hinein.
          Alle anderen Ansichten bringen keine Kopfzeile mit; für sie ist die
          ganze Ansicht der Inhalt. Kopf- und Fußbereich bleiben in beiden
          Fällen außerhalb von <main> und behalten damit ihre banner- bzw.
          contentinfo-Rolle. */}
      {speicherFehler && (
        <p className="speicher-fehler" role="alert">{tBase(lang, 'progress_save_failed')}</p>
      )}
      {inhaltEingebettet ? page : <Inhalt>{page}</Inhalt>}
      {showBanner && (
        <CookieBanner
          onAccept={() => setConsent('all')}
          onNecessary={() => setConsent('necessary')}
          onOpenPrivacy={() => geheZu('datenschutz')}
        />
      )}
      <SupportBotLauncher lang={lang} />
      </CookieContext.Provider>
    </LangContext.Provider>
  )
}

/* ===================== TOP BAR ===================== */
function TopBar({ lang, setLang, session, profile, navigate }) {
  const t = useT()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const isAdmin = Boolean(profile?.is_admin)

  useEffect(() => {
    if (!menuOpen) return
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [menuOpen])

  return (
    <div className="topbar">
      <div className="page-title">
        <h1 className="page-title-logo"><BrandLogo /></h1>
      </div>
      <div className="topbar-actions">
        {lang && setLang && !BRAND.lockedLang && (
          <div className="lang-switcher" title="Language / Sprache">
            {['de','en','cz','fr','pt','it','nl','ro','es','sr','ar'].map(l => (
              <button
                key={l}
                className={`lang-btn${lang === l ? ' is-active' : ''}`} aria-pressed={lang === l}
                onClick={() => setLang(l)}
              >{l.toUpperCase()}</button>
            ))}
          </div>
        )}
        {isAdmin && navigate && (
          <button
            className="admin-gear-btn"
            onClick={() => navigate({ name: 'admin' })}
            aria-label={t('admin_title')}
            title={t('admin_title')}
          >
            <Icon.Gear />
          </button>
        )}
        {session && (() => {
          const displayName = bestDisplayName(session.profile?.name, session.user?.email)
          return (
          <div className="user-menu" ref={menuRef}>
            <button className="user-menu-btn" onClick={() => setMenuOpen(o => !o)} aria-haspopup="true" aria-expanded={menuOpen}>
              <span className="user-menu-avatar">{(displayName || '?').charAt(0).toUpperCase()}</span>
              <span className="user-menu-name">{displayName}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {menuOpen && (
              <div className="user-menu-pop" role="menu">
                <div className="user-menu-pop-label">{t('user_signed_in_as')}</div>
                <div className="user-menu-pop-email">{session.user?.email}</div>
                <button className="user-menu-pop-action" onClick={() => { setMenuOpen(false); signOut() }}>
                  {t('user_logout')}
                </button>
              </div>
            )}
          </div>
          )
        })()}
      </div>
    </div>
  )
}

/* ===================== LANGUAGE PICKER (first visit) ===================== */
function LangPickPage({ onPick }) {
  return (
    <div className="langpick-page">
      <div className="langpick-card">
        <div className="langpick-logo">
          <BrandLogo />
        </div>
        {/* h1, nicht h2: das ist die erste Seite der Anwendung und hatte bisher
            gar keine Hauptüberschrift (WCAG 1.3.1 / 2.4.6). Bewusst zweisprachig —
            an dieser Stelle ist die Sprache des Nutzers noch unbekannt. */}
        <h1 className="langpick-title">Choose your language · Sprache wählen</h1>
        <p className="langpick-sub">You can change this later. · Du kannst dies später ändern.</p>
        <div className="langpick-options">
          {[
            { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
            { code: 'en', flag: '🇬🇧', label: 'English' },
            { code: 'cz', flag: '🇨🇿', label: 'Čeština' },
            { code: 'fr', flag: '🇫🇷', label: 'Français' },
            { code: 'pt', flag: '🇵🇹', label: 'Português' },
            { code: 'it', flag: '🇮🇹', label: 'Italiano' },
            { code: 'nl', flag: '🇳🇱', label: 'Nederlands' },
            { code: 'ro', flag: '🇷🇴', label: 'Română' },
            { code: 'es', flag: '🇪🇸', label: 'Español' },
            { code: 'sr', flag: '🇷🇸', label: 'Srpski / Hrvatski' },
            { code: 'ar', flag: '🇸🇦', label: 'العربية' },
          ].map(o => (
            <button key={o.code} className="langpick-option" onClick={() => onPick(o.code)}>
              <span className="langpick-flag" aria-hidden="true">{o.flag}</span>
              <span className="langpick-label">{o.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ===================== LANDING PAGE (logged-out intro) ===================== */
function LandingPage({ lang, setLang, onSignUp, onLogIn, onImpressum, onDatenschutz, onBarrierefreiheit, onCookieSettings }) {
  const t = useT()
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-header-inner">
          <div className="landing-logo">
            <BrandLogo />
          </div>
          <div className="landing-header-right">
            {!BRAND.lockedLang && (
              <div className="lang-switcher" title="Language / Sprache">
                {['de','en','cz','fr','pt','it','nl','ro','es','sr','ar'].map(l => (
                  <button key={l} className={`lang-btn${lang === l ? ' is-active' : ''}`} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
                ))}
              </div>
            )}
            <button className="btn-ghost landing-login-btn" onClick={onLogIn}>{t('landing_cta_login')}</button>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="skip-target">
      <section className="landing-hero">
        <div className="landing-hero-inner">
          <span className="nd-eyebrow"><span className="nd-eyebrow-dot" aria-hidden="true" />{LX(lang, 'Official training platform', 'Offizielle Schulungsplattform')}</span>
          <h1 className="landing-hero-title nd-grad-head">{t('landing_hero_title')}</h1>
          <p className="landing-hero-sub">{t('landing_hero_sub')}</p>
          <div className="landing-hero-cta">
            <button className="btn-primary big landing-signup-btn" onClick={onSignUp}>{t('landing_cta_signup')}</button>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-features-grid">
          <article className="landing-feature">
            <div className="landing-feature-ico"><Icon.Cap /></div>
            <h2>{t('landing_feature_videos_t')}</h2>
            <p>{t('landing_feature_videos_d')}</p>
          </article>
          <article className="landing-feature">
            <div className="landing-feature-ico"><Icon.CertIcon /></div>
            <h2>{t('landing_feature_certs_t')}</h2>
            <p>{t('landing_feature_certs_d')}</p>
          </article>
          <article className="landing-feature">
            <div className="landing-feature-ico"><Icon.Check /></div>
            <h2>{t('landing_feature_progress_t')}</h2>
            <p>{t('landing_feature_progress_d')}</p>
          </article>
          <article className="landing-feature">
            <div className="landing-feature-ico"><Icon.Play /></div>
            <h2>{t('landing_feature_pace_t')}</h2>
            <p>{t('landing_feature_pace_d')}</p>
          </article>
        </div>
      </section>

      <section className="landing-who">
        <div className="landing-who-inner">
          <h2 className="landing-who-title">{t('landing_who_title')}</h2>
          <ul className="landing-who-list">
            <li>{t('landing_who_resellers')}</li>
            <li>{t('landing_who_pros')}</li>
            <li>{t('landing_who_curious')}</li>
          </ul>
        </div>
      </section>

      <section className="landing-final-cta">
        <h2>{t('landing_hero_title')}</h2>
        <button className="btn-primary big landing-signup-btn" onClick={onSignUp}>{t('landing_cta_signup')}</button>
      </section>
      </main>

      <footer className="landing-footer">
        <LegalFooter
          onImpressum={onImpressum}
          onDatenschutz={onDatenschutz}
          onBarrierefreiheit={onBarrierefreiheit}
          onCookieSettings={onCookieSettings}
        />
      </footer>
    </div>
  )
}

/* ===================== LEGAL FOOTER ===================== */
function LegalFooter({ onImpressum, onDatenschutz, onCookieSettings, onBarrierefreiheit }) {
  const t = useT()
  return (
    <footer className="legal-footer">
      {/* Instanz-Hinweis (brand.js): die Plattform stammt von Novogenia */}
      <span className="brand-powered">{BRAND.productName} · {BRAND.poweredBy}</span>
      <span className="legal-footer-sep">·</span>
      <span>© {new Date().getFullYear()} Novogenia GmbH</span>
      <span className="legal-footer-sep">·</span>
      <button className="legal-footer-link" onClick={onImpressum}>{t('footer_impressum')}</button>
      <span className="legal-footer-sep">·</span>
      <button className="legal-footer-link" onClick={onDatenschutz}>{t('footer_datenschutz')}</button>
      <span className="legal-footer-sep">·</span>
      <button className="legal-footer-link" onClick={onBarrierefreiheit}>{t('footer_a11y')}</button>
      <span className="legal-footer-sep">·</span>
      <button className="legal-footer-link" onClick={onCookieSettings}>{t('cookie_settings')}</button>
    </footer>
  )
}

/* ===================== IMPRESSUM PAGE ===================== */
function ImpressumPage({ onBack }) {
  const t = useT()
  const lang = useLang()
  return (
    <div className="legal-page content">
      <button className="btn-back" onClick={onBack}>{t('footer_back')}</button>
      <h1 className="legal-page-title">{t('impressum_title')}</h1>

      <section className="legal-section">
        <h2>{t('impressum_operator')}</h2>
        <p>
          Novogenia GmbH{BRAND.labSuffix}<br />
          Strass 19<br />
          5301 Eugendorf<br />
          {LX(lang, 'Austria', 'Österreich')}
        </p>
      </section>

      <section className="legal-section">
        <h2>{t('impressum_managing')}</h2>
        <p>Matthias Probst</p>
      </section>

      <section className="legal-section">
        <h2>{t('impressum_register')}</h2>
        <p>FN 531162 x · {LX(lang, 'Regional Court Salzburg', 'Landesgericht Salzburg')}</p>
      </section>

      <section className="legal-section">
        <h2>{t('impressum_uidde')}</h2>
        <p>ATU64713304</p>
      </section>

      <section className="legal-section">
        <h2>{t('impressum_contact')}</h2>
        <p>
          E-Mail: <a href="mailto:service@novogenia.com" rel="noopener noreferrer">service@novogenia.com</a>
        </p>
      </section>

      <section className="legal-section">
        <h2>{t('impressum_authority')}</h2>
        <p>
          Bezirkshauptmannschaft Salzburg-Umgebung<br />
          Karl-Wurmb-Straße 17, 5020 Salzburg<br />
          {LX(lang, 'Federal Ministry for Social Affairs, Health, Care and Consumer Protection', 'Bundesministerium für Soziales, Gesundheit, Pflege und Konsumentenschutz')}
        </p>
      </section>

      <section className="legal-section">
        <h2>{t('impressum_applicable_law')}</h2>
        <p>
          {LX(lang,
            'Austrian Trade Regulations 1994 (GewO), Genetic Technology Act (GTG), accessible via RIS Austria (ris.bka.gv.at).',
            'Gewerbeordnung 1994, Gentechnikgesetz (GTG), abrufbar über RIS Austria (ris.bka.gv.at).')}
        </p>
      </section>

      <section className="legal-section">
        <h2>{t('impressum_liability')}</h2>
        <p>{t('impressum_liability_text')}</p>
      </section>
    </div>
  )
}

/* ===================== DATENSCHUTZ PAGE ===================== */
/* ===================== BARRIEREFREIHEITSERKLÄRUNG =====================
   Konformitätsinformation nach § 14 Abs. 2 BaFG. Das Gesetz verlangt eine
   Kontaktstelle "in schriftlicher und mündlicher Form" — daher E-Mail UND
   Telefonnummer. Bekannte Einschränkungen werden bewusst offen benannt;
   "teilweise vereinbar" mit ehrlicher Mängelliste ist zulässig, eine
   pauschale Konformitätsbehauptung wäre riskant. */
function BarrierefreiheitPage({ onBack }) {
  const lang = useLang()
  const t = useT()
  return (
    <div className="legal-page content">
      <button className="btn-back" onClick={onBack}>{t('footer_back')}</button>
      <h1 className="legal-page-title">{t('a11y_title')}</h1>

      <section className="legal-section">
        <p>{t('a11y_intro')}</p>
      </section>

      <section className="legal-section">
        <h2>{t('a11y_standard_h')}</h2>
        <p>{t('a11y_standard_t')}</p>
      </section>

      <section className="legal-section">
        <h2>{t('a11y_state_h')}</h2>
        <p>{t('a11y_state_t')}</p>
      </section>

      <section className="legal-section">
        <h2>{t('a11y_known_h')}</h2>
        <ul>
          <li>{t('a11y_known_1')}</li>
          <li>{t('a11y_known_2')}</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>{t('a11y_feedback_h')}</h2>
        <p>{t('a11y_feedback_t')}</p>
        <p>
          Novogenia GmbH{BRAND.labSuffix}<br />
          Strass 19, 5301 Eugendorf, {LX(lang, 'Austria', 'Österreich')}<br />
          <a href="mailto:service@novogenia.com">service@novogenia.com</a><br />
          <a href="tel:+43662262102">+43 662 262 102</a>
        </p>
      </section>

      <section className="legal-section">
        <h2>{t('a11y_enforce_h')}</h2>
        <p>{t('a11y_enforce_t')}</p>
        <p>
          Sozialministeriumservice<br />
          <a href="https://www.sozialministeriumservice.at" target="_blank" rel="noopener noreferrer">
            www.sozialministeriumservice.at
          </a>
        </p>
      </section>

      <section className="legal-section">
        <p className="legal-meta">{t('a11y_updated')}</p>
      </section>
    </div>
  )
}

function DatenschutzPage({ onBack, onCookieSettings }) {
  const t = useT()
  const lang = useLang()
  const [consent] = useCookieConsent()
  return (
    <div className="legal-page content">
      <button className="btn-back" onClick={onBack}>{t('footer_back')}</button>
      <h1 className="legal-page-title">{t('datenschutz_title')}</h1>

      <section className="legal-section">
        <h2>{LX(lang, 'Responsible Party', 'Verantwortlicher')}</h2>
        <p>
          Novogenia GmbH{BRAND.labSuffix}<br />
          Strass 19, 5301 Eugendorf, {LX(lang, 'Austria', 'Österreich')}<br />
          E-Mail: <a href="mailto:datenschutz@novogenia.com" rel="noopener noreferrer">datenschutz@novogenia.com</a>
        </p>
      </section>

      <section className="legal-section">
        <h2>{LX(lang, 'What data we process', 'Welche Daten wir verarbeiten')}</h2>
        <p>{LX(lang,
          'When you create an account, we store your e-mail address, your chosen display name, your language preference, and your course progress (which videos you watched and which tests you passed). This data is stored in Supabase (eu-central-1, Frankfurt, Germany) and processed exclusively for operating NOVO ACADEMY.',
          'Bei Kontoerstellung speichern wir Ihre E-Mail-Adresse, Ihren gewählten Anzeigenamen, Ihre Spracheinstellung und Ihren Kursfortschritt (welche Videos gesehen, welche Tests bestanden). Diese Daten werden in Supabase (eu-central-1, Frankfurt) gespeichert und ausschließlich zum Betrieb von NOVO ACADEMY verarbeitet.')}</p>
      </section>

      <section className="legal-section">
        <h2>{LX(lang, 'Legal basis', 'Rechtsgrundlage')}</h2>
        <p>{LX(lang,
          'Processing is based on your consent (Art. 6(1)(a) GDPR) when you register, and on contract performance (Art. 6(1)(b) GDPR) for providing the academy service.',
          'Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) bei der Registrierung sowie zur Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) für die Erbringung des Akademie-Dienstes.')}</p>
      </section>

      <section className="legal-section">
        <h2>{LX(lang, 'Cookies', 'Cookies')}</h2>
        <p>{LX(lang,
          'NOVO ACADEMY uses session cookies that are technically necessary for the login function (Supabase Auth). If you consent to optional cookies, embedded YouTube videos load additional cookies from Google/YouTube. You can withdraw your consent at any time.',
          'NOVO ACADEMY verwendet Session-Cookies, die technisch notwendig für die Login-Funktion sind (Supabase Auth). Wenn Sie optionalen Cookies zustimmen, laden eingebettete YouTube-Videos zusätzlich Cookies von Google/YouTube. Ihre Einwilligung können Sie jederzeit widerrufen.')}</p>
        <button className="btn-secondary legal-cookie-btn" onClick={onCookieSettings}>
          {consent === 'all'
            ? t('cookie_revoke')
            : t('cookie_settings')}
        </button>
      </section>

      <section className="legal-section">
        <h2>{LX(lang, 'Third-party services', 'Drittanbieter')}</h2>
        <ul className="legal-list">
          <li><strong>Supabase</strong> — {LX(lang, 'Auth & database (eu-central-1 Frankfurt, Germany). Privacy policy: supabase.com/privacy', 'Auth & Datenbank (eu-central-1 Frankfurt). Datenschutz: supabase.com/privacy')}</li>
          <li><strong>YouTube / Google</strong> — {LX(lang, 'Video embedding (only with your consent). Privacy policy: policies.google.com/privacy', 'Video-Einbettung (nur mit Ihrer Einwilligung). Datenschutz: policies.google.com/privacy')}</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>{LX(lang, 'Your rights', 'Ihre Rechte')}</h2>
        <p>{LX(lang,
          'You have the right to access, correct, delete, or export your data, and to lodge a complaint with the Austrian Data Protection Authority (Datenschutzbehörde, Barichgasse 40–42, 1030 Vienna, dsb.gv.at).',
          'Sie haben das Recht auf Auskunft, Berichtigung, Löschung oder Datenübertragbarkeit sowie das Recht, Beschwerde bei der österreichischen Datenschutzbehörde einzulegen (Barichgasse 40–42, 1030 Wien, dsb.gv.at).')}</p>
        <p>{LX(lang,
          'To exercise your rights, contact: datenschutz@novogenia.com',
          'Zur Ausübung Ihrer Rechte wenden Sie sich an: datenschutz@novogenia.com')}</p>
      </section>
    </div>
  )
}

/* ===================== ADMIN PAGE =====================
   Visible only to users with `profiles.is_admin = true`. Two tabs:
   – Dashboard: total / new / active / certified user stats + language split + growth sparkline
   – Users: searchable list with expandable per-course toggles */
function AdminPage({ onBack, eigeneId }) {
  const t = useT()
  const lang = useLang()
  const [tab, setTab] = useState('dashboard')
  const [users, setUsers] = useState(null) // null = loading, [] = loaded
  const [error, setError] = useState(null)
  const [showDeleted, setShowDeleted] = useState(false)
  /* Fehler aus einer Admin-Aktion (Rechte, letzter Admin, fehlende Migration).
     Getrennt vom Ladefehler, damit beide nebeneinander sichtbar sein koennen. */
  const [aktionsFehler, setAktionsFehler] = useState(null)

  const reload = async () => {
    try {
      const list = await adminLoadAllUsers({ includeDeleted: showDeleted })
      setUsers(list || [])
    } catch (e) {
      setError(e.message || String(e))
      setUsers([])
    }
  }
  useEffect(() => { reload() }, [showDeleted])

  return (
    <div className="content admin-page">
      <div className="admin-bar">
        <button className="btn-back" onClick={onBack}>{t('admin_back')}</button>
        <div className="admin-tabs">
          <button className={`admin-tab${tab === 'dashboard' ? ' is-active' : ''}`} onClick={() => setTab('dashboard')}>
            {t('admin_tab_dashboard')}
          </button>
          <button className={`admin-tab${tab === 'users' ? ' is-active' : ''}`} onClick={() => setTab('users')}>
            {t('admin_tab_users')}{users ? ` (${users.length})` : ''}
          </button>
        </div>
        {tab === 'users' && (
          <label className="admin-toggle-deleted">
            <input type="checkbox" checked={showDeleted} onChange={e => setShowDeleted(e.target.checked)} />
            <span>{t('admin_show_deleted')}</span>
          </label>
        )}
      </div>

      {users === null && <p className="admin-loading">{t('admin_loading')}</p>}
      {error && <p className="auth-error" role="alert">{error}</p>}
      {aktionsFehler && <p className="auth-error" role="alert">{aktionsFehler}</p>}
      {users && users.length === 0 && !error && <p className="admin-loading">{t('admin_no_users')}</p>}

      {users && users.length > 0 && tab === 'dashboard' && <AdminDashboard users={users} />}
      {users && users.length > 0 && tab === 'users' && (
        <AdminUserList users={users} onChanged={reload} eigeneId={eigeneId} onError={setAktionsFehler} />
      )}
    </div>
  )
}

/* ----- Helpers for course-level analysis ----- */
const _certifiableUidsByLang = (() => {
  // Pre-compute which UIDs are certifiable per lang so admin code stays fast
  const out = { de: new Set(), en: new Set() }
  for (const c of COURSES) {
    if (isCertifiable(c)) {
      const l = c.lang || 'de'
      if (out[l]) out[l].add(c.uid)
    }
  }
  return out
})()

const _userActiveCount = (u) =>
  Object.values(u.progress || {}).filter(p => p?.watched).length
const _userCertifiedCount = (u) =>
  Object.values(u.progress || {}).filter(p => p?.watched && p?.testPassed).length

/* ----- Dashboard ----- */
function AdminDashboard({ users }) {
  const t = useT()
  const stats = useMemo(() => {
    const now = Date.now()
    const day7 = now - 7 * 24 * 60 * 60 * 1000
    const day30 = now - 30 * 24 * 60 * 60 * 1000

    let new7 = 0, new30 = 0, active = 0, certified = 0, completions = 0
    const langCount = {}
    const growth = new Array(30).fill(0) // bucket index 0 = oldest, 29 = today

    for (const u of users) {
      const created = u.created_at ? new Date(u.created_at).getTime() : 0
      if (created >= day7) new7++
      if (created >= day30) new30++
      langCount[u.lang || 'de'] = (langCount[u.lang || 'de'] || 0) + 1
      const watched = _userActiveCount(u)
      if (watched > 0) active++
      const cert = _userCertifiedCount(u)
      if (cert > 0) certified++
      completions += watched
      // growth bucket — newest bucket is today
      if (created >= day30) {
        const ageDays = Math.floor((now - created) / (24 * 60 * 60 * 1000))
        const idx = Math.max(0, 29 - ageDays)
        growth[idx]++
      }
    }
    return { total: users.length, new7, new30, active, certified, completions, langCount, growth }
  }, [users])

  const langTotal = Object.values(stats.langCount).reduce((a, b) => a + b, 0) || 1

  return (
    <div className="admin-dashboard">
      <div className="admin-stat-grid">
        <StatCard label={t('admin_stat_total_users')}    value={stats.total} />
        <StatCard label={t('admin_stat_new_7d')}         value={stats.new7} />
        <StatCard label={t('admin_stat_new_30d')}        value={stats.new30} />
        <StatCard label={t('admin_stat_active')}         value={stats.active} />
        <StatCard label={t('admin_stat_certified')}      value={stats.certified} />
        <StatCard label={t('admin_stat_total_progress')} value={stats.completions} />
      </div>

      <div className="admin-chart-row">
        <section className="admin-chart-card">
          <h3 className="admin-chart-title">{t('admin_stat_growth')}</h3>
          <GrowthSparkline buckets={stats.growth} />
        </section>
        <section className="admin-chart-card">
          <h3 className="admin-chart-title">{t('admin_stat_lang_split')}</h3>
          <ul className="admin-lang-list">
            {Object.entries(stats.langCount).sort((a, b) => b[1] - a[1]).map(([code, n]) => (
              <li key={code} className="admin-lang-row">
                <span className="admin-lang-code">{code.toUpperCase()}</span>
                <div className="admin-lang-bar-wrap">
                  <div className="admin-lang-bar" style={{ width: `${(n / langTotal) * 100}%` }} />
                </div>
                <span className="admin-lang-num">{n}</span>
                <span className="admin-lang-pct">{Math.round((n / langTotal) * 100)}%</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-num">{value}</div>
      <div className="admin-stat-label">{label}</div>
    </div>
  )
}

function GrowthSparkline({ buckets }) {
  // 30 buckets, each = users signed up that day. Cumulative line.
  const W = 600, H = 120, PAD = 8
  let acc = 0
  const cumulative = buckets.map(n => (acc += n, acc))
  const max = Math.max(1, cumulative[cumulative.length - 1])
  const points = cumulative.map((v, i) => {
    const x = PAD + (i / (cumulative.length - 1)) * (W - 2 * PAD)
    const y = H - PAD - (v / max) * (H - 2 * PAD)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  const area = `M${PAD},${H - PAD} L${points} L${W - PAD},${H - PAD} Z`
  return (
    <svg className="admin-spark-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <path d={area} fill="var(--wine-soft, #f5e9ef)" />
      <polyline points={points} fill="none" stroke="var(--wine)" strokeWidth="2" />
      <text x={W - PAD} y={14} textAnchor="end" fontSize="11" fill="#888">{max} total</text>
    </svg>
  )
}

/* ----- User list with per-course toggles ----- */
function AdminUserList({ users, onChanged, eigeneId, onError }) {
  const t = useT()
  const [query, setQuery] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [busyKey, setBusyKey] = useState(null) // `${userId}:${courseUid}`

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return users
    return users.filter(u =>
      (u.email || '').toLowerCase().includes(q) ||
      (u.name || '').toLowerCase().includes(q)
    )
  }, [users, query])

  const setCourse = async (userId, courseUid, action) => {
    setBusyKey(`${userId}:${courseUid}`)
    await adminSetUserCourseState(userId, courseUid, action)
    setBusyKey(null)
    onChanged && onChanged()
  }

  return (
    <div className="admin-userlist">
      {/* Ein Platzhalter ist keine Beschriftung: er verschwindet beim Tippen und
          wird von Screenreadern nicht zuverlässig als Name gemeldet (WCAG 3.3.2). */}
      <input
        className="admin-search"
        type="search"
        aria-label={t('admin_users_search')}
        placeholder={t('admin_users_search')}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {filtered.length === 0 ? (
        <p className="admin-loading">{t('admin_no_matches')}</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t('admin_users_col_user')}</th>
              <th>{t('admin_users_col_signup')}</th>
              <th>{t('admin_users_col_lang')}</th>
              <th>{t('admin_users_col_progress')}</th>
              <th>{t('admin_users_col_actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => {
              const watched = _userActiveCount(u)
              const certified = _userCertifiedCount(u)
              const isOpen = expandedId === u.id
              return (
                <React.Fragment key={u.id}>
                  <tr className={u.is_admin ? 'is-admin-row' : ''}>
                    {/* data-label: auf schmalen Geraeten blendet das Media-Query die
                        Kopfzeile aus. Ohne diese Beschriftung standen dort nackte
                        Werte ohne jede Zuordnung (WCAG 1.3.1). */}
                    <td data-label={t('admin_users_col_user')}>
                      <div className="admin-user-cell">
                        <span className="user-menu-avatar admin-user-avatar">
                          {(bestDisplayName(u.name, u.email) || '?').charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <div className="admin-user-name">
                            {bestDisplayName(u.name, u.email)}
                            {u.is_admin && <span className="admin-badge">{t('admin_user_admin_badge')}</span>}
                          </div>
                          <div className="admin-user-email">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="admin-user-meta" data-label={t('admin_users_col_signup')}>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</td>
                    <td className="admin-user-meta" data-label={t('admin_users_col_lang')}>{(u.lang || 'de').toUpperCase()}</td>
                    <td className="admin-user-meta" data-label={t('admin_users_col_progress')}>
                      <span title={t('admin_users_col_progress')}>{watched}× watched</span>
                      {' · '}
                      <span style={{ color: 'var(--wine)' }}>{certified}× cert</span>
                    </td>
                    <td data-label={t('admin_users_col_actions')}>
                      <div className="admin-row-actions">
                        <button className="btn-ghost admin-expand-btn" onClick={() => setExpandedId(isOpen ? null : u.id)}>
                          {isOpen ? t('admin_user_collapse') : t('admin_user_expand')}
                        </button>
                        <AdminUserActionsMenu user={u} onChanged={onChanged} eigeneId={eigeneId} onError={onError} />
                      </div>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="admin-courses-row">
                      <td colSpan={5}>
                        <AdminUserCourses
                          user={u}
                          onSet={(courseUid, action) => setCourse(u.id, courseUid, action)}
                          busyKey={busyKey}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

function AdminUserCourses({ user, onSet, busyKey }) {
  const t = useT()
  // Show ALL courses (both langs) — admin needs to see/manage every uid.
  const realCourses = COURSES.filter(c => c.contentType !== 'placeholder')
  return (
    <div className="admin-courses-grid">
      {realCourses.map(c => {
        const p = user.progress?.[c.uid] || {}
        const certifiable = isCertifiable(c)
        const state = (p.watched && p.testPassed) ? 'done'
                    : (p.watched ? 'partial' : 'open')
        const key = `${user.id}:${c.uid}`
        const busy = busyKey === key
        return (
          <div key={c.uid} className={`admin-course-row state-${state}`}>
            <div className="admin-course-meta">
              <span className={`admin-course-state-dot state-${state}`} />
              <div>
                <div className="admin-course-title">
                  <span className="admin-course-lang">{(c.lang || 'de').toUpperCase()}</span>{' '}
                  {c.category}: {c.topic}
                </div>
                <div className="admin-course-status">
                  {state === 'done' && t('admin_course_state_done')}
                  {state === 'partial' && t('admin_course_state_partial')}
                  {state === 'open' && t('admin_course_state_open')}
                  {certifiable ? '' : ' · (' + t('cl_certifiable_no').slice(0, 24) + '…)'}
                </div>
              </div>
            </div>
            <div className="admin-course-actions">
              {state !== 'done' && (
                <button
                  className="btn-primary admin-course-btn"
                  disabled={busy}
                  onClick={() => onSet(c.uid, 'complete')}
                >
                  ✓ {t('admin_course_set_done')}
                </button>
              )}
              {state !== 'open' && (
                <button
                  className="btn-ghost admin-course-btn"
                  disabled={busy}
                  onClick={() => onSet(c.uid, 'reset')}
                >
                  ↻ {t('admin_course_reset')}
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ----- Per-user actions menu (promote/demote, rename, reset, delete) ----- */
function AdminUserActionsMenu({ user, onChanged, eigeneId, onError }) {
  const lang = useLang()
  const t = useT()
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const ref = useRef(null)
  const knopfRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    /* Ein geoeffnetes Menue muss sich mit Escape schliessen lassen und den
       Fokus zurueckgeben, sonst sitzt man ohne Maus darin fest (WCAG 2.1.2). */
    const beiTaste = (e) => {
      if (e.key === 'Escape') { setOpen(false); knopfRef.current?.focus() }
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', beiTaste)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', beiTaste)
    }
  }, [open])

  /* Die Rueckgaben aus auth.js tragen { error }. Vorher wurden sie verworfen:
     eine abgelehnte Admin-Aktion (fehlende Berechtigung, letzter Admin, nicht
     ausgefuehrte Migration) sah exakt wie ein Erfolg aus. */
  const wrap = async (fn) => {
    setBusy(true)
    try {
      const res = await fn()
      if (res?.error) { onError?.(String(res.error)); return }
      onError?.(null)
    } catch (e) {
      onError?.(e?.message || String(e))
    } finally { setBusy(false); setOpen(false); onChanged && onChanged() }
  }

  const togglePromote = () => wrap(() => adminSetIsAdmin(user.id, !user.is_admin))
  const rename = () => wrap(async () => {
    const suggestion = bestDisplayName(user.name, user.email)
    const newName = window.prompt(t('admin_action_rename_prompt'), suggestion)
    if (newName && newName.trim() && newName.trim() !== user.name) {
      await adminUpdateUserName(user.id, newName.trim())
    }
  })
  const resetAll = () => wrap(async () => {
    if (window.confirm(t('admin_action_reset_confirm'))) {
      await adminResetAllProgress(user.id)
    }
  })
  const softDelete = () => wrap(async () => {
    if (window.confirm(t('admin_action_delete_confirm'))) {
      await adminSoftDeleteUser(user.id)
    }
  })
  const undelete = () => wrap(() => adminUndeleteUser(user.id))

  const isDeleted = Boolean(user.deleted_at)
  const istSelbst = Boolean(eigeneId) && user.id === eigeneId

  return (
    <div className="admin-actions-menu" ref={ref}>
      <button
        ref={knopfRef}
        className="admin-actions-btn"
        onClick={() => setOpen(o => !o)}
        disabled={busy}
        aria-label={LX(lang, 'User actions', 'Nutzeraktionen')}
        aria-haspopup="true"
        aria-expanded={open}
      >⋯</button>
      {open && (
        <div className="admin-actions-pop" role="menu">
          {isDeleted ? (
            <button className="admin-actions-item" role="menuitem" onClick={undelete} disabled={busy}>
              ↺ Undelete
            </button>
          ) : (
            <>
              {/* Auf der eigenen Zeile keine Selbst-Entrechtung anbieten: Demote
                  und Löschen setzen beide is_admin=false. Wäre man der letzte
                  Admin, gäbe es danach keinen Weg zurück über die App — die
                  Datenbank lehnt beides inzwischen ebenfalls ab, aber ein
                  Menüpunkt, der nur eine Fehlermeldung erzeugt, hilft niemandem. */}
              {!istSelbst && (
                <button className="admin-actions-item" role="menuitem" onClick={togglePromote} disabled={busy}>
                  {user.is_admin ? '↓ ' + t('admin_action_demote') : '↑ ' + t('admin_action_promote')}
                </button>
              )}
              <button className="admin-actions-item" role="menuitem" onClick={rename} disabled={busy}>
                ✎ {t('admin_action_rename')}
              </button>
              <button className="admin-actions-item" role="menuitem" onClick={resetAll} disabled={busy}>
                ↻ {t('admin_action_reset_all')}
              </button>
              {!istSelbst && (
                <>
                  <div className="admin-actions-sep" />
                  <button className="admin-actions-item is-danger" role="menuitem" onClick={softDelete} disabled={busy}>
                    ✕ {t('admin_action_delete')}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

/* ===================== AUTH PAGE (signup / login) ===================== */
function AuthPage({ mode, lang, setLang, busy, setBusy, onSwitchMode, onBackToLanding }) {
  const t = useT()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [errorKey, setErrorKey] = useState(null)

  const isSignup = mode === 'signup'

  const submit = async (e) => {
    e?.preventDefault?.()
    setErrorKey(null)
    setBusy(true)
    try {
      const fn = isSignup ? signUpWithEmail : signInWithEmail
      const args = isSignup ? { email, password, name } : { email, password }
      const { error } = await fn(args)
      if (error) {
        // Die Sperre kommt als Objekt {code:'rate_limited', minutes} — vorher
        // fiel sie in den Default und wurde als "Passwort ungültig" angezeigt,
        // auch bei korrektem Passwort.
        if (error && error.code === 'rate_limited') {
          setErrorKey('auth_error_rate_limited')
        } else {
          const map = { invalid: 'auth_error_invalid', taken: 'auth_error_taken', weak: 'auth_error_weak' }
          setErrorKey(map[error] || 'auth_error_invalid')
        }
      }
      // On success, onAuthChange will swap us into the app
    } finally {
      setBusy(false)
    }
  }

  const google = async () => {
    setErrorKey(null)
    setBusy(true)
    try {
      const { error } = await signInWithGoogle()
      if (error) setErrorKey('auth_error_invalid')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-page">
      <header className="landing-header">
        <div className="landing-header-inner">
          <button className="auth-back" onClick={onBackToLanding} aria-label={LX(lang, 'Back', 'Zurück')}>
            <Icon.ChevronLeft />
          </button>
          <div className="landing-logo" onClick={onBackToLanding} style={{ cursor: 'pointer' }}>
            <BrandLogo />
          </div>
          <div className="landing-header-right">
            {!BRAND.lockedLang && (
              <div className="lang-switcher" title="Language / Sprache">
                {['de','en','cz','fr','pt','it','nl','ro','es','sr','ar'].map(l => (
                  <button key={l} className={`lang-btn${lang === l ? ' is-active' : ''}`} aria-pressed={lang === l}
                          onClick={() => setLang(l)}>{l.toUpperCase()}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="skip-target">
      <div className="auth-card-wrap">
        <div className="auth-card">
          <h1 className="auth-title">{isSignup ? t('auth_signup_title') : t('auth_login_title')}</h1>
          <p className="auth-sub">{isSignup ? t('auth_signup_sub') : t('auth_login_sub')}</p>

          <button className="auth-google" onClick={google} disabled={busy}>
            <GoogleIcon /> <span>{t('auth_google')}</span>
          </button>

          <div className="auth-divider"><span>{t('auth_or_continue_with')}</span></div>

          <form className="auth-form" onSubmit={submit}>
            {isSignup && (
              <label className="auth-field">
                <span className="auth-label">{t('auth_name_label')}</span>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value.slice(0, 80))}
                  placeholder={t('auth_name_placeholder')}
                  autoComplete="name"
                  maxLength={80}
                />
                <span className="auth-hint">{t('auth_name_hint')}</span>
              </label>
            )}
            <label className="auth-field">
              <span className="auth-label">{t('auth_email_label')}</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value.slice(0, 254))}
                placeholder={t('auth_email_placeholder')}
                autoComplete="email"
                maxLength={254}
                required
              />
            </label>
            <label className="auth-field">
              <span className="auth-label">{t('auth_password_label')}</span>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value.slice(0, 128))}
                placeholder={t('auth_password_placeholder')}
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                required
                maxLength={128}
                minLength={isSignup ? 8 : undefined}
              />
            </label>

            {errorKey && <div className="auth-error" role="alert">{t(errorKey)}</div>}

            <button type="submit" className="btn-primary big auth-submit" disabled={busy}>
              {busy ? t('auth_loading') : (isSignup ? t('auth_submit_signup') : t('auth_submit_login'))}
            </button>
          </form>

          <button className="auth-switch" onClick={onSwitchMode} disabled={busy}>
            {isSignup ? t('auth_switch_to_login') : t('auth_switch_to_signup')}
          </button>

          {!isUsingRealSupabase() && (
            <div className="auth-local-notice">
              <Icon.Info /> {LX(lang,
                'Local-only mode: accounts live in this browser. Configure Supabase to sync across devices.',
                'Lokaler Modus: Konten existieren nur in diesem Browser. Konfiguriere Supabase, um geräteübergreifend zu synchronisieren.')}
            </div>
          )}
        </div>
      </div>
      </main>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  )
}
