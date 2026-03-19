"use client"

import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EventAthleteRegistrationForm } from "@/components/event-athlete-registration-form"

const events = [
  {
    id: 1,
    title: "State Junior Boxing Championship",
    date: "January 15-20, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Dehradun Sports Complex, Dehradun",
    category: "Championship",
    description:
      "Premier junior boxing championship featuring athletes from across Uttarakhand in all weight categories.",
    participants: "200+ Athletes",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Regional Qualifiers Round 1",
    date: "January 25, 2025",
    time: "8:00 AM - 5:00 PM",
    location: "DBA Training Center, Dehradun",
    category: "Qualifier",
    description: "First round of regional qualifiers for National Games team selection.",
    participants: "120+ Athletes",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Elite Coaching Workshop",
    date: "February 5-7, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "DBA Training Center, Dehradun",
    category: "Workshop",
    description:
      "Three-day intensive coaching workshop with international boxing experts covering advanced techniques.",
    participants: "50 Coaches & Athletes",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Women's Boxing Championship",
    date: "February 15-17, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Dehradun Sports Complex, Dehradun",
    category: "Championship",
    description:
      "Dedicated championship for women boxers across all age categories and weight classes.",
    participants: "100+ Athletes",
    status: "upcoming",
  },
  {
    id: 5,
    title: "Open Boxing Tournament",
    date: "March 1-2, 2025",
    time: "10:00 AM - 8:00 PM",
    location: "DBA Training Center, Dehradun",
    category: "Tournament",
    description:
      "Open tournament welcoming boxers from across the region of all skill levels.",
    participants: "150+ Participants",
    status: "upcoming",
  },
  {
    id: 6,
    title: "Beginner Boxing Workshop",
    date: "March 15, 2025",
    time: "4:00 PM - 6:00 PM",
    location: "DBA Training Center, Dehradun",
    category: "Training",
    description: "Free introductory workshop for anyone interested in learning boxing basics.",
    participants: "Unlimited",
    status: "upcoming",
  },
]

const BASE_EVENT_FEE = 1000 // X (change anytime)

export function EventsClient() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const upcomingRegistrationEventDateISO = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 48) // 45–50 days window
    return d.toISOString().slice(0, 10) // YYYY-MM-DD
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-secondary text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Events & Calendar</h1>
          <p className="text-white/80">
            Boxing tournaments, championships, and training events
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Events */}
          <div className="lg:col-span-3 space-y-6">
            {events.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="md:flex h-full">
                  {/* Date Badge */}
                  <div className="bg-linear-to-br from-primary to-secondary text-white p-6 md:w-32 flex flex-col justify-center items-center text-center">
                    <p className="text-sm font-semibold uppercase">
                      {event.date.split("-")[0].trim().substring(0, 3)}
                    </p>
                    <p className="text-3xl font-bold">{event.date.split(" ")[1]}</p>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded text-xs font-semibold">
                            {event.category}
                          </span>
                          {event.status === "upcoming" && (
                            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-semibold">
                              Upcoming
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-secondary mb-3">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {event.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-foreground">
                            <Clock size={16} className="text-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-foreground">
                            <MapPin size={16} className="text-primary" />
                            <span className="truncate">
                              {event.location.split(",")[0]}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-foreground">
                            <Users size={16} className="text-primary" />
                            <span>{event.participants}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="bg-muted/50 p-6 flex items-center justify-center border-t md:border-t-0 md:border-l md:border-border">
                    <Button onClick={() => setIsDialogOpen(true)}>Register</Button>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Event Registration</DialogTitle>
                        </DialogHeader>

                        <EventAthleteRegistrationForm
                          eventTitle="DBA Open Sparring Trials"
                          eventDateISO={upcomingRegistrationEventDateISO}
                          baseFee={BASE_EVENT_FEE}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Filters */}
            <Card className="p-6">
              <h3 className="font-bold text-secondary mb-4">Filter by Category</h3>
              <div className="space-y-3">
                {["Championship", "Tournament", "Workshop", "Training", "Qualifier"].map(
                  (cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                      />
                      <span className="text-sm text-foreground">{cat}</span>
                    </label>
                  )
                )}
              </div>
            </Card>

            {/* Quick Facts */}
            <Card className="p-6">
              <h3 className="font-bold text-secondary mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-3">
                  <p className="text-2xl font-bold text-primary">6</p>
                  <p className="text-xs text-muted-foreground">Upcoming Events</p>
                </div>
                <div className="border-l-4 border-secondary pl-3">
                  <p className="text-2xl font-bold text-secondary">720+</p>
                  <p className="text-xs text-muted-foreground">Expected Participants</p>
                </div>
                <div className="border-l-4 border-accent pl-3">
                  <p className="text-2xl font-bold text-accent">Feb-Mar</p>
                  <p className="text-xs text-muted-foreground">Peak Season</p>
                </div>
              </div>
            </Card>

            {/* Info Card */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h4 className="font-bold text-secondary mb-2 text-sm">Need Help?</h4>
              <p className="text-xs text-muted-foreground mb-4">
                Contact us for registration support or event inquiries
              </p>
              <a href="/contact" className="text-primary font-semibold text-sm hover:underline">
                Get in Touch
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer (note: you may want to move this to a shared Footer later) */}
      <footer className="bg-foreground text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Dehradun Boxing</h3>
              <p className="text-white/70 text-sm">
                Official boxing association of Dehradun, Uttarakhand
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/register" className="hover:text-white transition">Register</a></li>
                <li><a href="/news" className="hover:text-white transition">News</a></li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/downloads" className="hover:text-white transition">Downloads</a></li>
                <li><a href="/safeguarding" className="hover:text-white transition">Safeguarding</a></li>
                <li><a href="/championships" className="hover:text-white transition">Results</a></li>
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
