import React from 'react'
import { getTranslations } from 'next-intl/server'

interface InfoBannerProps {
  approvalInitial?: string
  approvalUpdated?: string
  coordinator?: string
}

const InfoBanner: React.FC<InfoBannerProps> = async ({
  approvalInitial = 'RPC-SO-30-No.544-2016',
  approvalUpdated = '650612A01-P-1401',
  coordinator = 'Ing. Paul Machado',
}) => {
  const t = await getTranslations('infoBanner')

  const stats = [
    { label: t('duration'), value: t('durationValue') },
    { label: t('modality'), value: t('modalityValue') },
    { label: t('cost'), value: t('costValue') },
    { label: t('coordinator'), value: coordinator },
  ]

  return (
    <section className="w-full my-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blueti dark:text-foreground mb-3">{t('title')}</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
          {t('description')}
        </p>
      </div>

      <dl className="grid grid-cols-2 md:grid-cols-4 gap-px mb-10 rounded-xl overflow-hidden bg-white/15">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-blueti px-5 py-6 md:px-6 md:py-8">
            <dd className="text-xl md:text-3xl font-bold text-gold leading-tight text-balance">{stat.value}</dd>
            <dt className="mt-2 text-sm text-blueti-muted">{stat.label}</dt>
          </div>
        ))}
      </dl>

      <div className="bg-muted/50 border border-border rounded-xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {t('approvalInitial')}
          </span>
          <p className="text-foreground mt-1 font-mono text-sm">{approvalInitial}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {t('approvalUpdated')}
          </span>
          <p className="text-foreground mt-1 font-mono text-sm">{approvalUpdated}</p>
        </div>
      </div>
    </section>
  )
}

export default InfoBanner
