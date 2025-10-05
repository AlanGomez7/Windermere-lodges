import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { GuestSelector } from "../booking/guest-selector";
import { useAppContext } from "@/app/context/context";
import { checkAvailableLodges } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PirceDetails({
  lodge,
  diff,
}: {
  lodge: any;
  diff: number | null;
}) {

  useEffect(()=>{
    setSearchParams({...searchParams, lodge})
  }, [lodge])

  const router = useRouter();

  const [date, setDate] = useState<DateRange | undefined>();
  const { searchParams, setSearchParams } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [availability, setAvailability] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    const params = {
      dates: {
        from: date?.from,
        to: date?.to,
      },
      guests: searchParams.guests,
      lodge,
    };

    const from = format(searchParams.dates.from, "yyyy-MM-dd");
    const to = format(searchParams.dates.to, "yyyy-MM-dd");
    const response = await checkAvailableLodges({ dates: { from, to } }, 3, 14);

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

  const disableDates = lodge.calendar
    .filter((a: { date: string; available: boolean }) => !a.available)
    .map((a: { date: string; available: boolean }) => {
      if (!a.available) {
        return new Date(a.date);
      }
    });

  return (
    <Card className="w-full md:w-96 rounded-md transition-all sticky top-20 self-start">
      <CardContent className="p-4 bg-[#EEF6F4] flex flex-col rounded-2xl">
        {/* Calendar scrolls if too tall */}

        <div className="flex-1">
          <Calendar
            mode="range"
            selected={searchParams.dates ? searchParams?.dates : date}
            defaultMonth={
              searchParams.dates ? searchParams?.dates?.from : date?.from
            }
            className="mb-3"
            showOutsideDays={false}
            fixedWeeks
            disabled={[{ before: new Date() }, ...disableDates]}
            onSelect={(dates) => {
              if (!dates) return;
              setDate(dates);
              setSearchParams({ ...searchParams, dates });
            }}
          />

          <hr className="my-3" />

          <div className="flex flex-col gap-3">
            {/* Price */}
            {diff ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold underline">
                  &pound;
                  {lodge.price * diff +
                    lodge.cleaning_fee +
                    searchParams.guests.pets * lodge.pets_fee}
                </span>
                <span className="text-xs">
                  for {diff} {diff < 1 ? "night" : "nights"}
                </span>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold underline">
                  &pound;
                  {lodge.price}
                </span>
                <span className="text-xs">for 1 night</span>
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
                {date?.from ?? searchParams?.dates?.from
                  ? format(
                      date?.from ?? searchParams?.dates?.from,
                      "LLL dd, yyyy"
                    )
                  : "Pick a date"}
              </Button>

              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal text-sm py-2",
                  !date?.to && "text-muted-foreground"
                )}
              >
                {date?.to ?? searchParams?.dates?.to
                  ? format(date?.to ?? searchParams?.dates?.to, "LLL dd, yyyy")
                  : "Pick a date"}
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
        <div className="mt-3">
          {/* {searchParams?.dates || date && (
          )} */}
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-2"
              disabled={loading}
              onClick={handleBooking}
            >
              Reserve
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// {!availability ? (
//     <Button
//       onClick={() => handleSearch()}
//       className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-2"
//       disabled={loading}
//     >
//       Check Availability
//     </Button>
//   ) : (
//   )}
