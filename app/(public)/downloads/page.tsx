
import { Card } from "@/components/ui/card"
import { FileText, Download, FileCode, BookOpen, Eye } from "lucide-react"

const documents = [
  {
    category: "Forms & Applications",
    icon: FileText,
    docs: [
      {
        id: 1,
        title: "Athlete Registration Form",
        description: "Official registration form for new athletes",
        format: "PDF",
        size: "245 KB",
        year: 2025,
      },
      {
        id: 2,
        title: "Membership Application",
        description: "Association membership application form",
        format: "PDF",
        size: "156 KB",
        year: 2025,
      },
      {
        id: 3,
        title: "Coach Certification Form",
        description: "Form for coaching certification and renewal",
        format: "PDF",
        size: "320 KB",
        year: 2024,
      },
      {
        id: 4,
        title: "Medical Clearance Form",
        description: "Medical clearance certificate for participation",
        format: "PDF",
        size: "198 KB",
        year: 2025,
      },
    ],
  },
  {
    category: "Rules & Regulations",
    icon: BookOpen,
    docs: [
      {
        id: 5,
        title: "Association Constitution",
        description: "Official constitution and bylaws of DBA",
        format: "PDF",
        size: "512 KB",
        year: 2024,
      },
      {
        id: 6,
        title: "Boxing Competition Rules",
        description: "Rules and regulations for boxing competitions",
        format: "PDF",
        size: "445 KB",
        year: 2024,
      },
      {
        id: 7,
        title: "Weight Categories & Classification",
        description: "Official weight classes and athlete categories",
        format: "PDF",
        size: "278 KB",
        year: 2024,
      },
      {
        id: 8,
        title: "Judging & Scoring Guidelines",
        description: "Criteria and guidelines for match judging",
        format: "PDF",
        size: "389 KB",
        year: 2024,
      },
    ],
  },
  {
    category: "Safeguarding & Policies",
    icon: FileCode,
    docs: [
      {
        id: 9,
        title: "Anti-Doping Policy",
        description: "Anti-doping regulations and prohibited substances",
        format: "PDF",
        size: "423 KB",
        year: 2025,
      },
      {
        id: 10,
        title: "Safeguarding Policy",
        description: "Athlete welfare and safeguarding procedures",
        format: "PDF",
        size: "356 KB",
        year: 2025,
      },
      {
        id: 11,
        title: "Code of Conduct",
        description: "Code of conduct for athletes, coaches and officials",
        format: "PDF",
        size: "267 KB",
        year: 2024,
      },
      {
        id: 12,
        title: "Disciplinary Procedures",
        description: "Guidelines for handling disciplinary cases",
        format: "PDF",
        size: "334 KB",
        year: 2024,
      },
    ],
  },
  {
    category: "Training & Development",
    icon: BookOpen,
    docs: [
      {
        id: 13,
        title: "Coaching Manual",
        description: "Comprehensive guide for coaching standards",
        format: "PDF",
        size: "567 KB",
        year: 2024,
      },
      {
        id: 14,
        title: "Training Program Guidelines",
        description: "Recommendations for athlete training programs",
        format: "PDF",
        size: "412 KB",
        year: 2024,
      },
      {
        id: 15,
        title: "Nutrition Guide for Boxers",
        description: "Nutritional guidelines and weight management",
        format: "PDF",
        size: "298 KB",
        year: 2024,
      },
      {
        id: 16,
        title: "Sport Psychology Resource",
        description: "Mental preparation and psychological training",
        format: "PDF",
        size: "445 KB",
        year: 2024,
      },
    ],
  },
]

export const metadata = {
  title: "Downloads | Dehradun Boxing Association",
  description: "Download forms, rules, policies, and training resources from Dehradun Boxing Association",
}

export default function DownloadsPage() {
  return (
    <main className="min-h-screen bg-background">
      

      {/* Page Header */}
      <section className="bg-secondary text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Downloads & Resources</h1>
          <p className="text-white/80">Official forms, rules, policies, and training materials</p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search documents..."
            className="flex-1 px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select className="px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-background">
            <option value="">All Years</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </section>

      {/* Documents by Category */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-12">
          {documents.map((categoryGroup, idx) => {
            const Icon = categoryGroup.icon
            return (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-secondary">{categoryGroup.category}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryGroup.docs.map((doc) => (
                    <Card key={doc.id} className="p-6 hover:shadow-lg hover:border-primary/50 transition-all group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-secondary group-hover:text-primary transition-colors">
                              {doc.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">{doc.size}</p>
                          </div>
                        </div>
                        <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold">
                          {doc.format}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{doc.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xs text-muted-foreground">{doc.year}</span>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-muted rounded transition-colors" title="Preview">
                            <Eye size={16} className="text-muted-foreground hover:text-primary" />
                          </button>
                          <button className="p-2 hover:bg-muted rounded transition-colors" title="Download">
                            <Download size={16} className="text-primary hover:text-primary/80" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-12 mb-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-3">Can't Find What You're Looking For?</h2>
          <p className="text-white/80 mb-6">
            Contact our administrative team for access to additional documents or clarification on policies
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary hover:bg-accent font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Get in Touch
          </a>
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
                  <a href="/news" className="hover:text-white transition">
                    News
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
