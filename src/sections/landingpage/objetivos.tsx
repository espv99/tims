import React from 'react';
import { getTranslations } from 'next-intl/server';

const Objetivos: React.FC = async () => {
  const t = await getTranslations('objectives');
  const items: { title: string; description: string }[] = t.raw('items');
  const educationalItems: string[] = t.raw('educationalItems');

  return (
    <section className="w-full my-10">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blueti dark:text-foreground">{t('title')}</h2>
        <p className="text-muted-foreground text-sm mt-1">{t('subtitle')}</p>
      </div>

      <div className="bg-blueti text-white rounded-xl p-6 md:p-8 mb-6">
        <span className="text-gold text-xs font-bold uppercase tracking-widest mb-3 block">
          {t('generalLabel')}
        </span>
        <p className="text-base md:text-lg leading-relaxed">{t('generalText')}</p>
      </div>

      <ol className="mb-14 border-b border-border">
        {items.map((item, index) => (
          <li
            key={index}
            className="grid gap-2 border-t border-border py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-8"
          >
            <h3 className="font-semibold text-base text-foreground">
              <span className="mr-3 tabular-nums text-blueti dark:text-primary">{index + 1}</span>
              {item.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.description}</p>
          </li>
        ))}
      </ol>

      <h3 className="mb-6 text-xl md:text-2xl font-bold text-blueti dark:text-foreground">{t('educationalLabel')}</h3>
      <ol className="space-y-4">
        {educationalItems.map((text, index) => (
          <li key={index} className="flex gap-4">
            <span className="w-6 flex-shrink-0 text-right font-semibold tabular-nums text-blueti dark:text-primary">
              {index + 1}.
            </span>
            <p className="text-sm md:text-base text-foreground leading-relaxed">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Objetivos;
