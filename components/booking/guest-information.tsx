"use client";

import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/app/context/context";
import Image from "next/image";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { calculatePrices, findDiscountAmount } from "@/lib/utils";
import { Ticket } from "lucide-react";
import Coupons from "../lodges/Coupons";

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  specialRequests: string;
}

interface BookingDetails {
  contactInfo?: Partial<ContactInfo>;
  specialRequests?: string;
  lodge: any;
  dates: any;
  guests: {
    adults: number;
    children: number;
    pets: number;
    teens: number;
    infants: number;
  };
  nights: any;
}

interface GuestInformationProps {
  onContinue?: (contactInfo: ContactInfo) => void;
  onBack?: () => void;
  bookingDetails: BookingDetails;
  isActive: boolean;

  setCurrentStep: () => void;
}

export function GuestInformation({
  bookingDetails,
  isActive,
  setCurrentStep,
}: GuestInformationProps) {
  const session = useSession();
  const { data } = session;

  const [nights, setNights] = useState<number | undefined>(0);

  const findDifference = () => {
    const date1 = new Date(bookingDetails?.dates.from);
    const date2 = new Date(bookingDetails?.dates.to);
    // Difference in milliseconds
    const diffMs = date2.getTime() - date1.getTime();

    // Convert ms to days (1000 ms * 60 sec * 60 min * 24 hr)
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    const nights = findDifference();
    setNights(nights);
  }, []);

  const { setOrderDetails, appliedCoupon } = useAppContext();

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: (data?.user?.name && data?.user?.name.split(" ")[0]) || "",
    lastName: (data?.user?.name && data?.user?.name.split(" ")[1]) || "",
    email: data?.user?.email ?? "",
    phone: bookingDetails?.contactInfo?.phone ?? "",
    address: bookingDetails?.contactInfo?.address ?? "",
    city: bookingDetails?.contactInfo?.city ?? "",
    postalCode: bookingDetails?.contactInfo?.postalCode ?? "",
    country: bookingDetails?.contactInfo?.country ?? "",
    specialRequests: bookingDetails?.specialRequests ?? "",
  });

  const [error, setError] = useState("");
  // const [couponModal, setCouponModal] = useState(false);
  // const [marketing, setMarketing] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "phone"] as const;
    if (contactInfo) {
      const missingFields = requiredFields.filter(
        (field) => !contactInfo[field]
      );
      if (missingFields.length > 0) {
        setError(
          `Please fill in the following fields: ${missingFields.join(", ")}`
        );
        return;
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo ? contactInfo.email : "")) {
      setError("Please enter a valid email address");
      return;
    }

    console.log(contactInfo);

    localStorage.setItem("userInfo", JSON.stringify(contactInfo));
    setOrderDetails(contactInfo);
    setError("");
    setCurrentStep();
  };

  const total = calculatePrices(bookingDetails?.dates, bookingDetails?.lodge);

  return (
    <>
      {/* <Coupons showDialog={couponModal} setShowDialog={setCouponModal} /> */}

      <section
        className={`p-2 lg:px-28 mb-5 min-h-screen flex justify-center ${
          isActive ? "block" : "hidden"
        }`}
      >
        <div className="container flex gap-8 flex-col lg:flex-row self-start">
          <div>
            <Card className="">
              <CardHeader className="items-start">
                <CardTitle className="text-3xl font-semibold">
                  Guest Information
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={contactInfo?.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={contactInfo?.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={contactInfo?.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={contactInfo?.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={contactInfo?.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="city">City/Town</Label>
                    <Input
                      id="city"
                      name="city"
                      value={contactInfo?.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={contactInfo?.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={contactInfo?.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={contactInfo?.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Let us know if you have any special requirements or requests"
                    className="h-32"
                  />
                </div>

                {/* <div className="flex items-center space-x-2">
                <Checkbox
                id="marketing"
                checked={marketing}
                  onCheckedChange={(checked) =>
                  setMarketing(checked as boolean)
                  }
                  />
                  <Label
                  htmlFor="marketing"
                  className="text-sm font-normal cursor-pointer"
                  >
                  I would like to receive special offers and updates from
                  Windermere Lodges
                  </Label>
              </div> */}
              </CardContent>
            </Card>

            {/* Coupons */}

            <CardFooter className="flex flex-col items-start">
              {/* {!appliedCoupon ? (
                <div
                  className="flex flex-col md:flex-row justify-around w-full items-start sm:items-center gap-2 sm:gap-0 cursor-pointer"
                  onClick={() => setCouponModal(true)}
                >
                  <p className="flex items-center gap-2 text-emerald-600 text-sm sm:text-base text-wrap">
                    <Ticket className="w-4 h-4 sm:w-5 sm:h-5 hidden md:block" />
                    <span>Do you have a coupon? Apply and save up to 50%</span>
                  </p>

                  <Button
                    variant="link"
                    className="text-emerald-600 p-0 sm:p-2 text-sm sm:text-base w-full lg:w-2 mb-3 lg:mb-0"
                  >
                    Add Coupon
                  </Button>
                </div>
              ) : (
                <div
                  className="flex flex-col sm:flex-row justify-around w-full items-start sm:items-center gap-2 sm:gap-0 cursor-pointer"
                  onClick={() => setCouponModal(true)}
                >
                  <p className="text-green-700 text-sm sm:text-base py-2 sm:py-3">
                    Coupon <strong>{appliedCoupon.code}</strong> applied (
                    {appliedCoupon.discountType === "PERCENTAGE"
                      ? `${appliedCoupon.discountValue}% off`
                      : `£${appliedCoupon.discountValue} off`}
                    )
                  </p>

                  <Button
                    variant="link"
                    className="text-emerald-600 p-0 sm:p-2 text-sm sm:text-base w-full lg:w-2 mb-3 lg:mb-0"
                  >
                    Edit Coupon
                  </Button>
                </div>
              )} */}

              {/* <div className="py-6 w-full">
              <div className="flex gap-4">
                <div className="rounded-full p-2">
                  <Ticket className="text-emerald-600 w-6 h-6" />
                </div>
                <p className="text-2xl ">Apply coupon</p>
              </div>

              <div className="py-6 flex-grow">
              </div>
              </div> */}

              <Button
                onClick={handleContinue}
                className="bg-emerald-600 hover:bg-emerald-700 w-full space-y-2 lg:mt-10"
              >
                PROCEED TO PAYMENT
              </Button>
            </CardFooter>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                {error}
              </div>
            )}
          </div>
          <div className="basis-3/6">
            <CardHeader className="flex items-start">
              <CardTitle className="text-3xl font-semibold">
                Your Booking
              </CardTitle>
            </CardHeader>
            <Card className=" bg-[#EDF6F4] p-4">
              <div className="relative h-64 w-100">
                <Image
                  src={bookingDetails?.lodge.images[0] || "/placeholder.svg"}
                  alt={bookingDetails?.lodge.name}
                  fill
                  className="object-cover rounded-md"
                  priority
                />
                {bookingDetails?.lodge.isNew && (
                  <Badge className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-700">
                    New
                  </Badge>
                )}
                {/* <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  £{bookingDetails?.lodge.price}/night
                </div> */}
              </div>

              <CardHeader className="px-0">
                <div className="flex flex-col w-full items-start gap-3">
                  <CardTitle className="text-lg lg:text-xl font-bold">
                    {bookingDetails?.lodge.nickname}
                  </CardTitle>
                  <CardDescription className="">
                    {bookingDetails?.lodge.address}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span>Check In</span>
                  <span className="font-bold">
                    {" "}
                    {format(
                      new Date(bookingDetails?.dates.from),
                      "dd MMM yyyy"
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Check Out</span>
                  <span className="font-bold">
                    {format(new Date(bookingDetails?.dates.to), "dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Nights</span>
                  <span className="font-bold">
                    {" "}
                    {/*  */}
                    {nights}
                  </span>
                </div>
                {bookingDetails?.guests.adults > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>No. of Adults</span>
                    <span className="font-bold">
                      {" "}
                      {bookingDetails?.guests.adults}
                    </span>
                  </div>
                )}

                {bookingDetails?.guests.children > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>No. of Children</span>
                    <span className="font-bold">
                      {bookingDetails?.guests.children}
                    </span>
                  </div>
                )}

                {bookingDetails?.guests.teens > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>No. of Teenagers</span>
                    <span className="font-bold">
                      {" "}
                      {bookingDetails?.guests.teens}
                    </span>
                  </div>
                )}

                {bookingDetails?.guests.infants > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>No. of Infants</span>
                    <span className="font-bold">
                      {" "}
                      {bookingDetails?.guests.infants}
                    </span>
                  </div>
                )}

                {bookingDetails?.guests?.pets > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>No. of Pets</span>
                    <span className="font-bold">
                      {/* &pound; */}
                      {bookingDetails?.guests.pets}
                    </span>
                  </div>
                )}

                <hr />
                <div className="flex justify-between text-sm">
                  <span>Price for {nights} nights</span>
                  <span className="font-bold"> &pound;{total}</span>
                </div>

                {bookingDetails?.guests.pets > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Pet fee</span>
                    <span className="font-bold">
                      {" "}
                      &pound;
                      {bookingDetails?.lodge.pets_fee *
                        bookingDetails?.guests.pets}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Cleaning fee</span>
                  <span className="font-bold">
                    {" "}
                    &pound;{bookingDetails?.lodge.cleaning_fee}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-sm">
                    <span>Discount</span>
                    <span>
                      - &pound;
                      {total - findDiscountAmount(appliedCoupon, total)}
                    </span>
                  </div>
                )}

                {appliedCoupon && (
                  <p className="text-green-700 text-sm py-3">
                    Coupon <strong>{appliedCoupon.code}</strong> applied (
                    {appliedCoupon.discountType === "PERCENTAGE"
                      ? `${appliedCoupon.discountValue}% off`
                      : `£${appliedCoupon.discountValue} off`}
                    )
                  </p>
                )}
                <hr className="" />

                <div className="flex text-[#007752] justify-between text-md lg:text-xl">
                  <span>Total Payment</span>
                  {nights && (
                    <span className="font-bold">
                      &pound;
                      {appliedCoupon
                        ? findDiscountAmount(appliedCoupon, total) +
                          bookingDetails?.lodge?.cleaning_fee +
                          bookingDetails?.guests.pets *
                            bookingDetails?.lodge?.pets_fee
                        : total +
                          bookingDetails?.lodge?.cleaning_fee +
                          bookingDetails?.guests.pets *
                            bookingDetails?.lodge?.pets_fee}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
