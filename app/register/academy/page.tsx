import { AcademyRegistrationForm } from "@/components/academy-registration-form"

export const metadata = {
  title: "Academy/Unit Registration | Dehradun Boxing Association",
  description: "Register your academy or boxing unit with Dehradun Boxing Association",
}

export default function AcademyRegistrationPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">
            Academy/Unit Registration
          </h1>
          <p className="text-lg text-muted-foreground">
            Register your boxing academy or training unit with DBA
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-muted rounded-lg p-6 space-y-2">
          <h2 className="font-semibold">📋 Registration Requirements</h2>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>All fields marked with * are mandatory</li>
            <li>GSTIN is optional (provide if registered under GST)</li>
            <li>Valid DBA membership number required</li>
            <li>Registration fee: ₹2,000 (one-time payment)</li>
            <li>Processing time: 24-48 hours after payment</li>
          </ul>
        </div>

        {/* Form */}
        <div className="bg-card rounded-lg border p-6 md:p-8">
          <AcademyRegistrationForm />
        </div>
      </div>
    </div>
  )
}
