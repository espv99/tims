import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'

export interface LatestNewsItem {
  id: string
  title: string
  publishedAt: Date | null
}

export async function LatestNews({ news }: { news: LatestNewsItem[] }) {
  const [t, locale] = await Promise.all([getTranslations('admin.dashboard'), getLocale()])
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' })

  return (
    <section aria-labelledby="dashboard-news-heading" className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h2 id="dashboard-news-heading" className="text-base font-semibold text-foreground">
          {t('latestNews')}
        </h2>
        <Link
          href="/admin/news"
          className="inline-flex min-h-11 items-center rounded-md px-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t('viewAll')}
        </Link>
      </div>

      {news.length === 0 ? (
        <div className="px-4 py-8">
          <p className="font-medium text-foreground">{t('newsEmptyTitle')}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t('newsEmptyHint')}</p>
          <Link
            href="/admin/news"
            className="mt-3 inline-flex min-h-11 items-center rounded-md text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t('newsEmptyAction')}
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {news.map((item) => (
            <li key={item.id}>
              <Link
                href="/admin/news"
                className="flex min-h-11 flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <span className="truncate font-medium text-foreground">{item.title}</span>
                {item.publishedAt && (
                  <time dateTime={item.publishedAt.toISOString()} className="text-sm text-muted-foreground">
                    {dateFormat.format(item.publishedAt)}
                  </time>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
