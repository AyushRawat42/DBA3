"use client"

import { useState, useMemo } from "react"
import { Trophy, Filter, TrendingUp } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockRankings, weightClasses, type WeightClass } from "@/lib/rankings-data"
import { Label } from "@/components/ui/label"

export default function RankingsPage() {
  const [selectedWeightClass, setSelectedWeightClass] = useState<WeightClass | "all">("all")
  const [selectedGender, setSelectedGender] = useState<"all" | "male" | "female">("all")

  // Filter rankings based on selections
  const filteredRankings = useMemo(() => {
    let filtered = [...mockRankings]

    if (selectedWeightClass !== "all") {
      filtered = filtered.filter((boxer) => boxer.weightClass === selectedWeightClass)
    }

    if (selectedGender !== "all") {
      filtered = filtered.filter((boxer) => boxer.gender === selectedGender)
    }

    // Sort by rank within each weight class
    return filtered.sort((a, b) => {
      if (a.weightClass === b.weightClass) {
        return a.rank - b.rank
      }
      return 0
    })
  }, [selectedWeightClass, selectedGender])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getWeightClassLabel = (weightClass: WeightClass) => {
    return weightClasses.find((wc) => wc.value === weightClass)?.label || weightClass
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8">
        {/* Header */}
        <section className="bg-secondary text-white py-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary/10 rounded-full p-4">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-primary">DBA Boxer Rankings</h1>
          <p className="text-white text-xl max-w-2xl mx-auto">
            Official rankings of registered boxers in Dehradun Boxing Association
          </p>
        </div>
        </section>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Ranked Boxers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockRankings.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Boxers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockRankings.filter((b) => b.status === "active").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Weight Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {new Set(mockRankings.map((b) => b.weightClass)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Rankings
            </CardTitle>
            <CardDescription>
              Filter boxers by weight class and gender
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Weight Class</Label>
                <Select
                  value={selectedWeightClass}
                  onValueChange={(value) => setSelectedWeightClass(value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Weight Classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Weight Classes</SelectItem>
                    {weightClasses.map((wc) => (
                      <SelectItem key={wc.value} value={wc.value}>
                        {wc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <Select
                  value={selectedGender}
                  onValueChange={(value) => setSelectedGender(value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Genders" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genders</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rankings Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Current Rankings
            </CardTitle>
            <CardDescription>
              Showing {filteredRankings.length} boxer(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Weight Class</TableHead>
                    <TableHead className="text-center">Record</TableHead>
                    <TableHead className="text-center">KOs</TableHead>
                    <TableHead>Last Fight</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRankings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No boxers found matching the selected filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRankings.map((boxer, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-bold">
                          <div className="flex items-center gap-2">
                            {boxer.rank === 1 && (
                              <Trophy className="h-4 w-4 text-yellow-500" />
                            )}
                            #{boxer.rank}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{boxer.name}</TableCell>
                        <TableCell>{boxer.age}</TableCell>
                        <TableCell className="capitalize">{boxer.gender}</TableCell>
                        <TableCell className="text-sm">
                          {getWeightClassLabel(boxer.weightClass)}
                        </TableCell>
                        <TableCell className="text-center font-mono">
                          {boxer.wins}-{boxer.losses}-{boxer.draws}
                        </TableCell>
                        <TableCell className="text-center font-bold text-primary">
                          {boxer.knockouts}
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(boxer.lastFight).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>{getStatusBadge(boxer.status)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Info Note */}
        <div className="bg-accent/10 border border-accent rounded-lg p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Rankings are updated after each sanctioned bout. Last updated:{" "}
            <strong>{new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}</strong>
          </p>
        </div>

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
