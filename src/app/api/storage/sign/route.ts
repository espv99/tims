import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createAdminClient } from '@/utils/supabase/admin'

const BUCKET = 'media'
const ALLOWED_EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png']

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { fileName } = await request.json().catch(() => ({ fileName: '' }))
    const extension = typeof fileName === 'string' ? (fileName.split('.').pop() ?? '').replace(/[^a-zA-Z0-9]/g, '') : ''
    if (!ALLOWED_EXTENSIONS.includes(extension.toLowerCase())) {
      return NextResponse.json({ error: 'Unsupported file type. Allowed: webp, jpg, jpeg, png' }, { status: 400 })
    }
    const path = `${session.user.id}/${crypto.randomUUID()}.${extension.toLowerCase()}`

    const supabase = createAdminClient()
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUploadUrl(path)
    if (error || !data) {
      return NextResponse.json({ error: 'Failed to create upload URL' }, { status: 500 })
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(data.path)

    return NextResponse.json({ path: data.path, token: data.token, publicUrl })
  } catch {
    return NextResponse.json({ error: 'Failed to create upload URL' }, { status: 500 })
  }
}
