import React from 'react'
import { getTranslations } from 'next-intl/server'

const OccupationalField: React.FC = async () => {
  const t = await getTranslations('occupationalField')
  const items: string[] = t.raw('items')

  return (
    <section className="w-full my-10">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blueti dark:text-foreground">{t('title')}</h2>
        <p className="text-muted-foreground text-sm mt-1">{t('subtitle')}</p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 border-b border-border">
        {items.map((item, index) => (
          <li key={index} className="border-t border-border py-4">
            <p className="text-sm md:text-base text-foreground leading-relaxed">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OccupationalField
