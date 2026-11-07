import React from 'react'
import { getTranslations } from 'next-intl/server'

const ProyectosVinculacion: React.FC = async () => {
  const t = await getTranslations('outreachProjects')
  const items: string[] = t.raw('items')

  return (
    <section className="w-full my-10">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blueti dark:text-foreground">{t('title')}</h2>
        <p className="text-muted-foreground text-sm mt-1">{t('subtitle')}</p>
      </div>

      <ul className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
        {items.map((item, index) => (
          <li key={index} className="border-t border-border pt-4">
            <p className="text-sm md:text-base text-foreground leading-relaxed">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProyectosVinculacion
