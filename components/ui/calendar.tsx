"use client";

import * as React from "react";
import { DayPicker, DayProps, UI } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  checkIn?: Date;
};

function Calendar({
  className,
  classNames: userClassNames,
  checkIn,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn(className)}
        defaultMonth={checkIn}

        classNames={{
          months: cn("relative", userClassNames?.months),
          month: cn("space-y-4", userClassNames?.month),
          month_caption: cn("flex", userClassNames?.month_caption),
          caption_label: cn(
            "text-lg font-medium mb-3",
            userClassNames?.caption_label
          ),
          nav: cn("space-x-1 flex items-center", userClassNames?.nav),
          [UI.PreviousMonthButton]: cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-10 top-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            userClassNames?.[UI.PreviousMonthButton]
          ),
          [UI.NextMonthButton]: cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-1 top-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            userClassNames?.[UI.NextMonthButton]
          ),
          month_grid: cn(
            "w-full border-collapse space-y-1",
            userClassNames?.month_grid
          ),
          weekdays: cn(
            "flex w-full justify-around bg-white p-2 rounded-md",
            userClassNames?.weekdays
          ),
          weekday: cn(
            "text-muted-foreground rounded-md w-9 font-semibold text-[0.9rem]",
            userClassNames?.weekday
          ),
          week: cn("flex w-full mt-2 justify-around", userClassNames?.week),
          day: cn(
            "h-9 w-9 text-center rounded-md text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 transition-all hover:ring-2 hover:ring-emerald-600 hover:ring-offset-0",
            userClassNames?.day
          ),
          day_button: cn(
            "h-9 w-9 font-normal rounded-md aria-selected:opacity-100 disabled:line-through",
            userClassNames?.day_button
          ),
          range_end: cn("day-range-end", userClassNames?.range_end),
          selected: cn(
            "bg-[#007752] text-white focus:bg-[#007752] focus:text-white",
            userClassNames?.selected
          ),
          today: cn(
            "bg-emerald-50 aria-selected:bg-[#007752] text-accent-foreground",
            userClassNames?.today
          ),
          outside: cn(
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
            userClassNames?.outside
          ),
          disabled: cn(
            "text-gray-400 opacity-50 cursor-not-allowed",
            userClassNames?.disabled
          ),
          range_middle: cn(
            "aria-selected:bg-[#007752] aria-selected:text-white",
            userClassNames?.range_middle
          ),
          hidden: cn("invisible", userClassNames?.hidden),
        }}
        {...props}
      />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
