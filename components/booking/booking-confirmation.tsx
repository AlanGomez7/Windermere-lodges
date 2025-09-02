"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Download, Calendar, MessageSquare } from "lucide-react";

interface BookingConfirmationProps {
  bookingDetails: any;
  isActive:boolean
}

export function BookingConfirmation({
  bookingDetails,
  isActive
}: BookingConfirmationProps) {

  const router = useRouter();
  const [bookingNumber, setBookingNumber] = useState<string>("");
  const [nights, setNights] = useState<number>(3);



  useEffect(() => {
    const bookingNumber = "WL" + Math.floor(100000 + Math.random() * 900000);
    setBookingNumber(bookingNumber);
    findDifference()
  }, []);


  const findDifference = () => {
    const date1 = Number(new Date(bookingDetails.dates?.from));
    const date2 = Number(new Date(bookingDetails.dates?.to));

    // Difference in milliseconds
    const diffMs = date2 - date1;

    // Convert ms to days (1000 ms * 60 sec * 60 min * 24 hr)
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    console.log(diffDays);
    setNights(diffDays);

    return diffDays;
  };

  const generatePdf = () => {
    // In a real app, this would generate and download a booking confirmation PDF
    console.log("Generating PDF for booking", bookingNumber);
  };

  const addToCalendar = () => {
    // In a real app, this would generate a calendar event file
    console.log("Adding to calendar");
  };

  const contactSupport = () => {
    // In a real app, this would open a support chat or redirect to contact page
    router.push("/contact");
  };

  return (
    <section className={`px-16 mb-5 min-h-screen flex justify-center ${isActive ? 'block' : 'hidden'}`}>
      <div className="container md:px-16">
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 mt-2">
              Your booking has been successfully processed. We can't wait to
              welcome you to Windermere Lodges!
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Reference: {bookingNumber}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookingDetails.lodge && (
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="mb-2 md:mb-0">
                      <h3 className="font-semibold text-lg">
                        {bookingDetails?.lodge.name}
                      </h3>
                      {bookingDetails.dates &&
                        bookingDetails.dates.from &&
                        bookingDetails.dates.to && (
                          <p className="text-gray-600">
                            {new Date(
                              bookingDetails.dates.from
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                              bookingDetails.dates.to
                            ).toLocaleDateString()}
                            ({bookingDetails.nights}{" "}
                            {bookingDetails.nights === 1 ? "night" : "nights"})
                          </p>
                        )}
                      <p className="text-gray-600">
                        {bookingDetails.guests.adults}{" "}
                        {bookingDetails.guests.adults === 1
                          ? "adult"
                          : "adults"}
                        {bookingDetails.guests.children > 0 &&
                          `, ${bookingDetails.guests.children} ${
                            bookingDetails.guests.children === 1
                              ? "child"
                              : "children"
                          }`}
                      </p>
                    </div>
                    <div className="bg-gray-100 rounded p-3">
                      <p className="text-sm">
                        Check-in:{" "}
                        <span className="font-medium">From 4:00 PM</span>
                      </p>
                      <p className="text-sm">
                        Check-out:{" "}
                        <span className="font-medium">By 10:00 AM</span>
                      </p>
                    </div>
                  </div>
                )}

                <Separator />

                {bookingDetails.contactInfo && (
                  <div>
                    <h4 className="font-medium mb-2">Guest Information</h4>
                    <p>
                      {bookingDetails.contactInfo.firstName}{" "}
                      {bookingDetails.contactInfo.lastName}
                    </p>
                    <p>{bookingDetails.contactInfo.email}</p>
                    <p>{bookingDetails.contactInfo.phone}</p>
                    {bookingDetails.specialRequests && (
                      <>
                        <h4 className="font-medium mt-3 mb-1">
                          Special Requests
                        </h4>
                        <p className="text-gray-600">
                          {bookingDetails.specialRequests}
                        </p>
                      </>
                    )}
                  </div>
                )}

                {bookingDetails.extras && bookingDetails.extras.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Extras</h4>
                      <ul className="list-disc list-inside text-gray-600">
                        {bookingDetails.extras.map((extra: any) => (
                          <li key={extra.id}>{extra.name}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Payment Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Accommodation</span>
                      <span>
                        £
                        {bookingDetails.lodge
                          ? bookingDetails.lodge.price * nights
                          : 0}
                      </span>
                    </div>

                    {bookingDetails.extras &&
                      bookingDetails.extras.length > 0 && (
                        <div className="flex justify-between">
                          <span>Extras</span>
                          <span>
                            £
                            {bookingDetails.extras.reduce(
                              (sum: number, item: any) => sum + item.price,
                              0
                            )}
                          </span>
                        </div>
                      )}

                    {bookingDetails.discountApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (20%)</span>
                        <span>
                          -£
                          {Math.round(
                            bookingDetails.lodge
                              ? bookingDetails.lodge.price *
                                  bookingDetails.nights *
                                  0.2
                              : 0
                          )}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Service Fees</span>
                      <span>
                        £ 100
                        {/* {Math.round(
                          bookingDetails.lodge
                            ? bookingDetails.lodge.price *
                                bookingDetails.nights *
                                0.2
                            : 0
                        )} */}
                      </span>
                    </div>

                    <div className="flex justify-between font-bold pt-2">
                      <span>Total Paid</span>
                      <span>
                        £ {(bookingDetails.lodge?.price*nights) + 100}
                        {/* {bookingDetails.lodge
                          ? Math.round(
                              bookingDetails.lodge.price *
                                bookingDetails.nights +
                                (bookingDetails.extras?.reduce(
                                  (sum: number, item: any) => sum + item.price,
                                  0
                                ) || 0) +
                                bookingDetails.lodge.price *
                                  bookingDetails.nights *
                                  0.2 -
                                (bookingDetails.discountApplied
                                  ? bookingDetails.lodge.price *
                                    bookingDetails.nights *
                                    0.2
                                  : 0)
                            )
                          : 0} */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="flex items-center"
                onClick={generatePdf}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Confirmation
              </Button>
              <Button
                variant="outline"
                className="flex items-center"
                onClick={addToCalendar}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Add to Calendar
              </Button>
              <Button
                variant="outline"
                className="flex items-center"
                onClick={contactSupport}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex">
                  <span className="bg-teal-100 text-teal-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    1
                  </span>
                  <div>
                    <p className="font-medium">Check your email</p>
                    <p className="text-gray-600">
                      We've sent a confirmation email to{" "}
                      {bookingDetails.contactInfo?.email ||
                        "your email address"}{" "}
                      with all your booking details.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-teal-100 text-teal-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    2
                  </span>
                  <div>
                    <p className="font-medium">Prepare for your stay</p>
                    <p className="text-gray-600">
                      Check out our{" "}
                      <a
                        href="/activities"
                        className="text-teal-600 hover:underline"
                      >
                        activities page
                      </a>{" "}
                      to plan your Lake District adventure.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-teal-100 text-teal-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    3
                  </span>
                  <div>
                    <p className="font-medium">Arrival information</p>
                    <p className="text-gray-600">
                      Directions and check-in instructions will be sent to you 3
                      days before your arrival date.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={() => router.push("/")}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
