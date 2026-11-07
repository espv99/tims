/**
 * Browser-only image compression: decodes JPEG/PNG/WebP, resizes and re-encodes as WebP
 * until the result fits in MAX_IMAGE_BYTES. No dependencies.
 */

export const MAX_IMAGE_BYTES = 512 * 1024

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const START_QUALITY = 0.82
const MIN_QUALITY = 0.5
const QUALITY_STEP = 0.08
const SHRINK_FACTOR = 0.85
const MAX_SHRINK_ITERATIONS = 6

export type CompressImageErrorCode = 'unsupported-type' | 'decode-failed' | 'too-large'

export class CompressImageError extends Error {
  code: CompressImageErrorCode

  constructor(code: CompressImageErrorCode) {
    super(code)
    this.name = 'CompressImageError'
    this.code = code
  }
}

export interface CompressImageOptions {
  /** Longest allowed side in pixels. Images are never upscaled. */
  maxDimension?: number
}

type DrawableCanvas = OffscreenCanvas | HTMLCanvasElement

async function encodeWebp(canvas: DrawableCanvas, quality: number): Promise<Blob | null> {
  if ('convertToBlob' in canvas) {
    const blob = await canvas.convertToBlob({ type: 'image/webp', quality })
    return blob.type === 'image/webp' ? blob : null
  }
  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob && blob.type === 'image/webp' ? blob : null), 'image/webp', quality),
  )
}

function createCanvas(width: number, height: number): DrawableCanvas {
  if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(width, height)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

export async function compressImage(file: File, { maxDimension = 1600 }: CompressImageOptions = {}): Promise<Blob> {
  if (!ACCEPTED_TYPES.includes(file.type)) throw new CompressImageError('unsupported-type')

  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    throw new CompressImageError('decode-failed')
  }

  try {
    const longest = Math.max(bitmap.width, bitmap.height)
    let scale = Math.min(1, maxDimension / longest)

    for (let i = 0; i < MAX_SHRINK_ITERATIONS; i++) {
      const width = Math.max(1, Math.round(bitmap.width * scale))
      const height = Math.max(1, Math.round(bitmap.height * scale))
      const canvas = createCanvas(width, height)
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null
      if (!ctx) throw new CompressImageError('decode-failed')
      ctx.drawImage(bitmap, 0, 0, width, height)

      for (let quality = START_QUALITY; quality >= MIN_QUALITY - 0.001; quality -= QUALITY_STEP) {
        const blob = await encodeWebp(canvas, quality)
        // A browser without WebP encoding falls back to PNG, which we reject.
        if (!blob) throw new CompressImageError('decode-failed')
        if (blob.size <= MAX_IMAGE_BYTES) return blob
      }
      scale *= SHRINK_FACTOR
    }
    throw new CompressImageError('too-large')
  } finally {
    bitmap.close()
  }
}
