"use client";

import { useRouter } from "next/navigation";
import { X, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentError({
  showDialog,
  setShowDialog,
}: {
  showDialog: boolean;
  setShowDialog: (val: boolean) => void;
}) {
  const router = useRouter();

  return showDialog && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 p-8 text-center">
        {/* Close button */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={() => setShowDialog(false)}
        >
          {/* <X className="w-6 h-6" /> */}
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed
        </h2>
        <p className="text-gray-600 mb-1">
          Oops! Something went wrong while processing your payment.
        </p>
        <p className="text-gray-600 mb-6">
          Don’t worry, we’re here with you. Please try again.
        </p>

        {/* Redirect Button */}
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg"
          onClick={() => router.back()}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}
