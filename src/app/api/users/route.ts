import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { createAdminClient } from '@/utils/supabase/admin'

export async function GET() {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(users)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, password, role } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
    }

    const admin = createAdminClient()
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })
    if (createError || !created.user) {
      const status = createError?.status === 422 ? 409 : 400
      return NextResponse.json({ error: createError?.message || 'Failed to create auth user' }, { status })
    }

    let user
    try {
      user = await prisma.user.create({
        data: { id: created.user.id, name: name || null, email, role: role || 'USER' },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      })
    } catch (err) {
      // Roll back the auth user so both stores stay consistent
      await admin.auth.admin.deleteUser(created.user.id)
      throw err
    }

    return NextResponse.json(user, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
