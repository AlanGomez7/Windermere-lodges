"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Users, Maximize, BedDouble, Bath, Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  console.log(lodges);

  const [favorites, setFavorites] = useState<number[]>([]);
  const router = useRouter();

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Lodges</h2>
        <div className="text-sm text-gray-500">
          Showing {lodges.length} lodges
        </div>
      </div>

      <div className="grid h-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lodges.length === 0 ? (
          <>No loadges found</>
        ) : (
          lodges.map((lodge: any) => (
            <div key={lodge.id} className="group">
              <Link
                href={`/our-lodges/${lodge.refNo}`}
                className="block"
                prefetch
              >
                <Card className="overflow-hidden group-hover:shadow-md transition-shadow duration-200">
                  <div className="relative">
                    <div className="aspect-w-16 aspect-h-9 relative h-48">
                      <Image
                        src={lodge.images[0] || "/placeholder.svg"}
                        alt={lodge.nickname}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(lodge.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md"
                    >
                      <Heart
                        size={20}
                        className={
                          favorites.includes(lodge.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }
                      />
                    </button>
                    {lodge.featured && (
                      <Badge className="absolute top-3 left-3 bg-emerald-600">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-5">
                    <div className=" mb-2">
                      <h3 className="text-xl font-bold truncate">
                        {lodge.nickname}
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />

                        <span className="text-sm font-medium">
                          {lodge.rating}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          (236 reviews)
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mt-3 mb-2 truncate">
                      {lodge.address}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-6 mb-4">
                      {lodge.features.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-gray-100"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex pt-8 gap-5 text-xs">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{lodge.guests} Guests</span>
                      </div>
                      <div className="flex items-center">
                        <BedDouble className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{lodge.bedrooms} Bedrooms</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{lodge.bathrooms} Bathrooms</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-emerald-600">
                        £{lodge.price}
                      </span>
                      <span className="text-gray-500 text-lg"> / night</span>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        router.push("/booking");
                      }}
                      className="bg-emerald-600 font-bold hover:bg-emerald-700"
                    >
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
