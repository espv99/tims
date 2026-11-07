import { getTranslations } from 'next-intl/server'
import { renderOgImage } from '@/lib/og-image'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Ingeniería en Tecnologías de la Información - ESPOCH Sede Morona Santiago'

export default async function Image() {
  const t = await getTranslations({ locale: 'es', namespace: 'seo.timeline' })
  return renderOgImage({ title: t('title') })
}
