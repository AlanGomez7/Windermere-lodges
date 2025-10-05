"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getAmenityIcon } from "@/lib/utils";
import { Star, X } from "lucide-react";
import ReviewBreakDown from "../lodges/reviews/review-breakdown";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export default function ReviewListModal({
  setShowDialog,
  id,
  showDialog,
  selectedId,
  reviews,
}: {
  setShowDialog: (value: boolean) => void;
  showDialog: boolean;
  id: string;
  selectedId: string;
  reviews: any[];
}) {
  console.log(selectedId);
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

      // Scroll to selected review when modal opens
      if (selectedId && selectedRef.current[selectedId]) {
        setTimeout(() => {
          selectedRef.current[selectedId]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          // Add highlight effect
          gsap.fromTo(
            selectedRef.current[selectedId],
            { backgroundColor: "#FEF3C7" }, // amber-100
            {
              backgroundColor: "white",
              duration: 2,
              ease: "power2.out",
              delay: 0.5,
            }
          );
        }, 500);
      }
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
  }, [showDialog, selectedId]);

  if (!showDialog) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/40 z-50"
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

        <p className="text-xl py-4">Ratings & Reviews</p>

        {/* Scrollable content area */}
        <div className="overflow-y-auto max-h-[70vh]">
          {reviews.map((review) => (
            <div
              className="py-6 px-3"
              key={review.id}
              ref={(el) => {
                selectedRef.current[review.id] = el;
              }}
            >
              <div className="flex gap-4 py-4 bottom-0">
                <Avatar className="h-10 w-10 flex rounded-full justify-center items-center">
                  <AvatarImage
                    src={review.visitor.avatar}
                    alt={review.visitor.name}
                  />
                  <AvatarFallback className="font-bold text-lg text-white bg-emerald-600 ">
                    {review.visitor.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{review.visitor.name}</h3>
                  <div className="flex mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 text-[#FF9E2A] fill-[#FF9E2A]"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
