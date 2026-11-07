import { defaultTitle } from '@/app/metadata'
import { renderOgImage } from '@/lib/og-image'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Ingeniería en Tecnologías de la Información - ESPOCH Sede Morona Santiago'

export default async function Image() {
  return renderOgImage({ title: defaultTitle.split(' - ')[0] })
}
