"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import {
  coachRegistrationSchema,
  type CoachRegistrationData,
  REGISTRATION_FEES,
} from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

export function CoachRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [receiptData, setReceiptData] = useState<any>(null)
  const [formDataStore, setFormDataStore] = useState<any>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CoachRegistrationData>({
    resolver: zodResolver(coachRegistrationSchema),
  })

  const onSubmit = (data: CoachRegistrationData) => {
    console.log("Coach Form Data:", data)
    setFormDataStore(data)
    setIsSubmitting(false)
    setShowPayment(true)
  }

  const handlePaymentSuccess = (transactionId: string) => {
    setShowPayment(false)

    const receipt = {
      transactionId,
      registrationType: "coach" as const,
      amount: REGISTRATION_FEES.coach,
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
              <Select onValueChange={(value) => setValue("gender", value as any)}>
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

        {/* Coaching Experience */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">
            Coaching Experience
          </h3>
          <div className="space-y-2">
            <Label htmlFor="experience">
              Experience Details <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="experience"
              {...register("experience")}
              placeholder="Describe your coaching experience, qualifications, certifications, and achievements (minimum 10 characters)"
              rows={5}
            />
            <p className="text-xs text-muted-foreground">
              Include years of experience, notable athletes coached, certifications, etc.
            </p>
            {errors.experience && (
              <p className="text-sm text-destructive">
                {errors.experience.message}
              </p>
            )}
          </div>
        </div>

        {/* Document Uploads */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">
            Required Documents
          </h3>

          <div className="grid grid-cols-1 gap-6">
            <FileUpload
              label="Coach Photo"
              id="photo"
              accept="image/*"
              required
              onChange={(file) => setValue("photo", file as File)}
              error={errors.photo?.message}
              description="Upload a recent passport-size photograph"
            />

            <FileUpload
              label="Coaching Affidavit"
              id="coachingAffidavit"
              accept=".pdf"
              required
              onChange={(file) => setValue("coachingAffidavit", file as File)}
              error={errors.coachingAffidavit?.message}
              description="Upload signed coaching affidavit in PDF format"
            />

            <FileUpload
              label="Experience Certificate (Optional)"
              id="experiencePdf"
              accept=".pdf"
              onChange={(file) => setValue("experiencePdf", file || undefined)}
              error={errors.experiencePdf?.message}
              description="Upload experience certificates or achievements in PDF format (optional)"
            />
          </div>
        </div>

        {/* Registration Fee Info */}
        <div className="bg-accent/10 border border-accent rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Registration Fee</p>
              <p className="text-sm text-muted-foreground">
                One-time coach registration fee
              </p>
            </div>
            <p className="text-2xl font-bold text-primary">
              ₹{REGISTRATION_FEES.coach}
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
        amount={REGISTRATION_FEES.coach}
        registrationType="coach"
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
