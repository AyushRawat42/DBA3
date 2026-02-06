"use client"

import { CheckCircle2, Download, Home } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/validations"
import Link from "next/link"

interface ReceiptData {
  transactionId: string
  registrationType: "athlete" | "coach" | "academy"
  amount: number
  name: string
  email: string
  phone?: string
  date: string
  formData: Record<string, any>
}

interface ReceiptGeneratorProps {
  open: boolean
  data: ReceiptData
}

export function ReceiptGenerator({ open, data }: ReceiptGeneratorProps) {
  const downloadReceipt = () => {
    // Create HTML content for receipt
    const receiptHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Registration Receipt - ${data.transactionId}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
    .header { text-align: center; border-bottom: 3px solid #dc2626; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { color: #dc2626; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
    .title { color: #0a1f3d; font-size: 24px; font-weight: bold; }
    .section { margin-bottom: 25px; }
    .section-title { color: #0a1f3d; font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid #d4af37; padding-bottom: 5px; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
    .label { font-weight: bold; color: #6b7280; }
    .value { color: #0a1f3d; }
    .amount-box { background: #fef2f2; border: 2px solid #dc2626; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
    .amount { font-size: 32px; color: #dc2626; font-weight: bold; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280; font-size: 14px; }
    .success-badge { background: #22c55e; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">🥊 DEHRADUN BOXING ASSOCIATION</div>
    <div class="title">Registration Receipt</div>
    <div class="success-badge">✓ PAYMENT SUCCESSFUL</div>
  </div>

  <div class="section">
    <div class="section-title">Transaction Details</div>
    <div class="info-row">
      <span class="label">Transaction ID:</span>
      <span class="value">${data.transactionId}</span>
    </div>
    <div class="info-row">
      <span class="label">Date & Time:</span>
      <span class="value">${data.date}</span>
    </div>
    <div class="info-row">
      <span class="label">Registration Type:</span>
      <span class="value">${data.registrationType.toUpperCase()}</span>
    </div>
  </div>

  <div class="amount-box">
    <div style="color: #6b7280; margin-bottom: 8px;">Amount Paid</div>
    <div class="amount">${formatCurrency(data.amount)}</div>
  </div>

  <div class="section">
    <div class="section-title">Applicant Details</div>
    <div class="info-row">
      <span class="label">Name:</span>
      <span class="value">${data.name}</span>
    </div>
    <div class="info-row">
      <span class="label">Email:</span>
      <span class="value">${data.email}</span>
    </div>
    ${data.phone ? `
    <div class="info-row">
      <span class="label">Phone:</span>
      <span class="value">${data.phone}</span>
    </div>
    ` : ''}
  </div>

  <div class="footer">
    <p><strong>Dehradun Boxing Association</strong></p>
    <p>This is a computer-generated receipt and does not require a signature.</p>
    <p>For any queries, please contact us at contact@dba.com</p>
    <p style="margin-top: 15px; color: #d4af37;">Thank you for registering with DBA!</p>
  </div>
</body>
</html>
    `

    // Create blob and download
    const blob = new Blob([receiptHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `DBA_Receipt_${data.transactionId}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    // Also open in new tab for instant viewing
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(receiptHTML)
      printWindow.document.close()
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Registration Successful!
          </DialogTitle>
          <DialogDescription className="text-center">
            Your payment has been processed successfully
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Transaction Summary */}
          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono font-medium">{data.transactionId}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-bold text-primary text-lg">
                {formatCurrency(data.amount)}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Registration Type</span>
              <span className="font-medium capitalize">{data.registrationType}</span>
            </div>
          </div>

          {/* Applicant Info */}
          <div className="border rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium">Applicant Details</p>
            <div className="text-sm space-y-1 text-muted-foreground">
              <p><strong>Name:</strong> {data.name}</p>
              <p><strong>Email:</strong> {data.email}</p>
              {data.phone && <p><strong>Phone:</strong> {data.phone}</p>}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-accent/10 border border-accent rounded-lg p-4">
            <p className="text-sm font-medium mb-2">📋 What's Next?</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Our team will review your application within 24-48 hours</li>
              <li>You will receive a confirmation email at {data.email}</li>
              <li>Keep this receipt for your records</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={downloadReceipt}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            <Button asChild className="flex-1">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go to Home
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
