/**
 * The Next.js image optimizer refuses to fetch from private IPs, so images served by a local
 * Supabase (127.0.0.1 / localhost) must be rendered unoptimized. Remote URLs stay optimized.
 */
export function isLocalImageUrl(src: string): boolean {
  try {
    const { hostname } = new URL(src)
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'
  } catch {
    return false
  }
}
