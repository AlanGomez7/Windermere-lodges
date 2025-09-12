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

export default function BookingPage() {
  
  const { searchParams } = useAppContext();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const [orderDetails, setOrderDetails] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (searchParams.dates) {
      try {
        const details = localStorage.getItem("order");
        setOrderDetails(JSON.parse(details ?? ""));
        setLoading(false);
      } catch (err) {
        console.error("Error parsing order from localStorage", err);
      }
      return;
    }

    router.back();
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

      {/* <BookingSteps currentStep={currentStep} /> */}

      {orderDetails && (
        <GuestInformation
          bookingDetails={orderDetails}
          onBack={() => setCurrentStep((s) => s - 1)}
          isActive={currentStep === 2}
          setCurrentStep={() => setCurrentStep(currentStep + 1)}
        />
      )}

      {/* instead of extras here, it should be payment */}

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
      <Footer />
      <ChatbotButton />
    </main>
  );
}
