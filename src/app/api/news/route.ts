import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      where: {
        publishedAt: {
          not: null
        }
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, publishedAt } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        authorId: session.user.id
      }
    })

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 })
  }
}