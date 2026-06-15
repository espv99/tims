import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const news = await prisma.news.findUnique({
      where: { id },
      include: { author: { select: { name: true, email: true } } },
    })
    if (!news) return NextResponse.json({ error: 'News not found' }, { status: 404 })
    return NextResponse.json(news)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
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
    const { title, content, publishedAt, imageUrl } = body

    const news = await prisma.news.update({
      where: { id },
      data: {
        title,
        content,
        imageUrl: imageUrl !== undefined ? imageUrl : undefined,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
      },
    })

    return NextResponse.json(news)
  } catch {
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.news.delete({ where: { id } })
    return NextResponse.json({ message: 'News deleted' })
  } catch {
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 })
  }
}
