'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { LayoutDashboard, Newspaper, Calendar, GraduationCap, Users, Settings, LogOut, X } from 'lucide-react'

interface AdminSidebarProps {
  role: string
  userName: string | null | undefined
  userEmail: string | null | undefined
  onClose?: () => void
}

export function AdminSidebar({ role, userName, userEmail, onClose }: AdminSidebarProps) {
  const t = useTranslations('admin.nav')
  const pathname = usePathname()

  const navItems = [
    { label: t('dashboard'), href: '/admin', icon: LayoutDashboard },
    { label: t('news'), href: '/admin/news', icon: Newspaper },
    { label: t('events'), href: '/admin/events', icon: Calendar },
    { label: t('teachers'), href: '/admin/teachers', icon: GraduationCap },
    ...(role === 'ADMIN' ? [{ label: t('users'), href: '/admin/users', icon: Users }] : []),
    { label: t('settings'), href: '/admin/settings', icon: Settings },
  ]

  return (
    <aside className="w-72 md:w-64 h-full min-h-screen bg-card border-r border-border flex flex-col">
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
            className="md:hidden shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label="Cerrar menú"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {t('logout')}
        </button>
      </div>
    </aside>
  )
}
