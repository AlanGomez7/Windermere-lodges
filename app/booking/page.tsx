"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { BookingSteps } from "@/components/booking/booking-steps";
import { ChatbotButton } from "@/components/chatbot/chatbot-button";
import { GuestInformation } from "@/components/booking/guest-information";
import { useAppContext } from "../context/context";
import { Extras } from "@/components/booking/extras";
import { BookingConfirmation } from "@/components/booking/booking-confirmation";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();
  const { searchParams } = useAppContext();
  console.log(searchParams)
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    if (!searchParams.dates || !searchParams.lodge) {
      router.push('/not-found')
    }
  },[searchParams, router]);

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Book Your Stay"
        description="Secure your perfect Lake District getaway"
        backgroundImage={searchParams?.lodge?.images[0]}
      />

      <BookingSteps currentStep={currentStep} />

      <GuestInformation
        bookingDetails={searchParams}
        onBack={() => setCurrentStep(currentStep - 1)}
        isActive={currentStep === 2}
        setCurrentStep={() => setCurrentStep(currentStep + 1)}
      />

      <Extras
        bookingDetails={searchParams}
        onContinue={setCurrentStep}
        isActive={currentStep === 3}
        onBack={() => setCurrentStep(currentStep - 1)}
        setCurrentStep={() => setCurrentStep(currentStep + 1)}
      />

      <BookingConfirmation
        bookingDetails={searchParams}
        isActive={currentStep === 4}
      />
      <Footer />
      <ChatbotButton />
    </main>
  );
}

