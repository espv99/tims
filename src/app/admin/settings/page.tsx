'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useSession } from '@/components/session-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminSettings() {
  const t = useTranslations('admin.settings')
  const { data: session } = useSession()

  const [formData, setFormData] = useState({ cloudinaryCloudName: '', cloudinaryApiKey: '', cloudinaryApiSecret: '' })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      if (!session?.user?.id) return
      const res = await fetch(`/api/users/${session.user.id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          cloudinaryCloudName: data.cloudinaryCloudName || '',
          cloudinaryApiKey: data.cloudinaryApiKey || '',
          cloudinaryApiSecret: data.cloudinaryApiSecret || '',
        })
      }
    }
    fetchSettings()
  }, [session?.user?.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id) return
    setSubmitting(true)
    setMessage(null)
    try {
      const res = await fetch(`/api/users/${session.user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) setMessage({ text: t('saveSuccess'), ok: true })
      else setMessage({ text: t('saveError'), ok: false })
    } catch { setMessage({ text: t('saveError'), ok: false }) } finally { setSubmitting(false) }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">{t('pageTitle')}</h1>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>{t('cloudinaryTitle')}</CardTitle>
          <CardDescription>{t('cloudinaryDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cloudName">{t('fieldCloudName')}</Label>
              <Input
                id="cloudName"
                value={formData.cloudinaryCloudName}
                onChange={(e) => setFormData({ ...formData, cloudinaryCloudName: e.target.value })}
                placeholder="my-cloud"
              />
            </div>
            <div>
              <Label htmlFor="apiKey">{t('fieldApiKey')}</Label>
              <Input
                id="apiKey"
                value={formData.cloudinaryApiKey}
                onChange={(e) => setFormData({ ...formData, cloudinaryApiKey: e.target.value })}
                placeholder="123456789012345"
              />
            </div>
            <div>
              <Label htmlFor="apiSecret">{t('fieldApiSecret')}</Label>
              <Input
                id="apiSecret"
                type="password"
                value={formData.cloudinaryApiSecret}
                onChange={(e) => setFormData({ ...formData, cloudinaryApiSecret: e.target.value })}
                placeholder="••••••••••••••••••••••••"
              />
            </div>
            {message && (
              <p className={`text-sm ${message.ok ? 'text-green-600' : 'text-destructive'}`}>{message.text}</p>
            )}
            <Button type="submit" disabled={submitting}>{submitting ? t('submitting') : t('submit')}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
