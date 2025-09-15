"use client";

import { useEffect, useState } from "react";
import { fetchLodgeComments } from "@/lib/api";
import ReviewCard from "./cards/review-card";


export default function ReviewList({ lodgeId }: { lodgeId: string }) {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    fetchLodgeComments(lodgeId).then(setComments);
  }, [lodgeId]);

  if (comments.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center my-16 gap-4">
      {comments.map((testimonial) => (
        <ReviewCard testimonial={testimonial}/>
      ))}
    </div>
  );
}
