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
}

export function DateRangePicker({
  onChange,
  disabled = false,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  // Update date and notify parent
  const handleSelect = (newDate: DateRange | undefined) => {
    if (!newDate) return;
    setDate(newDate);
    onChange?.(newDate);
  };

  // Close popover on scroll
  React.useEffect(() => {
    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
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

  // Close on back button
  React.useEffect(() => {
    if (!open) return;
    window.history.pushState({ calendarOpen: true }, "");
    const handlePopState = () => setOpen(false);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      if (window.history.state?.calendarOpen) window.history.back();
    };
  }, [open]);

  const today = new Date();
  const twoYearsLater = new Date(today);
  twoYearsLater.setFullYear(today.getFullYear() + 2);

  return (
    <>
      {/* Desktop popover */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="hidden md:flex w-full gap-6">
            <Button
              id="checkin"
              variant="outline"
              aria-label={date?.from ? `Check-in date ${format(date.from, "LLL dd, y")}` : "Select check-in date"}
              className={cn("w-full justify-start text-left font-normal flex-1", !date?.from && "text-muted-foreground")}
              disabled={disabled}
              onClick={() => setOpen(!open)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? format(date.from, "LLL dd, y") : <span>Check in</span>}
            </Button>

            <Button
              id="checkout"
              variant="outline"
              aria-label={date?.to ? `Check-out date ${format(date.to, "LLL dd, y")}` : "Select check-out date"}
              className={cn("w-full justify-start text-left font-normal flex-1", !date?.to && "text-muted-foreground")}
              disabled={disabled}
              onClick={() => setOpen(!open)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
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
          <h2 id="calendar-heading" className="sr-only">Select Check-in and Check-out Dates</h2>
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
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 relative",
                week: "flex gap-2",
                month_grid: "space-y-2",
              }}
              disabled={{ before: today }}
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Mobile modal */}
      <div className="flex flex-col gap-6 w-full md:hidden">
        <Button
          id="checkin-mobile"
          variant="outline"
          aria-label={date?.from ? `Check-in date ${format(date.from, "LLL dd, y")}` : "Select check-in date"}
          className={cn("w-full justify-start text-left font-normal flex-1", !date?.from && "text-muted-foreground")}
          disabled={disabled}
          onClick={() => setShowDialog(!showDialog)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? format(date.from, "LLL dd, y") : <span>Check in</span>}
        </Button>

        <Button
          id="checkout-mobile"
          variant="outline"
          aria-label={date?.to ? `Check-out date ${format(date.to, "LLL dd, y")}` : "Select check-out date"}
          className={cn("w-full justify-start text-left font-normal flex-1", !date?.to && "text-muted-foreground")}
          disabled={disabled}
          onClick={() => setShowDialog(!showDialog)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
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
