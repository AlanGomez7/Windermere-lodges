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
import { data } from "@/data/lodges";
import { date } from "zod";
import { format } from "date-fns";

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

  const { searchParams, setSearchParams, setIsLodgeAvailable, setProperties } =
    useAppContext();

  useEffect(() => {
    setProperties(lodges);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const response = await checkAvailableLodges(searchParams, 3, 14);

    if (!response.ok) {
      setIsLodgeAvailable(false);
      toast.error(response?.message ?? "Something went wrong");
      setLoading(false);
      return;
    }

    if (response.ok && response.message) {
      toast.success(response?.message);
    }

    const query = new URLSearchParams({ ids: response.data.join(",") });
    console.log(query);
    router.push(`/our-lodges?${query.toString()}`);

    setLoading(false);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Find Your Perfect Lodge
          </h2>
          {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 */}
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all">
            <div className={"flex flex-col md:flex-row basis-2/4 gap-6"}>
              <DateRangePicker
                onChange={(dates) => {
                  if (dates?.from && dates?.to) {
                    const from = format(dates?.from, "yyyy-MM-dd");
                    const to = format(dates?.to, "yyyy-MM-dd");
                    setSearchParams({ ...searchParams, dates: {from, to} });
                  }

                }}
              />
            </div>

            <div className="basis-1/4 flex-grow-0">
              <GuestSelector
                onChange={(guests) =>
                  setSearchParams({ ...searchParams, guests })
                }
              />
            </div>

            {/* <LodgeSelector
              properties={properties}
              onChange={(lodge) => {
                if (lodge) setLodgeId(lodge.refNo);
                setSearchParams({ ...searchParams, lodge });
              }}
            /> */}

            <Button
              onClick={handleSearch}
              className="h-full bg-emerald-600 hover:bg-emerald-700 basis-1/4"
              disabled={loading}
              name="check availability"
            >
              {loading ? "Checking avalability" : "Search Availability"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
