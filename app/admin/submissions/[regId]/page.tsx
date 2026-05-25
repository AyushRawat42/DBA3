"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type Submission = Record<string, unknown> & {
  id: string
  formType: "sports" | "coaching"
  createdAt: string
  status: "New" | "Contacted" | "Qualified" | "Closed"
  notes?: string
}

const statuses = ["New", "Contacted", "Qualified", "Closed"] as const
const hiddenFields = new Set(["PK", "SK", "id", "updatedAt"])

export default function AdminSubmissionDetailPage() {
  const params = useParams()
  const id = String(params.regId)
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch(`/api/admin/submissions/detail?id=${encodeURIComponent(id)}`)
        const data = await res.json()
        setSubmission(data.submission)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  async function save(updates: Partial<Pick<Submission, "status" | "notes">>) {
    if (!submission) return

    setSaving(true)
    setMessage(null)

    try {
      const res = await fetch(`/api/admin/submissions/${encodeURIComponent(submission.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      if (!res.ok) throw new Error("Failed to save")
      const data = await res.json()
      setSubmission(data.submission)
      setMessage("Saved")
    } catch {
      setMessage("Could not save changes")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="p-6 text-sm text-muted-foreground">Loading submission...</p>
  }

  if (!submission) {
    return <p className="p-6 text-sm text-destructive">Submission not found.</p>
  }

  const fields = Object.entries(submission).filter(([key]) => !hiddenFields.has(key))

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
          Back to admissions
        </Link>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              {String(submission.studentFullName ?? "Admission submission")}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {submission.formType} submission from {new Date(submission.createdAt).toLocaleString("en-IN")}
            </p>
          </div>
          <select
            value={submission.status}
            onChange={(event) => save({ status: event.target.value as Submission["status"] })}
            disabled={saving}
            className="h-9 rounded-md border bg-transparent px-3 text-sm"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <section className="rounded-lg border bg-background">
        <div className="border-b px-4 py-3">
          <h2 className="font-semibold">Submitted fields</h2>
        </div>
        <div className="divide-y">
          {fields.map(([key, value]) => (
            <div key={key} className="grid gap-1 px-4 py-3 sm:grid-cols-[220px_1fr] sm:gap-4">
              <span className="text-sm font-medium text-muted-foreground">{formatLabel(key)}</span>
              <span className="text-sm">{formatValue(value)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-lg border bg-background p-4">
        <h2 className="font-semibold">Internal notes</h2>
        <Textarea
          value={String(submission.notes ?? "")}
          onChange={(event) => setSubmission((current) => current ? { ...current, notes: event.target.value } : current)}
          rows={6}
          placeholder="Add call notes, next steps, or admissions context."
        />
        <div className="flex items-center gap-3">
          <Button onClick={() => save({ notes: String(submission.notes ?? "") })} disabled={saving}>
            {saving ? "Saving..." : "Save notes"}
          </Button>
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </div>
      </section>
    </div>
  )
}

function formatLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase())
}

function formatValue(value: unknown) {
  if (typeof value === "boolean") return value ? "Yes" : "No"
  if (value == null || value === "") return "-"
  return String(value)
}
