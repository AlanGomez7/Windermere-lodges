"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StripePaymentSkeleton() {
  return (
    <section className="p-3 lg:p-16 mb-5 min-h-screen flex justify-center">
      <div className="container flex justify-between gap-8">
        {/* Lodge details card skeleton */}
        <div className="w-[500px] hidden lg:block">
          <Card className="flex-col gap-8 bg-[#F6F9F8] p-3">
            {/* Image placeholder */}
            <Skeleton className="h-64 w-full rounded-lg" />

            <CardContent className="p-0 pt-6">
              <div className="flex flex-col gap-3">
                {/* Lodge title */}
                <Skeleton className="h-5 w-3/4 rounded-md" />
                {/* Lodge address */}
                <Skeleton className="h-4 w-1/2 rounded-md" />
              </div>

              {/* Pricing breakdown */}
              <div className="flex flex-col gap-3 mt-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <Skeleton className="h-3 w-1/3 rounded-md" />
                    <Skeleton className="h-3 w-1/4 rounded-md" />
                  </div>
                ))}

                {/* Total */}
                <div className="flex justify-between mt-5">
                  <Skeleton className="h-4 w-1/3 rounded-md" />
                  <Skeleton className="h-4 w-1/4 rounded-md" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stripe payment form skeleton */}
        <div className="flex-1 lg:pl-16 flex flex-col gap-5">
          {/* Section title */}
          <Skeleton className="h-6 w-1/2 rounded-md" />

          {/* Payment form container */}
          <Skeleton className="h-[400px] w-full rounded-xl" />

          {/* Pay button */}
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>
    </section>
  );
}
