"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

const DOCUMENT_FIELDS = [
  "photo", "birthCertificate", "domicileCertificate",
  "boneDensityCertificate", "medicalCertificate",
  "coachingAffidavit", "experiencePdf", "academyCertificate"
]

const HIDDEN_FIELDS = ["PK", "SK"]

function FieldLabel({ name }: { name: string }) {
  return (
    <span className="text-sm text-muted-foreground w-52 shrink-0 capitalize">
      {name.replace(/([A-Z])/g, " $1").trim()}
    </span>
  )
}

function DocumentLink({ s3Key }: { s3Key: string }) {
  const [url, setUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/presign?key=${encodeURIComponent(s3Key)}`)
      .then(r => r.json())
      .then(data => setUrl(data.url))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [s3Key])

  if (loading) return <span className="text-xs text-muted-foreground">Loading…</span>
  if (!url) return <span className="text-xs text-red-500">Failed</span>

  const isImage = s3Key.match(/\.(jpg|jpeg|png|webp)$/i)

  return (
    <div className="space-y-2">
      {isImage && (
        <img src={url} alt="document" className="max-h-48 rounded border object-contain w-full" />
      )}
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-medium">
        {isImage ? "View full image ↗" : "Open document ↗"}
      </a>
    </div>
  )
}

export default function AdminSubmissionDetailPage() {
  const searchParams = useSearchParams()
  const [submission, setSubmission] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const pk = searchParams.get("pk")
    console.log("PK from query:", pk)

    if (!pk) {
      setLoading(false)
      return
    }

    fetch(`/api/admin/submissions/detail?pk=${encodeURIComponent(pk)}`)
      .then(r => r.json())
      .then(data => {
        console.log("API response:", data)
        setSubmission(data.submission)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [searchParams])

  async function handleAction(status: "approved" | "rejected") {
    if (!submission) return
    setActionLoading(true)
    try {
      const res = await fetch(
        `/api/admin/submissions/${encodeURIComponent(submission.PK)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, sk: submission.SK }),
        }
      )
      if (res.ok) {
        setMessage(status === "approved" ? "✅ Approved!" : "❌ Rejected.")
        setSubmission(prev => prev ? { ...prev, status } : prev)
      }
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) return <p className="p-6 text-muted-foreground">Loading…</p>
  if (!submission) return <p className="p-6 text-red-500">Submission not found.</p>

  const fields = Object.entries(submission).filter(([key]) => !HIDDEN_FIELDS.includes(key))
  const regularFields = fields.filter(([key]) => !DOCUMENT_FIELDS.includes(key))
  const documentFields = fields.filter(([key]) => DOCUMENT_FIELDS.includes(key) && submission[key])

  const currentStatus = submission.status ?? "pending"
  const statusColors: Record<string, string> = {
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
  }

  return (
    <div className="p-6 max-w-4xl space-y-8">
      <div>
        <a href="/admin" className="text-sm text-muted-foreground hover:underline block mb-2">
          ← Back to submissions
        </a>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold capitalize">
            {submission.type ?? "Registration"} Details
          </h2>
          <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusColors[currentStatus] ?? statusColors.pending}`}>
            {currentStatus}
          </span>
        </div>
        {submission.createdAt && (
          <p className="text-muted-foreground text-sm mt-1">
            Submitted on {new Date(submission.createdAt).toLocaleString("en-IN")}
          </p>
        )}
      </div>

      {currentStatus === "pending" && (
        <div className="flex gap-3">
          <Button onClick={() => handleAction("approved")} disabled={actionLoading} className="bg-green-600 hover:bg-green-700 text-white">
            {actionLoading ? "Saving…" : "✓ Approve"}
          </Button>
          <Button onClick={() => handleAction("rejected")} disabled={actionLoading} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
            {actionLoading ? "Saving…" : "✕ Reject"}
          </Button>
        </div>
      )}

      {message && <p className="text-sm font-medium">{message}</p>}

      {regularFields.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Registration Details
          </h3>
          <div className="rounded-lg border divide-y">
            {regularFields.map(([key, value]) => (
              <div key={key} className="flex px-4 py-3 gap-4">
                <FieldLabel name={key} />
                <span className="text-sm font-medium">{String(value ?? "—")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {documentFields.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Submitted Documents
          </h3>
          <div className="rounded-lg border divide-y">
            {documentFields.map(([key, value]) => (
              <div key={key} className="flex px-4 py-6 gap-4">
                <FieldLabel name={key} />
                <DocumentLink s3Key={String(value)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
