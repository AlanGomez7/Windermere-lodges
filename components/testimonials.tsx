"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { fetchAllComments } from "@/lib/api";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Star } from "lucide-react";
import ReactCookiebot from "react-cookiebot"
const reactCookiebotId  =  process.env.NEXT_PUBLIC_REACT_COOKIE
console.log(reactCookiebotId)

export const Testimonials = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
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
      // Respect reduced motion
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }

      // Reset transform before measuring and re-creating
      gsap.set(slider, { x: 0 });

      if (prefersReduced) {
        return; // leave content static
      }

      const totalWidth = slider.scrollWidth / 2; // duplicated content

      // Keep speed consistent across widths
      const pixelsPerSecond = 80; // tune speed as desired
      const duration = Math.max(5, totalWidth / pixelsPerSecond);

      animationRef.current = gsap.to(slider, {
        x: `-=${totalWidth}`,
        duration,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: (x: string) => {
            const current = parseFloat(x);
            return (current % -totalWidth) + "px";
          },
        },
      });
    };

    // Initial build
    setupAnimation();

    // Rebuild on window resize
    const onWindowResize = () => setupAnimation();
    window.addEventListener("resize", onWindowResize);

    // Rebuild on element size/content changes
    let resizeRaf: number | null = null;
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
            resizeRaf = requestAnimationFrame(setupAnimation);
          })
        : null;
    ro?.observe(slider);

    // Pause/Resume interactions (mouse and touch)
    const pause = () => animationRef.current?.pause();
    const resume = () => animationRef.current?.resume();
    slider.addEventListener("mouseenter", pause);
    slider.addEventListener("mouseleave", resume);
    slider.addEventListener("touchstart", pause, { passive: true });
    slider.addEventListener("touchend", resume, { passive: true });
    slider.addEventListener("touchcancel", resume, { passive: true });

    return () => {
      window.removeEventListener("resize", onWindowResize);
      slider.removeEventListener("mouseenter", pause);
      slider.removeEventListener("mouseleave", resume);
      slider.removeEventListener("touchstart", pause);
      slider.removeEventListener("touchend", resume);
      slider.removeEventListener("touchcancel", resume);
      ro?.disconnect();
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
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
      <ReactCookiebot domainGroupId={reactCookiebotId} />

      <div className="container mx-auto px-4 overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-8">
          Guest Testimonials
        </h2>
        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 w-max py-5 will-change-transform"
        >
          {doubled.map((testimonial, idx) => (
            <Card
              key={idx}
              className="testimonial-card flex-shrink-0 w-[350px] shadow-sm border"
            >
              <CardHeader className="flex flex-row items-center gap-4 p-4 ">
                <Avatar className="h-12 w-12 flex  bg-emerald-400 rounded-full justify-center items-center">
                  <AvatarImage
                    src={testimonial.visitor.avatar}
                    alt={testimonial.visitor.name}
                  />
                  <AvatarFallback className="font-bold text-xl text-white">
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
                <p className="text-gray-600">" {testimonial.content} "</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
