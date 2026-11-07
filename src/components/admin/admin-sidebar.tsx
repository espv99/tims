'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { useTranslations } from 'next-intl'
import { LayoutDashboard, Newspaper, Calendar, GraduationCap, Landmark, Users, LogOut, X } from 'lucide-react'

interface AdminSidebarProps {
  role: string
  userName: string | null | undefined
  userEmail: string | null | undefined
  onClose?: () => void
}

export function AdminSidebar({ role, userName, userEmail, onClose }: AdminSidebarProps) {
  const t = useTranslations('admin.nav')
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await createClient().auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const navItems = [
    { label: t('dashboard'), href: '/admin', icon: LayoutDashboard },
    { label: t('news'), href: '/admin/news', icon: Newspaper },
    { label: t('events'), href: '/admin/events', icon: Calendar },
    { label: t('teachers'), href: '/admin/teachers', icon: GraduationCap },
    { label: t('board'), href: '/admin/board', icon: Landmark },
    ...(role === 'ADMIN' ? [{ label: t('users'), href: '/admin/users', icon: Users }] : []),
  ]

  return (
    <aside className="flex h-dvh w-72 max-w-[85vw] flex-col border-r border-border bg-card md:w-64 md:max-w-none">
      <div className="p-4 border-b border-border flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-sm text-foreground truncate">{userName || userEmail}</p>
          <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
            {role}
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="-mr-2 -mt-2 flex size-11 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none md:hidden cursor-pointer"
            aria-label={t('closeMenu')}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        )}
      </div>

      <nav aria-label={t('mainNav')} className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const isActive = item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="size-4 shrink-0" aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={() => handleSignOut()}
          className="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        >
          <LogOut className="size-4 shrink-0" aria-hidden="true" />
          {t('logout')}
        </button>
      </div>
    </aside>
  )
}
