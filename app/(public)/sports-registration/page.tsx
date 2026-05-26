import { AthleteRegistrationForm } from "@/components/athlete-registration-form"

export default function SportsRegistrationPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-primary text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Sports Registration</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Register for Aspire Sports Academy</h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-white/80">
            Complete the form below to apply for athlete admission and get personalized coaching placement in your chosen sports discipline.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <img src="/aspire-1.jpeg" alt="Aspire Academy" className="w-full h-auto rounded-2xl shadow-lg" />
            </div>
          </div>
          <div>
            <AthleteRegistrationForm />
          </div>
        </div>
      </section>
    </main>
  )
}
