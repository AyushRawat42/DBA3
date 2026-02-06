"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import {
  academyRegistrationSchema,
  type AcademyRegistrationData,
  REGISTRATION_FEES,
} from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PaymentDialog } from "@/components/payment-dialog"
import { ReceiptGenerator } from "@/components/receipt-generator"

export function AcademyRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [receiptData, setReceiptData] = useState<any>(null)
  const [formDataStore, setFormDataStore] = useState<any>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcademyRegistrationData>({
    resolver: zodResolver(academyRegistrationSchema),
  })

  const onSubmit = (data: AcademyRegistrationData) => {
    console.log("Academy Form Data:", data)
    setFormDataStore(data)
    setIsSubmitting(false)
    setShowPayment(true)
  }

  const handlePaymentSuccess = (transactionId: string) => {
    setShowPayment(false)

    const receipt = {
      transactionId,
      registrationType: "academy" as const,
      amount: REGISTRATION_FEES.academy,
      name: formDataStore.academyName,
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
        {/* Academy Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">
            Academy/Unit Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="academyName">
                Academy Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="academyName"
                {...register("academyName")}
                placeholder="Enter academy/unit name"
              />
              {errors.academyName && (
                <p className="text-sm text-destructive">
                  {errors.academyName.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">
                Address <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="address"
                {...register("address")}
                placeholder="Enter complete address with city, state, and PIN code"
                rows={3}
              />
              {errors.address && (
                <p className="text-sm text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerName">
                Owner Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ownerName"
                {...register("ownerName")}
                placeholder="Enter owner/director name"
              />
              {errors.ownerName && (
                <p className="text-sm text-destructive">
                  {errors.ownerName.message}
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
                placeholder="academy@example.com"
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
              <Label htmlFor="gstin">GSTIN Number (Optional)</Label>
              <Input
                id="gstin"
                {...register("gstin")}
                placeholder="22AAAAA0000A1Z5"
              />
              <p className="text-xs text-muted-foreground">
                Enter GST number if registered
              </p>
              {errors.gstin && (
                <p className="text-sm text-destructive">{errors.gstin.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* DBA Membership Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">
            DBA Membership Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dbaMembershipNumber">
                DBA Membership Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="dbaMembershipNumber"
                {...register("dbaMembershipNumber")}
                placeholder="DBA123456"
              />
              {errors.dbaMembershipNumber && (
                <p className="text-sm text-destructive">
                  {errors.dbaMembershipNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="membershipStartDate">
                Membership Start Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="membershipStartDate"
                type="date"
                {...register("membershipStartDate")}
              />
              {errors.membershipStartDate && (
                <p className="text-sm text-destructive">
                  {errors.membershipStartDate.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Registration Fee Info */}
        <div className="bg-accent/10 border border-accent rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Registration Fee</p>
              <p className="text-sm text-muted-foreground">
                One-time academy/unit registration fee
              </p>
            </div>
            <p className="text-2xl font-bold text-primary">
              ₹{REGISTRATION_FEES.academy}
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
        amount={REGISTRATION_FEES.academy}
        registrationType="academy"
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
