"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../footer";
import { PageHeader } from "../page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Icons } from "../ui/icons";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "../ui/visually-hidden";
import { ChatbotButton } from "@/components/chatbot/chatbot-button";
import RatingsAndReviews from "./ratings-and-reviews";
import ReviewCard from "../review-card";
import Link from "next/link";
import { useAppContext } from "@/app/context/context";
import { checkAvailableLodges } from "@/lib/api";
import { GuestSelector } from "../booking/guest-selector";

const amenityIconMap: Record<string, string> = {
  "Lake Access": "/icons/water.png",
  Wifi: "/icons/wifi.png",
  "Shared Pool": "/icons/swim.png",
  "Washing Machine": "/icons/w_machine.png",
  "Hair Dryer": "/icons/dryer.png",
  Kitchen: "/icons/cook.png",
  TV: "/icons/tv.png",
};

const policyIconMap: Record<string, keyof typeof Icons> = {
  "Check-in & Check-out": "calendarClock",
  "Cancellation Policy": "ban",
  "Property Maintenance & Damage Policy": "wrench",
};

const amenitiesToDisplay = [
  "Lake Access",
  "Wifi",
  "Shared Pool",
  "Washing Machine",
  "Hair Dryer",
  "Kitchen",
  "TV",
  "+11 More",
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "London, UK",
    image: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "Absolutely stunning location and impeccable service. The lodge exceeded all our expectations. We'll definitely be back!",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Manchester, UK",
    image: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    text: "Perfect getaway spot. The amenities were top-notch and the views were breathtaking. Highly recommend!",
  },
  {
    id: 3,
    name: "Emma Williams",
    location: "Edinburgh, UK",
    image: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    text: "Our family had an amazing time. The lodge was spacious, clean, and had everything we needed. Great location for exploring.",
  },
  {
    id: 4,
    name: "David Clark",
    location: "Bristol, UK",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
    rating: 5,
    text: "This was our third stay at Windermere Lodges, and it just keeps getting better. The attention to detail and quality of the accommodations is outstanding.",
  },
  {
    id: 5,
    name: "Olivia Parker",
    location: "York, UK",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1887&auto=format&fit=crop",
    rating: 5,
    text: "We brought our whole family and had an amazing time. The kids loved exploring the grounds, and we loved the peace and luxury of our lodge.",
  },
];

function Gallery({
  images,
  lodgeName,
}: {
  images: string[];
  lodgeName: string;
}) {
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const total = images.length;
  const handlePrev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const handleNext = () => setCurrent((prev) => (prev + 1) % total);
  const handleThumbClick = (idx: number) => setCurrent(idx);
  const openModal = (idx: number) => {
    setCurrent(idx);
    setModalOpen(true);
  };

  // Keyboard navigation in modal
  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen, current]);

  return (
    <div className="flex gap-0">
      {/* Main Image with overlays */}
      <div className="relative flex-1 min-w-0">
        <Image
          src={images[current]}
          alt={lodgeName}
          width={800}
          height={500}
          className="object-cover w-full h-[400px] rounded-none"
          onClick={() => openModal(current)}
        />
        {/* Left Arrow */}
        {total > 1 && (
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 shadow-lg text-white rounded-full p-3 z-10"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="12" fill="#fff" />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="m15 19-7-7 7-7"
              />
            </svg>
          </button>
        )}
        {/* Right Arrow */}
        {total > 1 && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 shadow-lg text-white rounded-full p-3 z-10"
            onClick={handleNext}
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="12" fill="#fff" />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="m9 5 7 7-7 7"
              />
            </svg>
          </button>
        )}
        {/* View Larger Image Button */}
        <button
          className="absolute left-3 bottom-3 bg-white opacity-65 text-gray-800 rounded shadow px-3 py-2 text-sm flex items-center gap-2 border border-gray-200 hover:bg-gray-100 z-10 hover:opacity-80"
          onClick={() => openModal(current)}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
        {/* Image Count */}
        <div className="absolute right-3 bottom-3 bg-black/80 text-white rounded px-3 py-1 text-sm z-10 font-semibold">
          {current + 1} / {total}
        </div>
        {/* Modal/Lightbox */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-5xl p-0 bg-black/95 border-none flex flex-col items-center justify-center">
            <VisuallyHidden asChild>
              <DialogTitle>Gallery images for {lodgeName}</DialogTitle>
            </VisuallyHidden>
            {/* Add DialogTitle for accessibility, hidden visually */}
            <h2 id="gallery-dialog-title" className="sr-only">
              Gallery images for {lodgeName}
            </h2>
            <div
              className="relative w-full flex items-center justify-center"
              style={{ minHeight: 500 }}
            >
              {/* Left Arrow */}
              {total > 1 && (
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-20"
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              )}
              {/* Main Zoomed Image */}
              <Image
                src={images[current]}
                alt={lodgeName + "zoomed"}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] w-auto mx-auto rounded"
                draggable={false}
              />
              {/* Right Arrow */}
              {total > 1 && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-20"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              )}
              {/* Image Count */}
              <div className="absolute right-4 bottom-4 bg-black/80 text-white rounded px-3 py-1 text-sm z-20">
                {current + 1} / {total}
              </div>
            </div>
            {/* Thumbnails in Modal */}
            <div className="flex gap-2 mt-4 max-w-full overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img + idx}
                  className={`relative rounded overflow-hidden border-2 ${
                    idx === current
                      ? "border-emerald-600"
                      : "border-transparent"
                  }`}
                  onClick={() => handleThumbClick(idx)}
                  tabIndex={0}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={lodgeName + " thumbnail"}
                    width={80}
                    height={60}
                    className={`object-cover w-20 h-14 ${
                      idx === current ? "" : "opacity-80"
                    }`}
                  />
                  {idx === current && (
                    <span className="absolute inset-0 ring-2 ring-emerald-600 rounded pointer-events-none"></span>
                  )}
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Vertical Divider */}
      <div className="w-px bg-gray-200 mx-2" />
      {/* Thumbnails: single vertical column */}
      <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent w-40 pr-3 py-2">
        {(images.length > 0 ? images : ["/placeholder.jpg"]).map((img, idx) => (
          <button
            key={img + idx}
            className={`relative rounded overflow-hidden border-2 w-full min-h-[100px] aspect-[4/3] ${
              idx === current ? "border-emerald-600" : "border-transparent"
            }`}
            onClick={() => handleThumbClick(idx)}
            tabIndex={0}
            aria-label={`Show image ${idx + 1}`}
          >
            <Image
              src={img}
              alt={lodgeName + " thumbnail"}
              width={120}
              height={90}
              className={`object-cover w-full h-full ${
                idx === current ? "" : "opacity-80"
              }`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.jpg";
              }}
            />
            {idx === current && (
              <span className="absolute inset-0 ring-2 ring-emerald-600 rounded pointer-events-none"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function LodgeDetails({ lodge, session }: { lodge: any; session: any }) {
  console.log(lodge)
  const {
    searchParams,
    setSearchParams,
    isLodgeAvailable,
    setIsLodgeAvailable,
  } = useAppContext();

  const { dates, guests } = searchParams;

  const [diff, setDiff] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [, setLoading] = useState<boolean>(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());

  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 5); // add 5 days
    return today;
  });

  useEffect(() => {
    if (dates) {
      setCheckInDate(dates.from);
      setCheckOutDate(dates.to);
    }
    return;
  }, []);

  useEffect(() => {
    const nights = findDifference();
    setDiff(nights);
    setSearchParams({ ...searchParams, nights });
  }, [checkInDate, checkOutDate]);

  console.log(searchParams);

  const findDifference = () => {
    const date1 = Number(new Date(checkInDate ? checkInDate : ""));
    const date2 = Number(new Date(checkOutDate ? checkOutDate : ""));
    // Difference in milliseconds
    const diffMs = date2 - date1;
    // Convert ms to days (1000 ms * 60 sec * 60 min * 24 hr)
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSearch = async () => {
    setLoading(true);

    const params = {
      dates: {
        from: checkInDate,
        to: checkOutDate,
      },
      guests: guests,
      lodge,
    };
    const response = await checkAvailableLodges(params);

    if (!response.ok) {
      toast.error(response?.message ?? "Something went wrong");
      setLoading(false);
      return;
    }

    setIsLodgeAvailable(true);
    setSearchParams(params);
    toast.success("Lodge available");
    setLoading(false);
  };


  const handleBooking = ()=>{ 
    localStorage.setItem("order", JSON.stringify(searchParams));
    router.push("/booking")
  }

  const router = useRouter();

  return (
    <>
      <>
        <PageHeader
          title={lodge.name}
          description={lodge.address}
          backgroundImage={lodge.images[0]}
        />
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 mt-18">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 bg-white"
                onClick={() => router.push("/our-lodges")}
              >
                <Icons.chevronLeft className="h-6 w-6" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-gray-800">
                  {lodge.nickname}
                </h1>
                <p className="text-sm text-gray-600">{lodge.address}</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex-shrink-0">
              <div className="flex items-center gap-2 rounded-lg bg-green-100 p-2 text-green-800">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-lg">{lodge.rating}</span>
                  <span className="text-lg">4★</span>
                </div>
                <div className="text-xs">
                  <p className="font-semibold">Very Good</p>
                  <p>254 ratings</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <Gallery images={lodge.images} lodgeName={lodge.name} />
            </div>
            <div className="w-full md:w-96">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold">
                      ${lodge.price}.00
                    </span>
                    <span className="text-sm text-gray-500">/per night</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm text-gray-500">Check-In</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkInDate && "text-muted-foreground"
                            )}
                          >
                            {checkInDate ? (
                              format(checkInDate, "LLL dd, yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkInDate}
                            onSelect={(date) => {
                              setCheckInDate(date);

                              if (date) {
                                const checkout = new Date(date);
                                checkout.setDate(checkout.getDate() + 3); // 👈 add 3 days
                                setCheckOutDate(checkout);
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm text-gray-500">Check-Out</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkOutDate && "text-muted-foreground"
                            )}
                          >
                            {checkOutDate ? (
                              format(checkOutDate, "LLL dd, yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            checkIn={checkInDate}
                            mode="single"
                            selected={checkOutDate}
                            onSelect={setCheckOutDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <p className="text-xs mb-3">
                    Minimum booking is for 3 nights
                  </p>

                  <GuestSelector
                    lodge={lodge}
                    onChange={(guests) =>
                      setSearchParams({ ...searchParams, guests })
                    }
                  />

                  <div className="border-t my-4" />

                  {diff && (
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-sm">
                        <span>{diff} Night</span>
                        <span>${diff * lodge.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Cleaning fee</span>
                        <span>${lodge.cleaning_fee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pets fee</span>
                        <span>${searchParams.guests.pets*lodge.pets_fee}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-2">
                        <span>Total Payment</span>
                        <span>${(lodge.price * diff) + lodge.cleaning_fee + (searchParams.guests.pets*lodge.pets_fee)}</span>
                      </div>
                    </div>
                  )}

                  {diff && !isLodgeAvailable ? (
                    <>
                      <Button
                        onClick={() => handleSearch()}
                        className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 text-base"
                        disabled={loading || diff < 3}
                      >
                        Check Availability
                      </Button>
                    </>
                  ) : (
                      <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 text-base" onClick={handleBooking}>
                        Book Now
                      </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          {/* All sections always visible except FAQ */}
          <div className="mt-8">
            {/* Amenities */}
            {/* <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <div className="flex space-x-6 overflow-x-auto pb-4">
            {amenitiesToDisplay.map((amenity: string, i: number) => {
                const iconKey = Object.keys(amenityIconMap).find((key) =>
                amenity.toLowerCase().includes(key.toLowerCase())
                );
                const iconSrc = iconKey ? amenityIconMap[iconKey] : null;
                
                if (amenity.startsWith("+")) {
                  return (
                    <div
                      key={i}
                      className="flex items-center space-x-2 flex-shrink-0"
                      >
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-semibold">
                          {amenity.split(" ")[0]}
                        </span>
                        </div>
                        <span className="text-gray-700">
                        {amenity.split(" ").slice(1).join(" ")}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    className="flex items-center space-x-2 flex-shrink-0"
                  >
                    {iconSrc && (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Image
                          src={iconSrc}
                          alt={amenity}
                          width={24}
                          height={24}
                        />
                      </div>
                    )}
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div> */}
            {/* About */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About {lodge.name}</h2>
              <p className="text-gray-700">{lodge.description}</p>
            </div>
            {/* Rating & Review */}
            <RatingsAndReviews lodge={lodge} user={session} />

            <div className="flex flex-wrap justify-center my-16 gap-4">
              {testimonials.map((testimonial: any, indx: number) => (
                <ReviewCard testimonial={testimonial} key={indx} />
              ))}
            </div>
            {/* Location */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <iframe
                src="https://www.google.com/maps/embed?..."
                width="100%"
                height="350"
                className="rounded-xl border"
                loading="lazy"
              ></iframe>
            </div>

            {/* Rules and Policies */}
            {/* <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Rules & Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lodge.policies.map((policy: any, i: number) => {
                const IconComponent = Icons[
                  policyIconMap[policy.label]
                ] as Icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    {IconComponent && (
                      <IconComponent className="h-8 w-8 text-emerald-600 mt-1" />
                    )}
                    <div>
                      <h3 className="font-bold text-sm">{policy.label}</h3>
                      <p className="text-gray-800 font-light">{policy.value}</p>
                    </div>
                  </div>
                  );
              })}
            </div>
          </div> */}
            {/* FAQ (accordion) */}
            {/* <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">FAQ</h2>
            <div>
            {lodge.faqs.map((faq: any, i: number) => (
                <div key={i} className="mb-2 border-b">
                  <button
                    className="w-full text-left font-semibold py-3 flex justify-between items-center focus:outline-none"
                    onClick={() => setShowFAQ(i === showFAQ ? null : i)}
                  >
                    {faq.q}
                    <span
                      className={`ml-2 transition-transform ${
                        showFAQ === i ? "rotate-90" : ""
                      }`}
                      >
                      ▶
                    </span>
                    </button>
                  {showFAQ === i && (
                    <div className="text-gray-700 pb-3 pl-2">{faq.a}</div>
                  )}
                </div>
              ))}
              </div>
          </div> */}
          </div>
        </div>
      </>
      <Footer />
      <ChatbotButton />
    </>
  );
}
