"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import image1 from "@/public/activities/activity.png";
import sightseeing from "@/public/activities/sightseeing.jpg";
import kayaking from "@/public/activities/kayaking.jpg";
import trekking from "@/public/activities/trekking.jpg";
import discoverWCB from "@/public/discoverwcb.jpg"

const activities = [
  {
    title: "Places of interest",
    image: trekking,

    description:
      "Staying with us means you’re minutes away from the Lake District’s most iconic gems! Wander the charming streets of Windermere & Bowness, step into the world of Beatrix Potter, or hike historic trails in Grasmere and Coniston.",
  },
  {
    title: "Cruises & Ferries",
    image: sightseeing,
    description:
      "Set sail on England’s largest lake with unforgettable cruises, ferries, and boat hires! Enjoy scenic public cruises, quick car ferries, self-drive boats, or luxury private charters.",
  },
  {
    title: "Outdoor activites",
    image: kayaking,

    description:
      "Discover thrilling outdoor experiences just minutes away! From peaceful kayaking and paddleboarding on Lake Windermere to adrenaline-pumping ghyll scrambling through waterfalls and ravines, there’s something for every adventurer.",
  },
  {
    title: "Family walks",
    image: image1,

    description:
      "From gentle lakeside strolls to thrilling climbs, the Lake District offers unforgettable family walks for all ages. Enjoy pushchair-friendly paths around Buttermere and Tarn Hows, scenic climbs like Catbells and Orrest Head, or adventurous treks up Helvellyn and Scafell Pike",
  },
];

export const Activities = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 pb-20 flex flex-col md:flex-row items-start gap-8">
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Discover White Cross Bay
          </h2>
          <p className="text-lg text-gray-600 max-w-5xl mx-auto text-left">
            Located on the eastern shore of Windermere, White Cross Bay provides
            an ideal setting for families and couples alike. With direct access
            to the lake, you'll be surrounded by the serene beauty of the
            countryside and woodland. Venture out to nearby towns like
            Bowness-on-Windermere and Ambleside, known for their historic
            architecture, delightful cafes, and local boutiques. Naturally, with
            Windermere, Coniston and Ullswater so close by, it's a great spot
            for watersports, but you'll find plenty of opportunities for
            walking, climbing, cycling and canyoning, too. Back on park, you'll
            find everything you need for total relaxation with an indoor pool,
            plenty of activities for all ages, a yummy menu courtesy of our
            onsite restaurant, and a beer garden.
          </p>
        </div>

        {/* Image panel */}
        <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/10]">
          <Image
            src={discoverWCB || "/placeholder.svg"}
            alt={"discover white cross bay"}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          {activities.map((activity, index) => (
            <div
              className="relative h-96 group overflow-hidden rounded-md"
              key={index}
            >
              <Image
                src={activity.image || "/placeholder.svg"}
                alt={activity.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 brightness-25"
              />

              {/* Overlay that darkens on hover */}
              <div
                className="
      absolute inset-0 bg-black/40 
      transition-colors duration-500 
      group-hover:bg-black/90
    "
              />

              {/* Title (initially visible) */}
              <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 group-hover:top-6 group-hover:items-start">
                {activity.title}
              </span>

              {/* Description (hidden until hover) */}
              <div
                className="
      absolute inset-0 flex flex-col justify-center items-center
      text-white px-4 text-center opacity-0 
      transition-opacity duration-500 group-hover:opacity-100
      group-hover:mt-8
    "
              >
                <span className="max-w-md text-base leading-relaxed">
                  {activity.description}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* </Link> */}
      </div>
    </section>
  );
};
