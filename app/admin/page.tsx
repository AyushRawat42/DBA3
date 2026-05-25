"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Submission = {
  id: string
  formType: "sports" | "coaching"
  createdAt: string
  status: "New" | "Contacted" | "Qualified" | "Closed"
  studentFullName?: string
  parentGuardianName?: string
  mobile?: string
  email?: string
  city?: string
  sportInterestedIn?: string
  courseInterestedIn?: string
}

const statuses = ["all", "New", "Contacted", "Qualified", "Closed"] as const
const formTypes = ["all", "sports", "coaching"] as const

export default function AdminHomePage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formType, setFormType] = useState<(typeof formTypes)[number]>("all")
  const [status, setStatus] = useState<(typeof statuses)[number]>("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const query = useMemo(() => {
    const params = new URLSearchParams()
    if (formType !== "all") params.set("formType", formType)
    if (status !== "all") params.set("status", status)
    if (dateFrom) params.set("dateFrom", dateFrom)
    if (dateTo) params.set("dateTo", dateTo)
    return params.toString()
  }, [dateFrom, dateTo, formType, status])

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/admin/submissions${query ? `?${query}` : ""}`)
        if (!res.ok) throw new Error("Failed to load")
        const data = await res.json()
        setSubmissions(data.submissions ?? [])
      } catch {
        setError("Could not load submissions. Check the DynamoDB configuration.")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [query])

  const exportHref = `/api/admin/submissions?${new URLSearchParams({
    ...(formType !== "all" ? { formType } : {}),
    ...(status !== "all" ? { status } : {}),
    ...(dateFrom ? { dateFrom } : {}),
    ...(dateTo ? { dateTo } : {}),
    export: "csv",
  }).toString()}`

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admissions</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage Aspire Sports Academy and Aspire Defence Academy enquiries.
          </p>
        </div>
        <Button asChild variant="outline">
          <a href={exportHref}>Export CSV</a>
        </Button>
      </div>

      <div className="grid gap-4 rounded-lg border bg-background p-4 md:grid-cols-4">
        <label className="space-y-2 text-sm">
          <span className="font-medium">Form type</span>
          <select
            value={formType}
            onChange={(event) => setFormType(event.target.value as (typeof formTypes)[number])}
            className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
          >
            {formTypes.map((value) => (
              <option key={value} value={value}>
                {value === "all" ? "All" : value[0].toUpperCase() + value.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium">Status</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as (typeof statuses)[number])}
            className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
          >
            {statuses.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium">From</span>
          <Input type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium">To</span>
          <Input type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} />
        </label>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-background">
        {loading ? (
          <p className="p-6 text-sm text-muted-foreground">Loading submissions...</p>
        ) : error ? (
          <p className="p-6 text-sm text-destructive">{error}</p>
        ) : submissions.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No submissions found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Student</th>
                <th className="px-4 py-3 text-left font-medium">Form</th>
                <th className="px-4 py-3 text-left font-medium">Interest</th>
                <th className="px-4 py-3 text-left font-medium">Contact</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Submitted</th>
                <th className="px-4 py-3 text-left font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id} className="border-t">
                  <td className="px-4 py-3">
                    <p className="font-medium">{submission.studentFullName ?? "Unnamed"}</p>
                    <p className="text-xs text-muted-foreground">{submission.parentGuardianName}</p>
                  </td>
                  <td className="px-4 py-3 capitalize">{submission.formType}</td>
                  <td className="px-4 py-3">
                    {submission.sportInterestedIn ?? submission.courseInterestedIn ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    <p>{submission.mobile ?? "-"}</p>
                    <p className="text-xs text-muted-foreground">{submission.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                      {submission.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(submission.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/submissions/${submission.id}`} className="font-medium text-primary hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
