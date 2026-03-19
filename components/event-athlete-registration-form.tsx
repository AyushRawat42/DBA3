"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import {
  eventAthleteRegistrationSchema,
  type EventAthleteRegistrationData,
} from "@/lib/event-validations"
import { getEventFee } from "@/lib/event-fees"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileUpload } from "@/components/file-upload"
import { PaymentDialog } from "@/components/payment-dialog"
import { ReceiptGenerator } from "@/components/receipt-generator"

export function EventAthleteRegistrationForm({
  eventTitle,
  eventDateISO,
  baseFee,
}: {
  eventTitle: string
  eventDateISO: string // "YYYY-MM-DD"
  baseFee: number // X
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [receiptData, setReceiptData] = useState<any>(null)
  const [formDataStore, setFormDataStore] = useState<any>(null)
  const [regId, setRegId] = useState<string | null>(null)

  const fee = useMemo(() => {
    return getEventFee({
      eventDateISO,
      baseFee,
      lateFeeWindowDays: 20, // “final 15–20 days” => using 20 as the window
      lateFeeAdd: 500,
    })
  }, [eventDateISO, baseFee])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EventAthleteRegistrationData>({
    resolver: zodResolver(eventAthleteRegistrationSchema),
  })

  const getRegId = async () => {
    if (regId) return regId

    const res = await fetch("/api/registrations/upsert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "athlete",
        formData: { eventTitle, eventDateISO },
      }),
    })

    if (!res.ok) {
      throw new Error(await res.text())
    }

    const json = (await res.json()) as { regId: string }
    setRegId(json.regId)
    return json.regId
  }

  const onSubmit = async (data: EventAthleteRegistrationData) => {
    setIsSubmitting(true)

    try {
      const ensuredRegId = await getRegId()

      const res = await fetch("/api/registrations/upsert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          regId: ensuredRegId,
          type: "athlete",
          formData: {
            eventTitle,
            eventDateISO,
            ...data,
          },
        }),
      })

      if (!res.ok) throw new Error(await res.text())

      setFormDataStore({ ...data, regId: ensuredRegId })
      setShowPayment(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaymentSuccess = async (transactionId: string) => {
    setShowPayment(false)

    const ensuredRegId = await getRegId()

    const submitRes = await fetch("/api/registrations/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regId: ensuredRegId, type: "athlete" }),
    })

    if (!submitRes.ok) {
      // show error later with toast; for now log
      console.error(await submitRes.text())
      return
    }

    const receipt = {
      transactionId,
      registrationType: "athlete" as const,
      amount: fee.amount,
      name: `${formDataStore.firstName} ${formDataStore.lastName}`,
      email: formDataStore.email,
      phone: formDataStore.phone,
      date: new Date().toLocaleString("en-IN", {
        dateStyle: "long",
        timeStyle: "short",
      }),
      formData: {
        eventTitle,
        eventDateISO,
        ...formDataStore,
      },
    }

    setReceiptData(receipt)
    setShowReceipt(true)
  }

  return (
    <>
      <div className="space-y-2 mb-6">
        <p className="text-sm text-muted-foreground">
          Event: <span className="font-medium text-foreground">{eventTitle}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Event date:{" "}
          <span className="font-medium text-foreground">
            {new Date(eventDateISO).toLocaleDateString("en-IN", { dateStyle: "long" })}
          </span>{" "}
          ({fee.daysUntilEvent} day(s) left)
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
              <Input id="firstName" {...register("firstName")} />
              {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
              <Input id="lastName" {...register("lastName")} />
              {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone <span className="text-destructive">*</span></Label>
              <Input id="phone" {...register("phone")} maxLength={10} />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">DOB <span className="text-destructive">*</span></Label>
              <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
              {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Gender <span className="text-destructive">*</span></Label>
              <Select onValueChange={(v) => setValue("gender", v as any)}>
                <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
            </div>
          </div>
        </div>

        {/* Aadhaar + Education */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">Verification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar <span className="text-destructive">*</span></Label>
              <Input id="aadhaar" {...register("aadhaar")} maxLength={12} />
              {errors.aadhaar && <p className="text-sm text-destructive">{errors.aadhaar.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="educationalQualification">Educational Qualification <span className="text-destructive">*</span></Label>
              <Input id="educationalQualification" {...register("educationalQualification")} />
              {errors.educationalQualification && (
                <p className="text-sm text-destructive">{errors.educationalQualification.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">Required Documents</h3>

          <div className="grid grid-cols-1 gap-6">
            <FileUpload
              label="Athlete Photo"
              id="photo"
              accept="image/*"
              required
              getRegId={getRegId}
              docType="photo"
              onChange={(result) =>
                setValue("photo", result?.s3Key ?? "", {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              error={errors.photo?.message}
            />

            <FileUpload
              label="Birth Certificate (PDF)"
              id="birthCertificate"
              accept=".pdf"
              required
              getRegId={getRegId}
              docType="birthCertificate"
              onChange={(result) =>
                setValue("birthCertificate", result?.s3Key ?? "", {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              error={errors.birthCertificate?.message}
            />

            <FileUpload
              label="Domicile Certificate (PDF)"
              id="domicileCertificate"
              accept=".pdf"
              required
              getRegId={getRegId}
              docType="domicileCertificate"
              onChange={(result) =>
                setValue("domicileCertificate", result?.s3Key ?? "", {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              error={errors.domicileCertificate?.message}
            />

            <FileUpload
              label="Bone Density Certificate (PDF)"
              id="boneDensityCertificate"
              accept=".pdf"
              required
              getRegId={getRegId}
              docType="boneDensityCertificate"
              onChange={(result) =>
                setValue("boneDensityCertificate", result?.s3Key ?? "", {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              error={errors.boneDensityCertificate?.message}
            />

            <FileUpload
              label="Annual Medical Certificate (PDF)"
              id="medicalCertificate"
              accept=".pdf"
              required
              getRegId={getRegId}
              docType="medicalCertificate"
              onChange={(result) =>
                setValue("medicalCertificate", result?.s3Key ?? "", {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              error={errors.medicalCertificate?.message}
            />

            {/* New */}
            <FileUpload
              label="Blood Report (PDF)"
              id="bloodReport"
              accept=".pdf"
              required
              getRegId={getRegId}
              docType="bloodReport"
              onChange={(result) =>
                setValue("bloodReport", result?.s3Key ?? "", {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              error={errors.bloodReport?.message}
              description="Recent blood test report in PDF format"
            />

            <FileUpload
              label="HIV Certificate (PDF)"
              id="hivCertificate"
              accept=".pdf"
              required
              getRegId={getRegId}
              docType="hivCertificate"
              onChange={(result) =>
                setValue("hivCertificate", result?.s3Key ?? "", {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              error={errors.hivCertificate?.message}
              description="HIV test certificate in PDF format"
            />
          </div>
        </div>

        {/* Fee */}
        <div className="bg-accent/10 border border-accent rounded-lg p-4">
          <div className="flex justify-between items-center gap-6">
            <div>
              <p className="font-semibold">Event Registration Fee</p>
              <p className="text-sm text-muted-foreground">
                {fee.isLate
                  ? `Late fee window active (last ${fee.lateFeeWindowDays} days): +₹${fee.lateFeeAdd}`
                  : `Standard fee (until last ${fee.lateFeeWindowDays} days)`}
              </p>
            </div>
            <p className="text-2xl font-bold text-primary">₹{fee.amount}</p>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Proceed to Payment"
          )}
        </Button>
      </form>

      <PaymentDialog
        open={showPayment}
        regId={regId ?? ""}
        amount={fee.amount}
        registrationType="athlete"
        onSuccess={handlePaymentSuccess}
        onCancel={() => setShowPayment(false)}
      />

      {receiptData && <ReceiptGenerator open={showReceipt} data={receiptData} />}
    </>
  )
}
