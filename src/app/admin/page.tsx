import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

  const stats = [
    { label: t('statsNews'), value: newsCount, href: '/admin/news', icon: Newspaper },
    { label: t('statsEvents'), value: eventsCount, href: '/admin/events', icon: Calendar },
    { label: t('statsTeachers'), value: teachersCount, href: '/admin/teachers', icon: GraduationCap },
    ...(usersCount === null ? [] : [{ label: t('statsUsers'), value: usersCount, href: '/admin/users', icon: Users }]),
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">{t('title')}</h2>
        <p className="text-muted-foreground mt-1">{t('description')}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {/* upcomingEvents and latestNews are rendered by the dashboard sections */}
      <span hidden data-upcoming={upcomingEvents.length} data-latest={latestNews.length} />
    </div>
  )
}
