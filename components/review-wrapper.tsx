// "use server"
import { useEffect, useState } from "react";
import ReviewCard from "./cards/review-card";
import { fetchPropertyReviews } from "@/lib/api";

export default function ReviewList({lodge}: any) {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  const handleFetch = async () => {
    try {
        const reviews = await fetchPropertyReviews(lodge.id);
        console.log(reviews)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (lodge) {
    //   const lodgeId = lodge.id;
      handleFetch();
    }
  }, []);

  if (testimonials.length === 0) {
    return <></>;
  }
  return (
    <div className="flex flex-wrap justify-center my-16 gap-4">
      {testimonials.map((testimonial: any, indx: number) => (
        <ReviewCard testimonial={testimonial} key={indx} />
      ))}
    </div>
  );
}
