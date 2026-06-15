import React from 'react';
import { getTranslations } from 'next-intl/server';

const LearningOutcomes: React.FC = async () => {
  const t = await getTranslations('learningOutcomes');
  const items: { number: string; text: string }[] = t.raw('items');

  return (
    <section className="w-full my-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blueti dark:text-foreground mb-3">{t('title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">{t('subtitle')}</p>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-card border border-border rounded-xl p-5 hover:border-blueti/30 hover:shadow-sm transition-all duration-200"
          >
            <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-blueti/8 dark:bg-primary/10 flex items-center justify-center text-blueti dark:text-primary text-xs font-bold">
              {item.number}
            </span>
            <p className="text-sm text-foreground leading-relaxed pt-2">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningOutcomes;
