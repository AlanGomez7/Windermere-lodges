import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ShimmerHero() {
  return (
    <div className="relative min-h-[860px] flex items-center justify-center overflow-hidden bg-gray-200">
      {/* Background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite]" />

      {/* Slider Controls (disabled state) */}
      <button
        disabled
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 text-white rounded-full p-2 opacity-40 cursor-not-allowed"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>
      <button
        disabled
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 text-white rounded-full p-2 opacity-40 cursor-not-allowed"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Dots shimmer */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="w-3 h-3 rounded-full bg-white/40 animate-pulse"
          />
        ))}
      </div>

      {/* Content shimmer */}
      <div className="container mx-auto px-4 relative z-10 text-left">
        <div className="h-12 w-3/4 md:w-1/2 bg-white/40 rounded-lg animate-pulse mb-6" />
        <div className="h-6 w-2/3 md:w-1/3 bg-white/40 rounded-md animate-pulse mb-10" />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="h-14 w-48 bg-emerald-600/50 rounded-xl animate-pulse" />
          <div className="h-14 w-48 bg-white/40 rounded-xl animate-pulse hidden sm:block" />
        </div>
      </div>
    </div>
  );
}

/* Add shimmer keyframes in globals.css or tailwind.config.css */
