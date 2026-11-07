'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Menu } from 'lucide-react'
import { AdminSidebar } from './admin-sidebar'

interface AdminShellProps {
  role: string
  userName: string | null | undefined
  userEmail: string | null | undefined
  children: React.ReactNode
}

export function AdminShell({ role, userName, userEmail, children }: AdminShellProps) {
  const t = useTranslations('admin')
  const tNav = useTranslations('admin.nav')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Close drawer on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Close drawer with Escape
  useEffect(() => {
    if (!sidebarOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSidebarOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [sidebarOpen])

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — fixed drawer on mobile, static on desktop */}
      <div
        id="admin-sidebar"
        className={`fixed inset-y-0 left-0 z-50 transition-[transform,visibility] duration-200 ease-in-out motion-reduce:transition-none md:sticky md:top-0 md:z-auto md:h-dvh md:translate-x-0 md:visible ${
          sidebarOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'
        }`}
      >
        <AdminSidebar role={role} userName={userName} userEmail={userEmail} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex min-h-14 items-center gap-2 border-b border-border bg-card px-4 py-1 md:px-6">
          <button
            className="-ml-2 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label={tNav('openMenu')}
            aria-controls="admin-sidebar"
            aria-expanded={sidebarOpen}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
          <h1 className="truncate text-base font-semibold text-foreground">{t('panelTitle')}</h1>
        </header>

        <main className="min-w-0 flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
