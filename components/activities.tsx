"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

const activities = [
  {
    title: "Places of interest",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop",
    
    description:
      "Staying with us means you’re minutes away from the Lake District’s most iconic gems! Wander the charming streets of Windermere & Bowness, step into the world of Beatrix Potter, or hike historic trails in Grasmere and Coniston. Discover Keswick’s adventure spirit, cruise stunning lakes, or tour grand National Trust estates and castles.",
  },
  {
    title: "Cruises & Ferries",
      image:
      "https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?q=80&w=2070&auto=format&fit=crop",
    description:
      "Set sail on England’s largest lake with unforgettable cruises, ferries, and boat hires! Enjoy scenic public cruises, quick car ferries, self-drive boats, or luxury private charters. With family-friendly routes, combo tickets to top attractions, and even dog-friendly options, Windermere offers the perfect lake adventure for relaxation, fun, and breathtaking views.",
  },
  {
    title: "Outdoor activites",
    image:
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?q=80&w=2070&auto=format&fit=crop",
    description:
      "Discover thrilling outdoor experiences just minutes away! From peaceful kayaking and paddleboarding on Lake Windermere to adrenaline-pumping ghyll scrambling through waterfalls and ravines, there’s something for every adventurer. With expert guides, top-class equipment, and breathtaking scenery, the Lake District promises unforgettable memories for families, friends, and explorers of all abilities.",
  },
  {
    title: "Family walks",
    image: "activities/4.png",
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
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-lg">
              <div className="relative h-48">
                <Image src={activity.image || "/placeholder.svg"} alt={activity.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{activity.title}</CardTitle>
                <CardDescription>{activity.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-emerald-600" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-emerald-600" />
                    <span>{activity.season}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{activity.duration}</Badge>
                  <Badge 
                    variant="outline"
                    className={
                      activity.difficulty === 'Easy' 
                        ? 'border-green-500 text-green-500'
                        : activity.difficulty === 'Moderate'
                        ? 'border-yellow-500 text-yellow-500'
                        : 'border-red-500 text-red-500'
                    }
                  >
                    {activity.difficulty}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}

        {/* <div className="text-center mt-12">
          <Link href="/activities">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              View All Activities <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div> */}
      </div>
    </section>
  );
};
