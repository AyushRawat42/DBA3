
import { Hero } from "@/components/hero"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Trophy, Users, FileText, Shield, Mail, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Athlete Registration",
    description: "Simple and secure registration for all age categories and weight classes",
    href: "/register",
    color: "text-primary",
  },
  {
    icon: Calendar,
    title: "Events & Calendar",
    description: "View upcoming boxing tournaments, training camps, and competitions",
    href: "/events",
    color: "text-secondary",
  },
  {
    icon: Trophy,
    title: "Championships",
    description: "Track results from state and national championship bouts",
    href: "/championships",
    color: "text-primary",
  },
  {
    icon: FileText,
    title: "Downloads",
    description: "Access official forms, rules, and regulatory documentation",
    href: "/downloads",
    color: "text-secondary",
  },
  {
    icon: Shield,
    title: "Safeguarding",
    description: "Anti-doping policies and athlete welfare information",
    href: "/safeguarding",
    color: "text-primary",
  },
  {
    icon: Mail,
    title: "Contact Us",
    description: "Get in touch with the association for inquiries and support",
    href: "/contact",
    color: "text-secondary",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      
      <Hero />

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">Everything You Need</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete platform for athlete management, event coordination, and boxing association operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.href} href={feature.href}>
                <Card className="h-full p-6 hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer group">
                  <div className="mb-4">
                    <Icon className={`${feature.color} w-10 h-10`} />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight size={16} className="ml-2" />
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* News Preview Section */}
      <section className="bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-2">Latest News & Updates</h2>
              <p className="text-muted-foreground">Stay informed with recent boxing association updates</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/news">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-br from-primary to-secondary h-40 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Calendar size={48} className="mx-auto mb-2" />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">January {24 + i}, 2025</p>
                  <h3 className="text-lg font-bold text-secondary mb-2">Championship Update {i}</h3>
                  <p className="text-muted-foreground text-sm">
                    Latest updates from ongoing boxing tournaments and athlete achievements
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary text-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Join the Ring?</h2>
          <p className="text-lg text-white/80 mb-8">
            Register today and become part of Dehradun's premier boxing community
          </p>
          <Button asChild size="lg" className="bg-accent text-secondary hover:bg-amber-400 font-semibold">
            <Link href="/register">Get Started</Link>
          </Button>
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
                  <Link href="/events" className="hover:text-white transition">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-white transition">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link href="/downloads" className="hover:text-white transition">
                    Downloads
                  </Link>
                </li>
                <li>
                  <Link href="/safeguarding" className="hover:text-white transition">
                    Safeguarding
                  </Link>
                </li>
                <li>
                  <Link href="/championships" className="hover:text-white transition">
                    Results
                  </Link>
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
