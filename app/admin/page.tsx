"use client"

import { useEffect, useState } from "react"

type Submission = {
  id: string
  type: "athlete" | "coach" | "academy"
  createdAt: string
  firstName?: string
  lastName?: string
  academyName?: string
  ownerName?: string
  email: string
  phone: string
}

export default function AdminHomePage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"all" | "athlete" | "coach" | "academy">("all")

  useEffect(() => {
    async function load() {
      try {
        const [a, c, ac] = await Promise.all([
          fetch("/api/submissions/athlete").then(r => r.json()),
          fetch("/api/submissions/coach").then(r => r.json()),
          fetch("/api/submissions/academy").then(r => r.json()),
        ])
        setSubmissions([
          ...(a.submissions ?? []),
          ...(c.submissions ?? []),
          ...(ac.submissions ?? []),
        ])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = activeTab === "all"
    ? submissions
    : submissions.filter(s => s.type === activeTab)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Registrations</h2>
        <p className="text-muted-foreground text-sm mt-1">
          All submitted registration forms
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2">
        {(["all", "athlete", "coach", "academy"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-muted-foreground text-sm">Loading submissions…</p>
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
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 capitalize font-medium">{s.type}</td>
                  <td className="px-4 py-3">
                    {s.type === "academy"
                      ? s.academyName
                      : `${s.firstName ?? ""} ${s.lastName ?? ""}`.trim()}
                  </td>
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="px-4 py-3">{s.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(s.createdAt).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
