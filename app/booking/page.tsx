'use client';

import { useState } from 'react';
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { BookingSteps } from "@/components/booking/booking-steps"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import NavbarWrapper from '@/components/navbar-wrapper';

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <main className="min-h-screen bg-white">
      <NavbarWrapper />
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

      <Footer />
      <ChatbotButton />
    </main>
  )
}

