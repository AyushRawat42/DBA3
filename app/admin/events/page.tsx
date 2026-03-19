"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Event = {
  id: string
  PK: string
  title: string
  date: string
  location: string
  description: string
  category: string
}

const EMPTY_FORM = {
  title: "",
  date: "",
  location: "",
  description: "",
  category: "General",
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/events")
      const data = await res.json()
      setEvents(data.events ?? [])
    } finally {
      setLoading(false)
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setForm(EMPTY_FORM)
        setMessage("✅ Event added successfully!")
        await fetchEvents()
      } else {
        setMessage("❌ Failed to add event.")
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" })
      if (res.ok) {
        setEvents(prev => prev.filter(e => e.id !== id))
      }
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="p-6 max-w-4xl space-y-10">
      <div>
        <h2 className="text-2xl font-semibold">Manage Events</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Add or remove upcoming events shown on the public events page
        </p>
      </div>

      {/* Add Event Form */}
      <div className="rounded-lg border p-6 space-y-4">
        <h3 className="text-base font-semibold">Add New Event</h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                placeholder="e.g. State Boxing Championship 2026"
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g. Dehradun Sports Complex"
                value={form.location}
                onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g. Championship, Training, Trial"
                value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Brief description of the event (optional)"
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            />
          </div>
          {message && <p className="text-sm">{message}</p>}
          <Button type="submit" disabled={saving}>
            {saving ? "Adding…" : "+ Add Event"}
          </Button>
        </form>
      </div>

      {/* Events List */}
      <div>
        <h3 className="text-base font-semibold mb-3">
          Upcoming Events ({events.length})
        </h3>
        {loading ? (
          <p className="text-muted-foreground text-sm">Loading events…</p>
        ) : events.length === 0 ? (
          <p className="text-muted-foreground text-sm">No events added yet.</p>
        ) : (
          <div className="rounded-lg border divide-y">
            {events.map(event => (
              <div key={event.id} className="flex items-start justify-between px-4 py-4 gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm">{event.title}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {event.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    📅 {new Date(event.date).toLocaleDateString("en-IN", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
                    &nbsp;&nbsp;📍 {event.location}
                  </p>
                  {event.description && (
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(event.id)}
                  disabled={deleting === event.id}
                  className="text-red-600 border-red-200 hover:bg-red-50 shrink-0"
                >
                  {deleting === event.id ? "Deleting…" : "Delete"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
