"use client";
import { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfReader() {
  const [numPages, setNumPages] = useState<number>();
  const [scale, setScale] = useState<number>(1.0);
  const containerRef = useRef<HTMLDivElement>(null);
  const basePageWidth = 800; // Ancho base para las páginas

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3.0)); // Máximo 300%
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5)); // Mínimo 50%
  };

  const handleZoomReset = () => {
    setScale(1.0);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 dark:bg-gray-900 rounded-lg my-8 w-full max-w-5xl mx-0">
      <div 
        className="rounded overflow-auto w-full h-[300px] md:h-[600px]" 
        ref={containerRef}
        style={{ scrollbarWidth: 'thin' }}
      >
        <Document
          file="/docs/malla_curricular_propuesta.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col items-center min-w-fit"
        >
          {numPages && Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="mb-4"
              width={basePageWidth * scale}
            />
          ))}
        </Document>
      </div>
      
      <div className="flex items-center gap-4 mt-4 flex-wrap justify-center">
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={scale <= 0.5}
            className="px-3 py-2 bg-gray-600 text-white rounded disabled:opacity-50 hover:bg-gray-700 transition flex items-center gap-1"
            title="Alejar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5H6" />
            </svg>
          </button>
          <span className="text-gray-700 dark:text-gray-300 text-sm min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={scale >= 3.0}
            className="px-3 py-2 bg-gray-600 text-white rounded disabled:opacity-50 hover:bg-gray-700 transition flex items-center gap-1"
            title="Acercar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
            </svg>
          </button>
          <button
            onClick={handleZoomReset}
            className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            title="Restablecer zoom"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </div>
        
        <a 
          href="/docs/malla_curricular_propuesta.pdf" 
          download="malla_curricular_propuesta.pdf"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Descargar
        </a>
      </div>
    </div>
  );
}