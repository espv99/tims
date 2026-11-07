'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { isLocalImageUrl } from '@/lib/image-url'
import {
  BOARD_ROLES,
  BOARD_ROLE_KEYS,
  type BoardBodyValue,
  type BoardMemberDTO,
  type BoardRoleValue,
} from '@/lib/board'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { SupabaseUpload } from '@/components/admin/supabase-upload'

type Status = { kind: 'success' | 'error'; message: string } | null

const SECTIONS: { body: BoardBodyValue; titleKey: 'clubTitle' | 'councilTitle' }[] = [
  { body: 'CLUB', titleKey: 'clubTitle' },
  { body: 'COUNCIL', titleKey: 'councilTitle' },
]

function PageSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-56 mb-2" />
      <Skeleton className="h-4 w-96 max-w-full mb-6" />
      {SECTIONS.map((s) => (
        <Card key={s.body} className="mb-6">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {BOARD_ROLES.map((role) => (
              <div key={role} className="py-4 flex items-center gap-3">
                <Skeleton className="w-11 h-11 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function AdminBoard() {
  const t = useTranslations('admin.board')
  const tAdmin = useTranslations('admin')

  const [members, setMembers] = useState<BoardMemberDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<Status>(null)
  const [editing, setEditing] = useState<{ body: BoardBodyValue; role: BoardRoleValue } | null>(null)
  const [form, setForm] = useState({ name: '', photo: '' })
  const [formError, setFormError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchMembers = useCallback(async () => {
    try {
      const res = await fetch('/api/board', { cache: 'no-store' })
      if (res.ok) setMembers(await res.json())
      else setStatus({ kind: 'error', message: t('loadError') })
    } catch {
      setStatus({ kind: 'error', message: t('loadError') })
    } finally {
      setLoading(false)
    }
  }, [t])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const findMember = (body: BoardBodyValue, role: BoardRoleValue) =>
    members.find((m) => m.body === body && m.role === role)

  const roleLabel = (role: BoardRoleValue) => t(`roles.${BOARD_ROLE_KEYS[role]}`)

  const startEdit = (body: BoardBodyValue, role: BoardRoleValue) => {
    const current = findMember(body, role)
    setEditing({ body, role })
    setForm({ name: current?.name ?? '', photo: current?.photo ?? '' })
    setFormError(null)
    setStatus(null)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing) return
    if (!form.name.trim()) {
      setFormError(t('nameRequired'))
      return
    }
    setSaving(true)
    setFormError(null)
    try {
      const res = await fetch('/api/board', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editing, name: form.name, photo: form.photo }),
      })
      if (res.ok) {
        setEditing(null)
        setStatus({ kind: 'success', message: t('saved') })
        await fetchMembers()
      } else setFormError(t('saveError'))
    } catch {
      setFormError(t('saveError'))
    } finally {
      setSaving(false)
    }
  }

  const handleClear = async (body: BoardBodyValue, role: BoardRoleValue) => {
    if (!confirm(t('clearConfirm', { role: roleLabel(role) }))) return
    try {
      const res = await fetch(`/api/board?body=${body}&role=${role}`, { method: 'DELETE' })
      if (res.ok) {
        setStatus({ kind: 'success', message: t('cleared') })
        await fetchMembers()
      } else setStatus({ kind: 'error', message: t('clearError') })
    } catch {
      setStatus({ kind: 'error', message: t('clearError') })
    }
  }

  if (loading) return <PageSkeleton />

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">{t('pageTitle')}</h1>
      <p className="text-muted-foreground mb-6">{t('pageDescription')}</p>

      <div role="status" aria-live="polite" className="mb-4 empty:hidden">
        {status && (
          <p
            className={`rounded-md border px-3 py-2 text-sm ${
              status.kind === 'error'
                ? 'border-destructive/40 bg-destructive/10 text-destructive'
                : 'border-border bg-muted text-foreground'
            }`}
          >
            {status.message}
          </p>
        )}
      </div>

      {SECTIONS.map(({ body, titleKey }) => (
        <Card key={body} className="mb-6">
          <CardHeader>
            <CardTitle as="h2">{t(titleKey)}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border">
              {BOARD_ROLES.map((role) => {
                const member = findMember(body, role)
                const isEditing = editing?.body === body && editing.role === role
                const id = `board-${body}-${role}`
                return (
                  <li key={role} className="py-4">
                    {isEditing ? (
                      <form onSubmit={handleSave} className="space-y-3">
                        <p className="text-sm font-medium text-primary">{roleLabel(role)}</p>
                        <div>
                          <Label htmlFor={`${id}-name`}>{t('fieldName')}</Label>
                          <Input
                            id={`${id}-name`}
                            className="mt-1 min-h-11"
                            value={form.name}
                            maxLength={120}
                            required
                            autoFocus
                            aria-invalid={formError ? true : undefined}
                            aria-describedby={formError ? `${id}-error` : undefined}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>{t('fieldPhoto')}</Label>
                          <div className="mt-1">
                            <SupabaseUpload
                              value={form.photo}
                              onChange={(url) => setForm({ ...form, photo: url })}
                              label={tAdmin('upload.photoLabel')}
                              maxDimension={800}
                            />
                          </div>
                        </div>
                        {formError && (
                          <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
                            {formError}
                          </p>
                        )}
                        <div className="flex gap-2">
                          <Button type="submit" className="min-h-11" disabled={saving}>
                            {saving ? tAdmin('saving') : t('save')}
                          </Button>
                          <Button type="button" variant="outline" className="min-h-11" onClick={() => setEditing(null)}>
                            {tAdmin('cancel')}
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {member?.photo ? (
                            <Image
                              src={member.photo}
                              alt=""
                              width={44}
                              height={44}
                              unoptimized={isLocalImageUrl(member.photo)}
                              className="w-11 h-11 rounded-full object-cover shrink-0"
                            />
                          ) : (
                            <div
                              aria-hidden="true"
                              className="w-11 h-11 rounded-full bg-muted flex items-center justify-center text-base font-bold text-muted-foreground shrink-0"
                            >
                              {member ? member.name.charAt(0).toUpperCase() : '?'}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-primary">{roleLabel(role)}</p>
                            <p className={`truncate ${member ? 'font-medium' : 'text-muted-foreground'}`}>
                              {member ? member.name : t('empty')}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button
                            variant="outline"
                            className="min-h-11"
                            aria-label={t(member ? 'editRole' : 'assignRole', { role: roleLabel(role) })}
                            onClick={() => startEdit(body, role)}
                          >
                            {member ? tAdmin('edit') : t('assign')}
                          </Button>
                          {member && (
                            <Button
                              variant="destructive"
                              className="min-h-11"
                              aria-label={t('clearRole', { name: member.name, role: roleLabel(role) })}
                              onClick={() => handleClear(body, role)}
                            >
                              {t('clear')}
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
