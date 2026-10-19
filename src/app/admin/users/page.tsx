'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useSession } from '@/components/session-provider'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface User {
  id: string
  name: string | null
  email: string | null
  role: 'USER' | 'EDITOR' | 'ADMIN'
  createdAt: string
}

const emptyForm = { name: '', email: '', password: '', role: 'EDITOR' as User['role'] }

const roleVariant: Record<User['role'], 'default' | 'secondary' | 'outline'> = {
  ADMIN: 'default',
  EDITOR: 'secondary',
  USER: 'outline',
}

export default function AdminUsers() {
  const t = useTranslations('admin.users')
  const tAdmin = useTranslations('admin')
  const { data: session, status } = useSession()

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editRole, setEditRole] = useState<User['role']>('USER')

  useEffect(() => {
    fetchUsers()
  }, [])

  if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
    redirect('/admin')
  }

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      if (res.ok) setUsers(await res.json())
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormData(emptyForm)
        fetchUsers()
      } else {
        const data = await res.json()
        alert(data.error || t('createError'))
      }
    } catch {
      alert(t('createError'))
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateRole = async (id: string) => {
    setSubmitting(true)
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: editRole }),
      })
      if (res.ok) {
        setEditingId(null)
        fetchUsers()
      } else alert(t('updateError'))
    } catch {
      alert(t('updateError'))
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('deleteConfirm'))) return
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      if (res.ok) fetchUsers()
      else {
        const data = await res.json()
        alert(data.error || t('deleteError'))
      }
    } catch {
      alert(t('deleteError'))
    }
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
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">{t('fieldEmail')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">{t('fieldPassword')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">{t('fieldRole')}</Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                  className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="USER">{t('roles.USER')}</option>
                  <option value="EDITOR">{t('roles.EDITOR')}</option>
                  <option value="ADMIN">{t('roles.ADMIN')}</option>
                </select>
              </div>
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? t('submitting') : t('submit')}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('listTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {users.length === 0 ? (
              <div className="py-4 text-center text-muted-foreground">{t('empty')}</div>
            ) : (
              users.map((user) => (
                <div key={user.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{user.name || '—'}</p>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap shrink-0">
                    {editingId === user.id ? (
                      <>
                        <select
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value as User['role'])}
                          className="rounded-md border border-input bg-background px-2 py-1.5 text-sm"
                        >
                          <option value="USER">{t('roles.USER')}</option>
                          <option value="EDITOR">{t('roles.EDITOR')}</option>
                          <option value="ADMIN">{t('roles.ADMIN')}</option>
                        </select>
                        <Button size="sm" disabled={submitting} onClick={() => handleUpdateRole(user.id)}>
                          {submitting ? tAdmin('saving') : 'OK'}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                          {tAdmin('cancel')}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Badge variant={roleVariant[user.role]}>{t(`roles.${user.role}`)}</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(user.id)
                            setEditRole(user.role)
                          }}
                        >
                          {tAdmin('edit')}
                        </Button>
                        {session?.user?.id !== user.id && (
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(user.id)}>
                            {t('delete')}
                          </Button>
                        )}
                      </>
                    )}
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
