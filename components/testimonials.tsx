"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { fetchAllComments } from "@/lib/api";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Star } from "lucide-react";

export const Testimonials = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    setLoading(true);
    const handleFetch = async () => {
      try {
        const response = await fetchAllComments();
        setComments(response);
      } catch (err) {
        if (err instanceof Error) {
          setErr(err?.message);
        } else {
          setErr("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    handleFetch();
  }, []);

  useEffect(() => {
    if (!sliderRef.current || comments.length === 0) return;

    const slider = sliderRef.current;

    const setupAnimation = () => {
      if (animationRef.current) animationRef.current.kill();

      const totalWidth = slider.scrollWidth / 2; // only need half (since we duplicate)

      animationRef.current = gsap.to(slider, {
        x: `-=${totalWidth}`,
        duration: 25,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const current = parseFloat(x);
            return (current % -totalWidth) + "px";
          },
        },
      });
    };

    setupAnimation();
    window.addEventListener("resize", setupAnimation);

    const pause = () => animationRef.current?.pause();
    const resume = () => animationRef.current?.resume();
    slider.addEventListener("mouseenter", pause);
    slider.addEventListener("mouseleave", resume);

    return () => {
      window.removeEventListener("resize", setupAnimation);
      slider.removeEventListener("mouseenter", pause);
      slider.removeEventListener("mouseleave", resume);
      animationRef.current?.kill();
    };
  }, [comments]);

  if (loading) return <p className="text-center">Loading testimonials...</p>;
  if (err) return <p className="text-center text-red-500">{err}</p>;
  if (comments.length === 0) return null;

  // Duplicate testimonials for seamless loop
  const doubled = [...comments, ...comments];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-8">
          Guest Testimonials
        </h2>
        <div ref={sliderRef} className="flex gap-6 w-max py-5">
          {doubled.map((testimonial, idx) => (
            <Card
              key={`${testimonial.id}-${idx}`}
              className="testimonial-card flex-shrink-0 w-[90%] sm:w-[350px] shadow-md"
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
                <p className="text-gray-600 line-clamp-4">
                  {testimonial.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
