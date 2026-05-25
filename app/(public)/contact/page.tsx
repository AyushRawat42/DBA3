"use client"

import type React from "react"

import { useState } from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary text-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Contact Aspire Academy</h1>
          <p className="mt-3 max-w-2xl text-base text-white/85">
            Reach our admissions team for sports and defence coaching inquiries, campus visits, and partnership questions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-secondary">Contact Details</h2>
            <p className="mt-4 text-muted-foreground">
              For admissions, training schedules, or quick queries, our team is available by phone, email, and WhatsApp.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-semibold text-secondary">Address</p>
                  <p className="text-sm text-muted-foreground">Chanderbani Mohbewala, Dehradun</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-semibold text-secondary">Phone</p>
                  <p className="text-sm text-muted-foreground">+91-8250309184</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-semibold text-secondary">Email</p>
                  <p className="text-sm text-muted-foreground">admissions@aspireacademy.in</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="font-semibold text-secondary">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">+91-8250309184</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-secondary">Send a message</h2>
            {submitted ? (
              <div className="mt-8 rounded-3xl border border-primary/20 bg-primary/5 p-6 text-center">
                <p className="text-lg font-semibold text-secondary">Message sent!</p>
                <p className="mt-2 text-sm text-muted-foreground">We will get back to you soon with the next steps.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-secondary">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-lg border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-ring/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-lg border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-ring/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us what you'd like to learn more about."
                    className="mt-2 w-full rounded-lg border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-ring/50"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
                  Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>
    </main>
  )
}
