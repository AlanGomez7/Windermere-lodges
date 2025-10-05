"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PageHeader } from "../page-header";
import { Button } from "@/components/ui/button";
import { findDays, formatDate, getAmenityIcon, ratingsInfo } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

import RatingsAndReviews from "./ratings-and-reviews";

import { useAppContext } from "@/app/context/context";
import AboutModal from "../ui/about-modal";
import ReviewList from "../review-wrapper";
import KnowMore from "../ui/know-more";

import { Icons } from "../ui/icons";
import ListingModal from "../ui/listings-modal";
import { Info, MapPin } from "lucide-react";
import { DateRange } from "react-day-picker";
import PirceDetails from "./price-details";
import Gallery from "../gallery/lodge-gallery";

export function LodgeDetails({ lodge, session }: { lodge: any; session: any }) {
  const { searchParams } = useAppContext();
  const { dates } = searchParams;
  const router = useRouter();

  const [showAmenities, setShowAmenities] = useState(false);
  const [aboutDialog, setAboutDialog] = useState(false);
  const [diff, setDiff] = useState<number | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 3); // add 5 days
    return today;
  });
  const [openCalendar, setOpenCalendar] = React.useState<
    "checkin" | "checkout" | null
  >(null);

  const [avgRating, totalNoOfReviews] = ratingsInfo(lodge.comments);

  useEffect(() => {
    setShowBanner(!isAvailable && isFromSearch);
  }, []);

  useEffect(() => {
    if (dates) {
      setDate(dates.from);
      setCheckOutDate(dates.to);
    }

    const nights = findDays(date?.from, date?.to);
    setDiff(nights);
    return;
  }, [lodge, date, checkOutDate]);

  React.useEffect(() => {
    if (!open) return;

    const handleScroll = () => setOpenCalendar(null);
    window.addEventListener("scroll", handleScroll, true);

    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [openCalendar]);

  const params = useSearchParams();
  const value1 = params.get("available");
  const value2 = params.get("isSearched");
  const isAvailable = value1 === "true";
  const isFromSearch = value2 === "true";

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

        {showBanner && (
          <div className="p-3 flex rounded-xl mb-4 bg-[#FFD3D3]">
            <Info />
            <p className="pl-5">
              Unfortunately, this lodge isn’t available on your chosen date.
              Please select an alternative date to continue your booking.
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-3  lg:gap-6">
          <div className="flex-1">
            <Gallery
              images={lodge.images}
              lodgeName={lodge.name}
              lodgeId={lodge.id}
            />

            <div className="lg:hidden">
              <PirceDetails
                diff={diff}
                lodge={lodge}
                setShowBanner={setShowBanner}
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
          {/* desktop view details */}
          <div className="hidden lg:block">
            <PirceDetails
              diff={diff}
              lodge={lodge}
              setShowBanner={setShowBanner}
            />
          </div>
        </div>
      </div>
    </>
  );
}
