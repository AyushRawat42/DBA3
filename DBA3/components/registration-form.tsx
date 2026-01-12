"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  category: string
  weightClass: string
  experience: string
  coach: string
  address: string
  city: string
  state: string
  pincode: string
  parentName?: string
  parentPhone?: string
  medicalClearance: boolean
  safeGuardingAccepted: boolean
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    category: "",
    weightClass: "",
    experience: "",
    coach: "",
    address: "",
    city: "",
    state: "Uttarakhand",
    pincode: "",
    parentName: "",
    parentPhone: "",
    medicalClearance: false,
    safeGuardingAccepted: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to a backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto p-8 text-center border-2 border-primary/20 bg-primary/5">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-secondary mb-2">Registration Submitted!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for registering with Dehradun Boxing Association. We have received your information and will contact
          you within 24-48 hours to confirm your enrollment.
        </p>
        <div className="bg-white p-4 rounded-lg border border-border mb-6">
          <p className="text-sm text-left">
            <strong>Name:</strong> {formData.firstName} {formData.lastName}
            <br />
            <strong>Category:</strong> {formData.category}
            <br />
            <strong>Weight Class:</strong> {formData.weightClass}
            <br />
            <strong>Email:</strong> {formData.email}
          </p>
        </div>
        <Button
          onClick={() => (window.location.href = "/")}
          className="bg-primary hover:bg-primary/90 text-white font-semibold"
        >
          Back to Home
        </Button>
      </Card>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step <= currentStep ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-colors ${step < currentStep ? "bg-primary" : "bg-muted"}`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-muted-foreground">
          {currentStep === 1 && "Personal Information"}
          {currentStep === 2 && "Boxing Details"}
          {currentStep === 3 && "Verification & Consent"}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-secondary">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9XXXXX XXXXX"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Boxing Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-secondary">Boxing Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="junior">Junior (Below 18)</option>
                    <option value="senior">Senior (18-40)</option>
                    <option value="veteran">Veteran (40+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">Weight Class *</label>
                  <select
                    name="weightClass"
                    value={formData.weightClass}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select weight class</option>
                    <option value="light">Light (Up to 50kg)</option>
                    <option value="middleWeight">Middle Weight (51-63kg)</option>
                    <option value="light-heavy">Light Heavy (64-80kg)</option>
                    <option value="heavy">Heavy (81kg+)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">Boxing Experience *</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select experience level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate (1-2 years)</option>
                    <option value="advanced">Advanced (2-5 years)</option>
                    <option value="professional">Professional (5+ years)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">Current Coach</label>
                  <input
                    type="text"
                    name="coach"
                    value={formData.coach}
                    onChange={handleChange}
                    placeholder="Enter coach name (optional)"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Verification & Consent */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-secondary">Address & Consent</h3>

              <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-secondary">Address Information</h4>
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6-digit pincode"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-secondary">Consents</h4>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="medicalClearance"
                    checked={formData.medicalClearance}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    required
                  />
                  <span className="text-sm text-foreground">
                    I confirm that I have medical clearance from a doctor to participate in boxing *
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="safeGuardingAccepted"
                    checked={formData.safeGuardingAccepted}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    required
                  />
                  <span className="text-sm text-foreground">
                    I accept the safeguarding and anti-doping policies of DBA *
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-border">
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="px-6 bg-transparent"
            >
              Previous
            </Button>
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="px-6 bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                Next
              </Button>
            ) : (
              <Button type="submit" className="px-6 bg-primary hover:bg-primary/90 text-white font-semibold">
                Submit Registration
              </Button>
            )}
          </div>
        </Card>
      </form>
    </div>
  )
}
