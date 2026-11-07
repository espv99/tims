import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/sections/header/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BoardGrid } from '@/components/board/board-grid'

// Board members are edited from the admin panel, so never serve a statically frozen copy.
export const dynamic = 'force-dynamic'

export default async function ClubPage() {
  const t = await getTranslations('club')

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main id="main-content" className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle as="h2" className="flex items-center gap-2">
                <span className="text-primary" aria-hidden="true">
                  ◎
                </span>{' '}
                {t('missionTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">{t('missionText')}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle as="h2" className="flex items-center gap-2">
                <span className="text-primary" aria-hidden="true">
                  ◎
                </span>{' '}
                {t('visionTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">{t('visionText')}</CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle as="h2">{t('boardTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <BoardGrid body="CLUB" namespace="club" />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
