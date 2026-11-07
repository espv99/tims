import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Creation happens inline on each list page, so these link to the list pages.
export async function QuickActions() {
  const t = await getTranslations('admin.dashboard')

  return (
    <nav aria-label={t('quickActions')} className="flex flex-wrap gap-2">
      <Button asChild className="h-11 px-4">
        <Link href="/admin/news">
          <Plus aria-hidden="true" />
          {t('newNews')}
        </Link>
      </Button>
      <Button asChild variant="outline" className="h-11 px-4">
        <Link href="/admin/events">
          <Plus aria-hidden="true" />
          {t('newEvent')}
        </Link>
      </Button>
    </nav>
  )
}
