'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

function PdfViewerSkeleton() {
  return (
    <section className="w-full my-10">
      <div className="mb-8">
        <div className="h-8 w-56 bg-muted animate-pulse rounded" />
        <div className="h-4 w-72 bg-muted animate-pulse rounded mt-2" />
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="h-12 bg-muted/40 border-b border-border" />
        <div className="h-[520px] bg-muted/20 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blueti border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </section>
  )
}

const PdfReader = dynamic(() => import('./pdfReader'), {
  ssr: false,
  loading: () => <PdfViewerSkeleton />,
})

const NEAR_VIEWPORT_MARGIN = '200px'

export default function PdfReaderWrapper() {
  const [nearViewport, setNearViewport] = useState(false)
  const placeholderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = placeholderRef.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setNearViewport(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNearViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin: NEAR_VIEWPORT_MARGIN },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // The skeleton has the same fixed-height viewer region, so mounting the real viewer causes no layout shift.
  if (nearViewport) return <PdfReader />
  return (
    <div ref={placeholderRef}>
      <PdfViewerSkeleton />
    </div>
  )
}
