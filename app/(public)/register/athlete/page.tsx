import { AthleteRegistrationForm } from "@/components/athlete-registration-form"

export const metadata = {
  title: "Athlete Registration | Dehradun Boxing Association",
  description: "Register as an athlete with Dehradun Boxing Association",
}

export default function AthleteRegistrationPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Athlete Registration</h1>
          <p className="text-lg text-muted-foreground">
            Join Dehradun Boxing Association as an athlete
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-muted rounded-lg p-6 space-y-2">
          <h2 className="font-semibold">📋 Registration Requirements</h2>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>All fields marked with * are mandatory</li>
            <li>Upload clear scanned copies of all required documents</li>
            <li>Registration fee: ₹500 (one-time payment)</li>
            <li>Processing time: 24-48 hours after payment</li>
          </ul>
        </div>

        {/* Form */}
        <div className="bg-card rounded-lg border p-6 md:p-8">
          <AthleteRegistrationForm />
        </div>
      </div>
    </div>
  )
}
