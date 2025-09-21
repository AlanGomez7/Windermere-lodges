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
import { findDays, getErrorMessage } from "@/lib/utils";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { cancelUserBooking } from "@/lib/api";
import { useState } from "react";

enum ORDERTATUS {
  CONFIRMED = "CONFIRMED",
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
}

export default function BookingCard({ booking }: any) {
  const [currentBooking, setCurrentBooking] = useState(booking);
  const nights = findDays(
    currentBooking.arrivalDate,
    currentBooking.departureDate
  );

  const handleCancelOrder = async () => {
    try {
      if (!currentBooking?.id) {
        toast.error("Invalid id");
      }

      const response = await cancelUserBooking(currentBooking?.id);
      if (response) {
        toast.success("Booking cancelled successfully!");
        setCurrentBooking((prev: any) => ({
          ...prev,
          status: response.status,
        }));
      } else {
        toast.error("Failed to cancel booking");
      }
    } catch (err) {
      const msg = getErrorMessage(err);
      toast.error(msg || "Couldn't update password");
    }
  };

  const giveColor = (status: string) => {
    if (status === ORDERTATUS.CANCELLED) {
      return "text-red-500";
    }

    if (status === ORDERTATUS.CONFIRMED) {
      return "text-green-500";
    }

    if (status === ORDERTATUS.PENDING) {
      return "text-yellow-500";
    }
  };

  return (
    <Card className="rounded-xl">
      <div className="relative h-64 w-100">
        <Image
          src={currentBooking.property.images[0] || "/placeholder.svg"}
          alt={currentBooking.property.name}
          fill
          className="object-cover rounded-t-xl"
          priority
        />
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
          {currentBooking.enquiryId}
        </div>
      </div>

      <CardHeader className="flex">
        <div className="flex justify-between items-start w-full">
          <CardTitle className="text-lg lg:text-xl font-bold">
            {currentBooking.property.nickname}
          </CardTitle>
        </div>
        <CardDescription className="w-full">
          <div
            className={`flex justify-between text-sm ${giveColor(
              currentBooking.status
            )}`}
          >
            <span className="font-semibold">Status</span>
            <span className="font-semibold">{currentBooking.status}</span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span>Check In</span>
            <span>{currentBooking?.arrivalDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Check out</span>
            <span>{currentBooking?.departureDate}</span>
          </div>
          <hr></hr>
          <div className="flex justify-between text-sm">
            <span>{nights} Night</span>
            <span>
              &pound;{nights && currentBooking.property.price * nights}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Cleaning fee</span>
            <span>&pound;{currentBooking?.property.cleaning_fee}</span>
          </div>
          <div className="flex justify-between font-bold text-md lg:text-lg mt-2">
            <span>Total Payment</span>
            <span>&pound; {currentBooking.property.price * nights + 100}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleCancelOrder}
          variant={"ghost"}
          className={`w-full text-red-500 hover:bg-red-600 hover:text-white ${
            currentBooking.status === ORDERTATUS.CANCELLED ? "hidden" : ""
          }`}
        >
          CANCEL BOOKING
        </Button>
      </CardFooter>
    </Card>
  );
}
