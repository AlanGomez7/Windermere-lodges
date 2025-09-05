"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"
import gsap from "gsap"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "London, UK",
    image: "",
    rating: 5,
    text: "Absolutely stunning location and impeccable service. The lodge exceeded all our expectations. We'll definitely be back!",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Manchester, UK",
    image: "",
    rating: 5,
    text: "Perfect getaway spot. The amenities were top-notch and the views were breathtaking. Highly recommend!",
  },
  {
    id: 3,
    name: "Emma Williams",
    location: "Edinburgh, UK",
    image: "",
    rating: 5,
    text: "Our family had an amazing time. The lodge was spacious, clean, and had everything we needed. Great location for exploring.",
  },
  {
    id: 4,
    name: "David Clark",
    location: "Bristol, UK",
    image: "",
    rating: 5,
    text: "This was our third stay at Windermere Lodges, and it just keeps getting better. The attention to detail and quality of the accommodations is outstanding.",
  },
  {
    id: 5,
    name: "Olivia Parker",
    location: "York, UK",
    image: "",
    rating: 5,
    text: "We brought our whole family and had an amazing time. The kids loved exploring the grounds, and we loved the peace and luxury of our lodge.",
  },
]

export const Testimonials = () => {
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const testimonialCards = slider.querySelectorAll(".testimonial-card");
    if (testimonialCards.length === 0) return;

    const totalWidth = Array.from(testimonialCards).reduce(
      (width, card) => width + (card as HTMLElement).offsetWidth + 24,
      0
    );

    const clones = Array.from(testimonialCards).map((card) => card.cloneNode(true));
    clones.forEach((clone) => slider.appendChild(clone));

    const animation = gsap.to(slider, {
      x: -totalWidth,
      duration: 30,
      ease: "linear",
      repeat: -1,
    });

    const pauseAnimation = () => animation.pause();
    const resumeAnimation = () => animation.resume();

    slider.addEventListener("mouseenter", pauseAnimation);
    slider.addEventListener("mouseleave", resumeAnimation);

    return () => {
      slider.removeEventListener("mouseenter", pauseAnimation);
      slider.removeEventListener("mouseleave", resumeAnimation);
      animation.kill();
    };
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-8">Guest Testimonials</h2>
        <div ref={sliderRef} className="flex gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="testimonial-card flex-shrink-0 w-[350px]"
            >
              <CardHeader className="flex flex-row items-center gap-4 p-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} fetchPriority="high"/>
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

