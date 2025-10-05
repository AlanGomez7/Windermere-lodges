"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { ChatbotButton } from "@/components/chatbot/chatbot-button";
import { GuestInformation } from "@/components/booking/guest-information";
import { useAppContext } from "../context/context";
import { BookingConfirmation } from "@/components/booking/booking-confirmation";
import { StripePayment } from "@/components/booking/stripe-payment";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { MapPin } from "lucide-react";

export default function BookingPage() {
  const { searchParams } = useAppContext();
  console.log(searchParams)
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const [orderDetails, setOrderDetails] = useState<any>();
  const [loading, setLoading] = useState(false);

  function formatLocalDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  

  useEffect(() => {
    setLoading(true);

    if (!searchParams.dates) {
      router.back();
      return;
    }

    try {
      const detailsStr = localStorage.getItem("order");
      let details: any = detailsStr ? JSON.parse(detailsStr) : {};

      // Format dates as local YYYY-MM-DD to prevent timezone shifts
      const fromLocal = formatLocalDate(new Date(searchParams.dates.from));
      const toLocal = formatLocalDate(new Date(searchParams.dates.to));

      details = { ...details, dates: { from: fromLocal, to: toLocal } };
      localStorage.setItem("order", JSON.stringify(details));

      setOrderDetails(details);
    } catch (err) {
      console.error("Error parsing/saving order in localStorage", err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }

  if (!orderDetails) {
    return null; // or redirect
  }

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Book Your Stay"
        description="Secure your perfect Lake District getaway"
        backgroundImage={orderDetails?.lodge?.images[2] || "/placeholder.jpg"}
      />
      <div className="p-2 lg:px-28 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between my-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 bg-white"
              onClick={() => router.push("/our-lodges")}
            >
              <Icons.chevronLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-gray-800">
                {orderDetails?.lodge.nickname}
              </h1>
              <p className="text-sm text-gray-600 flex pt-4">
                <MapPin className="mr-2 h-5 w-5 text-emerald-400 flex-shrink-0" />

                {orderDetails?.lodge.address}
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* <BookingSteps currentStep={currentStep} /> */}

      {orderDetails && (
        <GuestInformation
          bookingDetails={orderDetails}
          onBack={() => setCurrentStep((s) => s - 1)}
          isActive={currentStep === 2}
          setCurrentStep={() => setCurrentStep(currentStep + 1)}
        />
      )}


      {orderDetails && (
        <StripePayment
          bookingDetails={orderDetails}
          isActive={currentStep === 3}
          onBack={() => setCurrentStep(currentStep - 1)}
          setCurrentStep={() => setCurrentStep(currentStep + 1)}
        />
      )}

      <BookingConfirmation
        bookingDetails={searchParams}
        isActive={currentStep === 4}
      />
      {/* <Footer />
      <ChatbotButton /> */}
    </main>
  );
}
