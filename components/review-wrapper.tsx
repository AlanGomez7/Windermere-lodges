"use client";

import { useEffect, useState } from "react";
import { fetchLodgeComments } from "@/lib/api";
import ReviewCard from "./cards/review-card";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Star } from "lucide-react";

export default function ReviewList({ lodgeId }: { lodgeId: string }) {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    fetchLodgeComments(lodgeId).then(setComments);
  }, [lodgeId]);

  if (comments.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center my-16 gap-4">
      {comments.map((testimonial) => (
        <Card
          key={testimonial.id}
          className="testimonial-card flex-shrink-0 w-[350px] shadow-md"
        >
          <CardHeader className="flex flex-row items-center gap-4 p-4">
            <Avatar className="h-12 w-12 flex bg-gray-50 rounded-full justify-center items-center">
              <AvatarImage
                src={testimonial.visitor.avatar}
                alt={testimonial.visitor.name}
              />
              <AvatarFallback className="font-bold text-xl">
                {testimonial.visitor.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{testimonial.visitor.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-1">
                {testimonial.visitor.address}
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-gray-600 line-clamp-4">{testimonial.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
