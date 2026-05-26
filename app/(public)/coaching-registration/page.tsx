import { CoachingRegistrationForm } from "@/components/coaching-registration-form"

export default function CoachingRegistrationPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-linear-to-r from-secondary/10 to-primary/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">Coaching registration</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Apply for Aspire Defence Coaching</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Share your details and we will connect you with the right coaching path for defence and entrance preparation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <img src="/aspire-defence.jpeg" alt="Aspire Defence Academy" className="w-full h-auto rounded-2xl shadow-lg" />
            </div>
          </div>
          <div>
            <CoachingRegistrationForm />
          </div>
        </div>
      </section>
    </main>
  )
}
