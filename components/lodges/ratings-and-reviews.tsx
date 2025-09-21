"use client";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import ReviewModal from "../ui/review-modal";
import { isLodgeBeenBooked } from "@/lib/api";
import { useSession } from "next-auth/react";
import ReviewBreakDown from "./reviews/review-breakdown";

export default function RatingsAndReviews({
  user,
  lodge,
}: {
  user: any;
  lodge: any;
}) {
  const [isOrdered, setIsOrdered] = useState(false);
  const [refresh, setRefresh] = useState(0)

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleFetchData = async (userId: string) => {
    const isOrdered = await isLodgeBeenBooked(userId, lodge?.id);
    if (isOrdered) {
      setIsOrdered(true);
    }
  };

  useEffect(() => {
    if (userId) {
      handleFetchData(userId);
    }
  }, [lodge, userId, refresh]);

  const [showDialog, setShowDialog] = useState<boolean>(false);

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
        setRefresh={(prev:number)=>setRefresh(prev+1)}
      />
    </>
  );
}
