"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/booking/date-picker";
import { GuestSelector } from "@/components/booking/guest-selector";
import { LodgeSelector } from "@/components/booking/lodge-selector";
import type { DateRange } from "react-day-picker";
import type { Lodge } from "@/types/lodge";
import { checkAvailableLodges } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/context";

interface SearchParams {
  dates: DateRange | undefined;
  guests: {
    adults: number;
    children: number;
  };
  lodge: Lodge | undefined;
}

type AvailabilityResponse = {
  ok: boolean;
  data: any[];
  included: any[];
  message?: string;
};

export const BookingSection = ({ lodges }: { lodges: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    searchParams,
    setSearchParams,
    setIsLodgeAvailable,
    setProperties,
    properties,
  } = useAppContext();

  useEffect(() => {
    setProperties(lodges);
  }, []);


  const handleSearch = async () => {
    setLoading(true);
    const response = await checkAvailableLodges(searchParams);

    if (!response.ok) {
      setIsLodgeAvailable(false);

      toast.error(response?.message ?? "Something went wrong");
      setLoading(false);
      return;
    }

    setIsLodgeAvailable(true);
    router.push(`/our-lodges/${searchParams.lodge?.refNo}`);
    setLoading(false);
  };

  // ?no_of_guests=${searchParams.guests}&checkIn=${fromDate}&checkOut=${toDate}

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Find Your Perfect Lodge
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DateRangePicker
              onChange={(dates) => setSearchParams({ ...searchParams, dates })}
            />

            <GuestSelector
              onChange={(guests) =>
                setSearchParams({ ...searchParams, guests })
              }
            />

            <LodgeSelector
              properties={properties}
              onChange={(lodge) => setSearchParams({ ...searchParams, lodge })}
            />

            <Button
              onClick={handleSearch}
              className="h-full bg-emerald-600 hover:bg-emerald-700"
              disabled={loading}
              name="check availability"
            >
              {loading ? "Checking avalability" : "Search Availability"}
            </Button>
          </div>

          {/* <div className="mt-8 text-center">
            <Link href="/our-lodges">
              <Button variant="link" className="text-emerald-600 hover:text-emerald-700">
                View all our luxury lodges →
              </Button>
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
};
