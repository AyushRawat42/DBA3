import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Award, Building2, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Registration | Dehradun Boxing Association",
  description: "Register with Dehradun Boxing Association - Athletes, Coaches, or Academies",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8">
        {/* Header */}
        <section className="bg-secondary text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Choose Registration Type</h1>
          <p className="text-white">
            Select the registration category that applies to you and complete the
            enrollment process with Dehradun Boxing Association
          </p>
        </div>
      </section>
        {/* Registration Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {/* Athlete Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Athlete</CardTitle>
              <CardDescription>
                Register as an individual athlete competing in boxing events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4 bg-muted rounded-lg">
                <p className="text-3xl font-bold text-primary">₹500</p>
                <p className="text-sm text-muted-foreground">Registration Fee</p>
              </div>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>✓ Personal details & documents</li>
                <li>✓ Medical certificates required</li>
                <li>✓ Birth & domicile certificates</li>
                <li>✓ Photo upload mandatory</li>
              </ul>
              <Button asChild className="w-full" size="lg">
                <Link href="/register/athlete">
                  Register as Athlete
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Coach Card */}
          <Card className="hover:shadow-lg transition-shadow border-primary/50">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Coach</CardTitle>
              <CardDescription>
                Register as a certified boxing coach or trainer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4 bg-muted rounded-lg">
                <p className="text-3xl font-bold text-primary">₹1,000</p>
                <p className="text-sm text-muted-foreground">Registration Fee</p>
              </div>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>✓ Personal details & Aadhaar</li>
                <li>✓ Coaching experience details</li>
                <li>✓ Coaching affidavit required</li>
                <li>✓ Optional experience certificate</li>
              </ul>
              <Button asChild className="w-full" size="lg">
                <Link href="/register/coach">
                  Register as Coach
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Academy Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Academy/Unit</CardTitle>
              <CardDescription>
                Register your boxing academy or training facility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4 bg-muted rounded-lg">
                <p className="text-3xl font-bold text-primary">₹2,000</p>
                <p className="text-sm text-muted-foreground">Registration Fee</p>
              </div>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>✓ Academy details & address</li>
                <li>✓ Owner information</li>
                <li>✓ DBA membership number</li>
                <li>✓ GSTIN optional</li>
              </ul>
              <Button asChild className="w-full" size="lg">
                <Link href="/register/academy">
                  Register Academy/Unit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
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
