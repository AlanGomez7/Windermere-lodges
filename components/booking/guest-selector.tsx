"use client";

import * as React from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/app/context/context";

interface GuestSelectorProps {
  onChange?: (guests: { adults: number; children: number }) => void;
}

export function GuestSelector({ onChange }: GuestSelectorProps) {
  const { searchParams } = useAppContext();
  console.log(searchParams);
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(0);

  const handleAdultsChange = (value: number) => {
    const newValue = Math.max(1, Math.min(10, value));
    setAdults(newValue);
    onChange?.({ adults: newValue, children });
  };

  const handleChildrenChange = (value: number) => {
    const newValue = Math.max(0, Math.min(6, value));
    setChildren(newValue);
    onChange?.({ adults, children: newValue });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          {searchParams.guests.adults}{" "}
          {searchParams.guests.adults === 1 ? "Adult" : "Adults"}
          {searchParams.guests.children > 0 &&
            `, ${searchParams.guests.children} ${
              searchParams.guests.children === 1 ? "Child" : "Children"
            }`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Guests</h4>
            <p className="text-sm text-muted-foreground">
              Add the number of guests for your stay.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="adults">Adults</Label>
              <div className="col-span-2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleAdultsChange(adults - 1)}
                >
                  -
                </Button>
                <Input
                  id="adults"
                  type="number"
                  value={searchParams.guests.adults}
                  onChange={(e) => handleAdultsChange(parseInt(e.target.value))}
                  min={1}
                  max={10}
                  className="h-8 w-14"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleAdultsChange(adults + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="children">Children</Label>
              <div className="col-span-2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleChildrenChange(children - 1)}
                >
                  -
                </Button>
                <Input
                  id="children"
                  type="number"
                  value={searchParams.guests.children}
                  onChange={(e) =>
                    handleChildrenChange(parseInt(e.target.value))
                  }
                  min={0}
                  max={6}
                  className="h-8 w-14"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleChildrenChange(children + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
