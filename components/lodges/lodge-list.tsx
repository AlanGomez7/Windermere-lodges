"use client";

import { use, useEffect, useState } from "react";
import LodgeCard from "../cards/lodge-card";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/app/context/context";

// Sample lodge data

export function LodgeList({ properties }: { properties: any }) {
  const lodges: any = use(properties);

  const [favorites, setFavorites] = useState<number[]>([]);
  const { setSearchParams } = useAppContext();

  useEffect(() => {
    setSearchParams({
      dates: undefined,
      guests: { adults: 2, children: 0, pets: 0, infants: 0, teens: 0 },
      lodge: undefined,
      nights: undefined,
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        specialRequests: "",
      },
    });
  }, []);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  if (lodges.length === 0) {
    return <>No lodges found</>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Lodges</h2>
        <div className="text-sm text-gray-500">
          Showing {lodges.length} lodges
        </div>
      </div>

      <div className="grid h-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lodges.map((lodge: any) => (
          <LodgeCard lodge={lodge} key={lodge.id} needsButton={true} />
        ))}
      </div>
    </div>
  );
}
