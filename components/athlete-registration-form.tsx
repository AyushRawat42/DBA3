"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  sportsRegistrationSchema,
  type SportsRegistrationData,
} from "@/lib/validations"

const sports = [
  "Badminton",
  "Air Rifle / Pistol Shooting",
  "25m Pistol Shooting",
  "Swimming",
  "Roller Skating",
  "Pickleball",
  "Boxing",
] as const

export function AthleteRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedName, setSubmittedName] = useState("")
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SportsRegistrationData>({
    resolver: zodResolver(sportsRegistrationSchema),
    defaultValues: {
      studentFullName: "",
      parentGuardianName: "",
      mobile: "",
      alternateMobile: "",
      email: "",
      city: "",
      preferredBatchTiming: "",
      previousExperience: "",
      message: "",
      consent: false,
    },
  })

  async function onSubmit(data: SportsRegistrationData) {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch("/api/submissions/sports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => null)
        throw new Error(json?.error ?? "Could not submit registration")
      }

      setSubmittedName(data.studentFullName)
      reset()
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not submit registration")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submittedName) {
    return (
      <div className="rounded-lg border bg-background p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto mb-4 size-12 text-primary" />
        <h2 className="text-2xl font-semibold">Application received</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Thank you, {submittedName}. The Aspire Sports Academy admissions team will contact you shortly.
        </p>
        <Button className="mt-6" onClick={() => setSubmittedName("")}>
          Submit another application
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-lg border bg-background p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold">Sports admission details</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Share the student details and preferred training program.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Student full name" error={errors.studentFullName?.message}>
          <Input {...register("studentFullName")} autoComplete="name" />
        </Field>

        <Field label="Parent or guardian name" error={errors.parentGuardianName?.message}>
          <Input {...register("parentGuardianName")} />
        </Field>

        <Field label="Mobile" error={errors.mobile?.message}>
          <Input {...register("mobile")} inputMode="numeric" maxLength={10} autoComplete="tel" />
        </Field>

        <Field label="Alternate mobile" error={errors.alternateMobile?.message}>
          <Input {...register("alternateMobile")} inputMode="numeric" maxLength={10} />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <Input {...register("email")} type="email" autoComplete="email" />
        </Field>

        <Field label="Age" error={errors.age?.message}>
          <Input {...register("age", { valueAsNumber: true })} type="number" min={3} max={100} />
        </Field>

        <Field label="City" error={errors.city?.message}>
          <Input {...register("city")} autoComplete="address-level2" />
        </Field>

        <Field label="Sport interested in" error={errors.sportInterestedIn?.message}>
          <Select onValueChange={(value) => setValue("sportInterestedIn", value as SportsRegistrationData["sportInterestedIn"], { shouldValidate: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Select sport" />
            </SelectTrigger>
            <SelectContent>
              {sports.map((sport) => (
                <SelectItem key={sport} value={sport}>
                  {sport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Preferred batch timing" error={errors.preferredBatchTiming?.message}>
          <Input {...register("preferredBatchTiming")} placeholder="Morning, evening, weekend..." />
        </Field>

        <Field label="Previous experience" error={errors.previousExperience?.message}>
          <Input {...register("previousExperience")} placeholder="Beginner, school team, club training..." />
        </Field>
      </div>

      <Field label="Message" error={errors.message?.message}>
        <Textarea {...register("message")} rows={4} />
      </Field>

      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm">
          <Checkbox
            onCheckedChange={(checked) => setValue("consent", checked === true, { shouldValidate: true })}
          />
          <span>I agree that Aspire Sports Academy may contact me about this admission enquiry.</span>
        </label>
        {errors.consent && <p className="text-sm text-destructive">{errors.consent.message}</p>}
      </div>

      {submitError && <p className="text-sm text-destructive">{submitError}</p>}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Submitting
          </>
        ) : (
          "Submit sports registration"
        )}
      </Button>
    </form>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
