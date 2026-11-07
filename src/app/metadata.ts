import type { Metadata } from 'next'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://timacas.vercel.app'

export const siteName = 'Ingeniería en Tecnologías de la Información - ESPOCH Morona Santiago'
export const defaultTitle = 'Ingeniería en Tecnologías de la Información - ESPOCH Sede Morona Santiago | Ecuador'

// Page-level `openGraph` replaces the root one entirely, so every page must carry the full block.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', locale: 'es_EC', siteName, url: path, title, description },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: '%s | Ingeniería TI - ESPOCH Morona Santiago',
  },
  description:
    'Carrera de Ingeniería en Tecnologías de la Información de la Escuela Superior Politécnica del Chimborazo, Sede Morona Santiago. Formación en TI, región amazónica, Ecuador. Información, malla curricular y campo ocupacional.',
  keywords: [
    'Ingeniería en Tecnologías de la Información',
    'Tecnologías de la Información',
    'ESPOCH',
    'Morona Santiago',
    'carrera universitaria Ecuador',
    'universidad Amazonía',
    'Sede Morona Santiago',
    'Escuela Superior Politécnica del Chimborazo',
    'ingeniería TI Ecuador',
    'región amazónica',
  ],
  authors: [{ name: 'ESPOCH Sede Morona Santiago' }],
  creator: 'ESPOCH',
  publisher: 'ESPOCH',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'es_EC',
    url: siteUrl,
    siteName,
    title: 'Ingeniería en Tecnologías de la Información - ESPOCH Sede Morona Santiago',
    description:
      'Carrera de Ingeniería en Tecnologías de la Información, ESPOCH Sede Morona Santiago, Ecuador. Formación en TI en la región amazónica.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ingeniería en Tecnologías de la Información - ESPOCH Morona Santiago',
    description: 'Carrera de Ingeniería en Tecnologías de la Información, ESPOCH Sede Morona Santiago, Ecuador.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: '9nRuM_4g3lRnTpjyhDxECY8G7v0TzZVplSCH4y9JRI4',
  },
  category: 'education',
}
