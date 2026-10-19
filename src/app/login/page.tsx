'use client'

import { Suspense, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function LoginForm() {
  const t = useTranslations('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  // Only same-site paths are valid redirect targets; anything else falls back to the home page
  const rawCallback = searchParams.get('callbackUrl')
  const callbackUrl =
    rawCallback && rawCallback.startsWith('/') && !rawCallback.startsWith('//') && !rawCallback.startsWith('/\\')
      ? rawCallback
      : '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error: signInError } = await createClient().auth.signInWithPassword({ email, password })
      if (signInError) {
        const isBadCredentials = signInError.code === 'invalid_credentials' || signInError.status === 400
        setError(isBadCredentials ? t('invalidCredentials') : t('error'))
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      setError(t('error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          className="h-11"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="correo@espoch.edu.ec"
        />
      </div>
      <div>
        <Label htmlFor="password">{t('password')}</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          className="h-11"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && (
        <div role="alert" className="text-sm font-medium text-red-700 dark:text-red-400 text-center">
          {error}
        </div>
      )}
      <Button type="submit" className="w-full h-11" disabled={loading}>
        {loading ? t('submitting') : t('submit')}
      </Button>
    </form>
  )
}

export default function LoginPage() {
  const t = useTranslations('login')
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <Link href="/" aria-label={t('backHome')} className="mb-2 rounded-full bg-white">
            <Image src="/logo.png" alt="" width={64} height={64} priority />
          </Link>
          <h1 className="text-2xl font-semibold leading-none tracking-tight">{t('title')}</h1>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="h-40" />}>
            <LoginForm />
          </Suspense>
          <Link
            href="/"
            className="mt-6 block text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {t('backHome')}
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
