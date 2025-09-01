"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppContext } from "@/app/context/context";

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  specialRequests: string;
}

interface BookingDetails {
  contactInfo?: Partial<ContactInfo>;
  specialRequests?: string;
}

interface GuestInformationProps {
  onContinue?: (contactInfo: ContactInfo) => void;
  onBack?: () => void;
  bookingDetails: BookingDetails;
  isActive:boolean
  setCurrentStep:()=>void
}

export function GuestInformation({
  onContinue,
  onBack,
  bookingDetails,
  isActive,
  setCurrentStep
}: GuestInformationProps) {
  console.log(isActive)

  const {setOrderDetails} = useAppContext();

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: bookingDetails.contactInfo?.firstName ?? "",
    lastName: bookingDetails.contactInfo?.lastName ?? "",
    email: bookingDetails.contactInfo?.email ?? "",
    phone: bookingDetails.contactInfo?.phone ?? "",
    address: bookingDetails.contactInfo?.address ?? "",
    city: bookingDetails.contactInfo?.city ?? "",
    postalCode: bookingDetails.contactInfo?.postalCode ?? "",
    country: bookingDetails.contactInfo?.country ?? "United Kingdom",
    specialRequests: bookingDetails.specialRequests ?? "",
  });

  const [error, setError] = useState("");
  const [marketing, setMarketing] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "phone"] as const;
    const missingFields = requiredFields.filter((field) => !contactInfo[field]);

    if (missingFields.length > 0) {
      setError(
        `Please fill in the following fields: ${missingFields.join(", ")}`
      );
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setCurrentStep()
    setOrderDetails(contactInfo);
  };

  return (
    <section className={`px-16 mb-5 min-h-screen flex justify-center ${isActive ? "block" : "hidden"}`}>
      <div className="container">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guest Information</CardTitle>
              <CardDescription>
                Please provide your contact details for the booking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={contactInfo.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={contactInfo.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={contactInfo.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="city">City/Town</Label>
                  <Input
                    id="city"
                    name="city"
                    value={contactInfo.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={contactInfo.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={contactInfo.country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={contactInfo.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Let us know if you have any special requirements or requests"
                  className="h-32"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketing"
                  checked={marketing}
                  onCheckedChange={(checked) =>
                    setMarketing(checked as boolean)
                  }
                />
                <Label
                  htmlFor="marketing"
                  className="text-sm font-normal cursor-pointer"
                >
                  I would like to receive special offers and updates from
                  Windermere Lodges
                </Label>
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
              {error}
            </div>
          )}

          <div className="flex justify-between">
            <Button onClick={onBack} variant="outline">
              Back
            </Button>
            <Button
              onClick={handleContinue}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Continue to Extras
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
