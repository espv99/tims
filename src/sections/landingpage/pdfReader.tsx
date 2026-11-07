'use client'

import { useState, useRef, useEffect, type RefObject } from 'react'
import { useTranslations } from 'next-intl'
import { Document, Page, pdfjs } from 'react-pdf'
import { Button } from '@/components/ui/button'

// Self-hosted copy of pdfjs-dist@4.8.69 (the version react-pdf 9.2.1 resolves); keep in sync on upgrades.
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

const PDF_FILE = '/docs/malla_curricular_propuesta.pdf'
const HORIZONTAL_PADDING = 32
const FALLBACK_CONTAINER_WIDTH = 320
const DEFAULT_PAGE_RATIO = Math.SQRT2
const PAGE_MARGIN = 16
const NEAR_PAGE_MARGIN = '600px 0px'
const MIN_SCALE = 0.5
const MAX_SCALE = 3.0
const SCALE_STEP = 0.25

function PdfPage({
  pageNumber,
  width,
  ratio,
  rootRef,
  onRatio,
}: {
  pageNumber: number
  width: number
  ratio: number
  rootRef: RefObject<HTMLDivElement | null>
  onRatio: (pageNumber: number, ratio: number) => void
}) {
  const slotRef = useRef<HTMLDivElement>(null)
  const [isNear, setIsNear] = useState(pageNumber === 1)

  useEffect(() => {
    const node = slotRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsNear(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => setIsNear(entry.isIntersecting), {
      root: rootRef.current,
      rootMargin: NEAR_PAGE_MARGIN,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [rootRef])

  // The slot keeps a fixed size so unrendered pages hold their place in the scroll area.
  return (
    <div ref={slotRef} style={{ width, height: Math.round(width * ratio), marginBottom: PAGE_MARGIN }}>
      {isNear && (
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="shadow-sm"
          width={width}
          onLoadSuccess={(page) => onRatio(pageNumber, page.originalHeight / page.originalWidth)}
        />
      )}
    </div>
  )
}

function ZoomOutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5H6"
      />
    </svg>
  )
}

function ZoomInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
      />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  )
}

export default function PdfReader() {
  const t = useTranslations('pdfViewer')
  const [numPages, setNumPages] = useState<number>()
  const [scale, setScale] = useState(1.0)
  const [containerWidth, setContainerWidth] = useState(FALLBACK_CONTAINER_WIDTH)
  const [ratios, setRatios] = useState<Record<number, number>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(([entry]) => setContainerWidth(Math.round(entry.contentRect.width)))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const handleRatio = (pageNumber: number, ratio: number) =>
    setRatios((prev) => (prev[pageNumber] === ratio ? prev : { ...prev, [pageNumber]: ratio }))

  const pageWidth = Math.max(Math.round((containerWidth - HORIZONTAL_PADDING) * scale), 1)

  return (
    <section className="w-full my-10">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blueti dark:text-foreground">{t('title')}</h2>
        <p className="text-muted-foreground text-sm mt-1">{t('subtitle')}</p>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-muted/40 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setScale((s) => Math.max(s - SCALE_STEP, MIN_SCALE))}
              disabled={scale <= MIN_SCALE}
              aria-label={t('zoomOut')}
              className="cursor-pointer min-h-11 min-w-11"
            >
              <ZoomOutIcon />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[52px] text-center tabular-nums font-mono">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setScale((s) => Math.min(s + SCALE_STEP, MAX_SCALE))}
              disabled={scale >= MAX_SCALE}
              aria-label={t('zoomIn')}
              className="cursor-pointer min-h-11 min-w-11"
            >
              <ZoomInIcon />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setScale(1.0)}
              aria-label={t('zoomReset')}
              className="cursor-pointer min-h-11 min-w-11"
            >
              <ResetIcon />
            </Button>
          </div>

          <a
            href={PDF_FILE}
            download="malla_curricular_propuesta.pdf"
            className="inline-flex items-center gap-2 min-h-11 px-4 py-1.5 bg-blueti hover:bg-blueti/90 text-white text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer"
          >
            <DownloadIcon />
            {t('download')}
          </a>
        </div>

        {/* PDF viewport */}
        <div
          ref={containerRef}
          role="region"
          tabIndex={0}
          aria-label={t('viewerLabel')}
          className="overflow-auto bg-muted/20 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blueti"
          style={{ height: '520px', scrollbarWidth: 'thin' }}
        >
          <Document
            file={PDF_FILE}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            className="flex flex-col items-center px-4 pt-4 min-w-fit"
          >
            {numPages &&
              Array.from({ length: numPages }, (_, i) => (
                <PdfPage
                  key={`page_${i + 1}`}
                  pageNumber={i + 1}
                  width={pageWidth}
                  ratio={ratios[i + 1] ?? ratios[1] ?? DEFAULT_PAGE_RATIO}
                  rootRef={containerRef}
                  onRatio={handleRatio}
                />
              ))}
          </Document>
        </div>
      </div>
    </section>
  )
}
