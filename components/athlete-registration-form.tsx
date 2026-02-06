"use client"

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

export function AthleteRegistrationForm() {
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
    watch,
  } = useForm<AthleteRegistrationData>({
    resolver: zodResolver(athleteRegistrationSchema),
  })

  const onSubmit = (data: AthleteRegistrationData) => {
    console.log("Athlete Form Data:", data)
    setFormDataStore(data)
    setIsSubmitting(false)
    setShowPayment(true)
  }

  const handlePaymentSuccess = (transactionId: string) => {
    setShowPayment(false)

    // Prepare receipt data
    const receipt = {
      transactionId,
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
              label="Athlete Photo"
              id="photo"
              accept="image/*"
              required
              onChange={(file) => setValue("photo", file as File)}
              error={errors.photo?.message}
              description="Upload a recent passport-size photograph"
            />

            <FileUpload
              label="Birth Certificate"
              id="birthCertificate"
              accept=".pdf"
              required
              onChange={(file) => setValue("birthCertificate", file as File)}
              error={errors.birthCertificate?.message}
              description="Upload birth certificate in PDF format"
            />

            <FileUpload
              label="Domicile Certificate"
              id="domicileCertificate"
              accept=".pdf"
              required
              onChange={(file) => setValue("domicileCertificate", file as File)}
              error={errors.domicileCertificate?.message}
              description="Upload domicile certificate in PDF format"
            />

            <FileUpload
              label="Bone Density Certificate"
              id="boneDensityCertificate"
              accept=".pdf"
              required
              onChange={(file) =>
                setValue("boneDensityCertificate", file as File)
              }
              error={errors.boneDensityCertificate?.message}
              description="Upload bone density test report in PDF format"
            />

            <FileUpload
              label="Annual Medical Certificate"
              id="medicalCertificate"
              accept=".pdf"
              required
              onChange={(file) => setValue("medicalCertificate", file as File)}
              error={errors.medicalCertificate?.message}
              description="Upload annual medical fitness certificate in PDF format"
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
