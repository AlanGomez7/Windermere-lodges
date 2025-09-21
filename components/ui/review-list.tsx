"use client"
import { useState } from "react";
import ReviewCard from "../cards/review-card";

export default function ReviewList({ reviews }: { reviews: any }) {
  const [initialReviews, setInitialReviews] = useState(reviews);

  const handleDelete = (id: string) => {
    setInitialReviews((prev:any) => prev.filter((review:any) => review.id !== id));
  };

  return (
    <div className="lg:p-6 space-y-6 bg-white min-h-full">
      <div className="flex gap-6 flex-wrap justify-center">
        {initialReviews.length > 0 ? (
          initialReviews.map((testimonial: any, id: number) => (
            <ReviewCard testimonial={testimonial} key={id} isUser={true} onDelete={handleDelete}/>
          ))
        ) : (
          <>No review yet</>
        )}
      </div>
    </div>
  );
}
