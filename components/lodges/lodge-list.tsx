"use client";

import { use, useState } from "react";
import LodgeCard from "../cards/lodge-card";
import { useSearchParams } from "next/navigation";

// Sample lodge data
const lodges = [
  {
    id: 1,
    name: "Glenridding Lodge",
    description:
      "Grasmere 2, White Cross Bay near Windermere, Cumbria & The Lake District (Ref. 1068867)",
    image: "/Glenridding/1.jpeg",
    price: 250,
    rating: 4.5,
    reviews: 128,
    guests: 4,
    bedrooms: 3,
    bathrooms: 2,
    size: 1200,
    tags: [
      "Off Road Parking",
      "Garden / Patio",
      "Cot Available",
      "Highchair Available",
      "+3",
    ],
    featured: true,
  },
  {
    id: 2,
    name: "Water's Reach",
    description:
      "White Cross Bay Holiday Park near Troutbeck Bridge, Cumbria & The Lake District (Ref. 1172323)",
    image: "/Waters_Reach/1.jpg",
    price: 180,
    rating: 4.7,
    reviews: 94,
    guests: 6,
    bedrooms: 2,
    bathrooms: 1,
    size: 950,
    tags: [
      "Swimming pool",
      "Ground floor accommodation",
      "Ground floor bedroom",
      "+7",
    ],
    featured: false,
  },
  {
    id: 3,
    name: "Serenity",
    description:
      "Skiptory Howe 10, White Cross Bay near Windermere, Cumbria & The Lake District (Ref. 1172347)",
    image: "/Serenity/1.png",
    price: 220,
    rating: 4.1,
    reviews: 112,
    guests: 6,
    bedrooms: 2,
    bathrooms: 2,
    size: 1050,
    tags: [
      "Ground floor accommodation",
      "Ground floor bedroom",
      "Off Road Parking",
      "Garden / Patio",
      "+4",
    ],
    featured: false,
  },
];

export function LodgeList({ properties }: { properties: any }) {
  const lodges: any = use(properties);

  // const [availableLodges, setAvailableLodges] = useState(lodges);

  // const searchParams = useSearchParams();
  // const ids = searchParams.get("ids")?.split(",") ?? [];

  // useState(()=>{

  // }, [])

  // console.log(lodges);

  const [favorites, setFavorites] = useState<number[]>([]);

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
