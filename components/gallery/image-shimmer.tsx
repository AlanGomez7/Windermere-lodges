// components/ImageSkeleton.tsx
import React from "react"

export function ImageShimmer() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-xl bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  )
}
