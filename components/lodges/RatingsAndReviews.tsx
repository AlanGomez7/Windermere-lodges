import { Star } from "lucide-react";

export default function RatingAndReviews() {

    const ratingSummary = {
      average: 4.0,
      label: "Very Good",
      total: 250,
      breakdown: [
        { stars: 5, label: "Excellent", count: 100, color: "bg-green-700" },
        { stars: 4, label: "Very Good", count: 74, color: "bg-green-600" },
        { stars: 3, label: "Good", count: 53, color: "bg-green-400" },
        { stars: 2, label: "Average", count: 10, color: "bg-orange-400" },
        { stars: 1, label: "Poor", count: 13, color: "bg-red-600" },
      ],
    };
    const maxCount = Math.max(...ratingSummary.breakdown.map((b) => b.count));
  return (
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
                <span className="ml-2 font-bold text-gray-700">{b.count}</span>
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
      <div className="bg-green-400">9909</div>
    </div>
  );
}
