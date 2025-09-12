"use client";

import { Star, X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import ReviewModal from "../ui/review-modal";
import { isLodgeBeenBooked } from "@/lib/api";
import { useSession } from "next-auth/react";
import { ratingsInfo } from "@/lib/utils";
import ReviewBreakDown from "./reviews/review-breakdown";

export default function RatingsAndReviews({
  user,
  lodge,
}: {
  user: any;
  lodge: any;
}) {
  const [isOrdered, setIsOrdered] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleFetchData = async (userId: string) => {
    const isOrdered = await isLodgeBeenBooked(userId, lodge?.id);
    if (isOrdered) {
      setIsOrdered(true);
    }
  };

  const [avgRating, totalNoOfReviews] = ratingsInfo(lodge.comments);

  useEffect(() => {
    if (userId) {
      handleFetchData(userId);
    }
  }, [lodge, userId]);

  const [showDialog, setShowDialog] = useState<boolean>(false);

  const ratingSummary = {
    average: avgRating,
    label: "Very Good",
    total: totalNoOfReviews,
    stars: new Array(avgRating).fill(''),
    breakdown: [
      { stars: 5, label: "Excellent", count: 100, color: "bg-amber-400" },
      { stars: 4, label: "Very Good", count: 74, color: "bg-amber-400" },
      { stars: 3, label: "Good", count: 53, color: "bg-amber-400" },
      { stars: 2, label: "Average", count: 10, color: "bg-amber-400" },
      { stars: 1, label: "Poor", count: 13, color: "bg-amber-400" },
    ],
  };

  // const maxCount = Math.max(...ratingSummary.breakdown.map((b) => b.count));

  // needs serious rework after booking is sorted

  return (
    <>
      <div className="border border-b-2 p-8 rounded-xl">
        <ReviewBreakDown lodgeId={lodge.id}/>
      </div>

      <div className="flex justify-between mt-10">
        {!user || !isOrdered ? (
          <></>
        ) : (
          <>
            <h2 className="text-md font-bold mb-4">Send us your feedback</h2>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => setShowDialog(true)}
            >
              Rate Us
            </Button>
          </>
        )}
      </div>

      <ReviewModal
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        id={lodge.id}
        lodgeName={lodge.nickname}
      />
    </>
  );
}
