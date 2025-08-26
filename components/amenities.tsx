"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import lakeAccess from "../public/icons/Access to the lake.svg";
import beerGarden from "../public/icons/Beer Garden.svg";
import wifi from "../public/icons/wifi.svg";
import shop from "../public/icons/Convenience Shop.svg";
import swim from "../public/icons/pool.svg";
import launderette from "../public/icons/Launderette.svg";
import park from "../public/icons/park.svg";
import picnic from "../public/icons/Picnic Areas.svg";
import woodland from "../public/icons/Woodland walks.svg";
import takeaway from "../public/icons/takeaway.svg";
import bar from "../public/icons/bar.svg"
import games from "../public/icons/ball.svg"

import Image from "next/image";

const amenities = [
  {
    icon: lakeAccess,
    title: "Lake view",
  },
  {
    title: "Games",
    icon: games
  },
  {
    title: "Bar",
    icon: bar,
  },
  {
    icon: woodland,
    title: "Woodland walks",
  },
  {
    icon: beerGarden,
    title: "Beer garden",
  },
  {
    icon: park,
    title: "Park",
  },
  {
    icon: wifi,
    title: "Wifi",
  },
  {
    icon: takeaway,
    title: "Takeaway",
  },
  {
    icon: shop,
    title: "Convenience store",
  },
  {
    icon: picnic,
    title: "Picnic spots",
  },
  {
    icon: swim,
    title: "Heated pool",
  },
  {
    icon: launderette,
    title: "Launderette",
  },
];

export const Amenities = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Our Facilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  {/* <Icon className="h-12 w-12 text-emerald-600 mb-2" /> */}
                  {amenity.icon && (
                    <Image
                      src={amenity.icon}
                      className="h-16 w-16 text-emerald-600 mb-2"
                      alt="icons"
                    />
                  )}
                  <CardTitle>{amenity.title}</CardTitle>
                </CardHeader>
                {/* <CardContent>
                  <CardDescription>{amenity.description}</CardDescription>
                </CardContent> */}
              </Card>
            );
          })}
        </div>

        {/* <div className="text-center mt-12">
          <Link href="/amenities">
            <Button className="bg-emerald-600 hover:bg-emerald-700">View All Amenities</Button>
          </Link>
        </div> */}
      </div>
    </section>
  );
};
