import LodgeDetailsPage from "@/app/our-lodges/[id]/page";
import { submitReview } from "@/lib/api";
import { Star, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "./textarea";
import gsap from "gsap";

export default function ReviewModal({
  showDialog,
  setShowDialog,
  lodgeName,
  setRefresh,
  id,
}: {
  showDialog: boolean;
  setShowDialog: (value: boolean) => void;
  lodgeName: string;
  setRefresh: (val: number) => void;
  id: string;
}) {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const [err, setErr] = useState(false);
  const handleClick = (value: number) => {
    if (rating === value) {
      setRating(0); // deselect if the same star is clicked
    } else {
      setRating(value);
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setErr(true);
      return;
    }

    // const result = addReviewsAndRating()

    await submitReview({ rating, review, lodgeId: id });
    setRefresh(1);
    setShowDialog(false);
  };

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

  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 sm:px-6">
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
            {/* Close Button */}
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowDialog(false)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center w-full">
              <h2 className="text-xl sm:text-2xl text-center font-semibold mb-6 sm:mb-8 text-gray-900 flex items-center gap-2 sm:gap-3">
                {lodgeName}
              </h2>
              {err && <p className="text-sm text-red-500 mb-4">{err}</p>}

              {/* Star Rating */}
              <div className="flex gap-2 sm:gap-3 mb-6">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleClick(value)}
                    className="focus:outline-none"
                  >
                    <Star
                      className="w-8 h-8 sm:w-10 sm:h-10 transition-colors"
                      strokeWidth={2}
                      fill={value <= rating ? "rgb(13 148 136)" : "none"}
                      color={
                        value <= rating ? "rgb(13 148 136)" : "rgb(209 213 219)"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Textarea */}
            <Textarea
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience"
              required
              className="w-full min-h-[120px] sm:min-h-[150px] text-base sm:text-lg border rounded-lg px-4 py-3 mt-4 sm:mt-6"
            />

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="
            w-full bg-teal-600 hover:bg-teal-700 
            disabled:bg-gray-400 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg mt-6 sm:mt-8 
            shadow flex items-center justify-center gap-2"
            >
              Submit your feedback
            </button>
          </div>
        </div>
      )}
    </>
  );
}
