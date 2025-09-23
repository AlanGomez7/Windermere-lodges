"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
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

interface DateRangePickerProps {
  className?: string;
  onChange?: (date: DateRange | undefined) => void;
  initialDateRange?: DateRange;
  disabled?: boolean;
}

export function DateRangePicker({
  className,
  onChange,
  disabled = false,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [open, setOpen] = React.useState<boolean>(false);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  const handleSelect = (newDate: DateRange | undefined) => {
    if (!newDate) return;

    console.log(newDate,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    setDate(newDate);
    onChange?.(newDate);
  };

  // // Close on scroll up
  // React.useEffect(() => {
  //   const handleScroll = () => setOpen(false);

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // Close on clicking outside
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

  // Close on back button
  React.useEffect(() => {
    if (!open) return;

    window.history.pushState({ calendarOpen: true }, "");

    const handlePopState = () => {
      setOpen(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      if (window.history.state?.calendarOpen) {
        window.history.back();
      }
    };
  }, [open]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            disabled={disabled}
            onClick={() => setOpen(!open)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick your days</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          ref={popoverRef}
          className="w-auto p-0 m-5"
          align="start"
          side="bottom"
        >
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export const DatePicker = DateRangePicker;
