import LodgeDetailsPage from "@/app/our-lodges/[id]/page";
import { submitReview } from "@/lib/api";
import { Star, X } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./textarea";

export default function ReviewModal({
  showDialog,
  setShowDialog,
  lodgeName,
  id,
}: {
  showDialog: boolean;
  setShowDialog: (value: boolean) => void;
  lodgeName: string;
  id:string
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

    const response = await submitReview({ rating, review, lodgeId:id });
    setShowDialog(false)
  };

  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <>
            <div
              className="bg-white rounded-2xl justify-center shadow-2xl pl-14 pr-8 py-10 w-1/2 max-w-2xl relative overflow-y-auto max-h-screen border border-gray-200"
              style={{ scrollbarGutter: "stable" }}
            >
              <button
                type="button"
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
                onClick={() => setShowDialog(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col place-items-center w-full">
                <h2 className="text-2xl text-center font-semibold mb-8 text-gray-900 flex items-center gap-3">
                  {lodgeName}
                </h2>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="cursor-pointer">
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleClick(value)}
                        className="focus:outline-none"
                      >
                        <Star
                          className="w-10 h-10 transition-colors"
                          strokeWidth={2}
                          fill={value <= rating ? "rgb(13 148 136)" : "none"}
                          color={
                            value <= rating
                              ? "rgb(13 148 136)"
                              : "rgb(209 213 219)"
                          }
                        />
                      </button>
                    </label>
                  ))}
                </div>
              </div>
              <Textarea
                name="name"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share us about the experience you had"
                required
                className="min-h-40 w-full border rounded-lg px-4 py-2 placeholder:text-lg mt-8"
              />

              <button
                onClick={handleSubmit}
                // disabled={createPropertyState.loading || div.images.length !== 4}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-bold text-lg mt-16 shadow flex items-center justify-center gap-2"
              >
                {/* {createPropertyState.loading && <Loader2 className="w-5 h-5 animate-spin" />} */}
                Submit your feedback
              </button>
            </div>
          </>
        </div>
      )}
    </>
  );
}
