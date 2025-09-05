"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import image1 from "@/public/activities/activity.png";
import sightseeing from "@/public/activities/sightseeing.jpg";
import kayaking from "@/public/activities/kayaking.jpg";
import trekking from "@/public/activities/trekking.jpg";

const activities = [
  {
    title: "Places of interest",
    image: trekking,

    description:
      "Staying with us means you’re minutes away from the Lake District’s most iconic gems! Wander the charming streets of Windermere & Bowness, step into the world of Beatrix Potter, or hike historic trails in Grasmere and Coniston. Discover Keswick’s adventure spirit, cruise stunning lakes, or tour grand National Trust estates and castles.",
  },
  {
    title: "Cruises & Ferries",
    image: sightseeing,
    description:
      "Set sail on England’s largest lake with unforgettable cruises, ferries, and boat hires! Enjoy scenic public cruises, quick car ferries, self-drive boats, or luxury private charters. With family-friendly routes, combo tickets to top attractions, and even dog-friendly options, Windermere offers the perfect lake adventure for relaxation, fun, and breathtaking views.",
  },
  {
    title: "Outdoor activites",
    image: kayaking,

    description:
      "Discover thrilling outdoor experiences just minutes away! From peaceful kayaking and paddleboarding on Lake Windermere to adrenaline-pumping ghyll scrambling through waterfalls and ravines, there’s something for every adventurer. With expert guides, top-class equipment, and breathtaking scenery, the Lake District promises unforgettable memories for families, friends, and explorers of all abilities.",
  },
  {
    title: "Family walks",
    image: image1,

    description:
      "From gentle lakeside strolls to thrilling climbs, the Lake District offers unforgettable family walks for all ages. Enjoy pushchair-friendly paths around Buttermere and Tarn Hows, scenic climbs like Catbells and Orrest Head, or adventurous treks up Helvellyn and Scafell Pike. Stunning views, fresh air, and cosy tea stops make every walk a perfect family memory.",
  },
];

export const Activities = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore the Lake District
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover a wide range of activities and attractions in the stunning
            Lake District National Park
          </p>
        </div>

        {/* <Link href={"/activities"}> */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-lg group relative cursor-pointer"
            >
              <div className="relative h-96">
                <Image
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[2px]"
                />
                <div className="absolute inset-0 flex flex-col items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-full text-white text-2xl font-bold p-6 text-center">
                    {activity.title}
                  </span>
                  <span className="w-full text-white px-2 text-center">
                    {activity.description}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {/* </Link> */}
      </div>
    </section>
  );
};
