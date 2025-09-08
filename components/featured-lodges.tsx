"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Maximize, Bath, BedDouble } from "lucide-react";

export const FeaturedLodges = ({ lodges }: { lodges: any }) => {
  console.log(lodges);
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Featured Lodges
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our most popular luxury lodges, each offering a unique Lake
            District experience with stunning views and premium amenities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lodges.slice(0, 3).map((lodge: any) => (
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
                    <span className="text-sm font-medium">4.1</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                    £{lodge.price}/night
                  </div>
                </div>

                <CardHeader className="flex">
                  <div className="flex justify-between items-start w-full">
                    <CardTitle className="text-xl font-bold">
                      {lodge.nickname}
                    </CardTitle>
                    {/* <Badge variant="secondary">£{lodge.price}/night</Badge> */}
                  </div>
                  <CardDescription className="text-sm text-muted-foreground truncate-multiline">{lodge.address}</CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{lodge.guests} Guests</span>
                    </div>
                    <div className="flex items-center">
                      <BedDouble className="h-4 w-4 mr-1" />
                      <span>{lodge.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{lodge.bathrooms} Bathrooms</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {lodge.features.map((feature: string, index: number) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-gray-100"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <Link href="/our-lodges">
            <Button variant="outline" size="lg" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              View All Lodges <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div> */}
      </div>
    </section>
  );
};
