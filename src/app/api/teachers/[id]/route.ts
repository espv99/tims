import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const teacher = await prisma.teacher.findUnique({ where: { id } })
    if (!teacher) return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
    return NextResponse.json(teacher)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch teacher' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, title, specialty, email, photo } = body

    const teacher = await prisma.teacher.update({
      where: { id },
      data: { name, title: title || null, specialty: specialty || null, email: email || null, photo: photo || null },
    })

    return NextResponse.json(teacher)
  } catch {
    return NextResponse.json({ error: 'Failed to update teacher' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.teacher.delete({ where: { id } })
    return NextResponse.json({ message: 'Teacher deleted' })
  } catch {
    return NextResponse.json({ error: 'Failed to delete teacher' }, { status: 500 })
  }
}
