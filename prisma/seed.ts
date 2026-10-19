import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

const prisma = new PrismaClient()

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required')
  }

  // No defaults on purpose: a known default password is a standing backdoor into the admin panel
  const email = process.env.ADMIN_EMAIL?.trim()
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required (set them in .env, never in code)')
  }
  if (password.length < 12) {
    throw new Error('ADMIN_PASSWORD must be at least 12 characters long')
  }

  const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } })

  const { data: created, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true })

  let authId = created?.user?.id
  if (!authId) {
    console.log('Auth user already exists: its password was left unchanged')
    // Already registered: look the user up so the profile row can be (re)linked
    const { data: list, error: listError } = await supabase.auth.admin.listUsers({ perPage: 1000 })
    if (listError) throw listError
    authId = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())?.id
    if (!authId) throw error ?? new Error('Could not create or find the admin auth user')
  }

  const admin = await prisma.user.upsert({
    where: { id: authId },
    update: { role: 'ADMIN' },
    create: { id: authId, email, name: 'Admin', role: 'ADMIN' },
  })

  console.log('Admin user ready:', admin.email)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
