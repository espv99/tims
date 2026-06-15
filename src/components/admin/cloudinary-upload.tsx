'use client'

import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CloudinaryUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function CloudinaryUpload({ value, onChange, label = 'Subir imagen' }: CloudinaryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    setUploading(true)
    setError(null)
    try {
      const signRes = await fetch('/api/cloudinary/sign', { method: 'POST' })
      if (!signRes.ok) {
        const data = await signRes.json()
        throw new Error(data.error || 'Error al obtener firma')
      }
      const { signature, timestamp, apiKey, cloudName } = await signRes.json()

      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', apiKey)
      formData.append('timestamp', String(timestamp))
      formData.append('signature', signature)

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) throw new Error('Error al subir imagen')
      const uploadData = await uploadRes.json()
      onChange(uploadData.secure_url)
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
      {error && <p className="text-xs text-destructive">{error}</p>}
      {value && (
        <img src={value} alt="preview" className="h-24 w-auto rounded-md object-cover border border-border" />
      )}
    </div>
  )
}
