"use client"
import { DOC_LABELS } from "@/lib/required-docs"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import {
  athleteRegistrationSchema,
  type AthleteRegistrationData,
  REGISTRATION_FEES,
} from "@/lib/validations"
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
import { useEffect } from "react"

export function AthleteRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [receiptData, setReceiptData] = useState<any>(null)
  const [formDataStore, setFormDataStore] = useState<any>(null)
  
 const [regId, setRegId] = useState<string | null>(null)

const getRegId = async () => {
  if (regId) return regId

  const res = await fetch("/api/registrations/upsert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "athlete", formData: {} }),
  })

  if (!res.ok) {
    throw new Error(await res.text())
  }

  const json = (await res.json()) as { regId: string }
  setRegId(json.regId)
  return json.regId
}



  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AthleteRegistrationData>({
    resolver: zodResolver(athleteRegistrationSchema),
  defaultValues: {
    photo: "",
    birthCertificate: "",
    domicileCertificate: "",
    boneDensityCertificate: "",
    medicalCertificate: "",
  },
  })
  const photoValue = watch("photo")
const birthValue = watch("birthCertificate")

useEffect(() => {
  console.log("DOC VALUES", { photoValue, birthValue })
}, [photoValue, birthValue])

  const onSubmit = async (data: AthleteRegistrationData) => {
  setIsSubmitting(true)
  try {
    const ensuredRegId = await getRegId()

    const res = await fetch("/api/registrations/upsert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        regId: ensuredRegId,
        type: "athlete",
        formData: data,
      }),
    })

    if (!res.ok) throw new Error(await res.text())

    setFormDataStore({ ...data, regId: ensuredRegId })
    setShowPayment(true)
  } finally {
    setIsSubmitting(false)
  }
}




  const handlePaymentSuccess = async (paymentId: string) => {
  setShowPayment(false)

  const ensuredRegId = await getRegId()

  const submitRes = await fetch("/api/registrations/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ regId: ensuredRegId, type: "athlete" }),
  })

  if (!submitRes.ok) {
    // show error later with toast; for now console
    console.error(await submitRes.text())
    return
  }

  const receipt = {
    transactionId: paymentId,
    registrationType: "athlete" as const,
    amount: REGISTRATION_FEES.athlete,
    name: `${formDataStore.firstName} ${formDataStore.lastName}`,
    email: formDataStore.email,
    phone: formDataStore.phone,
    date: new Date().toLocaleString("en-IN", {
      dateStyle: "long",
      timeStyle: "short",
    }),
    formData: formDataStore,
  }

  setReceiptData(receipt)
  setShowReceipt(true)
}


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                {...register("firstName")}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                {...register("lastName")}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="9876543210"
                maxLength={10}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">
                Date of Birth <span className="text-destructive">*</span>
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-destructive">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">
                Gender <span className="text-destructive">*</span>
              </Label>
              <Select onValueChange={(value) => setValue("gender", value as any, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-destructive">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Aadhaar Number */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">
            Identity Verification
          </h3>
          <div className="space-y-2">
            <Label htmlFor="aadhaar">
              Aadhaar Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="aadhaar"
              {...register("aadhaar")}
              placeholder="123456789012"
              maxLength={12}
            />
            {errors.aadhaar && (
              <p className="text-sm text-destructive">
                {errors.aadhaar.message}
              </p>
            )}
          </div>
        </div>

        {/* Educational Qualification */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">
            Educational Details
          </h3>
          <div className="space-y-2">
            <Label htmlFor="educationalQualification">
              Educational Qualification <span className="text-destructive">*</span>
            </Label>
            <Input
              id="educationalQualification"
              {...register("educationalQualification")}
              placeholder="e.g., 10th Pass, 12th Pass, Graduate"
            />
            {errors.educationalQualification && (
              <p className="text-sm text-destructive">
                {errors.educationalQualification.message}
              </p>
            )}
          </div>
        </div>

        {/* Document Uploads */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">
            Required Documents
          </h3>
          <p className="text-sm text-muted-foreground">
            All documents are mandatory. Please upload clear scanned copies.
          </p>

          <div className="grid grid-cols-1 gap-6">
           <FileUpload
           id="athlete-photo"
           label="Photograph"
           accept="image/*"
           required
           docType="photo"
           getRegId={getRegId}
          onChange={(result) =>
  setValue("photo", result?.s3Key ?? "", {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
  })
}


            error={errors.photo?.message}
           description={DOC_LABELS.photo}
         />


            <FileUpload
              id="athlete-birthCertificate"
  label="Birth Certificate"
  accept="application/pdf"
  required
  docType="birthCertificate"
  getRegId={getRegId}
  onChange={(result) =>
  setValue("birthCertificate", result?.s3Key ?? "", {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
  })
}
 error={errors.birthCertificate?.message}
            description={DOC_LABELS.birthCertificate}
            />

            <FileUpload
              id="athlete-domicileCertificate"
  label="Domicile Certificate"
  accept="application/pdf"
  required
  docType="domicileCertificate"
  getRegId={getRegId}
  onChange={(result) =>
    setValue("domicileCertificate", result?.s3Key ?? "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }
  error={errors.domicileCertificate?.message}
  description={DOC_LABELS.domicileCertificate}
            />

            <FileUpload
              id="athlete-boneDensityCertificate"
  label="Bone Density Report"
  accept="application/pdf"
  required
  docType="boneDensityCertificate"
  getRegId={getRegId}
  onChange={(result) =>
    setValue("boneDensityCertificate", result?.s3Key ?? "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }
  error={errors.boneDensityCertificate?.message}
  description={DOC_LABELS.boneDensityCertificate}
            />

            <FileUpload
              id="athlete-medicalCertificate"
  label="Medical Fitness Certificate"
  accept="application/pdf"
  required
  docType="medicalCertificate"
  getRegId={getRegId}
  onChange={(result) =>
    setValue("medicalCertificate", result?.s3Key ?? "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }
  error={errors.medicalCertificate?.message}
  description={DOC_LABELS.medicalCertificate}
            />
          </div>
        </div>

        {/* Registration Fee Info */}
        <div className="bg-accent/10 border border-accent rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Registration Fee</p>
              <p className="text-sm text-muted-foreground">
                One-time athlete registration fee
              </p>
            </div>
            <p className="text-2xl font-bold text-primary">
              ₹{REGISTRATION_FEES.athlete}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
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

      {/* Payment Dialog */}
     <PaymentDialog
  open={showPayment}
  regId={formDataStore?.regId ?? ""}
  amount={REGISTRATION_FEES.athlete}
  registrationType="athlete"
  onSuccess={handlePaymentSuccess}
  onCancel={() => setShowPayment(false)}
/>


      {/* Receipt Dialog */}
      {receiptData && (
        <ReceiptGenerator open={showReceipt} data={receiptData} />
      )}
    </>
  )
}
