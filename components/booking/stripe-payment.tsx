"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./checkout";
import { findDays } from "@/lib/utils";
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

export function StripePayment({
  bookingDetails,
  isActive,
  setCurrentStep,
}: GuestInformationProps) {
  const { orderDetails, searchParams } = useAppContext();


  const nights = findDays(searchParams.dates.from, searchParams.dates.to);

  let amount = 1;
  
  if (nights) {
    amount =
      bookingDetails.lodge.price * nights +
      bookingDetails?.lodge.cleaning_fee +
      bookingDetails?.guests.pets * bookingDetails.lodge.pets_fee;
  }

  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  if (!orderDetails) {
    return null;
  }

  return (
    <section
      className={`p-3 lg:p-16 mb-5 min-h-screen flex justify-center ${
        isActive ? "block" : "hidden"
      }`}
    >
      <div className="container flex justify-between gap-8">
        {/* <div className="w-[500px] shadow-lg">
            Payment secured with stripe
        </div> */}
        <div className="w-[500px] hidden lg:block">
          <Card className="flex-col gap-8 bg-[#EDF6F4] p-3">
            <div className="relative h-64 w-100 p-0">
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
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                £{bookingDetails.lodge.price}/night
              </div>
            </div>

            <div className="flex flex-col w-full items-start gap-3 mt-3">
              <CardTitle className="text-lg lg:text-xl font-bold">
                {bookingDetails.lodge.nickname}
              </CardTitle>
              <CardDescription className="">
                {bookingDetails.lodge.address}
              </CardDescription>
            </div>

            <CardContent className="p-0 pt-6">
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
                <div className="flex justify-between text-md lg:text-lg mt-2">
                  <span>Total Payment</span>
                  <span className="font-bold">
                    &pound;
                    {amount}
                  </span>
                </div>
              </div>
            </CardContent>
            {/* <CardFooter></CardFooter> */}
          </Card>
        </div>

        <div className="flex-1 lg:pl-16">
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: amount * 100,
              currency: "gbp",
            }}
          >
            <CheckoutPage
              isActive={isActive}
              bookingDetails={bookingDetails}
              setCurrentStep={setCurrentStep}
              orderDetails={orderDetails}
              amount={amount}
            />
          </Elements>
        </div>
      </div>
    </section>
  );
}
