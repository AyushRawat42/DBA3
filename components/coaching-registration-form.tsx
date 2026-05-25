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
  coachingRegistrationSchema,
  type CoachingRegistrationData,
} from "@/lib/validations"

const courses = [
  "NDA / CDS / OTA / AFCAT",
  "Sainik School / RIMC / RMS CET",
  "Sports Coaching & Fitness",
] as const

export function CoachingRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedName, setSubmittedName] = useState("")
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CoachingRegistrationData>({
    resolver: zodResolver(coachingRegistrationSchema),
    defaultValues: {
      studentFullName: "",
      parentGuardianName: "",
      mobile: "",
      alternateMobile: "",
      email: "",
      currentClass: "",
      city: "",
      schoolName: "",
      message: "",
      consent: false,
    },
  })

  async function onSubmit(data: CoachingRegistrationData) {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch("/api/submissions/coaching", {
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
        <CheckCircle2 className="mx-auto mb-4 size-12 text-secondary" />
        <h2 className="text-2xl font-semibold">Application received</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Thank you, {submittedName}. The Aspire Defence Academy team will contact you shortly.
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
        <h2 className="text-xl font-semibold">Coaching admission details</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Share the student details and preferred defence coaching path.
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

        <Field label="Current class" error={errors.currentClass?.message}>
          <Input {...register("currentClass")} placeholder="Class 8, Class 12, Graduate..." />
        </Field>

        <Field label="City" error={errors.city?.message}>
          <Input {...register("city")} autoComplete="address-level2" />
        </Field>

        <Field label="Course interested in" error={errors.courseInterestedIn?.message}>
          <Select onValueChange={(value) => setValue("courseInterestedIn", value as CoachingRegistrationData["courseInterestedIn"], { shouldValidate: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="School name" error={errors.schoolName?.message}>
          <Input {...register("schoolName")} />
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
          <span>I agree that Aspire Defence Academy may contact me about this admission enquiry.</span>
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
          "Submit coaching registration"
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
