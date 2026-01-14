"use client";

import dynamic from 'next/dynamic';

const PdfReader = dynamic(() => import('./pdfReader'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-40 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-5xl mx-0 my-0"><p className="text-gray-500">Cargando visor de PDF...</p></div>
});

export default function PdfReaderWrapper() {
  return <PdfReader />;
}
