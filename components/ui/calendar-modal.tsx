"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";
import { Calendar } from "./calendar";
import { DateRange } from "react-day-picker";
import { Button } from "./button";
import { findDays } from "@/lib/utils";
import { format } from "date-fns";

export default function CalendarModal({
  setShowDialog,
  onSelect,
  showDialog,
}: {
  setShowDialog: (value: boolean) => void;
  onSelect: (value: DateRange | undefined) => void;
  showDialog: boolean;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleSelect = (newDate: DateRange | undefined) => {
    if (!newDate) return;
    console.log(newDate);
    setDate(newDate);
    onSelect(newDate);
  };

  const nights = findDays(date?.from, date?.to);

  useEffect(() => {
    if (showDialog) {
      // Animate in
      gsap.fromTo(
        sheetRef.current,
        { y: "100%" },
        { y: 0, duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      // Animate out
      gsap.to(sheetRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [showDialog]);

  if (!showDialog) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setShowDialog(false)}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="
          fixed bottom-0 left-0 right-0 z-50
          bg-white rounded-t-2xl shadow-2xl border border-gray-200
          w-full max-h-[90vh] sm:max-h-fit
          sm:inset-0 sm:m-auto sm:max-w-2xl sm:rounded-2xl sm:p-10
          flex flex-col
        "
        style={{ scrollbarGutter: "stable", transform: "translateY(100%)" }}
      >
        {/* Close button */}

        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={() => setShowDialog(false)}
        >
          <X className="w-6 h-6" />
        </button>
        <div className="p-5 border border-b-1 rounded-t-xl">
          {nights === 0 ? (
            <p className="text-2xl ">
              {!date?.from ? "Select check in date" : "Select check out date"}
            </p>
          ) : (
            <p className="text-2xl">{nights} Nights</p>
          )}
          <p className="">{nights === 0 && "Minimum stay: 3 nights"}</p>
          <p className="text-gray-400">
            {date?.from &&
              date?.to &&
              nights > 0 &&
              `${format(date?.from, "d MMM yyyy")} - ${format(
                date?.to,
                "d MMM yyyy"
              )}`}
          </p>
        </div>
        {/* Scrollable content area */}
        <div className="overflow-y-auto max-h-[70vh]">
          <div className="py-12 px-6">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleSelect}
              showOutsideDays={false}
              numberOfMonths={2}
              classNames={{
                months:
                  "flex flex-col relative sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              }}
              disabled={{ before: new Date() }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center p-6">
          <div className="text-white">
            {/* just for spacing dummy data */}
            <div className="text-xl">&pound;99</div>
            <div>for 5 nights</div>
          </div>
          <Button
            variant={"link"}
            onClick={() => {
              setDate(undefined);
              setShowDialog(!showDialog);
            }}
          >
            Cancel
          </Button>
          <Button
            className="bg-emerald-600"
            onClick={() => setShowDialog(!showDialog)}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
