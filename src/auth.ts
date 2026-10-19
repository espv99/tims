import { prisma } from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'

export interface AppSession {
  user: {
    id: string
    role: string
    name: string | null
    email: string | null
  }
}

// Resolves the current session from the Supabase auth cookie. The role lives in the
// public "User" table, so a Supabase user without a profile row has no session.
export async function auth(): Promise<AppSession | null> {
  const supabase = await createClient()
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()
  if (!authUser) return null

  const user = await prisma.user.findUnique({
    where: { id: authUser.id },
    select: { id: true, name: true, email: true, role: true },
  })
  if (!user) return null

  return { user: { id: user.id, role: user.role, name: user.name, email: user.email } }
}
