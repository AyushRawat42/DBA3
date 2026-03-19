"use client"

import { useEffect, useState } from "react"

type Submission = Record<string, any>

const TYPE_COLORS: Record<string, string> = {
  athlete: "bg-blue-100 text-blue-700",
  coach: "bg-green-100 text-green-700",
  academy: "bg-purple-100 text-purple-700",
  unknown: "bg-gray-100 text-gray-600",
}

function getName(s: Submission): string {
  if (s.academyName) return s.academyName
  if (s.firstName || s.lastName) return `${s.firstName ?? ""} ${s.lastName ?? ""}`.trim()
  return "—"
}

function getType(s: Submission): string {
  return s.type ?? s.registrationType ?? s.regType ?? "unknown"
}

function getId(s: Submission, index: number): string {
  return s.PK ?? s.SK ?? s.id ?? String(index)
}

export default function AdminHomePage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/submissions")
        if (!res.ok) throw new Error("Failed to load")
        const data = await res.json()
        console.log("First record:", JSON.stringify(data.submissions?.[0], null, 2))
        setSubmissions(data.submissions ?? [])
      } catch (e) {
        setError("Could not load submissions. Check AWS connection.")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const allTypes = ["all", ...Array.from(new Set(submissions.map(getType)))]

  const filtered = activeTab === "all"
    ? submissions
    : submissions.filter(s => getType(s) === activeTab)

  const counts: Record<string, number> = { all: submissions.length }
  submissions.forEach(s => {
    const t = getType(s)
    counts[t] = (counts[t] ?? 0) + 1
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Registrations</h2>
        <p className="text-muted-foreground text-sm mt-1">
          All submissions from athletes, coaches and academies
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {allTypes.map(tab => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer rounded-lg border p-4 transition-colors ${
              activeTab === tab ? "border-primary bg-primary/5" : "hover:bg-muted/50"
            }`}
          >
            <p className="text-sm text-muted-foreground capitalize">{tab}</p>
            <p className="text-2xl font-bold mt-1">{counts[tab] ?? 0}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-muted-foreground text-sm">Loading submissions…</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm">No submissions found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Type</th>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Phone</th>
                <th className="text-left px-4 py-3 font-medium">Submitted</th>
                <th className="text-left px-4 py-3 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, index) => {
                const type = getType(s)
                const id = getId(s, index)
                console.log("Submission PK:", s.PK, "| getId:", id) 
                return (
                  <tr key={`${id}-${index}`} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${TYPE_COLORS[type] ?? TYPE_COLORS.unknown}`}>
                        {type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">{getName(s)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.email ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.phone ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {s.createdAt
                        ? new Date(s.createdAt).toLocaleString("en-IN", {
                            day: "numeric", month: "short", year: "numeric",
                            hour: "2-digit", minute: "2-digit",
                          })
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <a
                       href={`/admin/submissions/detail?pk=${encodeURIComponent(s.PK ?? String(index))}`}
                        onClick={() => console.log("Clicking with PK:", s.PK)}
                        className="text-primary hover:underline text-xs font-medium"
                      >
                        View →
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
