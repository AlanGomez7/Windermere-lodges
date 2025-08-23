"use client"

import { Star, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

export default function RatingsAndReviews({ lodge }: { lodge: any }) {
  console.log(lodge)
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('')
  const ratingSummary = {
    average: 4.0,
    label: "Very Good",
    total: 250,
    breakdown: [
      { stars: 5, label: "Excellent", count: 100, color: "bg-amber-400" },
      { stars: 4, label: "Very Good", count: 74, color: "bg-amber-400" },
      { stars: 3, label: "Good", count: 53, color: "bg-amber-400" },
      { stars: 2, label: "Average", count: 10, color: "bg-amber-400" },
      { stars: 1, label: "Poor", count: 13, color: "bg-amber-400" },
    ],
  };
  const maxCount = Math.max(...ratingSummary.breakdown.map((b) => b.count));

    const handleClick = (value: number) => {
    if (rating === value) {
      setRating(0) ; // deselect if the same star is clicked
    } else {
      setRating(value);
    }
  };

  const handleSubmit = ()=>{
    console.log(review, rating, lodge?.id)
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Rating & Reviews</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* Summary Card */}
          <div className="flex items-center min-w-[220px]">
            <span className="bg-[#059669] text-white font-bold rounded-sm px-5 py-2 text-lg flex items-center gap-2">
              {ratingSummary.average.toFixed(1)}
              <Star className="inline-block w-3 h-4 fill-white text-white ml-1" />
            </span>
            <div className="flex flex-col justify-center ml-4">
              <span className="font-bold text-gray-800 text-md leading-tight">
                {ratingSummary.label}
              </span>
              <span className="text-sm text-green-700 leading-tight">
                {ratingSummary.total} ratings
              </span>
            </div>
          </div>
          {/* Breakdown Bars */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
            {ratingSummary.breakdown.map((b) => (
              <div key={b.stars} className="flex flex-col items-center w-full">
                <div className="flex items-center gap-1 mb-1">
                  <span className="font-bold text-gray-700">{b.stars}</span>
                  <span className="text-gray-500">★</span>
                  <span className="text-xs text-gray-500">({b.label})</span>
                  <span className="ml-2 font-bold text-gray-700">
                    {b.count}
                  </span>
                </div>
                <div className="w-full h-2 rounded bg-gray-200 flex items-center">
                  <div
                    className={`${b.color} h-2 rounded`}
                    style={{ width: `${(b.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8 flex justify-between">
        <h2 className="text-md font-bold mb-4">Send us your feedback</h2>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setShowDialog(true)}
        >
          Rate Us
        </Button>
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
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
                {lodge.headerTitle}
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
              onChange={(e)=>setReview(e.target.value)}
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
        </div>
      )}
    </>
  );
}
