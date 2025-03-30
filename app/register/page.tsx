"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Download } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MobileMenu } from "@/components/mobile-menu"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { registerMember } from "../actions/register"
import { ThemeToggle } from "@/components/theme-toggle"

export default function RegisterPage() {
  const [formStep, setFormStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    department: "",
    paymentMethod: "upi",
    transactionId: "",
    interest: "",
    experience: "",
    expectations: "",
  })
  const [paymentProof, setPaymentProof] = useState<File | null>(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Create a FormData object to send the data
    const submitData = new FormData()

    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value as string)
    })

    // Add the payment proof file if it exists
    if (paymentProof) {
      submitData.append("paymentProof", paymentProof)
    }

    try {
      // Call the server action to register the member
      const result = await registerMember(submitData)

      if (result.success) {
        // Show success message
        toast.success("Registration Successful!", {
          description: "Thank you for registering with JARC. We'll be in touch soon!",
        })

        // Reset form
        setFormStep(0)
        setFormData({
          name: "",
          email: "",
          phone: "",
          year: "",
          department: "",
          paymentMethod: "upi",
          transactionId: "",
          interest: "",
          experience: "",
          expectations: "",
        })
        setPaymentProof(null)
      } else {
        // Show error message
        toast.error("Registration Failed", {
          description: result.message || "There was a problem with your registration. Please try again.",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Error", {
        description: "There was a problem submitting your registration. Please try again.",
      })
    }
  }

  const nextStep = () => {
    setFormStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setFormStep((prev) => prev - 1)
  }

  // Function to download sample Excel file
  const downloadExcelTemplate = () => {
    // In a real application, you would provide a link to download the Excel template
    console.log("Downloading Excel template")
    // This would be replaced with actual download functionality
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-600"></div>
              <div className="absolute inset-[2px] flex items-center justify-center rounded-full bg-background text-xs font-bold">
                JARC
              </div>
            </div>
            <span className="hidden font-bold sm:inline-block">Janatics Automation and Robotics Club</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/events" className="text-sm font-medium transition-colors hover:text-primary">
              Events
            </Link>
            <Link href="/team" className="text-sm font-medium transition-colors hover:text-primary">
              Team
            </Link>
            <Link href="/register" className="text-sm font-medium transition-colors hover:text-primary">
              Register
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/register">
              <Button>Join Now</Button>
            </Link>
            <MobileMenu />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container">
            <div className="flex flex-col items-start gap-4 mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-2"
              >
                <ChevronLeft className="h-4 w-4" /> Back to Home
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join JARC</h1>
              <p className="text-muted-foreground max-w-[700px]">
                Become a member of the Janatics Automation and Robotics Club. Fill out the form below to get started.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="relative hidden lg:block">
                <div className="sticky top-24">
                  <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=600&width=500&text=Join JARC"
                      fill
                      alt="Registration"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 space-y-4">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white">Membership Benefits</h2>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-3.5 w-3.5"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <span className="text-white">Access to all JARC workshops and events</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-3.5 w-3.5"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <span className="text-white">Opportunity to work on real-world robotics projects</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-3.5 w-3.5"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <span className="text-white">Networking with industry professionals</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-3.5 w-3.5"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <span className="text-white">Certificate of membership</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-8 p-4 bg-background/20 backdrop-blur-sm rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Membership Fee</h3>
                        <p className="text-white">Annual membership: ₹500</p>
                        <div className="mt-4">
                          <h4 className="text-white font-medium mb-2">Payment Options:</h4>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-primary"></div>
                              <span className="text-white">UPI: jarc@okaxis</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-primary"></div>
                              <span className="text-white">Bank Transfer: JARC RSCOE, Acc: 123456789</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>JARC Membership Registration</CardTitle>
                    <CardDescription>
                      {formStep === 0 && "Fill in your personal details to get started."}
                      {formStep === 1 && "Tell us about your interests and experience."}
                      {formStep === 2 && "Complete your payment details."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      {formStep === 0 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Enter your email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              placeholder="Enter your phone number"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="year">Year of Study</Label>
                              <Select
                                name="year"
                                value={formData.year}
                                onValueChange={(value) => handleSelectChange("year", value)}
                              >
                                <SelectTrigger id="year">
                                  <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="first">First Year</SelectItem>
                                  <SelectItem value="second">Second Year</SelectItem>
                                  <SelectItem value="third">Third Year</SelectItem>
                                  <SelectItem value="fourth">Fourth Year</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="department">Department</Label>
                              <Select
                                name="department"
                                value={formData.department}
                                onValueChange={(value) => handleSelectChange("department", value)}
                              >
                                <SelectTrigger id="department">
                                  <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cse">Computer Science</SelectItem>
                                  <SelectItem value="ece">Electronics</SelectItem>
                                  <SelectItem value="mech">Mechanical</SelectItem>
                                  <SelectItem value="civil">Civil</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      )}

                      {formStep === 1 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="interest">Areas of Interest</Label>
                            <Textarea
                              id="interest"
                              name="interest"
                              placeholder="What areas of robotics and automation interest you the most?"
                              value={formData.interest}
                              onChange={handleChange}
                              className="min-h-[100px]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="experience">Prior Experience</Label>
                            <Textarea
                              id="experience"
                              name="experience"
                              placeholder="Describe any prior experience you have with robotics or automation."
                              value={formData.experience}
                              onChange={handleChange}
                              className="min-h-[100px]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expectations">Expectations</Label>
                            <Textarea
                              id="expectations"
                              name="expectations"
                              placeholder="What do you hope to gain from joining JARC?"
                              value={formData.expectations}
                              onChange={handleChange}
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                      )}

                      {formStep === 2 && (
                        <div className="space-y-4">
                          <div className="p-4 bg-muted rounded-lg">
                            <h3 className="font-medium mb-2">Membership Fee</h3>
                            <p className="text-muted-foreground">Annual membership: ₹500</p>
                          </div>

                          <div className="space-y-2">
                            <Label>Payment Method</Label>
                            <RadioGroup
                              value={formData.paymentMethod}
                              onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                              className="grid grid-cols-1 gap-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="upi" id="upi" />
                                <Label htmlFor="upi">UPI Payment (jarc@okaxis)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bank" id="bank" />
                                <Label htmlFor="bank">Bank Transfer (JARC RSCOE, Acc: 123456789)</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="transactionId">Transaction ID / Reference Number</Label>
                            <Input
                              id="transactionId"
                              name="transactionId"
                              placeholder="Enter your payment transaction ID"
                              value={formData.transactionId}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="paymentProof">Payment Screenshot/Proof</Label>
                            <Input
                              id="paymentProof"
                              name="paymentProof"
                              type="file"
                              accept="image/*,.pdf"
                              onChange={handleFileChange}
                              className="cursor-pointer"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Upload a screenshot of your payment confirmation (JPG, PNG, or PDF)
                            </p>
                          </div>

                          <div className="mt-4 p-4 bg-muted rounded-lg">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Payment QR Code</h3>
                              <Button variant="outline" size="sm" className="gap-1.5">
                                <Download className="h-4 w-4" /> Save QR
                              </Button>
                            </div>
                            <div className="mt-4 flex justify-center">
                              <div className="relative h-48 w-48 bg-white p-2 rounded-lg">
                                <Image
                                  src="/placeholder.svg?height=200&width=200&text=Payment QR"
                                  fill
                                  alt="Payment QR Code"
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {formStep > 0 && (
                      <Button variant="outline" onClick={prevStep}>
                        Previous
                      </Button>
                    )}
                    {formStep === 0 && (
                      <Button onClick={nextStep} className="ml-auto">
                        Next
                      </Button>
                    )}
                    {formStep === 1 && <Button onClick={nextStep}>Next</Button>}
                    {formStep === 2 && <Button onClick={handleSubmit}>Submit Registration</Button>}
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-600"></div>
                <div className="absolute inset-[2px] flex items-center justify-center rounded-full bg-background text-xs font-bold">
                  JARC
                </div>
              </div>
              <span className="font-bold">Janatics Automation and Robotics Club</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Innovate. Create. Automate. © {new Date().getFullYear()} JARC, RSCOE. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="#"
              className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

