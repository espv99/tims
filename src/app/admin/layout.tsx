import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { AdminShell } from '@/components/admin/admin-shell'
import type { Metadata } from 'next'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session || !session.user || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
    redirect('/')
  }

  return (
    <AdminShell role={session.user.role!} userName={session.user.name} userEmail={session.user.email}>
      {children}
    </AdminShell>
  )
}
