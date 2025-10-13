import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { DateRange } from "react-day-picker";
import { cn, findDays, findDiscountAmount } from "@/lib/utils";
import { addDays, format, isSameDay } from "date-fns";
import { GuestSelector } from "../booking/guest-selector";
import { useAppContext } from "@/app/context/context";
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
  const { searchParams, setSearchParams, appliedCoupon } = useAppContext();
  const [price, setPrice] = useState(lodge.price);

  const [loading, setLoading] = useState<boolean>(false);
  const [availability, setAvailability] = useState(false);

  const handleBooking = () => {
    setSearchParams({ ...searchParams, dates: date });
    localStorage.setItem("order", JSON.stringify(searchParams));
    router.push("/booking");
  };

  useEffect(() => {
    const days = findDays(date?.from, date?.to);
    setDiff(days);
  }, [date]);

  const params = useSearchParams();
  const value = params.get("available");
  const isAvailable = value === "true";

  useEffect(() => {
    setDate(searchParams.dates);
    setAvailability(isAvailable);
  }, [isAvailable]);

  useEffect(() => {
    if (appliedCoupon) {
      setPrice(findDiscountAmount(appliedCoupon, lodge.price, diff));
    } else {
      setPrice(diff > 0 ? lodge.price * diff : lodge.price);
    }
  }, [diff, appliedCoupon]);

  function toLocalDate(dateString: any) {
    const [y, m, d] = dateString.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  // Use local-safe keys
  const dataMap = Object.fromEntries(
    lodge.calendar.map((d: any) => [
      format(toLocalDate(d.date), "yyyy-MM-dd"),
      d,
    ])
  );

  const closedForArrival = (day: any) => {
    const key = format(day, "yyyy-MM-dd");
    const data = dataMap[key];
    return !!data?.closed_for_arrival;
  };

  const closedForDeparture = (day: Date) => {
    const key = format(day, "yyyy-MM-dd");
    const data = dataMap[key];

    // Disable if it's closed for departure
    if (data?.closed_for_departure) {
      return true;
    }

    // Disable if the day is less than 3 days after the check-in date
    if (date?.from) {
      const diff = findDays(day, date.from);
      if (diff < lodge?.minStay - 1) {
        return true;
      }
    }

    return false;
  };
  // Define modifiers
  const modifiers = {
    closedArrival: (day: Date) => closedForArrival(day),

    closedDeparture: (day: Date) => closedForDeparture(day),
  };
  // Disabled days logic
  function getDisabled(day: Date) {
    const key = format(day, "yyyy-MM-dd");
    const data = dataMap[key];

    if (!data?.available) return true;
    if (date?.from && !date?.to && day < date.from) return true;

    return false;
  }

  console.log(date?.from, date?.to, diff, availability)
  // Style classes
  const modifiersClassNames = {
    unavailable: "text-gray-400 line-through cursor-not-allowed",
    closedArrival: date?.from
      ? "text-black aria-selected:bg-[#007752] aria-selected:text-white" // clickable after check-in
      : "text-gray-300 aria-selected:bg-emerald-100 aria-selected:text-white", // gray + unclickable before check-in
    // closedDeparture: "text-gray-500",
  };

  return (
    <Card className="w-full lg:w-96 rounded-md transition-all sticky top-16 self-start">
      <CardContent className="p-4 bg-[#EEF6F4] flex flex-col rounded-2xl">

        <div className="flex-1">
          <Calendar

            className="mb-3"
            mode="range"
            selected={date}
            defaultMonth={
              searchParams.dates ? searchParams?.dates?.from : date?.from
            }
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            showOutsideDays={false}
            disabled={getDisabled}
            fixedWeeks
            excludeDisabled
            min={lodge?.minStay}
            max={lodge?.maxStay}
            // Use only onSelect for state updates
            onDayMouseEnter={(day: Date) => {
              console.log(day);
            }}
            onSelect={(dates) => {
              // When selecting check-in
              if (!date?.from && dates?.from && closedForArrival(dates.from)) {
                toast.error("Cannot check in on this day");
                setDate(undefined);
                return;
              }

              setDate(dates);
              setAvailability(true);
              setShowBanner(false);
              setSearchParams({ ...searchParams, dates });
            }}

          />

          <div className="relative">
            <p
              className="text-sm underline absolute right-0 bottom-3 cursor-pointer"
              onClick={() => {
                setSearchParams({ ...searchParams, dates: undefined });
                setDate(undefined);
              }}
            >
              Clear dates
            </p>
          </div>

          <hr className="my-3" />

          <div className="flex flex-col gap-3">
            {/* Price */}

            {diff ? (
              <div className="flex flex-col md:flex-row items-baseline gap-2 justify-between">
                <span>
                  <span className="text-xl font-bold underline">
                    &pound;
                    {price}
                  </span>
                  <span className="text-xs">
                    {" "}
                    for {diff} {diff <= 1 ? "night" : "nights"}
                  </span>
                </span>
                <span className="text-sm mt-2 text-gray-400">
                  Min stay {lodge?.minStay} nights & 14 nights max
                </span>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-baseline gap-2 justify-between">
                <span>
                  <span className="text-xl font-bold underline">
                    &pound;
                    {price}
                  </span>
                  <span className="text-xs"> for 1 night</span>
                </span>
                <span className="text-sm mt-2 text-gray-400">
                  Min stay {lodge?.minStay} nights & {lodge?.maxStay} nights max
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
        {diff >= lodge?.minStay && (
          <div>
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// onDayClick={(day, modifiers) => {
//             if (date?.from) {
//               const isClosed = isClosedForArrival(day);
//               if (isClosed) {
//                 toast.error("Cannot check in on this day");
//                 setDate(undefined); // clear selection
//                 return;
//               } else {
//                 setDate({ from: date.from, to: day });
//                 console.log(date)
//                 setAvailability(true);
//                 setShowBanner(false);
//                 setSearchParams({
//                   ...searchParams,
//                   dates: { from: date.from, to: day },
//                 });
//                 return;
//               }

//               // Optional: auto-set the range if 'from' exists and day is valid
//             }
//           }}
