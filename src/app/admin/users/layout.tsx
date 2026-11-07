import { auth } from '@/auth'
import { redirect } from 'next/navigation'

// Only ADMIN manages users. Guarding on the server keeps EDITOR from loading the page and hitting /api/users (403).
export default async function AdminUsersLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (session?.user.role !== 'ADMIN') {
    redirect('/admin')
  }

  return children
}
