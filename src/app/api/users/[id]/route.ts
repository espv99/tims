import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { createAdminClient } from '@/utils/supabase/admin'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await auth()
    if (!session || session.user.id !== id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true },
    })

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()

    // Only ADMIN can change roles; users can update their own profile
    if (body.role !== undefined && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (body.role === undefined && session.user.id !== id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, role } = body

    const updateData: Record<string, unknown> = {}
    if (name !== undefined) updateData.name = name
    if (role !== undefined) updateData.role = role

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    })

    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.id === id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 })
    }

    // Deleting the auth user first: if it fails, the profile row stays and nothing is orphaned
    const { error: deleteError } = await createAdminClient().auth.admin.deleteUser(id)
    if (deleteError && deleteError.status !== 404) {
      return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
    }
    await prisma.user.deleteMany({ where: { id } })
    return NextResponse.json({ message: 'User deleted' })
  } catch {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
