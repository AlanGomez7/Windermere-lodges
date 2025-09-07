import { auth } from "@/auth";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bath, BedDouble, Star, Users } from "lucide-react";
import Image from "next/image";
import { getUserBookings } from "../queries/order";

export default async function MyBookings() {
  const session = await auth();
  const result = await getUserBookings(session && session.user?.email);
  const nights = 3;
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="My Bookings"
        description="Manage your profile and personal settings"
        backgroundImage="https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=1920&auto=format&fit=crop"
      />
      <section className="py-20 bg-gray-50 px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {result && result?.length > 0 ? (
            result.map((r, i: number) => (
              <Card key={i}>
                <div className="relative h-64 w-100">
                  <Image
                    src={r.property.images[0] || "/placeholder.svg"}
                    alt={r.property.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* {result.property.isNew && (
                <Badge className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-700">
                  New
                  </Badge>
              )} */}
                  <div className="absolute bottom-4 left-4 flex items-center bg-white bg-opacity-80 px-2 py-1 rounded-full">
                    <Star
                      className="h-4 w-4 text-yellow-500 mr-1"
                      fill="currentColor"
                    />
                    <span className="text-sm font-medium">4.1</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                    £{r.property.price}/night
                  </div>
                </div>

                <CardHeader className="flex">
                  <div className="flex justify-between items-start w-full">
                    <CardTitle className="text-lg lg:text-xl font-bold">
                      {r.property.nickname}
                    </CardTitle>
                  </div>
                  <CardDescription className="w-full">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold">BOOKING ID</span>
                      <span className="font-bold">{r.id}</span>
                    </div>

                    <div className="flex justify-between text-sm text-yellow-500">
                      <span className="font-semibold">Status</span>
                      <span className="font-semibold">{r.status}</span>
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent className="">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span>Check In</span>
                      <span>{r?.arrivalDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Check out</span>
                      <span>{r?.departureDate}</span>
                    </div>
                    <hr></hr>
                    <div className="flex justify-between text-sm">
                      <span>{nights} Night</span>
                      <span>${nights && r.property.price * nights}</span>
                    </div>

                    {/* IF PETS ADD THIS */}
                    {/* <div className="flex justify-between text-sm">
                  <span>{r.guests.pets} Pets</span>
                  <span>
                    $
                    {r.guests.pets * r.property.pets_fee}
                  </span>
                </div> */}

                    <div className="flex justify-between text-sm">
                      <span>Cleaning fee</span>
                      <span>${r?.property.cleaning_fee}</span>
                    </div>
                    <div className="flex justify-between font-bold text-md lg:text-lg mt-2">
                      <span>Total Payment</span>
                      <span>$ {r.property.price * nights + 100}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button variant={"ghost"} className="w-full text-red-500 hover:bg-red-600 hover:text-white">CANCEL BOOKING</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <></>
          )}
        </div>
      </section>
    </main>
  );
}

/**
 

 */
