"use client"

import type { ChangeEvent } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { CreditCard, ShoppingCartIcon as Paypal, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatCreditCardNumber, formatExpiryDate, formatCVC } from "@/lib/utils"
import type { BookingDetails, CardDetails, PaymentInfo } from "@/types/booking"

interface Extra {
  id: string
  name: string
  price: number
}

interface PaymentErrors extends Partial<CardDetails> {
  terms?: string
}

interface PaymentMethod {
  id: string
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface PaymentDetailsProps {
  onContinue?: (data: { paymentInfo: PaymentInfo; paymentMethod: string }) => void
  onBack?: () => void
  bookingDetails: BookingDetails
}

export function PaymentDetails({ onContinue, onBack, bookingDetails }: PaymentDetailsProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('credit-card')
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvc: ''
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [errors, setErrors] = useState<PaymentErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()

  const validateCardDetails = (): boolean => {
    const newErrors: Partial<CardDetails> = {}

    if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number'
    }

    if (!cardDetails.nameOnCard) {
      newErrors.nameOnCard = 'Please enter the name on card'
    }

    if (!cardDetails.expiryDate || !cardDetails.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)'
    }

    if (!cardDetails.cvc || !cardDetails.cvc.match(/^[0-9]{3,4}$/)) {
      newErrors.cvc = 'Please enter a valid CVC'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: PaymentErrors = {}
    
    if (selectedPaymentMethod === 'credit-card' && !validateCardDetails()) {
      return
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions'
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    // try {
    //   await onContinue({
    //     paymentInfo: {
    //       cardNumber: cardDetails.cardNumber,
    //       expiryDate: cardDetails.expiryDate,
    //       cvc: cardDetails.cvc,
    //       nameOnCard: cardDetails.nameOnCard,
    //     },
    //     paymentMethod: selectedPaymentMethod,
    //   })
    // } catch (error) {
    //   console.error('Payment processing error:', error)
    //   toast({
    //     title: "Payment error",
    //     description: "There was an error processing your payment. Please try again later.",
    //   })
    // } finally {
    //   setIsSubmitting(false)
    // }
  }

  const handleCardDetailsChange = (field: keyof CardDetails, value: string) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const calculateTotal = (): number => {
    if (!bookingDetails.lodge?.price) return 0

    // Base price calculation
    const basePrice = bookingDetails.lodge.price * bookingDetails.nights

    // Add extras
    const extrasTotal = bookingDetails.extras?.reduce((sum, extra) => sum + extra.price, 0) ?? 0

    let total = basePrice + extrasTotal

    // Apply discount if applicable
    if (bookingDetails.discountApplied) {
      total = total * 0.9 // 10% discount
    }

    return Math.round(total)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Select your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue={selectedPaymentMethod}
            onValueChange={(value) => setSelectedPaymentMethod(value)}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            <div>
              <RadioGroupItem value="credit-card" id="credit-card" className="peer sr-only" />
              <Label
                htmlFor="credit-card"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <CreditCard className="mb-3 h-6 w-6" />
                Credit Card
              </Label>
            </div>
            <div>
              <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
              <Label
                htmlFor="paypal"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Paypal className="mb-3 h-6 w-6" />
                PayPal
              </Label>
            </div>
            <div>
              <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
              <Label
                htmlFor="bank"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Mail className="mb-3 h-6 w-6" />
                Bank Transfer
                </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {selectedPaymentMethod === "credit-card" && (
        <Card>
          <CardHeader>
            <CardTitle>Card Details</CardTitle>
            <CardDescription>Enter your card information securely</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="number">Card number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={cardDetails.cardNumber}
                        onChange={(e) => {
                  const formatted = formatCreditCardNumber(e.target.value)
                  setCardDetails((prev) => ({ ...prev, cardNumber: formatted }))
                        }}
                className={errors.cardNumber ? "border-destructive" : ""}
                      />
              {errors.cardNumber && (
                <p className="text-sm text-destructive">{errors.cardNumber}</p>
              )}
                    </div>
            <div className="grid gap-2">
              <Label htmlFor="nameOnCard">Name on card</Label>
                      <Input
                        id="nameOnCard"
                        name="nameOnCard"
                placeholder="John Doe"
                value={cardDetails.nameOnCard}
                onChange={(e) => {
                  setCardDetails((prev) => ({ ...prev, nameOnCard: e.target.value }))
                }}
                className={errors.nameOnCard ? "border-destructive" : ""}
              />
              {errors.nameOnCard && (
                <p className="text-sm text-destructive">{errors.nameOnCard}</p>
              )}
                    </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={(e) => {
                    const formatted = formatExpiryDate(e.target.value)
                    setCardDetails((prev) => ({ ...prev, expiryDate: formatted }))
                  }}
                  className={errors.expiryDate ? "border-destructive" : ""}
                />
                {errors.expiryDate && (
                  <p className="text-sm text-destructive">{errors.expiryDate}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  name="cvc"
                  placeholder="123"
                  value={cardDetails.cvc}
                  onChange={(e) => {
                    const formatted = formatCVC(e.target.value)
                    setCardDetails((prev) => ({ ...prev, cvc: formatted }))
                  }}
                  className={errors.cvc ? "border-destructive" : ""}
                />
                {errors.cvc && (
                  <p className="text-sm text-destructive">{errors.cvc}</p>
                )}
              </div>
            </div>
        </CardContent>
      </Card>
      )}

      {selectedPaymentMethod === "paypal" && (
        <Card>
          <CardHeader>
            <CardTitle>PayPal</CardTitle>
            <CardDescription>You will be redirected to PayPal to complete your payment</CardDescription>
          </CardHeader>
        </Card>
      )}

      {selectedPaymentMethod === "bank" && (
        <Card>
          <CardHeader>
            <CardTitle>Bank Transfer</CardTitle>
            <CardDescription>You will receive our bank details via email</CardDescription>
          </CardHeader>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
              <div className="flex justify-between">
            <span>Lodge: {bookingDetails.lodge?.name || 'N/A'}</span>
            <span>£{bookingDetails.lodge?.price || 0}</span>
                </div>
          <div className="flex justify-between">
            <span>Nights: {bookingDetails.nights}</span>
            <span>£{(bookingDetails.lodge?.price || 0) * bookingDetails.nights}</span>
              </div>
            {bookingDetails.extras && bookingDetails.extras.length > 0 && (
              <>
                <Separator />
              <div className="space-y-2">
                <p className="font-medium">Extras:</p>
                {bookingDetails.extras.map((extra) => (
                  <div key={extra.id} className="flex justify-between">
                      <span>{extra.name}</span>
                      <span>£{extra.price}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          {bookingDetails.discountApplied && (
            <>
            <Separator />
              <div className="flex justify-between text-green-600">
                <span>Discount Applied</span>
                <span>-10%</span>
              </div>
            </>
          )}
            <Separator />
          <div className="flex justify-between font-medium">
              <span>Total</span>
            <span>£{calculateTotal()}</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={acceptTerms}
          onCheckedChange={(checked) => {
              setAcceptTerms(checked as boolean)
            if (errors.terms) {
                setErrors((prev) => ({ ...prev, terms: undefined }))
            }
          }}
        />
          <label
            htmlFor="terms"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I accept the terms and conditions
          </label>
        </div>
        {errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}

      <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
          Back
        </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Continue"}
        </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentDetails

