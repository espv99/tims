/**
 * The Next.js image optimizer refuses to fetch from private IPs, so images served by a local
 * Supabase (127.0.0.1 / localhost) must be rendered unoptimized. Remote URLs stay optimized.
 */
const STORAGE_PUBLIC_PATH = '/storage/v1/object/public/'

/**
 * True only for public Storage URLs of this project's Supabase (same origin as NEXT_PUBLIC_SUPABASE_URL).
 * These are the only hosts next/image is configured for, so anything else would fail to render.
 */
export function isSupabaseStorageUrl(src: string): boolean {
  try {
    const supabase = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '')
    const url = new URL(src)
    return url.origin === supabase.origin && url.pathname.startsWith(STORAGE_PUBLIC_PATH)
  } catch {
    return false
  }
}

export function isLocalImageUrl(src: string): boolean {
  try {
    const { hostname } = new URL(src)
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'
  } catch {
    return false
  }
}
