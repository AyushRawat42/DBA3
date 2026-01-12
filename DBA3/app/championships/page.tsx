import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Users } from "lucide-react"

const championships = [
  {
    id: 1,
    name: "State Senior Championship 2024",
    year: 2024,
    date: "December 15-20, 2024",
    status: "completed",
    totalAthletes: 180,
    featured: true,
  },
  {
    id: 2,
    name: "State Junior Championship 2024",
    year: 2024,
    date: "November 10-15, 2024",
    status: "completed",
    totalAthletes: 220,
    featured: false,
  },
  {
    id: 3,
    name: "Regional Qualifiers 2024",
    year: 2024,
    date: "October 5-7, 2024",
    status: "completed",
    totalAthletes: 150,
    featured: false,
  },
  {
    id: 4,
    name: "Women's Championship 2024",
    year: 2024,
    date: "September 20-22, 2024",
    status: "completed",
    totalAthletes: 95,
    featured: false,
  },
]

const medalists = [
  {
    id: 1,
    name: "Rajesh Kumar",
    category: "Senior",
    weightClass: "Light Heavy (81-90kg)",
    championship: "State Senior 2024",
    medal: "gold",
    position: "1st Place",
    wins: 4,
  },
  {
    id: 2,
    name: "Priya Singh",
    category: "Junior",
    weightClass: "Middle (65-75kg)",
    championship: "State Junior 2024",
    medal: "gold",
    position: "1st Place",
    wins: 5,
  },
  {
    id: 3,
    name: "Vikram Sharma",
    category: "Senior",
    weightClass: "Heavy (90kg+)",
    championship: "State Senior 2024",
    medal: "silver",
    position: "2nd Place",
    wins: 3,
  },
  {
    id: 4,
    name: "Aisha Patel",
    category: "Junior",
    weightClass: "Light (50-55kg)",
    championship: "State Junior 2024",
    medal: "bronze",
    position: "3rd Place",
    wins: 2,
  },
  {
    id: 5,
    name: "Arjun Thakur",
    category: "Senior",
    weightClass: "Middle Weight (75-81kg)",
    championship: "State Senior 2024",
    medal: "gold",
    position: "1st Place",
    wins: 4,
  },
  {
    id: 6,
    name: "Deepika Rao",
    category: "Junior",
    weightClass: "Heavy (70kg+)",
    championship: "State Junior 2024",
    medal: "silver",
    position: "2nd Place",
    wins: 3,
  },
]

const getMedalColor = (medal: string) => {
  switch (medal) {
    case "gold":
      return "text-yellow-500"
    case "silver":
      return "text-gray-400"
    case "bronze":
      return "text-orange-600"
    default:
      return "text-primary"
  }
}

export const metadata = {
  title: "Championships & Results | Dehradun Boxing Association",
  description: "Championship results, medalists, and tournament history",
}

export default function ChampionshipsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-secondary text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Championships & Results</h1>
          <p className="text-white/80">Boxing championship records and tournament results</p>
        </div>
      </section>

      {/* Featured Championship */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-secondary mb-8">Latest Championship</h2>
        {championships
          .filter((c) => c.featured)
          .map((champ) => (
            <Card key={champ.id} className="overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                  <div className="md:col-span-2">
                    <Trophy className="w-12 h-12 mb-4 text-accent" />
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">{champ.name}</h3>
                    <p className="text-white/80">{champ.date}</p>
                  </div>
                  <div className="border-l border-white/20 pl-6">
                    <p className="text-accent font-bold text-lg">{champ.totalAthletes}+</p>
                    <p className="text-white/70 text-sm">Athletes Competed</p>
                  </div>
                  <div>
                    <Button className="w-full bg-white text-secondary hover:bg-accent font-semibold">
                      View Results
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </section>

      {/* Championship List */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-3xl font-bold text-secondary mb-8">All Championships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {championships.map((champ) => (
            <Card key={champ.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                    {champ.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{champ.date}</p>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    champ.status === "completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {champ.status === "completed" ? "Completed" : "Upcoming"}
                </span>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users size={16} className="text-primary" />
                  <span className="text-sm">{champ.totalAthletes} Athletes</span>
                </div>
                <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Medalists */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary mb-8">Top Medalists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medalists.map((medalist) => (
              <Card key={medalist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-2 bg-gradient-to-r from-primary to-secondary`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-secondary">{medalist.name}</h3>
                      <p className="text-sm text-muted-foreground">{medalist.category}</p>
                    </div>
                    <Medal className={`w-8 h-8 ${getMedalColor(medalist.medal)}`} />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <p className="text-muted-foreground">Weight Class</p>
                      <p className="font-semibold text-foreground">{medalist.weightClass}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Championship</p>
                      <p className="font-semibold text-foreground">{medalist.championship}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-primary font-bold text-lg">{medalist.wins}</p>
                      <p className="text-xs text-muted-foreground">Wins</p>
                    </div>
                    <div className="text-center">
                      <p className="text-secondary font-bold text-lg">{medalist.position}</p>
                      <p className="text-xs text-muted-foreground">Position</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-secondary mb-8">Association Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Trophy, label: "Championships Held", value: "25+", color: "text-primary" },
            { icon: Users, label: "Total Participants", value: "2000+", color: "text-secondary" },
            { icon: Medal, label: "Medal Winners", value: "500+", color: "text-accent" },
            { icon: Award, label: "Active Athletes", value: "500", color: "text-primary" },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-shadow">
                <Icon className={`w-10 h-10 ${stat.color} mx-auto mb-4`} />
                <p className="text-3xl font-bold text-secondary mb-2">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </Card>
            )
          })}
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
