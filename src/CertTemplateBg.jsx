import React, { useEffect, useRef } from 'react'
import * as pdfjs from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { BRAND } from './brand.js'

// Set the worker URL once at module load
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl

/**
 * Renders the empty cert-template.pdf as a canvas, sized to fit the parent.
 * The on-screen preview now uses the EXACT same PDF that the download produces,
 * so what you see is what you get.
 */
export default function CertTemplateBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
        const loadingTask = pdfjs.getDocument(`${base}${BRAND.cert?.templatePath || '/cert-template.pdf'}`)
        const doc = await loadingTask.promise
        const page = await doc.getPage(1)

        if (cancelled) { doc.destroy(); return }
        const canvas = canvasRef.current
        if (!canvas) { doc.destroy(); return }

        const ctx = canvas.getContext('2d')
        // Render at 2× scale for crisp display
        const viewport = page.getViewport({ scale: 2 })
        canvas.width = viewport.width
        canvas.height = viewport.height
        canvas.style.width = '100%'
        canvas.style.height = '100%'

        await page.render({ canvasContext: ctx, viewport }).promise
        console.log('[CertTemplateBg] rendered', viewport.width, 'x', viewport.height)
      } catch (err) {
        console.error('[CertTemplateBg] render failed:', err)
      }
    })()
    return () => { cancelled = true }
  }, [])

  return <canvas className="cert-pdf-bg" ref={canvasRef} aria-hidden="true" />
}
