import { Hero } from "@/components/hero";
import { BookingSection } from "@/components/booking-section";
import { FeaturedLodges } from "@/components/featured-lodges";
import { Amenities } from "@/components/amenities";
import { Activities } from "@/components/activities";
import { Testimonials } from "@/components/testimonials";
import Footer from "@/components/footer";
import { ChatbotButton } from "@/components/chatbot/chatbot-button";
import { fetchProperties } from "@/lib/api";

export default async function Home() {
  const lodges = await fetchProperties();
  
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <BookingSection lodges={lodges} />
      <FeaturedLodges lodges={lodges} />
      <Amenities />
      <Activities />
      <Testimonials />
      <Footer />
      <ChatbotButton />
    </main>
  );
}
