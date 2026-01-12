"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react"

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
    // In a real app, this would send to a backend
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
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-secondary text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-white/80">Get in touch with Dehradun Boxing Association</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: MapPin,
              title: "Address",
              info: "Dehradun Sports Complex\nRajpur Road, Dehradun\nUttarakhand 248001, India",
            },
            {
              icon: Phone,
              title: "Phone",
              info: "+91 (0) 135 XXXX XXXX\n+91 98765 43210\n(Available 9 AM - 6 PM)",
            },
            {
              icon: Mail,
              title: "Email",
              info: "info@dehradunboxing.org\nsupport@dehradunboxing.org\nevents@dehradunboxing.org",
            },
            {
              icon: Clock,
              title: "Office Hours",
              info: "Monday - Friday: 9 AM - 6 PM\nSaturday: 10 AM - 4 PM\nSunday: Closed",
            },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-shadow">
                <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-secondary mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{item.info}</p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-secondary mb-6">Send us a Message</h2>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-secondary mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="registration">Registration Inquiry</option>
                      <option value="events">Events & Calendar</option>
                      <option value="coaching">Coaching Programs</option>
                      <option value="sponsorship">Sponsorship</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      rows={5}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Departments */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-secondary mb-4">Departments</h3>
              <div className="space-y-4">
                {[
                  {
                    dept: "Athlete Registration",
                    email: "register@dehradunboxing.org",
                    contact: "+91 9876 543 210",
                  },
                  {
                    dept: "Events & Competitions",
                    email: "events@dehradunboxing.org",
                    contact: "+91 9876 543 211",
                  },
                  {
                    dept: "Coaching & Training",
                    email: "coaching@dehradunboxing.org",
                    contact: "+91 9876 543 212",
                  },
                  {
                    dept: "Safeguarding & Welfare",
                    email: "safeguarding@dehradunboxing.org",
                    contact: "+91 9876 543 213",
                  },
                ].map((dept, i) => (
                  <div key={i} className="border-l-4 border-primary pl-4 py-2">
                    <p className="font-semibold text-secondary text-sm">{dept.dept}</p>
                    <a href={`mailto:${dept.email}`} className="text-xs text-primary hover:underline">
                      {dept.email}
                    </a>
                    <br />
                    <a href={`tel:${dept.contact}`} className="text-xs text-primary hover:underline">
                      {dept.contact}
                    </a>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h4 className="font-bold text-secondary mb-3">Emergency Contact</h4>
              <p className="text-sm text-muted-foreground mb-3">For safeguarding emergencies or urgent matters:</p>
              <p className="text-lg font-bold text-primary">+91 98765 XXXXX</p>
              <p className="text-xs text-muted-foreground mt-2">Available 24/7</p>
            </Card>

            <Card className="p-6">
              <h4 className="font-bold text-secondary mb-3">Social Media</h4>
              <div className="flex gap-3">
                {["Facebook", "Twitter", "Instagram", "YouTube"].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="px-3 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary/90 transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Affiliated Organizations */}
      <section className="bg-muted/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-secondary mb-8 text-center">Affiliated With</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Boxing Federation of India", type: "National" },
              { name: "Uttarakhand State Sports Authority", type: "State" },
              { name: "Asian Amateur Boxing Confederation", type: "International" },
              { name: "Olympic Committee of India", type: "International" },
            ].map((org, i) => (
              <Card key={i} className="p-4 text-center hover:shadow-lg transition-shadow">
                <p className="font-semibold text-secondary text-sm">{org.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{org.type}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Dehradun Boxing</h3>
              <p className="text-white/70 text-sm">Official boxing association of Dehradun, Uttarakhand</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a href="/register" className="hover:text-white transition">
                    Register
                  </a>
                </li>
                <li>
                  <a href="/events" className="hover:text-white transition">
                    Events
                  </a>
                </li>
                <li>
                  <a href="/news" className="hover:text-white transition">
                    News
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a href="/downloads" className="hover:text-white transition">
                    Downloads
                  </a>
                </li>
                <li>
                  <a href="/championships" className="hover:text-white transition">
                    Championships
                  </a>
                </li>
                <li>
                  <a href="/safeguarding" className="hover:text-white transition">
                    Safeguarding
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-white/70 text-sm">
                Email: info@dehradunboxing.org
                <br />
                Phone: +91 (0) 135 XXXX XXXX
                <br />
                Dehradun, Uttarakhand
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-white/60 text-sm">
              © 2025 Dehradun Boxing Association. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
