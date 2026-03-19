
import { Card } from "@/components/ui/card"
import { Shield, AlertCircle, Heart, Users, CheckCircle2, Phone } from "lucide-react"

const safeguardingTopics = [
  {
    id: 1,
    icon: Shield,
    title: "Child Safeguarding",
    description:
      "Protection measures and guidelines for young athletes under 18 years of age, including training supervision and duty of care standards.",
    points: [
      "Supervised training environment",
      "Background checks for coaches",
      "Clear reporting procedures",
      "Regular welfare checks",
      "Parental involvement",
    ],
  },
  {
    id: 2,
    icon: Heart,
    title: "Athlete Welfare",
    description:
      "Comprehensive support systems ensuring physical and mental well-being of all athletes throughout their boxing journey.",
    points: [
      "Medical clearance requirements",
      "Injury prevention programs",
      "Mental health support",
      "Nutrition guidance",
      "Recovery protocols",
    ],
  },
  {
    id: 3,
    icon: AlertCircle,
    title: "Anti-Doping Policy",
    description:
      "Strict adherence to international anti-doping standards ensuring fair competition and athlete health protection.",
    points: [
      "Prohibited substance list",
      "Testing procedures",
      "Whereabouts requirements",
      "Therapeutic exemptions",
      "Consequences & appeals",
    ],
  },
  {
    id: 4,
    icon: Users,
    title: "Code of Conduct",
    description:
      "Ethical standards for athletes, coaches, officials, and all association members to maintain integrity and respect.",
    points: [
      "Respect & dignity",
      "Fair play commitment",
      "Professional behavior",
      "Conflict resolution",
      "Anti-harassment policy",
    ],
  },
]

const procedures = [
  {
    title: "Reporting a Concern",
    steps: [
      "Contact safeguarding officer immediately",
      "Document details of the incident",
      "Provide contact information",
      "Await acknowledgment of report",
      "Participate in review process",
    ],
  },
  {
    title: "Investigation Process",
    steps: [
      "Safeguarding team receives report",
      "Initial assessment conducted",
      "Formal investigation initiated if needed",
      "Evidence gathering & interviews",
      "Findings & recommendations issued",
    ],
  },
  {
    title: "Support Available",
    steps: [
      "Confidential counseling services",
      "Legal guidance if needed",
      "Medical referrals & support",
      "Coaching through processes",
      "Follow-up welfare checks",
    ],
  },
]

const contacts = [
  {
    role: "Safeguarding Officer",
    name: "Dr. Rajesh Kumar",
    email: "safeguarding@dehradunboxing.org",
    phone: "+91 98765 43210",
    available: "24/7",
  },
  {
    role: "Anti-Doping Officer",
    name: "Ms. Priya Singh",
    email: "antidoping@dehradunboxing.org",
    phone: "+91 97654 32109",
    available: "Weekdays 9-6 PM",
  },
  {
    role: "Welfare Coordinator",
    name: "Vikram Sharma",
    email: "welfare@dehradunboxing.org",
    phone: "+91 96543 21098",
    available: "Weekdays 10-5 PM",
  },
]

export const metadata = {
  title: "Safeguarding & Anti-Doping | Dehradun Boxing Association",
  description:
    "Safeguarding policies, anti-doping regulations, and athlete welfare programs for Dehradun Boxing Association",
}

export default function SafeguardingPage() {
  return (
    <main className="min-h-screen bg-background">
      

      {/* Page Header */}
      <section className="bg-secondary text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Safeguarding & Anti-Doping</h1>
          <p className="text-white/80">Protecting athlete welfare and integrity in boxing</p>
        </div>
      </section>

      {/* Key Areas */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safeguardingTopics.map((topic) => {
            const Icon = topic.icon
            return (
              <Card key={topic.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-secondary">{topic.title}</h3>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4">{topic.description}</p>

                <div className="space-y-2">
                  {topic.points.map((point, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                      <span className="text-foreground">{point}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Procedures Section */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary mb-12">Key Procedures</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {procedures.map((proc, i) => (
              <Card key={i} className="p-6">
                <h3 className="text-lg font-bold text-secondary mb-6">{proc.title}</h3>
                <div className="space-y-4">
                  {proc.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white text-sm font-bold">
                          {idx + 1}
                        </div>
                      </div>
                      <p className="text-sm text-foreground pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Officers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-secondary mb-8">Contact Our Officers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contacts.map((contact, i) => (
            <Card key={i} className="p-6 border-t-4 border-primary">
              <div className="mb-4">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">{contact.role}</p>
                <h3 className="text-lg font-bold text-secondary mt-1">{contact.name}</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-primary flex-shrink-0" />
                  <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                    {contact.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary flex-shrink-0 mt-1">@</span>
                  <a href={`mailto:${contact.email}`} className="text-primary hover:underline break-all">
                    {contact.email}
                  </a>
                </div>
                <div className="text-muted-foreground">
                  <p className="text-xs">Available:</p>
                  <p className="font-semibold">{contact.available}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Important Notice */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">Confidential Reporting</h3>
              <p className="text-white/90 mb-4">
                All safeguarding concerns are treated with the utmost confidentiality. Reports are investigated
                thoroughly and action taken to protect the welfare of all athletes. You can report concerns without fear
                of retaliation.
              </p>
              <a
                href="/contact"
                className="inline-block bg-white text-primary hover:bg-accent font-semibold px-4 py-2 rounded transition-colors"
              >
                Report a Concern
              </a>
            </div>
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
                  <a href="/contact" className="hover:text-white transition">
                    Contact
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
                  <a href="/news" className="hover:text-white transition">
                    News
                  </a>
                </li>
                <li>
                  <a href="/championships" className="hover:text-white transition">
                    Championships
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
