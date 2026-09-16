import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import './styles.css'
import './nd-redesign.css'
// Markenschicht dieser Instanz (10X Health) — muss als letzte Stylesheet-Datei laden
import './theme-10x.css'

/* Clickjacking-Schutz. X-Frame-Options und CSP frame-ancestors sind als <meta>
   wirkungslos — beides verlangt einen echten HTTP-Header, den GitHub Pages
   nicht setzen kann. Ein Inline-Skript in index.html scheidet ebenfalls aus,
   weil die CSP nur `script-src 'self' blob:` erlaubt. Deshalb hier, im
   gebuendelten Modul: Wird die Seite fremd eingebettet, brechen wir aus dem
   Rahmen aus. Bei Wechsel auf einen Host mit eigenen Headern (Cloudflare
   Pages, Netlify) dort `frame-ancestors 'self'` setzen und dies entfernen. */
try {
  if (window.top !== window.self) window.top.location = window.self.location.href
} catch {
  // Cross-Origin-Zugriff verweigert = wir stecken in einem fremden Rahmen
  document.documentElement.style.display = 'none'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
