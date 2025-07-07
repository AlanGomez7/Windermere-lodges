"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import gsap from "gsap"

const sliderImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1920&auto=format&fit=crop"
]

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (heroRef.current && textRef.current) {
      // Animate hero section
      gsap.fromTo(heroRef.current, { opacity: 0.7 }, { opacity: 1, duration: 1.5 })

      // Animate text elements
      gsap.fromTo(
        textRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
      )
    }
    // Auto-scroll logic
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [current])

  const nextSlide = () => setCurrent((prev) => (prev + 1) % sliderImages.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)

  return (
    <div ref={heroRef} className="relative min-h-[860px] flex items-center justify-center overflow-hidden">
      {/* Slider Images */}
      {sliderImages.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${idx === current ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
          style={{ backgroundImage: `url('${img}')` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}

      {/* Slider Controls */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-20"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-20"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {sliderImages.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-white' : 'bg-white/40'} border border-white`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-left" ref={textRef}>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Experience Luxury in the <br/> Heart of the Lake District
        </h1>
        <p className="text-xl md:text-2xl text-white mb-20 mx-auto">
          Discover our exclusive collection of premium lodges <br/> with breathtaking views and exceptional amenities
        </p>
        <div className="flex flex-col sm:flex-row justify-start gap-4">
          <Link href="/our-lodges">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
              Explore Our Lodges
            </Button>
          </Link>
          <Link href="/booking">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-emerald-600 hover:bg-white hover:text-emerald-800 px-8 py-6 text-lg"
            >
              Book Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div> */}
    </div>
  )
}

