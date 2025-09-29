"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../footer";
import { PageHeader } from "../page-header";
import { Button } from "@/components/ui/button";
import {
  cn,
  findDays,
  formatDate,
  getAmenityIcon,
  ratingsInfo,
} from "@/lib/utils";
import { useRouter } from "next/navigation";

import { ChatbotButton } from "@/components/chatbot/chatbot-button";
import RatingsAndReviews from "./ratings-and-reviews";

import { useAppContext } from "@/app/context/context";
import AboutModal from "../ui/about-modal";
import ReviewList from "../review-wrapper";
import Link from "next/link";
import KnowMore from "../ui/know-more";

import { Icons } from "../ui/icons";
import ListingModal from "../ui/listings-modal";
import { MapPin } from "lucide-react";
import { DateRange } from "react-day-picker";
import PirceDetails from "./price-details";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { VisuallyHidden } from "../ui/visually-hidden";

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
    <div className="flex flex-col gap-0">
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
      <div className="flex gap-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent w-full pr-3 py-2">
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
  const { searchParams } = useAppContext();
  const [showAmenities, setShowAmenities] = useState(false);

  const { dates } = searchParams;

  const [diff, setDiff] = useState<number | null>(null);

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [aboutDialog, setAboutDialog] = useState(false);

  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 3); // add 5 days
    return today;
  });

  const [avgRating, totalNoOfReviews] = ratingsInfo(lodge.comments);

  useEffect(() => {
    if (dates) {
      setDate(dates.from);
      setCheckOutDate(dates.to);
    }

    const nights = findDays(date?.from, date?.to);
    setDiff(nights);
    return;
  }, [lodge, date, checkOutDate]);

  const [openCalendar, setOpenCalendar] = React.useState<
    "checkin" | "checkout" | null
  >(null);

  React.useEffect(() => {
    if (!open) return;

    const handleScroll = () => setOpenCalendar(null);
    window.addEventListener("scroll", handleScroll, true);

    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [openCalendar]);

  const router = useRouter();

  return (
    <>
      <PageHeader
        title={lodge.name}
        description={lodge.address}
        backgroundImage={lodge.images[0]}
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-18 relative">
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
              <p className="text-sm text-gray-600 flex pt-4">
                <MapPin className="mr-2 h-5 w-5 text-emerald-400 flex-shrink-0" />

                {lodge.address}
              </p>
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

        <div className="flex flex-col md:flex-row gap-3  md:gap-6">
          <div className="flex-1">
            <Gallery
              images={lodge.images}
              lodgeName={lodge.name}
              lodgeId={lodge.id}
            />

            <div className="md:hidden">
              <PirceDetails
                diff={diff}
                lodge={lodge}
                searchParams={searchParams}
              />
            </div>

            <div className="mt-8">
              {/* Amenities */}
              <div className="my-16">
                <h2 className="text-2xl font-bold mb-4">What we offer</h2>
                <div className="flex pb-4 md:flex-row flex-col gap-4">
                  {lodge.features
                    .slice(0, 4)
                    .map((amenity: string, i: number) => {
                      // Find matching amenity key
                      const iconKey = amenity.toLocaleLowerCase();
                      const amenityIconKey = getAmenityIcon(iconKey);

                      return (
                        <div
                          key={i}
                          className="flex items-center space-x-2 flex-shrink-0 px-5 py-3"
                        >
                          <Image
                            src={amenityIconKey}
                            alt={""}
                            width={22}
                            height={22}
                          />
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      );
                    })}
                </div>
                <Button
                  variant={"secondary"}
                  onClick={() => setShowAmenities(true)}
                  className="mt-5 w-full md:w-52 font-semibold"
                >
                  Show all {lodge.features.length} amenities
                </Button>
              </div>

              {/* About */}

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About {lodge.name}</h2>
                <p className="text-gray-700 line-clamp-6 leading-relaxed">
                  {lodge.description}
                </p>
                <Button
                  variant={"secondary"}
                  className="mt-6 p-6 text- mdhover:bg-gray-200 rounded-lg w-full md:w-28 font-semibold"
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

              <ListingModal
                showDialog={showAmenities}
                setShowDialog={setShowAmenities}
                value={[{ title: "Amenities", data: lodge.features }]}
              />

              {/* Rating & Review */}

              <div className="my-12">
                <RatingsAndReviews lodge={lodge} user={session} />
              </div>

              <div className="flex md:flex-wrap overflow-x-auto my-16 gap-4">
                <ReviewList lodgeId={lodge && lodge?.id} />
              </div>

              {/* Location */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <iframe
                  src={`https://www.google.com/maps?q=${lodge.latitude},${lodge.longitude}&hl=en&z=14&output=embed`}
                  width="100%"
                  height="350"
                  loading="lazy"
                  className="rounded-xl border"
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
                      showDetails: true,

                      data: [
                        {
                          title: "Checking in and out",
                          data: [
                            "Check in after 15:00",
                            "Check out before 10:00",
                            "Self check-in with lockbox",
                          ],
                        },

                        {
                          title: "During your stay",

                          data: [
                            "Pets allowed",
                            "No parties or events",
                            "No commercial photography",
                            "No smoking",
                            // "Before you leave",
                            // "Throw rubbish away",
                          ],
                        },
                        {
                          title: "Before you leave",
                          data: [
                            "Throw rubbish away",
                            "Turn things off",
                            "Lock up",
                          ],
                        },
                      ],
                    },
                    {
                      label: "Safety & Property",
                      value: `Avoid surprises by looking over these important details about your Host's property.`,
                      showDetails: true,

                      data: [
                        {
                          title: "Safety considerations",
                          data: ["Not suitable for infants (under 2 years)"],
                        },

                        {
                          title: "Safety devices",
                          data: ["Carbon monoxide alarm", "Smoke alarm"],
                        },
                      ],
                    },
                    {
                      label: "Cancellation Policy",
                      value: "Free cancellation for 48 hours.",
                      showDetails: Boolean(searchParams.dates?.to) ?? false,
                      data: [
                        {
                          title: "Within 48 hours of booking",

                          data: [
                            "Get back 100% of what you paid.Partial refund if you cancel before 3:00 pm on 11 November. Get back 50% of every night. No refund of the service fee..Before",
                          ],
                        },
                        {
                          title: `Before ${formatDate(
                            searchParams.dates?.from
                          )} 3 pm`,
                          data: [
                            "Partial refund",
                            "Get back 50% of every night. No refund of the service fee.",
                          ],
                        },

                        {
                          title: `After ${formatDate(
                            searchParams.dates?.from
                          )} 3 pm`,

                          data: [
                            "No refund if you cancel after 3:00 pm on 11 November. This reservation is non-refundable..",
                          ],
                        },
                      ],
                    }
                  ].map((policy: any, indx) => {
                    return <KnowMore policy={policy} key={indx} />;
                  })}
                  {/* <ListingModal /> */}
                </div>
              </div>
              {/* FAQ (accordion) */}
            </div>
          </div>
          {/* desktop view details */}
          <div className="hidden md:block">
            <PirceDetails
              diff={diff}
              lodge={lodge}
              searchParams={searchParams}
            />
          </div>
        </div>
      </div>
      <Footer />
      <ChatbotButton />
    </>
  );
}
