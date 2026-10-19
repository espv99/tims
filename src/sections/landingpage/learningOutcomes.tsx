import React from 'react'
import { getTranslations } from 'next-intl/server'

const LearningOutcomes: React.FC = async () => {
  const t = await getTranslations('learningOutcomes')
  const items: { number: string; text: string }[] = t.raw('items')

  return (
    <section className="w-full my-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blueti dark:text-foreground mb-3">{t('title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">{t('subtitle')}</p>
      </div>

      <ol className="border-b border-border">
        {items.map((item, index) => (
          <li key={index} className="flex items-baseline gap-5 border-t border-border py-5">
            <span className="w-12 flex-shrink-0 text-lg font-semibold tabular-nums text-blueti dark:text-primary">
              {item.number}
            </span>
            <p className="text-sm md:text-base text-foreground leading-relaxed">{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default LearningOutcomes
