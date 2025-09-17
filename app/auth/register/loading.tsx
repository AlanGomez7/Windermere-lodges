import { Skeleton } from "@/components/ui/skeleton";

export default function Loader() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="relative pt-32 pb-20 flex items-center justify-center">
        <Skeleton className="absolute inset-0 h-full w-full" />
        <div className="container mx-auto px-4 text-center text-white z-10">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>
      </div>
      {/* Login form skeleton */}
      // components/auth/login-form-skeleton.tsx
      <div className="space-y-6">
        {/* Error message placeholder */}
        <div className="flex justify-center">
          <Skeleton className="h-5 w-40" />
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
        </div>

        {/* Password field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
        </div>

        {/* Button */}
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      {/* Footer skeleton */}
      <div className="border-t mt-10 py-6">
        <div className="container mx-auto px-4">
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </main>
  );
}
