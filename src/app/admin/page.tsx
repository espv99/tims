import { getTranslations } from 'next-intl/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { DashboardCounters, type DashboardCounter } from '@/components/admin/dashboard/dashboard-counters'
import { LatestNews } from '@/components/admin/dashboard/latest-news'
import { QuickActions } from '@/components/admin/dashboard/quick-actions'
import { UpcomingEvents } from '@/components/admin/dashboard/upcoming-events'
import { Newspaper, Calendar, GraduationCap, Users } from 'lucide-react'

const LIST_LIMIT = 5

function startOfToday() {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

export default async function AdminDashboard() {
  const [t, session] = await Promise.all([getTranslations('admin.dashboard'), auth()])
  const isAdmin = session?.user.role === 'ADMIN'

  const [newsCount, eventsCount, teachersCount, usersCount, upcomingEvents, latestNews] = await Promise.all([
    prisma.news.count(),
    prisma.event.count(),
    prisma.teacher.count(),
    isAdmin ? prisma.user.count() : Promise.resolve(null),
    prisma.event.findMany({
      where: { eventDate: { gte: startOfToday() } },
      orderBy: { eventDate: 'asc' },
      take: LIST_LIMIT,
      select: { id: true, title: true, eventDate: true, location: true },
    }),
    prisma.news.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: 'desc' },
      take: LIST_LIMIT,
      select: { id: true, title: true, publishedAt: true },
    }),
  ])

  const counters: DashboardCounter[] = [
    { label: t('statsNews'), value: newsCount, href: '/admin/news', icon: Newspaper },
    { label: t('statsEvents'), value: eventsCount, href: '/admin/events', icon: Calendar },
    { label: t('statsTeachers'), value: teachersCount, href: '/admin/teachers', icon: GraduationCap },
    ...(usersCount === null ? [] : [{ label: t('statsUsers'), value: usersCount, href: '/admin/users', icon: Users }]),
  ]

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground">{t('description')}</p>
        <QuickActions />
      </div>

      <DashboardCounters heading={t('countersHeading')} counters={counters} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UpcomingEvents events={upcomingEvents} />
        <LatestNews news={latestNews} />
      </div>
    </div>
  )
}
