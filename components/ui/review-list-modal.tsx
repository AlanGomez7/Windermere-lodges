"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getAmenityIcon } from "@/lib/utils";
import { X } from "lucide-react";

export default function ReviewListModal({
  setShowDialog,
  
  showDialog,
  reviews,
}: {
  setShowDialog: (value: boolean) => void;
  showDialog: boolean;
  reviews:any[],
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showDialog) {
      // Animate in
      gsap.fromTo(
        sheetRef.current,
        { y: "100%" },
        { y: 0, duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      // Animate out
      gsap.to(sheetRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [showDialog]);

  if (!showDialog) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setShowDialog(false)}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="
          fixed bottom-0 left-0 right-0 z-50
          bg-white rounded-t-2xl shadow-2xl border border-gray-200
          w-full max-h-[90vh] sm:max-h-fit p-6
          sm:inset-0 sm:m-auto sm:max-w-2xl sm:rounded-2xl sm:p-10
          flex flex-col
        "
        style={{ scrollbarGutter: "stable", transform: "translateY(100%)" }}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={() => setShowDialog(false)}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Scrollable content area */}
        <div className="overflow-y-auto max-h-[70vh] pr-2">
    
        </div>
      </div>
    </>
  );
}
