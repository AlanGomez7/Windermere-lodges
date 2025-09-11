"use client";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Maximize, Bath, BedDouble } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ratingsInfo } from "@/lib/utils";

export default function LodgeCard({ lodge, needsButton }: any) {
  // const [showAll, setShowAll] = useState(false);

  const visibleItems = lodge.features.slice(0, 6);
  const remainingCount =
    lodge.features.length > 6 ? lodge.features.length - 6 : 0;

  const [avgRating, totalNoOfReviews] = ratingsInfo(lodge.comments);
  const noOfReviewStars = new Array(avgRating).fill("");

  const router = useRouter();
  return (
    <Link href={`/our-lodges/${lodge.refNo}`} key={lodge.id} prefetch>
      <Card
        key={lodge.id}
        className="overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
      >
        <div className="relative h-64">
          <Image
            src={lodge.images[0] || "/placeholder.svg"}
            alt={lodge.name}
            fill
            className="object-cover"
            priority
          />
          {lodge.isNew && (
            <Badge className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-700">
              New
            </Badge>
          )}
          <div className="absolute bottom-4 left-4 flex items-center bg-white bg-opacity-80 px-2 py-1 rounded-full">
            <Star
              className="h-4 w-4 text-yellow-500 mr-1"
              fill="currentColor"
            />
            <span className="text-sm font-medium">{avgRating}</span>
          </div>
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
            £{lodge.price}/night
          </div>
        </div>

        <CardContent className="p-5">
          <div className=" mb-2">
            <h3 className="text-xl font-bold truncate">{lodge.nickname}</h3>
            <div className="flex items-center">
              {noOfReviewStars.map((_, i) => (
                <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" key={i}/>
              ))}
              <span className="text-sm font-medium"></span>
              <span className="text-xs text-gray-500 ml-1">
                ({totalNoOfReviews} reviews)
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-3 mb-2 truncate">
            {lodge.address}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {visibleItems.map((feature: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-gray-50 font-light"
              >
                {feature}
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Badge variant="outline" className="bg-gray-50 font-light">
                +{remainingCount} more
              </Badge>
            )}
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
        {needsButton && (
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
        )}
      </Card>
    </Link>
  );
}
