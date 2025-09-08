"use client";

import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppContext } from "@/app/context/context";
import Image from "next/image";

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
  lodge: any;
  dates: any;
  guests: { adults: number; children: number; pets: number };
  nights: any;
}

interface GuestInformationProps {
  onContinue?: (contactInfo: ContactInfo) => void;
  onBack?: () => void;
  bookingDetails: BookingDetails;
  isActive: boolean;

  setCurrentStep: () => void;
}

export function GuestInformation({
  bookingDetails,
  isActive,
  setCurrentStep,
}: GuestInformationProps) {
  console.log(bookingDetails);

  const [nights, setNights] = useState<number | undefined>(0);

  const findDifference = () => {
    const date1 = new Date(bookingDetails?.dates.from);
    const date2 = new Date(bookingDetails?.dates.to);
    // Difference in milliseconds
    const diffMs = date2.getTime() - date1.getTime();

    // Convert ms to days (1000 ms * 60 sec * 60 min * 24 hr)
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    console.log(diffDays);
    return diffDays;
  };

  useEffect(() => {
    const nights = findDifference();
    setNights(nights);
  }, []);

  const { setOrderDetails } = useAppContext();

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
    if (contactInfo) {
      const missingFields = requiredFields.filter(
        (field) => !contactInfo[field]
      );
      if (missingFields.length > 0) {
        setError(
          `Please fill in the following fields: ${missingFields.join(", ")}`
        );
        return;
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo ? contactInfo.email : "")) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setCurrentStep();
    setOrderDetails(contactInfo);
  };

  return (
    <section
      className={`p-16 mb-5 min-h-screen flex justify-center ${
        isActive ? "block" : "hidden"
      }`}
    >
      <div className="container flex gap-8 flex-col lg:flex-row">
        <div className="w-[500px]">
          <Card>
            <div className="relative h-64 w-100">
              <Image
                src={bookingDetails.lodge.images[0] || "/placeholder.svg"}
                alt={bookingDetails.lodge.name}
                fill
                className="object-cover"
                priority
              />
              {bookingDetails.lodge.isNew && (
                <Badge className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-700">
                  New
                </Badge>
              )}
              {/* <div className="absolute bottom-4 left-4 flex items-center bg-white bg-opacity-80 px-2 py-1 rounded-full">
                <Star
                  className="h-4 w-4 text-yellow-500 mr-1"
                  fill="currentColor"
                />
                <span className="text-sm font-medium">4.1</span>
              </div> */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                £{bookingDetails.lodge.price}/night
              </div>
            </div>

            <CardHeader className="flex">
              <div className="flex justify-between items-start w-full">
                <CardTitle className="text-lg lg:text-xl font-bold">
                  {bookingDetails.lodge.nickname}
                </CardTitle>
              </div>
              <CardDescription>{bookingDetails.lodge.address}</CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span>{nights} Night</span>
                  <span>
                    {" "}
                    &pound;{nights && bookingDetails.lodge.price * nights}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{bookingDetails.guests.pets} Pets</span>
                  <span>
                    &pound;
                    {bookingDetails.guests.pets * bookingDetails.lodge.pets_fee}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cleaning fee</span>
                  <span> &pound;{bookingDetails?.lodge.cleaning_fee}</span>
                </div>
                <div className="flex justify-between font-bold text-md lg:text-lg mt-2">
                  <span>Total Payment</span>
                  <span>
                    &pound;
                    {nights &&
                      bookingDetails.lodge.price * nights +
                        bookingDetails?.lodge.cleaning_fee +
                        bookingDetails?.guests.pets *
                          bookingDetails.lodge.pets_fee}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">
                Guest Information
              </CardTitle>
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
                    value={contactInfo?.firstName}
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
                    value={contactInfo?.lastName}
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
                    value={contactInfo?.email}
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
                    value={contactInfo?.phone}
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
                  value={contactInfo?.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="city">City/Town</Label>
                  <Input
                    id="city"
                    name="city"
                    value={contactInfo?.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={contactInfo?.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={contactInfo?.country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={contactInfo?.specialRequests}
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

            <Button
              onClick={handleContinue}
              className="bg-teal-600 hover:bg-teal-700 w-full space-y-2"
            >
              PROCEED TO PAYMENT
            </Button>
        </div>
      </div>
    </section>
  );
}
