"use client"

import { ChangeEvent, useRef, useState } from "react"
import { Upload, X, FileText, Image as ImageIcon, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type UploadResult = { file: File; s3Key: string }

interface FileUploadProps {
  label: string
  id: string
  accept: string
  required?: boolean

  // New: backend-backed upload
    getRegId: () => Promise<string>

  docType: string

  // New: return s3Key (not raw File)
  onChange: (result: UploadResult | null) => void

  error?: string
  description?: string
}

export function FileUpload({
  id,
  label,
  getRegId,
  accept,
  required = false,
  docType,
  onChange,
  error,
  description,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  async function uploadToS3(selectedFile: File) {
    
    setUploading(true)
    setUploadError(null)
   

    try {
      const regId = await getRegId()
       console.log("Uploading doc", { regId, docType, name: selectedFile.name })
      // 1) presign
      const presignRes = await fetch("/api/uploads/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
  regId,
  docType,
  mimeType: selectedFile.type || "application/octet-stream",
}),
      })

      if (!presignRes.ok) {
        const text = await presignRes.text()
        throw new Error(text || "Failed to presign upload")
      }

      const { url, s3Key } = (await presignRes.json()) as {
        url: string
        s3Key: string
      }

      // 2) PUT to S3 (direct from browser)
      const putRes = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type || "application/octet-stream",
        },
        body: selectedFile,
      })

      if (!putRes.ok) {
        const text = await putRes.text()
        throw new Error(text || "Failed to upload to S3")
      }

      // 3) attach metadata in DynamoDB
      const attachRes = await fetch("/api/registrations/attach-doc", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    regId,
    docType,
    s3Key,
    mimeType: selectedFile.type || "application/octet-stream",
    size: selectedFile.size,
  }),
})


      if (!attachRes.ok) {
        const text = await attachRes.text()
        throw new Error(text || "Failed to attach document")
      }
     console.log("FileUpload success -> s3Key", s3Key)

      // Success
      onChange({ file: selectedFile, s3Key })
    } catch (e) {
      const message = e instanceof Error ? e.message : "Upload failed"
      setUploadError(message)
      onChange(null)
      console.error("FileUpload failed", e)
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)

    // Preview for images (pure UI)
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }

    if (!selectedFile) {
      onChange(null)
      return
    }

    await uploadToS3(selectedFile)
  }

  const handleRemove = () => {
    setFile(null)
    setPreview(null)
    setUploadError(null)
    onChange(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  const isImage = accept.includes("image")

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <Label htmlFor={id} className="text-sm font-medium">
            {label} {required && <span className="text-destructive">*</span>}
          </Label>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>

        {file && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div
        className={cn(
          "relative rounded-lg border border-dashed p-4 transition-colors",
          uploading ? "opacity-60" : "hover:bg-muted/50",
          error || uploadError ? "border-destructive" : "border-border"
        )}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={handleFileChange}
          disabled={uploading}
        />

        {!file ? (
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <Upload className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click to upload {isImage ? "image" : "document"}
            </p>
            <p className="text-xs text-muted-foreground">
              {accept.replace(/\./g, "").toUpperCase()}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Preview"
                className="h-12 w-12 rounded object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
                {isImage ? (
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                ) : (
                  <FileText className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>

            {uploading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading…
              </div>
            )}
          </div>
        )}
      </div>

      {(error || uploadError) && (
        <p className="text-sm text-destructive">{error || uploadError}</p>
      )}
    </div>
  )
}
