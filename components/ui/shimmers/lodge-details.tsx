"use client";

import { Card, CardContent } from "@/components/ui/card";

function SkeletonBox({ className }: { className: string }) {
  return <div className={`bg-gray-200 animate-pulse rounded ${className}`} />;
}

export default function LodgeDetailsSkeleton() {
  return (
    <>
      <div className="relative pt-32 pb-20 flex items-center justify-center">
        {/* Background shimmer instead of image */}
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />

        <div className="container mx-auto px-4 text-center text-white z-10">
          {/* Title shimmer */}
          <SkeletonBox className="h-10 w-64 mx-auto mb-4" />
          {/* Description shimmer */}
          <SkeletonBox className="h-5 w-96 mx-auto" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 mt-18">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-4">
            <SkeletonBox className="h-10 w-10 rounded-lg" />
            <div>
              <SkeletonBox className="h-6 w-40 mb-2" />
              <SkeletonBox className="h-4 w-60" />
            </div>
          </div>
          <SkeletonBox className="h-12 w-32 rounded-lg mt-9" />
        </div>

        {/* Main Gallery + Sidebar */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Gallery */}
          <div className="flex-1">
            <SkeletonBox className="w-full h-[400px] rounded-lg" />
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonBox
                  key={i}
                  className="w-28 h-20 rounded-md flex-shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-96 rounded-md transition-all">
            <Card>
              <CardContent className="p-6 space-y-4">
                <SkeletonBox className="h-8 w-40" />
                <SkeletonBox className="h-5 w-24" />

                <div className="grid grid-cols-2 gap-4">
                  <SkeletonBox className="h-12 w-full rounded-md" />
                  <SkeletonBox className="h-12 w-full rounded-md" />
                </div>

                <SkeletonBox className="h-4 w-32" />
                <SkeletonBox className="h-12 w-full rounded-md" />
                <SkeletonBox className="h-10 w-full rounded-md" />
                <SkeletonBox className="h-12 w-full rounded-md" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-10 space-y-4">
          <SkeletonBox className="h-6 w-60" />
          <SkeletonBox className="h-4 w-full" />
          <SkeletonBox className="h-4 w-3/4" />
          <SkeletonBox className="h-10 w-32 rounded-lg" />
        </div>

        {/* Amenities */}
        <div className="mt-10 space-y-4">
          <SkeletonBox className="h-6 w-60" />
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonBox key={i} className="h-6 w-24 rounded-md" />
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-10 space-y-4">
          <SkeletonBox className="h-6 w-60" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <SkeletonBox className="h-4 w-1/2" />
              <SkeletonBox className="h-4 w-full" />
              <SkeletonBox className="h-4 w-3/4" />
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="mt-10 space-y-4">
          <SkeletonBox className="h-6 w-60" />
          <SkeletonBox className="h-[350px] w-full rounded-xl" />
        </div>

        {/* Rules */}
        <div className="mt-10 space-y-4">
          <SkeletonBox className="h-6 w-60" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <SkeletonBox className="h-4 w-32" />
                <SkeletonBox className="h-4 w-full" />
                <SkeletonBox className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
