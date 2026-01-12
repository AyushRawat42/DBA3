import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Calendar, User, ArrowRight } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    title: "State Junior Boxing Championship 2025 Begins",
    excerpt:
      "The highly anticipated State Junior Boxing Championship kicks off this week featuring athletes from across Uttarakhand.",
    content:
      "The State Junior Boxing Championship 2025 is set to begin with participation from over 200 young boxers. This championship is an important platform for junior athletes to showcase their skills and gain competitive experience. The event will be held at the Dehradun Sports Complex from January 15-20, 2025.",
    author: "Boxing Association",
    date: "January 12, 2025",
    category: "Championship",
    image: "bg-gradient-to-br from-primary to-secondary",
  },
  {
    id: 2,
    title: "New Anti-Doping Guidelines Released",
    excerpt:
      "The association has released updated anti-doping guidelines to ensure fair competition and athlete safety.",
    content:
      "Following international standards, the Dehradun Boxing Association has released comprehensive anti-doping guidelines for all athletes and coaches. These guidelines emphasize athlete health, fair competition, and compliance with WADA standards. All participants must acknowledge and follow these guidelines.",
    author: "Safeguarding Committee",
    date: "January 10, 2025",
    category: "Policy",
    image: "bg-gradient-to-br from-secondary to-primary",
  },
  {
    id: 3,
    title: "Elite Coaching Workshop Series Launched",
    excerpt: "International boxing coaches share advanced training techniques with local coaches and athletes.",
    content:
      "The association has launched a series of elite coaching workshops featuring international boxing experts. These sessions will cover advanced training methodologies, nutrition planning, and psychological preparation for athletes.",
    author: "Training Division",
    date: "January 8, 2025",
    category: "Training",
    image: "bg-gradient-to-br from-accent to-primary",
  },
  {
    id: 4,
    title: "Women's Boxing Initiative Expands",
    excerpt: "Growing participation in women's boxing with new training camps and dedicated programs.",
    content:
      "The Dehradun Boxing Association is proud to announce the expansion of its women's boxing initiative with new training camps, dedicated facilities, and mentorship programs to encourage more women to take up boxing.",
    author: "Community Programs",
    date: "January 5, 2025",
    category: "Community",
    image: "bg-gradient-to-br from-primary to-accent",
  },
  {
    id: 5,
    title: "Regional Qualifiers for National Games Announced",
    excerpt: "Upcoming regional qualifiers for athletes aiming to compete in the National Games.",
    content:
      "The association has announced the schedule for regional qualifiers that will determine team selection for the upcoming National Games. These qualifiers will be held across different weight categories.",
    author: "Selection Committee",
    date: "January 3, 2025",
    category: "Championship",
    image: "bg-gradient-to-br from-secondary to-accent",
  },
  {
    id: 6,
    title: "Fitness Center Upgrades Complete",
    excerpt: "Association facility improvements enhance training environment for all athletes.",
    content:
      "The Dehradun Boxing Association has completed upgrades to its main training facility, including new equipment, improved ventilation, and enhanced safety features.",
    author: "Operations Team",
    date: "December 30, 2024",
    category: "Facility",
    image: "bg-gradient-to-br from-accent to-secondary",
  },
]

export const metadata = {
  title: "News & Updates | Dehradun Boxing Association",
  description: "Latest news, updates, and announcements from Dehradun Boxing Association",
}

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-secondary text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">News & Updates</h1>
          <p className="text-white/80">Latest announcements from Dehradun Boxing Association</p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className={`${newsArticles[0].image} h-64 flex items-center justify-center`} />
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {newsArticles[0].category}
                  </span>
                  <div className="flex items-center text-muted-foreground text-sm gap-1">
                    <Calendar size={16} />
                    {newsArticles[0].date}
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-secondary mb-3">{newsArticles[0].title}</h2>
                <p className="text-muted-foreground mb-6">{newsArticles[0].content}</p>
                <button className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                  Read Full Article
                  <ArrowRight size={20} />
                </button>
              </div>
            </Card>
          </div>

          {/* Sidebar - Upcoming Events */}
          <div>
            <Card className="p-6 sticky top-20">
              <h3 className="text-xl font-bold text-secondary mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                {[
                  { date: "Jan 15-20", title: "State Junior Championship" },
                  { date: "Jan 25", title: "Regional Qualifiers Round 1" },
                  { date: "Feb 5-7", title: "Elite Training Camp" },
                  { date: "Feb 15", title: "Open Boxing Tournament" },
                ].map((event, i) => (
                  <div key={i} className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-sm font-semibold text-primary">{event.date}</p>
                    <p className="text-sm text-foreground font-medium">{event.title}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* All News Articles */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-3xl font-bold text-secondary mb-8">All Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsArticles.slice(1).map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div
                className={`${article.image} h-40 flex items-center justify-center group-hover:scale-105 transition-transform`}
              />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <User size={14} />
                    {article.author}
                  </span>
                  <ArrowRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Card>
          ))}
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
                  <a href="/safeguarding" className="hover:text-white transition">
                    Safeguarding
                  </a>
                </li>
                <li>
                  <a href="/championships" className="hover:text-white transition">
                    Results
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
