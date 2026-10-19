'use client'

import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'

const BUCKET = 'media'

interface SupabaseUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function SupabaseUpload({ value, onChange, label = 'Subir imagen' }: SupabaseUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    setUploading(true)
    setError(null)
    try {
      const signRes = await fetch('/api/storage/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name }),
      })
      if (!signRes.ok) {
        const data = await signRes.json()
        throw new Error(data.error || 'Error al obtener la URL de subida')
      }
      const { path, token, publicUrl } = await signRes.json()

      const { error: uploadError } = await createClient()
        .storage.from(BUCKET)
        .uploadToSignedUrl(path, token, file, { contentType: file.type })
      if (uploadError) throw new Error('Error al subir imagen')

      onChange(publicUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
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
          {uploading ? 'Subiendo...' : label}
        </Button>
        {value && (
          <button type="button" onClick={() => onChange('')} className="text-muted-foreground hover:text-destructive">
            <X className="w-4 h-4" />
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />
      </div>
      {error && <p className="text-xs text-destructive-text">{error}</p>}
      {value && (
        <img src={value} alt="preview" className="h-24 w-auto rounded-md object-cover border border-border" />
      )}
    </div>
  )
}
