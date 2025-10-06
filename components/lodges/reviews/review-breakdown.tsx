"use client";
import { fetchRatingData } from "@/lib/api";
import { normalizeRatings } from "@/lib/utils";
import { Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type RatingItem = { rating: number; count: number };

export default function ReviewBreakDown({ lodgeId }: { lodgeId: string }) {
  const [loading, setLoading] = useState(false);
  const [ratingInfo, setRatingInfo] = useState<RatingItem[]>([]);
  const [err, setErr] = useState("");

  const handleRatingFetch = async () => {
    try {
      setErr("");
      setLoading(true);
      const response = await fetchRatingData(lodgeId); // should return raw Prisma result
      if (response) {
        setRatingInfo(normalizeRatings(response)); // normalize 1–5
      }
    } catch (err) {
      setErr("Couldn't fetch reviews");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRatingFetch();
  }, [lodgeId]);

  // Compute average & total only when ratingInfo changes
  const { average, total } = useMemo(() => {
    if (ratingInfo.length === 0) return { average: 0, total: 0 };
    const totalRatings = ratingInfo.reduce((sum, r) => sum + r.count, 0);
    const weightedSum = ratingInfo.reduce(
      (sum, r) => sum + r.rating * r.count,
      0
    );
    return {
      total: totalRatings,
      average: totalRatings > 0 ? weightedSum / totalRatings : 0,
    };
  }, [ratingInfo]);

  const maxCount = Math.max(...ratingInfo.map((b) => b.count), 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 ">Rating & Reviews</h2>
      <div className="flex flex-col md:flex-row flex-wrap gap-10">
        {/* Summary Card */}
        <div className="flex items-center">
          <span className="flex-col text-black font-bold rounded-sm py-2 text-xl flex items-center gap-2">
            <div>{average.toFixed(1)}</div>
            {/* <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`inline-block w-3 h-4 ml-1 ${
                    index < Math.ceil(average)
                      ? "fill-emerald-600 text-emerald-600"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div> */}
          </span>
          <div className="flex flex-col justify-center ml-4">
            <span className="font-bold text-gray-800 text-sm leading-tight">
              {average >= 4.5
                ? "Excellent"
                : average >= 4
                ? "Very Good"
                : average >= 3
                ? "Good"
                : average >= 2
                ? "Average"
                : "Poor"}
            </span>
            <span className="text-sm text-green-700 leading-tight">
              {total} ratings
            </span>
          </div>
        </div>

        {/* Breakdown Bars */}
        {/* flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
          {[...ratingInfo].reverse().map((b, i) => (
            <div key={b.rating} className="flex flex-col items-center w-full">
              <div className="flex items-center gap-1 mb-1">
                <span className="font-bold text-gray-700">{b.rating}</span>
                <span className="text-gray-500">★</span>
                <span className="text-xs text-gray-700">
                  (
                  {b.rating === 5
                    ? "Excellent"
                    : b.rating === 4
                    ? "Very Good"
                    : b.rating === 3
                    ? "Good"
                    : b.rating === 2
                    ? "Average"
                    : "Poor"}
                  )
                  {/* {b?.rating}, {i} */}
                </span>

                <span className="ml-2 font-bold text-gray-700 text-xs">
                  {b.count}
                </span>
              </div>
              <div className="w-full h-1 rounded bg-gray-200 flex items-center">
                <div
                  className="bg-emerald-600 h-1 rounded"
                  style={{
                    width: `${maxCount ? (b.count / maxCount) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
