"use client";

import { useEffect, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useAppContext } from "@/app/context/context";
import { calculatePrices, findDays, findDiscountAmount } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { StableStripeElements } from "./stable-stripe-wrapper";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Stripe publishable key is not set in environment variables");
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripePayment({ auth }: { auth: any }) {
  const router = useRouter();
  const { orderDetails, appliedCoupon, details } = useAppContext();

  const bookingDetails = details;

  useEffect(() => {
    if (bookingDetails === undefined || orderDetails === undefined) {
      router.replace("/our-lodges");
      return;
    }
  }, [bookingDetails, orderDetails]);
  // Initialize Stripe

  const { nights, price, discount, amount } = useMemo(() => {
    if (!bookingDetails) return { nights: 0, price: 0, discount: 0, amount: 0 };

    const nights = findDays(bookingDetails.dates.from, bookingDetails.dates.to);
    const price = calculatePrices(bookingDetails.dates, bookingDetails.lodge);
    const discount = appliedCoupon
      ? price - findDiscountAmount(appliedCoupon, price)
      : 0;
    const amount =
      price +
      (bookingDetails.lodge.cleaning_fee +
        bookingDetails.guests.pets * bookingDetails.lodge.pets_fee) -
      discount;

    return { nights, price, discount, amount };
  }, [bookingDetails, appliedCoupon]);

  if (!bookingDetails || !orderDetails) {
    return null;
  }

  return (
    <section className="p-3 lg:p-16 mb-5 min-h-screen flex justify-center">
      <div className="container flex flex-col lg:flex-row justify-between gap-8">
        {/* Summary Card */}
        <div className="w-[500px] hidden lg:block">
          <Card className="p-6 bg-[#EDF6F4]">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={bookingDetails?.lodge?.images[0]}
                alt={bookingDetails?.lodge?.nickname}
                fill
                className="object-cover"
                priority
              />
              {bookingDetails?.lodge.isNew && (
                <Badge className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-700">
                  New
                </Badge>
              )}
            </div>

            <div className="flex flex-col w-full items-start gap-3 mt-3">
              <CardTitle className="text-lg lg:text-xl font-bold">
                {bookingDetails?.lodge.nickname}
              </CardTitle>
              <CardDescription>{bookingDetails?.lodge.address}</CardDescription>
            </div>

            <CardContent className="p-0 pt-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span>{nights} Nights</span>
                  <span>£{price}</span>
                </div>

                {bookingDetails?.guests.pets > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>{bookingDetails?.guests.pets} Pets</span>
                    <span>
                      £
                      {bookingDetails?.guests.pets *
                        bookingDetails?.lodge.pets_fee}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span>Cleaning fee</span>
                  <span>£{bookingDetails?.lodge.cleaning_fee}</span>
                </div>

                {appliedCoupon && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>Discount</span>
                      <span>- £{discount}</span>
                    </div>
                    <p className="text-green-700 text-sm py-3">
                      Coupon <strong>{appliedCoupon.code}</strong> applied (
                      {appliedCoupon.discountType === "PERCENTAGE"
                        ? `${appliedCoupon.discountValue}% off`
                        : `£${appliedCoupon.discountValue} off`}
                      )
                    </p>
                  </>
                )}

                <div className="flex justify-between font-bold text-lg pt-3 border-t">
                  <span>Total Payment</span>
                  <span>£{amount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stripe Payment Form */}
        <div className="flex-1 lg:pl-16">
          <StableStripeElements
            stripePromise={stripePromise}
            auth={auth}
            bookingDetails={bookingDetails}
            orderDetails={orderDetails}
            amount={amount}
          />
        </div>
      </div>
    </section>
  );
}
