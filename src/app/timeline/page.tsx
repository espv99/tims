'use client'

import { useState, useEffect } from 'react'
import Header from '@/sections/header/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface News {
  id: string
  title: string
  content: string
  publishedAt: string | null
  createdAt: string
  author?: {
    name: string
    email: string
  }
}

interface Event {
  id: string
  title: string
  description: string
  eventDate: string
  location?: string
  createdAt: string
}

export default function TimelinePage() {
  const [news, setNews] = useState<News[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [newsResponse, eventsResponse] = await Promise.all([
        fetch('/api/news'),
        fetch('/api/events')
      ])

      if (newsResponse.ok) {
        const newsData = await newsResponse.json()
        setNews(newsData)
      }

      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json()
        setEvents(eventsData)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="text-center py-8 text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  // Combine and sort by date (news by publishedAt or createdAt, events by eventDate)
  const timelineItems = [
    ...news.map(item => ({
      ...item,
      type: 'news' as const,
      date: item.publishedAt || item.createdAt
    })),
    ...events.map(item => ({
      ...item,
      type: 'event' as const,
      date: item.eventDate
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
          Timeline TIMS
        </h1>

        <div className="space-y-6">
          {timelineItems.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No hay contenido disponible
              </CardContent>
            </Card>
          ) : (
            timelineItems.map((item) => (
              <Card key={`${item.type}-${item.id}`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.type === 'news' ? 'default' : 'secondary'}>
                      {item.type === 'news' ? 'Noticia' : 'Evento'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {item.type === 'news' ? (
                    <div>
                      <p className="mb-2">{item.content}</p>
                      {item.author && (
                        <p className="text-sm text-muted-foreground">
                          Por {item.author.name || item.author.email}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="mb-2">{item.description}</p>
                      {item.location && (
                        <p className="text-sm text-muted-foreground">
                          📍 {item.location}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}