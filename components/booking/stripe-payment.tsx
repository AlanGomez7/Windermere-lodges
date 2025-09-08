"use client";

import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./checkout";
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
  console.log(bookingDetails);

  const [nights, setNights] = useState<number>(0);
  const [amount, setAmount] = useState();

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
    const price = findAmount();
    setAmount(price);
    setNights(nights);
  }, []);

  const findAmount = () => {
    let amount;
    if (nights) {
      amount =
        bookingDetails.lodge.price * nights +
        bookingDetails?.lodge.cleaning_fee +
        bookingDetails?.guests.pets * bookingDetails.lodge.pets_fee;
    }

    return amount;
  };

  const handleContinue = () => {};

  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  return (
    <section
      className={`p-16 mb-5 min-h-screen flex justify-center ${
        isActive ? "block" : "hidden"
      }`}
    >
      <div className="container flex justify-center gap-8 flex-col lg:flex-row">
        {/* <div className="w-[500px] shadow-lg">
            Payment secured with stripe
        </div> */}
        <div className="w-[500px]">
          <Card className="flex-col gap-8 ">
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

            <CardHeader className="flex p-0 pt-8">
              <div className="flex justify-between items-start w-full">
                <CardTitle className="text-lg lg:text-xl font-bold">
                  {bookingDetails.lodge.nickname}
                </CardTitle>
              </div>
              <CardDescription>{bookingDetails.lodge.address}</CardDescription>
            </CardHeader>

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
            {/* <CardFooter></CardFooter> */}
          </Card>
          <div className="w-full mt-8">
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount:
                  (bookingDetails.lodge.price * nights +
                    bookingDetails?.lodge.cleaning_fee +
                    bookingDetails?.guests.pets *
                      bookingDetails.lodge.pets_fee) *
                  100,
                currency: "gbp",
              }}
            >
              <CheckoutPage
                setCurrentStep={setCurrentStep}
                amount={
                  (bookingDetails.lodge.price * nights +
                    bookingDetails?.lodge.cleaning_fee +
                    bookingDetails?.guests.pets *
                      bookingDetails.lodge.pets_fee)
                }
              />
            </Elements>
          </div>
        </div>
      </div>
    </section>
  );
}
