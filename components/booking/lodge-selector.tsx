"use client";

import * as React from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Lodge {
  id: string;
  name: string;
  description: string;
  maxGuests: number;
  pricePerNight: number;
}

const SAMPLE_LODGES: Lodge[] = [
  {
    id: "192931",
    name: "Glenridding Lodge",
    description:
      "Grasmere 2, White Cross Bay near Windermere, Cumbria & The Lake District (Ref. 1068867)",
    maxGuests: 4,
    pricePerNight: 350,
  },
  {
    id: "192933",
    name: "Water's Reach",
    description:
      "White Cross Bay Holiday Park near Troutbeck Bridge, Cumbria & The Lake District (Ref. 1172323)",
    maxGuests: 6,
    pricePerNight: 250,
  },
  {
    id: "192932",
    name: "Serenity",
    description:
      "Skiptory Howe 10, White Cross Bay near Windermere, Cumbria & The Lake District (Ref. 1172347)",
    maxGuests: 6,
    pricePerNight: 450,
  },
];

interface LodgeSelectorProps {
  onChange?: (lodge: Lodge | undefined) => void;
}

export function LodgeSelector({ onChange }: LodgeSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedLodge, setSelectedLodge] = React.useState<Lodge>();

  const handleSelect = (lodge: Lodge) => {

    setSelectedLodge(lodge);
    setOpen(false);
    onChange?.(lodge);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-start"
        >
          <Home className="mr-2 h-4 w-4" />
          {selectedLodge ? selectedLodge.name : "Select a lodge..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search lodges..." />
          <CommandEmpty>No lodge found.</CommandEmpty>
          <CommandGroup>
            {SAMPLE_LODGES.map((lodge) => (
              <CommandItem
                key={lodge.id}
                value={lodge.id}
                onSelect={() => handleSelect(lodge)}
              >
                <Home className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{lodge.name}</span>
                  <span className="text-sm text-muted-foreground">
                    Up to {lodge.maxGuests} guests • £{lodge.pricePerNight}
                    /night
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
