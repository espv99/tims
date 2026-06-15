'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CloudinaryUpload } from '@/components/admin/cloudinary-upload'

interface Teacher {
  id: string
  name: string
  title: string | null
  specialty: string | null
  email: string | null
  photo: string | null
  createdAt: string
}

const emptyForm = { name: '', title: '', specialty: '', email: '', photo: '' }

export default function AdminTeachers() {
  const t = useTranslations('admin.teachers')
  const tAdmin = useTranslations('admin')
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'

  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState(emptyForm)

  useEffect(() => { fetchTeachers() }, [])

  const fetchTeachers = async () => {
    try {
      const res = await fetch('/api/teachers')
      if (res.ok) setTeachers(await res.json())
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) { setFormData(emptyForm); fetchTeachers() }
      else alert(t('createError'))
    } catch { alert(t('createError')) } finally { setSubmitting(false) }
  }

  const handleEdit = (item: Teacher) => {
    setEditingId(item.id)
    setEditData({ name: item.name, title: item.title || '', specialty: item.specialty || '', email: item.email || '', photo: item.photo || '' })
  }

  const handleUpdate = async (id: string) => {
    setSubmitting(true)
    try {
      const res = await fetch(`/api/teachers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      })
      if (res.ok) { setEditingId(null); fetchTeachers() }
      else alert(t('updateError'))
    } catch { alert(t('updateError')) } finally { setSubmitting(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('deleteConfirm'))) return
    try {
      const res = await fetch(`/api/teachers/${id}`, { method: 'DELETE' })
      if (res.ok) fetchTeachers()
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{t('fieldName')}</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="title">{t('fieldTitle')}</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="specialty">{t('fieldSpecialty')}</Label>
                <Input id="specialty" value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="email">{t('fieldEmail')}</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>{t('fieldPhoto')}</Label>
              <div className="mt-1 space-y-2">
                <Input placeholder="https://..." value={formData.photo} onChange={(e) => setFormData({ ...formData, photo: e.target.value })} />
                <CloudinaryUpload value={formData.photo} onChange={(url) => setFormData({ ...formData, photo: url })} label="Subir foto" />
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
            {teachers.length === 0 ? (
              <div className="py-4 text-center text-muted-foreground">{t('empty')}</div>
            ) : (
              teachers.map((item) => (
                <div key={item.id} className="py-4">
                  {editingId === item.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input placeholder={t('fieldName')} value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                        <Input placeholder={t('fieldTitle')} value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                        <Input placeholder={t('fieldSpecialty')} value={editData.specialty} onChange={(e) => setEditData({ ...editData, specialty: e.target.value })} />
                        <Input placeholder={t('fieldEmail')} type="email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <Input placeholder="https://..." value={editData.photo} onChange={(e) => setEditData({ ...editData, photo: e.target.value })} />
                        <CloudinaryUpload value={editData.photo} onChange={(url) => setEditData({ ...editData, photo: url })} label="Subir foto" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" disabled={submitting} onClick={() => handleUpdate(item.id)}>
                          {submitting ? tAdmin('saving') : t('submitEdit')}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>{tAdmin('cancel')}</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {item.photo ? (
                          <img src={item.photo} alt={item.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center text-base font-bold text-muted-foreground shrink-0">
                            {item.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium truncate">{item.name}</p>
                          {item.title && <p className="text-sm text-primary truncate">{item.title}</p>}
                          {item.specialty && <p className="text-sm text-muted-foreground truncate">{item.specialty}</p>}
                          {item.email && <p className="text-xs text-muted-foreground truncate">{item.email}</p>}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button onClick={() => handleEdit(item)} variant="outline" size="sm">{tAdmin('edit')}</Button>
                        {isAdmin && (
                          <Button onClick={() => handleDelete(item.id)} variant="destructive" size="sm">{t('delete')}</Button>
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
