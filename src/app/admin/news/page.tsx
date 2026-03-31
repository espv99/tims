import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

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

export default function AdminNews() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news')
      if (response.ok) {
        const data = await response.json()
        setNews(data)
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setFormData({ title: '', content: '' })
        fetchNews()
      } else {
        alert('Error al crear la noticia')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al crear la noticia')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta noticia?')) return

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchNews()
      } else {
        alert('Error al eliminar la noticia')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al eliminar la noticia')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Gestionar Noticias
      </h1>

      {/* Form to create news */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Crear Nueva Noticia</CardTitle>
          <CardDescription>
            Agrega una nueva noticia al sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="content">Contenido</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                required
              />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Creando...' : 'Crear Noticia'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* News list */}
      <Card>
        <CardHeader>
          <CardTitle>Noticias Publicadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {news.length === 0 ? (
              <div className="py-4 text-center text-muted-foreground">
                No hay noticias publicadas
              </div>
            ) : (
              news.map((item) => (
                <div key={item.id} className="py-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Por {item.author?.name || item.author?.email} • {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-muted-foreground mt-2 line-clamp-2">
                        {item.content}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      variant="destructive"
                      size="sm"
                      className="ml-4"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}