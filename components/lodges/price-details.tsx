import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { DateRange } from "react-day-picker";
import {
  calculatePrices,
  cn,
  findDays,
  findDiscountAmount,
  findDiscountValue,
} from "@/lib/utils";
import { addDays, format, eachDayOfInterval } from "date-fns";
import { GuestSelector } from "../booking/guest-selector";
import { useAppContext } from "@/app/context/context";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { data } from "@/data/lodges";
import Coupons from "./Coupons";
import { X } from "lucide-react";

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
  const [total, setTotal] = useState(0);
  const { searchParams, setSearchParams, appliedCoupon, setAvailability } =
    useAppContext();
  const [price, setPrice] = useState(lodge.price);
  const [couponModal, setCouponModal] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);

  const handleBooking = () => {
    setSearchParams({ ...searchParams, dates: date });
    localStorage.setItem("order", JSON.stringify(searchParams));
    router.push("/booking");
  };

  useEffect(() => {
    const days = findDays(date?.from, date?.to);
    setTotal(calculatePrices(date, lodge));

    const addedFee =
      lodge?.cleaning_fee + searchParams?.guests?.pets * lodge?.pets_fee;

    if (appliedCoupon) {
      const discountedAmount = findDiscountAmount(appliedCoupon, total);
      setPrice(discountedAmount + addedFee);
    } else {
      // const total = calculatePrices(date, lodge)
      setPrice(total + addedFee);
    }

    setDiff(days);
  }, [diff, appliedCoupon, date, searchParams]);

  const params = useSearchParams();
  const value = params.get("available");
  const isAvailable = value === "true";

  const today = new Date();
  const twoYearsLater = new Date(today);
  twoYearsLater.setFullYear(today.getFullYear() + 2);

  useEffect(() => {
    if (searchParams?.dates) setDate(searchParams.dates);
  }, [isAvailable]);

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

    // Disable if the day is closed for departure
    if (data?.closed_for_departure) {
      return true;
    }

    // If a check-in date exists, disable any day less than minStay nights after it
    if (date?.from) {
      const daysDiff = findDays(date.from, day); // difference in nights
      if (daysDiff < lodge?.minStay) {
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

    if (!data) return false;

    if (!data?.available) return true;
    // if (date?.from && !date?.to && day < date.from) return true;
    return false;
  }

  // Style classes
  const modifiersClassNames = {
    unavailable: "text-gray-400 line-through cursor-not-allowed",
    closedArrival: date?.from
      ? "text-black aria-selected:bg-[#007752] aria-selected:text-white" // clickable after check-in
      : "text-[#6a6a6a] aria-selected:bg-emerald-100 aria-selected:text-white", // gray + unclickable before check-in
    closedDeparture: "text-gray-500",
  };

  return (
    <>
      <Card className="w-full lg:w-96 rounded-md transition-all top-16 self-start">
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
              disabled={[getDisabled, { before: new Date() }]}
              fixedWeeks
              excludeDisabled
              // min={lodge?.minStay}
              // max={lodge?.maxStay}
              startMonth={today}
              endMonth={twoYearsLater}
              // Use only onSelect for state updates
              onSelect={(dates) => {
                // When selecting check-in
                if (
                  !date?.from &&
                  dates?.from &&
                  closedForArrival(dates.from)
                ) {
                  toast.error("Cannot check in on this day");
                  setDate(undefined);
                  return;
                }

                if (date?.from && dates?.to) {
                  const nights = findDays(date.from, dates.to);
                  if (nights < lodge.minStay) {
                    toast.error(`Minimum stay is ${lodge.minStay} nights`);
                    return;
                  }
                }

                // setAppliedCoupon(undefined);
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
            <div className="flex flex-col gap-3 mt-3">
              {diff ? (
                <div className="">
                  <hr className="my-2" />
                  {!appliedCoupon && (
                    <Button
                      className="text-emerald-600
                    "
                      variant={"link"}
                      onClick={() => setCouponModal(true)}
                    >
                      Got a coupon? Redeem it now for instant savings.
                    </Button>
                  )}
                </div>
              ) : (
                <></>
              )}
              <div hidden={!couponModal}>
                <Coupons />
              </div>
              <hr className="my-2" />

              {date?.from && date?.to && date?.from !== date?.to && (
                <>
                  <div className="flex justify-between text-sm">
                    <span>Check In</span>
                    <span className="font-bold">
                      {" "}
                      {format(new Date(date?.from), "dd MMM yyyy")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Check Out</span>
                    <span className="font-bold">
                      {" "}
                      {format(new Date(date?.to), "dd MMM yyyy")}
                    </span>
                  </div>
                </>
              )}

              {searchParams?.guests?.pets > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Pets</span>
                  <span className="font-bold">
                    {" "}
                    &pound;{searchParams?.guests?.pets * lodge?.pets_fee}
                  </span>
                </div>
              )}

              {date?.from !== date?.to && (
                <div className="flex justify-between text-sm">
                  <span>Service fee</span>
                  <span className="font-bold">
                    {" "}
                    &pound;{lodge?.cleaning_fee}
                  </span>
                </div>
              )}

              {appliedCoupon && date && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Discount</span>
                  <span className="font-bold">
                    - &pound;{findDiscountValue(appliedCoupon, total)}
                  </span>
                </div>
              )}

              {date?.from !== date?.to && (
                <>
                  <hr className="my-3" />
                  <div className="flex justify-between text-lg text-emerald-600">
                    <span>Total Payment</span>
                    <span className="font-bold"> &pound;{price}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sticky action button */}

          {diff >= lodge?.minStay && (
            <div>
              {((date?.from && !getDisabled(date.from)) ||
                (date?.to && !getDisabled(date.to))) && (
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
    </>
  );
}
