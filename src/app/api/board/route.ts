import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { BOARD_ROLES, isBoardBody, isBoardRole } from '@/lib/board'
import { isSupabaseStorageUrl } from '@/lib/image-url'

const MAX_NAME_LENGTH = 120
const MAX_PHOTO_LENGTH = 2048

async function canEdit() {
  const session = await auth()
  return !!session && (session.user.role === 'ADMIN' || session.user.role === 'EDITOR')
}

function parseBodyAndRole(body: unknown, role: unknown) {
  if (!isBoardBody(body)) return { error: 'Invalid body' } as const
  if (!isBoardRole(role)) return { error: 'Invalid role' } as const
  return { body, role } as const
}

export async function GET(request: NextRequest) {
  const bodyParam = request.nextUrl.searchParams.get('body')
  if (bodyParam !== null && !isBoardBody(bodyParam)) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  try {
    const members = await prisma.boardMember.findMany({
      where: bodyParam ? { body: bodyParam } : undefined,
      select: { id: true, body: true, role: true, name: true, photo: true },
    })
    members.sort((a, b) => BOARD_ROLES.indexOf(a.role) - BOARD_ROLES.indexOf(b.role))
    return NextResponse.json(members)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch board members' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!(await canEdit())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    let payload: Record<string, unknown>
    try {
      const parsed = await request.json()
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object')
      payload = parsed
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const target = parseBodyAndRole(payload.body, payload.role)
    if ('error' in target) return NextResponse.json({ error: target.error }, { status: 400 })

    const name = typeof payload.name === 'string' ? payload.name.trim() : ''
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json({ error: `Name must be at most ${MAX_NAME_LENGTH} characters` }, { status: 400 })
    }

    let photo: string | null = null
    if (payload.photo !== undefined && payload.photo !== null && payload.photo !== '') {
      if (typeof payload.photo !== 'string' || payload.photo.length > MAX_PHOTO_LENGTH) {
        return NextResponse.json({ error: 'Invalid photo URL' }, { status: 400 })
      }
      // Only this project's public Storage URLs: next/image cannot render other hosts and would break the page
      if (!isSupabaseStorageUrl(payload.photo)) {
        return NextResponse.json({ error: 'Photo must be an image uploaded to Storage' }, { status: 400 })
      }
      photo = payload.photo
    }

    const member = await prisma.boardMember.upsert({
      where: { body_role: { body: target.body, role: target.role } },
      create: { body: target.body, role: target.role, name, photo },
      update: { name, photo },
      select: { id: true, body: true, role: true, name: true, photo: true },
    })
    return NextResponse.json(member)
  } catch {
    return NextResponse.json({ error: 'Failed to save board member' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!(await canEdit())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const params = request.nextUrl.searchParams
    const target = parseBodyAndRole(params.get('body'), params.get('role'))
    if ('error' in target) return NextResponse.json({ error: target.error }, { status: 400 })

    await prisma.boardMember.deleteMany({ where: { body: target.body, role: target.role } })
    return NextResponse.json({ message: 'Board role cleared' })
  } catch {
    return NextResponse.json({ error: 'Failed to clear board role' }, { status: 500 })
  }
}
