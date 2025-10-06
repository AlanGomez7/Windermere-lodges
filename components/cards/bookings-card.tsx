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
      return "bg-red-500";
    }

    if (status === ORDERTATUS.CONFIRMED) {
      return "bg-green-500";
    }

    if (status === ORDERTATUS.PENDING) {
      return "bg-yellow-500";
    }
  };

  return (
    <Card
      key={currentBooking.id}
      className="overflow-hidden w-full max-w-3xl p-2 flex flex-col sm:flex-row border shadow-lg transition-all duration-300 hover:shadow-xl border-emerald-600"
    >
      {/* Image */}
      <CardHeader className="relative w-full sm:w-[280px] h-[220px] sm:h-auto shrink-0">
        <Image
          src={currentBooking.property.images[0] || "/placeholder.svg"}
          alt={currentBooking.property.name}
          fill
          className="object-cover rounded-md"
          priority
        />
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4 flex flex-col justify-between w-full">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg sm:text-xl font-bold truncate">
            {currentBooking?.property.nickname}
          </h3>

          {/* Details */}
          <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
            {currentBooking.enquiryId && (
              <div className="flex items-center">
                {/* <BedDouble className="h-4 w-4 mr-1 text-gray-500" /> */}
                <span>Enqury id: {currentBooking?.enquiryId}</span>
              </div>
            )}
            {/* <div className="flex items-center">
              <span>{}</span>
            </div> */}
          </div>

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
          </div>

          {/* Features */}
          {/* <div className="flex flex-wrap gap-2">
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
            </div> */}

          {/* Price + Button */}
          <div className="pt-1 flex justify-between items-start">
            {/* {needsButton && ( */}

            <div>
              <span className="text-md  text-emerald-600">Payment</span>
              {/* <span className="text-gray-500 text-sm sm:text-lg"> / night</span> */}
            </div>
            <div>
              <span className="text-md font-bold text-emerald-600">
                £{currentBooking?.amount}
              </span>
              {/* <span className="text-gray-500 text-sm sm:text-lg"> / night</span> */}
            </div>
            {/* )} */}
          </div>
        </div>

        <Button
          onClick={handleCancelOrder}
          variant={"ghost"}
          className={`bg-red-500 text-white mt-3 ${
            currentBooking.status === ORDERTATUS.CANCELLED ? "hidden" : ""
          }`}
        >
          CANCEL BOOKING
        </Button>
      </CardContent>

      {/* Rating */}

      <CardFooter className="relative hidden sm:block">
        <div
          className={`absolute top-3 right-3 flex items-center px-2 py-1 rounded-full  ${giveColor(
            currentBooking.status
          )} `}
        >
          <span className="text-xs text-white">{currentBooking.status}</span>
          {/* <Star className="h-4 w-4 text-white ml-1" fill="currentColor" /> */}
        </div>
      </CardFooter>
    </Card>
  );
}

{
  /* <Card className="rounded-xl">
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
          <CardTitle className="text-lg lg:text-md font-bold">
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
    </Card> */
}
