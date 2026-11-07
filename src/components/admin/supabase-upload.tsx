'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { isLocalImageUrl } from '@/lib/image-url'
import { CompressImageError, compressImage } from '@/lib/compress-image'

const BUCKET = 'media'

interface SupabaseUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  /** Longest side, in pixels, the image is resized to before upload. */
  maxDimension?: number
}

export function SupabaseUpload({ value, onChange, label, maxDimension = 1600 }: SupabaseUploadProps) {
  const t = useTranslations('admin.upload')
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sizeKb, setSizeKb] = useState<number | null>(null)

  const handleFile = async (file: File) => {
    setUploading(true)
    setError(null)
    setSizeKb(null)
    try {
      const blob = await compressImage(file, { maxDimension })
      const baseName = file.name.replace(/\.[^.]+$/, '') || 'image'

      const signRes = await fetch('/api/storage/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: `${baseName}.webp` }),
      })
      if (!signRes.ok) {
        const data = await signRes.json().catch(() => null)
        throw new Error(data?.error || t('signFailed'))
      }
      const { path, token, publicUrl } = await signRes.json()

      const { error: uploadError } = await createClient()
        .storage.from(BUCKET)
        .uploadToSignedUrl(path, token, blob, { contentType: 'image/webp' })
      if (uploadError) throw new Error(t('uploadFailed'))

      setSizeKb(Math.round(blob.size / 1024))
      onChange(publicUrl)
    } catch (err) {
      if (err instanceof CompressImageError) {
        const messages = {
          'unsupported-type': t('unsupportedType'),
          'decode-failed': t('decodeFailed'),
          'too-large': t('tooLarge'),
        }
        setError(messages[err.code])
      } else {
        setError(err instanceof Error ? err.message : t('unknownError'))
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? t('uploading') : (label ?? t('label'))}
        </Button>
        {value && (
          <button
            type="button"
            aria-label={t('remove')}
            onClick={() => onChange('')}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />
      </div>
      {error && <p className="text-xs text-destructive-text">{error}</p>}
      {sizeKb !== null && <p className="text-xs text-muted-foreground">{t('finalSize', { size: sizeKb })}</p>}
      {value && (
        <Image
          src={value}
          alt={t('previewAlt')}
          width={96}
          height={96}
          unoptimized={isLocalImageUrl(value)}
          className="h-24 w-auto rounded-md object-cover border border-border" />
      )}
    </div>
  )
}
