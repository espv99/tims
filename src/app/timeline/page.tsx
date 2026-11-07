import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { pageMetadata } from '@/app/metadata'
import Header from '@/sections/header/Header'
import { prisma } from '@/lib/prisma'
import { TimelineList, type TimelineEvent, type TimelineNews } from '@/components/timeline/timeline-list'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('seo.timeline')
  return pageMetadata({ title: t('title'), description: t('description'), path: '/timeline' })
}

async function getTimelineData(): Promise<{ news: TimelineNews[]; events: TimelineEvent[] }> {
  try {
    const [news, events] = await Promise.all([
      prisma.news.findMany({
        where: { publishedAt: { not: null } },
        select: {
          id: true,
          title: true,
          content: true,
          publishedAt: true,
          createdAt: true,
          author: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.event.findMany({
        select: { id: true, title: true, description: true, eventDate: true, location: true, createdAt: true },
        orderBy: { eventDate: 'asc' },
      }),
    ])
    return {
      news: news.map((n) => ({
        ...n,
        publishedAt: n.publishedAt ? n.publishedAt.toISOString() : null,
        createdAt: n.createdAt.toISOString(),
      })),
      events: events.map((e) => ({
        ...e,
        eventDate: e.eventDate.toISOString(),
        createdAt: e.createdAt.toISOString(),
      })),
    }
  } catch (error) {
    console.error('Failed to load timeline data:', error)
    return { news: [], events: [] }
  }
}

export default async function TimelinePage() {
  const [t, { news, events }] = await Promise.all([getTranslations('timeline'), getTimelineData()])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main id="main-content">
        <div className="bg-blueti text-white">
          <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{t('title')}</h1>
            <p className="text-blueti-muted text-sm">{t('subtitle')}</p>
          </div>
        </div>

        <TimelineList news={news} events={events} />
      </main>
    </div>
  )
}
