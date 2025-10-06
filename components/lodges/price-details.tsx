import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { DateRange } from "react-day-picker";
import { cn, findDays } from "@/lib/utils";
import { addDays, format, isSameDay } from "date-fns";
import { GuestSelector } from "../booking/guest-selector";
import { useAppContext } from "@/app/context/context";
import { checkAvailableLodges } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function PirceDetails({
  lodge,
  setShowBanner,
}: {
  lodge: any;
  setShowBanner: (value: boolean) => void;
}) {
  useEffect(() => {
    setSearchParams({ ...searchParams, lodge });
  }, [lodge]);

  const router = useRouter();

  const [date, setDate] = useState<DateRange | undefined>();
  const [diff, setDiff] = useState(1);
  const { searchParams, setSearchParams } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [availability, setAvailability] = useState(false);

  const handleBooking = () => {
    setSearchParams({ ...searchParams, dates: date });
    localStorage.setItem("order", JSON.stringify(searchParams));
    router.push("/booking");
  };

  useEffect(() => {
    const days = findDays(date?.from, date?.to);
    console.log(days);
    setDiff(days);
  }, [date]);

  const disableDates = lodge.calendar
    .filter((a: { date: string; available: boolean }) => !a.available)
    .map((a: { date: string; available: boolean }) => {
      if (!a.available) {
        return new Date(a.date);
      }
    });

  const params = useSearchParams();
  const value = params.get("available");
  const isAvailable = value === "true";

  useEffect(() => {
    setDate(searchParams.dates);
    setAvailability(isAvailable);
  }, [isAvailable]);

  return (
    <Card className="w-full lg:w-96 rounded-md transition-all sticky top-16 self-start">
      <CardContent className="p-4 bg-[#EEF6F4] flex flex-col rounded-2xl">
        {/* Calendar scrolls if too tall */}

        <div className="flex-1">
          <Calendar
            mode="range"
            selected={date}
            defaultMonth={
              searchParams.dates ? searchParams?.dates?.from : date?.from
            }
            className="mb-3"
            showOutsideDays={false}
            fixedWeeks
            disabled={[
              ...disableDates,
              ...(date?.from
                ? [
                    { before: date?.from }, // disable all dates before check-in
                    {
                      after: date?.from,
                      before: addDays(date?.from, 3),
                    },
                    { after: addDays(date?.from, 14) }, /// disable anything after +14 days
                  ]
                : []),
            ]}
            onSelect={(dates) => {
              if (!dates?.from || !dates?.to) return;

              // Collect all unavailable dates as yyyy-MM-dd strings
              const unavailableDates = lodge.calendar
                .filter((d: any) => !d.available)
                .map((d: any) => d.date);

              // Helper to iterate date range
              function* daysBetween(start: Date, end: Date) {
                let d = new Date(start);
                while (d <= end) {
                  yield format(d, "yyyy-MM-dd");
                  d.setDate(d.getDate() + 1);
                }
              }

              // Check for any unavailable date in selected range
              for (let d of daysBetween(dates.from, dates.to)) {
                if (unavailableDates.includes(d)) {
                  toast.error("Selected range includes unavailable dates.");
                  setDate(undefined);
                  return; // Reject selection
                }
              }

              setDate(dates);
              setAvailability(true);
              setShowBanner(false);
              // setSearchParams({ ...searchParams, dates });
            }}
          />
          <div className="relative">
            <p
              className="text-sm underline absolute right-0 bottom-3 cursor-pointer"
              onClick={() => {
                setDate(undefined);
              }}
            >
              Clear dates
            </p>
          </div>

          <hr className="my-3" />

          d<div className="flex flex-col gap-3">
            {/* Price */}
            {diff ? (
              <div className="flex flex-col md:flex-row items-baseline gap-2 justify-between">
                <span>
                  <span className="text-xl font-bold underline">
                    &pound;
                    {lodge.price * diff +
                      lodge.cleaning_fee +
                      searchParams.guests.pets * lodge.pets_fee}
                  </span>
                  <span className="text-xs">
                    for {diff} {diff < 1 ? "night" : "nights"}
                  </span>
                </span>
                <span className="text-sm mt-2 text-gray-400">
                  Min stay 3 nights & 14 nights max
                </span>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-baseline gap-2 justify-between">
                <span>
                  <span className="text-xl font-bold underline">
                    &pound;
                    {lodge.price}
                  </span>
                  <span className="text-xs"> for 1 night</span>
                </span>
                <span className="text-sm mt-2 text-gray-400">
                  Min stay 3 nights & 14 nights max
                </span>
              </div>
            )}

            {/* Date buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal text-sm py-2",
                  !date && "text-muted-foreground"
                )}
              >
                {date?.from
                  ? format(date?.from, "LLL dd, yyyy")
                  : "Pick a date"}
              </Button>

              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal text-sm py-2",
                  !date?.to && "text-muted-foreground"
                )}
              >
                {date?.to ? format(date?.to, "LLL dd, yyyy") : "Pick a date"}
              </Button>
            </div>

            {/* Guest selector */}
            <GuestSelector
              lodge={lodge}
              onChange={(guests) =>
                setSearchParams({ ...searchParams, guests })
              }
            />
          </div>
        </div>

        {/* Sticky action button */}
        {availability && date?.from !== date?.to && (
          <div className="mt-3">
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-2"
              disabled={loading}
              onClick={handleBooking}
            >
              Reserve
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
