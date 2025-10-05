"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useState, useRef, useEffect } from "react";
import { deleteComment } from "@/lib/api";
import toast from "react-hot-toast";

export default function ReviewCard({
  testimonial,
  isUser,
  setShowDialog,
  showDialog,
  setSelectedId,
}: {
  testimonial: any;
  isUser: boolean;
  setSelectedId: (id: string) => void;
  onDelete?: (id: string) => void;
  setShowDialog?: (id: boolean) => void;
  showDialog?: boolean;
}) {
  const [isHidden, setIsHidden] = useState(true);
  const [isClamped, setIsClamped] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
    <>
      <Card
        key={testimonial.id}
        className="testimonial-card flex-shrink-0 w-[250px] shadow-lg relative py-5 px-1 border border-gray-200"
      >
        <CardContent className="h-[250px]">
          {/* Ref applied to detect clamping */}
          <p
            ref={contentRef}
            className={`text-sm text-gray-600 ${
              isHidden ? "line-clamp-4" : ""
            }`}
          >
            {testimonial.content}
          </p>
          {isClamped && (
            <Button
              variant="link"
              onClick={() => {
                setShowDialog && setShowDialog(!showDialog);
                setSelectedId(testimonial.id)
              }}
              className="p-0"
            >
              {isHidden ? "Show more" : "Show less"}
            </Button>
          )}
        </CardContent>

        {isUser && (
          <Button
            variant="link"
            className="text-red-800"
            onClick={() => setShowConfirmation(true)}
          >
            Delete
          </Button>
        )}

        {/* Only show button if clamped */}

        <CardFooter className="flex gap-4 p-4 absolute bottom-0">
          <Avatar className="h-10 w-10 flex rounded-full justify-center items-center">
            <AvatarImage
              src={testimonial.visitor.avatar}
              alt={testimonial.visitor.name}
            />
            <AvatarFallback className="font-bold text-lg text-white bg-emerald-600 ">
              {testimonial.visitor.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">
              {isUser
                ? testimonial.property.nickname
                : testimonial.visitor.name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-1">
              {isUser ? testimonial.visitor.name : testimonial.visitor.address}
            </p>
            <div className="flex mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 text-[#FF9E2A] fill-[#FF9E2A]"
                />
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>

      
    </>
  );
}
