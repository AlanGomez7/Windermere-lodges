"use client"
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Bath, BedDouble, Heart, Star, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Favorites"
        description="Manage your profile and personal settings"
        backgroundImage="https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=1920&auto=format&fit=crop"
      />
      <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full"></div>

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
            <h3 className="text-xl font-bold truncate">{lodge.nickname}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
              <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
              <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
              <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />

              <span className="text-sm font-medium">{lodge.rating}</span>
              <span className="text-xs text-gray-500 ml-1">(236 reviews)</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mt-3 mb-2 truncate">
            {lodge.address}
          </p>

          <div className="flex flex-wrap gap-2 pt-6 mb-4">
            {lodge.features.map((tag: string) => (
              <Badge key={tag} variant="outline" className="bg-gray-100">
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
    </main>
  );
}
