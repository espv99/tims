import React from 'react'
import { getTranslations } from 'next-intl/server'

function CheckCircleIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

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
          <li key={index} className="flex gap-3 border-t border-border py-4">
            <span className="text-blueti dark:text-primary mt-0.5">
              <CheckCircleIcon />
            </span>
            <p className="text-sm md:text-base text-foreground leading-relaxed">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OccupationalField
