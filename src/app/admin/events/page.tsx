'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CloudinaryUpload } from '@/components/admin/cloudinary-upload'

interface Event {
  id: string
  title: string
  description: string
  eventDate: string
  location?: string | null
  imageUrl?: string | null
  createdAt: string
}

const emptyForm = { title: '', description: '', eventDate: '', location: '', imageUrl: '' }

export default function AdminEvents() {
  const t = useTranslations('admin.events')
  const tAdmin = useTranslations('admin')
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'

  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState(emptyForm)

  useEffect(() => { fetchEvents() }, [])

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events')
      if (res.ok) setEvents(await res.json())
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  const toDatetimeLocal = (iso: string) => iso ? iso.slice(0, 16) : ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) { setFormData(emptyForm); fetchEvents() }
      else alert(t('createError'))
    } catch { alert(t('createError')) } finally { setSubmitting(false) }
  }

  const handleEdit = (item: Event) => {
    setEditingId(item.id)
    setEditData({
      title: item.title,
      description: item.description,
      eventDate: toDatetimeLocal(item.eventDate),
      location: item.location || '',
      imageUrl: item.imageUrl || '',
    })
  }

  const handleUpdate = async (id: string) => {
    setSubmitting(true)
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      })
      if (res.ok) { setEditingId(null); fetchEvents() }
      else alert(t('createError'))
    } catch { alert(t('createError')) } finally { setSubmitting(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('deleteConfirm'))) return
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' })
      if (res.ok) fetchEvents()
      else alert(t('deleteError'))
    } catch { alert(t('deleteError')) }
  }

  if (loading) return <div className="text-center py-8">{tAdmin('loading')}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">{t('pageTitle')}</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t('createTitle')}</CardTitle>
          <CardDescription>{t('createDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">{t('fieldTitle')}</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="description">{t('fieldDescription')}</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} required />
            </div>
            <div>
              <Label htmlFor="eventDate">{t('fieldDate')}</Label>
              <Input id="eventDate" type="datetime-local" value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="location">{t('fieldLocation')}</Label>
              <Input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
            </div>
            <div>
              <Label>Imagen</Label>
              <div className="mt-1 space-y-2">
                <Input
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                />
                <CloudinaryUpload value={formData.imageUrl} onChange={(url) => setFormData({ ...formData, imageUrl: url })} />
              </div>
            </div>
            <Button type="submit" disabled={submitting}>{submitting ? t('submitting') : t('submit')}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>{t('listTitle')}</CardTitle></CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {events.length === 0 ? (
              <div className="py-4 text-center text-muted-foreground">{t('empty')}</div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="py-4">
                  {editingId === event.id ? (
                    <div className="space-y-3">
                      <Input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                      <Textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} rows={3} />
                      <Input type="datetime-local" value={editData.eventDate} onChange={(e) => setEditData({ ...editData, eventDate: e.target.value })} />
                      <Input placeholder={t('fieldLocation')} value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
                      <div className="space-y-1">
                        <Input placeholder="https://..." value={editData.imageUrl} onChange={(e) => setEditData({ ...editData, imageUrl: e.target.value })} />
                        <CloudinaryUpload value={editData.imageUrl} onChange={(url) => setEditData({ ...editData, imageUrl: url })} />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" disabled={submitting} onClick={() => handleUpdate(event.id)}>
                          {submitting ? tAdmin('saving') : 'Guardar'}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>{tAdmin('cancel')}</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3">
                          {event.imageUrl && (
                            <img src={event.imageUrl} alt={event.title} className="w-14 h-14 sm:w-16 sm:h-16 rounded object-cover shrink-0" />
                          )}
                          <div className="min-w-0">
                            <h3 className="text-base sm:text-lg font-medium">{event.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(event.eventDate).toLocaleString()} · {event.location || t('locationEmpty')}
                            </p>
                            <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{event.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button onClick={() => handleEdit(event)} variant="outline" size="sm">{tAdmin('edit')}</Button>
                        {isAdmin && (
                          <Button onClick={() => handleDelete(event.id)} variant="destructive" size="sm">{t('delete')}</Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
