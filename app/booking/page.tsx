"use client";

import { useState } from "react";
import Footer from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { BookingSteps } from "@/components/booking/booking-steps";
import { ChatbotButton } from "@/components/chatbot/chatbot-button";
import { useSearchParams } from "next/navigation";
import LodgeOrder from "@/components/cards/order-property";
import Image from "next/image";

export default function BookingPage() {
  const [searchParams] = useSearchParams();

  // Convert URLSearchParams to a plain object
  const allParams = Object.fromEntries(searchParams.entries());
  const [currentStep, setCurrentStep] = useState(3);

  return (
    <main className="min-h-screen bg-white">
      {/* <NavbarWrapper /> */}
      <PageHeader
        title="Book Your Stay"
        description="Secure your perfect Lake District getaway"
        backgroundImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <BookingSteps currentStep={currentStep} />
        </div>
      </section>

      <section className="px-16 mb-5">
        <LodgeOrder />
        
      </section>

      <Footer />
      <ChatbotButton />
    </main>
  );
}

{
  /* <section className=" flex bg-slate-300 w-full overflow-hidden">
        <div className="bg-slate-400 w-1/2 flex-1 hidden md:block">
          <Image
            src={
              "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1920&auto=format&fit=crop"
            }
            className="w-full h-full object-cover"
            width={800}
            height={600}
            alt=""
          />
        </div>
      </section> */
}
