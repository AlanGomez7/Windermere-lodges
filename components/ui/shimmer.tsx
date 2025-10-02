"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function Shimmer() {
  return (
    <Card className="overflow-hidden w-full max-w-3xl flex flex-col sm:flex-row border shadow-md border-emerald-200 animate-pulse">
      {/* Image placeholder */}
      <CardHeader className="relative w-full sm:w-[280px] h-[220px] sm:h-auto shrink-0">
        <div className="w-full h-full bg-gray-200 rounded-md" />
      </CardHeader>

      {/* Content placeholder */}
      <CardContent className="p-4 flex flex-col justify-between w-full">
        <div className="flex flex-col gap-3">
          {/* Title */}
          <div className="h-6 w-2/3 bg-gray-200 rounded" />

          {/* Address */}
          <div className="h-4 w-1/2 bg-gray-200 rounded" />

          {/* Details (icons + text) */}
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mt-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-5 w-16 bg-gray-200 rounded-full" />
            ))}
          </div>

          {/* Price + Button */}
          <div className="pt-3 gap-2 flex md:flex-col items-start">
            <div className="h-6 w-24 bg-gray-200 rounded" />
            <div className="h-9 w-32 bg-gray-200 rounded mt-2" />
          </div>
        </div>
      </CardContent>

      {/* Rating */}
      <CardFooter className="relative hidden sm:block">
        <div className="absolute top-3 right-3 h-6 w-14 bg-gray-200 rounded-full" />
      </CardFooter>
    </Card>
  );
}
