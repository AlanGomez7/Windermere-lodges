import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useState, useRef, useEffect } from "react";

export default function ReviewCard({ testimonial }: { testimonial: any }) {
  const [isHidden, setIsHidden] = useState(true);
  const [isClamped, setIsClamped] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  // Detect if content is overflowing/clamped
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // check if actual scrollable height > rendered height
    const isOverflowing = el.scrollHeight > el.clientHeight;
    setIsClamped(isOverflowing);
  }, [testimonial.content]);

  return (
    <Card
      key={testimonial.id}
      className="testimonial-card flex-shrink-0 w-[350px] shadow-md"
    >
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar className="h-12 w-12 flex rounded-full justify-center items-center">
          <AvatarImage
            src={testimonial.visitor.avatar}
            alt={testimonial.visitor.name}
          />
          <AvatarFallback className="font-bold text-xl text-white bg-emerald-500 ">
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
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>

        {/* Ref applied to detect clamping */}
        <p
          ref={contentRef}
          className={`text-gray-600 ${isHidden ? "line-clamp-4" : ""}`}
        >
          {testimonial.content}
        </p>
      </CardContent>

      {/* Only show button if clamped */}
      {isClamped && (
        <Button variant="link" onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? "Show more" : "Show less"}
        </Button>
      )}
    </Card>
  );
}
