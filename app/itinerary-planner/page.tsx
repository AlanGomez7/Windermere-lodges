'use client';

import { useState } from 'react';
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { ItineraryBuilder } from "@/components/itinerary/itinerary-builder"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import NavbarWrapper from '@/components/navbar-wrapper';

const defaultItinerary = {
  preferences: {
    type: 'active',
    dining: 'local',
    pace: 'moderate'
  },
  days: []
};

export default function ItineraryPlannerPage() {
  const [itinerary, setItinerary] = useState(defaultItinerary);

  return (
    <main className="min-h-screen bg-white">
      {/* <NavbarWrapper /> */}
      <PageHeader
        title="Plan Your Itinerary"
        description="Create your perfect Lake District adventure"
        backgroundImage="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <ItineraryBuilder 
            itinerary={itinerary}
            setItinerary={setItinerary}
          />
        </div>
      </section>

      <Footer />
      <ChatbotButton />
    </main>
  )
}

