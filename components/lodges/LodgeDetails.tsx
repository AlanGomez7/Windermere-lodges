"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../footer";
import { PageHeader } from "../page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn, findDays, ratingsInfo } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { ChatbotButton } from "@/components/chatbot/chatbot-button";
import RatingsAndReviews from "./ratings-and-reviews";

import { useAppContext } from "@/app/context/context";
import { checkAvailableLodges } from "@/lib/api";
import { GuestSelector } from "../booking/guest-selector";
import AboutModal from "../ui/about-modal";
import ReviewList from "../review-wrapper";
import Link from "next/link";
import KnowMore from "../ui/know-more";

import { Icons } from "../ui/icons";
import ListingModal from "../ui/listings-modal";
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
  "House rules": "calendarClock",
  "Cancellation Policy": "ban",
  "Safety & Property": "wrench",
};

function Gallery({
  images,
  lodgeName,
  lodgeId,
}: {
  lodgeId: string;
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
        <Link href={`/gallery?id=${lodgeId}`}>
          <Button className="absolute  right-3 bottom-3 bg-gray-100 hover:bg-gray-200 text-black rounded px-3 text-sm z-10 font-light">
            Show all images
          </Button>
        </Link>
        {/* Modal/Lightbox */}
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
  const { searchParams, setSearchParams } = useAppContext();
  const [showAmenities, setShowAmenities] = useState(false);

  const { dates, guests } = searchParams;

  const [diff, setDiff] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState(false);
  const [aboutDialog, setAboutDialog] = useState(false);

  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 5); // add 5 days
    return today;
  });

  const [avgRating, totalNoOfReviews] = ratingsInfo(lodge.comments);

  useEffect(() => {
    if (dates) {
      setCheckInDate(dates.from);
      setCheckOutDate(dates.to);
    }

    const nights = findDays(checkInDate, checkOutDate);
    console.log(nights)
    setDiff(nights);
    return;
  }, [lodge , checkInDate, checkOutDate]);

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

    setAvailability(true);
    setSearchParams(params);
    toast.success("Lodge available");
    setLoading(false);
  };

  const handleBooking = () => {
    localStorage.setItem("order", JSON.stringify(searchParams));
    router.push("/booking");
  };

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
                  <span className="text-lg">{avgRating}★</span>
                </div>
                <div className="text-xs">
                  <p className="font-semibold">Very Good</p>
                  <p>{totalNoOfReviews} ratings</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <Gallery
                images={lodge.images}
                lodgeName={lodge.name}
                lodgeId={lodge.id}
              />
            </div>
            <div className="w-full md:w-96">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold">
                      &pound;{lodge.price}.00
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
                        <span>&pound;{diff * lodge.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Cleaning fee</span>
                        <span>&pound;{lodge.cleaning_fee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pets fee</span>
                        <span>
                          &pound;{searchParams.guests.pets * lodge.pets_fee}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-2">
                        <span>Total Payment</span>
                        <span>
                          &pound;
                          {lodge.price * diff +
                            lodge.cleaning_fee +
                            searchParams.guests.pets * lodge.pets_fee}
                        </span>
                      </div>
                    </div>
                  )}

                  {diff && !availability ? (
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
                    <Button
                      className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 text-base"
                      onClick={handleBooking}
                    >
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

            {/* About */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About {lodge.name}</h2>
              <p className="text-gray-700 line-clamp-3">{lodge.description}</p>
              <Button
                variant={"secondary"}
                className="mt-6 p-6 text-lg hover:bg-gray-200 rounded-lg"
                onClick={() => setAboutDialog(true)}
              >
                Show more
              </Button>
            </div>

            <AboutModal
              showDialog={aboutDialog}
              setShowDialog={setAboutDialog}
              about={lodge.description}
            />

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What we offer</h2>
              <div className="flex space-x-6 pb-4">
                {lodge.features
                  .slice(0, 3)
                  .map((amenity: string, i: number) => {
                    const iconKey = Object.keys(amenityIconMap).find((key) =>
                      amenity.toLowerCase().includes(key.toLowerCase())
                    );
                    // const iconSrc = iconKey ? amenityIconMap[iconKey] : null;

                    // if (amenity.startsWith("+")) {
                    //   return (
                    //     <div
                    //       key={i}
                    //       className="flex items-center space-x-2 flex-shrink-0"
                    //     >
                    //       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    //         <span className="text-sm font-semibold">
                    //           {amenity.split(" ")[0]}
                    //         </span>
                    //       </div>
                    //       <span className="text-gray-700">
                    //         {amenity.split(" ").slice(1).join(" ")}
                    //       </span>
                    //     </div>
                    //   );
                    // }
                    return (
                      <div
                        key={i}
                        className="flex items-center space-x-2 flex-shrink-0"
                      >
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    );
                  })}
                <Button
                  variant={"secondary"}
                  onClick={() => setShowAmenities(true)}
                >
                  Show all {lodge.features.length} amenities
                </Button>
              </div>
            </div>

            <ListingModal
              showDialog={showAmenities}
              setShowDialog={setShowAmenities}
              value={[{ title: "Amenities", data: lodge.features }]}
            />

            {/* Rating & Review */}

            <RatingsAndReviews lodge={lodge} user={session} />

            <ReviewList lodgeId={lodge && lodge?.id} />

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
            <div className="mb-8 mt-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Rules & Policies
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    label: "House rules",
                    value: "Check in after 3 pm & check out before 10 am",
                    data: [],
                  },
                  {
                    label: "Cancellation Policy",
                    value: "Free cancellation for 48 hours.",
                    data: [],
                  },
                  {
                    label: "Safety & Property",
                    value: `${lodge.guests} guests maximum`,
                    data: [],
                  },
                ].map((policy: any, indx) => {
                  return <KnowMore policy={policy} key={indx} />;
                })}
                {/* <ListingModal /> */}
              </div>
            </div>
            {/* FAQ (accordion) */}
          </div>
        </div>
      </>
      <Footer />
      <ChatbotButton />
    </>
  );
}
