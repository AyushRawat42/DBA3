"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Calendar, Users, Award, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const championships = [
  {
    id: 1,
    name: "Dehradun State Boxing Championship 2024",
    date: "December 15-18, 2024",
    location: "Sports Complex, Dehradun",
    totalAthletes: 156,
    categories: ["Junior", "Senior", "Youth"],
    featured: true,
  },
  {
    id: 2,
    name: "Inter-District Boxing Tournament",
    date: "November 5-7, 2024",
    location: "Gandhi Stadium, Dehradun",
    totalAthletes: 98,
    categories: ["Senior"],
    featured: false,
  },
  {
    id: 3,
    name: "Uttarakhand Open Boxing Championship",
    date: "October 20-23, 2024",
    location: "Parade Ground, Dehradun",
    totalAthletes: 203,
    categories: ["Junior", "Senior", "Youth", "Sub-Junior"],
    featured: false,
  },
]

const topMedalists = [
  {
    name: "Arjun Verma",
    category: "Senior",
    weightClass: "Welterweight",
    championship: "State Championship 2024",
    wins: 5,
    position: "Gold",
  },
  {
    name: "Priya Sharma",
    category: "Women",
    weightClass: "Featherweight",
    championship: "State Championship 2024",
    wins: 4,
    position: "Gold",
  },
  {
    name: "Amit Kumar",
    category: "Senior",
    weightClass: "Lightweight",
    championship: "Inter-District 2024",
    wins: 4,
    position: "Gold",
  },
  {
    name: "Deepak Thapa",
    category: "Senior",
    weightClass: "Middleweight",
    championship: "Uttarakhand Open 2024",
    wins: 6,
    position: "Gold",
  },
]

const stats = [
  { label: "Total Championships", value: "12", icon: Trophy },
  { label: "Total Athletes", value: "457", icon: Users },
  { label: "Gold Medals", value: "48", icon: Award },
  { label: "Active Categories", value: "4", icon: TrendingUp },
]

export default function ChampionshipsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-12">
        {/* Header */}
        <section className="bg-secondary text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Championships & Results</h1>
          <p className=" text-white">
            Boxing championship records and tournament results
          </p>
        </div>
       </section>
        {/* Latest Championship */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            Latest Championship
          </h2>
          {championships
            .filter((c) => c.featured)
            .map((champ) => (
              <Card key={champ.id} className="border-primary/50">
                <CardHeader>
                  <CardTitle className="text-2xl">{champ.name}</CardTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {champ.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {champ.totalAthletes}+ Athletes Competed
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {champ.categories.map((cat) => (
                      <Badge key={cat} variant="secondary">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </section>

        {/* All Championships */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">All Championships</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {championships.map((champ) => (
              <Card key={champ.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{champ.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{champ.date}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Athletes</span>
                      <span className="font-semibold">{champ.totalAthletes}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {champ.categories.map((cat) => (
                        <Badge key={cat} variant="outline">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Medalists */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Award className="h-8 w-8 text-accent" />
            Top Medalists
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {topMedalists.map((medalist, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{medalist.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{medalist.category}</p>
                    </div>
                    <Trophy className="h-6 w-6 text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight Class</span>
                    <span className="font-medium">{medalist.weightClass}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Championship</span>
                    <span className="font-medium text-xs">{medalist.championship}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Wins</span>
                    <span className="font-bold text-primary">{medalist.wins}</span>
                  </div>
                  <Badge className="w-full justify-center bg-yellow-500 hover:bg-yellow-600">
                    {medalist.position}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Boxer Rankings Section - OPTION B */}
        <section className="space-y-6">
          <Card className="border-2 border-primary/30 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <Trophy className="h-12 w-12 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl">🏆 Boxer Rankings</CardTitle>
              <CardDescription className="text-base mt-2">
                Check official DBA rankings and see how our athletes rank across different weight classes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">15</p>
                  <p className="text-sm text-muted-foreground">Ranked Boxers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">6</p>
                  <p className="text-sm text-muted-foreground">Weight Classes</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">14</p>
                  <p className="text-sm text-muted-foreground">Active Athletes</p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-primary/10 rounded-full p-1.5">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <span>Updated after each sanctioned bout</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-primary/10 rounded-full p-1.5">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <span>Filter by weight class and gender</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-primary/10 rounded-full p-1.5">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span>Complete fight records and statistics</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button asChild size="lg" className="w-full">
                <Link href="/rankings">
                  View Rankings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Association Statistics */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Association Statistics</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                      <span className="text-4xl font-bold">{stat.value}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* footer Section */}
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
                  <a href="/news" className="hover:text-white transition">
                    News
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
      </div>
    </div>
  )
  
}
