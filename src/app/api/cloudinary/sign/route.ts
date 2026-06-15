import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST() {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { cloudinaryCloudName: true, cloudinaryApiKey: true, cloudinaryApiSecret: true },
    })

    if (!user?.cloudinaryCloudName || !user?.cloudinaryApiKey || !user?.cloudinaryApiSecret) {
      return NextResponse.json({ error: 'Cloudinary credentials not configured' }, { status: 400 })
    }

    const timestamp = Math.round(Date.now() / 1000)
    const signature = crypto
      .createHash('sha1')
      .update(`timestamp=${timestamp}${user.cloudinaryApiSecret}`)
      .digest('hex')

    return NextResponse.json({
      signature,
      timestamp,
      apiKey: user.cloudinaryApiKey,
      cloudName: user.cloudinaryCloudName,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to generate signature' }, { status: 500 })
  }
}
