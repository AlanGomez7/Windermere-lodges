"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useState, useRef, useEffect } from "react";
import { deleteComment } from "@/lib/api";
import toast from "react-hot-toast";

export default function ReviewCard({
  testimonial,
  isUser,
  onDelete,
}: {
  testimonial: any;
  isUser: boolean;
  onDelete?: (id: string) => void;
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

  const handleDelete = async () => {
    try {
      const response = await deleteComment(testimonial.id);
      if (response) {
        setShowConfirmation(false);
        if (onDelete) {
          onDelete(testimonial.id);
        }
        toast.success("Your comment has been removed successfully");
        return;
      }
      toast.error("Failed to remove comment");
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove comment");
    }
  };

  return (
    <>
      <Card
        key={testimonial.id}
        className="testimonial-card flex-shrink-0 w-[350px]"
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
            <h3 className="font-semibold">
              {isUser
                ? testimonial.property.nickname
                : testimonial.visitor.name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-1">
              {isUser ? testimonial.visitor.name : testimonial.visitor.address}
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

          {/* Ref applied to detect clamping */}
          <p
            ref={contentRef}
            className={`text-gray-600 ${isHidden ? "line-clamp-4" : ""}`}
          >
            {testimonial.content}
          </p>
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
        {isClamped && (
          <Button variant="link" onClick={() => setIsHidden(!isHidden)}>
            {isHidden ? "Show more" : "Show less"}
          </Button>
        )}
      </Card>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50  confirm-dialog ">
          <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
              <div className="md:flex items-center">
                <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                  <i className="bx bx-error text-3xl">&#9888;</i>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <p className="font-bold">Warning!</p>
                  <p className="text-sm text-gray-700 mt-1">
                    You will lose all of your data by deleting this. This action
                    cannot be undone.
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  onClick={handleDelete}
                  id="confirm-delete-btn"
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  id="confirm-cancel-btn"
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
