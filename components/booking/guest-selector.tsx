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
  onChange?: (guests: {
    adults: number;
    children: number;
    teens: number;
    infants: number;
    pets: number;
  }) => void;
  lodge?: any;
}

export function GuestSelector({ onChange, lodge }: GuestSelectorProps) {
  const [open, setOpen] = React.useState(false);
  // state for all guest types
  const [guests, setGuests] = React.useState({
    adults: 2,
    children: 0,
    teens: 0,
    infants: 0,
    pets: 0,
  });

  React.useEffect(() => {
    if (!open) return;

    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll, true);

    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [open]);

  // helper: max 6 guests (excluding pets)
  const totalGuests = guests.adults + guests.children + guests.teens;
  const maxGuests = 6;
  const maxPets = lodge ? lodge.pets : 2;

  const updateGuest = (
    type: keyof typeof guests,
    value: number,
    maxLimit?: number
  ) => {
    const safeValue = Math.max(0, Math.min(maxLimit ?? maxGuests, value));

    // enforce total limit (excluding pets)
    const newTotal =
      (type === "pets" ? totalGuests : totalGuests - guests[type]) + safeValue;

    if (type !== "pets" && newTotal > maxGuests) return;

    const updated = { ...guests, [type]: safeValue };
    setGuests(updated);
    onChange?.(updated);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start truncate">
          <Users className="mr-2 h-4 w-4" />
          {guests.adults} {guests.adults === 1 ? "Adult" : "Adults"}
          {guests.children > 0 &&
            `, ${guests.children} ${
              guests.children === 1 ? "Child" : "Children"
            }`}
          {guests.teens > 0 &&
            `, ${guests.teens} ${guests.teens === 1 ? "Teen" : "Teens"}`}
          {guests.infants > 0 &&
            `, ${guests.infants} ${
              guests.infants === 1 ? "Infant" : "Infants"
            }`}
          {guests.pets > 0 &&
            `, ${guests.pets} ${guests.pets === 1 ? "Pet" : "Pets"}`}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h4 className="font-medium">Guests</h4>
          <p className="text-sm text-muted-foreground">
            Add the number of guests for your stay (max {maxGuests} guests,
            excluding pets).
          </p>

          {[
            {
              label: "Adults",
              key: "adults",
              min: 1,
              max: lodge?.guests ?? maxGuests,
            },
            { label: "Children", key: "children", min: 0, max: maxGuests },
            { label: "Teens", key: "teens", min: 0, max: maxGuests },
            { label: "Infants", key: "infants", min: 0, max: 3 },
            { label: "Pets", key: "pets", min: 0, max: maxPets },
          ].map(({ label, key, min, max }) => (
            <div key={key} className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor={key}>{label}</Label>
              <div className="col-span-2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    updateGuest(
                      key as any,
                      guests[key as keyof typeof guests] - 1,
                      max
                    )
                  }
                  disabled={guests[key as keyof typeof guests] <= min}
                >
                  -
                </Button>
                <Input
                  id={key}
                  type="number"
                  value={guests[key as keyof typeof guests]}
                  onChange={(e) =>
                    updateGuest(key as any, parseInt(e.target.value) || 0, max)
                  }
                  min={min}
                  max={max}
                  size={5}
                  className="h-8 w-14 text-center flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    updateGuest(
                      key as any,
                      guests[key as keyof typeof guests] + 1,
                      max
                    )
                  }
                  disabled={totalGuests >= maxGuests && key !== "pets"}
                >
                  +
                </Button>
              </div>
            </div>
          ))}

          {/* <div className="grid grid-cols-3 items-center gap-4">
            {lodge?.pets > 0 ? (
              <>
                <Label htmlFor="pets">Pets</Label>
                <div className="col-span-2 flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      updateGuest("pets", guests.pets - 1, lodge.pets)
                    }
                    disabled={guests.pets <= 0}
                  >
                    -
                  </Button>
                  <Input
                    id="pets"
                    type="number"
                    value={guests.pets}
                    onChange={(e) =>
                      updateGuest(
                        "pets",
                        parseInt(e.target.value) || 0,
                        lodge.pets
                      )
                    }
                    min={0}
                    max={lodge.pets}
                    className="h-8 w-14 text-center overflow-hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      updateGuest("pets", guests.pets + 1, lodge.pets)
                    }
                    disabled={guests.pets >= lodge.pets}
                  >
                    +
                  </Button>
                </div>
                <p className="text-sm col-span-3 text-gray-400">
                  Only {lodge?.pets} {lodge?.pets > 1 ? "pets are" : "pet is"}{" "}
                  allowed
                </p>
              </>
            ) : (
              <p className="text-sm col-span-3">Pets are not allowed</p>
            )}
          </div> */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
