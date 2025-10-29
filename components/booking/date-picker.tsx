"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CalendarModal from "../ui/calendar-modal";

interface DateRangePickerProps {
  className?: string;
  onChange?: (date: DateRange | undefined) => void;
  initialDateRange?: DateRange;
  disabled?: boolean;
  clearDates?: () => void;
}

export function DateRangePicker({
  onChange,
  disabled = false,
  clearDates,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [open, setOpen] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const firstButtonRef = React.useRef<HTMLButtonElement>(null);

  // Handle date select
  const handleSelect = (newDate: DateRange | undefined) => {
    if (!newDate) return;
    setDate(newDate);
    onChange?.(newDate);
  };

  // Manage outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Return focus to button when popover closes
  React.useEffect(() => {
    if (!open && firstButtonRef.current) firstButtonRef.current.focus();
  }, [open]);

  const today = new Date();
  const twoYearsLater = new Date(today);
  twoYearsLater.setFullYear(today.getFullYear() + 2);

  return (
    <>
      {/* Desktop version */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className="hidden md:flex w-full gap-6"
            role="group"
            aria-label="Select your check-in and check-out dates"
          >
            <Button
              ref={firstButtonRef}
              id="checkin"
              variant="outline"
              aria-label={
                date?.from
                  ? `Check-in date ${format(date.from, "LLLL dd, yyyy")}`
                  : "Select check-in date"
              }
              aria-haspopup="dialog"
              aria-expanded={open}
              className={cn(
                "w-full justify-start text-left font-normal flex-1 focus-visible:ring-2 focus-visible:ring-teal-600",
                !date?.from && "text-muted-foreground"
              )}
              disabled={disabled}
              onClick={() => setOpen(!open)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              {date?.from ? (
                format(date.from, "LLL dd, y")
              ) : (
                <span>Check in</span>
              )}
            </Button>

            <Button
              id="checkout"
              variant="outline"
              aria-label={
                date?.to
                  ? `Check-out date ${format(date.to, "LLLL dd, yyyy")}`
                  : "Select check-out date"
              }
              aria-haspopup="dialog"
              aria-expanded={open}
              className={cn(
                "w-full justify-start text-left font-normal flex-1 focus-visible:ring-2 focus-visible:ring-teal-600",
                !date?.to && "text-muted-foreground"
              )}
              disabled={disabled}
              onClick={() => setOpen(!open)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              {date?.to ? format(date.to, "LLL dd, y") : <span>Check out</span>}
            </Button>
          </div>
        </PopoverTrigger>

        <PopoverContent
          ref={popoverRef}
          className="w-auto p-0 m-5"
          side="bottom"
          align="start"
          role="dialog"
          aria-modal="true"
          aria-labelledby="calendar-heading"
        >
          <h2 id="calendar-heading" className="sr-only">
            Select Check-in and Check-out Dates
          </h2>
          <div className="py-12 px-6">
            <Calendar
              startMonth={today}
              endMonth={twoYearsLater}
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              showOutsideDays={false}
              fixedWeeks
              onSelect={handleSelect}
              numberOfMonths={2}
              classNames={{
                months:
                  "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 relative",
                week: "flex gap-2",
                month_grid: "space-y-2",
              }}
              disabled={{ before: today }}
              aria-label="Calendar date picker"
            />
          </div>
            <div className="relative">
              {/* underline absolute right-0 bottom-3 cursor-pointer */}
              <Button
                variant="link"
                aria-label="Clear selected dates"
                className="text-sm absolute right-3 bottom-3"
                onClick={() => {
                  clearDates?.(); 
                  setDate(undefined);
                }}
              >
                Clear dates
              </Button>
            </div>
        </PopoverContent>
      </Popover>

      {/* Mobile modal */}
      <div
        className="flex flex-col gap-6 w-full md:hidden"
        aria-label="Select dates for booking"
      >
        <Button
          id="checkin-mobile"
          variant="outline"
          aria-label={
            date?.from
              ? `Check-in date ${format(date.from, "LLLL dd, yyyy")}`
              : "Select check-in date"
          }
          className={cn(
            "w-full justify-start text-left font-normal flex-1 focus-visible:ring-2 focus-visible:ring-teal-600",
            !date?.from && "text-muted-foreground"
          )}
          disabled={disabled}
          onClick={() => setShowDialog(true)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          {date?.from ? format(date.from, "LLL dd, y") : <span>Check in</span>}
        </Button>

        <Button
          id="checkout-mobile"
          variant="outline"
          aria-label={
            date?.to
              ? `Check-out date ${format(date.to, "LLLL dd, yyyy")}`
              : "Select check-out date"
          }
          className={cn(
            "w-full justify-start text-left font-normal flex-1 focus-visible:ring-2 focus-visible:ring-teal-600",
            !date?.to && "text-muted-foreground"
          )}
          disabled={disabled}
          onClick={() => setShowDialog(true)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          {date?.to ? format(date.to, "LLL dd, y") : <span>Check out</span>}
        </Button>
      </div>

      <CalendarModal
        setShowDialog={setShowDialog}
        showDialog={showDialog}
        onSelect={handleSelect}
      />
    </>
  );
}

export const DatePicker = DateRangePicker;
