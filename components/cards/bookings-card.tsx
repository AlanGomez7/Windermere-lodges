"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { findDays } from "@/lib/utils";
import { Button } from "../ui/button";

export default function BookingCard({ booking }: any) {
  const nights = findDays(booking.arrivalDate, booking.departureDate);
  console.log(nights)

  return (
    <Card className="rounded-xl">
      <div className="relative h-64 w-100">
        <Image
          src={booking.property.images[0] || "/placeholder.svg"}
          alt={booking.property.name}
          fill
          className="object-cover rounded-t-xl"
          priority
        />
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
          £{booking.property.price}/night
        </div>
      </div>

      <CardHeader className="flex">
        <div className="flex justify-between items-start w-full">
          <CardTitle className="text-lg lg:text-xl font-bold">
            {booking.property.nickname}
          </CardTitle>
        </div>
        <CardDescription className="w-full">
          <div className="flex justify-between text-sm text-yellow-500">
            <span className="font-semibold">Status</span>
            <span className="font-semibold">{booking.status}</span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span>Check In</span>
            <span>{booking?.arrivalDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Check out</span>
            <span>{booking?.departureDate}</span>
          </div>
          <hr></hr>
          <div className="flex justify-between text-sm">
            <span>{nights} Night</span>
            <span>&pound;{nights && booking.property.price * nights}</span>
          </div>

          {/* IF PETS ADD THIS */}
          {/* <div className="flex justify-between text-sm">
                  <span>{booking.guests.pets} Pets</span>
                  <span>
                    &pound;
                    {booking.guests.pets * booking.property.pets_fee}
                  </span>
                </div> */}

          <div className="flex justify-between text-sm">
            <span>Cleaning fee</span>
            <span>&pound;{booking?.property.cleaning_fee}</span>
          </div>
          <div className="flex justify-between font-bold text-md lg:text-lg mt-2">
            <span>Total Payment</span>
            <span>&pound; {booking.property.price * nights + 100}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant={"ghost"}
          className="w-full text-red-500 hover:bg-red-600 hover:text-white"
        >
          CANCEL BOOKING
        </Button>
      </CardFooter>
    </Card>
  );
}
