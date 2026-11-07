import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'

export interface UpcomingEvent {
  id: string
  title: string
  eventDate: Date
  location: string | null
}

export async function UpcomingEvents({ events }: { events: UpcomingEvent[] }) {
  const [t, locale] = await Promise.all([getTranslations('admin.dashboard'), getLocale()])
  const dayFormat = new Intl.DateTimeFormat(locale, { day: 'numeric' })
  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'short' })
  const timeFormat = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' })

  return (
    <section aria-labelledby="dashboard-events-heading" className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h2 id="dashboard-events-heading" className="text-base font-semibold text-foreground">
          {t('upcomingEvents')}
        </h2>
        <Link
          href="/admin/events"
          className="inline-flex min-h-11 items-center rounded-md px-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t('viewAll')}
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="px-4 py-8">
          <p className="font-medium text-foreground">{t('eventsEmptyTitle')}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t('eventsEmptyHint')}</p>
          <Link
            href="/admin/events"
            className="mt-3 inline-flex min-h-11 items-center rounded-md text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t('eventsEmptyAction')}
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {events.map((event) => (
            <li key={event.id} className="flex items-center gap-4 px-4 py-3">
              <time
                dateTime={event.eventDate.toISOString()}
                className="flex size-12 shrink-0 flex-col items-center justify-center rounded-md bg-muted text-foreground"
              >
                <span className="text-lg font-semibold leading-none tabular-nums">
                  {dayFormat.format(event.eventDate)}
                </span>
                <span className="mt-0.5 text-xs uppercase leading-none">{monthFormat.format(event.eventDate)}</span>
              </time>
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{event.title}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {timeFormat.format(event.eventDate)}
                  {event.location ? ` · ${event.location}` : ''}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
