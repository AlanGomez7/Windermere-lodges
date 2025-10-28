"use client";

import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function GuestInformationSkeleton() {
  return (
    <section className="p-2 lg:px-28 mb-5 min-h-screen flex justify-center">
      <div className="container flex gap-8 flex-col lg:flex-row self-start animate-pulse">
        {/* Left side: form skeleton */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">
                <Skeleton className="h-8 w-48" />
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Name fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Email + phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Address */}
              <Skeleton className="h-10 w-full" />

              {/* City / Postal / Country */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Skeleton className="h-10 w-full col-span-2" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Special Requests */}
              <Skeleton className="h-32 w-full rounded-md" />
            </CardContent>

            <CardFooter>
              <Skeleton className="h-12 w-full rounded-md" />
            </CardFooter>
          </Card>
        </div>

        {/* Right side: booking summary skeleton */}
        <div className="basis-3/6 space-y-4">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">
              <Skeleton className="h-8 w-40" />
            </CardTitle>
          </CardHeader>

          <Card className="bg-[#EDF6F4] p-4 space-y-4">
            {/* Lodge image */}
            <div className="relative h-64 w-full rounded-md overflow-hidden">
              <Skeleton className="h-full w-full" />
            </div>

            {/* Lodge details */}
            <CardHeader className="px-0">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-5 w-64" />
            </CardHeader>

            <CardContent className="p-0 space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
              <hr />
              <div className="flex justify-between text-md lg:text-xl">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
