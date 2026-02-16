"use client"

import { useState, useEffect } from "react"
import { CreditCard, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/validations"

interface PaymentDialogProps {
  open: boolean
  regId: string
  amount: number
  onSuccess: (paymentId: string) => void
  onCancel: () => void
  registrationType: "athlete" | "coach" | "academy"
}


export function PaymentDialog({
  open,
   regId,
  amount,
  onSuccess,
  onCancel,
  registrationType,
}: PaymentDialogProps) {
  const [processing, setProcessing] = useState(false)

  const handlePayment = async () => {
  setProcessing(true)
  try {
    if (!regId) {
      throw new Error("Missing regId")
    }
    const res = await fetch("/api/payments/mock-success", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        regId,
        registrationType,
        amount,
      }),
    })

    if (!res.ok) throw new Error(await res.text())
    const json = (await res.json()) as { paymentId: string }
    onSuccess(json.paymentId)
  } finally {
    setProcessing(false)
  }
}


  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Complete Payment
          </DialogTitle>
          <DialogDescription>
            Registration fee for {registrationType} registration
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Amount Display */}
          <div className="bg-muted rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Amount to Pay</p>
            <p className="text-4xl font-bold text-primary">
              {formatCurrency(amount)}
            </p>
          </div>

          {/* Mock Payment UI */}
          <div className="space-y-3 border rounded-lg p-4">
            <p className="text-sm font-medium">Payment Method</p>
            <div className="flex items-center gap-3 p-3 border rounded hover:bg-muted cursor-pointer">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">UPI / Card / Net Banking</p>
                <p className="text-xs text-muted-foreground">
                  Razorpay Secure Payment
                </p>
              </div>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="bg-accent/10 border border-accent rounded-lg p-3">
            <p className="text-xs text-center text-muted-foreground">
              🎯 <strong>Demo Mode:</strong> This is a mock payment. No actual
              transaction will be processed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={processing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={processing}
              className="flex-1"
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                `Pay ${formatCurrency(amount)}`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
