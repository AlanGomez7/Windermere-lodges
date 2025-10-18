"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Bath, BedDouble } from "lucide-react";
import { useRouter } from "next/navigation";
import { ratingsInfo } from "@/lib/utils";

export default function LandscapeLodgeCard({
  lodge,
  needsButton,
  available,
  showBadge,
}: any) {
  const visibleItems = lodge.features.slice(0, 6);
  const remainingCount =
    lodge.features.length > 6 ? lodge.features.length - 6 : 0;

  const [avgRating] = ratingsInfo(lodge.comments);

  const router = useRouter();
  return (
    <Link
      href={{
        pathname: `/our-lodges/${lodge.refNo}`,
        query: { available: available, isSearched: showBadge },
      }}
      key={lodge.id}
      prefetch
    >
      <Card
        key={lodge.id}
        className={`overflow-hidden w-full max-w-3xl flex flex-col sm:flex-row border shadow-lg transition-all duration-300 hover:shadow-xl ${
          available && "border-emerald-600"
        }`}
      >
        {/* Image */}
        <CardHeader className="relative w-full sm:w-[280px] h-[220px] sm:h-auto shrink-0">
          <Image
            src={lodge.images[0] || "/placeholder.svg"}
            alt={lodge.name}
            fill
            className="object-cover rounded-md p-3"
            priority
          />

          {showBadge && (
            <Badge
              key={lodge?.id}
              variant="default"
              className={`${
                available ? "bg-emerald-600" : "bg-red-600"
              } absolute rounded-l-xl top-0 left-0 font-light`}
            >
              <p className="px-10  text-base text-white">
                {available ? "Available" : "Unavailable"}
              </p>
            </Badge>
          )}
        </CardHeader>

        {/* Content */}
        <CardContent className="p-4 flex flex-col justify-between w-full">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg sm:text-xl font-bold truncate">
              {lodge.nickname}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
              {lodge.address}
            </p>

            {/* Details */}
            <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-gray-500" />
                <span>{lodge.guests} Guests</span>
              </div>
              <div className="flex items-center">
                <BedDouble className="h-4 w-4 mr-1 text-gray-500" />
                <span>{lodge.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1 text-gray-500" />
                <span>{lodge.bathrooms} Bathrooms</span>
              </div>
            </div>

            {/* Features */}

            <div className="flex flex-wrap gap-2">
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

            {/* Price + Button */}
            <div className="pt-3 gap-2 flex md:flex-col md:items-start justify-between">
              <div>
                <span className="text-gray-500 text-sm ">
                  {" "}
                  Starting from
                </span>
                <span className="text-lg  font-bold text-emerald-600">
                  {" "}£{lodge.price}
                </span>
                <span className="text-gray-500 text-sm ">
                  {" "}
                  a night
                </span>
              </div>
              {needsButton && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(
                      `/our-lodges/${lodge.refNo}?available=${available}&isSearched=${showBadge}`
                    );
                  }}
                  className="bg-emerald-600 font-bold hover:bg-emerald-700"
                >
                  See availability
                </Button>
              )}
            </div>
          </div>
        </CardContent>

        {/* Rating */}
        <CardFooter className="relative hidden sm:block">
          <div className="absolute top-3 right-3 flex items-center bg-emerald-600 px-2 py-1 rounded-full">
            <span className="text-sm text-white font-medium">{avgRating}</span>
            <Star className="h-4 w-4 text-white ml-1" fill="currentColor" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
