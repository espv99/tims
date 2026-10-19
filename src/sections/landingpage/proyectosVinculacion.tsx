import React from 'react'
import { getTranslations } from 'next-intl/server'

function LinkIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg>
  )
}

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
            <div className="mb-3 text-blueti dark:text-primary">
              <LinkIcon />
            </div>
            <p className="text-sm md:text-base text-foreground leading-relaxed">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProyectosVinculacion
